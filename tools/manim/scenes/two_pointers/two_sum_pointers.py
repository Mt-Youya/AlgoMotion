from manim import *
from ...base import AlgoScene, ArrayVis


class TwoSumPointers(AlgoScene):
    TITLE = "Two Sum — Two Pointers"
    SUBTITLE = "Uses two pointers on a sorted array to find a pair that sums to the target in O("
    CATEGORY = "two-pointers"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        title_label = self.chapter_title("Problem Setup")
        self.play(FadeIn(title_label))
        self.wait(0.5)

        problem_text = VGroup(
            Text("Given a sorted array, find two numbers", font_size=28),
            Text("that add up to a target value.", font_size=28),
            Text("Return their indices.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.5)

        self.play(FadeIn(problem_text, shift=UP * 0.3))
        self.wait(1.5)
        self.play(FadeOut(problem_text), FadeOut(title_label))

        # ── Stage 2: Array Visualization Setup ──────────────────────────
        stage2_label = self.chapter_title("Sorted Array")
        self.play(FadeIn(stage2_label))
        self.wait(0.3)

        array_values = [1, 3, 5, 7, 9, 11, 15]
        target = 12

        array_vis = ArrayVis(array_values)
        array_group = array_vis.get_mobject()
        array_group.move_to(ORIGIN)

        target_text = Text(f"Target = {target}", font_size=32, color=YELLOW)
        target_text.next_to(array_group, UP, buff=0.8)

        self.play(FadeIn(array_group), Write(target_text))
        self.wait(1)

        index_labels = VGroup()
        for i, _ in enumerate(array_values):
            lbl = Text(str(i), font_size=18, color=GRAY)
            lbl.next_to(array_vis.get_cell(i), DOWN, buff=0.15)
            index_labels.add(lbl)
        self.play(FadeIn(index_labels))
        self.wait(0.8)
        self.play(FadeOut(stage2_label))

        # ── Stage 3: Place Two Pointers ──────────────────────────────────
        stage3_label = self.chapter_title("Initialize Pointers")
        self.play(FadeIn(stage3_label))
        self.wait(0.3)

        left_arrow = Arrow(
            start=array_vis.get_cell(0).get_bottom() + DOWN * 0.6,
            end=array_vis.get_cell(0).get_bottom(),
            color=BLUE, buff=0.05, stroke_width=4,
        )
        right_arrow = Arrow(
            start=array_vis.get_cell(len(array_values) - 1).get_bottom() + DOWN * 0.6,
            end=array_vis.get_cell(len(array_values) - 1).get_bottom(),
            color=RED, buff=0.05, stroke_width=4,
        )
        left_label = Text("L", font_size=22, color=BLUE).next_to(left_arrow, DOWN, buff=0.1)
        right_label = Text("R", font_size=22, color=RED).next_to(right_arrow, DOWN, buff=0.1)

        self.play(GrowArrow(left_arrow), GrowArrow(right_arrow))
        self.play(FadeIn(left_label), FadeIn(right_label))

        pointer_info = Text("L=0  R=6  sum=?", font_size=24, color=WHITE)
        pointer_info.next_to(array_group, DOWN, buff=1.2)
        self.play(FadeIn(pointer_info))
        self.wait(1.2)
        self.play(FadeOut(stage3_label))

        # ── Stage 4: Step-by-step pointer movement ───────────────────────
        stage4_label = self.chapter_title("Pointer Movement")
        self.play(FadeIn(stage4_label))
        self.wait(0.3)

        steps = [
            (0, 6, 1 + 15, "1+15=16 > 12 → move R left"),
            (0, 5, 1 + 11, "1+11=12 == 12 → FOUND!"),
        ]

        left_ptr = 0
        right_ptr = 6

        for step_left, step_right, current_sum, description in steps:
            # Highlight current cells
            self.play(
                array_vis.get_cell(left_ptr).animate.set_fill(BLUE, opacity=0.4),
                array_vis.get_cell(right_ptr).animate.set_fill(RED, opacity=0.4),
            )
            new_info = Text(
                f"L={step_left}  R={step_right}  sum={current_sum}",
                font_size=24, color=WHITE,
            ).next_to(array_group, DOWN, buff=1.2)
            desc_text = Text(description, font_size=22, color=YELLOW)
            desc_text.next_to(new_info, DOWN, buff=0.3)

            self.play(
                Transform(pointer_info, new_info),
                FadeIn(desc_text),
            )
            self.wait(1)

            # Reset previous cell colors
            self.play(
                array_vis.get_cell(left_ptr).animate.set_fill(WHITE, opacity=0.1),
                array_vis.get_cell(right_ptr).animate.set_fill(WHITE, opacity=0.1),
            )

            if step_right != right_ptr:
                new_right_arrow = Arrow(
                    start=array_vis.get_cell(step_right).get_bottom() + DOWN * 0.6,
                    end=array_vis.get_cell(step_right).get_bottom(),
                    color=RED, buff=0.05, stroke_width=4,
                )
                new_right_label = Text("R", font_size=22, color=RED).next_to(new_right_arrow, DOWN, buff=0.1)
                self.play(
                    Transform(right_arrow, new_right_arrow),
                    Transform(right_label, new_right_label),
                )

            left_ptr = step_left
            right_ptr = step_right
            self.play(FadeOut(desc_text))
            self.wait(0.5)

        self.play(FadeOut(stage4_label))

        # ── Stage 5: Highlight Found Pair ────────────────────────────────
        stage5_label = self.chapter_title("Found the Pair!")
        self.play(FadeIn(stage5_label))
        self.wait(0.3)

        self.play(
            array_vis.get_cell(0).animate.set_fill(GREEN, opacity=0.6),
            array_vis.get_cell(5).animate.set_fill(GREEN, opacity=0.6),
        )

        found_text = VGroup(
            Text("indices [0, 5]", font_size=30, color=GREEN),
            Text("values  1 + 11 = 12", font_size=26, color=GREEN),
        ).arrange(DOWN, buff=0.3)
        found_text.next_to(array_group, DOWN, buff=1.4)

        self.play(FadeOut(pointer_info))
        self.play(Write(found_text))
        self.wait(1.5)

        flash = Flash(array_vis.get_cell(0), color=GREEN, flash_radius=0.5)
        flash2 = Flash(array_vis.get_cell(5), color=GREEN, flash_radius=0.5)
        self.play(flash, flash2)
        self.wait(1)
        self.play(FadeOut(stage5_label))

        # ── Stage 6: Algorithm Logic Summary ────────────────────────────
        stage6_label = self.chapter_title("Algorithm Logic")
        self.play(FadeIn(stage6_label))
        self.wait(0.3)

        self.play(
            FadeOut(array_group),
            FadeOut(index_labels),
            FadeOut(left_arrow), FadeOut(right_arrow),
            FadeOut(left_label), FadeOut(right_label),
            FadeOut(target_text),
            FadeOut(found_text),
        )

        logic_steps = VGroup(
            Text("① Sort the array (if not already sorted)", font_size=24),
            Text("② Place L at index 0, R at last index", font_size=24),
            Text("③ Compute sum = arr[L] + arr[R]", font_size=24),
            Text("  • sum == target → return [L, R]", font_size=22, color=GREEN),
            Text("  • sum < target  → move L right (need bigger)", font_size=22, color=BLUE),
            Text("  • sum > target  → move R left  (need smaller)", font_size=22, color=RED),
            Text("④ Repeat until L >= R", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).scale(0.95)
        logic_steps.move_to(ORIGIN)

        for step in logic_steps:
            self.play(FadeIn(step, shift=RIGHT * 0.2))
            self.wait(0.4)

        self.wait(1.5)
        self.play(FadeOut(logic_steps), FadeOut(stage6_label))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(1)",
            notes="Single pass after sorting; no extra space needed",
        )
        self.wait(2)
