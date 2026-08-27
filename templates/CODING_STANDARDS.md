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

## Frontend Engineering Review Standards

All frontend code must satisfy the following 5 core criteria:
1. **5 Essential UI States**: Every interactive screen or component must explicitly handle:
   - 🌀 **Loading**: Skeleton or Suspense boundary (0 Layout Shift / CLS = 0).
   - ⚡ **Success**: Clean data presentation with optimistic feedback where applicable.
   - 📭 **Empty**: Actionable empty state guiding the user.
   - 🚨 **Error**: Granular error boundary with retry capability.
   - 🔒 **Unauthorized / Restricted**: Clear access-denied state or redirect.
2. **Accessibility (WCAG 2.1 AA)**:
   - Semantic HTML tags (`<button>`, `<nav>`, `<main>`, `<article>` over clickable `<div>`).
   - Keyboard accessible (Tab, Enter, Escape), focus management in dialogs/modals, proper ARIA labels.
3. **State & Re-render Ergonomics**:
   - Do NOT duplicate server state in local `useState`. Use server cache (TanStack Query / SWR / RSC).
   - Colocate state as close as possible to leaf consumers to avoid cascading re-renders.
4. **Design System & Token Compliance**:
   - Use design tokens / CSS variables for spacing, colors, and typography. Never use hardcoded arbitrary hex colors or rogue pixel values.
5. **Contract Adherence**:
   - Strict TypeScript prop types and response validation matching the shared API contract.

---

## Backend Engineering Review Standards

All backend code must satisfy the following 5 core criteria:
1. **Strict Boundary Validation**:
   - Every external payload (body, query, headers, params) must be validated via schema (Zod, Pydantic, Serde) before executing domain logic.
2. **Database Invariants & Query Efficiency**:
   - No $N+1$ queries (use eager loading / DataLoader / JOINs).
   - Ensure foreign keys and filter fields have backing database indexes.
   - Wrap multi-table mutations inside atomic database transactions.
3. **Idempotency & Race Condition Defense**:
   - Mutating operations must support idempotency keys or unique constraints to prevent double-charges/duplicate records on client retries.
   - Guard concurrent balance/inventory mutations with optimistic locking or row locks.
4. **RFC 7807 Standard Error Envelopes**:
   - Return structured error objects with machine-readable codes (`type`, `title`, `status`, `detail`).
   - Never leak internal stack traces or database schema details in 500 responses.
5. **Deep Domain Encapsulation**:
   - Keep business logic isolated from HTTP/RPC transport layers. Controllers must delegate to pure domain services.

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

