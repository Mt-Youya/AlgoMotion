from manim import *
from ...base import AlgoScene, TreeVis


class TreeHeight(AlgoScene):
    TITLE = "Tree Height"
    SUBTITLE = "Compute the maximum depth (height) of a binary tree."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Given a binary tree,", font_size=32),
            Text("find its maximum depth (height).", font_size=32),
            Text("Height = longest path from root to a leaf.", font_size=28, color=YELLOW),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Build the example tree ─────────────────────────────
        self.chapter_title("Example Tree")

        # Node positions (manual layout for a balanced tree of height 3)
        node_radius = 0.35
        node_positions = {
            1: UP * 2.5,
            2: UP * 1.0 + LEFT * 2.5,
            3: UP * 1.0 + RIGHT * 2.5,
            4: DOWN * 0.5 + LEFT * 3.5,
            5: DOWN * 0.5 + LEFT * 1.5,
            6: DOWN * 0.5 + RIGHT * 1.5,
            7: DOWN * 0.5 + RIGHT * 3.5,
            8: DOWN * 2.0 + LEFT * 4.0,
        }
        node_values = {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8"}

        edges_def = [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (3, 7), (4, 8)]

        nodes = {}
        for nid, pos in node_positions.items():
            circle = Circle(radius=node_radius, color=BLUE, fill_opacity=0.3).move_to(pos)
            label = Text(node_values[nid], font_size=24).move_to(pos)
            nodes[nid] = VGroup(circle, label)

        edges = VGroup()
        for (u, v) in edges_def:
            line = Line(node_positions[u], node_positions[v], color=GRAY, stroke_width=2)
            edges.add(line)

        tree_group = VGroup(edges, *nodes.values()).scale(0.85).shift(DOWN * 0.2)

        self.play(Create(edges), run_time=1.5)
        for nid in sorted(nodes.keys()):
            self.play(FadeIn(nodes[nid]), run_time=0.2)
        self.wait(1.5)

        # ── Stage 3: Highlight the problem — what is height? ────────────
        self.chapter_title("What is Height?")

        height_label = Text("Height = 4  (root → 1 → 2 → 4 → 8)", font_size=28, color=YELLOW)
        height_label.to_edge(DOWN, buff=0.5)

        path_nodes = [1, 2, 4, 8]
        path_highlights = VGroup()
        for nid in path_nodes:
            highlight = Circle(
                radius=node_radius * 1.15,
                color=YELLOW,
                stroke_width=4,
            ).move_to(tree_group.get_center() + (node_positions[nid] - ORIGIN) * 0.85 + DOWN * 0.2 * 0.85)
            path_highlights.add(highlight)

        self.play(FadeIn(height_label))
        self.play(Create(path_highlights), run_time=1.5)
        self.wait(2)
        self.play(FadeOut(path_highlights), FadeOut(height_label))
        self.wait(0.5)

        # ── Stage 4: Recursive DFS approach ─────────────────────────────
        self.chapter_title("Recursive DFS")

        algo_lines = VGroup(
            Text("def height(node):", font_size=26, color=WHITE),
            Text("    if node is None: return 0", font_size=26, color=GRAY),
            Text("    left  = height(node.left)", font_size=26, color=BLUE_B),
            Text("    right = height(node.right)", font_size=26, color=GREEN_B),
            Text("    return 1 + max(left, right)", font_size=26, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        algo_box = SurroundingRectangle(algo_lines, color=BLUE_D, buff=0.3, corner_radius=0.1)
        algo_group = VGroup(algo_box, algo_lines).to_edge(RIGHT, buff=0.5).shift(UP * 0.5)

        self.play(tree_group.animate.to_edge(LEFT, buff=0.5))
        self.play(Create(algo_box), FadeIn(algo_lines, shift=RIGHT * 0.3))
        self.wait(2)

        # ── Stage 5: Animate DFS calls (post-order traversal) ───────────
        self.chapter_title("DFS Traversal (Post-Order)")

        call_order = [8, 4, 5, 2, 6, 7, 3, 1]
        return_vals = {8: 1, 4: 2, 5: 1, 2: 3, 6: 1, 7: 1, 3: 2, 1: 4}

        visited_labels = {}
        for nid in call_order:
            pos = tree_group.get_center() + (node_positions[nid] - ORIGIN) * 0.85 + DOWN * 0.2 * 0.85
            # Highlight current node
            highlight = Circle(radius=node_radius * 1.2 * 0.85, color=ORANGE, stroke_width=3).move_to(pos)
            self.play(Create(highlight), run_time=0.3)
            self.wait(0.3)

            # Show return value
            ret_label = Text(str(return_vals[nid]), font_size=20, color=ORANGE).next_to(pos, UP * 0.4)
            visited_labels[nid] = ret_label
            self.play(FadeIn(ret_label), run_time=0.3)
            self.play(FadeOut(highlight), run_time=0.2)

        self.wait(1.5)

        # Highlight final answer
        answer_box = SurroundingRectangle(visited_labels[1], color=YELLOW, buff=0.15)
        answer_text = Text("Answer: 4", font_size=30, color=YELLOW).to_edge(DOWN, buff=0.6)
        self.play(Create(answer_box), FadeIn(answer_text))
        self.wait(2)

        self.play(
            FadeOut(VGroup(*visited_labels.values())),
            FadeOut(answer_box),
            FadeOut(answer_text),
            FadeOut(algo_group),
            FadeOut(tree_group),
        )
        self.wait(0.5)

        # ── Stage 6: BFS (Iterative Level-Order) alternative ────────────
        self.chapter_title("BFS Alternative (Level-Order)")

        bfs_lines = VGroup(
            Text("from collections import deque", font_size=22, color=GRAY),
            Text("def height_bfs(root):", font_size=22, color=WHITE),
            Text("    if not root: return 0", font_size=22, color=GRAY),
            Text("    queue, depth = deque([root]), 0", font_size=22, color=BLUE_B),
            Text("    while queue:", font_size=22, color=WHITE),
            Text("        depth += 1", font_size=22, color=YELLOW),
            Text("        for _ in range(len(queue)):", font_size=22, color=WHITE),
            Text("            node = queue.popleft()", font_size=22, color=GREEN_B),
            Text("            if node.left:  queue.append(node.left)", font_size=22, color=GREEN_B),
            Text("            if node.right: queue.append(node.right)", font_size=22, color=GREEN_B),
            Text("    return depth", font_size=22, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18)

        bfs_box = SurroundingRectangle(bfs_lines, color=GREEN_D, buff=0.3, corner_radius=0.1)
        bfs_group = VGroup(bfs_box, bfs_lines).scale(0.9).move_to(ORIGIN)

        self.play(Create(bfs_box), FadeIn(bfs_lines, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(bfs_group))
        self.wait(0.5)

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(h)",
            notes="n = number of nodes, h = tree height (O(n) worst case for skewed tree)",
        )
        self.wait(2)
