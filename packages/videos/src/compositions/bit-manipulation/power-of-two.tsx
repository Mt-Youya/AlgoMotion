import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Power of Two",
  subtitle: "Determines whether a given integer is a power of two using the bit trick n & (n-1) == 0.",
  category: "bit-manipulation",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "Is n a Power of Two?",
      body: [
        "Given an integer n, return true if n is a power of two, false otherwise.",
        "Powers of two are: 1, 2, 4, 8, 16, 32, 64, 128, ... (2^0, 2^1, 2^2, ...)",
        "A number is a power of two if it can be expressed as 2^k for some non-negative integer k.",
        "Edge cases: 0 and negative numbers are never powers of two.",
        "The naive approach loops and divides by 2 — but there is a one-line bit trick.",
      ],
      callout:
        "LeetCode 231 — Easy. Appears frequently in bit-manipulation warm-up rounds.",
    },
    intuition: {
      heading: "The One-Bit Property",
      body: [
        "In binary, every power of two has exactly one 1-bit: 1=0001, 2=0010, 4=0100, 8=1000.",
        "Subtracting 1 from a power of two flips that single 1-bit to 0 and sets all lower bits to 1.",
        "Example: 8 = 1000₂, 8-1 = 7 = 0111₂. Their AND is 1000 & 0111 = 0000.",
        "For non-powers (e.g. 6 = 0110), 6-1 = 5 = 0101, and 0110 & 0101 = 0100 ≠ 0.",
        "So n & (n-1) == 0 is true if and only if n has exactly one set bit — i.e. it is a power of two.",
      ],
      analogy:
        "Think of a power-of-two like a single lit candle in a dark room. Subtracting 1 blows out that candle and lights every smaller candle instead. ANDing the two states leaves complete darkness — zero.",
    },
    walkthrough: {
      steps: [
        {
          label: "Input: n = 16",
          description:
            "We receive n = 16. Our goal is to decide in O(1) whether this is a power of two.",
        },
        {
          label: "Guard Check: n > 0?",
          description:
            "First verify n > 0. Zero and negatives can never be powers of two. 16 > 0, so we continue.",
        },
        {
          label: "Binary of n = 16",
          description:
            "16 in binary is 00010000₂. Notice exactly one bit is set — this is the hallmark of a power of two.",
        },
        {
          label: "Compute n - 1 = 15",
          description:
            "15 in binary is 00001111₂. Subtracting 1 flipped the single 1-bit off and filled all lower positions with 1.",
        },
        {
          label: "Bitwise AND: 16 & 15",
          description:
            "00010000 & 00001111 = 00000000. Every bit position has a 0 in at least one operand, so the result is 0.",
        },
        {
          label: "Result: 0 == 0 → True",
          description:
            "The AND result equals 0, so we return true. n = 16 is indeed a power of two (2^4).",
        },
        {
          label: "Counter-example: n = 12",
          description:
            "12 = 00001100₂, 11 = 00001011₂. AND = 00001000 = 8 ≠ 0, so 12 is not a power of two.",
        },
        {
          label: "Counter-example: n = 0",
          description:
            "The guard n > 0 catches this immediately. We return false without touching the bit trick.",
        },
        {
          label: "Counter-example: n = 1",
          description:
            "1 = 00000001₂, 0 = 00000000₂. AND = 0. Return true — 1 is 2^0, a valid power of two.",
        },
        {
          label: "General Rule",
          description:
            "The full check is: return n > 0 and (n & (n - 1)) == 0. Two operations, constant time, no branching beyond the guard.",
        },
      ],
    },
    code: {
      snippet: `def is_power_of_two(n: int) -> bool:
    """Return True if n is a power of two."""
    # Step 1: guard against zero and negatives
    if n <= 0:
        return False

    # Step 2: apply the bit trick
    # Powers of two have exactly one set bit.
    # n - 1 flips that bit off and turns on all lower bits.
    # Their AND is therefore 0 if and only if n is a power of two.
    return (n & (n - 1)) == 0


# Alternative: using bit_count (Python 3.10+)
def is_power_of_two_v2(n: int) -> bool:
    return n > 0 and n.bit_count() == 1


# Alternative: logarithm approach (floating-point risk)
import math
def is_power_of_two_v3(n: int) -> bool:
    if n <= 0:
        return False
    log_val = math.log2(n)
    return log_val == int(log_val)


# Test cases
assert is_power_of_two(1)   == True   # 2^0
assert is_power_of_two(2)   == True   # 2^1
assert is_power_of_two(16)  == True   # 2^4
assert is_power_of_two(0)   == False  # edge case
assert is_power_of_two(6)   == False  # not a power
assert is_power_of_two(-4)  == False  # negative`,
      language: "python",
      annotations: [
        {
          lines: [3, 4],
          note: "Guard clause: zero and negative numbers are never powers of two. Without this, n=0 would pass the bit trick because 0 & (-1) = 0.",
        },
        {
          lines: [10],
          note: "Core bit trick: n & (n-1) clears the lowest set bit of n. If n has exactly one set bit (power of two), the result is 0.",
        },
        {
          lines: [14, 15],
          note: "Python 3.10+ provides bit_count() which counts set bits directly. One set bit means power of two — cleaner but less portable.",
        },
        {
          lines: [18, 19, 20, 21],
          note: "The logarithm approach works mathematically but risks floating-point precision errors for large n. Prefer the bit trick.",
        },
        {
          lines: [24, 25, 26, 27, 28, 29],
          note: "Comprehensive test cases cover: smallest power (1), typical powers, zero, non-power, and negative input.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best",    value: "O(1)", color: "#4ade80" },
        { label: "Average", value: "O(1)", color: "#4ade80" },
        { label: "Worst",   value: "O(1)", color: "#4ade80" },
      ],
      spaceRows: [
        { label: "Auxiliary", value: "O(1)", color: "#4ade80" },
        { label: "Total",     value: "O(1)", color: "#4ade80" },
      ],
      notes: [
        "A single bitwise AND and a comparison — two CPU instructions regardless of the magnitude of n.",
        "No loops, no recursion, no auxiliary data structures of any kind.",
        "Contrast with the division loop approach which runs in O(log n) — the bit trick is asymptotically and practically faster.",
      ],
    },
    variations: {
      items: [
        "Power of Three — n > 0 and 1162261467 % n == 0 (largest int power of 3 divisibility trick).",
        "Power of Four — must be a power of two AND the set bit must be in an even position: n > 0 and (n & (n-1)) == 0 and (n & 0xAAAAAAAA) == 0.",
        "Power of Two (any sign) — sometimes problems allow n=1 to be the only valid case; always read constraints.",
        "Count powers of two up to N — use bit_length() or integer logarithm to enumerate efficiently.",
        "Next power of two — given n, find the smallest power of two >= n using bit manipulation: 1 << (n-1).bit_length().",
      ],
      tips: [
        "Always add the n > 0 guard first — forgetting it is the most common bug on this problem.",
        "The bit trick generalises: n & (n-1) removes the lowest set bit, so (n & (n-1)) == 0 means 'at most one set bit'.",
        "For powers of four, combine the power-of-two check with a mask: 0x55555555 keeps only odd-position bits (0-indexed from LSB).",
        "In competitive programming, integer bit tricks like this are constant-time and branch-free — prefer them over math.log2 to avoid floating-point surprises.",
      ],
    },
    summary: {
      keyPoints: [
        "A positive integer is a power of two if and only if it has exactly one set bit in its binary representation.",
        "The bit trick n & (n-1) == 0 detects this in O(1) time and O(1) space with two CPU operations.",
        "Always guard with n > 0 — zero would incorrectly pass the bit check without the guard.",
        "The same trick generalises: n & (n-1) clears the lowest set bit, enabling O(k) popcount and other algorithms.",
        "Python 3.10+ offers n.bit_count() == 1 as a readable alternative; the bit trick is more portable.",
        "Related problems — Power of Three, Power of Four, Next Power of Two — each build on this core insight.",
      ],
    },
  },
}

export default function PowerOfTwoVideo() {
  return <AlgoVideo config={config} />
}
