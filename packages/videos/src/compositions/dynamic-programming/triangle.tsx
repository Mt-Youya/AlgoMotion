import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Triangle",
  subtitle: "Find minimum path sum from top to bottom of a triangle.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a triangle array, find the minimum path sum from top to bottom.",
        "Each row has one more element than the previous row, forming a triangular shape.",
        "At each step you may only move to adjacent numbers in the row directly below.",
        "Adjacent means: from position (r, c) you can go to (r+1, c) or (r+1, c+1).",
        "Return the minimum sum of any path from the apex (row 0) to the base (last row).",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Work bottom-up: the minimum cost to reach any cell equals the cell's value plus the cheaper of its two children.",
        "After processing all rows upward, dp[0][0] holds the global minimum path sum.",
        "This avoids recomputing overlapping sub-paths that a naive DFS would revisit.",
        "A 1D dp array of size (bottom row length) is sufficient — we only ever look one row ahead.",
        "The recurrence dp[c] = triangle[r][c] + min(dp[c], dp[c+1]) updates in-place left to right.",
      ],
      analogy:
        "Imagine water flowing down a mountain. At each ledge the water always chooses the lower of the two paths below. Starting from the base and labelling each ledge with the cheapest total descent, the summit's label is the answer — no water needs to flow twice.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Input triangle: [[2],[3,4],[6,5,7],[4,1,8,3]]",
          detail: "Four rows with 1, 2, 3, and 4 elements respectively.",
        },
        {
          step: 2,
          description: "Initialize dp = [4, 1, 8, 3] (copy of last row)",
          detail: "The base cases are the triangle values themselves — no choices to make at the bottom.",
        },
        {
          step: 3,
          description: "Process row 2: [6, 5, 7]",
          detail:
            "col=0: dp[0] = 6 + min(4,1) = 7. col=1: dp[1] = 5 + min(1,8) = 6. col=2: dp[2] = 7 + min(8,3) = 10. dp = [7, 6, 10, 3].",
        },
        {
          step: 4,
          description: "Process row 1: [3, 4]",
          detail: "col=0: dp[0] = 3 + min(7,6) = 9. col=1: dp[1] = 4 + min(6,10) = 10. dp = [9, 10, 10, 3].",
        },
        {
          step: 5,
          description: "Process row 0: [2]",
          detail: "col=0: dp[0] = 2 + min(9,10) = 11. dp = [11, 10, 10, 3].",
        },
        {
          step: 6,
          description: "Return dp[0] = 11",
          detail: "The minimum path sum from apex to base is 11.",
        },
        {
          step: 7,
          description: "Trace the optimal path: 2 → 3 → 5 → 1",
          detail:
            "At each row, follow the child with the smaller dp value: row0→(0,0)=2, row1→(1,0)=3, row2→(2,1)=5, row3→(3,1)=1. Sum = 11.",
        },
        {
          step: 8,
          description: "Verify: 2 + 3 + 5 + 1 = 11",
          detail:
            "All adjacency constraints are satisfied: (0,0)→(1,0)→(2,1)→(3,1) follows the rule (r,c)→(r+1,c) or (r+1,c+1).",
        },
        {
          step: 9,
          description: "Compare with naive top-down DFS",
          detail:
            "A brute-force DFS would explore 2^(n-1) paths for n rows. DP reduces this to O(n²) by caching sub-path costs.",
        },
        {
          step: 10,
          description: "Space optimization confirmed",
          detail: "The 1D dp array is updated in-place left to right within each row, requiring only O(n) extra space.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from typing import List

class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        n = len(triangle)

        # Initialize dp with a copy of the last row
        # We process bottom-up so we never need rows below current
        dp = triangle[n - 1][:]

        # Fill dp from second-to-last row up to the apex
        for row in range(n - 2, -1, -1):
            for col in range(len(triangle[row])):
                # Choose the cheaper of the two children
                dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])

        # dp[0] now holds the minimum path sum from apex to base
        return dp[0]

    def minimumTotal_2d(self, triangle: List[List[int]]) -> int:
        """Explicit 2D DP version for clarity."""
        n = len(triangle)
        # dp[r][c] = min path sum from (r,c) to the bottom
        dp = [row[:] for row in triangle]

        for r in range(n - 2, -1, -1):
            for c in range(len(triangle[r])):
                dp[r][c] = triangle[r][c] + min(dp[r + 1][c], dp[r + 1][c + 1])

        return dp[0][0]

    def minimumTotal_memo(self, triangle: List[List[int]]) -> int:
        """Top-down memoised recursion."""
        from functools import lru_cache

        @lru_cache(maxsize=None)
        def dfs(r: int, c: int) -> int:
            if r == len(triangle) - 1:
                return triangle[r][c]
            return triangle[r][c] + min(dfs(r + 1, c), dfs(r + 1, c + 1))

        return dfs(0, 0)`,
      annotations: [
        {
          lines: "7",
          note: "Copy the last row as the initial dp state — these are the base cases where no further choices exist.",
        },
        {
          lines: "10-13",
          note: "Outer loop walks rows from second-to-last up to row 0, filling dp in reverse order.",
        },
        {
          lines: "12-13",
          note: "Core recurrence: dp[col] = current cell value + min of the two children below. Overwrites left to right safely because dp[col+1] is still the old (lower-row) value at this point.",
        },
        {
          lines: "16",
          note: "After all rows are processed, dp[0] is the minimum total path sum starting from the apex.",
        },
        {
          lines: "19-26",
          note: "2D version is easier to reason about in interviews; uses O(n²) space but identical logic.",
        },
        {
          lines: "29-36",
          note: "Top-down memoised DFS is equally correct; lru_cache stores up to n*(n+1)/2 sub-problem results, giving O(n²) time and space.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      timeRows: [
        {
          case: "Best",
          notation: "O(n²)",
          note: "Every cell in the triangle must be visited once; n rows with up to n cells each.",
        },
        {
          case: "Average",
          notation: "O(n²)",
          note: "No branching or early exit — always processes all n*(n+1)/2 cells.",
        },
        {
          case: "Worst",
          notation: "O(n²)",
          note: "Same as best and average; the triangle structure fixes the number of operations.",
        },
      ],
      spaceRows: [
        {
          label: "1D dp array (optimised)",
          notation: "O(n)",
          note: "Only the bottom row length (= n) of extra space is needed.",
        },
        {
          label: "2D dp table",
          notation: "O(n²)",
          note: "Stores a full copy of the triangle; useful for path reconstruction.",
        },
        {
          label: "Recursion stack (memoised)",
          notation: "O(n)",
          note: "Depth of the call stack equals the number of rows n.",
        },
      ],
      insights: [
        "The 1D bottom-up solution is optimal in both time and space — O(n²) time, O(n) space.",
        "In-place modification of the input triangle achieves O(1) extra space if mutation is allowed.",
        "Top-down memoisation is elegant but adds O(n) stack depth; prefer iteration for large inputs.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "In-Place Modification",
          description:
            "Modify the triangle array directly instead of allocating a dp array. This reduces extra space to O(1) at the cost of mutating the input.",
        },
        {
          name: "Maximum Path Sum",
          description:
            "Replace min with max in the recurrence to find the maximum path sum instead. The structure and complexity are identical.",
        },
        {
          name: "Top-Down Traversal",
          description:
            "Fill dp from the apex downward: dp[r][c] = triangle[r][c] + min(dp[r-1][c-1], dp[r-1][c]). Requires careful boundary handling for the leftmost and rightmost columns.",
        },
        {
          name: "Path Reconstruction",
          description:
            "Store a choice array alongside dp to record which child was chosen at each cell, then trace back from dp[0][0] to recover the actual minimum-cost path.",
        },
        {
          name: "Weighted Triangle (General DAG)",
          description:
            "Generalise to any directed acyclic graph where each node connects to two successors. The same bottom-up DP applies; the triangle is just a special case of a DAG shortest-path problem.",
        },
      ],
      tips: [
        "Always start with the 2D DP solution in interviews for clarity, then optimise to 1D.",
        "Be careful with the in-place approach — confirm with the interviewer that mutating the input is acceptable.",
        "The bottom-up direction avoids boundary checks needed in the top-down variant (no out-of-bounds for leftmost/rightmost columns).",
        "Recognise that this is equivalent to finding the shortest path in a DAG — the same pattern applies to grid DP problems like Minimum Path Sum (LeetCode 64).",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Triangle is a classic bottom-up DP problem: fill from the base, propagate minimums upward to the apex.",
        "The recurrence dp[c] = triangle[r][c] + min(dp[c], dp[c+1]) is simple and runs in O(n²) time.",
        "A 1D dp array of length n (bottom row size) is sufficient, giving O(n) space.",
        "In-place modification of the input achieves O(1) extra space if mutation is permitted.",
        "Top-down memoised DFS is an equally valid approach but adds O(n) call-stack depth.",
        "This problem is structurally identical to shortest-path in a layered DAG — the same technique generalises to grid DP and tree DP problems.",
      ],
    },
  },
}

export default function TriangleVideo() {
  return <AlgoVideo config={config} />
}
