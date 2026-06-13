import type { AlgorithmCodeSnippet, AlgorithmMeta, AlgorithmRun, DpAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─────────────────────────────────────────────
// Snippet helpers
// ─────────────────────────────────────────────

const fibSnippets: AlgorithmCodeSnippet[] = [
  {
    lang: "javascript",
    code: `function fib(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
  },
  {
    lang: "typescript",
    code: `function fib(n: number): number {
  if (n <= 1) return n;
  const dp: number[] = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}`,
  },
  {
    lang: "python",
    code: `def fib(n: int) -> int:
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]`,
  },
  {
    lang: "java",
    code: `public int fib(int n) {
    if (n <= 1) return n;
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
  },
  {
    lang: "cpp",
    code: `int fib(int n) {
    if (n <= 1) return n;
    std::vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
  },
  {
    lang: "c",
    code: `int fib(int n) {
    if (n <= 1) return n;
    int dp[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`,
  },
  {
    lang: "rust",
    code: `fn fib(n: usize) -> u64 {
    if n <= 1 { return n as u64; }
    let mut dp = vec![0u64; n + 1];
    dp[1] = 1;
    for i in 2..=n {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    dp[n]
}`,
  },
  {
    lang: "go",
    code: `func fib(n int) int {
    if n <= 1 {
        return n
    }
    dp := make([]int, n+1)
    dp[0] = 0
    dp[1] = 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}`,
  },
  {
    lang: "kotlin",
    code: `fun fib(n: Int): Int {
    if (n <= 1) return n
    val dp = IntArray(n + 1)
    dp[0] = 0
    dp[1] = 1
    for (i in 2..n) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}`,
  },
  {
    lang: "swift",
    code: `func fib(_ n: Int) -> Int {
    if n <= 1 { return n }
    var dp = [Int](repeating: 0, count: n + 1)
    dp[1] = 1
    for i in 2...n {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}`,
  },
  {
    lang: "php",
    code: `function fib(int $n): int {
    if ($n <= 1) return $n;
    $dp = array_fill(0, $n + 1, 0);
    $dp[1] = 1;
    for ($i = 2; $i <= $n; $i++) {
        $dp[$i] = $dp[$i - 1] + $dp[$i - 2];
    }
    return $dp[$n];
}`,
  },
]

const stubSnippets = (name: string): AlgorithmCodeSnippet[] => [
  { lang: "javascript", code: `// ${name} - JavaScript implementation` },
  { lang: "typescript", code: `// ${name} - TypeScript implementation` },
  { lang: "python", code: `# ${name} - Python implementation` },
  { lang: "java", code: `// ${name} - Java implementation` },
  { lang: "cpp", code: `// ${name} - C++ implementation` },
  { lang: "c", code: `// ${name} - C implementation` },
  { lang: "rust", code: `// ${name} - Rust implementation` },
  { lang: "go", code: `// ${name} - Go implementation` },
  { lang: "kotlin", code: `// ${name} - Kotlin implementation` },
  { lang: "swift", code: `// ${name} - Swift implementation` },
  { lang: "php", code: `// ${name} - PHP implementation` },
]

// ─────────────────────────────────────────────
// Algorithm metadata
// ─────────────────────────────────────────────

export const dpAlgorithms: Record<string, AlgorithmMeta> = {
  fibonacci: {
    id: "fibonacci",
    name: "fibonacci",
    displayName: { en: "Fibonacci", zh: "斐波那契数列" },
    category: "dynamic-programming",
    difficulty: "beginner",
    tags: ["dp", "math", "memoization"],
    description: {
      en: "Compute the nth Fibonacci number using bottom-up dynamic programming, filling a dp array from index 0 to n.",
      zh: "使用自底向上的动态规划计算第 n 个斐波那契数，从索引 0 到 n 依次填充 dp 数组。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 70, titleSlug: "climbing-stairs", difficulty: "easy" },
      { id: 1143, titleSlug: "longest-common-subsequence", difficulty: "medium" },
    ],
    snippets: fibSnippets,
  },
  "climbing-stairs": {
    id: "climbing-stairs",
    name: "climbing-stairs",
    displayName: { en: "Climbing Stairs", zh: "爬楼梯" },
    category: "dynamic-programming",
    difficulty: "beginner",
    tags: ["dp", "math"],
    description: {
      en: "Count distinct ways to climb n stairs, taking 1 or 2 steps at a time.",
      zh: "计算爬 n 级楼梯的方案数，每次可以走 1 步或 2 步。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 509, titleSlug: "fibonacci", difficulty: "easy" }],
    snippets: stubSnippets("Climbing Stairs"),
  },
  "coin-change": {
    id: "coin-change",
    name: "coin-change",
    displayName: { en: "Coin Change", zh: "零钱兑换" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "bfs", "greedy"],
    description: {
      en: "Find the minimum number of coins needed to make up a given amount.",
      zh: "求凑成目标金额所需的最少硬币数量。",
    },
    timeComplexity: { best: "O(amount)", average: "O(amount * coins)", worst: "O(amount * coins)" },
    spaceComplexity: "O(amount)",
    relatedProblems: [{ id: 416, titleSlug: "partition-equal-subset-sum", difficulty: "medium" }],
    snippets: stubSnippets("Coin Change"),
  },
  "house-robber": {
    id: "house-robber",
    name: "house-robber",
    displayName: { en: "House Robber", zh: "打家劫舍" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "array"],
    description: {
      en: "Maximize the amount of money robbed from non-adjacent houses.",
      zh: "在不能抢相邻房屋的条件下，最大化抢劫金额。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 53, titleSlug: "maximum-subarray", difficulty: "medium" }],
    snippets: stubSnippets("House Robber"),
  },
  "jump-game": {
    id: "jump-game",
    name: "jump-game",
    displayName: { en: "Jump Game", zh: "跳跃游戏" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "greedy", "array"],
    description: {
      en: "Determine if you can reach the last index given jump lengths.",
      zh: "给定跳跃长度，判断能否到达最后一个索引。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 62, titleSlug: "unique-paths", difficulty: "medium" }],
    snippets: stubSnippets("Jump Game"),
  },
  "max-subarray": {
    id: "max-subarray",
    name: "max-subarray",
    displayName: { en: "Maximum Subarray", zh: "最大子数组和" },
    category: "dynamic-programming",
    difficulty: "beginner",
    tags: ["dp", "divide-and-conquer", "array"],
    description: {
      en: "Find the contiguous subarray with the largest sum using Kadane's algorithm.",
      zh: "使用 Kadane 算法找到具有最大和的连续子数组。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 198, titleSlug: "house-robber", difficulty: "medium" }],
    snippets: stubSnippets("Maximum Subarray"),
  },
  "knapsack-01": {
    id: "knapsack-01",
    name: "knapsack-01",
    displayName: { en: "0/1 Knapsack", zh: "0/1 背包问题" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "knapsack"],
    description: {
      en: "Maximize value in a knapsack where each item can be taken at most once.",
      zh: "在每件物品最多取一次的条件下，最大化背包中物品的价值。",
    },
    timeComplexity: { best: "O(n*W)", average: "O(n*W)", worst: "O(n*W)" },
    spaceComplexity: "O(n*W)",
    relatedProblems: [{ id: 322, titleSlug: "coin-change", difficulty: "medium" }],
    snippets: stubSnippets("0/1 Knapsack"),
  },
  "knapsack-unbounded": {
    id: "knapsack-unbounded",
    name: "knapsack-unbounded",
    displayName: { en: "Unbounded Knapsack", zh: "完全背包问题" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "knapsack"],
    description: {
      en: "Maximize value in a knapsack where each item can be taken unlimited times.",
      zh: "在每件物品可以无限次取用的条件下，最大化背包中物品的价值。",
    },
    timeComplexity: { best: "O(n*W)", average: "O(n*W)", worst: "O(n*W)" },
    spaceComplexity: "O(W)",
    relatedProblems: [
      { id: 416, titleSlug: "partition-equal-subset-sum", difficulty: "medium" },
      { id: 322, titleSlug: "coin-change", difficulty: "medium" },
    ],
    snippets: stubSnippets("Unbounded Knapsack"),
  },
  lcs: {
    id: "lcs",
    name: "lcs",
    displayName: { en: "Longest Common Subsequence", zh: "最长公共子序列" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "string"],
    description: {
      en: "Find the length of the longest common subsequence between two sequences.",
      zh: "求两个序列的最长公共子序列的长度。",
    },
    timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
    spaceComplexity: "O(m*n)",
    relatedProblems: [
      { id: 72, titleSlug: "edit-distance", difficulty: "medium" },
      { id: 300, titleSlug: "longest-increasing-subsequence", difficulty: "medium" },
    ],
    snippets: stubSnippets("Longest Common Subsequence"),
  },
  "edit-distance": {
    id: "edit-distance",
    name: "edit-distance",
    displayName: { en: "Edit Distance", zh: "编辑距离" },
    category: "dynamic-programming",
    difficulty: "advanced",
    tags: ["dp", "string"],
    description: {
      en: "Compute the minimum number of operations (insert, delete, replace) to transform one string into another.",
      zh: "计算将一个字符串转换为另一个字符串所需的最少操作数（插入、删除、替换）。",
    },
    timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
    spaceComplexity: "O(m*n)",
    relatedProblems: [{ id: 1143, titleSlug: "longest-common-subsequence", difficulty: "medium" }],
    snippets: stubSnippets("Edit Distance"),
  },
  "unique-paths": {
    id: "unique-paths",
    name: "unique-paths",
    displayName: { en: "Unique Paths", zh: "不同路径" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "math", "grid"],
    description: {
      en: "Count the number of unique paths from top-left to bottom-right in an m×n grid.",
      zh: "计算在 m×n 网格中从左上角到右下角的唯一路径数。",
    },
    timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
    spaceComplexity: "O(m*n)",
    relatedProblems: [{ id: 55, titleSlug: "jump-game", difficulty: "medium" }],
    snippets: stubSnippets("Unique Paths"),
  },
  triangle: {
    id: "triangle",
    name: "triangle",
    displayName: { en: "Triangle", zh: "三角形最小路径和" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "array"],
    description: {
      en: "Find the minimum path sum from top to bottom of a triangle.",
      zh: "求从三角形顶部到底部的最小路径和。",
    },
    timeComplexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 62, titleSlug: "unique-paths", difficulty: "medium" }],
    snippets: stubSnippets("Triangle"),
  },
  "min-path-sum": {
    id: "min-path-sum",
    name: "min-path-sum",
    displayName: { en: "Minimum Path Sum", zh: "最小路径和" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "grid"],
    description: {
      en: "Find the path with minimum sum from top-left to bottom-right in a grid.",
      zh: "在网格中找从左上角到右下角的最小路径和。",
    },
    timeComplexity: { best: "O(m*n)", average: "O(m*n)", worst: "O(m*n)" },
    spaceComplexity: "O(m*n)",
    relatedProblems: [{ id: 62, titleSlug: "unique-paths", difficulty: "medium" }],
    snippets: stubSnippets("Minimum Path Sum"),
  },
  lis: {
    id: "lis",
    name: "lis",
    displayName: { en: "Longest Increasing Subsequence", zh: "最长递增子序列" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "binary-search", "array"],
    description: {
      en: "Find the length of the longest strictly increasing subsequence in an array.",
      zh: "求数组中最长严格递增子序列的长度。",
    },
    timeComplexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 1143, titleSlug: "longest-common-subsequence", difficulty: "medium" }],
    snippets: stubSnippets("Longest Increasing Subsequence"),
  },
  "palindrome-dp": {
    id: "palindrome-dp",
    name: "palindrome-dp",
    displayName: { en: "Palindrome DP", zh: "回文动态规划" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "string", "palindrome"],
    description: {
      en: "Find the longest palindromic substring using dynamic programming.",
      zh: "使用动态规划求最长回文子串。",
    },
    timeComplexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(n^2)",
    relatedProblems: [
      { id: 1143, titleSlug: "longest-common-subsequence", difficulty: "medium" },
      { id: 72, titleSlug: "edit-distance", difficulty: "medium" },
    ],
    snippets: stubSnippets("Palindrome DP"),
  },
  "word-break": {
    id: "word-break",
    name: "word-break",
    displayName: { en: "Word Break", zh: "单词拆分" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "trie", "hash-table"],
    description: {
      en: "Determine if a string can be segmented into words from a dictionary.",
      zh: "判断字符串是否可以用字典中的单词拆分。",
    },
    timeComplexity: { best: "O(n^2)", average: "O(n^2)", worst: "O(n^2)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 139, titleSlug: "word-break", difficulty: "medium" }],
    snippets: stubSnippets("Word Break"),
  },
  "matrix-chain": {
    id: "matrix-chain",
    name: "matrix-chain",
    displayName: { en: "Matrix Chain Multiplication", zh: "矩阵链乘法" },
    category: "dynamic-programming",
    difficulty: "advanced",
    tags: ["dp", "math"],
    description: {
      en: "Find the most efficient way to multiply a chain of matrices.",
      zh: "求矩阵链乘法中标量乘法次数最少的计算顺序。",
    },
    timeComplexity: { best: "O(n^3)", average: "O(n^3)", worst: "O(n^3)" },
    spaceComplexity: "O(n^2)",
    relatedProblems: [{ id: 312, titleSlug: "burst-balloons", difficulty: "hard" }],
    snippets: stubSnippets("Matrix Chain Multiplication"),
  },
  "burst-balloons": {
    id: "burst-balloons",
    name: "burst-balloons",
    displayName: { en: "Burst Balloons", zh: "戳气球" },
    category: "dynamic-programming",
    difficulty: "advanced",
    tags: ["dp", "divide-and-conquer"],
    description: {
      en: "Maximize coins collected by bursting balloons in an optimal order.",
      zh: "以最优顺序戳破气球，最大化获得的硬币数。",
    },
    timeComplexity: { best: "O(n^3)", average: "O(n^3)", worst: "O(n^3)" },
    spaceComplexity: "O(n^2)",
    relatedProblems: [{ id: 312, titleSlug: "burst-balloons", difficulty: "hard" }],
    snippets: stubSnippets("Burst Balloons"),
  },
  "tree-dp-diameter": {
    id: "tree-dp-diameter",
    name: "tree-dp-diameter",
    displayName: { en: "Tree DP: Diameter", zh: "树形DP：直径" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dp", "tree", "dfs"],
    description: {
      en: "Find the diameter of a binary tree using tree DP.",
      zh: "使用树形 DP 求二叉树的直径。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 124, titleSlug: "binary-tree-maximum-path-sum", difficulty: "hard" }],
    snippets: stubSnippets("Tree DP Diameter"),
  },
  "tree-dp-max-path": {
    id: "tree-dp-max-path",
    name: "tree-dp-max-path",
    displayName: { en: "Tree DP: Max Path Sum", zh: "树形DP：最大路径和" },
    category: "dynamic-programming",
    difficulty: "advanced",
    tags: ["dp", "tree", "dfs"],
    description: {
      en: "Find the maximum path sum in a binary tree using tree DP.",
      zh: "使用树形 DP 求二叉树中的最大路径和。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 543, titleSlug: "diameter-of-binary-tree", difficulty: "easy" }],
    snippets: stubSnippets("Tree DP Max Path Sum"),
  },
}

// ─────────────────────────────────────────────
// Runner implementations
// ─────────────────────────────────────────────

export function fibonacci(n: number): AlgorithmRun {
  const size = Math.max(n + 1, 2)
  const initial = new Array<number>(size).fill(0)
  const recorder = new ArrayTraceRecorder(initial)
  recorder.values[0] = 0
  recorder.values[1] = 1
  recorder.write(0, 0)
  recorder.write(1, 1)
  for (let i = 2; i <= n; i++) {
    const val = (recorder.values[i - 1] ?? 0) + (recorder.values[i - 2] ?? 0)
    recorder.write(i, val)
    recorder.mark([i], "active")
  }
  return recorder.finish(dpAlgorithms["fibonacci"] as AlgorithmMeta)
}

export function climbingStairs(n: number): AlgorithmRun {
  const size = Math.max(n + 1, 2)
  const initial = new Array<number>(size).fill(0)
  const recorder = new ArrayTraceRecorder(initial)
  recorder.values[0] = 1
  recorder.values[1] = 1
  recorder.write(0, 1)
  recorder.write(1, 1)
  for (let i = 2; i <= n; i++) {
    const val = (recorder.values[i - 1] ?? 0) + (recorder.values[i - 2] ?? 0)
    recorder.write(i, val)
    recorder.mark([i], "active")
  }
  return recorder.finish(dpAlgorithms["climbing-stairs"] as AlgorithmMeta)
}

export function coinChange(coins: number[], amount: number): AlgorithmRun {
  const dp = new Array<number>(amount + 1).fill(amount + 1)
  dp[0] = 0
  const recorder = new ArrayTraceRecorder([...dp])
  recorder.write(0, 0)
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        const prev = recorder.values[i - coin] ?? amount + 1
        if (prev + 1 < (recorder.values[i] ?? amount + 1)) {
          recorder.write(i, prev + 1)
          recorder.mark([i], "active")
        }
      }
    }
  }
  return recorder.finish(dpAlgorithms["coin-change"] as AlgorithmMeta)
}

export function maxSubarray(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  let maxSum = input[0] ?? 0
  let currentSum = input[0] ?? 0
  recorder.mark([0], "active")
  for (let i = 1; i < input.length; i++) {
    const val = input[i] ?? 0
    currentSum = Math.max(val, currentSum + val)
    recorder.compareValue(i, 0, currentSum, maxSum)
    recorder.mark([i], "active")
    if (currentSum > maxSum) {
      maxSum = currentSum
      recorder.mark([i], "sorted")
    }
  }
  return recorder.finish(dpAlgorithms["max-subarray"] as AlgorithmMeta)
}

export function lis(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const n = input.length
  const dp = new Array<number>(n).fill(1)
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (recorder.compareValue(j, i, input[j] ?? 0, input[i] ?? 0) < 0) {
        if ((dp[j] ?? 1) + 1 > (dp[i] ?? 1)) {
          dp[i] = (dp[j] ?? 1) + 1
          recorder.mark([i], "active")
        }
      }
    }
    recorder.mark([i], "sorted")
  }
  return recorder.finish(dpAlgorithms["lis"] as AlgorithmMeta)
}

// ─────────────────────────────────────────────
// Runner implementations (previously stubs)
// ─────────────────────────────────────────────

export function houseRobber(input: number[]): AlgorithmRun {
  const n = Math.max(input.length, 1)
  const arr = input.length > 0 ? input : [2, 7, 9, 3, 1]
  const recorder = new ArrayTraceRecorder([...arr])
  const dp: number[] = new Array(n).fill(0)
  dp[0] = arr[0] ?? 0
  recorder.mark([0], "active")
  if (n > 1) {
    dp[1] = Math.max(arr[0] ?? 0, arr[1] ?? 0)
    recorder.compare(0, 1)
    recorder.mark([1], "active")
  }
  for (let i = 2; i < n; i++) {
    const take = (dp[i - 2] ?? 0) + (arr[i] ?? 0)
    const skip = dp[i - 1] ?? 0
    recorder.compareValue(i - 2, i - 1, take, skip)
    dp[i] = Math.max(take, skip)
    recorder.mark([i], (dp[i] ?? 0) > (dp[i - 1] ?? 0) ? "sorted" : "active")
  }
  return recorder.finish(dpAlgorithms["house-robber"] as AlgorithmMeta)
}

export function jumpGame(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [2, 3, 1, 1, 4]
  const recorder = new ArrayTraceRecorder([...arr])
  let maxReach = 0
  for (let i = 0; i < arr.length; i++) {
    recorder.compareValue(i, 0, i, maxReach)
    if (i > maxReach) {
      recorder.mark([i], "active")
      break
    }
    const reach = i + (arr[i] ?? 0)
    if (reach > maxReach) {
      maxReach = reach
      recorder.mark([i], "sorted")
    } else {
      recorder.mark([i], "visited")
    }
  }
  return recorder.finish(dpAlgorithms["jump-game"] as AlgorithmMeta)
}

export function knapsack01(input: number[]): AlgorithmRun {
  // input: [w1,v1, w2,v2, ..., W] — pairs of weight/value, last element = capacity
  const arr = input.length >= 3 ? input : [2, 6, 2, 10, 3, 12, 5]
  const capacity = arr[arr.length - 1] ?? 5
  const items: Array<{ w: number; v: number }> = []
  for (let i = 0; i + 1 < arr.length - 1; i += 2) {
    items.push({ w: arr[i] ?? 1, v: arr[i + 1] ?? 1 })
  }
  if (items.length === 0) items.push({ w: 1, v: 1 })
  // Visualise dp[capacity+1] row
  const dpInit = new Array<number>(capacity + 1).fill(0)
  const recorder = new ArrayTraceRecorder(dpInit)
  for (const { w, v } of items) {
    for (let j = capacity; j >= w; j--) {
      const without = recorder.values[j] ?? 0
      const withItem = (recorder.values[j - w] ?? 0) + v
      recorder.compareValue(j, j - w, without, withItem)
      if (withItem > without) {
        recorder.write(j, withItem)
        recorder.mark([j], "sorted")
      } else {
        recorder.mark([j], "active")
      }
    }
  }
  return recorder.finish(dpAlgorithms["knapsack-01"] as AlgorithmMeta)
}

export function knapsackUnbounded(input: number[]): AlgorithmRun {
  const arr = input.length >= 3 ? input : [1, 1, 3, 4, 4, 5, 7]
  const capacity = arr[arr.length - 1] ?? 7
  const items: Array<{ w: number; v: number }> = []
  for (let i = 0; i + 1 < arr.length - 1; i += 2) {
    items.push({ w: arr[i] ?? 1, v: arr[i + 1] ?? 1 })
  }
  if (items.length === 0) items.push({ w: 1, v: 1 })
  const dpInit = new Array<number>(capacity + 1).fill(0)
  const recorder = new ArrayTraceRecorder(dpInit)
  for (let j = 1; j <= capacity; j++) {
    for (const { w, v } of items) {
      if (w <= j) {
        const candidate = (recorder.values[j - w] ?? 0) + v
        recorder.compareValue(j, j - w, recorder.values[j] ?? 0, candidate)
        if (candidate > (recorder.values[j] ?? 0)) {
          recorder.write(j, candidate)
          recorder.mark([j], "sorted")
        }
      }
    }
    recorder.mark([j], "active")
  }
  return recorder.finish(dpAlgorithms["knapsack-unbounded"] as AlgorithmMeta)
}

export function lcsRun(input: number[]): AlgorithmRun {
  // Encode two sequences A and B: input = [...A, -1, ...B]
  const sep = input.indexOf(-1)
  const A = sep > 0 ? input.slice(0, sep) : [1, 2, 3, 2, 1]
  const B = sep > 0 ? input.slice(sep + 1) : [3, 2, 1, 2]
  const m = A.length, n = B.length
  // Flatten dp[m+1][n+1] row by row into a 1-D array for visualisation
  const flat = new Array<number>((m + 1) * (n + 1)).fill(0)
  const recorder = new ArrayTraceRecorder(flat)
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const idx = i * (n + 1) + j
      if ((A[i - 1] ?? -1) === (B[j - 1] ?? -2)) {
        const diag = (i - 1) * (n + 1) + (j - 1)
        recorder.compareValue(idx, diag, A[i - 1] ?? 0, B[j - 1] ?? 0)
        recorder.write(idx, (recorder.values[diag] ?? 0) + 1)
        recorder.mark([idx], "sorted")
      } else {
        const up = (i - 1) * (n + 1) + j
        const left = i * (n + 1) + (j - 1)
        recorder.compare(up, left)
        const val = Math.max(recorder.values[up] ?? 0, recorder.values[left] ?? 0)
        recorder.write(idx, val)
        recorder.mark([idx], "active")
      }
    }
  }
  return recorder.finish(dpAlgorithms["lcs"] as AlgorithmMeta)
}

export function editDistance(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const A = sep > 0 ? input.slice(0, sep) : [1, 2, 3]
  const B = sep > 0 ? input.slice(sep + 1) : [1, 3, 4]
  const m = A.length, n = B.length
  const flat = new Array<number>((m + 1) * (n + 1)).fill(0)
  for (let i = 0; i <= m; i++) flat[i * (n + 1)] = i
  for (let j = 0; j <= n; j++) flat[j] = j
  const recorder = new ArrayTraceRecorder(flat)
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const idx = i * (n + 1) + j
      if ((A[i - 1] ?? -1) === (B[j - 1] ?? -2)) {
        const diag = (i - 1) * (n + 1) + (j - 1)
        recorder.compareValue(idx, diag, A[i - 1] ?? 0, B[j - 1] ?? 0)
        recorder.write(idx, recorder.values[diag] ?? 0)
        recorder.mark([idx], "sorted")
      } else {
        const del = (i - 1) * (n + 1) + j
        const ins = i * (n + 1) + (j - 1)
        const sub = (i - 1) * (n + 1) + (j - 1)
        recorder.compare(del, ins)
        const val = Math.min(recorder.values[del] ?? 0, recorder.values[ins] ?? 0, recorder.values[sub] ?? 0) + 1
        recorder.write(idx, val)
        recorder.mark([idx], "active")
      }
    }
  }
  return recorder.finish(dpAlgorithms["edit-distance"] as AlgorithmMeta)
}

export function uniquePaths(input: number[]): AlgorithmRun {
  const m = Math.max(2, Math.min(input[0] ?? 3, 8))
  const n = Math.max(2, Math.min(input[1] ?? 3, 8))
  const flat = new Array<number>(m * n).fill(1)
  const recorder = new ArrayTraceRecorder(flat)
  // initialise first row/col
  for (let i = 0; i < m; i++) recorder.mark([i * n], "sorted")
  for (let j = 0; j < n; j++) recorder.mark([j], "sorted")
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const idx = i * n + j
      const up = (i - 1) * n + j
      const left = i * n + (j - 1)
      recorder.compare(up, left)
      recorder.write(idx, (recorder.values[up] ?? 1) + (recorder.values[left] ?? 1))
      recorder.mark([idx], "active")
    }
  }
  return recorder.finish(dpAlgorithms["unique-paths"] as AlgorithmMeta)
}

