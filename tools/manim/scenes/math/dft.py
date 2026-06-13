from manim import *
from ...base import AlgoScene
from ...base.algo_scene import (
    COBALT, SIGNAL, CORAL, MIST, INK, GRAY, PAPER,
    C_ACTIVE, C_DEFAULT, C_SORTED,
)
import math


class Dft(AlgoScene):
    TITLE = "DFT / FFT"
    SUBTITLE = "Computes the Discrete Fourier Transform in O(n log n) using the Cooley-Tukey rad"
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_lines = VGroup(
            Text("Goal: Decompose a signal into its frequency components", font_size=26),
            Text("Naive DFT: O(n²) — multiply every input by every basis vector", font_size=22, color=GRAY),
            Text("FFT (Cooley-Tukey): O(n log n) — divide and conquer", font_size=22, color=COBALT),
            Text("Input: N complex numbers  →  Output: N frequency amplitudes", font_size=22),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in intro_lines], lag_ratio=0.2))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(intro_label))

        # ── Stage 2: DFT Formula ─────────────────────────────────────────────
        formula_label = self.chapter_title("The DFT Formula")
        self.wait(0.3)

        dft_formula = MathTex(
            r"X[k] = \sum_{n=0}^{N-1} x[n] \cdot e^{-j \frac{2\pi}{N} k n}",
            font_size=48,
            color=INK,
        ).move_to(ORIGIN + UP * 0.5)

        notation = VGroup(
            MathTex(r"x[n]", font_size=28, color=COBALT),
            Text(": input signal sample at index n", font_size=22, color=GRAY),
            MathTex(r"X[k]", font_size=28, color=CORAL),
            Text(": output frequency bin k", font_size=22, color=GRAY),
            MathTex(r"e^{-j 2\pi k n / N}", font_size=28, color=SIGNAL),
            Text(": twiddle factor (rotation in complex plane)", font_size=22, color=GRAY),
        )
        # Pair them into rows
        rows = VGroup()
        for i in range(0, len(notation), 2):
            row = VGroup(notation[i], notation[i + 1]).arrange(RIGHT, buff=0.2)
            rows.add(row)
        rows.arrange(DOWN, aligned_edge=LEFT, buff=0.18).next_to(dft_formula, DOWN, buff=0.5)

        self.play(Write(dft_formula))
        self.wait(0.8)
        self.play(LaggedStart(*[FadeIn(r, shift=UP * 0.1) for r in rows], lag_ratio=0.2))
        self.wait(2)
        self.play(FadeOut(dft_formula), FadeOut(rows), FadeOut(formula_label))

        # ── Stage 3: Divide-and-Conquer Idea ────────────────────────────────
        divide_label = self.chapter_title("Divide & Conquer — Split Even / Odd")
        self.wait(0.3)

        split_formula = MathTex(
            r"X[k] = \underbrace{\sum_{m=0}^{N/2-1} x[2m] \cdot W_N^{2mk}}_{\text{even-indexed DFT}}",
            r"+ W_N^k \cdot",
            r"\underbrace{\sum_{m=0}^{N/2-1} x[2m+1] \cdot W_N^{2mk}}_{\text{odd-indexed DFT}}",
            font_size=30,
            color=INK,
        ).move_to(ORIGIN + UP * 0.8)
        split_formula[0].set_color(COBALT)
        split_formula[2].set_color(CORAL)

        twiddle_note = MathTex(
            r"W_N^k = e^{-j 2\pi k / N} \quad \text{(twiddle factor)}",
            font_size=28,
            color=GRAY,
        ).next_to(split_formula, DOWN, buff=0.5)

        butterfly_note = Text(
            "Each level halves the problem → log₂(N) levels total",
            font_size=24,
            color=SIGNAL,
        ).next_to(twiddle_note, DOWN, buff=0.35)

        self.play(Write(split_formula))
        self.wait(0.8)
        self.play(FadeIn(twiddle_note, shift=UP * 0.1))
        self.wait(0.5)
        self.play(FadeIn(butterfly_note, shift=UP * 0.1))
        self.wait(2)
        self.play(FadeOut(split_formula), FadeOut(twiddle_note), FadeOut(butterfly_note), FadeOut(divide_label))

        # ── Stage 4: Butterfly Diagram (N=8) ────────────────────────────────
        butterfly_label = self.chapter_title("Butterfly Network  (N = 8)")
        self.wait(0.3)

        N = 8
        levels = int(math.log2(N))  # 3 levels
        node_radius = 0.12
        x_spacing = 1.8
        y_spacing = 0.65
        x_start = -3.5

        # Bit-reversal permutation for N=8: [0,4,2,6,1,5,3,7]
        bit_rev = [0, 4, 2, 6, 1, 5, 3, 7]

        # Create input dots
        input_dots = VGroup()
        input_labels = VGroup()
        for i in range(N):
            dot = Dot(
                point=np.array([x_start, (N / 2 - 0.5 - i) * y_spacing, 0]),
                radius=node_radius,
                color=COBALT,
            )
            lbl = MathTex(f"x[{bit_rev[i]}]", font_size=18, color=INK).next_to(dot, LEFT, buff=0.15)
            input_dots.add(dot)
            input_labels.add(lbl)

        self.play(
            LaggedStart(*[FadeIn(d) for d in input_dots], lag_ratio=0.07),
            LaggedStart(*[FadeIn(l) for l in input_labels], lag_ratio=0.07),
        )
        self.wait(0.5)

        # Draw level-by-level butterfly connections
        level_colors = [COBALT, CORAL, SIGNAL]
        all_level_lines = []
        current_x = x_start

        for lvl in range(levels):
            current_x += x_spacing
            stride = 2 ** (lvl + 1)
            half = stride // 2
            level_lines = VGroup()

            for group_start in range(0, N, stride):
                for k in range(half):
                    top_y = (N / 2 - 0.5 - (group_start + k)) * y_spacing
                    bot_y = (N / 2 - 0.5 - (group_start + k + half)) * y_spacing
                    prev_x = current_x - x_spacing

                    # Straight lines (pass-through)
                    line_top = Line(
                        start=np.array([prev_x, top_y, 0]),
                        end=np.array([current_x, top_y, 0]),
                        color=level_colors[lvl],
                        stroke_width=1.5,
                    )
                    # Cross line (butterfly)
                    line_cross = Line(
                        start=np.array([prev_x, bot_y, 0]),
                        end=np.array([current_x, top_y, 0]),
                        color=level_colors[lvl],
                        stroke_width=1.0,
                        stroke_opacity=0.6,
                    )
                    line_bot = Line(
                        start=np.array([prev_x, bot_y, 0]),
                        end=np.array([current_x, bot_y, 0]),
                        color=level_colors[lvl],
                        stroke_width=1.5,
                    )
                    level_lines.add(line_top, line_cross, line_bot)

            level_label = Text(f"Level {lvl + 1}", font_size=16, color=level_colors[lvl]).move_to(
                np.array([current_x, (N / 2) * y_spacing + 0.3, 0])
            )
            all_level_lines.append(VGroup(level_lines, level_label))
            self.play(Create(level_lines), FadeIn(level_label), run_time=0.7)
            self.wait(0.5)

        # Output dots
        out_x = x_start + levels * x_spacing
        output_dots = VGroup()
        output_labels = VGroup()
        for i in range(N):
            dot = Dot(
                point=np.array([out_x, (N / 2 - 0.5 - i) * y_spacing, 0]),
                radius=node_radius,
                color=SIGNAL,
            )
            lbl = MathTex(f"X[{i}]", font_size=18, color=INK).next_to(dot, RIGHT, buff=0.15)
            output_dots.add(dot)
            output_labels.add(lbl)

        self.play(
            LaggedStart(*[FadeIn(d) for d in output_dots], lag_ratio=0.07),
            LaggedStart(*[FadeIn(l) for l in output_labels], lag_ratio=0.07),
        )
        self.wait(2)

        all_butterfly = VGroup(
            input_dots, input_labels, output_dots, output_labels,
            *[g for g in all_level_lines],
        )
        self.play(FadeOut(all_butterfly), FadeOut(butterfly_label))

        # ── Stage 5: Frequency Spectrum Visualization ────────────────────────
        spectrum_label = self.chapter_title("Frequency Spectrum Output")
        self.wait(0.3)

        # Simulate a simple spectrum (4 Hz signal + noise) for N=16
        n_pts = 16
        freqs = list(range(n_pts // 2))
        # Fake magnitudes: peak at k=2 and k=5
        magnitudes = [0.1, 0.15, 0.9, 0.12, 0.08, 0.75, 0.1, 0.05]

        bar_width = 0.4
        bar_max_height = 2.5
        bars = VGroup()
        bar_labels = VGroup()
        base_y = -1.5

        for i, mag in enumerate(magnitudes):
            bh = mag * bar_max_height
            bar = Rectangle(
                width=bar_width,
                height=bh,
                fill_color=COBALT if mag < 0.5 else SIGNAL,
                fill_opacity=0.85,
                stroke_width=0,
            )
            bar.move_to(np.array([-2.8 + i * 0.75, base_y + bh / 2, 0]))
            lbl = Text(str(i), font_size=14, color=GRAY).next_to(bar, DOWN, buff=0.1)
            bars.add(bar)
            bar_labels.add(lbl)

        axis_line = Line(
            start=np.array([-3.2, base_y, 0]),
            end=np.array([3.2, base_y, 0]),
            color=INK,
            stroke_width=2,
        )
        x_axis_label = Text("Frequency bin k", font_size=20, color=GRAY).next_to(axis_line, DOWN, buff=0.35)
        y_axis_label = Text("|X[k]|", font_size=20, color=GRAY).rotate(PI / 2).move_to(np.array([-3.5, base_y + 1.2, 0]))

        self.play(Create(axis_line), FadeIn(x_axis_label), FadeIn(y_axis_label))
        self.play(
            LaggedStart(*[GrowFromEdge(b, DOWN) for b in bars], lag_ratio=0.1),
            LaggedStart(*[FadeIn(l) for l in bar_labels], lag_ratio=0.1),
        )

        # Annotate dominant frequencies
        peak_annotations = VGroup()
        for i, mag in enumerate(magnitudes):
            if mag >= 0.5:
                ann = Text(f"k={i}", font_size=18, color=CORAL).next_to(bars[i], UP, buff=0.1)
                peak_annotations.add(ann)

        self.play(LaggedStart(*[FadeIn(a) for a in peak_annotations], lag_ratio=0.3))
        self.wait(2)

        spectrum_group = VGroup(bars, bar_labels, axis_line, x_axis_label, y_axis_label, peak_annotations)
        self.play(FadeOut(spectrum_group), FadeOut(spectrum_label))

        # ── Stage 6: Cooley-Tukey Recursion Tree ────────────────────────────
        recursion_label = self.chapter_title("Recursion Tree  (N = 8)")
        self.wait(0.3)

        # Draw a simple 3-level recursion tree
        tree_nodes = []
        tree_edges = []

        def make_node(text, pos, color=COBALT, fs=20):
            box = RoundedRectangle(
                width=1.4, height=0.45, corner_radius=0.1,
                fill_color=color, fill_opacity=0.2,
                stroke_color=color, stroke_width=1.5,
            ).move_to(pos)
            lbl = Text(text, font_size=fs, color=color).move_to(pos)
            return VGroup(box, lbl)

        # Level 0: root
        root = make_node("FFT(8)", UP * 2.5, COBALT, 22)
        # Level 1
        l1_left = make_node("FFT(4)\neven", UP * 0.8 + LEFT * 2.5, CORAL, 18)
        l1_right = make_node("FFT(4)\nodd", UP * 0.8 + RIGHT * 2.5, CORAL, 18)
        # Level 2
        l2_nodes = [
            make_node("FFT(2)", DOWN * 0.8 + LEFT * 3.8, SIGNAL, 16),
            make_node("FFT(2)", DOWN * 0.8 + LEFT * 1.2, SIGNAL, 16),
            make_node("FFT(2)", DOWN * 0.8 + RIGHT * 1.2, SIGNAL, 16),
            make_node("FFT(2)", DOWN * 0.8 + RIGHT * 3.8, SIGNAL, 16),
        ]
        # Level 3: base cases
        base_positions = [LEFT * 4.3, LEFT * 3.3, LEFT * 1.7, LEFT * 0.7,
                          RIGHT * 0.7, RIGHT * 1.7, RIGHT * 3.3, RIGHT * 4.3]
        base_nodes = [make_node("x[·]", DOWN * 2.1 + p, GRAY, 14) for p in base_positions]

        # Edges
        edges = VGroup(
            Arrow(root.get_bottom(), l1_left.get_top(), buff=0.05, stroke_width=1.5, color=GRAY, tip_length=0.15),
            Arrow(root.get_bottom(), l1_right.get_top(), buff=0.05, stroke_width=1.5, color=GRAY, tip_length=0.15),
        )
        for i, n in enumerate(l2_nodes):
            parent = l1_left if i < 2 else l1_right
            edges.add(Arrow(parent.get_bottom(), n.get_top(), buff=0.05, stroke_width=1.2, color=GRAY, tip_length=0.12))
        for i, bn in enumerate(base_nodes):
            parent = l2_nodes[i // 2]
            edges.add(Arrow(parent.get_bottom(), bn.get_top(), buff=0.05, stroke_width=1.0, color=GRAY, tip_length=0.1))

        all_nodes = VGroup(root, l1_left, l1_right, *l2_nodes, *base_nodes)

        self.play(FadeIn(root))
        self.wait(0.3)
        self.play(FadeIn(edges[:2]), FadeIn(l1_left), FadeIn(l1_right))
        self.wait(0.3)
        self.play(FadeIn(edges[2:6]), LaggedStart(*[FadeIn(n) for n in l2_nodes], lag_ratio=0.1))
        self.wait(0.3)
        self.play(FadeIn(edges[6:]), LaggedStart(*[FadeIn(n) for n in base_nodes], lag_ratio=0.05))
        self.wait(1.5)

        # Highlight the log(N) levels
        level_brace_labels = VGroup(
            Text("log₂(8) = 3 levels", font_size=22, color=SIGNAL).to_edge(RIGHT, buff=0.5).shift(UP * 0.5),
            Text("N/2 butterflies each", font_size=20, color=COBALT).to_edge(RIGHT, buff=0.5).shift(DOWN * 0.2),
        )
        self.play(FadeIn(level_brace_labels))
        self.wait(1.5)

        self.play(FadeOut(all_nodes), FadeOut(edges), FadeOut(level_brace_labels), FadeOut(recursion_label))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best=r"O(n \log n)",
            time_avg=r"O(n \log n)",
            time_worst=r"O(n \log n)",
            space=r"O(n)",
        )
        self.wait(2)
