import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Unbounded Knapsack",
  subtitle: "Maximize value where each item can be taken unlimited times.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a knapsack of capacity W and a list of items each with a weight and value, maximize the total value you can carry.",
        "Unlike the 0/1 Knapsack, each item can be selected any number of times — there is no quantity limit per item.",
        "Example: W=8, items = [(w=2,v=3), (w=3,v=4), (w=4,v=5)]. Optimal: take item A four times → value = 12.",
        "The problem has optimal substructure: the best packing for capacity w depends on best packings for smaller capacities.",
        "This is a foundational DP problem that models real-world scenarios like cutting rods, making change, or portfolio allocation.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[w] as the maximum value achievable using exactly capacity w.",
        "For each capacity w from 1 to W, try every item i: if item fits (wᵢ ≤ w), update dp[w] = max(dp[w], dp[w - wᵢ] + vᵢ).",
        "Because items are reusable, we iterate capacity in the outer loop and items in the inner loop — this lets us reuse the same item multiple times in one pass.",
        "Base case: dp[0] = 0. An empty knapsack holds zero value.",
        "Each subproblem dp[w] is solved before it is needed by any larger capacity, guaranteeing correctness.",
      ],
      analogy:
        "Imagine you are filling a shopping bag of fixed weight limit. You can pick up the same item from the shelf as many times as you like. You work through every possible bag weight from lightest to heaviest, always choosing the item that adds the most value per remaining space.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize dp array of size W+1 = 9, all values set to 0. Items: A(w=2,v=3), B(w=3,v=4), C(w=4,v=5).",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "dp[1]: No item has weight ≤ 1. No update possible. dp[1] = 0.",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          colors: ["green", "blue", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: "dp[2]: Item A fits (w=2). dp[2-2]+3 = dp[0]+3 = 3. dp[2] = 3.",
          values: [0, 0, 3, 0, 0, 0, 0, 0, 0],
          colors: ["green", "gray", "blue", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "dp[3]: A→dp[1]+3=3, B→dp[0]+4=4. Max = 4. dp[3] = 4.",
          values: [0, 0, 3, 4, 0, 0, 0, 0, 0],
          colors: ["green", "gray", "blue", "blue", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "dp[4]: A→dp[2]+3=6, B→dp[1]+4=4, C→dp[0]+5=5. Max = 6. dp[4] = 6.",
          values: [0, 0, 3, 4, 6, 0, 0, 0, 0],
          colors: ["green", "gray", "blue", "blue", "blue", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description: "dp[5]: A→dp[3]+3=7, B→dp[2]+4=7, C→dp[1]+5=5. Max = 7. dp[5] = 7.",
          values: [0, 0, 3, 4, 6, 7, 0, 0, 0],
          colors: ["green", "gray", "blue", "blue", "blue", "blue", "gray", "gray", "gray"],
        },
        {
          step: 7,
          description: "dp[6]: A→dp[4]+3=9, B→dp[3]+4=8, C→dp[2]+5=8. Max = 9. dp[6] = 9.",
          values: [0, 0, 3, 4, 6, 7, 9, 0, 0],
          colors: ["green", "gray", "blue", "blue", "blue", "blue", "blue", "gray", "gray"],
        },
        {
          step: 8,
          description: "dp[7]: A→dp[5]+3=10, B→dp[4]+4=10, C→dp[3]+5=9. Max = 10. dp[7] = 10.",
          values: [0, 0, 3, 4, 6, 7, 9, 10, 0],
          colors: ["green", "gray", "blue", "blue", "blue", "blue", "blue", "blue", "gray"],
        },
        {
          step: 9,
          description: "dp[8]: A→dp[6]+3=12, B→dp[5]+4=11, C→dp[4]+5=11. Max = 12. dp[8] = 12.",
          values: [0, 0, 3, 4, 6, 7, 9, 10, 12],
          colors: ["green", "gray", "blue", "blue", "blue", "blue", "blue", "blue", "green"],
        },
        {
          step: 10,
          description: "Answer: dp[8] = 12. Trace back: dp[8]→dp[6]→dp[4]→dp[2]→dp[0], taking Item A four times.",
          values: [0, 0, 3, 4, 6, 7, 9, 10, 12],
          colors: ["yellow", "gray", "yellow", "gray", "yellow", "gray", "yellow", "gray", "yellow"],
        },
        {
          step: 11,
          description: "Optimal selection: 4 × Item A (weight 2, value 3 each) = total weight 8, total value 12.",
        },
        {
          step: 12,
          description: "If no item fits any capacity > 0, dp remains all zeros — the knapsack cannot be filled profitably.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def unbounded_knapsack(capacity: int, weights: list[int], values: list[int]) -> int:
    """
    Maximize total value with unlimited item reuse.
    capacity: knapsack weight limit W
    weights:  item weights [w0, w1, ...]
    values:   item values  [v0, v1, ...]
    Returns maximum value achievable.
    """
    n = len(weights)
    # dp[w] = max value achievable with exactly capacity w
    dp = [0] * (capacity + 1)

    for w in range(1, capacity + 1):
        for i in range(n):
            if weights[i] <= w:
                # Reuse item i: look back at dp[w - weights[i]]
                dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]


# Example usage
capacity = 8
weights = [2, 3, 4]
values  = [3, 4, 5]

result = unbounded_knapsack(capacity, weights, values)
print(f"Max value: {result}")  # Output: 12

# Reconstruct which items were chosen
def reconstruct(capacity, weights, values, dp):
    items_taken = []
    w = capacity
    while w > 0:
        for i in range(len(weights)):
            if weights[i] <= w and dp[w] == dp[w - weights[i]] + values[i]:
                items_taken.append(i)
                w -= weights[i]
                break
    return items_taken

dp = [0] * (capacity + 1)
for w in range(1, capacity + 1):
    for i in range(len(weights)):
        if weights[i] <= w:
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

print(reconstruct(capacity, weights, values, dp))  # [0, 0, 0, 0] → 4× item 0`,
      annotations: [
        {
          lines: [10, 11],
          note: "Initialize dp array of size W+1 with zeros. dp[0] = 0 is the base case — an empty knapsack has zero value.",
        },
        {
          lines: [13, 14],
          note: "Outer loop iterates over every capacity from 1 to W. This guarantees all smaller subproblems are solved first.",
        },
        {
          lines: [15, 16, 17, 18],
          note: "Inner loop tries every item. If the item fits (weight ≤ w), update dp[w] by considering reusing this item. The key: dp[w - weights[i]] already accounts for unlimited reuse.",
        },
        {
          lines: [20],
          note: "Return dp[capacity] — the maximum value for the full knapsack. Time: O(W × n), Space: O(W).",
        },
        {
          lines: [33, 34, 35, 36, 37, 38, 39],
          note: "Reconstruction traces back through the dp array. At each capacity, find which item was responsible for the optimal value and subtract its weight.",
        },
        {
          lines: [41, 42, 43, 44],
          note: "Rebuild dp for reconstruction (or pass it in). The reconstruction loop runs in O(W) time after dp is computed.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(W \\times n)",
          note: "Even if the first item always wins, every (w, item) pair is still evaluated.",
        },
        {
          case: "Average",
          notation: "O(W \\times n)",
          note: "Standard bottom-up DP: W capacities × n items per capacity.",
        },
        {
          case: "Worst",
          notation: "O(W \\times n)",
          note: "No pruning possible in the general case — all cells must be computed.",
        },
      ],
      space: [
        {
          case: "DP Array",
          notation: "O(W)",
          note: "A single 1-D array of size W+1 is sufficient because each dp[w] depends only on smaller indices.",
        },
        {
          case: "Input",
          notation: "O(n)",
          note: "Storage for n item weights and values.",
        },
      ],
      insights: [
        "The 1-D DP formulation works because we iterate capacity in ascending order, so dp[w - wᵢ] is already the optimal value for smaller capacity — enabling unlimited reuse naturally.",
        "Compared to 0/1 Knapsack (which needs a 2-D table or reverse iteration), Unbounded Knapsack is simpler: a single forward pass over capacity suffices.",
        "For very large W with small n, the bottleneck is W. For large n with small W, the bottleneck is n. Both factors are polynomial and tractable.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "0/1 Knapsack",
          description: "Each item can be taken at most once. Requires iterating capacity in reverse (or using a 2-D table) to prevent reuse within the same pass.",
        },
        {
          name: "Bounded Knapsack",
          description: "Each item i has a maximum quantity limit kᵢ. Can be solved by binary decomposition of quantities or a monotone deque optimization for O(W × n) time.",
        },
        {
          name: "Coin Change (Minimum Coins)",
          description: "Special case of Unbounded Knapsack where all values are 1 and weights are coin denominations. Goal is to minimize count instead of maximize value.",
        },
        {
          name: "Rod Cutting",
          description: "Cut a rod of length n into pieces with given prices per length. Identical structure — length is the capacity, piece lengths are weights, prices are values.",
        },
        {
          name: "Integer Partition / Combination Sum",
          description: "Count the number of ways to fill exactly capacity W. Replace max with sum in the recurrence: dp[w] += dp[w - wᵢ].",
        },
      ],
      tips: [
        "Always iterate capacity in ascending order for unbounded knapsack — this is what enables item reuse without an extra dimension.",
        "To reconstruct the chosen items, store a separate parent array tracking which item updated each dp[w], then trace back from dp[W].",
        "When item weights are large relative to W, many inner-loop iterations are skipped (weight check fails) — the effective runtime can be much less than O(W × n) in practice.",
        "For fractional items (where you can take partial quantities), use a greedy approach by value-to-weight ratio — DP is not needed.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Unbounded Knapsack maximizes total value within a weight limit when each item can be selected any number of times.",
        "The 1-D DP recurrence dp[w] = max(dp[w - wᵢ] + vᵢ) for all items i captures optimal substructure and unlimited reuse.",
        "Ascending iteration over capacity is the key insight: dp[w - wᵢ] already reflects reuse of item i in the current pass.",
        "Time complexity is O(W × n) and space is O(W) — both polynomial, making this approach practical for large inputs.",
        "The same pattern generalizes to rod cutting, coin change, combination sum, and many other combinatorial optimization problems.",
        "For reconstruction, trace back through the dp array: at each capacity, find the item whose inclusion produced the optimal value.",
      ],
    },
  },
};

export default function KnapsackUnboundedVideo() {
  return <AlgoVideo config={config} />;
}
