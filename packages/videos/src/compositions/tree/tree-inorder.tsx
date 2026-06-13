import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Inorder Traversal",
  subtitle: "Traverse a binary tree in left-root-right order.",
  category: "tree",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "Visit Every Node in Left → Root → Right Order",
      body: [
        "Given the root of a binary tree, return the values of its nodes collected via inorder traversal.",
        "Inorder traversal follows a strict recursive rule: visit the entire left subtree first, then the current node, then the entire right subtree.",
        "For a Binary Search Tree (BST), inorder traversal always yields the node values in non-decreasing (sorted) order — this is the defining property of a BST.",
        "The traversal visits each of the n nodes exactly once, producing a flat list of n values as output.",
        "Both recursive and iterative implementations are commonly expected in interviews; the iterative version uses an explicit stack to simulate the call stack.",
      ],
      callout:
        "Inorder traversal is the foundation for BST validation, finding the k-th smallest element in a BST, and converting a BST to a sorted array — all in O(n) time.",
    },
    intuition: {
      heading: "Read a Tree Like a Book — Left Page, Spine, Right Page",
      body: [
        "Imagine the binary tree printed on paper: the leftmost leaf is at the far left, the root is in the middle, and the rightmost leaf is at the far right.",
        "Inorder traversal reads the tree from left to right, exactly as you would read words on a line of text.",
        "At every node you face the same three-step decision: finish everything to the left, record yourself, then finish everything to the right.",
        "The recursion naturally handles the nesting — each subtree is a smaller version of the same problem, so the same three steps apply at every level.",
        "The call stack (or an explicit stack in the iterative version) remembers which nodes still need to be visited after their left subtrees are done.",
      ],
      analogy:
        "Think of a family photo album arranged as a tree. To read every name in alphabetical order, you first flip through all the pages on the left branch, then read the current page, then flip through all pages on the right branch. That systematic left-then-self-then-right sweep is exactly inorder traversal.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial Tree",
          description:
            "We start with a balanced BST whose root is 4. Left subtree contains 2, 1, 3. Right subtree contains 6, 5, 7. The inorder sequence will be [1, 2, 3, 4, 5, 6, 7].",
        },
        {
          label: "Enter Root (4) — Go Left",
          description:
            "Call inorder(4). Before visiting node 4, we must finish its entire left subtree. We call inorder(2) and push node 4 onto the implicit call stack.",
        },
        {
          label: "Enter Node 2 — Go Left",
          description:
            "Call inorder(2). Before visiting node 2, we must finish its left subtree. We call inorder(1) and push node 2 onto the call stack.",
        },
        {
          label: "Enter Node 1 — Left is None",
          description:
            "Call inorder(1). Node 1 has no left child, so inorder(None) returns immediately. We now VISIT node 1 and append 1 to the result. Node 1 also has no right child, so inorder(1) returns.",
        },
        {
          label: "Back at Node 2 — Visit and Go Right",
          description:
            "We return to the call for node 2. Its left subtree is done. We VISIT node 2 and append 2 to the result. Now we call inorder(3) for node 2's right child.",
        },
        {
          label: "Enter Node 3 — Leaf",
          description:
            "Node 3 has no children. inorder(None) returns for both sides. We VISIT node 3 and append 3 to the result. inorder(3) returns. Result so far: [1, 2, 3].",
        },
        {
          label: "Back at Root (4) — Visit",
          description:
            "We return to the call for root node 4. Its entire left subtree [1, 2, 3] is now processed. We VISIT node 4 and append 4 to the result. Result: [1, 2, 3, 4].",
        },
        {
          label: "Enter Right Subtree — Node 6",
          description:
            "We call inorder(6) for root's right child. Before visiting 6, we go left and call inorder(5).",
        },
        {
          label: "Visit Node 5 — Leaf",
          description:
            "Node 5 has no children. We VISIT node 5 and append 5 to the result. inorder(5) returns. Result: [1, 2, 3, 4, 5].",
        },
        {
          label: "Back at Node 6 — Visit and Go Right",
          description:
            "We return to node 6. Left subtree done. We VISIT node 6 and append 6. Then we call inorder(7) for node 6's right child.",
        },
        {
          label: "Visit Node 7 — Leaf",
          description:
            "Node 7 has no children. We VISIT node 7 and append 7 to the result. inorder(7) returns. Result: [1, 2, 3, 4, 5, 6, 7].",
        },
        {
          label: "Traversal Complete",
          description:
            "All recursive calls have returned. The final result [1, 2, 3, 4, 5, 6, 7] is the sorted inorder sequence of the BST. Every node was visited exactly once in O(n) time.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `from __future__ import annotations
from typing import Optional


class TreeNode:
    def __init__(self, val: int = 0,
                 left: "Optional[TreeNode]" = None,
                 right: "Optional[TreeNode]" = None):
        self.val = val
        self.left = left
        self.right = right


# ── Recursive implementation ──────────────────────────────────
def inorder_recursive(root: Optional[TreeNode]) -> list[int]:
    """
    Inorder traversal using the call stack.
    Time:  O(n)  — every node visited once
    Space: O(h)  — call stack depth equals tree height h
                   O(log n) for balanced, O(n) for skewed
    """
    result: list[int] = []

    def dfs(node: Optional[TreeNode]) -> None:
        if node is None:          # base case: empty subtree
            return
        dfs(node.left)            # 1. traverse left subtree
        result.append(node.val)   # 2. visit current node
        dfs(node.right)           # 3. traverse right subtree

    dfs(root)
    return result


# ── Iterative implementation (explicit stack) ─────────────────
def inorder_iterative(root: Optional[TreeNode]) -> list[int]:
    """
    Inorder traversal using an explicit stack.
    Avoids recursion-limit issues for very deep trees.
    Time:  O(n)
    Space: O(h)
    """
    result: list[int] = []
    stack: list[TreeNode] = []
    current = root

    while current is not None or stack:
        # Dive as far left as possible
        while current is not None:
            stack.append(current)
            current = current.left

        # Pop the deepest unvisited node
        current = stack.pop()
        result.append(current.val)  # visit

        # Move to right subtree
        current = current.right

    return result


# Example
root = TreeNode(4,
    TreeNode(2, TreeNode(1), TreeNode(3)),
    TreeNode(6, TreeNode(5), TreeNode(7)))

print(inorder_recursive(root))   # [1, 2, 3, 4, 5, 6, 7]
print(inorder_iterative(root))   # [1, 2, 3, 4, 5, 6, 7]`,
      annotations: [
        {
          lines: [15, 16, 17, 18, 19],
          note: "The recursive function signature takes an Optional[TreeNode] root and returns a flat list of integers. An inner closure 'dfs' mutates the outer 'result' list, avoiding the need to pass it as a parameter.",
        },
        {
          lines: [24, 25],
          note: "The base case: if the current node is None (an empty subtree), we simply return. This handles leaf nodes' missing children without any special-casing at the call site.",
        },
        {
          lines: [26, 27, 28],
          note: "The three-line core of inorder traversal: recurse left, append the current value, recurse right. The order of these three lines is what distinguishes inorder from preorder (visit first) and postorder (visit last).",
        },
        {
          lines: [37, 38, 39, 40, 41],
          note: "The iterative version maintains an explicit stack. The outer while loop continues as long as there are unvisited nodes — either the current pointer is non-null, or the stack still holds nodes waiting to be visited.",
        },
        {
          lines: [43, 44, 45],
          note: "The inner while loop dives as far left as possible, pushing every node onto the stack. This simulates the recursive calls to dfs(node.left) that would pile up on the call stack in the recursive version.",
        },
        {
          lines: [47, 48, 49, 50],
          note: "After exhausting the left branch, we pop the top node (the deepest unvisited node), visit it by appending its value, and then move current to its right child to begin exploring the right subtree.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Balanced tree (stack)", value: "O(log n)", color: "#CEEB5A" },
        { label: "Skewed tree (stack)", value: "O(n)", color: "#E05A3A" },
        { label: "Output list", value: "O(n)", color: "#888899" },
      ],
      notes: [
        "Time is always O(n) regardless of tree shape — every node is visited exactly once, and no node is revisited.",
        "Space complexity is O(h) where h is the tree height. For a perfectly balanced tree h = O(log n); for a completely skewed (linked-list-shaped) tree h = O(n).",
        "The iterative version has the same asymptotic space complexity as the recursive version, but avoids Python's default recursion limit (~1000 frames), making it safer for very deep trees in production code.",
      ],
    },
    variations: {
      items: [
        "Preorder Traversal (Root → Left → Right): visit the node before recursing. Useful for copying a tree or serializing its structure — the root always appears first in the output.",
        "Postorder Traversal (Left → Right → Root): visit the node after both subtrees. Used for deleting a tree (children before parent) and evaluating expression trees (operands before operator).",
        "Morris Inorder Traversal: threads temporary right-child pointers to predecessors so traversal runs in O(n) time and O(1) extra space — no stack or recursion needed.",
        "Iterative with explicit stack: mirrors the recursive call stack using a list, enabling inorder traversal in languages or contexts where deep recursion is unsafe.",
        "BST Validation using inorder: collect the inorder sequence and check that it is strictly increasing. A BST is valid if and only if its inorder traversal is sorted.",
      ],
      tips: [
        "Memorize the three traversal orders by the position of the root visit: Pre-order = root First, In-order = root In the middle, Post-order = root Last.",
        "For the iterative version, the key insight is: keep diving left and pushing onto the stack, then pop-visit-go-right. This three-step loop exactly mirrors the recursive left-self-right pattern.",
        "When a problem asks for the k-th smallest element in a BST, run inorder traversal and stop at the k-th visited node — no need to collect the full list.",
        "The Morris traversal trick is rarely required in interviews but is worth knowing as a follow-up: it achieves O(1) space by temporarily modifying the tree and restoring it during traversal.",
      ],
    },
    summary: {
      keyPoints: [
        "Inorder traversal visits nodes in left → current → right order, which for a BST produces values in non-decreasing sorted order.",
        "The recursive implementation is three lines: recurse left, append current value, recurse right — the simplest expression of the algorithm.",
        "The iterative implementation uses an explicit stack: dive left pushing nodes, then pop-visit-move-right, repeating until the stack and current pointer are both empty.",
        "Time complexity is O(n) in all cases because every node is visited exactly once with no repeated work.",
        "Space complexity is O(h) where h is the tree height — O(log n) for balanced trees, O(n) for skewed trees — due to the call stack or explicit stack depth.",
        "Inorder traversal is the basis for BST validation, k-th smallest queries, and converting a BST to a sorted array — mastering it unlocks a wide class of tree problems.",
      ],
    },
  },
}

export default function TreeInorderVideo() {
  return <AlgoVideo config={config} />
}
