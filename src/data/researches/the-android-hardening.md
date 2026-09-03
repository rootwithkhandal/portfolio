# The Android Hardening Guide (Stock ROM Edition)

_For anyone running pentesting, bug bounty, or blockchain workflows off a daily-driver Android phone — no custom ROM, no root, no bootloader unlock. Just discipline._

---

## The Premise

Rooting kills your attestation chain. Custom ROMs are great until the one app you need for a client engagement refuses to run on an unlocked bootloader. So this guide assumes the constraint most people actually live under: **stock Android, hardened to its ceiling.**

If you want root-of-trust exclusion from the OEM entirely, that's a GrapheneOS-on-Pixel conversation — different device, different threat model. This is about squeezing every inch out of the phone you already have.

Two ground truths before you start:

1. **More apps = more attack surface**, even hardened ones. Every app you install is a decision, not a default.
2. **This is "hard target," not "adversary-proof."** A hardened stock phone resists opportunistic attacks, mass surveillance, and casual data harvesting. It will not stop a nation-state with your device in hand.

---

## Phase 1: Foundation

Before touching a single privacy toggle, close the basic gaps:

- **Update everything.** OS, security patch, every installed app. Check your patch date in Settings → About phone → Software info — if it's more than 2 months stale, something's wrong with your update cadence.
- **Lock screen** — 6+ digit PIN or alphanumeric password. Avoid patterns (smudge-visible, shoulder-surf trivial). Fingerprint unlock is fine; 2D/camera-based face unlock is not — it's spoofable with a photo.
- **Disable notification content previews** on the lock screen.
- **Disable Smart Lock** (trusted places/devices) — convenience features that quietly widen your unlock surface.
- **Turn on your OEM's install/USB protection layer.** Samsung has Auto Blocker, most others have an equivalent under Security settings. The pattern is the same everywhere: block sideloaded installs by default, disable USB commands when locked, flag malicious Bluetooth pairing. Leave it on — sideloaded tools (F-Droid apps, recon utilities) will need explicit allow-listing each time. That friction is intentional. Don't disable the protection to skip it.
- **Minimize OEM/Google account cloud sync** for SMS and call logs — use local backup where you can.
- **Leave the bootloader locked** on your daily driver. Do experimental root/custom-ROM work on a dedicated secondary device.

---

## Phase 2: Shrink the Privacy Surface

This is where most of the actual leakage gets cut off.

- **Permission audit** — Settings → Privacy → Permission manager. For Location, Camera, Mic, Contacts, SMS: kill "Allow all the time," set everything to "Only while using" or "Ask every time."
- **Permission usage log** — most Android versions expose a recent sensor-access audit in the same menu. Check it periodically; it's the fastest way to catch an app quietly polling your mic or location.
- **Reset/delete your Advertising ID.** Redo this monthly — it regenerates tracking value over time even after a reset.
- **Turn off diagnostic/usage data sharing** for both the OEM and Google.
- **Google account cleanup** (myaccount.google.com):
    - Disable Ad personalization
    - Disable Web & App Activity
    - Disable Location History
    - Remove unused connected apps/devices under Security
    - Enable 2-Step Verification with an authenticator app — not SMS
    - Consider a separate, minimal Google account used only for Play Store auth
- **Private DNS (DoH)** — Settings → Network/Connections → Private DNS:
    - `dns.quad9.net` for baseline malicious-domain blocking
    - `1dot1dot1dot1.cloudflare-dns.com` as an alternative
    - NextDNS if you want custom filtering and query logging control
- **Turn off "always scanning"** for Wi-Fi and Bluetooth under Location settings — this is a passive fingerprinting vector most people never touch.
- **Disable auto-connect to unknown/open networks.**

---

## Phase 3: The App Layer

### Debloat

Disable every non-removable OEM/Google app you don't use. For anything that resists the UI toggle, ADB gets it done from your main machine:

```bash
adb shell pm uninstall -k --user 0 <package>
```

### Security Stack

|Category|App|Why|
|---|---|---|
|Malware/scam protection|Malwarebytes|Device-side scam/link protection|
|App catalog|Aurora Store|Play Store catalog without a Google account tether|
|App catalog|F-Droid|FOSS-only, no telemetry|
|Password manager|Bitwarden|Self-hostable, free tier is solid|
|Password manager|KeePassDX|Fully offline, manual sync via Syncthing|
|2FA|Aegis Authenticator|Open-source, encrypted local backup (F-Droid)|
|Firewall|NetGuard|Per-app firewall, no root required|
|Messaging|Signal|Encrypted messaging baseline|
|Browser|Brave or Firefox Focus|Tracker-resistant by default|
|VPN|ProtonVPN or Mullvad|Public Wi-Fi shouldn't happen without one|

