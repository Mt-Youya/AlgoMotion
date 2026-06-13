from manim import *
from collections import deque
from ...base import AlgoScene, ArrayVis


class SlidingWindowMax(AlgoScene):
    TITLE = "Sliding Window Maximum"
    SUBTITLE = "Uses a monotonic deque to find the maximum element in each sliding window of siz"
    CATEGORY = "two-pointers"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        title_mob = self.chapter_title("Problem Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Given an array and window size k,", font_size=28),
            Text("find the maximum in every window.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)
        self.play(FadeIn(intro_text))
        self.wait(1.5)
        self.play(FadeOut(intro_text), FadeOut(title_mob))

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        stage2_title = self.chapter_title("Array Visualization")

        nums = [1, 3, -1, -3, 5, 3, 6, 7]
        k = 3

        array_vis = ArrayVis(nums, label="nums")
        array_vis.move_to(UP * 1.5)
        self.play(FadeIn(array_vis))

        k_label = Text(f"k = {k}", font_size=32, color=YELLOW).move_to(UP * 0.3)
        self.play(Write(k_label))
        self.wait(1)

        result_label = Text("Result: []", font_size=28, color=GREEN).move_to(DOWN * 0.5)
        self.play(Write(result_label))
        self.wait(0.5)
        self.play(FadeOut(stage2_title))

        # ── Stage 3: Deque Concept ──────────────────────────────────────────
        stage3_title = self.chapter_title("Monotonic Deque Concept")

        deque_title = Text("Monotonic Deque (stores indices)", font_size=26, color=BLUE).move_to(DOWN * 1.2)
        self.play(Write(deque_title))

        deque_box = Rectangle(width=5, height=0.8, color=BLUE).move_to(DOWN * 2.0)
        deque_label = Text("deque: [ ]", font_size=24).move_to(DOWN * 2.0)
        self.play(Create(deque_box), Write(deque_label))
        self.wait(1)

        rule1 = Text("Rule: Remove indices outside window (front)", font_size=22, color=ORANGE).move_to(DOWN * 2.8)
        rule2 = Text("Rule: Remove smaller elements from back", font_size=22, color=ORANGE).move_to(DOWN * 3.3)
        self.play(Write(rule1))
        self.wait(0.5)
        self.play(Write(rule2))
        self.wait(1.5)
        self.play(FadeOut(stage3_title), FadeOut(rule1), FadeOut(rule2))

        # ── Stage 4: Step-by-step Walk (first 3 windows) ───────────────────
        stage4_title = self.chapter_title("Step-by-Step Walkthrough")

        dq = deque()
        result = []
        step_texts = []

        highlight_rects = []

        for i, val in enumerate(nums):
            # Remove out-of-window indices
            while dq and dq[0] < i - k + 1:
                dq.popleft()
            # Maintain monotonic decreasing property
            while dq and nums[dq[-1]] < val:
                dq.pop()
            dq.append(i)

            # Highlight current index in array
            highlight = array_vis.highlight_cell(i, color=YELLOW)
            self.play(Create(highlight), run_time=0.4)

            # Show deque state
            dq_str = "deque: [" + ", ".join(str(nums[j]) for j in dq) + "]"
            new_deque_label = Text(dq_str, font_size=24).move_to(DOWN * 2.0)
            self.play(Transform(deque_label, new_deque_label), run_time=0.4)

            if i >= k - 1:
                result.append(nums[dq[0]])
                res_str = "Result: [" + ", ".join(str(x) for x in result) + "]"
                new_result = Text(res_str, font_size=28, color=GREEN).move_to(DOWN * 0.5)
                self.play(Transform(result_label, new_result), run_time=0.4)

                # Highlight the window
                window_rect = SurroundingRectangle(
                    VGroup(*[array_vis.cells[j] for j in range(i - k + 1, i + 1)]),
                    color=GREEN, buff=0.05
                )
                self.play(Create(window_rect), run_time=0.3)
                step_texts.append(window_rect)

                max_highlight = array_vis.highlight_cell(dq[0], color=RED)
                self.play(Create(max_highlight), run_time=0.3)
                step_texts.append(max_highlight)

            self.wait(0.5)
            highlight_rects.append(highlight)

        self.wait(1)
        self.play(*[FadeOut(h) for h in highlight_rects + step_texts])
        self.play(FadeOut(stage4_title))

        # ── Stage 5: Algorithm Code Highlight ──────────────────────────────
        stage5_title = self.chapter_title("Algorithm Code")

        code_str = """def maxSlidingWindow(nums, k):
    dq, res = deque(), []
    for i, val in enumerate(nums):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < val:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            res.append(nums[dq[0]])
    return res"""

        code_mob = Code(
            code=code_str,
            language="Python",
            font_size=18,
            background="window",
        ).scale(0.85).move_to(DOWN * 0.5)

        self.play(FadeOut(array_vis), FadeOut(k_label), FadeOut(result_label),
                  FadeOut(deque_box), FadeOut(deque_label), FadeOut(deque_title))
        self.play(FadeIn(code_mob))
        self.wait(2)

        # Highlight key lines
        line_highlight = SurroundingRectangle(code_mob.code[3], color=YELLOW, buff=0.05)
        note1 = Text("Remove out-of-window indices", font_size=20, color=YELLOW).move_to(RIGHT * 3.5 + UP * 0.5)
        self.play(Create(line_highlight), Write(note1))
        self.wait(1)

        line_highlight2 = SurroundingRectangle(code_mob.code[5], color=ORANGE, buff=0.05)
        note2 = Text("Maintain decreasing order", font_size=20, color=ORANGE).move_to(RIGHT * 3.5 + DOWN * 0.2)
        self.play(Transform(line_highlight, line_highlight2), Write(note2))
        self.wait(1.5)

        self.play(FadeOut(code_mob), FadeOut(line_highlight), FadeOut(note1), FadeOut(note2))
        self.play(FadeOut(stage5_title))

        # ── Stage 6: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(k)",
            notes="Each element is added/removed from deque at most once → O(n) total"
        )
        self.wait(2)
