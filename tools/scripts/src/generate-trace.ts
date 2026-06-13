import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"
import { quickSort } from "@algomotion/algorithms"

const outputDirectory = resolve(process.cwd(), "media")
const outputPath = resolve(outputDirectory, "quick-sort-trace.json")
const run = quickSort([31, 54, 22, 76, 42, 91, 63, 35])

await mkdir(outputDirectory, { recursive: true })
await writeFile(outputPath, `${JSON.stringify(run, null, 2)}\n`, "utf8")
console.log(`Wrote ${run.trace.length} trace events to ${outputPath}`)
