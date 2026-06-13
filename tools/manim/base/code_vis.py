"""CodeHighlight — animated syntax-highlighted code block for AlgoMotion scenes."""
from __future__ import annotations

from typing import TYPE_CHECKING

from manim import (
    Code,
    Create,
    FadeIn,
    FadeOut,
    Indicate,
    Rectangle,
    SurroundingRectangle,
    Text,
    VGroup,
    RIGHT, LEFT, UP, DOWN,
)

if TYPE_CHECKING:
    from .algo_scene import AlgoScene

from .algo_scene import INK, COBALT, CORAL, SIGNAL, MIST, GRAY


class CodeHighlight:
    """Wrapper around Manim's Code mobject with line-highlight helpers.

    Parameters
    ----------
    scene:
        Owner scene.
    code_str:
        Source code string.
    language:
        Pygments language string (e.g. "python", "javascript").
    font_size:
        Font size for the code block.
    """

    def __init__(
        self,
        scene: "AlgoScene",
        code_str: str,
        *,
        language: str = "python",
        font_size: int = 20,
        center=None,
    ) -> None:
        self.scene = scene
        self.code_str = code_str
        self.language = language

        try:
            self._mob = Code(
                code=code_str,
                language=language,
                font_size=font_size,
                background="rectangle",
                background_stroke_color=COBALT,
                background_stroke_width=2,
                insert_line_no=True,
                line_no_from=1,
            )
        except Exception:
            # Fallback if Code fails (missing Pygments style, etc.)
            self._mob = Text(code_str, font_size=font_size - 2, color=INK, font="Courier New")

        if center is not None:
            self._mob.move_to(center)

        self.scene.play(Create(self._mob, run_time=0.8))
        self._highlights: list = []

    def highlight_line(self, line_no: int, *, color: str = CORAL, run_time: float = 0.4) -> Rectangle:
        """Draw a coloured rectangle behind the given line number (1-indexed)."""
        if not hasattr(self._mob, "code"):
            return
        try:
            lines = self._mob.code
            if line_no < 1 or line_no > len(lines):
                return
            line_mob = lines[line_no - 1]
            rect = SurroundingRectangle(line_mob, color=color, stroke_width=0,
                                        fill_color=color, fill_opacity=0.25,
                                        buff=0.06)
            self.scene.play(FadeIn(rect, run_time=run_time))
            self._highlights.append(rect)
            return rect
        except Exception:
            return None

    def clear_highlights(self, run_time: float = 0.3) -> None:
        if self._highlights:
            self.scene.play(FadeOut(VGroup(*self._highlights), run_time=run_time))
            self._highlights.clear()

    def highlight_lines(self, *line_nos: int, color: str = CORAL) -> list:
        return [self.highlight_line(n, color=color) for n in line_nos]

    def indicate_line(self, line_no: int) -> None:
        if not hasattr(self._mob, "code"):
            return
        try:
            lines = self._mob.code
            if 1 <= line_no <= len(lines):
                self.scene.play(Indicate(lines[line_no - 1], color=CORAL, scale_factor=1.05))
        except Exception:
            pass

    def remove(self, run_time: float = 0.4) -> None:
        self.clear_highlights(run_time=0.2)
        self.scene.play(FadeOut(self._mob, run_time=run_time))
