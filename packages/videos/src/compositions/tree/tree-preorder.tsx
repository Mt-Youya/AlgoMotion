import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Preorder Traversal",
  subtitle: "Traverse a binary tree in root-left-right order.",
  category: "tree",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Preorder Traversal?",
      bullets: [
        "Given a binary tree, visit every node exactly once in root → left → right order.",
        "The current node (root) is always processed before either of its children.",
        "After visiting the root, the algorithm fully explores the left subtree recursively.",
        "Only after the entire left subtree is exhausted does it move to the right subtree.",
        "For the tree [1, 2, 3, 4, 5, 6, 7] the preorder sequence is [1, 2, 4, 5, 3, 6, 7].",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of preorder as 'visit me first, then deal with my children' — the parent always comes before its descendants.",
        "This makes preorder ideal for tasks where you need to know the parent before processing children (e.g., copying a tree).",
        "The root of every subtree appears as the first element of that subtree's preorder sequence.",
        "Preorder produces a prefix (Polish) notation for expression trees, where the operator precedes its operands.",
        "Because the root is visited first, you can reconstruct the original tree from a preorder sequence combined with an inorder sequence.",
      ],
      analogy:
        "Imagine exploring a building floor by floor. You register the current floor the moment you arrive, then descend to the left wing completely before you ever enter the right wing. The order in which you register each floor is exactly preorder traversal.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start at the root node (1). Preorder rule: visit immediately. Result so far: [1].",
        },
        {
          step: 2,
          description: "Recurse into the left child of root → enter node (2). Visit it immediately. Result: [1, 2].",
        },
        {
          step: 3,
          description:
            "Recurse into the left child of (2) → enter node (4). Node (4) has no children. Visit it. Result: [1, 2, 4].",
        },
        {
          step: 4,
          description: "Node (4) fully processed. Backtrack to (2). Recurse into right child of (2) → enter node (5).",
        },
        {
          step: 5,
          description:
            "Node (5) has no children. Visit it immediately. Result: [1, 2, 4, 5]. Left subtree of root is done.",
        },
        {
          step: 6,
          description:
            "Backtrack to root (1). Now recurse into right child → enter node (3). Visit it immediately. Result: [1, 2, 4, 5, 3].",
        },
        {
          step: 7,
          description:
            "Recurse into left child of (3) → enter node (6). No children. Visit immediately. Result: [1, 2, 4, 5, 3, 6].",
        },
        {
          step: 8,
          description:
            "Backtrack to (3). Recurse into right child → enter node (7). No children. Visit immediately. Result: [1, 2, 4, 5, 3, 6, 7].",
        },
        {
          step: 9,
          description: "All nodes visited. Traversal complete. Final preorder sequence: [1, 2, 4, 5, 3, 6, 7].",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from __future__ import annotations
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class TreeNode:
    val: int
    left: Optional["TreeNode"] = field(default=None)
    right: Optional["TreeNode"] = field(default=None)


# ── Recursive approach ────────────────────────────────────────────
def preorder_recursive(root: Optional[TreeNode]) -> list[int]:
    """Return preorder traversal (root → left → right) of a binary tree."""
    result: list[int] = []

    def dfs(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        result.append(node.val)   # 1. Visit root first
        dfs(node.left)             # 2. Recurse left subtree
        dfs(node.right)            # 3. Recurse right subtree

    dfs(root)
    return result


# ── Iterative approach (explicit stack) ──────────────────────────
def preorder_iterative(root: Optional[TreeNode]) -> list[int]:
    """Iterative preorder using an explicit stack (avoids recursion limit)."""
    if root is None:
        return []

    result: list[int] = []
    stack: list[TreeNode] = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)      # Visit node immediately after popping

        # Push right first so that left is processed first (LIFO)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result


# ── Example usage ────────────────────────────────────────────────
if __name__ == "__main__":
    #       1
    #      / \\
    #     2   3
    #    / \\ / \\
    #   4  5 6  7
    root = TreeNode(1,
        TreeNode(2, TreeNode(4), TreeNode(5)),
        TreeNode(3, TreeNode(6), TreeNode(7)),
    )
    print("Recursive:", preorder_recursive(root))  # [1, 2, 4, 5, 3, 6, 7]
    print("Iterative:", preorder_iterative(root))  # [1, 2, 4, 5, 3, 6, 7]
`,
      annotations: [
        {
          lines: [14, 15],
          note: "The function accumulates visited node values in a list and returns it — a clean pattern that avoids global state.",
        },
        {
          lines: [17, 18, 19],
          note: "Base case: a None node means we have gone past a leaf — simply return without appending anything.",
        },
        {
          lines: [20, 21, 22],
          note: "The three lines encode the entire preorder contract: visit self, then recurse left, then recurse right.",
        },
        {
          lines: [30, 31],
          note: "The iterative version seeds the stack with the root. The loop runs until every node has been popped and visited.",
        },
        {
          lines: [35, 36, 37, 38],
          note: "Right child is pushed before left so that when we pop next we get the left child first — preserving root→left→right order.",
        },
        {
          lines: [45, 46, 47, 48],
          note: "Both implementations produce identical output; the iterative form is preferred for very deep trees to avoid Python's recursion limit.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n)",
          explanation: "Even in the best case every node must be visited exactly once — there is no way to skip nodes.",
        },
        {
          case: "Average",
          notation: "O(n)",
          explanation: "For a balanced tree with n nodes, each node is processed in constant time, giving O(n) total.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          explanation: "A completely skewed (degenerate) tree still requires visiting all n nodes — time stays O(n).",
        },
      ],
      spaceRows: [
        {
          type: "Call Stack (recursive)",
          notation: "O(h)",
          explanation:
            "The recursion depth equals the tree height h. For a balanced tree h = O(log n); for a skewed tree h = O(n).",
        },
        {
          type: "Explicit Stack (iterative)",
          notation: "O(h)",
          explanation:
            "The iterative stack holds at most h nodes at any time, mirroring the recursive call-stack depth.",
        },
      ],
      insights: [
        "Preorder traversal is O(n) in both time and space for any binary tree shape — the only variable is the constant hidden in the space term (tree height h).",
        "For a perfectly balanced tree the space is O(log n); for a pathological linked-list-shaped tree it degrades to O(n).",
        "The iterative approach avoids Python's default recursion limit of ~1000 frames, making it safer for large or deep trees in production code.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Recursive Preorder",
          description:
            "The canonical three-line implementation: visit node, recurse left, recurse right. Cleanest code but limited by the language's call-stack depth.",
        },
        {
          name: "Iterative Preorder (Explicit Stack)",
          description:
            "Uses a manual stack to simulate the call stack. Push right before left so left is popped first. Handles arbitrarily deep trees without stack overflow.",
        },
        {
          name: "Morris Preorder Traversal",
          description:
            "A O(1) space algorithm that temporarily threads right-child pointers to create a path back to ancestors, then restores them. Useful in memory-constrained environments.",
        },
        {
          name: "Preorder on N-ary Trees",
          description:
            "Generalizes to trees with any number of children: visit the current node first, then iterate over children left-to-right recursively.",
        },
        {
          name: "Preorder Serialization",
          description:
            "Encode null children as a sentinel value (e.g., '#'). The resulting string uniquely represents the tree and can be deserialized in a single O(n) pass.",
        },
      ],
      tips: [
        "Remember: preorder is the only traversal where the root is guaranteed to be the first element — use this property to identify the root when reconstructing a tree from traversal sequences.",
        "When using the iterative approach, always push the right child before the left child onto the stack so that the left subtree is processed first (LIFO semantics).",
        "Preorder + inorder sequences together uniquely determine a binary tree (assuming distinct values) — a classic interview reconstruction problem.",
        "For very deep trees in Python, prefer the iterative approach or increase the recursion limit with sys.setrecursionlimit(), though the former is cleaner.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Preorder traversal visits nodes in root → left → right order, processing the current node before any of its descendants.",
        "It runs in O(n) time regardless of tree shape because every node is visited exactly once.",
        "Space complexity is O(h) where h is the tree height — O(log n) for balanced trees and O(n) for skewed trees.",
        "The root of any subtree is always the first element in that subtree's preorder sequence, enabling tree reconstruction algorithms.",
        "Both recursive and iterative implementations are equivalent; the iterative form is preferred for production code to avoid call-stack limits.",
        "Key applications include tree serialization, prefix expression evaluation, deep-copying a tree, and printing hierarchical structures like file systems.",
      ],
    },
  },
}

export default function TreePreorderVideo() {
  return <AlgoVideo config={config} />
}
