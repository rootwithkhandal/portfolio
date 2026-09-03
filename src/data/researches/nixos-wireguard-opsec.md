# Declarative OPSEC — Managing a Kill-Switch WireGuard Setup with NixOS

**Tag:** OPSEC · **Date:** Nov 2025 · **Read time:** 9 min

---

Operational security for bug bounty and red-team work requires more than just a VPN. It requires a reproducible, auditable environment where every network rule, DNS setting, and tool version is declared in code. This post covers my NixOS-based OPSEC setup with a kernel-level WireGuard kill-switch.

## Why NixOS for OPSEC?

Traditional Linux setups drift. You install a tool, forget about it, and six months later you don't know what's on your machine. NixOS solves this:

- **Reproducible** — same config = same system, every time
- **Auditable** — your entire environment is a git repo
- **Atomic rollbacks** — broke something? `nixos-rebuild switch --rollback`
- **Compartmentalisation** — different profiles for different operations

## The Kill-Switch

A kill-switch blocks all traffic if the VPN drops. Without it, a momentary VPN disconnect leaks your real IP.

```nix
# /etc/nixos/wireguard.nix
{ config, pkgs, lib, ... }:
{
  networking.wg-quick.interfaces.wg0 = {
    address = [ "10.66.66.2/32" ];
    dns = [ "1.1.1.1" "1.0.0.1" ];
    privateKeyFile = "/etc/wireguard/private.key";

    peers = [{
      publicKey = "YOUR_SERVER_PUBKEY=";
      allowedIPs = [ "0.0.0.0/0" "::/0" ];
      endpoint = "YOUR_VPN_SERVER:51820";
      persistentKeepalive = 25;
    }];

    # Kill-switch via nftables
    postUp = ''
      ${pkgs.nftables}/bin/nft add table inet wg_killswitch
      ${pkgs.nftables}/bin/nft add chain inet wg_killswitch output \
        { type filter hook output priority 0 \; policy drop \; }
      ${pkgs.nftables}/bin/nft add rule inet wg_killswitch output \
        oifname "wg0" accept
      ${pkgs.nftables}/bin/nft add rule inet wg_killswitch output \
        oifname "lo" accept
      ${pkgs.nftables}/bin/nft add rule inet wg_killswitch output \
        meta l4proto udp udp dport 51820 accept
    '';

    preDown = ''
      ${pkgs.nftables}/bin/nft delete table inet wg_killswitch || true
    '';
  };
}
```

## DNS Leak Prevention

```nix
# Force all DNS through VPN
services.resolved = {
  enable = true;
  dnssec = "true";
  extraConfig = ''
    DNS=1.1.1.1
    FallbackDNS=
    DNSOverTLS=yes
  '';
};
```

Verify no leaks:

```bash
# Should return VPN server IP, not your real IP
dig +short myip.opendns.com @resolver1.opendns.com

# Full leak test
curl -s https://ipleak.net/json/ | jq '{ip, country_name, isp}'
```

## Compartmentalised Browser Profiles

```nix
# Different Firefox profiles for different operations
home.packages = with pkgs; [
  (writeShellScriptBin "firefox-bugbounty" ''
    firefox -P "bugbounty" --no-remote "$@"
  '')
  (writeShellScriptBin "firefox-personal" ''
    firefox -P "personal" --no-remote "$@"
  '')
];
```

## Firejail Sandboxing

```nix
programs.firejail = {
  enable = true;
  wrappedBinaries = {
    burpsuite = {
      executable = "${pkgs.burpsuite}/bin/burpsuite";
      profile = "${pkgs.firejail}/etc/firejail/burpsuite.profile";
    };
  };
};
```

## Home Manager Security Profile

```nix
# profiles/opsec.nix
{ pkgs, ... }: {
  home.packages = with pkgs; [
    wireguard-tools
    tor
    torsocks
    firejail
    keepassxc
    veracrypt
    metadata-cleaner
  ];

  # Disable telemetry everywhere
  programs.firefox.profiles.bugbounty = {
    settings = {
      "toolkit.telemetry.enabled" = false;
      "browser.send_pings" = false;
      "geo.enabled" = false;
      "media.peerconnection.enabled" = false; # disable WebRTC
    };
  };
}
```

## Verifying the Kill-Switch Works

```bash
# 1. Confirm VPN is up
wg show

# 2. Check your IP (should be VPN IP)
curl -s ifconfig.me

# 3. Bring VPN down
sudo systemctl stop wg-quick@wg0

# 4. Try to reach internet (should fail)
curl -s --max-time 3 ifconfig.me
# Expected: curl: (28) Connection timed out

# 5. Bring VPN back up
sudo systemctl start wg-quick@wg0
```

## Operational Checklist

Before any engagement:

- [ ] VPN connected and kill-switch active
- [ ] DNS leak test passed
- [ ] WebRTC disabled in browser
- [ ] Correct browser profile active
- [ ] Burpsuite running in Firejail
- [ ] No personal accounts logged in
- [ ] Scope file reviewed and saved locally
