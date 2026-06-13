from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    C_ACTIVE, C_DEFAULT, C_SORTED, C_TEXT,
    COBALT, CORAL, GRAY, INK, MIST, SIGNAL, PAPER,
)


class CountingSort(AlgoScene):
    TITLE = "Counting Sort"
    SUBTITLE = "Counts occurrences of each value and uses cumulative counts to place elements in"
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Introduction ───────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Counting Sort is a non-comparison sort.", font_size=30, color=INK),
            Text("It counts how many times each value appears,", font_size=28, color=GRAY),
            Text("then reconstructs the sorted array directly.", font_size=28, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        intro_text.move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP * 0.2, run_time=0.8))
        self.wait(2.5)
        self.play(FadeOut(intro_text), FadeOut(intro_label))
        self.wait(0.2)

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        setup_label = self.chapter_title("Input Array")
        self.wait(0.5)

        data = [4, 2, 2, 8, 3, 3, 1]
        array_vis = ArrayVis(self, data, center=UP * 1.5)
        self.wait(1)

        caption_mob = self.caption("Input: values in range [1, 8]")
        self.wait(1.5)
        self.play(FadeOut(caption_mob), FadeOut(setup_label))
        self.wait(0.2)

        # ── Stage 3: Build Count Array ──────────────────────────────────────
        count_label = self.chapter_title("Step 1 — Count Occurrences")
        self.wait(0.5)

        # Determine range
        max_val = max(data)
        count = [0] * (max_val + 1)

        # Display count array (indices 0..max_val)
        count_vis = ArrayVis(self, list(count), center=DOWN * 0.5, show_indices=True)

        count_header = Text("Count Array (index = value)", font_size=22, color=COBALT)
        count_header.next_to(count_vis.get_group(), UP, buff=0.25)
        self.play(FadeIn(count_header, run_time=0.4))
        self.wait(0.8)

        # Animate counting each element
        for i, val in enumerate(data):
            # Highlight source element
            array_vis.set_color([i], C_ACTIVE, run_time=0.35)
            self.wait(0.2)

            count[val] += 1
            count_vis.write_value(val, count[val])
            count_vis.set_color([val], SIGNAL, run_time=0.3)
            self.wait(0.3)

            # Reset source highlight, keep count highlight briefly
            array_vis.set_color([i], C_DEFAULT, run_time=0.25)
            count_vis.set_color([val], C_DEFAULT, run_time=0.25)

        self.wait(1)
        self.play(FadeOut(count_label))
        self.wait(0.2)

        # ── Stage 4: Cumulative (Prefix) Sum ────────────────────────────────
        prefix_label = self.chapter_title("Step 2 — Cumulative Count")
        self.wait(0.5)

        prefix_caption = self.caption("Transform count[] into prefix sums (positions)")
        self.wait(0.8)

        # Animate prefix sum computation
        for i in range(1, max_val + 1):
            count_vis.set_color([i - 1], C_ACTIVE, run_time=0.3)
            count_vis.set_color([i], CORAL, run_time=0.3)
            self.wait(0.3)

            count[i] += count[i - 1]
            count_vis.write_value(i, count[i])
            self.wait(0.35)

            count_vis.set_color([i - 1], C_DEFAULT, run_time=0.2)
            count_vis.set_color([i], SIGNAL, run_time=0.2)
            self.wait(0.15)

        # Mark all prefix cells as sorted-color
        count_vis.mark_sorted(list(range(max_val + 1)))
        self.wait(1.5)

        self.play(FadeOut(prefix_caption), FadeOut(prefix_label))
        self.wait(0.2)

        # ── Stage 5: Place Elements into Output Array ────────────────────────
        place_label = self.chapter_title("Step 3 — Place Elements")
        self.wait(0.5)

        # Build output array (same length as data, all zeros initially)
        output = [0] * len(data)
        output_vis = ArrayVis(self, list(output), center=DOWN * 2.2, show_indices=True)

        output_header = Text("Output Array", font_size=22, color=COBALT)
        output_header.next_to(output_vis.get_group(), UP, buff=0.25)
        self.play(FadeIn(output_header, run_time=0.4))
        self.wait(0.5)

        place_caption = self.caption("Traverse input right-to-left for stability")
        self.wait(0.8)

        # Traverse input from right to left (stable sort)
        for i in range(len(data) - 1, -1, -1):
            val = data[i]

            # Highlight source element
            array_vis.set_color([i], C_ACTIVE, run_time=0.35)
            count_vis.set_color([val], CORAL, run_time=0.3)
            self.wait(0.3)

            # Decrement count and place
            count[val] -= 1
            pos = count[val]
            output[pos] = val

            count_vis.write_value(val, count[val])
            output_vis.write_value(pos, val)
            output_vis.set_color([pos], SIGNAL, run_time=0.35)
            self.wait(0.4)

            # Reset highlights
            array_vis.set_color([i], C_SORTED, run_time=0.25)
            count_vis.set_color([val], C_DEFAULT, run_time=0.2)

        self.wait(1.5)
        self.play(FadeOut(place_caption), FadeOut(place_label))
        self.wait(0.2)

        # ── Stage 6: Final Sorted Result ────────────────────────────────────
        result_label = self.chapter_title("Sorted Result")
        self.wait(0.5)

        # Mark all output cells as sorted
        output_vis.mark_sorted(list(range(len(data))))

        result_text = Text(
            "All elements placed in correct positions!",
            font_size=28,
            color=COBALT,
        )
        result_text.next_to(output_vis.get_group(), DOWN, buff=0.6)
        self.play(FadeIn(result_text, run_time=0.6))
        self.wait(2)

        # Fade out intermediate visuals
        self.play(
            FadeOut(array_vis.get_group()),
            FadeOut(count_vis.get_group()),
            FadeOut(count_header),
            FadeOut(output_header),
            FadeOut(result_text),
            FadeOut(result_label),
            run_time=0.7,
        )
        self.wait(0.3)

        # ── Stage 7: Key Properties ──────────────────────────────────────────
        props_label = self.chapter_title("Key Properties")
        self.wait(0.5)

        props = VGroup(
            Text("• Non-comparison sort — no element comparisons needed", font_size=26, color=INK),
            Text("• Stable — preserves relative order of equal elements", font_size=26, color=INK),
            Text("• Efficient when range k is small relative to n", font_size=26, color=INK),
            Text("• Not in-place — requires O(n + k) extra space", font_size=26, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        props.move_to(ORIGIN)

        self.play(FadeIn(props, shift=UP * 0.2, run_time=0.9))
        self.wait(2.5)
        self.play(FadeOut(props), FadeOut(props_label))
        self.wait(0.3)

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n + k)",
            time_avg=r"O(n + k)",
            time_worst=r"O(n + k)",
            space=r"O(n + k)",
        )
        self.wait(2.5)
