from manim import *
from ...base import AlgoScene


class LruCache(AlgoScene):
    TITLE = "LRU Cache"
    SUBTITLE = "Cache evicting least recently used item, implemented with hash map and doubly li"
    CATEGORY = "data-structure"

    def build(self):
        # ─────────────────────────────────────────────
        # Stage 1: Intro – problem statement
        # ─────────────────────────────────────────────
        self.chapter_title("What is an LRU Cache?")

        intro_lines = VGroup(
            Text("LRU = Least Recently Used", font_size=32, color=YELLOW),
            Text("Fixed-capacity cache that evicts the", font_size=26),
            Text("item accessed least recently when full.", font_size=26),
            Text("Operations: get(key) and put(key, value)", font_size=26, color=GREEN),
            Text("Both must run in O(1) time.", font_size=26, color=BLUE),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        for line in intro_lines:
            self.play(FadeIn(line, shift=UP * 0.2), run_time=0.5)
        self.wait(2)
        self.play(FadeOut(intro_lines))

        # ─────────────────────────────────────────────
        # Stage 2: Data structure overview
        # ─────────────────────────────────────────────
        self.chapter_title("Data Structures Used")

        ds_title = Text("Hash Map  +  Doubly Linked List", font_size=30, color=YELLOW)
        ds_title.to_edge(UP, buff=1.2)
        self.play(Write(ds_title))

        # HashMap box
        hm_box = Rectangle(width=3.2, height=2.2, color=BLUE)
        hm_label = Text("Hash Map", font_size=24, color=BLUE)
        hm_sub = Text("key → node pointer\nO(1) lookup", font_size=18)
        hm_group = VGroup(hm_box, hm_label.next_to(hm_box, UP, buff=0.1), hm_sub.move_to(hm_box))
        hm_group.shift(LEFT * 3)

        # DLL box
        dll_box = Rectangle(width=3.2, height=2.2, color=ORANGE)
        dll_label = Text("Doubly Linked List", font_size=24, color=ORANGE)
        dll_sub = Text("MRU ← head … tail → LRU\nO(1) insert/remove", font_size=18)
        dll_group = VGroup(dll_box, dll_label.next_to(dll_box, UP, buff=0.1), dll_sub.move_to(dll_box))
        dll_group.shift(RIGHT * 3)

        arrow = Arrow(hm_box.get_right(), dll_box.get_left(), buff=0.1, color=WHITE)

        self.play(FadeIn(hm_group), FadeIn(dll_group), GrowArrow(arrow))
        self.wait(2)
        self.play(FadeOut(ds_title), FadeOut(hm_group), FadeOut(dll_group), FadeOut(arrow))

        # ─────────────────────────────────────────────
        # Stage 3: Build initial cache (capacity = 3)
        # ─────────────────────────────────────────────
        self.chapter_title("Initialize Cache (capacity = 3)")

        cap_text = Text("capacity = 3", font_size=28, color=YELLOW).to_edge(UP, buff=1.0)
        self.play(Write(cap_text))

        # Sentinel head and tail
        def make_node(label, val="", color=WHITE):
            box = RoundedRectangle(corner_radius=0.12, width=1.4, height=0.8, color=color)
            txt = Text(f"{label}" + (f"\n{val}" if val else ""), font_size=18).move_to(box)
            return VGroup(box, txt)

        sentinel_head = make_node("HEAD", color=GREY)
        sentinel_tail = make_node("TAIL", color=GREY)
        sentinel_head.shift(LEFT * 4)
        sentinel_tail.shift(RIGHT * 4)

        h2t = Arrow(sentinel_head.get_right(), sentinel_tail.get_left(), buff=0.05, color=GREY)
        t2h = Arrow(sentinel_tail.get_left(), sentinel_head.get_right(), buff=0.15, color=GREY)

        self.play(FadeIn(sentinel_head), FadeIn(sentinel_tail))
        self.play(GrowArrow(h2t), GrowArrow(t2h))
        self.wait(1)

        # HashMap visual (empty)
        hmap_title = Text("HashMap: {}", font_size=22, color=BLUE).to_edge(DOWN, buff=1.2)
        self.play(Write(hmap_title))
        self.wait(1)
        self.play(FadeOut(cap_text), FadeOut(sentinel_head), FadeOut(sentinel_tail),
                  FadeOut(h2t), FadeOut(t2h), FadeOut(hmap_title))

        # ─────────────────────────────────────────────
        # Stage 4: put() operations
        # ─────────────────────────────────────────────
        self.chapter_title("put() – Insert Into Cache")

        # We'll draw a horizontal DLL with HashMap below
        cache_capacity = 3
        cache_state = []  # list of (key, val) MRU first

        node_group = VGroup()
        hmap_entries = VGroup()

        def redraw_cache(state, highlight_key=None):
            nonlocal node_group, hmap_entries
            node_group.become(VGroup())
            hmap_entries.become(VGroup())

            nodes = []
            for i, (k, v) in enumerate(state):
                color = YELLOW if k == highlight_key else WHITE
                box = RoundedRectangle(corner_radius=0.12, width=1.3, height=0.75, color=color)
                lbl = Text(f"{k}:{v}", font_size=20, color=color).move_to(box)
                n = VGroup(box, lbl)
                n.shift(RIGHT * (i * 1.6 - (len(state) - 1) * 0.8) + UP * 0.5)
                nodes.append(n)
                node_group.add(n)

            # arrows between nodes
            for i in range(len(nodes) - 1):
                a = Arrow(nodes[i].get_right(), nodes[i + 1].get_left(), buff=0.05, color=GREY, stroke_width=2)
                b = Arrow(nodes[i + 1].get_left(), nodes[i].get_right(), buff=0.15, color=GREY, stroke_width=2)
                node_group.add(a, b)

            # labels
            if nodes:
                mru_lbl = Text("MRU", font_size=16, color=GREEN).next_to(nodes[0], UP, buff=0.1)
                lru_lbl = Text("LRU", font_size=16, color=RED).next_to(nodes[-1], UP, buff=0.1)
                node_group.add(mru_lbl, lru_lbl)

            # hashmap
            hm_str = "HashMap: {" + ", ".join(f"{k}→node" for k, _ in state) + "}"
            hmap_entries.add(Text(hm_str, font_size=20, color=BLUE).to_edge(DOWN, buff=1.0))

        puts = [(1, "A"), (2, "B"), (3, "C")]
        for k, v in puts:
            cache_state.insert(0, (k, v))  # MRU at front
            redraw_cache(cache_state, highlight_key=k)
            op_text = Text(f"put({k}, '{v}')", font_size=26, color=GREEN).to_edge(UP, buff=1.0)
            self.play(Write(op_text))
            self.play(FadeIn(node_group), FadeIn(hmap_entries))
            self.wait(1)
            self.play(FadeOut(op_text), FadeOut(node_group), FadeOut(hmap_entries))

        self.wait(0.5)

        # ─────────────────────────────────────────────
        # Stage 5: get() and eviction
        # ─────────────────────────────────────────────
        self.chapter_title("get() and Cache Eviction")

        # get(1) → move 1 to MRU
        cache_state = [(1, "A"), (2, "B"), (3, "C")]
        redraw_cache(cache_state)
        self.play(FadeIn(node_group), FadeIn(hmap_entries))

        get_op = Text("get(2)  →  move to MRU", font_size=26, color=YELLOW).to_edge(UP, buff=1.0)
        self.play(Write(get_op))
        self.wait(0.8)

        # Simulate get(2): move key 2 to front
        cache_state = [(2, "B"), (1, "A"), (3, "C")]
        redraw_cache(cache_state, highlight_key=2)
        self.play(FadeOut(node_group), FadeOut(hmap_entries))
        self.play(FadeIn(node_group), FadeIn(hmap_entries))
        self.wait(1)
        self.play(FadeOut(get_op))

        # put(4, 'D') → evict LRU (key=3)
        evict_op = Text("put(4, 'D')  →  cache full, evict LRU (key=3)", font_size=22, color=RED).to_edge(UP, buff=1.0)
        self.play(Write(evict_op))
        self.wait(0.8)

        cache_state = [(4, "D"), (2, "B"), (1, "A")]
        redraw_cache(cache_state, highlight_key=4)
        self.play(FadeOut(node_group), FadeOut(hmap_entries))
        self.play(FadeIn(node_group), FadeIn(hmap_entries))
        self.wait(1.5)
        self.play(FadeOut(evict_op), FadeOut(node_group), FadeOut(hmap_entries))

        # ─────────────────────────────────────────────
        # Stage 6: Code walkthrough
        # ─────────────────────────────────────────────
        self.chapter_title("Implementation Sketch")

        code_lines = VGroup(
            Text("class LRUCache:", font_size=20, color=YELLOW),
            Text("  def __init__(self, capacity):", font_size=20),
            Text("    self.cap = capacity", font_size=20),
            Text("    self.map = {}   # key → node", font_size=20, color=BLUE),
            Text("    self.head, self.tail = Node(), Node()  # sentinels", font_size=20),
            Text("  def get(self, key):", font_size=20, color=GREEN),
            Text("    if key not in self.map: return -1", font_size=20),
            Text("    self._move_to_front(self.map[key])", font_size=20),
            Text("  def put(self, key, value):", font_size=20, color=GREEN),
            Text("    if len(self.map) == self.cap:", font_size=20),
            Text("      self._evict_lru()   # remove tail.prev", font_size=20, color=RED),
            Text("    self._insert_front(node)", font_size=20),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).scale(0.9).move_to(ORIGIN)

        for line in code_lines:
            self.play(FadeIn(line, shift=RIGHT * 0.1), run_time=0.25)
        self.wait(2.5)
        self.play(FadeOut(code_lines))

        # ─────────────────────────────────────────────
        # Stage 7: Complexity card
        # ─────────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(1)",
            space_complexity="O(n)",
        )
        self.wait(2)
