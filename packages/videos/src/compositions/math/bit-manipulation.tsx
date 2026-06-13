import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Bit Manipulation Basics",
  subtitle:
    "Common bit tricks: count set bits, check/set/clear a bit, detect power of two, and isolate the lowes",
  category: "math",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What is Bit Manipulation?",
      body: [
        "Modern CPUs operate natively on binary integers — bit manipulation lets us exploit that directly.",
        "Given an integer n, we want to inspect or modify individual bits using fast bitwise operators: AND (&), OR (|), XOR (^), NOT (~), and shifts (<< >>).",
        "Core tasks: check whether bit k is set, set bit k to 1, clear bit k to 0, count all set bits, detect powers of two, and isolate the lowest set bit.",
        "These operations execute in a single CPU instruction — O(1) — making them dramatically faster than equivalent arithmetic loops.",
        "Bit tricks appear everywhere: compression codecs, cryptography, graphics (pixel blending), network masks, Fenwick trees, and competitive programming.",
      ],
      callout:
        "All operations below assume 32-bit or 64-bit two's-complement integers, which covers Python ints and every common C/C++/Java type.",
    },

    intuition: {
      heading: "Thinking in Binary",
      body: [
        "Every integer is just a sequence of 0s and 1s. Bit k represents the value 2^k.",
        "To target bit k, build a mask: 1 << k shifts the number 1 left by k positions, giving a value with only bit k set.",
        "AND with the mask checks the bit; OR with the mask sets it; AND with the inverted mask (~mask) clears it.",
        "n & (n-1) is the 'magic' expression that clears the lowest set bit — repeating it until n == 0 counts all set bits in O(popcount) time.",
        "n & (-n) isolates the lowest set bit because -n in two's complement flips all bits then adds 1, leaving only the rightmost 1 intact.",
      ],
      analogy:
        "Think of a light panel with 32 switches (bits). AND is 'keep a light on only if both panels agree'. OR is 'turn on if either panel has it on'. XOR is 'toggle'. A mask is a stencil: you cut holes only where you want to read or write, leaving everything else unchanged.",
    },

    walkthrough: {
      steps: [
        {
          label: "Start: n = 42",
          description:
            "Our working number is 42. In binary: 0b00101010. Bits 1, 3, and 5 are set (counting from 0 at the right).",
        },
        {
          label: "Build a mask for bit 3",
          description:
            "mask = 1 << 3 = 8 = 0b00001000. This mask has exactly one bit set — bit 3 — which is the position we want to inspect.",
        },
        {
          label: "CHECK bit 3",
          description:
            "42 & 8 = 0b00101010 & 0b00001000 = 0b00001000 = 8. Result is non-zero, so bit 3 IS set in 42.",
        },
        {
          label: "SET bit 0 (currently clear)",
          description:
            "42 | 1 = 0b00101010 | 0b00000001 = 0b00101011 = 43. The OR forces bit 0 to 1 regardless of its previous value.",
        },
        {
          label: "CLEAR bit 3 (currently set)",
          description:
            "42 & ~8 = 0b00101010 & 0b11110111 = 0b00100010 = 34. The AND with the inverted mask forces bit 3 to 0.",
        },
        {
          label: "Count set bits in 29 (Kernighan)",
          description:
            "29 = 0b00011101. Step 1: 29 & 28 = 28 (0b00011100). Step 2: 28 & 27 = 24. Step 3: 24 & 23 = 16. Step 4: 16 & 15 = 0. Four iterations → 4 set bits.",
        },
        {
          label: "Detect power of two: n = 16",
          description:
            "16 = 0b00010000. 16 & 15 = 0b00010000 & 0b00001111 = 0. Result is 0 and n > 0, so 16 IS a power of two.",
        },
        {
          label: "Detect power of two: n = 18",
          description:
            "18 = 0b00010010. 18 & 17 = 0b00010010 & 0b00010001 = 0b00010000 = 16 ≠ 0. So 18 is NOT a power of two.",
        },
        {
          label: "Isolate lowest set bit of 52",
          description:
            "52 = 0b00110100. -52 in two's complement = 0b11001100. 52 & (-52) = 0b00000100 = 4. Only bit 2 survives — the lowest set bit.",
        },
        {
          label: "XOR swap: a=5, b=9",
          description:
            "a ^= b → a = 12. b ^= a → b = 5. a ^= b → a = 9. After three XOR operations the values are swapped with zero extra memory.",
        },
        {
          label: "Find single non-duplicate with XOR",
          description:
            "Array [4, 1, 2, 1, 2]. XOR all: 4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4. Every duplicate cancels itself, leaving the unique element.",
        },
        {
          label: "Toggle bit k with XOR",
          description:
            "n ^ (1 << k) flips bit k. If it was 0 it becomes 1; if it was 1 it becomes 0. Useful for toggling flags without branching.",
        },
      ],
    },

    code: {
      snippet: `def count_set_bits(n: int) -> int:
    """Count the number of 1-bits in n (Kernighan's trick)."""
    count = 0
    while n:
        n &= n - 1   # clear the lowest set bit
        count += 1
    return count


def check_bit(n: int, k: int) -> bool:
    """Return True if bit k of n is set."""
    return bool(n & (1 << k))


def set_bit(n: int, k: int) -> int:
    """Return n with bit k forced to 1."""
    return n | (1 << k)


def clear_bit(n: int, k: int) -> int:
    """Return n with bit k forced to 0."""
    return n & ~(1 << k)


def toggle_bit(n: int, k: int) -> int:
    """Return n with bit k flipped."""
    return n ^ (1 << k)


def is_power_of_two(n: int) -> bool:
    """Return True if n is a positive power of two."""
    return n > 0 and (n & (n - 1)) == 0


def lowest_set_bit(n: int) -> int:
    """Isolate and return the lowest set bit of n."""
    return n & (-n)


# ── Demo ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print(count_set_bits(29))   # 4
    print(check_bit(42, 3))     # True
    print(set_bit(42, 0))       # 43
    print(clear_bit(42, 3))     # 34
    print(is_power_of_two(16))  # True
    print(lowest_set_bit(52))   # 4`,
      language: "python",
      annotations: [
        {
          lines: [1, 2, 3, 4, 5, 6],
          note: "count_set_bits uses Kernighan's trick: n & (n-1) always clears the rightmost set bit. The loop runs exactly popcount(n) times — far fewer than 32/64 iterations for sparse integers.",
        },
        {
          lines: [10, 11],
          note: "check_bit builds the mask 1 << k and ANDs it with n. The result is non-zero (truthy) only if bit k was set.",
        },
        {
          lines: [14, 15, 18, 19],
          note: "set_bit uses OR (forces the target bit to 1); clear_bit uses AND with the bitwise NOT of the mask (forces the target bit to 0). Both leave all other bits unchanged.",
        },
        {
          lines: [22, 23],
          note: "toggle_bit XORs with the mask. XOR with 1 flips the bit: 0^1=1, 1^1=0. This is branchless and works in a single instruction.",
        },
        {
          lines: [26, 27],
          note: "is_power_of_two exploits the fact that powers of two have exactly one set bit. n & (n-1) clears it, leaving 0. The n > 0 guard excludes zero.",
        },
        {
          lines: [30, 31],
          note: "lowest_set_bit uses two's-complement negation: -n = ~n + 1 flips all bits then adds 1, which propagates a carry through the trailing zeros and stops at the first 1. ANDing with n keeps only that bit.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best (single op)", value: "O(1)", color: "#CEEB5A" },
        { label: "Average (count bits)", value: "O(k)", color: "#2255CC" },
        { label: "Worst (count bits, 64-bit)", value: "O(64) = O(1)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary", value: "O(1)", color: "#CEEB5A" },
      ],
      notes: [
        "Every individual bit trick (check/set/clear/toggle/LSB/power-of-two) executes in O(1) — a constant number of CPU instructions.",
        "Kernighan's count_set_bits runs in O(k) where k = popcount(n). For 64-bit integers k ≤ 64, so it is effectively O(1) in practice.",
        "Hardware popcount instructions (Python int.bit_count(), C __builtin_popcount) count all set bits in a single cycle — use them in production code.",
      ],
    },

    variations: {
      items: [
        "Bit masking arrays: store a set of integers 0..63 as a single 64-bit integer for O(1) union, intersection, and membership tests.",
        "Gray code: n ^ (n >> 1) converts a binary integer to its Gray-code equivalent, where consecutive values differ by exactly one bit — used in rotary encoders.",
        "Fenwick (Binary Indexed) Tree: uses lowest_set_bit (n & -n) to navigate the tree structure in O(log n) prefix-sum queries.",
        "Bitmask DP: represent subsets of n elements as integers 0..(2^n - 1); iterate over all 2^n subsets with O(1) subset transitions.",
        "SIMD / bit-parallel algorithms: pack multiple boolean values into one word and process all of them with a single bitwise instruction — used in regex engines and chess engines.",
      ],
      tips: [
        "Always test n > 0 before applying is_power_of_two — zero satisfies n & (n-1) == 0 but is not a power of two.",
        "In Python, integers have arbitrary precision; the ~ operator returns -(n+1) due to two's-complement semantics. Use n & 0xFFFFFFFF to mask to 32 bits when needed.",
        "Prefer Python's built-in int.bit_count() (Python 3.10+) and int.bit_length() over manual loops for production code.",
        "XOR swap looks clever but modern compilers generate identical or better code for the temporary-variable swap — use it for educational purposes, not micro-optimisation.",
      ],
    },

    summary: {
      keyPoints: [
        "Bitwise operators (AND, OR, XOR, NOT, shifts) work directly on binary representations and execute in O(1).",
        "Build a mask with 1 << k to target bit k; combine with &, |, or ^ to check, set, clear, or toggle that bit.",
        "n & (n-1) clears the lowest set bit — loop until zero to count all set bits (Kernighan's trick).",
        "n & (n-1) == 0 (with n > 0) is the single-expression test for powers of two.",
        "n & (-n) isolates the lowest set bit, enabling efficient Fenwick tree navigation and bit iteration.",
        "XOR is self-inverse: a^a=0 and a^0=a — this powers the no-temp swap and the single-duplicate-finder pattern.",
      ],
    },
  },
};

export default function BitManipulationVideo() {
  return <AlgoVideo config={config} />;
}
