# Coding Standards & Code Smells Baseline

This repository adheres to standard clean code guidelines and actively eliminates Martin Fowler code smells during code reviews.

## The 12 Fowler Code Smells Baseline

1. **Mysterious Name**: A function, variable, or type whose name doesn't reveal its intent. -> *Rename it.*
2. **Duplicated Code**: Identical or nearly identical logic across multiple files. -> *Extract shared helper.*
3. **Feature Envy**: A method that accesses another object's data more than its own. -> *Move method onto the target object.*
4. **Data Clumps**: The same 3+ fields passed together across functions. -> *Create a dedicated domain type/interface.*
5. **Primitive Obsession**: Using raw primitives (e.g. string for currency/email/status) instead of domain types. -> *Introduce value objects/branded types.*
6. **Repeated Switches**: The same `switch` or `if/else` cascade repeated in multiple places. -> *Replace with map lookup or polymorphism.*
7. **Shotgun Surgery**: A single logical change requires edits across many disjoint files. -> *Gather related code into a deep module.*
8. **Divergent Change**: A module changes for multiple unrelated business reasons. -> *Split module by responsibility.*
9. **Speculative Generality**: Unused abstractions, unused parameters, or future-proof hooks not needed by the current spec. -> *Delete and inline.*
10. **Message Chains**: `a.getB().getC().getD().doSomething()` leaky chains. -> *Hide delegate behind a single method.*
11. **Middle Man**: A function/class that only forwards calls to another class. -> *Remove wrapper.*
12. **Refused Bequest**: A subclass or implementation that overrides or throws on parent behavior. -> *Favor composition over inheritance.*

---

## Git Commit Standard (Conventional Commits 1.0.0)

All commits in this repository must be **atomic**, **verified** (typecheck/tests pass), and formatted according to **Conventional Commits**:

```text
<type>(<scope>): <imperative subject>

[optional body explaining WHY and architectural trade-offs]

[optional footer(s) / BREAKING CHANGE]
```

### Commit Types:
- `feat`: New user or API capability (SemVer Minor)
- `fix`: Bug fix (SemVer Patch)
- `refactor`: Structural improvement without changing behavior
- `perf`: Performance optimization
- `test`: Test suite additions or corrections
- `docs`: Documentation, README, or ADR updates
- `chore`: Build tools, dependencies, or linters
- `ci`: CI/CD pipeline changes

### Rules:
- **Imperative mood**: "add", "fix", "refactor" (never "added", "fixes").
- **Header limit**: <= 50-72 chars, lowercase, no trailing dot.
- **Atomic slicing**: 1 logical change per commit. Never mix refactoring with feature delivery.

