import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Hash Map (Chaining)",
  subtitle: "Hash map resolving collisions via separate chaining with linked lists.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Separate Chaining Solve?",
      bullets: [
        "A hash map maps arbitrary keys to values in O(1) average time by applying a hash function to convert a key into a bucket index.",
        "When two different keys hash to the same index — a collision — a naive implementation would overwrite the existing entry, losing data.",
        "Separate chaining resolves collisions by storing a linked list at every bucket. All keys that hash to the same index coexist in that bucket's chain.",
        "This means insertions are always O(1): compute the hash, prepend the new node to the bucket's list. No probing or rehashing of other entries is needed.",
        "Lookup and deletion traverse only the chain at the target bucket, keeping operations fast when the load factor (n/k) stays low.",
      ],
    },

    intuition: {
      heading: "Intuition: Pigeonholes with Overflow Trays",
      bullets: [
        "Imagine a wall of numbered pigeonholes (buckets). Each incoming letter (key) is assigned a pigeonhole by its address hash.",
        "When two letters share the same pigeonhole, instead of discarding one, you clip them together into a small stack — that stack is the linked list.",
        "Retrieving a letter means going to the right pigeonhole and flipping through the small stack until you find the correct name.",
        "As long as the stacks stay short (low load factor), every operation is effectively constant time.",
        "Resizing the wall (rehashing) redistributes the letters so no single pigeonhole becomes overcrowded.",
      ],
      analogy:
        "Think of a library with numbered shelves. Books are placed on shelf number = (ISBN % total_shelves). When two books land on the same shelf they are chained together with a clip. Finding a book means going to the right shelf and scanning only the clipped group — usually just one or two books.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Initialise the hash map",
          description:
            "Create an array of k buckets (e.g. k = 6). Each bucket starts as an empty linked list (None). The load factor threshold is typically 0.75.",
        },
        {
          step: 2,
          title: "Define the hash function",
          description:
            "hash(key) % k maps any key to a valid bucket index in [0, k-1]. Python's built-in hash() works for strings and ints; custom types need __hash__.",
        },
        {
          step: 3,
          title: "Insert (\"apple\", \"A\")",
          description:
            "Compute hash(\"apple\") % 6 = 2. Prepend a new node {key: \"apple\", val: \"A\", next: None} to bucket[2]'s list. bucket[2] now points to this node.",
        },
        {
          step: 4,
          title: "Insert (\"banana\", \"B\")",
          description:
            "hash(\"banana\") % 6 = 4. No collision — bucket[4] was empty. Prepend the node. bucket[4] → {\"banana\", \"B\"}.",
        },
        {
          step: 5,
          title: "Insert (\"cherry\", \"C\") — collision!",
          description:
            "hash(\"cherry\") % 6 = 2. Bucket[2] already contains \"apple\". Prepend the new node: bucket[2] → {\"cherry\", \"C\"} → {\"apple\", \"A\"}.",
        },
        {
          step: 6,
          title: "Insert (\"date\", \"D\") and (\"elderberry\", \"E\")",
          description:
            "\"date\" hashes to bucket[1] (no collision). \"elderberry\" hashes to bucket[4], creating a second collision: bucket[4] → {\"elderberry\", \"E\"} → {\"banana\", \"B\"}.",
        },
        {
          step: 7,
          title: "Lookup (\"cherry\")",
          description:
            "Compute hash(\"cherry\") % 6 = 2. Walk bucket[2]'s chain: first node key is \"cherry\" — match found. Return value \"C\". Only 1 comparison needed.",
        },
        {
          step: 8,
          title: "Lookup (\"apple\") — chain traversal",
          description:
            "hash(\"apple\") % 6 = 2. Walk bucket[2]: first node is \"cherry\" (no match), second node is \"apple\" (match). Return \"A\". Two comparisons.",
        },
        {
          step: 9,
          title: "Lookup (\"fig\") — miss",
          description:
            "hash(\"fig\") % 6 = 3. bucket[3] is empty (None). Return None immediately — no traversal needed.",
        },
        {
          step: 10,
          title: "Delete (\"banana\")",
          description:
            "hash(\"banana\") % 6 = 4. Traverse bucket[4]: first node is \"elderberry\" (skip), second is \"banana\" (match). Unlink: elderberry.next = banana.next (None). Chain is now bucket[4] → {\"elderberry\", \"E\"}.",
        },
        {
          step: 11,
          title: "Resize / rehash",
          description:
            "When load factor n/k exceeds 0.75, allocate a new array of size 2k. Re-insert every existing key using the new modulus. This keeps chains short and average lookup O(1).",
        },
        {
          step: 12,
          title: "Worst-case scenario",
          description:
            "If all n keys hash to the same bucket, the single chain has length n and every operation degrades to O(n). A good hash function and timely resizing prevent this.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None


class HashMap:
    def __init__(self, capacity=8):
        self.capacity = capacity
        self.size = 0
        self.buckets = [None] * self.capacity

    def _hash(self, key):
        return hash(key) % self.capacity

    def put(self, key, value):
        idx = self._hash(key)
        node = self.buckets[idx]
        while node:                        # check for existing key
            if node.key == key:
                node.value = value         # update in place
                return
            node = node.next
        new_node = Node(key, value)        # prepend to chain
        new_node.next = self.buckets[idx]
        self.buckets[idx] = new_node
        self.size += 1
        if self.size / self.capacity > 0.75:
            self._resize()

    def get(self, key):
        idx = self._hash(key)
        node = self.buckets[idx]
        while node:
            if node.key == key:
                return node.value
            node = node.next
        return None

    def remove(self, key):
        idx = self._hash(key)
        prev, node = None, self.buckets[idx]
        while node:
            if node.key == key:
                if prev:
                    prev.next = node.next
                else:
                    self.buckets[idx] = node.next
                self.size -= 1
                return True
            prev, node = node, node.next
        return False

    def _resize(self):
        old_buckets = self.buckets
        self.capacity *= 2
        self.buckets = [None] * self.capacity
        self.size = 0
        for head in old_buckets:
            node = head
            while node:
                self.put(node.key, node.value)
                node = node.next`,
      annotations: [
        {
          lines: "1-5",
          note: "Node stores a key-value pair plus a next pointer. Each bucket's linked list is built from these nodes.",
        },
        {
          lines: "14-15",
          note: "_hash() uses Python's built-in hash() and applies modulo so the index always falls within [0, capacity-1].",
        },
        {
          lines: "17-27",
          note: "put() first walks the chain to detect a duplicate key and update it in place. Only if the key is new does it prepend a fresh node — O(1) prepend, no traversal to the tail needed.",
        },
        {
          lines: "28-30",
          note: "The load-factor check after every insertion triggers a resize when the table is 75% full, keeping average chain length near 1.",
        },
        {
          lines: "32-39",
          note: "get() walks only the single bucket's chain. On a well-distributed table this chain averages O(1) length.",
        },
        {
          lines: "41-52",
          note: "remove() tracks a prev pointer to unlink the target node without a second pass. Returns True on success, False if the key was not found.",
        },
        {
          lines: "54-62",
          note: "_resize() doubles capacity and re-inserts all entries using the new modulus. This is O(n) but amortised O(1) per insertion over many operations.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Insert (average)",
          notation: "O(1)",
          note: "Hash + prepend to chain head",
        },
        {
          case: "Insert (worst)",
          notation: "O(n)",
          note: "All keys in one bucket; chain traversal for duplicate check",
        },
        {
          case: "Lookup (average)",
          notation: "O(1)",
          note: "Hash + short chain scan (load factor ≤ 0.75)",
        },
        {
          case: "Lookup (worst)",
          notation: "O(n)",
          note: "All keys collide into one chain",
        },
        {
          case: "Delete (average)",
          notation: "O(1)",
          note: "Hash + short chain scan with pointer unlink",
        },
        {
          case: "Resize / rehash",
          notation: "O(n)",
          note: "Re-inserts all n entries; amortised O(1) per put()",
        },
      ],
      spaceRows: [
        {
          label: "Bucket array",
          notation: "O(k)",
          note: "k = capacity; one pointer per bucket",
        },
        {
          label: "Chain nodes",
          notation: "O(n)",
          note: "n = number of stored key-value pairs",
        },
        {
          label: "Total",
          notation: "O(n + k)",
          note: "Dominated by n when load factor is near 0.75",
        },
      ],
      insights: [
        "With a good hash function and a load factor capped at 0.75, the expected chain length is ≤ 1, giving genuine O(1) average-case performance for all three operations.",
        "Separate chaining handles high load factors more gracefully than open addressing — chains grow without affecting other buckets, whereas open addressing suffers from clustering.",
        "Resizing is amortised O(1) per insertion: doubling the capacity means each entry is rehashed at most O(log n) times over its lifetime, so the total rehash cost is O(n).",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Open Addressing (Linear Probing)",
          description:
            "Instead of a linked list, colliding keys are placed in the next available slot. Better cache locality but suffers from clustering and needs a lower load-factor threshold.",
        },
        {
          name: "Robin Hood Hashing",
          description:
            "A variant of open addressing that steals slots from 'rich' entries (short probe distance) to give them to 'poor' entries, minimising worst-case probe lengths.",
        },
        {
          name: "Cuckoo Hashing",
          description:
            "Uses two hash functions and two tables. On collision the existing entry is 'kicked out' and re-inserted with its alternate hash, guaranteeing O(1) worst-case lookup.",
        },
        {
          name: "Consistent Hashing",
          description:
            "Used in distributed systems (e.g. Cassandra, DynamoDB). Keys and nodes are placed on a ring; adding or removing a node only remaps a fraction of the keys.",
        },
        {
          name: "Ordered Hash Map (LinkedHashMap)",
          description:
            "Augments each node with insertion-order prev/next pointers, enabling O(1) LRU eviction while keeping O(1) average lookup — the backbone of Python's dict since 3.7.",
        },
      ],
      tips: [
        "Choose a capacity that is a prime number to reduce modular clustering when keys have patterns (e.g. all even integers).",
        "Keep the load factor below 0.75 (Python's dict uses ~0.66). Above this threshold chain lengths grow super-linearly and performance degrades.",
        "When implementing __hash__ for custom objects, also implement __eq__ — Python requires that a == b implies hash(a) == hash(b).",
        "For security-sensitive applications (e.g. HTTP header parsing), use a hash function with randomised seeds (SipHash) to prevent hash-flooding DoS attacks.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "A hash map with separate chaining stores each bucket as a linked list, so colliding keys coexist without overwriting each other.",
        "All three operations — insert, lookup, delete — are O(1) on average when the load factor is kept below 0.75 with periodic resizing.",
        "The worst case is O(n) when all keys hash to the same bucket; a good hash function and load-factor control prevent this in practice.",
        "Resizing (doubling capacity and rehashing) costs O(n) but is amortised O(1) per insertion over the lifetime of the map.",
        "Separate chaining tolerates higher load factors better than open addressing and avoids the clustering and deletion-tombstone problems of probing schemes.",
        "Python's built-in dict uses a highly optimised open-addressing scheme, but understanding chaining is essential for implementing LRU caches, consistent hashing, and custom hash tables.",
      ],
    },
  },
};

export default function HashMapChainingVideo() {
  return <AlgoVideo config={config} />;
}
