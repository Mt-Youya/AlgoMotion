import type { AlgorithmMeta, AlgorithmRun, GraphAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "../recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const graphShortestPathAlgorithms: Record<string, AlgorithmMeta> = {
  dijkstra: {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    displayName: { en: "Dijkstra's Algorithm", zh: "迪杰斯特拉算法" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "shortest-path", "greedy", "priority-queue"],
    description: {
      en: "Finds the shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights using a priority queue.",
      zh: "使用优先队列在非负权重图中找到从源顶点到所有其他顶点的最短路径。",
    },
    timeComplexity: { best: "O((V+E) log V)", average: "O((V+E) log V)", worst: "O((V+E) log V)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 743, titleSlug: "network-delay-time", difficulty: "medium" },
      { id: 1514, titleSlug: "path-with-maximum-probability", difficulty: "medium" },
      { id: 1631, titleSlug: "path-with-minimum-effort", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function dijkstra(graph, src) {
  // graph: Map<node, Array<[neighbor, weight]>>
  const dist = new Map();
  const pq = [[0, src]]; // [distance, node]
  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(src, 0);
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist.get(u)) continue;
    for (const [v, w] of (graph.get(u) || [])) {
      const nd = d + w;
      if (nd < dist.get(v)) {
        dist.set(v, nd);
        pq.push([nd, v]);
      }
    }
  }
  return dist;
}`,
      },
      {
        lang: "typescript",
        code: `function dijkstra(graph: Map<number, [number, number][]>, src: number): Map<number, number> {
  const dist = new Map<number, number>();
  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(src, 0);
  // [distance, node]
  const pq: [number, number][] = [[0, src]];
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;
    if (d > (dist.get(u) ?? Infinity)) continue;
    for (const [v, w] of (graph.get(u) ?? [])) {
      const nd = d + w;
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd);
        pq.push([nd, v]);
      }
    }
  }
  return dist;
}`,
      },
      {
        lang: "java",
        code: `public int[] dijkstra(List<int[]>[] graph, int src, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    // PriorityQueue: [distance, node]
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.offer(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] cur = pq.poll();
        int d = cur[0], u = cur[1];
        if (d > dist[u]) continue;
        for (int[] edge : graph[u]) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
      },
      {
        lang: "python",
        code: `import heapq

def dijkstra(graph: dict[int, list[tuple[int, int]]], src: int) -> dict[int, float]:
    dist: dict[int, float] = {node: float('inf') for node in graph}
    dist[src] = 0
    heap = [(0, src)]  # (distance, node)
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, w in graph.get(u, []):
            nd = d + w
            if nd < dist[v]:
                dist[v] = nd
                heapq.heappush(heap, (nd, v))
    return dist`,
      },
      {
        lang: "rust",
        code: `use std::collections::{BinaryHeap, HashMap};
use std::cmp::Reverse;

fn dijkstra(graph: &HashMap<i32, Vec<(i32, i32)>>, src: i32) -> HashMap<i32, i32> {
    let mut dist: HashMap<i32, i32> = graph.keys().map(|&k| (k, i32::MAX)).collect();
    dist.insert(src, 0);
    let mut heap = BinaryHeap::from([Reverse((0, src))]);
    while let Some(Reverse((d, u))) = heap.pop() {
        if d > *dist.get(&u).unwrap_or(&i32::MAX) { continue; }
        if let Some(neighbors) = graph.get(&u) {
            for &(v, w) in neighbors {
                let nd = d + w;
                if nd < *dist.get(&v).unwrap_or(&i32::MAX) {
                    dist.insert(v, nd);
                    heap.push(Reverse((nd, v)));
                }
            }
        }
    }
    dist
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
#define INF 0x3f3f3f3f

int dist[MAXN];
int visited[MAXN];

void dijkstra(int graph[][MAXN], int n, int src) {
    for (int i = 0; i < n; i++) dist[i] = INF, visited[i] = 0;
    dist[src] = 0;
    for (int iter = 0; iter < n - 1; iter++) {
        int u = -1;
        for (int i = 0; i < n; i++)
            if (!visited[i] && (u == -1 || dist[i] < dist[u])) u = i;
        if (u == -1 || dist[u] == INF) break;
        visited[u] = 1;
        for (int v = 0; v < n; v++) {
            if (graph[u][v] && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <vector>
#include <climits>
using namespace std;

vector<int> dijkstra(const vector<vector<pair<int,int>>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      },
      {
        lang: "go",
        code: `import "container/heap"

type Item struct{ dist, node int }
type PQ []Item
func (p PQ) Len() int            { return len(p) }
func (p PQ) Less(i, j int) bool  { return p[i].dist < p[j].dist }
func (p PQ) Swap(i, j int)       { p[i], p[j] = p[j], p[i] }
func (p *PQ) Push(x interface{}) { *p = append(*p, x.(Item)) }
func (p *PQ) Pop() interface{}   { old := *p; n := len(old); x := old[n-1]; *p = old[:n-1]; return x }

func dijkstra(graph map[int][][2]int, src int) map[int]int {
    dist := map[int]int{}
    for node := range graph { dist[node] = 1<<31 - 1 }
    dist[src] = 0
    pq := &PQ{{0, src}}
    heap.Init(pq)
    for pq.Len() > 0 {
        cur := heap.Pop(pq).(Item)
        if cur.dist > dist[cur.node] { continue }
        for _, e := range graph[cur.node] {
            v, w := e[0], e[1]
            if nd := cur.dist + w; nd < dist[v] {
                dist[v] = nd
                heap.Push(pq, Item{nd, v})
            }
        }
    }
    return dist
}`,
      },
      {
        lang: "php",
        code: `function dijkstra(array $graph, int $src): array {
    $dist = [];
    foreach (array_keys($graph) as $node) $dist[$node] = PHP_INT_MAX;
    $dist[$src] = 0;
    $pq = [[0, $src]];
    while (!empty($pq)) {
        usort($pq, fn($a, $b) => $a[0] - $b[0]);
        [$d, $u] = array_shift($pq);
        if ($d > $dist[$u]) continue;
        foreach ($graph[$u] ?? [] as [$v, $w]) {
            $nd = $d + $w;
            if ($nd < ($dist[$v] ?? PHP_INT_MAX)) {
                $dist[$v] = $nd;
                $pq[] = [$nd, $v];
            }
        }
    }
    return $dist;
}`,
      },
      {
        lang: "kotlin",
        code: `import java.util.PriorityQueue

fun dijkstra(graph: Map<Int, List<Pair<Int, Int>>>, src: Int): Map<Int, Int> {
    val dist = graph.keys.associateWith { Int.MAX_VALUE }.toMutableMap()
    dist[src] = 0
    val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.first })
    pq.add(0 to src)
    while (pq.isNotEmpty()) {
        val (d, u) = pq.poll()
        if (d > (dist[u] ?: Int.MAX_VALUE)) continue
        for ((v, w) in graph[u] ?: emptyList()) {
            val nd = d + w
            if (nd < (dist[v] ?: Int.MAX_VALUE)) {
                dist[v] = nd
                pq.add(nd to v)
            }
        }
    }
    return dist
}`,
      },
      {
        lang: "swift",
        code: `func dijkstra(_ graph: [Int: [(Int, Int)]], _ src: Int) -> [Int: Int] {
    var dist: [Int: Int] = graph.keys.reduce(into: [:]) { $0[$1] = Int.max }
    dist[src] = 0
    // (distance, node) min-heap via sorted array for simplicity
    var pq: [(Int, Int)] = [(0, src)]
    while !pq.isEmpty {
        pq.sort { $0.0 < $1.0 }
        let (d, u) = pq.removeFirst()
        if d > (dist[u] ?? Int.max) { continue }
        for (v, w) in graph[u] ?? [] {
            let nd = d + w
            if nd < (dist[v] ?? Int.max) {
                dist[v] = nd
                pq.append((nd, v))
            }
        }
    }
    return dist
}`,
      },
    ],
  },

  "bellman-ford": {
    id: "bellman-ford",
    name: "Bellman-Ford Algorithm",
    displayName: { en: "Bellman-Ford Algorithm", zh: "贝尔曼-福特算法" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "shortest-path", "dynamic-programming", "negative-weights"],
    description: {
      en: "Finds shortest paths from a source vertex even with negative edge weights. Detects negative cycles by relaxing all edges V-1 times.",
      zh: "即使存在负权重边也能找到从源顶点出发的最短路径。通过对所有边进行 V-1 次松弛来检测负环。",
    },
    timeComplexity: { best: "O(VE)", average: "O(VE)", worst: "O(VE)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 743, titleSlug: "network-delay-time", difficulty: "medium" },
      { id: 787, titleSlug: "cheapest-flights-within-k-stops", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function bellmanFord(n, edges, src) {
  // edges: [[u, v, w], ...]
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v])
        dist[v] = dist[u] + w;
    }
  }
  // Check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v])
      return null; // negative cycle detected
  }
  return dist;
}`,
      },
      {
        lang: "typescript",
        code: `function bellmanFord(n: number, edges: [number, number, number][], src: number): number[] | null {
  const dist = new Array<number>(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v])
        dist[v] = dist[u] + w;
    }
  }
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v])
      return null;
  }
  return dist;
}`,
      },
      {
        lang: "java",
        code: `public int[] bellmanFord(int n, int[][] edges, int src) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int[] e : edges) {
            int u = e[0], v = e[1], w = e[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    for (int[] e : edges) {
        if (dist[e[0]] != Integer.MAX_VALUE && dist[e[0]] + e[2] < dist[e[1]])
            return null; // negative cycle
    }
    return dist;
}`,
      },
      {
        lang: "python",
        code: `def bellman_ford(n: int, edges: list[tuple[int, int, int]], src: int) -> list[float] | None:
    dist = [float('inf')] * n
    dist[src] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # negative cycle
    return dist`,
      },
      {
        lang: "rust",
        code: `fn bellman_ford(n: usize, edges: &[(usize, usize, i32)], src: usize) -> Option<Vec<i32>> {
    let mut dist = vec![i32::MAX; n];
    dist[src] = 0;
    for _ in 0..n - 1 {
        for &(u, v, w) in edges {
            if dist[u] != i32::MAX && dist[u] + w < dist[v] {
                dist[v] = dist[u] + w;
            }
        }
    }
    for &(u, v, w) in edges {
        if dist[u] != i32::MAX && dist[u] + w < dist[v] {
            return None; // negative cycle
        }
    }
    Some(dist)
}`,
      },
      {
        lang: "c",
        code: `#define INF 0x3f3f3f3f
#define MAXN 1000

void bellmanFord(int n, int edges[][3], int m, int src, int *dist) {
    for (int i = 0; i < n; i++) dist[i] = INF;
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < m; j++) {
            int u = edges[j][0], v = edges[j][1], w = edges[j][2];
            if (dist[u] != INF && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <climits>
using namespace std;

vector<int> bellmanFord(int n, const vector<tuple<int,int,int>>& edges, int src) {
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    for (int i = 0; i < n - 1; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v])
                dist[v] = dist[u] + w;
        }
    }
    for (auto [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v])
            return {}; // negative cycle
    }
    return dist;
}`,
      },
      {
        lang: "go",
        code: `func bellmanFord(n int, edges [][3]int, src int) ([]int, bool) {
    dist := make([]int, n)
    for i := range dist { dist[i] = 1<<31 - 1 }
    dist[src] = 0
    for i := 0; i < n-1; i++ {
        for _, e := range edges {
            u, v, w := e[0], e[1], e[2]
            if dist[u] != 1<<31-1 && dist[u]+w < dist[v] {
                dist[v] = dist[u] + w
            }
        }
    }
    for _, e := range edges {
        if dist[e[0]] != 1<<31-1 && dist[e[0]]+e[2] < dist[e[1]] {
            return nil, false // negative cycle
        }
    }
    return dist, true
}`,
      },
      {
        lang: "php",
        code: `function bellmanFord(int $n, array $edges, int $src): ?array {
    $dist = array_fill(0, $n, PHP_INT_MAX);
    $dist[$src] = 0;
    for ($i = 0; $i < $n - 1; $i++) {
        foreach ($edges as [$u, $v, $w]) {
            if ($dist[$u] !== PHP_INT_MAX && $dist[$u] + $w < $dist[$v])
                $dist[$v] = $dist[$u] + $w;
        }
    }
    foreach ($edges as [$u, $v, $w]) {
        if ($dist[$u] !== PHP_INT_MAX && $dist[$u] + $w < $dist[$v])
            return null;
    }
    return $dist;
}`,
      },
      {
        lang: "kotlin",
        code: `fun bellmanFord(n: Int, edges: List<Triple<Int, Int, Int>>, src: Int): IntArray? {
    val dist = IntArray(n) { Int.MAX_VALUE }
    dist[src] = 0
    repeat(n - 1) {
        for ((u, v, w) in edges) {
            if (dist[u] != Int.MAX_VALUE && dist[u] + w < dist[v])
                dist[v] = dist[u] + w
        }
    }
    for ((u, v, w) in edges) {
        if (dist[u] != Int.MAX_VALUE && dist[u] + w < dist[v])
            return null // negative cycle
    }
    return dist
}`,
      },
      {
        lang: "swift",
        code: `func bellmanFord(_ n: Int, _ edges: [(Int, Int, Int)], _ src: Int) -> [Int]? {
    var dist = [Int](repeating: Int.max, count: n)
    dist[src] = 0
    for _ in 0..<n - 1 {
        for (u, v, w) in edges {
            if dist[u] != Int.max && dist[u] + w < dist[v] {
                dist[v] = dist[u] + w
            }
        }
    }
    for (u, v, w) in edges {
        if dist[u] != Int.max && dist[u] + w < dist[v] { return nil }
    }
    return dist
}`,
      },
    ],
  },

  "floyd-warshall": {
    id: "floyd-warshall",
    name: "Floyd-Warshall Algorithm",
    displayName: { en: "Floyd-Warshall Algorithm", zh: "弗洛伊德-沃舍尔算法" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "shortest-path", "dynamic-programming", "all-pairs"],
    description: {
      en: "Computes shortest paths between all pairs of vertices using dynamic programming. Handles negative weights but not negative cycles.",
      zh: "使用动态规划计算所有顶点对之间的最短路径。可以处理负权重，但不能处理负环。",
    },
    timeComplexity: { best: "O(V³)", average: "O(V³)", worst: "O(V³)" },
    spaceComplexity: "O(V²)",
    relatedProblems: [
      {
        id: 1334,
        titleSlug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
        difficulty: "medium",
      },
      { id: 1462, titleSlug: "course-schedule-iv", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function floydWarshall(dist) {
  // dist[i][j] = weight of edge i->j, Infinity if no edge
  const n = dist.length;
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}`,
      },
      {
        lang: "typescript",
        code: `function floydWarshall(dist: number[][]): number[][] {
  const n = dist.length;
  for (let k = 0; k < n; k++)
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];
  return dist;
}`,
      },
      {
        lang: "java",
        code: `public void floydWarshall(int[][] dist) {
    int n = dist.length;
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] != Integer.MAX_VALUE && dist[k][j] != Integer.MAX_VALUE
                    && dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
}`,
      },
      {
        lang: "python",
        code: `def floyd_warshall(dist: list[list[float]]) -> list[list[float]]:
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
      },
      {
        lang: "rust",
        code: `fn floyd_warshall(dist: &mut Vec<Vec<i64>>) {
    let n = dist.len();
    for k in 0..n {
        for i in 0..n {
            for j in 0..n {
                if dist[i][k] != i64::MAX && dist[k][j] != i64::MAX {
                    let nd = dist[i][k] + dist[k][j];
                    if nd < dist[i][j] { dist[i][j] = nd; }
                }
            }
        }
    }
}`,
      },
      {
        lang: "c",
        code: `#define INF 1e9
void floydWarshall(double dist[][1000], int n) {
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <climits>
using namespace std;

void floydWarshall(vector<vector<int>>& dist) {
    int n = dist.size();
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i][k] != INT_MAX && dist[k][j] != INT_MAX)
                    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
}`,
      },
      {
        lang: "go",
        code: `func floydWarshall(dist [][]int) {
    n := len(dist)
    for k := 0; k < n; k++ {
        for i := 0; i < n; i++ {
            for j := 0; j < n; j++ {
                if dist[i][k]+dist[k][j] < dist[i][j] {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
}`,
      },
      {
        lang: "php",
        code: `function floydWarshall(array &$dist): void {
    $n = count($dist);
    for ($k = 0; $k < $n; $k++)
        for ($i = 0; $i < $n; $i++)
            for ($j = 0; $j < $n; $j++)
                if ($dist[$i][$k] + $dist[$k][$j] < $dist[$i][$j])
                    $dist[$i][$j] = $dist[$i][$k] + $dist[$k][$j];
}`,
      },
      {
        lang: "kotlin",
        code: `fun floydWarshall(dist: Array<IntArray>) {
    val n = dist.size
    for (k in 0 until n)
        for (i in 0 until n)
            for (j in 0 until n)
                if (dist[i][k] != Int.MAX_VALUE && dist[k][j] != Int.MAX_VALUE)
                    dist[i][j] = minOf(dist[i][j], dist[i][k] + dist[k][j])
}`,
      },
      {
        lang: "swift",
        code: `func floydWarshall(_ dist: inout [[Int]]) {
    let n = dist.count
    for k in 0..<n {
        for i in 0..<n {
            for j in 0..<n {
                let via = dist[i][k] == Int.max || dist[k][j] == Int.max
                    ? Int.max : dist[i][k] + dist[k][j]
                if via < dist[i][j] { dist[i][j] = via }
            }
        }
    }
}`,
      },
    ],
  },

  spfa: {
    id: "spfa",
    name: "Shortest Path Faster Algorithm",
    displayName: { en: "SPFA (Shortest Path Faster Algorithm)", zh: "最短路径快速算法（SPFA）" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "shortest-path", "queue", "bellman-ford-optimization"],
    description: {
      en: "An optimized Bellman-Ford using a queue to only relax edges of vertices whose distance was just updated. Average case much faster than Bellman-Ford.",
      zh: "使用队列优化的贝尔曼-福特算法，仅松弛距离刚更新的顶点的出边。平均情况比贝尔曼-福特快很多。",
    },
    timeComplexity: { best: "O(E)", average: "O(E)", worst: "O(VE)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 743, titleSlug: "network-delay-time", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function spfa(graph, src) {
  // graph: Map<node, Array<[neighbor, weight]>>
  const dist = new Map();
  const inQueue = new Set();
  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(src, 0);
  const queue = [src];
  inQueue.add(src);
  while (queue.length > 0) {
    const u = queue.shift();
    inQueue.delete(u);
    for (const [v, w] of (graph.get(u) || [])) {
      const nd = dist.get(u) + w;
      if (nd < dist.get(v)) {
        dist.set(v, nd);
        if (!inQueue.has(v)) { queue.push(v); inQueue.add(v); }
      }
    }
  }
  return dist;
}`,
      },
      {
        lang: "typescript",
        code: `function spfa(graph: Map<number, [number, number][]>, src: number): Map<number, number> {
  const dist = new Map<number, number>();
  const inQueue = new Set<number>();
  for (const node of graph.keys()) dist.set(node, Infinity);
  dist.set(src, 0);
  const queue: number[] = [src];
  inQueue.add(src);
  while (queue.length > 0) {
    const u = queue.shift()!;
    inQueue.delete(u);
    for (const [v, w] of (graph.get(u) ?? [])) {
      const nd = (dist.get(u) ?? Infinity) + w;
      if (nd < (dist.get(v) ?? Infinity)) {
        dist.set(v, nd);
        if (!inQueue.has(v)) { queue.push(v); inQueue.add(v); }
      }
    }
  }
  return dist;
}`,
      },
      {
        lang: "java",
        code: `public int[] spfa(List<int[]>[] graph, int src, int n) {
    int[] dist = new int[n];
    boolean[] inQueue = new boolean[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(src);
    inQueue[src] = true;
    while (!queue.isEmpty()) {
        int u = queue.poll();
        inQueue[u] = false;
        for (int[] edge : graph[u]) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQueue[v]) { queue.offer(v); inQueue[v] = true; }
            }
        }
    }
    return dist;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def spfa(graph: dict[int, list[tuple[int, int]]], src: int) -> dict[int, float]:
    dist: dict[int, float] = {node: float('inf') for node in graph}
    dist[src] = 0
    in_queue: set[int] = {src}
    queue: deque[int] = deque([src])
    while queue:
        u = queue.popleft()
        in_queue.discard(u)
        for v, w in graph.get(u, []):
            nd = dist[u] + w
            if nd < dist.get(v, float('inf')):
                dist[v] = nd
                if v not in in_queue:
                    queue.append(v)
                    in_queue.add(v)
    return dist`,
      },
      {
        lang: "rust",
        code: `use std::collections::{HashMap, HashSet, VecDeque};

