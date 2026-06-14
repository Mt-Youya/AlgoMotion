import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "N-Queens",
  subtitle: "Place N queens on an NxN chessboard so no two threaten each other.",
  category: "backtracking",
  difficulty: "advanced",
  chapters: {
    problem: {
      heading: "Place N Queens Without Conflict",
      body: [
        "Given an N×N chessboard, place exactly N queens such that no two queens attack each other.",
        "A queen attacks along its row, column, and both diagonals — any cell reachable in a straight line.",
        "For N=4 there are 2 distinct solutions; for N=8 there are 92 solutions.",
        "The problem is a classic constraint-satisfaction problem used to benchmark backtracking.",
        "Naive brute-force places queens in all N^N positions; smart backtracking prunes invalid branches early.",
      ],
      callout: "N-Queens is the canonical example for understanding backtracking: try, check, undo, retry.",
    },
    intuition: {
      heading: "Try, Fail Fast, Backtrack",
      body: [
        "Process the board one row at a time — place one queen per row, choosing a safe column.",
        "Before placing, check: does any previously placed queen share a column or diagonal?",
        "If no safe column exists in the current row, backtrack to the previous row and try the next column.",
        "Backtracking prunes entire subtrees: once a partial placement is invalid, skip all its extensions.",
        "The recursion depth is always N, and at each level we try at most N columns — giving O(N!) worst case with heavy pruning.",
      ],
      analogy:
        "Think of it like solving a Sudoku row by row: if you get stuck, erase the last entry and try the next option — never restart from scratch.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initialize empty board",
          description:
            "Create a 1D array `board` of size N where board[row] = col stores the column of the queen in each row. Start with all values -1 (empty).",
        },
        {
          label: "Row 0 — Try column 0",
          description:
            "Place the first queen at (row=0, col=0). No previous queens exist, so the placement is trivially safe. Recurse to row 1.",
        },
        {
          label: "Row 1 — Column 0 blocked (same col), Column 1 blocked (diagonal)",
          description:
            "Column 0 is in the same column as row 0's queen. Column 1 is on the main diagonal (|row diff| == |col diff| = 1). Both rejected.",
        },
        {
          label: "Row 1 — Place at column 2",
          description:
            "Column 2 passes both checks: not column 0, and |1-0| = 1 ≠ |2-0| = 2. Queen placed at (1, 2). Recurse to row 2.",
        },
        {
          label: "Row 2 — All columns blocked",
          description:
            "With queens at (0,0) and (1,2), every column in row 2 is either in the same column or on a diagonal. No valid placement exists.",
        },
        {
          label: "Backtrack to row 1 — Try column 3",
          description:
            "Remove the queen from (1,2). Try col 3: not col 0, and |1-0|=1 ≠ |3-0|=3. Place queen at (1,3). Recurse to row 2.",
        },
        {
          label: "Row 2 — Place at column 1",
          description:
            "With queens at (0,0) and (1,3): col 1 is not 0 or 3, and diagonals check out. Place queen at (2,1). Recurse to row 3.",
        },
        {
          label: "Row 3 — Place at column 2 (blocked), try column 3 (blocked)",
          description:
            "Col 2 is on a diagonal from (2,1). Col 3 is same column as (1,3). Both fail. Backtrack further.",
        },
        {
          label: "Continue backtracking until row 0 col 1",
          description:
            "After exhausting all branches from (0,0), backtrack to row 0 and try col 1. This opens up a new search subtree.",
        },
        {
          label: "First solution: (0,1), (1,3), (2,0), (3,2)",
          description:
            "Queens placed at columns [1, 3, 0, 2] for rows 0–3. Verify: no shared columns or diagonals. This is the first valid solution.",
        },
        {
          label: "Second solution: (0,2), (1,0), (2,3), (3,1)",
          description:
            "Continuing the search finds a second solution: columns [2, 0, 3, 1]. For N=4, the algorithm terminates with exactly 2 solutions.",
        },
        {
          label: "Collect all solutions",
          description:
            "The algorithm can be configured to return the first solution (stop early) or all solutions (continue after each find). Both share the same backtracking skeleton.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def solve_n_queens(n: int) -> list[list[str]]:
    results = []
    board = [-1] * n  # board[row] = col

    def is_safe(row: int, col: int) -> bool:
        for r in range(row):
            c = board[r]
            if c == col:
                return False          # same column
            if abs(r - row) == abs(c - col):
                return False          # same diagonal
        return True

    def backtrack(row: int) -> None:
        if row == n:
            # Build the board representation
            solution = []
            for r in range(n):
                row_str = "." * board[r] + "Q" + "." * (n - board[r] - 1)
                solution.append(row_str)
            results.append(solution)
            return
        for col in range(n):
            if is_safe(row, col):
                board[row] = col
                backtrack(row + 1)
                board[row] = -1   # undo (backtrack)

    backtrack(0)
    return results`,
      annotations: [
        {
          lines: [1, 2, 3],
          note: "`board` is a 1D array where `board[row] = col`. This is more memory-efficient than a 2D grid and makes diagonal checks O(1).",
        },
        {
          lines: [5, 6, 7, 8, 9, 10, 11],
          note: "`is_safe` checks every previously placed queen. Two queens share a diagonal when |row diff| equals |col diff| — no need to store diagonal sets explicitly.",
        },
        {
          lines: [13, 14, 15, 16, 17, 18, 19],
          note: "Base case: when `row == n`, all N queens have been placed. Build the string representation and record the solution.",
        },
        {
          lines: [20, 21, 22, 23, 24],
          note: "The core loop: try each column, recurse if safe, then **undo** the placement (`board[row] = -1`). This 'undo' is what makes it backtracking.",
        },
        {
          lines: [26],
          note: "Entry point: start placing from row 0. The recursion depth is exactly N, and each level branches at most N times.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(N!)", color: "#CEEB5A" },
        { label: "Average case", value: "O(N!)", color: "#2255CC" },
        { label: "Worst case", value: "O(N!)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Recursion stack", value: "O(N)", color: "#2255CC" },
        { label: "Board array", value: "O(N)", color: "#888899" },
        { label: "All solutions output", value: "O(N² · S)", color: "#888899" },
      ],
      notes: [
        "O(N!) is an upper bound — backtracking prunes invalid branches, so the actual number of nodes visited is far less than N!.",
        "In practice, for N=8 the algorithm visits ~15,000 nodes versus 8! = 40,320 brute-force positions.",
        "S in the space complexity is the number of solutions (e.g., S=92 for N=8), only relevant when collecting all solutions.",
      ],
    },
    variations: {
      items: [
        "N-Queens II — count the number of distinct solutions instead of enumerating them (LeetCode 52).",
        "Bit-manipulation N-Queens — use three integers (cols, diag1, diag2) as bitmasks to check safety in O(1) per step, dramatically speeding up large N.",
        "N-Rooks — simpler variant: place N rooks with no shared row or column (equivalent to finding a permutation).",
        "N-Queens with forbidden cells — some cells are pre-blocked; add an extra check in `is_safe`.",
        "Toroidal N-Queens — queens wrap around the board edges, creating a fundamentally different constraint structure.",
      ],
      tips: [
        "Use bitmasks for columns and diagonals to reduce `is_safe` from O(N) to O(1) — critical for N > 12.",
        "To find only the first solution, return True from `backtrack` immediately after the base case and propagate upward.",
        "Symmetry pruning: the first queen only needs to try columns 0 through N/2; mirror solutions cover the rest, halving the search space.",
        "For counting solutions (not enumerating), memoization is not helpful here — each state is visited at most once in the DFS tree.",
      ],
    },
    summary: {
      keyPoints: [
        "N-Queens is the textbook backtracking problem: place incrementally, check constraints, undo on failure.",
        "Represent the board as a 1D array `board[row] = col` — enables O(N) safety checks without extra data structures.",
        "The key insight: process one row at a time, so each partial state is guaranteed to have exactly one queen per row.",
        "Diagonal safety: |row₁ - row₂| == |col₁ - col₂| — a single arithmetic check replaces two separate diagonal sets.",
        "Time complexity O(N!) is a loose upper bound; pruning makes real performance much better, especially for large N.",
        "The bitmask optimization reduces per-node work from O(N) to O(1), enabling solutions for N up to ~20 in milliseconds.",
      ],
    },
  },
}

export default function NQueensVideo() {
  return <AlgoVideo config={config} />
}
