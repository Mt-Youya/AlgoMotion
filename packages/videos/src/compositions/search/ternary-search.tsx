import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Ternary Search",
  subtitle: "Divides the search space into three equal parts using two midpoints and eliminates one third each it",
  category: "search",
  difficulty: "intermediate",

  chapters: [
    {
      type: "problem",
      heading: "What is Ternary Search?",
      bullets: [
        "Given a sorted array and a target value, find the index of the target.",
        "Unlike binary search (which uses one midpoint), ternary search uses TWO midpoints: mid1 and mid2.",
        "The array is split into three roughly equal regions: [lo, mid1], (mid1, mid2), [mid2, hi].",
        "At each iteration, one-third of the remaining search space is eliminated based on comparisons.",
        "The algorithm requires the array to be sorted in ascending order before searching.",
      ],
    },
    {
      type: "intuition",
      heading: "The Core Insight",
      bullets: [
        "Instead of halving the search space (binary), we cut it into thirds — eliminating 33% each step.",
        "Two comparisons per iteration let us determine which third the target cannot be in.",
        "If target < data[mid1], the target must be in the left third.",
        "If target > data[mid2], the target must be in the right third.",
        "Otherwise, the target lies in the middle third between mid1 and mid2.",
      ],
      analogy:
        "Imagine searching for a word in a dictionary by opening it at two points (1/3 and 2/3 through). You compare your word with both pages and immediately discard one of the three sections — a slightly finer-grained approach than opening the book in the middle.",
    },
    {
      type: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the sorted array and set lo = 0, hi = n - 1.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue", "blue"],
          },
        },
        {
          step: 2,
          description: "Target = 23. Compute mid1 = lo + (hi - lo) / 3 = 3, mid2 = hi - (hi - lo) / 3 = 6.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["blue", "blue", "blue", "yellow", "blue", "blue", "purple", "blue", "blue", "blue"],
          },
        },
        {
          step: 3,
          description: "Compare target (23) with data[mid1] = data[3] = 12. Since 23 > 12, continue.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["gray", "gray", "gray", "yellow", "blue", "blue", "purple", "blue", "blue", "blue"],
          },
        },
        {
          step: 4,
          description:
            "Compare target (23) with data[mid2] = data[6] = 38. Since 23 < 38, the target is in the middle third.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["gray", "gray", "gray", "yellow", "blue", "blue", "purple", "gray", "gray", "gray"],
          },
        },
        {
          step: 5,
          description: "Eliminate left and right thirds: set lo = mid1 + 1 = 4, hi = mid2 - 1 = 5.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["gray", "gray", "gray", "gray", "blue", "blue", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 6,
          description: "Iteration 2: Compute mid1 = 4 + (5 - 4) / 3 = 4, mid2 = 5 - (5 - 4) / 3 = 5.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["gray", "gray", "gray", "gray", "yellow", "purple", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 7,
          description: "Compare target (23) with data[mid1] = data[4] = 16. Since 23 > 16, continue.",
        },
        {
          step: 8,
          description:
            "Compare target (23) with data[mid2] = data[5] = 23. Target equals data[mid2]! Found at index 5.",
          array: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: ["gray", "gray", "gray", "gray", "gray", "green", "gray", "gray", "gray", "gray"],
          },
        },
        {
          step: 9,
          description: "Return index 5. The search terminates in just 2 iterations for an array of 10 elements.",
        },
      ],
    },
    {
      type: "code",
      heading: "Python Implementation",
      snippet: `def ternary_search(arr: list[int], target: int) -> int:
    \"\"\"
    Search for target in a sorted array using ternary search.
    Returns the index if found, otherwise -1.
    \"\"\"
    lo, hi = 0, len(arr) - 1

    while lo <= hi:
        # Divide the range into three equal parts
        third = (hi - lo) // 3
        mid1 = lo + third
        mid2 = hi - third

        if arr[mid1] == target:
            return mid1
        if arr[mid2] == target:
            return mid2

        if target < arr[mid1]:
            # Target is in the left third
            hi = mid1 - 1
        elif target > arr[mid2]:
            # Target is in the right third
            lo = mid2 + 1
        else:
            # Target is in the middle third
            lo = mid1 + 1
            hi = mid2 - 1

    return -1  # Target not found


# Example usage
arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
print(ternary_search(arr, 23))   # Output: 5
print(ternary_search(arr, 100))  # Output: -1`,
      annotations: [
        {
          line: 7,
          note: "Initialize lo and hi to the full array bounds.",
        },
        {
          line: 11,
          note: "Compute 'third' as (hi - lo) // 3 to get roughly equal partition sizes.",
        },
        {
          line: 12,
          note: "mid1 is one-third from the left; mid2 is one-third from the right.",
        },
        {
          line: 18,
          note: "If target < arr[mid1], discard the right two-thirds — search left third only.",
        },
        {
          line: 20,
          note: "If target > arr[mid2], discard the left two-thirds — search right third only.",
        },
        {
          line: 23,
          note: "Otherwise target lies strictly between mid1 and mid2 — search the middle third.",
        },
      ],
    },
    {
      type: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", complexity: "O(1)", note: "Target found at mid1 or mid2 on first iteration" },
        { case: "Average", complexity: "O(log₃ n)", note: "Each iteration reduces search space by 1/3" },
        { case: "Worst", complexity: "O(log₃ n)", note: "Target not present; search space reduced to zero" },
      ],
      spaceRows: [
        { type: "Iterative", complexity: "O(1)", note: "Only a constant number of pointers needed" },
        { type: "Recursive", complexity: "O(log₃ n)", note: "Call stack depth proportional to iterations" },
      ],
      insights: [
        "log₃ n ≈ 0.631 × log₂ n, so ternary search does ~37% fewer iterations than binary search.",
        "However, each iteration requires TWO comparisons instead of one, making the total comparison count roughly equal to binary search in practice.",
        "Ternary search is most useful when comparison cost is negligible but iteration overhead matters, such as unimodal function optimization.",
      ],
    },
    {
      type: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Recursive Ternary Search",
          description:
            "Implement ternary search recursively by passing updated lo/hi bounds. Cleaner code but uses O(log₃ n) stack space.",
        },
        {
          name: "Ternary Search on Unimodal Functions",
          description:
            "The most common real-world use: find the maximum or minimum of a unimodal (single-peak) function by searching over a continuous or discrete domain.",
        },
        {
          name: "Fractional Ternary Search",
          description:
            "Apply ternary search over a floating-point range with a precision epsilon, iterating until hi - lo < eps. Common in competitive programming.",
        },
        {
          name: "Parallel Ternary Search",
          description:
            "Run multiple ternary searches simultaneously on independent subproblems; useful in offline competitive programming problems.",
        },
        {
          name: "Ternary Search on Answer",
          description:
            "Binary/ternary search on the answer space rather than the array index — useful when the feasibility function is unimodal.",
        },
      ],
      tips: [
        "Prefer binary search over ternary search for simple sorted-array lookups — same asymptotic complexity but fewer comparisons per iteration.",
        "Use ternary search when optimizing a unimodal function where you cannot compute derivatives.",
        "Always verify the array is sorted before applying ternary search; an unsorted array gives incorrect results with no error.",
        "In floating-point ternary search, run at least 200 iterations or use an epsilon guard to avoid infinite loops from precision issues.",
      ],
    },
    {
      type: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Ternary search divides the search space into three equal parts using two midpoints (mid1, mid2) each iteration.",
        "It eliminates one-third of the search space per iteration, giving O(log₃ n) time complexity.",
        "The algorithm requires a sorted array (or a unimodal function) as a precondition.",
        "Despite fewer iterations than binary search, the two comparisons per step make total comparisons roughly equivalent.",
        "Its primary practical advantage is in continuous optimization of unimodal functions, not simple array lookups.",
        "Space complexity is O(1) for the iterative version — no extra memory beyond a few index variables.",
      ],
    },
  ],
}

export default function TernarySearchVideo() {
  return <AlgoVideo config={config} />
}
