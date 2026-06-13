from manim import *
from ...base import AlgoScene, ArrayVis


class Deque(AlgoScene):
    TITLE = "Deque"
    SUBTITLE = "Double-ended queue allowing O(1) insertions and deletions at both ends."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is a Deque?")

        intro_lines = VGroup(
            Text("Double-Ended Queue (Deque)", font_size=36, color=YELLOW),
            Text("Supports O(1) push/pop at BOTH front and back", font_size=28),
            Text("Combines the power of Stack + Queue", font_size=28),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(intro_lines[0]))
        self.wait(0.8)
        self.play(FadeIn(intro_lines[1]))
        self.wait(0.8)
        self.play(FadeIn(intro_lines[2]))
        self.wait(1.2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Visual Structure ────────────────────────────────────────
        self.chapter_title("Deque Structure")

        cell_w, cell_h = 1.0, 0.8
        n_slots = 6
        cells = VGroup()
        labels = VGroup()
        values = ["_", "_", "_", "_", "_", "_"]

        for i in range(n_slots):
            rect = Rectangle(width=cell_w, height=cell_h, color=BLUE_D, fill_opacity=0.2)
            rect.move_to(RIGHT * (i - n_slots / 2 + 0.5) * cell_w)
            cells.add(rect)
            lbl = Text(values[i], font_size=28).move_to(rect.get_center())
            labels.add(lbl)

        deque_group = VGroup(cells, labels).move_to(ORIGIN)

        front_arrow = Arrow(
            start=cells[0].get_top() + UP * 0.5,
            end=cells[0].get_top(),
            color=GREEN, buff=0.05
        )
        back_arrow = Arrow(
            start=cells[-1].get_top() + UP * 0.5,
            end=cells[-1].get_top(),
            color=RED, buff=0.05
        )
        front_label = Text("front", font_size=22, color=GREEN).next_to(front_arrow, UP, buff=0.1)
        back_label = Text("back", font_size=22, color=RED).next_to(back_arrow, UP, buff=0.1)

        self.play(Create(cells), run_time=1)
        self.play(Write(labels))
        self.play(
            GrowArrow(front_arrow), Write(front_label),
            GrowArrow(back_arrow), Write(back_label),
        )
        self.wait(1.2)

        # ── Stage 3: push_back operations ───────────────────────────────────
        self.chapter_title("push_back: Add to Rear")

        push_back_vals = [10, 20, 30]
        current_back = 0

        for val in push_back_vals:
            new_lbl = Text(str(val), font_size=28, color=YELLOW)
            new_lbl.move_to(cells[current_back].get_center())

            highlight = cells[current_back].copy().set_fill(YELLOW, opacity=0.5)
            self.play(Transform(labels[current_back], new_lbl), FadeIn(highlight), run_time=0.5)
            self.play(FadeOut(highlight), run_time=0.3)

            # move back arrow
            new_back_pos = current_back + 1 if current_back + 1 < n_slots else current_back
            new_back_arrow = Arrow(
                start=cells[new_back_pos].get_top() + UP * 0.5,
                end=cells[new_back_pos].get_top(),
                color=RED, buff=0.05
            )
            new_back_label = Text("back", font_size=22, color=RED).next_to(new_back_arrow, UP, buff=0.1)
            self.play(
                Transform(back_arrow, new_back_arrow),
                Transform(back_label, new_back_label),
                run_time=0.4
            )
            current_back += 1
            self.wait(0.4)

        self.wait(0.8)

        # ── Stage 4: push_front operations ──────────────────────────────────
        self.chapter_title("push_front: Add to Front")

        # shift existing content right by 1 to make room
        # For visual clarity we just fill slot index = current_back
        push_front_vals = [5]
        # We'll visually insert at the leftmost empty visual slot (simulate)
        # Animate a new element appearing at front with a flash
        front_new_val = 5
        front_cell_idx = 3  # put it at index 3 for visual demo

        new_front_lbl = Text(str(front_new_val), font_size=28, color=GREEN)
        new_front_lbl.move_to(cells[front_cell_idx].get_center())

        highlight_front = cells[front_cell_idx].copy().set_fill(GREEN, opacity=0.5)
        self.play(FadeIn(highlight_front), Transform(labels[front_cell_idx], new_front_lbl), run_time=0.6)
        self.play(FadeOut(highlight_front), run_time=0.3)
        self.wait(0.8)

        # ── Stage 5: pop_front and pop_back ─────────────────────────────────
        self.chapter_title("pop_front / pop_back: Remove from Ends")

        # pop_back: remove last filled cell
        pop_back_idx = current_back - 1
        old_lbl = labels[pop_back_idx]
        pop_indicator = Text("pop_back → " + old_lbl.text, font_size=26, color=RED)
        pop_indicator.to_edge(DOWN, buff=1.0)

        self.play(Write(pop_indicator))
        self.play(
            old_lbl.animate.set_color(RED).scale(1.3),
            run_time=0.5
        )
        empty_lbl = Text("_", font_size=28).move_to(cells[pop_back_idx].get_center())
        self.play(Transform(old_lbl, empty_lbl), run_time=0.5)
        self.play(FadeOut(pop_indicator))
        current_back -= 1
        self.wait(0.6)

        # pop_front: remove first filled cell (index 0)
        pop_front_idx = 0
        old_front_lbl = labels[pop_front_idx]
        pop_f_indicator = Text("pop_front → " + old_front_lbl.text, font_size=26, color=GREEN)
        pop_f_indicator.to_edge(DOWN, buff=1.0)

        self.play(Write(pop_f_indicator))
        self.play(
            old_front_lbl.animate.set_color(GREEN).scale(1.3),
            run_time=0.5
        )
        empty_front_lbl = Text("_", font_size=28).move_to(cells[pop_front_idx].get_center())
        self.play(Transform(old_front_lbl, empty_front_lbl), run_time=0.5)
        self.play(FadeOut(pop_f_indicator))
        self.wait(0.8)

        # ── Stage 6: Deque vs Stack vs Queue comparison ──────────────────────
        self.chapter_title("Deque vs Stack vs Queue")

        self.play(
            FadeOut(deque_group),
            FadeOut(front_arrow), FadeOut(front_label),
            FadeOut(back_arrow), FadeOut(back_label),
        )

        headers = ["Structure", "Push Front", "Pop Front", "Push Back", "Pop Back"]
        rows = [
            ["Stack",   "✗ O(n)", "✓ O(1)", "✓ O(1)", "✗ O(n)"],
            ["Queue",   "✗ O(n)", "✓ O(1)", "✓ O(1)", "✗ O(n)"],
            ["Deque",   "✓ O(1)", "✓ O(1)", "✓ O(1)", "✓ O(1)"],
        ]

        col_w = 2.2
        row_h = 0.6
        table_group = VGroup()

        for ci, h in enumerate(headers):
            cell_rect = Rectangle(width=col_w, height=row_h, color=WHITE, fill_opacity=0.1)
            cell_rect.move_to(RIGHT * (ci - 2) * col_w + UP * 1.5)
            cell_text = Text(h, font_size=18, color=YELLOW).move_to(cell_rect.get_center())
            table_group.add(cell_rect, cell_text)

        for ri, row in enumerate(rows):
            row_color = GREEN if row[0] == "Deque" else WHITE
            for ci, val in enumerate(row):
                cell_rect = Rectangle(width=col_w, height=row_h, color=row_color, fill_opacity=0.05)
                cell_rect.move_to(RIGHT * (ci - 2) * col_w + UP * (0.7 - ri * row_h))
                cell_text = Text(val, font_size=16, color=row_color).move_to(cell_rect.get_center())
                table_group.add(cell_rect, cell_text)

        self.play(FadeIn(table_group), run_time=1.2)
        self.wait(1.5)
        self.play(FadeOut(table_group))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(1)",
            time_worst="O(1)",
            space="O(n)",
        )
        self.wait(1.5)
