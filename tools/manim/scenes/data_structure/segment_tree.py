from manim import *
from ...base import AlgoScene, TreeVis


class SegmentTree(AlgoScene):
    TITLE = "Segment Tree"
    SUBTITLE = "Tree for range queries and point updates in O(log n)."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Problem: Range Sum Queries")
        arr = [1, 3, 5, 7, 9, 11]
        arr_labels = VGroup(*[
            VGroup(
                Square(side_length=0.7, color=BLUE_B, fill_color=BLUE_E, fill_opacity=0.6),
                Text(str(v), font_size=22, color=WHITE),
            ).arrange(ORIGIN)
            for v in arr
        ]).arrange(RIGHT, buff=0.15).move_to(UP * 2.5)

        idx_labels = VGroup(*[
            Text(str(i), font_size=16, color=GREY_B)
            for i in range(len(arr))
        ])
        for i, lbl in enumerate(idx_labels):
            lbl.next_to(arr_labels[i], DOWN, buff=0.1)

        self.play(FadeIn(arr_labels), FadeIn(idx_labels))
        self.wait(0.8)

        question = Text("Query: sum of arr[1..4] = ?", font_size=26, color=YELLOW)
        question.next_to(arr_labels, DOWN, buff=0.6)
        self.play(Write(question))

        highlight = SurroundingRectangle(
            VGroup(*arr_labels[1:5]), color=YELLOW, buff=0.08
        )
        self.play(Create(highlight))
        self.wait(1.2)

        naive = Text("Naive: O(n) per query   →   Segment Tree: O(log n)", font_size=22, color=GREEN_B)
        naive.next_to(question, DOWN, buff=0.4)
        self.play(Write(naive))
        self.wait(1.5)
        self.play(FadeOut(VGroup(arr_labels, idx_labels, question, highlight, naive)))

        # ── Stage 2: Build the Segment Tree ────────────────────────────────
        self.chapter_title("Build: Divide & Conquer")

        node_data = [
            # (value, level, x_offset)
            (36, 0, 0),        # root [0..5]
            (16, 1, -3),       # [0..2]
            (20, 1, 3),        # [3..5]
            (4,  2, -4.5),     # [0..1]
            (5,  2, -1.5),     # [2..2]
            (16, 2, 1.5),      # [3..4]
            (11, 2, 4.5),      # [5..5]
            (1,  3, -5.25),    # [0..0]
            (3,  3, -3.75),    # [1..1]
            (7,  3, 0.75),     # [3..3]
            (9,  3, 2.25),     # [4..4]
        ]

        node_labels = [
            "[0..5]", "[0..2]", "[3..5]",
            "[0..1]", "[2]", "[3..4]", "[5]",
            "[0]", "[1]", "[3]", "[4]",
        ]

        level_y = {0: 1.5, 1: 0.3, 2: -0.9, 3: -2.1}
        node_mobs = {}

        edges_info = [
            (0, 1), (0, 2),
            (1, 3), (1, 4),
            (2, 5), (2, 6),
            (3, 7), (3, 8),
            (5, 9), (5, 10),
        ]

        def make_node(val, range_lbl, x, y, color=BLUE_D):
            circle = Circle(radius=0.38, color=color, fill_color=color, fill_opacity=0.7)
            val_txt = Text(str(val), font_size=18, color=WHITE).move_to(circle)
            rng_txt = Text(range_lbl, font_size=11, color=GREY_A).next_to(circle, DOWN, buff=0.05)
            grp = VGroup(circle, val_txt, rng_txt).move_to([x * 0.85, y, 0])
            return grp

        for i, (val, lvl, xoff) in enumerate(node_data):
            mob = make_node(val, node_labels[i], xoff, level_y[lvl])
            node_mobs[i] = mob

        # Draw edges first
        edge_mobs = []
        for (p, c) in edges_info:
            pv, pl, px = node_data[p]
            cv, cl, cx = node_data[c]
            start = np.array([px * 0.85, level_y[pl], 0])
            end   = np.array([cx * 0.85, level_y[cl], 0])
            line = Line(start, end, color=GREY_B, stroke_width=1.5)
            edge_mobs.append(line)

        self.play(LaggedStart(*[Create(e) for e in edge_mobs], lag_ratio=0.05))
        self.play(LaggedStart(*[FadeIn(node_mobs[i]) for i in range(len(node_data))], lag_ratio=0.08))
        self.wait(1.5)

        # ── Stage 3: Range Query Animation ─────────────────────────────────
        self.chapter_title("Range Query: sum(1, 4)")

        query_box = Text("Query: sum(1, 4)", font_size=22, color=YELLOW).to_edge(UP, buff=0.15)
        self.play(Write(query_box))

        # Highlight nodes that contribute to sum(1,4): [1..1]=3, [2..2]=5, [3..4]=16
        contributing = [8, 4, 5]  # indices in node_mobs
        for idx in contributing:
            self.play(
                node_mobs[idx][0].animate.set_fill(YELLOW, opacity=0.9).set_stroke(YELLOW),
                run_time=0.5,
            )
        self.wait(0.5)

        result_txt = Text("3 + 5 + 16 = 24  ✓", font_size=22, color=GREEN).next_to(query_box, DOWN, buff=0.2)
        self.play(Write(result_txt))
        self.wait(1.5)

        # Reset colors
        for idx in contributing:
            self.play(
                node_mobs[idx][0].animate.set_fill(BLUE_D, opacity=0.7).set_stroke(BLUE_D),
                run_time=0.3,
            )
        self.play(FadeOut(result_txt), FadeOut(query_box))

        # ── Stage 4: Point Update Animation ────────────────────────────────
        self.chapter_title("Point Update: arr[3] = 10")

        update_box = Text("Update: arr[3] = 10  (was 7, delta = +3)", font_size=22, color=ORANGE).to_edge(UP, buff=0.15)
        self.play(Write(update_box))

        # Nodes that need updating: [3..3]=7→10, [3..4]=16→19, [3..5]=20→23, root=36→39
        update_path = [9, 5, 2, 0]
        new_vals = [10, 19, 23, 39]

        for idx, nv in zip(update_path, new_vals):
            old_mob = node_mobs[idx]
            self.play(old_mob[0].animate.set_fill(ORANGE, opacity=0.9), run_time=0.4)
            new_val_txt = Text(str(nv), font_size=18, color=WHITE).move_to(old_mob[0])
            self.play(Transform(old_mob[1], new_val_txt), run_time=0.4)
            self.wait(0.3)

        self.wait(1.0)
        self.play(FadeOut(update_box))

        # ── Stage 5: Tree Array Representation ─────────────────────────────
        self.chapter_title("Internal Array Representation")

        tree_arr = [39, 16, 23, 4, 5, 19, 11, 1, 3, 0, 0, 10, 9]
        labels_top = ["tree[0]", "tree[1]", "tree[2]", "tree[3]", "tree[4]",
                      "tree[5]", "tree[6]", "tree[7]", "tree[8]"]

        arr_vis = VGroup(*[
            VGroup(
                Square(side_length=0.6, color=TEAL_D, fill_color=TEAL_E, fill_opacity=0.6),
                Text(str(tree_arr[i]), font_size=16, color=WHITE),
            ).arrange(ORIGIN)
            for i in range(9)
        ]).arrange(RIGHT, buff=0.1).move_to(DOWN * 0.5)

        idx_vis = VGroup(*[
            Text(labels_top[i], font_size=10, color=GREY_B).next_to(arr_vis[i], DOWN, buff=0.08)
            for i in range(9)
        ])

        formula = Text(
            "Parent i  →  children 2i+1, 2i+2",
            font_size=20, color=GREY_A
        ).next_to(arr_vis, DOWN, buff=0.5)

        # Fade out tree diagram
        all_tree = VGroup(*edge_mobs, *node_mobs.values())
        self.play(FadeOut(all_tree), run_time=0.8)
        self.play(FadeIn(arr_vis), FadeIn(idx_vis))
        self.play(Write(formula))
        self.wait(1.5)
        self.play(FadeOut(VGroup(arr_vis, idx_vis, formula)))

        # ── Stage 6: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_build="O(n)",
            time_query="O(log n)",
            time_update="O(log n)",
            space="O(n)",
        )
        self.wait(2)
