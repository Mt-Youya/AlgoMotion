from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    C_ACTIVE, C_DEFAULT, C_SORTED, C_PIVOT,
    COBALT, CORAL, SIGNAL, GRAY, INK, MIST,
)


class FisherYatesShuffle(AlgoScene):
    TITLE = "Fisher-Yates Shuffle"
    SUBTITLE = "Uniformly random in-place array shuffle in O(n) time."
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: The Problem ────────────────────────────────────────────
        ch1 = self.chapter_title("The Problem")

        problem = VGroup(
            Text("Given an array of n elements,", font_size=34, color=INK),
            Text("produce a uniformly random permutation.", font_size=34, color=INK),
            Text("Every permutation must be equally likely.", font_size=30, color=COBALT),
        ).arrange(DOWN, buff=0.45).move_to(ORIGIN)

        self.play(FadeIn(problem[0]))
        self.wait(0.8)
        self.play(FadeIn(problem[1]))
        self.wait(0.8)
        self.play(FadeIn(problem[2]))
        self.wait(2)
        self.play(FadeOut(problem), FadeOut(ch1))

        # ── Stage 2: Naive Approach vs Fisher-Yates ─────────────────────────
        ch2 = self.chapter_title("Naive vs Optimal")

        naive_title = Text("Naive: Pick & Remove", font_size=28, color=CORAL).move_to(LEFT * 3.5 + UP * 2)
        fy_title = Text("Fisher-Yates: In-Place", font_size=28, color=COBALT).move_to(RIGHT * 3.0 + UP * 2)

        naive_steps = VGroup(
            Text("1. Pick random element", font_size=22, color=INK),
            Text("2. Remove it from array", font_size=22, color=INK),
            Text("3. Append to result", font_size=22, color=INK),
            Text("⚠ O(n²) time, O(n) extra space", font_size=22, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(naive_title, DOWN, buff=0.4)

        fy_steps = VGroup(
            Text("1. Walk from end to start", font_size=22, color=INK),
            Text("2. Swap with random earlier cell", font_size=22, color=INK),
            Text("3. Shrink unseen region", font_size=22, color=INK),
            Text("✓ O(n) time, O(1) extra space", font_size=22, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(fy_title, DOWN, buff=0.4)

        divider = DashedLine(UP * 2.8, DOWN * 2.8, color=GRAY)

        self.play(Write(naive_title), Write(fy_title))
        self.play(Create(divider))
        self.play(LaggedStart(*[FadeIn(s) for s in naive_steps], lag_ratio=0.35))
        self.wait(0.5)
        self.play(LaggedStart(*[FadeIn(s) for s in fy_steps], lag_ratio=0.35))
        self.wait(2.5)
        self.play(FadeOut(VGroup(naive_title, fy_title, divider, naive_steps, fy_steps)), FadeOut(ch2))

        # ── Stage 3: Algorithm Pseudocode ───────────────────────────────────
        ch3 = self.chapter_title("The Algorithm")

        pseudo = VGroup(
            Text("for i from n-1 down to 1:", font_size=30, color=INK),
            Text("    j = random integer in [0, i]", font_size=30, color=COBALT),
            Text("    swap(arr[i], arr[j])", font_size=30, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to(UP * 0.5)

        box = SurroundingRectangle(pseudo, color=COBALT, buff=0.3, corner_radius=0.1)
        note = Text(
            "At each step: randomly place one element into its final position",
            font_size=24, color=GRAY
        ).next_to(pseudo, DOWN, buff=0.55)

        self.play(Write(pseudo[0]))
        self.wait(0.6)
        self.play(Write(pseudo[1]))
        self.wait(0.6)
        self.play(Write(pseudo[2]))
        self.wait(0.5)
        self.play(Create(box))
        self.play(FadeIn(note))
        self.wait(2.5)
        self.play(FadeOut(VGroup(pseudo, box, note)), FadeOut(ch3))

        # ── Stage 4: Step-by-Step Animated Trace ────────────────────────────
        ch4 = self.chapter_title("Step-by-Step Trace")

        arr_label = Text("Initial array:", font_size=28, color=GRAY).move_to(UP * 2.8)
        self.play(FadeIn(arr_label))

        # Build array visualization
        arr = ArrayVis(self, [1, 2, 3, 4, 5], center=UP * 1.5)

        # We'll do a deterministic shuffle trace for demonstration
        # Simulated random choices: i=4 j=2, i=3 j=1, i=2 j=0, i=1 j=0
        shuffle_steps = [
            (4, 2, "i=4, j=2 (random)"),
            (3, 1, "i=3, j=1 (random)"),
            (2, 0, "i=2, j=0 (random)"),
            (1, 0, "i=1, j=0 (random)"),
        ]

        step_caption = Text("", font_size=26, color=COBALT).move_to(DOWN * 0.5)
        self.add(step_caption)

        boundary_line = DashedLine(
            start=UP * 2.2,
            end=DOWN * 0.2,
            color=CORAL,
            stroke_width=2,
        )

        for step_idx, (i, j, label_str) in enumerate(shuffle_steps):
            # Show current step label
            new_caption = Text(label_str, font_size=26, color=COBALT).move_to(DOWN * 0.5)
            self.play(Transform(step_caption, new_caption))

            # Highlight the boundary (unseen region ends at i)
            boundary_x = arr.cells[i].get_center()[0] + arr.cell_size * 0.5
            new_line = DashedLine(
                start=RIGHT * boundary_x + UP * 2.2,
                end=RIGHT * boundary_x + DOWN * 0.2,
                color=CORAL,
                stroke_width=2,
            )
            if step_idx == 0:
                self.play(Create(new_line))
                boundary_line = new_line
            else:
                self.play(Transform(boundary_line, new_line))

            # Highlight i and j cells
            arr.set_color([i], CORAL, run_time=0.4)
            arr.set_color([j], SIGNAL, run_time=0.4)
            self.wait(0.6)

            # Perform swap
            arr.swap(i, j)
            self.wait(0.4)

            # Mark position i as settled
            arr.mark_sorted([i])
            self.wait(0.5)

        # Mark remaining element as settled
        arr.mark_sorted([0])

        final_label = Text("Shuffle complete! All positions filled uniformly.", font_size=26, color=COBALT)
        final_label.move_to(DOWN * 1.5)
        self.play(Transform(step_caption, final_label))
        self.wait(2)

        self.play(
            FadeOut(arr.get_group()),
            FadeOut(arr_label),
            FadeOut(step_caption),
            FadeOut(boundary_line),
            FadeOut(ch4),
        )

        # ── Stage 5: Uniformity Proof Sketch ────────────────────────────────
        ch5 = self.chapter_title("Why It's Uniform")

        proof_lines = VGroup(
            Text("Claim: every permutation appears with probability 1/n!", font_size=28, color=INK),
            Text("", font_size=10),
            Text("Proof by induction:", font_size=26, color=COBALT),
            Text("• Last element: chosen uniformly from all n positions  →  prob 1/n", font_size=24, color=INK),
            Text("• Second-to-last: chosen uniformly from remaining n-1  →  prob 1/(n-1)", font_size=24, color=INK),
            Text("• Continue...  product = 1/n · 1/(n-1) · ... · 1/1 = 1/n!", font_size=24, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to(ORIGIN)

        prob_eq = MathTex(
            r"P(\text{any permutation}) = \frac{1}{n} \cdot \frac{1}{n-1} \cdots \frac{1}{1} = \frac{1}{n!}",
            font_size=34, color=COBALT
        ).next_to(proof_lines, DOWN, buff=0.5)

        self.play(FadeIn(proof_lines[0]))
        self.wait(0.8)
        for line in proof_lines[2:]:
            self.play(FadeIn(line, run_time=0.5))
            self.wait(0.5)
        self.play(Write(prob_eq))
        self.wait(2.5)
        self.play(FadeOut(VGroup(proof_lines, prob_eq)), FadeOut(ch5))

        # ── Stage 6: Common Pitfalls ─────────────────────────────────────────
        ch6 = self.chapter_title("Common Pitfalls")

        wrong_title = Text("WRONG: Naive random swap", font_size=30, color=CORAL).move_to(UP * 2)
        wrong_code = VGroup(
            Text("for i in range(n):", font_size=26, color=INK),
            Text("    j = random(0, n-1)   # full range!", font_size=26, color=CORAL),
            Text("    swap(arr[i], arr[j])", font_size=26, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).next_to(wrong_title, DOWN, buff=0.4)

        wrong_note = Text(
            "Generates n^n outcomes, not n! → biased distribution!",
            font_size=24, color=CORAL
        ).next_to(wrong_code, DOWN, buff=0.4)

        cross = Cross(wrong_code, color=CORAL, stroke_width=4)

        self.play(FadeIn(wrong_title))
        self.play(FadeIn(wrong_code))
        self.play(FadeIn(wrong_note))
        self.wait(1)
        self.play(Create(cross))
        self.wait(1.5)

        fix_note = Text(
            "Fix: always pick j in [0, i], not [0, n-1]",
            font_size=26, color=COBALT
        ).next_to(wrong_note, DOWN, buff=0.5)
        self.play(FadeIn(fix_note))
        self.wait(2)
        self.play(FadeOut(VGroup(wrong_title, wrong_code, wrong_note, cross, fix_note)), FadeOut(ch6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        ch7 = self.chapter_title("Complexity")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(1)",
        )
        self.wait(2.5)
        self.play(FadeOut(ch7))
