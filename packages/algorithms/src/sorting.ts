import type { AlgorithmMeta, AlgorithmRun, SortingAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const sortingAlgorithms: Record<string, AlgorithmMeta> = {
  "bubble-sort": {
    id: "bubble-sort",
    name: "Bubble sort",
    displayName: { en: "Bubble Sort", zh: "冒泡排序" },
    category: "sorting",
    difficulty: "beginner",
    tags: ["array", "sorting", "in-place", "comparison"],
    description: {
      en: "Repeatedly swaps adjacent elements that are in the wrong order until the array is sorted.",
      zh: "反复比较相邻元素，若顺序错误则交换，直到数组有序。",
    },
    stable: true,
    inPlace: true,
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "selection-sort": {
    id: "selection-sort",
    name: "Selection sort",
    displayName: { en: "Selection Sort", zh: "选择排序" },
    category: "sorting",
    difficulty: "beginner",
    tags: ["array", "sorting", "in-place", "comparison"],
    description: {
      en: "Finds the minimum element in the unsorted portion and places it at the beginning each pass.",
      zh: "每轮从未排序部分找最小值，放到已排序末尾。",
    },
    stable: false,
    inPlace: true,
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "insertion-sort": {
    id: "insertion-sort",
    name: "Insertion sort",
    displayName: { en: "Insertion Sort", zh: "插入排序" },
    category: "sorting",
    difficulty: "beginner",
    tags: ["array", "sorting", "in-place", "comparison", "online"],
    description: {
      en: "Builds the sorted array one item at a time by inserting each new element into its correct position.",
      zh: "逐个将元素插入到已排序序列的正确位置。",
    },
    stable: true,
    inPlace: true,
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "merge-sort": {
    id: "merge-sort",
    name: "Merge sort",
    displayName: { en: "Merge Sort", zh: "归并排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "divide-conquer", "stable", "recursive"],
    description: {
      en: "Recursively divides the array in half, sorts each half, then merges the two sorted halves.",
      zh: "递归地将数组一分为二，分别排序后再合并。",
    },
    stable: true,
    inPlace: false,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 912, titleSlug: "sort-an-array", difficulty: "medium" },
      { id: 88, titleSlug: "merge-sorted-array", difficulty: "easy" },
      { id: 148, titleSlug: "sort-list", difficulty: "medium" },
    ],
  },
  "quick-sort": {
    id: "quick-sort",
    name: "Quick sort",
    displayName: { en: "Quick Sort", zh: "快速排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "divide-conquer", "in-place", "recursive"],
    description: {
      en: "Picks a pivot element and partitions the array so that elements less than the pivot come before it.",
      zh: "选择基准元素，将小于基准的放左侧、大于的放右侧，递归处理两侧。",
    },
    stable: false,
    inPlace: true,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(log n)",
    relatedProblems: [
      { id: 912, titleSlug: "sort-an-array", difficulty: "medium" },
      { id: 215, titleSlug: "kth-largest-element-in-an-array", difficulty: "medium" },
    ],
  },
  "heap-sort": {
    id: "heap-sort",
    name: "Heap sort",
    displayName: { en: "Heap Sort", zh: "堆排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "in-place", "heap", "comparison"],
    description: {
      en: "Builds a max-heap from the array, then repeatedly extracts the maximum element to produce a sorted array.",
      zh: "将数组建成最大堆，反复提取最大值得到有序数组。",
    },
    stable: false,
    inPlace: true,
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "shell-sort": {
    id: "shell-sort",
    name: "Shell sort",
    displayName: { en: "Shell Sort", zh: "希尔排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "in-place", "comparison", "gap-sequence"],
    description: {
      en: "Generalization of insertion sort that allows exchange of items far apart, using a diminishing gap sequence.",
      zh: "插入排序的改进版，通过逐渐缩小间隔来减少比较次数。",
    },
    stable: false,
    inPlace: true,
    timeComplexity: { best: "O(n log n)", average: "O(n log² n)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "counting-sort": {
    id: "counting-sort",
    name: "Counting sort",
    displayName: { en: "Counting Sort", zh: "计数排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "non-comparison", "stable", "integer"],
    description: {
      en: "Counts occurrences of each value and uses cumulative counts to place elements in sorted order.",
      zh: "统计每个值的出现次数，利用累计计数将元素放到正确位置。",
    },
    stable: true,
    inPlace: false,
    timeComplexity: { best: "O(n + k)", average: "O(n + k)", worst: "O(n + k)" },
    spaceComplexity: "O(k)",
    relatedProblems: [
      { id: 912, titleSlug: "sort-an-array", difficulty: "medium" },
      { id: 75, titleSlug: "sort-colors", difficulty: "medium" },
    ],
  },
  "radix-sort": {
    id: "radix-sort",
    name: "Radix sort",
    displayName: { en: "Radix Sort", zh: "基数排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "non-comparison", "stable", "integer", "digit"],
    description: {
      en: "Sorts integers digit by digit from least significant to most significant, using counting sort as a subroutine.",
      zh: "按数字的每一位从低到高排序，以计数排序为子程序。",
    },
    stable: true,
    inPlace: false,
    timeComplexity: { best: "O(nk)", average: "O(nk)", worst: "O(nk)" },
    spaceComplexity: "O(n + k)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
  "bucket-sort": {
    id: "bucket-sort",
    name: "Bucket sort",
    displayName: { en: "Bucket Sort", zh: "桶排序" },
    category: "sorting",
    difficulty: "intermediate",
    tags: ["array", "sorting", "non-comparison", "distribution", "float"],
    description: {
      en: "Distributes elements into buckets, sorts each bucket, then concatenates buckets in order.",
      zh: "将元素分配到若干桶中，对每个桶排序后按序拼接。",
    },
    stable: true,
    inPlace: false,
    timeComplexity: { best: "O(n + k)", average: "O(n + k)", worst: "O(n²)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 164, titleSlug: "maximum-gap", difficulty: "hard" }],
  },
  "tim-sort": {
    id: "tim-sort",
    name: "Timsort",
    displayName: { en: "Timsort", zh: "Timsort" },
    category: "sorting",
    difficulty: "advanced",
    tags: ["array", "sorting", "hybrid", "stable", "adaptive", "merge", "insertion"],
    description: {
      en: "Hybrid algorithm derived from merge sort and insertion sort. Used in Python and Java standard libraries.",
      zh: "归并排序与插入排序的混合算法，Python 和 Java 标准库的默认排序算法。",
    },
    stable: true,
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 912, titleSlug: "sort-an-array", difficulty: "medium" }],
  },
}

// ─── Implementations ──────────────────────────────────────────────────────────

export function bubbleSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  for (let end = values.length - 1; end > 0; end -= 1) {
    let swapped = false
    recorder.range([0, end], "partition", 1)
    for (let index = 0; index < end; index += 1) {
      if (recorder.compare(index, index + 1, 3) > 0) {
        recorder.swap(index, index + 1, 4)
        swapped = true
      }
    }
    recorder.mark([end], "sorted", 7)
    if (!swapped) break
  }

  return recorder.finish(sortingAlgorithms["bubble-sort"] as AlgorithmMeta)
}

export function selectionSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  for (let index = 0; index < values.length - 1; index += 1) {
    let minimum = index
    recorder.mark([minimum], "candidate", 2)
    for (let cursor = index + 1; cursor < values.length; cursor += 1) {
      if (recorder.compare(cursor, minimum, 4) < 0) {
        minimum = cursor
        recorder.mark([minimum], "candidate", 5)
      }
    }
    if (minimum !== index) recorder.swap(index, minimum, 7)
    recorder.mark([index], "sorted", 8)
  }

  return recorder.finish(sortingAlgorithms["selection-sort"] as AlgorithmMeta)
}

export function insertionSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  for (let index = 1; index < values.length; index += 1) {
    const value = values[index] ?? 0
    let cursor = index - 1
    recorder.mark([index], "active", 2)

    while (cursor >= 0) {
      if (recorder.compareValue(cursor, index, values[cursor] ?? 0, value, 4) <= 0) break
      recorder.write(cursor + 1, values[cursor] ?? 0, 5)
      cursor -= 1
    }
    recorder.write(cursor + 1, value, 8)
  }

  return recorder.finish(sortingAlgorithms["insertion-sort"] as AlgorithmMeta)
}

export function mergeSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const merge = (left: number, middle: number, right: number): void => {
    recorder.range([left, right], "merge", 3)
    const leftValues = values.slice(left, middle + 1)
    const rightValues = values.slice(middle + 1, right + 1)
    let leftCursor = 0
    let rightCursor = 0
    let target = left

    while (leftCursor < leftValues.length && rightCursor < rightValues.length) {
      const leftValue = leftValues[leftCursor] ?? 0
      const rightValue = rightValues[rightCursor] ?? 0
      if (recorder.compareValue(left + leftCursor, middle + 1 + rightCursor, leftValue, rightValue, 8) <= 0) {
        recorder.write(target, leftValue, 9)
        leftCursor += 1
      } else {
        recorder.write(target, rightValue, 12)
        rightCursor += 1
      }
      target += 1
    }

    while (leftCursor < leftValues.length) {
      recorder.write(target, leftValues[leftCursor] ?? 0, 17)
      leftCursor += 1
      target += 1
    }

    while (rightCursor < rightValues.length) {
      recorder.write(target, rightValues[rightCursor] ?? 0, 22)
      rightCursor += 1
      target += 1
    }
  }

  const sort = (left: number, right: number): void => {
    if (left >= right) return
    const middle = Math.floor((left + right) / 2)
    sort(left, middle)
    sort(middle + 1, right)
    merge(left, middle, right)
  }

  sort(0, values.length - 1)
  return recorder.finish(sortingAlgorithms["merge-sort"] as AlgorithmMeta)
}

export function quickSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const partition = (left: number, right: number): number => {
    const pivot = values[right] ?? 0
    recorder.range([left, right], "partition", 2)
    recorder.mark([right], "pivot", 3)
    let boundary = left

    for (let cursor = left; cursor < right; cursor += 1) {
      if (recorder.compareValue(cursor, right, values[cursor] ?? 0, pivot, 6) <= 0) {
        if (boundary !== cursor) recorder.swap(boundary, cursor, 7)
        boundary += 1
      }
    }

    if (boundary !== right) recorder.swap(boundary, right, 11)
    recorder.mark([boundary], "sorted", 12)
    return boundary
  }

  const sort = (left: number, right: number): void => {
    if (left >= right) return
    const pivot = partition(left, right)
    sort(left, pivot - 1)
    sort(pivot + 1, right)
  }

  sort(0, values.length - 1)
  return recorder.finish(sortingAlgorithms["quick-sort"] as AlgorithmMeta)
}

export function heapSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const heapify = (size: number, root: number): void => {
    let largest = root
    const left = root * 2 + 1
    const right = root * 2 + 2
    recorder.range([0, size - 1], "heap", 2)

    if (left < size && recorder.compare(left, largest, 5) > 0) largest = left
    if (right < size && recorder.compare(right, largest, 6) > 0) largest = right

    if (largest !== root) {
      recorder.swap(root, largest, 9)
      heapify(size, largest)
    }
  }

  for (let root = Math.floor(values.length / 2) - 1; root >= 0; root -= 1) {
    heapify(values.length, root)
  }

  for (let end = values.length - 1; end > 0; end -= 1) {
    recorder.swap(0, end, 16)
    recorder.mark([end], "sorted", 17)
    heapify(end, 0)
  }

  return recorder.finish(sortingAlgorithms["heap-sort"] as AlgorithmMeta)
}

export function shellSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder
  let gap = Math.floor(values.length / 2)

  while (gap > 0) {
    for (let index = gap; index < values.length; index += 1) {
      const temp = values[index] ?? 0
      let cursor = index
      recorder.mark([index], "active", 4)

      while (cursor >= gap && recorder.compareValue(cursor - gap, cursor, values[cursor - gap] ?? 0, temp, 5) > 0) {
        recorder.write(cursor, values[cursor - gap] ?? 0, 6)
        cursor -= gap
      }
      recorder.write(cursor, temp, 8)
    }
    gap = Math.floor(gap / 2)
  }

  return recorder.finish(sortingAlgorithms["shell-sort"] as AlgorithmMeta)
}

export function countingSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min + 1
  const count = new Array<number>(range).fill(0)

  for (let index = 0; index < values.length; index += 1) {
    recorder.mark([index], "active", 3)
    count[(values[index] ?? 0) - min] = (count[(values[index] ?? 0) - min] ?? 0) + 1
  }

  let writeIndex = 0
  for (let value = 0; value < range; value += 1) {
    const freq = count[value] ?? 0
    for (let repeat = 0; repeat < freq; repeat += 1) {
      recorder.write(writeIndex, value + min, 10)
      recorder.mark([writeIndex], "sorted", 11)
      writeIndex += 1
    }
  }

  return recorder.finish(sortingAlgorithms["counting-sort"] as AlgorithmMeta)
}

export function radixSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder

  const getDigit = (num: number, place: number): number => Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
  const digitCount = (num: number): number => (num === 0 ? 1 : Math.floor(Math.log10(Math.abs(num))) + 1)
  const maxDigits = Math.max(...values.map(digitCount))

  for (let k = 0; k < maxDigits; k += 1) {
    const buckets: number[][] = Array.from({ length: 10 }, () => [])

    for (let index = 0; index < values.length; index += 1) {
      recorder.mark([index], "active", 5)
      const digit = getDigit(values[index] ?? 0, k)
      buckets[digit]?.push(values[index] ?? 0)
    }

    let writeIndex = 0
    for (const bucket of buckets) {
      for (const val of bucket) {
        recorder.write(writeIndex, val, 12)
        writeIndex += 1
      }
    }
  }

  return recorder.finish(sortingAlgorithms["radix-sort"] as AlgorithmMeta)
}

export function bucketSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder
  const n = values.length
  if (n <= 1) return recorder.finish(sortingAlgorithms["bucket-sort"] as AlgorithmMeta)

  const max = Math.max(...values)
  const min = Math.min(...values)
  const bucketSize = Math.max(1, Math.floor((max - min) / n))
  const bucketCount = Math.floor((max - min) / bucketSize) + 1
  const buckets: number[][] = Array.from({ length: bucketCount }, () => [])

  for (let index = 0; index < n; index += 1) {
    recorder.mark([index], "active", 5)
    const bucketIndex = Math.floor(((values[index] ?? 0) - min) / bucketSize)
    buckets[bucketIndex]?.push(values[index] ?? 0)
  }

  let writeIndex = 0
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b)
    for (const val of bucket) {
      recorder.write(writeIndex, val, 13)
      recorder.mark([writeIndex], "sorted", 14)
      writeIndex += 1
    }
  }

  return recorder.finish(sortingAlgorithms["bucket-sort"] as AlgorithmMeta)
}

