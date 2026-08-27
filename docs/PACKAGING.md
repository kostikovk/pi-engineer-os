# 📦 Pi Package & Installation Guide

`pi-engineer-os` is fully compliant with the official [`pi` package specification](https://github.com/earendil-works/pi-coding-agent/blob/main/docs/packages.md), allowing one-line installations and automatic updates.

---

## 🚀 Installation Options

### Option 1: Native Pi Package (Recommended)

Install globally (available across all projects):
```bash
pi install git:github.com/kostikovk/pi-engineer-os
```

Install to the current project only (`.pi/settings.json`):
```bash
pi install -l git:github.com/kostikovk/pi-engineer-os
```

Try without installing (ephemeral session):
```bash
pi -e git:github.com/kostikovk/pi-engineer-os
```

---

### Option 2: Turnkey Shell Installer

Clone and run the interactive installer:
```bash
git clone https://github.com/kostikovk/pi-engineer-os.git
cd pi-engineer-os
./setup.sh
```

Choose:
- **Global**: Installs prompts to `~/.pi/agent/prompts/`, extensions to `~/.pi/agent/extensions/`, and skills to `~/.pi/agent/skills/`.
- **Project**: Installs directly into `.pi/` and `.agents/` of the current directory.

---

## 🔄 Updates

To update `pi-engineer-os` to the latest release:
```bash
# Update all pi packages
pi update --extensions

# Or update everything (pi CLI + packages)
pi update --all
```

---

## 🎛️ Package Manifest Overview

`package.json` declares the package metadata:
```json
{
  "name": "pi-engineer-os",
  "keywords": ["pi-package"],
  "pi": {
    "extensions": ["extensions/*.ts", "extensions/*/index.ts"],
    "skills": ["skills"],
    "prompts": ["prompts"]
  }
}
```
