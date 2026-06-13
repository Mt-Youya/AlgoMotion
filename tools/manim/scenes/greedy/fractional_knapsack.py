from manim import *
from ...base import AlgoScene, ArrayVis


class FractionalKnapsack(AlgoScene):
    TITLE = "Fractional Knapsack"
    SUBTITLE = "Maximize knapsack value by taking fractions of items, prioritized by value/weigh"
    CATEGORY = "greedy"

    def build(self):
        # ── Stage 1: Problem Setup ────────────────────────────────────────
        self.chapter_title("Problem Setup")

        items = [
            {"name": "A", "weight": 10, "value": 60},
            {"name": "B", "weight": 20, "value": 100},
            {"name": "C", "weight": 30, "value": 120},
        ]
        capacity = 50

        intro_text = Text(
            f"Knapsack capacity: {capacity} kg\n"
            "Select items (or fractions) to maximize total value.",
            font_size=28,
            color=WHITE,
        ).to_edge(UP, buff=1.0)
        self.play(FadeIn(intro_text))
        self.wait(1.5)

        # Draw item table
        headers = ["Item", "Weight (kg)", "Value ($)", "Ratio ($/kg)"]
        header_row = VGroup(
            *[
                Text(h, font_size=20, color=YELLOW).set_width(2.5)
                for h in headers
            ]
        ).arrange(RIGHT, buff=0.2).shift(DOWN * 0.3)

        rows = VGroup()
        for item in items:
            ratio = item["value"] / item["weight"]
            cells = VGroup(
                Text(item["name"], font_size=20, color=WHITE).set_width(2.5),
                Text(str(item["weight"]), font_size=20, color=WHITE).set_width(2.5),
                Text(str(item["value"]), font_size=20, color=WHITE).set_width(2.5),
                Text(f"{ratio:.1f}", font_size=20, color=BLUE).set_width(2.5),
            ).arrange(RIGHT, buff=0.2)
            rows.add(cells)

        rows.arrange(DOWN, buff=0.25).next_to(header_row, DOWN, buff=0.3)
        divider = Line(
            header_row.get_left() + LEFT * 0.1,
            header_row.get_right() + RIGHT * 0.1,
            color=GRAY,
        ).next_to(header_row, DOWN, buff=0.1)

        self.play(Write(header_row))
        self.play(Create(divider))
        for row in rows:
            self.play(FadeIn(row), run_time=0.5)
        self.wait(1.5)

        self.play(FadeOut(intro_text), FadeOut(header_row), FadeOut(divider), FadeOut(rows))

        # ── Stage 2: Compute Value/Weight Ratios ─────────────────────────
        self.chapter_title("Step 1 — Compute Ratios")

        ratio_note = Text(
            "Key insight: prioritize items with highest value-per-kg ratio",
            font_size=24,
            color=YELLOW,
        ).to_edge(UP, buff=1.0)
        self.play(Write(ratio_note))
        self.wait(1.0)

        item_colors = [BLUE, GREEN, ORANGE]
        ratio_bars = VGroup()
        ratio_labels = VGroup()

        for i, item in enumerate(items):
            ratio = item["value"] / item["weight"]
            bar = Rectangle(
                width=ratio * 0.5,
                height=0.6,
                fill_color=item_colors[i],
                fill_opacity=0.8,
                stroke_color=item_colors[i],
            )
            lbl = Text(
                f"Item {item['name']}: {ratio:.1f} $/kg",
                font_size=20,
                color=WHITE,
            ).next_to(bar, RIGHT, buff=0.2)
            group = VGroup(bar, lbl)
            ratio_bars.add(bar)
            ratio_labels.add(lbl)

        display = VGroup()
        for i in range(len(items)):
            display.add(VGroup(ratio_bars[i], ratio_labels[i]))
        display.arrange(DOWN, aligned_edge=LEFT, buff=0.4).center().shift(DOWN * 0.3)

        for grp in display:
            self.play(GrowFromEdge(grp[0], LEFT), Write(grp[1]), run_time=0.7)
            self.wait(0.4)
        self.wait(1.5)
        self.play(FadeOut(ratio_note), FadeOut(display))

        # ── Stage 3: Sort by Ratio ────────────────────────────────────────
        self.chapter_title("Step 2 — Sort Items by Ratio (Descending)")

        sorted_items = sorted(items, key=lambda x: x["value"] / x["weight"], reverse=True)

        sort_note = Text(
            "Sorted order: A (6.0) → B (5.0) → C (4.0)",
            font_size=24,
            color=YELLOW,
        ).to_edge(UP, buff=1.0)
        self.play(Write(sort_note))
        self.wait(0.8)

        sorted_display = VGroup()
        for i, item in enumerate(sorted_items):
            ratio = item["value"] / item["weight"]
            card = VGroup(
                Rectangle(width=2.8, height=1.4, fill_color=item_colors[i], fill_opacity=0.3, stroke_color=item_colors[i]),
                Text(f"Item {item['name']}", font_size=22, color=WHITE),
                Text(f"W={item['weight']}  V={item['value']}", font_size=18, color=GRAY),
                Text(f"Ratio: {ratio:.1f}", font_size=20, color=YELLOW),
            )
            card[1].move_to(card[0].get_center() + UP * 0.3)
            card[2].move_to(card[0].get_center())
            card[3].move_to(card[0].get_center() + DOWN * 0.3)
            sorted_display.add(card)

        sorted_display.arrange(RIGHT, buff=0.5).center().shift(DOWN * 0.3)
        for card in sorted_display:
            self.play(FadeIn(card), run_time=0.6)
            self.wait(0.3)
        self.wait(1.5)
        self.play(FadeOut(sort_note), FadeOut(sorted_display))

        # ── Stage 4: Greedy Fill ──────────────────────────────────────────
        self.chapter_title("Step 3 — Fill Knapsack Greedily")

        capacity_bar_bg = Rectangle(
            width=7.0, height=0.8,
            fill_color=DARK_GRAY, fill_opacity=1.0,
            stroke_color=GRAY,
        ).to_edge(DOWN, buff=1.5)
        cap_label = Text(f"Capacity: {capacity} kg", font_size=20, color=GRAY).next_to(capacity_bar_bg, UP, buff=0.15)
        self.play(Create(capacity_bar_bg), Write(cap_label))

        remaining = capacity
        fill_x = capacity_bar_bg.get_left()[0]
        total_value = 0.0
        fill_colors = [BLUE, GREEN, ORANGE]
        fill_segments = VGroup()

        for i, item in enumerate(sorted_items):
            if remaining <= 0:
                break
            fraction = min(1.0, remaining / item["weight"])
            taken_weight = fraction * item["weight"]
            taken_value = fraction * item["value"]
            total_value += taken_value
            remaining -= taken_weight

            seg_width = (taken_weight / capacity) * 7.0
            seg = Rectangle(
                width=seg_width,
                height=0.8,
                fill_color=fill_colors[i],
                fill_opacity=0.85,
                stroke_width=0,
            )
            seg.move_to(
                np.array([fill_x + seg_width / 2, capacity_bar_bg.get_center()[1], 0])
            )
            fill_x += seg_width

            frac_text = (
                f"Item {item['name']}: {fraction*100:.0f}%  (+{taken_value:.0f}$)"
            )
            step_label = Text(frac_text, font_size=20, color=fill_colors[i]).to_edge(UP, buff=1.2)
            self.play(Write(step_label))
            self.play(GrowFromEdge(seg, LEFT), run_time=0.8)
            fill_segments.add(seg)
            self.wait(0.8)
            self.play(FadeOut(step_label))

        result_label = Text(
            f"Total Value: {total_value:.0f} $  |  Used: {capacity - remaining:.0f}/{capacity} kg",
            font_size=24,
            color=GREEN,
        ).to_edge(UP, buff=1.0)
        self.play(Write(result_label))
        self.wait(2.0)
        self.play(
            FadeOut(capacity_bar_bg),
            FadeOut(cap_label),
            FadeOut(fill_segments),
            FadeOut(result_label),
        )

        # ── Stage 5: Algorithm Pseudocode ─────────────────────────────────
        self.chapter_title("Algorithm Walkthrough")

        pseudo = VGroup(
            Text("1. Compute ratio = value / weight for each item", font_size=21, color=WHITE),
            Text("2. Sort items by ratio in descending order", font_size=21, color=YELLOW),
            Text("3. remaining = capacity", font_size=21, color=WHITE),
            Text("4. For each item in sorted order:", font_size=21, color=WHITE),
            Text("   a. If item.weight ≤ remaining:", font_size=21, color=GREEN),
            Text("      take whole item; remaining -= item.weight", font_size=21, color=GREEN),
            Text("   b. Else:", font_size=21, color=ORANGE),
            Text("      take fraction = remaining / item.weight", font_size=21, color=ORANGE),
            Text("      break (knapsack full)", font_size=21, color=RED),
            Text("5. Return total value accumulated", font_size=21, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).center()

        for line in pseudo:
            self.play(Write(line), run_time=0.5)
            self.wait(0.3)
        self.wait(2.0)
        self.play(FadeOut(pseudo))

        # ── Stage 6: Why Greedy Works ─────────────────────────────────────
        self.chapter_title("Why Greedy is Optimal")

        proof_lines = VGroup(
            Text("Exchange Argument:", font_size=24, color=YELLOW),
            Text("Suppose an optimal solution takes less of item i (high ratio)", font_size=21, color=WHITE),
            Text("and more of item j (low ratio) to fill the same weight.", font_size=21, color=WHITE),
            Text("Replacing j-fraction with i-fraction increases total value.", font_size=21, color=GREEN),
            Text("→ Greedy always picks the best ratio first, so it is optimal.", font_size=22, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).center()

        for line in proof_lines:
            self.play(Write(line), run_time=0.6)
            self.wait(0.5)
        self.wait(2.0)
        self.play(*[FadeOut(m) for m in self.mobjects])

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n log n)",
            space_complexity="O(n)",
        )
        self.wait(2.0)
