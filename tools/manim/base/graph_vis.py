"""GraphVis — animated directed / undirected graph for AlgoMotion scenes."""
from __future__ import annotations

import math
from typing import TYPE_CHECKING

from manim import (
    Arrow,
    Circle,
    Create,
    FadeIn,
    FadeOut,
    Line,
    Text,
    VGroup,
    AnimationGroup,
    Indicate,
    MathTex,
    RIGHT, LEFT, UP, DOWN,
)

if TYPE_CHECKING:
    from .algo_scene import AlgoScene

from .algo_scene import (
    C_DEFAULT, C_ACTIVE, C_SORTED, C_VISITED,
    COBALT, CORAL, SIGNAL, INK, GRAY, MIST, C_TEXT
)

NODE_R = 0.35
NODE_FONT = 22
EDGE_W = 2.5


class GraphVis:
    """Animated graph for BFS, DFS, shortest path, etc.

    Parameters
    ----------
    scene:
        Owner scene.
    nodes:
        List of node ids (ints or strings).
    edges:
        List of (from, to) or (from, to, weight) tuples.
    directed:
        If True, edges are rendered as arrows.
    layout:
        "circular" (default) or dict {node_id: (x, y, 0)} for custom positions.
    """

    def __init__(
        self,
        scene: "AlgoScene",
        nodes: list,
        edges: list[tuple],
        *,
        directed: bool = False,
        layout: str | dict = "circular",
        node_radius: float = NODE_R,
    ) -> None:
        self.scene = scene
        self.nodes = nodes
        self.edges = edges
        self.directed = directed
        self.node_radius = node_radius

        self._node_mobs: dict = {}   # id -> Circle
        self._node_labels: dict = {}
        self._edge_mobs: dict = {}   # (from, to) -> Line/Arrow
        self._edge_labels: dict = {} # (from, to) -> Text (weight)

        self._positions = self._compute_layout(layout)
        self._build()

    def _compute_layout(self, layout) -> dict:
        import numpy as np
        if isinstance(layout, dict):
            return {k: np.array(v) for k, v in layout.items()}
        # circular layout
        n = len(self.nodes)
        radius = max(1.8, n * 0.45)
        positions = {}
        for i, node in enumerate(self.nodes):
            angle = 2 * math.pi * i / n - math.pi / 2
            positions[node] = np.array([radius * math.cos(angle), radius * math.sin(angle), 0])
        return positions

    def _build(self) -> None:
        edge_group = VGroup()
        node_group = VGroup()
        label_group = VGroup()
        weight_group = VGroup()

        # Edges
        for edge in self.edges:
            frm, to = edge[0], edge[1]
            weight = edge[2] if len(edge) > 2 else None
            p1, p2 = self._positions[frm], self._positions[to]
            if self.directed:
                mob = Arrow(p1, p2, color=INK, stroke_width=EDGE_W,
                            max_tip_length_to_length_ratio=0.12, buff=self.node_radius + 0.08)
            else:
                mob = Line(p1, p2, color=INK, stroke_width=EDGE_W)
            self._edge_mobs[(frm, to)] = mob
            if not self.directed:
                self._edge_mobs[(to, frm)] = mob
            edge_group.add(mob)

            if weight is not None:
                mid = (p1 + p2) / 2
                offset = 0.25
                w_lbl = Text(str(weight), font_size=18, color=COBALT)
                w_lbl.move_to(mid + [offset, offset, 0])
                self._edge_labels[(frm, to)] = w_lbl
                weight_group.add(w_lbl)

        # Nodes
        for node in self.nodes:
            pos = self._positions[node]
            circle = Circle(
                radius=self.node_radius,
                color=INK,
                fill_color=C_DEFAULT,
                fill_opacity=1,
                stroke_width=2.5,
            )
            circle.move_to(pos)
            lbl = Text(str(node), font_size=NODE_FONT, color=INK, weight="BOLD")
            lbl.move_to(pos)
            self._node_mobs[node] = circle
            self._node_labels[node] = lbl
            node_group.add(circle)
            label_group.add(lbl)

        self.scene.play(Create(edge_group, run_time=0.8))
        self.scene.play(Create(node_group, run_time=0.7), FadeIn(label_group, run_time=0.5))
        if weight_group:
            self.scene.play(FadeIn(weight_group, run_time=0.4))

    # ── animation helpers ─────────────────────────────────────────────────────

    def highlight_node(self, node, color: str = C_ACTIVE, run_time: float = 0.4) -> None:
        mob = self._node_mobs.get(node)
        if mob:
            self.scene.play(mob.animate.set_fill(color=color), run_time=run_time)

    def highlight_edge(self, frm, to, color: str = C_ACTIVE, run_time: float = 0.4) -> None:
        mob = self._edge_mobs.get((frm, to))
        if mob:
            self.scene.play(mob.animate.set_color(color), run_time=run_time)

    def visit_node(self, node) -> None:
        self.highlight_node(node, C_SORTED)

    def explore_edge(self, frm, to) -> None:
        self.highlight_edge(frm, to, SIGNAL)

    def relax_edge(self, frm, to, *, new_dist: str = "") -> None:
        """Shortest-path edge relaxation."""
        self.highlight_edge(frm, to, CORAL)
        if new_dist:
            mob = self._node_mobs.get(to)
            if mob:
                lbl = Text(new_dist, font_size=18, color=CORAL)
                lbl.next_to(mob, UP, buff=0.12)
                self.scene.play(FadeIn(lbl, run_time=0.25))

    def reset_colors(self, run_time: float = 0.35) -> None:
        node_anims = [m.animate.set_fill(color=C_DEFAULT) for m in self._node_mobs.values()]
        edge_anims = [m.animate.set_color(INK) for m in set(self._edge_mobs.values())]
        self.scene.play(AnimationGroup(*(node_anims + edge_anims), run_time=run_time))

    def indicate_node(self, node) -> None:
        mob = self._node_mobs.get(node)
        if mob:
            self.scene.play(Indicate(mob, color=C_ACTIVE, scale_factor=1.3))

    def bfs_animation(self, start, *, visit_pause: float = 0.4) -> list:
        """Animate BFS from start. Returns visited order."""
        from collections import deque
        visited = set()
        order = []
        q = deque([start])
        visited.add(start)
        self.highlight_node(start, C_ACTIVE)
        self.scene.wait(visit_pause * 0.5)
        self.visit_node(start)
        order.append(start)
        while q:
            node = q.popleft()
            for edge in self.edges:
                nbr = None
                if edge[0] == node and edge[1] not in visited:
                    nbr = edge[1]
                elif not self.directed and edge[1] == node and edge[0] not in visited:
                    nbr = edge[0]
                if nbr is not None:
                    visited.add(nbr)
                    q.append(nbr)
                    self.explore_edge(node, nbr)
                    self.scene.wait(visit_pause * 0.3)
                    self.visit_node(nbr)
                    order.append(nbr)
                    self.scene.wait(visit_pause)
        return order

    def dfs_animation(self, start, *, visit_pause: float = 0.4) -> list:
        """Animate DFS from start. Returns visited order."""
        visited = set()
        order = []
        def _dfs(node):
            visited.add(node)
            self.visit_node(node)
            order.append(node)
            self.scene.wait(visit_pause)
            for edge in self.edges:
                nbr = None
                if edge[0] == node:
                    nbr = edge[1]
                elif not self.directed and edge[1] == node:
                    nbr = edge[0]
                if nbr is not None and nbr not in visited:
                    self.explore_edge(node, nbr)
                    _dfs(nbr)
        self.highlight_node(start, C_ACTIVE, run_time=0.3)
        _dfs(start)
        return order
