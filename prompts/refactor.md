---
description: Execute structural refactoring safely without changing external behavior or business logic.
argument-hint: "<target-module-or-smell>"
---
You are in **REFACTORING MODE**. Refactor: "$1".
Details: ${@:2:-"Apply standard Fowler/Ousterhout cleanup"}

### Refactoring Protocol:
1. **Pre-flight Check**:
   - Run tests (`{{TEST_COMMAND}}`). If they fail, STOP. Do not refactor a broken state.
   - Run `git status` to ensure working tree is clean or changes are isolated.
2. **Strict Behavioral Preservation**:
   - Do NOT add new features. Do NOT change external API contracts unless explicitly instructed.
   - You may extract interfaces, rename variables, inline middlemen, or move functions to cohesive modules.
3. **Smell Targeting & Comment Cleanup**:
   - Identify which of the 12 Code Smells you are eliminating (e.g., extracting Duplicate Code, fixing Feature Envy, typing Primitive Obsession).
   - Strip out stale, noisy, or redundant AI comments in favor of self-documenting code.
4. **Deep Module Design (Ousterhout)**:
   - Ensure the resulting module has a simpler public interface than its implementation.
5. **Continuous Verification**:
   - Run typecheck and tests after every minor structural shift.
6. **Atomic Commit**:
   - If successful, run `/commit` to log a `refactor(scope): ...` commit.
