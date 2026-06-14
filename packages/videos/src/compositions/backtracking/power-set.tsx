import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Power Set",
  subtitle: "Generate all subsets of a set using backtracking.",
  category: "backtracking",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What is the Power Set Problem?",
      bullets: [
        "Given a set S with n distinct elements, generate every possible subset of S — including the empty set ∅ and S itself.",
        "The power set P(S) always contains exactly 2ⁿ subsets: for each element we independently choose to include it or not.",
        "For S = {1, 2, 3} (n = 3) the power set has 2³ = 8 subsets: ∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}.",
        "The result must contain no duplicates; if the input has duplicates they must be handled by sorting and skipping identical siblings.",
        "This is a foundational combinatorics problem that appears in subset-sum, knapsack variants, and feature-selection algorithms.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Model the problem as a binary decision tree: at each level we decide whether to include the current element.",
        "Each root-to-leaf path encodes one subset — the sequence of 'include' choices along the path forms the subset.",
        "The tree has n levels and 2ⁿ leaves, so the recursion visits every possible combination exactly once.",
        "Backtracking is the key: after exploring both choices for an element we undo (backtrack) the last choice and move to the next branch.",
        "No pruning is needed here — every branch leads to a valid subset — making this a pure exhaustive enumeration.",
      ],
      analogy:
        "Imagine a row of n light switches. Each switch can be ON (include) or OFF (exclude). Every possible combination of switch positions corresponds to exactly one subset. Walking through all 2ⁿ combinations in order is exactly what the backtracking recursion does.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough on {1, 2, 3}",
      steps: [
        {
          step: 1,
          description:
            "Start with an empty current path and index 0. We will explore all choices for element at index 0 (value 1).",
          array: {
            values: [1, 2, 3],
            colors: ["yellow", "white", "white"],
          },
        },
        {
          step: 2,
          description: "Include element 1. Path = [1]. Recurse with index 1 to decide about element 2.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "yellow", "white"],
          },
        },
        {
          step: 3,
          description: "Include element 2. Path = [1, 2]. Recurse with index 2 to decide about element 3.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "green", "yellow"],
          },
        },
        {
          step: 4,
          description:
            "Include element 3. Path = [1, 2, 3]. Index = 3 = n → record subset {1, 2, 3}. Backtrack: remove 3.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "green", "green"],
          },
        },
        {
          step: 5,
          description:
            "Exclude element 3 (second choice at index 2). Path = [1, 2]. Record subset {1, 2}. Backtrack: remove 2.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "green", "white"],
          },
        },
        {
          step: 6,
          description:
            "Exclude element 2 (second choice at index 1). Path = [1]. Recurse with index 2 to decide about element 3.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "white", "yellow"],
          },
        },
        {
          step: 7,
          description: "Include element 3. Path = [1, 3]. Record subset {1, 3}. Backtrack: remove 3.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "white", "green"],
          },
        },
        {
          step: 8,
          description:
            "Exclude element 3. Path = [1]. Record subset {1}. Backtrack: remove 1. Now explore the 'exclude 1' branch.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "white", "white"],
          },
        },
        {
          step: 9,
          description:
            "Exclude element 1 (second choice at root). Path = []. Recurse for elements 2 and 3, collecting {2,3}, {2}, {3}, ∅.",
          array: {
            values: [1, 2, 3],
            colors: ["white", "yellow", "white"],
          },
        },
        {
          step: 10,
          description: "All 8 subsets collected: ∅, {3}, {2}, {2,3}, {1}, {1,3}, {1,2}, {1,2,3}. Recursion complete.",
          array: {
            values: [1, 2, 3],
            colors: ["green", "green", "green"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from typing import List


def power_set(nums: List[int]) -> List[List[int]]:
    """
    Return all subsets of nums using backtracking.
    Time:  O(n * 2^n)   Space: O(n) auxiliary (recursion stack)
    """
    result: List[List[int]] = []

    def backtrack(index: int, path: List[int]) -> None:
        # Every call represents a valid subset — record it
        result.append(list(path))

        # Try including each remaining element
        for i in range(index, len(nums)):
            path.append(nums[i])          # choose
            backtrack(i + 1, path)        # explore
            path.pop()                    # un-choose (backtrack)

    backtrack(0, [])
    return result


# ── Alternative: include / exclude formulation ──────────────────
def power_set_v2(nums: List[int]) -> List[List[int]]:
    result: List[List[int]] = []

    def backtrack(index: int, path: List[int]) -> None:
        if index == len(nums):
            result.append(list(path))
            return
        # Branch 1: include nums[index]
        path.append(nums[index])
        backtrack(index + 1, path)
        path.pop()
        # Branch 2: exclude nums[index]
        backtrack(index + 1, path)

    backtrack(0, [])
    return result


# Example
if __name__ == "__main__":
    print(power_set([1, 2, 3]))
    # [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]
`,
      annotations: [
        {
          lines: [10, 11],
          note: "Record the current path at every call — not just at leaf nodes. This is what makes this the 'append-at-entry' variant; every prefix is a valid subset.",
        },
        {
          lines: [13, 14, 15, 16, 17],
          note: "The loop starts at 'index' (not 0) to avoid revisiting earlier elements, ensuring each subset appears exactly once without duplicates.",
        },
        {
          lines: [15],
          note: "'path.append(nums[i])' is the CHOOSE step — we tentatively add the element to the current subset.",
        },
        {
          lines: [17],
          note: "'path.pop()' is the UNCHOOSE (backtrack) step — we remove the last element to restore the path before trying the next candidate.",
        },
        {
          lines: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
          note: "Alternative include/exclude formulation: at each index make an explicit binary choice. Reaches leaves at index == n. Both variants produce the same result.",
        },
        {
          lines: [37, 38],
          note: "Calling backtrack(0, []) kicks off the recursion from the first element with an empty path. The result list is captured via closure.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n · 2ⁿ)",
          explanation:
            "Even for a single-element input the recursion must still enumerate all 2¹ = 2 subsets. There is no early-exit path.",
        },
        {
          case: "Average",
          notation: "O(n · 2ⁿ)",
          explanation:
            "The recursion tree always has exactly 2ⁿ leaves. Copying each subset into the result list takes O(n) amortised, giving O(n · 2ⁿ) total.",
        },
        {
          case: "Worst",
          notation: "O(n · 2ⁿ)",
          explanation:
            "All cases are identical — there is no pruning. The output itself has size O(n · 2ⁿ), so this is output-optimal.",
        },
      ],
      spaceRows: [
        {
          type: "Recursion stack",
          notation: "O(n)",
          explanation:
            "The call stack reaches depth n (one frame per element). The current path also holds at most n elements.",
        },
        {
          type: "Output storage",
          notation: "O(n · 2ⁿ)",
          explanation:
            "Storing all 2ⁿ subsets, each of average length n/2, requires O(n · 2ⁿ) space for the result list.",
        },
      ],
      insights: [
        "The algorithm is output-optimal: every subset must appear in the result, so O(n · 2ⁿ) time and space cannot be improved asymptotically.",
        "Using a mutable path list with append/pop avoids creating O(n) copies at every recursive call, keeping auxiliary memory at O(n).",
        "For inputs with duplicate elements, sort first and skip nums[i] == nums[i-1] when i > index to avoid duplicate subsets in O(n · 2ⁿ) time.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Subsets II (with duplicates)",
          description:
            "Sort the input first, then skip a candidate nums[i] when i > index and nums[i] == nums[i-1]. This prunes duplicate branches in O(1) per skip, keeping the total time O(n · 2ⁿ).",
        },
        {
          name: "Iterative / Bit-mask approach",
          description:
            "Enumerate integers from 0 to 2ⁿ - 1. For each integer, the set bits indicate which elements to include. Simpler to implement but identical O(n · 2ⁿ) complexity.",
        },
        {
          name: "Iterative BFS expansion",
          description:
            "Start with result = [[]]. For each new element, clone every existing subset, append the element to each clone, and add the clones to result. Avoids recursion entirely.",
        },
        {
          name: "Subset Sum / Knapsack filter",
          description:
            "Extend the backtracking with a target sum: prune branches where the running sum already exceeds the target. Reduces average-case work for constrained problems.",
        },
        {
          name: "k-Subsets (combinations of size k)",
          description:
            "Add a size constraint: only record the path when len(path) == k. Prune branches where remaining elements are insufficient to reach size k. Equivalent to itertools.combinations.",
        },
      ],
      tips: [
        "Always use a single mutable list for the path and restore it with pop() — creating a new list at every recursive call wastes O(n) memory per frame.",
        "Sort the input before backtracking if duplicates are possible; the sort enables the O(1) sibling-skip check nums[i] == nums[i-1].",
        "For very large n (n > 20) the 2ⁿ output size makes full enumeration impractical — consider lazy generators (Python's yield) to stream subsets on demand.",
        "The 'append at entry' pattern (record result before the loop) is slightly simpler than the 'append at leaf' pattern and produces the same set of subsets.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "The power set of an n-element set contains exactly 2ⁿ subsets — one for every binary choice of including or excluding each element.",
        "Backtracking models the problem as a decision tree: at each node we branch into 'include' and 'exclude', depth-first exploring every combination.",
        "Recording the current path at every recursive entry (not just at leaves) is the cleanest way to collect all subsets without extra base-case logic.",
        "The choose-explore-unchoose pattern (append → recurse → pop) keeps auxiliary space at O(n) by reusing a single mutable path list.",
        "Time and space complexity are both O(n · 2ⁿ) — unavoidable since the output itself has that size, making the algorithm output-optimal.",
        "Handling duplicates requires sorting the input and skipping repeated siblings during the loop, a one-line guard that eliminates all duplicate subsets.",
      ],
    },
  },
}

export default function PowerSetVideo() {
  return <AlgoVideo config={config} />
}
