import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "0/1 Knapsack",
  subtitle: "Maximize value in a knapsack where each item can be taken at most once.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given n items each with a weight and a value, and a knapsack with a fixed weight capacity W, select a subset of items to maximize total value.",
        "The '0/1' constraint means each item can be either taken (1) or left behind (0) — you cannot take a fraction of an item.",
        "The total weight of selected items must not exceed the knapsack capacity W.",
        "Example: items = [{w:2,v:3},{w:3,v:4},{w:4,v:5},{w:5,v:6}], W=8 → optimal value is 10 (items 1+3 or 1+2).",
        "This is NP-hard in general but solvable in pseudo-polynomial time O(n·W) using dynamic programming.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[i][w] as the maximum value achievable using the first i items with weight capacity w.",
        "For each item i, you face a binary choice: skip it (dp[i-1][w]) or take it (dp[i-1][w-wt[i]] + val[i]) — pick the max.",
        "Taking item i is only valid when its weight wt[i] does not exceed the current capacity w.",
        "Build the solution bottom-up: each cell depends only on the row above, so the table fills left-to-right, top-to-bottom.",
        "The final answer lives in dp[n][W] — the maximum value using all n items with full capacity W.",
      ],
      analogy:
        "Imagine packing a hiking backpack with a strict weight limit. You lay out all your gear and decide one item at a time: 'If I had this much room left, is it worth packing this item or not?' You systematically work through every item for every possible remaining capacity, recording the best outcome — exactly like filling the DP table row by row.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Define items: item1(w=2,v=3), item2(w=3,v=4), item3(w=4,v=5), item4(w=5,v=6). Capacity W=8. Create a (n+1)×(W+1) DP table initialized to 0.",
        },
        {
          step: 2,
          description:
            "Base case: dp[0][w] = 0 for all w. With zero items available, no value can be collected regardless of capacity.",
          values: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          colors: ["green", "green", "green", "green", "green", "green", "green", "green", "green"],
        },
        {
          step: 3,
          description:
            "Process item1 (w=2, v=3). For w<2 we cannot take it: dp[1][0]=0, dp[1][1]=0. For w≥2 we can take it: dp[1][2]=max(0, 0+3)=3.",
          values: [0, 0, 3, 3, 3, 3, 3, 3, 3],
          colors: ["green", "gray", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 4,
          description:
            "Process item2 (w=3, v=4). For w<3 carry forward row above. For w=3: max(dp[1][3]=3, dp[1][0]+4=4)=4. For w=5: max(3, dp[1][2]+4=7)=7.",
          values: [0, 0, 3, 4, 4, 7, 7, 7, 7],
          colors: ["green", "gray", "gray", "blue", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 5,
          description:
            "Process item3 (w=4, v=5). For w=4: max(dp[2][4]=4, dp[2][0]+5=5)=5. For w=7: max(dp[2][7]=7, dp[2][3]+5=9)=9.",
          values: [0, 0, 3, 4, 5, 7, 8, 9, 9],
          colors: ["green", "gray", "gray", "gray", "blue", "blue", "blue", "blue", "blue"],
        },
        {
          step: 6,
          description:
            "Process item4 (w=5, v=6). For w=5: max(dp[3][5]=7, dp[3][0]+6=6)=7. For w=8: max(dp[3][8]=9, dp[3][3]+6=10)=10.",
          values: [0, 0, 3, 4, 5, 7, 8, 9, 10],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "yellow"],
        },
        {
          step: 7,
          description:
            "dp[4][8] = 10 is the optimal value. Now trace back to find which items were selected.",
        },
        {
          step: 8,
          description:
            "Traceback step 1: dp[4][8]=10 ≠ dp[3][8]=9, so item4 was NOT taken (since taking it would give dp[3][3]+6=10 — actually equal, so item4 IS taken). w becomes 8-5=3.",
        },
        {
          step: 9,
          description:
            "Traceback step 2: dp[3][3]=4 = dp[2][3]=4, so item3 was skipped. dp[2][3]=4 ≠ dp[1][3]=3, so item2 was taken. w becomes 3-3=0.",
        },
        {
          step: 10,
          description:
            "Traceback step 3: dp[1][0]=0 = dp[0][0]=0, so item1 was skipped. Selected items: item2(w=3,v=4) + item4(w=5,v=6) = total weight 8, total value 10.",
        },
        {
          step: 11,
          description:
            "Space optimization: since each row depends only on the row above, we can use a single 1-D dp array and iterate capacity in reverse to avoid overwriting values we still need.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def knapsack_01(weights: list[int], values: list[int], capacity: int) -> int:
    """
    0/1 Knapsack — space-optimized O(W) DP.
    Returns the maximum value achievable within the given capacity.
    """
    n = len(weights)
    # 1-D dp array; dp[w] = best value with capacity w
    dp = [0] * (capacity + 1)

    for i in range(n):
        wt = weights[i]
        val = values[i]
        # Iterate capacity in reverse to prevent reusing item i
        for w in range(capacity, wt - 1, -1):
            dp[w] = max(dp[w], dp[w - wt] + val)

    return dp[capacity]


def knapsack_01_with_items(
    weights: list[int], values: list[int], capacity: int
) -> tuple[int, list[int]]:
    """Returns (max_value, list_of_selected_indices) via full 2-D table."""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(capacity + 1):
            dp[i][w] = dp[i - 1][w]
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])

    # Traceback
    selected = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected.append(i - 1)
            w -= weights[i - 1]

    return dp[n][capacity], selected[::-1]


