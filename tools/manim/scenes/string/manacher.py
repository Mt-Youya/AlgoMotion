from manim import *
from ...base import AlgoScene, ArrayVis


class Manacher(AlgoScene):
    TITLE = "Manacher's Algorithm"
    SUBTITLE = "Finds longest palindromic substring in O(n)."
    CATEGORY = "string"

    def build(self):
        # ── Stage 1: Intro & Problem Setup ──────────────────────────────────
        self.chapter_title("The Problem: Longest Palindromic Substring")

        intro_text = VGroup(
            Text("Given a string, find its longest palindromic substring.", font_size=28),
            Text("Naive approach: O(n²) or O(n³)", font_size=24, color=RED),
            Text("Manacher's Algorithm: O(n)", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_text[0]))
        self.wait(1)
        self.play(FadeIn(intro_text[1]))
        self.wait(0.8)
        self.play(FadeIn(intro_text[2]))
        self.wait(1.5)
        self.play(FadeOut(intro_text))

        # ── Stage 2: String Transformation ──────────────────────────────────
        self.chapter_title("Step 1: Transform the String")

        original_label = Text("Original:", font_size=24, color=YELLOW).to_edge(UP, buff=1.5)
        original_str = Text("abacaba", font_size=36, color=WHITE).next_to(original_label, RIGHT, buff=0.5)

        transform_label = Text("Transformed:", font_size=24, color=YELLOW).next_to(original_label, DOWN, buff=0.8)
        transform_str = Text("#a#b#a#c#a#b#a#", font_size=30, color=BLUE).next_to(transform_label, RIGHT, buff=0.3)

        explain = Text(
            "Insert '#' between every character (and at boundaries)\n"
            "to handle even-length palindromes uniformly.",
            font_size=22, color=GRAY
        ).next_to(transform_str, DOWN, buff=0.6)

        self.play(Write(original_label), Write(original_str))
        self.wait(0.8)
        self.play(Write(transform_label), Write(transform_str))
        self.wait(0.8)
        self.play(FadeIn(explain))
        self.wait(2)
        self.play(FadeOut(VGroup(original_label, original_str, transform_label, transform_str, explain)))

        # ── Stage 3: P Array Visualization ──────────────────────────────────
        self.chapter_title("Step 2: Build the P Array")

        s = "#a#b#a#c#a#b#a#"
        n = len(s)

        # Draw the transformed string as individual cells
        cell_width = 0.55
        cells = VGroup()
        char_labels = VGroup()
        idx_labels = VGroup()

        for i, ch in enumerate(s):
            rect = Rectangle(width=cell_width, height=0.55, color=WHITE, stroke_width=1.5)
            rect.move_to(LEFT * (n / 2 * cell_width) + RIGHT * (i * cell_width) + UP * 1.5)
            cells.add(rect)
            cl = Text(ch, font_size=18).move_to(rect.get_center())
            char_labels.add(cl)
            il = Text(str(i), font_size=12, color=GRAY).next_to(rect, DOWN, buff=0.08)
            idx_labels.add(il)

        self.play(FadeIn(cells), FadeIn(char_labels), FadeIn(idx_labels))
        self.wait(0.5)

        # P array cells (radius values)
        p_values = [0, 1, 0, 3, 0, 1, 0, 7, 0, 1, 0, 3, 0, 1, 0]
        p_cells = VGroup()
        p_labels_vis = VGroup()
        p_title = Text("P[ ]:", font_size=20, color=YELLOW).move_to(LEFT * 4.5 + DOWN * 0.2)

        for i in range(n):
            rect = Rectangle(width=cell_width, height=0.45, color=YELLOW, stroke_width=1.5)
            rect.move_to(LEFT * (n / 2 * cell_width) + RIGHT * (i * cell_width) + DOWN * 0.2)
            p_cells.add(rect)
            pl = Text(str(p_values[i]), font_size=16, color=YELLOW).move_to(rect.get_center())
            p_labels_vis.add(pl)

        self.play(FadeIn(p_title))
        self.play(FadeIn(p_cells))

        # Animate filling P array step by step (key indices)
        key_indices = [3, 7, 11]
        for idx in key_indices:
            highlight = cells[idx].copy().set_fill(BLUE, opacity=0.4).set_stroke(BLUE, width=3)
            self.play(FadeIn(highlight), run_time=0.4)
            self.play(Write(p_labels_vis[idx]), run_time=0.5)
            # Draw palindrome radius arc
            radius = p_values[idx]
            if radius > 0:
                brace = Brace(
                    VGroup(cells[idx - radius], cells[idx + radius]),
                    direction=UP, color=GREEN
                )
                brace_label = brace.get_tip().add(Text(f"r={radius}", font_size=14, color=GREEN))
                self.play(GrowFromCenter(brace), run_time=0.5)
                self.wait(0.4)
                self.play(FadeOut(brace), FadeOut(highlight), run_time=0.3)
            self.wait(0.3)

        # Fill remaining P values quickly
        remaining = [i for i in range(n) if i not in key_indices]
        self.play(*[Write(p_labels_vis[i]) for i in remaining], run_time=0.8)
        self.wait(1)

        self.play(FadeOut(VGroup(cells, char_labels, idx_labels, p_cells, p_labels_vis, p_title)))

        # ── Stage 4: Core Algorithm — C and R Pointers ──────────────────────
        self.chapter_title("Step 3: The Mirror Trick (C and R Pointers)")

        mirror_explain = VGroup(
            Text("C = center of rightmost palindrome so far", font_size=24, color=BLUE),
            Text("R = right boundary of that palindrome", font_size=24, color=GREEN),
            Text("Mirror: mirror(i) = 2*C - i", font_size=24, color=ORANGE),
        ).arrange(DOWN, buff=0.35).move_to(UP * 0.8)

        mirror_rule = VGroup(
            Text("If i < R:", font_size=22, color=WHITE),
            Text("  P[i] = min(R - i,  P[mirror(i)])", font_size=22, color=YELLOW),
            Text("Then expand around i as usual.", font_size=22, color=GRAY),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).next_to(mirror_explain, DOWN, buff=0.5)

        self.play(FadeIn(mirror_explain[0]))
        self.wait(0.6)
        self.play(FadeIn(mirror_explain[1]))
        self.wait(0.6)
        self.play(FadeIn(mirror_explain[2]))
        self.wait(0.8)
        self.play(FadeIn(mirror_rule))
        self.wait(2)
        self.play(FadeOut(VGroup(mirror_explain, mirror_rule)))

        # ── Stage 5: Step-by-Step Walkthrough on "abacaba" ──────────────────
        self.chapter_title("Walkthrough: s = \"abacaba\"")

        steps = [
            ("i=1 (#a#)", "Expand: P[1]=1", BLUE),
            ("i=3 (#b#a#)", "Expand: P[3]=3", GREEN),
            ("i=7 (#a#b#a#c#a#b#a#)", "Center! P[7]=7 → full string", ORANGE),
            ("i=11 (mirror of 3)", "Use mirror: P[11]=3", PURPLE),
        ]

        step_group = VGroup()
        for label, result, color in steps:
            row = VGroup(
                Text(label, font_size=20, color=color),
                Text("→  " + result, font_size=20, color=WHITE),
            ).arrange(RIGHT, buff=0.4)
            step_group.add(row)

        step_group.arrange(DOWN, buff=0.4, aligned_edge=LEFT).move_to(ORIGIN)

        for row in step_group:
            self.play(FadeIn(row), run_time=0.6)
            self.wait(0.7)

        self.wait(1)

        # Highlight the longest palindrome result
        result_box = SurroundingRectangle(
            Text("Longest palindrome: \"abacaba\" (length 7)", font_size=26, color=GREEN).next_to(step_group, DOWN, buff=0.5),
            color=GREEN, buff=0.15
        )
        result_text = Text("Longest palindrome: \"abacaba\" (length 7)", font_size=26, color=GREEN).next_to(step_group, DOWN, buff=0.5)
        self.play(Write(result_text), Create(result_box))
        self.wait(1.5)
        self.play(FadeOut(VGroup(step_group, result_text, result_box)))

        # ── Stage 6: Pseudocode Recap ────────────────────────────────────────
        self.chapter_title("Algorithm Summary")

        code_lines = VGroup(
            Text("1. Transform: s → T  (insert '#')", font_size=21, color=WHITE),
            Text("2. Initialize P[], C=0, R=0", font_size=21, color=WHITE),
            Text("3. For each i in T:", font_size=21, color=WHITE),
            Text("   a. mirror = 2*C - i", font_size=21, color=YELLOW),
            Text("   b. if i < R: P[i] = min(R-i, P[mirror])", font_size=21, color=YELLOW),
            Text("   c. Expand around i", font_size=21, color=GREEN),
            Text("   d. if i+P[i] > R: update C, R", font_size=21, color=BLUE),
            Text("4. Extract answer from max(P)", font_size=21, color=ORANGE),
        ).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(ORIGIN)

        for line in code_lines:
            self.play(FadeIn(line), run_time=0.35)
        self.wait(2)
        self.play(FadeOut(code_lines))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(n)",
        )
        self.wait(2)
