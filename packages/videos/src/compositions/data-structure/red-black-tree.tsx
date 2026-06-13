import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Red-Black Tree",
  subtitle: "Self-balancing BST guaranteeing O(log n) worst-case for all operations.",
  category: "data-structure",
  difficulty: "expert",

  chapters: {
    problem: {
      heading: "What Problem Does a Red-Black Tree Solve?",
      bullets: [
        "A plain Binary Search Tree (BST) degrades to O(n) when keys are inserted in sorted order — the tree becomes a linked list.",
        "Red-Black Trees add a single color bit per node and enforce five structural invariants that bound the tree height to 2·log₂(n+1).",
        "This guarantees O(log n) worst-case time for search, insertion, and deletion — unlike AVL trees which require more rotations on insert.",
        "They are the backbone of many standard-library ordered maps: C++ std::map, Java TreeMap, and Linux's CFS scheduler all use red-black trees.",
        "The five invariants: (1) every node is RED or BLACK, (2) root is BLACK, (3) NIL leaves are BLACK, (4) RED node has only BLACK children, (5) all root-to-leaf paths share the same black-height.",
      ],
    },

    intuition: {
      heading: "Intuition: Keeping the Tree Balanced",
      bullets: [
        "Think of a red-black tree as a 2-3-4 tree in disguise — RED nodes represent internal keys of a 3- or 4-node, while BLACK nodes are the separators.",
        "The 'equal black-height' invariant is the key insight: it limits how much longer one path can be compared to another (at most 2×).",
        "Insertions always start as RED to avoid breaking the black-height invariant, then fix any RED-RED violation via recoloring or rotation.",
        "Recoloring is cheap (O(1) pointer changes) and propagates upward; at most two rotations are ever needed per insertion.",
        "Real-world analogy: imagine a library where books (nodes) are tagged red or black. The rule 'no two red books in a row on any shelf' and 'every shelf has the same number of black books' ensures no shelf is ever more than twice as long as another.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step: Insert 10 into a Red-Black Tree",
      steps: [
        {
          step: 1,
          description: "Start with an empty tree. Insert 13 as the root.",
          detail: "New node is always colored RED first, but the root must be BLACK — recolor it immediately.",
        },
        {
          step: 2,
          description: "Insert 8. It is less than 13, so it goes to the left.",
          detail: "8 is RED. Parent 13 is BLACK — no violation. Tree: BLACK(13) → RED(8).",
        },
        {
          step: 3,
          description: "Insert 17. It is greater than 13, placed to the right.",
          detail: "17 is RED. Parent 13 is BLACK — no violation. Tree is valid.",
        },
        {
          step: 4,
          description: "Insert 1. Traverse: 1 < 13 → left to 8; 1 < 8 → left child of 8.",
          detail: "1 is RED. Parent 8 is RED — RED-RED violation! Uncle 17 is also RED → Case 1: Recolor.",
        },
        {
          step: 5,
          description: "Case 1 Recolor: color parent (8) and uncle (17) BLACK; color grandparent (13) RED.",
          detail: "But 13 is the root, so recolor it back to BLACK. Violation resolved without any rotation.",
        },
        {
          step: 6,
          description: "Insert 11. Traverse: 11 < 13 → left to 8; 11 > 8 → right child of 8.",
          detail: "11 is RED. Parent 8 is BLACK — no violation.",
        },
        {
          step: 7,
          description: "Insert 15. Traverse: 15 > 13 → right to 17; 15 < 17 → left child of 17.",
          detail: "15 is RED. Parent 17 is BLACK — no violation.",
        },
        {
          step: 8,
          description: "Insert 25. Traverse: 25 > 13 → right to 17; 25 > 17 → right child of 17.",
          detail: "25 is RED. Parent 17 is BLACK — no violation.",
        },
        {
          step: 9,
          description: "Insert 6. Traverse: 6 < 13 → 8; 6 < 8 → 1; 6 > 1 → right child of 1.",
          detail: "6 is RED. Parent 1 is BLACK — no violation.",
        },
        {
          step: 10,
          description: "Insert 10. Traverse: 10 < 13 → 8; 10 > 8 → 11; 10 < 11 → left child of 11.",
          detail: "10 is RED. Parent 11 is BLACK — no violation. Final tree has black-height 2.",
        },
        {
          step: 11,
          description: "Verify invariants: no two consecutive RED nodes on any path.",
          detail: "All root-to-NIL paths pass through exactly 2 BLACK nodes. Tree height ≤ 4 = 2·log₂(9).",
        },
        {
          step: 12,
          description: "Result: balanced tree with O(log n) guaranteed height for all future operations.",
          detail: "At most 2 rotations and O(log n) recolorings were needed across all insertions.",
        },
      ],
    },

    code: {
      heading: "Red-Black Tree — Python Implementation",
      language: "python",
      snippet: `class Node:
    def __init__(self, val):
        self.val = val
        self.color = "RED"   # new nodes start RED
        self.left = self.right = self.parent = None

class RedBlackTree:
    def __init__(self):
        self.NIL = Node(0)          # sentinel NIL node
        self.NIL.color = "BLACK"
        self.root = self.NIL

    def insert(self, val):
        z = Node(val)
        z.left = z.right = z.parent = self.NIL
        self._bst_insert(z)
        self._fix_insert(z)

    def _bst_insert(self, z):
        y, x = self.NIL, self.root
        while x is not self.NIL:
            y = x
            x = x.left if z.val < x.val else x.right
        z.parent = y
        if y is self.NIL:
            self.root = z
        elif z.val < y.val:
            y.left = z
        else:
            y.right = z

    def _fix_insert(self, z):
        while z.parent.color == "RED":
            if z.parent is z.parent.parent.left:
                y = z.parent.parent.right          # uncle
                if y.color == "RED":               # Case 1: recolor
                    z.parent.color = y.color = "BLACK"
                    z.parent.parent.color = "RED"
                    z = z.parent.parent
                else:
                    if z is z.parent.right:        # Case 2: left-rotate parent
                        z = z.parent
                        self._rotate_left(z)
                    z.parent.color = "BLACK"       # Case 3: right-rotate grandparent
                    z.parent.parent.color = "RED"
                    self._rotate_right(z.parent.parent)
            else:                                  # mirror cases
                y = z.parent.parent.left
                if y.color == "RED":
                    z.parent.color = y.color = "BLACK"
                    z.parent.parent.color = "RED"
                    z = z.parent.parent
                else:
                    if z is z.parent.left:
                        z = z.parent
                        self._rotate_right(z)
                    z.parent.color = "BLACK"
                    z.parent.parent.color = "RED"
                    self._rotate_left(z.parent.parent)
        self.root.color = "BLACK"

    def _rotate_left(self, x):
        y = x.right
        x.right = y.left
        if y.left is not self.NIL:
            y.left.parent = x
        y.parent = x.parent
        if x.parent is self.NIL:
            self.root = y
        elif x is x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left, x.parent = x, y

    def _rotate_right(self, x):
        y = x.left
        x.left = y.right
        if y.right is not self.NIL:
            y.right.parent = x
        y.parent = x.parent
        if x.parent is self.NIL:
            self.root = y
        elif x is x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        y.right, x.parent = x, y`,
      annotations: [
        {
          lines: "1-4",
          note: "Each node stores val, color ('RED'/'BLACK'), and pointers to left, right, parent. New nodes default to RED.",
        },
        {
          lines: "6-9",
          note: "A shared sentinel NIL node (BLACK) replaces null pointers, simplifying boundary checks throughout the algorithm.",
        },
        {
          lines: "11-14",
          note: "Public insert: create a RED node, do a standard BST insert, then call _fix_insert to restore red-black properties.",
        },
        {
          lines: "22-32",
          note: "_fix_insert loops while the parent is RED (violation). Three cases: recolor (uncle RED), left-rotate + recolor, or right-rotate + recolor.",
        },
        {
          lines: "33-50",
          note: "Case 1 recolors parent and uncle BLACK, grandparent RED, then moves z up. Cases 2 & 3 perform rotations to fix the zig-zag or zig-zig shape.",
        },
        {
          lines: "54-65",
          note: "_rotate_left and _rotate_right each run in O(1) — they only rewire three pointer pairs and update the root if needed.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best",    operation: "Search / Insert / Delete", complexity: "O(log n)" },
        { case: "Average", operation: "Search / Insert / Delete", complexity: "O(log n)" },
        { case: "Worst",   operation: "Search / Insert / Delete", complexity: "O(log n)" },
      ],
      spaceRows: [
        { label: "Tree storage",    complexity: "O(n)" },
        { label: "Recursive stack", complexity: "O(log n)" },
      ],
      insights: [
        "The tree height is bounded by 2·log₂(n+1), so all path-following operations are guaranteed O(log n) — unlike plain BSTs which degrade to O(n).",
        "Insertion requires at most 2 rotations; deletion requires at most 3 rotations. Recoloring may propagate O(log n) levels but is very cache-friendly.",
        "Compared to AVL trees, red-black trees perform fewer rotations on insert/delete (faster writes) at the cost of slightly more memory per lookup (looser balance).",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Left-Leaning Red-Black Tree (LLRB)",
          description: "Restricts red links to left children only, reducing the number of cases to handle from 6 to 3. Popularized by Robert Sedgewick for teaching purposes.",
        },
        {
          name: "AVL Tree",
          description: "Stricter balance (height difference ≤ 1 per node). Faster lookups, more rotations on insert/delete. Preferred when reads dominate.",
        },
        {
          name: "2-3-4 Tree",
          description: "The conceptual isomorphism of a red-black tree. Each black node with its red children forms a 2-, 3-, or 4-node. Easier to reason about correctness.",
        },
        {
          name: "Treap",
          description: "Combines BST keys with random heap priorities to achieve expected O(log n) balance without deterministic rebalancing logic.",
        },
        {
          name: "Weight-Balanced Tree",
          description: "Balances on subtree sizes rather than height. Useful when you need order-statistics (rank/select) in O(log n) alongside standard BST ops.",
        },
      ],
      tips: [
        "Use a sentinel NIL node instead of null pointers — it eliminates many boundary checks and makes the code significantly shorter.",
        "Always handle the 'mirror' cases (parent is right child) symmetrically; a common bug is forgetting to swap left/right in the mirror branch.",
        "When implementing deletion, the fix-up loop is more complex than insertion's — study the four deletion cases carefully before coding.",
        "In production, prefer your language's built-in ordered map (std::map, TreeMap, SortedDict) rather than rolling your own red-black tree.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "Red-Black Trees guarantee O(log n) worst-case for search, insert, and delete by enforcing five color-based structural invariants.",
        "The core insight is 'equal black-height on all paths' — this bounds tree height to 2·log₂(n+1), preventing worst-case O(n) degradation.",
        "Insertions need at most 2 rotations; deletions need at most 3. Recoloring propagates upward but is O(log n) total work.",
        "They are a practical default for ordered maps and sets in most standard libraries due to their excellent worst-case guarantees and low rotation count.",
        "The algorithm is complex to implement correctly — the 6 insert-fixup cases and 4 delete-fixup cases require careful symmetric handling.",
        "When in doubt, use the LLRB variant (left-leaning red-black tree) for a simpler implementation with identical asymptotic guarantees.",
      ],
    },
  },
};

export default function RedBlackTreeVideo() {
  return <AlgoVideo config={config} />;
}
