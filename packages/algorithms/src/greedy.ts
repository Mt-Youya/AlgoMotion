import type { AlgorithmMeta, AlgorithmRun, GreedyAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const greedyAlgorithms: Record<string, AlgorithmMeta> = {
  "activity-selection": {
    id: "activity-selection",
    name: "Activity selection",
    displayName: { en: "Activity Selection", zh: "活动选择" },
    category: "greedy",
    difficulty: "intermediate",
    tags: ["greedy", "interval", "sorting"],
    description: {
      en: "Selects the maximum number of non-overlapping activities by always picking the one that finishes earliest.",
      zh: "通过每次选择最早结束的活动，贪心地选出最多互不重叠的活动。",
    },
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 435, titleSlug: "non-overlapping-intervals", difficulty: "medium" },
      { id: 452, titleSlug: "minimum-number-of-arrows-to-burst-balloons", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function activitySelection(endTimes) {
  const sorted = [...endTimes].sort((a, b) => a - b);
  const selected = [0];
  let lastEnd = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] >= lastEnd) {
      selected.push(i);
      lastEnd = sorted[i];
    }
  }
  return selected;
}`,
      },
      {
        lang: "typescript",
        code: `function activitySelection(endTimes: number[]): number[] {
  const sorted = [...endTimes].sort((a, b) => a - b);
  const selected: number[] = [0];
  let lastEnd = sorted[0];
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] >= lastEnd) {
      selected.push(i);
      lastEnd = sorted[i];
    }
  }
  return selected;
}`,
      },
      {
        lang: "java",
        code: `public static List<Integer> activitySelection(int[] endTimes) {
    int[] sorted = endTimes.clone();
    Arrays.sort(sorted);
    List<Integer> selected = new ArrayList<>();
    selected.add(0);
    int lastEnd = sorted[0];
    for (int i = 1; i < sorted.length; i++) {
        if (sorted[i] >= lastEnd) {
            selected.add(i);
            lastEnd = sorted[i];
        }
    }
    return selected;
}`,
      },
      {
        lang: "python",
        code: `def activity_selection(end_times: list[int]) -> list[int]:
    sorted_times = sorted(range(len(end_times)), key=lambda i: end_times[i])
    selected = [sorted_times[0]]
    last_end = end_times[sorted_times[0]]
    for i in sorted_times[1:]:
        if end_times[i] >= last_end:
            selected.append(i)
            last_end = end_times[i]
    return selected`,
      },
      {
        lang: "rust",
        code: `fn activity_selection(end_times: &[i32]) -> Vec<usize> {
    let mut indices: Vec<usize> = (0..end_times.len()).collect();
    indices.sort_by_key(|&i| end_times[i]);
    let mut selected = vec![indices[0]];
    let mut last_end = end_times[indices[0]];
    for &i in &indices[1..] {
        if end_times[i] >= last_end {
            selected.push(i);
            last_end = end_times[i];
        }
    }
    selected
}`,
      },
      {
        lang: "c",
        code: `void activity_selection(int *end_times, int n, int *selected, int *count) {
    /* assumes end_times is already sorted */
    *count = 0;
    selected[(*count)++] = 0;
    int last_end = end_times[0];
    for (int i = 1; i < n; i++) {
        if (end_times[i] >= last_end) {
            selected[(*count)++] = i;
            last_end = end_times[i];
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `std::vector<int> activitySelection(std::vector<int> endTimes) {
    std::sort(endTimes.begin(), endTimes.end());
    std::vector<int> selected = {0};
    int lastEnd = endTimes[0];
    for (int i = 1; i < (int)endTimes.size(); i++) {
        if (endTimes[i] >= lastEnd) {
            selected.push_back(i);
            lastEnd = endTimes[i];
        }
    }
    return selected;
}`,
      },
      {
        lang: "go",
        code: `func activitySelection(endTimes []int) []int {
    sorted := append([]int(nil), endTimes...)
    sort.Ints(sorted)
    selected := []int{0}
    lastEnd := sorted[0]
    for i := 1; i < len(sorted); i++ {
        if sorted[i] >= lastEnd {
            selected = append(selected, i)
            lastEnd = sorted[i]
        }
    }
    return selected
}`,
      },
      {
        lang: "php",
        code: `function activitySelection(array $endTimes): array {
    sort($endTimes);
    $selected = [0];
    $lastEnd = $endTimes[0];
    for ($i = 1; $i < count($endTimes); $i++) {
        if ($endTimes[$i] >= $lastEnd) {
            $selected[] = $i;
            $lastEnd = $endTimes[$i];
        }
    }
    return $selected;
}`,
      },
      {
        lang: "kotlin",
        code: `fun activitySelection(endTimes: IntArray): List<Int> {
    val sorted = endTimes.sorted()
    val selected = mutableListOf(0)
    var lastEnd = sorted[0]
    for (i in 1 until sorted.size) {
        if (sorted[i] >= lastEnd) {
            selected.add(i)
            lastEnd = sorted[i]
        }
    }
    return selected
}`,
      },
      {
        lang: "swift",
        code: `func activitySelection(_ endTimes: [Int]) -> [Int] {
    let sorted = endTimes.sorted()
    var selected = [0]
    var lastEnd = sorted[0]
    for i in 1..<sorted.count {
        if sorted[i] >= lastEnd {
            selected.append(i)
            lastEnd = sorted[i]
        }
    }
    return selected
}`,
      },
    ],
  },

  "fractional-knapsack": {
    id: "fractional-knapsack",
    name: "Fractional knapsack",
    displayName: { en: "Fractional Knapsack", zh: "分数背包" },
    category: "greedy",
    difficulty: "intermediate",
    tags: ["greedy", "sorting", "optimization"],
    description: {
      en: "Maximizes the total value packed into a knapsack of fixed capacity by taking fractions of items, prioritized by value-to-weight ratio.",
      zh: "通过按价值密度（单位重量价值）从高到低贪心取物（允许取分数），在固定容量背包中实现总价值最大化。",
    },
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 1710, titleSlug: "maximum-units-on-a-truck", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function fractionalKnapsack(weights, values, capacity) {
  const items = weights.map((w, i) => ({ w, v: values[i], ratio: values[i] / w }));
  items.sort((a, b) => b.ratio - a.ratio);
  let total = 0, remaining = capacity;
  for (const { w, v } of items) {
    if (remaining <= 0) break;
    const take = Math.min(w, remaining);
    total += take * (v / w);
    remaining -= take;
  }
  return total;
}`,
      },
      {
        lang: "typescript",
        code: `function fractionalKnapsack(weights: number[], values: number[], capacity: number): number {
  const items = weights.map((w, i) => ({ w, v: values[i]!, ratio: values[i]! / w }));
  items.sort((a, b) => b.ratio - a.ratio);
  let total = 0, remaining = capacity;
  for (const { w, v } of items) {
    if (remaining <= 0) break;
    const take = Math.min(w, remaining);
    total += take * (v / w);
    remaining -= take;
  }
  return total;
}`,
      },
      {
        lang: "java",
        code: `public static double fractionalKnapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    double[][] items = new double[n][2];
    for (int i = 0; i < n; i++) {
        items[i][0] = weights[i];
        items[i][1] = (double) values[i] / weights[i];
    }
    Arrays.sort(items, (a, b) -> Double.compare(b[1], a[1]));
    double total = 0; int remaining = capacity;
    for (double[] item : items) {
        if (remaining <= 0) break;
        double take = Math.min(item[0], remaining);
        total += take * item[1];
        remaining -= (int) take;
    }
    return total;
}`,
      },
      {
        lang: "python",
        code: `def fractional_knapsack(weights: list[int], values: list[int], capacity: int) -> float:
    items = sorted(zip(weights, values), key=lambda x: x[1] / x[0], reverse=True)
    total, remaining = 0.0, capacity
    for w, v in items:
        if remaining <= 0:
            break
        take = min(w, remaining)
        total += take * (v / w)
        remaining -= take
    return total`,
      },
      {
        lang: "rust",
        code: `fn fractional_knapsack(weights: &[f64], values: &[f64], capacity: f64) -> f64 {
    let mut items: Vec<(f64, f64)> = weights.iter().zip(values).map(|(&w, &v)| (w, v)).collect();
    items.sort_by(|a, b| (b.1 / b.0).partial_cmp(&(a.1 / a.0)).unwrap());
    let (mut total, mut remaining) = (0.0, capacity);
    for (w, v) in items {
        if remaining <= 0.0 { break; }
        let take = w.min(remaining);
        total += take * (v / w);
        remaining -= take;
    }
    total
}`,
      },
      {
        lang: "c",
        code: `double fractional_knapsack(double *weights, double *values, int n, double capacity) {
    /* sort by ratio descending (omitted for brevity) */
    double total = 0.0, remaining = capacity;
    for (int i = 0; i < n && remaining > 0; i++) {
        double take = weights[i] < remaining ? weights[i] : remaining;
        total += take * (values[i] / weights[i]);
        remaining -= take;
    }
    return total;
}`,
      },
      {
        lang: "cpp",
        code: `double fractionalKnapsack(std::vector<int> weights, std::vector<int> values, int capacity) {
    int n = weights.size();
    std::vector<int> idx(n);
    std::iota(idx.begin(), idx.end(), 0);
    std::sort(idx.begin(), idx.end(), [&](int a, int b) {
        return (double)values[a] / weights[a] > (double)values[b] / weights[b];
    });
    double total = 0; int remaining = capacity;
    for (int i : idx) {
        if (remaining <= 0) break;
        int take = std::min(weights[i], remaining);
        total += take * ((double)values[i] / weights[i]);
        remaining -= take;
    }
    return total;
}`,
      },
      {
        lang: "go",
        code: `func fractionalKnapsack(weights, values []float64, capacity float64) float64 {
    type item struct{ w, v float64 }
    items := make([]item, len(weights))
    for i := range weights { items[i] = item{weights[i], values[i]} }
    sort.Slice(items, func(i, j int) bool { return items[i].v/items[i].w > items[j].v/items[j].w })
    total, remaining := 0.0, capacity
    for _, it := range items {
        if remaining <= 0 { break }
        take := math.Min(it.w, remaining)
        total += take * (it.v / it.w)
        remaining -= take
    }
    return total
}`,
      },
      {
        lang: "php",
        code: `function fractionalKnapsack(array $weights, array $values, float $capacity): float {
    $n = count($weights);
    $indices = range(0, $n - 1);
    usort($indices, fn($a, $b) => $values[$b] / $weights[$b] <=> $values[$a] / $weights[$a]);
    $total = 0.0; $remaining = $capacity;
    foreach ($indices as $i) {
        if ($remaining <= 0) break;
        $take = min($weights[$i], $remaining);
        $total += $take * ($values[$i] / $weights[$i]);
        $remaining -= $take;
    }
    return $total;
}`,
      },
      {
        lang: "kotlin",
        code: `fun fractionalKnapsack(weights: IntArray, values: IntArray, capacity: Int): Double {
    val items = weights.indices.sortedByDescending { values[it].toDouble() / weights[it] }
    var total = 0.0; var remaining = capacity
    for (i in items) {
        if (remaining <= 0) break
        val take = minOf(weights[i], remaining)
        total += take * (values[i].toDouble() / weights[i])
        remaining -= take
    }
    return total
}`,
      },
      {
        lang: "swift",
        code: `func fractionalKnapsack(_ weights: [Double], _ values: [Double], _ capacity: Double) -> Double {
    let items = zip(weights, values).sorted { $0.1 / $0.0 > $1.1 / $1.0 }
    var total = 0.0, remaining = capacity
    for (w, v) in items {
        if remaining <= 0 { break }
        let take = min(w, remaining)
        total += take * (v / w)
        remaining -= take
    }
    return total
}`,
      },
    ],
  },

  "huffman-coding": {
    id: "huffman-coding",
    name: "Huffman coding",
    displayName: { en: "Huffman Coding", zh: "霍夫曼编码" },
    category: "greedy",
    difficulty: "advanced",
    tags: ["greedy", "tree", "heap", "compression"],
    description: {
      en: "Builds an optimal prefix-free binary code by repeatedly merging the two lowest-frequency symbols into a new node.",
      zh: "通过反复合并频率最低的两个符号构建最优前缀无歧义二叉编码树，实现数据无损压缩。",
    },
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 1167, titleSlug: "minimum-cost-to-connect-sticks", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function huffman(freqs) {
  // Min-heap via sorted array for simplicity
  let nodes = freqs.map((f, i) => ({ freq: f, id: i, left: null, right: null }));
  nodes.sort((a, b) => a.freq - b.freq);
  while (nodes.length > 1) {
    const a = nodes.shift(), b = nodes.shift();
    const merged = { freq: a.freq + b.freq, left: a, right: b };
    const idx = nodes.findIndex(n => n.freq >= merged.freq);
    nodes.splice(idx === -1 ? nodes.length : idx, 0, merged);
  }
  return nodes[0];
}`,
      },
      {
        lang: "typescript",
        code: `interface HNode { freq: number; left?: HNode; right?: HNode }
function huffman(freqs: number[]): HNode {
  let nodes: HNode[] = freqs.map(freq => ({ freq }));
  nodes.sort((a, b) => a.freq - b.freq);
  while (nodes.length > 1) {
    const a = nodes.shift()!, b = nodes.shift()!;
    const merged: HNode = { freq: a.freq + b.freq, left: a, right: b };
    const idx = nodes.findIndex(n => n.freq >= merged.freq);
    nodes.splice(idx === -1 ? nodes.length : idx, 0, merged);
  }
  return nodes[0]!;
}`,
      },
      {
        lang: "java",
        code: `public static int huffmanCost(int[] freqs) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int f : freqs) pq.add(f);
    int cost = 0;
    while (pq.size() > 1) {
        int a = pq.poll(), b = pq.poll();
        cost += a + b;
        pq.add(a + b);
    }
    return cost;
}`,
      },
      {
        lang: "python",
        code: `import heapq

def huffman_cost(freqs: list[int]) -> int:
    heap = freqs[:]
    heapq.heapify(heap)
    cost = 0
    while len(heap) > 1:
        a, b = heapq.heappop(heap), heapq.heappop(heap)
        cost += a + b
        heapq.heappush(heap, a + b)
    return cost`,
      },
      {
        lang: "rust",
        code: `use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn huffman_cost(freqs: &[i64]) -> i64 {
    let mut heap: BinaryHeap<Reverse<i64>> = freqs.iter().map(|&f| Reverse(f)).collect();
    let mut cost = 0;
    while heap.len() > 1 {
        let Reverse(a) = heap.pop().unwrap();
        let Reverse(b) = heap.pop().unwrap();
        cost += a + b;
        heap.push(Reverse(a + b));
    }
    cost
}`,
      },
      {
        lang: "c",
        code: `/* Min-heap implementation omitted; pseudocode below */
int huffman_cost(int *freqs, int n) {
    /* insert all freqs into min-heap */
    int cost = 0;
    while (heap_size > 1) {
        int a = heap_pop();
        int b = heap_pop();
        cost += a + b;
        heap_push(a + b);
    }
    return cost;
}`,
      },
      {
        lang: "cpp",
        code: `int huffmanCost(std::vector<int> freqs) {
    std::priority_queue<int, std::vector<int>, std::greater<int>> pq(freqs.begin(), freqs.end());
    int cost = 0;
    while (pq.size() > 1) {
        int a = pq.top(); pq.pop();
        int b = pq.top(); pq.pop();
        cost += a + b;
        pq.push(a + b);
    }
    return cost;
}`,
      },
      {
        lang: "go",
        code: `import "container/heap"

type MinHeap []int
func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() any          { old := *h; n := len(old); x := old[n-1]; *h = old[:n-1]; return x }

func huffmanCost(freqs []int) int {
    h := MinHeap(append([]int(nil), freqs...))
    heap.Init(&h)
    cost := 0
    for h.Len() > 1 {
        a, b := heap.Pop(&h).(int), heap.Pop(&h).(int)
        cost += a + b
        heap.Push(&h, a+b)
    }
    return cost
}`,
      },
      {
        lang: "php",
        code: `function huffmanCost(array $freqs): int {
    $pq = new SplMinHeap();
    foreach ($freqs as $f) $pq->insert($f);
    $cost = 0;
    while ($pq->count() > 1) {
        $a = $pq->extract();
        $b = $pq->extract();
        $cost += $a + $b;
        $pq->insert($a + $b);
    }
    return $cost;
}`,
      },
      {
        lang: "kotlin",
        code: `fun huffmanCost(freqs: IntArray): Int {
    val pq = PriorityQueue<Int>()
    freqs.forEach { pq.add(it) }
    var cost = 0
    while (pq.size > 1) {
        val a = pq.poll()
        val b = pq.poll()
        cost += a + b
        pq.add(a + b)
    }
    return cost
}`,
      },
      {
        lang: "swift",
        code: `func huffmanCost(_ freqs: [Int]) -> Int {
    var heap = freqs.sorted()
    var cost = 0
    while heap.count > 1 {
        let a = heap.removeFirst(), b = heap.removeFirst()
        let merged = a + b
        cost += merged
        let idx = heap.firstIndex(where: { $0 >= merged }) ?? heap.count
        heap.insert(merged, at: idx)
    }
    return cost
}`,
      },
    ],
  },

  "interval-scheduling": {
    id: "interval-scheduling",
    name: "Interval scheduling",
    displayName: { en: "Interval Scheduling", zh: "区间调度" },
    category: "greedy",
    difficulty: "intermediate",
    tags: ["greedy", "interval", "sorting"],
    description: {
      en: "Finds the minimum number of machines (or rooms) needed to schedule all intervals without overlap.",
      zh: "贪心地将区间分配到机器（或房间）上，求调度所有区间所需的最少机器数。",
    },
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 253, titleSlug: "meeting-rooms-ii", difficulty: "medium" },
      { id: 56, titleSlug: "merge-intervals", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function minMachines(intervals) {
  const starts = intervals.map(([s]) => s).sort((a, b) => a - b);
  const ends   = intervals.map(([, e]) => e).sort((a, b) => a - b);
  let machines = 0, endIdx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endIdx]) machines++;
    else endIdx++;
  }
  return machines;
}`,
      },
      {
        lang: "typescript",
        code: `function minMachines(intervals: [number, number][]): number {
  const starts = intervals.map(([s]) => s).sort((a, b) => a - b);
  const ends   = intervals.map(([, e]) => e).sort((a, b) => a - b);
  let machines = 0, endIdx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endIdx]) machines++;
    else endIdx++;
  }
  return machines;
}`,
      },
      {
        lang: "java",
        code: `public static int minMachines(int[][] intervals) {
    int n = intervals.length;
    int[] starts = new int[n], ends = new int[n];
    for (int i = 0; i < n; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }
    Arrays.sort(starts); Arrays.sort(ends);
    int machines = 0, endIdx = 0;
    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[endIdx]) machines++;
        else endIdx++;
    }
    return machines;
}`,
      },
      {
        lang: "python",
        code: `def min_machines(intervals: list[tuple[int, int]]) -> int:
    starts = sorted(s for s, _ in intervals)
    ends   = sorted(e for _, e in intervals)
    machines = end_idx = 0
    for s in starts:
        if s < ends[end_idx]:
            machines += 1
        else:
            end_idx += 1
    return machines`,
      },
      {
        lang: "rust",
        code: `fn min_machines(intervals: &[(i32, i32)]) -> usize {
    let mut starts: Vec<i32> = intervals.iter().map(|&(s, _)| s).collect();
    let mut ends:   Vec<i32> = intervals.iter().map(|&(_, e)| e).collect();
    starts.sort(); ends.sort();
    let (mut machines, mut end_idx) = (0, 0);
    for &s in &starts {
        if s < ends[end_idx] { machines += 1; }
        else { end_idx += 1; }
    }
    machines
}`,
      },
      {
        lang: "c",
        code: `int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }
int min_machines(int starts[], int ends[], int n) {
    qsort(starts, n, sizeof(int), cmp);
    qsort(ends,   n, sizeof(int), cmp);
    int machines = 0, end_idx = 0;
    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[end_idx]) machines++;
        else end_idx++;
    }
    return machines;
}`,
      },
      {
        lang: "cpp",
        code: `int minMachines(std::vector<std::pair<int,int>> intervals) {
    std::vector<int> starts, ends;
    for (auto [s, e] : intervals) { starts.push_back(s); ends.push_back(e); }
    std::sort(starts.begin(), starts.end());
    std::sort(ends.begin(),   ends.end());
    int machines = 0, endIdx = 0;
    for (int i = 0; i < (int)starts.size(); i++) {
        if (starts[i] < ends[endIdx]) machines++;
        else endIdx++;
    }
    return machines;
}`,
      },
      {
        lang: "go",
        code: `func minMachines(intervals [][2]int) int {
    starts := make([]int, len(intervals))
    ends   := make([]int, len(intervals))
    for i, iv := range intervals { starts[i] = iv[0]; ends[i] = iv[1] }
    sort.Ints(starts); sort.Ints(ends)
    machines, endIdx := 0, 0
    for _, s := range starts {
        if s < ends[endIdx] { machines++ } else { endIdx++ }
    }
    return machines
}`,
      },
      {
        lang: "php",
        code: `function minMachines(array $intervals): int {
    $starts = array_column($intervals, 0); sort($starts);
    $ends   = array_column($intervals, 1); sort($ends);
    $machines = 0; $endIdx = 0;
    foreach ($starts as $s) {
        if ($s < $ends[$endIdx]) $machines++;
        else $endIdx++;
    }
    return $machines;
}`,
      },
      {
        lang: "kotlin",
        code: `fun minMachines(intervals: Array<IntArray>): Int {
    val starts = intervals.map { it[0] }.sorted()
    val ends   = intervals.map { it[1] }.sorted()
    var machines = 0; var endIdx = 0
    for (s in starts) {
        if (s < ends[endIdx]) machines++
        else endIdx++
    }
    return machines
}`,
      },
      {
        lang: "swift",
        code: `func minMachines(_ intervals: [(Int, Int)]) -> Int {
    let starts = intervals.map { $0.0 }.sorted()
    let ends   = intervals.map { $0.1 }.sorted()
    var machines = 0, endIdx = 0
    for s in starts {
        if s < ends[endIdx] { machines += 1 }
        else { endIdx += 1 }
    }
    return machines
}`,
      },
    ],
  },

  "best-time-stock": {
    id: "best-time-stock",
    name: "Best time to buy and sell stock",
    displayName: { en: "Best Time to Buy & Sell Stock II", zh: "买卖股票的最佳时机 II" },
    category: "greedy",
    difficulty: "beginner",
    tags: ["greedy", "array", "dynamic-programming"],
    description: {
      en: "Collect every upward price move: add price[i] - price[i-1] whenever it is positive. This greedy pass over adjacent differences captures the maximum profit from unlimited transactions.",
      zh: "遍历相邻差值，只要今日价格高于昨日就将差值计入利润，贪心地累计所有上涨收益，求不限交易次数时的最大总利润。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 122, titleSlug: "best-time-to-buy-and-sell-stock-ii", difficulty: "medium" },
      { id: 121, titleSlug: "best-time-to-buy-and-sell-stock", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}`,
      },
      {
        lang: "typescript",
        code: `function maxProfit(prices: number[]): number {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }
  return profit;
}`,
      },
      {
        lang: "java",
        code: `public int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}`,
      },
      {
        lang: "python",
        code: `def max_profit(prices: list[int]) -> int:
    return sum(
        prices[i] - prices[i - 1]
        for i in range(1, len(prices))
        if prices[i] > prices[i - 1]
    )`,
      },
      {
        lang: "rust",
        code: `pub fn max_profit(prices: Vec<i32>) -> i32 {
    prices.windows(2).map(|w| (w[1] - w[0]).max(0)).sum()
}`,
      },
      {
        lang: "c",
        code: `int maxProfit(int *prices, int n) {
    int profit = 0;
    for (int i = 1; i < n; i++) {
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    }
    return profit;
}`,
      },
      {
        lang: "cpp",
        code: `int maxProfit(std::vector<int>& prices) {
    int profit = 0;
    for (int i = 1; i < (int)prices.size(); i++) {
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1];
    }
    return profit;
}`,
      },
      {
        lang: "go",
        code: `func maxProfit(prices []int) int {
    profit := 0
    for i := 1; i < len(prices); i++ {
        if prices[i] > prices[i-1] {
            profit += prices[i] - prices[i-1]
        }
    }
    return profit
}`,
      },
      {
        lang: "php",
        code: `function maxProfit(array $prices): int {
    $profit = 0;
    for ($i = 1; $i < count($prices); $i++) {
        if ($prices[$i] > $prices[$i - 1]) {
            $profit += $prices[$i] - $prices[$i - 1];
        }
    }
    return $profit;
}`,
      },
      {
        lang: "kotlin",
        code: `fun maxProfit(prices: IntArray): Int {
    var profit = 0
    for (i in 1 until prices.size) {
        if (prices[i] > prices[i - 1])
            profit += prices[i] - prices[i - 1]
    }
    return profit
}`,
      },
      {
        lang: "swift",
        code: `func maxProfit(_ prices: [Int]) -> Int {
    var profit = 0
    for i in 1..<prices.count {
        if prices[i] > prices[i - 1] {
            profit += prices[i] - prices[i - 1]
        }
    }
    return profit
}`,
      },
    ],
  },
}

