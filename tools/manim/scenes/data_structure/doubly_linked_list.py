from manim import *
from ...base import AlgoScene


class DoublyLinkedList(AlgoScene):
    TITLE = "Doubly Linked List"
    SUBTITLE = "Linked list with pointers to both next and previous nodes."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is a Doubly Linked List?")

        intro_text = VGroup(
            Text("Each node holds:", font_size=28),
            Text("  • A data value", font_size=24, color=YELLOW),
            Text("  • A pointer to the NEXT node", font_size=24, color=GREEN),
            Text("  • A pointer to the PREV node", font_size=24, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Build the node structure ───────────────────────────
        self.chapter_title("Node Structure")

        def make_node(value, color=WHITE):
            prev_box = Rectangle(width=1.0, height=0.7, color=BLUE).set_fill(BLUE_E, opacity=0.4)
            prev_lbl = Text("prev", font_size=16, color=BLUE_A).move_to(prev_box)

            data_box = Rectangle(width=1.0, height=0.7, color=color).set_fill(color, opacity=0.3)
            data_lbl = Text(str(value), font_size=24, color=WHITE).move_to(data_box)

            next_box = Rectangle(width=1.0, height=0.7, color=GREEN).set_fill(GREEN_E, opacity=0.4)
            next_lbl = Text("next", font_size=16, color=GREEN_A).move_to(next_box)

            row = VGroup(prev_box, prev_lbl, data_box, data_lbl, next_box, next_lbl)
            group = VGroup(
                VGroup(prev_box, prev_lbl),
                VGroup(data_box, data_lbl),
                VGroup(next_box, next_lbl),
            ).arrange(RIGHT, buff=0)
            return group

        node_demo = make_node(42, YELLOW)
        node_demo.move_to(ORIGIN)

        brace_label = Text("One DLL Node", font_size=22, color=GRAY_A).next_to(node_demo, UP, buff=0.4)

        self.play(FadeIn(node_demo), Write(brace_label))
        self.wait(2)
        self.play(FadeOut(node_demo), FadeOut(brace_label))
        self.wait(0.3)

        # ── Stage 3: Build a 4-node list ────────────────────────────────
        self.chapter_title("Building the List: 10 → 20 → 30 → 40")

        values = [10, 20, 30, 40]
        node_colors = [RED, ORANGE, YELLOW, GREEN]
        node_width = 1.2
        gap = 1.8

        nodes = VGroup()
        data_boxes = []
        for i, (v, c) in enumerate(zip(values, node_colors)):
            box = Rectangle(width=node_width, height=0.7, color=c).set_fill(c, opacity=0.25)
            lbl = Text(str(v), font_size=22, color=WHITE).move_to(box)
            node = VGroup(box, lbl)
            node.move_to(LEFT * (1.5 * gap) + RIGHT * (i * gap))
            nodes.add(node)
            data_boxes.append(node)

        nodes.move_to(ORIGIN)

        for node in nodes:
            self.play(FadeIn(node, scale=0.6), run_time=0.5)
        self.wait(1)

        # Draw arrows
        arrows_next = VGroup()
        arrows_prev = VGroup()
        for i in range(len(nodes) - 1):
            start = nodes[i].get_right()
            end = nodes[i + 1].get_left()
            mid = (start + end) / 2

            arr_next = Arrow(
                start + UP * 0.15, end + UP * 0.15,
                buff=0.05, color=GREEN, stroke_width=2,
                max_tip_length_to_length_ratio=0.15
            )
            arr_prev = Arrow(
                end + DOWN * 0.15, start + DOWN * 0.15,
                buff=0.05, color=BLUE, stroke_width=2,
                max_tip_length_to_length_ratio=0.15
            )
            arrows_next.add(arr_next)
            arrows_prev.add(arr_prev)

        self.play(LaggedStart(*[Create(a) for a in arrows_next], lag_ratio=0.2), run_time=1.2)
        self.play(LaggedStart(*[Create(a) for a in arrows_prev], lag_ratio=0.2), run_time=1.2)

        next_legend = Text("→ next", font_size=18, color=GREEN).to_edge(DOWN).shift(LEFT * 2)
        prev_legend = Text("← prev", font_size=18, color=BLUE).to_edge(DOWN).shift(RIGHT * 2)
        self.play(Write(next_legend), Write(prev_legend))
        self.wait(2)

        full_list = VGroup(nodes, arrows_next, arrows_prev, next_legend, prev_legend)

        # ── Stage 4: Traversal forward ───────────────────────────────────
        self.chapter_title("Forward Traversal (head → tail)")

        cursor = Arrow(ORIGIN, DOWN * 0.4, color=WHITE, buff=0).scale(0.7)
        cursor_lbl = Text("cur", font_size=16, color=WHITE)

        def position_cursor(node):
            cursor.next_to(node, UP, buff=0.1)
            cursor_lbl.next_to(cursor, UP, buff=0.05)

        position_cursor(nodes[0])
        self.play(FadeIn(cursor), FadeIn(cursor_lbl))
        self.wait(0.5)

        for i, node in enumerate(nodes):
            highlight = node[0].copy().set_fill(YELLOW, opacity=0.6).set_stroke(YELLOW, width=3)
            self.play(
                cursor.animate.next_to(node, UP, buff=0.1),
                cursor_lbl.animate.next_to(cursor, UP, buff=0.05),
                FadeIn(highlight),
                run_time=0.6,
            )
            self.wait(0.4)
            self.play(FadeOut(highlight), run_time=0.3)

        self.play(FadeOut(cursor), FadeOut(cursor_lbl))
        self.wait(1)

        # ── Stage 5: Insert a node ───────────────────────────────────────
        self.chapter_title("Insert Node (25) Between 20 and 30")

        new_box = Rectangle(width=node_width, height=0.7, color=PURPLE).set_fill(PURPLE, opacity=0.35)
        new_lbl = Text("25", font_size=22, color=WHITE).move_to(new_box)
        new_node = VGroup(new_box, new_lbl)
        new_node.next_to(nodes[1], UP * 3)

        self.play(FadeIn(new_node, shift=DOWN))
        self.wait(0.5)

        insert_pos = (nodes[1].get_center() + nodes[2].get_center()) / 2 + DOWN * 1.2
        self.play(new_node.animate.move_to(insert_pos))
        self.wait(0.5)

        step1 = Text("1. new.prev = node20", font_size=18, color=BLUE_A).to_edge(DOWN).shift(UP * 0.5)
        step2 = Text("2. new.next = node30", font_size=18, color=GREEN_A).to_edge(DOWN)

        self.play(Write(step1))
        self.wait(0.7)
        self.play(Write(step2))
        self.wait(1.5)
        self.play(FadeOut(step1), FadeOut(step2), FadeOut(new_node))
        self.wait(0.5)

        # ── Stage 6: Delete a node ───────────────────────────────────────
        self.chapter_title("Delete Node (20)")

        target = nodes[1]
        self.play(target[0].animate.set_fill(RED, opacity=0.7).set_stroke(RED, width=4))
        self.wait(0.5)

        del_steps = VGroup(
            Text("1. node10.next = node30", font_size=18, color=GREEN_A),
            Text("2. node30.prev = node10", font_size=18, color=BLUE_A),
            Text("3. Free node20", font_size=18, color=RED_A),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).to_edge(DOWN).shift(UP * 0.3)

        self.play(LaggedStart(*[Write(s) for s in del_steps], lag_ratio=0.4), run_time=1.5)
        self.wait(1)
        self.play(FadeOut(target, scale=0.1))
        self.wait(0.5)
        self.play(FadeOut(del_steps))
        self.wait(0.5)

        # ── Stage 7: Complexity card ─────────────────────────────────────
        self.play(FadeOut(full_list))
        self.wait(0.3)
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(n)",
        )
        self.wait(2)
