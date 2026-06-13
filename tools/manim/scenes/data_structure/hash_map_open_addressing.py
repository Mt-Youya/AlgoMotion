from manim import *
from ...base import AlgoScene, ArrayVis


class HashMapOpenAddressing(AlgoScene):
    TITLE = "Hash Map (Open Addressing)"
    SUBTITLE = "Hash map using quadratic probing for open addressing."
    CATEGORY = "data-structure"

    TABLE_SIZE = 11
    CELL_WIDTH = 0.88
    CELL_HEIGHT = 0.72

    def hash_fn(self, key: int) -> int:
        return key % self.TABLE_SIZE

    def probe_idx(self, base: int, i: int) -> int:
        """Quadratic probing: h(k) + i^2 mod TABLE_SIZE."""
        return (base + i * i) % self.TABLE_SIZE

    def build(self):
        # ── Stage 1: Intro ────────────────────────────────────────────────────
        ch1 = self.chapter_title("What is Open Addressing?")

        intro = VGroup(
            Text("A Hash Map stores key-value pairs", font_size=28, color=BLACK),
            Text("using a hash function to compute array indices.", font_size=26, color=BLACK),
            Text("Open Addressing resolves collisions by probing", font_size=26, color=BLACK),
            Text("for the next available slot inside the same array.", font_size=26, color=BLACK),
            Text("Quadratic Probing: index = (h(k) + i²) mod m", font_size=26, color=BLUE_D),
        ).arrange(DOWN, buff=0.32).move_to(ORIGIN + DOWN * 0.3)

        self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.2) for t in intro], lag_ratio=0.15))
        self.wait(2.5)
        self.play(FadeOut(intro), FadeOut(ch1))
        self.wait(0.4)

        # ── Stage 2: Draw empty hash table ───────────────────────────────────
        ch2 = self.chapter_title("Empty Hash Map  (size = 11)")

        cells, idx_labels, key_labels, val_labels = self._build_table()
        table_group = VGroup(*cells, *idx_labels, *key_labels, *val_labels)
        table_group.move_to(ORIGIN + DOWN * 0.4)

        col_header_k = Text("Key", font_size=20, color=GREY).next_to(cells[0], UP, buff=0.55)
        col_header_v = Text("Val", font_size=20, color=GREY).next_to(cells[0], UP, buff=0.1)

        self.play(LaggedStart(*[FadeIn(c, scale=0.85) for c in cells], lag_ratio=0.06))
        self.play(
            LaggedStart(*[FadeIn(l) for l in idx_labels], lag_ratio=0.05),
            FadeIn(col_header_k),
            FadeIn(col_header_v),
        )
        self.wait(1.2)
        self.play(FadeOut(ch2))
        self.wait(0.3)

        # ── Stage 3: Insert keys – show quadratic probing formula ─────────────
        ch3 = self.chapter_title("Inserting Keys — Quadratic Probing")

        formula = Text("index = (h(k) + i²) mod 11", font_size=24, color=YELLOW_D)
        formula.to_edge(UP, buff=1.35)
        self.play(FadeIn(formula))
        self.wait(0.5)

        slot_keys = [None] * self.TABLE_SIZE
        slot_vals = [None] * self.TABLE_SIZE

        first_batch = [(10, 100), (21, 210), (32, 320), (43, 430), (54, 540)]
        for k, v in first_batch:
            slot_keys, slot_vals = self._animate_insert(
                k, v, slot_keys, slot_vals, cells, key_labels, val_labels, formula
            )
            self.wait(0.35)

        self.play(FadeOut(formula), FadeOut(ch3))
        self.wait(0.3)

        # ── Stage 4: Collision with quadratic probing ─────────────────────────
        ch4 = self.chapter_title("Collision! Quadratic Probing Steps")

        collision_note = VGroup(
            Text("Inserting key=65: h(65) = 65 % 11 = 10", font_size=24, color=BLACK),
            Text("Slot 10 is occupied → probe i=1: (10+1)%11 = 0 → occupied", font_size=22, color=RED),
            Text("Probe i=2: (10+4)%11 = 3 → occupied", font_size=22, color=RED),
            Text("Probe i=3: (10+9)%11 = 8 → EMPTY → insert!", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.28).to_edge(DOWN, buff=0.55)

        self.play(FadeIn(collision_note))
        self.wait(2)

        formula2 = Text("index = (h(k) + i²) mod 11", font_size=24, color=YELLOW_D)
        formula2.to_edge(UP, buff=1.35)
        self.play(FadeIn(formula2))

        slot_keys, slot_vals = self._animate_insert(
            65, 650, slot_keys, slot_vals, cells, key_labels, val_labels, formula2,
            show_probe=True
        )
        self.wait(0.8)
        self.play(FadeOut(collision_note), FadeOut(formula2), FadeOut(ch4))
        self.wait(0.3)

        # ── Stage 5: Search / Lookup ──────────────────────────────────────────
        ch5 = self.chapter_title("Searching with Quadratic Probing")

        search_key = 54
        search_lbl = Text(f"Search key={search_key}", font_size=26, color=BLUE_D)
        search_lbl.to_edge(UP, buff=1.35)
        self.play(FadeIn(search_lbl))
        self.wait(0.4)

        self._animate_search(search_key, slot_keys, cells, key_labels)
        self.wait(0.5)

        miss_key = 99
        miss_lbl = Text(f"Search key={miss_key} (not in map)", font_size=26, color=RED)
        miss_lbl.to_edge(UP, buff=1.35)
        self.play(Transform(search_lbl, miss_lbl))
        self.wait(0.4)
        self._animate_search(miss_key, slot_keys, cells, key_labels)
        self.wait(0.5)
        self.play(FadeOut(search_lbl), FadeOut(ch5))
        self.wait(0.3)

        # ── Stage 6: Deletion with tombstone ─────────────────────────────────
        ch6 = self.chapter_title("Deletion: Tombstone Strategy")

        del_note = VGroup(
            Text("We cannot simply empty a slot after deletion.", font_size=24, color=BLACK),
            Text("That would break future probe chains!", font_size=24, color=RED),
            Text("Instead, mark the slot as DELETED (tombstone).", font_size=24, color=ORANGE),
            Text("Tombstones are skipped during search but reused on insert.", font_size=24, color=GREEN),
        ).arrange(DOWN, buff=0.28).to_edge(DOWN, buff=0.55)

        self.play(FadeIn(del_note))
        self.wait(2)

        del_key = 32
        del_lbl = Text(f"Delete key={del_key}", font_size=26, color=ORANGE)
        del_lbl.to_edge(UP, buff=1.35)
        self.play(FadeIn(del_lbl))
        slot_keys, slot_vals = self._animate_delete(del_key, slot_keys, slot_vals, cells, key_labels, val_labels)
        self.wait(0.8)
        self.play(FadeOut(del_note), FadeOut(del_lbl), FadeOut(ch6))
        self.wait(0.3)

        # ── Stage 7: Load Factor & Rehashing ─────────────────────────────────
        ch7 = self.chapter_title("Load Factor & Rehashing")

        filled = sum(1 for k in slot_keys if k is not None and k != "DELETED")
        lf_val = round(filled / self.TABLE_SIZE, 2)

        lf_text = VGroup(
            Text(f"Current entries: {filled}   Table size: {self.TABLE_SIZE}", font_size=26, color=BLACK),
            Text(f"Load Factor α = {filled}/{self.TABLE_SIZE} ≈ {lf_val}", font_size=28, color=YELLOW_D),
            Text("Quadratic probing works best when α < 0.5", font_size=26, color=GREEN),
            Text("At α ≥ 0.7 → clustering degrades performance to O(n)", font_size=26, color=RED),
            Text("Solution: Rehash into a table of size 2× (next prime)", font_size=26, color=BLUE_D),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeOut(VGroup(*cells, *idx_labels, *key_labels, *val_labels,
                                  col_header_k, col_header_v)))
        self.play(LaggedStart(*[FadeIn(t) for t in lf_text], lag_ratio=0.18))
        self.wait(2.5)
        self.play(FadeOut(lf_text), FadeOut(ch7))
        self.wait(0.3)

        # ── Stage 8: Comparison with other probing strategies ─────────────────
        ch8 = self.chapter_title("Probing Strategies Compared")

        strategies = VGroup(
            Text("Linear Probing:    index = (h(k) + i) mod m", font_size=24, color=BLACK),
            Text("  → Simple but suffers from primary clustering", font_size=22, color=RED),
            Text("Quadratic Probing: index = (h(k) + i²) mod m", font_size=24, color=BLUE_D),
            Text("  → Reduces primary clustering; secondary clustering possible", font_size=22, color=YELLOW_D),
            Text("Double Hashing:    index = (h1(k) + i·h2(k)) mod m", font_size=24, color=BLACK),
            Text("  → Best distribution; two hash functions required", font_size=22, color=GREEN),
        ).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to(ORIGIN)

        self.play(LaggedStart(*[FadeIn(t, shift=RIGHT * 0.15) for t in strategies], lag_ratio=0.14))
        self.wait(2.5)
        self.play(FadeOut(strategies), FadeOut(ch8))
        self.wait(0.3)

        # ── Stage 9: Complexity Card ──────────────────────────────────────────
        self.complexity_card(
            time_best="O(1)",
            time_avg="O(1)",
            time_worst="O(n)",
            space="O(n)",
        )
        self.wait(1.5)

    # ── Helpers ───────────────────────────────────────────────────────────────

    def _build_table(self):
        """Build two-row table: top row = keys, bottom row = values."""
        cells = []
        idx_labels = []
        key_labels = []
        val_labels = []

        start_x = -(self.TABLE_SIZE - 1) * self.CELL_WIDTH / 2

        for i in range(self.TABLE_SIZE):
            x = start_x + i * self.CELL_WIDTH

            # Key cell (top row)
            key_rect = Rectangle(
                width=self.CELL_WIDTH,
                height=self.CELL_HEIGHT,
                stroke_color=GREY,
                fill_color="#DDEEFF",
                fill_opacity=0.7,
            ).move_to([x, 0.45, 0])
            cells.append(key_rect)

            # Value cell (bottom row)
            val_rect = Rectangle(
                width=self.CELL_WIDTH,
                height=self.CELL_HEIGHT,
                stroke_color=GREY,
                fill_color="#EEEEDD",
                fill_opacity=0.7,
            ).move_to([x, -0.38, 0])
            cells.append(val_rect)

            idx_lbl = Text(str(i), font_size=16, color=GREY).next_to(val_rect, DOWN, buff=0.1)
            idx_labels.append(idx_lbl)

            k_lbl = Text("", font_size=18, color=DARK_GREY).move_to(key_rect.get_center())
            key_labels.append(k_lbl)

            v_lbl = Text("", font_size=18, color=DARK_GREY).move_to(val_rect.get_center())
            val_labels.append(v_lbl)

        return cells, idx_labels, key_labels, val_labels

    def _cell_pair(self, i, cells):
        """Return (key_rect, val_rect) for slot i."""
        return cells[i * 2], cells[i * 2 + 1]

    def _animate_insert(self, key, val, slot_keys, slot_vals, cells, key_labels, val_labels,
                        formula_mob, show_probe=False):
        base = self.hash_fn(key)
        probe = 0
        idx = self.probe_idx(base, probe)

        hash_indicator = Text(
            f"h({key}) = {key} % 11 = {base}",
            font_size=22, color=YELLOW_D,
        ).to_edge(UP, buff=1.8)
        self.play(FadeIn(hash_indicator))
        self.wait(0.35)

        while slot_keys[idx] is not None and slot_keys[idx] != "DELETED":
            k_rect, v_rect = self._cell_pair(idx, cells)
            self.play(
                k_rect.animate.set_fill(RED, opacity=0.6),
                v_rect.animate.set_fill(RED, opacity=0.4),
                run_time=0.3,
            )
            if show_probe:
                probe_lbl = Text(
                    f"Slot {idx} occupied (i={probe}) → try i={probe+1}: slot {self.probe_idx(base, probe+1)}",
                    font_size=19, color=ORANGE,
                ).to_edge(DOWN, buff=1.5)
                self.play(FadeIn(probe_lbl), run_time=0.3)
                self.wait(0.5)
                self.play(FadeOut(probe_lbl), run_time=0.2)
            self.play(
                k_rect.animate.set_fill("#DDEEFF", opacity=0.7),
                v_rect.animate.set_fill("#EEEEDD", opacity=0.7),
                run_time=0.2,
            )
            probe += 1
            idx = self.probe_idx(base, probe)
            if probe > self.TABLE_SIZE:
                break

        slot_keys[idx] = key
        slot_vals[idx] = val

        k_rect, v_rect = self._cell_pair(idx, cells)
        new_k = Text(str(key), font_size=18, color=DARK_BLUE).move_to(k_rect.get_center())
        new_v = Text(str(val), font_size=18, color=DARK_GREY).move_to(v_rect.get_center())

        self.play(
            k_rect.animate.set_fill(BLUE_D, opacity=0.75),
            v_rect.animate.set_fill(TEAL_E, opacity=0.6),
            Transform(key_labels[idx], new_k),
            Transform(val_labels[idx], new_v),
            run_time=0.5,
        )
        self.play(
            k_rect.animate.set_fill(BLUE_E, opacity=0.55),
            v_rect.animate.set_fill("#DDEEDD", opacity=0.7),
            run_time=0.3,
        )
        self.play(FadeOut(hash_indicator))
        return slot_keys, slot_vals

    def _animate_search(self, key, slot_keys, cells, key_labels):
        base = self.hash_fn(key)
        for probe in range(self.TABLE_SIZE):
            idx = self.probe_idx(base, probe)
            k_rect, v_rect = self._cell_pair(idx, cells)
            self.play(
                k_rect.animate.set_fill(YELLOW_D, opacity=0.75),
                v_rect.animate.set_fill(YELLOW_E, opacity=0.5),
                run_time=0.3,
            )
            self.wait(0.25)
            if slot_keys[idx] == key:
                found = Text(f"Found key={key} at slot {idx}!", font_size=24, color=GREEN)
                found.to_edge(DOWN, buff=0.9)
                self.play(FadeIn(found))
                self.wait(1)
                self.play(FadeOut(found))
                self.play(
                    k_rect.animate.set_fill(BLUE_E, opacity=0.55),
                    v_rect.animate.set_fill("#DDEEDD", opacity=0.7),
                    run_time=0.25,
                )
                return
            elif slot_keys[idx] is None:
                nf = Text(f"Empty slot → key={key} not found", font_size=24, color=RED)
                nf.to_edge(DOWN, buff=0.9)
                self.play(FadeIn(nf))
                self.wait(1)
                self.play(FadeOut(nf))
                self.play(
                    k_rect.animate.set_fill("#DDEEFF", opacity=0.7),
                    v_rect.animate.set_fill("#EEEEDD", opacity=0.7),
                    run_time=0.25,
                )
                return
            self.play(
                k_rect.animate.set_fill("#DDEEFF", opacity=0.7),
                v_rect.animate.set_fill("#EEEEDD", opacity=0.7),
                run_time=0.2,
            )

    def _animate_delete(self, key, slot_keys, slot_vals, cells, key_labels, val_labels):
        base = self.hash_fn(key)
        for probe in range(self.TABLE_SIZE):
            idx = self.probe_idx(base, probe)
            k_rect, v_rect = self._cell_pair(idx, cells)
            self.play(
                k_rect.animate.set_fill(YELLOW_D, opacity=0.75),
                run_time=0.3,
            )
            self.wait(0.2)
            if slot_keys[idx] == key:
                slot_keys[idx] = "DELETED"
                slot_vals[idx] = None
                tomb_k = Text("DEL", font_size=17, color=ORANGE).move_to(k_rect.get_center())
                tomb_v = Text("", font_size=17, color=ORANGE).move_to(v_rect.get_center())
                self.play(
                    k_rect.animate.set_fill(ORANGE, opacity=0.5),
                    v_rect.animate.set_fill(ORANGE, opacity=0.3),
                    Transform(key_labels[idx], tomb_k),
                    Transform(val_labels[idx], tomb_v),
                    run_time=0.5,
                )
                self.wait(0.5)
                return slot_keys, slot_vals
            elif slot_keys[idx] is None:
                self.play(
                    k_rect.animate.set_fill("#DDEEFF", opacity=0.7),
                    run_time=0.2,
                )
                return slot_keys, slot_vals
            self.play(
                k_rect.animate.set_fill("#DDEEFF", opacity=0.7),
                run_time=0.2,
            )
        return slot_keys, slot_vals
