from manim import *
from ...base import AlgoScene, DPTable
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST,
    C_ACTIVE, C_SORTED, C_DEFAULT,
)


class Knapsack01(AlgoScene):
    TITLE = "0/1 Knapsack"
    SUBTITLE = "Maximize value in a knapsack where each item can be taken at most once."
    CATEGORY = "dynamic-programming"

    def build(self):
        # Problem data
        weights = [2, 3, 4, 5]
        values  = [3, 4, 5, 6]
        capacity = 8
        n = len(weights)

        # ── Stage 1: Problem Setup ──────────────────────────────────────────
        stage1 = self.chapter_title("Problem Setup")

        item_group = VGroup()
        for i in range(n):
            box = RoundedRectangle(
                corner_radius=0.12,
                width=1.4, height=1.0,
                color=COBALT, fill_color=MIST, fill_opacity=1,
                stroke_width=2,
            )
            w_lbl = Text(f"w={weights[i]}", font_size=20, color=INK).move_to(
                box.get_center() + UP * 0.18
            )
            v_lbl = Text(f"v={values[i]}", font_size=20, color=CORAL).move_to(
                box.get_center() + DOWN * 0.18
            )
            idx_lbl = Text(f"item {i+1}", font_size=16, color=GRAY).next_to(box, UP, buff=0.1)
            item_group.add(VGroup(box, w_lbl, v_lbl, idx_lbl))

        item_group.arrange(RIGHT, buff=0.4).shift(UP * 0.8)

        cap_text = Text(
            f"Knapsack capacity W = {capacity}",
            font_size=26, color=INK,
        ).shift(DOWN * 1.2)

        goal_text = Text(
            "Goal: maximize total value without exceeding capacity.",
            font_size=22, color=GRAY,
        ).shift(DOWN * 1.9)

        self.play(
            LaggedStart(*[FadeIn(item, shift=UP * 0.25) for item in item_group], lag_ratio=0.15)
        )
        self.wait(0.5)
        self.play(FadeIn(cap_text), FadeIn(goal_text))
        self.wait(1.5)
        self.play(FadeOut(cap_text), FadeOut(goal_text), FadeOut(stage1))

        # ── Stage 2: 0/1 Constraint ────────────────────────────────────────
        stage2 = self.chapter_title("The 0/1 Constraint")

        constraint = VGroup(
            Text("Each item can be taken at most ONCE.", font_size=26, color=CORAL, weight="BOLD"),
            Text("Take it  →  1   |   Leave it  →  0", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.3).shift(DOWN * 1.4)

        binary_labels = VGroup()
        for i, item in enumerate(item_group):
            choice = Text("0 or 1", font_size=18, color=SIGNAL).next_to(item, DOWN, buff=0.15)
            binary_labels.add(choice)

        self.play(FadeIn(constraint, shift=UP * 0.2))
        self.wait(0.6)
        self.play(LaggedStart(*[FadeIn(bl) for bl in binary_labels], lag_ratio=0.15))
        self.wait(1.2)
        self.play(FadeOut(constraint), FadeOut(binary_labels), FadeOut(stage2))

        # ── Stage 3: DP Recurrence ─────────────────────────────────────────
        stage3 = self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[i][w] = \max\!\bigl(\text{dp}[i-1][w],\;"
            r"\text{dp}[i-1][w - \text{wt}_i] + \text{val}_i\bigr)",
            font_size=30, color=INK,
        ).shift(DOWN * 0.5)

        skip_label = Text("dp[i-1][w]  →  skip item i", font_size=20, color=COBALT).shift(DOWN * 1.6)
        take_label = Text(
            "dp[i-1][w - wt_i] + val_i  →  take item i",
            font_size=20, color=CORAL,
        ).shift(DOWN * 2.2)

        condition = Text(
            "(only take if wt_i ≤ w)",
            font_size=18, color=GRAY,
        ).shift(DOWN * 2.8)

        self.play(Write(recurrence))
        self.wait(0.8)
        self.play(FadeIn(skip_label, shift=RIGHT * 0.2))
        self.wait(0.4)
        self.play(FadeIn(take_label, shift=RIGHT * 0.2))
        self.wait(0.4)
        self.play(FadeIn(condition))
        self.wait(1.5)
        self.play(
            FadeOut(recurrence), FadeOut(skip_label),
            FadeOut(take_label), FadeOut(condition),
            FadeOut(stage3),
        )

        # ── Stage 4: Build DP Table ────────────────────────────────────────
        stage4 = self.chapter_title("Building the DP Table")

        # Shift items up for table space
        self.play(item_group.animate.scale(0.75).shift(UP * 0.4))

        # Row labels: items 0..n, col labels: capacity 0..W
        row_labels = ["∅"] + [f"i{i+1}" for i in range(n)]
        col_labels = [str(w) for w in range(capacity + 1)]

        # Compute full DP table
        dp = [[0] * (capacity + 1) for _ in range(n + 1)]
        for i in range(1, n + 1):
            for w in range(capacity + 1):
                dp[i][w] = dp[i - 1][w]
                if weights[i - 1] <= w:
                    dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])

        table = DPTable(
            self,
            rows=n + 1,
            cols=capacity + 1,
            row_labels=row_labels,
            col_labels=col_labels,
            cell_width=0.65,
            cell_height=0.55,
            center=[0.4, -1.2, 0],
            initial=[[0] * (capacity + 1) for _ in range(n + 1)],
        )

        self.wait(0.5)

        # Fill row by row
        for i in range(1, n + 1):
            item_highlight = item_group[i - 1][0].copy().set_stroke(SIGNAL, width=4)
            self.play(FadeIn(item_highlight))
            for w in range(capacity + 1):
                val = dp[i][w]
                color = C_SORTED if val > dp[i - 1][w] else MIST
                table.set_value(i, w, val, color=color, run_time=0.22)
            self.wait(0.4)
            self.play(FadeOut(item_highlight))

        self.wait(1.0)
        self.play(FadeOut(stage4))

        # ── Stage 5: Highlight Optimal Cell ───────────────────────────────
        stage5 = self.chapter_title("Optimal Value")

        optimal = dp[n][capacity]
        table.highlight(n, capacity, color=CORAL, run_time=0.5)
        table.indicate(n, capacity)

        answer_text = Text(
            f"Maximum value = {optimal}",
            font_size=32, color=CORAL, weight="BOLD",
        ).shift(DOWN * 3.5)

        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(1.2)
        self.play(FadeOut(stage5))

        # ── Stage 6: Traceback ─────────────────────────────────────────────
        stage6 = self.chapter_title("Traceback: Which Items?")

        # Trace back through dp table
        selected = []
        w_cur = capacity
        for i in range(n, 0, -1):
            if dp[i][w_cur] != dp[i - 1][w_cur]:
                selected.append(i - 1)  # 0-indexed item
                w_cur -= weights[i - 1]

        selected_text = Text(
            "Selected items: " + ", ".join(f"item {idx+1} (w={weights[idx]}, v={values[idx]})"
                                           for idx in sorted(selected)),
            font_size=20, color=COBALT,
        ).shift(DOWN * 3.0)

        # Highlight selected items in the visual
        for idx in selected:
            glow = item_group[idx][0].copy().set_fill(SIGNAL, opacity=0.7).set_stroke(SIGNAL, width=3)
            self.play(FadeIn(glow), run_time=0.4)

        self.play(FadeOut(answer_text))
        self.play(FadeIn(selected_text, shift=UP * 0.15))
        self.wait(1.5)
        self.play(FadeOut(selected_text), FadeOut(stage6))

        # ── Stage 7: Space Optimization ────────────────────────────────────
        stage7 = self.chapter_title("Space Optimization: 1-D DP")

        self.play(FadeOut(item_group))

        opt_desc = VGroup(
            Text("We only need the previous row to compute the current row.", font_size=22, color=INK),
            Text("Iterate capacity in REVERSE to avoid using updated values.", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.25).shift(UP * 1.2)

        code_lines = VGroup(
            Text("dp = [0] * (W + 1)", font_size=19, color=WHITE),
            Text("for i in range(n):", font_size=19, color=WHITE),
            Text("    for w in range(W, wt[i] - 1, -1):", font_size=19, color=YELLOW_C),
            Text("        dp[w] = max(dp[w], dp[w - wt[i]] + val[i])", font_size=19, color=SIGNAL),
            Text("return dp[W]", font_size=19, color=GREEN_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 0.8)

        self.play(FadeIn(opt_desc, shift=UP * 0.15))
        self.wait(0.6)
        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.2) for line in code_lines], lag_ratio=0.18))
        self.wait(1.0)

        space_note = Text(
            "Space: O(n·W) → O(W)   |   Time stays O(n·W)",
            font_size=22, color=CORAL,
        ).shift(DOWN * 2.5)
        self.play(FadeIn(space_note))
        self.wait(1.2)
        self.play(FadeOut(opt_desc), FadeOut(code_lines), FadeOut(space_note), FadeOut(stage7))

        # ── Stage 8: Complexity Card ───────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_best=r"O(n \cdot W)",
            time_avg=r"O(n \cdot W)",
            time_worst=r"O(n \cdot W)",
            space=r"O(W)",
        )
        self.wait(2)
