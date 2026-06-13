from manim import *
from ...base import AlgoScene


class GcdLcm(AlgoScene):
    TITLE = "GCD & LCM"
    SUBTITLE = "Computes the greatest common divisor using the Euclidean algorithm, then derives"
    CATEGORY = "math"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("Greatest Common Divisor")

        intro_text = VGroup(
            Text("GCD(a, b) = largest number that divides both a and b", font_size=28),
            Text("LCM(a, b) = smallest number divisible by both a and b", font_size=28),
            Text("Key identity:  LCM(a, b) = (a × b) / GCD(a, b)", font_size=28, color=YELLOW),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(FadeIn(intro_text[0]))
        self.wait(1)
        self.play(FadeIn(intro_text[1]))
        self.wait(1)
        self.play(FadeIn(intro_text[2]))
        self.wait(2)
        self.play(FadeOut(intro_text))

        # ── Stage 2: Problem Setup ──────────────────────────────────────────
        self.chapter_title("Problem Setup: a = 48, b = 18")

        a_val, b_val = 48, 18

        a_box = VGroup(
            Square(side_length=1.4, color=BLUE, fill_opacity=0.3),
            Text(str(a_val), font_size=40, color=BLUE),
        ).arrange(ORIGIN).move_to(LEFT * 2)

        b_box = VGroup(
            Square(side_length=1.4, color=GREEN, fill_opacity=0.3),
            Text(str(b_val), font_size=40, color=GREEN),
        ).arrange(ORIGIN).move_to(RIGHT * 2)

        a_label = Text("a", font_size=28, color=BLUE).next_to(a_box, UP, buff=0.2)
        b_label = Text("b", font_size=28, color=GREEN).next_to(b_box, UP, buff=0.2)

        self.play(FadeIn(a_box), FadeIn(a_label))
        self.play(FadeIn(b_box), FadeIn(b_label))
        self.wait(1.5)

        question = Text("GCD(48, 18) = ?", font_size=36, color=YELLOW).to_edge(DOWN, buff=1)
        self.play(Write(question))
        self.wait(1.5)
        self.play(FadeOut(a_box, a_label, b_box, b_label, question))

        # ── Stage 3: Euclidean Algorithm Steps ─────────────────────────────
        self.chapter_title("Euclidean Algorithm")

        steps = [
            ("GCD(48, 18)", "48 = 2 × 18 + 12", "remainder = 12"),
            ("GCD(18, 12)", "18 = 1 × 12 + 6",  "remainder = 6"),
            ("GCD(12, 6)",  "12 = 2 × 6  + 0",  "remainder = 0  → done!"),
        ]

        step_group = VGroup()
        for i, (call, division, note) in enumerate(steps):
            row = VGroup(
                Text(call,     font_size=26, color=BLUE),
                Text("→", font_size=26),
                Text(division, font_size=26, color=WHITE),
                Text(note,     font_size=22, color=YELLOW if "done" in note else GRAY),
            ).arrange(RIGHT, buff=0.3)
            step_group.add(row)

        step_group.arrange(DOWN, buff=0.55).move_to(ORIGIN)

        for i, row in enumerate(step_group):
            self.play(FadeIn(row, shift=RIGHT * 0.3))
            self.wait(1.2)

        result_box = SurroundingRectangle(
            Text("GCD(48, 18) = 6", font_size=36, color=GREEN).next_to(step_group, DOWN, buff=0.6),
            color=GREEN, buff=0.15,
        )
        result_label = Text("GCD(48, 18) = 6", font_size=36, color=GREEN).next_to(step_group, DOWN, buff=0.6)
        self.play(Write(result_label), Create(result_box))
        self.wait(2)
        self.play(FadeOut(step_group, result_label, result_box))

        # ── Stage 4: Recursive Code Walkthrough ────────────────────────────
        self.chapter_title("Recursive Implementation")

        code_lines = [
            "def gcd(a, b):",
            "    if b == 0:",
            "        return a",
            "    return gcd(b, a % b)",
            "",
            "def lcm(a, b):",
            "    return (a * b) // gcd(a, b)",
        ]

        code_mob = Code(
            code="\n".join(code_lines),
            language="Python",
            font_size=24,
            background="rectangle",
            background_config={"fill_color": "#1e1e2e", "fill_opacity": 0.95},
        ).scale(0.9).move_to(ORIGIN)

        self.play(FadeIn(code_mob))
        self.wait(1)

        # highlight base case
        highlight1 = SurroundingRectangle(code_mob.code[1], color=YELLOW, buff=0.05)
        note1 = Text("Base case: b == 0 → return a", font_size=22, color=YELLOW).to_edge(DOWN, buff=1)
        self.play(Create(highlight1), Write(note1))
        self.wait(1.5)

        # highlight recursive call
        highlight2 = SurroundingRectangle(code_mob.code[3], color=BLUE, buff=0.05)
        note2 = Text("Recursive: gcd(b, a % b)", font_size=22, color=BLUE).to_edge(DOWN, buff=1)
        self.play(ReplacementTransform(highlight1, highlight2), ReplacementTransform(note1, note2))
        self.wait(1.5)

        # highlight LCM line
        highlight3 = SurroundingRectangle(code_mob.code[6], color=GREEN, buff=0.05)
        note3 = Text("LCM derived from GCD identity", font_size=22, color=GREEN).to_edge(DOWN, buff=1)
        self.play(ReplacementTransform(highlight2, highlight3), ReplacementTransform(note2, note3))
        self.wait(1.5)
        self.play(FadeOut(code_mob, highlight3, note3))

        # ── Stage 5: Call Stack Visualization ──────────────────────────────
        self.chapter_title("Call Stack: GCD(48, 18)")

        frames = [
            ("gcd(48, 18)", "48 % 18 = 12"),
            ("gcd(18, 12)", "18 % 12 = 6"),
            ("gcd(12, 6)",  "12 % 6  = 0"),
            ("gcd(6, 0)",   "return 6 ✓"),
        ]

        stack_rects = VGroup()
        stack_labels = VGroup()
        stack_notes = VGroup()

        for i, (frame_name, note) in enumerate(frames):
            rect = Rectangle(width=3.5, height=0.7, color=BLUE, fill_opacity=0.2 + i * 0.1)
            label = Text(frame_name, font_size=22).move_to(rect)
            note_t = Text(note, font_size=18, color=YELLOW).next_to(rect, RIGHT, buff=0.4)
            stack_rects.add(rect)
            stack_labels.add(label)
            stack_notes.add(note_t)

        stack_rects.arrange(DOWN, buff=0.1).move_to(LEFT * 1.5)
        for i, (rect, label, note_t) in enumerate(zip(stack_rects, stack_labels, stack_notes)):
            label.move_to(rect)
            note_t.next_to(rect, RIGHT, buff=0.4)
            self.play(FadeIn(rect), Write(label), Write(note_t), run_time=0.7)
            self.wait(0.5)

        self.wait(1.5)
        self.play(FadeOut(stack_rects, stack_labels, stack_notes))

        # ── Stage 6: LCM Derivation ─────────────────────────────────────────
        self.chapter_title("Deriving LCM from GCD")

        lcm_steps = VGroup(
            Text("a = 48,  b = 18,  GCD(48, 18) = 6", font_size=28),
            Text("LCM = (a × b) / GCD(a, b)", font_size=28, color=BLUE),
            Text("LCM = (48 × 18) / 6", font_size=28, color=BLUE),
            Text("LCM = 864 / 6", font_size=28, color=BLUE),
            Text("LCM = 144", font_size=36, color=GREEN),
        ).arrange(DOWN, buff=0.45).move_to(ORIGIN)

        for mob in lcm_steps:
            self.play(Write(mob))
            self.wait(1)

        self.wait(2)
        self.play(FadeOut(lcm_steps))

        # ── Stage 7: Complexity Card ────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(log(min(a, b)))",
            space_complexity="O(log(min(a, b)))",
        )
        self.wait(2)
