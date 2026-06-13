"""Climbing Stairs — Manim scene for AlgoMotion."""
from __future__ import annotations

from manim import (
    BOLD,
    DOWN,
    LEFT,
    RIGHT,
    UP,
    Arrow,
    Create,
    FadeIn,
    FadeOut,
    Indicate,
    MathTex,
    Rectangle,
    Text,
    Transform,
    VGroup,
    Write,
)

from ...base import AlgoScene, DPTable
from ...base.algo_scene import (
    C_ACTIVE,
    C_SORTED,
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    SIGNAL,
)


class ClimbingStairs(AlgoScene):
    TITLE = "Climbing Stairs"
    SUBTITLE = "Count distinct ways to climb n stairs taking 1 or 2 steps at a time."
    CATEGORY = "dynamic-programming"

    # n used throughout the demo
    N = 6

    def build(self) -> None:
        # ── Stage 1: Problem setup ────────────────────────────────────────────
        ch1 = self.chapter_title("The Problem")
        problem_text = Text(
            f"How many ways to climb {self.N} stairs\n"
            "taking 1 or 2 steps at a time?",
            font_size=34,
            color=INK,
            line_spacing=1.4,
        )
        problem_text.move_to([0, 0.5, 0])
        self.play(FadeIn(problem_text, run_time=0.7))
        self.wait(1.5)

        # Draw a simple staircase diagram
        stairs = VGroup()
        for i in range(self.N + 1):
            step = Rectangle(
                width=0.6, height=0.4,
                color=COBALT, fill_color=MIST, fill_opacity=1, stroke_width=2,
            )
            step.move_to([-2.0 + i * 0.65, -1.5 + i * 0.42, 0])
            lbl = Text(str(i), font_size=18, color=INK)
            lbl.move_to(step)
            stairs.add(step, lbl)

        self.play(Create(stairs, run_time=1.2))
        self.wait(1.0)
        self.play(FadeOut(problem_text, run_time=0.4), FadeOut(stairs, run_time=0.4))
        self.play(FadeOut(ch1, run_time=0.3))
        self.wait(0.2)

        # ── Stage 2: Recurrence relation ─────────────────────────────────────
        ch2 = self.chapter_title("Recurrence Relation")

        recurrence_title = Text("Key Insight", font_size=32, color=COBALT, weight=BOLD)
        recurrence_title.move_to([0, 2.0, 0])

        insight = Text(
            "To reach stair i, you came from stair i-1 (1 step)\n"
            "or from stair i-2 (2 steps).",
            font_size=28,
            color=INK,
            line_spacing=1.4,
        )
        insight.move_to([0, 0.8, 0])

        formula = MathTex(
            r"\text{dp}[i] = \text{dp}[i-1] + \text{dp}[i-2]",
            font_size=44,
            color=COBALT,
        )
        formula.move_to([0, -0.4, 0])

        base_cases = Text(
            "Base cases:  dp[0] = 1  (empty path),  dp[1] = 1",
            font_size=26,
            color=GRAY,
        )
        base_cases.move_to([0, -1.4, 0])

        self.play(FadeIn(recurrence_title, run_time=0.5))
        self.play(Write(insight, run_time=0.9))
        self.wait(0.8)
        self.play(Write(formula, run_time=0.8))
        self.wait(0.8)
        self.play(FadeIn(base_cases, run_time=0.6))
        self.wait(1.5)
        self.play(
            FadeOut(recurrence_title),
            FadeOut(insight),
            FadeOut(formula),
            FadeOut(base_cases),
            run_time=0.5,
        )
        self.play(FadeOut(ch2, run_time=0.3))
        self.wait(0.2)

        # ── Stage 3: Build the DP table step by step ─────────────────────────
        ch3 = self.chapter_title("Building the DP Table")

        col_labels = [str(i) for i in range(self.N + 1)]
        dp_table = DPTable(
            self,
            rows=1,
            cols=self.N + 1,
            col_labels=col_labels,
            cell_width=0.85,
            cell_height=0.7,
            center=[0, 0.3, 0],
            initial=[[" "] * (self.N + 1)],
        )

        row_label = Text("dp[i]", font_size=22, color=GRAY)
        row_label.move_to([-3.8, 0.3, 0])
        self.play(FadeIn(row_label, run_time=0.4))
        self.wait(0.5)

        # Base case dp[0] = 1
        caption0 = self.caption("Base case: dp[0] = 1  (one way to stay at ground)")
        dp_table.set_value(0, 0, 1, color=SIGNAL)
        self.wait(0.8)
        self.play(FadeOut(caption0))

        # Base case dp[1] = 1
        caption1 = self.caption("Base case: dp[1] = 1  (only one 1-step path)")
        dp_table.set_value(0, 1, 1, color=SIGNAL)
        self.wait(0.8)
        self.play(FadeOut(caption1))

        # Fill dp[2..N] with animation
        dp_vals = [0] * (self.N + 1)
        dp_vals[0] = 1
        dp_vals[1] = 1
        for i in range(2, self.N + 1):
            dp_vals[i] = dp_vals[i - 1] + dp_vals[i - 2]
            # Highlight the two source cells
            dp_table.highlight(0, i - 1, color=CORAL)
            dp_table.highlight(0, i - 2, color=CORAL)
            cap = self.caption(
                f"dp[{i}] = dp[{i-1}] + dp[{i-2}] = {dp_vals[i-1]} + {dp_vals[i-2]} = {dp_vals[i]}"
            )
            self.wait(0.4)
            dp_table.set_value(0, i, dp_vals[i], color=C_ACTIVE)
            self.wait(0.5)
            # Reset source cell colours
            dp_table.highlight(0, i - 1, color=MIST)
            dp_table.highlight(0, i - 2, color=MIST)
            dp_table.mark_done(0, i)
            self.play(FadeOut(cap))

        self.wait(1.0)
        self.play(FadeOut(ch3, run_time=0.3))
        self.wait(0.2)

        # ── Stage 4: Highlight the answer ────────────────────────────────────
        ch4 = self.chapter_title("The Answer")

        answer_text = Text(
            f"There are  {dp_vals[self.N]}  distinct ways",
            font_size=40,
            color=INK,
        )
        answer_text.move_to([0, -1.4, 0])

        dp_table.indicate(0, self.N)
        self.play(Write(answer_text, run_time=0.8))
        self.wait(1.5)
        self.play(FadeOut(answer_text))
        self.play(FadeOut(ch4, run_time=0.3))
        self.wait(0.2)

        # ── Stage 5: Fibonacci connection ────────────────────────────────────
        ch5 = self.chapter_title("Fibonacci Connection")

        fib_note = Text(
            "dp[n] equals the (n+1)-th Fibonacci number!\n"
            "F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13, …",
            font_size=26,
            color=INK,
            line_spacing=1.5,
        )
        fib_note.move_to([0, -1.5, 0])

        fib_formula = MathTex(
            r"\text{dp}[n] = F(n+1) = \frac{\phi^{n+1} - \psi^{n+1}}{\sqrt{5}}",
            font_size=36,
            color=COBALT,
        )
        fib_formula.move_to([0, -2.5, 0])

        self.play(Write(fib_note, run_time=0.9))
        self.wait(0.8)
        self.play(FadeIn(fib_formula, run_time=0.6))
        self.wait(1.5)
        self.play(FadeOut(fib_note), FadeOut(fib_formula))
        self.play(FadeOut(ch5, run_time=0.3))
        self.wait(0.2)

        # ── Stage 6: Space-optimised approach ────────────────────────────────
        ch6 = self.chapter_title("Space Optimisation")

        opt_title = Text(
            "We only need the last two values — O(1) space!",
            font_size=30,
            color=INK,
        )
        opt_title.move_to([0, 1.8, 0])
        self.play(FadeIn(opt_title, run_time=0.6))

        # Animate the two rolling variables
        a_box = Rectangle(width=1.2, height=0.8, color=COBALT, fill_color=MIST, fill_opacity=1, stroke_width=2)
        b_box = Rectangle(width=1.2, height=0.8, color=COBALT, fill_color=MIST, fill_opacity=1, stroke_width=2)
        a_box.move_to([-1.0, 0.2, 0])
        b_box.move_to([1.0, 0.2, 0])

        a_lbl_head = Text("prev", font_size=20, color=GRAY).next_to(a_box, UP, buff=0.12)
        b_lbl_head = Text("curr", font_size=20, color=GRAY).next_to(b_box, UP, buff=0.12)

        a_val = Text("1", font_size=28, color=INK, weight=BOLD).move_to(a_box)
        b_val = Text("1", font_size=28, color=INK, weight=BOLD).move_to(b_box)

        arrow = Arrow(a_box.get_right(), b_box.get_left(), buff=0.1, color=COBALT)

        self.play(
            Create(a_box), Create(b_box),
            FadeIn(a_lbl_head), FadeIn(b_lbl_head),
            FadeIn(a_val), FadeIn(b_val),
            Create(arrow),
            run_time=0.7,
        )
        self.wait(0.5)

        prev, curr = 1, 1
        for i in range(2, self.N + 1):
            nxt = prev + curr
            step_cap = self.caption(
                f"i={i}: new = {prev} + {curr} = {nxt}  →  prev={curr}, curr={nxt}"
            )
            new_a = Text(str(curr), font_size=28, color=INK, weight=BOLD).move_to(a_box)
            new_b = Text(str(nxt), font_size=28, color=INK, weight=BOLD).move_to(b_box)
            self.play(
                Transform(a_val, new_a, run_time=0.4),
                Transform(b_val, new_b, run_time=0.4),
            )
            self.wait(0.5)
            self.play(FadeOut(step_cap))
            prev, curr = curr, nxt

        self.wait(1.0)
        self.play(
            FadeOut(opt_title), FadeOut(a_box), FadeOut(b_box),
            FadeOut(a_lbl_head), FadeOut(b_lbl_head),
            FadeOut(a_val), FadeOut(b_val), FadeOut(arrow),
            run_time=0.5,
        )
        self.play(FadeOut(ch6, run_time=0.3))

        # Fade out the dp table and row label
        self.play(FadeOut(row_label, run_time=0.4))
        self.wait(0.2)

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        card = self.complexity_card(
            r"O(n)",
            r"O(n)",
            r"O(n)",
            r"O(1) \text{ optimised}",
        )
        self.wait(2.0)
        self.play(FadeOut(card, run_time=0.5))
        self.play(FadeOut(ch7, run_time=0.3))
        self.wait(0.2)
