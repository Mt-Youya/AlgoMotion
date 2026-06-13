// ─── Algorithm categories ─────────────────────────────────────────────────────

export type AlgorithmCategory =
  | "sorting"
  | "search"
  | "data-structure"
  | "graph"
  | "dynamic-programming"
  | "string"
  | "backtracking"
  | "greedy"
  | "divide-conquer"
  | "two-pointers"
  | "math"
  | "bit-manipulation"
  | "tree"

// ─── Sorting ──────────────────────────────────────────────────────────────────

export type SortingAlgorithmId =
  | "bubble-sort"
  | "selection-sort"
  | "insertion-sort"
  | "merge-sort"
  | "quick-sort"
  | "heap-sort"
  | "shell-sort"
  | "counting-sort"
  | "radix-sort"
  | "bucket-sort"
  | "tim-sort"

// ─── Search ───────────────────────────────────────────────────────────────────

export type SearchAlgorithmId =
  | "linear-search"
  | "binary-search"
  | "jump-search"
  | "interpolation-search"
  | "exponential-search"
  | "ternary-search"

// ─── Data Structures ──────────────────────────────────────────────────────────

export type DataStructureId =
  | "array"
  | "linked-list"
  | "doubly-linked-list"
  | "stack"
  | "queue"
  | "deque"
  | "circular-queue"
  | "hash-table"
  | "hash-map-chaining"
  | "hash-map-open-addressing"
  | "binary-tree"
  | "binary-search-tree"
  | "avl-tree"
  | "red-black-tree"
  | "segment-tree"
  | "fenwick-tree"
  | "trie"
  | "heap-min"
  | "heap-max"
  | "priority-queue"
  | "disjoint-set"
  | "bloom-filter"
  | "lru-cache"
  | "monotonic-stack"
  | "monotonic-queue"
  | "graph-adjacency-list"
  | "graph-adjacency-matrix"

// ─── Graph algorithms ─────────────────────────────────────────────────────────

export type GraphAlgorithmId =
  | "graph-bfs"
  | "graph-dfs"
  | "dijkstra"
  | "bellman-ford"
  | "floyd-warshall"
  | "spfa"
  | "kruskal"
  | "prim"
  | "topological-sort"
  | "tarjan-scc"
  | "kosaraju-scc"
  | "articulation-points"
  | "bridges"
  | "eulerian-path"
  | "hamiltonian-cycle"

// ─── Dynamic programming ─────────────────────────────────────────────────────

export type DpAlgorithmId =
  | "fibonacci"
  | "climbing-stairs"
  | "coin-change"
  | "house-robber"
  | "jump-game"
  | "max-subarray"
  | "knapsack-01"
  | "knapsack-unbounded"
  | "lcs"
  | "edit-distance"
  | "unique-paths"
  | "triangle"
  | "min-path-sum"
  | "lis"
  | "palindrome-dp"
  | "word-break"
  | "matrix-chain"
  | "burst-balloons"
  | "tree-dp-diameter"
  | "tree-dp-max-path"

// ─── String algorithms ────────────────────────────────────────────────────────

export type StringAlgorithmId =
  | "kmp"
  | "rabin-karp"
  | "z-algorithm"
  | "aho-corasick"
  | "manacher"
  | "suffix-array"
  | "hamming-distance"

// ─── Backtracking ─────────────────────────────────────────────────────────────

export type BacktrackingAlgorithmId =
  | "n-queens"
  | "sudoku-solver"
  | "permutations"
  | "subsets"
  | "combination-sum"
  | "word-search"
  | "knights-tour"

// ─── Greedy ───────────────────────────────────────────────────────────────────

export type GreedyAlgorithmId =
  | "activity-selection"
  | "fractional-knapsack"
  | "huffman-coding"
  | "interval-scheduling"
  | "best-time-stock"

// ─── Tree algorithms ──────────────────────────────────────────────────────────

export type TreeAlgorithmId =
  | "tree-inorder"
  | "tree-preorder"
  | "tree-postorder"
  | "tree-level-order"
  | "tree-height"
  | "tree-lca"
  | "tree-serialize"

