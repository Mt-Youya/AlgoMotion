from manim import *
from ...base import AlgoScene, GraphVis


class KosarajuScc(AlgoScene):
    TITLE = "Kosaraju's SCC"
    SUBTITLE = "Strongly connected components using two DFS passes."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro & problem setup ──────────────────────────────────
        self.chapter_title("What is a Strongly Connected Component?")

        intro_text = VGroup(
            Text("A Strongly Connected Component (SCC) is a maximal set", font_size=28),
            Text("of vertices such that every vertex is reachable from", font_size=28),
            Text("every other vertex in the same component.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Graph construction ──────────────────────────────────────
        self.chapter_title("Build the Example Graph")

        # 8-node directed graph with clear SCC clusters
        # SCC-1: {0,1,2}, SCC-2: {3,4}, SCC-3: {5,6,7}
        vertices = [0, 1, 2, 3, 4, 5, 6, 7]
        edges = [
            (0, 1), (1, 2), (2, 0),   # SCC-1 cycle
            (1, 3),                    # bridge 1→3
            (3, 4), (4, 3),            # SCC-2 cycle
            (4, 5),                    # bridge 4→5
            (5, 6), (6, 7), (7, 5),   # SCC-3 cycle
        ]

        layout = {
            0: LEFT * 4 + UP * 1.5,
            1: LEFT * 2.5 + UP * 1.5,
            2: LEFT * 3.25 + DOWN * 0.2,
            3: ORIGIN + UP * 1.5,
            4: RIGHT * 1.5 + UP * 1.5,
            5: RIGHT * 3 + UP * 1.5,
            6: RIGHT * 4 + DOWN * 0.2,
            7: RIGHT * 3 + DOWN * 1.5,
        }

        g = DiGraph(
            vertices,
            edges,
            layout=layout,
            vertex_config={"radius": 0.28, "fill_color": BLUE_D, "stroke_color": WHITE},
            edge_config={"stroke_color": GRAY_B, "stroke_width": 2.5,
                         "tip_config": {"tip_length": 0.18}},
        )

        labels = VGroup(*[
            Text(str(v), font_size=20, color=WHITE).move_to(g.vertices[v])
            for v in vertices
        ])

        self.play(Create(g), run_time=1.8)
        self.play(FadeIn(labels))
        self.wait(1.5)

        # ── Stage 3: First DFS pass – fill order ─────────────────────────────
        self.chapter_title("Pass 1 — DFS on Original Graph (Finish Order)")

        pass1_desc = Text(
            "Run DFS on original graph; push each vertex onto a stack\n"
            "when its DFS finishes (post-order).",
            font_size=24, line_spacing=1.3,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(pass1_desc))

        finish_order = [2, 0, 1, 3, 4, 7, 5, 6]  # example finish order
        stack_label = Text("Stack (finish order):", font_size=22, color=YELLOW).to_edge(LEFT, buff=0.4).shift(DOWN * 2.5)
        self.play(FadeIn(stack_label))

        stack_boxes = VGroup()
        for i, v in enumerate(finish_order):
            box = Square(side_length=0.45, color=YELLOW, fill_opacity=0.25)
            num = Text(str(v), font_size=18, color=YELLOW)
            num.move_to(box)
            cell = VGroup(box, num)
            cell.next_to(stack_label, RIGHT, buff=0.15 + i * 0.5)
            self.play(
                g.vertices[v].animate.set_fill(YELLOW_D, opacity=0.9),
                FadeIn(cell, shift=UP * 0.2),
                run_time=0.35,
            )
            stack_boxes.add(cell)

        self.wait(1.5)
        self.play(FadeOut(pass1_desc), FadeOut(stack_label), FadeOut(stack_boxes))

        # Reset vertex colours
        self.play(*[g.vertices[v].animate.set_fill(BLUE_D, opacity=1) for v in vertices])

        # ── Stage 4: Transpose graph ─────────────────────────────────────────
        self.chapter_title("Build Transposed Graph Gᵀ")

        transpose_note = Text(
            "Reverse every edge direction to obtain Gᵀ.",
            font_size=26, color=TEAL,
        ).to_edge(DOWN, buff=0.6)
        self.play(FadeIn(transpose_note))
        self.wait(0.8)

        # Highlight each edge flipping
        reversed_edges = [(b, a) for a, b in edges]
        for a, b in edges[:5]:
            if (a, b) in g.edges:
                self.play(
                    g.edges[(a, b)].animate.set_stroke(ORANGE, width=3),
                    run_time=0.25,
                )

        self.wait(1)
        self.play(FadeOut(transpose_note))
        self.play(*[g.edges[e].animate.set_stroke(GRAY_B, width=2.5) for e in g.edges])

        # ── Stage 5: Second DFS pass – discover SCCs ─────────────────────────
        self.chapter_title("Pass 2 — DFS on Gᵀ in Reverse Finish Order")

        pass2_desc = Text(
            "Pop vertices from the stack; run DFS on Gᵀ.\n"
            "Each DFS tree is one SCC.",
            font_size=24, line_spacing=1.3,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(pass2_desc))
        self.wait(0.8)

        scc_colors = [GREEN, PURPLE, RED_C]
        scc_groups = [[5, 6, 7], [3, 4], [0, 1, 2]]  # reverse finish order → SCCs
        scc_labels_text = ["SCC 1", "SCC 2", "SCC 3"]

        scc_label_mobs = VGroup()
        for idx, (group, color, lbl) in enumerate(zip(scc_groups, scc_colors, scc_labels_text)):
            for v in group:
                self.play(
                    g.vertices[v].animate.set_fill(color, opacity=0.9),
                    run_time=0.3,
                )
            center = sum([layout[v] for v in group]) / len(group)
            tag = Text(lbl, font_size=20, color=color).move_to(center + DOWN * 0.85)
            self.play(FadeIn(tag, scale=0.8), run_time=0.4)
            scc_label_mobs.add(tag)
            self.wait(0.4)

        self.wait(1.5)
        self.play(FadeOut(pass2_desc))

        # ── Stage 6: SCC result summary ──────────────────────────────────────
        self.chapter_title("Result — Three SCCs Found")

        result_rows = VGroup(
            Text("SCC 1 : { 5, 6, 7 }  (cycle 5→6→7→5)", font_size=24, color=GREEN),
            Text("SCC 2 : { 3, 4 }     (cycle 3→4→3)", font_size=24, color=PURPLE),
            Text("SCC 3 : { 0, 1, 2 }  (cycle 0→1→2→0)", font_size=24, color=RED_C),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).to_edge(DOWN, buff=1.0)

        self.play(FadeIn(result_rows, shift=UP * 0.2))
        self.wait(2)

        # Pulse each group
        for group, color in zip(scc_groups, scc_colors):
            self.play(
                *[Flash(g.vertices[v], color=color, line_length=0.2, flash_radius=0.4)
                  for v in group],
                run_time=0.6,
            )

        self.wait(1.5)
        self.play(FadeOut(result_rows), FadeOut(scc_label_mobs))

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        self.play(FadeOut(g), FadeOut(labels))
        self.complexity_card(
            time_complexity="O(V + E)",
            space_complexity="O(V + E)",
            notes=[
                "Two DFS passes, each O(V + E)",
                "Extra space for transpose graph and stack",
                "Optimal — linear in graph size",
            ],
        )
        self.wait(2)
