import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Combinations",
  subtitle: "Generate all k-element combinations from n elements.",
  category: "backtracking",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].",
        "The order of elements within a combination does not matter — [1,2] and [2,1] are the same combination.",
        "Each number in the range [1, n] may be used at most once in a single combination.",
        "The total number of valid combinations is the binomial coefficient C(n, k) = n! / (k! · (n-k)!).",
        "For n=4, k=2 the answer is: [1,2], [1,3], [1,4], [2,3], [2,4], [3,4] — six combinations.",
      ],
    },

    intuition: {
      heading: "Backtracking Intuition",
      bullets: [
        "Think of building a combination slot by slot, always picking a number strictly greater than the last chosen.",
        "At each recursive call we decide: include the current candidate, recurse deeper, then undo (backtrack).",
        "Because we always move forward in the number range, we never produce duplicate combinations.",
        "Pruning: if the remaining candidates are fewer than the remaining slots needed, stop early.",
        "The search space forms a tree; valid combinations live at the leaves at depth k.",
      ],
      analogy:
        "Imagine choosing 2 toppings from a menu of 4. You scan left-to-right, pick one, then scan the remaining options for the second. Once you've exhausted all second choices for the first pick, you swap the first topping and repeat — never re-visiting a pair you've already tried.",
    },

    walkthrough: {
      heading: "Walkthrough — n=4, k=2",
      steps: [
        {
          id: 1,
          title: "Initialise",
          description:
            "Start with an empty combination [] and the full range [1..4]. We need to fill 2 slots.",
        },
        {
          id: 2,
          title: "Pick 1 → combo = [1]",
          description:
            "Choose 1 as the first element. Recurse with start=2, needing 1 more element.",
        },
        {
          id: 3,
          title: "Pick 2 → combo = [1,2]  ✓",
          description:
            "Length reached k=2. Record [1,2] as a valid combination, then backtrack.",
        },
        {
          id: 4,
          title: "Pick 3 → combo = [1,3]  ✓",
          description:
            "After backtracking, try 3 as the second element. Record [1,3], then backtrack.",
        },
        {
          id: 5,
          title: "Pick 4 → combo = [1,4]  ✓",
          description:
            "Try 4 as the second element. Record [1,4]. Backtrack all the way to [].",
        },
        {
          id: 6,
          title: "Pick 2 → combo = [2]",
          description:
            "First element is now 2. Recurse with start=3, needing 1 more element.",
        },
        {
          id: 7,
          title: "Pick 3 → combo = [2,3]  ✓",
          description: "Record [2,3], backtrack.",
        },
        {
          id: 8,
          title: "Pick 4 → combo = [2,4]  ✓",
          description: "Record [2,4]. Backtrack to [].",
        },
        {
          id: 9,
          title: "Pick 3 → combo = [3]",
          description:
            "First element is now 3. Recurse with start=4, needing 1 more element.",
        },
        {
          id: 10,
          title: "Pick 4 → combo = [3,4]  ✓",
          description: "Record [3,4]. Backtrack to [].",
        },
        {
          id: 11,
          title: "Pruning check",
          description:
            "We would try first element = 4, but 4 alone cannot reach length 2 with any remaining element. The pruning condition skips this branch.",
        },
        {
          id: 12,
          title: "Done — 6 combinations",
          description:
            "Result: [1,2], [1,3], [1,4], [2,3], [2,4], [3,4]. Exactly C(4,2)=6 combinations.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from typing import List

def combine(n: int, k: int) -> List[List[int]]:
    results: List[List[int]] = []

    def backtrack(start: int, combo: List[int]) -> None:
        # Base case: combination is complete
        if len(combo) == k:
            results.append(combo[:])   # snapshot the current combo
            return

        # Pruning: need (k - len(combo)) more elements;
        # last valid start is n - (k - len(combo)) + 1
        end = n - (k - len(combo)) + 1

        for i in range(start, end + 1):
            combo.append(i)            # choose
            backtrack(i + 1, combo)    # explore
            combo.pop()                # un-choose (backtrack)

    backtrack(1, [])
    return results


# Example usage
if __name__ == "__main__":
    print(combine(4, 2))
    # [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
`,
      annotations: [
        {
          lines: "6-8",
          note: "Base case: when the combo has exactly k elements, snapshot it with combo[:] and return.",
        },
        {
          lines: "11-12",
          note: "Pruning bound: the last candidate we need to consider is n-(k-len(combo))+1. Any start beyond this cannot fill the remaining slots.",
        },
        {
          lines: "14-17",
          note: "Classic backtracking pattern — append (choose), recurse, pop (un-choose). The loop starts at `start` to avoid reusing or revisiting smaller numbers.",
        },
        {
          lines: "19",
          note: "Kick off the recursion from 1 with an empty combo list.",
        },
        {
          lines: "1-3",
          note: "No external libraries needed. The entire algorithm is self-contained recursion with a shared results list.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          value: "O(C(n,k) · k)",
          note: "Every valid combination is fully constructed before being recorded.",
        },
        {
          case: "Average",
          value: "O(C(n,k) · k)",
          note: "Pruning reduces constant factors but does not change the asymptotic class.",
        },
        {
          case: "Worst",
          value: "O(C(n,k) · k)",
          note: "k=1 or k=n−1 maximises C(n,k); each combination still takes O(k) to copy.",
        },
      ],
      space: [
        {
          case: "Recursion stack",
          value: "O(k)",
          note: "Maximum recursion depth equals k (one frame per chosen element).",
        },
        {
          case: "Output storage",
          value: "O(C(n,k) · k)",
          note: "Storing all results requires space proportional to their total length.",
        },
      ],
      insights: [
        "C(n,k) grows quickly: C(20,10) ≈ 184,756 — always check feasibility before generating all combinations.",
        "The pruning bound `end = n-(k-len(combo))+1` can roughly halve the number of recursive calls in practice.",
        "For very large n and k, consider itertools.combinations in Python which is implemented in C and far faster.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Combinations with Repetition",
          description:
            "Allow each number to be reused: change `backtrack(i+1, combo)` to `backtrack(i, combo)`. This generates multiset combinations.",
        },
        {
          name: "Combination Sum (LeetCode 39)",
          description:
            "Find all combinations of candidates that sum to a target. Same backtracking skeleton with a sum check instead of a length check.",
        },
        {
          name: "k-combinations from a custom set",
          description:
            "Replace the integer range with an arbitrary list. Index into the list instead of using the integer directly.",
        },
        {
          name: "Iterative / Bit-mask approach",
          description:
            "Enumerate all 2^n bitmasks and collect those with exactly k set bits. Simple but O(2^n) — only practical for small n.",
        },
        {
          name: "Lexicographic next combination",
          description:
            "Given a combination, compute the lexicographically next one in O(k) time without generating all predecessors.",
        },
      ],
      tips: [
        "Always copy the combo before appending to results — `results.append(combo[:])` not `results.append(combo)`.",
        "Apply the pruning bound `end = n-(k-len(combo))+1` from the start; it is a free constant-factor speedup.",
        "For production code, prefer `itertools.combinations(range(1, n+1), k)` — it is battle-tested and written in C.",
        "When the problem asks for count only (not the actual combinations), use the closed-form C(n,k) = n!/(k!(n-k)!) in O(k) time.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Combinations are unordered selections; always advance the start index to avoid duplicates.",
        "The backtracking pattern — choose, recurse, un-choose — is the universal template for subset/combination problems.",
        "Pruning the loop upper bound to `n-(k-len(combo))+1` avoids branches that can never succeed.",
        "Time complexity is O(C(n,k)·k); space for the recursion stack is only O(k).",
        "The same skeleton extends to Combination Sum, Subsets, and Permutations with minor modifications.",
        "For counting only, use the mathematical formula; for enumeration, use backtracking or itertools.",
      ],
    },
  },
};

export default function CombinationsVideo() {
  return <AlgoVideo config={config} />;
}
