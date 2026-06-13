import type { AlgorithmMeta, AlgorithmRun, TwoPointersAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const twoPointersAlgorithms: Record<string, AlgorithmMeta> = {
  "two-sum-pointers": {
    id: "two-sum-pointers",
    name: "Two Sum (Two Pointers)",
    displayName: { en: "Two Sum — Two Pointers", zh: "两数之和（双指针）" },
    category: "two-pointers",
    difficulty: "beginner",
    tags: ["array", "two-pointers", "hash-table"],
    description: {
      en: "Uses two pointers on a sorted array to find a pair that sums to the target in O(n) time.",
      zh: "在已排序数组上使用双指针，以 O(n) 时间找到和为目标值的一对数。",
    },
    inPlace: true,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 167, titleSlug: "two-sum-ii-input-array-is-sorted", difficulty: "medium" },
      { id: 1, titleSlug: "two-sum", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "typescript",
        code: `function twoSumPointers(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`,
      },
      {
        lang: "javascript",
        code: `function twoSumPointers(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`,
      },
      {
        lang: "python",
        code: `def two_sum_pointers(nums: list[int], target: int) -> tuple[int, int] | None:
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1
        else:
            right -= 1
    return None`,
      },
      {
        lang: "java",
        code: `public int[] twoSumPointers(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return new int[]{left, right};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{};
}`,
      },
      {
        lang: "rust",
        code: `fn two_sum_pointers(nums: &[i32], target: i32) -> Option<(usize, usize)> {
    let (mut left, mut right) = (0, nums.len().checked_sub(1)?);
    while left < right {
        let sum = nums[left] + nums[right];
        if sum == target { return Some((left, right)); }
        if sum < target { left += 1; } else { right -= 1; }
    }
    None
}`,
      },
      {
        lang: "c",
        code: `int* twoSumPointers(int* nums, int numsSize, int target, int* returnSize) {
    int left = 0, right = numsSize - 1;
    int* result = malloc(2 * sizeof(int));
    *returnSize = 0;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) { result[0] = left; result[1] = right; *returnSize = 2; return result; }
        if (sum < target) left++; else right--;
    }
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> twoSumPointers(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) return {left, right};
        if (sum < target) left++; else right--;
    }
    return {};
}`,
      },
      {
        lang: "go",
        code: `func twoSumPointers(nums []int, target int) (int, int, bool) {
    left, right := 0, len(nums)-1
    for left < right {
        sum := nums[left] + nums[right]
        if sum == target { return left, right, true }
        if sum < target { left++ } else { right-- }
    }
    return 0, 0, false
}`,
      },
      {
        lang: "php",
        code: `function twoSumPointers(array $nums, int $target): ?array {
    $left = 0; $right = count($nums) - 1;
    while ($left < $right) {
        $sum = $nums[$left] + $nums[$right];
        if ($sum === $target) return [$left, $right];
        if ($sum < $target) $left++; else $right--;
    }
    return null;
}`,
      },
      {
        lang: "kotlin",
        code: `fun twoSumPointers(nums: IntArray, target: Int): IntArray {
    var left = 0; var right = nums.size - 1
    while (left < right) {
        val sum = nums[left] + nums[right]
        if (sum == target) return intArrayOf(left, right)
        if (sum < target) left++ else right--
    }
    return intArrayOf()
}`,
      },
      {
        lang: "swift",
        code: `func twoSumPointers(_ nums: [Int], _ target: Int) -> (Int, Int)? {
    var left = 0, right = nums.count - 1
    while left < right {
        let sum = nums[left] + nums[right]
        if sum == target { return (left, right) }
        if sum < target { left += 1 } else { right -= 1 }
    }
    return nil
}`,
      },
    ],
  },

  "three-sum": {
    id: "three-sum",
    name: "Three Sum",
    displayName: { en: "3Sum", zh: "三数之和" },
    category: "two-pointers",
    difficulty: "intermediate",
    tags: ["array", "two-pointers", "sorting"],
    description: {
      en: "Finds all unique triplets in a sorted array that sum to zero using a fixed pointer plus two-pointer scan.",
      zh: "在排序数组中，通过固定一个指针并用双指针扫描，找出所有不重复的三元组使其和为零。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 15, titleSlug: "3sum", difficulty: "medium" }],
    snippets: [
      {
        lang: "typescript",
        code: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
      },
      {
        lang: "javascript",
        code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]: left += 1
                while left < right and nums[right] == nums[right - 1]: right -= 1
                left += 1; right -= 1
            elif s < 0: left += 1
            else: right -= 1
    return result`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn three_sum(mut nums: Vec<i32>) -> Vec<Vec<i32>> {
    nums.sort();
    let mut result = vec![];
    let n = nums.len();
    for i in 0..n.saturating_sub(2) {
        if i > 0 && nums[i] == nums[i - 1] { continue; }
        let (mut l, mut r) = (i + 1, n - 1);
        while l < r {
            let sum = nums[i] + nums[l] + nums[r];
            if sum == 0 {
                result.push(vec![nums[i], nums[l], nums[r]]);
                while l < r && nums[l] == nums[l + 1] { l += 1; }
                while l < r && nums[r] == nums[r - 1] { r -= 1; }
                l += 1; r -= 1;
            } else if sum < 0 { l += 1; } else { r -= 1; }
        }
    }
    result
}`,
      },
      {
        lang: "c",
        code: `/* Returns flat array of triplets; *returnSize = number of triplets */
int** threeSum(int* nums, int n, int* returnSize, int** returnColumnSizes) {
    /* sort nums first */
    int** res = malloc(n * n * sizeof(int*));
    *returnSize = 0;
    /* ... two-pointer inner loop ... */
    return res;
}`,
      },
      {
        lang: "cpp",
        code: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    for (int i = 0; i < (int)nums.size() - 2; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = nums.size() - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push_back({nums[i], nums[left], nums[right]});
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    var result [][]int
    for i := 0; i < len(nums)-2; i++ {
        if i > 0 && nums[i] == nums[i-1] { continue }
        left, right := i+1, len(nums)-1
        for left < right {
            sum := nums[i] + nums[left] + nums[right]
            if sum == 0 {
                result = append(result, []int{nums[i], nums[left], nums[right]})
                for left < right && nums[left] == nums[left+1] { left++ }
                for left < right && nums[right] == nums[right-1] { right-- }
                left++; right--
            } else if sum < 0 { left++ } else { right-- }
        }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function threeSum(array $nums): array {
    sort($nums);
    $result = [];
    $n = count($nums);
    for ($i = 0; $i < $n - 2; $i++) {
        if ($i > 0 && $nums[$i] === $nums[$i - 1]) continue;
        $left = $i + 1; $right = $n - 1;
        while ($left < $right) {
            $sum = $nums[$i] + $nums[$left] + $nums[$right];
            if ($sum === 0) {
                $result[] = [$nums[$i], $nums[$left], $nums[$right]];
                while ($left < $right && $nums[$left] === $nums[$left + 1]) $left++;
                while ($left < $right && $nums[$right] === $nums[$right - 1]) $right--;
                $left++; $right--;
            } elseif ($sum < 0) $left++;
            else $right--;
        }
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun threeSum(nums: IntArray): List<List<Int>> {
    nums.sort()
    val result = mutableListOf<List<Int>>()
    for (i in 0..nums.size - 3) {
        if (i > 0 && nums[i] == nums[i - 1]) continue
        var left = i + 1; var right = nums.size - 1
        while (left < right) {
            val sum = nums[i] + nums[left] + nums[right]
            when {
                sum == 0 -> {
                    result.add(listOf(nums[i], nums[left], nums[right]))
                    while (left < right && nums[left] == nums[left + 1]) left++
                    while (left < right && nums[right] == nums[right - 1]) right--
                    left++; right--
                }
                sum < 0 -> left++
                else -> right--
            }
        }
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func threeSum(_ nums: [Int]) -> [[Int]] {
    let nums = nums.sorted()
    var result: [[Int]] = []
    for i in 0..<max(0, nums.count - 2) {
        if i > 0 && nums[i] == nums[i - 1] { continue }
        var left = i + 1, right = nums.count - 1
        while left < right {
            let sum = nums[i] + nums[left] + nums[right]
            if sum == 0 {
                result.append([nums[i], nums[left], nums[right]])
                while left < right && nums[left] == nums[left + 1] { left += 1 }
                while left < right && nums[right] == nums[right - 1] { right -= 1 }
                left += 1; right -= 1
            } else if sum < 0 { left += 1 } else { right -= 1 }
        }
    }
    return result
}`,
      },
    ],
  },

  "sliding-window-max": {
    id: "sliding-window-max",
    name: "Sliding Window Maximum",
    displayName: { en: "Sliding Window Maximum", zh: "滑动窗口最大值" },
    category: "two-pointers",
    difficulty: "intermediate",
    tags: ["array", "sliding-window", "monotonic-queue", "deque"],
    description: {
      en: "Uses a monotonic deque to find the maximum element in each sliding window of size k in O(n) time.",
      zh: "利用单调双端队列，在 O(n) 时间内求每个大小为 k 的滑动窗口的最大值。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(k)",
    relatedProblems: [{ id: 239, titleSlug: "sliding-window-maximum", difficulty: "hard" }],
    snippets: [
      {
        lang: "typescript",
        code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const deque: number[] = []; // stores indices
  const result: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    // remove indices outside window
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    // maintain decreasing deque
    while (deque.length && nums[deque[deque.length - 1]] < nums[i])
      deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
      },
      {
        lang: "javascript",
        code: `function maxSlidingWindow(nums, k) {
  const deque = [], result = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq: deque[int] = deque()
    result = []
    for i, v in enumerate(nums):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] < v:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
      },
      {
        lang: "java",
        code: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;
fn max_sliding_window(nums: Vec<i32>, k: usize) -> Vec<i32> {
    let mut dq: VecDeque<usize> = VecDeque::new();
    let mut result = vec![];
    for i in 0..nums.len() {
        while dq.front().map_or(false, |&f| f + k <= i) { dq.pop_front(); }
        while dq.back().map_or(false, |&b| nums[b] < nums[i]) { dq.pop_back(); }
        dq.push_back(i);
        if i + 1 >= k { result.push(nums[*dq.front().unwrap()]); }
    }
    result
}`,
      },
      {
        lang: "c",
        code: `int* maxSlidingWindow(int* nums, int n, int k, int* returnSize) {
    int* result = malloc((n - k + 1) * sizeof(int));
    int* dq = malloc(n * sizeof(int));
    int front = 0, back = 0, ri = 0;
    for (int i = 0; i < n; i++) {
        while (front < back && dq[front] < i - k + 1) front++;
        while (front < back && nums[dq[back - 1]] < nums[i]) back--;
        dq[back++] = i;
        if (i >= k - 1) result[ri++] = nums[dq[front]];
    }
    *returnSize = ri;
    free(dq);
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func maxSlidingWindow(nums []int, k int) []int {
    dq := []int{}
    var result []int
    for i, v := range nums {
        for len(dq) > 0 && dq[0] < i-k+1 { dq = dq[1:] }
        for len(dq) > 0 && nums[dq[len(dq)-1]] < v { dq = dq[:len(dq)-1] }
        dq = append(dq, i)
        if i >= k-1 { result = append(result, nums[dq[0]]) }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function maxSlidingWindow(array $nums, int $k): array {
    $dq = []; $result = [];
    foreach ($nums as $i => $v) {
        while ($dq && $dq[0] < $i - $k + 1) array_shift($dq);
        while ($dq && $nums[end($dq)] < $v) array_pop($dq);
        $dq[] = $i;
        if ($i >= $k - 1) $result[] = $nums[$dq[0]];
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun maxSlidingWindow(nums: IntArray, k: Int): IntArray {
    val dq = ArrayDeque<Int>()
    val result = mutableListOf<Int>()
    for (i in nums.indices) {
        while (dq.isNotEmpty() && dq.first() < i - k + 1) dq.removeFirst()
        while (dq.isNotEmpty() && nums[dq.last()] < nums[i]) dq.removeLast()
        dq.addLast(i)
        if (i >= k - 1) result.add(nums[dq.first()])
    }
    return result.toIntArray()
}`,
      },
      {
        lang: "swift",
        code: `func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var dq: [Int] = [], result: [Int] = []
    for i in nums.indices {
        while !dq.isEmpty && dq.first! < i - k + 1 { dq.removeFirst() }
        while !dq.isEmpty && nums[dq.last!] < nums[i] { dq.removeLast() }
        dq.append(i)
        if i >= k - 1 { result.append(nums[dq.first!]) }
    }
    return result
}`,
      },
    ],
  },

  "min-window-substring": {
    id: "min-window-substring",
    name: "Minimum Window Substring",
    displayName: { en: "Minimum Window Substring", zh: "最小覆盖子串" },
    category: "two-pointers",
    difficulty: "advanced",
    tags: ["string", "sliding-window", "hash-table"],
    description: {
      en: "Finds the smallest substring of s that contains all characters of t using an expanding/shrinking window.",
      zh: "使用扩张/收缩窗口找到 s 中包含 t 所有字符的最短子串。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n + m)", worst: "O(n + m)" },
    spaceComplexity: "O(m)",
    relatedProblems: [{ id: 76, titleSlug: "minimum-window-substring", difficulty: "hard" }],
    snippets: [
      {
        lang: "typescript",
        code: `function minWindow(s: string, t: string): string {
  const need = new Map<string, number>();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, required = need.size;
  let left = 0, minLen = Infinity, minLeft = 0;
  const window = new Map<string, number>();
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }
      const lc = s[left++];
      window.set(lc, (window.get(lc) ?? 0) - 1);
      if (need.has(lc) && (window.get(lc) ?? 0) < (need.get(lc) ?? 0)) have--;
    }
  }
  return minLen === Infinity ? '' : s.slice(minLeft, minLeft + minLen);
}`,
      },
      {
        lang: "javascript",
        code: `function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) ?? 0) + 1);
  let have = 0, required = need.size, left = 0, minLen = Infinity, minLeft = 0;
  const window = new Map();
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window.set(c, (window.get(c) ?? 0) + 1);
    if (need.has(c) && window.get(c) === need.get(c)) have++;
    while (have === required) {
      if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }
      const lc = s[left++];
      window.set(lc, window.get(lc) - 1);
      if (need.has(lc) && window.get(lc) < need.get(lc)) have--;
    }
  }
  return minLen === Infinity ? '' : s.slice(minLeft, minLeft + minLen);
}`,
      },
      {
        lang: "python",
        code: `from collections import Counter

def min_window(s: str, t: str) -> str:
    need = Counter(t)
    have, required = 0, len(need)
    window: dict[str, int] = {}
    left = min_left = 0
    min_len = float('inf')
    for right, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            have += 1
        while have == required:
            if right - left + 1 < min_len:
                min_len = right - left + 1
                min_left = left
            lc = s[left]; left += 1
            window[lc] -= 1
            if lc in need and window[lc] < need[lc]:
                have -= 1
    return s[min_left:min_left + min_len] if min_len < float('inf') else ''`,
      },
      {
        lang: "java",
        code: `public String minWindow(String s, String t) {
    int[] need = new int[128], window = new int[128];
    int required = 0;
    for (char c : t.toCharArray()) { if (need[c]++ == 0) required++; }
    int have = 0, left = 0, minLen = Integer.MAX_VALUE, minLeft = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (++window[c] == need[c]) have++;
        while (have == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }
            char lc = s.charAt(left++);
            if (window[lc]-- == need[lc]) have--;
        }
    }
    return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
}`,
      },
      {
        lang: "rust",
        code: `fn min_window(s: &str, t: &str) -> String {
    let s: Vec<u8> = s.bytes().collect();
    let mut need = [0i32; 128];
    for &b in t.as_bytes() { need[b as usize] += 1; }
    let required = need.iter().filter(|&&x| x > 0).count();
    let mut window = [0i32; 128];
    let (mut have, mut left, mut min_start, mut min_len) = (0usize, 0usize, 0usize, usize::MAX);
    for right in 0..s.len() {
        let b = s[right] as usize;
        window[b] += 1;
        if need[b] > 0 && window[b] == need[b] { have += 1; }
        while have == required {
            if right - left + 1 < min_len { min_len = right - left + 1; min_start = left; }
            let lb = s[left] as usize; left += 1;
            if need[lb] > 0 && window[lb] == need[lb] { have -= 1; }
            window[lb] -= 1;
        }
    }
    if min_len == usize::MAX { String::new() } else { String::from_utf8(s[min_start..min_start+min_len].to_vec()).unwrap() }
}`,
      },
      {
        lang: "c",
        code: `char* minWindow(char* s, char* t) {
    int need[128] = {0}, window[128] = {0};
    int required = 0;
    for (int i = 0; t[i]; i++) if (need[(int)t[i]]++ == 0) required++;
    int have = 0, left = 0, minLen = INT_MAX, minLeft = 0, n = strlen(s);
    for (int right = 0; right < n; right++) {
        unsigned char c = s[right];
        if (++window[c] == need[c]) have++;
        while (have == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }
            unsigned char lc = s[left++];
            if (window[lc]-- == need[lc]) have--;
        }
    }
    if (minLen == INT_MAX) return "";
    char* res = malloc(minLen + 1);
    strncpy(res, s + minLeft, minLen);
    res[minLen] = '\\0';
    return res;
}`,
      },
      {
        lang: "cpp",
        code: `string minWindow(string s, string t) {
    unordered_map<char, int> need, window;
    for (char c : t) need[c]++;
    int have = 0, required = need.size(), left = 0, minLen = INT_MAX, minLeft = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        char c = s[right];
        if (++window[c] == need[c]) have++;
        while (have == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left; }
            char lc = s[left++];
            if (window[lc]-- == need[lc]) have--;
        }
    }
    return minLen == INT_MAX ? "" : s.substr(minLeft, minLen);
}`,
      },
      {
        lang: "go",
        code: `func minWindow(s string, t string) string {
    need := make(map[byte]int)
    for i := 0; i < len(t); i++ { need[t[i]]++ }
    window := make(map[byte]int)
    have, required, left, minLen, minLeft := 0, len(need), 0, math.MaxInt32, 0
    for right := 0; right < len(s); right++ {
        c := s[right]; window[c]++
        if need[c] > 0 && window[c] == need[c] { have++ }
        for have == required {
            if right-left+1 < minLen { minLen = right - left + 1; minLeft = left }
            lc := s[left]; left++
            if need[lc] > 0 && window[lc] == need[lc] { have-- }
            window[lc]--
        }
    }
    if minLen == math.MaxInt32 { return "" }
    return s[minLeft : minLeft+minLen]
}`,
      },
      {
        lang: "php",
        code: `function minWindow(string $s, string $t): string {
    $need = array_count_values(str_split($t));
    $window = []; $have = 0; $required = count($need);
    $left = $minLen = PHP_INT_MAX; $minLeft = 0; $minLen = PHP_INT_MAX;
    $left = 0;
    for ($right = 0; $right < strlen($s); $right++) {
        $c = $s[$right];
        $window[$c] = ($window[$c] ?? 0) + 1;
        if (isset($need[$c]) && $window[$c] == $need[$c]) $have++;
        while ($have === $required) {
            if ($right - $left + 1 < $minLen) { $minLen = $right - $left + 1; $minLeft = $left; }
            $lc = $s[$left++];
            if (isset($need[$lc]) && $window[$lc] == $need[$lc]) $have--;
            $window[$lc]--;
        }
    }
    return $minLen === PHP_INT_MAX ? '' : substr($s, $minLeft, $minLen);
}`,
      },
      {
        lang: "kotlin",
        code: `fun minWindow(s: String, t: String): String {
    val need = mutableMapOf<Char, Int>()
    for (c in t) need[c] = (need[c] ?: 0) + 1
    val window = mutableMapOf<Char, Int>()
    var have = 0; val required = need.size
    var left = 0; var minLen = Int.MAX_VALUE; var minLeft = 0
    for (right in s.indices) {
        val c = s[right]; window[c] = (window[c] ?: 0) + 1
        if (need.containsKey(c) && window[c] == need[c]) have++
        while (have == required) {
            if (right - left + 1 < minLen) { minLen = right - left + 1; minLeft = left }
            val lc = s[left++]; window[lc] = (window[lc] ?: 0) - 1
            if (need.containsKey(lc) && (window[lc] ?: 0) < (need[lc] ?: 0)) have--
        }
    }
    return if (minLen == Int.MAX_VALUE) "" else s.substring(minLeft, minLeft + minLen)
}`,
      },
      {
        lang: "swift",
        code: `func minWindow(_ s: String, _ t: String) -> String {
    var need = [Character: Int](), window = [Character: Int]()
    for c in t { need[c, default: 0] += 1 }
    var have = 0, required = need.count
    let sa = Array(s); var left = 0, minLen = Int.max, minLeft = 0
    for right in sa.indices {
        let c = sa[right]; window[c, default: 0] += 1
        if let n = need[c], window[c] == n { have += 1 }
        while have == required {
            if right - left + 1 < minLen { minLen = right - left + 1; minLeft = left }
            let lc = sa[left]; left += 1
            if let n = need[lc], window[lc] == n { have -= 1 }
            window[lc, default: 0] -= 1
        }
    }
    return minLen == Int.max ? "" : String(sa[minLeft..<minLeft+minLen])
}`,
      },
    ],
  },

  "longest-no-repeat": {
    id: "longest-no-repeat",
    name: "Longest Substring Without Repeating Characters",
    displayName: { en: "Longest Substring Without Repeating", zh: "无重复字符的最长子串" },
    category: "two-pointers",
    difficulty: "intermediate",
    tags: ["string", "sliding-window", "hash-table"],
    description: {
      en: "Uses a sliding window with a hash set to find the longest substring without duplicate characters.",
      zh: "通过滑动窗口和哈希集合，找到不含重复字符的最长子串。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(min(n, m))",
    relatedProblems: [{ id: 3, titleSlug: "longest-substring-without-repeating-characters", difficulty: "medium" }],
    snippets: [
      {
        lang: "typescript",
        code: `function lengthOfLongestSubstring(s: string): number {
  const map = new Map<string, number>();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && (map.get(c) ?? -1) >= left) left = (map.get(c) ?? 0) + 1;
    map.set(c, right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
      },
      {
        lang: "javascript",
        code: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (map.has(c) && map.get(c) >= left) left = map.get(c) + 1;
    map.set(c, right);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
      },
      {
        lang: "python",
        code: `def length_of_longest_substring(s: str) -> int:
    last_seen: dict[str, int] = {}
    left = max_len = 0
    for right, c in enumerate(s):
        if c in last_seen and last_seen[c] >= left:
            left = last_seen[c] + 1
        last_seen[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      },
      {
        lang: "java",
        code: `public int lengthOfLongestSubstring(String s) {
    int[] map = new int[128];
    Arrays.fill(map, -1);
    int left = 0, max = 0;
    for (int right = 0; right < s.length(); right++) {
        int c = s.charAt(right);
        if (map[c] >= left) left = map[c] + 1;
        map[c] = right;
        max = Math.max(max, right - left + 1);
    }
    return max;
}`,
      },
      {
        lang: "rust",
        code: `fn length_of_longest_substring(s: &str) -> usize {
    let mut map = [-1i32; 128];
    let bytes: Vec<u8> = s.bytes().collect();
    let (mut left, mut max) = (0i32, 0usize);
    for (right, &b) in bytes.iter().enumerate() {
        let idx = b as usize;
        if map[idx] >= left { left = map[idx] + 1; }
        map[idx] = right as i32;
        max = max.max(right as usize - left as usize + 1);
    }
    max
}`,
      },
      {
        lang: "c",
        code: `int lengthOfLongestSubstring(char* s) {
    int map[128]; memset(map, -1, sizeof(map));
    int left = 0, max = 0;
    for (int right = 0; s[right]; right++) {
        unsigned char c = s[right];
        if (map[c] >= left) left = map[c] + 1;
        map[c] = right;
        if (right - left + 1 > max) max = right - left + 1;
    }
    return max;
}`,
      },
      {
        lang: "cpp",
        code: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> map;
    int left = 0, max = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        if (map.count(s[right]) && map[s[right]] >= left) left = map[s[right]] + 1;
        map[s[right]] = right;
        max = std::max(max, right - left + 1);
    }
    return max;
}`,
      },
      {
        lang: "go",
        code: `func lengthOfLongestSubstring(s string) int {
    lastSeen := [128]int{}
    for i := range lastSeen { lastSeen[i] = -1 }
    left, maxLen := 0, 0
    for right := 0; right < len(s); right++ {
        c := int(s[right])
        if lastSeen[c] >= left { left = lastSeen[c] + 1 }
        lastSeen[c] = right
        if right - left + 1 > maxLen { maxLen = right - left + 1 }
    }
    return maxLen
}`,
      },
      {
        lang: "php",
        code: `function lengthOfLongestSubstring(string $s): int {
    $map = []; $left = $max = 0;
    for ($right = 0; $right < strlen($s); $right++) {
        $c = $s[$right];
        if (isset($map[$c]) && $map[$c] >= $left) $left = $map[$c] + 1;
        $map[$c] = $right;
        $max = max($max, $right - $left + 1);
    }
    return $max;
}`,
      },
      {
        lang: "kotlin",
        code: `fun lengthOfLongestSubstring(s: String): Int {
    val map = mutableMapOf<Char, Int>()
    var left = 0; var max = 0
    for (right in s.indices) {
        val c = s[right]
        if (map.containsKey(c) && (map[c] ?: -1) >= left) left = (map[c] ?: 0) + 1
        map[c] = right
        max = maxOf(max, right - left + 1)
    }
    return max
}`,
      },
      {
        lang: "swift",
        code: `func lengthOfLongestSubstring(_ s: String) -> Int {
    var map = [Character: Int](), left = 0, maxLen = 0
    let arr = Array(s)
    for (right, c) in arr.enumerated() {
        if let prev = map[c], prev >= left { left = prev + 1 }
        map[c] = right
        maxLen = max(maxLen, right - left + 1)
    }
    return maxLen
}`,
      },
    ],
  },

  "trapping-rain-water": {
    id: "trapping-rain-water",
    name: "Trapping Rain Water",
    displayName: { en: "Trapping Rain Water", zh: "接雨水" },
    category: "two-pointers",
    difficulty: "intermediate",
    tags: ["array", "two-pointers", "dp", "stack"],
    description: {
      en: "Uses two pointers tracking left/right maximums to compute the total water trapped between bars in O(n) time.",
      zh: "用双指针维护左右最大值，以 O(n) 时间计算柱状图中能接住的雨水总量。",
    },
    inPlace: true,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 42, titleSlug: "trapping-rain-water", difficulty: "hard" }],
    snippets: [
      {
        lang: "typescript",
        code: `function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
      },
      {
        lang: "javascript",
        code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else water += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,
      },
      {
        lang: "python",
        code: `def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    left_max = right_max = water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max: left_max = height[left]
            else: water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max: right_max = height[right]
            else: water += right_max - height[right]
            right -= 1
    return water`,
      },
      {
        lang: "java",
        code: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      },
      {
        lang: "rust",
        code: `fn trap(height: Vec<i32>) -> i32 {
    let (mut left, mut right) = (0usize, height.len().saturating_sub(1));
    let (mut left_max, mut right_max, mut water) = (0, 0, 0);
    while left < right {
        if height[left] < height[right] {
            if height[left] >= left_max { left_max = height[left]; }
            else { water += left_max - height[left]; }
            left += 1;
        } else {
            if height[right] >= right_max { right_max = height[right]; }
            else { water += right_max - height[right]; }
            right -= 1;
        }
    }
    water
}`,
      },
      {
        lang: "c",
        code: `int trap(int* height, int n) {
    int left = 0, right = n - 1, leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      },
      {
        lang: "cpp",
        code: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      },
      {
        lang: "go",
        code: `func trap(height []int) int {
    left, right, leftMax, rightMax, water := 0, len(height)-1, 0, 0, 0
    for left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax { leftMax = height[left] } else { water += leftMax - height[left] }
            left++
        } else {
            if height[right] >= rightMax { rightMax = height[right] } else { water += rightMax - height[right] }
            right--
        }
    }
    return water
}`,
      },
      {
        lang: "php",
        code: `function trap(array $height): int {
    $left = 0; $right = count($height) - 1;
    $leftMax = $rightMax = $water = 0;
    while ($left < $right) {
        if ($height[$left] < $height[$right]) {
            if ($height[$left] >= $leftMax) $leftMax = $height[$left];
            else $water += $leftMax - $height[$left];
            $left++;
        } else {
            if ($height[$right] >= $rightMax) $rightMax = $height[$right];
            else $water += $rightMax - $height[$right];
            $right--;
        }
    }
    return $water;
}`,
      },
      {
        lang: "kotlin",
        code: `fun trap(height: IntArray): Int {
    var left = 0; var right = height.size - 1
    var leftMax = 0; var rightMax = 0; var water = 0
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left] else water += leftMax - height[left]
            left++
        } else {
            if (height[right] >= rightMax) rightMax = height[right] else water += rightMax - height[right]
            right--
        }
    }
    return water
}`,
      },
      {
        lang: "swift",
        code: `func trap(_ height: [Int]) -> Int {
    var left = 0, right = height.count - 1
    var leftMax = 0, rightMax = 0, water = 0
    while left < right {
        if height[left] < height[right] {
            if height[left] >= leftMax { leftMax = height[left] } else { water += leftMax - height[left] }
            left += 1
        } else {
            if height[right] >= rightMax { rightMax = height[right] } else { water += rightMax - height[right] }
            right -= 1
        }
    }
    return water
}`,
      },
    ],
  },
}

