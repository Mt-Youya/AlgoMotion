from manim import *
from ...base import AlgoScene, ArrayVis


class BubbleSort(AlgoScene):
    TITLE = "Bubble Sort"
    SUBTITLE = "Repeatedly swaps adjacent elements that are in the wrong order until the array i"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        title_label = self.chapter_title("Introduction")
        self.play(Write(title_label))
        self.wait(1)

        intro_text = Text(
            "Bubble Sort compares adjacent pairs\nand swaps them if out of order.",
            font_size=28,
            color=WHITE,
        ).next_to(title_label, DOWN, buff=0.6)
        self.play(FadeIn(intro_text))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(title_label))

        # ── Stage 2: Array Setup ────────────────────────────────────────
        setup_label = self.chapter_title("Array Setup")
        self.play(Write(setup_label))
        self.wait(0.5)

        data = [5, 3, 8, 1, 4, 2]
        array_vis = ArrayVis(data, label="Input Array")
        array_vis.move_to(ORIGIN)
        self.play(FadeIn(array_vis))
        self.wait(1.5)
        self.play(FadeOut(setup_label))

        # ── Stage 3: First Pass – highlight comparisons ─────────────────
        pass1_label = self.chapter_title("Pass 1 — Bubble Largest to End")
        self.play(Write(pass1_label))
        self.wait(0.5)

        n = len(data)
        arr = list(data)

        for j in range(n - 1):
            # Highlight the pair being compared
            self.play(
                array_vis.highlight(j, color=YELLOW),
                array_vis.highlight(j + 1, color=YELLOW),
                run_time=0.4,
            )
            self.wait(0.3)

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                self.play(array_vis.swap(j, j + 1), run_time=0.6)
                self.wait(0.2)

            self.play(
                array_vis.unhighlight(j),
                array_vis.unhighlight(j + 1),
                run_time=0.3,
            )

        # Mark last element as sorted
        self.play(array_vis.highlight(n - 1, color=GREEN), run_time=0.4)
        self.wait(1)
        self.play(FadeOut(pass1_label))

        # ── Stage 4: Second Pass ────────────────────────────────────────
        pass2_label = self.chapter_title("Pass 2 — Continue Sorting")
        self.play(Write(pass2_label))
        self.wait(0.5)

        for j in range(n - 2):
            self.play(
                array_vis.highlight(j, color=YELLOW),
                array_vis.highlight(j + 1, color=YELLOW),
                run_time=0.4,
            )
            self.wait(0.3)

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                self.play(array_vis.swap(j, j + 1), run_time=0.6)
                self.wait(0.2)

            self.play(
                array_vis.unhighlight(j),
                array_vis.unhighlight(j + 1),
                run_time=0.3,
            )

        self.play(array_vis.highlight(n - 2, color=GREEN), run_time=0.4)
        self.wait(1)
        self.play(FadeOut(pass2_label))

        # ── Stage 5: Remaining Passes (fast-forward) ────────────────────
        remaining_label = self.chapter_title("Remaining Passes — Fast Forward")
        self.play(Write(remaining_label))
        self.wait(0.5)

        for i in range(2, n - 1):
            for j in range(n - 1 - i):
                self.play(
                    array_vis.highlight(j, color=YELLOW),
                    array_vis.highlight(j + 1, color=YELLOW),
                    run_time=0.2,
                )
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
                    self.play(array_vis.swap(j, j + 1), run_time=0.35)
                self.play(
                    array_vis.unhighlight(j),
                    array_vis.unhighlight(j + 1),
                    run_time=0.15,
                )
            self.play(array_vis.highlight(n - 1 - i, color=GREEN), run_time=0.3)

        self.play(array_vis.highlight(0, color=GREEN), run_time=0.3)
        self.wait(1.5)
        self.play(FadeOut(remaining_label))

        # ── Stage 6: Sorted Result ──────────────────────────────────────
        sorted_label = self.chapter_title("Array is Sorted!")
        self.play(Write(sorted_label))
        self.wait(0.5)

        sorted_text = Text(
            "Every element is now in its correct position.",
            font_size=26,
            color=GREEN,
        ).next_to(array_vis, DOWN, buff=0.8)
        self.play(FadeIn(sorted_text))
        self.wait(2)
        self.play(FadeOut(sorted_text), FadeOut(sorted_label))

        # ── Stage 7: Early-Exit Optimisation ────────────────────────────
        opt_label = self.chapter_title("Optimisation: Early Exit")
        self.play(Write(opt_label))
        self.wait(0.5)

        opt_text = VGroup(
            Text("If a full pass makes no swaps,", font_size=26, color=WHITE),
            Text("the array is already sorted — stop early.", font_size=26, color=YELLOW),
            Text("Best case: O(n)  |  Worst case: O(n²)", font_size=24, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        opt_text.next_to(opt_label, DOWN, buff=0.6)
        self.play(FadeIn(opt_text))
        self.wait(2.5)
        self.play(FadeOut(opt_text), FadeOut(opt_label), FadeOut(array_vis))

        # ── Stage 8: Complexity Card ────────────────────────────────────
        self.complexity_card(
            time_best="O(n)",
            time_average="O(n²)",
            time_worst="O(n²)",
            space="O(1)",
        )
        self.wait(2)
