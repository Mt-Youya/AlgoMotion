import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Topological Sort",
  subtitle: "Linear ordering of DAG vertices respecting all directed edges.",
  category: "graph",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Definition",
      bullets: [
        "Given a Directed Acyclic Graph (DAG) with V vertices and E edges, produce a linear ordering of all vertices.",
        "For every directed edge u → v in the graph, vertex u must appear before vertex v in the ordering.",
        "A valid topological order only exists if the graph has no cycles — it must be a DAG.",
        "Multiple valid orderings may exist for the same graph; any correct one is acceptable.",
        "Applications include task scheduling, build dependency resolution, course prerequisite ordering, and package management.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of nodes as tasks and edges as 'must-come-before' constraints — we want a schedule that respects every constraint.",
        "Kahn's Algorithm (BFS): repeatedly pick a node with no remaining prerequisites, add it to the result, and remove its outgoing edges.",
        "DFS-based approach: finish a node only after all nodes it depends on are finished, then prepend it to the result (reverse post-order).",
        "In-degree of a node counts how many nodes must precede it; a node is 'ready' when its in-degree drops to zero.",
        "If after processing all nodes some remain unprocessed, the graph contains a cycle and no topological order exists.",
      ],
      analogy:
        "Imagine getting dressed in the morning: you must put on socks before shoes, underwear before pants, and a shirt before a jacket. Topological sort finds a valid dressing sequence that respects all these 'before' constraints.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Build the example DAG with 6 nodes (0–5) and edges: 5→2, 5→0, 4→0, 4→1, 2→3, 3→1.",
        },
        {
          step: 2,
          description:
            "Compute the in-degree of every node by counting how many edges point into it. Node 4: 0, Node 5: 0, Node 0: 2, Node 1: 2, Node 2: 1, Node 3: 1.",
        },
        {
          step: 3,
          description:
            "Initialize the queue with all nodes whose in-degree is 0. Here nodes 4 and 5 have no prerequisites, so queue = [4, 5].",
        },
        {
          step: 4,
          description:
            "Dequeue node 4. Append 4 to the result. Decrement in-degree of its neighbors: in-degree[0] becomes 1, in-degree[1] becomes 1. Result: [4].",
        },
        {
          step: 5,
          description:
            "Dequeue node 5. Append 5 to the result. Decrement in-degree[2] → 0 (enqueue 2), in-degree[0] → 0 (enqueue 0). Result: [4, 5].",
        },
        {
          step: 6,
          description: "Dequeue node 2. Append 2 to result. Decrement in-degree[3] → 0 (enqueue 3). Result: [4, 5, 2].",
        },
        {
          step: 7,
          description:
            "Dequeue node 0. Append 0 to result. Node 0 has no outgoing edges in this graph. Result: [4, 5, 2, 0].",
        },
        {
          step: 8,
          description:
            "Dequeue node 3. Append 3 to result. Decrement in-degree[1] → 0 (enqueue 1). Result: [4, 5, 2, 0, 3].",
        },
        {
          step: 9,
          description:
            "Dequeue node 1. Append 1 to result. No outgoing edges. Result: [4, 5, 2, 0, 3, 1]. Queue is empty.",
        },
        {
          step: 10,
          description:
            "All 6 nodes processed. No cycle detected. Final topological order: 4 → 5 → 2 → 0 → 3 → 1. Every edge u→v has u before v. ✓",
        },
      ],
    },

    code: {
      heading: "Implementation (Kahn's Algorithm)",
      snippet: `from collections import deque

def topological_sort(num_vertices: int, edges: list[tuple[int, int]]) -> list[int]:
    # Build adjacency list and compute in-degrees
    adj = [[] for _ in range(num_vertices)]
    in_degree = [0] * num_vertices

    for u, v in edges:
        adj[u].append(v)
        in_degree[v] += 1

    # Enqueue all nodes with in-degree 0
    queue = deque()
    for node in range(num_vertices):
        if in_degree[node] == 0:
            queue.append(node)

    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If result doesn't contain all vertices, graph has a cycle
    if len(result) != num_vertices:
        raise ValueError("Graph contains a cycle — topological sort impossible")

    return result


# Example usage
edges = [(5, 2), (5, 0), (4, 0), (4, 1), (2, 3), (3, 1)]
order = topological_sort(6, edges)
print(order)  # [4, 5, 2, 0, 3, 1]  (one valid ordering)
`,
      annotations: [
        {
          lines: "3-7",
          note: "Build the adjacency list and count how many edges point into each node (in-degree). Both structures are built in a single O(E) pass.",
        },
        {
          lines: "9-12",
          note: "Seed the queue with every node that has no prerequisites (in-degree = 0). These are the 'starting points' of the topological order.",
        },
        {
          lines: "14-22",
          note: "BFS loop: dequeue a ready node, add it to the result, then reduce the in-degree of each neighbor. When a neighbor's in-degree hits 0 it is enqueued.",
        },
        {
          lines: "24-25",
          note: "Cycle detection: if the result list is shorter than the total vertex count, some nodes were never enqueued because their in-degree never reached 0 — a cycle exists.",
        },
        {
          lines: "28-31",
          note: "Driver code demonstrating the function on the 6-node example DAG used throughout the walkthrough.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(V + E)", note: "Single BFS pass over all vertices and edges" },
        { case: "Average", complexity: "O(V + E)", note: "Always touches every vertex and edge exactly once" },
        { case: "Worst", complexity: "O(V + E)", note: "Dense DAG; same asymptotic cost regardless of topology" },
      ],
      spaceRows: [
        { component: "Adjacency list", complexity: "O(V + E)", note: "Stores all edges" },
        { component: "In-degree array", complexity: "O(V)", note: "One counter per vertex" },
        { component: "BFS queue", complexity: "O(V)", note: "At most all vertices enqueued simultaneously" },
        { component: "Result list", complexity: "O(V)", note: "Holds the final ordering" },
      ],
      insights: [
        "Topological sort is essentially a BFS or DFS traversal with bookkeeping — it cannot be faster than O(V + E) since every edge must be examined at least once.",
        "The DFS-based variant uses the call stack implicitly (O(V) stack depth in the worst case) instead of an explicit queue, but has the same asymptotic complexity.",
        "For sparse graphs (E ≈ V) the algorithm is effectively linear in the number of vertices, making it highly practical for large dependency graphs.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "DFS Post-Order (Recursive)",
          description:
            "Perform a DFS and push each node onto a stack after all its descendants are visited. Reverse the stack for the topological order. Elegant but uses O(V) call-stack space.",
        },
        {
          name: "Lexicographically Smallest Order",
          description:
            "Replace the FIFO queue in Kahn's algorithm with a min-heap (priority queue). At each step the smallest available node is chosen, yielding the lexicographically smallest valid ordering.",
        },
        {
          name: "Cycle Detection Only",
          description:
            "Run Kahn's algorithm and check whether all V nodes were processed. If not, a cycle exists. This is a clean O(V + E) cycle detector for directed graphs.",
        },
        {
          name: "Longest Path in DAG",
          description:
            "Process nodes in topological order and propagate distances with dynamic programming. This gives the longest (critical) path in O(V + E), which is impossible in general graphs without exponential search.",
        },
        {
          name: "Parallel Task Scheduling",
          description:
            "Assign each node a 'level' equal to the length of the longest path from any source to that node. All nodes at the same level can be executed in parallel, minimizing total wall-clock time.",
        },
      ],
      tips: [
        "Always verify the input is a DAG before running topological sort; check the output length against V to catch cycles automatically.",
        "Kahn's algorithm is usually preferred in production because it naturally detects cycles and is iterative (no recursion-depth issues on large graphs).",
        "When the graph is provided as an edge list, building the adjacency list and in-degree array together in one pass avoids an extra O(E) scan.",
        "For incremental graphs (edges added over time), maintain the in-degree array and queue dynamically rather than recomputing from scratch each time.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Topological sort produces a linear ordering of a DAG's vertices such that every directed edge u → v has u before v.",
        "Kahn's BFS algorithm iteratively removes nodes with in-degree 0; DFS post-order is an equally valid recursive alternative.",
        "Both approaches run in O(V + E) time and O(V + E) space — optimal since every vertex and edge must be inspected.",
        "A topological order exists if and only if the graph is a DAG; Kahn's algorithm doubles as a cycle detector.",
        "The algorithm underpins real-world systems: build tools (Make, Gradle), package managers (npm, pip), course schedulers, and compiler instruction ordering.",
        "Extending to lexicographic order, longest-path computation, or parallel scheduling requires only minor modifications to the core BFS loop.",
      ],
    },
  },
}

export default function TopologicalSortVideo() {
  return <AlgoVideo config={config} />
}
