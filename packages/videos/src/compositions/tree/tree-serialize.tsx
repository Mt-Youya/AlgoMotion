import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Serialize / Deserialize Tree",
  subtitle: "Encode a binary tree to a string and decode it back using BFS level-order encoding.",
  category: "tree",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is Tree Serialization?",
      bullets: [
        "Given a binary tree, serialization converts it into a flat string representation that uniquely captures the tree's structure and node values.",
        "Deserialization is the reverse: given the encoded string, reconstruct the exact original binary tree — same topology, same values.",
        "The challenge is handling null (missing) children correctly so the decoder can distinguish between a leaf node and an internal node with absent children.",
        "BFS level-order encoding visits nodes level by level using a queue, emitting each node's value or a null marker '#' for absent children.",
        "This is a fundamental operation for persisting trees to disk, sending them over a network, or caching them in a key-value store.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of the tree as a blueprint: serialization photographs the blueprint into a string; deserialization rebuilds the structure from the photo.",
        "BFS naturally produces a level-order token list — each parent's children appear in a predictable position relative to the parent's index in the queue.",
        "The key insight is that null markers must be included in the output so the decoder knows when a subtree is absent, preserving structural information.",
        "During deserialization, we re-use the same BFS queue: pop a parent, then consume the next two tokens as its left and right children (or null).",
        "Because BFS processes every node exactly once in both directions, both encode and decode run in O(n) time with O(n) space for the queue and token list.",
      ],
      analogy:
        "Imagine describing a family tree over the phone. You say each person's name level by level — grandparents first, then parents, then children. When someone has no child you say 'none'. The listener on the other end can reconstruct the exact same family tree just from your spoken list, because the order and the 'none' markers together encode the full structure.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start with the tree rooted at node 1. Initialize the BFS queue with [1] and an empty token list. The queue drives both serialization and deserialization.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["yellow", "white", "white", "white", "white", "white", "white"],
          },
        },
        {
          step: 2,
          description:
            "Dequeue node 1. Emit token '1'. Enqueue its children: left=2, right=3. Queue is now [2, 3]. Output so far: '1'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "yellow", "yellow", "white", "white", "white", "white"],
          },
        },
        {
          step: 3,
          description:
            "Dequeue node 2. Emit token '2'. Enqueue left=4, right=5. Queue is now [3, 4, 5]. Output: '1,2'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "yellow", "yellow", "yellow", "white", "white"],
          },
        },
        {
          step: 4,
          description:
            "Dequeue node 3. Emit token '3'. Left child is None → enqueue None; right=6 → enqueue 6. Queue: [4, 5, None, 6]. Output: '1,2,3'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "green", "yellow", "yellow", "yellow", "yellow"],
          },
        },
        {
          step: 5,
          description:
            "Dequeue node 4. Emit '4'. Both children are None → enqueue None, None. Output: '1,2,3,4'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "green", "green", "yellow", "yellow", "yellow"],
          },
        },
        {
          step: 6,
          description:
            "Dequeue node 5. Emit '5'. Both children None → enqueue None, None. Output: '1,2,3,4,5'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "green", "green", "green", "yellow", "yellow"],
          },
        },
        {
          step: 7,
          description:
            "Dequeue None (left child of 3). Emit '#'. Do NOT enqueue any children for null nodes. Output: '1,2,3,4,5,#'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "green", "green", "green", "green", "yellow"],
          },
        },
        {
          step: 8,
          description:
            "Dequeue node 6. Emit '6'. Both children None → emit '#','#'. Queue drains. Final serialized string: '1,2,3,4,5,#,6,#,#,#,#'.",
          array: {
            values: [1, 2, 3, 4, 5, "#", 6],
            colors: ["green", "green", "green", "green", "green", "green", "green"],
          },
        },
        {
          step: 9,
          description:
            "Deserialization: split the string by ',' to get tokens. Create root from token[0]='1'. Push root into a BFS queue. Index i = 1.",
          array: {
            values: ["1", "2", "3", "4", "5", "#", "6", "#", "#", "#", "#"],
            colors: ["yellow", "white", "white", "white", "white", "white", "white", "white", "white", "white", "white"],
          },
        },
        {
          step: 10,
          description:
            "Pop node 1 from queue. tokens[1]='2' → create left child 2 and enqueue it. tokens[2]='3' → create right child 3 and enqueue it. i advances to 3.",
          array: {
            values: ["1", "2", "3", "4", "5", "#", "6", "#", "#", "#", "#"],
            colors: ["green", "yellow", "yellow", "white", "white", "white", "white", "white", "white", "white", "white"],
          },
        },
        {
          step: 11,
          description:
            "Pop node 2. tokens[3]='4' → left child 4. tokens[4]='5' → right child 5. Both enqueued. Pop node 3. tokens[5]='#' → left=None. tokens[6]='6' → right child 6 enqueued.",
          array: {
            values: ["1", "2", "3", "4", "5", "#", "6", "#", "#", "#", "#"],
            colors: ["green", "green", "green", "green", "green", "green", "green", "white", "white", "white", "white"],
          },
        },
        {
          step: 12,
          description:
            "Continue consuming remaining '#' tokens for leaf nodes 4, 5, 6. Queue drains. The reconstructed tree is identical to the original. Deserialization complete.",
          array: {
            values: ["1", "2", "3", "4", "5", "#", "6", "#", "#", "#", "#"],
            colors: ["green", "green", "green", "green", "green", "green", "green", "green", "green", "green", "green"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from collections import deque
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        """BFS level-order encode; null nodes become '#'."""
        if root is None:
            return ""
        tokens = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node is None:
                tokens.append("#")
            else:
                tokens.append(str(node.val))
                queue.append(node.left)   # enqueue even if None
                queue.append(node.right)
        return ",".join(tokens)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        """Reconstruct tree from BFS-encoded string."""
        if not data:
            return None
        tokens = data.split(",")
        root = TreeNode(int(tokens[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(tokens):
            node = queue.popleft()
            # Left child
            if tokens[i] != "#":
                node.left = TreeNode(int(tokens[i]))
                queue.append(node.left)
            i += 1
            # Right child
            if i < len(tokens) and tokens[i] != "#":
                node.right = TreeNode(int(tokens[i]))
                queue.append(node.right)
            i += 1
        return root
`,
      annotations: [
        {
          lines: [14, 15, 16, 17],
          note: "Serialization: initialize the BFS queue with the root. Null nodes are still enqueued so their '#' marker is emitted in the correct position — this is what preserves structural information.",
        },
        {
          lines: [18, 19, 20, 21, 22, 23],
          note: "For each dequeued node: if it is None, emit '#' and stop (no children to enqueue). Otherwise emit its value and enqueue both children, even if they are None.",
        },
        {
          lines: [28, 29, 30],
          note: "Deserialization: split on ',' to recover the token list. Create the root from the first token and seed the BFS queue. Index i tracks which token to consume next.",
        },
        {
          lines: [32, 33, 34, 35, 36, 37, 38],
          note: "Pop a parent node, then consume the next two tokens as its left and right children. Only enqueue a child if it is not null — this mirrors the serializer's logic exactly.",
        },
        {
          lines: [39, 40, 41, 42],
          note: "Advance index i by 1 for each token consumed (left child, then right child). The loop terminates naturally when the queue is empty or all tokens are consumed.",
        },
        {
          lines: [26, 27],
          note: "Empty string guard: an empty tree serializes to '' and deserializes back to None. Always handle this edge case first to avoid index-out-of-bounds errors.",
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
            "Even a single-node tree requires one BFS pass. There is no early exit — every node must be visited to produce a complete encoding.",
        },
        {
          case: "Average",
          notation: "O(n)",
          explanation:
            "BFS visits each of the n real nodes exactly once during serialization. Null markers are O(n) in total (at most n+1 null children in any binary tree), keeping the overall pass linear.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          explanation:
            "A perfectly balanced tree with n nodes produces O(n) tokens. A degenerate (linked-list) tree also produces O(n) tokens. Both serialize and deserialize are always O(n).",
        },
      ],
      spaceRows: [
        {
          type: "BFS queue",
          notation: "O(n)",
          explanation:
            "In the worst case (complete binary tree) the last level holds n/2 nodes, so the queue holds O(n) entries simultaneously.",
        },
        {
          type: "Token list / string",
          notation: "O(n)",
          explanation:
            "The serialized string contains at most 2n+1 tokens (n real nodes + up to n+1 null markers), each of bounded length, giving O(n) string size.",
        },
        {
          type: "Reconstructed tree",
          notation: "O(n)",
          explanation:
            "Deserialization allocates exactly n TreeNode objects, one per non-null token, so output space is O(n).",
        },
      ],
      insights: [
        "BFS encoding is self-delimiting: null markers mean the decoder never needs to look ahead or backtrack — it processes tokens strictly left to right.",
        "DFS-based serialization (preorder) is also O(n) but requires two traversals (preorder + inorder) or explicit null markers to be unambiguous. BFS with null markers needs only one pass.",
        "The number of null markers in a BFS encoding equals the number of missing children, which is always exactly n+1 for a binary tree with n nodes — so the encoded length is always 2n+1 tokens.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "DFS Preorder Serialization",
          description:
            "Serialize using recursive DFS: emit the current node's value (or '#' for null), then recurse left, then right. Deserialization reads tokens in the same preorder and reconstructs via recursion. Both are O(n) but the recursive stack can hit Python's recursion limit for deep trees.",
        },
        {
          name: "Compact Integer Encoding",
          description:
            "Replace the comma-separated string with a binary format: store each value as a fixed-width integer and use a sentinel value (e.g. INT_MIN) for null. This reduces the encoded size by ~50% for integer trees but requires a fixed value range.",
        },
        {
          name: "N-ary Tree Serialization",
          description:
            "Extend to trees with variable-arity children by encoding the child count before each node's children. During deserialization, read the count first, then consume that many child tokens. BFS still works; the null-marker approach generalizes naturally.",
        },
        {
          name: "Serialize with Parent Pointers",
          description:
            "If the tree nodes also hold parent pointers (common in augmented BSTs), serialize the parent index alongside each node's value. During deserialization, restore parent pointers in a second pass over the reconstructed array.",
        },
        {
          name: "LeetCode 297 — Binary Tree Serialization",
          description:
            "The canonical problem asks for any valid encode/decode pair. The BFS approach shown here passes all test cases and is the most intuitive. An alternative is the preorder DFS approach using a global index or iterator for the token stream.",
        },
      ],
      tips: [
        "Always include null markers for missing children during serialization — omitting them makes the encoding ambiguous and deserialization impossible without additional structural information.",
        "Use collections.deque instead of a list for the BFS queue: popleft() is O(1) on a deque but O(n) on a list, making the overall algorithm O(n²) with a plain list queue.",
        "When deserializing, advance the token index by exactly 2 per dequeued parent (one for left, one for right) — this invariant guarantees the decoder stays synchronized with the encoder.",
        "For very large trees, consider streaming serialization: yield tokens one at a time instead of building the full string in memory, reducing peak memory usage to O(w) where w is the maximum level width.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Tree serialization converts a binary tree to a flat string; deserialization reconstructs the original tree. Together they enable persistence, network transfer, and caching of tree data structures.",
        "BFS level-order encoding is the most intuitive approach: visit nodes level by level using a queue, emit each node's value or '#' for null children.",
        "Null markers are essential — they encode the tree's structural shape so the decoder can unambiguously assign children to the correct parent nodes.",
        "Both serialize and deserialize run in O(n) time and O(n) space, where n is the number of nodes. The encoded string always contains exactly 2n+1 tokens.",
        "The decoder mirrors the encoder's BFS queue exactly: pop a parent, consume two tokens as its children, enqueue non-null children, repeat until the queue and token stream are both exhausted.",
        "Use collections.deque for O(1) popleft operations; handle the empty-tree edge case (empty string ↔ None root) before any queue logic to avoid off-by-one errors.",
      ],
    },
  },
};

export default function TreeSerializeVideo() {
  return <AlgoVideo config={config} />;
}