export function timSort(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder
  const RUN = 32

  // Insertion sort for small runs
  const insertionSortRun = (left: number, right: number): void => {
    for (let index = left + 1; index <= right; index += 1) {
      const temp = values[index] ?? 0
      let cursor = index - 1
      recorder.mark([index], "active", 4)
      while (cursor >= left && recorder.compareValue(cursor, index, values[cursor] ?? 0, temp, 5) > 0) {
        recorder.write(cursor + 1, values[cursor] ?? 0, 6)
        cursor -= 1
      }
      recorder.write(cursor + 1, temp, 8)
    }
  }

  // Merge two sorted runs
  const mergeRuns = (left: number, middle: number, right: number): void => {
    recorder.range([left, right], "merge", 12)
    const leftArr = values.slice(left, middle + 1)
    const rightArr = values.slice(middle + 1, right + 1)
    let i = 0
    let j = 0
    let k = left

    while (i < leftArr.length && j < rightArr.length) {
      if (recorder.compareValue(left + i, middle + 1 + j, leftArr[i] ?? 0, rightArr[j] ?? 0, 15) <= 0) {
        recorder.write(k, leftArr[i] ?? 0, 16)
        i += 1
      } else {
        recorder.write(k, rightArr[j] ?? 0, 18)
        j += 1
      }
      k += 1
    }
    while (i < leftArr.length) {
      recorder.write(k++, leftArr[i++] ?? 0, 21)
    }
    while (j < rightArr.length) {
      recorder.write(k++, rightArr[j++] ?? 0, 22)
    }
  }

  const n = values.length
  for (let i = 0; i < n; i += RUN) {
    insertionSortRun(i, Math.min(i + RUN - 1, n - 1))
  }

  for (let size = RUN; size < n; size *= 2) {
    for (let left = 0; left < n; left += 2 * size) {
      const middle = Math.min(left + size - 1, n - 1)
      const right = Math.min(left + 2 * size - 1, n - 1)
      if (middle < right) mergeRuns(left, middle, right)
    }
  }

  return recorder.finish(sortingAlgorithms["tim-sort"] as AlgorithmMeta)
}

// ─── Runner registry ─────────────────────────────────────────────────────────

const runners: Record<SortingAlgorithmId, (input: number[]) => AlgorithmRun> = {
  "bubble-sort": bubbleSort,
  "selection-sort": selectionSort,
  "insertion-sort": insertionSort,
  "merge-sort": mergeSort,
  "quick-sort": quickSort,
  "heap-sort": heapSort,
  "shell-sort": shellSort,
  "counting-sort": countingSort,
  "radix-sort": radixSort,
  "bucket-sort": bucketSort,
  "tim-sort": timSort,
}

export function runSortingAlgorithm(algorithmId: SortingAlgorithmId, input: number[]): AlgorithmRun {
  const runner = runners[algorithmId]
  if (!runner) throw new Error(`Unsupported algorithm: ${algorithmId}`)
  if (input.length > 256) throw new Error("Input is limited to 256 values for interactive playback.")
  if (input.some((value) => !Number.isFinite(value))) throw new Error("Input must contain only finite numbers.")
  return runner(input)
}
