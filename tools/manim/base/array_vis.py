"""ArrayVis — animated array for AlgoMotion scenes.

Wraps a list of values into a row of coloured squares with value labels.
Provides frame-by-frame animation helpers: compare, swap, mark_sorted, etc.
"""
from __future__ import annotations

import time
from typing import TYPE_CHECKING

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    AnimationGroup,
    Create,
    FadeIn,
    FadeOut,
    Indicate,
    MoveToTarget,
    Rectangle,
    SurroundingRectangle,
    Text,
    Transform,
    VGroup,
    Wait,
)

if TYPE_CHECKING:
    from .algo_scene import AlgoScene

from .algo_scene import (
    C_ACTIVE,
    C_BG,
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
    SIGNAL,
)

CELL_SIZE = 0.85          # width = height of each cell
CELL_STROKE = 2.5
LABEL_FONT = 26
INDEX_FONT = 16


class ArrayVis:
    """Animated array visualization.

    Parameters
    ----------
    scene:
        The Manim scene that owns this visualisation.
    values:
        Initial list of numbers.
    cell_size:
        Width/height of each cell square.
    center:
        Where to place the array centre (Manim coordinates).
    show_indices:
        Whether to draw 0-based index labels below each cell.
    """

    def __init__(
        self,
        scene: "AlgoScene",
        values: list[int | float],
        *,
        cell_size: float = CELL_SIZE,
        center=None,
        show_indices: bool = True,
    ) -> None:
        self.scene = scene
        self.values = list(values)
        self.cell_size = cell_size
        self.show_indices = show_indices

        self.cells: list[Rectangle] = []
        self.labels: list[Text] = []
        self.index_labels: list[Text] = []
        self._group: VGroup

        self._build(center)

    # ── construction ──────────────────────────────────────────────────────────

    def _build(self, center) -> None:
        n = len(self.values)
        cs = self.cell_size
        cells = VGroup()
        labels = VGroup()
        idx_labels = VGroup()

        for i, v in enumerate(self.values):
            rect = Rectangle(
                width=cs,
                height=cs,
                color=INK,
                fill_color=C_DEFAULT,
                fill_opacity=1,
                stroke_width=CELL_STROKE,
            )
            rect.shift(RIGHT * i * cs)
            self.cells.append(rect)
            cells.add(rect)

            lbl = Text(str(v), font_size=LABEL_FONT, color=INK, weight="BOLD")
            lbl.move_to(rect)
            self.labels.append(lbl)
            labels.add(lbl)

            if self.show_indices:
                idx = Text(str(i), font_size=INDEX_FONT, color=GRAY)
                idx.next_to(rect, DOWN, buff=0.12)
                self.index_labels.append(idx)
                idx_labels.add(idx)

        all_mobs = VGroup(cells, labels)
        if self.show_indices:
            all_mobs.add(idx_labels)

        if center is not None:
            all_mobs.move_to(center)

        self._group = all_mobs
        self.scene.play(Create(cells, run_time=0.7), FadeIn(labels, run_time=0.5))
        if self.show_indices:
            self.scene.play(FadeIn(idx_labels, run_time=0.4))

    def get_group(self) -> VGroup:
        return self._group

    # ── colour helpers ────────────────────────────────────────────────────────

    def set_color(self, indices: list[int], color: str, run_time: float = 0.4) -> None:
        """Recolour cells at given indices."""
        anims = [self.cells[i].animate.set_fill(color=color) for i in indices if 0 <= i < len(self.cells)]
        if anims:
            self.scene.play(AnimationGroup(*anims, run_time=run_time))

    def reset_colors(self, run_time: float = 0.35) -> None:
        anims = [c.animate.set_fill(color=C_DEFAULT) for c in self.cells]
        self.scene.play(AnimationGroup(*anims, run_time=run_time))

    # ── animation primitives ──────────────────────────────────────────────────

    def compare(self, i: int, j: int, *, pause: float = 0.5) -> None:
        """Highlight two cells being compared."""
        self.set_color([i, j], C_ACTIVE, run_time=0.35)
        self.scene.wait(pause)

    def swap(self, i: int, j: int, *, run_time: float = 0.55) -> None:
        """Visually swap cells i and j (updates internal state)."""
        ci, cj = self.cells[i], self.cells[j]
        li, lj = self.labels[i], self.labels[j]

        # Save targets
        ci.generate_target()
        cj.generate_target()
        ci.target.move_to(cj)
        cj.target.move_to(ci)
        li.generate_target()
        lj.generate_target()
        li.target.move_to(cj)
        lj.target.move_to(ci)

        self.scene.play(
            MoveToTarget(ci, run_time=run_time),
            MoveToTarget(cj, run_time=run_time),
            MoveToTarget(li, run_time=run_time),
            MoveToTarget(lj, run_time=run_time),
        )

        # Update internal arrays
        self.cells[i], self.cells[j] = self.cells[j], self.cells[i]
        self.labels[i], self.labels[j] = self.labels[j], self.labels[i]
        self.values[i], self.values[j] = self.values[j], self.values[i]

    def mark_sorted(self, indices: list[int], run_time: float = 0.35) -> None:
        self.set_color(indices, C_SORTED, run_time=run_time)

    def mark_pivot(self, index: int, run_time: float = 0.35) -> None:
        self.set_color([index], C_PIVOT, run_time=run_time)

    def indicate(self, index: int) -> None:
        self.scene.play(Indicate(self.cells[index], color=C_ACTIVE, scale_factor=1.25))

    def write_value(self, index: int, new_val: int | float, run_time: float = 0.4) -> None:
        """Update the displayed value at position index."""
        old_lbl = self.labels[index]
        new_lbl = Text(str(new_val), font_size=LABEL_FONT, color=INK, weight="BOLD")
        new_lbl.move_to(old_lbl)
        self.scene.play(Transform(old_lbl, new_lbl, run_time=run_time))
        self.labels[index] = new_lbl
        self.values[index] = new_val

    def brace_range(self, lo: int, hi: int, label: str = "") -> VGroup:
        """Draw a brace under cells[lo:hi+1] with optional label."""
        from manim import Brace
        group = VGroup(*self.cells[lo : hi + 1])
        brace = Brace(group, DOWN, color=COBALT)
        lbl_mob = brace.get_text(label, font_size=20, color=COBALT) if label else VGroup()
        g = VGroup(brace, lbl_mob)
        self.scene.play(Create(g, run_time=0.5))
        return g

    # ── full-algorithm helpers ────────────────────────────────────────────────

    def bubble_sort(self, *, show_pass_labels: bool = True) -> None:
        """Animate bubble sort step by step."""
        n = len(self.values)
        for i in range(n):
            for j in range(n - i - 1):
                self.compare(j, j + 1, pause=0.25)
                if self.values[j] > self.values[j + 1]:
                    self.swap(j, j + 1)
                else:
                    self.reset_colors(run_time=0.2)
            self.mark_sorted([n - i - 1])
        self.mark_sorted(list(range(n)))

    def selection_sort(self) -> None:
        n = len(self.values)
        for i in range(n):
            min_idx = i
            self.set_color([i], C_PIVOT)
            for j in range(i + 1, n):
                self.compare(min_idx, j, pause=0.2)
                if self.values[j] < self.values[min_idx]:
                    self.reset_colors(run_time=0.15)
                    min_idx = j
                    self.set_color([min_idx], C_ACTIVE)
                else:
                    self.reset_colors(run_time=0.15)
                    self.set_color([min_idx], C_PIVOT)
            if min_idx != i:
                self.swap(i, min_idx)
            self.mark_sorted([i])
        self.mark_sorted(list(range(n)))

    def insertion_sort(self) -> None:
        n = len(self.values)
        self.mark_sorted([0])
        for i in range(1, n):
            key = self.values[i]
            self.indicate(i)
            j = i - 1
            while j >= 0 and self.values[j] > key:
                self.compare(j, j + 1, pause=0.2)
                self.swap(j, j + 1)
                j -= 1
            self.mark_sorted(list(range(i + 1)))

    def highlight_range(self, lo: int, hi: int, color: str = MIST, run_time: float = 0.3) -> None:
        self.set_color(list(range(lo, hi + 1)), color, run_time=run_time)

    def flash_index(self, index: int, *, label: str = "") -> None:
        rect = SurroundingRectangle(self.cells[index], color=CORAL, stroke_width=3)
        self.scene.play(Create(rect, run_time=0.3))
        if label:
            lbl = Text(label, font_size=20, color=CORAL)
            lbl.next_to(self.cells[index], UP, buff=0.15)
            self.scene.play(FadeIn(lbl, run_time=0.2))
            self.scene.wait(0.4)
            self.scene.play(FadeOut(lbl), FadeOut(rect))
        else:
            self.scene.wait(0.3)
            self.scene.play(FadeOut(rect))
