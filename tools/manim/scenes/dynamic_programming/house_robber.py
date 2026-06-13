from manim import *
from ...base import AlgoScene, ArrayVis, DPTable


class HouseRobber(AlgoScene):
    TITLE = "House Robber"
    SUBTITLE = "Maximize money robbed from non-adjacent houses."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        houses = [2, 7, 9, 3, 1]
        house_labels = VGroup()
        house_boxes = VGroup()
        for i, val in enumerate(houses):
            box = Square(side_length=0.9, color=BLUE_D, fill_opacity=0.3)
            box.shift(RIGHT * (i * 1.2) - RIGHT * 2.4)
            label = Text(str(val), font_size=28).move_to(box.get_center())
            idx = Text(f"h[{i}]", font_size=18, color=GRAY).next_to(box, DOWN, buff=0.15)
            house_boxes.add(box)
            house_labels.add(VGroup(label, idx))

        house_group = VGroup(house_boxes, house_labels).shift(UP * 0.5)

        intro_text = Text(
            "Given houses with money, rob max without robbing adjacent houses.",
            font_size=22,
            color=LIGHT_GRAY,
        ).shift(DOWN * 2.0)

        self.play(FadeIn(intro_text))
        self.wait(1)
        self.play(
            *[FadeIn(house_boxes[i], shift=UP * 0.3) for i in range(len(houses))],
            *[FadeIn(house_labels[i]) for i in range(len(houses))],
            lag_ratio=0.15,
        )
        self.wait(1.2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Show adjacency constraint ─────────────────────────────
        self.chapter_title("Adjacency Constraint")

        arrows = VGroup()
        for i in range(len(houses) - 1):
            arr = Arrow(
                house_boxes[i].get_right(),
                house_boxes[i + 1].get_left(),
                buff=0.05,
                color=RED,
                stroke_width=2,
            )
            arrows.add(arr)

        constraint_label = Text(
            "Cannot rob two adjacent houses!",
            font_size=24,
            color=RED_C,
        ).shift(DOWN * 2.0)

        self.play(FadeIn(constraint_label))
        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.2))
        self.wait(1)

        cross = Cross(arrows, color=RED, stroke_width=3)
        self.play(ShowPassingFlash(cross, time_width=0.8, run_time=1.2))
        self.wait(0.8)
        self.play(FadeOut(arrows), FadeOut(constraint_label))

        # ── Stage 3: DP recurrence ──────────────────────────────────────────
        self.chapter_title("DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[i] = \max(\text{dp}[i-1],\; \text{dp}[i-2] + \text{nums}[i])",
            font_size=32,
            color=YELLOW,
        ).shift(DOWN * 1.8)

        explanation = VGroup(
            Text("dp[i-1]  →  skip house i", font_size=20, color=GREEN_C),
            Text("dp[i-2] + nums[i]  →  rob house i", font_size=20, color=TEAL_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.8)

        self.play(Write(recurrence))
        self.wait(0.8)
        self.play(FadeIn(explanation, shift=UP * 0.2))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(explanation))

        # ── Stage 4: Build DP table step by step ───────────────────────────
        self.chapter_title("Building DP Table")

        dp_vals = [0] * len(houses)
        dp_boxes = VGroup()
        dp_labels = VGroup()
        dp_title = Text("dp[]", font_size=22, color=YELLOW).shift(LEFT * 3.5 + DOWN * 1.2)

        for i in range(len(houses)):
            box = Square(side_length=0.9, color=YELLOW_D, fill_opacity=0.15)
            box.shift(RIGHT * (i * 1.2) - RIGHT * 2.4 + DOWN * 1.5)
            lbl = Text("0", font_size=26, color=YELLOW).move_to(box.get_center())
            dp_boxes.add(box)
            dp_labels.add(lbl)

        self.play(FadeIn(dp_title))
        self.play(*[FadeIn(dp_boxes[i]) for i in range(len(houses))], lag_ratio=0.1)
        self.play(*[FadeIn(dp_labels[i]) for i in range(len(houses))], lag_ratio=0.1)
        self.wait(0.5)

        dp_vals[0] = houses[0]
        dp_vals[1] = max(houses[0], houses[1])

        for step_i in range(2, len(houses)):
            dp_vals[step_i] = max(dp_vals[step_i - 1], dp_vals[step_i - 2] + houses[step_i])

        computed = [houses[0], max(houses[0], houses[1])]
        for i in range(2, len(houses)):
            computed.append(max(computed[i - 1], computed[i - 2] + houses[i]))

        for i, val in enumerate(computed):
            highlight = house_boxes[i].copy().set_fill(TEAL, opacity=0.6)
            new_dp_lbl = Text(str(val), font_size=26, color=YELLOW).move_to(dp_boxes[i].get_center())
            self.play(
                Transform(house_boxes[i], highlight),
                Transform(dp_labels[i], new_dp_lbl),
                run_time=0.6,
            )
            self.wait(0.4)

        self.wait(1)

        # ── Stage 5: Highlight optimal path ────────────────────────────────
        self.chapter_title("Optimal Selection")

        answer_box = SurroundingRectangle(dp_boxes[-1], color=GREEN, buff=0.1)
        answer_text = Text(
            f"Answer: {computed[-1]}",
            font_size=30,
            color=GREEN_C,
        ).shift(DOWN * 2.8)

        self.play(Create(answer_box))
        self.play(FadeIn(answer_text, shift=UP * 0.2))
        self.wait(0.8)

        # trace back which houses were robbed
        robbed_indices = []
        i = len(computed) - 1
        while i >= 0:
            if i == 0 or computed[i] != computed[i - 1]:
                robbed_indices.append(i)
                i -= 2
            else:
                i -= 1

        for idx in robbed_indices:
            glow = house_boxes[idx].copy().set_fill(GREEN, opacity=0.8).set_stroke(GREEN, width=4)
            self.play(Transform(house_boxes[idx], glow), run_time=0.5)

        robbed_label = Text(
            "Robbed houses: " + ", ".join(f"h[{idx}]" for idx in sorted(robbed_indices)),
            font_size=22,
            color=GREEN_B,
        ).shift(DOWN * 3.3)
        self.play(FadeIn(robbed_label))
        self.wait(1.5)

        self.play(
            FadeOut(answer_box),
            FadeOut(answer_text),
            FadeOut(robbed_label),
            FadeOut(dp_title),
            FadeOut(dp_boxes),
            FadeOut(dp_labels),
        )

        # ── Stage 6: Space-optimized variant ───────────────────────────────
        self.chapter_title("Space Optimization")

        opt_text = VGroup(
            Text("We only need the last two dp values!", font_size=24, color=TEAL_C),
            Text("Use two variables: prev2, prev1", font_size=22, color=LIGHT_GRAY),
        ).arrange(DOWN, buff=0.3).shift(DOWN * 1.5)

        code_lines = VGroup(
            Text("prev2, prev1 = 0, 0", font_size=20, color=WHITE),
            Text("for num in nums:", font_size=20, color=WHITE),
            Text("    curr = max(prev1, prev2 + num)", font_size=20, color=YELLOW),
            Text("    prev2, prev1 = prev1, curr", font_size=20, color=WHITE),
            Text("return prev1", font_size=20, color=GREEN_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).shift(DOWN * 2.6)

        self.play(FadeIn(opt_text, shift=UP * 0.2))
        self.wait(0.8)
        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.2) for line in code_lines], lag_ratio=0.2))
        self.wait(1.5)

        space_note = Text("O(1) space  vs  O(n) DP array", font_size=22, color=ORANGE).shift(DOWN * 3.8)
        self.play(FadeIn(space_note))
        self.wait(1)
        self.play(FadeOut(opt_text), FadeOut(code_lines), FadeOut(space_note))

        # ── Stage 7: Complexity card ────────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(time="O(n)", space="O(1)")
        self.wait(2)
