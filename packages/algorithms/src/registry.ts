import type { AlgorithmCategory, AlgorithmInputSchema, AlgorithmMeta } from "@algomotion/shared"

import { sortingAlgorithms } from "./sorting"
import { searchAlgorithms } from "./search"
import { mathAlgorithms } from "./math"
import { twoPointersAlgorithms } from "./two-pointers"
import { stringAlgorithms } from "./string-algorithms"
import { dpAlgorithms } from "./dynamic-programming"
import { backtrackingAlgorithms } from "./backtracking"
import { greedyAlgorithms } from "./greedy"
import { setsAlgorithms } from "./sets"
import { treeAlgorithms } from "./tree-traversal"
import { linearDsAlgorithms } from "./data-structures/linear"
import { hashDsAlgorithms } from "./data-structures/hash"
import { treeDsAlgorithms } from "./data-structures/trees"
import { advancedDsAlgorithms } from "./data-structures/advanced"
import { graphTraversalAlgorithms } from "./graph/traversal"
import { graphShortestPathAlgorithms } from "./graph/shortest-path"
import { graphMstAlgorithms } from "./graph/mst"
import { graphTopologyAlgorithms } from "./graph/topology"

// ─── Input schema overrides by category ──────────────────────────────────────

const ARRAY_SCHEMA: AlgorithmInputSchema = {
  type: "array",
  label: { zh: "输入数组", en: "Input Array" },
  placeholder: "42, 17, 8, 99, 23, 61",
  defaultValue: "42, 17, 8, 99, 23, 61, 4, 76, 35, 12",
}

const GRAPH_SCHEMA: AlgorithmInputSchema = {
  type: "graph",
  directed: false,
  weighted: false,
  defaultValue: "0 1\n0 2\n1 3\n1 4\n2 5\n2 6",
}

const DIRECTED_GRAPH_SCHEMA: AlgorithmInputSchema = {
  type: "graph",
  directed: true,
  weighted: false,
  defaultValue: "0->1\n0->2\n1->3\n2->3\n3->4",
}

const WEIGHTED_GRAPH_SCHEMA: AlgorithmInputSchema = {
  type: "graph",
  directed: false,
  weighted: true,
  defaultValue: "0 1 4\n0 2 1\n1 3 1\n2 3 5\n2 4 3\n3 4 2",
}

const TREE_SCHEMA: AlgorithmInputSchema = {
  type: "tree",
  defaultValue: "1,2,3,4,5,null,6,null,null,7",
}

const NONE_SCHEMA: AlgorithmInputSchema = { type: "none" }

const SINGLE_NUMBER_SCHEMA: AlgorithmInputSchema = {
  type: "single-number",
  label: { zh: "输入 n", en: "Input n" },
  defaultValue: 10,
}