export function triangleDP(input: number[]): AlgorithmRun {
  // input is a flat triangle: row 0 has 1 elem, row 1 has 2, etc.
  const arr = input.length > 0 ? input : [2, 3, 4, 6, 5, 7, 4, 1, 8, 3]
  const recorder = new ArrayTraceRecorder([...arr])
  // Find number of rows
  let rows = 0, idx = 0
  while (idx < arr.length) { rows++; idx += rows }
  // Bottom-up: start from second-to-last row
  let base = idx - rows // start of last row
  for (let r = rows - 2; r >= 0; r--) {
    base -= (r + 1)
    for (let c = 0; c <= r; c++) {
      const cur = base + c
      const left = base + (r + 1) + c
      const right = base + (r + 1) + c + 1
      recorder.compare(left, right)
      const best = (arr[left] ?? 0) < (arr[right] ?? 0) ? left : right
      recorder.mark([cur], "active")
      const newVal = (recorder.values[cur] ?? 0) + (recorder.values[best] ?? 0)
      recorder.write(cur, newVal)
      recorder.mark([cur], "sorted")
    }
  }
  return recorder.finish(dpAlgorithms["triangle"] as AlgorithmMeta)
}

export function minPathSum(input: number[]): AlgorithmRun {
  const m = Math.max(2, Math.min(input[0] ?? 3, 6))
  const n = Math.max(2, Math.min(input[1] ?? 3, 6))
  // Fill grid with remaining input values or sequential values
  const grid: number[] = []
  for (let i = 0; i < m * n; i++) grid.push(input[i + 2] ?? ((i % 5) + 1))
  const recorder = new ArrayTraceRecorder([...grid])
  // First row cumulative sum
  for (let j = 1; j < n; j++) {
    recorder.write(j, (recorder.values[j - 1] ?? 0) + (grid[j] ?? 0))
    recorder.mark([j], "sorted")
  }
  // First col cumulative sum
  for (let i = 1; i < m; i++) {
    recorder.write(i * n, (recorder.values[(i - 1) * n] ?? 0) + (grid[i * n] ?? 0))
    recorder.mark([i * n], "sorted")
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const idx = i * n + j
      const up = (i - 1) * n + j
      const left = i * n + (j - 1)
      recorder.compare(up, left)
      recorder.write(idx, Math.min(recorder.values[up] ?? 0, recorder.values[left] ?? 0) + (grid[idx] ?? 0))
      recorder.mark([idx], "active")
    }
  }
  return recorder.finish(dpAlgorithms["min-path-sum"] as AlgorithmMeta)
}

