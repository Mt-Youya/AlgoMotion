import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Postorder Traversal",
  subtitle: "Traverse a binary tree in left-right-root order.",
  category: "tree",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Postorder Traversal?",
      bullets: [
        "Given a binary tree, visit every node exactly once following the order: left subtree → right subtree → current node.",
        "The root is always the very last node visited — every descendant is processed before its ancestor.",
        "This 'children before parent' property makes postorder ideal for operations that depend on subtree results before acting on the parent.",
        "Classic applications include deleting a tree (free children before parent), evaluating expression trees (compute operands before applying the operator), and computing directory sizes.",
        "Postorder traversal can be implemented recursively (clean and concise) or iteratively using an explicit stack (avoids call-stack overflow on deep trees).",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of postorder as a 'bottom-up' strategy: you always finish exploring a subtree completely before reporting back to the parent.",
        "At every node the algorithm dives left as deep as possible, then dives right as deep as possible, and only then processes the current node.",
        "Because the root is visited last, the traversal naturally produces a sequence where every node appears after all of its descendants.",
        "The recursive call stack mirrors the tree structure — each stack frame represents a node waiting for both its children to return before it can be visited.",
        "Contrast with preorder (root first) and inorder (root between children) — postorder is the only traversal that guarantees all subtree work completes before the parent node is touched.",
      ],
      analogy:
        "Imagine cleaning up after a family dinner. You clear the children's plates first, then the parents' plates, and finally the host's plate at the head of the table. You never remove a plate until all plates 'downstream' of it are already cleared — that's postorder traversal applied to a family seating tree.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start at root node 1. Before visiting it, we must first fully explore the left subtree rooted at 2.",
        },
        {
          step: 2,
          description:
            "Move to node 2 (left child of root). Before visiting 2, explore its left subtree rooted at 4.",
        },
        {
          step: 3,
          description:
            "Move to node 4 (left child of 2). Node 4 is a leaf — it has no children. Visit node 4 immediately. Result so far: [4].",
        },
        {
          step: 4,
          description:
            "Back at node 2. Left subtree done. Now explore the right subtree rooted at 5.",
        },
        {
          step: 5,
          description:
            "Move to node 5 (right child of 2). Node 5 is a leaf. Visit node 5. Result so far: [4, 5].",
        },
        {
          step: 6,
          description:
            "Back at node 2. Both children (4 and 5) have been visited. Now visit node 2 itself. Result so far: [4, 5, 2].",
        },
        {
          step: 7,
          description:
            "Back at root 1. Left subtree (rooted at 2) is fully done. Now explore the right subtree rooted at 3.",
        },
        {
          step: 8,
          description:
            "Move to node 3 (right child of root). Explore its left subtree rooted at 6. Node 6 is a leaf — visit it. Result so far: [4, 5, 2, 6].",
        },
        {
          step: 9,
          description:
            "Back at node 3. Explore its right subtree rooted at 7. Node 7 is a leaf — visit it. Result so far: [4, 5, 2, 6, 7].",
        },
        {
          step: 10,
          description:
            "Back at node 3. Both children (6 and 7) done. Visit node 3. Result so far: [4, 5, 2, 6, 7, 3].",
        },
        {
          step: 11,
          description:
            "Back at root 1. Both subtrees fully processed. Visit root node 1 last. Final result: [4, 5, 2, 6, 7, 3, 1].",
        },
        {
          step: 12,
          description:
            "Traversal complete. Every node was visited exactly once in left → right → root order. The root is always the final element in a postorder sequence.",
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


# ── Recursive approach ────────────────────────────────────────────────────────
def postorder_recursive(root: Optional[TreeNode]) -> list[int]:
    """Return postorder traversal of a binary tree (recursive)."""
    result: list[int] = []

    def dfs(node: Optional[TreeNode]) -> None:
        if node is None:
            return
        dfs(node.left)          # 1. Traverse left subtree
        dfs(node.right)         # 2. Traverse right subtree
        result.append(node.val) # 3. Visit current node

    dfs(root)
    return result


# ── Iterative approach (two-stack) ────────────────────────────────────────────
def postorder_iterative(root: Optional[TreeNode]) -> list[int]:
    """Return postorder traversal using an explicit stack (no recursion)."""
    if root is None:
        return []

    stack: list[TreeNode] = [root]
    result: list[int] = []

    while stack:
        node = stack.pop()
        result.append(node.val)          # Visit in reverse postorder
        if node.left:
            stack.append(node.left)      # Left pushed first (processed last)
        if node.right:
            stack.append(node.right)     # Right pushed second (processed first)

    return result[::-1]                  # Reverse to get true postorder


# ── Example ───────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    #        1
    #      /   \\
    #     2     3
    #    / \\   / \\
    #   4   5 6   7
    root = TreeNode(1,
        TreeNode(2, TreeNode(4), TreeNode(5)),
        TreeNode(3, TreeNode(6), TreeNode(7)),
    )
    print(postorder_recursive(root))  # [4, 5, 2, 6, 7, 3, 1]
    print(postorder_iterative(root))  # [4, 5, 2, 6, 7, 3, 1]
`,
      annotations: [
        {
          lines: [14, 15, 16],
          note: "The recursive helper 'dfs' captures the result list from the enclosing scope, keeping the public function signature clean.",
        },
        {
          lines: [18, 19, 20],
          note: "Base case: a None node means we have gone past a leaf — simply return without adding anything to the result.",
        },
        {
          lines: [21, 22, 23],
          note: "The three lines directly encode the postorder rule: left subtree first, right subtree second, current node third (visit last).",
        },
        {
          lines: [31, 32, 33],
          note: "Iterative two-stack trick: push root, pop and record each node, push its left then right children. This visits nodes in reverse postorder (root → right → left).",
        },
        {
          lines: [37, 38],
          note: "Reversing the collected result at the end converts root→right→left into the correct left→right→root postorder sequence.",
        },
        {
          lines: [41, 42],
          note: "Both implementations produce identical output — choose recursive for readability and iterative when call-stack depth is a concern (very deep or skewed trees).",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n)",
          explanation:
            "Every node must be visited exactly once regardless of tree shape — no shortcuts exist.",
        },
        {
          case: "Average",
          notation: "O(n)",
          explanation:
            "For a balanced tree with n nodes, each of the n nodes is visited once in constant work per node.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          explanation:
            "Even a degenerate (linked-list-shaped) tree requires visiting all n nodes — the order is fixed.",
        },
      ],
      spaceRows: [
        {
          type: "Recursive call stack",
          notation: "O(h)",
          explanation:
            "h is the height of the tree. O(log n) for a balanced tree, O(n) for a completely skewed tree.",
        },
        {
          type: "Iterative stack",
          notation: "O(n)",
          explanation:
            "In the worst case (a complete binary tree) all nodes at the widest level may reside in the stack simultaneously.",
        },
        {
          type: "Output array",
          notation: "O(n)",
          explanation:
            "Storing the traversal result requires one slot per node, contributing O(n) auxiliary space.",
        },
      ],
      insights: [
        "Postorder traversal is unique in guaranteeing that a parent is always processed after all its descendants — this is the key invariant that makes it useful for deletion and bottom-up computations.",
        "The recursive implementation has a maximum call-stack depth equal to the tree height h. For highly unbalanced trees (e.g., a sorted-insertion BST), h can reach n, risking a stack overflow — the iterative version avoids this.",
        "Both recursive and iterative postorder run in exactly Θ(n) time and Θ(h) / Θ(n) space respectively; the choice between them is a readability vs. safety trade-off, not a performance one.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Recursive Postorder",
          description:
            "The classic three-line recursive implementation (dfs left, dfs right, visit node). Clean and self-documenting; the call stack implicitly manages the traversal state.",
        },
        {
          name: "Iterative Two-Stack Postorder",
          description:
            "Uses a single stack to produce a reverse-postorder sequence (root → right → left), then reverses the result. Easy to derive from iterative preorder.",
        },
        {
          name: "Iterative One-Stack Postorder",
          description:
            "Tracks the previously visited node to decide whether to visit the current node or continue descending. More complex but avoids the reversal step and uses less extra memory.",
        },
        {
          name: "Morris Postorder Traversal",
          description:
            "Achieves O(1) extra space by temporarily modifying tree pointers (threaded binary tree technique). Useful in memory-constrained environments; restores the tree structure afterward.",
        },
        {
          name: "Postorder on N-ary Trees",
          description:
            "Generalises naturally: recursively visit all children left-to-right before visiting the parent node. Used in file system traversal where a directory may have many children.",
        },
      ],
      tips: [
        "When you need to delete or free every node in a tree, always use postorder — freeing a parent before its children would leave orphaned memory.",
        "Expression tree evaluation is a textbook postorder application: leaf nodes are operands, internal nodes are operators. Evaluating postorder means both operands are ready before the operator is applied.",
        "For very deep trees (millions of nodes in a skewed structure), prefer the iterative approach to avoid Python's default recursion limit (~1000 frames). Use sys.setrecursionlimit only as a last resort.",
        "Postorder is the only traversal where the root is guaranteed to appear at the end of the output sequence — you can use this property to verify your implementation quickly.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Postorder traversal visits nodes in left → right → root order, ensuring every descendant is processed before its ancestor.",
        "The algorithm visits each of the n nodes exactly once, giving a time complexity of O(n) regardless of tree shape or balance.",
        "Space complexity is O(h) for the recursive call stack, where h is the tree height — O(log n) for balanced trees and O(n) for skewed ones.",
        "The iterative two-stack approach produces a reverse-postorder sequence that is then reversed, offering a straightforward way to avoid recursion.",
        "Key use-cases include tree deletion, expression tree evaluation, directory/subtree size computation, and any problem requiring bottom-up aggregation of subtree results.",
        "Postorder is one of the three fundamental DFS traversal orders (alongside preorder and inorder) and forms the basis for many advanced tree algorithms.",
      ],
    },
  },
};

export default function TreePostorderVideo() {
  return <AlgoVideo config={config} />;
}
