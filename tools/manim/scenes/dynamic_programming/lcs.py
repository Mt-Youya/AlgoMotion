from manim import *
from ...base import AlgoScene, DPTable


class Lcs(AlgoScene):
    TITLE = "Longest Common Subsequence"
    SUBTITLE = "Find the length of the longest common subsequence between two sequences."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        seq_a = "ABCBDAB"
        seq_b = "BDCAB"

        label_a = Text("Sequence A:", font_size=28, color=WHITE).shift(UP * 1.8 + LEFT * 3)
        label_b = Text("Sequence B:", font_size=28, color=WHITE).shift(UP * 0.6 + LEFT * 3)

        boxes_a = VGroup()
        for i, ch in enumerate(seq_a):
            box = Square(side_length=0.65, color=BLUE_D, fill_opacity=0.3)
            box.shift(UP * 1.8 + LEFT * 0.5 + RIGHT * i * 0.75)
            lbl = Text(ch, font_size=24, color=WHITE).move_to(box.get_center())
            boxes_a.add(VGroup(box, lbl))

        boxes_b = VGroup()
        for i, ch in enumerate(seq_b):
            box = Square(side_length=0.65, color=TEAL_D, fill_opacity=0.3)
            box.shift(UP * 0.6 + LEFT * 0.5 + RIGHT * i * 0.75)
            lbl = Text(ch, font_size=24, color=WHITE).move_to(box.get_center())
            boxes_b.add(VGroup(box, lbl))

        intro_note = Text(
            "Find the longest subsequence common to both sequences.",
            font_size=22,
            color=GRAY,
        ).shift(DOWN * 1.2)

        self.play(Write(label_a), Write(label_b))
        self.play(
            LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes_a], lag_ratio=0.1),
            LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes_b], lag_ratio=0.1),
        )
        self.play(FadeIn(intro_note))
        self.wait(1.5)
        self.play(FadeOut(intro_note), FadeOut(ch1))

        # ── Stage 2: What is a Subsequence? ─────────────────────────────────
        ch2 = self.chapter_title("What is a Subsequence?")

        subseq_note = VGroup(
            Text("A subsequence preserves order but need not be contiguous.", font_size=22, color=WHITE),
            Text("Example: 'BCAB' is a subsequence of 'ABCBDAB'", font_size=22, color=YELLOW),
            Text("LCS of 'ABCBDAB' and 'BDCAB' → 'BCAB' (length 4)", font_size=22, color=GREEN_C),
        ).arrange(DOWN, buff=0.3).shift(DOWN * 1.5)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in subseq_note], lag_ratio=0.3))
        self.wait(1.2)

        # Highlight the common characters in seq_a
        highlight_indices_a = [1, 2, 3, 5]  # B, C, B, B -> BCAB from ABCBDAB
        for idx in highlight_indices_a:
            self.play(
                boxes_a[idx][0].animate.set_fill(GREEN, opacity=0.6),
                run_time=0.3,
            )
        self.wait(0.8)

        highlight_indices_b = [0, 2, 3, 4]  # B, C, A, B from BDCAB
        for idx in highlight_indices_b:
            self.play(
                boxes_b[idx][0].animate.set_fill(GREEN, opacity=0.6),
                run_time=0.3,
            )
        self.wait(1.2)
        self.play(FadeOut(subseq_note), FadeOut(ch2))
        # Reset highlights
        for b in boxes_a:
            b[0].set_fill(BLUE_D, opacity=0.3)
        for b in boxes_b:
            b[0].set_fill(TEAL_D, opacity=0.3)

        # ── Stage 3: DP Recurrence ───────────────────────────────────────────
        ch3 = self.chapter_title("DP Recurrence")

        recurrence = VGroup(
            MathTex(
                r"\text{dp}[i][j] = \begin{cases} 0 & \text{if } i=0 \text{ or } j=0 \\"
                r"\text{dp}[i-1][j-1] + 1 & \text{if } A[i]=B[j] \\"
                r"\max(\text{dp}[i-1][j],\,\text{dp}[i][j-1]) & \text{otherwise} \end{cases}",
                font_size=26,
                color=WHITE,
            ),
        ).shift(DOWN * 0.5)

        explanation = VGroup(
            Text("Match: extend the diagonal dp[i-1][j-1] by 1", font_size=20, color=GREEN_C),
            Text("No match: take the best of left or top cell", font_size=20, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.5)

        self.play(Write(recurrence[0]))
        self.wait(0.8)
        self.play(FadeIn(explanation, shift=UP * 0.2))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(explanation), FadeOut(ch3))

        # ── Stage 4: Build 2-D DP Table ──────────────────────────────────────
        ch4 = self.chapter_title("Building DP Table")

        # Clear the sequence display
        self.play(
            FadeOut(label_a), FadeOut(label_b),
            FadeOut(boxes_a), FadeOut(boxes_b),
        )

        # Use shorter sequences for the table visualization
        a = "ABCB"
        b = "BCB"
        m, n = len(a), len(b)

        # Row labels: "" + chars of a; Col labels: "" + chars of b
        row_labels = [""] + list(a)
        col_labels = [""] + list(b)

        dp = [[0] * (n + 1) for _ in range(m + 1)]

        table_title = Text(
            f'A = "{a}"   B = "{b}"',
            font_size=26,
            color=YELLOW,
        ).to_edge(UP, buff=0.8)
        self.play(Write(table_title))

        dp_table = DPTable(
            self,
            rows=m + 1,
            cols=n + 1,
            row_labels=row_labels,
            col_labels=col_labels,
            cell_width=0.85,
            cell_height=0.75,
            center=[0, -0.5, 0],
        )

        self.wait(0.8)

        # ── Stage 5: Fill DP Table Step by Step ─────────────────────────────
        ch5 = self.chapter_title("Filling the Table")

        step_note = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if a[i - 1] == b[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                    note_str = f"A[{i-1}]=B[{j-1}]='{a[i-1]}': match → dp[{i}][{j}] = dp[{i-1}][{j-1}]+1 = {dp[i][j]}"
                    color = GREEN
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                    note_str = (
                        f"A[{i-1}]='{a[i-1]}' ≠ B[{j-1}]='{b[j-1]}': "
                        f"max({dp[i-1][j]},{dp[i][j-1]}) = {dp[i][j]}"
                    )
                    color = BLUE

                new_note = Text(note_str, font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
                self.play(Transform(step_note, new_note), run_time=0.3)
                dp_table.set_value(i, j, dp[i][j], color=color, run_time=0.4)
                self.wait(0.25)

        self.wait(0.8)
        self.play(FadeOut(step_note), FadeOut(ch5))

        # ── Stage 6: Highlight Answer and Traceback ──────────────────────────
        ch6 = self.chapter_title("Traceback & Result")

        answer_val = dp[m][n]
        dp_table.indicate(m, n)

        answer_text = Text(
            f"LCS length = {answer_val}",
            font_size=32,
            color=GREEN_C,
            weight="BOLD",
        ).to_edge(DOWN, buff=1.0)
        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(0.8)

        # Traceback path highlight
        traceback_note = Text(
            "Traceback: follow diagonal when match, else go left/up",
            font_size=20,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(traceback_note))

        # Compute traceback path
        path = []
        i, j = m, n
        while i > 0 and j > 0:
            if a[i - 1] == b[j - 1]:
                path.append((i, j))
                i -= 1
                j -= 1
            elif dp[i - 1][j] > dp[i][j - 1]:
                i -= 1
            else:
                j -= 1

        for (pi, pj) in path:
            dp_table.highlight(pi, pj, color=YELLOW, run_time=0.35)

        self.wait(1.0)

        lcs_chars = []
        i2, j2 = m, n
        while i2 > 0 and j2 > 0:
            if a[i2 - 1] == b[j2 - 1]:
                lcs_chars.append(a[i2 - 1])
                i2 -= 1
                j2 -= 1
            elif dp[i2 - 1][j2] > dp[i2][j2 - 1]:
                i2 -= 1
            else:
                j2 -= 1
        lcs_str = "".join(reversed(lcs_chars))

        lcs_label = Text(
            f'LCS = "{lcs_str}"',
            font_size=28,
            color=GREEN_B,
        ).next_to(answer_text, UP, buff=0.3)
        self.play(FadeIn(lcs_label))
        self.wait(1.5)

        self.play(
            FadeOut(answer_text),
            FadeOut(traceback_note),
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
