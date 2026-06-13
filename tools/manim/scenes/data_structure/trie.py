from manim import *
from ...base import AlgoScene


class Trie(AlgoScene):
    TITLE = "Trie"
    SUBTITLE = "Tree for storing strings with O(m) insert and search."
    CATEGORY = "data-structure"

    # ── internal trie data structure ──────────────────────────────────────────

    class _TrieNode:
        def __init__(self):
            self.children = {}
            self.is_end = False

    def _trie_insert(self, root, word):
        node = root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = self.__class__._TrieNode()
            node = node.children[ch]
        node.is_end = True

    # ── layout helpers ────────────────────────────────────────────────────────

    def _make_node_mob(self, label_text, color=None):
        """Return (circle, label) VGroup for a trie node."""
        fill = color if color else "#2255CC"
        circle = Circle(radius=0.32, color=fill, fill_color=fill, fill_opacity=0.85, stroke_width=2.5)
        label = Text(label_text, font_size=20, color=WHITE, weight="BOLD")
        label.move_to(circle.get_center())
        return VGroup(circle, label)

    def _make_end_dot(self, node_mob):
        """Small green dot at bottom of a terminal node."""
        dot = Dot(radius=0.1, color="#CEEB5A").next_to(node_mob, DOWN, buff=0.05)
        return dot

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self):

        # ── Stage 1: What is a Trie? ─────────────────────────────────────────
        ch1 = self.chapter_title("What is a Trie?")
        intro = VGroup(
            Text("A Trie (prefix tree) stores strings character by character.", font_size=26, color="#1A1C2C"),
            Text("Each path from root → leaf spells out a complete word.", font_size=26, color="#1A1C2C"),
            Text("Shared prefixes share nodes — 'cat' and 'car' share 'c' and 'a'.", font_size=26, color="#2255CC"),
            Text("Insert / Search run in O(m) where m = length of the key.", font_size=26, color="#E05A3A"),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to(ORIGIN)
        self.play(FadeIn(intro, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: Node anatomy ─────────────────────────────────────────────
        ch2 = self.chapter_title("Trie Node Anatomy")

        root_mob = self._make_node_mob("root", "#888899")
        root_mob.move_to(UP * 1.5)

        child_a = self._make_node_mob("a")
        child_b = self._make_node_mob("b")
        child_c = self._make_node_mob("c")
        children_row = VGroup(child_a, child_b, child_c).arrange(RIGHT, buff=1.2).next_to(root_mob, DOWN, buff=1.0)

        edge_a = Line(root_mob.get_bottom(), child_a.get_top(), color="#888899", stroke_width=2).set_z_index(-1)
        edge_b = Line(root_mob.get_bottom(), child_b.get_top(), color="#888899", stroke_width=2).set_z_index(-1)
        edge_c = Line(root_mob.get_bottom(), child_c.get_top(), color="#888899", stroke_width=2).set_z_index(-1)

        end_dot = self._make_end_dot(child_b)

        self.play(GrowFromCenter(root_mob))
        self.wait(0.4)
        self.play(
            Create(edge_a), Create(edge_b), Create(edge_c),
            GrowFromCenter(child_a), GrowFromCenter(child_b), GrowFromCenter(child_c),
        )
        self.wait(0.6)

        # Annotate end-of-word marker
        self.play(FadeIn(end_dot))
        end_note = Text("● = end of word", font_size=22, color="#CEEB5A").to_edge(DOWN, buff=1.0)
        self.play(Write(end_note))
        self.wait(1.5)

        # Annotate children dict
        dict_note = Text("children: dict[char → TrieNode]", font_size=22, color="#2255CC").to_edge(DOWN, buff=0.45)
        self.play(Write(dict_note))
        self.wait(1.5)

        anatomy_group = VGroup(root_mob, child_a, child_b, child_c, edge_a, edge_b, edge_c, end_dot)
        self.play(FadeOut(anatomy_group), FadeOut(end_note), FadeOut(dict_note), FadeOut(ch2))
        self.wait(0.2)

        # ── Stage 3: Build trie by inserting words ────────────────────────────
        ch3 = self.chapter_title("Insert: 'cat', 'car', 'card', 'bat'")

        words = ["cat", "car", "card", "bat"]

        # Node positions (manually laid out for clarity)
        # root at top centre; depth-1: c, b; depth-2: ca, ba; depth-3: cat/car; depth-4: card
        positions = {
            "root": UP * 2.8,
            "c":    UP * 1.5 + LEFT * 1.8,
            "b":    UP * 1.5 + RIGHT * 1.8,
            "ca":   UP * 0.2 + LEFT * 1.8,
            "ba":   UP * 0.2 + RIGHT * 1.8,
            "cat":  DOWN * 1.1 + LEFT * 2.8,
            "car":  DOWN * 1.1 + LEFT * 0.8,
            "bat":  DOWN * 1.1 + RIGHT * 1.8,
            "card": DOWN * 2.4 + LEFT * 0.8,
        }

        node_labels = {
            "root": "·",
            "c": "c", "b": "b",
            "ca": "a", "ba": "a",
            "cat": "t", "car": "r",
            "bat": "t",
            "card": "d",
        }

        node_mobs = {}
        edge_mobs = {}
        end_dots = {}

        # parent map
        parent_map = {
            "c": "root", "b": "root",
            "ca": "c", "ba": "b",
            "cat": "ca", "car": "ca",
            "bat": "ba",
            "card": "car",
        }

        # end-of-word nodes
        end_nodes = {"cat", "car", "bat", "card"}

        # insertion order per word
        insert_sequences = {
            "cat":  ["c", "ca", "cat"],
            "car":  ["c", "ca", "car"],
            "card": ["c", "ca", "car", "card"],
            "bat":  ["b", "ba", "bat"],
        }

        # Create root
        root_node = self._make_node_mob("·", "#888899").move_to(positions["root"])
        node_mobs["root"] = root_node
        self.play(GrowFromCenter(root_node))
        self.wait(0.3)

        for word in words:
            word_label = Text(f"Insert: \"{word}\"", font_size=28, color="#E05A3A").to_edge(DOWN, buff=0.4)
            self.play(Write(word_label))

            for key in insert_sequences[word]:
                if key in node_mobs:
                    # Node already exists — highlight it
                    self.play(node_mobs[key][0].animate.set_fill(color="#CEEB5A", opacity=1), run_time=0.4)
                    self.wait(0.25)
                    self.play(node_mobs[key][0].animate.set_fill(color="#2255CC", opacity=0.85), run_time=0.3)
                else:
                    # Create new node
                    new_mob = self._make_node_mob(node_labels[key]).move_to(positions[key])
                    node_mobs[key] = new_mob
                    parent_key = parent_map[key]
                    edge = Line(
                        positions[parent_key], positions[key],
                        color="#888899", stroke_width=2
                    ).set_z_index(-1)
                    edge_mobs[key] = edge
                    self.play(Create(edge), GrowFromCenter(new_mob), run_time=0.5)
                    self.wait(0.2)

                if key in end_nodes and insert_sequences[word][-1] == key:
                    if key not in end_dots:
                        dot = Dot(radius=0.1, color="#CEEB5A").next_to(node_mobs[key], DOWN, buff=0.04)
                        end_dots[key] = dot
                        self.play(FadeIn(dot))

            self.wait(0.5)
            self.play(FadeOut(word_label))

        self.wait(1.2)
        self.play(FadeOut(ch3))
        self.wait(0.2)

        # ── Stage 4: Search animation ─────────────────────────────────────────
        ch4 = self.chapter_title("Search: 'car' vs 'cap'")

        all_trie = VGroup(
            *node_mobs.values(),
            *edge_mobs.values(),
            *end_dots.values(),
        )

        # Search 'car' — success
        search_label = Text("Searching: \"car\"", font_size=28, color="#2255CC").to_edge(DOWN, buff=0.9)
        self.play(Write(search_label))

        path_car = ["root", "c", "ca", "car"]
        for key in path_car:
            mob = node_mobs[key]
            self.play(mob[0].animate.set_fill(color="#CEEB5A", opacity=1), run_time=0.45)
            self.wait(0.3)

        found_text = Text("FOUND ✓  (end-of-word marker present)", font_size=24, color="#CEEB5A").to_edge(DOWN, buff=0.4)
        self.play(Write(found_text))
        self.wait(1.2)

        # Reset colours
        for key in path_car:
            self.play(node_mobs[key][0].animate.set_fill(color="#2255CC" if key != "root" else "#888899", opacity=0.85), run_time=0.25)
        self.play(FadeOut(search_label), FadeOut(found_text))
        self.wait(0.3)

        # Search 'cap' — failure (node 'p' does not exist)
        search_label2 = Text("Searching: \"cap\"", font_size=28, color="#E05A3A").to_edge(DOWN, buff=0.9)
        self.play(Write(search_label2))

        path_cap = ["root", "c", "ca"]
        for key in path_cap:
            mob = node_mobs[key]
            self.play(mob[0].animate.set_fill(color="#CEEB5A", opacity=1), run_time=0.45)
            self.wait(0.3)

        miss_text = Text("No child 'p' at node 'a'  → NOT FOUND ✗", font_size=24, color="#E05A3A").to_edge(DOWN, buff=0.4)
        self.play(Write(miss_text))
        self.wait(1.5)

        for key in path_cap:
            self.play(node_mobs[key][0].animate.set_fill(color="#2255CC" if key != "root" else "#888899", opacity=0.85), run_time=0.25)
        self.play(FadeOut(search_label2), FadeOut(miss_text), FadeOut(ch4))
        self.wait(0.2)

        # ── Stage 5: Prefix query ─────────────────────────────────────────────
        ch5 = self.chapter_title("Prefix Query: starts_with('ca')")

        prefix_label = Text("starts_with(\"ca\") — any word beginning with 'ca'?", font_size=25, color="#1A1C2C").to_edge(DOWN, buff=0.9)
        self.play(Write(prefix_label))

        path_ca = ["root", "c", "ca"]
        for key in path_ca:
            self.play(node_mobs[key][0].animate.set_fill(color="#CEEB5A", opacity=1), run_time=0.4)
            self.wait(0.25)

        # Highlight subtree under 'ca'
        for key in ["cat", "car", "card"]:
            self.play(node_mobs[key][0].animate.set_fill(color="#F0A030", opacity=0.9), run_time=0.35)

        result_text = Text("→  cat, car, card  all start with 'ca'", font_size=24, color="#F0A030").to_edge(DOWN, buff=0.4)
        self.play(Write(result_text))
        self.wait(2.0)

        self.play(FadeOut(prefix_label), FadeOut(result_text))
        for key in node_mobs:
            fill = "#888899" if key == "root" else "#2255CC"
            self.play(node_mobs[key][0].animate.set_fill(color=fill, opacity=0.85), run_time=0.15)
        self.play(FadeOut(ch5))
        self.wait(0.2)

        # ── Stage 6: Delete operation ─────────────────────────────────────────
        ch6 = self.chapter_title("Delete: 'car' (leaf pruning)")

        del_label = Text("Delete \"car\": unmark end-of-word, prune if no children", font_size=24, color="#1A1C2C").to_edge(DOWN, buff=0.9)
        self.play(Write(del_label))

        # Highlight car node, show dot removal
        self.play(node_mobs["car"][0].animate.set_fill(color="#E05A3A", opacity=0.9), run_time=0.5)
        self.wait(0.4)
        if "car" in end_dots:
            self.play(FadeOut(end_dots["car"]))
        unmark_text = Text("end-of-word flag cleared", font_size=22, color="#E05A3A").to_edge(DOWN, buff=0.45)
        self.play(Write(unmark_text))
        self.wait(0.8)

        # 'car' still has child 'card' so node stays
        keep_text = Text("Node 'r' has child 'd' → node kept in tree", font_size=22, color="#2255CC").to_edge(DOWN, buff=0.1)
        self.play(Write(keep_text))
        self.wait(1.5)

        self.play(
            node_mobs["car"][0].animate.set_fill(color="#2255CC", opacity=0.85),
            FadeOut(del_label), FadeOut(unmark_text), FadeOut(keep_text),
            FadeOut(ch6),
        )
        self.wait(0.2)

        # Fade out entire trie
        self.play(FadeOut(all_trie))
        self.wait(0.3)

        # ── Stage 7: Complexity Card ──────────────────────────────────────────
        ch7 = self.chapter_title("Complexity Summary")
        self.wait(0.5)

        card = self.complexity_card(
            time_best="O(m)",
            time_avg="O(m)",
            time_worst="O(m)",
            space="O(n \\cdot \\Sigma)",
        )
        note = Text(
            "m = key length · n = number of keys · Σ = alphabet size",
            font_size=22,
            color="#888899",
        ).next_to(card, DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.5)
        self.play(FadeOut(card), FadeOut(note), FadeOut(ch7))