export function palindromeDP(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [1, 2, 3, 2, 1, 4, 2]
  const n = arr.length
  // dp[i][j] = 1 if arr[i..j] is palindrome, flatten
  const flat = new Array<number>(n * n).fill(0)
  // all length-1 substrings are palindromes
  for (let i = 0; i < n; i++) flat[i * n + i] = 1
  const recorder = new ArrayTraceRecorder(flat)
  for (let i = 0; i < n; i++) recorder.mark([i * n + i], "sorted")
  // length 2+
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      const idx = i * n + j
      recorder.compareValue(i, j, arr[i] ?? 0, arr[j] ?? 0)
      if ((arr[i] ?? -1) === (arr[j] ?? -2)) {
        const inner = len === 2 ? 1 : (flat[(i + 1) * n + (j - 1)] ?? 0)
        flat[idx] = inner
        recorder.write(idx, inner)
        recorder.mark([idx], inner ? "sorted" : "active")
      } else {
        flat[idx] = 0
        recorder.mark([idx], "active")
      }
    }
  }
  return recorder.finish(dpAlgorithms["palindrome-dp"] as AlgorithmMeta)
}

export function wordBreakDP(input: number[]): AlgorithmRun {
  // Treat input as char codes; visualise dp[0..n] reachability
  const arr = input.length > 0 ? input : [1, 2, 3, 1, 2, 4, 3]
  const n = arr.length
  const dpArr = new Array<number>(n + 1).fill(0)
  dpArr[0] = 1
  const recorder = new ArrayTraceRecorder(dpArr)
  recorder.mark([0], "sorted")
  // Use pairs of adjacent equal elements as "words"
  const words: number[][] = []
  for (let i = 0; i < n - 1; i++) words.push([arr[i] ?? 0, arr[i + 1] ?? 0])
  if (words.length === 0) words.push([arr[0] ?? 1])
  for (let i = 1; i <= n; i++) {
    for (const word of words) {
      const wl = word.length
      if (i >= wl && (recorder.values[i - wl] ?? 0) === 1) {
        // Check if arr[i-wl..i-1] === word
        const match = word.every((v, k) => (arr[i - wl + k] ?? -1) === v)
        recorder.compareValue(i, i - wl, i, i - wl)
        if (match) {
          recorder.write(i, 1)
          recorder.mark([i], "sorted")
          break
        }
      }
    }
    recorder.mark([i], recorder.values[i] ? "sorted" : "active")
  }
  return recorder.finish(dpAlgorithms["word-break"] as AlgorithmMeta)
}

