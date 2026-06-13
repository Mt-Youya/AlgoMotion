from manim import *
from ...base import AlgoScene, TreeVis


class HeapMin(AlgoScene):
    TITLE = "Min-Heap"
    SUBTITLE = "Complete binary tree with O(1) min access and O(log n) insert/extract."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is a Min-Heap?")

        intro_lines = VGroup(
            Text("• A complete binary tree", font_size=28),
            Text("• Every parent ≤ its children  (heap property)", font_size=28),
            Text("• Minimum element always at the root", font_size=28),
            Text("• Backed by a compact array representation", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.4) for l in intro_lines], lag_ratio=0.25))
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Array ↔ Tree mapping ───────────────────────────────────
        self.chapter_title("Array Representation")

        values = [1, 3, 5, 7, 9, 8, 6]
        n = len(values)

        # Draw array boxes
        box_width = 0.75
        boxes = VGroup()
        labels = VGroup()
        indices = VGroup()
        for i, v in enumerate(values):
            sq = Square(side_length=box_width, color=BLUE_C, fill_opacity=0.15)
            sq.move_to(RIGHT * (i - n / 2 + 0.5) * box_width + UP * 2.2)
            num = Text(str(v), font_size=26).move_to(sq.get_center())
            idx = Text(str(i), font_size=18, color=GRAY).next_to(sq, DOWN, buff=0.1)
            boxes.add(sq)
            labels.add(num)
            indices.add(idx)

        self.play(LaggedStart(*[FadeIn(VGroup(b, l, i)) for b, l, i in zip(boxes, labels, indices)], lag_ratio=0.1))
        self.wait(0.5)

        # Draw tree nodes
        positions = {
            0: UP * 0.8,
            1: UP * 0.8 + LEFT * 2.4 + DOWN * 1.2,
            2: UP * 0.8 + RIGHT * 2.4 + DOWN * 1.2,
            3: UP * 0.8 + LEFT * 3.2 + DOWN * 2.4,
            4: UP * 0.8 + LEFT * 1.6 + DOWN * 2.4,
            5: UP * 0.8 + RIGHT * 1.6 + DOWN * 2.4,
            6: UP * 0.8 + RIGHT * 3.2 + DOWN * 2.4,
        }

        node_circles = {}
        node_texts = {}
        for i, v in enumerate(values):
            c = Circle(radius=0.32, color=TEAL_C, fill_opacity=0.25).move_to(positions[i] + DOWN * 0.5)
            t = Text(str(v), font_size=22).move_to(c.get_center())
            node_circles[i] = c
            node_texts[i] = t

        edges = VGroup()
        for i in range(n):
            left, right = 2 * i + 1, 2 * i + 2
            if left < n:
                edges.add(Line(node_circles[i].get_center(), node_circles[left].get_center(), color=GRAY, stroke_width=2))
            if right < n:
                edges.add(Line(node_circles[i].get_center(), node_circles[right].get_center(), color=GRAY, stroke_width=2))

        self.play(LaggedStart(*[Create(e) for e in edges], lag_ratio=0.05))
        self.play(LaggedStart(*[FadeIn(VGroup(node_circles[i], node_texts[i])) for i in range(n)], lag_ratio=0.1))

        # Highlight parent formula
        formula = MathTex(r"\text{parent}(i) = \lfloor (i-1)/2 \rfloor", font_size=30, color=YELLOW)
        formula.to_edge(DOWN, buff=0.4)
        self.play(Write(formula))
        self.wait(2)
        self.play(FadeOut(VGroup(boxes, labels, indices, edges,
                                 *node_circles.values(), *node_texts.values(), formula)))

        # ── Stage 3: Insert with sift-up ────────────────────────────────────
        self.chapter_title("Insert  →  Sift-Up  O(log n)")

        heap = [1, 3, 5, 7, 9, 8, 6]
        new_val = 2

        def make_tree(heap_arr, highlight=None, highlight_color=YELLOW):
            grp = VGroup()
            nc, nt = {}, {}
            for i, v in enumerate(heap_arr):
                col = highlight_color if i == highlight else TEAL_C
                c = Circle(radius=0.32, color=col, fill_opacity=0.3 if i == highlight else 0.2)
                c.move_to(positions[i] + DOWN * 0.3)
                t = Text(str(v), font_size=22).move_to(c.get_center())
                nc[i] = c
                nt[i] = t
            eg = VGroup()
            for i in range(len(heap_arr)):
                lc, rc = 2 * i + 1, 2 * i + 2
                if lc < len(heap_arr):
                    eg.add(Line(nc[i].get_center(), nc[lc].get_center(), color=GRAY, stroke_width=2))
                if rc < len(heap_arr):
                    eg.add(Line(nc[i].get_center(), nc[rc].get_center(), color=GRAY, stroke_width=2))
            grp.add(eg, *nc.values(), *nt.values())
            return grp, nc, nt

        tree_grp, nc, nt = make_tree(heap)
        self.play(FadeIn(tree_grp))
        self.wait(0.5)

        # Append new node at index 7 (would be child of index 3)
        heap.append(new_val)
        pos7 = positions[3] + LEFT * 1.6 + DOWN * 1.2
        new_circle = Circle(radius=0.32, color=ORANGE, fill_opacity=0.5).move_to(pos7)
        new_text = Text(str(new_val), font_size=22).move_to(pos7)
        new_edge = Line(nc[3].get_center(), pos7, color=GRAY, stroke_width=2)

        self.play(Create(new_edge), FadeIn(new_circle), Write(new_text))
        self.wait(0.5)

        # Sift up: compare with parent and swap
        step_label = Text("Compare 2 with parent 7 → swap", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.5)
        self.play(Write(step_label))
        self.play(
            new_circle.animate.set_fill(YELLOW, opacity=0.5),
            nc[3].animate.set_fill(YELLOW, opacity=0.5),
        )
        self.wait(1)
        self.play(
            new_text.animate.move_to(nc[3].get_center()),
            nt[3].animate.move_to(pos7),
        )
        self.wait(0.5)
        self.play(FadeOut(step_label))

        step_label2 = Text("Compare 2 with parent 1 → heap property satisfied", font_size=24, color=GREEN).to_edge(DOWN, buff=0.5)
        self.play(Write(step_label2))
        self.wait(1.5)
        self.play(FadeOut(VGroup(tree_grp, new_circle, new_text, new_edge, step_label2)))

        # ── Stage 4: Extract-Min with sift-down ─────────────────────────────
        self.chapter_title("Extract-Min  →  Sift-Down  O(log n)")

        heap2 = [1, 3, 5, 7, 9, 8, 6]
        tree_grp2, nc2, nt2 = make_tree(heap2)
        self.play(FadeIn(tree_grp2))
        self.wait(0.5)

        # Highlight root (min)
        self.play(nc2[0].animate.set_fill(RED, opacity=0.6))
        min_label = Text("Extract min = 1", font_size=26, color=RED).to_edge(DOWN, buff=0.6)
        self.play(Write(min_label))
        self.wait(1)

        # Move last element to root
        step3 = Text("Move last element (6) to root, remove last", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.5)
        self.play(FadeOut(min_label), Write(step3))
        self.play(nt2[0].animate.become(Text("6", font_size=22).move_to(nc2[0].get_center())))
        self.play(FadeOut(nc2[6]), FadeOut(nt2[6]))
        self.wait(1)

        step4 = Text("Sift-down: swap 6 with smaller child (3)", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.5)
        self.play(FadeOut(step3), Write(step4))
        self.play(
            nc2[0].animate.set_fill(YELLOW, opacity=0.4),
            nc2[1].animate.set_fill(YELLOW, opacity=0.4),
        )
        self.wait(1)
        self.play(FadeOut(VGroup(tree_grp2, step4)))

        # ── Stage 5: Heapify (build heap) ───────────────────────────────────
        self.chapter_title("Build Heap  →  O(n)")

        arr_vals = [9, 4, 7, 1, 8, 3, 5]
        arr_boxes2 = VGroup()
        arr_labels2 = VGroup()
        for i, v in enumerate(arr_vals):
            sq = Square(side_length=0.7, color=BLUE_C, fill_opacity=0.15)
            sq.move_to(RIGHT * (i - len(arr_vals) / 2 + 0.5) * 0.75)
            num = Text(str(v), font_size=24).move_to(sq.get_center())
            arr_boxes2.add(sq)
            arr_labels2.add(num)

        self.play(LaggedStart(*[FadeIn(VGroup(b, l)) for b, l in zip(arr_boxes2, arr_labels2)], lag_ratio=0.1))

        build_info = Text("Start from last non-leaf (i = n//2 - 1), sift-down each", font_size=22, color=GRAY)
        build_info.to_edge(DOWN, buff=0.5)
        self.play(Write(build_info))
        self.wait(1)

        # Highlight each non-leaf in reverse
        for i in range(len(arr_vals) // 2 - 1, -1, -1):
            self.play(arr_boxes2[i].animate.set_fill(ORANGE, opacity=0.5), run_time=0.4)
            self.wait(0.3)
            self.play(arr_boxes2[i].animate.set_fill(GREEN, opacity=0.3), run_time=0.3)

        self.wait(1)
        self.play(FadeOut(VGroup(arr_boxes2, arr_labels2, build_info)))

        # ── Stage 6: Complexity card ─────────────────────────────────────────
        self.complexity_card(
            time_rows=[
                ("Peek min",   "O(1)"),
                ("Insert",     "O(log n)"),
                ("Extract-min","O(log n)"),
                ("Build heap", "O(n)"),
            ],
            space_rows=[
                ("Array storage", "O(n)"),
            ],
        )
        self.wait(2)
