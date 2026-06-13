from manim import *
from ...base import AlgoScene, TreeVis


class PriorityQueue(AlgoScene):
    TITLE = "Priority Queue"
    SUBTITLE = "Abstract type serving elements by priority, typically implemented with a heap."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is a Priority Queue?")
        intro_lines = VGroup(
            Text("A Priority Queue is an abstract data type", font_size=28),
            Text("where each element has an associated priority.", font_size=28),
            Text("Elements with higher priority are served first.", font_size=28),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)
        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(intro_lines))
        self.wait(0.5)

        # ── Stage 2: Heap Structure Overview ────────────────────────────────
        self.chapter_title("Min-Heap: The Common Implementation")

        heap_values = [1, 3, 2, 7, 5, 6, 4]
        node_radius = 0.38
        node_positions = {
            0: UP * 2.2,
            1: UP * 0.9 + LEFT * 1.8,
            2: UP * 0.9 + RIGHT * 1.8,
            3: DOWN * 0.5 + LEFT * 2.8,
            4: DOWN * 0.5 + LEFT * 0.8,
            5: DOWN * 0.5 + RIGHT * 0.8,
            6: DOWN * 0.5 + RIGHT * 2.8,
        }

        nodes = {}
        for i, val in enumerate(heap_values):
            circle = Circle(radius=node_radius, color=BLUE, fill_opacity=0.3, stroke_width=2)
            label = Text(str(val), font_size=26, color=WHITE)
            node = VGroup(circle, label).move_to(node_positions[i])
            nodes[i] = node

        edges = []
        parent_child = [(0, 1), (0, 2), (1, 3), (1, 4), (2, 5), (2, 6)]
        for p, c in parent_child:
            line = Line(
                node_positions[p],
                node_positions[c],
                color=GRAY,
                stroke_width=2,
            )
            edges.append(line)

        heap_group = VGroup(*edges, *nodes.values())
        heap_group.scale(0.9).move_to(ORIGIN + DOWN * 0.2)

        self.play(*[Create(e) for e in edges], run_time=0.8)
        self.play(*[FadeIn(n, scale=0.8) for n in nodes.values()], run_time=1.0)
        self.wait(1.5)

        heap_prop = Text("Heap Property: parent ≤ children (min-heap)", font_size=24, color=YELLOW)
        heap_prop.to_edge(DOWN, buff=0.4)
        self.play(Write(heap_prop))
        self.wait(2)
        self.play(FadeOut(heap_prop))

        # ── Stage 3: Insert Operation ────────────────────────────────────────
        self.chapter_title("Insert: Add Element & Bubble Up")

        insert_label = Text("Inserting value: 0", font_size=26, color=GREEN)
        insert_label.to_edge(DOWN, buff=0.8)
        self.play(Write(insert_label))

        new_pos = DOWN * 1.9 + LEFT * 3.8
        new_circle = Circle(radius=node_radius, color=GREEN, fill_opacity=0.5, stroke_width=2)
        new_text = Text("0", font_size=26, color=WHITE)
        new_node = VGroup(new_circle, new_text).move_to(new_pos)
        new_edge = Line(node_positions[3], new_pos, color=GRAY, stroke_width=2)

        self.play(Create(new_edge), FadeIn(new_node, scale=0.7))
        self.wait(1)

        # Bubble up animation: 0 swaps with 7, then with 3, then with 1
        swap_arrow = Arrow(new_pos, node_positions[3], color=YELLOW, buff=0.1)
        self.play(Create(swap_arrow))
        self.wait(0.5)
        self.play(
            new_node.animate.move_to(node_positions[3]),
            nodes[3].animate.move_to(new_pos),
            FadeOut(swap_arrow),
        )
        self.wait(0.5)

        swap_arrow2 = Arrow(node_positions[3], node_positions[1], color=YELLOW, buff=0.1)
        self.play(Create(swap_arrow2))
        self.wait(0.5)
        self.play(
            new_node.animate.move_to(node_positions[1]),
            nodes[1].animate.move_to(node_positions[3]),
            FadeOut(swap_arrow2),
        )
        self.wait(0.5)

        swap_arrow3 = Arrow(node_positions[1], node_positions[0], color=YELLOW, buff=0.1)
        self.play(Create(swap_arrow3))
        self.wait(0.5)
        self.play(
            new_node.animate.move_to(node_positions[0]),
            nodes[0].animate.move_to(node_positions[1]),
            FadeOut(swap_arrow3),
        )
        self.wait(1)

        bubble_note = Text("Bubble Up: O(log n) swaps", font_size=24, color=YELLOW)
        bubble_note.to_edge(DOWN, buff=0.4)
        self.play(FadeOut(insert_label), Write(bubble_note))
        self.wait(2)
        self.play(FadeOut(bubble_note), FadeOut(new_node), FadeOut(new_edge))
        self.play(nodes[0].animate.move_to(node_positions[0]))
        self.wait(0.5)

        # ── Stage 4: Extract-Min Operation ──────────────────────────────────
        self.chapter_title("Extract-Min: Remove Root & Sift Down")

        extract_label = Text("Extracting minimum (root = 1)", font_size=26, color=RED)
        extract_label.to_edge(DOWN, buff=0.8)
        self.play(Write(extract_label))
        self.wait(0.5)

        # Highlight root
        self.play(nodes[0][0].animate.set_fill(RED, opacity=0.6))
        self.wait(0.8)

        # Move last element to root
        last_node = nodes[6]
        self.play(
            FadeOut(nodes[0]),
            last_node.animate.move_to(node_positions[0]),
        )
        self.wait(0.8)

        sift_note = Text("Sift Down: O(log n) comparisons", font_size=24, color=YELLOW)
        sift_note.to_edge(DOWN, buff=0.4)
        self.play(FadeOut(extract_label), Write(sift_note))
        self.wait(2)
        self.play(FadeOut(sift_note), FadeOut(heap_group), FadeOut(last_node))
        self.wait(0.5)

        # ── Stage 5: Array Representation ───────────────────────────────────
        self.chapter_title("Heap as Array")

        arr_values = [1, 3, 2, 7, 5, 6, 4]
        arr_cells = VGroup()
        for i, v in enumerate(arr_values):
            cell = VGroup(
                Square(side_length=0.7, color=BLUE, fill_opacity=0.2, stroke_width=2),
                Text(str(v), font_size=24),
            )
            arr_cells.add(cell)
        arr_cells.arrange(RIGHT, buff=0).move_to(UP * 0.5)

        indices = VGroup()
        for i in range(len(arr_values)):
            idx = Text(str(i), font_size=18, color=GRAY)
            idx.next_to(arr_cells[i], DOWN, buff=0.15)
            indices.add(idx)

        self.play(FadeIn(arr_cells), FadeIn(indices))
        self.wait(1)

        formulas = VGroup(
            Text("Parent(i)  = (i-1) // 2", font_size=22, color=YELLOW),
            Text("Left(i)    = 2*i + 1", font_size=22, color=GREEN),
            Text("Right(i)   = 2*i + 2", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.3).move_to(DOWN * 1.5)
        self.play(Write(formulas))
        self.wait(2.5)
        self.play(FadeOut(arr_cells), FadeOut(indices), FadeOut(formulas))
        self.wait(0.5)

        # ── Stage 6: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexities=[
                ("Insert", "O(log n)"),
                ("Extract-Min/Max", "O(log n)"),
                ("Peek Min/Max", "O(1)"),
                ("Build Heap", "O(n)"),
            ],
            space_complexity="O(n)",
        )
        self.wait(2)