// ─── Implementations ──────────────────────────────────────────────────────────

// Two Sum — Two Pointers
// Input convention: the first element is the target (sentinel), remaining elements are the sorted array.
// e.g. input = [9, 2, 7, 11, 15]  =>  target=9, sorted array=[2,7,11,15]
export function twoSumPointers(input: number[]): AlgorithmRun {
  const [target, ...rest] = input
  const sorted = [...rest].sort((a, b) => a - b)
  // Build a visualization array: index 0 = target sentinel, indices 1..n = sorted values
  const vizInput = [target ?? 0, ...sorted]
  const recorder = new ArrayTraceRecorder(vizInput)

  let left = 1
  let right = vizInput.length - 1
  const targetVal = target ?? 0

  recorder.mark([left], "active", 1)
  recorder.mark([right], "candidate", 2)

  while (left < right) {
    const sum = (recorder.values[left] ?? 0) + (recorder.values[right] ?? 0)
    recorder.compare(left, right, 4)
    recorder.mark([left], "active", 5)
    recorder.mark([right], "candidate", 6)

    if (sum === targetVal) {
      recorder.mark([left, right], "sorted", 8)
      break
    } else if (sum < targetVal) {
      left += 1
      recorder.mark([left], "active", 11)
    } else {
      right -= 1
      recorder.mark([right], "candidate", 14)
    }
  }

  return recorder.finish(twoPointersAlgorithms["two-sum-pointers"] as AlgorithmMeta)
}