### Encryption & Isolation

- Verify storage encryption is active (on by default for most modern devices, worth confirming).
- Use your OEM's secure/isolated profile feature (Secure Folder, Private Space, work profile) to wall off sensitive apps — wallets, bounty tools, client data — from the general app pool.
- Set up remote lock/wipe (Find My Device or OEM equivalent) before you need it, not after.

---

## Phase 4: Network Discipline

- **WireGuard client** — if you're running a homelab mesh (Azure/AWS SIEM box, Kali VPS, whatever), extend it to mobile. SSH into your triage environment from the field without exposing it directly.
- Turn off Wi-Fi/Bluetooth/NFC/Location when genuinely not in use — not just for battery, but because "always available" radios are always-available attack surface.
- **Termius or JuiceSSH** for quick SSH into lab infrastructure.
- **Syncthing** for LAN-based file sync between devices — phone, secondary pentest device, main rig — with zero cloud dependency.

---

## Phase 5: Trend Intelligence, Without the Profiling

You need signal on 0-days, disclosures, and CVEs without handing a platform your entire attention graph.

- **RSS-first**: Feeder, Read You, or Feedly/Inoreader. Feed list: The Hacker News, BleepingComputer, Krebs on Security, PortSwigger blog, Rekt.news, OpenZeppelin blog.
- **Twitter/X** remains the fastest raw signal for disclosures and exploit writeups — disable personalized ads, location tagging, and DMs from non-followers to blunt the tracking cost of using it.
- **Reddit** via a third-party client (less telemetry than official) — r/netsec, r/bugbounty, r/ethereum, r/cybersecurity.

---

## Phase 6: Cybersecurity / Bug Bounty Field Kit

- **Termux + Termux:API** — full Linux userland, no root. `nmap`, `curl`, `git`, `python`, `openssh` all work.
- **Termux + tmux** for persistent sessions you can reattach to.
- **HackerOne / Bugcrowd / Intigriti** apps or mobile web — program updates, payout notifications.
- **Shodan app** — quick recon lookups on the go.
- **CVE Details / NVD** — browser bookmark, not worth a dedicated app.
- **OWASP MASTG/MSTG reference** — offline copy for mobile app pentesting.
- Lightweight recon companion tools (Wi-Fi analysis, ARP scans) where your platform supports them without a full chroot.

---

## Phase 7: Blockchain / Web3

- **MetaMask or Trust Wallet** — hot wallet only, and keep it inside your secure/isolated profile. Never store real bounty payouts here.
- **Rabby Wallet** — notably better phishing/malicious-contract warnings than MetaMask's defaults, worth running alongside.
- **Etherscan / BscScan** — on-chain lookups, contract verification.
- **DeFiLlama** — TVL and protocol tracking.
- **Immunefi / Code4rena** — Web3 bug bounty and audit-contest tracking, HackerOne-equivalent for smart contracts.
- Cold storage for anything that matters stays off-device. Full stop.

---

## Phase 8: Productivity, Tightened

- **Obsidian + Syncthing** — local-first Markdown vaults, no cloud dependency, good for both general notes and sensitive recon/target organization. The Notion alternative when the content shouldn't leave your control.
- **Todoist / Notion** — fine for non-sensitive task and project sync where cloud convenience outweighs the isolation benefit.
- **Bitwarden/1Password autofill** wired into both browser and SSH client — one vault, not three.
- **Tasker** (or your platform's automation equivalent) — automate the boring parts of your threat model. "Leaving trusted network → enable firewall / lockdown mode" is the single highest-leverage automation here.

---

## The Key Habit

Everything above is scaffolding for one discipline: **isolate by sensitivity, not by convenience.**

Bug bounty tools, wallets, and client data live in a separate profile from your everyday apps — Secure Folder, Private Space, work profile, whatever your OEM calls it. Not because any single app is malicious, but because the blast radius of one compromised everyday app (a game, a random utility) should never touch the vault holding program credentials or wallet seeds.

Side-loaded tools will keep tripping your install-protection layer. That's not a bug in the setup — that's the setup working.

---

## What This Doesn't Solve

- Baseband/modem-level exploits — outside the OS layer entirely, no app-level hardening touches this.
- Physical device compromise with unlocked/decrypted access.
- OEM or carrier-level backdoors, if they exist — you're trusting the vendor's supply chain by definition on stock firmware.
- Full de-Googling — you're reducing Google's footprint, not eliminating it, unless you move to GrapheneOS or a similar de-Googled build.

Know the ceiling. Operate under it.
