import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Binary Search",
  subtitle:
    "Repeatedly halves the search range on a sorted array to locate the target in O(log n) time.",
  category: "search",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a **sorted** array of n integers and a target value, return the index of the target.",
        "If the target is not present in the array, return -1.",
        "The array elements are in strictly ascending order (no duplicates assumed).",
        "Brute-force linear scan is O(n) — can we do better by exploiting the sorted property?",
        "Constraints: 1 ≤ n ≤ 10⁵, −10⁹ ≤ arr[i], target ≤ 10⁹.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Because the array is sorted, we can eliminate half the remaining candidates with a single comparison.",
        "Compare the target against the **middle** element: if equal, done; if smaller, discard the right half; if larger, discard the left half.",
        "Each iteration halves the search space, giving a logarithmic number of steps.",
        "After at most ⌈log₂ n⌉ comparisons the answer is known — roughly 17 steps for one million elements.",
        "The key insight: a sorted structure lets us make *informed* eliminations, unlike random data.",
      ],
      analogy:
        "Think of looking up a word in a dictionary: you open to the middle, decide whether your word comes before or after, then repeat on the relevant half — you never re-read pages you've already ruled out.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the full sorted array and set lo = 0, hi = n − 1.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "blue", "blue", "blue", "blue", "blue",
              "blue", "blue", "blue", "blue", "blue",
            ],
          },
        },
        {
          step: 2,
          description: "Target = 23. Compute mid = (0 + 9) // 2 = 4. Inspect arr[4] = 16.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "blue", "blue", "blue", "blue", "yellow",
              "blue", "blue", "blue", "blue", "blue",
            ],
          },
        },
        {
          step: 3,
          description: "16 < 23 → target is in the RIGHT half. Update lo = mid + 1 = 5.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "gray", "gray", "gray", "gray", "gray",
              "blue", "blue", "blue", "blue", "blue",
            ],
          },
        },
        {
          step: 4,
          description: "Compute mid = (5 + 9) // 2 = 7. Inspect arr[7] = 45.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "gray", "gray", "gray", "gray", "gray",
              "blue", "blue", "yellow", "blue", "blue",
            ],
          },
        },
        {
          step: 5,
          description: "45 > 23 → target is in the LEFT half. Update hi = mid − 1 = 6.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "gray", "gray", "gray", "gray", "gray",
              "blue", "blue", "gray", "gray", "gray",
            ],
          },
        },
        {
          step: 6,
          description: "Compute mid = (5 + 6) // 2 = 5. Inspect arr[5] = 23.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "gray", "gray", "gray", "gray", "gray",
              "yellow", "blue", "gray", "gray", "gray",
            ],
          },
        },
        {
          step: 7,
          description: "23 == 23 → Target FOUND at index 5! Return 5.",
          arrayState: {
            values: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
            colors: [
              "gray", "gray", "gray", "gray", "gray",
              "green", "gray", "gray", "gray", "gray",
            ],
          },
        },
        {
          step: 8,
          description:
            "Total comparisons: 3. For n = 10, log₂(10) ≈ 3.32 — exactly as predicted.",
        },
        {
          step: 9,
          description:
            "If lo > hi at any point, the loop exits without finding the target and we return -1.",
        },
        {
          step: 10,
          description:
            "Off-by-one tip: use mid = lo + (hi − lo) // 2 to avoid integer overflow in languages with fixed-width integers.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def binary_search(arr: list[int], target: int) -> int:
    \"\"\"
    Return the index of target in sorted arr, or -1 if not found.
    Time:  O(log n)   Space: O(1)
    \"\"\"
    lo, hi = 0, len(arr) - 1

    while lo <= hi:
        # Avoid potential overflow: equivalent to (lo + hi) // 2
        mid = lo + (hi - lo) // 2

        if arr[mid] == target:
            return mid          # Target found
        elif arr[mid] < target:
            lo = mid + 1        # Discard left half
        else:
            hi = mid - 1        # Discard right half

    return -1                   # Target not in array


# ── Recursive variant ──────────────────────────────────────────
def binary_search_recursive(
    arr: list[int], target: int, lo: int = 0, hi: int | None = None
) -> int:
    if hi is None:
        hi = len(arr) - 1
    if lo > hi:
        return -1
    mid = lo + (hi - lo) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return binary_search_recursive(arr, target, mid + 1, hi)
    return binary_search_recursive(arr, target, lo, mid - 1)


# ── Usage ──────────────────────────────────────────────────────
arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 72]
print(binary_search(arr, 23))   # → 5
print(binary_search(arr, 99))   # → -1`,
      annotations: [
        {
          lines: "1-6",
          note: "Function signature and docstring. The iterative version uses O(1) extra space — no call stack growth.",
        },
        {
          lines: "8",
          note: "`while lo <= hi` is the loop invariant: target can only exist in arr[lo..hi]. When lo > hi the range is empty.",
        },
        {
          lines: "10",
          note: "`lo + (hi - lo) // 2` prevents integer overflow that `(lo + hi) // 2` would cause in C/Java with 32-bit ints.",
        },
        {
          lines: "12-16",
          note: "Three-way comparison: equal → found; less → target is right of mid; greater → target is left of mid.",
        },
        {
          lines: "18",
          note: "Return -1 only after the loop exits, meaning lo > hi and the search space is exhausted.",
        },
        {
          lines: "21-33",
          note: "Recursive variant is cleaner to read but uses O(log n) stack space. Prefer iterative in production for large arrays.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        { case: "Best", notation: "O(1)", note: "Target is exactly at the first mid index." },
        {
          case: "Average",
          notation: "O(log n)",
          note: "Expected ⌈log₂ n⌉ comparisons over random targets.",
        },
        {
          case: "Worst",
          notation: "O(log n)",
          note: "Target is at the boundary or absent; full log-depth traversal.",
        },
      ],
      space: [
        {
          variant: "Iterative",
          notation: "O(1)",
          note: "Only lo, hi, mid variables — no auxiliary data structures.",
        },
        {
          variant: "Recursive",
          notation: "O(log n)",
          note: "Call stack depth equals the number of halvings.",
        },
      ],
      insights: [
        "Binary search is optimal for comparison-based search on sorted data: no algorithm can do better than O(log n) comparisons in the worst case.",
        "For n = 1,000,000 elements, binary search needs at most 20 comparisons; linear search needs up to 1,000,000.",
        "The prerequisite — a sorted array — costs O(n log n) to build once, but pays off if the array is queried many times.",
      ],
    },

    variations: {
      heading: "Variations & Tips",
      variations: [
        {
          name: "Find First Occurrence",
          description:
            "When duplicates exist, continue searching left even after a match (set hi = mid − 1 on equality) to find the leftmost index.",
        },
        {
          name: "Find Last Occurrence",
          description:
            "Mirror of above: on equality set lo = mid + 1 and record the last valid mid.",
        },
        {
          name: "Search Insert Position (LeetCode 35)",
          description:
            "Return lo after the loop exits — lo is the index where target would be inserted to keep the array sorted.",
        },
        {
          name: "Binary Search on Answer",
          description:
            "Apply binary search over the *answer space* (e.g., minimum capacity, maximum distance) rather than an array index when the predicate is monotone.",
        },
        {
          name: "Exponential / Galloping Search",
          description:
            "For unbounded or very large arrays, first find a range [2^k, 2^(k+1)] containing the target in O(log n), then binary search within it.",
        },
      ],
      tips: [
        "Always verify the array is sorted before applying binary search — unsorted input produces incorrect results silently.",
        "Use `bisect.bisect_left` / `bisect.bisect_right` from Python's standard library for production code; they are battle-tested and handle edge cases.",
        "When implementing manually, draw the lo/hi/mid pointers on paper for a small example to catch off-by-one errors before coding.",
        "Binary search is the foundation of many advanced algorithms: B-trees, segment trees, fractional cascading, and sorted-set operations all rely on it.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Binary search achieves O(log n) time by exploiting the sorted order to eliminate half the search space per step.",
        "The iterative implementation is preferred in practice: O(1) space and no risk of stack overflow.",
        "The loop invariant `lo <= hi` and the update rules `lo = mid + 1` / `hi = mid − 1` are the two critical correctness details.",
        "Use `mid = lo + (hi − lo) // 2` to be safe against integer overflow in 32-bit environments.",
        "Binary search generalises beyond array lookup — any monotone predicate over an ordered domain can be searched in O(log n).",
        "Python's `bisect` module provides production-ready binary search; reach for it before rolling your own.",
      ],
    },
  },
};

export default function BinarySearchVideo() {
  return <AlgoVideo config={config} />;
}
