from manim import *
from ...base import AlgoScene
from ...base.algo_scene import (
    C_ACTIVE,
    C_DEFAULT,
    C_SORTED,
    C_TEXT,
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    PAPER,
    SIGNAL,
)


class HammingDistance(AlgoScene):
    TITLE = "Hamming Distance"
    SUBTITLE = "Counts positions at which two equal-length strings differ."
    CATEGORY = "string"

    def build(self):
        # ── Stage 1: Problem Introduction ───────────────────────────────────
        ch1 = self.chapter_title("What Is Hamming Distance?")

        intro = VGroup(
            Text("Given two equal-length strings A and B,", font_size=28, color=INK),
            Text("the Hamming Distance is the number of", font_size=28, color=INK),
            Text("positions where the characters differ.", font_size=28, color=INK),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(ORIGIN)

        self.play(FadeIn(intro, shift=UP * 0.3))
        self.wait(2)

        example = VGroup(
            Text('A = "KAROLIN"', font_size=30, color=COBALT),
            Text('B = "KATHRIN"', font_size=30, color=CORAL),
            Text("Hamming Distance = 3", font_size=30, color=SIGNAL, weight="BOLD"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).shift(DOWN * 0.5)

        self.play(FadeOut(intro), FadeIn(example, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(example), FadeOut(ch1))

        # ── Stage 2: Visual Setup – Two String Rows ──────────────────────────
        ch2 = self.chapter_title("Visualizing the Comparison")

        str_a = list("KAROLIN")
        str_b = list("KATHRIN")
        n = len(str_a)
        cell_w = 0.9

        # Build string A boxes
        boxes_a = VGroup()
        labels_a = VGroup()
        boxes_b = VGroup()
        labels_b = VGroup()
        idx_labels = VGroup()

        for i in range(n):
            # Row A
            box_a = Square(side_length=cell_w, color=INK, fill_color=COBALT,
                           fill_opacity=0.85, stroke_width=2)
            box_a.move_to(RIGHT * (i * (cell_w + 0.1)) + UP * 1.2)
            lbl_a = Text(str_a[i], font_size=26, color=WHITE, weight="BOLD")
            lbl_a.move_to(box_a.get_center())
            boxes_a.add(box_a)
            labels_a.add(lbl_a)

            # Row B
            box_b = Square(side_length=cell_w, color=INK, fill_color=CORAL,
                           fill_opacity=0.85, stroke_width=2)
            box_b.move_to(RIGHT * (i * (cell_w + 0.1)) + DOWN * 0.2)
            lbl_b = Text(str_b[i], font_size=26, color=WHITE, weight="BOLD")
            lbl_b.move_to(box_b.get_center())
            boxes_b.add(box_b)
            labels_b.add(lbl_b)

            # Index
            idx = Text(str(i), font_size=16, color=GRAY)
            idx.next_to(box_b, DOWN, buff=0.12)
            idx_labels.add(idx)

        # Center the whole thing
        all_boxes = VGroup(boxes_a, boxes_b)
        all_boxes.move_to(ORIGIN)

        label_a_tag = Text("A:", font_size=28, color=COBALT, weight="BOLD")
        label_b_tag = Text("B:", font_size=28, color=CORAL, weight="BOLD")
        label_a_tag.next_to(boxes_a, LEFT, buff=0.3)
        label_b_tag.next_to(boxes_b, LEFT, buff=0.3)

        self.play(
            LaggedStart(
                *[Create(VGroup(ba, la)) for ba, la in zip(boxes_a, labels_a)],
                lag_ratio=0.1,
            )
        )
        self.play(
            LaggedStart(
                *[Create(VGroup(bb, lb)) for bb, lb in zip(boxes_b, labels_b)],
                lag_ratio=0.1,
            )
        )
        self.play(FadeIn(label_a_tag), FadeIn(label_b_tag), FadeIn(idx_labels))
        self.wait(1)
        self.play(FadeOut(ch2))

        # ── Stage 3: Step-by-step Comparison ────────────────────────────────
        ch3 = self.chapter_title("Comparing Position by Position")

        diff_count = 0
        diff_marker_group = VGroup()
        counter_text = Text("Differences: 0", font_size=28, color=INK)
        counter_text.to_edge(DOWN, buff=0.6)
        self.play(Write(counter_text))

        for i in range(n):
            # Highlight current column
            self.play(
                boxes_a[i].animate.set_stroke(color=SIGNAL, width=4),
                boxes_b[i].animate.set_stroke(color=SIGNAL, width=4),
                run_time=0.35,
            )
            self.wait(0.3)

            if str_a[i] != str_b[i]:
                diff_count += 1
                # Mark as different with an X arrow
                arrow = Arrow(
                    boxes_a[i].get_bottom(),
                    boxes_b[i].get_top(),
                    buff=0.05,
                    color=CORAL,
                    stroke_width=3,
                    max_tip_length_to_length_ratio=0.2,
                )
                diff_marker_group.add(arrow)
                self.play(
                    boxes_a[i].animate.set_fill(CORAL, opacity=0.9),
                    boxes_b[i].animate.set_fill(CORAL, opacity=0.9),
                    GrowArrow(arrow),
                    run_time=0.5,
                )
                new_counter = Text(
                    f"Differences: {diff_count}",
                    font_size=28,
                    color=CORAL,
                    weight="BOLD",
                )
                new_counter.move_to(counter_text.get_center())
                self.play(Transform(counter_text, new_counter), run_time=0.3)
            else:
                # Mark as same with green
                check = Text("=", font_size=28, color=SIGNAL, weight="BOLD")
                check.move_to(
                    (boxes_a[i].get_center() + boxes_b[i].get_center()) / 2
                )
                self.play(
                    boxes_a[i].animate.set_fill(SIGNAL, opacity=0.7),
                    boxes_b[i].animate.set_fill(SIGNAL, opacity=0.7),
                    FadeIn(check, scale=1.3),
                    run_time=0.45,
                )
                self.wait(0.2)
                self.play(FadeOut(check), run_time=0.2)

            self.play(
                boxes_a[i].animate.set_stroke(color=INK, width=2),
                boxes_b[i].animate.set_stroke(color=INK, width=2),
                run_time=0.2,
            )
            self.wait(0.15)

        self.wait(1)
        self.play(FadeOut(ch3))

        # ── Stage 4: Result Announcement ────────────────────────────────────
        ch4 = self.chapter_title("Result")

        result_box = Rectangle(
            width=5.5, height=1.4,
            color=SIGNAL, fill_color=SIGNAL, fill_opacity=0.15, stroke_width=3,
        ).shift(DOWN * 2.2)
        result_text = Text(
            f"Hamming Distance = {diff_count}",
            font_size=36, color=INK, weight="BOLD",
        ).move_to(result_box.get_center())

        self.play(Create(result_box), Write(result_text))
        self.wait(2)
        self.play(FadeOut(ch4))

        # ── Stage 5: Algorithm Walkthrough (XOR-based insight) ───────────────
        ch5 = self.chapter_title("Algorithm: XOR Approach for Bits")

        self.play(
            FadeOut(
                VGroup(
                    boxes_a, labels_a, boxes_b, labels_b,
                    label_a_tag, label_b_tag, idx_labels,
                    diff_marker_group, counter_text,
                    result_box, result_text,
                )
            )
        )

        xor_title = Text("For binary strings, XOR reveals differences:", font_size=26, color=INK)
        xor_title.shift(UP * 1.8)

        bin_a = list("10110")
        bin_b = list("11100")
        xor_r = [str(int(a) ^ int(b)) for a, b in zip(bin_a, bin_b)]
        cell_w2 = 0.75

        row_labels = ["A:", "B:", "A⊕B:"]
        rows_data = [bin_a, bin_b, xor_r]
        row_colors = [COBALT, CORAL, SIGNAL]
        row_groups = []

        for ri, (row_data, row_color, row_lbl) in enumerate(
            zip(rows_data, row_colors, row_labels)
        ):
            y_pos = 0.5 - ri * 1.1
            tag = Text(row_lbl, font_size=24, color=row_color, weight="BOLD")
            cells = VGroup()
            lbls = VGroup()
            for ci, ch in enumerate(row_data):
                box = Square(
                    side_length=cell_w2, color=INK,
                    fill_color=row_color, fill_opacity=0.75, stroke_width=2,
                )
                box.move_to(RIGHT * (ci * (cell_w2 + 0.08)) + UP * y_pos)
                lbl = Text(ch, font_size=22, color=WHITE, weight="BOLD")
                lbl.move_to(box.get_center())
                cells.add(box)
                lbls.add(lbl)
            tag.next_to(cells, LEFT, buff=0.3)
            row_groups.append(VGroup(tag, cells, lbls))

        self.play(Write(xor_title))
        self.wait(0.5)
        for rg in row_groups:
            self.play(FadeIn(rg, shift=RIGHT * 0.2), run_time=0.5)
            self.wait(0.3)

        xor_note = Text(
            "Count 1s in XOR result  →  Hamming Distance = 2",
            font_size=24, color=INK,
        ).shift(DOWN * 1.8)
        self.play(Write(xor_note))
        self.wait(2)

        # Highlight the 1s in XOR row
        for ci, val in enumerate(xor_r):
            if val == "1":
                self.play(
                    row_groups[2][1][ci].animate.set_fill(CORAL, opacity=1.0),
                    Indicate(row_groups[2][1][ci], color=CORAL, scale_factor=1.3),
                    run_time=0.5,
                )

        self.wait(1.5)
        self.play(FadeOut(VGroup(xor_title, *row_groups, xor_note)), FadeOut(ch5))

        # ── Stage 6: Pseudocode ──────────────────────────────────────────────
        ch6 = self.chapter_title("Pseudocode")

        pseudo = VGroup(
            Text("def hamming_distance(a, b):", font_size=24, color=INK),
            Text("    assert len(a) == len(b)", font_size=24, color=GRAY),
            Text("    count = 0", font_size=24, color=INK),
            Text("    for i in range(len(a)):", font_size=24, color=INK),
            Text("        if a[i] != b[i]:", font_size=24, color=CORAL),
            Text("            count += 1", font_size=24, color=CORAL),
            Text("    return count", font_size=24, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(line, shift=RIGHT * 0.2) for line in pseudo], lag_ratio=0.15))
        self.wait(2.5)
        self.play(FadeOut(pseudo), FadeOut(ch6))

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Analysis")

        self.complexity_card(
            time_best=r"O(n)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(1)",
        )
        self.wait(2.5)
        self.play(FadeOut(ch7))
