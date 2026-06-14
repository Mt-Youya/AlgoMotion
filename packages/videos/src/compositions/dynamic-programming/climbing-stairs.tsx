import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Climbing Stairs",
  subtitle: "Count distinct ways to climb n stairs taking 1 or 2 steps at a time.",
  category: "dynamic-programming",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "How many ways can you climb n stairs?",
      body: [
        "You are standing at the bottom of a staircase with n steps. At each move you may climb either 1 step or 2 steps.",
        "Your goal is to count the total number of distinct ways you can reach the top (step n) starting from step 0.",
        "For n = 1 the answer is 1 (only one 1-step move). For n = 2 the answer is 2: take two 1-steps, or one 2-step.",
        "For n = 5 the answer is 8. The number grows quickly — it follows the Fibonacci sequence.",
        "A brute-force recursive solution recalculates the same sub-problems exponentially many times. Dynamic programming eliminates this redundancy.",
      ],
      callout:
        "The answer for n stairs is always the (n+1)-th Fibonacci number: F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8, F(7)=13 …",
    },
    intuition: {
      heading: "Build the answer from smaller answers",
      body: [
        "To reach stair i you must have come from stair i-1 (taking 1 step) or from stair i-2 (taking 2 steps).",
        "Therefore the number of ways to reach stair i equals the number of ways to reach stair i-1 plus the number of ways to reach stair i-2.",
        "This is the recurrence: dp[i] = dp[i-1] + dp[i-2], with base cases dp[0] = 1 and dp[1] = 1.",
        "Because each dp[i] depends only on the previous two values, we can compute the entire table left-to-right in a single O(n) pass.",
        "With a simple variable swap we can reduce memory from O(n) to O(1) — we only ever need the last two computed values.",
      ],
      analogy:
        "Think of a frog jumping up a staircase. It can leap 1 or 2 steps. The total number of jump sequences to reach step n is exactly the number of ways to tile a 1×n strip with tiles of width 1 and 2 — a classic combinatorics identity that equals F(n+1).",
    },
    walkthrough: {
      steps: [
        {
          label: "Define the problem for n = 6",
          description:
            "We want to count distinct step sequences from stair 0 to stair 6. Each move adds 1 or 2 to the current position. We initialise a dp array of length 7.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Set base case dp[0] = 1",
          description:
            "There is exactly one way to be at stair 0: do nothing. This is our starting point — the empty path. dp[0] = 1.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Set base case dp[1] = 1",
          description: "There is exactly one way to reach stair 1: take a single 1-step from stair 0. dp[1] = 1.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Fill dp[2] = dp[1] + dp[0] = 2",
          description:
            "To reach stair 2: come from stair 1 (1 way) or from stair 0 (1 way). Total = 2. Sequences: [1,1] and [2].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#2255CC" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Fill dp[3] = dp[2] + dp[1] = 3",
          description:
            "To reach stair 3: come from stair 2 (2 ways) or from stair 1 (1 way). Total = 3. Sequences: [1,1,1], [1,2], [2,1].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#2255CC" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Fill dp[4] = dp[3] + dp[2] = 5",
          description:
            "To reach stair 4: come from stair 3 (3 ways) or from stair 2 (2 ways). Total = 5. The Fibonacci pattern is becoming visible.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#2255CC" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Fill dp[5] = dp[4] + dp[3] = 8",
          description: "To reach stair 5: come from stair 4 (5 ways) or from stair 3 (3 ways). Total = 8.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#2255CC" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Fill dp[6] = dp[5] + dp[4] = 13",
          description:
            "To reach stair 6: come from stair 5 (8 ways) or from stair 4 (5 ways). Total = 13. This is our answer.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 13, color: "#E05A3A" },
          ],
        },
        {
          label: "Space-optimised: rolling two variables",
          description:
            "We only need dp[i-1] and dp[i-2] at any time. Replace the array with two variables prev=1, curr=1. Each step: next = prev + curr; prev = curr; curr = next.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 1, color: "#E05A3A" },
          ],
        },
        {
          label: "Final answer: 13 ways",
          description:
            "After iterating from i=2 to i=6, curr holds the answer: 13. The algorithm used O(n) time and O(1) space. The sequence matches Fibonacci: 1,1,2,3,5,8,13.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 13, color: "#E05A3A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def climb_stairs(n: int) -> int:
    """
    Count distinct ways to climb n stairs taking 1 or 2 steps.

    Approach: bottom-up DP with O(1) space optimisation.
    Time:  O(n)
    Space: O(1)
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1

    # dp[i] = number of ways to reach stair i
    # Base cases
    prev = 1   # dp[0]
    curr = 1   # dp[1]

    for i in range(2, n + 1):
        # Recurrence: dp[i] = dp[i-1] + dp[i-2]
        nxt = prev + curr
        prev = curr
        curr = nxt

    return curr


# ── Tabulation version (explicit dp array) ──────────────────────────
def climb_stairs_table(n: int) -> int:
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]


# ── Quick test ───────────────────────────────────────────────────────
if __name__ == "__main__":
    expected = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
    for i, exp in enumerate(expected):
        result = climb_stairs(i)
        status = "OK" if result == exp else f"FAIL (got {result})"
        print(f"  n={i}: {result}  {status}")
`,
      annotations: [
        {
          lines: [1, 2, 3, 4, 5, 6, 7],
          note: "The function signature accepts n (the stair count) and returns an integer. The docstring documents time O(n) and space O(1) — these are the optimised bounds after eliminating the full dp array.",
        },
        {
          lines: [9, 10, 11, 12],
          note: "Guard clauses handle the degenerate cases: n=0 has no valid path (return 0) and n=1 has exactly one path (return 1). Without these, the loop would not execute and we would return the wrong value.",
        },
        {
          lines: [15, 16],
          note: "prev and curr hold dp[i-2] and dp[i-1] respectively. They are initialised to the two base cases dp[0]=1 and dp[1]=1. No array allocation is needed.",
        },
        {
          lines: [18, 19, 20, 21],
          note: "The loop applies the recurrence dp[i] = dp[i-1] + dp[i-2]. After computing nxt we slide the window forward: prev becomes curr, curr becomes nxt. This is the standard Fibonacci rolling update.",
        },
        {
          lines: [23],
          note: "After the loop, curr holds dp[n] — the answer. Because the loop runs exactly n-1 times and each iteration is O(1), total time is O(n).",
        },
        {
          lines: [27, 28, 29, 30, 31, 32, 33],
          note: "The tabulation variant stores all dp values explicitly. It is equivalent in correctness but uses O(n) space. Useful when you need to reconstruct all intermediate values, e.g. to print every distinct path count.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average case", value: "O(n)", color: "#2255CC" },
        { label: "Worst case", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "DP array (tabulation)", value: "O(n)", color: "#2255CC" },
        { label: "Rolling variables (optimised)", value: "O(1)", color: "#CEEB5A" },
        { label: "Recursive + memoisation", value: "O(n) stack", color: "#E05A3A" },
      ],
      notes: [
        "The naive recursive solution without memoisation runs in O(2^n) time because it recomputes overlapping sub-problems exponentially. Adding a memo cache brings it back to O(n).",
        "The closed-form Binet formula dp[n] = F(n+1) = (φ^(n+1) - ψ^(n+1)) / √5 computes the answer in O(1) arithmetic operations, but requires floating-point precision that breaks for large n.",
        "The iterative O(n) / O(1) solution is the canonical answer in interviews: simple, correct, and optimal in both time and space.",
      ],
    },
    variations: {
      items: [
        "k-step variant: allow steps of size 1, 2, …, k. The recurrence becomes dp[i] = dp[i-1] + dp[i-2] + … + dp[i-k]. Time stays O(n·k); with a sliding window sum it drops to O(n).",
        "Minimum cost climbing stairs (LeetCode 746): each stair has a cost. Minimise total cost to reach the top. Same recurrence but with a min instead of a sum: dp[i] = cost[i] + min(dp[i-1], dp[i-2]).",
        "Count paths with exactly m two-steps: combinatorial formulation. If you take m two-steps and (n-2m) one-steps, the number of orderings is C(n-m, m). Sum over valid m gives the total.",
        "Generalised tiling: count ways to tile a 1×n board with 1×1 and 1×2 tiles. Identical recurrence — a direct combinatorial interpretation of the stair problem.",
        "Modular arithmetic variant: return dp[n] mod 10^9+7. Common in competitive programming. Simply apply the modulo at each step to prevent integer overflow.",
      ],
      tips: [
        "Always handle the edge cases n=0 and n=1 explicitly before entering the loop — they are the base cases of the recurrence and the loop assumes n >= 2.",
        "When asked for the k-step generalisation in an interview, start with the 2-step solution and then show how it extends: replace dp[i] = dp[i-1] + dp[i-2] with a sum over the last k values.",
        "The Fibonacci connection is worth mentioning: dp[n] = F(n+1). This immediately tells you the answer grows exponentially (~1.618^n), which is why the closed-form overflows for large n.",
        "If you need to reconstruct an actual path (not just count), store the full dp array and backtrack: at each stair i, if dp[i-1] > 0 you could have come from i-1, etc.",
      ],
    },
    summary: {
      keyPoints: [
        "Climbing Stairs is the canonical beginner DP problem. The recurrence dp[i] = dp[i-1] + dp[i-2] with dp[0]=dp[1]=1 mirrors the Fibonacci sequence exactly.",
        "The key insight is optimal substructure: the number of ways to reach stair i depends only on the two preceding states, not on how you reached those states.",
        "The bottom-up tabulation approach fills the dp array left-to-right in O(n) time and O(n) space. A rolling-variable optimisation reduces space to O(1).",
        "The answer for n stairs equals the (n+1)-th Fibonacci number: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, … This closed-form insight is useful for sanity-checking your implementation.",
        "The naive recursive solution without memoisation is O(2^n) — exponential — because it solves the same sub-problems repeatedly. Always add memoisation or switch to bottom-up DP.",
        "This problem generalises naturally: allow k step sizes, add per-stair costs, require exactly m large steps, or work modulo a prime. All variants share the same DP skeleton.",
      ],
    },
  },
}

export default function ClimbingStairsVideo() {
  return <AlgoVideo config={config} />
}
