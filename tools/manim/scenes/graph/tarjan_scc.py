from manim import *
from ...base import AlgoScene, GraphVis
from ...base.algo_scene import (
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, C_DEFAULT, C_ACTIVE, C_SORTED, C_VISITED
)


SCC_COLORS = ["#E05A3A", "#2255CC", "#8855CC", "#CEEB5A", "#F0A030"]


class TarjanScc(AlgoScene):
    TITLE = "Tarjan's SCC"
    SUBTITLE = "All strongly connected components in one DFS using low-link values."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Intro — What is an SCC? ──────────────────────────────────
        chapter_lbl = self.chapter_title("What is a Strongly Connected Component?")

        intro_lines = VGroup(
            Text("A Strongly Connected Component (SCC) is a", font_size=28, color=INK),
            Text("maximal set of vertices where every vertex is", font_size=28, color=INK),
            Text("reachable from every other vertex in the set.", font_size=28, color=INK),
        ).arrange(DOWN, buff=0.28).move_to(ORIGIN)

        self.play(FadeIn(intro_lines, shift=UP * 0.3))
        self.wait(2)

        key_insight = VGroup(
            Text("Tarjan's algorithm finds ALL SCCs in a single", font_size=26, color=COBALT),
            Text("DFS pass using a stack and 'low-link' values.", font_size=26, color=COBALT),
        ).arrange(DOWN, buff=0.22).next_to(intro_lines, DOWN, buff=0.5)

        self.play(FadeIn(key_insight, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(intro_lines), FadeOut(key_insight), FadeOut(chapter_lbl))

        # ── Stage 2: Build the example graph ──────────────────────────────────
        chapter_lbl2 = self.chapter_title("Example Directed Graph")

        # 8-node graph with 3 clear SCCs
        # SCC1: {0, 1, 2}, SCC2: {3, 4}, SCC3: {5, 6, 7}
        nodes = [0, 1, 2, 3, 4, 5, 6, 7]
        layout = {
            0: np.array([-4.0,  1.5, 0]),
            1: np.array([-2.5,  0.0, 0]),
            2: np.array([-4.0, -1.5, 0]),
            3: np.array([-0.5,  1.5, 0]),
            4: np.array([-0.5, -1.0, 0]),
            5: np.array([ 2.0,  1.5, 0]),
            6: np.array([ 3.5,  0.0, 0]),
            7: np.array([ 2.0, -1.5, 0]),
        }
        edges = [
            (0, 1), (1, 2), (2, 0),   # SCC1 cycle
            (1, 3),                    # bridge 1->3
            (3, 4), (4, 3),            # SCC2 cycle
            (4, 5),                    # bridge 4->5
            (5, 6), (6, 7), (7, 5),   # SCC3 cycle
        ]

        graph = GraphVis(
            self,
            nodes=nodes,
            edges=edges,
            directed=True,
            layout=layout,
            node_radius=0.38,
        )
        self.wait(1.5)

        caption1 = Text(
            "3 SCCs: {0,1,2}, {3,4}, {5,6,7}  —  connected by bridge edges",
            font_size=22, color=GRAY,
        ).to_edge(DOWN, buff=0.4)
        self.play(Write(caption1))
        self.wait(2)
        self.play(FadeOut(caption1), FadeOut(chapter_lbl2))

        # ── Stage 3: Explain disc / low arrays ────────────────────────────────
        chapter_lbl3 = self.chapter_title("Discovery Time & Low-Link Values")

        disc_title = Text("disc[v]", font_size=26, color=COBALT, weight="BOLD")
        disc_desc = Text("DFS visit order (timestamp)", font_size=22, color=INK)
        disc_row = VGroup(disc_title, disc_desc).arrange(RIGHT, buff=0.4)

        low_title = Text("low[v]", font_size=26, color=CORAL, weight="BOLD")
        low_desc = Text("lowest disc reachable from v's subtree", font_size=22, color=INK)
        low_row = VGroup(low_title, low_desc).arrange(RIGHT, buff=0.4)

        stack_title = Text("stack", font_size=26, color=SIGNAL, weight="BOLD")
        stack_desc = Text("holds nodes in current DFS path", font_size=22, color=INK)
        stack_row = VGroup(stack_title, stack_desc).arrange(RIGHT, buff=0.4)

        rule = Text(
            "SCC root condition: low[v] == disc[v]",
            font_size=24, color=CORAL, weight="BOLD",
        )

        legend = VGroup(disc_row, low_row, stack_row, rule).arrange(DOWN, buff=0.32, aligned_edge=LEFT)
        legend.move_to(ORIGIN)

        self.play(FadeIn(disc_row, shift=RIGHT * 0.2))
        self.wait(0.8)
        self.play(FadeIn(low_row, shift=RIGHT * 0.2))
        self.wait(0.8)
        self.play(FadeIn(stack_row, shift=RIGHT * 0.2))
        self.wait(0.8)
        self.play(FadeIn(rule, shift=UP * 0.2))
        self.wait(2)
        self.play(FadeOut(legend), FadeOut(chapter_lbl3))

        # ── Stage 4: Animate DFS with disc/low labels ─────────────────────────
        chapter_lbl4 = self.chapter_title("DFS Walk: Assigning disc & low")

        # Show disc/low labels above/below each node
        timer = [0]
        disc_vals = {}
        low_vals = {}
        on_stack = {}
        disc_labels = {}
        low_labels = {}
        stack_indicator = {}

        def make_disc_label(node, d):
            lbl = Text(f"d:{d}", font_size=16, color=COBALT)
            lbl.next_to(graph._node_mobs[node], UP, buff=0.1)
            return lbl

        def make_low_label(node, l):
            lbl = Text(f"l:{l}", font_size=16, color=CORAL)
            lbl.next_to(graph._node_mobs[node], DOWN, buff=0.1)
            return lbl

        # Simulate Tarjan step-by-step on nodes 0..7
        adj = {n: [] for n in nodes}
        for u, v in edges:
            adj[u].append(v)

        scc_result = []
        visited = set()
        stack_nodes = []
        on_stack_set = set()

        def tarjan_step(v):
            disc_vals[v] = timer[0]
            low_vals[v] = timer[0]
            timer[0] += 1
            stack_nodes.append(v)
            on_stack_set.add(v)

            # Animate: highlight node, show disc label
            graph.highlight_node(v, C_ACTIVE, run_time=0.35)
            dl = make_disc_label(v, disc_vals[v])
            ll = make_low_label(v, low_vals[v])
            disc_labels[v] = dl
            low_labels[v] = ll
            self.play(FadeIn(dl), FadeIn(ll), run_time=0.3)
            self.wait(0.25)

            for w in adj[v]:
                if w not in disc_vals:
                    graph.explore_edge(v, w)
                    tarjan_step(w)
                    # Update low[v] = min(low[v], low[w])
                    if low_vals[w] < low_vals[v]:
                        low_vals[v] = low_vals[w]
                        new_ll = make_low_label(v, low_vals[v])
                        self.play(Transform(low_labels[v], new_ll), run_time=0.25)
                elif w in on_stack_set:
                    # Back edge
                    graph.highlight_edge(v, w, C_VISITED, run_time=0.3)
                    if disc_vals[w] < low_vals[v]:
                        low_vals[v] = disc_vals[w]
                        new_ll = make_low_label(v, low_vals[v])
                        self.play(Transform(low_labels[v], new_ll), run_time=0.25)

            # Check if v is SCC root
            if low_vals[v] == disc_vals[v]:
                scc = []
                while stack_nodes and stack_nodes[-1] != v:
                    w = stack_nodes.pop()
                    on_stack_set.discard(w)
                    scc.append(w)
                if stack_nodes:
                    w = stack_nodes.pop()
                    on_stack_set.discard(w)
                    scc.append(w)
                scc_result.append(scc)

        for start in nodes:
            if start not in disc_vals:
                tarjan_step(start)

        self.wait(1.5)
        self.play(FadeOut(chapter_lbl4))

        # ── Stage 5: Color each SCC ───────────────────────────────────────────
        chapter_lbl5 = self.chapter_title("Identified SCCs — Color Coded")

        scc_label_mobs = VGroup()
        for idx, scc in enumerate(scc_result):
            color = SCC_COLORS[idx % len(SCC_COLORS)]
            for node in scc:
                graph._node_mobs[node].set_fill(color=color, opacity=0.85)
            scc_text = Text(
                f"SCC {idx + 1}: {{{', '.join(str(n) for n in sorted(scc))}}}",
                font_size=22,
                color=color,
            )
            scc_label_mobs.add(scc_text)

        scc_label_mobs.arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        scc_label_mobs.to_edge(DOWN, buff=0.5)

        self.play(
            *[graph._node_mobs[n].animate.set_fill(
                color=SCC_COLORS[i % len(SCC_COLORS)], opacity=0.85
            )
              for i, scc in enumerate(scc_result)
              for n in scc],
            run_time=0.8,
        )
        self.play(FadeIn(scc_label_mobs))
        self.wait(2.5)
        self.play(FadeOut(scc_label_mobs), FadeOut(chapter_lbl5))

        # ── Stage 6: Stack trace walkthrough ─────────────────────────────────
        chapter_lbl6 = self.chapter_title("Stack Trace: Pop When Root Found")

        trace_lines = VGroup(
            Text("When low[v] == disc[v], v is an SCC root.", font_size=24, color=INK),
            Text("Pop all nodes from the stack down to v —", font_size=24, color=INK),
            Text("those nodes form one complete SCC.", font_size=24, color=INK),
        ).arrange(DOWN, buff=0.28).to_edge(RIGHT, buff=0.8)

        stack_box_title = Text("DFS Stack", font_size=22, color=SIGNAL, weight="BOLD")
        stack_box_title.to_edge(LEFT, buff=1.0).shift(UP * 1.5)

        example_stack = VGroup(
            Text("[ 0, 1, 2 ]", font_size=22, color=SIGNAL),
            Text("low[2] == disc[2]  →  pop {0,1,2}", font_size=20, color=CORAL),
        ).arrange(DOWN, buff=0.3).next_to(stack_box_title, DOWN, buff=0.3)

        self.play(FadeIn(trace_lines, shift=LEFT * 0.2))
        self.play(FadeIn(stack_box_title), FadeIn(example_stack))
        self.wait(2.5)
        self.play(FadeOut(trace_lines), FadeOut(stack_box_title), FadeOut(example_stack))
        self.play(FadeOut(chapter_lbl6))

        # Clean up disc/low labels
        all_dl = VGroup(*disc_labels.values(), *low_labels.values())
        self.play(FadeOut(all_dl), run_time=0.5)

        # ── Stage 7: Complexity card ──────────────────────────────────────────
        self.chapter_title("Time & Space Complexity")
        self.wait(0.5)

        self.complexity_card(
            time_best="O(V + E)",
            time_avg="O(V + E)",
            time_worst="O(V + E)",
            space="O(V)",
        )
        self.wait(2.5)
