import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "AVL Tree",
  subtitle: "Self-balancing BST guaranteeing O(log n) operations.",
  category: "data-structure",
  difficulty: "advanced",

  chapters: [
    {
      type: "problem",
      heading: "The Problem with Unbalanced BSTs",
      bullets: [
        "A standard Binary Search Tree degrades to O(n) when insertions are sorted or nearly sorted.",
        "For example, inserting 1, 2, 3, 4, 5 in order creates a linked-list-shaped tree with height n.",
        "Search, insert, and delete all depend on the tree's height — a skewed tree destroys performance.",
        "We need a BST that automatically keeps itself balanced after every insertion or deletion.",
        "The AVL Tree solves this by enforcing a strict height-balance property at every single node.",
      ],
    },
    {
      type: "intuition",
      heading: "The Intuition Behind AVL Trees",
      bullets: [
        "Every node tracks a 'balance factor': the difference between the height of its left and right subtrees.",
        "AVL invariant: every node's balance factor must be -1, 0, or +1. Any deviation triggers a fix.",
        "When an insertion or deletion breaks the invariant, we restore it with O(1) tree rotations.",
        "Rotations restructure a small portion of the tree locally — the rest of the tree is untouched.",
        "Because height is always O(log n), all BST operations remain guaranteed O(log n) in the worst case.",
      ],
      analogy:
        "Think of an AVL Tree like a mobile hanging from the ceiling. Each arm must stay roughly balanced. If you hang a weight on one side, you adjust the arm lengths locally to restore equilibrium — you don't rebuild the entire mobile.",
    },
    {
      type: "walkthrough",
      heading: "Walkthrough: Inserting 3, 2, 1, 4, 5 into an AVL Tree",
      steps: [
        {
          step: 1,
          title: "Insert 3",
          description: "3 becomes the root. Height = 1, Balance Factor = 0. Tree is balanced.",
        },
        {
          step: 2,
          title: "Insert 2",
          description: "2 < 3, goes to left child of 3. BF(3) = 1. Still within [-1, 1]. No rotation needed.",
        },
        {
          step: 3,
          title: "Insert 1",
          description: "1 < 2, goes to left child of 2. BF(2) = 1, BF(3) = 2. Invariant VIOLATED at node 3.",
        },
        {
          step: 4,
          title: "Detect LL Case",
          description: "The imbalance is in the left subtree of the left child of 3 — this is the LL case.",
        },
        {
          step: 5,
          title: "Right Rotation at Node 3",
          description:
            "Perform a right rotation: 2 becomes the new root, 1 is its left child, 3 is its right child. All BFs = 0.",
        },
        {
          step: 6,
          title: "Insert 4",
          description: "4 > 3, goes to right child of 3. BF(3) = -1, BF(2) = 0. Tree is balanced.",
        },
        {
          step: 7,
          title: "Insert 5",
          description: "5 > 4, goes to right child of 4. BF(4) = -1, BF(3) = -2. Invariant VIOLATED at node 3.",
        },
        {
          step: 8,
          title: "Detect RR Case",
          description: "The imbalance is in the right subtree of the right child of 3 — this is the RR case.",
        },
        {
          step: 9,
          title: "Left Rotation at Node 3",
          description:
            "Perform a left rotation: 4 becomes the new subtree root, 3 is its left child, 5 is its right child.",
        },
        {
          step: 10,
          title: "Final Tree",
          description:
            "Root=2, left=1, right=4, 4's left=3, 4's right=5. All balance factors are in [-1,1]. Height = 3 = O(log 5).",
        },
      ],
    },
    {
      type: "code",
      heading: "AVL Tree Implementation in Python",
      language: "python",
      code: `class AVLNode:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None
        self.height = 1

class AVLTree:
    def _height(self, node):
        return node.height if node else 0

    def _balance_factor(self, node):
        return self._height(node.left) - self._height(node.right)

    def _update_height(self, node):
        node.height = 1 + max(self._height(node.left), self._height(node.right))

    def _right_rotate(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        self._update_height(z)
        self._update_height(y)
        return y

    def _left_rotate(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        self._update_height(z)
        self._update_height(y)
        return y

    def insert(self, node, key):
        if not node:
            return AVLNode(key)
        if key < node.key:
            node.left = self.insert(node.left, key)
        elif key > node.key:
            node.right = self.insert(node.right, key)
        else:
            return node  # duplicate keys not allowed

        self._update_height(node)
        bf = self._balance_factor(node)

        # LL Case
        if bf > 1 and key < node.left.key:
            return self._right_rotate(node)
        # RR Case
        if bf < -1 and key > node.right.key:
            return self._left_rotate(node)
        # LR Case
        if bf > 1 and key > node.left.key:
            node.left = self._left_rotate(node.left)
            return self._right_rotate(node)
        # RL Case
        if bf < -1 and key < node.right.key:
            node.right = self._right_rotate(node.right)
            return self._left_rotate(node)

        return node`,
      annotations: [
        {
          lines: "1-6",
          note: "AVLNode stores key, left/right children, and height. Height starts at 1 for a new leaf.",
        },
        {
          lines: "11-13",
          note: "_balance_factor computes left height minus right height. A value outside [-1, 1] signals imbalance.",
        },
        {
          lines: "18-26",
          note: "_right_rotate handles the LL case. The left child (y) rises to replace the unbalanced node (z). Heights are updated bottom-up.",
        },
        {
          lines: "34-37",
          note: "After a standard BST insert, we update the current node's height and compute its balance factor.",
        },
        {
          lines: "39-50",
          note: "Four rotation cases: LL and RR are single rotations. LR and RL are double rotations — first fix the child, then fix the current node.",
        },
        {
          lines: "52",
          note: "If no imbalance is detected, return the node unchanged. The tree was already balanced at this level.",
        },
      ],
    },
    {
      type: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(log n)", note: "Tree is perfectly balanced" },
        { case: "Average", complexity: "O(log n)", note: "Guaranteed by AVL invariant" },
        { case: "Worst", complexity: "O(log n)", note: "Even for sorted input — unlike plain BST" },
      ],
      spaceRows: [
        { label: "Space (tree storage)", complexity: "O(n)", note: "One node per element" },
        { label: "Space (recursion stack)", complexity: "O(log n)", note: "Recursion depth bounded by tree height" },
      ],
      insights: [
        "The AVL invariant guarantees tree height ≤ 1.44 × log₂(n+2) — always O(log n).",
        "Each insertion or deletion triggers at most O(log n) balance-factor checks and at most 2 rotations.",
        "AVL trees offer faster lookups than Red-Black trees because they are more strictly balanced, but slightly slower inserts/deletes due to more frequent rotations.",
      ],
    },
    {
      type: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Red-Black Tree",
          description:
            "A looser self-balancing BST that allows height up to 2×log(n). Fewer rotations on insert/delete — preferred in most standard library implementations (e.g., Java TreeMap, C++ std::map).",
        },
        {
          name: "Weight-Balanced Tree",
          description:
            "Balances based on the number of nodes in subtrees rather than height. Useful when rank/order-statistic queries are frequent.",
        },
        {
          name: "Scapegoat Tree",
          description:
            "Rebuilds subtrees from scratch when imbalance is detected. Simpler to implement — no per-node metadata needed, but uses amortized O(log n) rather than worst-case.",
        },
        {
          name: "Treap",
          description:
            "Combines BST keys with random priorities to achieve expected O(log n) balance without explicit rebalancing logic. Elegant and easy to implement.",
        },
        {
          name: "B-Tree / B+ Tree",
          description:
            "Generalization to n-ary trees used in databases and file systems. Keeps data sorted and allows searches, insertions, and deletions in O(log n) with very cache-friendly access patterns.",
        },
      ],
      tips: [
        "Use AVL trees when your workload is read-heavy — the tighter balance means fewer comparisons per lookup.",
        "For write-heavy workloads (many inserts/deletes), consider Red-Black trees to reduce rotation overhead.",
        "Always update heights bottom-up after insertion — never top-down. The recursion stack naturally handles this.",
        "When implementing deletion, the trickiest case is removing a node with two children: replace it with its in-order successor, then rebalance up the tree.",
      ],
    },
    {
      type: "summary",
      heading: "Key Takeaways",
      bullets: [
        "AVL Trees maintain a balance factor of -1, 0, or +1 at every node, guaranteeing O(log n) height.",
        "After every insertion or deletion, heights are updated and balance factors are checked on the path back to the root.",
        "Four rotation types (LL, RR, LR, RL) restore balance in O(1) time; at most O(log n) rotations occur per operation.",
        "Unlike a plain BST, AVL Trees guarantee O(log n) worst-case for search, insert, and delete — even on sorted input.",
        "The trade-off vs. Red-Black Trees: AVL is faster for lookups, Red-Black is faster for mutations.",
        "AVL Trees are foundational — understanding them deeply prepares you for all other self-balancing tree structures.",
      ],
    },
  ],
}

export default function AvlTreeVideo() {
  return <AlgoVideo config={config} />
}
