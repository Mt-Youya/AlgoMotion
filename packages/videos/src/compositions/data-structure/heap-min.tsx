import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Min-Heap",
  subtitle: "Complete binary tree with O(1) min access and O(log n) insert/extract.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What Problem Does a Min-Heap Solve?",
      bullets: [
        "You need repeated access to the smallest element in a dynamic dataset.",
        "Insertion and deletion must both be fast — not just one or the other.",
        "A sorted array gives O(1) min but O(n) insert; a linked list is the reverse.",
        "A min-heap balances both: O(1) peek, O(log n) insert, O(log n) extract.",
        "Core building block for Dijkstra's shortest path, Prim's MST, and priority queues.",
      ],
    },

    {
      kind: "intuition",
      heading: "The Heap Property Explained",
      bullets: [
        "Think of a tournament bracket where every round's winner beats their opponent.",
        "The root is always the overall champion — the smallest value.",
        "Any path from root to a leaf is a non-decreasing sequence.",
        "The tree is always complete: filled level by level, last level left-aligned.",
        "This completeness lets us store the tree in a flat array with zero pointer overhead.",
      ],
      analogy:
        "Imagine a hospital triage queue. The most critical patient (smallest priority number) is always at the front. When a new patient arrives they 'bubble up' past less critical patients until the correct position is found — that's sift-up. When the front patient is treated, the last arrival temporarily takes the front seat and 'sinks down' until order is restored — that's sift-down.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step: Insert & Extract-Min",
      steps: [
        {
          label: "Initial heap",
          description: "Start with a valid min-heap: [1, 3, 5, 7, 9, 8, 6]. Root (index 0) holds the minimum.",
        },
        {
          label: "Insert 2 — append",
          description: "Append the new value at the end of the array: [1, 3, 5, 7, 9, 8, 6, 2]. It becomes the left child of index 3 (value 7).",
        },
        {
          label: "Sift-up step 1",
          description: "Compare index 7 (value 2) with its parent at index 3 (value 7). Since 2 < 7, swap them.",
          arrayState: {
            values: [1, 3, 5, 2, 9, 8, 6, 7],
            colors: ["green", "default", "default", "yellow", "default", "default", "default", "yellow"],
          },
        },
        {
          label: "Sift-up step 2",
          description: "Now at index 3 (value 2). Compare with parent at index 1 (value 3). Since 2 < 3, swap again.",
          arrayState: {
            values: [1, 2, 5, 3, 9, 8, 6, 7],
            colors: ["green", "yellow", "default", "yellow", "default", "default", "default", "default"],
          },
        },
        {
          label: "Sift-up step 3",
          description: "Now at index 1 (value 2). Parent is index 0 (value 1). Since 2 ≥ 1, heap property holds. Stop.",
          arrayState: {
            values: [1, 2, 5, 3, 9, 8, 6, 7],
            colors: ["green", "green", "default", "default", "default", "default", "default", "default"],
          },
        },
        {
          label: "Extract-min — remove root",
          description: "Save root value (1). Move last element (7) to root position. Shrink array size by 1.",
          arrayState: {
            values: [7, 2, 5, 3, 9, 8, 6],
            colors: ["red", "default", "default", "default", "default", "default", "default"],
          },
        },
        {
          label: "Sift-down step 1",
          description: "Root is 7. Children are index 1 (2) and index 2 (5). Smallest child is 2. Since 7 > 2, swap.",
          arrayState: {
            values: [2, 7, 5, 3, 9, 8, 6],
            colors: ["green", "yellow", "default", "default", "default", "default", "default"],
          },
        },
        {
          label: "Sift-down step 2",
          description: "Now at index 1 (value 7). Children are index 3 (3) and index 4 (9). Smallest child is 3. Since 7 > 3, swap.",
          arrayState: {
            values: [2, 3, 5, 7, 9, 8, 6],
            colors: ["green", "green", "default", "yellow", "default", "default", "default"],
          },
        },
        {
          label: "Sift-down complete",
          description: "Now at index 3 (value 7). Children would be indices 7 and 8 — out of bounds. Stop. Heap property restored.",
          arrayState: {
            values: [2, 3, 5, 7, 9, 8, 6],
            colors: ["green", "green", "green", "green", "green", "green", "green"],
          },
        },
        {
          label: "Build heap in O(n)",
          description: "Given an arbitrary array, call sift-down on every non-leaf from index n//2-1 down to 0. Total work is O(n) due to geometric series — most nodes are near the bottom and do little work.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Min-Heap Implementation in Python",
      language: "python",
      snippet: `class MinHeap:
    def __init__(self):
        self.heap = []

    def _parent(self, i): return (i - 1) // 2
    def _left(self, i):   return 2 * i + 1
    def _right(self, i):  return 2 * i + 2

    def peek(self):
        if not self.heap:
            raise IndexError("heap is empty")
        return self.heap[0]

    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)

    def pop(self):
        if not self.heap:
            raise IndexError("heap is empty")
        self._swap(0, len(self.heap) - 1)
        min_val = self.heap.pop()
        self._sift_down(0)
        return min_val

    def _sift_up(self, i):
        while i > 0:
            p = self._parent(i)
            if self.heap[p] > self.heap[i]:
                self._swap(p, i)
                i = p
            else:
                break

    def _sift_down(self, i):
        n = len(self.heap)
        while True:
            smallest = i
            l, r = self._left(i), self._right(i)
            if l < n and self.heap[l] < self.heap[smallest]:
                smallest = l
            if r < n and self.heap[r] < self.heap[smallest]:
                smallest = r
            if smallest == i:
                break
            self._swap(i, smallest)
            i = smallest

    def _swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    @classmethod
    def heapify(cls, arr):
        h = cls()
        h.heap = arr[:]
        for i in range(len(h.heap) // 2 - 1, -1, -1):
            h._sift_down(i)
        return h`,
      annotations: [
        { lines: "5-7", note: "Index arithmetic: parent at (i-1)//2, children at 2i+1 and 2i+2. No pointers needed." },
        { lines: "10-12", note: "peek() is O(1) — the minimum is always at index 0 by the heap property." },
        { lines: "14-16", note: "push() appends then calls sift-up to restore the heap property in O(log n)." },
        { lines: "18-23", note: "pop() swaps root with last element, removes last (O(1)), then sifts down the new root." },
        { lines: "25-33", note: "sift_up() repeatedly compares a node with its parent and swaps upward until the heap property holds." },
        { lines: "35-46", note: "sift_down() finds the smallest among a node and its two children, swaps if needed, and recurses downward." },
        { lines: "52-57", note: "heapify() builds a heap in O(n) by sifting down every non-leaf from bottom to top." },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { operation: "Peek (get min)", best: "O(1)", average: "O(1)", worst: "O(1)" },
        { operation: "Push (insert)", best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        { operation: "Pop (extract-min)", best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        { operation: "Build heap (heapify)", best: "O(n)", average: "O(n)", worst: "O(n)" },
        { operation: "Search arbitrary", best: "O(1)", average: "O(n)", worst: "O(n)" },
      ],
      spaceRows: [
        { label: "Array storage", complexity: "O(n)" },
        { label: "Recursive sift-down call stack", complexity: "O(log n)" },
      ],
      insights: [
        "Build heap is O(n), not O(n log n) — the proof uses a geometric series: most nodes are near the bottom and sift down very few levels.",
        "Peek is O(1) because the heap property guarantees the minimum is always at index 0, no traversal needed.",
        "Heapsort achieves O(n log n) worst-case with O(1) extra space by combining heapify with repeated extract-min.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Structures",
      variations: [
        {
          name: "Max-Heap",
          description: "Flip the comparison: every parent ≥ its children. Root holds the maximum. Used in heapsort and scheduling algorithms.",
        },
        {
          name: "d-ary Heap",
          description: "Each node has d children instead of 2. Reduces tree height to log_d(n), improving decrease-key at the cost of slower sift-down. d=4 is common in practice.",
        },
        {
          name: "Fibonacci Heap",
          description: "Amortized O(1) insert and decrease-key, O(log n) extract-min. Theoretically optimal for Dijkstra's algorithm but complex to implement.",
        },
        {
          name: "Binomial Heap",
          description: "Supports O(log n) merge of two heaps. Useful when merging priority queues is a frequent operation.",
        },
        {
          name: "Python heapq module",
          description: "Built-in min-heap via heapq.heappush / heapq.heappop. Operates directly on a plain list. Use heapq.nsmallest for top-k queries.",
        },
      ],
      tips: [
        "To simulate a max-heap with Python's heapq, negate values on push and negate again on pop.",
        "For top-k smallest elements from a stream, maintain a max-heap of size k — push each new element and pop if size exceeds k.",
        "Prefer heapq over a custom class in interviews unless you need decrease-key or merge operations.",
        "When storing (priority, item) tuples, Python compares tuples lexicographically — break ties with a counter to avoid comparing items.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "A min-heap is a complete binary tree stored as a flat array — no pointers, cache-friendly.",
        "The heap property (parent ≤ children) guarantees O(1) access to the minimum element at all times.",
        "Insert and extract-min both run in O(log n) via sift-up and sift-down respectively.",
        "Building a heap from an unsorted array takes O(n) time using the bottom-up heapify algorithm.",
        "Min-heaps power priority queues, Dijkstra's shortest path, Prim's MST, and the top-k pattern.",
        "Python's heapq module provides a production-ready min-heap with a clean, minimal API.",
      ],
    },
  ],
};

export default function HeapMinVideo() {
  return <AlgoVideo config={config} />;
}
