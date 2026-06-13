from manim import *
from ...base import AlgoScene, ArrayVis


class LongestNoRepeat(AlgoScene):
    TITLE = "Longest Substring Without Repeating"
    SUBTITLE = "Uses a sliding window with a hash set to find the longest substring without dupl"
    CATEGORY = "two-pointers"

    def build(self):
        # ── Stage 1: Intro ──────────────────────────────────────────────
        self.chapter_title("Problem Introduction")

        intro_text = VGroup(
            Text("Given a string s,", font_size=32),
            Text("find the length of the longest substring", font_size=32),
            Text("without repeating characters.", font_size=32),
        ).arrange(DOWN, buff=0.3).move_to(ORIGIN)

        example_label = Text('Example: s = "abcabcbb"', font_size=28, color=YELLOW)
        example_label.next_to(intro_text, DOWN, buff=0.6)

        answer_label = Text("Answer: 3  (substring \"abc\")", font_size=28, color=GREEN)
        answer_label.next_to(example_label, DOWN, buff=0.3)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(1)
        self.play(Write(example_label))
        self.wait(0.5)
        self.play(Write(answer_label))
        self.wait(2)
        self.play(FadeOut(intro_text), FadeOut(example_label), FadeOut(answer_label))

        # ── Stage 2: Data Structure Setup ───────────────────────────────
        self.chapter_title("Sliding Window Setup")

        s = list("abcabcbb")
        n = len(s)

        # Draw character boxes
        boxes = VGroup()
        chars = VGroup()
        indices = VGroup()
        box_width = 0.75

        for i, c in enumerate(s):
            box = Square(side_length=box_width, color=WHITE, stroke_width=2)
            char = Text(c, font_size=28, color=WHITE)
            char.move_to(box.get_center())
            idx = Text(str(i), font_size=18, color=GRAY)
            idx.next_to(box, DOWN, buff=0.15)
            boxes.add(box)
            chars.add(char)
            indices.add(idx)

        boxes.arrange(RIGHT, buff=0.1)
        for i, (box, char, idx) in enumerate(zip(boxes, chars, indices)):
            char.move_to(box.get_center())
            idx.next_to(box, DOWN, buff=0.15)

        array_group = VGroup(boxes, chars, indices)
        array_group.move_to(UP * 1.5)

        self.play(LaggedStart(*[FadeIn(VGroup(boxes[i], chars[i], indices[i])) for i in range(n)], lag_ratio=0.1))
        self.wait(0.5)

        # Left and right pointer arrows
        left_arrow = Arrow(start=DOWN * 0.4, end=UP * 0.1, color=BLUE, buff=0)
        right_arrow = Arrow(start=DOWN * 0.4, end=UP * 0.1, color=RED, buff=0)
        left_label = Text("L", font_size=22, color=BLUE).next_to(left_arrow, DOWN, buff=0.05)
        right_label = Text("R", font_size=22, color=RED).next_to(right_arrow, DOWN, buff=0.05)

        left_ptr = VGroup(left_arrow, left_label)
        right_ptr = VGroup(right_arrow, right_label)

        left_ptr.next_to(boxes[0], DOWN, buff=0.5)
        right_ptr.next_to(boxes[0], DOWN, buff=0.5)

        self.play(FadeIn(left_ptr), FadeIn(right_ptr))
        self.wait(0.5)

        # Hash set display
        set_title = Text("Window Set:", font_size=24, color=YELLOW)
        set_display = Text("{}", font_size=24, color=WHITE)
        set_group = VGroup(set_title, set_display).arrange(RIGHT, buff=0.3)
        set_group.move_to(DOWN * 0.5)

        max_label = Text("max_len = 0", font_size=24, color=GREEN)
        max_label.next_to(set_group, DOWN, buff=0.4)

        self.play(Write(set_group), Write(max_label))
        self.wait(1)

        # ── Stage 3: Walk through steps 0–2 (no collision) ──────────────
        self.chapter_title("Expanding the Window")

        window_set = set()
        left = 0
        max_len = 0
        highlight_rects = []

        def move_ptr(ptr_group, box_idx):
            return ptr_group.animate.next_to(boxes[box_idx], DOWN, buff=0.5)

        def update_set_display(ws):
            sorted_ws = sorted(ws)
            content = "{" + ", ".join(f'"{c}"' for c in sorted_ws) + "}" if ws else "{}"
            return Text(content, font_size=22, color=WHITE)

        def update_max_display(ml):
            return Text(f"max_len = {ml}", font_size=24, color=GREEN)

        # Steps 0, 1, 2: 'a', 'b', 'c' — no repeats
        for right in range(3):
            c = s[right]
            window_set.add(c)
            max_len = max(max_len, right - left + 1)

            new_set_disp = update_set_display(window_set)
            new_set_disp.move_to(set_display.get_center())
            new_max_disp = update_max_display(max_len)
            new_max_disp.move_to(max_label.get_center())

            # Highlight box green
            highlight = SurroundingRectangle(boxes[right], color=GREEN, buff=0.05)

            anims = [
                move_ptr(right_ptr, right),
                Transform(set_display, new_set_disp),
                Transform(max_label, new_max_disp),
                Create(highlight),
                boxes[right].animate.set_fill(GREEN, opacity=0.3),
            ]
            self.play(*anims)
            highlight_rects.append(highlight)
            self.wait(0.7)

        self.wait(1)

        # ── Stage 4: Collision at index 3 ───────────────────────────────
        self.chapter_title("Shrinking on Collision")

        collision_note = Text("'a' already in window! Shrink from left.", font_size=24, color=RED)
        collision_note.move_to(DOWN * 2.2)

        right = 3
        c = s[right]  # 'a' — duplicate

        self.play(
            move_ptr(right_ptr, right),
            Write(collision_note),
        )
        self.wait(0.8)

        # Shrink: remove s[left]='a', advance left
        while s[left] in window_set and s[left] == c:
            window_set.discard(s[left])
            old_left = left
            left += 1
            new_set_disp2 = update_set_display(window_set)
            new_set_disp2.move_to(set_display.get_center())
            self.play(
                move_ptr(left_ptr, left),
                Transform(set_display, new_set_disp2),
                boxes[old_left].animate.set_fill(BLACK, opacity=0),
                FadeOut(highlight_rects[0]),
            )
            self.wait(0.5)

        window_set.add(c)
        max_len = max(max_len, right - left + 1)
        new_set_disp3 = update_set_display(window_set)
        new_set_disp3.move_to(set_display.get_center())
        new_max_disp2 = update_max_display(max_len)
        new_max_disp2.move_to(max_label.get_center())

        new_hl = SurroundingRectangle(boxes[right], color=GREEN, buff=0.05)
        self.play(
            Transform(set_display, new_set_disp3),
            Transform(max_label, new_max_disp2),
            Create(new_hl),
            boxes[right].animate.set_fill(GREEN, opacity=0.3),
            FadeOut(collision_note),
        )
        self.wait(1)

        # ── Stage 5: Continue to end ─────────────────────────────────────
        self.chapter_title("Completing the Scan")

        continue_note = Text("Continue sliding until end of string...", font_size=24, color=YELLOW)
        continue_note.move_to(DOWN * 2.2)
        self.play(Write(continue_note))
        self.wait(0.5)

        for right in range(4, n):
            c = s[right]
            while c in window_set:
                window_set.discard(s[left])
                left += 1
            window_set.add(c)
            max_len = max(max_len, right - left + 1)

            new_sd = update_set_display(window_set)
            new_sd.move_to(set_display.get_center())
            new_md = update_max_display(max_len)
            new_md.move_to(max_label.get_center())

            self.play(
                move_ptr(right_ptr, right),
                move_ptr(left_ptr, left),
                Transform(set_display, new_sd),
                Transform(max_label, new_md),
                run_time=0.5,
            )
            self.wait(0.3)

        self.play(FadeOut(continue_note))
        self.wait(1)

        # ── Stage 6: Final result ────────────────────────────────────────
        self.chapter_title("Result")

        result_box = RoundedRectangle(corner_radius=0.2, width=5, height=1.2, color=GREEN, stroke_width=3)
        result_box.move_to(DOWN * 2.0)
        result_text = Text(f"Longest Substring Length = {max_len}", font_size=28, color=GREEN)
        result_text.move_to(result_box.get_center())

        self.play(Create(result_box), Write(result_text))
        self.wait(2)

        self.play(FadeOut(VGroup(
            array_group, left_ptr, right_ptr,
            set_group, max_label, result_box, result_text,
            *highlight_rects, new_hl,
        )))

        # ── Stage 7: Complexity Card ─────────────────────────────────────
        self.complexity_card(
            time_complexity="O(n)",
            space_complexity="O(min(n, m))",
            notes="n = length of string, m = charset size",
        )
        self.wait(2)
