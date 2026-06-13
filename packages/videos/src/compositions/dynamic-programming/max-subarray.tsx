import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Maximum Subarray",
  subtitle: "Find contiguous subarray with largest sum using Kadane's algorithm.",
  category: "dynamic-programming",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an integer array (which may contain negative numbers), find the contiguous subarray that has the largest sum and return that sum.",
        "A subarray is a contiguous slice of the original array — you cannot skip elements.",
        "Example: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4] → the subarray [4, -1, 2, 1] has sum 6, which is the maximum.",
        "The array always contains at least one element, so the answer is always defined (even if all values are negative).",
        "This is one of the most famous problems in computer science, originally solved by Kadane in 1984 in linear time.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "At each position, you face a binary choice: extend the running subarray by including the current element, or discard everything and start a new subarray from the current element.",
        "Extending is worthwhile only if the running sum is positive — a negative running sum would drag down any future elements.",
        "So the recurrence is simply: current_sum = max(num, current_sum + num).",
        "Track the global maximum seen so far: max_sum = max(max_sum, current_sum) after each update.",
        "Because each decision depends only on the immediately preceding running sum, a single left-to-right pass is sufficient.",
      ],
      analogy:
        "Imagine you are hiking a mountain range and tracking your cumulative altitude gain. Whenever your total gain since the last valley drops below zero, you mentally 'reset' your baseline to the current peak — because carrying a negative gain into the next climb only hurts you. Kadane's algorithm does exactly this: it resets whenever the running total becomes a liability.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with current_sum = -∞ and max_sum = -∞. We will scan left to right.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "i=0, val=-2. current_sum = max(-2, -∞ + -2) = -2. max_sum = -2.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["blue", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: "i=1, val=1. current_sum = max(1, -2 + 1) = max(1, -1) = 1. max_sum = 1. Fresh start — 1 alone beats extending.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "blue", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "i=2, val=-3. current_sum = max(-3, 1 + -3) = max(-3, -2) = -2. max_sum stays 1.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "red", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "i=3, val=4. current_sum = max(4, -2 + 4) = max(4, 2) = 4. Fresh start again — 4 alone beats extending. max_sum = 4.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description: "i=4, val=-1. current_sum = max(-1, 4 + -1) = max(-1, 3) = 3. Extending wins — running sum 3 > -1. max_sum stays 4.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 7,
          description: "i=5, val=2. current_sum = max(2, 3 + 2) = 5. Extending wins. max_sum = 5.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "yellow", "green", "gray", "gray", "gray"],
        },
        {
          step: 8,
          description: "i=6, val=1. current_sum = max(1, 5 + 1) = 6. Extending wins. max_sum = 6. This is the global peak!",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "yellow", "green", "green", "gray", "gray"],
        },
        {
          step: 9,
          description: "i=7, val=-5. current_sum = max(-5, 6 + -5) = max(-5, 1) = 1. Extending wins but sum drops. max_sum stays 6.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "yellow", "green", "green", "red", "gray"],
        },
        {
          step: 10,
          description: "i=8, val=4. current_sum = max(4, 1 + 4) = 5. Extending wins. max_sum stays 6.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "yellow", "green", "green", "red", "blue"],
        },
        {
          step: 11,
          description: "Scan complete. max_sum = 6. The winning subarray is [4, -1, 2, 1] at indices 3–6.",
          values: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
          colors: ["gray", "gray", "gray", "green", "green", "green", "green", "gray", "gray"],
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def max_subarray(nums: list[int]) -> int:
    """Return the largest sum of any contiguous subarray."""
    # Initialize both trackers to the first element
    # so the algorithm handles all-negative arrays correctly.
    current_sum = nums[0]
    max_sum = nums[0]

    # Scan from the second element onward
    for num in nums[1:]:
        # Either extend the running subarray or start fresh
        current_sum = max(num, current_sum + num)
        # Update the global maximum
        max_sum = max(max_sum, current_sum)

    return max_sum


# ── Example usage ────────────────────────────────────────────────────────────
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
print(max_subarray(nums))          # 6  ([4, -1, 2, 1])

print(max_subarray([-1]))          # -1 (single negative element)
print(max_subarray([5, 4, -1, 7, 8]))  # 23 (entire array)
print(max_subarray([-3, -1, -2]))  # -1 (least-negative element)


# ── Variant: also return the subarray indices ────────────────────────────────
def max_subarray_with_indices(nums: list[int]) -> tuple[int, int, int]:
    """Return (max_sum, start_index, end_index)."""
    current_sum = nums[0]
    max_sum = nums[0]
    start = end = 0
    temp_start = 0

    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            temp_start = i
        else:
            current_sum += nums[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return max_sum, start, end`,
      annotations: [
        {
          lines: [3, 4, 5],
          note: "Initialize both current_sum and max_sum to nums[0] instead of 0 or -∞. This correctly handles arrays where every element is negative — the answer is the least-negative element.",
        },
        {
          lines: [8, 9],
          note: "The single line 'current_sum = max(num, current_sum + num)' encodes the entire Kadane decision: if current_sum is negative, starting fresh from num alone is better than extending.",
        },
        {
          lines: [11],
          note: "Update max_sum every iteration. The global maximum could occur anywhere in the array, not just at the end.",
        },
        {
          lines: [13],
          note: "Return max_sum after the single O(n) pass. No extra array or DP table is needed — space is O(1).",
        },
        {
          lines: [28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
          note: "The index-tracking variant records temp_start whenever a fresh subarray begins, and commits it to start only when a new global maximum is found. This lets you reconstruct the exact winning subarray.",
        },
        {
          lines: [16, 17, 18, 19],
          note: "Edge cases: a single-element array always returns that element. An all-negative array returns the largest (least-negative) element. An all-positive array returns the total sum.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n)",
          note: "Even if the answer is found at the first element, the algorithm must still scan all n elements to confirm no larger subarray exists later.",
        },
        {
          case: "Average",
          notation: "O(n)",
          note: "A single left-to-right pass with O(1) work per element gives linear time regardless of the input distribution.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          note: "The worst case is identical to the best case — Kadane's algorithm has no branching that causes extra work. All inputs take exactly n iterations.",
        },
      ],
      space: [
        {
          case: "Working Variables",
          notation: "O(1)",
          note: "Only two scalar variables (current_sum, max_sum) are maintained throughout the scan. No auxiliary array is needed.",
        },
        {
          case: "Input",
          notation: "O(n)",
          note: "The input array itself takes O(n) space, but this is not counted as auxiliary space used by the algorithm.",
        },
      ],
      insights: [
        "Kadane's algorithm is optimal: any correct algorithm must read all n elements at least once, so O(n) time is a lower bound. Kadane achieves this lower bound.",
        "The O(1) space usage is a significant advantage over divide-and-conquer approaches (O(log n) stack space) and naive DP table approaches (O(n) space).",
        "The algorithm extends naturally to 2-D arrays (maximum submatrix sum) in O(n³) time by fixing column boundaries and applying Kadane row-wise.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Maximum Subarray Sum (Circular Array)",
          description: "The subarray may wrap around the end of the array back to the beginning. Solved by computing both the standard Kadane result and the total sum minus the minimum subarray sum, then taking the max of the two.",
        },
        {
          name: "Maximum Product Subarray",
          description: "Replace sum with product. Requires tracking both the current maximum and current minimum (because a large negative times another negative becomes a large positive), making it slightly more complex but still O(n).",
        },
        {
          name: "Maximum Subarray of Length K",
          description: "Constrain the subarray to exactly or at most k elements. Use a sliding window of size k combined with a prefix sum array to find the answer in O(n) time.",
        },
        {
          name: "Maximum Sum of Non-Adjacent Elements",
          description: "You may not pick adjacent elements. This is the House Robber problem — a different DP recurrence but the same bottom-up linear scan pattern as Kadane's.",
        },
        {
          name: "Minimum Subarray Sum",
          description: "Find the contiguous subarray with the smallest sum. Identical to Kadane's algorithm with max replaced by min and the initialization negated.",
        },
      ],
      tips: [
        "Always initialize current_sum and max_sum to nums[0], not to 0. Initializing to 0 gives wrong answers when all elements are negative.",
        "To recover the actual subarray (not just the sum), track a temp_start index that resets whenever a fresh subarray begins, and commit it to start only when a new max_sum is recorded.",
        "For the circular variant, the key insight is that the maximum circular subarray equals total_sum minus the minimum subarray sum — handle the edge case where all elements are negative separately.",
        "Kadane's algorithm is a special case of dynamic programming where the state space collapses to a single scalar, which is why it achieves O(1) space.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Kadane's algorithm solves Maximum Subarray in O(n) time and O(1) space — a single left-to-right scan with two variables.",
        "The core decision at each step: current_sum = max(num, current_sum + num). If the running sum is negative, start fresh; otherwise extend.",
        "Always initialize to nums[0], not 0 — this handles all-negative arrays correctly without special-casing.",
        "The algorithm is provably optimal: reading every element at least once is unavoidable, and Kadane does exactly that.",
        "Recovering the subarray indices requires tracking a temp_start that commits to start only when a new global maximum is found.",
        "The same pattern extends to circular arrays, maximum product, and 2-D maximum submatrix problems with minor modifications.",
      ],
    },
  },
};

export default function MaxSubarrayVideo() {
  return <AlgoVideo config={config} />;
}
