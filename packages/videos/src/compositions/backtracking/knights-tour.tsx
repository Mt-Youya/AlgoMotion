import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Knight's Tour",
  subtitle: "Find moves for a chess knight to visit every square exactly once.",
  category: "backtracking",
  difficulty: "expert",

  chapters: {
    problem: {
      heading: "What is the Knight's Tour?",
      bullets: [
        "Given an N×N chessboard, find a sequence of moves for a chess knight such that it visits every square on the board exactly once.",
        "A chess knight moves in an L-shape: two squares in one cardinal direction then one square perpendicular, giving up to 8 possible destinations from any square.",
        "The tour is called a 'closed' tour if the knight can return to its starting square on the final move, forming a cycle; otherwise it is an 'open' tour.",
        "The problem is a special case of the Hamiltonian path problem on a graph where each square is a node and knight moves define the edges.",
        "Valid tours exist for all boards of size N ≥ 5×5; the 5×5 board has 1,728 directed open tours starting from a corner.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Model the chessboard as a graph: each square is a vertex, and two vertices are connected by an edge if a knight can jump between them in one move.",
        "Finding a knight's tour is equivalent to finding a Hamiltonian path in this graph — a path that visits every vertex exactly once.",
        "Naive backtracking tries all possible next moves recursively, backtracking when no unvisited square is reachable.",
        "Warnsdorff's heuristic (1823) dramatically speeds up the search: always move to the square with the fewest onward moves, reducing dead ends.",
        "On boards larger than 5×5, Warnsdorff's heuristic almost always finds a solution in O(N²) time without any backtracking.",
      ],
      analogy:
        "Imagine exploring a maze where each room has doors to other rooms. Warnsdorff's rule says: always enter the room that has the fewest unexplored exits. By visiting 'dead ends' early while you still have many options, you avoid painting yourself into a corner later — the same principle that makes the knight's tour tractable on large boards.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough (5×5 Board)",
      steps: [
        {
          step: 1,
          description:
            "Initialize a 5×5 board, all squares unvisited (value -1). Place the knight at square (0,0) and mark it as move #1.",
        },
        {
          step: 2,
          description:
            "From (0,0), list all valid knight moves: (1,2) and (2,1). Apply Warnsdorff's rule — count onward moves from each candidate. (2,1) has more options, so move there. Mark as #2.",
        },
        {
          step: 3,
          description:
            "From (2,1), list candidates: (0,0)[visited], (0,2), (1,3), (3,3), (4,0), (4,2). Sort by their own onward-move count ascending. Choose the square with fewest exits.",
        },
        {
          step: 4,
          description:
            "Continue the greedy selection: at each step pick the unvisited neighbor with the minimum degree (number of unvisited neighbors). Mark each chosen square with its move number.",
        },
        {
          step: 5,
          description:
            "When two candidates tie on degree, break ties by any consistent rule (e.g., lexicographic order of coordinates). Consistent tie-breaking avoids non-determinism.",
        },
        {
          step: 6,
          description:
            "After 12 moves the board is roughly half-filled. The heuristic ensures the knight has not yet trapped itself in an unreachable pocket of unvisited squares.",
        },
        {
          step: 7,
          description:
            "At move 20, only 5 squares remain unvisited. Warnsdorff's heuristic has steered the path to keep these squares connected and reachable.",
        },
        {
          step: 8,
          description:
            "Move 24 lands on the second-to-last unvisited square. Only one square remains — the knight must move there for move 25.",
        },
        {
          step: 9,
          description:
            "Move 25 visits the final square. All 25 cells are now marked with move numbers 1–25. The open tour is complete.",
        },
        {
          step: 10,
          description:
            "Check for a closed tour: can the knight jump from square 25 back to square 1 (0,0)? If yes, the tour is closed (Hamiltonian cycle). On a 5×5 board no closed tour exists.",
        },
        {
          step: 11,
          description:
            "If Warnsdorff's heuristic fails (rare on small boards), fall back to full backtracking: undo the last move, try the next candidate, and recurse.",
        },
        {
          step: 12,
          description:
            "The final path visits all N² squares exactly once. The sequence of coordinates forms the knight's tour solution.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `KNIGHT_MOVES = [
    (-2, -1), (-2, 1), (-1, -2), (-1, 2),
    ( 1, -2), ( 1, 2), ( 2, -1), ( 2, 1),
]

def valid_moves(board, r, c, n):
    """Return all unvisited squares reachable in one knight move."""
    moves = []
    for dr, dc in KNIGHT_MOVES:
        nr, nc = r + dr, c + dc
        if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
            moves.append((nr, nc))
    return moves

def warnsdorff_degree(board, r, c, n):
    """Count onward moves from (r, c) — used as the heuristic key."""
    return len(valid_moves(board, r, c, n))

def knights_tour(n: int, start_r: int = 0, start_c: int = 0):
    """
    Find a knight's tour on an n×n board using Warnsdorff's heuristic
    with backtracking fallback. Returns the path as a list of (row, col)
    tuples, or None if no tour exists.
    """
    board = [[-1] * n for _ in range(n)]
    path = [(start_r, start_c)]
    board[start_r][start_c] = 0

    def backtrack(r, c, move_num):
        if move_num == n * n:
            return True  # All squares visited

        # Get candidates sorted by Warnsdorff's heuristic
        candidates = valid_moves(board, r, c, n)
        candidates.sort(key=lambda pos: warnsdorff_degree(board, pos[0], pos[1], n))

        for nr, nc in candidates:
            board[nr][nc] = move_num
            path.append((nr, nc))

            if backtrack(nr, nc, move_num + 1):
                return True

            # Backtrack
            board[nr][nc] = -1
            path.pop()

        return False

    if backtrack(start_r, start_c, 1):
        return path
    return None


# Example usage
if __name__ == "__main__":
    tour = knights_tour(n=5, start_r=0, start_c=0)
    if tour:
        board = [[0] * 5 for _ in range(5)]
        for step, (r, c) in enumerate(tour, 1):
            board[r][c] = step
        for row in board:
            print([f"{v:2d}" for v in row])
    else:
        print("No tour found")
`,
      annotations: [
        {
          lines: [1, 2, 3, 4],
          note: "The 8 possible L-shaped knight moves as (row_delta, col_delta) offsets. All knight moves are symmetric, so this list covers every direction.",
        },
        {
          lines: [6, 7, 8, 9, 10, 11, 12],
          note: "valid_moves filters the 8 candidate destinations to those that are inside the board and not yet visited (board value == -1). This is the adjacency check.",
        },
        {
          lines: [14, 15, 16],
          note: "warnsdorff_degree counts how many unvisited squares are reachable from a position. Lower degree means the square is harder to reach later — visit it sooner.",
        },
        {
          lines: [29, 30, 31, 32, 33],
          note: "The backtrack function tries each candidate move in Warnsdorff order. Sorting by degree implements the heuristic that guides the search toward a solution.",
        },
        {
          lines: [38, 39, 40, 41, 42],
          note: "Classic backtracking: if the recursive call fails, undo the move (reset board cell to -1, pop path) and try the next candidate.",
        },
        {
          lines: [44],
          note: "Base case: when move_num reaches n*n, every square has been visited exactly once. Return True to propagate success up the call stack.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(N²)",
          explanation:
            "Warnsdorff's heuristic finds the tour in a single pass with no backtracking on most boards — linear in the number of squares.",
        },
        {
          case: "Average",
          notation: "O(N²)",
          explanation:
            "For boards N ≥ 5, Warnsdorff's heuristic almost always succeeds in one pass. The average number of backtracks is extremely small.",
        },
        {
          case: "Worst",
          notation: "O(8^(N²))",
          explanation:
            "Pure backtracking without heuristics must explore up to 8 choices at each of N² squares, leading to exponential blowup on adversarial inputs.",
        },
      ],
      spaceRows: [
        {
          type: "Board State",
          notation: "O(N²)",
          explanation:
            "The visited/move-number board requires N² cells to track which squares have been visited and in what order.",
        },
        {
          type: "Recursion Stack",
          notation: "O(N²)",
          explanation:
            "The call stack depth equals the number of moves made so far, reaching up to N² frames at the deepest point.",
        },
      ],
      insights: [
        "Warnsdorff's heuristic (1823) is one of the earliest known greedy heuristics and still works remarkably well — it reduces average complexity from exponential to quadratic.",
        "The Knight's Tour is NP-complete in the general case (arbitrary graph Hamiltonian path), but the chessboard's regular structure makes it tractable with good heuristics.",
        "Closed tours (where the knight returns to start) exist for all even N ≥ 6; no closed tour exists on a 5×5 board.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Warnsdorff's Heuristic (Greedy)",
          description:
            "Always move to the square with the fewest onward moves. Solves most boards in O(N²) time with no backtracking. The standard practical approach for large boards.",
        },
        {
          name: "Pure Backtracking (Brute Force)",
          description:
            "Try all 8 moves recursively, backtracking on dead ends. Correct for any board size but exponential in the worst case. Useful for small boards or verifying all solutions.",
        },
        {
          name: "Divide and Conquer",
          description:
            "Split the board into smaller sub-boards, solve each independently, then stitch the partial tours together. Achieves linear time O(N²) and is used to find tours on very large boards.",
        },
        {
          name: "Neural Network / Monte Carlo",
          description:
            "Use a trained neural network or random restarts (Monte Carlo) to guide move selection. Can find tours on irregular or obstacle-laden boards where heuristics fail.",
        },
        {
          name: "Closed Tour Search",
          description:
            "Add the constraint that the last square must be a knight-move away from the first. Requires additional pruning; closed tours exist for all even N ≥ 6 and can be found efficiently with structured search.",
        },
      ],
      tips: [
        "Always implement Warnsdorff's heuristic as the primary strategy — it transforms the problem from exponential to near-linear on standard boards.",
        "When tie-breaking in Warnsdorff's rule, use a secondary criterion such as distance from the board center to prefer central squares, which further reduces backtracking.",
        "For boards smaller than 5×5 (except 1×1), no complete tour exists — validate the board size before running the algorithm.",
        "To find all tours (not just one), remove the early-exit and collect all paths where move_num == N*N. Be aware this is computationally expensive — a 6×6 board has over 6 billion directed tours.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "The Knight's Tour asks for a Hamiltonian path on the knight-move graph of an N×N chessboard — visit every square exactly once.",
        "Backtracking provides a correct but exponential solution: at each step try all valid moves, undo on failure, and recurse.",
        "Warnsdorff's heuristic (move to the square with fewest onward moves) reduces average-case complexity to O(N²) and almost eliminates backtracking on boards N ≥ 5.",
        "Space complexity is O(N²) for the board state plus O(N²) for the recursion stack, totalling O(N²) overall.",
        "Closed tours (returning to start) exist for all even N ≥ 6 but not for 5×5 or odd-sized boards.",
        "The problem is a classic demonstration that smart heuristics can make an NP-hard problem tractable in practice, bridging theory and real-world performance.",
      ],
    },
  },
}

export default function KnightsTourVideo() {
  return <AlgoVideo config={config} />
}
