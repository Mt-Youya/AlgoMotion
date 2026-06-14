import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "SPFA",
  subtitle: "Optimized Bellman-Ford using a queue for faster average-case performance.",
  category: "graph",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What Problem Does SPFA Solve?",
      bullets: [
        "Given a weighted directed graph with possible negative edge weights, find the shortest path from a source node to all other nodes.",
        "Standard Dijkstra's algorithm fails when negative edge weights are present in the graph.",
        "Bellman-Ford correctly handles negative weights but runs in O(VE) time — relaxing every edge V-1 times unconditionally.",
        "SPFA (Shortest Path Faster Algorithm) improves on Bellman-Ford by only re-relaxing edges from nodes whose distances were recently updated.",
        "It also supports detection of negative-weight cycles, returning early if any node is enqueued more than V times.",
      ],
    },
    {
      kind: "intuition",
      heading: "The Core Intuition",
      bullets: [
        "Instead of blindly relaxing every edge on every pass, SPFA uses a queue to track which nodes had their distance updated.",
        "Only nodes in the queue need their outgoing edges reconsidered — nodes with unchanged distances cannot improve their neighbors.",
        "This mirrors how information 'propagates' through a graph: a cheaper path discovered at node A triggers re-evaluation of A's neighbors.",
        "In practice, most graphs are sparse and updates are localized, so SPFA processes far fewer edges than Bellman-Ford.",
        "Real-world analogy: Imagine a city road network where a new highway opens (edge weight drops). Only drivers near that highway need to reroute — not every driver in the city.",
      ],
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          title: "Initialize distances",
          description:
            "Set dist[source] = 0 and dist[all others] = ∞. Create a boolean array in_queue[] initialized to false.",
        },
        {
          title: "Enqueue the source",
          description:
            "Add the source node to the queue and set in_queue[source] = true. This is the only node whose outgoing edges we examine first.",
        },
        {
          title: "Dequeue the front node",
          description:
            "Pop node u from the front of the queue. Set in_queue[u] = false — it is no longer in the queue and can be re-added later if needed.",
        },
        {
          title: "Relax all outgoing edges of u",
          description:
            "For each neighbor v of u with edge weight w: if dist[u] + w < dist[v], update dist[v] = dist[u] + w.",
        },
        {
          title: "Enqueue updated neighbors",
          description:
            "If dist[v] was just improved and v is not already in the queue, add v to the queue and set in_queue[v] = true.",
        },
        {
          title: "Repeat until queue is empty",
          description:
            "Continue dequeuing nodes and relaxing their edges. The queue shrinks as paths stabilize and no more improvements are found.",
        },
        {
          title: "Negative cycle check",
          description:
            "Optionally track enqueue_count[v] for each node. If any node is enqueued V or more times, a negative cycle exists — terminate early.",
        },
        {
          title: "Example: node 0 → node 3 with edges 0→1(4), 0→2(2), 1→3(5), 2→1(1)",
          description:
            "Queue starts as [0]. Process 0: dist[1]=4, dist[2]=2, queue=[1,2]. Process 1: dist[3]=9, queue=[2,3]. Process 2: dist[1]=3 (improved!), queue=[3,1]. Process 1 again: dist[3]=8. Queue=[3]. Process 3: no improvements. Final: dist[3]=8.",
        },
        {
          title: "Why node 1 is processed twice",
          description:
            "Node 1's distance improved when node 2 was processed (via path 0→2→1 with cost 3 < 4). SPFA re-enqueues node 1 to propagate this improvement — Bellman-Ford would have caught this only on the next full pass.",
        },
        {
          title: "Termination guarantee",
          description:
            "Without negative cycles, SPFA always terminates because each node can only be re-enqueued if its distance strictly decreases, and distances are bounded below.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `from collections import deque

def spfa(graph, source, n):
    """
    SPFA: Shortest Path Faster Algorithm
    graph: adjacency list {u: [(v, weight), ...]}
    source: starting node index
    n: total number of nodes
    Returns: dist array, or None if negative cycle detected
    """
    INF = float('inf')
    dist = [INF] * n
    dist[source] = 0

    in_queue = [False] * n
    in_queue[source] = True

    enqueue_count = [0] * n
    enqueue_count[source] = 1

    queue = deque([source])

    while queue:
        u = queue.popleft()
        in_queue[u] = False

        for v, weight in graph.get(u, []):
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                if not in_queue[v]:
                    queue.append(v)
                    in_queue[v] = True
                    enqueue_count[v] += 1
                    if enqueue_count[v] >= n:
                        return None  # Negative cycle detected

    return dist


# Example usage
if __name__ == "__main__":
    graph = {
        0: [(1, 4), (2, 2)],
        1: [(3, 5)],
        2: [(1, 1), (4, 8)],
        3: [(5, 2)],
        4: [(3, -3), (5, 6)],
        5: [],
    }
    result = spfa(graph, source=0, n=6)
    print(result)  # [0, 3, 2, 6, 10, 8]`,
      annotations: [
        {
          lines: "3-8",
          note: "Function signature: takes an adjacency list, source node, and node count n. Returns the dist array or None on negative cycle.",
        },
        {
          lines: "10-16",
          note: "Initialization phase: dist[source]=0, all others=∞. in_queue tracks queue membership to avoid duplicate entries.",
        },
        {
          lines: "18-20",
          note: "enqueue_count tracks how many times each node enters the queue. If any node is enqueued ≥ n times, a negative cycle exists.",
        },
        {
          lines: "22-32",
          note: "Main loop: dequeue u, clear its in_queue flag, then try relaxing each outgoing edge. Only enqueue v if its distance actually improved.",
        },
        {
          lines: "33-34",
          note: "Negative cycle detection: if enqueue_count[v] reaches n, we've exceeded the maximum relaxation rounds possible without a cycle — return None.",
        },
        {
          lines: "37",
          note: "Return the final dist array. Each dist[i] holds the shortest path distance from source to node i.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          label: "Best Case",
          value: "O(E)",
          note: "Source's neighbors are already optimal; queue empties after one pass",
        },
        {
          label: "Average Case",
          value: "O(kE)",
          note: "k ≈ 2 empirically on random graphs; far fewer relaxations than Bellman-Ford",
        },
        {
          label: "Worst Case",
          value: "O(VE)",
          note: "Degrades to Bellman-Ford on adversarial inputs (e.g., grid graphs with specific patterns)",
        },
      ],
      spaceRows: [
        {
          label: "Distance Array",
          value: "O(V)",
          note: "One distance entry per node",
        },
        {
          label: "Queue + in_queue",
          value: "O(V)",
          note: "At most V nodes in the queue at once",
        },
        {
          label: "Graph Storage",
          value: "O(V + E)",
          note: "Adjacency list representation",
        },
      ],
      insights: [
        "SPFA's worst case O(VE) is the same as Bellman-Ford, but its average-case performance is dramatically better on typical sparse graphs.",
        "The algorithm is susceptible to adversarial inputs — competitive programming problems sometimes use 'SPFA killers' (specific graph structures) to force worst-case behavior.",
        "For graphs without negative edges, Dijkstra with a binary heap (O((V+E) log V)) is generally preferred over SPFA due to its guaranteed performance.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "SLF Optimization (Shortest Label First)",
          description:
            "Instead of a plain FIFO queue, use a deque. When enqueuing v, if dist[v] < dist[front of deque], push v to the front instead of the back. Reduces average relaxations significantly.",
        },
        {
          name: "LLL Optimization (Large Label Last)",
          description:
            "Maintain the average distance of all nodes in the queue. Move nodes with distance above average to the back of the queue. Can further reduce iterations on some graph types.",
        },
        {
          name: "SPFA with Negative Cycle Detection",
          description:
            "Track enqueue counts per node. If any count reaches V, report a negative cycle. Useful for currency arbitrage detection and constraint satisfaction problems.",
        },
        {
          name: "Bidirectional SPFA",
          description:
            "Run SPFA simultaneously from both source and target, meeting in the middle. Reduces search space roughly by half for point-to-point queries.",
        },
        {
          name: "SPFA on DAGs",
          description:
            "On directed acyclic graphs, topological sort + single-pass relaxation achieves O(V+E) with no queue needed — strictly better than SPFA.",
        },
      ],
      tips: [
        "Use SPFA when the graph has negative edge weights but you suspect few nodes will be re-relaxed in practice — it's faster than Bellman-Ford on average.",
        "Always implement the negative cycle check (enqueue_count ≥ n) when the input might contain negative cycles, to avoid infinite loops.",
        "Prefer Dijkstra over SPFA for non-negative graphs in competitive programming — judges sometimes include SPFA-killer test cases specifically to TLE SPFA solutions.",
        "The SLF optimization is a simple two-line change (deque + front-push check) that often cuts runtime by 30-50% with no correctness risk.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "SPFA is a queue-based optimization of Bellman-Ford that only re-relaxes edges from nodes whose distance was recently improved.",
        "It correctly handles negative edge weights and can detect negative cycles by tracking per-node enqueue counts.",
        "Average-case performance is O(kE) with k ≈ 2, making it much faster than Bellman-Ford's O(VE) in practice.",
        "The worst case remains O(VE) — adversarial inputs can degrade SPFA to Bellman-Ford performance.",
        "SLF and LLL are simple deque-based optimizations that improve average performance with minimal code changes.",
        "For graphs without negative edges, Dijkstra is the better choice; SPFA shines specifically when negative weights are present and the graph behaves well in practice.",
      ],
    },
  ],
}

export default function SpfaVideo() {
  return <AlgoVideo config={config} />
}
