from manim import *
from ...base import AlgoScene, DPTable


class KnapsackUnbounded(AlgoScene):
    TITLE = "Unbounded Knapsack"
    SUBTITLE = "Maximize value where each item can be taken unlimited times."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        chapter_label = self.chapter_title("Problem Setup")

        items = [
            {"weight": 2, "value": 3, "label": "Item A"},
            {"weight": 3, "value": 4, "label": "Item B"},
            {"weight": 4, "value": 5, "label": "Item C"},
        ]
        capacity = 8

        intro_text = Text(
            "Knapsack capacity: W = 8",
            font_size=30, color=WHITE
        ).to_edge(UP).shift(DOWN * 0.8)

        item_group = VGroup()
        for i, item in enumerate(items):
            box = RoundedRectangle(corner_radius=0.15, width=2.4, height=1.1,
                                   color=BLUE, fill_color=BLUE, fill_opacity=0.25,
                                   stroke_width=2)
            lbl = Text(item["label"], font_size=22, color=WHITE, weight="BOLD")
            wt  = Text(f"w={item['weight']}  v={item['value']}", font_size=20, color=YELLOW)
            inner = VGroup(lbl, wt).arrange(DOWN, buff=0.1)
            inner.move_to(box)
            item_group.add(VGroup(box, inner))

        item_group.arrange(RIGHT, buff=0.5).next_to(intro_text, DOWN, buff=0.5)

        note = Text(
            "Each item can be taken unlimited times.",
            font_size=24, color=GREEN
        ).next_to(item_group, DOWN, buff=0.5)

        self.play(Write(intro_text))
        self.wait(0.4)
        self.play(LaggedStart(*[FadeIn(it) for it in item_group], lag_ratio=0.2))
        self.wait(0.5)
        self.play(Write(note))
        self.wait(1.2)

        self.play(FadeOut(chapter_label), FadeOut(intro_text),
                  FadeOut(item_group), FadeOut(note))

        # ── Stage 2: Recurrence Relation ─────────────────────────────────────
        chapter_label = self.chapter_title("Recurrence Relation")

        recurrence_lines = VGroup(
            Text("dp[w] = maximum value achievable with capacity w", font_size=26, color=WHITE),
            Text("dp[0] = 0  (empty knapsack)", font_size=26, color=GREEN),
            Text("dp[w] = max(dp[w - wᵢ] + vᵢ)  for all items i where wᵢ ≤ w", font_size=24, color=YELLOW),
            Text("Key: reuse same item → iterate weight outer, items inner", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in recurrence_lines:
            self.play(Write(line))
            self.wait(0.5)
        self.wait(1.0)

        self.play(FadeOut(chapter_label), FadeOut(recurrence_lines))

        # ── Stage 3: Initialize DP Array ─────────────────────────────────────
        chapter_label = self.chapter_title("Initialize DP Array")

        dp_size = capacity + 1
        dp_vals = [0] * dp_size

        cell_w = 0.85
        cells = VGroup()
        index_labels = VGroup()
        val_texts = []

        for i in range(dp_size):
            cell = Square(side_length=cell_w, color=WHITE, fill_opacity=0.1)
            val = Text("0", font_size=24, color=WHITE)
            val.move_to(cell.get_center())
            idx = Text(str(i), font_size=18, color=GRAY).next_to(cell, DOWN, buff=0.1)
            cells.add(VGroup(cell, val))
            index_labels.add(idx)
            val_texts.append(val)

        cells.arrange(RIGHT, buff=0.05)
        for i, idx in enumerate(index_labels):
            idx.next_to(cells[i], DOWN, buff=0.1)

        table_group = VGroup(cells, index_labels).move_to(ORIGIN + DOWN * 0.3)
        dp_header = Text("dp[0..W]  (W = 8)", font_size=28, color=YELLOW).next_to(table_group, UP, buff=0.45)
        init_note = Text("All values start at 0  (base case: dp[0] = 0)", font_size=22, color=GRAY).next_to(
            table_group, DOWN, buff=0.55
        )

        self.play(Write(dp_header))
        self.play(LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.08))
        self.play(LaggedStart(*[FadeIn(idx) for idx in index_labels], lag_ratio=0.08))
        self.wait(0.4)
        self.play(Write(init_note))
        self.wait(1.0)
        self.play(cells[0][0].animate.set_fill(GREEN, opacity=0.5))
        self.wait(0.7)
        self.play(FadeOut(init_note))

        # ── Stage 4: Fill dp[1] through dp[4] ───────────────────────────────
        chapter_label2 = self.chapter_title("Fill dp[1] to dp[4]")

        items_note = Text(
            "Items: A(w=2,v=3)  B(w=3,v=4)  C(w=4,v=5)",
            font_size=22, color=BLUE
        ).to_edge(UP).shift(DOWN * 0.3)
        self.play(Write(items_note))
        self.wait(0.3)

        fill_steps_1 = [
            (1, "dp[1]: no item fits (min weight=2) → dp[1] = 0", 0),
            (2, "dp[2]: Item A fits → dp[2-2]+3 = 0+3 = 3 → dp[2] = 3", 3),
            (3, "dp[3]: A→dp[1]+3=3, B→dp[0]+4=4 → dp[3] = 4", 4),
            (4, "dp[4]: A→dp[2]+3=6, B→dp[1]+4=4, C→dp[0]+5=5 → dp[4] = 6", 6),
        ]

        for idx, msg, result in fill_steps_1:
            step_text = Text(msg, font_size=19, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            self.play(Write(step_text))
            self.play(cells[idx][0].animate.set_fill(BLUE, opacity=0.4))
            if result != dp_vals[idx]:
                new_val = Text(str(result), font_size=24, color=YELLOW)
                new_val.move_to(cells[idx][0].get_center())
                self.play(Transform(val_texts[idx], new_val))
                dp_vals[idx] = result
            self.wait(0.8)
            self.play(FadeOut(step_text))

        self.play(FadeOut(chapter_label2))

        # ── Stage 5: Fill dp[5] through dp[8] ───────────────────────────────
        chapter_label3 = self.chapter_title("Fill dp[5] to dp[8]")

        fill_steps_2 = [
            (5, "dp[5]: A→dp[3]+3=7, B→dp[2]+4=7, C→dp[1]+5=5 → dp[5] = 7", 7),
            (6, "dp[6]: A→dp[4]+3=9, B→dp[3]+4=8, C→dp[2]+5=8 → dp[6] = 9", 9),
            (7, "dp[7]: A→dp[5]+3=10, B→dp[4]+4=10, C→dp[3]+5=9 → dp[7] = 10", 10),
            (8, "dp[8]: A→dp[6]+3=12, B→dp[5]+4=11, C→dp[4]+5=11 → dp[8] = 12", 12),
        ]

        for idx, msg, result in fill_steps_2:
            step_text = Text(msg, font_size=19, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            self.play(Write(step_text))
            self.play(cells[idx][0].animate.set_fill(BLUE, opacity=0.4))
            new_val = Text(str(result), font_size=24, color=YELLOW)
            new_val.move_to(cells[idx][0].get_center())
            self.play(Transform(val_texts[idx], new_val))
            dp_vals[idx] = result
            self.wait(0.8)
            self.play(FadeOut(step_text))

        self.wait(0.4)

        # Highlight the answer
        answer_arrow = Arrow(
            cells[capacity].get_top() + UP * 0.6,
            cells[capacity].get_top(),
            color=GREEN, buff=0.05
        )
        answer_label = Text(f"Max value = {dp_vals[capacity]}", font_size=28, color=GREEN).next_to(
            answer_arrow, UP, buff=0.1
        )
        self.play(GrowArrow(answer_arrow), Write(answer_label))
        self.wait(1.2)

        self.play(FadeOut(answer_arrow), FadeOut(answer_label),
                  FadeOut(items_note), FadeOut(chapter_label3))

        # ── Stage 6: Optimal Item Selection Trace ───────────────────────────
        chapter_label4 = self.chapter_title("Trace Optimal Selection")

        self.play(FadeOut(cells), FadeOut(index_labels), FadeOut(dp_header))

        trace_title = Text("Reconstruct: dp[8] = 12", font_size=28, color=YELLOW).to_edge(UP).shift(DOWN * 0.8)
        self.play(Write(trace_title))
        self.wait(0.3)

        trace_steps = [
            "dp[8]=12, try Item A (w=2,v=3): dp[8-2]=dp[6]=9, 9+3=12 ✓ → take Item A",
            "dp[6]=9,  try Item A (w=2,v=3): dp[6-2]=dp[4]=6, 6+3=9  ✓ → take Item A",
            "dp[4]=6,  try Item A (w=2,v=3): dp[4-2]=dp[2]=3, 3+3=6  ✓ → take Item A",
            "dp[2]=3,  try Item A (w=2,v=3): dp[2-2]=dp[0]=0, 0+3=3  ✓ → take Item A",
            "dp[0]=0   → done. Selected: 4× Item A, total value = 12",
        ]

        trace_group = VGroup()
        for step in trace_steps:
            t = Text(step, font_size=20, color=WHITE)
            trace_group.add(t)
        trace_group.arrange(DOWN, buff=0.3, aligned_edge=LEFT).next_to(trace_title, DOWN, buff=0.4)

        for line in trace_group:
            self.play(Write(line, run_time=0.6))
            self.wait(0.5)
        self.wait(1.0)

        self.play(FadeOut(trace_title), FadeOut(trace_group), FadeOut(chapter_label4))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Complexity Summary")
        self.complexity_card(
            time_best="O(W \\times n)",
            time_avg="O(W \\times n)",
            time_worst="O(W \\times n)",
            space="O(W)",
        )
        self.wait(1.5)
