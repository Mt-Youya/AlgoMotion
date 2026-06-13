import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Exponential Search",
  subtitle:
    "Finds the range where the target may exist by doubling the index, then applies binary search within ",
  category: "search",
  difficulty: "intermediate",

  chapters: [
    // ── Problem ────────────────────────────────────────────────────────
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given a **sorted array** of n elements, find the index of a target value.",
        "Naive linear search costs O(n); binary search costs O(log n) but needs the full range.",
        "Exponential search is ideal when the array is **unbounded** or very large and the target is near the beginning.",
        "The algorithm first locates a range [i/2, i] where the target *might* exist, then delegates to binary search.",
        "Returns the index of the target, or -1 if it is not present in the array.",
      ],
    },

    // ── Intuition ──────────────────────────────────────────────────────
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Think of flipping pages in a phone book: start at page 1, jump to 2, 4, 8, 16… until you overshoot.",
        "Once you overshoot, the target must be between the previous jump and the current one — a much smaller range.",
        "Binary search on that narrow range finishes in O(log i) where i ≈ position of target.",
        "For targets near the front of the array this is *faster* than a full binary search over the whole array.",
        "The doubling phase costs O(log i) comparisons; the binary search phase also costs O(log i), giving O(log i) overall.",
      ],
      analogy:
        "Imagine searching for a word in a dictionary by first flipping to page 1, then 2, 4, 8, 16 … until the current page's words come after your word. You then binary-search only the pages between the previous and current position.",
    },

    // ── Walkthrough ────────────────────────────────────────────────────
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with sorted array and target = 14.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","default","default","default",
              "default","default","default","default","default",
            ],
          },
        },
        {
          step: 2,
          description: "Check index 0 first. arr[0]=1 ≠ 14, so continue.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "orange","default","default","default","default",
              "default","default","default","default","default",
            ],
          },
        },
        {
          step: 3,
          description: "i=1: arr[1]=3 < 14. Double → i=2.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","yellow","default","default","default",
              "default","default","default","default","default",
            ],
          },
        },
        {
          step: 4,
          description: "i=2: arr[2]=5 < 14. Double → i=4.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","yellow","default","default",
              "default","default","default","default","default",
            ],
          },
        },
        {
          step: 5,
          description: "i=4: arr[4]=9 < 14. Double → i=8.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","default","default","yellow",
              "default","default","default","default","default",
            ],
          },
        },
        {
          step: 6,
          description: "i=8: arr[8]=22 >= 14. Stop doubling. Range found: [i/2, i] = [4, 8].",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","default","default","blue",
              "blue","blue","blue","red","default",
            ],
          },
        },
        {
          step: 7,
          description: "Apply binary search in indices [4..8]. mid = (4+8)//2 = 6.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","default","default","blue",
              "blue","orange","blue","blue","default",
            ],
          },
        },
        {
          step: 8,
          description: "arr[6]=14 == target 14. Target found at index 6!",
          array: {
            values: [1, 3, 5, 7, 9, 11, 14, 18, 22, 27],
            colors: [
              "default","default","default","default","default",
              "default","green","default","default","default",
            ],
          },
        },
        {
          step: 9,
          description: "Return index 6. Algorithm terminates successfully.",
        },
      ],
    },

    // ── Code ───────────────────────────────────────────────────────────
    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      snippet: `def binary_search(arr, low, high, target):
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


def exponential_search(arr, target):
    n = len(arr)
    if n == 0:
        return -1

    # Special case: target is at index 0
    if arr[0] == target:
        return 0

    # Find range by doubling the index
    i = 1
    while i < n and arr[i] <= target:
        i *= 2

    # Binary search in the identified range
    low = i // 2
    high = min(i, n - 1)
    return binary_search(arr, low, high, target)


# Example usage
arr = [1, 3, 5, 7, 9, 11, 14, 18, 22, 27]
print(exponential_search(arr, 14))   # Output: 6
print(exponential_search(arr, 10))   # Output: -1`,
      annotations: [
        {
          lines: [1, 8],
          note: "Standard iterative binary search helper — O(log n) within the given range.",
        },
        {
          lines: [11, 12],
          note: "Guard against empty array before any index access.",
        },
        {
          lines: [15, 16],
          note: "Constant-time early exit when the first element is the target.",
        },
        {
          lines: [19, 21],
          note: "Doubling loop: i starts at 1 and doubles each iteration. Stops when arr[i] >= target or i exceeds array bounds.",
        },
        {
          lines: [24, 26],
          note: "Narrow the range: low is the previous power-of-2 position, high is clamped to the last valid index.",
        },
        {
          lines: [27, 27],
          note: "Delegate to binary search — at most O(log i) additional comparisons.",
        },
      ],
    },

    // ── Complexity ─────────────────────────────────────────────────────
    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best Case", value: "O(1)", note: "Target is at index 0" },
        {
          label: "Average Case",
          value: "O(log i)",
          note: "i = index of target; typically O(log n)",
        },
        {
          label: "Worst Case",
          value: "O(log n)",
          note: "Target at the end or not present",
        },
      ],
      spaceRows: [
        {
          label: "Auxiliary Space",
          value: "O(1)",
          note: "Iterative binary search, no recursion stack",
        },
      ],
      insights: [
        "Exponential search outperforms binary search when the target is close to the start of the array, since it reaches the correct range in O(log i) steps rather than O(log n).",
        "It is particularly powerful for unbounded or infinite sorted arrays where the size is not known in advance.",
        "The total work is 2 × O(log i): one pass for the doubling phase and one for binary search — both logarithmic in the target's position.",
      ],
    },

    // ── Variations ─────────────────────────────────────────────────────
    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Unbounded Binary Search",
          description:
            "When the array size is unknown (e.g., an infinite stream), use exponential search to find the upper bound before applying binary search.",
        },
        {
          name: "Fibonacci Search",
          description:
            "Instead of doubling, use Fibonacci numbers to probe positions. Avoids division and can be cache-friendlier on some hardware.",
        },
        {
          name: "Interpolation Search",
          description:
            "For uniformly distributed data, estimate the probe position by interpolation. Achieves O(log log n) average but degrades to O(n) in the worst case.",
        },
        {
          name: "Recursive Exponential Search",
          description:
            "Replace the iterative doubling loop with recursion. Conceptually cleaner but adds O(log n) stack frames.",
        },
        {
          name: "Bidirectional Exponential Search",
          description:
            "Search both forward and backward from a starting hint position, useful when an approximate location is already known.",
        },
      ],
      tips: [
        "Always verify the array is sorted before running exponential search — incorrect results are silent on unsorted input.",
        "Use exponential search instead of binary search when you suspect the target is near the beginning of a large dataset.",
        "For very small arrays (n < 16), linear search is often faster due to cache locality; profile before optimising.",
        "When integrating with external storage (disk, network), the doubling phase minimises expensive I/O round-trips before the narrow binary search phase.",
      ],
    },

    // ── Summary ────────────────────────────────────────────────────────
    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "Exponential search combines a doubling phase with binary search to achieve O(log i) complexity, where i is the target's index.",
        "It is strictly better than binary search when the target is near the front of the array.",
        "The algorithm is ideal for unbounded sorted arrays where n is unknown.",
        "Space complexity is O(1) — only a handful of index variables are needed.",
        "Always handle the edge case where the target equals arr[0] before entering the doubling loop.",
        "The algorithm is a practical choice in real-world scenarios such as searching sorted log files or database indexes with skewed access patterns.",
      ],
    },
  ],
};

export default function ExponentialSearchVideo() {
  return <AlgoVideo config={config} />;
}
