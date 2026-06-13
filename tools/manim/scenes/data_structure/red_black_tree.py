from manim import *
from ...base import AlgoScene, TreeVis


class RedBlackTree(AlgoScene):
    TITLE = "Red-Black Tree"
    SUBTITLE = "Self-balancing BST guaranteeing O(log n) worst-case for all operations."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Introduction: Red-Black Tree")

        intro_text = VGroup(
            Text("A Red-Black Tree is a self-balancing BST", font_size=28),
            Text("where each node carries an extra color bit.", font_size=28),
            Text("Five invariants keep the tree balanced:", font_size=28),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.5)

        rules = VGroup(
            Text("1. Every node is RED or BLACK", font_size=22, color=YELLOW),
            Text("2. The root is always BLACK", font_size=22, color=YELLOW),
            Text("3. Every NIL leaf is BLACK", font_size=22, color=YELLOW),
            Text("4. RED node → both children are BLACK", font_size=22, color=YELLOW),
            Text("5. All paths root→leaf have equal BLACK-height", font_size=22, color=YELLOW),
        ).arrange(DOWN, buff=0.2).next_to(intro_text, DOWN, buff=0.4)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(1)
        self.play(LaggedStart(*[FadeIn(r, shift=RIGHT * 0.2) for r in rules], lag_ratio=0.15))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(rules))

        # ── Stage 2: Build the initial tree structure ────────────────────────
        self.chapter_title("Building a Red-Black Tree")

        node_radius = 0.35
        positions = {
            13: UP * 2.2,
            8:  UP * 0.9 + LEFT * 2.2,
            17: UP * 0.9 + RIGHT * 2.2,
            1:  DOWN * 0.4 + LEFT * 3.3,
            11: DOWN * 0.4 + LEFT * 1.1,
            15: DOWN * 0.4 + RIGHT * 1.1,
            25: DOWN * 0.4 + RIGHT * 3.3,
            6:  DOWN * 1.7 + LEFT * 3.9,
        }
        node_colors = {
            13: BLACK,
            8:  RED,
            17: RED,
            1:  BLACK,
            11: BLACK,
            15: BLACK,
            25: BLACK,
            6:  RED,
        }
        edges = [
            (13, 8), (13, 17),
            (8, 1),  (8, 11),
            (17, 15),(17, 25),
            (1, 6),
        ]

        node_mobs = {}
        for val, pos in positions.items():
            circle = Circle(radius=node_radius, fill_opacity=1,
                            fill_color=node_colors[val],
                            stroke_color=WHITE, stroke_width=2)
            label  = Text(str(val), font_size=20, color=WHITE).move_to(circle)
            node   = VGroup(circle, label).move_to(pos)
            node_mobs[val] = node

        edge_mobs = []
        for (u, v) in edges:
            line = Line(
                positions[u], positions[v],
                stroke_color=GRAY, stroke_width=2,
                buff=node_radius,
            )
            edge_mobs.append(line)

        self.play(LaggedStart(*[Create(e) for e in edge_mobs], lag_ratio=0.08))
        self.play(LaggedStart(*[FadeIn(n, scale=0.6) for n in node_mobs.values()], lag_ratio=0.1))
        self.wait(1.5)

        # Annotate root
        root_arrow = Arrow(UP * 3.2, positions[13] + UP * node_radius,
                           color=YELLOW, buff=0.05, stroke_width=3)
        root_label = Text("root (BLACK)", font_size=20, color=YELLOW).next_to(root_arrow, UP, buff=0.05)
        self.play(GrowArrow(root_arrow), FadeIn(root_label))
        self.wait(1)
        self.play(FadeOut(root_arrow), FadeOut(root_label))

        # ── Stage 3: Search walkthrough ──────────────────────────────────────
        self.chapter_title("Search: Finding Value 15")

        search_val = 15
        search_path = [13, 17, 15]
        highlight_color = PURE_GREEN

        step_label = Text("", font_size=22).to_edge(DOWN, buff=0.5)
        self.add(step_label)

        prev_highlight = None
        for idx, val in enumerate(search_path):
            node  = node_mobs[val]
            circ  = node[0]
            new_label = Text(
                f"Compare {search_val} {'<' if search_val < val else ('>' if search_val > val else '=')} {val}"
                + (" → go left" if search_val < val else (" → go right" if search_val > val else " → FOUND!")),
                font_size=22, color=highlight_color,
            ).to_edge(DOWN, buff=0.5)

            self.play(
                circ.animate.set_stroke(color=highlight_color, width=5),
                Transform(step_label, new_label),
            )
            self.wait(1)
            if prev_highlight is not None:
                self.play(prev_highlight[0].animate.set_stroke(color=WHITE, width=2))
            prev_highlight = node

        self.wait(1)
        self.play(
            node_mobs[15][0].animate.set_stroke(color=WHITE, width=2),
            FadeOut(step_label),
        )

        # ── Stage 4: Insertion & Recoloring ──────────────────────────────────
        self.chapter_title("Insertion: Insert 10 (Recolor Case)")

        insert_val = 10
        insert_pos  = DOWN * 1.7 + LEFT * 0.5
        new_circle  = Circle(radius=node_radius, fill_opacity=1,
                             fill_color=RED, stroke_color=WHITE, stroke_width=2)
        new_label_t = Text(str(insert_val), font_size=20, color=WHITE).move_to(new_circle)
        new_node    = VGroup(new_circle, new_label_t).move_to(insert_pos)

        insert_edge = Line(positions[11], insert_pos,
                           stroke_color=GRAY, stroke_width=2, buff=node_radius)

        insert_info = VGroup(
            Text("New node inserted as RED (rule 4 may be violated)", font_size=20, color=YELLOW),
            Text("Uncle is RED → Recolor: parent & uncle BLACK, grandparent RED", font_size=20, color=ORANGE),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN, buff=0.6)

        self.play(Create(insert_edge), FadeIn(new_node, scale=0.5))
        self.wait(0.5)
        self.play(FadeIn(insert_info[0], shift=UP * 0.2))
        self.wait(1)
        self.play(FadeIn(insert_info[1], shift=UP * 0.2))
        self.wait(1)

        # Recolor node 8 (parent) to BLACK is already BLACK; show uncle 11 → BLACK
        self.play(
            node_mobs[11][0].animate.set_fill(color=BLACK),
            Flash(node_mobs[8], color=ORANGE, line_length=0.2),
        )
        self.wait(1)
        self.play(FadeOut(insert_info), FadeOut(new_node), FadeOut(insert_edge))

        # ── Stage 5: Rotation demonstration ──────────────────────────────────
        self.chapter_title("Rotation: Left-Rotate on Node 8")

        rotation_desc = VGroup(
            Text("Left Rotation pivots a node down-left,", font_size=24, color=BLUE),
            Text("its right child takes its place.", font_size=24, color=BLUE),
        ).arrange(DOWN, buff=0.2).to_edge(DOWN, buff=0.6)

        self.play(FadeIn(rotation_desc))
        self.wait(0.8)

        # Animate node 8 shifting slightly to indicate rotation concept
        self.play(
            node_mobs[8].animate.shift(DOWN * 0.25 + LEFT * 0.25),
            node_mobs[11].animate.shift(UP * 0.25 + LEFT * 0.25),
            run_time=1.2,
        )
        self.wait(0.5)
        self.play(
            node_mobs[8].animate.shift(UP * 0.25 + RIGHT * 0.25),
            node_mobs[11].animate.shift(DOWN * 0.25 + RIGHT * 0.25),
            run_time=1.2,
        )
        self.wait(1)

        rotation_note = Text("Rotations run in O(1) — only pointers change", font_size=22, color=GREEN)
        rotation_note.next_to(rotation_desc, UP, buff=0.2)
        self.play(FadeIn(rotation_note))
        self.wait(1.5)
        self.play(FadeOut(rotation_desc), FadeOut(rotation_note))

        # ── Stage 6: Black-height visualization ──────────────────────────────
        self.chapter_title("Black-Height Guarantee")

        bh_label = Text("Black-height of root = 2  (paths shown below)", font_size=24, color=WHITE)
        bh_label.to_edge(UP, buff=0.8)
        self.play(FadeIn(bh_label))

        path_colors = [PURE_GREEN, BLUE, ORANGE, PINK]
        sample_paths = [
            [13, 8, 1],
            [13, 8, 11],
            [13, 17, 15],
            [13, 17, 25],
        ]
        for color, path in zip(path_colors, sample_paths):
            arcs = []
            for i in range(len(path) - 1):
                u, v = path[i], path[i + 1]
                arc = Line(positions[u], positions[v],
                           stroke_color=color, stroke_width=4, buff=node_radius)
                arcs.append(arc)
            self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.3), run_time=0.8)
            self.wait(0.4)
            self.play(*[FadeOut(a) for a in arcs])

        self.wait(1)
        self.play(FadeOut(bh_label))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Time & Space Complexity")
        self.wait(0.5)

        all_tree = VGroup(*edge_mobs, *node_mobs.values())
        self.play(all_tree.animate.scale(0.5).to_edge(LEFT, buff=0.5))
        self.wait(0.5)

        self.complexity_card(
            time_complexities={
                "Search (best)":  "O(log n)",
                "Search (worst)": "O(log n)",
                "Insert":         "O(log n)",
                "Delete":         "O(log n)",
            },
            space_complexity="O(n)",
        )
        self.wait(2)