export function matrixChain(input: number[]): AlgorithmRun {
  // input = dimensions [p0,p1,...,pn], matrix i has size p[i] x p[i+1]
  const dims = input.length >= 2 ? input : [10, 30, 5, 60]
  const n = dims.length - 1 // number of matrices
  if (n < 1) {
    const r = new ArrayTraceRecorder([0])
    return r.finish(dpAlgorithms["matrix-chain"] as AlgorithmMeta)
  }
  // dp[i][j] = min cost, flatten n x n
  const flat = new Array<number>(n * n).fill(0)
  const recorder = new ArrayTraceRecorder(flat)
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      let best = Infinity
      for (let k = i; k < j; k++) {
        const cost =
          (flat[i * n + k] ?? 0) +
          (flat[(k + 1) * n + j] ?? 0) +
          (dims[i] ?? 1) * (dims[k + 1] ?? 1) * (dims[j + 1] ?? 1)
        recorder.compareValue(i * n + k, (k + 1) * n + j, flat[i * n + k] ?? 0, flat[(k + 1) * n + j] ?? 0)
        if (cost < best) {
          best = cost
          flat[i * n + j] = best
          recorder.write(i * n + j, best)
          recorder.mark([i * n + j], "sorted")
        } else {
          recorder.mark([i * n + j], "active")
        }
      }
    }
  }
  return recorder.finish(dpAlgorithms["matrix-chain"] as AlgorithmMeta)
}

