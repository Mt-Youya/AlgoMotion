from manim import *
from ...base import AlgoScene
from ...base.algo_scene import (
    COBALT, SIGNAL, CORAL, MIST, INK, GRAY, PAPER
)


class BitManipulation(AlgoScene):
    TITLE = "Bit Manipulation Basics"
    SUBTITLE = "Common bit tricks: count set bits, check/set/clear a bit, detect power of two, a"
    CATEGORY = "math"

    # ── helpers ──────────────────────────────────────────────────────────────

    def _make_bit_row(self, number: int, bits: int = 8, label: str = "") -> VGroup:
        """Return a VGroup of bit cells for the given integer."""
        cells = VGroup()
        for i in range(bits - 1, -1, -1):
            bit_val = (number >> i) & 1
            rect = Square(side_length=0.55, color=COBALT, fill_opacity=0.12)
            txt = Text(str(bit_val), font_size=20, color=INK if bit_val else GRAY)
            cell = VGroup(rect, txt)
            cells.add(cell)
        cells.arrange(RIGHT, buff=0.04)
        if label:
            lbl = Text(label, font_size=18, color=GRAY).next_to(cells, LEFT, buff=0.25)
            return VGroup(lbl, cells)
        return cells

    def _highlight_bit(self, cells_group: VGroup, bit_index: int, bits: int = 8, color=CORAL) -> Animation:
        """Return an animation that highlights a specific bit cell (0 = LSB)."""
        # cells_group may be VGroup(label, cells) or just cells
        if isinstance(cells_group[0], Text):
            cells = cells_group[1]
        else:
            cells = cells_group
        cell_pos = bits - 1 - bit_index
        rect = cells[cell_pos][0]
        new_rect = rect.copy().set_fill(color, opacity=0.7).set_stroke(color, width=2)
        return Transform(rect, new_rect)

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        title_label = self.chapter_title("Introduction")

        intro_lines = VGroup(
            Text("Bits are the fundamental unit of computation", font_size=26, color=INK),
            Text("A single bit is either 0 or 1", font_size=24, color=COBALT),
            Text("Bit manipulation uses bitwise operators to work directly on binary data", font_size=22, color=GRAY),
            Text("Operations: AND (&)  OR (|)  XOR (^)  NOT (~)  SHIFT (<<, >>)", font_size=21, color=CORAL),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.2) for l in intro_lines], lag_ratio=0.2))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(title_label))

        # ── Stage 2: Binary representation ──────────────────────────────────
        stage2 = self.chapter_title("Binary Representation")
        self.wait(0.3)

        number = 42  # 0b00101010
        row = self._make_bit_row(number, 8, "42 =")
        row.move_to(ORIGIN + UP * 0.5)

        bit_labels = VGroup()
        if isinstance(row[0], Text):
            cells = row[1]
        else:
            cells = row
        for i, cell in enumerate(cells):
            pos_label = Text(str(7 - i), font_size=14, color=GRAY)
            pos_label.next_to(cell, DOWN, buff=0.12)
            bit_labels.add(pos_label)

        binary_text = Text("= 0b00101010", font_size=24, color=COBALT).next_to(row, DOWN, buff=0.6)
        value_text = Text("= 32 + 8 + 2 = 42", font_size=22, color=SIGNAL).next_to(binary_text, DOWN, buff=0.2)

        self.play(FadeIn(row))
        self.play(LaggedStart(*[FadeIn(l) for l in bit_labels], lag_ratio=0.1))
        self.play(Write(binary_text), Write(value_text))
        self.wait(2)
        self.play(FadeOut(row), FadeOut(bit_labels), FadeOut(binary_text), FadeOut(value_text), FadeOut(stage2))

        # ── Stage 3: Check / Set / Clear a bit ──────────────────────────────
        stage3 = self.chapter_title("Check · Set · Clear a Bit")
        self.wait(0.3)

        n = 42
        bit_pos = 3

        row_n = self._make_bit_row(n, 8, f"n={n}")
        row_n.move_to(UP * 1.8)
        self.play(FadeIn(row_n))

        # CHECK bit
        check_label = Text(f"CHECK bit {bit_pos}:  n & (1 << {bit_pos})", font_size=22, color=COBALT)
        check_label.next_to(row_n, DOWN, buff=0.5)
        self.play(Write(check_label))
        self.play(self._highlight_bit(row_n, bit_pos, color=SIGNAL))
        mask_row = self._make_bit_row(1 << bit_pos, 8, f"mask")
        mask_row.next_to(check_label, DOWN, buff=0.3)
        result_val = n & (1 << bit_pos)
        result_text = Text(
            f"Result = {result_val}  ({'bit is SET' if result_val else 'bit is CLEAR'})",
            font_size=20, color=CORAL
        ).next_to(mask_row, DOWN, buff=0.25)
        self.play(FadeIn(mask_row), Write(result_text))
        self.wait(1.5)

        # SET bit
        set_label = Text(f"SET bit {bit_pos}:  n | (1 << {bit_pos})", font_size=22, color=COBALT)
        set_label.next_to(result_text, DOWN, buff=0.4)
        set_val = n | (1 << bit_pos)
        set_result = Text(f"Result = {set_val}  = 0b{set_val:08b}", font_size=20, color=SIGNAL)
        set_result.next_to(set_label, DOWN, buff=0.2)
        self.play(Write(set_label), Write(set_result))
        self.wait(1.5)

        # CLEAR bit
        clear_label = Text(f"CLEAR bit {bit_pos}:  n & ~(1 << {bit_pos})", font_size=22, color=COBALT)
        clear_label.next_to(set_result, DOWN, buff=0.3)
        clear_val = n & ~(1 << bit_pos)
        clear_result = Text(f"Result = {clear_val}  = 0b{clear_val:08b}", font_size=20, color=CORAL)
        clear_result.next_to(clear_label, DOWN, buff=0.2)
        self.play(Write(clear_label), Write(clear_result))
        self.wait(2)

        self.play(
            FadeOut(row_n), FadeOut(check_label), FadeOut(mask_row),
            FadeOut(result_text), FadeOut(set_label), FadeOut(set_result),
            FadeOut(clear_label), FadeOut(clear_result), FadeOut(stage3)
        )

        # ── Stage 4: Count Set Bits (Kernighan's trick) ──────────────────────
        stage4 = self.chapter_title("Count Set Bits — Kernighan's Trick")
        self.wait(0.3)

        n = 29  # 0b00011101  → 4 set bits
        explanation = VGroup(
            Text(f"n = {n}  =  0b{n:08b}", font_size=26, color=INK),
            Text("Trick:  n & (n - 1)  clears the lowest set bit", font_size=22, color=COBALT),
            Text("Repeat until n == 0; count the iterations", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.3).move_to(UP * 2)
        self.play(FadeIn(explanation))
        self.wait(1)

        steps_data = []
        tmp = n
        while tmp:
            steps_data.append((tmp, tmp - 1, tmp & (tmp - 1)))
            tmp = tmp & (tmp - 1)

        step_group = VGroup()
        for idx, (val, val_minus1, after) in enumerate(steps_data):
            row_text = Text(
                f"Step {idx+1}: {val:08b} & {val_minus1:08b} = {after:08b}",
                font_size=19, color=CORAL if idx % 2 == 0 else COBALT
            )
            step_group.add(row_text)
        step_group.arrange(DOWN, buff=0.22).next_to(explanation, DOWN, buff=0.45)

        self.play(LaggedStart(*[Write(s) for s in step_group], lag_ratio=0.35))
        count_result = Text(f"→ {n} has {len(steps_data)} set bits", font_size=24, color=SIGNAL, weight="BOLD")
        count_result.next_to(step_group, DOWN, buff=0.35)
        self.play(Write(count_result))
        self.wait(2)
        self.play(FadeOut(explanation), FadeOut(step_group), FadeOut(count_result), FadeOut(stage4))

        # ── Stage 5: Detect Power of Two ────────────────────────────────────
        stage5 = self.chapter_title("Detect Power of Two")
        self.wait(0.3)

        insight = VGroup(
            Text("A power of two has exactly ONE set bit", font_size=26, color=INK),
            Text("Key insight:  n & (n - 1) == 0  iff n is a power of 2", font_size=22, color=COBALT),
            Text("(and n > 0)", font_size=20, color=GRAY),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.8)
        self.play(FadeIn(insight))
        self.wait(1)

        examples = [
            (16, True),
            (18, False),
            (32, True),
            (15, False),
        ]
        ex_group = VGroup()
        for val, is_pow in examples:
            color = SIGNAL if is_pow else CORAL
            symbol = "✓" if is_pow else "✗"
            line = Text(
                f"n={val:2d}  0b{val:08b}  &  0b{val-1:08b} = 0b{val&(val-1):08b}   {symbol}",
                font_size=18, color=color
            )
            ex_group.add(line)
        ex_group.arrange(DOWN, buff=0.22).next_to(insight, DOWN, buff=0.45)

        self.play(LaggedStart(*[FadeIn(e, shift=RIGHT * 0.2) for e in ex_group], lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(insight), FadeOut(ex_group), FadeOut(stage5))

        # ── Stage 6: Isolate Lowest Set Bit ─────────────────────────────────
        stage6 = self.chapter_title("Isolate the Lowest Set Bit")
        self.wait(0.3)

        formula_lines = VGroup(
            Text("Formula:  lsb = n & (-n)  =  n & (~n + 1)", font_size=24, color=COBALT),
            Text("Two's complement: -n flips all bits then adds 1", font_size=21, color=GRAY),
            Text("Result: only the lowest set bit survives", font_size=21, color=INK),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.8)
        self.play(FadeIn(formula_lines))
        self.wait(1)

        demo_n = 52  # 0b00110100
        demo_neg = (-demo_n) & 0xFF
        demo_lsb = demo_n & ((~demo_n + 1) & 0xFF)

        demo_rows = VGroup(
            Text(f"n        = 0b{demo_n:08b}  ({demo_n})", font_size=20, color=INK),
            Text(f"~n + 1   = 0b{demo_neg:08b}  ({demo_neg})", font_size=20, color=CORAL),
            Text(f"n & (-n) = 0b{demo_n & demo_neg:08b}  ({demo_n & demo_neg})  ← isolated LSB", font_size=20, color=SIGNAL),
        ).arrange(DOWN, buff=0.28).next_to(formula_lines, DOWN, buff=0.5)

        self.play(LaggedStart(*[Write(r) for r in demo_rows], lag_ratio=0.4))

        use_case = Text(
            "Used in Fenwick Trees, Gray codes, and fast bit iteration",
            font_size=19, color=COBALT
        ).next_to(demo_rows, DOWN, buff=0.4)
        self.play(FadeIn(use_case))
        self.wait(2)
        self.play(
            FadeOut(formula_lines), FadeOut(demo_rows),
            FadeOut(use_case), FadeOut(stage6)
        )

        # ── Stage 7: XOR tricks ──────────────────────────────────────────────
        stage7 = self.chapter_title("XOR Tricks")
        self.wait(0.3)

        xor_facts = VGroup(
            Text("a ^ a = 0        (self-cancellation)", font_size=22, color=INK),
            Text("a ^ 0 = a        (identity)", font_size=22, color=INK),
            Text("a ^ b ^ a = b    (swap without temp variable)", font_size=22, color=COBALT),
            Text("XOR all elements → find the single non-duplicate", font_size=21, color=CORAL),
        ).arrange(DOWN, buff=0.35).move_to(UP * 0.8)

        self.play(LaggedStart(*[FadeIn(f, shift=UP * 0.1) for f in xor_facts], lag_ratio=0.25))

        swap_demo = VGroup(
            Text("Swap a=5, b=9 without temp:", font_size=20, color=GRAY),
            Text("a ^= b  →  a=12", font_size=19, color=COBALT),
            Text("b ^= a  →  b=5", font_size=19, color=COBALT),
            Text("a ^= b  →  a=9", font_size=19, color=COBALT),
        ).arrange(DOWN, buff=0.18).next_to(xor_facts, DOWN, buff=0.45)

        self.play(LaggedStart(*[Write(s) for s in swap_demo], lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(xor_facts), FadeOut(swap_demo), FadeOut(stage7))

        # ── Stage 8: Complexity card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(1)",
            time_worst="O(\\log n)",
            space="O(1)",
        )
        self.wait(2)
