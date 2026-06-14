import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Kosaraju's SCC",
  subtitle: "Strongly connected components using two DFS passes.",
  category: "graph",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What Problem Does Kosaraju's Algorithm Solve?",
      bullets: [
        "Given a directed graph G = (V, E), partition its vertices into Strongly Connected Components (SCCs).",
        "An SCC is a maximal set of vertices where every vertex can reach every other vertex within the set.",
        "SCCs reveal the 'irreducible cores' of a directed graph — cycles and mutual reachability clusters.",
        "Applications include compiler optimization (finding loops), web crawling (page rank clusters), and deadlock detection.",
        "The condensation DAG formed by contracting each SCC is always a DAG and reveals the high-level flow of the graph.",
      ],
    },

    intuition: {
      heading: "Core Intuition Behind Two DFS Passes",
      bullets: [
        "First pass on G: vertices that finish last in DFS are 'sources' of SCCs in the condensation DAG.",
        "Reversing all edges (Gᵀ) keeps SCCs intact but flips the direction between them.",
        "Second pass on Gᵀ in reverse finish order: each DFS tree explores exactly one SCC without crossing into another.",
        "The key insight: if u can reach v in G, then v can reach u in Gᵀ — so SCCs are preserved under transposition.",
        "Real-world analogy: imagine a city's one-way road network. SCCs are neighborhoods where you can always find a round trip. Reversing roads keeps neighborhoods intact but changes which neighborhood feeds which.",
      ],
      analogy:
        "Like finding social cliques where everyone knows everyone else — reversing 'follows' relationships keeps the cliques but flips the influence flow between them.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          title: "Input Graph",
          description:
            "Start with directed graph G. Example: vertices {0..7}, edges forming cycles 0→1→2→0, 3↔4, 5→6→7→5, with bridges 1→3 and 4→5.",
        },
        {
          step: 2,
          title: "Initialize DFS structures",
          description: "Create a visited array of size V (all False), and an empty stack for recording finish times.",
        },
        {
          step: 3,
          title: "First DFS — original graph",
          description:
            "Run DFS from every unvisited vertex. When a vertex's DFS fully completes (all descendants explored), push it onto the stack.",
        },
        {
          step: 4,
          title: "Example finish order",
          description:
            "Starting DFS from vertex 0: finish order might be [2, 0, 7, 5, 6, 4, 3, 1]. Stack top = 1 (finished last = SCC source).",
        },
        {
          step: 5,
          title: "Build transposed graph Gᵀ",
          description:
            "Create adjacency list for Gᵀ by reversing every edge. Edge (u→v) in G becomes (v→u) in Gᵀ. Time: O(V + E).",
        },
        {
          step: 6,
          title: "Reset visited array",
          description: "Set all visited entries back to False. The stack still holds the finish order from pass 1.",
        },
        {
          step: 7,
          title: "Second DFS — transposed graph",
          description:
            "Pop vertices from the stack one by one. If a popped vertex is unvisited, run DFS on Gᵀ from it.",
        },
        {
          step: 8,
          title: "Pop vertex 1 (top of stack)",
          description: "DFS on Gᵀ from 1 visits {1, 0, 2} — these form SCC-1. Mark all three visited.",
        },
        {
          step: 9,
          title: "Pop next unvisited — vertex 3",
          description: "DFS on Gᵀ from 3 visits {3, 4} — SCC-2. Edges 3↔4 are preserved under transposition.",
        },
        {
          step: 10,
          title: "Pop next unvisited — vertex 6",
          description: "DFS on Gᵀ from 6 visits {6, 5, 7} — SCC-3. The reversed cycle 5←6←7←5 is still a cycle.",
        },
        {
          step: 11,
          title: "All SCCs identified",
          description:
            "Stack is empty (or all remaining pops are already visited). Result: SCC-1={0,1,2}, SCC-2={3,4}, SCC-3={5,6,7}.",
        },
        {
          step: 12,
          title: "Condensation DAG",
          description:
            "Contract each SCC to a single node. Remaining edges form a DAG: SCC-1 → SCC-2 → SCC-3. No cycles remain.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from collections import defaultdict

class Graph:
    def __init__(self, n):
        self.n = n
        self.adj = defaultdict(list)
        self.radj = defaultdict(list)   # transposed graph

    def add_edge(self, u, v):
        self.adj[u].append(v)
        self.radj[v].append(u)          # reverse edge for Gᵀ

    def _dfs1(self, v, visited, stack):
        visited[v] = True
        for nb in self.adj[v]:
            if not visited[nb]:
                self._dfs1(nb, visited, stack)
        stack.append(v)                 # push on finish

    def _dfs2(self, v, visited, component):
        visited[v] = True
        component.append(v)
        for nb in self.radj[v]:
            if not visited[nb]:
                self._dfs2(nb, visited, component)

    def kosaraju(self):
        visited = [False] * self.n
        stack = []

        # Pass 1: fill finish-order stack
        for v in range(self.n):
            if not visited[v]:
                self._dfs1(v, visited, stack)

        # Pass 2: DFS on transposed graph
        visited = [False] * self.n
        sccs = []
        while stack:
            v = stack.pop()
            if not visited[v]:
                component = []
                self._dfs2(v, visited, component)
                sccs.append(component)
        return sccs

# Example usage
g = Graph(8)
for u, v in [(0,1),(1,2),(2,0),(1,3),(3,4),(4,3),(4,5),(5,6),(6,7),(7,5)]:
    g.add_edge(u, v)
print(g.kosaraju())
# → [[0,2,1], [3,4], [5,7,6]]  (order may vary)`,
      annotations: [
        {
          lines: [7, 8],
          note: "Store both original and reversed adjacency lists simultaneously during construction — O(1) per edge.",
        },
        {
          lines: [11, 14],
          note: "First DFS: standard recursive DFS; the append-after-recursion guarantees post-order (finish time) ordering.",
        },
        {
          lines: [16, 21],
          note: "Second DFS runs on self.radj (Gᵀ). Each call collects exactly one SCC into 'component'.",
        },
        {
          lines: [24, 28],
          note: "Pass 1 iterates all vertices to handle disconnected graphs. The stack accumulates global finish order.",
        },
        {
          lines: [31, 37],
          note: "Pass 2 pops from the stack; skipping already-visited vertices is what prevents merging separate SCCs.",
        },
        {
          lines: [40, 44],
          note: "Driver code: 10 edges, 8 vertices. The three printed lists are the three SCCs.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(V + E)", note: "Always two full DFS passes" },
        { case: "Average", complexity: "O(V + E)", note: "Linear regardless of SCC structure" },
        { case: "Worst", complexity: "O(V + E)", note: "Dense graph — E can be V²" },
      ],
      spaceRows: [
        { label: "Adjacency lists (G + Gᵀ)", complexity: "O(V + E)" },
        { label: "Visited array", complexity: "O(V)" },
        { label: "DFS call stack", complexity: "O(V)" },
        { label: "Finish-order stack", complexity: "O(V)" },
      ],
      insights: [
        "Kosaraju's is asymptotically optimal — any SCC algorithm must read every edge at least once.",
        "Two separate DFS passes make the algorithm easy to reason about but require storing the transpose graph.",
        "Tarjan's SCC achieves the same O(V + E) in a single pass using a low-link array, trading simplicity for memory.",
      ],
    },

    variations: {
      heading: "Variations & Related Algorithms",
      variations: [
        {
          name: "Tarjan's SCC",
          description:
            "Single-pass DFS using a stack and low-link values. Same O(V + E) complexity but avoids building Gᵀ.",
        },
        {
          name: "Path-Based SCC (Gabow's)",
          description: "Uses two stacks during a single DFS. More cache-friendly than Tarjan's in practice.",
        },
        {
          name: "Iterative Kosaraju",
          description:
            "Replace recursive DFS with an explicit stack to avoid Python/Java recursion depth limits on large graphs.",
        },
        {
          name: "Online SCC (streaming graphs)",
          description:
            "Maintain SCCs incrementally as edges are added. More complex but avoids recomputing from scratch.",
        },
        {
          name: "Parallel SCC (BFS-based)",
          description:
            "Forward-backward BFS approach enables GPU/multi-core parallelism for massive graphs (billions of edges).",
        },
      ],
      tips: [
        "For Python, convert recursion to iteration to handle graphs with V > 1000 without hitting the recursion limit.",
        "If you only need the count of SCCs (not members), Kosaraju's overhead is minimal — just count DFS trees in pass 2.",
        "Use Kosaraju's condensation DAG as a preprocessing step before topological sort problems on 'nearly-DAG' inputs.",
        "When edges are given as an edge list, building both adj and radj in one pass is more cache-efficient than two passes.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Kosaraju's algorithm finds all SCCs in O(V + E) time using exactly two depth-first searches.",
        "The first DFS on G records finish order; the second DFS on Gᵀ in that order isolates each SCC.",
        "Reversing edges preserves SCC membership but inverts the DAG of inter-SCC edges — the core mathematical insight.",
        "The algorithm is correct because a vertex that finishes last in G must be a 'source' SCC in the condensation DAG.",
        "Kosaraju's is conceptually the simplest SCC algorithm; Tarjan's is preferred when memory or a single pass matters.",
        "SCCs and their condensation DAG are fundamental building blocks for reachability, 2-SAT, and circuit analysis.",
      ],
    },
  },
}

export default function KosarajuSccVideo() {
  return <AlgoVideo config={config} />
}
