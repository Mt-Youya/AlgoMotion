from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    COBALT, SIGNAL, CORAL, GRAY, INK, MIST,
    C_ACTIVE, C_DEFAULT, C_SORTED,
)


class MaxSubarray(AlgoScene):
    TITLE = "Maximum Subarray"
    SUBTITLE = "Find contiguous subarray with largest sum using Kadane's algorithm."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        chapter1 = self.chapter_title("Problem Setup")

        arr_values = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

        problem_text = Text(
            "Find the contiguous subarray with the largest sum.",
            font_size=26, color=INK,
        ).move_to(UP * 1.5)

        arr_label = Text("Input Array:", font_size=28, color=INK).to_edge(LEFT).shift(UP * 0.2)

        cells = VGroup()
        for v in arr_values:
            color = CORAL if v < 0 else COBALT
            cell = VGroup(
                Square(side_length=0.75, color=color, fill_color=color, fill_opacity=0.3, stroke_width=2),
                Text(str(v), font_size=22, color=INK),
            )
            cell[1].move_to(cell[0].get_center())
            cells.add(cell)

        cells.arrange(RIGHT, buff=0.1).next_to(arr_label, RIGHT, buff=0.3)

        index_labels = VGroup(*[
            Text(str(i), font_size=16, color=GRAY).next_to(cells[i], DOWN, buff=0.1)
            for i in range(len(arr_values))
        ])

        self.play(Write(problem_text))
        self.wait(0.6)
        self.play(Write(arr_label), LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.08))
        self.play(LaggedStart(*[FadeIn(idx) for idx in index_labels], lag_ratio=0.06))
        self.wait(1.0)

        answer_note = Text(
            "Answer: subarray [4, -1, 2, 1] at indices 3–6, sum = 6",
            font_size=24, color=SIGNAL,
        ).next_to(cells, DOWN, buff=0.7)
        self.play(Write(answer_note))
        self.wait(1.2)

        self.play(
            FadeOut(problem_text), FadeOut(answer_note),
            FadeOut(arr_label), FadeOut(index_labels),
        )
        self.play(FadeOut(chapter1))

        # ── Stage 2: Kadane's Algorithm Idea ────────────────────────────────
        chapter2 = self.chapter_title("Kadane's Algorithm Idea")

        idea_lines = VGroup(
            Text("Key insight: at each position, decide:", font_size=26, color=INK),
            Text("  • Extend the current subarray, OR", font_size=24, color=COBALT),
            Text("  • Start a fresh subarray from this element", font_size=24, color=COBALT),
            Text("current_sum = max(num, current_sum + num)", font_size=24, color=CORAL),
            Text("max_sum = max(max_sum, current_sum)", font_size=24, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN + RIGHT * 0.5)

        for line in idea_lines:
            self.play(Write(line, run_time=0.5))
            self.wait(0.3)
        self.wait(1.0)

        self.play(FadeOut(idea_lines), FadeOut(cells), FadeOut(chapter2))

        # ── Stage 3: Trace – Positions 0 to 3 ───────────────────────────────
        chapter3 = self.chapter_title("Trace: Positions 0–3")

        arr_values = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
        trace_cells = VGroup()
        for v in arr_values:
            color = CORAL if v < 0 else COBALT
            cell = VGroup(
                Square(side_length=0.75, color=color, fill_color=color, fill_opacity=0.2, stroke_width=2),
                Text(str(v), font_size=22, color=INK),
            )
            cell[1].move_to(cell[0].get_center())
            trace_cells.add(cell)
        trace_cells.arrange(RIGHT, buff=0.1).move_to(UP * 1.8)

        trace_indices = VGroup(*[
            Text(str(i), font_size=16, color=GRAY).next_to(trace_cells[i], DOWN, buff=0.1)
            for i in range(len(arr_values))
        ])

        cur_sum_label = Text("current_sum = ", font_size=26, color=INK).to_edge(LEFT).shift(DOWN * 0.2)
        cur_sum_val = Text("0", font_size=26, color=CORAL).next_to(cur_sum_label, RIGHT, buff=0.1)
        max_sum_label = Text("max_sum = ", font_size=26, color=INK).next_to(cur_sum_label, DOWN, buff=0.3).align_to(cur_sum_label, LEFT)
        max_sum_val = Text("−∞", font_size=26, color=SIGNAL).next_to(max_sum_label, RIGHT, buff=0.1)

        self.play(
            LaggedStart(*[FadeIn(c) for c in trace_cells], lag_ratio=0.06),
            LaggedStart(*[FadeIn(idx) for idx in trace_indices], lag_ratio=0.06),
        )
        self.play(Write(cur_sum_label), Write(cur_sum_val), Write(max_sum_label), Write(max_sum_val))
        self.wait(0.5)

        current_sum = 0
        max_sum = float("-inf")
        highlight_rect = SurroundingRectangle(trace_cells[0], color=SIGNAL, buff=0.05)
        self.play(Create(highlight_rect))

        steps_03 = [
            (0, -2, "max(-2, 0 + -2) = -2", "-2", "max(-∞, -2) = -2", "-2"),
            (1,  1, "max(1, -2 + 1) = 1",   "1",  "max(-2, 1) = 1",   "1"),
            (2, -3, "max(-3, 1 + -3) = -2",  "-2", "max(1, -2) = 1",   "1"),
            (3,  4, "max(4, -2 + 4) = 4",    "4",  "max(1, 4) = 4",    "4"),
        ]

        step_text = None
        for idx, val, cur_msg, cur_new, max_msg, max_new in steps_03:
            self.play(highlight_rect.animate.move_to(trace_cells[idx]))
            if step_text:
                self.play(FadeOut(step_text))
            step_text = Text(
                f"i={idx}, val={val}:  {cur_msg}  |  {max_msg}",
                font_size=20, color=INK,
            ).to_edge(DOWN, buff=0.5)
            self.play(Write(step_text))

            new_cur = Text(cur_new, font_size=26, color=CORAL).next_to(cur_sum_label, RIGHT, buff=0.1)
            new_max = Text(max_new, font_size=26, color=SIGNAL).next_to(max_sum_label, RIGHT, buff=0.1)
            self.play(Transform(cur_sum_val, new_cur), Transform(max_sum_val, new_max))
            self.play(trace_cells[idx][0].animate.set_fill(SIGNAL, opacity=0.4))
            self.wait(0.7)

        self.play(FadeOut(step_text), FadeOut(highlight_rect), FadeOut(chapter3))

        # ── Stage 4: Trace – Positions 4 to 6 (peak) ────────────────────────
        chapter4 = self.chapter_title("Trace: Positions 4–6 (Peak)")

        steps_46 = [
            (4, -1, "max(-1, 4 + -1) = 3", "3", "max(4, 3) = 4", "4"),
            (5,  2, "max(2, 3 + 2) = 5",   "5", "max(4, 5) = 5", "5"),
            (6,  1, "max(1, 5 + 1) = 6",   "6", "max(5, 6) = 6", "6"),
        ]

        highlight_rect2 = SurroundingRectangle(trace_cells[4], color=SIGNAL, buff=0.05)
        self.play(Create(highlight_rect2))

        step_text2 = None
        for idx, val, cur_msg, cur_new, max_msg, max_new in steps_46:
            self.play(highlight_rect2.animate.move_to(trace_cells[idx]))
            if step_text2:
                self.play(FadeOut(step_text2))
            step_text2 = Text(
                f"i={idx}, val={val}:  {cur_msg}  |  {max_msg}",
                font_size=20, color=INK,
            ).to_edge(DOWN, buff=0.5)
            self.play(Write(step_text2))

            new_cur = Text(cur_new, font_size=26, color=CORAL).next_to(cur_sum_label, RIGHT, buff=0.1)
            new_max = Text(max_new, font_size=26, color=SIGNAL).next_to(max_sum_label, RIGHT, buff=0.1)
            self.play(Transform(cur_sum_val, new_cur), Transform(max_sum_val, new_max))
            self.play(trace_cells[idx][0].animate.set_fill(SIGNAL, opacity=0.6))
            self.wait(0.7)

        self.play(FadeOut(step_text2), FadeOut(highlight_rect2), FadeOut(chapter4))

        # ── Stage 5: Trace – Positions 7 to 8 (decline) ────────────────────
        chapter5 = self.chapter_title("Trace: Positions 7–8 (Decline)")

        steps_78 = [
            (7, -5, "max(-5, 6 + -5) = 1", "1", "max(6, 1) = 6", "6"),
            (8,  4, "max(4, 1 + 4) = 5",   "5", "max(6, 5) = 6", "6"),
        ]

        highlight_rect3 = SurroundingRectangle(trace_cells[7], color=SIGNAL, buff=0.05)
        self.play(Create(highlight_rect3))

        step_text3 = None
        for idx, val, cur_msg, cur_new, max_msg, max_new in steps_78:
            self.play(highlight_rect3.animate.move_to(trace_cells[idx]))
            if step_text3:
                self.play(FadeOut(step_text3))
            step_text3 = Text(
                f"i={idx}, val={val}:  {cur_msg}  |  {max_msg}",
                font_size=20, color=INK,
            ).to_edge(DOWN, buff=0.5)
            self.play(Write(step_text3))

            new_cur = Text(cur_new, font_size=26, color=CORAL).next_to(cur_sum_label, RIGHT, buff=0.1)
            new_max = Text(max_new, font_size=26, color=SIGNAL).next_to(max_sum_label, RIGHT, buff=0.1)
            self.play(Transform(cur_sum_val, new_cur), Transform(max_sum_val, new_max))
            self.play(trace_cells[idx][0].animate.set_fill(COBALT, opacity=0.4))
            self.wait(0.7)

        self.play(FadeOut(step_text3), FadeOut(highlight_rect3), FadeOut(chapter5))

        # ── Stage 6: Highlight Best Subarray ────────────────────────────────
        chapter6 = self.chapter_title("Best Subarray Found")

        best_bracket = SurroundingRectangle(
            VGroup(trace_cells[3], trace_cells[6]),
            color=SIGNAL, buff=0.08, corner_radius=0.1, stroke_width=3,
        )
        best_label = Text(
            "Max subarray: [4, -1, 2, 1]  →  sum = 6",
            font_size=26, color=SIGNAL,
        ).next_to(trace_cells, DOWN, buff=0.9)

        self.play(Create(best_bracket))
        self.play(Write(best_label))
        self.wait(0.8)

        for i in range(3, 7):
            self.play(
                trace_cells[i][0].animate.set_fill(SIGNAL, opacity=0.7),
                run_time=0.2,
            )
        self.wait(1.2)

        self.play(
            FadeOut(best_bracket), FadeOut(best_label),
            FadeOut(trace_cells), FadeOut(trace_indices),
            FadeOut(cur_sum_label), FadeOut(cur_sum_val),
            FadeOut(max_sum_label), FadeOut(max_sum_val),
            FadeOut(chapter6),
        )

        # ── Stage 7: Recurrence Summary ─────────────────────────────────────
        chapter7 = self.chapter_title("Recurrence Summary")

        recurrence = VGroup(
            Text("Kadane's Recurrence:", font_size=30, color=INK, weight="BOLD"),
            Text("current_sum[i] = max(arr[i],  current_sum[i-1] + arr[i])", font_size=26, color=COBALT),
            Text("max_sum = max(max_sum,  current_sum[i])  for all i", font_size=26, color=SIGNAL),
            Text("", font_size=10),
            Text("• If current_sum becomes negative, reset by starting fresh.", font_size=22, color=GRAY),
            Text("• Only one pass through the array is needed — O(n) time.", font_size=22, color=GRAY),
            Text("• No extra space required — O(1) space.", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(ORIGIN)

        for mob in recurrence:
            self.play(Write(mob, run_time=0.45))
            self.wait(0.2)
        self.wait(1.2)

        self.play(FadeOut(recurrence), FadeOut(chapter7))

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(1)",
        )
        self.wait(1.5)
