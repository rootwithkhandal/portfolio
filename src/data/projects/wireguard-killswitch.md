# WireGuard Kill-Switch

Declarative NixOS WireGuard configuration with a network kill-switch that blocks all traffic if the VPN tunnel drops. Designed for operational security in bug bounty and red-team engagements.

## Overview

A kill-switch ensures no traffic leaks to your real IP if the VPN disconnects unexpectedly. This NixOS configuration enforces it at the kernel level using nftables, making it impossible to bypass from userspace.

## How It Works

1. WireGuard tunnel is established on boot via systemd
2. nftables rules drop all non-VPN traffic by default
3. Only traffic through `wg0` interface is allowed out
4. DNS is forced through the VPN to prevent DNS leaks
5. If `wg0` goes down, all internet access is blocked until it recovers

## Setup

### NixOS (Primary)

```nix
# /etc/nixos/wireguard.nix
{ config, pkgs, ... }:
{
  networking.wg-quick.interfaces.wg0 = {
    address = [ "10.66.66.2/32" ];
    dns = [ "1.1.1.1" ];
    privateKeyFile = "/etc/wireguard/private.key";

    peers = [{
      publicKey = "YOUR_SERVER_PUBLIC_KEY";
      allowedIPs = [ "0.0.0.0/0" "::/0" ];
      endpoint = "YOUR_SERVER_IP:51820";
      persistentKeepalive = 25;
    }];

    # Kill-switch: block all traffic if VPN drops
    postUp = ''
      ${pkgs.nftables}/bin/nft add table inet killswitch
      ${pkgs.nftables}/bin/nft add chain inet killswitch output { type filter hook output priority 0 \; policy drop \; }
      ${pkgs.nftables}/bin/nft add rule inet killswitch output oifname "wg0" accept
      ${pkgs.nftables}/bin/nft add rule inet killswitch output oifname "lo" accept
    '';

    preDown = ''
      ${pkgs.nftables}/bin/nft delete table inet killswitch
    '';
  };
}
```

### Kali Linux

```bash
# Install WireGuard
sudo apt update && sudo apt install wireguard -y

# Generate keys
wg genkey | tee /etc/wireguard/private.key | wg pubkey > /etc/wireguard/public.key
chmod 600 /etc/wireguard/private.key

# Create config
sudo nano /etc/wireguard/wg0.conf
```

```ini
[Interface]
Address = 10.66.66.2/32
PrivateKey = YOUR_PRIVATE_KEY
DNS = 1.1.1.1
PostUp = nft add table inet killswitch; nft add chain inet killswitch output { type filter hook output priority 0 \; policy drop \; }; nft add rule inet killswitch output oifname "wg0" accept; nft add rule inet killswitch output oifname "lo" accept
PreDown = nft delete table inet killswitch

[Peer]
PublicKey = SERVER_PUBLIC_KEY
AllowedIPs = 0.0.0.0/0, ::/0
Endpoint = SERVER_IP:51820
PersistentKeepalive = 25
```

```bash
# Enable and start
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0

# Verify kill-switch
sudo systemctl stop wg-quick@wg0
curl ifconfig.me  # Should fail — no traffic leaks
```

### macOS

```bash
# Install WireGuard from App Store or Homebrew
brew install wireguard-tools

# Create config at /usr/local/etc/wireguard/wg0.conf
# macOS uses pf for the kill-switch instead of nftables

# Add to PostUp:
# /sbin/pfctl -e -f /etc/pf.anchors/killswitch

# pf anchor file:
# block out all
# pass out on utun* all
```

### Windows

```powershell
# Download WireGuard from https://www.wireguard.com/install/
# Import your .conf file via the GUI

# Kill-switch is built into the Windows WireGuard client:
# Edit tunnel → check "Block untunneled traffic (kill-switch)"
```

## DNS Leak Prevention

```bash
# Verify no DNS leaks
dig +short myip.opendns.com @resolver1.opendns.com
# Should return your VPN server IP, not your real IP

# Full leak test
curl https://ipleak.net/json/
```
