/**
 * Safety Gate Extension for pi-engineer-os
 *
 * Intercepts dangerous bash commands and destructive session operations
 * to prevent accidental data loss, branch corruption, or unauthorized deletions.
 */

import type { ExtensionAPI, SessionBeforeSwitchEvent, SessionMessageEntry } from "@earendil-works/pi-coding-agent";

const DANGEROUS_COMMAND_PATTERNS = [
	{ pattern: /\brm\s+(-[a-zA-Z]*r[a-zA-Z]*f?|--recursive)\b/i, name: "Recursive file deletion (rm -rf)" },
	{ pattern: /\bgit\s+push\s+.*(--force|-f)\b/i, name: "Force git push (git push --force)" },
	{ pattern: /\bgit\s+reset\s+--hard\b/i, name: "Hard git reset (git reset --hard)" },
	{ pattern: /\bgit\s+clean\s+(-[a-zA-Z]*f[a-zA-Z]*d?)\b/i, name: "Untracked files removal (git clean -fd)" },
	{ pattern: /\b(DROP\s+DATABASE|DROP\s+TABLE|TRUNCATE\s+TABLE)\b/i, name: "Destructive SQL operation (DROP/TRUNCATE)" },
	{ pattern: /\b(chmod|chown)\s+(-R|--recursive)\s+777\b/i, name: "Unsafe recursive permissions (777)" },
	{ pattern: /\bsudo\b/i, name: "Elevated superuser execution (sudo)" },
];

export default function safetyGateExtension(pi: ExtensionAPI) {
	// Intercept dangerous bash tool calls
	pi.on("tool_call", async (event, ctx) => {
		if (event.toolName !== "bash") return undefined;

		const command = (event.input?.command as string) || "";
		const matched = DANGEROUS_COMMAND_PATTERNS.find((item) => item.pattern.test(command));

		if (matched) {
			if (!ctx.hasUI) {
				return {
					block: true,
					reason: `SafetyGate blocked dangerous command in non-interactive mode: "${matched.name}". Command: ${command}`,
				};
			}

			const promptMessage = `⚠️ [SafetyGate Alert]\nDetected: ${matched.name}\n\nCommand:\n  ${command}\n\nDo you want to authorize this execution?`;
			const choice = await ctx.ui.select(promptMessage, ["Authorize & Run", "Block Execution"]);

			if (choice !== "Authorize & Run") {
				ctx.ui.notify(`Execution blocked: ${matched.name}`, "warning");
				return {
					block: true,
					reason: `Execution blocked by user authorization gate: "${matched.name}".`,
				};
			}
		}

		return undefined;
	});

	// Guard destructive session clears
	pi.on("session_before_switch", async (event: SessionBeforeSwitchEvent, ctx) => {
		if (!ctx.hasUI) return;

		if (event.reason === "new") {
			const confirmed = await ctx.ui.confirm(
				"Clear session?",
				"This will clear all current messages in the active session.",
			);
			if (!confirmed) {
				ctx.ui.notify("Session clear cancelled", "info");
				return { cancel: true };
			}
			return;
		}

		if (event.reason === "resume") {
			const entries = ctx.sessionManager.getEntries();
			const hasUnsavedWork = entries.some(
				(e): e is SessionMessageEntry => e.type === "message" && e.message.role === "user",
			);
			if (hasUnsavedWork) {
				const confirmed = await ctx.ui.confirm(
					"Switch session?",
					"You have unsaved messages in this branch. Switch anyway?",
				);
				if (!confirmed) {
					ctx.ui.notify("Session switch cancelled", "info");
					return { cancel: true };
				}
			}
		}
	});

	// Guard session fork
	pi.on("session_before_fork", async (event, ctx) => {
		if (!ctx.hasUI) return;

		const choice = await ctx.ui.select(`Fork session branch from entry ${event.entryId.slice(0, 8)}?`, [
			"Yes, create branch fork",
			"No, remain on current branch",
		]);

		if (choice !== "Yes, create branch fork") {
			ctx.ui.notify("Fork cancelled", "info");
			return { cancel: true };
		}
	});
}
