import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Fenwick Tree (BIT)",
  subtitle: "Binary Indexed Tree for prefix sum queries and updates in O(log n).",
  category: "data-structure",
  difficulty: "advanced",

  chapters: [
    {
      kind: "problem",
      heading: "What Problem Does a Fenwick Tree Solve?",
      bullets: [
        "Given a mutable array of numbers, we need to answer prefix sum queries: what is the sum of A[1..i]?",
        "A naive approach computes the sum in O(n) per query — too slow for large arrays with frequent updates.",
        "A prefix sum array answers queries in O(1) but requires O(n) time to update a single element.",
        "We need a data structure that supports both point updates and prefix sum queries in O(log n) each.",
        "Fenwick Trees (Binary Indexed Trees) solve exactly this: O(log n) update, O(log n) query, O(n) space.",
      ],
    },

    {
      kind: "intuition",
      heading: "The Core Intuition",
      bullets: [
        "Each index i in the BIT is responsible for storing the sum of a specific range, determined by its lowest set bit.",
        "lowbit(i) = i & (-i) extracts the lowest set bit of i, giving the range length BIT[i] covers.",
        "BIT[i] holds the sum of A[i - lowbit(i) + 1 .. i] — a power-of-two-sized window ending at i.",
        "To query prefix sum up to i, accumulate BIT[i] and jump left by subtracting lowbit(i) repeatedly.",
        "To update index i, add the delta to BIT[i] and jump right by adding lowbit(i) to propagate the change.",
      ],
      analogy:
        "Think of a corporate hierarchy: each manager (node) is responsible for a team of a specific size. To get the total headcount up to department i, you ask that manager, then their skip-level manager, and so on — just O(log n) hops up the chain.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step: Build, Query, Update",
      steps: [
        {
          step: 1,
          label: "Start with array A",
          description:
            "Given A = [3, 2, -1, 6, 5, 4, -3, 3] (1-indexed). We want to build a BIT supporting O(log n) prefix sum queries and point updates.",
          values: [3, 2, -1, 6, 5, 4, -3, 3],
          colors: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 2,
          label: "Understand lowbit(i)",
          description:
            "lowbit(i) = i & (-i). For i=6 (binary 110), lowbit=2. BIT[6] covers 2 elements: A[5..6]. For i=4 (binary 100), lowbit=4, so BIT[4] covers A[1..4].",
          values: [1, 2, 1, 4, 1, 2, 1, 8],
          colors: ["gray", "gray", "gray", "orange", "gray", "orange", "gray", "orange"],
        },
        {
          step: 3,
          label: "Build BIT via updates",
          description:
            "Initialize BIT[1..8] = 0. For each element A[i], call update(i, A[i]) to propagate its value up the BIT structure.",
          values: [0, 0, 0, 0, 0, 0, 0, 0],
          colors: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          label: "BIT after full build",
          description:
            "Final BIT: [3, 5, -1, 10, 5, 9, -3, 19]. BIT[4]=10 = A[1]+A[2]+A[3]+A[4]. BIT[8]=19 = sum of all 8 elements.",
          values: [3, 5, -1, 10, 5, 9, -3, 19],
          colors: ["blue", "blue", "blue", "green", "blue", "blue", "blue", "green"],
        },
        {
          step: 5,
          label: "query(7): prefix sum A[1..7]",
          description:
            "i=7 (111): accumulate BIT[7]=-3, then i=7-lowbit(7)=6. Accumulate BIT[6]=9, then i=6-lowbit(6)=4. Accumulate BIT[4]=10, then i=0. Total = -3+9+10 = 16.",
          values: [3, 5, -1, 10, 5, 9, -3, 19],
          colors: ["gray", "gray", "gray", "yellow", "gray", "yellow", "yellow", "gray"],
        },
        {
          step: 6,
          label: "Verify query(7)=16",
          description:
            "Direct check: A[1..7] = 3+2+(-1)+6+5+4+(-3) = 16. The BIT gave the same answer in just 3 steps instead of 7.",
          values: [3, 2, -1, 6, 5, 4, -3, 3],
          colors: ["green", "green", "green", "green", "green", "green", "green", "gray"],
        },
        {
          step: 7,
          label: "update(3, +5): add 5 to A[3]",
          description:
            "i=3 (011): BIT[3] += 5, then i=3+lowbit(3)=4. BIT[4] += 5, then i=4+lowbit(4)=8. BIT[8] += 5. Stop since i>8.",
          values: [3, 5, 4, 15, 5, 9, -3, 24],
          colors: ["gray", "gray", "green", "green", "gray", "gray", "gray", "green"],
        },
        {
          step: 8,
          label: "Range sum query: sum(3..6)",
          description:
            "Range sum A[l..r] = query(r) - query(l-1). sum(3..6) = query(6) - query(2). query(6)=9+5+10=24 (after update), query(2)=5+3=8. Result = 24-8 = 16.",
          values: [3, 5, 4, 15, 5, 9, -3, 24],
          colors: ["gray", "yellow", "blue", "blue", "blue", "blue", "gray", "gray"],
        },
        {
          step: 9,
          label: "Why O(log n) per operation?",
          description:
            "Each query or update traverses at most log₂(n) indices. At each step, one bit of the binary representation of i is either removed (query) or added (update), so the loop terminates in O(log n) iterations.",
        },
        {
          step: 10,
          label: "BIT vs Segment Tree tradeoff",
          description:
            "A Segment Tree also gives O(log n) queries and updates but uses 2n–4n space and more complex code. A Fenwick Tree uses exactly n+1 space and fits in ~10 lines of code — preferred when only prefix/range sums are needed.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `class FenwickTree:
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed

    def update(self, i: int, delta: int) -> None:
        """Add delta to element at index i (1-indexed)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # move to next responsible node

    def query(self, i: int) -> int:
        """Return prefix sum A[1..i] (1-indexed)."""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # strip lowest set bit
        return total

    def range_query(self, l: int, r: int) -> int:
        """Return sum of A[l..r] (1-indexed, inclusive)."""
        if l > r:
            return 0
        return self.query(r) - self.query(l - 1)

    def build(self, arr: list) -> None:
        """Build BIT from a 0-indexed array in O(n log n)."""
        for i, v in enumerate(arr):
            self.update(i + 1, v)

    def point_query(self, i: int) -> int:
        """Return the actual value of A[i] in O(log n)."""
        return self.range_query(i, i)


# Usage example
bit = FenwickTree(8)
A = [3, 2, -1, 6, 5, 4, -3, 3]
bit.build(A)

print(bit.query(7))          # 16  (sum of A[1..7])
print(bit.range_query(3, 6)) # 14  (sum of A[3..6])
bit.update(3, 5)             # A[3] becomes -1+5 = 4
print(bit.query(7))          # 21  (updated prefix sum)`,
      annotations: [
        {
          lines: [1, 4],
          note: "Use a 1-indexed array of size n+1. Index 0 is unused — this simplifies the lowbit arithmetic.",
        },
        {
          lines: [6, 9],
          note: "update() walks right through the BIT: each step adds lowbit(i) to jump to the next node responsible for a larger range.",
        },
        {
          lines: [11, 15],
          note: "query() walks left: each step strips the lowest set bit, visiting exactly the nodes whose ranges together cover [1..i] without overlap.",
        },
        {
          lines: [17, 20],
          note: "Range sum in O(log n): two prefix queries. The subtraction cancels out A[1..l-1], leaving only A[l..r].",
        },
        {
          lines: [22, 24],
          note: "build() calls update() n times for O(n log n) construction. An O(n) build exists but O(n log n) is simpler and fast enough in practice.",
        },
        {
          lines: [26, 27],
          note: "point_query() recovers the actual element value using range_query(i, i) — a neat trick since BIT stores cumulative sums, not raw values.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(1)", note: "update/query on index that is a power of 2 (single BIT node)" },
        { case: "Average", complexity: "O(log n)", note: "Typical case — traverses ~log₂(n) nodes per operation" },
        {
          case: "Worst",
          complexity: "O(log n)",
          note: "Strictly bounded by number of bits in n — never exceeds ⌊log₂(n)⌋+1 steps",
        },
      ],
      spaceRows: [
        {
          operation: "BIT array storage",
          complexity: "O(n)",
          note: "Exactly n+1 integers — same asymptotic space as the input array",
        },
        {
          operation: "Extra per operation",
          complexity: "O(1)",
          note: "Only a loop counter and accumulator — no recursion or auxiliary structures",
        },
      ],
      insights: [
        "Both update and query are strictly O(log n) — the loop runs at most ⌊log₂(n)⌋ iterations, guaranteed by bit manipulation.",
        "A Fenwick Tree uses 2–4× less memory than a Segment Tree and has better cache locality due to its flat array representation.",
        "For 2D prefix sums (e.g., sum of a rectangle in a matrix), a 2D Fenwick Tree uses O(mn) space and O(log m · log n) per operation.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "2D Fenwick Tree",
          description:
            "Nest two BIT loops to handle 2D prefix sums over an m×n matrix. Each update/query runs in O(log m · log n). Widely used in competitive programming for 2D range sum problems.",
        },
        {
          name: "Order-Statistics BIT",
          description:
            "Store frequencies instead of values. query(x) returns the count of elements ≤ x. Combined with coordinate compression, this solves inversion counting and k-th smallest element in O(n log n).",
        },
        {
          name: "Range Update + Point Query",
          description:
            "Instead of point update + prefix query, apply a difference array trick: update(l, +delta) and update(r+1, -delta). Then query(i) gives the current value of A[i] after range updates.",
        },
        {
          name: "Range Update + Range Query",
          description:
            "Use two BITs simultaneously to support both range updates and range sum queries in O(log n). Requires careful algebraic decomposition of the prefix sum formula.",
        },
        {
          name: "Persistent Fenwick Tree",
          description:
            "Each update creates a new version by copying only the O(log n) modified nodes. Enables historical queries: 'what was the prefix sum at time t?' in O(log n) per query.",
        },
      ],
      tips: [
        "Always use 1-indexing with Fenwick Trees — the lowbit trick breaks at index 0 since 0 & (-0) = 0 causes an infinite loop.",
        "For inversion counting, compress values to [1..n], then for each element query how many previous elements are greater, and update the BIT.",
        "When building from a known array, the O(n) construction (propagating directly to parent nodes) is worth implementing for very large n.",
        "In competitive programming, a Fenwick Tree is almost always preferable to a Segment Tree when only prefix sums and point updates are needed — it is 3–5× faster in practice due to cache effects.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "A Fenwick Tree (BIT) supports point updates and prefix sum queries each in O(log n) time using O(n) space.",
        "The key insight is lowbit(i) = i & (-i): each BIT node covers exactly a power-of-two-sized range, enabling O(log n) traversal.",
        "Queries walk left (subtract lowbit), updates walk right (add lowbit) — two symmetric O(log n) loops cover all operations.",
        "Range sum queries reduce to two prefix queries: sum(l, r) = query(r) - query(l-1), adding no extra complexity.",
        "Compared to a Segment Tree, a Fenwick Tree is simpler to code, uses less memory, and has better cache performance for prefix sum workloads.",
        "Extensions like 2D BITs, order-statistics BITs, and range-update BITs make it one of the most versatile tools in competitive programming.",
      ],
    },
  ],
}

export default function FenwickTreeVideo() {
  return <AlgoVideo config={config} />
}
