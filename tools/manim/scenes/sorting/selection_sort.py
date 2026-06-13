from manim import *
from ...base import AlgoScene, ArrayVis


class SelectionSort(AlgoScene):
    TITLE = "Selection Sort"
    SUBTITLE = "Finds the minimum element in the unsorted portion and places it at the beginning"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro = Text(
            "Selection Sort scans the unsorted region\nto find the minimum, then swaps it to the front.",
            font_size=28,
            color=WHITE,
        ).to_edge(UP, buff=1.2)
        self.play(FadeIn(intro))
        self.wait(2)
        self.play(FadeOut(intro))

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        self.chapter_title("Initial Array")
        data = [64, 25, 12, 22, 11]
        av = ArrayVis(data)
        self.play(av.create_animation())
        self.wait(1)

        label_orig = Text("Unsorted array", font_size=24, color=YELLOW).next_to(
            av.group, DOWN, buff=0.5
        )
        self.play(FadeIn(label_orig))
        self.wait(1.5)
        self.play(FadeOut(label_orig))

        # ── Stage 3: Pass 1 – find min, swap to index 0 ────────────────────
        self.chapter_title("Pass 1: Find Minimum")

        # Highlight scanning region
        scan_label = Text("Scanning for minimum…", font_size=24, color=BLUE).to_edge(
            DOWN, buff=0.8
        )
        self.play(FadeIn(scan_label))

        # Animate scanning each cell
        for idx in range(len(data)):
            self.play(av.highlight(idx, color=BLUE_B), run_time=0.3)
            self.wait(0.15)

        # Mark the minimum (index 4, value 11)
        min_idx = 4
        self.play(av.highlight(min_idx, color=RED), run_time=0.4)
        min_label = Text("min = 11", font_size=24, color=RED).next_to(
            av.group, DOWN, buff=0.5
        )
        self.play(FadeOut(scan_label), FadeIn(min_label))
        self.wait(1)

        # Swap index 0 and index 4
        swap_label = Text("Swap index 0 ↔ index 4", font_size=24, color=GREEN).next_to(
            av.group, DOWN, buff=0.5
        )
        self.play(FadeOut(min_label), FadeIn(swap_label))
        self.play(av.swap_animation(0, min_idx), run_time=0.8)
        data[0], data[min_idx] = data[min_idx], data[0]
        self.wait(0.5)

        # Mark index 0 as sorted
        self.play(av.highlight(0, color=GREEN_D), FadeOut(swap_label))
        sorted_label = Text("Sorted", font_size=20, color=GREEN_D).next_to(
            av.get_cell(0), UP, buff=0.2
        )
        self.play(FadeIn(sorted_label))
        self.wait(1)

        # ── Stage 4: Pass 2 – find min in [1..4] ───────────────────────────
        self.chapter_title("Pass 2: Next Minimum")

        scan2 = Text("Scanning indices 1–4…", font_size=24, color=BLUE).to_edge(
            DOWN, buff=0.8
        )
        self.play(FadeIn(scan2))

        for idx in range(1, len(data)):
            self.play(av.highlight(idx, color=BLUE_B), run_time=0.3)
            self.wait(0.1)

        # min is index 2, value 12
        min_idx2 = 2
        self.play(av.highlight(min_idx2, color=RED), run_time=0.4)
        min2_label = Text("min = 12", font_size=24, color=RED).next_to(
            av.group, DOWN, buff=0.5
        )
        self.play(FadeOut(scan2), FadeIn(min2_label))
        self.wait(1)

        swap2_label = Text("Swap index 1 ↔ index 2", font_size=24, color=GREEN).next_to(
            av.group, DOWN, buff=0.5
        )
        self.play(FadeOut(min2_label), FadeIn(swap2_label))
        self.play(av.swap_animation(1, min_idx2), run_time=0.8)
        data[1], data[min_idx2] = data[min_idx2], data[1]
        self.wait(0.5)

        self.play(av.highlight(1, color=GREEN_D), FadeOut(swap2_label))
        sorted2 = Text("Sorted", font_size=20, color=GREEN_D).next_to(
            av.get_cell(1), UP, buff=0.2
        )
        self.play(FadeIn(sorted2))
        self.wait(1)

        # ── Stage 5: Remaining Passes (accelerated) ─────────────────────────
        self.chapter_title("Remaining Passes")

        remaining = Text(
            "Continuing for indices 2, 3, 4…", font_size=24, color=YELLOW
        ).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(remaining))

        # Pass 3: min in [2..4] → index 3, value 22 → swap with index 2
        for idx in range(2, len(data)):
            self.play(av.highlight(idx, color=BLUE_B), run_time=0.2)
        min_idx3 = data.index(min(data[2:]), 2)
        self.play(av.highlight(min_idx3, color=RED), run_time=0.3)
        self.play(av.swap_animation(2, min_idx3), run_time=0.6)
        data[2], data[min_idx3] = data[min_idx3], data[2]
        self.play(av.highlight(2, color=GREEN_D))
        self.wait(0.5)

        # Pass 4: min in [3..4]
        for idx in range(3, len(data)):
            self.play(av.highlight(idx, color=BLUE_B), run_time=0.2)
        min_idx4 = data.index(min(data[3:]), 3)
        self.play(av.highlight(min_idx4, color=RED), run_time=0.3)
        self.play(av.swap_animation(3, min_idx4), run_time=0.6)
        data[3], data[min_idx4] = data[min_idx4], data[3]
        self.play(av.highlight(3, color=GREEN_D))
        self.wait(0.5)

        # Last element is automatically sorted
        self.play(av.highlight(4, color=GREEN_D))
        self.play(FadeOut(remaining))
        self.wait(1)

        # ── Stage 6: Sorted Result ──────────────────────────────────────────
        self.chapter_title("Sorted!")

        done_label = Text(
            "Array fully sorted: [11, 12, 22, 25, 64]",
            font_size=28,
            color=GREEN,
        ).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(done_label))
        self.wait(2)
        self.play(FadeOut(done_label))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.play(FadeOut(av.group), FadeOut(sorted_label), FadeOut(sorted2))
        self.complexity_card(
            time_best="O(n²)",
            time_avg="O(n²)",
            time_worst="O(n²)",
            space="O(1)",
            notes=[
                "Always performs n(n-1)/2 comparisons regardless of input order.",
                "At most n-1 swaps — optimal when write operations are costly.",
                "Not stable: equal elements may change relative order.",
            ],
        )
        self.wait(3)
