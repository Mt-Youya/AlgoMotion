import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Circular Queue",
  subtitle: "Fixed-size ring buffer queue with O(1) enqueue and dequeue without shifting.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem: Efficient Fixed-Size Queue",
      bullets: [
        "A regular array-based queue requires O(n) shifting on every dequeue.",
        "We need a queue that supports O(1) enqueue AND O(1) dequeue.",
        "The queue must operate within a fixed memory footprint — no dynamic resizing.",
        "We must correctly detect when the queue is full or empty without ambiguity.",
        "The solution should be cache-friendly and suitable for real-time / embedded systems.",
      ],
    },

    intuition: {
      heading: "Intuition: Think in a Circle",
      bullets: [
        "Instead of shifting elements left on dequeue, simply advance a head pointer.",
        "When either pointer reaches the end of the array, it wraps back to index 0 using modulo.",
        "The buffer behaves like a ring: the slot after the last is the first slot again.",
        "Two integer pointers — head and tail — are all the state we need beyond the array itself.",
        "The 'wasted slot' trick (keeping one slot always empty) cleanly distinguishes full from empty.",
      ],
      analogy:
        "Imagine a conveyor belt sushi restaurant: plates are added at one end and taken from the other. When the belt loops around, the same physical track is reused — no plates are ever physically moved backward.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Initialize",
          description:
            "Allocate an array of size capacity+1 (the +1 allows the wasted-slot trick). Set head = 0, tail = 0.",
        },
        {
          step: 2,
          title: "Check Empty",
          description:
            "The queue is empty when head == tail. Both pointers point to the same slot, meaning no elements are stored.",
        },
        {
          step: 3,
          title: "Check Full",
          description:
            "The queue is full when (tail + 1) % capacity == head. The tail is one step behind the head on the ring.",
        },
        {
          step: 4,
          title: "Enqueue — Guard",
          description: "Before inserting, verify the queue is not full. If full, raise an error or return False.",
        },
        {
          step: 5,
          title: "Enqueue — Write",
          description: "Write the new value into buffer[tail], then advance tail = (tail + 1) % capacity.",
        },
        {
          step: 6,
          title: "Dequeue — Guard",
          description: "Before removing, verify the queue is not empty. If empty, raise an error or return None.",
        },
        {
          step: 7,
          title: "Dequeue — Read",
          description:
            "Read the value at buffer[head], then advance head = (head + 1) % capacity. The old slot is now logically free.",
        },
        {
          step: 8,
          title: "Peek Front",
          description: "Return buffer[head] without modifying head. O(1) — no traversal needed.",
        },
        {
          step: 9,
          title: "Wrap-Around Example",
          description:
            "Capacity=5. Enqueue 10,20,30,40. Dequeue twice (head moves to index 2). Enqueue 50,60 — tail wraps to indices 0 and 1, reusing freed slots.",
        },
        {
          step: 10,
          title: "Size Calculation",
          description:
            "Current size = (tail - head + capacity) % capacity. This handles the wrap-around case where tail < head numerically.",
        },
        {
          step: 11,
          title: "Thread-Safety Note",
          description:
            "In single-producer / single-consumer scenarios, a circular queue is naturally lock-free because head and tail are written by separate threads.",
        },
        {
          step: 12,
          title: "Memory Layout",
          description:
            "All data lives in one contiguous array — excellent cache locality compared to linked-list queues which scatter nodes across the heap.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class CircularQueue:
    def __init__(self, capacity: int):
        self.capacity = capacity + 1   # +1 for the wasted slot
        self.buffer = [None] * self.capacity
        self.head = 0
        self.tail = 0

    def is_empty(self) -> bool:
        return self.head == self.tail

    def is_full(self) -> bool:
        return (self.tail + 1) % self.capacity == self.head

    def enqueue(self, value) -> bool:
        if self.is_full():
            return False
        self.buffer[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        return True

    def dequeue(self):
        if self.is_empty():
            return None
        value = self.buffer[self.head]
        self.buffer[self.head] = None   # optional: help GC
        self.head = (self.head + 1) % self.capacity
        return value

    def peek(self):
        if self.is_empty():
            return None
        return self.buffer[self.head]

    def size(self) -> int:
        return (self.tail - self.head + self.capacity) % self.capacity`,
      annotations: [
        {
          lines: [2],
          note: "Allocate capacity+1 slots. The one always-empty slot is the sentinel that distinguishes full from empty.",
        },
        {
          lines: [9],
          note: "Empty condition: both pointers coincide — no elements between head and tail.",
        },
        {
          lines: [12],
          note: "Full condition: advancing tail by one (mod capacity) would collide with head.",
        },
        {
          lines: [15, 19],
          note: "Enqueue writes at tail then advances it. The modulo wraps the index around the ring.",
        },
        {
          lines: [22, 28],
          note: "Dequeue reads from head then advances it. Setting the slot to None helps the garbage collector reclaim objects.",
        },
        {
          lines: [35],
          note: "Size formula handles the wrap-around case: when tail < head numerically, adding capacity before modulo gives the correct positive count.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(1)", description: "Enqueue or dequeue a single element" },
        { case: "Average", complexity: "O(1)", description: "Every operation is constant time" },
        { case: "Worst", complexity: "O(1)", description: "No loops or recursion — always O(1)" },
      ],
      spaceRows: [
        { label: "Buffer", complexity: "O(n)", description: "n = capacity; one contiguous array" },
        { label: "Pointers", complexity: "O(1)", description: "head and tail are two integers" },
        { label: "Overall", complexity: "O(n)", description: "Dominated by the buffer allocation" },
      ],
      insights: [
        "Unlike a linked-list queue, there is zero per-element allocation overhead — memory is reserved once at construction.",
        "The modulo operation is the only arithmetic overhead per enqueue/dequeue, making this extremely fast in practice.",
        "For power-of-two capacities, the modulo can be replaced by a bitwise AND, giving a measurable speedup in tight loops.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Double-Ended Circular Queue (Deque)",
          description:
            "Extend with push_front and pop_back by decrementing head or tail with wrap-around. Supports stack and queue operations simultaneously.",
        },
        {
          name: "Lock-Free SPSC Ring Buffer",
          description:
            "In single-producer / single-consumer systems, atomic loads/stores on head and tail are sufficient for thread safety — no mutex needed.",
        },
        {
          name: "Overwriting Ring Buffer",
          description:
            "Drop the 'full' check and overwrite the oldest element when full. Common in logging, audio streaming, and sensor data pipelines.",
        },
        {
          name: "Power-of-Two Sized Buffer",
          description:
            "Set capacity to a power of two and replace (idx + 1) % capacity with (idx + 1) & mask where mask = capacity - 1. Eliminates the modulo instruction.",
        },
        {
          name: "Circular Buffer with Sequence Numbers",
          description:
            "Use monotonically increasing 64-bit counters instead of raw indices. Avoids the wasted-slot trick and simplifies full/empty detection.",
        },
      ],
      tips: [
        "Always allocate capacity+1 slots when using the wasted-slot approach — forgetting this is a classic off-by-one bug.",
        "In Python, set evicted slots to None after dequeue so the garbage collector can reclaim large objects.",
        "Benchmark with your target CPU's cache line size (typically 64 bytes): padding the struct to a cache line prevents false sharing in multi-threaded code.",
        "Prefer the circular queue over collections.deque when you need a hard upper bound on memory usage.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A circular queue achieves O(1) enqueue and dequeue by using two pointers that wrap around a fixed array — no element is ever physically moved.",
        "The modulo operator is the heart of the ring: (index + 1) % capacity maps any out-of-bounds index back to the start.",
        "The wasted-slot trick (capacity+1 allocation) provides an unambiguous way to distinguish an empty queue (head==tail) from a full one ((tail+1)%cap==head).",
        "Memory is allocated once at construction, giving predictable latency and excellent cache locality compared to linked-list queues.",
        "Circular queues are the building block for lock-free SPSC buffers, audio ring buffers, network packet queues, and operating-system I/O buffers.",
        "When capacity is a power of two, replace modulo with bitwise AND for a significant throughput boost in performance-critical code.",
      ],
    },
  },
}

export default function CircularQueueVideo() {
  return <AlgoVideo config={config} />
}