// ─── Two pointers / sliding window ────────────────────────────────────────────

export type TwoPointersAlgorithmId =
  | "two-sum-pointers"
  | "three-sum"
  | "sliding-window-max"
  | "min-window-substring"
  | "longest-no-repeat"
  | "trapping-rain-water"

// ─── Math / bit manipulation ──────────────────────────────────────────────────

export type MathAlgorithmId =
  | "sieve-of-eratosthenes"
  | "gcd-lcm"
  | "fast-power"
  | "prime-factorization"
  | "pascal-triangle"
  | "bit-manipulation"
  | "dft"

export type BitAlgorithmId = "popcount" | "single-number" | "power-of-two" | "reverse-bits"

// ─── Union type ───────────────────────────────────────────────────────────────

export type AlgorithmId =
  | SortingAlgorithmId
  | SearchAlgorithmId
  | DataStructureId
  | GraphAlgorithmId
  | DpAlgorithmId
  | StringAlgorithmId
  | BacktrackingAlgorithmId
  | GreedyAlgorithmId
  | TreeAlgorithmId
  | TwoPointersAlgorithmId
  | MathAlgorithmId
  | BitAlgorithmId

// ─── Multi-language code snippets ─────────────────────────────────────────────

export type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "java"
  | "python"
  | "rust"
  | "c"
  | "cpp"
  | "go"
  | "php"
  | "kotlin"
  | "swift"

export interface AlgorithmCodeSnippet {
  lang: SupportedLanguage
  /** Source code string */
  code: string
  /** 1-based line numbers to highlight per execution step (optional, for future step-sync) */
  highlightLines?: number[][]
}

// ─── LeetCode reference ───────────────────────────────────────────────────────

export type LeetCodeDifficulty = "easy" | "medium" | "hard"

export interface LeetCodeRef {
  id: number
  titleSlug: string
  difficulty: LeetCodeDifficulty
}

// ─── Algorithm difficulty & tags ──────────────────────────────────────────────

/** Beginner = 入门, Intermediate = 中级, Advanced = 进阶, Expert = 专家 */
export type AlgorithmDifficulty = "beginner" | "intermediate" | "advanced" | "expert"

// ─── Algorithm metadata ───────────────────────────────────────────────────────

// ─── Algorithm input schema ───────────────────────────────────────────────────

/** Describes what kind of input an algorithm needs */
export type AlgorithmInputSchema =
  | { type: "array"; label?: { zh: string; en: string }; placeholder?: string; defaultValue?: string }
  | { type: "graph"; directed?: boolean; weighted?: boolean; defaultValue?: string }
  | { type: "tree"; defaultValue?: string }
  | { type: "single-number"; label?: { zh: string; en: string }; defaultValue?: number }
  | { type: "none" }

export interface AlgorithmMeta {
  id: AlgorithmId
  name: string
  /** Localized display name */
  displayName: {
    en: string
    zh: string
  }
  category: AlgorithmCategory
  /** Difficulty level for UI badging and filtering */
  difficulty: AlgorithmDifficulty
  /** Topic tags, e.g. ["array", "divide-conquer", "in-place"] */
  tags: string[]
  /** One-sentence description per locale */
  description?: {
    en: string
    zh: string
  }
  /** Stable sort: output order of equal elements preserved */
  stable?: boolean
  /** Operates in-place without extra memory proportional to input */
  inPlace?: boolean
  timeComplexity: {
    best: string
    average: string
    worst: string
  }
  spaceComplexity: string
  /** Code snippets for each supported language */
  snippets?: AlgorithmCodeSnippet[]
  /** Related LeetCode problems */
  relatedProblems?: LeetCodeRef[]
  /** Describes what kind of input this algorithm takes */
  inputSchema?: AlgorithmInputSchema
}

// ─── Trace status ─────────────────────────────────────────────────────────────

export type TraceStatus = "idle" | "running" | "paused" | "completed"

// ─── Array trace events ───────────────────────────────────────────────────────

export interface TraceEventBase {
  step: number
  /** 1-based source line number to highlight in code view */
  line?: number
  message?: string
}

