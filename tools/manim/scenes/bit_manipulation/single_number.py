from manim import *
from ...base import AlgoScene, ArrayVis


class SingleNumber(AlgoScene):
    TITLE = "Single Number"
    SUBTITLE = "Finds the element that appears exactly once in an array where every other elemen"
    CATEGORY = "bit-manipulation"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        title_label = self.chapter_title("Problem Introduction")
        self.play(FadeIn(title_label))
        self.wait(1)

        problem_text = VGroup(
            Text("Given an array where every element", font_size=28),
            Text("appears TWICE except one element.", font_size=28),
            Text("Find the element that appears once.", font_size=28),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        problem_text.move_to(ORIGIN)

        self.play(FadeIn(problem_text, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(problem_text), FadeOut(title_label))
        self.wait(0.5)

        # ── Stage 2: Array Visualization ────────────────────────────────────
        array_label = self.chapter_title("Visualize the Input Array")
        self.play(FadeIn(array_label))
        self.wait(0.5)

        nums = [4, 1, 2, 1, 2]
        array_vis = ArrayVis(nums, label="nums")
        array_vis.move_to(UP * 0.5)
        self.play(FadeIn(array_vis))
        self.wait(1)

        note = Text("Every element appears twice — except one!", font_size=24, color=YELLOW)
        note.next_to(array_vis, DOWN, buff=0.5)
        self.play(Write(note))
        self.wait(1.5)
        self.play(FadeOut(note), FadeOut(array_label))
        self.wait(0.3)

        # ── Stage 3: XOR Property Explanation ───────────────────────────────
        xor_label = self.chapter_title("Key Insight: XOR Properties")
        self.play(FadeIn(xor_label))
        self.wait(0.5)

        props = VGroup(
            Text("a XOR a = 0   (same numbers cancel)", font_size=26, color=GREEN),
            Text("a XOR 0 = a   (identity property)",   font_size=26, color=GREEN),
            Text("XOR is commutative & associative",     font_size=26, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        props.move_to(DOWN * 0.5)

        for prop in props:
            self.play(Write(prop))
            self.wait(0.8)

        self.wait(1)
        self.play(FadeOut(props), FadeOut(xor_label))
        self.wait(0.3)

        # ── Stage 4: Step-by-Step XOR Walk-through ──────────────────────────
        walk_label = self.chapter_title("Step-by-Step XOR Traversal")
        self.play(FadeIn(walk_label))
        self.wait(0.5)

        # Show array again at top
        array_vis.move_to(UP * 2)
        self.play(array_vis.animate.move_to(UP * 2))
        self.wait(0.3)

        result_tracker = Integer(0, color=YELLOW, font_size=40)
        result_label = Text("result = ", font_size=32)
        result_group = VGroup(result_label, result_tracker).arrange(RIGHT, buff=0.2)
        result_group.move_to(UP * 0.5)
        self.play(FadeIn(result_group))
        self.wait(0.5)

        xor_steps = [
            (0, 4,  "0 XOR 4 = 4"),
            (4, 1,  "4 XOR 1 = 5"),
            (5, 2,  "5 XOR 2 = 7"),
            (7, 1,  "7 XOR 1 = 6"),
            (6, 2,  "6 XOR 2 = 4"),
        ]

        step_texts = []
        for i, (prev, val, desc) in enumerate(xor_steps):
            new_val = prev ^ val
            step_text = Text(desc, font_size=26, color=WHITE)
            step_text.move_to(DOWN * (0.5 + i * 0.55))
            self.play(Write(step_text), run_time=0.6)

            # Highlight current array cell
            array_vis.highlight_cell(i, color=YELLOW)
            self.play(
                result_tracker.animate.set_value(new_val),
                run_time=0.5,
            )
            step_texts.append(step_text)
            self.wait(0.4)

        self.wait(1)
        self.play(*[FadeOut(s) for s in step_texts], FadeOut(walk_label))
        self.wait(0.3)

        # ── Stage 5: Highlight the Answer ───────────────────────────────────
        answer_label = self.chapter_title("Result: The Single Number")
        self.play(FadeIn(answer_label))
        self.wait(0.5)

        answer_box = SurroundingRectangle(result_tracker, color=GREEN, buff=0.2)
        answer_text = Text("Answer = 4", font_size=36, color=GREEN)
        answer_text.next_to(result_group, DOWN, buff=0.6)

        self.play(Create(answer_box))
        self.play(Write(answer_text))
        self.wait(1.5)

        self.play(FadeOut(answer_box), FadeOut(answer_text), FadeOut(result_group))
        self.play(FadeOut(array_vis), FadeOut(answer_label))
        self.wait(0.3)

        # ── Stage 6: Code Snippet ────────────────────────────────────────────
        code_label = self.chapter_title("Python Implementation")
        self.play(FadeIn(code_label))
        self.wait(0.5)

        code = Code(
            code="""def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num
    return result""",
            language="python",
            font_size=26,
            background="rectangle",
            line_spacing=0.8,
        )
        code.move_to(ORIGIN)
        self.play(FadeIn(code))
        self.wait(2)
        self.play(FadeOut(code), FadeOut(code_label))
        self.wait(0.3)

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(1)",
            notes="XOR cancels duplicate pairs in a single pass.",
        )
        self.wait(2)
