from manim import *
from ...base import AlgoScene, ArrayVis


class TernarySearch(AlgoScene):
    TITLE = "Ternary Search"
    SUBTITLE = "Divides the search space into three equal parts using two midpoints and eliminat"
    CATEGORY = "search"

    def build(self):
        # ─── Stage 1: Intro ───────────────────────────────────────────────
        self.chapter_title("Introduction")
        intro_lines = VGroup(
            Text("Ternary Search works on a sorted array", font_size=28),
            Text("It divides the search space into THREE equal parts", font_size=28),
            Text("Two midpoints: mid1 and mid2", font_size=28),
            Text("Eliminates one-third of the search space each step", font_size=28),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        for line in intro_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.3), run_time=0.6)
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ─── Stage 2: Array Setup ─────────────────────────────────────────
        self.chapter_title("Array Setup")
        data = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
        target = 23
        target_label = Text(f"Target = {target}", font_size=30, color=YELLOW)
        target_label.to_edge(UP, buff=1.2)
        self.play(Write(target_label))

        arr_vis = ArrayVis(data, cell_size=0.75)
        arr_vis.move_to(ORIGIN)
        self.play(FadeIn(arr_vis))
        self.wait(1)

        # Index labels
        index_labels = VGroup()
        for i in range(len(data)):
            lbl = Text(str(i), font_size=18, color=GRAY)
            lbl.next_to(arr_vis.cells[i], DOWN, buff=0.15)
            index_labels.add(lbl)
        self.play(FadeIn(index_labels))
        self.wait(1)

        # ─── Stage 3: First Iteration ─────────────────────────────────────
        self.chapter_title("Iteration 1: Divide into Three Parts")
        lo, hi = 0, len(data) - 1

        def get_mid1(l, h):
            return l + (h - l) // 3

        def get_mid2(l, h):
            return h - (h - l) // 3

        mid1 = get_mid1(lo, hi)
        mid2 = get_mid2(lo, hi)

        # Highlight lo/hi boundaries
        lo_rect = SurroundingRectangle(arr_vis.cells[lo], color=GREEN, buff=0.05)
        hi_rect = SurroundingRectangle(arr_vis.cells[hi], color=RED, buff=0.05)
        lo_lbl = Text("lo", font_size=20, color=GREEN).next_to(arr_vis.cells[lo], UP, buff=0.15)
        hi_lbl = Text("hi", font_size=20, color=RED).next_to(arr_vis.cells[hi], UP, buff=0.15)

        self.play(Create(lo_rect), Create(hi_rect), Write(lo_lbl), Write(hi_lbl))
        self.wait(0.5)

        mid1_rect = SurroundingRectangle(arr_vis.cells[mid1], color=BLUE, buff=0.05)
        mid2_rect = SurroundingRectangle(arr_vis.cells[mid2], color=PURPLE, buff=0.05)
        mid1_lbl = Text("mid1", font_size=18, color=BLUE).next_to(arr_vis.cells[mid1], UP, buff=0.15)
        mid2_lbl = Text("mid2", font_size=18, color=PURPLE).next_to(arr_vis.cells[mid2], UP, buff=0.15)

        self.play(Create(mid1_rect), Create(mid2_rect), Write(mid1_lbl), Write(mid2_lbl))
        self.wait(0.8)

        # Show values
        val_text = Text(
            f"mid1={mid1} (val={data[mid1]}),  mid2={mid2} (val={data[mid2]})",
            font_size=24, color=WHITE
        ).to_edge(DOWN, buff=1.0)
        self.play(Write(val_text))
        self.wait(1)

        # Compare target with mid1
        compare1 = Text(
            f"target {target} > data[mid1] {data[mid1]}  →  search right of mid1",
            font_size=22, color=YELLOW
        ).to_edge(DOWN, buff=0.4)
        self.play(FadeOut(val_text), Write(compare1))
        self.wait(1.2)

        # Eliminate left third (lo..mid1)
        for i in range(lo, mid1):
            self.play(arr_vis.cells[i].animate.set_fill(DARK_GRAY, opacity=0.5), run_time=0.15)
        self.wait(0.5)
        self.play(FadeOut(compare1))

        # ─── Stage 4: Second Iteration ────────────────────────────────────
        self.chapter_title("Iteration 2: Narrow the Search")
        lo2 = mid1 + 1
        hi2 = hi
        mid1_2 = get_mid1(lo2, hi2)
        mid2_2 = get_mid2(lo2, hi2)

        # Move lo pointer
        lo_rect2 = SurroundingRectangle(arr_vis.cells[lo2], color=GREEN, buff=0.05)
        lo_lbl2 = Text("lo", font_size=20, color=GREEN).next_to(arr_vis.cells[lo2], UP, buff=0.15)
        self.play(
            ReplacementTransform(lo_rect, lo_rect2),
            ReplacementTransform(lo_lbl, lo_lbl2),
            FadeOut(mid1_rect), FadeOut(mid2_rect),
            FadeOut(mid1_lbl), FadeOut(mid2_lbl),
        )

        mid1_rect2 = SurroundingRectangle(arr_vis.cells[mid1_2], color=BLUE, buff=0.05)
        mid2_rect2 = SurroundingRectangle(arr_vis.cells[mid2_2], color=PURPLE, buff=0.05)
        mid1_lbl2 = Text("mid1", font_size=18, color=BLUE).next_to(arr_vis.cells[mid1_2], UP, buff=0.15)
        mid2_lbl2 = Text("mid2", font_size=18, color=PURPLE).next_to(arr_vis.cells[mid2_2], UP, buff=0.15)
        self.play(Create(mid1_rect2), Create(mid2_rect2), Write(mid1_lbl2), Write(mid2_lbl2))
        self.wait(0.8)

        compare2 = Text(
            f"target {target} == data[mid1] {data[mid1_2]}  →  Found!",
            font_size=22, color=GREEN
        ).to_edge(DOWN, buff=0.7)
        self.play(Write(compare2))
        self.wait(1)

        # Highlight found cell
        found_rect = SurroundingRectangle(arr_vis.cells[mid1_2], color=GOLD, buff=0.1)
        found_lbl = Text("FOUND!", font_size=22, color=GOLD).next_to(arr_vis.cells[mid1_2], DOWN, buff=0.5)
        self.play(
            FadeOut(mid1_rect2), FadeOut(mid2_rect2),
            Create(found_rect),
            Flash(arr_vis.cells[mid1_2], color=GOLD, flash_radius=0.5),
            Write(found_lbl),
        )
        self.wait(1.5)

        # ─── Stage 5: Decision Logic Diagram ─────────────────────────────
        self.chapter_title("Decision Logic")
        self.play(
            FadeOut(arr_vis), FadeOut(index_labels),
            FadeOut(lo_rect2), FadeOut(hi_rect),
            FadeOut(lo_lbl2), FadeOut(hi_lbl),
            FadeOut(mid1_lbl2), FadeOut(mid2_lbl2),
            FadeOut(found_rect), FadeOut(found_lbl),
            FadeOut(compare2), FadeOut(target_label),
        )

        decision_title = Text("At each step, compare target with mid1 and mid2:", font_size=26)
        decision_title.to_edge(UP, buff=1.5)
        self.play(Write(decision_title))

        cases = VGroup(
            Text("• target == data[mid1]  →  return mid1", font_size=24, color=GREEN),
            Text("• target == data[mid2]  →  return mid2", font_size=24, color=GREEN),
            Text("• target < data[mid1]   →  hi = mid1 - 1  (left third)", font_size=24, color=BLUE),
            Text("• target > data[mid2]   →  lo = mid2 + 1  (right third)", font_size=24, color=RED),
            Text("• else                  →  lo = mid1 + 1, hi = mid2 - 1  (middle third)", font_size=24, color=YELLOW),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).next_to(decision_title, DOWN, buff=0.6)

        for case in cases:
            self.play(FadeIn(case, shift=RIGHT * 0.2), run_time=0.5)
        self.wait(2)
        self.play(FadeOut(decision_title), FadeOut(cases))

        # ─── Stage 6: Complexity Card ─────────────────────────────────────
        self.chapter_title("Complexity Analysis")
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(log₃ n)",
            time_worst="O(log₃ n)",
            space="O(1)",
        )
        self.wait(2)
