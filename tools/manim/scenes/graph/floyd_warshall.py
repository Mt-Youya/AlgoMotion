from manim import *
from ...base import AlgoScene, GraphVis


class FloydWarshall(AlgoScene):
    TITLE = "Floyd-Warshall Algorithm"
    SUBTITLE = "All-pairs shortest paths using dynamic programming."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")

        intro_text = VGroup(
            Text("Given a weighted directed graph,", font_size=28),
            Text("find shortest paths between ALL pairs of vertices.", font_size=28),
            Text("Uses dynamic programming over intermediate vertices.", font_size=24, color=YELLOW),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Build the example graph ────────────────────────────
        self.chapter_title("Example Graph")

        # 4-node graph: 0,1,2,3
        node_positions = {
            0: LEFT * 3 + UP * 1,
            1: RIGHT * 3 + UP * 1,
            2: LEFT * 3 + DOWN * 1,
            3: RIGHT * 3 + DOWN * 1,
        }

        INF = float("inf")
        # adjacency: (u, v, weight)
        edges_data = [
            (0, 1, 3),
            (0, 2, 8),
            (0, 3, INF),
            (1, 3, 1),
            (1, 2, INF),
            (2, 1, 4),
            (3, 0, 2),
            (3, 2, 5),
        ]

        nodes = {}
        node_labels = {}
        for idx, pos in node_positions.items():
            circle = Circle(radius=0.4, color=BLUE, fill_opacity=0.3).move_to(pos)
            label = Text(str(idx), font_size=26, color=WHITE).move_to(pos)
            nodes[idx] = circle
            node_labels[idx] = label

        node_group = VGroup(*nodes.values(), *node_labels.values())
        self.play(LaggedStart(*[FadeIn(n) for n in node_group], lag_ratio=0.15))
        self.wait(0.5)

        edge_mobs = {}
        edge_weight_mobs = {}
        for (u, v, w) in edges_data:
            if w == INF:
                continue
            start = node_positions[u]
            end = node_positions[v]
            arrow = Arrow(start, end, buff=0.42, color=GRAY, stroke_width=2,
                          tip_length=0.18, max_tip_length_to_length_ratio=0.25)
            mid = (start + end) / 2 + perpendicular_bisector_offset(start, end) * 0.25
            wlabel = Text(str(w), font_size=20, color=ORANGE).move_to(mid)
            edge_mobs[(u, v)] = arrow
            edge_weight_mobs[(u, v)] = wlabel

        self.play(LaggedStart(
            *[GrowArrow(a) for a in edge_mobs.values()], lag_ratio=0.1
        ))
        self.play(LaggedStart(
            *[FadeIn(wl) for wl in edge_weight_mobs.values()], lag_ratio=0.1
        ))
        self.wait(1.5)

        # ── Stage 3: Initial Distance Matrix ────────────────────────────
        self.chapter_title("Initial Distance Matrix")

        n = 4
        dist = [
            [0,   3,   8,   INF],
            [INF, 0,   INF, 1  ],
            [INF, 4,   0,   INF],
            [2,   INF, 5,   0  ],
        ]

        def fmt(v):
            return "∞" if v == INF else str(int(v))

        cell_size = 0.55
        matrix_origin = RIGHT * 1.5 + UP * 1.2

        cells = {}
        cell_texts = {}
        header_row = []
        header_col = []

        for col in range(n):
            h = Text(str(col), font_size=20, color=YELLOW)
            h.move_to(matrix_origin + RIGHT * col * cell_size + UP * cell_size)
            header_row.append(h)
        for row in range(n):
            h = Text(str(row), font_size=20, color=YELLOW)
            h.move_to(matrix_origin + LEFT * cell_size + DOWN * row * cell_size)
            header_col.append(h)

        self.play(
            FadeOut(VGroup(*edge_mobs.values(), *edge_weight_mobs.values(), node_group)),
        )

        self.play(LaggedStart(
            *[FadeIn(h) for h in header_row + header_col], lag_ratio=0.05
        ))

        for i in range(n):
            for j in range(n):
                pos = matrix_origin + RIGHT * j * cell_size + DOWN * i * cell_size
                rect = Square(side_length=cell_size, color=BLUE_E, fill_opacity=0.2).move_to(pos)
                txt = Text(fmt(dist[i][j]), font_size=18, color=WHITE).move_to(pos)
                cells[(i, j)] = rect
                cell_texts[(i, j)] = txt

        self.play(LaggedStart(
            *[FadeIn(cells[(i, j)]) for i in range(n) for j in range(n)],
            lag_ratio=0.02
        ))
        self.play(LaggedStart(
            *[FadeIn(cell_texts[(i, j)]) for i in range(n) for j in range(n)],
            lag_ratio=0.02
        ))
        self.wait(1.5)

        # ── Stage 4: DP Recurrence Explanation ──────────────────────────
        self.chapter_title("DP Recurrence")

        formula = MathTex(
            r"dist[i][j] = \min(dist[i][j],\ dist[i][k] + dist[k][j])",
            font_size=30,
        ).to_edge(DOWN, buff=0.6)

        explanation = VGroup(
            Text("For each intermediate vertex k:", font_size=24, color=TEAL),
            Text("Can we improve the path from i to j", font_size=22),
            Text("by going through k?", font_size=22),
        ).arrange(DOWN, buff=0.2).next_to(formula, UP, buff=0.4)

        self.play(Write(formula))
        self.play(FadeIn(explanation, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(explanation))

        # ── Stage 5: Animated DP Update (k=0,1,2) ───────────────────────
        self.chapter_title("Running Floyd-Warshall")

        k_label = Text("k = ?", font_size=26, color=GREEN).to_corner(UL, buff=0.5)
        self.play(FadeIn(k_label))

        for k in range(n):
            new_k_label = Text(f"k = {k}", font_size=26, color=GREEN).to_corner(UL, buff=0.5)
            self.play(Transform(k_label, new_k_label))

            # Highlight the k-th row and column
            highlight_anims = []
            for j in range(n):
                highlight_anims.append(cells[(k, j)].animate.set_fill(GREEN, opacity=0.4))
            for i in range(n):
                highlight_anims.append(cells[(i, k)].animate.set_fill(GREEN, opacity=0.4))
            self.play(*highlight_anims, run_time=0.4)

            updated_cells = []
            for i in range(n):
                for j in range(n):
                    if dist[i][k] != INF and dist[k][j] != INF:
                        new_val = dist[i][k] + dist[k][j]
                        if new_val < dist[i][j]:
                            dist[i][j] = new_val
                            updated_cells.append((i, j, new_val))

            if updated_cells:
                flash_anims = []
                text_anims = []
                for (i, j, val) in updated_cells:
                    flash_anims.append(cells[(i, j)].animate.set_fill(YELLOW, opacity=0.6))
                    new_txt = Text(fmt(val), font_size=18, color=YELLOW).move_to(
                        cell_texts[(i, j)].get_center()
                    )
                    text_anims.append(Transform(cell_texts[(i, j)], new_txt))
                self.play(*flash_anims, *text_anims, run_time=0.6)

            # Reset highlight
            reset_anims = []
            for i2 in range(n):
                for j2 in range(n):
                    reset_anims.append(cells[(i2, j2)].animate.set_fill(BLUE_E, opacity=0.2))
            self.play(*reset_anims, run_time=0.3)
            self.wait(0.5)

        self.play(FadeOut(k_label), FadeOut(formula))
        self.wait(1)

        # ── Stage 6: Final Distance Matrix ──────────────────────────────
        self.chapter_title("Final Shortest Path Matrix")

        done_label = Text(
            "All-pairs shortest paths computed!", font_size=28, color=GREEN
        ).to_edge(DOWN, buff=0.8)

        # Flash all cells green
        self.play(
            *[cells[(i, j)].animate.set_fill(GREEN, opacity=0.35)
              for i in range(n) for j in range(n)],
            FadeIn(done_label),
            run_time=0.8,
        )
        self.wait(2)
        self.play(FadeOut(done_label))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(V³)",
            space_complexity="O(V²)",
        )
        self.wait(2)


# Helper: perpendicular offset for edge weight labels
def perpendicular_bisector_offset(start, end):
    direction = end - start
    perp = np.array([-direction[1], direction[0], 0])
    norm = np.linalg.norm(perp)
    if norm == 0:
        return np.array([0, 1, 0])
    return perp / norm
