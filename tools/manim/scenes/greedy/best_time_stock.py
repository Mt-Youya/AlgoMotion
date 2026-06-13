from manim import *
from ...base import AlgoScene, ArrayVis


class BestTimeStock(AlgoScene):
    TITLE = "Best Time to Buy & Sell Stock II"
    SUBTITLE = "Collect every upward price move for maximum profit from unlimited transactions."
    CATEGORY = "greedy"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        prices = [7, 1, 5, 3, 6, 4]
        price_labels = VGroup(*[
            VGroup(
                Square(side_length=0.8, color=BLUE_D, fill_opacity=0.3),
                Text(str(p), font_size=28)
            ).arrange(ORIGIN)
            for p in prices
        ]).arrange(RIGHT, buff=0.15).move_to(ORIGIN)

        index_labels = VGroup(*[
            Text(f"d{i}", font_size=20, color=GRAY)
            for i in range(len(prices))
        ])
        for i, lbl in enumerate(index_labels):
            lbl.next_to(price_labels[i], DOWN, buff=0.15)

        arr_group = VGroup(price_labels, index_labels)

        prices_title = Text("prices = [7, 1, 5, 3, 6, 4]", font_size=32, color=YELLOW)
        prices_title.to_edge(UP, buff=1.5)

        self.play(Write(prices_title))
        self.play(FadeIn(arr_group, shift=UP * 0.3))
        self.wait(1)

        goal_text = Text(
            "Goal: maximize profit with unlimited buy/sell transactions",
            font_size=26, color=WHITE
        ).next_to(arr_group, DOWN, buff=0.6)
        self.play(Write(goal_text))
        self.wait(1.5)

        # ── Stage 2: Greedy Intuition ───────────────────────────────────────
        self.chapter_title("Greedy Intuition")

        intuition = VGroup(
            Text("Key Insight:", font_size=30, color=GREEN),
            Text("Profit = sum of ALL positive daily differences", font_size=26),
            Text("If prices[i] > prices[i-1], collect that profit!", font_size=26, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        intuition.to_edge(UP, buff=1.5)

        self.play(FadeOut(prices_title), FadeOut(goal_text))
        self.play(Write(intuition))
        self.wait(1.5)

        formula = MathTex(
            r"\text{profit} = \sum_{i=1}^{n-1} \max(0,\; prices[i] - prices[i-1])",
            font_size=36
        ).next_to(arr_group, DOWN, buff=0.8)
        self.play(Write(formula))
        self.wait(2)

        self.play(FadeOut(intuition), FadeOut(formula))

        # ── Stage 3: Bar Chart Visualization ───────────────────────────────
        self.chapter_title("Price Chart")

        bar_heights = [p * 0.35 for p in prices]
        bars = VGroup()
        bar_val_labels = VGroup()
        bar_x_labels = VGroup()

        chart_origin = DOWN * 1.5 + LEFT * 2.5
        bar_width = 0.7

        for i, (h, p) in enumerate(zip(bar_heights, prices)):
            bar = Rectangle(
                width=bar_width,
                height=h,
                fill_color=BLUE_D,
                fill_opacity=0.7,
                stroke_color=BLUE,
            )
            bar.move_to(chart_origin + RIGHT * i * (bar_width + 0.3) + UP * h / 2)
            bars.add(bar)

            val_lbl = Text(str(p), font_size=22).next_to(bar, UP, buff=0.1)
            bar_val_labels.add(val_lbl)

            x_lbl = Text(f"d{i}", font_size=18, color=GRAY).next_to(bar, DOWN, buff=0.1)
            bar_x_labels.add(x_lbl)

        self.play(FadeOut(arr_group))
        self.play(
            LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.15),
            run_time=1.5
        )
        self.play(FadeIn(bar_val_labels), FadeIn(bar_x_labels))
        self.wait(1)

        # ── Stage 4: Highlight Profitable Moves ────────────────────────────
        self.chapter_title("Collecting Upward Moves")

        profit_total = 0
        profit_anims = []

        arrows = VGroup()
        profit_texts = VGroup()

        profitable_pairs = [(1, 2), (3, 4)]  # (buy_day, sell_day) indices

        for buy_i, sell_i in profitable_pairs:
            diff = prices[sell_i] - prices[buy_i]
            profit_total += diff

            arrow = Arrow(
                bars[buy_i].get_top(),
                bars[sell_i].get_top(),
                buff=0.1,
                color=GREEN,
                stroke_width=3,
            )
            arrows.add(arrow)

            p_text = Text(f"+{diff}", font_size=22, color=GREEN)
            p_text.next_to(arrow, UP, buff=0.1)
            profit_texts.add(p_text)

        for arrow, p_text in zip(arrows, profit_texts):
            self.play(GrowArrow(arrow), Write(p_text), run_time=0.8)
            self.wait(0.5)

        total_label = Text(f"Total Profit = {profit_total}", font_size=32, color=YELLOW)
        total_label.to_edge(UP, buff=1.5)
        self.play(Write(total_label))
        self.wait(1.5)

        # ── Stage 5: Step-by-step Greedy Walk ──────────────────────────────
        self.chapter_title("Algorithm Walkthrough")

        self.play(FadeOut(arrows), FadeOut(profit_texts), FadeOut(total_label))

        step_table_data = [
            ("i=1", "1", "7", "1-7=-6", "skip", "0"),
            ("i=2", "5", "1", "5-1=+4", "collect", "4"),
            ("i=3", "3", "5", "3-5=-2", "skip", "4"),
            ("i=4", "6", "3", "6-3=+3", "collect", "7"),
            ("i=5", "4", "6", "4-6=-2", "skip", "7"),
        ]

        headers = ["step", "cur", "prev", "diff", "action", "profit"]
        col_widths = [1.0, 0.8, 0.8, 1.4, 1.2, 1.0]
        header_row = VGroup(*[
            Text(h, font_size=20, color=YELLOW).set_width(w)
            for h, w in zip(headers, col_widths)
        ]).arrange(RIGHT, buff=0.2)
        header_row.to_edge(UP, buff=1.5)

        self.play(FadeOut(bars), FadeOut(bar_val_labels), FadeOut(bar_x_labels))
        self.play(Write(header_row))

        row_groups = []
        for row_data in step_table_data:
            row = VGroup(*[
                Text(cell, font_size=18, color=WHITE if i < 4 else (GREEN if "collect" in cell else RED_D)).set_width(w)
                for i, (cell, w) in enumerate(zip(row_data, col_widths))
            ]).arrange(RIGHT, buff=0.2)
            row_groups.append(row)

        rows_vgroup = VGroup(*row_groups).arrange(DOWN, buff=0.25)
        rows_vgroup.next_to(header_row, DOWN, buff=0.3)

        for row in row_groups:
            self.play(FadeIn(row, shift=RIGHT * 0.2), run_time=0.5)
            self.wait(0.4)

        self.wait(1)

        # ── Stage 6: Code Snippet ───────────────────────────────────────────
        self.chapter_title("Python Implementation")

        self.play(FadeOut(header_row), FadeOut(rows_vgroup))

        code_str = """def maxProfit(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]
    return profit"""

        code_obj = Code(
            code=code_str,
            tab_width=4,
            background="window",
            language="Python",
            font_size=28,
        )
        code_obj.move_to(ORIGIN)

        self.play(FadeIn(code_obj, shift=UP * 0.3))
        self.wait(1)

        highlight = SurroundingRectangle(code_obj.code[3], color=YELLOW, buff=0.05)
        self.play(Create(highlight))
        note = Text("Collect profit on every upward step", font_size=22, color=YELLOW)
        note.next_to(code_obj, DOWN, buff=0.4)
        self.play(Write(note))
        self.wait(2)

        self.play(FadeOut(code_obj), FadeOut(highlight), FadeOut(note))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(time="O(n)", space="O(1)")
        self.wait(2)
