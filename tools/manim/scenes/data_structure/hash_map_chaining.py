from manim import *
from ...base import AlgoScene


class HashMapChaining(AlgoScene):
    TITLE = "Hash Map (Chaining)"
    SUBTITLE = "Hash map resolving collisions via separate chaining with linked lists."
    CATEGORY = "data-structure"

    def build(self):
        # ── Stage 1: Intro ───────────────────────────────────────────────
        self.chapter_title("What is a Hash Map with Chaining?")

        intro_text = VGroup(
            Text("A hash map stores key-value pairs.", font_size=26),
            Text("  • A hash function maps keys → bucket indices", font_size=22, color=YELLOW),
            Text("  • Multiple keys may hash to the same bucket", font_size=22, color=RED),
            Text("  • Separate chaining: each bucket holds a linked list", font_size=22, color=GREEN),
            Text("  • All entries in a bucket are searched on lookup", font_size=22, color=BLUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.3).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP))
        self.wait(2.5)
        self.play(FadeOut(intro_text))
        self.wait(0.4)

        # ── Stage 2: Draw empty hash table (6 buckets) ──────────────────
        self.chapter_title("Empty Hash Table (capacity = 6)")

        NUM_BUCKETS = 6
        BUCKET_W = 1.4
        BUCKET_H = 0.65
        bucket_rects = VGroup()
        bucket_labels = VGroup()
        index_labels = VGroup()

        for i in range(NUM_BUCKETS):
            rect = Rectangle(width=BUCKET_W, height=BUCKET_H, color=WHITE)
            rect.set_fill(DARK_GRAY, opacity=0.5)
            rect.move_to(LEFT * 3.5 + DOWN * (i * (BUCKET_H + 0.15)))
            null_lbl = Text("None", font_size=16, color=GRAY_B).move_to(rect)
            idx_lbl = Text(str(i), font_size=18, color=YELLOW_A).next_to(rect, LEFT, buff=0.25)
            bucket_rects.add(rect)
            bucket_labels.add(null_lbl)
            index_labels.add(idx_lbl)

        table_group = VGroup(bucket_rects, bucket_labels, index_labels)
        table_group.move_to(LEFT * 3.2 + UP * 1.2)

        header = Text("Index", font_size=18, color=YELLOW).next_to(index_labels, UP, buff=0.3)
        bucket_header = Text("Bucket", font_size=18, color=WHITE).next_to(bucket_rects, UP, buff=0.3)

        self.play(
            LaggedStart(*[FadeIn(r) for r in bucket_rects], lag_ratio=0.12),
            run_time=1.2,
        )
        self.play(
            LaggedStart(*[Write(l) for l in bucket_labels], lag_ratio=0.1),
            LaggedStart(*[Write(l) for l in index_labels], lag_ratio=0.1),
            Write(header),
            Write(bucket_header),
            run_time=1.0,
        )
        self.wait(1.5)

        # ── Stage 3: Hash function explanation ──────────────────────────
        self.chapter_title("Hash Function: hash(key) % capacity")

        hash_formula = VGroup(
            Text("hash(key) % 6", font_size=28, color=YELLOW),
            Text("Determines which bucket to use", font_size=20, color=GRAY_A),
        ).arrange(DOWN, buff=0.2).to_edge(RIGHT).shift(LEFT * 1.0 + UP * 2.0)

        examples = VGroup(
            Text("hash(\"apple\") % 6 = 2", font_size=18, color=GREEN_A),
            Text("hash(\"banana\") % 6 = 4", font_size=18, color=BLUE_A),
            Text("hash(\"cherry\") % 6 = 2  ← collision!", font_size=18, color=RED_A),
            Text("hash(\"date\") % 6 = 1", font_size=18, color=ORANGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).to_edge(RIGHT).shift(LEFT * 0.6 + UP * 0.2)

        self.play(Write(hash_formula))
        self.wait(0.8)
        self.play(LaggedStart(*[Write(e) for e in examples], lag_ratio=0.5), run_time=2.0)
        self.wait(2.0)
        self.play(FadeOut(hash_formula), FadeOut(examples))
        self.wait(0.3)

        # ── Stage 4: Insert keys one by one ─────────────────────────────
        self.chapter_title("Inserting Keys into the Hash Map")

        # chain_nodes[bucket_idx] = list of VGroup nodes drawn to the right
        chain_nodes = {i: [] for i in range(NUM_BUCKETS)}

        def make_chain_node(key, value, color=TEAL):
            box = Rectangle(width=1.6, height=0.55, color=color).set_fill(color, opacity=0.25)
            lbl = Text(f"{key}:{value}", font_size=15, color=WHITE).move_to(box)
            return VGroup(box, lbl)

        def get_chain_x(bucket_idx, chain_len):
            base_x = bucket_rects[bucket_idx].get_right()[0] + 0.2
            return base_x + chain_len * 1.85

        def get_bucket_y(bucket_idx):
            return bucket_rects[bucket_idx].get_center()[1]

        insertions = [
            ("apple", "A", 2, GREEN),
            ("banana", "B", 4, BLUE),
            ("cherry", "C", 2, RED),
            ("date", "D", 1, ORANGE),
            ("elderberry", "E", 4, PURPLE),
        ]

        chain_arrows = []

        for key, val, bucket_idx, color in insertions:
            node_vg = make_chain_node(key, val, color)
            chain_len = len(chain_nodes[bucket_idx])
            x = get_chain_x(bucket_idx, chain_len)
            y = get_bucket_y(bucket_idx)
            node_vg.move_to([x, y, 0])

            # Highlight target bucket
            highlight = bucket_rects[bucket_idx].copy().set_fill(YELLOW, opacity=0.35).set_stroke(YELLOW, width=3)
            self.play(FadeIn(highlight), run_time=0.3)

            # If first in bucket, replace "None" label
            if chain_len == 0:
                self.play(
                    FadeOut(bucket_labels[bucket_idx]),
                    FadeIn(node_vg, shift=LEFT * 0.3),
                    run_time=0.5,
                )
                bucket_labels[bucket_idx].set_opacity(0)
            else:
                # Draw arrow from previous node
                prev_node = chain_nodes[bucket_idx][-1]
                arr = Arrow(
                    prev_node.get_right(),
                    node_vg.get_left(),
                    buff=0.05,
                    color=GRAY_A,
                    stroke_width=2,
                    max_tip_length_to_length_ratio=0.18,
                )
                self.play(
                    Create(arr),
                    FadeIn(node_vg, shift=LEFT * 0.3),
                    run_time=0.55,
                )
                chain_arrows.append(arr)

            chain_nodes[bucket_idx].append(node_vg)
            self.play(FadeOut(highlight), run_time=0.25)
            self.wait(0.4)

        self.wait(1.5)

        # ── Stage 5: Lookup demonstration ───────────────────────────────
        self.chapter_title("Lookup: search(\"cherry\")")

        lookup_steps = VGroup(
            Text("1. Compute hash(\"cherry\") % 6 = 2", font_size=20, color=YELLOW),
            Text("2. Go to bucket[2]", font_size=20, color=GREEN),
            Text("3. Traverse chain: apple ≠ cherry → cherry = cherry ✓", font_size=18, color=TEAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.25).to_edge(DOWN).shift(UP * 0.4)

        self.play(Write(lookup_steps[0]))
        self.wait(0.6)

        # Highlight bucket 2
        bucket2_hl = bucket_rects[2].copy().set_fill(GREEN, opacity=0.45).set_stroke(GREEN, width=4)
        self.play(Write(lookup_steps[1]), FadeIn(bucket2_hl), run_time=0.6)
        self.wait(0.6)

        # Traverse chain: highlight apple (miss), then cherry (hit)
        apple_node = chain_nodes[2][0]
        cherry_node = chain_nodes[2][1]

        apple_hl = apple_node[0].copy().set_fill(RED, opacity=0.55).set_stroke(RED, width=3)
        cherry_hl = cherry_node[0].copy().set_fill(GREEN, opacity=0.6).set_stroke(GREEN, width=3)

        self.play(Write(lookup_steps[2]), FadeIn(apple_hl), run_time=0.5)
        self.wait(0.5)
        self.play(FadeOut(apple_hl), FadeIn(cherry_hl), run_time=0.5)
        self.wait(1.2)
        self.play(FadeOut(cherry_hl), FadeOut(bucket2_hl), FadeOut(lookup_steps), run_time=0.6)
        self.wait(0.5)

        # ── Stage 6: Collision visualization ────────────────────────────
        self.chapter_title("Collision Handling: Bucket 2 and Bucket 4")

        collision_note = VGroup(
            Text("Bucket 2 chain: apple → cherry", font_size=20, color=RED_A),
            Text("Bucket 4 chain: banana → elderberry", font_size=20, color=PURPLE_A),
            Text("Each bucket is an independent linked list.", font_size=20, color=GRAY_A),
            Text("Worst case: all keys hash to same bucket → O(n) search.", font_size=18, color=ORANGE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).to_edge(RIGHT).shift(LEFT * 0.5 + UP * 1.0)

        # Highlight both collision buckets
        b2_hl = bucket_rects[2].copy().set_fill(RED, opacity=0.35).set_stroke(RED, width=3)
        b4_hl = bucket_rects[4].copy().set_fill(PURPLE, opacity=0.35).set_stroke(PURPLE, width=3)

        self.play(FadeIn(b2_hl), FadeIn(b4_hl))
        self.play(LaggedStart(*[Write(n) for n in collision_note], lag_ratio=0.4), run_time=2.0)
        self.wait(2.5)
        self.play(FadeOut(b2_hl), FadeOut(b4_hl), FadeOut(collision_note))
        self.wait(0.4)

        # ── Stage 7: Delete demonstration ───────────────────────────────
        self.chapter_title("Delete: remove(\"banana\")")

        del_steps = VGroup(
            Text("1. hash(\"banana\") % 6 = 4  →  bucket[4]", font_size=19, color=YELLOW),
            Text("2. Traverse chain: banana = banana  → found", font_size=19, color=GREEN),
            Text("3. Unlink node: bucket[4] now points to elderberry", font_size=19, color=BLUE_A),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).to_edge(DOWN).shift(UP * 0.4)

        banana_node = chain_nodes[4][0]
        elder_node = chain_nodes[4][1]

        b4_del_hl = bucket_rects[4].copy().set_fill(YELLOW, opacity=0.35).set_stroke(YELLOW, width=3)
        self.play(Write(del_steps[0]), FadeIn(b4_del_hl), run_time=0.6)
        self.wait(0.5)

        banana_hl = banana_node[0].copy().set_fill(RED, opacity=0.65).set_stroke(RED, width=3)
        self.play(Write(del_steps[1]), FadeIn(banana_hl), run_time=0.5)
        self.wait(0.7)

        self.play(Write(del_steps[2]), FadeOut(banana_node, scale=0.1), FadeOut(banana_hl), run_time=0.7)
        self.wait(1.5)
        self.play(FadeOut(del_steps), FadeOut(b4_del_hl))
        self.wait(0.5)

        # ── Stage 8: Complexity card ─────────────────────────────────────
        everything = VGroup(
            bucket_rects, index_labels, bucket_header, header,
            *[n for nodes in chain_nodes.values() for n in nodes],
            *chain_arrows,
        )
        self.play(FadeOut(everything))
        self.wait(0.3)

        self.complexity_card(
            time_complexity="O(1) avg / O(n) worst",
            space_complexity="O(n + k)",
        )
        self.wait(2.5)
