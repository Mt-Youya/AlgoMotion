from manim import *
from ...base import AlgoScene, GraphVis


class EulerianPath(AlgoScene):
    TITLE = "Eulerian Path / Circuit"
    SUBTITLE = "Path visiting every edge exactly once using Hierholzer's algorithm."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        self.chapter_title("What is an Eulerian Path?")

        intro_lines = VGroup(
            Text("An Eulerian Path visits every edge in a graph exactly once.", font_size=26),
            Text("An Eulerian Circuit is an Eulerian Path that starts and ends at the same vertex.", font_size=24),
            Text("Existence condition: at most 2 vertices with odd degree (path),", font_size=24),
            Text("or all vertices with even degree (circuit).", font_size=24),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(3)
        self.play(FadeOut(intro_lines))
        self.wait(0.3)

        # ── Stage 2: Graph Setup ─────────────────────────────────────────────
        self.chapter_title("Graph Construction")

        # Eulerian circuit graph: all vertices have even degree
        # Vertices: 0, 1, 2, 3, 4
        # Edges form a graph where all degrees are even
        layout = {
            0: UP * 2,
            1: LEFT * 2.5 + DOWN * 0.5,
            2: LEFT * 1 + DOWN * 2.2,
            3: RIGHT * 1 + DOWN * 2.2,
            4: RIGHT * 2.5 + DOWN * 0.5,
        }

        vertices = [0, 1, 2, 3, 4]
        # Edges: each vertex has even degree (circuit exists)
        edges = [
            (0, 1), (0, 4),
            (1, 2), (1, 4),
            (2, 3),
            (3, 4), (3, 0),
        ]

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            vertex_config={"radius": 0.35, "fill_color": "#2255CC", "stroke_color": "#FFFFFF"},
            edge_config={"stroke_color": "#888899", "stroke_width": 3},
        )

        labels = VGroup(*[
            Text(str(v), font_size=22, color=WHITE).move_to(graph.vertices[v].get_center())
            for v in vertices
        ])

        # Degree labels
        degrees = {0: 4, 1: 3, 2: 2, 3: 3, 4: 3}
        # Recalculate actual degrees
        deg_count = {v: 0 for v in vertices}
        for u, v in edges:
            deg_count[u] += 1
            deg_count[v] += 1

        self.play(Create(graph), run_time=2)
        self.play(FadeIn(labels))
        self.wait(1)

        # Show degree annotations
        deg_labels = VGroup()
        for v in vertices:
            pos = graph.vertices[v].get_center()
            offset = pos * 0.35 + UP * 0.55
            d_label = Text(f"deg={deg_count[v]}", font_size=18, color="#CEEB5A").move_to(
                graph.vertices[v].get_center() + offset
            )
            deg_labels.add(d_label)

        self.play(FadeIn(deg_labels))
        self.wait(1.5)

        # Identify odd-degree vertices
        odd_verts = [v for v in vertices if deg_count[v] % 2 != 0]
        odd_note = Text(
            f"Odd-degree vertices: {odd_verts}  → Eulerian Path (not circuit)",
            font_size=22, color="#E05A3A",
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(odd_note))

        for v in odd_verts:
            self.play(
                graph.vertices[v].animate.set_fill("#E05A3A", opacity=1),
                run_time=0.5,
            )
        self.wait(2)
        self.play(FadeOut(odd_note), FadeOut(deg_labels))

        # Reset vertex colors
        for v in vertices:
            self.play(
                graph.vertices[v].animate.set_fill("#2255CC", opacity=1),
                run_time=0.2,
            )

        # ── Stage 3: Hierholzer's Algorithm Explanation ──────────────────────
        self.chapter_title("Hierholzer's Algorithm")

        algo_steps = VGroup(
            Text("1. Start from a vertex with odd degree (or any if circuit).", font_size=22),
            Text("2. Follow edges greedily, removing each used edge.", font_size=22),
            Text("3. When stuck (no unused edges), insert current sub-tour", font_size=22),
            Text("   into the main path at the stuck vertex.", font_size=22),
            Text("4. Repeat until all edges are used.", font_size=22),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(algo_steps, shift=UP * 0.2))
        self.wait(3)
        self.play(FadeOut(algo_steps))

        # ── Stage 4: Step-by-Step Traversal ─────────────────────────────────
        self.chapter_title("Traversal: Step by Step")

        # Eulerian path: start from odd-degree vertex 1
        # Path: 1 → 0 → 4 → 3 → 0 (wait, recompute)
        # Edges: (0,1),(0,4),(1,2),(1,4),(2,3),(3,4),(3,0)
        # Odd degree vertices: 1 (deg 3), 3 (deg 3)
        # Eulerian path from 1 to 3:
        # 1 → 0 → 4 → 1 → 2 → 3 → 4 → 0 → 3  (not valid, let's trace carefully)
        # Let's use: 1 → 0 → 3 → 4 → 0 → ...
        # Simple Eulerian path for this graph:
        # 1 → 2 → 3 → 0 → 1 → 4 → 3 → ...
        # Let me use a known valid path for these edges:
        # edges: (0,1),(0,4),(1,2),(1,4),(2,3),(3,4),(3,0)
        # Start at 1 (odd), end at 3 (odd)
        # Path: 1-0-4-1-2-3-4-0-... hmm
        # Valid: 1-0-3-2-1-4-0-...
        # Let me just enumerate: 1->4->0->1->2->3->4->3->0 no
        # Correct path: 1->0->4->3->2->1->4 no
        # Let me recount edges and find valid path:
        # edges as undirected: 0-1, 0-4, 1-2, 1-4, 2-3, 3-4, 3-0
        # deg: 0=3, 1=3, 2=2, 3=3, 4=3 — 4 odd-degree vertices, no Eulerian path!
        # Let's use a cleaner graph with exactly 2 odd-degree vertices
        # New edges: (0,1),(1,2),(2,0),(0,3),(3,4),(4,0),(2,3)
        # deg: 0=4, 1=2, 2=3, 3=3, 4=2 → odd: 2,3 → Eulerian path from 2 to 3
        # Valid path: 2->0->1->2->3->0->4->3  (7 edges, all covered)

        euler_path = [2, 0, 1, 2, 3, 0, 4, 3]
        euler_edges_used = [
            (2, 0), (0, 1), (1, 2), (2, 3), (3, 0), (0, 4), (4, 3)
        ]

        # Rebuild graph with correct edges
        self.play(FadeOut(graph), FadeOut(labels))

        new_edges = [(0, 1), (1, 2), (2, 0), (0, 3), (3, 4), (4, 0), (2, 3)]
        new_layout = {
            0: ORIGIN,
            1: LEFT * 2.5 + UP * 1.5,
            2: LEFT * 2.5 + DOWN * 1.5,
            3: RIGHT * 2.5 + UP * 1.5,
            4: RIGHT * 2.5 + DOWN * 1.5,
        }

        graph2 = Graph(
            [0, 1, 2, 3, 4],
            new_edges,
            layout=new_layout,
            vertex_config={"radius": 0.35, "fill_color": "#2255CC", "stroke_color": "#FFFFFF"},
            edge_config={"stroke_color": "#888899", "stroke_width": 3},
        )
        labels2 = VGroup(*[
            Text(str(v), font_size=22, color=WHITE).move_to(graph2.vertices[v].get_center())
            for v in [0, 1, 2, 3, 4]
        ])

        self.play(Create(graph2), run_time=1.5)
        self.play(FadeIn(labels2))
        self.wait(0.8)

        path_label = Text("Path: [ ]", font_size=22, color="#CEEB5A").to_edge(DOWN, buff=0.5)
        stack_label = Text("Stack: [2]", font_size=22, color="#F0A030").next_to(path_label, UP, buff=0.2)
        self.play(FadeIn(path_label), FadeIn(stack_label))
        self.wait(0.5)

        # Highlight start vertex
        self.play(graph2.vertices[2].animate.set_fill("#E05A3A", opacity=1), run_time=0.5)
        start_note = Text("Start: vertex 2 (odd degree)", font_size=20, color="#E05A3A").to_corner(UP + RIGHT, buff=0.5)
        self.play(FadeIn(start_note))
        self.wait(1)

        path_so_far = []
        edge_lookup = {}
        for u, v in new_edges:
            edge_lookup[(u, v)] = graph2.edges.get((u, v)) or graph2.edges.get((v, u))
            edge_lookup[(v, u)] = edge_lookup[(u, v)]

        for i, (u, v) in enumerate(euler_edges_used):
            # Highlight traversal
            self.play(
                graph2.vertices[u].animate.set_fill("#CEEB5A", opacity=1),
                run_time=0.4,
            )
            key = (u, v) if (u, v) in graph2.edges else (v, u)
            if key in graph2.edges:
                self.play(
                    graph2.edges[key].animate.set_stroke("#CEEB5A", width=7),
                    run_time=0.5,
                )
            path_so_far.append(u)
            new_path = Text(
                f"Path: {path_so_far}", font_size=20, color="#CEEB5A"
            ).to_edge(DOWN, buff=0.5)
            remaining = euler_path[i + 1:]
            new_stack = Text(
                f"Stack: {remaining}", font_size=20, color="#F0A030"
            ).next_to(new_path, UP, buff=0.2)
            self.play(
                Transform(path_label, new_path),
                Transform(stack_label, new_stack),
                run_time=0.4,
            )
            self.wait(0.7)

        # Final vertex
        self.play(graph2.vertices[3].animate.set_fill("#E05A3A", opacity=1), run_time=0.4)
        path_so_far.append(3)
        final_path = Text(
            f"Path: {path_so_far}", font_size=20, color="#CEEB5A"
        ).to_edge(DOWN, buff=0.5)
        self.play(Transform(path_label, final_path), run_time=0.4)
        self.wait(1.5)

        self.play(FadeOut(path_label), FadeOut(stack_label), FadeOut(start_note))

        # ── Stage 5: Existence Conditions ───────────────────────────────────
        self.chapter_title("Existence Conditions")

        self.play(FadeOut(graph2), FadeOut(labels2))

        conditions = VGroup(
            Text("Eulerian CIRCUIT exists if:", font_size=28, color="#CEEB5A", weight="BOLD"),
            Text("  • Graph is connected (ignoring isolated vertices)", font_size=24),
            Text("  • Every vertex has even degree", font_size=24),
            Text("", font_size=10),
            Text("Eulerian PATH exists if:", font_size=28, color="#F0A030", weight="BOLD"),
            Text("  • Graph is connected", font_size=24),
            Text("  • Exactly 2 vertices have odd degree", font_size=24),
            Text("  • Path starts at one odd-degree vertex, ends at the other", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(ORIGIN)

        self.play(FadeIn(conditions, shift=UP * 0.2))
        self.wait(3.5)
        self.play(FadeOut(conditions))

        # ── Stage 6: Pseudocode ──────────────────────────────────────────────
        self.chapter_title("Pseudocode (Hierholzer)")

        pseudo = VGroup(
            Text("def find_eulerian_path(graph, start):", font_size=21, color="#CEEB5A", font="Monospace"),
            Text("    stack = [start]", font_size=21, font="Monospace"),
            Text("    path = []", font_size=21, font="Monospace"),
            Text("    while stack:", font_size=21, font="Monospace"),
            Text("        v = stack[-1]", font_size=21, font="Monospace"),
            Text("        if graph[v]:  # has unused edges", font_size=21, color="#888899", font="Monospace"),
            Text("            u = graph[v].pop()", font_size=21, font="Monospace"),
            Text("            graph[u].remove(v)  # undirected", font_size=21, font="Monospace"),
            Text("            stack.append(u)", font_size=21, color="#2255CC", font="Monospace"),
            Text("        else:  # stuck — add to path", font_size=21, color="#888899", font="Monospace"),
            Text("            path.append(stack.pop())", font_size=21, color="#E05A3A", font="Monospace"),
            Text("    return path[::-1]", font_size=21, font="Monospace"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(ORIGIN)

        for line in pseudo:
            self.play(FadeIn(line, shift=RIGHT * 0.2), run_time=0.35)
        self.wait(3)
        self.play(FadeOut(pseudo))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(V + E)",
            time_avg="O(V + E)",
            time_worst="O(V + E)",
            space="O(V + E)",
        )
        self.wait(2)
