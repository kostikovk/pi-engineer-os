/**
 * Project Rules Auto-Discovery Extension
 *
 * Scans the workspace for engineering rules in:
 * - .claude/rules/*.md
 * - docs/rules/*.md
 * - .cursorrules
 * - CODING_STANDARDS.md
 *
 * Injects available rules into the agent context via `before_agent_start`.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

function findMarkdownFiles(dir: string, basePath: string = ""): string[] {
	const results: string[] = [];
	if (!fs.existsSync(dir)) return results;

	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;
			if (entry.isDirectory()) {
				results.push(...findMarkdownFiles(path.join(dir, entry.name), relativePath));
			} else if (entry.isFile() && (entry.name.endsWith(".md") || entry.name.endsWith(".mdc"))) {
				results.push(relativePath);
			}
		}
	} catch {
		// Ignore directory access errors
	}
	return results;
}

export default function projectRulesExtension(pi: ExtensionAPI) {
	let discoveredRules: string[] = [];

	pi.on("session_start", async (_event, ctx) => {
		discoveredRules = [];

		// Check .claude/rules
		const claudeRulesDir = path.join(ctx.cwd, ".claude", "rules");
		const claudeFiles = findMarkdownFiles(claudeRulesDir);
		for (const f of claudeFiles) {
			discoveredRules.push(`.claude/rules/${f}`);
		}

		// Check docs/rules
		const docsRulesDir = path.join(ctx.cwd, "docs", "rules");
		const docsFiles = findMarkdownFiles(docsRulesDir);
		for (const f of docsFiles) {
			discoveredRules.push(`docs/rules/${f}`);
		}

		// Check root files
		const rootRuleFiles = [".cursorrules", "CODING_STANDARDS.md", "docs/CODING_STANDARDS.md"];
		for (const rf of rootRuleFiles) {
			if (fs.existsSync(path.join(ctx.cwd, rf))) {
				discoveredRules.push(rf);
			}
		}

		if (discoveredRules.length > 0) {
			ctx.ui.notify(`📋 Discovered ${discoveredRules.length} project rule file(s)`, "info");
		}
	});

	pi.on("before_agent_start", async (event) => {
		if (discoveredRules.length === 0) {
			return;
		}

		const rulesListing = discoveredRules.map((r) => `- \`${r}\``).join("\n");
		return {
			systemPrompt:
				event.systemPrompt +
				`\n\n## 📋 Project Architectural & Coding Rules\nThe following project-specific rules are available in this repository:\n${rulesListing}\n\nRead relevant rule files before designing or modifying related code modules.`,
		};
	});
}
