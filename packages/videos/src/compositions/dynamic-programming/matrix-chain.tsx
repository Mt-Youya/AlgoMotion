import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Matrix Chain Multiplication",
  subtitle: "Find the most efficient way to multiply a chain of matrices.",
  category: "dynamic-programming",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What Is Matrix Chain Multiplication?",
      bullets: [
        "Given a sequence of matrices A₁, A₂, ..., Aₙ, compute their product A₁·A₂·...·Aₙ.",
        "Matrix multiplication is associative: (AB)C = A(BC), so the order of parenthesization does not change the result.",
        "However, the parenthesization dramatically affects the number of scalar multiplications needed.",
        "Goal: find the optimal parenthesization that minimizes the total number of scalar multiplications.",
        "Input is the dimension array p where matrix Aᵢ has dimensions p[i-1] × p[i].",
      ],
    },

    intuition: {
      heading: "Core Intuition: Break Into Subproblems",
      bullets: [
        "Any full product A₁·...·Aₙ must have a last multiplication at some split point k.",
        "So the problem splits into: optimally multiply A₁·...·Aₖ and Aₖ₊₁·...·Aₙ, then combine.",
        "This gives overlapping subproblems — ideal for dynamic programming.",
        "We fill a 2-D table dp[i][j] = minimum cost to multiply matrices i through j.",
        "We fill by increasing chain length (diagonal by diagonal), so smaller subproblems are always solved first.",
      ],
      analogy:
        "Think of it like planning a road trip with multiple stops. The order in which you visit intermediate cities doesn't change your final destination, but it can drastically change the total distance traveled. DP finds the route with the fewest total miles.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Input: dimension array dims = [10, 30, 5, 60]. This represents 3 matrices: A₁(10×30), A₂(30×5), A₃(5×60).",
        },
        {
          step: 2,
          description:
            "Initialize dp table of size n×n (n=3). Set dp[i][i] = 0 for all i — a single matrix needs zero multiplications.",
        },
        {
          step: 3,
          description:
            "Fill chain length L=2. dp[0][1]: split at k=0 → cost = dp[0][0] + dp[1][1] + dims[0]·dims[1]·dims[2] = 0+0+10·30·5 = 1500.",
        },
        {
          step: 4,
          description:
            "dp[1][2]: split at k=1 → cost = dp[1][1] + dp[2][2] + dims[1]·dims[2]·dims[3] = 0+0+30·5·60 = 9000.",
        },
        {
          step: 5,
          description: "Fill chain length L=3. dp[0][2]: try k=0 → dp[0][0]+dp[1][2]+10·30·60 = 0+9000+18000 = 27000.",
        },
        {
          step: 6,
          description:
            "dp[0][2]: try k=1 → dp[0][1]+dp[2][2]+10·5·60 = 1500+0+3000 = 4500. Min(27000, 4500) = 4500. Record s[0][2]=1.",
        },
        {
          step: 7,
          description: "The optimal cost for multiplying all 3 matrices is dp[0][2] = 4500 scalar multiplications.",
        },
        {
          step: 8,
          description:
            "Traceback: s[0][2]=1 means split between A₂ and A₃. Left: A₁·A₂, Right: A₃. Optimal: (A₁·A₂)·A₃.",
        },
        {
          step: 9,
          description:
            "Contrast: naive order A₁·(A₂·A₃) costs 30·5·60 + 10·30·60 = 9000+18000 = 27000 — 6× more expensive.",
        },
        {
          step: 10,
          description: "Time complexity O(n³): three nested loops — chain length, start index, and split point k.",
        },
        {
          step: 11,
          description: "Space complexity O(n²): the dp and split-point tables each hold n² entries.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def matrix_chain_order(dims):
    n = len(dims) - 1  # number of matrices
    dp = [[0] * n for _ in range(n)]
    split = [[0] * n for _ in range(n)]

    # chain_len: length of the chain being considered
    for chain_len in range(2, n + 1):
        for i in range(n - chain_len + 1):
            j = i + chain_len - 1
            dp[i][j] = float('inf')

            for k in range(i, j):
                cost = (
                    dp[i][k]
                    + dp[k + 1][j]
                    + dims[i] * dims[k + 1] * dims[j + 1]
                )
                if cost < dp[i][j]:
                    dp[i][j] = cost
                    split[i][j] = k

    return dp[0][n - 1], split


def optimal_parens(split, i, j):
    if i == j:
        return f"A{i + 1}"
    k = split[i][j]
    left = optimal_parens(split, i, k)
    right = optimal_parens(split, k + 1, j)
    return f"({left} · {right})"


# Example usage
dims = [10, 30, 5, 60]
min_cost, split = matrix_chain_order(dims)
print(f"Minimum cost: {min_cost}")
print(f"Optimal order: {optimal_parens(split, 0, len(dims) - 2)}")
# Output: Minimum cost: 4500
#         Optimal order: ((A1 · A2) · A3)`,
      annotations: [
        {
          lines: [1, 3],
          note: "dp[i][j] stores the minimum multiplication cost for matrices i..j; split[i][j] stores the optimal split point k.",
        },
        {
          lines: [6, 7],
          note: "Outer loop iterates over chain lengths from 2 to n, ensuring all subproblems are solved before larger problems.",
        },
        {
          lines: [8, 9],
          note: "For each chain length, enumerate all starting indices i; j is determined by i and chain_len.",
        },
        {
          lines: [12, 16],
          note: "Inner loop tries every split point k. Cost = left subproblem + right subproblem + cost of final multiplication.",
        },
        {
          lines: [23, 29],
          note: "Recursive traceback reconstructs the optimal parenthesization string from the split table.",
        },
        {
          lines: [32, 37],
          note: "Example: dims=[10,30,5,60] → 3 matrices. Minimum 4500 ops with order (A1·A2)·A3.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", notation: "O(n³)", note: "All chain lengths must be evaluated" },
        { case: "Average", notation: "O(n³)", note: "No early exit possible; all subproblems needed" },
        { case: "Worst", notation: "O(n³)", note: "Three nested loops: chain length × start × split" },
      ],
      spaceRows: [
        { type: "DP table", notation: "O(n²)", note: "n×n cost table" },
        { type: "Split table", notation: "O(n²)", note: "n×n table to record optimal splits" },
        { type: "Recursion stack", notation: "O(n)", note: "For traceback reconstruction" },
      ],
      insights: [
        "The O(n³) algorithm is a significant improvement over the O(2ⁿ) brute-force approach that tries all parenthesizations.",
        "Hu-Shing algorithm achieves O(n log n) but is significantly more complex to implement.",
        "For small n (< 20), the O(n³) DP solution is practical and commonly used in compiler optimizations and numerical libraries.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Optimal Binary Search Tree",
          description: "Similar DP structure — minimize expected search cost by choosing optimal root at each split.",
        },
        {
          name: "Boolean Parenthesization",
          description: "Count the number of ways to parenthesize a boolean expression to make it evaluate to true.",
        },
        {
          name: "Burst Balloons",
          description:
            "LeetCode 312 — a disguised interval DP where you choose the last balloon to burst in each subrange.",
        },
        {
          name: "Polygon Triangulation",
          description: "Minimize the cost of triangulating a convex polygon — structurally identical recurrence.",
        },
        {
          name: "Hu-Shing Algorithm",
          description:
            "An O(n log n) algorithm for matrix chain ordering, used in high-performance linear algebra libraries.",
        },
      ],
      tips: [
        "Always iterate by chain length (diagonal order), not row-by-row, to ensure subproblems are solved first.",
        "Use a separate split table alongside the dp table — you'll need it to reconstruct the answer.",
        "This problem is a template for all interval DP problems: think 'what is the last operation?' to find the recurrence.",
        "In practice, libraries like NumPy and BLAS use this technique internally when chaining operations like np.einsum.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Matrix chain multiplication is a classic interval DP problem — the optimal solution to a range depends on optimal solutions to sub-ranges.",
        "The key insight is: for any chain A[i..j], enumerate every possible last split point k and pick the minimum.",
        "Fill the DP table diagonally (by increasing chain length) to guarantee all subproblems are ready.",
        "Always maintain a split table alongside the cost table to enable O(n) traceback of the optimal parenthesization.",
        "Time complexity is O(n³) and space is O(n²) — a massive improvement over O(2ⁿ) brute force.",
        "The same interval DP pattern applies to optimal BST, polygon triangulation, burst balloons, and boolean parenthesization.",
      ],
    },
  },
}

export default function MatrixChainVideo() {
  return <AlgoVideo config={config} />
}
