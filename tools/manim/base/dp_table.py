"""DPTable — animated 1-D or 2-D DP table for AlgoMotion scenes."""
from __future__ import annotations

from typing import TYPE_CHECKING

from manim import (
    Create, FadeIn, FadeOut, Transform,
    Rectangle, Text, VGroup, AnimationGroup,
    Indicate, RIGHT, LEFT, UP, DOWN,
)

if TYPE_CHECKING:
    from .algo_scene import AlgoScene

from .algo_scene import (
    C_DEFAULT, C_ACTIVE, C_SORTED, COBALT, CORAL, SIGNAL, INK, GRAY, MIST
)

CELL_W = 0.75
CELL_H = 0.65
CELL_STROKE = 2.0
CELL_FONT = 20
HEADER_FONT = 18


class DPTable:
    """1-D or 2-D DP table with animated cell fills and updates.

    Parameters
    ----------
    scene:
        Owner scene.
    rows x cols:
        Dimensions. rows=1 creates a 1-D array.
    row_labels / col_labels:
        Optional header labels.
    """

    def __init__(
        self,
        scene: "AlgoScene",
        rows: int,
        cols: int,
        *,
        row_labels: list | None = None,
        col_labels: list | None = None,
        cell_width: float = CELL_W,
        cell_height: float = CELL_H,
        center=None,
        initial: list | None = None,
    ) -> None:
        self.scene = scene
        self.rows = rows
        self.cols = cols
        self.cw = cell_width
        self.ch = cell_height
        self.row_labels = row_labels
        self.col_labels = col_labels

        self._cells: list[list[Rectangle]] = []
        self._labels: list[list[Text]] = []
        self._values: list[list] = [[None] * cols for _ in range(rows)]

        self._build(center, initial)

    def _build(self, center, initial) -> None:
        import numpy as np
        total_w = self.cols * self.cw
        total_h = self.rows * self.ch
        origin = np.array([-total_w / 2, total_h / 2, 0])
        if center is not None:
            origin = np.array(center) + np.array([-total_w / 2, total_h / 2, 0])

        cell_group = VGroup()
        label_group = VGroup()

        for r in range(self.rows):
            row_cells = []
            row_labels = []
            for c in range(self.cols):
                x = origin[0] + c * self.cw + self.cw / 2
                y = origin[1] - r * self.ch - self.ch / 2
                rect = Rectangle(
                    width=self.cw, height=self.ch,
                    color=INK, fill_color=MIST, fill_opacity=1,
                    stroke_width=CELL_STROKE,
                )
                rect.move_to([x, y, 0])

                val = ""
                if initial and r < len(initial) and c < len(initial[r]):
                    val = str(initial[r][c])
                    self._values[r][c] = initial[r][c]
                lbl = Text(str(val), font_size=CELL_FONT, color=INK)
                lbl.move_to([x, y, 0])

                row_cells.append(rect)
                row_labels.append(lbl)
                cell_group.add(rect)
                label_group.add(lbl)

            self._cells.append(row_cells)
            self._labels.append(row_labels)

        # Column headers
        hdr_group = VGroup()
        if self.col_labels:
            for c, lbl in enumerate(self.col_labels):
                x = origin[0] + c * self.cw + self.cw / 2
                y = origin[1] + self.ch * 0.6
                t = Text(str(lbl), font_size=HEADER_FONT, color=GRAY)
                t.move_to([x, y, 0])
                hdr_group.add(t)

        # Row headers
        if self.row_labels:
            for r, lbl in enumerate(self.row_labels):
                x = origin[0] - self.cw * 0.6
                y = origin[1] - r * self.ch - self.ch / 2
                t = Text(str(lbl), font_size=HEADER_FONT, color=GRAY)
                t.move_to([x, y, 0])
                hdr_group.add(t)

        self.scene.play(Create(cell_group, run_time=0.7))
        self.scene.play(FadeIn(label_group, run_time=0.4))
        if hdr_group:
            self.scene.play(FadeIn(hdr_group, run_time=0.4))

    # ── animation helpers ─────────────────────────────────────────────────────

    def set_value(self, r: int, c: int, value, *, color: str = C_ACTIVE, run_time: float = 0.45) -> None:
        """Update a cell with a new value and highlight it."""
        cell = self._cells[r][c]
        old_lbl = self._labels[r][c]
        new_lbl = Text(str(value), font_size=CELL_FONT, color=INK, weight="BOLD")
        new_lbl.move_to(cell)
        self.scene.play(
            cell.animate.set_fill(color=color),
            Transform(old_lbl, new_lbl, run_time=run_time),
        )
        self._labels[r][c] = new_lbl
        self._values[r][c] = value

    def highlight(self, r: int, c: int, color: str = C_ACTIVE, run_time: float = 0.35) -> None:
        self.scene.play(self._cells[r][c].animate.set_fill(color=color), run_time=run_time)

    def mark_done(self, r: int, c: int, run_time: float = 0.3) -> None:
        self.scene.play(self._cells[r][c].animate.set_fill(color=C_SORTED), run_time=run_time)

    def reset_colors(self, run_time: float = 0.35) -> None:
        anims = [
            self._cells[r][c].animate.set_fill(color=MIST)
            for r in range(self.rows) for c in range(self.cols)
        ]
        self.scene.play(AnimationGroup(*anims, run_time=run_time))

    def indicate(self, r: int, c: int) -> None:
        self.scene.play(Indicate(self._cells[r][c], color=CORAL, scale_factor=1.15))

    def fill_row(self, r: int, values: list, *, base_color: str = MIST, done_color: str = C_SORTED,
                 run_time_each: float = 0.4) -> None:
        for c, val in enumerate(values):
            self.set_value(r, c, val, color=done_color, run_time=run_time_each)

    def fill_1d(self, values: list, *, done_color: str = C_SORTED, run_time_each: float = 0.4) -> None:
        self.fill_row(0, values, done_color=done_color, run_time_each=run_time_each)
