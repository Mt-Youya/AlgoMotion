import { runSortingAlgorithm } from "@algomotion/algorithms"
import type { AlgorithmId } from "@algomotion/shared"
import { replayArrayTrace } from "@algomotion/visualizer"
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion"

export interface SortingLessonProps {
  algorithmId: AlgorithmId
  input: number[]
  title: string
}

const palette = {
  paper: "oklch(96% 0.012 95)",
  ink: "oklch(19% 0.025 260)",
  cobalt: "oklch(48% 0.22 265)",
  signal: "oklch(87% 0.2 118)",
  coral: "oklch(67% 0.22 30)",
  mist: "oklch(91% 0.025 245)",
}

export function SortingLesson({ algorithmId, input, title }: SortingLessonProps) {
  const frame = useCurrentFrame()
  const { durationInFrames, fps } = useVideoConfig()
  const run = runSortingAlgorithm(algorithmId, input)
  const step = Math.floor(
    interpolate(frame, [fps, durationInFrames - fps], [0, run.trace.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.quad),
    })
  )
  const state = replayArrayTrace(run.input, run.trace, step)
  const maximum = Math.max(1, ...state.values.map((value) => Math.abs(value)))
  const titleProgress = interpolate(frame, [0, fps], [50, 0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.exp),
  })
  const opacity = interpolate(frame, [0, fps * 0.7], [0, 1], {
    extrapolateRight: "clamp",
  })

  return (
    <AbsoluteFill
      style={{
        color: palette.ink,
        backgroundColor: palette.paper,
        fontFamily: "Arial, sans-serif",
        padding: 88,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity,
          transform: `translateY(${titleProgress}px)`,
        }}
      >
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 3 }}>ALGOMOTION TRACE</div>
          <h1 style={{ margin: "18px 0 0", fontSize: 86, letterSpacing: -6, lineHeight: 0.95 }}>{title}</h1>
        </div>
        <div
          style={{
            minWidth: 210,
            padding: "20px 24px",
            border: `3px solid ${palette.ink}`,
            borderRadius: 14,
            background: palette.signal,
            fontSize: 24,
            fontWeight: 750,
          }}
        >
          STEP {Math.min(step, run.trace.length)} / {run.trace.length}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-end",
          height: 650,
          marginTop: 72,
          padding: 48,
          border: `4px solid ${palette.ink}`,
          borderRadius: 22,
          background: palette.mist,
        }}
      >
        {state.values.map((value, index) => {
          const isActive = state.activeIndices.includes(index)
          const isSorted = state.sortedIndices.includes(index)
          const isPivot = state.pivotIndices.includes(index)
          const color = isActive
            ? palette.coral
            : isSorted
              ? palette.signal
              : isPivot
                ? "oklch(76% 0.18 72)"
                : palette.cobalt

          return (
            <div
              key={`${index}-${value}`}
              style={{
                position: "relative",
                flex: 1,
                height: `${Math.max(8, (Math.abs(value) / maximum) * 100)}%`,
                border: `3px solid ${palette.ink}`,
                background: color,
                transform: `translateY(${isActive ? -16 : 0}px)`,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -36,
                  left: "50%",
                  fontSize: 20,
                  fontWeight: 750,
                  transform: "translateX(-50%)",
                }}
              >
                {value}
              </span>
            </div>
          )
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
          marginTop: 24,
        }}
      >
        {[
          ["comparisons", run.stats.comparisons],
          ["swaps", run.stats.swaps],
          ["writes", run.stats.writes],
          ["complexity", run.algorithm.timeComplexity.average],
        ].map(([label, value]) => (
          <div
            key={label}
            style={{
              padding: 20,
              border: `2px solid ${palette.ink}`,
              borderRadius: 12,
              background: palette.paper,
            }}
          >
            <div style={{ fontSize: 16, opacity: 0.6 }}>{label}</div>
            <div style={{ marginTop: 6, fontSize: 26, fontWeight: 750 }}>{value}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  )
}
