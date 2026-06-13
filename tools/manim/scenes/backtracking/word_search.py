from manim import *
from ...base import AlgoScene, ArrayVis


class WordSearch(AlgoScene):
    TITLE = "Word Search"
    SUBTITLE = "Search for a word in a 2D grid using backtracking."
    CATEGORY = "backtracking"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        grid_data = [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
        ]
        word = "ABCCED"

        cell_size = 0.75
        rows = len(grid_data)
        cols = len(grid_data[0])

        grid_group = VGroup()
        cell_map = {}
        for r in range(rows):
            for c in range(cols):
                cell = Square(side_length=cell_size, stroke_color=BLUE_D, stroke_width=2)
                cell.set_fill(DARK_BLUE, opacity=0.4)
                label = Text(grid_data[r][c], font_size=28, color=WHITE)
                label.move_to(cell.get_center())
                group = VGroup(cell, label)
                group.move_to(
                    RIGHT * (c - cols / 2 + 0.5) * cell_size
                    + DOWN * (r - rows / 2 + 0.5) * cell_size
                    + UP * 0.5
                )
                grid_group.add(group)
                cell_map[(r, c)] = group

        word_label = Text(f'Target Word: "{word}"', font_size=30, color=YELLOW)
        word_label.to_edge(DOWN, buff=0.6)

        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in grid_group], lag_ratio=0.05))
        self.play(Write(word_label))
        self.wait(1.5)

        # ── Stage 2: Explain DFS/Backtracking idea ──────────────────────
        self.chapter_title("Backtracking Strategy")

        strategy_lines = VGroup(
            Text("1. Try every cell as a starting point", font_size=24, color=WHITE),
            Text("2. From each cell, explore 4 directions", font_size=24, color=WHITE),
            Text("3. Mark visited cells to avoid reuse", font_size=24, color=WHITE),
            Text("4. Undo mark when backtracking", font_size=24, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        strategy_lines.to_edge(RIGHT, buff=0.5).shift(UP * 0.5)

        for line in strategy_lines:
            self.play(FadeIn(line, shift=LEFT * 0.3), run_time=0.5)
        self.wait(1.5)
        self.play(FadeOut(strategy_lines))

        # ── Stage 3: Highlight path step by step ────────────────────────
        self.chapter_title("Tracing the Path")

        # Correct path for "ABCCED": (0,0)->(0,1)->(0,2)->(1,2)->(2,2)->(2,1)
        path = [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2), (2, 1)]
        path_colors = [GREEN, GREEN_B, GREEN_C, TEAL, TEAL_B, TEAL_C]

        step_label = Text("", font_size=26, color=YELLOW).to_edge(DOWN, buff=1.2)

        for i, (r, c) in enumerate(path):
            cell_group = cell_map[(r, c)]
            cell_sq, cell_txt = cell_group[0], cell_group[1]
            new_label = Text(
                f"Step {i+1}: Match '{word[i]}' at ({r},{c})",
                font_size=26,
                color=YELLOW,
            ).to_edge(DOWN, buff=1.2)
            self.play(
                cell_sq.animate.set_fill(path_colors[i], opacity=0.85),
                cell_txt.animate.set_color(BLACK),
                FadeOut(step_label),
                FadeIn(new_label),
                run_time=0.6,
            )
            step_label = new_label
            self.wait(0.5)

        self.wait(1)

        # ── Stage 4: Show backtracking on a wrong path ───────────────────
        self.chapter_title("Backtracking in Action")

        wrong_path = [(0, 0), (1, 0), (2, 0)]
        wrong_label = Text("Trying wrong path from (0,0)→(1,0)→(2,0)...", font_size=24, color=RED)
        wrong_label.to_edge(DOWN, buff=1.2)
        self.play(FadeOut(step_label), FadeIn(wrong_label))

        visited_marks = []
        for r, c in wrong_path:
            cell_sq = cell_map[(r, c)][0]
            mark = cell_sq.copy().set_fill(RED, opacity=0.6)
            self.play(FadeIn(mark, scale=0.9), run_time=0.4)
            visited_marks.append(mark)
            self.wait(0.3)

        dead_end = Text("Dead end! Backtrack.", font_size=26, color=RED_B)
        dead_end.next_to(wrong_label, UP, buff=0.2)
        self.play(FadeIn(dead_end))
        self.wait(0.8)

        # Undo the wrong path
        for mark in reversed(visited_marks):
            self.play(FadeOut(mark, scale=1.2), run_time=0.3)
        self.play(FadeOut(wrong_label), FadeOut(dead_end))
        self.wait(1)

        # ── Stage 5: Highlight the complete valid path ───────────────────
        self.chapter_title("Complete Valid Path Found!")

        found_label = Text(f'"{word}" found!', font_size=32, color=GREEN)
        found_label.to_edge(DOWN, buff=0.6)
        self.play(FadeOut(word_label), FadeIn(found_label))

        for r, c in path:
            cell_sq = cell_map[(r, c)][0]
            self.play(
                cell_sq.animate.set_stroke(YELLOW, width=4),
                run_time=0.25,
            )
        self.wait(1.5)

        # ── Stage 6: Complexity Card ─────────────────────────────────────
        self.play(
            *[FadeOut(m) for m in self.mobjects],
        )
        self.complexity_card(
            time_complexity="O(M·N·4^L)",
            space_complexity="O(L)",
            notes=[
                "M×N = grid dimensions",
                "L = length of the target word",
                "4^L from branching factor at each step",
                "Space: recursion stack depth equals word length",
            ],
        )
        self.wait(2)
