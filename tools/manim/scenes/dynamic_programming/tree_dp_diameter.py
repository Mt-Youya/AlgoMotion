from manim import (
    DOWN, LEFT, RIGHT, UP,
    FadeIn, FadeOut, Write, Create,
    MathTex, Text, VGroup, Rectangle,
    Square, Arrow, Line, LaggedStart,
    Indicate, AnimationGroup, Transform,
    GREEN, GREEN_B, GREEN_C, YELLOW, BLUE, BLUE_D,
    GRAY, WHITE, RED, ORANGE,
)
from ...base import AlgoScene, TreeVis, TreeNode
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, MIST, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class TreeDpDiameter(AlgoScene):
    TITLE = "Tree DP: Diameter"
    SUBTITLE = "Find diameter of a binary tree using tree DP."
    CATEGORY = "dynamic-programming"

    def build(self):
        # ── Stage 1: Problem Introduction ────────────────────────────────────
        ch1 = self.chapter_title("Problem: Tree Diameter")

        problem_lines = VGroup(
            Text("Given a binary tree, find the length of the", font_size=26, color=INK),
            Text("longest path between any two nodes.", font_size=26, color=INK),
            Text("The path may or may not pass through the root.", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.25).shift(UP * 0.5)

        example_note = Text(
            "Diameter = max path length (counted in edges)",
            font_size=22,
            color=COBALT,
            weight="BOLD",
        ).next_to(problem_lines, DOWN, buff=0.5)

        self.play(LaggedStart(
            *[FadeIn(line, shift=RIGHT * 0.15) for line in problem_lines],
            lag_ratio=0.3,
        ))
        self.play(FadeIn(example_note, shift=UP * 0.1))
        self.wait(1.5)
        self.play(FadeOut(problem_lines), FadeOut(example_note), FadeOut(ch1))

        # ── Stage 2: Build the Tree ──────────────────────────────────────────
        ch2 = self.chapter_title("Example Tree")

        # Build tree: [1, 2, 3, 4, 5, None, None, 6, None]
        #         1
        #        / \
        #       2   3
        #      / \
        #     4   5
        #    /
        #   6
        root = TreeNode(1)
        root.left = TreeNode(2)
        root.right = TreeNode(3)
        root.left.left = TreeNode(4)
        root.left.right = TreeNode(5)
        root.left.left.left = TreeNode(6)

        tree = TreeVis(self, root, center=[0, 1.5, 0])
        self.wait(0.8)

        tree_caption = Text(
            "A binary tree with 6 nodes",
            font_size=22,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(tree_caption))
        self.wait(1.2)
        self.play(FadeOut(tree_caption), FadeOut(ch2))

        # ── Stage 3: Key Insight — Height vs Diameter ────────────────────────
        ch3 = self.chapter_title("Key Insight: Height & Diameter")

        insight_lines = VGroup(
            Text("At every node, the diameter passing through it =", font_size=23, color=INK),
            Text("  left_height + right_height", font_size=23, color=COBALT, weight="BOLD"),
            Text("We track the global maximum across all nodes.", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.3).shift(DOWN * 1.8)

        recurrence = MathTex(
            r"\text{height}(v) = 1 + \max(\text{height}(L),\, \text{height}(R))",
            font_size=26,
            color=INK,
        ).shift(DOWN * 0.8)

        diameter_eq = MathTex(
            r"\text{diameter} = \max_v\bigl(\text{h}(L_v) + \text{h}(R_v)\bigr)",
            font_size=26,
            color=COBALT,
        ).next_to(recurrence, DOWN, buff=0.3)

        self.play(Write(recurrence))
        self.wait(0.5)
        self.play(Write(diameter_eq))
        self.wait(0.5)
        self.play(LaggedStart(
            *[FadeIn(line, shift=RIGHT * 0.1) for line in insight_lines],
            lag_ratio=0.25,
        ))
        self.wait(1.5)
        self.play(FadeOut(recurrence), FadeOut(diameter_eq), FadeOut(insight_lines), FadeOut(ch3))

        # ── Stage 4: Post-order DFS — Annotate Heights ───────────────────────
        ch4 = self.chapter_title("Post-order DFS: Compute Heights")

        step_label = Text("", font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_label)

        # We'll do a manual post-order walk and annotate heights on nodes
        # height values: 6->0, 4->1, 5->0, 2->2, 3->0, 1->3
        height_map = {
            id(root.left.left.left): 0,   # 6
            id(root.left.left): 1,         # 4
            id(root.left.right): 0,        # 5
            id(root.left): 2,              # 2
            id(root.right): 0,             # 3
            id(root): 3,                   # 1
        }

        node_order = [
            (root.left.left.left, "Node 6 (leaf): height = 0"),
            (root.left.left,      "Node 4: height = 1 + max(0, -1) = 1"),
            (root.left.right,     "Node 5 (leaf): height = 0"),
            (root.left,           "Node 2: height = 1 + max(1, 0) = 2"),
            (root.right,          "Node 3 (leaf): height = 0"),
            (root,                "Node 1: height = 1 + max(2, 0) = 3"),
        ]

        for node, desc in node_order:
            new_label = Text(desc, font_size=20, color=GRAY).to_edge(DOWN, buff=0.5)
            self.play(Transform(step_label, new_label), run_time=0.35)
            tree.highlight(node, C_ACTIVE, run_time=0.4)
            self.wait(0.5)
            tree.highlight(node, C_SORTED, run_time=0.35)
            self.wait(0.4)

        self.wait(0.8)
        self.play(FadeOut(step_label), FadeOut(ch4))

        # ── Stage 5: Track Diameter at Each Node ─────────────────────────────
        ch5 = self.chapter_title("Track Global Diameter")

        diameter_steps = [
            (root.left.left.left, 0,  0,  "Node 6: L=0, R=0 → local_diam=0, global=0"),
            (root.left.left,      1,  0,  "Node 4: L=1(child6), R=0 → local_diam=1, global=1"),
            (root.left.right,     0,  0,  "Node 5: L=0, R=0 → local_diam=0, global=1"),
            (root.left,           2,  2,  "Node 2: L=2(child4), R=1(child5) → local_diam=3, global=3"),
            (root.right,          0,  0,  "Node 3: L=0, R=0 → local_diam=0, global=3"),
            (root,                3,  3,  "Node 1: L=3(child2), R=1(child3) → local_diam=4, global=4"),
        ]

        global_diam = 0
        diam_display = Text(
            f"Global diameter = {global_diam}",
            font_size=26,
            color=COBALT,
            weight="BOLD",
        ).to_edge(DOWN, buff=1.2)
        self.play(FadeIn(diam_display))

        step_label2 = Text("", font_size=19, color=GRAY).to_edge(DOWN, buff=0.5)
        self.add(step_label2)

        for node, lh, rh, desc in diameter_steps:
            new_label = Text(desc, font_size=18, color=GRAY).to_edge(DOWN, buff=0.5)
            self.play(Transform(step_label2, new_label), run_time=0.3)
            tree.indicate(node)
            local_d = lh + rh
            if local_d > global_diam:
                global_diam = local_d
                new_diam = Text(
                    f"Global diameter = {global_diam}",
                    font_size=26,
                    color=CORAL,
                    weight="BOLD",
                ).to_edge(DOWN, buff=1.2)
                self.play(Transform(diam_display, new_diam), run_time=0.4)
            self.wait(0.6)

        self.wait(1.0)
        self.play(FadeOut(step_label2), FadeOut(ch5))

        # ── Stage 6: Final Answer Highlight ──────────────────────────────────
        ch6 = self.chapter_title("Diameter = 4")

        # Highlight the diameter path: 6 -> 4 -> 2 -> 5  (length 3 edges)
        # Actually: 6 -> 4 -> 2 -> 5 is 3 edges; 6 -> 4 -> 2 -> 1 -> 3 is 4 edges
        diameter_path_nodes = [
            root.left.left.left,  # 6
            root.left.left,       # 4
            root.left,            # 2
            root,                 # 1
            root.right,           # 3
        ]
        tree.reset_colors(run_time=0.3)
        self.wait(0.3)

        for n in diameter_path_nodes:
            tree.highlight(n, SIGNAL, run_time=0.35)
            self.wait(0.2)

        path_label = Text(
            "Diameter path: 6 → 4 → 2 → 1 → 3  (4 edges)",
            font_size=22,
            color=COBALT,
            weight="BOLD",
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(path_label))
        self.wait(1.5)

        answer_box = VGroup(
            Rectangle(
                width=3.5, height=0.8,
                fill_color=SIGNAL, fill_opacity=0.25,
                stroke_color=SIGNAL, stroke_width=2,
            ),
            Text("Diameter = 4", font_size=28, color=INK, weight="BOLD"),
        )
        answer_box[1].move_to(answer_box[0])
        answer_box.to_edge(RIGHT, buff=0.5).shift(UP * 2)
        self.play(FadeIn(answer_box))
        self.wait(1.5)

        self.play(
            FadeOut(path_label),
            FadeOut(diam_display),
            FadeOut(answer_box),
            FadeOut(ch6),
        )

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")
        self.wait(0.4)
        self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(h)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch7))
