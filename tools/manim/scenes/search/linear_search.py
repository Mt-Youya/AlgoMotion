from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    INK, GRAY, COBALT, SIGNAL, CORAL, MIST, PAPER,
    C_ACTIVE, C_DEFAULT, C_SORTED,
)


class LinearSearch(AlgoScene):
    TITLE = "Linear Search"
    SUBTITLE = "Sequentially checks each element until the target is found or the array is exhau"
    CATEGORY = "search"

    def build(self):
        # ── Stage 1: Introduction ───────────────────────────────────────────
        ch1 = self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Linear Search scans every element", font_size=30, color=INK),
            Text("from left to right until the target is found.", font_size=30, color=INK),
            Text("No sorting required — works on any array.", font_size=26, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        intro_text.move_to(ORIGIN + DOWN * 0.3)
        self.play(FadeIn(intro_text, shift=UP * 0.2, run_time=0.7))
        self.wait(2.5)
        self.play(FadeOut(intro_text), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        ch2 = self.chapter_title("Array Setup")
        values = [7, 2, 9, 4, 11, 3, 6]
        target_val = 11
        arr = ArrayVis(self, values, center=ORIGIN + UP * 0.5)

        target_label = Text(f"Target: {target_val}", font_size=32, color=CORAL, weight="BOLD")
        target_label.next_to(arr.get_group(), DOWN, buff=0.9)
        self.play(FadeIn(target_label, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(ch2))
        self.wait(0.2)

        # ── Stage 3: Sequential Scan — elements not matching ────────────────
        ch3 = self.chapter_title("Scanning: No Match")
        caption_mob = None

        for i in range(4):
            arr.set_color([i], C_ACTIVE, run_time=0.35)
            check_text = Text(
                f"index {i}: {values[i]} ≠ {target_val}  →  move on",
                font_size=24,
                color=GRAY,
            ).to_edge(DOWN, buff=0.35)
            if caption_mob:
                self.play(Transform(caption_mob, check_text, run_time=0.3))
            else:
                caption_mob = check_text
                self.play(FadeIn(caption_mob, run_time=0.3))
            self.wait(0.7)
            arr.set_color([i], MIST, run_time=0.25)

        self.play(FadeOut(ch3))
        self.wait(0.2)

        # ── Stage 4: Target Found ───────────────────────────────────────────
        ch4 = self.chapter_title("Target Found!")
        found_idx = 4
        arr.set_color([found_idx], C_ACTIVE, run_time=0.4)
        self.play(Indicate(arr.cells[found_idx], color=CORAL, scale_factor=1.35, run_time=0.6))

        found_text = Text(
            f"index {found_idx}: {values[found_idx]} == {target_val}  →  FOUND!",
            font_size=26,
            color=CORAL,
            weight="BOLD",
        ).to_edge(DOWN, buff=0.35)
        if caption_mob:
            self.play(Transform(caption_mob, found_text, run_time=0.35))
        else:
            caption_mob = found_text
            self.play(FadeIn(caption_mob, run_time=0.35))

        arr.mark_sorted([found_idx])
        self.wait(2.0)
        self.play(FadeOut(ch4))
        self.wait(0.2)

        # ── Stage 5: Not Found Case ─────────────────────────────────────────
        ch5 = self.chapter_title("Not Found Case")

        miss_text = VGroup(
            Text("What if the target is NOT in the array?", font_size=28, color=INK),
            Text("We scan every element and return -1.", font_size=26, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        miss_text.next_to(arr.get_group(), DOWN, buff=1.2)
        if caption_mob:
            self.play(FadeOut(caption_mob), FadeIn(miss_text, run_time=0.5))
        else:
            self.play(FadeIn(miss_text, run_time=0.5))
        self.wait(0.5)

        miss_values = [3, 8, 1, 5, 7]
        miss_target = 99
        self.play(FadeOut(arr.get_group()), FadeOut(target_label))

        miss_arr = ArrayVis(self, miss_values, center=ORIGIN + UP * 0.5)
        miss_target_lbl = Text(f"Target: {miss_target}", font_size=32, color=CORAL, weight="BOLD")
        miss_target_lbl.next_to(miss_arr.get_group(), DOWN, buff=0.9)
        self.play(FadeIn(miss_target_lbl, run_time=0.4))
        self.wait(0.5)

        for i in range(len(miss_values)):
            miss_arr.set_color([i], C_ACTIVE, run_time=0.3)
            self.wait(0.4)
            miss_arr.set_color([i], MIST, run_time=0.2)

        not_found_text = Text("Exhausted array — return -1", font_size=26, color=CORAL, weight="BOLD")
        not_found_text.to_edge(DOWN, buff=0.35)
        self.play(FadeOut(miss_text), FadeIn(not_found_text, run_time=0.4))
        self.wait(1.5)
        self.play(FadeOut(ch5), FadeOut(not_found_text), FadeOut(miss_target_lbl))
        self.wait(0.2)

        # ── Stage 6: Algorithm Walkthrough Summary ──────────────────────────
        ch6 = self.chapter_title("Algorithm Summary")

        steps = VGroup(
            Text("1. Start at index 0", font_size=26, color=INK),
            Text("2. Compare arr[i] with target", font_size=26, color=INK),
            Text("3. If equal → return index i", font_size=26, color=COBALT),
            Text("4. If not equal → advance i by 1", font_size=26, color=INK),
            Text("5. If i == n → return -1 (not found)", font_size=26, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        steps.move_to(ORIGIN + DOWN * 0.2)

        self.play(FadeOut(miss_arr.get_group()))
        for step in steps:
            self.play(FadeIn(step, shift=RIGHT * 0.2, run_time=0.4))
            self.wait(0.5)
        self.wait(1.5)
        self.play(FadeOut(steps), FadeOut(ch6))
        self.wait(0.2)

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        complexity_note = VGroup(
            Text("Best case: target is the first element.", font_size=24, color=COBALT),
            Text("Worst case: target is last or absent.", font_size=24, color=CORAL),
            Text("Space: O(1) — no extra memory needed.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        complexity_note.move_to(ORIGIN + DOWN * 1.5)
        self.play(FadeIn(complexity_note, run_time=0.6))
        self.wait(1.0)

        card = self.complexity_card(
            time_best=r"O(1)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(1)",
            position=ORIGIN + UP * 0.8,
        )
        self.wait(2.5)
        self.play(FadeOut(card), FadeOut(complexity_note), FadeOut(ch7))
        self.wait(0.3)
