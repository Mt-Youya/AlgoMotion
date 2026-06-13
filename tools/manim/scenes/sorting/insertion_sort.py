from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    COBALT, SIGNAL, CORAL, GRAY, INK, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED, C_PIVOT,
)


class InsertionSort(AlgoScene):
    TITLE = "Insertion Sort"
    SUBTITLE = "Builds the sorted array one item at a time by inserting each new element into it"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_lines = VGroup(
            Text("Insertion Sort works like sorting a hand of playing cards.", font_size=28, color=INK),
            Text("Pick one card at a time and slide it into its correct position.", font_size=28, color=INK),
            Text("The left portion of the array is always kept sorted.", font_size=28, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        intro_lines.next_to(intro_label, DOWN, buff=0.7)

        self.play(FadeIn(intro_lines, shift=UP * 0.2, run_time=0.8))
        self.wait(2.5)
        self.play(FadeOut(intro_lines), FadeOut(intro_label))
        self.wait(0.3)

        # ── Stage 2: Array Setup ─────────────────────────────────────────────
        setup_label = self.chapter_title("Array Setup")
        self.wait(0.5)

        setup_note = Text(
            "We start with an unsorted array of 7 elements.",
            font_size=26,
            color=GRAY,
        ).to_edge(UP, buff=1.6)
        self.play(FadeIn(setup_note, run_time=0.5))

        arr = ArrayVis(self, [5, 2, 8, 1, 9, 3, 6], center=ORIGIN)
        self.wait(1.0)

        # Highlight the first element as "already sorted"
        arr.mark_sorted([0])
        sorted_note = Text(
            "Index 0 is trivially sorted — a single element is always sorted.",
            font_size=24,
            color=GRAY,
        ).to_edge(DOWN, buff=0.7)
        self.play(FadeIn(sorted_note, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(sorted_note), FadeOut(setup_note), FadeOut(setup_label))
        self.wait(0.3)

        # ── Stage 3: First Insertion (index 1 → key=2) ──────────────────────
        step1_label = self.chapter_title("Step 1 — Insert element at index 1")
        self.wait(0.5)

        key_note = Text(
            "Key = 2  |  Compare with sorted portion [5]",
            font_size=26,
            color=INK,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(key_note, run_time=0.5))

        # Highlight the key element
        arr.indicate(1)
        arr.set_color([1], C_PIVOT)
        self.wait(0.6)

        # Compare key(2) with arr[0]=5 → 5 > 2, so swap
        arr.compare(0, 1, pause=0.5)
        arr.swap(0, 1)
        arr.mark_sorted([0, 1])

        self.play(FadeOut(key_note))
        step1_done = Text(
            "2 < 5, so we shift 5 right and place 2 at index 0.  Sorted: [2, 5]",
            font_size=24,
            color=COBALT,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(step1_done, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(step1_done), FadeOut(step1_label))
        self.wait(0.3)

        # ── Stage 4: Second Insertion (index 2 → key=8) ─────────────────────
        step2_label = self.chapter_title("Step 2 — Insert element at index 2")
        self.wait(0.5)

        key2_note = Text(
            "Key = 8  |  Compare with sorted portion [2, 5]",
            font_size=26,
            color=INK,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(key2_note, run_time=0.5))

        arr.indicate(2)
        arr.set_color([2], C_PIVOT)
        self.wait(0.6)

        # Compare key(8) with arr[1]=5 → 5 < 8, no swap needed
        arr.compare(1, 2, pause=0.5)
        arr.reset_colors(run_time=0.25)
        arr.mark_sorted([0, 1, 2])

        self.play(FadeOut(key2_note))
        step2_done = Text(
            "8 > 5, so 8 stays in place.  Sorted: [2, 5, 8]",
            font_size=24,
            color=COBALT,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(step2_done, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(step2_done), FadeOut(step2_label))
        self.wait(0.3)

        # ── Stage 5: Third Insertion (index 3 → key=1) ──────────────────────
        step3_label = self.chapter_title("Step 3 — Insert element at index 3")
        self.wait(0.5)

        key3_note = Text(
            "Key = 1  |  Must bubble left past 8, 5, and 2",
            font_size=26,
            color=INK,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(key3_note, run_time=0.5))

        arr.indicate(3)
        arr.set_color([3], C_PIVOT)
        self.wait(0.6)

        # 1 < 8 → swap
        arr.compare(2, 3, pause=0.4)
        arr.swap(2, 3)
        # 1 < 5 → swap
        arr.compare(1, 2, pause=0.4)
        arr.swap(1, 2)
        # 1 < 2 → swap
        arr.compare(0, 1, pause=0.4)
        arr.swap(0, 1)
        arr.mark_sorted([0, 1, 2, 3])

        self.play(FadeOut(key3_note))
        step3_done = Text(
            "1 bubbles all the way left.  Sorted: [1, 2, 5, 8]",
            font_size=24,
            color=COBALT,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(step3_done, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(step3_done), FadeOut(step3_label))
        self.wait(0.3)

        # ── Stage 6: Remaining Passes (fast-forward) ────────────────────────
        fast_label = self.chapter_title("Remaining Passes — Fast Forward")
        self.wait(0.5)

        fast_note = Text(
            "Inserting 9, 3, 6 into their correct positions...",
            font_size=26,
            color=GRAY,
        ).to_edge(DOWN, buff=0.9)
        self.play(FadeIn(fast_note, run_time=0.5))

        # Use ArrayVis built-in insertion_sort for remaining elements
        # We manually drive the remaining insertions at a faster pace
        n = len(arr.values)
        for i in range(4, n):
            arr.indicate(i)
            arr.set_color([i], C_PIVOT)
            self.wait(0.3)
            j = i - 1
            while j >= 0 and arr.values[j] > arr.values[i - (i - 1 - j)]:
                # Re-read current values after each swap
                if arr.values[j] > arr.values[j + 1]:
                    arr.compare(j, j + 1, pause=0.2)
                    arr.swap(j, j + 1)
                    j -= 1
                else:
                    arr.reset_colors(run_time=0.15)
                    break
            arr.mark_sorted(list(range(i + 1)))
            self.wait(0.4)

        self.play(FadeOut(fast_note), FadeOut(fast_label))
        self.wait(0.3)

        # ── Stage 7: Final Sorted State ──────────────────────────────────────
        sorted_label = self.chapter_title("Array is Fully Sorted!")
        self.wait(0.5)

        arr.mark_sorted(list(range(len(arr.values))))

        sorted_summary = VGroup(
            Text("All elements are now in ascending order.", font_size=28, color=INK),
            Text("Insertion Sort completed successfully.", font_size=26, color=COBALT),
        ).arrange(DOWN, buff=0.3)
        sorted_summary.to_edge(DOWN, buff=0.9)
        self.play(FadeIn(sorted_summary, run_time=0.7))
        self.wait(2.0)
        self.play(FadeOut(sorted_summary), FadeOut(sorted_label))
        self.play(FadeOut(arr.get_group()))
        self.wait(0.3)

        # ── Stage 8: Key Properties ───────────────────────────────────────────
        props_label = self.chapter_title("Key Properties")
        self.wait(0.5)

        props = VGroup(
            Text("Stable: equal elements preserve their original order.", font_size=26, color=INK),
            Text("In-place: only O(1) extra memory is used.", font_size=26, color=INK),
            Text("Adaptive: O(n) for nearly-sorted input.", font_size=26, color=COBALT),
            Text("Online: can sort a stream of incoming data.", font_size=26, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        props.next_to(props_label, DOWN, buff=0.7)

        self.play(FadeIn(props, shift=UP * 0.15, run_time=0.9))
        self.wait(2.5)
        self.play(FadeOut(props), FadeOut(props_label))
        self.wait(0.3)

        # ── Stage 9: Complexity Card ──────────────────────────────────────────
        complexity_label = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        card = self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n^2)",
            time_worst=r"O(n^2)",
            space=r"O(1)",
        )
        self.wait(3.0)
        self.play(FadeOut(card), FadeOut(complexity_label))
