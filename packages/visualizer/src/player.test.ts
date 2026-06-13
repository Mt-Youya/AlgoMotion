import type { ArrayTraceEvent } from "@algomotion/shared"
import { describe, expect, it } from "vitest"
import { replayArrayTrace } from "./player"

describe("replayArrayTrace", () => {
  it("reconstructs values at any point in the trace", () => {
    const trace: ArrayTraceEvent[] = [
      { type: "swap", step: 0, indices: [0, 1], values: [1, 3] },
      { type: "write", step: 1, index: 1, previousValue: 3, value: 2 },
      { type: "complete", step: 2, output: [1, 2] },
    ]

    expect(replayArrayTrace([3, 1], trace, 1).values).toEqual([1, 3])
    expect(replayArrayTrace([3, 1], trace, 2).values).toEqual([1, 2])
    expect(replayArrayTrace([3, 1], trace, 3).status).toBe("completed")
  })
})
