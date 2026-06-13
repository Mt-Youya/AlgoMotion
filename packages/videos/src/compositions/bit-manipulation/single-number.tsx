import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Single Number",
  subtitle:
    "Finds the element that appears exactly once in an array where every other element appears twice, usi",
  category: "bit-manipulation",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a non-empty array of integers `nums`, every element appears exactly twice except for one element.",
        "Your task is to find and return that single element that appears only once.",
        "The solution must run in O(n) linear time — no brute-force nested loops allowed.",
        "The solution must use only O(1) extra space — no hash maps or frequency counters.",
        "Example: nums = [4, 1, 2, 1, 2] → answer is 4, because 1 and 2 each appear twice.",
      ],
    },

    intuition: {
      heading: "Core Intuition: XOR Bit Magic",
      bullets: [
        "XOR (exclusive OR) returns 1 when bits differ and 0 when bits are the same.",
        "Key property 1: a XOR a = 0 — any number XORed with itself becomes zero.",
        "Key property 2: a XOR 0 = a — any number XORed with zero stays unchanged.",
        "Key property 3: XOR is commutative and associative, so order doesn't matter.",
        "If we XOR every element together, all paired duplicates cancel to 0, leaving only the unique element.",
      ],
      analogy:
        "Think of it like a light switch: flipping the same switch twice returns it to its original state (off). Flipping it once leaves it changed (on). Every duplicate pair 'flips back' to zero, and only the lone element remains flipped on.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize result = 0. XOR with 0 is identity, so this is a safe starting point.",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["gray", "gray", "gray", "gray", "gray"] },
        },
        {
          step: 2,
          description: "Process nums[0] = 4. Compute result = 0 XOR 4 = 4.",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["yellow", "gray", "gray", "gray", "gray"] },
        },
        {
          step: 3,
          description: "Process nums[1] = 1. Compute result = 4 XOR 1 = 5 (binary: 100 XOR 001 = 101).",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["green", "yellow", "gray", "gray", "gray"] },
        },
        {
          step: 4,
          description: "Process nums[2] = 2. Compute result = 5 XOR 2 = 7 (binary: 101 XOR 010 = 111).",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["green", "green", "yellow", "gray", "gray"] },
        },
        {
          step: 5,
          description: "Process nums[3] = 1. Compute result = 7 XOR 1 = 6 (binary: 111 XOR 001 = 110). The first '1' cancels with this '1'.",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["green", "green", "green", "yellow", "gray"] },
        },
        {
          step: 6,
          description: "Process nums[4] = 2. Compute result = 6 XOR 2 = 4 (binary: 110 XOR 010 = 100). The first '2' cancels with this '2'.",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["green", "green", "green", "green", "yellow"] },
        },
        {
          step: 7,
          description: "All elements processed. result = 4. The two 1s cancelled each other (1 XOR 1 = 0). The two 2s cancelled each other (2 XOR 2 = 0). Only 4 remains.",
          arrayState: { values: [4, 1, 2, 1, 2], colors: ["green", "green", "green", "green", "green"] },
        },
        {
          step: 8,
          description: "Return result = 4. This is the single number that appears exactly once in the array.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `from typing import List

class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        """
        Find the element that appears exactly once.

        Approach: XOR all elements together.
        - Duplicate pairs cancel out (a ^ a = 0)
        - The unique element survives (a ^ 0 = a)

        Time:  O(n) — single pass through the array
        Space: O(1) — only one integer variable used
        """
        result = 0
        for num in nums:
            result ^= num
        return result


# Alternative: functional one-liner using reduce
from functools import reduce
from operator import xor

def singleNumber_oneliner(nums: List[int]) -> int:
    return reduce(xor, nums)


# Test cases
if __name__ == "__main__":
    sol = Solution()
    assert sol.singleNumber([2, 2, 1])       == 1
    assert sol.singleNumber([4, 1, 2, 1, 2]) == 4
    assert sol.singleNumber([1])             == 1
    print("All tests passed!")`,
      annotations: [
        {
          lines: "1-2",
          note: "Import List for type hints. The function signature accepts a list of integers and returns a single integer.",
        },
        {
          lines: "16",
          note: "Initialize result to 0. Since a XOR 0 = a, starting at 0 does not affect the first element.",
        },
        {
          lines: "17-18",
          note: "Single for-loop iterates over every element exactly once, giving O(n) time complexity.",
        },
        {
          lines: "18",
          note: "The ^= operator applies XOR in-place. Paired duplicates cancel to 0; the unique element accumulates in result.",
        },
        {
          lines: "19",
          note: "After the loop, result holds only the bits of the unique element. Return it directly.",
        },
        {
          lines: "23-25",
          note: "One-liner alternative using functools.reduce with the xor operator — same O(n)/O(1) complexity, more Pythonic.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best",    notation: "O(n)", note: "Must always visit every element at least once" },
        { case: "Average", notation: "O(n)", note: "Linear scan regardless of input distribution" },
        { case: "Worst",   notation: "O(n)", note: "No early exit possible; unique element may be last" },
      ],
      spaceRows: [
        { type: "Auxiliary", notation: "O(1)", note: "Only a single integer variable `result` is used" },
        { type: "Input",     notation: "O(n)", note: "Input array itself (not counted toward algorithm space)" },
      ],
      insights: [
        "XOR is one of the rare bit tricks that solves a seemingly complex problem in a single pass with zero extra memory.",
        "This approach is optimal — any correct algorithm must read every element at least once, making O(n) time a lower bound.",
        "The O(1) space guarantee makes this algorithm ideal for embedded or memory-constrained environments.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Single Number II",
          description:
            "Every element appears three times except one. Use bit counting modulo 3 on each bit position, or a two-variable state machine (ones, twos) to track bits seen 1 or 2 times mod 3.",
        },
        {
          name: "Single Number III",
          description:
            "Two elements appear exactly once; all others appear twice. XOR all to get a XOR b, find a set bit to partition the array into two groups, then XOR each group independently.",
        },
        {
          name: "Find Missing Number",
          description:
            "XOR indices 0..n with all array values. The missing index survives because every present value cancels its index.",
        },
        {
          name: "Swap Without Temp Variable",
          description:
            "Use XOR to swap two integers in-place: a ^= b; b ^= a; a ^= b — no temporary variable needed, a classic XOR trick.",
        },
        {
          name: "Detect Duplicate in O(1) Space",
          description:
            "For arrays where every element appears an even number of times except one, XOR immediately identifies the odd-count element without any auxiliary data structure.",
        },
      ],
      tips: [
        "Memorize the two XOR identities: a^a=0 and a^0=a. These two rules explain every XOR-based algorithm.",
        "When you see 'appears k times except one element appears m times', think bit counting modulo k — XOR is the k=2 special case.",
        "XOR tricks only work when the 'extra' count is exactly 1. For counts > 1, generalize to modular bit counting.",
        "In interviews, always state the XOR properties explicitly before jumping to code — it signals deep understanding of why the trick works.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "XOR is a powerful bit manipulation tool: a^a=0 and a^0=a allow duplicate cancellation in a single pass.",
        "The algorithm runs in O(n) time and O(1) space — optimal on both dimensions for this problem.",
        "Order of XOR operations doesn't matter (commutativity + associativity), so a simple linear scan suffices.",
        "This technique generalizes: Single Number II uses mod-3 bit counting; Single Number III partitions by a distinguishing bit.",
        "Recognizing when XOR applies is a key interview skill — look for 'appears even times except one' patterns.",
        "The one-liner `reduce(xor, nums)` is idiomatic Python and demonstrates functional thinking alongside bit manipulation.",
      ],
    },
  },
};

export default function SingleNumberVideo() {
  return <AlgoVideo config={config} />;
}
