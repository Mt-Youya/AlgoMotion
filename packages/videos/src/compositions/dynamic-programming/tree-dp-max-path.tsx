import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Tree DP: Max Path Sum",
  subtitle: "Find maximum path sum in a binary tree using tree DP.",
  category: "dynamic-programming",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is the Maximum Path Sum Problem?",
      bullets: [
        "Given the root of a binary tree, return the maximum sum of any path in the tree.",
        "A path is defined as any sequence of nodes where each pair of adjacent nodes has an edge connecting them.",
        "Each node in the path must appear at most once — no revisiting nodes.",
        "The path does NOT need to pass through the root; it can start and end at any node in the tree.",
        "Node values can be negative, so we must decide whether including a subtree increases or decreases the path sum.",
      ],
    },

    intuition: {
      heading: "Tree DP Intuition",
      bullets: [
        "At every node, we ask two separate questions: (1) what is the best path that passes THROUGH this node? (2) what is the best single-branch gain I can return to my parent?",
        "Define gain(node) = node.val + max(0, gain(left), gain(right)). The max(0, ...) ensures we never extend downward if it hurts the sum.",
        "The best path THROUGH a node uses both children: path_sum = node.val + max(0, gain(left)) + max(0, gain(right)).",
        "We track a global maximum and update it at every node with the local path_sum. The final answer is this global max.",
        "This is a classic post-order DFS: process children first, then use their results to compute the current node's contribution.",
      ],
      analogy:
        "Imagine you are a hiker choosing a route across a mountain range. At each peak you can go left, go right, or cross over the peak connecting both valleys. You always skip a valley if it is below sea level (negative gain). The tree DP records the highest-elevation route you found while traversing every peak exactly once.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough: [-10, 9, 20, null, null, 15, 7]",
      steps: [
        {
          step: 1,
          description:
            "Build the tree from the level-order list. Root = -10, left child = 9, right child = 20. Node 20 has left child 15 and right child 7. Nodes 9, 15, and 7 are leaves.",
        },
        {
          step: 2,
          description: "Initialize global_max = -Infinity. We will update it at every node during the post-order DFS.",
        },
        {
          step: 3,
          description:
            "Visit leaf node 9 (left child of root). gain(9) = 9 + max(0) = 9. path_sum(9) = 9. Update global_max = max(-Inf, 9) = 9.",
        },
        {
          step: 4,
          description:
            "Visit leaf node 15 (left child of 20). gain(15) = 15 + max(0) = 15. path_sum(15) = 15. Update global_max = max(9, 15) = 15.",
        },
        {
          step: 5,
          description:
            "Visit leaf node 7 (right child of 20). gain(7) = 7 + max(0) = 7. path_sum(7) = 7. Update global_max = max(15, 7) = 15.",
        },
        {
          step: 6,
          description:
            "Visit internal node 20. left_gain = max(0, gain(15)) = 15. right_gain = max(0, gain(7)) = 7. path_sum(20) = 20 + 15 + 7 = 42. Update global_max = max(15, 42) = 42.",
        },
        {
          step: 7,
          description:
            "Return gain(20) to parent: gain(20) = 20 + max(15, 7) = 35. We return only the best single branch, not both, because a path cannot fork when continuing upward.",
        },
        {
          step: 8,
          description:
            "Visit root node -10. left_gain = max(0, gain(9)) = max(0, 9) = 9. right_gain = max(0, gain(20)) = max(0, 35) = 35.",
        },
        {
          step: 9,
          description:
            "path_sum(-10) = -10 + 9 + 35 = 34. Update global_max = max(42, 34) = 42. The root path does not beat the 15→20→7 path.",
        },
        {
          step: 10,
          description: "gain(-10) = -10 + max(9, 35) = 25. Since -10 is the root, this value is not returned further.",
        },
        {
          step: 11,
          description:
            "DFS complete. The global_max = 42 is the answer. The winning path is 15 → 20 → 7, which passes through node 20 but not through the root.",
        },
        {
          step: 12,
          description:
            "Note: if all node values were negative, the answer would be the single largest node value, because max(0, ...) clamps negative gains to zero, allowing any single node to be a valid path.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.global_max = float('-inf')

        def gain(node: Optional[TreeNode]) -> int:
            if node is None:
                return 0

            # Recursively get the best gain from each child.
            # Clamp to 0: never extend into a subtree that hurts the sum.
            left_gain  = max(0, gain(node.left))
            right_gain = max(0, gain(node.right))

            # Best path that passes THROUGH this node (uses both branches).
            path_through = node.val + left_gain + right_gain

            # Update the global answer.
            self.global_max = max(self.global_max, path_through)

            # Return the best single-branch gain to the parent.
            # A path cannot fork, so we pick only one child direction.
            return node.val + max(left_gain, right_gain)

        gain(root)
        return self.global_max


# Iterative post-order version using an explicit stack
def maxPathSumIterative(root: Optional[TreeNode]) -> int:
    if root is None:
        return 0

    global_max = float('-inf')
    gain_map: dict[Optional[TreeNode], int] = {None: 0}
    stack = []
    node = root

    # Build post-order traversal order
    visit_order = []
    temp_stack = [root]
    while temp_stack:
        cur = temp_stack.pop()
        visit_order.append(cur)
        if cur.left:
            temp_stack.append(cur.left)
        if cur.right:
            temp_stack.append(cur.right)

    for cur in reversed(visit_order):
        left_gain  = max(0, gain_map.get(cur.left, 0))
        right_gain = max(0, gain_map.get(cur.right, 0))
        path_through = cur.val + left_gain + right_gain
        global_max = max(global_max, path_through)
        gain_map[cur] = cur.val + max(left_gain, right_gain)

    return global_max`,
      annotations: [
        {
          lines: [11],
          note: "Initialize global_max to negative infinity so any single node value, even very negative, becomes a valid candidate.",
        },
        {
          lines: [13, 14, 15],
          note: "Base case: a null node contributes a gain of 0. This cleanly handles leaf nodes without special-casing.",
        },
        {
          lines: [18, 19],
          note: "Clamp child gains to 0 with max(0, ...). If a subtree would decrease the sum, we simply do not extend into it.",
        },
        {
          lines: [22, 23],
          note: "path_through uses BOTH left and right gains — this is the candidate for the global answer at this node. A path can bend here.",
        },
        {
          lines: [29],
          note: "Return only the best single branch to the parent. Returning both would create a fork, which is not a valid path.",
        },
        {
          lines: [33, 34],
          note: "The iterative version uses a reversed post-order traversal with a gain_map dictionary, avoiding recursion stack overflow for very deep trees.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n)",
          note: "Every node must be visited exactly once; no early termination is possible.",
        },
        {
          case: "Average",
          complexity: "O(n)",
          note: "Each node contributes constant work (two recursive calls + arithmetic). Total work is linear in the number of nodes.",
        },
        {
          case: "Worst",
          complexity: "O(n)",
          note: "Worst case is the same as best — the algorithm is unconditionally linear regardless of tree shape or values.",
        },
      ],
      spaceRows: [
        {
          case: "Recursive call stack",
          complexity: "O(h)",
          note: "h is the height of the tree. For a balanced tree h = O(log n); for a skewed tree h = O(n).",
        },
        {
          case: "Iterative (gain_map)",
          complexity: "O(n)",
          note: "The iterative version stores a gain value per node, using O(n) extra space but avoiding stack overflow.",
        },
      ],
      insights: [
        "The key insight is separating two concerns: the value returned to the parent (single branch) versus the value used to update the global answer (both branches). Conflating these two leads to incorrect solutions.",
        "Clamping child gains to 0 elegantly handles negative values without any conditional branching — it unifies the leaf-node base case and the negative-subtree pruning into one expression.",
        "For extremely deep trees (millions of nodes in a chain), the recursive version risks a Python RecursionError. The iterative post-order version solves this at the cost of O(n) extra space for the gain_map.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Maximum Path Sum with Exactly K Nodes",
          description:
            "Constrain the path to contain exactly k nodes. Requires tracking path length alongside the sum, turning the DP state into (gain, length) pairs per node.",
        },
        {
          name: "Maximum Path Sum in a General (N-ary) Tree",
          description:
            "Extend to trees where each node can have any number of children. At each node, take the top-2 positive child gains for the path-through value, and the top-1 for the return value.",
        },
        {
          name: "Minimum Path Sum",
          description:
            "Find the path with the smallest sum. Flip all max to min and clamp negative gains upward (max(0, ...) becomes min(0, ...)) to avoid extending into positive subtrees.",
        },
        {
          name: "Path Sum Between Two Specific Nodes",
          description:
            "Find the maximum-weight path between two given nodes. Use LCA (Lowest Common Ancestor) to decompose the path into two root-to-node paths, then combine their gains.",
        },
        {
          name: "Maximum Path Sum in a Weighted Graph (Diameter Variant)",
          description:
            "Generalize to undirected graphs: find the heaviest path (graph diameter by weight). Use two BFS/DFS passes on trees, or DP on DAGs for directed acyclic graphs.",
        },
      ],
      tips: [
        "Always initialize global_max to float('-inf'), not 0. If all node values are negative, the answer is the least-negative single node, not 0.",
        "Remember: the gain function returns the best single-branch extension (for the parent), while path_through (both branches) is only used to update the global answer.",
        "For Python's default recursion limit (~1000), use sys.setrecursionlimit or switch to the iterative post-order version when the tree can be very deep.",
        "When debugging, add a print at each node showing left_gain, right_gain, path_through, and global_max — the post-order sequence makes the DP state transitions easy to trace.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Tree DP on path sum requires two separate values per node: the single-branch gain returned to the parent, and the both-branch path sum used to update the global answer.",
        "Clamping child gains to 0 with max(0, gain(child)) elegantly handles negative subtrees and leaf nodes in a single expression.",
        "The algorithm runs in O(n) time and O(h) space, where h is the tree height — optimal since every node must be visited at least once.",
        "The path does not have to pass through the root; the global maximum can occur at any internal node, making a post-order traversal essential.",
        "For all-negative trees, the answer is the single maximum node value — the max(0, ...) clamping ensures this is handled correctly without special cases.",
        "This pattern — separating 'value to return upward' from 'value used for global answer' — appears in many tree DP problems: diameter, longest path, and maximum-weight subtree.",
      ],
    },
  },
}

export default function TreeDpMaxPathVideo() {
  return <AlgoVideo config={config} />
}
