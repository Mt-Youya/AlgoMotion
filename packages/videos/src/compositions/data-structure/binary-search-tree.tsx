import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Binary Search Tree",
  subtitle: "BST enabling O(log n) search, insert, delete on average.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does a BST Solve?",
      bullets: [
        "Storing a dynamic collection of values and supporting fast search, insertion, and deletion is a fundamental challenge in computing.",
        "A sorted array supports O(log n) search via binary search, but insertion and deletion are O(n) due to shifting elements.",
        "A linked list supports O(1) insertion/deletion at known positions but requires O(n) linear scan to find elements.",
        "A Binary Search Tree (BST) bridges this gap: it maintains an ordering invariant that allows O(log n) search, insert, and delete on average — without the shifting cost of arrays.",
        "BSTs are the conceptual foundation for balanced trees (AVL, Red-Black), database B-trees, and ordered map/set implementations in standard libraries.",
      ],
    },

    intuition: {
      heading: "Building the Mental Model",
      bullets: [
        "A BST is a binary tree where every node N satisfies: all values in N's left subtree are strictly less than N, and all values in N's right subtree are strictly greater than N.",
        "This invariant means that at each node during a search, you can eliminate the entire half of the tree that cannot contain your target — exactly like binary search on a sorted array.",
        "Insertion works by following the same search path and placing the new node at the first empty slot where the invariant is preserved.",
        "Deletion is the trickiest operation: removing a leaf is trivial, removing a node with one child is a simple bypass, but removing a node with two children requires finding its inorder successor (or predecessor) to maintain the BST property.",
        "The height of the tree determines performance: a balanced BST of n nodes has height O(log n), but a degenerate BST (e.g., inserting already-sorted values) degrades to a linked list with height O(n).",
      ],
      analogy:
        "Real-world analogy: a library's card catalog organized as a decision tree. To find a book, you start at the middle drawer (root). If the title comes before the drawer's label alphabetically, you move left; if after, you move right. Each step halves the remaining search space — you never need to check every drawer.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start with an empty BST. Insert 8 as the root. Tree: [8].",
        },
        {
          step: 2,
          description:
            "Insert 4. Compare 4 < 8 → go left. Left child of 8 is empty → place 4 there. Tree: [8, 4, _].",
        },
        {
          step: 3,
          description:
            "Insert 12. Compare 12 > 8 → go right. Right child of 8 is empty → place 12 there. Tree: [8, 4, 12].",
        },
        {
          step: 4,
          description:
            "Insert 2. 2 < 8 → left to 4. 2 < 4 → left. Empty → place 2. Tree: [8, 4, 12, 2, _, _, _].",
        },
        {
          step: 5,
          description:
            "Insert 6. 6 < 8 → left to 4. 6 > 4 → right. Empty → place 6. Tree: [8, 4, 12, 2, 6, _, _].",
        },
        {
          step: 6,
          description:
            "Insert 10. 10 > 8 → right to 12. 10 < 12 → left. Empty → place 10. Tree: [8, 4, 12, 2, 6, 10, _].",
        },
        {
          step: 7,
          description:
            "Insert 14. 14 > 8 → right to 12. 14 > 12 → right. Empty → place 14. Tree: [8, 4, 12, 2, 6, 10, 14]. BST is now complete.",
        },
        {
          step: 8,
          description:
            "Search(6): Start at root 8. 6 < 8 → go left to 4. 6 > 4 → go right to 6. 6 == 6 → FOUND in 3 comparisons.",
        },
        {
          step: 9,
          description:
            "Search(7): Start at root 8. 7 < 8 → left to 4. 7 > 4 → right to 6. 7 > 6 → right. Right child of 6 is None → NOT FOUND.",
        },
        {
          step: 10,
          description:
            "Delete(4) — node with two children (2 and 6). Find inorder successor: smallest value in right subtree of 4 = 6. Replace 4's value with 6, then delete 6 from its original position.",
        },
        {
          step: 11,
          description:
            "Inorder traversal after all operations: visit 2 → 6 → 8 → 10 → 12 → 14. The output is always sorted ascending — a key BST property.",
        },
        {
          step: 12,
          description:
            "Worst case: inserting values in sorted order (1, 2, 3, 4, 5) creates a right-skewed chain. Height = n, all operations degrade to O(n). Use AVL or Red-Black trees to guarantee O(log n).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class BSTNode:
    def __init__(self, val: int):
        self.val = val
        self.left: "BSTNode | None" = None
        self.right: "BSTNode | None" = None


class BST:
    """Binary Search Tree with search, insert, and delete."""

    def __init__(self):
        self.root: BSTNode | None = None

    def search(self, val: int) -> bool:
        """Return True if val exists in the BST. O(log n) average."""
        node = self.root
        while node:
            if val == node.val:
                return True
            node = node.left if val < node.val else node.right
        return False

    def insert(self, val: int) -> None:
        """Insert val into the BST. O(log n) average."""
        if self.root is None:
            self.root = BSTNode(val)
            return
        node = self.root
        while True:
            if val < node.val:
                if node.left is None:
                    node.left = BSTNode(val)
                    return
                node = node.left
            else:
                if node.right is None:
                    node.right = BSTNode(val)
                    return
                node = node.right

    def delete(self, val: int) -> None:
        """Delete val from the BST. O(log n) average."""
        self.root = self._delete(self.root, val)

    def _delete(self, node: BSTNode | None, val: int) -> BSTNode | None:
        if node is None:
            return None
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            # Node to delete found
            if node.left is None:
                return node.right
            if node.right is None:
                return node.left
            # Two children: replace with inorder successor
            successor = node.right
            while successor.left:
                successor = successor.left
            node.val = successor.val
            node.right = self._delete(node.right, successor.val)
        return node

    def inorder(self) -> list[int]:
        """Return sorted list of all values via inorder traversal."""
        result: list[int] = []
        def _go(n: BSTNode | None) -> None:
            if n:
                _go(n.left)
                result.append(n.val)
                _go(n.right)
        _go(self.root)
        return result


# Usage
bst = BST()
for v in [8, 4, 12, 2, 6, 10, 14]:
    bst.insert(v)
print(bst.search(6))   # True
print(bst.search(7))   # False
bst.delete(4)
print(bst.inorder())   # [2, 6, 8, 10, 12, 14]
`,
      annotations: [
        {
          lines: "1-5",
          note: "BSTNode is a simple data class holding a value and optional left/right child pointers. No parent pointer is needed for basic BST operations.",
        },
        {
          lines: "16-22",
          note: "search() is an iterative while loop following the BST property at each step. At every node we either find the target or move to the correct half — O(log n) average, O(n) worst case.",
        },
        {
          lines: "24-37",
          note: "insert() walks down the tree following the same left/right decision rule and places the new node at the first empty child slot. No rebalancing is done here.",
        },
        {
          lines: "43-57",
          note: "_delete() handles three cases: (1) no children — return None, (2) one child — return that child, (3) two children — find the inorder successor (leftmost node in right subtree), copy its value, then recursively delete the successor.",
        },
        {
          lines: "59-66",
          note: "inorder() performs a recursive left-root-right traversal. For any valid BST this always returns values in sorted ascending order — useful for validation and sorted iteration.",
        },
        {
          lines: "69-74",
          note: "Usage example: insert 7 values, verify search correctness, delete node 4 (two-children case), and confirm inorder output is sorted without 4.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { operation: "search",   best: "O(1)",      average: "O(log n)", worst: "O(n)" },
        { operation: "insert",   best: "O(1)",      average: "O(log n)", worst: "O(n)" },
        { operation: "delete",   best: "O(1)",      average: "O(log n)", worst: "O(n)" },
        { operation: "inorder",  best: "O(n)",      average: "O(n)",     worst: "O(n)" },
        { operation: "min/max",  best: "O(1)",      average: "O(log n)", worst: "O(n)" },
      ],
      spaceRows: [
        { label: "Tree storage",            complexity: "O(n)" },
        { label: "Recursive call stack",    complexity: "O(h) = O(log n) avg, O(n) worst" },
        { label: "Iterative search/insert", complexity: "O(1)" },
      ],
      insights: [
        "All O(log n) average-case bounds assume the tree is reasonably balanced. Inserting values in sorted or reverse-sorted order produces a degenerate tree with O(n) height, destroying the logarithmic guarantee.",
        "Self-balancing BST variants (AVL Tree, Red-Black Tree) enforce O(log n) height at all times through rotations, guaranteeing O(log n) worst-case for all operations.",
        "The recursive delete implementation uses O(h) stack space. For very deep trees, an iterative approach or a parent-pointer strategy avoids stack overflow.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "AVL Tree",
          description:
            "A self-balancing BST that maintains a balance factor (|height(left) - height(right)| ≤ 1) at every node. Performs single and double rotations on insert/delete to restore balance, guaranteeing O(log n) worst-case height.",
        },
        {
          name: "Red-Black Tree",
          description:
            "A self-balancing BST that colors each node red or black and enforces five invariants to bound height at 2 log(n+1). Used in Java's TreeMap, C++ std::map, and Linux's CFS scheduler. Slightly faster insertions than AVL due to fewer rotations.",
        },
        {
          name: "B-Tree / B+ Tree",
          description:
            "Generalized BST where each node can hold multiple keys and have many children. Designed for disk-based storage (databases, file systems) to minimize I/O operations by keeping the tree wide and shallow.",
        },
        {
          name: "Treap",
          description:
            "A randomized BST that assigns each node a random priority and maintains both BST key order and heap priority order simultaneously. Achieves O(log n) expected height with simple implementation and no explicit rebalancing logic.",
        },
        {
          name: "Splay Tree",
          description:
            "A self-adjusting BST that moves recently accessed nodes to the root via splay operations. Provides O(log n) amortized cost for all operations and exhibits excellent cache performance for workloads with temporal locality.",
        },
      ],
      tips: [
        "Always consider whether you need a balanced BST. If insertion order is unpredictable, use Python's sortedcontainers.SortedList or Java's TreeMap (Red-Black Tree) instead of a plain BST.",
        "For interview problems, BST questions often reduce to: (1) validate BST property using inorder traversal, (2) find kth smallest using inorder, (3) find LCA using the BST property to navigate left/right.",
        "The inorder successor of a node is either the leftmost node in its right subtree (if right child exists) or the first ancestor for which the node is in the left subtree. Both cases are O(h).",
        "Deleting from a BST is the hardest operation to implement correctly. The two-children case is a common source of bugs — always use the inorder successor (or predecessor) and recursively delete it, never just overwrite pointers.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A BST stores values such that for every node, all left descendants are smaller and all right descendants are larger — enabling binary search on a dynamic dataset.",
        "Search, insert, and delete all run in O(log n) average time by halving the search space at each node, but degrade to O(n) on a degenerate (unbalanced) tree.",
        "Inorder traversal of any valid BST always produces a sorted sequence — this property is frequently used to validate BST correctness and to iterate in sorted order.",
        "Deletion with two children requires replacing the node with its inorder successor (smallest value in the right subtree) and recursively deleting that successor.",
        "Plain BSTs are vulnerable to worst-case O(n) behavior from sorted input; use self-balancing variants (AVL, Red-Black) when worst-case guarantees matter.",
        "BSTs are the conceptual backbone of ordered maps, sets, databases (B-trees), and many range-query data structures — understanding them deeply unlocks a wide class of algorithms.",
      ],
    },
  },
};

export default function BinarySearchTreeVideo() {
  return <AlgoVideo config={config} />;
}
