import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Combination Sum",
  subtitle: "Find all unique combinations that sum to a target.",
  category: "backtracking",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Find all unique combinations of candidates that sum to a target",
      body: [
        "Given an array of distinct integers called candidates and a target integer, return all unique combinations of candidates where the chosen numbers sum to the target.",
        "The same number may be chosen from candidates an unlimited number of times.",
        "Two combinations are unique if the frequency of at least one of the chosen numbers is different.",
        "The order of numbers within a combination does not matter — [2, 2, 3] and [3, 2, 2] are the same combination.",
        "The solution set must not contain duplicate combinations.",
      ],
      callout:
        "Combination Sum is a classic backtracking problem. It teaches how to systematically explore all possibilities while pruning invalid branches early.",
    },

    intuition: {
      heading: "Try every candidate, backtrack when you overshoot",
      body: [
        "At each decision point, we choose one candidate to add to our current path.",
        "We only pick candidates at the current index or later — this prevents generating duplicate combinations in different orders.",
        "If the running sum equals the target, we have found a valid combination and record it.",
        "If the running sum exceeds the target, we immediately stop exploring that branch (pruning).",
        "By sorting the candidates first, we can prune even earlier: once a candidate exceeds the remaining target, all subsequent candidates will too.",
      ],
      analogy:
        "Imagine trying to make exact change for a bill using coins. You pick one coin at a time. If your total exceeds the bill amount, you put the last coin back and try a different one. You never use a smaller coin denomination before a larger one in the same attempt, ensuring you don't count the same combination twice.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initial Setup",
          description:
            "Candidates = [2, 3, 6, 7], Target = 7. Sort the candidates to enable early pruning. We will use backtracking to find all combinations.",
          array: [
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Start: path=[], sum=0, start_index=0",
          description:
            "Begin with an empty path and sum of 0. We will try adding each candidate starting from index 0.",
          array: [
            { value: 2, color: "#F0A030" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Add 2: path=[2], sum=2",
          description:
            "Pick candidate 2. Current sum is 2, which is less than 7. Continue exploring — we can reuse 2 or move to the next candidate.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Add 2 again: path=[2,2], sum=4",
          description:
            "Pick 2 again. Sum is now 4, still less than 7. Keep exploring by adding more candidates starting from index 0.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Add 2 again: path=[2,2,2], sum=6",
          description:
            "Pick 2 a third time. Sum is 6, still less than 7. Try adding 2 once more — that would give sum=8 > 7, so prune. Try 3 instead.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#F0A030" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Add 3: path=[2,2,3], sum=7 — FOUND!",
          description:
            "Sum equals target 7! Record combination [2, 2, 3]. Backtrack to path=[2,2] and try the next candidate (6), but 2+2+6=10 > 7, prune.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 6, color: "#E05A3A" },
            { value: 7, color: "#E05A3A" },
          ],
        },
        {
          label: "Backtrack to path=[2], try 3: path=[2,3], sum=5",
          description:
            "Backtrack all the way to path=[2]. Now try adding 3 (index 1). Sum is 5. Continue exploring from index 1.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Add 3 again: path=[2,3,3], sum=8 — PRUNE",
          description:
            "Adding another 3 gives sum=8 > 7. Prune. Try 6: 2+3+6=11 > 7, prune. Backtrack to path=[2,3] — no more valid paths.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#E05A3A" },
            { value: 6, color: "#E05A3A" },
            { value: 7, color: "#E05A3A" },
          ],
        },
        {
          label: "Backtrack to path=[], try 3: path=[3], sum=3",
          description:
            "Backtrack to empty path. Try starting with 3. Explore [3,3]: sum=6. Then [3,3,3]: sum=9 > 7, prune. [3,3,4] — 4 not a candidate.",
          array: [
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#F0A030" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Try 7: path=[7], sum=7 — FOUND!",
          description:
            "Backtrack to empty path. Try 6: [6] sum=6, then [6,6] sum=12 > 7, prune. Try 7: sum=7 equals target! Record combination [7].",
          array: [
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#E05A3A" },
            { value: 7, color: "#CEEB5A" },
          ],
        },
        {
          label: "All combinations found",
          description:
            "Backtracking complete. All branches explored. Two unique combinations found: [2, 2, 3] and [7]. Both sum to the target of 7.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
          ],
        },
      ],
    },

    code: {
      language: "python",
      snippet: `def combination_sum(candidates: list[int], target: int) -> list[list[int]]:
    candidates.sort()          # sort enables early pruning
    results = []

    def backtrack(start: int, path: list[int], remaining: int) -> None:
        if remaining == 0:
            results.append(list(path))   # found a valid combination
            return

        for i in range(start, len(candidates)):
            candidate = candidates[i]

            # Early termination: candidates are sorted, so all subsequent
            # candidates will also exceed the remaining target
            if candidate > remaining:
                break

            path.append(candidate)           # choose
            backtrack(i, path, remaining - candidate)  # explore (reuse allowed)
            path.pop()                       # un-choose (backtrack)

    backtrack(0, [], target)
    return results


# Example usage
candidates = [2, 3, 6, 7]
target = 7
print(combination_sum(candidates, target))
# Output: [[2, 2, 3], [7]]`,
      annotations: [
        {
          lines: [1],
          note: "Sort the candidates first. This allows us to break early when a candidate exceeds the remaining target, avoiding unnecessary recursion.",
        },
        {
          lines: [4, 5, 6, 7],
          note: "Base case: if remaining equals 0, we have found a valid combination. Append a copy of the current path to results (copy is important — path is mutated in-place).",
        },
        {
          lines: [9, 10, 11, 12, 13],
          note: "Iterate from 'start' index onward, not from 0. This ensures we never pick a candidate that comes before the last chosen one, preventing duplicate combinations.",
        },
        {
          lines: [14, 15, 16],
          note: "The choose → explore → un-choose pattern is the heart of backtracking. We add the candidate, recurse with it, then remove it to restore state for the next iteration.",
        },
        {
          lines: [15],
          note: "Pass 'i' (not i+1) as the start index to allow reuse of the same candidate in subsequent recursive calls.",
        },
        {
          lines: [19, 20],
          note: "Entry point: start from index 0, with an empty path and the full target as remaining sum.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n^(T/M))", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n^(T/M))", color: "#2255CC" },
        { label: "Worst Case", value: "O(n^(T/M))", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Recursion Stack", value: "O(T/M)", color: "#2255CC" },
        { label: "Output Space", value: "O(k × T/M)", color: "#F0A030" },
      ],
      notes: [
        "n = number of candidates, T = target value, M = minimum candidate value. The recursion tree has depth at most T/M (e.g., if target=7 and min candidate=2, depth is at most 3).",
        "The early pruning (break when candidate > remaining) significantly reduces the number of nodes explored in practice, making the algorithm much faster than the theoretical worst case.",
        "Output space O(k × T/M) where k is the number of valid combinations found. In the worst case with many small candidates, k can be exponential.",
      ],
    },

    variations: {
      items: [
        "Combination Sum II (LeetCode 40) — each candidate may only be used once; requires deduplication logic to skip duplicate candidates at the same recursion level.",
        "Combination Sum III (LeetCode 216) — find all combinations of exactly k numbers that sum to n, using digits 1–9 each at most once.",
        "Combination Sum IV (LeetCode 377) — count the number of ways to reach the target (order matters), solved with dynamic programming instead of backtracking.",
        "Subset Sum — determine whether any subset sums to a target (decision problem variant, solvable with DP for better complexity).",
        "Coin Change (Minimum Coins) — find the fewest coins that make up a target amount; related but solved with DP (BFS for minimum count).",
      ],
      tips: [
        "Always sort candidates before backtracking — this enables the critical early-termination break statement that prunes entire subtrees.",
        "Pass the current index as 'start' to the recursive call (not start+1) when repetition is allowed; pass start+1 when each element can only be used once.",
        "To avoid duplicates in Combination Sum II, skip candidates at the same recursion level if they equal the previous candidate: if i > start and candidates[i] == candidates[i-1]: continue.",
        "For large targets with small candidates, consider memoization or dynamic programming — backtracking explores exponential paths while DP solves it in O(n × target) time.",
      ],
    },

    summary: {
      keyPoints: [
        "Combination Sum uses backtracking to explore all possible combinations, pruning branches where the running sum exceeds the target.",
        "Sorting candidates before backtracking enables early termination: once a candidate exceeds the remaining target, all subsequent candidates will too.",
        "Passing the current index (not 0) as the start parameter prevents generating duplicate combinations in different orders.",
        "The choose → recurse → un-choose pattern is the universal template for backtracking — it ensures the path is correctly restored after each branch.",
        "Time complexity is O(n^(T/M)) where T is the target and M is the minimum candidate; space complexity is O(T/M) for the recursion stack.",
        "For variants requiring exact count of elements or where order matters, consider switching to dynamic programming for better performance.",
      ],
    },
  },
}

export default function CombinationSumVideo() {
  return <AlgoVideo config={config} />
}
