import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Word Search",
  subtitle: "Search for a word in a 2D grid using backtracking.",
  category: "backtracking",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an m×n grid of characters and a target word, determine if the word exists in the grid.",
        "The word must be constructed from sequentially adjacent cells (horizontally or vertically).",
        "The same cell may not be used more than once in a single word path.",
        "Return true if the word can be found, false otherwise.",
        "Example: grid = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED' → true",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Treat the grid as a graph where each cell connects to its 4 neighbors.",
        "Try starting a DFS from every cell that matches the first character of the word.",
        "At each step, check if the current cell matches the next character; if not, backtrack.",
        "Mark cells as visited during the current path to prevent reuse, then unmark on backtrack.",
        "The search terminates early (returns true) as soon as the full word is matched.",
      ],
      analogy:
        "Think of it like a maze puzzle: you trace a path letter by letter, and whenever you hit a dead end you retrace your steps and try a different direction — just like navigating a maze by hand.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Scan the grid for all cells that contain the first character of the word ('A').",
        },
        {
          step: 2,
          description: "Start DFS from cell (0,0) which holds 'A'. Mark (0,0) as visited.",
        },
        {
          step: 3,
          description: "Move right to (0,1) which holds 'B' — matches word[1]. Mark visited.",
        },
        {
          step: 4,
          description: "Move right to (0,2) which holds 'C' — matches word[2]. Mark visited.",
        },
        {
          step: 5,
          description: "Move down to (1,2) which holds 'C' — matches word[3]. Mark visited.",
        },
        {
          step: 6,
          description: "Move down to (2,2) which holds 'E' — matches word[4]. Mark visited.",
        },
        {
          step: 7,
          description: "Move left to (2,1) which holds 'D' — matches word[5]. All characters matched!",
        },
        {
          step: 8,
          description: "Return true immediately. The path (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1) spells 'ABCCED'.",
        },
        {
          step: 9,
          description:
            "Backtracking example: if at step 3 we had gone down to (1,0)='S' instead, it wouldn't match 'B', so we backtrack to (0,0) and try another direction.",
        },
        {
          step: 10,
          description:
            "Unmark cells when backtracking so they can be reused by other candidate paths starting from different origins.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int, idx: int) -> bool:
        if idx == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[idx]:
            return False

        # Mark current cell as visited
        temp = board[r][c]
        board[r][c] = "#"

        # Explore all 4 directions
        found = (
            dfs(r + 1, c, idx + 1) or
            dfs(r - 1, c, idx + 1) or
            dfs(r, c + 1, idx + 1) or
            dfs(r, c - 1, idx + 1)
        )

        # Restore cell (backtrack)
        board[r][c] = temp
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
      annotations: [
        {
          lines: [1, 2],
          note: "Extract grid dimensions once; reused in bounds checks inside DFS.",
        },
        {
          lines: [4, 5],
          note: "Base case: idx equals word length means every character was matched — success.",
        },
        {
          lines: [6, 7, 8],
          note: "Bounds check and character match guard. Out-of-bounds or wrong character both return false immediately.",
        },
        {
          lines: [11, 12],
          note: "Temporarily overwrite the cell with '#' to mark it visited for the current path, preventing reuse.",
        },
        {
          lines: [14, 15, 16, 17, 18, 19],
          note: "Recurse in all 4 cardinal directions. Short-circuit OR stops as soon as any branch succeeds.",
        },
        {
          lines: [21, 22],
          note: "Restore the original character on backtrack so other paths can use this cell.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(M·N)",
          note: "Word found immediately at the first starting cell tried.",
        },
        {
          case: "Average",
          complexity: "O(M·N·4^L)",
          note: "Typical case exploring multiple starting cells and branches.",
        },
        {
          case: "Worst",
          complexity: "O(M·N·4^L)",
          note: "Word not present; every cell and every branch fully explored.",
        },
      ],
      spaceRows: [
        {
          case: "Recursion Stack",
          complexity: "O(L)",
          note: "Stack depth equals the length of the target word.",
        },
        {
          case: "Visited Marking",
          complexity: "O(1) extra",
          note: "In-place '#' trick requires no auxiliary visited array.",
        },
      ],
      insights: [
        "The 4^L factor is a loose upper bound; pruning on character mismatch cuts the real branching far below 4 in practice.",
        "For very long words relative to grid size, the search space shrinks quickly because visited cells reduce available neighbors.",
        "Checking character frequency before DFS (if any letter in word is missing from grid, return false) can short-circuit the entire search.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Word Search II",
          description:
            "Find all words from a dictionary in the grid simultaneously using a Trie to prune dead branches early.",
        },
        {
          name: "8-Directional Search",
          description:
            "Allow diagonal movement in addition to the 4 cardinal directions, expanding to 8 neighbors per cell.",
        },
        {
          name: "Wrap-Around Grid",
          description:
            "Treat the grid as toroidal — cells on the edge connect to the opposite edge, requiring modular index arithmetic.",
        },
        {
          name: "Count All Paths",
          description:
            "Instead of returning on the first match, count every distinct path that spells the target word.",
        },
        {
          name: "Longest Word in Grid",
          description: "Find the longest word from a given list that can be formed in the grid, combining Trie + DFS.",
        },
      ],
      tips: [
        "Always restore the cell value after backtracking — forgetting this is the most common bug.",
        "Check character frequency of the word against the grid before starting DFS to prune impossible cases instantly.",
        "Start DFS only from cells matching the first (or rarest) character to minimize wasted iterations.",
        "For Word Search II, insert all dictionary words into a Trie and prune the DFS whenever no Trie prefix matches.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Word Search is a classic backtracking problem: explore a path, and undo choices that lead to dead ends.",
        "In-place visited marking (overwriting with '#') avoids allocating a separate boolean matrix.",
        "The DFS recurses to depth L (word length), making the recursion stack O(L) space.",
        "Short-circuit evaluation with OR means the recursion stops as soon as any valid path is found.",
        "Backtracking problems share a common pattern: choose → explore → unchoose.",
        "Frequency pruning before DFS is a powerful optimization that costs O(M·N + L) but can eliminate all DFS work.",
      ],
    },
  },
}

export default function WordSearchVideo() {
  return <AlgoVideo config={config} />
}
