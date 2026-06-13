from manim import *
from ...base import AlgoScene


class ReverseBits(AlgoScene):
    TITLE = "Reverse Bits"
    SUBTITLE = "Reverses the bits of a 32-bit unsigned integer by iteratively extracting the LSB"
    CATEGORY = "bit-manipulation"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        input_val = 43261596  # 0b00000010100101000001111010011100
        input_bin = format(input_val, "032b")
        expected_val = 964176192  # 0b00111001011110000010100101000000
        expected_bin = format(expected_val, "032b")

        intro_text = VGroup(
            Text("Input:  43261596", font_size=28, color=YELLOW),
            Text(f"Binary: {input_bin[:16]}", font_size=22, color=WHITE),
            Text(f"        {input_bin[16:]}", font_size=22, color=WHITE),
            Text("Output: 964176192", font_size=28, color=GREEN),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(1.5)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Bit Boxes Setup ────────────────────────────────────
        self.chapter_title("Visualizing 32-bit Representation")

        # Show only 8 bits for clarity
        demo_val = 0b10110100
        demo_bin = format(demo_val, "08b")
        n_bits = 8

        def make_bit_row(bits_str, label_text, color=WHITE, y_offset=0):
            boxes = VGroup()
            for i, b in enumerate(bits_str):
                sq = Square(side_length=0.55, color=color, fill_opacity=0.15)
                sq.set_fill(BLUE_E if b == "1" else DARK_GREY, opacity=0.4)
                digit = Text(b, font_size=24, color=WHITE).move_to(sq.get_center())
                cell = VGroup(sq, digit)
                boxes.add(cell)
            boxes.arrange(RIGHT, buff=0.05)
            label = Text(label_text, font_size=22, color=GREY_B).next_to(boxes, LEFT, buff=0.3)
            row = VGroup(label, boxes)
            row.move_to([0, y_offset, 0])
            return row, boxes

        input_row, input_boxes = make_bit_row(demo_bin, "Input  ", color=BLUE, y_offset=1.0)
        result_str = "0" * n_bits
        result_row, result_boxes = make_bit_row(result_str, "Result ", color=GREEN, y_offset=-0.5)

        idx_labels = VGroup()
        for i in range(n_bits):
            lbl = Text(str(n_bits - 1 - i), font_size=14, color=GREY_C)
            lbl.next_to(input_boxes[i], UP, buff=0.08)
            idx_labels.add(lbl)

        self.play(FadeIn(input_row), FadeIn(idx_labels))
        self.play(FadeIn(result_row))
        self.wait(1)

        # ── Stage 3: Algorithm Explanation ──────────────────────────────
        self.chapter_title("Algorithm: Extract LSB, Shift, Accumulate")

        algo_steps = VGroup(
            Text("1. Read LSB of n  →  result |= lsb", font_size=22, color=YELLOW),
            Text("2. Shift result left  →  result <<= 1", font_size=22, color=ORANGE),
            Text("3. Shift n right  →  n >>= 1", font_size=22, color=TEAL),
            Text("4. Repeat 32 times", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.25).to_edge(DOWN, buff=1.2)

        self.play(FadeIn(algo_steps, shift=UP * 0.3))
        self.wait(1.5)
        self.play(FadeOut(algo_steps))

        # ── Stage 4: Step-by-Step Animation (first 4 bits) ──────────────
        self.chapter_title("Step-by-Step: Reversing Bits")

        n = demo_val
        result = 0
        result_bits = list("0" * n_bits)
        input_bits = list(demo_bin)

        step_label = Text("", font_size=22, color=YELLOW).to_edge(DOWN, buff=1.8)
        self.add(step_label)

        for step in range(n_bits):
            lsb = n & 1
            bit_pos_in_result = n_bits - 1 - step  # where this bit lands in result

            # Highlight current LSB in input row
            highlight = SurroundingRectangle(input_boxes[n_bits - 1 - step], color=YELLOW, buff=0.05)
            new_step_label = Text(
                f"Step {step + 1}: LSB={lsb}, place at result[{bit_pos_in_result}]",
                font_size=20, color=YELLOW
            ).to_edge(DOWN, buff=1.8)

            self.play(
                Create(highlight),
                FadeOut(step_label),
                FadeIn(new_step_label),
                run_time=0.4,
            )
            step_label = new_step_label

            # Update result cell
            result_bits[bit_pos_in_result] = str(lsb)
            new_sq = Square(side_length=0.55, color=GREEN, fill_opacity=0.15)
            new_sq.set_fill(GREEN_E if lsb == 1 else DARK_GREY, opacity=0.5)
            new_digit = Text(str(lsb), font_size=24, color=WHITE).move_to(new_sq.get_center())
            new_cell = VGroup(new_sq, new_digit)
            new_cell.move_to(result_boxes[bit_pos_in_result].get_center())

            self.play(
                Transform(result_boxes[bit_pos_in_result], new_cell),
                run_time=0.35,
            )
            self.play(FadeOut(highlight), run_time=0.2)

            n >>= 1

            if step == 3:
                self.wait(0.5)

        self.wait(1)
        self.play(FadeOut(step_label))

        # ── Stage 5: Final State Comparison ─────────────────────────────
        self.chapter_title("Result Verified")

        final_result = int("".join(result_bits), 2)
        reversed_demo = int(demo_bin[::-1], 2)

        compare = VGroup(
            Text(f"Input  binary : {demo_bin}", font_size=22, color=BLUE_B),
            Text(f"Result binary : {''.join(result_bits)}", font_size=22, color=GREEN_B),
            Text(f"Input  decimal: {demo_val}", font_size=22, color=BLUE_B),
            Text(f"Result decimal: {final_result}", font_size=22, color=GREEN_B),
        ).arrange(DOWN, buff=0.3).move_to([0, -1.0, 0])

        check = Text("✓ Bits Successfully Reversed!", font_size=28, color=YELLOW)
        check.to_edge(DOWN, buff=0.5)

        self.play(FadeIn(compare, shift=UP * 0.2))
        self.play(Write(check))
        self.wait(1.5)
        self.play(FadeOut(compare), FadeOut(check))
        self.play(FadeOut(input_row), FadeOut(result_row), FadeOut(idx_labels))

        # ── Stage 6: Code Walkthrough ────────────────────────────────────
        self.chapter_title("Python Implementation")

        code_str = """def reverseBits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result"""

        code_obj = Code(
            code=code_str,
            language="Python",
            font_size=22,
            background="window",
            line_spacing=1.2,
        ).scale(0.95).move_to(ORIGIN)

        self.play(FadeIn(code_obj))
        self.wait(2)

        annotation = Text(
            "Each iteration: extract LSB → append to result → shift both",
            font_size=20, color=YELLOW
        ).to_edge(DOWN, buff=1.0)
        self.play(FadeIn(annotation))
        self.wait(1.5)
        self.play(FadeOut(code_obj), FadeOut(annotation))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(1)",
            space_complexity="O(1)",
            notes="Fixed 32 iterations regardless of input value.",
        )
        self.wait(2)
