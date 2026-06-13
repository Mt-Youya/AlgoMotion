from manim import *
from ...base import AlgoScene


class SieveOfEratosthenes(AlgoScene):
    TITLE = "Sieve of Eratosthenes"
    SUBTITLE = "Finds all prime numbers up to n by iteratively marking the multiples of each pri"
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        title_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Goal: Find all prime numbers up to N", font_size=28),
            Text("A prime has exactly 2 divisors: 1 and itself", font_size=24, color=YELLOW),
            Text("The Sieve eliminates composites efficiently", font_size=24),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(title_label))

        # ── Stage 2: Build the number grid (2..30) ──────────────────────────
        n = 30
        numbers = list(range(2, n + 1))

        stage2_label = self.chapter_title("Build the Number Grid")
        self.wait(0.3)

        cols = 10
        cell_size = 0.6
        cells = VGroup()
        cell_map = {}

        for i, num in enumerate(numbers):
            row = i // cols
            col = i % cols
            rect = Square(side_length=cell_size, color=WHITE, fill_opacity=0.1)
            rect.move_to(
                LEFT * (cols / 2 - 0.5 - col) * cell_size
                + DOWN * (row - 0.5) * cell_size
                + UP * 0.5
            )
            label = Text(str(num), font_size=18).move_to(rect.get_center())
            cell = VGroup(rect, label)
            cells.add(cell)
            cell_map[num] = cell

        self.play(LaggedStart(*[FadeIn(c) for c in cells], lag_ratio=0.05))
        self.wait(1.5)
        self.play(FadeOut(stage2_label))

        # ── Stage 3: Mark multiples of 2 ────────────────────────────────────
        stage3_label = self.chapter_title("Step 1 — Cross out multiples of 2")
        self.wait(0.3)

        highlight_2 = cell_map[2][0].copy()
        highlight_2.set_fill(GREEN, opacity=0.6)
        self.play(Transform(cell_map[2][0], highlight_2))

        anims = []
        for num in range(4, n + 1, 2):
            rect_copy = cell_map[num][0].copy()
            rect_copy.set_fill(RED, opacity=0.5)
            anims.append(Transform(cell_map[num][0], rect_copy))

        self.play(LaggedStart(*anims, lag_ratio=0.08))
        self.wait(1.5)
        self.play(FadeOut(stage3_label))

        # ── Stage 4: Mark multiples of 3 ────────────────────────────────────
        stage4_label = self.chapter_title("Step 2 — Cross out multiples of 3")
        self.wait(0.3)

        highlight_3 = cell_map[3][0].copy()
        highlight_3.set_fill(GREEN, opacity=0.6)
        self.play(Transform(cell_map[3][0], highlight_3))

        anims = []
        for num in range(9, n + 1, 3):
            if num % 2 != 0:
                rect_copy = cell_map[num][0].copy()
                rect_copy.set_fill(ORANGE, opacity=0.5)
                anims.append(Transform(cell_map[num][0], rect_copy))

        if anims:
            self.play(LaggedStart(*anims, lag_ratio=0.1))
        self.wait(1.5)
        self.play(FadeOut(stage4_label))

        # ── Stage 5: Mark multiples of 5 ────────────────────────────────────
        stage5_label = self.chapter_title("Step 3 — Cross out multiples of 5")
        self.wait(0.3)

        highlight_5 = cell_map[5][0].copy()
        highlight_5.set_fill(GREEN, opacity=0.6)
        self.play(Transform(cell_map[5][0], highlight_5))

        anims = []
        for num in range(25, n + 1, 5):
            if num % 2 != 0 and num % 3 != 0:
                rect_copy = cell_map[num][0].copy()
                rect_copy.set_fill(PURPLE, opacity=0.5)
                anims.append(Transform(cell_map[num][0], rect_copy))

        if anims:
            self.play(LaggedStart(*anims, lag_ratio=0.1))
        self.wait(1.5)
        self.play(FadeOut(stage5_label))

        # ── Stage 6: Highlight surviving primes ─────────────────────────────
        stage6_label = self.chapter_title("Remaining Numbers Are Prime!")
        self.wait(0.3)

        primes_up_to_30 = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29}
        prime_anims = []
        for num in numbers:
            if num in primes_up_to_30:
                rect_copy = cell_map[num][0].copy()
                rect_copy.set_fill(GREEN, opacity=0.8)
                rect_copy.set_stroke(YELLOW, width=2)
                prime_anims.append(Transform(cell_map[num][0], rect_copy))

        self.play(LaggedStart(*prime_anims, lag_ratio=0.08))

        prime_list = Text(
            "Primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29",
            font_size=22,
            color=YELLOW,
        ).to_edge(DOWN, buff=0.3)
        self.play(Write(prime_list))
        self.wait(2)
        self.play(FadeOut(stage6_label), FadeOut(prime_list), FadeOut(cells))

        # ── Stage 7: Complexity card ─────────────────────────────────────────
        self.complexity_card(
            time_best="O(n log log n)",
            time_avg="O(n log log n)",
            time_worst="O(n log log n)",
            space="O(n)",
        )
        self.wait(2)
