from manim import *
from ...base import AlgoScene, ArrayVis


class JumpSearch(AlgoScene):
    TITLE = "Jump Search"
    SUBTITLE = "Jumps ahead by fixed steps of √n to find the block containing the target, then s"
    CATEGORY = "search"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")

        intro_text = VGroup(
            Text("Jump Search", font_size=48, color=YELLOW),
            Text("A search algorithm for sorted arrays", font_size=28, color=WHITE),
            Text("Uses √n block jumps + linear scan", font_size=24, color=BLUE_B),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_text[0], shift=UP))
        self.play(FadeIn(intro_text[1]), FadeIn(intro_text[2]))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Array Setup ────────────────────────────────────────
        self.chapter_title("Array Setup")

        arr_values = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]
        target = 17
        n = len(arr_values)
        import math
        step = int(math.sqrt(n))  # step = 3

        array_vis = ArrayVis(arr_values, label="Sorted Array")
        array_vis.move_to(UP * 1.5)
        self.play(Create(array_vis))
        self.wait(0.5)

        target_label = VGroup(
            Text("Target:", font_size=28, color=WHITE),
            Text(str(target), font_size=36, color=YELLOW),
        ).arrange(RIGHT, buff=0.3).move_to(DOWN * 0.5)
        self.play(FadeIn(target_label))

        step_label = VGroup(
            Text("Step size (√n):", font_size=24, color=WHITE),
            Text(f"√{n} ≈ {step}", font_size=28, color=GREEN),
        ).arrange(RIGHT, buff=0.3).move_to(DOWN * 1.2)
        self.play(FadeIn(step_label))
        self.wait(1.5)
        self.play(FadeOut(target_label), FadeOut(step_label))

        # ── Stage 3: Block Jumping Phase ────────────────────────────────
        self.chapter_title("Block Jumping Phase")

        jump_info = Text(
            "Jump by √n steps until arr[jump] ≥ target",
            font_size=24, color=BLUE_B
        ).move_to(DOWN * 0.2)
        self.play(FadeIn(jump_info))
        self.wait(0.5)

        prev = 0
        jump = step
        jump_round = 1

        while jump < n and arr_values[jump] < target:
            # Highlight the jump index
            array_vis.highlight_range(prev, jump, color=BLUE_D)
            jump_marker = Text(
                f"Jump {jump_round}: index {jump} → value {arr_values[jump]} < {target}",
                font_size=22, color=ORANGE
            ).move_to(DOWN * 1.0)
            self.play(
                array_vis.animate_highlight(jump, color=ORANGE),
                FadeIn(jump_marker)
            )
            self.wait(1)
            self.play(FadeOut(jump_marker))
            prev = jump
            jump = min(jump + step, n - 1)
            jump_round += 1

        # Highlight the block that contains the target
        block_label = Text(
            f"Block found: indices [{prev}, {jump}]  →  values [{arr_values[prev]}, {arr_values[min(jump, n-1)]}]",
            font_size=22, color=GREEN
        ).move_to(DOWN * 1.0)
        array_vis.highlight_range(prev, min(jump, n - 1), color=GREEN_D)
        self.play(FadeIn(block_label))
        self.wait(1.5)
        self.play(FadeOut(block_label), FadeOut(jump_info))

        # ── Stage 4: Linear Scan Phase ──────────────────────────────────
        self.chapter_title("Linear Scan Phase")

        scan_info = Text(
            "Scan linearly within the identified block",
            font_size=24, color=YELLOW
        ).move_to(DOWN * 0.2)
        self.play(FadeIn(scan_info))
        self.wait(0.5)

        found_idx = -1
        i = prev
        while i <= min(jump, n - 1):
            scan_marker = Text(
                f"Check index {i}: arr[{i}] = {arr_values[i]}",
                font_size=22, color=WHITE
            ).move_to(DOWN * 1.0)
            compare_color = YELLOW if arr_values[i] != target else GREEN
            self.play(
                array_vis.animate_highlight(i, color=compare_color),
                FadeIn(scan_marker)
            )
            self.wait(0.8)
            self.play(FadeOut(scan_marker))
            if arr_values[i] == target:
                found_idx = i
                break
            i += 1

        self.play(FadeOut(scan_info))

        # ── Stage 5: Result ─────────────────────────────────────────────
        self.chapter_title("Result")

        if found_idx != -1:
            result_text = VGroup(
                Text(f"✓ Found {target} at index {found_idx}!", font_size=32, color=GREEN),
                Text(f"Array value: arr[{found_idx}] = {arr_values[found_idx]}", font_size=24, color=WHITE),
            ).arrange(DOWN, buff=0.3).move_to(DOWN * 0.8)
            array_vis.animate_highlight(found_idx, color=GREEN)
        else:
            result_text = VGroup(
                Text(f"✗ Target {target} not found", font_size=32, color=RED),
            ).move_to(DOWN * 0.8)

        self.play(FadeIn(result_text))
        self.wait(2)
        self.play(FadeOut(result_text), FadeOut(array_vis))

        # ── Stage 6: Algorithm Trace Summary ────────────────────────────
        self.chapter_title("Algorithm Trace")

        trace_title = Text("Jump Search — Step Trace", font_size=32, color=YELLOW).move_to(UP * 2.5)
        self.play(FadeIn(trace_title))

        steps_text = VGroup(
            Text("1. Compute step = √n = √13 ≈ 3", font_size=22, color=WHITE),
            Text("2. Jump: index 3  → arr[3]=7  < 17  (continue)", font_size=22, color=BLUE_B),
            Text("3. Jump: index 6  → arr[6]=13 < 17  (continue)", font_size=22, color=BLUE_B),
            Text("4. Jump: index 9  → arr[9]=19 ≥ 17  (stop jumping)", font_size=22, color=ORANGE),
            Text("5. Linear scan from index 6 to 9", font_size=22, color=WHITE),
            Text("6. arr[8] = 17 == target → FOUND at index 8", font_size=22, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        for step_text in steps_text:
            self.play(FadeIn(step_text, shift=RIGHT * 0.3))
            self.wait(0.6)

        self.wait(1.5)
        self.play(FadeOut(trace_title), FadeOut(steps_text))

        # ── Stage 7: Complexity Card ────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(√n)",
            time_worst="O(√n)",
            space="O(1)",
        )
