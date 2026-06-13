from manim import (
    DOWN, LEFT, RIGHT, UP, ORIGIN,
    Create, FadeIn, FadeOut, Write, Indicate,
    MathTex, Rectangle, Square, Text, VGroup,
    AnimationGroup, Arrow, Line,
    YELLOW, GREEN, BLUE_D, BLUE_B, WHITE, ORANGE, RED, PINK, TEAL,
)
from ...base import AlgoScene, GraphVis
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, C_DEFAULT, C_ACTIVE, C_SORTED,
)


class GraphAdjacencyMatrix(AlgoScene):
    TITLE = "Graph (Adjacency Matrix)"
    SUBTITLE = "Graph using 2D matrix with O(1) edge lookup, suitable for dense graphs."
    CATEGORY = "data-structure"

    # ── helpers ───────────────────────────────────────────────────────────────

    def _make_matrix(self, n: int, adj: dict[int, list[int]], *, scale: float = 0.55):
        """Build a VGroup representing an n×n adjacency matrix with row/col labels."""
        cell_size = 0.65

        cells: dict[tuple[int, int], VGroup] = {}
        grid = VGroup()

        # Column headers
        col_labels = VGroup()
        for j in range(n):
            lbl = Text(str(j), font_size=22, color=COBALT, weight="BOLD")
            lbl.move_to([j * cell_size, 0.5, 0])
            col_labels.add(lbl)

        # Row headers + cells
        rows_group = VGroup()
        for i in range(n):
            row_lbl = Text(str(i), font_size=22, color=COBALT, weight="BOLD")
            row_lbl.move_to([-0.6, -i * cell_size, 0])
            rows_group.add(row_lbl)
            for j in range(n):
                val = 1 if j in adj.get(i, []) else 0
                bg = Square(
                    side_length=cell_size - 0.06,
                    color=MIST,
                    fill_color=MIST,
                    fill_opacity=1,
                    stroke_color=COBALT,
                    stroke_width=1.5,
                )
                bg.move_to([j * cell_size, -i * cell_size, 0])
                num = Text(str(val), font_size=22, color=INK, weight="BOLD")
                num.move_to(bg.get_center())
                cell = VGroup(bg, num)
                cells[(i, j)] = cell
                grid.add(cell)

        everything = VGroup(col_labels, rows_group, grid)
        everything.scale(scale)
        return everything, cells

    def _highlight_cell(self, cells, i, j, color=CORAL, run_time=0.4):
        cell = cells.get((i, j))
        if cell:
            bg = cell[0]
            self.play(bg.animate.set_fill(color=color), run_time=run_time)

    def _reset_cell(self, cells, i, j, run_time=0.25):
        cell = cells.get((i, j))
        if cell:
            bg = cell[0]
            self.play(bg.animate.set_fill(color=MIST), run_time=run_time)

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self):
        # ── Stage 1: Intro — what is an adjacency matrix? ──────────────────
        ch1 = self.chapter_title("What is an Adjacency Matrix?")

        intro = VGroup(
            Text("A graph G = (V, E) can be represented", font_size=28, color=INK),
            Text("as a V × V boolean (or weighted) matrix M,", font_size=28, color=INK),
            Text("where M[i][j] = 1 if edge (i → j) exists,", font_size=28, color=INK),
            Text("and 0 otherwise.", font_size=28, color=INK),
            Text("Edge lookup is O(1) — just index M[i][j].", font_size=28, color=COBALT, weight="BOLD"),
        ).arrange(DOWN, buff=0.28).move_to(ORIGIN)

        self.play(FadeIn(intro, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: Build the visual graph ────────────────────────────────
        ch2 = self.chapter_title("Build a Sample Graph")

        nodes = [0, 1, 2, 3, 4]
        edges = [(0, 1), (0, 2), (1, 3), (2, 3), (3, 4), (1, 4)]
        adj = {0: [1, 2], 1: [0, 3, 4], 2: [0, 3], 3: [1, 2, 4], 4: [1, 3]}

        layout = {
            0: LEFT * 3.2,
            1: LEFT * 1.1 + UP * 1.6,
            2: LEFT * 1.1 + DOWN * 1.6,
            3: RIGHT * 1.1 + UP * 0.6,
            4: RIGHT * 3.2,
        }

        gv = GraphVis(self, nodes, edges, directed=False, layout=layout)
        self.wait(1.5)

        caption1 = self.caption("5 nodes, 6 undirected edges")
        self.wait(1.5)
        self.play(FadeOut(caption1))

        # ── Stage 3: Build the adjacency matrix ────────────────────────────
        ch3 = self.chapter_title("Construct the Matrix")

        matrix_group, cells = self._make_matrix(5, adj)
        matrix_group.shift(RIGHT * 3.0 + UP * 0.3)

        # Shift graph to the left to make room
        graph_group = VGroup(
            *list(gv._node_mobs.values()),
            *list(gv._node_labels.values()),
            *list(set(gv._edge_mobs.values())),
        )
        self.play(graph_group.animate.shift(LEFT * 1.2))

        matrix_title = Text("Adjacency Matrix", font_size=22, color=COBALT, weight="BOLD")
        matrix_title.next_to(matrix_group, UP, buff=0.2)
        self.play(FadeIn(matrix_title), FadeIn(matrix_group, shift=LEFT * 0.3))
        self.wait(2)

        # ── Stage 4: Edge lookup — O(1) ────────────────────────────────────
        ch4 = self.chapter_title("Edge Lookup: O(1)")

        lookup_pairs = [(0, 1, True), (2, 4, False), (3, 4, True)]
        for i, j, exists in lookup_pairs:
            color = SIGNAL if exists else CORAL
            result_text = "1 (edge exists)" if exists else "0 (no edge)"

            # Highlight nodes in graph
            self.play(
                gv._node_mobs[i].animate.set_fill(color=C_ACTIVE),
                gv._node_mobs[j].animate.set_fill(color=C_ACTIVE),
                run_time=0.4,
            )
            # Highlight matrix cell
            self._highlight_cell(cells, i, j, color=color)
            self._highlight_cell(cells, j, i, color=color)

            lookup_label = Text(
                f"M[{i}][{j}] = {result_text}",
                font_size=24, color=color, weight="BOLD",
            ).to_edge(DOWN, buff=0.5)
            self.play(Write(lookup_label))
            self.wait(1.2)

            # Reset
            self.play(
                gv._node_mobs[i].animate.set_fill(color=C_DEFAULT),
                gv._node_mobs[j].animate.set_fill(color=C_DEFAULT),
                FadeOut(lookup_label),
                run_time=0.35,
            )
            self._reset_cell(cells, i, j)
            self._reset_cell(cells, j, i)

        self.wait(0.5)

        # ── Stage 5: Add an edge (dynamic update) ──────────────────────────
        ch5 = self.chapter_title("Add Edge (0, 3)")

        self.play(
            gv._node_mobs[0].animate.set_fill(color=CORAL),
            gv._node_mobs[3].animate.set_fill(color=CORAL),
            run_time=0.5,
        )

        # Draw the new edge visually
        new_edge = Line(
            gv._positions[0],
            gv._positions[3],
            color=CORAL,
            stroke_width=3,
        ).shift(LEFT * 1.2)
        self.play(Create(new_edge), run_time=0.7)

        # Update matrix cells (0,3) and (3,0)
        self._highlight_cell(cells, 0, 3, color=SIGNAL)
        self._highlight_cell(cells, 3, 0, color=SIGNAL)
        for idx in [(0, 3), (3, 0)]:
            cell = cells[idx]
            old_num = cell[1]
            new_num = Text("1", font_size=22, color=INK, weight="BOLD").move_to(old_num.get_center())
            self.play(FadeOut(old_num), FadeIn(new_num), run_time=0.4)
            cell.remove(old_num)
            cell.add(new_num)

        add_note = Text("matrix[0][3] = matrix[3][0] = 1", font_size=22, color=SIGNAL)
        add_note.to_edge(DOWN, buff=0.5)
        self.play(Write(add_note))
        self.wait(2)
        self.play(
            FadeOut(add_note),
            gv._node_mobs[0].animate.set_fill(color=C_DEFAULT),
            gv._node_mobs[3].animate.set_fill(color=C_DEFAULT),
            FadeOut(new_edge),
        )
        self.wait(0.3)

        # ── Stage 6: Iterate neighbors of node 1 ───────────────────────────
        ch6 = self.chapter_title("Iterate Neighbors of Node 1")

        self.play(gv._node_mobs[1].animate.set_fill(color=C_ACTIVE), run_time=0.5)

        neighbor_note = Text("Scan row 1 of the matrix:", font_size=24, color=INK)
        neighbor_note.to_edge(DOWN, buff=1.0)
        self.play(Write(neighbor_note))
        self.wait(0.5)

        for j in range(5):
            self._highlight_cell(cells, 1, j, color=SIGNAL if j in adj[1] else MIST)
            if j in adj[1]:
                self.play(
                    gv._node_mobs[j].animate.set_fill(color=C_SORTED),
                    run_time=0.4,
                )
            self.wait(0.35)

        neighbor_result = Text("Neighbors: 0, 3, 4  (O(V) scan)", font_size=22, color=COBALT, weight="BOLD")
        neighbor_result.to_edge(DOWN, buff=0.4)
        self.play(FadeOut(neighbor_note), Write(neighbor_result))
        self.wait(1.8)

        # Reset
        self.play(
            FadeOut(neighbor_result),
            *[gv._node_mobs[n].animate.set_fill(color=C_DEFAULT) for n in nodes],
            run_time=0.4,
        )
        for i in range(5):
            for j in range(5):
                self._reset_cell(cells, i, j)

        self.wait(0.3)

        # ── Stage 7: Space trade-off note ───────────────────────────────────
        ch7 = self.chapter_title("Space vs Speed Trade-off")

        tradeoff = VGroup(
            Text("Adjacency Matrix:", font_size=26, color=COBALT, weight="BOLD"),
            Text("  ✓  O(1) edge lookup (M[i][j])", font_size=24, color=INK),
            Text("  ✓  O(1) add / remove edge", font_size=24, color=INK),
            Text("  ✗  O(V²) space — wasteful for sparse graphs", font_size=24, color=CORAL),
            Text("  ✗  O(V) to iterate all neighbors of a node", font_size=24, color=CORAL),
            Text("Best for: dense graphs where V is small", font_size=24, color=SIGNAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).shift(RIGHT * 2.0 + DOWN * 0.3)

        self.play(
            FadeOut(matrix_group), FadeOut(matrix_title),
            graph_group.animate.move_to(LEFT * 2.5),
        )
        self.play(FadeIn(tradeoff, shift=LEFT * 0.3))
        self.wait(3)

        self.play(FadeOut(tradeoff), FadeOut(graph_group))
        self.wait(0.2)

        # ── Stage 8: Complexity card ────────────────────────────────────────
        self.chapter_title("Complexity Summary")

        self.complexity_card(
            time_best=r"O(1)",
            time_avg=r"O(V)",
            time_worst=r"O(V^2)",
            space=r"O(V^2)",
        )
        self.wait(3)
