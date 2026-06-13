from manim import *
from ...base import AlgoScene, ArrayVis


class BinarySearch(AlgoScene):
    TITLE = "Binary Search"
    SUBTITLE = "Repeatedly halves the search range on a sorted array to locate the target in O(log n) time."
    CATEGORY = "search"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        title_label = self.chapter_title("Introduction")
        self.play(Write(title_label))
        self.wait(0.5)

        intro_text = Text(
            "Given a SORTED array, find a target value\nby repeatedly halving the search space.",
            font_size=28,
            color=WHITE,
        ).shift(UP * 1.5)
        self.play(FadeIn(intro_text))
        self.wait(1.5)
        self.play(FadeOut(intro_text), FadeOut(title_label))

        # ── Stage 2: Array setup ─────────────────────────────────────────
        stage2_label = self.chapter_title("Setup: Sorted Array")
        self.play(Write(stage2_label))
        self.wait(0.3)

        values = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
        target = 23
        n = len(values)

        array_vis = ArrayVis(values, cell_size=0.75)
        array_vis.move_to(ORIGIN)
        self.play(FadeIn(array_vis))
        self.wait(0.5)

        target_text = Text(f"Target = {target}", font_size=30, color=YELLOW).shift(UP * 2.5)
        self.play(Write(target_text))
        self.wait(1)

        index_labels = VGroup(*[
            Text(str(i), font_size=18, color=GRAY).next_to(array_vis.cells[i], DOWN, buff=0.15)
            for i in range(n)
        ])
        self.play(FadeIn(index_labels))
        self.wait(0.8)
        self.play(FadeOut(stage2_label))

        # ── Stage 3: First iteration — full range ────────────────────────
        stage3_label = self.chapter_title("Iteration 1: lo=0, hi=9")
        self.play(Write(stage3_label))
        self.wait(0.3)

        lo, hi = 0, n - 1
        mid = (lo + hi) // 2  # 4

        lo_arrow = Arrow(
            array_vis.cells[lo].get_bottom() + DOWN * 0.6,
            array_vis.cells[lo].get_bottom(),
            buff=0, color=GREEN, stroke_width=3,
        )
        hi_arrow = Arrow(
            array_vis.cells[hi].get_bottom() + DOWN * 0.6,
            array_vis.cells[hi].get_bottom(),
            buff=0, color=RED, stroke_width=3,
        )
        lo_label = Text("lo", font_size=20, color=GREEN).next_to(lo_arrow, DOWN, buff=0.05)
        hi_label = Text("hi", font_size=20, color=RED).next_to(hi_arrow, DOWN, buff=0.05)

        self.play(GrowArrow(lo_arrow), Write(lo_label), GrowArrow(hi_arrow), Write(hi_label))
        self.wait(0.5)

        mid_arrow = Arrow(
            array_vis.cells[mid].get_top() + UP * 0.6,
            array_vis.cells[mid].get_top(),
            buff=0, color=YELLOW, stroke_width=3,
        )
        mid_label = Text("mid", font_size=20, color=YELLOW).next_to(mid_arrow, UP, buff=0.05)
        self.play(GrowArrow(mid_arrow), Write(mid_label))

        array_vis.highlight(mid, YELLOW)
        self.play(array_vis.animate_highlight(mid, YELLOW))

        cmp_text = Text(
            f"arr[{mid}] = {values[mid]}  <  {target}  → search RIGHT half",
            font_size=24, color=WHITE,
        ).shift(DOWN * 2.5)
        self.play(Write(cmp_text))
        self.wait(1.2)
        self.play(
            FadeOut(cmp_text), FadeOut(mid_arrow), FadeOut(mid_label),
            FadeOut(stage3_label),
        )

        # ── Stage 4: Second iteration — right half ───────────────────────
        stage4_label = self.chapter_title("Iteration 2: lo=5, hi=9")
        self.play(Write(stage4_label))
        self.wait(0.3)

        lo = mid + 1  # 5
        mid2 = (lo + hi) // 2  # 7

        # Dim left half
        for i in range(0, mid + 1):
            array_vis.dim_cell(i)
        dim_group = array_vis.get_dim_group(0, mid + 1)
        self.play(dim_group)
        self.wait(0.3)

        new_lo_arrow = Arrow(
            array_vis.cells[lo].get_bottom() + DOWN * 0.6,
            array_vis.cells[lo].get_bottom(),
            buff=0, color=GREEN, stroke_width=3,
        )
        new_lo_label = Text("lo", font_size=20, color=GREEN).next_to(new_lo_arrow, DOWN, buff=0.05)
        self.play(
            Transform(lo_arrow, new_lo_arrow),
            Transform(lo_label, new_lo_label),
        )

        mid2_arrow = Arrow(
            array_vis.cells[mid2].get_top() + UP * 0.6,
            array_vis.cells[mid2].get_top(),
            buff=0, color=YELLOW, stroke_width=3,
        )
        mid2_label = Text("mid", font_size=20, color=YELLOW).next_to(mid2_arrow, UP, buff=0.05)
        self.play(GrowArrow(mid2_arrow), Write(mid2_label))

        array_vis.highlight(mid2, YELLOW)
        self.play(array_vis.animate_highlight(mid2, YELLOW))

        cmp2_text = Text(
            f"arr[{mid2}] = {values[mid2]}  >  {target}  → search LEFT half",
            font_size=24, color=WHITE,
        ).shift(DOWN * 2.5)
        self.play(Write(cmp2_text))
        self.wait(1.2)
        self.play(
            FadeOut(cmp2_text), FadeOut(mid2_arrow), FadeOut(mid2_label),
            FadeOut(stage4_label),
        )

        # ── Stage 5: Third iteration — target found ──────────────────────
        stage5_label = self.chapter_title("Iteration 3: lo=5, hi=6")
        self.play(Write(stage5_label))
        self.wait(0.3)

        hi = mid2 - 1  # 6
        mid3 = (lo + hi) // 2  # 5

        new_hi_arrow = Arrow(
            array_vis.cells[hi].get_bottom() + DOWN * 0.6,
            array_vis.cells[hi].get_bottom(),
            buff=0, color=RED, stroke_width=3,
        )
        new_hi_label = Text("hi", font_size=20, color=RED).next_to(new_hi_arrow, DOWN, buff=0.05)
        self.play(
            Transform(hi_arrow, new_hi_arrow),
            Transform(hi_label, new_hi_label),
        )

        mid3_arrow = Arrow(
            array_vis.cells[mid3].get_top() + UP * 0.6,
            array_vis.cells[mid3].get_top(),
            buff=0, color=YELLOW, stroke_width=3,
        )
        mid3_label = Text("mid", font_size=20, color=YELLOW).next_to(mid3_arrow, UP, buff=0.05)
        self.play(GrowArrow(mid3_arrow), Write(mid3_label))

        array_vis.highlight(mid3, GREEN)
        self.play(array_vis.animate_highlight(mid3, GREEN))

        found_text = Text(
            f"arr[{mid3}] = {values[mid3]}  ==  {target}  ✓ FOUND at index {mid3}!",
            font_size=26, color=GREEN,
        ).shift(DOWN * 2.5)
        self.play(Write(found_text))

        # Flash the found cell
        self.play(Flash(array_vis.cells[mid3], color=GREEN, flash_radius=0.5))
        self.wait(1.5)
        self.play(
            FadeOut(found_text),
            FadeOut(lo_arrow), FadeOut(lo_label),
            FadeOut(hi_arrow), FadeOut(hi_label),
            FadeOut(mid3_arrow), FadeOut(mid3_label),
            FadeOut(stage5_label),
        )

        # ── Stage 6: Complexity card ─────────────────────────────────────
        self.play(FadeOut(array_vis), FadeOut(index_labels), FadeOut(target_text))
        self.wait(0.3)
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(log n)",
            time_worst="O(log n)",
            space="O(1)",
        )
        self.wait(2)
