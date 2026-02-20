# ReSync

<p>
  Folder workflow sync for Rekordbox.<br>
  <strong>Open. Compare. Sync. Done.</strong>
</p>

[![Website](https://img.shields.io/badge/Website-resyncapp.com-1d2a44)](https://resyncapp.com)
[![Documentation](https://img.shields.io/badge/Documentation-Read%20guide-1d2a44)](https://resyncapp.com/docs.html)
<p>
  <a href="https://github.com/earbash3/ReSync-Releases/releases/download/v1.0.0/ReSync-1.0.0-arm64.dmg">
    <img alt="Download Apple Silicon" src="https://img.shields.io/badge/Download-Apple%20Silicon-5dd9ff">
  </a><br>
  <a href="https://github.com/earbash3/ReSync-Releases/releases/download/v1.0.0/ReSync-1.0.0-x86_64.dmg">
    <img alt="Download Intel" src="https://img.shields.io/badge/Download-Intel-5dd9ff">
  </a>
</p>

## ❓ What is ReSync?

ReSync is built for DJs who organize their music in folders and want Rekordbox to follow that structure without repeated manual maintenance.

The core idea is simple:

- your folder structure stays the baseline
- ReSync compares that baseline against your Rekordbox library
- you review the plan before anything is written
- sync runs only after explicit approval

This keeps control in your hands while removing a large part of repetitive library admin.

## 🎧 Why ReSync?

- Built around a real DJ pain point: doing the same organizational work twice.
- Compare-first workflow: clear visibility before any write operation.
- Approval-based execution: no blind background write process.
- Folder-oriented model: your existing structure remains the source of truth.
- Less admin overhead, more time for crate quality and set preparation.

## ⚙️ How it works

### 1) Open

Open or import your Rekordbox library data.

### 2) Compare

ReSync scans your selected music-folder structure and compares it with your current Rekordbox state.

### 3) Preview

You get a reviewable list of proposed additions/removals before any write step.

### 4) Sync

Changes are applied only after you confirm.
No confirmation means no write.

## 🛟 Safety first

- Always keep a recoverable backup before any write operation.
- Treat Preview as mandatory before Apply Sync.
- If output looks unexpected, stop and review before running Sync.

ReSync is designed for controlled changes, but operational safety still depends on your backup discipline.

## 🚀 Latest release info

- Download binaries from GitHub Releases.
- See [CHANGELOG.md](./CHANGELOG.md) for latest release notes.

## 🍎 macOS first launch (unsigned build)

Because ReSync is currently unsigned, macOS may block it on first launch.

If this happens, open Terminal and run:

```bash
sudo xattr -dr com.apple.quarantine "/Applications/ReSync.app"
```

## ⬇️ Get ReSync

**Official Release Assets:**  
https://github.com/earbash3/ReSync-Releases/releases

**Project Site:**  
https://resyncapp.com

**Documentation:**  
https://resyncapp.com/docs.html

**Changelog:**  
https://resyncapp.com/changelog.html

**Support Form:**  
https://resyncapp.com/support.html

## 🧩 Requirements

- macOS environment supported by current ReSync release
- Rekordbox library and folder-based workflow
- Valid license flow for normal write-enabled operation

## 🛠️ Need help?

Use the support page:  
https://resyncapp.com/support.html

## ❤️ Support ReSync

If ReSync helps your workflow and you want to support development, you can support the project on Ko-fi.

As a thank-you, the first 25 supporters who contribute at least 25 EUR receive a lifetime license key.

Planned public pricing (coming soon):
- Annual license: 9.90 EUR intro, then 14.90 EUR
- Lifetime license: first 25 supporters at 25 EUR, then 39.90 EUR

Upcoming features:
https://resyncapp.com/upcoming.html

Support options:
- One-time support
- Monthly support

https://ko-fi.com/resync
