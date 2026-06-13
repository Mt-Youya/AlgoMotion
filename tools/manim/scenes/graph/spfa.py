from manim import *
from ...base import AlgoScene, GraphVis


class Spfa(AlgoScene):
    TITLE = "SPFA"
    SUBTITLE = "Optimized Bellman-Ford using a queue for faster average-case performance."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction to SPFA")

        intro_text = VGroup(
            Text("Shortest Path Faster Algorithm", font_size=32, color=YELLOW),
            Text("• Optimizes Bellman-Ford with a queue", font_size=24),
            Text("• Only relaxes edges from recently-updated nodes", font_size=24),
            Text("• Average case: O(kE) where k ≈ 2 in practice", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        intro_text.move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Graph Setup ────────────────────────────────────────
        self.chapter_title("Graph Setup")

        # Node positions
        node_positions = {
            0: LEFT * 4,
            1: LEFT * 1.5 + UP * 2,
            2: LEFT * 1.5 + DOWN * 2,
            3: RIGHT * 1.5 + UP * 2,
            4: RIGHT * 1.5 + DOWN * 2,
            5: RIGHT * 4,
        }

        # Edges: (from, to, weight)
        edges = [
            (0, 1, 4),
            (0, 2, 2),
            (1, 2, 1),
            (1, 3, 5),
            (2, 4, 8),
            (3, 5, 2),
            (4, 3, -3),
            (4, 5, 6),
        ]

        node_circles = {}
        node_labels = {}
        for nid, pos in node_positions.items():
            c = Circle(radius=0.35, color=BLUE, fill_opacity=0.3)
            c.move_to(pos)
            lbl = Text(str(nid), font_size=22, color=WHITE).move_to(pos)
            node_circles[nid] = c
            node_labels[nid] = lbl

        edge_lines = {}
        edge_weight_labels = {}
        for (u, v, w) in edges:
            start = node_positions[u]
            end = node_positions[v]
            line = Arrow(start, end, buff=0.38, color=GRAY, stroke_width=2)
            mid = (start + end) / 2 + UP * 0.2
            wlbl = Text(str(w), font_size=18, color=ORANGE).move_to(mid)
            edge_lines[(u, v)] = line
            edge_weight_labels[(u, v)] = wlbl

        all_nodes = VGroup(*node_circles.values(), *node_labels.values())
        all_edges = VGroup(*edge_lines.values(), *edge_weight_labels.values())

        self.play(LaggedStart(*[Create(e) for e in edge_lines.values()], lag_ratio=0.1))
        self.play(LaggedStart(*[Write(w) for w in edge_weight_labels.values()], lag_ratio=0.1))
        self.play(LaggedStart(*[Create(c) for c in node_circles.values()], lag_ratio=0.1))
        self.play(LaggedStart(*[Write(l) for l in node_labels.values()], lag_ratio=0.1))
        self.wait(1)

        # Distance display table
        dist_labels = {}
        dist_display = VGroup()
        for nid in range(6):
            header = Text(f"d[{nid}]", font_size=18, color=YELLOW)
            val = Text("∞", font_size=18, color=WHITE)
            col = VGroup(header, val).arrange(DOWN, buff=0.1)
            dist_labels[nid] = val
            dist_display.add(col)
        dist_display.arrange(RIGHT, buff=0.5)
        dist_display.to_edge(DOWN, buff=0.4)

        dist_bg = SurroundingRectangle(dist_display, color=DARK_BLUE, fill_opacity=0.4, buff=0.15)
        self.play(FadeIn(dist_bg), FadeIn(dist_display))
        self.wait(1)

        # ── Stage 3: Initialization ─────────────────────────────────────
        self.chapter_title("Initialization: Source = 0")

        source = 0
        dist = {i: float('inf') for i in range(6)}
        dist[source] = 0
        in_queue = {i: False for i in range(6)}
        in_queue[source] = True

        self.play(
            node_circles[source].animate.set_fill(GREEN, opacity=0.7),
            dist_labels[source].animate.become(
                Text("0", font_size=18, color=GREEN).move_to(dist_labels[source].get_center())
            )
        )

        queue_title = Text("Queue:", font_size=22, color=YELLOW).to_edge(UP, buff=0.8).shift(RIGHT * 3)
        queue_box = Rectangle(width=3, height=0.6, color=YELLOW).next_to(queue_title, RIGHT, buff=0.2)
        queue_content = Text("[0]", font_size=20, color=WHITE).move_to(queue_box.get_center())
        self.play(FadeIn(queue_title), Create(queue_box), Write(queue_content))
        self.wait(1.5)

        # ── Stage 4: SPFA Relaxation Steps ─────────────────────────────
        self.chapter_title("SPFA: Queue-Based Relaxation")

        # Simulate SPFA
        from collections import deque
        queue = deque([source])
        dist_vals = {i: float('inf') for i in range(6)}
        dist_vals[source] = 0
        in_q = {i: False for i in range(6)}
        in_q[source] = True

        adj = {i: [] for i in range(6)}
        for (u, v, w) in edges:
            adj[u].append((v, w))

        step_count = 0
        while queue and step_count < 20:
            u = queue.popleft()
            in_q[u] = False
            step_count += 1

            # Highlight current node
            self.play(
                node_circles[u].animate.set_fill(YELLOW, opacity=0.8),
                run_time=0.4
            )

            for (v, w) in adj[u]:
                if dist_vals[u] + w < dist_vals[v]:
                    old_dist = dist_vals[v]
                    dist_vals[v] = dist_vals[u] + w

                    # Highlight relaxed edge
                    if (u, v) in edge_lines:
                        self.play(
                            edge_lines[(u, v)].animate.set_color(GREEN),
                            run_time=0.3
                        )

                    # Update distance label
                    new_val_str = str(dist_vals[v])
                    self.play(
                        dist_labels[v].animate.become(
                            Text(new_val_str, font_size=18, color=LIME_GREEN).move_to(
                                dist_labels[v].get_center()
                            )
                        ),
                        run_time=0.3
                    )

                    if not in_q[v]:
                        in_q[v] = True
                        queue.append(v)
                        self.play(
                            node_circles[v].animate.set_fill(ORANGE, opacity=0.6),
                            run_time=0.3
                        )

            # Mark processed node
            self.play(
                node_circles[u].animate.set_fill(BLUE_E, opacity=0.7),
                run_time=0.3
            )

            queue_str = "[" + ", ".join(str(x) for x in queue) + "]" if queue else "[ ]"
            new_qc = Text(queue_str, font_size=18, color=WHITE).move_to(queue_box.get_center())
            self.play(Transform(queue_content, new_qc), run_time=0.3)
            self.wait(0.5)

        self.wait(1)

        # ── Stage 5: Final Shortest Paths ───────────────────────────────
        self.chapter_title("Final Shortest Path Distances")

        result_title = Text("Shortest distances from node 0:", font_size=26, color=YELLOW)
        result_title.to_edge(UP, buff=1.2)
        self.play(Write(result_title))

        for nid in range(6):
            final_val = str(dist_vals[nid]) if dist_vals[nid] != float('inf') else "∞"
            self.play(
                node_circles[nid].animate.set_fill(GREEN, opacity=0.8),
                dist_labels[nid].animate.become(
                    Text(final_val, font_size=18, color=LIME_GREEN).move_to(
                        dist_labels[nid].get_center()
                    )
                ),
                run_time=0.3
            )
        self.wait(2)

        self.play(
            FadeOut(all_nodes),
            FadeOut(all_edges),
            FadeOut(dist_bg),
            FadeOut(dist_display),
            FadeOut(queue_title),
            FadeOut(queue_box),
            FadeOut(queue_content),
            FadeOut(result_title),
        )

        # ── Stage 6: Negative Cycle Detection ───────────────────────────
        self.chapter_title("Negative Cycle Detection")

        neg_text = VGroup(
            Text("SPFA can detect negative cycles:", font_size=28, color=YELLOW),
            Text("• Track how many times each node is enqueued", font_size=22),
            Text("• If any node is enqueued ≥ V times → negative cycle", font_size=22),
            Text("• Return early with a 'negative cycle detected' flag", font_size=22),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        neg_text.move_to(ORIGIN)

        self.play(FadeIn(neg_text, shift=UP))
        self.wait(2.5)
        self.play(FadeOut(neg_text))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_best="O(E)",
            time_avg="O(kE)",
            time_worst="O(VE)",
            space="O(V + E)",
        )
        self.wait(2)