// ─── Algorithm implementations ────────────────────────────────────────────────

/**
 * Best Time to Buy and Sell Stock II (LeetCode 122)
 * Greedy: accumulate every positive adjacent difference.
 * Each price index is compared to the previous one and marked as
 * "sorted" (profitable day) or "visited" (non-profitable day).
 */
export function bestTimeStock(input: number[]): AlgorithmRun {
  const rec = new ArrayTraceRecorder(input)
  const meta = greedyAlgorithms["best-time-stock"] as AlgorithmMeta

  if (rec.values.length < 2) return rec.finish(meta)

  let profit = 0

  for (let i = 1; i < rec.values.length; i++) {
    // Compare today's price (index i) with yesterday's price (index i-1)
    const diff = rec.compare(i - 1, i, 3)
    if (diff < 0) {
      // prices[i] > prices[i-1]: profitable move, mark as a gain day
      rec.mark([i], "sorted", 4)
      profit += (rec.values[i] ?? 0) - (rec.values[i - 1] ?? 0)
    } else {
      // prices[i] <= prices[i-1]: no gain, mark as visited
      rec.mark([i], "visited", 6)
    }
  }

  // Store the computed profit back into values[0] so finish() surfaces it
  rec.write(0, profit, 9)

  return rec.finish(meta)
}

