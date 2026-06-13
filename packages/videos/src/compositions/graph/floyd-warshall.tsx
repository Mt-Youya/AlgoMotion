import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Floyd-Warshall Algorithm",
  subtitle: "All-pairs shortest paths using dynamic programming.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Floyd-Warshall Solve?",
      bullets: [
        "Given a weighted directed graph with V vertices, find the shortest path between every pair of vertices (i, j).",
        "Unlike Dijkstra's algorithm which finds single-source shortest paths, Floyd-Warshall computes all-pairs shortest paths in one pass.",
        "The graph may contain negative-weight edges, but must not contain negative-weight cycles.",
        "The result is a V×V distance matrix where dist[i][j] holds the shortest distance from vertex i to vertex j.",
        "If no path exists between two vertices, the distance is represented as infinity (∞).",
      ],
    },

    intuition: {
      heading: "The Core Intuition",
      bullets: [
        "Use dynamic programming: for each possible intermediate vertex k, check if routing through k improves any existing path.",
        "The recurrence is: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).",
        "After considering all k from 0 to V-1, every dist[i][j] holds the true shortest path.",
        "The order of iteration matters: outer loop over k (intermediate), inner loops over i (source) and j (destination).",
        "Real-world analogy: imagine you are building a road atlas. For each city k you add as a potential waypoint, you check every pair of cities (i, j) — can the trip from i to j be shortened by stopping at k? After checking every possible waypoint, the atlas is complete.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Initialize the distance matrix",
          description: "Create a V×V matrix. Set dist[i][i] = 0 for all i. For each edge (u, v, w), set dist[u][v] = w. All other entries are set to ∞.",
        },
        {
          step: 2,
          title: "Outer loop: choose intermediate vertex k = 0",
          description: "Consider vertex 0 as a potential intermediate node on every path i → j.",
        },
        {
          step: 3,
          title: "Inner loops: iterate over all (i, j) pairs",
          description: "For each pair (i, j), compute dist[i][0] + dist[0][j]. If this is less than dist[i][j], update dist[i][j].",
        },
        {
          step: 4,
          title: "Record improvements for k = 0",
          description: "Any path that benefits from routing through vertex 0 is now recorded in the matrix. Paths that do not improve remain unchanged.",
        },
        {
          step: 5,
          title: "Advance to k = 1",
          description: "Now consider vertex 1 as an intermediate. The matrix already encodes optimal paths using only vertex 0, so we build on top of that.",
        },
        {
          step: 6,
          title: "Update paths through k = 1",
          description: "For each (i, j), check dist[i][1] + dist[1][j] < dist[i][j]. If true, update. This may cascade improvements found in the previous round.",
        },
        {
          step: 7,
          title: "Continue for k = 2, 3, …, V-1",
          description: "Repeat the same inner double-loop for every remaining intermediate vertex. Each round may improve more entries.",
        },
        {
          step: 8,
          title: "Detect negative cycles (optional)",
          description: "After all rounds, if any dist[i][i] < 0, a negative-weight cycle exists in the graph. The algorithm's output is invalid in that case.",
        },
        {
          step: 9,
          title: "Read the final matrix",
          description: "dist[i][j] now contains the shortest path length from i to j considering all possible intermediate vertices.",
        },
        {
          step: 10,
          title: "Reconstruct paths (optional)",
          description: "Maintain a separate next[i][j] matrix updated alongside dist. Trace from source to destination using next pointers to recover the actual path.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def floyd_warshall(graph: list[list[float]]) -> list[list[float]]:
    """
    Compute all-pairs shortest paths.
    graph[i][j] = weight of edge i->j, or float('inf') if no edge.
    graph[i][i] should be 0.
    Returns the distance matrix.
    """
    n = len(graph)
    # Copy the input so we don't mutate it
    dist = [row[:] for row in graph]

    # Consider each vertex as an intermediate node
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]

    # Check for negative cycles
    for i in range(n):
        if dist[i][i] < 0:
            raise ValueError("Graph contains a negative-weight cycle")

    return dist


def reconstruct_path(next_hop, src, dst):
    """Reconstruct path from src to dst using next_hop matrix."""
    if next_hop[src][dst] is None:
        return []
    path = [src]
    while src != dst:
        src = next_hop[src][dst]
        path.append(src)
    return path


def floyd_warshall_with_path(graph):
    n = len(graph)
    dist = [row[:] for row in graph]
    next_hop = [[j if graph[i][j] != float('inf') else None
                 for j in range(n)] for i in range(n)]
    for i in range(n):
        next_hop[i][i] = i

    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_hop[i][j] = next_hop[i][k]

    return dist, next_hop`,
      annotations: [
        {
          lines: [1, 8],
          note: "The function accepts the adjacency matrix directly. We copy it to avoid mutating the caller's data.",
        },
        {
          lines: [11, 16],
          note: "Three nested loops — O(V³) total. The outer loop over k is the key: it picks each vertex as a potential intermediate node.",
        },
        {
          lines: [13, 15],
          note: "The DP recurrence: if going i→k→j is cheaper than the current best i→j, update the distance.",
        },
        {
          lines: [18, 20],
          note: "Negative cycle detection: if any diagonal entry dist[i][i] < 0, a negative cycle was found and the result is meaningless.",
        },
        {
          lines: [24, 30],
          note: "Path reconstruction using the next_hop matrix. Follow next_hop pointers from source until destination is reached.",
        },
        {
          lines: [33, 46],
          note: "Extended version that builds the next_hop matrix in parallel with dist, enabling full path reconstruction after the algorithm completes.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best case", value: "O(V³)", note: "Always runs all three loops regardless of input." },
        { label: "Average case", value: "O(V³)", note: "No early termination; every (k, i, j) triple is visited." },
        { label: "Worst case", value: "O(V³)", note: "Dense graph with V vertices; all V³ iterations execute." },
      ],
      spaceRows: [
        { label: "Distance matrix", value: "O(V²)", note: "Stores shortest distances for every pair." },
        { label: "Path matrix (optional)", value: "O(V²)", note: "next_hop matrix for path reconstruction." },
      ],
      insights: [
        "Floyd-Warshall is practical for dense graphs (E ≈ V²) where running Dijkstra V times would also be O(V³) but with larger constants.",
        "For sparse graphs, running Bellman-Ford from each vertex is O(V²·E) which may be faster when E ≪ V².",
        "The algorithm is cache-friendly and simple to implement, making it a practical choice for small-to-medium graphs (V ≤ 500).",
      ],
    },

    variations: {
      heading: "Variations & Related Algorithms",
      variations: [
        {
          name: "Floyd-Warshall with Path Reconstruction",
          description: "Maintain a next_hop[i][j] matrix updated alongside dist. After the algorithm, trace pointers to recover actual shortest paths, not just distances.",
        },
        {
          name: "Transitive Closure (Boolean Floyd-Warshall)",
          description: "Replace min/+ with OR/AND to determine reachability. reach[i][j] = true if any path from i to j exists. Runs in O(V³) time.",
        },
        {
          name: "Floyd-Warshall for Maximum Bottleneck Path",
          description: "Change the recurrence to dist[i][j] = max(dist[i][j], min(dist[i][k], dist[k][j])) to find the path that maximizes the minimum edge weight.",
        },
        {
          name: "Johnson's Algorithm",
          description: "Reweights edges to eliminate negatives, then runs Dijkstra from each vertex. Achieves O(V² log V + VE), better than O(V³) on sparse graphs.",
        },
        {
          name: "Parallel Floyd-Warshall",
          description: "The inner two loops over (i, j) are independent for a fixed k and can be parallelized across threads or GPU cores, reducing wall time significantly.",
        },
      ],
      tips: [
        "Initialize the diagonal to 0 and all other entries to ∞ before loading edge weights — a common source of bugs.",
        "Always check for negative cycles after running the algorithm; a negative diagonal entry is the signal.",
        "For unweighted graphs, set all edge weights to 1 to find shortest-hop counts between all pairs.",
        "When V is large (> 1000), consider Johnson's algorithm or running Dijkstra V times from each vertex with a priority queue.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Floyd-Warshall solves the all-pairs shortest path problem in O(V³) time using dynamic programming over intermediate vertices.",
        "The recurrence dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) is applied for every intermediate vertex k from 0 to V-1.",
        "The algorithm handles negative-weight edges correctly, but negative-weight cycles render the result invalid — always check the diagonal.",
        "Space complexity is O(V²) for the distance matrix; an additional O(V²) next_hop matrix enables full path reconstruction.",
        "It is best suited for dense graphs or when all-pairs distances are genuinely needed; for sparse graphs or single-source queries, Dijkstra or Bellman-Ford are more efficient.",
        "The three-nested-loop structure is simple to implement and verify, making Floyd-Warshall a reliable choice for competitive programming and small production graphs.",
      ],
    },
  },
};

export default function FloydWarshallVideo() {
  return <AlgoVideo config={config} />;
}
