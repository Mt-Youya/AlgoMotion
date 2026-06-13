import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Tarjan's SCC",
  subtitle: "All strongly connected components in one DFS using low-link values.",
  category: "graph",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "Finding All Strongly Connected Components",
      body: [
        "A Strongly Connected Component (SCC) is a maximal set of vertices in a directed graph where every vertex can reach every other vertex within the set.",
        "Given a directed graph G = (V, E), find all SCCs — this partitions every vertex into exactly one component.",
        "Naive approaches require multiple DFS passes (Kosaraju's uses two full DFS traversals); Tarjan's achieves the same in a single pass.",
        "SCCs reveal the cyclic structure of directed graphs and are fundamental in compilers (dependency analysis), deadlock detection, and social network analysis.",
        "The algorithm must correctly handle back edges (which form cycles), cross edges, and forward edges in the DFS tree.",
      ],
      callout:
        "Tarjan's algorithm runs in O(V + E) time — optimal for this problem — using only one DFS and a stack.",
    },

    intuition: {
      heading: "Low-Link Values: The Key Insight",
      body: [
        "Assign every node a discovery timestamp disc[v] in the order it is first visited by DFS.",
        "Maintain a low-link value low[v]: the smallest discovery time reachable from the subtree rooted at v (including v itself) via at most one back edge.",
        "Keep a stack of nodes currently being explored. A node stays on the stack until its entire SCC has been identified.",
        "A node v is the root of an SCC if and only if low[v] == disc[v] — meaning no node in v's subtree has a back edge leading to an ancestor of v.",
        "When an SCC root is found, pop all nodes from the stack down to and including v — those nodes form exactly one complete SCC.",
      ],
      analogy:
        "Think of a group of islands connected by one-way ferries. An SCC is a group where you can travel between any two islands using those ferries. Tarjan's algorithm is like a single explorer who marks each island with a timestamp and a 'can I get back to an earlier island?' score. When the score equals the timestamp, the explorer knows they've found a closed group — they collect it and move on.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initialize data structures",
          description:
            "Create arrays disc[] and low[] initialized to -1 (unvisited). Create an empty stack S and a boolean array onStack[]. Set a global timer to 0.",
        },
        {
          label: "Start DFS from node 0",
          description:
            "Set disc[0] = low[0] = 0, timer = 1. Push node 0 onto stack S. onStack[0] = true. Begin exploring neighbors.",
        },
        {
          label: "Visit node 1 (neighbor of 0)",
          description:
            "Set disc[1] = low[1] = 1, timer = 2. Push 1 onto stack. Explore neighbor 2.",
        },
        {
          label: "Visit node 2 (neighbor of 1)",
          description:
            "Set disc[2] = low[2] = 2, timer = 3. Push 2 onto stack. Node 2's neighbor is 0, which is already on the stack — this is a back edge.",
        },
        {
          label: "Back edge 2 → 0: update low[2]",
          description:
            "Since node 0 is on the stack, update low[2] = min(low[2], disc[0]) = min(2, 0) = 0. Return from node 2's DFS call.",
        },
        {
          label: "Propagate low values up: low[1] and low[0]",
          description:
            "Back in node 1: low[1] = min(low[1], low[2]) = min(1, 0) = 0. Back in node 0: low[0] = min(low[0], low[1]) = min(0, 0) = 0.",
        },
        {
          label: "Check SCC root condition at node 0",
          description:
            "low[0] == disc[0] == 0. Node 0 is an SCC root! Pop stack until 0 is popped: pop 2, pop 1, pop 0. SCC #1 = {0, 1, 2}.",
        },
        {
          label: "Continue DFS: visit nodes 3 and 4",
          description:
            "From node 1's bridge edge to 3: visit 3 (disc=3, low=3), then 4 (disc=4, low=4). Edge 4→3 is a back edge: low[4] = min(4, disc[3]) = 3.",
        },
        {
          label: "SCC root check at node 3",
          description:
            "After returning from 4: low[3] = min(low[3], low[4]) = 3. low[3] == disc[3] == 3. Pop stack: pop 4, pop 3. SCC #2 = {3, 4}.",
        },
        {
          label: "Bridge edge 4 → 5: visit SCC3 nodes",
          description:
            "From node 4, explore 5 (disc=5, low=5), then 6 (disc=6, low=6), then 7 (disc=7, low=7). Back edge 7→5 sets low[7] = 5.",
        },
        {
          label: "Propagate and find SCC root at node 5",
          description:
            "low[6] = min(6, low[7]) = 5. low[5] = min(5, low[6]) = 5. low[5] == disc[5] == 5. Pop 7, 6, 5. SCC #3 = {5, 6, 7}.",
        },
        {
          label: "Algorithm complete — all SCCs found",
          description:
            "Every vertex has been visited exactly once. The three SCCs {0,1,2}, {3,4}, {5,6,7} partition all 8 vertices. Total work: O(V + E).",
        },
      ],
    },

    code: {
      snippet: `def tarjan_scc(graph, n):
    disc = [-1] * n
    low  = [-1] * n
    on_stack = [False] * n
    stack = []
    timer = [0]
    sccs = []

    def dfs(v):
        disc[v] = low[v] = timer[0]
        timer[0] += 1
        stack.append(v)
        on_stack[v] = True

        for w in graph[v]:
            if disc[w] == -1:          # tree edge
                dfs(w)
                low[v] = min(low[v], low[w])
            elif on_stack[w]:          # back edge
                low[v] = min(low[v], disc[w])

        if low[v] == disc[v]:          # v is SCC root
            scc = []
            while True:
                w = stack.pop()
                on_stack[w] = False
                scc.append(w)
                if w == v:
                    break
            sccs.append(scc)

    for v in range(n):
        if disc[v] == -1:
            dfs(v)

    return sccs

# Example
graph = {0:[1], 1:[2], 2:[0,3], 3:[4], 4:[3,5], 5:[6], 6:[7], 7:[5]}
print(tarjan_scc(graph, 8))
# [{2,1,0}, {4,3}, {7,6,5}]`,
      language: "python",
      annotations: [
        {
          lines: [1, 2, 3, 4, 5, 6],
          note: "disc[] tracks discovery timestamps; low[] tracks the lowest disc reachable from a subtree. on_stack[] distinguishes stack membership from mere visitation.",
        },
        {
          lines: [9, 10, 11, 12, 13],
          note: "On first visit, disc[v] = low[v] = current timer. Push v onto the stack and mark it as on-stack.",
        },
        {
          lines: [15, 16, 17, 18, 19],
          note: "Tree edge: recurse into w, then pull w's low value up to v. Back edge (w already on stack): update low[v] with disc[w] directly — not low[w], to avoid cross-SCC updates.",
        },
        {
          lines: [21, 22, 23, 24, 25, 26, 27],
          note: "SCC root condition: low[v] == disc[v] means no node in v's subtree can reach an ancestor of v. Pop the stack until v is removed — all popped nodes form one SCC.",
        },
        {
          lines: [29, 30, 31],
          note: "Outer loop ensures all nodes are visited even in disconnected graphs. Each unvisited node starts a new DFS tree.",
        },
        {
          lines: [34, 35, 36],
          note: "Example graph with three SCCs. The algorithm correctly identifies each cycle even when SCCs are connected by bridge edges.",
        },
      ],
    },

    complexity: {
      timeRows: [
        {
          label: "Best case",
          value: "O(V + E)",
          color: "#CEEB5A",
        },
        {
          label: "Average case",
          value: "O(V + E)",
          color: "#2255CC",
        },
        {
          label: "Worst case",
          value: "O(V + E)",
          color: "#E05A3A",
        },
      ],
      spaceRows: [
        {
          label: "disc / low arrays",
          value: "O(V)",
        },
        {
          label: "DFS call stack",
          value: "O(V)",
        },
        {
          label: "Explicit node stack",
          value: "O(V)",
        },
        {
          label: "Adjacency list (input)",
          value: "O(V + E)",
        },
      ],
      notes: [
        "O(V + E) is optimal — any SCC algorithm must examine every vertex and edge at least once.",
        "Recursive DFS can hit Python's default stack limit (~1000) on large graphs; convert to iterative for production use.",
        "The on_stack[] array is essential: using only disc[] to detect back edges would incorrectly cross SCC boundaries via cross edges.",
      ],
    },

    variations: {
      items: [
        "Kosaraju's Algorithm: two full DFS passes — first on G, then on the transpose G^T in reverse finish order. Simpler to implement but requires building the transpose graph.",
        "Iterative Tarjan's SCC: replace recursion with an explicit stack of (node, neighbor_index) frames. Required for large graphs in languages with shallow call stacks.",
        "Condensation Graph: after finding all SCCs, collapse each SCC to a single node to form a DAG. Useful for dependency resolution, build systems, and 2-SAT.",
        "2-SAT Solver: model a boolean satisfiability problem as an implication graph and find SCCs. Variables in the same SCC as their negation make the formula unsatisfiable.",
        "Strongly Connected Subgraph Counting: count SCCs of size ≥ k to analyze robustness of directed networks (e.g., web graph, citation networks).",
      ],
      tips: [
        "Use on_stack[] (not just visited[]) to distinguish back edges from cross edges — only back edges (to on-stack nodes) should update low[v].",
        "For Python, increase sys.setrecursionlimit or convert to iterative Tarjan to handle graphs with thousands of nodes without stack overflow.",
        "The condensation DAG produced by Tarjan's SCC enables efficient topological analysis: process SCCs in reverse topological order to propagate properties through the graph.",
        "In competitive programming, Tarjan's SCC is often combined with 2-SAT: build the implication graph, run Tarjan's, then check if any variable xi and ¬xi share an SCC.",
      ],
    },

    summary: {
      keyPoints: [
        "Tarjan's algorithm finds all SCCs in a single DFS pass in O(V + E) time — no second pass or graph transposition needed.",
        "Two key arrays drive the algorithm: disc[v] (discovery timestamp) and low[v] (lowest disc reachable from v's DFS subtree).",
        "A node v is an SCC root when low[v] == disc[v]; at that point, pop the stack to extract the complete SCC.",
        "The on_stack[] flag is critical: low[v] is only updated via back edges to on-stack nodes, preventing cross-SCC contamination.",
        "The resulting SCCs form a DAG (condensation graph) that reveals the high-level structure of any directed graph.",
        "Practical applications include 2-SAT solving, compiler dependency analysis, deadlock detection, and social network clustering.",
      ],
    },
  },
};

export default function TarjanSccVideo() {
  return <AlgoVideo config={config} />;
}
