from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    C_ACTIVE, C_DEFAULT, C_SORTED, C_PIVOT,
    COBALT, CORAL, SIGNAL, GRAY, INK, MIST,
)


class Kmp(AlgoScene):
    TITLE = "KMP (Knuth-Morris-Pratt)"
    SUBTITLE = "Builds a failure function on the pattern to skip redundant comparisons, achievin"
    CATEGORY = "string"

    def build(self):
        # ── Stage 1: Problem Introduction ───────────────────────────────────
        ch1 = self.chapter_title("The Problem: String Matching")

        problem_lines = VGroup(
            Text("Given a text T and a pattern P,", font_size=32, color=INK),
            Text("find all occurrences of P inside T.", font_size=32, color=INK),
            Text("", font_size=12),
            Text("Naive approach: O(n·m) — too slow for large inputs.", font_size=26, color=CORAL),
            Text("KMP approach: O(n + m) — linear time!", font_size=26, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(problem_lines[0]))
        self.wait(0.7)
        self.play(FadeIn(problem_lines[1]))
        self.wait(0.7)
        self.play(FadeIn(problem_lines[3]))
        self.wait(0.7)
        self.play(FadeIn(problem_lines[4]))
        self.wait(2.0)
        self.play(FadeOut(problem_lines), FadeOut(ch1))

        # ── Stage 2: Why Naive Fails ─────────────────────────────────────────
        ch2 = self.chapter_title("Why Naive Matching Is Slow")

        text_str = "AAAAAAB"
        pat_str  = "AAAB"

        text_label = Text("Text:", font_size=26, color=GRAY).move_to(LEFT * 4.5 + UP * 1.5)
        pat_label  = Text("Pattern:", font_size=26, color=GRAY).move_to(LEFT * 4.5 + UP * 0.2)

        text_chars = VGroup(*[
            Text(c, font_size=36, color=INK) for c in text_str
        ]).arrange(RIGHT, buff=0.35).next_to(text_label, RIGHT, buff=0.4)

        pat_chars = VGroup(*[
            Text(c, font_size=36, color=COBALT) for c in pat_str
        ]).arrange(RIGHT, buff=0.35).next_to(pat_label, RIGHT, buff=0.4)

        self.play(FadeIn(text_label), FadeIn(text_chars))
        self.play(FadeIn(pat_label), FadeIn(pat_chars))
        self.wait(0.8)

        naive_note = Text(
            "Naive: on mismatch at position 3, restart from position 1 — wasted work!",
            font_size=22, color=CORAL
        ).move_to(DOWN * 1.2)
        kmp_note = Text(
            "KMP: use the failure function to skip back intelligently.",
            font_size=22, color=COBALT
        ).move_to(DOWN * 1.9)

        self.play(FadeIn(naive_note))
        self.wait(1.0)
        self.play(FadeIn(kmp_note))
        self.wait(2.0)
        self.play(FadeOut(VGroup(
            text_label, text_chars, pat_label, pat_chars, naive_note, kmp_note
        )), FadeOut(ch2))

        # ── Stage 3: Building the Failure Function ───────────────────────────
        ch3 = self.chapter_title("Step 1: Build the Failure Function")

        pattern = "ABABC"
        fail_vals = [0, 0, 1, 2, 0]  # lps / failure function for "ABABC"

        pat_title = Text("Pattern P = \"ABABC\"", font_size=30, color=INK).move_to(UP * 2.5)
        self.play(FadeIn(pat_title))

        # Draw pattern cells
        cell_size = 0.85
        pat_cells = VGroup()
        for i, ch_char in enumerate(pattern):
            cell = VGroup(
                Square(side_length=cell_size, color=COBALT, fill_color=MIST, fill_opacity=0.3),
                Text(ch_char, font_size=30, color=INK),
            )
            cell.move_to(RIGHT * (i - 2) * (cell_size + 0.1) + UP * 1.2)
            pat_cells.add(cell)

        idx_labels = VGroup(*[
            Text(str(i), font_size=20, color=GRAY).next_to(pat_cells[i], UP, buff=0.15)
            for i in range(len(pattern))
        ])

        self.play(LaggedStart(*[FadeIn(c) for c in pat_cells], lag_ratio=0.15))
        self.play(FadeIn(idx_labels))
        self.wait(0.5)

        fail_title = Text("Failure function f[]:", font_size=26, color=GRAY).move_to(DOWN * 0.2 + LEFT * 2.5)
        self.play(FadeIn(fail_title))

        fail_cells = VGroup()
        fail_val_labels = VGroup()
        for i, fv in enumerate(fail_vals):
            fcell = VGroup(
                Square(side_length=cell_size, color=GRAY, fill_color=PAPER if hasattr(self, 'PAPER') else WHITE, fill_opacity=0.1),
                Text(str(fv), font_size=28, color=SIGNAL),
            )
            fcell.move_to(RIGHT * (i - 2) * (cell_size + 0.1) + DOWN * 1.1)
            fail_cells.add(fcell)

        explain_steps = [
            "f[0]=0: single char, no proper prefix/suffix",
            "f[1]=0: 'AB' — no match",
            "f[2]=1: 'ABA' — 'A' matches",
            "f[3]=2: 'ABAB' — 'AB' matches",
            "f[4]=0: 'ABABC' — no match after C",
        ]

        step_label = Text("", font_size=22, color=COBALT).move_to(DOWN * 2.5)
        self.add(step_label)

        for i, (fv, expl) in enumerate(zip(fail_vals, explain_steps)):
            new_step = Text(expl, font_size=22, color=COBALT).move_to(DOWN * 2.5)
            self.play(Transform(step_label, new_step), run_time=0.4)
            self.play(FadeIn(fail_cells[i]), run_time=0.5)
            self.wait(0.8)

        self.wait(1.5)
        self.play(FadeOut(VGroup(
            pat_title, pat_cells, idx_labels, fail_title, fail_cells, step_label
        )), FadeOut(ch3))

        # ── Stage 4: KMP Search Step-by-Step ────────────────────────────────
        ch4 = self.chapter_title("Step 2: KMP Search")

        text_s = "ABABABABC"
        pat_s  = "ABABC"
        lps    = [0, 0, 1, 2, 0]

        t_label = Text("Text T:", font_size=24, color=GRAY).move_to(LEFT * 4.8 + UP * 2.0)
        p_label = Text("Pattern P:", font_size=24, color=GRAY).move_to(LEFT * 4.8 + UP * 0.6)

        cs = 0.7
        t_cells = VGroup()
        for i, c in enumerate(text_s):
            cell = VGroup(
                Square(side_length=cs, color=GRAY, fill_color=WHITE, fill_opacity=0.05),
                Text(c, font_size=26, color=INK),
            )
            cell.move_to(RIGHT * (i - 4) * (cs + 0.08) + UP * 2.0)
            t_cells.add(cell)

        p_cells = VGroup()
        for i, c in enumerate(pat_s):
            cell = VGroup(
                Square(side_length=cs, color=COBALT, fill_color=MIST, fill_opacity=0.2),
                Text(c, font_size=26, color=COBALT),
            )
            cell.move_to(RIGHT * (i - 4) * (cs + 0.08) + UP * 0.6)
            p_cells.add(cell)

        self.play(FadeIn(t_label), FadeIn(t_cells))
        self.play(FadeIn(p_label), FadeIn(p_cells))
        self.wait(0.5)

        status_text = Text("", font_size=22, color=COBALT).move_to(DOWN * 0.8)
        self.add(status_text)

        # Simulate KMP matching
        match_steps = [
            (0, 0, "Compare T[0]='A' vs P[0]='A' — match"),
            (1, 1, "Compare T[1]='B' vs P[1]='B' — match"),
            (2, 2, "Compare T[2]='A' vs P[2]='A' — match"),
            (3, 3, "Compare T[3]='B' vs P[3]='B' — match"),
            (4, 4, "Compare T[4]='A' vs P[4]='C' — MISMATCH, j=lps[3]=2"),
            (4, 2, "Compare T[4]='A' vs P[2]='A' — match (skipped back!)"),
            (5, 3, "Compare T[5]='B' vs P[3]='B' — match"),
            (6, 4, "Compare T[6]='A' vs P[4]='C' — MISMATCH, j=lps[3]=2"),
            (6, 2, "Compare T[6]='A' vs P[2]='A' — match"),
            (7, 3, "Compare T[7]='B' vs P[3]='B' — match"),
            (8, 4, "Compare T[8]='C' vs P[4]='C' — match! FOUND at index 4"),
        ]

        for ti, pi, desc in match_steps:
            new_status = Text(desc, font_size=20, color=COBALT if "MISMATCH" not in desc else CORAL)
            new_status.move_to(DOWN * 0.8)
            self.play(Transform(status_text, new_status), run_time=0.35)

            # Highlight current comparison cells
            t_cells[ti][0].set_fill(SIGNAL if "FOUND" in desc else (CORAL if "MISMATCH" in desc else COBALT), opacity=0.4)
            p_cells[pi][0].set_fill(SIGNAL if "FOUND" in desc else (CORAL if "MISMATCH" in desc else COBALT), opacity=0.4)
            self.wait(0.7)
            t_cells[ti][0].set_fill(WHITE, opacity=0.05)
            p_cells[pi][0].set_fill(MIST, opacity=0.2)

        match_found = Text("Pattern found at index 4!", font_size=28, color=SIGNAL).move_to(DOWN * 1.8)
        self.play(FadeIn(match_found))
        self.wait(2.0)
        self.play(FadeOut(VGroup(
            t_label, t_cells, p_label, p_cells, status_text, match_found
        )), FadeOut(ch4))

        # ── Stage 5: Failure Function Pseudocode ────────────────────────────
        ch5 = self.chapter_title("Failure Function — How It Works")

        pseudo_title = Text("compute_lps(pattern):", font_size=28, color=COBALT).move_to(UP * 2.2)
        pseudo_lines = VGroup(
            Text("lps[0] = 0; length = 0; i = 1", font_size=24, color=INK),
            Text("while i < len(pattern):", font_size=24, color=INK),
            Text("    if pattern[i] == pattern[length]:", font_size=24, color=COBALT),
            Text("        length += 1; lps[i] = length; i += 1", font_size=24, color=COBALT),
            Text("    elif length != 0:", font_size=24, color=INK),
            Text("        length = lps[length - 1]  # key: don't increment i!", font_size=24, color=CORAL),
            Text("    else:", font_size=24, color=INK),
            Text("        lps[i] = 0; i += 1", font_size=24, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(ORIGIN + DOWN * 0.2)

        box = SurroundingRectangle(pseudo_lines, color=COBALT, buff=0.25, corner_radius=0.1)
        key_note = Text(
            "The key insight: when mismatch, fall back using lps[length-1] — never re-examine matched chars!",
            font_size=20, color=SIGNAL
        ).next_to(pseudo_lines, DOWN, buff=0.4)

        self.play(Write(pseudo_title))
        self.play(LaggedStart(*[FadeIn(line) for line in pseudo_lines], lag_ratio=0.2))
        self.play(Create(box))
        self.play(FadeIn(key_note))
        self.wait(2.5)
        self.play(FadeOut(VGroup(pseudo_title, pseudo_lines, box, key_note)), FadeOut(ch5))

        # ── Stage 6: Complexity Analysis ────────────────────────────────────
        ch6 = self.chapter_title("Why O(n + m)?")

        analysis_lines = VGroup(
            Text("Preprocessing (failure function): O(m)", font_size=28, color=COBALT),
            Text("  — each character in pattern examined at most twice", font_size=24, color=GRAY),
            Text("", font_size=10),
            Text("Search phase: O(n)", font_size=28, color=COBALT),
            Text("  — text pointer i never moves backward", font_size=24, color=GRAY),
            Text("  — pattern pointer j can only advance n times total", font_size=24, color=GRAY),
            Text("", font_size=10),
            Text("Total: O(n + m)  vs  Naive O(n·m)", font_size=28, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(line) for line in analysis_lines], lag_ratio=0.25))
        self.wait(2.5)
        self.play(FadeOut(analysis_lines), FadeOut(ch6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        self.complexity_card(
            time_best=r"O(n + m)",
            time_avg=r"O(n + m)",
            time_worst=r"O(n + m)",
            space=r"O(m)",
        )
        self.wait(2.5)
        self.play(FadeOut(ch7))