// Three Sum
// Input: unsorted array of integers (may contain negatives)
export function threeSum(input: number[]): AlgorithmRun {
  const sorted = [...input].sort((a, b) => a - b)
  const recorder = new ArrayTraceRecorder(sorted)
  const { values } = recorder

  for (let i = 0; i < values.length - 2; i += 1) {
    // Skip duplicates for i
    if (i > 0 && values[i] === values[i - 1]) {
      recorder.mark([i], "visited", 3)
      continue
    }

    recorder.mark([i], "pivot", 4)
    let left = i + 1
    let right = values.length - 1

    while (left < right) {
      const sum = (values[i] ?? 0) + (values[left] ?? 0) + (values[right] ?? 0)
      recorder.mark([left], "active", 8)
      recorder.mark([right], "candidate", 9)
      recorder.range([left, right], "window", 10)

      if (sum === 0) {
        recorder.mark([i, left, right], "sorted", 12)
        // Skip duplicates
        while (left < right && values[left] === values[left + 1]) {
          left += 1
          recorder.mark([left], "active", 14)
        }
        while (left < right && values[right] === values[right - 1]) {
          right -= 1
          recorder.mark([right], "candidate", 16)
        }
        left += 1
        right -= 1
      } else if (sum < 0) {
        left += 1
        recorder.mark([left], "active", 20)
      } else {
        right -= 1
        recorder.mark([right], "candidate", 23)
      }
    }
  }

  return recorder.finish(twoPointersAlgorithms["three-sum"] as AlgorithmMeta)
}

