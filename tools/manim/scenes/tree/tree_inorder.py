from manim import *
from ...base import AlgoScene, TreeVis
from ...base.tree_vis import TreeNode, from_list
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class TreeInorder(AlgoScene):
    TITLE = "Inorder Traversal"
    SUBTITLE = "Traverse a binary tree in left-root-right order."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        problem_lines = VGroup(
            Text("Inorder traversal visits nodes in left → root → right order.", font_size=26, color=INK),
            Text("For a Binary Search Tree, inorder produces a sorted sequence.", font_size=24, color=GRAY),
            Text("It is one of three fundamental depth-first traversal orders.", font_size=24, color=GRAY),
            Text("The other two are preorder (root → left → right)", font_size=24, color=GRAY),
            Text("and postorder (left → right → root).", font_size=24, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(UP * 0.4)

        example_label = VGroup(
            Text("Example tree:", font_size=22, color=COBALT, weight="BOLD"),
            Text("Values: [4, 2, 6, 1, 3, 5, 7]", font_size=20, color=GRAY),
            Text("Inorder result: [1, 2, 3, 4, 5, 6, 7]  ← sorted!", font_size=22, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).shift(DOWN * 2.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in problem_lines], lag_ratio=0.18))
        self.wait(0.6)
        self.play(FadeIn(example_label, shift=UP * 0.1))
        self.wait(1.5)
        self.play(FadeOut(problem_lines), FadeOut(example_label), FadeOut(ch1))

        # ── Stage 2: Traversal Order Explanation ────────────────────────────
        ch2 = self.chapter_title("Left → Root → Right")

        order_lines = VGroup(
            Text("The inorder rule applied recursively:", font_size=26, color=INK, weight="BOLD"),
            Text("1. Recursively traverse the LEFT subtree.", font_size=23, color=COBALT),
            Text("2. Visit (process) the CURRENT root node.", font_size=23, color=CORAL),
            Text("3. Recursively traverse the RIGHT subtree.", font_size=23, color=COBALT),
            Text("", font_size=12),
            Text("Base case: if the current node is None, simply return.", font_size=22, color=GRAY),
            Text("Each node is visited exactly once → O(n) time.", font_size=22, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in order_lines], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(order_lines), FadeOut(ch2))

        # ── Stage 3: Build the Tree ──────────────────────────────────────────
        ch3 = self.chapter_title("Visualizing the Tree")

        tree_label = Text(
            "BST: [4, 2, 6, 1, 3, 5, 7]",
            font_size=22, color=COBALT,
        ).to_edge(UP, buff=0.8)
        self.play(Write(tree_label))

        root = from_list([4, 2, 6, 1, 3, 5, 7])
        tree = TreeVis(self, root, center=[0, 1.0, 0])

        self.wait(0.8)

        note = Text(
            "We will step through the recursive inorder traversal node by node.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.2)
        self.play(FadeOut(note), FadeOut(ch3))

        # ── Stage 4: Step-by-Step — Dive Left ───────────────────────────────
        ch4 = self.chapter_title("Step 1: Dive to the Leftmost Leaf")

        step_note = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        # Highlight root (enter but don't visit yet)
        node_4 = root
        node_2 = root.left
        node_1 = root.left.left
        node_3 = root.left.right
        node_6 = root.right
        node_5 = root.right.left
        node_7 = root.right.right

        tree.highlight(node_4, MIST, run_time=0.35)
        n1 = Text("Enter root (4) — go left first.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n1), run_time=0.3)
        self.wait(0.7)

        tree.highlight(node_2, MIST, run_time=0.35)
        n2 = Text("Enter node (2) — go left first.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n2), run_time=0.3)
        self.wait(0.7)

        tree.highlight(node_1, MIST, run_time=0.35)
        n3 = Text("Enter node (1) — left child is None → VISIT node 1.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n3), run_time=0.3)
        self.wait(0.5)

        tree.mark_visited(node_1)
        result_so_far = Text("Result: [1]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far))
        self.wait(0.8)
        self.play(FadeOut(step_note), FadeOut(ch4))

        # ── Stage 5: Visit Node 2 and Node 3 ────────────────────────────────
        ch5 = self.chapter_title("Step 2: Backtrack and Visit Node 2")

        step_note2 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note2)

        n4 = Text("Node 1's right child is None. Return to node (2).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n4), run_time=0.3)
        self.wait(0.7)

        tree.mark_visited(node_2)
        self.play(FadeOut(result_so_far))
        result_so_far2 = Text("Result: [1, 2]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far2))
        self.wait(0.6)

        n5 = Text("Now traverse right subtree of (2) → enter node (3).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n5), run_time=0.3)
        tree.highlight(node_3, MIST, run_time=0.35)
        self.wait(0.6)

        n6 = Text("Node 3 has no children → VISIT node 3.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n6), run_time=0.3)
        tree.mark_visited(node_3)
        self.play(FadeOut(result_so_far2))
        result_so_far3 = Text("Result: [1, 2, 3]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far3))
        self.wait(0.8)
        self.play(FadeOut(step_note2), FadeOut(ch5))

        # ── Stage 6: Visit Root Node 4 ───────────────────────────────────────
        ch6 = self.chapter_title("Step 3: Visit Root Node 4")

        step_note3 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note3)

        n7 = Text("Left subtree of (4) fully processed. Now VISIT root (4).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n7), run_time=0.3)
        self.wait(0.5)
        tree.mark_visited(node_4)
        self.play(FadeOut(result_so_far3))
        result_so_far4 = Text("Result: [1, 2, 3, 4]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far4))
        self.wait(1.0)
        self.play(FadeOut(step_note3), FadeOut(ch6))

        # ── Stage 7: Traverse Right Subtree ─────────────────────────────────
        ch7 = self.chapter_title("Step 4: Traverse Right Subtree")

        step_note4 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note4)

        n8 = Text("Enter right subtree of (4) → node (6). Go left first.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note4, n8), run_time=0.3)
        tree.highlight(node_6, MIST, run_time=0.35)
        self.wait(0.6)

        tree.highlight(node_5, MIST, run_time=0.35)
        n9 = Text("Enter node (5) — no children → VISIT node 5.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note4, n9), run_time=0.3)
        tree.mark_visited(node_5)
        self.play(FadeOut(result_so_far4))
        result_so_far5 = Text("Result: [1, 2, 3, 4, 5]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far5))
        self.wait(0.6)

        n10 = Text("Return to node (6). VISIT node 6.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note4, n10), run_time=0.3)
        tree.mark_visited(node_6)
        self.play(FadeOut(result_so_far5))
        result_so_far6 = Text("Result: [1, 2, 3, 4, 5, 6]", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_so_far6))
        self.wait(0.6)

        n11 = Text("Enter right child of (6) → node (7). No children → VISIT node 7.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note4, n11), run_time=0.3)
        tree.highlight(node_7, MIST, run_time=0.35)
        self.wait(0.4)
        tree.mark_visited(node_7)
        self.play(FadeOut(result_so_far6))
        result_final = Text("Result: [1, 2, 3, 4, 5, 6, 7]  ✓", font_size=22, color=SIGNAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_final))
        self.wait(1.0)
        self.play(FadeOut(step_note4), FadeOut(ch7))

        # ── Stage 8: Final Result Summary ────────────────────────────────────
        ch8 = self.chapter_title("Traversal Complete")

        result_box = VGroup(
            Text("Inorder Result", font_size=30, color=INK, weight="BOLD"),
            MathTex(r"[1,\;2,\;3,\;4,\;5,\;6,\;7]", font_size=38, color=SIGNAL),
            Text("The BST's inorder sequence is always sorted ascending.", font_size=22, color=GRAY),
            Text("This property is used to validate BSTs in O(n) time.", font_size=22, color=COBALT),
        ).arrange(DOWN, buff=0.3).shift(RIGHT * 2.8 + DOWN * 0.3)

        self.play(FadeIn(result_box, shift=UP * 0.2))
        tree.indicate(node_1)
        tree.indicate(node_2)
        tree.indicate(node_3)
        tree.indicate(node_4)
        self.wait(1.5)
        self.play(FadeOut(result_box), FadeOut(result_final), FadeOut(tree_label), FadeOut(ch8))

        # ── Stage 9: Recursive vs Iterative ─────────────────────────────────
        ch9 = self.chapter_title("Recursive vs Iterative")

        comparison = VGroup(
            Text("Recursive approach:", font_size=24, color=INK, weight="BOLD"),
            Text("  def inorder(node):  visit left → self → right", font_size=20, color=COBALT),
            Text("  Stack depth = O(h) where h is tree height.", font_size=20, color=GRAY),
            Text("", font_size=12),
            Text("Iterative approach (explicit stack):", font_size=24, color=INK, weight="BOLD"),
            Text("  Push nodes left until None, then pop and visit,", font_size=20, color=COBALT),
            Text("  then move to the right child.", font_size=20, color=COBALT),
            Text("  Avoids call-stack overflow for very deep trees.", font_size=20, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).shift(DOWN * 0.2)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in comparison], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(comparison), FadeOut(ch9))

        # ── Stage 10: Complexity Card ────────────────────────────────────────
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
