import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Tree DP: Diameter",
  subtitle: "Find diameter of a binary tree using tree DP.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given the root of a binary tree, return the length of the diameter of the tree.",
        "The diameter is defined as the length of the longest path between any two nodes — measured in number of edges.",
        "The path does not have to pass through the root; it can start and end at any two nodes.",
        "Example: for the tree [1, 2, 3, 4, 5, null, null, 6], the diameter is 4 (path: 6→4→2→1→3).",
        "A tree with a single node has diameter 0; a tree with two nodes has diameter 1.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "At every node, the longest path passing through it equals left_height + right_height.",
        "We compute the height of each subtree in a post-order DFS — children are processed before parents.",
        "While returning the height up the call stack, we also update a global maximum diameter.",
        "The height of a node is 1 + max(left_height, right_height); a null node has height 0.",
        "By the time DFS finishes, the global maximum captures the diameter of the entire tree.",
      ],
      analogy:
        "Think of every node as a bridge connecting its left and right subtrees. The longest road that crosses a bridge equals the depth of the left valley plus the depth of the right valley. We drive over every bridge and record the longest road we find.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Build the example tree: root=1, left subtree rooted at 2 (children 4 and 5), right child 3, node 4 has left child 6.",
        },
        {
          step: 2,
          description:
            "Initialize global_diameter = 0. Start DFS from the root in post-order (process children before the current node).",
        },
        {
          step: 3,
          description:
            "Visit node 6 (leaf). Left height = 0, right height = 0. Local diameter = 0+0 = 0. global_diameter stays 0. Return height = 1.",
        },
        {
          step: 4,
          description:
            "Visit node 4. Left child is 6 (height=1), right child is null (height=0). Local diameter = 1+0 = 1. global_diameter = max(0,1) = 1. Return height = 2.",
        },
        {
          step: 5,
          description:
            "Visit node 5 (leaf). Left height = 0, right height = 0. Local diameter = 0. global_diameter stays 1. Return height = 1.",
        },
        {
          step: 6,
          description:
            "Visit node 2. Left child is 4 (height=2), right child is 5 (height=1). Local diameter = 2+1 = 3. global_diameter = max(1,3) = 3. Return height = 3.",
        },
        {
          step: 7,
          description:
            "Visit node 3 (leaf). Left height = 0, right height = 0. Local diameter = 0. global_diameter stays 3. Return height = 1.",
        },
        {
          step: 8,
          description:
            "Visit node 1 (root). Left child is 2 (height=3), right child is 3 (height=1). Local diameter = 3+1 = 4. global_diameter = max(3,4) = 4. Return height = 4.",
        },
        {
          step: 9,
          description: "DFS complete. global_diameter = 4 is our answer. The path 6→4→2→1→3 has exactly 4 edges.",
        },
        {
          step: 10,
          description:
            "Time complexity O(n): each node is visited exactly once. Space O(h) for the recursion stack where h is the tree height.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def diameter_of_binary_tree(root: TreeNode | None) -> int:
    """Return the diameter (longest path in edges) of a binary tree."""
    global_diameter = 0

    def dfs(node: TreeNode | None) -> int:
        nonlocal global_diameter
        if node is None:
            return 0  # null node contributes 0 height

        left_h  = dfs(node.left)   # height of left subtree
        right_h = dfs(node.right)  # height of right subtree

        # Longest path through this node = left_h + right_h
        local_diameter = left_h + right_h
        global_diameter = max(global_diameter, local_diameter)

        # Return height of this subtree to the parent
        return 1 + max(left_h, right_h)

    dfs(root)
    return global_diameter


# Example usage
#         1
#        / \\
#       2   3
#      / \\
#     4   5
#    /
#   6
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
root.left.left.left = TreeNode(6)

print(diameter_of_binary_tree(root))   # Output: 4

# Edge cases
print(diameter_of_binary_tree(None))                       # 0
print(diameter_of_binary_tree(TreeNode(1)))                # 0
print(diameter_of_binary_tree(TreeNode(1, TreeNode(2))))   # 1`,
      annotations: [
        {
          lines: [9, 10],
          note: "global_diameter is captured by the nested dfs closure via nonlocal. It accumulates the maximum path length seen across all nodes.",
        },
        {
          lines: [12, 13],
          note: "Base case: a null node has height 0. Returning 0 here correctly handles missing left or right children without special-casing.",
        },
        {
          lines: [15, 16],
          note: "Post-order: compute left and right subtree heights before processing the current node. This is the essence of tree DP — use children's results to compute the parent's result.",
        },
        {
          lines: [18, 19, 20],
          note: "The diameter candidate at this node is left_h + right_h (edges going down both sides). Update the global maximum if this is larger.",
        },
        {
          lines: [22],
          note: "Return the height of this subtree (1 + max child height) so the parent can compute its own diameter. This is the DP state being propagated upward.",
        },
        {
          lines: [25, 26],
          note: "Call dfs on root to trigger the traversal, then return the accumulated global_diameter. The dfs return value (root height) is intentionally discarded.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n)",
          note: "Even a perfectly balanced tree requires visiting all n nodes once.",
        },
        {
          case: "Average",
          notation: "O(n)",
          note: "Post-order DFS visits every node exactly once regardless of tree shape.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          note: "A skewed (linear) tree still requires visiting all n nodes in sequence.",
        },
      ],
      space: [
        {
          case: "Recursion Stack",
          notation: "O(h)",
          note: "h is the height of the tree. O(log n) for balanced trees, O(n) for skewed trees.",
        },
        {
          case: "Auxiliary",
          notation: "O(1)",
          note: "Only two integer variables (left_h, right_h) are allocated per stack frame.",
        },
      ],
      insights: [
        "The single DFS pass computes both heights and the diameter simultaneously — no second traversal is needed.",
        "Space usage is proportional to tree height, not node count. A balanced tree uses only O(log n) stack frames.",
        "Iterative implementations using an explicit stack achieve the same O(n) / O(h) complexities but are significantly more complex to write.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Diameter in Weighted Trees",
          description:
            "If edges carry weights, replace the +1 height increment with +edge_weight. The diameter then represents the maximum total weight path rather than the maximum number of edges.",
        },
        {
          name: "Diameter of N-ary Tree",
          description:
            "Generalise to trees where each node can have any number of children. At each node, take the two largest child heights; their sum is the local diameter candidate.",
        },
        {
          name: "Longest Path in a DAG",
          description:
            "For directed acyclic graphs, longest-path DP on a topological order generalises the tree diameter concept to arbitrary DAGs.",
        },
        {
          name: "Tree DP: Max Path Sum",
          description:
            "Instead of counting edges, maximise the sum of node values along a path. The recurrence is the same shape: combine left and right contributions at each node.",
        },
        {
          name: "Binary Tree Maximum Path Sum (LeetCode 124)",
          description:
            "A direct extension where node values can be negative, requiring a max(0, child_contribution) guard to avoid including negative-value subtrees.",
        },
      ],
      tips: [
        "Always return the height (not the diameter) from the recursive helper — the diameter is a side effect stored in the outer variable.",
        "Use nonlocal (Python) or a mutable container (list/object) to update the global diameter from inside the recursive helper.",
        "For interview settings, clarify whether diameter is measured in edges or nodes — some problems define it as the number of nodes on the path (diameter_edges + 1).",
        "An iterative post-order traversal with an explicit stack avoids Python's recursion limit for very deep trees (n > 1000).",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "The diameter of a binary tree is the longest path (in edges) between any two nodes, and does not need to pass through the root.",
        "A single post-order DFS suffices: at each node, compute left_height + right_height as the local diameter candidate and update a global maximum.",
        "The recursive helper returns the subtree height (1 + max(left_h, right_h)), which is the DP state propagated upward to parent nodes.",
        "Time complexity is O(n) and space is O(h) — both optimal since every node must be visited at least once.",
        "The same tree DP pattern (combine two child results at each node, propagate a single value upward) applies to max path sum, tree height, and many other tree problems.",
        "When node values are involved (not just edge counts), guard against negative contributions with max(0, child_result) to keep the path positive.",
      ],
    },
  },
}

export default function TreeDpDiameterVideo() {
  return <AlgoVideo config={config} />
}
