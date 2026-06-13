from manim import *
from ...base import AlgoScene, TreeVis
from ...base.tree_vis import TreeNode, from_list
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class TreeDpMaxPath(AlgoScene):
    TITLE = "Tree DP: Max Path Sum"
    SUBTITLE = "Find maximum path sum in a binary tree using tree DP."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        problem_lines = VGroup(
            Text("Given a binary tree, find the maximum path sum.", font_size=26, color=INK),
            Text("A path is any sequence of nodes connected by edges.", font_size=24, color=GRAY),
            Text("The path does NOT need to pass through the root.", font_size=24, color=GRAY),
            Text("Each node appears at most once in the path.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).shift(UP * 0.5)

        example_label = VGroup(
            Text("Example tree:", font_size=22, color=COBALT, weight="BOLD"),
            Text("Values: [-10, 9, 20, None, None, 15, 7]", font_size=20, color=GRAY),
            Text("Answer: 42  (path: 15 → 20 → 7)", font_size=22, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in problem_lines], lag_ratio=0.2))
        self.wait(0.6)
        self.play(FadeIn(example_label, shift=UP * 0.1))
        self.wait(1.5)
        self.play(FadeOut(problem_lines), FadeOut(example_label), FadeOut(ch1))

        # ── Stage 2: Key Insight — Tree DP ──────────────────────────────────
        ch2 = self.chapter_title("Key Insight: Tree DP")

        insight_lines = VGroup(
            Text("At each node we make a local decision:", font_size=26, color=INK, weight="BOLD"),
            Text("1. The best path that passes THROUGH this node (for global answer).", font_size=22, color=COBALT),
            Text("2. The best path that STARTS at this node going downward (to return to parent).", font_size=22, color=COBALT),
            Text("", font_size=14),
            Text("For each node n with left gain L and right gain R:", font_size=22, color=INK),
            Text("  gain(n) = n.val + max(0, L, R)        ← best single-branch extension", font_size=20, color=SIGNAL),
            Text("  path(n) = n.val + max(0, L) + max(0, R) ← best path through n", font_size=20, color=CORAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in insight_lines], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(insight_lines), FadeOut(ch2))

        # ── Stage 3: Build the Tree ──────────────────────────────────────────
        ch3 = self.chapter_title("Visualizing the Tree")

        tree_label = Text(
            "Tree: [-10, 9, 20, None, None, 15, 7]",
            font_size=22, color=COBALT,
        ).to_edge(UP, buff=0.8)
        self.play(Write(tree_label))

        root = from_list([-10, 9, 20, None, None, 15, 7])
        tree = TreeVis(self, root, center=[0, 1.2, 0])

        self.wait(1.0)

        note = Text(
            "We will run a post-order DFS to compute gains bottom-up.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.2)
        self.play(FadeOut(note), FadeOut(ch3))

        # ── Stage 4: Post-order DFS — Leaf Nodes ────────────────────────────
        ch4 = self.chapter_title("Step 1: Process Leaf Nodes")

        step_note = Text("", font_size=19, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        # Highlight node 9 (left child of root)
        node_9 = root.left
        tree.highlight(node_9, CORAL)
        new_note = Text(
            "Node 9 is a leaf.  gain = 9 + max(0, 0, 0) = 9",
            font_size=19, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, new_note), run_time=0.3)
        self.wait(0.8)

        # Highlight node 15 (left child of 20)
        node_20 = root.right
        node_15 = node_20.left
        tree.highlight(node_15, CORAL)
        new_note2 = Text(
            "Node 15 is a leaf.  gain = 15 + max(0, 0, 0) = 15",
            font_size=19, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, new_note2), run_time=0.3)
        self.wait(0.8)

        # Highlight node 7 (right child of 20)
        node_7 = node_20.right
        tree.highlight(node_7, CORAL)
        new_note3 = Text(
            "Node 7 is a leaf.  gain = 7 + max(0, 0, 0) = 7",
            font_size=19, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, new_note3), run_time=0.3)
        self.wait(0.8)

        tree.mark_visited(node_9)
        tree.mark_visited(node_15)
        tree.mark_visited(node_7)
        self.wait(0.5)
        self.play(FadeOut(step_note), FadeOut(ch4))

        # ── Stage 5: Process Internal Node 20 ───────────────────────────────
        ch5 = self.chapter_title("Step 2: Process Node 20")

        step_note2 = Text("", font_size=19, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note2)

        tree.highlight(node_20, C_ACTIVE)
        n20_gain = VGroup(
            Text("Node 20:", font_size=22, color=INK, weight="BOLD"),
            Text("  left_gain  = max(0, gain(15)) = max(0, 15) = 15", font_size=20, color=COBALT),
            Text("  right_gain = max(0, gain(7))  = max(0, 7)  = 7", font_size=20, color=COBALT),
            Text("  gain(20)   = 20 + max(15, 7)  = 20 + 15   = 35", font_size=20, color=SIGNAL),
            Text("  path(20)   = 20 + 15 + 7      = 42  ← new global max!", font_size=20, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).shift(RIGHT * 2.5 + DOWN * 0.5)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.08) for line in n20_gain], lag_ratio=0.2))
        self.wait(2.0)
        self.play(FadeOut(n20_gain), FadeOut(step_note2), FadeOut(ch5))

        # ── Stage 6: Process Root Node -10 ──────────────────────────────────
        ch6 = self.chapter_title("Step 3: Process Root Node -10")

        tree.highlight(root, C_ACTIVE)
        n_root_gain = VGroup(
            Text("Node -10 (root):", font_size=22, color=INK, weight="BOLD"),
            Text("  left_gain  = max(0, gain(9))  = max(0, 9)  = 9", font_size=20, color=COBALT),
            Text("  right_gain = max(0, gain(20)) = max(0, 35) = 35", font_size=20, color=COBALT),
            Text("  gain(-10)  = -10 + max(9, 35) = -10 + 35  = 25", font_size=20, color=SIGNAL),
            Text("  path(-10)  = -10 + 9 + 35     = 34  (not a new max)", font_size=20, color=GRAY),
            Text("  Global max remains: 42", font_size=20, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).shift(RIGHT * 2.5 + DOWN * 0.5)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.08) for line in n_root_gain], lag_ratio=0.2))
        self.wait(2.0)
        tree.mark_visited(node_20)
        tree.mark_visited(root)
        self.wait(0.5)
        self.play(FadeOut(n_root_gain), FadeOut(ch6))

        # ── Stage 7: Final Answer ────────────────────────────────────────────
        ch7 = self.chapter_title("Result: Maximum Path Sum = 42")

        result_box = VGroup(
            Text("Maximum Path Sum", font_size=30, color=INK, weight="BOLD"),
            MathTex(r"15 \;\to\; 20 \;\to\; 7 \;=\; 42", font_size=36, color=CORAL),
            Text("The path 15 → 20 → 7 passes through node 20.", font_size=22, color=GRAY),
            Text("It does NOT pass through the root (-10).", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.3).shift(RIGHT * 2.8 + DOWN * 0.3)

        self.play(FadeIn(result_box, shift=UP * 0.2))
        tree.indicate(node_15)
        tree.indicate(node_20)
        tree.indicate(node_7)
        self.wait(1.5)
        self.play(FadeOut(result_box), FadeOut(tree_label), FadeOut(ch7))

        # ── Stage 8: Recurrence Summary ─────────────────────────────────────
        ch8 = self.chapter_title("Recurrence Summary")

        recurrence = VGroup(
            MathTex(
                r"\text{gain}(n) = n.\text{val} + \max(0,\;\text{gain}(n.\text{left}),\;\text{gain}(n.\text{right}))",
                font_size=24, color=INK,
            ),
            MathTex(
                r"\text{path}(n) = n.\text{val} + \max(0,\;\text{gain}(n.\text{left})) + \max(0,\;\text{gain}(n.\text{right}))",
                font_size=24, color=INK,
            ),
            Text("ans = max(ans, path(n))  for every node n", font_size=22, color=COBALT),
            Text("Return gain(n) to the parent (single branch only).", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=DOWN * 0.1) for line in recurrence], lag_ratio=0.25))
        self.wait(2.0)
        self.play(FadeOut(recurrence), FadeOut(ch8))

        # ── Stage 9: Complexity Card ─────────────────────────────────────────
        ch9 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(h)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch9))
