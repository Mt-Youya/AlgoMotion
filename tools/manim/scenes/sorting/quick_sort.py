from manim import *
from ...base import AlgoScene, ArrayVis


class QuickSort(AlgoScene):
    TITLE = "Quick Sort"
    SUBTITLE = "Picks a pivot element and partitions the array so that elements less than the pi"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Introduction ───────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Quick Sort selects a pivot element", font_size=30, color=INK),
            Text("and partitions the array around it.", font_size=30, color=INK),
            Text("Elements smaller than pivot go left,", font_size=28, color=GRAY),
            Text("elements larger go right.", font_size=28, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        intro_text.next_to(intro_label, DOWN, buff=0.7)
        self.play(FadeIn(intro_text, run_time=0.8))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(intro_label))
        self.wait(0.3)

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        setup_label = self.chapter_title("Array Setup")
        self.wait(0.5)

        data = [7, 2, 9, 4, 1, 6, 3]
        array_vis = ArrayVis(self, data)
        self.wait(1)

        setup_note = Text(
            "We will sort: [7, 2, 9, 4, 1, 6, 3]",
            font_size=26,
            color=GRAY,
        )
        setup_note.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(setup_note))
        self.wait(1.5)
        self.play(FadeOut(setup_note), FadeOut(setup_label))
        self.wait(0.3)

        # ── Stage 3: Pivot Selection ────────────────────────────────────────
        pivot_label = self.chapter_title("Step 1 — Choose Pivot")
        self.wait(0.5)

        pivot_idx = 6  # last element: value 3
        array_vis.mark_pivot(pivot_idx)
        self.wait(0.5)

        pivot_note = VGroup(
            Text("Pivot = last element (value: 3)", font_size=28, color=C_PIVOT),
            Text("We will place 3 in its correct sorted position.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        pivot_note.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(pivot_note))
        self.wait(2)
        self.play(FadeOut(pivot_note))

        array_vis.flash_index(pivot_idx, label="PIVOT")
        self.wait(1)
        self.play(FadeOut(pivot_label))
        self.wait(0.3)

        # ── Stage 4: Partition Pass ─────────────────────────────────────────
        partition_label = self.chapter_title("Step 2 — Partition")
        self.wait(0.5)

        partition_note = Text(
            "i tracks the boundary of elements < pivot",
            font_size=26,
            color=COBALT,
        )
        partition_note.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(partition_note))
        self.wait(1.5)

        # Animate partition: pivot = 3, arr = [7,2,9,4,1,6,3]
        # i = -1, scan j from 0 to 5
        # j=0: 7 > 3, skip
        # j=1: 2 < 3, i=0, swap(0,1) -> [2,7,9,4,1,6,3]
        # j=2: 9 > 3, skip
        # j=3: 4 > 3, skip
        # j=4: 1 < 3, i=1, swap(1,4) -> [2,1,9,4,7,6,3]
        # j=5: 6 > 3, skip
        # place pivot: swap(i+1, pivot_idx) -> swap(2,6) -> [2,1,3,4,7,6,9]

        arr = list(data)
        i = -1

        for j in range(len(arr) - 1):
            array_vis.set_color([j], C_ACTIVE)
            self.wait(0.4)
            if arr[j] <= arr[pivot_idx]:
                i += 1
                if i != j:
                    array_vis.swap(i, j)
                    arr[i], arr[j] = arr[j], arr[i]
                array_vis.set_color([i], COBALT)
                self.wait(0.3)
            else:
                array_vis.reset_colors()
                array_vis.mark_pivot(pivot_idx)
                self.wait(0.2)

        # Place pivot in correct position
        pivot_final = i + 1
        array_vis.swap(pivot_final, pivot_idx)
        arr[pivot_final], arr[pivot_idx] = arr[pivot_idx], arr[pivot_final]
        self.wait(0.3)

        array_vis.mark_sorted([pivot_final])
        self.wait(0.5)

        self.play(FadeOut(partition_note))
        pivot_placed = Text(
            f"Pivot (3) is now at index {pivot_final} — its final position!",
            font_size=26,
            color=C_SORTED,
        )
        pivot_placed.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(pivot_placed))
        self.wait(2)
        self.play(FadeOut(pivot_placed), FadeOut(partition_label))
        self.wait(0.3)

        # ── Stage 5: Recursive Sub-arrays ──────────────────────────────────
        recurse_label = self.chapter_title("Step 3 — Recurse on Sub-arrays")
        self.wait(0.5)

        brace_left = array_vis.brace_range(0, pivot_final - 1, "Left sub-array")
        self.wait(1)
        self.play(FadeOut(brace_left))

        brace_right = array_vis.brace_range(pivot_final + 1, len(arr) - 1, "Right sub-array")
        self.wait(1)
        self.play(FadeOut(brace_right))

        recurse_note = VGroup(
            Text("Left:  [2, 1]  → Quick Sort recursively", font_size=26, color=COBALT),
            Text("Right: [4, 7, 6, 9]  → Quick Sort recursively", font_size=26, color=CORAL),
            Text("Each call picks a new pivot and partitions again.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        recurse_note.next_to(array_vis.get_group(), DOWN, buff=0.9)
        self.play(FadeIn(recurse_note))
        self.wait(2.5)
        self.play(FadeOut(recurse_note), FadeOut(recurse_label))
        self.wait(0.3)

        # ── Stage 6: Left Sub-array Sort ───────────────────────────────────
        left_label = self.chapter_title("Sorting Left Sub-array [2, 1]")
        self.wait(0.5)

        # Highlight left portion
        array_vis.set_color([0, 1], C_ACTIVE)
        self.wait(0.5)

        # pivot = arr[1] = 1, compare arr[0]=2 > 1 → no swap before pivot
        # swap pivot to position 0
        array_vis.mark_pivot(1)
        self.wait(0.5)
        array_vis.swap(0, 1)
        arr[0], arr[1] = arr[1], arr[0]
        self.wait(0.3)
        array_vis.mark_sorted([0, 1])
        self.wait(1)

        left_done = Text("Left sub-array sorted: [1, 2]", font_size=26, color=C_SORTED)
        left_done.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(left_done))
        self.wait(1.5)
        self.play(FadeOut(left_done), FadeOut(left_label))
        self.wait(0.3)

        # ── Stage 7: Right Sub-array Sort ──────────────────────────────────
        right_label = self.chapter_title("Sorting Right Sub-array [4, 7, 6, 9]")
        self.wait(0.5)

        # Right sub-array starts at index 3: [4, 7, 6, 9]
        array_vis.set_color([3, 4, 5, 6], C_ACTIVE)
        self.wait(0.5)

        # pivot = 9 (last), all elements < 9 → pivot stays at index 6
        array_vis.mark_pivot(6)
        self.wait(0.4)
        array_vis.mark_sorted([6])
        self.wait(0.5)

        # Next pivot = 6 (index 5 of right sub [4,7,6])
        array_vis.mark_pivot(5)
        self.wait(0.4)
        # 4 < 6 stays, 7 > 6 → swap(4,5) to move 7 right
        array_vis.swap(4, 5)
        arr[4], arr[5] = arr[5], arr[4]
        self.wait(0.3)
        array_vis.mark_sorted([4])  # 6 is now in place at index 4
        self.wait(0.5)

        # Remaining [4, 7] → pivot 7, 4 < 7, pivot stays
        array_vis.mark_pivot(5)
        self.wait(0.3)
        array_vis.mark_sorted([3, 4, 5, 6])
        self.wait(1)

        right_done = Text("Right sub-array sorted: [4, 6, 7, 9]", font_size=26, color=C_SORTED)
        right_done.next_to(array_vis.get_group(), DOWN, buff=1.0)
        self.play(FadeIn(right_done))
        self.wait(1.5)
        self.play(FadeOut(right_done), FadeOut(right_label))
        self.wait(0.3)

        # ── Stage 8: Final Sorted Result ────────────────────────────────────
        final_label = self.chapter_title("Array Fully Sorted!")
        self.wait(0.5)

        array_vis.mark_sorted(list(range(len(arr))))
        self.wait(0.5)

        final_text = VGroup(
            Text("Result: [1, 2, 3, 4, 6, 7, 9]", font_size=32, color=C_SORTED, weight="BOLD"),
            Text("All elements are now in their correct positions.", font_size=26, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        final_text.next_to(array_vis.get_group(), DOWN, buff=0.9)
        self.play(FadeIn(final_text))
        self.wait(2.5)
        self.play(FadeOut(final_text), FadeOut(final_label), FadeOut(array_vis.get_group()))
        self.wait(0.3)

        # ── Stage 9: Complexity Card ────────────────────────────────────────
        complexity_label = self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n \log n)",
            time_avg=r"O(n \log n)",
            time_worst=r"O(n^2)",
            space=r"O(\log n)",
        )
        self.wait(2.5)
        self.play(FadeOut(complexity_label))
        self.wait(0.5)
