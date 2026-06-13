import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Tree Height",
  subtitle: "Compute the maximum depth (height) of a binary tree.",
  category: "tree",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given the root of a binary tree, return its maximum depth.",
        "Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
        "A leaf node is a node with no children.",
        "An empty tree (root is null) has height 0.",
        "Example: a perfectly balanced tree with 7 nodes has height 3.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "The height of a tree is 1 + the maximum height among its subtrees.",
        "This naturally suggests a recursive (post-order) approach: solve left, solve right, combine.",
        "Base case: a null node contributes height 0.",
        "We can also use BFS level-by-level and count how many levels we traverse.",
        "Both approaches visit every node exactly once, giving O(n) time.",
      ],
      analogy:
        "Think of measuring the height of a building by counting floors. You start at the top floor (deepest leaf) and count upward. Each floor you pass adds 1 to the height. The tallest staircase from basement to roof is the building's height — just like the longest root-to-leaf path is the tree's height.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start at the root node (value = 1). We call height(root).",
        },
        {
          step: 2,
          description:
            "Recurse into the left child (node 2). Call height(node_2).",
        },
        {
          step: 3,
          description:
            "Recurse deeper into left subtree: call height(node_4), then height(node_8).",
        },
        {
          step: 4,
          description:
            "Node 8 has no children. Both recursive calls return 0. height(node_8) = 1 + max(0, 0) = 1.",
        },
        {
          step: 5,
          description:
            "Back at node 4: left subtree height = 1, right subtree height = 0. height(node_4) = 1 + max(1, 0) = 2.",
        },
        {
          step: 6,
          description:
            "Node 5 is a leaf. height(node_5) = 1 + max(0, 0) = 1.",
        },
        {
          step: 7,
          description:
            "Back at node 2: left height = 2, right height = 1. height(node_2) = 1 + max(2, 1) = 3.",
        },
        {
          step: 8,
          description:
            "Recurse into right child of root (node 3). Nodes 6 and 7 are both leaves, each returning height 1.",
        },
        {
          step: 9,
          description:
            "height(node_3) = 1 + max(1, 1) = 2.",
        },
        {
          step: 10,
          description:
            "Back at root (node 1): left height = 3, right height = 2. height(root) = 1 + max(3, 2) = 4.",
        },
        {
          step: 11,
          description:
            "The maximum depth of the tree is 4. The longest path is: 1 → 2 → 4 → 8.",
        },
      ],
    },

    code: {
      heading: "Implementation",
      snippet: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


# Approach 1: Recursive DFS (post-order)
def max_depth(root: TreeNode | None) -> int:
    if root is None:
        return 0
    left_height  = max_depth(root.left)
    right_height = max_depth(root.right)
    return 1 + max(left_height, right_height)


# Approach 2: Iterative BFS (level-order)
from collections import deque

def max_depth_bfs(root: TreeNode | None) -> int:
    if root is None:
        return 0
    queue = deque([root])
    depth = 0
    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return depth


# Approach 3: Iterative DFS with explicit stack
def max_depth_stack(root: TreeNode | None) -> int:
    if root is None:
        return 0
    stack = [(root, 1)]
    max_d = 0
    while stack:
        node, depth = stack.pop()
        max_d = max(max_d, depth)
        if node.left:
            stack.append((node.left, depth + 1))
        if node.right:
            stack.append((node.right, depth + 1))
    return max_d
`,
      annotations: [
        {
          lines: [10, 11],
          note: "Base case: a null node has height 0. This terminates the recursion at every leaf's children.",
        },
        {
          lines: [12, 13],
          note: "Post-order traversal: fully solve left and right subtrees before computing the current node's height.",
        },
        {
          lines: [14],
          note: "The current node adds 1 level; we take the deeper of the two subtrees with max().",
        },
        {
          lines: [21, 22],
          note: "BFS processes one level at a time. The inner for-loop drains exactly the nodes at the current depth.",
        },
        {
          lines: [23, 24, 25, 26],
          note: "Enqueue children for the next level. When the queue empties, depth holds the total number of levels.",
        },
        {
          lines: [33, 34],
          note: "The iterative DFS stack stores (node, current_depth) pairs, tracking depth explicitly without recursion overhead.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        { case: "Best",    complexity: "O(n)", note: "Must visit every node regardless of shape" },
        { case: "Average", complexity: "O(n)", note: "All n nodes are visited exactly once" },
        { case: "Worst",   complexity: "O(n)", note: "Skewed tree — still O(n) nodes to visit" },
      ],
      space: [
        { case: "Recursive DFS", complexity: "O(h)", note: "Call stack depth equals tree height h" },
        { case: "BFS queue",     complexity: "O(w)", note: "w = maximum width (nodes at widest level)" },
        { case: "Worst (skewed)", complexity: "O(n)", note: "h = n for a completely skewed tree" },
      ],
      insights: [
        "For a balanced tree, h = O(log n), so recursive DFS uses O(log n) stack space.",
        "BFS can use more memory than DFS on wide trees (O(n/2) at the last level of a complete binary tree).",
        "The iterative DFS stack approach avoids Python's recursion limit (~1000 by default) for very deep trees.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Minimum Depth",
          description:
            "Find the shortest path from root to any leaf. Requires careful handling of nodes with only one child — they are not leaves.",
        },
        {
          name: "Diameter of Binary Tree",
          description:
            "The longest path between any two nodes. At each node, diameter candidate = left_height + right_height. Track the global maximum during the height DFS.",
        },
        {
          name: "Balanced Binary Tree Check",
          description:
            "A tree is height-balanced if for every node, |left_height - right_height| ≤ 1. Combine height computation with a balance flag in one DFS pass.",
        },
        {
          name: "N-ary Tree Height",
          description:
            "Generalize to trees where each node can have any number of children. Return 1 + max(height(child) for child in node.children).",
        },
        {
          name: "Height of Each Node",
          description:
            "Compute the height of every node in the tree in O(n) using a single post-order DFS, storing results in a dictionary.",
        },
      ],
      tips: [
        "Always handle the null/None base case first — it is the source of most off-by-one errors.",
        "For very deep trees in Python, use the iterative BFS or stack-based DFS to avoid RecursionError.",
        "When the problem asks for 'number of edges' instead of 'number of nodes', subtract 1 from the result.",
        "LeetCode problem 104 (Maximum Depth of Binary Tree) is the canonical version of this problem.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Tree height equals 1 + max(left subtree height, right subtree height) — a clean recursive definition.",
        "Post-order DFS is the most natural recursive solution; process children before the current node.",
        "BFS (level-order) is an elegant iterative alternative that counts levels directly.",
        "Time complexity is always O(n) — every node must be visited at least once.",
        "Space complexity is O(h) for DFS and O(w) for BFS, where h is height and w is max width.",
        "This pattern — combining results from left and right subtrees — appears in many tree problems: diameter, balance check, LCA, and more.",
      ],
    },
  },
};

export default function TreeHeightVideo() {
  return <AlgoVideo config={config} />;
}
