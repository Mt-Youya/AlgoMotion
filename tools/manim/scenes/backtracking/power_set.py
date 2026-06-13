from manim import *
from ...base import AlgoScene, ArrayVis

TITLE = "Power Set"
SUBTITLE = "Generate all subsets of a set using backtracking."
CATEGORY = "backtracking"


class PowerSet(AlgoScene):
    TITLE = TITLE
    SUBTITLE = SUBTITLE
    CATEGORY = CATEGORY

    def build(self):
        # ── Stage 1: Intro Setup ────────────────────────────────────────────
        self.chapter_title("Problem Setup")
        nums = [1, 2, 3]
        vis = ArrayVis(nums, label="input set")
        self.play(FadeIn(vis))
        self.wait(1)

        intro_text = Text(
            "Power Set: all subsets of {1, 2, 3}",
            font_size=28,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.7)
        self.play(Write(intro_text))
        self.wait(1)

        formula_text = Text(
            "n = 3  →  |P(S)| = 2³ = 8 subsets",
            font_size=24,
            color=WHITE,
        ).next_to(intro_text, DOWN, buff=0.4)
        self.play(FadeIn(formula_text))
        self.wait(1.5)

        empty_note = Text(
            "Includes the empty set ∅ and the full set {1,2,3}",
            font_size=22,
            color=GRAY,
        ).next_to(formula_text, DOWN, buff=0.4)
        self.play(FadeIn(empty_note))
        self.wait(1.5)
        self.play(FadeOut(intro_text), FadeOut(formula_text), FadeOut(empty_note))

        # ── Stage 2: Backtracking Concept ──────────────────────────────────
        self.chapter_title("Backtracking Strategy")
        strategy_lines = VGroup(
            Text("For each element, we have exactly two choices:", font_size=24, color=WHITE),
            Text("  ① INCLUDE it in the current subset", font_size=22, color=GREEN),
            Text("  ② EXCLUDE it from the current subset", font_size=22, color=RED),
            Text("After deciding, recurse on remaining elements.", font_size=22, color=GRAY),
            Text("When no elements remain, record the current subset.", font_size=22, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(vis, DOWN, buff=0.7)
        self.play(FadeIn(strategy_lines, shift=UP * 0.2))
        self.wait(2.5)
        self.play(FadeOut(strategy_lines))

        # ── Stage 3: Decision Tree Root and Level 1 ────────────────────────
        self.chapter_title("Decision Tree — Root (element 1)")
        root_label = Text("path = []", font_size=22, color=WHITE).move_to(UP * 2.8)
        self.play(Write(root_label))
        self.wait(0.5)

        # Left branch: include 1
        inc_arrow = Arrow(root_label.get_bottom(), UP * 1.2 + LEFT * 2.8, color=GREEN, buff=0.12)
        inc_node = Text("path=[1]", font_size=20, color=GREEN).move_to(UP * 1.0 + LEFT * 2.8)
        inc_lbl = Text("+1", font_size=18, color=GREEN).next_to(inc_arrow, LEFT, buff=0.05)

        # Right branch: exclude 1
        exc_arrow = Arrow(root_label.get_bottom(), UP * 1.2 + RIGHT * 2.8, color=RED, buff=0.12)
        exc_node = Text("path=[]", font_size=20, color=RED).move_to(UP * 1.0 + RIGHT * 2.8)
        exc_lbl = Text("skip 1", font_size=18, color=RED).next_to(exc_arrow, RIGHT, buff=0.05)

        self.play(GrowArrow(inc_arrow), Write(inc_node), Write(inc_lbl))
        self.wait(0.8)
        self.play(GrowArrow(exc_arrow), Write(exc_node), Write(exc_lbl))
        self.wait(1.5)

        # ── Stage 4: Level 2 — element 2 ───────────────────────────────────
        self.chapter_title("Decision Tree — Level 2 (element 2)")

        # Children of path=[1]
        a_arrow = Arrow(inc_node.get_bottom(), DOWN * 0.0 + LEFT * 4.0, color=GREEN, buff=0.08)
        a_node = Text("[1,2]", font_size=18, color=GREEN).move_to(DOWN * 0.2 + LEFT * 4.0)
        b_arrow = Arrow(inc_node.get_bottom(), DOWN * 0.0 + LEFT * 1.6, color=RED, buff=0.08)
        b_node = Text("[1]", font_size=18, color=RED).move_to(DOWN * 0.2 + LEFT * 1.6)

        # Children of path=[]
        c_arrow = Arrow(exc_node.get_bottom(), DOWN * 0.0 + RIGHT * 1.6, color=GREEN, buff=0.08)
        c_node = Text("[2]", font_size=18, color=GREEN).move_to(DOWN * 0.2 + RIGHT * 1.6)
        d_arrow = Arrow(exc_node.get_bottom(), DOWN * 0.0 + RIGHT * 4.0, color=RED, buff=0.08)
        d_node = Text("[]", font_size=18, color=RED).move_to(DOWN * 0.2 + RIGHT * 4.0)

        self.play(GrowArrow(a_arrow), Write(a_node), GrowArrow(b_arrow), Write(b_node))
        self.wait(0.8)
        self.play(GrowArrow(c_arrow), Write(c_node), GrowArrow(d_arrow), Write(d_node))
        self.wait(1.5)

        # ── Stage 5: Level 3 — element 3 (leaf nodes = final subsets) ──────
        self.chapter_title("Decision Tree — Leaves (element 3, record subsets)")

        leaf_data = [
            (a_node, LEFT * 4.8, LEFT * 3.2, "[1,2,3]", "[1,2]"),
            (b_node, LEFT * 2.4, LEFT * 0.8, "[1,3]",   "[1]"),
            (c_node, RIGHT * 0.8, RIGHT * 2.4, "[2,3]",  "[2]"),
            (d_node, RIGHT * 3.2, RIGHT * 4.8, "[3]",    "[]"),
        ]

        leaf_mobs = VGroup()
        leaf_arrows = VGroup()
        for parent, lpos, rpos, ltxt, rtxt in leaf_data:
            la = Arrow(parent.get_bottom(), DOWN * 1.4 + lpos, color=GREEN, buff=0.08, stroke_width=2)
            ln = Text(ltxt, font_size=16, color=BLUE_B).move_to(DOWN * 1.6 + lpos)
            ra = Arrow(parent.get_bottom(), DOWN * 1.4 + rpos, color=RED, buff=0.08, stroke_width=2)
            rn = Text(rtxt, font_size=16, color=BLUE_B).move_to(DOWN * 1.6 + rpos)
            leaf_arrows.add(la, ra)
            leaf_mobs.add(ln, rn)

        self.play(LaggedStart(*[GrowArrow(a) for a in leaf_arrows], lag_ratio=0.1))
        self.play(LaggedStart(*[FadeIn(n, shift=DOWN * 0.15) for n in leaf_mobs], lag_ratio=0.1))
        self.wait(2)

        tree_group = VGroup(
            root_label,
            inc_arrow, inc_node, inc_lbl,
            exc_arrow, exc_node, exc_lbl,
            a_arrow, a_node, b_arrow, b_node,
            c_arrow, c_node, d_arrow, d_node,
            leaf_arrows, leaf_mobs,
        )
        self.play(FadeOut(tree_group))

        # ── Stage 6: Collect All 8 Subsets ─────────────────────────────────
        self.chapter_title("All 8 Subsets of {1, 2, 3}")
        all_subsets = [
            "∅", "{3}", "{2}", "{2,3}",
            "{1}", "{1,3}", "{1,2}", "{1,2,3}",
        ]
        subset_mobs = VGroup()
        for i, s in enumerate(all_subsets):
            col = i % 4
            row = i // 4
            mob = Text(s, font_size=26, color=BLUE_B).move_to(
                RIGHT * (col * 2.8 - 4.2) + DOWN * (row * 1.1 - 0.3)
            )
            subset_mobs.add(mob)

        result_title = Text(
            "P({1,2,3}) — 8 subsets:",
            font_size=26,
            color=YELLOW,
        ).next_to(vis, DOWN, buff=0.6)
        self.play(Write(result_title))
        self.wait(0.4)
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in subset_mobs], lag_ratio=0.12))
        self.wait(1.5)

        box_empty = SurroundingRectangle(subset_mobs[0], color=ORANGE, buff=0.12)
        box_full = SurroundingRectangle(subset_mobs[7], color=GREEN, buff=0.12)
        self.play(Create(box_empty), Create(box_full))
        note = Text(
            "∅ and {1,2,3} are always members of any power set",
            font_size=20,
            color=GRAY,
        ).next_to(subset_mobs, DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2)
        self.play(
            FadeOut(subset_mobs), FadeOut(result_title),
            FadeOut(box_empty), FadeOut(box_full), FadeOut(note),
        )

        # ── Stage 7: Tracing the Recursive Calls ───────────────────────────
        self.chapter_title("Tracing Recursive Backtracking")
        path_label = Text("current path = []  (index=0)", font_size=23, color=WHITE).next_to(vis, DOWN, buff=0.7)
        self.play(Write(path_label))
        self.wait(0.8)

        trace_steps = [
            ("include 1 → path=[1]  (index=1)", GREEN),
            ("include 2 → path=[1,2]  (index=2)", GREEN),
            ("include 3 → path=[1,2,3]  ✓ record {1,2,3}", GREEN),
            ("backtrack  → path=[1,2]  (index=2)", ORANGE),
            ("skip 3    → path=[1,2]  ✓ record {1,2}", RED),
            ("backtrack  → path=[1]   (index=1)", ORANGE),
            ("skip 2    → path=[1]    (index=2)", RED),
            ("include 3 → path=[1,3]  ✓ record {1,3}", GREEN),
            ("backtrack  → path=[1]   (index=2)", ORANGE),
            ("skip 3    → path=[1]    ✓ record {1}", RED),
            ("backtrack  → path=[]    (index=0)", ORANGE),
            ("skip 1    → path=[]     (index=1)", RED),
            ("... continue for elements 2 and 3 ...", GRAY),
            ("All 8 subsets collected — done!", YELLOW),
        ]
        for msg, color in trace_steps:
            new_label = Text(msg, font_size=21, color=color).next_to(vis, DOWN, buff=0.7)
            self.play(Transform(path_label, new_label), run_time=0.65)
            self.wait(0.85)

        self.play(FadeOut(path_label), FadeOut(vis))

        # ── Stage 8: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n · 2ⁿ)",
            space_complexity="O(n)",
            notes=(
                "There are exactly 2ⁿ subsets. Copying each subset into the result list "
                "takes O(n) time, giving O(n · 2ⁿ) overall. The recursion call stack "
                "reaches depth n, so auxiliary space is O(n) (excluding the output)."
            ),
        )
        self.wait(2)