/**
 * Activity Selection
 * Input is treated as sorted end-times. The greedy pass picks activities
 * whose end-time is >= the last selected end-time.
 * Selected activities are marked "sorted"; skipped ones are marked "visited".
 */
export function activitySelection(input: number[]): AlgorithmRun {
  const rec = new ArrayTraceRecorder(input)
  const meta = greedyAlgorithms["activity-selection"] as AlgorithmMeta

  if (rec.values.length === 0) return rec.finish(meta)

  // First activity is always selected
  rec.mark([0], "sorted", 2)
  let lastEndIdx = 0

  for (let i = 1; i < rec.values.length; i++) {
    // Compare candidate end-time with the last selected end-time
    const diff = rec.compare(lastEndIdx, i, 5)
    if (diff <= 0) {
      // rec.values[i] >= rec.values[lastEndIdx]: compatible activity, select it
      rec.mark([i], "sorted", 6)
      lastEndIdx = i
    } else {
      // Overlapping activity, skip
      rec.mark([i], "visited", 8)
    }
  }

  return rec.finish(meta)
}

// ─── Implementations (previously stubs) ──────────────────────────────────────

/**
 * Fractional Knapsack
 * Input: [w1,v1, w2,v2, ..., W] — weight/value pairs + capacity as last element.
 * Visualises items sorted by value/weight ratio; selected items marked "sorted".
 */
