import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Eulerian Path / Circuit",
  subtitle: "Path visiting every edge exactly once using Hierholzer's algorithm.",
  category: "graph",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is an Eulerian Path?",
      bullets: [
        "An Eulerian Path is a trail in a graph that visits every edge exactly once. Unlike Hamiltonian paths, it focuses on edges, not vertices.",
        "An Eulerian Circuit (or Eulerian Tour) is an Eulerian Path that starts and ends at the same vertex, forming a closed loop.",
        "A graph has an Eulerian Circuit if and only if it is connected and every vertex has even degree.",
        "A graph has an Eulerian Path (but not circuit) if and only if it is connected and has exactly two vertices of odd degree — the path must start at one and end at the other.",
        "The problem was first solved by Leonhard Euler in 1736 for the Seven Bridges of Königsberg, making it one of the oldest problems in graph theory.",
      ],
    },

    intuition: {
      heading: "How to Think About Eulerian Paths",
      bullets: [
        "Think of each edge as a one-way road that gets destroyed after you drive on it. You want to plan a route that uses every road exactly once.",
        "At every intermediate vertex you visit, you must enter and leave the same number of times — so the degree must be even. Only the start and end can be odd.",
        "Hierholzer's algorithm works by following edges greedily until stuck, then splicing in sub-tours at vertices with remaining edges.",
        "The key insight: when you get stuck (no more edges from current vertex), that vertex must be the end of a valid sub-tour — push it to the result path.",
        "The algorithm is linear in the number of edges because every edge is processed exactly once — it's inserted into the stack and removed when traversed.",
      ],
      analogy:
        "Imagine drawing a figure without lifting your pen and without retracing any line. An Eulerian Circuit is possible only if every intersection (vertex) has an even number of roads meeting it — you can always find a way in and a way out. If exactly two intersections are 'unbalanced' (odd degree), you must start at one and end at the other.",
    },

    walkthrough: {
      heading: "Step-by-Step: Hierholzer's Algorithm",
      steps: [
        {
          step: 1,
          description:
            "Check existence: count the degree of each vertex. If 0 odd-degree vertices → Eulerian Circuit. If exactly 2 → Eulerian Path. Otherwise, neither exists.",
        },
        {
          step: 2,
          description:
            "Choose the starting vertex: for a circuit, any vertex works. For a path, start at one of the two odd-degree vertices.",
        },
        {
          step: 3,
          description:
            "Initialize a stack with the start vertex. Also initialize an empty result path list.",
        },
        {
          step: 4,
          description:
            "Peek at the top of the stack (current vertex v). If v still has unused edges, pick any neighbor u, remove the edge (v, u) from the graph, and push u onto the stack.",
        },
        {
          step: 5,
          description:
            "If v has no remaining unused edges, it is a dead end in the current sub-tour. Pop v from the stack and append it to the result path.",
        },
        {
          step: 6,
          description:
            "Continue: peek at the new top of stack. If it has unused edges, follow them. If not, pop and append to path. The stack always holds the 'current trail' being built.",
        },
        {
          step: 7,
          description:
            "When the stack becomes empty, all edges have been used. The result path, reversed, gives the complete Eulerian Path or Circuit.",
        },
        {
          step: 8,
          description:
            "Example graph: vertices {0,1,2,3,4}, edges {0-1, 1-2, 2-0, 0-3, 3-4, 4-0, 2-3}. Degrees: 0=4, 1=2, 2=3, 3=3, 4=2. Odd-degree: 2 and 3 → Eulerian Path from 2 to 3.",
        },
        {
          step: 9,
          description:
            "Start at vertex 2. Stack: [2]. Follow edge 2→0. Stack: [2, 0]. Follow 0→1. Stack: [2, 0, 1]. Follow 1→2. Stack: [2, 0, 1, 2]. Vertex 2 now has no edges — pop: path=[2].",
        },
        {
          step: 10,
          description:
            "Back at vertex 1 (top of stack). No edges left — pop: path=[2,1]. Back at vertex 0. Follow 0→3. Stack: [2,0,3]. Follow 3→4. Stack: [2,0,3,4]. Follow 4→0. Stack: [2,0,3,4,0].",
        },
        {
          step: 11,
          description:
            "Vertex 0 has no edges left — pop: path=[2,1,0]. Vertex 4 has no edges — pop: path=[2,1,0,4]. Vertex 3 has edge 3→2 left. Follow it. Stack: [2,0,3,2].",
        },
        {
          step: 12,
          description:
            "Vertex 2 has no edges — pop: path=[2,1,0,4,2]. Vertex 3 has no edges — pop: path=[2,1,0,4,2,3]. Vertex 0 has no edges — pop: path=[2,1,0,4,2,3,0]. Vertex 2 popped: path=[2,1,0,4,2,3,0,2]. Reverse → [2,0,3,2,4,0,1,2]. Eulerian Path complete.",
        },
      ],
    },

    code: {
      heading: "Hierholzer's Algorithm in Python",
      language: "python",
      snippet: `from collections import defaultdict

def find_eulerian_path(n, edges):
    """
    Find Eulerian Path using Hierholzer's algorithm.
    Returns path as list of vertices, or [] if none exists.
    """
    # Build adjacency list (undirected)
    graph = defaultdict(list)
    degree = defaultdict(int)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
        degree[u] += 1
        degree[v] += 1

    # Check existence and find start vertex
    odd_vertices = [v for v in degree if degree[v] % 2 != 0]
    if len(odd_vertices) == 0:
        start = next(iter(degree))   # Eulerian Circuit: any vertex
    elif len(odd_vertices) == 2:
        start = odd_vertices[0]      # Eulerian Path: start at odd-degree vertex
    else:
        return []                    # No Eulerian path exists

    # Hierholzer's algorithm
    stack = [start]
    path = []
    while stack:
        v = stack[-1]
        if graph[v]:
            u = graph[v].pop()
            graph[u].remove(v)       # Remove reverse edge (undirected)
            stack.append(u)
        else:
            path.append(stack.pop())

    # Valid only if all edges were used
    if len(path) != len(edges) + 1:
        return []                    # Graph is disconnected

    return path[::-1]

# Example
edges = [(0,1),(1,2),(2,0),(0,3),(3,4),(4,0),(2,3)]
print(find_eulerian_path(5, edges))
# One valid output: [2, 0, 1, 2, 3, 4, 0, 3]`,
      annotations: [
        {
          lines: "8-12",
          note: "Build the adjacency list and degree map simultaneously. For undirected graphs, add both directions. For directed graphs, only add u→v and track in-degree/out-degree separately.",
        },
        {
          lines: "15-21",
          note: "Existence check: 0 odd-degree vertices → circuit (start anywhere). Exactly 2 odd-degree vertices → path (start at one of them). Any other count → no Eulerian path exists.",
        },
        {
          lines: "24-33",
          note: "Core of Hierholzer's: maintain a stack of the current trail. If the top vertex has unused edges, extend the trail. If stuck (no edges), the vertex belongs in the final path — pop and record it.",
        },
        {
          lines: "29",
          note: "graph[u].remove(v) removes the reverse edge to prevent re-traversal in undirected graphs. This is O(degree) per step; using a pointer/index into the adjacency list makes it O(1) amortized.",
        },
        {
          lines: "35-37",
          note: "Sanity check: if the graph is disconnected, we won't use all edges. The path length must equal edges + 1 for a valid Eulerian traversal.",
        },
        {
          lines: "39",
          note: "Reverse the path at the end. Hierholzer's builds it in reverse order because vertices are added when they become dead ends (deepest-first), not when first visited.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(V + E)",
          note: "Single pass through all edges; existence check is O(V)",
        },
        {
          case: "Average",
          complexity: "O(V + E)",
          note: "Every edge is pushed and popped from the stack exactly once",
        },
        {
          case: "Worst",
          complexity: "O(V + E)",
          note: "Dense graph or many sub-tours to splice — still linear in edges",
        },
      ],
      spaceRows: [
        {
          type: "Adjacency List",
          complexity: "O(V + E)",
          note: "Stores all edges; modified in-place during traversal",
        },
        {
          type: "Stack",
          complexity: "O(E)",
          note: "In the worst case, the entire path is on the stack before any vertex is popped",
        },
        {
          type: "Result Path",
          complexity: "O(V + E)",
          note: "The output path has exactly E + 1 vertices for a valid Eulerian traversal",
        },
      ],
      insights: [
        "Hierholzer's algorithm is optimal — O(V + E) is the best possible since you must visit every edge at least once.",
        "Using an adjacency list with an index pointer (instead of list.remove) reduces the constant factor significantly for dense graphs.",
        "For directed graphs, the condition changes: each vertex must have equal in-degree and out-degree for a circuit, or exactly one vertex with out − in = 1 (start) and one with in − out = 1 (end) for a path.",
      ],
    },

    variations: {
      heading: "Variations & Applications",
      variations: [
        {
          name: "Directed Eulerian Path (Hierholzer on Digraphs)",
          description:
            "For directed graphs, use in-degree and out-degree instead of total degree. The adjacency list is one-directional; no reverse-edge removal needed. Condition: out[v] − in[v] = 1 for start, in[v] − out[v] = 1 for end, balanced for all others.",
        },
        {
          name: "Chinese Postman Problem",
          description:
            "Find the minimum-weight closed walk that visits every edge at least once. If the graph already has an Eulerian Circuit, the answer is the total edge weight. Otherwise, add minimum-weight duplicate edges to make all degrees even (minimum weight perfect matching on odd-degree vertices).",
        },
        {
          name: "Route Inspection on Mixed Graphs",
          description:
            "Extends the Chinese Postman to graphs with both directed and undirected edges. Requires more complex matching and orientation decisions.",
        },
        {
          name: "De Bruijn Sequences",
          description:
            "A De Bruijn sequence of order n over an alphabet is a cyclic sequence where every possible subsequence of length n appears exactly once. It corresponds to an Eulerian Circuit on the De Bruijn graph — a direct application of this algorithm.",
        },
        {
          name: "DNA Fragment Assembly",
          description:
            "In genome sequencing, overlapping DNA reads are modeled as edges in an Eulerian graph (the de Bruijn graph of k-mers). Finding the Eulerian Path through this graph reconstructs the original genome sequence.",
        },
      ],
      tips: [
        "Always verify the existence condition before running Hierholzer's — skip the algorithm entirely if the degree condition fails.",
        "For undirected graphs, use graph[u].remove(v) carefully; for large graphs prefer an adjacency list with a current-index pointer to avoid O(degree) removal.",
        "When multiple valid Eulerian paths exist, the algorithm's output depends on the order edges appear in the adjacency list — sort edges if a lexicographically smallest path is required.",
        "To handle disconnected graphs gracefully, check that all edges belong to the same connected component (ignoring zero-degree vertices) before running the algorithm.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "An Eulerian Path visits every edge exactly once; an Eulerian Circuit additionally starts and ends at the same vertex.",
        "Existence is determined purely by vertex degrees: 0 odd-degree vertices → circuit; exactly 2 → path; otherwise neither exists.",
        "Hierholzer's algorithm finds the path in O(V + E) time by maintaining a stack and splicing sub-tours at vertices with remaining edges.",
        "The algorithm builds the path in reverse: vertices are appended to the result when they become dead ends, so the final list must be reversed.",
        "Real-world applications include DNA assembly, De Bruijn sequences, circuit board routing, and the Chinese Postman delivery problem.",
        "For directed graphs, the same algorithm applies but the degree condition changes to comparing in-degree and out-degree at each vertex.",
      ],
    },
  },
};

export default function EulerianPathVideo() {
  return <AlgoVideo config={config} />;
}
