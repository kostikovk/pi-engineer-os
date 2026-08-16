---
description: Create a comprehensive technical spec (RFC) synthesizing the discussed requirements
argument-hint: "<feature-title> [extra-context]"
---
You are a Principal Engineer. Synthesize the requirements for "$1" into a clear, unambiguous Technical Specification.
Additional Context: ${@:2:-"None"}

Produce a concise Technical Specification in Markdown following this structure:

# RFC: $1

## 1. Context & Objectives
- Problem statement and business value.
- **Non-Goals**: Explicit list of out-of-scope items.

## 2. Architecture & Data Design (Deep Modules)
- Database/ORM changes (models, relations, indexes, migration strategy).
- Public Interfaces / API Endpoints / Server Actions with strict Zod/TypeScript types.
- Hidden internal implementation details (caching, normalization, transactions).

## 3. UI/UX & Component Architecture (if applicable)
- Component hierarchy (Server vs Client components).
- States: Initial, Loading (Skeleton), Empty, Error, Success.

## 4. Edge Cases, Failure Modes & Security
- Validation errors, concurrency/race conditions, rate limits, authorization rules.

## 5. Verification Plan
- Specific unit and integration tests to write before implementation.