export interface CompareTraceEvent extends TraceEventBase {
  type: "compare"
  indices: [number, number]
  values: [number, number]
}

export interface SwapTraceEvent extends TraceEventBase {
  type: "swap"
  indices: [number, number]
  values: [number, number]
}

export interface WriteTraceEvent extends TraceEventBase {
  type: "write"
  index: number
  previousValue: number
  value: number
}

export interface MarkTraceEvent extends TraceEventBase {
  type: "mark"
  indices: number[]
  role: "active" | "pivot" | "sorted" | "candidate" | "visited" | "current"
}

export interface RangeTraceEvent extends TraceEventBase {
  type: "range"
  bounds: [number, number]
  role: "partition" | "merge" | "heap" | "window" | "subarray"
}

export interface CompleteTraceEvent extends TraceEventBase {
  type: "complete"
  output: number[]
}

export type ArrayTraceEvent =
  | CompareTraceEvent
  | SwapTraceEvent
  | WriteTraceEvent
  | MarkTraceEvent
  | RangeTraceEvent
  | CompleteTraceEvent

// ─── Graph trace events ───────────────────────────────────────────────────────

export interface VisitNodeTraceEvent extends TraceEventBase {
  type: "visit-node"
  nodeId: string | number
  role: "visited" | "active" | "start" | "end" | "relaxed"
}

export interface VisitEdgeTraceEvent extends TraceEventBase {
  type: "visit-edge"
  from: string | number
  to: string | number
  role: "explored" | "tree" | "back" | "cross" | "forward" | "relaxed"
}

export interface UpdateDistTraceEvent extends TraceEventBase {
  type: "update-dist"
  nodeId: string | number
  previousDist: number
  dist: number
}

export interface MarkNodeTraceEvent extends TraceEventBase {
  type: "mark-node"
  nodeIds: (string | number)[]
  role: "path" | "component" | "sorted" | "mst"
}

export interface GraphCompleteTraceEvent extends TraceEventBase {
  type: "complete"
  result?: unknown
}

export type GraphTraceEvent =
  | VisitNodeTraceEvent
  | VisitEdgeTraceEvent
  | UpdateDistTraceEvent
  | MarkNodeTraceEvent
  | GraphCompleteTraceEvent

// ─── Tree trace events ────────────────────────────────────────────────────────

export interface VisitTreeNodeTraceEvent extends TraceEventBase {
  type: "visit-tree-node"
  nodeId: string | number
  role: "active" | "visited" | "found" | "inserted" | "deleted"
}

export interface TreeRotateTraceEvent extends TraceEventBase {
  type: "tree-rotate"
  pivot: string | number
  direction: "left" | "right"
}

export interface TreeMarkTraceEvent extends TraceEventBase {
  type: "tree-mark"
  nodeIds: (string | number)[]
  role: "path" | "lca" | "balanced" | "unbalanced"
}

export interface TreeCompleteTraceEvent extends TraceEventBase {
  type: "complete"
  result?: unknown
}

export type TreeTraceEvent =
  | VisitTreeNodeTraceEvent
  | TreeRotateTraceEvent
  | TreeMarkTraceEvent
  | TreeCompleteTraceEvent

// ─── Trace statistics ─────────────────────────────────────────────────────────

export interface TraceStats {
  comparisons: number
  swaps: number
  writes: number
  memoryAccesses: number
}

// ─── Algorithm run result ─────────────────────────────────────────────────────

export interface AlgorithmRun<TEvent extends ArrayTraceEvent = ArrayTraceEvent> {
  algorithm: AlgorithmMeta
  input: number[]
  output: number[]
  trace: TEvent[]
  stats: TraceStats
}

// ─── Web Worker IPC ───────────────────────────────────────────────────────────

export interface AlgorithmWorkerRequest {
  requestId: string
  algorithmId: AlgorithmId
  input: number[]
}

export interface AlgorithmWorkerSuccess {
  requestId: string
  ok: true
  run: AlgorithmRun
}

export interface AlgorithmWorkerFailure {
  requestId: string
  ok: false
  error: string
}

export type AlgorithmWorkerResponse = AlgorithmWorkerSuccess | AlgorithmWorkerFailure
