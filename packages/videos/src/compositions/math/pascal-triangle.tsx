import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Pascal's Triangle",
  subtitle:
    "Generates the first n rows of Pascal's triangle where each element is the sum of the two above it.",
  category: "math",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Understanding the Problem",
      bullets: [
        "Given an integer n, generate the first n rows of Pascal's Triangle.",
        "The triangle starts with a single 1 at the top (row 0).",
        "Each subsequent row begins and ends with 1.",
        "Every interior element equals the sum of the two elements directly above it: triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j].",
        "Row i contains exactly i+1 elements, so the total number of elements across n rows is n*(n+1)/2.",
      ],
    },

    intuition: {
      heading: "The Intuition",
      bullets: [
        "Think of each cell as inheriting value from its two 'parent' cells in the row above.",
        "The border 1s act as boundary conditions — there is no left parent for the leftmost cell and no right parent for the rightmost cell, so they default to 1.",
        "Building row by row lets us reuse already-computed values, avoiding redundant recursion.",
        "The triangle is perfectly symmetric: triangle[i][j] == triangle[i][i-j], which can halve the work.",
        "Real-world analogy: imagine a ball dropped from the top of a Galton board. At each peg it splits left or right. The number of paths reaching each slot at the bottom exactly equals the corresponding Pascal's Triangle entry.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough (n = 5)",
      steps: [
        {
          step: 1,
          description: "Initialize result list and add the first row [1].",
        },
        {
          step: 2,
          description: "Start building row 1. Previous row is [1]. New row starts with [1].",
        },
        {
          step: 3,
          description:
            "Row 1 has no interior elements. Append trailing 1. Row 1 = [1, 1].",
        },
        {
          step: 4,
          description:
            "Build row 2. Previous row is [1, 1]. Interior element: 1+1=2. Row 2 = [1, 2, 1].",
        },
        {
          step: 5,
          description:
            "Build row 3. Previous row is [1, 2, 1]. Interior elements: 1+2=3, 2+1=3. Row 3 = [1, 3, 3, 1].",
        },
        {
          step: 6,
          description:
            "Build row 4. Previous row is [1, 3, 3, 1]. Interior: 1+3=4, 3+3=6, 3+1=4. Row 4 = [1, 4, 6, 4, 1].",
        },
        {
          step: 7,
          description:
            "All 5 rows are complete. Verify symmetry: each row reads the same forwards and backwards.",
        },
        {
          step: 8,
          description:
            "Verify row sums: 1, 2, 4, 8, 16 — each is a power of 2 (2^i for row i).",
        },
        {
          step: 9,
          description:
            "Final result: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]].",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def generate(n: int) -> list[list[int]]:
    """Generate the first n rows of Pascal's Triangle."""
    if n <= 0:
        return []

    triangle = [[1]]          # row 0

    for i in range(1, n):
        prev = triangle[i - 1]
        row = [1]             # leading 1

        # compute interior elements
        for j in range(1, i):
            row.append(prev[j - 1] + prev[j])

        row.append(1)         # trailing 1
        triangle.append(row)

    return triangle


# ── space-optimised single-row variant ──────────────────────────
def get_row(row_index: int) -> list[int]:
    """Return only the row at the given index (0-based)."""
    row = [1]
    for j in range(1, row_index + 1):
        # update in-place right-to-left to avoid overwriting values we still need
        row.append(row[-1] * (row_index - j + 1) // j)
    return row


if __name__ == "__main__":
    for row in generate(6):
        print(row)
`,
      annotations: [
        {
          lines: "1-4",
          note: "Guard clause: return early for non-positive n to avoid empty-range loops.",
        },
        {
          lines: "6",
          note: "Seed the triangle with row 0 = [1]. All subsequent rows derive from this.",
        },
        {
          lines: "8-9",
          note: "Each iteration i builds row i using the previously appended row i-1.",
        },
        {
          lines: "11-13",
          note: "The inner loop runs i-1 times, computing each interior element as the sum of its two parents.",
        },
        {
          lines: "19-23",
          note: "Space-optimised variant uses the combinatorial formula C(n,k) = C(n,k-1)*(n-k+1)/k to build a single row in O(n) time and O(n) space without storing the full triangle.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best", value: "O(n²)", note: "Always visits every cell" },
        { label: "Average", value: "O(n²)", note: "n rows, up to n elements each" },
        { label: "Worst", value: "O(n²)", note: "No early-exit possible" },
      ],
      spaceRows: [
        { label: "Full triangle stored", value: "O(n²)", note: "n*(n+1)/2 integers" },
        { label: "Single-row variant", value: "O(n)", note: "Only current row kept" },
      ],
      insights: [
        "The O(n²) time bound is tight — we must compute every element at least once.",
        "If you only need a specific row (e.g., for combinatorics), the get_row() variant saves memory from O(n²) to O(n).",
        "Integer values grow as C(n, n/2) ≈ 2^n / √n, so for large n the cost of arbitrary-precision arithmetic dominates.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Pascal's Triangle II (single row)",
          description:
            "Return only the k-th row using the rolling update trick in O(k) space.",
        },
        {
          name: "Triangle path sum (LeetCode 120)",
          description:
            "Find the minimum path sum from top to bottom of a triangle using bottom-up DP.",
        },
        {
          name: "Binomial coefficients",
          description:
            "Use Pascal's Triangle to compute C(n, k) in O(n²) preprocessing, O(1) query.",
        },
        {
          name: "Sierpinski Triangle",
          description:
            "Colour cells whose value is odd to reveal the fractal Sierpinski pattern.",
        },
        {
          name: "Modular Pascal's Triangle",
          description:
            "Compute triangle[i][j] % p for prime p; Kummer's theorem predicts which entries are divisible.",
        },
      ],
      tips: [
        "Always seed the result with [[1]] before the loop — it avoids an awkward special case inside the loop.",
        "When updating a row in-place (single-row variant), iterate right-to-left so you don't overwrite values you still need.",
        "For combinatorics problems, precompute the full triangle up to the maximum n you expect, then answer queries in O(1).",
        "Remember that row i is 0-indexed, so the last element of row i is always triangle[i][i] = 1.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      bullets: [
        "Pascal's Triangle is built row by row; each interior element is the sum of the two elements above it.",
        "Border elements are always 1, serving as base cases that make the recurrence well-defined.",
        "Time complexity is O(n²) and cannot be improved because every element must be computed.",
        "Space can be reduced from O(n²) to O(n) if only a single row is needed.",
        "The triangle encodes binomial coefficients: triangle[i][j] = C(i, j).",
        "Rich mathematical structure (symmetry, row sums as powers of 2, Fibonacci diagonals) makes it a foundational structure in combinatorics.",
      ],
    },
  },
};

export default function PascalTriangleVideo() {
  return <AlgoVideo config={config} />;
}
