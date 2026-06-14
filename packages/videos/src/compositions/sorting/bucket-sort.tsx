import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Bucket Sort",
  subtitle: "Distributes elements into buckets, sorts each bucket, then concatenates buckets in order.",
  category: "sorting",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "How do you sort a large set of floating-point numbers efficiently?",
      body: [
        "Given n numbers uniformly distributed in [0, 1), sort them in linear expected time.",
        "Comparison-based sorts like merge sort are bounded by O(n log n) — can we do better?",
        "Bucket Sort exploits the uniform distribution by mapping values into fixed-range slots.",
        "Each slot (bucket) holds a small subset of elements that can be sorted cheaply.",
        "The final sorted array is produced by concatenating all buckets in order.",
      ],
      callout:
        "Bucket Sort achieves O(n) average-case time when input is uniformly distributed — breaking the comparison-sort lower bound by using value information directly.",
    },

    intuition: {
      heading: "Divide the range, sort the pieces, merge them back",
      body: [
        "Partition the value range [0, max) into k equal-width buckets.",
        "Each element maps to exactly one bucket based on its value: bucket = floor(value / width).",
        "Elements in the same bucket are close in value, so each bucket stays small.",
        "Sort each bucket independently — insertion sort is fast on nearly-sorted small lists.",
        "Concatenate all buckets from lowest to highest to produce the final sorted array.",
      ],
      analogy:
        "Think of sorting mail by zip code: first sort letters into bins by region (buckets), then sort each bin's small pile individually, and finally stack the bins in order.",
    },

    walkthrough: {
      steps: [
        {
          label: "Start: Unsorted Input",
          description:
            "We have 8 values in [0, 100): [42, 73, 11, 85, 27, 64, 9, 55]. We will use 5 buckets of width 20.",
          array: [
            { value: 42, color: "#2255CC" },
            { value: 73, color: "#2255CC" },
            { value: 11, color: "#2255CC" },
            { value: 85, color: "#2255CC" },
            { value: 27, color: "#2255CC" },
            { value: 64, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
            { value: 55, color: "#2255CC" },
          ],
        },
        {
          label: "Create 5 Empty Buckets",
          description:
            "Allocate 5 buckets: B0=[0,20), B1=[20,40), B2=[40,60), B3=[60,80), B4=[80,100). Each bucket is initially empty.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Distribute: Place 42 and 9",
          description:
            "42 → bucket 2 (floor(42/20)=2). 9 → bucket 0 (floor(9/20)=0). Each element lands in exactly one bucket.",
          array: [
            { value: 9, color: "#E05A3A" },
            { value: 0, color: "#DDE4F0" },
            { value: 42, color: "#E05A3A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Distribute: Place 73, 11, 85, 27",
          description:
            "73 → B3, 11 → B0, 85 → B4, 27 → B1. Buckets are filling up. Elements close in value share a bucket.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 42, color: "#CEEB5A" },
            { value: 73, color: "#CEEB5A" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
        {
          label: "Distribute: Place 64 and 55",
          description:
            "64 → B3 (joins 73), 55 → B2 (joins 42). B3 now has [73, 64]. B2 has [42, 55]. Distribution is complete.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 55, color: "#F0A030" },
            { value: 64, color: "#F0A030" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
        {
          label: "Sort Bucket B2: [42, 55]",
          description:
            "B2 = [42, 55] — already in order. Sort B3 = [73, 64] → [64, 73]. Insertion sort is O(k²) but k is tiny.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 42, color: "#2255CC" },
            { value: 55, color: "#2255CC" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
        {
          label: "Sort Bucket B3: [73, 64] → [64, 73]",
          description: "64 < 73 so we swap. B3 is now sorted. All other single-element buckets need no sorting.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 42, color: "#CEEB5A" },
            { value: 55, color: "#CEEB5A" },
            { value: 64, color: "#2255CC" },
            { value: 73, color: "#2255CC" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
        {
          label: "Concatenate All Buckets",
          description:
            "Read buckets B0 through B4 in order: [9, 11] + [27] + [42, 55] + [64, 73] + [85]. Result is fully sorted.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 11, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 42, color: "#CEEB5A" },
            { value: 55, color: "#CEEB5A" },
            { value: 64, color: "#CEEB5A" },
            { value: 73, color: "#CEEB5A" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
        {
          label: "Final Sorted Array",
          description:
            "Sorted: [9, 11, 27, 42, 55, 64, 73, 85]. Total time: O(n) for distribution + O(k²) per bucket ≈ O(n) average.",
          array: [
            { value: 9, color: "#CEEB5A" },
            { value: 11, color: "#CEEB5A" },
            { value: 27, color: "#CEEB5A" },
            { value: 42, color: "#CEEB5A" },
            { value: 55, color: "#CEEB5A" },
            { value: 64, color: "#CEEB5A" },
            { value: 73, color: "#CEEB5A" },
            { value: 85, color: "#CEEB5A" },
          ],
        },
      ],
    },

    code: {
      language: "python",
      snippet: `def bucket_sort(arr: list[float], num_buckets: int = 0) -> list[float]:
    n = len(arr)
    if n <= 1:
        return arr[:]

    if num_buckets == 0:
        num_buckets = n  # default: one bucket per element

    # Find range
    lo, hi = min(arr), max(arr)
    if lo == hi:
        return arr[:]
    width = (hi - lo) / num_buckets

    # Create empty buckets
    buckets: list[list[float]] = [[] for _ in range(num_buckets)]

    # Distribute elements into buckets
    for val in arr:
        idx = int((val - lo) / width)
        if idx == num_buckets:
            idx -= 1  # clamp max value to last bucket
        buckets[idx].append(val)

    # Sort each bucket with insertion sort
    def insertion_sort(a: list[float]) -> None:
        for i in range(1, len(a)):
            key = a[i]
            j = i - 1
            while j >= 0 and a[j] > key:
                a[j + 1] = a[j]
                j -= 1
            a[j + 1] = key

    result: list[float] = []
    for bucket in buckets:
        insertion_sort(bucket)
        result.extend(bucket)

    return result`,
      annotations: [
        {
          lines: [1, 2, 3, 4],
          note: "Handle edge cases: empty/single-element arrays and default bucket count. Using n buckets gives the best average-case performance.",
        },
        {
          lines: [7, 8, 9, 10, 11],
          note: "Compute the value range [lo, hi] and bucket width. Each bucket covers a contiguous subrange of width = (hi - lo) / k.",
        },
        {
          lines: [14, 15, 16, 17, 18],
          note: "Map each element to its bucket index: idx = floor((val - lo) / width). Clamp the maximum value to avoid an out-of-bounds index.",
        },
        {
          lines: [21, 22, 23, 24, 25, 26, 27],
          note: "Insertion sort runs in O(k²) per bucket, but k ≈ n/B is tiny on average. It outperforms merge sort on small, nearly-sorted lists.",
        },
        {
          lines: [29, 30, 31, 32],
          note: "Concatenate sorted buckets in index order. Because bucket indices correspond to value ranges, the final array is globally sorted.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n + k)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n + k)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n²)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary (buckets)", value: "O(n + k)", color: "#2255CC" },
        { label: "In-place", value: "No", color: "#E05A3A" },
        { label: "Stable", value: "Yes (if inner sort is stable)", color: "#CEEB5A" },
      ],
      notes: [
        "n = number of elements, k = number of buckets. Best/average case assumes uniform distribution.",
        "Worst case O(n²) occurs when all elements fall into the same bucket, degrading to the inner sort's worst case.",
        "Choosing k ≈ √n minimizes the expected total work: O(n) distribution + O(n/k · k) = O(n) sorting.",
      ],
    },

    variations: {
      items: [
        "Generic Bucket Sort: Works on any orderable type by mapping values to bucket indices via a hash or floor function.",
        "Floating-Point Bucket Sort: Classic variant for values in [0, 1) — bucket index = floor(n × value).",
        "Integer Bucket Sort (Counting Sort): Special case where each bucket holds exactly one possible value; achieves true O(n + range) time.",
        "Radix + Bucket Hybrid: Use bucket sort as a subroutine in radix sort for each digit position.",
        "Parallel Bucket Sort: Distribute elements to buckets in parallel, then sort each bucket on a separate thread/core.",
      ],
      tips: [
        "Tip: Choose k ≈ √n for balanced buckets. Too few buckets → large inner sorts; too many → wasted memory.",
        "Tip: Use insertion sort for buckets with fewer than ~20 elements and switch to quicksort for larger ones.",
        "Tip: If the distribution is skewed (not uniform), adaptive bucket widths (e.g., quantile-based) keep buckets balanced.",
        "Tip: Bucket sort is not a good fit for integer-heavy datasets with a large range — use Counting Sort or Radix Sort instead.",
      ],
    },

    summary: {
      keyPoints: [
        "Bucket Sort distributes n elements into k buckets based on value ranges, then sorts each bucket and concatenates.",
        "Average-case time is O(n + k) — linear — when input is uniformly distributed over the range.",
        "Worst case degrades to O(n²) if all elements cluster in a single bucket (non-uniform distribution).",
        "Space complexity is O(n + k) for the bucket arrays; the algorithm is not in-place.",
        "It is stable if the chosen inner sort (e.g., insertion sort) is stable.",
        "Best applied to floating-point data, sensor readings, or any dataset with a known, roughly uniform distribution.",
      ],
    },
  },
}

export default function BucketSortVideo() {
  return <AlgoVideo config={config} />
}
