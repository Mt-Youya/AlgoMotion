from manim import *
from ...base import AlgoScene, ArrayVis


class HashTable(AlgoScene):
    TITLE = "Hash Table"
    SUBTITLE = "Hash table resolving collisions via open addressing (linear probing)."
    CATEGORY = "data-structure"

    TABLE_SIZE = 11
    CELL_WIDTH = 0.9
    CELL_HEIGHT = 0.75

    def hash_fn(self, key: int) -> int:
        return key % self.TABLE_SIZE

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────
        self.chapter_title("What is a Hash Table?")

        intro_text = VGroup(
            Text("A Hash Table maps keys to values", font_size=28),
            Text("using a hash function: index = key % size", font_size=24, color=YELLOW),
            Text("Collisions are resolved via Linear Probing", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_text, shift=UP * 0.3))
        self.wait(2)
        self.play(FadeOut(intro_text))
        self.wait(0.5)

        # ── Stage 2: Draw empty table ─────────────────────────────────────
        self.chapter_title("Empty Hash Table (size = 11)")

        cells, index_labels, value_labels = self._build_table_visuals()
        table_group = VGroup(*cells, *index_labels, *value_labels)
        table_group.move_to(ORIGIN + DOWN * 0.5)

        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in cells], lag_ratio=0.07))
        self.play(LaggedStart(*[FadeIn(l) for l in index_labels], lag_ratio=0.05))
        self.wait(1)

        # ── Stage 3: Insert keys – show hash function ─────────────────────
        self.chapter_title("Inserting Keys with hash(key) = key % 11")

        keys_to_insert = [22, 33, 44, 55, 11, 66]
        slot_contents = [None] * self.TABLE_SIZE  # track what's stored

        formula_label = Text("hash(key) = key % 11", font_size=26, color=YELLOW)
        formula_label.to_edge(UP, buff=1.2)
        self.play(FadeIn(formula_label))
        self.wait(0.5)

        for key in keys_to_insert:
            slot_contents = self._animate_insert(
                key, slot_contents, cells, value_labels, formula_label
            )
            self.wait(0.4)

        self.play(FadeOut(formula_label))
        self.wait(0.5)

        # ── Stage 4: Linear Probing on collision ──────────────────────────
        self.chapter_title("Collision! Linear Probing in Action")

        collision_desc = VGroup(
            Text("key=22 already occupies slot 0", font_size=24),
            Text("Inserting key=88: hash(88)=0 → COLLISION", font_size=24, color=RED),
            Text("Probe slot 1 → empty → insert here", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.6)

        self.play(FadeIn(collision_desc))
        self.wait(1.5)

        slot_contents = self._animate_insert(
            88, slot_contents, cells, value_labels, None, show_probe=True
        )
        self.wait(0.5)
        self.play(FadeOut(collision_desc))
        self.wait(0.3)

        # ── Stage 5: Search / Lookup ──────────────────────────────────────
        self.chapter_title("Searching: Linear Probe Until Found or Empty")

        search_key = 55
        search_label = Text(f"Search for key={search_key}", font_size=26, color=BLUE)
        search_label.to_edge(UP, buff=1.2)
        self.play(FadeIn(search_label))

        self._animate_search(search_key, slot_contents, cells, value_labels)
        self.wait(0.5)
        self.play(FadeOut(search_label))
        self.wait(0.3)

        # ── Stage 6: Deletion (tombstone) ─────────────────────────────────
        self.chapter_title("Deletion: Mark Slot as Tombstone (DELETED)")

        delete_key = 33
        delete_label = Text(f"Delete key={delete_key} → place tombstone", font_size=26, color=ORANGE)
        delete_label.to_edge(UP, buff=1.2)
        self.play(FadeIn(delete_label))

        slot_contents = self._animate_delete(delete_key, slot_contents, cells, value_labels)
        self.wait(1)
        self.play(FadeOut(delete_label))
        self.wait(0.3)

        # ── Stage 7: Load Factor ──────────────────────────────────────────
        self.chapter_title("Load Factor & Rehashing")

        lf_text = VGroup(
            Text("Load Factor α = n / m", font_size=28, color=YELLOW),
            Text("n = number of entries,  m = table size", font_size=24),
            Text("Keep α < 0.7 to maintain O(1) average performance", font_size=24, color=GREEN),
            Text("When α ≥ 0.7 → Rehash into a larger table", font_size=24, color=RED),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeOut(VGroup(*cells, *index_labels, *value_labels)))
        self.play(LaggedStart(*[FadeIn(t) for t in lf_text], lag_ratio=0.2))
        self.wait(2.5)
        self.play(FadeOut(lf_text))
        self.wait(0.3)

        # ── Stage 8: Complexity Card ──────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(1)",
            time_worst="O(n)",
            space="O(n)",
        )

    # ── Helpers ────────────────────────────────────────────────────────────

    def _build_table_visuals(self):
        cells = []
        index_labels = []
        value_labels = []

        start_x = -(self.TABLE_SIZE - 1) * self.CELL_WIDTH / 2

        for i in range(self.TABLE_SIZE):
            x = start_x + i * self.CELL_WIDTH
            rect = Rectangle(
                width=self.CELL_WIDTH,
                height=self.CELL_HEIGHT,
                stroke_color=WHITE,
                fill_color=DARK_GREY,
                fill_opacity=0.6,
            ).move_to([x, 0, 0])
            cells.append(rect)

            idx_lbl = Text(str(i), font_size=18, color=GREY).next_to(rect, DOWN, buff=0.12)
            index_labels.append(idx_lbl)

            val_lbl = Text("", font_size=20, color=WHITE).move_to(rect.get_center())
            value_labels.append(val_lbl)

        return cells, index_labels, value_labels

    def _animate_insert(self, key, slot_contents, cells, value_labels, formula_label, show_probe=False):
        idx = self.hash_fn(key)
        original_idx = idx

        # Highlight hash computation
        hash_indicator = Text(
            f"hash({key}) = {key} % 11 = {original_idx}",
            font_size=22, color=YELLOW,
        ).to_edge(UP, buff=1.8)
        self.play(FadeIn(hash_indicator))
        self.wait(0.4)

        probe_count = 0
        while slot_contents[idx] is not None:
            # Show collision highlight
            self.play(cells[idx].animate.set_fill(RED, opacity=0.7), run_time=0.3)
            if show_probe:
                probe_lbl = Text(
                    f"Slot {idx} occupied → probe slot {(idx+1) % self.TABLE_SIZE}",
                    font_size=20, color=ORANGE,
                ).to_edge(DOWN, buff=1.4)
                self.play(FadeIn(probe_lbl), run_time=0.3)
                self.wait(0.5)
                self.play(FadeOut(probe_lbl), run_time=0.2)
            self.play(cells[idx].animate.set_fill(DARK_GREY, opacity=0.6), run_time=0.2)
            idx = (idx + 1) % self.TABLE_SIZE
            probe_count += 1
            if probe_count > self.TABLE_SIZE:
                break

        # Insert into slot
        slot_contents[idx] = key
        new_val = Text(str(key), font_size=20, color=WHITE).move_to(cells[idx].get_center())
        self.play(
            cells[idx].animate.set_fill(BLUE_D, opacity=0.8),
            Transform(value_labels[idx], new_val),
            run_time=0.5,
        )
        self.play(cells[idx].animate.set_fill(TEAL_D, opacity=0.7), run_time=0.3)
        self.play(FadeOut(hash_indicator))
        return slot_contents

    def _animate_search(self, key, slot_contents, cells, value_labels):
        idx = self.hash_fn(key)
        for _ in range(self.TABLE_SIZE):
            self.play(cells[idx].animate.set_fill(YELLOW_D, opacity=0.8), run_time=0.35)
            self.wait(0.3)
            if slot_contents[idx] == key:
                found_lbl = Text(f"Found {key} at slot {idx}!", font_size=24, color=GREEN)
                found_lbl.to_edge(DOWN, buff=0.8)
                self.play(FadeIn(found_lbl))
                self.wait(1)
                self.play(FadeOut(found_lbl))
                self.play(cells[idx].animate.set_fill(TEAL_D, opacity=0.7), run_time=0.3)
                return
            elif slot_contents[idx] is None:
                not_found_lbl = Text(f"Empty slot → {key} not in table", font_size=24, color=RED)
                not_found_lbl.to_edge(DOWN, buff=0.8)
                self.play(FadeIn(not_found_lbl))
                self.wait(1)
                self.play(FadeOut(not_found_lbl))
                self.play(cells[idx].animate.set_fill(DARK_GREY, opacity=0.6), run_time=0.3)
                return
            self.play(cells[idx].animate.set_fill(DARK_GREY, opacity=0.6), run_time=0.2)
            idx = (idx + 1) % self.TABLE_SIZE

    def _animate_delete(self, key, slot_contents, cells, value_labels):
        idx = self.hash_fn(key)
        for _ in range(self.TABLE_SIZE):
            self.play(cells[idx].animate.set_fill(YELLOW_D, opacity=0.8), run_time=0.35)
            self.wait(0.2)
            if slot_contents[idx] == key:
                slot_contents[idx] = "DELETED"
                tomb_lbl = Text("DEL", font_size=18, color=ORANGE).move_to(cells[idx].get_center())
                self.play(
                    cells[idx].animate.set_fill(ORANGE, opacity=0.5),
                    Transform(value_labels[idx], tomb_lbl),
                    run_time=0.5,
                )
                self.wait(0.5)
                return slot_contents
            elif slot_contents[idx] is None:
                self.play(cells[idx].animate.set_fill(DARK_GREY, opacity=0.6), run_time=0.2)
                return slot_contents
            self.play(cells[idx].animate.set_fill(DARK_GREY, opacity=0.6), run_time=0.2)
            idx = (idx + 1) % self.TABLE_SIZE
        return slot_contents
