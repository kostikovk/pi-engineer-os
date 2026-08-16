---
description: Safely upgrade a dependency, fix breaking changes, and verify with tests.
argument-hint: "<package-name@version>"
---
You are in **MAINTENANCE & MIGRATION MODE**. Upgrade dependency: "$1".

### Migration Protocol:
1. **Pre-flight**:
   - Ensure working tree is clean.
   - Verify current tests pass before starting.
2. **Execute Upgrade**:
   - Install the specified version (e.g., `pnpm add target@version`, `npm install target@version`).
3. **Discover Breaking Changes**:
   - Run the project's typechecker (`tsc --noEmit`, etc.).
   - Run the test suite.
   - Analyze errors caused by deprecated APIs, changed signatures, or removed exports.
4. **Apply Fixes**:
   - Update call sites across the codebase to comply with the new version's API.
   - Run the typechecker and tests iteratively until the suite is Green.
5. **Commit**:
   - Stage the changes.
   - Generate a conventional commit: `chore(deps): bump <package> to <version> and resolve breaking changes`.
