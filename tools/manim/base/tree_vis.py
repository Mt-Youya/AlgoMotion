"""TreeVis — animated binary tree for AlgoMotion scenes."""
from __future__ import annotations

from dataclasses import dataclass, field
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
    RIGHT, LEFT, UP, DOWN,
)

if TYPE_CHECKING:
    from .algo_scene import AlgoScene

from .algo_scene import C_DEFAULT, C_ACTIVE, C_SORTED, C_TEXT, COBALT, CORAL, SIGNAL, INK, GRAY, MIST

NODE_RADIUS = 0.38
NODE_FONT = 22
LEVEL_HEIGHT = 1.1
H_SPREAD_BASE = 2.2


@dataclass
class TreeNode:
    val: int | str
    left: "TreeNode | None" = field(default=None)
    right: "TreeNode | None" = field(default=None)


def from_list(values: list[int | None]) -> TreeNode | None:
    """Build a binary tree from BFS level-order list (None = empty node)."""
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue = [root]
    i = 1
    while queue and i < len(values):
        node = queue.pop(0)
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root


class _NodeMob:
    def __init__(self, node: TreeNode, pos, mob: Circle, label: Text) -> None:
        self.node = node
        self.pos = pos
        self.circle = mob
        self.label = label


class TreeVis:
    """Animated binary tree visualization."""

    def __init__(
        self,
        scene: "AlgoScene",
        root: TreeNode | None,
        *,
        center=None,
        node_radius: float = NODE_RADIUS,
        level_height: float = LEVEL_HEIGHT,
    ) -> None:
        self.scene = scene
        self.root = root
        self.node_radius = node_radius
        self.level_height = level_height
        self._nodes: dict[int, _NodeMob] = {}   # id(node) -> NodeMob
        self._edges: list[Line] = []
        self._id_counter = 0

        import numpy as np
        self._center = np.array([0, 2, 0]) if center is None else np.array(center)
        self._build()

    def _build(self) -> None:
        if self.root is None:
            return
        positions: dict[int, tuple] = {}
        self._compute_positions(self.root, self._center, 0, H_SPREAD_BASE, positions)

        edge_group = VGroup()
        node_group = VGroup()
        label_group = VGroup()

        for node, pos in positions.items():
            circle = Circle(
                radius=self.node_radius,
                color=INK,
                fill_color=C_DEFAULT,
                fill_opacity=1,
                stroke_width=2.5,
            )
            circle.move_to(pos)
            label = Text(str(node.val), font_size=NODE_FONT, color=INK, weight="BOLD")
            label.move_to(pos)
            mob = _NodeMob(node, pos, circle, label)
            self._nodes[id(node)] = mob
            node_group.add(circle)
            label_group.add(label)

        # edges
        for node, pos in positions.items():
            if node.left and node.left in positions:
                line = Line(pos, positions[node.left], color=INK, stroke_width=2)
                line.set_z_index(-1)
                edge_group.add(line)
                self._edges.append(line)
            if node.right and node.right in positions:
                line = Line(pos, positions[node.right], color=INK, stroke_width=2)
                line.set_z_index(-1)
                edge_group.add(line)
                self._edges.append(line)

        self.scene.play(Create(edge_group, run_time=0.6))
        self.scene.play(Create(node_group, run_time=0.7), FadeIn(label_group, run_time=0.5))

    def _compute_positions(self, node, pos, depth, h_spread, out):
        if node is None:
            return
        import numpy as np
        out[node] = np.array(pos)
        left_pos = pos + np.array([-h_spread / 2, -self.level_height, 0])
        right_pos = pos + np.array([h_spread / 2, -self.level_height, 0])
        self._compute_positions(node.left, left_pos, depth + 1, h_spread / 2, out)
        self._compute_positions(node.right, right_pos, depth + 1, h_spread / 2, out)

    # ── animation helpers ─────────────────────────────────────────────────────

    def highlight(self, node: TreeNode, color: str = C_ACTIVE, run_time: float = 0.4) -> None:
        mob = self._nodes.get(id(node))
        if mob:
            self.scene.play(mob.circle.animate.set_fill(color=color), run_time=run_time)

    def reset_colors(self, run_time: float = 0.35) -> None:
        anims = [mob.circle.animate.set_fill(color=C_DEFAULT) for mob in self._nodes.values()]
        if anims:
            self.scene.play(AnimationGroup(*anims, run_time=run_time))

    def indicate(self, node: TreeNode) -> None:
        mob = self._nodes.get(id(node))
        if mob:
            self.scene.play(Indicate(mob.circle, color=C_ACTIVE, scale_factor=1.3))

    def mark_visited(self, node: TreeNode) -> None:
        self.highlight(node, C_SORTED)

    def traverse_inorder(self, node: TreeNode | None = None, *, visit_pause: float = 0.4) -> list:
        """Animate inorder traversal and return visited values."""
        result = []
        def _go(n):
            if n is None:
                return
            self.highlight(n, MIST, run_time=0.3)
            _go(n.left)
            self.scene.wait(visit_pause * 0.3)
            self.mark_visited(n)
            result.append(n.val)
            self.scene.wait(visit_pause)
            _go(n.right)
        _go(node or self.root)
        return result

    def traverse_preorder(self, node: TreeNode | None = None, *, visit_pause: float = 0.4) -> list:
        result = []
        def _go(n):
            if n is None:
                return
            self.mark_visited(n)
            result.append(n.val)
            self.scene.wait(visit_pause)
            self.highlight(n, MIST, run_time=0.2)
            _go(n.left)
            _go(n.right)
        _go(node or self.root)
        return result

    def traverse_postorder(self, node: TreeNode | None = None, *, visit_pause: float = 0.4) -> list:
        result = []
        def _go(n):
            if n is None:
                return
            self.highlight(n, MIST, run_time=0.2)
            _go(n.left)
            _go(n.right)
            self.mark_visited(n)
            result.append(n.val)
            self.scene.wait(visit_pause)
        _go(node or self.root)
        return result