function fractionalKnapsack(input: number[]): AlgorithmRun {
  const meta = greedyAlgorithms["fractional-knapsack"] as AlgorithmMeta
  const arr = input.length >= 3 ? input : [2, 12, 1, 10, 3, 20, 5]
  const capacity = arr[arr.length - 1] ?? 5
  const items: Array<{ w: number; v: number; ratio: number; origIdx: number }> = []
  for (let i = 0; i + 1 < arr.length - 1; i += 2) {
    const w = Math.max(1, arr[i] ?? 1)
    const v = arr[i + 1] ?? 1
    items.push({ w, v, ratio: v / w, origIdx: i })
  }
  if (items.length === 0) items.push({ w: 1, v: 1, ratio: 1, origIdx: 0 })
  // Build a display array: ratios * 10 (scaled integers) for visualisation
  const display = items.map((it) => Math.round(it.ratio * 10))
  const rec = new ArrayTraceRecorder(display)
  // Sort by ratio descending (selection-sort style for visualisation)
  const sorted = [...items].sort((a, b) => b.ratio - a.ratio)
  let remaining = capacity
  for (let i = 0; i < sorted.length; i++) {
    rec.mark([i], "active")
    rec.compareValue(i, Math.max(0, i - 1), sorted[i]?.ratio ?? 0, sorted[i - 1]?.ratio ?? 0)
    if (remaining <= 0) { rec.mark([i], "visited"); continue }
    const take = Math.min(sorted[i]?.w ?? 0, remaining)
    remaining -= take
    rec.mark([i], take > 0 ? "sorted" : "visited")
  }
  return rec.finish(meta)
}

