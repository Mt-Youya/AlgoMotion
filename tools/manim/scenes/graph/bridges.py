from manim import *
from ...base import AlgoScene, GraphVis

# Color constants for bridge highlighting
BRIDGE_COLOR = "#E05A3A"   # Coral — marks a bridge edge
TREE_COLOR   = "#CEEB5A"   # Signal — DFS tree edges
BACK_COLOR   = "#8855CC"   # Purple — back edges
LOW_COLOR    = "#F0A030"   # Amber — low-link value label
DISC_COLOR   = "#2255CC"   # Cobalt — discovery time label


class Bridges(AlgoScene):
    TITLE = "Bridges"
    SUBTITLE = "Edges whose removal increases the number of connected components."
    CATEGORY = "graph"

    def build(self):
        # ── Stage 1: Introduction ──────────────────────────────────────────────
        self.chapter_title("Introduction")

        intro_group = VGroup(
            Text("Bridge in a Graph", font_size=38, color="#2255CC", weight="BOLD"),
            Text("An edge (u, v) is a bridge if removing it", font_size=26, color="#1A1C2C"),
            Text("disconnects the graph into more components.", font_size=26, color="#1A1C2C"),
            Text("Also called a cut-edge.", font_size=22, color="#888899"),
        ).arrange(DOWN, buff=0.35).move_to(ORIGIN)

        self.play(FadeIn(intro_group[0], shift=UP * 0.4), run_time=0.8)
        self.play(FadeIn(intro_group[1], shift=UP * 0.3), run_time=0.6)
        self.play(FadeIn(intro_group[2], shift=UP * 0.3), run_time=0.6)
        self.play(FadeIn(intro_group[3], shift=UP * 0.2), run_time=0.5)
        self.wait(2)
        self.play(FadeOut(intro_group))

        # ── Stage 2: Graph Setup ───────────────────────────────────────────────
        self.chapter_title("Graph Setup")

        vertices = [0, 1, 2, 3, 4, 5]
        edges = [(0, 1), (1, 2), (2, 0), (1, 3), (3, 4), (4, 5), (5, 3)]

        layout = {
            0: [-3.5,  1.2, 0],
            1: [-1.5,  0.0, 0],
            2: [-3.5, -1.2, 0],
            3: [ 0.8,  0.0, 0],
            4: [ 2.8,  1.2, 0],
            5: [ 2.8, -1.2, 0],
        }

        graph = Graph(
            vertices,
            edges,
            layout=layout,
            vertex_config={"radius": 0.38, "fill_color": "#2255CC", "stroke_color": "#1A1C2C", "stroke_width": 2.5},
            edge_config={"stroke_color": "#888899", "stroke_width": 3},
        )
        node_labels = VGroup(*[
            Text(str(v), font_size=22, color="#FFFFFF", weight="BOLD").move_to(graph.vertices[v].get_center())
            for v in vertices
        ])

        setup_note = Text(
            "6 nodes, 7 edges — contains both bridge and non-bridge edges.",
            font_size=22, color="#888899"
        ).to_edge(DOWN, buff=0.6)

        self.play(Create(graph), run_time=1.5)
        self.play(FadeIn(node_labels), run_time=0.5)
        self.play(FadeIn(setup_note), run_time=0.5)
        self.wait(2)
        self.play(FadeOut(setup_note))

        # ── Stage 3: Naive Approach — Try Removing Each Edge ──────────────────
        self.chapter_title("Naive Approach")

        naive_text = VGroup(
            Text("Brute Force:", font_size=28, color="#F0A030", weight="BOLD"),
            Text("Remove each edge one by one.", font_size=24, color="#1A1C2C"),
            Text("Run DFS/BFS to check connectivity.", font_size=24, color="#1A1C2C"),
            Text("Time: O(E × (V + E))  — too slow!", font_size=22, color="#E05A3A"),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.5)

        self.play(FadeIn(naive_text[0]), run_time=0.5)
        self.play(FadeIn(naive_text[1]), run_time=0.5)
        self.play(FadeIn(naive_text[2]), run_time=0.5)
        self.play(FadeIn(naive_text[3]), run_time=0.5)

        # Animate removing edge (1,3) and show it becomes a bridge
        bridge_edge_mob = graph.edges[(1, 3)]
        self.play(bridge_edge_mob.animate.set_stroke(BRIDGE_COLOR, width=6), run_time=0.6)
        self.wait(0.5)
        self.play(bridge_edge_mob.animate.set_stroke("#888899", width=3), run_time=0.4)
        self.wait(1.5)
        self.play(FadeOut(naive_text))

        # ── Stage 4: Tarjan's Algorithm — Discovery & Low-Link Values ─────────
        self.chapter_title("Tarjan's Bridge Algorithm")

        tarjan_intro = VGroup(
            Text("Tarjan's Algorithm (1974)", font_size=30, color="#2255CC", weight="BOLD"),
            Text("Uses DFS + discovery time + low-link values.", font_size=24, color="#1A1C2C"),
            Text("low[v] = min discovery time reachable from subtree of v.", font_size=22, color="#888899"),
            Text("Edge (u,v) is a bridge if  low[v] > disc[u]", font_size=24, color="#E05A3A"),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.4)

        for line in tarjan_intro:
            self.play(FadeIn(line, shift=RIGHT * 0.2), run_time=0.5)
        self.wait(2.5)
        self.play(FadeOut(tarjan_intro))

        # ── Stage 5: Step-by-Step DFS with disc[] and low[] ───────────────────
        self.chapter_title("DFS Traversal")

        # disc[v] and low[v] computed for the graph
        disc_vals = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5}
        low_vals  = {0: 0, 1: 0, 2: 0, 3: 3, 4: 3, 5: 3}

        # Labels that float above/below each node
        disc_labels = {}
        low_labels  = {}
        for v in vertices:
            pos = layout[v]
            np_pos = graph.vertices[v].get_center()
            d_lbl = Text(f"d:{disc_vals[v]}", font_size=17, color=DISC_COLOR)
            l_lbl = Text(f"l:{low_vals[v]}", font_size=17, color=LOW_COLOR)
            d_lbl.next_to(graph.vertices[v], UP, buff=0.12)
            l_lbl.next_to(graph.vertices[v], DOWN, buff=0.12)
            disc_labels[v] = d_lbl
            low_labels[v]  = l_lbl

        # DFS order: 0 -> 1 -> 2 (back to 0) -> backtrack -> 3 -> 4 -> 5 (back to 3)
        dfs_order = [0, 1, 2, 1, 3, 4, 5]
        dfs_edges_tree = [(0, 1), (1, 2), (1, 3), (3, 4), (4, 5)]
        back_edges     = [(2, 0), (5, 3)]

        status_box = Text("", font_size=20, color="#1A1C2C").to_edge(DOWN, buff=0.3)
        self.play(FadeIn(status_box))

        visited_nodes = set()
        for step_idx, node in enumerate(dfs_order):
            if node not in visited_nodes:
                visited_nodes.add(node)
                self.play(
                    graph.vertices[node].animate.set_fill(color="#CEEB5A", opacity=1),
                    run_time=0.5,
                )
                self.play(FadeIn(disc_labels[node]), FadeIn(low_labels[node]), run_time=0.4)

                new_status = Text(
                    f"Visit node {node} | disc={disc_vals[node]} | low={low_vals[node]}",
                    font_size=20, color="#1A1C2C"
                ).to_edge(DOWN, buff=0.3)
                self.play(Transform(status_box, new_status), run_time=0.3)
                self.wait(0.7)

        # Highlight tree edges
        for u, v in dfs_edges_tree:
            edge_key = (u, v) if (u, v) in graph.edges else (v, u)
            if edge_key in graph.edges:
                self.play(
                    graph.edges[edge_key].animate.set_stroke(TREE_COLOR, width=5),
                    run_time=0.4,
                )

        # Highlight back edges
        for u, v in back_edges:
            edge_key = (u, v) if (u, v) in graph.edges else (v, u)
            if edge_key in graph.edges:
                self.play(
                    graph.edges[edge_key].animate.set_stroke(BACK_COLOR, width=5),
                    run_time=0.4,
                )

        self.wait(1)
        self.play(FadeOut(status_box))

        # ── Stage 6: Identify Bridges ──────────────────────────────────────────
        self.chapter_title("Identifying Bridges")

        bridge_rule = Text(
            "Bridge condition: low[v] > disc[u]  for edge (u → v)",
            font_size=24, color="#E05A3A", weight="BOLD"
        ).to_edge(DOWN, buff=0.8)
        self.play(FadeIn(bridge_rule, shift=UP * 0.3))
        self.wait(0.8)

        # Check each tree edge
        check_data = [
            ((0, 1), 0, 1, False),   # low[1]=0, disc[0]=0 → 0 > 0? No
            ((1, 2), 1, 2, False),   # low[2]=0, disc[1]=1 → 0 > 1? No
            ((1, 3), 1, 3, True),    # low[3]=3, disc[1]=1 → 3 > 1? YES — bridge!
            ((3, 4), 3, 4, False),   # low[4]=3, disc[3]=3 → 3 > 3? No
            ((4, 5), 4, 5, False),   # low[5]=3, disc[4]=4 → 3 > 4? No
        ]

        for edge_tuple, u, v, is_bridge in check_data:
            edge_key = edge_tuple if edge_tuple in graph.edges else (edge_tuple[1], edge_tuple[0])
            check_text = Text(
                f"Edge ({u},{v}): low[{v}]={low_vals[v]} > disc[{u}]={disc_vals[u]}? {'YES → BRIDGE!' if is_bridge else 'No'}",
                font_size=21,
                color=BRIDGE_COLOR if is_bridge else "#888899",
            ).to_edge(DOWN, buff=0.35)
            self.play(
                graph.edges[edge_key].animate.set_stroke(
                    BRIDGE_COLOR if is_bridge else TREE_COLOR, width=7 if is_bridge else 4
                ),
                Transform(bridge_rule, check_text),
                run_time=0.7,
            )
            if is_bridge:
                bridge_label = Text("BRIDGE!", font_size=20, color=BRIDGE_COLOR, weight="BOLD")
                bridge_label.next_to(graph.edges[edge_key].get_center(), UP, buff=0.25)
                self.play(FadeIn(bridge_label, scale=1.3), run_time=0.5)
                self.wait(1)
                self.play(FadeOut(bridge_label))
            else:
                self.wait(0.5)

        self.play(FadeOut(bridge_rule))
        self.wait(1)

        # ── Stage 7: Result Highlight ──────────────────────────────────────────
        self.chapter_title("Result")

        result_note = VGroup(
            Text("Bridge found: edge (1, 3)", font_size=28, color=BRIDGE_COLOR, weight="BOLD"),
            Text("Removing it splits the graph into two components:", font_size=22, color="#1A1C2C"),
            Text("{0, 1, 2}  and  {3, 4, 5}", font_size=24, color="#2255CC"),
        ).arrange(DOWN, buff=0.3).to_edge(DOWN, buff=0.5)

        self.play(FadeIn(result_note), run_time=0.8)
        # Flash the bridge edge
        for _ in range(3):
            self.play(
                graph.edges[(1, 3)].animate.set_stroke("#FFFFFF", width=8),
                run_time=0.25,
            )
            self.play(
                graph.edges[(1, 3)].animate.set_stroke(BRIDGE_COLOR, width=7),
                run_time=0.25,
            )
        self.wait(2)
        self.play(FadeOut(result_note), FadeOut(graph), FadeOut(node_labels))
        for lbl in list(disc_labels.values()) + list(low_labels.values()):
            self.play(FadeOut(lbl), run_time=0.05)
        self.wait(0.5)

        # ── Stage 8: Pseudocode ────────────────────────────────────────────────
        self.chapter_title("Pseudocode")

        pseudo_lines = [
            ("def dfs(u, parent):", "#F0A030"),
            ("    disc[u] = low[u] = timer++", "#1A1C2C"),
            ("    for v in adj[u]:", "#1A1C2C"),
            ("        if v == parent: continue", "#888899"),
            ("        if v not visited:", "#1A1C2C"),
            ("            dfs(v, u)", "#2255CC"),
            ("            low[u] = min(low[u], low[v])", "#2255CC"),
            ("            if low[v] > disc[u]:", "#E05A3A"),
            ("                bridges.append((u, v))  # bridge!", "#E05A3A"),
            ("        else:  # back edge", "#888899"),
            ("            low[u] = min(low[u], disc[v])", "#8855CC"),
        ]

        pseudo_group = VGroup(*[
            Text(line, font_size=20, color=color, font="Monospace")
            for line, color in pseudo_lines
        ]).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(ORIGIN)

        for mob in pseudo_group:
            self.play(FadeIn(mob, shift=RIGHT * 0.2), run_time=0.3)
        self.wait(3)
        self.play(FadeOut(pseudo_group))

        # ── Stage 9: Complexity Card ───────────────────────────────────────────
        self.complexity_card(
            time_complexity="O(V + E)",
            space_complexity="O(V)",
        )
        self.wait(2)
