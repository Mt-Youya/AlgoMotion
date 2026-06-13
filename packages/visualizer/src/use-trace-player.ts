"use client"

import type { ArrayTraceEvent, TraceStatus } from "@algomotion/shared"
import { useCallback, useEffect, useMemo, useState } from "react"
import { replayArrayTrace } from "./player"

export interface TracePlayerOptions {
  initialValues: number[]
  trace: ArrayTraceEvent[]
  autoplay?: boolean
  intervalMs?: number
}

export function useTracePlayer({ initialValues, trace, autoplay = false, intervalMs = 180 }: TracePlayerOptions) {
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<TraceStatus>(autoplay ? "running" : "paused")
  const [speed, setSpeed] = useState(1)

  useEffect(() => {
    setStep(0)
    setStatus(autoplay ? "running" : "paused")
  }, [trace, autoplay])

  useEffect(() => {
    if (status !== "running" || trace.length === 0) return

    const timer = window.setInterval(
      () => {
        setStep((current) => {
          if (current >= trace.length) {
            setStatus("completed")
            return current
          }
          return current + 1
        })
      },
      Math.max(20, intervalMs / speed)
    )

    return () => window.clearInterval(timer)
  }, [intervalMs, speed, status, trace.length])

  const visualState = useMemo(() => replayArrayTrace(initialValues, trace, step), [initialValues, step, trace])

  const play = useCallback(() => {
    setStep((current) => (current >= trace.length ? 0 : current))
    setStatus("running")
  }, [trace.length])

  const pause = useCallback(() => setStatus("paused"), [])

  const next = useCallback(() => {
    setStatus("paused")
    setStep((current) => Math.min(trace.length, current + 1))
  }, [trace.length])

  const previous = useCallback(() => {
    setStatus("paused")
    setStep((current) => Math.max(0, current - 1))
  }, [])

  const seek = useCallback(
    (nextStep: number) => {
      setStatus("paused")
      setStep(Math.max(0, Math.min(trace.length, nextStep)))
    },
    [trace.length]
  )

  const reset = useCallback(() => {
    setStatus("paused")
    setStep(0)
  }, [])

  return {
    step,
    totalSteps: trace.length,
    progress: trace.length === 0 ? 0 : step / trace.length,
    status: step >= trace.length && trace.length > 0 ? "completed" : status,
    speed,
    visualState,
    play,
    pause,
    next,
    previous,
    seek,
    reset,
    setSpeed,
  }
}
