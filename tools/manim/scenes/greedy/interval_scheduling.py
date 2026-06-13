from manim import *
from ...base import AlgoScene, ArrayVis


class IntervalScheduling(AlgoScene):
    TITLE = "Interval Scheduling"
    SUBTITLE = "Find minimum machines needed to schedule all intervals without overlap."
    CATEGORY = "greedy"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro_text = VGroup(
            Text("Given a set of intervals [start, end],", font_size=28),
            Text("find the minimum number of machines", font_size=28),
            Text("needed so every interval runs without conflict.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Draw Interval Timeline ──────────────────────────────────
        self.chapter_title("Visualizing Intervals")

        intervals = [(0, 3), (1, 4), (3, 6), (2, 5), (5, 7), (4, 8)]
        colors = [BLUE, GREEN, RED, YELLOW, PURPLE, ORANGE]
        labels = ["A", "B", "C", "D", "E", "F"]

        timeline_start = LEFT * 5.5
        scale = 1.1
        y_base = 1.5

        axis = Line(LEFT * 5.5, RIGHT * 5.5, color=WHITE, stroke_width=2)
        axis_label = Text("Time →", font_size=22).next_to(axis, RIGHT, buff=0.2)
        self.play(Create(axis), Write(axis_label))

        tick_group = VGroup()
        for t in range(9):
            tick = Line(DOWN * 0.15, UP * 0.15, color=GRAY).move_to(
                timeline_start + RIGHT * t * scale
            )
            num = Text(str(t), font_size=18, color=GRAY).next_to(tick, DOWN, buff=0.1)
            tick_group.add(tick, num)
        self.play(Create(tick_group))
        self.wait(0.5)

        bars = VGroup()
        bar_labels = VGroup()
        for i, ((s, e), color, lbl) in enumerate(zip(intervals, colors, labels)):
            x_start = timeline_start + RIGHT * s * scale
            x_end = timeline_start + RIGHT * e * scale
            y = y_base - i * 0.55
            bar = Rectangle(
                width=(e - s) * scale,
                height=0.4,
                fill_color=color,
                fill_opacity=0.7,
                stroke_color=WHITE,
                stroke_width=1.5,
            ).move_to(((x_start + x_end) / 2).get_center() + UP * y)
            bar.move_to(
                np.array([
                    (s + e) / 2 * scale + timeline_start.get_x(),
                    y,
                    0,
                ])
            )
            text = Text(lbl, font_size=20, color=WHITE).move_to(bar.get_center())
            bars.add(bar)
            bar_labels.add(text)

        self.play(
            LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in bars], lag_ratio=0.15)
        )
        self.play(
            LaggedStart(*[Write(t) for t in bar_labels], lag_ratio=0.15)
        )
        self.wait(1.5)
        self.play(FadeOut(bars, bar_labels, axis, axis_label, tick_group))

        # ── Stage 3: Greedy Strategy – Sort by Start Time ─────────────────────
        self.chapter_title("Step 1 — Sort by Start Time")

        strategy_lines = VGroup(
            Text("Greedy Key Insight:", font_size=30, color=YELLOW),
            Text("Use a min-heap tracking the earliest end time", font_size=26),
            Text("among all currently running machines.", font_size=26),
            Text("→ Sort intervals by start time first.", font_size=26, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).shift(UP * 0.5)

        self.play(FadeIn(strategy_lines, shift=UP * 0.3))
        self.wait(2)

        sorted_intervals = sorted(enumerate(intervals), key=lambda x: x[1][0])
        sorted_labels = [labels[i] for i, _ in sorted_intervals]
        sorted_vals = [iv for _, iv in sorted_intervals]

        sort_title = Text(
            "Sorted: " + " → ".join(
                [f"{lbl}[{s},{e}]" for lbl, (s, e) in zip(sorted_labels, sorted_vals)]
            ),
            font_size=22,
            color=GREEN,
        ).shift(DOWN * 2)
        self.play(Write(sort_title))
        self.wait(1.5)
        self.play(FadeOut(strategy_lines, sort_title))

        # ── Stage 4: Heap Simulation Step by Step ────────────────────────────
        self.chapter_title("Step 2 — Simulate Heap Assignments")

        import heapq

        heap = []
        machine_count = 0
        assignment_log = []

        for lbl, (s, e) in zip(sorted_labels, sorted_vals):
            if heap and heap[0] <= s:
                freed = heapq.heappop(heap)
                heapq.heappush(heap, e)
                assignment_log.append((lbl, s, e, False, machine_count, list(heap)))
            else:
                machine_count += 1
                heapq.heappush(heap, e)
                assignment_log.append((lbl, s, e, True, machine_count, list(heap)))

        table_data = [["Interval", "Start", "End", "New Machine?", "Machines"]]
        for lbl, s, e, is_new, mc, _ in assignment_log:
            table_data.append([lbl, str(s), str(e), "Yes" if is_new else "No", str(mc)])

        table = Table(
            table_data[1:],
            col_labels=[Text(h, font_size=20) for h in table_data[0]],
            include_outer_lines=True,
            line_config={"stroke_width": 1, "color": GRAY},
            element_to_mobject_config={"font_size": 20},
        ).scale(0.75).shift(DOWN * 0.3)

        self.play(Create(table))
        self.wait(0.5)

        for row_idx, (lbl, s, e, is_new, mc, _) in enumerate(assignment_log):
            row_cells = table.get_rows()[row_idx + 1]
            highlight_color = RED if is_new else GREEN
            self.play(
                row_cells.animate.set_color(highlight_color),
                run_time=0.6,
            )
            self.wait(0.4)

        self.wait(1)
        self.play(FadeOut(table))

        # ── Stage 5: Machine Lane Visualization ──────────────────────────────
        self.chapter_title("Step 3 — Machine Lane Assignment")

        import heapq as hq

        heap2 = []
        machine_lanes = {}
        next_machine = 0
        lane_assignments = []

        for lbl, (s, e) in zip(sorted_labels, sorted_vals):
            if heap2 and heap2[0][0] <= s:
                end_time, m_id = hq.heappop(heap2)
                hq.heappush(heap2, (e, m_id))
                lane_assignments.append((lbl, s, e, m_id))
            else:
                m_id = next_machine
                next_machine += 1
                hq.heappush(heap2, (e, m_id))
                lane_assignments.append((lbl, s, e, m_id))

        num_machines = next_machine
        lane_colors = [BLUE, GREEN, RED, YELLOW, PURPLE]
        x_off = LEFT * 5
        x_scale = 1.0
        y_top = 2.0
        lane_h = 0.8

        machine_labels_grp = VGroup()
        for m in range(num_machines):
            ml = Text(f"M{m+1}", font_size=22, color=WHITE).move_to(
                LEFT * 5.8 + UP * (y_top - m * lane_h)
            )
            machine_labels_grp.add(ml)

        self.play(FadeIn(machine_labels_grp))

        for lbl, s, e, m_id in lane_assignments:
            x_center = x_off.get_x() + (s + e) / 2 * x_scale
            y_center = y_top - m_id * lane_h
            w = (e - s) * x_scale
            color = lane_colors[m_id % len(lane_colors)]
            bar = Rectangle(
                width=w, height=0.55,
                fill_color=color, fill_opacity=0.75,
                stroke_color=WHITE, stroke_width=1.5,
            ).move_to(np.array([x_center, y_center, 0]))
            label = Text(lbl, font_size=18, color=WHITE).move_to(bar.get_center())
            self.play(FadeIn(bar, shift=UP * 0.1), Write(label), run_time=0.5)
            self.wait(0.3)

        result_text = Text(
            f"Minimum Machines Required: {num_machines}",
            font_size=30,
            color=YELLOW,
        ).shift(DOWN * 2.5)
        self.play(Write(result_text))
        self.wait(2)
        self.play(FadeOut(machine_labels_grp, result_text))

        # ── Stage 6: Complexity Card ──────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n log n)",
            space_complexity="O(n)",
        )
        self.wait(2)
