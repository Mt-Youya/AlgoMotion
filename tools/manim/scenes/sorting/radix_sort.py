"""Radix Sort — AlgoMotion Manim scene.

Visualises radix sort processing digits from LSD (least significant digit)
to MSD (most significant digit), using counting sort as a subroutine.
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    AnimationGroup,
    Arrow,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Rectangle,
    SurroundingRectangle,
    Text,
    Transform,
    VGroup,
    Write,
)

from ...base import AlgoScene
from ...base.algo_scene import (
    C_ACTIVE,
    C_DEFAULT,
    C_PIVOT,
    C_SORTED,
    C_SUBTEXT,
    C_TEXT,
    COBALT,
    CORAL,
    GRAY,
    INK,
    MIST,
    PAPER,
    SIGNAL,
)
from ...base.array_vis import ArrayVis, CELL_SIZE, LABEL_FONT


# ── helpers ───────────────────────────────────────────────────────────────────

def _digit(n: int, place: int) -> int:
    """Return the digit of n at the given decimal place (0 = units)."""
    return (n // (10 ** place)) % 10


def _counting_sort_by_digit(arr: list[int], place: int) -> list[int]:
    """Stable counting sort on arr keyed by one decimal digit."""
    count = [0] * 10
    for v in arr:
        count[_digit(v, place)] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for v in reversed(arr):
        d = _digit(v, place)
        count[d] -= 1
        output[count[d]] = v
    return output


# ── scene ─────────────────────────────────────────────────────────────────────

class RadixSort(AlgoScene):
    TITLE    = "Radix Sort"
    SUBTITLE = "Sorts integers digit by digit from least significant to most significant, using"
    CATEGORY = "sorting"

    # Starting array — two-digit numbers for clear digit-by-digit demo
    DATA = [170, 45, 75, 90, 802, 24, 2, 66]

    def build(self) -> None:
        # ── Stage 1: Problem setup ────────────────────────────────────────────
        ch1 = self.chapter_title("The Problem")
        cap = self.caption("Sort integers without comparing values directly")
        self.wait(1.0)
        self.play(FadeOut(ch1), FadeOut(cap))

        # Show the unsorted array
        ch2 = self.chapter_title("Initial Array")
        arr_vis = ArrayVis(self, self.DATA, center=UP * 0.5)
        self.wait(0.8)

        # Annotate: each number has digits
        note = Text(
            "Each number has digits: units, tens, hundreds …",
            font_size=26,
            color=GRAY,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(note))
        self.wait(1.2)
        self.play(FadeOut(note), FadeOut(ch2))

        # ── Stage 2: Digit-place concept ─────────────────────────────────────
        ch3 = self.chapter_title("Digit Places")
        self._show_digit_place_labels(arr_vis)
        self.wait(1.0)
        self.play(FadeOut(ch3))

        # ── Stage 3: Pass 1 — sort by units digit ────────────────────────────
        ch4 = self.chapter_title("Pass 1 — Units Digit (10⁰)")
        sorted_pass1 = self._animate_pass(arr_vis, place=0, pass_num=1)
        self.wait(0.8)
        self.play(FadeOut(ch4))

        # ── Stage 4: Pass 2 — sort by tens digit ─────────────────────────────
        ch5 = self.chapter_title("Pass 2 — Tens Digit (10¹)")
        sorted_pass2 = self._animate_pass_rebuild(arr_vis, sorted_pass1, place=1, pass_num=2)
        self.wait(0.8)
        self.play(FadeOut(ch5))

        # ── Stage 5: Pass 3 — sort by hundreds digit ─────────────────────────
        ch6 = self.chapter_title("Pass 3 — Hundreds Digit (10²)")
        sorted_pass3 = self._animate_pass_rebuild(arr_vis, sorted_pass2, place=2, pass_num=3)
        self.wait(0.8)
        self.play(FadeOut(ch6))

        # ── Stage 6: Final sorted state ──────────────────────────────────────
        ch7 = self.chapter_title("Sorted!")
        arr_vis.mark_sorted(list(range(len(self.DATA))))
        final_note = Text(
            "All elements sorted — O(d · (n + k)) total",
            font_size=26,
            color=INK,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(final_note))
        self.wait(1.5)
        self.play(FadeOut(final_note), FadeOut(ch7))

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        ch8 = self.chapter_title("Complexity Summary")
        card = self.complexity_card(
            r"O(d \cdot (n+k))",
            r"O(d \cdot (n+k))",
            r"O(d \cdot (n+k))",
            r"O(n+k)",
        )
        self.wait(2.0)
        self.play(FadeOut(card), FadeOut(ch8))

    # ── helpers ───────────────────────────────────────────────────────────────

    def _show_digit_place_labels(self, arr_vis: ArrayVis) -> None:
        """Briefly highlight the units / tens / hundreds columns."""
        labels = []
        for place, name in enumerate(["units", "tens", "hundreds"]):
            mobs = []
            for i, v in enumerate(arr_vis.values):
                d = _digit(v, place)
                highlight = SurroundingRectangle(
                    arr_vis.cells[i], color=CORAL, stroke_width=2.5
                )
                digit_lbl = Text(str(d), font_size=20, color=CORAL)
                digit_lbl.next_to(arr_vis.cells[i], UP, buff=0.18)
                mobs.extend([highlight, digit_lbl])

            place_label = Text(
                f"← {name} digit",
                font_size=24,
                color=COBALT,
            ).to_edge(DOWN, buff=0.5)

            group = VGroup(*mobs)
            self.play(Create(group, run_time=0.6), FadeIn(place_label))
            self.wait(0.9)
            self.play(FadeOut(group), FadeOut(place_label))

    def _animate_pass(self, arr_vis: ArrayVis, *, place: int, pass_num: int) -> list[int]:
        """Animate one counting-sort pass and return the new order."""
        current = list(arr_vis.values)
        result = _counting_sort_by_digit(current, place)

        # Show which digit we are extracting
        digit_note = Text(
            f"Extracting digit at place 10^{place}",
            font_size=24,
            color=COBALT,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(digit_note))
        self.wait(0.6)

        # Highlight each cell's relevant digit
        for i, v in enumerate(current):
            d = _digit(v, place)
            lbl = Text(str(d), font_size=20, color=CORAL)
            lbl.next_to(arr_vis.cells[i], UP, buff=0.18)
            self.play(FadeIn(lbl, run_time=0.2))
            arr_vis.set_color([i], C_ACTIVE, run_time=0.2)
            self.wait(0.15)
            self.play(FadeOut(lbl, run_time=0.15))
            arr_vis.set_color([i], C_DEFAULT, run_time=0.15)

        self.play(FadeOut(digit_note))

        # Rebuild the array row with the sorted order
        self._rebuild_array_row(arr_vis, result)
        return result

    def _animate_pass_rebuild(
        self,
        arr_vis: ArrayVis,
        current: list[int],
        *,
        place: int,
        pass_num: int,
    ) -> list[int]:
        """Like _animate_pass but starts from an already-updated value list."""
        result = _counting_sort_by_digit(current, place)

        digit_note = Text(
            f"Extracting digit at place 10^{place}",
            font_size=24,
            color=COBALT,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(digit_note))
        self.wait(0.5)

        # Flash each cell
        for i, v in enumerate(arr_vis.values):
            d = _digit(v, place)
            lbl = Text(str(d), font_size=20, color=CORAL)
            lbl.next_to(arr_vis.cells[i], UP, buff=0.18)
            self.play(FadeIn(lbl, run_time=0.18))
            arr_vis.set_color([i], C_ACTIVE, run_time=0.18)
            self.wait(0.12)
            self.play(FadeOut(lbl, run_time=0.12))
            arr_vis.set_color([i], C_DEFAULT, run_time=0.12)

        self.play(FadeOut(digit_note))
        self._rebuild_array_row(arr_vis, result)
        return result

    def _rebuild_array_row(self, arr_vis: ArrayVis, new_values: list[int]) -> None:
        """Replace each cell's label with the new sorted value."""
        anims = []
        for i, new_val in enumerate(new_values):
            old_lbl = arr_vis.labels[i]
            new_lbl = Text(str(new_val), font_size=LABEL_FONT, color=INK, weight="BOLD")
            new_lbl.move_to(old_lbl)
            anims.append(Transform(old_lbl, new_lbl))
            arr_vis.values[i] = new_val

        self.play(AnimationGroup(*anims, run_time=0.6))
        self.wait(0.4)
