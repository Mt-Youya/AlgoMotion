import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Linear Search",
  subtitle: "Sequentially checks each element until the target is found or the array is exhausted.",
  category: "search",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "Find a Value in an Unsorted Array",
      body: [
        "Given an array of n elements, determine whether a target value exists in the array.",
        "If the target is found, return the index of its first occurrence.",
        "If the target is not present, return -1 to indicate absence.",
        "The array does not need to be sorted — linear search works on any sequence.",
        "This is the most fundamental search algorithm and the basis for understanding more advanced techniques.",
      ],
      callout:
        "Linear Search is the only search algorithm that works correctly on unsorted data without preprocessing.",
    },
    intuition: {
      heading: "Scan Every Element, One by One",
      body: [
        "Start at the first element (index 0) and compare it to the target.",
        "If it matches, we're done — return the current index immediately.",
        "If it doesn't match, move to the next element and repeat.",
        "Continue until either a match is found or the entire array is exhausted.",
        "The simplicity of this approach makes it easy to implement and reason about correctness.",
      ],
      analogy:
        "Imagine searching for a specific book on a shelf with no labels. You pick up each book from left to right, check the title, and stop the moment you find the one you want. If you reach the end without finding it, the book isn't there.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial State",
          description: "We have an unsorted array [7, 2, 9, 4, 11, 3, 6] and we want to find target = 11.",
          array: [
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 11, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Check Index 0",
          description: "Compare arr[0] = 7 with target = 11. They are not equal, so move to the next index.",
          array: [
            { value: 7, color: "#E05A3A" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 11, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Check Index 1",
          description: "Compare arr[1] = 2 with target = 11. Not equal. Continue scanning forward.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#E05A3A" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 11, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Check Index 2",
          description: "Compare arr[2] = 9 with target = 11. Not equal. Each comparison takes O(1) time.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#E05A3A" },
            { value: 4, color: "#2255CC" },
            { value: 11, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Check Index 3",
          description: "Compare arr[3] = 4 with target = 11. Not equal. We've scanned 4 elements so far.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 4, color: "#E05A3A" },
            { value: 11, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Check Index 4 — Match!",
          description: "Compare arr[4] = 11 with target = 11. They are EQUAL! Return index 4 immediately.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 4, color: "#DDE4F0" },
            { value: 11, color: "#CEEB5A" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Early Termination",
          description: "We stop as soon as the target is found. Elements at indices 5 and 6 are never examined.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 4, color: "#DDE4F0" },
            { value: 11, color: "#CEEB5A" },
            { value: 3, color: "#888899" },
            { value: 6, color: "#888899" },
          ],
        },
        {
          label: "Not Found Case",
          description: "If target = 99 were searched, all 7 elements would be checked and -1 would be returned.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 4, color: "#DDE4F0" },
            { value: 11, color: "#DDE4F0" },
            { value: 3, color: "#DDE4F0" },
            { value: 6, color: "#E05A3A" },
          ],
        },
        {
          label: "Result",
          description: "Linear Search returned index 4 for target 11. The algorithm is correct and simple.",
          array: [
            { value: 7, color: "#DDE4F0" },
            { value: 2, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 4, color: "#DDE4F0" },
            { value: 11, color: "#CEEB5A" },
            { value: 3, color: "#DDE4F0" },
            { value: 6, color: "#DDE4F0" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def linear_search(arr: list, target) -> int:
    """
    Search for target in arr.
    Returns the index of the first occurrence,
    or -1 if target is not found.

    Time:  O(n) worst/average, O(1) best
    Space: O(1)
    """
    n = len(arr)

    for i in range(n):
        if arr[i] == target:
            return i          # found — return index immediately

    return -1                 # exhausted array — not found


def linear_search_all(arr: list, target) -> list[int]:
    """Return all indices where target appears."""
    return [i for i, val in enumerate(arr) if val == target]


# Example usage
arr = [7, 2, 9, 4, 11, 3, 6]
idx = linear_search(arr, 11)   # returns 4
idx = linear_search(arr, 99)   # returns -1`,
      annotations: [
        {
          lines: [1],
          note: "Function signature: accepts any list and any comparable target value. No type constraints needed.",
        },
        {
          lines: [11, 12],
          note: "The core loop iterates from index 0 to n-1. Each iteration performs exactly one comparison.",
        },
        {
          lines: [13, 14],
          note: "Early return on match — we don't scan remaining elements. Best case is O(1) when target is at index 0.",
        },
        {
          lines: [16],
          note: "Return -1 after the loop ends without finding the target. This is the standard sentinel for 'not found'.",
        },
        {
          lines: [19, 20],
          note: "Variant: find ALL occurrences using a list comprehension. This always scans the full array — O(n).",
        },
        {
          lines: [23, 24, 25],
          note: "Usage examples: searching for 11 returns index 4; searching for 99 returns -1 (not present).",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(1)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary Space", value: "O(1)", color: "#CEEB5A" },
        { label: "Input Space", value: "O(n)", color: "#888899" },
      ],
      notes: [
        "Best case O(1): the target is the very first element — one comparison and done.",
        "Worst case O(n): the target is the last element or absent — all n elements are examined.",
        "Linear Search has no preprocessing cost, making it ideal for small or one-time searches where sorting overhead is not justified.",
      ],
    },
    variations: {
      items: [
        "Sentinel Linear Search: place the target at the end of the array to eliminate the bounds check inside the loop, reducing branch overhead.",
        "Transposition Heuristic: after each successful search, swap the found element one position toward the front to speed up future searches for the same value.",
        "Move-to-Front Heuristic: move the found element directly to index 0 — optimal for highly skewed access patterns.",
        "Bidirectional Linear Search: scan from both ends simultaneously, halving the number of iterations on average.",
        "Block Linear Search (Jump Search precursor): divide the array into blocks and scan block headers first before doing a linear scan within the matching block.",
      ],
      tips: [
        "Use linear search when the array is small (n < ~50) or accessed only once — the O(n log n) sorting cost would outweigh any binary search benefit.",
        "For repeated searches on the same dataset, sort the array first and switch to binary search for O(log n) per query.",
        "Linear search is the correct choice when the array is unsorted and you cannot afford to sort it (e.g., streaming data, linked lists).",
        "In hardware-accelerated environments, SIMD instructions can vectorize the comparison loop, making linear search competitive even for moderately large arrays.",
      ],
    },
    summary: {
      keyPoints: [
        "Linear Search iterates through each element sequentially and compares it to the target.",
        "Time complexity is O(n) in the worst and average case; O(1) in the best case when the target is first.",
        "Space complexity is O(1) — no extra memory is allocated beyond a loop counter.",
        "It works on any data structure that supports sequential access: arrays, linked lists, streams.",
        "For small datasets or unsorted data, linear search is often the most practical choice despite its simplicity.",
        "Understanding linear search is foundational — it motivates why sorting + binary search is a worthwhile trade-off at scale.",
      ],
    },
  },
}

export default function LinearSearchVideo() {
  return <AlgoVideo config={config} />
}
