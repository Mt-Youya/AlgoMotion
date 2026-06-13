import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Fast Power",
  subtitle:
    "Computes x^n in O(log n) time by squaring, optionally with a modulo for large numbers.",
  category: "math",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What is Fast Power?",
      bullets: [
        "Given a base x and exponent n, compute x^n efficiently.",
        "The naive approach multiplies x by itself n times, taking O(n) time — too slow for large n.",
        "Fast Power (Binary Exponentiation) reduces this to O(log n) by repeatedly squaring the base.",
        "It also supports a modulo parameter to handle very large results without overflow, critical in cryptography and competitive programming.",
        "The algorithm works for integer, floating-point, and even matrix exponentiation.",
      ],
    },
    {
      kind: "intuition",
      heading: "The Squaring Insight",
      bullets: [
        "Instead of computing 2^8 as 2×2×2×2×2×2×2×2 (7 multiplications), notice: 2^8 = (2^4)^2 = ((2^2)^2)^2 — only 3 multiplications.",
        "If n is even: x^n = (x^(n/2))^2. If n is odd: x^n = x · (x^((n-1)/2))^2.",
        "Each recursive step halves n, so the depth is O(log n).",
        "The binary representation of n tells us exactly when to multiply the result: each '1' bit means 'include this power of x'.",
        "Real-world analogy: folding a piece of paper. Each fold doubles the thickness. After log₂(n) folds you reach thickness n — far fewer steps than adding one layer at a time.",
      ],
    },
    {
      kind: "walkthrough",
      heading: "Trace: 2^13 Step by Step",
      steps: [
        {
          label: "Initialize",
          description:
            "Set base = 2, n = 13, result = 1. We will process bits of n from least significant to most significant.",
        },
        {
          label: "Step 1 — n=13 (odd)",
          description:
            "n & 1 == 1, so result = result × base = 1 × 2 = 2. Then square base: base = 2×2 = 4. Shift: n = 13 >> 1 = 6.",
        },
        {
          label: "Step 2 — n=6 (even)",
          description:
            "n & 1 == 0, skip result update. Square base: base = 4×4 = 16. Shift: n = 6 >> 1 = 3.",
        },
        {
          label: "Step 3 — n=3 (odd)",
          description:
            "n & 1 == 1, so result = 2 × 16 = 32. Square base: base = 16×16 = 256. Shift: n = 3 >> 1 = 1.",
        },
        {
          label: "Step 4 — n=1 (odd)",
          description:
            "n & 1 == 1, so result = 32 × 256 = 8192. Square base: base = 256×256 = 65536. Shift: n = 1 >> 1 = 0.",
        },
        {
          label: "Loop ends",
          description:
            "n == 0, exit the while loop. result = 8192 = 2^13. Correct!",
        },
        {
          label: "Binary view",
          description:
            "13 in binary is 1101. The '1' bits at positions 3, 2, 0 correspond to 2^8=256, 2^4=16, 2^1=2. Product: 256 × 16 × 2 = 8192.",
        },
        {
          label: "Modular variant",
          description:
            "For 2^1000 mod (10^9+7), apply mod at each multiplication: result = (result * base) % mod and base = (base * base) % mod.",
        },
        {
          label: "Negative exponent",
          description:
            "For x^(-n), compute 1 / fast_pow(x, n). For modular inverse, use Fermat's little theorem: x^(mod-2) mod p gives x^(-1) mod p.",
        },
        {
          label: "Result verified",
          description:
            "2^13 = 8192. The algorithm used only 4 iterations (log₂13 ≈ 3.7), versus 12 multiplications in the naive approach.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Implementation",
      snippet: `def fast_power(x: float, n: int, mod: int = 0) -> float:
    \"\"\"
    Compute x^n in O(log n).
    If mod > 0, return (x^n) % mod.
    Handles negative exponents by inverting x.
    \"\"\"
    if n < 0:
        x = 1 / x
        n = -n

    result = 1
    base = x

    while n > 0:
        # If current bit of n is set, multiply result by current base power
        if n & 1:
            result = result * base
            if mod:
                result = result % mod

        # Square the base for the next bit position
        base = base * base
        if mod:
            base = base % mod

        # Shift n right to process next bit
        n >>= 1

    return result


def fast_power_recursive(x: float, n: int) -> float:
    \"\"\"Recursive variant — cleaner but O(log n) stack space.\"\"\"
    if n == 0:
        return 1
    if n < 0:
        return fast_power_recursive(1 / x, -n)
    half = fast_power_recursive(x, n // 2)
    if n % 2 == 0:
        return half * half
    return x * half * half
`,
      annotations: [
        {
          lines: [8, 9],
          note: "Handle negative exponents by inverting the base and flipping the sign of n.",
        },
        {
          lines: [14, 18],
          note: "Check the least-significant bit of n. If set, this power of base contributes to the result.",
        },
        {
          lines: [21, 23],
          note: "Square the base each iteration so base = x^(2^k) at step k.",
        },
        {
          lines: [26],
          note: "Right-shift n to move to the next bit — equivalent to integer division by 2.",
        },
        {
          lines: [33, 38],
          note: "Recursive version: split the problem in half, reuse the half-result, and handle odd n with one extra multiplication.",
        },
        {
          lines: [15, 22],
          note: "Apply modulo after each multiplication to prevent integer overflow when working with large numbers.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Complexity Analysis",
      timeRows: [
        { label: "Best case", value: "O(log n)", note: "n is a power of 2 — all bits except the leading one are 0" },
        { label: "Average case", value: "O(log n)", note: "Expected ~(log n)/2 multiplications for result, log n squarings" },
        { label: "Worst case", value: "O(log n)", note: "n = 2^k - 1 (all bits set) — maximum multiplications" },
      ],
      spaceRows: [
        { label: "Iterative", value: "O(1)", note: "Only a handful of variables regardless of n" },
        { label: "Recursive", value: "O(log n)", note: "Call stack depth equals the number of bits in n" },
      ],
      insights: [
        "The number of iterations equals the number of bits in n, which is ⌊log₂n⌋ + 1.",
        "For n = 10^18 (common in competitive programming), naive takes 10^18 steps; fast power takes only ~60.",
        "Modular arithmetic adds no asymptotic cost — just a constant factor per multiplication.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Applications",
      variations: [
        {
          name: "Matrix Exponentiation",
          description:
            "Replace scalar multiplication with matrix multiplication. Computes M^n in O(k³ log n) where k is the matrix size. Used to solve linear recurrences (Fibonacci in O(log n)).",
        },
        {
          name: "Modular Inverse via Fermat",
          description:
            "For prime modulus p, x^(-1) mod p = x^(p-2) mod p by Fermat's little theorem. Directly uses fast_power(x, p-2, p).",
        },
        {
          name: "Polynomial Exponentiation",
          description:
            "Raise a polynomial to a large power modulo another polynomial. Used in NTT-based algorithms and cyclic group computations.",
        },
        {
          name: "Left-to-Right Binary Method",
          description:
            "Process bits from most significant to least significant. Equivalent asymptotically but sometimes preferred for side-channel resistance in cryptography.",
        },
        {
          name: "Montgomery Multiplication",
          description:
            "An optimized modular multiplication technique that avoids expensive division. Combined with fast power for high-performance RSA and elliptic curve operations.",
        },
      ],
      tips: [
        "Always use the iterative version in production — it avoids stack overflow for large n and has better cache behavior.",
        "When working modulo a prime p, you can compute modular inverses for free with fast_power(x, p-2, p) instead of the extended Euclidean algorithm.",
        "For competitive programming, precompute factorials and inverse factorials using fast power to enable O(1) binomial coefficient queries.",
        "Be careful with negative bases and even exponents in floating-point: (-2.0)^10 is positive, but intermediate squarings lose the sign correctly only with integer arithmetic.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Fast Power reduces x^n from O(n) to O(log n) by exploiting the recursive structure: x^n = (x^(n/2))^2.",
        "The iterative version processes bits of n from LSB to MSB, squaring the base and conditionally multiplying the result.",
        "Adding a modulo parameter is straightforward — apply mod after every multiplication to prevent overflow.",
        "The algorithm generalises beyond scalars: any associative operation (matrix multiply, polynomial multiply) benefits from the same technique.",
        "Binary exponentiation is a fundamental building block in cryptography (RSA, Diffie-Hellman), number theory, and competitive programming.",
        "Space complexity is O(1) iteratively and O(log n) recursively — prefer the iterative form for large inputs.",
      ],
    },
  ],
};

export default function FastPowerVideo() {
  return <AlgoVideo config={config} />;
}
