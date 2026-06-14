import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Binary Tree",
  subtitle: "Tree where each node has at most two children.",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Understanding Binary Trees",
      bullets: [
        "A binary tree is a hierarchical data structure composed of nodes.",
        "Each node stores a value and has at most two children: a left child and a right child.",
        "The topmost node is called the root; nodes with no children are called leaf nodes.",
        "Binary trees are the foundation for many advanced structures: BSTs, heaps, tries, and expression trees.",
        "They naturally model hierarchical relationships such as file systems, organization charts, and decision trees.",
      ],
    },

    intuition: {
      heading: "How to Think About Binary Trees",
      bullets: [
        "Think of a binary tree like a family tree — each person (node) can have at most two direct descendants.",
        "The root is the ancestor of all nodes; every other node has exactly one parent.",
        "Subtrees are themselves valid binary trees — the structure is self-similar (recursive).",
        "Height of the tree determines the maximum number of steps needed to reach any leaf from the root.",
        "A perfectly balanced binary tree with n nodes has height ⌊log₂ n⌋, making operations very efficient.",
      ],
      analogy:
        "Real-world analogy: A tournament bracket — each match (node) has exactly two participants (children), and the winner advances up the tree toward the final (root).",
    },

    walkthrough: {
      heading: "Step-by-Step: Building and Traversing a Binary Tree",
      steps: [
        {
          step: 1,
          description: "Start with an empty tree. The root pointer is null.",
        },
        {
          step: 2,
          description: "Insert node with value 1. It becomes the root of the tree.",
        },
        {
          step: 3,
          description: "Insert node 2 as the left child of root (node 1). The tree now has two nodes.",
        },
        {
          step: 4,
          description: "Insert node 3 as the right child of root (node 1). Root now has both children.",
        },
        {
          step: 5,
          description: "Insert nodes 4 and 5 as left and right children of node 2 (level 2).",
        },
        {
          step: 6,
          description: "Insert nodes 6 and 7 as left and right children of node 3 (level 2). Tree is now complete.",
        },
        {
          step: 7,
          description:
            "In-Order Traversal (Left → Root → Right): Visit 4, then 2, then 5, then 1, then 6, then 3, then 7.",
        },
        {
          step: 8,
          description:
            "Pre-Order Traversal (Root → Left → Right): Visit 1, 2, 4, 5, 3, 6, 7. Useful for copying or serializing the tree.",
        },
        {
          step: 9,
          description:
            "Post-Order Traversal (Left → Right → Root): Visit 4, 5, 2, 6, 7, 3, 1. Useful for deletion or evaluating expression trees.",
        },
        {
          step: 10,
          description:
            "Level-Order (BFS) Traversal: Visit nodes level by level — 1, 2, 3, 4, 5, 6, 7. Uses a queue internally.",
        },
        {
          step: 11,
          description:
            "Calculate tree height: the longest path from root to any leaf. For this 3-level tree, height = 2 (0-indexed).",
        },
        {
          step: 12,
          description:
            "Count leaf nodes (nodes with no children): nodes 4, 5, 6, 7 are all leaves. A complete binary tree with height h has 2^h leaves.",
        },
      ],
    },

    code: {
      heading: "Binary Tree Implementation in Python",
      snippet: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert_level_order(self, values):
        if not values:
            return
        self.root = TreeNode(values[0])
        queue = [self.root]
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

    def inorder(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.inorder(node.left, result)
            result.append(node.val)
            self.inorder(node.right, result)
        return result

    def height(self, node):
        if node is None:
            return -1
        return 1 + max(self.height(node.left), self.height(node.right))

# Usage
bt = BinaryTree()
bt.insert_level_order([1, 2, 3, 4, 5, 6, 7])
print(bt.inorder(bt.root))   # [4, 2, 5, 1, 6, 3, 7]
print(bt.height(bt.root))    # 2`,
      annotations: [
        {
          lines: "1-4",
          note: "TreeNode is the building block — stores a value and left/right child pointers (None by default).",
        },
        {
          lines: "13-25",
          note: "insert_level_order builds the tree from a list using BFS, filling left before right at each level.",
        },
        {
          lines: "27-34",
          note: "inorder performs Left→Root→Right traversal recursively, accumulating results in a list.",
        },
        {
          lines: "36-39",
          note: "height computes the longest root-to-leaf path. Base case: None node returns -1 so a single node returns height 0.",
        },
        {
          lines: "42-45",
          note: "Usage example: builds the 7-node complete binary tree and prints in-order result and height.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(1)", description: "Access root node directly" },
        { case: "Average", complexity: "O(n)", description: "Traversal visits all n nodes" },
        { case: "Worst", complexity: "O(n)", description: "Skewed tree degenerates to a linked list" },
      ],
      spaceRows: [
        { operation: "Storage", complexity: "O(n)", description: "One node object per element" },
        { operation: "Traversal stack", complexity: "O(h)", description: "h = height; O(log n) balanced, O(n) skewed" },
        { operation: "BFS queue", complexity: "O(w)", description: "w = max width of the tree" },
      ],
      insights: [
        "A balanced binary tree with n nodes has height O(log n), making recursive operations use O(log n) stack space.",
        "In the worst case (a completely skewed tree), height equals n−1 and all operations degrade to O(n).",
        "Level-order traversal uses O(n/2) = O(n) queue space at the widest level of a complete binary tree.",
      ],
    },

    variations: {
      heading: "Variations & Related Structures",
      items: [
        {
          name: "Binary Search Tree (BST)",
          description:
            "A binary tree where left child < parent < right child. Enables O(log n) search, insert, and delete on balanced trees.",
        },
        {
          name: "AVL Tree",
          description:
            "A self-balancing BST that maintains a height difference of at most 1 between left and right subtrees, guaranteeing O(log n) operations.",
        },
        {
          name: "Binary Heap",
          description:
            "A complete binary tree satisfying the heap property (max-heap or min-heap). Used to implement priority queues in O(log n) time.",
        },
        {
          name: "Full Binary Tree",
          description: "Every node has exactly 0 or 2 children. No node has only one child. Used in Huffman encoding.",
        },
        {
          name: "Perfect Binary Tree",
          description:
            "All interior nodes have two children and all leaves are at the same level. Contains exactly 2^(h+1) − 1 nodes.",
        },
      ],
      tips: [
        "Use recursion for tree problems — the recursive structure of trees maps naturally to recursive algorithms.",
        "Always handle the null/None base case first in recursive tree functions to avoid runtime errors.",
        "For balanced tree guarantees in production, prefer AVL trees or Red-Black trees over plain BSTs.",
        "BFS (level-order) is ideal when you need to process nodes by depth, e.g., finding the minimum depth or zigzag traversal.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "A binary tree is a recursive data structure where each node has at most two children (left and right).",
        "Three depth-first traversals exist: in-order (L→N→R), pre-order (N→L→R), and post-order (L→R→N).",
        "Level-order (BFS) traversal visits nodes level by level using a queue.",
        "Tree height h determines recursion depth; balanced trees have h = O(log n) while skewed trees have h = O(n).",
        "Binary trees are the foundation for BSTs, heaps, tries, segment trees, and expression trees.",
        "Always consider balance: an unbalanced binary tree loses the O(log n) advantage and degrades to O(n) performance.",
      ],
    },
  },
}

export default function BinaryTreeVideo() {
  return <AlgoVideo config={config} />
}
