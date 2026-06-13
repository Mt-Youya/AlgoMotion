"""Array — AlgoMotion Manim scene.

Visualises the Array data structure: contiguous memory block with O(1)
random access by index.
"""
from __future__ import annotations

from manim import (
    DOWN,
    LEFT,
    RIGHT,
    UP,
    ORIGIN,
    Arrow,
    Create,
    FadeIn,
    FadeOut,
    LaggedStart,
    MathTex,
    Rectangle,
    Square,
    SurroundingRectangle,
    Text,
    Transform,
    VGroup,
    Write,
    Indicate,
    Brace,
    DashedLine,
    Line,
)

from ...base import AlgoScene, ArrayVis
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
    SIGNAL,
    PAPER,
)

CELL_W = 0.9
CELL_H = 0.9
STROKE = 2.5


def _make_cell(value: str, *, bg: str = MIST, fg: str = INK) -> VGroup:
    """Return a single labelled cell (square + text)."""
    rect = Rectangle(
        width=CELL_W,
        height=CELL_H,
        fill_color=bg,
        fill_opacity=1,
        stroke_color=COBALT,
        stroke_width=STROKE,
    )
    label = Text(str(value), font_size=28, color=fg, weight="BOLD")
    label.move_to(rect)
    return VGroup(rect, label)


def _make_array(values: list, *, bg: str = MIST) -> VGroup:
    """Return a row of cells for the given values."""
    cells = VGroup(*[_make_cell(v, bg=bg) for v in values])
    cells.arrange(RIGHT, buff=0)
    return cells


def _index_labels(cells: VGroup) -> VGroup:
    """Return index labels below each cell."""
    labels = VGroup()
    for i, cell in enumerate(cells):
        lbl = Text(str(i), font_size=18, color=GRAY)
        lbl.next_to(cell, DOWN, buff=0.12)
        labels.add(lbl)
    return labels


def _addr_labels(cells: VGroup, base: int = 0x100) -> VGroup:
    """Return hex address labels above each cell."""
    labels = VGroup()
    for i, cell in enumerate(cells):
        addr = Text(f"0x{base + i * 4:03X}", font_size=14, color=COBALT)
        addr.next_to(cell, UP, buff=0.12)
        labels.add(addr)
    return labels


