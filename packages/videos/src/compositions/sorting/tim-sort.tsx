import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Timsort",
  subtitle: "Hybrid algorithm derived from merge sort and insertion sort. Used in Python and Java standard librar",
  category: "sorting",
  difficulty: "advanced",
  chapters: {
    problem: {
      heading: "Sort a sequence efficiently in the real world",
      body: [
        "Given an array of n elements, sort them in ascending order with the fewest comparisons possible.",
        "Real-world data is rarely random — it often contains partially sorted 'runs' of consecutive ordered elements.",
        "A pure merge sort ignores existing order; a pure insertion sort is too slow on large random input.",
        "We need an algorithm that exploits natural order when present, and falls back to efficient general-case sorting otherwise.",
        "Timsort solves this by combining insertion sort for small runs and merge sort for combining them.",
      ],
      callout:
        "Timsort is the default sort in Python (list.sort, sorted()) and Java (Arrays.sort for objects) because of its excellent real-world performance.",
    },
    intuition: {
      heading: "Exploit natural order, then merge smartly",
      body: [
        "Scan the array for 'runs' — maximal sequences that are already ascending (or descending, then reversed).",
        "If a run is shorter than the minimum run size (MIN_RUN, typically 32–64), extend it using insertion sort.",
        "Insertion sort is extremely efficient for small arrays due to low overhead and cache-friendly access patterns.",
        "Push each sorted run onto a stack. When the stack satisfies certain balance invariants, merge adjacent runs.",
        "The merge invariants ensure that run lengths stay balanced, guaranteeing O(n log n) worst-case performance.",
      ],
      analogy:
        "Think of sorting a deck of cards by first grouping cards that are already in order, then merging those groups like a librarian merging pre-sorted piles — much faster than shuffling everything from scratch.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial unsorted array",
          description:
            "We start with 8 unsorted elements. Timsort will identify natural runs within this array before sorting.",
          array: [
            { value: 38, color: "#2255CC" },
            { value: 27, color: "#2255CC" },
            { value: 43, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 82, color: "#2255CC" },
            { value: 10, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Identify Run 0 (indices 0–3)",
          description:
            "The first run covers indices 0–3: [38, 27, 43, 3]. It is shorter than MIN_RUN, so we will sort it with insertion sort.",
          array: [
            { value: 38, color: "#E05A3A" },
            { value: 27, color: "#E05A3A" },
            { value: 43, color: "#E05A3A" },
            { value: 3, color: "#E05A3A" },
            { value: 9, color: "#888899" },
            { value: 82, color: "#888899" },
            { value: 10, color: "#888899" },
            { value: 1, color: "#888899" },
          ],
        },
        {
          label: "Insertion sort Run 0",
          description:
            "Insertion sort on [38, 27, 43, 3] produces [3, 27, 38, 43]. Each element is placed in its correct position relative to already-sorted elements.",
          array: [
            { value: 3, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 38, color: "#CEEB5A" },
            { value: 43, color: "#CEEB5A" },
            { value: 9, color: "#888899" },
            { value: 82, color: "#888899" },
            { value: 10, color: "#888899" },
            { value: 1, color: "#888899" },
          ],
        },
        {
          label: "Identify Run 1 (indices 4–7)",
          description:
            "The second run covers indices 4–7: [9, 82, 10, 1]. Again shorter than MIN_RUN, so insertion sort is applied.",
          array: [
            { value: 3, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 38, color: "#CEEB5A" },
            { value: 43, color: "#CEEB5A" },
            { value: 9, color: "#E05A3A" },
            { value: 82, color: "#E05A3A" },
            { value: 10, color: "#E05A3A" },
            { value: 1, color: "#E05A3A" },
          ],
        },
        {
          label: "Insertion sort Run 1",
          description:
            "Insertion sort on [9, 82, 10, 1] produces [1, 9, 10, 82]. Both runs are now individually sorted.",
          array: [
            { value: 3, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 38, color: "#CEEB5A" },
            { value: 43, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
            { value: 82, color: "#CEEB5A" },
          ],
        },
        {
          label: "Push runs onto the stack",
          description:
            "Each sorted run is pushed onto a run stack. Timsort checks merge invariants: run[i-2].len > run[i-1].len + run[i].len and run[i-1].len > run[i].len.",
          array: [
            { value: 3, color: "#2255CC" },
            { value: 27, color: "#2255CC" },
            { value: 38, color: "#2255CC" },
            { value: 43, color: "#2255CC" },
            { value: 1, color: "#F0A030" },
            { value: 9, color: "#F0A030" },
            { value: 10, color: "#F0A030" },
            { value: 82, color: "#F0A030" },
          ],
        },
        {
          label: "Merge Run 0 and Run 1",
          description:
            "The two runs are merged using a stable merge. Galloping mode kicks in when one run consistently dominates, skipping comparisons for speed.",
          array: [
            { value: 1, color: "#E05A3A" },
            { value: 3, color: "#E05A3A" },
            { value: 9, color: "#E05A3A" },
            { value: 10, color: "#E05A3A" },
            { value: 27, color: "#E05A3A" },
            { value: 38, color: "#E05A3A" },
            { value: 43, color: "#E05A3A" },
            { value: 82, color: "#E05A3A" },
          ],
        },
        {
          label: "Galloping mode optimization",
          description:
            "During merging, if the same run wins 7 consecutive comparisons, Timsort switches to 'galloping' — binary search to find how far ahead to skip, reducing comparisons dramatically.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 38, color: "#CEEB5A" },
            { value: 43, color: "#CEEB5A" },
            { value: 82, color: "#CEEB5A" },
          ],
        },
        {
          label: "Fully sorted result",
          description:
            "The array is now fully sorted: [1, 3, 9, 10, 27, 38, 43, 82]. All runs have been merged into one sorted sequence.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
            { value: 10, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 38, color: "#CEEB5A" },
            { value: 43, color: "#CEEB5A" },
            { value: 82, color: "#CEEB5A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `MIN_RUN = 32

def insertion_sort(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    left_part = arr[left:mid + 1]
    right_part = arr[mid + 1:right + 1]
    i = j = 0
    k = left
    while i < len(left_part) and j < len(right_part):
        if left_part[i] <= right_part[j]:
            arr[k] = left_part[i]
            i += 1
        else:
            arr[k] = right_part[j]
            j += 1
        k += 1
    while i < len(left_part):
        arr[k] = left_part[i]
        i += 1; k += 1
    while j < len(right_part):
        arr[k] = right_part[j]
        j += 1; k += 1

def timsort(arr):
    n = len(arr)
    for start in range(0, n, MIN_RUN):
        end = min(start + MIN_RUN - 1, n - 1)
        insertion_sort(arr, start, end)
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2`,
      annotations: [
        {
          lines: [1],
          note: "MIN_RUN is the minimum run size (32 in CPython). Runs shorter than this are extended via insertion sort for better cache performance.",
        },
        {
          lines: [3, 4, 5, 6, 7, 8, 9],
          note: "Insertion sort runs on a subarray [left, right]. It is O(n²) worst case but extremely fast in practice for small n due to minimal overhead.",
        },
        {
          lines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
          note: "The merge function is a stable merge — when left_part[i] == right_part[j], we always take from the left, preserving original relative order.",
        },
        {
          lines: [30, 31, 32, 33, 34],
          note: "First pass: divide the array into MIN_RUN-sized chunks and sort each with insertion sort. These are the initial runs.",
        },
        {
          lines: [35, 36, 37, 38, 39, 40, 41],
          note: "Second pass: iteratively double the merge size, merging pairs of adjacent sorted runs until the entire array is sorted.",
        },
        {
          lines: [38, 39],
          note: "mid and right are clamped to n-1 to handle the last run which may be smaller than 'size'. This avoids out-of-bounds access.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average case", value: "O(n log n)", color: "#2255CC" },
        { label: "Worst case", value: "O(n log n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary space", value: "O(n)", color: "#2255CC" },
        { label: "Stack space", value: "O(log n)", color: "#888899" },
      ],
      notes: [
        "Best case O(n) occurs when the input is already sorted or nearly sorted — Timsort detects the single run and skips all merges.",
        "The O(n) auxiliary space is used for the temporary merge buffer. CPython's implementation uses a more memory-efficient galloping merge.",
        "Timsort outperforms quicksort on real-world data because natural runs are extremely common in practice (database records, log files, partially sorted user data).",
      ],
    },
    variations: {
      items: [
        "CPython Timsort (listobject.c): The reference implementation. Uses MIN_RUN between 32–64 chosen via a formula to make the number of runs a power of 2. Includes galloping mode.",
        "Java's Timsort (java.util.Arrays): Nearly identical to CPython's version. Used for Object arrays. Primitive arrays use a dual-pivot quicksort instead.",
        "Powersort: A 2018 improvement that replaces Timsort's merge invariants with a near-optimal merge strategy based on run lengths, reducing total comparisons.",
        "Adaptive Shivers Sort: Another variant that uses a different stack-based merge policy, achieving optimal merge cost in more cases than classic Timsort.",
        "Parallel Timsort: Research variant that parallelizes the merge phase across multiple cores, suitable for very large datasets on multicore hardware.",
      ],
      tips: [
        "Prefer Timsort (i.e., Python's built-in sort) over implementing quicksort from scratch for general-purpose sorting — it handles edge cases and nearly-sorted data far better.",
        "When implementing Timsort, the MIN_RUN calculation is subtle: choose it so that n / MIN_RUN is a power of 2 (or close to it) to ensure balanced merges.",
        "Galloping mode is a key optimization: if one run wins k_min consecutive comparisons (default 7), switch to binary search to find the crossover point in O(log n).",
        "For sorting custom objects, ensure your comparison function is consistent (total order). Timsort's stability guarantees are only meaningful with a consistent comparator.",
      ],
    },
    summary: {
      keyPoints: [
        "Timsort is a hybrid of insertion sort (for small runs) and merge sort (for combining runs), achieving O(n log n) worst case and O(n) best case.",
        "It exploits 'natural runs' — already-sorted subsequences — in real-world data, making it highly adaptive and faster in practice than pure merge sort.",
        "The algorithm is stable: equal elements maintain their original relative order, which is critical for multi-key sorting (e.g., sort by name, then by age).",
        "Galloping mode reduces comparisons when one run consistently dominates during a merge, using exponential search followed by binary search.",
        "Timsort is the default sort in Python and Java (for objects), making it one of the most widely deployed sorting algorithms in production software worldwide.",
        "The merge invariants on the run stack (run[i-2] > run[i-1] + run[i] and run[i-1] > run[i]) ensure O(n log n) worst case by keeping run lengths balanced.",
      ],
      nextSteps: [
        "Study the CPython source (Objects/listobject.c) to see the full production implementation including galloping mode.",
        "Read Tim Peters' original description in the Python source tree (Lib/listsort.txt) for the full algorithmic rationale.",
        "Explore Powersort as a modern improvement over classic Timsort's merge policy.",
      ],
    },
  },
}

export default function TimSortVideo() {
  return <AlgoVideo config={config} />
}
