"""AlgoScene — base class for all AlgoMotion Manim scenes.

Provides:
  - Consistent AlgoMotion colour palette (oklch-approximated sRGB)
  - Standard intro / outro sequences
  - Chapter-title helpers
  - Section label management
"""
from __future__ import annotations

from manim import (
    BLACK,
    DOWN,
    LEFT,
    RIGHT,
    UP,
    Camera,
    Create,
    FadeIn,
    FadeOut,
    MathTex,
    Rectangle,
    Scene,
    Text,
    VGroup,
    Wait,
    Write,
    config,
)

# ── AlgoMotion palette (sRGB approximations of oklch tokens) ─────────────────
PAPER   = "#F5F0E8"   # oklch(96% 0.012 95)
INK     = "#1A1C2C"   # oklch(19% 0.025 260)
COBALT  = "#2255CC"   # oklch(48% 0.22 265)
SIGNAL  = "#CEEB5A"   # oklch(87% 0.2 118)
CORAL   = "#E05A3A"   # oklch(67% 0.22 30)
MIST    = "#DDE4F0"   # oklch(91% 0.025 245)
WHITE   = "#FFFFFF"
GRAY    = "#888899"

# ── Convenience colour constants ──────────────────────────────────────────────
C_DEFAULT  = COBALT
C_ACTIVE   = CORAL
C_SORTED   = SIGNAL
C_PIVOT    = "#F0A030"
C_VISITED  = "#8855CC"
C_TEXT     = INK
C_BG       = PAPER
C_SUBTEXT  = GRAY


class AlgoScene(Scene):
    """Base scene for all AlgoMotion Manim animations.

    Subclasses override ``build()`` instead of ``construct()``.
    The base class wraps it with a branded intro and outro.

    Usage::

        class BubbleSortScene(AlgoScene):
            TITLE = "Bubble Sort"
            SUBTITLE = "O(n²) comparison-based sort"
            CATEGORY = "Sorting"

            def build(self):
                arr = ArrayVis(self, [5, 3, 8, 1, 9, 2])
                arr.bubble_sort()
    """

    TITLE: str = "Algorithm"
    SUBTITLE: str = ""
    CATEGORY: str = ""
    BG_COLOR: str = C_BG

    # ── lifecycle ─────────────────────────────────────────────────────────────

    def construct(self) -> None:
        self.camera.background_color = self.BG_COLOR
        self._play_intro()
        self.build()
        self._play_outro()

    def build(self) -> None:
        """Override in subclasses to add algorithm-specific animation."""

    # ── intro / outro ─────────────────────────────────────────────────────────

    def _play_intro(self) -> None:
        """Branded 3-second intro card."""
        category_label = Text(
            self.CATEGORY.upper(),
            font_size=22,
            color=COBALT,
            weight="BOLD",
        ).set_opacity(0.7)

        title = Text(self.TITLE, font_size=72, color=INK, weight="BOLD")
        title.set_stroke(width=0)

        subtitle = Text(self.SUBTITLE, font_size=28, color=GRAY)

        brand = Text(
            "AlgoMotion",
            font_size=18,
            color=COBALT,
            weight="BOLD",
        ).set_opacity(0.5)

        group = VGroup(category_label, title, subtitle).arrange(DOWN, buff=0.3)
        brand.to_corner(DOWN + RIGHT, buff=0.4)

        accent_bar = Rectangle(
            width=0.18,
            height=title.height * 1.1,
            color=SIGNAL,
            fill_color=SIGNAL,
            fill_opacity=1,
            stroke_width=0,
        ).next_to(title, LEFT, buff=0.25)

        self.play(
            FadeIn(group, shift=UP * 0.3, run_time=0.9),
            Create(accent_bar, run_time=0.9),
            FadeIn(brand, run_time=0.9),
        )
        self.wait(1.5)
        self.play(
            FadeOut(group, shift=UP * 0.15, run_time=0.5),
            FadeOut(accent_bar, run_time=0.5),
            FadeOut(brand, run_time=0.5),
        )
        self.wait(0.15)

    def _play_outro(self) -> None:
        """Branded 2-second outro."""
        brand = Text(
            "AlgoMotion  ·  " + self.TITLE,
            font_size=22,
            color=GRAY,
        )
        brand.to_corner(DOWN, buff=0.5)
        self.play(FadeIn(brand, run_time=0.5))
        self.wait(1.2)
        self.play(FadeOut(brand, run_time=0.4))

    # ── helpers ───────────────────────────────────────────────────────────────

    def chapter_title(self, text: str, *, color: str = INK) -> Text:
        """Display a floating chapter title for 1.5 s, then fade out."""
        label = Text(text, font_size=36, color=color, weight="BOLD")
        label.to_corner(UP + LEFT, buff=0.45)
        underline = Rectangle(
            width=label.width,
            height=0.06,
            color=SIGNAL,
            fill_color=SIGNAL,
            fill_opacity=1,
            stroke_width=0,
        ).next_to(label, DOWN, buff=0.06).align_to(label, LEFT)
        g = VGroup(label, underline)
        self.play(FadeIn(g, run_time=0.4))
        self.wait(1.2)
        return g  # caller is responsible for fading out

    def caption(self, text: str, *, run_time: float = 0.6) -> Text:
        """Write a centered caption at the bottom of the frame."""
        mob = Text(text, font_size=26, color=GRAY)
        mob.to_edge(DOWN, buff=0.35)
        self.play(Write(mob, run_time=run_time))
        return mob

    def complexity_card(
        self,
        time_best: str,
        time_avg: str,
        time_worst: str,
        space: str,
        *,
        position=None,
    ) -> VGroup:
        """Render a complexity summary card and animate it in."""
        rows = [
            ("Time (best)",  time_best,  SIGNAL),
            ("Time (avg)",   time_avg,   COBALT),
            ("Time (worst)", time_worst, CORAL),
            ("Space",        space,      MIST),
        ]
        entries = VGroup()
        for label, val, color in rows:
            lbl = Text(label, font_size=20, color=GRAY)
            val_mob = MathTex(val, color=color, font_size=28)
            row = VGroup(lbl, val_mob).arrange(RIGHT, buff=0.5)
            entries.add(row)
        entries.arrange(DOWN, aligned_edge=LEFT, buff=0.22)

        bg = Rectangle(
            width=entries.width + 0.8,
            height=entries.height + 0.6,
            color=MIST,
            fill_color=MIST,
            fill_opacity=1,
            stroke_color=COBALT,
            stroke_width=2,
        )
        card = VGroup(bg, entries)
        entries.move_to(bg)

        if position is not None:
            card.move_to(position)

        self.play(FadeIn(card, run_time=0.7))
        return card
