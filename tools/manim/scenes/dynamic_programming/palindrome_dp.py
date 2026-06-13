from manim import *
from ...base import AlgoScene, DPTable


class PalindromeDp(AlgoScene):
    TITLE = "Palindrome DP"
    SUBTITLE = "Find the longest palindromic substring using DP."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        s = "BABAD"
        label = Text("Input string:", font_size=28, color=WHITE).shift(UP * 1.5 + LEFT * 3.5)

        boxes = VGroup()
        for i, ch in enumerate(s):
            box = Square(side_length=0.7, color=BLUE_D, fill_opacity=0.3)
            box.shift(UP * 1.5 + LEFT * 1.2 + RIGHT * i * 0.85)
            lbl = Text(ch, font_size=26, color=WHITE).move_to(box.get_center())
            idx = Text(str(i), font_size=16, color=GRAY).next_to(box, DOWN, buff=0.1)
            boxes.add(VGroup(box, lbl, idx))

        intro_note = VGroup(
            Text("A palindrome reads the same forwards and backwards.", font_size=22, color=GRAY),
            Text('Goal: find the longest palindromic substring of S.', font_size=22, color=YELLOW),
        ).arrange(DOWN, buff=0.25).shift(DOWN * 1.0)

        self.play(Write(label))
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in boxes], lag_ratio=0.12))
        self.play(FadeIn(intro_note))
        self.wait(1.5)
        self.play(FadeOut(intro_note), FadeOut(ch1))

        # ── Stage 2: What Makes a Palindrome? ───────────────────────────────
        ch2 = self.chapter_title("What is a Palindrome?")

        examples = VGroup(
            Text('"A"     → palindrome (single char)', font_size=22, color=GREEN_C),
            Text('"ABA"   → palindrome (mirror around center)', font_size=22, color=GREEN_C),
            Text('"ABBA"  → palindrome (even-length mirror)', font_size=22, color=GREEN_C),
            Text('"ABCD"  → NOT a palindrome', font_size=22, color=RED_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.6)

        key_insight = Text(
            "Key insight: S[i..j] is a palindrome if S[i]==S[j] AND S[i+1..j-1] is a palindrome.",
            font_size=20,
            color=YELLOW,
        ).shift(DOWN * 2.5)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in examples], lag_ratio=0.25))
        self.wait(0.8)
        self.play(FadeIn(key_insight))
        self.wait(1.5)
        self.play(FadeOut(examples), FadeOut(key_insight), FadeOut(ch2))

        # ── Stage 3: DP Recurrence ───────────────────────────────────────────
        ch3 = self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[i][j] = \begin{cases}"
            r"\text{True} & \text{if } i = j \text{ (single char)} \\"
            r"\text{True} & \text{if } j = i+1 \text{ and } S[i]=S[j] \\"
            r"S[i]=S[j] \;\wedge\; \text{dp}[i+1][j-1] & \text{otherwise}"
            r"\end{cases}",
            font_size=24,
            color=WHITE,
        ).shift(UP * 0.3)

        explanation = VGroup(
            Text("Base case 1: every single character is a palindrome.", font_size=20, color=GREEN_C),
            Text("Base case 2: two equal adjacent chars form a palindrome.", font_size=20, color=GREEN_C),
            Text("Recurrence: extend outward if both ends match and inner is palindrome.", font_size=20, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).shift(DOWN * 2.2)

        self.play(Write(recurrence))
        self.wait(0.8)
        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in explanation], lag_ratio=0.3))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(explanation), FadeOut(ch3))

        # ── Stage 4: Build the DP Table ──────────────────────────────────────
        ch4 = self.chapter_title("Building the DP Table")

        self.play(FadeOut(label), FadeOut(boxes))

        s_short = "BABAD"
        n = len(s_short)

        table_label = Text(
            f'S = "{s_short}"   dp[i][j] = True if S[i..j] is palindrome',
            font_size=22,
            color=YELLOW,
        ).to_edge(UP, buff=0.8)
        self.play(Write(table_label))

        col_labels = list(s_short)
        row_labels = list(s_short)

        dp = [[False] * n for _ in range(n)]

        dp_table = DPTable(
            self,
            rows=n,
            cols=n,
            row_labels=row_labels,
            col_labels=col_labels,
            cell_width=0.82,
            cell_height=0.72,
            center=[0, -0.6, 0],
        )

        self.wait(0.8)

        # ── Stage 5: Fill Base Cases ─────────────────────────────────────────
        ch5 = self.chapter_title("Base Cases: Length 1 & 2")

        step_note = Text("", font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        # Base case: length 1 (diagonal)
        for i in range(n):
            dp[i][i] = True
            new_note = Text(
                f"S[{i}]='{s_short[i]}': single char → palindrome",
                font_size=18, color=GRAY,
            ).to_edge(DOWN, buff=0.5)
            self.play(Transform(step_note, new_note), run_time=0.25)
            dp_table.set_value(i, i, "T", color=GREEN, run_time=0.35)
            self.wait(0.2)

        # Base case: length 2
        for i in range(n - 1):
            j = i + 1
            if s_short[i] == s_short[j]:
                dp[i][j] = True
                color = GREEN
                note_str = f"S[{i}..{j}]='{s_short[i]}{s_short[j]}': equal pair → palindrome"
            else:
                color = RED_D
                note_str = f"S[{i}..{j}]='{s_short[i]}{s_short[j]}': unequal → not palindrome"
            new_note = Text(note_str, font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
            self.play(Transform(step_note, new_note), run_time=0.25)
            dp_table.set_value(i, j, "T" if dp[i][j] else "F", color=color, run_time=0.4)
            self.wait(0.25)

        self.wait(0.8)
        self.play(FadeOut(ch5))

        # ── Stage 6: Fill Longer Substrings ──────────────────────────────────
        ch6 = self.chapter_title("Expanding to Longer Substrings")

        best_len = 1
        best_start = 0

        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s_short[i] == s_short[j] and dp[i + 1][j - 1]:
                    dp[i][j] = True
                    color = GREEN
                    note_str = (
                        f"len={length}: S[{i}..{j}]='{s_short[i:j+1]}': "
                        f"ends match & inner is palindrome → T"
                    )
                    if length > best_len:
                        best_len = length
                        best_start = i
                else:
                    color = RED_D
                    note_str = (
                        f"len={length}: S[{i}..{j}]='{s_short[i:j+1]}': "
                        f"not palindrome → F"
                    )
                new_note = Text(note_str, font_size=17, color=GRAY).to_edge(DOWN, buff=0.5)
                self.play(Transform(step_note, new_note), run_time=0.25)
                dp_table.set_value(i, j, "T" if dp[i][j] else "F", color=color, run_time=0.4)
                self.wait(0.2)

        self.wait(0.8)
        self.play(FadeOut(step_note), FadeOut(ch6))

        # ── Stage 7: Highlight the Answer ────────────────────────────────────
        ch7 = self.chapter_title("Longest Palindromic Substring")

        best_end = best_start + best_len - 1
        dp_table.indicate(best_start, best_end)

        result_str = s_short[best_start:best_end + 1]

        result_text = VGroup(
            Text(f'Longest palindromic substring: "{result_str}"', font_size=30, color=GREEN_C, weight="BOLD"),
            Text(f"Start index: {best_start},  Length: {best_len}", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.8)

        self.play(FadeIn(result_text, shift=UP * 0.2))
        self.wait(1.0)

        # Highlight result characters in a reconstructed string display
        result_boxes = VGroup()
        for i, ch in enumerate(s_short):
            box = Square(side_length=0.65, color=BLUE_D, fill_opacity=0.3)
            box.shift(UP * 2.6 + LEFT * 1.5 + RIGHT * i * 0.8)
            lbl = Text(ch, font_size=24, color=WHITE).move_to(box.get_center())
            result_boxes.add(VGroup(box, lbl))

        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.1) for b in result_boxes], lag_ratio=0.1))
        self.wait(0.3)

        for i in range(best_start, best_end + 1):
            self.play(
                result_boxes[i][0].animate.set_fill(YELLOW, opacity=0.7),
                run_time=0.25,
            )
        self.wait(1.2)

        self.play(
            FadeOut(result_text),
            FadeOut(result_boxes),
            FadeOut(table_label),
            FadeOut(ch7),
        )

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        ch8 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        self.complexity_card(
            time_best=r"O(n^2)",
            time_avg=r"O(n^2)",
            time_worst=r"O(n^2)",
            space=r"O(n^2)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch8))
