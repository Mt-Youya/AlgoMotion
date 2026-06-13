import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "House Robber",
  subtitle: "Maximize money robbed from non-adjacent houses.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "You are a robber planning to rob houses along a street.",
        "Each house has a certain amount of money stashed inside.",
        "The only constraint: adjacent houses have a connected security alarm.",
        "If you rob two directly adjacent houses, the alarm triggers.",
        "Find the maximum amount of money you can rob tonight without triggering the alarm.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "At every house, you face a binary choice: rob it or skip it.",
        "If you rob house i, you must have skipped house i-1, so the best you had before is dp[i-2] + nums[i].",
        "If you skip house i, the best total remains dp[i-1].",
        "The recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]) captures both choices.",
        "Because each state depends only on the previous two, you can reduce space to O(1) with two variables.",
      ],
      analogy:
        "Think of it like picking non-adjacent seats in a cinema to maximise legroom: you always weigh whether the current seat plus the best two-back option beats just keeping the previous best.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Input: nums = [2, 7, 9, 3, 1]",
          detail: "Five houses with respective values.",
        },
        {
          step: 2,
          description: "Initialise prev2 = 0, prev1 = 0",
          detail: "No houses processed yet; best is 0.",
        },
        {
          step: 3,
          description: "Process house 0 (value = 2)",
          detail: "curr = max(prev1=0, prev2=0 + 2) = 2. Update: prev2=0, prev1=2.",
        },
        {
          step: 4,
          description: "Process house 1 (value = 7)",
          detail: "curr = max(prev1=2, prev2=0 + 7) = 7. Update: prev2=2, prev1=7.",
        },
        {
          step: 5,
          description: "Process house 2 (value = 9)",
          detail: "curr = max(prev1=7, prev2=2 + 9) = 11. Update: prev2=7, prev1=11.",
        },
        {
          step: 6,
          description: "Process house 3 (value = 3)",
          detail: "curr = max(prev1=11, prev2=7 + 3) = 11. Update: prev2=11, prev1=11.",
        },
        {
          step: 7,
          description: "Process house 4 (value = 1)",
          detail: "curr = max(prev1=11, prev2=11 + 1) = 12. Update: prev2=11, prev1=12.",
        },
        {
          step: 8,
          description: "Return prev1 = 12",
          detail: "Optimal: rob houses 0, 2, 4 → 2 + 9 + 1 = 12.",
        },
        {
          step: 9,
          description: "Trace back the chosen houses",
          detail: "Walk backwards through dp array to identify which houses contribute to the maximum.",
        },
        {
          step: 10,
          description: "Verify adjacency constraint",
          detail: "Houses 0, 2, 4 are all non-adjacent — constraint satisfied.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        # Edge case: single house
        if len(nums) == 1:
            return nums[0]

        # Space-optimised DP with two variables
        # prev2 = dp[i-2], prev1 = dp[i-1]
        prev2 = 0
        prev1 = 0

        for num in nums:
            # Either skip current house (prev1)
            # or rob it and add to best two steps back (prev2 + num)
            curr = max(prev1, prev2 + num)

            # Slide the window forward
            prev2 = prev1
            prev1 = curr

        # prev1 holds dp[n-1], the answer
        return prev1

    def rob_dp_array(self, nums: List[int]) -> int:
        """Explicit O(n) space version for clarity."""
        n = len(nums)
        if n == 1:
            return nums[0]

        dp = [0] * n
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in range(2, n):
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

        return dp[n - 1]`,
      annotations: [
        {
          lines: "3-4",
          note: "Guard for single-house input — return immediately without entering the loop.",
        },
        {
          lines: "8-9",
          note: "Two rolling variables replace the full dp array, cutting space from O(n) to O(1).",
        },
        {
          lines: "13",
          note: "Core recurrence: take the best of skipping or robbing the current house.",
        },
        {
          lines: "16-17",
          note: "Slide the window: old prev1 becomes the new prev2 for the next iteration.",
        },
        {
          lines: "20",
          note: "After the loop, prev1 is dp[n-1] — the answer for all n houses.",
        },
        {
          lines: "23-32",
          note: "Explicit dp-array version is easier to trace during debugging or interviews.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      timeRows: [
        { case: "Best", notation: "O(n)", note: "Always iterates through all n houses once." },
        { case: "Average", notation: "O(n)", note: "Single linear pass regardless of input distribution." },
        { case: "Worst", notation: "O(n)", note: "No early exit; always processes every house." },
      ],
      spaceRows: [
        { label: "Optimised (two vars)", notation: "O(1)", note: "Only prev1 and prev2 are stored." },
        { label: "DP array version", notation: "O(n)", note: "Stores dp[0..n-1] explicitly." },
        { label: "Call stack", notation: "O(1)", note: "Iterative solution — no recursion depth." },
      ],
      insights: [
        "The O(1) space solution is strictly better than the O(n) array version in production.",
        "Both variants run in the same O(n) time — the loop cannot be avoided.",
        "Memoised recursion also achieves O(n) time but uses O(n) stack space — prefer iteration.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "House Robber II (Circular Street)",
          description:
            "Houses arranged in a circle — first and last are adjacent. Solve twice: once excluding the first house, once excluding the last, then take the max.",
          leetcode: 213,
        },
        {
          name: "House Robber III (Binary Tree)",
          description:
            "Houses form a binary tree. Rob or skip each node with tree DP, returning a pair (rob, skip) per node.",
          leetcode: 337,
        },
        {
          name: "Delete and Earn",
          description:
            "Earning points by deleting nums[i] removes all occurrences of nums[i]-1 and nums[i]+1. Reduce to House Robber on a value-indexed array.",
          leetcode: 740,
        },
        {
          name: "Maximum Sum of Non-Adjacent Elements (k-gap)",
          description:
            "Generalise the constraint: no two selected elements within distance k. Extend the recurrence to dp[i] = max(dp[i-1], dp[i-k-1] + nums[i]).",
        },
        {
          name: "Staircase / Fibonacci Variant",
          description:
            "House Robber is structurally identical to climbing stairs with variable step values — the same two-variable rolling DP applies.",
        },
      ],
      tips: [
        "In interviews, start with the O(n) dp-array solution for clarity, then optimise to O(1) space.",
        "Always handle the edge case of a single house before entering the loop.",
        "When the problem involves a circular arrangement, break it into two linear sub-problems.",
        "Recognise the 'choose or skip' pattern — it appears in knapsack, coin change, and many scheduling problems.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "House Robber is a classic 1-D dynamic programming problem with a two-choice recurrence.",
        "The recurrence dp[i] = max(dp[i-1], dp[i-2] + nums[i]) elegantly encodes the adjacency constraint.",
        "Rolling two variables (prev1, prev2) reduces space from O(n) to O(1) without changing runtime.",
        "Time complexity is always O(n) — every house must be considered at least once.",
        "The same pattern extends to circular streets (LeetCode 213) and binary-tree layouts (LeetCode 337).",
        "Recognising this 'skip-or-take with a gap' structure unlocks solutions to many related DP problems.",
      ],
    },
  },
};

export default function HouseRobberVideo() {
  return <AlgoVideo config={config} />;
}
