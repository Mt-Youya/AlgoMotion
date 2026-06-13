import Link from "next/link"

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 / TRACE LOST</p>
      <h1>这一步不在事件流里。</h1>
      <Link href="/">返回 AlgoMotion</Link>
    </main>
  )
}
