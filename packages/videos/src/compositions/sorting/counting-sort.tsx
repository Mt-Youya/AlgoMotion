import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Counting Sort",
  subtitle: "Counts occurrences of each value and uses cumulative counts to place elements in sorted order.",
  category: "sorting",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "How do we sort without comparing elements?",
      body: [
        "Given an array of integers in a known, bounded range [0, k], sort it in linear time.",
        "Comparison-based sorts like Merge Sort have a theoretical lower bound of O(n log n).",
        "Counting Sort sidesteps comparisons entirely by exploiting the fact that values are integers.",
        "We tally how many times each distinct value appears, then reconstruct the sorted sequence.",
        "The algorithm is optimal when the range k is small relative to the input size n.",
      ],
      callout: "Counting Sort runs in O(n + k) time — faster than any comparison sort when k = O(n).",
    },
    intuition: {
      heading: "Counting votes to determine rank",
      body: [
        "Imagine each value casts a 'vote'. We tally votes per value in a count array.",
        "A prefix-sum pass converts raw counts into final positions: count[v] tells us how many values ≤ v.",
        "We then place each element at exactly the position its count dictates, decrementing the count.",
        "Traversing the input right-to-left during placement preserves stability — equal elements keep their original relative order.",
        "The three-pass structure (count → prefix sum → place) makes the logic easy to verify and debug.",
      ],
      analogy:
        "Think of sorting exam grades (0–100): rather than comparing papers, a teacher tallies how many students got each score, then writes names into a ranked list using those tallies. No student-to-student comparison is needed.",
    },
    walkthrough: {
      steps: [
        {
          label: "Start: input array",
          description: "We begin with the unsorted input [4, 2, 2, 8, 3, 3, 1]. The value range is [1, 8], so we need a count array of size 9 (indices 0–8).",
          array: [
            { value: 4, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
          ],
        },
        {
          label: "Initialise count array",
          description: "Create count[0..8] filled with zeros. Each index represents a possible value in the input range.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Count occurrences",
          description: "Scan the input. For each element x, increment count[x]. After scanning: count[1]=1, count[2]=2, count[3]=2, count[4]=1, count[8]=1.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#CEEB5A" },
          ],
        },
        {
          label: "Build prefix sums",
          description: "Accumulate: count[i] += count[i-1]. Now count[v] holds the number of elements ≤ v, which equals the last valid output index for value v (1-based).",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 6, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
          ],
        },
        {
          label: "Prepare output array",
          description: "Allocate an output array of the same length as the input, initially empty. We will fill it using the prefix-sum positions.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Place elements (right-to-left)",
          description: "Traverse input right-to-left. For input[6]=1: pos = count[1]-1 = 0, place 1 at output[0], decrement count[1] to 0.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Continue placing elements",
          description: "input[5]=3: pos = count[3]-1 = 4, place 3 at output[4]. input[4]=3: pos = count[3]-1 = 3, place 3 at output[3]. Stability is maintained.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 3, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Place remaining elements",
          description: "Continue: input[3]=8 → output[6]=8; input[2]=2 → output[2]=2; input[1]=2 → output[1]=2; input[0]=4 → output[5]=4.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
          ],
        },
        {
          label: "Copy output to input",
          description: "Copy the output array back into the original array. The array is now fully sorted in ascending order.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
          ],
        },
        {
          label: "Sort complete",
          description: "All 7 elements are in sorted order: [1, 2, 2, 3, 3, 4, 8]. No comparisons were made — just counting and indexing.",
          array: [
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 8, color: "#CEEB5A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def counting_sort(arr: list[int]) -> list[int]:
    if not arr:
        return []

    # Find range of values
    min_val = min(arr)
    max_val = max(arr)
    k = max_val - min_val + 1

    # Step 1: Count occurrences (offset by min_val)
    count = [0] * k
    for x in arr:
        count[x - min_val] += 1

    # Step 2: Build prefix sums
    for i in range(1, k):
        count[i] += count[i - 1]

    # Step 3: Place elements into output (right-to-left for stability)
    output = [0] * len(arr)
    for i in range(len(arr) - 1, -1, -1):
        idx = arr[i] - min_val
        count[idx] -= 1
        output[count[idx]] = arr[i]

    return output


# Example usage
if __name__ == "__main__":
    data = [4, 2, 2, 8, 3, 3, 1]
    print(counting_sort(data))  # [1, 2, 2, 3, 3, 4, 8]`,
      annotations: [
        {
          lines: [5, 6, 7],
          note: "Find min and max to support negative values and non-zero-based ranges. k is the number of distinct possible values.",
        },
        {
          lines: [9, 10, 11],
          note: "Count occurrences. Subtracting min_val offsets the index so the count array is always size k, not max_val+1.",
        },
        {
          lines: [13, 14, 15],
          note: "Prefix-sum pass. After this, count[i] holds the number of elements with value ≤ (i + min_val). This gives each value its final position boundary.",
        },
        {
          lines: [17, 18, 19, 20, 21],
          note: "Placement pass traverses right-to-left. Decrementing count before use gives a 0-based index and ensures stability for equal elements.",
        },
        {
          lines: [23],
          note: "Return the output array. To sort in-place, copy output back: arr[:] = output.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n + k)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n + k)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n + k)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Count Array", value: "O(k)", color: "#2255CC" },
        { label: "Output Array", value: "O(n)", color: "#2255CC" },
        { label: "Total Space", value: "O(n + k)", color: "#E05A3A" },
      ],
      notes: [
        "n is the number of elements; k is the size of the value range (max - min + 1).",
        "When k = O(n), all three time complexities reduce to O(n) — beating any comparison sort.",
        "Counting Sort is not suitable when k >> n (e.g., sorting 10 integers in range [0, 10^9] wastes enormous memory).",
      ],
    },
    variations: {
      items: [
        "Radix Sort: applies Counting Sort digit-by-digit (LSD or MSD) to sort large integers efficiently in O(d·n) time.",
        "Bucket Sort: generalises Counting Sort to floating-point values by distributing elements into value-range buckets.",
        "Pigeonhole Sort: a simpler variant where each 'count' bucket holds actual elements rather than a tally.",
        "Negative-range support: offset all values by -min_val so the count array index is always non-negative.",
        "In-place variant: possible but complex — requires careful cycle-following to avoid O(n) extra space.",
      ],
      tips: [
        "Always check the value range before choosing Counting Sort — if k is much larger than n, use a comparison sort instead.",
        "Use the right-to-left placement loop to guarantee stability; a left-to-right loop would reverse the relative order of equal elements.",
        "When sorting objects by a key (e.g., students by grade), store references in the output array rather than raw values to preserve full record data.",
        "Counting Sort is the inner subroutine of Radix Sort — mastering it unlocks linear-time sorting of multi-digit integers.",
      ],
    },
    summary: {
      keyPoints: [
        "Counting Sort is a non-comparison, stable sorting algorithm that runs in O(n + k) time and space.",
        "It works in three passes: count occurrences, build prefix sums, then place elements into the output.",
        "The prefix-sum step converts raw counts into exact output positions for each value.",
        "Right-to-left traversal during placement guarantees stability — equal elements maintain their original order.",
        "It is most efficient when the value range k is small (e.g., sorting exam scores, ages, or small integers).",
        "Counting Sort is the foundation of Radix Sort, enabling linear-time sorting of multi-key data.",
      ],
    },
  },
}

export default function CountingSortVideo() {
  return <AlgoVideo config={config} />
}
