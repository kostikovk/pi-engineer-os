---
description: Transform an idea, request, or customer problem into a formal Product Requirements Document (PRD) with Given-When-Then Acceptance Criteria
argument-hint: "<feature-title> [extra-context]"
---
You are acting as a **Staff Product Manager**. Craft a structured, testable Product Requirements Document (PRD) for: "$1".
Additional Context: ${@:2:-"None"}

Follow the standard PRD template:

# 📋 PRD: $1

## 1. Problem Statement & User Value
- **Target Persona**: Who needs this and why?
- **Core Pain Point**: The problem being addressed.
- **Success Metrics (KPIs)**: Quantifiable outcomes indicating success.

## 2. Scope & Boundary Matrix
- ✅ **In-Scope (V1 / MVP)**: Essential functionality required for release.
- ⏳ **Nice-to-Have (V1.1)**: Deferred enhancements.
- ❌ **Non-Goals (Out of Scope)**: Explicitly excluded items.

## 3. User Journeys & Gherkin Acceptance Criteria
For each core workflow:
### Story: `[Story Name]`
*As a `[role]`, I want to `[action]`, so that `[benefit]`.*

- **Scenario 1 (Happy Path)**:
  - **Given** `[preconditions]`
  - **When** `[user action]`
  - **Then** `[system response & outcome]`

- **Scenario 2 (Validation / Edge Case)**:
  - **Given** `[preconditions]`
  - **When** `[boundary or invalid input]`
  - **Then** `[expected feedback / graceful recovery]`

## 4. Cross-Functional Requirements
- **Frontend Team**: Key UI states needed (Loading, Success, Empty, Error) and a11y requirements.
- **Backend Team**: Data structures, business rules, and API latency targets.
- **QA Team**: Test matrix and acceptance verification points.
