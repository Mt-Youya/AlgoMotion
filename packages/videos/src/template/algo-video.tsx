/**
 * AlgoVideo — 15-minute template for all AlgoMotion algorithm videos.
 *
 * Usage:
 *   <AlgoVideo config={myConfig} />
 *
 * All timing is driven by useChapter(). Each chapter renders its own
 * section component, which fades in/out based on local chapter progress.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion"
import { P } from "../base/palette"
import {
  BrandBadge,
  BulletList,
  CalloutProps,
  ChapterTitle,
  CodeBlock,
  ComplexityTable,
  ContentBlock,
  ProgressBar,
  TitleCard,
  ArrayBars,
  Callout,
} from "../base/components"
import { DEFAULT_CHAPTERS, useChapter } from "../base/use-chapter"

// ── Video config type ─────────────────────────────────────────────────────────

export interface AlgoVideoConfig {
  /** Algorithm display name */
  title: string
  /** Short subtitle or tagline */
  subtitle: string
  /** Category label (e.g. "Sorting", "Graph") */
  category: string
  /** Difficulty level */
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  /**
   * Content for each chapter.
   * Any chapter not provided will show a placeholder.
   */
  chapters: {
    problem?: {
      heading: string
      body: string[]
      callout?: string
    }
    intuition?: {
      heading: string
      body: string[]
      analogy?: string
    }
    walkthrough?: {
      steps: Array<{
        label: string
        description: string
        /** Optional array state for bar visualizer */
        array?: Array<{ value: number; color?: string }>
      }>
    }
    code?: {
      snippet: string
      language?: string
      annotations: Array<{ lines: number[]; note: string }>
    }
    complexity?: {
      timeRows: Array<{ label: string; value: string; color?: string }>
      spaceRows: Array<{ label: string; value: string; color?: string }>
      notes?: string[]
    }
    variations?: {
      items: string[]
      tips?: string[]
    }
    summary?: {
      keyPoints: string[]
      nextSteps?: string[]
    }
  }
}

// ── Main component ────────────────────────────────────────────────────────────

interface AlgoVideoProps {
  config: AlgoVideoConfig
}