/** Which algorithms get which inputSchema (by id prefix or exact match) */
const INPUT_SCHEMA_MAP: Record<string, AlgorithmInputSchema> = {
  // Sorting: array
  "bubble-sort": ARRAY_SCHEMA,
  "selection-sort": ARRAY_SCHEMA,
  "insertion-sort": ARRAY_SCHEMA,
  "merge-sort": ARRAY_SCHEMA,
  "quick-sort": ARRAY_SCHEMA,
  "heap-sort": ARRAY_SCHEMA,
  "shell-sort": ARRAY_SCHEMA,
  "counting-sort": ARRAY_SCHEMA,
  "radix-sort": ARRAY_SCHEMA,
  "bucket-sort": ARRAY_SCHEMA,
  "tim-sort": ARRAY_SCHEMA,

  // Search: array
  "linear-search": ARRAY_SCHEMA,
  "binary-search": ARRAY_SCHEMA,
  "jump-search": ARRAY_SCHEMA,
  "interpolation-search": ARRAY_SCHEMA,
  "exponential-search": ARRAY_SCHEMA,
  "ternary-search": ARRAY_SCHEMA,

  // Two pointers: array
  "two-sum-pointers": ARRAY_SCHEMA,
  "three-sum": ARRAY_SCHEMA,
  "sliding-window-max": ARRAY_SCHEMA,
  "min-window-substring": ARRAY_SCHEMA,
  "longest-no-repeat": ARRAY_SCHEMA,
  "trapping-rain-water": ARRAY_SCHEMA,

  // DP with single number
  fibonacci: SINGLE_NUMBER_SCHEMA,
  "climbing-stairs": SINGLE_NUMBER_SCHEMA,

  // DP with array
  "max-subarray": ARRAY_SCHEMA,
  lis: ARRAY_SCHEMA,
  "coin-change": ARRAY_SCHEMA,
  "house-robber": ARRAY_SCHEMA,

  // Backtracking with array
  permutations: ARRAY_SCHEMA,
  subsets: ARRAY_SCHEMA,
  "combination-sum": ARRAY_SCHEMA,

  // Backtracking
  "n-queens": SINGLE_NUMBER_SCHEMA,
  "sudoku-solver": {
    type: "array",
    label: { zh: "数独棋盘（81格，0=空）", en: "Sudoku board (81 cells, 0=empty)" },
    placeholder: "5,3,0,0,7,0,0,0,0,...",
    defaultValue:
      "5,3,0,0,7,0,0,0,0, 6,0,0,1,9,5,0,0,0, 0,9,8,0,0,0,0,6,0, 8,0,0,0,6,0,0,0,3, 4,0,0,8,0,3,0,0,1, 7,0,0,0,2,0,0,0,6, 0,6,0,0,0,0,2,8,0, 0,0,0,4,1,9,0,0,5, 0,0,0,0,8,0,0,7,9",
  },
  "word-search": {
    type: "array",
    label: { zh: "网格 + 单词（-1分隔）", en: "Grid values + word (-1 separator)" },
    placeholder: "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,-1,1,6,2",
    defaultValue: "1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,-1,1,6,2",
  },
  "knights-tour": SINGLE_NUMBER_SCHEMA,

  // Greedy with array
  "best-time-stock": ARRAY_SCHEMA,
  "activity-selection": ARRAY_SCHEMA,
  "fractional-knapsack": {
    type: "array",
    label: { zh: "物品(重量,价值)对 + 容量", en: "Items (weight,value pairs) + capacity" },
    placeholder: "2,12,1,10,3,20,5",
    defaultValue: "2,12,1,10,3,20,5",
  },
  "huffman-coding": {
    type: "array",
    label: { zh: "字符频率数组", en: "Character frequencies" },
    placeholder: "5,9,12,13,16,45",
    defaultValue: "5,9,12,13,16,45",
  },
  "interval-scheduling": {
    type: "array",
    label: { zh: "区间端点（start,end 成对）", en: "Interval endpoints (start,end pairs)" },
    placeholder: "1,4,2,6,5,8,7,9,3,5",
    defaultValue: "1,4,2,6,5,8,7,9,3,5",
  },

  // Tree traversal: tree input
  "tree-inorder": TREE_SCHEMA,
  "tree-preorder": TREE_SCHEMA,
  "tree-postorder": TREE_SCHEMA,
  "tree-level-order": TREE_SCHEMA,
  "tree-height": TREE_SCHEMA,
  "tree-lca": TREE_SCHEMA,
  "tree-serialize": TREE_SCHEMA,

  // Graph traversal: graph input
  "graph-bfs": GRAPH_SCHEMA,
  "graph-dfs": GRAPH_SCHEMA,

  // Graph shortest path: weighted graph
  dijkstra: WEIGHTED_GRAPH_SCHEMA,
  "bellman-ford": WEIGHTED_GRAPH_SCHEMA,
  "floyd-warshall": WEIGHTED_GRAPH_SCHEMA,
  spfa: WEIGHTED_GRAPH_SCHEMA,

  // Graph MST: weighted graph
  kruskal: WEIGHTED_GRAPH_SCHEMA,
  prim: WEIGHTED_GRAPH_SCHEMA,

  // Topology: directed graph
  "topological-sort": DIRECTED_GRAPH_SCHEMA,
  "tarjan-scc": DIRECTED_GRAPH_SCHEMA,
  "kosaraju-scc": DIRECTED_GRAPH_SCHEMA,
  "articulation-points": GRAPH_SCHEMA,
  bridges: GRAPH_SCHEMA,
  "eulerian-path": GRAPH_SCHEMA,
  "hamiltonian-cycle": GRAPH_SCHEMA,

  // Math: none or single number
  "sieve-of-eratosthenes": SINGLE_NUMBER_SCHEMA,
  "gcd-lcm": ARRAY_SCHEMA,
  "fast-power": ARRAY_SCHEMA,
  "prime-factorization": SINGLE_NUMBER_SCHEMA,
  "pascal-triangle": SINGLE_NUMBER_SCHEMA,
  "bit-manipulation": NONE_SCHEMA,
  dft: ARRAY_SCHEMA,

  // Bit manipulation: array
  popcount: ARRAY_SCHEMA,
  "single-number": ARRAY_SCHEMA,
  "power-of-two": SINGLE_NUMBER_SCHEMA,
  "reverse-bits": SINGLE_NUMBER_SCHEMA,

  // Data structures: none
  array: NONE_SCHEMA,
  "linked-list": NONE_SCHEMA,
  "doubly-linked-list": NONE_SCHEMA,
  stack: NONE_SCHEMA,
  queue: NONE_SCHEMA,
  deque: NONE_SCHEMA,
  "circular-queue": NONE_SCHEMA,
  "hash-table": NONE_SCHEMA,
  "hash-map-chaining": NONE_SCHEMA,
  "hash-map-open-addressing": NONE_SCHEMA,
  "binary-tree": NONE_SCHEMA,
  "binary-search-tree": ARRAY_SCHEMA,
  "avl-tree": NONE_SCHEMA,
  "red-black-tree": NONE_SCHEMA,
  "segment-tree": NONE_SCHEMA,
  "fenwick-tree": NONE_SCHEMA,
  trie: NONE_SCHEMA,
  "heap-min": ARRAY_SCHEMA,
  "heap-max": ARRAY_SCHEMA,
  "priority-queue": NONE_SCHEMA,
  "disjoint-set": NONE_SCHEMA,
  "bloom-filter": NONE_SCHEMA,
  "lru-cache": NONE_SCHEMA,
  "monotonic-stack": ARRAY_SCHEMA,
  "monotonic-queue": ARRAY_SCHEMA,
  "graph-adjacency-list": GRAPH_SCHEMA,
  "graph-adjacency-matrix": GRAPH_SCHEMA,
}

