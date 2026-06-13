from manim import *
from ...base import AlgoScene


class MonotonicStack(AlgoScene):
    TITLE = "Monotonic Stack"
    SUBTITLE = "Stack maintaining monotonic sequence for next greater/smaller element in O(n)."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro — What is a Monotonic Stack? ─────────────────────
        ch1 = self.chapter_title("What is a Monotonic Stack?")

        intro_lines = VGroup(
            Text("A Monotonic Stack is a regular stack with one extra rule:", font_size=26),
            Text("  Elements are always kept in a sorted (monotonic) order.", font_size=26, color=YELLOW),
            Text("", font_size=8),
            Text("Two flavours:", font_size=24),
            Text("  • Monotonic Increasing Stack  — bottom to top: small → large", font_size=24, color=GREEN),
            Text("  • Monotonic Decreasing Stack  — bottom to top: large → small", font_size=24, color=ORANGE),
            Text("", font_size=8),
            Text("Core use-case: find Next Greater / Next Smaller element for", font_size=24),
            Text("every position in O(n) instead of brute-force O(n²).", font_size=24, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).scale(0.92).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro_lines), FadeOut(ch1))
        self.wait(0.3)

        # ── Stage 2: Input Array Setup ───────────────────────────────────────
        ch2 = self.chapter_title("Input Array")

        values = [2, 1, 5, 3, 6, 4, 8, 7]
        n = len(values)
        cell_w = 0.85

        # Draw input array
        arr_group = VGroup()
        arr_cells = []
        arr_labels = []
        arr_idx = []
        for i, v in enumerate(values):
            cell = Square(side_length=cell_w, color="#2255CC", fill_color="#2255CC", fill_opacity=0.2, stroke_width=2.5)
            cell.move_to(RIGHT * (i - n / 2 + 0.5) * cell_w + UP * 1.2)
            lbl = Text(str(v), font_size=26, color="#1A1C2C", weight="BOLD").move_to(cell)
            idx = Text(str(i), font_size=16, color="#888899").next_to(cell, DOWN, buff=0.1)
            arr_cells.append(cell)
            arr_labels.append(lbl)
            arr_idx.append(idx)
            arr_group.add(cell, lbl, idx)

        arr_title = Text("arr = [2, 1, 5, 3, 6, 4, 8, 7]", font_size=24, color="#888899")
        arr_title.next_to(arr_group, UP, buff=0.4)

        self.play(FadeIn(arr_title), LaggedStart(*[FadeIn(VGroup(c, l, ix)) for c, l, ix in zip(arr_cells, arr_labels, arr_idx)], lag_ratio=0.1))
        self.wait(1.0)

        # Draw empty stack container on the right
        stack_box = Rectangle(width=1.2, height=3.5, color="#888899", stroke_width=2)
        stack_box.set_fill(BLACK, opacity=0.0)
        stack_box.move_to(RIGHT * 4.2 + DOWN * 0.2)
        stack_title = Text("Stack", font_size=20, color="#888899").next_to(stack_box, UP, buff=0.15)
        stack_top_lbl = Text("TOP", font_size=16, color=YELLOW).next_to(stack_box, UP, buff=0.5)

        self.play(Create(stack_box), Write(stack_title), Write(stack_top_lbl))
        self.wait(0.5)

        # NGE result array
        nge_cells = []
        nge_labels = []
        nge_group = VGroup()
        for i in range(n):
            cell = Square(side_length=cell_w, color="#E05A3A", fill_color="#E05A3A", fill_opacity=0.1, stroke_width=2)
            cell.move_to(RIGHT * (i - n / 2 + 0.5) * cell_w + DOWN * 1.6)
            lbl = Text("?", font_size=24, color="#888899").move_to(cell)
            nge_cells.append(cell)
            nge_labels.append(lbl)
            nge_group.add(cell, lbl)

        nge_title = Text("NGE = [ ?, ?, ?, ?, ?, ?, ?, ? ]", font_size=22, color="#E05A3A")
        nge_title.next_to(nge_group, DOWN, buff=0.25)

        self.play(FadeIn(nge_group), Write(nge_title))
        self.wait(1.0)
        self.play(FadeOut(ch2))

        # ── Stage 3: Next Greater Element — Step-by-Step ────────────────────
        ch3 = self.chapter_title("Next Greater Element  (Decreasing Stack)")

        caption_mob = Text("", font_size=22, color="#888899").to_edge(DOWN, buff=0.4)
        self.add(caption_mob)

        nge_result = [-1] * n
        stack_vals = []       # stack of indices
        stack_slots = []      # VGroup slots currently in the stack box

        slot_base_y = stack_box.get_bottom()[1] + 0.45
        slot_w = 1.0
        slot_h = 0.6

        def make_stack_slot(val, depth):
            box = Rectangle(width=slot_w, height=slot_h, color=YELLOW, fill_color=YELLOW, fill_opacity=0.25, stroke_width=2)
            box.move_to([stack_box.get_center()[0], slot_base_y + depth * slot_h, 0])
            lbl = Text(str(val), font_size=22, color="#1A1C2C", weight="BOLD").move_to(box)
            return VGroup(box, lbl)

        for i, v in enumerate(values):
            # Highlight current element
            self.play(arr_cells[i].animate.set_fill(color="#CEEB5A", opacity=0.7), run_time=0.3)

            new_caption = Text(f"i={i}  arr[i]={v}  →  check stack top", font_size=20, color="#888899")
            new_caption.to_edge(DOWN, buff=0.4)
            self.play(Transform(caption_mob, new_caption), run_time=0.3)

            # Pop while stack top < current value
            while stack_vals and values[stack_vals[-1]] < v:
                popped_idx = stack_vals.pop()
                popped_slot = stack_slots.pop()
                nge_result[popped_idx] = v

                # Animate: highlight popped cell, update NGE
                self.play(
                    arr_cells[popped_idx].animate.set_fill(color="#E05A3A", opacity=0.5),
                    run_time=0.3,
                )
                new_nge_lbl = Text(str(v), font_size=24, color="#E05A3A", weight="BOLD").move_to(nge_cells[popped_idx])
                self.play(
                    Transform(nge_labels[popped_idx], new_nge_lbl),
                    popped_slot.animate.shift(RIGHT * 2.5).fade(1),
                    run_time=0.45,
                )
                self.play(arr_cells[popped_idx].animate.set_fill(color="#CEEB5A", opacity=0.3), run_time=0.2)

            # Push current index
            depth = len(stack_vals)
            new_slot = make_stack_slot(v, depth)
            new_slot.shift(UP * 2.0)  # start above
            self.play(new_slot.animate.shift(DOWN * 2.0), run_time=0.4)
            stack_vals.append(i)
            stack_slots.append(new_slot)

            self.wait(0.3)
            self.play(arr_cells[i].animate.set_fill(color="#2255CC", opacity=0.2), run_time=0.2)

        # Remaining stack → NGE = -1
        while stack_vals:
            popped_idx = stack_vals.pop()
            popped_slot = stack_slots.pop()
            nge_result[popped_idx] = -1
            new_nge_lbl = Text("-1", font_size=22, color="#888899").move_to(nge_cells[popped_idx])
            self.play(
                Transform(nge_labels[popped_idx], new_nge_lbl),
                popped_slot.animate.shift(RIGHT * 2.0).fade(1),
                run_time=0.4,
            )

        self.wait(1.2)
        self.play(FadeOut(caption_mob), FadeOut(ch3))

        # ── Stage 4: Result Summary ──────────────────────────────────────────
        ch4 = self.chapter_title("Result: Next Greater Element")

        result_str = "NGE = [" + ", ".join(str(x) for x in nge_result) + "]"
        result_label = Text(result_str, font_size=26, color="#E05A3A", weight="BOLD")
        result_label.next_to(nge_group, DOWN, buff=0.35)

        self.play(FadeOut(nge_title), FadeIn(result_label))
        self.wait(0.8)

        # Mark all sorted/resolved cells green
        self.play(AnimationGroup(*[c.animate.set_fill(color="#CEEB5A", opacity=0.5) for c in nge_cells], run_time=0.5))
        self.wait(1.5)

        # Fade out current state
        self.play(
            FadeOut(arr_group), FadeOut(arr_title),
            FadeOut(nge_group), FadeOut(result_label),
            FadeOut(stack_box), FadeOut(stack_title), FadeOut(stack_top_lbl),
            FadeOut(ch4),
        )
        self.wait(0.3)

        # ── Stage 5: Algorithm Walkthrough — Key Insight ─────────────────────
        ch5 = self.chapter_title("Why Does It Work?")

        insight_lines = VGroup(
            Text("Each element is pushed exactly once  →  O(n) pushes total", font_size=24, color=GREEN),
            Text("Each element is popped at most once  →  O(n) pops total", font_size=24, color=GREEN),
            Text("Total work = O(n)  regardless of input order", font_size=26, color=YELLOW),
            Text("", font_size=8),
            Text("Invariant: the stack always holds a decreasing sequence", font_size=24),
            Text("from bottom to top.  When a larger value arrives, it 'answers'", font_size=24),
            Text("the NGE query for every smaller element it pops off.", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).scale(0.9).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.3) for l in insight_lines], lag_ratio=0.18))
        self.wait(2.5)
        self.play(FadeOut(insight_lines), FadeOut(ch5))
        self.wait(0.3)

        # ── Stage 6: Monotonic Increasing Stack Demo ─────────────────────────
        ch6 = self.chapter_title("Increasing Stack: Next Smaller Element")

        values2 = [4, 3, 2, 5, 1]
        n2 = len(values2)
        arr2_group = VGroup()
        arr2_cells = []
        arr2_labels = []
        for i, v in enumerate(values2):
            cell = Square(side_length=0.9, color="#2255CC", fill_color="#2255CC", fill_opacity=0.2, stroke_width=2.5)
            cell.move_to(RIGHT * (i - n2 / 2 + 0.5) * 0.9 + UP * 1.0)
            lbl = Text(str(v), font_size=28, color="#1A1C2C", weight="BOLD").move_to(cell)
            arr2_cells.append(cell)
            arr2_labels.append(lbl)
            arr2_group.add(cell, lbl)

        arr2_title = Text("arr = [4, 3, 2, 5, 1]  →  Next Smaller Element", font_size=22, color="#888899")
        arr2_title.next_to(arr2_group, UP, buff=0.4)

        nse_cells = []
        nse_labels = []
        nse_group = VGroup()
        for i in range(n2):
            cell = Square(side_length=0.9, color="#8855CC", fill_color="#8855CC", fill_opacity=0.1, stroke_width=2)
            cell.move_to(RIGHT * (i - n2 / 2 + 0.5) * 0.9 + DOWN * 1.2)
            lbl = Text("?", font_size=24, color="#888899").move_to(cell)
            nse_cells.append(cell)
            nse_labels.append(lbl)
            nse_group.add(cell, lbl)

        nse_title = Text("NSE = [ ?, ?, ?, ?, ? ]", font_size=22, color="#8855CC")
        nse_title.next_to(nse_group, DOWN, buff=0.25)

        self.play(FadeIn(arr2_title), FadeIn(arr2_group), FadeIn(nse_group), Write(nse_title))
        self.wait(0.8)

        # Simulate increasing stack for NSE
        stack2 = []
        nse_result = [-1] * n2
        for i, v in enumerate(values2):
            self.play(arr2_cells[i].animate.set_fill(color="#CEEB5A", opacity=0.7), run_time=0.3)
            while stack2 and values2[stack2[-1]] > v:
                pi = stack2.pop()
                nse_result[pi] = v
                new_lbl = Text(str(v), font_size=24, color="#8855CC", weight="BOLD").move_to(nse_cells[pi])
                self.play(Transform(nse_labels[pi], new_lbl), run_time=0.35)
            stack2.append(i)
            self.play(arr2_cells[i].animate.set_fill(color="#2255CC", opacity=0.2), run_time=0.2)
            self.wait(0.2)

        for pi in stack2:
            new_lbl = Text("-1", font_size=22, color="#888899").move_to(nse_cells[pi])
            self.play(Transform(nse_labels[pi], new_lbl), run_time=0.3)

        nse_str = "NSE = [" + ", ".join(str(x) for x in nse_result) + "]"
        nse_result_lbl = Text(nse_str, font_size=24, color="#8855CC", weight="BOLD")
        nse_result_lbl.next_to(nse_group, DOWN, buff=0.35)
        self.play(FadeOut(nse_title), FadeIn(nse_result_lbl))
        self.wait(1.5)

        self.play(FadeOut(arr2_group), FadeOut(arr2_title), FadeOut(nse_group), FadeOut(nse_result_lbl), FadeOut(ch6))
        self.wait(0.3)

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Time & Space Complexity")

        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(n)",
        )
        self.wait(2.0)
