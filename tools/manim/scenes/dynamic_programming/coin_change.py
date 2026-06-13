from manim import *
from ...base import AlgoScene, DPTable


class CoinChange(AlgoScene):
    TITLE = "Coin Change"
    SUBTITLE = "Find minimum number of coins needed to make up a given amount."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        coins = [1, 3, 4]
        amount = 6

        coins_label = Text("Coins:", font_size=32, color=WHITE).to_edge(LEFT).shift(UP * 2)
        coins_values = VGroup(*[
            Square(side_length=0.7, color=BLUE, fill_opacity=0.4).add(
                Text(str(c), font_size=26, color=WHITE)
            )
            for c in coins
        ]).arrange(RIGHT, buff=0.2).next_to(coins_label, RIGHT, buff=0.3)

        amount_label = Text(f"Amount: {amount}", font_size=32, color=YELLOW).next_to(
            coins_label, DOWN, buff=0.5
        ).align_to(coins_label, LEFT)

        goal_label = Text(
            "Goal: minimum number of coins to make amount",
            font_size=26, color=GREEN
        ).next_to(amount_label, DOWN, buff=0.4).align_to(amount_label, LEFT)

        self.play(Write(coins_label), LaggedStart(*[FadeIn(sq) for sq in coins_values], lag_ratio=0.15))
        self.wait(0.8)
        self.play(Write(amount_label))
        self.wait(0.5)
        self.play(Write(goal_label))
        self.wait(1.2)

        self.play(FadeOut(coins_label), FadeOut(coins_values),
                  FadeOut(amount_label), FadeOut(goal_label))

        # ── Stage 2: DP Table Initialization ────────────────────────────────
        self.chapter_title("Initialize DP Array")

        dp_size = amount + 1
        INF = amount + 1

        dp_vals = [INF] * dp_size
        dp_vals[0] = 0

        cell_width = 0.9
        cells = VGroup()
        index_labels = VGroup()
        val_texts = []

        for i in range(dp_size):
            cell = Square(side_length=cell_width, color=WHITE, fill_opacity=0.1)
            val = Text("∞" if dp_vals[i] == INF else str(dp_vals[i]), font_size=24, color=WHITE)
            val.move_to(cell.get_center())
            idx = Text(str(i), font_size=20, color=GRAY).next_to(cell, DOWN, buff=0.1)
            cells.add(VGroup(cell, val))
            index_labels.add(idx)
            val_texts.append(val)

        cells.arrange(RIGHT, buff=0.05)
        for i, idx in enumerate(index_labels):
            idx.next_to(cells[i], DOWN, buff=0.1)

        table_group = VGroup(cells, index_labels).move_to(ORIGIN)

        dp_header = Text("dp[0..amount]", font_size=28, color=YELLOW).next_to(table_group, UP, buff=0.4)
        init_note = Text("dp[0] = 0,  dp[i] = ∞  for i > 0", font_size=24, color=GRAY).next_to(
            table_group, DOWN, buff=0.6
        )

        self.play(Write(dp_header))
        self.play(LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.1))
        self.play(LaggedStart(*[FadeIn(idx) for idx in index_labels], lag_ratio=0.1))
        self.wait(0.5)
        self.play(Write(init_note))
        self.wait(1.0)

        # Highlight dp[0] = 0
        self.play(cells[0][0].animate.set_fill(GREEN, opacity=0.5))
        self.wait(0.8)

        self.play(FadeOut(init_note))

        # ── Stage 3: Fill dp[1] ──────────────────────────────────────────────
        self.chapter_title("Fill dp[1]")

        coin_note = Text(f"Coins: {coins}", font_size=26, color=BLUE).to_edge(UP).shift(DOWN * 0.3)
        self.play(Write(coin_note))
        self.wait(0.3)

        # dp[1]: try coin 1 → dp[1-1]+1 = 1
        step_text = Text("dp[1] = min(∞, dp[1-1]+1) = min(∞, 1) = 1", font_size=22, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
        self.play(Write(step_text))
        self.play(cells[1][0].animate.set_fill(BLUE, opacity=0.4))
        new_val = Text("1", font_size=24, color=YELLOW)
        new_val.move_to(cells[1][0].get_center())
        self.play(Transform(val_texts[1], new_val))
        dp_vals[1] = 1
        self.wait(0.8)
        self.play(FadeOut(step_text))

        # ── Stage 4: Fill dp[2] through dp[4] ───────────────────────────────
        self.chapter_title("Fill dp[2] to dp[4]")

        updates = {
            2: ("dp[2] = min(∞, dp[2-1]+1) = 2", 2),
            3: ("dp[3] = min(∞, dp[3-1]+1, dp[3-3]+1) = min(2, 1) = 1", 1),
            4: ("dp[4] = min(∞, dp[4-1]+1, dp[4-3]+1, dp[4-4]+1) = 1", 1),
        }

        for idx, (msg, result) in updates.items():
            step_text = Text(msg, font_size=20, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            self.play(Write(step_text))
            self.play(cells[idx][0].animate.set_fill(BLUE, opacity=0.4))
            new_val = Text(str(result), font_size=24, color=YELLOW)
            new_val.move_to(cells[idx][0].get_center())
            self.play(Transform(val_texts[idx], new_val))
            dp_vals[idx] = result
            self.wait(0.7)
            self.play(FadeOut(step_text))

        # ── Stage 5: Fill dp[5] and dp[6] ───────────────────────────────────
        self.chapter_title("Fill dp[5] and dp[6]")

        final_updates = {
            5: ("dp[5] = min(dp[4]+1, dp[2]+1) = min(2,3) = 2", 2),
            6: ("dp[6] = min(dp[5]+1, dp[3]+1, dp[2]+1) = min(3,2,3) = 2", 2),
        }

        for idx, (msg, result) in final_updates.items():
            step_text = Text(msg, font_size=20, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            self.play(Write(step_text))
            self.play(cells[idx][0].animate.set_fill(BLUE, opacity=0.4))
            new_val = Text(str(result), font_size=24, color=YELLOW)
            new_val.move_to(cells[idx][0].get_center())
            self.play(Transform(val_texts[idx], new_val))
            dp_vals[idx] = result
            self.wait(0.7)
            self.play(FadeOut(step_text))

        self.wait(0.5)

        # Highlight the answer cell
        answer_arrow = Arrow(
            cells[amount].get_top() + UP * 0.6,
            cells[amount].get_top(),
            color=GREEN, buff=0.05
        )
        answer_label = Text(f"Answer: {dp_vals[amount]}", font_size=28, color=GREEN).next_to(
            answer_arrow, UP, buff=0.1
        )
        self.play(GrowArrow(answer_arrow), Write(answer_label))
        self.wait(1.2)

        self.play(FadeOut(answer_arrow), FadeOut(answer_label), FadeOut(coin_note))

        # ── Stage 6: Recurrence Relation ────────────────────────────────────
        self.chapter_title("Recurrence Relation")

        self.play(FadeOut(cells), FadeOut(index_labels), FadeOut(dp_header))

        recurrence = VGroup(
            Text("dp[0] = 0", font_size=30, color=GREEN),
            Text("dp[i] = min(dp[i - c] + 1)  for each coin c ≤ i", font_size=28, color=WHITE),
            Text("dp[i] = ∞  if no coin can reach i", font_size=26, color=GRAY),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in recurrence:
            self.play(Write(line))
            self.wait(0.5)
        self.wait(1.0)

        self.play(FadeOut(recurrence))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(amount × |coins|)",
            space_complexity="O(amount)",
        )
        self.wait(1.5)
