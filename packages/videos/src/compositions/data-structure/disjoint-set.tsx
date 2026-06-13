import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Disjoint Set (Union-Find)",
  subtitle: "Tracks disjoint subsets with near-O(1) union and find via path compression.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Efficiently Track Which Elements Belong to the Same Group",
      body: [
        "A Disjoint Set (also called Union-Find) is a data structure that maintains a collection of non-overlapping subsets over a universe of n elements. Each element starts in its own singleton set.",
        "The two fundamental operations are find(x), which returns the canonical representative (root) of the set containing x, and union(x, y), which merges the sets of x and y into one.",
        "The naive approach — scanning a flat array to label groups — makes union O(n). Disjoint Set achieves near-constant time for both operations by representing each set as a tree and applying two key optimisations.",
        "Path compression flattens the tree during find: every node on the path from x to the root is re-pointed directly at the root, shortening future lookups dramatically.",
        "Union by rank (or union by size) always attaches the shorter tree under the taller one, preventing the tree from degenerating into a linked list. Together, these two optimisations yield an amortised per-operation cost of O(α(n)), where α is the inverse Ackermann function — effectively constant for all practical input sizes.",
      ],
      callout:
        "With path compression and union by rank, both find and union run in O(α(n)) amortised time — slower than O(1) only in the most theoretical sense, never in practice.",
    },

    intuition: {
      heading: "Think of Friend Groups That Keep Merging",
      body: [
        "Imagine a school where students start the year knowing nobody. Each student is their own social circle (singleton set). As friendships form, circles merge — but you never split a merged circle.",
        "find(x) answers 'who is the leader of x's friend group?' by following the chain of introductions back to the original founder (the root).",
        "union(x, y) says 'x's group and y's group are now one group' — we simply make one leader report to the other.",
        "Without optimisations, if Alice introduced Bob, who introduced Carol, who introduced Dave, find(Dave) traverses three hops. Path compression short-circuits this: after the first find, Dave points directly to the group leader, so the next find(Dave) takes one hop.",
        "Union by rank ensures that when two groups merge, the larger group's leader stays in charge — the smaller tree hangs below the larger one, keeping tree heights logarithmic before compression even kicks in.",
      ],
      analogy:
        "Picture a corporate org chart where companies keep merging. Each company has a CEO (root). When two companies merge, the smaller company's CEO now reports to the larger company's CEO. Over time, employees deep in the hierarchy get re-assigned directly to the top CEO the first time HR looks them up (path compression). After a few mergers, most employees are just one step from the CEO — lookups become instant.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initialise — 6 singleton sets",
          description:
            "We create a universe of 6 elements: {0, 1, 2, 3, 4, 5}. parent = [0, 1, 2, 3, 4, 5] and rank = [0, 0, 0, 0, 0, 0]. Every element is its own root. find(x) = x for all x.",
        },
        {
          label: "union(0, 1)",
          description:
            "find(0) = 0, find(1) = 1. Both are roots with rank 0 (tie). We attach 1 under 0 and increment rank[0] to 1. parent = [0, 0, 2, 3, 4, 5]. Now {0, 1} form one set.",
        },
        {
          label: "union(2, 3)",
          description:
            "find(2) = 2, find(3) = 3. Ranks are equal (0). Attach 3 under 2, rank[2] = 1. parent = [0, 0, 2, 2, 4, 5]. Sets: {0,1}, {2,3}, {4}, {5}.",
        },
        {
          label: "union(4, 5)",
          description:
            "find(4) = 4, find(5) = 5. Equal ranks. Attach 5 under 4, rank[4] = 1. parent = [0, 0, 2, 2, 4, 4]. Sets: {0,1}, {2,3}, {4,5}.",
        },
        {
          label: "union(0, 2) — merging two components",
          description:
            "find(0) = 0 (rank 1), find(2) = 2 (rank 1). Equal ranks again. Attach root 2 under root 0, rank[0] = 2. parent = [0, 0, 0, 2, 4, 4]. Sets: {0,1,2,3}, {4,5}.",
        },
        {
          label: "find(3) — path compression in action",
          description:
            "find(3): parent[3] = 2, parent[2] = 0, parent[0] = 0 (root). We found root = 0. On the way back, path compression sets parent[3] = 0 directly. parent = [0, 0, 0, 0, 4, 4]. Future find(3) takes only 1 hop.",
        },
        {
          label: "union(1, 4) — final merge",
          description:
            "find(1) = 0 (rank 2), find(4) = 4 (rank 1). Root 0 has higher rank, so attach root 4 under root 0. parent = [0, 0, 0, 0, 0, 4]. rank unchanged. All 6 elements are now in one set.",
        },
        {
          label: "find(5) — verifying the merged set",
          description:
            "find(5): parent[5] = 4, parent[4] = 0, parent[0] = 0 (root). Path compression sets parent[5] = 0. parent = [0, 0, 0, 0, 0, 0]. Every element now points directly to root 0.",
        },
        {
          label: "connected(x, y) helper",
          description:
            "connected(x, y) simply checks find(x) == find(y). After the full merge, connected(3, 5) = (find(3) == find(5)) = (0 == 0) = True. This single comparison tells us 3 and 5 are in the same component.",
        },
        {
          label: "Final parent array",
          description:
            "After all operations and path compressions: parent = [0, 0, 0, 0, 0, 0]. All elements have root 0. rank = [2, 0, 0, 0, 0, 0]. The structure is maximally flat — every future find is O(1).",
        },
      ],
    },

    code: {
      snippet: `class DisjointSet:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank   = [0] * n
        self.count  = n          # number of disjoint sets

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            # Path compression: point directly to root
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False          # already in the same set
        # Union by rank: attach smaller tree under larger
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx       # ensure rx has higher rank
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        self.count -= 1
        return True

    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)


# Example
ds = DisjointSet(6)
ds.union(0, 1)   # {0,1}, {2}, {3}, {4}, {5}
ds.union(2, 3)   # {0,1}, {2,3}, {4}, {5}
ds.union(0, 2)   # {0,1,2,3}, {4}, {5}
ds.union(4, 5)   # {0,1,2,3}, {4,5}
ds.union(1, 4)   # {0,1,2,3,4,5}
print(ds.connected(3, 5))  # True
print(ds.count)            # 1`,
      language: "python",
      annotations: [
        {
          lines: [2, 3, 4],
          note: "Initialisation is O(n). parent[i] = i makes every element its own root. rank[i] = 0 means all trees start with height 0. count tracks how many disjoint sets remain.",
        },
        {
          lines: [7, 8, 9, 10],
          note: "find() uses recursive path compression. When parent[x] != x, we recurse to the root and then reassign parent[x] directly to the root before returning. This flattens the tree lazily — only nodes on the queried path are compressed.",
        },
        {
          lines: [13, 14, 15],
          note: "union() first finds both roots. If they are the same, the elements are already in the same set — return False to signal no merge happened. This guards against creating cycles.",
        },
        {
          lines: [17, 18, 19, 20, 21],
          note: "Union by rank: always attach the root with lower rank under the root with higher rank. Only when ranks are equal do we increment the winner's rank by 1. This keeps tree height at most O(log n) before path compression.",
        },
        {
          lines: [22],
          note: "Decrement count after a successful merge. This lets callers check ds.count == 1 to know when all elements are connected — useful in Kruskal's MST and network connectivity problems.",
        },
        {
          lines: [25],
          note: "connected() is a one-liner: two elements are in the same set if and only if they share the same root. After path compression, this is effectively O(1) for repeated queries on the same elements.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "find(x) — single call", value: "O(α(n))", color: "green" },
        { label: "union(x, y) — single call", value: "O(α(n))", color: "green" },
        { label: "connected(x, y)", value: "O(α(n))", color: "green" },
        { label: "Initialise n elements", value: "O(n)", color: "yellow" },
        { label: "m operations (amortised)", value: "O(m · α(n))", color: "green" },
      ],
      spaceRows: [
        { label: "parent[] array", value: "O(n)", color: "yellow" },
        { label: "rank[] array", value: "O(n)", color: "yellow" },
        { label: "Auxiliary per find call", value: "O(α(n)) stack", color: "green" },
      ],
      notes: [
        "α(n) is the inverse Ackermann function — it grows so slowly that α(n) ≤ 4 for any n that fits in the observable universe. In all practical terms, find and union are O(1).",
        "Without path compression alone, find is O(log n). Without union by rank alone, it degenerates to O(n) in the worst case. Together, the two optimisations achieve the near-constant O(α(n)) bound.",
        "The iterative version of find (using a two-pass loop) avoids Python's recursion limit and is preferred for very large inputs: first pass walks to the root, second pass re-points all nodes on the path.",
      ],
    },

    variations: {
      items: [
        "Union by Size: instead of tracking tree height (rank), track the number of nodes in each component. Attach the smaller component under the larger. Achieves the same O(log n) height bound and is often simpler to reason about.",
        "Weighted Quick Union: an early variant that uses size-based merging without path compression. Guarantees O(log n) per operation but not the near-O(1) amortised bound.",
        "Persistent Union-Find: supports rollback (undo of union operations) by replacing path compression with union by rank only and maintaining a version stack. Used in offline algorithms that need to undo merges.",
        "Parallel / Concurrent Union-Find: lock-free implementations use compare-and-swap (CAS) operations on the parent array to support concurrent find and union calls in multi-threaded environments.",
        "Weighted Union-Find: each union carries a weight or offset (e.g., for bipartite checking or relative distance problems). find returns both the root and the accumulated weight along the path.",
      ],
      tips: [
        "When a graph problem asks about connected components, cycle detection, or 'are these two nodes in the same group?', Union-Find is almost always the cleanest solution.",
        "Kruskal's Minimum Spanning Tree algorithm uses Union-Find to check in O(α(n)) whether adding an edge would create a cycle — making the overall MST algorithm O(E log E).",
        "For problems involving online queries (edges arrive one at a time), Union-Find is ideal. For offline queries where edges can be removed, consider link-cut trees instead.",
        "Always prefer the iterative find over the recursive one in Python to avoid hitting the default recursion limit of 1000 on large inputs.",
      ],
    },

    summary: {
      keyPoints: [
        "Disjoint Set (Union-Find) maintains a partition of n elements into disjoint subsets, supporting two operations: find (which set?) and union (merge two sets).",
        "Path compression makes find nearly O(1) by re-pointing every node on the search path directly to the root after the first traversal.",
        "Union by rank (or size) prevents tree degeneration by always attaching the shallower tree under the deeper one, keeping heights at O(log n) before compression.",
        "Together, path compression and union by rank yield an amortised per-operation cost of O(α(n)) — the inverse Ackermann function, which is ≤ 4 for any realistic input size.",
        "The data structure is the backbone of Kruskal's MST, cycle detection in undirected graphs, network connectivity queries, and dynamic component counting.",
        "The count field (number of remaining disjoint sets) is a useful bonus: it lets you detect when all elements are connected without an extra traversal.",
      ],
      nextSteps: [
        "Practice: LeetCode 547 (Number of Provinces), 684 (Redundant Connection), 721 (Accounts Merge), 1202 (Smallest String With Swaps), 1584 (Min Cost to Connect All Points via Kruskal).",
        "Study Kruskal's MST algorithm next — it uses Union-Find as its core subroutine and is the canonical application of this data structure in competitive programming.",
      ],
    },
  },
}

export default function DisjointSetVideo() {
  return <AlgoVideo config={config} />
}
