import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Fractional Knapsack",
  subtitle: "Maximize knapsack value by taking fractions of items, prioritized by value/weight ratio.",
  category: "greedy",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What is the Fractional Knapsack Problem?",
      bullets: [
        "Given a knapsack with a fixed weight capacity W and a set of n items, each with a weight and a value, find the maximum value you can carry.",
        "Unlike the 0/1 Knapsack problem, you are allowed to take any fraction of an item — you don't have to take it whole or leave it entirely.",
        "The objective is to select items (or portions of items) such that the total weight does not exceed W and the total value is maximized.",
        "This relaxation (allowing fractions) makes the problem solvable with a simple greedy approach rather than dynamic programming.",
        "Real-world examples include filling a truck with divisible cargo, allocating a budget across investments, or portioning bulk goods at a market.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "The key insight is to think in terms of value density: value per unit of weight ($/kg). Higher density items give more value for every kilogram you load.",
        "Always load the highest-density item first. When it's fully loaded, move to the next best, and so on.",
        "If the last item doesn't fit entirely, take as much of it as the remaining capacity allows — a fraction is always better than nothing.",
        "This greedy choice is globally optimal because items are divisible: you can always substitute a low-density fraction with a high-density fraction to improve the total value.",
        "The exchange argument proves optimality: any solution that deviates from the greedy order can be improved by swapping fractions, contradicting its assumed optimality.",
      ],
      analogy:
        "Imagine you're at a gold market with a bag that holds exactly 50 kg. Three merchants offer: pure gold dust at $6/kg, silver coins at $5/kg, and copper bars at $4/kg. You'd fill your bag with gold dust first, then silver coins, then as much copper as fits. That's exactly what Fractional Knapsack does — always pick the most valuable material per kilogram.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start with three items: A (weight=10, value=60), B (weight=20, value=100), C (weight=30, value=120). Knapsack capacity = 50 kg.",
          array: {
            values: [60, 100, 120],
            colors: ["white", "white", "white"],
          },
        },
        {
          step: 2,
          description:
            "Compute value/weight ratio for each item. Item A: 60/10 = 6.0 $/kg. Item B: 100/20 = 5.0 $/kg. Item C: 120/30 = 4.0 $/kg.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["yellow", "yellow", "yellow"],
          },
        },
        {
          step: 3,
          description:
            "Sort items by ratio in descending order: A (6.0) → B (5.0) → C (4.0). This is the greedy priority order.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["blue", "green", "orange"],
          },
        },
        {
          step: 4,
          description:
            "Initialize: remaining capacity = 50, total value = 0. Begin filling with Item A (highest ratio).",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["yellow", "white", "white"],
          },
        },
        {
          step: 5,
          description:
            "Item A weighs 10 kg ≤ 50 remaining. Take all of it. Value += 60. Remaining capacity = 50 - 10 = 40 kg.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["green", "yellow", "white"],
          },
        },
        {
          step: 6,
          description:
            "Item B weighs 20 kg ≤ 40 remaining. Take all of it. Value += 100. Remaining capacity = 40 - 20 = 20 kg.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["green", "green", "yellow"],
          },
        },
        {
          step: 7,
          description:
            "Item C weighs 30 kg > 20 remaining. Take only a fraction: 20/30 = 2/3 of item C. Value += 120 × (2/3) = 80.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["green", "green", "orange"],
          },
        },
        {
          step: 8,
          description: "Knapsack is now full (0 kg remaining). Stop processing items.",
          array: {
            values: [6.0, 5.0, 4.0],
            colors: ["green", "green", "green"],
          },
        },
        {
          step: 9,
          description: "Total value = 60 + 100 + 80 = 240 $. This is the maximum achievable value for capacity 50 kg.",
          array: {
            values: [60, 100, 80],
            colors: ["green", "green", "green"],
          },
        },
        {
          step: 10,
          description:
            "Summary: took 100% of A, 100% of B, 66.7% of C. The greedy ratio-based strategy guarantees the global optimum for the fractional knapsack.",
          array: {
            values: [100, 100, 67],
            colors: ["green", "green", "green"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `from typing import List, Tuple


def fractional_knapsack(
    capacity: float,
    items: List[Tuple[float, float]],  # (weight, value)
) -> float:
    """
    Solve the Fractional Knapsack problem greedily.

    Args:
        capacity: Maximum weight the knapsack can hold.
        items:    List of (weight, value) tuples.

    Returns:
        Maximum total value achievable within the capacity.
    """
    # Step 1: compute (ratio, weight, value) and sort descending by ratio
    ranked = sorted(
        [(v / w, w, v) for w, v in items if w > 0],
        key=lambda x: x[0],
        reverse=True,
    )

    total_value = 0.0
    remaining = capacity

    # Step 2: greedily fill the knapsack
    for ratio, weight, value in ranked:
        if remaining <= 0:
            break
        if weight <= remaining:
            # Take the whole item
            total_value += value
            remaining -= weight
        else:
            # Take only the fraction that fits
            fraction = remaining / weight
            total_value += fraction * value
            remaining = 0

    return total_value


# Example usage
if __name__ == "__main__":
    items = [(10, 60), (20, 100), (30, 120)]  # (weight, value)
    capacity = 50
    result = fractional_knapsack(capacity, items)
    print(f"Maximum value: {result}")  # 240.0
`,
      annotations: [
        {
          lines: [1, 2],
          note: "Standard library imports only — no external dependencies needed for this algorithm.",
        },
        {
          lines: [18, 19, 20, 21],
          note: "Compute value/weight ratio for every item and sort descending. This single sort is the O(n log n) step that dominates the runtime.",
        },
        {
          lines: [26, 27, 28],
          note: "Iterate in ratio order. Break early once remaining capacity hits zero — no need to examine cheaper items.",
        },
        {
          lines: [29, 30, 31, 32],
          note: "If the item fits entirely, take it whole and subtract its weight from the remaining capacity.",
        },
        {
          lines: [33, 34, 35, 36, 37],
          note: "When the item is too heavy, take only the fraction that fills the remaining space. Value scales linearly with fraction taken.",
        },
        {
          lines: [39],
          note: "Return the accumulated float value — fractions mean the result may not be an integer even when all inputs are integers.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n log n)",
          explanation:
            "Dominated by sorting. Even if the first item fills the knapsack, sorting all n items is still required.",
        },
        {
          case: "Average",
          notation: "O(n log n)",
          explanation:
            "Sorting n items takes O(n log n). The greedy fill loop is O(n) in the worst case, so sorting dominates.",
        },
        {
          case: "Worst",
          notation: "O(n log n)",
          explanation:
            "Worst case is the same as average — all items must be sorted and potentially all items are partially selected.",
        },
      ],
      spaceRows: [
        {
          type: "Auxiliary",
          notation: "O(n)",
          explanation:
            "Storing the (ratio, weight, value) tuples requires O(n) space. Sorting may use O(log n) stack space.",
        },
        {
          type: "In-place variant",
          notation: "O(1)",
          explanation:
            "If you sort the original array in-place, auxiliary space reduces to O(log n) for the sort stack.",
        },
      ],
      insights: [
        "The Fractional Knapsack is one of the few knapsack variants solvable in polynomial time — the 0/1 version requires O(nW) dynamic programming.",
        "The greedy approach works here because items are divisible. Divisibility ensures the exchange argument holds: any sub-optimal fraction can always be improved by swapping for a higher-ratio fraction.",
        "If all items have equal value/weight ratios, any selection order yields the same optimal value — the algorithm degenerates to a simple fill.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "0/1 Knapsack (No Fractions)",
          description:
            "Items must be taken whole or not at all. Greedy fails here — requires dynamic programming with O(nW) time and space.",
        },
        {
          name: "Bounded Knapsack",
          description:
            "Each item has a limited quantity. Can be reduced to 0/1 Knapsack by duplicating items, or solved more efficiently with binary grouping.",
        },
        {
          name: "Multi-dimensional Knapsack",
          description:
            "Multiple resource constraints (weight, volume, budget). Fractional version is solvable via linear programming; integer version is NP-hard.",
        },
        {
          name: "Continuous Knapsack with Non-linear Value",
          description:
            "When value is a non-linear function of fraction taken, the greedy ratio approach no longer applies — requires calculus or convex optimization.",
        },
        {
          name: "Online Fractional Knapsack",
          description:
            "Items arrive one at a time without knowledge of future items. Competitive analysis shows deterministic algorithms can achieve a constant competitive ratio.",
        },
      ],
      tips: [
        "Always pre-filter items with zero weight before sorting to avoid division-by-zero errors in the ratio computation.",
        "Use floating-point arithmetic carefully — for financial applications consider scaling all values to integers and using integer arithmetic.",
        "If items have equal ratios, you can break ties arbitrarily; the total value will be the same regardless of order.",
        "The fractional knapsack solution gives an upper bound for the 0/1 knapsack — useful as a bound in branch-and-bound algorithms for the integer version.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Fractional Knapsack allows taking any fraction of an item, making it solvable with a simple greedy strategy unlike the 0/1 variant.",
        "The greedy rule is: always select the item with the highest value-per-weight ratio first, taking as much as capacity allows.",
        "Sorting items by ratio descending is the core step — it runs in O(n log n) which dominates the overall time complexity.",
        "The exchange argument proves greedy optimality: any solution deviating from ratio order can be improved by swapping fractions, so greedy is globally optimal.",
        "Space complexity is O(n) for storing ranked items; an in-place sort variant reduces auxiliary space to O(log n).",
        "The fractional knapsack optimal value serves as a useful upper bound when solving the harder 0/1 knapsack via branch-and-bound.",
      ],
    },
  },
}

export default function FractionalKnapsackVideo() {
  return <AlgoVideo config={config} />
}
