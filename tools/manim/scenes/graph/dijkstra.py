from manim import *
from ...base import AlgoScene, GraphVis


class Dijkstra(AlgoScene):
    TITLE = "Dijkstra's Algorithm"
    SUBTITLE = "Shortest paths from source to all vertices in non-negative weight graph."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro_text = VGroup(
            Text("Given a weighted graph with non-negative edges,", font_size=28),
            Text("find the shortest path from a source vertex", font_size=28),
            Text("to every other vertex.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Build the graph ─────────────────────────────────────────
        self.chapter_title("Graph Construction")

        # Vertices: 0=A, 1=B, 2=C, 3=D, 4=E
        vertices = [0, 1, 2, 3, 4]
        edges = [(0, 1), (0, 2), (1, 2), (1, 3), (2, 4), (3, 4)]
        weights = {(0, 1): 4, (0, 2): 1, (1, 2): 2, (1, 3): 5, (2, 4): 8, (3, 4): 2}
        labels = {0: "A", 1: "B", 2: "C", 3: "D", 4: "E"}

        layout = {
            0: LEFT * 3,
            1: LEFT * 1 + UP * 1.5,
            2: LEFT * 1 + DOWN * 1.5,
            3: RIGHT * 1 + UP * 1.5,
            4: RIGHT * 3,
        }

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            labels={v: Text(labels[v], font_size=20) for v in vertices},
            vertex_config={"radius": 0.35, "fill_color": BLUE_E, "stroke_color": WHITE},
            edge_config={"stroke_color": GRAY, "stroke_width": 2},
        )

        self.play(Create(graph))

        # Add weight labels
        weight_labels = VGroup()
        for (u, v), w in weights.items():
            mid = (layout[u] + layout[v]) / 2
            offset = UP * 0.25
            lbl = Text(str(w), font_size=20, color=YELLOW).move_to(mid + offset)
            weight_labels.add(lbl)

        self.play(FadeIn(weight_labels))
        self.wait(1.5)

        # ── Stage 3: Initialize distances ───────────────────────────────────
        self.chapter_title("Initialization")

        dist = {v: float("inf") for v in vertices}
        dist[0] = 0
        visited = set()

        dist_labels = {}
        dist_group = VGroup()
        for v in vertices:
            d_str = "0" if v == 0 else "∞"
            color = GREEN if v == 0 else RED
            lbl = Text(f"{labels[v]}: {d_str}", font_size=22, color=color)
            dist_labels[v] = lbl
            dist_group.add(lbl)

        dist_group.arrange(DOWN, buff=0.2).to_edge(RIGHT, buff=0.5)
        dist_title = Text("Distances", font_size=24, color=WHITE).next_to(dist_group, UP)

        self.play(FadeIn(dist_title), FadeIn(dist_group))

        # Highlight source node
        source_highlight = Circle(radius=0.4, color=GREEN, stroke_width=4).move_to(layout[0])
        self.play(Create(source_highlight))
        self.wait(1.5)

        # ── Stage 4: Step-by-step Dijkstra ──────────────────────────────────
        self.chapter_title("Dijkstra Steps")

        # Priority queue simulation: process nodes in order
        process_order = [0, 2, 1, 3, 4]  # correct Dijkstra order for this graph
        final_dists = {0: 0, 1: 3, 2: 1, 3: 8, 4: 9}

        visited_circles = {}

        for step_idx, u in enumerate(process_order):
            # Highlight current node being processed
            highlight = Circle(radius=0.4, color=YELLOW, stroke_width=5).move_to(layout[u])
            self.play(Create(highlight))

            step_label = Text(
                f"Processing {labels[u]} (dist={final_dists[u]})",
                font_size=24, color=YELLOW
            ).to_edge(DOWN, buff=0.5)
            self.play(FadeIn(step_label))
            self.wait(0.8)

            # Relax neighbors
            for (a, b), w in weights.items():
                neighbor = None
                if a == u:
                    neighbor = b
                elif b == u:
                    neighbor = a

                if neighbor is not None and neighbor not in visited:
                    new_dist = final_dists[u] + w
                    if new_dist < dist[neighbor]:
                        old_dist = dist[neighbor]
                        dist[neighbor] = new_dist

                        # Animate edge relaxation
                        edge_line = Line(
                            layout[u], layout[neighbor],
                            color=ORANGE, stroke_width=4
                        )
                        self.play(Create(edge_line), run_time=0.4)

                        # Update distance label
                        new_lbl = Text(
                            f"{labels[neighbor]}: {new_dist}",
                            font_size=22, color=GREEN
                        ).move_to(dist_labels[neighbor].get_center())
                        self.play(
                            Transform(dist_labels[neighbor], new_lbl),
                            run_time=0.4
                        )
                        self.play(FadeOut(edge_line), run_time=0.3)

            # Mark as visited
            visited.add(u)
            visited_circle = Circle(radius=0.4, color=GREEN, fill_opacity=0.3, stroke_width=3).move_to(layout[u])
            visited_circles[u] = visited_circle
            self.play(
                Transform(highlight, visited_circle),
                FadeOut(step_label),
                run_time=0.5
            )
            self.wait(0.5)

        self.wait(1)

        # ── Stage 5: Highlight shortest paths ───────────────────────────────
        self.chapter_title("Shortest Paths Found")

        # Draw shortest path tree edges
        parent = {0: None, 2: 0, 1: 2, 3: 1, 4: 3}
        path_lines = VGroup()
        for child, par in parent.items():
            if par is not None:
                line = Line(
                    layout[par], layout[child],
                    color=GREEN, stroke_width=5
                )
                path_lines.add(line)

        self.play(Create(path_lines), run_time=1.5)

        result_text = Text(
            "Shortest path tree rooted at A",
            font_size=26, color=GREEN
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(result_text))
        self.wait(2)

        self.play(
            FadeOut(path_lines),
            FadeOut(result_text),
            FadeOut(graph),
            FadeOut(weight_labels),
            FadeOut(dist_title),
            FadeOut(dist_group),
            FadeOut(source_highlight),
            *[FadeOut(c) for c in visited_circles.values()],
        )

        # ── Stage 6: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O((V + E) log V)",
            time_avg="O((V + E) log V)",
            time_worst="O((V + E) log V)",
            space="O(V)",
        )
        self.wait(2)
