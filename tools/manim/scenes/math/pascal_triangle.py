from manim import *
from ...base import AlgoScene, ArrayVis


class PascalTriangle(AlgoScene):
    TITLE = "Pascal's Triangle"
    SUBTITLE = "Generates the first n rows of Pascal's triangle where each element is the sum of"
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Pascal's Triangle", font_size=48, color=YELLOW),
            Text("Each element = sum of the two elements above it", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.4)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Show the rule ─────────────────────────────────────────
        self.chapter_title("The Core Rule")
        rule_label = Text("triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]",
                          font_size=26, color=BLUE_B)
        rule_label.to_edge(UP, buff=1.2)
        self.play(Write(rule_label))
        self.wait(1)

        # Draw a small diagram illustrating the rule
        parent_left = Square(side_length=0.6).set_fill(BLUE, opacity=0.6)
        parent_right = Square(side_length=0.6).set_fill(BLUE, opacity=0.6)
        child = Square(side_length=0.6).set_fill(GREEN, opacity=0.8)

        pl_label = Text("a", font_size=22).move_to(parent_left)
        pr_label = Text("b", font_size=22).move_to(parent_right)
        ch_label = Text("a+b", font_size=18).move_to(child)

        parent_left.shift(LEFT * 0.7 + UP * 0.5)
        parent_right.shift(RIGHT * 0.7 + UP * 0.5)
        child.shift(DOWN * 0.2)
        pl_label.shift(LEFT * 0.7 + UP * 0.5)
        pr_label.shift(RIGHT * 0.7 + UP * 0.5)
        ch_label.shift(DOWN * 0.2)

        diagram = VGroup(parent_left, parent_right, child, pl_label, pr_label, ch_label)
        diagram.move_to(ORIGIN)

        arrow_left = Arrow(parent_left.get_bottom(), child.get_top(), buff=0.05, color=YELLOW)
        arrow_right = Arrow(parent_right.get_bottom(), child.get_top(), buff=0.05, color=YELLOW)

        self.play(FadeIn(diagram), Create(arrow_left), Create(arrow_right))
        self.wait(2)
        self.play(FadeOut(diagram), FadeOut(arrow_left), FadeOut(arrow_right), FadeOut(rule_label))
        self.wait(0.5)

        # ── Stage 3: Build triangle row by row ───────────────────────────
        self.chapter_title("Building Row by Row")
        n_rows = 6
        triangle = [[1]]
        for i in range(1, n_rows):
            row = [1]
            for j in range(1, i):
                row.append(triangle[i - 1][j - 1] + triangle[i - 1][j])
            row.append(1)
            triangle.append(row)

        cell_size = 0.55
        all_cells = VGroup()
        cell_map = {}

        for i, row in enumerate(triangle):
            for j, val in enumerate(row):
                cell = Square(side_length=cell_size)
                cell.set_fill(DARK_BLUE, opacity=0.7)
                cell.set_stroke(BLUE_B, width=1.5)
                label = Text(str(val), font_size=20 if val < 100 else 14)
                label.move_to(cell)
                x = (j - i / 2) * (cell_size + 0.08)
                y = (n_rows / 2 - i) * (cell_size + 0.08)
                group = VGroup(cell, label).move_to([x, y - 0.3, 0])
                all_cells.add(group)
                cell_map[(i, j)] = group

        # Animate row by row
        for i in range(n_rows):
            row_group = VGroup(*[cell_map[(i, j)] for j in range(len(triangle[i]))])
            if i == 0:
                self.play(FadeIn(row_group, shift=DOWN * 0.2))
            else:
                # Highlight the parent cells
                parent_cells = VGroup(*[cell_map[(i - 1, j)] for j in range(len(triangle[i - 1]))])
                self.play(parent_cells.animate.set_fill(BLUE, opacity=0.9), run_time=0.4)
                self.play(FadeIn(row_group, shift=DOWN * 0.2), run_time=0.6)
                self.play(parent_cells.animate.set_fill(DARK_BLUE, opacity=0.7), run_time=0.3)
            self.wait(0.4)

        self.wait(1.5)

        # ── Stage 4: Highlight symmetry ───────────────────────────────────
        self.chapter_title("Symmetry Property")
        sym_note = Text("Pascal's Triangle is symmetric!", font_size=28, color=YELLOW)
        sym_note.to_edge(DOWN, buff=0.5)
        self.play(Write(sym_note))

        for i in range(n_rows):
            row_len = len(triangle[i])
            for j in range(row_len // 2):
                mirror = row_len - 1 - j
                left_cell = cell_map[(i, j)][0]
                right_cell = cell_map[(i, mirror)][0]
                self.play(
                    left_cell.animate.set_fill(ORANGE, opacity=0.9),
                    right_cell.animate.set_fill(ORANGE, opacity=0.9),
                    run_time=0.2,
                )
        self.wait(1.5)
        self.play(FadeOut(sym_note))

        # Reset colors
        for i in range(n_rows):
            for j in range(len(triangle[i])):
                cell_map[(i, j)][0].set_fill(DARK_BLUE, opacity=0.7)
        self.wait(0.5)

        # ── Stage 5: Highlight powers of 2 (row sums) ────────────────────
        self.chapter_title("Row Sums = Powers of 2")
        sum_labels = VGroup()
        for i, row in enumerate(triangle):
            s = sum(row)
            x_pos = (n_rows / 2) * (cell_size + 0.08) + 1.0
            y_pos = (n_rows / 2 - i) * (cell_size + 0.08) - 0.3
            lbl = Text(f"= 2^{i} = {s}", font_size=18, color=GREEN_B)
            lbl.move_to([x_pos, y_pos, 0])
            sum_labels.add(lbl)

        self.play(LaggedStart(*[Write(lbl) for lbl in sum_labels], lag_ratio=0.15))
        self.wait(2)
        self.play(FadeOut(sum_labels))

        # ── Stage 6: Fibonacci diagonal ───────────────────────────────────
        self.chapter_title("Fibonacci in the Diagonals")
        fib_note = Text("Shallow diagonals sum to Fibonacci numbers", font_size=24, color=PINK)
        fib_note.to_edge(DOWN, buff=0.5)
        self.play(Write(fib_note))

        diag_cells = []
        for d in range(n_rows):
            i, j = d, 0
            while i >= 0 and j < len(triangle[i]):
                diag_cells.append((i, j))
                i -= 1
                j += 1

        for idx, (i, j) in enumerate(diag_cells[:8]):
            self.play(
                cell_map[(i, j)][0].animate.set_fill(PINK, opacity=0.9),
                run_time=0.25,
            )
        self.wait(1.5)
        self.play(FadeOut(fib_note))
        self.play(FadeOut(all_cells))
        self.wait(0.5)

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n²)",
            space_complexity="O(n²)",
            note="n = number of rows; each row i has i+1 elements",
        )
        self.wait(2)
