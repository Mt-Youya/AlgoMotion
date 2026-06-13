import type { AlgorithmMeta, AlgorithmRun, GraphAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "../recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const graphMstAlgorithms: Record<string, AlgorithmMeta> = {
  kruskal: {
    id: "kruskal",
    name: "Kruskal's Algorithm",
    displayName: { en: "Kruskal's Algorithm", zh: "克鲁斯卡尔算法" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "mst", "greedy", "union-find", "disjoint-set"],
    description: {
      en: "Finds a minimum spanning tree by greedily adding the smallest weight edge that doesn't form a cycle, using a Union-Find data structure.",
      zh: "使用并查集数据结构，贪婪地添加不形成环的最小权重边，从而找到最小生成树。",
    },
    timeComplexity: { best: "O(E log E)", average: "O(E log E)", worst: "O(E log E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 1584, titleSlug: "min-cost-to-connect-all-points", difficulty: "medium" },
      { id: 1135, titleSlug: "connecting-cities-with-minimum-cost", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function kruskal(n, edges) {
  // edges: [[u, v, weight], ...], returns total MST weight
  edges.sort((a, b) => a[2] - b[2]);
  const parent = Array.from({length: n}, (_, i) => i);
  const rank = new Array(n).fill(0);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x, y) {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  let total = 0;
  const mstEdges = [];
  for (const [u, v, w] of edges) {
    if (union(u, v)) { total += w; mstEdges.push([u, v, w]); }
  }
  return { total, edges: mstEdges };
}`,
      },
      {
        lang: "typescript",
        code: `function kruskal(n: number, edges: [number, number, number][]): { total: number; edges: [number, number, number][] } {
  edges = [...edges].sort((a, b) => a[2] - b[2]);
  const parent = Array.from({length: n}, (_, i) => i);
  const rank = new Array<number>(n).fill(0);
  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(x: number, y: number): boolean {
    const px = find(x), py = find(y);
    if (px === py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
  }
  let total = 0;
  const mstEdges: [number, number, number][] = [];
  for (const [u, v, w] of edges) {
    if (union(u, v)) { total += w; mstEdges.push([u, v, w]); }
  }
  return { total, edges: mstEdges };
}`,
      },
      {
        lang: "java",
        code: `public int kruskal(int n, int[][] edges) {
    Arrays.sort(edges, (a, b) -> a[2] - b[2]);
    int[] parent = new int[n];
    int[] rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int total = 0, count = 0;
    for (int[] e : edges) {
        if (union(parent, rank, e[0], e[1])) {
            total += e[2];
            if (++count == n - 1) break;
        }
    }
    return total;
}
private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}
private boolean union(int[] parent, int[] rank, int x, int y) {
    int px = find(parent, x), py = find(parent, y);
    if (px == py) return false;
    if (rank[px] < rank[py]) parent[px] = py;
    else if (rank[px] > rank[py]) parent[py] = px;
    else { parent[py] = px; rank[px]++; }
    return true;
}`,
      },
      {
        lang: "python",
        code: `def kruskal(n: int, edges: list[tuple[int, int, int]]) -> int:
    edges = sorted(edges, key=lambda e: e[2])
    parent = list(range(n))
    rank = [0] * n

    def find(x: int) -> int:
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x: int, y: int) -> bool:
        px, py = find(x), find(y)
        if px == py: return False
        if rank[px] < rank[py]: parent[px] = py
        elif rank[px] > rank[py]: parent[py] = px
        else: parent[py] = px; rank[px] += 1
        return True

    total = 0
    for u, v, w in edges:
        if union(u, v):
            total += w
    return total`,
      },
      {
        lang: "rust",
        code: `fn kruskal(n: usize, mut edges: Vec<(usize, usize, i32)>) -> i32 {
    edges.sort_by_key(|&(_, _, w)| w);
    let mut parent: Vec<usize> = (0..n).collect();
    let mut rank = vec![0usize; n];
    fn find(parent: &mut Vec<usize>, x: usize) -> usize {
        if parent[x] != x { parent[x] = find(parent, parent[x]); }
        parent[x]
    }
    fn union(parent: &mut Vec<usize>, rank: &mut Vec<usize>, x: usize, y: usize) -> bool {
        let (px, py) = (find(parent, x), find(parent, y));
        if px == py { return false; }
        if rank[px] < rank[py] { parent[px] = py; }
        else if rank[px] > rank[py] { parent[py] = px; }
        else { parent[py] = px; rank[px] += 1; }
        true
    }
    let mut total = 0;
    for (u, v, w) in edges {
        if union(&mut parent, &mut rank, u, v) { total += w; }
    }
    total
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int parent[MAXN], rnk[MAXN];

int find(int x) { return parent[x] == x ? x : (parent[x] = find(parent[x])); }
int unionSet(int x, int y) {
    int px = find(x), py = find(y);
    if (px == py) return 0;
    if (rnk[px] < rnk[py]) parent[px] = py;
    else if (rnk[px] > rnk[py]) parent[py] = px;
    else { parent[py] = px; rnk[px]++; }
    return 1;
}
int cmp(const void *a, const void *b) { return ((int*)a)[2] - ((int*)b)[2]; }
int kruskal(int n, int edges[][3], int m) {
    for (int i = 0; i < n; i++) parent[i] = i, rnk[i] = 0;
    qsort(edges, m, sizeof(edges[0]), cmp);
    int total = 0;
    for (int i = 0; i < m; i++)
        if (unionSet(edges[i][0], edges[i][1]))
            total += edges[i][2];
    return total;
}`,
      },
      {
        lang: "cpp",
        code: `#include <algorithm>
#include <numeric>
#include <vector>
using namespace std;

int kruskal(int n, vector<tuple<int,int,int>> edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b){ return get<2>(a) < get<2>(b); });
    vector<int> parent(n), rank_(n, 0);
    iota(parent.begin(), parent.end(), 0);
    function<int(int)> find = [&](int x) -> int {
        return parent[x] == x ? x : parent[x] = find(parent[x]);
    };
    auto unite = [&](int x, int y) -> bool {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank_[px] < rank_[py]) swap(px, py);
        parent[py] = px;
        if (rank_[px] == rank_[py]) rank_[px]++;
        return true;
    };
    int total = 0;
    for (auto [u, v, w] : edges)
        if (unite(u, v)) total += w;
    return total;
}`,
      },
      {
        lang: "go",
        code: `import "sort"

func kruskal(n int, edges [][3]int) int {
    sort.Slice(edges, func(i, j int) bool { return edges[i][2] < edges[j][2] })
    parent := make([]int, n)
    rank := make([]int, n)
    for i := range parent { parent[i] = i }
    var find func(int) int
    find = func(x int) int {
        if parent[x] != x { parent[x] = find(parent[x]) }
        return parent[x]
    }
    union := func(x, y int) bool {
        px, py := find(x), find(y)
        if px == py { return false }
        if rank[px] < rank[py] { parent[px] = py } else if rank[px] > rank[py] { parent[py] = px } else { parent[py] = px; rank[px]++ }
        return true
    }
    total := 0
    for _, e := range edges {
        if union(e[0], e[1]) { total += e[2] }
    }
    return total
}`,
      },
      {
        lang: "php",
        code: `function kruskal(int $n, array $edges): int {
    usort($edges, fn($a, $b) => $a[2] - $b[2]);
    $parent = range(0, $n - 1);
    $rank = array_fill(0, $n, 0);
    $find = function(int $x) use (&$parent, &$find): int {
        if ($parent[$x] !== $x) $parent[$x] = $find($parent[$x]);
        return $parent[$x];
    };
    $union = function(int $x, int $y) use (&$parent, &$rank, &$find): bool {
        $px = $find($x); $py = $find($y);
        if ($px === $py) return false;
        if ($rank[$px] < $rank[$py]) $parent[$px] = $py;
        elseif ($rank[$px] > $rank[$py]) $parent[$py] = $px;
        else { $parent[$py] = $px; $rank[$px]++; }
        return true;
    };
    $total = 0;
    foreach ($edges as [$u, $v, $w])
        if ($union($u, $v)) $total += $w;
    return $total;
}`,
      },
      {
        lang: "kotlin",
        code: `fun kruskal(n: Int, edges: List<Triple<Int, Int, Int>>): Int {
    val sorted = edges.sortedBy { it.third }
    val parent = IntArray(n) { it }
    val rank = IntArray(n)
    fun find(x: Int): Int {
        if (parent[x] != x) parent[x] = find(parent[x])
        return parent[x]
    }
    fun union(x: Int, y: Int): Boolean {
        val px = find(x); val py = find(y)
        if (px == py) return false
        when {
            rank[px] < rank[py] -> parent[px] = py
            rank[px] > rank[py] -> parent[py] = px
            else -> { parent[py] = px; rank[px]++ }
        }
        return true
    }
    var total = 0
    for ((u, v, w) in sorted) if (union(u, v)) total += w
    return total
}`,
      },
      {
        lang: "swift",
        code: `func kruskal(_ n: Int, _ edges: [(Int, Int, Int)]) -> Int {
    let sorted = edges.sorted { $0.2 < $1.2 }
    var parent = Array(0..<n)
    var rank = [Int](repeating: 0, count: n)
    func find(_ x: Int) -> Int {
        if parent[x] != x { parent[x] = find(parent[x]) }
        return parent[x]
    }
    func union(_ x: Int, _ y: Int) -> Bool {
        let px = find(x), py = find(y)
        if px == py { return false }
        if rank[px] < rank[py] { parent[px] = py }
        else if rank[px] > rank[py] { parent[py] = px }
        else { parent[py] = px; rank[px] += 1 }
        return true
    }
    var total = 0
    for (u, v, w) in sorted { if union(u, v) { total += w } }
    return total
}`,
      },
    ],
  },

  prim: {
    id: "prim",
    name: "Prim's Algorithm",
    displayName: { en: "Prim's Algorithm", zh: "普里姆算法" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "mst", "greedy", "priority-queue"],
    description: {
      en: "Builds a minimum spanning tree by starting from a vertex and greedily adding the cheapest edge connecting the current tree to a new vertex.",
      zh: "从一个顶点开始，贪婪地添加连接当前树到新顶点的最便宜的边，从而构建最小生成树。",
    },
    timeComplexity: { best: "O((V+E) log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 1584, titleSlug: "min-cost-to-connect-all-points", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function prim(graph, start) {
  // graph: Map<node, Array<[neighbor, weight]>>
  const inMST = new Set([start]);
  let total = 0;
  // Collect all edges from start
  const edges = [...(graph.get(start) || [])].map(([v, w]) => [w, start, v]);
  edges.sort((a, b) => a[0] - b[0]);
  while (edges.length > 0) {
    edges.sort((a, b) => a[0] - b[0]);
    const [w, u, v] = edges.shift();
    if (inMST.has(v)) continue;
    inMST.add(v); total += w;
    for (const [nb, nw] of (graph.get(v) || []))
      if (!inMST.has(nb)) edges.push([nw, v, nb]);
  }
  return total;
}`,
      },
      {
        lang: "typescript",
        code: `function prim(graph: Map<number, [number, number][]>, start: number): number {
  const inMST = new Set<number>([start]);
  let total = 0;
  const edges: [number, number, number][] = (graph.get(start) ?? []).map(([v, w]) => [w, start, v]);
  while (edges.length > 0) {
    edges.sort((a, b) => a[0] - b[0]);
    const [w, , v] = edges.shift()!;
    if (inMST.has(v)) continue;
    inMST.add(v); total += w;
    for (const [nb, nw] of (graph.get(v) ?? []))
      if (!inMST.has(nb)) edges.push([nw, v, nb]);
  }
  return total;
}`,
      },
      {
        lang: "java",
        code: `public int prim(List<int[]>[] graph, int n) {
    boolean[] inMST = new boolean[n];
    // PriorityQueue: [weight, node]
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.offer(new int[]{0, 0});
    int total = 0;
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int w = cur[0], u = cur[1];
        if (inMST[u]) continue;
        inMST[u] = true; total += w;
        for (int[] edge : graph[u]) {
            if (!inMST[edge[0]])
                pq.offer(new int[]{edge[1], edge[0]});
        }
    }
    return total;
}`,
      },
      {
        lang: "python",
        code: `import heapq

def prim(graph: dict[int, list[tuple[int, int]]], start: int) -> int:
    in_mst: set[int] = set()
    heap = [(0, start)]  # (weight, node)
    total = 0
    while heap:
        w, u = heapq.heappop(heap)
        if u in in_mst:
            continue
        in_mst.add(u)
        total += w
        for v, nw in graph.get(u, []):
            if v not in in_mst:
                heapq.heappush(heap, (nw, v))
    return total`,
      },
      {
        lang: "rust",
        code: `use std::collections::{BinaryHeap, HashMap, HashSet};
use std::cmp::Reverse;

fn prim(graph: &HashMap<i32, Vec<(i32, i32)>>, start: i32) -> i32 {
    let mut in_mst = HashSet::new();
    let mut heap = BinaryHeap::from([Reverse((0, start))]);
    let mut total = 0;
    while let Some(Reverse((w, u))) = heap.pop() {
        if !in_mst.insert(u) { continue; }
        total += w;
        if let Some(neighbors) = graph.get(&u) {
            for &(v, nw) in neighbors {
                if !in_mst.contains(&v) { heap.push(Reverse((nw, v))); }
            }
        }
    }
    total
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
#define INF 0x3f3f3f3f

int key[MAXN];
int inMST[MAXN];

int prim(int graph[][MAXN], int n) {
    for (int i = 0; i < n; i++) key[i] = INF, inMST[i] = 0;
    key[0] = 0;
    int total = 0;
    for (int iter = 0; iter < n; iter++) {
        int u = -1;
        for (int i = 0; i < n; i++)
            if (!inMST[i] && (u == -1 || key[i] < key[u])) u = i;
        inMST[u] = 1; total += key[u];
        for (int v = 0; v < n; v++)
            if (graph[u][v] && !inMST[v] && graph[u][v] < key[v])
                key[v] = graph[u][v];
    }
    return total;
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <vector>
#include <climits>
using namespace std;

int prim(const vector<vector<pair<int,int>>>& graph) {
    int n = graph.size();
    vector<bool> inMST(n, false);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, 0});
    int total = 0;
    while (!pq.empty()) {
        auto [w, u] = pq.top(); pq.pop();
        if (inMST[u]) continue;
        inMST[u] = true; total += w;
        for (auto [v, nw] : graph[u])
            if (!inMST[v]) pq.push({nw, v});
    }
    return total;
}`,
      },
      {
        lang: "go",
        code: `import "container/heap"

type Item struct{ w, node int }
type PQ []Item
func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].w < p[j].w }
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i] }
func (p *PQ) Push(x interface{}) { *p = append(*p, x.(Item)) }
func (p *PQ) Pop() interface{}   { old := *p; n := len(old); x := old[n-1]; *p = old[:n-1]; return x }

func prim(graph map[int][][2]int, start int) int {
    inMST := map[int]bool{}
    pq := &PQ{{0, start}}
    heap.Init(pq)
    total := 0
    for pq.Len() > 0 {
        cur := heap.Pop(pq).(Item)
        if inMST[cur.node] { continue }
        inMST[cur.node] = true; total += cur.w
        for _, e := range graph[cur.node] {
            if !inMST[e[0]] { heap.Push(pq, Item{e[1], e[0]}) }
        }
    }
    return total
}`,
      },
      {
        lang: "php",
        code: `function prim(array $graph, int $start): int {
    $inMST = [];
    $pq = [[0, $start]]; // [weight, node]
    $total = 0;
    while (!empty($pq)) {
        usort($pq, fn($a, $b) => $a[0] - $b[0]);
        [$w, $u] = array_shift($pq);
        if (isset($inMST[$u])) continue;
        $inMST[$u] = true; $total += $w;
        foreach ($graph[$u] ?? [] as [$v, $nw])
            if (!isset($inMST[$v])) $pq[] = [$nw, $v];
    }
    return $total;
}`,
      },
      {
        lang: "kotlin",
        code: `import java.util.PriorityQueue

fun prim(graph: Map<Int, List<Pair<Int, Int>>>, start: Int): Int {
    val inMST = mutableSetOf<Int>()
    val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })
    pq.add(0 to start)
    var total = 0
    while (pq.isNotEmpty()) {
        val (w, u) = pq.poll()
        if (!inMST.add(u)) continue
        total += w
        for ((v, nw) in graph[u] ?: emptyList())
            if (v !in inMST) pq.add(nw to v)
    }
    return total
}`,
      },
      {
        lang: "swift",
        code: `func prim(_ graph: [Int: [(Int, Int)]], _ start: Int) -> Int {
    var inMST: Set<Int> = []
    var pq: [(Int, Int)] = [(0, start)] // (weight, node)
    var total = 0
    while !pq.isEmpty {
        pq.sort { $0.0 < $1.0 }
        let (w, u) = pq.removeFirst()
        guard inMST.insert(u).inserted else { continue }
        total += w
        for (v, nw) in graph[u] ?? [] where !inMST.contains(v) {
            pq.append((nw, v))
        }
    }
    return total
}`,
      },
    ],
  },
}

// ─── Runners ──────────────────────────────────────────────────────────────────

export function kruskal(input: number[]): AlgorithmRun {
  return {
    algorithm: graphMstAlgorithms["kruskal"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function prim(input: number[]): AlgorithmRun {
  return {
    algorithm: graphMstAlgorithms["prim"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function runGraphMstAlgorithm(algorithmId: GraphAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "kruskal":
      return kruskal(input)
    case "prim":
      return prim(input)
    default:
      throw new Error(`Unknown MST algorithm: ${algorithmId}`)
  }
}
