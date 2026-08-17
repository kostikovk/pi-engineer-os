/**
 * Inline Bash & File Embed Extension for pi-engineer-os
 *
 * Enables inline execution of bash commands and file embeddings inside user prompts:
 *   - !{command} -> Executes command and replaces placeholder with trimmed stdout/stderr
 *   - @{filepath} -> Reads file and inlines contents into the prompt
 */

import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const CMD_PATTERN = /!\{([^}]+)\}/g;
const FILE_PATTERN = /@\{([^}]+)\}/g;
const TIMEOUT_MS = 25000;
const MAX_FILE_SIZE_BYTES = 30 * 1024; // 30 KB cap for inline embeds

export default function inlineBashExtension(pi: ExtensionAPI) {
	pi.on("input", async (event, ctx) => {
		let text = event.text;

		// Preserve regular whole-line !command syntax
		if (text.trimStart().startsWith("!") && !text.trimStart().startsWith("!{")) {
			return { action: "continue" };
		}

		const hasCommands = CMD_PATTERN.test(text);
		const hasFiles = FILE_PATTERN.test(text);
		CMD_PATTERN.lastIndex = 0;
		FILE_PATTERN.lastIndex = 0;

		if (!hasCommands && !hasFiles) {
			return { action: "continue" };
		}

		const expansions: string[] = [];

		// 1. Expand inline commands !{cmd}
		if (hasCommands) {
			const cmdMatches: Array<{ full: string; command: string }> = [];
			let match = CMD_PATTERN.exec(text);
			while (match) {
				cmdMatches.push({ full: match[0], command: match[1] });
				match = CMD_PATTERN.exec(text);
			}

			for (const { full, command } of cmdMatches) {
				try {
					const bashResult = await pi.exec("bash", ["-c", command], {
						cwd: ctx.cwd,
						timeout: TIMEOUT_MS,
					});
					const output = (bashResult.stdout || bashResult.stderr || "").trim();
					text = text.replace(full, output);
					expansions.push(`!{${command}} (${output.length} chars)`);
				} catch (err: any) {
					text = text.replace(full, `[command error: ${err.message}]`);
					expansions.push(`!{${command}} (failed: ${err.message})`);
				}
			}
		}

		// 2. Expand inline file references @{file}
		if (hasFiles) {
			const fileMatches: Array<{ full: string; path: string }> = [];
			let match = FILE_PATTERN.exec(text);
			while (match) {
				fileMatches.push({ full: match[0], path: match[1].trim() });
				match = FILE_PATTERN.exec(text);
			}

			for (const { full, path: filePath } of fileMatches) {
				const absolutePath = resolve(ctx.cwd, filePath);
				if (!existsSync(absolutePath)) {
					text = text.replace(full, `[file not found: ${filePath}]`);
					expansions.push(`@{${filePath}} (not found)`);
					continue;
				}

				const stats = statSync(absolutePath);
				if (stats.size > MAX_FILE_SIZE_BYTES) {
					text = text.replace(
						full,
						`[file too large to inline: ${filePath} (${(stats.size / 1024).toFixed(1)} KB > 30 KB limit). Use read tool instead]`,
					);
					expansions.push(`@{${filePath}} (exceeded size limit)`);
					continue;
				}

				try {
					const content = readFileSync(absolutePath, "utf-8");
					text = text.replace(full, `\n\`\`\`${filePath}\n${content}\n\`\`\`\n`);
					expansions.push(`@{${filePath}} (${stats.size} bytes)`);
				} catch (err: any) {
					text = text.replace(full, `[error reading file: ${err.message}]`);
				}
			}
		}

		if (ctx.hasUI && expansions.length > 0) {
			ctx.ui.notify(`Expanded ${expansions.length} inline item(s):\n${expansions.join("\n")}`, "info");
		}

		return { action: "transform", text, images: event.images };
	});
}
