from manim import *
from ...base import AlgoScene, ArrayVis


class RabinKarp(AlgoScene):
    TITLE = "Rabin-Karp"
    SUBTITLE = "Uses a rolling polynomial hash to compare the pattern against every window of th"
    CATEGORY = "string"

    # Colour aliases
    C_WINDOW  = "#2255CC"   # cobalt — active window
    C_MATCH   = "#CEEB5A"   # signal — confirmed match
    C_HASH_A  = "#F0A030"   # orange — pattern hash
    C_HASH_B  = "#8855CC"   # purple — window hash
    C_MISMATCH = "#E05A3A"  # coral  — hash collision / mismatch

    # ── helpers ───────────────────────────────────────────────────────────────

    def _char_row(self, text: str, *, cell_size: float = 0.72, color: str = "#1A1C2C") -> VGroup:
        """Return a VGroup of Square + Text for each character."""
        cells = VGroup()
        for ch in text:
            sq = Square(
                side_length=cell_size,
                color=color,
                fill_color="#DDE4F0",
                fill_opacity=1,
                stroke_width=2,
            )
            lbl = Text(ch, font_size=26, color="#1A1C2C", weight="BOLD")
            lbl.move_to(sq)
            cells.add(VGroup(sq, lbl))
        cells.arrange(RIGHT, buff=0.06)
        return cells

    def _hash_label(self, val: int, color: str = "#1A1C2C") -> Text:
        return Text(f"hash = {val}", font_size=24, color=color)

    def _poly_hash(self, s: str, base: int = 31, mod: int = 101) -> int:
        h = 0
        for ch in s:
            h = (h * base + ord(ch) - ord('a') + 1) % mod
        return h

    def _rolling_hash(self, old_hash: int, remove_ch: str, add_ch: str,
                      window_len: int, base: int = 31, mod: int = 101) -> int:
        power = pow(base, window_len - 1, mod)
        h = (old_hash - (ord(remove_ch) - ord('a') + 1) * power) % mod
        h = (h * base + (ord(add_ch) - ord('a') + 1)) % mod
        return h

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self):
        TEXT    = "abcacabab"
        PATTERN = "cab"
        BASE    = 31
        MOD     = 101
        m       = len(PATTERN)

        # ── Stage 1: Problem Setup ────────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        t_label = Text("text:", font_size=28, color="#888899").shift(LEFT * 5.2 + UP * 1.6)
        p_label = Text("pattern:", font_size=28, color="#888899").shift(LEFT * 5.2 + DOWN * 0.2)

        t_row = self._char_row(TEXT)
        t_row.next_to(t_label, RIGHT, buff=0.3)

        p_row = self._char_row(PATTERN, color="#2255CC")
        p_row.next_to(p_label, RIGHT, buff=0.3)

        goal = Text(
            "Find all occurrences of pattern in text using hashing",
            font_size=22, color="#888899",
        ).shift(DOWN * 2.0)

        self.play(
            Write(t_label),
            LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in t_row], lag_ratio=0.07),
        )
        self.play(
            Write(p_label),
            LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in p_row], lag_ratio=0.1),
        )
        self.play(FadeIn(goal, shift=UP * 0.15))
        self.wait(1.5)
        self.play(FadeOut(goal))
        self.play(FadeOut(ch1))

        # ── Stage 2: Compute Pattern Hash ────────────────────────────────────
        ch2 = self.chapter_title("Compute Pattern Hash")

        formula = MathTex(
            r"h(s) = \sum_{i=0}^{m-1} s[i] \cdot b^{m-1-i} \pmod{q}",
            font_size=32, color="#1A1C2C",
        ).shift(DOWN * 0.8)

        params = Text(
            f"base b = {BASE},  modulus q = {MOD}",
            font_size=24, color="#888899",
        ).next_to(formula, DOWN, buff=0.35)

        self.play(Write(formula))
        self.play(FadeIn(params, shift=UP * 0.1))
        self.wait(1.2)

        pat_hash_val = self._poly_hash(PATTERN, BASE, MOD)
        pat_hash_lbl = Text(
            f"hash(\"{PATTERN}\") = {pat_hash_val}",
            font_size=28, color=self.C_HASH_A,
        ).shift(DOWN * 2.2)

        # Highlight pattern cells one by one
        for cell in p_row:
            self.play(cell[0].animate.set_fill(self.C_HASH_A, opacity=0.55), run_time=0.25)
        self.play(Write(pat_hash_lbl))
        self.wait(1.2)

        self.play(FadeOut(formula), FadeOut(params), FadeOut(pat_hash_lbl))
        # Reset pattern colours
        for cell in p_row:
            self.play(cell[0].animate.set_fill("#DDE4F0", opacity=1), run_time=0.15)
        self.play(FadeOut(ch2))

        # ── Stage 3: First Window Hash ────────────────────────────────────────
        ch3 = self.chapter_title("First Window Hash")

        # Highlight first window in text
        first_window = TEXT[:m]
        win_hash_val = self._poly_hash(first_window, BASE, MOD)

        for i in range(m):
            self.play(t_row[i][0].animate.set_fill(self.C_WINDOW, opacity=0.55), run_time=0.2)

        win_hash_lbl = Text(
            f"hash(\"{first_window}\") = {win_hash_val}",
            font_size=26, color=self.C_HASH_B,
        ).shift(DOWN * 1.2)

        pat_hash_ref = Text(
            f"hash(\"{PATTERN}\") = {pat_hash_val}",
            font_size=26, color=self.C_HASH_A,
        ).shift(DOWN * 1.9)

        self.play(Write(win_hash_lbl))
        self.play(Write(pat_hash_ref))
        self.wait(0.8)

        # Compare
        if win_hash_val == pat_hash_val:
            verdict = Text("Hashes match — verify character by character", font_size=22, color=self.C_MATCH)
        else:
            verdict = Text("Hashes differ — slide window right", font_size=22, color=self.C_MISMATCH)
        verdict.shift(DOWN * 2.7)
        self.play(FadeIn(verdict, shift=UP * 0.1))
        self.wait(1.2)

        self.play(FadeOut(win_hash_lbl), FadeOut(pat_hash_ref), FadeOut(verdict))
        for i in range(m):
            self.play(t_row[i][0].animate.set_fill("#DDE4F0", opacity=1), run_time=0.15)
        self.play(FadeOut(ch3))

        # ── Stage 4: Rolling Hash Slide ────────────────────────────────────────
        ch4 = self.chapter_title("Rolling Hash — Slide Window")

        roll_formula = MathTex(
            r"h_{\text{new}} = (h_{\text{old}} - s[i] \cdot b^{m-1}) \cdot b + s[i+m] \pmod{q}",
            font_size=26, color="#1A1C2C",
        ).shift(UP * 2.5)
        self.play(Write(roll_formula))
        self.wait(0.8)

        # Animate sliding window across text
        n = len(TEXT)
        current_hash = self._poly_hash(TEXT[:m], BASE, MOD)
        match_indices = []

        hash_display = Text(
            f"window hash = {current_hash}",
            font_size=24, color=self.C_HASH_B,
        ).shift(DOWN * 1.2)
        pat_display = Text(
            f"pattern hash = {pat_hash_val}",
            font_size=24, color=self.C_HASH_A,
        ).shift(DOWN * 1.9)
        self.play(FadeIn(hash_display), FadeIn(pat_display))

        for i in range(n - m + 1):
            # Highlight current window
            for k in range(m):
                self.play(t_row[i + k][0].animate.set_fill(self.C_WINDOW, opacity=0.55), run_time=0.18)

            new_hash_lbl = Text(
                f"window hash = {current_hash}",
                font_size=24, color=self.C_HASH_B,
            ).move_to(hash_display)
            self.play(Transform(hash_display, new_hash_lbl), run_time=0.25)

            if current_hash == pat_hash_val:
                # Confirm match
                for k in range(m):
                    self.play(t_row[i + k][0].animate.set_fill(self.C_MATCH, opacity=0.75), run_time=0.18)
                match_note = Text(
                    f"Match at index {i}!",
                    font_size=22, color=self.C_MATCH,
                ).shift(DOWN * 2.7)
                self.play(FadeIn(match_note))
                self.wait(0.6)
                self.play(FadeOut(match_note))
                match_indices.append(i)
            else:
                self.wait(0.3)
                for k in range(m):
                    self.play(t_row[i + k][0].animate.set_fill("#DDE4F0", opacity=1), run_time=0.12)

            # Roll hash for next window
            if i < n - m:
                current_hash = self._rolling_hash(
                    current_hash, TEXT[i], TEXT[i + m], m, BASE, MOD
                )

        self.wait(1.0)
        self.play(FadeOut(roll_formula), FadeOut(hash_display), FadeOut(pat_display))
        self.play(FadeOut(ch4))

        # ── Stage 5: Hash Collision Explanation ──────────────────────────────
        ch5 = self.chapter_title("Hash Collisions & Verification")

        collision_text = VGroup(
            Text("Hash collision: two different strings share the same hash.", font_size=24, color="#1A1C2C"),
            Text("When hashes match, always verify character by character.", font_size=24, color="#1A1C2C"),
            Text("Expected collisions ≈ (n - m + 1) / q  per run.", font_size=24, color="#888899"),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).shift(UP * 0.3)

        for line in collision_text:
            self.play(FadeIn(line, shift=RIGHT * 0.15), run_time=0.45)
        self.wait(1.5)

        verify_box = SurroundingRectangle(collision_text[1], color=self.C_HASH_A, buff=0.1, stroke_width=2.5)
        self.play(Create(verify_box))
        self.wait(1.0)
        self.play(FadeOut(collision_text), FadeOut(verify_box))
        self.play(FadeOut(ch5))

        # ── Stage 6: Results Summary ──────────────────────────────────────────
        ch6 = self.chapter_title("Results")

        self.play(
            FadeOut(t_label), FadeOut(p_label),
            FadeOut(t_row), FadeOut(p_row),
        )

        result_lines = [
            Text(f"Text:    \"{TEXT}\"", font_size=28, color="#888899"),
            Text(f"Pattern: \"{PATTERN}\"", font_size=28, color="#888899"),
            Text(
                f"Matches at indices: {match_indices}",
                font_size=32, color=self.C_MATCH, weight="BOLD",
            ),
            Text("Each slide costs O(1) via rolling hash", font_size=24, color="#888899"),
        ]
        result_group = VGroup(*result_lines).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(LaggedStart(*[Write(line) for line in result_group], lag_ratio=0.3))
        self.wait(1.5)
        self.play(FadeOut(result_group))
        self.play(FadeOut(ch6))

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        self.chapter_title("Complexity")
        self.complexity_card(
            time_best="O(n + m)",
            time_avg="O(n + m)",
            time_worst="O(nm)",
            space="O(1)",
        )
        self.wait(2.0)
