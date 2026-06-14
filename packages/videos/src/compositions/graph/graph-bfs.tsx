import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Breadth-First Search",
  subtitle: "Explores all neighbors at current depth before moving to next level using a queue.",
  category: "graph",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Breadth-First Search?",
      bullets: [
        "BFS is a graph traversal algorithm that visits all nodes reachable from a source node.",
        "It explores nodes level by level — first all direct neighbors, then their neighbors, and so on.",
        "BFS uses a queue (FIFO) data structure to track which node to visit next.",
        "It guarantees the shortest path (in terms of number of edges) in an unweighted graph.",
        "BFS can be applied to both directed and undirected graphs, and also to trees.",
      ],
    },

    intuition: {
      heading: "The Core Intuition",
      bullets: [
        "Imagine dropping a stone into a pond — the ripples spread outward in concentric rings. BFS works exactly like that.",
        "Start at the source node and mark it visited. Add all its unvisited neighbors to the queue.",
        "Dequeue the front node, mark it visited, and enqueue all its unvisited neighbors.",
        "Repeat until the queue is empty — every reachable node has been visited exactly once.",
        "Because we process nodes in the order they were discovered, nodes closer to the source are always processed first.",
      ],
      analogy:
        "Real-world analogy: Imagine spreading news in a social network. You tell your friends (level 1), they tell their friends (level 2), and so on. BFS models exactly this wave-like propagation.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize: Mark all nodes as unvisited. Create an empty queue.",
        },
        {
          step: 2,
          description: "Enqueue the source node (node 0) and mark it as visited.",
        },
        {
          step: 3,
          description: "Dequeue node 0. Inspect its neighbors: nodes 1 and 2. Neither is visited yet.",
        },
        {
          step: 4,
          description: "Enqueue nodes 1 and 2, mark both as visited. Queue is now [1, 2].",
        },
        {
          step: 5,
          description:
            "Dequeue node 1. Inspect its neighbors: nodes 3 and 4. Enqueue both, mark visited. Queue is now [2, 3, 4].",
        },
        {
          step: 6,
          description:
            "Dequeue node 2. Inspect its neighbors: nodes 5 and 6. Enqueue both, mark visited. Queue is now [3, 4, 5, 6].",
        },
        {
          step: 7,
          description: "Dequeue node 3. It has no unvisited neighbors. Queue is now [4, 5, 6].",
        },
        {
          step: 8,
          description: "Dequeue node 4. It has no unvisited neighbors. Queue is now [5, 6].",
        },
        {
          step: 9,
          description: "Dequeue node 5. It has no unvisited neighbors. Queue is now [6].",
        },
        {
          step: 10,
          description: "Dequeue node 6. It has no unvisited neighbors. Queue is now empty.",
        },
        {
          step: 11,
          description: "Queue is empty — BFS is complete. Traversal order: 0 → 1 → 2 → 3 → 4 → 5 → 6.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from collections import deque

def bfs(graph: dict[int, list[int]], source: int) -> list[int]:
    """
    Breadth-First Search traversal from a source node.
    graph: adjacency list {node: [neighbors]}
    source: starting node
    Returns: list of nodes in BFS visit order
    """
    visited: set[int] = set()
    queue: deque[int] = deque()
    order: list[int] = []

    # Seed the queue with the source node
    visited.add(source)
    queue.append(source)

    while queue:
        node = queue.popleft()          # O(1) dequeue from front
        order.append(node)

        for neighbor in graph[node]:    # Explore all neighbors
            if neighbor not in visited:
                visited.add(neighbor)   # Mark before enqueue to avoid duplicates
                queue.append(neighbor)

    return order


# Example usage
if __name__ == "__main__":
    graph = {
        0: [1, 2],
        1: [0, 3, 4],
        2: [0, 5, 6],
        3: [1],
        4: [1],
        5: [2],
        6: [2],
    }
    result = bfs(graph, source=0)
    print("BFS order:", result)
    # Output: BFS order: [0, 1, 2, 3, 4, 5, 6]
`,
      annotations: [
        {
          lines: "1",
          note: "collections.deque provides O(1) popleft(), unlike a list which is O(n) for pop(0).",
        },
        {
          lines: "11-14",
          note: "Seed the queue with the source node and immediately mark it visited to prevent re-enqueuing.",
        },
        {
          lines: "16-17",
          note: "The main loop runs once per node. popleft() removes from the front (FIFO order).",
        },
        {
          lines: "19-22",
          note: "Mark neighbors as visited BEFORE enqueuing — not after dequeuing — to prevent the same node being added multiple times.",
        },
        {
          lines: "25",
          note: "Returns the traversal order, but BFS can be adapted to return distances, parents, or paths.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(V + E)", note: "Single connected component" },
        { case: "Average", complexity: "O(V + E)", note: "Visits every vertex and edge once" },
        { case: "Worst", complexity: "O(V + E)", note: "Dense graph, all nodes reachable" },
      ],
      spaceRows: [
        { label: "Queue", complexity: "O(V)", note: "At most all vertices in queue at once" },
        { label: "Visited set", complexity: "O(V)", note: "One entry per vertex" },
        { label: "Total", complexity: "O(V)", note: "Dominates over edge storage" },
      ],
      insights: [
        "V = number of vertices, E = number of edges. BFS touches each vertex and edge exactly once.",
        "In the worst case (a complete graph), E = O(V²), making the total complexity O(V²).",
        "BFS is optimal for finding shortest paths in unweighted graphs — it's guaranteed to find the minimum number of edges.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "0-1 BFS",
          description:
            "Uses a deque instead of a plain queue. Edges with weight 0 push to the front; edges with weight 1 push to the back. Finds shortest paths in 0-1 weighted graphs in O(V + E).",
        },
        {
          name: "Multi-source BFS",
          description:
            "Seed the queue with multiple source nodes simultaneously. Useful for problems like 'distance to nearest X' where X can be any of several nodes.",
        },
        {
          name: "Bidirectional BFS",
          description:
            "Run BFS simultaneously from both the source and target. Meets in the middle, reducing the search space from O(b^d) to O(b^(d/2)) where b is branching factor and d is depth.",
        },
        {
          name: "BFS on implicit graphs",
          description:
            "Many puzzles (word ladder, sliding puzzle) have implicit graphs. BFS works without building the full graph — generate neighbors on the fly.",
        },
        {
          name: "Level-order tree traversal",
          description:
            "BFS on a binary tree yields level-order traversal. Useful for problems requiring processing nodes level by level.",
        },
      ],
      tips: [
        "Always mark nodes as visited when enqueuing, not when dequeuing — this prevents O(E) duplicate entries in the queue.",
        "Use collections.deque in Python for O(1) popleft(). A plain list's pop(0) is O(n) and will TLE on large inputs.",
        "For shortest-path problems, store a distance array or parent map alongside the visited set to reconstruct the path.",
        "When working with grids (2D BFS), encode (row, col) as tuples in the visited set instead of a 2D boolean array.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "BFS explores a graph level by level using a queue, guaranteeing the shortest path in unweighted graphs.",
        "Time complexity is O(V + E) — each vertex and edge is processed exactly once.",
        "Space complexity is O(V) for the queue and visited set.",
        "Always mark nodes visited upon enqueue (not dequeue) to avoid redundant work and infinite loops.",
        "BFS is the foundation for many classic algorithms: Dijkstra's (weighted BFS), topological sort, connected components, and bipartite checking.",
        "For competitive programming, prefer collections.deque over list for the queue to avoid O(n) popleft() overhead.",
      ],
    },
  },
}

export default function GraphBfsVideo() {
  return <AlgoVideo config={config} />
}
