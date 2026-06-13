from manim import *
from ...base import AlgoScene, ArrayVis, DPTable


class Triangle(AlgoScene):
    TITLE = "Triangle"
    SUBTITLE = "Find minimum path sum from top to bottom of a triangle."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro — show the triangle ─────────────────────────────
        self.chapter_title("Problem Setup")

        triangle_data = [
            [2],
            [3, 4],
            [6, 5, 7],
            [4, 1, 8, 3],
        ]

        intro_text = Text(
            "Given a triangle, find the minimum path sum top to bottom.",
            font_size=22,
            color=LIGHT_GRAY,
        ).shift(DOWN * 3.0)

        self.play(FadeIn(intro_text))
        self.wait(0.8)

        # Build visual triangle cells
        cell_map = {}   # (row, col) -> (box, label)
        all_cells = VGroup()
        row_groups = []

        for r, row in enumerate(triangle_data):
            row_group = VGroup()
            for c, val in enumerate(row):
                box = Square(side_length=0.75, color=BLUE_D, fill_opacity=0.25)
                # Center each row horizontally
                x_offset = (c - len(row) / 2.0 + 0.5) * 1.0
                y_offset = 1.8 - r * 1.1
                box.move_to(RIGHT * x_offset + UP * y_offset)
                lbl = Text(str(val), font_size=24).move_to(box.get_center())
                cell_map[(r, c)] = (box, lbl)
                row_group.add(box, lbl)
                all_cells.add(box, lbl)
            row_groups.append(row_group)

        self.play(
            LaggedStart(
                *[FadeIn(row_groups[r], shift=DOWN * 0.2) for r in range(len(triangle_data))],
                lag_ratio=0.3,
            )
        )
        self.wait(1)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Explain adjacency — which moves are valid ─────────────
        self.chapter_title("Valid Moves")

        move_label = Text(
            "From position (r, c) you can move to (r+1, c) or (r+1, c+1)",
            font_size=20,
            color=TEAL_C,
        ).shift(DOWN * 2.8)

        self.play(FadeIn(move_label))

        # Draw arrows from row 0 to row 1
        example_arrows = VGroup()
        for c in range(len(triangle_data[0])):
            box_from = cell_map[(0, c)][0]
            for dc in [0, 1]:
                nc = c + dc
                if 0 <= nc < len(triangle_data[1]):
                    box_to = cell_map[(1, nc)][0]
                    arr = Arrow(
                        box_from.get_bottom(),
                        box_to.get_top(),
                        buff=0.08,
                        color=YELLOW,
                        stroke_width=2,
                        max_tip_length_to_length_ratio=0.2,
                    )
                    example_arrows.add(arr)

        self.play(LaggedStart(*[GrowArrow(a) for a in example_arrows], lag_ratio=0.2))
        self.wait(1.2)
        self.play(FadeOut(example_arrows), FadeOut(move_label))

        # ── Stage 3: DP recurrence ──────────────────────────────────────────
        self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[r][c] = \text{tri}[r][c] + \min(\text{dp}[r+1][c],\; \text{dp}[r+1][c+1])",
            font_size=28,
            color=YELLOW,
        ).shift(DOWN * 2.2)

        base_case = Text(
            "Base case: last row dp values equal triangle values.",
            font_size=20,
            color=GREEN_C,
        ).shift(DOWN * 3.0)

        direction_note = Text(
            "We fill dp bottom-up, starting from the last row.",
            font_size=20,
            color=LIGHT_GRAY,
        ).shift(DOWN * 3.6)

        self.play(Write(recurrence))
        self.wait(0.6)
        self.play(FadeIn(base_case, shift=UP * 0.2))
        self.wait(0.6)
        self.play(FadeIn(direction_note, shift=UP * 0.2))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(base_case), FadeOut(direction_note))

        # ── Stage 4: Initialize last row ────────────────────────────────────
        self.chapter_title("Initialize Last Row")

        last_row = len(triangle_data) - 1
        dp = [[0] * len(row) for row in triangle_data]
        for c in range(len(triangle_data[last_row])):
            dp[last_row][c] = triangle_data[last_row][c]

        dp_boxes = {}
        dp_labels_map = {}
        dp_vis_group = VGroup()

        for r, row in enumerate(triangle_data):
            for c in range(len(row)):
                x_offset = (c - len(row) / 2.0 + 0.5) * 1.0
                y_offset = 1.8 - r * 1.1 - 2.8
                dp_box = Square(side_length=0.75, color=YELLOW_D, fill_opacity=0.15)
                dp_box.move_to(RIGHT * x_offset + UP * y_offset)
                dp_lbl = Text("?", font_size=22, color=YELLOW).move_to(dp_box.get_center())
                dp_boxes[(r, c)] = dp_box
                dp_labels_map[(r, c)] = dp_lbl
                dp_vis_group.add(dp_box, dp_lbl)

        dp_title = Text("dp[][]", font_size=20, color=YELLOW).shift(LEFT * 3.5 + DOWN * 1.2)
        self.play(FadeIn(dp_title))
        self.play(FadeIn(dp_vis_group, shift=DOWN * 0.2))
        self.wait(0.5)

        # Fill last row with actual values
        for c in range(len(triangle_data[last_row])):
            new_lbl = Text(
                str(dp[last_row][c]), font_size=22, color=YELLOW
            ).move_to(dp_boxes[(last_row, c)].get_center())
            highlight = dp_boxes[(last_row, c)].copy().set_fill(TEAL, opacity=0.5)
            self.play(
                Transform(dp_boxes[(last_row, c)], highlight),
                Transform(dp_labels_map[(last_row, c)], new_lbl),
                run_time=0.4,
            )

        init_note = Text(
            "Last row is copied directly from the triangle.",
            font_size=20,
            color=TEAL_C,
        ).shift(DOWN * 3.5)
        self.play(FadeIn(init_note))
        self.wait(1.2)
        self.play(FadeOut(init_note))

        # ── Stage 5: Fill DP bottom-up ──────────────────────────────────────
        self.chapter_title("Bottom-Up Fill")

        for r in range(last_row - 1, -1, -1):
            for c in range(len(triangle_data[r])):
                dp[r][c] = triangle_data[r][c] + min(dp[r + 1][c], dp[r + 1][c + 1])

                # Highlight the two children
                child_left = dp_boxes[(r + 1, c)].copy().set_fill(ORANGE, opacity=0.6)
                child_right = dp_boxes[(r + 1, c + 1)].copy().set_fill(ORANGE, opacity=0.6)

                self.play(
                    Transform(dp_boxes[(r + 1, c)], child_left),
                    Transform(dp_boxes[(r + 1, c + 1)], child_right),
                    run_time=0.3,
                )

                new_lbl = Text(
                    str(dp[r][c]), font_size=22, color=YELLOW
                ).move_to(dp_boxes[(r, c)].get_center())
                filled_box = dp_boxes[(r, c)].copy().set_fill(GREEN_D, opacity=0.5)

                self.play(
                    Transform(dp_boxes[(r, c)], filled_box),
                    Transform(dp_labels_map[(r, c)], new_lbl),
                    run_time=0.45,
                )
                self.wait(0.25)

                # Restore children color
                restored_left = dp_boxes[(r + 1, c)].copy().set_fill(TEAL, opacity=0.5)
                restored_right = dp_boxes[(r + 1, c + 1)].copy().set_fill(TEAL, opacity=0.5)
                self.play(
                    Transform(dp_boxes[(r + 1, c)], restored_left),
                    Transform(dp_boxes[(r + 1, c + 1)], restored_right),
                    run_time=0.2,
                )

        self.wait(1)

        # ── Stage 6: Highlight the answer and trace path ────────────────────
        self.chapter_title("Minimum Path")

        answer_val = dp[0][0]
        answer_box = SurroundingRectangle(dp_boxes[(0, 0)], color=GREEN, buff=0.1)
        answer_text = Text(
            f"Minimum Path Sum: {answer_val}",
            font_size=28,
            color=GREEN_C,
        ).shift(DOWN * 3.5)

        self.play(Create(answer_box))
        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(0.8)

        # Trace the optimal path greedily
        path = []
        r, c = 0, 0
        while r < len(triangle_data):
            path.append((r, c))
            if r < last_row:
                if dp[r + 1][c] <= dp[r + 1][c + 1]:
                    c = c
                else:
                    c = c + 1
                r += 1
            else:
                break

        for (pr, pc) in path:
            glow_box = cell_map[(pr, pc)][0].copy().set_fill(GREEN, opacity=0.8).set_stroke(GREEN, width=4)
            self.play(Transform(cell_map[(pr, pc)][0], glow_box), run_time=0.4)

        path_vals = [triangle_data[pr][pc] for (pr, pc) in path]
        path_label = Text(
            "Path: " + " → ".join(str(v) for v in path_vals) + f" = {sum(path_vals)}",
            font_size=22,
            color=GREEN_B,
        ).shift(DOWN * 4.0)
        self.play(FadeIn(path_label))
        self.wait(1.5)

        self.play(
            FadeOut(answer_box),
            FadeOut(answer_text),
            FadeOut(path_label),
            FadeOut(dp_title),
            FadeOut(dp_vis_group),
        )

        # ── Stage 7: Space optimization — in-place ──────────────────────────
        self.chapter_title("Space Optimization")

        opt_text = VGroup(
            Text("Modify the triangle in-place (or use a 1D dp array).", font_size=22, color=TEAL_C),
            Text("Only the current and next row are needed at any time.", font_size=20, color=LIGHT_GRAY),
        ).arrange(DOWN, buff=0.3).shift(UP * 0.5)

        code_lines = VGroup(
            Text("dp = triangle[-1][:]", font_size=19, color=WHITE),
            Text("for row in range(len(triangle)-2, -1, -1):", font_size=19, color=WHITE),
            Text("    for col in range(len(triangle[row])):", font_size=19, color=WHITE),
            Text("        dp[col] = triangle[row][col] + min(dp[col], dp[col+1])", font_size=19, color=YELLOW),
            Text("return dp[0]", font_size=19, color=GREEN_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).shift(DOWN * 1.5)

        self.play(FadeIn(opt_text, shift=UP * 0.2))
        self.wait(0.8)
        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.2) for line in code_lines], lag_ratio=0.2))
        self.wait(1.2)

        space_note = Text("O(n) space for 1D dp  vs  O(n²) for full table", font_size=21, color=ORANGE).shift(DOWN * 3.2)
        self.play(FadeIn(space_note))
        self.wait(1)
        self.play(FadeOut(opt_text), FadeOut(code_lines), FadeOut(space_note))

        # ── Stage 8: Complexity card ────────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(time="O(n²)", space="O(n)")
        self.wait(2)
