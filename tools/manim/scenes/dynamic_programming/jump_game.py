from manim import *
from ...base import AlgoScene, ArrayVis


class JumpGame(AlgoScene):
    TITLE = "Jump Game"
    SUBTITLE = "Determine if you can reach the last index given jump lengths."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        self.chapter_title("Problem Setup")

        nums = [2, 3, 1, 1, 4]
        n = len(nums)

        problem_text = Text(
            "nums = [2, 3, 1, 1, 4]",
            font_size=34, color=WHITE
        ).shift(UP * 2)
        goal_text = Text(
            "Can you reach the last index (index 4)?",
            font_size=28, color=YELLOW
        ).next_to(problem_text, DOWN, buff=0.4)
        rule_text = Text(
            "From index i, you can jump up to nums[i] steps forward.",
            font_size=24, color=GRAY
        ).next_to(goal_text, DOWN, buff=0.4)

        self.play(Write(problem_text))
        self.wait(0.5)
        self.play(Write(goal_text))
        self.wait(0.5)
        self.play(Write(rule_text))
        self.wait(1.2)
        self.play(FadeOut(problem_text), FadeOut(goal_text), FadeOut(rule_text))

        # ── Stage 2: Array Visualization ─────────────────────────────────────
        self.chapter_title("Array Visualization")

        cell_w = 1.0
        cells = VGroup()
        val_texts = []
        idx_labels = VGroup()

        for i, v in enumerate(nums):
            cell = Square(side_length=cell_w, color=WHITE, fill_opacity=0.15)
            val = Text(str(v), font_size=30, color=WHITE)
            val.move_to(cell.get_center())
            idx = Text(str(i), font_size=20, color=GRAY).next_to(cell, DOWN, buff=0.1)
            cells.add(VGroup(cell, val))
            idx_labels.add(idx)
            val_texts.append(val)

        cells.arrange(RIGHT, buff=0.1)
        for i, idx in enumerate(idx_labels):
            idx.next_to(cells[i], DOWN, buff=0.1)

        arr_group = VGroup(cells, idx_labels).move_to(ORIGIN)
        arr_header = Text("nums", font_size=28, color=YELLOW).next_to(arr_group, UP, buff=0.5)

        self.play(Write(arr_header))
        self.play(LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.12))
        self.play(LaggedStart(*[FadeIn(idx) for idx in idx_labels], lag_ratio=0.12))
        self.wait(0.8)

        # Show jump arcs from index 0
        arc_label = Text("From index 0, can jump 1 or 2 steps", font_size=22, color=BLUE).to_edge(DOWN).shift(UP * 0.5)
        self.play(Write(arc_label))

        arc1 = CurvedArrow(
            cells[0].get_top() + UP * 0.1,
            cells[1].get_top() + UP * 0.1,
            color=BLUE, angle=-TAU / 5
        )
        arc2 = CurvedArrow(
            cells[0].get_top() + UP * 0.1,
            cells[2].get_top() + UP * 0.1,
            color=BLUE, angle=-TAU / 5
        )
        self.play(Create(arc1))
        self.wait(0.3)
        self.play(Create(arc2))
        self.wait(0.8)
        self.play(FadeOut(arc1), FadeOut(arc2), FadeOut(arc_label))

        # ── Stage 3: Greedy max-reach Approach ──────────────────────────────
        self.chapter_title("Greedy: Track Max Reach")

        approach_lines = VGroup(
            Text("Key Idea: Track the farthest index reachable so far.", font_size=24, color=WHITE),
            Text("At each index i, if i ≤ max_reach, update max_reach = max(max_reach, i + nums[i]).", font_size=22, color=GRAY),
            Text("If max_reach ≥ last index → return True.", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.35).to_edge(DOWN).shift(UP * 0.3)

        for line in approach_lines:
            self.play(Write(line))
            self.wait(0.5)
        self.wait(0.8)
        self.play(FadeOut(approach_lines))

        # ── Stage 4: Step-by-step Simulation ────────────────────────────────
        self.chapter_title("Simulation: i = 0")

        max_reach = 0
        reach_tracker = Text(f"max_reach = {max_reach}", font_size=28, color=ORANGE).to_edge(UP).shift(DOWN * 0.3)
        self.play(Write(reach_tracker))

        steps = [
            (0, "i=0, nums[0]=2, max_reach = max(0, 0+2) = 2", 2, GREEN),
            (1, "i=1, nums[1]=3, max_reach = max(2, 1+3) = 4", 4, GREEN),
            (2, "i=2, nums[2]=1, max_reach = max(4, 2+1) = 4", 4, BLUE),
            (3, "i=3, nums[3]=1, max_reach = max(4, 3+1) = 4", 4, BLUE),
            (4, "i=4 ≤ max_reach=4 → reached last index!", 4, YELLOW),
        ]

        step_text = None
        for i, (idx, msg, new_reach, color) in enumerate(steps):
            # Update chapter title for first few steps
            if i < 3:
                self.chapter_title(f"Simulation: i = {idx}")

            # Highlight current cell
            self.play(cells[idx][0].animate.set_fill(color, opacity=0.5))

            new_step = Text(msg, font_size=21, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            if step_text:
                self.play(Transform(step_text, new_step))
            else:
                step_text = new_step
                self.play(Write(step_text))

            if new_reach != max_reach:
                max_reach = new_reach
                new_tracker = Text(f"max_reach = {max_reach}", font_size=28, color=ORANGE).to_edge(UP).shift(DOWN * 0.3)
                self.play(Transform(reach_tracker, new_tracker))

            # Draw reach indicator arrow
            if idx < n - 1 and new_reach < n:
                reach_arrow = Arrow(
                    cells[idx].get_top() + UP * 0.5,
                    cells[min(new_reach, n - 1)].get_top() + UP * 0.5,
                    color=ORANGE, buff=0.05, stroke_width=2
                )
                reach_label = Text("reach", font_size=16, color=ORANGE).next_to(reach_arrow, UP, buff=0.05)
                self.play(GrowArrow(reach_arrow), FadeIn(reach_label))
                self.wait(0.6)
                self.play(FadeOut(reach_arrow), FadeOut(reach_label))
            else:
                self.wait(0.6)

        self.wait(0.8)
        self.play(FadeOut(step_text), FadeOut(reach_tracker))

        # ── Stage 5: Counter-Example (cannot reach) ──────────────────────────
        self.chapter_title("Counter-Example: Stuck!")

        self.play(FadeOut(cells), FadeOut(idx_labels), FadeOut(arr_header))

        nums2 = [3, 2, 1, 0, 4]
        cells2 = VGroup()
        val_texts2 = []
        idx_labels2 = VGroup()

        for i, v in enumerate(nums2):
            cell = Square(side_length=cell_w, color=WHITE, fill_opacity=0.15)
            val = Text(str(v), font_size=30, color=WHITE)
            val.move_to(cell.get_center())
            idx = Text(str(i), font_size=20, color=GRAY).next_to(cell, DOWN, buff=0.1)
            cells2.add(VGroup(cell, val))
            idx_labels2.add(idx)
            val_texts2.append(val)

        cells2.arrange(RIGHT, buff=0.1)
        for i, idx in enumerate(idx_labels2):
            idx.next_to(cells2[i], DOWN, buff=0.1)

        arr_group2 = VGroup(cells2, idx_labels2).move_to(ORIGIN)
        arr_header2 = Text("nums = [3, 2, 1, 0, 4]", font_size=28, color=YELLOW).next_to(arr_group2, UP, buff=0.5)

        self.play(Write(arr_header2))
        self.play(LaggedStart(*[FadeIn(c) for c in cells2], lag_ratio=0.12))
        self.play(LaggedStart(*[FadeIn(idx) for idx in idx_labels2], lag_ratio=0.12))
        self.wait(0.5)

        max_reach2 = 0
        reach_tracker2 = Text(f"max_reach = {max_reach2}", font_size=28, color=ORANGE).to_edge(UP).shift(DOWN * 0.3)
        self.play(Write(reach_tracker2))

        steps2 = [
            (0, "i=0, nums[0]=3, max_reach = max(0, 0+3) = 3", 3),
            (1, "i=1, nums[1]=2, max_reach = max(3, 1+2) = 3", 3),
            (2, "i=2, nums[2]=1, max_reach = max(3, 2+1) = 3", 3),
            (3, "i=3, nums[3]=0, max_reach = max(3, 3+0) = 3", 3),
        ]

        step_text2 = None
        for idx, msg, new_reach in steps2:
            self.play(cells2[idx][0].animate.set_fill(BLUE, opacity=0.4))
            new_step = Text(msg, font_size=21, color=WHITE).to_edge(DOWN).shift(UP * 0.5)
            if step_text2:
                self.play(Transform(step_text2, new_step))
            else:
                step_text2 = new_step
                self.play(Write(step_text2))
            if new_reach != max_reach2:
                max_reach2 = new_reach
                new_tracker2 = Text(f"max_reach = {max_reach2}", font_size=28, color=ORANGE).to_edge(UP).shift(DOWN * 0.3)
                self.play(Transform(reach_tracker2, new_tracker2))
            self.wait(0.6)

        # Index 4 is unreachable
        stuck_msg = Text("i=4 > max_reach=3 → CANNOT reach last index!", font_size=22, color=RED)
        stuck_msg.to_edge(DOWN).shift(UP * 0.5)
        self.play(Transform(step_text2, stuck_msg))
        self.play(cells2[4][0].animate.set_fill(RED, opacity=0.5))
        self.wait(1.2)

        self.play(
            FadeOut(step_text2), FadeOut(reach_tracker2),
            FadeOut(arr_group2), FadeOut(arr_header2)
        )

        # ── Stage 6: Recurrence Summary ──────────────────────────────────────
        self.chapter_title("Algorithm Summary")

        summary = VGroup(
            Text("Greedy Approach:", font_size=30, color=YELLOW),
            Text("max_reach = 0", font_size=26, color=WHITE),
            Text("for i in range(n):", font_size=26, color=WHITE),
            Text("    if i > max_reach: return False", font_size=26, color=RED),
            Text("    max_reach = max(max_reach, i + nums[i])", font_size=26, color=GREEN),
            Text("return True", font_size=26, color=GREEN),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to(ORIGIN)

        for line in summary:
            self.play(Write(line))
            self.wait(0.3)
        self.wait(1.0)
        self.play(FadeOut(summary))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(1)",
        )
        self.wait(1.5)
