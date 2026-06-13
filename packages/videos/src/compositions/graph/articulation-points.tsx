import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Articulation Points",
  subtitle: "Vertices whose removal increases the number of connected components.",
  category: "graph",
  difficulty: "advanced",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Definition",
      bullets: [
        "Given an undirected connected graph G = (V, E), find all articulation points (cut vertices).",
        "An articulation point is a vertex whose removal (along with its incident edges) disconnects the graph.",
        "These vertices represent single points of failure in a network topology.",
        "A graph with no articulation points is called biconnected.",
        "Applications include network reliability analysis, circuit design, and social network analysis.",
      ],
    },
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Run a Depth-First Search (DFS) and build a DFS tree of the graph.",
        "A non-root vertex v is an AP if it has a child u such that no vertex in u's subtree can reach an ancestor of v via a back edge.",
        "Track disc[v] (discovery time) and low[v] (lowest discovery time reachable from v's subtree).",
        "If low[child] >= disc[v], removing v would cut off that subtree from the rest of the graph.",
        "Real-world analogy: Think of a city road network — an articulation point is like a bridge city where all routes between two regions must pass through it. Closing that city isolates entire regions.",
      ],
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          label: "Step 1 — Build the graph",
          description: "Start with graph: 0-1, 0-2, 1-2, 2-3, 3-4, 3-5. Vertices 0-5, edges forming a triangle (0,1,2) connected via vertex 2 to a star (3,4,5).",
        },
        {
          label: "Step 2 — Initialize DFS arrays",
          description: "Create disc[] = [-1,-1,-1,-1,-1,-1], low[] = [-1,-1,-1,-1,-1,-1], parent[] = [-1,-1,-1,-1,-1,-1], visited[] = [F,F,F,F,F,F].",
        },
        {
          label: "Step 3 — DFS from vertex 0",
          description: "Visit vertex 0: disc[0]=0, low[0]=0. Push 0 onto DFS stack. Timer = 1.",
        },
        {
          label: "Step 4 — Visit vertex 1",
          description: "From 0, visit neighbor 1: disc[1]=1, low[1]=1, parent[1]=0. Timer = 2.",
        },
        {
          label: "Step 5 — Visit vertex 2 from 1",
          description: "From 1, visit neighbor 2: disc[2]=2, low[2]=2, parent[2]=1. Timer = 3.",
        },
        {
          label: "Step 6 — Back edge 2→0",
          description: "From 2, neighbor 0 is already visited and is not parent. Back edge found: low[2] = min(low[2], disc[0]) = min(2, 0) = 0.",
        },
        {
          label: "Step 7 — Propagate low values upward",
          description: "Return to vertex 1: low[1] = min(low[1], low[2]) = min(1, 0) = 0. Return to vertex 0: low[0] = min(low[0], low[1]) = 0.",
        },
        {
          label: "Step 8 — Visit vertex 3 from 2",
          description: "From 2, visit unvisited neighbor 3: disc[3]=3, low[3]=3, parent[3]=2. Timer = 4. Check AP condition for vertex 2: low[3]=3 >= disc[2]=2 → vertex 2 IS an AP.",
        },
        {
          label: "Step 9 — Visit vertices 4 and 5",
          description: "From 3, visit 4: disc[4]=4, low[4]=4. Visit 5: disc[5]=5, low[5]=5. No back edges from 4 or 5.",
        },
        {
          label: "Step 10 — Propagate low back to 3",
          description: "low[3] = min(3, low[4], low[5]) = 3. Return to vertex 2: low[2] = min(0, low[3]) = 0. AP check for vertex 3: low[4]=4 >= disc[3]=3 → vertex 3 IS an AP.",
        },
        {
          label: "Step 11 — Root vertex check",
          description: "Vertex 0 is the DFS root. It has only one DFS child (vertex 1 via the tree edge 0→1). Root is AP only if it has >1 DFS children. Vertex 0 is NOT an AP.",
        },
        {
          label: "Step 12 — Final result",
          description: "Articulation points found: {2, 3}. Removing vertex 2 splits {0,1} from {3,4,5}. Removing vertex 3 splits {4} and {5} from the rest.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `def find_articulation_points(graph, n):
    disc = [-1] * n
    low = [-1] * n
    parent = [-1] * n
    visited = [False] * n
    ap = [False] * n
    timer = [0]

    def dfs(u):
        visited[u] = True
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        children = 0

        for v in graph[u]:
            if not visited[v]:
                children += 1
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])

                # Non-root AP condition
                if parent[u] == -1 and children > 1:
                    ap[u] = True
                if parent[u] != -1 and low[v] >= disc[u]:
                    ap[u] = True
            elif v != parent[u]:
                low[u] = min(low[u], disc[v])

    for i in range(n):
        if not visited[i]:
            dfs(i)

    return [v for v in range(n) if ap[v]]`,
      annotations: [
        {
          lines: "1-6",
          note: "Initialize disc[] (discovery time), low[] (lowest reachable), parent[], visited[], and ap[] arrays. timer is a list to allow mutation inside nested dfs().",
        },
        {
          lines: "8-10",
          note: "Mark vertex u as visited, set its discovery time and low value to the current timer, then increment the timer.",
        },
        {
          lines: "12-16",
          note: "For each unvisited neighbor v, recurse into it and update low[u] = min(low[u], low[v]) to propagate the lowest reachable time back up the DFS tree.",
        },
        {
          lines: "18-21",
          note: "Two AP conditions: (1) Root vertex with more than one DFS child. (2) Non-root vertex u where low[v] >= disc[u] — child v cannot reach above u via back edges.",
        },
        {
          lines: "22-23",
          note: "If v is already visited and is not u's parent, it's a back edge. Update low[u] with disc[v] since we can reach v's discovery time from u's subtree.",
        },
        {
          lines: "25-30",
          note: "Outer loop ensures all components are visited (handles disconnected graphs). Returns list of all articulation point indices.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best Case", value: "O(V + E)", note: "Single DFS traversal always visits all vertices and edges exactly once" },
        { label: "Average Case", value: "O(V + E)", note: "DFS-based; performance is independent of graph structure" },
        { label: "Worst Case", value: "O(V + E)", note: "Dense graph with V² edges still linear in the number of edges" },
      ],
      spaceRows: [
        { label: "disc[] / low[] / parent[]", value: "O(V)", note: "Three arrays of size V for DFS bookkeeping" },
        { label: "DFS Call Stack", value: "O(V)", note: "Recursion depth bounded by the longest DFS path" },
        { label: "Total Space", value: "O(V + E)", note: "Including the adjacency list representation of the graph" },
      ],
      insights: [
        "Tarjan's algorithm achieves optimal O(V + E) time — you cannot do better since you must examine every edge at least once.",
        "The iterative version using an explicit stack avoids Python's recursion limit for large graphs (default 1000 depth).",
        "For sparse graphs (E ≈ V), the algorithm is essentially O(V). For dense graphs (E ≈ V²), it is O(V²).",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Related Algorithms",
      variations: [
        {
          name: "Bridge Finding (Tarjan)",
          description: "Find edges (not vertices) whose removal disconnects the graph. Condition changes to low[v] > disc[u] (strict inequality) instead of >=.",
        },
        {
          name: "Biconnected Components",
          description: "Decompose the graph into maximal biconnected subgraphs (no articulation points). Use a stack to collect edges during DFS and output a component when an AP is found.",
        },
        {
          name: "Iterative DFS Version",
          description: "Replace recursion with an explicit stack to handle very large graphs without hitting Python's recursion depth limit. Requires careful simulation of the call stack state.",
        },
        {
          name: "Online / Dynamic Articulation Points",
          description: "Maintain articulation points as edges are inserted or deleted. Uses more advanced data structures like link-cut trees for O(log V) per update.",
        },
        {
          name: "Directed Graph — Strongly Connected Components",
          description: "Tarjan's SCC algorithm is a generalization of the AP concept to directed graphs, finding strongly connected components in O(V + E).",
        },
      ],
      tips: [
        "Always handle the DFS root separately — it is an AP only when it has more than one child in the DFS tree, not based on the low[] condition.",
        "Use an iterative DFS in production Python code to avoid RecursionError on graphs with thousands of vertices.",
        "When the graph may be disconnected, wrap the DFS in a loop over all vertices to ensure complete coverage.",
        "The low[] value update for back edges uses disc[v], not low[v] — this prevents incorrectly propagating through cross edges in undirected graphs.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "Articulation points are vertices whose removal increases the number of connected components in an undirected graph.",
        "Tarjan's algorithm finds all APs in a single DFS pass in O(V + E) time using disc[] and low[] arrays.",
        "The low[v] value represents the earliest discovery time reachable from v's subtree via back edges.",
        "A non-root vertex u is an AP if any child v satisfies low[v] >= disc[u]; the root is an AP only if it has more than one DFS child.",
        "APs are closely related to bridges (cut edges) — the same DFS framework finds both with a minor condition change.",
        "Understanding APs is fundamental for network reliability, finding biconnected components, and analyzing graph connectivity.",
      ],
    },
  ],
};

export default function ArticulationPointsVideo() {
  return <AlgoVideo config={config} />;
}
