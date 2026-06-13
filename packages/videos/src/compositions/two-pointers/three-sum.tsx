import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "3Sum",
  subtitle:
    "Finds all unique triplets in a sorted array that sum to zero using a fixed pointer plus two-pointer scan",
  category: "two-pointers",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and nums[i] + nums[j] + nums[k] == 0.",
        "The solution set must not contain duplicate triplets — even if the input has repeated values.",
        "The order of the output triplets and the order of elements within each triplet does not matter.",
        "Input array can contain negative numbers, zero, and positive numbers in any order.",
        "Constraints: 3 ≤ nums.length ≤ 3000, -10⁵ ≤ nums[i] ≤ 10⁵.",
      ],
    },

    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Sort the array first — this lets us use directional pointer movement to efficiently search for complements.",
        "Fix one element nums[i] as the anchor, then reduce the remaining problem to finding a two-sum equal to -nums[i] in the subarray to its right.",
        "Use two pointers (left and right) on the remaining subarray: if the sum is too small, advance left; if too large, retreat right; if exact, record the triplet.",
        "After sorting, duplicate values are adjacent — skip them deliberately to avoid duplicate triplets without needing a hash set.",
        "Real-world analogy: imagine picking one item from a price list, then having a friend scan from both ends of the remaining list to find two items whose combined cost exactly offsets the first — they move inward based on whether the running total is over or under budget.",
      ],
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          label: "Initial array",
          description: "Start with unsorted input.",
          arrayState: {
            values: [-1, 0, 1, 2, -1, -4],
            colors: ["white", "white", "white", "white", "white", "white"],
          },
        },
        {
          label: "Sort the array",
          description: "Sort nums in ascending order: [-4, -1, -1, 0, 1, 2]. Sorting is O(n log n) and enables the two-pointer technique.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["white", "white", "white", "white", "white", "white"],
          },
        },
        {
          label: "Fix i = 0, nums[i] = -4",
          description: "Outer loop starts at index 0. Set left = 1, right = 5. Target two-sum = 0 - (-4) = 4.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["red", "green", "white", "white", "white", "blue"],
          },
        },
        {
          label: "Sum = -4 + (-1) + 2 = -3 < 0",
          description: "Sum is less than zero, so move left pointer rightward to increase the sum.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["red", "yellow", "green", "white", "white", "blue"],
          },
        },
        {
          label: "Sum = -4 + (-1) + 2 = -3 < 0 again",
          description: "Still negative. Move left again.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["red", "white", "yellow", "green", "white", "blue"],
          },
        },
        {
          label: "Left ≥ Right — no triplet for i = 0",
          description: "Pointers crossed without finding a valid triplet. Advance outer loop to i = 1.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "white", "white", "white", "white", "white"],
          },
        },
        {
          label: "Fix i = 1, nums[i] = -1",
          description: "Set left = 2, right = 5. Target two-sum = 0 - (-1) = 1.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "red", "green", "white", "white", "blue"],
          },
        },
        {
          label: "Sum = -1 + (-1) + 2 = 0 ✓ — Triplet found!",
          description: "Record triplet [-1, -1, 2]. Then move both pointers inward and skip duplicates.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "green", "green", "white", "white", "green"],
          },
        },
        {
          label: "Skip duplicate at left, move L → index 3",
          description: "nums[2] == nums[1] == -1, so skip to avoid duplicate triplets. Now left = 3, right = 4.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "gray", "gray", "green", "blue", "gray"],
          },
        },
        {
          label: "Sum = -1 + 0 + 1 = 0 ✓ — Second triplet found!",
          description: "Record triplet [-1, 0, 1]. Move both pointers inward; they cross, so inner loop ends.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "gray", "gray", "green", "green", "gray"],
          },
        },
        {
          label: "Advance i = 2, but nums[2] == nums[1] — skip",
          description: "Duplicate value at outer loop position — skip to prevent duplicate triplets.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "gray", "yellow", "white", "white", "white"],
          },
        },
        {
          label: "i = 3, nums[i] = 0 — remaining sum must be 0",
          description: "left = 4, right = 5. Sum = 0 + 1 + 2 = 3 > 0. Move right left. Pointers cross — done.",
          arrayState: {
            values: [-4, -1, -1, 0, 1, 2],
            colors: ["gray", "gray", "gray", "red", "green", "blue"],
          },
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()                          # O(n log n)
    result = []
    n = len(nums)

    for i in range(n - 2):
        # Skip duplicate values for the fixed pointer
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # Early termination: smallest possible sum > 0
        if nums[i] > 0:
            break

        left, right = i + 1, n - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif total < 0:
                left += 1   # Sum too small — move left pointer right
            else:
                right -= 1  # Sum too large — move right pointer left

    return result`,
      annotations: [
        {
          lines: [1, 2],
          note: "Sorting is the prerequisite for two-pointer convergence. Without it, we cannot make directional decisions based on sum comparisons.",
        },
        {
          lines: [6, 7, 8],
          note: "Outer loop duplicate skip: if nums[i] equals the previous value, any triplets it could form are already recorded — skip to avoid duplicates.",
        },
        {
          lines: [10, 11],
          note: "Early termination: once nums[i] > 0, the smallest possible sum (nums[i] + nums[i+1] + nums[i+2]) must be positive — no more valid triplets exist.",
        },
        {
          lines: [15, 16, 17],
          note: "When a valid triplet is found, record it then advance both pointers. The inner while loops skip over duplicate values to prevent recording the same triplet again.",
        },
        {
          lines: [24, 25],
          note: "Directional pointer movement: if total < 0 the sum is too small so we need a larger value — advance left. If total > 0 we need a smaller value — retreat right.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(n²)", note: "Even if no triplets exist, we still scan all pairs for each i." },
        { case: "Average", complexity: "O(n²)", note: "Outer loop O(n) × inner two-pointer scan O(n)." },
        { case: "Worst", complexity: "O(n²)", note: "All elements are distinct and many triplets exist; no early exits trigger." },
      ],
      spaceRows: [
        { label: "Sorting (in-place)", complexity: "O(log n)", note: "Python's Timsort uses O(log n) stack space." },
        { label: "Output list", complexity: "O(k)", note: "k = number of unique triplets found; not counted as auxiliary space." },
        { label: "Auxiliary (pointers)", complexity: "O(1)", note: "Only a constant number of index variables are used." },
      ],
      insights: [
        "The brute-force O(n³) approach checks every combination of three indices; sorting + two-pointers cuts this to O(n²) by eliminating the innermost loop.",
        "Duplicate skipping is O(1) amortized per skip because each element is visited at most twice by the two pointers in total across the entire inner loop.",
        "The O(n log n) sort cost is dominated by the O(n²) scan, so the overall complexity is simply O(n²).",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "3Sum Closest (LeetCode 16)",
          description: "Instead of finding exact zero-sum triplets, find the triplet whose sum is closest to a given target. Track the minimum absolute difference as pointers move.",
        },
        {
          name: "3Sum Smaller (LeetCode 259)",
          description: "Count the number of triplets whose sum is less than a given target. When sum < target, all pairs (left, right-1), (left, right-2), … (left, left+1) are valid — add right - left to the count.",
        },
        {
          name: "4Sum (LeetCode 18)",
          description: "Generalize to four elements summing to a target. Add one more outer loop and apply the same two-pointer technique inside, giving O(n³) time.",
        },
        {
          name: "kSum (generalized recursion)",
          description: "Recursively reduce kSum to (k-1)Sum until reaching the 2Sum base case. Enables solving any k-element sum problem with O(n^(k-1)) time.",
        },
        {
          name: "Two Sum II — sorted array (LeetCode 167)",
          description: "The direct two-pointer building block for 3Sum. Finding two elements that sum to a target in a sorted array in O(n) time.",
        },
      ],
      tips: [
        "Always sort first — the two-pointer technique only works on sorted data because pointer direction is determined by whether the sum is too large or too small.",
        "Handle the duplicate-skip logic carefully: the outer loop skip uses i > 0 && nums[i] == nums[i-1], while inner skips happen after recording a valid triplet.",
        "The early-break condition nums[i] > 0 is a significant optimization in practice when the array contains many positive values.",
        "For the inner duplicate skips, advance the pointer first (left++, right--) after the while-skip loops, not inside them — otherwise you may skip valid pairs.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Sort the array first — this is the enabling step that makes O(n²) possible instead of O(n³).",
        "Fix one pointer with an outer loop and use a two-pointer scan for the remaining two elements, reducing the inner search from O(n²) to O(n).",
        "Duplicate skipping at both the outer loop and inner pointers is essential for returning unique triplets without a hash set.",
        "The two-pointer convergence works because the array is sorted: moving left right increases the sum, moving right left decreases it.",
        "Early termination when nums[i] > 0 avoids unnecessary work once all remaining triplets must be positive.",
        "This pattern generalizes: kSum problems can be solved by nesting (k-2) outer loops around a two-pointer core, yielding O(n^(k-1)) time.",
      ],
    },
  ],
};

export default function ThreeSumVideo() {
  return <AlgoVideo config={config} />;
}
