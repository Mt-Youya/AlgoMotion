from manim import *
from ...base import AlgoScene, DPTable


class EditDistance(AlgoScene):
    TITLE = "Edit Distance"
    SUBTITLE = "Minimum operations to transform one string into another."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("Problem: Edit Distance")

        intro_text = VGroup(
            Text("Given two strings, find the minimum number of", font_size=28),
            Text("operations to transform one into the other.", font_size=28),
        ).arrange(DOWN, buff=0.2).move_to(UP * 1.5)

        ops_text = VGroup(
            Text("Allowed operations:", font_size=26, color=YELLOW),
            Text("  • Insert a character", font_size=24),
            Text("  • Delete a character", font_size=24),
            Text("  • Replace a character", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(DOWN * 0.5)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(1)
        self.play(FadeIn(ops_text, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(ops_text))

        # ── Stage 2: Show Example Strings ────────────────────────────────
        self.chapter_title("Example: 'horse' → 'ros'")

        word1 = "horse"
        word2 = "ros"

        label1 = Text(f'word1 = "{word1}"', font_size=32, color=BLUE).move_to(UP * 1.8 + LEFT * 2)
        label2 = Text(f'word2 = "{word2}"', font_size=32, color=GREEN).move_to(UP * 1.0 + LEFT * 2)

        self.play(Write(label1))
        self.wait(0.5)
        self.play(Write(label2))
        self.wait(1)

        arrow1 = Arrow(LEFT * 0.5 + UP * 1.4, RIGHT * 1.5 + UP * 1.4, buff=0, color=YELLOW)
        result_label = Text("Edit Distance = 3", font_size=30, color=YELLOW).move_to(UP * 1.4 + RIGHT * 3)
        self.play(GrowArrow(arrow1), Write(result_label))
        self.wait(1.5)
        self.play(FadeOut(label1), FadeOut(label2), FadeOut(arrow1), FadeOut(result_label))

        # ── Stage 3: DP Recurrence Explanation ───────────────────────────
        self.chapter_title("DP Recurrence")

        dp_def = Text("dp[i][j] = edit distance of word1[:i] and word2[:j]", font_size=24, color=WHITE)
        dp_def.move_to(UP * 2.5)

        base_cases = VGroup(
            Text("Base Cases:", font_size=26, color=YELLOW),
            Text("dp[i][0] = i   (delete all chars from word1)", font_size=22),
            Text("dp[0][j] = j   (insert all chars into word1)", font_size=22),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(UP * 1.0 + LEFT * 1)

        recurrence = VGroup(
            Text("Recurrence:", font_size=26, color=YELLOW),
            Text("If word1[i] == word2[j]:", font_size=22),
            Text("    dp[i][j] = dp[i-1][j-1]", font_size=22, color=GREEN),
            Text("Else:", font_size=22),
            Text("    dp[i][j] = 1 + min(dp[i-1][j],   ← delete", font_size=22, color=BLUE),
            Text("                       dp[i][j-1],   ← insert", font_size=22, color=BLUE),
            Text("                       dp[i-1][j-1]) ← replace", font_size=22, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(DOWN * 1.2 + LEFT * 0.5)

        self.play(Write(dp_def))
        self.wait(0.5)
        self.play(FadeIn(base_cases, shift=RIGHT * 0.2))
        self.wait(1)
        self.play(FadeIn(recurrence, shift=RIGHT * 0.2))
        self.wait(2)
        self.play(FadeOut(dp_def), FadeOut(base_cases), FadeOut(recurrence))

        # ── Stage 4: DP Table Construction ───────────────────────────────
        self.chapter_title("Building the DP Table")

        word1 = "horse"
        word2 = "ros"
        m, n = len(word1), len(word2)

        # Build actual dp table values
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])

        cell_size = 0.65
        table_group = VGroup()

        # Column headers (word2 chars)
        col_headers = VGroup()
        for j, ch in enumerate(["", ""] + list(word2)):
            label = Text(ch, font_size=20, color=GREEN if ch and ch != "" else WHITE)
            label.move_to(RIGHT * (j * cell_size) + UP * ((m + 1) * cell_size / 2 + 0.5))
            col_headers.add(label)

        # Row headers (word1 chars)
        row_headers = VGroup()
        for i, ch in enumerate(["", ""] + list(word1)):
            label = Text(ch, font_size=20, color=BLUE if ch and ch != "" else WHITE)
            label.move_to(LEFT * 0.4 + UP * ((m - i + 0.5) * cell_size))
            row_headers.add(label)

        # Draw cells
        cells = [[None] * (n + 1) for _ in range(m + 1)]
        cell_group = VGroup()
        for i in range(m + 1):
            for j in range(n + 1):
                rect = Square(side_length=cell_size, color=GREY, fill_opacity=0.1)
                rect.move_to(RIGHT * j * cell_size + UP * (m - i) * cell_size)
                val = Text(str(dp[i][j]), font_size=18)
                val.move_to(rect.get_center())
                cells[i][j] = VGroup(rect, val)
                cell_group.add(cells[i][j])

        table_group.add(cell_group)
        table_group.move_to(ORIGIN + DOWN * 0.5)
        col_headers.move_to(col_headers.get_center() + DOWN * 0.5)
        row_headers.move_to(row_headers.get_center() + DOWN * 0.5)

        self.play(FadeIn(col_headers), FadeIn(row_headers))
        self.wait(0.5)

        # Animate filling base cases first
        base_cells = VGroup()
        for i in range(m + 1):
            base_cells.add(cells[i][0])
        for j in range(1, n + 1):
            base_cells.add(cells[0][j])

        self.play(LaggedStart(*[FadeIn(c) for c in base_cells], lag_ratio=0.08))
        self.wait(0.8)

        # Fill remaining cells row by row
        for i in range(1, m + 1):
            row_anims = []
            for j in range(1, n + 1):
                row_anims.append(FadeIn(cells[i][j]))
            self.play(LaggedStart(*row_anims, lag_ratio=0.1))
            self.wait(0.3)

        self.wait(1)

        # Highlight final answer cell
        final_cell = cells[m][n]
        highlight = Square(side_length=cell_size, color=YELLOW, fill_opacity=0.3)
        highlight.move_to(final_cell.get_center())
        self.play(FadeIn(highlight))
        ans_label = Text("Answer = 3", font_size=26, color=YELLOW).move_to(DOWN * 3.2)
        self.play(Write(ans_label))
        self.wait(2)
        self.play(FadeOut(table_group), FadeOut(col_headers), FadeOut(row_headers),
                  FadeOut(highlight), FadeOut(ans_label))

        # ── Stage 5: Traceback Path ───────────────────────────────────────
        self.chapter_title("Traceback: Recovering the Operations")

        ops_sequence = VGroup(
            Text("Traceback from dp[5][3] to dp[0][0]:", font_size=26, color=YELLOW),
            Text("", font_size=10),
            Text("horse → rorse  (replace 'h' with 'r')", font_size=24),
            Text("rorse → rose   (delete 'r')", font_size=24),
            Text("rose  → ros    (delete 'e')", font_size=24),
            Text("", font_size=10),
            Text("Total: 3 operations", font_size=26, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(ORIGIN)

        self.play(FadeIn(ops_sequence, shift=UP * 0.3))
        self.wait(3)
        self.play(FadeOut(ops_sequence))

        # ── Stage 6: Space Optimization Note ─────────────────────────────
        self.chapter_title("Space Optimization")

        opt_text = VGroup(
            Text("Standard DP: O(m×n) space", font_size=28, color=BLUE),
            Text("", font_size=10),
            Text("Observation: dp[i][j] only depends on", font_size=26),
            Text("dp[i-1][j-1], dp[i-1][j], dp[i][j-1]", font_size=26, color=GREEN),
            Text("", font_size=10),
            Text("→ Only two rows needed at a time!", font_size=28, color=YELLOW),
            Text("→ Optimized space: O(min(m, n))", font_size=28, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to(ORIGIN)

        self.play(FadeIn(opt_text, shift=UP * 0.2))
        self.wait(3)
        self.play(FadeOut(opt_text))

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_complexity="O(m × n)",
            space_complexity="O(m × n)  [O(n) optimized]",
        )
        self.wait(3)
