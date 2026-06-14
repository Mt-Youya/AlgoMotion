import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Hamiltonian Cycle",
  subtitle: "Path visiting every vertex exactly once and returning to start. NP-complete.",
  category: "graph",
  difficulty: "expert",

  chapters: {
    problem: {
      heading: "What Is a Hamiltonian Cycle?",
      bullets: [
        "A Hamiltonian Cycle is a closed path in a graph that visits every vertex exactly once before returning to the starting vertex — no vertex may be revisited.",
        "The problem asks: given an undirected (or directed) graph, does such a cycle exist? If so, find one.",
        "Unlike Eulerian circuits (which traverse every edge once), Hamiltonian cycles constrain vertex visits, making the problem fundamentally harder.",
        "The decision version is NP-complete (proven by reduction from 3-SAT), meaning no polynomial-time algorithm is known and none is expected to exist unless P = NP.",
        "Real-world instances include the Travelling Salesman Problem (TSP), circuit board drilling, DNA fragment assembly, and scheduling problems where every task must be performed exactly once.",
      ],
    },

    intuition: {
      heading: "Why Is This So Hard?",
      bullets: [
        "There is no known structural shortcut: unlike shortest paths or spanning trees, Hamiltonian cycles cannot be built greedily or via dynamic programming in polynomial time in the general case.",
        "The standard exact algorithm is backtracking: start at vertex 0, extend the path one vertex at a time, and prune branches that cannot possibly complete a cycle.",
        "Pruning conditions: (a) the next candidate vertex must be adjacent to the current vertex, (b) it must not already be in the path, and (c) when all n vertices are in the path, the last vertex must be adjacent to vertex 0.",
        "Worst-case, the backtracking explores O(n!) orderings — each of the n vertices can be the second, each of the n-1 remaining can be the third, and so on.",
        "Practical speedups: Ore's theorem (if every pair of non-adjacent vertices has degree-sum ≥ n, a Hamiltonian cycle exists), Dirac's condition (min-degree ≥ n/2 guarantees one), and bitmask DP reduce average-case work.",
      ],
      analogy:
        "Think of a tourist who wants to visit every city in a country exactly once and return home. There is no clever map trick — they must try routes, backtrack when stuck in a city with no unvisited neighbours, and try again. The number of possible itineraries explodes factorially with the number of cities, which is exactly why travel optimisation is a billion-dollar industry.",
    },

    walkthrough: {
      heading: "Step-by-Step Backtracking Walkthrough",
      steps: [
        {
          step: 1,
          label: "Build the graph",
          description:
            "Construct a 6-vertex graph: A–B–C–D–E–F with edges A-B, A-C, A-F, B-C, B-D, C-D, C-E, D-E, D-F, E-F. Store as an adjacency list.",
        },
        {
          step: 2,
          label: "Initialize path",
          description:
            "Fix the starting vertex as A (index 0). Initialize path = [A] and visited = {A}. We always start from vertex 0 to avoid counting rotations of the same cycle multiple times.",
        },
        {
          step: 3,
          label: "Extend to B",
          description:
            "A's unvisited neighbours: B, C, F. Try B first. path = [A, B], visited = {A, B}. B is adjacent to A — valid extension.",
        },
        {
          step: 4,
          label: "Extend to C",
          description:
            "B's unvisited neighbours: C, D. Try C. path = [A, B, C], visited = {A, B, C}. Valid — C is adjacent to B.",
        },
        {
          step: 5,
          label: "Extend to D",
          description:
            "C's unvisited neighbours: D, E. Try D. path = [A, B, C, D], visited = {A, B, C, D}. Valid — D is adjacent to C.",
        },
        {
          step: 6,
          label: "Extend to E",
          description:
            "D's unvisited neighbours: E, F. Try E. path = [A, B, C, D, E], visited = {A, B, C, D, E}. Valid — E is adjacent to D.",
        },
        {
          step: 7,
          label: "Extend to F",
          description:
            "E's unvisited neighbours: F (C and D already visited). Try F. path = [A, B, C, D, E, F], visited = {A, B, C, D, E, F}. All 6 vertices included.",
        },
        {
          step: 8,
          label: "Check closing edge",
          description:
            "All vertices visited. Check if F is adjacent to the start vertex A. Edge F-A exists — YES! The cycle A→B→C→D→E→F→A is a valid Hamiltonian Cycle.",
        },
        {
          step: 9,
          label: "Backtrack example",
          description:
            "Had we tried A→B→D first: path = [A, B, D]. D's unvisited neighbours are C, E, F. Following C→E→F leads to F with no unvisited neighbours and F is not adjacent to A — dead end. Backtrack to D and try E instead.",
        },
        {
          step: 10,
          label: "Pruning saves work",
          description:
            "At each step we only recurse into unvisited vertices adjacent to the current one. This prunes the majority of the n! search space in practice, especially for dense graphs.",
        },
        {
          step: 11,
          label: "No cycle exists case",
          description:
            "If the backtracking exhausts all possibilities without closing the cycle, return False. Example: a path graph A-B-C-D has no Hamiltonian cycle because D cannot return to A.",
        },
        {
          step: 12,
          label: "Result",
          description:
            "Hamiltonian Cycle found: A → B → C → D → E → F → A. Every vertex visited exactly once, cycle closed. Runtime was O(n!) in the worst case but pruning made it much faster here.",
        },
      ],
    },

    code: {
      heading: "Python Implementation (Backtracking)",
      language: "python",
      snippet: `def hamiltonian_cycle(graph, n):
    """
    Find a Hamiltonian Cycle in an undirected graph.
    graph: adjacency matrix (n x n), graph[u][v] = 1 if edge exists.
    Returns the cycle as a list of vertices, or [] if none exists.
    """
    path = [0]          # always start from vertex 0
    visited = [False] * n
    visited[0] = True

    if _backtrack(graph, path, visited, n):
        path.append(0)  # close the cycle back to start
        return path
    return []


def _backtrack(graph, path, visited, n):
    # All vertices included — check if last vertex connects back to start
    if len(path) == n:
        return graph[path[-1]][path[0]] == 1

    current = path[-1]
    for next_v in range(n):
        if _is_safe(graph, next_v, path, visited):
            path.append(next_v)
            visited[next_v] = True

            if _backtrack(graph, path, visited, n):
                return True

            # Backtrack
            path.pop()
            visited[next_v] = False

    return False


def _is_safe(graph, v, path, visited):
    # v must be adjacent to the last vertex in the path
    if graph[path[-1]][v] == 0:
        return False
    # v must not already be in the path
    if visited[v]:
        return False
    return True


# Example: 6-vertex graph with a known Hamiltonian cycle
if __name__ == "__main__":
    n = 6
    g = [[0] * n for _ in range(n)]
    edges = [(0,1),(0,2),(0,5),(1,2),(1,3),(2,3),(2,4),(3,4),(3,5),(4,5)]
    for u, v in edges:
        g[u][v] = g[v][u] = 1

    cycle = hamiltonian_cycle(g, n)
    labels = "ABCDEF"
    if cycle:
        print(" -> ".join(labels[v] for v in cycle))
    else:
        print("No Hamiltonian Cycle found")
    # Output: A -> B -> C -> D -> E -> F -> A
`,
      annotations: [
        {
          lines: "1-13",
          note: "Entry point: fix vertex 0 as the start to avoid counting rotations. Delegates to the recursive backtracker and appends the closing edge if a cycle is found.",
        },
        {
          lines: "16-20",
          note: "Base case: when all n vertices are in the path, the only remaining requirement is that the last vertex has an edge back to vertex 0 — this closes the cycle.",
        },
        {
          lines: "22-33",
          note: "Recursive step: iterate over all candidate next vertices, check safety, recurse. If recursion succeeds, propagate True upward. Otherwise undo the choice (backtrack) by popping from path and clearing visited.",
        },
        {
          lines: "36-41",
          note: "_is_safe enforces two invariants: (1) the candidate vertex must be adjacent to the current tail of the path, and (2) it must not already appear in the path. Both checks are O(1).",
        },
        {
          lines: "44-55",
          note: "Test graph: 6 vertices arranged in a hexagon with additional cross-edges, guaranteeing a Hamiltonian cycle exists. The adjacency matrix is symmetric for undirected edges.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n)",
          note: "Trivially found on first branch (e.g., complete graph Kn)",
        },
        {
          case: "Average",
          complexity: "O(n! · n)",
          note: "Backtracking with pruning; dense graphs converge faster",
        },
        {
          case: "Worst",
          complexity: "O(n! · n)",
          note: "Sparse graph, no cycle exists — exhausts all permutations",
        },
      ],
      spaceRows: [
        {
          label: "Recursion stack",
          complexity: "O(n)",
          note: "Maximum depth equals number of vertices",
        },
        {
          label: "Path array",
          complexity: "O(n)",
          note: "Stores current partial path",
        },
        {
          label: "Visited array",
          complexity: "O(n)",
          note: "Tracks which vertices are in the current path",
        },
        {
          label: "Adjacency matrix",
          complexity: "O(n²)",
          note: "Input representation; adjacency list gives O(n + e)",
        },
      ],
      insights: [
        "The naive bound is O(n!) because there are (n-1)!/2 distinct Hamiltonian cycles in a complete graph (fixing start, dividing by 2 for direction). Backtracking prunes this heavily but cannot escape factorial worst-case.",
        "Held-Karp dynamic programming (bitmask DP) solves Hamiltonian Cycle in O(2ⁿ · n²) time and O(2ⁿ · n) space — exponential but far better than O(n!) for n ≤ 20.",
        "For the decision version on special graph classes (planar graphs, interval graphs, tournament graphs), polynomial algorithms exist — the hardness is in the general case.",
      ],
    },

    variations: {
      heading: "Variants & Practical Tips",
      variations: [
        {
          name: "Hamiltonian Path (non-cycle)",
          description:
            "Find a path visiting every vertex exactly once without requiring a return to the start. Equally NP-complete. Solved by the same backtracking with the base-case check removed.",
        },
        {
          name: "Travelling Salesman Problem (TSP)",
          description:
            "Weighted version: find the minimum-cost Hamiltonian Cycle. NP-hard. Solved exactly with Held-Karp DP in O(2ⁿ · n²) or approximated with Christofides' algorithm (3/2-approximation on metric instances).",
        },
        {
          name: "Held-Karp Bitmask DP",
          description:
            "Represent visited vertex sets as bitmasks. dp[mask][v] = True if there is a Hamiltonian path ending at v visiting exactly the vertices in mask. Fills the table bottom-up in O(2ⁿ · n²), feasible for n ≤ 20.",
        },
        {
          name: "Ore's / Dirac's Sufficient Conditions",
          description:
            "Ore's theorem: if every pair of non-adjacent vertices has combined degree ≥ n, a Hamiltonian cycle exists. Dirac's: if every vertex has degree ≥ n/2, one exists. These give polynomial existence guarantees without finding the cycle.",
        },
        {
          name: "Approximation for TSP",
          description:
            "When the triangle inequality holds, Christofides' algorithm gives a 3/2-approximation. For general metric TSP, the recent Karlin-Klein-Oveis Gharan result (2021) gives a (3/2 − ε)-approximation.",
        },
      ],
      tips: [
        "Fix the starting vertex to vertex 0 to avoid generating rotations of the same cycle — this alone reduces the search space by a factor of n.",
        "Add a degree check before starting: if any vertex has degree < 2, no Hamiltonian cycle can exist. Prune immediately.",
        "For dense graphs (E close to n²), Ore's/Dirac's conditions often guarantee a cycle exists — check these first to skip the backtracking entirely.",
        "For n ≤ 20, prefer Held-Karp DP over backtracking: O(2ⁿ · n²) ≈ 4 million operations for n=20 vs. 20! ≈ 2.4 × 10¹⁸ in the worst case.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A Hamiltonian Cycle visits every vertex in a graph exactly once and returns to the start — a simple concept that leads to one of the most famous NP-complete problems.",
        "Backtracking is the standard exact approach: extend the path greedily, prune when stuck (no adjacent unvisited vertex), and backtrack to try alternatives.",
        "The worst-case time is O(n!) because in the worst case all permutations must be tried, but pruning makes practical performance far better on most instances.",
        "Held-Karp bitmask DP reduces the exact complexity to O(2ⁿ · n²) — the algorithm of choice when n ≤ 20 and an exact answer is required.",
        "Structural theorems (Dirac, Ore) can certify existence in polynomial time for dense graphs, allowing the expensive search to be skipped entirely.",
        "The weighted variant — Travelling Salesman Problem — is one of the most studied optimisation problems in computer science, with rich theory connecting approximation algorithms, branch-and-bound, and metaheuristics.",
      ],
    },
  },
}

export default function HamiltonianCycleVideo() {
  return <AlgoVideo config={config} />
}
