import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Permutations",
  subtitle: "Generate all permutations of a given array using backtracking.",
  category: "backtracking",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an array of distinct integers, return all possible permutations — every unique ordering of the elements.",
        "For an array of length n, there are exactly n! (n factorial) permutations. For [1, 2, 3] that is 3! = 6.",
        "Each permutation is a rearrangement of the same elements; no element appears twice in a single permutation.",
        "Example: nums = [1, 2, 3] → [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]].",
        "The problem asks you to enumerate the entire output set, so any algorithm must touch at least O(n · n!) work.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of filling n slots one by one: for the first slot you have n choices, for the second n-1, and so on.",
        "Backtracking systematically explores every choice: place an element, recurse to fill the rest, then undo the placement and try the next element.",
        "The swap-in-place trick avoids an extra 'used' set: swap the current candidate into the active position, recurse, then swap back.",
        "The recursion tree has n! leaves (complete permutations) and n × n! total nodes across all levels.",
        "Because every leaf must be visited, backtracking is optimal — no algorithm can do better than O(n · n!).",
      ],
      analogy:
        "Imagine arranging books on a shelf. You pick any book for the first slot, then arrange the remaining books in all possible orders for the rest of the shelf. After exhausting all arrangements starting with that first book, you swap it out and try the next book — that is exactly what backtracking does.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with nums = [1, 2, 3]. Call backtrack(start=0). All positions are unfixed.",
          values: [1, 2, 3],
          colors: ["blue", "blue", "blue"],
        },
        {
          step: 2,
          description: "Fix position 0: swap(0, 0) — no change. Array is still [1, 2, 3]. Recurse with start=1.",
          values: [1, 2, 3],
          colors: ["green", "blue", "blue"],
        },
        {
          step: 3,
          description: "Fix position 1: swap(1, 1) — no change. Array is [1, 2, 3]. Recurse with start=2.",
          values: [1, 2, 3],
          colors: ["green", "green", "blue"],
        },
        {
          step: 4,
          description: "start == len(nums): base case reached. Record permutation [1, 2, 3]. Backtrack.",
          values: [1, 2, 3],
          colors: ["green", "green", "green"],
        },
        {
          step: 5,
          description: "Back at start=1: swap(1, 2) → array becomes [1, 3, 2]. Recurse with start=2.",
          values: [1, 3, 2],
          colors: ["green", "orange", "orange"],
        },
        {
          step: 6,
          description: "Base case: record [1, 3, 2]. Backtrack: swap(1, 2) again → restore [1, 2, 3].",
          values: [1, 3, 2],
          colors: ["green", "green", "green"],
        },
        {
          step: 7,
          description: "Back at start=0: swap(0, 1) → array becomes [2, 1, 3]. Recurse with start=1.",
          values: [2, 1, 3],
          colors: ["orange", "orange", "blue"],
        },
        {
          step: 8,
          description:
            "Fix position 1: swap(1,1) → [2,1,3] → record [2,1,3]. Then swap(1,2) → [2,3,1] → record [2,3,1].",
          values: [2, 1, 3],
          colors: ["green", "green", "green"],
        },
        {
          step: 9,
          description: "Back at start=0: restore [1,2,3], then swap(0,2) → [3,2,1]. Recurse with start=1.",
          values: [3, 2, 1],
          colors: ["orange", "blue", "blue"],
        },
        {
          step: 10,
          description: "Fix position 1: record [3,2,1] and [3,1,2]. All 6 permutations have been collected.",
          values: [3, 2, 1],
          colors: ["green", "green", "green"],
        },
        {
          step: 11,
          description: "Final result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]. All 3! = 6 orderings.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def permute(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start: int) -> None:
        # Base case: all positions have been fixed
        if start == len(nums):
            result.append(nums[:])  # copy the current arrangement
            return

        for i in range(start, len(nums)):
            # Choose: swap nums[start] with nums[i]
            nums[start], nums[i] = nums[i], nums[start]

            # Explore: recurse to fix the next position
            backtrack(start + 1)

            # Unchoose: restore the array (backtrack)
            nums[start], nums[i] = nums[i], nums[start]

    backtrack(0)
    return result


# Example usage
nums = [1, 2, 3]
all_perms = permute(nums)
print(f"Total permutations: {len(all_perms)}")  # 6
for p in all_perms:
    print(p)
# [1, 2, 3]
# [1, 3, 2]
# [2, 1, 3]
# [2, 3, 1]
# [3, 1, 2]
# [3, 2, 1]


# Alternative: using a 'used' boolean array (no in-place swap)
def permute_with_used(nums: list[int]) -> list[list[int]]:
    result = []
    used = [False] * len(nums)
    path: list[int] = []

    def backtrack() -> None:
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i, val in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(val)
                backtrack()
                path.pop()
                used[i] = False

    backtrack()
    return result`,
      annotations: [
        {
          lines: [4, 5, 6],
          note: "Base case: when 'start' reaches the end of the array, every position has been fixed. Copy and record the current arrangement — never append the list directly or all results will point to the same mutable object.",
        },
        {
          lines: [8, 9, 10],
          note: "The loop tries placing each remaining element (index i from 'start' to end) at position 'start'. The swap brings nums[i] into the active slot without needing extra memory.",
        },
        {
          lines: [12, 13],
          note: "Recurse with start+1 to fix the next position. At this point nums[start] is fixed and we only permute the suffix nums[start+1:].",
        },
        {
          lines: [15, 16],
          note: "Backtrack: swap back to restore the original array state before trying the next candidate. This is the 'undo' step that makes backtracking work.",
        },
        {
          lines: [36, 37, 38, 39, 40, 41, 42, 43],
          note: "Alternative using a 'used' boolean array and an explicit path list. Clearer for beginners but uses O(n) extra space for 'used' and 'path'. The swap approach avoids this overhead.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n · n!)",
          note: "Even for n=1 the single permutation must be copied. There is no early-exit shortcut.",
        },
        {
          case: "Average",
          notation: "O(n · n!)",
          note: "The recursion tree always has n! leaves, each requiring O(n) work to copy the result.",
        },
        {
          case: "Worst",
          notation: "O(n · n!)",
          note: "All n! permutations are always generated. The number of recursive calls is e × n! (by the formula for partial permutation sums).",
        },
      ],
      space: [
        {
          case: "Recursion Stack",
          notation: "O(n)",
          note: "The recursion depth is exactly n (one level per position). No auxiliary data structure is needed for the swap approach.",
        },
        {
          case: "Output",
          notation: "O(n · n!)",
          note: "Storing all permutations requires n! lists each of length n.",
        },
      ],
      insights: [
        "The O(n · n!) time bound is tight — any correct algorithm must output n! permutations of length n, so it cannot be faster.",
        "The swap-in-place approach uses only O(n) auxiliary space (the call stack), making it more memory-efficient than the 'used' array approach.",
        "For large n (e.g. n=12, 12! ≈ 479 million), generating all permutations becomes impractical. Consider iterating lazily with a generator instead.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Permutations II (with duplicates)",
          description:
            "When the input array may contain duplicate values, sort the array first and skip a candidate if it equals the previous candidate at the same recursion level and the previous candidate has already been unswapped. This prunes duplicate branches without a set.",
        },
        {
          name: "Next Permutation",
          description:
            "Given a permutation, find the lexicographically next one in O(n) time without generating all permutations. Uses a suffix scan to find the rightmost ascent, then swaps and reverses the suffix.",
        },
        {
          name: "Permutation in String (LeetCode 567)",
          description:
            "Check whether any permutation of string s1 is a substring of s2. Solved efficiently with a sliding window and frequency counts in O(|s2|) — no need to enumerate permutations.",
        },
        {
          name: "K-th Permutation",
          description:
            "Find the k-th permutation in lexicographic order directly in O(n²) using the factorial number system, without generating all n! permutations.",
        },
        {
          name: "Combinations & Subsets",
          description:
            "Closely related backtracking problems. Combinations choose r items from n (order does not matter); subsets enumerate all 2^n subsets. The same choose-recurse-unchoose pattern applies.",
        },
      ],
      tips: [
        "Prefer the swap-in-place approach over the 'used' array approach: it saves O(n) space and is slightly faster due to fewer memory allocations.",
        "Always copy the current arrangement when recording a result (nums[:] in Python). Appending the list reference is a classic bug — all results end up identical.",
        "To handle duplicates, sort the input first and add a guard: if i > start and nums[i] == nums[i-1]: continue. This skips redundant branches.",
        "For very large n, use Python's itertools.permutations() which is implemented in C and far faster than a pure-Python backtracking solution.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Permutations is a canonical backtracking problem: choose an element for the current position, recurse, then undo the choice.",
        "The swap-in-place technique fixes one element at each recursion level without needing a separate 'used' array, keeping space at O(n).",
        "Time complexity is O(n · n!) — unavoidable because the output itself has that size.",
        "The recursion depth equals n, so the call stack uses only O(n) space.",
        "For arrays with duplicates, sort first and skip repeated candidates at the same recursion depth to avoid identical permutations.",
        "The same backtracking template — choose, explore, unchoose — applies directly to combinations, subsets, N-Queens, and Sudoku Solver.",
      ],
    },
  },
}

export default function PermutationsVideo() {
  return <AlgoVideo config={config} />
}
