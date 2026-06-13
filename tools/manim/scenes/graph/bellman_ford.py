from manim import *
from ...base import AlgoScene, GraphVis


class BellmanFord(AlgoScene):
    TITLE = "Bellman-Ford Algorithm"
    SUBTITLE = "Shortest paths with negative edge weights, detects negative cycles."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro_lines = VGroup(
            Text("Given a weighted directed graph (possibly with negative edges),", font_size=26),
            Text("find the shortest path from a source vertex to all others.", font_size=26),
            Text("Also detect negative-weight cycles, which make shortest paths undefined.", font_size=26),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro_lines))
        self.wait(0.3)

        # ── Stage 2: Build the graph ─────────────────────────────────────────
        self.chapter_title("Graph Construction")

        # Vertices: S, A, B, C, D
        layout = {
            "S": LEFT * 3.5,
            "A": LEFT * 1 + UP * 1.8,
            "B": LEFT * 1 + DOWN * 1.8,
            "C": RIGHT * 1.5 + UP * 1.8,
            "D": RIGHT * 1.5 + DOWN * 1.8,
        }

        vertices = ["S", "A", "B", "C", "D"]
        edges_data = [
            ("S", "A", 6),
            ("S", "B", 7),
            ("A", "C", 5),
            ("A", "B", 8),
            ("A", "D", -4),
            ("B", "D", 9),
            ("B", "C", -3),
            ("C", "S", 2),
            ("D", "C", 7),
        ]

        node_mobs = {}
        node_labels = {}
        for v in vertices:
            pos = layout[v]
            circle = Circle(radius=0.38, fill_color=BLUE_E, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2.5)
            circle.move_to(pos)
            lbl = Text(v, font_size=22, color=WHITE, weight="BOLD").move_to(pos)
            node_mobs[v] = circle
            node_labels[v] = lbl

        edge_mobs = {}
        weight_labels = VGroup()
        for (u, v, w) in edges_data:
            p1, p2 = layout[u], layout[v]
            arrow = Arrow(
                p1, p2, color=GRAY, stroke_width=2.5,
                max_tip_length_to_length_ratio=0.12, buff=0.42
            )
            edge_mobs[(u, v)] = arrow
            mid = (p1 + p2) / 2
            offset = UP * 0.22 + RIGHT * 0.18
            color = RED if w < 0 else YELLOW
            w_lbl = Text(str(w), font_size=18, color=color).move_to(mid + offset)
            weight_labels.add(w_lbl)

        node_group = VGroup(*node_mobs.values())
        label_group = VGroup(*node_labels.values())
        edge_group = VGroup(*edge_mobs.values())

        self.play(Create(edge_group, run_time=1.0))
        self.play(Create(node_group, run_time=0.8), FadeIn(label_group))
        self.play(FadeIn(weight_labels))
        self.wait(1.5)

        # ── Stage 3: Initialization ──────────────────────────────────────────
        self.chapter_title("Initialization: Set dist[S]=0, rest=∞")

        dist = {"S": 0, "A": float("inf"), "B": float("inf"), "C": float("inf"), "D": float("inf")}

        dist_labels = {}
        dist_group = VGroup()
        for v in vertices:
            d_str = "0" if v == "S" else "∞"
            color = GREEN if v == "S" else RED
            lbl = Text(f"dist[{v}] = {d_str}", font_size=20, color=color)
            dist_labels[v] = lbl
            dist_group.add(lbl)

        dist_group.arrange(DOWN, buff=0.18).to_edge(RIGHT, buff=0.5)
        dist_title = Text("Distances", font_size=22, color=WHITE).next_to(dist_group, UP, buff=0.15)

        self.play(FadeIn(dist_title), FadeIn(dist_group))

        source_ring = Circle(radius=0.42, color=GREEN, stroke_width=4).move_to(layout["S"])
        self.play(Create(source_ring))
        self.wait(1.5)

        # ── Stage 4: Relaxation Iterations (V-1 passes) ──────────────────────
        self.chapter_title("Relax All Edges: V-1 = 4 Iterations")

        # Pre-computed final distances for this graph
        final_dist = {"S": 0, "A": 6, "B": 7, "C": 4, "D": 2}

        # Simulate relaxation pass by pass
        relaxation_steps = [
            # (pass_num, edge, new_dist_for_v, label_str)
            (1, ("S", "A"), 6, "6"),
            (1, ("S", "B"), 7, "7"),
            (2, ("B", "C"), 4, "4"),
            (2, ("A", "D"), 2, "2"),
            (3, ("D", "C"), 4, "4"),   # no improvement
            (4, ("C", "S"), 0, "0"),   # no improvement
        ]

        current_pass = 0
        pass_label = None

        for pass_num, (u, v), new_dist, new_str in relaxation_steps:
            if pass_num != current_pass:
                current_pass = pass_num
                if pass_label:
                    self.play(FadeOut(pass_label), run_time=0.3)
                pass_label = Text(
                    f"Pass {pass_num} / 4",
                    font_size=28, color=YELLOW
                ).to_edge(DOWN, buff=0.55)
                self.play(FadeIn(pass_label))

            # Highlight edge being relaxed
            edge_mob = edge_mobs.get((u, v))
            if edge_mob:
                self.play(edge_mob.animate.set_color(ORANGE), run_time=0.4)

            # Check if improvement
            old_dist = dist.get(v, float("inf"))
            if new_dist < old_dist:
                dist[v] = new_dist
                new_lbl = Text(
                    f"dist[{v}] = {new_str}",
                    font_size=20, color=GREEN
                ).move_to(dist_labels[v].get_center())
                self.play(Transform(dist_labels[v], new_lbl), run_time=0.4)
                # Highlight destination node
                self.play(node_mobs[v].animate.set_fill(color=GREEN_E), run_time=0.3)
            else:
                # No improvement — flash gray
                if edge_mob:
                    self.play(edge_mob.animate.set_color(GRAY_E), run_time=0.3)

            if edge_mob:
                self.play(edge_mob.animate.set_color(GRAY), run_time=0.3)
            self.wait(0.5)

        if pass_label:
            self.play(FadeOut(pass_label))
        self.wait(1.0)

        # ── Stage 5: Negative Cycle Detection ───────────────────────────────
        self.chapter_title("Negative Cycle Detection: Extra Pass")

        detect_text = VGroup(
            Text("Run one more (V-th) relaxation pass.", font_size=24),
            Text("If any distance still decreases → negative cycle!", font_size=24, color=RED),
        ).arrange(DOWN, buff=0.25).to_edge(DOWN, buff=0.6)

        self.play(FadeIn(detect_text))
        self.wait(1.5)

        # Demonstrate: no negative cycle in this graph
        no_cycle_lbl = Text("No further relaxation → No negative cycle ✓",
                            font_size=26, color=GREEN).to_edge(DOWN, buff=0.5)
        self.play(FadeOut(detect_text), FadeIn(no_cycle_lbl))
        self.wait(1.5)

        # Show what a negative cycle looks like (conceptual)
        neg_cycle_box = VGroup(
            Text("If edge (u→v): dist[u] + w < dist[v] in pass V,", font_size=20, color=RED),
            Text("a negative cycle is reachable from source.", font_size=20, color=RED),
        ).arrange(DOWN, buff=0.2).next_to(no_cycle_lbl, UP, buff=0.3)
        self.play(FadeIn(neg_cycle_box))
        self.wait(1.5)

        self.play(FadeOut(no_cycle_lbl), FadeOut(neg_cycle_box))

        # ── Stage 6: Final Shortest Paths ───────────────────────────────────
        self.chapter_title("Final Shortest Paths from S")

        # Highlight shortest path tree
        parent = {"A": "S", "B": "S", "C": "B", "D": "A"}
        path_arrows = VGroup()
        for child, par in parent.items():
            p1, p2 = layout[par], layout[child]
            a = Arrow(p1, p2, color=GREEN, stroke_width=5,
                      max_tip_length_to_length_ratio=0.14, buff=0.42)
            path_arrows.add(a)

        self.play(Create(path_arrows, run_time=1.2))

        result_lines = VGroup(
            Text("S→A: 6   S→B: 7   S→C: 4   S→D: 2", font_size=26, color=GREEN),
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(result_lines))
        self.wait(2.0)

        self.play(
            FadeOut(path_arrows),
            FadeOut(result_lines),
            FadeOut(edge_group),
            FadeOut(node_group),
            FadeOut(label_group),
            FadeOut(weight_labels),
            FadeOut(dist_title),
            FadeOut(dist_group),
            FadeOut(source_ring),
        )
        self.wait(0.3)

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(VE)",
            time_avg="O(VE)",
            time_worst="O(VE)",
            space="O(V)",
        )
        self.wait(2)
