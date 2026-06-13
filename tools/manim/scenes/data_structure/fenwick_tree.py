from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    C_ACTIVE,
    C_DEFAULT,
    C_SORTED,
    C_PIVOT,
    C_TEXT,
    C_SUBTEXT,
    COBALT,
    CORAL,
    SIGNAL,
    INK,
    MIST,
    GRAY,
)


class FenwickTree(AlgoScene):
    TITLE = "Fenwick Tree (BIT)"
    SUBTITLE = "Binary Indexed Tree for prefix sum queries and updates in O(log n)."
    CATEGORY = "data-structure"

    # Helper: draw a BIT array as rectangles with labels
    def _draw_bit_array(self, values, title_text, highlight_indices=None, highlight_color=CORAL):
        n = len(values)
        cell_w = 0.85
        cell_h = 0.75
        cells = VGroup()
        for i, v in enumerate(values):
            rect = Rectangle(width=cell_w, height=cell_h, color=COBALT, fill_opacity=0.25)
            val_lbl = Text(str(v) if v is not None else "0", font_size=22, color=INK)
            val_lbl.move_to(rect)
            idx_lbl = Text(str(i + 1), font_size=16, color=GRAY)
            idx_lbl.next_to(rect, DOWN, buff=0.12)
            cell = VGroup(rect, val_lbl, idx_lbl)
            cells.add(cell)

        cells.arrange(RIGHT, buff=0.1)
        cells.move_to(ORIGIN + DOWN * 0.3)

        title = Text(title_text, font_size=24, color=COBALT).next_to(cells, UP, buff=0.5)

        if highlight_indices:
            for hi in highlight_indices:
                if 0 <= hi < n:
                    cells[hi][0].set_fill(highlight_color, opacity=0.55)
                    cells[hi][0].set_stroke(highlight_color, width=3)

        return VGroup(title, cells)

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────
        ch1 = self.chapter_title("What is a Fenwick Tree?")

        intro_lines = VGroup(
            Text("A Fenwick Tree (Binary Indexed Tree) stores prefix sums", font_size=26),
            Text("efficiently over a mutable array.", font_size=26),
            Text("Invented by Peter Fenwick in 1994", font_size=22, color=COBALT),
            Text("Update any element: O(log n)", font_size=24, color=SIGNAL),
            Text("Query prefix sum [1..i]: O(log n)", font_size=24, color=SIGNAL),
            Text("Space: O(n)  —  far simpler than a Segment Tree", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.38).move_to(ORIGIN)

        for line in intro_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.25), run_time=0.55)
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(ch1))

        # ── Stage 2: The Core Trick — lowbit ────────────────────────────
        ch2 = self.chapter_title("The lowbit Trick")

        lb_desc = VGroup(
            Text("Every index i is responsible for a range of size lowbit(i)", font_size=24),
            Text("lowbit(i) = i & (-i)   (isolates the lowest set bit)", font_size=24, color=COBALT),
        ).arrange(DOWN, buff=0.4).shift(UP * 1.8)

        self.play(FadeIn(lb_desc))
        self.wait(1)

        # Show lowbit values for indices 1..8
        indices = list(range(1, 9))
        lb_vals = [i & (-i) for i in indices]

        header_i = Text("i", font_size=22, color=GRAY).shift(LEFT * 3.2 + UP * 0.4)
        header_lb = Text("lowbit(i)", font_size=22, color=GRAY).shift(LEFT * 3.2 - UP * 0.4)
        self.play(FadeIn(header_i), FadeIn(header_lb))

        col_groups = VGroup()
        for idx, (i_val, lb_val) in enumerate(zip(indices, lb_vals)):
            x_pos = LEFT * 2.2 + RIGHT * idx * 0.85
            i_text = Text(str(i_val), font_size=22, color=INK).move_to(x_pos + UP * 0.4)
            lb_text = Text(str(lb_val), font_size=22, color=CORAL).move_to(x_pos - UP * 0.4)
            col_groups.add(VGroup(i_text, lb_text))
            self.play(FadeIn(i_text), FadeIn(lb_text), run_time=0.3)

        self.wait(1.5)

        note = Text(
            "BIT[i] stores sum of elements from  i - lowbit(i) + 1  to  i",
            font_size=20, color=COBALT,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(2)
        self.play(FadeOut(lb_desc), FadeOut(header_i), FadeOut(header_lb),
                  FadeOut(col_groups), FadeOut(note), FadeOut(ch2))

        # ── Stage 3: Build BIT from Array ────────────────────────────────
        ch3 = self.chapter_title("Building the BIT")

        original = [3, 2, -1, 6, 5, 4, -3, 3]
        bit_built = [0] * (len(original) + 1)
        for i, v in enumerate(original):
            idx = i + 1
            while idx <= len(original):
                bit_built[idx] += v
                idx += idx & (-idx)

        orig_label = Text("Original array A:", font_size=22, color=GRAY).shift(UP * 2.2 + LEFT * 3)
        self.play(FadeIn(orig_label))

        orig_vis = self._draw_bit_array(original, "")
        orig_vis[0].set_opacity(0)  # hide inner title
        orig_vis.shift(UP * 1.5)
        self.play(FadeIn(orig_vis))
        self.wait(1)

        bit_label = Text("BIT array (1-indexed):", font_size=22, color=GRAY).shift(DOWN * 0.2 + LEFT * 3)
        self.play(FadeIn(bit_label))

        bit_vis = self._draw_bit_array(bit_built[1:], "")
        bit_vis[0].set_opacity(0)
        bit_vis.shift(DOWN * 1.5)
        self.play(FadeIn(bit_vis))
        self.wait(1)

        explain = Text(
            "BIT[4]=10 covers A[1..4]=3+2−1+6   |   BIT[8]=19 covers A[1..8]",
            font_size=19, color=COBALT,
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(explain))
        self.wait(2.5)
        self.play(FadeOut(orig_label), FadeOut(orig_vis), FadeOut(bit_label),
                  FadeOut(bit_vis), FadeOut(explain), FadeOut(ch3))

        # ── Stage 4: Prefix Sum Query ────────────────────────────────────
        ch4 = self.chapter_title("Prefix Sum Query")

        query_steps = VGroup(
            Text("query(i): sum of A[1..i]", font_size=26, color=COBALT),
            Text("Start at index i, accumulate BIT[i]", font_size=23),
            Text("Move to i -= lowbit(i)  until i == 0", font_size=23),
            Text("Example: query(7)", font_size=22, color=SIGNAL),
        ).arrange(DOWN, buff=0.38).shift(UP * 1.0)

        for s in query_steps:
            self.play(FadeIn(s, shift=DOWN * 0.15), run_time=0.5)
        self.wait(1)

        # Animate query(7) trace: 7 -> 6 -> 4 -> 0
        trace_indices = [7, 6, 4]
        trace_bit_vals = [bit_built[i] for i in trace_indices]
        trace_sum = sum(trace_bit_vals)

        trace_rows = VGroup()
        x_start = LEFT * 2.5
        for step_i, (idx, bv) in enumerate(zip(trace_indices, trace_bit_vals)):
            lb = idx & (-idx)
            row = Text(
                f"i={idx}  BIT[{idx}]={bv}  lowbit={lb}  →  next i={idx - lb}",
                font_size=20, color=INK,
            ).move_to(x_start + DOWN * (step_i * 0.55 - 0.5))
            trace_rows.add(row)
            self.play(FadeIn(row), run_time=0.5)
            self.wait(0.4)

        result_text = Text(
            f"query(7) = {' + '.join(str(v) for v in trace_bit_vals)} = {trace_sum}",
            font_size=24, color=SIGNAL,
        ).next_to(trace_rows, DOWN, buff=0.45)
        self.play(FadeIn(result_text))
        self.wait(2)
        self.play(FadeOut(query_steps), FadeOut(trace_rows), FadeOut(result_text), FadeOut(ch4))

        # ── Stage 5: Point Update ────────────────────────────────────────
        ch5 = self.chapter_title("Point Update")

        update_steps = VGroup(
            Text("update(i, delta): add delta to A[i]", font_size=26, color=COBALT),
            Text("Start at index i, add delta to BIT[i]", font_size=23),
            Text("Move to i += lowbit(i)  until i > n", font_size=23),
            Text("Example: update(3, +5)  on n=8", font_size=22, color=SIGNAL),
        ).arrange(DOWN, buff=0.38).shift(UP * 1.0)

        for s in update_steps:
            self.play(FadeIn(s, shift=DOWN * 0.15), run_time=0.5)
        self.wait(1)

        # Animate update(3, 5): 3 -> 4 -> 8 -> stop
        upd_trace = []
        idx = 3
        n = 8
        while idx <= n:
            lb = idx & (-idx)
            upd_trace.append((idx, lb, idx + lb))
            idx += lb

        upd_rows = VGroup()
        for step_i, (cur_i, lb, nxt) in enumerate(upd_trace):
            row = Text(
                f"i={cur_i}  lowbit={lb}  BIT[{cur_i}] += 5  →  next i={nxt}",
                font_size=20, color=INK,
            ).move_to(LEFT * 1.5 + DOWN * (step_i * 0.55 - 0.3))
            upd_rows.add(row)
            self.play(FadeIn(row), run_time=0.5)
            self.wait(0.4)

        upd_note = Text(
            "Only O(log n) cells updated — propagates up through responsible ranges",
            font_size=20, color=COBALT,
        ).next_to(upd_rows, DOWN, buff=0.45)
        self.play(FadeIn(upd_note))
        self.wait(2)
        self.play(FadeOut(update_steps), FadeOut(upd_rows), FadeOut(upd_note), FadeOut(ch5))

        # ── Stage 6: Range Sum via Two Queries ───────────────────────────
        ch6 = self.chapter_title("Range Sum Query")

        range_lines = VGroup(
            Text("Range sum A[l..r] = query(r) − query(l−1)", font_size=26, color=COBALT),
            Text("Two prefix queries → O(log n) range sum", font_size=23),
            Text("Example: sum(3..6) = query(6) − query(2)", font_size=23, color=SIGNAL),
        ).arrange(DOWN, buff=0.4).shift(UP * 0.8)

        for line in range_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.2), run_time=0.5)
        self.wait(1)

        # Compute and show
        def query_bit(bit, i):
            s = 0
            while i > 0:
                s += bit[i]
                i -= i & (-i)
            return s

        q6 = query_bit(bit_built, 6)
        q2 = query_bit(bit_built, 2)
        range_result = Text(
            f"query(6)={q6}  −  query(2)={q2}  =  {q6 - q2}",
            font_size=24, color=SIGNAL,
        ).shift(DOWN * 0.4)
        self.play(FadeIn(range_result))
        self.wait(1)

        verify = Text(
            f"Verify: A[3..6] = {original[2]}+{original[3]}+{original[4]}+{original[5]} = {sum(original[2:6])}  ✓",
            font_size=22, color=GRAY,
        ).next_to(range_result, DOWN, buff=0.4)
        self.play(FadeIn(verify))
        self.wait(2.5)
        self.play(FadeOut(range_lines), FadeOut(range_result), FadeOut(verify), FadeOut(ch6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        ch7 = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        card = self.complexity_card(
            r"O(\log n)",
            r"O(\log n)",
            r"O(\log n)",
            r"O(n)",
        )
        self.play(FadeIn(card))
        self.wait(3)
        self.play(FadeOut(card), FadeOut(ch7))
