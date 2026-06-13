import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Radix Sort",
  subtitle: "Sorts integers digit by digit from least significant to most significant, using counting sort as a s",
  category: "sorting",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Sort Integers Without Direct Comparison",
      body: [
        "Given an array of non-negative integers, sort them in ascending order.",
        "Naive comparison sorts (merge sort, quicksort) need O(n log n) comparisons — can we do better?",
        "Radix sort avoids comparing full values; instead it sorts digit by digit.",
        "It processes each decimal place independently, from the least significant digit (units) to the most significant.",
        "The key requirement: each single-digit sub-sort must be stable so relative order is preserved across passes.",
      ],
      callout:
        "Radix sort achieves O(d · n) time when d (number of digits) is small relative to n, beating comparison-based lower bounds.",
    },
    intuition: {
      heading: "Sort One Digit at a Time",
      body: [
        "Think of each number as a sequence of digits: 170 → [1, 7, 0], 45 → [0, 4, 5].",
        "Start with the least significant digit (units place) and stably sort all numbers by that digit alone.",
        "Move to the next digit (tens place) and stably sort again — previous order is preserved within each bucket.",
        "Repeat for every digit place until you reach the most significant digit.",
        "After d passes the array is fully sorted, because each pass refines the order without breaking prior work.",
      ],
      analogy:
        "Imagine sorting a deck of library index cards first by the last letter of the title, then by the second-to-last, and so on. Each pass respects the previous ordering, so the deck is perfectly sorted once you reach the first letter.",
    },
    walkthrough: {
      steps: [
        {
          label: "Start: unsorted array",
          description:
            "We begin with [170, 45, 75, 90, 802, 24, 2, 66]. The goal is to sort these integers using digit-by-digit passes.",
          array: [
            { value: 170, color: "#2255CC" },
            { value: 45,  color: "#2255CC" },
            { value: 75,  color: "#2255CC" },
            { value: 90,  color: "#2255CC" },
            { value: 802, color: "#2255CC" },
            { value: 24,  color: "#2255CC" },
            { value: 2,   color: "#2255CC" },
            { value: 66,  color: "#2255CC" },
          ],
        },
        {
          label: "Pass 1: extract units digits",
          description:
            "Read the units digit of each number: 170→0, 45→5, 75→5, 90→0, 802→2, 24→4, 2→2, 66→6. These become the sort keys for this pass.",
          array: [
            { value: 170, color: "#E05A3A" },
            { value: 45,  color: "#E05A3A" },
            { value: 75,  color: "#E05A3A" },
            { value: 90,  color: "#E05A3A" },
            { value: 802, color: "#E05A3A" },
            { value: 24,  color: "#E05A3A" },
            { value: 2,   color: "#E05A3A" },
            { value: 66,  color: "#E05A3A" },
          ],
        },
        {
          label: "Pass 1: stable counting sort by units",
          description:
            "Bucket numbers by their units digit (0–9) and concatenate buckets in order. Numbers with the same digit keep their original relative order (stability).",
          array: [
            { value: 170, color: "#CEEB5A" },
            { value: 90,  color: "#CEEB5A" },
            { value: 802, color: "#CEEB5A" },
            { value: 2,   color: "#CEEB5A" },
            { value: 24,  color: "#CEEB5A" },
            { value: 45,  color: "#CEEB5A" },
            { value: 75,  color: "#CEEB5A" },
            { value: 66,  color: "#CEEB5A" },
          ],
        },
        {
          label: "Pass 2: extract tens digits",
          description:
            "Now read the tens digit of each number in the current order: 170→7, 90→9, 802→0, 2→0, 24→2, 45→4, 75→7, 66→6.",
          array: [
            { value: 170, color: "#F0A030" },
            { value: 90,  color: "#F0A030" },
            { value: 802, color: "#F0A030" },
            { value: 2,   color: "#F0A030" },
            { value: 24,  color: "#F0A030" },
            { value: 45,  color: "#F0A030" },
            { value: 75,  color: "#F0A030" },
            { value: 66,  color: "#F0A030" },
          ],
        },
        {
          label: "Pass 2: stable sort by tens digit",
          description:
            "After sorting by the tens digit, numbers with 0 in the tens place (802, 2) come first, then 24, then 45, 66, 170/75, then 90.",
          array: [
            { value: 802, color: "#CEEB5A" },
            { value: 2,   color: "#CEEB5A" },
            { value: 24,  color: "#CEEB5A" },
            { value: 45,  color: "#CEEB5A" },
            { value: 66,  color: "#CEEB5A" },
            { value: 170, color: "#CEEB5A" },
            { value: 75,  color: "#CEEB5A" },
            { value: 90,  color: "#CEEB5A" },
          ],
        },
        {
          label: "Pass 3: extract hundreds digits",
          description:
            "Read the hundreds digit: 802→8, 2→0, 24→0, 45→0, 66→0, 170→1, 75→0, 90→0. Most numbers have 0 in the hundreds place.",
          array: [
            { value: 802, color: "#E05A3A" },
            { value: 2,   color: "#E05A3A" },
            { value: 24,  color: "#E05A3A" },
            { value: 45,  color: "#E05A3A" },
            { value: 66,  color: "#E05A3A" },
            { value: 170, color: "#E05A3A" },
            { value: 75,  color: "#E05A3A" },
            { value: 90,  color: "#E05A3A" },
          ],
        },
        {
          label: "Pass 3: stable sort by hundreds digit",
          description:
            "Numbers with hundreds digit 0 stay in their current (already-correct) order, then 170 (hundreds=1), then 802 (hundreds=8).",
          array: [
            { value: 2,   color: "#CEEB5A" },
            { value: 24,  color: "#CEEB5A" },
            { value: 45,  color: "#CEEB5A" },
            { value: 66,  color: "#CEEB5A" },
            { value: 75,  color: "#CEEB5A" },
            { value: 90,  color: "#CEEB5A" },
            { value: 170, color: "#CEEB5A" },
            { value: 802, color: "#CEEB5A" },
          ],
        },
        {
          label: "Array fully sorted",
          description:
            "After 3 passes (one per digit place) the array is fully sorted: [2, 24, 45, 66, 75, 90, 170, 802]. No element-to-element comparisons were needed.",
          array: [
            { value: 2,   color: "#CEEB5A" },
            { value: 24,  color: "#CEEB5A" },
            { value: 45,  color: "#CEEB5A" },
            { value: 66,  color: "#CEEB5A" },
            { value: 75,  color: "#CEEB5A" },
            { value: 90,  color: "#CEEB5A" },
            { value: 170, color: "#CEEB5A" },
            { value: 802, color: "#CEEB5A" },
          ],
        },
        {
          label: "Why stability matters",
          description:
            "If the per-digit sort were not stable, a later pass could destroy the ordering established by an earlier pass. Counting sort is inherently stable when implemented with a suffix-sum prefix array.",
        },
        {
          label: "Counting sort subroutine",
          description:
            "For each pass, counting sort builds a frequency array of size k=10 (digits 0–9), computes prefix sums to find output positions, then places each element in O(n+k) time.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def counting_sort_by_digit(arr, place):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of each digit
    for num in arr:
        digit = (num // place) % 10
        count[digit] += 1

    # Compute prefix sums (cumulative positions)
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output array in reverse for stability
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // place) % 10
        count[digit] -= 1
        output[count[digit]] = arr[i]

    return output


def radix_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)
    place = 1  # Start at units digit

    while max_val // place > 0:
        arr = counting_sort_by_digit(arr, place)
        place *= 10  # Move to next digit place

    return arr


# Example usage
nums = [170, 45, 75, 90, 802, 24, 2, 66]
print(radix_sort(nums))  # [2, 24, 45, 66, 75, 90, 170, 802]`,
      annotations: [
        {
          lines: [1, 2, 3],
          note: "counting_sort_by_digit sorts the array by a single decimal digit at position 'place' (1=units, 10=tens, 100=hundreds, …).",
        },
        {
          lines: [5, 6, 7, 8],
          note: "Count how many numbers have each digit value (0–9) at this place. Array 'count' has exactly 10 buckets.",
        },
        {
          lines: [10, 11, 12],
          note: "Prefix-sum transform: count[i] now holds the number of elements with digit ≤ i, which gives the final output index.",
        },
        {
          lines: [14, 15, 16, 17, 18],
          note: "Iterate in reverse to preserve stability. Decrement count[digit] before placing so equal-digit elements land in the correct relative order.",
        },
        {
          lines: [22, 23, 24, 25],
          note: "radix_sort drives the outer loop. max_val determines how many digit places exist. The loop runs d times where d = floor(log10(max_val)) + 1.",
        },
        {
          lines: [26, 27, 28],
          note: "Each iteration multiplies 'place' by 10, shifting focus to the next more-significant digit. The loop ends when place exceeds max_val.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case",  value: "O(d · (n + k))", color: "#CEEB5A" },
        { label: "Average",    value: "O(d · (n + k))", color: "#2255CC" },
        { label: "Worst case", value: "O(d · (n + k))", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary output array", value: "O(n)",     color: "#2255CC" },
        { label: "Count array",            value: "O(k)",     color: "#2255CC" },
        { label: "Total",                  value: "O(n + k)", color: "#2255CC" },
      ],
      notes: [
        "d = number of digits in the largest value; k = radix (10 for decimal). When d is constant, radix sort is effectively O(n).",
        "For 32-bit integers with base 256 (byte-level radix), d = 4 passes and k = 256, giving excellent practical performance.",
        "Radix sort is not in-place (requires O(n) auxiliary space) and is not comparison-based, so the Ω(n log n) lower bound does not apply.",
      ],
    },
    variations: {
      items: [
        "LSD Radix Sort (Least Significant Digit first) — the standard approach shown here; naturally stable and works well for fixed-width keys.",
        "MSD Radix Sort (Most Significant Digit first) — processes from the most significant digit; can be implemented recursively and supports early termination for partially sorted data.",
        "Binary Radix Sort (base 2) — uses bit-level passes; very cache-friendly and used in GPU sorting algorithms.",
        "Radix Sort with base 256 — groups 8 bits per pass, reducing d to 4 passes for 32-bit integers; popular in high-performance libraries.",
        "Ternary Radix Sort — used for strings, processes one character at a time; closely related to three-way string quicksort.",
      ],
      tips: [
        "Choose the radix to balance the number of passes (d) against the size of the count array (k). Base 256 is a common sweet spot for integers.",
        "Radix sort is most competitive when d is small (e.g., sorting 32-bit integers, fixed-length strings). It loses its edge when keys are very long.",
        "For strings of variable length, pad shorter strings with a sentinel character smaller than any real character before applying LSD radix sort.",
        "Radix sort is cache-unfriendly for large k because the count array scatters writes. Prefetching and blocked processing can mitigate this.",
      ],
    },
    summary: {
      keyPoints: [
        "Radix sort processes numbers one digit at a time, from the least significant to the most significant digit.",
        "It relies on a stable subroutine (typically counting sort) to sort by each digit without disturbing previously established order.",
        "Time complexity is O(d · (n + k)) — effectively linear when d and k are constants, beating O(n log n) comparison sorts.",
        "Space complexity is O(n + k) for the output and count arrays; it is not an in-place algorithm.",
        "Stability is essential: without it, a later pass would corrupt the ordering achieved by earlier passes.",
        "Radix sort is widely used in practice for sorting integers, fixed-length strings, and network packets where keys have bounded length.",
      ],
    },
  },
}

export default function RadixSortVideo() {
  return <AlgoVideo config={config} />
}
