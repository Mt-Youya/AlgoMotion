"""N-Queens — Manim scene for AlgoMotion.

Visualizes the N-Queens backtracking algorithm on a 4x4 chessboard.
Stages:
  1. Introduction
  2. Chessboard Setup
  3. Column-by-column queen placement
  4. Backtracking demonstration
  5. First complete solution reveal
  6. Complexity card
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
)

from ...base import AlgoScene

# ── Palette aliases ───────────────────────────────────────────────────────────
COBALT = "#2255CC"
SIGNAL = "#CEEB5A"
CORAL  = "#E05A3A"
MIST   = "#DDE4F0"
INK    = "#1A1C2C"
PAPER  = "#F5F0E8"
GRAY_C = "#888899"

CELL_LIGHT = "#F0EBE0"
CELL_DARK  = "#C8BFA8"
QUEEN_CLR  = COBALT
ATTACK_CLR = "#FFAAAA"
SAFE_CLR   = "#AAFFAA"
PLACED_CLR = SIGNAL


N = 4          # board size
CELL_SIZE = 1.0


def _board_origin() -> tuple[float, float, float]:
    """Top-left corner so board is centred."""
    offset = (N * CELL_SIZE) / 2 - CELL_SIZE / 2
    return (-offset, offset, 0)


def _cell_center(row: int, col: int):
    ox, oy, _ = _board_origin()
    return (ox + col * CELL_SIZE, oy - row * CELL_SIZE, 0)


class _Chessboard(VGroup):
    """4×4 chessboard built from Square mobjects."""

    def __init__(self):
        super().__init__()
        self.cells: list[list[Square]] = []
        for r in range(N):
            row_cells = []
            for c in range(N):
                color = CELL_LIGHT if (r + c) % 2 == 0 else CELL_DARK
                cell = Square(
                    side_length=CELL_SIZE,
                    fill_color=color,
                    fill_opacity=1,
                    stroke_color=INK,
                    stroke_width=1.5,
                )
                cell.move_to(_cell_center(r, c))
                row_cells.append(cell)
                self.add(cell)
            self.cells.append(row_cells)


def _queen_symbol(color: str = QUEEN_CLR) -> Text:
    return Text("♛", font_size=38, color=color)


def _is_safe(board: list[int], row: int, col: int) -> bool:
    for r in range(row):
        c = board[r]
        if c == col or abs(c - col) == abs(r - row):
            return False
    return True


def _solve_nqueens(n: int):
    """Yield (action, row, col) events: 'place', 'remove', 'solution'."""
    board = [-1] * n

    def bt(row):
        if row == n:
            yield ("solution", -1, -1, list(board))
            return
        for col in range(n):
            if _is_safe(board, row, col):
                board[row] = col
                yield ("place", row, col, None)
                yield from bt(row + 1)
                board[row] = -1
                yield ("remove", row, col, None)

    yield from bt(0)


class NQueens(AlgoScene):
    TITLE    = "N-Queens"
    SUBTITLE = "Place N queens on an NxN chessboard so no two threaten each other."
    CATEGORY = "backtracking"

    def build(self):
        # ── Stage 1: Introduction ─────────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        desc = Text(
            "Given an N×N chessboard, place N queens\n"
            "so that no two queens share a row, column,\n"
            "or diagonal.",
            font_size=30,
            color=INK,
            line_spacing=1.3,
        ).move_to(ORIGIN)
        self.play(FadeIn(desc))
        self.wait(2.5)
        self.play(FadeOut(desc), FadeOut(intro_label))
        self.wait(0.2)

        # ── Stage 2: Chessboard Setup ─────────────────────────────────────────
        setup_label = self.chapter_title("Board Setup (4×4)")
        self.wait(0.3)

        board_mob = _Chessboard()
        board_mob.move_to(ORIGIN)
        self.play(Create(board_mob, run_time=1.2))
        self.wait(0.5)

        # Label rows and columns
        row_labels = VGroup()
        col_labels = VGroup()
        for i in range(N):
            r_lbl = Text(str(i), font_size=22, color=GRAY_C)
            r_lbl.next_to(board_mob.cells[i][0], LEFT, buff=0.18)
            row_labels.add(r_lbl)

            c_lbl = Text(str(i), font_size=22, color=GRAY_C)
            c_lbl.next_to(board_mob.cells[0][i], UP, buff=0.18)
            col_labels.add(c_lbl)

        self.play(FadeIn(row_labels), FadeIn(col_labels))
        self.wait(1.2)
        self.play(FadeOut(setup_label))

        # ── Stage 3: Constraint Explanation ──────────────────────────────────
        constraint_label = self.chapter_title("Attack Constraints")
        self.wait(0.3)

        # Place a sample queen at (0,1) and highlight its attack zones
        demo_queen = _queen_symbol(QUEEN_CLR)
        demo_queen.move_to(_cell_center(0, 1))
        self.play(FadeIn(demo_queen))
        self.wait(0.4)

        attack_overlays = VGroup()
        for r in range(N):
            for c in range(N):
                if r == 0 and c == 1:
                    continue
                attacked = (
                    r == 0          # same row
                    or c == 1       # same col
                    or abs(r - 0) == abs(c - 1)  # diagonal
                )
                if attacked:
                    overlay = Square(
                        side_length=CELL_SIZE * 0.9,
                        fill_color=ATTACK_CLR,
                        fill_opacity=0.55,
                        stroke_width=0,
                    ).move_to(_cell_center(r, c))
                    attack_overlays.add(overlay)

        self.play(FadeIn(attack_overlays, run_time=0.8))
        caption_atk = self.caption("Red cells are under attack — queens cannot be placed there.")
        self.wait(2.0)
        self.play(FadeOut(attack_overlays), FadeOut(demo_queen), FadeOut(caption_atk))
        self.wait(0.2)
        self.play(FadeOut(constraint_label))

        # ── Stage 4: Backtracking Walkthrough ────────────────────────────────
        bt_label = self.chapter_title("Backtracking Step-by-Step")
        self.wait(0.3)

        placed_queens: dict[int, Text] = {}   # row -> queen mobject
        attack_cells: dict[int, VGroup] = {}  # row -> attack overlays for that queen

        events = list(_solve_nqueens(N))
        # Only animate until first solution (keeps scene concise)
        first_sol_idx = next(i for i, e in enumerate(events) if e[0] == "solution")
        events_to_show = events[: first_sol_idx + 1]

        for action, row, col, solution in events_to_show:
            if action == "place":
                # Show attack overlays for this queen
                overlays = VGroup()
                for r2 in range(N):
                    for c2 in range(N):
                        if r2 == row and c2 == col:
                            continue
                        attacked = (
                            r2 == row
                            or c2 == col
                            or abs(r2 - row) == abs(c2 - col)
                        )
                        if attacked:
                            ov = Square(
                                side_length=CELL_SIZE * 0.88,
                                fill_color=ATTACK_CLR,
                                fill_opacity=0.35,
                                stroke_width=0,
                            ).move_to(_cell_center(r2, c2))
                            overlays.add(ov)
                attack_cells[row] = overlays

                queen_mob = _queen_symbol(QUEEN_CLR)
                queen_mob.move_to(_cell_center(row, col))
                placed_queens[row] = queen_mob

                self.play(
                    FadeIn(overlays, run_time=0.25),
                    FadeIn(queen_mob, run_time=0.35),
                )
                self.wait(0.3)

            elif action == "remove":
                queen_mob = placed_queens.pop(row, None)
                overlays = attack_cells.pop(row, None)
                anims = []
                if queen_mob:
                    anims.append(FadeOut(queen_mob, run_time=0.3))
                if overlays:
                    anims.append(FadeOut(overlays, run_time=0.3))
                if anims:
                    self.play(*anims)
                self.wait(0.15)

            elif action == "solution":
                # Highlight all placed queens green
                solution_queens = list(placed_queens.values())
                self.play(*[
                    q.animate.set_color(PLACED_CLR)
                    for q in solution_queens
                ], run_time=0.5)
                self.wait(0.3)

        sol_caption = self.caption("First valid solution found! All queens placed safely.")
        self.wait(2.0)
        self.play(FadeOut(sol_caption))
        self.wait(0.2)
        self.play(FadeOut(bt_label))

        # ── Stage 5: Solution Summary ─────────────────────────────────────────
        summary_label = self.chapter_title("Solution Found")
        self.wait(0.3)

        # Fade out attack overlays, keep queens
        all_overlays = VGroup(*attack_cells.values())
        if all_overlays:
            self.play(FadeOut(all_overlays, run_time=0.5))

        # Highlight each queen with a flash
        for q in placed_queens.values():
            self.play(Indicate(q, color=SIGNAL, scale_factor=1.4, run_time=0.4))

        count_text = Text(
            f"4×4 board has 2 distinct solutions",
            font_size=26,
            color=COBALT,
        ).next_to(board_mob, DOWN, buff=0.55)
        self.play(FadeIn(count_text))
        self.wait(2.0)

        # Clean up board
        self.play(
            FadeOut(board_mob),
            FadeOut(row_labels),
            FadeOut(col_labels),
            FadeOut(count_text),
            FadeOut(VGroup(*placed_queens.values())),
            FadeOut(summary_label),
            run_time=0.7,
        )
        self.wait(0.2)

        # ── Stage 6: Complexity Card ──────────────────────────────────────────
        comp_label = self.chapter_title("Complexity Analysis")
        self.wait(0.3)

        card = self.complexity_card(
            time_best=r"O(N!)",
            time_avg=r"O(N!)",
            time_worst=r"O(N!)",
            space=r"O(N)",
        )
        self.wait(0.8)

        note = Text(
            "Pruning reduces constant factor significantly.\n"
            "Space O(N) for the recursion stack + board array.",
            font_size=24,
            color=GRAY_C,
            line_spacing=1.3,
        ).next_to(card, DOWN, buff=0.45)
        self.play(FadeIn(note))
        self.wait(3.0)
        self.play(FadeOut(card), FadeOut(note), FadeOut(comp_label))
        self.wait(0.2)
