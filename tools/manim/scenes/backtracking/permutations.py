from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    ORIGIN,
    Arrow,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Rectangle,
    Text,
    Transform,
    VGroup,
    Write,
    AnimationGroup,
    Indicate,
    SurroundingRectangle,
    Line,
    Dot,
    BOLD,
)

from ...base import AlgoScene
from ...base.algo_scene import (
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    PAPER,
    SIGNAL,
    C_ACTIVE,
    C_DEFAULT,
    C_SORTED,
    C_TEXT,
)


class Permutations(AlgoScene):
    TITLE = "Permutations"
    SUBTITLE = "Generate all permutations of a given array using backtracking."
    CATEGORY = "backtracking"

    # ── helpers ───────────────────────────────────────────────────────────────

    def _make_perm_row(self, perm: list, *, highlight_idx: int = -1) -> VGroup:
        """Build a horizontal row of boxes showing a permutation."""
        cells = VGroup()
        for i, val in enumerate(perm):
            fill = C_ACTIVE if i == highlight_idx else C_DEFAULT
            rect = Rectangle(
                width=0.7, height=0.7,
                fill_color=fill, fill_opacity=1,
                color=INK, stroke_width=2,
            )
            lbl = Text(str(val), font_size=22, color=INK, weight=BOLD)
            lbl.move_to(rect)
            cells.add(VGroup(rect, lbl))
        cells.arrange(RIGHT, buff=0.08)
        return cells

    def _make_bracket(self, items: list[str], label: str = "") -> VGroup:
        """Display a bracketed list [a, b, c] as a Text mob."""
        content = "[" + ", ".join(items) + "]"
        if label:
            content = label + " = " + content
        return Text(content, font_size=26, color=INK)

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self) -> None:

        # ── Stage 1: Problem Introduction ─────────────────────────────────────
        ch1 = self.chapter_title("Problem: Generate All Permutations")

        intro_lines = VGroup(
            Text("Given an array of distinct integers,", font_size=28, color=INK),
            Text("generate every possible ordering (permutation).", font_size=28, color=INK),
            Text("Input: [1, 2, 3]  →  6 permutations (3! = 6)", font_size=26, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        intro_lines.move_to(ORIGIN)

        self.play(FadeIn(intro_lines))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: All Permutations of [1, 2, 3] ────────────────────────────
        ch2 = self.chapter_title("All 6 Permutations of [1, 2, 3]")

        perms = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1],
        ]
        perm_rows = VGroup()
        for p in perms:
            row = self._make_perm_row(p)
            perm_rows.add(row)

        # Arrange in 2 columns of 3
        col1 = VGroup(*perm_rows[:3]).arrange(DOWN, buff=0.22)
        col2 = VGroup(*perm_rows[3:]).arrange(DOWN, buff=0.22)
        grid = VGroup(col1, col2).arrange(RIGHT, buff=1.2)
        grid.move_to(ORIGIN + DOWN * 0.3)

        for row in perm_rows:
            self.play(FadeIn(row, run_time=0.3))
        self.wait(1.5)
        self.play(FadeOut(grid), FadeOut(ch2))
        self.wait(0.2)

        # ── Stage 3: Backtracking Idea ────────────────────────────────────────
        ch3 = self.chapter_title("Backtracking Strategy")

        idea_lines = VGroup(
            Text("At each position, try placing every unused element.", font_size=26, color=INK),
            Text("Recurse to fill the next position.", font_size=26, color=INK),
            Text("When all positions are filled → record the permutation.", font_size=26, color=COBALT),
            Text("Backtrack: undo the last choice and try the next option.", font_size=26, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        idea_lines.move_to(ORIGIN)

        self.play(FadeIn(idea_lines, run_time=0.8))
        self.wait(2.5)
        self.play(FadeOut(idea_lines), FadeOut(ch3))
        self.wait(0.2)

        # ── Stage 4: Swap-Based Backtracking Walkthrough ──────────────────────
        ch4 = self.chapter_title("Swap-Based Backtracking: [1, 2, 3]")

        # Show current array state
        arr_label = Text("Array:", font_size=24, color=GRAY).to_edge(LEFT, buff=1.2).shift(UP * 1.8)
        arr = [1, 2, 3]

        def make_arr_display(values, active_idx=-1, fixed_up_to=-1):
            cells = VGroup()
            for i, v in enumerate(values):
                if i <= fixed_up_to:
                    fill = C_SORTED
                elif i == active_idx:
                    fill = C_ACTIVE
                else:
                    fill = C_DEFAULT
                rect = Rectangle(
                    width=0.8, height=0.8,
                    fill_color=fill, fill_opacity=1,
                    color=INK, stroke_width=2.5,
                )
                lbl = Text(str(v), font_size=26, color=INK, weight=BOLD)
                lbl.move_to(rect)
                cells.add(VGroup(rect, lbl))
            cells.arrange(RIGHT, buff=0.1)
            return cells

        # Step 4a: initial state
        step_label = Text("Start: fix position 0", font_size=24, color=COBALT).shift(DOWN * 0.3)
        arr_disp = make_arr_display([1, 2, 3])
        arr_disp.move_to(UP * 1.0)

        self.play(FadeIn(arr_label), FadeIn(arr_disp), FadeIn(step_label))
        self.wait(1)

        # Step 4b: swap(0,0) → fix 1 at position 0
        self.play(FadeOut(step_label))
        step_label2 = Text("swap(0,0): arr=[1,2,3], fix pos 0 = 1", font_size=23, color=COBALT).shift(DOWN * 0.3)
        arr_disp2 = make_arr_display([1, 2, 3], fixed_up_to=0)
        arr_disp2.move_to(UP * 1.0)
        self.play(Transform(arr_disp, arr_disp2), FadeIn(step_label2))
        self.wait(1)

        # Step 4c: swap(1,1) → fix 2 at position 1
        self.play(FadeOut(step_label2))
        step_label3 = Text("swap(1,1): arr=[1,2,3], fix pos 1 = 2", font_size=23, color=COBALT).shift(DOWN * 0.3)
        arr_disp3 = make_arr_display([1, 2, 3], fixed_up_to=1)
        arr_disp3.move_to(UP * 1.0)
        self.play(Transform(arr_disp, arr_disp3), FadeIn(step_label3))
        self.wait(1)

        # Step 4d: base case → record [1,2,3]
        self.play(FadeOut(step_label3))
        result_label = Text("Base case! Record permutation: [1, 2, 3]", font_size=24, color=SIGNAL).shift(DOWN * 0.3)
        arr_disp4 = make_arr_display([1, 2, 3], fixed_up_to=2)
        arr_disp4.move_to(UP * 1.0)
        self.play(Transform(arr_disp, arr_disp4), FadeIn(result_label))
        self.wait(1.2)

        # Step 4e: backtrack → swap(1,2) → [1,3,2]
        self.play(FadeOut(result_label))
        back_label = Text("Backtrack! swap(1,2): arr=[1,3,2] → record [1,3,2]", font_size=22, color=CORAL).shift(DOWN * 0.3)
        arr_disp5 = make_arr_display([1, 3, 2], fixed_up_to=2)
        arr_disp5.move_to(UP * 1.0)
        self.play(Transform(arr_disp, arr_disp5), FadeIn(back_label))
        self.wait(1.2)

        self.play(FadeOut(back_label), FadeOut(arr_disp), FadeOut(arr_label), FadeOut(ch4))
        self.wait(0.2)

        # ── Stage 5: Recursion Tree (partial) ─────────────────────────────────
        ch5 = self.chapter_title("Recursion Tree (first two branches)")

        # Draw a small partial recursion tree
        root_box = Rectangle(width=1.6, height=0.55, fill_color=COBALT, fill_opacity=1, color=INK, stroke_width=2)
        root_txt = Text("[1,2,3]", font_size=18, color=PAPER, weight=BOLD).move_to(root_box)
        root = VGroup(root_box, root_txt).move_to(UP * 2.5)

        child_data = ["[1,2,3]", "[2,1,3]", "[3,2,1]"]
        child_colors = [COBALT, C_ACTIVE, CORAL]
        children = VGroup()
        for i, (txt, col) in enumerate(zip(child_data, child_colors)):
            b = Rectangle(width=1.6, height=0.55, fill_color=col, fill_opacity=0.85, color=INK, stroke_width=2)
            t = Text(txt, font_size=17, color=PAPER, weight=BOLD).move_to(b)
            node = VGroup(b, t)
            children.add(node)
        children.arrange(RIGHT, buff=0.7)
        children.next_to(root, DOWN, buff=0.9)

        arrows = VGroup()
        for child in children:
            arr_line = Arrow(
                root.get_bottom(), child.get_top(),
                buff=0.08, color=GRAY, stroke_width=2, max_tip_length_to_length_ratio=0.12,
            )
            arrows.add(arr_line)

        # Grandchildren under [1,2,3]
        gc_data = ["[1,2,3]", "[1,3,2]"]
        gc_colors = [SIGNAL, SIGNAL]
        grandchildren = VGroup()
        for txt, col in zip(gc_data, gc_colors):
            b = Rectangle(width=1.4, height=0.5, fill_color=col, fill_opacity=0.9, color=INK, stroke_width=1.5)
            t = Text(txt, font_size=15, color=INK, weight=BOLD).move_to(b)
            grandchildren.add(VGroup(b, t))
        grandchildren.arrange(RIGHT, buff=0.4)
        grandchildren.next_to(children[0], DOWN, buff=0.8)

        gc_arrows = VGroup()
        for gc in grandchildren:
            a = Arrow(
                children[0].get_bottom(), gc.get_top(),
                buff=0.08, color=GRAY, stroke_width=1.5, max_tip_length_to_length_ratio=0.12,
            )
            gc_arrows.add(a)

        tree_group = VGroup(root, children, arrows, grandchildren, gc_arrows)
        tree_group.move_to(ORIGIN + DOWN * 0.2)

        self.play(FadeIn(root, run_time=0.5))
        self.wait(0.3)
        self.play(Create(arrows, run_time=0.6), FadeIn(children, run_time=0.6))
        self.wait(0.5)
        self.play(Create(gc_arrows, run_time=0.5), FadeIn(grandchildren, run_time=0.5))
        self.wait(1.5)

        note = Text(
            "Each level fixes one more position; leaves are complete permutations.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.5)
        self.play(FadeOut(tree_group), FadeOut(note), FadeOut(ch5))
        self.wait(0.2)

        # ── Stage 6: Collecting All Results ───────────────────────────────────
        ch6 = self.chapter_title("Collecting All Results")

        result_title = Text("All permutations of [1, 2, 3]:", font_size=26, color=INK).shift(UP * 2.2)
        self.play(FadeIn(result_title))

        all_perms = [
            [1, 2, 3], [1, 3, 2],
            [2, 1, 3], [2, 3, 1],
            [3, 1, 2], [3, 2, 1],
        ]
        result_rows = VGroup()
        for p in all_perms:
            row_cells = VGroup()
            for v in p:
                rect = Rectangle(
                    width=0.65, height=0.65,
                    fill_color=C_SORTED, fill_opacity=1,
                    color=INK, stroke_width=2,
                )
                lbl = Text(str(v), font_size=20, color=INK, weight=BOLD).move_to(rect)
                row_cells.add(VGroup(rect, lbl))
            row_cells.arrange(RIGHT, buff=0.06)
            result_rows.add(row_cells)

        col_a = VGroup(*result_rows[:3]).arrange(DOWN, buff=0.18)
        col_b = VGroup(*result_rows[3:]).arrange(DOWN, buff=0.18)
        results_grid = VGroup(col_a, col_b).arrange(RIGHT, buff=1.5)
        results_grid.move_to(DOWN * 0.2)

        for i, row in enumerate(result_rows):
            self.play(FadeIn(row, run_time=0.25))
        self.wait(1.5)

        count_note = Text("Total: 3! = 6 permutations", font_size=24, color=COBALT).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(count_note))
        self.wait(1.5)
        self.play(FadeOut(results_grid), FadeOut(result_title), FadeOut(count_note), FadeOut(ch6))
        self.wait(0.2)

        # ── Stage 7: Complexity Card ───────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        card = self.complexity_card(
            time_best=r"O(n \cdot n!)",
            time_avg=r"O(n \cdot n!)",
            time_worst=r"O(n \cdot n!)",
            space=r"O(n)",
        )
        card.move_to(ORIGIN)

        note_text = Text(
            "n! permutations × O(n) to copy each → O(n·n!) total.\nRecursion stack depth is O(n).",
            font_size=22, color=GRAY,
        ).next_to(card, DOWN, buff=0.5)
        self.play(FadeIn(note_text))
        self.wait(2.5)
        self.play(FadeOut(card), FadeOut(note_text), FadeOut(ch7))
