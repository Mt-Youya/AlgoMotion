import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Sudoku Solver",
  subtitle: "Fill a 9x9 Sudoku board so every row, column, and 3x3 box contains digits 1-9 exactly once.",
  category: "backtracking",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is the Sudoku Solver Problem?",
      bullets: [
        "Given a partially-filled 9×9 grid, place digits 1–9 in every empty cell so that no digit repeats in any row, column, or 3×3 sub-box.",
        "The board has 81 cells; a typical puzzle leaves 50–60 cells empty and provides 21–30 'given' clues.",
        "A valid Sudoku solution is unique — every well-formed puzzle has exactly one correct completion.",
        "The solver must respect three simultaneous constraint types: row uniqueness, column uniqueness, and box uniqueness.",
        "This is an NP-complete constraint-satisfaction problem (CSP); backtracking with pruning is the standard exact solver approach.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Backtracking is systematic trial-and-error: try a candidate digit, recurse, and undo if a contradiction is reached.",
        "The key insight is that placing a digit immediately reduces future choices — constraints propagate forward.",
        "Choosing the cell with the fewest legal candidates (Minimum Remaining Values heuristic) cuts the search tree dramatically.",
        "A conflict is detected early — the moment a cell has zero legal candidates — so dead branches are abandoned quickly.",
        "With good cell ordering and constraint propagation, most 9×9 puzzles are solved without a single backtrack.",
      ],
      analogy:
        "Think of solving a maze. At each junction you pick a direction. If you hit a dead end you backtrack to the last junction and try the next direction. Sudoku is the same: each empty cell is a junction, each candidate digit is a direction, and a constraint violation is a dead end.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start with the partially-filled board. Empty cells are represented as 0. Scan left-to-right, top-to-bottom for the first empty cell.",
        },
        {
          step: 2,
          description:
            "Found an empty cell at (row=0, col=1). Collect the set of digits already used in row 0, column 1, and the top-left 3×3 box.",
        },
        {
          step: 3,
          description:
            "Candidate digits for (0,1) = {1..9} minus used digits. Suppose used = {5, 3, 6, 1, 9, 8} → candidates = {2, 4, 7}.",
        },
        {
          step: 4,
          description:
            "Try candidate 2. Place 2 at (0,1) and recursively call solve(). The board now has one fewer empty cell.",
        },
        {
          step: 5,
          description:
            "Recursion continues: find next empty cell (0,3), compute its candidates, try the first one. Keep descending.",
        },
        {
          step: 6,
          description:
            "At some cell, all candidates are exhausted — no digit 1–9 is valid. This is a dead end. Return False to the caller.",
        },
        {
          step: 7,
          description:
            "The caller (previous recursion level) receives False. It removes the digit it placed (board[r][c] = 0) and tries the next candidate.",
        },
        {
          step: 8,
          description:
            "This undo-and-retry is the backtrack. The algorithm climbs back up the call stack until it finds a level with an untried candidate.",
        },
        {
          step: 9,
          description:
            "After backtracking, a new candidate is tried. Recursion descends again into new territory, filling more cells.",
        },
        {
          step: 10,
          description:
            "Eventually the recursion reaches a state where no empty cell remains. Every constraint is satisfied — the board is solved.",
        },
        {
          step: 11,
          description:
            "Return True all the way up the call stack. The board holds the unique solution in-place. The algorithm terminates.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def solve_sudoku(board: list[list[int]]) -> bool:
    """
    Solve a 9x9 Sudoku board in-place using backtracking.
    Empty cells are represented by 0.
    Returns True if a solution exists, False otherwise.
    """
    empty = find_empty(board)
    if empty is None:
        return True  # no empty cells → solved

    row, col = empty

    for num in range(1, 10):
        if is_valid(board, row, col, num):
            board[row][col] = num          # tentative placement

            if solve_sudoku(board):        # recurse
                return True

            board[row][col] = 0            # backtrack

    return False  # no valid digit found → trigger backtrack


def find_empty(board: list[list[int]]) -> tuple[int, int] | None:
    """Return (row, col) of the first empty cell, or None if full."""
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                return (r, c)
    return None


def is_valid(board: list[list[int]], row: int, col: int, num: int) -> bool:
    """Check if placing num at (row, col) violates any Sudoku constraint."""
    # Row check
    if num in board[row]:
        return False

    # Column check
    if num in [board[r][col] for r in range(9)]:
        return False

    # 3x3 box check
    box_r, box_c = 3 * (row // 3), 3 * (col // 3)
    for r in range(box_r, box_r + 3):
        for c in range(box_c, box_c + 3):
            if board[r][c] == num:
                return False

    return True
`,
      annotations: [
        {
          lines: [1, 2, 3, 4, 5],
          note: "The main solver modifies the board in-place. It returns a boolean so callers can detect unsolvable inputs.",
        },
        {
          lines: [6, 7, 8],
          note: "Base case: if find_empty returns None, all 81 cells are filled and every prior is_valid check passed — the puzzle is solved.",
        },
        {
          lines: [12, 13],
          note: "Tentative placement: write num into the cell before recursing. This is the 'choose' step of the backtracking template.",
        },
        {
          lines: [15, 16],
          note: "Recurse into the next empty cell. If the subtree yields a solution, propagate True upward immediately.",
        },
        {
          lines: [18],
          note: "Backtrack: erase the tentative digit by resetting to 0. This is the 'unchoose' step — the cell is empty again.",
        },
        {
          lines: [35, 36, 37, 38, 39, 40, 41, 42, 43],
          note: "is_valid checks all three constraint types in O(1) — each check scans at most 9 elements (one row, one column, one 3×3 box).",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(1)",
          explanation:
            "The puzzle is already solved or the first candidate tried at every cell is correct — no backtracking needed.",
        },
        {
          case: "Average",
          notation: "O(9^k)",
          explanation:
            "Where k is the number of empty cells. Constraint propagation keeps k effectively small, making most puzzles fast in practice.",
        },
        {
          case: "Worst",
          notation: "O(9^{81})",
          explanation:
            "Theoretical upper bound for a completely empty board with no pruning — never reached in practice due to early constraint violations.",
        },
      ],
      spaceRows: [
        {
          type: "Board",
          notation: "O(81) = O(1)",
          explanation: "The 9×9 board is fixed-size. Solving in-place requires no additional board copies.",
        },
        {
          type: "Call Stack",
          notation: "O(81)",
          explanation:
            "Recursion depth is at most 81 (one level per empty cell). Each frame stores only the current (row, col) and the loop variable.",
        },
      ],
      insights: [
        "In competitive benchmarks, naked backtracking solves 'easy' Sudoku in under 1 ms; 'hard' puzzles designed to defeat backtracking can take seconds.",
        "The Minimum Remaining Values (MRV) heuristic — always pick the cell with fewest candidates — reduces average solve time by an order of magnitude.",
        "Adding forward checking (remove a placed digit from all peers' candidate sets) turns most hard puzzles into near-trivial ones.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Naked Backtracking",
          description:
            "The baseline algorithm described here: scan for the first empty cell, try 1–9, recurse, backtrack. Simple to implement but slowest on hard inputs.",
        },
        {
          name: "MRV + Forward Checking",
          description:
            "Choose the cell with the fewest remaining candidates (MRV). After placing a digit, remove it from all peers' candidate sets. Detects dead ends before recursing.",
        },
        {
          name: "Arc Consistency (AC-3)",
          description:
            "Propagate constraints as a queue of arcs. Reduces candidate sets globally before any search begins, often solving easy puzzles without backtracking at all.",
        },
        {
          name: "Dancing Links (Algorithm X)",
          description:
            "Donald Knuth's exact-cover formulation. Models Sudoku as a sparse binary matrix and uses doubly-linked lists for O(1) cover/uncover operations — the fastest known exact solver.",
        },
        {
          name: "Stochastic / Simulated Annealing",
          description:
            "Fills the board randomly, then iteratively swaps digits to minimise constraint violations. Useful for generating puzzles or approximate solutions under time pressure.",
        },
      ],
      tips: [
        "Always validate the input first — an invalid puzzle (duplicate in a row/col/box) should return immediately without searching.",
        "Use a set-based candidate structure instead of calling is_valid on every digit: pre-compute row_used[r], col_used[c], and box_used[b] sets and update them incrementally.",
        "For puzzle generation, solve a blank board with randomised candidate order, then remove clues one by one while verifying the puzzle remains uniquely solvable.",
        "If you need the fastest possible solver in Python, consider using numpy for bitmasked constraint tracking or call a C extension like py-sudoku.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Sudoku Solver is a canonical backtracking problem: choose a cell, try a digit, recurse, and undo on failure.",
        "The three constraint types — row, column, and 3×3 box — are checked in O(1) each, making every placement decision fast.",
        "The worst-case complexity is O(9^81), but constraint propagation prunes the search tree so aggressively that real puzzles solve in milliseconds.",
        "Selecting the cell with the fewest legal candidates (MRV heuristic) is the single most impactful optimisation for hard puzzles.",
        "Sudoku maps directly to the Exact Cover problem, enabling highly efficient solvers based on Dancing Links (Algorithm X).",
        "The backtracking template — choose, recurse, unchoose — applies identically to N-Queens, Permutations, Combination Sum, and many other constraint-satisfaction problems.",
      ],
    },
  },
}

export default function SudokuSolverVideo() {
  return <AlgoVideo config={config} />
}
