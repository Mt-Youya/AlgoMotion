from manim import *
from ...base import AlgoScene, ArrayVis

TITLE = "Subsets"
SUBTITLE = "Generate all possible subsets (power set) using backtracking."
CATEGORY = "backtracking"


class Subsets(AlgoScene):
    TITLE = TITLE
    SUBTITLE = SUBTITLE
    CATEGORY = CATEGORY

    def build(self):
        # ── Stage 1: Intro Setup ────────────────────────────────────────────
        self.chapter_title("Problem Setup")
        nums = [1, 2, 3]
        vis = ArrayVis(nums, label="nums")
        self.play(FadeIn(vis))
        self.wait(1)

        intro_text = Text(
            "Generate all 2^n subsets of [1, 2, 3]",
            font_size=28,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(intro_text))
        self.wait(1.2)

        count_text = Text(
            "n = 3  →  2³ = 8 total subsets",
            font_size=24,
            color=WHITE,
        ).next_to(intro_text, DOWN, buff=0.4)
        self.play(FadeIn(count_text))
        self.wait(1.5)
        self.play(FadeOut(intro_text), FadeOut(count_text))

        # ── Stage 2: Backtracking Strategy ─────────────────────────────────
        self.chapter_title("Backtracking Strategy")
        strategy_lines = VGroup(
            Text("At each index, we make a binary choice:", font_size=24, color=WHITE),
            Text("  INCLUDE  the current element", font_size=22, color=GREEN),
            Text("  EXCLUDE  the current element", font_size=22, color=RED),
            Text("Recurse on the remaining elements, then backtrack.", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(vis, DOWN, buff=0.7)
        self.play(FadeIn(strategy_lines, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(strategy_lines))

        # ── Stage 3: Decision Tree (first two levels) ───────────────────────
        self.chapter_title("Decision Tree — Level 1 (element 1)")
        root_label = Text("start: []", font_size=22, color=WHITE).move_to(UP * 2.5)
        self.play(Write(root_label))
        self.wait(0.5)

        # Left branch: include 1
        include_arrow = Arrow(root_label.get_bottom(), UP * 1.0 + LEFT * 2.5, color=GREEN, buff=0.1)
        include_node = Text("[1]", font_size=22, color=GREEN).move_to(UP * 0.8 + LEFT * 2.5)
        include_lbl = Text("include 1", font_size=18, color=GREEN).next_to(include_arrow, LEFT, buff=0.05)

        # Right branch: exclude 1
        exclude_arrow = Arrow(root_label.get_bottom(), UP * 1.0 + RIGHT * 2.5, color=RED, buff=0.1)
        exclude_node = Text("[]", font_size=22, color=RED).move_to(UP * 0.8 + RIGHT * 2.5)
        exclude_lbl = Text("exclude 1", font_size=18, color=RED).next_to(exclude_arrow, RIGHT, buff=0.05)

        self.play(
            GrowArrow(include_arrow), Write(include_node), Write(include_lbl),
        )
        self.wait(0.8)
        self.play(
            GrowArrow(exclude_arrow), Write(exclude_node), Write(exclude_lbl),
        )
        self.wait(1.5)

        # ── Stage 4: Expand Level 2 (element 2) ────────────────────────────
        self.chapter_title("Decision Tree — Level 2 (element 2)")
        # Children of [1]
        inc_inc_arrow = Arrow(include_node.get_bottom(), DOWN * 0.2 + LEFT * 3.5, color=GREEN, buff=0.05)
        inc_inc_node = Text("[1,2]", font_size=20, color=GREEN).move_to(DOWN * 0.4 + LEFT * 3.5)
        inc_exc_arrow = Arrow(include_node.get_bottom(), DOWN * 0.2 + LEFT * 1.5, color=RED, buff=0.05)
        inc_exc_node = Text("[1]", font_size=20, color=RED).move_to(DOWN * 0.4 + LEFT * 1.5)

        # Children of []
        exc_inc_arrow = Arrow(exclude_node.get_bottom(), DOWN * 0.2 + RIGHT * 1.5, color=GREEN, buff=0.05)
        exc_inc_node = Text("[2]", font_size=20, color=GREEN).move_to(DOWN * 0.4 + RIGHT * 1.5)
        exc_exc_arrow = Arrow(exclude_node.get_bottom(), DOWN * 0.2 + RIGHT * 3.5, color=RED, buff=0.05)
        exc_exc_node = Text("[]", font_size=20, color=RED).move_to(DOWN * 0.4 + RIGHT * 3.5)

        self.play(
            GrowArrow(inc_inc_arrow), Write(inc_inc_node),
            GrowArrow(inc_exc_arrow), Write(inc_exc_node),
        )
        self.wait(0.8)
        self.play(
            GrowArrow(exc_inc_arrow), Write(exc_inc_node),
            GrowArrow(exc_exc_arrow), Write(exc_exc_node),
        )
        self.wait(1.5)

        tree_group = VGroup(
            root_label, include_arrow, include_node, include_lbl,
            exclude_arrow, exclude_node, exclude_lbl,
            inc_inc_arrow, inc_inc_node, inc_exc_arrow, inc_exc_node,
            exc_inc_arrow, exc_inc_node, exc_exc_arrow, exc_exc_node,
        )
        self.play(FadeOut(tree_group))

        # ── Stage 5: Collecting All 8 Subsets ──────────────────────────────
        self.chapter_title("All 8 Subsets Collected")
        all_subsets = [
            "[]", "[3]", "[2]", "[2,3]",
            "[1]", "[1,3]", "[1,2]", "[1,2,3]",
        ]
        subset_mobs = VGroup()
        for i, s in enumerate(all_subsets):
            col = i % 4
            row = i // 4
            mob = Text(s, font_size=24, color=BLUE_B).move_to(
                RIGHT * (col * 2.5 - 3.75) + DOWN * (row * 1.0 - 0.5)
            )
            subset_mobs.add(mob)

        result_title = Text("Power set of [1, 2, 3]:", font_size=26, color=YELLOW).next_to(
            vis, DOWN, buff=0.6
        )
        self.play(Write(result_title))
        self.wait(0.5)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in subset_mobs], lag_ratio=0.15))
        self.wait(2)

        # Highlight the empty set and full set
        box_empty = SurroundingRectangle(subset_mobs[0], color=ORANGE, buff=0.1)
        box_full = SurroundingRectangle(subset_mobs[7], color=GREEN, buff=0.1)
        self.play(Create(box_empty), Create(box_full))
        note = Text("[] and [1,2,3] are always in the power set", font_size=20, color=GRAY).next_to(
            subset_mobs, DOWN, buff=0.5
        )
        self.play(FadeIn(note))
        self.wait(2)
        self.play(
            FadeOut(subset_mobs), FadeOut(result_title),
            FadeOut(box_empty), FadeOut(box_full), FadeOut(note),
        )

        # ── Stage 6: Backtracking with Current Path ─────────────────────────
        self.chapter_title("Backtrack — Tracing the Recursion")
        path_label = Text("current path = []", font_size=24, color=WHITE).next_to(vis, DOWN, buff=0.7)
        self.play(Write(path_label))
        self.wait(0.8)

        steps = [
            ("include 1 → path = [1]", GREEN),
            ("include 2 → path = [1, 2]", GREEN),
            ("include 3 → path = [1, 2, 3]  ✓ save", GREEN),
            ("backtrack → path = [1, 2]", ORANGE),
            ("exclude 3 → path = [1, 2]  ✓ save", RED),
            ("backtrack → path = [1]", ORANGE),
            ("exclude 2 → path = [1]", RED),
            ("include 3 → path = [1, 3]  ✓ save", GREEN),
        ]
        for msg, color in steps:
            new_label = Text(msg, font_size=22, color=color).next_to(vis, DOWN, buff=0.7)
            self.play(Transform(path_label, new_label), run_time=0.7)
            self.wait(0.9)

        self.play(FadeOut(path_label), FadeOut(vis))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n · 2^n)",
            space_complexity="O(n)",
            notes=(
                "There are 2^n subsets; copying each subset into the result takes O(n). "
                "Recursion stack depth is O(n). Total output size is O(n · 2^n)."
            ),
        )
        self.wait(2)
