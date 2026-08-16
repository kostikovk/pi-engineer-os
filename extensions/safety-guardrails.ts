/**
 * Protected Paths Extension
 *
 * Blocks write and edit operations to protected paths.
 * Useful for preventing accidental modifications to sensitive files.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
	const protectedPaths = [".env", ".git/", "node_modules/"];

	pi.on("tool_call", async (event, ctx) => {
		if (event.toolName === "bash") {
			const cmd = event.input.command as string;
			const dangerousGitPatterns = [
				/git\s+push/,
				/git\s+reset\s+--hard/,
				/git\s+clean\s+-[f|d]+/,
				/git\s+branch\s+-D/,
				/git\s+checkout\s+\./,
				/git\s+restore\s+\./
			];

			if (dangerousGitPatterns.some(pattern => pattern.test(cmd))) {
				if (ctx.hasUI) {
					ctx.ui.notify(`Blocked dangerous bash command: ${cmd}`, "error");
				}
				return { block: true, reason: `Command "${cmd}" is blocked for safety. Agents cannot perform destructive git operations or push code directly.` };
			}
			return undefined;
		}

		if (event.toolName !== "write" && event.toolName !== "edit") {
			return undefined;
		}

		const path = event.input.path as string;
		const isProtected = protectedPaths.some((p) => path.includes(p));

		if (isProtected) {
			if (ctx.hasUI) {
				ctx.ui.notify(`Blocked write to protected path: ${path}`, "warning");
			}
			return { block: true, reason: `Path "${path}" is protected` };
		}

		return undefined;
	});
}
