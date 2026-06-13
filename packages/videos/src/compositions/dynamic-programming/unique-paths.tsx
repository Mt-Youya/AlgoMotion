import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Unique Paths",
  subtitle: "Count unique paths from top-left to bottom-right in a grid.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "You are given an m × n grid. A robot starts at the top-left corner (0, 0) and must reach the bottom-right corner (m-1, n-1).",
        "The robot can only move right or down at each step — no diagonal, left, or up moves are allowed.",
        "Count the total number of distinct paths from the start to the destination.",
        "For a 3 × 7 grid the answer is 28; for a 3 × 3 grid the answer is 6.",
        "Constraints: 1 ≤ m, n ≤ 100. The answer fits in a 32-bit integer for all valid inputs.",
      ],
    },
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Every cell (r, c) can only be reached from the cell directly above it (r-1, c) or the cell directly to its left (r, c-1).",
        "Therefore the number of paths to (r, c) equals the sum of paths to those two predecessors.",
        "The entire first row and first column each have exactly 1 path — there is only one way to travel along a single edge.",
        "This overlapping-subproblem structure is the hallmark of dynamic programming: solve small cells first, reuse their answers.",
        "Analogy: imagine counting how many ways you can descend a staircase that branches both right and down — each step's count is simply the sum of the two steps that feed into it.",
      ],
      analogy:
        "Think of water flowing from the top-left corner. At each cell the water splits into two streams — one going right, one going down. The total flow arriving at the bottom-right is the answer.",
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough (3 × 4 grid)",
      steps: [
        {
          step: 1,
          description: "Create a dp table of size 3 × 4, initialized to 0.",
        },
        {
          step: 2,
          description:
            "Fill the entire first row with 1s: dp[0][0..3] = [1, 1, 1, 1]. There is exactly one way to reach any cell in the top row — travel straight right.",
        },
        {
          step: 3,
          description:
            "Fill the entire first column with 1s: dp[0..2][0] = [1, 1, 1]. There is exactly one way to reach any cell in the leftmost column — travel straight down.",
        },
        {
          step: 4,
          description:
            "Process cell (1, 1): dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2.",
        },
        {
          step: 5,
          description:
            "Process cell (1, 2): dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3.",
        },
        {
          step: 6,
          description:
            "Process cell (1, 3): dp[1][3] = dp[0][3] + dp[1][2] = 1 + 3 = 4.",
        },
        {
          step: 7,
          description:
            "Process cell (2, 1): dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3.",
        },
        {
          step: 8,
          description:
            "Process cell (2, 2): dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6.",
        },
        {
          step: 9,
          description:
            "Process cell (2, 3): dp[2][3] = dp[1][3] + dp[2][2] = 4 + 6 = 10.",
        },
        {
          step: 10,
          description:
            "The answer is dp[m-1][n-1] = dp[2][3] = 10. There are 10 unique paths in a 3 × 4 grid.",
        },
        {
          step: 11,
          description:
            "Space optimization: we only ever read the previous row, so a single 1-D array of length n suffices. Update in-place: dp[c] += dp[c-1].",
        },
        {
          step: 12,
          description:
            "Mathematical shortcut: the answer equals C(m+n-2, m-1) — the number of ways to choose which (m-1) of the (m+n-2) total steps are 'down' moves.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `def unique_paths(m: int, n: int) -> int:
    \"\"\"
    Count unique paths in an m x n grid using 1-D DP.
    Time:  O(m * n)
    Space: O(n)
    \"\"\"
    # A single row, all ones (base case: top row)
    dp = [1] * n

    # Fill rows 1 through m-1
    for row in range(1, m):
        # col 0 stays 1 (only one way to reach any cell in col 0)
        for col in range(1, n):
            # paths to (row, col) = paths from above + paths from left
            dp[col] += dp[col - 1]

    return dp[n - 1]


# ── Alternative: combinatorial O(min(m,n)) solution ──────────────────
from math import comb

def unique_paths_math(m: int, n: int) -> int:
    \"\"\"
    C(m+n-2, m-1) — choose which steps are 'down' moves.
    Time:  O(min(m, n))
    Space: O(1)
    \"\"\"
    return comb(m + n - 2, m - 1)


# ── Quick smoke test ──────────────────────────────────────────────────
assert unique_paths(3, 7) == 28
assert unique_paths(3, 3) == 6
assert unique_paths(1, 1) == 1
assert unique_paths_math(3, 7) == 28
`,
      annotations: [
        {
          lines: "2-7",
          note: "Function signature and docstring. The 1-D DP approach uses O(n) space by reusing a single array across rows.",
        },
        {
          lines: "9",
          note: "Initialize dp to all 1s — the first row has exactly one path to each cell (move right repeatedly).",
        },
        {
          lines: "12-16",
          note: "Outer loop iterates over rows 1..m-1. The first column is implicitly kept at 1 because we only update col ≥ 1.",
        },
        {
          lines: "15-16",
          note: "dp[col] currently holds paths from the row above; dp[col-1] holds paths from the left in the current row. Their sum is the new value.",
        },
        {
          lines: "21-27",
          note: "The combinatorial formula C(m+n-2, m-1) solves the problem in O(min(m,n)) time with O(1) space — useful when m and n are very large.",
        },
        {
          lines: "30-33",
          note: "Assertions verify both implementations agree on known test cases including the edge case of a 1×1 grid (answer = 1).",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Complexity Analysis",
      time: [
        { case: "Best", notation: "O(m × n)", note: "All cells must be visited regardless of input" },
        { case: "Average", notation: "O(m × n)", note: "No early-exit is possible; every cell contributes" },
        { case: "Worst", notation: "O(m × n)", note: "Maximum grid size m = n = 100 → 10 000 operations" },
      ],
      space: [
        { label: "2-D DP table", notation: "O(m × n)", note: "Stores the full table" },
        { label: "1-D DP array (optimized)", notation: "O(n)", note: "Only one row kept in memory" },
        { label: "Combinatorial formula", notation: "O(1)", note: "No table needed at all" },
      ],
      insights: [
        "The 1-D optimization works because dp[r][c] depends only on the current row's left neighbor and the previous row's same column — both available in a single array updated left-to-right.",
        "For very large grids (m, n up to 10^9) the combinatorial approach with Python's arbitrary-precision integers is the only practical solution.",
        "Memoized recursion has the same asymptotic complexity as the iterative approach but incurs call-stack overhead; prefer iteration for this problem.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Unique Paths II (with obstacles)",
          description:
            "Some cells are blocked. Set dp[r][c] = 0 for obstacle cells; the recurrence is otherwise identical. LeetCode 63.",
        },
        {
          name: "Minimum Path Sum",
          description:
            "Each cell has a cost. Find the path from top-left to bottom-right with the minimum total cost. dp[r][c] = cell[r][c] + min(dp[r-1][c], dp[r][c-1]). LeetCode 64.",
        },
        {
          name: "Dungeon Game",
          description:
            "Each cell has a health delta (positive or negative). Find the minimum initial health needed to reach the bottom-right alive. Solved with reverse DP from bottom-right. LeetCode 174.",
        },
        {
          name: "Unique Paths III",
          description:
            "Must visit every non-obstacle cell exactly once. Requires backtracking / bitmask DP because the state space explodes. LeetCode 980.",
        },
        {
          name: "Count paths in a DAG",
          description:
            "Generalize to any directed acyclic graph: topological sort + DP. Unique Paths is a special case where the DAG is a rectangular grid.",
        },
      ],
      tips: [
        "Always initialize the first row and first column to 1 before filling the interior — forgetting this is the most common bug.",
        "When obstacles are present, initialize the first row/column carefully: once you hit an obstacle, all subsequent cells in that row/column are also 0.",
        "The combinatorial formula comb(m+n-2, m-1) is elegant but can overflow in languages without big integers; use Python or apply modular arithmetic as needed.",
        "For interview settings, start with the 2-D DP to prove correctness, then mention the 1-D optimization to show awareness of space efficiency.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Unique Paths is a foundational DP problem: the recurrence dp[r][c] = dp[r-1][c] + dp[r][c-1] captures the exclusive right/down movement constraint.",
        "Base cases (first row and column = 1) are critical; the recurrence is meaningless without them.",
        "The 1-D space optimization reduces memory from O(m × n) to O(n) by processing the table row by row and updating in place.",
        "A closed-form combinatorial solution C(m+n-2, m-1) exists and runs in O(min(m,n)) time with O(1) space.",
        "Understanding this problem unlocks a family of grid DP problems: Unique Paths II, Minimum Path Sum, Dungeon Game, and more.",
        "The pattern — 'value at a cell equals sum of values of cells that can reach it' — recurs throughout competitive programming and real-world routing problems.",
      ],
    },
  ],
};

export default function UniquePathsVideo() {
  return <AlgoVideo config={config} />;
}
