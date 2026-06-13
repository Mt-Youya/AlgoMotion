"""Sudoku Solver — AlgoMotion Manim scene.

Visualises the backtracking algorithm that fills a 9x9 Sudoku board
so every row, column, and 3x3 box contains digits 1-9 exactly once.
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    ORIGIN,
    FadeIn,
    FadeOut,
    Write,
    Text,
    MathTex,
    VGroup,
    Rectangle,
    Square,
    Line,
    Create,
    Transform,
    Indicate,
    Flash,
    SurroundingRectangle,
    Arrow,
    BulletedList,
    Dot,
)

from ...base import AlgoScene
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, MIST, INK, GRAY, PAPER,
    C_ACTIVE, C_SORTED, C_DEFAULT, C_BG,
)

# ── colour aliases ─────────────────────────────────────────────────────────────
CELL_GIVEN   = "#1A1C2C"   # pre-filled clue cells
CELL_FILL    = "#2255CC"   # algorithm-placed digits
CELL_TRY     = "#F0A030"   # digit being tried
CELL_FAIL    = "#E05A3A"   # digit that leads to conflict
CELL_EMPTY   = "#888899"   # empty placeholder
CELL_BG      = "#F5F0E8"
BOX_STROKE   = "#1A1C2C"
THIN_STROKE  = "#CCCCCC"
BOX_FILL     = "#FFFFFF"


# ── compact 4x4 puzzle used for the visual (easier to animate) ─────────────────
# 0 = empty.  Uses a 4x4 grid so it fits on screen clearly.
PUZZLE_4 = [
    [1, 0, 3, 0],
    [0, 4, 0, 2],
    [4, 0, 2, 0],
    [0, 3, 0, 1],
]

SOLUTION_4 = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [4, 1, 2, 3],
    [2, 3, 4, 1],
]


def _build_grid(puzzle: list[list[int]], cell_size: float = 0.9) -> VGroup:
    """Return a VGroup of Squares + digit labels for the given 4x4 puzzle."""
    n = len(puzzle)
    group = VGroup()
    for r in range(n):
        for c in range(n):
            sq = Square(
                side_length=cell_size,
                color=THIN_STROKE,
                fill_color=BOX_FILL,
                fill_opacity=1,
                stroke_width=1.5,
            )
            sq.move_to([c * cell_size, -r * cell_size, 0])
            group.add(sq)
            val = puzzle[r][c]
            if val != 0:
                lbl = Text(
                    str(val),
                    font_size=28,
                    color=CELL_GIVEN,
                    weight="BOLD",
                ).move_to(sq.get_center())
                group.add(lbl)
    # draw thick 2x2 box borders
    half = n // 2
    for br in range(half):
        for bc in range(half):
            box = Rectangle(
                width=cell_size * half,
                height=cell_size * half,
                color=BOX_STROKE,
                stroke_width=3,
                fill_opacity=0,
            )
            box.move_to([
                (bc * half + half / 2 - 0.5) * cell_size,
                -(br * half + half / 2 - 0.5) * cell_size,
                0,
            ])
            group.add(box)
    group.move_to(ORIGIN)
    return group


class SudokuSolver(AlgoScene):
    TITLE    = "Sudoku Solver"
    SUBTITLE = "Fill a 9x9 Sudoku board so every row, column, and 3x3 box contains digits 1-9 ex"
    CATEGORY = "backtracking"

    # ── helpers ────────────────────────────────────────────────────────────────

    def _cell_square(self, r: int, c: int, grid_group: VGroup, cell_size: float = 0.9) -> Square:
        """Return the Square mobject for cell (r, c) from grid_group."""
        idx = (r * 4 + c) * 2  # each cell contributes sq + label (given) or just sq
        return grid_group[r * 4 + c]

    def _make_cell_label(
        self,
        text: str,
        sq: Square,
        color: str = CELL_FILL,
        font_size: int = 28,
    ) -> Text:
        lbl = Text(text, font_size=font_size, color=color, weight="BOLD")
        lbl.move_to(sq.get_center())
        return lbl

    # ── build ──────────────────────────────────────────────────────────────────

    def build(self) -> None:

        # ══════════════════════════════════════════════════════════════════════
        # Stage 1 — Problem Introduction
        # ══════════════════════════════════════════════════════════════════════
        ch1 = self.chapter_title("The Sudoku Problem")

        intro_lines = VGroup(
            Text("Fill every empty cell with a digit 1–9", font_size=26, color=INK),
            Text("such that each row, column, and 3×3 box", font_size=26, color=INK),
            Text("contains every digit exactly once.", font_size=26, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        intro_lines.next_to(ch1, DOWN, buff=0.6)

        self.play(FadeIn(intro_lines, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(ch1))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 2 — Show the Puzzle Board (4x4 simplified)
        # ══════════════════════════════════════════════════════════════════════
        ch2 = self.chapter_title("The Puzzle Board (4×4 Demo)")

        # build a flat list of squares for easy access
        n = 4
        cell_size = 1.0
        squares: list[list[Square]] = []
        labels:  list[list[Text | None]] = []
        all_mobs = VGroup()

        for r in range(n):
            row_sq = []
            row_lb = []
            for c in range(n):
                sq = Square(
                    side_length=cell_size,
                    color=THIN_STROKE,
                    fill_color=BOX_FILL,
                    fill_opacity=1,
                    stroke_width=1.5,
                )
                sq.move_to([c * cell_size - 1.5, -r * cell_size + 1.5, 0])
                all_mobs.add(sq)
                row_sq.append(sq)

                val = PUZZLE_4[r][c]
                if val != 0:
                    lbl = Text(
                        str(val),
                        font_size=30,
                        color=CELL_GIVEN,
                        weight="BOLD",
                    ).move_to(sq.get_center())
                    all_mobs.add(lbl)
                    row_lb.append(lbl)
                else:
                    row_lb.append(None)

            squares.append(row_sq)
            labels.append(row_lb)

        # thick 2x2 box outlines
        box_lines = VGroup()
        for br in range(2):
            for bc in range(2):
                box = Rectangle(
                    width=cell_size * 2,
                    height=cell_size * 2,
                    color=BOX_STROKE,
                    stroke_width=3.5,
                    fill_opacity=0,
                )
                box.move_to([
                    (bc * 2 + 0.5) * cell_size - 1.5,
                    -(br * 2 + 0.5) * cell_size + 1.5,
                    0,
                ])
                box_lines.add(box)

        board_group = VGroup(all_mobs, box_lines)
        board_group.move_to(LEFT * 2.5)

        self.play(Create(all_mobs, run_time=1.2), Create(box_lines, run_time=0.6))
        self.wait(1)

        # label the constraints
        constraint_text = VGroup(
            Text("Constraints:", font_size=22, color=INK, weight="BOLD"),
            Text("• Each row: digits 1–4 once", font_size=20, color=COBALT),
            Text("• Each column: digits 1–4 once", font_size=20, color=COBALT),
            Text("• Each 2×2 box: digits 1–4 once", font_size=20, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        constraint_text.move_to(RIGHT * 2.8)

        self.play(FadeIn(constraint_text, shift=LEFT * 0.2))
        self.wait(2)
        self.play(FadeOut(constraint_text), FadeOut(ch2))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 3 — Backtracking Strategy
        # ══════════════════════════════════════════════════════════════════════
        ch3 = self.chapter_title("Backtracking Strategy")

        strategy = VGroup(
            Text("1. Find the next empty cell.", font_size=24, color=INK),
            Text("2. Try digits 1, 2, 3, … in order.", font_size=24, color=INK),
            Text("3. If the digit is valid → place it, recurse.", font_size=24, color=COBALT),
            Text("4. If recursion fails → remove digit (backtrack).", font_size=24, color=CORAL),
            Text("5. If no digit works → return False (dead end).", font_size=24, color=CORAL),
            Text("6. If no empty cell remains → puzzle solved!", font_size=24, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        strategy.move_to(RIGHT * 1.0)

        self.play(FadeIn(strategy, shift=UP * 0.2))
        self.wait(3)
        self.play(FadeOut(strategy), FadeOut(ch3))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 4 — Animated Solve: Try & Place
        # ══════════════════════════════════════════════════════════════════════
        ch4 = self.chapter_title("Algorithm in Action — Placing Digits")

        # We animate solving the 4x4 board step by step
        # Simulate the backtracking trace manually for a clean animation
        placed_labels: dict[tuple[int, int], Text] = {}

        def get_sq(r: int, c: int) -> Square:
            return squares[r][c]

        def try_digit(r: int, c: int, digit: int, success: bool) -> None:
            sq = get_sq(r, c)
            color = CELL_TRY if success else CELL_FAIL
            lbl = Text(str(digit), font_size=30, color=color, weight="BOLD")
            lbl.move_to(sq.get_center())
            self.play(
                sq.animate.set_fill(
                    "#FFF3CC" if success else "#FFE8E5", opacity=1
                ),
                FadeIn(lbl, scale=0.7),
                run_time=0.35,
            )
            self.wait(0.15)
            if success:
                # keep it; recolor to placed
                placed_lbl = Text(str(digit), font_size=30, color=CELL_FILL, weight="BOLD")
                placed_lbl.move_to(sq.get_center())
                self.play(
                    Transform(lbl, placed_lbl),
                    sq.animate.set_fill(BOX_FILL, opacity=1),
                    run_time=0.3,
                )
                placed_labels[(r, c)] = lbl
            else:
                self.play(
                    FadeOut(lbl),
                    sq.animate.set_fill(BOX_FILL, opacity=1),
                    run_time=0.3,
                )

        def backtrack_cell(r: int, c: int) -> None:
            sq = get_sq(r, c)
            if (r, c) in placed_labels:
                lbl = placed_labels.pop((r, c))
                self.play(
                    FadeOut(lbl),
                    sq.animate.set_fill("#FFE8E5", opacity=1),
                    run_time=0.3,
                )
                self.play(sq.animate.set_fill(BOX_FILL, opacity=1), run_time=0.2)

        # Animate key steps of the solve (hand-crafted trace for clarity)
        solve_steps = [
            # (row, col, digit, success)
            (0, 1, 1, False),  # row 0 already has 1 → fail
            (0, 1, 2, True),   # place 2
            (0, 3, 1, False),  # row 0 has 1 → fail
            (0, 3, 4, True),   # place 4
            (1, 0, 1, False),  # col 0 has 1 → fail
            (1, 0, 2, False),  # box has 2 → fail
            (1, 0, 3, True),   # place 3
            (1, 2, 1, True),   # place 1
            (2, 1, 1, True),   # place 1
            (2, 3, 3, True),   # place 3
            (3, 0, 2, True),   # place 2
            (3, 2, 4, True),   # place 4
        ]

        for r, c, d, ok in solve_steps:
            try_digit(r, c, d, ok)

        self.wait(1.5)
        self.play(FadeOut(ch4))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 5 — Highlight Solved Board
        # ══════════════════════════════════════════════════════════════════════
        ch5 = self.chapter_title("Puzzle Solved!")

        # Flash all cells green
        all_squares_flat = [squares[r][c] for r in range(4) for c in range(4)]
        self.play(
            *[sq.animate.set_fill(SIGNAL, opacity=0.35) for sq in all_squares_flat],
            run_time=0.7,
        )
        self.wait(0.5)
        self.play(
            *[sq.animate.set_fill(BOX_FILL, opacity=1) for sq in all_squares_flat],
            run_time=0.5,
        )

        solved_text = Text(
            "Every row, column & box satisfied ✓",
            font_size=26,
            color=COBALT,
        )
        solved_text.next_to(board_group, RIGHT, buff=1.5)
        self.play(FadeIn(solved_text))
        self.wait(2)
        self.play(FadeOut(solved_text), FadeOut(ch5))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 6 — Validity Check Explained
        # ══════════════════════════════════════════════════════════════════════
        ch6 = self.chapter_title("is_valid() Check")

        valid_code = VGroup(
            Text("def is_valid(board, row, col, num):", font_size=20, color=INK),
            Text("    # check row", font_size=18, color=GRAY),
            Text("    if num in board[row]: return False", font_size=20, color=COBALT),
            Text("    # check column", font_size=18, color=GRAY),
            Text("    if num in [board[r][col] for r in range(N)]:", font_size=20, color=COBALT),
            Text("        return False", font_size=20, color=COBALT),
            Text("    # check box", font_size=18, color=GRAY),
            Text("    br, bc = 3*(row//3), 3*(col//3)", font_size=20, color=COBALT),
            Text("    for r in range(br, br+3):", font_size=20, color=COBALT),
            Text("        for c in range(bc, bc+3):", font_size=20, color=COBALT),
            Text("            if board[r][c] == num: return False", font_size=20, color=CORAL),
            Text("    return True", font_size=20, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        valid_code.scale(0.85)
        valid_code.move_to(RIGHT * 2.0)

        bg = Rectangle(
            width=valid_code.width + 0.5,
            height=valid_code.height + 0.4,
            fill_color=MIST,
            fill_opacity=1,
            stroke_color=COBALT,
            stroke_width=2,
        )
        bg.move_to(valid_code.get_center())

        self.play(FadeIn(bg), FadeIn(valid_code))
        self.wait(3)
        self.play(FadeOut(bg), FadeOut(valid_code), FadeOut(ch6))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 7 — Backtracking Visualised (undo step)
        # ══════════════════════════════════════════════════════════════════════
        ch7 = self.chapter_title("Backtracking — Undoing Bad Choices")

        # Highlight a placed cell, show it's wrong, then undo
        demo_sq = squares[0][1]
        demo_lbl = placed_labels.get((0, 1))

        if demo_lbl:
            self.play(Indicate(demo_sq, color=CORAL, scale_factor=1.3), run_time=0.6)
            self.wait(0.3)

        backtrack_note = VGroup(
            Text("When a dead end is reached:", font_size=24, color=INK),
            Text("• Remove the last placed digit", font_size=22, color=CORAL),
            Text("• Try the next candidate", font_size=22, color=COBALT),
            Text("• Continue recursively", font_size=22, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        backtrack_note.move_to(RIGHT * 2.8)

        self.play(FadeIn(backtrack_note))
        self.wait(2.5)
        self.play(FadeOut(backtrack_note), FadeOut(ch7))
        self.wait(0.2)

        # ══════════════════════════════════════════════════════════════════════
        # Stage 8 — Complexity Card
        # ══════════════════════════════════════════════════════════════════════
        self.play(FadeOut(board_group))
        self.wait(0.3)

        ch8 = self.chapter_title("Time & Space Complexity")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(1)",
            time_avg=r"O(9^{81})",
            time_worst=r"O(9^{81})",
            space=r"O(81) = O(1)",
        )

        complexity_note = VGroup(
            Text("In practice, constraint propagation prunes", font_size=22, color=GRAY),
            Text("the search tree drastically — most puzzles", font_size=22, color=GRAY),
            Text("solve in microseconds.", font_size=22, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        complexity_note.to_edge(DOWN, buff=0.6)

        self.play(FadeIn(complexity_note))
        self.wait(3)
        self.play(FadeOut(complexity_note), FadeOut(ch8))
        self.wait(0.5)
