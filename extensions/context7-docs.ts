/**
 * Context7 Documentation & Live Knowledge Extension for Pi
 *
 * Provides live, version-specific framework & library documentation
 * directly to the AI agent via Context7 API to eliminate hallucinations.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";

const CONTEXT7_PARAMS = Type.Object({
	library: Type.String({
		description: "Name of the library, framework, or package (e.g. 'nextjs', 'prisma', 'tailwindcss', 'vitest', 'stripe', 'drizzle')",
	}),
	query: Type.String({
		description: "Specific feature, API method, hook, or problem to look up (e.g. 'Server Actions', 'cacheLife directive', 'v7 driver adapters')",
	}),
	version: Type.Optional(
		Type.String({
			description: "Target version if specific (e.g. '15', '16', '7', '4')",
		}),
	),
});

export default function context7Extension(pi: ExtensionAPI) {
	// Register context7_docs tool
	pi.registerTool({
		name: "context7_docs",
		label: "Context7 Docs",
		description:
			"Fetch up-to-date, version-accurate documentation and code examples for any framework, library, or API via Context7. Use this before implementing features with external libraries to avoid using deprecated APIs or hallucinating signatures.",
		promptSnippet: "Fetch real-time, version-specific library and framework documentation via Context7.",
		promptGuidelines: [
			"Always inspect the local project manifest (e.g. package.json, Cargo.toml, pyproject.toml) to obtain the exact installed version before calling context7_docs.",
			"Never guess package versions or rely on memory — always use the real version installed in the project.",
			"Do not guess syntax for version-specific breaking changes — query Context7 with the verified version first.",
		],
		parameters: CONTEXT7_PARAMS,
		async execute(_toolCallId, params) {
			const { library, query, version } = params;
			const apiKey = process.env.CONTEXT7_API_KEY;

			try {
				// Construct search query
				const searchQuery = `${library} ${version ? `v${version}` : ""} ${query}`.trim();
				const headers: Record<string, string> = {
					"User-Agent": "pi-engineer-os/1.0",
					Accept: "application/json, text/plain, */*",
				};
				if (apiKey) {
					headers["Authorization"] = `Bearer ${apiKey}`;
				}

				// Query Context7 API or public knowledge endpoint
				const apiUrl = `https://context7.com/api/v1/search?q=${encodeURIComponent(searchQuery)}`;
				const response = await fetch(apiUrl, { headers });

				if (response.ok) {
					const data = await response.json();
					const docsText = typeof data === "string" ? data : data.content || data.markdown || JSON.stringify(data, null, 2);
					return {
						content: [
							{
								type: "text",
								text: `# Context7 Docs: ${library} (${query})\n\n${docsText}`,
							},
						],
						details: { library, query, version, source: "context7" },
					};
				}

				// Fallback to direct documentation search if Context7 direct endpoint is unreachable
				return {
					content: [
						{
							type: "text",
							text: `ℹ️ Context7 query for "${searchQuery}" returned status ${response.status}. Please check local node_modules or official web docs.`,
						},
					],
					details: { library, query, status: response.status },
				};
			} catch (err: any) {
				return {
					content: [
						{
							type: "text",
							text: `⚠️ Could not query Context7: ${err.message}. Relying on local types and node_modules docs.`,
						},
					],
					details: { error: err.message },
				};
			}
		},
	});

	// Register /docs user command
	pi.registerCommand("docs", {
		description: "Query Context7 documentation: /docs <library> <topic>",
		handler: async (args, ctx) => {
			if (!args || args.trim().length === 0) {
				ctx.ui.notify("Usage: /docs <library> <topic> (e.g. /docs nextjs server-actions)", "warning");
				return;
			}
			ctx.ui.notify(`Looking up documentation for: ${args}...`, "info");
			pi.sendUserMessage(`Look up current documentation and best practices for: ${args} using context7_docs.`);
		},
	});
}
