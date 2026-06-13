"""Knight's Tour — Manim scene for AlgoMotion.

Visualizes the Knight's Tour backtracking algorithm on a 5x5 chessboard.
Stages:
  1. Introduction
  2. Chessboard Setup & Knight Movement Rules
  3. Move Ordering (Warnsdorff's Heuristic Explanation)
  4. Backtracking Walkthrough (first N moves animated)
  5. Complete Tour Reveal
  6. Complexity Card
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    ORIGIN,
    BLACK,
    WHITE,
    YELLOW,
    GREEN,
    RED,
    GRAY,
    BLUE,
    ORANGE,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Rectangle,
    Square,
    Text,
    VGroup,
    Write,
    Transform,
    Indicate,
    AnimationGroup,
    Arrow,
    Line,
    Circle,
    Dot,
    Flash,
    CurvedArrow,
    ArcBetweenPoints,
    Tex,
)
import numpy as np

from ...base import AlgoScene

# ── Palette ───────────────────────────────────────────────────────────────────
COBALT    = "#2255CC"
SIGNAL    = "#CEEB5A"
CORAL     = "#E05A3A"
MIST      = "#DDE4F0"
INK       = "#1A1C2C"
PAPER     = "#F5F0E8"
GRAY_C    = "#888899"
TEAL      = "#2AA198"
AMBER     = "#CB9B00"

CELL_LIGHT  = "#F0EBE0"
CELL_DARK   = "#C8BFA8"
KNIGHT_CLR  = COBALT
VISITED_CLR = "#A8D8A8"
CURRENT_CLR = SIGNAL
PATH_CLR    = TEAL
NUM_CLR     = INK

N = 5          # board size
CELL_SIZE = 0.85


def _board_origin() -> tuple[float, float, float]:
    offset = (N * CELL_SIZE) / 2 - CELL_SIZE / 2
    return (-offset, offset, 0)


def _cell_center(row: int, col: int):
    ox, oy, _ = _board_origin()
    return (ox + col * CELL_SIZE, oy - row * CELL_SIZE, 0)


class _Chessboard(VGroup):
    """NxN chessboard built from Square mobjects."""

    def __init__(self, n: int = N, cell_size: float = CELL_SIZE):
        super().__init__()
        self.n = n
        self.cell_size = cell_size
        self.cells: list[list[Square]] = []
        for r in range(n):
            row_cells = []
            for c in range(n):
                color = CELL_LIGHT if (r + c) % 2 == 0 else CELL_DARK
                cell = Square(
                    side_length=cell_size,
                    fill_color=color,
                    fill_opacity=1,
                    stroke_color=INK,
                    stroke_width=1.5,
                )
                cell.move_to(_cell_center(r, c))
                row_cells.append(cell)
                self.add(cell)
            self.cells.append(row_cells)


# ── Knight's Tour solver (Warnsdorff's heuristic) ────────────────────────────
KNIGHT_MOVES = [
    (-2, -1), (-2, 1), (-1, -2), (-1, 2),
    ( 1, -2), ( 1, 2), ( 2, -1), ( 2, 1),
]


def _valid_moves(board: list[list[int]], r: int, c: int, n: int):
    moves = []
    for dr, dc in KNIGHT_MOVES:
        nr, nc = r + dr, c + dc
        if 0 <= nr < n and 0 <= nc < n and board[nr][nc] == -1:
            moves.append((nr, nc))
    return moves


def _warnsdorff_degree(board: list[list[int]], r: int, c: int, n: int) -> int:
    return len(_valid_moves(board, r, c, n))


def _solve_knights_tour(n: int, start_r: int = 0, start_c: int = 0):
    """Return the sequence of (row, col) for a complete knight's tour using
    Warnsdorff's heuristic, or None if not found."""
    board = [[-1] * n for _ in range(n)]
    path = [(start_r, start_c)]
    board[start_r][start_c] = 0
    r, c = start_r, start_c

    for move_num in range(1, n * n):
        candidates = _valid_moves(board, r, c, n)
        if not candidates:
            return None
        # Warnsdorff: pick the move with fewest onward moves
        candidates.sort(key=lambda pos: _warnsdorff_degree(board, pos[0], pos[1], n))
        r, c = candidates[0]
        board[r][c] = move_num
        path.append((r, c))

    return path


