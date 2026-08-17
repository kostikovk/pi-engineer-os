/**
 * Git Merge & Conflict Resolver Extension for pi-engineer-os
 *
 * Automatically detects Git merge conflicts, tracks conflict blocks (ours vs theirs),
 * and provides the /resolve-conflicts command for AI-assisted semantic resolution.
 */

import { createReadStream } from "node:fs";
import { join } from "node:path";
import { createInterface } from "node:readline";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

interface ConflictBlock {
	file: string;
	startLine: number;
	separatorLine: number;
	endLine: number;
}

/** Parse conflict markers from working tree files with unmerged paths. */
async function findConflicts(pi: ExtensionAPI, cwd: string): Promise<ConflictBlock[]> {
	const { stdout, code } = await pi.exec("git", ["diff", "--name-only", "--diff-filter=U"], { cwd });
	if (code !== 0 || !stdout.trim()) return [];

	const blocks: ConflictBlock[] = [];
	for (const file of stdout.trim().split("\n")) {
		try {
			const rl = createInterface({ input: createReadStream(join(cwd, file), "utf-8") });
			let lineNo = 0;
			let blockStart: number | undefined;
			let separatorLine: number | undefined;
			for await (const line of rl) {
				lineNo++;
				if (line.startsWith("<<<<<<<")) {
					blockStart = lineNo;
					separatorLine = undefined;
				} else if (line.startsWith("=======") && blockStart !== undefined) {
					separatorLine = lineNo;
				} else if (line.startsWith(">>>>>>>") && blockStart !== undefined && separatorLine !== undefined) {
					blocks.push({ file, startLine: blockStart, separatorLine, endLine: lineNo });
					blockStart = undefined;
					separatorLine = undefined;
				}
			}
		} catch {}
	}
	return blocks;
}

function formatRange(start: number, end: number): string {
	if (start > end) return "empty";
	if (start === end) return `${start}`;
	return `${start}-${end}`;
}

function formatConflicts(ref: string, blocks: ConflictBlock[]): string {
	const lines = [`🔀 Git Merge Conflicts detected with ${ref}:`, ""];
	for (const b of blocks) {
		const ours = formatRange(b.startLine + 1, b.separatorLine - 1);
		const theirs = formatRange(b.separatorLine + 1, b.endLine - 1);
		lines.push(`  - ${b.file}:${b.startLine}-${b.endLine} (ours: lines ${ours}, theirs: lines ${theirs})`);
	}
	lines.push(
		"",
		"Please read the conflicting files, analyze the intent of both branches, and resolve the conflict markers cleanly while preserving functionality.",
	);
	return lines.join("\n");
}

export default function gitMergeAndResolveExtension(pi: ExtensionAPI) {
	// Register /resolve-conflicts command
	pi.registerCommand("resolve-conflicts", {
		description: "Scan the working tree for Git merge conflicts and trigger AI resolution",
		handler: async (_args, ctx) => {
			const conflicts = await findConflicts(pi, ctx.cwd);
			if (conflicts.length === 0) {
				ctx.ui.notify("No unmerged conflict markers found in working tree.", "info");
				return;
			}

			ctx.ui.notify(`Found ${conflicts.length} conflict block(s). Initiating resolution...`, "warning");
			pi.sendUserMessage(formatConflicts("target branch", conflicts));
		},
	});

	// Automatically detect unresolved conflicts when agent turn completes
	pi.on("agent_end", async (_event, ctx) => {
		const { code: revParseCode } = await pi.exec("git", ["rev-parse", "--git-dir"], { cwd: ctx.cwd });
		if (revParseCode !== 0) return;

		const conflicts = await findConflicts(pi, ctx.cwd);
		if (conflicts.length === 0) return;

		ctx.ui.notify(`Unresolved git conflicts remaining in ${conflicts.length} location(s)`, "warning");
	});
}
