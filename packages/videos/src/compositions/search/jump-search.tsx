import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Jump Search",
  subtitle: "Jumps ahead by fixed steps of √n to find the block containing the target, then scans linearly within",
  category: "search",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given a **sorted array** of n elements and a target value, find the index of the target.",
        "The array must be sorted in ascending order — this is a hard requirement for Jump Search.",
        "Return the index if found, or -1 if the target does not exist in the array.",
        "The goal is to do better than O(n) linear scan by exploiting the sorted order.",
        "Jump Search achieves O(√n) by skipping large blocks and only scanning within the relevant block.",
      ],
    },

    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Instead of checking every element, we jump forward by a fixed block size of √n.",
        "We keep jumping until we find an element **greater than or equal to** the target.",
        "Once we overshoot, we step back one block and do a linear scan within that block.",
        "The optimal block size is √n — it balances the number of jumps vs. the scan length.",
        "This gives us O(√n) jumps + O(√n) scan = O(√n) total, beating linear search.",
      ],
      analogy:
        "Like finding a word in a physical dictionary: instead of flipping page-by-page, you jump 50 pages at a time. When you go past the word, you step back and read page-by-page within that section.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          label: "Initial Array",
          description: "Start with a sorted array of 13 elements. Target = 17.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
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
          label: "Compute Step Size",
          description: "Calculate step = floor(√13) = 3. This is our jump interval.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
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
          label: "First Jump: index 3",
          description: "Jump to index 3. arr[3] = 7. Since 7 < 17, continue jumping.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "blue",
              "blue",
              "blue",
              "active",
              "default",
              "default",
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
          label: "Second Jump: index 6",
          description: "Jump to index 6. arr[6] = 13. Since 13 < 17, continue jumping.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "blue",
              "blue",
              "active",
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
          label: "Third Jump: index 9",
          description: "Jump to index 9. arr[9] = 19. Since 19 ≥ 17, STOP jumping! Block found.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "blue",
              "blue",
              "orange",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          label: "Identify the Block",
          description: "The target lies in the block between prev=6 and jump=9, i.e. indices [6, 9].",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "highlight",
              "highlight",
              "highlight",
              "highlight",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          label: "Linear Scan: index 6",
          description: "Begin linear scan. arr[6] = 13. 13 ≠ 17, move to next.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "active",
              "highlight",
              "highlight",
              "highlight",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          label: "Linear Scan: index 7",
          description: "arr[7] = 15. 15 ≠ 17, move to next.",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "active",
              "highlight",
              "highlight",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          label: "Linear Scan: index 8 — FOUND!",
          description: "arr[8] = 17. 17 == 17. TARGET FOUND at index 8!",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "found",
              "highlight",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          label: "Return Result",
          description: "Return index 8. Total work: 3 jumps + 3 linear steps = O(√n).",
          array: {
            values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
            colors: [
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "visited",
              "found",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `import math

def jump_search(arr: list[int], target: int) -> int:
    """
    Jump Search on a sorted array.
    Returns index of target, or -1 if not found.
    Time: O(√n)  |  Space: O(1)
    """
    n = len(arr)
    if n == 0:
        return -1

    step = int(math.sqrt(n))  # optimal block size
    prev = 0

    # Phase 1: Jump forward until arr[jump] >= target
    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1

    # Phase 2: Linear scan within the identified block
    while prev < min(step, n):
        if arr[prev] == target:
            return prev
        if arr[prev] > target:
            return -1
        prev += 1

    return -1


# Example usage
if __name__ == "__main__":
    data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25]
    print(jump_search(data, 17))   # Output: 8
    print(jump_search(data, 10))   # Output: -1
    print(jump_search(data, 1))    # Output: 0
    print(jump_search(data, 25))   # Output: 12
`,
      annotations: [
        {
          lines: [9, 10],
          note: "Guard against empty arrays before any computation.",
        },
        {
          lines: [12],
          note: "Step size = floor(√n). This is mathematically optimal: minimizes total comparisons across both phases.",
        },
        {
          lines: [15, 16, 17, 18, 19, 20],
          note: "Phase 1 — jumping: advance by √n each iteration. Stop when the last element of the current block is ≥ target, or we run off the end.",
        },
        {
          lines: [22, 23, 24, 25, 26, 27],
          note: "Phase 2 — linear scan: check each element in the block [prev, min(step, n)). Early exit if we overshoot.",
        },
        {
          lines: [29],
          note: "Target not found anywhere in the array.",
        },
        {
          lines: [33, 34, 35, 36, 37],
          note: "Test cases: found in middle, not found, found at start, found at end.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Complexity Analysis",
      time: [
        { case: "Best", notation: "O(1)", note: "Target is the first element checked" },
        { case: "Average", notation: "O(√n)", note: "√n jumps + up to √n linear steps" },
        { case: "Worst", notation: "O(√n)", note: "Target at end of last block or not present" },
      ],
      space: [
        { label: "Auxiliary space", notation: "O(1)", note: "Only uses a constant number of variables" },
        { label: "Input array", notation: "O(n)", note: "Read-only input, not counted as extra space" },
      ],
      insights: [
        "The √n step size is optimal: with block size k, you do n/k jumps + k linear steps. Minimizing n/k + k gives k = √n.",
        "Jump Search is faster than linear search O(n) but slower than binary search O(log n). It shines when backward traversal is expensive (e.g., magnetic tape or linked-list-like storage).",
        "Unlike binary search, Jump Search only moves forward, making it suitable for data sources where rewinding is costly.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Tips",
      variations: [
        {
          name: "Fibonacci Jump Search",
          description:
            "Uses Fibonacci numbers instead of √n as block sizes. Avoids division and works well when division is expensive.",
        },
        {
          name: "Exponential Search",
          description:
            "Doubles the jump size each step (1, 2, 4, 8, …) to find a range, then applies binary search within it. Better for unbounded/infinite arrays.",
        },
        {
          name: "Interpolation Jump Search",
          description:
            "Combines jump search's block finding with interpolation search's smarter probing within the block for uniformly distributed data.",
        },
        {
          name: "Bidirectional Jump Search",
          description:
            "Searches from both ends simultaneously, halving the number of jumps needed in the average case.",
        },
        {
          name: "Adaptive Block Size",
          description:
            "Dynamically adjusts the block size based on the density of elements or access cost, useful for non-uniform data distributions.",
        },
      ],
      tips: [
        "Always verify the array is sorted before applying Jump Search — results are undefined on unsorted data.",
        "Prefer Binary Search when random access is O(1) and the array fits in cache; use Jump Search when backward seeks are expensive.",
        "For very small arrays (n < 16), plain linear search is faster due to lower overhead.",
        "When implementing for external storage (disk, tape), tune the block size to match the physical block/sector size for optimal I/O.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Jump Search requires a **sorted array** — it is not applicable to unsorted data.",
        "Block size √n is mathematically optimal, balancing jump count against linear scan length.",
        "Time complexity is O(√n) — better than linear O(n), but worse than binary O(log n).",
        "Space complexity is O(1) — no extra memory is needed beyond a few index variables.",
        "Jump Search's main advantage over binary search is **unidirectional traversal**, ideal for sequential-access storage.",
        "The algorithm has two clear phases: a coarse block-jumping phase and a fine linear-scan phase.",
      ],
    },
  ],
}

export default function JumpSearchVideo() {
  return <AlgoVideo config={config} />
}
