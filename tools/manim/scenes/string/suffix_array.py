from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, MIST, INK, GRAY, PAPER,
    C_DEFAULT, C_ACTIVE, C_SORTED,
)


class SuffixArray(AlgoScene):
    TITLE = "Suffix Array"
    SUBTITLE = "Sorted array of all suffixes enabling O(m log n) pattern search."
    CATEGORY = "string"

    # Input string used throughout the animation
    INPUT = "banana"

    def build(self):
        # ── Stage 1: Problem Setup ────────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        input_label = Text("Input string:", font_size=30, color=GRAY).shift(UP * 2 + LEFT * 3)
        input_str = Text(f'"{self.INPUT}"', font_size=48, color=INK, weight="BOLD").next_to(input_label, RIGHT, buff=0.4)

        goal_text = Text(
            "Build a sorted array of all suffixes for fast pattern search",
            font_size=26, color=GRAY,
        ).shift(UP * 0.8)

        n_text = Text(
            f"n = {len(self.INPUT)} characters  →  {len(self.INPUT)} suffixes",
            font_size=26, color=COBALT,
        ).shift(DOWN * 0.2)

        self.play(Write(input_label), FadeIn(input_str, shift=RIGHT * 0.2))
        self.play(FadeIn(goal_text, shift=UP * 0.15))
        self.play(FadeIn(n_text))
        self.wait(1.5)
        self.play(FadeOut(VGroup(input_label, input_str, goal_text, n_text, ch1)))
        self.wait(0.2)

        # ── Stage 2: Enumerate All Suffixes ──────────────────────────────────
        ch2 = self.chapter_title("Enumerate All Suffixes")

        s = self.INPUT
        n = len(s)
        suffixes = [s[i:] for i in range(n)]

        # Draw index → suffix table
        col_idx = LEFT * 4.5
        col_suffix = LEFT * 2.5

        idx_header = Text("Index", font_size=22, color=COBALT, weight="BOLD").shift(col_idx + UP * 2.8)
        suf_header = Text("Suffix", font_size=22, color=COBALT, weight="BOLD").shift(col_suffix + UP * 2.8)
        self.play(FadeIn(idx_header), FadeIn(suf_header))

        suffix_mobs = VGroup()
        index_mobs = VGroup()
        for i, suf in enumerate(suffixes):
            y = 2.2 - i * 0.72
            idx_mob = Text(str(i), font_size=24, color=COBALT).shift(col_idx + UP * y)
            suf_mob = Text(f'"{suf}"', font_size=24, color=INK).shift(col_suffix + UP * y)
            index_mobs.add(idx_mob)
            suffix_mobs.add(suf_mob)

        self.play(
            LaggedStart(
                *[FadeIn(VGroup(index_mobs[i], suffix_mobs[i]), shift=RIGHT * 0.15)
                  for i in range(n)],
                lag_ratio=0.12,
            )
        )
        self.wait(1.5)

        # Highlight that suffixes are all sub-strings starting at each position
        note = Text(
            "Each suffix starts at index i and runs to the end",
            font_size=22, color=CORAL,
        ).shift(RIGHT * 1.5 + DOWN * 2.8)
        self.play(FadeIn(note, shift=UP * 0.1))
        self.wait(1.2)
        self.play(FadeOut(note))

        # ── Stage 3: Sorting the Suffixes ────────────────────────────────────
        ch3 = self.chapter_title("Sort Suffixes Lexicographically")
        self.play(FadeOut(ch2))

        sorted_pairs = sorted(enumerate(suffixes), key=lambda x: x[1])
        sorted_indices = [p[0] for p in sorted_pairs]
        sorted_suffixes = [p[1] for p in sorted_pairs]

        # Animate each suffix row moving to its sorted position
        sorted_col_idx = RIGHT * 1.5
        sorted_col_suffix = RIGHT * 3.2

        sort_header_idx = Text("SA[i]", font_size=22, color=SIGNAL, weight="BOLD").shift(sorted_col_idx + UP * 2.8)
        sort_header_suf = Text("Sorted Suffix", font_size=22, color=SIGNAL, weight="BOLD").shift(sorted_col_suffix + UP * 2.8)
        self.play(FadeIn(sort_header_idx), FadeIn(sort_header_suf))

        sorted_idx_mobs = VGroup()
        sorted_suf_mobs = VGroup()
        for rank, (orig_idx, suf) in enumerate(sorted_pairs):
            y = 2.2 - rank * 0.72
            si_mob = Text(str(orig_idx), font_size=24, color=SIGNAL, weight="BOLD").shift(sorted_col_idx + UP * y)
            ss_mob = Text(f'"{suf}"', font_size=24, color=INK).shift(sorted_col_suffix + UP * y)
            sorted_idx_mobs.add(si_mob)
            sorted_suf_mobs.add(ss_mob)

        self.play(
            LaggedStart(
                *[FadeIn(VGroup(sorted_idx_mobs[i], sorted_suf_mobs[i]), shift=LEFT * 0.1)
                  for i in range(n)],
                lag_ratio=0.14,
            )
        )
        self.wait(1.0)

        # Draw arrow connecting original → sorted
        arrow_note = Text(
            "Suffix Array SA = [5, 3, 1, 0, 4, 2]",
            font_size=26, color=SIGNAL, weight="BOLD",
        ).shift(DOWN * 2.8)
        self.play(Write(arrow_note))
        self.wait(1.8)

        self.play(
            FadeOut(VGroup(
                idx_header, suf_header, index_mobs, suffix_mobs,
                sort_header_idx, sort_header_suf,
                sorted_idx_mobs, sorted_suf_mobs,
                arrow_note, ch3,
            ))
        )
        self.wait(0.2)

        # ── Stage 4: Suffix Array Visualization ──────────────────────────────
        ch4 = self.chapter_title("Suffix Array Structure")

        sa = sorted_indices  # [5, 3, 1, 0, 4, 2]

        # Draw the SA as a row of colored cells
        cell_w = 1.0
        cell_h = 0.75
        sa_cells = VGroup()
        sa_labels = VGroup()
        rank_labels = VGroup()

        for rank, idx in enumerate(sa):
            rect = Rectangle(
                width=cell_w, height=cell_h,
                color=INK,
                fill_color=COBALT,
                fill_opacity=1,
                stroke_width=2.5,
            ).shift(RIGHT * (rank - n / 2 + 0.5) * cell_w + UP * 1.5)
            val_lbl = Text(str(idx), font_size=28, color=PAPER, weight="BOLD").move_to(rect)
            rank_lbl = Text(str(rank), font_size=16, color=GRAY).next_to(rect, DOWN, buff=0.1)
            sa_cells.add(rect)
            sa_labels.add(val_lbl)
            rank_labels.add(rank_lbl)

        sa_title = Text("SA (Suffix Array)", font_size=24, color=COBALT, weight="BOLD").shift(UP * 2.5)
        rank_title = Text("rank →", font_size=18, color=GRAY).shift(LEFT * 3.8 + UP * 0.9)

        self.play(FadeIn(sa_title), Write(rank_title))
        self.play(Create(sa_cells, run_time=0.7), FadeIn(sa_labels), FadeIn(rank_labels))
        self.wait(0.8)

        # Show what each SA entry means
        explain_lines = VGroup()
        for rank, idx in enumerate(sa):
            suf = s[idx:]
            line = Text(
                f"SA[{rank}] = {idx}  →  \"{suf}\"",
                font_size=20,
                color=INK,
            ).shift(DOWN * (0.3 + rank * 0.55) + LEFT * 0.5)
            explain_lines.add(line)

        self.play(
            LaggedStart(*[FadeIn(l, shift=RIGHT * 0.1) for l in explain_lines], lag_ratio=0.1)
        )
        self.wait(2.0)

        self.play(FadeOut(VGroup(sa_title, rank_title, explain_lines, ch4)))
        self.wait(0.2)

        # ── Stage 5: Pattern Search using Binary Search ───────────────────────
        ch5 = self.chapter_title("Pattern Search: O(m log n)")

        pattern = "an"
        pat_label = Text(f'Search for pattern: "{pattern}"', font_size=32, color=CORAL, weight="BOLD").shift(UP * 2.8)
        self.play(Write(pat_label))
        self.wait(0.8)

        # Show binary search bounds narrowing
        lo, hi = 0, n - 1
        steps_info = [
            (0, n - 1, "Initial range: all suffixes"),
            (0, 3,     "Mid=2: 'nana' > 'an' → hi=3"),
            (0, 1,     "Mid=1: 'anana' > 'an' → hi=1"),
            (0, 0,     "Mid=0: 'a' < 'an' → lo=1"),
            (1, 1,     "lo==hi: found at SA[1]=3 → 'anana'"),
        ]

        step_mob = None
        lo_arrow = None
        hi_arrow = None

        for lo_v, hi_v, desc in steps_info:
            desc_mob = Text(desc, font_size=22, color=INK).shift(DOWN * 2.5)

            # Highlight the lo..hi range in the SA cells
            for rank in range(n):
                if lo_v <= rank <= hi_v:
                    sa_cells[rank].generate_target()
                    sa_cells[rank].target.set_fill(color=SIGNAL)
                else:
                    sa_cells[rank].generate_target()
                    sa_cells[rank].target.set_fill(color=COBALT)

            anims = [MoveToTarget(sa_cells[r]) for r in range(n)]
            if step_mob:
                anims.append(Transform(step_mob, desc_mob))
            else:
                step_mob = desc_mob
                anims.append(FadeIn(step_mob))

            self.play(*anims, run_time=0.6)
            self.wait(0.9)

        # Highlight the match
        match_box = SurroundingRectangle(sa_cells[1], color=CORAL, buff=0.08, stroke_width=3)
        match_note = Text(
            f'Match: SA[1]=3 → s[3:] = "ana" starts with "{pattern}"',
            font_size=22, color=CORAL,
        ).shift(DOWN * 3.2)
        self.play(Create(match_box), Write(match_note))
        self.wait(1.5)

        self.play(
            FadeOut(VGroup(
                pat_label, step_mob, match_box, match_note,
                sa_cells, sa_labels, rank_labels, ch5,
            ))
        )
        self.wait(0.2)

        # ── Stage 6: Construction Algorithm Overview ──────────────────────────
        ch6 = self.chapter_title("Construction: O(n log n)")

        steps_text = VGroup(
            Text("1. Generate all (suffix_index, suffix_string) pairs", font_size=24, color=INK),
            Text("2. Sort pairs lexicographically — O(n log²n) naïve", font_size=24, color=INK),
            Text("3. Prefix-doubling (DC3 / SA-IS) achieves O(n log n)", font_size=24, color=INK),
            Text("4. Store only the starting indices — SA is an int array", font_size=24, color=INK),
            Text("5. Augment with LCP array for O(m + log n) search", font_size=24, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.38).shift(LEFT * 0.5)

        self.play(
            LaggedStart(*[FadeIn(t, shift=RIGHT * 0.15) for t in steps_text], lag_ratio=0.2)
        )
        self.wait(2.2)
        self.play(FadeOut(VGroup(steps_text, ch6)))
        self.wait(0.2)

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n \log n)",
            time_avg=r"O(n \log n)",
            time_worst=r"O(n \log n)",
            space=r"O(n)",
        )
        self.wait(2.5)
        self.play(FadeOut(ch7))
