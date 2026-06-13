import type { AlgorithmMeta, AlgorithmRun } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ────────────────────────────────────────────────────────────────

export const setsAlgorithms: Record<string, AlgorithmMeta> = {
  "cartesian-product": {
    id: "cartesian-product" as any,
    name: "Cartesian Product",
    displayName: { en: "Cartesian Product", zh: "笛卡尔积" },
    category: "math",
    difficulty: "intermediate",
    tags: ["sets", "combinatorics", "math"],
    description: {
      en: "Compute the Cartesian product of two sets, producing all ordered pairs.",
      zh: "计算两个集合的笛卡尔积，生成所有有序对。",
    },
    timeComplexity: { best: "O(n·m)", average: "O(n·m)", worst: "O(n·m)" },
    spaceComplexity: "O(n·m)",
    relatedProblems: [],
    snippets: [
      {
        lang: "javascript",
        code: `function cartesianProduct(a, b) {
  const result = [];
  for (const x of a) {
    for (const y of b) {
      result.push([x, y]);
    }
  }
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function cartesianProduct<T, U>(a: T[], b: U[]): [T, U][] {
  const result: [T, U][] = [];
  for (const x of a) {
    for (const y of b) {
      result.push([x, y]);
    }
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `from itertools import product

def cartesian_product(a, b):
    return list(product(a, b))`,
      },
      {
        lang: "java",
        code: `import java.util.*;

public List<int[]> cartesianProduct(int[] a, int[] b) {
    List<int[]> result = new ArrayList<>();
    for (int x : a) {
        for (int y : b) {
            result.add(new int[]{x, y});
        }
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn cartesian_product(a: &[i32], b: &[i32]) -> Vec<(i32, i32)> {
    a.iter()
        .flat_map(|&x| b.iter().map(move |&y| (x, y)))
        .collect()
}`,
      },
      {
        lang: "c",
        code: `void cartesianProduct(int *a, int na, int *b, int nb,
                        int out[][2], int *count) {
    *count = 0;
    for (int i = 0; i < na; i++)
        for (int j = 0; j < nb; j++) {
            out[*count][0] = a[i];
            out[*count][1] = b[j];
            (*count)++;
        }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
using namespace std;

vector<pair<int,int>> cartesianProduct(vector<int>& a, vector<int>& b) {
    vector<pair<int,int>> result;
    for (int x : a)
        for (int y : b)
            result.emplace_back(x, y);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func cartesianProduct(a, b []int) [][2]int {
    result := make([][2]int, 0, len(a)*len(b))
    for _, x := range a {
        for _, y := range b {
            result = append(result, [2]int{x, y})
        }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function cartesianProduct(array $a, array $b): array {
    $result = [];
    foreach ($a as $x) {
        foreach ($b as $y) {
            $result[] = [$x, $y];
        }
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun cartesianProduct(a: List<Int>, b: List<Int>): List<Pair<Int, Int>> =
    a.flatMap { x -> b.map { y -> x to y } }`,
      },
      {
        lang: "swift",
        code: `func cartesianProduct(_ a: [Int], _ b: [Int]) -> [(Int, Int)] {
    a.flatMap { x in b.map { y in (x, y) } }
}`,
      },
    ],
  },

  "power-set": {
    id: "power-set" as any,
    name: "Power Set",
    displayName: { en: "Power Set", zh: "幂集" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["sets", "backtracking", "recursion", "combinatorics"],
    description: {
      en: "Generate all subsets of a set using backtracking.",
      zh: "使用回溯算法生成一个集合的所有子集（幂集）。",
    },
    timeComplexity: { best: "O(2^n)", average: "O(2^n)", worst: "O(2^n)" },
    spaceComplexity: "O(n·2^n)",
    relatedProblems: [{ id: 78, titleSlug: "subsets", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function powerSet(nums) {
  const result = [[]];
  for (const n of nums) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], n]);
    }
  }
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function powerSet(nums: number[]): number[][] {
  const result: number[][] = [[]];
  for (const n of nums) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], n]);
    }
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `def power_set(nums):
    result = [[]]
    for n in nums:
        result += [subset + [n] for subset in result]
    return result`,
      },
      {
        lang: "java",
        code: `import java.util.*;

public List<List<Integer>> powerSet(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    result.add(new ArrayList<>());
    for (int n : nums) {
        int size = result.size();
        for (int i = 0; i < size; i++) {
            List<Integer> subset = new ArrayList<>(result.get(i));
            subset.add(n);
            result.add(subset);
        }
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn power_set(nums: &[i32]) -> Vec<Vec<i32>> {
    let mut result: Vec<Vec<i32>> = vec![vec![]];
    for &n in nums {
        let new: Vec<Vec<i32>> = result.iter()
            .map(|s| { let mut t = s.clone(); t.push(n); t })
            .collect();
        result.extend(new);
    }
    result
}`,
      },
      {
        lang: "c",
        code: `// Iterative power set using bitmask
void powerSet(int *nums, int n) {
    int total = 1 << n;
    for (int mask = 0; mask < total; mask++) {
        printf("{");
        for (int i = 0; i < n; i++)
            if (mask & (1 << i))
                printf("%d ", nums[i]);
        printf("}\\n");
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
using namespace std;

vector<vector<int>> powerSet(vector<int>& nums) {
    vector<vector<int>> result = {{}};
    for (int n : nums) {
        int sz = result.size();
        for (int i = 0; i < sz; i++) {
            auto s = result[i];
            s.push_back(n);
            result.push_back(s);
        }
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func powerSet(nums []int) [][]int {
    result := [][]int{{}}
    for _, n := range nums {
        sz := len(result)
        for i := 0; i < sz; i++ {
            subset := append([]int{}, result[i]...)
            subset = append(subset, n)
            result = append(result, subset)
        }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function powerSet(array $nums): array {
    $result = [[]];
    foreach ($nums as $n) {
        $new = [];
        foreach ($result as $subset) {
            $new[] = array_merge($subset, [$n]);
        }
        $result = array_merge($result, $new);
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun powerSet(nums: List<Int>): List<List<Int>> {
    var result: List<List<Int>> = listOf(emptyList())
    for (n in nums) {
        result = result + result.map { it + n }
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func powerSet(_ nums: [Int]) -> [[Int]] {
    var result: [[Int]] = [[]]
    for n in nums {
        result += result.map { $0 + [n] }
    }
    return result
}`,
      },
    ],
  },

  combinations: {
    id: "combinations" as any,
    name: "Combinations",
    displayName: { en: "Combinations", zh: "组合" },
    category: "backtracking",
    difficulty: "intermediate",
    tags: ["backtracking", "combinatorics", "recursion"],
    description: {
      en: "Generate all k-element combinations from n elements using backtracking.",
      zh: "使用回溯算法从 n 个元素中生成所有 k 元素组合。",
    },
    timeComplexity: { best: "O(C(n,k))", average: "O(C(n,k)·k)", worst: "O(C(n,k)·k)" },
    spaceComplexity: "O(k)",
    relatedProblems: [{ id: 77, titleSlug: "combinations", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function combine(n, k) {
  const result = [];
  function bt(start, path) {
    if (path.length === k) { result.push([...path]); return; }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(1, []);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  function bt(start: number, path: number[]): void {
    if (path.length === k) { result.push([...path]); return; }
    for (let i = start; i <= n; i++) {
      path.push(i);
      bt(i + 1, path);
      path.pop();
    }
  }
  bt(1, []);
  return result;
}`,
      },
      {
        lang: "python",
        code: `from itertools import combinations

def combine(n, k):
    return list(combinations(range(1, n + 1), k))`,
      },
      {
        lang: "java",
        code: `import java.util.*;

public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(1, n, k, new ArrayList<>(), result);
    return result;
}

private void backtrack(int start, int n, int k,
                       List<Integer> path, List<List<Integer>> result) {
    if (path.size() == k) { result.add(new ArrayList<>(path)); return; }
    for (int i = start; i <= n; i++) {
        path.add(i);
        backtrack(i + 1, n, k, path, result);
        path.remove(path.size() - 1);
    }
}`,
      },
      {
        lang: "rust",
        code: `fn combine(n: i32, k: i32) -> Vec<Vec<i32>> {
    let mut result = Vec::new();
    fn bt(start: i32, n: i32, k: i32, path: &mut Vec<i32>, result: &mut Vec<Vec<i32>>) {
        if path.len() as i32 == k { result.push(path.clone()); return; }
        for i in start..=n {
            path.push(i);
            bt(i + 1, n, k, path, result);
            path.pop();
        }
    }
    bt(1, n, k, &mut vec![], &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void bt(int start, int n, int k, int *path, int depth,
        int result[][16], int *count) {
    if (depth == k) {
        for (int i = 0; i < k; i++) result[*count][i] = path[i];
        (*count)++; return;
    }
    for (int i = start; i <= n; i++) {
        path[depth] = i;
        bt(i + 1, n, k, path, depth + 1, result, count);
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
using namespace std;

vector<vector<int>> combine(int n, int k) {
    vector<vector<int>> result;
    vector<int> path;
    function<void(int)> bt = [&](int start) {
        if ((int)path.size() == k) { result.push_back(path); return; }
        for (int i = start; i <= n; i++) {
            path.push_back(i);
            bt(i + 1);
            path.pop_back();
        }
    };
    bt(1);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func combine(n int, k int) [][]int {
    result := [][]int{}
    var bt func(start int, path []int)
    bt = func(start int, path []int) {
        if len(path) == k {
            result = append(result, append([]int{}, path...))
            return
        }
        for i := start; i <= n; i++ {
            bt(i+1, append(path, i))
        }
    }
    bt(1, []int{})
    return result
}`,
      },
      {
        lang: "php",
        code: `function combine(int $n, int $k): array {
    $result = [];
    $bt = function(int $start, array $path) use ($n, $k, &$result, &$bt): void {
        if (count($path) === $k) { $result[] = $path; return; }
        for ($i = $start; $i <= $n; $i++) {
            $bt($i + 1, array_merge($path, [$i]));
        }
    };
    $bt(1, []);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun combine(n: Int, k: Int): List<List<Int>> {
    val result = mutableListOf<List<Int>>()
    fun bt(start: Int, path: MutableList<Int>) {
        if (path.size == k) { result.add(path.toList()); return }
        for (i in start..n) { path.add(i); bt(i + 1, path); path.removeAt(path.lastIndex) }
    }
    bt(1, mutableListOf())
    return result
}`,
      },
      {
        lang: "swift",
        code: `func combine(_ n: Int, _ k: Int) -> [[Int]] {
    var result: [[Int]] = []
    func bt(_ start: Int, _ path: inout [Int]) {
        if path.count == k { result.append(path); return }
        for i in start...n { path.append(i); bt(i + 1, &path); path.removeLast() }
    }
    var path: [Int] = []
    bt(1, &path)
    return result
}`,
      },
    ],
  },

  "fisher-yates-shuffle": {
    id: "fisher-yates-shuffle" as any,
    name: "Fisher-Yates Shuffle",
    displayName: { en: "Fisher-Yates Shuffle", zh: "Fisher-Yates 洗牌" },
    category: "math",
    difficulty: "beginner",
    tags: ["randomization", "array", "in-place", "math"],
    description: {
      en: "Uniformly random in-place array shuffle in O(n) time.",
      zh: "O(n) 时间内对数组进行均匀随机原地洗牌。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 384, titleSlug: "shuffle-an-array", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function fisherYatesShuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}`,
      },
      {
        lang: "typescript",
        code: `function fisherYatesShuffle(arr: number[]): number[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}`,
      },
      {
        lang: "python",
        code: `import random

def fisher_yates_shuffle(arr):
    for i in range(len(arr) - 1, 0, -1):
        j = random.randint(0, i)
        arr[i], arr[j] = arr[j], arr[i]
    return arr`,
      },
      {
        lang: "java",
        code: `import java.util.Random;

public void fisherYatesShuffle(int[] arr) {
    Random rng = new Random();
    for (int i = arr.length - 1; i > 0; i--) {
        int j = rng.nextInt(i + 1);
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
}`,
      },
      {
        lang: "rust",
        code: `use rand::Rng;

fn fisher_yates_shuffle(arr: &mut Vec<i32>) {
    let mut rng = rand::thread_rng();
    let n = arr.len();
    for i in (1..n).rev() {
        let j = rng.gen_range(0..=i);
        arr.swap(i, j);
    }
}`,
      },
      {
        lang: "c",
        code: `#include <stdlib.h>

void fisherYatesShuffle(int *arr, int n) {
    for (int i = n - 1; i > 0; i--) {
        int j = rand() % (i + 1);
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <algorithm>
#include <random>
#include <vector>

void fisherYatesShuffle(std::vector<int>& arr) {
    std::mt19937 rng(std::random_device{}());
    for (int i = (int)arr.size() - 1; i > 0; i--) {
        std::uniform_int_distribution<int> dist(0, i);
        std::swap(arr[i], arr[dist(rng)]);
    }
}`,
      },
      {
        lang: "go",
        code: `import "math/rand"

func fisherYatesShuffle(arr []int) {
    for i := len(arr) - 1; i > 0; i-- {
        j := rand.Intn(i + 1)
        arr[i], arr[j] = arr[j], arr[i]
    }
}`,
      },
      {
        lang: "php",
        code: `function fisherYatesShuffle(array &$arr): void {
    for ($i = count($arr) - 1; $i > 0; $i--) {
        $j = random_int(0, $i);
        [$arr[$i], $arr[$j]] = [$arr[$j], $arr[$i]];
    }
}`,
      },
      {
        lang: "kotlin",
        code: `fun fisherYatesShuffle(arr: IntArray) {
    for (i in arr.indices.reversed().drop(0).dropLast(arr.size - arr.size + 1)) {
        // simpler:
    }
    for (i in arr.size - 1 downTo 1) {
        val j = (0..i).random()
        val tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
    }
}`,
      },
      {
        lang: "swift",
        code: `func fisherYatesShuffle(_ arr: inout [Int]) {
    for i in stride(from: arr.count - 1, through: 1, by: -1) {
        let j = Int.random(in: 0...i)
        arr.swapAt(i, j)
    }
}`,
      },
    ],
  },

  "longest-common-substring": {
    id: "longest-common-substring" as any,
    name: "Longest Common Substring",
    displayName: { en: "Longest Common Substring", zh: "最长公共子串" },
    category: "dynamic-programming",
    difficulty: "intermediate",
    tags: ["dynamic-programming", "string", "array", "dp"],
    description: {
      en: "Find the longest contiguous substring common to two sequences using DP.",
      zh: "使用动态规划找出两个序列中最长的公共连续子串。",
    },
    timeComplexity: { best: "O(n·m)", average: "O(n·m)", worst: "O(n·m)" },
    spaceComplexity: "O(n·m)",
    relatedProblems: [],
    snippets: [
      {
        lang: "javascript",
        code: `function longestCommonSubstring(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  let max = 0;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      if (a[i-1] === b[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        max = Math.max(max, dp[i][j]);
      }
  return max;
}`,
      },
      {
        lang: "typescript",
        code: `function longestCommonSubstring(a: number[], b: number[]): number {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
  let max = 0;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      if (a[i-1] === b[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        max = Math.max(max, dp[i][j]);
      }
  return max;
}`,
      },
      {
        lang: "python",
        code: `def longest_common_substring(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    best = 0
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                best = max(best, dp[i][j])
    return best`,
      },
      {
        lang: "java",
        code: `public int longestCommonSubstring(int[] a, int[] b) {
    int m = a.length, n = b.length, best = 0;
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (a[i-1] == b[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                best = Math.max(best, dp[i][j]);
            }
    return best;
}`,
      },
      {
        lang: "rust",
        code: `fn longest_common_substring(a: &[i32], b: &[i32]) -> usize {
    let (m, n) = (a.len(), b.len());
    let mut dp = vec![vec![0usize; n + 1]; m + 1];
    let mut best = 0;
    for i in 1..=m {
        for j in 1..=n {
            if a[i-1] == b[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1;
                best = best.max(dp[i][j]);
            }
        }
    }
    best
}`,
      },
      {
        lang: "c",
        code: `int longestCommonSubstring(int *a, int m, int *b, int n) {
    int dp[m+1][n+1], best = 0;
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++) dp[i][j] = 0;
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (a[i-1] == b[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                if (dp[i][j] > best) best = dp[i][j];
            }
    return best;
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
using namespace std;

int longestCommonSubstring(vector<int>& a, vector<int>& b) {
    int m = a.size(), n = b.size(), best = 0;
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++)
        for (int j = 1; j <= n; j++)
            if (a[i-1] == b[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
                best = max(best, dp[i][j]);
            }
    return best;
}`,
      },
      {
        lang: "go",
        code: `func longestCommonSubstring(a, b []int) int {
    m, n, best := len(a), len(b), 0
    dp := make([][]int, m+1)
    for i := range dp { dp[i] = make([]int, n+1) }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if a[i-1] == b[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
                if dp[i][j] > best { best = dp[i][j] }
            }
        }
    }
    return best
}`,
      },
      {
        lang: "php",
        code: `function longestCommonSubstring(array $a, array $b): int {
    $m = count($a); $n = count($b); $best = 0;
    $dp = array_fill(0, $m + 1, array_fill(0, $n + 1, 0));
    for ($i = 1; $i <= $m; $i++)
        for ($j = 1; $j <= $n; $j++)
            if ($a[$i-1] === $b[$j-1]) {
                $dp[$i][$j] = $dp[$i-1][$j-1] + 1;
                $best = max($best, $dp[$i][$j]);
            }
    return $best;
}`,
      },
      {
        lang: "kotlin",
        code: `fun longestCommonSubstring(a: IntArray, b: IntArray): Int {
    val m = a.size; val n = b.size
    val dp = Array(m + 1) { IntArray(n + 1) }
    var best = 0
    for (i in 1..m)
        for (j in 1..n)
            if (a[i-1] == b[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1
                if (dp[i][j] > best) best = dp[i][j]
            }
    return best
}`,
      },
      {
        lang: "swift",
        code: `func longestCommonSubstring(_ a: [Int], _ b: [Int]) -> Int {
    let m = a.count, n = b.count
    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)
    var best = 0
    for i in 1...m {
        for j in 1...n {
            if a[i-1] == b[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
                best = max(best, dp[i][j])
            }
        }
    }
    return best
}`,
      },
    ],
  },
}

// ─── Implementations ──────────────────────────────────────────────────────────

export function fisherYatesShuffle(input: number[]): AlgorithmRun {
  const rec = new ArrayTraceRecorder(input)
  const n = rec.values.length
  for (let i = n - 1; i > 0; i--) {
    // deterministic j for tracing purposes (use i/2 as a stand-in swap)
    const j = Math.floor(Math.random() * (i + 1))
    rec.mark([i, j], "active")
    rec.swap(i, j)
    rec.mark([i], "sorted")
  }
  return rec.finish(setsAlgorithms["fisher-yates-shuffle"]!)
}

export function powerSet(input: number[]): AlgorithmRun {
  const rec = new ArrayTraceRecorder(input)
  const n = rec.values.length
  for (let mask = 0; mask < 1 << n; mask++) {
    const indices: number[] = []
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) indices.push(i)
    }
    if (indices.length > 0) {
      rec.mark(indices, "active")
    }
  }
  return rec.finish(setsAlgorithms["power-set"]!)
}

// ─── Cartesian Product ────────────────────────────────────────────────────────
// Input: [...setA, -1, ...setB]. Visualise each pair comparison.
function cartesianProduct(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const A = sep > 0 ? input.slice(0, sep) : [1, 2, 3]
  const B = sep > 0 ? input.slice(sep + 1) : [4, 5]
  // Display array = A concatenated with B
  const display = [...A, ...B]
  const rec = new ArrayTraceRecorder(display)
  const lenA = A.length
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      rec.compareValue(i, lenA + j, A[i] ?? 0, B[j] ?? 0)
      rec.mark([i], "active")
      rec.mark([lenA + j], "sorted")
    }
  }
  return rec.finish(setsAlgorithms["cartesian-product"]!)
}

// ─── Combinations ─────────────────────────────────────────────────────────────
// Input: [...elements, -1, k]. Pick k elements from the array.
function combinations(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const arr = sep > 0 ? input.slice(0, sep) : [1, 2, 3, 4, 5]
  const k = sep > 0 ? Math.max(1, input[sep + 1] ?? 2) : 2
  const rec = new ArrayTraceRecorder([...arr])
  const chosen: number[] = []

  function backtrack(start: number) {
    if (chosen.length === k) {
      for (const i of chosen) rec.mark([i], "sorted")
      return
    }
    for (let i = start; i < arr.length; i++) {
      rec.compareValue(i, start, i, start)
      rec.mark([i], "active")
      chosen.push(i)
      backtrack(i + 1)
      chosen.pop()
      rec.mark([i], "visited")
    }
  }

  backtrack(0)
  return rec.finish(setsAlgorithms["combinations"]!)
}

// ─── Longest Common Substring ─────────────────────────────────────────────────
// Input: [...A, -1, ...B]. Visualise dp table flattened.
function longestCommonSubstring(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const A = sep > 0 ? input.slice(0, sep) : [1, 2, 3, 4, 5]
  const B = sep > 0 ? input.slice(sep + 1) : [3, 4, 5, 6]
  const m = A.length, n = B.length
  const flat = new Array<number>((m + 1) * (n + 1)).fill(0)
  const rec = new ArrayTraceRecorder(flat)
  let maxLen = 0
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const idx = i * (n + 1) + j
      rec.compareValue(i - 1, j - 1, A[i - 1] ?? 0, B[j - 1] ?? 0)
      if ((A[i - 1] ?? -1) === (B[j - 1] ?? -2)) {
        const val = (flat[(i - 1) * (n + 1) + (j - 1)] ?? 0) + 1
        flat[idx] = val
        rec.write(idx, val)
        if (val > maxLen) { maxLen = val; rec.mark([idx], "sorted") }
        else rec.mark([idx], "active")
      } else {
        flat[idx] = 0
        rec.mark([idx], "visited")
      }
    }
  }
  return rec.finish(setsAlgorithms["longest-common-substring"]!)
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function runSetsAlgorithm(algorithmId: string, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "fisher-yates-shuffle":      return fisherYatesShuffle(input)
    case "power-set":                 return powerSet(input)
    case "cartesian-product":         return cartesianProduct(input)
    case "combinations":              return combinations(input)
    case "longest-common-substring":  return longestCommonSubstring(input)
    default:
      throw new Error(`Unknown sets algorithm: ${algorithmId}`)
  }
}
