import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Bloom Filter",
  subtitle: "Space-efficient probabilistic membership testing with possible false positives.",
  category: "data-structure",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "The Membership Problem",
      bullets: [
        "Given a large set of elements, we need to quickly answer: 'Is this element in the set?'",
        "A hash set gives exact answers but consumes O(n) memory proportional to stored elements.",
        "For massive datasets (billions of URLs, passwords, IPs), exact sets become infeasible.",
        "We need a structure that uses far less memory and still answers membership queries fast.",
        "We can tolerate occasional false positives if it means dramatic memory savings.",
      ],
    },

    intuition: {
      heading: "The Core Idea",
      bullets: [
        "Use a bit array of m bits, all initialized to 0.",
        "Apply k independent hash functions to each element; set those k bit positions to 1.",
        "To query: hash the element with all k functions and check if every bit position is 1.",
        "If any bit is 0, the element is DEFINITELY not in the set (no false negatives).",
        "If all bits are 1, the element is PROBABLY in the set — collisions can cause false positives.",
      ],
      analogy:
        "Think of a nightclub bouncer with a checklist of 1000 boxes. When a guest arrives, they stamp 3 random boxes for that guest. To check if someone was there, you look at their 3 boxes — if any box is blank, they weren't there. If all 3 are stamped, they probably were — but someone else might have stamped those same boxes.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Initialize the bit array",
          description: "Create a bit array of m=16 bits, all set to 0. Choose k=3 hash functions.",
        },
        {
          step: 2,
          title: "Insert 'apple'",
          description: "Compute h1('apple')=1, h2('apple')=5, h3('apple')=11. Set bits 1, 5, 11 to 1.",
        },
        {
          step: 3,
          title: "Insert 'cat'",
          description: "Compute h1('cat')=3, h2('cat')=7, h3('cat')=13. Set bits 3, 7, 13 to 1.",
        },
        {
          step: 4,
          title: "Insert 'dog'",
          description: "Compute h1('dog')=2, h2('dog')=5, h3('dog')=9. Set bits 2, 5, 9 to 1. Bit 5 was already set — no problem.",
        },
        {
          step: 5,
          title: "Query 'apple' — True Positive",
          description: "Check bits 1, 5, 11. All are 1. Result: PROBABLY IN SET. Correct!",
        },
        {
          step: 6,
          title: "Query 'xyz' — True Negative",
          description: "Check bits 0, 4, 15. Bit 0 is 0. Result: DEFINITELY NOT IN SET. Correct!",
        },
        {
          step: 7,
          title: "Query 'fish' — False Positive",
          description: "h1('fish')=2, h2('fish')=5, h3('fish')=7. Bits 2, 5, 7 are all 1 (set by 'dog' and 'cat'). Result: PROBABLY IN SET — but 'fish' was never inserted!",
        },
        {
          step: 8,
          title: "Understanding false positive rate",
          description: "FP probability ≈ (1 - e^(-kn/m))^k. With m=16, n=3, k=3: p ≈ 0.05 (5%).",
        },
        {
          step: 9,
          title: "Optimal number of hash functions",
          description: "The optimal k = (m/n) * ln(2). This minimizes the false positive rate for given m and n.",
        },
        {
          step: 10,
          title: "Choosing m for a target FP rate",
          description: "For FP rate p and n elements: m = -n * ln(p) / (ln(2))^2. For 1% FP rate with 1M items: ~9.6 MB vs ~32 MB for a hash set.",
        },
        {
          step: 11,
          title: "No deletion support",
          description: "You cannot safely delete from a standard Bloom filter — clearing a bit might invalidate other elements that share it.",
        },
        {
          step: 12,
          title: "Counting Bloom filter variant",
          description: "Replace each bit with a small counter (4 bits). Increment on insert, decrement on delete. Supports deletion at 4x memory cost.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import math
import mmh3  # MurmurHash3 — pip install mmh3
from bitarray import bitarray  # pip install bitarray

class BloomFilter:
    def __init__(self, capacity: int, fp_rate: float = 0.01):
        self.capacity = capacity
        self.fp_rate = fp_rate
        # Optimal bit array size
        self.m = self._optimal_m(capacity, fp_rate)
        # Optimal number of hash functions
        self.k = self._optimal_k(self.m, capacity)
        self.bit_array = bitarray(self.m)
        self.bit_array.setall(0)
        self.count = 0

    def _optimal_m(self, n: int, p: float) -> int:
        return math.ceil(-n * math.log(p) / (math.log(2) ** 2))

    def _optimal_k(self, m: int, n: int) -> int:
        return max(1, round((m / n) * math.log(2)))

    def _hash_positions(self, item: str) -> list[int]:
        return [mmh3.hash(item, seed=i) % self.m for i in range(self.k)]

    def add(self, item: str) -> None:
        for pos in self._hash_positions(item):
            self.bit_array[pos] = 1
        self.count += 1

    def __contains__(self, item: str) -> bool:
        return all(self.bit_array[pos] for pos in self._hash_positions(item))

    def estimated_fp_rate(self) -> float:
        return (1 - math.e ** (-self.k * self.count / self.m)) ** self.k`,
      annotations: [
        {
          lines: "6-8",
          note: "m (bit array size) and k (hash count) are derived mathematically from desired capacity and false-positive rate — no guessing needed.",
        },
        {
          lines: "14-15",
          note: "Optimal m formula: m = -n·ln(p) / (ln2)². Minimizes memory for a given FP rate.",
        },
        {
          lines: "17-18",
          note: "Optimal k formula: k = (m/n)·ln2. Balances collision probability across hash functions.",
        },
        {
          lines: "20-21",
          note: "MurmurHash3 with varying seeds produces k independent hash functions cheaply — no need for k separate algorithms.",
        },
        {
          lines: "23-26",
          note: "Insert: set all k bit positions to 1. O(k) time. Idempotent — inserting the same item twice is harmless.",
        },
        {
          lines: "28-29",
          note: "Lookup: if ANY bit is 0, the item is definitely absent. If ALL bits are 1, it's probably present. O(k) time.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Insert (best)", complexity: "O(k)", note: "Always exactly k hash computations" },
        { case: "Insert (avg)", complexity: "O(k)", note: "Constant regardless of set size" },
        { case: "Insert (worst)", complexity: "O(k)", note: "No worst-case degradation" },
        { case: "Lookup (best)", complexity: "O(k)", note: "Always exactly k hash computations" },
        { case: "Lookup (avg)", complexity: "O(k)", note: "Constant regardless of set size" },
        { case: "Lookup (worst)", complexity: "O(k)", note: "No worst-case degradation" },
      ],
      spaceRows: [
        { label: "Bit array", complexity: "O(m)", note: "m bits — typically 9.6 bits per element for 1% FP rate" },
        { label: "Per element overhead", complexity: "O(1)", note: "No per-element storage after insertion" },
      ],
      insights: [
        "k is typically a small constant (3–7), so O(k) is effectively O(1) for practical purposes.",
        "Memory usage is fixed at m bits regardless of how many elements are inserted (up to capacity).",
        "A Bloom filter with 1% FP rate uses ~9.6 bits/element vs ~64+ bits/element for a hash set.",
      ],
    },

    variations: {
      heading: "Variants & Practical Tips",
      variations: [
        {
          name: "Counting Bloom Filter",
          description: "Replaces each bit with a small counter (e.g., 4 bits). Supports deletion by decrementing counters. Uses 4× more space than a standard Bloom filter.",
        },
        {
          name: "Scalable Bloom Filter",
          description: "Dynamically grows by chaining multiple Bloom filters. Maintains a target FP rate even as the set grows beyond the initial capacity estimate.",
        },
        {
          name: "Cuckoo Filter",
          description: "Stores fingerprints in a cuckoo hash table. Supports deletion, achieves better space efficiency than counting Bloom filters, and has similar FP rates.",
        },
        {
          name: "Blocked Bloom Filter",
          description: "Divides the bit array into cache-line-sized blocks. Each element maps to one block, improving CPU cache performance at a small FP rate cost.",
        },
        {
          name: "XOR Filter",
          description: "A static, immutable filter that achieves ~1.23 bits/element for 1% FP — more space-efficient than Bloom filters but requires knowing all elements upfront.",
        },
      ],
      tips: [
        "Use Bloom filters as a fast pre-check before expensive operations like disk lookups, database queries, or network requests.",
        "Google Chrome uses a Bloom filter to check URLs against a local list of malicious sites before querying the remote safe-browsing API.",
        "Apache Cassandra uses Bloom filters to avoid unnecessary SSTable disk reads — each SSTable has its own filter.",
        "Never use a Bloom filter when false positives are unacceptable (e.g., security-critical allow/deny lists). Use a hash set instead.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "A Bloom filter uses a bit array + k hash functions to test set membership in O(k) time with O(m) space.",
        "It guarantees NO false negatives: if the filter says 'not present', the element is definitely absent.",
        "False positives are possible: if the filter says 'present', the element might not actually be in the set.",
        "The false positive rate is tunable via m (bit array size) and k (hash functions), with a mathematical optimum.",
        "Standard Bloom filters do not support deletion; use Counting or Cuckoo filters when deletion is needed.",
        "Ideal for memory-constrained environments where approximate membership is acceptable — caches, CDNs, databases, and network routers.",
      ],
    },
  },
};

export default function BloomFilterVideo() {
  return <AlgoVideo config={config} />;
}
