import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Merge Sort",
  subtitle:
    "Recursively divides the array in half, sorts each half, then merges the two sorted halves.",
  category: "sorting",
  difficulty: "intermediate",

  chapters: [
    {
      type: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given an unsorted array of n elements, rearrange them in ascending order.",
        "The array may contain duplicate values and negative numbers.",
        "We need a stable sort — equal elements must preserve their original relative order.",
        "The solution must handle arrays of any size, from empty to millions of elements.",
        "Goal: achieve O(n log n) worst-case time complexity, better than O(n²) algorithms.",
      ],
    },

    {
      type: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Divide and conquer: a large problem is easier when broken into smaller sub-problems.",
        "A single-element array is trivially sorted — use this as the base case.",
        "Two sorted halves can be merged in O(n) time by comparing elements one by one.",
        "Recursion handles the splitting; the merge step does the real work of ordering.",
        "Every level of recursion does O(n) total work; there are O(log n) levels → O(n log n) overall.",
      ],
      analogy:
        "Think of sorting a deck of cards by splitting it into two piles, asking a friend to sort each pile, then merging the two sorted piles by always picking the smaller top card. Even without knowing how your friend sorts their pile, the merge is trivial.",
    },

    {
      type: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the unsorted input array.",
          values: [38, 27, 43, 3, 9, 82, 10],
          colors: ["default", "default", "default", "default", "default", "default", "default"],
        },
        {
          step: 2,
          description: "Split array at midpoint into left and right halves.",
          values: [38, 27, 43, 3, 9, 82, 10],
          colors: ["blue", "blue", "blue", "default", "orange", "orange", "orange"],
        },
        {
          step: 3,
          description: "Recursively split left half [38, 27, 43] into [38, 27] and [43].",
          values: [38, 27, 43],
          colors: ["blue", "blue", "green"],
        },
        {
          step: 4,
          description: "Split [38, 27] into [38] and [27] — both are base cases (single elements).",
          values: [38, 27],
          colors: ["green", "green"],
        },
        {
          step: 5,
          description: "Merge [38] and [27]: compare 38 > 27, so place 27 first → [27, 38].",
          values: [27, 38],
          colors: ["green", "green"],
        },
        {
          step: 6,
          description: "Merge [27, 38] and [43]: 27 < 43, 38 < 43 → left half exhausted → [27, 38, 43].",
          values: [27, 38, 43],
          colors: ["green", "green", "green"],
        },
        {
          step: 7,
          description: "Recursively sort right half [3, 9, 82, 10] → split into [3, 9] and [82, 10].",
          values: [3, 9, 82, 10],
          colors: ["blue", "blue", "orange", "orange"],
        },
        {
          step: 8,
          description: "Merge [3] and [9] → [3, 9]. Merge [82] and [10]: 10 < 82 → [10, 82].",
          values: [3, 9, 10, 82],
          colors: ["green", "green", "green", "green"],
        },
        {
          step: 9,
          description: "Merge [3, 9] and [10, 82]: 3 < 10, 9 < 10, then append 10, 82 → [3, 9, 10, 82].",
          values: [3, 9, 10, 82],
          colors: ["green", "green", "green", "green"],
        },
        {
          step: 10,
          description:
            "Final merge of [27, 38, 43] and [3, 9, 10, 82]: compare heads, always pick smaller.",
          values: [3, 9, 10, 27, 38, 43, 82],
          colors: ["green", "green", "green", "green", "green", "green", "green"],
        },
        {
          step: 11,
          description: "Array is fully sorted in ascending order!",
          values: [3, 9, 10, 27, 38, 43, 82],
          colors: ["green", "green", "green", "green", "green", "green", "green"],
        },
      ],
    },

    {
      type: "code",
      heading: "Python Implementation",
      snippet: `def merge_sort(arr):
    # Base case: arrays of length 0 or 1 are already sorted
    if len(arr) <= 1:
        return arr

    # Divide: find the midpoint and split
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]

    # Conquer: recursively sort each half
    left = merge_sort(left)
    right = merge_sort(right)

    # Combine: merge the two sorted halves
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0

    # Compare elements from both halves and pick the smaller one
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:   # <= preserves stability
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result


# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
sorted_arr = merge_sort(arr)
print(sorted_arr)  # [3, 9, 10, 27, 38, 43, 82]`,
      annotations: [
        {
          lines: "2-3",
          note: "Base case: a single element (or empty array) is trivially sorted. This terminates the recursion.",
        },
        {
          lines: "6-8",
          note: "Divide step: Python slicing creates new sub-arrays for left and right halves.",
        },
        {
          lines: "11-12",
          note: "Conquer step: recursive calls sort each half independently before merging.",
        },
        {
          lines: "20-28",
          note: "Core merge loop: two pointers advance through each sorted half, always appending the smaller element. The <= ensures stability.",
        },
        {
          lines: "31-32",
          note: "After one half is exhausted, the remaining elements of the other half are already sorted — extend in O(k) time.",
        },
        {
          lines: "36-38",
          note: "Driver code: demonstrates sorting [38, 27, 43, 3, 9, 82, 10] into [3, 9, 10, 27, 38, 43, 82].",
        },
      ],
    },

    {
      type: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n log n)",
          note: "Even on a sorted array, merge sort always divides and merges every level.",
        },
        {
          case: "Average",
          complexity: "O(n log n)",
          note: "Consistent performance regardless of input distribution.",
        },
        {
          case: "Worst",
          complexity: "O(n log n)",
          note: "No worst-case degradation — unlike Quick Sort's O(n²) on bad pivots.",
        },
      ],
      spaceRows: [
        {
          case: "Auxiliary",
          complexity: "O(n)",
          note: "Merge step requires a temporary array to hold merged results.",
        },
        {
          case: "Call Stack",
          complexity: "O(log n)",
          note: "Recursion depth is log n (number of times we can halve n).",
        },
      ],
      insights: [
        "Merge Sort is the only common O(n log n) algorithm that is also stable — equal elements preserve their original order.",
        "The O(n) auxiliary space is its main drawback versus in-place algorithms like Heap Sort or Quick Sort.",
        "For linked lists, Merge Sort is often preferred because merging linked lists requires no extra space.",
      ],
    },

    {
      type: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Bottom-Up Merge Sort",
          description:
            "Iterative version that merges pairs of size 1, then 2, then 4, etc. Avoids recursion overhead and call-stack depth limits.",
        },
        {
          name: "Natural Merge Sort",
          description:
            "Detects existing sorted runs in the input and uses them as starting merge units. Approaches O(n) on nearly-sorted data.",
        },
        {
          name: "Tim Sort",
          description:
            "Python's and Java's built-in sort. Combines Natural Merge Sort with Insertion Sort for small runs. Extremely fast in practice.",
        },
        {
          name: "Parallel Merge Sort",
          description:
            "The two recursive halves can be sorted on separate CPU cores simultaneously, achieving near O(n) wall-clock time with enough cores.",
        },
        {
          name: "In-Place Merge Sort",
          description:
            "Reduces auxiliary space to O(1) by merging in-place, but at the cost of O(n log² n) time due to rotation overhead.",
        },
      ],
      tips: [
        "For arrays smaller than ~16 elements, switch to Insertion Sort — the constant factor overhead of recursion outweighs the asymptotic benefit.",
        "When sorting objects with complex comparison keys, Merge Sort's stability makes it the safe default choice.",
        "Avoid re-allocating the temporary merge buffer on every call; pass a pre-allocated buffer of size n down the recursion for better cache performance.",
        "For external sorting (data too large for RAM), Merge Sort is the standard algorithm — data is split across disk files and merged in passes.",
      ],
    },

    {
      type: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Merge Sort guarantees O(n log n) time in all cases — best, average, and worst — making it highly predictable.",
        "It is a stable sort: elements with equal keys maintain their original relative order.",
        "The divide-and-conquer structure makes it naturally parallelizable and well-suited for external sorting.",
        "The primary cost is O(n) auxiliary space for the merge buffer, which may matter in memory-constrained environments.",
        "Tim Sort (Python's built-in sort) is a highly optimized descendant of Merge Sort and is the practical default for general-purpose sorting.",
        "Understanding Merge Sort builds intuition for divide-and-conquer algorithms like Binary Search, Quick Sort, and many tree/graph algorithms.",
      ],
    },
  ],
};

export default function MergeSortVideo() {
  return <AlgoVideo config={config} />;
}
