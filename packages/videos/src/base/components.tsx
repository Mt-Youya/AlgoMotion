/**
 * Shared Remotion components for AlgoMotion 15-minute algorithm videos.
 */
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import type { CSSProperties } from "react"
import { P } from "./palette"

// ── Animation helpers ─────────────────────────────────────────────────────────

export function fadeIn(frame: number, start: number, duration: number = 18): number {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  })
}

export function slideUp(frame: number, start: number, duration: number = 22): number {
  return interpolate(frame, [start, start + duration], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  })
}

export function scaleIn(frame: number, start: number, duration: number = 18): number {
  return interpolate(frame, [start, start + duration], [0.88, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  })
}

// ── Brand components ──────────────────────────────────────────────────────────

interface BrandBadgeProps {
  frame: number
  startFrame?: number
}

export function BrandBadge({ frame, startFrame = 0 }: BrandBadgeProps) {
  const opacity = fadeIn(frame, startFrame)
  return (
    <div style={{
      position: "absolute",
      top: 48,
      left: 72,
      opacity,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <div style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: P.signal,
        border: `2px solid ${P.ink}`,
      }} />
      <span style={{
        fontSize: 15,
        fontWeight: 750,
        letterSpacing: "0.14em",
        color: P.ink,
        opacity: 0.5,
      }}>
        ALGOMOTION
      </span>
    </div>
  )
}

// ── Title card ────────────────────────────────────────────────────────────────

interface TitleCardProps {
  frame: number
  title: string
  subtitle?: string
  category?: string
  difficulty?: string
}

export function TitleCard({ frame, title, subtitle, category, difficulty }: TitleCardProps) {
  const opacity = fadeIn(frame, 0, 24)
  const y = slideUp(frame, 0, 28)

  const diffColor: Record<string, string> = {
    beginner:     P.signal,
    intermediate: P.cobalt,
    advanced:     P.coral,
    expert:       "#AA33AA",
  }

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "0 120px",
      background: P.paper,
    }}>
      <div style={{ opacity, transform: `translateY(${y}px)` }}>
        {category && (
          <p style={{
            margin: "0 0 18px",
            fontSize: 18,
            fontWeight: 750,
            letterSpacing: "0.18em",
            color: P.cobalt,
            opacity: 0.7,
          }}>
            {category.toUpperCase()}
          </p>
        )}

        {/* Accent bar + title */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{
            width: 10,
            height: 90,
            background: P.signal,
            borderRadius: 3,
            flexShrink: 0,
          }} />
          <h1 style={{
            margin: 0,
            fontSize: 96,
            fontWeight: 850,
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: P.ink,
          }}>
            {title}
          </h1>
        </div>

        {subtitle && (
          <p style={{
            margin: "28px 0 0 32px",
            fontSize: 28,
            color: P.gray,
            lineHeight: 1.4,
            maxWidth: 700,
          }}>
            {subtitle}
          </p>
        )}

        {difficulty && (
          <div style={{
            margin: "24px 0 0 32px",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 18px",
            border: `2px solid ${P.ink}`,
            borderRadius: 8,
            background: diffColor[difficulty] ?? P.mist,
          }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: P.ink }}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Chapter title overlay ─────────────────────────────────────────────────────

interface ChapterTitleProps {
  frame: number
  startFrame: number
  title: string
  chapterNumber: number
}

export function ChapterTitle({ frame, startFrame, title, chapterNumber }: ChapterTitleProps) {
  const opacity = fadeIn(frame, startFrame, 20)
  const y = slideUp(frame, startFrame, 20)

  return (
    <div style={{
      position: "absolute",
      top: 60,
      left: 72,
      opacity,
      transform: `translateY(${y}px)`,
      display: "flex",
      flexDirection: "column",
      gap: 6,
    }}>
      <span style={{
        fontSize: 13,
        fontWeight: 750,
        letterSpacing: "0.14em",
        color: P.cobalt,
        opacity: 0.6,
      }}>
        {String(chapterNumber).padStart(2, "0")} /
      </span>
      <span style={{
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "-0.02em",
        color: P.ink,
      }}>
        {title}
      </span>
      <div style={{
        width: 40,
        height: 3,
        background: P.signal,
        borderRadius: 2,
      }} />
    </div>
  )
}

// ── Progress bar ──────────────────────────────────────────────────────────────

interface ProgressBarProps {
  progress: number   // 0-1
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 4,
      background: P.mist,
    }}>
      <div style={{
        height: "100%",
        width: `${progress * 100}%`,
        background: P.signal,
        borderRadius: "0 2px 2px 0",
        transition: "width 0.1s linear",
      }} />
    </div>
  )
}

