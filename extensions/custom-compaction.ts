/**
 * Smart Task-Preserving Compaction Extension for pi-engineer-os
 *
 * Replaces default compaction with a robust, lossless engineering state checkpoint.
 * When compaction occurs (due to context threshold, overflow recovery, or /compact):
 * 1. Preserves the active user goal and exact in-flight sub-task.
 * 2. Captures recent tool errors, failures, exit codes, root causes, and fix plans.
 * 3. Tracks modified/created files and uncommitted working state.
 * 4. Injects an authoritative IMMEDIATE RESUME DIRECTIVE so the agent resumes the
 *    interrupted task automatically without stopping or asking the user.
 */

import { uuidv7 } from "@earendil-works/pi-ai";
import type { ExtensionAPI, SessionEntry } from "@earendil-works/pi-coding-agent";
import { convertToLlm, serializeConversation } from "@earendil-works/pi-coding-agent";

export default function customCompactionExtension(pi: ExtensionAPI) {
	pi.on("session_before_compact", async (event, ctx) => {
		const { preparation, branchEntries: _, customInstructions, reason, willRetry, signal } = event;
		const { messagesToSummarize, turnPrefixMessages, tokensBefore, firstKeptEntryId, previousSummary } = preparation;

		// Use fast summarization model if available, fallback to active model
		const model = ctx.modelRegistry.find("google", "gemini-2.5-flash") || ctx.model;
		if (!model) {
			if (ctx.hasUI) {
				ctx.ui.notify("No suitable model found for custom compaction, using default", "warning");
			}
			return;
		}

		const allMessages = [...messagesToSummarize, ...turnPrefixMessages];

		if (ctx.hasUI) {
			const reasonStr = reason === "overflow" ? "context overflow recovery" : reason === "manual" ? "manual request" : "context budget";
			ctx.ui.notify(
				`Preserving task context & compacting ${allMessages.length} messages (${tokensBefore.toLocaleString()} tokens, ${reasonStr})...`,
				"info",
			);
		}

		// Convert messages to readable text format
		const conversationText = serializeConversation(convertToLlm(allMessages));

		const previousContext = previousSummary ? `\n\n### Previous Session Summary Context:\n${previousSummary}` : "";
		const customContext = customInstructions ? `\n\n### User-Specified Focus:\n${customInstructions}` : "";
		const retryContext = willRetry ? `\n\n### Note: This compaction is an OVERFLOW RECOVERY. The interrupted turn will retry immediately.` : "";

		const systemPrompt = `You are an elite Engineering State Checkpointer and Context Preserver for an AI coding agent.
Your mission is to distill the conversation into a high-density, actionable state snapshot.
CRITICAL REQUIREMENT: The resulting summary must allow the agent to immediately and seamlessly RESUME the interrupted task without asking the user questions or losing context.

Generate a structured summary following this exact Markdown template:

## 🎯 Active Goal & Scope
- High-level user objective and current milestone.

## ⚡ Active In-Flight Task & Interrupted Operation
- **Current Task**: Exactly what task was being executed when compaction occurred.
- **Interrupted Step**: The precise tool call, file edit, command, or test that was in progress.
- **Sub-tasks Completed**: [x] Completed items.
- **Sub-tasks Remaining**: [ ] Pending items.

## 🚨 Errors, Failures & Diagnostics (if any occurred)
- **Error Description**: Exact error message, test failure, or non-zero exit code from recent tool calls.
- **Root Cause**: Why the failure occurred.
- **Remediation Plan**: The concrete fix strategy already identified or underway.

## 📂 Working State & Files
- **Modified / Created Files**: Key files changed and their current state.
- **Read / Referenced Files**: Key files containing critical schema, tests, or business logic.

## 🏛️ Key Decisions & Invariants
- Architectural choices, ADRs, coding standards, or domain constraints established.

## 🚀 MANDATORY IMMEDIATE RESUME DIRECTIVE
State clear, imperative instructions for the agent resuming execution:
"The agent must immediately proceed with executing the active task without pausing or asking the user for input.
1. [First immediate concrete action: e.g. Fix line X in file Y / Run command Z / Continue implementation of W]
2. [Subsequent action]"`;

		const userMessage = {
			role: "user" as const,
			content: [
				{
					type: "text" as const,
					text: `Summarize this engineering session while preserving full task and error context so execution can continue seamlessly:${previousContext}${customContext}${retryContext}

<conversation>
${conversationText}
</conversation>`,
				},
			],
			timestamp: Date.now(),
		};

		try {
			const response = await ctx.modelRegistry.complete(
				model,
				{ systemPrompt, messages: [userMessage] },
				{
					maxTokens: 8192,
					signal,
					cacheRetention: "none",
					sessionId: uuidv7(),
				},
			);

			const summary = response.content
				.filter((c): c is { type: "text"; text: string } => c.type === "text")
				.map((c) => c.text)
				.join("\n");

			if (!summary.trim()) {
				if (!signal.aborted && ctx.hasUI) {
					ctx.ui.notify("Compaction summary was empty, using default compaction", "warning");
				}
				return;
			}

			return {
				compaction: {
					summary,
					firstKeptEntryId,
					tokensBefore,
					usage: response.usage,
				},
			};
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			if (ctx.hasUI) {
				ctx.ui.notify(`Custom compaction failed: ${message}`, "error");
			}
			return;
		}
	});

	pi.on("session_compact", async (event, ctx) => {
		if (ctx.hasUI) {
			const trigger = event.reason === "overflow" ? "overflow recovery" : event.reason;
			ctx.ui.notify(`Context compacted (${trigger}) — task state preserved. Resuming...`, "success");
		}
	});

	pi.on("session_compact_failed", async (event, ctx) => {
		if (ctx.hasUI && !event.aborted) {
			ctx.ui.notify(`Compaction failed: ${event.errorMessage || "Unknown error"}`, "error");
		}
	});
}
