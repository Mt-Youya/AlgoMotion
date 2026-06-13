import type { AlgorithmMeta, AlgorithmRun, GraphAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "../recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const graphTraversalAlgorithms: Record<string, AlgorithmMeta> = {
  "graph-bfs": {
    id: "graph-bfs",
    name: "Breadth-First Search",
    displayName: { en: "Breadth-First Search", zh: "广度优先搜索" },
    category: "graph",
    difficulty: "beginner",
    tags: ["graph", "bfs", "queue", "traversal"],
    description: {
      en: "Explores all neighbors at the current depth before moving to the next level. Uses a queue to track nodes to visit.",
      zh: "在进入下一层之前，先探索当前深度的所有邻居节点。使用队列来追踪待访问的节点。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 102, titleSlug: "binary-tree-level-order-traversal", difficulty: "medium" },
      { id: 200, titleSlug: "number-of-islands", difficulty: "medium" },
      { id: 994, titleSlug: "rotting-oranges", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      },
      {
        lang: "typescript",
        code: `function bfs(graph: Map<number, number[]>, start: number): number[] {
  const visited = new Set<number>([start]);
  const queue: number[] = [start];
  const order: number[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of (graph.get(node) ?? [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
      },
      {
        lang: "java",
        code: `public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    List<Integer> order = new ArrayList<>();
    queue.offer(start);
    visited.add(start);
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int neighbor : graph.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    return order;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def bfs(graph: dict[int, list[int]], start: int) -> list[int]:
    visited = {start}
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
      },
      {
        lang: "rust",
        code: `use std::collections::{HashMap, HashSet, VecDeque};

fn bfs(graph: &HashMap<i32, Vec<i32>>, start: i32) -> Vec<i32> {
    let mut visited = HashSet::from([start]);
    let mut queue = VecDeque::from([start]);
    let mut order = Vec::new();
    while let Some(node) = queue.pop_front() {
        order.push(node);
        if let Some(neighbors) = graph.get(&node) {
            for &nb in neighbors {
                if visited.insert(nb) {
                    queue.push_back(nb);
                }
            }
        }
    }
    order
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int visited[MAXN];
int queue[MAXN];

void bfs(int graph[][MAXN], int n, int start, int *order, int *len) {
    memset(visited, 0, sizeof(visited));
    int front = 0, rear = 0;
    queue[rear++] = start;
    visited[start] = 1;
    *len = 0;
    while (front < rear) {
        int node = queue[front++];
        order[(*len)++] = node;
        for (int i = 0; i < n; i++) {
            if (graph[node][i] && !visited[i]) {
                visited[i] = 1;
                queue[rear++] = i;
            }
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <vector>

std::vector<int> bfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::unordered_set<int> visited{start};
    std::queue<int> q;
    q.push(start);
    std::vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        auto it = graph.find(node);
        if (it != graph.end()) {
            for (int nb : it->second) {
                if (visited.insert(nb).second)
                    q.push(nb);
            }
        }
    }
    return order;
}`,
      },
      {
        lang: "go",
        code: `func bfs(graph map[int][]int, start int) []int {
    visited := map[int]bool{start: true}
    queue := []int{start}
    order := []int{}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        order = append(order, node)
        for _, nb := range graph[node] {
            if !visited[nb] {
                visited[nb] = true
                queue = append(queue, nb)
            }
        }
    }
    return order
}`,
      },
      {
        lang: "php",
        code: `function bfs(array $graph, int $start): array {
    $visited = [$start => true];
    $queue = [$start];
    $order = [];
    while (!empty($queue)) {
        $node = array_shift($queue);
        $order[] = $node;
        foreach ($graph[$node] ?? [] as $nb) {
            if (!isset($visited[$nb])) {
                $visited[$nb] = true;
                $queue[] = $nb;
            }
        }
    }
    return $order;
}`,
      },
      {
        lang: "kotlin",
        code: `fun bfs(graph: Map<Int, List<Int>>, start: Int): List<Int> {
    val visited = mutableSetOf(start)
    val queue = ArrayDeque<Int>().also { it.add(start) }
    val order = mutableListOf<Int>()
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        order.add(node)
        for (nb in graph[node] ?: emptyList()) {
            if (visited.add(nb)) queue.add(nb)
        }
    }
    return order
}`,
      },
      {
        lang: "swift",
        code: `func bfs(_ graph: [Int: [Int]], _ start: Int) -> [Int] {
    var visited: Set<Int> = [start]
    var queue: [Int] = [start]
    var order: [Int] = []
    while !queue.isEmpty {
        let node = queue.removeFirst()
        order.append(node)
        for nb in graph[node] ?? [] {
            if visited.insert(nb).inserted {
                queue.append(nb)
            }
        }
    }
    return order
}`,
      },
    ],
  },

  "graph-dfs": {
    id: "graph-dfs",
    name: "Depth-First Search",
    displayName: { en: "Depth-First Search", zh: "深度优先搜索" },
    category: "graph",
    difficulty: "beginner",
    tags: ["graph", "dfs", "stack", "recursion", "traversal"],
    description: {
      en: "Explores as far as possible along each branch before backtracking. Can be implemented recursively or with an explicit stack.",
      zh: "沿每条分支尽可能深入探索，然后回溯。可以用递归或显式栈来实现。",
    },
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V)",
    relatedProblems: [
      { id: 133, titleSlug: "clone-graph", difficulty: "medium" },
      { id: 200, titleSlug: "number-of-islands", difficulty: "medium" },
      { id: 695, titleSlug: "max-area-of-island", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  function visit(node) {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const nb of (graph[node] || [])) visit(nb);
  }
  visit(start);
  return order;
}`,
      },
      {
        lang: "typescript",
        code: `function dfs(graph: Map<number, number[]>, start: number): number[] {
  const visited = new Set<number>();
  const order: number[] = [];
  function visit(node: number): void {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const nb of (graph.get(node) ?? [])) visit(nb);
  }
  visit(start);
  return order;
}`,
      },
      {
        lang: "java",
        code: `public List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    List<Integer> order = new ArrayList<>();
    dfsHelper(graph, start, visited, order);
    return order;
}
private void dfsHelper(Map<Integer, List<Integer>> graph, int node,
                       Set<Integer> visited, List<Integer> order) {
    if (visited.contains(node)) return;
    visited.add(node);
    order.add(node);
    for (int nb : graph.getOrDefault(node, Collections.emptyList()))
        dfsHelper(graph, nb, visited, order);
}`,
      },
      {
        lang: "python",
        code: `def dfs(graph: dict[int, list[int]], start: int) -> list[int]:
    visited: set[int] = set()
    order: list[int] = []
    def visit(node: int) -> None:
        if node in visited:
            return
        visited.add(node)
        order.append(node)
        for nb in graph.get(node, []):
            visit(nb)
    visit(start)
    return order`,
      },
      {
        lang: "rust",
        code: `use std::collections::{HashMap, HashSet};

