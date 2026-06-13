import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Segment Tree",
  subtitle: "Tree for range queries and point updates in O(log n).",
  category: "data-structure",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "The Range Query Problem",
      bullets: [
        "Given an array of n integers, answer many queries of the form: 'what is the sum (or min/max) of elements from index l to r?'",
        "A naive scan answers each query in O(n), which is too slow when there are Q queries — total O(nQ).",
        "We also need to support point updates: change a single element and keep all future query answers correct.",
        "A prefix-sum array answers range-sum queries in O(1) but requires O(n) time to rebuild after every update.",
        "We need a data structure that balances both: fast queries AND fast updates — ideally O(log n) each.",
      ],
    },

    intuition: {
      heading: "Core Idea: Pre-aggregate Overlapping Subranges",
      bullets: [
        "Divide the array recursively in half, storing the aggregate (sum/min/max) of each subrange in a binary tree node.",
        "A query on [l, r] decomposes into O(log n) pre-computed subrange nodes that together cover exactly [l, r].",
        "An update to index i only invalidates the O(log n) ancestors of that leaf — recompute them bottom-up.",
        "The tree has 2n − 1 nodes total, so it fits in an array of size 4n with simple index arithmetic (children of i are 2i+1 and 2i+2).",
        "Real-world analogy: a company org-chart where each manager knows the total headcount of their subtree. Promoting one person updates only that person's chain of managers up to the CEO — not every employee.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step: Build, Query, Update",
      steps: [
        {
          label: "Start with input array",
          description: "arr = [1, 3, 5, 7, 9, 11], indices 0–5.",
          values: [1, 3, 5, 7, 9, 11],
          colors: ["blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          label: "Build leaf nodes",
          description: "Each leaf node stores exactly one element. Leaves are at depth ⌊log₂(2n)⌋.",
          values: [1, 3, 5, 7, 9, 11],
          colors: ["teal", "teal", "teal", "teal", "teal", "teal"],
        },
        {
          label: "Merge pairs — level 2",
          description: "tree[3]=1+3=4, tree[4]=5 (single), tree[5]=7+9=16, tree[6]=11 (single).",
        },
        {
          label: "Merge pairs — level 1",
          description: "tree[1]=4+5=9 (covers [0..2]), tree[2]=16+11=27 (covers [3..5]).",
        },
        {
          label: "Root node",
          description: "tree[0]=9+27=36, the total sum of the whole array.",
        },
        {
          label: "Range query: sum(1, 4)",
          description: "Traverse from root. [0..5] partially overlaps → recurse. [0..2] partially overlaps → recurse. [0..1] out of range on left → skip [0]. [1..1] fully inside → collect 3. [2..2] fully inside → collect 5. [3..5] partially overlaps → recurse. [3..4] fully inside → collect 16. Total = 3+5+16 = 24.",
          values: [1, 3, 5, 7, 9, 11],
          colors: ["grey", "yellow", "yellow", "yellow", "yellow", "grey"],
        },
        {
          label: "Point update: arr[3] = 10",
          description: "Locate leaf for index 3. Update leaf value to 10 (delta = +3).",
          values: [1, 3, 5, 10, 9, 11],
          colors: ["blue", "blue", "blue", "orange", "blue", "blue"],
        },
        {
          label: "Propagate update upward",
          description: "Recompute parent [3..4] = 10+9 = 19, then [3..5] = 19+11 = 30, then root = 9+30 = 39. Only O(log n) nodes touched.",
        },
        {
          label: "Verify updated query: sum(1, 4)",
          description: "Now collects 3 + 5 + 19 = 27 (correct after the update).",
          values: [1, 3, 5, 10, 9, 11],
          colors: ["grey", "yellow", "yellow", "yellow", "yellow", "grey"],
        },
        {
          label: "Range minimum query variant",
          description: "Replace sum with min in merge step. tree[0] stores global minimum. Same O(log n) query and update guarantees.",
        },
        {
          label: "Lazy propagation preview",
          description: "For range updates (add k to all elements in [l, r]), store a 'lazy' tag at each node to defer propagation until needed — keeps both range update and range query at O(log n).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            left, right = 2 * node + 1, 2 * node + 2
            self._build(arr, left,  start, mid)
            self._build(arr, right, mid + 1, end)
            self.tree[node] = self.tree[left] + self.tree[right]

    def update(self, idx, val, node=0, start=0, end=None):
        if end is None:
            end = self.n - 1
        if start == end:
            self.tree[node] = val
            return
        mid = (start + end) // 2
        left, right = 2 * node + 1, 2 * node + 2
        if idx <= mid:
            self.update(idx, val, left, start, mid)
        else:
            self.update(idx, val, right, mid + 1, end)
        self.tree[node] = self.tree[left] + self.tree[right]

    def query(self, l, r, node=0, start=0, end=None):
        if end is None:
            end = self.n - 1
        if r < start or end < l:          # completely outside
            return 0
        if l <= start and end <= r:       # completely inside
            return self.tree[node]
        mid = (start + end) // 2
        left, right = 2 * node + 1, 2 * node + 2
        return (self.query(l, r, left,  start, mid) +
                self.query(l, r, right, mid + 1, end))

# Usage
arr = [1, 3, 5, 7, 9, 11]
st = SegmentTree(arr)
print(st.query(1, 4))   # 24
st.update(3, 10)
print(st.query(1, 4))   # 27`,
      annotations: [
        {
          lines: "2-3",
          note: "Allocate tree array of size 4n — safe upper bound for a 1-indexed binary tree storing n leaves.",
        },
        {
          lines: "5-11",
          note: "_build runs in O(n) by visiting every internal node exactly once, merging children bottom-up.",
        },
        {
          lines: "13-22",
          note: "update descends to the target leaf in O(log n) then recomputes each ancestor on the way back up.",
        },
        {
          lines: "24-33",
          note: "query uses three cases: fully outside (return identity 0), fully inside (return stored value), partial (recurse both children). At most 4 nodes per level are visited → O(log n).",
        },
        {
          lines: "29-30",
          note: "The two base cases are the heart of the algorithm — they avoid redundant recomputation and keep the recursion bounded.",
        },
        {
          lines: "36-40",
          note: "Driver code: build once O(n), then answer any mix of queries and updates in O(log n) each.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Build",  best: "O(n)",      avg: "O(n)",      worst: "O(n)" },
        { label: "Query",  best: "O(1)",      avg: "O(log n)",  worst: "O(log n)" },
        { label: "Update", best: "O(log n)",  avg: "O(log n)",  worst: "O(log n)" },
      ],
      spaceRows: [
        { label: "Tree storage", complexity: "O(n)" },
        { label: "Recursion stack (build/query/update)", complexity: "O(log n)" },
      ],
      insights: [
        "The O(1) best-case query occurs when [l, r] exactly matches a single stored node (e.g., the root for a full-array sum).",
        "Using an iterative (bottom-up) segment tree eliminates recursion overhead and the O(log n) stack space, making it faster in practice for competitive programming.",
        "Lazy propagation extends range updates to O(log n) without changing query complexity — a critical upgrade for problems like 'add k to all elements in [l, r]'.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      items: [
        {
          name: "Range Minimum / Maximum Query (RMQ)",
          description: "Replace the sum merge with min or max. Identical structure, useful for problems like 'lowest common ancestor' and sliding-window minimum.",
        },
        {
          name: "Lazy Propagation Segment Tree",
          description: "Add a lazy[] array to defer range-update propagation. Enables O(log n) range updates (add/set) in addition to range queries.",
        },
        {
          name: "Segment Tree with Coordinate Compression",
          description: "When indices are sparse (e.g., up to 10⁹ but only 10⁵ distinct values), compress coordinates first, then build on the compressed array.",
        },
        {
          name: "Persistent Segment Tree",
          description: "Each update creates a new root pointing to modified nodes while sharing unchanged subtrees. Supports historical queries in O(log n) with O(n log n) total space.",
        },
        {
          name: "2D Segment Tree (Segment Tree of Segment Trees)",
          description: "Nest one segment tree per node for 2D range queries. Answers rectangle sum/min queries in O(log² n) with O(n log n) space.",
        },
      ],
      tips: [
        "Allocate tree size as 4*n to be safe; a tighter bound is 2 * 2^⌈log₂n⌉ but 4n is simpler.",
        "For competitive programming, an iterative segment tree (Fenwick-style indexing from n to 2n-1) is faster and avoids recursion.",
        "Always identify the identity element for your merge operation: 0 for sum, +∞ for min, −∞ for max, 1 for product.",
        "When the merge operation is not invertible (e.g., max), a Fenwick tree cannot be used — segment tree is the right choice.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "A segment tree stores pre-computed aggregates for every dyadic subrange, enabling O(log n) range queries by decomposing [l, r] into O(log n) stored subranges.",
        "Point updates touch only the O(log n) ancestors of the changed leaf, recomputing each ancestor from its two children.",
        "Building the tree takes O(n) time and O(n) space — a one-time cost amortized over all subsequent queries and updates.",
        "The iterative variant is preferred in practice for its lower constant factor and absence of recursion stack overhead.",
        "Lazy propagation unlocks O(log n) range updates, making the segment tree one of the most versatile data structures in competitive programming.",
        "When queries are only prefix queries and updates are point additions, a simpler Fenwick tree (BIT) suffices — choose segment tree when you need arbitrary range queries or non-invertible operations.",
      ],
    },
  },
};

export default function SegmentTreeVideo() {
  return <AlgoVideo config={config} />;
}
