import type { AlgorithmMeta, AlgorithmRun, GraphAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "../recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const graphTopologyAlgorithms: Record<string, AlgorithmMeta> = {
  "topological-sort": {
    id: "topological-sort",
    name: "Topological Sort",
    displayName: { en: "Topological Sort", zh: "拓扑排序" },
    category: "graph",
    difficulty: "intermediate",
    tags: ["graph", "dag", "dfs", "bfs", "kahn"],
    description: {
      en: "Linear ordering of vertices in a DAG such that for every directed edge u→v, u comes before v. Can be done via DFS (post-order) or Kahn's BFS algorithm.",
      zh: "对有向无环图（DAG）中顶点的线性排序，使得对于每条有向边 u→v，u 排在 v 之前。可通过 DFS（后序）或 Kahn 的 BFS 算法实现。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 207, titleSlug: "course-schedule", difficulty: "medium" },
      { id: 210, titleSlug: "course-schedule-ii", difficulty: "medium" },
      { id: 269, titleSlug: "alien-dictionary", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Kahn's algorithm (BFS-based)
function topologicalSort(n, edges) {
  const adj = Array.from({length: n}, () => []);
  const indegree = new Array(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); indegree[v]++; }
  const queue = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u]) { if (--indegree[v] === 0) queue.push(v); }
  }
  return order.length === n ? order : []; // empty = cycle detected
}`,
      },
      {
        lang: "typescript",
        code: `function topologicalSort(n: number, edges: [number, number][]): number[] {
  const adj: number[][] = Array.from({length: n}, () => []);
  const indegree = new Array<number>(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); indegree[v]++; }
  const queue: number[] = [];
  for (let i = 0; i < n; i++) if (indegree[i] === 0) queue.push(i);
  const order: number[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    order.push(u);
    for (const v of adj[u]) if (--indegree[v] === 0) queue.push(v);
  }
  return order.length === n ? order : [];
}`,
      },
      {
        lang: "java",
        code: `public int[] topologicalSort(int n, int[][] edges) {
    List<List<Integer>> adj = new ArrayList<>();
    int[] indegree = new int[n];
    for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
    for (int[] e : edges) { adj.get(e[0]).add(e[1]); indegree[e[1]]++; }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++) if (indegree[i] == 0) queue.offer(i);
    int[] order = new int[n]; int idx = 0;
    while (!queue.isEmpty()) {
        int u = queue.poll(); order[idx++] = u;
        for (int v : adj.get(u)) if (--indegree[v] == 0) queue.offer(v);
    }
    return idx == n ? order : new int[0];
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def topological_sort(n: int, edges: list[tuple[int, int]]) -> list[int]:
    adj: list[list[int]] = [[] for _ in range(n)]
    indegree = [0] * n
    for u, v in edges:
        adj[u].append(v)
        indegree[v] += 1
    queue = deque(i for i in range(n) if indegree[i] == 0)
    order: list[int] = []
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            indegree[v] -= 1
            if indegree[v] == 0:
                queue.append(v)
    return order if len(order) == n else []`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;

fn topological_sort(n: usize, edges: &[(usize, usize)]) -> Vec<usize> {
    let mut adj = vec![vec![]; n];
    let mut indegree = vec![0usize; n];
    for &(u, v) in edges { adj[u].push(v); indegree[v] += 1; }
    let mut queue: VecDeque<usize> = (0..n).filter(|&i| indegree[i] == 0).collect();
    let mut order = Vec::new();
    while let Some(u) = queue.pop_front() {
        order.push(u);
        for &v in &adj[u] {
            indegree[v] -= 1;
            if indegree[v] == 0 { queue.push_back(v); }
        }
    }
    if order.len() == n { order } else { vec![] }
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int adj[MAXN][MAXN], indegree[MAXN], queue[MAXN], order[MAXN];

int topoSort(int n, int edges[][2], int m) {
    memset(indegree, 0, sizeof(indegree));
    for (int i = 0; i < m; i++) { adj[edges[i][0]][edges[i][1]] = 1; indegree[edges[i][1]]++; }
    int front = 0, rear = 0, idx = 0;
    for (int i = 0; i < n; i++) if (!indegree[i]) queue[rear++] = i;
    while (front < rear) {
        int u = queue[front++]; order[idx++] = u;
        for (int v = 0; v < n; v++)
            if (adj[u][v] && --indegree[v] == 0) queue[rear++] = v;
    }
    return idx == n ? idx : -1;
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <vector>
using namespace std;

vector<int> topologicalSort(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n);
    vector<int> indegree(n, 0);
    for (auto [u, v] : edges) { adj[u].push_back(v); indegree[v]++; }
    queue<int> q;
    for (int i = 0; i < n; i++) if (!indegree[i]) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop(); order.push_back(u);
        for (int v : adj[u]) if (--indegree[v] == 0) q.push(v);
    }
    return order.size() == (size_t)n ? order : vector<int>{};
}`,
      },
      {
        lang: "go",
        code: `func topologicalSort(n int, edges [][2]int) []int {
    adj := make([][]int, n)
    indegree := make([]int, n)
    for _, e := range edges { adj[e[0]] = append(adj[e[0]], e[1]); indegree[e[1]]++ }
    queue := []int{}
    for i := 0; i < n; i++ { if indegree[i] == 0 { queue = append(queue, i) } }
    order := []int{}
    for len(queue) > 0 {
        u := queue[0]; queue = queue[1:]
        order = append(order, u)
        for _, v := range adj[u] { indegree[v]--; if indegree[v] == 0 { queue = append(queue, v) } }
    }
    if len(order) == n { return order }
    return nil
}`,
      },
      {
        lang: "php",
        code: `function topologicalSort(int $n, array $edges): array {
    $adj = array_fill(0, $n, []);
    $indegree = array_fill(0, $n, 0);
    foreach ($edges as [$u, $v]) { $adj[$u][] = $v; $indegree[$v]++; }
    $queue = array_keys(array_filter($indegree, fn($d) => $d === 0));
    $order = [];
    while (!empty($queue)) {
        $u = array_shift($queue); $order[] = $u;
        foreach ($adj[$u] as $v) if (--$indegree[$v] === 0) $queue[] = $v;
    }
    return count($order) === $n ? $order : [];
}`,
      },
      {
        lang: "kotlin",
        code: `fun topologicalSort(n: Int, edges: List<Pair<Int, Int>>): List<Int> {
    val adj = Array(n) { mutableListOf<Int>() }
    val indegree = IntArray(n)
    for ((u, v) in edges) { adj[u].add(v); indegree[v]++ }
    val queue = ArrayDeque<Int>()
    for (i in 0 until n) if (indegree[i] == 0) queue.add(i)
    val order = mutableListOf<Int>()
    while (queue.isNotEmpty()) {
        val u = queue.removeFirst(); order.add(u)
        for (v in adj[u]) if (--indegree[v] == 0) queue.add(v)
    }
    return if (order.size == n) order else emptyList()
}`,
      },
      {
        lang: "swift",
        code: `func topologicalSort(_ n: Int, _ edges: [(Int, Int)]) -> [Int] {
    var adj = [[Int]](repeating: [], count: n)
    var indegree = [Int](repeating: 0, count: n)
    for (u, v) in edges { adj[u].append(v); indegree[v] += 1 }
    var queue = (0..<n).filter { indegree[$0] == 0 }
    var order: [Int] = []
    var head = 0
    while head < queue.count {
        let u = queue[head]; head += 1; order.append(u)
        for v in adj[u] { indegree[v] -= 1; if indegree[v] == 0 { queue.append(v) } }
    }
    return order.count == n ? order : []
}`,
      },
    ],
  },

  "tarjan-scc": {
    id: "tarjan-scc",
    name: "Tarjan's SCC",
    displayName: { en: "Tarjan's Strongly Connected Components", zh: "Tarjan 强连通分量" },
    category: "graph",
    difficulty: "advanced",
    tags: ["graph", "scc", "dfs", "stack", "tarjan"],
    description: {
      en: "Finds all strongly connected components in a directed graph in one DFS pass using low-link values and a stack.",
      zh: "使用低链接值和栈，在一次 DFS 遍历中找出有向图中所有强连通分量。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 1192, titleSlug: "critical-connections-in-a-network", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function tarjanSCC(n, adj) {
  let timer = 0;
  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(0);
  const onStack = new Array(n).fill(false);
  const stack = [];
  const sccs = [];
  function dfs(u) {
    disc[u] = low[u] = timer++;
    stack.push(u); onStack[u] = true;
    for (const v of (adj[u] || [])) {
      if (disc[v] === -1) { dfs(v); low[u] = Math.min(low[u], low[v]); }
      else if (onStack[v]) low[u] = Math.min(low[u], disc[v]);
    }
    if (low[u] === disc[u]) {
      const scc = [];
      while (true) { const w = stack.pop(); onStack[w] = false; scc.push(w); if (w === u) break; }
      sccs.push(scc);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i);
  return sccs;
}`,
      },
      {
        lang: "typescript",
        code: `function tarjanSCC(n: number, adj: number[][]): number[][] {
  let timer = 0;
  const disc = new Array<number>(n).fill(-1);
  const low = new Array<number>(n).fill(0);
  const onStack = new Array<boolean>(n).fill(false);
  const stack: number[] = [];
  const sccs: number[][] = [];
  function dfs(u: number): void {
    disc[u] = low[u] = timer++;
    stack.push(u); onStack[u] = true;
    for (const v of (adj[u] ?? [])) {
      if (disc[v] === -1) { dfs(v); low[u] = Math.min(low[u], low[v]); }
      else if (onStack[v]) low[u] = Math.min(low[u], disc[v]);
    }
    if (low[u] === disc[u]) {
      const scc: number[] = [];
      while (true) { const w = stack.pop()!; onStack[w] = false; scc.push(w); if (w === u) break; }
      sccs.push(scc);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i);
  return sccs;
}`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> tarjanSCC(int n, List<Integer>[] adj) {
    int[] disc = new int[n], low = new int[n];
    boolean[] onStack = new boolean[n];
    Arrays.fill(disc, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    List<List<Integer>> sccs = new ArrayList<>();
    int[] timer = {0};
    for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, adj, disc, low, onStack, stack, sccs, timer);
    return sccs;
}
private void dfs(int u, List<Integer>[] adj, int[] disc, int[] low, boolean[] onStack,
                 Deque<Integer> stack, List<List<Integer>> sccs, int[] timer) {
    disc[u] = low[u] = timer[0]++;
    stack.push(u); onStack[u] = true;
    for (int v : adj[u]) {
        if (disc[v] == -1) { dfs(v, adj, disc, low, onStack, stack, sccs, timer); low[u] = Math.min(low[u], low[v]); }
        else if (onStack[v]) low[u] = Math.min(low[u], disc[v]);
    }
    if (low[u] == disc[u]) {
        List<Integer> scc = new ArrayList<>();
        while (true) { int w = stack.pop(); onStack[w] = false; scc.add(w); if (w == u) break; }
        sccs.add(scc);
    }
}`,
      },
      {
        lang: "python",
        code: `def tarjan_scc(n: int, adj: list[list[int]]) -> list[list[int]]:
    disc = [-1] * n
    low = [0] * n
    on_stack = [False] * n
    stack: list[int] = []
    sccs: list[list[int]] = []
    timer = [0]

    def dfs(u: int) -> None:
        disc[u] = low[u] = timer[0]; timer[0] += 1
        stack.append(u); on_stack[u] = True
        for v in adj[u]:
            if disc[v] == -1:
                dfs(v); low[u] = min(low[u], low[v])
            elif on_stack[v]:
                low[u] = min(low[u], disc[v])
        if low[u] == disc[u]:
            scc = []
            while True:
                w = stack.pop(); on_stack[w] = False; scc.append(w)
                if w == u: break
            sccs.append(scc)

    for i in range(n):
        if disc[i] == -1:
            dfs(i)
    return sccs`,
      },
      {
        lang: "rust",
        code: `fn tarjan_scc(n: usize, adj: &[Vec<usize>]) -> Vec<Vec<usize>> {
    let mut disc = vec![usize::MAX; n];
    let mut low = vec![0usize; n];
    let mut on_stack = vec![false; n];
    let mut stack = Vec::new();
    let mut sccs = Vec::new();
    let mut timer = 0;
    fn dfs(u: usize, adj: &[Vec<usize>], disc: &mut Vec<usize>, low: &mut Vec<usize>,
           on_stack: &mut Vec<bool>, stack: &mut Vec<usize>, sccs: &mut Vec<Vec<usize>>, timer: &mut usize) {
        disc[u] = *timer; low[u] = *timer; *timer += 1;
        stack.push(u); on_stack[u] = true;
        for &v in &adj[u] {
            if disc[v] == usize::MAX { dfs(v, adj, disc, low, on_stack, stack, sccs, timer); low[u] = low[u].min(low[v]); }
            else if on_stack[v] { low[u] = low[u].min(disc[v]); }
        }
        if low[u] == disc[u] {
            let mut scc = Vec::new();
            loop { let w = stack.pop().unwrap(); on_stack[w] = false; scc.push(w); if w == u { break; } }
            sccs.push(scc);
        }
    }
    for i in 0..n { if disc[i] == usize::MAX { dfs(i, adj, &mut disc, &mut low, &mut on_stack, &mut stack, &mut sccs, &mut timer); } }
    sccs
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int disc[MAXN], low[MAXN], onStack[MAXN], stk[MAXN], top, timer;
int sccId[MAXN], sccCount;

void dfs(int u, int adj[][MAXN], int n) {
    disc[u] = low[u] = timer++;
    stk[top++] = u; onStack[u] = 1;
    for (int v = 0; v < n; v++) {
        if (!adj[u][v]) continue;
        if (disc[v] == -1) { dfs(v, adj, n); if (low[v] < low[u]) low[u] = low[v]; }
        else if (onStack[v] && disc[v] < low[u]) low[u] = disc[v];
    }
    if (low[u] == disc[u]) {
        while (1) { int w = stk[--top]; onStack[w] = 0; sccId[w] = sccCount; if (w == u) break; }
        sccCount++;
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <stack>
#include <algorithm>
using namespace std;

int disc_[1000], low_[1000], timer_ = 0;
bool onStack_[1000];
stack<int> stk_;
vector<vector<int>> sccs_;

void dfs(int u, const vector<vector<int>>& adj) {
    disc_[u] = low_[u] = timer_++;
    stk_.push(u); onStack_[u] = true;
    for (int v : adj[u]) {
        if (disc_[v] == -1) { dfs(v, adj); low_[u] = min(low_[u], low_[v]); }
        else if (onStack_[v]) low_[u] = min(low_[u], disc_[v]);
    }
    if (low_[u] == disc_[u]) {
        vector<int> scc;
        while (true) { int w = stk_.top(); stk_.pop(); onStack_[w] = false; scc.push_back(w); if (w == u) break; }
        sccs_.push_back(scc);
    }
}
vector<vector<int>> tarjanSCC(int n, const vector<vector<int>>& adj) {
    fill(disc_, disc_ + n, -1);
    for (int i = 0; i < n; i++) if (disc_[i] == -1) dfs(i, adj);
    return sccs_;
}`,
      },
      {
        lang: "go",
        code: `func tarjanSCC(n int, adj [][]int) [][]int {
    disc := make([]int, n); for i := range disc { disc[i] = -1 }
    low := make([]int, n); onStack := make([]bool, n)
    stack := []int{}; sccs := [][]int{}; timer := 0
    var dfs func(int)
    dfs = func(u int) {
        disc[u] = timer; low[u] = timer; timer++
        stack = append(stack, u); onStack[u] = true
        for _, v := range adj[u] {
            if disc[v] == -1 { dfs(v); if low[v] < low[u] { low[u] = low[v] } } else if onStack[v] && disc[v] < low[u] { low[u] = disc[v] }
        }
        if low[u] == disc[u] {
            scc := []int{}
            for { w := stack[len(stack)-1]; stack = stack[:len(stack)-1]; onStack[w] = false; scc = append(scc, w); if w == u { break } }
            sccs = append(sccs, scc)
        }
    }
    for i := 0; i < n; i++ { if disc[i] == -1 { dfs(i) } }
    return sccs
}`,
      },
      {
        lang: "php",
        code: `function tarjanSCC(int $n, array $adj): array {
    $disc = array_fill(0, $n, -1); $low = array_fill(0, $n, 0);
    $onStack = array_fill(0, $n, false); $stack = []; $sccs = []; $timer = 0;
    $dfs = function(int $u) use (&$adj, &$disc, &$low, &$onStack, &$stack, &$sccs, &$timer, &$dfs): void {
        $disc[$u] = $low[$u] = $timer++; $stack[] = $u; $onStack[$u] = true;
        foreach ($adj[$u] ?? [] as $v) {
            if ($disc[$v] === -1) { $dfs($v); $low[$u] = min($low[$u], $low[$v]); }
            elseif ($onStack[$v]) $low[$u] = min($low[$u], $disc[$v]);
        }
        if ($low[$u] === $disc[$u]) {
            $scc = [];
            do { $w = array_pop($stack); $onStack[$w] = false; $scc[] = $w; } while ($w !== $u);
            $sccs[] = $scc;
        }
    };
    for ($i = 0; $i < $n; $i++) if ($disc[$i] === -1) $dfs($i);
    return $sccs;
}`,
      },
      {
        lang: "kotlin",
        code: `fun tarjanSCC(n: Int, adj: Array<List<Int>>): List<List<Int>> {
    val disc = IntArray(n) { -1 }; val low = IntArray(n); val onStack = BooleanArray(n)
    val stack = ArrayDeque<Int>(); val sccs = mutableListOf<List<Int>>(); var timer = 0
    fun dfs(u: Int) {
        disc[u] = timer; low[u] = timer; timer++
        stack.addLast(u); onStack[u] = true
        for (v in adj[u]) {
            if (disc[v] == -1) { dfs(v); low[u] = minOf(low[u], low[v]) }
            else if (onStack[v]) low[u] = minOf(low[u], disc[v])
        }
        if (low[u] == disc[u]) {
            val scc = mutableListOf<Int>()
            while (true) { val w = stack.removeLast(); onStack[w] = false; scc.add(w); if (w == u) break }
            sccs.add(scc)
        }
    }
    for (i in 0 until n) if (disc[i] == -1) dfs(i)
    return sccs
}`,
      },
      {
        lang: "swift",
        code: `func tarjanSCC(_ n: Int, _ adj: [[Int]]) -> [[Int]] {
    var disc = [Int](repeating: -1, count: n); var low = [Int](repeating: 0, count: n)
    var onStack = [Bool](repeating: false, count: n); var stack = [Int](); var sccs = [[Int]](); var timer = 0
    func dfs(_ u: Int) {
        disc[u] = timer; low[u] = timer; timer += 1; stack.append(u); onStack[u] = true
        for v in adj[u] {
            if disc[v] == -1 { dfs(v); low[u] = min(low[u], low[v]) }
            else if onStack[v] { low[u] = min(low[u], disc[v]) }
        }
        if low[u] == disc[u] {
            var scc = [Int]()
            while true { let w = stack.removeLast(); onStack[w] = false; scc.append(w); if w == u { break } }
            sccs.append(scc)
        }
    }
    for i in 0..<n { if disc[i] == -1 { dfs(i) } }
    return sccs
}`,
      },
    ],
  },

  "kosaraju-scc": {
    id: "kosaraju-scc",
    name: "Kosaraju's SCC",
    displayName: { en: "Kosaraju's Strongly Connected Components", zh: "Kosaraju 强连通分量" },
    category: "graph",
    difficulty: "advanced",
    tags: ["graph", "scc", "dfs", "transpose"],
    description: {
      en: "Finds strongly connected components using two DFS passes: first on the original graph to get finish order, then on the transposed graph.",
      zh: "通过两次 DFS 找到强连通分量：先在原图上按完成时间排序，再在转置图上按逆序进行 DFS。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 1192, titleSlug: "critical-connections-in-a-network", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function kosarajuSCC(n, adj) {
  const visited = new Array(n).fill(false);
  const order = [];
  function dfs1(u) {
    visited[u] = true;
    for (const v of (adj[u] || [])) if (!visited[v]) dfs1(v);
    order.push(u);
  }
  for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);
  // Build transpose graph
  const radj = Array.from({length: n}, () => []);
  for (let u = 0; u < n; u++) for (const v of (adj[u] || [])) radj[v].push(u);
  const comp = new Array(n).fill(-1); let c = 0;
  function dfs2(u, id) { comp[u] = id; for (const v of radj[u]) if (comp[v] === -1) dfs2(v, id); }
  for (let i = n - 1; i >= 0; i--) { const u = order[i]; if (comp[u] === -1) { dfs2(u, c); c++; } }
  return comp;
}`,
      },
      {
        lang: "typescript",
        code: `function kosarajuSCC(n: number, adj: number[][]): number[] {
  const visited = new Array<boolean>(n).fill(false);
  const order: number[] = [];
  function dfs1(u: number): void {
    visited[u] = true;
    for (const v of (adj[u] ?? [])) if (!visited[v]) dfs1(v);
    order.push(u);
  }
  for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);
  const radj: number[][] = Array.from({length: n}, () => []);
  for (let u = 0; u < n; u++) for (const v of (adj[u] ?? [])) radj[v].push(u);
  const comp = new Array<number>(n).fill(-1); let c = 0;
  function dfs2(u: number, id: number): void { comp[u] = id; for (const v of radj[u]) if (comp[v] === -1) dfs2(v, id); }
  for (let i = n - 1; i >= 0; i--) { const u = order[i]; if (comp[u] === -1) { dfs2(u, c); c++; } }
  return comp;
}`,
      },
      {
        lang: "java",
        code: `public int[] kosarajuSCC(int n, List<Integer>[] adj) {
    boolean[] visited = new boolean[n]; List<Integer> order = new ArrayList<>();
    for (int i = 0; i < n; i++) if (!visited[i]) dfs1(i, adj, visited, order);
    List<Integer>[] radj = new List[n];
    for (int i = 0; i < n; i++) radj[i] = new ArrayList<>();
    for (int u = 0; u < n; u++) for (int v : adj[u]) radj[v].add(u);
    int[] comp = new int[n]; Arrays.fill(comp, -1); int[] c = {0};
    for (int i = n - 1; i >= 0; i--) { int u = order.get(i); if (comp[u] == -1) { dfs2(u, radj, comp, c[0]); c[0]++; } }
    return comp;
}
void dfs1(int u, List<Integer>[] adj, boolean[] vis, List<Integer> order) { vis[u] = true; for (int v : adj[u]) if (!vis[v]) dfs1(v, adj, vis, order); order.add(u); }
void dfs2(int u, List<Integer>[] radj, int[] comp, int id) { comp[u] = id; for (int v : radj[u]) if (comp[v] == -1) dfs2(v, radj, comp, id); }`,
      },
      {
        lang: "python",
        code: `def kosaraju_scc(n: int, adj: list[list[int]]) -> list[int]:
    visited = [False] * n
    order: list[int] = []
    def dfs1(u: int) -> None:
        visited[u] = True
        for v in adj[u]:
            if not visited[v]: dfs1(v)
        order.append(u)
    for i in range(n):
        if not visited[i]: dfs1(i)
    radj: list[list[int]] = [[] for _ in range(n)]
    for u in range(n):
        for v in adj[u]: radj[v].append(u)
    comp = [-1] * n; c = 0
    def dfs2(u: int, id: int) -> None:
        comp[u] = id
        for v in radj[u]:
            if comp[v] == -1: dfs2(v, id)
    for u in reversed(order):
        if comp[u] == -1: dfs2(u, c); c += 1
    return comp`,
      },
      {
        lang: "rust",
        code: `fn kosaraju_scc(n: usize, adj: &[Vec<usize>]) -> Vec<usize> {
    let mut visited = vec![false; n]; let mut order = Vec::new();
    fn dfs1(u: usize, adj: &[Vec<usize>], visited: &mut Vec<bool>, order: &mut Vec<usize>) {
        visited[u] = true;
        for &v in &adj[u] { if !visited[v] { dfs1(v, adj, visited, order); } }
        order.push(u);
    }
    for i in 0..n { if !visited[i] { dfs1(i, adj, &mut visited, &mut order); } }
    let mut radj = vec![vec![]; n];
    for u in 0..n { for &v in &adj[u] { radj[v].push(u); } }
    let mut comp = vec![usize::MAX; n]; let mut c = 0;
    fn dfs2(u: usize, radj: &[Vec<usize>], comp: &mut Vec<usize>, id: usize) {
        comp[u] = id; for &v in &radj[u] { if comp[v] == usize::MAX { dfs2(v, radj, comp, id); } }
    }
    for &u in order.iter().rev() { if comp[u] == usize::MAX { dfs2(u, &radj, &mut comp, c); c += 1; } }
    comp
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int vis[MAXN], comp[MAXN], stk[MAXN], top2;
void dfs1(int u, int adj[][MAXN], int n) {
    vis[u] = 1;
    for (int v = 0; v < n; v++) if (adj[u][v] && !vis[v]) dfs1(v, adj, n);
    stk[top2++] = u;
}
void dfs2(int u, int radj[][MAXN], int n, int id) {
    comp[u] = id;
    for (int v = 0; v < n; v++) if (radj[u][v] && comp[v] == -1) dfs2(v, radj, n, id);
}
int kosarajuSCC(int adj[][MAXN], int n) {
    memset(vis, 0, sizeof(vis)); memset(comp, -1, sizeof(comp)); top2 = 0;
    int radj[MAXN][MAXN] = {};
    for (int u = 0; u < n; u++) for (int v = 0; v < n; v++) if (adj[u][v]) radj[v][u] = 1;
    for (int i = 0; i < n; i++) if (!vis[i]) dfs1(i, adj, n);
    int c = 0;
    while (top2 > 0) { int u = stk[--top2]; if (comp[u] == -1) { dfs2(u, radj, n, c); c++; } }
    return c;
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <algorithm>
using namespace std;

void dfs1(int u, const vector<vector<int>>& adj, vector<bool>& vis, vector<int>& order) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs1(v, adj, vis, order);
    order.push_back(u);
}
void dfs2(int u, const vector<vector<int>>& radj, vector<int>& comp, int id) {
    comp[u] = id;
    for (int v : radj[u]) if (comp[v] == -1) dfs2(v, radj, comp, id);
}
vector<int> kosarajuSCC(int n, const vector<vector<int>>& adj) {
    vector<bool> vis(n, false); vector<int> order;
    for (int i = 0; i < n; i++) if (!vis[i]) dfs1(i, adj, vis, order);
    vector<vector<int>> radj(n);
    for (int u = 0; u < n; u++) for (int v : adj[u]) radj[v].push_back(u);
    vector<int> comp(n, -1); int c = 0;
    for (int i = n - 1; i >= 0; i--) { int u = order[i]; if (comp[u] == -1) { dfs2(u, radj, comp, c); c++; } }
    return comp;
}`,
      },
      {
        lang: "go",
        code: `func kosarajuSCC(n int, adj [][]int) []int {
    visited := make([]bool, n); order := []int{}
    var dfs1 func(int)
    dfs1 = func(u int) { visited[u] = true; for _, v := range adj[u] { if !visited[v] { dfs1(v) } }; order = append(order, u) }
    for i := 0; i < n; i++ { if !visited[i] { dfs1(i) } }
    radj := make([][]int, n)
    for u := 0; u < n; u++ { for _, v := range adj[u] { radj[v] = append(radj[v], u) } }
    comp := make([]int, n); for i := range comp { comp[i] = -1 }; c := 0
    var dfs2 func(int, int)
    dfs2 = func(u, id int) { comp[u] = id; for _, v := range radj[u] { if comp[v] == -1 { dfs2(v, id) } } }
    for i := len(order) - 1; i >= 0; i-- { u := order[i]; if comp[u] == -1 { dfs2(u, c); c++ } }
    return comp
}`,
      },
      {
        lang: "php",
        code: `function kosarajuSCC(int $n, array $adj): array {
    $visited = array_fill(0, $n, false); $order = [];
    $dfs1 = function(int $u) use (&$adj, &$visited, &$order, &$dfs1): void {
        $visited[$u] = true;
        foreach ($adj[$u] ?? [] as $v) if (!$visited[$v]) $dfs1($v);
        $order[] = $u;
    };
    for ($i = 0; $i < $n; $i++) if (!$visited[$i]) $dfs1($i);
    $radj = array_fill(0, $n, []);
    for ($u = 0; $u < $n; $u++) foreach ($adj[$u] ?? [] as $v) $radj[$v][] = $u;
    $comp = array_fill(0, $n, -1); $c = 0;
    $dfs2 = function(int $u, int $id) use (&$radj, &$comp, &$dfs2): void {
        $comp[$u] = $id; foreach ($radj[$u] as $v) if ($comp[$v] === -1) $dfs2($v, $id);
    };
    for ($i = count($order) - 1; $i >= 0; $i--) { $u = $order[$i]; if ($comp[$u] === -1) { $dfs2($u, $c); $c++; } }
    return $comp;
}`,
      },
      {
        lang: "kotlin",
        code: `fun kosarajuSCC(n: Int, adj: Array<List<Int>>): IntArray {
    val visited = BooleanArray(n); val order = mutableListOf<Int>()
    fun dfs1(u: Int) { visited[u] = true; for (v in adj[u]) if (!visited[v]) dfs1(v); order.add(u) }
    for (i in 0 until n) if (!visited[i]) dfs1(i)
    val radj = Array(n) { mutableListOf<Int>() }
    for (u in 0 until n) for (v in adj[u]) radj[v].add(u)
    val comp = IntArray(n) { -1 }; var c = 0
    fun dfs2(u: Int, id: Int) { comp[u] = id; for (v in radj[u]) if (comp[v] == -1) dfs2(v, id) }
    for (u in order.reversed()) if (comp[u] == -1) { dfs2(u, c); c++ }
    return comp
}`,
      },
      {
        lang: "swift",
        code: `func kosarajuSCC(_ n: Int, _ adj: [[Int]]) -> [Int] {
    var visited = [Bool](repeating: false, count: n); var order = [Int]()
    func dfs1(_ u: Int) { visited[u] = true; for v in adj[u] { if !visited[v] { dfs1(v) } }; order.append(u) }
    for i in 0..<n { if !visited[i] { dfs1(i) } }
    var radj = [[Int]](repeating: [], count: n)
    for u in 0..<n { for v in adj[u] { radj[v].append(u) } }
    var comp = [Int](repeating: -1, count: n); var c = 0
    func dfs2(_ u: Int, _ id: Int) { comp[u] = id; for v in radj[u] { if comp[v] == -1 { dfs2(v, id) } } }
    for u in order.reversed() { if comp[u] == -1 { dfs2(u, c); c += 1 } }
    return comp
}`,
      },
    ],
  },

  "articulation-points": {
    id: "articulation-points",
    name: "Articulation Points",
    displayName: { en: "Articulation Points", zh: "割点" },
    category: "graph",
    difficulty: "advanced",
    tags: ["graph", "dfs", "bridge", "biconnected"],
    description: {
      en: "Finds all articulation points (cut vertices) in an undirected graph — vertices whose removal increases the number of connected components.",
      zh: "找出无向图中所有的割点（关节点）——删除后会增加连通分量数量的顶点。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 1192, titleSlug: "critical-connections-in-a-network", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function articulationPoints(n, adj) {
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0);
  const isAP = new Array(n).fill(false); let timer = 0;
  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    let children = 0;
    for (const v of (adj[u] || [])) {
      if (disc[v] === -1) {
        children++;
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);
        if (parent === -1 && children > 1) isAP[u] = true;
        if (parent !== -1 && low[v] >= disc[u]) isAP[u] = true;
      } else if (v !== parent) low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return isAP.reduce((acc, v, i) => { if (v) acc.push(i); return acc; }, []);
}`,
      },
      {
        lang: "typescript",
        code: `function articulationPoints(n: number, adj: number[][]): number[] {
  const disc = new Array<number>(n).fill(-1), low = new Array<number>(n).fill(0);
  const isAP = new Array<boolean>(n).fill(false); let timer = 0;
  function dfs(u: number, parent: number): void {
    disc[u] = low[u] = timer++; let children = 0;
    for (const v of (adj[u] ?? [])) {
      if (disc[v] === -1) {
        children++; dfs(v, u); low[u] = Math.min(low[u], low[v]);
        if (parent === -1 && children > 1) isAP[u] = true;
        if (parent !== -1 && low[v] >= disc[u]) isAP[u] = true;
      } else if (v !== parent) low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return isAP.flatMap((v, i) => v ? [i] : []);
}`,
      },
      {
        lang: "java",
        code: `public List<Integer> articulationPoints(int n, List<Integer>[] adj) {
    int[] disc = new int[n], low = new int[n]; boolean[] isAP = new boolean[n];
    Arrays.fill(disc, -1); int[] timer = {0};
    for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1, adj, disc, low, isAP, timer);
    List<Integer> res = new ArrayList<>();
    for (int i = 0; i < n; i++) if (isAP[i]) res.add(i);
    return res;
}
void dfs(int u, int par, List<Integer>[] adj, int[] disc, int[] low, boolean[] isAP, int[] timer) {
    disc[u] = low[u] = timer[0]++; int children = 0;
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            children++; dfs(v, u, adj, disc, low, isAP, timer); low[u] = Math.min(low[u], low[v]);
            if (par == -1 && children > 1) isAP[u] = true;
            if (par != -1 && low[v] >= disc[u]) isAP[u] = true;
        } else if (v != par) low[u] = Math.min(low[u], disc[v]);
    }
}`,
      },
      {
        lang: "python",
        code: `def articulation_points(n: int, adj: list[list[int]]) -> list[int]:
    disc = [-1] * n; low = [0] * n; is_ap = [False] * n; timer = [0]
    def dfs(u: int, parent: int) -> None:
        disc[u] = low[u] = timer[0]; timer[0] += 1; children = 0
        for v in adj[u]:
            if disc[v] == -1:
                children += 1; dfs(v, u); low[u] = min(low[u], low[v])
                if parent == -1 and children > 1: is_ap[u] = True
                if parent != -1 and low[v] >= disc[u]: is_ap[u] = True
            elif v != parent:
                low[u] = min(low[u], disc[v])
    for i in range(n):
        if disc[i] == -1: dfs(i, -1)
    return [i for i, v in enumerate(is_ap) if v]`,
      },
      {
        lang: "rust",
        code: `fn articulation_points(n: usize, adj: &[Vec<usize>]) -> Vec<usize> {
    let mut disc = vec![usize::MAX; n]; let mut low = vec![0usize; n];
    let mut is_ap = vec![false; n]; let mut timer = 0;
    fn dfs(u: usize, parent: usize, adj: &[Vec<usize>], disc: &mut Vec<usize>,
           low: &mut Vec<usize>, is_ap: &mut Vec<bool>, timer: &mut usize) {
        disc[u] = *timer; low[u] = *timer; *timer += 1; let mut children = 0;
        for &v in &adj[u] {
            if disc[v] == usize::MAX {
                children += 1; dfs(v, u, adj, disc, low, is_ap, timer);
                low[u] = low[u].min(low[v]);
                if parent == usize::MAX && children > 1 { is_ap[u] = true; }
                if parent != usize::MAX && low[v] >= disc[u] { is_ap[u] = true; }
            } else if v != parent { low[u] = low[u].min(disc[v]); }
        }
    }
    for i in 0..n { if disc[i] == usize::MAX { dfs(i, usize::MAX, adj, &mut disc, &mut low, &mut is_ap, &mut timer); } }
    (0..n).filter(|&i| is_ap[i]).collect()
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int disc[MAXN], low[MAXN], isAP[MAXN], timer2;
void dfs(int u, int par, int adj[][MAXN], int n) {
    disc[u] = low[u] = timer2++; int children = 0;
    for (int v = 0; v < n; v++) {
        if (!adj[u][v]) continue;
        if (disc[v] == -1) {
            children++; dfs(v, u, adj, n); if (low[v] < low[u]) low[u] = low[v];
            if (par == -1 && children > 1) isAP[u] = 1;
            if (par != -1 && low[v] >= disc[u]) isAP[u] = 1;
        } else if (v != par && disc[v] < low[u]) low[u] = disc[v];
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <algorithm>
using namespace std;
int disc2[1000], low2[1000], timer3 = 0;
bool isAP2[1000];
void dfs(int u, int par, const vector<vector<int>>& adj) {
    disc2[u] = low2[u] = timer3++; int children = 0;
    for (int v : adj[u]) {
        if (disc2[v] == -1) {
            children++; dfs(v, u, adj); low2[u] = min(low2[u], low2[v]);
            if (par == -1 && children > 1) isAP2[u] = true;
            if (par != -1 && low2[v] >= disc2[u]) isAP2[u] = true;
        } else if (v != par) low2[u] = min(low2[u], disc2[v]);
    }
}
vector<int> articulationPoints(int n, const vector<vector<int>>& adj) {
    fill(disc2, disc2+n, -1); timer3 = 0;
    for (int i = 0; i < n; i++) if (disc2[i] == -1) dfs(i, -1, adj);
    vector<int> res; for (int i = 0; i < n; i++) if (isAP2[i]) res.push_back(i);
    return res;
}`,
      },
      {
        lang: "go",
        code: `func articulationPoints(n int, adj [][]int) []int {
    disc := make([]int, n); for i := range disc { disc[i] = -1 }
    low := make([]int, n); isAP := make([]bool, n); timer := 0
    var dfs func(int, int)
    dfs = func(u, parent int) {
        disc[u] = timer; low[u] = timer; timer++; children := 0
        for _, v := range adj[u] {
            if disc[v] == -1 {
                children++; dfs(v, u); if low[v] < low[u] { low[u] = low[v] }
                if parent == -1 && children > 1 { isAP[u] = true }
                if parent != -1 && low[v] >= disc[u] { isAP[u] = true }
            } else if v != parent && disc[v] < low[u] { low[u] = disc[v] }
        }
    }
    for i := 0; i < n; i++ { if disc[i] == -1 { dfs(i, -1) } }
    res := []int{}; for i, v := range isAP { if v { res = append(res, i) } }
    return res
}`,
      },
      {
        lang: "php",
        code: `function articulationPoints(int $n, array $adj): array {
    $disc = array_fill(0, $n, -1); $low = array_fill(0, $n, 0);
    $isAP = array_fill(0, $n, false); $timer = 0;
    $dfs = function(int $u, int $par) use (&$adj, &$disc, &$low, &$isAP, &$timer, &$dfs): void {
        $disc[$u] = $low[$u] = $timer++; $children = 0;
        foreach ($adj[$u] ?? [] as $v) {
            if ($disc[$v] === -1) {
                $children++; $dfs($v, $u); $low[$u] = min($low[$u], $low[$v]);
                if ($par === -1 && $children > 1) $isAP[$u] = true;
                if ($par !== -1 && $low[$v] >= $disc[$u]) $isAP[$u] = true;
            } elseif ($v !== $par) $low[$u] = min($low[$u], $disc[$v]);
        }
    };
    for ($i = 0; $i < $n; $i++) if ($disc[$i] === -1) $dfs($i, -1);
    return array_keys(array_filter($isAP));
}`,
      },
      {
        lang: "kotlin",
        code: `fun articulationPoints(n: Int, adj: Array<List<Int>>): List<Int> {
    val disc = IntArray(n) { -1 }; val low = IntArray(n); val isAP = BooleanArray(n); var timer = 0
    fun dfs(u: Int, parent: Int) {
        disc[u] = timer; low[u] = timer; timer++; var children = 0
        for (v in adj[u]) {
            if (disc[v] == -1) {
                children++; dfs(v, u); low[u] = minOf(low[u], low[v])
                if (parent == -1 && children > 1) isAP[u] = true
                if (parent != -1 && low[v] >= disc[u]) isAP[u] = true
            } else if (v != parent) low[u] = minOf(low[u], disc[v])
        }
    }
    for (i in 0 until n) if (disc[i] == -1) dfs(i, -1)
    return (0 until n).filter { isAP[it] }
}`,
      },
      {
        lang: "swift",
        code: `func articulationPoints(_ n: Int, _ adj: [[Int]]) -> [Int] {
    var disc = [Int](repeating: -1, count: n); var low = [Int](repeating: 0, count: n)
    var isAP = [Bool](repeating: false, count: n); var timer = 0
    func dfs(_ u: Int, _ parent: Int) {
        disc[u] = timer; low[u] = timer; timer += 1; var children = 0
        for v in adj[u] {
            if disc[v] == -1 {
                children += 1; dfs(v, u); low[u] = min(low[u], low[v])
                if parent == -1 && children > 1 { isAP[u] = true }
                if parent != -1 && low[v] >= disc[u] { isAP[u] = true }
            } else if v != parent { low[u] = min(low[u], disc[v]) }
        }
    }
    for i in 0..<n { if disc[i] == -1 { dfs(i, -1) } }
    return (0..<n).filter { isAP[$0] }
}`,
      },
    ],
  },

  bridges: {
    id: "bridges",
    name: "Bridges",
    displayName: { en: "Bridges (Cut Edges)", zh: "桥（割边）" },
    category: "graph",
    difficulty: "advanced",
    tags: ["graph", "dfs", "bridge", "biconnected"],
    description: {
      en: "Finds all bridge edges in an undirected graph — edges whose removal increases the number of connected components.",
      zh: "找出无向图中所有的桥（割边）——删除后会增加连通分量数量的边。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [{ id: 1192, titleSlug: "critical-connections-in-a-network", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function bridges(n, adj) {
  const disc = new Array(n).fill(-1), low = new Array(n).fill(0);
  const result = []; let timer = 0;
  function dfs(u, parent) {
    disc[u] = low[u] = timer++;
    for (const v of (adj[u] || [])) {
      if (disc[v] === -1) {
        dfs(v, u); low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) result.push([u, v]);
      } else if (v !== parent) low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function bridges(n: number, adj: number[][]): [number, number][] {
  const disc = new Array<number>(n).fill(-1), low = new Array<number>(n).fill(0);
  const result: [number, number][] = []; let timer = 0;
  function dfs(u: number, parent: number): void {
    disc[u] = low[u] = timer++;
    for (const v of (adj[u] ?? [])) {
      if (disc[v] === -1) {
        dfs(v, u); low[u] = Math.min(low[u], low[v]);
        if (low[v] > disc[u]) result.push([u, v]);
      } else if (v !== parent) low[u] = Math.min(low[u], disc[v]);
    }
  }
  for (let i = 0; i < n; i++) if (disc[i] === -1) dfs(i, -1);
  return result;
}`,
      },
      {
        lang: "java",
        code: `public List<int[]> bridges(int n, List<Integer>[] adj) {
    int[] disc = new int[n], low = new int[n]; Arrays.fill(disc, -1);
    List<int[]> res = new ArrayList<>(); int[] timer = {0};
    for (int i = 0; i < n; i++) if (disc[i] == -1) dfs(i, -1, adj, disc, low, res, timer);
    return res;
}
void dfs(int u, int par, List<Integer>[] adj, int[] disc, int[] low, List<int[]> res, int[] timer) {
    disc[u] = low[u] = timer[0]++;
    for (int v : adj[u]) {
        if (disc[v] == -1) {
            dfs(v, u, adj, disc, low, res, timer); low[u] = Math.min(low[u], low[v]);
            if (low[v] > disc[u]) res.add(new int[]{u, v});
        } else if (v != par) low[u] = Math.min(low[u], disc[v]);
    }
}`,
      },
      {
        lang: "python",
        code: `def find_bridges(n: int, adj: list[list[int]]) -> list[tuple[int, int]]:
    disc = [-1] * n; low = [0] * n; result: list[tuple[int, int]] = []; timer = [0]
    def dfs(u: int, parent: int) -> None:
        disc[u] = low[u] = timer[0]; timer[0] += 1
        for v in adj[u]:
            if disc[v] == -1:
                dfs(v, u); low[u] = min(low[u], low[v])
                if low[v] > disc[u]: result.append((u, v))
            elif v != parent:
                low[u] = min(low[u], disc[v])
    for i in range(n):
        if disc[i] == -1: dfs(i, -1)
    return result`,
      },
      {
        lang: "rust",
        code: `fn find_bridges(n: usize, adj: &[Vec<usize>]) -> Vec<(usize, usize)> {
    let mut disc = vec![usize::MAX; n]; let mut low = vec![0usize; n];
    let mut result = Vec::new(); let mut timer = 0;
    fn dfs(u: usize, parent: usize, adj: &[Vec<usize>], disc: &mut Vec<usize>,
           low: &mut Vec<usize>, result: &mut Vec<(usize, usize)>, timer: &mut usize) {
        disc[u] = *timer; low[u] = *timer; *timer += 1;
        for &v in &adj[u] {
            if disc[v] == usize::MAX {
                dfs(v, u, adj, disc, low, result, timer); low[u] = low[u].min(low[v]);
                if low[v] > disc[u] { result.push((u, v)); }
            } else if v != parent { low[u] = low[u].min(disc[v]); }
        }
    }
    for i in 0..n { if disc[i] == usize::MAX { dfs(i, usize::MAX, adj, &mut disc, &mut low, &mut result, &mut timer); } }
    result
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int disc3[MAXN], low3[MAXN], timer4;
int bridgeU[MAXN*10], bridgeV[MAXN*10], bCnt;
void dfsBridge(int u, int par, int adj[][MAXN], int n) {
    disc3[u] = low3[u] = timer4++;
    for (int v = 0; v < n; v++) {
        if (!adj[u][v]) continue;
        if (disc3[v] == -1) {
            dfsBridge(v, u, adj, n); if (low3[v] < low3[u]) low3[u] = low3[v];
            if (low3[v] > disc3[u]) { bridgeU[bCnt] = u; bridgeV[bCnt] = v; bCnt++; }
        } else if (v != par && disc3[v] < low3[u]) low3[u] = disc3[v];
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <algorithm>
using namespace std;
int disc4[1000], low4[1000], timer5 = 0;
void dfs(int u, int par, const vector<vector<int>>& adj, vector<pair<int,int>>& res) {
    disc4[u] = low4[u] = timer5++;
    for (int v : adj[u]) {
        if (disc4[v] == -1) {
            dfs(v, u, adj, res); low4[u] = min(low4[u], low4[v]);
            if (low4[v] > disc4[u]) res.push_back({u, v});
        } else if (v != par) low4[u] = min(low4[u], disc4[v]);
    }
}
vector<pair<int,int>> findBridges(int n, const vector<vector<int>>& adj) {
    fill(disc4, disc4+n, -1); timer5 = 0; vector<pair<int,int>> res;
    for (int i = 0; i < n; i++) if (disc4[i] == -1) dfs(i, -1, adj, res);
    return res;
}`,
      },
      {
        lang: "go",
        code: `func findBridges(n int, adj [][]int) [][2]int {
    disc := make([]int, n); for i := range disc { disc[i] = -1 }
    low := make([]int, n); res := [][2]int{}; timer := 0
    var dfs func(int, int)
    dfs = func(u, parent int) {
        disc[u] = timer; low[u] = timer; timer++
        for _, v := range adj[u] {
            if disc[v] == -1 {
                dfs(v, u); if low[v] < low[u] { low[u] = low[v] }
                if low[v] > disc[u] { res = append(res, [2]int{u, v}) }
            } else if v != parent && disc[v] < low[u] { low[u] = disc[v] }
        }
    }
    for i := 0; i < n; i++ { if disc[i] == -1 { dfs(i, -1) } }
    return res
}`,
      },
      {
        lang: "php",
        code: `function findBridges(int $n, array $adj): array {
    $disc = array_fill(0, $n, -1); $low = array_fill(0, $n, 0); $res = []; $timer = 0;
    $dfs = function(int $u, int $par) use (&$adj, &$disc, &$low, &$res, &$timer, &$dfs): void {
        $disc[$u] = $low[$u] = $timer++;
        foreach ($adj[$u] ?? [] as $v) {
            if ($disc[$v] === -1) {
                $dfs($v, $u); $low[$u] = min($low[$u], $low[$v]);
                if ($low[$v] > $disc[$u]) $res[] = [$u, $v];
            } elseif ($v !== $par) $low[$u] = min($low[$u], $disc[$v]);
        }
    };
    for ($i = 0; $i < $n; $i++) if ($disc[$i] === -1) $dfs($i, -1);
    return $res;
}`,
      },
      {
        lang: "kotlin",
        code: `fun findBridges(n: Int, adj: Array<List<Int>>): List<Pair<Int, Int>> {
    val disc = IntArray(n) { -1 }; val low = IntArray(n); val res = mutableListOf<Pair<Int, Int>>(); var timer = 0
    fun dfs(u: Int, parent: Int) {
        disc[u] = timer; low[u] = timer; timer++
        for (v in adj[u]) {
            if (disc[v] == -1) {
                dfs(v, u); low[u] = minOf(low[u], low[v])
                if (low[v] > disc[u]) res.add(u to v)
            } else if (v != parent) low[u] = minOf(low[u], disc[v])
        }
    }
    for (i in 0 until n) if (disc[i] == -1) dfs(i, -1)
    return res
}`,
      },
      {
        lang: "swift",
        code: `func findBridges(_ n: Int, _ adj: [[Int]]) -> [(Int, Int)] {
    var disc = [Int](repeating: -1, count: n); var low = [Int](repeating: 0, count: n)
    var res: [(Int, Int)] = []; var timer = 0
    func dfs(_ u: Int, _ parent: Int) {
        disc[u] = timer; low[u] = timer; timer += 1
        for v in adj[u] {
            if disc[v] == -1 {
                dfs(v, u); low[u] = min(low[u], low[v])
                if low[v] > disc[u] { res.append((u, v)) }
            } else if v != parent { low[u] = min(low[u], disc[v]) }
        }
    }
    for i in 0..<n { if disc[i] == -1 { dfs(i, -1) } }
    return res
}`,
      },
    ],
  },

  "eulerian-path": {
    id: "eulerian-path",
    name: "Eulerian Path",
    displayName: { en: "Eulerian Path / Circuit", zh: "欧拉路径 / 欧拉回路" },
    category: "graph",
    difficulty: "advanced",
    tags: ["graph", "euler", "hierholzer", "dfs"],
    description: {
      en: "Finds an Eulerian path (visiting every edge exactly once) or Eulerian circuit using Hierholzer's algorithm.",
      zh: "使用 Hierholzer 算法找到欧拉路径（每条边恰好经过一次）或欧拉回路。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V+E)",
    relatedProblems: [
      { id: 332, titleSlug: "reconstruct-itinerary", difficulty: "hard" },
      { id: 753, titleSlug: "cracking-the-safe", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Hierholzer's algorithm for directed graph
function eulerianPath(n, edges) {
  const adj = Array.from({length: n}, () => []);
  const indegree = new Array(n).fill(0), outdegree = new Array(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); outdegree[u]++; indegree[v]++; }
  // Find start: node with outdegree - indegree == 1, else 0
  let start = 0;
  for (let i = 0; i < n; i++) if (outdegree[i] - indegree[i] === 1) { start = i; break; }
  const path = []; const ptr = new Array(n).fill(0);
  function dfs(u) {
    while (ptr[u] < adj[u].length) dfs(adj[u][ptr[u]++]);
    path.push(u);
  }
  dfs(start);
  return path.reverse();
}`,
      },
      {
        lang: "typescript",
        code: `function eulerianPath(n: number, edges: [number, number][]): number[] {
  const adj: number[][] = Array.from({length: n}, () => []);
  const indegree = new Array<number>(n).fill(0), outdegree = new Array<number>(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); outdegree[u]++; indegree[v]++; }
  let start = 0;
  for (let i = 0; i < n; i++) if (outdegree[i] - indegree[i] === 1) { start = i; break; }
  const path: number[] = []; const ptr = new Array<number>(n).fill(0);
  function dfs(u: number): void {
    while (ptr[u] < adj[u].length) dfs(adj[u][ptr[u]++]);
    path.push(u);
  }
  dfs(start);
  return path.reverse();
}`,
      },
      {
        lang: "java",
        code: `public int[] eulerianPath(int n, int[][] edges) {
    List<Integer>[] adj = new List[n];
    int[] indegree = new int[n], outdegree = new int[n], ptr = new int[n];
    for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
    for (int[] e : edges) { adj[e[0]].add(e[1]); outdegree[e[0]]++; indegree[e[1]]++; }
    int start = 0;
    for (int i = 0; i < n; i++) if (outdegree[i] - indegree[i] == 1) { start = i; break; }
    List<Integer> path = new ArrayList<>();
    Deque<Integer> stack = new ArrayDeque<>(); stack.push(start);
    while (!stack.isEmpty()) {
        int u = stack.peek();
        if (ptr[u] < adj[u].size()) stack.push(adj[u].get(ptr[u]++));
        else { path.add(stack.pop()); }
    }
    Collections.reverse(path);
    return path.stream().mapToInt(i -> i).toArray();
}`,
      },
      {
        lang: "python",
        code: `def eulerian_path(n: int, edges: list[tuple[int, int]]) -> list[int]:
    from collections import defaultdict
    adj: dict[int, list[int]] = defaultdict(list)
    indegree = [0] * n; outdegree = [0] * n
    for u, v in edges:
        adj[u].append(v); outdegree[u] += 1; indegree[v] += 1
    start = 0
    for i in range(n):
        if outdegree[i] - indegree[i] == 1: start = i; break
    path: list[int] = []; ptr = {i: 0 for i in range(n)}
    def dfs(u: int) -> None:
        while ptr[u] < len(adj[u]):
            v = adj[u][ptr[u]]; ptr[u] += 1; dfs(v)
        path.append(u)
    dfs(start)
    return path[::-1]`,
      },
      {
        lang: "rust",
        code: `fn eulerian_path(n: usize, edges: &[(usize, usize)]) -> Vec<usize> {
    let mut adj: Vec<Vec<usize>> = vec![vec![]; n];
    let mut indegree = vec![0i32; n]; let mut outdegree = vec![0i32; n];
    for &(u, v) in edges { adj[u].push(v); outdegree[u] += 1; indegree[v] += 1; }
    let start = (0..n).find(|&i| outdegree[i] - indegree[i] == 1).unwrap_or(0);
    let mut path = Vec::new(); let mut ptr = vec![0usize; n]; let mut stack = vec![start];
    while let Some(&u) = stack.last() {
        if ptr[u] < adj[u].len() { let v = adj[u][ptr[u]]; ptr[u] += 1; stack.push(v); }
        else { path.push(stack.pop().unwrap()); }
    }
    path.reverse(); path
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int adjE[MAXN][MAXN*10], adjCnt[MAXN], ptr2[MAXN];
int pathE[MAXN*20], pTop;
void dfsE(int u) {
    while (ptr2[u] < adjCnt[u]) { int v = adjE[u][ptr2[u]++]; dfsE(v); }
    pathE[pTop++] = u;
}
// Reverse pathE[0..pTop-1] for final result`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
#include <algorithm>
using namespace std;
vector<int> eulerianPath(int n, const vector<pair<int,int>>& edges) {
    vector<vector<int>> adj(n); vector<int> indeg(n,0), outdeg(n,0), ptr(n,0);
    for (auto [u,v] : edges) { adj[u].push_back(v); outdeg[u]++; indeg[v]++; }
    int start = 0;
    for (int i = 0; i < n; i++) if (outdeg[i]-indeg[i]==1) { start=i; break; }
    vector<int> path; vector<int> stk = {start};
    while (!stk.empty()) {
        int u = stk.back();
        if (ptr[u] < (int)adj[u].size()) stk.push_back(adj[u][ptr[u]++]);
        else { path.push_back(u); stk.pop_back(); }
    }
    reverse(path.begin(), path.end()); return path;
}`,
      },
      {
        lang: "go",
        code: `func eulerianPath(n int, edges [][2]int) []int {
    adj := make([][]int, n); indeg := make([]int, n); outdeg := make([]int, n); ptr := make([]int, n)
    for _, e := range edges { adj[e[0]] = append(adj[e[0]], e[1]); outdeg[e[0]]++; indeg[e[1]]++ }
    start := 0
    for i := 0; i < n; i++ { if outdeg[i]-indeg[i] == 1 { start = i; break } }
    path := []int{}; stack := []int{start}
    for len(stack) > 0 {
        u := stack[len(stack)-1]
        if ptr[u] < len(adj[u]) { stack = append(stack, adj[u][ptr[u]]); ptr[u]++ } else { path = append(path, u); stack = stack[:len(stack)-1] }
    }
    for i, j := 0, len(path)-1; i < j; i, j = i+1, j-1 { path[i], path[j] = path[j], path[i] }
    return path
}`,
      },
      {
        lang: "php",
        code: `function eulerianPath(int $n, array $edges): array {
    $adj = array_fill(0, $n, []); $indeg = array_fill(0, $n, 0); $outdeg = array_fill(0, $n, 0); $ptr = array_fill(0, $n, 0);
    foreach ($edges as [$u, $v]) { $adj[$u][] = $v; $outdeg[$u]++; $indeg[$v]++; }
    $start = 0;
    for ($i = 0; $i < $n; $i++) if ($outdeg[$i] - $indeg[$i] === 1) { $start = $i; break; }
    $path = []; $stack = [$start];
    while (!empty($stack)) {
        $u = end($stack);
        if ($ptr[$u] < count($adj[$u])) { $stack[] = $adj[$u][$ptr[$u]++]; }
        else { $path[] = array_pop($stack); }
    }
    return array_reverse($path);
}`,
      },
      {
        lang: "kotlin",
        code: `fun eulerianPath(n: Int, edges: List<Pair<Int, Int>>): List<Int> {
    val adj = Array(n) { mutableListOf<Int>() }
    val indeg = IntArray(n); val outdeg = IntArray(n); val ptr = IntArray(n)
    for ((u, v) in edges) { adj[u].add(v); outdeg[u]++; indeg[v]++ }
    var start = 0
    for (i in 0 until n) if (outdeg[i] - indeg[i] == 1) { start = i; break }
    val path = mutableListOf<Int>(); val stack = ArrayDeque<Int>(); stack.addLast(start)
    while (stack.isNotEmpty()) {
        val u = stack.last()
        if (ptr[u] < adj[u].size) { stack.addLast(adj[u][ptr[u]++]) }
        else { path.add(stack.removeLast()) }
    }
    return path.reversed()
}`,
      },
      {
        lang: "swift",
        code: `func eulerianPath(_ n: Int, _ edges: [(Int, Int)]) -> [Int] {
    var adj = [[Int]](repeating: [], count: n)
    var indeg = [Int](repeating: 0, count: n); var outdeg = [Int](repeating: 0, count: n); var ptr = [Int](repeating: 0, count: n)
    for (u, v) in edges { adj[u].append(v); outdeg[u] += 1; indeg[v] += 1 }
    var start = 0
    for i in 0..<n { if outdeg[i] - indeg[i] == 1 { start = i; break } }
    var path: [Int] = []; var stack = [start]
    while !stack.isEmpty {
        let u = stack.last!
        if ptr[u] < adj[u].count { stack.append(adj[u][ptr[u]]); ptr[u] += 1 }
        else { path.append(stack.removeLast()) }
    }
    return path.reversed()
}`,
      },
    ],
  },

  "hamiltonian-cycle": {
    id: "hamiltonian-cycle",
    name: "Hamiltonian Cycle",
    displayName: { en: "Hamiltonian Cycle", zh: "哈密顿回路" },
    category: "graph",
    difficulty: "expert",
    tags: ["graph", "backtracking", "np-complete", "hamiltonian"],
    description: {
      en: "Finds a Hamiltonian cycle — a path that visits every vertex exactly once and returns to the start. NP-complete; solved via backtracking.",
      zh: "找到哈密顿回路——恰好经过每个顶点一次并回到起点的路径。NP 完全问题，通过回溯法求解。",
    },
    timeComplexity: { best: "O(n!)", average: "O(n!)", worst: "O(n!)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 980, titleSlug: "unique-paths-iii", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function hamiltonianCycle(graph) {
  const n = graph.length;
  const path = [0]; const visited = new Array(n).fill(false); visited[0] = true;
  function backtrack() {
    if (path.length === n) return graph[path[path.length-1]][0] === 1;
    const last = path[path.length-1];
    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[last][v]) {
        visited[v] = true; path.push(v);
        if (backtrack()) return true;
        path.pop(); visited[v] = false;
      }
    }
    return false;
  }
  return backtrack() ? path : [];
}`,
      },
      {
        lang: "typescript",
        code: `function hamiltonianCycle(graph: number[][]): number[] {
  const n = graph.length;
  const path: number[] = [0]; const visited = new Array<boolean>(n).fill(false); visited[0] = true;
  function backtrack(): boolean {
    if (path.length === n) return graph[path[path.length-1]][0] === 1;
    const last = path[path.length-1];
    for (let v = 0; v < n; v++) {
      if (!visited[v] && graph[last][v]) {
        visited[v] = true; path.push(v);
        if (backtrack()) return true;
        path.pop(); visited[v] = false;
      }
    }
    return false;
  }
  return backtrack() ? path : [];
}`,
      },
      {
        lang: "java",
        code: `public int[] hamiltonianCycle(int[][] graph) {
    int n = graph.length;
    int[] path = new int[n]; boolean[] visited = new boolean[n];
    path[0] = 0; visited[0] = true;
    if (backtrack(graph, path, visited, 1)) return path;
    return new int[0];
}
boolean backtrack(int[][] graph, int[] path, boolean[] visited, int pos) {
    if (pos == graph.length) return graph[path[pos-1]][path[0]] == 1;
    for (int v = 1; v < graph.length; v++) {
        if (!visited[v] && graph[path[pos-1]][v] == 1) {
            path[pos] = v; visited[v] = true;
            if (backtrack(graph, path, visited, pos+1)) return true;
            visited[v] = false;
        }
    }
    return false;
}`,
      },
      {
        lang: "python",
        code: `def hamiltonian_cycle(graph: list[list[int]]) -> list[int]:
    n = len(graph)
    path = [0]; visited = [False] * n; visited[0] = True
    def backtrack() -> bool:
        if len(path) == n:
            return graph[path[-1]][0] == 1
        last = path[-1]
        for v in range(n):
            if not visited[v] and graph[last][v]:
                visited[v] = True; path.append(v)
                if backtrack(): return True
                path.pop(); visited[v] = False
        return False
    return path if backtrack() else []`,
      },
      {
        lang: "rust",
        code: `fn hamiltonian_cycle(graph: &Vec<Vec<i32>>) -> Vec<usize> {
    let n = graph.len();
    let mut path = vec![0usize]; let mut visited = vec![false; n]; visited[0] = true;
    fn backtrack(graph: &Vec<Vec<i32>>, path: &mut Vec<usize>, visited: &mut Vec<bool>, n: usize) -> bool {
        if path.len() == n { return graph[*path.last().unwrap()][0] == 1; }
        let last = *path.last().unwrap();
        for v in 0..n {
            if !visited[v] && graph[last][v] == 1 {
                visited[v] = true; path.push(v);
                if backtrack(graph, path, visited, n) { return true; }
                path.pop(); visited[v] = false;
            }
        }
        false
    }
    if backtrack(graph, &mut path, &mut visited, n) { path } else { vec![] }
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 20
int pathH[MAXN], visitedH[MAXN], nH;
int backtrackH(int graph[][MAXN], int pos) {
    if (pos == nH) return graph[pathH[pos-1]][pathH[0]];
    int last = pathH[pos-1];
    for (int v = 1; v < nH; v++) {
        if (!visitedH[v] && graph[last][v]) {
            pathH[pos] = v; visitedH[v] = 1;
            if (backtrackH(graph, pos+1)) return 1;
            visitedH[v] = 0;
        }
    }
    return 0;
}
int hamiltonianCycle(int graph[][MAXN], int n) {
    nH = n; memset(visitedH, 0, sizeof(visitedH));
    pathH[0] = 0; visitedH[0] = 1;
    return backtrackH(graph, 1);
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
using namespace std;
bool backtrack(const vector<vector<int>>& g, vector<int>& path, vector<bool>& vis, int n) {
    if ((int)path.size() == n) return g[path.back()][path[0]] == 1;
    int last = path.back();
    for (int v = 1; v < n; v++) {
        if (!vis[v] && g[last][v]) {
            vis[v] = true; path.push_back(v);
            if (backtrack(g, path, vis, n)) return true;
            path.pop_back(); vis[v] = false;
        }
    }
    return false;
}
vector<int> hamiltonianCycle(const vector<vector<int>>& g) {
    int n = g.size(); vector<int> path = {0}; vector<bool> vis(n, false); vis[0] = true;
    return backtrack(g, path, vis, n) ? path : vector<int>{};
}`,
      },
      {
        lang: "go",
        code: `func hamiltonianCycle(graph [][]int) []int {
    n := len(graph); path := []int{0}; visited := make([]bool, n); visited[0] = true
    var backtrack func() bool
    backtrack = func() bool {
        if len(path) == n { return graph[path[len(path)-1]][0] == 1 }
        last := path[len(path)-1]
        for v := 1; v < n; v++ {
            if !visited[v] && graph[last][v] == 1 {
                visited[v] = true; path = append(path, v)
                if backtrack() { return true }
                path = path[:len(path)-1]; visited[v] = false
            }
        }
        return false
    }
    if backtrack() { return path }
    return nil
}`,
      },
      {
        lang: "php",
        code: `function hamiltonianCycle(array $graph): array {
    $n = count($graph); $path = [0]; $visited = array_fill(0, $n, false); $visited[0] = true;
    $backtrack = function() use (&$graph, &$path, &$visited, $n, &$backtrack): bool {
        if (count($path) === $n) return $graph[$path[$n-1]][0] === 1;
        $last = $path[count($path)-1];
        for ($v = 1; $v < $n; $v++) {
            if (!$visited[$v] && $graph[$last][$v]) {
                $visited[$v] = true; $path[] = $v;
                if ($backtrack()) return true;
                array_pop($path); $visited[$v] = false;
            }
        }
        return false;
    };
    return $backtrack() ? $path : [];
}`,
      },
      {
        lang: "kotlin",
        code: `fun hamiltonianCycle(graph: Array<IntArray>): List<Int> {
    val n = graph.size; val path = mutableListOf(0); val visited = BooleanArray(n); visited[0] = true
    fun backtrack(): Boolean {
        if (path.size == n) return graph[path.last()][0] == 1
        val last = path.last()
        for (v in 1 until n) {
            if (!visited[v] && graph[last][v] == 1) {
                visited[v] = true; path.add(v)
                if (backtrack()) return true
                path.removeAt(path.lastIndex); visited[v] = false
            }
        }
        return false
    }
    return if (backtrack()) path else emptyList()
}`,
      },
      {
        lang: "swift",
        code: `func hamiltonianCycle(_ graph: [[Int]]) -> [Int] {
    let n = graph.count; var path = [0]; var visited = [Bool](repeating: false, count: n); visited[0] = true
    func backtrack() -> Bool {
        if path.count == n { return graph[path.last!][0] == 1 }
        let last = path.last!
        for v in 1..<n {
            if !visited[v] && graph[last][v] == 1 {
                visited[v] = true; path.append(v)
                if backtrack() { return true }
                path.removeLast(); visited[v] = false
            }
        }
        return false
    }
    return backtrack() ? path : []
}`,
      },
    ],
  },
}

// ─── Runners ──────────────────────────────────────────────────────────────────

export function topologicalSort(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["topological-sort"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function tarjanScc(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["tarjan-scc"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function kosarajuScc(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["kosaraju-scc"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function articulationPoints(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["articulation-points"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function bridges(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["bridges"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function eulerianPath(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["eulerian-path"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function hamiltonianCycle(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTopologyAlgorithms["hamiltonian-cycle"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function runGraphTopologyAlgorithm(algorithmId: GraphAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "topological-sort":
      return topologicalSort(input)
    case "tarjan-scc":
      return tarjanScc(input)
    case "kosaraju-scc":
      return kosarajuScc(input)
    case "articulation-points":
      return articulationPoints(input)
    case "bridges":
      return bridges(input)
    case "eulerian-path":
      return eulerianPath(input)
    case "hamiltonian-cycle":
      return hamiltonianCycle(input)
    default:
      throw new Error(`Unknown graph topology algorithm: ${algorithmId}`)
  }
}
