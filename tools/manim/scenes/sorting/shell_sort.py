from manim import *
from ...base import AlgoScene, ArrayVis


class ShellSort(AlgoScene):
    TITLE = "Shell Sort"
    SUBTITLE = "Generalization of insertion sort that allows exchange of items far apart, using "
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        title_label = self.chapter_title("Shell Sort")
        self.play(Write(title_label))
        self.wait(1)

        intro_text = Text(
            "Insertion sort, but with a twist:\nfirst sort elements far apart,\nthen reduce the gap.",
            font_size=28,
            color=WHITE,
        ).next_to(title_label, DOWN, buff=0.6)
        self.play(FadeIn(intro_text))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(title_label))

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        setup_label = self.chapter_title("Initial Array")
        self.play(Write(setup_label))

        values = [64, 34, 25, 12, 22, 11, 90]
        arr_vis = ArrayVis(values, label="Array")
        arr_vis.move_to(ORIGIN)
        self.play(FadeIn(arr_vis))
        self.wait(1)

        indices = VGroup(
            *[
                Text(str(i), font_size=18, color=GRAY).next_to(
                    arr_vis.cells[i], DOWN, buff=0.15
                )
                for i in range(len(values))
            ]
        )
        self.play(FadeIn(indices))
        self.wait(1)
        self.play(FadeOut(setup_label))

        # ── Stage 3: Gap Sequence Explanation ──────────────────────────────
        gap_label = self.chapter_title("Gap Sequence: n/2, n/4, ..., 1")
        self.play(Write(gap_label))

        n = len(values)
        gap_values = []
        g = n // 2
        while g >= 1:
            gap_values.append(g)
            g //= 2

        gap_text = Text(
            "Gaps: " + " → ".join(str(gv) for gv in gap_values),
            font_size=26,
            color=YELLOW,
        ).next_to(arr_vis, UP, buff=1.2)
        self.play(Write(gap_text))
        self.wait(1.5)
        self.play(FadeOut(gap_label), FadeOut(gap_text))

        # ── Stage 4: Gap = 3 Pass ───────────────────────────────────────────
        pass1_label = self.chapter_title("Pass 1 — Gap = 3")
        self.play(Write(pass1_label))

        current_values = values[:]
        gap = 3

        gap_indicator = Text(f"gap = {gap}", font_size=24, color=ORANGE).to_edge(RIGHT).shift(UP * 2)
        self.play(FadeIn(gap_indicator))

        for i in range(gap, n):
            j = i
            # Highlight current element
            self.play(
                arr_vis.cells[j].animate.set_fill(YELLOW, opacity=0.5),
                run_time=0.3,
            )
            while j >= gap and current_values[j - gap] > current_values[j]:
                # Highlight the pair being compared
                self.play(
                    arr_vis.cells[j - gap].animate.set_fill(RED, opacity=0.5),
                    run_time=0.3,
                )
                self.wait(0.2)

                # Swap
                current_values[j], current_values[j - gap] = (
                    current_values[j - gap],
                    current_values[j],
                )
                arr_vis.swap_cells(j, j - gap, self)
                self.wait(0.3)

                self.play(
                    arr_vis.cells[j - gap].animate.set_fill(GREEN, opacity=0.3),
                    arr_vis.cells[j].animate.set_fill(WHITE, opacity=0),
                    run_time=0.3,
                )
                j -= gap
            # Reset highlight
            self.play(
                arr_vis.cells[j].animate.set_fill(WHITE, opacity=0),
                run_time=0.2,
            )

        self.wait(1)
        self.play(FadeOut(pass1_label), FadeOut(gap_indicator))

        # ── Stage 5: Gap = 1 Pass (Insertion Sort) ─────────────────────────
        pass2_label = self.chapter_title("Pass 2 — Gap = 1 (Insertion Sort)")
        self.play(Write(pass2_label))

        gap = 1
        gap_indicator2 = Text(f"gap = {gap}", font_size=24, color=GREEN).to_edge(RIGHT).shift(UP * 2)
        self.play(FadeIn(gap_indicator2))

        for i in range(gap, n):
            j = i
            self.play(
                arr_vis.cells[j].animate.set_fill(YELLOW, opacity=0.5),
                run_time=0.3,
            )
            while j >= gap and current_values[j - gap] > current_values[j]:
                self.play(
                    arr_vis.cells[j - gap].animate.set_fill(RED, opacity=0.5),
                    run_time=0.25,
                )
                current_values[j], current_values[j - gap] = (
                    current_values[j - gap],
                    current_values[j],
                )
                arr_vis.swap_cells(j, j - gap, self)
                self.play(
                    arr_vis.cells[j - gap].animate.set_fill(GREEN, opacity=0.3),
                    arr_vis.cells[j].animate.set_fill(WHITE, opacity=0),
                    run_time=0.25,
                )
                j -= gap
            self.play(
                arr_vis.cells[j].animate.set_fill(WHITE, opacity=0),
                run_time=0.2,
            )

        self.wait(1)
        self.play(FadeOut(pass2_label), FadeOut(gap_indicator2))

        # ── Stage 6: Sorted Result ──────────────────────────────────────────
        sorted_label = self.chapter_title("Array is Sorted!")
        self.play(Write(sorted_label))

        for cell in arr_vis.cells:
            self.play(cell.animate.set_fill(GREEN, opacity=0.5), run_time=0.15)

        self.wait(1.5)
        self.play(FadeOut(sorted_label), FadeOut(arr_vis), FadeOut(indices))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_best="O(n log n)",
            time_avg="O(n log² n)",
            time_worst="O(n²)",
            space="O(1)",
        )
        self.wait(2)
