from manim import *
from ...base import AlgoScene, GraphVis
from ...base.algo_scene import (
    C_DEFAULT, C_ACTIVE, C_SORTED, C_VISITED,
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, PAPER,
)

import numpy as np


class Kruskal(AlgoScene):
    TITLE = "Kruskal's Algorithm"
    SUBTITLE = "Minimum spanning tree by greedily adding smallest weight edges."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Problem Setup ───────────────────────────────────────────
        ch1 = self.chapter_title("Problem Setup")

        intro_lines = VGroup(
            Text("Given a connected, undirected, weighted graph,", font_size=28, color=INK),
            Text("find a spanning tree with the minimum total edge weight.", font_size=28, color=INK),
            Text("Kruskal's algorithm greedily picks the cheapest safe edge.", font_size=28, color=INK),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2.5)
        self.play(FadeOut(intro_lines), FadeOut(ch1))
        self.wait(0.2)

        # ── Stage 2: Build the graph ─────────────────────────────────────────
        ch2 = self.chapter_title("Graph Construction")

        # 6 nodes: A-F
        nodes = ["A", "B", "C", "D", "E", "F"]
        layout = {
            "A": np.array([-3.5,  1.0, 0]),
            "B": np.array([-1.2,  2.0, 0]),
            "C": np.array([ 1.2,  2.0, 0]),
            "D": np.array([ 3.5,  1.0, 0]),
            "E": np.array([-1.2, -1.0, 0]),
            "F": np.array([ 1.2, -1.0, 0]),
        }

        # (from, to, weight)
        all_edges = [
            ("A", "B", 4),
            ("A", "E", 2),
            ("B", "C", 6),
            ("B", "E", 5),
            ("C", "D", 3),
            ("C", "F", 7),
            ("D", "F", 8),
            ("E", "F", 1),
            ("B", "F", 9),
        ]

        node_radius = 0.36

        # Draw nodes
        node_mobs = {}
        node_labels = {}
        for n in nodes:
            pos = layout[n]
            circle = Circle(radius=node_radius, color=INK,
                            fill_color=C_DEFAULT, fill_opacity=1, stroke_width=2.5)
            circle.move_to(pos)
            lbl = Text(n, font_size=22, color=INK, weight="BOLD").move_to(pos)
            node_mobs[n] = circle
            node_labels[n] = lbl

        # Draw edges
        edge_mobs = {}
        edge_weight_labels = {}
        edge_group = VGroup()
        weight_group = VGroup()

        for (u, v, w) in all_edges:
            p1, p2 = layout[u], layout[v]
            line = Line(p1, p2, color=INK, stroke_width=2.5)
            edge_mobs[(u, v)] = line
            edge_mobs[(v, u)] = line
            edge_group.add(line)

            mid = (p1 + p2) / 2
            perp = np.array([-(p2 - p1)[1], (p2 - p1)[0], 0])
            norm = np.linalg.norm(perp)
            if norm > 0:
                perp = perp / norm * 0.28
            w_lbl = Text(str(w), font_size=18, color=COBALT).move_to(mid + perp)
            edge_weight_labels[(u, v)] = w_lbl
            weight_group.add(w_lbl)

        node_group = VGroup(*node_mobs.values())
        label_group = VGroup(*node_labels.values())

        self.play(Create(edge_group, run_time=1.0))
        self.play(Create(node_group, run_time=0.8), FadeIn(label_group, run_time=0.5))
        self.play(FadeIn(weight_group, run_time=0.5))
        self.wait(1.5)
        self.play(FadeOut(ch2))

        # ── Stage 3: Sort Edges ──────────────────────────────────────────────
        ch3 = self.chapter_title("Sort Edges by Weight")

        sorted_edges = sorted(all_edges, key=lambda e: e[2])

        # Show sorted edge list on the right
        edge_list_title = Text("Edges (sorted):", font_size=22, color=INK, weight="BOLD")
        edge_list_items = VGroup()
        for (u, v, w) in sorted_edges:
            row = Text(f"({u}–{v})  w={w}", font_size=19, color=INK)
            edge_list_items.add(row)
        edge_list_items.arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        edge_list_group = VGroup(edge_list_title, edge_list_items).arrange(DOWN, buff=0.2)
        edge_list_group.to_edge(RIGHT, buff=0.35).shift(DOWN * 0.3)

        self.play(FadeIn(edge_list_group, run_time=0.6))
        self.wait(2)
        self.play(FadeOut(ch3))

        # ── Stage 4: Union-Find Init ─────────────────────────────────────────
        ch4 = self.chapter_title("Union-Find Initialization")

        uf_title = Text("Union-Find (parent):", font_size=22, color=INK, weight="BOLD")
        uf_items = VGroup()
        parent_display = {}
        for n in nodes:
            cell = Text(f"{n}→{n}", font_size=19, color=COBALT)
            uf_items.add(cell)
            parent_display[n] = cell
        uf_items.arrange(RIGHT, buff=0.3)
        uf_group = VGroup(uf_title, uf_items).arrange(DOWN, buff=0.2)
        uf_group.to_edge(DOWN, buff=0.45)

        self.play(FadeIn(uf_group, run_time=0.6))
        self.wait(1.5)
        self.play(FadeOut(ch4))

        # ── Stage 5: Step-by-Step Kruskal ───────────────────────────────────
        ch5 = self.chapter_title("Kruskal Steps")

        # Union-Find logic
        parent = {n: n for n in nodes}
        rank = {n: 0 for n in nodes}

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(x, y):
            rx, ry = find(x), find(y)
            if rx == ry:
                return False
            if rank[rx] < rank[ry]:
                rx, ry = ry, rx
            parent[ry] = rx
            if rank[rx] == rank[ry]:
                rank[rx] += 1
            return True

        mst_edges = []
        mst_weight = 0
        step_label = None

        for idx, (u, v, w) in enumerate(sorted_edges):
            # Highlight candidate edge in edge list
            item_mob = edge_list_items[idx]
            self.play(item_mob.animate.set_color(CORAL), run_time=0.3)

            # Highlight the edge on the graph
            line = edge_mobs.get((u, v))
            if line:
                self.play(line.animate.set_color(CORAL).set_stroke(width=5), run_time=0.35)

            if step_label:
                self.play(FadeOut(step_label), run_time=0.2)

            ru, rv = find(u), find(v)
            if ru == rv:
                # Cycle — skip
                action_text = Text(f"Skip ({u}–{v}): would form a cycle!", font_size=22, color=CORAL)
                action_text.to_edge(UP, buff=0.5).shift(RIGHT * 0.5)
                step_label = action_text
                self.play(FadeIn(action_text, run_time=0.4))
                if line:
                    self.play(line.animate.set_color(GRAY).set_stroke(width=2), run_time=0.3)
                self.wait(0.8)
            else:
                # Accept — add to MST
                union(u, v)
                mst_edges.append((u, v, w))
                mst_weight += w

                action_text = Text(f"Add ({u}–{v}) w={w}  MST weight={mst_weight}", font_size=22, color=SIGNAL)
                action_text.to_edge(UP, buff=0.5).shift(RIGHT * 0.5)
                step_label = action_text
                self.play(FadeIn(action_text, run_time=0.4))

                # Color MST edge green
                if line:
                    self.play(line.animate.set_color(SIGNAL).set_stroke(width=6), run_time=0.4)

                # Color both endpoint nodes
                for endpoint in [u, v]:
                    mob = node_mobs[endpoint]
                    self.play(mob.animate.set_fill(color=SIGNAL), run_time=0.3)

                # Update union-find display
                new_uf_items = VGroup()
                for n in nodes:
                    r = find(n)
                    cell = Text(f"{n}→{r}", font_size=19, color=COBALT if r == n else CORAL)
                    new_uf_items.add(cell)
                new_uf_items.arrange(RIGHT, buff=0.3).move_to(uf_items.get_center())
                self.play(Transform(uf_items, new_uf_items), run_time=0.4)

                self.wait(0.8)

            item_mob.set_color(GRAY)

            if len(mst_edges) == len(nodes) - 1:
                break

        self.wait(0.5)
        if step_label:
            self.play(FadeOut(step_label))
        self.play(FadeOut(ch5))

        # ── Stage 6: MST Result ──────────────────────────────────────────────
        ch6 = self.chapter_title("Minimum Spanning Tree Found")

        result_text = VGroup(
            Text(f"MST Total Weight: {mst_weight}", font_size=30, color=INK, weight="BOLD"),
            Text(f"Edges: {', '.join(f'{u}–{v}' for u, v, _ in mst_edges)}", font_size=24, color=COBALT),
        ).arrange(DOWN, buff=0.25).to_edge(DOWN, buff=0.55)

        self.play(FadeIn(result_text, run_time=0.7))
        self.wait(2.5)

        # Fade everything out before complexity card
        self.play(
            FadeOut(edge_group),
            FadeOut(node_group),
            FadeOut(label_group),
            FadeOut(weight_group),
            FadeOut(edge_list_group),
            FadeOut(uf_group),
            FadeOut(result_text),
            FadeOut(ch6),
            run_time=0.8,
        )
        self.wait(0.2)

        # ── Stage 7: Complexity Card ─────────────────────────────────────────
        self.chapter_title("Complexity Analysis")

        self.complexity_card(
            time_best=r"O(E \log E)",
            time_avg=r"O(E \log E)",
            time_worst=r"O(E \log E)",
            space=r"O(V + E)",
        )
        self.wait(2.5)
