from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, MIST, INK, GRAY, C_ACTIVE, C_SORTED, C_DEFAULT
)

WATER_BLUE = "#5BA4CF"
LEFT_COLOR = "#F0A030"
RIGHT_COLOR = "#CC55AA"


class TrappingRainWater(AlgoScene):
    TITLE = "Trapping Rain Water"
    SUBTITLE = "Uses two pointers tracking left/right maximums to compute the total water trappe"
    CATEGORY = "two-pointers"

    def build(self):
        heights = [0, 1, 0, 2, 1, 0, 1, 3, 1, 0, 1, 2]

        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        stage1 = self.chapter_title("Problem Setup")

        problem_lines = VGroup(
            Text("Given an array of non-negative integers", font_size=28, color=INK),
            Text("representing bar heights in a histogram,", font_size=28, color=INK),
            Text("compute how much water can be trapped after raining.", font_size=28, color=INK),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.0)

        example_label = Text(
            "heights = [0,1,0,2,1,0,1,3,1,0,1,2]  →  answer = 6",
            font_size=24, color=COBALT,
        ).next_to(problem_lines, DOWN, buff=0.5)

        self.play(FadeIn(problem_lines, shift=UP * 0.2))
        self.play(Write(example_label))
        self.wait(2.0)
        self.play(FadeOut(problem_lines), FadeOut(example_label), FadeOut(stage1))

        # ── Stage 2: Bar Histogram Visualization ────────────────────────────
        stage2 = self.chapter_title("Histogram Visualization")

        bar_width = 0.55
        bar_group = VGroup()
        bars = []
        bar_labels = []

        for i, h in enumerate(heights):
            bar_height = max(h * 0.55, 0.05)
            bar = Rectangle(
                width=bar_width,
                height=bar_height,
                fill_color=INK,
                fill_opacity=0.85,
                stroke_color=INK,
                stroke_width=1.5,
            )
            bar.move_to(
                RIGHT * (i - len(heights) / 2 + 0.5) * bar_width
                + UP * (bar_height / 2 - 1.5)
            )
            bars.append(bar)
            bar_group.add(bar)

            val_lbl = Text(str(h), font_size=16, color=GRAY)
            val_lbl.next_to(bar, UP, buff=0.08)
            bar_labels.append(val_lbl)
            bar_group.add(val_lbl)

        self.play(Create(bar_group, run_time=1.2))
        self.wait(1.0)
        self.play(FadeOut(stage2))

        # ── Stage 3: Brute-Force Intuition (Why O(n²) is Naive) ─────────────
        stage3 = self.chapter_title("Naive Approach")

        naive_text = VGroup(
            Text("For each bar i, water[i] = min(maxLeft, maxRight) - height[i]", font_size=22, color=INK),
            Text("Naive: scan left and right for each bar → O(n²)", font_size=22, color=CORAL),
            Text("Better: precompute prefix max arrays → O(n) time, O(n) space", font_size=22, color=COBALT),
            Text("Best: two-pointer technique → O(n) time, O(1) space", font_size=22, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(DOWN * 0.5)

        for line in naive_text:
            self.play(FadeIn(line, shift=RIGHT * 0.15))
            self.wait(0.5)

        self.wait(1.5)
        self.play(FadeOut(naive_text), FadeOut(stage3))

        # ── Stage 4: Two-Pointer Algorithm Walkthrough ───────────────────────
        stage4 = self.chapter_title("Two-Pointer Algorithm")

        # Rebuild bars lower for space
        bar_group2 = VGroup()
        bars2 = []
        baseline_y = -1.8

        for i, h in enumerate(heights):
            bar_height = max(h * 0.45, 0.05)
            bar = Rectangle(
                width=bar_width,
                height=bar_height,
                fill_color=INK,
                fill_opacity=0.85,
                stroke_color=INK,
                stroke_width=1.5,
            )
            bar.move_to(
                RIGHT * (i - len(heights) / 2 + 0.5) * bar_width
                + UP * (baseline_y + bar_height / 2)
            )
            bars2.append(bar)
            bar_group2.add(bar)

        self.play(Create(bar_group2, run_time=0.8))

        # Left and right pointer arrows
        left_ptr = 0
        right_ptr = len(heights) - 1
        left_max = 0
        right_max = 0
        total_water = 0

        def get_bar_top(idx):
            return bars2[idx].get_top()

        def get_bar_bottom(idx):
            return bars2[idx].get_bottom()

        def get_bar_center_x(idx):
            return bars2[idx].get_center()[0]

        left_arrow = Arrow(
            start=get_bar_top(left_ptr) + UP * 0.7,
            end=get_bar_top(left_ptr) + UP * 0.1,
            color=LEFT_COLOR, buff=0.0, stroke_width=4,
        )
        right_arrow = Arrow(
            start=get_bar_top(right_ptr) + UP * 0.7,
            end=get_bar_top(right_ptr) + UP * 0.1,
            color=RIGHT_COLOR, buff=0.0, stroke_width=4,
        )
        left_lbl = Text("L", font_size=20, color=LEFT_COLOR).next_to(left_arrow, UP, buff=0.05)
        right_lbl = Text("R", font_size=20, color=RIGHT_COLOR).next_to(right_arrow, UP, buff=0.05)

        self.play(GrowArrow(left_arrow), GrowArrow(right_arrow))
        self.play(FadeIn(left_lbl), FadeIn(right_lbl))

        status_text = Text(
            f"L={left_ptr}  R={right_ptr}  lmax={left_max}  rmax={right_max}  water={total_water}",
            font_size=20, color=INK,
        ).to_edge(UP, buff=0.5)
        self.play(FadeIn(status_text))
        self.wait(0.8)
        self.play(FadeOut(stage4))

        # ── Stage 5: Step-by-Step Pointer Movement ───────────────────────────
        stage5 = self.chapter_title("Pointer Movement Steps")
        self.wait(0.3)

        water_rects = []

        # Run the two-pointer algorithm with animation
        steps_to_show = 10  # show first 10 steps for animation clarity
        step_count = 0

        while left_ptr < right_ptr and step_count < steps_to_show:
            step_count += 1
            if heights[left_ptr] <= heights[right_ptr]:
                if heights[left_ptr] >= left_max:
                    left_max = heights[left_ptr]
                    bars2[left_ptr].animate.set_fill(SIGNAL)
                    self.play(bars2[left_ptr].animate.set_fill(SIGNAL, opacity=0.9), run_time=0.3)
                else:
                    water_amt = left_max - heights[left_ptr]
                    total_water += water_amt
                    # Draw water rectangle above bar
                    water_height = water_amt * 0.45
                    bar_top = get_bar_top(left_ptr)
                    water_rect = Rectangle(
                        width=bar_width * 0.9,
                        height=water_height,
                        fill_color=WATER_BLUE,
                        fill_opacity=0.65,
                        stroke_color=WATER_BLUE,
                        stroke_width=1,
                    )
                    water_rect.move_to(bar_top + UP * water_height / 2)
                    water_rects.append(water_rect)
                    self.play(FadeIn(water_rect, run_time=0.35))

                left_ptr += 1
                new_left_arrow = Arrow(
                    start=get_bar_top(left_ptr) + UP * 0.7,
                    end=get_bar_top(left_ptr) + UP * 0.1,
                    color=LEFT_COLOR, buff=0.0, stroke_width=4,
                )
                new_left_lbl = Text("L", font_size=20, color=LEFT_COLOR).next_to(new_left_arrow, UP, buff=0.05)
                self.play(
                    Transform(left_arrow, new_left_arrow),
                    Transform(left_lbl, new_left_lbl),
                    run_time=0.4,
                )
            else:
                if heights[right_ptr] >= right_max:
                    right_max = heights[right_ptr]
                    self.play(bars2[right_ptr].animate.set_fill(SIGNAL, opacity=0.9), run_time=0.3)
                else:
                    water_amt = right_max - heights[right_ptr]
                    total_water += water_amt
                    water_height = water_amt * 0.45
                    bar_top = get_bar_top(right_ptr)
                    water_rect = Rectangle(
                        width=bar_width * 0.9,
                        height=water_height,
                        fill_color=WATER_BLUE,
                        fill_opacity=0.65,
                        stroke_color=WATER_BLUE,
                        stroke_width=1,
                    )
                    water_rect.move_to(bar_top + UP * water_height / 2)
                    water_rects.append(water_rect)
                    self.play(FadeIn(water_rect, run_time=0.35))

                right_ptr -= 1
                new_right_arrow = Arrow(
                    start=get_bar_top(right_ptr) + UP * 0.7,
                    end=get_bar_top(right_ptr) + UP * 0.1,
                    color=RIGHT_COLOR, buff=0.0, stroke_width=4,
                )
                new_right_lbl = Text("R", font_size=20, color=RIGHT_COLOR).next_to(new_right_arrow, UP, buff=0.05)
                self.play(
                    Transform(right_arrow, new_right_arrow),
                    Transform(right_lbl, new_right_lbl),
                    run_time=0.4,
                )

            new_status = Text(
                f"L={left_ptr}  R={right_ptr}  lmax={left_max}  rmax={right_max}  water={total_water}",
                font_size=20, color=INK,
            ).to_edge(UP, buff=0.5)
            self.play(Transform(status_text, new_status), run_time=0.3)
            self.wait(0.4)

        self.wait(1.0)
        self.play(FadeOut(stage5))

        # ── Stage 6: Result and Algorithm Summary ────────────────────────────
        stage6 = self.chapter_title("Result")

        result_text = Text(
            f"Total water trapped = 6 units",
            font_size=36, color=WATER_BLUE, weight="BOLD",
        ).move_to(UP * 2.0)

        self.play(Write(result_text))
        if water_rects:
            self.play(*[Flash(r, color=WATER_BLUE, flash_radius=0.3) for r in water_rects[:3]])
        self.wait(1.0)

        self.play(
            FadeOut(bar_group2),
            FadeOut(left_arrow), FadeOut(right_arrow),
            FadeOut(left_lbl), FadeOut(right_lbl),
            FadeOut(status_text),
            FadeOut(result_text),
            *[FadeOut(r) for r in water_rects],
        )

        algorithm_steps = VGroup(
            Text("① Set left=0, right=n-1, lmax=0, rmax=0, water=0", font_size=22, color=INK),
            Text("② While left < right:", font_size=22, color=INK),
            Text("   If height[left] <= height[right]:", font_size=21, color=COBALT),
            Text("     If height[left] >= lmax → update lmax", font_size=20, color=COBALT),
            Text("     Else → water += lmax - height[left]", font_size=20, color=WATER_BLUE),
            Text("     left += 1", font_size=20, color=COBALT),
            Text("   Else: symmetric logic on right side", font_size=21, color=RIGHT_COLOR),
            Text("③ Return water", font_size=22, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).scale(0.95)
        algorithm_steps.move_to(ORIGIN)

        for step in algorithm_steps:
            self.play(FadeIn(step, shift=RIGHT * 0.15))
            self.wait(0.35)

        self.wait(1.5)
        self.play(FadeOut(algorithm_steps), FadeOut(stage6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(1)",
        )
        self.wait(2.0)
