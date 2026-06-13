import type { Metadata } from "next"
import { LabClient } from "./lab-client"

export const metadata: Metadata = {
  title: "算法实验室 | AlgoMotion",
  description: "在 Web Worker 中运行排序算法，逐帧查看 trace、代码位置与复杂度统计。",
}

export default function LabPage() {
  return <LabClient />
}
