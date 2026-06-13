import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Fibonacci",
  subtitle: "Bottom-up DP filling a dp array from index 0 to n.",
  category: "dynamic-programming",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is the Fibonacci Problem?",
      bullets: [
        "Given a non-negative integer n, compute the n-th Fibonacci number.",
        "The sequence is defined as F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n ≥ 2.",
        "The sequence grows as: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, …",
        "Naive recursive solution has exponential time O(2ⁿ) due to repeated subproblem computation.",
        "Dynamic programming eliminates redundancy by storing previously computed values in a dp array.",
      ],
    },

    intuition: {
      heading: "Why Bottom-up DP Works",
      bullets: [
        "Every Fibonacci number depends only on the two numbers that came before it.",
        "If we compute from the smallest subproblems upward, each answer is ready when needed.",
        "We fill a dp array left-to-right: dp[i] = dp[i-1] + dp[i-2].",
        "No recursion stack overhead — the loop is simple and cache-friendly.",
        "An even leaner variant keeps only two variables (prev, curr), reducing space to O(1).",
      ],
      analogy:
        "Think of climbing stairs where each step can only be reached from the two steps below it. " +
        "Instead of jumping back to the ground every time to recount, you mark each step as you pass it — " +
        "so by the time you reach step n, all prior steps are already counted.",
    },

    walkthrough: {
      heading: "Step-by-step Walkthrough  (n = 7)",
      steps: [
        {
          step: 1,
          description: "Allocate dp array of size n+1 = 8, initialised to 0.",
          arrayState: {
            values: [0, 0, 0, 0, 0, 0, 0, 0],
            colors: ["grey", "grey", "grey", "grey", "grey", "grey", "grey", "grey"],
          },
        },
        {
          step: 2,
          description: "Set base case dp[0] = 0 (the 0th Fibonacci number is 0).",
          arrayState: {
            values: [0, 0, 0, 0, 0, 0, 0, 0],
            colors: ["yellow", "grey", "grey", "grey", "grey", "grey", "grey", "grey"],
          },
        },
        {
          step: 3,
          description: "Set base case dp[1] = 1 (the 1st Fibonacci number is 1).",
          arrayState: {
            values: [0, 1, 0, 0, 0, 0, 0, 0],
            colors: ["green", "yellow", "grey", "grey", "grey", "grey", "grey", "grey"],
          },
        },
        {
          step: 4,
          description: "i=2: dp[2] = dp[1] + dp[0] = 1 + 0 = 1.",
          arrayState: {
            values: [0, 1, 1, 0, 0, 0, 0, 0],
            colors: ["green", "blue", "yellow", "grey", "grey", "grey", "grey", "grey"],
          },
        },
        {
          step: 5,
          description: "i=3: dp[3] = dp[2] + dp[1] = 1 + 1 = 2.",
          arrayState: {
            values: [0, 1, 1, 2, 0, 0, 0, 0],
            colors: ["green", "blue", "blue", "yellow", "grey", "grey", "grey", "grey"],
          },
        },
        {
          step: 6,
          description: "i=4: dp[4] = dp[3] + dp[2] = 2 + 1 = 3.",
          arrayState: {
            values: [0, 1, 1, 2, 3, 0, 0, 0],
            colors: ["green", "green", "blue", "blue", "yellow", "grey", "grey", "grey"],
          },
        },
        {
          step: 7,
          description: "i=5: dp[5] = dp[4] + dp[3] = 3 + 2 = 5.",
          arrayState: {
            values: [0, 1, 1, 2, 3, 5, 0, 0],
            colors: ["green", "green", "green", "blue", "blue", "yellow", "grey", "grey"],
          },
        },
        {
          step: 8,
          description: "i=6: dp[6] = dp[5] + dp[4] = 5 + 3 = 8.",
          arrayState: {
            values: [0, 1, 1, 2, 3, 5, 8, 0],
            colors: ["green", "green", "green", "green", "blue", "blue", "yellow", "grey"],
          },
        },
        {
          step: 9,
          description: "i=7: dp[7] = dp[6] + dp[5] = 8 + 5 = 13.",
          arrayState: {
            values: [0, 1, 1, 2, 3, 5, 8, 13],
            colors: ["green", "green", "green", "green", "green", "blue", "blue", "gold"],
          },
        },
        {
          step: 10,
          description: "Return dp[7] = 13. The 7th Fibonacci number is 13.",
          arrayState: {
            values: [0, 1, 1, 2, 3, 5, 8, 13],
            colors: ["green", "green", "green", "green", "green", "green", "green", "gold"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def fibonacci_dp(n: int) -> int:
    \"\"\"
    Bottom-up DP approach to compute the n-th Fibonacci number.
    Time:  O(n)
    Space: O(n)  — use the optimised version below for O(1)
    \"\"\"
    if n < 0:
        raise ValueError("n must be non-negative")
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0          # base case
    dp[1] = 1          # base case

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


def fibonacci_optimised(n: int) -> int:
    \"\"\"Space-optimised variant — only two variables needed.\"\"\"
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
`,
      annotations: [
        {
          lines: [8, 9],
          note: "Guard clauses handle the edge cases n < 0 and n ≤ 1 before any allocation.",
        },
        {
          lines: [11],
          note: "Allocate the dp table with n+1 slots so indices 0..n are all valid.",
        },
        {
          lines: [12, 13],
          note: "Seed the two base cases that every subsequent value depends on.",
        },
        {
          lines: [15, 16],
          note: "Core loop: each dp[i] is computed in O(1) using the two previously stored values.",
        },
        {
          lines: [18],
          note: "Return the final answer stored at dp[n].",
        },
        {
          lines: [22, 23, 24, 25],
          note: "Space-optimised variant: rolling two variables replaces the full dp array, reducing space to O(1).",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best case",  value: "O(n)", note: "Even for n=0 the function returns immediately — but the loop always runs n-1 iterations for n≥2." },
        { label: "Average",    value: "O(n)", note: "Single linear pass through indices 2..n." },
        { label: "Worst case", value: "O(n)", note: "No branching; every element is visited exactly once." },
      ],
      spaceRows: [
        { label: "dp array variant",    value: "O(n)", note: "Stores all n+1 Fibonacci values." },
        { label: "Rolling-var variant", value: "O(1)", note: "Only prev and curr are kept at any time." },
      ],
      insights: [
        "Bottom-up DP converts the exponential O(2ⁿ) naive recursion into a linear O(n) algorithm by trading memory for time.",
        "The rolling-variable optimisation shows that when only the last two values matter, the full table is unnecessary.",
        "For very large n, arbitrary-precision integers dominate the cost — each addition is O(digits), making the true complexity O(n · M(n)) where M(n) is the integer multiplication cost.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Memoised (top-down) DP",
          description: "Recursive implementation with a cache dictionary. Same O(n) time, but uses the call stack and is slightly slower in practice.",
        },
        {
          name: "Matrix Exponentiation",
          description: "Computes F(n) in O(log n) time by raising the 2×2 Fibonacci matrix to the (n-1)-th power via fast exponentiation.",
        },
        {
          name: "Climbing Stairs (LeetCode 70)",
          description: "Exactly the Fibonacci recurrence: ways(n) = ways(n-1) + ways(n-2). A direct application of the same DP.",
        },
        {
          name: "Tribonacci / k-bonacci",
          description: "Generalises Fibonacci to F(n) = F(n-1) + F(n-2) + F(n-3). The same bottom-up pattern extends trivially.",
        },
        {
          name: "Fibonacci modulo M",
          description: "For cryptography or competitive programming, compute F(n) mod M. The Pisano period allows answers for astronomically large n.",
        },
      ],
      tips: [
        "Always handle the n ≤ 1 base cases explicitly before entering the loop to avoid off-by-one errors.",
        "Prefer the rolling-variable variant in production code — it uses constant memory and is cache-friendlier.",
        "When n can be up to 10⁶ or more, profile integer size: Python's big integers are slower than fixed-width C integers.",
        "For repeated queries with different n values, build the dp array once up to the maximum n and answer all queries in O(1).",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Bottom-up DP solves Fibonacci in O(n) time by filling a dp array from the smallest subproblem upward.",
        "The recurrence dp[i] = dp[i-1] + dp[i-2] with base cases dp[0]=0, dp[1]=1 is the entire algorithm.",
        "Space can be reduced from O(n) to O(1) by keeping only the last two computed values.",
        "This problem is the canonical introduction to dynamic programming: optimal substructure + overlapping subproblems.",
        "Matrix exponentiation extends the idea to O(log n) when n is extremely large.",
        "Recognising the same recurrence in disguise (e.g., Climbing Stairs) is a key competitive-programming skill.",
      ],
    },
  },
};

export default function FibonacciVideo() {
  return <AlgoVideo config={config} />;
}