export function burstBalloons(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [3, 1, 5, 8]
  const balloons = [1, ...arr, 1]
  const n = balloons.length
  const flat = new Array<number>(n * n).fill(0)
  const recorder = new ArrayTraceRecorder(flat)
  for (let len = 2; len < n; len++) {
    for (let left = 0; left < n - len; left++) {
      const right = left + len
      for (let k = left + 1; k < right; k++) {
        const coins =
          (balloons[left] ?? 1) * (balloons[k] ?? 1) * (balloons[right] ?? 1) +
          (flat[left * n + k] ?? 0) +
          (flat[k * n + right] ?? 0)
        recorder.compareValue(left * n + k, k * n + right, flat[left * n + k] ?? 0, flat[k * n + right] ?? 0)
        if (coins > (flat[left * n + right] ?? 0)) {
          flat[left * n + right] = coins
          recorder.write(left * n + right, coins)
          recorder.mark([left * n + right], "sorted")
        } else {
          recorder.mark([left * n + right], "active")
        }
      }
    }
  }
  return recorder.finish(dpAlgorithms["burst-balloons"] as AlgorithmMeta)
}

export function treeDpDiameter(input: number[]): AlgorithmRun {
  // Encode tree as BFS level-order, visualise heights[] array
  const arr = input.length > 0 ? input : [1, 2, 3, 4, 5, 6, 7]
  const n = arr.length
  const heights = new Array<number>(n).fill(0)
  const recorder = new ArrayTraceRecorder(heights)
  // Simple iterative: process from leaves (right to left)
  for (let i = n - 1; i >= 0; i--) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    const lh = left < n ? (heights[left] ?? 0) : 0
    const rh = right < n ? (heights[right] ?? 0) : 0
    if (left < n) recorder.compareValue(left, i, lh, recorder.values[i] ?? 0)
    if (right < n) recorder.compareValue(right, i, rh, recorder.values[i] ?? 0)
    const h = Math.max(lh, rh) + 1
    recorder.write(i, h)
    recorder.mark([i], "active")
  }
  // Mark nodes on diameter path
  recorder.mark([0], "sorted")
  return recorder.finish(dpAlgorithms["tree-dp-diameter"] as AlgorithmMeta)
}

