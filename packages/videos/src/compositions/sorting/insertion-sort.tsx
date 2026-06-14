import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Insertion Sort",
  subtitle: "Builds the sorted array one item at a time by inserting each new element into its correct position.",
  category: "sorting",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "How do we sort an unsorted array efficiently?",
      body: [
        "Given an array of n elements in arbitrary order, we want to rearrange them so every element is in non-decreasing order.",
        "A naive approach is to find the minimum element repeatedly, but Insertion Sort takes a different, more intuitive approach.",
        "At each step, we take the next unsorted element (the 'key') and slide it into the correct position within the already-sorted prefix.",
        "This mirrors how most people naturally sort a hand of playing cards — pick up one card at a time and slip it into place.",
        "The challenge is doing this efficiently: we need O(1) extra space while keeping the sorted portion intact after every insertion.",
      ],
      callout:
        "Insertion Sort is optimal for small arrays and nearly-sorted data. It is the inner loop of Timsort, used in Python and Java.",
    },
    intuition: {
      heading: "Think of sorting a hand of playing cards",
      body: [
        "Imagine you are dealt cards one at a time. You hold a growing sorted hand in your left hand.",
        "Each new card you pick up is the 'key'. You scan your sorted hand from right to left to find where it belongs.",
        "You shift every card that is larger than the key one position to the right, opening a slot.",
        "You drop the key into that slot. Your left hand remains sorted after every card.",
        "After all cards are dealt and inserted, your entire hand is sorted — no extra table space needed.",
      ],
      analogy:
        "Real-world analogy: sorting a hand of playing cards. You pick one card at a time and slide it left until it is in the right spot among the cards you already hold.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial Array",
          description:
            "Start with the unsorted array [5, 2, 8, 1, 9, 3, 6]. Index 0 is trivially sorted — a single element is always in order.",
          array: [
            { value: 5, color: "#CEEB5A" },
            { value: 2, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 2 (index 1)",
          description:
            "Pick up the element at index 1: key = 2. Compare with arr[0] = 5. Since 5 > 2, shift 5 one position right.",
          array: [
            { value: 5, color: "#E05A3A" },
            { value: 2, color: "#F0A030" },
            { value: 8, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Place key = 2 at index 0",
          description: "No more elements to compare. Place key = 2 at index 0. Sorted portion is now [2, 5].",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 8 (index 2)",
          description:
            "Pick up the element at index 2: key = 8. Compare with arr[1] = 5. Since 5 < 8, no shift needed. 8 stays in place.",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 1, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 1 (index 3)",
          description:
            "Pick up the element at index 3: key = 1. Compare with 8, 5, 2 — all are greater than 1, so each shifts right one position.",
          array: [
            { value: 2, color: "#E05A3A" },
            { value: 5, color: "#E05A3A" },
            { value: 8, color: "#E05A3A" },
            { value: 1, color: "#F0A030" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Place key = 1 at index 0",
          description:
            "After shifting 8, 5, and 2 right, place key = 1 at index 0. Sorted portion is now [1, 2, 5, 8].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 9 (index 4)",
          description:
            "Pick up the element at index 4: key = 9. Compare with 8 — 8 < 9, so 9 stays in place. Sorted portion: [1, 2, 5, 8, 9].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 3, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 3 (index 5)",
          description:
            "Pick up the element at index 5: key = 3. Compare with 9, 8, 5 — all greater. Shift them right. Place 3 after 2.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Insert key = 6 (index 6)",
          description:
            "Pick up the element at index 6: key = 6. Compare with 9, 8 — both greater, shift right. Compare with 5 — 5 < 6, stop.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 6, color: "#F0A030" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
          ],
        },
        {
          label: "Array Fully Sorted",
          description:
            "All 7 elements have been inserted into their correct positions. The final sorted array is [1, 2, 3, 5, 6, 8, 9].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def insertion_sort(arr: list[int]) -> list[int]:
    """Sort arr in-place using Insertion Sort.

    Time:  O(n^2) average/worst, O(n) best (nearly sorted)
    Space: O(1) — in-place, no auxiliary array needed
    Stable: yes — equal elements keep their relative order
    """
    n = len(arr)

    for i in range(1, n):
        key = arr[i]       # element to be inserted
        j = i - 1          # start of the sorted-portion scan

        # Shift all elements greater than key one position right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Place the key in its correct position
        arr[j + 1] = key

    return arr


# --- Example usage ---
if __name__ == "__main__":
    data = [5, 2, 8, 1, 9, 3, 6]
    print("Before:", data)
    insertion_sort(data)
    print("After: ", data)
    # Output: After: [1, 2, 3, 5, 6, 8, 9]`,
      annotations: [
        {
          lines: [11],
          note: "Outer loop starts at index 1. Index 0 is trivially sorted — a single element is always in order.",
        },
        {
          lines: [12, 13],
          note: "Save the current element as 'key' and set j to point at the last element of the sorted portion.",
        },
        {
          lines: [16, 17, 18],
          note: "Inner while loop: shift every element larger than key one slot to the right, making room for the key.",
        },
        {
          lines: [21],
          note: "After the loop, j+1 is the correct insertion position. Place the key there.",
        },
        {
          lines: [1, 2, 3, 4, 5, 6],
          note: "The function sorts in-place and also returns arr for convenience. The stable property means equal elements retain their original relative order.",
        },
        {
          lines: [24, 25, 26, 27, 28],
          note: "Example: [5,2,8,1,9,3,6] → [1,2,3,5,6,8,9] after 6 outer iterations.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n²)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n²)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary Space", value: "O(1)", color: "#CEEB5A" },
        { label: "In-place?", value: "Yes", color: "#CEEB5A" },
        { label: "Stable?", value: "Yes", color: "#CEEB5A" },
      ],
      notes: [
        "Best case O(n) occurs when the array is already sorted — the inner while loop never executes.",
        "Worst case O(n²) occurs when the array is sorted in reverse order — every insertion requires shifting all previous elements.",
        "Despite O(n²) average complexity, Insertion Sort outperforms Merge Sort and Quick Sort for small arrays (n < 20) due to low constant factors and cache efficiency.",
      ],
    },
    variations: {
      items: [
        "Binary Insertion Sort: Use binary search to find the insertion position in O(log n) comparisons, but shifting still takes O(n) time per pass.",
        "Shell Sort: A generalization that uses a gap sequence to perform insertion sort on widely-spaced elements first, reducing total shifts.",
        "Library Sort (Gapped Insertion Sort): Leaves gaps between elements to reduce the cost of future insertions, achieving O(n log n) expected time.",
        "Insertion Sort on Linked Lists: No shifting needed — just update pointers. Finding the position is still O(n) per element.",
        "Patience Sorting: A variant that uses multiple sorted piles (like the card game Patience) and can find the longest increasing subsequence in O(n log n).",
      ],
      tips: [
        "Use Insertion Sort for arrays with fewer than 10–20 elements — it beats asymptotically faster algorithms in practice due to minimal overhead.",
        "Insertion Sort is the go-to choice for nearly-sorted data: if the array has at most k inversions, the runtime is O(n + k).",
        "Timsort (Python's built-in sort) uses Insertion Sort for small runs (typically 32–64 elements) before merging them, combining the best of both worlds.",
        "When implementing a comparison-based sort that must be stable, Insertion Sort is one of the simplest correct choices.",
      ],
    },
    summary: {
      keyPoints: [
        "Insertion Sort builds the sorted array incrementally — after processing index i, the subarray arr[0..i] is fully sorted.",
        "It runs in O(n²) time on average and worst case, but achieves O(n) best case on already-sorted input.",
        "The algorithm is in-place (O(1) space) and stable — equal elements preserve their original relative order.",
        "It is adaptive: its performance degrades gracefully with the number of inversions, making it ideal for nearly-sorted data.",
        "Insertion Sort is the foundation of Shell Sort and is embedded inside Timsort (Python, Java) for small sub-arrays.",
        "For competitive programming and interviews, recognize Insertion Sort as the right tool for small n or nearly-sorted arrays.",
      ],
    },
  },
}

export default function InsertionSortVideo() {
  return <AlgoVideo config={config} />
}
