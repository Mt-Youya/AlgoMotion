import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Popcount",
  subtitle:
    "Counts the number of set bits (1s) in an integer using Brian Kernighan's trick in O(k) where k is th",
  category: "bit-manipulation",
  difficulty: "beginner",

  chapters: [
    {
      kind: "problem",
      heading: "Problem: Count Set Bits in an Integer",
      bullets: [
        "Given a non-negative integer n, count how many bits in its binary representation are 1 (set bits).",
        "Example: n = 13 → binary 1101₂ → 3 set bits (the 1, 4, and 8 positions are set).",
        "Example: n = 0 → binary 00000000₂ → 0 set bits.",
        "Example: n = 255 → binary 11111111₂ → 8 set bits (all bits of a byte are set).",
        "The naive approach checks every bit with a loop in O(log n), but Brian Kernighan's trick runs in O(k) where k is the number of set bits — often much faster for sparse integers.",
      ],
    },

    {
      kind: "intuition",
      heading: "Intuition: Peel Off One Set Bit at a Time",
      bullets: [
        "The core observation: n & (n − 1) always clears the lowest set bit of n, leaving all other bits unchanged.",
        "Why? Subtracting 1 from n flips the lowest set bit to 0 and all lower bits to 1. ANDing with n zeroes all those flipped positions.",
        "So each iteration of the loop removes exactly one '1' from n. The loop runs exactly k times, where k is the number of set bits.",
        "We increment a counter on each iteration and stop when n becomes 0 (no set bits remain).",
        "Real-world analogy: Imagine a bag of marbles where you always pull out the smallest marble. Each pull removes exactly one marble. You count pulls until the bag is empty — that count equals the original number of marbles.",
      ],
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough: n = 13 (1101₂)",
      steps: [
        {
          step: 1,
          description: "Initialize: n = 13 (binary: 1101), count = 0.",
        },
        {
          step: 2,
          description:
            "Iteration 1 — n is non-zero (13 ≠ 0), so enter the loop.",
        },
        {
          step: 3,
          description:
            "Compute n − 1 = 12 (binary: 1100). The lowest set bit (bit 0) is cleared.",
        },
        {
          step: 4,
          description:
            "Compute n & (n−1) = 13 & 12 = 1101 & 1100 = 1100 = 12. n is now 12.",
        },
        {
          step: 5,
          description: "Increment count: count = 1.",
        },
        {
          step: 6,
          description:
            "Iteration 2 — n = 12 (1100) ≠ 0. Compute 12 & 11 = 1100 & 1011 = 1000 = 8. n = 8.",
        },
        {
          step: 7,
          description: "Increment count: count = 2.",
        },
        {
          step: 8,
          description:
            "Iteration 3 — n = 8 (1000) ≠ 0. Compute 8 & 7 = 1000 & 0111 = 0000 = 0. n = 0.",
        },
        {
          step: 9,
          description: "Increment count: count = 3.",
        },
        {
          step: 10,
          description:
            "Loop condition: n = 0, so the while loop exits.",
        },
        {
          step: 11,
          description:
            "Return count = 3. Verified: 13 = 1101₂ has exactly three 1-bits.",
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `def popcount(n: int) -> int:
    """
    Count the number of set bits (1s) in a non-negative integer.
    Uses Brian Kernighan's bit trick: n & (n-1) clears the lowest set bit.
    Time:  O(k) where k = number of set bits
    Space: O(1)
    """
    count = 0
    while n:
        n &= n - 1   # clears the lowest set bit of n
        count += 1
    return count


# Alternative: built-in (CPython uses fast native popcount)
def popcount_builtin(n: int) -> int:
    return bin(n).count('1')


# Alternative: lookup-table for 8-bit chunks (O(1) per byte)
_TABLE = [bin(i).count('1') for i in range(256)]

def popcount_table(n: int) -> int:
    count = 0
    while n:
        count += _TABLE[n & 0xFF]
        n >>= 8
    return count


if __name__ == "__main__":
    assert popcount(0)   == 0
    assert popcount(1)   == 1
    assert popcount(13)  == 3   # 1101
    assert popcount(255) == 8   # 11111111
    print("All tests passed.")`,
      annotations: [
        {
          line: 10,
          note: "n &= n - 1 is the Kernighan trick. It clears the rightmost set bit in a single O(1) operation.",
        },
        {
          line: 11,
          note: "We count one set bit per iteration. The loop runs exactly popcount(n) times.",
        },
        {
          line: 16,
          note: "Python's bin() converts n to a binary string; .count('1') counts set bits. Convenient but hides the mechanism.",
        },
        {
          line: 19,
          note: "A 256-entry lookup table precomputes popcount for all 8-bit values. Processing the integer 8 bits at a time gives O(⌈log₂₅₆ n⌉) iterations.",
        },
        {
          line: 23,
          note: "n & 0xFF extracts the lowest byte; _TABLE gives its popcount instantly. Then shift right 8 bits to process the next byte.",
        },
        {
          line: 29,
          note: "Assertions serve as lightweight unit tests covering edge cases: zero, power-of-two, mixed bits, and all-ones byte.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          label: "Best case",
          value: "O(1)",
          note: "n = 0; loop never executes.",
        },
        {
          label: "Average case",
          value: "O(k)",
          note: "k set bits; random 32-bit int has ~16 set bits on average.",
        },
        {
          label: "Worst case",
          value: "O(log n)",
          note: "All bits set (e.g., n = 2^b − 1); k = b = log₂(n+1) iterations.",
        },
      ],
      spaceRows: [
        {
          label: "Auxiliary space",
          value: "O(1)",
          note: "Only two scalar variables: n (mutated in-place) and count.",
        },
      ],
      insights: [
        "For sparse integers (few set bits), Kernighan's trick is significantly faster than the naive bit-shift loop which always runs log₂(n) iterations.",
        "Modern CPUs expose a native POPCNT instruction (x86: POPCNT, ARM: VCNT). Python's int.bit_count() (3.10+) and C's __builtin_popcount() map directly to it — O(1) hardware.",
        "The lookup-table variant trades 256 bytes of memory for a constant-factor speedup on large integers by processing 8 bits per step instead of 1 bit per step.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Naive bit-shift loop",
          description:
            "Shift n right by 1 each iteration and check the LSB with n & 1. Always runs ⌊log₂ n⌋ + 1 iterations regardless of set-bit density.",
        },
        {
          name: "Lookup table (8-bit chunks)",
          description:
            "Precompute popcount for all 256 byte values. Process the integer one byte at a time with (n >> 8k) & 0xFF. O(⌈bits/8⌉) iterations.",
        },
        {
          name: "Parallel bit-counting (SWAR)",
          description:
            "Use SIMD-within-a-register arithmetic: fold 64-bit integer into pairs, nibbles, bytes with masking and shifting. Computes popcount in O(log b) arithmetic ops — basis of hardware POPCNT.",
        },
        {
          name: "int.bit_count() — Python 3.10+",
          description:
            "Built-in method that delegates to the platform's native popcount instruction. Always prefer this in production Python code.",
        },
        {
          name: "Hamming weight of XOR (Hamming distance)",
          description:
            "popcount(a XOR b) counts the number of bit positions where a and b differ — the Hamming distance. Core primitive in error-correcting codes and similarity hashing.",
        },
      ],
      tips: [
        "In competitive programming, use bin(n).count('1') or n.bit_count() (Python 3.10+) for brevity; implement Kernighan's trick when you need to demonstrate understanding.",
        "When processing many integers, the lookup-table approach amortises the table-build cost and outperforms Kernighan's trick due to fewer iterations per integer.",
        "Be careful with negative integers in languages with fixed-width signed types (e.g., C's int): use unsigned types or mask with 0xFFFFFFFF to avoid sign-extension surprises. Python integers are arbitrary-precision and always non-negative when you pass a natural number.",
        "Kernighan's trick generalises: you can isolate the lowest set bit with n & (-n), clear it with n & (n-1), and toggle it with n ^ (n & (-n)) — these three primitives cover most bit-manipulation interview problems.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      bullets: [
        "Popcount (population count) counts the number of 1-bits in an integer's binary representation.",
        "Brian Kernighan's trick — n &= n − 1 — clears the lowest set bit in O(1), so the loop runs exactly k times for k set bits.",
        "Time complexity is O(k), which beats the naive O(log n) bit-shift loop when the integer is sparse (few set bits).",
        "Space complexity is O(1); no auxiliary data structures are needed.",
        "In Python 3.10+, prefer int.bit_count() for production code — it maps to a single hardware instruction on modern CPUs.",
        "Popcount is a foundational primitive: it powers Hamming distance, parity checks, chess bitboard evaluation, and fingerprint similarity in machine learning.",
      ],
    },
  ],
};

export default function PopcountVideo() {
  return <AlgoVideo config={config} />;
}
