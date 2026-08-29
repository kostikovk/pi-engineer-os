import type { ExtensionContext } from "@earendil-works/pi-coding-agent";

type ThinkingLevel = "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";

const LEVELS: { id: ThinkingLevel; label: string; desc: string }[] = [
  { id: "off", label: "off", desc: "No reasoning tokens (fastest, lowest cost)" },
  { id: "minimal", label: "minimal", desc: "Minimal reasoning tokens" },
  { id: "low", label: "low", desc: "Low reasoning budget for quick validation" },
  { id: "medium", label: "medium", desc: "Balanced reasoning effort" },
  { id: "high", label: "high", desc: "High reasoning budget for complex architectural & coding tasks" },
  { id: "max", label: "max", desc: "Maximum reasoning budget for exhaustive verification" },
];

export default function effortExtension(pi: ExtensionContext) {
  const handleEffortChange = async (targetLevel?: string, ctx?: any) => {
    const current = pi.getThinkingLevel() || "off";

    if (!targetLevel || targetLevel.trim() === "") {
      // Interactive picker
      const options = LEVELS.map((l) => {
        const marker = l.id === current ? "● (current)" : "○";
        return `${marker} ${l.id.toUpperCase().padEnd(8)} - ${l.desc}`;
      });

      if (ctx?.ui?.select) {
        const selected = await ctx.ui.select(
          `Select reasoning effort / thinking level (Current: ${current.toUpperCase()}):`,
          options
        );

        if (selected) {
          const index = options.indexOf(selected);
          if (index >= 0) {
            const chosen = LEVELS[index].id;
            pi.setThinkingLevel(chosen);
            ctx.ui.notify?.(`🧠 Reasoning effort set to: ${chosen.toUpperCase()}`, "info");
          }
        }
      }
      return;
    }

    const arg = targetLevel.trim().toLowerCase();

    if (arg === "cycle") {
      const currentIndex = LEVELS.findIndex((l) => l.id === current);
      const nextIndex = (currentIndex + 1) % LEVELS.length;
      const nextLevel = LEVELS[nextIndex].id;
      pi.setThinkingLevel(nextLevel);
      ctx?.ui?.notify?.(`🧠 Reasoning effort cycled to: ${nextLevel.toUpperCase()}`, "info");
      return;
    }

    const matched = LEVELS.find((l) => l.id === arg);
    if (!matched) {
      const validList = LEVELS.map((l) => l.id).join(", ");
      ctx?.ui?.notify?.(`❌ Invalid effort '${arg}'. Valid levels: ${validList}, or 'cycle'`, "error");
      return;
    }

    pi.setThinkingLevel(matched.id);
    ctx?.ui?.notify?.(`🧠 Reasoning effort set to: ${matched.id.toUpperCase()} (${matched.desc})`, "info");
  };

  // Register /effort command
  pi.registerCommand("effort", {
    description: "Set or inspect model reasoning effort / thinking level (/effort [off|low|medium|high|max|cycle])",
    handler: async (args, ctx) => {
      await handleEffortChange(args, ctx);
    },
  });

  // Register /reasoning alias
  pi.registerCommand("reasoning", {
    description: "Alias for /effort",
    handler: async (args, ctx) => {
      await handleEffortChange(args, ctx);
    },
  });

  // Listen to thinking level select events
  pi.on("thinking_level_select", async (event, ctx) => {
    ctx.ui?.setStatus?.("thinking", `🧠 effort: ${event.level}`);
  });
}
