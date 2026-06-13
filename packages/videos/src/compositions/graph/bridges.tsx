import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Bridges",
  subtitle: "Edges whose removal increases the number of connected components.",
  category: "graph",
  difficulty: "advanced",
  chapters: {
    problem: {
      heading: "What is a Bridge?",
      body: [
        "A bridge (cut-edge) is an edge in a graph whose removal increases the number of connected components.",
        "Formally, edge (u, v) is a bridge if the graph becomes disconnected after deleting it.",
        "Bridges represent critical connections — removing them isolates parts of the network.",
        "A graph may have zero, one, or many bridges depending on its cycle structure.",
        "Edges that belong to a cycle are never bridges; only edges that are the sole path between two components qualify.",
      ],
      callout:
        "Bridge detection is fundamental in network reliability analysis — a bridge is a single point of failure at the edge level.",
    },
    intuition: {
      heading: "How Do We Find Bridges Efficiently?",
      body: [
        "The brute-force approach removes each edge and checks connectivity via DFS/BFS — O(E × (V+E)), too slow.",
        "Tarjan's algorithm (1974) finds all bridges in a single DFS pass using discovery times and low-link values.",
        "disc[v] records when node v was first visited in DFS order (a timestamp).",
        "low[v] records the minimum discovery time reachable from the DFS subtree rooted at v, including back edges.",
        "Edge (u → v) is a bridge if and only if low[v] > disc[u]: no back edge from v's subtree can reach u or its ancestors.",
      ],
      analogy:
        "Think of a city's road network. A bridge road is one where, if it closes, some neighborhoods become completely cut off — there is no alternate route. Tarjan's algorithm identifies these critical roads in one efficient sweep.",
    },
    walkthrough: {
      steps: [
        {
          label: "Build the Graph",
          description:
            "Construct an undirected graph with 6 nodes (0–5) and 7 edges: (0,1), (1,2), (2,0), (1,3), (3,4), (4,5), (5,3). Nodes 0-1-2 form a triangle; nodes 3-4-5 form another triangle, connected via edge (1,3).",
        },
        {
          label: "Initialize DFS State",
          description:
            "Set disc[] = low[] = -1 for all nodes (unvisited). Initialize a global timer = 0. We will run DFS from node 0, passing the parent to avoid traversing the same undirected edge backward.",
        },
        {
          label: "Visit Node 0",
          description:
            "DFS visits node 0. Set disc[0] = low[0] = 0, timer becomes 1. Node 0 is the DFS root with no parent. Explore neighbors: 1 and 2.",
        },
        {
          label: "Visit Node 1 (tree edge 0→1)",
          description:
            "DFS visits node 1 via tree edge (0,1). Set disc[1] = low[1] = 1, timer = 2. Parent of 1 is 0. Explore neighbors: 2 and 3.",
        },
        {
          label: "Visit Node 2 (tree edge 1→2)",
          description:
            "DFS visits node 2 via tree edge (1,2). Set disc[2] = low[2] = 2, timer = 3. Neighbor 0 is visited and is not parent of 2 (parent=1), so (2,0) is a back edge. Update low[2] = min(low[2], disc[0]) = 0.",
        },
        {
          label: "Backtrack to Node 1 — Update low[1]",
          description:
            "Return from node 2 to node 1. Update low[1] = min(low[1], low[2]) = min(1, 0) = 0. Check bridge condition for edge (1,2): low[2]=0 > disc[1]=1? No — not a bridge (cycle 0-1-2 provides alternate path).",
        },
        {
          label: "Visit Node 3 (tree edge 1→3)",
          description:
            "DFS visits node 3 via tree edge (1,3). Set disc[3] = low[3] = 3, timer = 4. Parent of 3 is 1. Explore neighbors: 4 and 5.",
        },
        {
          label: "Visit Node 4 (tree edge 3→4)",
          description:
            "DFS visits node 4 via tree edge (3,4). Set disc[4] = low[4] = 4, timer = 5. Explore neighbor 5.",
        },
        {
          label: "Visit Node 5 (tree edge 4→5)",
          description:
            "DFS visits node 5 via tree edge (4,5). Set disc[5] = low[5] = 5, timer = 6. Neighbor 3 is visited and not parent of 5, so (5,3) is a back edge. Update low[5] = min(5, disc[3]) = min(5, 3) = 3.",
        },
        {
          label: "Backtrack: Update low[4], low[3]",
          description:
            "Return from 5 to 4: low[4] = min(4, low[5]) = 3. Check (4,5): low[5]=3 > disc[4]=4? No — not a bridge. Return from 4 to 3: low[3] = min(3, low[4]) = 3. Check (3,4): low[4]=3 > disc[3]=3? No — not a bridge.",
        },
        {
          label: "Backtrack to Node 1 — Bridge Found!",
          description:
            "Return from node 3 to node 1. Update low[1] = min(low[1], low[3]) = min(0, 3) = 0. Check bridge condition for edge (1,3): low[3]=3 > disc[1]=1? YES! Edge (1,3) is a BRIDGE.",
        },
        {
          label: "Final Result",
          description:
            "DFS completes. The only bridge is edge (1,3). Removing it splits the graph into {0,1,2} and {3,4,5}. Both sub-components remain connected internally due to their triangular cycle structure.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `from typing import List, Tuple

def find_bridges(n: int, edges: List[Tuple[int, int]]) -> List[Tuple[int, int]]:
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    disc = [-1] * n
    low  = [-1] * n
    timer = [0]
    bridges = []

    def dfs(u: int, parent: int) -> None:
        disc[u] = low[u] = timer[0]
        timer[0] += 1

        for v in adj[u]:
            if v == parent:
                continue
            if disc[v] == -1:          # tree edge
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:   # bridge condition
                    bridges.append((u, v))
            else:                      # back edge
                low[u] = min(low[u], disc[v])

    for start in range(n):
        if disc[start] == -1:
            dfs(start, -1)

    return bridges

# Example usage
n = 6
edges = [(0,1),(1,2),(2,0),(1,3),(3,4),(4,5),(5,3)]
print(find_bridges(n, edges))  # [(1, 3)]`,
      annotations: [
        {
          lines: [1, 2, 3, 4, 5, 6],
          note: "Build an adjacency list from the edge list. Each undirected edge (u,v) is stored in both adj[u] and adj[v].",
        },
        {
          lines: [8, 9, 10],
          note: "disc[] stores discovery timestamps; low[] stores the minimum discovery time reachable from each node's DFS subtree. Both start at -1 (unvisited).",
        },
        {
          lines: [13, 14, 15],
          note: "On entering node u, assign the current timer value to both disc[u] and low[u], then increment the timer.",
        },
        {
          lines: [17, 18, 19, 20, 21, 22],
          note: "For each unvisited neighbor v (tree edge): recurse into v, then propagate low values upward: low[u] = min(low[u], low[v]).",
        },
        {
          lines: [23, 24],
          note: "Bridge condition: if no node in v's subtree can reach u or higher via a back edge (low[v] > disc[u]), then (u,v) is a bridge.",
        },
        {
          lines: [25, 26],
          note: "For an already-visited neighbor v that is not the parent (back edge): update low[u] = min(low[u], disc[v]) to record the ancestor reachable.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best", value: "O(V + E)", color: "#CEEB5A" },
        { label: "Average", value: "O(V + E)", color: "#CEEB5A" },
        { label: "Worst", value: "O(V + E)", color: "#CEEB5A" },
      ],
      spaceRows: [
        { label: "disc[] + low[]", value: "O(V)" },
        { label: "Recursion stack", value: "O(V)" },
        { label: "Adjacency list", value: "O(V + E)" },
        { label: "Total", value: "O(V + E)" },
      ],
      notes: [
        "Tarjan's bridge algorithm always runs in O(V + E) time — a single DFS pass regardless of graph structure.",
        "The recursion depth is at most O(V) for a path graph; iterative DFS with an explicit stack avoids stack overflow on deep graphs.",
        "For multigraphs (parallel edges), the parent check must use edge index rather than node id to avoid false bridge detection.",
      ],
    },
    variations: {
      items: [
        "Articulation Points (Cut Vertices): nodes whose removal disconnects the graph — closely related, same DFS framework with a slightly different condition.",
        "Biconnected Components: maximal subgraphs with no articulation points; bridges are exactly the biconnected components of size 2.",
        "Bridge Tree (Block-Cut Tree): contract each biconnected component to a single node; the resulting tree's edges correspond to bridges.",
        "Online Bridge Finding: incremental algorithms (e.g., Iyer et al.) maintain bridges as edges are added dynamically in O(log n) amortized per edge.",
        "Strongly Connected Components (Tarjan's SCC): the same low-link DFS idea generalizes to directed graphs for finding SCCs.",
      ],
      tips: [
        "Iterative DFS implementation is preferred in production to avoid Python's default recursion limit (~1000). Use an explicit stack with (node, parent, neighbor_index) tuples.",
        "When the graph has multiple connected components, run the DFS loop over all nodes and start a new DFS from each unvisited node.",
        "For undirected graphs with parallel edges (e.g., LeetCode 1192), track parent by edge index — not node id — to correctly skip only the exact edge you came from.",
      ],
    },
    summary: {
      keyPoints: [
        "A bridge is an edge whose removal disconnects the graph; edges inside cycles are never bridges.",
        "Tarjan's algorithm finds all bridges in O(V + E) using a single DFS and two arrays: disc[] (discovery time) and low[] (minimum reachable ancestor).",
        "The bridge condition is: edge (u → v) is a bridge iff low[v] > disc[u] after the DFS subtree of v is fully explored.",
        "Back edges during DFS update low[] values, allowing the algorithm to detect when a subtree has an alternate path to an ancestor.",
        "Bridges are the edges of the bridge tree — contracting biconnected components reveals the graph's high-level connectivity skeleton.",
        "Mastering bridge/articulation-point detection is essential for network reliability, 2-edge-connectivity, and competitive programming graph problems.",
      ],
    },
  },
}

export default function BridgesVideo() {
  return <AlgoVideo config={config} />
}