export function AlgoVideo({ config }: AlgoVideoProps) {
  const frame = useCurrentFrame()
  const { current, videoProgress, chapterProgress, inChapter } = useChapter(DEFAULT_CHAPTERS)

  const ch = config.chapters

  return (
    <AbsoluteFill style={{ background: P.paper, fontFamily: "'Arial', sans-serif" }}>
      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      {inChapter("intro") && (
        <TitleCard
          frame={current.localFrame}
          title={config.title}
          subtitle={config.subtitle}
          category={config.category}
          difficulty={config.difficulty}
        />
      )}

      {/* ── Problem statement ─────────────────────────────────────────────── */}
      {inChapter("problem") && ch.problem && (
        <AbsoluteFill style={{ padding: "120px 100px 80px" }}>
          <ChapterTitle frame={frame} startFrame={1_800} title="The Problem" chapterNumber={2} />
          <div style={{ marginTop: 100 }}>
            <ContentBlock frame={frame} startFrame={1_840}>
              <h2 style={{ fontSize: 52, fontWeight: 800, margin: "0 0 32px", color: P.ink }}>{ch.problem.heading}</h2>
            </ContentBlock>
            <BulletList frame={frame} startFrame={1_870} items={ch.problem.body} staggerFrames={20} />
            {ch.problem.callout && (
              <div style={{ marginTop: 40 }}>
                <Callout frame={frame} startFrame={1_870 + ch.problem.body.length * 20 + 30} type="info">
                  {ch.problem.callout}
                </Callout>
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}

      {/* ── Intuition ─────────────────────────────────────────────────────── */}
      {inChapter("intuition") && ch.intuition && (
        <AbsoluteFill style={{ padding: "120px 100px 80px" }}>
          <ChapterTitle frame={frame} startFrame={5_400} title="Intuition" chapterNumber={3} />
          <div style={{ marginTop: 100 }}>
            <ContentBlock frame={frame} startFrame={5_440}>
              <h2 style={{ fontSize: 52, fontWeight: 800, margin: "0 0 32px", color: P.ink }}>
                {ch.intuition.heading}
              </h2>
            </ContentBlock>
            <BulletList frame={frame} startFrame={5_470} items={ch.intuition.body} staggerFrames={22} />
            {ch.intuition.analogy && (
              <div style={{ marginTop: 40 }}>
                <Callout frame={frame} startFrame={5_470 + ch.intuition.body.length * 22 + 40} type="tip">
                  💡 {ch.intuition.analogy}
                </Callout>
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}

      {/* ── Walkthrough ───────────────────────────────────────────────────── */}
      {inChapter("walkthrough") && ch.walkthrough && (
        <WalkthroughSection frame={frame} startFrame={9_000} steps={ch.walkthrough.steps} />
      )}

      {/* ── Code ──────────────────────────────────────────────────────────── */}
      {inChapter("code") && ch.code && (
        <AbsoluteFill style={{ padding: "120px 80px 80px" }}>
          <ChapterTitle frame={frame} startFrame={16_200} title="Code Walkthrough" chapterNumber={5} />
          <div style={{ marginTop: 90, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <CodeSection
              frame={frame}
              startFrame={16_240}
              snippet={ch.code.snippet}
              annotations={ch.code.annotations}
            />
          </div>
        </AbsoluteFill>
      )}

      {/* ── Complexity ────────────────────────────────────────────────────── */}
      {inChapter("complexity") && ch.complexity && (
        <AbsoluteFill style={{ padding: "120px 100px 80px" }}>
          <ChapterTitle frame={frame} startFrame={21_600} title="Complexity Analysis" chapterNumber={6} />
          <div style={{ marginTop: 100, display: "flex", gap: 60 }}>
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 750, margin: "0 0 18px", color: P.gray }}>TIME COMPLEXITY</h3>
              <ComplexityTable frame={frame} startFrame={21_640} rows={ch.complexity.timeRows} />
            </div>
            <div>
              <h3 style={{ fontSize: 28, fontWeight: 750, margin: "0 0 18px", color: P.gray }}>SPACE COMPLEXITY</h3>
              <ComplexityTable frame={frame} startFrame={21_670} rows={ch.complexity.spaceRows} />
            </div>
          </div>
          {ch.complexity.notes && (
            <div style={{ marginTop: 48 }}>
              <BulletList frame={frame} startFrame={21_700} items={ch.complexity.notes} staggerFrames={18} />
            </div>
          )}
        </AbsoluteFill>
      )}

      {/* ── Variations ────────────────────────────────────────────────────── */}
      {inChapter("variations") && ch.variations && (
        <AbsoluteFill style={{ padding: "120px 100px 80px" }}>
          <ChapterTitle frame={frame} startFrame={24_300} title="Variations & Tips" chapterNumber={7} />
          <div style={{ marginTop: 100 }}>
            <BulletList frame={frame} startFrame={24_340} items={ch.variations.items} staggerFrames={20} />
            {ch.variations.tips && (
              <div style={{ marginTop: 40 }}>
                {ch.variations.tips.map((tip, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <Callout frame={frame} startFrame={24_340 + ch.variations!.items.length * 20 + i * 22} type="tip">
                      {tip}
                    </Callout>
                  </div>
                ))}
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}

      {/* ── Summary ───────────────────────────────────────────────────────── */}
      {inChapter("summary") && ch.summary && (
        <AbsoluteFill style={{ padding: "120px 100px 80px" }}>
          <ChapterTitle frame={frame} startFrame={26_100} title="Summary" chapterNumber={8} />
          <div style={{ marginTop: 100 }}>
            <BulletList frame={frame} startFrame={26_140} items={ch.summary.keyPoints} staggerFrames={20} />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 100,
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: frame > 26_600 ? 1 : 0,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: P.signal,
                border: `2px solid ${P.ink}`,
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 750,
                letterSpacing: "0.12em",
                color: P.ink,
                opacity: 0.45,
              }}
            >
              ALGOMOTION · {config.title.toUpperCase()}
            </span>
          </div>
        </AbsoluteFill>
      )}

      {/* ── Always-visible chrome ──────────────────────────────────────────── */}
      {!inChapter("intro") && <BrandBadge frame={frame} startFrame={1_800} />}
      <ProgressBar progress={videoProgress} />
    </AbsoluteFill>
  )
}

// ── Sub-section components ────────────────────────────────────────────────────

interface Step {
  label: string
  description: string
  array?: Array<{ value: number; color?: string }>
}

interface WalkthroughSectionProps {
  frame: number
  startFrame: number
  steps: Step[]
}

function WalkthroughSection({ frame, startFrame, steps }: WalkthroughSectionProps) {
  const framesPerStep = Math.floor(7_200 / Math.max(steps.length, 1))
  const elapsed = frame - startFrame
  const currentStep = Math.min(Math.floor(elapsed / framesPerStep), steps.length - 1)
  const localProgress = (elapsed - currentStep * framesPerStep) / framesPerStep

  const step = steps[Math.max(0, currentStep)]
  if (!step) return null

  return (
    <AbsoluteFill style={{ padding: "120px 80px 80px" }}>
      <ChapterTitle frame={frame} startFrame={startFrame} title="Step-by-Step" chapterNumber={4} />

      <div style={{ position: "absolute", top: 60, right: 72 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: P.gray,
            textAlign: "right",
            marginBottom: 4,
          }}
        >
          STEP
        </div>
        <div
          style={{
            fontSize: 42,
            fontWeight: 850,
            color: P.ink,
            lineHeight: 1,
          }}
        >
          {String(currentStep + 1).padStart(2, "0")}
          <span style={{ fontSize: 22, color: P.gray }}>/{String(steps.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div style={{ marginTop: 90 }}>
        <ContentBlock frame={frame} startFrame={startFrame + currentStep * framesPerStep}>
          <h2 style={{ fontSize: 48, fontWeight: 800, margin: "0 0 20px", color: P.ink }}>{step.label}</h2>
          <p style={{ fontSize: 28, color: P.gray, lineHeight: 1.5, maxWidth: 900 }}>{step.description}</p>
        </ContentBlock>

        {step.array && (
          <div style={{ marginTop: 48 }}>
            <ArrayBars bars={step.array} height={380} />
          </div>
        )}
      </div>
    </AbsoluteFill>
  )
}

interface CodeSectionProps {
  frame: number
  startFrame: number
  snippet: string
  annotations: Array<{ lines: number[]; note: string }>
}

function CodeSection({ frame, startFrame, snippet, annotations }: CodeSectionProps) {
  const elapsed = frame - startFrame
  const framesPerAnnotation = annotations.length > 0 ? Math.floor(5_360 / annotations.length) : 5_360
  const activeAnnotation = Math.min(Math.floor(elapsed / framesPerAnnotation), annotations.length - 1)
  const highlightLines = annotations[activeAnnotation]?.lines ?? []
  const note = annotations[activeAnnotation]?.note ?? ""

  return (
    <>
      <div style={{ gridColumn: "1 / 2" }}>
        <CodeBlock frame={frame} startFrame={startFrame} code={snippet} highlightLines={highlightLines} />
      </div>
      <div style={{ gridColumn: "2 / 3", display: "flex", flexDirection: "column", gap: 20 }}>
        {note && (
          <Callout frame={frame} startFrame={startFrame + activeAnnotation * framesPerAnnotation} type="info">
            {note}
          </Callout>
        )}
      </div>
    </>
  )
}
