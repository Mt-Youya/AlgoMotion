import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import "@algomotion/visualizer/styles.css"
import "./styles/index.css"

export const metadata: Metadata = {
  title: "AlgoMotion | 看得见的算法",
  description: "Run algorithms, inspect every step, and understand how they move across web, desktop, and mobile.",
  applicationName: "AlgoMotion",
  keywords: ["algorithm", "visualization", "sorting", "learning", "Tauri", "Remotion"],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
