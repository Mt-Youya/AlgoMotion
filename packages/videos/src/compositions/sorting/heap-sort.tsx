import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Heap Sort",
  subtitle: "Builds a max-heap from the array, then repeatedly extracts the maximum element to produce a sorted a",
  category: "sorting",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Sort an array using a binary heap",
      body: [
        "Given an unsorted array of n elements, rearrange them into ascending order.",
        "Heap Sort exploits the binary max-heap data structure to find the maximum element in O(log n) time.",
        "The algorithm runs entirely in-place — it needs only O(1) extra space beyond the input array.",
        "Unlike Merge Sort, no auxiliary array is allocated; the heap is built directly inside the input.",
        "The challenge is maintaining the heap invariant (parent ≥ children) after each extraction.",
      ],
      callout:
        "Heap Sort guarantees O(n log n) in all cases — best, average, and worst — making it predictably fast.",
    },
    intuition: {
      heading: "Think of it as a self-organising priority queue",
      body: [
        "First, transform the array into a max-heap: the largest element always sits at index 0 (the root).",
        "Repeatedly 'extract' the maximum: swap the root with the last unsorted element, then shrink the heap boundary.",
        "After each extraction, the heap property may be violated at the root — restore it by 'sifting down'.",
        "Each sift-down operation takes O(log n) time because the heap height is at most ⌊log₂ n⌋.",
        "After n−1 extractions every element has been placed in its correct sorted position.",
      ],
      analogy:
        "Imagine a corporate org-chart where the CEO is always the highest-paid. When the CEO retires (is extracted), the most senior remaining employee is temporarily promoted, then the hierarchy re-organises itself to restore order — exactly like sift-down.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial unsorted array",
          description:
            "Start with the raw input: [4, 10, 3, 5, 1, 8, 7, 2, 9, 6]. The goal is to sort this in-place.",
          array: [
            { value: 4, color: "#2255CC" },
            { value: 10, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
          ],
        },
        {
          label: "Build max-heap: start from last non-leaf",
          description:
            "The last non-leaf node is at index n//2 - 1 = 4 (value 1). Sift it down: compare with children at indices 9 (value 6) — swap 1 and 6.",
          array: [
            { value: 4, color: "#2255CC" },
            { value: 10, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 6, color: "#E05A3A" },
            { value: 8, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Heapify node at index 3 (value 5)",
          description:
            "Node 3 has children at indices 7 (value 2) and 8 (value 9). The largest child is 9 at index 8. Swap 5 and 9.",
          array: [
            { value: 4, color: "#2255CC" },
            { value: 10, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 9, color: "#E05A3A" },
            { value: 6, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Heapify node at index 2 (value 3)",
          description:
            "Node 2 has children at indices 5 (value 8) and 6 (value 7). Largest child is 8. Swap 3 and 8.",
          array: [
            { value: 4, color: "#2255CC" },
            { value: 10, color: "#2255CC" },
            { value: 8, color: "#E05A3A" },
            { value: 9, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Heapify root (index 0, value 4)",
          description:
            "Root 4 has children 10 (index 1) and 8 (index 2). Largest is 10. Swap 4 and 10, then continue sifting 4 down — max-heap is now built.",
          array: [
            { value: 10, color: "#F0A030" },
            { value: 9, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Extract max: swap root with last element",
          description:
            "Swap root (10) with index 9 (value 1). Reduce heap size to 9. Element 10 is now in its final sorted position.",
          array: [
            { value: 1, color: "#E05A3A" },
            { value: 9, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 10, color: "#CEEB5A" },
          ],
        },
        {
          label: "Re-heapify: sift down new root (value 1)",
          description:
            "Sift 1 down within the heap of size 9 to restore the max-heap property. Root becomes 9.",
          array: [
            { value: 9, color: "#F0A030" },
            { value: 5, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 10, color: "#CEEB5A" },
          ],
        },
        {
          label: "Continue extracting: 9 placed at index 8",
          description:
            "Swap root (9) with index 8 (value 1). Element 9 is sorted. Re-heapify to restore heap. This pattern repeats n−1 times.",
          array: [
            { value: 8, color: "#F0A030" },
            { value: 5, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
          ],
        },
        {
          label: "Nearly sorted: most elements placed",
          description:
            "After 8 extractions, 8 elements are in their final positions. Only indices 0 and 1 remain in the heap.",
          array: [
            { value: 2, color: "#E05A3A" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
          ],
        },
        {
          label: "Final extraction: array fully sorted",
          description:
            "The last swap places 2 at index 1 and 1 at index 0. All elements are now in ascending order: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 6, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def heap_sort(arr):
    n = len(arr)

    # Phase 1: Build a max-heap (bottom-up)
    # Start from last non-leaf node down to root
    for i in range(n // 2 - 1, -1, -1):
        _sift_down(arr, n, i)

    # Phase 2: Extract elements one by one
    for end in range(n - 1, 0, -1):
        # Move current root (max) to its sorted position
        arr[0], arr[end] = arr[end], arr[0]
        # Restore heap property for reduced heap
        _sift_down(arr, end, 0)


def _sift_down(arr, heap_size, root):
    """Sift the element at 'root' down to its correct position."""
    largest = root
    left  = 2 * root + 1
    right = 2 * root + 2

    # Find the largest among root, left child, right child
    if left < heap_size and arr[left] > arr[largest]:
        largest = left

    if right < heap_size and arr[right] > arr[largest]:
        largest = right

    # If root is not the largest, swap and continue sifting
    if largest != root:
        arr[root], arr[largest] = arr[largest], arr[root]
        _sift_down(arr, heap_size, largest)`,
      annotations: [
        {
          lines: [5, 6, 7],
          note: "Build-heap phase: iterate from the last non-leaf node (index n//2-1) up to the root. Each call to _sift_down takes O(log n), but the total work is O(n) due to the geometric series.",
        },
        {
          lines: [10, 11, 12, 13, 14],
          note: "Extraction phase: swap the root (current maximum) with the last unsorted element. Decrement the logical heap size by 1 so the sorted suffix is never touched again.",
        },
        {
          lines: [18, 19, 20, 21, 22],
          note: "_sift_down computes the indices of the left and right children using the standard binary-heap formulas: left = 2i+1, right = 2i+2.",
        },
        {
          lines: [24, 25, 26, 27],
          note: "Find the index of the largest value among the root and its two children. This determines whether a swap is needed to restore the max-heap property.",
        },
        {
          lines: [30, 31],
          note: "If the root is not the largest, swap it with the largest child and recurse. The recursion depth is at most O(log n) — the height of the heap.",
        },
        {
          lines: [1, 2],
          note: "heap_sort is in-place: it modifies arr directly and uses only O(log n) stack space for the recursive _sift_down calls (O(1) if implemented iteratively).",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n log n)", color: "#CEEB5A" },
        { label: "Average case", value: "O(n log n)", color: "#2255CC" },
        { label: "Worst case", value: "O(n log n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary space", value: "O(1)", color: "#CEEB5A" },
        { label: "Recursive stack", value: "O(log n)", color: "#2255CC" },
      ],
      notes: [
        "Heap Sort is the only comparison sort that is both in-place and guarantees O(n log n) worst-case — Quick Sort is O(n²) worst-case without randomisation.",
        "The build-heap phase costs only O(n) despite calling _sift_down O(n/2) times, because most nodes are near the bottom and sift very few levels.",
        "Heap Sort is NOT stable: equal elements may be reordered because swaps happen across large index gaps. Use Merge Sort when stability is required.",
      ],
    },
    variations: {
      items: [
        "Binary Min-Heap Sort: build a min-heap instead and extract minimums to sort in descending order, or reverse the result.",
        "d-ary Heap Sort: use a d-ary heap (e.g. 4-ary) to improve cache performance — fewer comparisons per level but more levels; empirically faster on modern CPUs.",
        "Bottom-up Heap Sort: a variant that reduces the number of comparisons in sift-down by always descending to a leaf, then bubbling up — roughly halves comparisons.",
        "Smoothsort: a variant by Dijkstra that is adaptive (O(n) on nearly sorted input) while maintaining O(n log n) worst-case, using Leonardo heaps.",
        "Weak Heap Sort: uses a 'weak heap' structure to achieve at most n log₂ n + 0.086n comparisons — theoretically optimal for comparison-based sorting.",
      ],
      tips: [
        "Prefer Heap Sort when you need guaranteed O(n log n) and cannot afford O(n) extra space (e.g. embedded systems). For general use, Timsort or Introsort are faster in practice.",
        "If you only need the top-k elements (partial sort), stop the extraction phase after k iterations — this gives an O(n + k log n) algorithm, which beats full sort when k << n.",
        "Implement _sift_down iteratively rather than recursively to eliminate function-call overhead and reduce stack depth to O(1) in production code.",
        "When sorting objects with an expensive comparison function, minimise comparisons by using the bottom-up variant or switching to a d-ary heap.",
      ],
    },
    summary: {
      keyPoints: [
        "Heap Sort works in two phases: (1) build a max-heap in O(n) time, then (2) extract the maximum n−1 times in O(n log n) total time.",
        "The sift-down (heapify) operation is the core primitive — it restores the max-heap property by pushing a node down to its correct level in O(log n).",
        "The algorithm is in-place (O(1) auxiliary space) and has a guaranteed O(n log n) worst-case, unlike Quick Sort.",
        "Heap Sort is NOT stable: the relative order of equal elements is not preserved due to long-range swaps during extraction.",
        "The build-heap phase is O(n) — not O(n log n) — because nodes near the bottom of the tree require only a few sift-down steps.",
        "In practice, Heap Sort is slower than Quick Sort and Merge Sort due to poor cache locality (heap accesses jump around memory), but it shines when worst-case guarantees matter.",
      ],
    },
  },
}

export default function HeapSortVideo() {
  return <AlgoVideo config={config} />
}
