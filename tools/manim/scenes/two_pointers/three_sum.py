from manim import *
from ...base import AlgoScene, ArrayVis

TITLE = "3Sum"
SUBTITLE = "Finds all unique triplets in a sorted array that sum to zero using a fixed point"
CATEGORY = "two-pointers"


class ThreeSum(AlgoScene):
    TITLE = TITLE
    SUBTITLE = SUBTITLE
    CATEGORY = CATEGORY

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")
        arr = [-4, -1, -1, 0, 1, 2]
        vis = ArrayVis(arr, label="nums")
        self.play(FadeIn(vis))
        self.wait(1)

        intro_text = Text(
            "Find all unique triplets that sum to 0",
            font_size=28,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(intro_text))
        self.wait(1.5)

        target_text = Text("Target sum = 0", font_size=24, color=WHITE).next_to(
            intro_text, DOWN, buff=0.4
        )
        self.play(FadeIn(target_text))
        self.wait(1)
        self.play(FadeOut(intro_text), FadeOut(target_text))

        # ── Stage 2: Sort the array ─────────────────────────────────────────
        self.chapter_title("Step 1 — Sort the Array")
        sort_label = Text("Sort: [-4, -1, -1, 0, 1, 2]", font_size=26, color=BLUE).next_to(
            vis, DOWN, buff=0.6
        )
        self.play(Write(sort_label))
        self.wait(1)
        sorted_note = Text(
            "Sorting enables the two-pointer approach",
            font_size=22,
            color=GRAY,
        ).next_to(sort_label, DOWN, buff=0.3)
        self.play(FadeIn(sorted_note))
        self.wait(1.5)
        self.play(FadeOut(sort_label), FadeOut(sorted_note))

        # ── Stage 3: Fix pointer i ──────────────────────────────────────────
        self.chapter_title("Step 2 — Fix Pointer i")
        i_arrow = Arrow(
            start=vis.get_cell_top(0) + UP * 0.2,
            end=vis.get_cell_top(0),
            color=RED,
            buff=0.05,
        )
        i_label = Text("i", font_size=22, color=RED).next_to(i_arrow, UP, buff=0.1)
        self.play(GrowArrow(i_arrow), Write(i_label))
        self.wait(0.8)

        fix_note = Text(
            "Fix i = 0  →  nums[i] = -4",
            font_size=24,
            color=WHITE,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(fix_note))
        self.wait(1.2)
        self.play(FadeOut(fix_note))

        # ── Stage 4: Two-pointer scan (i=0, left=1, right=5) ───────────────
        self.chapter_title("Step 3 — Two-Pointer Scan")
        left_arrow = Arrow(
            start=vis.get_cell_top(1) + UP * 0.2,
            end=vis.get_cell_top(1),
            color=GREEN,
            buff=0.05,
        )
        left_label = Text("L", font_size=22, color=GREEN).next_to(left_arrow, UP, buff=0.1)
        right_arrow = Arrow(
            start=vis.get_cell_top(5) + UP * 0.2,
            end=vis.get_cell_top(5),
            color=BLUE,
            buff=0.05,
        )
        right_label = Text("R", font_size=22, color=BLUE).next_to(right_arrow, UP, buff=0.1)
        self.play(
            GrowArrow(left_arrow),
            Write(left_label),
            GrowArrow(right_arrow),
            Write(right_label),
        )
        self.wait(0.8)

        sum_text = Text(
            "sum = nums[i] + nums[L] + nums[R] = -4 + (-1) + 2 = -3  <  0  → move L right",
            font_size=20,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(sum_text))
        self.wait(1.5)
        self.play(FadeOut(sum_text))

        # Move L to index 2
        new_left_arrow = Arrow(
            start=vis.get_cell_top(2) + UP * 0.2,
            end=vis.get_cell_top(2),
            color=GREEN,
            buff=0.05,
        )
        new_left_label = Text("L", font_size=22, color=GREEN).next_to(
            new_left_arrow, UP, buff=0.1
        )
        self.play(
            Transform(left_arrow, new_left_arrow),
            Transform(left_label, new_left_label),
        )
        sum_text2 = Text(
            "sum = -4 + (-1) + 2 = -3  <  0  → move L right again",
            font_size=20,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(sum_text2))
        self.wait(1.5)
        self.play(FadeOut(sum_text2))

        # Move L to index 3
        new_left_arrow2 = Arrow(
            start=vis.get_cell_top(3) + UP * 0.2,
            end=vis.get_cell_top(3),
            color=GREEN,
            buff=0.05,
        )
        new_left_label2 = Text("L", font_size=22, color=GREEN).next_to(
            new_left_arrow2, UP, buff=0.1
        )
        self.play(
            Transform(left_arrow, new_left_arrow2),
            Transform(left_label, new_left_label2),
        )
        sum_text3 = Text(
            "sum = -4 + 0 + 2 = -2  <  0  → move L right",
            font_size=20,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(sum_text3))
        self.wait(1.5)
        self.play(FadeOut(sum_text3))

        # Move L to index 4
        new_left_arrow3 = Arrow(
            start=vis.get_cell_top(4) + UP * 0.2,
            end=vis.get_cell_top(4),
            color=GREEN,
            buff=0.05,
        )
        new_left_label3 = Text("L", font_size=22, color=GREEN).next_to(
            new_left_arrow3, UP, buff=0.1
        )
        self.play(
            Transform(left_arrow, new_left_arrow3),
            Transform(left_label, new_left_label3),
        )
        sum_text4 = Text(
            "sum = -4 + 1 + 2 = -1  <  0  → L >= R, no triplet for i=0",
            font_size=20,
            color=ORANGE,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(sum_text4))
        self.wait(1.5)
        self.play(FadeOut(sum_text4))
        self.play(FadeOut(left_arrow), FadeOut(left_label), FadeOut(right_arrow), FadeOut(right_label))

        # ── Stage 5: Found a triplet (i=1) ─────────────────────────────────
        self.chapter_title("Step 4 — Found a Triplet!")
        i_arrow2 = Arrow(
            start=vis.get_cell_top(1) + UP * 0.2,
            end=vis.get_cell_top(1),
            color=RED,
            buff=0.05,
        )
        i_label2 = Text("i", font_size=22, color=RED).next_to(i_arrow2, UP, buff=0.1)
        left_arrow2 = Arrow(
            start=vis.get_cell_top(2) + UP * 0.2,
            end=vis.get_cell_top(2),
            color=GREEN,
            buff=0.05,
        )
        left_label2 = Text("L", font_size=22, color=GREEN).next_to(left_arrow2, UP, buff=0.1)
        right_arrow2 = Arrow(
            start=vis.get_cell_top(5) + UP * 0.2,
            end=vis.get_cell_top(5),
            color=BLUE,
            buff=0.05,
        )
        right_label2 = Text("R", font_size=22, color=BLUE).next_to(right_arrow2, UP, buff=0.1)
        self.play(
            Transform(i_arrow, i_arrow2),
            Transform(i_label, i_label2),
            GrowArrow(left_arrow2),
            Write(left_label2),
            GrowArrow(right_arrow2),
            Write(right_label2),
        )
        self.wait(0.5)

        found_text = Text(
            "sum = -1 + (-1) + 2 = 0  ✓  TRIPLET FOUND: [-1, -1, 2]",
            font_size=22,
            color=GREEN,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(found_text))
        vis.highlight_cells([1, 2, 5], color=GREEN)
        self.wait(2)

        result_box = SurroundingRectangle(found_text, color=GREEN, buff=0.15)
        self.play(Create(result_box))
        self.wait(1.5)
        self.play(FadeOut(found_text), FadeOut(result_box))

        # Skip duplicate -1 at index 2, find next triplet
        skip_text = Text(
            "Skip duplicate nums[L]: move L → index 3 (0)\n"
            "sum = -1 + 0 + 2 = 1  >  0  → move R left",
            font_size=20,
            color=WHITE,
            line_spacing=1.4,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(skip_text))
        self.wait(1.5)
        self.play(FadeOut(skip_text))

        # i=1, L=3, R=4: sum = -1+0+1 = 0
        new_left3 = Arrow(
            start=vis.get_cell_top(3) + UP * 0.2,
            end=vis.get_cell_top(3),
            color=GREEN,
            buff=0.05,
        )
        new_left3_lbl = Text("L", font_size=22, color=GREEN).next_to(new_left3, UP, buff=0.1)
        new_right3 = Arrow(
            start=vis.get_cell_top(4) + UP * 0.2,
            end=vis.get_cell_top(4),
            color=BLUE,
            buff=0.05,
        )
        new_right3_lbl = Text("R", font_size=22, color=BLUE).next_to(new_right3, UP, buff=0.1)
        self.play(
            Transform(left_arrow2, new_left3),
            Transform(left_label2, new_left3_lbl),
            Transform(right_arrow2, new_right3),
            Transform(right_label2, new_right3_lbl),
        )
        found2 = Text(
            "sum = -1 + 0 + 1 = 0  ✓  TRIPLET FOUND: [-1, 0, 1]",
            font_size=22,
            color=GREEN,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(found2))
        vis.highlight_cells([1, 3, 4], color=PURPLE)
        self.wait(2)
        self.play(FadeOut(found2))
        self.play(
            FadeOut(i_arrow), FadeOut(i_label),
            FadeOut(left_arrow2), FadeOut(left_label2),
            FadeOut(right_arrow2), FadeOut(right_label2),
        )

        # ── Stage 6: Results summary ────────────────────────────────────────
        self.chapter_title("Results")
        results = VGroup(
            Text("Unique triplets found:", font_size=26, color=WHITE),
            Text("  • [-1, -1,  2]", font_size=24, color=GREEN),
            Text("  • [-1,  0,  1]", font_size=24, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(vis, DOWN, buff=0.8)
        self.play(FadeIn(results, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(results), FadeOut(vis))

        # ── Stage 7: Complexity card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n²)",
            space_complexity="O(1)",
            notes="Sorting takes O(n log n); outer loop O(n) × inner two-pointer O(n) = O(n²) overall.",
        )
        self.wait(2)
