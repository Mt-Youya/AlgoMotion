from manim import *
from ...base import AlgoScene, TreeVis


class TreeLca(AlgoScene):
    TITLE = "Lowest Common Ancestor"
    SUBTITLE = "Find the lowest common ancestor of two nodes in a binary tree."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Given a binary tree and two nodes p and q,", font_size=28),
            Text("find their Lowest Common Ancestor (LCA).", font_size=28),
            Text("LCA: the deepest node that is an ancestor of both p and q.", font_size=24, color=YELLOW),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Build the tree ─────────────────────────────────────────
        self.chapter_title("Build Example Tree")

        #   Build a binary tree:
        #          3
        #        /   \
        #       5     1
        #      / \   / \
        #     6   2 0   8
        #        / \
        #       7   4
        tree = TreeVis(
            root_val=3,
            children={
                3: (5, 1),
                5: (6, 2),
                1: (0, 8),
                2: (7, 4),
            },
        )
        tree_mob = tree.build_mobject().scale(0.85).move_to(ORIGIN + DOWN * 0.5)
        self.play(Create(tree_mob))
        self.wait(1)

        label_p = Text("p = 5", font_size=26, color=BLUE).to_edge(UL).shift(DOWN * 1.2)
        label_q = Text("q = 4", font_size=26, color=GREEN).next_to(label_p, DOWN, buff=0.2)
        self.play(FadeIn(label_p), FadeIn(label_q))
        self.wait(1.5)

        # Highlight nodes p=5 and q=4
        node_5 = tree.get_node_mobject(5)
        node_4 = tree.get_node_mobject(4)
        self.play(
            node_5.animate.set_fill(BLUE, opacity=0.6),
            node_4.animate.set_fill(GREEN, opacity=0.6),
        )
        self.wait(1.5)

        # ── Stage 3: Recursive DFS Approach ────────────────────────────────
        self.chapter_title("Recursive DFS Approach")

        approach = VGroup(
            Text("Approach: Post-order DFS", font_size=28, color=YELLOW),
            Text("1. If node is None → return None", font_size=24),
            Text("2. If node == p or node == q → return node", font_size=24),
            Text("3. Recurse left and right subtrees", font_size=24),
            Text("4. If both sides return non-None → current node is LCA", font_size=24),
            Text("5. Otherwise return whichever side is non-None", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).to_edge(RIGHT).shift(LEFT * 0.3)

        self.play(FadeIn(approach, shift=LEFT))
        self.wait(2.5)
        self.play(FadeOut(approach))

        # ── Stage 4: Animate DFS traversal ─────────────────────────────────
        self.chapter_title("DFS Traversal")

        traversal_order = [3, 5, 6, 5, 2, 7, 2, 4, 2, 5, 1, 0, 1, 8, 1, 3]
        visit_label = Text("Visiting:", font_size=26).to_edge(UL).shift(DOWN * 1.2)
        self.play(FadeIn(visit_label))

        visited_nodes = []
        for val in traversal_order:
            node_mob = tree.get_node_mobject(val)
            val_text = Text(str(val), font_size=26, color=WHITE).next_to(visit_label, RIGHT, buff=0.2)
            self.play(
                node_mob.animate.set_stroke(YELLOW, width=4),
                FadeIn(val_text),
                run_time=0.35,
            )
            visited_nodes.append((node_mob, val_text))
            self.wait(0.2)
            self.play(FadeOut(val_text), run_time=0.2)

        self.wait(0.5)

        # Reset strokes
        for node_mob, _ in visited_nodes:
            self.play(node_mob.animate.set_stroke(WHITE, width=2), run_time=0.05)

        self.play(FadeOut(visit_label))
        self.wait(0.5)

        # ── Stage 5: Highlight LCA found ───────────────────────────────────
        self.chapter_title("LCA Found!")

        node_lca = tree.get_node_mobject(5)
        lca_ring = Circle(radius=0.45, color=RED, stroke_width=5).move_to(node_lca.get_center())

        lca_label = Text("LCA(5, 4) = 5", font_size=30, color=RED).to_edge(DOWN).shift(UP * 0.5)
        explanation = Text(
            "Node 5 is ancestor of both 5 and 4,\nand it is the deepest such node.",
            font_size=24,
            color=YELLOW,
        ).next_to(lca_label, UP, buff=0.3)

        self.play(Create(lca_ring), FadeIn(lca_label))
        self.play(FadeIn(explanation))
        self.wait(2.5)
        self.play(FadeOut(lca_ring), FadeOut(lca_label), FadeOut(explanation))

        # Re-highlight p and q for second example
        self.chapter_title("Another Example: p=5, q=1")
        node_1 = tree.get_node_mobject(1)
        self.play(
            node_5.animate.set_fill(BLUE, opacity=0.6),
            node_1.animate.set_fill(GREEN, opacity=0.6),
        )
        self.wait(1)

        node_lca2 = tree.get_node_mobject(3)
        lca_ring2 = Circle(radius=0.45, color=RED, stroke_width=5).move_to(node_lca2.get_center())
        lca_label2 = Text("LCA(5, 1) = 3", font_size=30, color=RED).to_edge(DOWN).shift(UP * 0.5)
        self.play(Create(lca_ring2), FadeIn(lca_label2))
        self.wait(2)
        self.play(FadeOut(lca_ring2), FadeOut(lca_label2))
        self.play(
            node_5.animate.set_fill(WHITE, opacity=0.1),
            node_1.animate.set_fill(WHITE, opacity=0.1),
        )
        self.wait(0.5)

        # ── Stage 6: Code snippet ───────────────────────────────────────────
        self.chapter_title("Python Implementation")
        self.play(FadeOut(tree_mob), FadeOut(label_p), FadeOut(label_q))

        code_str = """def lowestCommonAncestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left  = lowestCommonAncestor(root.left,  p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if left and right:
        return root   # p and q on opposite sides
    return left if left else right"""

        code_mob = Code(
            code=code_str,
            tab_width=4,
            language="Python",
            font_size=22,
            background="window",
        ).scale(0.9).move_to(ORIGIN)
        self.play(FadeIn(code_mob))
        self.wait(3)
        self.play(FadeOut(code_mob))

        # ── Stage 7: Complexity card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(N)",
            space_complexity="O(H)",
            notes=[
                "N = number of nodes in the tree",
                "H = height of the tree (call stack depth)",
                "H = O(log N) for balanced, O(N) worst case",
            ],
        )
        self.wait(2)
