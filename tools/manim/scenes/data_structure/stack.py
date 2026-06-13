from manim import *
from ...base import AlgoScene


class Stack(AlgoScene):
    TITLE = "Stack"
    SUBTITLE = "Last-In-First-Out collection supporting push and pop in O(1)."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is a Stack?")

        intro_lines = VGroup(
            Text("A Stack is a linear data structure", font_size=28),
            Text("following the LIFO principle:", font_size=28),
            Text("  Last In → First Out", font_size=30, color=YELLOW),
            Text("", font_size=10),
            Text("Two primary operations:", font_size=26),
            Text("  push(x)  — add element on top   O(1)", font_size=24, color=GREEN),
            Text("  pop()    — remove top element    O(1)", font_size=24, color=CORAL if False else "#E05A3A"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.4))
        self.wait(2.5)
        self.play(FadeOut(intro_lines))
        self.wait(0.4)

        # ── Stage 2: Stack node anatomy ─────────────────────────────────────
        self.chapter_title("Stack Anatomy")

        def make_slot(value, color=BLUE, width=2.0, height=0.65):
            box = Rectangle(width=width, height=height, color=color).set_fill(color, opacity=0.25)
            lbl = Text(str(value), font_size=22, color=WHITE).move_to(box)
            return VGroup(box, lbl)

        # Draw an empty stack container
        container = Rectangle(width=2.4, height=4.0, color=GRAY, stroke_width=2)
        container.set_fill(BLACK, opacity=0.0)
        top_label = Text("TOP", font_size=18, color=YELLOW).next_to(container, UP, buff=0.15)
        bot_label = Text("BOTTOM", font_size=16, color=GRAY).next_to(container, DOWN, buff=0.15)

        self.play(Create(container), Write(top_label), Write(bot_label))
        self.wait(1.5)
        self.play(FadeOut(container), FadeOut(top_label), FadeOut(bot_label))
        self.wait(0.3)

        # ── Stage 3: Push operations ─────────────────────────────────────────
        self.chapter_title("push() — Adding Elements")

        push_values = [10, 20, 30, 40]
        push_colors = [BLUE, GREEN, ORANGE, PURPLE]

        # Static container
        stack_box = Rectangle(width=2.4, height=4.2, color=GRAY, stroke_width=2)
        stack_box.set_fill(BLACK, opacity=0.05)
        stack_box.move_to(ORIGIN + LEFT * 1.5)
        stack_top_lbl = Text("TOP ↓", font_size=18, color=YELLOW).next_to(stack_box, UP, buff=0.12)

        self.play(Create(stack_box), Write(stack_top_lbl))

        slots = []
        slot_base_y = stack_box.get_bottom()[1] + 0.45

        for i, (val, col) in enumerate(zip(push_values, push_colors)):
            slot = make_slot(val, color=col)
            target_y = slot_base_y + i * 0.75
            slot.move_to([stack_box.get_center()[0], target_y + 2.5, 0])  # start above

            op_text = Text(f"push({val})", font_size=22, color=col).to_edge(RIGHT).shift(LEFT * 1.5 + UP * 1.0)
            self.play(Write(op_text), run_time=0.4)
            self.play(
                slot.animate.move_to([stack_box.get_center()[0], target_y, 0]),
                run_time=0.6,
            )
            self.wait(0.4)
            self.play(FadeOut(op_text), run_time=0.3)
            slots.append(slot)

        self.wait(1.0)

        # Annotate top pointer
        top_arrow = Arrow(
            stack_box.get_right() + RIGHT * 0.3 + UP * (slot_base_y + 3 * 0.75 - stack_box.get_center()[1]),
            slots[-1].get_right() + LEFT * 0.05,
            buff=0.05, color=YELLOW, stroke_width=2,
            max_tip_length_to_length_ratio=0.2,
        )
        top_ptr_lbl = Text("top", font_size=18, color=YELLOW).next_to(top_arrow, RIGHT, buff=0.1)
        self.play(Create(top_arrow), Write(top_ptr_lbl))
        self.wait(1.5)
        self.play(FadeOut(top_arrow), FadeOut(top_ptr_lbl))

        # ── Stage 4: Pop operations ──────────────────────────────────────────
        self.chapter_title("pop() — Removing Elements")

        for i in range(2):
            top_slot = slots[-1 - i]
            val = push_values[-1 - i]
            col = push_colors[-1 - i]

            highlight = top_slot[0].copy().set_fill(RED, opacity=0.6).set_stroke(RED, width=3)
            self.play(FadeIn(highlight))

            op_text = Text(f"pop() → {val}", font_size=22, color=RED).to_edge(RIGHT).shift(LEFT * 1.5 + UP * 1.0)
            self.play(Write(op_text), run_time=0.4)
            self.wait(0.4)

            self.play(
                top_slot.animate.shift(UP * 2.5).fade(1),
                FadeOut(highlight),
                run_time=0.6,
            )
            self.play(FadeOut(op_text), run_time=0.3)
            self.wait(0.3)

        self.wait(1.0)

        # ── Stage 5: Peek and isEmpty ────────────────────────────────────────
        self.chapter_title("peek() and isEmpty()")

        remaining = [slots[0], slots[1]]
        peek_target = remaining[-1]

        peek_highlight = peek_target[0].copy().set_fill(YELLOW, opacity=0.5).set_stroke(YELLOW, width=3)
        peek_text = Text(f"peek() → {push_values[1]}  (no removal)", font_size=22, color=YELLOW)
        peek_text.next_to(stack_box, RIGHT, buff=0.6)

        self.play(FadeIn(peek_highlight), Write(peek_text))
        self.wait(1.5)
        self.play(FadeOut(peek_highlight), FadeOut(peek_text))
        self.wait(0.5)

        empty_check = Text("isEmpty() → False  (2 elements remain)", font_size=22, color=GREEN)
        empty_check.next_to(stack_box, RIGHT, buff=0.6)
        self.play(Write(empty_check))
        self.wait(1.5)
        self.play(FadeOut(empty_check))
        self.wait(0.5)

        # Pop remaining to show empty state
        for slot in reversed(remaining):
            self.play(slot.animate.shift(UP * 2.5).fade(1), run_time=0.4)

        empty_msg = Text("isEmpty() → True", font_size=22, color=ORANGE)
        empty_msg.next_to(stack_box, RIGHT, buff=0.6)
        self.play(Write(empty_msg))
        self.wait(1.5)
        self.play(FadeOut(empty_msg))

        # ── Stage 6: Real-world use cases ────────────────────────────────────
        self.play(FadeOut(stack_box), FadeOut(stack_top_lbl))
        self.wait(0.3)

        self.chapter_title("Real-World Applications")

        use_cases = VGroup(
            Text("Where Stacks are used:", font_size=28, color=YELLOW),
            Text("  • Function call stack (recursion)", font_size=24),
            Text("  • Undo/Redo in text editors", font_size=24),
            Text("  • Browser back/forward navigation", font_size=24),
            Text("  • Balanced parentheses checking", font_size=24),
            Text("  • Expression evaluation (postfix)", font_size=24),
            Text("  • DFS (depth-first search)", font_size=24),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(u, shift=RIGHT * 0.3) for u in use_cases], lag_ratio=0.15), run_time=2.0)
        self.wait(2.5)
        self.play(FadeOut(use_cases))
        self.wait(0.4)

        # ── Stage 7: Complexity card ─────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(1)",
            space_complexity="O(n)",
        )
        self.wait(2)
