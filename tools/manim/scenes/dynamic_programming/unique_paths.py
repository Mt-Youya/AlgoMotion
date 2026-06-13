from manim import *
from ...base import AlgoScene, DPTable


class UniquePaths(AlgoScene):
    TITLE = "Unique Paths"
    SUBTITLE = "Count unique paths from top-left to bottom-right in a grid."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        rows, cols = 3, 4
        cell_size = 0.85

        grid_group = VGroup()
        cells = [[None] * cols for _ in range(rows)]

        for r in range(rows):
            for c in range(cols):
                rect = Square(side_length=cell_size, color=BLUE_E, fill_opacity=0.15)
                rect.move_to(RIGHT * c * cell_size + DOWN * r * cell_size)
                cells[r][c] = rect
                grid_group.add(rect)

        grid_group.move_to(ORIGIN)

        start_label = Text("S", font_size=28, color=GREEN).move_to(cells[0][0].get_center())
        end_label = Text("E", font_size=28, color=RED).move_to(cells[rows - 1][cols - 1].get_center())

        self.play(Create(grid_group), run_time=1.2)
        self.play(FadeIn(start_label), FadeIn(end_label))
        self.wait(1)

        move_desc = VGroup(
            Text("Only move: RIGHT or DOWN", font_size=24, color=YELLOW),
            Text(f"Grid size: {rows} x {cols}", font_size=22, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(move_desc))
        self.wait(1.5)

        # ── Stage 2: Show one valid path ────────────────────────────────────
        self.chapter_title("Example Path")

        path_cells = [(0, 0), (0, 1), (0, 2), (0, 3), (1, 3), (2, 3)]
        path_highlights = VGroup()
        for r, c in path_cells:
            highlight = cells[r][c].copy().set_fill(GREEN, opacity=0.45).set_stroke(GREEN, width=3)
            path_highlights.add(highlight)

        self.play(LaggedStart(*[FadeIn(h) for h in path_highlights], lag_ratio=0.25), run_time=1.5)
        self.wait(1)

        path_note = Text("One valid path (right×3, down×2)", font_size=22, color=GREEN).to_edge(DOWN, buff=0.4)
        self.play(FadeOut(move_desc), FadeIn(path_note))
        self.wait(1.2)
        self.play(FadeOut(path_highlights), FadeOut(path_note))

        # ── Stage 3: DP Recurrence ──────────────────────────────────────────
        self.chapter_title("DP Recurrence")

        formula = MathTex(
            r"dp[r][c] = dp[r-1][c] + dp[r][c-1]",
            font_size=36,
            color=YELLOW,
        ).to_edge(UP, buff=1.2)
        base_case = MathTex(
            r"dp[0][c] = 1,\quad dp[r][0] = 1",
            font_size=30,
            color=TEAL,
        ).next_to(formula, DOWN, buff=0.3)

        self.play(Write(formula))
        self.play(Write(base_case))
        self.wait(1.5)

        # ── Stage 4: Fill DP Table row by row ───────────────────────────────
        self.chapter_title("Filling the DP Table")

        dp = [[0] * cols for _ in range(rows)]
        for r in range(rows):
            dp[r][0] = 1
        for c in range(cols):
            dp[0][c] = 1
        for r in range(1, rows):
            for c in range(1, cols):
                dp[r][c] = dp[r - 1][c] + dp[r][c - 1]

        value_labels = [[None] * cols for _ in range(rows)]

        # Fill first row
        for c in range(cols):
            lbl = Text(str(dp[0][c]), font_size=26, color=TEAL).move_to(cells[0][c].get_center())
            value_labels[0][c] = lbl
            fill = cells[0][c].copy().set_fill(TEAL, opacity=0.35)
            self.play(FadeIn(fill), Write(lbl), run_time=0.3)

        self.wait(0.5)

        # Fill first column
        for r in range(1, rows):
            lbl = Text(str(dp[r][0]), font_size=26, color=TEAL).move_to(cells[r][0].get_center())
            value_labels[r][0] = lbl
            fill = cells[r][0].copy().set_fill(TEAL, opacity=0.35)
            self.play(FadeIn(fill), Write(lbl), run_time=0.3)

        self.wait(0.5)

        # Fill rest
        for r in range(1, rows):
            for c in range(1, cols):
                top_highlight = cells[r - 1][c].copy().set_stroke(YELLOW, width=4)
                left_highlight = cells[r][c - 1].copy().set_stroke(YELLOW, width=4)
                self.play(FadeIn(top_highlight), FadeIn(left_highlight), run_time=0.25)

                lbl = Text(str(dp[r][c]), font_size=26, color=WHITE).move_to(cells[r][c].get_center())
                value_labels[r][c] = lbl
                fill = cells[r][c].copy().set_fill(BLUE, opacity=0.45)
                self.play(FadeIn(fill), Write(lbl), FadeOut(top_highlight), FadeOut(left_highlight), run_time=0.4)

        self.wait(1.5)

        # ── Stage 5: Highlight answer ────────────────────────────────────────
        self.chapter_title("Answer")

        answer_box = cells[rows - 1][cols - 1].copy().set_fill(RED, opacity=0.55).set_stroke(RED, width=5)
        answer_text = Text(f"Answer: {dp[rows-1][cols-1]}", font_size=34, color=RED).to_edge(DOWN, buff=0.5)

        self.play(FadeIn(answer_box), run_time=0.5)
        self.play(Write(answer_text))
        self.wait(1.5)

        self.play(
            FadeOut(grid_group),
            FadeOut(start_label),
            FadeOut(end_label),
            FadeOut(formula),
            FadeOut(base_case),
            FadeOut(answer_box),
            FadeOut(answer_text),
            *[FadeOut(value_labels[r][c]) for r in range(rows) for c in range(cols) if value_labels[r][c]],
        )

        # ── Stage 6: Space-optimized 1-D DP ─────────────────────────────────
        self.chapter_title("Space Optimization: 1-D DP")

        opt_note = VGroup(
            Text("Instead of a full 2-D table,", font_size=26),
            Text("keep only one row of length cols.", font_size=26, color=YELLOW),
            MathTex(r"dp[c] \mathrel{+}= dp[c-1]", font_size=32, color=TEAL),
            Text("Space: O(cols) instead of O(rows × cols)", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(m) for m in opt_note], lag_ratio=0.3), run_time=1.5)
        self.wait(2)
        self.play(FadeOut(opt_note))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(m × n)",
            space_complexity="O(n)",
        )
        self.wait(2)
