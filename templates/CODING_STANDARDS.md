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

## Zero-Noise Code Commenting Policy

This repository strictly enforces John Ousterhout's (*A Philosophy of Software Design*), Robert C. Martin's (*Clean Code*), and Google Style Guide commenting standards. **All code must be self-documenting first.**

### 🚫 Prohibited Comments (AI Comment Noise / Anti-Patterns)
1. **Echo / Redundant Comments**: Do NOT repeat the name of a function, variable, or statement in plain English.
   ```typescript
   // ❌ BAD:
   // Fetch user by id
   function fetchUserById(id: string) {}

   // ❌ BAD:
   // Check if user is authenticated
   if (user.isAuthenticated) {}

   // ❌ BAD:
   // Initialize count
   let count = 0;
   ```
2. **"HOW" Narration Comments**: Never narrate mechanics that are obvious from readable code.
   ```typescript
   // ❌ BAD:
   // Filter active users and map to their emails
   const emails = users.filter(u => u.isActive).map(u => u.email);
   ```
3. **Decorative Banners & ASCII Boxes**:
   ```typescript
   // ❌ BAD:
   // ==========================================
   // HELPER FUNCTIONS
   // ==========================================
   ```
4. **Changelog / Author Tags**: Never leave history traces inside files (use `git blame` / `git log`).
   ```typescript
   // ❌ BAD:
   // Added by AI on 2025-01-10 to fix ticket #123
   ```
5. **Comments Explaining Bad Code**: Do not comment messy logic — refactor the code (meaningful identifiers, smaller functions).

### ✅ Legitimate Comments (The Only 4 Allowed Types)
1. **Design Rationale ("WHY")**: Explains non-obvious engineering decisions, trade-offs, or business logic constraints that cannot be inferred from code.
   ```typescript
   // ✅ GOOD:
   // We use HTTP 302 instead of 301 because legacy mobile clients (v1.x)
   // cache 301 permanently, breaking regional DNS migrations.
   ```
2. **External Bug Workarounds & Issues**: References external vendor/browser bugs or workarounds.
   ```typescript
   // ✅ GOOD:
   // Workaround for Safari 16 WebKit flexbox rendering bug (see https://bugs.webkit.org/show_bug.cgi?id=12345)
   ```
3. **Public Contract Documentation (TSDoc / JSDoc)**: Essential for exported module boundaries to define parameters, return values, exceptions (`@throws`), and preconditions without restating types.
   ```typescript
   /**
    * Charges customer account with automatic idempotency handling.
    *
    * @throws {PaymentGatewayError} If provider returns 5xx after 3 retries.
    * @note Thread-safe: Acquires distributed Redis lock per accountId.
    */
   export async function chargeAccount(accountId: string, amount: Money): Promise<Receipt>
   ```
4. **Complex Invariants, Math Formulas, or Security Constraints**:
   ```typescript
   // ✅ GOOD:
   // RFC 5322 simplified email validation regex; strictly enforces TLD presence.
   const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   ```

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

