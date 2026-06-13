from manim import *
from ...base import AlgoScene


class PowerOfTwo(AlgoScene):
    TITLE = "Power of Two"
    SUBTITLE = "Determines whether a given integer is a power of two using the bit trick n & (n-"
    CATEGORY = "bit-manipulation"

    def build(self):
        # ── Stage 1: Problem Introduction ───────────────────────────────────
        title_label = self.chapter_title("Problem Introduction")
        self.play(FadeIn(title_label))
        self.wait(1)

        intro_text = VGroup(
            Text("Given an integer n, determine if it is a power of two.", font_size=27),
            Text("Powers of two: 1, 2, 4, 8, 16, 32, 64, ...", font_size=27, color=YELLOW),
            Text("Constraint: n must be a positive integer.", font_size=27, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(ORIGIN)

        self.play(LaggedStart(*[Write(line) for line in intro_text], lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(title_label))
        self.wait(0.3)

        # ── Stage 2: Binary Patterns of Powers of Two ───────────────────────
        stage2_label = self.chapter_title("Binary Pattern of Powers of Two")
        self.play(FadeIn(stage2_label))
        self.wait(0.5)

        powers = [(1, "1"), (2, "10"), (4, "100"), (8, "1000"), (16, "10000")]
        rows = VGroup()
        for val, binary in powers:
            row = VGroup(
                Text(f"n = {val:>3}", font_size=26, color=YELLOW),
                Text("→", font_size=26),
                Text(f"{binary:>8}₂", font_size=26, color=GREEN),
                Text("← exactly one 1-bit", font_size=22, color=BLUE),
            ).arrange(RIGHT, buff=0.4)
            rows.add(row)

        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        insight = Text("Powers of two always have exactly ONE set bit!", font_size=26, color=YELLOW)
        insight.next_to(rows, DOWN, buff=0.5)

        self.play(LaggedStart(*[FadeIn(row) for row in rows], lag_ratio=0.2))
        self.wait(1)
        self.play(Write(insight))
        self.wait(2)
        self.play(FadeOut(rows), FadeOut(insight), FadeOut(stage2_label))
        self.wait(0.3)

        # ── Stage 3: The Bit Trick Explained ────────────────────────────────
        stage3_label = self.chapter_title("The Bit Trick: n & (n-1)")
        self.play(FadeIn(stage3_label))
        self.wait(0.5)

        trick_lines = VGroup(
            Text("Key Insight:", font_size=30, color=YELLOW),
            Text("For a power of two, n has exactly one 1-bit.", font_size=26),
            Text("n - 1 flips that bit to 0 and sets all lower bits to 1.", font_size=26),
            Text("Therefore: n & (n-1) == 0  iff  n is a power of two.", font_size=26, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(ORIGIN)

        for line in trick_lines:
            self.play(Write(line), run_time=0.7)
            self.wait(0.5)

        self.wait(1.5)
        self.play(FadeOut(trick_lines), FadeOut(stage3_label))
        self.wait(0.3)

        # ── Stage 4: Bit-level Walkthrough for n=8 (True Case) ──────────────
        stage4_label = self.chapter_title("True Case: n = 8 (power of two)")
        self.play(FadeIn(stage4_label))
        self.wait(0.5)

        def make_bit_row(value, label_str, highlight_color=WHITE):
            bits = list(f"{value:08b}")
            squares = VGroup()
            for bit in bits:
                sq = Square(side_length=0.62)
                sq.set_fill(GREEN if bit == "1" else DARK_GRAY, opacity=0.85)
                sq.set_stroke(highlight_color, width=2)
                lbl = Text(bit, font_size=24, color=WHITE)
                lbl.move_to(sq.get_center())
                squares.add(VGroup(sq, lbl))
            squares.arrange(RIGHT, buff=0.07)
            tag = Text(label_str, font_size=22, color=YELLOW).next_to(squares, LEFT, buff=0.35)
            return VGroup(tag, squares)

        row_n8   = make_bit_row(8,  "n   = 8  ")
        row_n7   = make_bit_row(7,  "n-1 = 7  ")
        row_and8 = make_bit_row(8 & 7, "n&(n-1) =", highlight_color=GREEN)
        true_rows = VGroup(row_n8, row_n7, row_and8).arrange(DOWN, buff=0.4).move_to(UP * 0.3)

        self.play(FadeIn(row_n8))
        self.wait(0.5)
        self.play(FadeIn(row_n7))
        self.wait(0.5)
        self.play(FadeIn(row_and8))
        self.wait(0.8)

        result_true = Text("Result: 0 == 0  →  True (IS a power of two!)", font_size=26, color=GREEN)
        result_true.next_to(true_rows, DOWN, buff=0.5)
        self.play(Write(result_true))
        self.wait(2)
        self.play(FadeOut(true_rows), FadeOut(result_true), FadeOut(stage4_label))
        self.wait(0.3)

        # ── Stage 5: Bit-level Walkthrough for n=6 (False Case) ─────────────
        stage5_label = self.chapter_title("False Case: n = 6 (not a power of two)")
        self.play(FadeIn(stage5_label))
        self.wait(0.5)

        row_n6   = make_bit_row(6,  "n   = 6  ")
        row_n5   = make_bit_row(5,  "n-1 = 5  ")
        row_and6 = make_bit_row(6 & 5, "n&(n-1) =", highlight_color=RED)
        false_rows = VGroup(row_n6, row_n5, row_and6).arrange(DOWN, buff=0.4).move_to(UP * 0.3)

        self.play(FadeIn(row_n6))
        self.wait(0.5)
        self.play(FadeIn(row_n5))
        self.wait(0.5)
        self.play(FadeIn(row_and6))
        self.wait(0.8)

        result_false = Text("Result: 4 != 0  →  False (NOT a power of two!)", font_size=26, color=RED)
        result_false.next_to(false_rows, DOWN, buff=0.5)
        self.play(Write(result_false))
        self.wait(2)
        self.play(FadeOut(false_rows), FadeOut(result_false), FadeOut(stage5_label))
        self.wait(0.3)

        # ── Stage 6: Edge Cases ──────────────────────────────────────────────
        stage6_label = self.chapter_title("Edge Cases to Handle")
        self.play(FadeIn(stage6_label))
        self.wait(0.5)

        edge_cases = VGroup(
            Text("n = 0  →  0 & (-1) = 0  but 0 is NOT a power of two!", font_size=25, color=RED),
            Text("n < 0  →  Negative numbers cannot be powers of two.", font_size=25, color=RED),
            Text("Fix: add guard  n > 0  before the bit trick.", font_size=25, color=GREEN),
            Text("Final check:  n > 0  and  n & (n-1) == 0", font_size=25, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(ORIGIN)

        for case in edge_cases:
            self.play(Write(case), run_time=0.7)
            self.wait(0.6)

        self.wait(1.5)
        self.play(FadeOut(edge_cases), FadeOut(stage6_label))
        self.wait(0.3)

        # ── Stage 7: Python Code ─────────────────────────────────────────────
        stage7_label = self.chapter_title("Python Implementation")
        self.play(FadeIn(stage7_label))
        self.wait(0.5)

        code_str = """def is_power_of_two(n: int) -> bool:
    # Guard: must be a positive integer
    if n <= 0:
        return False
    # Bit trick: powers of two have exactly one 1-bit
    # n & (n-1) clears the lowest set bit of n
    # If n is a power of two, the result is 0
    return (n & (n - 1)) == 0"""

        code_mob = Code(
            code=code_str,
            language="Python",
            font_size=23,
            background="rectangle",
            background_config={"fill_color": "#1e1e2e", "fill_opacity": 0.95},
        ).move_to(ORIGIN)

        self.play(FadeIn(code_mob))
        self.wait(1)

        annotation = Text(
            "Single expression: O(1) time, O(1) space — no loops needed!",
            font_size=22, color=YELLOW,
        ).next_to(code_mob, DOWN, buff=0.4)
        self.play(Write(annotation))
        self.wait(2.5)
        self.play(FadeOut(code_mob), FadeOut(annotation), FadeOut(stage7_label))
        self.wait(0.3)

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(1)",
            space_complexity="O(1)",
            notes="Single bitwise AND operation — no loops, no recursion.",
        )
        self.wait(2)