// Sliding Window Maximum
// Input: array where last element encodes window size k (k = input[input.length-1], array = input.slice(0,-1))
// Convention: if input.length < 2 or k sentinel is not clearly a window size, default k=3
export function slidingWindowMax(input: number[]): AlgorithmRun {
  // Determine k: use last element as window-size hint if it is a small positive integer
  let nums = [...input]
  let k = 3
  if (nums.length >= 2) {
    const last = nums[nums.length - 1] ?? 3
    if (Number.isInteger(last) && last > 0 && last <= Math.floor(nums.length / 2)) {
      k = last
      nums = nums.slice(0, -1)
    }
  }
  if (k < 1) k = 1
  if (k > nums.length) k = nums.length

  const recorder = new ArrayTraceRecorder(nums)
  const { values } = recorder
  const deque: number[] = [] // stores indices

  for (let i = 0; i < values.length; i += 1) {
    // Evict indices that have left the window
    while (deque.length > 0 && (deque[0] ?? 0) < i - k + 1) {
      deque.shift()
    }
    // Maintain decreasing order: remove indices with smaller values
    while (deque.length > 0 && (values[deque[deque.length - 1] ?? 0] ?? 0) < (values[i] ?? 0)) {
      const evicted = deque.pop()
      if (evicted !== undefined) recorder.mark([evicted], "visited", 6)
    }
    deque.push(i)
    recorder.mark([i], "active", 8)

    if (i >= k - 1) {
      // Mark the current window
      recorder.range([i - k + 1, i], "window", 10)
      // Mark the maximum (front of deque) as sorted/result
      const maxIdx = deque[0]
      if (maxIdx !== undefined) recorder.mark([maxIdx], "sorted", 11)
    }
  }

  return recorder.finish(twoPointersAlgorithms["sliding-window-max"] as AlgorithmMeta)
}

