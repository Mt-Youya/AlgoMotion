from manim import *
from ...base import AlgoScene, ArrayVis


class ZAlgorithm(AlgoScene):
    TITLE = "Z-Algorithm"
    SUBTITLE = "Constructs the Z-array enabling O(n) pattern search."
    CATEGORY = "string"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is the Z-Array?")

        intro_text = VGroup(
            Text("Given string S of length n,", font_size=28),
            Text("Z[i] = length of the longest substring", font_size=28),
            Text("starting at S[i] that is also a prefix of S.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Example String Setup ───────────────────────────────
        self.chapter_title("Example: S = \"aabxaab\"")

        s = list("aabxaab")
        n = len(s)

        str_label = Text("S =", font_size=32).shift(LEFT * 4 + UP * 1.5)
        char_boxes = VGroup()
        char_texts = VGroup()
        index_texts = VGroup()

        for i, ch in enumerate(s):
            box = Square(side_length=0.7, color=BLUE_B, fill_opacity=0.15)
            box.move_to(RIGHT * (i * 0.85 - 2.5) + UP * 1.5)
            char = Text(ch, font_size=28, color=WHITE).move_to(box.get_center())
            idx = Text(str(i), font_size=20, color=GRAY).next_to(box, DOWN, buff=0.1)
            char_boxes.add(box)
            char_texts.add(char)
            index_texts.add(idx)

        self.play(Write(str_label))
        self.play(
            LaggedStart(*[FadeIn(VGroup(b, c, d)) for b, c, d in zip(char_boxes, char_texts, index_texts)],
                        lag_ratio=0.1)
        )
        self.wait(1)

        # Z-array display row
        z_label = Text("Z =", font_size=32).shift(LEFT * 4 + DOWN * 0.5)
        z_boxes = VGroup()
        z_texts = VGroup()

        z_values = [0, 0, 0, 0, 3, 1, 0]  # correct Z-array for "aabxaab"

        for i in range(n):
            box = Square(side_length=0.7, color=GREEN_B, fill_opacity=0.1)
            box.move_to(RIGHT * (i * 0.85 - 2.5) + DOWN * 0.5)
            val = Text("?", font_size=28, color=YELLOW).move_to(box.get_center())
            z_boxes.add(box)
            z_texts.add(val)

        self.play(Write(z_label))
        self.play(LaggedStart(*[FadeIn(VGroup(b, v)) for b, v in zip(z_boxes, z_texts)], lag_ratio=0.1))
        self.wait(1)

        # ── Stage 3: Z[0] is special ────────────────────────────────────
        self.chapter_title("Z[0]: By Convention = n (or 0)")

        note = Text("Z[0] is undefined / set to n by convention.", font_size=26, color=YELLOW_C)
        note.shift(DOWN * 1.8)
        self.play(
            char_boxes[0].animate.set_fill(YELLOW, opacity=0.4),
            Write(note),
        )
        self.wait(1.5)

        new_z0 = Text("n", font_size=28, color=GREEN).move_to(z_texts[0].get_center())
        self.play(Transform(z_texts[0], new_z0))
        self.wait(1)
        self.play(FadeOut(note), char_boxes[0].animate.set_fill(BLUE_B, opacity=0.15))

        # ── Stage 4: Core Algorithm – Window [L, R] ──────────────────────
        self.chapter_title("The Z-Box Window [L, R]")

        window_desc = VGroup(
            Text("[L, R] = rightmost Z-box seen so far", font_size=26),
            Text("If i <= R: use previously computed info", font_size=26),
            Text("Else: expand naively from i", font_size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).shift(DOWN * 1.9)

        self.play(FadeIn(window_desc, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(window_desc))

        # ── Stage 5: Step-by-step fill Z[1..n-1] ────────────────────────
        self.chapter_title("Computing Z[1] through Z[6]")

        L, R = 0, 0
        lr_tracker = Text(f"L={L}  R={R}", font_size=26, color=ORANGE).shift(DOWN * 1.9)
        self.play(Write(lr_tracker))

        for i in range(1, n):
            # Highlight current index
            self.play(char_boxes[i].animate.set_fill(ORANGE, opacity=0.5), run_time=0.4)

            zi = z_values[i]

            # Show comparison arrows for naive expansion (simplified visual)
            if zi > 0:
                arrows = VGroup()
                for k in range(zi):
                    arr = Arrow(
                        char_boxes[k].get_bottom(),
                        char_boxes[i + k].get_bottom(),
                        buff=0.05, color=TEAL, stroke_width=2,
                        max_tip_length_to_length_ratio=0.15,
                    )
                    arrows.add(arr)
                self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15), run_time=0.6)
                self.wait(0.4)
                self.play(FadeOut(arrows), run_time=0.3)

            # Update Z cell
            new_val = Text(str(zi), font_size=28, color=GREEN_A).move_to(z_texts[i].get_center())
            self.play(Transform(z_texts[i], new_val), run_time=0.35)

            # Update L, R
            if zi > 0 and (i + zi - 1) > R:
                L, R = i, i + zi - 1
            new_lr = Text(f"L={L}  R={R}", font_size=26, color=ORANGE)
            new_lr.move_to(lr_tracker.get_center())
            self.play(Transform(lr_tracker, new_lr), run_time=0.3)

            self.play(char_boxes[i].animate.set_fill(GREEN_B, opacity=0.25), run_time=0.3)
            self.wait(0.2)

        self.wait(1)
        self.play(FadeOut(lr_tracker))

        # ── Stage 6: Pattern Matching Application ───────────────────────
        self.chapter_title("Applying Z-Array to Pattern Search")

        self.play(
            FadeOut(VGroup(str_label, char_boxes, char_texts, index_texts,
                           z_label, z_boxes, z_texts))
        )

        pattern_text = VGroup(
            Text("Pattern P = \"aa\"", font_size=30, color=BLUE_A),
            Text("Text T = \"aabxaab\"", font_size=30, color=GREEN_A),
            Text("Concatenate: S = P + '$' + T", font_size=30, color=YELLOW_A),
            Text("            S = \"aa$aabxaab\"", font_size=30, color=YELLOW_A),
            Text("Z[i] == len(P)  →  match at i - len(P) - 1", font_size=26, color=ORANGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(t, shift=RIGHT * 0.3) for t in pattern_text], lag_ratio=0.2))
        self.wait(2.5)
        self.play(FadeOut(pattern_text))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(n)",
        )
        self.wait(2)