# Example
weights = [2, 3, 4, 5]
values  = [3, 4, 5, 6]
W = 8
print(knapsack_01(weights, values, W))            # 10
print(knapsack_01_with_items(weights, values, W)) # (10, [1, 3])`,
      annotations: [
        {
          lines: [7],
          note: "1-D dp array of size W+1, initialized to 0. dp[w] stores the best value achievable with exactly w units of capacity available.",
        },
        {
          lines: [9, 10, 11],
          note: "Outer loop iterates over each item once. We extract the item's weight and value for clarity.",
        },
        {
          lines: [13, 14],
          note: "CRITICAL: iterate capacity in reverse (W down to wt). This ensures dp[w - wt] still refers to the state BEFORE item i was considered, enforcing the 0/1 constraint.",
        },
        {
          lines: [25, 26, 27, 28],
          note: "Full 2-D table version: dp[i][w] = max(skip item i, take item i). The take branch is only valid when weights[i-1] ≤ w.",
        },
        {
          lines: [31, 32, 33, 34, 35],
          note: "Traceback: walk backwards through the table. If dp[i][w] changed from dp[i-1][w], item i was selected. Reduce remaining capacity by its weight.",
        },
        {
          lines: [40, 41],
          note: "Time complexity O(n·W), space O(W) for the optimized version or O(n·W) for the full table with traceback.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n·W)",
          note: "Every cell of the DP table must be computed — no early exit is possible.",
        },
        {
          case: "Average",
          notation: "O(n·W)",
          note: "Standard bottom-up traversal: n items × W+1 capacity values.",
        },
        {
          case: "Worst",
          notation: "O(n·W)",
          note: "All n items have weight 1, so every cell is updated — still O(n·W).",
        },
      ],
      space: [
        {
          case: "Full 2-D Table",
          notation: "O(n·W)",
          note: "Stores the complete dp[n+1][W+1] table, required if item traceback is needed.",
        },
        {
          case: "1-D Optimized",
          notation: "O(W)",
          note: "Only one row is kept at a time. Traceback requires re-running or storing choices separately.",
        },
      ],
      insights: [
        "The algorithm is pseudo-polynomial: polynomial in the numeric value of W, not in the bit-length of W. For large W this can be slow.",
        "The 0/1 constraint (reverse iteration) is the key difference from the unbounded knapsack (forward iteration). Getting this wrong silently produces incorrect results.",
        "For fractional knapsack (items can be split), a greedy approach by value/weight ratio achieves O(n log n) — DP is not needed.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Unbounded Knapsack",
          description:
            "Each item can be used any number of times. Change the inner loop to iterate capacity forward (low to high) instead of reverse. Classic application: coin change with values.",
        },
        {
          name: "Bounded Knapsack",
          description:
            "Each item i has a maximum count limit c[i]. Decompose each item into binary groups (1, 2, 4, …) to reduce to 0/1 knapsack in O(n log c · W) time.",
        },
        {
          name: "Subset Sum",
          description:
            "Special case where all values equal 1 and you ask whether a subset sums to exactly W. The DP table becomes boolean, solving the classic NP-complete decision problem.",
        },
        {
          name: "Partition Equal Subset Sum",
          description:
            "Determine if an array can be split into two subsets with equal sum. Reduce to subset sum with target = totalSum / 2 — a direct 0/1 knapsack application.",
        },
        {
          name: "2-D Knapsack (Two Constraints)",
          description:
            "Items have two resource dimensions (e.g., weight and volume). Extend the DP table to dp[i][w][v], increasing time and space to O(n·W·V).",
        },
      ],
      tips: [
        "Always iterate capacity in reverse for 0/1 knapsack with a 1-D array. Forward iteration silently gives unbounded knapsack results.",
        "For traceback with the 1-D approach, store a boolean keep[i][w] array during the fill phase to avoid recomputing the full 2-D table.",
        "When W is very large but n is small, consider a meet-in-the-middle approach splitting items into two halves for O(2^(n/2) · log) complexity.",
        "Normalize weights by their GCD before running DP — this can dramatically reduce effective W and speed up the algorithm.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "0/1 Knapsack is the canonical DP problem demonstrating optimal substructure: the best solution for n items and capacity W is built from solutions to smaller subproblems.",
        "The recurrence dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i]) captures the binary choice of skipping or taking each item.",
        "The reverse-iteration trick in the 1-D optimization is the defining difference from unbounded knapsack — it prevents an item from being counted more than once.",
        "Time complexity is O(n·W) and space is O(W) with the optimized approach — pseudo-polynomial and practical for moderate W.",
        "Traceback through the 2-D table reveals exactly which items were selected, not just the optimal value.",
        "The same DP pattern underlies dozens of problems: subset sum, partition, bounded knapsack, and multi-dimensional resource allocation.",
      ],
    },
  },
};

export default function Knapsack01Video() {
  return <AlgoVideo config={config} />;
}
