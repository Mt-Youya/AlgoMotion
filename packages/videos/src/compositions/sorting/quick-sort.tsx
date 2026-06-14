import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Quick Sort",
  subtitle: "Picks a pivot element and partitions the array so that elements less than the pivot come before it.",
  category: "sorting",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Sort an array using a divide-and-conquer pivot strategy",
      body: [
        "Given an unsorted array of numbers, rearrange them in ascending order.",
        "Quick Sort works by selecting a 'pivot' element from the array.",
        "The array is partitioned so all elements less than the pivot appear before it, and all greater elements appear after it.",
        "After partitioning, the pivot is in its final sorted position.",
        "The algorithm then recursively applies the same process to the left and right sub-arrays.",
      ],
      callout:
        "Quick Sort is one of the fastest sorting algorithms in practice, with an average time complexity of O(n log n).",
    },

    intuition: {
      heading: "Divide by choosing a reference point",
      body: [
        "Think of the pivot as a divider — everything smaller goes left, everything larger goes right.",
        "After one partition pass, the pivot is guaranteed to be in its correct final position.",
        "We never need to move the pivot again — this is the key insight.",
        "By recursively sorting the two halves, the whole array becomes sorted.",
        "The efficiency depends heavily on pivot choice — a median pivot gives balanced splits.",
      ],
      analogy:
        "Imagine sorting a deck of cards by picking one card as a reference. Place all lower cards to its left and all higher cards to its right. That card is now in its exact spot. Repeat for each pile.",
    },

    walkthrough: {
      steps: [
        {
          label: "Initial Array",
          description: "Start with the unsorted array [7, 2, 9, 4, 1, 6, 3]. We will sort this using Quick Sort.",
          array: [
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
          ],
        },
        {
          label: "Choose Pivot",
          description: "Select the last element (3) as the pivot. We will find its correct position by partitioning.",
          array: [
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#F0A030" },
          ],
        },
        {
          label: "Scan: j=0, arr[0]=7",
          description: "Compare 7 with pivot 3. Since 7 > 3, we do not move the boundary pointer i. Continue scanning.",
          array: [
            { value: 7, color: "#E05A3A" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#F0A030" },
          ],
        },
        {
          label: "Scan: j=1, arr[1]=2 — Swap!",
          description:
            "Compare 2 with pivot 3. Since 2 < 3, increment i to 0 and swap arr[0] and arr[1]. Array becomes [2, 7, 9, 4, 1, 6, 3].",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 7, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#F0A030" },
          ],
        },
        {
          label: "Scan: j=4, arr[4]=1 — Swap!",
          description:
            "After skipping 9 and 4 (both > 3), we find 1 < 3. Increment i to 1 and swap. Array becomes [2, 1, 9, 4, 7, 6, 3].",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 9, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#F0A030" },
          ],
        },
        {
          label: "Place Pivot at i+1",
          description:
            "Partition complete. Swap pivot (index 6) with position i+1 (index 2). Pivot 3 is now at index 2 — its final sorted position!",
          array: [
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
          ],
        },
        {
          label: "Recurse Left: [2, 1]",
          description:
            "Apply Quick Sort to the left sub-array [2, 1]. Pivot = 1. After partition, 1 moves to index 0. Left sorted: [1, 2].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
          ],
        },
        {
          label: "Recurse Right: [4, 7, 6, 9]",
          description:
            "Apply Quick Sort to the right sub-array [4, 7, 6, 9]. Pivot = 9 stays at end. Then pivot = 6 partitions [4, 7].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#E05A3A" },
            { value: 7, color: "#E05A3A" },
            { value: 6, color: "#F0A030" },
            { value: 9, color: "#2255CC" },
          ],
        },
        {
          label: "Right Sub-array Sorted",
          description:
            "After recursive calls on the right sub-array, [4, 6, 7, 9] is fully sorted. All pivots found their final positions.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
          ],
        },
        {
          label: "Array Fully Sorted",
          description:
            "Final result: [1, 2, 3, 4, 6, 7, 9]. Quick Sort completed by recursively partitioning around pivots until all sub-arrays had size 0 or 1.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
          ],
        },
      ],
    },

    code: {
      language: "python",
      snippet: `def quick_sort(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]   # last element as pivot
    i = low - 1         # boundary of smaller elements

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    # Place pivot in its correct position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Entry point
def sort(arr):
    quick_sort(arr, 0, len(arr) - 1)
    return arr

# Example usage
data = [7, 2, 9, 4, 1, 6, 3]
print(sort(data))  # [1, 2, 3, 4, 6, 7, 9]`,
      annotations: [
        {
          lines: [1, 2],
          note: "Base case: if the sub-array has 0 or 1 elements (low >= high), it is already sorted — stop recursing.",
        },
        {
          lines: [3],
          note: "partition() rearranges elements around the pivot and returns the pivot's final index.",
        },
        {
          lines: [4, 5],
          note: "Recursively sort the left sub-array (elements smaller than pivot) and the right sub-array (elements larger than pivot).",
        },
        {
          lines: [8, 9],
          note: "We choose the last element as the pivot. 'i' starts at low-1 and tracks the right boundary of the 'less than pivot' region.",
        },
        {
          lines: [11, 12, 13, 14],
          note: "For each element less than or equal to pivot, expand the boundary by incrementing i and swapping the element into the smaller region.",
        },
        {
          lines: [17, 18],
          note: "After scanning, place the pivot at position i+1 — this is its final sorted position. Return this index to split the array for recursion.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n log n)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n log n)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n²)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary Space", value: "O(log n)", color: "#2255CC" },
        { label: "In-place?", value: "Yes", color: "#CEEB5A" },
      ],
      notes: [
        "Worst case O(n²) occurs when the pivot is always the smallest or largest element — e.g., a sorted array with last-element pivot.",
        "Randomized Quick Sort picks a random pivot, reducing the probability of worst-case behavior to near zero.",
        "The O(log n) space is for the recursion call stack depth; in the worst case (unbalanced partitions) it degrades to O(n).",
      ],
    },

    variations: {
      items: [
        "Randomized Quick Sort — picks a random pivot to avoid worst-case on sorted inputs.",
        "Median-of-Three Quick Sort — uses the median of first, middle, and last elements as pivot for better balance.",
        "Three-Way Quick Sort (Dutch National Flag) — handles duplicate elements efficiently by partitioning into three regions: less, equal, greater.",
        "Iterative Quick Sort — replaces the call stack with an explicit stack to avoid stack overflow on large inputs.",
        "Hybrid Introsort — switches to Heap Sort when recursion depth exceeds 2·log(n), combining Quick Sort speed with Heap Sort's O(n log n) worst-case guarantee.",
      ],
      tips: [
        "Always use randomized pivot selection in production code to avoid adversarial inputs triggering O(n²) behavior.",
        "For arrays smaller than ~10–20 elements, switch to Insertion Sort — it has lower overhead on tiny inputs.",
        "Three-way partitioning is essential when the input contains many duplicate values; it reduces complexity from O(n²) to O(n log n) in such cases.",
        "Quick Sort is cache-friendly due to sequential memory access patterns, making it faster than Merge Sort in practice despite the same average complexity.",
      ],
    },

    summary: {
      keyPoints: [
        "Quick Sort selects a pivot and partitions the array so smaller elements are left and larger elements are right.",
        "After each partition call, the pivot is placed in its exact final sorted position.",
        "The algorithm recurses on the two sub-arrays until all sub-arrays have size 0 or 1.",
        "Average and best-case time complexity is O(n log n); worst case is O(n²) with poor pivot choices.",
        "Space complexity is O(log n) for the recursion stack — Quick Sort sorts in-place.",
        "In practice, Quick Sort is often the fastest general-purpose sorting algorithm due to excellent cache performance and low constant factors.",
      ],
    },
  },
}

export default function QuickSortVideo() {
  return <AlgoVideo config={config} />
}
