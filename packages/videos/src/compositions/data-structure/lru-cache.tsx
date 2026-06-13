import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "LRU Cache",
  subtitle:
    "Cache evicting least recently used item, implemented with hash map and doubly linked list.",
  category: "data-structure",
  difficulty: "advanced",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Design a data structure that follows the Least Recently Used (LRU) cache eviction policy.",
        "The cache has a fixed capacity. Once full, inserting a new key must evict the key that was accessed least recently.",
        "Implement two operations: get(key) returns the value if the key exists, otherwise -1.",
        "put(key, value) inserts or updates the key. If the cache is at capacity, evict the LRU entry before inserting.",
        "Both get and put must run in O(1) average time complexity.",
      ],
    },
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "We need O(1) lookup → use a hash map keyed by cache key, storing pointers to nodes.",
        "We need O(1) eviction of the oldest item and O(1) promotion of any item to 'most recent' → use a doubly linked list.",
        "Combine both: the hash map gives instant access to any node; the doubly linked list maintains access order.",
        "Head of the list = most recently used (MRU). Tail = least recently used (LRU).",
        "Real-world analogy: a browser's back-history tab list. The tab you just visited is at the front; the one you haven't touched in weeks is at the back and gets closed first when memory is low.",
      ],
      analogy:
        "Think of a desk with limited space. You keep your most-used books on top. When the desk is full and you need a new book, you remove the one buried at the bottom that you haven't touched in the longest time.",
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Initialize: create an empty hash map and a doubly linked list with two sentinel nodes (dummy head and dummy tail). Sentinels simplify edge-case handling.",
        },
        {
          step: 2,
          description:
            "put(1, 'A'): key 1 not in map. Create node(1,'A'), insert after dummy head. Map: {1→node}. List: HEAD ↔ [1:A] ↔ TAIL.",
        },
        {
          step: 3,
          description:
            "put(2, 'B'): key 2 not in map. Create node(2,'B'), insert after dummy head. Map: {1,2}. List: HEAD ↔ [2:B] ↔ [1:A] ↔ TAIL.",
        },
        {
          step: 4,
          description:
            "put(3, 'C'): cache now full (capacity=3). Map: {1,2,3}. List: HEAD ↔ [3:C] ↔ [2:B] ↔ [1:A] ↔ TAIL.",
        },
        {
          step: 5,
          description:
            "get(2): key 2 exists. Remove node(2) from its current position, re-insert after dummy head. Returns 'B'. List: HEAD ↔ [2:B] ↔ [3:C] ↔ [1:A] ↔ TAIL.",
        },
        {
          step: 6,
          description:
            "put(4, 'D'): cache is full. LRU = node before dummy tail = node(1,'A'). Evict it: remove from list, delete from map. Map: {2,3,4}.",
        },
        {
          step: 7,
          description:
            "After eviction, insert node(4,'D') after dummy head. List: HEAD ↔ [4:D] ↔ [2:B] ↔ [3:C] ↔ TAIL.",
        },
        {
          step: 8,
          description:
            "get(1): key 1 was evicted, not in map. Return -1. Cache state unchanged.",
        },
        {
          step: 9,
          description:
            "get(3): key 3 exists. Move node(3) to front. List: HEAD ↔ [3:C] ↔ [4:D] ↔ [2:B] ↔ TAIL.",
        },
        {
          step: 10,
          description:
            "put(5, 'E'): cache full again. LRU = node(2,'B'). Evict it. Insert node(5,'E') at front. List: HEAD ↔ [5:E] ↔ [3:C] ↔ [4:D] ↔ TAIL.",
        },
        {
          step: 11,
          description:
            "Key insight: every get and put does exactly two operations on the linked list (remove + insert at head), both O(1) because we hold direct node pointers from the hash map.",
        },
        {
          step: 12,
          description:
            "Sentinel nodes eliminate null-checks: inserting after head and removing before tail never requires special-casing empty or single-element lists.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      snippet: `class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.map: dict[int, Node] = {}
        # Sentinel head (MRU side) and tail (LRU side)
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_front(self, node: Node) -> None:
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.map:
            return -1
        node = self.map[key]
        self._remove(node)
        self._insert_front(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.map:
            self._remove(self.map[key])
        node = Node(key, value)
        self.map[key] = node
        self._insert_front(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev   # node just before sentinel tail
            self._remove(lru)
            del self.map[lru.key]`,
      annotations: [
        {
          lines: [1, 6],
          note: "Node stores key (needed during eviction to delete from map) and val, plus doubly linked prev/next pointers.",
        },
        {
          lines: [13, 16],
          note: "Two sentinel nodes remove all edge-case checks. head.next is always MRU; tail.prev is always LRU.",
        },
        {
          lines: [18, 21],
          note: "_remove unlinks a node in O(1) by rewiring its neighbors — no traversal needed.",
        },
        {
          lines: [23, 27],
          note: "_insert_front places a node immediately after the dummy head, making it the new MRU in O(1).",
        },
        {
          lines: [29, 34],
          note: "get promotes the accessed node to MRU by removing it and re-inserting at front. Returns -1 on miss.",
        },
        {
          lines: [36, 44],
          note: "put handles both update and insert. Eviction fires only when map size exceeds capacity after insertion — tail.prev is the LRU node.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Complexity Analysis",
      timeRows: [
        { label: "get(key)", best: "O(1)", avg: "O(1)", worst: "O(1)" },
        { label: "put(key, value)", best: "O(1)", avg: "O(1)", worst: "O(1)" },
        { label: "Eviction", best: "O(1)", avg: "O(1)", worst: "O(1)" },
      ],
      spaceRows: [
        { label: "Hash Map", complexity: "O(n)" },
        { label: "Doubly Linked List", complexity: "O(n)" },
        { label: "Total", complexity: "O(n)" },
      ],
      insights: [
        "All operations are O(1) because the hash map gives direct node access, eliminating list traversal entirely.",
        "Space is O(n) where n = capacity. Both the map and list hold at most n entries simultaneously.",
        "Python's OrderedDict internally uses the same hash map + doubly linked list design, making it a one-liner alternative for interviews.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "LFU Cache (Least Frequently Used)",
          description:
            "Evicts the item with the lowest access frequency instead of recency. Requires a frequency map and a set of doubly linked lists per frequency level. O(1) with careful bookkeeping.",
        },
        {
          name: "MRU Cache (Most Recently Used)",
          description:
            "Evicts the most recently used item — useful for access patterns where recent items are unlikely to be reused (e.g., sequential scans). Simply evict head.next instead of tail.prev.",
        },
        {
          name: "Segmented LRU (SLRU)",
          description:
            "Divides the cache into a probationary segment and a protected segment. Items start in probationary; a second hit promotes them to protected. Avoids cache pollution from one-time scans.",
        },
        {
          name: "Thread-Safe LRU",
          description:
            "Wraps get/put with a ReentrantReadWriteLock or uses ConcurrentHashMap + synchronized doubly linked list. Java's LinkedHashMap with accessOrder=true is a common starting point.",
        },
        {
          name: "Distributed LRU (Redis)",
          description:
            "Redis implements approximate LRU by sampling a random subset of keys and evicting the oldest among them. Trades exactness for lower memory overhead and higher throughput.",
        },
      ],
      tips: [
        "Always store the key inside the Node — you need it when evicting the LRU node to delete it from the hash map.",
        "Use two sentinel (dummy) nodes for head and tail to eliminate null-checks on empty or single-element lists.",
        "In Python interviews, OrderedDict with move_to_end() and popitem(last=False) gives a clean two-liner solution — know both approaches.",
        "For capacity=1 the algorithm degenerates: every put evicts the previous entry. Test this edge case explicitly.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "LRU Cache combines a hash map (O(1) lookup) and a doubly linked list (O(1) ordered insert/remove) to achieve O(1) for both get and put.",
        "The doubly linked list maintains access order: MRU at the head, LRU at the tail. Sentinel nodes simplify pointer manipulation.",
        "On every get, the accessed node is moved to the front. On every put, the new node is inserted at the front; if over capacity, the tail node is evicted.",
        "Storing the key inside each Node is essential — it lets us delete the evicted entry from the hash map in O(1) without a reverse lookup.",
        "Real-world caches (CPU L1/L2, browser cache, database buffer pool) use LRU or approximations of it because recency is a strong predictor of future access.",
        "LeetCode #146 is the canonical problem. Master the sentinel-node doubly linked list pattern — it appears in many other list manipulation problems.",
      ],
    },
  ],
};

export default function LruCacheVideo() {
  return <AlgoVideo config={config} />;
}
