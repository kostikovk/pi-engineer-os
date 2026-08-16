---
name: codebase-design
description: Shared vocabulary and discipline for designing deep modules. Use when designing or restructuring a module's interface, finding deepening opportunities, deciding seam placement, or designing for testability.
---

# Codebase Design

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface (*John Ousterhout, A Philosophy of Software Design*). Use this language and these principles wherever code is being designed or restructured. The aim is leverage for callers, locality for maintainers, and testability for everyone.

## Glossary

Use these terms exactly — don't substitute "component," "service," "API," or "boundary." Consistent language is the whole point.

- **Module** — anything with an interface and an implementation. Deliberately scale-agnostic: a function, class, package, or tier-spanning slice.
- **Interface** — everything a caller must know to use the module correctly: the type signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics.
- **Implementation** — what's inside a module, its body of code. Distinct from **Adapter**: a thing can be a small adapter with a large implementation (a Postgres repo) or a large adapter with a small implementation (an in-memory fake).
- **Depth** — leverage at the interface: the amount of behaviour a caller (or test) can exercise per unit of interface they have to learn. A module is **deep** when a large amount of behaviour sits behind a small interface, **shallow** when the interface is nearly as complex as the implementation.
- **Seam** *(Michael Feathers)* — a place where you can alter behaviour without editing in that place; the *location* at which a module's interface lives.
- **Adapter** — a concrete thing that satisfies an interface at a seam.
- **Leverage** — what callers get from depth: more capability per unit of interface they learn. One implementation pays back across N call sites and M tests.
- **Locality** — what maintainers get from depth: change, bugs, knowledge, and verification concentrate in one place rather than spreading across callers. Fix once, fixed everywhere.

## Deep vs Shallow Modules

```
┌─────────────────────┐
│   Small Interface   │  ← Few methods, simple params, clear types
├─────────────────────┤
│                     │
│  Deep Implementation│  ← Complex logic, validation, caching, state hidden
│                     │
└─────────────────────┘
```

**Shallow module (AVOID):**
```
┌─────────────────────────────────┐
│       Large Interface           │  ← Many methods, leaky details, complex params
├─────────────────────────────────┤
│  Thin Implementation            │  ← Just passes through to another helper
└─────────────────────────────────┘
```

When designing an interface, ask:
1. Can I reduce the number of exported methods/functions?
2. Can I simplify the parameters and hide internal configuration?
3. Can I hide more error handling, normalization, or side-effects inside?

## Core Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, mockable, swappable parts — they just aren't exposed in the public interface.
- **The Deletion Test.** Imagine deleting the module. If complexity vanishes, it was a pass-through (shallow). If complexity reappears scattered across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. If you need to test *past* the public interface by reaching into private state, the module is the wrong shape.
- **Design It Twice.** Never settle on the first interface shape that comes to mind. Sketch two radically different API designs before writing implementation code. See `DESIGN-IT-TWICE.md`.