/**
 * Huffman Coding
 * Input: frequencies array. Visualises the merge steps as a min-heap simulation.
 * Each merge step compares the two smallest frequencies and sums them.
 */
function huffmanCoding(input: number[]): AlgorithmRun {
  const meta = greedyAlgorithms["huffman-coding"] as AlgorithmMeta
  const arr = (input.length > 0 ? input : [5, 9, 12, 13, 16, 45]).slice(0, 16)
  const heap = [...arr].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder([...heap])
  while (heap.length > 1) {
    // Find two minimums
    let m1 = 0, m2 = 1
    rec.compare(m1, m2)
    rec.mark([m1, m2], "active")
    const sum = (heap[m1] ?? 0) + (heap[m2] ?? 0)
    // Remove them and insert sum (simulate by write + mark)
    heap.splice(m2, 1)
    heap[m1] = sum
    // Rebuild sorted display
    heap.sort((a, b) => a - b)
    // Sync recorder values
    for (let i = 0; i < heap.length; i++) {
      if ((rec.values[i] ?? -1) !== heap[i]) {
        rec.write(i, heap[i] ?? 0)
      }
    }
    if (heap.length < rec.values.length) {
      rec.mark([heap.length], "visited")
    }
    if (heap.length > 0) rec.mark([0], "sorted")
  }
  return rec.finish(meta)
}

