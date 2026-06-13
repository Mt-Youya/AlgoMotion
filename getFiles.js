import fs from "node:fs/promises"

fs.readdir("/Users/yonjay/codes/Codex/AlgoMotion/packages/ui/src/components").then((res) => {
  console.log(res.map((f) => f.replace(".tsx", "")).join(" "))
})
