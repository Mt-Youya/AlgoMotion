import type {
  AlgorithmMeta,
  AlgorithmRun,
  ArrayTraceEvent,
  MarkTraceEvent,
  RangeTraceEvent,
  TraceStats,
} from "@algomotion/shared"

type TraceEventInput = ArrayTraceEvent extends infer TEvent
  ? TEvent extends ArrayTraceEvent
    ? Omit<TEvent, "step">
    : never
  : never

export class ArrayTraceRecorder {
  readonly values: number[]
  readonly input: number[]
  readonly trace: ArrayTraceEvent[] = []
  readonly stats: TraceStats = {
    comparisons: 0,
    swaps: 0,
    writes: 0,
    memoryAccesses: 0,
  }

  constructor(input: number[]) {
    this.input = [...input]
    this.values = [...input]
  }

  compare(left: number, right: number, line?: number): number {
    this.stats.comparisons += 1
    this.stats.memoryAccesses += 2
    this.push({
      type: "compare",
      indices: [left, right],
      values: [this.values[left] ?? 0, this.values[right] ?? 0],
      line,
    })
    return (this.values[left] ?? 0) - (this.values[right] ?? 0)
  }

  compareValue(leftIndex: number, rightIndex: number, leftValue: number, rightValue: number, line?: number): number {
    this.stats.comparisons += 1
    this.stats.memoryAccesses += 2
    this.push({
      type: "compare",
      indices: [leftIndex, rightIndex],
      values: [leftValue, rightValue],
      line,
    })
    return leftValue - rightValue
  }

  swap(left: number, right: number, line?: number): void {
    const leftValue = this.values[left] ?? 0
    const rightValue = this.values[right] ?? 0
    this.values[left] = rightValue
    this.values[right] = leftValue
    this.stats.swaps += 1
    this.stats.writes += 2
    this.stats.memoryAccesses += 4
    this.push({
      type: "swap",
      indices: [left, right],
      values: [rightValue, leftValue],
      line,
    })
  }

  write(index: number, value: number, line?: number): void {
    const previousValue = this.values[index] ?? 0
    this.values[index] = value
    this.stats.writes += 1
    this.stats.memoryAccesses += 1
    this.push({
      type: "write",
      index,
      previousValue,
      value,
      line,
    })
  }

  mark(indices: number[], role: MarkTraceEvent["role"], line?: number): void {
    this.push({ type: "mark", indices, role, line })
  }

  range(bounds: [number, number], role: RangeTraceEvent["role"], line?: number): void {
    this.push({ type: "range", bounds, role, line })
  }

  finish(algorithm: AlgorithmMeta): AlgorithmRun {
    this.push({ type: "complete", output: [...this.values] })
    return {
      algorithm,
      input: [...this.input],
      output: [...this.values],
      trace: [...this.trace],
      stats: { ...this.stats },
    }
  }

  private push(event: TraceEventInput): void {
    this.trace.push({ ...event, step: this.trace.length } as ArrayTraceEvent)
  }
}
