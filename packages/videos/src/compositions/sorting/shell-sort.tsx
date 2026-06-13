import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Shell Sort",
  subtitle:
    "Generalization of insertion sort that allows exchange of items far apart, using a diminishing gap se",
  category: "sorting",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does Shell Sort Solve?",
      bullets: [
        "Insertion sort is efficient for nearly-sorted arrays but slow (O(n²)) for randomly ordered data.",
        "The bottleneck: elements can only move one position at a time, requiring many small shifts.",
        "Shell sort breaks this limitation by first comparing and swapping elements that are far apart.",
        "This dramatically reduces the total number of movements needed before the final pass.",
        "The result is a significantly faster in-place sorting algorithm with no extra memory required.",
      ],
    },

    intuition: {
      heading: "The Core Idea: Sort at a Distance First",
      bullets: [
        "Choose a gap sequence (e.g., n/2, n/4, …, 1). Start with a large gap.",
        "Perform an insertion-sort-like pass comparing elements that are 'gap' positions apart.",
        "A large gap means big elements quickly jump toward the end, small ones toward the start.",
        "Progressively halve the gap. Each pass leaves the array more ordered than before.",
        "When gap = 1, the array is nearly sorted, so the final insertion sort pass is very fast.",
      ],
      analogy:
        "Think of organizing a bookshelf. Instead of moving each book one slot at a time, you first do a rough sort by moving books across large distances (gap = 8), then medium distances (gap = 4), then fine-tune (gap = 1). Each coarse pass makes the next finer pass trivial.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the unsorted array.",
          arrayState: {
            values: [64, 34, 25, 12, 22, 11, 90],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 2,
          description:
            "Compute initial gap = n/2 = 7/2 = 3. We will compare elements 3 positions apart.",
          arrayState: {
            values: [64, 34, 25, 12, 22, 11, 90],
            colors: [
              "highlight",
              "default",
              "default",
              "highlight",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 3,
          description:
            "Gap=3, compare index 0 (64) and index 3 (12). 64 > 12, so swap.",
          arrayState: {
            values: [12, 34, 25, 64, 22, 11, 90],
            colors: [
              "sorted",
              "default",
              "default",
              "active",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 4,
          description:
            "Gap=3, compare index 1 (34) and index 4 (22). 34 > 22, so swap.",
          arrayState: {
            values: [12, 22, 25, 64, 34, 11, 90],
            colors: [
              "sorted",
              "sorted",
              "default",
              "default",
              "active",
              "default",
              "default",
            ],
          },
        },
        {
          step: 5,
          description:
            "Gap=3, compare index 2 (25) and index 5 (11). 25 > 11, swap. Then compare index 5 (25) and index 2 — done.",
          arrayState: {
            values: [12, 22, 11, 64, 34, 25, 90],
            colors: [
              "sorted",
              "sorted",
              "active",
              "default",
              "default",
              "sorted",
              "default",
            ],
          },
        },
        {
          step: 6,
          description:
            "Gap=3, compare index 3 (64) and index 6 (90). 64 < 90, no swap. Gap=3 pass complete.",
          arrayState: {
            values: [12, 22, 11, 64, 34, 25, 90],
            colors: [
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
            ],
          },
        },
        {
          step: 7,
          description:
            "Halve the gap: gap = 3/2 = 1. Now perform standard insertion sort (gap=1).",
          arrayState: {
            values: [12, 22, 11, 64, 34, 25, 90],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 8,
          description:
            "Insertion sort (gap=1): 11 bubbles left past 22 and 12 to its correct position.",
          arrayState: {
            values: [11, 12, 22, 64, 34, 25, 90],
            colors: [
              "sorted",
              "sorted",
              "sorted",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 9,
          description:
            "Insertion sort continues: 34 moves left past 64. 25 moves left past 64 and 34.",
          arrayState: {
            values: [11, 12, 22, 25, 34, 64, 90],
            colors: [
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "active",
              "default",
            ],
          },
        },
        {
          step: 10,
          description:
            "90 is already in place. The array is fully sorted. Total passes: 2 (gap=3, gap=1).",
          arrayState: {
            values: [11, 12, 22, 25, 34, 64, 90],
            colors: [
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
              "sorted",
            ],
          },
        },
      ],
    },

    code: {
      heading: "Shell Sort Implementation",
      language: "python",
      snippet: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        # Perform a gapped insertion sort for this gap size.
        # The first gap elements arr[0..gap-1] are already in
        # gapped order; keep adding one more element until the
        # entire array is gap-sorted.
        for i in range(gap, n):
            temp = arr[i]
            j = i

            # Shift earlier gap-sorted elements up until we
            # find the correct location for arr[i].
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap

            # Place temp (the original arr[i]) in its correct location.
            arr[j] = temp

        # Reduce the gap for the next pass.
        gap //= 2

    return arr


# Example usage
if __name__ == "__main__":
    data = [64, 34, 25, 12, 22, 11, 90]
    print("Before:", data)
    shell_sort(data)
    print("After: ", data)
`,
      annotations: [
        {
          lines: [3],
          note: "Initial gap is half the array length. This is the Knuth/Shell original sequence.",
        },
        {
          lines: [5],
          note: "Outer loop: keep halving the gap until it reaches 0.",
        },
        {
          lines: [10, 11],
          note: "Inner for-loop: for each element starting at index 'gap', treat it as the key to insert.",
        },
        {
          lines: [14, 15, 16, 17],
          note: "While loop: shift elements to the right by 'gap' positions until the correct slot is found — this is insertion sort at a distance.",
        },
        {
          lines: [20],
          note: "Place the saved key into its correct gap-sorted position.",
        },
        {
          lines: [23],
          note: "Halving the gap. When gap becomes 1 this is a plain insertion sort on a nearly-sorted array — very fast.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n log n)",
          note: "Already sorted; each pass makes no swaps.",
        },
        {
          case: "Average",
          complexity: "O(n log² n)",
          note: "Depends heavily on gap sequence chosen.",
        },
        {
          case: "Worst",
          complexity: "O(n²)",
          note: "Worst case with Knuth's original n/2 gap sequence.",
        },
      ],
      spaceRows: [
        {
          type: "Auxiliary",
          complexity: "O(1)",
          note: "In-place sorting; only a single temp variable needed.",
        },
      ],
      insights: [
        "The choice of gap sequence dramatically affects performance. Ciura's sequence (1, 4, 10, 23, 57, 132, 301, 701) gives best known empirical results.",
        "With Hibbard's sequence (2^k − 1) the worst-case improves to O(n^(3/2)), better than the naive n/2 halving.",
        "Shell sort is not stable — equal elements may change relative order during the gap passes.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Knuth's Sequence",
          description:
            "Uses gaps (3^k − 1)/2: 1, 4, 13, 40, 121, … Provides O(n^(3/2)) worst-case performance.",
        },
        {
          name: "Hibbard's Sequence",
          description:
            "Gaps 2^k − 1: 1, 3, 7, 15, 31, … Proven O(n^(3/2)) worst case, better than the simple halving.",
        },
        {
          name: "Ciura's Sequence",
          description:
            "Empirically derived: 1, 4, 10, 23, 57, 132, 301, 701. Best practical performance on real data but no proven big-O bound.",
        },
        {
          name: "Pratt's Sequence",
          description:
            "Uses all numbers of the form 2^p × 3^q. Achieves O(n log² n) worst case at the cost of more passes.",
        },
        {
          name: "Sedgewick's Sequence",
          description:
            "Interleaves two geometric series to produce gaps with O(n^(4/3)) worst case and excellent average-case behavior.",
        },
      ],
      tips: [
        "For arrays under ~5000 elements, shell sort often outperforms heap sort and quicksort due to low constant factors and cache friendliness.",
        "Shell sort is a good choice in embedded systems where memory is constrained and a simple in-place algorithm is needed.",
        "Avoid the naive n/2 halving in production; switch to Ciura's or Sedgewick's sequence for noticeably better real-world speed.",
        "Shell sort is not stable, so if preserving the relative order of equal elements matters, use merge sort or Timsort instead.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Shell sort is a generalization of insertion sort that sorts elements at decreasing gap intervals.",
        "Large initial gaps move elements close to their final positions quickly, making later passes cheap.",
        "The gap sequence is the single most important tuning parameter — Ciura's sequence is the practical default.",
        "Time complexity ranges from O(n log n) to O(n²) depending on gap sequence; space is always O(1).",
        "Shell sort is not stable, but it is in-place and cache-friendly, making it ideal for memory-constrained environments.",
        "It outperforms O(n²) algorithms like plain insertion sort and bubble sort on medium-sized inputs while requiring no extra memory.",
      ],
    },
  },
};

export default function ShellSortVideo() {
  return <AlgoVideo config={config} />;
}
