import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Max-Heap",
  subtitle: "Complete binary tree with O(1) max access and O(log n) insert/extract.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Efficiently Track the Maximum Element at All Times",
      body: [
        "A Max-Heap is a complete binary tree where every parent node holds a value greater than or equal to both of its children — this is called the max-heap property.",
        "Because the largest element must always be at the root, reading the maximum is a constant-time O(1) operation: just look at the root, no traversal needed.",
        "Inserting a new element takes O(log n) time: place it at the next available leaf position to maintain completeness, then bubble it up (sift-up) until the heap property is restored.",
        "Extracting the maximum also takes O(log n) time: remove the root, move the last leaf to the root position, then push it down (sift-down) by repeatedly swapping it with its larger child.",
        "A max-heap is typically stored in a plain array without pointers. For a node at index i, its left child is at 2i+1, its right child is at 2i+2, and its parent is at floor((i-1)/2).",
      ],
      callout:
        "Max-heaps power priority queues, heap sort, Dijkstra's algorithm, and any scenario where you repeatedly need the largest element from a dynamic collection.",
    },

    intuition: {
      heading: "A Tournament Bracket Where the Champion Always Rises to the Top",
      body: [
        "Imagine a company org chart where every manager must be paid more than their direct reports. The CEO (root) is always the highest-paid person — you can read the maximum salary in O(1) without scanning the whole company.",
        "When a new high-earning employee joins, they start at the bottom of the hierarchy and get promoted level by level until they find a manager who earns more — this is sift-up, and it takes at most O(log n) promotions.",
        "When the CEO leaves, the most junior employee temporarily takes the top seat. They then get demoted step by step by swapping with whichever direct report earns more — this is sift-down, again O(log n) steps.",
        "The array representation is elegant: because the tree is always complete (filled left-to-right), no gaps exist in the array, so no pointers are needed. Index arithmetic replaces tree navigation.",
        "Building a heap from n unsorted elements takes only O(n) time — not O(n log n) — because lower nodes in the tree have less work to do during sift-down, and most nodes are near the leaves.",
      ],
      analogy:
        "Think of a hospital emergency room triage system. Patients are assigned priority numbers; the most critical patient (highest priority) is always treated first. When a new patient arrives, they are placed in the queue and their priority is compared upward. When the top patient is treated, the least urgent patient temporarily fills the top slot and then sinks to the right position. The heap ensures the next most critical patient is always instantly accessible.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initial Max-Heap",
          description:
            "We start with a valid max-heap containing [90, 70, 80, 40, 60, 50, 30]. The root holds 90, the maximum. Every parent is greater than its children. The heap is stored as a 0-indexed array.",
          array: [
            { value: 90, color: "#CEEB5A" },
            { value: 70, color: "#2255CC" },
            { value: 80, color: "#2255CC" },
            { value: 40, color: "#2255CC" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
            { value: 30, color: "#2255CC" },
          ],
        },
        {
          label: "Insert 95 — Append at End",
          description:
            "To insert 95, we first append it at index 7 (the next available leaf position, child of index 3). The tree remains complete but the heap property may be violated: 95 > parent 40.",
          array: [
            { value: 90, color: "#2255CC" },
            { value: 70, color: "#2255CC" },
            { value: 80, color: "#2255CC" },
            { value: 40, color: "#E05A3A" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
            { value: 30, color: "#2255CC" },
            { value: 95, color: "#E05A3A" },
          ],
        },
        {
          label: "Sift-Up Step 1 — Swap with Parent 40",
          description:
            "95 > 40 (its parent at index 3), so we swap them. Now 95 is at index 3 and 40 is at index 7. We continue sifting up: compare 95 with its new parent at index 1 (value 70).",
          array: [
            { value: 90, color: "#2255CC" },
            { value: 70, color: "#E05A3A" },
            { value: 80, color: "#2255CC" },
            { value: 95, color: "#E05A3A" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
            { value: 30, color: "#2255CC" },
            { value: 40, color: "#2255CC" },
          ],
        },
        {
          label: "Sift-Up Step 2 — Swap with Parent 70, then Root 90",
          description:
            "95 > 70, so we swap: 95 moves to index 1, 70 to index 3. Then 95 > root 90, so we swap again: 95 becomes the new root. Sift-up is complete — the heap property is restored.",
          array: [
            { value: 95, color: "#CEEB5A" },
            { value: 90, color: "#2255CC" },
            { value: 80, color: "#2255CC" },
            { value: 70, color: "#2255CC" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
            { value: 30, color: "#2255CC" },
            { value: 40, color: "#2255CC" },
          ],
        },
        {
          label: "Extract-Max — Remove Root 90",
          description:
            "We want to extract the maximum (90). We save 90 to return it, then move the last element (30) to the root position and shrink the heap size by 1. The heap is now [30, 70, 80, 40, 60, 50] — not yet valid.",
          array: [
            { value: 30, color: "#E05A3A" },
            { value: 70, color: "#2255CC" },
            { value: 80, color: "#2255CC" },
            { value: 40, color: "#2255CC" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
          ],
        },
        {
          label: "Sift-Down Step 1 — Swap 30 with Larger Child 80",
          description:
            "30 at the root has children 70 (index 1) and 80 (index 2). The larger child is 80. Since 30 < 80, we swap them. Now 80 is at the root and 30 is at index 2. We continue sifting down from index 2.",
          array: [
            { value: 80, color: "#CEEB5A" },
            { value: 70, color: "#2255CC" },
            { value: 30, color: "#E05A3A" },
            { value: 40, color: "#2255CC" },
            { value: 60, color: "#2255CC" },
            { value: 50, color: "#E05A3A" },
          ],
        },
        {
          label: "Sift-Down Step 2 — Swap 30 with Child 50",
          description:
            "30 at index 2 has children 50 (index 5) and no right child in range. Since 30 < 50, we swap. Now 50 is at index 2 and 30 is at index 5. 30 has no more children — sift-down complete.",
          array: [
            { value: 80, color: "#CEEB5A" },
            { value: 70, color: "#2255CC" },
            { value: 50, color: "#2255CC" },
            { value: 40, color: "#2255CC" },
            { value: 60, color: "#2255CC" },
            { value: 30, color: "#2255CC" },
          ],
        },
        {
          label: "Build Heap (Heapify) — Unsorted Input",
          description:
            "Given unsorted array [5, 3, 8, 1, 9, 2, 7], we can build a max-heap in O(n) time. Start from the last non-leaf node at index n//2 - 1 = 2, and call sift-down on each node going right to left.",
          array: [
            { value: 5, color: "#888888" },
            { value: 3, color: "#888888" },
            { value: 8, color: "#E05A3A" },
            { value: 1, color: "#888888" },
            { value: 9, color: "#888888" },
            { value: 2, color: "#888888" },
            { value: 7, color: "#888888" },
          ],
        },
        {
          label: "Build Heap — Sift-Down Each Non-Leaf",
          description:
            "Sift-down index 2 (value 8): children are 2 and 7, 8 is already largest — no swap. Sift-down index 1 (value 3): children 1 and 9, 9 is largest — swap 3 and 9. Sift-down index 0 (value 5): children 9 and 8, 9 is largest — swap 5 and 9.",
          array: [
            { value: 5, color: "#E05A3A" },
            { value: 9, color: "#E05A3A" },
            { value: 8, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Build Heap — Final Valid Max-Heap",
          description:
            "After all sift-down operations, the result is [9, 5, 8, 1, 3, 2, 7]. The root holds 9 (the maximum). Every parent is greater than its children. The heap was built in O(n) — not O(n log n).",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 5, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
      ],
    },

    code: {
      snippet: `class MaxHeap:
    def __init__(self):
        self._data: list[int] = []

    def push(self, val: int) -> None:
        self._data.append(val)
        self._sift_up(len(self._data) - 1)

    def peek(self) -> int:
        if not self._data:
            raise IndexError("heap is empty")
        return self._data[0]

    def pop(self) -> int:
        if not self._data:
            raise IndexError("heap is empty")
        self._swap(0, len(self._data) - 1)
        max_val = self._data.pop()
        self._sift_down(0)
        return max_val

    def _sift_up(self, i: int) -> None:
        while i > 0:
            parent = (i - 1) // 2
            if self._data[i] > self._data[parent]:
                self._swap(i, parent)
                i = parent
            else:
                break

    def _sift_down(self, i: int) -> None:
        n = len(self._data)
        while True:
            largest = i
            left, right = 2 * i + 1, 2 * i + 2
            if left < n and self._data[left] > self._data[largest]:
                largest = left
            if right < n and self._data[right] > self._data[largest]:
                largest = right
            if largest == i:
                break
            self._swap(i, largest)
            i = largest

    def _swap(self, i: int, j: int) -> None:
        self._data[i], self._data[j] = self._data[j], self._data[i]

    def __len__(self) -> int:
        return len(self._data)

    @staticmethod
    def heapify(arr: list[int]) -> "MaxHeap":
        h = MaxHeap()
        h._data = arr[:]
        for i in range(len(arr) // 2 - 1, -1, -1):
            h._sift_down(i)
        return h`,
      language: "python",
      annotations: [
        {
          lines: [1, 2, 3],
          note: "The backing store is a plain Python list. No tree nodes or pointers are needed — the complete-binary-tree structure is implicit in the array indices.",
        },
        {
          lines: [5, 6, 7],
          note: "push() appends the new value to the end (maintaining completeness), then calls _sift_up to restore the heap property. Amortised O(log n) per insert.",
        },
        {
          lines: [14, 15, 16, 17, 18, 19],
          note: "pop() swaps the root with the last element, removes the last element (the old max), then calls _sift_down(0) to push the new root down to its correct position. O(log n).",
        },
        {
          lines: [21, 22, 23, 24, 25, 26, 27],
          note: "_sift_up compares a node with its parent at index (i-1)//2. If the node is larger, swap and move up. Repeat until the node is smaller than its parent or reaches the root.",
        },
        {
          lines: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
          note: "_sift_down finds the largest among the node and its two children. If the node is not the largest, swap with the larger child and continue. Stops when the node is the local maximum.",
        },
        {
          lines: [44, 45, 46, 47, 48],
          note: "heapify() builds a max-heap from an arbitrary list in O(n) time. It calls sift_down from the last non-leaf (n//2-1) down to the root — lower nodes do less work, giving the O(n) bound.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "peek() — read max", value: "O(1)", color: "green" },
        { label: "push() — insert", value: "O(log n)", color: "green" },
        { label: "pop() — extract max", value: "O(log n)", color: "green" },
        { label: "heapify() — build from array", value: "O(n)", color: "green" },
        { label: "search (arbitrary element)", value: "O(n)", color: "yellow" },
      ],
      spaceRows: [
        { label: "Array storage", value: "O(n)", color: "yellow" },
        { label: "Auxiliary (sift ops)", value: "O(log n)", color: "green" },
        { label: "heapify (in-place)", value: "O(1)", color: "green" },
      ],
      notes: [
        "peek() is O(1) because the maximum is always at index 0 — the defining advantage of a max-heap over a sorted array or BST for repeated max queries.",
        "The O(n) heapify bound is tighter than it appears: nodes at depth d do at most (height - d) swaps, and summing across all nodes gives a geometric series that converges to O(n).",
        "Python's heapq module implements a min-heap; negate values (push -x, pop and negate) to simulate a max-heap, or use a wrapper class for clarity.",
      ],
    },

    variations: {
      items: [
        "Min-Heap: invert the comparison so the minimum is always at the root. Python's heapq is a min-heap by default. Used in Dijkstra's shortest path and Prim's MST.",
        "d-ary Heap: each node has d children instead of 2. A 4-ary heap reduces tree height to log₄ n, cutting sift-down steps at the cost of more comparisons per level — useful when cache performance matters.",
        "Indexed Priority Queue: augment the heap with a position map so you can decrease-key or increase-key for a specific element in O(log n). Required for efficient Dijkstra and A* implementations.",
        "Fibonacci Heap: supports decrease-key in amortised O(1) and merge in O(1), improving Dijkstra's overall complexity to O(E + V log V). Complex to implement but theoretically optimal.",
        "Heap Sort: build a max-heap in O(n), then repeatedly extract the max and place it at the end of the array. Achieves O(n log n) worst-case in-place sorting with O(1) extra space.",
      ],
      tips: [
        "Use a max-heap (or min-heap) whenever you repeatedly need the extreme element from a changing collection — it beats sorting the whole collection each time.",
        "For the 'top-k elements' problem, maintain a min-heap of size k: push each new element and pop if size exceeds k. The heap always holds the k largest elements seen so far in O(n log k) total time.",
        "When using Python's heapq for a max-heap, push (-value, value) tuples so the min-heap orders by negated value. Pop and take the second element of the tuple to recover the original value.",
        "heapify() is always faster than inserting n elements one by one (O(n) vs O(n log n)). Prefer heapq.heapify(arr) over repeated heappush() when building a heap from a known list.",
      ],
    },

    summary: {
      keyPoints: [
        "A max-heap is a complete binary tree where every parent ≥ its children, guaranteeing the maximum element is always at the root for O(1) access.",
        "Insertion (push) appends the new element at the next leaf position and sifts it up in O(log n) — at most one swap per level of the tree.",
        "Extraction (pop) replaces the root with the last element, shrinks the heap, and sifts the new root down in O(log n) by swapping with the larger child at each level.",
        "The array representation is space-efficient and cache-friendly: children of index i are at 2i+1 and 2i+2, parent is at (i-1)//2, and no pointers are needed.",
        "Building a heap from n unsorted elements via heapify() runs in O(n) — faster than inserting elements one by one (O(n log n)) — because lower nodes do less sift-down work.",
        "Max-heaps are the foundation of heap sort (O(n log n) in-place), priority queues, and graph algorithms like Dijkstra's and Prim's that repeatedly extract the minimum-cost node.",
      ],
    },
  },
}

export default function HeapMaxVideo() {
  return <AlgoVideo config={config} />
}
