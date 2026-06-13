from manim import *
from ...base import AlgoScene, TreeVis
from ...base.tree_vis import TreeNode, from_list
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class TreePreorder(AlgoScene):
    TITLE = "Preorder Traversal"
    SUBTITLE = "Traverse a binary tree in root-left-right order."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        problem_lines = VGroup(
            Text("Preorder traversal visits nodes in root → left → right order.", font_size=26, color=INK),
            Text("The root node is always visited FIRST before any children.", font_size=24, color=GRAY),
            Text("It is one of three fundamental depth-first traversal orders.", font_size=24, color=GRAY),
            Text("Preorder is used to create a copy of the tree or serialize it.", font_size=24, color=GRAY),
            Text("It naturally produces prefix expressions from expression trees.", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(UP * 0.4)

        example_label = VGroup(
            Text("Example tree:", font_size=22, color=COBALT, weight="BOLD"),
            Text("Values: [1, 2, 3, 4, 5, 6, 7]", font_size=20, color=GRAY),
            Text("Preorder result: [1, 2, 4, 5, 3, 6, 7]  ← root first!", font_size=22, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in problem_lines], lag_ratio=0.18))
        self.wait(0.6)
        self.play(FadeIn(example_label, shift=UP * 0.1))
        self.wait(1.5)
        self.play(FadeOut(problem_lines), FadeOut(example_label), FadeOut(ch1))

        # ── Stage 2: Traversal Order Explanation ────────────────────────────
        ch2 = self.chapter_title("Root → Left → Right")

        order_lines = VGroup(
            Text("The preorder rule applied recursively:", font_size=26, color=INK, weight="BOLD"),
            Text("1. VISIT (process) the CURRENT root node first.", font_size=23, color=CORAL),
            Text("2. Recursively traverse the LEFT subtree.", font_size=23, color=COBALT),
            Text("3. Recursively traverse the RIGHT subtree.", font_size=23, color=COBALT),
            Text("", font_size=12),
            Text("Base case: if the current node is None, simply return.", font_size=22, color=GRAY),
            Text("Each node is visited exactly once → O(n) time.", font_size=22, color=SIGNAL),
            Text("The call stack depth equals the tree height → O(h) space.", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in order_lines], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(order_lines), FadeOut(ch2))

        # ── Stage 3: Build the Tree ──────────────────────────────────────────
        ch3 = self.chapter_title("Visualizing the Tree")

        tree_label = Text(
            "Binary Tree: [1, 2, 3, 4, 5, 6, 7]",
            font_size=22, color=COBALT,
        ).to_edge(UP, buff=0.8)
        self.play(Write(tree_label))

        root = from_list([1, 2, 3, 4, 5, 6, 7])
        tree = TreeVis(self, root, center=[0, 1.0, 0])

        self.wait(0.8)

        note = Text(
            "We will step through preorder traversal: visit root before children.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.2)
        self.play(FadeOut(note), FadeOut(ch3))

        # ── Stage 4: Step 1 — Visit Root ────────────────────────────────────
        ch4 = self.chapter_title("Step 1: Visit Root Node First")

        node_1 = root
        node_2 = root.left
        node_3 = root.right
        node_4 = root.left.left
        node_5 = root.left.right
        node_6 = root.right.left
        node_7 = root.right.right

        step_note = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        n1 = Text("Enter root (1). In preorder, visit IMMEDIATELY.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n1), run_time=0.3)
        self.wait(0.5)
        tree.mark_visited(node_1)
        result_label = Text("Result: [1]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label))
        self.wait(0.8)

        n2 = Text("Now recurse into the LEFT subtree of (1).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n2), run_time=0.3)
        tree.highlight(node_2, MIST, run_time=0.35)
        self.wait(0.7)
        self.play(FadeOut(step_note), FadeOut(ch4))

        # ── Stage 5: Step 2 — Visit Node 2 and its Children ─────────────────
        ch5 = self.chapter_title("Step 2: Visit Node 2, then its Subtree")

        step_note2 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note2)

        n3 = Text("Enter node (2). Visit it immediately (preorder rule).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n3), run_time=0.3)
        self.wait(0.4)
        tree.mark_visited(node_2)
        self.play(FadeOut(result_label))
        result_label2 = Text("Result: [1, 2]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label2))
        self.wait(0.6)

        n4 = Text("Recurse into left child of (2) → enter node (4).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n4), run_time=0.3)
        tree.highlight(node_4, MIST, run_time=0.35)
        self.wait(0.4)

        n5 = Text("Node (4) has no children. Visit it immediately.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n5), run_time=0.3)
        tree.mark_visited(node_4)
        self.play(FadeOut(result_label2))
        result_label3 = Text("Result: [1, 2, 4]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label3))
        self.wait(0.6)

        n6 = Text("Backtrack to (2). Recurse into right child → node (5).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n6), run_time=0.3)
        tree.highlight(node_5, MIST, run_time=0.35)
        self.wait(0.4)

        n7 = Text("Node (5) has no children. Visit it immediately.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n7), run_time=0.3)
        tree.mark_visited(node_5)
        self.play(FadeOut(result_label3))
        result_label4 = Text("Result: [1, 2, 4, 5]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label4))
        self.wait(0.8)
        self.play(FadeOut(step_note2), FadeOut(ch5))

        # ── Stage 6: Step 3 — Traverse Right Subtree of Root ────────────────
        ch6 = self.chapter_title("Step 3: Traverse Right Subtree of Root")

        step_note3 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note3)

        n8 = Text("Left subtree of root (1) done. Now recurse right → node (3).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n8), run_time=0.3)
        tree.highlight(node_3, MIST, run_time=0.35)
        self.wait(0.5)

        n9 = Text("Enter node (3). Visit it immediately (preorder rule).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n9), run_time=0.3)
        tree.mark_visited(node_3)
        self.play(FadeOut(result_label4))
        result_label5 = Text("Result: [1, 2, 4, 5, 3]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label5))
        self.wait(0.6)

        n10 = Text("Recurse into left child of (3) → enter node (6).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n10), run_time=0.3)
        tree.highlight(node_6, MIST, run_time=0.35)
        self.wait(0.4)

        n11 = Text("Node (6) has no children. Visit it immediately.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n11), run_time=0.3)
        tree.mark_visited(node_6)
        self.play(FadeOut(result_label5))
        result_label6 = Text("Result: [1, 2, 4, 5, 3, 6]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_label6))
        self.wait(0.6)

        n12 = Text("Backtrack to (3). Recurse right → node (7). Visit immediately.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n12), run_time=0.3)
        tree.highlight(node_7, MIST, run_time=0.35)
        self.wait(0.4)
        tree.mark_visited(node_7)
        self.play(FadeOut(result_label6))
        result_final = Text("Result: [1, 2, 4, 5, 3, 6, 7]  ✓", font_size=22, color=SIGNAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_final))
        self.wait(1.0)
        self.play(FadeOut(step_note3), FadeOut(ch6))

        # ── Stage 7: Final Result Summary ────────────────────────────────────
        ch7 = self.chapter_title("Traversal Complete")

        result_box = VGroup(
            Text("Preorder Result", font_size=30, color=INK, weight="BOLD"),
            MathTex(r"[1,\;2,\;4,\;5,\;3,\;6,\;7]", font_size=38, color=SIGNAL),
            Text("Root is always the first element in preorder output.", font_size=22, color=GRAY),
            Text("Useful for serializing/reconstructing trees.", font_size=22, color=COBALT),
        ).arrange(DOWN, buff=0.3).shift(RIGHT * 2.8 + DOWN * 0.3)

        self.play(FadeIn(result_box, shift=UP * 0.2))
        tree.indicate(node_1)
        tree.indicate(node_2)
        tree.indicate(node_3)
        self.wait(1.5)
        self.play(FadeOut(result_box), FadeOut(result_final), FadeOut(tree_label), FadeOut(ch7))

        # ── Stage 8: Recursive vs Iterative ─────────────────────────────────
        ch8 = self.chapter_title("Recursive vs Iterative")

        comparison = VGroup(
            Text("Recursive approach:", font_size=24, color=INK, weight="BOLD"),
            Text("  def preorder(node): visit → go left → go right", font_size=20, color=COBALT),
            Text("  Stack depth = O(h) where h is tree height.", font_size=20, color=GRAY),
            Text("", font_size=12),
            Text("Iterative approach (explicit stack):", font_size=24, color=INK, weight="BOLD"),
            Text("  Push root. While stack not empty: pop, visit,", font_size=20, color=COBALT),
            Text("  push right child then left child (LIFO order).", font_size=20, color=COBALT),
            Text("  Left is pushed last so it is processed first.", font_size=20, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in comparison], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(comparison), FadeOut(ch8))

        # ── Stage 9: Use Cases ────────────────────────────────────────────────
        ch9 = self.chapter_title("Real-World Applications")

        use_cases = VGroup(
            Text("Preorder traversal powers many real-world tasks:", font_size=24, color=INK, weight="BOLD"),
            Text("• Serialize a tree to reconstruct it later.", font_size=22, color=COBALT),
            Text("• Evaluate prefix (Polish) notation expressions.", font_size=22, color=COBALT),
            Text("• Copy an entire tree structure (deep clone).", font_size=22, color=COBALT),
            Text("• Print directory trees (folder before its files).", font_size=22, color=COBALT),
            Text("• Generate XML/HTML from a DOM tree.", font_size=22, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.1)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in use_cases], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(use_cases), FadeOut(ch9))

        # ── Stage 10: Complexity Card ─────────────────────────────────────────
        ch10 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)
        self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(h)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch10))
