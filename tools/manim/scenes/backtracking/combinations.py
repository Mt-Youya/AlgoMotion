from manim import *
from ...base import AlgoScene, TreeVis


class Combinations(AlgoScene):
    TITLE = "Combinations"
    SUBTITLE = "Generate all k-element combinations from n elements."
    CATEGORY = "backtracking"

    def build(self):
        # ─── Stage 1: Intro ───────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        problem_text = VGroup(
            Text("Given n = 4, k = 2", font_size=36, color=WHITE),
            Text("Find all 2-element combinations from {1, 2, 3, 4}", font_size=28, color=GRAY),
        ).arrange(DOWN, buff=0.4).move_to(UP * 1.5)

        self.play(FadeIn(problem_text, shift=UP * 0.3))
        self.wait(1.5)

        elements = VGroup(*[
            VGroup(
                Square(side_length=0.7, color=BLUE, fill_opacity=0.3),
                Text(str(i), font_size=28, color=WHITE),
            ).arrange(BUFF=0)
            for i in range(1, 5)
        ]).arrange(RIGHT, buff=0.3).move_to(DOWN * 0.5)

        for sq in elements:
            sq[1].move_to(sq[0].get_center())

        self.play(LaggedStart(*[FadeIn(e, scale=0.8) for e in elements], lag_ratio=0.15))
        self.wait(1)

        label_n = Text("n = 4 elements", font_size=24, color=YELLOW).next_to(elements, DOWN, buff=0.4)
        label_k = Text("k = 2  (choose 2)", font_size=24, color=GREEN).next_to(label_n, DOWN, buff=0.2)
        self.play(Write(label_n), Write(label_k))
        self.wait(1.5)
        self.play(FadeOut(problem_text), FadeOut(elements), FadeOut(label_n), FadeOut(label_k))

        # ─── Stage 2: Backtracking Intuition ──────────────────────────────
        self.chapter_title("Backtracking Intuition")

        idea_lines = VGroup(
            Text("• Start with an empty combination [ ]", font_size=26, color=WHITE),
            Text("• At each step, pick the next element (≥ last chosen)", font_size=26, color=WHITE),
            Text("• When combo length == k, record it", font_size=26, color=WHITE),
            Text("• Backtrack: undo the last choice and try the next", font_size=26, color=WHITE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(ORIGIN)

        for line in idea_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.2))
            self.wait(0.6)
        self.wait(1.5)
        self.play(FadeOut(idea_lines))

        # ─── Stage 3: Decision Tree (n=4, k=2) ───────────────────────────
        self.chapter_title("Decision Tree  (n=4, k=2)")

        root_pos   = UP * 2.8
        level1_pos = UP * 1.2
        level2_pos = DOWN * 0.6
        result_pos = DOWN * 2.2

        def make_node(label, pos, color=BLUE_D):
            circle = Circle(radius=0.32, color=color, fill_opacity=0.4)
            txt    = Text(label, font_size=20, color=WHITE)
            txt.move_to(circle.get_center())
            grp = VGroup(circle, txt).move_to(pos)
            return grp

        root = make_node("[ ]", root_pos, WHITE)
        self.play(FadeIn(root, scale=0.7))
        self.wait(0.5)

        # Level-1 nodes: start = 1,2,3
        l1_labels = ["[1]", "[2]", "[3]"]
        l1_x      = [-3.5, 0, 3.5]
        l1_nodes  = []
        l1_edges  = []
        for lbl, x in zip(l1_labels, l1_x):
            node = make_node(lbl, level1_pos + RIGHT * x)
            edge = Line(root.get_bottom(), node.get_top(), color=GRAY, stroke_width=1.5)
            l1_nodes.append(node)
            l1_edges.append(edge)

        for edge, node in zip(l1_edges, l1_nodes):
            self.play(Create(edge), FadeIn(node, scale=0.7), run_time=0.5)
        self.wait(0.8)

        # Level-2 nodes and result labels
        l2_data = [
            ("[1,2]", -4.5, GREEN),
            ("[1,3]", -3.0, GREEN),
            ("[1,4]", -1.5, GREEN),
            ("[2,3]", 0.5,  GREEN),
            ("[2,4]", 2.0,  GREEN),
            ("[3,4]", 3.8,  GREEN),
        ]
        l2_parents = [0, 0, 0, 1, 1, 2]
        l2_nodes   = []
        l2_edges   = []

        for (lbl, x, col), parent_idx in zip(l2_data, l2_parents):
            node = make_node(lbl, level2_pos + RIGHT * x, col)
            parent_node = l1_nodes[parent_idx]
            edge = Line(parent_node.get_bottom(), node.get_top(), color=GRAY, stroke_width=1.5)
            l2_nodes.append(node)
            l2_edges.append(edge)

        for edge, node in zip(l2_edges, l2_nodes):
            self.play(Create(edge), FadeIn(node, scale=0.7), run_time=0.4)
        self.wait(1)

        result_label = Text("6 combinations found!", font_size=28, color=YELLOW).move_to(result_pos)
        self.play(Write(result_label))
        self.wait(2)
        self.play(FadeOut(VGroup(root, result_label,
                                  *l1_nodes, *l1_edges,
                                  *l2_nodes, *l2_edges)))

        # ─── Stage 4: Step-by-step trace ─────────────────────────────────
        self.chapter_title("Step-by-Step Trace")

        combo_box = Rectangle(width=3.5, height=0.9, color=BLUE, fill_opacity=0.15)
        combo_lbl = Text("Current combo:", font_size=22, color=GRAY).next_to(combo_box, UP, buff=0.15)
        combo_val = Text("[ ]", font_size=26, color=WHITE).move_to(combo_box.get_center())
        combo_grp = VGroup(combo_box, combo_lbl, combo_val).move_to(UP * 2.5 + LEFT * 3.5)
        self.play(FadeIn(combo_grp))

        results_title = Text("Results:", font_size=22, color=GRAY).move_to(UP * 2.5 + RIGHT * 2.5)
        self.play(Write(results_title))

        results_list = VGroup()
        result_colors = [GREEN_B, GREEN_C, TEAL_B, TEAL_C, BLUE_B, BLUE_C]

        steps = [
            ("pick 1", "[1]",   None),
            ("pick 2", "[1,2]", "[1,2]"),
            ("back",   "[1]",   None),
            ("pick 3", "[1,3]", "[1,3]"),
            ("back",   "[1]",   None),
            ("pick 4", "[1,4]", "[1,4]"),
            ("back",   "[ ]",   None),
            ("pick 2", "[2]",   None),
            ("pick 3", "[2,3]", "[2,3]"),
            ("back",   "[2]",   None),
            ("pick 4", "[2,4]", "[2,4]"),
            ("back",   "[ ]",   None),
            ("pick 3", "[3]",   None),
            ("pick 4", "[3,4]", "[3,4]"),
        ]

        result_count = 0
        for action, state, record in steps:
            new_val = Text(state, font_size=26,
                           color=GREEN if record else WHITE).move_to(combo_box.get_center())
            self.play(Transform(combo_val, new_val), run_time=0.35)

            if record:
                entry = Text(record, font_size=22, color=result_colors[result_count % len(result_colors)])
                if result_count == 0:
                    entry.next_to(results_title, DOWN, buff=0.25)
                else:
                    entry.next_to(results_list[-1], DOWN, buff=0.18)
                results_list.add(entry)
                self.play(FadeIn(entry, shift=LEFT * 0.2), run_time=0.3)
                result_count += 1
            self.wait(0.25)

        self.wait(1.5)
        self.play(FadeOut(combo_grp), FadeOut(results_title), FadeOut(results_list))

        # ─── Stage 5: Pruning Optimisation ───────────────────────────────
        self.chapter_title("Pruning: Skip Impossible Branches")

        prune_text = VGroup(
            Text("Key optimisation: only iterate up to", font_size=26, color=WHITE),
            Text("i ≤ n - (k - len(combo)) + 1", font_size=30, color=YELLOW),
            Text("This skips branches that can never reach length k", font_size=24, color=GRAY),
        ).arrange(DOWN, buff=0.4).move_to(UP * 1.2)

        self.play(FadeIn(prune_text[0]))
        self.wait(0.5)
        self.play(Write(prune_text[1]))
        self.wait(0.8)
        self.play(FadeIn(prune_text[2]))
        self.wait(1.5)

        example = VGroup(
            Text("n=4, k=2, combo=[ ]  →  iterate 1..3  (not 1..4)", font_size=22, color=BLUE_B),
            Text("n=4, k=2, combo=[1]  →  iterate 2..4", font_size=22, color=BLUE_B),
        ).arrange(DOWN, buff=0.3).next_to(prune_text, DOWN, buff=0.5)
        self.play(FadeIn(example))
        self.wait(2)
        self.play(FadeOut(prune_text), FadeOut(example))

        # ─── Stage 6: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(C(n,k) · k)",
            space_complexity="O(k)",
            notes="C(n,k) combinations, each of length k"
        )
        self.wait(2)
