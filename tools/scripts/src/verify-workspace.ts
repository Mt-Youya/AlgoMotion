import { access } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..")

const requiredPaths = [
  "apps/web/app/page.tsx",
  "apps/web/app/lab/page.tsx",
  "apps/desktop/src-tauri/tauri.conf.json",
  "apps/mobile/src-tauri/tauri.conf.json",
  "packages/shared/src/trace.ts",
  "packages/algorithms/src/sorting.ts",
  "packages/algo-wasm/src/lib.rs",
  "packages/visualizer/src/player.ts",
  "packages/ui/src/index.ts",
  "packages/videos/src/root.tsx",
  "tools/manim/scenes/master_theorem.py",
]

const missing: string[] = []
for (const path of requiredPaths) {
  try {
    await access(resolve(workspaceRoot, path))
  } catch {
    missing.push(path)
  }
}

if (missing.length > 0) {
  console.error(`Missing workspace files:\n${missing.map((path) => `- ${path}`).join("\n")}`)
  process.exitCode = 1
} else {
  console.log(`AlgoMotion workspace verified: ${requiredPaths.length} required paths found.`)
}