fn dfs(graph: &HashMap<i32, Vec<i32>>, start: i32) -> Vec<i32> {
    let mut visited = HashSet::new();
    let mut order = Vec::new();
    dfs_helper(graph, start, &mut visited, &mut order);
    order
}
fn dfs_helper(graph: &HashMap<i32, Vec<i32>>, node: i32,
              visited: &mut HashSet<i32>, order: &mut Vec<i32>) {
    if !visited.insert(node) { return; }
    order.push(node);
    if let Some(neighbors) = graph.get(&node) {
        for &nb in neighbors { dfs_helper(graph, nb, visited, order); }
    }
}`,
      },
      {
        lang: "c",
        code: `#define MAXN 1000
int visited[MAXN];

void dfs(int graph[][MAXN], int n, int node, int *order, int *len) {
    if (visited[node]) return;
    visited[node] = 1;
    order[(*len)++] = node;
    for (int i = 0; i < n; i++)
        if (graph[node][i] && !visited[i])
            dfs(graph, n, i, order, len);
}`,
      },
      {
        lang: "cpp",
        code: `#include <unordered_map>
#include <unordered_set>
#include <vector>

void dfsHelper(const std::unordered_map<int, std::vector<int>>& graph, int node,
               std::unordered_set<int>& visited, std::vector<int>& order) {
    if (!visited.insert(node).second) return;
    order.push_back(node);
    auto it = graph.find(node);
    if (it != graph.end())
        for (int nb : it->second) dfsHelper(graph, nb, visited, order);
}
std::vector<int> dfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {
    std::unordered_set<int> visited;
    std::vector<int> order;
    dfsHelper(graph, start, visited, order);
    return order;
}`,
      },
      {
        lang: "go",
        code: `func dfs(graph map[int][]int, start int) []int {
    visited := map[int]bool{}
    order := []int{}
    var visit func(int)
    visit = func(node int) {
        if visited[node] { return }
        visited[node] = true
        order = append(order, node)
        for _, nb := range graph[node] { visit(nb) }
    }
    visit(start)
    return order
}`,
      },
      {
        lang: "php",
        code: `function dfs(array $graph, int $start): array {
    $visited = [];
    $order = [];
    $visit = function(int $node) use (&$graph, &$visited, &$order, &$visit): void {
        if (isset($visited[$node])) return;
        $visited[$node] = true;
        $order[] = $node;
        foreach ($graph[$node] ?? [] as $nb) $visit($nb);
    };
    $visit($start);
    return $order;
}`,
      },
      {
        lang: "kotlin",
        code: `fun dfs(graph: Map<Int, List<Int>>, start: Int): List<Int> {
    val visited = mutableSetOf<Int>()
    val order = mutableListOf<Int>()
    fun visit(node: Int) {
        if (!visited.add(node)) return
        order.add(node)
        for (nb in graph[node] ?: emptyList()) visit(nb)
    }
    visit(start)
    return order
}`,
      },
      {
        lang: "swift",
        code: `func dfs(_ graph: [Int: [Int]], _ start: Int) -> [Int] {
    var visited: Set<Int> = []
    var order: [Int] = []
    func visit(_ node: Int) {
        guard visited.insert(node).inserted else { return }
        order.append(node)
        for nb in graph[node] ?? [] { visit(nb) }
    }
    visit(start)
    return order
}`,
      },
    ],
  },
}

// ─── Runners ──────────────────────────────────────────────────────────────────

export function graphBfs(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTraversalAlgorithms["graph-bfs"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function graphDfs(input: number[]): AlgorithmRun {
  return {
    algorithm: graphTraversalAlgorithms["graph-dfs"] as AlgorithmMeta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

export function runGraphTraversalAlgorithm(algorithmId: GraphAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "graph-bfs":
      return graphBfs(input)
    case "graph-dfs":
      return graphDfs(input)
    default:
      throw new Error(`Unknown graph traversal algorithm: ${algorithmId}`)
  }
}
