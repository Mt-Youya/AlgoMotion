from manim import *
from ...base import AlgoScene, ArrayVis


class InterpolationSearch(AlgoScene):
    TITLE = "Interpolation Search"
    SUBTITLE = "Estimates the target position using linear interpolation, offering O(log log n) "
    CATEGORY = "search"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Interpolation Search", font_size=40, weight=BOLD),
            Text("Works on uniformly distributed sorted arrays", font_size=24),
            Text("Estimates position like a phone book search", font_size=24),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Array Setup ────────────────────────────────────────
        self.chapter_title("Array Setup")
        data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        target = 70

        arr_vis = ArrayVis(data, label="Sorted Uniform Array")
        arr_vis.move_to(ORIGIN + UP * 0.5)
        self.play(FadeIn(arr_vis))
        self.wait(0.5)

        target_label = VGroup(
            Text("Target: ", font_size=28),
            Text(str(target), font_size=28, color=YELLOW),
        ).arrange(RIGHT).next_to(arr_vis, DOWN, buff=0.8)
        self.play(Write(target_label))
        self.wait(1)

        lo_label = Text("lo=0", font_size=20, color=GREEN)
        hi_label = Text("hi=9", font_size=20, color=RED)
        lo_label.next_to(arr_vis.get_cell(0), DOWN, buff=0.3)
        hi_label.next_to(arr_vis.get_cell(9), DOWN, buff=0.3)
        self.play(FadeIn(lo_label), FadeIn(hi_label))
        arr_vis.highlight(0, color=GREEN)
        arr_vis.highlight(9, color=RED)
        self.wait(1.5)

        # ── Stage 3: Formula Explanation ────────────────────────────────
        self.chapter_title("Interpolation Formula")
        formula = MathTex(
            r"\text{pos} = lo + \left\lfloor \frac{(target - arr[lo]) \times (hi - lo)}{arr[hi] - arr[lo]} \right\rfloor",
            font_size=32,
        ).to_edge(UP, buff=1.2)
        self.play(Write(formula))
        self.wait(1)

        formula_calc = MathTex(
            r"\text{pos} = 0 + \left\lfloor \frac{(70 - 10) \times (9 - 0)}{100 - 10} \right\rfloor"
            r"= \left\lfloor \frac{60 \times 9}{90} \right\rfloor = 6",
            font_size=28,
            color=YELLOW,
        ).next_to(formula, DOWN, buff=0.4)
        self.play(Write(formula_calc))
        self.wait(2)
        self.play(FadeOut(formula), FadeOut(formula_calc))

        # ── Stage 4: Step-by-step Iteration 1 ──────────────────────────
        self.chapter_title("Iteration 1: Probe Position")
        probe_idx = 6
        arr_vis.highlight(probe_idx, color=YELLOW)
        probe_arrow = Arrow(
            arr_vis.get_cell(probe_idx).get_top() + UP * 0.6,
            arr_vis.get_cell(probe_idx).get_top(),
            color=YELLOW,
            buff=0.05,
        )
        probe_text = Text("pos=6, arr[6]=70", font_size=22, color=YELLOW)
        probe_text.next_to(probe_arrow, UP, buff=0.1)
        self.play(GrowArrow(probe_arrow), Write(probe_text))
        self.wait(0.5)

        found_text = Text("arr[6] == target (70) ✓ FOUND!", font_size=26, color=GREEN)
        found_text.next_to(arr_vis, DOWN, buff=1.2)
        self.play(Write(found_text))
        arr_vis.highlight(probe_idx, color=GREEN)
        self.wait(2)
        self.play(FadeOut(probe_arrow), FadeOut(probe_text), FadeOut(found_text))

        # ── Stage 5: Miss Scenario ──────────────────────────────────────
        self.chapter_title("Miss Scenario: Target Not at Probe")
        self.play(FadeOut(arr_vis), FadeOut(lo_label), FadeOut(hi_label), FadeOut(target_label))

        data2 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        target2 = 40
        arr_vis2 = ArrayVis(data2, label="Search for 40")
        arr_vis2.move_to(ORIGIN + UP * 0.5)
        self.play(FadeIn(arr_vis2))

        target_label2 = VGroup(
            Text("Target: ", font_size=28),
            Text(str(target2), font_size=28, color=YELLOW),
        ).arrange(RIGHT).next_to(arr_vis2, DOWN, buff=0.8)
        self.play(Write(target_label2))
        self.wait(0.5)

        arr_vis2.highlight(0, color=GREEN)
        arr_vis2.highlight(9, color=RED)

        calc2 = MathTex(
            r"\text{pos} = 0 + \left\lfloor \frac{(40 - 10) \times 9}{90} \right\rfloor = 3",
            font_size=28,
            color=YELLOW,
        ).to_edge(UP, buff=1.2)
        self.play(Write(calc2))
        self.wait(1)

        arr_vis2.highlight(3, color=YELLOW)
        probe_arrow2 = Arrow(
            arr_vis2.get_cell(3).get_top() + UP * 0.6,
            arr_vis2.get_cell(3).get_top(),
            color=YELLOW,
            buff=0.05,
        )
        probe_text2 = Text("pos=3, arr[3]=40 ✓", font_size=22, color=GREEN)
        probe_text2.next_to(probe_arrow2, UP, buff=0.1)
        self.play(GrowArrow(probe_arrow2), Write(probe_text2))
        arr_vis2.highlight(3, color=GREEN)
        self.wait(2)
        self.play(FadeOut(calc2), FadeOut(probe_arrow2), FadeOut(probe_text2))

        # ── Stage 6: Not-found path ─────────────────────────────────────
        self.chapter_title("Not Found Path")
        self.play(FadeOut(arr_vis2), FadeOut(target_label2))

        data3 = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
        target3 = 55
        arr_vis3 = ArrayVis(data3, label="Search for 55 (not in array)")
        arr_vis3.move_to(ORIGIN + UP * 0.5)
        self.play(FadeIn(arr_vis3))

        steps = [
            (0, 9, 4, "pos=4, arr[4]=50 < 55 → lo=5"),
            (5, 9, 5, "pos=5, arr[5]=60 > 55 → hi=4"),
        ]
        lo, hi = 0, 9
        arr_vis3.highlight(lo, color=GREEN)
        arr_vis3.highlight(hi, color=RED)

        for step_lo, step_hi, pos, desc in steps:
            self.wait(0.5)
            arr_vis3.highlight(pos, color=YELLOW)
            step_label = Text(desc, font_size=22, color=YELLOW).next_to(arr_vis3, DOWN, buff=0.8)
            self.play(Write(step_label))
            self.wait(1)
            self.play(FadeOut(step_label))

        not_found = Text("lo > hi → Element 55 NOT FOUND", font_size=26, color=RED)
        not_found.next_to(arr_vis3, DOWN, buff=0.8)
        self.play(Write(not_found))
        self.wait(2)
        self.play(FadeOut(arr_vis3), FadeOut(not_found))

        # ── Stage 7: Complexity Card ────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(log log n)",
            time_worst="O(n)",
            space="O(1)",
        )
        self.wait(3)
