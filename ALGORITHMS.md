# AlgoMotion — Algorithm Roadmap

> Complete algorithm catalogue for the AlgoMotion platform.
> Status legend: ✅ done · 🔨 in progress · ⬜ planned

Supported languages for code snippets: **JavaScript · TypeScript · Java · Python · Rust · C · C++ · Go · PHP · Kotlin · Swift**

References:

- [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)
- [krahets/hello-algo](https://github.com/krahets/hello-algo)
- [LeetCode Problem Set](https://leetcode.cn/problemset/)

---

## 1. Sorting 排序

| ID               | Name (EN)      | 中文名   | Stable | In-Place | Time (avg)  | Space    | Status |
| ---------------- | -------------- | -------- | ------ | -------- | ----------- | -------- | ------ |
| `bubble-sort`    | Bubble Sort    | 冒泡排序 | ✓      | ✓        | O(n²)       | O(1)     | ✅     |
| `selection-sort` | Selection Sort | 选择排序 | ✗      | ✓        | O(n²)       | O(1)     | ✅     |
| `insertion-sort` | Insertion Sort | 插入排序 | ✓      | ✓        | O(n²)       | O(1)     | ✅     |
| `merge-sort`     | Merge Sort     | 归并排序 | ✓      | ✗        | O(n log n)  | O(n)     | ✅     |
| `quick-sort`     | Quick Sort     | 快速排序 | ✗      | ✓        | O(n log n)  | O(log n) | ✅     |
| `heap-sort`      | Heap Sort      | 堆排序   | ✗      | ✓        | O(n log n)  | O(1)     | ✅     |
| `shell-sort`     | Shell Sort     | 希尔排序 | ✗      | ✓        | O(n log² n) | O(1)     | ⬜     |
| `counting-sort`  | Counting Sort  | 计数排序 | ✓      | ✗        | O(n + k)    | O(k)     | ⬜     |
| `radix-sort`     | Radix Sort     | 基数排序 | ✓      | ✗        | O(nk)       | O(n + k) | ⬜     |
| `bucket-sort`    | Bucket Sort    | 桶排序   | ✓      | ✗        | O(n + k)    | O(n)     | ⬜     |
| `tim-sort`       | Timsort        | Timsort  | ✓      | ✓        | O(n log n)  | O(n)     | ⬜     |

---

## 2. Search 搜索

| ID                     | Name (EN)            | 中文名   | Time         | Space | Status |
| ---------------------- | -------------------- | -------- | ------------ | ----- | ------ |
| `linear-search`        | Linear Search        | 线性搜索 | O(n)         | O(1)  | ⬜     |
| `binary-search`        | Binary Search        | 二分搜索 | O(log n)     | O(1)  | ⬜     |
| `jump-search`          | Jump Search          | 跳跃搜索 | O(√n)        | O(1)  | ⬜     |
| `interpolation-search` | Interpolation Search | 插值搜索 | O(log log n) | O(1)  | ⬜     |
| `exponential-search`   | Exponential Search   | 指数搜索 | O(log n)     | O(1)  | ⬜     |
| `ternary-search`       | Ternary Search       | 三分搜索 | O(log n)     | O(1)  | ⬜     |

---

## 3. Data Structures 数据结构

### 3.1 Linear 线性

| ID                   | Name (EN)          | 中文名   | Status |
| -------------------- | ------------------ | -------- | ------ |
| `array`              | Array              | 数组     | ⬜     |
| `linked-list`        | Linked List        | 链表     | ⬜     |
| `doubly-linked-list` | Doubly Linked List | 双向链表 | ⬜     |
| `stack`              | Stack              | 栈       | ⬜     |
| `queue`              | Queue              | 队列     | ⬜     |
| `deque`              | Deque              | 双端队列 | ⬜     |
| `circular-queue`     | Circular Queue     | 循环队列 | ⬜     |

### 3.2 Hashing 哈希

| ID                         | Name (EN)                  | 中文名             | Status |
| -------------------------- | -------------------------- | ------------------ | ------ |
| `hash-table`               | Hash Table                 | 哈希表             | ⬜     |
| `hash-map-chaining`        | Hash Map (Chaining)        | 哈希表（链式）     | ⬜     |
| `hash-map-open-addressing` | Hash Map (Open Addressing) | 哈希表（开放寻址） | ⬜     |

### 3.3 Trees 树

| ID                   | Name (EN)          | 中文名     | Status |
| -------------------- | ------------------ | ---------- | ------ |
| `binary-tree`        | Binary Tree        | 二叉树     | ⬜     |
| `binary-search-tree` | Binary Search Tree | 二叉搜索树 | ⬜     |
| `avl-tree`           | AVL Tree           | AVL 树     | ⬜     |
| `red-black-tree`     | Red-Black Tree     | 红黑树     | ⬜     |
| `segment-tree`       | Segment Tree       | 线段树     | ⬜     |
| `fenwick-tree`       | Fenwick Tree (BIT) | 树状数组   | ⬜     |
| `trie`               | Trie               | 字典树     | ⬜     |
| `heap-min`           | Min-Heap           | 小根堆     | ⬜     |
| `heap-max`           | Max-Heap           | 大根堆     | ⬜     |

### 3.4 Graphs 图

| ID                       | Name (EN)                 | 中文名         | Status |
| ------------------------ | ------------------------- | -------------- | ------ |
| `graph-adjacency-list`   | Graph (Adjacency List)    | 图（邻接表）   | ⬜     |
| `graph-adjacency-matrix` | Graph (Adjacency Matrix)  | 图（邻接矩阵） | ⬜     |
| `disjoint-set`           | Disjoint Set (Union-Find) | 并查集         | ⬜     |

### 3.5 Advanced 高级

| ID                | Name (EN)       | 中文名     | Status |
| ----------------- | --------------- | ---------- | ------ |
| `bloom-filter`    | Bloom Filter    | 布隆过滤器 | ⬜     |
| `lru-cache`       | LRU Cache       | LRU 缓存   | ⬜     |
| `priority-queue`  | Priority Queue  | 优先队列   | ⬜     |
| `monotonic-stack` | Monotonic Stack | 单调栈     | ⬜     |
| `monotonic-queue` | Monotonic Queue | 单调队列   | ⬜     |

---

## 4. Graph Algorithms 图算法

### 4.1 Traversal 遍历

| ID          | Name (EN) | 中文名       | Time     | Status |
| ----------- | --------- | ------------ | -------- | ------ |
| `graph-bfs` | BFS       | 广度优先搜索 | O(V + E) | ⬜     |
| `graph-dfs` | DFS       | 深度优先搜索 | O(V + E) | ⬜     |

### 4.2 Shortest Path 最短路径

| ID               | Name (EN)      | 中文名              | Time           | Status |
| ---------------- | -------------- | ------------------- | -------------- | ------ |
| `dijkstra`       | Dijkstra       | Dijkstra 算法       | O((V+E) log V) | ⬜     |
| `bellman-ford`   | Bellman-Ford   | Bellman-Ford 算法   | O(VE)          | ⬜     |
| `floyd-warshall` | Floyd-Warshall | Floyd-Warshall 算法 | O(V³)          | ⬜     |
| `spfa`           | SPFA           | SPFA 算法           | O(kE)          | ⬜     |

### 4.3 Minimum Spanning Tree 最小生成树

| ID        | Name (EN) | 中文名       | Time       | Status |
| --------- | --------- | ------------ | ---------- | ------ |
| `kruskal` | Kruskal's | Kruskal 算法 | O(E log E) | ⬜     |
| `prim`    | Prim's    | Prim 算法    | O(E log V) | ⬜     |

### 4.4 Topology & Connectivity 拓扑与连通

| ID                    | Name (EN)             | 中文名              | Status |
| --------------------- | --------------------- | ------------------- | ------ |
| `topological-sort`    | Topological Sort      | 拓扑排序            | ⬜     |
| `tarjan-scc`          | Tarjan SCC            | Tarjan 强连通分量   | ⬜     |
| `kosaraju-scc`        | Kosaraju SCC          | Kosaraju 强连通分量 | ⬜     |
| `articulation-points` | Articulation Points   | 割点                | ⬜     |
| `bridges`             | Bridges               | 桥                  | ⬜     |
| `eulerian-path`       | Eulerian Path/Circuit | 欧拉路径            | ⬜     |
| `hamiltonian-cycle`   | Hamiltonian Cycle     | 哈密顿回路          | ⬜     |

---

## 5. Dynamic Programming 动态规划

### 5.1 Classic 1D 经典一维

| ID                | Name (EN)                 | 中文名             | Status |
| ----------------- | ------------------------- | ------------------ | ------ |
| `fibonacci`       | Fibonacci (Memoization)   | 斐波那契（记忆化） | ⬜     |
| `climbing-stairs` | Climbing Stairs           | 爬楼梯             | ⬜     |
| `coin-change`     | Coin Change               | 零钱兑换           | ⬜     |
| `house-robber`    | House Robber              | 打家劫舍           | ⬜     |
| `jump-game`       | Jump Game                 | 跳跃游戏           | ⬜     |
| `max-subarray`    | Maximum Subarray (Kadane) | 最大子数组         | ⬜     |

### 5.2 Classic 2D 经典二维

| ID                   | Name (EN)                   | 中文名           | Status |
| -------------------- | --------------------------- | ---------------- | ------ |
| `knapsack-01`        | 0/1 Knapsack                | 0-1 背包         | ⬜     |
| `knapsack-unbounded` | Unbounded Knapsack          | 完全背包         | ⬜     |
| `lcs`                | Longest Common Subsequence  | 最长公共子序列   | ⬜     |
| `edit-distance`      | Edit Distance (Levenshtein) | 编辑距离         | ⬜     |
| `unique-paths`       | Unique Paths                | 不同路径         | ⬜     |
| `triangle`           | Triangle                    | 三角形最小路径和 | ⬜     |
| `min-path-sum`       | Minimum Path Sum            | 最小路径和       | ⬜     |

### 5.3 Strings 字符串DP

| ID              | Name (EN)                      | 中文名         | Status |
| --------------- | ------------------------------ | -------------- | ------ |
| `lis`           | Longest Increasing Subsequence | 最长递增子序列 | ⬜     |
| `palindrome-dp` | Palindrome DP                  | 回文串DP       | ⬜     |
| `word-break`    | Word Break                     | 单词拆分       | ⬜     |

### 5.4 Interval DP 区间DP

| ID               | Name (EN)                   | 中文名     | Status |
| ---------------- | --------------------------- | ---------- | ------ |
| `matrix-chain`   | Matrix Chain Multiplication | 矩阵链乘法 | ⬜     |
| `burst-balloons` | Burst Balloons              | 戳气球     | ⬜     |

### 5.5 Tree DP 树形DP

| ID                 | Name (EN)            | 中文名         | Status |
| ------------------ | -------------------- | -------------- | ------ |
| `tree-dp-diameter` | Binary Tree Diameter | 二叉树直径     | ⬜     |
| `tree-dp-max-path` | Max Path Sum in Tree | 树中最大路径和 | ⬜     |

---

## 6. String Algorithms 字符串算法

| ID                 | Name (EN)        | 中文名         | Time       | Status |
| ------------------ | ---------------- | -------------- | ---------- | ------ |
| `kmp`              | KMP              | KMP 字符串匹配 | O(n + m)   | ⬜     |
| `rabin-karp`       | Rabin-Karp       | Rabin-Karp     | O(n + m)   | ⬜     |
| `z-algorithm`      | Z-Algorithm      | Z 算法         | O(n)       | ⬜     |
| `aho-corasick`     | Aho-Corasick     | AC 自动机      | O(n + m)   | ⬜     |
| `manacher`         | Manacher         | Manacher 算法  | O(n)       | ⬜     |
| `suffix-array`     | Suffix Array     | 后缀数组       | O(n log n) | ⬜     |
| `hamming-distance` | Hamming Distance | 汉明距离       | O(n)       | ⬜     |

---

## 7. Math & Number Theory 数学

| ID                      | Name (EN)                  | 中文名                  | Status |
| ----------------------- | -------------------------- | ----------------------- | ------ |
| `sieve-of-eratosthenes` | Sieve of Eratosthenes      | 埃氏筛                  | ⬜     |
| `gcd-lcm`               | GCD / LCM                  | 最大公因数 / 最小公倍数 | ⬜     |
| `fast-power`            | Fast Exponentiation        | 快速幂                  | ⬜     |
| `prime-factorization`   | Prime Factorization        | 质因数分解              | ⬜     |
| `pascal-triangle`       | Pascal's Triangle          | 帕斯卡三角形            | ⬜     |
| `bit-manipulation`      | Bit Manipulation           | 位运算技巧              | ⬜     |
| `dft`                   | Discrete Fourier Transform | 离散傅里叶变换          | ⬜     |

---

## 8. Backtracking 回溯

| ID                | Name (EN)           | 中文名   | Status |
| ----------------- | ------------------- | -------- | ------ |
| `n-queens`        | N-Queens            | N 皇后   | ⬜     |
| `sudoku-solver`   | Sudoku Solver       | 解数独   | ⬜     |
| `permutations`    | Permutations        | 全排列   | ⬜     |
| `subsets`         | Subsets / Power Set | 子集     | ⬜     |
| `combination-sum` | Combination Sum     | 组合总和 | ⬜     |
| `word-search`     | Word Search         | 单词搜索 | ⬜     |
| `knights-tour`    | Knight's Tour       | 骑士巡逻 | ⬜     |

---

## 9. Greedy 贪心

| ID                    | Name (EN)                   | 中文名           | Status |
| --------------------- | --------------------------- | ---------------- | ------ |
| `activity-selection`  | Activity Selection          | 活动选择         | ⬜     |
| `fractional-knapsack` | Fractional Knapsack         | 分数背包         | ⬜     |
| `huffman-coding`      | Huffman Coding              | 哈夫曼编码       | ⬜     |
| `interval-scheduling` | Interval Scheduling         | 区间调度         | ⬜     |
| `best-time-stock`     | Best Time to Buy/Sell Stock | 买卖股票最佳时机 | ⬜     |

---

## 10. Divide & Conquer 分治

| ID                 | Name (EN)                | 中文名            | Status       |
| ------------------ | ------------------------ | ----------------- | ------------ |
| `binary-search-dc` | Binary Search            | 二分法            | ⬜           |
| `merge-sort-dc`    | Merge Sort               | 归并排序          | ✅ (sorting) |
| `strassen`         | Strassen Matrix Multiply | Strassen 矩阵乘法 | ⬜           |
| `closest-pair`     | Closest Pair of Points   | 最近点对          | ⬜           |

---

## 11. Two Pointers & Sliding Window 双指针 / 滑动窗口

| ID                     | Name (EN)                        | 中文名             | Status |
| ---------------------- | -------------------------------- | ------------------ | ------ |
| `two-sum-pointers`     | Two Sum (Sorted)                 | 两数之和（有序）   | ⬜     |
| `three-sum`            | Three Sum                        | 三数之和           | ⬜     |
| `sliding-window-max`   | Sliding Window Maximum           | 滑动窗口最大值     | ⬜     |
| `min-window-substring` | Min Window Substring             | 最小覆盖子串       | ⬜     |
| `longest-no-repeat`    | Longest Substring Without Repeat | 无重复字符最长子串 | ⬜     |
| `trapping-rain-water`  | Trapping Rain Water              | 接雨水             | ⬜     |

---

## 12. Tree Algorithms 树遍历与操作

| ID                 | Name (EN)                    | 中文名       | Status |
| ------------------ | ---------------------------- | ------------ | ------ |
| `tree-inorder`     | Inorder Traversal            | 中序遍历     | ⬜     |
| `tree-preorder`    | Preorder Traversal           | 前序遍历     | ⬜     |
| `tree-postorder`   | Postorder Traversal          | 后序遍历     | ⬜     |
| `tree-level-order` | Level Order Traversal (BFS)  | 层序遍历     | ⬜     |
| `tree-height`      | Tree Height / Depth          | 树的高度     | ⬜     |
| `tree-lca`         | Lowest Common Ancestor       | 最近公共祖先 | ⬜     |
| `tree-serialize`   | Serialize / Deserialize Tree | 树的序列化   | ⬜     |

---

## 13. Bit Manipulation 位运算

| ID              | Name (EN)                         | 中文名           | Status |
| --------------- | --------------------------------- | ---------------- | ------ |
| `popcount`      | Population Count (Hamming Weight) | 汉明重量         | ⬜     |
| `single-number` | Single Number (XOR)               | 只出现一次的数字 | ⬜     |
| `power-of-two`  | Is Power of Two                   | 2 的幂           | ⬜     |
| `reverse-bits`  | Reverse Bits                      | 颠倒二进制位     | ⬜     |

---

## Language Support Matrix 语言支持矩阵

Each algorithm will ship code snippets for:

| Lang       | Runtime           | File Ext | Notes                    |
| ---------- | ----------------- | -------- | ------------------------ |
| JavaScript | Node.js / Browser | `.js`    | Reference impl           |
| TypeScript | Node.js / Browser | `.ts`    | Primary impl (this repo) |
| Java       | JVM 21            | `.java`  |                          |
| Python     | CPython 3.12      | `.py`    |                          |
| Rust       | rustc 1.77        | `.rs`    | WASM impl                |
| C          | C11               | `.c`     |                          |
| C++        | C++20             | `.cpp`   |                          |
| Go         | Go 1.22           | `.go`    |                          |
| PHP        | PHP 8.3           | `.php`   |                          |
| Kotlin     | Kotlin 2.0        | `.kt`    | Android via Tauri        |
| Swift      | Swift 5.10        | `.swift` | iOS via Tauri            |

---

## Priority Order (Phase Plan) 实施优先级

### Phase 1 — Core (MVP) ✅ Partially done

1. Sorting: Bubble, Selection, Insertion, Merge, Quick, Heap ✅
2. Sorting: Shell, Counting, Radix, Bucket ⬜
3. Search: Linear, Binary, Jump, Interpolation ⬜

### Phase 2 — Data Structures

4. Linear: Array, Linked List, Stack, Queue
5. Trees: BST, Heap, Trie
6. Hash Table

### Phase 3 — Graph Algorithms

7. BFS, DFS on graphs
8. Dijkstra, Bellman-Ford, Floyd-Warshall
9. Kruskal, Prim, Topological Sort

### Phase 4 — DP Fundamentals

10. Fibonacci, Knapsack, LCS, Edit Distance
11. LIS, Max Subarray, Coin Change

### Phase 5 — Advanced

12. String algorithms (KMP, Rabin-Karp, Manacher)
13. Backtracking (N-Queens, Permutations, Subsets)
14. Advanced DP (Interval, Tree DP)
15. Advanced Trees (AVL, Red-Black, Segment, Fenwick)

---

## Implementation Notes

### Trace-Driven Architecture

All algorithms share a unified trace system:

- **Array algorithms**: `ArrayTraceEvent` (compare / swap / write / mark / range / complete)
- **Graph algorithms**: `GraphTraceEvent` (visit-node / visit-edge / update-dist / mark-path / complete)
- **Tree algorithms**: `TreeTraceEvent` (visit-node / insert / delete / rotate / mark / complete)

### File Structure (target)

```
packages/algorithms/src/
├── sorting.ts          ← ✅ done
├── search.ts           ← Phase 1
├── data-structures/
│   ├── linked-list.ts
│   ├── stack.ts
│   ├── queue.ts
│   ├── binary-search-tree.ts
│   ├── heap.ts
│   └── trie.ts
├── graph/
│   ├── bfs.ts
│   ├── dfs.ts
│   ├── dijkstra.ts
│   ├── bellman-ford.ts
│   ├── floyd-warshall.ts
│   ├── kruskal.ts
│   ├── prim.ts
│   └── topological-sort.ts
├── dynamic-programming/
│   ├── fibonacci.ts
│   ├── knapsack.ts
│   ├── lcs.ts
│   └── edit-distance.ts
├── string/
│   ├── kmp.ts
│   └── rabin-karp.ts
├── backtracking/
│   ├── n-queens.ts
│   └── permutations.ts
├── greedy/
│   └── activity-selection.ts
└── math/
    ├── sieve.ts
    └── gcd.ts
```

### Multi-Language Snippets Schema

```typescript
interface AlgorithmCodeSnippet {
  lang: SupportedLanguage
  code: string
  highlightLines?: number[] // lines to highlight per step
}

interface AlgorithmDefinition extends AlgorithmMeta {
  description: {
    en: string
    zh: string
  }
  snippets: AlgorithmCodeSnippet[]
  relatedProblems?: LeetCodeRef[]
}

interface LeetCodeRef {
  id: number
  titleSlug: string
  difficulty: "easy" | "medium" | "hard"
}
```