// ─── Unified registry ────────────────────────────────────────────────────────

const allAlgorithms: Record<string, AlgorithmMeta> = {
  ...sortingAlgorithms,
  ...searchAlgorithms,
  ...mathAlgorithms,
  ...twoPointersAlgorithms,
  ...stringAlgorithms,
  ...dpAlgorithms,
  ...backtrackingAlgorithms,
  ...greedyAlgorithms,
  ...setsAlgorithms,
  ...treeAlgorithms,
  ...linearDsAlgorithms,
  ...hashDsAlgorithms,
  ...treeDsAlgorithms,
  ...advancedDsAlgorithms,
  ...graphTraversalAlgorithms,
  ...graphShortestPathAlgorithms,
  ...graphMstAlgorithms,
  ...graphTopologyAlgorithms,
}

// Inject inputSchema
Object.entries(allAlgorithms).forEach(([id, meta]) => {
  if (!meta.inputSchema && INPUT_SCHEMA_MAP[id]) {
    ;(meta as AlgorithmMeta).inputSchema = INPUT_SCHEMA_MAP[id]
  }
  // Default fallback by category
  if (!meta.inputSchema) {
    if (meta.category === "graph") (meta as AlgorithmMeta).inputSchema = GRAPH_SCHEMA
    else if (meta.category === "tree") (meta as AlgorithmMeta).inputSchema = TREE_SCHEMA
    else if (meta.category === "data-structure") (meta as AlgorithmMeta).inputSchema = NONE_SCHEMA
    else (meta as AlgorithmMeta).inputSchema = ARRAY_SCHEMA
  }
})

export const algorithmRegistry: Map<string, AlgorithmMeta> = new Map(Object.entries(allAlgorithms))

// ─── Grouped by category ─────────────────────────────────────────────────────

export const algorithmsByCategory: Record<string, AlgorithmMeta[]> = {}

for (const meta of algorithmRegistry.values()) {
  const cat = meta.category as string
  if (!algorithmsByCategory[cat]) algorithmsByCategory[cat] = []
  algorithmsByCategory[cat].push(meta)
}

// ─── Category display labels ──────────────────────────────────────────────────

export const CATEGORY_LABELS: Record<string, { zh: string; en: string }> = {
  sorting: { zh: "排序", en: "Sorting" },
  search: { zh: "搜索", en: "Search" },
  "data-structure": { zh: "数据结构", en: "Data Structures" },
  graph: { zh: "图算法", en: "Graph" },
  "dynamic-programming": { zh: "动态规划", en: "Dynamic Programming" },
  string: { zh: "字符串", en: "String" },
  backtracking: { zh: "回溯", en: "Backtracking" },
  greedy: { zh: "贪心", en: "Greedy" },
  "divide-conquer": { zh: "分治", en: "Divide & Conquer" },
  "two-pointers": { zh: "双指针/滑窗", en: "Two Pointers" },
  math: { zh: "数学/位运算", en: "Math & Bit" },
  "bit-manipulation": { zh: "位运算", en: "Bit Manipulation" },
  tree: { zh: "树算法", en: "Tree" },
}

// ─── Difficulty display labels ────────────────────────────────────────────────

export const DIFFICULTY_LABELS: Record<string, { zh: string; en: string }> = {
  beginner: { zh: "入门", en: "Beginner" },
  intermediate: { zh: "中级", en: "Intermediate" },
  advanced: { zh: "进阶", en: "Advanced" },
  expert: { zh: "专家", en: "Expert" },
}

// ─── Ordered category list for UI rendering ───────────────────────────────────

export const CATEGORY_ORDER: AlgorithmCategory[] = [
  "sorting",
  "search",
  "two-pointers",
  "dynamic-programming",
  "backtracking",
  "greedy",
  "graph",
  "tree",
  "string",
  "data-structure",
  "math",
  "bit-manipulation",
  "divide-conquer",
]
