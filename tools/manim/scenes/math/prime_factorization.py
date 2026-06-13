from manim import *
from ...base import AlgoScene


class PrimeFactorization(AlgoScene):
    TITLE = "Prime Factorization"
    SUBTITLE = "Decomposes an integer into its prime factors by trial division up to the square "
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is Prime Factorization?")

        intro_text = VGroup(
            Text("Every integer > 1 can be written as a product", font_size=28),
            Text("of prime numbers (unique up to ordering).", font_size=28),
            Text("Example:  60 = 2 × 2 × 3 × 5", font_size=32, color=YELLOW),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Problem Setup ──────────────────────────────────────────
        self.chapter_title("Setup: n = 60")

        n_label = Text("n = 60", font_size=48, color=BLUE).shift(UP * 2)
        factors_label = Text("factors = []", font_size=36, color=GREEN).shift(UP * 0.8)
        divisor_label = Text("divisor d = 2", font_size=36, color=ORANGE).shift(DOWN * 0.2)

        sqrt_note = Text(
            "We only need to check d up to √60 ≈ 7.7",
            font_size=26, color=GRAY,
        ).shift(DOWN * 1.2)

        self.play(Write(n_label))
        self.wait(0.5)
        self.play(FadeIn(factors_label, shift=LEFT))
        self.play(FadeIn(divisor_label, shift=LEFT))
        self.play(FadeIn(sqrt_note))
        self.wait(2)
        self.play(FadeOut(VGroup(n_label, factors_label, divisor_label, sqrt_note)))

        # ── Stage 3: Trial Division – step by step ─────────────────────────
        self.chapter_title("Trial Division: d = 2")

        # Visual: number box + factors collected so far
        def make_number_box(value, color=WHITE):
            box = Square(side_length=1.2, color=color, stroke_width=3)
            lbl = Text(str(value), font_size=40, color=color)
            return VGroup(box, lbl)

        def make_factor_strip(factors):
            if not factors:
                return Text("factors = [ ]", font_size=30, color=GREEN)
            joined = " × ".join(str(f) for f in factors)
            return Text(f"factors = [ {joined} ]", font_size=30, color=GREEN)

        current_n = 60
        collected = []

        n_box = make_number_box(current_n, BLUE).shift(UP * 2)
        strip = make_factor_strip(collected).shift(DOWN * 2.5)
        self.play(FadeIn(n_box), FadeIn(strip))
        self.wait(0.5)

        steps = [
            (2, "60 ÷ 2 = 30  ✓  factor found!"),
            (2, "30 ÷ 2 = 15  ✓  factor found!"),
            (2, "15 ÷ 2 = 7.5  ✗  not divisible"),
            (3, "15 ÷ 3 = 5   ✓  factor found!"),
            (3, "5 ÷ 3 = 1.6  ✗  not divisible"),
            (5, "5 ÷ 5 = 1    ✓  factor found!"),
        ]
        n_values = [30, 15, 15, 5, 5, 1]
        factor_found = [True, True, False, True, False, True]

        d_label = Text("d = 2", font_size=34, color=ORANGE).shift(UP * 0.3)
        self.play(FadeIn(d_label))

        for i, (d, msg) in enumerate(steps):
            self.chapter_title(f"Trial Division: d = {d}")

            new_d_label = Text(f"d = {d}", font_size=34, color=ORANGE).shift(UP * 0.3)
            step_msg = Text(msg, font_size=26, color=YELLOW if factor_found[i] else RED_B).shift(UP * -0.8)

            self.play(Transform(d_label, new_d_label), FadeIn(step_msg))
            self.wait(0.8)

            if factor_found[i]:
                collected.append(d)
                current_n = n_values[i]
                new_box = make_number_box(current_n, BLUE).shift(UP * 2)
                new_strip = make_factor_strip(collected).shift(DOWN * 2.5)
                self.play(
                    Transform(n_box, new_box),
                    Transform(strip, new_strip),
                    Flash(step_msg, color=YELLOW, flash_radius=0.5),
                )
            self.wait(0.6)
            self.play(FadeOut(step_msg))

        self.wait(1)
        self.play(FadeOut(VGroup(n_box, strip, d_label)))

        # ── Stage 4: Remainder check ────────────────────────────────────────
        self.chapter_title("Remainder > 1: It's a Prime Factor")

        remainder_text = VGroup(
            Text("After the loop, if n > 1,", font_size=30),
            Text("the remaining n is itself prime.", font_size=30),
            Text("Here n = 1, so nothing to add.", font_size=30, color=GRAY),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(remainder_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(remainder_text))

        # ── Stage 5: Result Summary ─────────────────────────────────────────
        self.chapter_title("Result")

        result_eq = VGroup(
            Text("60", font_size=52, color=BLUE),
            Text("=", font_size=52),
            Text("2  ×  2  ×  3  ×  5", font_size=52, color=YELLOW),
        ).arrange(RIGHT, buff=0.3).move_to(ORIGIN + UP * 0.5)

        exp_form = Text("= 2²  ×  3  ×  5", font_size=40, color=GREEN).next_to(result_eq, DOWN, buff=0.5)

        self.play(Write(result_eq))
        self.wait(0.8)
        self.play(FadeIn(exp_form, shift=UP))
        self.wait(2)
        self.play(FadeOut(VGroup(result_eq, exp_form)))

        # ── Stage 6: Pseudocode walkthrough ────────────────────────────────
        self.chapter_title("Algorithm Pseudocode")

        code_lines = [
            "def prime_factors(n):",
            "    factors = []",
            "    d = 2",
            "    while d * d <= n:",
            "        while n % d == 0:",
            "            factors.append(d)",
            "            n //= d",
            "        d += 1",
            "    if n > 1:",
            "        factors.append(n)",
            "    return factors",
        ]

        code_group = VGroup(
            *[
                Text(line, font_size=22, font="Courier New", color=WHITE).set_opacity(0.3)
                for line in code_lines
            ]
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(ORIGIN)

        self.play(FadeIn(code_group))
        self.wait(0.3)

        highlights = [
            (0, "Define the function"),
            (1, "Initialize empty factors list"),
            (2, "Start with smallest prime d = 2"),
            (3, "Loop while d² ≤ n  (trial up to √n)"),
            (4, "Inner loop: divide out all copies of d"),
            (5, "Record the factor"),
            (6, "Shrink n"),
            (7, "Move to next candidate"),
            (8, "Remaining n > 1 means it's prime"),
            (9, "Append that last prime"),
            (10, "Return the list"),
        ]

        for idx, note in highlights:
            note_lbl = Text(note, font_size=22, color=YELLOW).to_edge(DOWN, buff=0.5)
            self.play(
                code_group[idx].animate.set_opacity(1).set_color(YELLOW),
                FadeIn(note_lbl),
                run_time=0.5,
            )
            self.wait(0.6)
            self.play(
                code_group[idx].animate.set_opacity(0.4).set_color(WHITE),
                FadeOut(note_lbl),
                run_time=0.3,
            )

        self.wait(0.5)
        self.play(FadeOut(code_group))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(√n)",
            space_complexity="O(log n)",
        )
        self.wait(2)
