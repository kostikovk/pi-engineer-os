/**
 * Smart Proactive Compaction Trigger for pi-engineer-os
 *
 * Monitors context saturation and provides safe, intelligent compaction triggers.
 * Ensures compaction never disrupts in-flight error processing or executes prematurely.
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

// High saturation threshold (88% of actual context window) to prevent premature compaction
const HIGH_SATURATION_PERCENT = 88;

export default function triggerCompactExtension(pi: ExtensionAPI) {
	let isCompacting = false;

	const triggerCompaction = (ctx: ExtensionContext, customInstructions?: string) => {
		if (isCompacting) return;
		isCompacting = true;

		if (ctx.hasUI) {
			ctx.ui.notify("Starting task-preserving compaction...", "info");
		}

		ctx.compact({
			customInstructions,
			onComplete: () => {
				isCompacting = false;
				if (ctx.hasUI) {
					ctx.ui.notify("Compaction complete — context renewed", "info");
				}
			},
			onError: (error) => {
				isCompacting = false;
				if (ctx.hasUI) {
					ctx.ui.notify(`Compaction failed: ${error.message}`, "error");
				}
			},
		});
	};

	// Only trigger proactive auto-compaction when context is genuinely near saturation (>88%)
	// and agent is at a settled turn boundary without pending tool errors
	pi.on("turn_end", (event, ctx) => {
		if (isCompacting) return;

		const usage = ctx.getContextUsage();
		if (!usage || usage.tokens === null || usage.percent === null) {
			return;
		}

		// Check if any tool failed in the current turn - if so, allow the agent to process
		// and fix the error first before compacting (unless context is > 96% critical overflow)
		const hasToolError = event.toolResults?.some((tr) => tr.isError);
		if (hasToolError && usage.percent < 96) {
			return;
		}

		// Only auto-trigger if context window is genuinely approaching saturation
		if (usage.percent >= HIGH_SATURATION_PERCENT) {
			triggerCompaction(
				ctx,
				"Context is near capacity. Preserve active task, error diagnostics, and immediate next steps.",
			);
		}
	});

	pi.registerCommand("trigger-compact", {
		description: "Trigger smart context compaction immediately",
		handler: async (args, ctx) => {
			const instructions = args.trim() || undefined;
			triggerCompaction(ctx, instructions);
		},
	});
}
