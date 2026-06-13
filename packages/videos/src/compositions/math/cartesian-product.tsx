import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Cartesian Product",
  subtitle: "Compute the Cartesian product of two sets, producing all ordered pairs.",
  category: "math",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "What is the Cartesian Product?",
      body: [
        "Given two sets A and B, their Cartesian product A × B is the set of all ordered pairs (a, b) where a ∈ A and b ∈ B.",
        "The result always contains exactly |A| × |B| pairs — every element of A is paired with every element of B.",
        "Order matters: (a, b) and (b, a) are different pairs, so A × B ≠ B × A in general.",
        "The concept generalises to n sets: A₁ × A₂ × … × Aₙ produces n-tuples, one element drawn from each set.",
        "Applications include database JOIN operations, combinatorics enumeration, and generating test-case grids.",
      ],
      callout:
        "If |A| = m and |B| = n, then |A × B| = m × n. For large sets this grows quickly — always consider the output size before computing.",
    },
    intuition: {
      heading: "Think of a Multiplication Table",
      body: [
        "Imagine A as the rows and B as the columns of a grid. Each cell (i, j) holds the pair (A[i], B[j]).",
        "The nested-loop algorithm mirrors this grid: the outer loop walks rows (elements of A), the inner loop walks columns (elements of B).",
        "Because every row must be combined with every column, no shortcut can reduce the O(|A|·|B|) work — we must produce every pair.",
        "The output set is unordered in the mathematical sense, but algorithms typically yield pairs in row-major (lexicographic) order.",
        "For three or more sets, the grid becomes a hypercube: add one more nested loop per additional set.",
      ],
      analogy:
        "Think of a restaurant menu: A = {Starter, Main, Dessert} courses and B = {Wine, Water, Juice} drinks. The Cartesian product lists every possible (course, drink) combination — that is exactly the full set of meal options.",
    },
    walkthrough: {
      steps: [
        {
          label: "Define the input sets",
          description:
            "Let A = {1, 2, 3} and B = {x, y}. We want to compute A × B — all ordered pairs (a, b) with a drawn from A and b drawn from B.",
        },
        {
          label: "Initialise the result list",
          description:
            "Create an empty list `result`. We will append each pair as we discover it. Final size will be |A| × |B| = 3 × 2 = 6.",
        },
        {
          label: "Outer loop: pick a = 1",
          description:
            "Fix a = 1 (first element of A). The inner loop will now pair 1 with every element of B.",
        },
        {
          label: "Inner loop: pair (1, x) and (1, y)",
          description:
            "Iterate b over B = {x, y}. Append (1, x) then (1, y) to result. result = [(1,x), (1,y)].",
        },
        {
          label: "Outer loop: pick a = 2",
          description:
            "Advance the outer loop to a = 2. The inner loop restarts from the beginning of B.",
        },
        {
          label: "Inner loop: pair (2, x) and (2, y)",
          description:
            "Append (2, x) then (2, y). result = [(1,x), (1,y), (2,x), (2,y)].",
        },
        {
          label: "Outer loop: pick a = 3",
          description:
            "Advance the outer loop to a = 3, the last element of A.",
        },
        {
          label: "Inner loop: pair (3, x) and (3, y)",
          description:
            "Append (3, x) then (3, y). result = [(1,x), (1,y), (2,x), (2,y), (3,x), (3,y)].",
        },
        {
          label: "Outer loop exhausted",
          description:
            "All elements of A have been processed. The outer loop exits. We have produced all 6 pairs.",
        },
        {
          label: "Return the result",
          description:
            "Return result = [(1,x), (1,y), (2,x), (2,y), (3,x), (3,y)]. This is the complete Cartesian product A × B.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `from itertools import product as iproduct
from typing import Any, Iterable


def cartesian_product(*sets: Iterable[Any]) -> list[tuple]:
    """
    Return the Cartesian product of any number of iterables.
    Time:  O(|A| * |B| * ... * |Z|)
    Space: O(|A| * |B| * ... * |Z|)
    """
    if not sets:
        return [()]

    result: list[tuple] = [()]
    for s in sets:
        s_list = list(s)          # materialise so we can iterate multiple times
        result = [
            existing + (elem,)    # extend each existing partial tuple
            for existing in result
            for elem in s_list
        ]
    return result


# ── Two-set convenience wrapper ────────────────────────────────
def cartesian_product_two(
    a: Iterable[Any], b: Iterable[Any]
) -> list[tuple]:
    """Explicit nested-loop version for clarity."""
    result = []
    for elem_a in a:
        for elem_b in b:
            result.append((elem_a, elem_b))
    return result


# ── Usage ──────────────────────────────────────────────────────
if __name__ == "__main__":
    A = {1, 2, 3}
    B = {"x", "y"}

    pairs = cartesian_product(A, B)
    print(pairs)
    # e.g. [(1,'x'), (1,'y'), (2,'x'), (2,'y'), (3,'x'), (3,'y')]

    # stdlib equivalent — always prefer this in production
    stdlib_pairs = list(iproduct(A, B))
    print(stdlib_pairs)`,
      annotations: [
        {
          lines: [5, 6, 7, 8, 9],
          note: "The function accepts any number of iterables using *sets, making it a general n-ary Cartesian product. The base case returns a list containing the empty tuple — the identity element for product.",
        },
        {
          lines: [12, 13],
          note: "We start with a list containing one empty tuple. Each iteration extends every partial tuple by one new element from the next set.",
        },
        {
          lines: [14, 15, 16, 17],
          note: "The nested list comprehension replaces the pair of nested for-loops. `existing + (elem,)` appends elem to the partial tuple, building up the full n-tuple incrementally.",
        },
        {
          lines: [24, 25, 26, 27, 28, 29],
          note: "The explicit two-set version uses a classic nested loop. This is the most readable form and matches the mathematical definition directly.",
        },
        {
          lines: [38, 39],
          note: "Python's itertools.product is the production-ready implementation. It is implemented in C, handles lazy evaluation, and avoids materialising the full result until needed.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case",    value: "O(|A| · |B|)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(|A| · |B|)", color: "#2255CC" },
        { label: "Worst Case",   value: "O(|A| · |B|)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Output storage", value: "O(|A| · |B|)", color: "#2255CC" },
        { label: "Working memory", value: "O(1)",          color: "#CEEB5A" },
        { label: "n-ary product",  value: "O(∏|Sᵢ|)",     color: "#E05A3A" },
      ],
      notes: [
        "The output itself is Θ(|A|·|B|) entries, so no algorithm can avoid this cost — the time complexity is output-sensitive and optimal.",
        "Using a generator (yield) instead of a list reduces working memory to O(1) when callers consume pairs one at a time.",
        "For n sets each of size k, the product has kⁿ tuples — exponential in n. Always bound n in practice.",
      ],
    },
    variations: {
      items: [
        "Generator version: replace the list comprehension with `yield from` to stream pairs lazily without storing the full result.",
        "Cartesian power A^n: compute A × A × … × A (n times) — useful for generating all binary strings, all dice rolls, etc.",
        "Filtered product: apply a predicate to each pair as it is generated, keeping only pairs that satisfy a condition (e.g., a < b).",
        "Symmetric difference of products: compute (A × B) \\ (B × A) to find asymmetric pairs — relevant in relation algebra.",
        "SQL CROSS JOIN: the relational database equivalent of Cartesian product, joining every row of table A with every row of table B.",
      ],
      tips: [
        "Prefer `itertools.product` in production Python — it is lazy, memory-efficient, and battle-tested.",
        "Always estimate output size |A| × |B| before materialising the result; for large sets, prefer streaming (generator) over collecting into a list.",
        "When computing the n-ary product, process sets in ascending size order to keep intermediate results as small as possible.",
        "For combinatorics problems on LeetCode/competitive programming, recognise that 'all combinations of one from each group' is a Cartesian product and reach for itertools.product.",
      ],
    },
    summary: {
      keyPoints: [
        "A × B is the set of all ordered pairs (a, b) with a ∈ A and b ∈ B; its size is always |A| × |B|.",
        "The canonical algorithm is a nested loop: outer over A, inner over B — each iteration emits one pair.",
        "Time and space complexity are both O(|A|·|B|) because the output itself has that many entries.",
        "The concept generalises to n sets via n nested loops (or itertools.product), producing n-tuples.",
        "Use a generator pattern when the full product is too large to store in memory — process pairs one at a time.",
        "Python's itertools.product is the idiomatic, efficient, and lazy implementation for production use.",
      ],
    },
  },
}

export default function CartesianProductVideo() {
  return <AlgoVideo config={config} />
}
