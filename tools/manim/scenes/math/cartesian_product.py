from manim import *
from ...base import AlgoScene

# Palette aliases
COBALT = "#2255CC"
SIGNAL = "#CEEB5A"
CORAL  = "#E05A3A"
MIST   = "#DDE4F0"
INK    = "#1A1C2C"
GRAY   = "#888899"
PAPER  = "#F5F0E8"


class CartesianProduct(AlgoScene):
    TITLE    = "Cartesian Product"
    SUBTITLE = "Compute the Cartesian product of two sets, producing all ordered pairs."
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.4)

        intro_text = VGroup(
            Text("Given two sets A and B,", font_size=30, color=INK),
            Text("A × B = { (a, b) | a ∈ A, b ∈ B }", font_size=28, color=COBALT),
            Text("Every element of A is paired with every element of B.", font_size=26, color=GRAY),
            Text("|A × B| = |A| × |B|  ordered pairs in total.", font_size=26, color=CORAL),
        ).arrange(DOWN, buff=0.45).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro_text), FadeOut(intro_label))
        self.wait(0.2)

        # ── Stage 2: Draw the two input sets ────────────────────────────────
        sets_label = self.chapter_title("The Two Input Sets")
        self.wait(0.3)

        set_a_values = ["1", "2", "3"]
        set_b_values = ["x", "y"]

        # Set A ellipse + elements
        ellipse_a = Ellipse(width=2.2, height=3.2, color=COBALT, stroke_width=3)
        ellipse_a.move_to(LEFT * 3.5)
        label_a = Text("A", font_size=36, color=COBALT, weight="BOLD").next_to(ellipse_a, UP, buff=0.15)

        dots_a = VGroup()
        for i, v in enumerate(set_a_values):
            d = Text(v, font_size=28, color=INK)
            d.move_to(ellipse_a.get_center() + UP * (0.8 - i * 0.8))
            dots_a.add(d)

        # Set B ellipse + elements
        ellipse_b = Ellipse(width=2.2, height=2.6, color=CORAL, stroke_width=3)
        ellipse_b.move_to(RIGHT * 3.5)
        label_b = Text("B", font_size=36, color=CORAL, weight="BOLD").next_to(ellipse_b, UP, buff=0.15)

        dots_b = VGroup()
        for i, v in enumerate(set_b_values):
            d = Text(v, font_size=28, color=INK)
            d.move_to(ellipse_b.get_center() + UP * (0.5 - i * 1.0))
            dots_b.add(d)

        self.play(
            Create(ellipse_a), Write(label_a),
            Create(ellipse_b), Write(label_b),
        )
        self.play(
            LaggedStart(*[FadeIn(d, scale=0.8) for d in dots_a], lag_ratio=0.15),
            LaggedStart(*[FadeIn(d, scale=0.8) for d in dots_b], lag_ratio=0.2),
        )
        self.wait(1.5)

        size_note = Text(
            "|A| = 3,  |B| = 2  →  |A × B| = 6 pairs",
            font_size=24, color=GRAY,
        ).to_edge(DOWN, buff=0.4)
        self.play(Write(size_note))
        self.wait(1.5)
        self.play(FadeOut(size_note), FadeOut(sets_label))

        # ── Stage 3: Build the result grid ──────────────────────────────────
        grid_label = self.chapter_title("Result Grid  A × B")
        self.wait(0.3)

        # Fade out sets, show grid scaffold
        self.play(
            FadeOut(ellipse_a), FadeOut(label_a), FadeOut(dots_a),
            FadeOut(ellipse_b), FadeOut(label_b), FadeOut(dots_b),
        )

        # Column headers (B values)
        col_headers = VGroup()
        for j, bv in enumerate(set_b_values):
            h = Text(bv, font_size=26, color=CORAL, weight="BOLD")
            h.move_to(UP * 1.8 + RIGHT * (-1.5 + j * 2.2))
            col_headers.add(h)

        # Row headers (A values)
        row_headers = VGroup()
        for i, av in enumerate(set_a_values):
            h = Text(av, font_size=26, color=COBALT, weight="BOLD")
            h.move_to(LEFT * 2.8 + DOWN * (i * 1.1 - 0.5))
            row_headers.add(h)

        self.play(
            LaggedStart(*[FadeIn(h) for h in col_headers], lag_ratio=0.2),
            LaggedStart(*[FadeIn(h) for h in row_headers], lag_ratio=0.2),
        )
        self.wait(0.8)

        # ── Stage 4: Enumerate pairs row by row ─────────────────────────────
        pairs_label = self.chapter_title("Enumerate All Pairs")
        self.wait(0.3)

        pair_cells = VGroup()
        pair_mobs  = {}
        for i, av in enumerate(set_a_values):
            for j, bv in enumerate(set_b_values):
                cell_bg = RoundedRectangle(
                    width=1.9, height=0.85, corner_radius=0.12,
                    color=MIST, fill_color=MIST, fill_opacity=1, stroke_width=0,
                )
                cell_bg.move_to(RIGHT * (-1.5 + j * 2.2) + DOWN * (i * 1.1 - 0.5))
                pair_text = Text(f"({av},{bv})", font_size=22, color=INK)
                pair_text.move_to(cell_bg.get_center())
                cell = VGroup(cell_bg, pair_text)
                pair_cells.add(cell)
                pair_mobs[(i, j)] = cell

        # Animate row by row
        for i in range(len(set_a_values)):
            row_anims = []
            for j in range(len(set_b_values)):
                cell = pair_mobs[(i, j)]
                # Highlight the source row header
                row_anims.append(FadeIn(cell, scale=0.85))
            self.play(LaggedStart(*row_anims, lag_ratio=0.25))
            self.wait(0.6)

        self.wait(1.0)
        self.play(FadeOut(pairs_label))

        # ── Stage 5: Highlight one row to show the nested-loop structure ────
        loop_label = self.chapter_title("Nested-Loop Structure")
        self.wait(0.3)

        # Highlight row 0 (pairs with A[0] = "1")
        for j in range(len(set_b_values)):
            cell = pair_mobs[(0, j)]
            bg_copy = cell[0].copy().set_fill(SIGNAL, opacity=0.7)
            self.play(Transform(cell[0], bg_copy), run_time=0.4)

        caption_loop = Text(
            "Outer loop fixes a ∈ A;  inner loop iterates b ∈ B",
            font_size=24, color=GRAY,
        ).to_edge(DOWN, buff=0.4)
        self.play(Write(caption_loop))
        self.wait(1.5)

        # Restore and highlight row 1
        for j in range(len(set_b_values)):
            cell = pair_mobs[(0, j)]
            bg_restore = cell[0].copy().set_fill(MIST, opacity=1)
            self.play(Transform(cell[0], bg_restore), run_time=0.3)

        for j in range(len(set_b_values)):
            cell = pair_mobs[(1, j)]
            bg_copy = cell[0].copy().set_fill(SIGNAL, opacity=0.7)
            self.play(Transform(cell[0], bg_copy), run_time=0.4)

        self.wait(1.2)
        self.play(FadeOut(caption_loop), FadeOut(loop_label))

        # ── Stage 6: Show final collected result ────────────────────────────
        result_label = self.chapter_title("Final Result Set")
        self.wait(0.3)

        self.play(
            FadeOut(pair_cells),
            FadeOut(col_headers),
            FadeOut(row_headers),
        )

        all_pairs = [
            "(1,x)", "(1,y)",
            "(2,x)", "(2,y)",
            "(3,x)", "(3,y)",
        ]
        result_mobs = VGroup()
        for k, p in enumerate(all_pairs):
            bg = RoundedRectangle(
                width=1.7, height=0.8, corner_radius=0.1,
                color=SIGNAL, fill_color=SIGNAL, fill_opacity=0.85, stroke_width=0,
            )
            txt = Text(p, font_size=22, color=INK, weight="BOLD")
            txt.move_to(bg.get_center())
            cell = VGroup(bg, txt)
            row = k // 3
            col = k % 3
            cell.move_to(RIGHT * (-2.2 + col * 2.2) + DOWN * (row * 1.1 - 0.4))
            result_mobs.add(cell)

        self.play(LaggedStart(*[FadeIn(c, scale=0.9) for c in result_mobs], lag_ratio=0.12))
        self.wait(0.8)

        result_caption = Text(
            "A × B = { (1,x), (1,y), (2,x), (2,y), (3,x), (3,y) }",
            font_size=22, color=COBALT,
        ).to_edge(DOWN, buff=0.4)
        self.play(Write(result_caption))
        self.wait(2.0)
        self.play(FadeOut(result_mobs), FadeOut(result_caption), FadeOut(result_label))

        # ── Stage 7: Complexity card ─────────────────────────────────────────
        self.chapter_title("Complexity Summary")
        self.wait(0.3)
        self.complexity_card(
            time_best=r"O(|A| \cdot |B|)",
            time_avg=r"O(|A| \cdot |B|)",
            time_worst=r"O(|A| \cdot |B|)",
            space=r"O(|A| \cdot |B|)",
        )
        self.wait(2.5)
