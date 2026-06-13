from manim import *
from ...base import AlgoScene, TreeVis


class TreeLevelOrder(AlgoScene):
    TITLE = "Level Order Traversal"
    SUBTITLE = "Traverse a binary tree level by level using BFS."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Introduction")

        intro_text = VGroup(
            Text("Level Order Traversal", font_size=36, color=YELLOW),
            Text("visits nodes level by level", font_size=24, color=WHITE),
            Text("from top to bottom, left to right", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Build the tree ──────────────────────────────────────────
        self.chapter_title("Build the Tree")

        # Node positions
        node_positions = {
            1: UP * 2.5,
            2: UP * 1.0 + LEFT * 2.5,
            3: UP * 1.0 + RIGHT * 2.5,
            4: DOWN * 0.5 + LEFT * 3.5,
            5: DOWN * 0.5 + LEFT * 1.5,
            6: DOWN * 0.5 + RIGHT * 1.5,
            7: DOWN * 0.5 + RIGHT * 3.5,
        }

        node_values = {1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7"}
        edges = [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (3, 7)]

        node_circles = {}
        node_labels = {}

        for nid, pos in node_positions.items():
            circle = Circle(radius=0.35, color=BLUE, fill_opacity=0.3)
            circle.move_to(pos)
            label = Text(node_values[nid], font_size=22, color=WHITE).move_to(pos)
            node_circles[nid] = circle
            node_labels[nid] = label

        edge_lines = {}
        for parent, child in edges:
            line = Line(
                node_positions[parent], node_positions[child],
                color=GRAY, stroke_width=2
            )
            edge_lines[(parent, child)] = line

        # Animate edges first, then nodes
        for line in edge_lines.values():
            self.play(Create(line), run_time=0.25)

        for nid in node_positions:
            self.play(
                Create(node_circles[nid]),
                Write(node_labels[nid]),
                run_time=0.3,
            )

        self.wait(1.5)

        # Level labels on the right
        level_labels = VGroup(
            Text("Level 0", font_size=18, color=YELLOW).next_to(node_positions[1], RIGHT * 6),
            Text("Level 1", font_size=18, color=YELLOW).next_to(node_positions[2], RIGHT * 9),
            Text("Level 2", font_size=18, color=YELLOW).next_to(node_positions[4], RIGHT * 12),
        )
        self.play(FadeIn(level_labels))
        self.wait(1.5)
        self.play(FadeOut(level_labels))

        # ── Stage 3: BFS Queue Visualization ────────────────────────────────
        self.chapter_title("BFS Queue")

        queue_label = Text("Queue:", font_size=22, color=YELLOW).to_edge(DOWN, buff=2.2).to_edge(LEFT, buff=1)
        self.play(Write(queue_label))

        queue_boxes = VGroup()
        queue_texts = VGroup()

        def make_queue_cell(val, color=WHITE):
            box = Square(side_length=0.5, color=color, fill_opacity=0.2)
            txt = Text(str(val), font_size=18, color=color)
            txt.move_to(box.get_center())
            return VGroup(box, txt)

        result_label = Text("Result:", font_size=22, color=GREEN).to_edge(DOWN, buff=1.0).to_edge(LEFT, buff=1)
        result_values = VGroup()
        self.play(Write(result_label))
        self.wait(0.5)

        # BFS traversal order: 1, 2, 3, 4, 5, 6, 7
        bfs_order = [
            (1, [1], []),
            (1, [2, 3], [1]),
            (2, [3, 4, 5], [1, 2]),
            (3, [4, 5, 6, 7], [1, 2, 3]),
            (4, [5, 6, 7], [1, 2, 3, 4]),
            (5, [6, 7], [1, 2, 3, 4, 5]),
            (6, [7], [1, 2, 3, 4, 5, 6]),
            (7, [], [1, 2, 3, 4, 5, 6, 7]),
        ]

        current_queue_display = VGroup()
        current_result_display = VGroup()

        for step_idx, (visiting, queue_state, result_state) in enumerate(bfs_order):
            # Highlight the visiting node
            visiting_circle = node_circles[visiting]
            self.play(
                visiting_circle.animate.set_fill(YELLOW, opacity=0.8),
                visiting_circle.animate.set_stroke(YELLOW, width=3),
                run_time=0.4,
            )

            # Update queue display
            self.play(FadeOut(current_queue_display), run_time=0.2)
            new_queue_cells = VGroup()
            for i, val in enumerate(queue_state):
                cell = make_queue_cell(val, BLUE)
                new_queue_cells.add(cell)
            new_queue_cells.arrange(RIGHT, buff=0.1)
            new_queue_cells.next_to(queue_label, RIGHT, buff=0.3)
            new_queue_cells.align_to(queue_label, DOWN + UP)
            current_queue_display = new_queue_cells

            # Update result display
            self.play(FadeOut(current_result_display), run_time=0.2)
            new_result_cells = VGroup()
            for val in result_state:
                cell = make_queue_cell(val, GREEN)
                new_result_cells.add(cell)
            new_result_cells.arrange(RIGHT, buff=0.1)
            new_result_cells.next_to(result_label, RIGHT, buff=0.3)
            current_result_display = new_result_cells

            self.play(
                FadeIn(current_queue_display),
                FadeIn(current_result_display),
                run_time=0.3,
            )
            self.wait(0.7)

            # Mark node as visited (green)
            self.play(
                visiting_circle.animate.set_fill(GREEN, opacity=0.6),
                visiting_circle.animate.set_stroke(GREEN, width=2),
                run_time=0.3,
            )

        self.wait(1.5)

        # ── Stage 4: Level-by-level grouping ────────────────────────────────
        self.chapter_title("Level Groups")

        level_groups = {
            0: [1],
            1: [2, 3],
            2: [4, 5, 6, 7],
        }
        level_colors = [RED, ORANGE, PURPLE]

        for level, nodes in level_groups.items():
            rect_group = VGroup(*[node_circles[n] for n in nodes])
            surround = SurroundingRectangle(rect_group, color=level_colors[level], buff=0.15)
            lbl = Text(f"Level {level}", font_size=16, color=level_colors[level])
            lbl.next_to(surround, RIGHT, buff=0.2)
            self.play(Create(surround), Write(lbl), run_time=0.5)
            self.wait(0.8)
            self.play(FadeOut(surround), FadeOut(lbl), run_time=0.3)

        self.wait(1)

        # ── Stage 5: Final result ────────────────────────────────────────────
        self.chapter_title("Traversal Result")

        result_title = Text("Level Order Result:", font_size=26, color=YELLOW)
        result_row = VGroup(*[
            make_queue_cell(v, GREEN) for v in [1, 2, 3, 4, 5, 6, 7]
        ])
        result_row.arrange(RIGHT, buff=0.15)
        result_group = VGroup(result_title, result_row).arrange(DOWN, buff=0.4).move_to(DOWN * 2.5)

        self.play(FadeOut(current_queue_display), FadeOut(current_result_display))
        self.play(FadeOut(queue_label), FadeOut(result_label))
        self.play(FadeIn(result_group))
        self.wait(2)
        self.play(FadeOut(result_group))

        # ── Stage 6: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(n)",
            notes="n = number of nodes in the tree",
        )
        self.wait(2)
