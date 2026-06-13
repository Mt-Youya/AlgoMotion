from manim import *
from ...base import AlgoScene, TreeVis


class BinaryTree(AlgoScene):
    TITLE = "Binary Tree"
    SUBTITLE = "Tree where each node has at most two children."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is a Binary Tree?")
        intro_text = VGroup(
            Text("A Binary Tree is a hierarchical data structure", font_size=28),
            Text("where each node has at most TWO children:", font_size=28),
            Text("• Left child", font_size=24, color=BLUE),
            Text("• Right child", font_size=24, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Build the tree node by node ────────────────────────
        self.chapter_title("Building a Binary Tree")

        node_radius = 0.38
        node_positions = {
            1:  UP * 2.5,
            2:  UP * 1.0 + LEFT * 2.2,
            3:  UP * 1.0 + RIGHT * 2.2,
            4:  DOWN * 0.5 + LEFT * 3.3,
            5:  DOWN * 0.5 + LEFT * 1.1,
            6:  DOWN * 0.5 + RIGHT * 1.1,
            7:  DOWN * 0.5 + RIGHT * 3.3,
        }
        node_values = {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7"}
        edges = [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (3, 7)]

        circles = {}
        labels = {}
        for nid, pos in node_positions.items():
            c = Circle(radius=node_radius, color=BLUE, fill_opacity=0.3).move_to(pos)
            t = Text(node_values[nid], font_size=26, color=WHITE).move_to(pos)
            circles[nid] = c
            labels[nid] = t

        # Animate root first
        self.play(GrowFromCenter(circles[1]), Write(labels[1]))
        self.wait(0.5)

        # Animate level 2
        self.play(
            GrowFromCenter(circles[2]), Write(labels[2]),
            GrowFromCenter(circles[3]), Write(labels[3]),
        )
        self.wait(0.5)

        # Draw edges from root to level 2
        edge_lines = {}
        for (p, c) in [(1, 2), (1, 3)]:
            line = Line(
                node_positions[p], node_positions[c],
                color=GRAY, stroke_width=2
            ).set_z_index(-1)
            edge_lines[(p, c)] = line
            self.play(Create(line), run_time=0.4)

        # Animate level 3
        self.play(
            GrowFromCenter(circles[4]), Write(labels[4]),
            GrowFromCenter(circles[5]), Write(labels[5]),
            GrowFromCenter(circles[6]), Write(labels[6]),
            GrowFromCenter(circles[7]), Write(labels[7]),
        )
        self.wait(0.5)

        for (p, c) in [(2, 4), (2, 5), (3, 6), (3, 7)]:
            line = Line(
                node_positions[p], node_positions[c],
                color=GRAY, stroke_width=2
            ).set_z_index(-1)
            edge_lines[(p, c)] = line
            self.play(Create(line), run_time=0.3)

        self.wait(1.5)

        # ── Stage 3: Highlight root, left subtree, right subtree ────────
        self.chapter_title("Tree Structure: Root & Subtrees")

        root_label = Text("Root", font_size=22, color=YELLOW).next_to(circles[1], UP, buff=0.15)
        self.play(
            circles[1].animate.set_color(YELLOW).set_fill(YELLOW, opacity=0.5),
            Write(root_label),
        )
        self.wait(1)

        left_brace = SurroundingRectangle(
            VGroup(circles[2], circles[4], circles[5]), color=BLUE, buff=0.2, corner_radius=0.1
        )
        left_lbl = Text("Left Subtree", font_size=20, color=BLUE).next_to(left_brace, LEFT, buff=0.1)
        self.play(Create(left_brace), Write(left_lbl))
        self.wait(1)

        right_brace = SurroundingRectangle(
            VGroup(circles[3], circles[6], circles[7]), color=GREEN, buff=0.2, corner_radius=0.1
        )
        right_lbl = Text("Right Subtree", font_size=20, color=GREEN).next_to(right_brace, RIGHT, buff=0.1)
        self.play(Create(right_brace), Write(right_lbl))
        self.wait(1.5)

        self.play(FadeOut(root_label), FadeOut(left_brace), FadeOut(left_lbl),
                  FadeOut(right_brace), FadeOut(right_lbl))
        self.play(circles[1].animate.set_color(BLUE).set_fill(BLUE, opacity=0.3))

        # ── Stage 4: In-Order Traversal ──────────────────────────────────
        self.chapter_title("In-Order Traversal (Left → Root → Right)")

        inorder = [4, 2, 5, 1, 6, 3, 7]
        visited_order = Text("Visit order: ", font_size=24).to_edge(DOWN, buff=0.8)
        self.play(Write(visited_order))
        visited_nums = VGroup()

        for i, nid in enumerate(inorder):
            highlight = circles[nid].copy().set_color(ORANGE).set_fill(ORANGE, opacity=0.7)
            self.play(Transform(circles[nid], highlight), run_time=0.5)
            num_text = Text(str(nid), font_size=24, color=ORANGE)
            if i == 0:
                num_text.next_to(visited_order, RIGHT, buff=0.1)
            else:
                num_text.next_to(visited_nums[-1], RIGHT, buff=0.2)
            visited_nums.add(num_text)
            self.play(Write(num_text), run_time=0.3)
            self.wait(0.3)
            self.play(circles[nid].animate.set_color(BLUE).set_fill(BLUE, opacity=0.3), run_time=0.3)

        self.wait(1.5)
        self.play(FadeOut(visited_order), FadeOut(visited_nums))

        # ── Stage 5: BFS / Level-Order Traversal ────────────────────────
        self.chapter_title("Level-Order Traversal (BFS)")

        level_order = [1, 2, 3, 4, 5, 6, 7]
        bfs_label = Text("BFS order: ", font_size=24).to_edge(DOWN, buff=0.8)
        self.play(Write(bfs_label))
        bfs_nums = VGroup()

        for i, nid in enumerate(level_order):
            highlight = circles[nid].copy().set_color(PURPLE).set_fill(PURPLE, opacity=0.7)
            self.play(Transform(circles[nid], highlight), run_time=0.4)
            num_text = Text(str(nid), font_size=24, color=PURPLE)
            if i == 0:
                num_text.next_to(bfs_label, RIGHT, buff=0.1)
            else:
                num_text.next_to(bfs_nums[-1], RIGHT, buff=0.2)
            bfs_nums.add(num_text)
            self.play(Write(num_text), run_time=0.3)
            self.wait(0.2)
            self.play(circles[nid].animate.set_color(BLUE).set_fill(BLUE, opacity=0.3), run_time=0.3)

        self.wait(1.5)
        self.play(FadeOut(bfs_label), FadeOut(bfs_nums))

        # ── Stage 6: Leaf nodes and height ──────────────────────────────
        self.chapter_title("Leaf Nodes & Tree Height")

        leaf_ids = [4, 5, 6, 7]
        leaf_highlights = []
        for nid in leaf_ids:
            h = circles[nid].copy().set_color(RED).set_fill(RED, opacity=0.6)
            leaf_highlights.append(h)
            self.play(Transform(circles[nid], h), run_time=0.3)

        leaf_note = Text("Leaf nodes: no children", font_size=24, color=RED).to_edge(DOWN, buff=1.2)
        self.play(Write(leaf_note))
        self.wait(1)

        # Height annotation
        height_arrow = Arrow(
            node_positions[1] + RIGHT * 0.5,
            node_positions[4] + RIGHT * 0.5,
            color=YELLOW, stroke_width=3
        )
        height_label = Text("Height = 2", font_size=22, color=YELLOW).next_to(height_arrow, RIGHT, buff=0.1)
        self.play(GrowArrow(height_arrow), Write(height_label))
        self.wait(1.5)

        self.play(
            FadeOut(leaf_note), FadeOut(height_arrow), FadeOut(height_label),
            *[circles[nid].animate.set_color(BLUE).set_fill(BLUE, opacity=0.3) for nid in leaf_ids]
        )

        # Fade out tree
        all_tree = VGroup(
            *circles.values(), *labels.values(), *edge_lines.values()
        )
        self.play(FadeOut(all_tree))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(h)",
            notes="n = number of nodes, h = height of tree"
        )
        self.wait(2)