class Array(AlgoScene):
    TITLE = "Array"
    SUBTITLE = "Contiguous memory block with O(1) random access by index."
    CATEGORY = "data-structure"

    def build(self) -> None:
        # ── Stage 1: Intro — what is an array? ───────────────────────────
        ch1 = self.chapter_title("What Is an Array?")
        self.wait(0.4)

        definition = VGroup(
            Text("An array stores elements in a", font_size=30, color=INK),
            Text("contiguous block of memory.", font_size=30, color=INK),
            Text("Each element occupies the same fixed size.", font_size=26, color=GRAY),
        ).arrange(DOWN, buff=0.28).shift(UP * 0.6)

        self.play(LaggedStart(*[FadeIn(line, shift=UP * 0.15) for line in definition], lag_ratio=0.25))
        self.wait(1.8)
        self.play(FadeOut(definition), FadeOut(ch1))

        # ── Stage 2: Memory layout visualisation ─────────────────────────
        ch2 = self.chapter_title("Memory Layout")
        self.wait(0.4)

        values = [12, 7, 45, 3, 28, 9]
        cells = _make_array(values)
        cells.move_to(ORIGIN + UP * 0.5)

        idx_labels = _index_labels(cells)
        addr_labels = _addr_labels(cells)

        mem_label = Text("Memory →", font_size=22, color=COBALT)
        mem_label.next_to(cells, LEFT, buff=0.35)

        self.play(
            LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cells], lag_ratio=0.08),
        )
        self.play(FadeIn(mem_label), FadeIn(idx_labels), FadeIn(addr_labels))
        self.wait(1.5)

        # Brace showing contiguous block
        brace = Brace(cells, direction=DOWN, color=SIGNAL)
        brace_text = brace.get_text("Contiguous block", font_size=22)
        brace_text.set_color(SIGNAL)
        self.play(Create(brace), Write(brace_text))
        self.wait(1.5)
        self.play(FadeOut(brace), FadeOut(brace_text), FadeOut(mem_label))
        self.wait(0.5)
        self.play(FadeOut(addr_labels), FadeOut(ch2))

        # ── Stage 3: O(1) random access by index ─────────────────────────
        ch3 = self.chapter_title("O(1) Random Access")
        self.wait(0.4)

        formula = MathTex(
            r"\text{addr}(i) = \text{base} + i \times \text{element\_size}",
            font_size=32,
            color=INK,
        ).shift(UP * 2.2)
        self.play(Write(formula))
        self.wait(0.8)

        # Highlight index 3 access
        access_text = Text("Access arr[3]", font_size=28, color=CORAL)
        access_text.next_to(cells, UP, buff=0.55)
        self.play(FadeIn(access_text, shift=DOWN * 0.2))

        arrow = Arrow(
            start=access_text.get_bottom() + DOWN * 0.05,
            end=cells[3].get_top() + UP * 0.05,
            color=CORAL,
            buff=0.1,
        )
        self.play(Create(arrow))
        self.play(Indicate(cells[3], color=CORAL, scale_factor=1.18))
        self.wait(1.2)

        # Show the value retrieved
        retrieved = Text(f"→  value = {values[3]}", font_size=26, color=SIGNAL)
        retrieved.next_to(access_text, RIGHT, buff=0.5)
        self.play(FadeIn(retrieved, shift=LEFT * 0.2))
        self.wait(1.5)
        self.play(FadeOut(formula), FadeOut(access_text), FadeOut(arrow), FadeOut(retrieved), FadeOut(ch3))

        # ── Stage 4: Traversal (sequential read) ─────────────────────────
        ch4 = self.chapter_title("Sequential Traversal")
        self.wait(0.4)

        scan_label = Text("Scan left → right", font_size=26, color=GRAY)
        scan_label.next_to(cells, UP, buff=0.55)
        self.play(FadeIn(scan_label))

        for i, cell in enumerate(cells):
            rect, lbl = cell
            # Highlight current cell
            self.play(
                rect.animate.set_fill(COBALT, opacity=0.9),
                lbl.animate.set_color(PAPER),
                run_time=0.25,
            )
            idx_labels[i].set_color(CORAL)
            self.wait(0.18)

        self.wait(0.8)
        # Restore colours
        for i, cell in enumerate(cells):
            rect, lbl = cell
            self.play(
                rect.animate.set_fill(MIST, opacity=1),
                lbl.animate.set_color(INK),
                run_time=0.15,
            )
            idx_labels[i].set_color(GRAY)

        self.play(FadeOut(scan_label), FadeOut(ch4))

        # ── Stage 5: Insertion at end vs middle ───────────────────────────
        ch5 = self.chapter_title("Insertion Cost")
        self.wait(0.4)

        # Insert at end: O(1) amortised
        end_label = Text("Insert at end → O(1) amortised", font_size=26, color=SIGNAL)
        end_label.next_to(cells, UP, buff=0.55)
        self.play(FadeIn(end_label))

        new_cell_end = _make_cell(99, bg=SIGNAL)
        new_cell_end.next_to(cells, RIGHT, buff=0)
        self.play(FadeIn(new_cell_end, shift=LEFT * 0.4))
        self.wait(1.0)
        self.play(FadeOut(new_cell_end), FadeOut(end_label))

        # Insert at middle: O(n) — shift elements
        mid_label = Text("Insert at index 2 → O(n): shift right", font_size=24, color=CORAL)
        mid_label.next_to(cells, UP, buff=0.55)
        self.play(FadeIn(mid_label))

        # Animate shifting cells 2..5 right
        shift_targets = list(range(2, len(cells)))
        shift_anims = [cells[i].animate.shift(RIGHT * CELL_W) for i in shift_targets]
        self.play(*shift_anims, run_time=0.7)

        new_cell_mid = _make_cell(55, bg=CORAL)
        new_cell_mid.move_to(cells[2].get_center() - RIGHT * CELL_W)
        self.play(FadeIn(new_cell_mid, shift=DOWN * 0.3))
        self.wait(1.0)

        # Restore
        restore_anims = [cells[i].animate.shift(LEFT * CELL_W) for i in shift_targets]
        self.play(FadeOut(new_cell_mid), *restore_anims, run_time=0.5)
        self.play(FadeOut(mid_label), FadeOut(ch5))

        # ── Stage 6: Deletion cost ────────────────────────────────────────
        ch6 = self.chapter_title("Deletion Cost")
        self.wait(0.4)

        del_label = Text("Delete index 1 → O(n): shift left", font_size=24, color=CORAL)
        del_label.next_to(cells, UP, buff=0.55)
        self.play(FadeIn(del_label))

        # Fade out cell[1] then shift remaining left
        self.play(FadeOut(cells[1]), run_time=0.4)
        shift_left_anims = [cells[i].animate.shift(LEFT * CELL_W) for i in range(2, len(cells))]
        self.play(*shift_left_anims, run_time=0.6)
        self.wait(1.0)

        # Restore cell[1]
        restore_left_anims = [cells[i].animate.shift(RIGHT * CELL_W) for i in range(2, len(cells))]
        self.play(*restore_left_anims, run_time=0.4)
        self.play(FadeIn(cells[1]))
        self.play(FadeOut(del_label), FadeOut(ch6))

        # ── Outro: complexity card ────────────────────────────────────────
        self.play(FadeOut(cells), FadeOut(idx_labels))
        self.wait(0.3)

        ch_end = self.chapter_title("Complexity Summary")
        self.wait(0.4)

        self.complexity_card(
            time_best=r"O(1)",
            time_avg=r"O(n)",
            time_worst=r"O(n)",
            space=r"O(n)",
        )
        self.wait(2.0)
        self.play(FadeOut(ch_end))
