import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Hash Map (Open Addressing)",
  subtitle: "Hash map using quadratic probing for open addressing.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Open Addressing Solve?",
      bullets: [
        "A hash map must store key-value pairs and retrieve them in near-constant time — but two keys can hash to the same index, causing a collision.",
        "Separate chaining resolves collisions with linked lists at each bucket, but this adds pointer overhead and poor cache locality.",
        "Open addressing keeps all entries inside a single contiguous array, making the structure cache-friendly and memory-compact.",
        "When a collision occurs, the algorithm probes — inspects a sequence of alternative slots — until it finds an empty one to store the new entry.",
        "Quadratic probing uses the formula index = (h(k) + i²) mod m for the i-th probe, spreading entries more evenly than simple linear probing and reducing primary clustering.",
      ],
    },

    intuition: {
      heading: "Building the Mental Model",
      bullets: [
        "Think of the hash table as a flat parking lot. Each car (key) has a preferred spot (h(k)). If that spot is taken, the driver tries spots 1, 4, 9, 16, ... steps away — quadratic jumps.",
        "Quadratic probing's non-linear jumps break up the 'runs' of occupied cells that plague linear probing, keeping average probe lengths short.",
        "A tombstone marker (DELETED) is placed in a slot when its entry is removed. Future searches skip tombstones but inserts can reuse them, preventing false 'not found' results.",
        "The load factor α = n/m (entries / table size) governs performance. Quadratic probing degrades rapidly above α ≈ 0.5, so the table must be resized before that threshold.",
        "Unlike separate chaining, open addressing guarantees that all data fits in a single array — ideal for embedded systems, caches, and performance-critical code.",
      ],
      analogy:
        "Real-world analogy: a hotel with numbered rooms. You booked room 42, but it's occupied. The receptionist tries rooms 43, 46, 51, 58 (42+1², 42+2², 42+3², 42+4²) until finding a vacancy — quadratic probing in action.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Initialise the table",
          description:
            "Allocate an array of size m = 11 (a prime). Each slot holds a (key, value) pair or is marked EMPTY. Set count = 0.",
        },
        {
          step: 2,
          title: "Insert key=10, value=100",
          description: "h(10) = 10 % 11 = 10. Slot 10 is EMPTY → store (10, 100) there. count = 1. No probing needed.",
        },
        {
          step: 3,
          title: "Insert key=21, value=210",
          description:
            "h(21) = 21 % 11 = 10. Slot 10 is OCCUPIED. Probe i=1: (10+1) % 11 = 0. Slot 0 is EMPTY → store (21, 210) at slot 0. count = 2.",
        },
        {
          step: 4,
          title: "Insert key=32, value=320",
          description:
            "h(32) = 32 % 11 = 10. Slot 10 occupied. i=1 → slot 0 occupied. i=2 → (10+4)%11 = 3. Slot 3 EMPTY → store (32, 320). count = 3.",
        },
        {
          step: 5,
          title: "Insert key=43, value=430",
          description:
            "h(43) = 10. Slots 10, 0, 3 occupied. i=3 → (10+9)%11 = 8. Slot 8 EMPTY → store (43, 430). count = 4.",
        },
        {
          step: 6,
          title: "Insert key=65, value=650 — collision chain",
          description:
            "h(65) = 10. Probe i=1 → slot 0 occupied. i=2 → slot 3 occupied. i=3 → slot 8 occupied. i=4 → (10+16)%11 = 4. Slot 4 EMPTY → store (65, 650). count = 5.",
        },
        {
          step: 7,
          title: "Search for key=43",
          description:
            "h(43) = 10. Slot 10: key=10 ≠ 43. i=1 → slot 0: key=21 ≠ 43. i=2 → slot 3: key=32 ≠ 43. i=3 → slot 8: key=43 ✓ — found! Return value=430.",
        },
        {
          step: 8,
          title: "Search for key=99 (absent)",
          description:
            "h(99) = 0. Slot 0: key=21 ≠ 99. i=1 → (0+1)%11 = 1. Slot 1 is EMPTY → stop. key=99 is not in the map.",
        },
        {
          step: 9,
          title: "Delete key=32 — place tombstone",
          description:
            "Find slot 3 (same probe sequence as insert). Mark slot 3 as DELETED (tombstone). count = 4. Do NOT leave it EMPTY — that would break future searches.",
        },
        {
          step: 10,
          title: "Search after deletion",
          description:
            "Searching for key=65: h(65)=10. Probe hits slot 0 (21), slot 3 (DELETED — skip, do not stop), slot 8 (43 ≠ 65), slot 4 (65 ✓). Tombstone correctly skipped.",
        },
        {
          step: 11,
          title: "Insert reuses tombstone",
          description:
            "Inserting key=77: h(77) = 0. Slot 0 occupied. i=1 → slot 1 is EMPTY, but we passed tombstone at slot 3 earlier — record it. If no EMPTY found before a tombstone, reuse the tombstone slot.",
        },
        {
          step: 12,
          title: "Check load factor & resize",
          description:
            "After several inserts, α = count/m approaches 0.5. Allocate a new array of size 23 (next prime after 2×11). Re-insert all live entries — tombstones are discarded. count resets to live entries only.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class HashMap:
    _EMPTY = object()
    _DELETED = object()

    def __init__(self, capacity: int = 11):
        self._cap = capacity
        self._table: list = [self._EMPTY] * self._cap
        self._vals: list = [None] * self._cap
        self._count = 0

    def _hash(self, key: int) -> int:
        return key % self._cap

    def _probe(self, base: int, i: int) -> int:
        """Quadratic probing: (base + i^2) mod capacity."""
        return (base + i * i) % self._cap

    def put(self, key: int, value) -> None:
        if self._count / self._cap >= 0.5:
            self._resize()
        base = self._hash(key)
        first_tomb = -1
        for i in range(self._cap):
            idx = self._probe(base, i)
            if self._table[idx] is self._EMPTY:
                slot = first_tomb if first_tomb != -1 else idx
                self._table[slot] = key
                self._vals[slot] = value
                self._count += 1
                return
            if self._table[idx] is self._DELETED:
                if first_tomb == -1:
                    first_tomb = idx
            elif self._table[idx] == key:
                self._vals[idx] = value  # update existing
                return
        raise RuntimeError("Hash map is full")

    def get(self, key: int):
        base = self._hash(key)
        for i in range(self._cap):
            idx = self._probe(base, i)
            if self._table[idx] is self._EMPTY:
                return None
            if self._table[idx] is not self._DELETED and self._table[idx] == key:
                return self._vals[idx]
        return None

    def delete(self, key: int) -> bool:
        base = self._hash(key)
        for i in range(self._cap):
            idx = self._probe(base, i)
            if self._table[idx] is self._EMPTY:
                return False
            if self._table[idx] is not self._DELETED and self._table[idx] == key:
                self._table[idx] = self._DELETED
                self._vals[idx] = None
                self._count -= 1
                return True
        return False

    def _resize(self) -> None:
        old_table, old_vals = self._table, self._vals
        self._cap = self._next_prime(self._cap * 2)
        self._table = [self._EMPTY] * self._cap
        self._vals = [None] * self._cap
        self._count = 0
        for k, v in zip(old_table, old_vals):
            if k is not self._EMPTY and k is not self._DELETED:
                self.put(k, v)

    @staticmethod
    def _next_prime(n: int) -> int:
        def is_prime(x):
            if x < 2: return False
            for d in range(2, int(x**0.5) + 1):
                if x % d == 0: return False
            return True
        while not is_prime(n):
            n += 1
        return n`,
      annotations: [
        {
          lines: "2-3",
          note: "Sentinel objects _EMPTY and _DELETED distinguish three slot states. Using unique objects avoids collisions with legitimate key values like 0 or None.",
        },
        {
          lines: "13-15",
          note: "_probe() implements quadratic probing: (base + i²) mod capacity. The i² term spreads probes non-linearly, reducing primary clustering compared to linear probing.",
        },
        {
          lines: "17-32",
          note: "put() records the first tombstone encountered. If a live EMPTY slot is found first, it uses that. If no EMPTY is found but a tombstone was seen, it reuses the tombstone — preventing unnecessary table growth.",
        },
        {
          lines: "34-42",
          note: "get() stops at EMPTY (key absent) but skips DELETED tombstones. This is the critical invariant: tombstones must not terminate a search chain.",
        },
        {
          lines: "44-53",
          note: "delete() replaces the found slot with _DELETED rather than _EMPTY. Setting it to _EMPTY would break the probe chain for any keys that were inserted past this slot.",
        },
        {
          lines: "55-65",
          note: "_resize() doubles the capacity to the next prime, then re-inserts all live entries. Tombstones are naturally discarded, cleaning up dead slots and resetting the load factor.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "put (no collision)", notation: "O(1)", note: "Direct hash to empty slot" },
        { case: "put (avg, α < 0.5)", notation: "O(1)", note: "Expected probes ≈ 1/(1-α)" },
        { case: "put (worst case)", notation: "O(n)", note: "Many collisions or full table" },
        { case: "get (avg, α < 0.5)", notation: "O(1)", note: "Probe chain stays short" },
        { case: "get (worst case)", notation: "O(n)", note: "Degenerate clustering" },
        { case: "delete", notation: "O(1) avg", note: "Same probe sequence as get" },
        { case: "resize / rehash", notation: "O(n)", note: "Re-insert all n live entries" },
      ],
      spaceRows: [
        { label: "Table array", notation: "O(m)", note: "m = allocated capacity" },
        { label: "Live entries", notation: "O(n)", note: "n = number of stored keys" },
        { label: "Auxiliary (per op)", notation: "O(1)", note: "No recursion, no extra arrays" },
      ],
      insights: [
        "Quadratic probing guarantees that every slot is visited if the table size is prime and α < 0.5 — a mathematically provable result. Use a prime capacity and resize before hitting 50% full.",
        "The expected number of probes for a successful lookup is approximately (1/2)(1 + 1/(1-α)), and for an unsuccessful lookup (1/2)(1 + 1/(1-α)²). Both blow up as α → 1.",
        "Open addressing is typically faster than chaining in practice because all data lives in one array, maximising CPU cache utilisation and avoiding heap allocations for linked list nodes.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Linear Probing",
          description:
            "index = (h(k) + i) mod m. Simplest probe sequence; excellent cache locality but prone to primary clustering — long runs of occupied slots that slow inserts and lookups.",
        },
        {
          name: "Double Hashing",
          description:
            "index = (h1(k) + i·h2(k)) mod m. Uses a second hash function as the step size, eliminating both primary and secondary clustering. Requires two well-designed hash functions.",
        },
        {
          name: "Robin Hood Hashing",
          description:
            "A variant of linear probing that evicts the 'richer' entry (shorter probe distance) in favour of the 'poorer' one (longer probe distance), bounding the maximum probe length and improving average performance.",
        },
        {
          name: "Cuckoo Hashing",
          description:
            "Uses two hash tables and two hash functions. On collision, the existing entry is evicted and re-inserted into its alternate table. Guarantees O(1) worst-case lookup at the cost of complex inserts.",
        },
        {
          name: "Swiss Table / F14 (Flat Hash Map)",
          description:
            "Modern production hash maps (used in Abseil, Folly) combine open addressing with SIMD instructions to probe 16 slots simultaneously, achieving near-theoretical throughput on modern CPUs.",
        },
      ],
      tips: [
        "Always use a prime number as the table capacity. Prime sizes ensure the quadratic probe sequence visits every slot before repeating, avoiding infinite loops on a non-full table.",
        "Resize when α exceeds 0.5 for quadratic probing (vs 0.7–0.75 for separate chaining). Waiting too long causes probe chains to grow super-linearly and performance to collapse.",
        "Track tombstone count separately. If tombstones + live entries exceed the resize threshold, trigger a rehash even if live entries alone do not — tombstones inflate effective load.",
        "For integer keys, the identity function (key % m) is an excellent hash. For string keys, use a polynomial rolling hash (e.g., FNV-1a or djb2) to distribute characters evenly.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "Open addressing stores all entries in a single flat array — no linked list nodes, no pointer chasing, and excellent CPU cache utilisation.",
        "Quadratic probing uses index = (h(k) + i²) mod m to spread colliding keys across the table, reducing the primary clustering that plagues linear probing.",
        "Tombstone markers are essential: deleting a slot by marking it EMPTY would silently break the probe chains of keys inserted past that slot.",
        "Keep the load factor below 0.5 for quadratic probing. Beyond this threshold, probe chains lengthen rapidly and average-case O(1) operations degrade toward O(n).",
        "Always choose a prime table capacity. This mathematical property guarantees the quadratic probe sequence visits every slot, preventing infinite loops during insertion.",
        "For production use, consider Robin Hood hashing or SIMD-accelerated flat hash maps (Swiss Table / Abseil flat_hash_map) which build on these principles with further optimisations.",
      ],
    },
  },
}

export default function HashMapOpenAddressingVideo() {
  return <AlgoVideo config={config} />
}
