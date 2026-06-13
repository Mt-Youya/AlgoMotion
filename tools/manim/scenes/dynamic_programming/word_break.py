from manim import *
from ...base import AlgoScene, DPTable


class WordBreak(AlgoScene):
    TITLE = "Word Break"
    SUBTITLE = "Determine if a string can be segmented into dictionary words."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        self.chapter_title("Problem Setup")

        s = "leetcode"
        word_dict = ["leet", "code"]

        s_label = Text("String:", font_size=32, color=WHITE).to_edge(LEFT).shift(UP * 2)
        s_value = Text(f'"{s}"', font_size=36, color=YELLOW).next_to(s_label, RIGHT, buff=0.3)

        dict_label = Text("Dictionary:", font_size=32, color=WHITE).next_to(s_label, DOWN, buff=0.5).align_to(s_label, LEFT)
        dict_value = Text(str(word_dict), font_size=30, color=BLUE).next_to(dict_label, RIGHT, buff=0.3)

        goal_label = Text(
            'Goal: Can "leetcode" be split into "leet" + "code"?',
            font_size=26, color=GREEN
        ).next_to(dict_label, DOWN, buff=0.5).align_to(dict_label, LEFT)

        self.play(Write(s_label), Write(s_value))
        self.wait(0.6)
        self.play(Write(dict_label), Write(dict_value))
        self.wait(0.6)
        self.play(Write(goal_label))
        self.wait(1.2)

        self.play(FadeOut(s_label), FadeOut(s_value),
                  FadeOut(dict_label), FadeOut(dict_value),
                  FadeOut(goal_label))

        # ── Stage 2: Visualize the String as Characters ──────────────────────
        self.chapter_title("String Visualization")

        chars = list(s)
        n = len(chars)

        char_cells = VGroup()
        char_labels = VGroup()

        for i, ch in enumerate(chars):
            cell = Square(side_length=0.75, color=WHITE, fill_opacity=0.1)
            letter = Text(ch, font_size=28, color=WHITE).move_to(cell.get_center())
            idx = Text(str(i), font_size=18, color=GRAY)
            char_cells.add(VGroup(cell, letter))

        char_cells.arrange(RIGHT, buff=0.05).move_to(ORIGIN + UP * 0.5)

        for i, cell_group in enumerate(char_cells):
            idx = Text(str(i), font_size=18, color=GRAY).next_to(cell_group, DOWN, buff=0.1)
            char_labels.add(idx)

        str_header = Text(f's = "{s}"', font_size=28, color=YELLOW).next_to(char_cells, UP, buff=0.4)

        self.play(Write(str_header))
        self.play(LaggedStart(*[FadeIn(c) for c in char_cells], lag_ratio=0.1))
        self.play(LaggedStart(*[FadeIn(idx) for idx in char_labels], lag_ratio=0.1))
        self.wait(1.0)

        # Highlight "leet" (indices 0-3)
        leet_note = Text('"leet" → indices 0..3', font_size=24, color=BLUE).to_edge(DOWN).shift(UP * 0.8)
        self.play(Write(leet_note))
        for i in range(4):
            self.play(char_cells[i][0].animate.set_fill(BLUE, opacity=0.5), run_time=0.2)
        self.wait(0.8)

        # Highlight "code" (indices 4-7)
        code_note = Text('"code" → indices 4..7', font_size=24, color=GREEN).next_to(leet_note, DOWN, buff=0.2)
        self.play(Write(code_note))
        for i in range(4, 8):
            self.play(char_cells[i][0].animate.set_fill(GREEN, opacity=0.5), run_time=0.2)
        self.wait(1.0)

        self.play(FadeOut(leet_note), FadeOut(code_note))
        self.play(FadeOut(char_cells), FadeOut(char_labels), FadeOut(str_header))

        # ── Stage 3: DP Array Initialization ────────────────────────────────
        self.chapter_title("Initialize DP Array")

        dp_size = n + 1
        dp_vals = [False] * dp_size
        dp_vals[0] = True  # empty prefix is always valid

        cell_width = 0.8
        dp_cells = VGroup()
        dp_index_labels = VGroup()
        dp_val_texts = []

        for i in range(dp_size):
            cell = Square(side_length=cell_width, color=WHITE, fill_opacity=0.1)
            val_str = "T" if dp_vals[i] else "F"
            val_color = GREEN if dp_vals[i] else RED
            val = Text(val_str, font_size=22, color=val_color)
            val.move_to(cell.get_center())
            dp_cells.add(VGroup(cell, val))
            dp_val_texts.append(val)

        dp_cells.arrange(RIGHT, buff=0.05).move_to(ORIGIN + UP * 0.3)

        for i in range(dp_size):
            idx = Text(str(i), font_size=18, color=GRAY).next_to(dp_cells[i], DOWN, buff=0.1)
            dp_index_labels.add(idx)

        dp_header = Text("dp[0..n]  (T = reachable, F = not reachable)", font_size=26, color=YELLOW).next_to(dp_cells, UP, buff=0.4)
        base_note = Text("dp[0] = True: empty string always valid", font_size=22, color=GRAY).next_to(dp_cells, DOWN, buff=0.6)

        self.play(Write(dp_header))
        self.play(LaggedStart(*[FadeIn(c) for c in dp_cells], lag_ratio=0.1))
        self.play(LaggedStart(*[FadeIn(idx) for idx in dp_index_labels], lag_ratio=0.1))
        self.wait(0.5)
        self.play(Write(base_note))
        self.play(dp_cells[0][0].animate.set_fill(GREEN, opacity=0.5))
        self.wait(1.0)
        self.play(FadeOut(base_note))

        # ── Stage 4: Fill dp[1] to dp[4] ────────────────────────────────────
        self.chapter_title('Check prefix "leet" (dp[1]..dp[4])')

        dict_reminder = Text(f"Dictionary: {word_dict}", font_size=24, color=BLUE).to_edge(UP).shift(DOWN * 0.3)
        self.play(Write(dict_reminder))
        self.wait(0.3)

        # dp[1]: s[0:1]="l" — not in dict
        step1 = Text('dp[1]: s[0:1]="l" not in dict → F', font_size=22, color=WHITE).to_edge(DOWN).shift(UP * 0.6)
        self.play(Write(step1))
        self.play(dp_cells[1][0].animate.set_fill(RED, opacity=0.3))
        self.wait(0.7)
        self.play(FadeOut(step1))

        # dp[2]: s[0:2]="le" — not in dict
        step2 = Text('dp[2]: s[0:2]="le" not in dict → F', font_size=22, color=WHITE).to_edge(DOWN).shift(UP * 0.6)
        self.play(Write(step2))
        self.play(dp_cells[2][0].animate.set_fill(RED, opacity=0.3))
        self.wait(0.7)
        self.play(FadeOut(step2))

        # dp[3]: s[0:3]="lee" — not in dict
        step3 = Text('dp[3]: s[0:3]="lee" not in dict → F', font_size=22, color=WHITE).to_edge(DOWN).shift(UP * 0.6)
        self.play(Write(step3))
        self.play(dp_cells[3][0].animate.set_fill(RED, opacity=0.3))
        self.wait(0.7)
        self.play(FadeOut(step3))

        # dp[4]: dp[0]=T and s[0:4]="leet" in dict → True
        step4 = Text('dp[4]: dp[0]=T and s[0:4]="leet" ∈ dict → T', font_size=22, color=GREEN).to_edge(DOWN).shift(UP * 0.6)
        self.play(Write(step4))
        self.play(dp_cells[4][0].animate.set_fill(GREEN, opacity=0.5))
        new_val4 = Text("T", font_size=22, color=GREEN)
        new_val4.move_to(dp_cells[4][0].get_center())
        self.play(Transform(dp_val_texts[4], new_val4))
        dp_vals[4] = True
        self.wait(1.0)
        self.play(FadeOut(step4))

        # ── Stage 5: Fill dp[5] to dp[8] ────────────────────────────────────
        self.chapter_title('Check suffix "code" (dp[5]..dp[8])')

        # dp[5..7]: substrings starting from dp[4] don't complete a word yet
        for i in range(5, 8):
            sub = s[4:i]
            step = Text(f'dp[{i}]: s[4:{i}]="{sub}" not in dict → F', font_size=22, color=WHITE).to_edge(DOWN).shift(UP * 0.6)
            self.play(Write(step))
            self.play(dp_cells[i][0].animate.set_fill(RED, opacity=0.3))
            self.wait(0.6)
            self.play(FadeOut(step))

        # dp[8]: dp[4]=T and s[4:8]="code" in dict → True
        step8 = Text('dp[8]: dp[4]=T and s[4:8]="code" ∈ dict → T', font_size=22, color=GREEN).to_edge(DOWN).shift(UP * 0.6)
        self.play(Write(step8))
        self.play(dp_cells[8][0].animate.set_fill(GREEN, opacity=0.5))
        new_val8 = Text("T", font_size=22, color=GREEN)
        new_val8.move_to(dp_cells[8][0].get_center())
        self.play(Transform(dp_val_texts[8], new_val8))
        dp_vals[8] = True
        self.wait(1.0)
        self.play(FadeOut(step8))

        # Answer arrow
        answer_arrow = Arrow(
            dp_cells[n].get_top() + UP * 0.7,
            dp_cells[n].get_top(),
            color=GREEN, buff=0.05
        )
        answer_label = Text("dp[8] = True → YES!", font_size=28, color=GREEN).next_to(answer_arrow, UP, buff=0.1)
        self.play(GrowArrow(answer_arrow), Write(answer_label))
        self.wait(1.2)

        self.play(FadeOut(answer_arrow), FadeOut(answer_label), FadeOut(dict_reminder))
        self.play(FadeOut(dp_cells), FadeOut(dp_index_labels), FadeOut(dp_header))

        # ── Stage 6: Recurrence Relation ────────────────────────────────────
        self.chapter_title("Recurrence Relation")

        recurrence = VGroup(
            Text("dp[0] = True", font_size=30, color=GREEN),
            Text("dp[i] = OR over all j < i:", font_size=28, color=WHITE),
            Text("    dp[j] == True  AND  s[j:i] in word_dict", font_size=26, color=YELLOW),
            Text("Answer: dp[len(s)]", font_size=28, color=BLUE),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in recurrence:
            self.play(Write(line))
            self.wait(0.5)
        self.wait(1.0)

        self.play(FadeOut(recurrence))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n² × m)",
            space_complexity="O(n)",
        )
        self.wait(1.5)
