#!/usr/bin/env bash
set -e

# ==============================================================================
# pi-engineer-os Installer
# The Complete Engineering Operating System for Pi Coding Agent
# ==============================================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_MODE="${1:-}"

echo ""
echo "🚀 Welcome to pi-engineer-os Installer"
echo "=========================================="
echo ""

# Ensure pi-hermes-memory extension is installed for persistent cross-session memory
if command -v pi >/dev/null 2>&1; then
  echo "🧠 Checking persistent memory extension (pi-hermes-memory)..."
  if ! pi list 2>/dev/null | grep -q "pi-hermes-memory"; then
    echo "📦 Installing pi-hermes-memory for cross-session intelligence..."
    pi install npm:pi-hermes-memory || echo "⚠️ Could not auto-install pi-hermes-memory via npm. Ensure it is configured."
  else
    echo "✅ pi-hermes-memory is already active."
  fi
fi

if [ -z "$TARGET_MODE" ]; then
  echo ""
  echo "Where would you like to install pi-engineer-os?"
  echo "  1) Global   (~/.pi/agent/ - available across all projects)"
  echo "  2) Project  (Current directory - project-local .pi/ and .agents/)"
  echo ""
  read -p "Select option [1-2]: " CHOICE
  case "$CHOICE" in
    1) TARGET_MODE="--global" ;;
    2) TARGET_MODE="--project" ;;
    *) echo "Invalid choice. Exiting."; exit 1 ;;
  esac
fi

if [ "$TARGET_MODE" = "--global" ]; then
  echo "📦 Installing globally to ~/.pi/agent/ and ~/.agents/skills/..."
  
  # 1. Install Prompts
  mkdir -p "$HOME/.pi/agent/prompts"
  cp -r "$SCRIPT_DIR"/prompts/* "$HOME/.pi/agent/prompts/"
  
  # 2. Install Extensions
  mkdir -p "$HOME/.pi/agent/extensions"
  cp -r "$SCRIPT_DIR"/extensions/* "$HOME/.pi/agent/extensions/"
  
  # 3. Install Skills
  mkdir -p "$HOME/.agents/skills"
  for skill in "$SCRIPT_DIR"/skills/*; do
    if [ -d "$skill" ]; then
      cp -r "$skill" "$HOME/.agents/skills/"
    fi
  done
  
  # 4. Copy Presets & Settings
  mkdir -p "$HOME/.pi/agent"
  cp "$SCRIPT_DIR/config/presets.json" "$HOME/.pi/agent/presets.json"
  if [ ! -f "$HOME/.pi/agent/settings.json" ]; then
    cp "$SCRIPT_DIR/config/settings.json" "$HOME/.pi/agent/settings.json"
  fi
  
  echo ""
  echo "✅ pi-engineer-os successfully installed globally!"
  echo "👉 Open any project with pi and run '/bootstrap' to onboard the project."
  echo ""

elif [ "$TARGET_MODE" = "--project" ]; then
  PROJECT_DIR="$(pwd)"
  echo "📦 Installing locally to project: $PROJECT_DIR..."
  
  # 1. Install Prompts
  mkdir -p "$PROJECT_DIR/.pi/prompts"
  cp -r "$SCRIPT_DIR"/prompts/* "$PROJECT_DIR/.pi/prompts/"
  
  # 2. Install Skills
  mkdir -p "$PROJECT_DIR/.agents/skills"
  for skill in "$SCRIPT_DIR"/skills/*; do
    if [ -d "$skill" ]; then
      cp -r "$skill" "$PROJECT_DIR/.agents/skills/"
    fi
  done
  
  # 3. Templates (if not already present)
  if [ ! -f "$PROJECT_DIR/AGENTS.md" ]; then
    cp "$SCRIPT_DIR/templates/AGENTS.template.md" "$PROJECT_DIR/AGENTS.md"
  fi
  if [ ! -f "$PROJECT_DIR/CONTEXT.md" ]; then
    cp "$SCRIPT_DIR/templates/CONTEXT.template.md" "$PROJECT_DIR/CONTEXT.md"
  fi
  
  echo ""
  echo "✅ pi-engineer-os successfully configured for this project!"
  echo "👉 Run '/bootstrap' inside pi to tailor AGENTS.md to your project stack."
  echo ""
else
  echo "Unknown option: $TARGET_MODE"
  echo "Usage: ./setup.sh [--global | --project]"
  exit 1
fi
