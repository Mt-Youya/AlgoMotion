import type { SVGProps } from "react"

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M4 25 10 9l6 12 5-16 7 20" />
      <circle cx="10" cy="9" r="2" />
      <circle cx="16" cy="21" r="2" />
      <circle cx="21" cy="5" r="2" />
    </svg>
  )
}
