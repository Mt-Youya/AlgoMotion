import { NextRequest, NextResponse } from "next/server"

const locales = ["zh", "en"]
const defaultLocale = "zh"

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? ""
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase()
  return locales.includes(preferred ?? "") ? (preferred as string) : defaultLocale
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 已有 locale 前缀则放行
  if (locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)) {
    return NextResponse.next()
  }

  // 静态文件、API 放行
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // 文件（图片、favicon 等）
  ) {
    return NextResponse.next()
  }

  // 重定向到带 locale 的路径
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
}
