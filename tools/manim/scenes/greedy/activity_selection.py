from manim import *
from ...base import AlgoScene, ArrayVis


class ActivitySelection(AlgoScene):
    TITLE = "Activity Selection"
    SUBTITLE = "Select maximum non-overlapping activities by always picking earliest finish time"
    CATEGORY = "greedy"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        activities = [
            {"name": "A", "start": 1, "finish": 3},
            {"name": "B", "start": 2, "finish": 5},
            {"name": "C", "start": 4, "finish": 6},
            {"name": "D", "start": 6, "finish": 7},
            {"name": "E", "start": 5, "finish": 8},
            {"name": "F", "start": 8, "finish": 9},
        ]

        intro_text = Text(
            "Given activities with start and finish times,\n"
            "select the maximum number of non-overlapping activities.",
            font_size=26,
            color=WHITE,
        ).to_edge(UP, buff=1.2)
        self.play(FadeIn(intro_text))
        self.wait(1.5)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Draw timeline and activity bars ──────────────────────
        self.chapter_title("Activity Timeline")

        timeline_start = -5
        timeline_end = 5
        scale = (timeline_end - timeline_start) / 10.0  # maps [0,10] -> screen

        def x_pos(t):
            return timeline_start + t * scale

        axis = Line(
            start=np.array([x_pos(0), -1.5, 0]),
            end=np.array([x_pos(10), -1.5, 0]),
            color=GRAY,
        )
        ticks = VGroup()
        tick_labels = VGroup()
        for t in range(0, 11):
            tick = Line(
                np.array([x_pos(t), -1.6, 0]),
                np.array([x_pos(t), -1.4, 0]),
                color=GRAY,
            )
            lbl = Text(str(t), font_size=14, color=GRAY).move_to(
                np.array([x_pos(t), -1.9, 0])
            )
            ticks.add(tick)
            tick_labels.add(lbl)

        self.play(Create(axis), Create(ticks), Write(tick_labels))
        self.wait(0.5)

        bar_colors = [BLUE, PURPLE, TEAL, GREEN, ORANGE, YELLOW]
        bars = VGroup()
        bar_labels = VGroup()
        y_positions = [0.5, -0.1, 0.5, -0.1, 0.5, -0.1]

        for i, act in enumerate(activities):
            x1 = x_pos(act["start"])
            x2 = x_pos(act["finish"])
            y = y_positions[i]
            bar = Rectangle(
                width=x2 - x1,
                height=0.45,
                fill_color=bar_colors[i],
                fill_opacity=0.7,
                stroke_color=bar_colors[i],
            ).move_to(np.array([(x1 + x2) / 2, y, 0]))
            label = Text(
                f"{act['name']}({act['start']},{act['finish']})",
                font_size=14,
                color=WHITE,
            ).move_to(bar.get_center())
            bars.add(bar)
            bar_labels.add(label)

        self.play(
            LaggedStart(*[FadeIn(b) for b in bars], lag_ratio=0.15),
            LaggedStart(*[Write(l) for l in bar_labels], lag_ratio=0.15),
        )
        self.wait(1.5)

        # ── Stage 3: Sort by finish time ──────────────────────────────────
        self.chapter_title("Step 1 — Sort by Finish Time")

        sort_note = Text(
            "Sort activities by finish time: A(3) ≤ B(5) ≤ C(6) ≤ D(7) ≤ E(8) ≤ F(9)",
            font_size=22,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.5)
        self.play(Write(sort_note))
        self.wait(1.5)
        self.play(FadeOut(sort_note))

        # ── Stage 4: Greedy selection ─────────────────────────────────────
        self.chapter_title("Step 2 — Greedy Selection")

        sorted_activities = sorted(activities, key=lambda x: x["finish"])
        selected_indices = []
        last_finish = -1

        for i, act in enumerate(sorted_activities):
            orig_idx = activities.index(act)
            if act["start"] >= last_finish:
                selected_indices.append(orig_idx)
                last_finish = act["finish"]
                highlight = SurroundingRectangle(
                    bars[orig_idx], color=GREEN, buff=0.05
                )
                check = Text("✓ Selected", font_size=18, color=GREEN).next_to(
                    bars[orig_idx], RIGHT, buff=0.15
                )
                self.play(Create(highlight), Write(check))
                self.wait(0.8)
            else:
                cross = Text("✗ Overlaps", font_size=18, color=RED).next_to(
                    bars[orig_idx], RIGHT, buff=0.15
                )
                self.play(
                    bars[orig_idx].animate.set_fill(opacity=0.2),
                    Write(cross),
                )
                self.wait(0.8)

        self.wait(1.0)

        # ── Stage 5: Result summary ───────────────────────────────────────
        self.chapter_title("Result")

        selected_names = [activities[i]["name"] for i in selected_indices]
        result_text = Text(
            f"Selected activities: {', '.join(selected_names)}  →  {len(selected_names)} activities",
            font_size=26,
            color=GREEN,
        ).to_edge(DOWN, buff=0.8)
        self.play(Write(result_text))
        self.wait(2.0)

        self.play(
            FadeOut(axis),
            FadeOut(ticks),
            FadeOut(tick_labels),
            FadeOut(bars),
            FadeOut(bar_labels),
            FadeOut(result_text),
            *[FadeOut(m) for m in self.mobjects],
        )

        # ── Stage 6: Pseudocode walkthrough ───────────────────────────────
        self.chapter_title("Algorithm Walkthrough")

        pseudo = VGroup(
            Text("1. Sort activities by finish time", font_size=22, color=WHITE),
            Text("2. Select first activity", font_size=22, color=WHITE),
            Text("3. For each remaining activity:", font_size=22, color=WHITE),
            Text(
                "   if start >= last_finish → select it",
                font_size=22,
                color=GREEN,
            ),
            Text(
                "   else → skip (overlaps)",
                font_size=22,
                color=RED,
            ),
            Text("4. Return selected set", font_size=22, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).center()

        for line in pseudo:
            self.play(Write(line), run_time=0.6)
            self.wait(0.4)
        self.wait(1.5)
        self.play(FadeOut(pseudo))

        # ── Stage 7: Complexity card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n log n)",
            space_complexity="O(n)",
        )
        self.wait(2.0)
