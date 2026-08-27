/**
 * Dirty Repo Guard Extension for SDLC Safety
 *
 * Prevents accidental session switches or forks when there are uncommitted git changes,
 * ensuring uncommitted work is not lost or fragmented across session branches.
 */

import type { ExtensionAPI, ExtensionContext } from "@earendil-works/pi-coding-agent";

async function checkDirtyRepo(
	pi: ExtensionAPI,
	ctx: ExtensionContext,
	action: string,
): Promise<{ cancel: boolean } | undefined> {
	const { stdout, code } = await pi.exec("git", ["status", "--porcelain"]);

	if (code !== 0) {
		// Not a git repository
		return;
	}

	const hasChanges = stdout.trim().length > 0;
	if (!hasChanges) {
		return;
	}

	if (!ctx.hasUI) {
		// In non-interactive/headless mode, block by default
		return { cancel: true };
	}

	const changedFiles = stdout.trim().split("\n").filter(Boolean).length;

	const choice = await ctx.ui.select(
		`⚠️ You have ${changedFiles} uncommitted file(s). ${action} anyway?`,
		["Yes, proceed anyway", "No, let me commit first (/commit)"],
	);

	if (choice !== "Yes, proceed anyway") {
		ctx.ui.notify("Switch cancelled. Commit your changes first with /commit", "warning");
		return { cancel: true };
	}
}

export default function dirtyRepoGuardExtension(pi: ExtensionAPI) {
	pi.on("session_before_switch", async (event, ctx) => {
		const action = event.reason === "new" ? "start a new session" : "switch sessions";
		return checkDirtyRepo(pi, ctx, action);
	});

	pi.on("session_before_fork", async (_event, ctx) => {
		return checkDirtyRepo(pi, ctx, "fork session");
	});
}
