import fs from "node:fs";

const [baselinePath, currentPath] = process.argv.slice(2);

if (!baselinePath || !currentPath) {
  throw new Error("Usage: node perf/compare-metrics.mjs <baseline.json> <current.json>");
}

const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const current = JSON.parse(fs.readFileSync(currentPath, "utf8"));
const fields = [
  ["loadEventMs", baseline.navigation.loadEventMs, current.navigation.loadEventMs],
  ["firstContentfulPaintMs", baseline.navigation.firstContentfulPaintMs, current.navigation.firstContentfulPaintMs],
  ["scriptDurationMs", baseline.scrollSample.threeScrollBurst.scriptDurationMs, current.scrollSample.threeScrollBurst.scriptDurationMs],
  ["taskDurationMs", baseline.scrollSample.threeScrollBurst.taskDurationMs, current.scrollSample.threeScrollBurst.taskDurationMs],
];

for (const [name, before, after] of fields) {
  const delta = after - before;
  const percent = before === 0 ? 0 : (delta / before) * 100;
  console.log(`${name}: ${before} -> ${after} (${delta >= 0 ? "+" : ""}${delta.toFixed(3)}, ${percent.toFixed(1)}%)`);
}

if (current.navigation.loadEventMs >= baseline.navigation.loadEventMs) {
  throw new Error("Expected the post-fix load event to finish before the baseline.");
}
