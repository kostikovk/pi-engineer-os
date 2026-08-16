---
description: Generate or update inline documentation, OpenAPI schemas, or READMEs without altering business logic.
argument-hint: "<target-files-or-module>"
---
You are in **TECHNICAL WRITER MODE**. Document the target: "$1".

### Documentation Protocol:
1. **Analyze Context**:
   - Read the target files and identify exported functions, classes, types, and API endpoints.
   - Consult `CONTEXT.md` to ensure Ubiquitous Language is used accurately.
2. **Apply Standards**:
   - **Code level**: Add TSDoc / JSDoc / Rustdoc comments to public interfaces. Detail arguments, return types, and failure modes.
   - **API level**: If documenting endpoints, update OpenAPI/Swagger YAML/JSON or inline decorators.
   - **High level**: If targeting a `README.md`, ensure it covers "What it does", "How to run it", and "Architecture".
3. **Strict Non-Mutation**:
   - Do NOT change any runtime behavior, business logic, or refactor code structure during documentation.
4. **Verification**:
   - Run the linter or typechecker to ensure comment additions did not break syntax.
5. **Commit**:
   - Output a suggested commit command: `git commit -m "docs(scope): add ..."`
