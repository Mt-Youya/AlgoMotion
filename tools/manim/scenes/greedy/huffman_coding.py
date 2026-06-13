from manim import *
from ...base import AlgoScene, TreeVis, TreeNode


class HuffmanCoding(AlgoScene):
    TITLE = "Huffman Coding"
    SUBTITLE = "Build optimal prefix-free binary code by repeatedly merging two lowest-frequency"
    CATEGORY = "greedy"

    def build(self):
        # ── Stage 1: Problem Setup ─────────────────────────────────────────
        self.chapter_title("Problem Setup")

        intro = Text(
            "Given symbol frequencies, build a binary tree\n"
            "that assigns shorter codes to more frequent symbols.",
            font_size=26,
            color=WHITE,
        ).to_edge(UP, buff=1.2)
        self.play(FadeIn(intro))
        self.wait(1.5)

        # Show the input frequency table
        symbols = ["A", "B", "C", "D", "E", "F"]
        freqs   = [  5,   9,  12,  13,  16,  45]

        header = Text("Symbol  |  Frequency", font_size=22, color=YELLOW).shift(UP * 1.0)
        self.play(FadeOut(intro), Write(header))
        self.wait(0.4)

        rows = VGroup()
        for sym, fr in zip(symbols, freqs):
            row = Text(f"  {sym}      |     {fr}", font_size=20, color=WHITE)
            rows.add(row)
        rows.arrange(DOWN, buff=0.18).next_to(header, DOWN, buff=0.25)

        for row in rows:
            self.play(Write(row), run_time=0.3)
        self.wait(1.5)
        self.play(FadeOut(header), FadeOut(rows))

        # ── Stage 2: Priority Queue Initialization ────────────────────────
        self.chapter_title("Step 1 — Build Min-Heap")

        pq_label = Text(
            "Insert all symbols as leaf nodes into a min-priority queue:",
            font_size=22,
            color=WHITE,
        ).to_edge(UP, buff=1.0)
        self.play(Write(pq_label))
        self.wait(0.5)

        # Draw leaf nodes sorted by frequency
        leaf_data = sorted(zip(freqs, symbols), key=lambda x: x[0])
        node_mobs = VGroup()
        node_labels = VGroup()
        xs = np.linspace(-5.0, 5.0, len(leaf_data))

        for i, (fr, sym) in enumerate(leaf_data):
            circle = Circle(
                radius=0.42,
                fill_color="#1E3A5F",
                fill_opacity=1,
                stroke_color="#4FC3F7",
                stroke_width=2.5,
            ).move_to(np.array([xs[i], -0.5, 0]))
            lbl = Text(f"{sym}\n{fr}", font_size=18, color=WHITE).move_to(circle.get_center())
            node_mobs.add(circle)
            node_labels.add(lbl)

        self.play(
            LaggedStart(*[Create(c) for c in node_mobs], lag_ratio=0.15),
            LaggedStart(*[Write(l) for l in node_labels], lag_ratio=0.15),
        )
        self.wait(1.5)

        pq_note = Text(
            "Min-heap orders nodes by frequency (smallest at top)",
            font_size=20,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.6)
        self.play(Write(pq_note))
        self.wait(1.5)
        self.play(FadeOut(pq_label), FadeOut(pq_note), FadeOut(node_mobs), FadeOut(node_labels))

        # ── Stage 3: First Two Merges ─────────────────────────────────────
        self.chapter_title("Step 2 — Merge Smallest Two Nodes")

        merge_desc = Text(
            "Repeatedly extract two nodes with lowest frequency,\n"
            "merge them into a new internal node whose frequency\n"
            "equals the sum of its children.",
            font_size=22,
            color=WHITE,
        ).to_edge(UP, buff=1.0)
        self.play(FadeIn(merge_desc))
        self.wait(1.5)

        # Simulate first merge: A(5) + B(9) → internal(14)
        def draw_node(label, pos, color="#1E3A5F", stroke="#4FC3F7"):
            c = Circle(
                radius=0.42,
                fill_color=color,
                fill_opacity=1,
                stroke_color=stroke,
                stroke_width=2.5,
            ).move_to(pos)
            t = Text(label, font_size=18, color=WHITE).move_to(pos)
            return c, t

        # Draw A(5) and B(9) as children
        cA, tA = draw_node("A\n5",  np.array([-1.5, -1.2, 0]))
        cB, tB = draw_node("B\n9",  np.array([ 1.5, -1.2, 0]))
        cAB, tAB = draw_node("14", np.array([ 0.0,  0.5, 0]), color="#2E4A2E", stroke="#66BB6A")

        self.play(FadeOut(merge_desc))
        self.play(Create(cA), Write(tA), Create(cB), Write(tB))
        self.wait(0.5)

        arrow_note = Text("Extract A(5) and B(9) → merge → 14", font_size=20, color=YELLOW).to_edge(DOWN, buff=0.6)
        self.play(Write(arrow_note))

        edge_a = Line(cAB.get_center(), cA.get_center(), color=WHITE, stroke_width=2)
        edge_b = Line(cAB.get_center(), cB.get_center(), color=WHITE, stroke_width=2)
        self.play(Create(cAB), Write(tAB))
        self.play(Create(edge_a), Create(edge_b))
        self.wait(1.5)

        # Annotate edge labels (0 = left, 1 = right)
        lbl0 = Text("0", font_size=16, color=GRAY).move_to(edge_a.get_center() + LEFT * 0.2)
        lbl1 = Text("1", font_size=16, color=GRAY).move_to(edge_b.get_center() + RIGHT * 0.2)
        self.play(Write(lbl0), Write(lbl1))
        self.wait(1.0)

        first_merge_group = VGroup(cA, tA, cB, tB, cAB, tAB, edge_a, edge_b, lbl0, lbl1)
        self.play(FadeOut(first_merge_group), FadeOut(arrow_note))

        # ── Stage 4: Building the Full Huffman Tree ───────────────────────
        self.chapter_title("Step 3 — Full Tree Construction")

        build_text = Text(
            "Continue merging until only one node remains.\n"
            "That node becomes the root of the Huffman tree.",
            font_size=22,
            color=WHITE,
        ).to_edge(UP, buff=1.0)
        self.play(FadeIn(build_text))
        self.wait(1.5)
        self.play(FadeOut(build_text))

        # Draw the final Huffman tree for A(5),B(9),C(12),D(13),E(16),F(45)
        # Final tree (one valid construction):
        #            100
        #          /      \
        #        F(45)    55
        #               /    \
        #             25      30
        #            /  \    /  \
        #          A(5) B(9) C(12) D(13)   -- simplified for visual clarity
        #   Actually standard result:
        #            100
        #           /    \
        #         55     F(45)
        #        /   \
        #       25    30
        #      / \   / \
        #    A(5)B(9) C(12) D(13)  -- wait, 25=A+B=14, not 25
        # Let's use the correct standard Huffman for these 6 symbols:
        # Sorted: A5, B9, C12, D13, E16, F45
        # Merge A5+B9 -> AB14
        # Queue: C12, D13, AB14, E16, F45
        # Merge C12+D13 -> CD25
        # Queue: AB14, E16, CD25, F45
        # Merge AB14+E16 -> ABE30
        # Queue: CD25, ABE30, F45
        # Merge CD25+ABE30 -> CDABE55
        # Queue: F45, CDABE55
        # Merge F45+CDABE55 -> root100

        # Node positions for the final tree
        root_pos   = np.array([ 0.0,  2.8, 0])
        f_pos      = np.array([-3.0,  1.2, 0])
        cdabe_pos  = np.array([ 2.0,  1.2, 0])
        cd_pos     = np.array([ 0.8, -0.3, 0])
        abe_pos    = np.array([ 3.2, -0.3, 0])
        c_pos      = np.array([-0.2, -1.8, 0])
        d_pos      = np.array([ 1.8, -1.8, 0])
        ab_pos     = np.array([ 2.4, -1.8, 0])
        e_pos      = np.array([ 4.0, -1.8, 0])
        a_pos      = np.array([ 1.6, -3.2, 0])
        b_pos      = np.array([ 3.2, -3.2, 0])

        def make_node(label, pos, is_leaf=False):
            color = "#1E3A5F" if not is_leaf else "#2E1A47"
            stroke = "#4FC3F7" if not is_leaf else "#CE93D8"
            c = Circle(radius=0.36, fill_color=color, fill_opacity=1,
                       stroke_color=stroke, stroke_width=2).move_to(pos)
            t = Text(label, font_size=15, color=WHITE).move_to(pos)
            return c, t

        nodes = {
            "root":  make_node("100",  root_pos),
            "F":     make_node("F\n45", f_pos,     is_leaf=True),
            "55":    make_node("55",   cdabe_pos),
            "25":    make_node("25",   cd_pos),
            "30":    make_node("30",   abe_pos),
            "C":     make_node("C\n12", c_pos,     is_leaf=True),
            "D":     make_node("D\n13", d_pos,     is_leaf=True),
            "14":    make_node("14",   ab_pos),
            "E":     make_node("E\n16", e_pos,     is_leaf=True),
            "A":     make_node("A\n5",  a_pos,     is_leaf=True),
            "B":     make_node("B\n9",  b_pos,     is_leaf=True),
        }

        edges = [
            (root_pos, f_pos),
            (root_pos, cdabe_pos),
            (cdabe_pos, cd_pos),
            (cdabe_pos, abe_pos),
            (cd_pos, c_pos),
            (cd_pos, d_pos),
            (abe_pos, ab_pos),
            (abe_pos, e_pos),
            (ab_pos, a_pos),
            (ab_pos, b_pos),
        ]

        edge_mobs = VGroup()
        for start, end in edges:
            line = Line(start, end, color=GRAY, stroke_width=1.8)
            line.set_z_index(-1)
            edge_mobs.add(line)

        all_circles = VGroup(*[c for c, _ in nodes.values()])
        all_labels  = VGroup(*[t for _, t in nodes.values()])

        self.play(Create(edge_mobs), run_time=1.0)
        self.play(
            LaggedStart(*[Create(c) for c, _ in nodes.values()], lag_ratio=0.08),
            run_time=1.5,
        )
        self.play(
            LaggedStart(*[Write(t) for _, t in nodes.values()], lag_ratio=0.08),
            run_time=1.5,
        )
        self.wait(2.0)

        # ── Stage 5: Code Assignment (traversal) ──────────────────────────
        self.chapter_title("Step 4 — Assign Binary Codes")

        code_label = Text(
            "Traverse the tree: left edge = 0, right edge = 1",
            font_size=22,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.8)
        self.play(Write(code_label))
        self.wait(1.0)

        # Highlight path to F (left child of root) → code "0"
        cF, tF = nodes["F"]
        cRoot, tRoot = nodes["root"]
        self.play(cF.animate.set_stroke(color=GREEN, width=4), run_time=0.5)
        f_code = Text("F → 0", font_size=20, color=GREEN).to_edge(DOWN, buff=0.2)
        self.play(Write(f_code))
        self.wait(0.8)
        self.play(FadeOut(f_code))

        # Highlight path to E (root→right→right→right) → code "111"
        c55, _ = nodes["55"]
        c30, _ = nodes["30"]
        cE, _  = nodes["E"]
        for mob in [c55, c30, cE]:
            self.play(mob.animate.set_stroke(color=ORANGE, width=4), run_time=0.3)
        e_code = Text("E → 111", font_size=20, color=ORANGE).to_edge(DOWN, buff=0.2)
        self.play(Write(e_code))
        self.wait(0.8)
        self.play(FadeOut(e_code))

        self.wait(1.0)

        # Code table
        code_table_data = [
            ("F", "45", "0"),
            ("E", "16", "111"),
            ("C", "12", "100"),
            ("D", "13", "101"),
            ("A",  "5", "1100"),
            ("B",  "9", "1101"),
        ]
        table_header = Text("Symbol | Freq | Code", font_size=18, color=YELLOW).to_edge(RIGHT, buff=0.3).shift(UP * 2.0)
        self.play(Write(table_header))
        table_rows = VGroup()
        for sym, fr, code in code_table_data:
            row = Text(f"  {sym}    |  {fr}  | {code}", font_size=16, color=WHITE)
            table_rows.add(row)
        table_rows.arrange(DOWN, buff=0.15).next_to(table_header, DOWN, buff=0.2)
        for row in table_rows:
            self.play(Write(row), run_time=0.3)
        self.wait(2.0)

        self.play(
            FadeOut(edge_mobs),
            FadeOut(all_circles),
            FadeOut(all_labels),
            FadeOut(code_label),
            FadeOut(table_header),
            FadeOut(table_rows),
        )

        # ── Stage 6: Optimality Insight ───────────────────────────────────
        self.chapter_title("Why Huffman is Optimal")

        insight_lines = VGroup(
            Text("Greedy choice: always merge the two lowest-frequency nodes.", font_size=22, color=WHITE),
            Text("Proof: any other merge order yields a longer average code length.", font_size=22, color=WHITE),
            Text("Average code length = Σ (freq_i × depth_i) / total_freq", font_size=22, color=YELLOW),
            Text("Huffman achieves the theoretical entropy lower bound.", font_size=22, color=GREEN),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).center()

        for line in insight_lines:
            self.play(Write(line), run_time=0.7)
            self.wait(0.5)
        self.wait(2.0)
        self.play(FadeOut(insight_lines))

        # ── Stage 7: Complexity Card ──────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n log n)",
            space_complexity="O(n)",
        )
        self.wait(2.0)