// Min Window Substring — char-code visualization
// Input: encoded as char-codes of `s` followed by a sentinel value of -1, then char-codes of `t`
// e.g. "ADOBECODEBANC" + -1 + "ABC"  =>  [...charCodes of s, -1, ...charCodes of t]
// If no -1 sentinel found, treat all input as s with t defaulting to the first 3 unique chars.
export function minWindowSubstring(input: number[]): AlgorithmRun {
  const separatorIdx = input.indexOf(-1)

  let sCodes: number[]
  let tCodes: number[]

  if (separatorIdx !== -1) {
    sCodes = input.slice(0, separatorIdx)
    tCodes = input.slice(separatorIdx + 1)
  } else {
    sCodes = [...input]
    // Default t = first 3 distinct chars
    const seen = new Set<number>()
    tCodes = []
    for (const code of sCodes) {
      if (!seen.has(code)) {
        seen.add(code)
        tCodes.push(code)
      }
      if (tCodes.length === 3) break
    }
  }

  // Visualization array is sCodes (char-code values)
  const recorder = new ArrayTraceRecorder(sCodes)
  const { values } = recorder

  // Build need map
  const need = new Map<number, number>()
  for (const code of tCodes) need.set(code, (need.get(code) ?? 0) + 1)

  const window = new Map<number, number>()
  let have = 0
  const required = need.size
  let left = 0
  let minLen = Infinity
  let minLeft = 0

  for (let right = 0; right < values.length; right += 1) {
    const c = values[right] ?? 0
    window.set(c, (window.get(c) ?? 0) + 1)
    recorder.mark([right], "active", 5)

    if (need.has(c) && window.get(c) === need.get(c)) have += 1

    while (have === required) {
      recorder.range([left, right], "window", 10)

      if (right - left + 1 < minLen) {
        minLen = right - left + 1
        minLeft = left
        // Mark current best window as sorted
        for (let m = left; m <= right; m += 1) recorder.mark([m], "sorted", 12)
      }

      const lc = values[left] ?? 0
      recorder.mark([left], "candidate", 14)
      window.set(lc, (window.get(lc) ?? 0) - 1)
      if (need.has(lc) && (window.get(lc) ?? 0) < (need.get(lc) ?? 0)) have -= 1
      left += 1
    }
  }

  // Write result window back (mark as sorted in final state)
  if (minLen < Infinity) {
    for (let m = minLeft; m < minLeft + minLen; m += 1) recorder.mark([m], "sorted", 18)
  }

  return recorder.finish(twoPointersAlgorithms["min-window-substring"] as AlgorithmMeta)
}

