from manim import *
from ...base import AlgoScene, DPTable
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST,
    C_ACTIVE, C_SORTED, C_DEFAULT,
)


class BurstBalloons(AlgoScene):
    TITLE = "Burst Balloons"
    SUBTITLE = "Maximize coins collected by bursting balloons in optimal order."
    CATEGORY = "dynamic-programming"

    def build(self):
        # Problem data: balloons array with boundary sentinels 1
        balloons = [3, 1, 5, 8]
        n = len(balloons)
        padded = [1] + balloons + [1]  # sentinels

        # ── Stage 1: Problem Setup ──────────────────────────────────────────
        stage1 = self.chapter_title("Problem Setup")

        balloon_group = VGroup()
        colors_list = [COBALT, CORAL, SIGNAL, C_ACTIVE]
        for i, val in enumerate(balloons):
            circle = Circle(
                radius=0.45,
                color=colors_list[i % len(colors_list)],
                fill_color=colors_list[i % len(colors_list)],
                fill_opacity=0.85,
                stroke_width=2,
            )
            lbl = Text(str(val), font_size=26, color=INK, weight="BOLD").move_to(circle)
            idx_lbl = Text(f"[{i}]", font_size=16, color=GRAY).next_to(circle, DOWN, buff=0.12)
            balloon_group.add(VGroup(circle, lbl, idx_lbl))

        balloon_group.arrange(RIGHT, buff=0.55).shift(UP * 0.9)

        goal_text = Text(
            "Burst all balloons. Coins = left × current × right neighbor values.",
            font_size=21, color=INK,
        ).shift(DOWN * 1.0)

        rule_text = Text(
            "Goal: choose burst order to maximize total coins.",
            font_size=21, color=GRAY,
        ).shift(DOWN * 1.6)

        self.play(
            LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in balloon_group], lag_ratio=0.18)
        )
        self.wait(0.5)
        self.play(FadeIn(goal_text), FadeIn(rule_text))
        self.wait(1.5)
        self.play(FadeOut(goal_text), FadeOut(rule_text), FadeOut(stage1))

        # ── Stage 2: Boundary Sentinels ────────────────────────────────────
        stage2 = self.chapter_title("Add Boundary Sentinels")

        sentinel_note = Text(
            "Pad array with 1s on both ends: [1, 3, 1, 5, 8, 1]",
            font_size=24, color=COBALT,
        ).shift(DOWN * 1.0)

        why_text = Text(
            "Sentinels ensure edge balloons always have valid neighbors.",
            font_size=20, color=GRAY,
        ).shift(DOWN * 1.6)

        # Show padded array visually
        padded_group = VGroup()
        padded_colors = [MIST, COBALT, CORAL, SIGNAL, C_ACTIVE, MIST]
        for i, val in enumerate(padded):
            rect = RoundedRectangle(
                corner_radius=0.1, width=0.72, height=0.6,
                color=padded_colors[i],
                fill_color=padded_colors[i],
                fill_opacity=0.9,
                stroke_width=2,
            )
            v_lbl = Text(str(val), font_size=22, color=INK, weight="BOLD").move_to(rect)
            padded_group.add(VGroup(rect, v_lbl))

        padded_group.arrange(RIGHT, buff=0.18).shift(DOWN * 2.5)

        self.play(FadeIn(sentinel_note), FadeIn(why_text))
        self.wait(0.6)
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in padded_group], lag_ratio=0.12))
        self.wait(1.2)
        self.play(
            FadeOut(sentinel_note), FadeOut(why_text),
            FadeOut(padded_group), FadeOut(stage2),
        )

        # ── Stage 3: DP Recurrence ─────────────────────────────────────────
        stage3 = self.chapter_title("Interval DP Recurrence")

        recurrence = MathTex(
            r"\text{dp}[l][r] = \max_{l < k < r}\bigl("
            r"\text{dp}[l][k] + \text{dp}[k][r] + \text{nums}[l]\cdot\text{nums}[k]\cdot\text{nums}[r]"
            r"\bigr)",
            font_size=26, color=INK,
        ).shift(UP * 0.3)

        key_insight = Text(
            "k is the LAST balloon burst in interval (l, r).",
            font_size=22, color=CORAL, weight="BOLD",
        ).shift(DOWN * 0.6)

        why_last = Text(
            "Thinking 'last burst' avoids tracking which neighbors remain.",
            font_size=20, color=GRAY,
        ).shift(DOWN * 1.2)

        base_case = Text(
            "Base case: dp[l][r] = 0 when r - l < 2  (no balloons between l and r).",
            font_size=19, color=COBALT,
        ).shift(DOWN * 1.9)

        self.play(Write(recurrence))
        self.wait(0.8)
        self.play(FadeIn(key_insight, shift=RIGHT * 0.2))
        self.wait(0.5)
        self.play(FadeIn(why_last))
        self.wait(0.5)
        self.play(FadeIn(base_case))
        self.wait(1.5)
        self.play(
            FadeOut(recurrence), FadeOut(key_insight),
            FadeOut(why_last), FadeOut(base_case), FadeOut(stage3),
        )

        # ── Stage 4: Animate Burst Order Example ──────────────────────────
        stage4 = self.chapter_title("Burst Order Walkthrough")

        # Show balloons again for the burst simulation
        demo_group = VGroup()
        demo_colors = [COBALT, CORAL, SIGNAL, C_ACTIVE]
        demo_vals = list(balloons)
        demo_mobs = []
        for i, val in enumerate(demo_vals):
            c = Circle(
                radius=0.42, color=demo_colors[i],
                fill_color=demo_colors[i], fill_opacity=0.85, stroke_width=2,
            )
            lbl = Text(str(val), font_size=24, color=INK, weight="BOLD").move_to(c)
            g = VGroup(c, lbl)
            demo_group.add(g)
            demo_mobs.append(g)

        demo_group.arrange(RIGHT, buff=0.6).shift(UP * 1.2)
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in demo_group], lag_ratio=0.15))
        self.wait(0.5)

        # Simulate optimal burst: index 1 (val=1) → index 0 (val=3) → index 2 (val=5) → index 3 (val=8)
        burst_order = [1, 0, 2, 3]  # indices into original array
        burst_coins = []
        remaining = list(balloons)
        padded_sim = [1] + list(balloons) + [1]

        coin_total = 0
        coin_text = Text(f"Total coins: {coin_total}", font_size=26, color=SIGNAL).shift(DOWN * 2.0)
        self.play(FadeIn(coin_text))

        for burst_idx_in_orig in burst_order:
            # Find current position in remaining
            pos_in_remaining = remaining.index(padded_sim[burst_idx_in_orig + 1]) if padded_sim[burst_idx_in_orig + 1] in remaining else 0

            # Compute coins for this burst
            left_val = padded_sim[burst_idx_in_orig] if burst_idx_in_orig == 0 else (
                1 if burst_idx_in_orig - 1 < 0 else padded_sim[burst_idx_in_orig]
            )

        # Simplified visual: burst each balloon left to right with annotation
        burst_sequence = [
            (1, 1, "Burst balloon[1]=1: coins = 3×1×5 = 15"),
            (0, 0, "Burst balloon[0]=3: coins = 1×3×5 = 15"),
            (2, 2, "Burst balloon[2]=5: coins = 1×5×8 = 40"),
            (3, 3, "Burst balloon[3]=8: coins = 1×8×1 = 8"),
        ]
        running_total = 0
        burst_labels = [15, 15, 40, 8]

        for step_i, (orig_idx, mob_idx, desc) in enumerate(burst_sequence):
            desc_mob = Text(desc, font_size=20, color=COBALT).shift(DOWN * 1.0)
            self.play(FadeIn(desc_mob))
            self.wait(0.4)

            # Animate burst: flash then shrink
            target_mob = demo_mobs[mob_idx]
            self.play(
                target_mob.animate.scale(1.25).set_fill(SIGNAL, opacity=1.0),
                run_time=0.3,
            )
            self.wait(0.2)
            self.play(
                target_mob.animate.scale(0.0),
                run_time=0.4,
            )

            running_total += burst_labels[step_i]
            new_coin_text = Text(f"Total coins: {running_total}", font_size=26, color=SIGNAL).shift(DOWN * 2.0)
            self.play(Transform(coin_text, new_coin_text), FadeOut(desc_mob))
            self.wait(0.3)

        self.wait(1.0)
        self.play(FadeOut(demo_group), FadeOut(coin_text), FadeOut(stage4))

        # ── Stage 5: Build DP Table ────────────────────────────────────────
        stage5 = self.chapter_title("Building the DP Table")

        # Compute dp table for padded array (size n+2)
        m = n + 2  # length of padded
        dp_vals = [[0] * m for _ in range(m)]

        for length in range(2, m):
            for l in range(m - length):
                r = l + length
                for k in range(l + 1, r):
                    coins = padded[l] * padded[k] * padded[r]
                    dp_vals[l][r] = max(dp_vals[l][r], dp_vals[l][k] + dp_vals[k][r] + coins)

        # Show a condensed 4×4 table for the inner indices (l=0..3, r=2..5)
        # Display dp[l][r] for l in 0..4, r in 0..5 (6×6)
        row_labels = [f"l={i}" for i in range(m)]
        col_labels = [f"r={j}" for j in range(m)]

        table = DPTable(
            self,
            rows=m,
            cols=m,
            row_labels=row_labels,
            col_labels=col_labels,
            cell_width=0.72,
            cell_height=0.52,
            center=[0.3, -0.9, 0],
            initial=[[0] * m for _ in range(m)],
        )

        self.wait(0.4)

        # Fill by interval length (diagonal fill)
        for length in range(2, m):
            for l in range(m - length):
                r = l + length
                val = dp_vals[l][r]
                color = C_SORTED if val > 0 else MIST
                table.set_value(l, r, val, color=color, run_time=0.28)
            self.wait(0.3)

        self.wait(0.8)
        self.play(FadeOut(stage5))

        # ── Stage 6: Highlight Answer ──────────────────────────────────────
        stage6 = self.chapter_title("Optimal Answer")

        answer = dp_vals[0][m - 1]
        table.highlight(0, m - 1, color=CORAL, run_time=0.5)
        table.indicate(0, m - 1)

        answer_mob = Text(
            f"dp[0][{m-1}] = {answer}  →  Maximum coins = {answer}",
            font_size=28, color=CORAL, weight="BOLD",
        ).shift(DOWN * 3.5)

        self.play(FadeIn(answer_mob, shift=UP * 0.2))
        self.wait(1.5)
        self.play(FadeOut(answer_mob), FadeOut(stage6))

        # ── Stage 7: Why "Last Burst" Thinking Works ───────────────────────
        stage7 = self.chapter_title("Key Insight: Last Balloon Burst")

        insight_lines = VGroup(
            Text("Standard approach: track which neighbors remain → state explosion.", font_size=21, color=GRAY),
            Text("Reverse thinking: fix k as the LAST burst in (l, r).", font_size=21, color=COBALT),
            Text("When k is burst last, its neighbors are always nums[l] and nums[r].", font_size=21, color=INK),
            Text("Sub-problems dp[l][k] and dp[k][r] are independent — no overlap!", font_size=21, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.5)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in insight_lines], lag_ratio=0.2))
        self.wait(2.0)
        self.play(FadeOut(insight_lines), FadeOut(stage7))

        # ── Stage 8: Complexity Card ───────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_best=r"O(n^3)",
            time_avg=r"O(n^3)",
            time_worst=r"O(n^3)",
            space=r"O(n^2)",
        )
        self.wait(2)
