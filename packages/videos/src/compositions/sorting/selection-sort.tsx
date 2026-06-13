import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Selection Sort",
  subtitle:
    "Finds the minimum element in the unsorted portion and places it at the beginning each pass.",
  category: "sorting",
  difficulty: "beginner",

  chapters: [
    {
      type: "problem",
      heading: "What is Selection Sort?",
      bullets: [
        "Given an unsorted array of n elements, produce a sorted array in ascending order.",
        "Selection Sort divides the array into a sorted region (left) and an unsorted region (right).",
        "In each pass, the algorithm scans the entire unsorted region to locate the minimum element.",
        "That minimum is then swapped into the first position of the unsorted region, growing the sorted region by one.",
        "The process repeats n-1 times until every element occupies its final position.",
      ],
    },

    {
      type: "intuition",
      heading: "The Core Idea",
      bullets: [
        "Think of the sorted region as a 'trophy shelf' — once an element is placed there, it never moves again.",
        "Each pass costs O(n) comparisons to find the minimum, but only O(1) swaps — ideal when writes are expensive.",
        "Unlike Bubble Sort, Selection Sort makes at most n-1 swaps total across the entire sort.",
        "The algorithm is deterministic: it always performs exactly n(n-1)/2 comparisons, regardless of input order.",
        "Because it ignores existing order, Selection Sort offers no benefit on nearly-sorted arrays.",
      ],
      analogy:
        "Imagine picking players for a sports team one at a time: each round you scan all remaining candidates and draft the best available, adding them to your roster. You never revisit a drafted player — that is Selection Sort.",
    },

    {
      type: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the full unsorted array.",
          arrayState: {
            values: [64, 25, 12, 22, 11],
            colors: ["default", "default", "default", "default", "default"],
          },
        },
        {
          step: 2,
          description:
            "Pass 1: set i = 0. Scan indices 0–4 to find the minimum value.",
          arrayState: {
            values: [64, 25, 12, 22, 11],
            colors: ["active", "scanning", "scanning", "scanning", "scanning"],
          },
        },
        {
          step: 3,
          description:
            "Minimum found: value 11 at index 4. Swap index 0 with index 4.",
          arrayState: {
            values: [11, 25, 12, 22, 64],
            colors: ["sorted", "default", "default", "default", "default"],
          },
        },
        {
          step: 4,
          description:
            "Pass 2: set i = 1. Scan indices 1–4 to find the next minimum.",
          arrayState: {
            values: [11, 25, 12, 22, 64],
            colors: ["sorted", "active", "scanning", "scanning", "scanning"],
          },
        },
        {
          step: 5,
          description:
            "Minimum found: value 12 at index 2. Swap index 1 with index 2.",
          arrayState: {
            values: [11, 12, 25, 22, 64],
            colors: ["sorted", "sorted", "default", "default", "default"],
          },
        },
        {
          step: 6,
          description:
            "Pass 3: set i = 2. Scan indices 2–4. Minimum is 22 at index 3. Swap index 2 with index 3.",
          arrayState: {
            values: [11, 12, 22, 25, 64],
            colors: ["sorted", "sorted", "sorted", "default", "default"],
          },
        },
        {
          step: 7,
          description:
            "Pass 4: set i = 3. Scan indices 3–4. Minimum is 25 at index 3 (already in place). No swap needed.",
          arrayState: {
            values: [11, 12, 22, 25, 64],
            colors: ["sorted", "sorted", "sorted", "sorted", "default"],
          },
        },
        {
          step: 8,
          description:
            "Pass 5: only one element remains at index 4. It is trivially sorted.",
          arrayState: {
            values: [11, 12, 22, 25, 64],
            colors: ["sorted", "sorted", "sorted", "sorted", "sorted"],
          },
        },
        {
          step: 9,
          description:
            "Array is fully sorted. Total comparisons: 10 = n(n-1)/2 for n = 5. Total swaps: ≤ 4 = n-1.",
          arrayState: {
            values: [11, 12, 22, 25, 64],
            colors: ["sorted", "sorted", "sorted", "sorted", "sorted"],
          },
        },
      ],
    },

    {
      type: "code",
      heading: "Python Implementation",
      language: "python",
      snippet: `def selection_sort(arr: list[int]) -> list[int]:
    """
    Sort arr in-place using Selection Sort.
    Time:  O(n^2) — best, average, and worst
    Space: O(1)   — in-place, no auxiliary storage
    """
    n = len(arr)

    for i in range(n - 1):
        # Assume the first element of the unsorted region is the minimum
        min_idx = i

        # Scan the rest of the unsorted region for a smaller element
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap the found minimum into its final position
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr


# Example usage
if __name__ == "__main__":
    data = [64, 25, 12, 22, 11]
    print("Before:", data)
    selection_sort(data)
    print("After: ", data)
    # After:  [11, 12, 22, 25, 64]
`,
      annotations: [
        {
          lines: [9, 9],
          note: "Outer loop runs n-1 times; the last element is automatically in place after n-1 passes.",
        },
        {
          lines: [11, 11],
          note: "Track the index of the current minimum, starting with the first unsorted position i.",
        },
        {
          lines: [14, 16],
          note: "Inner scan updates min_idx whenever a smaller element is found. This costs O(n-i) comparisons per pass.",
        },
        {
          lines: [19, 20],
          note: "Skip the swap when the minimum is already in position — avoids an unnecessary write.",
        },
        {
          lines: [19, 20],
          note: "At most n-1 swaps total across the whole sort, making Selection Sort efficient when writes are costly.",
        },
        {
          lines: [1, 7],
          note: "The function sorts in-place and also returns arr for convenience; no extra array is allocated.",
        },
      ],
    },

    {
      type: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n²)",
          note: "Still scans the full unsorted region every pass — no early exit.",
        },
        {
          case: "Average",
          complexity: "O(n²)",
          note: "n(n-1)/2 comparisons on every input regardless of distribution.",
        },
        {
          case: "Worst",
          complexity: "O(n²)",
          note: "Reverse-sorted input: every pass finds the minimum at the last index.",
        },
      ],
      spaceRows: [
        {
          type: "Auxiliary",
          complexity: "O(1)",
          note: "Only a handful of index variables; no extra arrays.",
        },
        {
          type: "Total",
          complexity: "O(n)",
          note: "Input array itself; the algorithm is fully in-place.",
        },
      ],
      insights: [
        "Selection Sort makes at most n-1 swaps — the fewest of any comparison-based sort — making it attractive when memory writes are expensive (e.g., flash storage).",
        "Its O(n²) comparison count is identical to Bubble Sort, but Selection Sort is usually faster in practice because it performs far fewer swaps.",
        "Selection Sort is not stable: swapping non-adjacent elements can change the relative order of equal keys. A stable variant exists but requires shifting instead of swapping, increasing write cost.",
      ],
    },

    {
      type: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Stable Selection Sort",
          description:
            "Instead of swapping, shift elements rightward to insert the minimum at position i. Preserves relative order of equal elements at the cost of O(n) writes per pass instead of O(1).",
        },
        {
          name: "Bidirectional (Cocktail) Selection Sort",
          description:
            "Each pass finds both the minimum and maximum simultaneously, placing them at the left and right boundaries. Halves the number of passes to ⌈n/2⌉ while keeping O(n²) comparisons.",
        },
        {
          name: "Heap Sort",
          description:
            "Replaces the linear scan with a max-heap to find the next maximum in O(log n). Achieves O(n log n) time while retaining the in-place, ≤ n-1 swap property.",
        },
        {
          name: "Selection Sort on Linked Lists",
          description:
            "On singly linked lists, finding the minimum still costs O(n), but the 'swap' becomes a pointer re-link — no random access needed, making it more natural than Insertion Sort here.",
        },
        {
          name: "Partial Selection Sort (k smallest)",
          description:
            "Run only k passes to extract the k smallest elements in O(kn) time. Useful when k << n and a full sort is unnecessary.",
        },
      ],
      tips: [
        "Prefer Selection Sort over Bubble Sort when the data source has expensive writes (e.g., EEPROM, SD cards) because it guarantees at most n-1 swaps.",
        "For n ≤ 20–30 elements, Selection Sort's simplicity and low overhead often outperform asymptotically superior algorithms in practice.",
        "Avoid Selection Sort on nearly-sorted data — it provides no short-circuit mechanism and will always perform O(n²) comparisons.",
        "When stability is required and write cost is not a concern, Insertion Sort is usually the better O(n²) choice for small arrays.",
      ],
    },

    {
      type: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Selection Sort repeatedly selects the minimum from the unsorted region and places it at the boundary of the sorted region.",
        "Time complexity is O(n²) in all cases — best, average, and worst — because no input ordering can reduce the number of comparisons.",
        "Space complexity is O(1): the algorithm sorts in-place using only a constant number of extra variables.",
        "At most n-1 swaps are performed across the entire sort, making it the preferred simple sort when write operations are costly.",
        "The algorithm is not stable by default; equal elements may be reordered unless a shift-based variant is used.",
        "Selection Sort is primarily educational and suitable for very small arrays or write-constrained environments; for general use, prefer Merge Sort or Tim Sort.",
      ],
    },
  ],
};

export default function SelectionSortVideo() {
  return <AlgoVideo config={config} />;
}
