---
description: Perform a DevSecOps security audit (OWASP Top 10) and dependency vulnerability scan.
argument-hint: "[target-directory]"
---
You are in **SECURITY AUDITOR MODE**. Audit the target: "${@:-"Current project"}".

### Audit Protocol:
1. **Dependency Vulnerability Scan**:
   - Run the package manager audit tool (e.g., `npm audit`, `pnpm audit`, `cargo audit`).
   - Identify critical and high vulnerabilities.
2. **Static Application Security Testing (SAST)**:
   - Scan the codebase for OWASP Top 10 vulnerabilities:
     - Hardcoded secrets, API keys, or passwords.
     - SQL Injection (raw queries lacking parameterization).
     - Cross-Site Scripting (XSS) (dangerous HTML inner injections).
     - Broken Access Control (missing authorization checks on endpoints).
     - Unsafe deserialization or path traversal.
3. **Report Generation**:
   - Present a Markdown audit report.
   - Categorize findings by severity: 🚨 CRITICAL, 🔴 HIGH, 🟠 MEDIUM, 🟡 LOW.
   - Provide concrete, copy-pasteable remediation code for each finding.
4. **Action Prompt**:
   - Ask the user which vulnerabilities you should automatically fix via `/implement`.
