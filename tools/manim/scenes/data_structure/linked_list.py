from manim import *
from ...base import AlgoScene


class LinkedList(AlgoScene):
    TITLE = "Linked List"
    SUBTITLE = "Linear sequence of nodes each holding a value and pointer to the next."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro — What is a Linked List? ─────────────────────
        stage1 = self.chapter_title("What is a Linked List?")

        intro_text = VGroup(
            Text("A Linked List is a linear data structure where:", font_size=26, color=WHITE),
            Text("  • Each element is called a node", font_size=22, color=YELLOW),
            Text("  • Each node stores a value (data)", font_size=22, color=GREEN),
            Text("  • Each node holds a pointer to the next node", font_size=22, color=BLUE),
            Text("  • The last node points to NULL (None)", font_size=22, color=RED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.2) for line in intro_text], lag_ratio=0.25))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(stage1))
        self.wait(0.3)

        # ── Stage 2: Node Structure ──────────────────────────────────────
        stage2 = self.chapter_title("Node Structure")

        data_box = Rectangle(width=1.4, height=0.8, color=YELLOW).set_fill(YELLOW, opacity=0.25)
        data_lbl = Text("data", font_size=20, color=YELLOW_A).move_to(data_box)

        next_box = Rectangle(width=1.4, height=0.8, color=BLUE).set_fill(BLUE_E, opacity=0.4)
        next_lbl = Text("next →", font_size=20, color=BLUE_A).move_to(next_box)

        node_group = VGroup(
            VGroup(data_box, data_lbl),
            VGroup(next_box, next_lbl),
        ).arrange(RIGHT, buff=0).move_to(ORIGIN)

        node_brace_lbl = Text("One Singly Linked List Node", font_size=20, color=GRAY_A)
        node_brace_lbl.next_to(node_group, UP, buff=0.5)

        val_label = Text("42", font_size=28, color=WHITE, weight="BOLD")
        val_label.move_to(data_box)

        self.play(FadeIn(node_group), Write(node_brace_lbl))
        self.wait(0.7)
        self.play(Transform(data_lbl, val_label))
        self.wait(1.5)
        self.play(FadeOut(node_group), FadeOut(node_brace_lbl))
        self.wait(0.3)
        self.play(FadeOut(stage2))

        # ── Stage 3: Build a 5-node list ────────────────────────────────
        stage3 = self.chapter_title("Building: 10 → 20 → 30 → 40 → 50 → NULL")

        values = [10, 20, 30, 40, 50]
        node_colors = [RED, ORANGE, YELLOW, GREEN, TEAL]
        node_width = 1.1
        gap = 2.0

        nodes = []
        node_mobs = VGroup()

        for i, (v, c) in enumerate(zip(values, node_colors)):
            data_rect = Rectangle(width=node_width, height=0.75, color=c).set_fill(c, opacity=0.25)
            data_val = Text(str(v), font_size=22, color=WHITE, weight="BOLD").move_to(data_rect)
            next_rect = Rectangle(width=0.7, height=0.75, color=BLUE_B).set_fill(BLUE_E, opacity=0.35)
            next_ptr = Text("→", font_size=18, color=BLUE_A).move_to(next_rect)

            node = VGroup(
                VGroup(data_rect, data_val),
                VGroup(next_rect, next_ptr),
            ).arrange(RIGHT, buff=0)
            x_pos = -4.0 + i * gap
            node.move_to(RIGHT * x_pos)
            nodes.append(node)
            node_mobs.add(node)

        # NULL box
        null_box = Rectangle(width=1.0, height=0.75, color=GRAY).set_fill(DARK_GRAY, opacity=0.5)
        null_lbl = Text("NULL", font_size=16, color=GRAY_A).move_to(null_box)
        null_group = VGroup(null_box, null_lbl)
        null_group.move_to(RIGHT * (-4.0 + len(values) * gap))

        for node in nodes:
            self.play(FadeIn(node, scale=0.7), run_time=0.45)
        self.play(FadeIn(null_group, scale=0.7), run_time=0.45)
        self.wait(1)

        # Draw arrows from next-box to next node
        arrows = VGroup()
        for i in range(len(nodes) - 1):
            start = nodes[i][1].get_right()
            end = nodes[i + 1][0].get_left()
            arr = Arrow(start, end, buff=0.08, color=BLUE_B, stroke_width=2.5,
                        max_tip_length_to_length_ratio=0.18)
            arrows.add(arr)
        # Last node → NULL
        last_arr = Arrow(nodes[-1][1].get_right(), null_group.get_left(),
                         buff=0.08, color=GRAY, stroke_width=2.5,
                         max_tip_length_to_length_ratio=0.18)
        arrows.add(last_arr)

        self.play(LaggedStart(*[Create(a) for a in arrows], lag_ratio=0.15), run_time=1.5)
        self.wait(1.5)
        self.play(FadeOut(stage3))

        full_scene = VGroup(node_mobs, null_group, arrows)

        # ── Stage 4: Traversal ───────────────────────────────────────────
        stage4 = self.chapter_title("Traversal: Visit Each Node O(n)")

        head_label = Text("head", font_size=18, color=WHITE)
        head_label.next_to(nodes[0], UP, buff=0.35)
        head_arrow = Arrow(head_label.get_bottom(), nodes[0].get_top(),
                           buff=0.05, color=WHITE, stroke_width=2.5,
                           max_tip_length_to_length_ratio=0.2)

        self.play(FadeIn(head_label), Create(head_arrow))
        self.wait(0.5)

        cursor_dot = Dot(color=YELLOW, radius=0.12)
        cursor_lbl = Text("cur", font_size=16, color=YELLOW)

        cursor_dot.next_to(nodes[0], DOWN, buff=0.25)
        cursor_lbl.next_to(cursor_dot, DOWN, buff=0.08)

        self.play(FadeIn(cursor_dot), FadeIn(cursor_lbl))

        for i, node in enumerate(nodes):
            highlight = SurroundingRectangle(node[0], color=YELLOW, stroke_width=3, buff=0.05)
            self.play(
                cursor_dot.animate.next_to(node, DOWN, buff=0.25),
                cursor_lbl.animate.next_to(cursor_dot, DOWN, buff=0.08),
                Create(highlight),
                run_time=0.5,
            )
            visit_text = Text(f"Visit {values[i]}", font_size=18, color=YELLOW)
            visit_text.next_to(node, UP, buff=0.35)
            self.play(FadeIn(visit_text), run_time=0.3)
            self.wait(0.35)
            self.play(FadeOut(visit_text), FadeOut(highlight), run_time=0.25)

        self.play(FadeOut(cursor_dot), FadeOut(cursor_lbl))
        self.wait(1)
        self.play(FadeOut(stage4))

        # ── Stage 5: Insertion at Head ───────────────────────────────────
        stage5 = self.chapter_title("Insert at Head: Prepend 5 → O(1)")

        new_data = Rectangle(width=node_width, height=0.75, color=PURPLE).set_fill(PURPLE, opacity=0.3)
        new_val = Text("5", font_size=22, color=WHITE, weight="BOLD").move_to(new_data)
        new_next = Rectangle(width=0.7, height=0.75, color=BLUE_B).set_fill(BLUE_E, opacity=0.35)
        new_ptr = Text("→", font_size=18, color=BLUE_A).move_to(new_next)
        new_node = VGroup(VGroup(new_data, new_val), VGroup(new_next, new_ptr)).arrange(RIGHT, buff=0)
        new_node.next_to(nodes[0], UP * 3)

        step_a = Text("1. new_node.next = head", font_size=20, color=GREEN_A).to_edge(DOWN).shift(UP * 0.8)
        step_b = Text("2. head = new_node", font_size=20, color=YELLOW_A).to_edge(DOWN).shift(UP * 0.4)

        self.play(FadeIn(new_node, shift=DOWN * 0.5))
        self.wait(0.4)
        self.play(Write(step_a))
        self.wait(0.6)
        self.play(Write(step_b))
        self.wait(1)

        new_head_arrow = Arrow(new_node[1].get_right(), nodes[0].get_top(),
                               buff=0.08, color=PURPLE, stroke_width=2.5,
                               max_tip_length_to_length_ratio=0.2)
        self.play(Create(new_head_arrow), run_time=0.5)
        self.wait(0.8)

        self.play(FadeOut(new_node), FadeOut(new_head_arrow), FadeOut(step_a), FadeOut(step_b))
        self.wait(0.4)
        self.play(FadeOut(stage5))

        # ── Stage 6: Deletion ────────────────────────────────────────────
        stage6 = self.chapter_title("Delete Node (30): Relink Pointers O(n)")

        target_node = nodes[2]
        self.play(target_node[0][0].animate.set_fill(RED, opacity=0.6).set_stroke(RED, width=3))
        self.wait(0.5)

        del_step1 = Text("1. Traverse to node before 30 (node 20)", font_size=19, color=BLUE_A)
        del_step2 = Text("2. prev.next = target.next  (skip over 30)", font_size=19, color=GREEN_A)
        del_step3 = Text("3. Deallocate node 30", font_size=19, color=RED_A)

        steps_group = VGroup(del_step1, del_step2, del_step3).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        steps_group.to_edge(DOWN).shift(UP * 0.3)

        self.play(Write(del_step1))
        self.wait(0.6)
        self.play(Write(del_step2))
        self.wait(0.6)
        self.play(Write(del_step3))
        self.wait(1)

        bypass_arrow = Arrow(
            nodes[1][1].get_right(),
            nodes[3][0].get_left(),
            buff=0.08,
            color=GREEN,
            stroke_width=2.5,
            path_arc=-1.2,
            max_tip_length_to_length_ratio=0.15,
        )
        self.play(Create(bypass_arrow), run_time=0.7)
        self.wait(0.5)
        self.play(FadeOut(target_node, scale=0.1), run_time=0.6)
        self.wait(0.5)
        self.play(FadeOut(del_step1), FadeOut(del_step2), FadeOut(del_step3), FadeOut(bypass_arrow))
        self.wait(0.4)
        self.play(FadeOut(stage6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.play(FadeOut(full_scene), FadeOut(head_label), FadeOut(head_arrow))
        self.wait(0.3)

        stage7 = self.chapter_title("Time & Space Complexity")
        self.wait(0.5)

        self.complexity_card(
            r"O(1)",
            r"O(n)",
            r"O(n)",
            r"O(n)",
        )
        self.wait(2.5)
        self.play(FadeOut(stage7))
