import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Reverse Bits",
  subtitle: "Reverses the bits of a 32-bit unsigned integer by iteratively extracting the LSB and building the re",
  category: "bit-manipulation",
  difficulty: "beginner",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given a 32-bit unsigned integer n, reverse all of its bits and return the result as an unsigned integer.",
        "For example, input 43261596 has binary 00000010100101000001111010011100; reversed it becomes 00111001011110000010100101000000 = 964176192.",
        "The reversal is purely bitwise: the most-significant bit becomes the least-significant bit and vice versa.",
        "The integer is always treated as exactly 32 bits, so leading zeros are significant and must be preserved in the reversal.",
        "This is a classic bit-manipulation problem that tests understanding of bitwise shift and OR operations.",
      ],
    },
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Think of the 32-bit number as a sequence of 32 slots. We want to read them right-to-left and write them left-to-right.",
        "In each iteration we peel off the rightmost bit (LSB) of n using n & 1, then shift n right to expose the next bit.",
        "Simultaneously we build the result by shifting it left (making room) and OR-ing in the extracted bit.",
        "After 32 such iterations the result holds all bits of n in reversed order.",
        "Real-world analogy: imagine reversing a string of 32 coins laid in a row — you pick from one end and place on the other, one coin at a time, until all coins are moved.",
      ],
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize result = 0. We will accumulate the reversed bits here over 32 iterations.",
        },
        {
          step: 2,
          description:
            "Iteration 1: n = 43261596. Compute lsb = n & 1 = 0. Shift result left: result = (0 << 1) | 0 = 0. Shift n right: n = 21630798.",
        },
        {
          step: 3,
          description: "Iteration 2: n = 21630798. lsb = n & 1 = 0. result = (0 << 1) | 0 = 0. n >>= 1 → n = 10815399.",
        },
        {
          step: 4,
          description: "Iteration 3: n = 10815399. lsb = 1. result = (0 << 1) | 1 = 1. n >>= 1 → n = 5407699.",
        },
        {
          step: 5,
          description: "Iteration 4: n = 5407699. lsb = 1. result = (1 << 1) | 1 = 3. n >>= 1 → n = 2703849.",
        },
        {
          step: 6,
          description:
            "Each iteration the result grows by one bit appended at the right, while n shrinks by one bit from the right.",
        },
        {
          step: 7,
          description:
            "After 16 iterations we have processed the lower half of n's bits; result now contains those bits in reversed order in its upper half.",
        },
        {
          step: 8,
          description:
            "Iterations 17–32 process the upper half of n (which was shifted down) and place them into the lower half of result.",
        },
        {
          step: 9,
          description:
            "After iteration 32: n = 0 (all bits consumed). result = 964176192 = 0b00111001011110000010100101000000.",
        },
        {
          step: 10,
          description: "Return result. The 32-bit reversal is complete in exactly 32 fixed iterations — O(1) time.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `def reverseBits(n: int) -> int:
    """
    Reverse bits of a 32-bit unsigned integer.

    Args:
        n: A 32-bit unsigned integer (0 <= n <= 2^32 - 1).

    Returns:
        The integer formed by reversing all 32 bits of n.

    Time:  O(1) — exactly 32 iterations
    Space: O(1) — only two integer variables used
    """
    result = 0
    for _ in range(32):
        # Make room for the next bit in result
        result <<= 1
        # Extract the least-significant bit of n
        result |= (n & 1)
        # Discard the processed LSB from n
        n >>= 1
    return result


# Alternative one-liner using bit_length tricks (same complexity)
def reverseBits_alt(n: int) -> int:
    result = 0
    for i in range(32):
        if (n >> i) & 1:
            result |= 1 << (31 - i)
    return result


# Quick test
if __name__ == "__main__":
    assert reverseBits(43261596) == 964176192
    assert reverseBits(4294967293) == 3221225471
    assert reverseBits(0) == 0
    assert reverseBits(2**32 - 1) == 2**32 - 1
    print("All tests passed.")
`,
      annotations: [
        {
          lines: "11",
          note: "result <<= 1 shifts all accumulated bits one position left, making the rightmost slot available for the new bit.",
        },
        {
          lines: "13",
          note: "n & 1 isolates the least-significant bit of n (either 0 or 1). OR-ing it into result places it in the vacated slot.",
        },
        {
          lines: "15",
          note: "n >>= 1 discards the bit we just processed, exposing the next bit as the new LSB for the following iteration.",
        },
        {
          lines: "19-22",
          note: "Alternative approach: for each bit position i in n, write it at mirror position (31-i) in result. Equivalent but slightly less cache-friendly.",
        },
        {
          lines: "25-29",
          note: "Sanity checks: all-zeros, all-ones, and a palindromic bit pattern should all self-verify the reversal logic.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Complexity Analysis",
      timeRows: [
        { label: "Best Case", value: "O(1)", note: "Always exactly 32 iterations" },
        { label: "Average Case", value: "O(1)", note: "Input size does not affect loop count" },
        { label: "Worst Case", value: "O(1)", note: "Fixed upper bound of 32 steps" },
      ],
      spaceRows: [
        { label: "Auxiliary Space", value: "O(1)", note: "Only two scalar integers: result and n" },
        { label: "Input Space", value: "O(1)", note: "Single 32-bit integer input" },
      ],
      insights: [
        "Because the bit-width is fixed at 32, the algorithm runs in constant time regardless of the numeric value of n.",
        "No additional arrays or recursion stacks are needed — the transformation is entirely in-place on two integer registers.",
        "On hardware with a native RBIT instruction (e.g., ARM), this can be reduced to a single CPU cycle; the software loop is the portable fallback.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "64-bit Reverse Bits",
          description:
            "Extend the loop to 64 iterations to handle 64-bit unsigned integers. The logic is identical; only the iteration count and mask change.",
        },
        {
          name: "Reverse Bits with Lookup Table",
          description:
            "Precompute a 256-entry table mapping each byte to its bit-reversal. Then reverse a 32-bit integer by reversing its four bytes and looking each up — useful when the function is called millions of times.",
        },
        {
          name: "Bit Reversal via Divide-and-Conquer",
          description:
            "Swap adjacent bits, then pairs, then nibbles, then bytes, then half-words using bitmasks. Achieves the same result in O(log W) mask operations where W is the word size.",
        },
        {
          name: "Number of 1 Bits (Hamming Weight)",
          description:
            "A closely related problem: count set bits using n & (n-1) to clear the lowest set bit each iteration. Same iterative LSB extraction pattern.",
        },
        {
          name: "Palindrome in Binary",
          description:
            "After reversing the bits, check if the result equals the original n. If yes, the binary representation is a palindrome.",
        },
      ],
      tips: [
        "Always clarify whether the integer is signed or unsigned — Python integers are arbitrary precision, so masking with 0xFFFFFFFF may be needed in some contexts.",
        "For repeated calls in a hot path, the lookup-table variant (reversing byte-by-byte) is significantly faster in practice.",
        "Test edge cases: n=0 (all zeros), n=2^32-1 (all ones), and powers of two (single set bit) to validate correctness quickly.",
        "The divide-and-conquer bitmask approach is the most elegant for interview settings where you want to show knowledge of bit tricks beyond simple loops.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Reversing bits is achieved by repeatedly extracting the LSB of n and appending it to the result, which is shifted left each iteration.",
        "The algorithm runs in strictly O(1) time and O(1) space because the word size (32 bits) is a compile-time constant.",
        "The core pattern — (result << 1) | (n & 1) followed by n >>= 1 — appears in many bit-manipulation problems and is worth memorizing.",
        "Python's arbitrary-precision integers require masking (& 0xFFFFFFFF) when working with signed representations, but for unsigned problems the loop alone suffices.",
        "Three common implementations exist: iterative LSB extraction (simplest), lookup table (fastest for repeated calls), and divide-and-conquer bitmask (most elegant).",
        "This problem builds foundational intuition for more advanced bit-manipulation tasks such as Gray code conversion, bit-reversal permutations in FFT, and CRC computation.",
      ],
    },
  ],
}

export default function ReverseBitsVideo() {
  return <AlgoVideo config={config} />
}
