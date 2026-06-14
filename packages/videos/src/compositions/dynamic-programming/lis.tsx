import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Longest Increasing Subsequence",
  subtitle: "Find the longest strictly increasing subsequence.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What is the Longest Increasing Subsequence?",
      bullets: [
        "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        "A subsequence is derived from the array by deleting some (or no) elements without changing the relative order of the remaining elements.",
        "Strictly increasing means each subsequent element must be greater than the previous — equal elements are not allowed.",
        "Example: for nums = [10, 9, 2, 5, 3, 7, 101, 18], the LIS is [2, 3, 7, 101] with length 4.",
        "Multiple valid LIS solutions may exist for the same array — we only need to return the length.",
      ],
    },

    intuition: {
      heading: "Dynamic Programming Intuition",
      bullets: [
        "Define dp[i] as the length of the longest increasing subsequence that ends at index i.",
        "For every index i, look at all previous indices j where nums[j] < nums[i]. The best we can do is dp[j] + 1.",
        "Base case: dp[i] = 1 for all i, since every single element is a valid subsequence of length 1.",
        "The final answer is the maximum value across the entire dp array: max(dp[0..n-1]).",
        "An optimized O(n log n) approach uses a 'tails' array with binary search (Patience Sorting), maintaining the smallest possible tail for each LIS length.",
      ],
      analogy:
        "Think of playing a card game called Patience: you deal cards into piles where each new card must go on top of a pile whose top card is larger. If no pile works, start a new pile. The number of piles at the end equals the LIS length. Binary search finds the right pile in O(log n).",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough: [3, 1, 4, 1, 5, 9, 2, 6]",
      steps: [
        {
          step: 1,
          description:
            "Initialize dp = [1, 1, 1, 1, 1, 1, 1, 1]. Every element starts as a subsequence of length 1 (itself).",
          values: [3, 1, 4, 1, 5, 9, 2, 6],
          colors: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 2,
          description: "i=1, nums[1]=1. Look back at j=0: nums[0]=3 > 1, so no extension. dp[1] remains 1.",
          values: [1, 1, 1, 1, 1, 1, 1, 1],
          colors: ["gray", "yellow", "blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 3,
          description:
            "i=2, nums[2]=4. j=0: nums[0]=3 < 4, dp[2] = max(dp[2], dp[0]+1) = 2. j=1: nums[1]=1 < 4, dp[2] = max(2, dp[1]+1) = 2. dp[2]=2.",
          values: [1, 1, 2, 1, 1, 1, 1, 1],
          colors: ["gray", "gray", "green", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 4,
          description: "i=3, nums[3]=1. j=0: 3>1, j=1: 1=1 (not strictly less), j=2: 4>1. No extension. dp[3]=1.",
          values: [1, 1, 2, 1, 1, 1, 1, 1],
          colors: ["gray", "gray", "gray", "yellow", "blue", "blue", "blue", "blue"],
        },
        {
          step: 5,
          description:
            "i=4, nums[4]=5. Best predecessor: j=2 (nums[2]=4 < 5, dp[2]=2), so dp[4] = dp[2]+1 = 3. Subsequence so far: [1, 4, 5].",
          values: [1, 1, 2, 1, 3, 1, 1, 1],
          colors: ["gray", "gray", "green", "gray", "green", "blue", "blue", "blue"],
        },
        {
          step: 6,
          description:
            "i=5, nums[5]=9. Best predecessor: j=4 (nums[4]=5 < 9, dp[4]=3), so dp[5] = dp[4]+1 = 4. Subsequence: [1, 4, 5, 9].",
          values: [1, 1, 2, 1, 3, 4, 1, 1],
          colors: ["gray", "gray", "gray", "gray", "green", "green", "blue", "blue"],
        },
        {
          step: 7,
          description:
            "i=6, nums[6]=2. Best predecessor: j=1 (nums[1]=1 < 2, dp[1]=1), so dp[6] = 2. Subsequence ending here: [1, 2].",
          values: [1, 1, 2, 1, 3, 4, 2, 1],
          colors: ["gray", "green", "gray", "gray", "gray", "gray", "green", "blue"],
        },
        {
          step: 8,
          description:
            "i=7, nums[7]=6. Best predecessor: j=4 (nums[4]=5 < 6, dp[4]=3), so dp[7] = 4. Subsequence: [1, 4, 5, 6].",
          values: [1, 1, 2, 1, 3, 4, 2, 4],
          colors: ["gray", "gray", "gray", "gray", "green", "gray", "gray", "green"],
        },
        {
          step: 9,
          description: "Final dp array: [1, 1, 2, 1, 3, 4, 2, 4]. Answer = max(dp) = 4.",
          values: [1, 1, 2, 1, 3, 4, 2, 4],
          colors: ["gray", "gray", "gray", "gray", "gray", "yellow", "gray", "yellow"],
        },
        {
          step: 10,
          description:
            "Two valid LIS of length 4 exist: [1, 4, 5, 9] (ending at index 5) and [1, 4, 5, 6] (ending at index 7).",
        },
        {
          step: 11,
          description:
            "O(n log n) Patience Sort alternative: maintain tails = []. For each num, binary search for the first tail >= num and replace it, or append if none found. tails length = LIS length.",
        },
        {
          step: 12,
          description:
            "Patience Sort trace: process 3→[3], 1→[1], 4→[1,4], 1→[1,4], 5→[1,4,5], 9→[1,4,5,9], 2→[1,2,5,9], 6→[1,2,5,6]. Length=4.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def lengthOfLIS(nums: list[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0

    # dp[i] = length of LIS ending at index i
    dp = [1] * n

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)


# O(n log n) optimized version using Patience Sorting
import bisect

def lengthOfLIS_fast(nums: list[int]) -> int:
    # tails[i] = smallest tail element of all increasing
    # subsequences of length i+1 seen so far
    tails: list[int] = []

    for num in nums:
        # Find the leftmost position where tails[pos] >= num
        pos = bisect.bisect_left(tails, num)

        if pos == len(tails):
            # num extends the longest subsequence found so far
            tails.append(num)
        else:
            # Replace to maintain the smallest possible tail
            tails[pos] = num

    # The length of tails equals the LIS length
    return len(tails)


# Reconstruct the actual LIS (O(n^2) DP version)
def findLIS(nums: list[int]) -> list[int]:
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j

    # Traceback from the index with maximum dp value
    end = dp.index(max(dp))
    lis = []
    while end != -1:
        lis.append(nums[end])
        end = parent[end]

    return list(reversed(lis))`,
      annotations: [
        {
          lines: [6],
          note: "Initialize dp with 1s — every element is a valid LIS of length 1 by itself.",
        },
        {
          lines: [8, 9, 10, 11],
          note: "For each index i, scan all previous j. If nums[j] < nums[i], we can extend the LIS ending at j.",
        },
        {
          lines: [13],
          note: "The answer is the maximum dp value across all indices — not just dp[n-1].",
        },
        {
          lines: [20, 21, 22, 23],
          note: "tails[i] stores the smallest possible tail for all increasing subsequences of length i+1. This is the key invariant.",
        },
        {
          lines: [25, 26, 27, 28, 29, 30],
          note: "bisect_left finds the insertion point in O(log n). If pos equals len(tails), num extends the longest known subsequence.",
        },
        {
          lines: [45, 46, 47, 48],
          note: "Traceback using the parent array: follow parent pointers from the max-dp index back to -1 to reconstruct the actual LIS.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n log n)",
          note: "Using the Patience Sort (binary search) approach, even a fully sorted input takes O(n log n).",
        },
        {
          case: "Average",
          complexity: "O(n log n)",
          note: "Patience Sort consistently achieves O(n log n) regardless of input distribution.",
        },
        {
          case: "Worst",
          complexity: "O(n²)",
          note: "The naive DP approach is O(n²) in the worst case. Patience Sort remains O(n log n).",
        },
      ],
      spaceRows: [
        {
          case: "DP Array",
          complexity: "O(n)",
          note: "The dp array stores one value per element.",
        },
        {
          case: "Patience Sort tails",
          complexity: "O(n)",
          note: "The tails array grows at most to length n in the worst case (fully sorted input).",
        },
        {
          case: "Reconstruction",
          complexity: "O(n)",
          note: "A parent array of size n is needed to reconstruct the actual subsequence.",
        },
      ],
      insights: [
        "The key insight of Patience Sorting is that tails is always sorted, enabling binary search. Replacing a value never changes the length of tails — it only improves future extension possibilities.",
        "The O(n²) DP solution is easier to understand and extend (e.g., for reconstruction), while the O(n log n) solution is preferred for large inputs.",
        "The LIS problem has deep connections to other algorithms: the LIS length equals n minus the minimum number of non-increasing subsequences needed to partition the array (Dilworth's theorem).",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Longest Non-Decreasing Subsequence",
          description:
            "Allow equal elements in the subsequence. Change the strict inequality nums[j] < nums[i] to nums[j] <= nums[i]. In Patience Sort, use bisect_right instead of bisect_left.",
        },
        {
          name: "Longest Decreasing Subsequence",
          description:
            "Find the longest strictly decreasing subsequence. Reverse the array and apply LIS, or negate all elements and apply LIS.",
        },
        {
          name: "Number of Longest Increasing Subsequences",
          description:
            "Count how many distinct LIS of maximum length exist. Maintain a count array alongside dp: count[i] accumulates the number of ways to reach dp[i].",
        },
        {
          name: "Longest Bitonic Subsequence",
          description:
            "Find the longest subsequence that first increases then decreases. Compute LIS from left and LDS from right for each index, then combine: max(lis[i] + lds[i] - 1).",
        },
        {
          name: "Russian Doll Envelopes (2D LIS)",
          description:
            "Given envelopes with width and height, find the maximum number that can be nested. Sort by width ascending and height descending, then apply 1D LIS on heights.",
        },
      ],
      tips: [
        "When the problem asks for the actual subsequence (not just the length), use the parent array approach in the O(n²) DP version — Patience Sort alone cannot reconstruct the sequence without extra bookkeeping.",
        "For the Patience Sort approach, always use bisect_left for strictly increasing and bisect_right for non-decreasing subsequences.",
        "If the array contains duplicates and you need strictly increasing, be careful with the bisect variant — bisect_left correctly skips equal elements.",
        "The tails array in Patience Sort is NOT the actual LIS — it is a virtual array used only to track lengths. Always use traceback on the original dp array to find the real sequence.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "LIS asks for the longest subsequence (not subarray) where elements are strictly increasing — elements can be skipped but order must be preserved.",
        "The O(n²) DP solution defines dp[i] as the LIS length ending at index i, then takes max over all j < i where nums[j] < nums[i].",
        "The O(n log n) Patience Sort solution maintains a sorted tails array and uses binary search to find the insertion position for each element.",
        "The final answer is max(dp) for the DP approach, or len(tails) for the Patience Sort approach.",
        "To reconstruct the actual LIS, use a parent array in the DP version and traceback from the index with maximum dp value.",
        "LIS has rich connections to other problems: 2D LIS (Russian Doll Envelopes), counting LIS, bitonic subsequences, and Dilworth's theorem in combinatorics.",
      ],
    },
  },
}

export default function LisVideo() {
  return <AlgoVideo config={config} />
}
