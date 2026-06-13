from manim import *
from ...base import AlgoScene, ArrayVis
from ...base.algo_scene import (
    INK, COBALT, SIGNAL, CORAL, MIST, GRAY, PAPER, WHITE,
    C_DEFAULT, C_ACTIVE, C_SORTED, C_PIVOT,
)


class BucketSort(AlgoScene):
    TITLE = "Bucket Sort"
    SUBTITLE = "Distributes elements into buckets, sorts each bucket, then concatenates buckets "
    CATEGORY = "sorting"

    def build(self):
        # ── Stage 1: Introduction ───────────────────────────────────────────
        intro_label = self.chapter_title("Introduction")
        self.wait(0.5)

        intro_text = VGroup(
            Text("Bucket Sort divides elements into numbered buckets,", font_size=28, color=INK),
            Text("sorts each bucket individually, then merges them back.", font_size=28, color=INK),
            Text("Ideal when input is uniformly distributed over a range.", font_size=26, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        intro_text.next_to(intro_label, DOWN, buff=0.7)
        self.play(FadeIn(intro_text))
        self.wait(2.5)
        self.play(FadeOut(intro_text), FadeOut(intro_label))

        # ── Stage 2: Array Setup ────────────────────────────────────────────
        setup_label = self.chapter_title("Array Setup")
        self.wait(0.5)

        data = [0.42, 0.73, 0.11, 0.85, 0.27, 0.64, 0.09, 0.55]
        int_data = [42, 73, 11, 85, 27, 64, 9, 55]

        array_vis = ArrayVis(self, int_data, label="Input (×100)")
        array_vis.get_group().move_to(UP * 1.5)

        range_text = Text(
            "Values in range [0, 100)  →  5 buckets of width 20",
            font_size=24,
            color=GRAY,
        ).next_to(array_vis.get_group(), DOWN, buff=0.5)
        self.play(FadeIn(range_text))
        self.wait(1.5)
        self.play(FadeOut(setup_label))

        # ── Stage 3: Create Buckets ─────────────────────────────────────────
        bucket_label = self.chapter_title("Step 1 — Create Buckets")
        self.wait(0.5)

        num_buckets = 5
        bucket_width = 20
        bucket_rects = VGroup()
        bucket_titles = VGroup()
        bucket_contents: list[list[int]] = [[] for _ in range(num_buckets)]

        for b in range(num_buckets):
            lo = b * bucket_width
            hi = lo + bucket_width
            rect = Rectangle(
                width=1.6,
                height=2.2,
                color=COBALT,
                fill_color=MIST,
                fill_opacity=0.6,
                stroke_width=2,
            )
            rect.shift(RIGHT * (b * 2.0 - 4.0) + DOWN * 0.5)
            bucket_rects.add(rect)

            title = Text(f"[{lo},{hi})", font_size=18, color=COBALT)
            title.next_to(rect, UP, buff=0.15)
            bucket_titles.add(title)

        self.play(
            FadeOut(range_text),
            Create(bucket_rects, run_time=0.8),
            FadeIn(bucket_titles, run_time=0.6),
        )
        self.wait(1)
        self.play(FadeOut(bucket_label))

        # ── Stage 4: Distribute Elements into Buckets ──────────────────────
        dist_label = self.chapter_title("Step 2 — Distribute Elements")
        self.wait(0.5)

        value_mobs: list[VGroup] = []
        for i, val in enumerate(int_data):
            b_idx = min(val // bucket_width, num_buckets - 1)
            bucket_contents[b_idx].append(val)

            dot = Circle(radius=0.22, color=C_ACTIVE, fill_color=C_ACTIVE, fill_opacity=1)
            dot_lbl = Text(str(val), font_size=16, color=INK, weight="BOLD")
            dot_lbl.move_to(dot)
            mob = VGroup(dot, dot_lbl)

            start_pos = array_vis.cells[i].get_center()
            mob.move_to(start_pos)
            self.add(mob)

            target_rect = bucket_rects[b_idx]
            offset_y = -0.6 + len([m for m in value_mobs if m is not None]) * 0.0
            # Stack inside bucket vertically
            count_in_bucket = len(bucket_contents[b_idx]) - 1
            target_pos = target_rect.get_center() + UP * (0.7 - count_in_bucket * 0.45)

            self.play(mob.animate.move_to(target_pos), run_time=0.5)
            self.wait(0.1)
            value_mobs.append(mob)

        self.wait(1)
        self.play(FadeOut(dist_label))

        # ── Stage 5: Sort Each Bucket ───────────────────────────────────────
        sort_label = self.chapter_title("Step 3 — Sort Each Bucket")
        self.wait(0.5)

        sort_text = Text(
            "Apply insertion sort within each bucket",
            font_size=26,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(sort_text))

        for b_idx, bucket in enumerate(bucket_contents):
            if len(bucket) <= 1:
                continue
            rect = bucket_rects[b_idx]
            flash = SurroundingRectangle(rect, color=SIGNAL, stroke_width=4)
            self.play(Create(flash, run_time=0.4))

            sorted_bucket = sorted(bucket)
            bucket_contents[b_idx] = sorted_bucket

            sorted_label_mob = Text(
                " → ".join(str(v) for v in sorted_bucket),
                font_size=18,
                color=COBALT,
                weight="BOLD",
            )
            sorted_label_mob.next_to(rect, DOWN, buff=0.25)
            self.play(FadeIn(sorted_label_mob, run_time=0.5))
            self.wait(0.5)
            self.play(FadeOut(flash), FadeOut(sorted_label_mob), run_time=0.3)

        self.wait(0.5)
        self.play(FadeOut(sort_text), FadeOut(sort_label))

        # ── Stage 6: Concatenate Buckets ────────────────────────────────────
        concat_label = self.chapter_title("Step 4 — Concatenate Buckets")
        self.wait(0.5)

        flat_sorted = []
        for b in bucket_contents:
            flat_sorted.extend(b)

        result_title = Text("Sorted Result:", font_size=26, color=INK, weight="BOLD")
        result_title.to_edge(DOWN, buff=1.6)
        self.play(FadeIn(result_title))

        result_cells = VGroup()
        for i, val in enumerate(flat_sorted):
            cell = Rectangle(
                width=0.75,
                height=0.75,
                color=INK,
                fill_color=C_SORTED,
                fill_opacity=1,
                stroke_width=2,
            )
            cell.shift(RIGHT * (i * 0.8 - len(flat_sorted) * 0.4) + DOWN * 2.6)
            lbl = Text(str(val), font_size=18, color=INK, weight="BOLD")
            lbl.move_to(cell)
            result_cells.add(VGroup(cell, lbl))

        self.play(FadeIn(result_cells, run_time=1.0))
        self.wait(2)

        concat_done = Text(
            "All buckets merged — array is fully sorted!",
            font_size=26,
            color=SIGNAL,
        ).next_to(result_cells, DOWN, buff=0.35)
        self.play(FadeIn(concat_done))
        self.wait(2)
        self.play(
            FadeOut(concat_done),
            FadeOut(result_cells),
            FadeOut(result_title),
            FadeOut(concat_label),
            FadeOut(bucket_rects),
            FadeOut(bucket_titles),
            *[FadeOut(m) for m in value_mobs],
            FadeOut(array_vis.get_group()),
        )

        # ── Stage 7: Key Insights ────────────────────────────────────────────
        insight_label = self.chapter_title("Key Insights")
        self.wait(0.5)

        insights = VGroup(
            Text("• Works best when data is uniformly distributed", font_size=26, color=INK),
            Text("• Number of buckets ≈ √n is a common heuristic", font_size=26, color=INK),
            Text("• Inner sort (insertion sort) is O(k²) per bucket", font_size=26, color=INK),
            Text("• Not comparison-based in the distribution phase", font_size=26, color=COBALT),
            Text("• Stable if inner sort is stable", font_size=26, color=COBALT),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        insights.move_to(ORIGIN)
        self.play(FadeIn(insights))
        self.wait(3)
        self.play(FadeOut(insights), FadeOut(insight_label))

        # ── Stage 8: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_best=r"O(n + k)",
            time_avg=r"O(n + k)",
            time_worst=r"O(n^2)",
            space=r"O(n + k)",
        )
        self.wait(2.5)
