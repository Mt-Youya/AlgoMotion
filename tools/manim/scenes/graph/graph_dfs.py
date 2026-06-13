from manim import *
from ...base import AlgoScene, GraphVis


class GraphDfs(AlgoScene):
    TITLE = "Depth-First Search"
    SUBTITLE = "Explores as far as possible along each branch before backtracking."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_text = VGroup(
            Text("Depth-First Search (DFS)", font_size=36, color=YELLOW),
            Text("Traverses a graph by going deep before wide.", font_size=24),
            Text("Uses a stack (or recursion) to track the path.", font_size=24),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)
        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Graph Setup ────────────────────────────────────────────
        self.chapter_title("Graph Setup")

        # Define graph: adjacency list for nodes 0-6
        vertices = [0, 1, 2, 3, 4, 5, 6]
        edges = [(0, 1), (0, 2), (1, 3), (1, 4), (2, 5), (2, 6)]

        layout = {
            0: [0, 2.5, 0],
            1: [-2, 0.5, 0],
            2: [2, 0.5, 0],
            3: [-3, -1.5, 0],
            4: [-1, -1.5, 0],
            5: [1, -1.5, 0],
            6: [3, -1.5, 0],
        }

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            vertex_config={"radius": 0.35, "fill_color": BLUE_D, "stroke_color": WHITE},
            edge_config={"stroke_color": GRAY, "stroke_width": 3},
        )

        # Add node labels
        labels = VGroup(*[
            Text(str(v), font_size=22, color=WHITE).move_to(graph.vertices[v].get_center())
            for v in vertices
        ])

        self.play(Create(graph), run_time=2)
        self.play(FadeIn(labels))
        self.wait(1.5)

        # ── Stage 3: DFS Traversal — Step by Step ──────────────────────────
        self.chapter_title("DFS Traversal")

        visited_order = [0, 1, 3, 4, 2, 5, 6]
        dfs_edges = [(0, 1), (1, 3), (1, 4), (0, 2), (2, 5), (2, 6)]

        visited_label = Text("Visited: []", font_size=22, color=GREEN).to_edge(DOWN, buff=0.5)
        stack_label = Text("Stack: [0]", font_size=22, color=ORANGE).next_to(visited_label, UP, buff=0.2)
        self.play(FadeIn(visited_label), FadeIn(stack_label))
        self.wait(0.5)

        visited_so_far = []
        for i, node in enumerate(visited_order):
            # Highlight current node
            self.play(
                graph.vertices[node].animate.set_fill(YELLOW, opacity=1),
                run_time=0.6,
            )
            visited_so_far.append(node)
            new_visited = Text(
                f"Visited: {visited_so_far}", font_size=22, color=GREEN
            ).to_edge(DOWN, buff=0.5)
            remaining_stack = visited_order[i + 1:]
            new_stack = Text(
                f"Stack: {remaining_stack}", font_size=22, color=ORANGE
            ).next_to(new_visited, UP, buff=0.2)
            self.play(
                Transform(visited_label, new_visited),
                Transform(stack_label, new_stack),
                run_time=0.5,
            )
            # Highlight traversal edge
            if i < len(dfs_edges):
                u, v = dfs_edges[i]
                if (u, v) in edges or (v, u) in edges:
                    self.play(
                        graph.edges[(u, v) if (u, v) in edges else (v, u)].animate
                        .set_stroke(YELLOW, width=6),
                        run_time=0.5,
                    )
            self.wait(0.8)

        self.play(FadeOut(visited_label), FadeOut(stack_label))
        self.wait(1)

        # ── Stage 4: Backtracking Highlight ────────────────────────────────
        self.chapter_title("Backtracking")

        backtrack_note = Text(
            "When a dead-end is reached, DFS backtracks\nto the most recent unexplored branch.",
            font_size=24,
            color=WHITE,
        ).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(backtrack_note, shift=UP))

        # Re-color node 3 (dead end) and animate backtrack arrow
        self.play(graph.vertices[3].animate.set_fill(RED_D, opacity=1), run_time=0.5)
        self.wait(0.5)
        backtrack_arrow = Arrow(
            graph.vertices[3].get_center(),
            graph.vertices[1].get_center(),
            buff=0.4,
            color=RED,
            stroke_width=4,
        )
        backtrack_text = Text("Backtrack!", font_size=20, color=RED).next_to(backtrack_arrow, LEFT, buff=0.1)
        self.play(GrowArrow(backtrack_arrow), FadeIn(backtrack_text))
        self.wait(1.5)
        self.play(FadeOut(backtrack_arrow), FadeOut(backtrack_text), FadeOut(backtrack_note))

        # ── Stage 5: Visited Set Explanation ───────────────────────────────
        self.chapter_title("Avoiding Cycles")

        cycle_note = VGroup(
            Text("visited = set()", font_size=26, color=YELLOW, font="Monospace"),
            Text("Tracks visited nodes to prevent infinite loops", font_size=22),
            Text("in graphs with cycles.", font_size=22),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(cycle_note, shift=UP))

        # Highlight all visited nodes green
        self.play(
            *[graph.vertices[v].animate.set_fill(GREEN_D, opacity=1) for v in visited_order],
            run_time=1.2,
        )
        self.wait(2)
        self.play(FadeOut(cycle_note))

        # ── Stage 6: Pseudocode ─────────────────────────────────────────────
        self.chapter_title("Pseudocode")
        self.play(FadeOut(graph), FadeOut(labels))

        pseudo = VGroup(
            Text("def dfs(graph, node, visited):", font_size=22, color=YELLOW, font="Monospace"),
            Text("    if node in visited: return", font_size=22, font="Monospace"),
            Text("    visited.add(node)", font_size=22, color=GREEN, font="Monospace"),
            Text("    for neighbor in graph[node]:", font_size=22, font="Monospace"),
            Text("        dfs(graph, neighbor, visited)", font_size=22, color=BLUE, font="Monospace"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(ORIGIN)

        for line in pseudo:
            self.play(FadeIn(line, shift=RIGHT * 0.3), run_time=0.5)
        self.wait(2.5)
        self.play(FadeOut(pseudo))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(V + E)",
            space_complexity="O(V)",
        )
        self.wait(2)
