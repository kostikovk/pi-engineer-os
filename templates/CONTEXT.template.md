# Project Domain Context (`CONTEXT.md`)

This document defines the **Ubiquitous Language** for this repository. All engineers and AI agents must use these terms consistently.

## Core Concepts & Glossary

| Term | Definition | What it replaces |
| :--- | :--- | :--- |
| **Workspace** | The root multi-package or multi-app container | "Root repo", "monorepo directory" |
| **Artifact** | A generated or exported document produced by the system | "PDF", "downloadable result" |
| **Tenant** | An isolated organization or user account boundary | "Account", "company scope" |

## Architectural Invariants
- Direct cross-app imports are prohibited in monorepos.
- All database access must pass through the designated data-access layer / repository modules.
