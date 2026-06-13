from manim import *
from ...base import AlgoScene, ArrayVis


class MinWindowSubstring(AlgoScene):
    TITLE = "Minimum Window Substring"
    SUBTITLE = "Finds the smallest substring of s that contains all characters of t using an exp"
    CATEGORY = "two-pointers"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        s_label = Text("s = ", font_size=32, color=WHITE).shift(LEFT * 4 + UP * 1.5)
        s_str = "ADOBECODEBANC"
        t_str = "ABC"

        s_chars = VGroup(*[
            Square(side_length=0.55, color=BLUE_D, fill_opacity=0.25)
            .add(Text(c, font_size=22, color=WHITE))
            for c in s_str
        ]).arrange(RIGHT, buff=0.08).next_to(s_label, RIGHT)

        t_label = Text("t = ", font_size=32, color=WHITE).next_to(s_label, DOWN * 3)
        t_chars = VGroup(*[
            Square(side_length=0.55, color=YELLOW_D, fill_opacity=0.35)
            .add(Text(c, font_size=22, color=WHITE))
            for c in t_str
        ]).arrange(RIGHT, buff=0.08).next_to(t_label, RIGHT)

        goal = Text(
            "Find smallest window in s containing all chars of t",
            font_size=24, color=GRAY_A
        ).shift(DOWN * 2.5)

        self.play(Write(s_label), LaggedStart(*[FadeIn(sq, shift=UP * 0.2) for sq in s_chars], lag_ratio=0.05))
        self.play(Write(t_label), LaggedStart(*[FadeIn(sq, shift=UP * 0.2) for sq in t_chars], lag_ratio=0.1))
        self.play(FadeIn(goal, shift=UP * 0.2))
        self.wait(1.5)
        self.play(FadeOut(goal))

        # ── Stage 2: Frequency Map ────────────────────────────────────────
        self.chapter_title("Build Frequency Map for t")

        freq_title = Text("need = {A:1, B:1, C:1}", font_size=28, color=YELLOW).shift(DOWN * 2.2)
        window_title = Text("window = {}", font_size=28, color=GREEN).next_to(freq_title, DOWN * 1.4)
        have_need = Text("have=0  need=3", font_size=26, color=ORANGE).next_to(window_title, DOWN * 1.4)

        self.play(Write(freq_title))
        self.play(Write(window_title))
        self.play(Write(have_need))
        self.wait(1.2)

        # ── Stage 3: Expand window (left=0, right moves) ──────────────────
        self.chapter_title("Expand Right Pointer")

        left_arrow = Arrow(DOWN * 0.5, UP * 0.1, color=GREEN, buff=0).scale(0.6)
        right_arrow = Arrow(DOWN * 0.5, UP * 0.1, color=RED, buff=0).scale(0.6)

        def arrow_under(group, idx, color):
            arr = Arrow(DOWN * 0.4, UP * 0.05, color=color, buff=0, stroke_width=3).scale(0.55)
            arr.next_to(group[idx], DOWN, buff=0.05)
            return arr

        l_ptr = arrow_under(s_chars, 0, GREEN)
        r_ptr = arrow_under(s_chars, 0, RED)
        l_lbl = Text("L", font_size=18, color=GREEN).next_to(l_ptr, DOWN, buff=0.05)
        r_lbl = Text("R", font_size=18, color=RED).next_to(r_ptr, DOWN, buff=0.05)

        self.play(FadeIn(l_ptr), FadeIn(l_lbl), FadeIn(r_ptr), FadeIn(r_lbl))
        self.wait(0.5)

        # Simulate expanding until we have A, B, C (indices 0..5 = ADOBEC)
        expand_steps = [
            (1, "window={A:1}", "have=1  need=3"),
            (2, "window={A:1,D:1}", "have=1  need=3"),
            (3, "window={A:1,D:1,O:1}", "have=1  need=3"),
            (4, "window={A:1,D:1,O:1,B:1}", "have=2  need=3"),
            (5, "window={A:1,D:1,O:1,B:1,E:1}", "have=2  need=3"),
            (6, "window={A:1,D:1,O:1,B:1,E:1,C:1}", "have=3  need=3"),
        ]

        for idx, win_txt, hn_txt in expand_steps:
            new_r = arrow_under(s_chars, idx, RED)
            new_r_lbl = Text("R", font_size=18, color=RED).next_to(new_r, DOWN, buff=0.05)
            new_win = Text(win_txt, font_size=22, color=GREEN).move_to(window_title.get_center())
            new_hn = Text(hn_txt, font_size=22, color=ORANGE).move_to(have_need.get_center())

            self.play(
                s_chars[idx].animate.set_fill(GREEN, opacity=0.4),
                Transform(r_ptr, new_r),
                Transform(r_lbl, new_r_lbl),
                Transform(window_title, new_win),
                Transform(have_need, new_hn),
                run_time=0.55
            )
        self.wait(1.2)

        # ── Stage 4: Record best window, shrink left ──────────────────────
        self.chapter_title("Valid Window Found — Record & Shrink Left")

        best_box = SurroundingRectangle(
            VGroup(*s_chars[0:7]), color=GOLD, buff=0.06, stroke_width=3
        )
        best_label = Text("best = 'ADOBEC' (len=6)", font_size=24, color=GOLD).shift(DOWN * 2.2)
        self.play(Create(best_box), Write(best_label))
        self.wait(0.8)

        # Shrink: move L from 0 to 1 (remove 'A')
        new_l = arrow_under(s_chars, 1, GREEN)
        new_l_lbl = Text("L", font_size=18, color=GREEN).next_to(new_l, DOWN, buff=0.05)
        shrink_note = Text("Remove s[L]='A' → have drops → stop shrinking", font_size=20, color=GRAY_A).shift(DOWN * 3.1)
        self.play(
            s_chars[0].animate.set_fill(BLUE_D, opacity=0.15),
            Transform(l_ptr, new_l),
            Transform(l_lbl, new_l_lbl),
            FadeIn(shrink_note)
        )
        self.wait(1.2)
        self.play(FadeOut(shrink_note))

        # ── Stage 5: Continue expanding to find smaller window ────────────
        self.chapter_title("Continue — Find Smaller Window 'BANC'")

        # Fast-forward expand to index 12 (BANC at indices 9-12)
        for idx in range(7, 13):
            new_r2 = arrow_under(s_chars, idx, RED)
            new_r2_lbl = Text("R", font_size=18, color=RED).next_to(new_r2, DOWN, buff=0.05)
            self.play(
                s_chars[idx].animate.set_fill(GREEN, opacity=0.3),
                Transform(r_ptr, new_r2),
                Transform(r_lbl, new_r2_lbl),
                run_time=0.3
            )

        # Shrink left from 1 to 9
        for li in range(2, 10):
            new_l2 = arrow_under(s_chars, li, GREEN)
            new_l2_lbl = Text("L", font_size=18, color=GREEN).next_to(new_l2, DOWN, buff=0.05)
            self.play(
                s_chars[li - 1].animate.set_fill(BLUE_D, opacity=0.1),
                Transform(l_ptr, new_l2),
                Transform(l_lbl, new_l2_lbl),
                run_time=0.25
            )

        best_box2 = SurroundingRectangle(VGroup(*s_chars[9:13]), color=GOLD, buff=0.06, stroke_width=3)
        best_label2 = Text("best = 'BANC' (len=4)  ← new minimum!", font_size=24, color=GOLD).shift(DOWN * 2.2)
        self.play(
            FadeOut(best_box), FadeOut(best_label),
            Create(best_box2), Write(best_label2)
        )
        self.wait(1.5)

        # ── Stage 6: Final answer + cleanup ───────────────────────────────
        self.chapter_title("Result")

        self.play(
            FadeOut(VGroup(s_label, s_chars, t_label, t_chars,
                           freq_title, window_title, have_need,
                           l_ptr, l_lbl, r_ptr, r_lbl,
                           best_box2))
        )

        answer = VGroup(
            Text("Input:  s = 'ADOBECODEBANC',  t = 'ABC'", font_size=28, color=GRAY_A),
            Text("Output: 'BANC'", font_size=36, color=GOLD),
            Text("Minimum window containing A, B, and C", font_size=24, color=GRAY_B),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(LaggedStart(*[Write(line) for line in answer], lag_ratio=0.35))
        self.wait(1.5)

        self.play(FadeOut(answer), FadeOut(best_label2))

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(|s| + |t|)",
            space_complexity="O(|s| + |t|)",
        )
        self.wait(2)