// Longest Substring Without Repeating Characters — char-code visualization
// Input: char-codes of the string, e.g. "abcabcbb" => [97,98,99,97,98,99,98,98]
export function longestNoRepeat(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const lastSeen = new Map<number, number>()
  let left = 0
  let maxLen = 0
  let maxLeft = 0

  for (let right = 0; right < values.length; right += 1) {
    const c = values[right] ?? 0
    recorder.mark([right], "active", 3)

    if (lastSeen.has(c) && (lastSeen.get(c) ?? -1) >= left) {
      left = (lastSeen.get(c) ?? 0) + 1
    }

    lastSeen.set(c, right)
    recorder.range([left, right], "window", 7)

    if (right - left + 1 > maxLen) {
      maxLen = right - left + 1
      maxLeft = left
    }
  }

  // Mark the best window
  for (let m = maxLeft; m < maxLeft + maxLen; m += 1) {
    recorder.mark([m], "sorted", 12)
  }

  return recorder.finish(twoPointersAlgorithms["longest-no-repeat"] as AlgorithmMeta)
}

// Trapping Rain Water
export function trappingRainWater(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  let left = 0
  let right = values.length - 1
  let leftMax = 0
  let rightMax = 0

  recorder.mark([left], "active", 1)
  recorder.mark([right], "candidate", 2)

  while (left < right) {
    const lv = values[left] ?? 0
    const rv = values[right] ?? 0

    recorder.compare(left, right, 5)
    recorder.mark([left], "active", 6)
    recorder.mark([right], "candidate", 7)
    recorder.range([left, right], "window", 8)

    if (lv < rv) {
      if (lv >= leftMax) {
        leftMax = lv
        recorder.mark([left], "pivot", 11)
      } else {
        recorder.mark([left], "sorted", 14)
      }
      left += 1
      recorder.mark([left], "active", 16)
    } else {
      if (rv >= rightMax) {
        rightMax = rv
        recorder.mark([right], "pivot", 20)
      } else {
        recorder.mark([right], "sorted", 23)
      }
      right -= 1
      recorder.mark([right], "candidate", 25)
    }
  }

  return recorder.finish(twoPointersAlgorithms["trapping-rain-water"] as AlgorithmMeta)
}

// ─── Runner registry ──────────────────────────────────────────────────────────

const runners: Record<TwoPointersAlgorithmId, (input: number[]) => AlgorithmRun> = {
  "two-sum-pointers": twoSumPointers,
  "three-sum": threeSum,
  "sliding-window-max": slidingWindowMax,
  "min-window-substring": minWindowSubstring,
  "longest-no-repeat": longestNoRepeat,
  "trapping-rain-water": trappingRainWater,
}

export function runTwoPointersAlgorithm(algorithmId: TwoPointersAlgorithmId, input: number[]): AlgorithmRun {
  const runner = runners[algorithmId]
  if (!runner) throw new Error(`Unsupported algorithm: ${algorithmId}`)
  if (input.length > 256) throw new Error("Input is limited to 256 values for interactive playback.")
  if (input.filter((v) => v !== -1).some((value) => !Number.isFinite(value)))
    throw new Error("Input must contain only finite numbers (or -1 as separator sentinel).")
  return runner(input)
}
