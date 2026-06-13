from manim import (
    BLACK, DOWN, LEFT, RIGHT, UP,
    Circle, Create, FadeIn, FadeOut, FadeTransform,
    Line, MathTex, Rectangle, Square, Text, VGroup,
    Write, Arrow, Indicate, SurroundingRectangle,
    AnimationGroup, Transform,
    YELLOW, GREEN, BLUE, RED, ORANGE, PURPLE, WHITE, GRAY,
)
from ...base import AlgoScene, TreeVis
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)
from ...base.tree_vis import TreeNode, from_list


class TreeSerialize(AlgoScene):
    TITLE = "Serialize / Deserialize Tree"
    SUBTITLE = "Encode a binary tree to a string and decode it back using BFS level-order encodi"
    CATEGORY = "tree"

    def build(self):
        # ── Stage 1: Introduction ─────────────────────────────────────────────
        chapter_label = self.chapter_title("Introduction")

        intro_lines = VGroup(
            Text("Serialization", font_size=38, color=COBALT, weight="BOLD"),
            Text("converts a binary tree to a string", font_size=26, color=INK),
            Text("Deserialization", font_size=38, color=CORAL, weight="BOLD"),
            Text("reconstructs the tree from that string", font_size=26, color=INK),
        ).arrange(DOWN, buff=0.28).move_to(UP * 0.5)

        self.play(FadeIn(intro_lines, shift=UP * 0.2))
        self.wait(2)

        problem_text = VGroup(
            Text("Why do we need this?", font_size=28, color=SIGNAL, weight="BOLD"),
            Text("• Store a tree in a file or database", font_size=22, color=INK),
            Text("• Send a tree over a network", font_size=22, color=INK),
            Text("• Reconstruct the exact same tree later", font_size=22, color=INK),
        ).arrange(DOWN, buff=0.22, aligned_edge=LEFT).move_to(DOWN * 1.2)

        self.play(FadeIn(problem_text, shift=UP * 0.15))
        self.wait(2.5)
        self.play(FadeOut(intro_lines), FadeOut(problem_text), FadeOut(chapter_label))

        # ── Stage 2: Build the Example Tree ──────────────────────────────────
        chapter_label = self.chapter_title("Example Tree")

        # Tree: [1, 2, 3, 4, 5, None, 6]
        #         1
        #        / \
        #       2   3
        #      / \    \
        #     4   5    6
        node_positions = {
            "1":  UP * 2.2,
            "2":  UP * 0.9 + LEFT * 2.2,
            "3":  UP * 0.9 + RIGHT * 2.2,
            "4":  DOWN * 0.4 + LEFT * 3.2,
            "5":  DOWN * 0.4 + LEFT * 1.2,
            "6":  DOWN * 0.4 + RIGHT * 3.2,
        }
        edges = [("1", "2"), ("1", "3"), ("2", "4"), ("2", "5"), ("3", "6")]

        node_circles = {}
        node_labels = {}
        for nid, pos in node_positions.items():
            circle = Circle(radius=0.38, color=COBALT, fill_color=C_DEFAULT, fill_opacity=1, stroke_width=2.5)
            circle.move_to(pos)
            label = Text(nid, font_size=22, color=INK, weight="BOLD").move_to(pos)
            node_circles[nid] = circle
            node_labels[nid] = label

        edge_lines = {}
        for parent, child in edges:
            line = Line(node_positions[parent], node_positions[child], color=INK, stroke_width=2)
            line.set_z_index(-1)
            edge_lines[(parent, child)] = line

        edge_group = VGroup(*edge_lines.values())
        node_group = VGroup(*node_circles.values())
        label_group = VGroup(*node_labels.values())

        self.play(Create(edge_group, run_time=0.7))
        self.play(Create(node_group, run_time=0.6), FadeIn(label_group, run_time=0.5))
        self.wait(1.5)

        null_note = Text("Null children are marked as '#'", font_size=20, color=GRAY)
        null_note.to_edge(DOWN, buff=0.6)
        self.play(FadeIn(null_note))
        self.wait(1.5)
        self.play(FadeOut(null_note), FadeOut(chapter_label))

        # ── Stage 3: BFS Serialization ────────────────────────────────────────
        chapter_label = self.chapter_title("BFS Serialization")

        queue_label = Text("Queue:", font_size=20, color=COBALT, weight="BOLD")
        queue_label.to_edge(DOWN, buff=2.5).to_edge(LEFT, buff=0.8)
        output_label = Text("Output:", font_size=20, color=CORAL, weight="BOLD")
        output_label.next_to(queue_label, DOWN, buff=0.5).align_to(queue_label, LEFT)

        self.play(Write(queue_label), Write(output_label))

        def make_cell(val, color=COBALT):
            box = Square(side_length=0.44, color=color, fill_opacity=0.15, stroke_width=1.5)
            txt = Text(str(val), font_size=17, color=color)
            txt.move_to(box.get_center())
            return VGroup(box, txt)

        # BFS steps: (visiting_node, queue_after, output_so_far)
        bfs_steps = [
            ("1",  ["2", "3"],                    ["1"]),
            ("2",  ["3", "4", "5"],               ["1", "2"]),
            ("3",  ["4", "5", "#", "6"],          ["1", "2", "3"]),
            ("4",  ["5", "#", "6", "#", "#"],     ["1", "2", "3", "4"]),
            ("5",  ["#", "6", "#", "#", "#", "#"],["1", "2", "3", "4", "5"]),
            ("#",  ["6", "#", "#", "#", "#"],     ["1", "2", "3", "4", "5", "#"]),
            ("6",  ["#", "#", "#", "#"],          ["1", "2", "3", "4", "5", "#", "6"]),
        ]

        current_queue_mob = VGroup()
        current_output_mob = VGroup()

        for visiting, queue_state, output_state in bfs_steps:
            # Highlight visiting node (skip null)
            if visiting != "#" and visiting in node_circles:
                self.play(
                    node_circles[visiting].animate.set_fill(C_ACTIVE, opacity=0.85),
                    run_time=0.35,
                )

            # Update queue display
            self.play(FadeOut(current_queue_mob), run_time=0.15)
            new_queue = VGroup(*[make_cell(v, COBALT) for v in queue_state[:6]])
            new_queue.arrange(RIGHT, buff=0.08)
            new_queue.next_to(queue_label, RIGHT, buff=0.3).align_to(queue_label, DOWN + UP)
            current_queue_mob = new_queue

            # Update output display
            self.play(FadeOut(current_output_mob), run_time=0.15)
            new_output = VGroup(*[make_cell(v, CORAL) for v in output_state])
            new_output.arrange(RIGHT, buff=0.08)
            new_output.next_to(output_label, RIGHT, buff=0.3).align_to(output_label, DOWN + UP)
            current_output_mob = new_output

            self.play(FadeIn(current_queue_mob), FadeIn(current_output_mob), run_time=0.3)
            self.wait(0.6)

            if visiting != "#" and visiting in node_circles:
                self.play(
                    node_circles[visiting].animate.set_fill(C_SORTED, opacity=0.85),
                    run_time=0.3,
                )

        self.wait(1.5)

        # Show final serialized string
        serial_str = Text(
            'Serialized: "1,2,3,4,5,#,6,#,#,#,#,#,6"',
            font_size=20, color=INK,
        ).to_edge(DOWN, buff=0.25)
        self.play(FadeIn(serial_str))
        self.wait(2)
        self.play(
            FadeOut(current_queue_mob), FadeOut(current_output_mob),
            FadeOut(queue_label), FadeOut(output_label),
            FadeOut(serial_str), FadeOut(chapter_label),
        )

        # ── Stage 4: String Representation ───────────────────────────────────
        chapter_label = self.chapter_title("Encoded String")

        # Reset node colors
        reset_anims = [c.animate.set_fill(C_DEFAULT, opacity=1) for c in node_circles.values()]
        self.play(AnimationGroup(*reset_anims, run_time=0.4))

        tokens = ["1", "2", "3", "4", "5", "#", "6", "#", "#", "#", "#"]
        token_cells = VGroup()
        for tok in tokens:
            color = CORAL if tok == "#" else COBALT
            cell = make_cell(tok, color)
            token_cells.add(cell)
        token_cells.arrange(RIGHT, buff=0.1)
        token_cells.move_to(DOWN * 2.8)

        string_label = Text("BFS Token Array:", font_size=22, color=INK, weight="BOLD")
        string_label.next_to(token_cells, UP, buff=0.35)

        self.play(FadeIn(string_label), FadeIn(token_cells))
        self.wait(1)

        # Annotate null markers
        null_brace = SurroundingRectangle(
            VGroup(*[token_cells[i] for i in [5, 7, 8, 9, 10]]),
            color=CORAL, buff=0.06,
        )
        null_annot = Text("Null markers preserve structure", font_size=18, color=CORAL)
        null_annot.next_to(null_brace, DOWN, buff=0.2)
        self.play(Create(null_brace), FadeIn(null_annot))
        self.wait(2)
        self.play(FadeOut(null_brace), FadeOut(null_annot))
        self.wait(1)
        self.play(FadeOut(string_label), FadeOut(token_cells), FadeOut(chapter_label))

        # ── Stage 5: Deserialization ──────────────────────────────────────────
        chapter_label = self.chapter_title("BFS Deserialization")

        # Reset tree colors
        reset_anims = [c.animate.set_fill(C_DEFAULT, opacity=1) for c in node_circles.values()]
        self.play(AnimationGroup(*reset_anims, run_time=0.3))

        decode_caption = Text(
            "Read tokens left to right; assign children to queued parents",
            font_size=20, color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(decode_caption))

        decode_steps = [
            ("Token: 1 → root node", "1", None),
            ("Token: 2 → left child of 1", "2", "1"),
            ("Token: 3 → right child of 1", "3", "1"),
            ("Token: 4 → left child of 2", "4", "2"),
            ("Token: 5 → right child of 2", "5", "2"),
            ("Token: # → left child of 3 is null", None, "3"),
            ("Token: 6 → right child of 3", "6", "3"),
        ]

        step_label = Text("", font_size=20, color=INK).to_edge(DOWN, buff=1.3)
        self.play(FadeIn(step_label))

        for desc, node_id, parent_id in decode_steps:
            new_step = Text(desc, font_size=20, color=INK)
            new_step.to_edge(DOWN, buff=1.3)
            self.play(FadeTransform(step_label, new_step), run_time=0.4)
            step_label = new_step

            if node_id and node_id in node_circles:
                self.play(
                    node_circles[node_id].animate.set_fill(SIGNAL, opacity=0.85),
                    run_time=0.4,
                )
            if parent_id and parent_id in node_circles:
                self.play(
                    Indicate(node_circles[parent_id], color=COBALT, scale_factor=1.2),
                )
            self.wait(0.8)

        self.wait(1.5)
        self.play(FadeOut(decode_caption), FadeOut(step_label), FadeOut(chapter_label))

        # ── Stage 6: Code Sketch ──────────────────────────────────────────────
        chapter_label = self.chapter_title("Algorithm Sketch")

        # Reset colors
        reset_anims = [c.animate.set_fill(C_DEFAULT, opacity=1) for c in node_circles.values()]
        self.play(AnimationGroup(*reset_anims, run_time=0.3))

        code_lines = [
            "def serialize(root):",
            "    queue = deque([root])",
            "    tokens = []",
            "    while queue:",
            "        node = queue.popleft()",
            "        if node is None:",
            "            tokens.append('#')",
            "        else:",
            "            tokens.append(str(node.val))",
            "            queue.extend([node.left, node.right])",
            "    return ','.join(tokens)",
        ]

        code_group = VGroup()
        for i, line in enumerate(code_lines):
            indent = line.count("    ") * 0.3
            t = Text(line.strip(), font_size=16, color=INK, font="Courier New")
            t.to_edge(RIGHT, buff=0.5).shift(DOWN * (i * 0.38 - 1.8) + LEFT * indent)
            code_group.add(t)

        bg = Rectangle(
            width=5.5, height=4.8,
            color=MIST, fill_color=MIST, fill_opacity=1,
            stroke_color=COBALT, stroke_width=1.5,
        ).to_edge(RIGHT, buff=0.3).shift(DOWN * 0.2)

        self.play(FadeIn(bg))
        for line_mob in code_group:
            self.play(FadeIn(line_mob, run_time=0.12))
        self.wait(2)

        # Highlight key lines
        highlight_rect = SurroundingRectangle(code_group[5], color=CORAL, buff=0.05)
        highlight_note = Text("Null check → emit '#'", font_size=17, color=CORAL)
        highlight_note.next_to(highlight_rect, LEFT, buff=0.2)
        self.play(Create(highlight_rect), FadeIn(highlight_note))
        self.wait(1.5)
        self.play(FadeOut(highlight_rect), FadeOut(highlight_note))

        highlight_rect2 = SurroundingRectangle(code_group[9], color=SIGNAL, buff=0.05)
        highlight_note2 = Text("Enqueue children", font_size=17, color=SIGNAL)
        highlight_note2.next_to(highlight_rect2, LEFT, buff=0.2)
        self.play(Create(highlight_rect2), FadeIn(highlight_note2))
        self.wait(1.5)
        self.play(FadeOut(highlight_rect2), FadeOut(highlight_note2))

        self.play(FadeOut(bg), FadeOut(code_group), FadeOut(chapter_label))

        # Fade out the tree too
        self.play(
            FadeOut(edge_group),
            FadeOut(node_group),
            FadeOut(label_group),
        )

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_best="O(n)",
            time_avg="O(n)",
            time_worst="O(n)",
            space="O(n)",
        )
        self.wait(2.5)
