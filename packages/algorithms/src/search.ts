import type { AlgorithmMeta, AlgorithmRun, SearchAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const searchAlgorithms: Record<SearchAlgorithmId, AlgorithmMeta> = {
  "linear-search": {
    id: "linear-search",
    name: "Linear search",
    displayName: { en: "Linear Search", zh: "线性搜索" },
    category: "search",
    difficulty: "beginner",
    tags: ["array", "search"],
    description: {
      en: "Sequentially checks each element until the target is found or the array is exhausted.",
      zh: "逐一检查每个元素，直到找到目标值或遍历完整个数组。",
    },
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 704, titleSlug: "binary-search", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function linearSearch(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `def linear_search(arr: list[int], target: int) -> int:
    for i, v in enumerate(arr):
        if v == target:
            return i
    return -1`,
      },
      {
        lang: "rust",
        code: `fn linear_search(arr: &[i32], target: i32) -> Option<usize> {
    arr.iter().position(|&x| x == target)
}`,
      },
      {
        lang: "c",
        code: `int linear_search(int *arr, int n, int target) {
    for (int i = 0; i < n; i++)
        if (arr[i] == target) return i;
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `int linearSearch(const std::vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++)
        if (arr[i] == target) return i;
    return -1;
}`,
      },
      {
        lang: "go",
        code: `func linearSearch(arr []int, target int) int {
    for i, v := range arr {
        if v == target {
            return i
        }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function linearSearch(array $arr, int $target): int {
    foreach ($arr as $i => $v) {
        if ($v === $target) return $i;
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `fun linearSearch(arr: IntArray, target: Int): Int {
    for (i in arr.indices) {
        if (arr[i] == target) return i
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func linearSearch(_ arr: [Int], _ target: Int) -> Int {
    for (i, v) in arr.enumerated() {
        if v == target { return i }
    }
    return -1
}`,
      },
    ],
  },

  "binary-search": {
    id: "binary-search",
    name: "Binary search",
    displayName: { en: "Binary Search", zh: "二分搜索" },
    category: "search",
    difficulty: "beginner",
    tags: ["array", "search", "divide-conquer"],
    description: {
      en: "Repeatedly halves the search range on a sorted array to locate the target in O(log n) time.",
      zh: "在有序数组中反复折半缩小搜索范围，以 O(log n) 时间定位目标值。",
    },
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 704, titleSlug: "binary-search", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function binarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int binarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `def binary_search(arr: list[int], target: int) -> int:
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      },
      {
        lang: "rust",
        code: `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let (mut lo, mut hi) = (0usize, arr.len().wrapping_sub(1));
    while lo <= hi {
        let mid = lo + (hi - lo) / 2;
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(mid),
            std::cmp::Ordering::Less => lo = mid + 1,
            std::cmp::Ordering::Greater => hi = mid.wrapping_sub(1),
        }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `int binary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `int binarySearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "go",
        code: `func binarySearch(arr []int, target int) int {
    lo, hi := 0, len(arr)-1
    for lo <= hi {
        mid := lo + (hi-lo)/2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function binarySearch(array $arr, int $target): int {
    $lo = 0; $hi = count($arr) - 1;
    while ($lo <= $hi) {
        $mid = intdiv($lo + $hi, 2);
        if ($arr[$mid] === $target) return $mid;
        elseif ($arr[$mid] < $target) $lo = $mid + 1;
        else $hi = $mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `fun binarySearch(arr: IntArray, target: Int): Int {
    var lo = 0; var hi = arr.size - 1
    while (lo <= hi) {
        val mid = lo + (hi - lo) / 2
        when {
            arr[mid] == target -> return mid
            arr[mid] < target  -> lo = mid + 1
            else               -> hi = mid - 1
        }
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func binarySearch(_ arr: [Int], _ target: Int) -> Int {
    var lo = 0, hi = arr.count - 1
    while lo <= hi {
        let mid = lo + (hi - lo) / 2
        if arr[mid] == target { return mid }
        else if arr[mid] < target { lo = mid + 1 }
        else { hi = mid - 1 }
    }
    return -1
}`,
      },
    ],
  },

  "jump-search": {
    id: "jump-search",
    name: "Jump search",
    displayName: { en: "Jump Search", zh: "跳跃搜索" },
    category: "search",
    difficulty: "intermediate",
    tags: ["array", "search"],
    description: {
      en: "Jumps ahead by fixed steps of √n to find the block containing the target, then scans linearly within that block.",
      zh: "以 √n 为步长跳跃定位目标所在块，再在块内进行线性扫描。",
    },
    timeComplexity: { best: "O(1)", average: "O(√n)", worst: "O(√n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 35, titleSlug: "search-insert-position", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0, curr = step;
  while (curr < n && arr[curr] <= target) {
    prev = curr;
    curr += step;
  }
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function jumpSearch(arr: number[], target: number): number {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0, curr = step;
  while (curr < n && arr[curr] <= target) {
    prev = curr;
    curr += step;
  }
  for (let i = prev; i < Math.min(curr, n); i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int jumpSearch(int[] arr, int target) {
    int n = arr.length;
    int step = (int) Math.sqrt(n);
    int prev = 0, curr = step;
    while (curr < n && arr[curr] <= target) {
        prev = curr;
        curr += step;
    }
    for (int i = prev; i < Math.min(curr, n); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `import math

def jump_search(arr: list[int], target: int) -> int:
    n = len(arr)
    step = int(math.sqrt(n))
    prev, curr = 0, step
    while curr < n and arr[curr] <= target:
        prev = curr
        curr += step
    for i in range(prev, min(curr, n)):
        if arr[i] == target:
            return i
    return -1`,
      },
      {
        lang: "rust",
        code: `fn jump_search(arr: &[i32], target: i32) -> Option<usize> {
    let n = arr.len();
    let step = (n as f64).sqrt() as usize;
    let (mut prev, mut curr) = (0, step);
    while curr < n && arr[curr] <= target {
        prev = curr;
        curr += step;
    }
    for i in prev..curr.min(n) {
        if arr[i] == target { return Some(i); }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `#include <math.h>
int jump_search(int *arr, int n, int target) {
    int step = (int)sqrt((double)n);
    int prev = 0, curr = step;
    while (curr < n && arr[curr] <= target) {
        prev = curr;
        curr += step;
    }
    int end = curr < n ? curr : n;
    for (int i = prev; i < end; i++)
        if (arr[i] == target) return i;
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `#include <cmath>
int jumpSearch(const std::vector<int>& arr, int target) {
    int n = arr.size();
    int step = (int)std::sqrt(n);
    int prev = 0, curr = step;
    while (curr < n && arr[curr] <= target) {
        prev = curr;
        curr += step;
    }
    for (int i = prev; i < std::min(curr, n); i++)
        if (arr[i] == target) return i;
    return -1;
}`,
      },
      {
        lang: "go",
        code: `import "math"

func jumpSearch(arr []int, target int) int {
    n := len(arr)
    step := int(math.Sqrt(float64(n)))
    prev, curr := 0, step
    for curr < n && arr[curr] <= target {
        prev = curr
        curr += step
    }
    end := curr
    if end > n { end = n }
    for i := prev; i < end; i++ {
        if arr[i] == target { return i }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function jumpSearch(array $arr, int $target): int {
    $n = count($arr);
    $step = (int)sqrt($n);
    $prev = 0; $curr = $step;
    while ($curr < $n && $arr[$curr] <= $target) {
        $prev = $curr;
        $curr += $step;
    }
    for ($i = $prev; $i < min($curr, $n); $i++) {
        if ($arr[$i] === $target) return $i;
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `import kotlin.math.sqrt
import kotlin.math.min

fun jumpSearch(arr: IntArray, target: Int): Int {
    val n = arr.size
    val step = sqrt(n.toDouble()).toInt()
    var prev = 0; var curr = step
    while (curr < n && arr[curr] <= target) {
        prev = curr; curr += step
    }
    for (i in prev until min(curr, n)) {
        if (arr[i] == target) return i
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func jumpSearch(_ arr: [Int], _ target: Int) -> Int {
    let n = arr.count
    let step = Int(Double(n).squareRoot())
    var prev = 0, curr = step
    while curr < n && arr[curr] <= target {
        prev = curr; curr += step
    }
    for i in prev..<min(curr, n) {
        if arr[i] == target { return i }
    }
    return -1
}`,
      },
    ],
  },

  "interpolation-search": {
    id: "interpolation-search",
    name: "Interpolation search",
    displayName: { en: "Interpolation Search", zh: "插值搜索" },
    category: "search",
    difficulty: "intermediate",
    tags: ["array", "search", "math"],
    description: {
      en: "Estimates the target position using linear interpolation, offering O(log log n) average time on uniformly distributed data.",
      zh: "利用线性插值估算目标位置，对均匀分布数据平均时间复杂度为 O(log log n)。",
    },
    timeComplexity: { best: "O(1)", average: "O(log log n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    snippets: [
      {
        lang: "javascript",
        code: `function interpolationSearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (lo === hi) return arr[lo] === target ? lo : -1;
    const probe = lo + Math.floor(
      ((target - arr[lo]) / (arr[hi] - arr[lo])) * (hi - lo)
    );
    if (arr[probe] === target) return probe;
    else if (arr[probe] < target) lo = probe + 1;
    else hi = probe - 1;
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function interpolationSearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
    if (lo === hi) return arr[lo] === target ? lo : -1;
    const probe = lo + Math.floor(
      ((target - arr[lo]) / (arr[hi] - arr[lo])) * (hi - lo)
    );
    if (arr[probe] === target) return probe;
    else if (arr[probe] < target) lo = probe + 1;
    else hi = probe - 1;
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int interpolationSearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) return arr[lo] == target ? lo : -1;
        int probe = lo + (int)(((long)(target - arr[lo]) * (hi - lo))
                                / (arr[hi] - arr[lo]));
        if (arr[probe] == target) return probe;
        else if (arr[probe] < target) lo = probe + 1;
        else hi = probe - 1;
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `def interpolation_search(arr: list[int], target: int) -> int:
    lo, hi = 0, len(arr) - 1
    while lo <= hi and arr[lo] <= target <= arr[hi]:
        if lo == hi:
            return lo if arr[lo] == target else -1
        probe = lo + int(
            (target - arr[lo]) / (arr[hi] - arr[lo]) * (hi - lo)
        )
        if arr[probe] == target:
            return probe
        elif arr[probe] < target:
            lo = probe + 1
        else:
            hi = probe - 1
    return -1`,
      },
      {
        lang: "rust",
        code: `fn interpolation_search(arr: &[i32], target: i32) -> Option<usize> {
    let (mut lo, mut hi) = (0usize, arr.len().wrapping_sub(1));
    while lo <= hi && target >= arr[lo] && target <= arr[hi] {
        if lo == hi { return if arr[lo] == target { Some(lo) } else { None }; }
        let range = (arr[hi] - arr[lo]) as usize;
        let probe = lo + ((target - arr[lo]) as usize) * (hi - lo) / range;
        match arr[probe].cmp(&target) {
            std::cmp::Ordering::Equal => return Some(probe),
            std::cmp::Ordering::Less  => lo = probe + 1,
            std::cmp::Ordering::Greater => hi = probe.wrapping_sub(1),
        }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `int interpolation_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) return arr[lo] == target ? lo : -1;
        int probe = lo + (int)(((long long)(target - arr[lo]) * (hi - lo))
                               / (arr[hi] - arr[lo]));
        if (arr[probe] == target) return probe;
        else if (arr[probe] < target) lo = probe + 1;
        else hi = probe - 1;
    }
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `int interpolationSearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) return arr[lo] == target ? lo : -1;
        int probe = lo + (int)(((long long)(target - arr[lo]) * (hi - lo))
                               / (arr[hi] - arr[lo]));
        if (arr[probe] == target) return probe;
        else if (arr[probe] < target) lo = probe + 1;
        else hi = probe - 1;
    }
    return -1;
}`,
      },
      {
        lang: "go",
        code: `func interpolationSearch(arr []int, target int) int {
    lo, hi := 0, len(arr)-1
    for lo <= hi && target >= arr[lo] && target <= arr[hi] {
        if lo == hi {
            if arr[lo] == target { return lo }
            return -1
        }
        probe := lo + (target-arr[lo])*(hi-lo)/(arr[hi]-arr[lo])
        if arr[probe] == target { return probe }
        else if arr[probe] < target { lo = probe + 1 }
        else { hi = probe - 1 }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function interpolationSearch(array $arr, int $target): int {
    $lo = 0; $hi = count($arr) - 1;
    while ($lo <= $hi && $target >= $arr[$lo] && $target <= $arr[$hi]) {
        if ($lo === $hi) return $arr[$lo] === $target ? $lo : -1;
        $probe = $lo + intdiv(($target - $arr[$lo]) * ($hi - $lo), $arr[$hi] - $arr[$lo]);
        if ($arr[$probe] === $target) return $probe;
        elseif ($arr[$probe] < $target) $lo = $probe + 1;
        else $hi = $probe - 1;
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `fun interpolationSearch(arr: IntArray, target: Int): Int {
    var lo = 0; var hi = arr.size - 1
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi) return if (arr[lo] == target) lo else -1
        val probe = lo + (target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo])
        when {
            arr[probe] == target -> return probe
            arr[probe] < target  -> lo = probe + 1
            else                 -> hi = probe - 1
        }
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func interpolationSearch(_ arr: [Int], _ target: Int) -> Int {
    var lo = 0, hi = arr.count - 1
    while lo <= hi && target >= arr[lo] && target <= arr[hi] {
        if lo == hi { return arr[lo] == target ? lo : -1 }
        let probe = lo + (target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo])
        if arr[probe] == target { return probe }
        else if arr[probe] < target { lo = probe + 1 }
        else { hi = probe - 1 }
    }
    return -1
}`,
      },
    ],
  },

  "exponential-search": {
    id: "exponential-search",
    name: "Exponential search",
    displayName: { en: "Exponential Search", zh: "指数搜索" },
    category: "search",
    difficulty: "intermediate",
    tags: ["array", "search"],
    description: {
      en: "Finds the range where the target may exist by doubling the index, then applies binary search within that range.",
      zh: "通过指数倍增确定目标可能存在的范围，再在该范围内执行二分搜索。",
    },
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    snippets: [
      {
        lang: "javascript",
        code: `function exponentialSearch(arr, target) {
  const n = arr.length;
  if (arr[0] === target) return 0;
  let bound = 1;
  while (bound < n && arr[bound] <= target) bound *= 2;
  let lo = bound >> 1, hi = Math.min(bound, n - 1);
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function exponentialSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (arr[0] === target) return 0;
  let bound = 1;
  while (bound < n && arr[bound] <= target) bound *= 2;
  let lo = bound >> 1, hi = Math.min(bound, n - 1);
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int exponentialSearch(int[] arr, int target) {
    int n = arr.length;
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] <= target) bound *= 2;
    int lo = bound / 2, hi = Math.min(bound, n - 1);
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `def exponential_search(arr: list[int], target: int) -> int:
    n = len(arr)
    if arr[0] == target:
        return 0
    bound = 1
    while bound < n and arr[bound] <= target:
        bound *= 2
    lo, hi = bound // 2, min(bound, n - 1)
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
      },
      {
        lang: "rust",
        code: `fn exponential_search(arr: &[i32], target: i32) -> Option<usize> {
    let n = arr.len();
    if arr[0] == target { return Some(0); }
    let mut bound = 1usize;
    while bound < n && arr[bound] <= target { bound *= 2; }
    let (mut lo, mut hi) = (bound / 2, bound.min(n - 1));
    while lo <= hi {
        let mid = lo + (hi - lo) / 2;
        match arr[mid].cmp(&target) {
            std::cmp::Ordering::Equal   => return Some(mid),
            std::cmp::Ordering::Less    => lo = mid + 1,
            std::cmp::Ordering::Greater => hi = mid.wrapping_sub(1),
        }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `int exponential_search(int *arr, int n, int target) {
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] <= target) bound *= 2;
    int lo = bound / 2, hi = bound < n ? bound : n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `int exponentialSearch(const std::vector<int>& arr, int target) {
    int n = arr.size();
    if (arr[0] == target) return 0;
    int bound = 1;
    while (bound < n && arr[bound] <= target) bound *= 2;
    int lo = bound / 2, hi = std::min(bound, n - 1);
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "go",
        code: `func exponentialSearch(arr []int, target int) int {
    n := len(arr)
    if arr[0] == target { return 0 }
    bound := 1
    for bound < n && arr[bound] <= target { bound *= 2 }
    lo, hi := bound/2, bound
    if hi >= n { hi = n - 1 }
    for lo <= hi {
        mid := lo + (hi-lo)/2
        if arr[mid] == target { return mid }
        else if arr[mid] < target { lo = mid + 1 }
        else { hi = mid - 1 }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function exponentialSearch(array $arr, int $target): int {
    $n = count($arr);
    if ($arr[0] === $target) return 0;
    $bound = 1;
    while ($bound < $n && $arr[$bound] <= $target) $bound *= 2;
    $lo = intdiv($bound, 2);
    $hi = min($bound, $n - 1);
    while ($lo <= $hi) {
        $mid = intdiv($lo + $hi, 2);
        if ($arr[$mid] === $target) return $mid;
        elseif ($arr[$mid] < $target) $lo = $mid + 1;
        else $hi = $mid - 1;
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `import kotlin.math.min

fun exponentialSearch(arr: IntArray, target: Int): Int {
    val n = arr.size
    if (arr[0] == target) return 0
    var bound = 1
    while (bound < n && arr[bound] <= target) bound *= 2
    var lo = bound / 2; var hi = min(bound, n - 1)
    while (lo <= hi) {
        val mid = lo + (hi - lo) / 2
        when {
            arr[mid] == target -> return mid
            arr[mid] < target  -> lo = mid + 1
            else               -> hi = mid - 1
        }
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func exponentialSearch(_ arr: [Int], _ target: Int) -> Int {
    let n = arr.count
    if arr[0] == target { return 0 }
    var bound = 1
    while bound < n && arr[bound] <= target { bound *= 2 }
    var lo = bound / 2, hi = min(bound, n - 1)
    while lo <= hi {
        let mid = lo + (hi - lo) / 2
        if arr[mid] == target { return mid }
        else if arr[mid] < target { lo = mid + 1 }
        else { hi = mid - 1 }
    }
    return -1
}`,
      },
    ],
  },

  "ternary-search": {
    id: "ternary-search",
    name: "Ternary search",
    displayName: { en: "Ternary Search", zh: "三分搜索" },
    category: "search",
    difficulty: "intermediate",
    tags: ["array", "search", "divide-conquer"],
    description: {
      en: "Divides the search space into three equal parts using two midpoints and eliminates one third each iteration.",
      zh: "用两个中间点将搜索空间三等分，每次迭代排除三分之一范围。",
    },
    timeComplexity: { best: "O(1)", average: "O(log₃ n)", worst: "O(log₃ n)" },
    spaceComplexity: "O(1)",
    snippets: [
      {
        lang: "javascript",
        code: `function ternarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const third = Math.floor((hi - lo) / 3);
    const mid1 = lo + third;
    const mid2 = hi - third;
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    if (target < arr[mid1]) hi = mid1 - 1;
    else if (target > arr[mid2]) lo = mid2 + 1;
    else { lo = mid1 + 1; hi = mid2 - 1; }
  }
  return -1;
}`,
      },
      {
        lang: "typescript",
        code: `function ternarySearch(arr: number[], target: number): number {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const third = Math.floor((hi - lo) / 3);
    const mid1 = lo + third;
    const mid2 = hi - third;
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    if (target < arr[mid1]) hi = mid1 - 1;
    else if (target > arr[mid2]) lo = mid2 + 1;
    else { lo = mid1 + 1; hi = mid2 - 1; }
  }
  return -1;
}`,
      },
      {
        lang: "java",
        code: `public static int ternarySearch(int[] arr, int target) {
    int lo = 0, hi = arr.length - 1;
    while (lo <= hi) {
        int third = (hi - lo) / 3;
        int mid1 = lo + third, mid2 = hi - third;
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        if (target < arr[mid1]) hi = mid1 - 1;
        else if (target > arr[mid2]) lo = mid2 + 1;
        else { lo = mid1 + 1; hi = mid2 - 1; }
    }
    return -1;
}`,
      },
      {
        lang: "python",
        code: `def ternary_search(arr: list[int], target: int) -> int:
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        third = (hi - lo) // 3
        mid1, mid2 = lo + third, hi - third
        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2
        if target < arr[mid1]:
            hi = mid1 - 1
        elif target > arr[mid2]:
            lo = mid2 + 1
        else:
            lo, hi = mid1 + 1, mid2 - 1
    return -1`,
      },
      {
        lang: "rust",
        code: `fn ternary_search(arr: &[i32], target: i32) -> Option<usize> {
    let (mut lo, mut hi) = (0usize, arr.len().wrapping_sub(1));
    while lo <= hi {
        let third = (hi - lo) / 3;
        let (mid1, mid2) = (lo + third, hi - third);
        if arr[mid1] == target { return Some(mid1); }
        if arr[mid2] == target { return Some(mid2); }
        if target < arr[mid1] { hi = mid1.wrapping_sub(1); }
        else if target > arr[mid2] { lo = mid2 + 1; }
        else { lo = mid1 + 1; hi = mid2.wrapping_sub(1); }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `int ternary_search(int *arr, int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int third = (hi - lo) / 3;
        int mid1 = lo + third, mid2 = hi - third;
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        if (target < arr[mid1]) hi = mid1 - 1;
        else if (target > arr[mid2]) lo = mid2 + 1;
        else { lo = mid1 + 1; hi = mid2 - 1; }
    }
    return -1;
}`,
      },
      {
        lang: "cpp",
        code: `int ternarySearch(const std::vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int third = (hi - lo) / 3;
        int mid1 = lo + third, mid2 = hi - third;
        if (arr[mid1] == target) return mid1;
        if (arr[mid2] == target) return mid2;
        if (target < arr[mid1]) hi = mid1 - 1;
        else if (target > arr[mid2]) lo = mid2 + 1;
        else { lo = mid1 + 1; hi = mid2 - 1; }
    }
    return -1;
}`,
      },
      {
        lang: "go",
        code: `func ternarySearch(arr []int, target int) int {
    lo, hi := 0, len(arr)-1
    for lo <= hi {
        third := (hi - lo) / 3
        mid1, mid2 := lo+third, hi-third
        if arr[mid1] == target { return mid1 }
        if arr[mid2] == target { return mid2 }
        if target < arr[mid1] { hi = mid1 - 1 }
        else if target > arr[mid2] { lo = mid2 + 1 }
        else { lo = mid1 + 1; hi = mid2 - 1 }
    }
    return -1
}`,
      },
      {
        lang: "php",
        code: `function ternarySearch(array $arr, int $target): int {
    $lo = 0; $hi = count($arr) - 1;
    while ($lo <= $hi) {
        $third = intdiv($hi - $lo, 3);
        $mid1 = $lo + $third; $mid2 = $hi - $third;
        if ($arr[$mid1] === $target) return $mid1;
        if ($arr[$mid2] === $target) return $mid2;
        if ($target < $arr[$mid1]) $hi = $mid1 - 1;
        elseif ($target > $arr[$mid2]) $lo = $mid2 + 1;
        else { $lo = $mid1 + 1; $hi = $mid2 - 1; }
    }
    return -1;
}`,
      },
      {
        lang: "kotlin",
        code: `fun ternarySearch(arr: IntArray, target: Int): Int {
    var lo = 0; var hi = arr.size - 1
    while (lo <= hi) {
        val third = (hi - lo) / 3
        val mid1 = lo + third; val mid2 = hi - third
        if (arr[mid1] == target) return mid1
        if (arr[mid2] == target) return mid2
        when {
            target < arr[mid1] -> hi = mid1 - 1
            target > arr[mid2] -> lo = mid2 + 1
            else -> { lo = mid1 + 1; hi = mid2 - 1 }
        }
    }
    return -1
}`,
      },
      {
        lang: "swift",
        code: `func ternarySearch(_ arr: [Int], _ target: Int) -> Int {
    var lo = 0, hi = arr.count - 1
    while lo <= hi {
        let third = (hi - lo) / 3
        let mid1 = lo + third, mid2 = hi - third
        if arr[mid1] == target { return mid1 }
        if arr[mid2] == target { return mid2 }
        if target < arr[mid1] { hi = mid1 - 1 }
        else if target > arr[mid2] { lo = mid2 + 1 }
        else { lo = mid1 + 1; hi = mid2 - 1 }
    }
    return -1
}`,
      },
    ],
  },
}

// ─── Algorithm implementations ────────────────────────────────────────────────

/**
 * Linear Search
 * Checks each element sequentially. Input array does not need to be sorted.
 * The recorder operates on the array as-is; the "output" array is unchanged
 * because search algorithms do not mutate the input.
 */
export function runLinearSearch(input: number[], target?: number): AlgorithmRun {
  const rec = new ArrayTraceRecorder(input)
  // Default target: middle value of the sorted copy so there is always a hit
  const t = target ?? input[Math.floor(input.length / 2)] ?? 0
  const meta = searchAlgorithms["linear-search"]

  for (let i = 0; i < rec.values.length; i++) {
    rec.mark([i], "active", 3)
    const diff = rec.compareValue(i, i, rec.values[i] ?? 0, t, 4)
    if (diff === 0) {
      rec.mark([i], "sorted", 5)
      return rec.finish(meta)
    }
    rec.mark([i], "visited", 7)
  }

  return rec.finish(meta)
}

/**
 * Binary Search
 * Requires a sorted input array.
 */
export function runBinarySearch(input: number[], target?: number): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder(sorted)
  const t = target ?? sorted[Math.floor(sorted.length / 2)] ?? 0
  const meta = searchAlgorithms["binary-search"]

  let lo = 0
  let hi = rec.values.length - 1

  while (lo <= hi) {
    rec.range([lo, hi], "subarray", 3)
    const mid = (lo + hi) >>> 1
    rec.mark([mid], "active", 4)
    const diff = rec.compareValue(mid, mid, rec.values[mid] ?? 0, t, 5)
    if (diff === 0) {
      rec.mark([mid], "sorted", 6)
      return rec.finish(meta)
    } else if (diff < 0) {
      rec.mark([lo], "visited", 8)
      lo = mid + 1
    } else {
      rec.mark([hi], "visited", 10)
      hi = mid - 1
    }
  }

  return rec.finish(meta)
}

/**
 * Jump Search
 * Requires a sorted input array.
 */
export function runJumpSearch(input: number[], target?: number): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder(sorted)
  const n = rec.values.length
  const t = target ?? sorted[Math.floor(n / 2)] ?? 0
  const meta = searchAlgorithms["jump-search"]

  const step = Math.max(1, Math.floor(Math.sqrt(n)))
  let prev = 0
  let curr = step

  // Jump phase
  while (curr < n && (rec.values[curr] ?? 0) <= t) {
    rec.mark([curr], "active", 5)
    rec.compareValue(curr, curr, rec.values[curr] ?? 0, t, 6)
    prev = curr
    curr += step
  }

  // Linear scan phase
  const end = Math.min(curr, n)
  for (let i = prev; i < end; i++) {
    rec.mark([i], "visited", 11)
    const diff = rec.compareValue(i, i, rec.values[i] ?? 0, t, 12)
    if (diff === 0) {
      rec.mark([i], "sorted", 13)
      return rec.finish(meta)
    }
  }

  return rec.finish(meta)
}

/**
 * Interpolation Search
 * Requires a sorted, uniformly distributed input array for best performance.
 */
export function runInterpolationSearch(input: number[], target?: number): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder(sorted)
  const t = target ?? sorted[Math.floor(sorted.length / 2)] ?? 0
  const meta = searchAlgorithms["interpolation-search"]

  let lo = 0
  let hi = rec.values.length - 1

  while (lo <= hi && t >= (rec.values[lo] ?? 0) && t <= (rec.values[hi] ?? 0)) {
    if (lo === hi) {
      rec.mark([lo], "active", 4)
      const diff = rec.compareValue(lo, lo, rec.values[lo] ?? 0, t, 5)
      if (diff === 0) rec.mark([lo], "sorted", 6)
      return rec.finish(meta)
    }

    const range = (rec.values[hi] ?? 0) - (rec.values[lo] ?? 0)
    const probe = range === 0 ? lo : lo + Math.floor(((t - (rec.values[lo] ?? 0)) / range) * (hi - lo))

    rec.mark([probe], "active", 10)
    const diff = rec.compareValue(probe, probe, rec.values[probe] ?? 0, t, 11)

    if (diff === 0) {
      rec.mark([probe], "sorted", 12)
      return rec.finish(meta)
    } else if (diff < 0) {
      lo = probe + 1
    } else {
      hi = probe - 1
    }
  }

  return rec.finish(meta)
}

/**
 * Exponential Search
 * Requires a sorted input array.
 */
export function runExponentialSearch(input: number[], target?: number): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder(sorted)
  const n = rec.values.length
  const t = target ?? sorted[Math.floor(n / 2)] ?? 0
  const meta = searchAlgorithms["exponential-search"]

  if (n === 0) return rec.finish(meta)

  // Check first element
  rec.mark([0], "active", 3)
  if (rec.compareValue(0, 0, rec.values[0] ?? 0, t, 4) === 0) {
    rec.mark([0], "sorted", 5)
    return rec.finish(meta)
  }

  // Exponential phase: find the bound
  let bound = 1
  while (bound < n && (rec.values[bound] ?? 0) <= t) {
    rec.mark([bound], "active", 9)
    rec.compareValue(bound, bound, rec.values[bound] ?? 0, t, 10)
    bound *= 2
  }

  // Binary search in [bound/2, min(bound, n-1)]
  let lo = bound >> 1
  let hi = Math.min(bound, n - 1)
  rec.range([lo, hi], "subarray", 14)

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1
    rec.mark([mid], "active", 16)
    const diff = rec.compareValue(mid, mid, rec.values[mid] ?? 0, t, 17)
    if (diff === 0) {
      rec.mark([mid], "sorted", 18)
      return rec.finish(meta)
    } else if (diff < 0) {
      lo = mid + 1
    } else {
      hi = mid - 1
    }
  }

  return rec.finish(meta)
}

/**
 * Ternary Search
 * Requires a sorted input array.
 */
export function runTernarySearch(input: number[], target?: number): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const rec = new ArrayTraceRecorder(sorted)
  const t = target ?? sorted[Math.floor(sorted.length / 2)] ?? 0
  const meta = searchAlgorithms["ternary-search"]

  let lo = 0
  let hi = rec.values.length - 1

  while (lo <= hi) {
    const third = Math.floor((hi - lo) / 3)
    const mid1 = lo + third
    const mid2 = hi - third

    rec.mark([mid1, mid2], "active", 4)

    const diff1 = rec.compareValue(mid1, mid1, rec.values[mid1] ?? 0, t, 5)
    if (diff1 === 0) {
      rec.mark([mid1], "sorted", 6)
      return rec.finish(meta)
    }

    const diff2 = rec.compareValue(mid2, mid2, rec.values[mid2] ?? 0, t, 8)
    if (diff2 === 0) {
      rec.mark([mid2], "sorted", 9)
      return rec.finish(meta)
    }

    if (t < (rec.values[mid1] ?? 0)) {
      rec.mark([mid1], "visited", 12)
      hi = mid1 - 1
    } else if (t > (rec.values[mid2] ?? 0)) {
      rec.mark([mid2], "visited", 14)
      lo = mid2 + 1
    } else {
      rec.mark([mid1, mid2], "visited", 16)
      lo = mid1 + 1
      hi = mid2 - 1
    }
  }

  return rec.finish(meta)
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function runSearchAlgorithm(id: SearchAlgorithmId, input: number[], target?: number): AlgorithmRun {
  switch (id) {
    case "linear-search":
      return runLinearSearch(input, target)
    case "binary-search":
      return runBinarySearch(input, target)
    case "jump-search":
      return runJumpSearch(input, target)
    case "interpolation-search":
      return runInterpolationSearch(input, target)
    case "exponential-search":
      return runExponentialSearch(input, target)
    case "ternary-search":
      return runTernarySearch(input, target)
    default: {
      const _exhaustive: never = id
      throw new Error(`Unknown search algorithm: ${_exhaustive}`)
    }
  }
}
