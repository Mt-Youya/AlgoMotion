from manim import *
from ...base import AlgoScene, GraphVis


class HamiltonianCycle(AlgoScene):
    TITLE = "Hamiltonian Cycle"
    SUBTITLE = "Path visiting every vertex exactly once and returning to start. NP-complete."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Problem Introduction ────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro_lines = VGroup(
            Text("A Hamiltonian Cycle visits every vertex", font_size=28),
            Text("in a graph exactly once and returns", font_size=28),
            Text("to the starting vertex.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP))
        self.wait(2)

        np_note = Text(
            "This problem is NP-complete — no known polynomial-time algorithm exists.",
            font_size=22,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.6)
        self.play(FadeIn(np_note))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(np_note))

        # ── Stage 2: Build the Graph ─────────────────────────────────────────
        self.chapter_title("Graph Construction")

        # 6-vertex graph: 0=A, 1=B, 2=C, 3=D, 4=E, 5=F
        vertices = [0, 1, 2, 3, 4, 5]
        edges = [
            (0, 1), (0, 2), (0, 5),
            (1, 2), (1, 3),
            (2, 3), (2, 4),
            (3, 4), (3, 5),
            (4, 5),
        ]
        labels = {0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F"}

        # Hexagonal layout
        import math
        radius = 2.2
        layout = {
            v: np.array([
                radius * math.cos(math.pi / 2 + v * 2 * math.pi / 6),
                radius * math.sin(math.pi / 2 + v * 2 * math.pi / 6),
                0,
            ])
            for v in vertices
        }

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            labels={v: Text(labels[v], font_size=22) for v in vertices},
            vertex_config={"radius": 0.35, "fill_color": BLUE_E, "stroke_color": WHITE},
            edge_config={"stroke_color": GRAY_B, "stroke_width": 2},
        )

        self.play(Create(graph))
        self.wait(1.5)

        edge_count = Text(
            f"{len(vertices)} vertices · {len(edges)} edges",
            font_size=24, color=GRAY_A
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(edge_count))
        self.wait(1)
        self.play(FadeOut(edge_count))

        # ── Stage 3: Backtracking Approach Explanation ───────────────────────
        self.chapter_title("Backtracking Strategy")

        strategy_lines = VGroup(
            Text("Strategy: try all permutations of vertices,", font_size=26),
            Text("pruning branches that violate adjacency.", font_size=26),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(strategy_lines))
        self.wait(2)
        self.play(FadeOut(strategy_lines))

        # ── Stage 4: Step-by-step Backtracking Traversal ────────────────────
        self.chapter_title("Backtracking Traversal")

        # The Hamiltonian cycle for this graph: 0→1→2→3→4→5→0
        ham_path = [0, 1, 2, 3, 4, 5, 0]
        ham_edges = list(zip(ham_path[:-1], ham_path[1:]))

        path_label = Text("Path: A", font_size=24, color=GREEN).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(path_label))

        # Highlight starting vertex
        start_ring = Circle(radius=0.42, color=GREEN, stroke_width=5).move_to(layout[0])
        self.play(Create(start_ring))
        self.wait(0.5)

        drawn_edges = []
        vertex_rings = {0: start_ring}
        path_so_far = [0]

        for step_i, (u, v) in enumerate(ham_edges[:-1]):  # skip the closing edge for now
            # Animate moving to next vertex
            edge_line = Line(
                layout[u], layout[v],
                color=GREEN, stroke_width=5
            )
            self.play(Create(edge_line), run_time=0.6)
            drawn_edges.append(edge_line)

            ring = Circle(radius=0.42, color=GREEN, stroke_width=5).move_to(layout[v])
            self.play(Create(ring), run_time=0.4)
            vertex_rings[v] = ring

            path_so_far.append(v)
            path_str = " → ".join(labels[x] for x in path_so_far)
            new_label = Text(f"Path: {path_str}", font_size=24, color=GREEN).to_edge(DOWN, buff=0.5)
            self.play(Transform(path_label, new_label), run_time=0.3)
            self.wait(0.5)

        # Close the cycle: last vertex back to start
        self.chapter_title("Closing the Cycle")

        close_edge = Line(
            layout[ham_path[-2]], layout[ham_path[0]],
            color=YELLOW, stroke_width=6
        )
        self.play(Create(close_edge), run_time=0.8)

        final_path_str = " → ".join(labels[x] for x in ham_path)
        final_label = Text(
            f"Cycle: {final_path_str}",
            font_size=24, color=YELLOW
        ).to_edge(DOWN, buff=0.5)
        self.play(Transform(path_label, final_label))
        self.wait(1.5)

        success_text = Text("Hamiltonian Cycle Found!", font_size=30, color=GREEN).to_edge(UP, buff=0.8)
        self.play(FadeIn(success_text))
        self.wait(2)

        # ── Stage 5: Failed Path (Backtrack Example) ─────────────────────────
        self.chapter_title("Backtracking Example")

        # Fade out the successful cycle
        self.play(
            FadeOut(success_text),
            FadeOut(path_label),
            FadeOut(close_edge),
            *[FadeOut(e) for e in drawn_edges],
            *[FadeOut(r) for r in vertex_rings.values()],
        )
        self.wait(0.5)

        # Show a failed attempt: 0→1→3→... (dead end early)
        fail_path = [0, 1, 3]
        fail_label = Text("Trying: A → B → D ...", font_size=24, color=ORANGE).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(fail_label))

        fail_rings = []
        fail_edges = []
        for idx, node in enumerate(fail_path):
            ring = Circle(radius=0.42, color=ORANGE, stroke_width=4).move_to(layout[node])
            self.play(Create(ring), run_time=0.4)
            fail_rings.append(ring)
            if idx > 0:
                eline = Line(layout[fail_path[idx - 1]], layout[node], color=ORANGE, stroke_width=4)
                self.play(Create(eline), run_time=0.4)
                fail_edges.append(eline)

        dead_end = Text(
            "Dead end — cannot reach all vertices from D via this path.",
            font_size=22, color=RED
        ).to_edge(UP, buff=0.8)
        self.play(FadeIn(dead_end))
        self.wait(1.5)

        backtrack_text = Text("Backtrack!", font_size=28, color=RED).move_to(ORIGIN)
        self.play(FadeIn(backtrack_text))
        self.wait(1)

        self.play(
            FadeOut(backtrack_text),
            FadeOut(dead_end),
            FadeOut(fail_label),
            *[FadeOut(r) for r in fail_rings],
            *[FadeOut(e) for e in fail_edges],
        )
        self.wait(0.5)

        # ── Stage 6: Complexity Card ─────────────────────────────────────────
        self.play(FadeOut(graph))

        self.complexity_card(
            time_best="O(n!)",
            time_avg="O(n! · n)",
            time_worst="O(n! · n)",
            space="O(n)",
        )
        self.wait(2)
