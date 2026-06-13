import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Kruskal's Algorithm",
  subtitle: "Minimum spanning tree by greedily adding smallest weight edges.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Kruskal's Algorithm Solve?",
      bullets: [
        "Given a connected, undirected, weighted graph with V vertices and E edges, find a spanning tree whose total edge weight is minimized.",
        "A spanning tree connects all V vertices using exactly V−1 edges with no cycles — Kruskal finds the one with the smallest possible total weight.",
        "Edge weights can represent distances, costs, latencies, or any additive quantity you want to minimize across the network.",
        "Classic applications include designing minimum-cost cable networks, clustering data points, and approximating the Traveling Salesman Problem.",
        "Unlike Dijkstra (single-source shortest paths), Kruskal produces a global tree structure rather than distances from one vertex.",
      ],
    },

    intuition: {
      heading: "The Greedy Insight",
      bullets: [
        "Sort all edges by weight in ascending order. The cheapest edge that does not create a cycle is always safe to add to the MST.",
        "This greedy choice is provably optimal by the Cut Property: for any cut of the graph, the minimum-weight crossing edge belongs to some MST.",
        "A Union-Find (Disjoint Set Union) data structure tracks which vertices are already connected, enabling O(α(V)) cycle detection per edge.",
        "The algorithm terminates once V−1 edges have been accepted — at that point every vertex is reachable from every other vertex.",
        "Rejected edges are those whose two endpoints already share the same connected component, meaning adding them would close a cycle.",
      ],
      analogy:
        "Imagine building a cheap road network between cities. You have a list of all possible roads sorted by construction cost. You build the cheapest road first, then the next cheapest, but skip any road whose two cities are already connected by the roads you've built so far. Keep going until all cities are reachable from each other — that's Kruskal's Algorithm.",
    },

    walkthrough: {
      steps: [
        {
          label: "Input Graph",
          description:
            "Consider a graph with 6 vertices A–F and 9 weighted edges: A–B(4), A–E(2), B–C(6), B–E(5), C–D(3), C–F(7), D–F(8), E–F(1), B–F(9).",
        },
        {
          label: "Sort All Edges",
          description:
            "Sort edges by weight ascending: E–F(1), A–E(2), C–D(3), A–B(4), B–E(5), B–C(6), C–F(7), D–F(8), B–F(9).",
        },
        {
          label: "Initialize Union-Find",
          description:
            "Each vertex starts in its own component: parent[A]=A, parent[B]=B, ..., parent[F]=F. MST weight = 0, MST edges = [].",
        },
        {
          label: "Add Edge E–F (weight 1)",
          description:
            "find(E)=E, find(F)=F — different components. Union them. MST += E–F. Total weight = 1. MST has 1 edge.",
        },
        {
          label: "Add Edge A–E (weight 2)",
          description:
            "find(A)=A, find(E)=E (or root of {E,F}) — different components. Union them. MST += A–E. Total weight = 3. MST has 2 edges.",
        },
        {
          label: "Add Edge C–D (weight 3)",
          description:
            "find(C)=C, find(D)=D — different components. Union them. MST += C–D. Total weight = 6. MST has 3 edges.",
        },
        {
          label: "Add Edge A–B (weight 4)",
          description:
            "find(A) and find(B) are in different components. Union them. MST += A–B. Total weight = 10. MST has 4 edges.",
        },
        {
          label: "Skip Edge B–E (weight 5)",
          description:
            "find(B) and find(E) now share the same component {A, B, E, F}. Adding B–E would form a cycle — skip this edge.",
        },
        {
          label: "Add Edge B–C (weight 6)",
          description:
            "find(B) is in {A,B,E,F}, find(C) is in {C,D} — different components. Union them. MST += B–C. Total weight = 16. MST has 5 edges.",
        },
        {
          label: "MST Complete",
          description:
            "We now have V−1 = 5 edges in the MST. The algorithm terminates. Remaining edges (C–F, D–F, B–F) are all skipped — they would form cycles.",
        },
        {
          label: "Final MST",
          description:
            "MST edges: E–F(1), A–E(2), C–D(3), A–B(4), B–C(6). Total minimum weight = 16. All 6 vertices are connected with no cycles.",
        },
        {
          label: "Correctness Guarantee",
          description:
            "The Cut Property guarantees that each accepted edge is in some MST. Since the MST is unique when all edge weights are distinct, Kruskal always finds the one globally optimal spanning tree.",
        },
      ],
    },

    code: {
      snippet: `class UnionFind:
    def __init__(self, nodes):
        self.parent = {n: n for n in nodes}
        self.rank   = {n: 0  for n in nodes}

    def find(self, x):
        # Path compression
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False          # same component — cycle!
        # Union by rank
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True


def kruskal(nodes, edges):
    """
    nodes : list of vertex ids
    edges : list of (weight, u, v) tuples
    Returns (mst_weight, mst_edges)
    """
    uf = UnionFind(nodes)
    mst_edges  = []
    mst_weight = 0

    for weight, u, v in sorted(edges):   # sort by weight
        if uf.union(u, v):               # no cycle → safe to add
            mst_edges.append((u, v, weight))
            mst_weight += weight
            if len(mst_edges) == len(nodes) - 1:
                break                    # MST complete

    return mst_weight, mst_edges


# Example
nodes = ['A', 'B', 'C', 'D', 'E', 'F']
edges = [
    (1, 'E', 'F'), (2, 'A', 'E'), (3, 'C', 'D'),
    (4, 'A', 'B'), (5, 'B', 'E'), (6, 'B', 'C'),
    (7, 'C', 'F'), (8, 'D', 'F'), (9, 'B', 'F'),
]
weight, mst = kruskal(nodes, edges)
print(weight)  # 16
print(mst)     # [('E','F',1), ('A','E',2), ('C','D',3), ('A','B',4), ('B','C',6)]
`,
      language: "python",
      annotations: [
        {
          lines: [1, 2, 3, 4],
          note: "UnionFind initializes each vertex as its own parent (singleton component) and rank 0. Path compression and union-by-rank keep operations near O(1) amortized.",
        },
        {
          lines: [6, 7, 8, 9, 10],
          note: "Path compression: while traversing to the root, point every node directly to its grandparent (halving compression). After enough operations, most nodes point directly to their root.",
        },
        {
          lines: [13, 14, 15, 16, 17, 18, 19, 20],
          note: "Union by rank: always attach the shorter tree under the taller one. This keeps tree height O(log V), ensuring find stays fast even without full path compression.",
        },
        {
          lines: [30, 31],
          note: "Sorting edges by weight is the key step — O(E log E). The subsequent loop processes each edge once in O(α(V)) amortized time via Union-Find.",
        },
        {
          lines: [33, 34, 35, 36, 37],
          note: "uf.union returns False when both endpoints share a root — adding this edge would create a cycle. Only True results (safe edges) enter the MST.",
        },
        {
          lines: [38, 39],
          note: "Early termination: once V−1 edges are accepted the spanning tree is complete. No need to examine the remaining sorted edges.",
        },
      ],
    },

    complexity: {
      timeRows: [
        {
          label: "Best",
          value: "O(E log E)",
          color: "#CEEB5A",
        },
        {
          label: "Average",
          value: "O(E log E)",
          color: "#2255CC",
        },
        {
          label: "Worst",
          value: "O(E log E)",
          color: "#E05A3A",
        },
      ],
      spaceRows: [
        {
          label: "Edge list (sorted)",
          value: "O(E)",
          color: "#2255CC",
        },
        {
          label: "Union-Find arrays",
          value: "O(V)",
          color: "#2255CC",
        },
        {
          label: "MST edge list",
          value: "O(V)",
          color: "#2255CC",
        },
      ],
      notes: [
        "The O(E log E) cost comes entirely from sorting edges — the Union-Find operations over all edges cost only O(E α(V)), which is effectively O(E) in practice.",
        "Since E can be at most V², O(E log E) = O(E log V²) = O(2E log V) = O(E log V), so the bound is sometimes written O(E log V).",
        "For dense graphs (E ≈ V²), Prim's Algorithm with a Fibonacci heap achieves O(E + V log V), which is faster than Kruskal's O(E log E) in that regime.",
      ],
    },

    variations: {
      items: [
        "Prim's Algorithm — grows the MST one vertex at a time from a seed node using a priority queue; preferable for dense graphs or adjacency-matrix representations.",
        "Borůvka's Algorithm — in each phase every component independently picks its cheapest outgoing edge; runs in O(E log V) and parallelizes naturally.",
        "Reverse-Delete Algorithm — start with all edges, then greedily remove the heaviest edge that does not disconnect the graph; conceptually the dual of Kruskal.",
        "Kruskal on a filtered edge list — when edges arrive in a stream or are too numerous to sort all at once, maintain a priority queue of candidate edges and apply Kruskal lazily.",
        "Maximum Spanning Tree — simply reverse the sort order (descending weight) in Kruskal to find the spanning tree with the maximum total weight.",
      ],
      tips: [
        "Always use path compression AND union by rank together — either alone still gives O(log V) per operation, but together they achieve the near-optimal O(α(V)) amortized bound.",
        "When edges are already sorted (e.g., grid graphs with uniform weights or pre-sorted input), Kruskal's total complexity drops to O(E α(V)) — essentially linear.",
        "For competitive programming, represent the Union-Find as a flat integer array indexed by vertex number rather than a dict — cache-friendly and significantly faster in practice.",
        "If the graph may be disconnected, Kruskal naturally produces a Minimum Spanning Forest: one MST per connected component.",
      ],
    },

    summary: {
      keyPoints: [
        "Kruskal's Algorithm builds the MST by repeatedly adding the globally cheapest edge that does not create a cycle — a clean greedy strategy proven optimal by the Cut Property.",
        "Sorting all E edges by weight costs O(E log E), which dominates the total runtime; the Union-Find cycle checks add only O(E α(V)) — nearly free.",
        "Path compression and union by rank are the two key Union-Find optimizations; together they reduce the amortized per-operation cost to O(α(V)), the inverse Ackermann function.",
        "Kruskal is edge-centric and excels on sparse graphs (E ≈ V); for dense graphs (E ≈ V²), Prim's Algorithm with a Fibonacci heap is typically faster.",
        "The algorithm naturally handles disconnected graphs by producing a Minimum Spanning Forest — one tree per connected component.",
        "Kruskal is foundational for network design, image segmentation, clustering, and approximation algorithms for NP-hard problems like TSP.",
      ],
    },
  },
};

export default function KruskalVideo() {
  return <AlgoVideo config={config} />;
}
