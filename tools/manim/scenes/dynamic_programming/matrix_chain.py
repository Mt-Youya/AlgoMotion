from manim import *
from ...base import AlgoScene, DPTable


class MatrixChain(AlgoScene):
    TITLE = "Matrix Chain Multiplication"
    SUBTITLE = "Find the most efficient way to multiply a chain of matrices."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro & Problem Setup ──────────────────────────────────
        self.chapter_title("The Problem")

        intro_text = VGroup(
            Text("Given a chain of matrices A₁, A₂, ..., Aₙ", font_size=28),
            Text("Find the optimal parenthesization to minimize", font_size=28),
            Text("the total number of scalar multiplications.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.5)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(1.5)

        # Show example matrices with dimensions
        dims_label = Text("Example: dims = [10, 30, 5, 60]", font_size=26, color=YELLOW)
        dims_label.next_to(intro_text, DOWN, buff=0.5)
        self.play(Write(dims_label))
        self.wait(1)

        matrix_labels = VGroup(
            VGroup(
                Rectangle(width=0.8, height=1.2, color=BLUE),
                Text("A₁\n10×30", font_size=18),
            ).arrange(DOWN, buff=0.1),
            VGroup(
                Rectangle(width=1.2, height=0.8, color=GREEN),
                Text("A₂\n30×5", font_size=18),
            ).arrange(DOWN, buff=0.1),
            VGroup(
                Rectangle(width=0.8, height=1.2, color=RED),
                Text("A₃\n5×60", font_size=18),
            ).arrange(DOWN, buff=0.1),
        ).arrange(RIGHT, buff=0.8).move_to(DOWN * 1.5)

        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in matrix_labels], lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(dims_label), FadeOut(matrix_labels))

        # ── Stage 2: Naive vs Optimal Parenthesization ──────────────────────
        self.chapter_title("Why Order Matters")

        order_title = Text("Two ways to parenthesize (A₁ · A₂) · A₃ vs A₁ · (A₂ · A₃)", font_size=24, color=WHITE)
        order_title.move_to(UP * 2.8)
        self.play(Write(order_title))
        self.wait(0.5)

        left_group = VGroup(
            Text("(A₁·A₂)·A₃", font_size=26, color=BLUE),
            Text("= (10×30×5) + (10×5×60)", font_size=22),
            Text("= 1500 + 3000 = 4500 ops", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.25).move_to(LEFT * 3 + UP * 0.5)

        right_group = VGroup(
            Text("A₁·(A₂·A₃)", font_size=26, color=RED),
            Text("= (30×5×60) + (10×30×60)", font_size=22),
            Text("= 9000 + 18000 = 27000 ops", font_size=22, color=RED),
        ).arrange(DOWN, buff=0.25).move_to(RIGHT * 3 + UP * 0.5)

        self.play(FadeIn(left_group, shift=LEFT * 0.3), FadeIn(right_group, shift=RIGHT * 0.3))
        self.wait(1)

        winner = Text("Optimal order can be 6× faster!", font_size=28, color=YELLOW)
        winner.move_to(DOWN * 2)
        self.play(Write(winner))
        self.wait(2)
        self.play(FadeOut(order_title), FadeOut(left_group), FadeOut(right_group), FadeOut(winner))

        # ── Stage 3: DP Recurrence ───────────────────────────────────────────
        self.chapter_title("Dynamic Programming Recurrence")

        recurrence_lines = VGroup(
            Text("dp[i][j] = min cost to multiply matrices i through j", font_size=22, color=WHITE),
            Text("Base case: dp[i][i] = 0  (single matrix, no ops)", font_size=22, color=YELLOW),
            Text("Recurrence:", font_size=22, color=WHITE),
            Text("dp[i][j] = min over k in [i, j-1] of:", font_size=22, color=BLUE),
            Text("  dp[i][k] + dp[k+1][j] + p[i-1]·p[k]·p[j]", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        for line in recurrence_lines:
            self.play(Write(line), run_time=0.7)
            self.wait(0.3)
        self.wait(2)
        self.play(FadeOut(recurrence_lines))

        # ── Stage 4: DP Table Fill Visualization ────────────────────────────
        self.chapter_title("Filling the DP Table")

        n = 4  # 4 matrices → dims has 5 elements
        dims = [10, 30, 5, 60, 20]

        # Build dp table data
        dp = [[0] * n for _ in range(n)]
        # chain length 2
        dp[0][1] = dims[0] * dims[1] * dims[2]   # 10*30*5 = 1500
        dp[1][2] = dims[1] * dims[2] * dims[3]   # 30*5*60 = 9000
        dp[2][3] = dims[2] * dims[3] * dims[4]   # 5*60*20 = 6000
        # chain length 3
        dp[0][2] = min(dp[0][0] + dp[1][2] + dims[0]*dims[1]*dims[3],
                       dp[0][1] + dp[2][2] + dims[0]*dims[2]*dims[3])
        dp[1][3] = min(dp[1][1] + dp[2][3] + dims[1]*dims[2]*dims[4],
                       dp[1][2] + dp[3][3] + dims[1]*dims[3]*dims[4])
        # chain length 4
        dp[0][3] = min(
            dp[0][0] + dp[1][3] + dims[0]*dims[1]*dims[4],
            dp[0][1] + dp[2][3] + dims[0]*dims[2]*dims[4],
            dp[0][2] + dp[3][3] + dims[0]*dims[3]*dims[4],
        )

        cell_size = 1.0
        table_group = VGroup()
        cells = [[None] * n for _ in range(n)]

        for i in range(n):
            for j in range(n):
                rect = Square(side_length=cell_size, stroke_color=WHITE, stroke_width=1.5)
                rect.move_to(RIGHT * (j - n / 2 + 0.5) * cell_size + UP * (-(i - n / 2 + 0.5) * cell_size))
                if i > j:
                    rect.set_fill(GREY_D, opacity=0.5)
                    label = Text("—", font_size=16, color=GREY)
                elif i == j:
                    rect.set_fill(BLUE_E, opacity=0.5)
                    label = Text("0", font_size=16, color=YELLOW)
                else:
                    rect.set_fill(BLACK, opacity=0.3)
                    label = Text(str(dp[i][j]), font_size=14, color=WHITE)
                label.move_to(rect.get_center())
                cells[i][j] = VGroup(rect, label)
                table_group.add(cells[i][j])

        row_labels = VGroup(*[
            Text(f"i={i}", font_size=18, color=GREY_A).next_to(
                cells[i][0][0], LEFT, buff=0.2
            ) for i in range(n)
        ])
        col_labels = VGroup(*[
            Text(f"j={j}", font_size=18, color=GREY_A).next_to(
                cells[0][j][0], UP, buff=0.2
            ) for j in range(n)
        ])

        self.play(FadeIn(table_group), FadeIn(row_labels), FadeIn(col_labels))
        self.wait(1)

        # Animate diagonal fills
        fill_order = [(0, 1), (1, 2), (2, 3), (0, 2), (1, 3), (0, 3)]
        colors_by_len = {1: BLUE, 2: GREEN, 3: ORANGE}

        for (i, j) in fill_order:
            chain_len = j - i
            color = colors_by_len.get(chain_len, RED)
            highlight = cells[i][j][0].copy().set_fill(color, opacity=0.7)
            self.play(Transform(cells[i][j][0], highlight), run_time=0.5)
            self.wait(0.4)

        self.wait(1.5)
        self.play(FadeOut(table_group), FadeOut(row_labels), FadeOut(col_labels))

        # ── Stage 5: Traceback / Optimal Parenthesization ───────────────────
        self.chapter_title("Traceback: Optimal Splits")

        traceback_text = VGroup(
            Text("Store the split point s[i][j] = k that gave minimum cost", font_size=22),
            Text("Reconstruct the optimal parenthesization recursively:", font_size=22),
            Text("  optimal(i, j):", font_size=20, color=YELLOW),
            Text("    if i == j: return 'A' + str(i+1)", font_size=20, color=GREEN),
            Text("    k = s[i][j]", font_size=20, color=GREEN),
            Text("    return '(' + optimal(i,k) + '·' + optimal(k+1,j) + ')'", font_size=20, color=GREEN),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        for line in traceback_text:
            self.play(Write(line), run_time=0.6)
            self.wait(0.2)
        self.wait(1.5)

        result_box = SurroundingRectangle(
            Text("Result: ((A₁·A₂)·(A₃·A₄))", font_size=26, color=YELLOW).move_to(DOWN * 2.5),
            color=YELLOW, buff=0.2,
        )
        result_label = Text("Result: ((A₁·A₂)·(A₃·A₄))", font_size=26, color=YELLOW).move_to(DOWN * 2.5)
        self.play(Write(result_label), Create(result_box))
        self.wait(2)
        self.play(FadeOut(traceback_text), FadeOut(result_label), FadeOut(result_box))

        # ── Stage 6: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n³)",
            space_complexity="O(n²)",
        )
        self.wait(2)
