from manim import *
from ...base import AlgoScene, ArrayVis


class ExponentialSearch(AlgoScene):
    TITLE = "Exponential Search"
    SUBTITLE = "Finds the range where the target may exist by doubling the index, then applies b"
    CATEGORY = "search"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")

        intro_text = VGroup(
            Text("Exponential Search", font_size=40, color=YELLOW),
            Text("Works on sorted arrays", font_size=28, color=WHITE),
            Text("Step 1: Find range by doubling index", font_size=24, color=BLUE_B),
            Text("Step 2: Binary search within that range", font_size=24, color=BLUE_B),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_text[0]))
        self.wait(0.5)
        self.play(FadeIn(intro_text[1]))
        self.wait(0.5)
        self.play(FadeIn(intro_text[2]), FadeIn(intro_text[3]))
        self.wait(1.5)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Array Setup ─────────────────────────────────────────
        self.chapter_title("Array Setup")

        array_data = [1, 3, 5, 7, 9, 11, 14, 18, 22, 27]
        target = 14

        arr_vis = ArrayVis(array_data, label="Sorted Array")
        arr_vis.move_to(UP * 1.5)
        self.play(FadeIn(arr_vis))
        self.wait(0.5)

        target_label = VGroup(
            Text("Target:", font_size=28, color=WHITE),
            Text(str(target), font_size=36, color=YELLOW),
        ).arrange(RIGHT, buff=0.2).move_to(DOWN * 2.5)

        self.play(FadeIn(target_label))
        self.wait(1)

        # ── Stage 3: Exponential Phase ───────────────────────────────────
        self.chapter_title("Exponential Phase — Doubling Index")

        phase_label = Text(
            "Phase 1: Double the index until arr[i] >= target",
            font_size=22, color=BLUE_C
        ).move_to(DOWN * 1.5)
        self.play(FadeIn(phase_label))
        self.wait(0.5)

        steps = [
            (1, "i=1, arr[1]=3 < 14"),
            (2, "i=2, arr[2]=5 < 14"),
            (4, "i=4, arr[4]=9 < 14"),
            (8, "i=8, arr[8]=22 >= 14  → stop!"),
        ]

        step_texts = VGroup()
        for idx, (i, desc) in enumerate(steps):
            color = GREEN if ">=" in desc else ORANGE
            t = Text(desc, font_size=20, color=color).move_to(
                DOWN * 0.2 + RIGHT * (idx - 1.5) * 3.2
            )
            step_texts.add(t)

        for idx, (i, desc) in enumerate(steps):
            arr_vis.highlight_cell(i, color=ORANGE if ">=" not in desc else RED)
            self.play(FadeIn(step_texts[idx]), run_time=0.6)
            self.wait(0.5)

        self.wait(1)
        self.play(FadeOut(step_texts), FadeOut(phase_label))
        arr_vis.reset_colors()

        # ── Stage 4: Range Identification ───────────────────────────────
        self.chapter_title("Identify Binary Search Range")

        range_info = VGroup(
            Text("Range found:", font_size=26, color=WHITE),
            Text("low = i/2 = 4", font_size=24, color=BLUE_B),
            Text("high = min(i, n-1) = min(8, 9) = 8", font_size=24, color=BLUE_B),
            Text("Binary search in indices [4 .. 8]", font_size=24, color=YELLOW),
        ).arrange(DOWN, buff=0.3).move_to(DOWN * 1.2)

        self.play(FadeIn(range_info))
        self.wait(1)

        for cell_idx in range(4, 9):
            arr_vis.highlight_cell(cell_idx, color=BLUE_D)
        self.wait(1)

        self.play(FadeOut(range_info))

        # ── Stage 5: Binary Search Phase ────────────────────────────────
        self.chapter_title("Binary Search Phase")

        bs_label = Text(
            "Phase 2: Binary Search in [4..8]",
            font_size=24, color=GREEN
        ).move_to(DOWN * 1.2)
        self.play(FadeIn(bs_label))
        self.wait(0.5)

        bs_steps = [
            (6, "mid=6, arr[6]=14 == 14 → FOUND!"),
        ]

        # mid = (4+8)//2 = 6
        mid_idx = 6
        mid_text = Text(
            f"mid = (4+8)//2 = 6,  arr[6] = {array_data[mid_idx]}",
            font_size=22, color=WHITE
        ).move_to(DOWN * 1.9)

        self.play(FadeIn(mid_text))
        arr_vis.highlight_cell(mid_idx, color=GREEN)
        self.wait(0.8)

        found_text = Text(
            f"arr[6] = 14 == target 14  →  FOUND at index 6!",
            font_size=24, color=YELLOW
        ).move_to(DOWN * 2.6)
        self.play(FadeIn(found_text))
        self.wait(1.5)

        self.play(FadeOut(bs_label), FadeOut(mid_text), FadeOut(found_text))

        # ── Stage 6: Edge Case — First Element ──────────────────────────
        self.chapter_title("Edge Case: Target at Index 0")

        arr_vis.reset_colors()
        edge_text = VGroup(
            Text("Special case: check arr[0] == target first", font_size=24, color=ORANGE),
            Text("If arr[0] == target → return 0 immediately", font_size=22, color=WHITE),
            Text("No need to enter the doubling loop", font_size=22, color=GREY_A),
        ).arrange(DOWN, buff=0.3).move_to(DOWN * 1.5)

        arr_vis.highlight_cell(0, color=ORANGE)
        self.play(FadeIn(edge_text))
        self.wait(1.5)
        self.play(FadeOut(edge_text))
        arr_vis.reset_colors()

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.chapter_title("Time & Space Complexity")
        self.play(FadeOut(arr_vis), FadeOut(target_label))
        self.wait(0.3)

        self.complexity_card(
            time_best="O(1)",
            time_avg="O(log n)",
            time_worst="O(log n)",
            space="O(1)",
        )
        self.wait(2)
