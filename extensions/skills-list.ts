/**
 * Skills Viewer Extension
 * Adds the /skills command to interactively list and inspect installed skills.
 */

import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import type { ExtensionAPI, ExtensionCommandContext } from "@earendil-works/pi-coding-agent";

interface SkillItem {
	name: string;
	description: string;
	location: string;
	scope: "project" | "global";
}

function parseSkillFile(filePath: string, scope: "project" | "global"): SkillItem | null {
	try {
		if (!fs.existsSync(filePath)) return null;
		const content = fs.readFileSync(filePath, "utf-8");
		const match = content.match(/^---\n([\s\S]*?)\n---/);
		let name = path.basename(path.dirname(filePath));
		let description = "";

		if (match) {
			const yaml = match[1];
			const nameMatch = yaml.match(/^name:\s*(.+)$/m);
			const descMatch = yaml.match(/^description:\s*(.+)$/m);
			if (nameMatch) name = nameMatch[1].trim().replace(/^["']|["']$/g, "");
			if (descMatch) description = descMatch[1].trim().replace(/^["']|["']$/g, "");
		}

		return {
			name,
			description: description || "No description provided",
			location: filePath,
			scope,
		};
	} catch {
		return null;
	}
}

function scanDirForSkills(dir: string, scope: "project" | "global"): SkillItem[] {
	const skills: SkillItem[] = [];
	if (!fs.existsSync(dir)) return skills;

	try {
		const entries = fs.readdirSync(dir, { withFileTypes: true });
		for (const entry of entries) {
			if (entry.isDirectory()) {
				const skillMd = path.join(dir, entry.name, "SKILL.md");
				const skill = parseSkillFile(skillMd, scope);
				if (skill) skills.push(skill);
			}
		}
	} catch {}

	return skills;
}

export default function (pi: ExtensionAPI) {
	const handler = async (_args: string, ctx: ExtensionCommandContext) => {
		const projectDir = ctx.cwd || process.cwd();
		const projectSkillsDir = path.join(projectDir, ".agents", "skills");
		const globalSkillsDir = path.join(os.homedir(), ".agents", "skills");

		const projectSkills = scanDirForSkills(projectSkillsDir, "project");
		const globalSkills = scanDirForSkills(globalSkillsDir, "global");

		// Deduplicate: project skills override global skills with same name
		const skillMap = new Map<string, SkillItem>();
		for (const skill of globalSkills) {
			skillMap.set(skill.name, skill);
		}
		for (const skill of projectSkills) {
			skillMap.set(skill.name, skill);
		}

		const allSkills = Array.from(skillMap.values()).sort((a, b) => a.name.localeCompare(b.name));

		if (allSkills.length === 0) {
			if (ctx.hasUI) {
				ctx.ui.notify("No skills installed in project or global store.", "warning");
			}
			return;
		}

		if (!ctx.hasUI) {
			const text = allSkills.map((s) => `• [${s.scope}] ${s.name}: ${s.description}`).join("\n");
			console.log(text);
			return;
		}

		const choices = allSkills.map((s) => {
			const tag = s.scope === "project" ? "📦 [project]" : "🌐 [global]";
			const shortDesc = s.description.length > 70 ? s.description.slice(0, 67) + "..." : s.description;
			return `${tag} ${s.name} — ${shortDesc}`;
		});

		const selectedIndex = await ctx.ui.select("Select a skill to inspect:", choices);
		if (selectedIndex === undefined || selectedIndex === null) {
			return;
		}

		// In pi ctx.ui.select may return the string choice or index
		let chosenSkill: SkillItem | undefined;
		if (typeof selectedIndex === "number") {
			chosenSkill = allSkills[selectedIndex];
		} else {
			chosenSkill = allSkills.find((s) => (selectedIndex as unknown as string).includes(s.name));
		}

		if (!chosenSkill) return;

		try {
			const fullContent = fs.readFileSync(chosenSkill.location, "utf-8");
			ctx.ui.notify(
				`📄 Skill: ${chosenSkill.name} (${chosenSkill.scope})\n📍 ${chosenSkill.location}\n\n${fullContent.slice(0, 800)}...`,
				"info",
			);
		} catch (err: any) {
			ctx.ui.notify(`Failed to read skill: ${err.message}`, "error");
		}
	};

	pi.registerCommand("skills", {
		description: "Browse and inspect all installed skills",
		handler,
	});

	pi.registerCommand("skill-list", {
		description: "Browse and inspect all installed skills",
		handler,
	});
}
