from manim import *
from ...base import AlgoScene, TreeVis
from ...base.tree_vis import TreeNode, from_list
from ...base.algo_scene import (
    INK, COBALT, SIGNAL, CORAL, MIST, GRAY, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class TreePostorder(AlgoScene):
    TITLE = "Postorder Traversal"
    SUBTITLE = "Traverse a binary tree in left-right-root order."
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        ch1 = self.chapter_title("Introduction")

        intro_lines = VGroup(
            Text("Postorder Traversal", font_size=38, color=COBALT, weight="BOLD"),
            Text("visits nodes in the order:", font_size=26, color=INK),
            Text("Left  →  Right  →  Root", font_size=30, color=CORAL, weight="BOLD"),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2)

        key_use = VGroup(
            Text("Key use-cases:", font_size=22, color=COBALT, weight="BOLD"),
            Text("• Delete a tree (children before parent)", font_size=20, color=INK),
            Text("• Evaluate expression trees (operands before operator)", font_size=20, color=INK),
            Text("• Compute directory / subtree sizes", font_size=20, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        key_use.next_to(intro_lines, DOWN, buff=0.6)

        self.play(FadeIn(key_use, shift=DOWN * 0.2))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(key_use), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: Build the tree ──────────────────────────────────────────
        ch2 = self.chapter_title("Build the Tree")

        # Tree structure:
        #        1
        #      /   \
        #     2     3
        #    / \   / \
        #   4   5 6   7
        node_positions = {
            1: UP * 2.2,
            2: UP * 0.8 + LEFT * 2.2,
            3: UP * 0.8 + RIGHT * 2.2,
            4: DOWN * 0.6 + LEFT * 3.2,
            5: DOWN * 0.6 + LEFT * 1.2,
            6: DOWN * 0.6 + RIGHT * 1.2,
            7: DOWN * 0.6 + RIGHT * 3.2,
        }
        edges = [(1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (3, 7)]

        node_circles = {}
        node_labels = {}

        for nid, pos in node_positions.items():
            circle = Circle(
                radius=0.36,
                color=COBALT,
                fill_color=C_DEFAULT,
                fill_opacity=1,
                stroke_width=2.5,
            ).move_to(pos)
            label = Text(str(nid), font_size=22, color=PAPER, weight="BOLD").move_to(pos)
            node_circles[nid] = circle
            node_labels[nid] = label

        edge_lines = {}
        for parent, child in edges:
            line = Line(
                node_positions[parent],
                node_positions[child],
                color=INK,
                stroke_width=2,
            ).set_z_index(-1)
            edge_lines[(parent, child)] = line

        edge_group = VGroup(*edge_lines.values())
        self.play(Create(edge_group, run_time=0.7))
        for nid in node_positions:
            self.play(
                Create(node_circles[nid]),
                FadeIn(node_labels[nid]),
                run_time=0.25,
            )

        caption_tree = Text(
            "A complete binary tree with 7 nodes (values 1–7)",
            font_size=20, color=GRAY,
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(caption_tree))
        self.wait(2)
        self.play(FadeOut(caption_tree), FadeOut(ch2))
        self.wait(0.2)

        # ── Stage 3: Postorder Rule Explained ───────────────────────────────
        ch3 = self.chapter_title("The Postorder Rule")

        rule_box = VGroup(
            Text("Postorder  =  Left → Right → Root", font_size=26, color=COBALT, weight="BOLD"),
            Text("1. Recurse into left subtree", font_size=21, color=INK),
            Text("2. Recurse into right subtree", font_size=21, color=INK),
            Text("3. Visit (process) the current node", font_size=21, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        rule_box.to_edge(RIGHT, buff=0.6).shift(DOWN * 0.3)

        rule_bg = SurroundingRectangle(
            rule_box, color=COBALT, fill_color=MIST,
            fill_opacity=0.85, buff=0.25, corner_radius=0.12,
        )
        self.play(FadeIn(rule_bg), FadeIn(rule_box))
        self.wait(2.5)
        self.play(FadeOut(rule_bg), FadeOut(rule_box), FadeOut(ch3))
        self.wait(0.2)

        # ── Stage 4: Step-by-step traversal animation ────────────────────────
        ch4 = self.chapter_title("Traversal Animation")

        # Result display at bottom
        result_label = Text("Result:", font_size=22, color=COBALT, weight="BOLD")
        result_label.to_edge(DOWN, buff=1.5).to_edge(LEFT, buff=0.8)
        self.play(Write(result_label))

        result_cells_group = VGroup()
        result_values_so_far = []

        def make_cell(val):
            box = RoundedRectangle(
                width=0.52, height=0.52, corner_radius=0.08,
                color=COBALT, fill_color=SIGNAL, fill_opacity=1, stroke_width=2,
            )
            txt = Text(str(val), font_size=18, color=INK, weight="BOLD").move_to(box)
            return VGroup(box, txt)

        def visit_node(nid, *, is_exploring=False):
            """Highlight node as exploring (mist) or visited (signal)."""
            color = MIST if is_exploring else SIGNAL
            self.play(
                node_circles[nid].animate.set_fill(color=color),
                run_time=0.35,
            )

        def add_to_result(val):
            nonlocal result_cells_group
            result_values_so_far.append(val)
            new_cell = make_cell(val)
            if len(result_values_so_far) == 1:
                new_cell.next_to(result_label, RIGHT, buff=0.35)
            else:
                new_cell.next_to(result_cells_group[-1], RIGHT, buff=0.12)
            self.play(FadeIn(new_cell, scale=0.7), run_time=0.3)
            result_cells_group.add(new_cell)

        # Postorder traversal: 4, 5, 2, 6, 7, 3, 1
        # Animate step by step with explanatory captions
        traversal_steps = [
            (4, "Reached leaf node 4 (left child of 2) — visit it", True),
            (5, "Reached leaf node 5 (right child of 2) — visit it", True),
            (2, "Both children of 2 visited — now visit node 2", True),
            (6, "Reached leaf node 6 (left child of 3) — visit it", True),
            (7, "Reached leaf node 7 (right child of 3) — visit it", True),
            (3, "Both children of 3 visited — now visit node 3", True),
            (1, "Both subtrees done — visit root node 1 last", True),
        ]

        # First, mark the root and internal nodes as "exploring"
        visit_node(1, is_exploring=True)
        self.wait(0.3)
        visit_node(2, is_exploring=True)
        self.wait(0.3)

        for nid, desc, _ in traversal_steps:
            cap = Text(desc, font_size=19, color=GRAY).to_edge(DOWN, buff=0.4)
            self.play(FadeIn(cap))
            # Show exploring state for non-leaf nodes before visiting
            if nid in (3,):
                visit_node(nid, is_exploring=True)
                self.wait(0.2)
                visit_node(6, is_exploring=True)
                self.wait(0.2)
            # Mark as visited (signal color)
            visit_node(nid)
            add_to_result(nid)
            self.wait(0.7)
            self.play(FadeOut(cap))

        self.wait(1.5)
        self.play(FadeOut(result_label), FadeOut(result_cells_group), FadeOut(ch4))
        self.wait(0.2)

        # ── Stage 5: Recursive Call Stack Visualization ──────────────────────
        ch5 = self.chapter_title("Recursive Call Stack")

        # Reset tree colors
        reset_anims = [
            node_circles[nid].animate.set_fill(color=C_DEFAULT)
            for nid in node_positions
        ]
        self.play(AnimationGroup(*reset_anims, run_time=0.5))
        self.wait(0.3)

        stack_label = Text("Call Stack (top = active frame):", font_size=20, color=COBALT, weight="BOLD")
        stack_label.to_edge(RIGHT, buff=0.5).shift(UP * 2.5)
        self.play(FadeIn(stack_label))

        call_frames = []

        def push_frame(label_str):
            frame_box = RoundedRectangle(
                width=2.8, height=0.45, corner_radius=0.07,
                color=COBALT, fill_color=MIST, fill_opacity=1, stroke_width=1.8,
            )
            frame_txt = Text(label_str, font_size=17, color=INK).move_to(frame_box)
            frame = VGroup(frame_box, frame_txt)
            if call_frames:
                frame.next_to(call_frames[-1], UP, buff=0.1)
            else:
                frame.next_to(stack_label, DOWN, buff=0.3)
            self.play(FadeIn(frame, shift=UP * 0.15), run_time=0.3)
            call_frames.append(frame)

        def pop_frame():
            if call_frames:
                frame = call_frames.pop()
                self.play(FadeOut(frame, shift=UP * 0.15), run_time=0.3)

        # Simulate call stack for postorder(1)
        stack_steps = [
            ("push", "postorder(1)"),
            ("push", "postorder(2)"),
            ("push", "postorder(4)"),
            ("pop", None),        # return from postorder(4), visit 4
            ("push", "postorder(5)"),
            ("pop", None),        # return from postorder(5), visit 5
            ("pop", None),        # return from postorder(2), visit 2
            ("push", "postorder(3)"),
            ("push", "postorder(6)"),
            ("pop", None),        # return from postorder(6), visit 6
            ("push", "postorder(7)"),
            ("pop", None),        # return from postorder(7), visit 7
            ("pop", None),        # return from postorder(3), visit 3
            ("pop", None),        # return from postorder(1), visit 1
        ]
        visit_order_stack = [4, 5, 2, 6, 7, 3, 1]
        visit_idx = 0

        for action, label in stack_steps:
            if action == "push":
                push_frame(label)
                self.wait(0.4)
            else:
                pop_frame()
                # Highlight visited node
                if visit_idx < len(visit_order_stack):
                    nid = visit_order_stack[visit_idx]
                    visit_node(nid)
                    visit_idx += 1
                self.wait(0.4)

        self.wait(1.5)
        # Clean up stack display
        for frame in list(call_frames):
            self.play(FadeOut(frame), run_time=0.2)
        call_frames.clear()
        self.play(FadeOut(stack_label), FadeOut(ch5))
        self.wait(0.2)

        # ── Stage 6: Final Result & Complexity Card ──────────────────────────
        ch6 = self.chapter_title("Result & Complexity")

        # Fade out tree
        all_tree = VGroup(
            edge_group,
            *node_circles.values(),
            *node_labels.values(),
        )
        self.play(FadeOut(all_tree))
        self.wait(0.3)

        final_title = Text(
            "Postorder Result: [4, 5, 2, 6, 7, 3, 1]",
            font_size=28, color=COBALT, weight="BOLD",
        ).move_to(UP * 1.5)
        self.play(FadeIn(final_title))
        self.wait(1.5)

        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(h)",
        )
        self.wait(0.5)

        space_note = Text(
            "h = tree height  (O(log n) balanced, O(n) skewed)",
            font_size=19, color=GRAY,
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(space_note))
        self.wait(2.5)
        self.play(FadeOut(space_note), FadeOut(final_title), FadeOut(ch6))
        self.wait(0.3)
