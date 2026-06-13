import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Level Order Traversal",
  subtitle: "Traverse a binary tree level by level using BFS.",
  category: "tree",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Level Order Traversal?",
      bullets: [
        "Given a binary tree, visit every node exactly once in level order.",
        "Level 0 contains only the root; level 1 contains its children; and so on.",
        "Within each level, nodes are visited from left to right.",
        "The output is a flat list (or a list of lists) of node values in BFS order.",
        "This is the canonical application of a queue data structure on trees.",
      ],
    },

    intuition: {
      heading: "Why Does BFS Give Level Order?",
      bullets: [
        "A queue is FIFO — the first node enqueued is the first node processed.",
        "Enqueue the root, then for each dequeued node enqueue its children.",
        "Because children are always enqueued after the current level is processed, the queue naturally groups nodes by depth.",
        "To separate levels, record the queue size at the start of each iteration — that many dequeues constitute one complete level.",
        "The queue holds at most O(w) nodes at once, where w is the maximum width of the tree.",
      ],
      analogy:
        "Think of a water wave spreading outward from a stone dropped in a pond. The root is the impact point; each concentric ring is a new level, and every point on the same ring is reached at the same time.",
    },

    walkthrough: {
      heading: "Step-by-Step BFS Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with tree: root=1, children 2 and 3; 2 has children 4,5; 3 has children 6,7.",
        },
        {
          step: 2,
          description: "Initialize an empty queue and enqueue the root node (value 1). result = [].",
        },
        {
          step: 3,
          description: "Queue = [1]. Dequeue 1, add to current level. Enqueue children 2 and 3. Level result = [1].",
        },
        {
          step: 4,
          description: "Append [1] to result. result = [[1]]. Queue = [2, 3].",
        },
        {
          step: 5,
          description: "Queue size = 2. Dequeue 2, enqueue children 4 and 5. Dequeue 3, enqueue children 6 and 7. Level = [2, 3].",
        },
        {
          step: 6,
          description: "Append [2, 3] to result. result = [[1], [2, 3]]. Queue = [4, 5, 6, 7].",
        },
        {
          step: 7,
          description: "Queue size = 4. Dequeue 4 (no children), dequeue 5 (no children), dequeue 6 (no children), dequeue 7 (no children). Level = [4, 5, 6, 7].",
        },
        {
          step: 8,
          description: "Append [4, 5, 6, 7] to result. result = [[1], [2, 3], [4, 5, 6, 7]]. Queue is empty.",
        },
        {
          step: 9,
          description: "Queue is empty — traversal complete. Final output: [[1], [2, 3], [4, 5, 6, 7]].",
        },
        {
          step: 10,
          description: "Each sublist represents one level of the tree. The algorithm visited all 7 nodes in O(n) time.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from collections import deque
from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def level_order(root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result: List[List[int]] = []
    queue: deque[TreeNode] = deque([root])

    while queue:
        level_size = len(queue)   # number of nodes at current level
        level_vals: List[int] = []

        for _ in range(level_size):
            node = queue.popleft()
            level_vals.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level_vals)

    return result`,
      annotations: [
        {
          lines: [1, 2],
          note: "deque from collections gives O(1) popleft, unlike a plain list which is O(n).",
        },
        {
          lines: [13, 14],
          note: "Guard against an empty tree — return an empty list immediately.",
        },
        {
          lines: [17],
          note: "Seed the queue with the root so the while loop can begin processing.",
        },
        {
          lines: [20],
          note: "Snapshot the current queue length to know exactly how many nodes belong to this level.",
        },
        {
          lines: [23, 24],
          note: "popleft() dequeues in FIFO order, ensuring left-to-right processing within each level.",
        },
        {
          lines: [26, 27, 28, 29],
          note: "Only enqueue non-null children; this prevents NoneType errors and keeps the queue clean.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", notation: "O(n)", note: "Single-node tree — still must visit it." },
        { case: "Average", notation: "O(n)", note: "Every node is enqueued and dequeued exactly once." },
        { case: "Worst", notation: "O(n)", note: "Perfectly balanced or completely skewed tree." },
      ],
      spaceRows: [
        { label: "Queue", notation: "O(w)", note: "w = max width; at most one full level in the queue at a time." },
        { label: "Result list", notation: "O(n)", note: "Stores all node values across all levels." },
        { label: "Call stack", notation: "O(1)", note: "Iterative BFS uses no recursion stack." },
      ],
      insights: [
        "For a complete binary tree the maximum width w = n/2 (last level), so queue space is O(n) in the worst case.",
        "Compared to DFS (O(h) stack space where h = height), BFS can use more memory on wide, shallow trees.",
        "The level-size snapshot trick avoids needing a sentinel value or two queues to detect level boundaries.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Zigzag Level Order",
          description:
            "Alternate the direction of traversal at each level (left-to-right, then right-to-left). Solved by reversing odd-indexed level lists.",
        },
        {
          name: "Right Side View",
          description:
            "Return only the last node of each level — the node visible when looking at the tree from the right.",
        },
        {
          name: "Average of Levels",
          description:
            "Compute the arithmetic mean of node values at each level and return the list of averages.",
        },
        {
          name: "Maximum Width of Binary Tree",
          description:
            "Track the leftmost and rightmost non-null positions at each level using index encoding to find the widest level.",
        },
        {
          name: "Connect Next Right Pointers",
          description:
            "Populate each node's 'next' pointer to point to the next node in the same level, using BFS level grouping.",
        },
      ],
      tips: [
        "Always use collections.deque (not list) for the BFS queue to get O(1) popleft.",
        "The level-size snapshot (level_size = len(queue)) is the cleanest way to separate levels without extra data structures.",
        "For very deep trees, iterative BFS avoids Python's default recursion limit of 1000.",
        "When the problem asks for a flat list instead of a list-of-lists, simply skip the level grouping and append directly to result.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Level order traversal is BFS applied to a tree — use a queue, not a stack.",
        "Every node is visited exactly once, giving O(n) time and O(n) space overall.",
        "The level-size snapshot pattern cleanly separates levels without sentinels or dual queues.",
        "BFS space cost is proportional to the tree's maximum width, not its height.",
        "This pattern is the foundation for dozens of LeetCode tree problems — master it once, apply it everywhere.",
        "When in doubt about traversal order, draw the queue state after each step to verify correctness.",
      ],
    },
  },
};

export default function TreeLevelOrderVideo() {
  return <AlgoVideo config={config} />;
}
