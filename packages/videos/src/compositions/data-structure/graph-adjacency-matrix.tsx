import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Graph (Adjacency Matrix)",
  subtitle: "Graph using 2D matrix with O(1) edge lookup, suitable for dense graphs.",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Represent a Graph as a 2D Matrix for Instant Edge Queries",
      body: [
        "A graph G = (V, E) consists of a set of vertices V and edges E connecting pairs of vertices. One of the most fundamental questions about a graph is: 'Does an edge exist between vertex i and vertex j?' An adjacency matrix answers this in O(1) time.",
        "An adjacency matrix is a V × V two-dimensional array M where M[i][j] = 1 (or the edge weight) if there is an edge from vertex i to vertex j, and 0 otherwise. For undirected graphs the matrix is symmetric: M[i][j] always equals M[j][i].",
        "Adding or removing an edge is a single array write — M[i][j] = 1 for add, M[i][j] = 0 for remove — both O(1). This makes adjacency matrices attractive when the edge set changes frequently and lookups must stay fast.",
        "The key trade-off is space: storing V² values requires O(V²) memory regardless of how many edges actually exist. For a sparse graph with only a few edges this wastes significant memory, but for dense graphs where most pairs of vertices are connected the matrix is nearly full and the overhead disappears.",
        "Adjacency matrices are widely used in algorithms that require constant-time edge queries: Floyd-Warshall all-pairs shortest paths, dense graph Prim's MST, and adjacency checks in network flow and matching algorithms.",
      ],
      callout:
        "The defining strength of an adjacency matrix is O(1) edge lookup: checking whether an edge exists between any two vertices is a single array access, regardless of graph size.",
    },

    intuition: {
      heading: "Think of a Seating Chart or a Flight Route Table",
      body: [
        "Imagine a square grid where every row represents a departure city and every column represents a destination city. A '1' in cell (i, j) means there is a direct flight from city i to city j. Looking up whether a direct flight exists is instant — just find the cell at the intersection of the row and column.",
        "Because the grid has one row and one column for every city, the total number of cells is (number of cities)². This is exactly the O(V²) space cost of an adjacency matrix.",
        "For an undirected graph (where edges have no direction), the matrix is always symmetric along its main diagonal. This means you only need to store the upper or lower triangle to save memory, though in practice the full matrix is usually kept for simplicity.",
        "The diagonal M[i][i] represents self-loops. In most standard graphs self-loops are absent, so the diagonal is all zeros, but weighted graphs may use it to store vertex weights.",
        "Iterating all neighbors of a vertex requires scanning an entire row — V cells — even if the vertex has only two neighbors. This O(V) neighbor iteration is the main reason adjacency matrices are slower than adjacency lists for sparse graphs.",
      ],
      analogy:
        "Picture a multiplication table from elementary school. Each row is one number, each column is another, and the cell at their intersection holds the product. An adjacency matrix works the same way: rows and columns are vertices, and the cell holds 1 (edge exists) or 0 (no edge). Just as you can look up 7 × 8 instantly by going to row 7, column 8, you can look up any edge in O(1) time.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initialize an Empty Matrix",
          description:
            "We have 5 vertices (0–4). Allocate a 5×5 matrix filled with zeros. Every cell M[i][j] = 0 means no edges exist yet. The matrix uses 25 cells regardless of how many edges we will add.",
        },
        {
          label: "Add Edge (0, 1)",
          description:
            "Set M[0][1] = 1. Because the graph is undirected, also set M[1][0] = 1. Two cells are updated in O(1). The matrix now shows a connection between vertex 0 and vertex 1.",
        },
        {
          label: "Add Edge (0, 2)",
          description:
            "Set M[0][2] = 1 and M[2][0] = 1. Vertex 0 now has two neighbors: 1 and 2. Row 0 reads [0, 1, 1, 0, 0] — the positions of the 1s reveal the neighbors.",
        },
        {
          label: "Add Edges (1,3), (2,3), (3,4), (1,4)",
          description:
            "Continue adding edges. After all six edges, row 3 reads [0, 1, 1, 0, 1] — vertex 3 is connected to vertices 1, 2, and 4. The symmetric property ensures row i and column i always contain the same neighbor information.",
        },
        {
          label: "Edge Lookup: M[0][1]",
          description:
            "Query: does edge (0, 1) exist? Access M[0][1] directly — it equals 1, so yes. This is a single array index operation: O(1). No traversal or search is needed.",
        },
        {
          label: "Edge Lookup: M[2][4]",
          description:
            "Query: does edge (2, 4) exist? Access M[2][4] — it equals 0, so no edge exists. Same O(1) cost as a positive lookup. The matrix handles both presence and absence queries equally fast.",
        },
        {
          label: "Iterate Neighbors of Vertex 1",
          description:
            "To find all neighbors of vertex 1, scan row 1: [1, 0, 0, 1, 1]. Every position j where M[1][j] = 1 is a neighbor. We find neighbors 0, 3, and 4. This scan takes O(V) time — we must check all V columns even though only 3 are non-zero.",
        },
        {
          label: "Add Edge (0, 3) Dynamically",
          description:
            "New edge arrives: (0, 3). Set M[0][3] = 1 and M[3][0] = 1. Two writes, O(1). The matrix is immediately up to date. Row 0 now reads [0, 1, 1, 1, 0].",
        },
        {
          label: "Remove Edge (1, 4)",
          description:
            "Remove edge (1, 4). Set M[1][4] = 0 and M[4][1] = 0. Two writes, O(1). Row 1 changes from [1, 0, 0, 1, 1] to [1, 0, 0, 1, 0]. The edge is gone instantly.",
        },
        {
          label: "Weighted Graph Variant",
          description:
            "For a weighted graph, store the edge weight instead of 1. M[i][j] = w means edge (i, j) has weight w. Use 0 or infinity (∞) to represent absent edges. Floyd-Warshall initializes its distance matrix exactly this way.",
        },
        {
          label: "Directed Graph",
          description:
            "For a directed graph, M[i][j] = 1 means there is an edge FROM i TO j, but M[j][i] may be 0 (no reverse edge). The matrix is no longer symmetric. In-degree of vertex j equals the sum of column j; out-degree of vertex i equals the sum of row i.",
        },
        {
          label: "Space Cost Reality Check",
          description:
            "A graph with 1,000 vertices requires a 1,000 × 1,000 matrix — one million cells. If the graph has only 2,000 edges (very sparse), 998,000 cells are wasted zeros. For such graphs, an adjacency list uses only O(V + E) = O(3,000) space — 300× less.",
        },
      ],
    },

    code: {
      snippet: `class GraphMatrix:
    def __init__(self, num_vertices: int, directed: bool = False):
        self.V = num_vertices
        self.directed = directed
        # Initialize V x V matrix with zeros
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]

    def add_edge(self, u: int, v: int, weight: int = 1) -> None:
        self.matrix[u][v] = weight
        if not self.directed:
            self.matrix[v][u] = weight  # undirected: symmetric

    def remove_edge(self, u: int, v: int) -> None:
        self.matrix[u][v] = 0
        if not self.directed:
            self.matrix[v][u] = 0

    def has_edge(self, u: int, v: int) -> bool:
        return self.matrix[u][v] != 0  # O(1) lookup

    def get_neighbors(self, u: int) -> list[int]:
        # O(V) scan of row u
        return [v for v in range(self.V) if self.matrix[u][v] != 0]

    def degree(self, u: int) -> int:
        return sum(1 for v in range(self.V) if self.matrix[u][v] != 0)

    def print_matrix(self) -> None:
        header = "   " + "  ".join(str(j) for j in range(self.V))
        print(header)
        for i, row in enumerate(self.matrix):
            print(f"{i}  " + "  ".join(str(x) for x in row))


# Example usage
g = GraphMatrix(5, directed=False)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 3)
g.add_edge(2, 3)
g.add_edge(3, 4)

print(g.has_edge(0, 1))        # True  — O(1)
print(g.has_edge(0, 4))        # False — O(1)
print(g.get_neighbors(3))      # [1, 2, 4]
g.print_matrix()`,
      language: "python",
      annotations: [
        {
          lines: [5, 6],
          note: "The matrix is a list of lists, allocated once at construction. Every cell starts at 0 (no edge). Total memory is O(V²) — fixed at creation regardless of how many edges are added later.",
        },
        {
          lines: [8, 9, 10],
          note: "add_edge writes to exactly one cell (directed) or two cells (undirected). Both are O(1) array assignments. The symmetry for undirected graphs is enforced here so callers never have to think about it.",
        },
        {
          lines: [12, 13, 14],
          note: "remove_edge is the mirror image of add_edge — set the cell(s) back to 0. O(1). No searching, no pointer updates, no memory deallocation needed.",
        },
        {
          lines: [16, 17],
          note: "has_edge is the key advantage of the adjacency matrix: a single array index read, O(1). Comparing to 0 handles both unweighted (0/1) and weighted (0/weight) graphs uniformly.",
        },
        {
          lines: [19, 20],
          note: "get_neighbors must scan all V columns of row u to find non-zero entries. This is O(V) even if the vertex has only one neighbor — the main performance downside versus adjacency lists for sparse graphs.",
        },
        {
          lines: [22, 23],
          note: "degree() also runs in O(V) for the same reason as get_neighbors. For directed graphs you would distinguish in-degree (sum of column u) from out-degree (sum of row u).",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "has_edge(u, v)", value: "O(1)", color: "green" },
        { label: "add_edge(u, v)", value: "O(1)", color: "green" },
        { label: "remove_edge(u, v)", value: "O(1)", color: "green" },
        { label: "get_neighbors(u)", value: "O(V)", color: "yellow" },
        { label: "BFS / DFS", value: "O(V²)", color: "yellow" },
        { label: "Add vertex", value: "O(V²)", color: "red" },
      ],
      spaceRows: [
        { label: "Matrix storage", value: "O(V²)", color: "yellow" },
        { label: "Auxiliary (per op)", value: "O(1)", color: "green" },
      ],
      notes: [
        "The O(1) edge lookup is the defining advantage — no other graph representation matches this. It is the reason adjacency matrices are preferred in dense-graph algorithms like Floyd-Warshall.",
        "BFS and DFS run in O(V²) instead of the O(V + E) you get with an adjacency list, because iterating neighbors of each vertex takes O(V) even if the vertex has few neighbors.",
        "Adding a new vertex requires allocating a new (V+1) × (V+1) matrix and copying all existing data — O(V²). This makes adjacency matrices poorly suited for graphs that grow dynamically.",
      ],
    },

    variations: {
      items: [
        "Weighted Adjacency Matrix: store edge weights instead of 1/0. Use 0 or math.inf for absent edges. The Floyd-Warshall all-pairs shortest-path algorithm initializes its distance table as a weighted adjacency matrix.",
        "Bitset-Compressed Matrix: represent each row as a bitmask (integer). Edge lookup becomes a single bitwise AND, and neighbor iteration uses bitwise operations — dramatically faster in practice for dense graphs due to CPU word-level parallelism.",
        "Upper-Triangle Storage: for undirected graphs, only store M[i][j] where i ≤ j, halving memory to O(V²/2). Requires a small index calculation but reduces cache pressure.",
        "Boolean Reachability Matrix: compute the transitive closure — M*[i][j] = 1 if vertex j is reachable from vertex i by any path. Computed with Floyd-Warshall in O(V³) and then queried in O(1).",
        "Adjacency Matrix for Multigraphs: store the count of parallel edges in each cell instead of a binary flag, enabling O(1) lookup of edge multiplicity in multigraph algorithms.",
      ],
      tips: [
        "Use an adjacency matrix when the graph is dense (E ≈ V²) or when O(1) edge existence checks are critical — for example, in dynamic programming on graphs or fast adjacency tests in combinatorial search.",
        "Prefer an adjacency list when the graph is sparse (E << V²) or when iterating neighbors frequently — adjacency lists iterate neighbors in O(degree) vs O(V) for matrices.",
        "For very large graphs (V > 10,000), the V² memory cost becomes prohibitive. Consider sparse matrix representations (scipy.sparse in Python) that store only non-zero entries.",
        "When implementing Floyd-Warshall or similar DP-on-graphs algorithms, initialize the distance matrix as the weighted adjacency matrix with dist[i][i] = 0 and dist[i][j] = ∞ for absent edges.",
      ],
    },

    summary: {
      keyPoints: [
        "An adjacency matrix is a V × V array where M[i][j] = 1 (or weight) if edge (i, j) exists and 0 otherwise, enabling O(1) edge lookup via a single array access.",
        "Adding and removing edges are both O(1) operations — just write to one cell (directed) or two cells (undirected). No pointer manipulation or memory allocation is needed.",
        "The critical trade-off is space: O(V²) memory is required regardless of the number of edges. For sparse graphs this is wasteful; for dense graphs it is acceptable.",
        "Iterating all neighbors of a vertex requires an O(V) row scan, compared to O(degree) for an adjacency list. BFS and DFS therefore run in O(V²) instead of O(V + E).",
        "Adjacency matrices are the natural representation for dense-graph algorithms: Floyd-Warshall all-pairs shortest paths, dense Prim's MST, and reachability queries all benefit from O(1) edge access.",
        "For undirected graphs the matrix is always symmetric (M[i][j] = M[j][i]). Enforcing symmetry on every add/remove keeps the structure consistent and simplifies all graph queries.",
      ],
      nextSteps: [
        "Compare with the Adjacency List representation to understand when each is preferable based on graph density and the operations your algorithm performs most frequently.",
        "Study Floyd-Warshall all-pairs shortest paths — it operates directly on a weighted adjacency matrix and is the canonical O(V³) DP algorithm on dense graphs.",
      ],
    },
  },
}

export default function GraphAdjacencyMatrixVideo() {
  return <AlgoVideo config={config} />
}
