import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Monotonic Queue",
  subtitle: "Deque maintaining monotonic order for range max/min queries.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What is a Monotonic Queue?",
      bullets: [
        "A Monotonic Queue is a deque (double-ended queue) that maintains its elements in strictly monotonic order — either always increasing or always decreasing.",
        "It is primarily used to answer sliding-window maximum or minimum queries in O(n) total time, compared to the naive O(n·k) approach.",
        "The key operation: before inserting a new element, pop all elements from the back of the deque that would violate the monotonic property.",
        "Additionally, pop elements from the front when they fall outside the current window boundary (index < i - k + 1).",
        "The front of the deque always holds the index of the maximum (or minimum) element in the current window, making queries O(1) per window.",
      ],
    },

    {
      kind: "intuition",
      heading: "How to Think About a Monotonic Queue",
      bullets: [
        "The core insight: a smaller element that arrives after a larger one can never be the window maximum while the larger one is still in the window — so we can safely discard it.",
        "Think of the deque as a 'candidates list': only elements that could potentially be the maximum of some future window are kept.",
        "Maintaining the decreasing order ensures the front is always the largest element seen so far within the valid window range.",
        "Every element is pushed exactly once and popped at most once, giving an amortized O(1) cost per element and O(n) total.",
        "The same structure works for minimums by reversing the comparison: pop from the back when the incoming element is smaller than the back.",
      ],
      analogy:
        "Imagine a queue at a theme park where taller people always cut in front of shorter people behind them. When a very tall person arrives, all shorter people behind them are sent home — they'll never be the tallest while this person is in line. The person at the front of the queue is always the tallest in the current group.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Initialize: array = [1, 3, -1, -3, 5, 3, 6, 7], k = 3. Create an empty deque that will store array indices. Results list is empty.",
        },
        {
          step: 2,
          description:
            "i=0, val=1: Deque is empty. Push index 0. Deque (values): [1]. Window not yet full (i < k-1), no result recorded.",
        },
        {
          step: 3,
          description:
            "i=1, val=3: arr[back]=1 ≤ 3, so pop index 0 (value 1 can never be max while 3 is present). Push index 1. Deque: [3]. Window not yet full.",
        },
        {
          step: 4,
          description:
            "i=2, val=-1: arr[back]=3 > -1, so keep it. Push index 2. Deque: [3, -1]. Window [1,3,-1] is now full. Front=index 1, value=3. Result: [3].",
        },
        {
          step: 5,
          description:
            "i=3, val=-3: arr[back]=-1 > -3, keep it. Push index 3. Check front: index 1 >= 3-3+1=1, still valid. Deque: [3,-1,-3]. Window max = arr[1] = 3. Result: [3, 3].",
        },
        {
          step: 6,
          description:
            "i=4, val=5: Pop back while arr[back] ≤ 5: pop -3 (idx 3), pop -1 (idx 2), pop 3 (idx 1). Push index 4. Check front: index 4 is valid. Deque: [5]. Window max = 5. Result: [3, 3, 5].",
        },
        {
          step: 7,
          description:
            "i=5, val=3: arr[back]=5 > 3, keep it. Push index 5. Front=index 4, value=5, still in window [3..5]. Deque: [5, 3]. Window max = 5. Result: [3, 3, 5, 5].",
        },
        {
          step: 8,
          description:
            "i=6, val=6: Pop back while arr[back] ≤ 6: pop 3 (idx 5), pop 5 (idx 4). Push index 6. Front=index 6, value=6. Deque: [6]. Window max = 6. Result: [3, 3, 5, 5, 6].",
        },
        {
          step: 9,
          description:
            "i=7, val=7: arr[back]=6 ≤ 7, pop index 6. Push index 7. Front=index 7, value=7. Deque: [7]. Window max = 7. Result: [3, 3, 5, 5, 6, 7].",
        },
        {
          step: 10,
          description:
            "All windows processed. Final result: [3, 3, 5, 5, 6, 7]. Each of the 8 elements was pushed once and popped at most once — total work is O(n) = O(8), not O(n·k) = O(24).",
        },
        {
          step: 11,
          description:
            "Amortized analysis: sum of all push operations = n = 8. Sum of all pop operations ≤ n = 8. Total deque operations ≤ 2n. Per-element cost is O(1) amortized.",
        },
        {
          step: 12,
          description:
            "Space: the deque holds at most k indices at any time (elements outside the window are evicted from the front). Space complexity is O(k) for the deque plus O(n-k+1) for the output array.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `from collections import deque
from typing import List

def sliding_window_maximum(nums: List[int], k: int) -> List[int]:
    """
    Returns the maximum value in every sliding window of size k.
    Time: O(n)  |  Space: O(k)
    """
    if not nums or k == 0:
        return []

    dq: deque[int] = deque()   # stores indices, values are decreasing
    result: List[int] = []

    for i, val in enumerate(nums):
        # 1. Evict indices that have fallen outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # 2. Maintain decreasing order: remove all back indices
        #    whose values are <= current value (they are dominated)
        while dq and nums[dq[-1]] <= val:
            dq.pop()

        # 3. Push current index
        dq.append(i)

        # 4. Once the first full window is reached, record the max
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result


def sliding_window_minimum(nums: List[int], k: int) -> List[int]:
    """Minimum variant: maintain increasing order instead."""
    if not nums or k == 0:
        return []

    dq: deque[int] = deque()
    result: List[int] = []

    for i, val in enumerate(nums):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and nums[dq[-1]] >= val:   # flip comparison for min
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,
      annotations: [
        {
          lines: [1, 2],
          note: "collections.deque provides O(1) popleft() and pop() — critical for the algorithm's O(n) guarantee. A plain list would make popleft() O(n).",
        },
        {
          lines: [15, 16, 17],
          note: "Front eviction: any index that is more than k-1 steps behind the current index i is outside the window and must be removed. This keeps the deque bounded to at most k elements.",
        },
        {
          lines: [20, 21, 22],
          note: "Back eviction (the core monotonic step): if the element at the back of the deque is ≤ the incoming value, it can never be a future window maximum — discard it. This preserves the decreasing invariant.",
        },
        {
          lines: [24, 25],
          note: "Push the current index, not the value. Storing indices allows the front-eviction check (step 1) to work correctly and lets us retrieve the value via nums[dq[0]].",
        },
        {
          lines: [27, 28, 29],
          note: "The window is full starting at index k-1. The front of the deque is always the index of the maximum element in the current window — O(1) lookup.",
        },
        {
          lines: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
          note: "Minimum variant: flip the back-eviction comparison from <= to >=. Everything else is identical. This symmetry is why the pattern is called 'monotonic' — just change the direction.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best case (all equal elements)", value: "O(n)" },
        { label: "Average case", value: "O(n)" },
        { label: "Worst case (strictly decreasing input)", value: "O(n)" },
      ],
      spaceRows: [
        { label: "Deque (at most k indices)", value: "O(k)" },
        { label: "Output array", value: "O(n - k + 1)" },
        { label: "Total auxiliary space", value: "O(k)" },
      ],
      insights: [
        "The O(n) time bound is amortized: each of the n elements is pushed exactly once and popped at most once, so total deque operations ≤ 2n regardless of k.",
        "Space is O(k) for the deque because the front-eviction step ensures no more than k indices are ever stored simultaneously.",
        "Compared to a naive double loop O(n·k) or a segment tree O(n log n), the monotonic queue is optimal for this problem — it matches the Ω(n) lower bound for reading all inputs.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Patterns",
      variations: [
        {
          name: "Sliding Window Minimum",
          description:
            "Reverse the back-eviction comparison (>= instead of <=). The deque now maintains increasing order and the front always holds the minimum index in the current window.",
        },
        {
          name: "Monotonic Stack",
          description:
            "A stack-only variant (no front eviction) used for problems like 'next greater element', 'largest rectangle in histogram', and 'trapping rain water'. No sliding window, just monotonic order on a stack.",
        },
        {
          name: "Jump Game VI (DP + Monotonic Queue)",
          description:
            "Combine dynamic programming with a monotonic queue to compute dp[i] = max(dp[i-k..i-1]) + nums[i] in O(n) instead of O(n·k). The deque tracks the maximum dp value in the last k positions.",
        },
        {
          name: "Constrained Subsequence Sum",
          description:
            "LeetCode 1425: find the maximum sum of a non-empty subsequence where no two chosen indices are more than k apart. Solved with DP + monotonic deque in O(n).",
        },
        {
          name: "Shortest Subarray with Sum at Least K",
          description:
            "LeetCode 862: use a monotonic deque on prefix sums to find the shortest subarray with sum ≥ k in O(n log n) or O(n) depending on variant. Deque maintains increasing prefix sums.",
        },
      ],
      tips: [
        "Always store indices in the deque, not values — indices let you check window boundaries and retrieve values, while values alone cannot tell you when to evict from the front.",
        "For max queries use a decreasing deque (pop back when incoming >= back value); for min queries use an increasing deque (pop back when incoming <= back value). The rest of the code is identical.",
        "When combining with DP, the deque stores DP state indices rather than input array indices — the pattern is the same but the 'value' being maximized is dp[j] instead of nums[j].",
        "Test edge cases: k=1 (every element is its own window max), k=n (single window over the entire array), and all-equal arrays (no back evictions occur).",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "A monotonic queue is a deque that enforces a monotonic order (increasing or decreasing) by evicting dominated elements from the back before each insertion.",
        "It solves the sliding window maximum/minimum problem in O(n) time and O(k) space — optimal for this class of problems.",
        "Two eviction rules work together: front eviction removes out-of-window indices; back eviction removes dominated values to maintain the monotonic invariant.",
        "The front of the deque always holds the answer (max or min) for the current window, enabling O(1) per-window queries after O(n) total preprocessing.",
        "The same pattern extends to DP optimization: when a recurrence depends on the best value in a sliding range of prior states, replace the inner loop with a monotonic deque.",
        "Use collections.deque in Python (not a list) to ensure both popleft() and pop() run in O(1) — a list's popleft is O(n) and would destroy the time complexity.",
      ],
    },
  ],
};

export default function MonotonicQueueVideo() {
  return <AlgoVideo config={config} />;
}
