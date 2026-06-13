from manim import *
from ...base import AlgoScene

# ── Palette shortcuts ─────────────────────────────────────────────────────────
PAPER  = "#F5F0E8"
INK    = "#1A1C2C"
COBALT = "#2255CC"
SIGNAL = "#CEEB5A"
CORAL  = "#E05A3A"
MIST   = "#DDE4F0"
GRAY   = "#888899"
PURPLE = "#8855CC"
AMBER  = "#F0A030"


def _node_circle(label: str, color: str = COBALT, radius: float = 0.35) -> VGroup:
    """Return a labelled circle for trie nodes."""
    circ = Circle(radius=radius, color=color, fill_color=color, fill_opacity=0.25, stroke_width=2.5)
    txt  = Text(label, font_size=20, color=INK, weight="BOLD")
    return VGroup(circ, txt)


class AhoCorasick(AlgoScene):
    TITLE    = "Aho-Corasick"
    SUBTITLE = "Multi-pattern string matching in O(n+m+z) using a trie with failure links."
    CATEGORY = "string"

    # ── helpers ───────────────────────────────────────────────────────────────

    def _make_trie_nodes(self):
        """Build the visual trie for patterns: 'he', 'she', 'his', 'hers'."""
        # Node layout (label, position)
        layout = {
            "root": ORIGIN + UP * 2.5,
            "h":    ORIGIN + UP * 1.0 + LEFT * 3.0,
            "s":    ORIGIN + UP * 1.0 + RIGHT * 1.5,
            "he":   ORIGIN + DOWN * 0.5 + LEFT * 3.5,
            "hi":   ORIGIN + DOWN * 0.5 + LEFT * 1.5,
            "sh":   ORIGIN + DOWN * 0.5 + RIGHT * 1.5,
            "her":  ORIGIN + DOWN * 2.0 + LEFT * 3.5,
            "his":  ORIGIN + DOWN * 2.0 + LEFT * 1.5,
            "she":  ORIGIN + DOWN * 2.0 + RIGHT * 1.5,
            "hers": ORIGIN + DOWN * 3.5 + LEFT * 3.5,
        }
        colors = {
            "root": GRAY,
            "he":   SIGNAL,   # end of "he"
            "his":  SIGNAL,   # end of "his"
            "she":  SIGNAL,   # end of "she"
            "hers": SIGNAL,   # end of "hers"
        }
        nodes = {}
        for key, pos in layout.items():
            color = colors.get(key, COBALT)
            node  = _node_circle(key.replace("root", "ε"), color=color)
            node.move_to(pos)
            nodes[key] = node
        return nodes, layout

    def _make_edge(self, pos_a, pos_b, label: str, color: str = INK, dashed: bool = False) -> VGroup:
        """Arrow + edge label between two positions."""
        if dashed:
            arr = DashedVMobject(
                Arrow(pos_a, pos_b, buff=0.38, color=color, stroke_width=2, tip_length=0.18),
                num_dashes=12,
            )
        else:
            arr = Arrow(pos_a, pos_b, buff=0.38, color=color, stroke_width=2, tip_length=0.18)
        mid  = (pos_a + pos_b) / 2
        lbl  = Text(label, font_size=16, color=color).move_to(mid + UP * 0.22)
        return VGroup(arr, lbl)

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self):
        # ════════════════════════════════════════════════════════════════════
        # Stage 1 – Problem Setup
        # ════════════════════════════════════════════════════════════════════
        ch1 = self.chapter_title("Problem Setup")

        patterns_label = Text("Patterns:", font_size=28, color=COBALT, weight="BOLD").shift(UP * 1.8 + LEFT * 4)
        patterns_list  = VGroup(*[
            Text(p, font_size=26, color=CORAL)
            for p in ['"he"', '"she"', '"his"', '"hers"']
        ]).arrange(RIGHT, buff=0.6).next_to(patterns_label, RIGHT, buff=0.4)

        text_label = Text("Text:", font_size=28, color=COBALT, weight="BOLD").next_to(patterns_label, DOWN * 3.5)
        text_str   = "ushers"
        text_chars = VGroup(*[
            VGroup(
                Square(side_length=0.52, color=MIST, fill_color=MIST, fill_opacity=0.6, stroke_color=COBALT),
                Text(c, font_size=22, color=INK),
            )
            for c in text_str
        ]).arrange(RIGHT, buff=0.06).next_to(text_label, RIGHT, buff=0.4)

        goal = Text(
            "Find ALL occurrences of every pattern in one O(n+m+z) pass",
            font_size=22, color=GRAY,
        ).shift(DOWN * 2.8)

        self.play(FadeIn(patterns_label), LaggedStart(*[FadeIn(p) for p in patterns_list], lag_ratio=0.15))
        self.play(FadeIn(text_label), LaggedStart(*[FadeIn(sq) for sq in text_chars], lag_ratio=0.07))
        self.play(FadeIn(goal, shift=UP * 0.15))
        self.wait(1.8)
        self.play(FadeOut(goal), FadeOut(ch1))

        naive = Text(
            "Naïve: run KMP for each pattern → O(n·k + m)   ← too slow for many patterns",
            font_size=20, color=CORAL,
        ).shift(DOWN * 2.8)
        self.play(FadeIn(naive))
        self.wait(1.5)
        self.play(FadeOut(naive))
        self.play(FadeOut(patterns_label), FadeOut(patterns_list), FadeOut(text_label), FadeOut(text_chars))

        # ════════════════════════════════════════════════════════════════════
        # Stage 2 – Build the Trie
        # ════════════════════════════════════════════════════════════════════
        ch2 = self.chapter_title("Step 1 — Build the Trie")

        nodes, layout = self._make_trie_nodes()

        # Trie edges (parent, child, edge_char)
        trie_edges_def = [
            ("root", "h",    "h"),
            ("root", "s",    "s"),
            ("h",    "he",   "e"),
            ("h",    "hi",   "i"),
            ("s",    "sh",   "h"),
            ("he",   "her",  "r"),
            ("hi",   "his",  "s"),
            ("sh",   "she",  "e"),
            ("her",  "hers", "s"),
        ]
        trie_edges = {}
        for src, dst, ch in trie_edges_def:
            e = self._make_edge(layout[src], layout[dst], ch)
            trie_edges[(src, dst)] = e

        # Animate trie construction level by level
        self.play(FadeIn(nodes["root"]))
        self.wait(0.3)
        for src, dst, _ch in trie_edges_def:
            self.play(
                Create(trie_edges[(src, dst)]),
                FadeIn(nodes[dst]),
                run_time=0.45,
            )
        self.wait(1.0)

        caption1 = self.caption("Insert each pattern character by character into the trie")
        self.wait(1.4)
        self.play(FadeOut(caption1))

        # Mark output nodes (pattern endings)
        for key in ("he", "his", "she", "hers"):
            ring = Circle(
                radius=0.42, color=SIGNAL, stroke_width=3.5, fill_opacity=0,
            ).move_to(layout[key])
            self.play(Create(ring), run_time=0.3)
        self.wait(0.8)
        self.play(FadeOut(ch2))

        # ════════════════════════════════════════════════════════════════════
        # Stage 3 – Failure Links (BFS)
        # ════════════════════════════════════════════════════════════════════
        ch3 = self.chapter_title("Step 2 — Compute Failure Links")

        fail_caption = Text(
            "Failure link = longest proper suffix of current path that is also a trie prefix",
            font_size=20, color=GRAY,
        ).shift(DOWN * 3.2)
        self.play(FadeIn(fail_caption))
        self.wait(1.2)

        # Show a subset of failure links as dashed red arrows
        fail_links = [
            ("he",  "root",  "ε",   CORAL),
            ("hi",  "root",  "ε",   CORAL),
            ("sh",  "h",     "h",   CORAL),
            ("she", "he",    "he",  CORAL),
            ("her", "root",  "ε",   CORAL),
            ("his", "s",     "s",   CORAL),
        ]
        fail_arrows = []
        for src, dst, lbl, col in fail_links:
            arr = self._make_edge(layout[src], layout[dst], lbl, color=col, dashed=True)
            fail_arrows.append(arr)
            self.play(Create(arr), run_time=0.5)
        self.wait(1.2)
        self.play(FadeOut(fail_caption), FadeOut(ch3))

        # ════════════════════════════════════════════════════════════════════
        # Stage 4 – Text Scanning
        # ════════════════════════════════════════════════════════════════════
        ch4 = self.chapter_title("Step 3 — Scan Text with Automaton")

        scan_text = "ushers"
        scan_chars = VGroup(*[
            VGroup(
                Square(side_length=0.55, color=MIST, fill_color=MIST, fill_opacity=0.55,
                       stroke_color=COBALT, stroke_width=1.5),
                Text(c, font_size=22, color=INK),
            )
            for c in scan_text
        ]).arrange(RIGHT, buff=0.08).shift(DOWN * 3.0 + RIGHT * 2.5)
        idx_labels = VGroup(*[
            Text(str(i), font_size=14, color=GRAY).next_to(scan_chars[i], DOWN, buff=0.08)
            for i in range(len(scan_text))
        ])

        self.play(LaggedStart(*[FadeIn(sq) for sq in scan_chars], lag_ratio=0.07))
        self.play(FadeIn(idx_labels))
        self.wait(0.5)

        # Simulate scanning: highlight current node + current char
        scan_steps = [
            (0, "u", "root",  False, "No 'u' child from root → stay at root"),
            (1, "s", "s",     False, "Follow 's' from root → node 's'"),
            (2, "h", "sh",    False, "Follow 'h' from 's' → node 'sh'"),
            (3, "e", "she",   True,  "Follow 'e' from 'sh' → node 'she' ✓ MATCH: 'she' at [1..3]"),
            (4, "r", "her",   False, "Fail link from 'she'→'he', follow 'r' → node 'her'"),
            (5, "s", "hers",  True,  "Follow 's' from 'her' → node 'hers' ✓ MATCH: 'hers' at [2..5]"),
        ]

        cur_highlight = None
        for char_idx, char, node_key, is_match, desc in scan_steps:
            # Highlight current char
            sq = scan_chars[char_idx][0]
            self.play(sq.animate.set_fill(AMBER, opacity=0.7), run_time=0.3)

            # Highlight current trie node
            if cur_highlight:
                self.play(FadeOut(cur_highlight), run_time=0.2)
            node_ring = Circle(
                radius=0.42, color=AMBER if not is_match else SIGNAL,
                stroke_width=4, fill_opacity=0,
            ).move_to(layout[node_key])
            cur_highlight = node_ring
            self.play(Create(node_ring), run_time=0.3)

            # Show description
            desc_mob = Text(desc, font_size=19, color=SIGNAL if is_match else GRAY).shift(DOWN * 3.8 + LEFT * 0.5)
            self.play(FadeIn(desc_mob), run_time=0.3)
            self.wait(1.0)
            self.play(FadeOut(desc_mob), run_time=0.25)

            if is_match:
                self.play(sq.animate.set_fill(SIGNAL, opacity=0.7), run_time=0.2)

        if cur_highlight:
            self.play(FadeOut(cur_highlight))
        self.wait(0.8)
        self.play(FadeOut(ch4))

        # ════════════════════════════════════════════════════════════════════
        # Stage 5 – Output Links
        # ════════════════════════════════════════════════════════════════════
        ch5 = self.chapter_title("Output Links — Chained Pattern Matches")

        out_text = Text(
            "Output links chain to other pattern-ending nodes reachable via failure links.\n"
            "When 'she' is matched, its output link points to 'he' → both patterns fire.",
            font_size=22, color=INK, line_spacing=1.4,
        ).shift(UP * 0.2)
        self.play(FadeIn(out_text, shift=UP * 0.1))
        self.wait(2.0)

        # Highlight she → he output link
        out_arrow = self._make_edge(layout["she"], layout["he"], "out", color=PURPLE, dashed=True)
        self.play(Create(out_arrow), run_time=0.6)
        out_note = Text("'she' also contains 'he' at its suffix!", font_size=20, color=PURPLE).shift(DOWN * 2.5)
        self.play(FadeIn(out_note))
        self.wait(1.5)
        self.play(FadeOut(out_text), FadeOut(out_arrow), FadeOut(out_note), FadeOut(ch5))

        # ════════════════════════════════════════════════════════════════════
        # Stage 6 – Complexity Card
        # ════════════════════════════════════════════════════════════════════
        ch6 = self.chapter_title("Complexity Analysis")

        # Fade out trie visual
        all_trie = VGroup(
            *nodes.values(),
            *trie_edges.values(),
            *fail_arrows,
            scan_chars,
            idx_labels,
        )
        self.play(FadeOut(all_trie), run_time=0.6)

        legend = VGroup(
            Text("n = length of text", font_size=22, color=GRAY),
            Text("m = total length of all patterns", font_size=22, color=GRAY),
            Text("z = number of pattern occurrences", font_size=22, color=GRAY),
            Text("k = number of patterns", font_size=22, color=GRAY),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).shift(LEFT * 3.2)
        self.play(FadeIn(legend, shift=RIGHT * 0.2))
        self.wait(0.8)

        card = self.complexity_card(
            r"O(m)",
            r"O(n + m + z)",
            r"O(n + m + z)",
            r"O(m \cdot |\Sigma|)",
        )
        card.shift(RIGHT * 2.8)
        self.wait(1.5)

        insight = Text(
            "Key insight: failure links let us skip re-scanning characters,\n"
            "giving the same O(n) text scan cost regardless of pattern count.",
            font_size=21, color=INK, line_spacing=1.4,
        ).shift(DOWN * 2.6)
        self.play(FadeIn(insight))
        self.wait(2.0)
        self.play(FadeOut(legend), FadeOut(card), FadeOut(insight), FadeOut(ch6))
