---
name: CP! shortcut
description: When user types "CP!" it means commit and push — do it immediately without asking for permission
type: feedback
---

When the user types "CP!" (exactly), treat it as "commit and push all staged changes immediately."

**Why:** User wants a fast shortcut to avoid typing the full instruction every time.
**How to apply:** Always run `git status` first to catch ALL modified/untracked files, not just the ones touched in the current task. Stage everything relevant, commit with a descriptive message, and push to origin main — all without asking for confirmation first. Never rely on memory of which files were edited; always verify with git status.
