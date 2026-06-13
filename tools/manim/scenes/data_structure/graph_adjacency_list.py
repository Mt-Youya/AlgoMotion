from manim import *
from ...base import AlgoScene, GraphVis


class GraphAdjacencyList(AlgoScene):
    TITLE = "Graph (Adjacency List)"
    SUBTITLE = "Graph using array of neighbor lists, space-efficient for sparse graphs."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is an Adjacency List?")
        intro_text = VGroup(
            Text("A graph G = (V, E) stores each vertex's", font_size=28),
            Text("neighbors in a dedicated list.", font_size=28),
            Text("Total space: O(V + E)", font_size=28, color=YELLOW),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Build the visual graph ────────────────────────────────
        self.chapter_title("Build the Graph")

        vertices = [0, 1, 2, 3, 4]
        edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4), (2, 4)]
        layout = {
            0: LEFT * 3,
            1: LEFT * 1 + UP * 1.5,
            2: LEFT * 1 + DOWN * 1.5,
            3: RIGHT * 1 + UP * 0.5,
            4: RIGHT * 3,
        }

        graph_vis = GraphVis(
            vertices=vertices,
            edges=edges,
            layout=layout,
            vertex_config={"radius": 0.35, "fill_color": BLUE_D, "fill_opacity": 1},
            edge_config={"stroke_color": WHITE, "stroke_width": 2},
        )
        graph_vis.scale(0.85).shift(UP * 0.3)

        self.play(Create(graph_vis))
        self.wait(1.5)

        # Label vertices
        v_labels = VGroup(*[
            Text(str(v), font_size=22, color=WHITE).move_to(graph_vis.vertices[v])
            for v in vertices
        ])
        self.play(FadeIn(v_labels))
        self.wait(1)

        # ── Stage 3: Highlight adjacency list structure ─────────────────────
        self.chapter_title("Adjacency List Structure")

        adj = {
            0: [1, 2],
            1: [0, 3],
            2: [0, 3, 4],
            3: [1, 2, 4],
            4: [2, 3],
        }

        list_group = VGroup()
        for node, neighbors in adj.items():
            row_label = Text(f"[{node}]:", font_size=22, color=YELLOW)
            neighbor_boxes = VGroup(*[
                VGroup(
                    Square(side_length=0.45, color=BLUE_B, fill_opacity=0.6),
                    Text(str(n), font_size=18, color=WHITE),
                ).arrange(ORIGIN)
                for n in neighbors
            ]).arrange(RIGHT, buff=0.05)
            row = VGroup(row_label, neighbor_boxes).arrange(RIGHT, buff=0.2)
            list_group.add(row)

        list_group.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        list_group.scale(0.9).to_edge(RIGHT, buff=0.5).shift(UP * 0.3)

        self.play(graph_vis.animate.shift(LEFT * 1.5), v_labels.animate.shift(LEFT * 1.5))
        self.play(FadeIn(list_group, shift=LEFT))
        self.wait(2)

        # ── Stage 4: BFS traversal step-by-step ────────────────────────────
        self.chapter_title("BFS Traversal from Node 0")

        bfs_order = [0, 1, 2, 3, 4]
        visited_colors = [GREEN, TEAL, TEAL_B, ORANGE, RED]

        queue_label = Text("Queue:", font_size=22, color=WHITE).to_edge(DOWN, buff=1.2).to_edge(LEFT, buff=0.5)
        self.play(FadeIn(queue_label))

        queue_display = VGroup()
        self.add(queue_display)

        for i, node in enumerate(bfs_order):
            # Highlight node in graph
            node_mob = graph_vis.vertices[node]
            self.play(node_mob.animate.set_fill(visited_colors[i]), run_time=0.6)

            # Highlight row in adjacency list
            row_mob = list_group[node]
            self.play(row_mob.animate.set_color(visited_colors[i]), run_time=0.5)

            # Update queue display
            new_box = VGroup(
                RoundedRectangle(width=0.5, height=0.4, corner_radius=0.05,
                                 fill_color=visited_colors[i], fill_opacity=0.8),
                Text(str(node), font_size=18, color=WHITE),
            ).arrange(ORIGIN)
            queue_display.add(new_box)
            queue_display.arrange(RIGHT, buff=0.1).next_to(queue_label, RIGHT, buff=0.2)
            self.play(FadeIn(new_box, scale=0.7), run_time=0.4)
            self.wait(0.5)

        self.wait(1.5)

        # ── Stage 5: Edge iteration (neighbor access) ───────────────────────
        self.chapter_title("Iterating Neighbors of Node 2")

        # Reset colors
        for node in vertices:
            self.play(graph_vis.vertices[node].animate.set_fill(BLUE_D), run_time=0.15)
        for row in list_group:
            self.play(row.animate.set_color(WHITE), run_time=0.1)

        focus_node = 2
        focus_neighbors = adj[focus_node]

        self.play(graph_vis.vertices[focus_node].animate.set_fill(YELLOW), run_time=0.5)
        self.play(list_group[focus_node].animate.set_color(YELLOW), run_time=0.5)
        self.wait(0.8)

        for nb in focus_neighbors:
            edge_mob = graph_vis.edges.get((focus_node, nb)) or graph_vis.edges.get((nb, focus_node))
            animations = [graph_vis.vertices[nb].animate.set_fill(GREEN)]
            if edge_mob:
                animations.append(edge_mob.animate.set_stroke(GREEN, width=5))
            self.play(*animations, run_time=0.6)
            self.wait(0.5)

        self.wait(1)

        # ── Stage 6: Add an edge dynamically ───────────────────────────────
        self.chapter_title("Add Edge (1, 4) Dynamically")

        # Reset
        for node in vertices:
            self.play(graph_vis.vertices[node].animate.set_fill(BLUE_D), run_time=0.1)
        for e_key, e_mob in graph_vis.edges.items():
            self.play(e_mob.animate.set_stroke(WHITE, width=2), run_time=0.1)

        new_edge_line = Line(
            graph_vis.vertices[1].get_center(),
            graph_vis.vertices[4].get_center(),
            stroke_color=PINK, stroke_width=4,
        )
        self.play(
            graph_vis.vertices[1].animate.set_fill(PINK),
            graph_vis.vertices[4].animate.set_fill(PINK),
        )
        self.play(Create(new_edge_line), run_time=0.8)

        # Update adjacency list display
        add_note = Text("adj[1].append(4)  adj[4].append(1)", font_size=20, color=PINK)
        add_note.to_edge(DOWN, buff=0.5)
        self.play(Write(add_note))
        self.wait(2)
        self.play(FadeOut(add_note), FadeOut(new_edge_line))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.play(
            FadeOut(graph_vis), FadeOut(v_labels),
            FadeOut(list_group), FadeOut(queue_label), FadeOut(queue_display),
        )

        self.complexity_card(
            time_complexities={
                "Add Vertex": "O(1)",
                "Add Edge": "O(1)",
                "Remove Edge": "O(degree)",
                "BFS / DFS": "O(V + E)",
                "Find Neighbor": "O(degree)",
            },
            space_complexity="O(V + E)",
        )
        self.wait(3)
