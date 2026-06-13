from manim import *
from ...base import AlgoScene, ArrayVis


class MonotonicQueue(AlgoScene):
    TITLE = "Monotonic Queue"
    SUBTITLE = "Deque maintaining monotonic order for range max/min queries."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ───────────────────────────────────────────────────
        self.chapter_title("What is a Monotonic Queue?")

        intro_lines = VGroup(
            Text("Monotonic Queue", font_size=36, color=YELLOW),
            Text("A deque that always stays sorted (ascending or descending)", font_size=26),
            Text("Enables O(n) sliding window max / min queries", font_size=26),
            Text("Key insight: evict stale or dominated elements before inserting", font_size=24, color=BLUE_B),
        ).arrange(DOWN, buff=0.45).move_to(ORIGIN)

        self.play(FadeIn(intro_lines[0]))
        self.wait(0.6)
        self.play(FadeIn(intro_lines[1]))
        self.wait(0.6)
        self.play(FadeIn(intro_lines[2]))
        self.wait(0.6)
        self.play(FadeIn(intro_lines[3]))
        self.wait(1.2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Problem Setup ───────────────────────────────────────────
        self.chapter_title("Problem: Sliding Window Maximum")

        problem_text = VGroup(
            Text("Given array:  [1, 3, -1, -3, 5, 3, 6, 7]", font_size=28, color=WHITE),
            Text("Window size k = 3", font_size=26, color=YELLOW),
            Text("Find the maximum in every window of size k", font_size=26),
            Text("Naive approach: O(n·k)   →   Monotonic Queue: O(n)", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(problem_text[0]))
        self.wait(0.5)
        self.play(FadeIn(problem_text[1]))
        self.wait(0.5)
        self.play(FadeIn(problem_text[2]))
        self.wait(0.5)
        self.play(FadeIn(problem_text[3]))
        self.wait(1.4)
        self.play(FadeOut(problem_text))

        # ── Stage 3: Array + Deque Visual Setup ─────────────────────────────
        self.chapter_title("Visualizing the Deque State")

        arr_vals = [1, 3, -1, -3, 5, 3, 6, 7]
        n = len(arr_vals)
        cell_w, cell_h = 0.9, 0.75

        # Draw input array
        arr_cells = VGroup()
        arr_labels = VGroup()
        arr_idx_labels = VGroup()

        for i, v in enumerate(arr_vals):
            rect = Rectangle(width=cell_w, height=cell_h, color=BLUE_D, fill_opacity=0.2)
            rect.move_to(RIGHT * (i - n / 2 + 0.5) * cell_w + UP * 1.8)
            arr_cells.add(rect)
            lbl = Text(str(v), font_size=24).move_to(rect.get_center())
            arr_labels.add(lbl)
            idx_lbl = Text(str(i), font_size=16, color=GREY).next_to(rect, DOWN, buff=0.1)
            arr_idx_labels.add(idx_lbl)

        arr_title = Text("Input Array", font_size=22, color=GREY).next_to(arr_cells, UP, buff=0.3)

        # Deque visual (empty slots)
        dq_slots = 8
        dq_cells = VGroup()
        dq_labels = VGroup()

        for i in range(dq_slots):
            rect = Rectangle(width=cell_w, height=cell_h, color=ORANGE, fill_opacity=0.1)
            rect.move_to(RIGHT * (i - dq_slots / 2 + 0.5) * cell_w + DOWN * 0.5)
            dq_cells.add(rect)
            lbl = Text("_", font_size=22, color=GREY).move_to(rect.get_center())
            dq_labels.add(lbl)

        dq_title = Text("Monotonic Deque (stores indices)", font_size=22, color=ORANGE).next_to(dq_cells, UP, buff=0.3)

        result_title = Text("Window Max Results:", font_size=22, color=GREEN).move_to(DOWN * 2.0 + LEFT * 3)
        result_display = Text("[ ]", font_size=22, color=GREEN).next_to(result_title, RIGHT, buff=0.2)

        self.play(
            Create(arr_cells), Write(arr_labels), Write(arr_idx_labels),
            Write(arr_title),
            run_time=1.0
        )
        self.play(
            Create(dq_cells), Write(dq_labels),
            Write(dq_title),
            run_time=0.8
        )
        self.play(Write(result_title), Write(result_display))
        self.wait(1.0)

        # ── Stage 4: Step-by-step window sliding ────────────────────────────
        self.chapter_title("Step-by-Step: Insert & Evict")

        k = 3
        dq = []          # stores indices into arr_vals
        results = []
        dq_label_texts = ["_"] * dq_slots

        step_info = Text("", font_size=20, color=WHITE).to_edge(DOWN, buff=0.8)
        self.play(Write(step_info))

        for i, val in enumerate(arr_vals):
            # Highlight current element
            highlight = arr_cells[i].copy().set_fill(YELLOW, opacity=0.5).set_stroke(YELLOW)
            self.play(FadeIn(highlight), run_time=0.3)

            # Step annotation
            action_text = f"i={i}, val={val}: "

            # 1. Remove indices outside window
            while dq and dq[0] < i - k + 1:
                evicted = dq.pop(0)
                action_text += f"evict front idx={evicted}  "

            # 2. Remove smaller elements from back (maintain decreasing order)
            popped = []
            while dq and arr_vals[dq[-1]] <= val:
                popped.append(dq.pop())
            if popped:
                action_text += f"pop back {[arr_vals[p] for p in popped]}  "

            dq.append(i)
            action_text += f"push {val}"

            # Update deque display
            new_step = Text(action_text[:70], font_size=18, color=WHITE).to_edge(DOWN, buff=0.8)
            self.play(Transform(step_info, new_step), run_time=0.3)

            # Redraw deque labels
            for slot_i in range(dq_slots):
                if slot_i < len(dq):
                    new_txt = Text(str(arr_vals[dq[slot_i]]), font_size=22, color=ORANGE)
                else:
                    new_txt = Text("_", font_size=22, color=GREY)
                new_txt.move_to(dq_cells[slot_i].get_center())
                self.play(Transform(dq_labels[slot_i], new_txt), run_time=0.2)

            # Highlight deque cells that are active
            for slot_i in range(dq_slots):
                if slot_i < len(dq):
                    self.play(
                        dq_cells[slot_i].animate.set_fill(ORANGE, opacity=0.35),
                        run_time=0.1
                    )
                else:
                    self.play(
                        dq_cells[slot_i].animate.set_fill(ORANGE, opacity=0.05),
                        run_time=0.1
                    )

            # Record result when window is full
            if i >= k - 1:
                window_max = arr_vals[dq[0]]
                results.append(window_max)
                new_result = Text(str(results), font_size=22, color=GREEN).next_to(result_title, RIGHT, buff=0.2)
                self.play(Transform(result_display, new_result), run_time=0.3)

                # Highlight window in array
                for wi in range(i - k + 1, i + 1):
                    self.play(
                        arr_cells[wi].animate.set_fill(GREEN, opacity=0.3),
                        run_time=0.1
                    )
                self.wait(0.4)
                for wi in range(i - k + 1, i + 1):
                    self.play(
                        arr_cells[wi].animate.set_fill(BLUE_D, opacity=0.2),
                        run_time=0.1
                    )

            self.play(FadeOut(highlight), run_time=0.2)
            self.wait(0.3)

        self.wait(1.0)

        # ── Stage 5: Invariant Explanation ──────────────────────────────────
        self.chapter_title("The Monotonic Invariant")

        self.play(
            FadeOut(arr_cells), FadeOut(arr_labels), FadeOut(arr_idx_labels), FadeOut(arr_title),
            FadeOut(dq_cells), FadeOut(dq_labels), FadeOut(dq_title),
            FadeOut(result_title), FadeOut(result_display), FadeOut(step_info),
        )

        invariant_lines = VGroup(
            Text("Invariant: deque stores indices in decreasing order of values", font_size=24, color=YELLOW),
            Text("Before inserting index i:", font_size=22, color=WHITE),
            Text("  1. Pop front: remove indices outside the window [i-k+1, i]", font_size=20, color=BLUE_B),
            Text("  2. Pop back: remove all indices j where arr[j] ≤ arr[i]", font_size=20, color=BLUE_B),
            Text("  3. Push i to back", font_size=20, color=GREEN),
            Text("Window max = arr[deque.front()]  (always valid!)", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in invariant_lines:
            self.play(FadeIn(line), run_time=0.5)
            self.wait(0.4)
        self.wait(1.2)
        self.play(FadeOut(invariant_lines))

        # ── Stage 6: Amortized Analysis ──────────────────────────────────────
        self.chapter_title("Why O(n) Time?")

        analysis_lines = VGroup(
            Text("Each element is pushed to the deque exactly once", font_size=26, color=WHITE),
            Text("Each element is popped from the deque at most once", font_size=26, color=WHITE),
            Text("Total push + pop operations ≤ 2n", font_size=26, color=YELLOW),
            Text("Amortized cost per element = O(1)", font_size=26, color=GREEN),
            Text("Overall: O(n) time  |  O(k) space for the deque", font_size=24, color=BLUE_B),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        for line in analysis_lines:
            self.play(FadeIn(line), run_time=0.5)
            self.wait(0.5)
        self.wait(1.2)
        self.play(FadeOut(analysis_lines))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(k)",
        )
        self.wait(1.5)