// ── Text content blocks ───────────────────────────────────────────────────────

interface ContentBlockProps {
  frame: number
  startFrame: number
  children: React.ReactNode
  style?: CSSProperties
}

export function ContentBlock({ frame, startFrame, children, style }: ContentBlockProps) {
  const opacity = fadeIn(frame, startFrame, 20)
  const y = slideUp(frame, startFrame, 22)
  return (
    <div style={{
      opacity,
      transform: `translateY(${y}px)`,
      ...style,
    }}>
      {children}
    </div>
  )
}

interface BulletListProps {
  frame: number
  startFrame: number
  items: string[]
  staggerFrames?: number
}

export function BulletList({ frame, startFrame, items, staggerFrames = 15 }: BulletListProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {items.map((item, i) => {
        const opacity = fadeIn(frame, startFrame + i * staggerFrames, 18)
        const y = slideUp(frame, startFrame + i * staggerFrames, 18)
        return (
          <div key={i} style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            opacity,
            transform: `translateY(${y}px)`,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: P.signal,
              border: `2px solid ${P.ink}`,
              marginTop: 7,
              flexShrink: 0,
            }} />
            <span style={{
              fontSize: 28,
              color: P.ink,
              lineHeight: 1.45,
            }}>
              {item}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Code block ────────────────────────────────────────────────────────────────

interface CodeBlockProps {
  frame: number
  startFrame: number
  code: string
  highlightLines?: number[]
  language?: string
}

export function CodeBlock({ frame, startFrame, code, highlightLines = [] }: CodeBlockProps) {
  const opacity = fadeIn(frame, startFrame, 22)
  const lines = code.split("\n")

  return (
    <div style={{
      opacity,
      fontFamily: "'Courier New', monospace",
      fontSize: 22,
      lineHeight: 1.7,
      background: P.ink,
      color: P.paper,
      padding: "32px 40px",
      borderRadius: 16,
      border: `2px solid ${P.cobalt}`,
      overflowX: "hidden",
    }}>
      {lines.map((line, i) => {
        const lineNum = i + 1
        const isHighlighted = highlightLines.includes(lineNum)
        return (
          <div key={i} style={{
            display: "flex",
            gap: 20,
            padding: "1px 8px",
            borderRadius: 4,
            background: isHighlighted ? `${P.coral}33` : "transparent",
            borderLeft: isHighlighted ? `3px solid ${P.coral}` : "3px solid transparent",
          }}>
            <span style={{ color: P.gray, userSelect: "none", minWidth: 28, textAlign: "right" }}>
              {lineNum}
            </span>
            <span>{line}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Complexity table ──────────────────────────────────────────────────────────

interface ComplexityRow {
  label: string
  value: string
  color?: string
}

interface ComplexityTableProps {
  frame: number
  startFrame: number
  rows: ComplexityRow[]
}

export function ComplexityTable({ frame, startFrame, rows }: ComplexityTableProps) {
  const opacity = fadeIn(frame, startFrame, 22)
  return (
    <div style={{
      opacity,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      background: P.mist,
      border: `2px solid ${P.ink}`,
      borderRadius: 14,
      padding: "24px 32px",
      minWidth: 360,
    }}>
      {rows.map((row, i) => (
        <div key={i} style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 0",
          borderBottom: i < rows.length - 1 ? `1px solid ${P.ink}22` : "none",
        }}>
          <span style={{ fontSize: 20, color: P.gray }}>{row.label}</span>
          <code style={{
            fontSize: 24,
            fontWeight: 700,
            color: row.color ?? P.cobalt,
            fontFamily: "'Courier New', monospace",
          }}>
            {row.value}
          </code>
        </div>
      ))}
    </div>
  )
}

// ── Call-out box ──────────────────────────────────────────────────────────────

interface CalloutProps {
  frame: number
  startFrame: number
  type?: "info" | "warning" | "success" | "tip"
  children: React.ReactNode
}

export function Callout({ frame, startFrame, type = "info", children }: CalloutProps) {
  const opacity = fadeIn(frame, startFrame, 18)
  const y = slideUp(frame, startFrame, 18)
  const colors = {
    info:    { bg: `${P.cobalt}18`, border: P.cobalt, dot: P.cobalt },
    warning: { bg: `${P.coral}18`,  border: P.coral,  dot: P.coral  },
    success: { bg: `${P.signal}28`, border: P.signal, dot: P.signal },
    tip:     { bg: `${P.mist}`,     border: P.gray,   dot: P.gray   },
  }[type]

  return (
    <div style={{
      opacity,
      transform: `translateY(${y}px)`,
      display: "flex",
      alignItems: "flex-start",
      gap: 16,
      padding: "20px 24px",
      background: colors.bg,
      border: `2px solid ${colors.border}`,
      borderRadius: 12,
    }}>
      <div style={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: colors.dot,
        marginTop: 6,
        flexShrink: 0,
      }} />
      <div style={{ fontSize: 24, color: P.ink, lineHeight: 1.5 }}>{children}</div>
    </div>
  )
}

// ── Step counter ──────────────────────────────────────────────────────────────

interface StepCounterProps {
  current: number
  total: number
}

export function StepCounter({ current, total }: StepCounterProps) {
  return (
    <div style={{
      position: "absolute",
      top: 60,
      right: 72,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 4,
    }}>
      <span style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.1em",
        color: P.gray,
      }}>
        STEP
      </span>
      <span style={{
        fontSize: 42,
        fontWeight: 850,
        letterSpacing: "-0.04em",
        color: P.ink,
        lineHeight: 1,
      }}>
        {String(current).padStart(2, "0")}
        <span style={{ fontSize: 22, color: P.gray, fontWeight: 500 }}>
          /{String(total).padStart(2, "0")}
        </span>
      </span>
    </div>
  )
}

// ── Array bar visualizer (for sorting) ───────────────────────────────────────

interface ArrayBar {
  value: number
  color?: string
  label?: string
}

interface ArrayBarsProps {
  bars: ArrayBar[]
  maxValue?: number
  height?: number
}

export function ArrayBars({ bars, maxValue, height = 520 }: ArrayBarsProps) {
  const max = maxValue ?? Math.max(...bars.map((b) => Math.abs(b.value)), 1)
  return (
    <div style={{
      display: "flex",
      gap: 6,
      alignItems: "flex-end",
      height,
      padding: "24px 32px",
      border: `3px solid ${P.ink}`,
      borderRadius: 16,
      background: P.mist,
    }}>
      {bars.map((bar, i) => (
        <div key={i} style={{
          position: "relative",
          flex: 1,
          height: `${Math.max(4, (Math.abs(bar.value) / max) * 100)}%`,
          background: bar.color ?? P.cobalt,
          border: `2px solid ${P.ink}`,
          borderRadius: "4px 4px 0 0",
          transition: "height 0.12s ease, background 0.12s ease",
        }}>
          <span style={{
            position: "absolute",
            top: -30,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 18,
            fontWeight: 750,
            color: P.ink,
            whiteSpace: "nowrap",
          }}>
            {bar.label ?? bar.value}
          </span>
        </div>
      ))}
    </div>
  )
}
