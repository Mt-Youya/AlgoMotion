from manim import *
from ...base import AlgoScene


class FastPower(AlgoScene):
    TITLE = "Fast Power"
    SUBTITLE = "Computes x^n in O(log n) time by squaring, optionally with a modulo for large nu"
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("The Problem")

        problem_text = VGroup(
            Text("Compute  x^n  efficiently", font_size=36),
            Text("Naive approach: multiply x by itself n times → O(n)", font_size=28, color=YELLOW),
            Text("Can we do better?", font_size=32, color=GREEN),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(problem_text[0]))
        self.wait(1)
        self.play(FadeIn(problem_text[1]))
        self.wait(1)
        self.play(FadeIn(problem_text[2]))
        self.wait(2)
        self.play(FadeOut(problem_text))

        # ── Stage 2: Core Idea ──────────────────────────────────────────────
        self.chapter_title("Key Insight: Squaring")

        key_idea = VGroup(
            MathTex(r"x^n = \begin{cases} (x^{n/2})^2 & \text{if } n \text{ is even} \\ x \cdot (x^{(n-1)/2})^2 & \text{if } n \text{ is odd} \end{cases}", font_size=38),
        ).move_to(UP * 0.5)

        halving_label = Text("Each step halves n  →  O(log n) steps", font_size=30, color=CYAN).next_to(key_idea, DOWN, buff=0.7)

        self.play(Write(key_idea))
        self.wait(1.5)
        self.play(FadeIn(halving_label))
        self.wait(2)
        self.play(FadeOut(key_idea), FadeOut(halving_label))

        # ── Stage 3: Binary Representation ─────────────────────────────────
        self.chapter_title("Binary Representation of n")

        example_n = 13
        binary_str = bin(example_n)[2:]  # "1101"

        header = Text(f"n = {example_n}  →  binary: {binary_str}", font_size=34).move_to(UP * 2.5)
        self.play(Write(header))
        self.wait(0.5)

        bit_boxes = VGroup()
        bit_labels = VGroup()
        power_labels = VGroup()

        for i, bit in enumerate(binary_str):
            box = Square(side_length=0.8, color=WHITE)
            box.move_to(LEFT * 2.1 + RIGHT * i * 1.0 + UP * 0.5)
            bit_label = Text(bit, font_size=32, color=YELLOW if bit == "1" else GRAY).move_to(box.get_center())
            exp_val = len(binary_str) - 1 - i
            pow_label = MathTex(f"2^{exp_val}", font_size=22, color=BLUE).next_to(box, DOWN, buff=0.15)
            bit_boxes.add(box)
            bit_labels.add(bit_label)
            power_labels.add(pow_label)

        self.play(LaggedStart(*[Create(b) for b in bit_boxes], lag_ratio=0.2))
        self.play(LaggedStart(*[Write(l) for l in bit_labels], lag_ratio=0.2))
        self.play(LaggedStart(*[Write(p) for p in power_labels], lag_ratio=0.2))

        explanation = Text(
            "Multiply result when bit = 1; always square the base",
            font_size=26, color=GREEN
        ).move_to(DOWN * 1.8)
        self.play(FadeIn(explanation))
        self.wait(2.5)
        self.play(FadeOut(VGroup(header, bit_boxes, bit_labels, power_labels, explanation)))

        # ── Stage 4: Step-by-Step Trace (x=2, n=13) ────────────────────────
        self.chapter_title("Step-by-Step Trace: 2^13")

        col_headers = VGroup(
            Text("Step", font_size=26, color=BLUE_B),
            Text("n", font_size=26, color=BLUE_B),
            Text("base", font_size=26, color=BLUE_B),
            Text("result", font_size=26, color=BLUE_B),
            Text("action", font_size=26, color=BLUE_B),
        ).arrange(RIGHT, buff=0.9).move_to(UP * 2.8)

        self.play(FadeIn(col_headers))
        underline = Line(col_headers.get_left(), col_headers.get_right(), color=WHITE, stroke_width=1.5)
        underline.next_to(col_headers, DOWN, buff=0.1)
        self.play(Create(underline))

        # Simulate fast power for 2^13
        steps = []
        base, n, result = 2, 13, 1
        step_num = 0
        while n > 0:
            action = "multiply result" if n % 2 == 1 else "skip"
            steps.append((step_num, n, base, result, action))
            if n % 2 == 1:
                result *= base
            base *= base
            n //= 2
            step_num += 1

        row_group = VGroup()
        for idx, (s, nv, bv, rv, act) in enumerate(steps):
            row = VGroup(
                Text(str(s), font_size=22),
                Text(str(nv), font_size=22, color=YELLOW),
                Text(str(bv), font_size=22, color=ORANGE),
                Text(str(rv), font_size=22, color=GREEN),
                Text(act, font_size=20, color=CYAN if act == "multiply result" else GRAY),
            ).arrange(RIGHT, buff=0.9)
            row.next_to(underline, DOWN, buff=0.35 + idx * 0.45)
            row_group.add(row)
            self.play(FadeIn(row), run_time=0.5)
            self.wait(0.4)

        final_ans = Text(f"Result = {2**13}", font_size=34, color=GOLD).next_to(row_group, DOWN, buff=0.5)
        self.play(Write(final_ans))
        self.wait(2)
        self.play(FadeOut(VGroup(col_headers, underline, row_group, final_ans)))

        # ── Stage 5: Modular Fast Power ─────────────────────────────────────
        self.chapter_title("Modular Fast Power")

        mod_formula = MathTex(
            r"(a \cdot b) \bmod m = ((a \bmod m) \cdot (b \bmod m)) \bmod m",
            font_size=34
        ).move_to(UP * 1.5)

        mod_note = VGroup(
            Text("Used in cryptography (RSA), competitive programming", font_size=26, color=YELLOW),
            Text("Prevents integer overflow for huge exponents", font_size=26, color=GREEN),
            MathTex(r"\text{e.g., } 2^{1000} \bmod 10^9+7", font_size=30, color=CYAN),
        ).arrange(DOWN, buff=0.4).next_to(mod_formula, DOWN, buff=0.6)

        self.play(Write(mod_formula))
        self.wait(1)
        self.play(LaggedStart(*[FadeIn(n) for n in mod_note], lag_ratio=0.4))
        self.wait(2.5)
        self.play(FadeOut(VGroup(mod_formula, mod_note)))

        # ── Stage 6: Recursive vs Iterative ─────────────────────────────────
        self.chapter_title("Recursive vs Iterative")

        rec_title = Text("Recursive", font_size=28, color=BLUE).move_to(LEFT * 3.5 + UP * 1.8)
        iter_title = Text("Iterative", font_size=28, color=ORANGE).move_to(RIGHT * 3.5 + UP * 1.8)

        rec_code = Code(
            code="""def fast_pow(x, n):
  if n == 0: return 1
  half = fast_pow(x, n//2)
  if n % 2 == 0:
    return half * half
  return x * half * half""",
            language="Python",
            font_size=18,
            background="window",
        ).move_to(LEFT * 3.2 + DOWN * 0.2)

        iter_code = Code(
            code="""def fast_pow(x, n):
  result = 1
  while n > 0:
    if n & 1:
      result *= x
    x *= x
    n >>= 1
  return result""",
            language="Python",
            font_size=18,
            background="window",
        ).move_to(RIGHT * 3.2 + DOWN * 0.2)

        divider = DashedLine(UP * 2.5, DOWN * 2.5, color=GRAY)

        self.play(Write(rec_title), Write(iter_title))
        self.play(Create(divider))
        self.play(FadeIn(rec_code), FadeIn(iter_code))
        self.wait(3)
        self.play(FadeOut(VGroup(rec_title, iter_title, divider, rec_code, iter_code)))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(log n)",
            time_avg="O(log n)",
            time_worst="O(log n)",
            space="O(log n) recursive / O(1) iterative",
        )
        self.wait(2)