/**
 * Interval Scheduling Maximization
 * Input: flat pairs [start1, end1, start2, end2, ...].
 * Visualises end-times after sorting; selected intervals marked "sorted".
 */
function intervalScheduling(input: number[]): AlgorithmRun {
  const meta = greedyAlgorithms["interval-scheduling"] as AlgorithmMeta
  const arr = input.length >= 2 ? input : [1, 4, 2, 6, 5, 8, 7, 9, 3, 5]
  // Extract end-times for visualisation
  const ends: number[] = []
  for (let i = 1; i < arr.length; i += 2) ends.push(arr[i] ?? 0)
  if (ends.length === 0) ends.push(1)
  ends.sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder([...ends])
  rec.mark([0], "sorted")
  let lastEnd = ends[0] ?? 0
  for (let i = 1; i < ends.length; i++) {
    rec.compareValue(i, i - 1, ends[i] ?? 0, lastEnd)
    if ((ends[i] ?? 0) >= lastEnd) {
      rec.mark([i], "sorted")
      lastEnd = ends[i] ?? 0
    } else {
      rec.mark([i], "visited")
    }
  }
  return rec.finish(meta)
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function runGreedyAlgorithm(algorithmId: GreedyAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "best-time-stock":
      return bestTimeStock(input)
    case "activity-selection":
      return activitySelection(input)
    case "fractional-knapsack":
      return fractionalKnapsack(input)
    case "huffman-coding":
      return huffmanCoding(input)
    case "interval-scheduling":
      return intervalScheduling(input)
    default: {
      const _exhaustive: never = algorithmId
      throw new Error(`Unknown greedy algorithm: ${_exhaustive}`)
    }
  }
}
