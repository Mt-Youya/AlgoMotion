import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Deque",
  subtitle: "Double-ended queue allowing O(1) insertions and deletions at both ends.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What is a Deque?",
      bullets: [
        "A Deque (Double-Ended Queue) is a linear data structure that generalizes both stacks and queues.",
        "Elements can be inserted or removed from either the front or the back in O(1) time.",
        "Unlike a standard queue (FIFO) or stack (LIFO), a deque supports all four operations: push_front, push_back, pop_front, pop_back.",
        "Internally implemented using a doubly-linked list or a circular buffer (ring buffer) for constant-time end access.",
        "Common use cases include sliding-window algorithms, palindrome checking, undo/redo history, and browser navigation stacks.",
      ],
    },

    {
      kind: "intuition",
      heading: "How to Think About a Deque",
      bullets: [
        "Imagine a train with doors at both the front and the back — passengers can board or exit from either end.",
        "A standard queue is like a one-way turnstile: enter at the back, exit at the front. A deque removes that restriction.",
        "A doubly-linked list naturally models a deque: head pointer handles front operations, tail pointer handles back operations — no traversal needed.",
        "A circular array (ring buffer) is the cache-friendly alternative: two indices (front, back) wrap around the array, giving O(1) amortized operations.",
        "The key insight is that maintaining two pointers (or indices) eliminates the need to shift elements, which is the bottleneck in naive array-based queues.",
      ],
      analogy:
        "Think of a deque like a deck of playing cards you can draw from or add to either the top or the bottom — no need to shuffle the whole deck.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Initialize an empty deque backed by a doubly-linked list. Both head and tail pointers are null.",
        },
        {
          step: 2,
          description:
            "push_back(10): Create a new node with value 10. Since the deque is empty, both head and tail point to this node. State: [10]",
        },
        {
          step: 3,
          description:
            "push_back(20): Create node 20, link it after the current tail (10). Update tail to node 20. State: [10, 20]",
        },
        {
          step: 4,
          description:
            "push_back(30): Create node 30, link after tail (20). Tail now points to 30. State: [10, 20, 30]",
        },
        {
          step: 5,
          description:
            "push_front(5): Create node 5, link it before the current head (10). Update head to node 5. State: [5, 10, 20, 30]",
        },
        {
          step: 6,
          description:
            "pop_front(): Remove node at head (5). Update head to the next node (10). Set head.prev = null. Return 5. State: [10, 20, 30]",
        },
        {
          step: 7,
          description:
            "pop_back(): Remove node at tail (30). Update tail to the previous node (20). Set tail.next = null. Return 30. State: [10, 20]",
        },
        {
          step: 8,
          description: "peek_front(): Return head.value (10) without removing. State unchanged: [10, 20]",
        },
        {
          step: 9,
          description: "peek_back(): Return tail.value (20) without removing. State unchanged: [10, 20]",
        },
        {
          step: 10,
          description: "is_empty(): Check if head is null. Returns False since [10, 20] still has elements.",
        },
        {
          step: 11,
          description:
            "pop_front() twice: Remove 10 (head becomes 20), then remove 20 (head becomes null, tail becomes null). Deque is now empty.",
        },
        {
          step: 12,
          description:
            "All operations complete. Every push/pop touched only the head or tail pointer — never iterated — confirming O(1) per operation.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `from collections import deque as _deque

class Node:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class Deque:
    def __init__(self):
        self.head = None   # front sentinel
        self.tail = None   # back sentinel
        self.size = 0

    def push_front(self, val):
        node = Node(val)
        if self.head is None:
            self.head = self.tail = node
        else:
            node.next = self.head
            self.head.prev = node
            self.head = node
        self.size += 1

    def push_back(self, val):
        node = Node(val)
        if self.tail is None:
            self.head = self.tail = node
        else:
            node.prev = self.tail
            self.tail.next = node
            self.tail = node
        self.size += 1

    def pop_front(self):
        if self.head is None:
            raise IndexError("pop from empty deque")
        val = self.head.val
        self.head = self.head.next
        if self.head:
            self.head.prev = None
        else:
            self.tail = None
        self.size -= 1
        return val

    def pop_back(self):
        if self.tail is None:
            raise IndexError("pop from empty deque")
        val = self.tail.val
        self.tail = self.tail.prev
        if self.tail:
            self.tail.next = None
        else:
            self.head = None
        self.size -= 1
        return val

    def peek_front(self):
        return self.head.val if self.head else None

    def peek_back(self):
        return self.tail.val if self.tail else None

    def is_empty(self):
        return self.size == 0

    def __len__(self):
        return self.size`,
      annotations: [
        {
          lines: [1, 2],
          note: "Node class holds a value plus doubly-linked pointers — both directions are needed for O(1) removal from either end.",
        },
        {
          lines: [8, 9, 10],
          note: "head points to the front element; tail points to the back. Both null when the deque is empty.",
        },
        {
          lines: [12, 13, 14, 15, 16, 17, 18],
          note: "push_front prepends: new node's next becomes the old head, then old head's prev links back. One edge case: empty deque sets both head and tail.",
        },
        {
          lines: [28, 29, 30, 31, 32, 33, 34],
          note: "pop_front detaches the head node and advances head forward. If the deque becomes empty, tail must also be nulled to stay consistent.",
        },
        {
          lines: [42, 43, 44, 45, 46],
          note: "pop_back mirrors pop_front but works from the tail. The prev pointer allows walking backward in O(1) — impossible with a singly-linked list.",
        },
        {
          lines: [49, 51],
          note: "peek_front / peek_back return values without mutation — useful for sliding-window algorithms that inspect both ends before deciding which to remove.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "push_front (best)", value: "O(1)" },
        { label: "push_back (best)", value: "O(1)" },
        { label: "pop_front (avg)", value: "O(1)" },
        { label: "pop_back (avg)", value: "O(1)" },
        { label: "peek_front / peek_back (worst)", value: "O(1)" },
      ],
      spaceRows: [
        { label: "Space (n elements)", value: "O(n)" },
        { label: "Extra per node (doubly-linked)", value: "O(1)" },
      ],
      insights: [
        "All four core operations are strictly O(1) — no amortized cost — when backed by a doubly-linked list.",
        "A ring-buffer (circular array) implementation achieves the same O(1) amortized time with better cache locality, at the cost of occasional O(n) resize.",
        "Python's collections.deque is a doubly-linked list of fixed-size blocks, giving O(1) ends and O(n) random access — match your access pattern to the right tool.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Patterns",
      variations: [
        {
          name: "Circular Buffer Deque",
          description:
            "Use a fixed-size array with head/tail indices that wrap around modulo capacity. Avoids pointer overhead; great for embedded or real-time systems.",
        },
        {
          name: "Monotonic Deque",
          description:
            "Maintains elements in sorted order by evicting from the back before inserting. The backbone of the sliding-window maximum/minimum algorithm in O(n).",
        },
        {
          name: "Deque as Stack",
          description:
            "Restrict all operations to one end (push_back / pop_back). Identical semantics to a stack with the same O(1) guarantees.",
        },
        {
          name: "Deque as Queue",
          description:
            "Use push_back for enqueue and pop_front for dequeue. Identical semantics to a FIFO queue — no performance penalty.",
        },
        {
          name: "Input/Output Restricted Deque",
          description:
            "A deque where insertion is restricted to one end (input-restricted) or deletion is restricted to one end (output-restricted) — theoretical variants used in complexity proofs.",
        },
      ],
      tips: [
        "Prefer collections.deque over a list for queue/deque workloads in Python — list.pop(0) is O(n) while deque.popleft() is O(1).",
        "When implementing a sliding-window maximum, use a monotonic deque to reduce the naive O(n·k) solution to O(n).",
        "For LRU cache, combine a deque with a hash map: O(1) access via the map, O(1) eviction via the deque.",
        "Always check is_empty() before popping — or catch the IndexError — to avoid undefined behavior on empty deques.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "A deque is a generalization of both stacks and queues, supporting O(1) insertion and deletion at both ends.",
        "The doubly-linked list is the canonical backing structure: head handles the front, tail handles the back — no traversal ever needed.",
        "Ring-buffer (circular array) deques trade pointer overhead for cache locality and are preferred in performance-critical code.",
        "Monotonic deques are a powerful algorithmic pattern enabling O(n) sliding-window extremum queries.",
        "Python's collections.deque is production-ready and thread-safe for append/pop at both ends — use it instead of rolling your own.",
        "Choosing between deque, stack, and queue should be driven by access pattern: if you only ever need one end, use a stack or queue; if you need both, use a deque.",
      ],
    },
  ],
}

export default function DequeVideo() {
  return <AlgoVideo config={config} />
}