fn spfa(graph: &HashMap<i32, Vec<(i32, i32)>>, src: i32) -> HashMap<i32, i32> {
    let mut dist: HashMap<i32, i32> = graph.keys().map(|&k| (k, i32::MAX)).collect();
    dist.insert(src, 0);
    let mut in_queue: HashSet<i32> = [src].into();
    let mut queue: VecDeque<i32> = VecDeque::from([src]);
    while let Some(u) = queue.pop_front() {
        in_queue.remove(&u);
        if let Some(neighbors) = graph.get(&u) {
            let du = *dist.get(&u).unwrap_or(&i32::MAX);
            for &(v, w) in neighbors {
                let nd = du.saturating_add(w);
                if nd < *dist.get(&v).unwrap_or(&i32::MAX) {
                    dist.insert(v, nd);
                    if in_queue.insert(v) { queue.push_back(v); }
                }
            }
        }
    }
    dist
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
#define INF 0x3f3f3f3f

int dist[MAXN];
int inQueue[MAXN];
int queue[MAXN * 10];

void spfa(int graph[][MAXN], int weight[][MAXN], int n, int src) {
    for (int i = 0; i < n; i++) dist[i] = INF, inQueue[i] = 0;
    dist[src] = 0;
    int front = 0, rear = 0;
    queue[rear++] = src; inQueue[src] = 1;
    while (front < rear) {
        int u = queue[front++]; inQueue[u] = 0;
        for (int v = 0; v < n; v++) {
            if (graph[u][v] && dist[u] + weight[u][v] < dist[v]) {
                dist[v] = dist[u] + weight[u][v];
                if (!inQueue[v]) { queue[rear++] = v; inQueue[v] = 1; }
            }
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <vector>
#include <climits>
using namespace std;

vector<int> spfa(const vector<vector<pair<int,int>>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    vector<bool> inQ(n, false);
    dist[src] = 0;
    queue<int> q;
    q.push(src); inQ[src] = true;
    while (!q.empty()) {
        int u = q.front(); q.pop(); inQ[u] = false;
        for (auto [v, w] : graph[u]) {
            if (dist[u] != INT_MAX && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (!inQ[v]) { q.push(v); inQ[v] = true; }
            }
        }
    }
    return dist;
}`,
      },
      {
        lang: "go",
        code: `func spfa(graph map[int][][2]int, src int) map[int]int {
    dist := map[int]int{}
    for node := range graph { dist[node] = 1<<31 - 1 }
    dist[src] = 0
    inQueue := map[int]bool{src: true}
    queue := []int{src}
    for len(queue) > 0 {
        u := queue[0]; queue = queue[1:]
        inQueue[u] = false
        for _, e := range graph[u] {
            v, w := e[0], e[1]
            if nd := dist[u] + w; nd < dist[v] {
                dist[v] = nd
                if !inQueue[v] { queue = append(queue, v); inQueue[v] = true }
            }
        }
    }
    return dist
}`,
      },
      {
        lang: "php",
        code: `function spfa(array $graph, int $src): array {
    $dist = [];
    foreach (array_keys($graph) as $node) $dist[$node] = PHP_INT_MAX;
    $dist[$src] = 0;
    $inQueue = [$src => true];
    $queue = [$src];
    while (!empty($queue)) {
        $u = array_shift($queue);
        unset($inQueue[$u]);
        foreach ($graph[$u] ?? [] as [$v, $w]) {
            $nd = $dist[$u] + $w;
            if ($nd < ($dist[$v] ?? PHP_INT_MAX)) {
                $dist[$v] = $nd;
                if (!isset($inQueue[$v])) { $queue[] = $v; $inQueue[$v] = true; }
            }
        }
    }
    return $dist;
}`,
      },
      {
        lang: "kotlin",
        code: `fun spfa(graph: Map<Int, List<Pair<Int, Int>>>, src: Int): Map<Int, Int> {
    val dist = graph.keys.associateWith { Int.MAX_VALUE }.toMutableMap()
    dist[src] = 0
    val inQueue = mutableSetOf(src)
    val queue = ArrayDeque<Int>().also { it.add(src) }
    while (queue.isNotEmpty()) {
        val u = queue.removeFirst()
        inQueue.remove(u)
        for ((v, w) in graph[u] ?: emptyList()) {
            val nd = (dist[u] ?: Int.MAX_VALUE) + w
            if (nd < (dist[v] ?: Int.MAX_VALUE)) {
                dist[v] = nd
                if (inQueue.add(v)) queue.add(v)
            }
        }
    }
    return dist
}`,
      },
      {
        lang: "swift",
        code: `func spfa(_ graph: [Int: [(Int, Int)]], _ src: Int) -> [Int: Int] {
    var dist: [Int: Int] = graph.keys.reduce(into: [:]) { $0[$1] = Int.max }
    dist[src] = 0
    var inQueue: Set<Int> = [src]
    var queue: [Int] = [src]
    var head = 0
    while head < queue.count {
        let u = queue[head]; head += 1
        inQueue.remove(u)
        for (v, w) in graph[u] ?? [] {
            let nd = (dist[u] ?? Int.max) + w
            if nd < (dist[v] ?? Int.max) {
                dist[v] = nd
                if inQueue.insert(v).inserted { queue.append(v) }
            }
        }
    }
    return dist
}`,
      },
    ],
  },
}

// ─── Runners ──────────────────────────────────────────────────────────────────

export function dijkstra(input: number[]): AlgorithmRun {
  return {
    algorithm: graphShortestPathAlgorithms["dijkstra"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function bellmanFord(input: number[]): AlgorithmRun {
  return {
    algorithm: graphShortestPathAlgorithms["bellman-ford"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function floydWarshall(input: number[]): AlgorithmRun {
  return {
    algorithm: graphShortestPathAlgorithms["floyd-warshall"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function spfa(input: number[]): AlgorithmRun {
  return {
    algorithm: graphShortestPathAlgorithms["spfa"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function runGraphShortestPathAlgorithm(algorithmId: GraphAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "dijkstra":
      return dijkstra(input)
    case "bellman-ford":
      return bellmanFord(input)
    case "floyd-warshall":
      return floydWarshall(input)
    case "spfa":
      return spfa(input)
    default:
      throw new Error(`Unknown shortest-path algorithm: ${algorithmId}`)
  }
}
