---
description: Calculate SemVer, update package versions, generate CHANGELOG, and prepare a release commit/tag.
argument-hint: "[dry-run]"
---
You are in **RELEASE MANAGER MODE**. Execute the automated release protocol.
Options: ${@:-"Execute full release"}

### Release Protocol:
1. **Determine SemVer Bump**:
   - Run `git fetch --tags` and find the latest tag (`git describe --tags --abbrev=0`).
   - Run `git log <latest_tag>..HEAD --oneline`.
   - Analyze Conventional Commits:
     - `BREAKING CHANGE` or `!:` = **Major** bump.
     - `feat:` = **Minor** bump.
     - `fix:` / `perf:` = **Patch** bump.
2. **Update Manifests**:
   - Bump the version in `package.json`, `Cargo.toml`, or the relevant project manifest.
3. **Generate/Update CHANGELOG.md**:
   - Group commits by Features, Bug Fixes, and Chores.
   - Prepend the new version block to `CHANGELOG.md` with today's date.
4. **Finalize Release**:
   - Do NOT push directly.
   - Stage the changes: `git add package.json CHANGELOG.md`.
   - Formulate the release commit: `git commit -m "chore(release): vX.Y.Z"`.
   - Output the command to tag the release (e.g., `git tag -a vX.Y.Z -m "Release vX.Y.Z"`).
