from manim import *
from ...base import AlgoScene, ArrayVis


class CircularQueue(AlgoScene):
    TITLE = "Circular Queue"
    SUBTITLE = "Fixed-size ring buffer queue with O(1) enqueue and dequeue without shifting."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("What is a Circular Queue?")

        intro_lines = VGroup(
            Text("A fixed-size ring buffer", font_size=32),
            Text("Head and tail pointers wrap around", font_size=32),
            Text("O(1) enqueue and dequeue — no shifting needed", font_size=32),
        ).arrange(DOWN, buff=0.4).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP))
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ── Stage 2: Draw the ring buffer ───────────────────────────────
        self.chapter_title("Ring Buffer Structure")

        CAPACITY = 6
        radius = 2.0
        cell_radius = 0.42

        # Draw circular slots
        slots = VGroup()
        slot_labels = VGroup()
        angles = [PI / 2 - i * (2 * PI / CAPACITY) for i in range(CAPACITY)]
        positions = [radius * np.array([np.cos(a), np.sin(a), 0]) for a in angles]

        for i, pos in enumerate(positions):
            cell = Circle(radius=cell_radius, color=BLUE_D, stroke_width=2.5)
            cell.move_to(pos)
            idx_label = Text(str(i), font_size=20, color=GREY_B).move_to(pos)
            slots.add(cell)
            slot_labels.add(idx_label)

        ring_group = VGroup(slots, slot_labels)
        self.play(Create(slots), FadeIn(slot_labels))
        self.wait(1)

        # Head and tail pointer arrows
        head_arrow = Arrow(
            start=positions[0] + 0.7 * LEFT,
            end=positions[0],
            color=GREEN,
            buff=0.05,
            stroke_width=3,
        )
        tail_arrow = Arrow(
            start=positions[0] + 0.7 * RIGHT,
            end=positions[0],
            color=RED,
            buff=0.05,
            stroke_width=3,
        )
        head_lbl = Text("HEAD", font_size=22, color=GREEN).next_to(head_arrow.get_start(), LEFT, buff=0.1)
        tail_lbl = Text("TAIL", font_size=22, color=RED).next_to(tail_arrow.get_start(), RIGHT, buff=0.1)

        self.play(GrowArrow(head_arrow), GrowArrow(tail_arrow), FadeIn(head_lbl), FadeIn(tail_lbl))
        self.wait(1.5)

        # ── Stage 3: Enqueue operations ─────────────────────────────────
        self.chapter_title("Enqueue: Adding Elements")

        enqueue_values = [10, 20, 30, 40]
        value_texts = []
        tail_idx = 0

        for val in enqueue_values:
            pos = positions[tail_idx]
            val_text = Text(str(val), font_size=26, color=YELLOW).move_to(pos)
            slots[tail_idx].set_fill(BLUE_D, opacity=0.4)

            self.play(
                slots[tail_idx].animate.set_fill(BLUE, opacity=0.6),
                FadeIn(val_text),
                run_time=0.6,
            )
            value_texts.append(val_text)

            # Move tail pointer
            tail_idx = (tail_idx + 1) % CAPACITY
            new_tail_pos = positions[tail_idx]
            new_tail_start = new_tail_pos + 0.7 * normalize(new_tail_pos)

            self.play(
                tail_arrow.animate.put_start_and_end_on(new_tail_start, new_tail_pos),
                tail_lbl.animate.next_to(new_tail_start, normalize(new_tail_pos) * 1.2),
                run_time=0.5,
            )

        self.wait(1.5)

        # ── Stage 4: Dequeue operations ─────────────────────────────────
        self.chapter_title("Dequeue: Removing Elements")

        head_idx = 0
        dequeue_count = 2

        for _ in range(dequeue_count):
            pos = positions[head_idx]
            removed = value_texts[head_idx]

            dequeued_label = Text(f"Dequeued: {enqueue_values[head_idx]}", font_size=28, color=GREEN_B)
            dequeued_label.to_edge(DOWN, buff=0.6)

            self.play(
                removed.animate.set_color(RED).scale(1.3),
                run_time=0.4,
            )
            self.play(
                FadeOut(removed),
                slots[head_idx].animate.set_fill(opacity=0),
                FadeIn(dequeued_label),
                run_time=0.6,
            )
            self.wait(0.4)
            self.play(FadeOut(dequeued_label))

            head_idx = (head_idx + 1) % CAPACITY
            new_head_pos = positions[head_idx]
            new_head_start = new_head_pos + 0.7 * normalize(new_head_pos) * (-1)

            self.play(
                head_arrow.animate.put_start_and_end_on(
                    new_head_pos - 0.7 * normalize(new_head_pos),
                    new_head_pos,
                ),
                run_time=0.5,
            )

        self.wait(1.5)

        # ── Stage 5: Wrap-around demonstration ──────────────────────────
        self.chapter_title("Wrap-Around: The Ring Property")

        wrap_vals = [50, 60]
        for val in wrap_vals:
            pos = positions[tail_idx]
            val_text = Text(str(val), font_size=26, color=ORANGE).move_to(pos)
            self.play(
                slots[tail_idx].animate.set_fill(ORANGE, opacity=0.5),
                FadeIn(val_text),
                run_time=0.6,
            )
            value_texts.append(val_text)
            tail_idx = (tail_idx + 1) % CAPACITY
            new_tail_pos = positions[tail_idx]
            self.play(
                tail_arrow.animate.put_start_and_end_on(
                    new_tail_pos - 0.5 * normalize(new_tail_pos),
                    new_tail_pos,
                ),
                run_time=0.5,
            )

        wrap_note = Text(
            "tail = (tail + 1) % capacity  ← modulo wraps the index",
            font_size=24,
            color=YELLOW_C,
        ).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(wrap_note))
        self.wait(2)
        self.play(FadeOut(wrap_note))

        # ── Stage 6: Full / Empty conditions ────────────────────────────
        self.chapter_title("Full & Empty Conditions")

        self.play(FadeOut(ring_group), FadeOut(head_arrow), FadeOut(tail_arrow),
                  FadeOut(head_lbl), FadeOut(tail_lbl),
                  *[FadeOut(v) for v in value_texts if v in self.mobjects])

        conditions = VGroup(
            Text("Empty:  head == tail", font_size=30, color=GREEN),
            Text("Full:   (tail + 1) % cap == head", font_size=30, color=RED),
            Text("Size:   (tail - head + cap) % cap", font_size=30, color=BLUE_B),
        ).arrange(DOWN, buff=0.5).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(c, shift=RIGHT * 0.3) for c in conditions], lag_ratio=0.3))
        self.wait(2.5)
        self.play(FadeOut(conditions))

        # ── Stage 7: Complexity card ────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(1)",
            time_worst="O(1)",
            space="O(n)",
            notes="n = capacity of the ring buffer",
        )
        self.wait(2)
