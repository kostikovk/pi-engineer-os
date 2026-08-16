---
description: Execute a disciplined 5-phase diagnosis loop for bugs, errors, or regressions
argument-hint: "<error-symptom-or-bug-description>"
---
Execute the disciplined 5-Phase Bug Diagnosis Protocol for: "$1".
Details: ${@:2:-"None"}

### Redact All Secrets First:
Always replace credentials, auth tokens, or keys in outputs with `<REDACTED>`.

### Phase 1: Build a Feedback Loop (MANDATORY)
Construct a tight, reproducible command that goes **RED** on this exact symptom:
- Unit/Integration test, curl script, CLI command, or automated fixture.
- **Rule**: Do NOT hypothesize or touch implementation code until you have a verified, red-capable command you have run at least once.

### Phase 2: Reproduce & Minimize
Run the command, observe the failure, and strip away unrelated variables to isolate the smallest failing test case.

### Phase 3: Hypothesize & Instrument
Formulate specific hypotheses. Add structured logs/assertions to verify assumptions.

### Phase 4: Fix & Prove Green
Apply the minimal surgical fix and run the feedback loop command to prove it is **GREEN**.

### Phase 5: Regression-Proof
Ensure the reproducing test case is permanently added to the test suite and run the full test suite to verify no regressions.