export function treeDpMaxPath(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [1, 2, 3, 4, 5, 6, 7]
  const n = arr.length
  const gains = new Array<number>(n).fill(0)
  const recorder = new ArrayTraceRecorder([...arr])
  for (let i = n - 1; i >= 0; i--) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    const lGain = left < n ? Math.max(0, gains[left] ?? 0) : 0
    const rGain = right < n ? Math.max(0, gains[right] ?? 0) : 0
    if (left < n) recorder.compareValue(left, i, lGain, arr[i] ?? 0)
    if (right < n) recorder.compareValue(right, i, rGain, arr[i] ?? 0)
    gains[i] = (arr[i] ?? 0) + Math.max(lGain, rGain)
    recorder.mark([i], "active")
  }
  recorder.mark([0], "sorted")
  return recorder.finish(dpAlgorithms["tree-dp-max-path"] as AlgorithmMeta)
}

// ─────────────────────────────────────────────
// Dispatch
// ─────────────────────────────────────────────

export function runDpAlgorithm(algorithmId: DpAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "fibonacci": {
      const n = input.length > 0 ? (input[0] as number) : 10
      return fibonacci(n)
    }
    case "climbing-stairs": {
      const n = input.length > 0 ? (input[0] as number) : 10
      return climbingStairs(n)
    }
    case "coin-change": {
      if (input.length < 2) {
        return coinChange([1, 5, 6, 9], 11)
      }
      const amount = input[input.length - 1] as number
      const coins = input.slice(0, input.length - 1)
      return coinChange(coins, amount)
    }
    case "max-subarray":
      return maxSubarray(input.length > 0 ? input : [-2, 1, -3, 4, -1, 2, 1, -5, 4])
    case "lis":
      return lis(input.length > 0 ? input : [10, 9, 2, 5, 3, 7, 101, 18])
    case "house-robber":
      return houseRobber(input.length > 0 ? input : [2, 7, 9, 3, 1])
    case "jump-game":
      return jumpGame(input.length > 0 ? input : [2, 3, 1, 1, 4])
    case "knapsack-01":
      return knapsack01(input.length > 0 ? input : [2, 6, 2, 10, 3, 12, 5])
    case "knapsack-unbounded":
      return knapsackUnbounded(input.length > 0 ? input : [1, 1, 3, 4, 4, 5, 7])
    case "lcs":
      return lcsRun(input.length > 0 ? input : [1, 2, 3, 2, 1, -1, 3, 2, 1, 2])
    case "edit-distance":
      return editDistance(input.length > 0 ? input : [1, 2, 3, -1, 1, 3, 4])
    case "unique-paths":
      return uniquePaths(input.length > 0 ? input : [3, 3])
    case "triangle":
      return triangleDP(input.length > 0 ? input : [2, 3, 4, 6, 5, 7, 4, 1, 8, 3])
    case "min-path-sum":
      return minPathSum(input.length > 0 ? input : [3, 3])
    case "palindrome-dp":
      return palindromeDP(input.length > 0 ? input : [1, 2, 3, 2, 1, 4, 2])
    case "word-break":
      return wordBreakDP(input.length > 0 ? input : [1, 2, 3, 1, 2, 4, 3])
    case "matrix-chain":
      return matrixChain(input.length > 0 ? input : [10, 30, 5, 60])
    case "burst-balloons":
      return burstBalloons(input.length > 0 ? input : [3, 1, 5, 8])
    case "tree-dp-diameter":
      return treeDpDiameter(input.length > 0 ? input : [1, 2, 3, 4, 5, 6, 7])
    case "tree-dp-max-path":
      return treeDpMaxPath(input.length > 0 ? input : [1, 2, 3, 4, 5, 6, 7])
    default:
      return houseRobber([2, 7, 9, 3, 1])
  }
}
