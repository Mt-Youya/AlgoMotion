from manim import *
from ...base import AlgoScene, GraphVis


class TopologicalSort(AlgoScene):
    TITLE = "Topological Sort"
    SUBTITLE = "Linear ordering of DAG vertices respecting all directed edges."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is Topological Sort?")

        intro_text = VGroup(
            Text("A topological ordering of a DAG is a linear", font_size=28),
            Text("sequence where every directed edge u → v", font_size=28),
            Text("has u appearing before v in the sequence.", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Build the DAG ──────────────────────────────────────────
        self.chapter_title("Build the Example DAG")

        # Vertices: 0..5
        vertex_labels = [str(i) for i in range(6)]
        vertices = VGroup()
        positions = {
            0: LEFT * 4 + UP * 1.5,
            1: LEFT * 4 + DOWN * 1.5,
            2: LEFT * 1.5 + UP * 1.5,
            3: LEFT * 1.5 + DOWN * 1.5,
            4: RIGHT * 1.5 + UP * 1.5,
            5: RIGHT * 1.5 + DOWN * 1.5,
        }
        circles = {}
        labels = {}
        for i in range(6):
            c = Circle(radius=0.4, color=BLUE, fill_opacity=0.3)
            c.move_to(positions[i])
            lbl = Text(str(i), font_size=24).move_to(positions[i])
            circles[i] = c
            labels[i] = lbl
            vertices.add(c, lbl)

        self.play(FadeIn(vertices))
        self.wait(1)

        # Directed edges: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1
        edges_def = [(5, 2), (5, 0), (4, 0), (4, 1), (2, 3), (3, 1)]
        arrows = VGroup()
        for u, v in edges_def:
            direction = positions[v] - positions[u]
            norm = direction / np.linalg.norm(direction)
            start = positions[u] + norm * 0.42
            end = positions[v] - norm * 0.42
            arr = Arrow(start, end, buff=0, color=YELLOW, stroke_width=3,
                        tip_length=0.2)
            arrows.add(arr)

        self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.15))
        self.wait(1.5)

        # ── Stage 3: In-degree computation (Kahn's algorithm) ──────────────
        self.chapter_title("Compute In-Degrees")

        indegree = {i: 0 for i in range(6)}
        for u, v in edges_def:
            indegree[v] += 1

        indeg_labels = VGroup()
        indeg_boxes = {}
        for i in range(6):
            box = Rectangle(width=0.55, height=0.4, color=WHITE, fill_opacity=0.1)
            box.next_to(circles[i], DOWN, buff=0.1)
            txt = Text(f"in:{indegree[i]}", font_size=18).move_to(box)
            indeg_boxes[i] = VGroup(box, txt)
            indeg_labels.add(indeg_boxes[i])

        self.play(FadeIn(indeg_labels))
        self.wait(1.5)

        # ── Stage 4: Initialize queue with zero in-degree nodes ────────────
        self.chapter_title("Queue Nodes with In-Degree 0")

        queue_label = Text("Queue:", font_size=26, color=GREEN).to_edge(DOWN, buff=1.5)
        self.play(Write(queue_label))

        zero_nodes = [i for i in range(6) if indegree[i] == 0]  # [4, 5]
        queue_display = VGroup()
        for idx, node in enumerate(zero_nodes):
            box = RoundedRectangle(corner_radius=0.1, width=0.6, height=0.5,
                                   color=GREEN, fill_opacity=0.3)
            box.next_to(queue_label, RIGHT, buff=0.3 + idx * 0.8)
            lbl = Text(str(node), font_size=22).move_to(box)
            queue_display.add(VGroup(box, lbl))
            self.play(circles[node].animate.set_fill(GREEN, opacity=0.6),
                      FadeIn(VGroup(box, lbl)), run_time=0.5)
        self.wait(1.5)

        # ── Stage 5: Process queue step by step ────────────────────────────
        self.chapter_title("Process Queue (Kahn's BFS)")

        result_label = Text("Result:", font_size=26, color=ORANGE).to_edge(DOWN, buff=0.6)
        self.play(Write(result_label))

        result_display = VGroup()
        result_order = []

        # Simulate Kahn's algorithm
        from collections import deque
        adj = {i: [] for i in range(6)}
        for u, v in edges_def:
            adj[u].append(v)
        indeg_sim = indegree.copy()
        q = deque(zero_nodes)
        step = 0

        while q:
            node = q.popleft()
            result_order.append(node)

            # Highlight current node being processed
            self.play(circles[node].animate.set_fill(ORANGE, opacity=0.9), run_time=0.4)

            # Add to result display
            res_box = RoundedRectangle(corner_radius=0.1, width=0.6, height=0.5,
                                       color=ORANGE, fill_opacity=0.4)
            res_box.next_to(result_label, RIGHT, buff=0.3 + step * 0.8)
            res_lbl = Text(str(node), font_size=22).move_to(res_box)
            result_display.add(VGroup(res_box, res_lbl))
            self.play(FadeIn(VGroup(res_box, res_lbl)), run_time=0.4)

            # Reduce in-degree of neighbors
            for neighbor in adj[node]:
                indeg_sim[neighbor] -= 1
                # Update in-degree label
                new_txt = Text(f"in:{indeg_sim[neighbor]}", font_size=18)
                new_txt.move_to(indeg_boxes[neighbor][1])
                self.play(Transform(indeg_boxes[neighbor][1], new_txt), run_time=0.3)
                if indeg_sim[neighbor] == 0:
                    q.append(neighbor)
                    self.play(circles[neighbor].animate.set_fill(GREEN, opacity=0.6),
                              run_time=0.3)

            step += 1
            self.wait(0.5)

        self.wait(1.5)

        # ── Stage 6: Show final result and DFS alternative mention ──────────
        self.chapter_title("Topological Order Found!")

        final_text = Text(
            "Order: " + " → ".join(str(n) for n in result_order),
            font_size=30, color=YELLOW
        ).to_edge(UP, buff=1.2)
        self.play(Write(final_text))
        self.wait(1)

        note = VGroup(
            Text("Alternative: DFS-based approach", font_size=22, color=GRAY),
            Text("Push to stack on post-order visit, then reverse.", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.2).next_to(final_text, DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2)

        self.play(FadeOut(VGroup(
            vertices, arrows, indeg_labels, queue_label, queue_display,
            result_label, result_display, final_text, note
        )))

        # ── Stage 7: Complexity card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(V + E)",
            space_complexity="O(V + E)",
        )
        self.wait(2)
