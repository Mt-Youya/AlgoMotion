import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Sliding Window Maximum",
  subtitle:
    "Uses a monotonic deque to find the maximum element in each sliding window of size k in O(n) time.",
  category: "two-pointers",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an integer array `nums` and a window size `k`, slide the window from left to right across the array.",
        "For each position of the window, return the maximum value among the `k` elements currently inside it.",
        "The window moves one position to the right at each step, so there are `n - k + 1` windows in total.",
        "A brute-force approach checks all `k` elements per window giving O(n·k) time — we need something faster.",
        "The challenge is to answer each window's maximum in amortized O(1) using a clever data structure.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "We maintain a **monotonic decreasing deque** that stores array indices, not values.",
        "Before adding a new element, we evict all indices from the back whose values are smaller — they can never be the maximum for any future window.",
        "We also evict the front index if it has slid out of the current window (`index < i - k + 1`).",
        "The front of the deque always holds the index of the current window's maximum — O(1) lookup.",
        "Each index is enqueued and dequeued at most once, giving O(n) overall time complexity.",
      ],
      analogy:
        "Imagine a talent show where contestants enter one by one. Any contestant already on stage who is weaker than the newcomer is immediately eliminated (they'll never win while the newcomer is present). The reigning champion at the front leaves when they age out of the eligible bracket. The front is always the current champion.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize an empty deque `dq` and result list `res`. Set k = 3.",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 2,
          description: "i=0, val=1. Deque is empty, append index 0. dq=[0]. Window not yet full.",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["yellow", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 3,
          description: "i=1, val=3. nums[dq[-1]]=1 < 3, pop 0. Append 1. dq=[1]. Window not yet full.",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "yellow", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 4,
          description: "i=2, val=-1. nums[dq[-1]]=3 >= -1, just append 2. dq=[1,2]. i >= k-1, output nums[dq[0]]=nums[1]=3. res=[3].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["green", "red", "yellow", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 5,
          description: "i=3, val=-3. Append 3. dq=[1,2,3]. Front 1 still in window [1..3]. Output nums[1]=3. res=[3,3].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "red", "green", "yellow", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 6,
          description: "i=4, val=5. Pop 3 (-3<5), pop 2 (-1<5), pop 1 (3<5). Append 4. dq=[4]. Output nums[4]=5. res=[3,3,5].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "gray", "green", "green", "red", "gray", "gray", "gray"],
          },
        },
        {
          step: 7,
          description: "i=5, val=3. nums[dq[-1]]=5 >= 3, append 5. dq=[4,5]. Front 4 in window [3..5]. Output nums[4]=5. res=[3,3,5,5].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "gray", "gray", "green", "red", "yellow", "gray", "gray"],
          },
        },
        {
          step: 8,
          description: "i=6, val=6. Pop 5 (3<6), pop 4 (5<6). Append 6. dq=[6]. Output nums[6]=6. res=[3,3,5,5,6].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "gray", "gray", "gray", "green", "green", "red", "gray"],
          },
        },
        {
          step: 9,
          description: "i=7, val=7. Pop 6 (6<7). Append 7. dq=[7]. Output nums[7]=7. res=[3,3,5,5,6,7].",
          arrayState: {
            values: [1, 3, -1, -3, 5, 3, 6, 7],
            colors: ["gray", "gray", "gray", "gray", "gray", "green", "green", "red"],
          },
        },
        {
          step: 10,
          description: "All windows processed. Final result: [3, 3, 5, 5, 6, 7]. Each index entered and left the deque exactly once.",
          arrayState: {
            values: [3, 3, 5, 5, 6, 7],
            colors: ["green", "green", "green", "green", "green", "green"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from collections import deque
from typing import List

def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    dq: deque[int] = deque()   # stores indices
    res: List[int] = []

    for i, val in enumerate(nums):
        # Remove indices that are out of the current window
        while dq and dq[0] < i - k + 1:
            dq.popleft()

        # Maintain monotonic decreasing order:
        # remove indices whose values are less than current val
        while dq and nums[dq[-1]] < val:
            dq.pop()

        dq.append(i)

        # The window is full once i >= k - 1
        if i >= k - 1:
            res.append(nums[dq[0]])  # front is always the max

    return res`,
      annotations: [
        {
          lines: [4],
          note: "The deque stores array **indices**, not values, so we can check whether the front index is still inside the current window.",
        },
        {
          lines: [8, 9],
          note: "Evict the front when its index falls below `i - k + 1` — it has slid out of the window.",
        },
        {
          lines: [13, 14],
          note: "Maintain the monotonic decreasing invariant: any index with a smaller value than the incoming element can never be a future maximum while the new element is present.",
        },
        {
          lines: [16],
          note: "Always append the current index. The deque now ends with the largest suffix of the current window.",
        },
        {
          lines: [19, 20],
          note: "`dq[0]` is the index of the window maximum. We only record a result once the first full window is complete (`i >= k - 1`).",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", notation: "O(n)", note: "All elements processed once" },
        { case: "Average", notation: "O(n)", note: "Each index enqueued/dequeued at most once" },
        { case: "Worst", notation: "O(n)", note: "Even strictly decreasing arrays are O(n)" },
      ],
      spaceRows: [
        { label: "Deque", notation: "O(k)", note: "At most k indices in the deque at any time" },
        { label: "Result array", notation: "O(n - k + 1)", note: "Output size; often excluded from auxiliary space" },
        { label: "Auxiliary total", notation: "O(k)", note: "Only the deque counts as extra space" },
      ],
      insights: [
        "The O(n) time bound holds because each of the n elements is pushed onto the deque exactly once and popped at most once — giving 2n operations total.",
        "Space is O(k) for the deque because the window can hold at most k distinct indices before the front is evicted.",
        "Compared to the naive O(n·k) brute force, this is a significant improvement for large k (e.g., k = 10,000 on n = 100,000).",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Sliding Window Minimum",
          description:
            "Flip the monotonic invariant: maintain an increasing deque to find the minimum in each window. Only one comparison sign changes.",
        },
        {
          name: "Sliding Window Average (Fixed k)",
          description:
            "Use a running sum instead of a deque; add the incoming element and subtract the outgoing element to maintain the window sum in O(1) per step.",
        },
        {
          name: "Longest Subarray with Max - Min ≤ Limit",
          description:
            "Combine a max-deque and a min-deque simultaneously to track both extremes, then use a two-pointer to find the longest valid window.",
        },
        {
          name: "Jump Game VI (DP + Sliding Window Max)",
          description:
            "LeetCode 1696 — use a sliding window maximum over a DP array to compute the best reachable score in O(n) instead of O(n·k).",
        },
        {
          name: "Constrained Subsequence Sum",
          description:
            "LeetCode 1425 — apply sliding window maximum on a DP recurrence where each state depends on the best of the previous k states.",
        },
      ],
      tips: [
        "Always store **indices** in the deque, not values — you need indices to check window boundaries.",
        "Draw the deque state after each step on paper first; the invariant (front = max, back = most recently added) becomes intuitive quickly.",
        "For problems mixing DP with sliding window max, recognize the pattern `dp[i] = max(dp[i-k..i-1]) + cost[i]` as a direct application.",
        "When k equals n, the deque reduces to a simple linear scan for the global maximum — a useful sanity check.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "A **monotonic deque** maintains a decreasing sequence of indices so the front is always the current window's maximum.",
        "Each element is enqueued and dequeued at most once, giving **O(n) time** regardless of k.",
        "The deque holds at most k elements at any time, so **auxiliary space is O(k)**.",
        "Two invariants are enforced per step: (1) evict out-of-window indices from the front; (2) evict smaller-valued indices from the back.",
        "The pattern generalizes to sliding window minimum (flip comparison), and to DP problems where a state depends on the best of the previous k states.",
        "This is a classic example of using a data structure to amortize repeated work — each comparison is paid for by an eventual dequeue, not repeated.",
      ],
    },
  },
};

export default function SlidingWindowMaxVideo() {
  return <AlgoVideo config={config} />;
}
