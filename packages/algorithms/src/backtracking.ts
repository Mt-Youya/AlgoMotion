import type { AlgorithmMeta, AlgorithmRun, BacktrackingAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const backtrackingAlgorithms: Record<string, AlgorithmMeta> = {
  "n-queens": {
    id: "n-queens",
    name: "N-Queens",
    displayName: { en: "N-Queens", zh: "N 皇后" },
    category: "backtracking",
    difficulty: "advanced",
    tags: ["backtracking", "matrix", "constraint", "classic"],
    description: {
      en: "Place N queens on an N×N chessboard so that no two queens threaten each other.",
      zh: "在 N×N 棋盘上放置 N 个皇后，使得任意两个皇后互不攻击。",
    },
    timeComplexity: { best: "O(n!)", average: "O(n!)", worst: "O(n!)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 51, titleSlug: "n-queens", difficulty: "hard" },
      { id: 52, titleSlug: "n-queens-ii", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));
  function isValid(row, col) {
    for (let r = 0; r < row; r++) if (board[r][col] === 'Q') return false;
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--)
      if (board[r][c] === 'Q') return false;
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++)
      if (board[r][c] === 'Q') return false;
    return true;
  }
  function backtrack(row) {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row][col] = 'Q';
      backtrack(row + 1);
      board[row][col] = '.';
    }
  }
  backtrack(0);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function solveNQueens(n: number): string[][] {
  const result: string[][] = [];
  const board: string[][] = Array.from({ length: n }, () => Array(n).fill('.'));
  function isValid(row: number, col: number): boolean {
    for (let r = 0; r < row; r++) if (board[r][col] === 'Q') return false;
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--)
      if (board[r][c] === 'Q') return false;
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++)
      if (board[r][c] === 'Q') return false;
    return true;
  }
  function backtrack(row: number): void {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;
      board[row][col] = 'Q';
      backtrack(row + 1);
      board[row][col] = '.';
    }
  }
  backtrack(0);
  return result;
}`,
      },
      {
        lang: "java",
        code: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    backtrack(board, 0, result);
    return result;
}
private void backtrack(char[][] board, int row, List<List<String>> result) {
    if (row == board.length) {
        List<String> sol = new ArrayList<>();
        for (char[] r : board) sol.add(new String(r));
        result.add(sol);
        return;
    }
    for (int col = 0; col < board.length; col++) {
        if (!isValid(board, row, col)) continue;
        board[row][col] = 'Q';
        backtrack(board, row + 1, result);
        board[row][col] = '.';
    }
}
private boolean isValid(char[][] board, int row, int col) {
    int n = board.length;
    for (int r = 0; r < row; r++) if (board[r][col] == 'Q') return false;
    for (int r = row-1, c = col-1; r >= 0 && c >= 0; r--, c--)
        if (board[r][c] == 'Q') return false;
    for (int r = row-1, c = col+1; r >= 0 && c < n; r--, c++)
        if (board[r][c] == 'Q') return false;
    return true;
}`,
      },
      {
        lang: "python",
        code: `def solve_n_queens(n: int) -> list[list[str]]:
    result = []
    board = [['.' ] * n for _ in range(n)]
    def is_valid(row, col):
        for r in range(row):
            if board[r][col] == 'Q': return False
        r, c = row - 1, col - 1
        while r >= 0 and c >= 0:
            if board[r][c] == 'Q': return False
            r -= 1; c -= 1
        r, c = row - 1, col + 1
        while r >= 0 and c < n:
            if board[r][c] == 'Q': return False
            r -= 1; c += 1
        return True
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if not is_valid(row, col): continue
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
    backtrack(0)
    return result`,
      },
      {
        lang: "rust",
        code: `fn solve_n_queens(n: usize) -> Vec<Vec<String>> {
    let mut result = vec![];
    let mut board = vec![vec!['.'; n]; n];
    fn is_valid(board: &[Vec<char>], row: usize, col: usize) -> bool {
        let n = board.len();
        for r in 0..row { if board[r][col] == 'Q' { return false; } }
        let (mut r, mut c) = (row as isize - 1, col as isize - 1);
        while r >= 0 && c >= 0 {
            if board[r as usize][c as usize] == 'Q' { return false; }
            r -= 1; c -= 1;
        }
        let (mut r, mut c) = (row as isize - 1, col as isize + 1);
        while r >= 0 && c < n as isize {
            if board[r as usize][c as usize] == 'Q' { return false; }
            r -= 1; c += 1;
        }
        true
    }
    fn backtrack(board: &mut Vec<Vec<char>>, row: usize, result: &mut Vec<Vec<String>>) {
        let n = board.len();
        if row == n {
            result.push(board.iter().map(|r| r.iter().collect()).collect());
            return;
        }
        for col in 0..n {
            if !is_valid(board, row, col) { continue; }
            board[row][col] = 'Q';
            backtrack(board, row + 1, result);
            board[row][col] = '.';
        }
    }
    backtrack(&mut board, 0, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void backtrack(char board[][20], int n, int row, char*** result, int* count) {
    if (row == n) {
        result[*count] = malloc(n * sizeof(char*));
        for (int i = 0; i < n; i++) {
            result[*count][i] = malloc((n + 1) * sizeof(char));
            memcpy(result[*count][i], board[i], n + 1);
        }
        (*count)++;
        return;
    }
    for (int col = 0; col < n; col++) {
        int valid = 1;
        for (int r = 0; r < row && valid; r++)
            if (board[r][col] == 'Q') valid = 0;
        for (int r = row-1, c = col-1; r >= 0 && c >= 0 && valid; r--, c--)
            if (board[r][c] == 'Q') valid = 0;
        for (int r = row-1, c = col+1; r >= 0 && c < n && valid; r--, c++)
            if (board[r][c] == 'Q') valid = 0;
        if (!valid) continue;
        board[row][col] = 'Q';
        backtrack(board, n, row + 1, result, count);
        board[row][col] = '.';
    }
}`,
      },
      {
        lang: "cpp",
        code: `class Solution {
    bool isValid(vector<string>& board, int row, int col, int n) {
        for (int r = 0; r < row; r++) if (board[r][col] == 'Q') return false;
        for (int r = row-1, c = col-1; r >= 0 && c >= 0; r--, c--)
            if (board[r][c] == 'Q') return false;
        for (int r = row-1, c = col+1; r >= 0 && c < n; r--, c++)
            if (board[r][c] == 'Q') return false;
        return true;
    }
    void backtrack(vector<string>& board, int row, int n, vector<vector<string>>& res) {
        if (row == n) { res.push_back(board); return; }
        for (int col = 0; col < n; col++) {
            if (!isValid(board, row, col, n)) continue;
            board[row][col] = 'Q';
            backtrack(board, row + 1, n, res);
            board[row][col] = '.';
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        backtrack(board, 0, n, res);
        return res;
    }
};`,
      },
      {
        lang: "go",
        code: `func solveNQueens(n int) [][]string {
    result := [][]string{}
    board := make([][]byte, n)
    for i := range board {
        board[i] = make([]byte, n)
        for j := range board[i] { board[i][j] = '.' }
    }
    isValid := func(row, col int) bool {
        for r := 0; r < row; r++ { if board[r][col] == 'Q' { return false } }
        for r, c := row-1, col-1; r >= 0 && c >= 0; r, c = r-1, c-1 {
            if board[r][c] == 'Q' { return false }
        }
        for r, c := row-1, col+1; r >= 0 && c < n; r, c = r-1, c+1 {
            if board[r][c] == 'Q' { return false }
        }
        return true
    }
    var backtrack func(row int)
    backtrack = func(row int) {
        if row == n {
            sol := make([]string, n)
            for i, r := range board { sol[i] = string(r) }
            result = append(result, sol)
            return
        }
        for col := 0; col < n; col++ {
            if !isValid(row, col) { continue }
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
        }
    }
    backtrack(0)
    return result
}`,
      },
      {
        lang: "php",
        code: `function solveNQueens(int $n): array {
    $result = [];
    $board = array_fill(0, $n, array_fill(0, $n, '.'));
    $isValid = function(int $row, int $col) use (&$board, $n): bool {
        for ($r = 0; $r < $row; $r++) if ($board[$r][$col] === 'Q') return false;
        for ($r = $row-1, $c = $col-1; $r >= 0 && $c >= 0; $r--, $c--)
            if ($board[$r][$c] === 'Q') return false;
        for ($r = $row-1, $c = $col+1; $r >= 0 && $c < $n; $r--, $c++)
            if ($board[$r][$c] === 'Q') return false;
        return true;
    };
    $backtrack = function(int $row) use (&$backtrack, &$board, &$result, $n, $isValid): void {
        if ($row === $n) {
            $result[] = array_map(fn($r) => implode('', $r), $board);
            return;
        }
        for ($col = 0; $col < $n; $col++) {
            if (!$isValid($row, $col)) continue;
            $board[$row][$col] = 'Q';
            $backtrack($row + 1);
            $board[$row][$col] = '.';
        }
    };
    $backtrack(0);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun solveNQueens(n: Int): List<List<String>> {
    val result = mutableListOf<List<String>>()
    val board = Array(n) { CharArray(n) { '.' } }
    fun isValid(row: Int, col: Int): Boolean {
        for (r in 0 until row) if (board[r][col] == 'Q') return false
        var r = row - 1; var c = col - 1
        while (r >= 0 && c >= 0) { if (board[r][c] == 'Q') return false; r--; c-- }
        r = row - 1; c = col + 1
        while (r >= 0 && c < n) { if (board[r][c] == 'Q') return false; r--; c++ }
        return true
    }
    fun backtrack(row: Int) {
        if (row == n) { result.add(board.map { String(it) }); return }
        for (col in 0 until n) {
            if (!isValid(row, col)) continue
            board[row][col] = 'Q'
            backtrack(row + 1)
            board[row][col] = '.'
        }
    }
    backtrack(0)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func solveNQueens(_ n: Int) -> [[String]] {
    var result: [[String]] = []
    var board = Array(repeating: Array(repeating: Character("."), count: n), count: n)
    func isValid(_ row: Int, _ col: Int) -> Bool {
        for r in 0..<row { if board[r][col] == "Q" { return false } }
        var r = row - 1, c = col - 1
        while r >= 0 && c >= 0 { if board[r][c] == "Q" { return false }; r -= 1; c -= 1 }
        r = row - 1; c = col + 1
        while r >= 0 && c < n { if board[r][c] == "Q" { return false }; r -= 1; c += 1 }
        return true
    }
    func backtrack(_ row: Int) {
        if row == n { result.append(board.map { String($0) }); return }
        for col in 0..<n {
            if !isValid(row, col) { continue }
            board[row][col] = "Q"
            backtrack(row + 1)
            board[row][col] = "."
        }
    }
    backtrack(0)
    return result
}`,
      },
    ],
  },

  "sudoku-solver": {
    id: "sudoku-solver",
    name: "Sudoku Solver",
    displayName: { en: "Sudoku Solver", zh: "数独求解" },
    category: "backtracking",
    difficulty: "advanced",
    tags: ["backtracking", "matrix", "constraint", "classic"],
    description: {
      en: "Fill a 9×9 Sudoku board so every row, column, and 3×3 box contains digits 1–9 exactly once.",
      zh: "填充 9×9 数独棋盘，使每行、每列、每个 3×3 宫格均包含 1-9 各一次。",
    },
    timeComplexity: { best: "O(1)", average: "O(9^m)", worst: "O(9^81)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 37, titleSlug: "sudoku-solver", difficulty: "hard" },
      { id: 36, titleSlug: "valid-sudoku", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function solveSudoku(board) {
  function isValid(row, col, num) {
    const box = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
      if (board[i][col] === num) return false;
      if (board[3 * Math.floor(box / 3) + Math.floor(i / 3)]
               [3 * (box % 3) + (i % 3)] === num) return false;
    }
    return true;
  }
  function backtrack() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let d = 1; d <= 9; d++) {
          const ch = String(d);
          if (!isValid(r, c, ch)) continue;
          board[r][c] = ch;
          if (backtrack()) return true;
          board[r][c] = '.';
        }
        return false;
      }
    }
    return true;
  }
  backtrack();
}`,
      },
      {
        lang: "typescript",
        code: `function solveSudoku(board: string[][]): void {
  function isValid(row: number, col: number, num: string): boolean {
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
      if (board[i][col] === num) return false;
      if (board[boxRow + Math.floor(i / 3)][boxCol + (i % 3)] === num) return false;
    }
    return true;
  }
  function backtrack(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== '.') continue;
        for (let d = 1; d <= 9; d++) {
          const ch = String(d);
          if (!isValid(r, c, ch)) continue;
          board[r][c] = ch;
          if (backtrack()) return true;
          board[r][c] = '.';
        }
        return false;
      }
    }
    return true;
  }
  backtrack();
}`,
      },
      {
        lang: "java",
        code: `public void solveSudoku(char[][] board) {
    backtrack(board);
}
private boolean backtrack(char[][] board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] != '.') continue;
            for (char d = '1'; d <= '9'; d++) {
                if (!isValid(board, r, c, d)) continue;
                board[r][c] = d;
                if (backtrack(board)) return true;
                board[r][c] = '.';
            }
            return false;
        }
    }
    return true;
}
private boolean isValid(char[][] board, int row, int col, char num) {
    int boxRow = (row / 3) * 3, boxCol = (col / 3) * 3;
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) return false;
        if (board[boxRow + i/3][boxCol + i%3] == num) return false;
    }
    return true;
}`,
      },
      {
        lang: "python",
        code: `def solve_sudoku(board: list[list[str]]) -> None:
    def is_valid(row, col, num):
        br, bc = (row // 3) * 3, (col // 3) * 3
        for i in range(9):
            if board[row][i] == num or board[i][col] == num: return False
            if board[br + i // 3][bc + i % 3] == num: return False
        return True
    def backtrack():
        for r in range(9):
            for c in range(9):
                if board[r][c] != '.': continue
                for d in map(str, range(1, 10)):
                    if not is_valid(r, c, d): continue
                    board[r][c] = d
                    if backtrack(): return True
                    board[r][c] = '.'
                return False
        return True
    backtrack()`,
      },
      {
        lang: "rust",
        code: `fn solve_sudoku(board: &mut Vec<Vec<char>>) {
    fn is_valid(board: &[Vec<char>], row: usize, col: usize, num: char) -> bool {
        let (br, bc) = ((row / 3) * 3, (col / 3) * 3);
        for i in 0..9 {
            if board[row][i] == num || board[i][col] == num { return false; }
            if board[br + i / 3][bc + i % 3] == num { return false; }
        }
        true
    }
    fn backtrack(board: &mut Vec<Vec<char>>) -> bool {
        for r in 0..9 {
            for c in 0..9 {
                if board[r][c] != '.' { continue; }
                for d in '1'..='9' {
                    if !is_valid(board, r, c, d) { continue; }
                    board[r][c] = d;
                    if backtrack(board) { return true; }
                    board[r][c] = '.';
                }
                return false;
            }
        }
        true
    }
    backtrack(board);
}`,
      },
      {
        lang: "c",
        code: `int isValid(char board[9][9], int row, int col, char num) {
    int br = (row/3)*3, bc = (col/3)*3;
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == num || board[i][col] == num) return 0;
        if (board[br + i/3][bc + i%3] == num) return 0;
    }
    return 1;
}
int backtrack(char board[9][9]) {
    for (int r = 0; r < 9; r++)
        for (int c = 0; c < 9; c++) {
            if (board[r][c] != '.') continue;
            for (char d = '1'; d <= '9'; d++) {
                if (!isValid(board, r, c, d)) continue;
                board[r][c] = d;
                if (backtrack(board)) return 1;
                board[r][c] = '.';
            }
            return 0;
        }
    return 1;
}`,
      },
      {
        lang: "cpp",
        code: `class Solution {
    bool isValid(vector<vector<char>>& b, int r, int c, char d) {
        int br = (r/3)*3, bc = (c/3)*3;
        for (int i = 0; i < 9; i++) {
            if (b[r][i]==d || b[i][c]==d) return false;
            if (b[br+i/3][bc+i%3]==d) return false;
        }
        return true;
    }
    bool backtrack(vector<vector<char>>& b) {
        for (int r = 0; r < 9; r++)
            for (int c = 0; c < 9; c++) {
                if (b[r][c] != '.') continue;
                for (char d = '1'; d <= '9'; d++) {
                    if (!isValid(b, r, c, d)) continue;
                    b[r][c] = d;
                    if (backtrack(b)) return true;
                    b[r][c] = '.';
                }
                return false;
            }
        return true;
    }
public:
    void solveSudoku(vector<vector<char>>& board) { backtrack(board); }
};`,
      },
      {
        lang: "go",
        code: `func solveSudoku(board [][]byte) {
    isValid := func(r, c int, num byte) bool {
        br, bc := (r/3)*3, (c/3)*3
        for i := 0; i < 9; i++ {
            if board[r][i] == num || board[i][c] == num { return false }
            if board[br+i/3][bc+i%3] == num { return false }
        }
        return true
    }
    var backtrack func() bool
    backtrack = func() bool {
        for r := 0; r < 9; r++ {
            for c := 0; c < 9; c++ {
                if board[r][c] != '.' { continue }
                for d := byte('1'); d <= '9'; d++ {
                    if !isValid(r, c, d) { continue }
                    board[r][c] = d
                    if backtrack() { return true }
                    board[r][c] = '.'
                }
                return false
            }
        }
        return true
    }
    backtrack()
}`,
      },
      {
        lang: "php",
        code: `function solveSudoku(array &$board): void {
    $isValid = function(int $r, int $c, string $num) use (&$board): bool {
        $br = ($r / 3) * 3; $bc = ($c / 3) * 3;
        for ($i = 0; $i < 9; $i++) {
            if ($board[$r][$i] === $num || $board[$i][$c] === $num) return false;
            if ($board[$br + intdiv($i, 3)][$bc + $i % 3] === $num) return false;
        }
        return true;
    };
    $backtrack = function() use (&$backtrack, &$board, $isValid): bool {
        for ($r = 0; $r < 9; $r++)
            for ($c = 0; $c < 9; $c++) {
                if ($board[$r][$c] !== '.') continue;
                for ($d = 1; $d <= 9; $d++) {
                    if (!$isValid($r, $c, (string)$d)) continue;
                    $board[$r][$c] = (string)$d;
                    if ($backtrack()) return true;
                    $board[$r][$c] = '.';
                }
                return false;
            }
        return true;
    };
    $backtrack();
}`,
      },
      {
        lang: "kotlin",
        code: `fun solveSudoku(board: Array<CharArray>) {
    fun isValid(r: Int, c: Int, d: Char): Boolean {
        val br = (r / 3) * 3; val bc = (c / 3) * 3
        for (i in 0..8) {
            if (board[r][i] == d || board[i][c] == d) return false
            if (board[br + i / 3][bc + i % 3] == d) return false
        }
        return true
    }
    fun backtrack(): Boolean {
        for (r in 0..8) for (c in 0..8) {
            if (board[r][c] != '.') continue
            for (d in '1'..'9') {
                if (!isValid(r, c, d)) continue
                board[r][c] = d
                if (backtrack()) return true
                board[r][c] = '.'
            }
            return false
        }
        return true
    }
    backtrack()
}`,
      },
      {
        lang: "swift",
        code: `func solveSudoku(_ board: inout [[Character]]) {
    func isValid(_ r: Int, _ c: Int, _ d: Character) -> Bool {
        let br = (r / 3) * 3, bc = (c / 3) * 3
        for i in 0..<9 {
            if board[r][i] == d || board[i][c] == d { return false }
            if board[br + i / 3][bc + i % 3] == d { return false }
        }
        return true
    }
    func backtrack() -> Bool {
        for r in 0..<9 {
            for c in 0..<9 {
                if board[r][c] != "." { continue }
                for d: Character in ["1","2","3","4","5","6","7","8","9"] {
                    if !isValid(r, c, d) { continue }
                    board[r][c] = d
                    if backtrack() { return true }
                    board[r][c] = "."
                }
                return false
            }
        }
        return true
    }
    _ = backtrack()
}`,
      },
    ],
  },

  permutations: {
    id: "permutations",
    name: "Permutations",
    displayName: { en: "Permutations", zh: "全排列" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["backtracking", "array", "recursion", "combinatorics"],
    description: {
      en: "Generate all permutations of a given array of distinct integers using backtracking.",
      zh: "使用回溯法生成给定整数数组的所有排列。",
    },
    timeComplexity: { best: "O(n×n!)", average: "O(n×n!)", worst: "O(n×n!)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 46, titleSlug: "permutations", difficulty: "medium" },
      { id: 47, titleSlug: "permutations-ii", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function permute(nums) {
  const result = [];
  function backtrack(start) {
    if (start === nums.length) { result.push([...nums]); return; }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  backtrack(0);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  function backtrack(start: number): void {
    if (start === nums.length) { result.push([...nums]); return; }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  backtrack(0);
  return result;
}`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, result);
    return result;
}
private void backtrack(int[] nums, int start, List<List<Integer>> result) {
    if (start == nums.length) {
        List<Integer> perm = new ArrayList<>();
        for (int n : nums) perm.add(n);
        result.add(perm);
        return;
    }
    for (int i = start; i < nums.length; i++) {
        int tmp = nums[start]; nums[start] = nums[i]; nums[i] = tmp;
        backtrack(nums, start + 1, result);
        tmp = nums[start]; nums[start] = nums[i]; nums[i] = tmp;
    }
}`,
      },
      {
        lang: "python",
        code: `def permute(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(start: int) -> None:
        if start == len(nums):
            result.append(nums[:])
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
    backtrack(0)
    return result`,
      },
      {
        lang: "rust",
        code: `fn permute(nums: Vec<i32>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    let mut nums = nums;
    fn backtrack(nums: &mut Vec<i32>, start: usize, result: &mut Vec<Vec<i32>>) {
        if start == nums.len() { result.push(nums.clone()); return; }
        for i in start..nums.len() {
            nums.swap(start, i);
            backtrack(nums, start + 1, result);
            nums.swap(start, i);
        }
    }
    backtrack(&mut nums, 0, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }
void backtrack(int *nums, int n, int start, int **result, int *count) {
    if (start == n) {
        result[*count] = malloc(n * sizeof(int));
        memcpy(result[*count], nums, n * sizeof(int));
        (*count)++;
        return;
    }
    for (int i = start; i < n; i++) {
        swap(&nums[start], &nums[i]);
        backtrack(nums, n, start + 1, result, count);
        swap(&nums[start], &nums[i]);
    }
}`,
      },
      {
        lang: "cpp",
        code: `vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    function<void(int)> backtrack = [&](int start) {
        if (start == (int)nums.size()) { result.push_back(nums); return; }
        for (int i = start; i < (int)nums.size(); i++) {
            swap(nums[start], nums[i]);
            backtrack(start + 1);
            swap(nums[start], nums[i]);
        }
    };
    backtrack(0);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func permute(nums []int) [][]int {
    result := [][]int{}
    var backtrack func(start int)
    backtrack = func(start int) {
        if start == len(nums) {
            perm := make([]int, len(nums))
            copy(perm, nums)
            result = append(result, perm)
            return
        }
        for i := start; i < len(nums); i++ {
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]
        }
    }
    backtrack(0)
    return result
}`,
      },
      {
        lang: "php",
        code: `function permute(array $nums): array {
    $result = [];
    $backtrack = function(int $start) use (&$backtrack, &$nums, &$result): void {
        if ($start === count($nums)) { $result[] = $nums; return; }
        for ($i = $start; $i < count($nums); $i++) {
            [$nums[$start], $nums[$i]] = [$nums[$i], $nums[$start]];
            $backtrack($start + 1);
            [$nums[$start], $nums[$i]] = [$nums[$i], $nums[$start]];
        }
    };
    $backtrack(0);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun permute(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    fun backtrack(start: Int) {
        if (start == nums.size) { result.add(nums.toList()); return }
        for (i in start until nums.size) {
            nums[start] = nums[i].also { nums[i] = nums[start] }
            backtrack(start + 1)
            nums[start] = nums[i].also { nums[i] = nums[start] }
        }
    }
    backtrack(0)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func permute(_ nums: [Int]) -> [[Int]] {
    var result: [[Int]] = []
    var nums = nums
    func backtrack(_ start: Int) {
        if start == nums.count { result.append(nums); return }
        for i in start..<nums.count {
            nums.swapAt(start, i)
            backtrack(start + 1)
            nums.swapAt(start, i)
        }
    }
    backtrack(0)
    return result
}`,
      },
    ],
  },

  subsets: {
    id: "subsets",
    name: "Subsets",
    displayName: { en: "Subsets", zh: "子集" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["backtracking", "array", "recursion", "combinatorics", "bit-manipulation"],
    description: {
      en: "Generate all possible subsets (the power set) of a given array of distinct integers.",
      zh: "生成给定整数数组的所有子集（幂集）。",
    },
    timeComplexity: { best: "O(n×2ⁿ)", average: "O(n×2ⁿ)", worst: "O(n×2ⁿ)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 78, titleSlug: "subsets", difficulty: "medium" },
      { id: 90, titleSlug: "subsets-ii", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function subsets(nums) {
  const result = [];
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  function backtrack(start: number, current: number[]): void {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> result) {
    result.add(new ArrayList<>(cur));
    for (int i = start; i < nums.length; i++) {
        cur.add(nums[i]);
        backtrack(nums, i + 1, cur, result);
        cur.remove(cur.size() - 1);
    }
}`,
      },
      {
        lang: "python",
        code: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []
    def backtrack(start: int, current: list[int]) -> None:
        result.append(current[:])
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()
    backtrack(0, [])
    return result`,
      },
      {
        lang: "rust",
        code: `fn subsets(nums: Vec<i32>) -> Vec<Vec<i32>> {
    let mut result = vec![];
    fn backtrack(nums: &[i32], start: usize, current: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
        result.push(current.clone());
        for i in start..nums.len() {
            current.push(nums[i]);
            backtrack(nums, i + 1, current, result);
            current.pop();
        }
    }
    backtrack(&nums, 0, &mut vec![], &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void backtrack(int *nums, int n, int start, int *cur, int curLen,
               int **result, int *sizes, int *count) {
    result[*count] = malloc(curLen * sizeof(int));
    memcpy(result[*count], cur, curLen * sizeof(int));
    sizes[*count] = curLen;
    (*count)++;
    for (int i = start; i < n; i++) {
        cur[curLen] = nums[i];
        backtrack(nums, n, i + 1, cur, curLen + 1, result, sizes, count);
    }
}`,
      },
      {
        lang: "cpp",
        code: `vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    function<void(int)> backtrack = [&](int start) {
        result.push_back(current);
        for (int i = start; i < (int)nums.size(); i++) {
            current.push_back(nums[i]);
            backtrack(i + 1);
            current.pop_back();
        }
    };
    backtrack(0);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func subsets(nums []int) [][]int {
    result := [][]int{}
    var backtrack func(start int, current []int)
    backtrack = func(start int, current []int) {
        tmp := make([]int, len(current))
        copy(tmp, current)
        result = append(result, tmp)
        for i := start; i < len(nums); i++ {
            backtrack(i+1, append(current, nums[i]))
        }
    }
    backtrack(0, []int{})
    return result
}`,
      },
      {
        lang: "php",
        code: `function subsets(array $nums): array {
    $result = [];
    $backtrack = function(int $start, array $current) use (&$backtrack, $nums, &$result): void {
        $result[] = $current;
        for ($i = $start; $i < count($nums); $i++) {
            $backtrack($i + 1, array_merge($current, [$nums[$i]]));
        }
    };
    $backtrack(0, []);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun subsets(nums: IntArray): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    val current = mutableListOf<Int>()
    fun backtrack(start: Int) {
        result.add(current.toList())
        for (i in start until nums.size) {
            current.add(nums[i])
            backtrack(i + 1)
            current.removeAt(current.size - 1)
        }
    }
    backtrack(0)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func subsets(_ nums: [Int]) -> [[Int]] {
    var result: [[Int]] = []
    var current: [Int] = []
    func backtrack(_ start: Int) {
        result.append(current)
        for i in start..<nums.count {
            current.append(nums[i])
            backtrack(i + 1)
            current.removeLast()
        }
    }
    backtrack(0)
    return result
}`,
      },
    ],
  },

  "combination-sum": {
    id: "combination-sum",
    name: "Combination Sum",
    displayName: { en: "Combination Sum", zh: "组合总和" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["backtracking", "array", "recursion", "combinatorics"],
    description: {
      en: "Find all unique combinations of candidates that sum to a target. Candidates can be reused.",
      zh: "找出所有候选数字加起来等于目标值的唯一组合，候选数字可重复使用。",
    },
    timeComplexity: { best: "O(n^(t/m))", average: "O(n^(t/m))", worst: "O(n^(t/m))" },
    spaceComplexity: "O(t/m)",
    relatedProblems: [
      { id: 39, titleSlug: "combination-sum", difficulty: "medium" },
      { id: 40, titleSlug: "combination-sum-ii", difficulty: "medium" },
      { id: 216, titleSlug: "combination-sum-iii", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  function backtrack(start, current, remaining) {
    if (remaining === 0) { result.push([...current]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]);
      current.pop();
    }
  }
  backtrack(0, [], target);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  function backtrack(start: number, current: number[], remaining: number): void {
    if (remaining === 0) { result.push([...current]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]);
      current.pop();
    }
  }
  backtrack(0, [], target);
  return result;
}`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    Arrays.sort(candidates);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}
private void backtrack(int[] candidates, int remaining, int start,
                       List<Integer> current, List<List<Integer>> result) {
    if (remaining == 0) { result.add(new ArrayList<>(current)); return; }
    for (int i = start; i < candidates.length; i++) {
        if (candidates[i] > remaining) break;
        current.add(candidates[i]);
        backtrack(candidates, remaining - candidates[i], i, current, result);
        current.remove(current.size() - 1);
    }
}`,
      },
      {
        lang: "python",
        code: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()
    result = []
    def backtrack(start: int, current: list[int], remaining: int) -> None:
        if remaining == 0:
            result.append(current[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining: break
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])
            current.pop()
    backtrack(0, [], target)
    return result`,
      },
      {
        lang: "rust",
        code: `fn combination_sum(mut candidates: Vec<i32>, target: i32) -> Vec<Vec<i32>> {
    candidates.sort();
    let mut result = vec![];
    fn backtrack(candidates: &[i32], start: usize, current: &mut Vec<i32>,
                 remaining: i32, result: &mut Vec<Vec<i32>>) {
        if remaining == 0 { result.push(current.clone()); return; }
        for i in start..candidates.len() {
            if candidates[i] > remaining { break; }
            current.push(candidates[i]);
            backtrack(candidates, i, current, remaining - candidates[i], result);
            current.pop();
        }
    }
    backtrack(&candidates, 0, &mut vec![], target, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }
void backtrack(int *candidates, int n, int start, int remaining,
               int *current, int curLen, int **result, int *sizes, int *count) {
    if (remaining == 0) {
        result[*count] = malloc(curLen * sizeof(int));
        memcpy(result[*count], current, curLen * sizeof(int));
        sizes[*count] = curLen;
        (*count)++;
        return;
    }
    for (int i = start; i < n; i++) {
        if (candidates[i] > remaining) break;
        current[curLen] = candidates[i];
        backtrack(candidates, n, i, remaining - candidates[i],
                  current, curLen + 1, result, sizes, count);
    }
}`,
      },
      {
        lang: "cpp",
        code: `vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    sort(candidates.begin(), candidates.end());
    vector<vector<int>> result;
    vector<int> current;
    function<void(int, int)> backtrack = [&](int start, int remaining) {
        if (remaining == 0) { result.push_back(current); return; }
        for (int i = start; i < (int)candidates.size(); i++) {
            if (candidates[i] > remaining) break;
            current.push_back(candidates[i]);
            backtrack(i, remaining - candidates[i]);
            current.pop_back();
        }
    };
    backtrack(0, target);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func combinationSum(candidates []int, target int) [][]int {
    sort.Ints(candidates)
    result := [][]int{}
    var backtrack func(start, remaining int, current []int)
    backtrack = func(start, remaining int, current []int) {
        if remaining == 0 {
            tmp := make([]int, len(current))
            copy(tmp, current)
            result = append(result, tmp)
            return
        }
        for i := start; i < len(candidates); i++ {
            if candidates[i] > remaining { break }
            backtrack(i, remaining-candidates[i], append(current, candidates[i]))
        }
    }
    backtrack(0, target, []int{})
    return result
}`,
      },
      {
        lang: "php",
        code: `function combinationSum(array $candidates, int $target): array {
    sort($candidates);
    $result = [];
    $backtrack = function(int $start, array $current, int $remaining)
        use (&$backtrack, $candidates, &$result): void {
        if ($remaining === 0) { $result[] = $current; return; }
        for ($i = $start; $i < count($candidates); $i++) {
            if ($candidates[$i] > $remaining) break;
            $backtrack($i, array_merge($current, [$candidates[$i]]),
                       $remaining - $candidates[$i]);
        }
    };
    $backtrack(0, [], $target);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun combinationSum(candidates: IntArray, target: Int): List<List<Int>> {
    candidates.sort()
    val result = mutableListOf<List<Int>>()
    val current = mutableListOf<Int>()
    fun backtrack(start: Int, remaining: Int) {
        if (remaining == 0) { result.add(current.toList()); return }
        for (i in start until candidates.size) {
            if (candidates[i] > remaining) break
            current.add(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.removeAt(current.size - 1)
        }
    }
    backtrack(0, target)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func combinationSum(_ candidates: [Int], _ target: Int) -> [[Int]] {
    let candidates = candidates.sorted()
    var result: [[Int]] = []
    var current: [Int] = []
    func backtrack(_ start: Int, _ remaining: Int) {
        if remaining == 0 { result.append(current); return }
        for i in start..<candidates.count {
            if candidates[i] > remaining { break }
            current.append(candidates[i])
            backtrack(i, remaining - candidates[i])
            current.removeLast()
        }
    }
    backtrack(0, target)
    return result
}`,
      },
    ],
  },

  "word-search": {
    id: "word-search",
    name: "Word Search",
    displayName: { en: "Word Search", zh: "单词搜索" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["backtracking", "matrix", "dfs", "grid"],
    description: {
      en: "Search for a word in a 2D grid of characters by exploring adjacent cells using backtracking.",
      zh: "在二维字符网格中通过回溯法搜索相邻格子，判断单词是否存在。",
    },
    timeComplexity: { best: "O(m×n)", average: "O(m×n×4^L)", worst: "O(m×n×4^L)" },
    spaceComplexity: "O(L)",
    relatedProblems: [
      { id: 79, titleSlug: "word-search", difficulty: "medium" },
      { id: 212, titleSlug: "word-search-ii", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  function dfs(r, c, k) {
    if (k === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[k]) return false;
    const tmp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
      },
      {
        lang: "typescript",
        code: `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0].length;
  function dfs(r: number, c: number, k: number): boolean {
    if (k === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[k]) return false;
    const tmp = board[r][c];
    board[r][c] = '#';
    const found = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1);
    board[r][c] = tmp;
    return found;
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (dfs(r, c, 0)) return true;
  return false;
}`,
      },
      {
        lang: "java",
        code: `public boolean exist(char[][] board, String word) {
    for (int r = 0; r < board.length; r++)
        for (int c = 0; c < board[0].length; c++)
            if (dfs(board, r, c, word, 0)) return true;
    return false;
}
private boolean dfs(char[][] board, int r, int c, String word, int k) {
    if (k == word.length()) return true;
    if (r < 0 || r >= board.length || c < 0 || c >= board[0].length
        || board[r][c] != word.charAt(k)) return false;
    char tmp = board[r][c]; board[r][c] = '#';
    boolean found = dfs(board,r+1,c,word,k+1) || dfs(board,r-1,c,word,k+1)
                 || dfs(board,r,c+1,word,k+1) || dfs(board,r,c-1,word,k+1);
    board[r][c] = tmp;
    return found;
}`,
      },
      {
        lang: "python",
        code: `def exist(board: list[list[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])
    def dfs(r, c, k):
        if k == len(word): return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[k]:
            return False
        tmp, board[r][c] = board[r][c], '#'
        found = dfs(r+1,c,k+1) or dfs(r-1,c,k+1) or dfs(r,c+1,k+1) or dfs(r,c-1,k+1)
        board[r][c] = tmp
        return found
    return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,
      },
      {
        lang: "rust",
        code: `fn exist(board: Vec<Vec<char>>, word: String) -> bool {
    let mut board = board;
    let word: Vec<char> = word.chars().collect();
    let (rows, cols) = (board.len(), board[0].len());
    fn dfs(board: &mut Vec<Vec<char>>, r: isize, c: isize,
           word: &[char], k: usize, rows: usize, cols: usize) -> bool {
        if k == word.len() { return true; }
        if r < 0 || c < 0 || r as usize >= rows || c as usize >= cols
            || board[r as usize][c as usize] != word[k] { return false; }
        let tmp = board[r as usize][c as usize];
        board[r as usize][c as usize] = '#';
        let found = dfs(board,r+1,c,word,k+1,rows,cols) || dfs(board,r-1,c,word,k+1,rows,cols)
                 || dfs(board,r,c+1,word,k+1,rows,cols) || dfs(board,r,c-1,word,k+1,rows,cols);
        board[r as usize][c as usize] = tmp;
        found
    }
    for r in 0..rows { for c in 0..cols {
        if dfs(&mut board, r as isize, c as isize, &word, 0, rows, cols) { return true; }
    }}
    false
}`,
      },
      {
        lang: "c",
        code: `int dfs(char **board, int rows, int cols, const char *word, int r, int c, int k) {
    if (word[k] == '\\0') return 1;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[k]) return 0;
    char tmp = board[r][c]; board[r][c] = '#';
    int found = dfs(board,rows,cols,word,r+1,c,k+1) || dfs(board,rows,cols,word,r-1,c,k+1)
             || dfs(board,rows,cols,word,r,c+1,k+1) || dfs(board,rows,cols,word,r,c-1,k+1);
    board[r][c] = tmp;
    return found;
}
int exist(char **board, int rows, int cols, const char *word) {
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (dfs(board, rows, cols, word, r, c, 0)) return 1;
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `bool exist(vector<vector<char>>& board, string word) {
    int rows = board.size(), cols = board[0].size();
    function<bool(int,int,int)> dfs = [&](int r, int c, int k) -> bool {
        if (k == (int)word.size()) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[k]) return false;
        char tmp = board[r][c]; board[r][c] = '#';
        bool found = dfs(r+1,c,k+1)||dfs(r-1,c,k+1)||dfs(r,c+1,k+1)||dfs(r,c-1,k+1);
        board[r][c] = tmp;
        return found;
    };
    for (int r = 0; r < rows; r++)
        for (int c = 0; c < cols; c++)
            if (dfs(r, c, 0)) return true;
    return false;
}`,
      },
      {
        lang: "go",
        code: `func exist(board [][]byte, word string) bool {
    rows, cols := len(board), len(board[0])
    var dfs func(r, c, k int) bool
    dfs = func(r, c, k int) bool {
        if k == len(word) { return true }
        if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[k] { return false }
        tmp := board[r][c]; board[r][c] = '#'
        found := dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1)
        board[r][c] = tmp
        return found
    }
    for r := 0; r < rows; r++ {
        for c := 0; c < cols; c++ {
            if dfs(r, c, 0) { return true }
        }
    }
    return false
}`,
      },
      {
        lang: "php",
        code: `function exist(array &$board, string $word): bool {
    $rows = count($board); $cols = count($board[0]);
    $dfs = function(int $r, int $c, int $k) use (&$dfs, &$board, $word, $rows, $cols): bool {
        if ($k === strlen($word)) return true;
        if ($r < 0 || $r >= $rows || $c < 0 || $c >= $cols || $board[$r][$c] !== $word[$k])
            return false;
        $tmp = $board[$r][$c]; $board[$r][$c] = '#';
        $found = $dfs($r+1,$c,$k+1) || $dfs($r-1,$c,$k+1)
              || $dfs($r,$c+1,$k+1) || $dfs($r,$c-1,$k+1);
        $board[$r][$c] = $tmp;
        return $found;
    };
    for ($r = 0; $r < $rows; $r++)
        for ($c = 0; $c < $cols; $c++)
            if ($dfs($r, $c, 0)) return true;
    return false;
}`,
      },
      {
        lang: "kotlin",
        code: `fun exist(board: Array<CharArray>, word: String): Boolean {
    val rows = board.size; val cols = board[0].size
    fun dfs(r: Int, c: Int, k: Int): Boolean {
        if (k == word.length) return true
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[k]) return false
        val tmp = board[r][c]; board[r][c] = '#'
        val found = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1)
        board[r][c] = tmp
        return found
    }
    for (r in 0 until rows) for (c in 0 until cols) if (dfs(r, c, 0)) return true
    return false
}`,
      },
      {
        lang: "swift",
        code: `func exist(_ board: [[Character]], _ word: String) -> Bool {
    var board = board
    let word = Array(word), rows = board.count, cols = board[0].count
    func dfs(_ r: Int, _ c: Int, _ k: Int) -> Bool {
        if k == word.count { return true }
        if r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] != word[k] { return false }
        let tmp = board[r][c]; board[r][c] = "#"
        let found = dfs(r+1,c,k+1) || dfs(r-1,c,k+1) || dfs(r,c+1,k+1) || dfs(r,c-1,k+1)
        board[r][c] = tmp
        return found
    }
    for r in 0..<rows { for c in 0..<cols { if dfs(r, c, 0) { return true } } }
    return false
}`,
      },
    ],
  },

  "knights-tour": {
    id: "knights-tour",
    name: "Knight's Tour",
    displayName: { en: "Knight's Tour", zh: "骑士巡游" },
    category: "backtracking",
    difficulty: "expert",
    tags: ["backtracking", "matrix", "graph", "hamiltonian", "chess"],
    description: {
      en: "Find a sequence of moves for a chess knight to visit every square on an N×N board exactly once.",
      zh: "找到国际象棋中骑士在 N×N 棋盘上恰好经过每个格子一次的移动路径。",
    },
    timeComplexity: { best: "O(8^(n²))", average: "O(8^(n²))", worst: "O(8^(n²))" },
    spaceComplexity: "O(n²)",
    relatedProblems: [],
    snippets: [
      {
        lang: "javascript",
        code: `function knightsTour(n) {
  const board = Array.from({ length: n }, () => Array(n).fill(-1));
  const dx = [2, 1, -1, -2, -2, -1, 1, 2];
  const dy = [1, 2, 2, 1, -1, -2, -2, -1];
  board[0][0] = 0;
  function backtrack(x, y, move) {
    if (move === n * n) return true;
    // Warnsdorff: sort moves by onward degree
    const moves = [];
    for (let k = 0; k < 8; k++) {
      const nx = x + dx[k], ny = y + dy[k];
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] === -1) {
        let degree = 0;
        for (let j = 0; j < 8; j++) {
          const mx = nx + dx[j], my = ny + dy[j];
          if (mx >= 0 && mx < n && my >= 0 && my < n && board[mx][my] === -1) degree++;
        }
        moves.push([nx, ny, degree]);
      }
    }
    moves.sort((a, b) => a[2] - b[2]);
    for (const [nx, ny] of moves) {
      board[nx][ny] = move;
      if (backtrack(nx, ny, move + 1)) return true;
      board[nx][ny] = -1;
    }
    return false;
  }
  return backtrack(0, 0, 1) ? board : null;
}`,
      },
      {
        lang: "typescript",
        code: `function knightsTour(n: number): number[][] | null {
  const board: number[][] = Array.from({ length: n }, () => Array(n).fill(-1));
  const dx = [2, 1, -1, -2, -2, -1, 1, 2];
  const dy = [1, 2, 2, 1, -1, -2, -2, -1];
  board[0][0] = 0;
  function backtrack(x: number, y: number, move: number): boolean {
    if (move === n * n) return true;
    const moves: [number, number, number][] = [];
    for (let k = 0; k < 8; k++) {
      const nx = x + dx[k], ny = y + dy[k];
      if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] === -1) {
        let degree = 0;
        for (let j = 0; j < 8; j++) {
          const mx = nx + dx[j], my = ny + dy[j];
          if (mx >= 0 && mx < n && my >= 0 && my < n && board[mx][my] === -1) degree++;
        }
        moves.push([nx, ny, degree]);
      }
    }
    moves.sort((a, b) => a[2] - b[2]);
    for (const [nx, ny] of moves) {
      board[nx][ny] = move;
      if (backtrack(nx, ny, move + 1)) return true;
      board[nx][ny] = -1;
    }
    return false;
  }
  return backtrack(0, 0, 1) ? board : null;
}`,
      },
      {
        lang: "java",
        code: `public int[][] knightsTour(int n) {
    int[][] board = new int[n][n];
    for (int[] row : board) Arrays.fill(row, -1);
    int[] dx = {2,1,-1,-2,-2,-1,1,2};
    int[] dy = {1,2,2,1,-1,-2,-2,-1};
    board[0][0] = 0;
    return backtrack(board, 0, 0, 1, n, dx, dy) ? board : null;
}
private boolean backtrack(int[][] board, int x, int y, int move, int n, int[] dx, int[] dy) {
    if (move == n * n) return true;
    int[][] moves = new int[8][3];
    int cnt = 0;
    for (int k = 0; k < 8; k++) {
        int nx = x + dx[k], ny = y + dy[k];
        if (nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] == -1) {
            int deg = 0;
            for (int j = 0; j < 8; j++) {
                int mx = nx+dx[j], my = ny+dy[j];
                if (mx>=0&&mx<n&&my>=0&&my<n&&board[mx][my]==-1) deg++;
            }
            moves[cnt++] = new int[]{nx, ny, deg};
        }
    }
    Arrays.sort(moves, 0, cnt, (a, b) -> a[2] - b[2]);
    for (int i = 0; i < cnt; i++) {
        int nx = moves[i][0], ny = moves[i][1];
        board[nx][ny] = move;
        if (backtrack(board, nx, ny, move+1, n, dx, dy)) return true;
        board[nx][ny] = -1;
    }
    return false;
}`,
      },
      {
        lang: "python",
        code: `def knights_tour(n: int) -> list[list[int]] | None:
    board = [[-1] * n for _ in range(n)]
    dx = [2, 1, -1, -2, -2, -1, 1, 2]
    dy = [1, 2, 2, 1, -1, -2, -2, -1]
    board[0][0] = 0
    def degree(x, y):
        return sum(1 for k in range(8)
                   if 0 <= x+dx[k] < n and 0 <= y+dy[k] < n and board[x+dx[k]][y+dy[k]] == -1)
    def backtrack(x, y, move):
        if move == n * n: return True
        nexts = sorted(
            [(x+dx[k], y+dy[k]) for k in range(8)
             if 0 <= x+dx[k] < n and 0 <= y+dy[k] < n and board[x+dx[k]][y+dy[k]] == -1],
            key=lambda p: degree(p[0], p[1])
        )
        for nx, ny in nexts:
            board[nx][ny] = move
            if backtrack(nx, ny, move + 1): return True
            board[nx][ny] = -1
        return False
    return board if backtrack(0, 0, 1) else None`,
      },
      {
        lang: "rust",
        code: `fn knights_tour(n: usize) -> Option<Vec<Vec<i32>>> {
    let mut board = vec![vec![-1i32; n]; n];
    let dx: [isize; 8] = [2, 1, -1, -2, -2, -1, 1, 2];
    let dy: [isize; 8] = [1, 2, 2, 1, -1, -2, -2, -1];
    board[0][0] = 0;
    fn degree(board: &[Vec<i32>], x: isize, y: isize, n: usize,
              dx: &[isize; 8], dy: &[isize; 8]) -> usize {
        (0..8).filter(|&k| {
            let (nx, ny) = (x + dx[k], y + dy[k]);
            nx >= 0 && ny >= 0 && nx < n as isize && ny < n as isize
                && board[nx as usize][ny as usize] == -1
        }).count()
    }
    fn backtrack(board: &mut Vec<Vec<i32>>, x: isize, y: isize, mv: i32, n: usize,
                 dx: &[isize; 8], dy: &[isize; 8]) -> bool {
        if mv == (n * n) as i32 { return true; }
        let mut nexts: Vec<(isize, isize, usize)> = (0..8).filter_map(|k| {
            let (nx, ny) = (x + dx[k], y + dy[k]);
            if nx >= 0 && ny >= 0 && nx < n as isize && ny < n as isize
                && board[nx as usize][ny as usize] == -1 {
                Some((nx, ny, degree(board, nx, ny, n, dx, dy)))
            } else { None }
        }).collect();
        nexts.sort_by_key(|t| t.2);
        for (nx, ny, _) in nexts {
            board[nx as usize][ny as usize] = mv;
            if backtrack(board, nx, ny, mv + 1, n, dx, dy) { return true; }
            board[nx as usize][ny as usize] = -1;
        }
        false
    }
    if backtrack(&mut board, 0, 0, 1, n, &dx, &dy) { Some(board) } else { None }
}`,
      },
      {
        lang: "c",
        code: `#define N 8
int dx[8] = {2,1,-1,-2,-2,-1,1,2};
int dy[8] = {1,2,2,1,-1,-2,-2,-1};
int board[N][N];
int degree(int x, int y) {
    int cnt = 0;
    for (int k = 0; k < 8; k++) {
        int nx = x+dx[k], ny = y+dy[k];
        if (nx>=0&&nx<N&&ny>=0&&ny<N&&board[nx][ny]==-1) cnt++;
    }
    return cnt;
}
int backtrack(int x, int y, int move) {
    if (move == N*N) return 1;
    int nx[8], ny[8], deg[8], cnt = 0;
    for (int k = 0; k < 8; k++) {
        int mx = x+dx[k], my = y+dy[k];
        if (mx>=0&&mx<N&&my>=0&&my<N&&board[mx][my]==-1)
            { nx[cnt]=mx; ny[cnt]=my; deg[cnt]=degree(mx,my); cnt++; }
    }
    /* simple selection sort by degree */
    for (int i=0;i<cnt-1;i++) for (int j=i+1;j<cnt;j++)
        if (deg[j]<deg[i]) { int t; t=nx[i];nx[i]=nx[j];nx[j]=t;
            t=ny[i];ny[i]=ny[j];ny[j]=t; t=deg[i];deg[i]=deg[j];deg[j]=t; }
    for (int i = 0; i < cnt; i++) {
        board[nx[i]][ny[i]] = move;
        if (backtrack(nx[i], ny[i], move+1)) return 1;
        board[nx[i]][ny[i]] = -1;
    }
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `vector<vector<int>> knightsTour(int n) {
    vector<vector<int>> board(n, vector<int>(n, -1));
    vector<int> dx = {2,1,-1,-2,-2,-1,1,2};
    vector<int> dy = {1,2,2,1,-1,-2,-2,-1};
    auto deg = [&](int x, int y) {
        int cnt = 0;
        for (int k = 0; k < 8; k++) {
            int nx = x+dx[k], ny = y+dy[k];
            if (nx>=0&&nx<n&&ny>=0&&ny<n&&board[nx][ny]==-1) cnt++;
        }
        return cnt;
    };
    board[0][0] = 0;
    function<bool(int,int,int)> bt = [&](int x, int y, int mv) -> bool {
        if (mv == n*n) return true;
        vector<tuple<int,int,int>> nexts;
        for (int k = 0; k < 8; k++) {
            int nx = x+dx[k], ny = y+dy[k];
            if (nx>=0&&nx<n&&ny>=0&&ny<n&&board[nx][ny]==-1)
                nexts.emplace_back(deg(nx,ny),nx,ny);
        }
        sort(nexts.begin(), nexts.end());
        for (auto& [d, nx, ny] : nexts) {
            board[nx][ny] = mv;
            if (bt(nx, ny, mv+1)) return true;
            board[nx][ny] = -1;
        }
        return false;
    };
    bt(0, 0, 1);
    return board;
}`,
      },
      {
        lang: "go",
        code: `func knightsTour(n int) [][]int {
    board := make([][]int, n)
    for i := range board { board[i] = make([]int, n); for j := range board[i] { board[i][j] = -1 } }
    dx := []int{2, 1, -1, -2, -2, -1, 1, 2}
    dy := []int{1, 2, 2, 1, -1, -2, -2, -1}
    board[0][0] = 0
    degree := func(x, y int) int {
        cnt := 0
        for k := 0; k < 8; k++ {
            nx, ny := x+dx[k], y+dy[k]
            if nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] == -1 { cnt++ }
        }
        return cnt
    }
    type move struct{ x, y, deg int }
    var bt func(x, y, mv int) bool
    bt = func(x, y, mv int) bool {
        if mv == n*n { return true }
        var nexts []move
        for k := 0; k < 8; k++ {
            nx, ny := x+dx[k], y+dy[k]
            if nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] == -1 {
                nexts = append(nexts, move{nx, ny, degree(nx, ny)})
            }
        }
        sort.Slice(nexts, func(i, j int) bool { return nexts[i].deg < nexts[j].deg })
        for _, m := range nexts {
            board[m.x][m.y] = mv
            if bt(m.x, m.y, mv+1) { return true }
            board[m.x][m.y] = -1
        }
        return false
    }
    bt(0, 0, 1)
    return board
}`,
      },
      {
        lang: "php",
        code: `function knightsTour(int $n): ?array {
    $board = array_fill(0, $n, array_fill(0, $n, -1));
    $dx = [2,1,-1,-2,-2,-1,1,2]; $dy = [1,2,2,1,-1,-2,-2,-1];
    $board[0][0] = 0;
    $degree = function(int $x, int $y) use (&$board, $dx, $dy, $n): int {
        $cnt = 0;
        for ($k = 0; $k < 8; $k++) {
            $nx = $x+$dx[$k]; $ny = $y+$dy[$k];
            if ($nx>=0&&$nx<$n&&$ny>=0&&$ny<$n&&$board[$nx][$ny]==-1) $cnt++;
        }
        return $cnt;
    };
    $bt = function(int $x, int $y, int $mv) use (&$bt, &$board, $dx, $dy, $n, $degree): bool {
        if ($mv === $n * $n) return true;
        $nexts = [];
        for ($k = 0; $k < 8; $k++) {
            $nx = $x+$dx[$k]; $ny = $y+$dy[$k];
            if ($nx>=0&&$nx<$n&&$ny>=0&&$ny<$n&&$board[$nx][$ny]==-1)
                $nexts[] = [$nx, $ny, $degree($nx, $ny)];
        }
        usort($nexts, fn($a, $b) => $a[2] - $b[2]);
        foreach ($nexts as [$nx, $ny]) {
            $board[$nx][$ny] = $mv;
            if ($bt($nx, $ny, $mv+1)) return true;
            $board[$nx][$ny] = -1;
        }
        return false;
    };
    return $bt(0, 0, 1) ? $board : null;
}`,
      },
      {
        lang: "kotlin",
        code: `fun knightsTour(n: Int): Array<IntArray>? {
    val board = Array(n) { IntArray(n) { -1 } }
    val dx = intArrayOf(2,1,-1,-2,-2,-1,1,2)
    val dy = intArrayOf(1,2,2,1,-1,-2,-2,-1)
    board[0][0] = 0
    fun degree(x: Int, y: Int) = (0 until 8).count { k ->
        val nx = x+dx[k]; val ny = y+dy[k]
        nx in 0 until n && ny in 0 until n && board[nx][ny] == -1
    }
    fun backtrack(x: Int, y: Int, mv: Int): Boolean {
        if (mv == n * n) return true
        val nexts = (0 until 8).mapNotNull { k ->
            val nx = x+dx[k]; val ny = y+dy[k]
            if (nx in 0 until n && ny in 0 until n && board[nx][ny] == -1)
                Triple(nx, ny, degree(nx, ny)) else null
        }.sortedBy { it.third }
        for ((nx, ny, _) in nexts) {
            board[nx][ny] = mv
            if (backtrack(nx, ny, mv + 1)) return true
            board[nx][ny] = -1
        }
        return false
    }
    return if (backtrack(0, 0, 1)) board else null
}`,
      },
      {
        lang: "swift",
        code: `func knightsTour(_ n: Int) -> [[Int]]? {
    var board = Array(repeating: Array(repeating: -1, count: n), count: n)
    let dx = [2, 1, -1, -2, -2, -1, 1, 2]
    let dy = [1, 2, 2, 1, -1, -2, -2, -1]
    board[0][0] = 0
    func degree(_ x: Int, _ y: Int) -> Int {
        (0..<8).filter { k in
            let nx = x+dx[k], ny = y+dy[k]
            return nx >= 0 && nx < n && ny >= 0 && ny < n && board[nx][ny] == -1
        }.count
    }
    func backtrack(_ x: Int, _ y: Int, _ mv: Int) -> Bool {
        if mv == n * n { return true }
        let nexts = (0..<8).compactMap { k -> (Int, Int, Int)? in
            let nx = x+dx[k], ny = y+dy[k]
            guard nx >= 0, nx < n, ny >= 0, ny < n, board[nx][ny] == -1 else { return nil }
            return (nx, ny, degree(nx, ny))
        }.sorted { $0.2 < $1.2 }
        for (nx, ny, _) in nexts {
            board[nx][ny] = mv
            if backtrack(nx, ny, mv + 1) { return true }
            board[nx][ny] = -1
        }
        return false
    }
    return backtrack(0, 0, 1) ? board : nil
}`,
      },
    ],
  },
}

// ─── Implementations ──────────────────────────────────────────────────────────

export function permutations(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const arr = [...recorder.values]
  const n = arr.length

  function backtrack(start: number): void {
    if (start === n) {
      // Mark the completed permutation
      recorder.mark(
        Array.from({ length: n }, (_, i) => i),
        "sorted"
      )
      return
    }
    for (let i = start; i < n; i++) {
      // Swap arr[start] with arr[i] and mirror into recorder
      recorder.write(start, arr[i] ?? 0)
      recorder.write(i, arr[start] ?? 0)
      const tmp = arr[start] ?? 0
      arr[start] = arr[i] ?? 0
      arr[i] = tmp

      recorder.mark([start], "active")
      backtrack(start + 1)

      // Undo swap
      recorder.write(start, arr[i] ?? 0)
      recorder.write(i, arr[start] ?? 0)
      const tmp2 = arr[start] ?? 0
      arr[start] = arr[i] ?? 0
      arr[i] = tmp2
    }
  }

  backtrack(0)
  return recorder.finish(backtrackingAlgorithms["permutations"] as AlgorithmMeta)
}

export function subsets(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const n = input.length

  function backtrack(start: number, depth: number): void {
    // Mark the current subset window
    if (depth > 0) {
      recorder.mark(
        Array.from({ length: depth }, (_, i) => i),
        "candidate"
      )
    }
    for (let i = start; i < n; i++) {
      recorder.mark([i], "active")
      backtrack(i + 1, depth + 1)
      recorder.mark([i], "visited")
    }
  }

  backtrack(0, 0)
  return recorder.finish(backtrackingAlgorithms["subsets"] as AlgorithmMeta)
}

export function combinationSum(input: number[]): AlgorithmRun {
  // Convention: last element of input is the target, rest are candidates
  const target = input[input.length - 1] ?? 0
  const candidates = [...input.slice(0, -1)].sort((a, b) => a - b)
  const recorder = new ArrayTraceRecorder(input)

  function backtrack(start: number, remaining: number, depth: number): void {
    if (remaining === 0) {
      recorder.mark(
        Array.from({ length: depth }, (_, i) => i),
        "sorted"
      )
      return
    }
    for (let i = start; i < candidates.length; i++) {
      if ((candidates[i] ?? 0) > remaining) break
      recorder.write(depth, candidates[i] ?? 0)
      recorder.mark([i], "active")
      backtrack(i, remaining - (candidates[i] ?? 0), depth + 1)
      recorder.mark([i], "visited")
    }
  }

  backtrack(0, target, 0)
  return recorder.finish(backtrackingAlgorithms["combination-sum"] as AlgorithmMeta)
}

// ─── N-Queens ────────────────────────────────────────────────────────────────
// Input: [n] — board size. Visualise column placement per row as array writes.
function nQueens(input: number[]): AlgorithmRun {
  const n = Math.max(1, Math.min(input[0] ?? 6, 8))
  const board = new Array<number>(n).fill(-1) // board[row] = col of queen
  const rec = new ArrayTraceRecorder(board)

  function isSafe(row: number, col: number): boolean {
    for (let r = 0; r < row; r++) {
      const c = board[r] ?? -1
      if (c === col || Math.abs(c - col) === row - r) return false
    }
    return true
  }

  function solve(row: number): boolean {
    if (row === n) return true
    for (let col = 0; col < n; col++) {
      rec.compareValue(row, col, row, col)
      if (isSafe(row, col)) {
        board[row] = col
        rec.write(row, col)
        rec.mark([row], "active")
        if (solve(row + 1)) {
          rec.mark([row], "sorted")
          return true
        }
        board[row] = -1
        rec.write(row, -1)
        rec.mark([row], "visited")
      }
    }
    return false
  }

  solve(0)
  return rec.finish(backtrackingAlgorithms["n-queens"] as AlgorithmMeta)
}

// ─── Sudoku Solver ────────────────────────────────────────────────────────────
// Input: 81-element array (9×9 board), 0 = empty. Visualise writes as solver fills cells.
function sudokuSolver(input: number[]): AlgorithmRun {
  const board =
    input.length === 81
      ? [...input]
      : [
          5, 3, 0, 0, 7, 0, 0, 0, 0, 6, 0, 0, 1, 9, 5, 0, 0, 0, 0, 9, 8, 0, 0, 0, 0, 6, 0, 8, 0, 0, 0, 6, 0, 0, 0, 3, 4,
          0, 0, 8, 0, 3, 0, 0, 1, 7, 0, 0, 0, 2, 0, 0, 0, 6, 0, 6, 0, 0, 0, 0, 2, 8, 0, 0, 0, 0, 4, 1, 9, 0, 0, 5, 0, 0,
          0, 0, 8, 0, 0, 7, 9,
        ]
  const rec = new ArrayTraceRecorder([...board])

  function isValid(pos: number, val: number): boolean {
    const row = Math.floor(pos / 9),
      col = pos % 9
    for (let i = 0; i < 9; i++) {
      if ((board[row * 9 + i] ?? 0) === val) return false
      if ((board[i * 9 + col] ?? 0) === val) return false
    }
    const br = Math.floor(row / 3) * 3,
      bc = Math.floor(col / 3) * 3
    for (let dr = 0; dr < 3; dr++)
      for (let dc = 0; dc < 3; dc++) if ((board[(br + dr) * 9 + bc + dc] ?? 0) === val) return false
    return true
  }

  function solve(): boolean {
    const pos = board.indexOf(0)
    if (pos === -1) return true
    for (let v = 1; v <= 9; v++) {
      rec.compareValue(pos, 0, v, board[pos] ?? 0)
      if (isValid(pos, v)) {
        board[pos] = v
        rec.write(pos, v)
        rec.mark([pos], "active")
        if (solve()) {
          rec.mark([pos], "sorted")
          return true
        }
        board[pos] = 0
        rec.write(pos, 0)
        rec.mark([pos], "visited")
      }
    }
    return false
  }

  solve()
  return rec.finish(backtrackingAlgorithms["sudoku-solver"] as AlgorithmMeta)
}

// ─── Word Search ──────────────────────────────────────────────────────────────
// Input: flat grid values + word as char codes. Visualise DFS search on grid.
function wordSearch(input: number[]): AlgorithmRun {
  // Default: 4×4 grid with a word to find
  const sep = input.indexOf(-1)
  const gridFlat = sep > 0 ? input.slice(0, sep) : [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]
  const word = sep > 0 ? input.slice(sep + 1) : [1, 6, 2]
  const rows = Math.round(Math.sqrt(gridFlat.length))
  const cols = Math.ceil(gridFlat.length / rows)
  const rec = new ArrayTraceRecorder([...gridFlat])

  const visited = new Array<boolean>(gridFlat.length).fill(false)
  const dirs = [-cols, cols, -1, 1]

  function dfs(pos: number, depth: number): boolean {
    if (depth === word.length) return true
    if (pos < 0 || pos >= gridFlat.length || visited[pos]) return false
    if ((gridFlat[pos] ?? -1) !== (word[depth] ?? -2)) {
      rec.compareValue(pos, depth, gridFlat[pos] ?? 0, word[depth] ?? 0)
      rec.mark([pos], "visited")
      return false
    }
    rec.mark([pos], "active")
    visited[pos] = true
    for (const d of dirs) {
      const next = pos + d
      if (d === -1 && pos % cols === 0) continue
      if (d === 1 && pos % cols === cols - 1) continue
      if (dfs(next, depth + 1)) {
        rec.mark([pos], "sorted")
        return true
      }
    }
    visited[pos] = false
    rec.mark([pos], "visited")
    return false
  }

  for (let i = 0; i < gridFlat.length; i++) dfs(i, 0)
  return rec.finish(backtrackingAlgorithms["word-search"] as AlgorithmMeta)
}

// ─── Knight's Tour ────────────────────────────────────────────────────────────
// Input: [n] — board size. Visualise moves sequence on flattened n×n board.
function knightsTour(input: number[]): AlgorithmRun {
  const n = Math.max(3, Math.min(input[0] ?? 5, 6))
  const board = new Array<number>(n * n).fill(-1)
  board[0] = 0
  const rec = new ArrayTraceRecorder([...board])

  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ]

  function degree(r: number, c: number): number {
    return moves.filter(([dr, dc]) => {
      const nr = r + (dr ?? 0),
        nc = c + (dc ?? 0)
      return nr >= 0 && nr < n && nc >= 0 && nc < n && (board[nr * n + nc] ?? -1) === -1
    }).length
  }

  function solve(r: number, c: number, step: number): boolean {
    if (step === n * n) return true
    // Warnsdorff heuristic: pick neighbour with fewest onward moves
    const nexts = moves
      .map(([dr, dc]) => ({ nr: r + (dr ?? 0), nc: c + (dc ?? 0) }))
      .filter(({ nr, nc }) => nr >= 0 && nr < n && nc >= 0 && nc < n && (board[nr * n + nc] ?? -1) === -1)
      .sort((a, b) => degree(a.nr, a.nc) - degree(b.nr, b.nc))

    for (const { nr, nc } of nexts) {
      const pos = nr * n + nc
      board[pos] = step
      rec.write(pos, step)
      rec.mark([pos], "active")
      if (solve(nr, nc, step + 1)) {
        rec.mark([pos], "sorted")
        return true
      }
      board[pos] = -1
      rec.write(pos, -1)
      rec.mark([pos], "visited")
    }
    return false
  }

  solve(0, 0, 1)
  return rec.finish(backtrackingAlgorithms["knights-tour"] as AlgorithmMeta)
}

// ─── Runner ───────────────────────────────────────────────────────────────────

export function runBacktrackingAlgorithm(algorithmId: BacktrackingAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "permutations":
      return permutations(input)
    case "subsets":
      return subsets(input)
    case "combination-sum":
      return combinationSum(input)
    case "n-queens":
      return nQueens(input)
    case "sudoku-solver":
      return sudokuSolver(input)
    case "word-search":
      return wordSearch(input)
    case "knights-tour":
      return knightsTour(input)
  }
}
