import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Priority Queue",
  subtitle: "Abstract type serving elements by priority, typically implemented with a heap.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does a Priority Queue Solve?",
      bullets: [
        "Standard queues serve elements in FIFO order — but what if some tasks are more urgent?",
        "A Priority Queue always serves the element with the highest (or lowest) priority first.",
        "It supports three core operations: insert, peek (read top), and extract (remove top).",
        "Real-world systems need this constantly: OS schedulers, Dijkstra's algorithm, event queues.",
        "Naïve sorted-array approaches cost O(n) per insert; a heap reduces this to O(log n).",
      ],
    },

    intuition: {
      heading: "The Core Intuition",
      bullets: [
        "Think of a binary heap as a nearly-complete binary tree where every parent satisfies a 'heap property'.",
        "In a min-heap, every parent node is smaller than or equal to its children — so the root is always the minimum.",
        "Inserting appends to the end and 'bubbles up' by swapping with the parent until the heap property is restored.",
        "Extracting the minimum removes the root, places the last element there, and 'sifts down' to restore order.",
        "Because the tree height is O(log n), both insert and extract touch at most O(log n) nodes.",
      ],
      analogy:
        "Imagine a hospital emergency room triage system: patients are not served in arrival order but by severity. The most critical patient is always treated next, no matter when they arrived — just like a min-heap always yields the smallest key.",
    },

    walkthrough: {
      heading: "Step-by-Step: Min-Heap Operations",
      steps: [
        {
          step: 1,
          description: "Start with an empty min-heap represented as an array.",
          detail: "heap = []",
        },
        {
          step: 2,
          description: "Insert 5: append to the array. No parent to compare — heap property trivially satisfied.",
          detail: "heap = [5]",
        },
        {
          step: 3,
          description: "Insert 3: append at index 1. Parent is index 0 (value 5). Since 3 < 5, swap.",
          detail: "heap = [3, 5]  ← bubble up",
        },
        {
          step: 4,
          description: "Insert 8: append at index 2. Parent is index 0 (value 3). Since 8 ≥ 3, no swap needed.",
          detail: "heap = [3, 5, 8]",
        },
        {
          step: 5,
          description: "Insert 1: append at index 3. Parent is index 1 (value 5). 1 < 5 → swap. Now parent is index 0 (value 3). 1 < 3 → swap again.",
          detail: "heap = [1, 3, 8, 5]  ← bubbled to root",
        },
        {
          step: 6,
          description: "Insert 4: append at index 4. Parent is index 1 (value 3). 4 ≥ 3 → stop.",
          detail: "heap = [1, 3, 8, 5, 4]",
        },
        {
          step: 7,
          description: "Peek: return heap[0] = 1. O(1) — no modification.",
          detail: "min = 1",
        },
        {
          step: 8,
          description: "Extract-min: save root (1), move last element (4) to root position.",
          detail: "heap = [4, 3, 8, 5]  ← before sift-down",
        },
        {
          step: 9,
          description: "Sift-down: compare 4 with children 3 and 8. Smallest child is 3. Since 4 > 3, swap.",
          detail: "heap = [3, 4, 8, 5]  ← after one sift step",
        },
        {
          step: 10,
          description: "Continue sift-down: node 4 at index 1 has child 5 at index 3. Since 4 < 5, stop.",
          detail: "heap = [3, 4, 8, 5]  ← heap property restored",
        },
        {
          step: 11,
          description: "Build-heap from arbitrary array: apply sift-down from n//2-1 down to 0. This runs in O(n) total.",
          detail: "Efficient batch construction — better than n individual inserts.",
        },
        {
          step: 12,
          description: "Result: every extract-min returns elements in sorted ascending order — this is Heap Sort!",
          detail: "Heap Sort time: O(n log n), space: O(1) in-place.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import heapq

class MinHeap:
    def __init__(self):
        self._heap = []

    def push(self, value):
        """Insert a value — O(log n)."""
        heapq.heappush(self._heap, value)

    def pop(self):
        """Remove and return the minimum — O(log n)."""
        if not self._heap:
            raise IndexError("pop from empty heap")
        return heapq.heappop(self._heap)

    def peek(self):
        """Return the minimum without removing — O(1)."""
        if not self._heap:
            raise IndexError("peek from empty heap")
        return self._heap[0]

    def __len__(self):
        return len(self._heap)

    def __bool__(self):
        return bool(self._heap)


# Max-heap: negate values on push/pop
class MaxHeap:
    def __init__(self):
        self._heap = []

    def push(self, value):
        heapq.heappush(self._heap, -value)

    def pop(self):
        return -heapq.heappop(self._heap)

    def peek(self):
        return -self._heap[0]


# Build heap from existing list — O(n)
def build_heap(data):
    h = data[:]
    heapq.heapify(h)
    return h


# Priority queue with (priority, item) tuples
import itertools

class PriorityQueue:
    def __init__(self):
        self._heap = []
        self._counter = itertools.count()   # tie-breaker

    def push(self, item, priority):
        count = next(self._counter)
        heapq.heappush(self._heap, (priority, count, item))

    def pop(self):
        priority, _, item = heapq.heappop(self._heap)
        return item, priority
`,
      annotations: [
        {
          lines: "3-4",
          note: "The internal list stores heap elements; Python's heapq module provides a min-heap by default.",
        },
        {
          lines: "7-9",
          note: "heapq.heappush maintains the heap invariant after each insertion in O(log n) time.",
        },
        {
          lines: "12-15",
          note: "heapq.heappop removes and returns the smallest element, then restores the heap in O(log n).",
        },
        {
          lines: "18-21",
          note: "Peek is O(1) — the minimum is always at index 0 in a min-heap array.",
        },
        {
          lines: "32-36",
          note: "Max-heap trick: negate values on push and negate again on pop. Python's heapq has no built-in max-heap.",
        },
        {
          lines: "52-58",
          note: "A tie-breaker counter prevents comparison errors when two items have equal priority and are not directly comparable.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { operation: "Insert (push)", best: "O(1)", average: "O(log n)", worst: "O(log n)" },
        { operation: "Extract min/max (pop)", best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
        { operation: "Peek (read top)", best: "O(1)", average: "O(1)", worst: "O(1)" },
        { operation: "Build heap (heapify)", best: "O(n)", average: "O(n)", worst: "O(n)" },
        { operation: "Search arbitrary element", best: "O(1)", average: "O(n)", worst: "O(n)" },
      ],
      spaceRows: [
        { label: "Heap storage", value: "O(n)" },
        { label: "Auxiliary (iterative heapify)", value: "O(1)" },
        { label: "Recursive sift-down stack", value: "O(log n)" },
      ],
      insights: [
        "Build-heap is O(n) — not O(n log n) — because most nodes are near the bottom and sift very little.",
        "Peek is O(1) because the heap property guarantees the extremum is always at the root (index 0).",
        "A heap does NOT support O(log n) arbitrary deletion or search unless you maintain a position map alongside it.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Max-Heap",
          description: "Serves the largest element first. In Python, negate values or use a custom comparator.",
        },
        {
          name: "d-ary Heap",
          description:
            "Each node has d children instead of 2. Reduces tree height to log_d(n), improving cache performance for large d.",
        },
        {
          name: "Fibonacci Heap",
          description:
            "Amortized O(1) insert and decrease-key. Used in theoretically optimal Dijkstra and Prim implementations.",
        },
        {
          name: "Indexed Priority Queue",
          description:
            "Pairs the heap with a position map to support O(log n) decrease-key and deletion by index — essential for Dijkstra.",
        },
        {
          name: "Monotonic Priority Queue / Deque",
          description:
            "Maintains a sliding-window minimum or maximum in O(1) amortized per element, used in sliding-window problems.",
        },
      ],
      tips: [
        "Use Python's heapq for min-heap; negate values for max-heap. For objects, push (priority, counter, item) tuples to avoid comparison errors.",
        "Prefer heapq.heapify over repeated heapq.heappush when building from an existing list — it's O(n) vs O(n log n).",
        "For Dijkstra's algorithm, use a lazy deletion pattern: push updated distances and skip stale entries when popping.",
        "When priorities change frequently, consider an indexed heap or a Fibonacci heap to avoid rebuilding from scratch.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A Priority Queue is an abstract data type; a binary heap is its most common concrete implementation.",
        "Min-heap guarantees the smallest element is always at the root — accessible in O(1).",
        "Insert and extract both run in O(log n) by maintaining the heap property through bubble-up and sift-down.",
        "Build-heap (heapify) constructs a valid heap from an unsorted array in O(n) — a non-obvious but important result.",
        "Python's heapq module provides a min-heap; negate values or use (priority, counter, item) tuples for max-heap or stable ordering.",
        "Priority queues underpin Dijkstra's shortest path, Prim's MST, A* search, Huffman coding, and OS task schedulers.",
      ],
    },
  },
};

export default function PriorityQueueVideo() {
  return <AlgoVideo config={config} />;
}
