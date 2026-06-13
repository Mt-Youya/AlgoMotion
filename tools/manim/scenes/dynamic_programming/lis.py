from manim import *
from ...base import AlgoScene, DPTable


class Lis(AlgoScene):
    TITLE = "Longest Increasing Subsequence"
    SUBTITLE = "Find the longest strictly increasing subsequence."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        arr = [3, 1, 4, 1, 5, 9, 2, 6]
        n = len(arr)

        label = Text("Input Array:", font_size=28, color=WHITE).shift(UP * 1.5 + LEFT * 4)

        boxes = VGroup()
        for i, val in enumerate(arr):
            box = Square(side_length=0.7, color=BLUE_D, fill_opacity=0.3)
            box.shift(UP * 1.5 + LEFT * 2.45 + RIGHT * i * 0.85)
            lbl = Text(str(val), font_size=26, color=WHITE).move_to(box.get_center())
            idx_lbl = Text(str(i), font_size=16, color=GRAY).next_to(box, DOWN, buff=0.1)
            boxes.add(VGroup(box, lbl, idx_lbl))

        intro_note = VGroup(
            Text("Goal: find the longest subsequence where each", font_size=22, color=WHITE),
            Text("element is strictly greater than the previous.", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.15).shift(DOWN * 0.5)

        example_note = Text(
            "Example: [1, 4, 5, 9] has length 4 → one valid LIS",
            font_size=20,
            color=YELLOW,
        ).shift(DOWN * 1.5)

        self.play(Write(label))
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes], lag_ratio=0.1))
        self.play(FadeIn(intro_note))
        self.play(FadeIn(example_note))
        self.wait(1.5)
        self.play(FadeOut(intro_note), FadeOut(example_note), FadeOut(ch1))

        # ── Stage 2: What is a Subsequence? ─────────────────────────────────
        ch2 = self.chapter_title("Subsequences vs Subarrays")

        subseq_note = VGroup(
            Text("Subsequence: elements in order, not necessarily contiguous.", font_size=22, color=WHITE),
            Text("Subarray: elements must be contiguous.", font_size=22, color=YELLOW),
            Text("LIS uses subsequence — we can skip elements.", font_size=22, color=GREEN_C),
        ).arrange(DOWN, buff=0.3).shift(DOWN * 1.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in subseq_note], lag_ratio=0.3))
        self.wait(1.0)

        # Highlight one valid LIS: indices 1,2,4,5 → values 1,4,5,9
        lis_indices = [1, 2, 4, 5]
        for idx in lis_indices:
            self.play(
                boxes[idx][0].animate.set_fill(GREEN, opacity=0.6),
                run_time=0.35,
            )

        lis_label = Text("[1, 4, 5, 9] — length 4", font_size=22, color=GREEN_B).shift(DOWN * 2.5)
        self.play(FadeIn(lis_label))
        self.wait(1.2)

        self.play(FadeOut(subseq_note), FadeOut(lis_label), FadeOut(ch2))
        for b in boxes:
            b[0].set_fill(BLUE_D, opacity=0.3)

        # ── Stage 3: DP Recurrence ───────────────────────────────────────────
        ch3 = self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[i] = 1 + \max_{j < i,\; arr[j] < arr[i]} \text{dp}[j]",
            font_size=32,
            color=WHITE,
        ).shift(UP * 0.2)

        base_case = MathTex(
            r"\text{dp}[i] = 1 \quad \text{(base: each element is its own LIS)}",
            font_size=26,
            color=YELLOW,
        ).shift(DOWN * 0.7)

        explanation = VGroup(
            Text("dp[i] = length of LIS ending at index i", font_size=22, color=WHITE),
            Text("For each i, look back at all j < i where arr[j] < arr[i]", font_size=22, color=GRAY),
            Text("Answer = max(dp[0], dp[1], ..., dp[n-1])", font_size=22, color=GREEN_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.0)

        self.play(Write(recurrence))
        self.wait(0.5)
        self.play(FadeIn(base_case))
        self.wait(0.5)
        self.play(LaggedStart(*[FadeIn(line) for line in explanation], lag_ratio=0.3))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(base_case), FadeOut(explanation), FadeOut(ch3))

        # ── Stage 4: Initialize dp Array ────────────────────────────────────
        ch4 = self.chapter_title("Initialize dp Array")

        arr_short = [3, 1, 4, 1, 5, 9, 2, 6]
        dp = [1] * len(arr_short)

        dp_label = Text("dp Array:", font_size=28, color=WHITE).shift(DOWN * 0.4 + LEFT * 4)

        dp_boxes = VGroup()
        for i in range(n):
            box = Square(side_length=0.7, color=ORANGE, fill_opacity=0.2)
            box.shift(DOWN * 0.4 + LEFT * 2.45 + RIGHT * i * 0.85)
            lbl = Text("1", font_size=26, color=ORANGE).move_to(box.get_center())
            dp_boxes.add(VGroup(box, lbl))

        init_note = Text(
            "Every element starts as a subsequence of length 1 (itself).",
            font_size=20,
            color=GRAY,
        ).shift(DOWN * 1.8)

        self.play(Write(dp_label))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in dp_boxes], lag_ratio=0.1))
        self.play(FadeIn(init_note))
        self.wait(1.2)
        self.play(FadeOut(init_note), FadeOut(ch4))

        # ── Stage 5: Fill dp Step by Step ───────────────────────────────────
        ch5 = self.chapter_title("Filling dp Step by Step")

        step_note = Text("", font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        for i in range(1, n):
            # Highlight current element
            self.play(
                boxes[i][0].animate.set_fill(YELLOW, opacity=0.5),
                run_time=0.3,
            )
            best = 1
            for j in range(i):
                if arr_short[j] < arr_short[i]:
                    # Show comparison arrow
                    self.play(
                        boxes[j][0].animate.set_fill(BLUE, opacity=0.5),
                        run_time=0.2,
                    )
                    if dp[j] + 1 > best:
                        best = dp[j] + 1
                    self.play(
                        boxes[j][0].animate.set_fill(BLUE_D, opacity=0.3),
                        run_time=0.15,
                    )

            dp[i] = best
            note_str = f"dp[{i}] = {dp[i]}  (arr[{i}]={arr_short[i]})"
            new_note = Text(note_str, font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
            self.play(Transform(step_note, new_note), run_time=0.25)

            # Update dp box value
            new_val = Text(str(dp[i]), font_size=26, color=GREEN_C if dp[i] > 1 else ORANGE)
            new_val.move_to(dp_boxes[i].get_center())
            self.play(
                Transform(dp_boxes[i][1], new_val),
                dp_boxes[i][0].animate.set_fill(GREEN, opacity=0.3) if dp[i] > 1 else Animation(dp_boxes[i][0]),
                run_time=0.35,
            )
            self.play(
                boxes[i][0].animate.set_fill(BLUE_D, opacity=0.3),
                run_time=0.2,
            )

        self.wait(0.8)
        self.play(FadeOut(step_note), FadeOut(ch5))

        # ── Stage 6: Highlight Answer ────────────────────────────────────────
        ch6 = self.chapter_title("Finding the Answer")

        lis_len = max(dp)
        lis_end_idx = dp.index(lis_len)

        answer_text = Text(
            f"LIS length = max(dp) = {lis_len}",
            font_size=32,
            color=GREEN_C,
            weight="BOLD",
        ).shift(DOWN * 1.6)

        # Highlight the cell with max dp value
        self.play(
            dp_boxes[lis_end_idx][0].animate.set_fill(YELLOW, opacity=0.7),
            run_time=0.4,
        )
        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(0.8)

        # Traceback the actual LIS
        traceback_note = Text(
            "Traceback: walk backwards from the max dp cell to reconstruct the LIS.",
            font_size=20,
            color=YELLOW,
        ).shift(DOWN * 2.3)
        self.play(FadeIn(traceback_note))

        # Reconstruct LIS path
        lis_path = []
        cur_len = lis_len
        for i in range(n - 1, -1, -1):
            if dp[i] == cur_len:
                lis_path.append(i)
                cur_len -= 1
        lis_path.reverse()

        for idx in lis_path:
            self.play(
                boxes[idx][0].animate.set_fill(GREEN, opacity=0.7),
                run_time=0.3,
            )

        lis_values = [arr_short[i] for i in lis_path]
        lis_str = str(lis_values)
        lis_result_label = Text(
            f"One LIS: {lis_str}",
            font_size=26,
            color=GREEN_B,
        ).shift(DOWN * 0.8)
        self.play(FadeIn(lis_result_label))
        self.wait(1.5)

        self.play(
            FadeOut(answer_text),
            FadeOut(traceback_note),
            FadeOut(lis_result_label),
            FadeOut(label),
            FadeOut(boxes),
            FadeOut(dp_label),
            FadeOut(dp_boxes),
            FadeOut(ch6),
        )

        # ── Stage 7: Binary Search Optimization ─────────────────────────────
        ch7 = self.chapter_title("O(n log n) Optimization: Patience Sort")

        opt_note = VGroup(
            Text("The naive O(n²) approach checks all previous elements.", font_size=22, color=WHITE),
            Text("Patience Sorting maintains a 'tails' array using binary search.", font_size=22, color=YELLOW),
            Text("tails[i] = smallest tail element of all LIS of length i+1.", font_size=22, color=GREEN_C),
            Text("Binary search finds the correct position in O(log n).", font_size=22, color=WHITE),
            Text("Overall: O(n log n) time, O(n) space.", font_size=22, color=TEAL_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).shift(DOWN * 0.3)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in opt_note], lag_ratio=0.25))
        self.wait(2.0)
        self.play(FadeOut(opt_note), FadeOut(ch7))

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        ch8 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        self.complexity_card(
            time_best=r"O(n \log n)",
            time_avg=r"O(n \log n)",
            time_worst=r"O(n^2)",
            space=r"O(n)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch8))
