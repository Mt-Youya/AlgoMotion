from manim import *
from ...base import AlgoScene, ArrayVis


class BloomFilter(AlgoScene):
    TITLE = "Bloom Filter"
    SUBTITLE = "Space-efficient probabilistic membership testing with possible false positives."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is a Bloom Filter?")

        intro_lines = VGroup(
            Text("A Bloom Filter is a probabilistic data structure", font_size=28),
            Text("that tests whether an element is a member of a set.", font_size=28),
            Text("It may return false positives, but never false negatives.", font_size=28, color=YELLOW),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, lag_ratio=0.3))
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Bit Array Visualization ───────────────────────────
        self.chapter_title("The Bit Array")

        bit_label = Text("Bit Array  (m = 16 bits)", font_size=26, color=BLUE_B).to_edge(UP, buff=1.4)
        self.play(Write(bit_label))

        m = 16
        bit_squares = VGroup(*[
            Square(side_length=0.55, fill_color=DARK_GRAY, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
            for _ in range(m)
        ]).arrange(RIGHT, buff=0.08).move_to(ORIGIN)

        bit_indices = VGroup(*[
            Text(str(i), font_size=14, color=GRAY).next_to(bit_squares[i], DOWN, buff=0.1)
            for i in range(m)
        ])

        self.play(FadeIn(bit_squares), FadeIn(bit_indices))
        self.wait(1)

        # ── Stage 3: Hash Functions ─────────────────────────────────────
        self.chapter_title("Hash Functions")

        hash_info = VGroup(
            Text("k = 3 hash functions: h1, h2, h3", font_size=26, color=GREEN),
            Text("Each maps an element to a bit position", font_size=24),
        ).arrange(DOWN, buff=0.3).to_edge(UP, buff=1.4)

        self.play(Transform(bit_label, hash_info))
        self.wait(1)

        # ── Stage 4: Insert Elements ────────────────────────────────────
        self.chapter_title("Inserting Elements")

        # Simulated hash positions for elements
        elements = {
            "\"apple\"": ([1, 5, 11], ORANGE),
            "\"cat\"":   ([3, 7, 13], TEAL),
            "\"dog\"":   ([2, 5, 9],  PURPLE),
        }

        set_bits = set()

        for word, (positions, color) in elements.items():
            elem_text = Text(f"Insert {word}", font_size=26, color=color).to_edge(LEFT, buff=0.5).shift(UP * 1.5)
            self.play(Write(elem_text))

            arrows = VGroup()
            for pos in positions:
                arrow = Arrow(
                    elem_text.get_right(),
                    bit_squares[pos].get_top(),
                    buff=0.05,
                    color=color,
                    stroke_width=2,
                    max_tip_length_to_length_ratio=0.15,
                )
                arrows.add(arrow)

            self.play(LaggedStart(*[GrowArrow(a) for a in arrows], lag_ratio=0.25))
            self.wait(0.4)

            anims = []
            for pos in positions:
                if pos not in set_bits:
                    set_bits.add(pos)
                    anims.append(bit_squares[pos].animate.set_fill(color, opacity=1))
                else:
                    anims.append(Indicate(bit_squares[pos], color=YELLOW))

            self.play(*anims)
            self.wait(0.6)
            self.play(FadeOut(arrows), FadeOut(elem_text))

        self.wait(1)

        # ── Stage 5: Membership Query (True Positive) ──────────────────
        self.chapter_title("Querying: True Positive")

        query_text = Text('Query: "apple"  →  positions [1, 5, 11]', font_size=24, color=ORANGE).to_edge(UP, buff=1.3)
        self.play(Write(query_text))
        self.wait(0.5)

        check_anims = []
        for pos in [1, 5, 11]:
            check_anims.append(Indicate(bit_squares[pos], color=GREEN, scale_factor=1.4))
        self.play(LaggedStart(*check_anims, lag_ratio=0.4))

        result_yes = Text("All bits set → PROBABLY IN SET ✓", font_size=26, color=GREEN).next_to(bit_squares, DOWN, buff=0.6)
        self.play(FadeIn(result_yes))
        self.wait(1.5)
        self.play(FadeOut(query_text), FadeOut(result_yes))

        # ── Stage 6: False Positive ─────────────────────────────────────
        self.chapter_title("False Positive Demonstration")

        fp_text = Text('Query: "fish"  →  positions [2, 5, 7]', font_size=24, color=RED_B).to_edge(UP, buff=1.3)
        self.play(Write(fp_text))
        self.wait(0.5)

        # positions 2, 5, 7 are all set (from "dog" and "cat")
        check_anims2 = []
        for pos in [2, 5, 7]:
            check_anims2.append(Indicate(bit_squares[pos], color=YELLOW, scale_factor=1.4))
        self.play(LaggedStart(*check_anims2, lag_ratio=0.4))

        fp_result = VGroup(
            Text("All bits set → PROBABLY IN SET?", font_size=26, color=YELLOW),
            Text('"fish" was NEVER inserted → FALSE POSITIVE!', font_size=24, color=RED),
        ).arrange(DOWN, buff=0.25).next_to(bit_squares, DOWN, buff=0.5)

        self.play(FadeIn(fp_result, lag_ratio=0.4))
        self.wait(2)
        self.play(FadeOut(fp_text), FadeOut(fp_result))

        # ── Stage 7: Definite Negative ──────────────────────────────────
        self.chapter_title("Definite Negative")

        neg_text = Text('Query: "xyz"  →  positions [0, 4, 15]', font_size=24, color=BLUE).to_edge(UP, buff=1.3)
        self.play(Write(neg_text))
        self.wait(0.5)

        check_anims3 = []
        for pos in [0, 4, 15]:
            check_anims3.append(Indicate(bit_squares[pos], color=RED, scale_factor=1.4))
        self.play(LaggedStart(*check_anims3, lag_ratio=0.4))

        neg_result = Text("At least one bit is 0 → DEFINITELY NOT IN SET ✗", font_size=24, color=BLUE).next_to(bit_squares, DOWN, buff=0.6)
        self.play(FadeIn(neg_result))
        self.wait(1.5)
        self.play(FadeOut(neg_text), FadeOut(neg_result), FadeOut(bit_squares), FadeOut(bit_indices), FadeOut(bit_label))

        # ── Stage 8: False Positive Rate Formula ───────────────────────
        self.chapter_title("False Positive Rate")

        formula_group = VGroup(
            Text("False Positive Probability:", font_size=28, color=BLUE_B),
            MathTex(r"p \approx \left(1 - e^{-kn/m}\right)^k", font_size=48),
            VGroup(
                Text("k = number of hash functions", font_size=22, color=GREEN),
                Text("n = number of inserted elements", font_size=22, color=ORANGE),
                Text("m = bit array size", font_size=22, color=TEAL),
            ).arrange(DOWN, buff=0.2),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(formula_group[0]))
        self.play(Write(formula_group[1]))
        self.play(FadeIn(formula_group[2], lag_ratio=0.3))
        self.wait(2)

        optimal_k = VGroup(
            Text("Optimal k:", font_size=26, color=YELLOW),
            MathTex(r"k = \frac{m}{n} \ln 2", font_size=40),
        ).arrange(RIGHT, buff=0.4).next_to(formula_group, DOWN, buff=0.5)

        self.play(FadeIn(optimal_k))
        self.wait(2)
        self.play(FadeOut(formula_group), FadeOut(optimal_k))

        # ── Stage 9: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexities={
                "Insert": "O(k)",
                "Lookup": "O(k)",
                "Delete": "N/A",
            },
            space_complexity="O(m)",
            notes="k = hash functions, m = bit array size. No false negatives guaranteed.",
        )
        self.wait(2)
