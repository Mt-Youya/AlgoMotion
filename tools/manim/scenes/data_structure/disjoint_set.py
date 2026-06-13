from manim import *
from ...base import AlgoScene

# Palette shortcuts
COBALT = "#2255CC"
SIGNAL = "#CEEB5A"
CORAL  = "#E05A3A"
MIST   = "#DDE4F0"
INK    = "#1A1C2C"
GRAY   = "#888899"
PAPER  = "#F5F0E8"


class DisjointSet(AlgoScene):
    TITLE    = "Disjoint Set (Union-Find)"
    SUBTITLE = "Tracks disjoint subsets with near-O(1) union and find via path compression."
    CATEGORY = "data-structure"

    # ── helpers ──────────────────────────────────────────────────────────────

    def _make_node(self, label: str, color: str = COBALT, radius: float = 0.38):
        circle = Circle(radius=radius, color=color, stroke_width=3)
        circle.set_fill(color, opacity=0.25)
        text = Text(str(label), font_size=22, color=WHITE).move_to(circle)
        return VGroup(circle, text)

    def _make_parent_table(self, parent: list[int], positions):
        """Render a parent[] array as a two-row table at given positions."""
        cells = VGroup()
        for i, (p, pos) in enumerate(zip(parent, positions)):
            box = Rectangle(width=0.65, height=0.55, color=COBALT, stroke_width=2)
            box.set_fill(MIST, opacity=0.6)
            idx_lbl = Text(str(i), font_size=16, color=GRAY).move_to(box).shift(UP * 0.28)
            val_lbl = Text(str(p), font_size=18, color=INK).move_to(box).shift(DOWN * 0.1)
            cells.add(VGroup(box, idx_lbl, val_lbl).move_to(pos))
        return cells

    # ── build ─────────────────────────────────────────────────────────────────

    def build(self):
        # ── Stage 1: Introduction ────────────────────────────────────────────
        title_grp = self.chapter_title("What is a Disjoint Set?")

        intro = VGroup(
            Text("A Disjoint Set (Union-Find) manages a collection", font_size=26),
            Text("of non-overlapping (disjoint) subsets.", font_size=26),
            Text("", font_size=10),
            Text("Two core operations:", font_size=24, color=YELLOW),
            Text("  find(x)   — which subset does x belong to?", font_size=22, color=SIGNAL),
            Text("  union(x,y) — merge the subsets of x and y",  font_size=22, color=CORAL),
            Text("", font_size=10),
            Text("With path compression + union by rank:", font_size=22),
            Text("  both ops run in near-O(1) amortised time", font_size=22, color=SIGNAL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(ORIGIN)

        self.play(FadeIn(intro, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro), FadeOut(title_grp))
        self.wait(0.3)

        # ── Stage 2: Initial structure — 6 isolated nodes ────────────────────
        title_grp2 = self.chapter_title("Initial State — 6 Isolated Sets")

        n = 6
        node_colors = [COBALT, CORAL, SIGNAL, "#8855CC", "#E0A030", "#3ABFB0"]
        positions = [
            LEFT * 4.0 + UP * 1.2,
            LEFT * 2.4 + UP * 1.2,
            LEFT * 0.8 + UP * 1.2,
            RIGHT * 0.8 + UP * 1.2,
            RIGHT * 2.4 + UP * 1.2,
            RIGHT * 4.0 + UP * 1.2,
        ]

        nodes = [self._make_node(i, color=node_colors[i]).move_to(positions[i]) for i in range(n)]
        node_grp = VGroup(*nodes)

        # parent[] labels below nodes
        parent = list(range(n))  # each node is its own root
        rank   = [0] * n

        parent_label_title = Text("parent[ ]", font_size=20, color=GRAY).shift(DOWN * 0.8 + LEFT * 5.2)
        parent_cells = VGroup()
        for i in range(n):
            box = Rectangle(width=0.65, height=0.55, color=COBALT, stroke_width=2)
            box.set_fill(MIST, opacity=0.6)
            idx_t = Text(str(i), font_size=14, color=GRAY).move_to(box).shift(UP * 0.28)
            val_t = Text(str(parent[i]), font_size=18, color=INK).move_to(box).shift(DOWN * 0.1)
            cell = VGroup(box, idx_t, val_t)
            cell.move_to(positions[i] + DOWN * 2.2)
            parent_cells.add(cell)

        rank_label_title = Text("rank[ ]", font_size=20, color=GRAY).shift(DOWN * 1.6 + LEFT * 5.2)

        self.play(LaggedStart(*[FadeIn(nd, shift=DOWN * 0.2) for nd in nodes], lag_ratio=0.12))
        self.play(FadeIn(parent_label_title), FadeIn(parent_cells))
        self.wait(1.5)

        caption1 = Text("Each element is its own root: parent[i] = i", font_size=22, color=GRAY)
        caption1.to_edge(DOWN, buff=0.4)
        self.play(Write(caption1))
        self.wait(2.0)
        self.play(FadeOut(caption1), FadeOut(title_grp2))
        self.wait(0.3)

        # ── Stage 3: union(0, 1) ─────────────────────────────────────────────
        title_grp3 = self.chapter_title("union(0, 1) — Merge Two Sets")

        op_text = Text("union(0, 1)", font_size=26, color=CORAL)
        op_text.to_corner(UP + RIGHT, buff=0.5)
        self.play(Write(op_text))

        # Highlight nodes 0 and 1
        h0 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[0])
        h1 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[1])
        self.play(Create(h0), Create(h1))
        self.wait(0.6)

        # Draw edge between 0 and 1 (1 becomes child of 0)
        edge01 = Line(nodes[1].get_center(), nodes[0].get_center(), color=YELLOW, stroke_width=3)
        edge01.set_z_index(-1)
        self.play(Create(edge01))

        # Update parent[1] = 0
        parent[1] = 0
        new_val1 = Text("0", font_size=18, color=CORAL)
        new_val1.move_to(parent_cells[1][2])
        self.play(Transform(parent_cells[1][2], new_val1))
        self.wait(0.5)

        self.play(FadeOut(h0), FadeOut(h1))

        step_note = Text("Node 1's root is now 0  →  parent[1] = 0", font_size=22, color=GRAY)
        step_note.to_edge(DOWN, buff=0.4)
        self.play(Write(step_note))
        self.wait(2.0)
        self.play(FadeOut(step_note), FadeOut(op_text), FadeOut(title_grp3))
        self.wait(0.3)

        # ── Stage 4: union(2, 3) and union(4, 5) ────────────────────────────
        title_grp4 = self.chapter_title("union(2,3)  and  union(4,5)")

        op_text2 = Text("union(2, 3)  |  union(4, 5)", font_size=24, color=CORAL)
        op_text2.to_corner(UP + RIGHT, buff=0.5)
        self.play(Write(op_text2))

        # union(2,3): parent[3] = 2
        h2 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[2])
        h3 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[3])
        self.play(Create(h2), Create(h3))
        edge23 = Line(nodes[3].get_center(), nodes[2].get_center(), color=YELLOW, stroke_width=3)
        edge23.set_z_index(-1)
        self.play(Create(edge23))
        parent[3] = 2
        new_val3 = Text("2", font_size=18, color=CORAL)
        new_val3.move_to(parent_cells[3][2])
        self.play(Transform(parent_cells[3][2], new_val3))
        self.play(FadeOut(h2), FadeOut(h3))
        self.wait(0.4)

        # union(4,5): parent[5] = 4
        h4 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[4])
        h5 = Circle(radius=0.44, color=YELLOW, stroke_width=4).move_to(nodes[5])
        self.play(Create(h4), Create(h5))
        edge45 = Line(nodes[5].get_center(), nodes[4].get_center(), color=YELLOW, stroke_width=3)
        edge45.set_z_index(-1)
        self.play(Create(edge45))
        parent[5] = 4
        new_val5 = Text("4", font_size=18, color=CORAL)
        new_val5.move_to(parent_cells[5][2])
        self.play(Transform(parent_cells[5][2], new_val5))
        self.play(FadeOut(h4), FadeOut(h5))
        self.wait(0.5)

        step_note2 = Text("Three pairs merged → three components: {0,1}, {2,3}, {4,5}", font_size=20, color=GRAY)
        step_note2.to_edge(DOWN, buff=0.4)
        self.play(Write(step_note2))
        self.wait(2.0)
        self.play(FadeOut(step_note2), FadeOut(op_text2), FadeOut(title_grp4))
        self.wait(0.3)

        # ── Stage 5: union(0, 2) — merging two components ────────────────────
        title_grp5 = self.chapter_title("union(0, 2) — Merging Components")

        op_text3 = Text("union(0, 2)", font_size=26, color=SIGNAL)
        op_text3.to_corner(UP + RIGHT, buff=0.5)
        self.play(Write(op_text3))

        # find(0)=0, find(2)=2 → link root 2 under root 0
        h0b = Circle(radius=0.44, color=SIGNAL, stroke_width=4).move_to(nodes[0])
        h2b = Circle(radius=0.44, color=SIGNAL, stroke_width=4).move_to(nodes[2])
        self.play(Create(h0b), Create(h2b))

        edge02 = CurvedArrow(
            nodes[2].get_top(),
            nodes[0].get_top(),
            angle=-TAU / 6,
            color=SIGNAL,
            stroke_width=3,
        )
        self.play(Create(edge02))

        parent[2] = 0
        new_val2 = Text("0", font_size=18, color=SIGNAL)
        new_val2.move_to(parent_cells[2][2])
        self.play(Transform(parent_cells[2][2], new_val2))
        self.play(FadeOut(h0b), FadeOut(h2b))
        self.wait(0.5)

        step_note3 = Text("find(0)=0, find(2)=2  →  parent[2]=0  →  {0,1,2,3} now one set", font_size=19, color=GRAY)
        step_note3.to_edge(DOWN, buff=0.4)
        self.play(Write(step_note3))
        self.wait(2.0)
        self.play(FadeOut(step_note3), FadeOut(op_text3), FadeOut(title_grp5))
        self.wait(0.3)

        # ── Stage 6: Path Compression demo ───────────────────────────────────
        self.play(
            FadeOut(node_grp), FadeOut(parent_cells), FadeOut(parent_label_title),
            FadeOut(edge01), FadeOut(edge23), FadeOut(edge45), FadeOut(edge02),
        )
        self.wait(0.3)

        title_grp6 = self.chapter_title("Path Compression — find() Optimisation")

        # Draw a deep chain: 3 → 2 → 1 → 0 (root)
        chain_positions = [
            LEFT * 3.5 + UP * 0.5,
            LEFT * 1.5 + UP * 0.5,
            RIGHT * 0.5 + UP * 0.5,
            RIGHT * 2.5 + UP * 0.5,
        ]
        chain_labels = ["0\n(root)", "1", "2", "3"]
        chain_colors = [COBALT, "#8855CC", CORAL, SIGNAL]
        chain_nodes = VGroup(*[
            self._make_node(chain_labels[i], color=chain_colors[i]).move_to(chain_positions[i])
            for i in range(4)
        ])
        chain_arrows = VGroup(*[
            Arrow(chain_positions[i + 1], chain_positions[i], buff=0.45, color=GRAY, stroke_width=2)
            for i in range(3)
        ])

        self.play(FadeIn(chain_nodes), Create(chain_arrows))
        self.wait(0.8)

        before_lbl = Text("Before find(3): chain depth = 3", font_size=22, color=GRAY)
        before_lbl.to_edge(DOWN, buff=0.8)
        self.play(Write(before_lbl))
        self.wait(1.0)

        # Animate path compression: 3 and 2 both point directly to root 0
        compress_arrow_3 = Arrow(chain_positions[3], chain_positions[0], buff=0.45, color=SIGNAL, stroke_width=3)
        compress_arrow_2 = Arrow(chain_positions[2], chain_positions[0], buff=0.45, color=CORAL, stroke_width=3)

        self.play(FadeOut(chain_arrows))
        self.play(Create(compress_arrow_3), Create(compress_arrow_2))
        self.wait(0.5)

        after_lbl = Text("After find(3): nodes 2 and 3 point directly to root 0", font_size=22, color=SIGNAL)
        after_lbl.to_edge(DOWN, buff=0.4)
        self.play(Transform(before_lbl, after_lbl))
        self.wait(2.0)

        self.play(
            FadeOut(chain_nodes), FadeOut(compress_arrow_3),
            FadeOut(compress_arrow_2), FadeOut(before_lbl), FadeOut(title_grp6),
        )
        self.wait(0.3)

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        self.chapter_title("Time & Space Complexity")

        self.complexity_card(
            time_best="O(1)",
            time_avg=r"O(\alpha(n))",
            time_worst=r"O(\alpha(n))",
            space="O(n)",
        )
        self.wait(2.5)
