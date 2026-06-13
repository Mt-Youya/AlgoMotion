from manim import *
from ...base import AlgoScene, GraphVis


class Prim(AlgoScene):
    TITLE = "Prim's Algorithm"
    SUBTITLE = "Minimum spanning tree by greedily extending the current tree."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro_text = VGroup(
            Text("Given a connected, weighted, undirected graph,", font_size=28),
            Text("find a spanning tree with minimum total edge weight.", font_size=28),
            Text("Prim's algorithm builds the MST greedily,", font_size=28),
            Text("always adding the cheapest edge that expands the tree.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2.5)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Graph Construction ──────────────────────────────────────
        self.chapter_title("Graph Construction")

        # Vertices: 0=A, 1=B, 2=C, 3=D, 4=E, 5=F
        vertices = [0, 1, 2, 3, 4, 5]
        edges = [(0, 1), (0, 2), (1, 2), (1, 3), (2, 4), (3, 4), (3, 5), (4, 5)]
        weights = {
            (0, 1): 6, (0, 2): 3,
            (1, 2): 2, (1, 3): 5,
            (2, 4): 4, (3, 4): 7,
            (3, 5): 1, (4, 5): 8,
        }
        labels = {0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F"}

        layout = {
            0: LEFT * 3 + UP * 1,
            1: LEFT * 1 + UP * 1.8,
            2: LEFT * 1 + DOWN * 0.5,
            3: RIGHT * 1 + UP * 1.8,
            4: RIGHT * 1 + DOWN * 0.5,
            5: RIGHT * 3 + UP * 0.6,
        }

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            labels={v: Text(labels[v], font_size=20) for v in vertices},
            vertex_config={"radius": 0.35, "fill_color": "#2255CC", "stroke_color": "#FFFFFF"},
            edge_config={"stroke_color": "#888899", "stroke_width": 2},
        )

        self.play(Create(graph))

        # Add weight labels
        weight_labels = VGroup()
        for (u, v), w in weights.items():
            mid = (layout[u] + layout[v]) / 2
            offset = UP * 0.28
            lbl = Text(str(w), font_size=20, color=YELLOW).move_to(mid + offset)
            weight_labels.add(lbl)

        self.play(FadeIn(weight_labels))
        self.wait(1.5)

        # ── Stage 3: Initialization — pick starting vertex ───────────────────
        self.chapter_title("Initialization")

        init_text = Text(
            "Start from vertex A. Add all its edges to the cut.",
            font_size=26, color="#1A1C2C"
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(init_text))

        # Highlight starting vertex A
        start_ring = Circle(radius=0.42, color="#CEEB5A", stroke_width=5).move_to(layout[0])
        self.play(Create(start_ring))
        self.wait(1.2)

        # Show MST set label
        mst_label = Text("MST: {A}", font_size=24, color="#CEEB5A").to_edge(RIGHT, buff=0.4).shift(UP * 2)
        self.play(FadeIn(mst_label))
        self.wait(0.8)
        self.play(FadeOut(init_text))

        # ── Stage 4: Prim Step-by-Step ───────────────────────────────────────
        self.chapter_title("Prim's Greedy Steps")

        # MST edges chosen by Prim starting from A:
        # Step 1: A-C (weight 3) — cheapest edge from {A}
        # Step 2: C-B (weight 2) — cheapest edge from {A,C}
        # Step 3: B-D (weight 5) — cheapest edge from {A,C,B}
        # Step 4: C-E (weight 4) — actually cheaper: C-E=4 < B-D=5, so C-E first
        # Corrected Prim order: A→C(3), C→B(2), C→E(4), B→D(5), D→F(1)
        mst_steps = [
            (0, 2, 3, "A→C  weight 3",  "MST: {A, C}"),
            (2, 1, 2, "C→B  weight 2",  "MST: {A, C, B}"),
            (2, 4, 4, "C→E  weight 4",  "MST: {A, C, B, E}"),
            (1, 3, 5, "B→D  weight 5",  "MST: {A, C, B, E, D}"),
            (3, 5, 1, "D→F  weight 1",  "MST: {A, C, B, E, D, F}"),
        ]

        in_tree = {0}
        mst_lines = VGroup()

        for u, v, w, step_desc, mst_str in mst_steps:
            # Highlight the candidate edge
            candidate_line = Line(
                layout[u], layout[v],
                color=ORANGE, stroke_width=5
            )
            self.play(Create(candidate_line), run_time=0.5)

            step_label = Text(
                f"Add edge {step_desc}",
                font_size=24, color=ORANGE
            ).to_edge(DOWN, buff=0.5)
            self.play(FadeIn(step_label))
            self.wait(0.7)

            # Convert to permanent MST edge (green)
            mst_line = Line(
                layout[u], layout[v],
                color="#CEEB5A", stroke_width=5
            )
            mst_lines.add(mst_line)
            self.play(
                Transform(candidate_line, mst_line),
                run_time=0.4
            )

            # Highlight the newly added vertex
            in_tree.add(v)
            new_vertex_ring = Circle(radius=0.42, color="#CEEB5A", stroke_width=5).move_to(layout[v])
            self.play(Create(new_vertex_ring), run_time=0.3)

            # Update MST label
            new_mst_label = Text(mst_str, font_size=22, color="#CEEB5A").to_edge(RIGHT, buff=0.4).shift(UP * 2)
            self.play(
                Transform(mst_label, new_mst_label),
                FadeOut(step_label),
                run_time=0.4
            )
            self.wait(0.6)

        self.wait(1)

        # ── Stage 5: Highlight the complete MST ──────────────────────────────
        self.chapter_title("Minimum Spanning Tree Found")

        result_text = VGroup(
            Text("MST total weight: 3 + 2 + 4 + 5 + 1 = 15", font_size=26, color="#CEEB5A"),
            Text("All 6 vertices connected with 5 edges", font_size=22, color="#888899"),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN, buff=0.5)

        self.play(FadeIn(result_text))
        self.wait(2)

        # Flash the MST edges to emphasize
        self.play(
            mst_lines.animate.set_stroke(color=WHITE, width=7),
            run_time=0.5
        )
        self.play(
            mst_lines.animate.set_stroke(color="#CEEB5A", width=5),
            run_time=0.5
        )
        self.wait(1.5)

        # ── Stage 6: Key Invariant Explanation ───────────────────────────────
        self.chapter_title("Cut Property")

        self.play(
            FadeOut(result_text),
            FadeOut(graph),
            FadeOut(weight_labels),
            FadeOut(mst_label),
            FadeOut(mst_lines),
            run_time=0.8
        )

        invariant_text = VGroup(
            Text("Cut Property (correctness proof):", font_size=30, color="#1A1C2C", weight="BOLD"),
            Text("", font_size=10),
            Text("At every step, partition vertices into:", font_size=24),
            Text("  • In-tree set S  (already in MST)", font_size=24, color="#CEEB5A"),
            Text("  • Out-tree set V\\S  (not yet added)", font_size=24, color="#E05A3A"),
            Text("", font_size=10),
            Text("The minimum weight edge crossing the cut (S, V\\S)", font_size=24),
            Text("is always safe to add to the MST.", font_size=24),
            Text("This is guaranteed by the Cut Property of MSTs.", font_size=22, color="#888899"),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(ORIGIN)

        self.play(FadeIn(invariant_text, shift=UP * 0.3))
        self.wait(3)
        self.play(FadeOut(invariant_text))

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        self.complexity_card(
            time_best="O(E \\log V)",
            time_avg="O(E \\log V)",
            time_worst="O(E \\log V)",
            space="O(V + E)",
        )
        self.wait(2)
