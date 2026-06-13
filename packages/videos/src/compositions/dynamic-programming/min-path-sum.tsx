import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Minimum Path Sum",
  subtitle: "Path with minimum sum from top-left to bottom-right in a grid.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an m × n grid filled with non-negative integers, find a path from the top-left corner to the bottom-right corner.",
        "The path must minimize the sum of all numbers along the route.",
        "You can only move either right or down at any point in time.",
        "The grid contains non-negative integers, so every step adds to the total cost.",
        "Return the minimum possible sum for any valid path from (0,0) to (m-1, n-1).",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "At each cell, the cheapest way to arrive is from either the cell above or the cell to the left — whichever has the smaller accumulated cost.",
        "This optimal sub-structure means we can build the solution bottom-up without revisiting decisions.",
        "Define dp[r][c] as the minimum cost to reach cell (r, c). The recurrence is: dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]).",
        "The first row and first column are base cases — there is only one direction to reach them.",
        "The answer is simply dp[m-1][n-1] after filling the entire table.",
      ],
      analogy:
        "Think of navigating a city where each block has a toll. You can only drive east or south. At every intersection you choose the cheaper road that brought you there, and add the current toll. The DP table is your running record of the cheapest way to reach each intersection.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with input grid: [[1,3,1],[1,5,1],[4,2,1]]. We want the minimum-cost path from (0,0) to (2,2).",
        },
        {
          step: 2,
          description: "Create a dp table of the same dimensions, initialized to 0.",
        },
        {
          step: 3,
          description: "Base case — set dp[0][0] = grid[0][0] = 1. The cost of reaching the start is just its own value.",
        },
        {
          step: 4,
          description: "Fill the first row left-to-right: dp[0][1] = dp[0][0] + grid[0][1] = 1+3 = 4; dp[0][2] = 4+1 = 5. Only rightward moves are possible.",
        },
        {
          step: 5,
          description: "Fill the first column top-to-bottom: dp[1][0] = dp[0][0] + grid[1][0] = 1+1 = 2; dp[2][0] = 2+4 = 6. Only downward moves are possible.",
        },
        {
          step: 6,
          description: "Fill dp[1][1]: grid[1][1]=5, min(dp[0][1], dp[1][0]) = min(4,2) = 2, so dp[1][1] = 5+2 = 7.",
        },
        {
          step: 7,
          description: "Fill dp[1][2]: grid[1][2]=1, min(dp[0][2], dp[1][1]) = min(5,7) = 5, so dp[1][2] = 1+5 = 6.",
        },
        {
          step: 8,
          description: "Fill dp[2][1]: grid[2][1]=2, min(dp[1][1], dp[2][0]) = min(7,6) = 6, so dp[2][1] = 2+6 = 8.",
        },
        {
          step: 9,
          description: "Fill dp[2][2]: grid[2][2]=1, min(dp[1][2], dp[2][1]) = min(6,8) = 6, so dp[2][2] = 1+6 = 7.",
        },
        {
          step: 10,
          description: "The answer is dp[2][2] = 7. The optimal path is (0,0)→(0,1)→... wait, let's trace back: dp[2][2]=7 came from dp[1][2]=6, which came from dp[0][2]=5, which came from dp[0][1]=4, which came from dp[0][0]=1. Path: right→right→down→down.",
        },
        {
          step: 11,
          description: "Space optimization: we can reduce memory to O(n) by keeping only one row of the dp array and updating it in-place as we iterate through each row.",
        },
        {
          step: 12,
          description: "Final result: minimum path sum = 7, achieved via the path 1→3→1→1→1.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `def minPathSum(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])

    # Initialize dp table with same dimensions
    dp = [[0] * n for _ in range(m)]

    # Base case: top-left cell
    dp[0][0] = grid[0][0]

    # Fill first row (can only come from the left)
    for c in range(1, n):
        dp[0][c] = dp[0][c - 1] + grid[0][c]

    # Fill first column (can only come from above)
    for r in range(1, m):
        dp[r][0] = dp[r - 1][0] + grid[r][0]

    # Fill the rest of the table
    for r in range(1, m):
        for c in range(1, n):
            dp[r][c] = grid[r][c] + min(dp[r - 1][c], dp[r][c - 1])

    return dp[m - 1][n - 1]


# Space-optimized version using O(n) extra space
def minPathSumOptimized(grid: list[list[int]]) -> int:
    m, n = len(grid), len(grid[0])
    dp = list(grid[0])  # copy first row

    # Prefix sum for first row
    for c in range(1, n):
        dp[c] += dp[c - 1]

    for r in range(1, m):
        dp[0] += grid[r][0]  # first column: only from above
        for c in range(1, n):
            dp[c] = grid[r][c] + min(dp[c], dp[c - 1])

    return dp[n - 1]`,
      annotations: [
        {
          lines: [1, 2],
          note: "Extract grid dimensions. m is the number of rows, n is the number of columns.",
        },
        {
          lines: [5],
          note: "Allocate the DP table. Each dp[r][c] will store the minimum cost to reach that cell.",
        },
        {
          lines: [8, 11],
          note: "Base cases: the first row can only be reached by moving right, and the first column only by moving down.",
        },
        {
          lines: [14, 17],
          note: "Core recurrence: the cheapest path to (r,c) is the cell value plus the cheaper of the two possible predecessors.",
        },
        {
          lines: [19],
          note: "The bottom-right cell holds the answer after the table is fully populated.",
        },
        {
          lines: [23, 33],
          note: "Space-optimized variant: reuse a single 1D array. dp[c] represents the minimum cost to reach the current row at column c.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(m × n)", note: "Must visit every cell at least once" },
        { case: "Average", complexity: "O(m × n)", note: "No early exit; all cells filled" },
        { case: "Worst", complexity: "O(m × n)", note: "Same regardless of grid values" },
      ],
      spaceRows: [
        { case: "2D DP table", complexity: "O(m × n)", note: "Stores cost for every cell" },
        { case: "1D optimized", complexity: "O(n)", note: "Only one row of dp values kept" },
      ],
      insights: [
        "The 2D DP approach is straightforward and easy to trace back the optimal path.",
        "The 1D optimization halves memory usage for large grids and is preferred in production.",
        "Because moves are only right or down, the problem has no cycles, making DP safe without memoization guards.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Unique Paths",
          description: "Count the number of distinct paths from top-left to bottom-right (no weights), using the same right/down movement constraint.",
        },
        {
          name: "Unique Paths II",
          description: "Same as Unique Paths but some cells are blocked by obstacles; skip those cells in the DP recurrence.",
        },
        {
          name: "Triangle Minimum Path Sum",
          description: "Given a triangle array, find the minimum path sum from top to bottom, where each step moves to an adjacent number in the row below.",
        },
        {
          name: "Dungeon Game",
          description: "The knight must maintain health > 0 at all times; fill the DP table from bottom-right to top-left to find the minimum initial health needed.",
        },
        {
          name: "Cherry Pickup",
          description: "Two traversals of the same grid (down-right then up-left) to maximize cherries collected — a harder variant requiring simultaneous path DP.",
        },
      ],
      tips: [
        "Always handle the first row and first column as base cases before filling the interior — they have only one valid predecessor each.",
        "To reconstruct the actual path, store the dp table and backtrack from (m-1, n-1): at each cell, move to whichever neighbor has the smaller dp value.",
        "The 1D space optimization works because each row only depends on the row above and the current row processed left-to-right.",
        "For very large grids where even O(n) is tight, consider processing column-by-column and keeping a column-sized array instead.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Minimum Path Sum is a classic bottom-up DP problem where each cell's optimal cost depends only on its top and left neighbors.",
        "The recurrence dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1]) encodes the greedy choice at every step.",
        "Base cases (first row and first column) must be initialized separately because they have only one reachable predecessor direction.",
        "Time complexity is O(m × n) and cannot be improved — every cell must be evaluated exactly once.",
        "Space can be reduced from O(m × n) to O(n) by reusing a single 1D array, updating it in-place row by row.",
        "The same DP pattern generalizes to many grid traversal problems: Unique Paths, Dungeon Game, and Cherry Pickup all share this structure.",
      ],
    },
  },
};

export default function MinPathSumVideo() {
  return <AlgoVideo config={config} />;
}
