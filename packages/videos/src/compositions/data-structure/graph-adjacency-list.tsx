import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Graph (Adjacency List)",
  subtitle: "Graph using array of neighbor lists, space-efficient for sparse graphs.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does an Adjacency List Solve?",
      bullets: [
        "A graph G = (V, E) models pairwise relationships between V vertices and E edges.",
        "We need a data structure that lets us efficiently ask: 'Who are the neighbors of vertex v?'",
        "An adjacency matrix answers this in O(1) but wastes O(V²) space for sparse graphs.",
        "An adjacency list stores only existing edges, using O(V + E) space — ideal when E << V².",
        "Common in real-world networks: social graphs, road maps, dependency graphs, web links.",
      ],
    },

    intuition: {
      heading: "The Core Idea",
      bullets: [
        "Allocate an array of size V; each slot holds a dynamic list (or linked list) of neighbor IDs.",
        "Adding an edge (u, v) appends v to adj[u] (and u to adj[v] for undirected graphs).",
        "Traversing all neighbors of v is proportional to its degree, not the total vertex count.",
        "Space scales with the actual number of edges, making it memory-efficient for sparse graphs.",
        "Most graph algorithms (BFS, DFS, Dijkstra, Topological Sort) are naturally expressed over adjacency lists.",
      ],
      analogy:
        "Think of a city phone book where each resident's page lists only the people they know personally. You don't store a full grid of every possible pair — you only record real connections.",
    },

    walkthrough: {
      heading: "Step-by-Step: Build and Traverse",
      steps: [
        {
          step: 1,
          description: "Initialize adj[] as an array of empty lists for V = 5 vertices (0–4).",
        },
        {
          step: 2,
          description: "Add edge (0,1): append 1 to adj[0] and 0 to adj[1]. adj[0]=[1], adj[1]=[0].",
        },
        {
          step: 3,
          description: "Add edge (0,2): adj[0]=[1,2], adj[2]=[0].",
        },
        {
          step: 4,
          description: "Add edge (1,3): adj[1]=[0,3], adj[3]=[1].",
        },
        {
          step: 5,
          description: "Add edge (2,3): adj[2]=[0,3], adj[3]=[1,2].",
        },
        {
          step: 6,
          description: "Add edge (2,4) and (3,4): adj[2]=[0,3,4], adj[3]=[1,2,4], adj[4]=[2,3].",
        },
        {
          step: 7,
          description: "BFS from node 0: enqueue 0, mark visited. Dequeue 0, enqueue neighbors 1 and 2.",
        },
        {
          step: 8,
          description: "Dequeue 1, enqueue unvisited neighbor 3. Dequeue 2, enqueue unvisited neighbor 4.",
        },
        {
          step: 9,
          description: "Dequeue 3 — neighbors 1,2 already visited; 4 already enqueued. Dequeue 4 — done.",
        },
        {
          step: 10,
          description: "BFS order: [0, 1, 2, 3, 4]. Total work = O(V + E) = O(5 + 6) = O(11).",
        },
        {
          step: 11,
          description: "Dynamic edge insertion: adj[1].append(4) and adj[4].append(1) — O(1) amortized.",
        },
        {
          step: 12,
          description: "Edge removal (u,v): scan adj[u] to find and remove v — O(degree(u)).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from collections import defaultdict, deque

class Graph:
    def __init__(self):
        # Each key maps to a list of adjacent vertices
        self.adj = defaultdict(list)

    def add_edge(self, u: int, v: int, directed: bool = False) -> None:
        self.adj[u].append(v)
        if not directed:
            self.adj[v].append(u)

    def remove_edge(self, u: int, v: int, directed: bool = False) -> None:
        self.adj[u] = [x for x in self.adj[u] if x != v]
        if not directed:
            self.adj[v] = [x for x in self.adj[v] if x != u]

    def neighbors(self, u: int) -> list:
        return self.adj[u]

    def bfs(self, start: int) -> list:
        visited = set()
        order = []
        queue = deque([start])
        visited.add(start)
        while queue:
            node = queue.popleft()
            order.append(node)
            for nb in self.adj[node]:
                if nb not in visited:
                    visited.add(nb)
                    queue.append(nb)
        return order

    def dfs(self, start: int) -> list:
        visited = set()
        order = []
        def _dfs(u):
            visited.add(u)
            order.append(u)
            for nb in self.adj[u]:
                if nb not in visited:
                    _dfs(nb)
        _dfs(start)
        return order`,
      annotations: [
        {
          lines: "5-6",
          note: "defaultdict(list) auto-creates an empty list for any new vertex key — no explicit initialization needed.",
        },
        {
          lines: "8-11",
          note: "add_edge appends in O(1) amortized. For undirected graphs, both directions are stored.",
        },
        {
          lines: "13-16",
          note: "remove_edge rebuilds the neighbor list with a list comprehension — O(degree) time.",
        },
        {
          lines: "21-29",
          note: "BFS uses a deque for O(1) popleft. The visited set prevents revisiting nodes. Total time O(V+E).",
        },
        {
          lines: "31-38",
          note: "DFS uses recursion. Python's default recursion limit (~1000) may require sys.setrecursionlimit for large graphs.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { operation: "Add Vertex", best: "O(1)", avg: "O(1)", worst: "O(1)" },
        { operation: "Add Edge", best: "O(1)", avg: "O(1)", worst: "O(1)" },
        { operation: "Remove Edge", best: "O(1)", avg: "O(degree)", worst: "O(degree)" },
        { operation: "Find Neighbor", best: "O(1)", avg: "O(degree)", worst: "O(degree)" },
        { operation: "BFS / DFS", best: "O(V+E)", avg: "O(V+E)", worst: "O(V+E)" },
      ],
      spaceRows: [
        { label: "Adjacency storage", complexity: "O(V + E)" },
        { label: "BFS queue", complexity: "O(V)" },
        { label: "DFS call stack", complexity: "O(V)" },
      ],
      insights: [
        "For sparse graphs (E ≈ V), adjacency lists use O(V) space vs O(V²) for a matrix.",
        "Checking whether edge (u,v) exists is O(degree(u)), not O(1) — use a matrix if this is frequent.",
        "Weighted graphs simply store (neighbor, weight) tuples instead of plain neighbor IDs.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Directed Graph",
          description: "Only append v to adj[u] (not the reverse). Models one-way relationships like web links or task dependencies.",
        },
        {
          name: "Weighted Adjacency List",
          description: "Store (neighbor, weight) pairs. Used in Dijkstra's and Bellman-Ford algorithms.",
        },
        {
          name: "Adjacency List with Sets",
          description: "Replace lists with sets to achieve O(1) edge lookup and O(1) removal at the cost of higher constant factors.",
        },
        {
          name: "CSR (Compressed Sparse Row)",
          description: "Flatten all neighbor lists into a single array with an offset array. Cache-friendly and memory-optimal for static graphs.",
        },
        {
          name: "Multigraph / Hypergraph",
          description: "Allow duplicate edges or edges connecting more than two vertices by storing edge objects instead of plain IDs.",
        },
      ],
      tips: [
        "Use adjacency lists by default; switch to a matrix only when E is close to V² or O(1) edge lookup is critical.",
        "For Python, collections.defaultdict(list) is the most ergonomic representation.",
        "When the graph is static (no insertions after construction), convert to CSR for better cache performance in hot loops.",
        "Always track a visited set separately from the graph structure to avoid infinite loops in cyclic graphs.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "An adjacency list represents a graph as an array where adj[v] holds all neighbors of v.",
        "Space complexity is O(V + E), making it optimal for sparse graphs common in real applications.",
        "Adding an edge is O(1); removing or finding a specific edge is O(degree).",
        "BFS and DFS both run in O(V + E) time when implemented over an adjacency list.",
        "For weighted or directed graphs, minimal changes to the structure are required.",
        "Choose adjacency lists over matrices whenever E << V² to save memory and traversal time.",
      ],
    },
  },
};

export default function GraphAdjacencyListVideo() {
  return <AlgoVideo config={config} />;
}
