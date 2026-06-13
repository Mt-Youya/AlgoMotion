import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Best Time to Buy & Sell Stock II",
  subtitle:
    "Collect every upward price move for maximum profit from unlimited transactions.",
  category: "greedy",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an integer array `prices` where `prices[i]` is the stock price on day i.",
        "You may buy and sell the stock on the same or different days, with no limit on transactions.",
        "You must sell the stock before you buy again (hold at most one share at a time).",
        "Return the maximum profit you can achieve from these transactions.",
        "Example: prices = [7,1,5,3,6,4] → buy day 1 (price 1), sell day 2 (price 5), buy day 3 (price 3), sell day 4 (price 6) → profit = 4 + 3 = 7.",
      ],
    },

    intuition: {
      heading: "Greedy Intuition",
      bullets: [
        "Since we can make unlimited transactions, we should capture every upward price movement.",
        "Any profit from a multi-day hold equals the sum of consecutive daily profits within that hold.",
        "Therefore, simply add prices[i] - prices[i-1] whenever it is positive.",
        "This greedy approach is optimal: we never miss a profitable day and never take a loss.",
        "No need to track buy/sell days explicitly — just accumulate positive differences.",
      ],
      analogy:
        "Think of it like a weather forecast: if you know tomorrow will be sunnier (higher price), you always go outside today and come back tomorrow. You never sit out a sunny day.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize profit = 0. We will accumulate all positive daily gains.",
        },
        {
          step: 2,
          description: "Start iterating from index i = 1 (compare each day to the previous day).",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: "i=1: prices[1]=1, prices[0]=7. Diff = 1-7 = -6. Negative, skip. profit stays 0.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["red", "red", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "i=2: prices[2]=5, prices[1]=1. Diff = 5-1 = +4. Positive! profit += 4 → profit = 4.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "green", "green", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "i=3: prices[3]=3, prices[2]=5. Diff = 3-5 = -2. Negative, skip. profit stays 4.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "gray", "red", "red", "gray", "gray"],
        },
        {
          step: 6,
          description: "i=4: prices[4]=6, prices[3]=3. Diff = 6-3 = +3. Positive! profit += 3 → profit = 7.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "gray", "gray", "green", "green", "gray"],
        },
        {
          step: 7,
          description: "i=5: prices[5]=4, prices[4]=6. Diff = 4-6 = -2. Negative, skip. profit stays 7.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "gray", "gray", "gray", "red", "red"],
        },
        {
          step: 8,
          description: "Loop ends. Return profit = 7. This is the maximum achievable profit.",
          values: [7, 1, 5, 3, 6, 4],
          colors: ["gray", "green", "green", "green", "green", "gray"],
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from typing import List

class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        """
        Greedy: collect every upward daily price move.
        Time:  O(n)
        Space: O(1)
        """
        profit = 0

        for i in range(1, len(prices)):
            diff = prices[i] - prices[i - 1]
            if diff > 0:
                profit += diff

        return profit


# One-liner alternative using sum + max
def maxProfitOneLiner(prices: List[int]) -> int:
    return sum(max(prices[i] - prices[i - 1], 0) for i in range(1, len(prices)))`,
      annotations: [
        {
          lines: [10, 10],
          note: "profit accumulator starts at zero — no transactions yet.",
        },
        {
          lines: [12, 12],
          note: "Iterate from day 1 so we can always look back at prices[i-1].",
        },
        {
          lines: [13, 13],
          note: "Compute the daily price difference (can be negative, zero, or positive).",
        },
        {
          lines: [14, 15],
          note: "Only collect the gain when the price went up — ignore losses entirely.",
        },
        {
          lines: [17, 17],
          note: "Return the total accumulated profit after scanning all days.",
        },
        {
          lines: [21, 21],
          note: "Equivalent one-liner using a generator expression with max(diff, 0) to clip negatives.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      timeRows: [
        { case: "Best", notation: "O(n)", note: "Single pass even if all prices are decreasing." },
        { case: "Average", notation: "O(n)", note: "Always one full scan of the prices array." },
        { case: "Worst", notation: "O(n)", note: "Strictly increasing prices — collect every day." },
      ],
      spaceRows: [
        { case: "Auxiliary", notation: "O(1)", note: "Only two variables: loop index and profit." },
        { case: "Input", notation: "O(n)", note: "The prices array itself (not counted as extra space)." },
      ],
      insights: [
        "This is optimal: any algorithm must read every price at least once, giving an Ω(n) lower bound.",
        "The greedy choice is safe because holding equals buying + selling each consecutive day — mathematically equivalent.",
        "No sorting, no extra data structures, no recursion — as simple as an algorithm gets.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Stock I — At Most One Transaction",
          description:
            "Track the minimum price seen so far and compute the best single buy-low-sell-high profit.",
        },
        {
          name: "Stock III — At Most Two Transactions",
          description:
            "Use dynamic programming with states for first/second buy and sell to limit to two trades.",
        },
        {
          name: "Stock IV — At Most k Transactions",
          description:
            "Generalize Stock III with a DP table of size k × n to cap the number of transactions.",
        },
        {
          name: "Stock with Cooldown",
          description:
            "After selling, you must wait one day before buying again. Requires state-machine DP.",
        },
        {
          name: "Stock with Transaction Fee",
          description:
            "Subtract a fee on every sell. Greedy still works but the threshold becomes fee > 0 instead of diff > 0.",
        },
      ],
      tips: [
        "For Stock II, greedy beats DP in both simplicity and constant factors — always prefer it here.",
        "Visualize the price chart as a mountain range: you want to collect every uphill segment.",
        "The one-liner `sum(max(p - q, 0) for p, q in zip(prices[1:], prices))` is interview-friendly.",
        "When the problem says 'unlimited transactions', that is the signal to apply this greedy pattern.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Unlimited transactions → greedy: collect every positive daily difference.",
        "A multi-day hold's profit equals the sum of all positive consecutive differences within it.",
        "Single O(n) pass with O(1) space — optimal in both time and space.",
        "The core insight: you never need to decide when to buy/sell, just whether today's move is up.",
        "Recognize the 'unlimited transactions' constraint as the trigger for this greedy approach.",
        "Variations (cooldown, fee, k-transactions) all build on this foundation with added constraints.",
      ],
    },
  },
};

export default function BestTimeStockVideo() {
  return <AlgoVideo config={config} />;
}
