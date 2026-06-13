from manim import *
from ...base import GraphVis


class GraphBfs(GraphVis):
    TITLE = "Breadth-First Search"
    SUBTITLE = "Explores all neighbors at current depth before moving to next level using a queu"
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro = self.make_intro_card(self.TITLE, self.SUBTITLE)
        self.play(FadeIn(intro))
        self.wait(2)
        self.play(FadeOut(intro))
        self.wait(0.5)

        # ── Stage 2: Build the graph ─────────────────────────────────────
        self.chapter_title("Graph Setup")

        vertices = [0, 1, 2, 3, 4, 5, 6]
        edges = [(0, 1), (0, 2), (1, 3), (1, 4), (2, 5), (2, 6)]

        layout = {
            0: [0, 2, 0],
            1: [-2, 0, 0],
            2: [2, 0, 0],
            3: [-3, -2, 0],
            4: [-1, -2, 0],
            5: [1, -2, 0],
            6: [3, -2, 0],
        }

        node_labels = {v: str(v) for v in vertices}

        graph = self.create_graph(vertices, edges, layout, node_labels)
        self.play(Create(graph))
        self.wait(1)

        source_label = Text("Start: Node 0", font_size=28, color=YELLOW).to_edge(UP).shift(DOWN * 0.5)
        self.play(Write(source_label))
        self.wait(1)

        # ── Stage 3: Queue visualization setup ──────────────────────────
        self.chapter_title("Queue Initialization")

        queue_title = Text("Queue:", font_size=26, color=WHITE).to_edge(LEFT).shift(RIGHT * 0.5 + DOWN * 2.5)
        queue_box = Rectangle(width=5, height=0.7, color=BLUE).next_to(queue_title, RIGHT, buff=0.3)
        queue_label = Text("[ 0 ]", font_size=24, color=BLUE).move_to(queue_box.get_center())

        visited_title = Text("Visited:", font_size=26, color=WHITE).to_edge(LEFT).shift(RIGHT * 0.5 + DOWN * 3.3)
        visited_box = Rectangle(width=5, height=0.7, color=GREEN).next_to(visited_title, RIGHT, buff=0.3)
        visited_label = Text("{ }", font_size=24, color=GREEN).move_to(visited_box.get_center())

        self.play(
            FadeIn(queue_title), Create(queue_box), Write(queue_label),
            FadeIn(visited_title), Create(visited_box), Write(visited_label),
        )
        self.wait(1)

        # Highlight source node
        self.highlight_node(graph, 0, color=YELLOW)
        self.wait(0.5)

        # ── Stage 4: BFS Level 0 — visit node 0 ─────────────────────────
        self.chapter_title("Level 0 — Visit Node 0")

        new_visited = Text("{ 0 }", font_size=24, color=GREEN).move_to(visited_box.get_center())
        new_queue = Text("[ 1, 2 ]", font_size=24, color=BLUE).move_to(queue_box.get_center())

        self.highlight_node(graph, 0, color=GREEN)
        self.play(
            Transform(visited_label, new_visited),
            Transform(queue_label, new_queue),
        )
        self.wait(0.5)

        # Highlight edges from 0
        self.highlight_edge(graph, 0, 1, color=YELLOW)
        self.highlight_edge(graph, 0, 2, color=YELLOW)
        self.wait(1)

        # ── Stage 5: BFS Level 1 — visit nodes 1 and 2 ──────────────────
        self.chapter_title("Level 1 — Visit Nodes 1 & 2")

        self.highlight_node(graph, 1, color=ORANGE)
        self.wait(0.4)

        new_visited2 = Text("{ 0, 1 }", font_size=24, color=GREEN).move_to(visited_box.get_center())
        new_queue2 = Text("[ 2, 3, 4 ]", font_size=24, color=BLUE).move_to(queue_box.get_center())
        self.play(
            Transform(visited_label, new_visited2),
            Transform(queue_label, new_queue2),
        )
        self.highlight_edge(graph, 1, 3, color=YELLOW)
        self.highlight_edge(graph, 1, 4, color=YELLOW)
        self.wait(0.6)

        self.highlight_node(graph, 2, color=ORANGE)
        self.wait(0.4)

        new_visited3 = Text("{ 0, 1, 2 }", font_size=24, color=GREEN).move_to(visited_box.get_center())
        new_queue3 = Text("[ 3, 4, 5, 6 ]", font_size=22, color=BLUE).move_to(queue_box.get_center())
        self.play(
            Transform(visited_label, new_visited3),
            Transform(queue_label, new_queue3),
        )
        self.highlight_edge(graph, 2, 5, color=YELLOW)
        self.highlight_edge(graph, 2, 6, color=YELLOW)
        self.wait(1)

        # ── Stage 6: BFS Level 2 — visit leaf nodes ──────────────────────
        self.chapter_title("Level 2 — Visit Leaf Nodes")

        for node, label_text in [(3, "{ 0,1,2,3 }"), (4, "{ 0,1,2,3,4 }"), (5, "{ 0..5 }"), (6, "{ 0..6 }")]:
            self.highlight_node(graph, node, color=GREEN)
            lbl = Text(label_text, font_size=22, color=GREEN).move_to(visited_box.get_center())
            self.play(Transform(visited_label, lbl))
            self.wait(0.4)

        final_queue = Text("[ ]  (empty)", font_size=22, color=BLUE).move_to(queue_box.get_center())
        self.play(Transform(queue_label, final_queue))
        self.wait(1)

        complete_text = Text("BFS Complete!", font_size=36, color=YELLOW).to_edge(DOWN).shift(UP * 0.3)
        self.play(Write(complete_text))
        self.wait(1.5)

        self.play(
            FadeOut(graph), FadeOut(source_label),
            FadeOut(queue_title), FadeOut(queue_box), FadeOut(queue_label),
            FadeOut(visited_title), FadeOut(visited_box), FadeOut(visited_label),
            FadeOut(complete_text),
        )
        self.wait(0.5)

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_best="O(V + E)",
            time_avg="O(V + E)",
            time_worst="O(V + E)",
            space="O(V)",
        )
        self.wait(2)
