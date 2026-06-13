from manim import *
from ...base import AlgoScene, ArrayVis


class Queue(AlgoScene):
    TITLE = "Queue"
    SUBTITLE = "First-In-First-Out collection supporting enqueue and dequeue in O(1)."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────────
        self.chapter_title("What is a Queue?")

        intro_text = VGroup(
            Text("A Queue is a linear data structure", font_size=28),
            Text("that follows the FIFO principle:", font_size=28),
            Text("First-In, First-Out", font_size=32, color=YELLOW),
        ).arrange(DOWN, buff=0.3).move_to(UP * 1.5)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(1.5)

        analogy = Text(
            "Think of a line at a ticket counter —\nthe first person in line is served first.",
            font_size=24,
            color=GRAY_A,
        ).next_to(intro_text, DOWN, buff=0.6)
        self.play(Write(analogy))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(analogy))

        # ── Stage 2: Queue Structure Setup ──────────────────────────────────
        self.chapter_title("Queue Structure")

        # Draw the queue box
        queue_label = Text("Queue", font_size=22, color=BLUE_B).move_to(UP * 2.5)
        self.play(FadeIn(queue_label))

        # Initial empty queue visual
        num_slots = 6
        slot_width = 1.0
        slot_height = 0.8
        slots = VGroup()
        slot_labels = VGroup()

        for i in range(num_slots):
            rect = Rectangle(width=slot_width, height=slot_height, color=GRAY)
            rect.move_to(RIGHT * (i - num_slots / 2 + 0.5) * slot_width + UP * 0.5)
            slots.add(rect)

        self.play(Create(slots))

        # FRONT / REAR labels
        front_arrow = Arrow(
            start=slots[0].get_bottom() + DOWN * 0.6,
            end=slots[0].get_bottom(),
            buff=0,
            color=GREEN,
            stroke_width=3,
        )
        rear_arrow = Arrow(
            start=slots[-1].get_bottom() + DOWN * 0.6,
            end=slots[-1].get_bottom(),
            buff=0,
            color=RED,
            stroke_width=3,
        )
        front_label = Text("FRONT", font_size=18, color=GREEN).next_to(front_arrow, DOWN, buff=0.1)
        rear_label = Text("REAR", font_size=18, color=RED).next_to(rear_arrow, DOWN, buff=0.1)

        self.play(
            GrowArrow(front_arrow),
            GrowArrow(rear_arrow),
            FadeIn(front_label),
            FadeIn(rear_label),
        )
        self.wait(1.5)

        # ── Stage 3: Enqueue Operations ─────────────────────────────────────
        self.chapter_title("Enqueue — Add to Rear")

        enqueue_values = [10, 20, 30, 40]
        filled_rects = VGroup()
        value_texts = VGroup()

        enqueue_desc = Text("enqueue(x): Add element to the rear", font_size=22, color=YELLOW)
        enqueue_desc.move_to(DOWN * 2.2)
        self.play(FadeIn(enqueue_desc))

        for idx, val in enumerate(enqueue_values):
            # Highlight the slot
            target_slot = slots[idx]
            highlight = target_slot.copy().set_fill(BLUE_D, opacity=0.6).set_stroke(BLUE, width=3)
            filled_rects.add(highlight)

            val_text = Text(str(val), font_size=26, color=WHITE)
            val_text.move_to(target_slot.get_center())
            value_texts.add(val_text)

            # Animate element dropping in from above
            incoming = val_text.copy().shift(UP * 2)
            self.play(
                FadeIn(highlight),
                incoming.animate.move_to(target_slot.get_center()),
                run_time=0.7,
            )
            self.play(Transform(incoming, val_text), run_time=0.3)

            # Move REAR arrow
            new_rear_pos = slots[idx].get_bottom() + DOWN * 0.6
            new_rear_end = slots[idx].get_bottom()
            if idx < num_slots - 1:
                next_slot = slots[idx + 1]
                new_rear_pos = next_slot.get_bottom() + DOWN * 0.6
                new_rear_end = next_slot.get_bottom()

            self.play(
                rear_arrow.animate.put_start_and_end_on(new_rear_pos, new_rear_end),
                rear_label.animate.next_to(Arrow(new_rear_pos, new_rear_end, buff=0), DOWN, buff=0.1),
                run_time=0.4,
            )
            self.wait(0.4)

        self.wait(1)
        self.play(FadeOut(enqueue_desc))

        # ── Stage 4: Dequeue Operations ─────────────────────────────────────
        self.chapter_title("Dequeue — Remove from Front")

        dequeue_desc = Text("dequeue(): Remove element from the front", font_size=22, color=ORANGE)
        dequeue_desc.move_to(DOWN * 2.2)
        self.play(FadeIn(dequeue_desc))

        # Dequeue first two elements
        for idx in range(2):
            target_slot = slots[idx]

            # Flash the front element
            self.play(
                filled_rects[idx].animate.set_fill(RED_D, opacity=0.8),
                run_time=0.4,
            )

            # Fly it out to the left
            leaving = value_texts[idx].copy() if idx < len(value_texts) else VGroup()
            self.play(
                leaving.animate.shift(LEFT * 3 + UP * 1).set_opacity(0),
                FadeOut(filled_rects[idx]),
                run_time=0.7,
            )
            self.remove(leaving)

            # Move FRONT arrow right
            next_front = slots[idx + 1]
            new_front_pos = next_front.get_bottom() + DOWN * 0.6
            new_front_end = next_front.get_bottom()
            self.play(
                front_arrow.animate.put_start_and_end_on(new_front_pos, new_front_end),
                front_label.animate.next_to(
                    Arrow(new_front_pos, new_front_end, buff=0), DOWN, buff=0.1
                ),
                run_time=0.5,
            )
            self.wait(0.5)

        self.wait(1)
        self.play(FadeOut(dequeue_desc))

        # ── Stage 5: Peek / isEmpty ──────────────────────────────────────────
        self.chapter_title("Peek & isEmpty")

        ops_group = VGroup(
            Text("peek()   → view front without removing", font_size=22, color=TEAL),
            Text("isEmpty() → check if queue has no elements", font_size=22, color=TEAL),
        ).arrange(DOWN, buff=0.4).move_to(DOWN * 2.0)

        self.play(FadeIn(ops_group, shift=UP * 0.2))

        # Highlight the current front
        current_front_idx = 2
        peek_highlight = slots[current_front_idx].copy().set_fill(TEAL_D, opacity=0.7).set_stroke(TEAL, width=4)
        self.play(FadeIn(peek_highlight))
        self.wait(1.5)
        self.play(FadeOut(peek_highlight))
        self.wait(0.5)
        self.play(FadeOut(ops_group))

        # ── Stage 6: FIFO Principle Summary ─────────────────────────────────
        self.chapter_title("FIFO Principle Recap")

        fifo_title = Text("FIFO: First-In, First-Out", font_size=30, color=YELLOW).move_to(UP * 2.8)
        self.play(FadeIn(fifo_title))

        rules = VGroup(
            Text("• Elements added at the REAR (enqueue)", font_size=22),
            Text("• Elements removed from the FRONT (dequeue)", font_size=22),
            Text("• Both operations are O(1) time", font_size=22, color=GREEN),
            Text("• Space: O(n) for n elements", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to(DOWN * 0.2)

        for rule in rules:
            self.play(FadeIn(rule, shift=RIGHT * 0.2), run_time=0.5)
            self.wait(0.4)

        self.wait(1.5)
        self.play(FadeOut(fifo_title), FadeOut(rules))

        # Fade out the queue structure
        self.play(
            FadeOut(slots),
            FadeOut(queue_label),
            FadeOut(front_arrow),
            FadeOut(rear_arrow),
            FadeOut(front_label),
            FadeOut(rear_label),
            *[FadeOut(r) for r in filled_rects],
            *[FadeOut(t) for t in value_texts],
        )

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.complexity_card(
            time_complexities={
                "Enqueue": "O(1)",
                "Dequeue": "O(1)",
                "Peek": "O(1)",
                "Search": "O(n)",
            },
            space_complexity="O(n)",
        )
        self.wait(2)
