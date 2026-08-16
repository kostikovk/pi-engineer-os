---
description: Automatically discover structure and generate a comprehensive map of the repository's modules and endpoints.
argument-hint: "[scope]"
---
You are an expert Systems Mapper. Your task is to generate a dynamic map of the codebase for orientation.
Scope to map: ${@:-"Full repository"}

Execute the mapping protocol:
1. Scan the repository structure (src, packages, apps) excluding `node_modules` and `.git`.
2. Parse key files to identify:
   - Exported modules, domain entities, and classes.
   - API endpoints, Server Actions, or GraphQL resolvers.
   - Key architectural boundaries and dependency relationships.
3. Generate a Markdown document (`docs/architecture-map.md` or output to console if requested) containing:
   - A high-level directory tree.
   - A list of core modules with their primary responsibilities.
   - Any identified "Ball of Mud" warnings where boundaries are unclear.
4. Keep the output concise and structured. Do not include full source code.
