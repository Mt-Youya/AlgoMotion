from manim import *
from ...base import AlgoScene, ArrayVis


class Fibonacci(AlgoScene):
    TITLE = "Fibonacci"
    SUBTITLE = "Bottom-up DP filling a dp array from index 0 to n."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Problem Introduction")
        intro_text = VGroup(
            Text("Fibonacci Sequence:", font_size=36, color=YELLOW),
            Text("F(0) = 0,  F(1) = 1", font_size=30),
            Text("F(n) = F(n-1) + F(n-2)  for n ≥ 2", font_size=30),
        ).arrange(DOWN, buff=0.4).move_to(UP * 0.5)

        self.play(FadeIn(intro_text[0]))
        self.wait(0.5)
        self.play(FadeIn(intro_text[1]))
        self.play(FadeIn(intro_text[2]))
        self.wait(1.5)

        seq_label = Text("0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...", font_size=28, color=BLUE_C)
        seq_label.next_to(intro_text, DOWN, buff=0.6)
        self.play(Write(seq_label))
        self.wait(1.5)
        self.play(FadeOut(intro_text), FadeOut(seq_label))

        # ── Stage 2: Naive Recursion vs DP ──────────────────────────────
        self.chapter_title("Naive Recursion vs. Bottom-up DP")
        naive = VGroup(
            Text("Naive Recursion", font_size=30, color=RED),
            Text("Exponential time  O(2ⁿ)", font_size=24),
            Text("Recomputes same subproblems", font_size=24),
        ).arrange(DOWN, buff=0.3).shift(LEFT * 3.2)

        dp = VGroup(
            Text("Bottom-up DP", font_size=30, color=GREEN),
            Text("Linear time  O(n)", font_size=24),
            Text("Each subproblem solved once", font_size=24),
        ).arrange(DOWN, buff=0.3).shift(RIGHT * 3.2)

        divider = Line(UP * 1.5, DOWN * 1.5, color=GREY)

        self.play(FadeIn(naive), Create(divider), FadeIn(dp))
        self.wait(2)
        self.play(FadeOut(naive), FadeOut(divider), FadeOut(dp))

        # ── Stage 3: Build the dp array ──────────────────────────────────
        self.chapter_title("Initialize dp Array  (n = 7)")
        n = 7
        dp_values = [None] * (n + 1)

        array_vis = ArrayVis(size=n + 1, label="dp")
        array_vis.move_to(ORIGIN)
        self.play(FadeIn(array_vis))
        self.wait(0.5)

        # index labels
        index_labels = VGroup(*[
            Text(str(i), font_size=22, color=GREY_B).next_to(array_vis.cells[i], DOWN, buff=0.15)
            for i in range(n + 1)
        ])
        idx_header = Text("index →", font_size=20, color=GREY_B).next_to(index_labels, LEFT, buff=0.2)
        self.play(FadeIn(index_labels), FadeIn(idx_header))
        self.wait(0.5)

        # fill with question marks
        q_marks = VGroup(*[
            Text("?", font_size=26, color=GREY).move_to(array_vis.cells[i].get_center())
            for i in range(n + 1)
        ])
        self.play(FadeIn(q_marks))
        self.wait(1)

        # ── Stage 4: Base cases F(0) and F(1) ───────────────────────────
        self.chapter_title("Base Cases: F(0) = 0, F(1) = 1")
        fib = [0] * (n + 1)
        fib[1] = 1

        for base_i, base_val in [(0, 0), (1, 1)]:
            highlight = SurroundingRectangle(array_vis.cells[base_i], color=YELLOW, buff=0.05)
            val_text = Text(str(base_val), font_size=26, color=YELLOW)
            val_text.move_to(array_vis.cells[base_i].get_center())
            self.play(Create(highlight), Transform(q_marks[base_i], val_text))
            self.wait(0.6)
            self.play(FadeOut(highlight))

        self.wait(1)

        # ── Stage 5: Step-by-step fill F(2) through F(n) ────────────────
        self.chapter_title("Fill dp[2..n] Bottom-up")

        formula_bg = RoundedRectangle(width=5.5, height=1.1, corner_radius=0.15, color=BLUE_E, fill_opacity=0.25)
        formula_bg.to_edge(UP, buff=0.9)
        formula_tex = MathTex(r"dp[i] = dp[i-1] + dp[i-2]", font_size=32)
        formula_tex.move_to(formula_bg.get_center())
        self.play(FadeIn(formula_bg), Write(formula_tex))
        self.wait(0.5)

        filled_texts = [q_marks[0], q_marks[1]]  # already transformed

        for i in range(2, n + 1):
            fib[i] = fib[i - 1] + fib[i - 2]

            # highlight source cells
            src1 = SurroundingRectangle(array_vis.cells[i - 1], color=BLUE, buff=0.05)
            src2 = SurroundingRectangle(array_vis.cells[i - 2], color=TEAL, buff=0.05)
            dst  = SurroundingRectangle(array_vis.cells[i],     color=GREEN, buff=0.05)

            step_label = Text(
                f"dp[{i}] = dp[{i-1}] + dp[{i-2}] = {fib[i-1]} + {fib[i-2]} = {fib[i]}",
                font_size=22, color=WHITE
            ).to_edge(DOWN, buff=0.55)

            new_val = Text(str(fib[i]), font_size=26, color=GREEN)
            new_val.move_to(array_vis.cells[i].get_center())

            self.play(Create(src1), Create(src2), FadeIn(step_label))
            self.wait(0.3)
            self.play(Create(dst), Transform(q_marks[i], new_val))
            self.wait(0.5)
            self.play(FadeOut(src1), FadeOut(src2), FadeOut(dst), FadeOut(step_label))

        self.wait(1)
        self.play(FadeOut(formula_bg), FadeOut(formula_tex))

        # ── Stage 6: Highlight final answer ─────────────────────────────
        self.chapter_title(f"Result: F({n}) = {fib[n]}")
        result_box = SurroundingRectangle(array_vis.cells[n], color=GOLD, buff=0.08, stroke_width=3)
        result_label = Text(f"F({n}) = {fib[n]}", font_size=38, color=GOLD).to_edge(DOWN, buff=0.8)
        self.play(Create(result_box), Write(result_label))
        self.wait(1)

        # show full sequence
        seq_row = VGroup(*[
            Text(str(fib[i]), font_size=20, color=BLUE_B)
            for i in range(n + 1)
        ]).arrange(RIGHT, buff=0.55).next_to(array_vis, DOWN, buff=0.9)
        seq_header = Text("F(i): ", font_size=20, color=GREY_B).next_to(seq_row, LEFT, buff=0.1)
        self.play(FadeIn(seq_row), FadeIn(seq_header))
        self.wait(2)

        self.play(
            FadeOut(array_vis), FadeOut(q_marks), FadeOut(index_labels),
            FadeOut(idx_header), FadeOut(result_box), FadeOut(result_label),
            FadeOut(seq_row), FadeOut(seq_header),
        )

        # ── Stage 7: Space optimisation note ────────────────────────────
        self.chapter_title("Space Optimisation: O(1)")
        opt_code = Code(
            code="\n".join([
                "def fib(n):",
                "    if n <= 1:",
                "        return n",
                "    prev, curr = 0, 1",
                "    for _ in range(2, n + 1):",
                "        prev, curr = curr, prev + curr",
                "    return curr",
            ]),
            language="python",
            font_size=24,
            background="window",
        ).scale(0.85).move_to(ORIGIN)
        self.play(FadeIn(opt_code))
        self.wait(2)
        self.play(FadeOut(opt_code))

        # ── Complexity card ──────────────────────────────────────────────
        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(n)  [O(1) with optimisation]",
        )
        self.wait(2)
