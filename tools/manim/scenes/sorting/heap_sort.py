"""Heap Sort — AlgoMotion Manim scene.

Visualises:
  1. Intro: display the unsorted array
  2. Build max-heap: heapify phase (bottom-up)
  3. Heap structure annotation: show parent/child relationships
  4. Extract max: repeatedly swap root with last, reduce heap size, re-heapify
  5. Final sorted array
  6. Complexity card
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    Arrow,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Text,
    VGroup,
    Write,
    AnimationGroup,
    Rectangle,
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


class HeapSort(AlgoScene):
    TITLE = "Heap Sort"
    SUBTITLE = "Builds a max-heap from the array, then repeatedly extracts the maximum element t"
    CATEGORY = "sorting"

    # ── helpers ───────────────────────────────────────────────────────────────

    def _heapify_down(self, arr: ArrayVis, n: int, root: int) -> None:
        """Animate sift-down from root within heap of size n."""
        largest = root
        left = 2 * root + 1
        right = 2 * root + 2

        # Compare root with left child
        if left < n:
            arr.compare(largest, left, pause=0.3)
            if arr.values[left] > arr.values[largest]:
                arr.reset_colors()
                largest = left
            else:
                arr.reset_colors()

        # Compare current largest with right child
        if right < n:
            arr.compare(largest, right, pause=0.3)
            if arr.values[right] > arr.values[largest]:
                arr.reset_colors()
                largest = right
            else:
                arr.reset_colors()

        if largest != root:
            arr.set_color([root], C_PIVOT)
            arr.set_color([largest], C_ACTIVE)
            self.wait(0.25)
            arr.swap(root, largest)
            arr.reset_colors()
            self._heapify_down(arr, n, largest)

    def _build_max_heap(self, arr: ArrayVis) -> None:
        """Animate the bottom-up build-heap phase."""
        n = len(arr.values)
        # Start from last non-leaf node
        for i in range(n // 2 - 1, -1, -1):
            cap = self.chapter_title(f"Heapify node [{i}]  →  value {arr.values[i]}")
            self.wait(0.3)
            self._heapify_down(arr, n, i)
            self.play(FadeOut(cap))

    def _heap_sort_extract(self, arr: ArrayVis) -> None:
        """Animate the extraction phase: swap root with end, shrink heap, re-heapify."""
        n = len(arr.values)
        for end in range(n - 1, 0, -1):
            cap = self.chapter_title(f"Extract max  →  place at index [{end}]")
            self.wait(0.3)

            # Highlight root (max) and last unsorted element
            arr.set_color([0], C_PIVOT)
            arr.set_color([end], C_ACTIVE)
            self.wait(0.4)

            arr.swap(0, end)
            arr.mark_sorted([end])

            self.play(FadeOut(cap))

            if end > 1:
                cap2 = self.chapter_title(f"Re-heapify  →  heap size {end}")
                self.wait(0.2)
                self._heapify_down(arr, end, 0)
                self.play(FadeOut(cap2))

        # Mark index 0 as sorted too
        arr.mark_sorted([0])

    # ── main build ────────────────────────────────────────────────────────────

    def build(self) -> None:
        # ── Stage 1: Intro — display unsorted array ───────────────────────────
        cap = self.chapter_title("Unsorted Array")
        intro_note = Text(
            "We will transform this array into a sorted sequence using a max-heap.",
            font_size=24,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(Write(intro_note))
        self.wait(0.8)

        arr = ArrayVis(self, [4, 10, 3, 5, 1, 8, 7, 2, 9, 6])
        self.wait(0.6)
        self.play(FadeOut(cap), FadeOut(intro_note))

        # ── Stage 2: Explain heap property ───────────────────────────────────
        cap2 = self.chapter_title("Max-Heap Property")
        property_text = Text(
            "Parent ≥ both children  |  root = maximum element",
            font_size=26,
            color=COBALT,
        ).to_edge(DOWN, buff=0.55)
        self.play(FadeIn(property_text))
        self.wait(1.2)

        # Show parent-child index relationships
        index_note = Text(
            "For index i:  left child = 2i+1,  right child = 2i+2",
            font_size=22,
            color=GRAY,
        ).next_to(property_text, UP, buff=0.25)
        self.play(FadeIn(index_note))
        self.wait(1.0)
        self.play(FadeOut(cap2), FadeOut(property_text), FadeOut(index_note))

        # ── Stage 3: Build max-heap (bottom-up heapify) ───────────────────────
        cap3 = self.chapter_title("Phase 1 — Build Max-Heap")
        phase1_note = Text(
            "Start from last non-leaf node (n//2 - 1) and sift down to root.",
            font_size=24,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(phase1_note))
        self.wait(0.8)
        self.play(FadeOut(cap3), FadeOut(phase1_note))

        self._build_max_heap(arr)

        # After build: highlight root as the maximum
        cap4 = self.chapter_title("Max-Heap Built  →  root is maximum")
        arr.set_color([0], C_PIVOT)
        self.wait(0.5)
        arr.indicate(0)
        self.wait(0.8)
        arr.reset_colors()
        self.play(FadeOut(cap4))

        # ── Stage 4: Extraction phase ─────────────────────────────────────────
        cap5 = self.chapter_title("Phase 2 — Extract Max Repeatedly")
        phase2_note = Text(
            "Swap root with last element, mark sorted, then re-heapify.",
            font_size=24,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(phase2_note))
        self.wait(0.9)
        self.play(FadeOut(cap5), FadeOut(phase2_note))

        self._heap_sort_extract(arr)

        # ── Stage 5: Array fully sorted ───────────────────────────────────────
        cap6 = self.chapter_title("Array Sorted!")
        done_note = Text(
            "All elements are now in ascending order.",
            font_size=26,
            color=COBALT,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(done_note))
        self.wait(0.6)

        # Flash all cells to celebrate
        for i in range(len(arr.values)):
            arr.indicate(i)
        self.wait(0.8)
        self.play(FadeOut(cap6), FadeOut(done_note))

        # ── Stage 6: Complexity card ──────────────────────────────────────────
        cap7 = self.chapter_title("Complexity Summary")
        self.wait(0.4)

        # Fade out array to make room for complexity card
        self.play(FadeOut(arr.get_group()))
        self.wait(0.2)

        card = self.complexity_card(
            r"O(n \log n)",
            r"O(n \log n)",
            r"O(n \log n)",
            r"O(1)",
        )
        self.wait(1.5)

        # Add a note about in-place nature
        inplace_note = Text(
            "Heap Sort is in-place (O(1) auxiliary space) and not stable.",
            font_size=22,
            color=GRAY,
        ).next_to(card, DOWN, buff=0.4)
        self.play(FadeIn(inplace_note))
        self.wait(1.2)
        self.play(FadeOut(cap7), FadeOut(card), FadeOut(inplace_note))
