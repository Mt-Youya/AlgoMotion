from manim import *
from ...base import AlgoScene


class HeapMax(AlgoScene):
    TITLE = "Max-Heap"
    SUBTITLE = "Complete binary tree with O(1) max access and O(log n) insert/extract."
    CATEGORY = "data-structure"

    # Fixed positions for a 7-node complete binary tree
    POSITIONS = {
        0: UP * 1.6,
        1: UP * 0.4 + LEFT * 2.4,
        2: UP * 0.4 + RIGHT * 2.4,
        3: DOWN * 0.8 + LEFT * 3.4,
        4: DOWN * 0.8 + LEFT * 1.4,
        5: DOWN * 0.8 + RIGHT * 1.4,
        6: DOWN * 0.8 + RIGHT * 3.4,
    }

    def _make_heap_display(self, heap_arr, highlight_idx=None, highlight_color=YELLOW):
        """Build VGroup of edges + circles + labels for the given heap array."""
        n = len(heap_arr)
        nc, nt = {}, {}
        for i in range(n):
            col = highlight_color if i == highlight_idx else "#2255CC"
            c = Circle(radius=0.34, color=col,
                       fill_color=col, fill_opacity=0.35 if i == highlight_idx else 0.2,
                       stroke_width=2.5)
            c.move_to(self.POSITIONS[i])
            t = Text(str(heap_arr[i]), font_size=22, color="#1A1C2C", weight="BOLD")
            t.move_to(c.get_center())
            nc[i] = c
            nt[i] = t
        edges = VGroup()
        for i in range(n):
            left_i, right_i = 2 * i + 1, 2 * i + 2
            if left_i < n:
                edges.add(Line(self.POSITIONS[i], self.POSITIONS[left_i],
                               color="#888899", stroke_width=2))
            if right_i < n:
                edges.add(Line(self.POSITIONS[i], self.POSITIONS[right_i],
                               color="#888899", stroke_width=2))
        grp = VGroup(edges, *nc.values(), *nt.values())
        return grp, nc, nt

    def _make_array_display(self, heap_arr, highlight_idx=None):
        """Build an array-box display for the heap backing array."""
        n = len(heap_arr)
        box_w = 0.72
        boxes = VGroup()
        nums = VGroup()
        idxs = VGroup()
        for i, v in enumerate(heap_arr):
            fill_col = YELLOW if i == highlight_idx else "#DDE4F0"
            sq = Square(side_length=box_w, color="#2255CC",
                        fill_color=fill_col, fill_opacity=0.6, stroke_width=2)
            sq.move_to(RIGHT * (i - n / 2 + 0.5) * box_w)
            num = Text(str(v), font_size=22, color="#1A1C2C", weight="BOLD").move_to(sq.get_center())
            idx = Text(str(i), font_size=16, color="#888899").next_to(sq, DOWN, buff=0.08)
            boxes.add(sq)
            nums.add(num)
            idxs.add(idx)
        return VGroup(boxes, nums, idxs), boxes, nums

    def build(self):
        # ── Stage 1: Intro — what is a Max-Heap? ────────────────────────────
        ch1 = self.chapter_title("What is a Max-Heap?")

        bullet_texts = [
            "• A complete binary tree filled level by level, left to right",
            "• Heap property: every parent ≥ both children",
            "• Maximum element always lives at the root  →  O(1) access",
            "• Backed by a compact array: children of i are at 2i+1 and 2i+2",
            "• Core operations: insert  O(log n),  extract-max  O(log n)",
        ]
        bullets = VGroup(*[
            Text(line, font_size=26, color="#1A1C2C")
            for line in bullet_texts
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.32).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in bullets], lag_ratio=0.2))
        self.wait(2.5)
        self.play(FadeOut(bullets), FadeOut(ch1))

        # ── Stage 2: Array ↔ Tree mapping ───────────────────────────────────
        ch2 = self.chapter_title("Array Representation")

        heap_vals = [90, 70, 80, 40, 60, 50, 30]
        arr_grp, boxes, nums = self._make_array_display(heap_vals)
        arr_grp.move_to(UP * 2.5)

        self.play(LaggedStart(*[FadeIn(VGroup(boxes[i], nums[i])) for i in range(len(heap_vals))],
                              lag_ratio=0.1))
        self.wait(0.5)

        # Draw tree below
        tree_grp, nc, nt = self._make_heap_display(heap_vals)
        tree_grp.shift(DOWN * 0.2)
        self.play(FadeIn(tree_grp))
        self.wait(0.5)

        # Show index formulas
        formula = MathTex(
            r"\text{left}(i)=2i+1,\quad\text{right}(i)=2i+2,\quad\text{parent}(i)=\lfloor(i-1)/2\rfloor",
            font_size=26, color="#2255CC"
        ).to_edge(DOWN, buff=0.4)
        self.play(Write(formula))
        self.wait(2)

        # Highlight root box and root node
        self.play(
            boxes[0].animate.set_fill(YELLOW, opacity=0.8),
            nc[0].animate.set_fill(YELLOW, opacity=0.6),
        )
        root_label = Text("root = max  →  O(1)", font_size=22, color="#E05A3A").next_to(nc[0], RIGHT, buff=0.5)
        self.play(FadeIn(root_label))
        self.wait(1.5)
        self.play(FadeOut(VGroup(arr_grp, tree_grp, formula, root_label, ch2)))

        # ── Stage 3: Insert + Sift-Up ────────────────────────────────────────
        ch3 = self.chapter_title("Insert  →  Sift-Up  O(log n)")

        heap = [90, 70, 80, 40, 60, 50, 30]
        tree_grp, nc, nt = self._make_heap_display(heap)
        self.play(FadeIn(tree_grp))
        self.wait(0.5)

        # Insert 95 at index 7 (child of index 3 right child)
        insert_val = 95
        pos7 = self.POSITIONS[3] + LEFT * 1.6 + DOWN * 1.2
        new_c = Circle(radius=0.34, color=ORANGE, fill_color=ORANGE, fill_opacity=0.5, stroke_width=2.5)
        new_c.move_to(pos7)
        new_t = Text(str(insert_val), font_size=22, color="#1A1C2C", weight="BOLD").move_to(pos7)
        new_edge = Line(self.POSITIONS[3], pos7, color="#888899", stroke_width=2)

        info1 = Text(f"Append {insert_val} at end (index 7)", font_size=24, color=ORANGE).to_edge(DOWN, buff=0.55)
        self.play(Write(info1))
        self.play(Create(new_edge), FadeIn(new_c), Write(new_t))
        self.wait(0.8)

        # Sift-up step 1: compare with parent at index 3 (val=40)
        info2 = Text("95 > parent 40  →  swap", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.55)
        self.play(FadeOut(info1), Write(info2))
        self.play(
            new_c.animate.set_fill(YELLOW, opacity=0.7),
            nc[3].animate.set_fill(YELLOW, opacity=0.7),
        )
        self.wait(0.6)
        self.play(
            new_t.animate.move_to(nc[3].get_center()),
            nt[3].animate.move_to(pos7),
        )
        self.wait(0.5)

        # Sift-up step 2: compare with parent at index 1 (val=70)
        info3 = Text("95 > parent 70  →  swap", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.55)
        self.play(FadeOut(info2), Write(info3))
        self.play(
            nc[3].animate.set_fill(YELLOW, opacity=0.7),
            nc[1].animate.set_fill(YELLOW, opacity=0.7),
        )
        self.wait(0.6)

        # Sift-up step 3: compare with root (val=90)
        info4 = Text("95 > root 90  →  swap  →  new root = 95", font_size=24, color="#CEEB5A").to_edge(DOWN, buff=0.55)
        self.play(FadeOut(info3), Write(info4))
        self.play(
            nc[1].animate.set_fill("#CEEB5A", opacity=0.7),
            nc[0].animate.set_fill("#CEEB5A", opacity=0.7),
        )
        self.wait(1.5)
        self.play(FadeOut(VGroup(tree_grp, new_c, new_t, new_edge, info4, ch3)))

        # ── Stage 4: Extract-Max + Sift-Down ────────────────────────────────
        ch4 = self.chapter_title("Extract-Max  →  Sift-Down  O(log n)")

        heap2 = [90, 70, 80, 40, 60, 50, 30]
        tree_grp2, nc2, nt2 = self._make_heap_display(heap2)
        self.play(FadeIn(tree_grp2))
        self.wait(0.5)

        # Highlight root as max
        self.play(nc2[0].animate.set_fill("#E05A3A", opacity=0.7))
        ex_label = Text("Extract max = 90", font_size=26, color="#E05A3A").to_edge(DOWN, buff=0.6)
        self.play(Write(ex_label))
        self.wait(1)

        # Move last element (30) to root
        step_a = Text("Move last element (30) to root, shrink heap", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.55)
        self.play(FadeOut(ex_label), Write(step_a))
        new_root_text = Text("30", font_size=22, color="#1A1C2C", weight="BOLD").move_to(nc2[0].get_center())
        self.play(
            FadeOut(nt2[0]),
            FadeIn(new_root_text),
            FadeOut(nc2[6]),
            FadeOut(nt2[6]),
        )
        self.wait(0.8)

        # Sift-down: swap 30 with larger child (80 at index 2)
        step_b = Text("30 < children {70,80} → swap with larger child 80", font_size=24, color=YELLOW).to_edge(DOWN, buff=0.55)
        self.play(FadeOut(step_a), Write(step_b))
        self.play(
            nc2[0].animate.set_fill(YELLOW, opacity=0.5),
            nc2[2].animate.set_fill(YELLOW, opacity=0.5),
        )
        self.wait(0.6)
        self.play(
            new_root_text.animate.move_to(nc2[2].get_center()),
            nt2[2].animate.move_to(nc2[0].get_center()),
        )
        self.wait(0.8)

        # Continue sift-down: 30 < children {50,30} at level 3
        step_c = Text("30 < child 50 → swap with 50, heap property restored", font_size=24, color="#CEEB5A").to_edge(DOWN, buff=0.55)
        self.play(FadeOut(step_b), Write(step_c))
        self.play(
            nc2[2].animate.set_fill("#CEEB5A", opacity=0.5),
            nc2[5].animate.set_fill("#CEEB5A", opacity=0.5),
        )
        self.wait(1.5)
        self.play(FadeOut(VGroup(tree_grp2, new_root_text, step_c, ch4)))

        # ── Stage 5: Build Heap (Heapify) ────────────────────────────────────
        ch5 = self.chapter_title("Build Heap  →  O(n)  (not O(n log n))")

        raw = [5, 3, 8, 1, 9, 2, 7]
        n = len(raw)
        arr_grp2, boxes2, nums2 = self._make_array_display(raw)
        arr_grp2.move_to(UP * 2.8)
        self.play(LaggedStart(*[FadeIn(VGroup(boxes2[i], nums2[i])) for i in range(n)], lag_ratio=0.1))

        build_info = Text(
            "Start from last non-leaf  i = n//2 − 1 = 2,  sift-down each node",
            font_size=22, color="#888899"
        ).to_edge(DOWN, buff=0.5)
        self.play(Write(build_info))
        self.wait(0.8)

        # Highlight non-leaves right to left
        for i in range(n // 2 - 1, -1, -1):
            self.play(boxes2[i].animate.set_fill(ORANGE, opacity=0.6), run_time=0.35)
            self.wait(0.25)
            self.play(boxes2[i].animate.set_fill("#CEEB5A", opacity=0.5), run_time=0.3)

        result_label = Text("Result: [9, 5, 8, 1, 3, 2, 7]  →  valid max-heap", font_size=24, color="#CEEB5A")
        result_label.next_to(arr_grp2, DOWN, buff=0.4)
        self.play(Write(result_label))
        self.wait(1.5)
        self.play(FadeOut(VGroup(arr_grp2, build_info, result_label, ch5)))

        # ── Stage 6: Complexity card ─────────────────────────────────────────
        self.chapter_title("Complexity Summary")
        self.complexity_card(
            time_best=r"O(1)",
            time_avg=r"O(\log n)",
            time_worst=r"O(\log n)",
            space=r"O(n)",
        )
        self.wait(2.5)
