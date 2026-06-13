import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Hash Table",
  subtitle: "Hash table resolving collisions via open addressing (linear probing).",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What Problem Does a Hash Table Solve?",
      bullets: [
        "We need a data structure that maps arbitrary keys to values in near-constant time.",
        "Arrays give O(1) access by integer index, but keys are often strings, objects, or large integers.",
        "A hash function converts any key into a valid array index: index = hash(key) % tableSize.",
        "Two different keys can produce the same index — this is called a collision and must be handled.",
        "Open addressing with linear probing resolves collisions by scanning forward for the next empty slot.",
      ],
    },

    {
      kind: "intuition",
      heading: "The Core Intuition",
      bullets: [
        "Think of a hash table as a parking lot: each car (key) is assigned a preferred spot (hash index).",
        "If the preferred spot is taken, the driver checks the next spot, then the next — that's linear probing.",
        "A good hash function distributes cars evenly so most drivers find their spot on the first try.",
        "The load factor α = n/m (entries / slots) measures how full the lot is; keep it below 0.7.",
        "When the lot gets too full, we build a bigger lot and move every car — this is rehashing.",
      ],
      analogy:
        "Like a hotel front desk: you're assigned room 204, but it's taken, so the clerk tries 205, 206… until a free room is found.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step: Insert, Search, Delete",
      steps: [
        {
          step: 1,
          label: "Create empty table",
          description:
            "Allocate an array of size m (e.g., 11). Every slot starts as None (empty).",
        },
        {
          step: 2,
          label: "Define hash function",
          description:
            "hash(key) = key % m. For key=22, m=11: index = 22 % 11 = 0.",
        },
        {
          step: 3,
          label: "Insert key=22",
          description:
            "Compute hash(22)=0. Slot 0 is empty → store 22 at index 0.",
          values: [22, null, null, null, null, null, null, null, null, null, null],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          label: "Insert key=33",
          description:
            "hash(33)=0. Slot 0 is occupied (collision!). Probe slot 1 → empty → store 33 at index 1.",
          values: [22, 33, null, null, null, null, null, null, null, null, null],
          colors: ["blue", "green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 5,
          label: "Insert key=55",
          description:
            "hash(55)=0. Slots 0 and 1 occupied. Probe 2 → empty → store 55 at index 2.",
          values: [22, 33, 55, null, null, null, null, null, null, null, null],
          colors: ["blue", "blue", "green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          label: "Insert key=7",
          description:
            "hash(7)=7. Slot 7 is empty → store 7 at index 7 directly.",
          values: [22, 33, 55, null, null, null, null, 7, null, null, null],
          colors: ["blue", "blue", "blue", "gray", "gray", "gray", "gray", "green", "gray", "gray", "gray"],
        },
        {
          step: 7,
          label: "Search for key=55",
          description:
            "hash(55)=0. Check slot 0: 22≠55. Check slot 1: 33≠55. Check slot 2: 55=55 → FOUND at index 2.",
          values: [22, 33, 55, null, null, null, null, 7, null, null, null],
          colors: ["yellow", "yellow", "green", "gray", "gray", "gray", "gray", "blue", "gray", "gray", "gray"],
        },
        {
          step: 8,
          label: "Search for key=99 (not present)",
          description:
            "hash(99)=0. Probe 0→22, 1→33, 2→55, 3→None. Empty slot reached → key NOT found.",
        },
        {
          step: 9,
          label: "Delete key=33",
          description:
            "hash(33)=0. Probe to slot 1. Mark slot 1 as DELETED (tombstone). Future searches skip tombstones; future inserts can reuse them.",
          values: [22, "DEL", 55, null, null, null, null, 7, null, null, null],
          colors: ["blue", "orange", "blue", "gray", "gray", "gray", "gray", "blue", "gray", "gray", "gray"],
        },
        {
          step: 10,
          label: "Why tombstones matter",
          description:
            "Without tombstones, deleting slot 1 would break the probe chain for key=55. The tombstone preserves chain integrity.",
        },
        {
          step: 11,
          label: "Load factor check",
          description:
            "α = 3/11 ≈ 0.27. Well below 0.7 threshold — no rehashing needed. Performance stays near O(1).",
        },
        {
          step: 12,
          label: "Rehashing",
          description:
            "When α ≥ 0.7, allocate a new table of size ~2m (next prime). Re-insert all non-deleted entries using the new hash function.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `class HashTable:
    EMPTY = None
    DELETED = "__DELETED__"

    def __init__(self, size=11):
        self.size = size
        self.table = [self.EMPTY] * size
        self.count = 0

    def _hash(self, key):
        return hash(key) % self.size

    def insert(self, key):
        if self.count / self.size >= 0.7:
            self._rehash()
        idx = self._hash(key)
        first_deleted = None
        for _ in range(self.size):
            slot = self.table[idx]
            if slot is self.EMPTY:
                target = first_deleted if first_deleted is not None else idx
                self.table[target] = key
                self.count += 1
                return target
            elif slot is self.DELETED:
                if first_deleted is None:
                    first_deleted = idx
            elif slot == key:
                return idx  # already present
            idx = (idx + 1) % self.size
        raise Exception("Hash table is full")

    def search(self, key):
        idx = self._hash(key)
        for _ in range(self.size):
            slot = self.table[idx]
            if slot is self.EMPTY:
                return -1
            if slot == key:
                return idx
            idx = (idx + 1) % self.size
        return -1

    def delete(self, key):
        idx = self.search(key)
        if idx == -1:
            return False
        self.table[idx] = self.DELETED
        self.count -= 1
        return True

    def _rehash(self):
        old = self.table
        self.size = self.size * 2 + 1
        self.table = [self.EMPTY] * self.size
        self.count = 0
        for item in old:
            if item is not self.EMPTY and item is not self.DELETED:
                self.insert(item)`,
      annotations: [
        {
          lines: [1, 3],
          note: "Sentinel values distinguish empty slots (never used) from deleted tombstones (previously used).",
        },
        {
          lines: [10, 11],
          note: "Python's built-in hash() works for any hashable type; modulo maps to a valid index.",
        },
        {
          lines: [13, 14],
          note: "Check load factor before every insert. Rehash proactively to keep performance O(1) amortized.",
        },
        {
          lines: [17, 22],
          note: "Track the first tombstone found — we can reuse it as the insertion slot, saving space.",
        },
        {
          lines: [30, 35],
          note: "Search stops at EMPTY (key absent) but skips DELETED tombstones to preserve probe chains.",
        },
        {
          lines: [44, 50],
          note: "Rehash doubles size and re-inserts all live entries. Tombstones are discarded — the new table is clean.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(1)", note: "No collision — direct slot access" },
        { case: "Average", complexity: "O(1)", note: "Low load factor, short probe sequences" },
        { case: "Worst", complexity: "O(n)", note: "All keys hash to same slot (full table or bad hash)" },
      ],
      spaceRows: [
        { operation: "Table storage", complexity: "O(m)", note: "m = allocated slots, m ≥ n" },
        { operation: "Extra (probing)", complexity: "O(1)", note: "In-place; no linked lists or extra arrays" },
      ],
      insights: [
        "Average O(1) holds only when α < 0.7. Beyond that, expected probe length grows rapidly.",
        "Worst-case O(n) occurs with a pathological hash function or a nearly-full table — rare in practice.",
        "Rehashing costs O(n) but happens at most O(log n) times over n insertions, giving O(1) amortized.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Quadratic Probing",
          description:
            "Probe at offsets +1², +2², +3²… instead of +1. Reduces primary clustering but may not probe all slots.",
        },
        {
          name: "Double Hashing",
          description:
            "Use a second hash function for step size: idx = (h1(k) + i*h2(k)) % m. Best distribution among open-addressing schemes.",
        },
        {
          name: "Separate Chaining",
          description:
            "Each slot holds a linked list of all keys that hash there. Simpler deletion, but uses extra memory and has worse cache behavior.",
        },
        {
          name: "Robin Hood Hashing",
          description:
            "During insertion, displace entries that are 'richer' (closer to home) to reduce variance in probe lengths.",
        },
        {
          name: "Cuckoo Hashing",
          description:
            "Use two hash functions and two tables. On collision, evict the existing key and re-insert it. Guarantees O(1) worst-case lookup.",
        },
      ],
      tips: [
        "Always use a prime number for table size — it minimizes clustering with modular hash functions.",
        "Prefer rehashing at α=0.5–0.7 for open addressing; chaining can tolerate higher load factors.",
        "Use tombstones carefully: periodic full rehashes flush accumulated tombstones and restore performance.",
        "For string keys, MurmurHash or FNV-1a distribute bits better than Python's default hash().",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "A hash table achieves O(1) average insert, search, and delete by mapping keys to indices via a hash function.",
        "Linear probing resolves collisions by scanning forward sequentially — simple and cache-friendly.",
        "Tombstone markers are essential for deletion: they preserve probe chains without breaking future searches.",
        "Load factor α must stay below ~0.7 for open addressing; exceed it and performance degrades sharply.",
        "Rehashing doubles the table size and re-inserts all live entries, restoring O(1) amortized performance.",
        "Double hashing or Robin Hood hashing can reduce clustering at the cost of slightly more complexity.",
      ],
    },
  ],
};

export default function HashTableVideo() {
  return <AlgoVideo config={config} />;
}
