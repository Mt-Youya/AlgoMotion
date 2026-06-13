from manim import *
from ...base import AlgoScene, TreeVis
from ...base.tree_vis import TreeNode, from_list
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class BinarySearchTree(AlgoScene):
    TITLE = "Binary Search Tree"
    SUBTITLE = "BST enabling O(log n) search, insert, delete on average."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("What is a Binary Search Tree?")

        problem_lines = VGroup(
            Text("A Binary Search Tree (BST) is a node-based binary tree data structure.", font_size=25, color=INK),
            Text("BST Property: for every node N,", font_size=24, color=COBALT, weight="BOLD"),
            Text("  • All values in the LEFT subtree are LESS THAN N.", font_size=23, color=GRAY),
            Text("  • All values in the RIGHT subtree are GREATER THAN N.", font_size=23, color=GRAY),
            Text("This ordering property enables efficient O(log n) search on average.", font_size=23, color=SIGNAL),
            Text("Core operations: Search, Insert, Delete — all O(log n) average.", font_size=23, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(UP * 0.3)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.15) for line in problem_lines], lag_ratio=0.18))
        self.wait(1.5)
        self.play(FadeOut(problem_lines), FadeOut(ch1))

        # ── Stage 2: BST Property Explanation ───────────────────────────────
        ch2 = self.chapter_title("The BST Ordering Property")

        property_lines = VGroup(
            Text("The BST property is the key invariant that makes everything work.", font_size=25, color=INK, weight="BOLD"),
            Text("Given a node with value V:", font_size=23, color=COBALT),
            Text("  LEFT child (and all descendants) < V", font_size=22, color=CORAL),
            Text("  RIGHT child (and all descendants) > V", font_size=22, color=SIGNAL),
            Text("", font_size=12),
            Text("This means at each node we can eliminate half the tree —", font_size=22, color=GRAY),
            Text("just like binary search on a sorted array!", font_size=22, color=COBALT, weight="BOLD"),
            Text("Inorder traversal of a BST always yields a sorted sequence.", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).shift(DOWN * 0.1)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in property_lines], lag_ratio=0.18))
        self.wait(2.0)
        self.play(FadeOut(property_lines), FadeOut(ch2))

        # ── Stage 3: Build and Visualize the BST ────────────────────────────
        ch3 = self.chapter_title("Visualizing the BST")

        tree_label = Text(
            "BST with values inserted: 8, 4, 12, 2, 6, 10, 14",
            font_size=21, color=COBALT,
        ).to_edge(UP, buff=0.8)
        self.play(Write(tree_label))

        # Build BST: root=8, left subtree 4(2,6), right subtree 12(10,14)
        root = from_list([8, 4, 12, 2, 6, 10, 14])
        tree = TreeVis(self, root, center=[0, 1.2, 0])

        note = Text(
            "Each node satisfies: left subtree < node < right subtree.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.5)
        self.play(FadeOut(note), FadeOut(ch3))

        # ── Stage 4: Search Operation ────────────────────────────────────────
        ch4 = self.chapter_title("Step 1: Search for Value 6")

        node_8  = root
        node_4  = root.left
        node_12 = root.right
        node_2  = root.left.left
        node_6  = root.left.right
        node_10 = root.right.left
        node_14 = root.right.right

        step_note = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note)

        n1 = Text("Search(6): Start at root node 8. Is 6 == 8? No.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n1), run_time=0.3)
        tree.highlight(node_8, C_ACTIVE, run_time=0.4)
        self.wait(0.8)

        n2 = Text("6 < 8 → go LEFT to node 4. Is 6 == 4? No.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n2), run_time=0.3)
        tree.highlight(node_8, MIST, run_time=0.3)
        tree.highlight(node_4, C_ACTIVE, run_time=0.4)
        self.wait(0.8)

        n3 = Text("6 > 4 → go RIGHT to node 6. Is 6 == 6? YES — found!", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note, n3), run_time=0.3)
        tree.highlight(node_4, MIST, run_time=0.3)
        tree.highlight(node_6, C_SORTED, run_time=0.4)
        self.wait(0.8)

        found_label = Text("Found in 3 comparisons — O(log n)!", font_size=22, color=SIGNAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(found_label))
        self.wait(1.2)
        self.play(FadeOut(step_note), FadeOut(found_label), FadeOut(ch4))

        # ── Stage 5: Insert Operation ────────────────────────────────────────
        ch5 = self.chapter_title("Step 2: Insert Value 5")

        tree.reset_colors(run_time=0.4)
        step_note2 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note2)

        n4 = Text("Insert(5): Start at root 8. 5 < 8 → go LEFT.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n4), run_time=0.3)
        tree.highlight(node_8, C_ACTIVE, run_time=0.4)
        self.wait(0.7)

        n5 = Text("At node 4. 5 > 4 → go RIGHT.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n5), run_time=0.3)
        tree.highlight(node_8, MIST, run_time=0.3)
        tree.highlight(node_4, C_ACTIVE, run_time=0.4)
        self.wait(0.7)

        n6 = Text("At node 6. 5 < 6 → go LEFT. Left child is None → INSERT here!", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note2, n6), run_time=0.3)
        tree.highlight(node_4, MIST, run_time=0.3)
        tree.highlight(node_6, C_ACTIVE, run_time=0.4)
        self.wait(0.7)

        # Draw the new node 5 as a circle below node 6 to the left
        import numpy as np
        node_6_mob = tree._nodes[id(node_6)]
        new_pos = node_6_mob.pos + np.array([-0.55, -1.1, 0])
        new_circle = Circle(radius=0.38, color=INK, fill_color=SIGNAL, fill_opacity=1, stroke_width=2.5)
        new_circle.move_to(new_pos)
        new_label_mob = Text("5", font_size=22, color=INK, weight="BOLD").move_to(new_pos)
        new_edge = Line(node_6_mob.pos, new_pos, color=INK, stroke_width=2).set_z_index(-1)

        self.play(Create(new_edge), Create(new_circle), FadeIn(new_label_mob))
        inserted_msg = Text("Node 5 inserted as left child of 6!", font_size=22, color=SIGNAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(inserted_msg))
        self.wait(1.2)
        self.play(FadeOut(step_note2), FadeOut(inserted_msg), FadeOut(ch5))

        # ── Stage 6: Delete Operation ────────────────────────────────────────
        ch6 = self.chapter_title("Step 3: Delete Value 4 (Node with Two Children)")

        tree.reset_colors(run_time=0.35)
        step_note3 = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_note3)

        delete_info = VGroup(
            Text("Deleting a node with TWO children:", font_size=23, color=INK, weight="BOLD"),
            Text("1. Find the inorder successor (smallest in right subtree).", font_size=21, color=COBALT),
            Text("2. Replace deleted node's value with the successor's value.", font_size=21, color=COBALT),
            Text("3. Delete the successor from its original position.", font_size=21, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).to_corner(DOWN + LEFT, buff=0.45)

        self.play(FadeIn(delete_info))
        self.wait(0.5)

        n7 = Text("Delete(4): node 4 has two children (2 and 6).", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n7), run_time=0.3)
        tree.highlight(node_4, C_ACTIVE, run_time=0.4)
        self.wait(0.8)

        n8 = Text("Inorder successor of 4 = smallest in right subtree = 5.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n8), run_time=0.3)
        self.play(new_circle.animate.set_fill(color=CORAL), run_time=0.4)
        self.wait(0.8)

        n9 = Text("Replace node 4's value with 5, then delete node 5 from its position.", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.play(Transform(step_note3, n9), run_time=0.3)
        self.wait(1.0)

        self.play(FadeOut(step_note3), FadeOut(delete_info), FadeOut(ch6))

        # ── Stage 7: BST vs Balanced BST ────────────────────────────────────
        ch7 = self.chapter_title("Degenerate vs Balanced BST")

        balance_info = VGroup(
            Text("A BST's performance depends on its HEIGHT:", font_size=24, color=INK, weight="BOLD"),
            Text("", font_size=10),
            Text("Balanced BST (e.g., AVL, Red-Black):", font_size=22, color=SIGNAL, weight="BOLD"),
            Text("  Height = O(log n) → Search/Insert/Delete = O(log n)", font_size=21, color=COBALT),
            Text("", font_size=10),
            Text("Degenerate BST (sorted insertion order):", font_size=22, color=CORAL, weight="BOLD"),
            Text("  Degenerates into a linked list → Height = O(n)", font_size=21, color=COBALT),
            Text("  Search/Insert/Delete degrade to O(n)!", font_size=21, color=CORAL),
            Text("", font_size=10),
            Text("Solution: use self-balancing trees (AVL, Red-Black Tree).", font_size=21, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).shift(DOWN * 0.1)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.1) for line in balance_info], lag_ratio=0.15))
        self.wait(2.5)
        self.play(FadeOut(balance_info), FadeOut(ch7))

        # ── Stage 8: Inorder Traversal Produces Sorted Output ───────────────
        ch8 = self.chapter_title("Inorder = Sorted Output")

        tree.reset_colors(run_time=0.35)
        # Fade out the inserted node 5 visuals to keep it clean
        self.play(FadeOut(new_circle), FadeOut(new_label_mob), FadeOut(new_edge))

        inorder_note = Text(
            "Inorder traversal (left → root → right) of a BST yields sorted values.",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(inorder_note))
        self.wait(0.5)

        # Animate inorder traversal on the original 7-node tree
        result_display = Text("Inorder: []", font_size=22, color=CORAL, weight="BOLD").to_corner(DOWN + RIGHT, buff=0.5)
        self.play(FadeIn(result_display))

        visited_vals = []
        for node, label in [
            (node_2, "2"), (node_4, "4"), (node_6, "6"),
            (node_8, "8"), (node_10, "10"), (node_12, "12"), (node_14, "14"),
        ]:
            tree.highlight(node, C_SORTED, run_time=0.4)
            visited_vals.append(label)
            new_result = Text(
                f"Inorder: [{', '.join(visited_vals)}]",
                font_size=22, color=CORAL, weight="BOLD",
            ).to_corner(DOWN + RIGHT, buff=0.5)
            self.play(Transform(result_display, new_result), run_time=0.3)
            self.wait(0.4)

        self.wait(0.8)
        self.play(FadeOut(inorder_note), FadeOut(result_display), FadeOut(ch8))

        # ── Stage 9: Complexity Summary ──────────────────────────────────────
        ch9 = self.chapter_title("Complexity Analysis")
        self.wait(0.5)

        summary_lines = VGroup(
            Text("Operation   Average     Worst (degenerate)", font_size=22, color=INK, weight="BOLD"),
            Text("Search      O(log n)    O(n)", font_size=21, color=COBALT),
            Text("Insert      O(log n)    O(n)", font_size=21, color=COBALT),
            Text("Delete      O(log n)    O(n)", font_size=21, color=COBALT),
            Text("Inorder     O(n)        O(n)", font_size=21, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).shift(RIGHT * 2.5 + UP * 0.5)

        self.play(FadeIn(summary_lines, shift=UP * 0.2))
        self.wait(1.0)

        self.complexity_card(
            time_best=r"O(\log n)",
            time_avg=r"O(\log n)",
            time_worst=r"O(n)",
            space=r"O(n)",
            position=[-3.0, 0.0, 0],
        )
        self.wait(2.0)
        self.play(FadeOut(summary_lines), FadeOut(ch9), FadeOut(tree_label))
