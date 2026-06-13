from manim import *
from ...base import AlgoScene, TreeVis


class AvlTree(AlgoScene):
    TITLE = "AVL Tree"
    SUBTITLE = "Self-balancing BST guaranteeing O(log n) operations."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is an AVL Tree?")

        intro_lines = VGroup(
            Text("A self-balancing Binary Search Tree", font_size=28),
            Text("Named after Adelson-Velsky and Landis (1962)", font_size=24, color=YELLOW),
            Text("Maintains height balance at every node", font_size=24),
            Text("Balance Factor = height(left) − height(right)", font_size=24, color=BLUE),
            Text("Balance Factor must be −1, 0, or +1", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in intro_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.3), run_time=0.6)
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Balance Factor Visualization ───────────────────────
        self.chapter_title("Balance Factor")

        bf_title = Text("Balance Factor = height(L) − height(R)", font_size=26, color=YELLOW).to_edge(UP, buff=1.2)
        self.play(Write(bf_title))

        # Draw a simple tree to show balance factors
        node_configs = [
            {"label": "10", "pos": UP * 1.5},
            {"label": "5",  "pos": UP * 0.5 + LEFT * 2},
            {"label": "15", "pos": UP * 0.5 + RIGHT * 2},
            {"label": "3",  "pos": DOWN * 0.5 + LEFT * 3},
            {"label": "7",  "pos": DOWN * 0.5 + LEFT * 1},
        ]

        nodes = {}
        circles = {}
        for cfg in node_configs:
            circle = Circle(radius=0.35, color=BLUE, fill_opacity=0.3)
            label = Text(cfg["label"], font_size=22).move_to(circle)
            node = VGroup(circle, label).move_to(cfg["pos"])
            nodes[cfg["label"]] = node
            circles[cfg["label"]] = circle

        edges = [
            ("10", "5"),
            ("10", "15"),
            ("5", "3"),
            ("5", "7"),
        ]

        edge_lines = []
        for parent, child in edges:
            line = Line(
                nodes[parent].get_center(),
                nodes[child].get_center(),
                color=WHITE,
            )
            edge_lines.append(line)

        tree_group = VGroup(*edge_lines, *[nodes[k] for k in nodes])
        self.play(FadeIn(tree_group))
        self.wait(1)

        # Show balance factors
        bf_labels = {
            "10": ("BF=0", GREEN),
            "5":  ("BF=0", GREEN),
            "15": ("BF=0", GREEN),
            "3":  ("BF=0", GREEN),
            "7":  ("BF=0", GREEN),
        }
        bf_mobjects = {}
        for key, (text, color) in bf_labels.items():
            bf = Text(text, font_size=16, color=color).next_to(nodes[key], RIGHT, buff=0.1)
            bf_mobjects[key] = bf
            self.play(FadeIn(bf), run_time=0.4)
        self.wait(1)

        self.play(FadeOut(tree_group), FadeOut(bf_title), FadeOut(VGroup(*bf_mobjects.values())))

        # ── Stage 3: Inserting and Imbalance ────────────────────────────
        self.chapter_title("Insertion & Imbalance Detection")

        insert_steps = VGroup(
            Text("Insert like a standard BST", font_size=26),
            Text("After insertion, update heights going up", font_size=26),
            Text("Check balance factor at each ancestor", font_size=26),
            Text("If |BF| > 1 → rebalance with rotations", font_size=26, color=RED),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        for step in insert_steps:
            self.play(FadeIn(step, shift=DOWN * 0.2), run_time=0.6)
            self.wait(0.5)
        self.wait(1.5)
        self.play(FadeOut(insert_steps))

        # ── Stage 4: Rotations ──────────────────────────────────────────
        self.chapter_title("Rotations: Restoring Balance")

        rotation_types = VGroup(
            Text("LL Case → Right Rotation", font_size=26, color=YELLOW),
            Text("RR Case → Left Rotation", font_size=26, color=BLUE),
            Text("LR Case → Left-Right Rotation", font_size=26, color=GREEN),
            Text("RL Case → Right-Left Rotation", font_size=26, color=ORANGE),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(rotation_types))
        self.wait(2)
        self.play(FadeOut(rotation_types))

        # Visualize Right Rotation (LL Case)
        rot_title = Text("Right Rotation (LL Case)", font_size=28, color=YELLOW).to_edge(UP, buff=1.2)
        self.play(Write(rot_title))

        # Before rotation
        before_label = Text("Before:", font_size=22, color=GREY_A).move_to(LEFT * 4 + UP * 1.5)
        nodeC = VGroup(Circle(radius=0.35, color=RED, fill_opacity=0.4), Text("C", font_size=22)).move_to(LEFT * 4 + UP * 0.5)
        nodeB = VGroup(Circle(radius=0.35, color=ORANGE, fill_opacity=0.4), Text("B", font_size=22)).move_to(LEFT * 5 + DOWN * 0.5)
        nodeA = VGroup(Circle(radius=0.35, color=YELLOW, fill_opacity=0.4), Text("A", font_size=22)).move_to(LEFT * 6 + DOWN * 1.5)
        bf_c = Text("BF=2", font_size=14, color=RED).next_to(nodeC, RIGHT, buff=0.1)
        before_tree = VGroup(
            Line(nodeC.get_center(), nodeB.get_center(), color=WHITE),
            Line(nodeB.get_center(), nodeA.get_center(), color=WHITE),
            nodeC, nodeB, nodeA, bf_c, before_label,
        )
        self.play(FadeIn(before_tree))
        self.wait(1)

        # Arrow showing rotation
        arrow = Arrow(LEFT * 2.5, LEFT * 1.5, color=WHITE, buff=0.1)
        rot_label = Text("rotate right", font_size=18, color=WHITE).next_to(arrow, UP, buff=0.1)
        self.play(GrowArrow(arrow), Write(rot_label))

        # After rotation
        after_label = Text("After:", font_size=22, color=GREY_A).move_to(RIGHT * 1 + UP * 1.5)
        nodeB2 = VGroup(Circle(radius=0.35, color=ORANGE, fill_opacity=0.4), Text("B", font_size=22)).move_to(RIGHT * 1 + UP * 0.5)
        nodeA2 = VGroup(Circle(radius=0.35, color=YELLOW, fill_opacity=0.4), Text("A", font_size=22)).move_to(RIGHT * 0 + DOWN * 0.5)
        nodeC2 = VGroup(Circle(radius=0.35, color=RED, fill_opacity=0.4), Text("C", font_size=22)).move_to(RIGHT * 2 + DOWN * 0.5)
        bf_b2 = Text("BF=0", font_size=14, color=GREEN).next_to(nodeB2, RIGHT, buff=0.1)
        after_tree = VGroup(
            Line(nodeB2.get_center(), nodeA2.get_center(), color=WHITE),
            Line(nodeB2.get_center(), nodeC2.get_center(), color=WHITE),
            nodeB2, nodeA2, nodeC2, bf_b2, after_label,
        )
        self.play(FadeIn(after_tree))
        self.wait(2)
        self.play(FadeOut(before_tree), FadeOut(after_tree), FadeOut(arrow), FadeOut(rot_label), FadeOut(rot_title))

        # ── Stage 5: Step-by-step AVL Insert Example ────────────────────
        self.chapter_title("Step-by-Step: Insert 1, 2, 3")

        steps_data = [
            ("Insert 1", "Root: 1\nBF=0 — balanced", GREEN),
            ("Insert 2", "1\n \\ \n  2\nBF(1)=-1 — ok", GREEN),
            ("Insert 3", "1\n \\ \n  2\n   \\\n    3\nBF(1)=-2 — UNBALANCED!", RED),
            ("Left Rotate at 1", "  2\n /  \\\n1    3\nAll BF=0 — balanced", GREEN),
        ]

        for title_text, desc, color in steps_data:
            step_title = Text(title_text, font_size=28, color=color).to_edge(UP, buff=1.5)
            step_desc = Text(desc, font_size=22, line_spacing=1.2).move_to(ORIGIN)
            self.play(Write(step_title), FadeIn(step_desc))
            self.wait(1.5)
            self.play(FadeOut(step_title), FadeOut(step_desc))

        # ── Stage 6: Complexity Card ─────────────────────────────────────
        self.chapter_title("Time & Space Complexity")
        self.wait(0.5)
        self.complexity_card(
            time_best="O(log n)",
            time_avg="O(log n)",
            time_worst="O(log n)",
            space="O(n)",
        )
        self.wait(3)
