import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Lowest Common Ancestor",
  subtitle: "Find the lowest common ancestor of two nodes in a binary tree.",
  category: "tree",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given the root of a binary tree and two nodes p and q, find their Lowest Common Ancestor (LCA).",
        "The LCA is defined as the deepest node in the tree that has both p and q as descendants.",
        "A node is considered a descendant of itself, so p can be the LCA if q is in p's subtree.",
        "All node values are unique; both p and q are guaranteed to exist in the tree.",
        "The tree can be unbalanced and may have up to 10^5 nodes.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Use post-order DFS: process children before the current node so we can propagate results upward.",
        "At each node, ask: 'Is p or q in my left subtree? In my right subtree?'",
        "If both subtrees return a non-null result, the current node is the LCA — p and q are on opposite sides.",
        "If only one side returns non-null, that side contains both targets; bubble it up.",
        "Base case: if the current node IS p or q, return it immediately — no need to search deeper.",
      ],
      analogy:
        "Think of a family tree. To find the most recent common ancestor of two cousins, climb up from each cousin until the family lines converge. The first meeting point is the LCA.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start DFS at root node 3. Neither 3 == p(5) nor 3 == q(4), so recurse into both children.",
        },
        {
          step: 2,
          description: "Go left to node 5. Node 5 == p, so immediately return node 5 without going deeper.",
        },
        {
          step: 3,
          description: "Go right to node 1. Node 1 is neither p nor q, so recurse into its children (0 and 8).",
        },
        {
          step: 4,
          description:
            "Node 0 is a leaf and is neither p nor q — return None. Node 8 is a leaf and is neither p nor q — return None.",
        },
        {
          step: 5,
          description: "Back at node 1: left=None, right=None → return None up to root.",
        },
        {
          step: 6,
          description: "Back at root 3: left=node5, right=None. Only left is non-null, so return node 5.",
        },
        {
          step: 7,
          description:
            "Wait — q=4 is in node 5's subtree. Because node 5 was returned as soon as we matched p, node 4 was never separately found. The algorithm correctly returns node 5 as LCA.",
        },
        {
          step: 8,
          description:
            "Second example: p=5, q=1. DFS left returns node 5 (matches p). DFS right returns node 1 (matches q).",
        },
        {
          step: 9,
          description:
            "At root 3: left=node5 (non-null), right=node1 (non-null) → both sides non-null, so root 3 is the LCA.",
        },
        {
          step: 10,
          description: "Return root 3 as the answer. LCA(5, 1) = 3.",
        },
        {
          step: 11,
          description: "The algorithm visits each node at most once, giving O(N) time complexity.",
        },
        {
          step: 12,
          description:
            "The recursion stack depth equals the tree height H, giving O(H) space — O(log N) balanced, O(N) worst case.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val   = val
        self.left  = left
        self.right = right

class Solution:
    def lowestCommonAncestor(
        self,
        root: TreeNode,
        p: TreeNode,
        q: TreeNode,
    ) -> TreeNode:
        # Base case: empty subtree or found one of the targets
        if not root or root is p or root is q:
            return root

        # Recurse into both subtrees
        left  = self.lowestCommonAncestor(root.left,  p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        # Both subtrees found a target → current node is LCA
        if left and right:
            return root

        # Only one subtree found a target → propagate it upward
        return left if left else right`,
      annotations: [
        {
          lines: [12, 13],
          note: "Base case: return immediately if the subtree is empty or the current node is one of the targets. This short-circuits deeper recursion.",
        },
        {
          lines: [16, 17],
          note: "Post-order recursion: explore both children fully before making a decision at the current node.",
        },
        {
          lines: [20, 21],
          note: "If both left and right are non-null, p and q are in opposite subtrees — this node is the LCA.",
        },
        {
          lines: [24],
          note: "If only one side is non-null, both targets are in that subtree; bubble the result upward.",
        },
        {
          lines: [1, 2, 3],
          note: "Standard TreeNode definition included for completeness; LeetCode provides this automatically.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      timeRows: [
        { case: "Best", complexity: "O(1)", note: "Root itself is p or q" },
        { case: "Average", complexity: "O(N)", note: "Visit a fraction of nodes" },
        { case: "Worst", complexity: "O(N)", note: "Full traversal of all N nodes" },
      ],
      spaceRows: [
        { label: "Call stack (balanced tree)", complexity: "O(log N)", note: "Height of balanced tree" },
        { label: "Call stack (skewed tree)", complexity: "O(N)", note: "Degenerate linked-list shape" },
        { label: "Extra variables", complexity: "O(1)", note: "No auxiliary data structures" },
      ],
      insights: [
        "The algorithm is optimal — any correct LCA algorithm must visit at least one node on the path from root to p or q, so O(N) is a tight lower bound for the worst case.",
        "For repeated LCA queries on the same tree, preprocess with Euler tour + sparse table to answer each query in O(1) after O(N log N) preprocessing.",
        "In a BST, LCA can be found in O(H) without visiting irrelevant subtrees by comparing values.",
      ],
    },

    variations: {
      heading: "Variations & Tips",
      variations: [
        {
          name: "LCA in a Binary Search Tree",
          description:
            "Exploit BST ordering: if both p and q are less than root, go left; if both greater, go right; otherwise root is LCA. O(H) time.",
        },
        {
          name: "LCA with Parent Pointers",
          description:
            "Walk both nodes up to the root recording visited ancestors in a set. The first repeated ancestor is the LCA. O(H) time and space.",
        },
        {
          name: "LCA of Multiple Nodes",
          description:
            "Generalise: find LCA of a set S of nodes. Modify the base case to check membership in S; return current node when both subtrees return non-null.",
        },
        {
          name: "Offline LCA (Tarjan's Algorithm)",
          description:
            "Process all queries together using Union-Find during a single DFS. Answers all Q queries in O((N + Q) α(N)) — near-linear total.",
        },
        {
          name: "Binary Lifting / Sparse Table LCA",
          description:
            "Precompute 2^k-th ancestors for each node. Answer each query in O(log N) after O(N log N) preprocessing. Ideal for competitive programming.",
        },
      ],
      tips: [
        "Always clarify whether a node can be an ancestor of itself — most LCA problems (including LeetCode 236) allow it.",
        "For large trees with many queries, prefer offline or binary-lifting approaches over repeated DFS.",
        "When the tree is a BST, always use the BST-specific O(H) solution instead of the generic O(N) one.",
        "Watch for edge cases: p and q are the same node (return p), or one node is directly on the path to the other.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Post-order DFS naturally propagates information from leaves to root, making it ideal for LCA.",
        "The algorithm runs in O(N) time and O(H) space — optimal for a single LCA query on an arbitrary binary tree.",
        "Returning a node the moment it matches p or q is safe because any deeper occurrence of q in that subtree means the matched node is still the LCA.",
        "When both left and right recursive calls return non-null, the split point has been found — that node is definitively the LCA.",
        "For repeated queries or BSTs, specialised algorithms (binary lifting, Tarjan, BST traversal) offer significant speedups.",
        "Understanding LCA is foundational for tree distance problems, network routing, and hierarchical data queries.",
      ],
    },
  },
}

export default function TreeLcaVideo() {
  return <AlgoVideo config={config} />
}
