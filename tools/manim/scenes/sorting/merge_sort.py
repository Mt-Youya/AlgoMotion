from manim import *
from ...base import AlgoScene, ArrayVis


class MergeSort(AlgoScene):
    TITLE = "Merge Sort"
    SUBTITLE = "Recursively divides the array in half, sorts each half, then merges the two sorted halves"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Intro setup ──────────────────────────────────────────────
        self.chapter_title("Introduction")
        data = [38, 27, 43, 3, 9, 82, 10]
        vis = ArrayVis(data, label="Input Array")
        self.play(FadeIn(vis))
        self.wait(1.5)

        intro_text = Text(
            "Merge Sort uses divide-and-conquer:\nsplit → sort halves → merge",
            font_size=24,
        ).next_to(vis, DOWN, buff=0.6)
        self.play(Write(intro_text))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Divide Phase ─────────────────────────────────────────────
        self.chapter_title("Divide Phase")

        divide_label = Text("Step 1 — Split array in half", font_size=22, color=YELLOW)
        divide_label.to_edge(UP).shift(DOWN * 1.2)
        self.play(Write(divide_label))
        self.wait(0.5)

        left_data = data[: len(data) // 2]
        right_data = data[len(data) // 2 :]

        left_vis = ArrayVis(left_data, label="Left Half")
        right_vis = ArrayVis(right_data, label="Right Half")

        left_vis.shift(LEFT * 3 + DOWN * 1.5)
        right_vis.shift(RIGHT * 2 + DOWN * 1.5)

        divider = Line(UP * 0.5, DOWN * 0.5, color=YELLOW).move_to(ORIGIN + DOWN * 1.5)

        self.play(
            vis.animate.shift(UP * 0.3),
            run_time=0.5,
        )
        self.play(
            TransformFromCopy(vis, left_vis),
            TransformFromCopy(vis, right_vis),
            Create(divider),
            run_time=1.5,
        )
        self.wait(1.5)
        self.play(FadeOut(divide_label), FadeOut(divider))

        # ── Stage 3: Recursive Split ──────────────────────────────────────────
        self.chapter_title("Recursive Split")

        recurse_label = Text(
            "Step 2 — Keep splitting until single elements", font_size=22, color=BLUE
        )
        recurse_label.to_edge(UP).shift(DOWN * 1.2)
        self.play(Write(recurse_label))
        self.wait(0.5)

        # Show sub-splits of left half: [38,27,43] → [38,27] and [43]
        ll_data = left_data[: len(left_data) // 2]
        lr_data = left_data[len(left_data) // 2 :]

        ll_vis = ArrayVis(ll_data, label="[38,27]")
        lr_vis = ArrayVis(lr_data, label="[43]")

        ll_vis.shift(LEFT * 4.5 + DOWN * 3)
        lr_vis.shift(LEFT * 1.5 + DOWN * 3)

        self.play(
            TransformFromCopy(left_vis, ll_vis),
            TransformFromCopy(left_vis, lr_vis),
            run_time=1.2,
        )
        self.wait(1)

        single_note = Text("Base case: single element is already sorted", font_size=20, color=GREEN)
        single_note.to_edge(DOWN, buff=0.4)
        self.play(Write(single_note))
        self.wait(1.5)
        self.play(FadeOut(recurse_label), FadeOut(single_note))

        # ── Stage 4: Merge Two Sorted Halves ──────────────────────────────────
        self.chapter_title("Merge Step")

        merge_label = Text("Step 3 — Merge sorted halves by comparing elements", font_size=22, color=GREEN)
        merge_label.to_edge(UP).shift(DOWN * 1.2)
        self.play(Write(merge_label))
        self.wait(0.5)

        # Demonstrate merging [27,38] and [43] → [27,38,43]
        sorted_left = ArrayVis([27, 38], label="Sorted Left")
        sorted_right = ArrayVis([43], label="Sorted Right")
        sorted_left.shift(LEFT * 3 + DOWN * 0.5)
        sorted_right.shift(RIGHT * 1 + DOWN * 0.5)

        self.play(
            FadeOut(vis),
            FadeOut(left_vis),
            FadeOut(right_vis),
            FadeOut(ll_vis),
            FadeOut(lr_vis),
        )
        self.play(FadeIn(sorted_left), FadeIn(sorted_right))
        self.wait(1)

        compare_arrow = Arrow(sorted_left.get_right(), sorted_right.get_left(), color=ORANGE, buff=0.1)
        compare_text = Text("Compare heads: 27 < 43", font_size=20, color=ORANGE)
        compare_text.next_to(compare_arrow, UP, buff=0.2)
        self.play(Create(compare_arrow), Write(compare_text))
        self.wait(1.2)

        merged_vis = ArrayVis([27, 38, 43], label="Merged Result")
        merged_vis.shift(DOWN * 2)
        self.play(
            FadeOut(compare_arrow),
            FadeOut(compare_text),
            TransformFromCopy(sorted_left, merged_vis),
            run_time=1.5,
        )
        self.wait(1.5)
        self.play(FadeOut(merge_label), FadeOut(sorted_left), FadeOut(sorted_right))

        # ── Stage 5: Full Merge Walkthrough ───────────────────────────────────
        self.chapter_title("Full Sort Walkthrough")

        walk_label = Text("Step 4 — Merging all sub-arrays back together", font_size=22, color=PURPLE)
        walk_label.to_edge(UP).shift(DOWN * 1.2)
        self.play(Write(walk_label))
        self.wait(0.5)

        states = [
            ([3, 9, 27, 38, 43, 82, 10], "After merging left subtree"),
            ([3, 9, 10, 27, 38, 43, 82], "Final merged & sorted array"),
        ]

        current_vis = merged_vis
        for arr, label_text in states:
            next_vis = ArrayVis(arr, label=label_text)
            next_vis.move_to(ORIGIN + DOWN * 0.5)
            step_note = Text(label_text, font_size=20, color=WHITE)
            step_note.next_to(next_vis, DOWN, buff=0.4)
            self.play(
                FadeOut(current_vis),
                FadeIn(next_vis),
                Write(step_note),
                run_time=1.2,
            )
            self.wait(1.5)
            self.play(FadeOut(step_note))
            current_vis = next_vis

        self.play(FadeOut(walk_label))

        # ── Stage 6: Highlight Sorted Result ─────────────────────────────────
        self.chapter_title("Sorted!")

        sorted_label = Text("Array is now fully sorted!", font_size=26, color=GREEN)
        sorted_label.next_to(current_vis, UP, buff=0.5)
        self.play(Write(sorted_label))

        # Flash each cell green to celebrate
        for i in range(len(data)):
            self.play(
                current_vis.animate.set_color(GREEN),
                run_time=0.15,
            )
        self.wait(1)
        self.play(FadeOut(sorted_label), FadeOut(current_vis))

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        self.complexity_card(
            time_best="O(n log n)",
            time_avg="O(n log n)",
            time_worst="O(n log n)",
            space="O(n)",
        )
        self.wait(2)
