import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Two Sum — Two Pointers",
  subtitle: "Uses two pointers on a sorted array to find a pair that sums to the target in O(n) time.",
  category: "two-pointers",
  difficulty: "beginner",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given a **sorted** integer array and a target integer, find two numbers that add up to the target.",
        "Return the **indices** of the two numbers (1-indexed in the classic LeetCode variant, 0-indexed in general).",
        "Each input has **exactly one solution**, and you may not use the same element twice.",
        "The array is guaranteed to be sorted in **non-decreasing** order before the algorithm begins.",
        "Aim for O(n) time and O(1) extra space — no hash maps allowed in the optimal solution.",
      ],
    },

    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Because the array is sorted, moving the **left pointer right** increases the sum, and moving the **right pointer left** decreases it.",
        "Start with the widest possible window: left at index 0, right at the last index.",
        "At each step, compare the current sum to the target and **shrink the window** in the correct direction.",
        "The two pointers will converge toward each other; if a pair exists, they will land on it before crossing.",
        "This eliminates the need for a nested loop — each element is visited **at most once**.",
      ],
      analogy:
        "Imagine a balance scale. You place the lightest weight on the left pan and the heaviest on the right. If the scale tips right (sum too big), swap the right weight for a lighter one. If it tips left (sum too small), swap the left weight for a heavier one. You zero in on balance without trying every combination.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          index: 1,
          label: "Start",
          description: "Array: [1, 3, 5, 7, 9, 11, 15], Target = 12. Place L=0, R=6.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["blue", "gray", "gray", "gray", "gray", "gray", "red"],
          },
        },
        {
          index: 2,
          label: "Check sum",
          description: "arr[0] + arr[6] = 1 + 15 = 16. Sum (16) > Target (12) → move R left.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["blue", "gray", "gray", "gray", "gray", "gray", "red"],
          },
        },
        {
          index: 3,
          label: "Move R",
          description: "R moves from index 6 to index 5. Now arr[0] + arr[5] = 1 + 11 = 12.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["blue", "gray", "gray", "gray", "gray", "red", "gray"],
          },
        },
        {
          index: 4,
          label: "Found!",
          description: "Sum equals target. Return indices [0, 5] (values 1 and 11).",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["green", "gray", "gray", "gray", "gray", "green", "gray"],
          },
        },
        {
          index: 5,
          label: "Sum < Target case",
          description: "If sum < target (e.g., arr[L]+arr[R] = 1+7 = 8 < 12), move L right to increase sum.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["blue", "gray", "gray", "red", "gray", "gray", "gray"],
          },
        },
        {
          index: 6,
          label: "Move L",
          description: "L moves from index 0 to index 1. Sum increases because arr[1] > arr[0].",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["gray", "blue", "gray", "red", "gray", "gray", "gray"],
          },
        },
        {
          index: 7,
          label: "Continue",
          description: "Keep comparing and moving pointers until sum matches target or L >= R.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["gray", "blue", "gray", "gray", "red", "gray", "gray"],
          },
        },
        {
          index: 8,
          label: "No solution",
          description: "If L crosses R (L >= R) without finding the target, no valid pair exists.",
          arrayState: {
            values: [1, 3, 5, 7, 9, 11, 15],
            colors: ["gray", "gray", "gray", "orange", "orange", "gray", "gray"],
          },
        },
        {
          index: 9,
          label: "Why it works",
          description: "Each pointer moves at most n steps total. Combined moves ≤ n → O(n) time guaranteed.",
        },
        {
          index: 10,
          label: "Sorted prerequisite",
          description: "If the array is unsorted, sort it first in O(n log n). The two-pointer pass is still O(n).",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `from typing import List

def two_sum_sorted(numbers: List[int], target: int) -> List[int]:
    """
    Two-pointer solution for Two Sum on a sorted array.
    Returns 1-indexed positions of the two numbers.
    Time:  O(n)
    Space: O(1)
    """
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            # Found the pair; return 1-indexed positions
            return [left + 1, right + 1]
        elif current_sum < target:
            # Sum too small — advance left pointer to increase sum
            left += 1
        else:
            # Sum too large — retreat right pointer to decrease sum
            right -= 1

    # Guaranteed by problem constraints that a solution exists
    return [-1, -1]


# Example usage
numbers = [2, 7, 11, 15]
target = 9
print(two_sum_sorted(numbers, target))  # Output: [1, 2]
`,
      annotations: [
        {
          lines: "9",
          note: "Initialize L at the smallest element (index 0) and R at the largest (last index).",
        },
        {
          lines: "11",
          note: "Loop continues as long as L and R haven't crossed — this is the O(n) bound.",
        },
        {
          lines: "12",
          note: "Compute the candidate sum in O(1) using direct index access.",
        },
        {
          lines: "14-16",
          note: "Exact match found — return 1-indexed positions as required by LeetCode 167.",
        },
        {
          lines: "17-19",
          note: "Sum too small: move L right. Since array is sorted, arr[L+1] > arr[L], so sum increases.",
        },
        {
          lines: "20-22",
          note: "Sum too large: move R left. arr[R-1] < arr[R], so sum decreases. Converges in O(n) total moves.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Complexity Analysis",
      timeRows: [
        { case: "Best", notation: "O(1)", note: "First pair checked is the answer" },
        { case: "Average", notation: "O(n)", note: "Pointers traverse roughly half the array each" },
        { case: "Worst", notation: "O(n)", note: "Pointers must traverse the entire array once" },
      ],
      spaceRows: [
        { label: "Pointer variables", notation: "O(1)", note: "Only two integer indices stored" },
        { label: "Input array", notation: "O(n)", note: "Not counted — read-only input" },
        { label: "Output", notation: "O(1)", note: "Returns a fixed-size pair of indices" },
      ],
      insights: [
        "The two-pointer technique achieves O(n) by exploiting the sorted order — each step provably eliminates at least one candidate, so total steps ≤ n.",
        "Compared to the brute-force O(n²) nested loop, this is a quadratic-to-linear improvement — critical for large inputs.",
        "If the array is unsorted, sorting first costs O(n log n), making the overall complexity O(n log n) — still better than O(n²) brute force.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Two Sum (Unsorted, Hash Map)",
          description:
            "When the array is not sorted, use a hash map to store seen values. O(n) time, O(n) space. This is the classic LeetCode #1.",
        },
        {
          name: "Three Sum",
          description: "Fix one element and apply two-pointer on the remaining subarray. O(n²) overall. LeetCode #15.",
        },
        {
          name: "Four Sum",
          description: "Fix two elements with nested loops, then two-pointer on the rest. O(n³) overall. LeetCode #18.",
        },
        {
          name: "Two Sum — Closest to Target",
          description:
            "Instead of exact match, find the pair whose sum is closest to the target. Track the minimum absolute difference as pointers move.",
        },
        {
          name: "Pair with Given Difference",
          description:
            "Find two elements whose difference equals a target. Sort, then use two pointers moving in the same direction.",
        },
      ],
      tips: [
        "Always confirm the array is sorted before applying two pointers — the correctness proof depends entirely on sorted order.",
        "For problems with duplicates, add logic to skip repeated values after finding a valid pair (essential for Three Sum).",
        "Two pointers also work on linked lists (fast/slow pointer pattern) and sliding-window problems — it is a versatile paradigm.",
        "When asked for count of pairs rather than indices, keep a counter and move both pointers inward after each match.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Two pointers on a sorted array reduce Two Sum from O(n²) to O(n) time with O(1) space.",
        "The algorithm works because sorted order makes the effect of each pointer move predictable — left increases sum, right decreases it.",
        "The while loop terminates in at most n iterations because each iteration moves at least one pointer, and they can only move toward each other.",
        "The sorted prerequisite is non-negotiable — on an unsorted array, use a hash map instead.",
        "This pattern generalizes to k-Sum problems by fixing k-2 elements and applying two pointers on the remainder.",
        "Master this pattern early — it appears in dozens of interview problems and is a building block for sliding-window and merge-based algorithms.",
      ],
    },
  ],
}

export default function TwoSumPointersVideo() {
  return <AlgoVideo config={config} />
}
