import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Coin Change",
  subtitle: "Find minimum number of coins needed to make up a given amount.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an array of coin denominations and a target amount, find the minimum number of coins needed to make up that amount.",
        "You have an unlimited supply of each coin denomination.",
        "If it is impossible to make up the amount with the given coins, return -1.",
        "Example: coins = [1, 3, 4], amount = 6 → answer is 2 (coins 3 + 3).",
        "This is a classic unbounded knapsack-style problem solved efficiently with dynamic programming.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of dp[i] as the minimum coins needed to make exactly amount i.",
        "For each amount i, try every coin c: if c ≤ i, then dp[i] = min(dp[i], dp[i - c] + 1).",
        "Base case: dp[0] = 0 because zero coins are needed to make amount 0.",
        "Build the solution bottom-up from 0 to the target amount.",
        "Each subproblem (smaller amount) is solved before it is needed by a larger amount.",
      ],
      analogy:
        "Imagine you are making change at a cash register. You start from zero and figure out the fewest coins to reach each value up to the target — just like counting up on an abacus one step at a time.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize dp array of size amount + 1, fill with Infinity.",
          values: [0, "∞", "∞", "∞", "∞", "∞", "∞"],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "Set dp[0] = 0. Zero coins are needed to reach amount 0.",
          values: [0, "∞", "∞", "∞", "∞", "∞", "∞"],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: "Compute dp[1]. Only coin 1 applies: dp[1] = dp[0] + 1 = 1.",
          values: [0, 1, "∞", "∞", "∞", "∞", "∞"],
          colors: ["green", "blue", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "Compute dp[2]. Coin 1 applies: dp[2] = dp[1] + 1 = 2.",
          values: [0, 1, 2, "∞", "∞", "∞", "∞"],
          colors: ["green", "blue", "blue", "gray", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "Compute dp[3]. Coin 1: dp[2]+1=3. Coin 3: dp[0]+1=1. Min = 1.",
          values: [0, 1, 2, 1, "∞", "∞", "∞"],
          colors: ["green", "blue", "blue", "blue", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description: "Compute dp[4]. Coin 1: dp[3]+1=2. Coin 3: dp[1]+1=2. Coin 4: dp[0]+1=1. Min = 1.",
          values: [0, 1, 2, 1, 1, "∞", "∞"],
          colors: ["green", "blue", "blue", "blue", "blue", "gray", "gray"],
        },
        {
          step: 7,
          description: "Compute dp[5]. Coin 1: dp[4]+1=2. Coin 3: dp[2]+1=3. Coin 4: dp[1]+1=2. Min = 2.",
          values: [0, 1, 2, 1, 1, 2, "∞"],
          colors: ["green", "blue", "blue", "blue", "blue", "blue", "gray"],
        },
        {
          step: 8,
          description: "Compute dp[6]. Coin 1: dp[5]+1=3. Coin 3: dp[3]+1=2. Coin 4: dp[2]+1=3. Min = 2.",
          values: [0, 1, 2, 1, 1, 2, 2],
          colors: ["green", "blue", "blue", "blue", "blue", "blue", "green"],
        },
        {
          step: 9,
          description: "dp[6] = 2. The optimal solution uses two coins of denomination 3.",
          values: [0, 1, 2, 1, 1, 2, 2],
          colors: ["green", "blue", "blue", "blue", "blue", "blue", "yellow"],
        },
        {
          step: 10,
          description: "If dp[amount] is still Infinity after filling, return -1 (impossible).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def coin_change(coins: list[int], amount: int) -> int:
    # dp[i] = minimum coins needed to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # base case: 0 coins needed for amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                # Try using this coin and take the minimum
                dp[i] = min(dp[i], dp[i - coin] + 1)

    # If dp[amount] is still inf, it's impossible
    return dp[amount] if dp[amount] != float('inf') else -1


# Example usage
coins = [1, 3, 4]
amount = 6
result = coin_change(coins, amount)
print(f"Minimum coins for amount {amount}: {result}")  # Output: 2

# Edge cases
print(coin_change([2], 3))   # -1 (impossible)
print(coin_change([1], 0))   # 0  (base case)
print(coin_change([1, 2, 5], 11))  # 3 (5 + 5 + 1)`,
      annotations: [
        {
          lines: [2, 3],
          note: "Initialize dp array with infinity. dp[0] = 0 is the essential base case — no coins needed for amount zero.",
        },
        {
          lines: [5, 6],
          note: "Outer loop iterates over every amount from 1 to the target. Each cell depends only on previously computed cells.",
        },
        {
          lines: [7, 8, 9],
          note: "Inner loop tries every coin. If the coin fits (coin ≤ i), update dp[i] by taking the minimum of the current value and dp[i - coin] + 1.",
        },
        {
          lines: [12],
          note: "After filling, if dp[amount] is still infinity, no combination of coins can form the amount — return -1.",
        },
        {
          lines: [15, 16],
          note: "Time complexity is O(amount × |coins|). Space complexity is O(amount) for the dp array.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        { case: "Best", notation: "O(amount × |coins|)", note: "Even in the best case all subproblems are visited." },
        { case: "Average", notation: "O(amount × |coins|)", note: "Standard bottom-up DP traversal." },
        { case: "Worst", notation: "O(amount × |coins|)", note: "All cells computed regardless of coin values." },
      ],
      space: [
        { case: "DP Array", notation: "O(amount)", note: "Single 1-D array of size amount + 1." },
        { case: "Input", notation: "O(|coins|)", note: "Coins array storage, usually negligible." },
      ],
      insights: [
        "The time complexity scales linearly with the target amount and the number of coin types — both factors matter.",
        "Space can be reduced no further than O(amount) because every past subproblem answer may be needed.",
        "Compared to naive recursion (exponential), DP gives a dramatic speedup by memoizing overlapping subproblems.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Coin Change II (Count Ways)",
          description: "Instead of the minimum number of coins, count the total number of distinct combinations that sum to the amount. Uses a similar DP table but accumulates counts instead of minimums.",
        },
        {
          name: "Unbounded Knapsack",
          description: "Generalization where each item has a weight and value. Coin change is the special case where all values are 1 and weights are coin denominations.",
        },
        {
          name: "Perfect Squares",
          description: "Find the minimum number of perfect square numbers that sum to n. Identical structure — replace coins with [1, 4, 9, 16, ...].",
        },
        {
          name: "Minimum Cost to Reach Target",
          description: "A broader class of problems where you move from state 0 to state n with unit-cost transitions of varying sizes — coin change is the canonical instance.",
        },
        {
          name: "Top-Down Memoization Variant",
          description: "Solve the same problem recursively with a memo dictionary. Useful when only a sparse subset of amounts is actually queried.",
        },
      ],
      tips: [
        "Always handle the impossible case: if dp[amount] remains infinity, return -1, not infinity.",
        "Sorting coins in descending order does not change correctness but can improve cache locality in practice.",
        "For very large amounts with small coin sets, the bottom-up DP is almost always faster than memoized recursion due to lower overhead.",
        "Reconstruct the actual coins used by storing which coin led to each dp[i] minimum in a separate parent array.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Coin Change is a classic unbounded DP problem: each coin can be used any number of times.",
        "Define dp[i] as the minimum coins to reach amount i; build it bottom-up from dp[0] = 0.",
        "The recurrence dp[i] = min(dp[i - c] + 1) for each valid coin c captures the optimal substructure.",
        "Time complexity is O(amount × |coins|) and space is O(amount) — both polynomial and tractable.",
        "If dp[amount] remains infinity after the fill, the amount is unreachable with the given coins.",
        "The same DP pattern extends to dozens of related problems: perfect squares, jump game, word break, and more.",
      ],
    },
  },
};

export default function CoinChangeVideo() {
  return <AlgoVideo config={config} />;
}
