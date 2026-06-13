import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Prim's Algorithm",
  subtitle: "Minimum spanning tree by greedily extending the current tree.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Prim's Algorithm Solve?",
      bullets: [
        "Given a connected, weighted, undirected graph G = (V, E), find a spanning tree T ⊆ E that connects all vertices with minimum total edge weight.",
        "A spanning tree uses exactly |V| − 1 edges, contains no cycles, and reaches every vertex — the MST is the spanning tree whose edge weights sum to the smallest possible value.",
        "MSTs appear in network design: laying the least cable to connect all offices, building the cheapest road network linking all cities, or wiring a circuit board with minimum copper.",
        "Prim's algorithm solves the MST problem by maintaining a single growing tree and repeatedly annexing the cheapest edge that connects a new vertex to the tree.",
        "The algorithm is correct for any connected, weighted, undirected graph and handles graphs with equal-weight edges by breaking ties arbitrarily — all resulting MSTs are valid.",
      ],
    },

    intuition: {
      heading: "The Greedy Insight Behind Prim's",
      bullets: [
        "Maintain a partition of vertices into two sets: those already in the MST (in-tree) and those not yet included (out-tree).",
        "At each step, look at all edges that cross the cut between in-tree and out-tree. Pick the one with the smallest weight.",
        "Add that minimum-weight crossing edge and its new endpoint to the MST. The tree grows by exactly one vertex per step.",
        "The Cut Property guarantees this greedy choice is always safe: the lightest edge across any cut of the graph is always part of some MST.",
        "Repeat until all |V| vertices are in the tree. After |V| − 1 steps the MST is complete.",
      ],
      analogy:
        "Think of Prim's algorithm like a city gradually expanding its road network. Starting from city hall, engineers always build the shortest new road that connects one more unconnected town to the existing network. They never build a road between two already-connected towns (that would create a redundant loop) and always choose the cheapest available option. After connecting every town with the minimum total road length, the MST is complete.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough on a 6-Vertex Graph",
      steps: [
        {
          step: 1,
          label: "Define the graph",
          description:
            "Graph has vertices A, B, C, D, E, F with edges: A-B(6), A-C(3), B-C(2), B-D(5), C-E(4), D-E(7), D-F(1), E-F(8). Goal: find the MST.",
        },
        {
          step: 2,
          label: "Initialize from vertex A",
          description:
            "Place A in the MST set. Add all edges incident to A into the candidate set: A-B(6) and A-C(3). The priority queue now contains these two edges.",
        },
        {
          step: 3,
          label: "Add edge A-C (weight 3)",
          description:
            "The cheapest crossing edge is A-C with weight 3. Add C to the MST. MST = {A, C}, edges = {A-C}. Update candidates: add C-B(2) and C-E(4) from C's adjacency list.",
        },
        {
          step: 4,
          label: "Add edge C-B (weight 2)",
          description:
            "The cheapest crossing edge is now C-B with weight 2. Add B to the MST. MST = {A, C, B}, edges = {A-C, C-B}. Add B-D(5) from B's adjacency list. A-B(6) is now an in-tree edge — discard it.",
        },
        {
          step: 5,
          label: "Add edge C-E (weight 4)",
          description:
            "Remaining candidates: C-E(4), B-D(5). Cheapest is C-E with weight 4. Add E to the MST. MST = {A, C, B, E}, edges = {A-C, C-B, C-E}. Add E-D(7) and E-F(8) from E's adjacency list.",
        },
        {
          step: 6,
          label: "Add edge B-D (weight 5)",
          description:
            "Remaining candidates: B-D(5), E-D(7), E-F(8). Cheapest is B-D with weight 5. Add D to the MST. MST = {A, C, B, E, D}, edges = {A-C, C-B, C-E, B-D}. Add D-F(1). E-D(7) now connects two in-tree vertices — discard.",
        },
        {
          step: 7,
          label: "Add edge D-F (weight 1)",
          description:
            "Remaining candidates: D-F(1), E-F(8). Cheapest is D-F with weight 1. Add F to the MST. MST = {A, C, B, E, D, F} — all vertices included. E-F(8) connects two in-tree vertices — discard.",
        },
        {
          step: 8,
          label: "MST is complete",
          description:
            "All 6 vertices are in the tree using 5 edges. Total MST weight = 3 + 2 + 4 + 5 + 1 = 15. The algorithm terminates because the in-tree set equals V.",
        },
        {
          step: 9,
          label: "Verify: no cheaper spanning tree exists",
          description:
            "Any spanning tree of this graph must use 5 edges. Replacing any MST edge with a non-MST edge would either disconnect the tree or introduce a heavier edge — the MST is optimal.",
        },
        {
          step: 10,
          label: "Final MST edges",
          description:
            "MST = {A-C(3), C-B(2), C-E(4), B-D(5), D-F(1)}. Total weight = 15. The MST spans all vertices with minimum cost, ready for use in network design or further graph algorithms.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import heapq
from collections import defaultdict

def prim(graph, start):
    """
    Prim's MST algorithm using a min-heap.
    graph[u] = [(weight, v), ...]  (undirected: store both directions)
    Returns (mst_edges, total_weight).
    """
    in_tree = set()
    in_tree.add(start)

    # heap entries: (weight, u, v)
    heap = []
    for weight, neighbor in graph[start]:
        heapq.heappush(heap, (weight, start, neighbor))

    mst_edges = []
    total_weight = 0

    while heap and len(in_tree) < len(graph):
        weight, u, v = heapq.heappop(heap)

        # Skip if v is already in the MST (both endpoints in-tree)
        if v in in_tree:
            continue

        # Commit this edge to the MST
        in_tree.add(v)
        mst_edges.append((u, v, weight))
        total_weight += weight

        # Push all edges from v to out-of-tree neighbors
        for next_weight, neighbor in graph[v]:
            if neighbor not in in_tree:
                heapq.heappush(heap, (next_weight, v, neighbor))

    return mst_edges, total_weight


# Example usage
if __name__ == "__main__":
    g = defaultdict(list)
    # Add edges in both directions (undirected graph)
    edges = [('A','B',6), ('A','C',3), ('B','C',2),
             ('B','D',5), ('C','E',4), ('D','E',7),
             ('D','F',1), ('E','F',8)]
    for u, v, w in edges:
        g[u].append((w, v))
        g[v].append((w, u))

    mst, cost = prim(g, 'A')
    print("MST edges:", mst)
    # [('A','C',3), ('C','B',2), ('C','E',4), ('B','D',5), ('D','F',1)]
    print("Total weight:", cost)   # 15
`,
      annotations: [
        {
          lines: "4-10",
          note: "Initialize the in-tree set with the starting vertex and push all its incident edges onto the min-heap. Each heap entry is (weight, from, to) so the heap orders by edge weight.",
        },
        {
          lines: "12-14",
          note: "The main loop runs until all vertices are in the tree or the heap is exhausted. The second condition handles disconnected graphs gracefully.",
        },
        {
          lines: "17-19",
          note: "Lazy deletion: if v is already in the MST when we pop the edge, it means we found a cheaper path to v earlier. Simply skip this stale entry — no decrease-key needed.",
        },
        {
          lines: "21-25",
          note: "Commit the edge: add v to the in-tree set, record the MST edge, and accumulate the total weight. This is the core greedy selection step.",
        },
        {
          lines: "27-30",
          note: "Expand the frontier: push all edges from the newly added vertex v to its out-of-tree neighbors. The heap will automatically surface the cheapest one next iteration.",
        },
        {
          lines: "33-46",
          note: "Build the example graph as an adjacency list with edges stored in both directions. Prim's algorithm requires an undirected graph representation.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(E log V)",
          note: "Binary heap; sparse graph with few edges",
        },
        {
          case: "Average",
          complexity: "O(E log V)",
          note: "Binary heap with lazy deletion; typical sparse graph",
        },
        {
          case: "Worst",
          complexity: "O(E log V)",
          note: "Dense graph E ≈ V²; Fibonacci heap gives O(E + V log V)",
        },
      ],
      spaceRows: [
        {
          label: "In-tree set",
          complexity: "O(V)",
          note: "Tracks which vertices are in the MST",
        },
        {
          label: "Priority queue",
          complexity: "O(E)",
          note: "Up to E edges stored with lazy deletion",
        },
        {
          label: "MST edge list",
          complexity: "O(V)",
          note: "Stores the V−1 selected MST edges",
        },
      ],
      insights: [
        "Each edge is pushed onto the heap at most twice (once per endpoint), so the total number of heap operations is O(E). Each push/pop costs O(log E) = O(log V), giving O(E log V) overall.",
        "For dense graphs (E = O(V²)), a Fibonacci heap reduces the time to O(E + V log V) ≈ O(V²) — better than the binary heap's O(V² log V).",
        "Kruskal's algorithm also finds the MST in O(E log E) time but sorts all edges upfront; Prim's with a binary heap is often faster in practice for dense graphs because it processes only reachable edges.",
      ],
    },

    variations: {
      heading: "Variants & Practical Tips",
      variations: [
        {
          name: "Prim's with Fibonacci Heap",
          description:
            "Replace the binary min-heap with a Fibonacci heap to achieve O(1) amortized decrease-key operations. Total time becomes O(E + V log V), which is asymptotically optimal for dense graphs where E >> V log V.",
        },
        {
          name: "Kruskal's Algorithm",
          description:
            "Sort all edges by weight and use Union-Find to greedily add the cheapest edge that does not form a cycle. Both Prim's and Kruskal's find the MST; Kruskal's is often simpler to implement and faster on sparse graphs.",
        },
        {
          name: "Borůvka's Algorithm",
          description:
            "Each component simultaneously picks its cheapest outgoing edge and merges. Completes in O(log V) rounds, each taking O(E) time, for O(E log V) total. Parallelizes naturally — used in external-memory and distributed MST algorithms.",
        },
        {
          name: "Steiner Tree Problem",
          description:
            "A generalization where only a subset of 'terminal' vertices must be connected (non-terminals are optional). NP-hard in general; Prim's cannot solve it optimally, but MST-based approximations give a 2-approximation ratio.",
        },
        {
          name: "Maximum Spanning Tree",
          description:
            "To find the spanning tree with maximum total weight, negate all edge weights and run Prim's normally, or modify the heap to be a max-heap. Used in maximum bandwidth path problems and cluster analysis.",
        },
      ],
      tips: [
        "Use lazy deletion (skip stale heap entries) rather than implementing decrease-key — it is simpler to code, often just as fast in practice, and avoids complex heap augmentation.",
        "For very dense graphs (E close to V²), consider an adjacency-matrix based O(V²) Prim's implementation — it avoids heap overhead and can outperform the O(E log V) version when E is large.",
        "Always verify the graph is connected before running Prim's; if the heap empties before all vertices are added, the graph has multiple components and no spanning tree exists.",
        "When edge weights are equal, Prim's still produces a valid MST; the specific tree chosen depends on tie-breaking, but all results have the same total weight.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Prim's algorithm builds the MST by maintaining a single growing tree and always adding the minimum-weight edge that connects a new vertex to the existing tree.",
        "The Cut Property guarantees correctness: the lightest edge crossing any cut of the graph belongs to some MST, so the greedy choice is always safe.",
        "With a binary min-heap and lazy deletion, Prim's runs in O(E log V) time and O(V + E) space — practical for most real-world graphs.",
        "A Fibonacci heap improves the time complexity to O(E + V log V), which is superior for dense graphs but rarely implemented due to its complexity.",
        "Prim's is the algorithm of choice for dense graphs; Kruskal's is typically preferred for sparse graphs due to its simpler Union-Find structure.",
        "MST algorithms underpin network design, clustering (single-linkage), image segmentation, and approximation algorithms for NP-hard problems like the Traveling Salesman Problem.",
      ],
    },
  },
};

export default function PrimVideo() {
  return <AlgoVideo config={config} />;
}
