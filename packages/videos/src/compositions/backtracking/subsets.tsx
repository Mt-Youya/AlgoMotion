import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Subsets",
  subtitle: "Generate all possible subsets (power set) using backtracking.",
  category: "backtracking",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Generate the Power Set of an Array",
      body: [
        "Given an integer array nums with no duplicate elements, return all possible subsets (the power set).",
        "A subset is any selection of zero or more elements from the array, regardless of order.",
        "The power set of a set with n elements contains exactly 2^n subsets, including the empty set and the full set.",
        "For example, nums = [1, 2, 3] produces 8 subsets: [], [1], [2], [3], [1,2], [1,3], [2,3], [1,2,3].",
        "The result must not contain duplicate subsets, and the order of subsets in the output does not matter.",
      ],
      callout:
        "The power set always contains 2^n elements. For n=10 that is 1024 subsets; for n=20 it exceeds one million — output size grows exponentially.",
    },
    intuition: {
      heading: "Include or Exclude — A Binary Decision at Every Step",
      body: [
        "For each element in the array, we face exactly two choices: include it in the current subset or exclude it.",
        "We explore both choices recursively, building a binary decision tree of depth n.",
        "When we reach the end of the array (base case), the current path is a complete subset — we record it.",
        "After recording, we backtrack: undo the last choice and try the other branch.",
        "This exhaustive exploration guarantees every possible combination is visited exactly once.",
      ],
      analogy:
        "Think of a row of n light switches. Each switch can be ON (include) or OFF (exclude). Every unique combination of switch positions corresponds to one subset. Backtracking is like systematically flipping switches in every possible pattern — you try all 2^n configurations without repeating any.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial State",
          description:
            "We start with nums = [1, 2, 3], an empty current path [], and an empty result list. We will explore from index 0.",
        },
        {
          label: "Include 1 — Recurse",
          description:
            "At index 0, we choose to include nums[0] = 1. Path becomes [1]. We recurse with start index = 1 to process the remaining elements.",
        },
        {
          label: "Include 1, Include 2 — Recurse",
          description: "At index 1, we include nums[1] = 2. Path becomes [1, 2]. We recurse with start index = 2.",
        },
        {
          label: "Include 1, 2, 3 — Base Case Hit",
          description:
            "At index 2, we include nums[2] = 3. Path becomes [1, 2, 3]. We recurse with start index = 3 which equals n, so we record [1, 2, 3] and return.",
        },
        {
          label: "Backtrack — Exclude 3",
          description:
            "We backtrack to index 2. We have already tried including 3, so now we try excluding it. Path stays [1, 2]. We record [1, 2] and return from this level.",
        },
        {
          label: "Backtrack — Exclude 2, Include 3",
          description:
            "We backtrack to index 1. We exclude nums[1] = 2. Path becomes [1]. We recurse and include 3, producing path [1, 3], which we record.",
        },
        {
          label: "Backtrack — Exclude 2 and 3",
          description:
            "Still at the branch where 2 is excluded, we now also exclude 3. Path stays [1]. We record [1] and return.",
        },
        {
          label: "Backtrack to Root — Exclude 1",
          description:
            "We backtrack to index 0. We have tried including 1; now we exclude it. Path becomes []. We recurse with start index = 1.",
        },
        {
          label: "Exclude 1, Include 2",
          description:
            "At index 1, we include 2. Path becomes [2]. We recurse and explore [2, 3] (record it), then [2] alone (record it).",
        },
        {
          label: "Exclude 1 and 2, Include 3",
          description:
            "Back at index 1 with empty path, we exclude 2 and recurse. At index 2 we include 3, path becomes [3]. We record [3].",
        },
        {
          label: "Exclude All — Empty Set",
          description:
            "Finally, we exclude 3 as well. Path stays []. We record [] — the empty set. All 2^3 = 8 subsets have now been collected.",
        },
        {
          label: "Final Result",
          description:
            "Result: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]. Each of the 8 subsets appears exactly once. The algorithm terminates.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def subsets(nums: list[int]) -> list[list[int]]:
    """
    Return all subsets (power set) of nums.
    Uses backtracking with a single path list.

    Time:  O(n * 2^n)  — 2^n subsets, each copied in O(n)
    Space: O(n)        — recursion stack depth + path list
    """
    result: list[list[int]] = []
    path: list[int] = []

    def backtrack(start: int) -> None:
        # Record a snapshot of the current path as a new subset
        result.append(path[:])

        for i in range(start, len(nums)):
            # Choose: include nums[i]
            path.append(nums[i])

            # Explore: recurse with the next start index
            backtrack(i + 1)

            # Un-choose: remove nums[i] (backtrack)
            path.pop()

    backtrack(0)
    return result


# ── Iterative (bitmask) approach ──────────────────────────
def subsets_bitmask(nums: list[int]) -> list[list[int]]:
    n = len(nums)
    result = []
    for mask in range(1 << n):          # 0 .. 2^n - 1
        subset = [
            nums[i]
            for i in range(n)
            if mask & (1 << i)          # bit i is set → include nums[i]
        ]
        result.append(subset)
    return result


# Example
print(subsets([1, 2, 3]))
# [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`,
      annotations: [
        {
          lines: [1],
          note: "The public function accepts a list of distinct integers and returns a list of lists — one entry per subset.",
        },
        {
          lines: [10, 11],
          note: "result accumulates all completed subsets. path is the mutable current subset being built — we reuse it across all recursive calls to avoid allocating new lists.",
        },
        {
          lines: [13, 14],
          note: "Every call to backtrack() records the current path immediately. This means we collect subsets of all sizes, not just leaf nodes — the empty set is captured on the very first call.",
        },
        {
          lines: [16, 17, 18, 19, 20, 21, 22],
          note: "The loop starts at 'start' (not 0) to avoid re-using earlier elements and prevent duplicate subsets. Include → recurse → exclude is the classic backtracking template.",
        },
        {
          lines: [29, 30, 31, 32, 33, 34, 35, 36],
          note: "The bitmask alternative: each integer from 0 to 2^n-1 encodes one subset. Bit i being set means nums[i] is included. Elegant but harder to extend to pruning or constraints.",
        },
        {
          lines: [40],
          note: "Both implementations produce the same 2^n subsets. The backtracking version generalises naturally to Subsets II (with duplicates), Combination Sum, and Permutations.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n · 2^n)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n · 2^n)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n · 2^n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Recursion Stack", value: "O(n)", color: "#CEEB5A" },
        { label: "Current Path", value: "O(n)", color: "#2255CC" },
        { label: "Output Storage", value: "O(n · 2^n)", color: "#888899" },
      ],
      notes: [
        "There are exactly 2^n subsets. Copying each subset into the result list costs O(n) on average, giving O(n · 2^n) total time.",
        "The recursion stack goes at most n levels deep (one level per element), so auxiliary space is O(n) excluding the output.",
        "Output storage is inherently O(n · 2^n) — you cannot do better if you must return all subsets explicitly.",
      ],
    },
    variations: {
      items: [
        "Subsets II (with duplicates): sort nums first, then skip duplicate elements at the same recursion level using 'if i > start and nums[i] == nums[i-1]: continue'.",
        "Combination Sum: reuse elements by passing i (not i+1) to the recursive call, and prune branches where the running sum exceeds the target.",
        "Permutations: instead of a start index, use a visited boolean array so every element can appear at every position.",
        "k-Subsets only: add a size check so that only paths of length exactly k are recorded — useful for combinations C(n, k).",
        "Bitmask DP: represent subsets as integers (bitmasks) and iterate over all 2^n masks; eliminates recursion overhead and is cache-friendly.",
      ],
      tips: [
        "Always append a copy of path (path[:] or list(path)) to the result — appending path itself gives you n references to the same mutable list.",
        "Start the loop at 'start' rather than 0 to naturally enforce non-decreasing index order, which prevents duplicates without any extra bookkeeping.",
        "For large n (n > 20), the output alone exceeds one million entries — consider streaming results or using a generator instead of collecting everything.",
        "The backtracking template (choose → explore → un-choose) applies identically to Permutations, Combinations, N-Queens, and Sudoku — learn it once, use it everywhere.",
      ],
    },
    summary: {
      keyPoints: [
        "Subsets generates the power set of an array by making an include/exclude decision for each element via backtracking.",
        "The decision tree has depth n and exactly 2^n leaf nodes; every path from root to any node corresponds to one unique subset.",
        "Recording the current path at the start of each recursive call (not just at leaves) is what collects subsets of all sizes.",
        "Time complexity is O(n · 2^n) because there are 2^n subsets and each takes O(n) to copy; space is O(n) for the recursion stack.",
        "The backtracking template — choose, recurse, un-choose — is the foundational pattern for all combinatorial enumeration problems.",
        "Subsets is the gateway problem to Subsets II, Combination Sum, Permutations, and N-Queens — mastering it unlocks the entire backtracking category.",
      ],
    },
  },
}

export default function SubsetsVideo() {
  return <AlgoVideo config={config} />
}
