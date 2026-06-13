from manim import *
from ...base import AlgoScene, GraphVis


class ArticulationPoints(GraphVis):
    TITLE = "Articulation Points"
    SUBTITLE = "Vertices whose removal increases the number of connected components."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("What is an Articulation Point?")
        intro_text = VGroup(
            Text("An articulation point (cut vertex) is a vertex", font_size=28),
            Text("whose removal disconnects the graph.", font_size=28),
            Text("Finding them reveals critical nodes in a network.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Build example graph ─────────────────────────────────
        self.chapter_title("Example Graph Setup")
        vertices = [0, 1, 2, 3, 4, 5]
        edges = [(0, 1), (0, 2), (1, 2), (2, 3), (3, 4), (3, 5)]
        vertex_positions = {
            0: LEFT * 3 + UP * 1,
            1: LEFT * 1.5 + UP * 2,
            2: LEFT * 1.5 + UP * 0,
            3: RIGHT * 0.5 + UP * 1,
            4: RIGHT * 2 + UP * 2,
            5: RIGHT * 2 + UP * 0,
        }
        g = Graph(
            vertices,
            edges,
            layout=vertex_positions,
            labels=True,
            vertex_config={"radius": 0.3, "fill_color": BLUE_D},
            edge_config={"stroke_color": WHITE, "stroke_width": 3},
        )
        self.play(Create(g))
        self.wait(1.5)

        label = Text("Graph with 6 vertices and 6 edges", font_size=24).to_edge(DOWN)
        self.play(Write(label))
        self.wait(1.5)
        self.play(FadeOut(label))

        # ── Stage 3: DFS Tree concept ─────────────────────────────────────
        self.chapter_title("DFS Tree & Discovery Times")
        disc_label = Text("DFS assigns discovery times to each vertex", font_size=26).to_edge(DOWN)
        self.play(Write(disc_label))
        self.wait(1)

        disc_times = {0: "d:0", 1: "d:1", 2: "d:2", 3: "d:3", 4: "d:4", 5: "d:5"}
        disc_mobjects = {}
        for v, txt in disc_times.items():
            pos = vertex_positions[v]
            lbl = Text(txt, font_size=18, color=YELLOW).move_to(
                g.vertices[v].get_center() + UP * 0.55
            )
            disc_mobjects[v] = lbl
            self.play(FadeIn(lbl), run_time=0.4)
        self.wait(1.5)
        self.play(FadeOut(disc_label))

        # ── Stage 4: Low values ───────────────────────────────────────────
        self.chapter_title("Low Values (Back-Edge Reach)")
        low_desc = VGroup(
            Text("low[v] = min discovery time reachable from", font_size=24),
            Text("subtree of v via back edges", font_size=24),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN)
        self.play(Write(low_desc))
        self.wait(1)

        low_values = {0: "l:0", 1: "l:0", 2: "l:0", 3: "l:3", 4: "l:3", 5: "l:3"}
        low_mobjects = {}
        for v, txt in low_values.items():
            pos = vertex_positions[v]
            lbl = Text(txt, font_size=18, color=GREEN).move_to(
                g.vertices[v].get_center() + DOWN * 0.55
            )
            low_mobjects[v] = lbl
            self.play(FadeIn(lbl), run_time=0.4)
        self.wait(1.5)
        self.play(FadeOut(low_desc))

        # ── Stage 5: Identify articulation points ─────────────────────────
        self.chapter_title("Detecting Articulation Points")
        rule_text = VGroup(
            Text("Rule: v is an AP if it has child u where", font_size=24, color=YELLOW),
            Text("low[u] >= disc[v]  (non-root case)", font_size=24, color=YELLOW),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN)
        self.play(Write(rule_text))
        self.wait(1)

        # Highlight vertex 2 and 3 as articulation points
        for ap_vertex in [2, 3]:
            self.play(
                g.vertices[ap_vertex].animate.set_fill(RED, opacity=0.9),
                run_time=0.8,
            )
            ap_lbl = Text("AP!", font_size=22, color=RED_A).move_to(
                g.vertices[ap_vertex].get_center() + RIGHT * 0.7
            )
            self.play(FadeIn(ap_lbl), run_time=0.5)
            self.wait(0.8)

        self.wait(1)
        self.play(FadeOut(rule_text))

        # ── Stage 6: Simulate removal of vertex 2 ────────────────────────
        self.chapter_title("Removing Vertex 2 — Graph Splits")
        remove_note = Text("Removing vertex 2 disconnects {0,1} from {3,4,5}", font_size=24).to_edge(DOWN)
        self.play(Write(remove_note))
        self.wait(0.5)

        # Fade out vertex 2 and its edges
        edges_of_2 = [(0, 2), (1, 2), (2, 3)]
        for e in edges_of_2:
            self.play(g.edges[e].animate.set_stroke(DARK_GRAY, opacity=0.2), run_time=0.3)
        self.play(g.vertices[2].animate.set_fill(DARK_GRAY, opacity=0.2), run_time=0.5)
        self.wait(0.5)

        # Color the two components differently
        for v in [0, 1]:
            self.play(g.vertices[v].animate.set_fill(ORANGE, opacity=0.9), run_time=0.3)
        for v in [3, 4, 5]:
            self.play(g.vertices[v].animate.set_fill(PURPLE, opacity=0.9), run_time=0.3)

        self.wait(1.5)
        self.play(FadeOut(remove_note))

        # Restore graph appearance
        self.play(
            *[g.vertices[v].animate.set_fill(BLUE_D, opacity=1.0) for v in vertices],
            *[g.edges[e].animate.set_stroke(WHITE, opacity=1.0) for e in edges],
            run_time=0.8,
        )
        self.wait(0.5)

        # ── Stage 7: Algorithm pseudocode summary ─────────────────────────
        self.chapter_title("Tarjan's AP Algorithm")
        self.play(FadeOut(g), *[FadeOut(m) for m in disc_mobjects.values()],
                  *[FadeOut(m) for m in low_mobjects.values()])
        self.wait(0.3)

        pseudo = VGroup(
            Text("1. DFS from each unvisited vertex", font_size=24),
            Text("2. Track disc[] and low[] arrays", font_size=24),
            Text("3. For root: AP if has >1 DFS children", font_size=24),
            Text("4. For non-root: AP if low[child] >= disc[v]", font_size=24),
            Text("5. Update low[v] = min(low[v], low[child])", font_size=24),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(ORIGIN)
        self.play(FadeIn(pseudo, shift=RIGHT))
        self.wait(2.5)
        self.play(FadeOut(pseudo))

        # ── Stage 8: Complexity card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(V + E)",
            space_complexity="O(V)",
        )
        self.wait(2)
