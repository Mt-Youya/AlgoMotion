import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Doubly Linked List",
  subtitle: "Linked list with pointers to both next and previous nodes.",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What Problem Does a Doubly Linked List Solve?",
      bullets: [
        "A singly linked list only allows forward traversal — you cannot go back to the previous node without restarting from the head.",
        "A doubly linked list adds a `prev` pointer to each node, enabling bidirectional traversal in O(n) time.",
        "Insertions and deletions at a known position cost O(1) — no shifting of elements as in arrays.",
        "It supports efficient implementation of deques, LRU caches, and browser history stacks where both ends must be accessible quickly.",
        "Unlike arrays, the list grows and shrinks dynamically with no wasted pre-allocated memory.",
      ],
    },

    intuition: {
      heading: "Intuition: A Two-Way Chain",
      bullets: [
        "Imagine a train: each carriage is connected to the one in front AND the one behind it.",
        "You can walk from the engine to the caboose (forward traversal) or from the caboose back to the engine (backward traversal).",
        "Adding a new carriage in the middle only requires re-linking the two neighbouring carriages — the rest of the train is untouched.",
        "Removing a carriage also only affects its two immediate neighbours, making the operation local and fast.",
        "The `head` pointer is the engine and the `tail` pointer is the caboose — both are maintained so you can board the train from either end in O(1).",
      ],
      analogy:
        "Think of a browser's back/forward history. Each page you visit is a node. Pressing Back follows `prev`; pressing Forward follows `next`. The current page is just a pointer into the chain.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Define the Node class",
          description:
            "Each node stores `data`, a `next` reference (initially None), and a `prev` reference (initially None).",
        },
        {
          step: 2,
          title: "Initialise the list",
          description:
            "Create a DoublyLinkedList with `head = None` and `tail = None`. An empty list has both pointers set to None.",
        },
        {
          step: 3,
          title: "Append 10 to an empty list",
          description:
            "Create Node(10). Since the list is empty, both `head` and `tail` point to this node. Its `prev` and `next` remain None.",
        },
        {
          step: 4,
          title: "Append 20",
          description:
            "Create Node(20). Set node20.prev = node10 and node10.next = node20. Update `tail` to node20.",
        },
        {
          step: 5,
          title: "Append 30 and 40",
          description:
            "Repeat the append pattern. The list is now: None ← 10 ⇄ 20 ⇄ 30 ⇄ 40 → None. `head` = node10, `tail` = node40.",
        },
        {
          step: 6,
          title: "Forward traversal",
          description:
            "Start at `head`. Follow `next` pointers until `current` is None. Visits: 10 → 20 → 30 → 40.",
        },
        {
          step: 7,
          title: "Backward traversal",
          description:
            "Start at `tail`. Follow `prev` pointers until `current` is None. Visits: 40 → 30 → 20 → 10.",
        },
        {
          step: 8,
          title: "Insert 25 between 20 and 30",
          description:
            "Create Node(25). Set node25.prev = node20, node25.next = node30, node20.next = node25, node30.prev = node25. No other nodes are touched.",
        },
        {
          step: 9,
          title: "Delete node 20",
          description:
            "Redirect node10.next to node25 and node25.prev to node10. Then discard node20. The list is now: 10 ⇄ 25 ⇄ 30 ⇄ 40.",
        },
        {
          step: 10,
          title: "Prepend 5 to the front",
          description:
            "Create Node(5). Set node5.next = head (node10), node10.prev = node5. Update `head` to node5.",
        },
        {
          step: 11,
          title: "Pop from the tail",
          description:
            "Save tail (node40). Move `tail` to tail.prev (node30). Set node30.next = None. Discard node40. O(1) operation.",
        },
        {
          step: 12,
          title: "Search for a value",
          description:
            "Traverse from `head` following `next` pointers, comparing each node's data. Returns the node if found, None otherwise. O(n) worst case.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def append(self, data):
        node = Node(data)
        if self.tail is None:          # empty list
            self.head = self.tail = node
        else:
            node.prev = self.tail
            self.tail.next = node
            self.tail = node
        self.size += 1

    def prepend(self, data):
        node = Node(data)
        if self.head is None:
            self.head = self.tail = node
        else:
            node.next = self.head
            self.head.prev = node
            self.head = node
        self.size += 1

    def delete(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next      # deleting head
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev      # deleting tail
        self.size -= 1

    def search(self, data):
        cur = self.head
        while cur:
            if cur.data == data:
                return cur
            cur = cur.next
        return None

    def to_list(self):
        result, cur = [], self.head
        while cur:
            result.append(cur.data)
            cur = cur.next
        return result`,
      annotations: [
        {
          lines: "1-5",
          note: "Node holds data plus two pointers. Both default to None so a standalone node is valid.",
        },
        {
          lines: "15-22",
          note: "append() is O(1) because we keep a `tail` pointer — no traversal needed to reach the end.",
        },
        {
          lines: "24-31",
          note: "prepend() is also O(1) for the same reason — `head` gives direct access to the front.",
        },
        {
          lines: "33-41",
          note: "delete() accepts a node reference (not a value), making it O(1). The four pointer updates cover all edge cases: head, tail, and middle nodes.",
        },
        {
          lines: "43-49",
          note: "search() is O(n) in the worst case. If you store a dict of value→node externally you can make lookup O(1) — the basis of an LRU cache.",
        },
        {
          lines: "51-55",
          note: "to_list() is a convenience helper for testing. It demonstrates forward traversal using the `next` chain.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Access by index", notation: "O(n)", note: "Must traverse from head or tail" },
        { case: "Search by value", notation: "O(n)", note: "Linear scan" },
        { case: "Insert at head/tail", notation: "O(1)", note: "Direct pointer update" },
        { case: "Insert at known node", notation: "O(1)", note: "Re-link four pointers" },
        { case: "Delete at known node", notation: "O(1)", note: "Re-link two pointers" },
        { case: "Delete by value", notation: "O(n)", note: "Search first, then O(1) delete" },
      ],
      spaceRows: [
        { label: "Node storage", notation: "O(n)", note: "n nodes in the list" },
        {
          label: "Extra per node",
          notation: "O(1)",
          note: "Two extra pointers vs singly linked list",
        },
        { label: "Traversal stack", notation: "O(1)", note: "Iterative traversal uses constant space" },
      ],
      insights: [
        "The bidirectional `prev` pointer costs one extra reference per node but enables O(1) deletion when you already hold the node — critical for LRU cache eviction.",
        "Compared to an array, DLL avoids O(n) shifts on insert/delete at the cost of O(n) random access. Choose based on your access pattern.",
        "Maintaining both `head` and `tail` pointers makes prepend and append O(1), enabling efficient deque (double-ended queue) operations.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Circular Doubly Linked List",
          description:
            "tail.next points back to head and head.prev points to tail. Useful for round-robin schedulers and carousel UIs.",
        },
        {
          name: "XOR Linked List",
          description:
            "Stores XOR of prev and next addresses in a single pointer field, halving pointer memory at the cost of readability and language support.",
        },
        {
          name: "Skip List",
          description:
            "Layered doubly linked lists with express lanes for O(log n) average search — a probabilistic alternative to balanced BSTs.",
        },
        {
          name: "LRU Cache (DLL + HashMap)",
          description:
            "Combine a doubly linked list with a hash map to achieve O(1) get and put. The DLL tracks recency; the map provides O(1) node lookup.",
        },
        {
          name: "Deque (collections.deque in Python)",
          description:
            "Python's built-in deque is implemented as a doubly linked list of fixed-size blocks, giving O(1) appendleft/popleft alongside appendright/popright.",
        },
      ],
      tips: [
        "Always update BOTH sides of a link when inserting or deleting — forgetting one direction is the most common bug.",
        "Keep a `size` counter updated on every mutation; recomputing length via traversal is O(n) and easy to avoid.",
        "When deleting, set the removed node's `prev` and `next` to None to help the garbage collector and prevent accidental reuse.",
        "For the LRU cache pattern, store the node reference in the hash map so deletion is O(1) — never search the list by value.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "A doubly linked list extends the singly linked list with a `prev` pointer, enabling O(1) bidirectional traversal from any node.",
        "Insertions and deletions at a known node position are O(1) — only neighbouring pointers need updating.",
        "Random access remains O(n) because there is no index; choose arrays when you need frequent index-based lookups.",
        "Maintaining `head` and `tail` sentinels makes both ends of the list accessible in O(1), supporting deque semantics.",
        "The DLL + HashMap combination is the backbone of the LRU cache, one of the most frequently asked data structure design problems.",
        "Always update four pointers (or two on edge cases) atomically when inserting, and two (or one) when deleting to keep the list consistent.",
      ],
    },
  },
};

export default function DoublyLinkedListVideo() {
  return <AlgoVideo config={config} />;
}
