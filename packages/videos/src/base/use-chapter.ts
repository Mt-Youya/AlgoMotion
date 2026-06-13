/**
 * useChapter — timing primitive for 15-minute AlgoMotion videos.
 *
 * A 15-min video at 30 fps = 27 000 frames.
 * The standard chapter layout (in frames):
 *
 *  Chapter     |  Start  |   End   | Duration | Description
 *  ------------|---------|---------|----------|--------------------------
 *  intro       |       0 |   1 800 |   60 s   | Title card & hook
 *  problem     |   1 800 |   5 400 |  120 s   | Problem statement
 *  intuition   |   5 400 |   9 000 |  120 s   | Intuition & motivation
 *  walkthrough |   9 000 |  16 200 |  240 s   | Step-by-step animation
 *  code        |  16 200 |  21 600 |  180 s   | Code walkthrough
 *  complexity  |  21 600 |  24 300 |   90 s   | Big-O analysis
 *  variations  |  24 300 |  26 100 |   60 s   | Variants & tips
 *  summary     |  26 100 |  27 000 |   30 s   | Key takeaways
 */

import { useCurrentFrame, useVideoConfig } from "remotion"

export type ChapterName =
  | "intro"
  | "problem"
  | "intuition"
  | "walkthrough"
  | "code"
  | "complexity"
  | "variations"
  | "summary"

export interface ChapterDef {
  name: ChapterName
  title: string
  startFrame: number
  endFrame: number
}

/** Default 27 000-frame (15 min @ 30 fps) chapter layout. */
export const DEFAULT_CHAPTERS: ChapterDef[] = [
  { name: "intro",       title: "Introduction",      startFrame:     0, endFrame:  1_800 },
  { name: "problem",     title: "The Problem",        startFrame: 1_800, endFrame:  5_400 },
  { name: "intuition",   title: "Intuition",          startFrame: 5_400, endFrame:  9_000 },
  { name: "walkthrough", title: "Step-by-Step",       startFrame: 9_000, endFrame: 16_200 },
  { name: "code",        title: "Code Walkthrough",   startFrame: 16_200, endFrame: 21_600 },
  { name: "complexity",  title: "Complexity Analysis",startFrame: 21_600, endFrame: 24_300 },
  { name: "variations",  title: "Variations & Tips",  startFrame: 24_300, endFrame: 26_100 },
  { name: "summary",     title: "Summary",            startFrame: 26_100, endFrame: 27_000 },
]

export interface ChapterInfo extends ChapterDef {
  /** 0-based frame index within this chapter */
  localFrame: number
  /** 0-1 progress within this chapter */
  progress: number
  /** Whether this chapter is currently active */
  isActive: boolean
}

export interface UseChapterReturn {
  /** Currently active chapter */
  current: ChapterInfo
  /** 0-1 overall video progress */
  videoProgress: number
  /** All chapter definitions */
  chapters: ChapterDef[]
  /** Get info for a specific chapter (useful for peek-ahead) */
  getChapter: (name: ChapterName) => ChapterDef
  /** True if global frame is within the given chapter */
  inChapter: (name: ChapterName) => boolean
  /**
   * Local progress within a named chapter (0-1, clamped).
   * Useful for driving animations that only live in one chapter.
   */
  chapterProgress: (name: ChapterName) => number
}

export function useChapter(
  chapters: ChapterDef[] = DEFAULT_CHAPTERS,
): UseChapterReturn {
  const frame = useCurrentFrame()
  const { durationInFrames } = useVideoConfig()

  const videoProgress = frame / Math.max(1, durationInFrames - 1)

  // Find active chapter
  let active = chapters[0]
  for (const ch of chapters) {
    if (frame >= ch.startFrame) active = ch
  }

  const span = Math.max(1, active.endFrame - active.startFrame)
  const localFrame = frame - active.startFrame
  const progress = Math.min(1, localFrame / span)

  const current: ChapterInfo = {
    ...active,
    localFrame,
    progress,
    isActive: true,
  }

  const getChapter = (name: ChapterName) =>
    chapters.find((c) => c.name === name) ?? chapters[0]

  const inChapter = (name: ChapterName) => active.name === name

  const chapterProgress = (name: ChapterName): number => {
    const ch = getChapter(name)
    const s = Math.max(1, ch.endFrame - ch.startFrame)
    return Math.max(0, Math.min(1, (frame - ch.startFrame) / s))
  }

  return { current, videoProgress, chapters, getChapter, inChapter, chapterProgress }
}