class KnightsTour(AlgoScene):
    TITLE    = "Knight's Tour"
    SUBTITLE = "Find moves for a chess knight to visit every square exactly once."
    CATEGORY = "backtracking"

    def build(self):
        # ── Stage 1: Introduction ─────────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        desc = Text(
            "A knight must visit every square on an N×N\n"
            "chessboard exactly once, following standard\n"
            "chess knight movement rules.",
            font_size=28,
            color=INK,
            line_spacing=1.4,
        ).move_to(ORIGIN)
        self.play(FadeIn(desc))
        self.wait(2.5)
        self.play(FadeOut(desc), FadeOut(intro_label))
        self.wait(0.2)

        # ── Stage 2: Board Setup & Knight Movement ────────────────────────────
        setup_label = self.chapter_title("Knight Movement Rules")
        self.wait(0.3)

        board_mob = _Chessboard()
        board_mob.shift(LEFT * 2.2)
        self.play(Create(board_mob, run_time=1.0))
        self.wait(0.3)

        # Place knight at (2,2) — center of 5x5
        knight_sym = Text("♞", font_size=36, color=KNIGHT_CLR)
        demo_r, demo_c = 2, 2
        knight_pos = np.array(_cell_center(demo_r, demo_c)) + np.array(LEFT * 2.2)
        knight_sym.move_to(knight_pos)
        self.play(FadeIn(knight_sym))
        self.wait(0.3)

        # Show all 8 possible knight moves from center
        move_dots = VGroup()
        move_arrows = VGroup()
        for dr, dc in KNIGHT_MOVES:
            nr, nc = demo_r + dr, demo_c + dc
            if 0 <= nr < N and 0 <= nc < N:
                target = np.array(_cell_center(nr, nc)) + np.array(LEFT * 2.2)
                dot = Dot(point=target, radius=0.12, color=CORAL)
                move_dots.add(dot)

        self.play(FadeIn(move_dots, run_time=0.6))

        move_caption = self.caption(
            "A knight moves in an L-shape: 2 squares in one direction, 1 in the other."
        )
        self.wait(2.0)

        # Right panel: L-shape diagram
        l_label = Text("L-Shape Move", font_size=22, color=COBALT).move_to(RIGHT * 2.8 + UP * 1.5)
        l_text = Text(
            "2 squares\n+ 1 square\n= 8 possible\ndirections",
            font_size=20,
            color=INK,
            line_spacing=1.3,
        ).move_to(RIGHT * 2.8)
        self.play(FadeIn(l_label), FadeIn(l_text))
        self.wait(1.5)

        self.play(
            FadeOut(move_dots), FadeOut(knight_sym),
            FadeOut(move_caption), FadeOut(l_label), FadeOut(l_text),
            FadeOut(board_mob), FadeOut(setup_label),
        )
        self.wait(0.2)

        # ── Stage 3: Warnsdorff's Heuristic ──────────────────────────────────
        heuristic_label = self.chapter_title("Warnsdorff's Heuristic")
        self.wait(0.3)

        heuristic_text = Text(
            "Warnsdorff's Rule:\nAlways move the knight to the square\n"
            "from which it has the FEWEST onward moves.\n\n"
            "This greedy heuristic dramatically reduces\n"
            "backtracking on large boards.",
            font_size=26,
            color=INK,
            line_spacing=1.4,
        ).move_to(ORIGIN)
        self.play(FadeIn(heuristic_text))
        self.wait(3.0)
        self.play(FadeOut(heuristic_text), FadeOut(heuristic_label))
        self.wait(0.2)

        # ── Stage 4: Backtracking Walkthrough ────────────────────────────────
        walk_label = self.chapter_title("Tour in Progress (5×5)")
        self.wait(0.3)

        board2 = _Chessboard()
        board2.move_to(ORIGIN)
        self.play(Create(board2, run_time=0.8))
        self.wait(0.3)

        # Solve from (0, 0)
        tour = _solve_knights_tour(N, 0, 0)

        # Animate first 15 moves step by step, then fast-forward
        step_labels: list[Text] = []
        knight_mob = Text("♞", font_size=32, color=KNIGHT_CLR)
        knight_mob.move_to(_cell_center(tour[0][0], tour[0][1]))
        self.play(FadeIn(knight_mob))

        # Color starting cell
        board2.cells[tour[0][0]][tour[0][1]].set_fill(CURRENT_CLR, opacity=1)
        num_label = Text("1", font_size=16, color=NUM_CLR)
        num_label.move_to(_cell_center(tour[0][0], tour[0][1]))
        self.play(FadeIn(num_label))
        step_labels.append(num_label)
        self.wait(0.3)

        slow_steps = min(12, len(tour))
        for i in range(1, slow_steps):
            prev_r, prev_c = tour[i - 1]
            curr_r, curr_c = tour[i]

            # Mark previous cell as visited
            board2.cells[prev_r][prev_c].set_fill(VISITED_CLR, opacity=1)

            # Move knight
            new_pos = _cell_center(curr_r, curr_c)
            self.play(knight_mob.animate.move_to(new_pos), run_time=0.45)

            # Highlight current cell
            board2.cells[curr_r][curr_c].set_fill(CURRENT_CLR, opacity=1)

            # Step number
            n_lbl = Text(str(i + 1), font_size=16, color=NUM_CLR)
            n_lbl.move_to(new_pos)
            self.play(FadeIn(n_lbl), run_time=0.2)
            step_labels.append(n_lbl)
            self.wait(0.25)

        step_caption = self.caption(
            f"Move {slow_steps}: knight follows Warnsdorff's rule at each step."
        )
        self.wait(1.5)
        self.play(FadeOut(step_caption))
        self.wait(0.2)
        self.play(FadeOut(walk_label))

        # ── Stage 5: Complete Tour Reveal ─────────────────────────────────────
        reveal_label = self.chapter_title("Complete Tour (All 25 Squares)")
        self.wait(0.3)

        # Fast-forward remaining moves
        for i in range(slow_steps, len(tour)):
            prev_r, prev_c = tour[i - 1]
            curr_r, curr_c = tour[i]
            board2.cells[prev_r][prev_c].set_fill(VISITED_CLR, opacity=1)
            new_pos = _cell_center(curr_r, curr_c)
            knight_mob.move_to(new_pos)
            board2.cells[curr_r][curr_c].set_fill(CURRENT_CLR, opacity=1)
            n_lbl = Text(str(i + 1), font_size=16, color=NUM_CLR)
            n_lbl.move_to(new_pos)
            step_labels.append(n_lbl)
            self.add(n_lbl)

        # Add remaining labels all at once
        self.wait(0.5)

        # Final cell also visited
        last_r, last_c = tour[-1]
        board2.cells[last_r][last_c].set_fill(VISITED_CLR, opacity=1)
        self.play(FadeOut(knight_mob), run_time=0.4)

        complete_text = Text(
            "All 25 squares visited!",
            font_size=28,
            color=COBALT,
        ).next_to(board2, DOWN, buff=0.5)
        self.play(FadeIn(complete_text))
        self.wait(0.4)

        # Flash the board
        for r in range(N):
            for c in range(N):
                self.play(
                    Indicate(board2.cells[r][c], color=SIGNAL, scale_factor=1.1, run_time=0.05)
                )

        self.wait(2.0)

        # Clean up
        all_labels = VGroup(*step_labels)
        self.play(
            FadeOut(board2),
            FadeOut(all_labels),
            FadeOut(complete_text),
            FadeOut(reveal_label),
            run_time=0.7,
        )
        self.wait(0.2)

        # ── Stage 6: Complexity Card ──────────────────────────────────────────
        comp_label = self.chapter_title("Complexity Analysis")
        self.wait(0.3)

        card = self.complexity_card(
            time_best=r"O(N^2)",
            time_avg=r"O(N^2)",
            time_worst=r"O(N^{2.5})",
            space=r"O(N^2)",
        )
        self.wait(0.8)

        note = Text(
            "Warnsdorff's heuristic solves most boards in O(N²) time.\n"
            "Brute-force backtracking is O(8^(N²)) in the worst case.\n"
            "Space O(N²) to store the visited board state.",
            font_size=22,
            color=GRAY_C,
            line_spacing=1.3,
        ).next_to(card, DOWN, buff=0.45)
        self.play(FadeIn(note))
        self.wait(3.5)
        self.play(FadeOut(card), FadeOut(note), FadeOut(comp_label))
        self.wait(0.2)
