import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Burst Balloons",
  subtitle: "Maximize coins collected by bursting balloons in optimal order.",
  category: "dynamic-programming",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an array nums of n balloons, each labeled with a positive integer, burst all balloons to collect coins. Bursting balloon i yields nums[i-1] × nums[i] × nums[i+1] coins, where out-of-bounds neighbors are treated as 1.",
        "After a balloon is burst, its former neighbors become adjacent to each other, making the problem order-dependent — the coins earned depend on which balloons are still present.",
        "Return the maximum total coins you can collect by choosing the optimal burst order.",
        "Example: nums = [3, 1, 5, 8]. Optimal burst order is index 1 (val=1), index 0 (val=3), index 2 (val=5), index 3 (val=8), yielding 3×1×5 + 1×3×5 + 1×5×8 + 1×8×1 = 167 coins.",
        "Brute-force tries all n! permutations. Dynamic programming reduces this to O(n³) by reframing the problem around interval sub-problems.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Pad the array with sentinel 1s on both ends: nums = [1, ...original..., 1]. This gives every balloon valid neighbors throughout the process.",
        "Instead of thinking 'which balloon to burst first', think 'which balloon is burst LAST in a given interval (l, r)'. This is the key reversal that makes the problem tractable.",
        "When balloon k is the last burst in interval (l, r), its left neighbor is always nums[l] and right neighbor is always nums[r] — because all other balloons in (l, r) are already gone.",
        "This gives independent sub-problems: dp[l][k] (best coins from balloons strictly between l and k) and dp[k][r] (best coins between k and r), with no shared state.",
        "Fill the DP table by increasing interval length. Shorter intervals are solved first and used to build longer ones — classic interval DP bottom-up construction.",
      ],
      analogy:
        "Imagine demolishing a row of buildings. Each demolition earns money based on the heights of the buildings still standing on either side. If you plan which building to demolish LAST in each city block, you know exactly what its neighbors will be when it falls — the block to its left and the block to its right are already cleared. This 'last demolition' perspective lets you plan each block independently, then combine blocks to find the global optimum.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Input: nums = [3, 1, 5, 8]. Pad with sentinels: padded = [1, 3, 1, 5, 8, 1]. Indices 0..5. We will compute dp[l][r] for all 0 ≤ l < r ≤ 5.",
        },
        {
          step: 2,
          description:
            "Initialize dp[l][r] = 0 for all l, r. Base case: dp[l][r] = 0 when r - l < 2 (no interior balloons between l and r to burst).",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "green", "green", "green", "green", "green"],
        },
        {
          step: 3,
          description:
            "Fill intervals of length 2 (one interior balloon). dp[0][2]: k=1, coins = padded[0]×padded[1]×padded[2] = 1×3×1 = 3. dp[0][2] = 3.",
          values: [3, 0, 0, 0, 0, 0],
          colors: ["blue", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description:
            "Continue length-2 intervals. dp[1][3]: k=2, coins = 3×1×5 = 15. dp[2][4]: k=3, coins = 1×5×8 = 40. dp[3][5]: k=4, coins = 5×8×1 = 40.",
          values: [3, 15, 40, 40, 0, 0],
          colors: ["blue", "blue", "blue", "blue", "gray", "gray"],
        },
        {
          step: 5,
          description:
            "Fill length-3 intervals. dp[0][3]: try k=1: dp[0][1]+dp[1][3]+1×3×5=0+15+15=30. Try k=2: dp[0][2]+dp[2][3]+1×1×5=3+0+5=8. dp[0][3]=30.",
          values: [30, 0, 0, 0, 0, 0],
          colors: ["yellow", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description:
            "dp[1][4]: try k=2: dp[1][2]+dp[2][4]+3×1×8=0+40+24=64. Try k=3: dp[1][3]+dp[3][4]+3×5×8=15+0+120=135. dp[1][4]=135.",
          values: [30, 135, 0, 0, 0, 0],
          colors: ["yellow", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 7,
          description:
            "dp[2][5]: try k=3: dp[2][3]+dp[3][5]+1×5×1=0+40+5=45. Try k=4: dp[2][4]+dp[4][5]+1×8×1=40+0+8=48. dp[2][5]=48.",
          values: [30, 135, 48, 0, 0, 0],
          colors: ["yellow", "yellow", "yellow", "gray", "gray", "gray"],
        },
        {
          step: 8,
          description:
            "Fill length-4 intervals. dp[0][4]: try k=1: 0+135+1×3×8=135+24=159. k=2: 3+40+1×1×8=51. k=3: 30+0+1×5×8=70. dp[0][4]=159.",
          values: [159, 0, 0, 0, 0, 0],
          colors: ["yellow", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 9,
          description:
            "dp[1][5]: try k=2: 0+48+3×1×1=51. k=3: 15+40+3×5×1=70. k=4: 135+0+3×8×1=159. dp[1][5]=159.",
          values: [159, 159, 0, 0, 0, 0],
          colors: ["yellow", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 10,
          description:
            "Fill length-5 interval. dp[0][5]: try k=1: 0+159+1×3×1=162. k=2: 3+48+1×1×1=52. k=3: 30+40+1×5×1=75. k=4: 159+0+1×8×1=167. dp[0][5]=167.",
          values: [167, 0, 0, 0, 0, 0],
          colors: ["yellow", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 11,
          description:
            "Answer: dp[0][5] = 167. This corresponds to bursting balloon index 4 (val=8) last in the full interval, with sub-problems dp[0][4]=159 and dp[4][5]=0 contributing the rest.",
          values: [167],
          colors: ["green"],
        },
        {
          step: 12,
          description:
            "Traceback: dp[0][5]=167 achieved at k=4. Then dp[0][4]=159 achieved at k=1 (burst val=3 last in [0,4]). Continuing traceback reconstructs the full optimal burst sequence.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def maxCoins(nums: list[int]) -> int:
    """
    Burst Balloons — Interval DP.
    Returns the maximum coins collectable by bursting all balloons.
    Time: O(n^3)  Space: O(n^2)
    """
    # Add boundary sentinels
    nums = [1] + nums + [1]
    n = len(nums)

    # dp[l][r] = max coins from bursting all balloons strictly between l and r
    dp = [[0] * n for _ in range(n)]

    # Fill by increasing interval length
    for length in range(2, n):          # length = r - l
        for l in range(n - length):
            r = l + length
            # Try every balloon k as the LAST burst in interval (l, r)
            for k in range(l + 1, r):
                coins = nums[l] * nums[k] * nums[r]
                total = dp[l][k] + dp[k][r] + coins
                if total > dp[l][r]:
                    dp[l][r] = total

    # Answer covers entire padded array (excluding sentinels)
    return dp[0][n - 1]


def maxCoins_memo(nums: list[int]) -> int:
    """Top-down memoization version."""
    nums = [1] + nums + [1]
    n = len(nums)
    memo = {}

    def dp(l: int, r: int) -> int:
        if r - l < 2:
            return 0
        if (l, r) in memo:
            return memo[(l, r)]
        best = 0
        for k in range(l + 1, r):
            coins = nums[l] * nums[k] * nums[r]
            best = max(best, dp(l, k) + dp(k, r) + coins)
        memo[(l, r)] = best
        return best

    return dp(0, n - 1)


# Example
print(maxCoins([3, 1, 5, 8]))   # 167
print(maxCoins([1, 5]))          # 10`,
      annotations: [
        {
          lines: [4, 5],
          note: "Pad nums with sentinel 1s on both ends. This ensures boundary balloons always have a valid neighbor value of 1 when they are burst, simplifying the recurrence.",
        },
        {
          lines: [8],
          note: "dp[l][r] represents the maximum coins obtainable by bursting all balloons strictly inside the open interval (l, r). Cells where r - l < 2 are 0 by default (no interior balloons).",
        },
        {
          lines: [11, 12, 13],
          note: "Outer two loops enumerate all valid intervals by increasing length. We must solve smaller intervals before larger ones because larger intervals depend on smaller sub-problems.",
        },
        {
          lines: [15, 16, 17],
          note: "The inner loop tries every candidate k as the LAST balloon burst in (l, r). When k is burst last, its neighbors are guaranteed to be nums[l] and nums[r] — the key insight of this formulation.",
        },
        {
          lines: [18, 19, 20],
          note: "Total coins = left sub-problem + right sub-problem + coins from bursting k last. The two sub-problems are independent because k has not been burst yet when they are solved.",
        },
        {
          lines: [23],
          note: "The answer is dp[0][n-1], covering the full padded array. The sentinels at indices 0 and n-1 are never burst — they only serve as boundary multipliers.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n³)",
          note: "Three nested loops over interval endpoints l, r, and candidate last-burst k. No early exits are possible — every cell must be computed.",
        },
        {
          case: "Average",
          notation: "O(n³)",
          note: "The number of (l, r, k) triples is O(n³) regardless of the input values. All triples are visited exactly once.",
        },
        {
          case: "Worst",
          notation: "O(n³)",
          note: "With n balloons, there are O(n²) intervals and O(n) candidates per interval, giving exactly O(n³) total operations.",
        },
      ],
      space: [
        {
          case: "DP Table",
          notation: "O(n²)",
          note: "The dp array is (n+2) × (n+2) where n is the number of original balloons. Only the upper triangle is used.",
        },
        {
          case: "Memoization Stack",
          notation: "O(n²)",
          note: "Top-down recursion has at most O(n²) unique sub-problems. The call stack depth is O(n) in the worst case.",
        },
      ],
      insights: [
        "The O(n³) complexity is a dramatic improvement over the O(n! ) brute-force. For n=500 this means ~125 million operations instead of astronomical permutations.",
        "The 'last burst' reversal is the algorithmic trick that creates optimal substructure. Thinking 'first burst' leads to state that tracks remaining neighbors — exponential complexity.",
        "This problem is a classic example of interval DP, the same pattern used in matrix chain multiplication, optimal BST construction, and palindrome partitioning.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Remove Boxes (LeetCode 546)",
          description:
            "A generalization where consecutive identical boxes earn k² points for k boxes removed together. Requires a 3-D DP state dp[l][r][k] tracking attached identical boxes, giving O(n⁴) complexity.",
        },
        {
          name: "Strange Printer (LeetCode 664)",
          description:
            "A printer can print a sequence of same characters in one turn. Find minimum turns to print a string. Uses the same interval DP pattern: dp[l][r] = min turns to print s[l..r], with O(n³) complexity.",
        },
        {
          name: "Minimum Cost to Merge Stones (LeetCode 1000)",
          description:
            "Merge k adjacent piles of stones into one, paying the sum of merged stones each time. Interval DP with a feasibility check: merging is only possible when (n-1) % (k-1) == 0.",
        },
        {
          name: "Matrix Chain Multiplication",
          description:
            "Find the optimal parenthesization of matrix products to minimize scalar multiplications. Structurally identical to burst balloons: dp[l][r] = min cost to multiply matrices l through r, O(n³).",
        },
        {
          name: "Zuma Game (LeetCode 488)",
          description:
            "Insert balls into a row to clear groups of 3+ same-colored balls with minimum insertions. A harder variant requiring BFS or DP with more complex state to track inserted-ball counts.",
        },
      ],
      tips: [
        "Always pad with sentinel 1s before building the DP table. Forgetting this causes index-out-of-bounds errors or incorrect boundary multiplications.",
        "Fill the table by interval length (outer loop on length = r - l), not by row or column. Cells on the same diagonal are independent and can be computed in any order within that diagonal.",
        "For traceback, store a 'choice' table alongside dp: choice[l][r] = k that achieved dp[l][r]. Then recursively reconstruct the burst sequence from choice[0][n-1].",
        "The memoized top-down version is easier to write correctly and has identical complexity. Use it for interviews; switch to bottom-up if you need cache-friendly memory access.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Burst Balloons is solved with interval DP by reversing the question: instead of 'which balloon to burst next', ask 'which balloon was burst LAST in this interval'. This creates clean, independent sub-problems.",
        "The recurrence dp[l][r] = max over k of (dp[l][k] + dp[k][r] + nums[l]×nums[k]×nums[r]) captures the last-burst insight. Sentinel 1s simplify boundary handling.",
        "Time complexity is O(n³) and space is O(n²) — a dramatic improvement over the O(n!) brute-force enumeration of all burst orderings.",
        "The algorithm exemplifies interval DP, a powerful pattern applicable to matrix chain multiplication, optimal BST, palindrome partitioning, and many other optimization problems on sequences.",
        "The 'last event in an interval' reversal trick is reusable: whenever sub-problems overlap due to order-dependency, try fixing the last (or first) operation in a range to decouple sub-problems.",
        "For competitive programming, recognize burst balloons variants by the pattern: coins/cost depend on neighbors that change as elements are removed — interval DP with last-removal thinking is the standard approach.",
      ],
    },
  },
};

export default function BurstBalloonsVideo() {
  return <AlgoVideo config={config} />;
}
