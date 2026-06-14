import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Bellman-Ford Algorithm",
  subtitle: "Shortest paths with negative edge weights, detects negative cycles.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What is the Bellman-Ford Algorithm?",
      body: [
        "Bellman-Ford finds the shortest paths from a single source vertex to all other vertices in a weighted directed graph.",
        "Unlike Dijkstra's algorithm, Bellman-Ford correctly handles graphs with negative edge weights.",
        "It runs V−1 relaxation passes over all edges, where V is the number of vertices.",
        "After V−1 passes, a final (V-th) pass detects negative-weight cycles: if any distance still decreases, a negative cycle exists.",
        "Negative cycles make shortest paths undefined because you can loop forever to decrease the path cost.",
      ],
      callout:
        "Key insight: In any shortest path with no negative cycle, a path visits at most V−1 edges. So V−1 relaxation passes are sufficient to find all shortest paths.",
    },

    intuition: {
      heading: "The Core Intuition",
      body: [
        "Think of relaxation: if going through vertex u improves the known distance to v, update dist[v] = dist[u] + weight(u→v).",
        "In the first pass, we correctly compute shortest paths using at most 1 edge. In the second pass, at most 2 edges. And so on.",
        "After V−1 passes, all shortest paths (which have at most V−1 edges) are correctly computed.",
        "The V-th pass acts as a sanity check: in a graph with no negative cycles, no distances should change. If they do, a negative cycle is reachable.",
        "Bellman-Ford is slower than Dijkstra (O(VE) vs O((V+E) log V)) but more general — it works with any real-valued edge weights.",
      ],
      analogy:
        "Real-world analogy: Imagine a network of currency exchange desks. Each desk charges a fee (positive) or offers a bonus (negative). Bellman-Ford finds the cheapest route to exchange currency through any sequence of desks, and detects if any loop of exchanges actually generates free money (a negative cycle).",
    },

    walkthrough: {
      steps: [
        {
          label: "Initialize distances",
          description:
            "Set dist[source] = 0 and dist[v] = ∞ for all other vertices v. This represents 'we know the source costs 0 to reach, and we have no information about others yet.'",
        },
        {
          label: "Pass 1: Relax edge S→A (weight 6)",
          description: "dist[S]=0, dist[A]=∞. Since 0+6=6 < ∞, update dist[A]=6. We've found a path S→A of cost 6.",
        },
        {
          label: "Pass 1: Relax edge S→B (weight 7)",
          description: "dist[S]=0, dist[B]=∞. Since 0+7=7 < ∞, update dist[B]=7. We've found a path S→B of cost 7.",
        },
        {
          label: "Pass 2: Relax edge B→C (weight −3)",
          description:
            "dist[B]=7, dist[C]=∞. Since 7+(−3)=4 < ∞, update dist[C]=4. Negative edge weight gives us a cheaper path to C via B.",
        },
        {
          label: "Pass 2: Relax edge A→D (weight −4)",
          description:
            "dist[A]=6, dist[D]=∞. Since 6+(−4)=2 < ∞, update dist[D]=2. Another negative edge gives a cheap path to D.",
        },
        {
          label: "Pass 3: No further improvements",
          description:
            "Checking all edges again: D→C gives 2+7=9 which is not less than dist[C]=4. A→B gives 6+8=14 which is not less than dist[B]=7. No updates.",
        },
        {
          label: "Pass 4: Final V−1 pass completes",
          description:
            "All 4 passes (V−1 = 5−1 = 4) are done. No further relaxations occur. Final distances: dist[S]=0, dist[A]=6, dist[B]=7, dist[C]=4, dist[D]=2.",
        },
        {
          label: "V-th pass: Negative cycle detection",
          description:
            "Run one more pass over all edges. If any dist[v] decreases, a negative cycle is reachable from the source. In our example, no distances change — the graph has no negative cycles.",
        },
        {
          label: "Reconstruct shortest paths",
          description:
            "Using the parent array recorded during relaxation: S→A (cost 6), S→B (cost 7), S→B→C (cost 4), S→A→D (cost 2). These are the shortest paths from S.",
        },
        {
          label: "Negative cycle example (conceptual)",
          description:
            "If edges formed a cycle A→B→C→A with total weight −1, then on the V-th pass dist[A] (or dist[B] or dist[C]) would decrease again — signaling the negative cycle.",
        },
      ],
    },

    code: {
      snippet: `def bellman_ford(graph, source):
    """
    Bellman-Ford shortest path from source.
    graph: list of (u, v, weight) edge tuples
    source: starting vertex
    Returns: (dist dict, parent dict) or raises if negative cycle
    """
    # Collect all vertices
    vertices = set()
    for u, v, _ in graph:
        vertices.add(u)
        vertices.add(v)
    vertices.add(source)

    # Step 1: Initialize distances
    dist = {v: float('inf') for v in vertices}
    parent = {v: None for v in vertices}
    dist[source] = 0

    # Step 2: Relax all edges V-1 times
    V = len(vertices)
    for i in range(V - 1):
        updated = False
        for u, v, w in graph:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                updated = True
        # Early termination: if no update, we're done
        if not updated:
            break

    # Step 3: Detect negative cycles (V-th pass)
    for u, v, w in graph:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            raise ValueError("Graph contains a negative-weight cycle")

    return dist, parent


def reconstruct_path(parent, source, target):
    """Trace back shortest path from source to target."""
    path = []
    node = target
    while node is not None:
        path.append(node)
        node = parent[node]
    path.reverse()
    return path if path[0] == source else []
`,
      language: "python",
      annotations: [
        {
          lines: [16, 17, 18],
          note: "Initialize all distances to infinity except the source (dist[source] = 0). This represents 'unknown' distances.",
        },
        {
          lines: [21, 22, 23, 24, 25, 26, 27],
          note: "The outer loop runs V−1 times. The inner loop relaxes every edge. If dist[u] + w < dist[v], we've found a shorter path to v through u.",
        },
        {
          lines: [28, 29, 30],
          note: "Early termination optimization: if no edge was relaxed in a full pass, the algorithm has converged and we can stop early.",
        },
        {
          lines: [33, 34, 35],
          note: "The V-th pass for negative cycle detection. If any dist[v] can still decrease, a negative cycle is reachable from the source.",
        },
        {
          lines: [40, 41, 42, 43, 44, 45],
          note: "Path reconstruction traces back through the parent array from target to source, then reverses the result.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best case", value: "O(E)", color: "#CEEB5A" },
        { label: "Average case", value: "O(VE)", color: "#2255CC" },
        { label: "Worst case", value: "O(VE)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Distance array", value: "O(V)" },
        { label: "Parent array", value: "O(V)" },
        { label: "Total space", value: "O(V)" },
      ],
      notes: [
        "V = number of vertices, E = number of edges. The O(VE) worst case comes from V−1 passes each scanning all E edges.",
        "Best case O(E) occurs with early termination when the graph converges in the first pass (e.g., a DAG processed in topological order).",
        "Bellman-Ford is slower than Dijkstra's O((V+E) log V) but is the only correct choice when negative edge weights are present.",
      ],
    },

    variations: {
      items: [
        "SPFA (Shortest Path Faster Algorithm): Uses a queue to only relax edges from recently-updated vertices, giving O(kE) average time where k << V.",
        "Bellman-Ford on DAGs: Process vertices in topological order for O(V+E) single-pass shortest paths, even with negative edges.",
        "Distributed Bellman-Ford: Used in distance-vector routing protocols (RIP). Each router maintains distances and exchanges updates with neighbors — the basis of the internet's early routing.",
        "Johnson's Algorithm: Uses Bellman-Ford once to reweight all edges (eliminating negatives), then runs Dijkstra from every vertex for all-pairs shortest paths in O(V² log V + VE).",
        "Yen's k-Shortest Paths: Extends Bellman-Ford style relaxation to find the k shortest simple paths between two vertices.",
      ],
      tips: [
        "Add early termination: track whether any edge was relaxed in a pass. If not, the algorithm has converged and you can exit after fewer than V−1 passes.",
        "For dense graphs (E ≈ V²), Bellman-Ford's O(VE) = O(V³) is much worse than Dijkstra. Only use it when negative edges exist.",
        "When building the parent array, be careful with negative cycles: path reconstruction can loop infinitely if a negative cycle is reachable on the path.",
        "In competitive programming, use SPFA as a faster practical alternative, but be aware it has O(VE) worst case and can be hacked with adversarial inputs.",
      ],
    },

    summary: {
      keyPoints: [
        "Bellman-Ford finds single-source shortest paths in O(VE) time by relaxing all edges V−1 times.",
        "It correctly handles negative edge weights, unlike Dijkstra's algorithm which requires non-negative weights.",
        "A V-th relaxation pass detects negative-weight cycles: if any distance decreases, a negative cycle is reachable.",
        "The parent array enables shortest path reconstruction by tracing back from any target to the source.",
        "Early termination (stop when no edge is relaxed in a full pass) significantly speeds up the algorithm in practice.",
        "Bellman-Ford underpins distance-vector routing protocols and is the correctness baseline for more advanced shortest-path algorithms like SPFA and Johnson's.",
      ],
    },
  },
}

export default function BellmanFordVideo() {
  return <AlgoVideo config={config} />
}
