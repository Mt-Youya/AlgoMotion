import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Bubble Sort",
  subtitle:
    "Repeatedly swaps adjacent elements that are in the wrong order until the array is sorted.",
  category: "sorting",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Bubble Sort?",
      bullets: [
        "Given an unsorted array of numbers, rearrange them in ascending (or descending) order.",
        "The algorithm makes multiple passes through the array, comparing each adjacent pair.",
        "If two neighbouring elements are in the wrong order they are swapped immediately.",
        "After each full pass the next-largest unsorted element 'bubbles up' to its final position.",
        "The process repeats until an entire pass completes with zero swaps, confirming the array is sorted.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of each element as a bubble — heavy ones sink, light ones rise through repeated comparisons.",
        "After pass 1 the largest element is guaranteed to be at the last index.",
        "After pass k, the k largest elements occupy the last k positions and never need to move again.",
        "An 'early-exit' flag detects when no swap happened in a pass, short-circuiting the remaining work.",
        "The algorithm is in-place (O(1) extra space) and stable (equal elements keep their relative order).",
      ],
      analogy:
        "Imagine sorting a row of people by height. You walk from left to right; whenever a taller person stands in front of a shorter one you swap them. After one walk the tallest person is at the far right. Repeat for the remaining people and the line is sorted.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with the unsorted input array.",
          array: {
            values: [5, 3, 8, 1, 4, 2],
            colors: ["white", "white", "white", "white", "white", "white"],
          },
        },
        {
          step: 2,
          description: "Pass 1, compare index 0 and 1: 5 > 3 → swap.",
          array: {
            values: [3, 5, 8, 1, 4, 2],
            colors: ["yellow", "yellow", "white", "white", "white", "white"],
          },
        },
        {
          step: 3,
          description: "Compare index 1 and 2: 5 < 8 → no swap.",
          array: {
            values: [3, 5, 8, 1, 4, 2],
            colors: ["white", "yellow", "yellow", "white", "white", "white"],
          },
        },
        {
          step: 4,
          description: "Compare index 2 and 3: 8 > 1 → swap.",
          array: {
            values: [3, 5, 1, 8, 4, 2],
            colors: ["white", "white", "yellow", "yellow", "white", "white"],
          },
        },
        {
          step: 5,
          description: "Compare index 3 and 4: 8 > 4 → swap.",
          array: {
            values: [3, 5, 1, 4, 8, 2],
            colors: ["white", "white", "white", "yellow", "yellow", "white"],
          },
        },
        {
          step: 6,
          description: "Compare index 4 and 5: 8 > 2 → swap. 8 is now in its final position.",
          array: {
            values: [3, 5, 1, 4, 2, 8],
            colors: ["white", "white", "white", "white", "yellow", "green"],
          },
        },
        {
          step: 7,
          description: "Pass 2 completes: 5 bubbles to index 4.",
          array: {
            values: [3, 1, 4, 2, 5, 8],
            colors: ["white", "white", "white", "white", "green", "green"],
          },
        },
        {
          step: 8,
          description: "Pass 3 completes: 4 settles at index 3.",
          array: {
            values: [1, 3, 2, 4, 5, 8],
            colors: ["white", "white", "white", "green", "green", "green"],
          },
        },
        {
          step: 9,
          description: "Pass 4 completes: 3 settles at index 2.",
          array: {
            values: [1, 2, 3, 4, 5, 8],
            colors: ["white", "white", "green", "green", "green", "green"],
          },
        },
        {
          step: 10,
          description: "Pass 5: no swaps needed — early-exit triggers. Array is fully sorted.",
          array: {
            values: [1, 2, 3, 4, 5, 8],
            colors: ["green", "green", "green", "green", "green", "green"],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def bubble_sort(arr: list[int]) -> list[int]:
    """
    Sort arr in-place using Bubble Sort.
    Returns the sorted array.
    """
    n = len(arr)

    for i in range(n - 1):
        # Track whether any swap occurred in this pass
        swapped = False

        # Inner loop shrinks by i each pass because
        # the last i elements are already in place
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        # Early exit: if no swap happened, array is sorted
        if not swapped:
            break

    return arr


# Example usage
if __name__ == "__main__":
    data = [5, 3, 8, 1, 4, 2]
    print("Before:", data)
    bubble_sort(data)
    print("After: ", data)  # [1, 2, 3, 4, 5, 8]
`,
      annotations: [
        {
          lines: [1, 2, 3],
          note: "Function signature accepts a list of ints and sorts in-place, returning the same list.",
        },
        {
          lines: [7],
          note: "Outer loop runs at most n-1 passes. Each pass guarantees one more element reaches its final position.",
        },
        {
          lines: [9, 10],
          note: "'swapped' flag enables the early-exit optimisation that makes best-case O(n) for already-sorted input.",
        },
        {
          lines: [12, 13],
          note: "The inner loop bound shrinks by i each pass — no need to re-examine the already-sorted suffix.",
        },
        {
          lines: [14, 15, 16, 17],
          note: "Single comparison-and-swap using Python's tuple unpacking — no temporary variable needed.",
        },
        {
          lines: [20, 21],
          note: "If swapped is still False after a full inner pass, every adjacent pair is in order and we can stop.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n)",
          explanation: "Array already sorted; early-exit fires after one pass with zero swaps.",
        },
        {
          case: "Average",
          notation: "O(n²)",
          explanation: "Random input requires roughly n²/4 comparisons and n²/4 swaps on average.",
        },
        {
          case: "Worst",
          notation: "O(n²)",
          explanation: "Reverse-sorted array forces a swap on every comparison — n(n-1)/2 total swaps.",
        },
      ],
      spaceRows: [
        {
          type: "Auxiliary",
          notation: "O(1)",
          explanation: "Sorting is done in-place using only a constant number of extra variables.",
        },
      ],
      insights: [
        "Bubble Sort is stable — equal elements are never swapped, so their original relative order is preserved.",
        "Despite O(n²) average complexity it can outperform faster algorithms on tiny arrays due to zero overhead.",
        "The early-exit optimisation makes it adaptive: nearly-sorted input runs in near-linear time.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Optimised Bubble Sort (early exit)",
          description:
            "Adds a boolean 'swapped' flag. If a full pass makes no swaps the loop terminates early, achieving O(n) best case.",
        },
        {
          name: "Cocktail Shaker Sort (Bidirectional Bubble Sort)",
          description:
            "Alternates direction each pass — left-to-right then right-to-left. Reduces the number of passes needed for certain inputs like 'turtles' (small values near the end).",
        },
        {
          name: "Odd-Even Sort (Brick Sort)",
          description:
            "Compares odd-indexed pairs and even-indexed pairs in alternating phases. Naturally parallelisable on multi-core hardware.",
        },
        {
          name: "Comb Sort",
          description:
            "Generalises Bubble Sort by using a shrinking gap (starting large) to eliminate turtles quickly, achieving O(n log n) average with a gap-shrink factor of 1.3.",
        },
        {
          name: "Gnome Sort",
          description:
            "A simplification where a single pointer moves forward on no-swap and backward after a swap, achieving the same O(n²) worst case with even simpler code.",
        },
      ],
      tips: [
        "Use Bubble Sort only for educational purposes or arrays with fewer than ~20 elements where simplicity matters more than speed.",
        "Always add the early-exit flag — it costs one boolean and can turn an O(n²) run into O(n) for nearly-sorted data.",
        "For production code prefer Python's built-in sort (Timsort) which is O(n log n) and highly optimised for real-world data.",
        "When teaching sorting algorithms, Bubble Sort's visual clarity (elements literally bubble up) makes it the best starting point before introducing Merge Sort or Quick Sort.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Bubble Sort repeatedly compares and swaps adjacent pairs, causing large elements to 'bubble' toward the end of the array.",
        "Each pass places at least one element in its final sorted position, so at most n-1 passes are needed.",
        "The early-exit optimisation detects a sorted array in a single O(n) pass, making the algorithm adaptive.",
        "Time complexity is O(n²) in the average and worst case, making it impractical for large datasets.",
        "It is in-place (O(1) space) and stable, which are useful properties for constrained environments.",
        "Despite its inefficiency, Bubble Sort is the canonical introductory sorting algorithm due to its simplicity and visual intuitiveness.",
      ],
    },
  },
};

export default function BubbleSortVideo() {
  return <AlgoVideo config={config} />;
}
