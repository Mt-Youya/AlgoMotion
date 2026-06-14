import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Hamming Distance",
  subtitle: "Counts positions at which two equal-length strings differ.",
  category: "string",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What Is Hamming Distance?",
      bullets: [
        "Given two strings A and B of equal length n, the Hamming Distance is the total number of index positions i where A[i] ≠ B[i].",
        "The strings must have the same length — Hamming Distance is undefined for strings of different lengths (unlike edit distance).",
        "Example: hamming('KAROLIN', 'KATHRIN') = 3 because positions 1, 2, and 5 differ (A vs T, R vs H, L vs I).",
        "For binary strings, Hamming Distance equals the number of bit positions where the two codewords differ — a fundamental concept in coding theory.",
        "The problem is equivalent to counting the number of mismatches in a single linear scan, making it one of the simplest string distance metrics.",
      ],
    },

    intuition: {
      heading: "The Core Insight",
      bullets: [
        "The algorithm is a straightforward parallel scan: walk both strings simultaneously and count every position where the characters do not match.",
        "No backtracking, no recursion, no extra data structures — one pass is sufficient because each position is independent of all others.",
        "For binary strings, XOR is the natural tool: A XOR B produces a 1 at every position where the bits differ. The Hamming Distance is then popcount(A XOR B).",
        "Modern CPUs have a dedicated POPCNT instruction that counts set bits in O(1) for 64-bit integers, enabling O(n/64) implementations for bit arrays.",
        "Real-world analogy: Imagine two answer sheets for a multiple-choice exam. Hamming Distance is simply the number of questions where the two students gave different answers — you just scan down both sheets simultaneously.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step: hamming('KAROLIN', 'KATHRIN')",
      steps: [
        {
          step: 1,
          description: "Initialize a counter to 0. We will scan both strings from left to right.",
        },
        {
          step: 2,
          description: "Position 0: A[0]='K', B[0]='K'. Characters match. Counter stays at 0.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "default", "default", "default", "default", "default", "default"],
        },
        {
          step: 3,
          description: "Position 1: A[1]='A', B[1]='A'. Characters match. Counter stays at 0.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "default", "default", "default", "default", "default"],
        },
        {
          step: 4,
          description: "Position 2: A[2]='R', B[2]='T'. Characters differ! Increment counter to 1.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "active", "default", "default", "default", "default"],
        },
        {
          step: 5,
          description: "Position 3: A[3]='O', B[3]='H'. Characters differ! Increment counter to 2.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "active", "active", "default", "default", "default"],
        },
        {
          step: 6,
          description: "Position 4: A[4]='L', B[4]='R'. Characters differ! Increment counter to 3.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "active", "active", "active", "default", "default"],
        },
        {
          step: 7,
          description: "Position 5: A[5]='I', B[5]='I'. Characters match. Counter stays at 3.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "active", "active", "active", "sorted", "default"],
        },
        {
          step: 8,
          description: "Position 6: A[6]='N', B[6]='N'. Characters match. Counter stays at 3.",
          values: ["K", "A", "R", "O", "L", "I", "N"],
          colors: ["sorted", "sorted", "active", "active", "active", "sorted", "sorted"],
        },
        {
          step: 9,
          description: "Scan complete. Return the counter value: Hamming Distance = 3.",
        },
        {
          step: 10,
          description:
            "Binary XOR example: '10110' XOR '11100' = '01010'. Count the 1s: 2 differences. Hamming Distance = 2.",
        },
        {
          step: 11,
          description:
            "The XOR approach is especially useful for binary strings and bit arrays because popcount(a XOR b) is a single hardware instruction on modern CPUs.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `def hamming_distance(a: str, b: str) -> int:
    """
    Compute the Hamming Distance between two equal-length strings.

    Args:
        a: First string of length n.
        b: Second string of length n (must equal len(a)).

    Returns:
        Number of positions where a[i] != b[i].

    Raises:
        ValueError: If the strings have different lengths.

    Time:  O(n)
    Space: O(1)
    """
    if len(a) != len(b):
        raise ValueError(
            f"Strings must have equal length, got {len(a)} and {len(b)}"
        )
    count = 0
    for ca, cb in zip(a, b):
        if ca != cb:
            count += 1
    return count


def hamming_distance_binary(a: int, b: int) -> int:
    """
    Hamming Distance for non-negative integers treated as bit strings.
    Uses XOR + popcount for O(1) hardware-level performance.
    """
    return bin(a ^ b).count("1")


def hamming_distance_numpy(a: str, b: str) -> int:
    """
    Vectorised version using numpy for large strings.
    Converts each string to a byte array and sums mismatches.
    """
    import numpy as np
    arr_a = np.frombuffer(a.encode(), dtype=np.uint8)
    arr_b = np.frombuffer(b.encode(), dtype=np.uint8)
    return int(np.sum(arr_a != arr_b))


# Example usage
if __name__ == "__main__":
    print(hamming_distance("KAROLIN", "KATHRIN"))   # 3
    print(hamming_distance("1011101", "1001001"))   # 2
    print(hamming_distance_binary(0b10110, 0b11100))  # 2
`,
      annotations: [
        {
          line: 16,
          note: "Guard clause: Hamming Distance is only defined for equal-length strings. Raise early rather than silently producing a wrong answer.",
        },
        {
          line: 20,
          note: "zip(a, b) pairs characters by position without creating an explicit index variable — Pythonic and avoids off-by-one errors.",
        },
        {
          line: 21,
          note: "Single character comparison. For Unicode strings this handles multi-byte characters correctly because Python strings are sequences of code points.",
        },
        {
          line: 30,
          note: "XOR (^) produces a 1-bit at every position where the two integers differ. bin().count('1') is Python's built-in popcount.",
        },
        {
          line: 38,
          note: "numpy.frombuffer converts the string to a raw byte array in O(n) without copying. The != operator produces a boolean array; sum counts True values.",
        },
        {
          line: 39,
          note: "This vectorised form is 10-100x faster than a Python loop for strings longer than a few thousand characters due to SIMD instructions.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n)",
          note: "Even if all characters match, we must still scan every position to confirm zero differences.",
        },
        {
          case: "Average",
          complexity: "O(n)",
          note: "Linear scan through both strings regardless of the distribution of mismatches.",
        },
        {
          case: "Worst",
          complexity: "O(n)",
          note: "All positions differ — still a single pass of length n. No worst-case blowup is possible.",
        },
      ],
      spaceRows: [
        {
          case: "Standard",
          complexity: "O(1)",
          note: "Only a single integer counter is needed; no auxiliary data structures.",
        },
        {
          case: "Bit-parallel (numpy)",
          complexity: "O(n/w)",
          note: "Where w is the word size (64 bits). The numpy byte-array approach allocates O(n) memory but processes w characters per CPU instruction.",
        },
      ],
      insights: [
        "Hamming Distance is optimal in the information-theoretic sense: every character must be examined at least once, so no algorithm can do better than O(n).",
        "For bit arrays stored as integers, the XOR + POPCNT trick runs in O(n/64) wall-clock time on 64-bit hardware, making it extremely fast in practice.",
        "Unlike Levenshtein (edit) distance, Hamming Distance does not allow insertions or deletions, so it cannot be applied to strings of different lengths — but this restriction makes it O(n) instead of O(n²).",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Hamming Weight (Popcount)",
          description:
            "hamming_weight(x) = hamming_distance(x, 0) — counts the number of 1-bits in a single integer. Used in error detection and cryptography.",
        },
        {
          name: "Normalized Hamming Distance",
          description:
            "Divide the raw count by the string length to get a value in [0, 1]. Useful for comparing strings of different lengths after alignment.",
        },
        {
          name: "Hamming Bound (Sphere-Packing Bound)",
          description:
            "In coding theory, the Hamming Bound limits how many codewords a binary code of length n can have if every pair has Hamming Distance ≥ d.",
        },
        {
          name: "Pairwise Hamming Matrix",
          description:
            "Compute the n×n distance matrix for a set of strings. Used in bioinformatics to cluster DNA sequences or detect mutations.",
        },
        {
          name: "Threshold Hamming Search",
          description:
            "Return True if hamming_distance(a, b) ≤ k without counting all differences — exit early once the threshold is exceeded for O(k) best case.",
        },
      ],
      tips: [
        "Use Python's built-in sum(c1 != c2 for c1, c2 in zip(a, b)) as a concise one-liner — it is as fast as the explicit loop and avoids boilerplate.",
        "For large binary datasets (genomics, machine learning feature vectors), use numpy or bitarray to exploit SIMD and avoid Python's interpreter overhead.",
        "When implementing error-correcting codes, remember that a code can correct up to ⌊(d-1)/2⌋ errors where d is the minimum Hamming Distance between any two codewords.",
        "In LeetCode problem 461, the inputs are integers — use bin(x ^ y).count('1') or Python 3.10's int.bit_count() for the cleanest solution.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Hamming Distance counts the number of positions where two equal-length strings differ — a single linear scan with an O(1) counter.",
        "The algorithm runs in O(n) time and O(1) space, and this is optimal: every character must be inspected at least once.",
        "For binary strings and integers, XOR followed by popcount (bin(a ^ b).count('1') or int.bit_count()) is the idiomatic and hardware-accelerated approach.",
        "Hamming Distance is the foundation of classical error-correcting codes (Hamming codes, Reed-Solomon) where minimum distance between codewords determines error-correction capacity.",
        "Unlike edit distance, Hamming Distance does not allow insertions or deletions, which keeps the complexity linear but restricts applicability to equal-length strings.",
        "In bioinformatics, Hamming Distance over DNA sequences (A/T/C/G alphabets) is used to find single-nucleotide polymorphisms (SNPs) and measure genetic divergence.",
      ],
    },
  },
}

export default function HammingDistanceVideo() {
  return <AlgoVideo config={config} />
}
