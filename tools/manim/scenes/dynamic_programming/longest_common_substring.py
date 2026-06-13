"""Longest Common Substring — AlgoMotion Manim scene.

Visualises the DP approach to finding the longest *contiguous* substring
common to two sequences, contrasting it with the LCS (subsequence) problem.
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    AnimationGroup,
    FadeIn,
    FadeOut,
    Indicate,
    LaggedStart,
    MathTex,
    Square,
    Text,
    Transform,
    VGroup,
    Write,
)

from ...base import AlgoScene, DPTable
from ...base.algo_scene import (
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    SIGNAL,
)

# Convenience colour aliases
GREEN  = SIGNAL    # matched / done cells
BLUE   = COBALT    # active / current cell
YELLOW = "#F0A030" # traceback / highlight
RED    = CORAL     # mismatch


class LongestCommonSubstring(AlgoScene):
    """Animate the DP solution for Longest Common Substring."""

    TITLE    = "Longest Common Substring"
    SUBTITLE = "Find the longest contiguous substring common to two sequences."
    CATEGORY = "dynamic-programming"

    def build(self) -> None:
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        seq_a = "ABCABD"
        seq_b = "CABDAB"

        label_a = Text("String A:", font_size=28, color=INK).shift(UP * 1.8 + LEFT * 4)
        label_b = Text("String B:", font_size=28, color=INK).shift(UP * 0.6 + LEFT * 4)

        boxes_a = VGroup()
        for i, ch in enumerate(seq_a):
            box = Square(side_length=0.65, color=COBALT, fill_color=MIST, fill_opacity=0.8)
            box.shift(UP * 1.8 + LEFT * 1.5 + RIGHT * i * 0.78)
            lbl = Text(ch, font_size=24, color=INK).move_to(box.get_center())
            boxes_a.add(VGroup(box, lbl))

        boxes_b = VGroup()
        for i, ch in enumerate(seq_b):
            box = Square(side_length=0.65, color=COBALT, fill_color=MIST, fill_opacity=0.8)
            box.shift(UP * 0.6 + LEFT * 1.5 + RIGHT * i * 0.78)
            lbl = Text(ch, font_size=24, color=INK).move_to(box.get_center())
            boxes_b.add(VGroup(box, lbl))

        intro_note = Text(
            "Find the longest substring that appears in both strings (must be contiguous).",
            font_size=21,
            color=GRAY,
        ).shift(DOWN * 1.3)

        self.play(Write(label_a), Write(label_b))
        self.play(
            LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes_a], lag_ratio=0.1),
            LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes_b], lag_ratio=0.1),
        )
        self.play(FadeIn(intro_note))
        self.wait(1.5)
        self.play(FadeOut(intro_note), FadeOut(ch1))

        # ── Stage 2: Substring vs Subsequence ───────────────────────────────
        ch2 = self.chapter_title("Substring vs Subsequence")

        notes = VGroup(
            Text("Subsequence: order preserved, gaps allowed  (LCS problem)", font_size=21, color=GRAY),
            Text("Substring:   order preserved, NO gaps       (this problem)", font_size=21, color=INK),
            Text("Example: 'ABD' is a subsequence of A, but NOT a substring.", font_size=21, color=GRAY),
            Text("Example: 'CABD' is a common substring of A and B (length 4).", font_size=21, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 1.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in notes], lag_ratio=0.3))
        self.wait(1.2)

        # Highlight CABD in seq_a (indices 2,3,4,5 → C,A,B,D)
        for idx in [2, 3, 4, 5]:
            self.play(
                boxes_a[idx][0].animate.set_fill(color=SIGNAL, opacity=0.8),
                run_time=0.25,
            )
        # Highlight CABD in seq_b (indices 0,1,2,3 → C,A,B,D)
        for idx in [0, 1, 2, 3]:
            self.play(
                boxes_b[idx][0].animate.set_fill(color=SIGNAL, opacity=0.8),
                run_time=0.25,
            )
        self.wait(1.2)
        self.play(FadeOut(notes), FadeOut(ch2))
        # Reset highlight
        for b in boxes_a:
            b[0].set_fill(color=MIST, opacity=0.8)
        for b in boxes_b:
            b[0].set_fill(color=MIST, opacity=0.8)

        # ── Stage 3: DP Recurrence ───────────────────────────────────────────
        ch3 = self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[i][j] = \begin{cases}"
            r"0 & \text{if } i=0 \text{ or } j=0 \\"
            r"\text{dp}[i-1][j-1] + 1 & \text{if } A[i]=B[j] \\"
            r"0 & \text{otherwise}"
            r"\end{cases}",
            font_size=26,
            color=INK,
        ).shift(DOWN * 0.2)

        key_diff = VGroup(
            Text("Key difference from LCS:", font_size=22, color=COBALT, weight="BOLD"),
            Text("On mismatch we reset to 0 (no gap allowed).", font_size=22, color=GRAY),
            Text("Answer = max value anywhere in the table.", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.6)

        self.play(Write(recurrence))
        self.wait(0.8)
        self.play(FadeIn(key_diff, shift=UP * 0.15))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(key_diff), FadeOut(ch3))

        # ── Stage 4: Build 2-D DP Table ──────────────────────────────────────
        ch4 = self.chapter_title("Building the DP Table")

        self.play(
            FadeOut(label_a), FadeOut(label_b),
            FadeOut(boxes_a), FadeOut(boxes_b),
        )

        a = "ABCAB"
        b = "CABAB"
        m, n = len(a), len(b)

        row_labels = [""] + list(a)
        col_labels = [""] + list(b)

        dp = [[0] * (n + 1) for _ in range(m + 1)]

        table_title = Text(
            f'A = "{a}"   B = "{b}"',
            font_size=26,
            color=COBALT,
        ).to_edge(UP, buff=0.85)
        self.play(Write(table_title))

        dp_table = DPTable(
            self,
            rows=m + 1,
            cols=n + 1,
            row_labels=row_labels,
            col_labels=col_labels,
            cell_width=0.82,
            cell_height=0.72,
            center=[0, -0.6, 0],
        )
        self.wait(0.8)
        self.play(FadeOut(ch4))

        # ── Stage 5: Fill Table Step by Step ────────────────────────────────
        ch5 = self.chapter_title("Filling the Table")

        best_len = 0
        best_pos = (0, 0)
        step_note = Text("", font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if a[i - 1] == b[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                    note_str = (
                        f"A[{i-1}]=B[{j-1}]='{a[i-1]}': match → "
                        f"dp[{i}][{j}] = dp[{i-1}][{j-1}]+1 = {dp[i][j]}"
                    )
                    cell_color = SIGNAL
                    if dp[i][j] > best_len:
                        best_len = dp[i][j]
                        best_pos = (i, j)
                else:
                    dp[i][j] = 0
                    note_str = (
                        f"A[{i-1}]='{a[i-1]}' ≠ B[{j-1}]='{b[j-1]}': "
                        f"mismatch → dp[{i}][{j}] = 0"
                    )
                    cell_color = MIST

                new_note = Text(note_str, font_size=17, color=GRAY).to_edge(DOWN, buff=0.5)
                self.play(Transform(step_note, new_note), run_time=0.25)
                dp_table.set_value(i, j, dp[i][j], color=cell_color, run_time=0.35)
                self.wait(0.2)

        self.wait(0.8)
        self.play(FadeOut(step_note), FadeOut(ch5))

        # ── Stage 6: Highlight the Best Cell and Reconstruct ─────────────────
        ch6 = self.chapter_title("Result & Reconstruction")

        dp_table.indicate(*best_pos)

        answer_text = Text(
            f"Longest Common Substring length = {best_len}",
            font_size=28,
            color=COBALT,
            weight="BOLD",
        ).to_edge(DOWN, buff=1.2)
        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(0.6)

        # Reconstruct the substring by tracing back from best_pos
        bi, bj = best_pos
        lcs_sub = a[bi - best_len: bi]

        # Highlight the diagonal path leading to best_pos
        for k in range(best_len):
            r = bi - (best_len - 1 - k)
            c = bj - (best_len - 1 - k)
            dp_table.highlight(r, c, color=YELLOW, run_time=0.3)

        self.wait(0.6)

        lcs_label = Text(
            f'Common substring = "{lcs_sub}"',
            font_size=28,
            color=SIGNAL,
        ).next_to(answer_text, UP, buff=0.3)
        self.play(FadeIn(lcs_label))
        self.wait(1.5)

        self.play(
            FadeOut(answer_text),
            FadeOut(lcs_label),
            FadeOut(table_title),
            FadeOut(ch6),
        )

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        self.complexity_card(
            time_best=r"O(m \cdot n)",
            time_avg=r"O(m \cdot n)",
            time_worst=r"O(m \cdot n)",
            space=r"O(m \cdot n)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch7))
