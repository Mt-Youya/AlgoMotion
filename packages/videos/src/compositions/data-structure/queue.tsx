import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Queue",
  subtitle: "First-In-First-Out collection supporting enqueue and dequeue in O(1).",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What Problem Does a Queue Solve?",
      bullets: [
        "Many real-world processes must be handled in the exact order they arrive — no skipping, no re-ordering.",
        "A Queue enforces the FIFO (First-In, First-Out) discipline: the element inserted earliest is always the first to be removed.",
        "Without a queue, implementing fair ordering (e.g., task scheduling, BFS traversal) would require expensive array shifting or complex bookkeeping.",
        "Queues decouple producers and consumers: a producer can enqueue work items while a consumer dequeues and processes them independently.",
        "The abstract data type exposes only enqueue, dequeue, peek, and isEmpty — hiding internal implementation details from callers.",
      ],
    },

    intuition: {
      heading: "Building the Mental Model",
      bullets: [
        "Picture a line of people waiting at a coffee shop: the first person to join the line is the first to be served.",
        "The REAR of the queue is where new arrivals join; the FRONT is where service happens.",
        "Because we only ever touch the two ends, both enqueue and dequeue can be performed in constant time — O(1).",
        "A simple array-based queue tracks two pointers (front index, rear index); a linked-list queue tracks head and tail nodes.",
        "Circular buffers extend the array approach to avoid wasted space after many enqueue/dequeue cycles.",
      ],
      analogy:
        "Real-world analogy: a printer spooler. Documents are added to the back of the print queue and printed from the front — the first document sent is the first to print, regardless of file size.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with an empty queue. front = 0, rear = -1, size = 0.",
        },
        {
          step: 2,
          description: "enqueue(10): increment rear to 0, place 10 at index 0. Queue: [10]. size = 1.",
        },
        {
          step: 3,
          description: "enqueue(20): increment rear to 1, place 20 at index 1. Queue: [10, 20]. size = 2.",
        },
        {
          step: 4,
          description: "enqueue(30): increment rear to 2, place 30 at index 2. Queue: [10, 20, 30]. size = 3.",
        },
        {
          step: 5,
          description: "enqueue(40): increment rear to 3, place 40 at index 3. Queue: [10, 20, 30, 40]. size = 4.",
        },
        {
          step: 6,
          description: "peek(): return data[front] = data[0] = 10. Queue unchanged: [10, 20, 30, 40].",
        },
        {
          step: 7,
          description:
            "dequeue(): read data[front] = 10, increment front to 1, decrement size. Returns 10. Queue: [20, 30, 40].",
        },
        {
          step: 8,
          description:
            "dequeue(): read data[front] = 20, increment front to 2, decrement size. Returns 20. Queue: [30, 40].",
        },
        {
          step: 9,
          description: "enqueue(50): rear wraps to next slot (circular) or appends. Queue: [30, 40, 50]. size = 3.",
        },
        {
          step: 10,
          description: "isEmpty(): size == 0 is False. The queue still holds [30, 40, 50].",
        },
        {
          step: 11,
          description: "Drain the queue: dequeue() → 30, dequeue() → 40, dequeue() → 50. size = 0.",
        },
        {
          step: 12,
          description: "isEmpty(): size == 0 is True. Calling dequeue() now raises an underflow error.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from collections import deque

class Queue:
    """FIFO queue backed by collections.deque for O(1) enqueue/dequeue."""

    def __init__(self):
        self._data: deque = deque()

    def enqueue(self, item) -> None:
        """Add item to the rear of the queue. O(1)."""
        self._data.append(item)

    def dequeue(self):
        """Remove and return the front item. O(1).
        Raises IndexError if the queue is empty.
        """
        if self.is_empty():
            raise IndexError("dequeue from an empty queue")
        return self._data.popleft()

    def peek(self):
        """Return the front item without removing it. O(1)."""
        if self.is_empty():
            raise IndexError("peek at an empty queue")
        return self._data[0]

    def is_empty(self) -> bool:
        """Return True if the queue contains no elements."""
        return len(self._data) == 0

    def size(self) -> int:
        """Return the number of elements in the queue."""
        return len(self._data)

    def __repr__(self) -> str:
        return f"Queue(front → {list(self._data)} ← rear)"


# Usage
q = Queue()
q.enqueue(10)
q.enqueue(20)
q.enqueue(30)
print(q.peek())    # 10
print(q.dequeue()) # 10
print(q.size())    # 2
`,
      annotations: [
        {
          lines: "1",
          note: "collections.deque is a doubly-linked list optimised for O(1) append and popleft — the ideal backing store for a queue.",
        },
        {
          lines: "11-12",
          note: "enqueue calls deque.append(), which adds to the right (rear). Always O(1) amortised.",
        },
        {
          lines: "15-20",
          note: "dequeue calls deque.popleft(), removing from the left (front) in O(1). The guard raises a clear error on underflow.",
        },
        {
          lines: "22-26",
          note: "peek reads index 0 (the front) without mutating the deque. O(1) direct access.",
        },
        {
          lines: "28-30",
          note: "is_empty checks len() in O(1). Prefer this over comparing size to 0 directly in client code.",
        },
        {
          lines: "36-37",
          note: "__repr__ prints the queue left-to-right so the visual matches the FIFO mental model: front on the left, rear on the right.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { operation: "enqueue", best: "O(1)", average: "O(1)", worst: "O(1)" },
        { operation: "dequeue", best: "O(1)", average: "O(1)", worst: "O(1)" },
        { operation: "peek", best: "O(1)", average: "O(1)", worst: "O(1)" },
        { operation: "search", best: "O(1)", average: "O(n)", worst: "O(n)" },
        { operation: "isEmpty", best: "O(1)", average: "O(1)", worst: "O(1)" },
      ],
      spaceRows: [
        { label: "Queue storage", complexity: "O(n)" },
        { label: "Auxiliary (iterative ops)", complexity: "O(1)" },
      ],
      insights: [
        "All core queue operations (enqueue, dequeue, peek) run in O(1) because they only touch the two ends of the structure.",
        "The O(n) space bound is unavoidable — you must store all n elements somewhere.",
        "A list-based queue that uses list.pop(0) is O(n) per dequeue due to element shifting; always prefer deque or a linked-list implementation for production use.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Circular Queue (Ring Buffer)",
          description:
            "Uses a fixed-size array with front/rear pointers that wrap around modulo capacity. Avoids memory reallocation and wasted slots after dequeues.",
        },
        {
          name: "Deque (Double-Ended Queue)",
          description:
            "Supports O(1) insertion and removal at both ends. Python's collections.deque is a deque; it can emulate both a stack and a queue.",
        },
        {
          name: "Priority Queue",
          description:
            "Elements are dequeued in priority order rather than arrival order. Typically backed by a binary heap, giving O(log n) enqueue/dequeue.",
        },
        {
          name: "Blocking Queue",
          description:
            "Thread-safe queue used in producer-consumer concurrency patterns. Blocks the consumer when empty and the producer when full (bounded variant).",
        },
        {
          name: "Monotonic Queue",
          description:
            "Maintains a monotonically increasing or decreasing order of elements. Used in sliding-window maximum/minimum problems for O(n) solutions.",
        },
      ],
      tips: [
        "Use collections.deque in Python instead of a plain list to guarantee O(1) popleft; list.pop(0) is O(n).",
        "For concurrent workloads, use queue.Queue (Python standard library) which is thread-safe out of the box.",
        "BFS (Breadth-First Search) on graphs and trees relies entirely on a queue — mastering queues unlocks a large family of graph algorithms.",
        "When the queue size is bounded and known in advance, a circular buffer is more memory-efficient than a linked list due to pointer overhead.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A Queue enforces FIFO ordering: the element added first is always the first to leave.",
        "enqueue (add to rear) and dequeue (remove from front) both run in O(1) with the right implementation.",
        "Python's collections.deque is the idiomatic backing store — never use list.pop(0) for a queue.",
        "Queues are foundational for BFS graph traversal, task scheduling, and producer-consumer pipelines.",
        "Variants like priority queues, deques, and circular buffers extend the basic concept to cover a wide range of algorithmic needs.",
        "Always guard dequeue and peek with an isEmpty check to prevent underflow errors in production code.",
      ],
    },
  },
}

export default function QueueVideo() {
  return <AlgoVideo config={config} />
}
