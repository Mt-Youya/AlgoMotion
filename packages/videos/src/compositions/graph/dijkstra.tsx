import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Dijkstra's Algorithm",
  subtitle: "Shortest paths from source to all vertices in non-negative weight graph.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Dijkstra Solve?",
      bullets: [
        "Given a weighted, directed or undirected graph with non-negative edge weights, find the minimum cost path from a single source vertex to every other vertex.",
        "Edge weights represent costs such as distance, time, or bandwidth — all must be ≥ 0 for Dijkstra to be correct.",
        "The output is a shortest-path tree: for each vertex v, the unique path from source s to v along the tree is the globally cheapest path.",
        "Classic applications include GPS routing, network packet forwarding (OSPF), and flight itinerary optimization.",
        "Negative-weight edges break the greedy invariant; use Bellman-Ford instead when negatives are possible.",
      ],
    },

    intuition: {
      heading: "The Greedy Insight",
      bullets: [
        "Maintain a set of 'settled' vertices whose shortest distance from the source is already finalized.",
        "At each step, pick the unsettled vertex with the smallest tentative distance — this is the greedy choice.",
        "Because all weights are non-negative, no future path can improve the distance to the chosen vertex.",
        "Relax all edges leaving the chosen vertex: if going through it reaches a neighbor cheaper, update that neighbor's tentative distance.",
        "Repeat until every vertex is settled or the priority queue is empty.",
      ],
      analogy:
        "Imagine water spreading outward from a source on a terrain map. Water always flows into the lowest available valley first. Once a valley is flooded it stays flooded at that level — no cheaper route can appear later. Dijkstra mimics this: the 'water front' is the priority queue and each flooded valley is a settled vertex.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          label: "Initialize",
          description:
            "Set dist[source] = 0 and dist[v] = ∞ for every other vertex v. Push (0, source) into a min-heap priority queue.",
        },
        {
          step: 2,
          label: "Extract minimum",
          description:
            "Pop the vertex u with the smallest tentative distance from the heap. If u is already visited, skip it.",
        },
        {
          step: 3,
          label: "Mark settled",
          description: "Mark u as visited. Its current dist[u] value is now the final shortest distance from source.",
        },
        {
          step: 4,
          label: "Relax edges from A (dist=0)",
          description:
            "Examine neighbors B (weight 4) and C (weight 1). Update dist[B] = 4, dist[C] = 1. Push both into the heap.",
        },
        {
          step: 5,
          label: "Process C (dist=1)",
          description:
            "C has the smallest tentative distance. Relax edge C→B: dist[A]+1+2 = 3 < 4, so update dist[B] = 3. Relax C→E: dist[E] = 9.",
        },
        {
          step: 6,
          label: "Process B (dist=3)",
          description: "Relax B→D: dist[D] = 3 + 5 = 8. B→C already settled. Push (8, D) into heap.",
        },
        {
          step: 7,
          label: "Process D (dist=8)",
          description: "Relax D→E: dist[D] + 2 = 10 > 9, no update. D is settled.",
        },
        {
          step: 8,
          label: "Process E (dist=9)",
          description: "E has no unvisited neighbors. E is settled. Priority queue is now empty.",
        },
        {
          step: 9,
          label: "Final distances",
          description:
            "A=0, B=3, C=1, D=8, E=9. These are the globally shortest distances from A to every other vertex.",
        },
        {
          step: 10,
          label: "Reconstruct path",
          description:
            "By tracing the 'prev' array backwards from any target vertex, recover the actual shortest path, not just its cost.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import heapq
from collections import defaultdict

def dijkstra(graph, source):
    # graph[u] = [(weight, v), ...]
    dist = defaultdict(lambda: float('inf'))
    prev = {}
    dist[source] = 0
    heap = [(0, source)]  # (distance, vertex)

    while heap:
        d, u = heapq.heappop(heap)

        # Stale entry — skip
        if d > dist[u]:
            continue

        for weight, v in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                prev[v] = u
                heapq.heappush(heap, (new_dist, v))

    return dist, prev


def shortest_path(prev, source, target):
    path = []
    node = target
    while node != source:
        if node not in prev:
            return []   # unreachable
        path.append(node)
        node = prev[node]
    path.append(source)
    return path[::-1]


# Example usage
if __name__ == "__main__":
    g = defaultdict(list)
    g['A'] += [(4, 'B'), (1, 'C')]
    g['B'] += [(2, 'C'), (5, 'D')]
    g['C'] += [(8, 'E')]
    g['D'] += [(2, 'E')]

    distances, predecessors = dijkstra(g, 'A')
    print(distances)   # {'A': 0, 'C': 1, 'B': 3, 'D': 8, 'E': 9}
    print(shortest_path(predecessors, 'A', 'E'))  # ['A', 'C', 'B', 'D', 'E']
`,
      annotations: [
        {
          lines: "2-6",
          note: "Initialize dist to infinity for all vertices, 0 for source. The min-heap starts with just the source.",
        },
        {
          lines: "8-10",
          note: "Pop the cheapest unprocessed vertex. The 'stale entry' check handles duplicate heap entries efficiently without a decrease-key operation.",
        },
        {
          lines: "12-17",
          note: "Edge relaxation: if going through u to v is cheaper than the current best known path to v, update and push the new (distance, vertex) pair.",
        },
        {
          lines: "20-28",
          note: "Path reconstruction walks the 'prev' map backwards from target to source, then reverses the result.",
        },
        {
          lines: "31-38",
          note: "Example graph matching the walkthrough. Adjacency list stores (weight, neighbor) tuples to keep heap comparisons on distance first.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O((V + E) log V)",
          note: "Binary heap; source is only vertex",
        },
        {
          case: "Average",
          complexity: "O((V + E) log V)",
          note: "Binary heap with lazy deletion",
        },
        {
          case: "Worst",
          complexity: "O((V + E) log V)",
          note: "Dense graph; Fibonacci heap gives O(V log V + E)",
        },
      ],
      spaceRows: [
        {
          label: "Distance array",
          complexity: "O(V)",
          note: "One entry per vertex",
        },
        {
          label: "Priority queue",
          complexity: "O(E)",
          note: "Up to E entries with lazy deletion",
        },
        {
          label: "Predecessor map",
          complexity: "O(V)",
          note: "For path reconstruction",
        },
      ],
      insights: [
        "With a binary min-heap the dominant cost is E heap pushes each costing O(log V), giving O(E log V) total.",
        "A Fibonacci heap reduces decrease-key to O(1) amortized, yielding O(V log V + E) — preferable for very dense graphs.",
        "For sparse graphs (E ≈ V) both heap variants give O(V log V), essentially linear in the number of vertices.",
      ],
    },

    variations: {
      heading: "Variants & Practical Tips",
      variations: [
        {
          name: "Bidirectional Dijkstra",
          description:
            "Run two simultaneous Dijkstra searches — one from source, one from target — and stop when their frontiers meet. Roughly halves the search space for point-to-point queries.",
        },
        {
          name: "A* Search",
          description:
            "Augment Dijkstra with a heuristic h(v) estimating remaining cost to target. Prioritize f(v) = dist[v] + h(v). Reduces expanded nodes dramatically when a good admissible heuristic is available.",
        },
        {
          name: "Dial's Algorithm",
          description:
            "When edge weights are small integers (max weight W), use a bucket queue of size W·V. Achieves O(V + E + W·V) — faster than heap-based Dijkstra for integer-weight road networks.",
        },
        {
          name: "Dijkstra on DAGs",
          description:
            "On directed acyclic graphs, topological sort + single relaxation pass achieves O(V + E) — no priority queue needed and handles negative weights too.",
        },
        {
          name: "Multi-source Dijkstra",
          description:
            "Initialize the heap with multiple source vertices each at distance 0. Computes shortest distance from the nearest source to every vertex in one pass — used in Voronoi-on-graphs problems.",
        },
      ],
      tips: [
        "Always check for negative weights before applying Dijkstra; a single negative edge can silently produce wrong answers.",
        "Use lazy deletion (skip stale heap entries) rather than decrease-key for cleaner, often faster Python/Java implementations.",
        "Store the graph as an adjacency list, not a matrix, to keep memory O(V + E) and iteration fast.",
        "For road networks with millions of nodes, combine Dijkstra with contraction hierarchies or ALT landmarks for sub-second queries.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Dijkstra greedily settles the closest unsettled vertex at each step, guaranteed correct because all edge weights are non-negative.",
        "A min-heap priority queue drives the algorithm to O((V + E) log V) time — far better than the naive O(V²) array scan.",
        "The predecessor map enables full path reconstruction in O(V) time after the main loop completes.",
        "Negative edge weights invalidate the greedy invariant; use Bellman-Ford (O(VE)) or SPFA for graphs with negatives.",
        "Dijkstra is the backbone of real-world routing: OSPF, GPS navigation, and network flow all build on its core idea.",
        "Bidirectional search and A* are the most impactful practical extensions when only point-to-point distances are needed.",
      ],
    },
  },
}

export default function DijkstraVideo() {
  return <AlgoVideo config={config} />
}
