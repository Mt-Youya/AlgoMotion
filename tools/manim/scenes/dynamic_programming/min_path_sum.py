from manim import *
from ...base import AlgoScene, DPTable


class MinPathSum(AlgoScene):
    TITLE = "Minimum Path Sum"
    SUBTITLE = "Path with minimum sum from top-left to bottom-right in a grid."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        grid_values = [
            [1, 3, 1],
            [1, 5, 1],
            [4, 2, 1],
        ]
        ROWS, COLS = 3, 3
        CELL_SIZE = 0.9

        problem_text = Text(
            "Find the path from top-left to bottom-right\n"
            "that minimizes the total sum.\n"
            "You can only move right or down.",
            font_size=24,
            color=WHITE,
        ).to_edge(UP, buff=1.2)
        self.play(FadeIn(problem_text))
        self.wait(1.5)
        self.play(FadeOut(problem_text))

        # ── Stage 2: Draw the input grid ────────────────────────────────────
        self.chapter_title("Input Grid")

        def make_grid(values, color=BLUE_D):
            group = VGroup()
            for r in range(ROWS):
                for c in range(COLS):
                    cell = Square(side_length=CELL_SIZE, color=color, fill_opacity=0.15)
                    cell.move_to(
                        RIGHT * (c - (COLS - 1) / 2) * CELL_SIZE
                        + DOWN * (r - (ROWS - 1) / 2) * CELL_SIZE
                    )
                    label = Text(str(values[r][c]), font_size=28, color=WHITE)
                    label.move_to(cell.get_center())
                    group.add(VGroup(cell, label))
            return group

        input_grid = make_grid(grid_values)
        input_grid.shift(LEFT * 3)
        input_grid_label = Text("Input Grid", font_size=22, color=YELLOW).next_to(
            input_grid, UP, buff=0.3
        )

        self.play(FadeIn(input_grid_label), LaggedStart(*[FadeIn(c) for c in input_grid], lag_ratio=0.08))
        self.wait(1)

        arrow_right = Arrow(LEFT * 0.3, RIGHT * 0.3, color=GREEN, buff=0)
        arrow_down = Arrow(UP * 0.3, DOWN * 0.3, color=GREEN, buff=0)
        move_label = VGroup(
            arrow_right.copy().scale(0.8).shift(RIGHT * 2.5 + UP * 0.5),
            Text("right", font_size=18, color=GREEN).shift(RIGHT * 3.2 + UP * 0.5),
            arrow_down.copy().scale(0.8).shift(RIGHT * 2.5 + DOWN * 0.2),
            Text("down", font_size=18, color=GREEN).shift(RIGHT * 3.2 + DOWN * 0.2),
        )
        self.play(FadeIn(move_label))
        self.wait(1.5)
        self.play(FadeOut(move_label))

        # ── Stage 3: DP Table initialization ────────────────────────────────
        self.chapter_title("DP Table Initialization")

        dp = [[0] * COLS for _ in range(ROWS)]
        dp[0][0] = grid_values[0][0]
        for c in range(1, COLS):
            dp[0][c] = dp[0][c - 1] + grid_values[0][c]
        for r in range(1, ROWS):
            dp[r][0] = dp[r - 1][0] + grid_values[r][0]

        dp_grid_mobs = VGroup()
        dp_cells = {}
        for r in range(ROWS):
            for c in range(COLS):
                cell = Square(side_length=CELL_SIZE, color=PURPLE_D, fill_opacity=0.15)
                cell.move_to(
                    RIGHT * (c - (COLS - 1) / 2) * CELL_SIZE + DOWN * (r - (ROWS - 1) / 2) * CELL_SIZE
                )
                cell.shift(RIGHT * 3)
                label = Text("?", font_size=28, color=GREY)
                label.move_to(cell.get_center())
                dp_cells[(r, c)] = label
                dp_grid_mobs.add(VGroup(cell, label))

        dp_label = Text("DP Table", font_size=22, color=YELLOW).next_to(dp_grid_mobs, UP, buff=0.3)
        self.play(FadeIn(dp_label), LaggedStart(*[FadeIn(c) for c in dp_grid_mobs], lag_ratio=0.06))
        self.wait(0.8)

        # Fill first cell
        new_label = Text(str(dp[0][0]), font_size=28, color=GREEN)
        new_label.move_to(dp_cells[(0, 0)].get_center())
        self.play(Transform(dp_cells[(0, 0)], new_label))
        self.wait(0.5)

        # Fill first row
        for c in range(1, COLS):
            nl = Text(str(dp[0][c]), font_size=28, color=ORANGE)
            nl.move_to(dp_cells[(0, c)].get_center())
            self.play(Transform(dp_cells[(0, c)], nl), run_time=0.5)
        self.wait(0.5)

        # Fill first column
        for r in range(1, ROWS):
            nl = Text(str(dp[r][0]), font_size=28, color=ORANGE)
            nl.move_to(dp_cells[(r, 0)].get_center())
            self.play(Transform(dp_cells[(r, 0)], nl), run_time=0.5)
        self.wait(1)

        # ── Stage 4: DP recurrence fill ─────────────────────────────────────
        self.chapter_title("Fill DP Table: dp[r][c] = grid[r][c] + min(dp[r-1][c], dp[r][c-1])")

        for r in range(1, ROWS):
            for c in range(1, COLS):
                dp[r][c] = grid_values[r][c] + min(dp[r - 1][c], dp[r][c - 1])
                nl = Text(str(dp[r][c]), font_size=28, color=TEAL)
                nl.move_to(dp_cells[(r, c)].get_center())
                self.play(
                    dp_grid_mobs[(r * COLS + c)][0].animate.set_fill(TEAL, opacity=0.3),
                    Transform(dp_cells[(r, c)], nl),
                    run_time=0.6,
                )
                self.wait(0.3)

        self.wait(1)

        # ── Stage 5: Trace optimal path ─────────────────────────────────────
        self.chapter_title("Trace the Optimal Path")

        # Backtrack from (ROWS-1, COLS-1)
        path = []
        r, c = ROWS - 1, COLS - 1
        while r > 0 or c > 0:
            path.append((r, c))
            if r == 0:
                c -= 1
            elif c == 0:
                r -= 1
            elif dp[r - 1][c] < dp[r][c - 1]:
                r -= 1
            else:
                c -= 1
        path.append((0, 0))
        path.reverse()

        for pr, pc in path:
            cell_mob = dp_grid_mobs[(pr * COLS + pc)][0]
            self.play(
                cell_mob.animate.set_fill(YELLOW, opacity=0.6).set_stroke(YELLOW, width=3),
                run_time=0.4,
            )
        self.wait(0.5)

        answer_text = Text(
            f"Minimum Path Sum = {dp[ROWS-1][COLS-1]}",
            font_size=30,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.8)
        self.play(Write(answer_text))
        self.wait(1.5)

        # ── Stage 6: Space optimization note ────────────────────────────────
        self.chapter_title("Space Optimization: Use 1D Array")

        self.play(FadeOut(answer_text), FadeOut(input_grid), FadeOut(input_grid_label))

        opt_text = VGroup(
            Text("Instead of a full 2D dp table,", font_size=24, color=WHITE),
            Text("we can use a single 1D array of size COLS.", font_size=24, color=WHITE),
            Text("At each row, update in place from left to right.", font_size=24, color=WHITE),
            Text("Space: O(n) instead of O(m*n)", font_size=24, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).center()

        self.play(LaggedStart(*[FadeIn(t) for t in opt_text], lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(opt_text))

        # ── Stage 7: Complexity card ─────────────────────────────────────────
        self.play(FadeOut(dp_label), FadeOut(dp_grid_mobs))
        self.complexity_card(
            time_complexity="O(m × n)",
            space_complexity="O(m × n)  or  O(n) optimized",
        )
        self.wait(2)
