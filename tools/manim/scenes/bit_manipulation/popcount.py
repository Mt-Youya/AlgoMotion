from manim import *
from ...base import AlgoScene


class Popcount(AlgoScene):
    TITLE = "Popcount"
    SUBTITLE = "Counts the number of set bits (1s) in an integer using Brian Kernighan's trick i"
    CATEGORY = "bit-manipulation"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        title_label = self.chapter_title("What is Popcount?")
        self.play(FadeIn(title_label))
        self.wait(1)

        intro_text = VGroup(
            Text("Given an integer n, count how many bits are 1.", font_size=28),
            Text("Example: n = 13  →  1101₂  →  3 set bits", font_size=28, color=YELLOW),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)
        self.play(Write(intro_text))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(title_label))

        # ── Stage 2: Binary Representation ─────────────────────────────────
        stage2_label = self.chapter_title("Binary Representation of 13")
        self.play(FadeIn(stage2_label))
        self.wait(0.5)

        n_value = 13
        bits = list(f"{n_value:08b}")  # 8-bit representation

        bit_squares = VGroup()
        bit_labels = VGroup()
        for i, bit in enumerate(bits):
            sq = Square(side_length=0.7)
            sq.set_fill(GREEN if bit == "1" else DARK_GRAY, opacity=0.8)
            sq.set_stroke(WHITE, width=2)
            lbl = Text(bit, font_size=28, color=WHITE)
            lbl.move_to(sq.get_center())
            bit_squares.add(sq)
            bit_labels.add(lbl)

        bit_group = VGroup(*[VGroup(bit_squares[i], bit_labels[i]) for i in range(8)])
        bit_group.arrange(RIGHT, buff=0.1).move_to(ORIGIN)

        n_label = Text(f"n = {n_value}", font_size=32, color=YELLOW).next_to(bit_group, UP, buff=0.5)
        self.play(FadeIn(n_label), LaggedStart(*[FadeIn(bg) for bg in bit_group], lag_ratio=0.1))
        self.wait(1.5)

        count_label = Text("Set bits (green) = 3", font_size=28, color=GREEN).next_to(bit_group, DOWN, buff=0.5)
        self.play(Write(count_label))
        self.wait(2)
        self.play(FadeOut(stage2_label), FadeOut(n_label), FadeOut(bit_group), FadeOut(count_label))

        # ── Stage 3: Brian Kernighan's Trick Explained ──────────────────────
        stage3_label = self.chapter_title("Brian Kernighan's Trick")
        self.play(FadeIn(stage3_label))
        self.wait(0.5)

        trick_lines = VGroup(
            Text("Key insight:", font_size=30, color=YELLOW),
            Text("n & (n - 1)  clears the lowest set bit of n", font_size=26),
            Text("", font_size=10),
            Text("Example:", font_size=26, color=BLUE),
            Text("n     = 1101₂  (13)", font_size=24),
            Text("n-1   = 1100₂  (12)", font_size=24),
            Text("n&(n-1) = 1100₂  (12)  ← lowest 1 cleared!", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(line) for line in trick_lines], lag_ratio=0.2))
        self.wait(3)
        self.play(FadeOut(trick_lines), FadeOut(stage3_label))

        # ── Stage 4: Step-by-step walkthrough ──────────────────────────────
        stage4_label = self.chapter_title("Step-by-Step: n = 13 (1101₂)")
        self.play(FadeIn(stage4_label))
        self.wait(0.5)

        steps = [
            ("1101₂  (13)", "1100₂  (12)", "1100₂  (12)", 1),
            ("1100₂  (12)", "1011₂  (11)", "1000₂   (8)", 2),
            ("1000₂   (8)", "0111₂   (7)", "0000₂   (0)", 3),
        ]

        step_group = VGroup()
        for idx, (n_bin, nm1_bin, result_bin, count) in enumerate(steps):
            row = VGroup(
                Text(f"Step {idx+1}:", font_size=24, color=YELLOW),
                Text(f"n = {n_bin}", font_size=22),
                Text(f"n-1 = {nm1_bin}", font_size=22),
                Text(f"n & (n-1) = {result_bin}", font_size=22, color=GREEN),
                Text(f"count = {count}", font_size=22, color=BLUE),
            ).arrange(RIGHT, buff=0.35)
            step_group.add(row)

        step_group.arrange(DOWN, buff=0.45, aligned_edge=LEFT).move_to(ORIGIN)

        for row in step_group:
            self.play(FadeIn(row))
            self.wait(1.2)

        final_count = Text("Final count = 3 ✓", font_size=32, color=GREEN).next_to(step_group, DOWN, buff=0.5)
        self.play(Write(final_count))
        self.wait(2)
        self.play(FadeOut(step_group), FadeOut(final_count), FadeOut(stage4_label))

        # ── Stage 5: Animated Bit Clearing ─────────────────────────────────
        stage5_label = self.chapter_title("Animated Bit Clearing")
        self.play(FadeIn(stage5_label))
        self.wait(0.5)

        def make_bit_row(value, label_str):
            bits = list(f"{value:08b}")
            squares = VGroup()
            for bit in bits:
                sq = Square(side_length=0.65)
                sq.set_fill(GREEN if bit == "1" else DARK_GRAY, opacity=0.85)
                sq.set_stroke(WHITE, width=2)
                lbl = Text(bit, font_size=26, color=WHITE)
                lbl.move_to(sq.get_center())
                squares.add(VGroup(sq, lbl))
            squares.arrange(RIGHT, buff=0.08)
            tag = Text(label_str, font_size=22, color=YELLOW).next_to(squares, LEFT, buff=0.3)
            return VGroup(tag, squares)

        values = [13, 12, 8, 0]
        labels = ["n=13", "n=12", "n=8 ", "n=0 "]
        rows = VGroup(*[make_bit_row(v, l) for v, l in zip(values, labels)])
        rows.arrange(DOWN, buff=0.4).move_to(ORIGIN)

        count_tracker = Integer(0, font_size=36, color=BLUE)
        count_text = Text("count = ", font_size=32).next_to(rows, RIGHT, buff=0.8)
        count_tracker.next_to(count_text, RIGHT, buff=0.1)

        self.play(FadeIn(rows[0]), FadeIn(count_text), FadeIn(count_tracker))
        self.wait(0.5)

        for i in range(1, len(rows)):
            self.play(
                FadeIn(rows[i]),
                count_tracker.animate.set_value(i),
            )
            self.wait(0.8)

        self.wait(1.5)
        self.play(FadeOut(rows), FadeOut(count_text), FadeOut(count_tracker), FadeOut(stage5_label))

        # ── Stage 6: Python Code ────────────────────────────────────────────
        stage6_label = self.chapter_title("Python Implementation")
        self.play(FadeIn(stage6_label))
        self.wait(0.5)

        code_str = """def popcount(n: int) -> int:
    count = 0
    while n:
        n &= n - 1   # clear lowest set bit
        count += 1
    return count"""

        code_mob = Code(
            code=code_str,
            language="Python",
            font_size=24,
            background="rectangle",
            background_config={"fill_color": "#1e1e2e", "fill_opacity": 0.95},
        ).move_to(ORIGIN)

        self.play(FadeIn(code_mob))
        self.wait(2)

        annotation = Text("Each iteration removes exactly one set bit → O(k) iterations",
                          font_size=22, color=YELLOW).next_to(code_mob, DOWN, buff=0.4)
        self.play(Write(annotation))
        self.wait(2.5)
        self.play(FadeOut(code_mob), FadeOut(annotation), FadeOut(stage6_label))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(k)",
            space_complexity="O(1)",
            note="k = number of set bits; at most O(log n) iterations"
        )
        self.wait(2)
