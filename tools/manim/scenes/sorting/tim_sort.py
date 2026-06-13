"""Timsort — Manim scene for AlgoMotion.

Hybrid algorithm derived from merge sort and insertion sort.
Used in Python and Java standard libraries.
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    Arrow,
    Brace,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Rectangle,
    SurroundingRectangle,
    Text,
    Transform,
    VGroup,
    Write,
    AnimationGroup,
    Indicate,
)

from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    C_ACTIVE,
    C_DEFAULT,
    C_PIVOT,
    C_SORTED,
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    SIGNAL,
)

RUN_SIZE = 4  # RUN size used in the demo


class TimSort(AlgoScene):
    TITLE = "Timsort"
    SUBTITLE = "Hybrid algorithm derived from merge sort and insertion sort. Used in Python and "
    CATEGORY = "sorting"

    def build(self) -> None:
        # ── Stage 1: Introduce the input array ───────────────────────────────
        ch1 = self.chapter_title("The Input Array")
        intro_caption = self.caption("We start with an unsorted array of 8 elements.")
        self.wait(1.0)

        arr = ArrayVis(
            self,
            [38, 27, 43, 3, 9, 82, 10, 1],
            cell_size=0.9,
        )
        self.wait(0.8)
        self.play(FadeOut(ch1), FadeOut(intro_caption))
        self.wait(0.3)

        # ── Stage 2: Explain the RUN concept ─────────────────────────────────
        ch2 = self.chapter_title("Step 1 — Identify Runs")
        run_caption = self.caption(
            f"Timsort splits the array into small 'runs' of size ~{RUN_SIZE}."
        )
        self.wait(1.0)

        # Highlight run 0: indices 0..3
        run0_label = Text("Run 0", font_size=22, color=COBALT, weight="BOLD")
        run0_label.next_to(arr.cells[1], UP, buff=0.55)
        run1_label = Text("Run 1", font_size=22, color=CORAL, weight="BOLD")
        run1_label.next_to(arr.cells[5], UP, buff=0.55)

        arr.highlight_range(0, 3, color=COBALT)
        self.play(FadeIn(run0_label))
        self.wait(0.5)

        arr.highlight_range(4, 7, color=CORAL)
        self.play(FadeIn(run1_label))
        self.wait(0.8)

        self.play(FadeOut(run0_label), FadeOut(run1_label))
        arr.reset_colors()
        self.play(FadeOut(ch2), FadeOut(run_caption))
        self.wait(0.2)

        # ── Stage 3: Insertion sort on Run 0 ─────────────────────────────────
        ch3 = self.chapter_title("Step 2 — Insertion Sort Each Run")
        ins_caption = self.caption("Each run is sorted independently using insertion sort.")
        self.wait(1.0)

        # Highlight run 0 boundary
        run0_box = SurroundingRectangle(
            VGroup(*arr.cells[0:4]),
            color=COBALT,
            stroke_width=3,
            buff=0.12,
        )
        self.play(Create(run0_box))
        self.wait(0.4)

        # Perform insertion sort on run 0 (indices 0-3): [38, 27, 43, 3]
        # Step: compare index 1 vs 0
        arr.compare(0, 1, pause=0.3)
        arr.swap(0, 1)   # [27, 38, 43, 3]
        arr.mark_sorted([0, 1])

        # Step: compare index 2 vs 1 — no swap needed (38 < 43)
        arr.compare(1, 2, pause=0.3)
        arr.reset_colors()
        arr.mark_sorted([0, 1, 2])

        # Step: compare index 3 vs 2, 1, 0 — 3 bubbles all the way left
        arr.compare(2, 3, pause=0.3)
        arr.swap(2, 3)   # [27, 38, 3, 43]
        arr.compare(1, 2, pause=0.3)
        arr.swap(1, 2)   # [27, 3, 38, 43]
        arr.compare(0, 1, pause=0.3)
        arr.swap(0, 1)   # [3, 27, 38, 43]
        arr.mark_sorted([0, 1, 2, 3])
        self.wait(0.5)

        self.play(FadeOut(run0_box))

        # Insertion sort on run 1 (indices 4-7): [9, 82, 10, 1]
        run1_box = SurroundingRectangle(
            VGroup(*arr.cells[4:8]),
            color=CORAL,
            stroke_width=3,
            buff=0.12,
        )
        self.play(Create(run1_box))
        self.wait(0.4)

        arr.compare(4, 5, pause=0.3)   # 9 < 82, no swap
        arr.reset_colors()
        arr.mark_sorted([0, 1, 2, 3, 4, 5])

        arr.compare(5, 6, pause=0.3)   # 82 > 10, swap
        arr.swap(5, 6)
        arr.compare(4, 5, pause=0.3)   # 9 < 10, no swap
        arr.reset_colors()
        arr.mark_sorted([0, 1, 2, 3, 4, 5, 6])

        arr.compare(6, 7, pause=0.3)   # 82 > 1, swap
        arr.swap(6, 7)
        arr.compare(5, 6, pause=0.3)   # 10 > 1, swap
        arr.swap(5, 6)
        arr.compare(4, 5, pause=0.3)   # 9 > 1, swap
        arr.swap(4, 5)
        arr.mark_sorted([0, 1, 2, 3, 4, 5, 6, 7])
        self.wait(0.6)

        self.play(FadeOut(run1_box))
        self.play(FadeOut(ch3), FadeOut(ins_caption))
        self.wait(0.3)

        # ── Stage 4: Merge the two sorted runs ───────────────────────────────
        ch4 = self.chapter_title("Step 3 — Merge Sorted Runs")
        merge_caption = self.caption(
            "Timsort merges adjacent sorted runs using merge sort logic."
        )
        self.wait(1.0)

        # Draw merge arrow between the two halves
        mid_point = arr.cells[3].get_right() + RIGHT * 0.05
        merge_arrow = Arrow(
            arr.cells[3].get_top() + UP * 0.3,
            arr.cells[4].get_top() + UP * 0.3,
            color=SIGNAL,
            buff=0.1,
            stroke_width=4,
        )
        merge_label = Text("merge", font_size=20, color=SIGNAL, weight="BOLD")
        merge_label.next_to(merge_arrow, UP, buff=0.1)
        self.play(Create(merge_arrow), FadeIn(merge_label))
        self.wait(0.8)

        # Animate merging: highlight cells being merged in order
        # Merged result: [1, 3, 9, 10, 27, 38, 43, 82]
        merge_steps = [
            (4, 0),   # 1 < 3 → take from run1
            (0, 1),   # 3 < 9 → take from run0
            (4, 5),   # 9 < 27 → take from run1
            (5, 6),   # 10 < 27 → take from run1
            (1, 2),   # 27 < 38 → take from run0
            (2, 3),   # 38 < 43 → take from run0
            (3, 7),   # 43 < 82 → take from run0
        ]
        for i_a, i_b in merge_steps:
            arr.compare(i_a, i_b, pause=0.25)
            arr.reset_colors()

        arr.mark_sorted(list(range(8)))
        self.wait(0.6)

        self.play(FadeOut(merge_arrow), FadeOut(merge_label))
        self.play(FadeOut(ch4), FadeOut(merge_caption))
        self.wait(0.3)

        # ── Stage 5: Final sorted state ──────────────────────────────────────
        ch5 = self.chapter_title("Result — Fully Sorted")
        sorted_caption = self.caption(
            "All runs merged. The array is now fully sorted."
        )
        self.wait(0.8)

        # Pulse each cell to celebrate
        for i in range(len(arr.cells)):
            self.play(Indicate(arr.cells[i], color=SIGNAL, scale_factor=1.2, run_time=0.18))

        self.wait(1.0)
        self.play(FadeOut(ch5), FadeOut(sorted_caption))
        self.wait(0.3)

        # ── Stage 6: Key properties callout ──────────────────────────────────
        ch6 = self.chapter_title("Key Properties")
        self.wait(0.5)

        props = VGroup(
            Text("✓  Stable sort — equal elements keep relative order", font_size=24, color=INK),
            Text("✓  Adaptive — faster on nearly-sorted data (O(n))", font_size=24, color=INK),
            Text("✓  Used in Python (list.sort) and Java (Arrays.sort)", font_size=24, color=INK),
            Text("✓  Minimum run size: 32–64 elements in practice", font_size=24, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.38)
        props.move_to(MIST)
        props.shift(DOWN * 0.5)

        for prop in props:
            self.play(FadeIn(prop, shift=RIGHT * 0.2, run_time=0.4))
            self.wait(0.4)

        self.wait(0.8)
        self.play(FadeOut(props), FadeOut(ch6))
        self.wait(0.3)

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        card = self.complexity_card(
            r"O(n)",
            r"O(n \log n)",
            r"O(n \log n)",
            r"O(n)",
        )
        self.wait(2.0)
        self.play(FadeOut(card), FadeOut(ch7))
        self.wait(0.3)
