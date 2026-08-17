/**
 * Real-Time Token & Context Gauge Extension for pi-engineer-os
 *
 * Displays active model, token consumption, and context window saturation %
 * in Pi's interactive status bar to provide full transparency over context health and costs.
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

function formatTokens(count: number): string {
	if (count < 1000) return `${count} tok`;
	if (count < 1_000_000) return `${(count / 1000).toFixed(1)}k tok`;
	return `${(count / 1_000_000).toFixed(2)}M tok`;
}

export default function tokenGaugeExtension(pi: ExtensionAPI) {
	function updateGauge(ctx: ExtensionContext, statusText?: string) {
		if (!ctx.hasUI) return;

		const theme = ctx.ui.theme;
		const model = ctx.model ? `${ctx.model.provider}/${ctx.model.id}` : "unknown";

		let usageStr = "";
		try {
			if (typeof ctx.getContextUsage === "function") {
				const usage = ctx.getContextUsage() as any;
				if (usage && typeof usage.tokens === "number") {
					const tokens = usage.tokens;
					const limit = usage.limit || ctx.model?.contextWindow || 200_000;
					const percent = Math.min(100, Math.round((tokens / limit) * 100));

					const color = percent > 85 ? "error" : percent > 65 ? "warning" : "dim";
					usageStr = ` | ${theme.fg(color, `${formatTokens(tokens)} (${percent}%)`)}`;
				}
			}
		} catch {}

		const statusPart = statusText ? ` | ${statusText}` : "";
		ctx.ui.setStatus("context-gauge", `${theme.fg("accent", `🤖 ${model}`)}${usageStr}${statusPart}`);
	}

	pi.on("session_start", async (_event, ctx) => {
		updateGauge(ctx, ctx.ui.theme.fg("dim", "Ready"));
	});

	pi.on("model_select", async (_event, ctx) => {
		updateGauge(ctx);
	});

	pi.on("turn_start", async (_event, ctx) => {
		updateGauge(ctx, ctx.ui.theme.fg("accent", "● Thinking..."));
	});

	pi.on("turn_end", async (_event, ctx) => {
		updateGauge(ctx, ctx.ui.theme.fg("success", "✓ Done"));
	});

	pi.on("session_compact", async (_event, ctx) => {
		updateGauge(ctx, ctx.ui.theme.fg("warning", "⚡ Compacted"));
	});
}
