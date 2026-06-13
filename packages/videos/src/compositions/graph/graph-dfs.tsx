import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Depth-First Search",
  subtitle: "Explores as far as possible along each branch before backtracking.",
  category: "graph",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Depth-First Search?",
      bullets: [
        "DFS is a graph traversal algorithm that explores as deep as possible along each branch before backtracking.",
        "It starts at a chosen source node and visits all reachable nodes in the graph.",
        "DFS uses a stack data structure — either explicitly or via the call stack through recursion.",
        "It is used to detect cycles, find connected components, and solve maze/path problems.",
        "DFS works on both directed and undirected graphs, and on trees as a special case.",
      ],
    },

    intuition: {
      heading: "How to Think About DFS",
      bullets: [
        "Imagine exploring a maze: you always walk forward until you hit a dead end, then retrace your steps.",
        "At each junction, you pick one path and commit to it fully before trying another.",
        "A 'visited' set ensures you never re-enter a room you've already been in.",
        "The recursion stack mirrors the physical path you've walked so far.",
        "When you backtrack, the stack unwinds and you try the next unexplored direction.",
      ],
      analogy:
        "Think of DFS like reading a book by following every footnote to its conclusion before returning to the main text — you go as deep as possible into each reference chain before coming back.",
    },

    walkthrough: {
      heading: "Step-by-Step DFS on a Sample Graph",
      steps: [
        {
          step: 1,
          description: "Start at node 0. Mark it visited. Push neighbors [1, 2] onto the stack.",
        },
        {
          step: 2,
          description: "Pop node 1 from the stack. Mark it visited. Push its unvisited neighbors [3, 4].",
        },
        {
          step: 3,
          description: "Pop node 3 from the stack. Mark it visited. Node 3 has no unvisited neighbors — dead end.",
        },
        {
          step: 4,
          description: "Backtrack: pop node 4 from the stack. Mark it visited. Node 4 has no unvisited neighbors.",
        },
        {
          step: 5,
          description: "Backtrack to node 0's remaining neighbor. Pop node 2 from the stack. Mark it visited.",
        },
        {
          step: 6,
          description: "Push node 2's unvisited neighbors [5, 6] onto the stack.",
        },
        {
          step: 7,
          description: "Pop node 5. Mark it visited. No unvisited neighbors — dead end.",
        },
        {
          step: 8,
          description: "Pop node 6. Mark it visited. No unvisited neighbors — dead end.",
        },
        {
          step: 9,
          description: "Stack is empty. All reachable nodes have been visited.",
        },
        {
          step: 10,
          description: "Final traversal order: 0 → 1 → 3 → 4 → 2 → 5 → 6. DFS complete.",
        },
      ],
    },

    code: {
      heading: "DFS Implementation in Python",
      language: "python",
      snippet: `from collections import defaultdict

def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    print(node, end=" ")
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)
    return visited

def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    order = []
    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        order.append(node)
        for neighbor in reversed(graph[node]):
            if neighbor not in visited:
                stack.append(neighbor)
    return order

# Example usage
graph = defaultdict(list)
edges = [(0,1),(0,2),(1,3),(1,4),(2,5),(2,6)]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)

print(dfs_iterative(graph, 0))  # [0, 1, 3, 4, 2, 5, 6]`,
      annotations: [
        {
          lines: "3-4",
          note: "Initialize the visited set on the first call; reuse it across recursive calls to track global state.",
        },
        {
          lines: "5-6",
          note: "Mark the node visited immediately upon entry to prevent re-processing in graphs with cycles.",
        },
        {
          lines: "7-9",
          note: "Recurse into each unvisited neighbor — this is the 'go deep' step that defines DFS.",
        },
        {
          lines: "13-14",
          note: "The iterative version uses an explicit stack. Pushing in reversed order preserves left-to-right traversal order.",
        },
        {
          lines: "15-22",
          note: "The while loop drives traversal; popping from the top of the stack mimics the LIFO behavior of the call stack in recursion.",
        },
        {
          lines: "25-29",
          note: "Build the adjacency list. Adding both directions makes the graph undirected.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(V + E)", note: "Single connected component, all nodes reachable" },
        { case: "Average", complexity: "O(V + E)", note: "V = vertices, E = edges in the graph" },
        { case: "Worst", complexity: "O(V + E)", note: "Sparse or dense graph — always visits every edge once" },
      ],
      spaceRows: [
        { type: "Visited Set", complexity: "O(V)", note: "Stores each visited node exactly once" },
        { type: "Call Stack / Explicit Stack", complexity: "O(V)", note: "Depth of recursion bounded by number of vertices" },
        { type: "Adjacency List", complexity: "O(V + E)", note: "Input representation, not algorithm overhead" },
      ],
      insights: [
        "DFS and BFS share the same O(V + E) time complexity — the difference is traversal order, not speed.",
        "Recursive DFS can cause a stack overflow on very deep graphs; iterative DFS avoids this.",
        "In a tree (no cycles), the visited set is unnecessary, reducing space overhead.",
      ],
    },

    variations: {
      heading: "DFS Variations & Applications",
      variations: [
        {
          name: "Topological Sort",
          description:
            "Run DFS on a DAG and push nodes to a stack after all their neighbors are visited. The stack gives a valid topological order.",
        },
        {
          name: "Cycle Detection",
          description:
            "Track nodes currently on the recursion stack. If a neighbor is already on the stack, a cycle exists.",
        },
        {
          name: "Connected Components",
          description:
            "Run DFS from every unvisited node. Each DFS call discovers one connected component in an undirected graph.",
        },
        {
          name: "Strongly Connected Components (Kosaraju / Tarjan)",
          description:
            "Use two DFS passes (Kosaraju) or a single DFS with low-link values (Tarjan) to find SCCs in directed graphs.",
        },
        {
          name: "Maze / Path Finding",
          description:
            "DFS finds a path between two nodes but not necessarily the shortest one. Use BFS for shortest paths in unweighted graphs.",
        },
      ],
      tips: [
        "Use iterative DFS for production code on large graphs to avoid Python's default recursion limit (~1000).",
        "When order matters (e.g., topological sort), pay attention to whether you record a node on entry or on exit from the recursion.",
        "For weighted graphs where you need the shortest path, prefer Dijkstra's algorithm over DFS.",
        "DFS naturally produces a DFS tree — tree edges, back edges, forward edges, and cross edges reveal graph structure.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "DFS explores as deep as possible along each branch before backtracking, using a stack or recursion.",
        "Time complexity is O(V + E) — every vertex and edge is visited exactly once.",
        "Space complexity is O(V) for the visited set and the recursion/explicit stack.",
        "A visited set is essential for graphs with cycles to prevent infinite loops.",
        "DFS is the foundation for topological sort, cycle detection, SCC algorithms, and maze solving.",
        "Choose iterative DFS over recursive DFS when graph depth could exceed the system stack limit.",
      ],
    },
  },
};

export default function GraphDfsVideo() {
  return <AlgoVideo config={config} />;
}
