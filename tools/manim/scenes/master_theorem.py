from manim import (
    BLUE,
    GREEN,
    ORANGE,
    WHITE,
    Create,
    FadeIn,
    LaggedStart,
    MathTex,
    Scene,
    Text,
    Transform,
    VGroup,
    Write,
)


class MasterTheorem(Scene):
    def construct(self) -> None:
        title = Text("Master Theorem", font_size=56, color=WHITE)
        recurrence = MathTex(r"T(n)=aT(n/b)+f(n)", color=BLUE).scale(1.25)
        recurrence.next_to(title, direction=(0, -1, 0), buff=0.6)

        cases = VGroup(
            MathTex(r"f(n)=O(n^{\log_ba-\epsilon})", color=GREEN),
            MathTex(r"f(n)=\Theta(n^{\log_ba}\log^k n)", color=ORANGE),
            MathTex(r"f(n)=\Omega(n^{\log_ba+\epsilon})", color=BLUE),
        ).arrange(direction=(0, -1, 0), buff=0.45)
        cases.next_to(recurrence, direction=(0, -1, 0), buff=0.9)

        conclusion = MathTex(r"T(n)=\Theta(n^{\log_ba})", color=GREEN).scale(1.2)
        conclusion.move_to(recurrence)

        self.play(Write(title), Create(recurrence))
        self.play(LaggedStart(*(FadeIn(case, shift=(0, 0.25, 0)) for case in cases), lag_ratio=0.25))
        self.wait(1)
        self.play(cases.animate.set_opacity(0.18), Transform(recurrence, conclusion))
        self.wait(1)
