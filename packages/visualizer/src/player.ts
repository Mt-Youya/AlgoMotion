import type { ArrayTraceEvent, TraceStatus } from "@algomotion/shared"

export interface ArrayVisualizerState {
  values: number[]
  activeIndices: number[]
  sortedIndices: number[]
  pivotIndices: number[]
  candidateIndices: number[]
  range: [number, number] | null
  currentEvent: ArrayTraceEvent | null
  status: TraceStatus
}

export function createArrayVisualizerState(values: number[]): ArrayVisualizerState {
  return {
    values: [...values],
    activeIndices: [],
    sortedIndices: [],
    pivotIndices: [],
    candidateIndices: [],
    range: null,
    currentEvent: null,
    status: "idle",
  }
}

export function applyArrayTraceEvent(state: ArrayVisualizerState, event: ArrayTraceEvent): ArrayVisualizerState {
  const next: ArrayVisualizerState = {
    ...state,
    values: [...state.values],
    activeIndices: [],
    currentEvent: event,
    status: "running",
  }

  switch (event.type) {
    case "compare":
      next.activeIndices = [...event.indices]
      break
    case "swap": {
      const [left, right] = event.indices
      ;[next.values[left], next.values[right]] = [next.values[right] ?? 0, next.values[left] ?? 0]
      next.activeIndices = [left, right]
      break
    }
    case "write":
      next.values[event.index] = event.value
      next.activeIndices = [event.index]
      break
    case "mark":
      if (event.role === "active") next.activeIndices = [...event.indices]
      if (event.role === "sorted") next.sortedIndices = mergeIndices(next.sortedIndices, event.indices)
      if (event.role === "pivot") next.pivotIndices = [...event.indices]
      if (event.role === "candidate") next.candidateIndices = [...event.indices]
      break
    case "range":
      next.range = [...event.bounds]
      break
    case "complete":
      next.values = [...event.output]
      next.activeIndices = []
      next.sortedIndices = event.output.map((_, index) => index)
      next.status = "completed"
      break
  }

  return next
}

export function replayArrayTrace(
  initialValues: number[],
  trace: ArrayTraceEvent[],
  step: number
): ArrayVisualizerState {
  const limit = Math.max(0, Math.min(step, trace.length))
  let state = createArrayVisualizerState(initialValues)
  for (let index = 0; index < limit; index += 1) {
    const event = trace[index]
    if (event) state = applyArrayTraceEvent(state, event)
  }
  return state
}

function mergeIndices(current: number[], additions: number[]): number[] {
  return [...new Set([...current, ...additions])].sort((left, right) => left - right)
}
