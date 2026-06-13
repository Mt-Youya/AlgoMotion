import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "GCD & LCM",
  subtitle:
    "Computes the greatest common divisor using the Euclidean algorithm, then derives the LCM as (a*b)/gc",
  category: "math",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What Are GCD and LCM?",
      bullets: [
        "The Greatest Common Divisor (GCD) of two integers a and b is the largest positive integer that divides both a and b without a remainder.",
        "The Least Common Multiple (LCM) of two integers a and b is the smallest positive integer that is divisible by both a and b.",
        "Example: GCD(48, 18) = 6 because 6 is the largest number dividing both 48 and 18 evenly.",
        "Example: LCM(48, 18) = 144 because 144 is the smallest number that both 48 and 18 divide into.",
        "These two values are linked by the identity: LCM(a, b) = (a × b) / GCD(a, b), so computing one gives you both.",
      ],
    },

    intuition: {
      heading: "The Euclidean Insight",
      bullets: [
        "The Euclidean algorithm is based on the observation that GCD(a, b) = GCD(b, a mod b). The remainder shares all the same divisors as the original pair.",
        "We keep replacing the larger number with the remainder until the remainder reaches zero. At that point, the non-zero value is the GCD.",
        "Each step reduces the problem size significantly — the remainder is always strictly smaller than both inputs — guaranteeing termination.",
        "The number of steps is at most proportional to the number of digits in the smaller number, giving us O(log min(a, b)) performance.",
        "Real-world analogy: Imagine tiling a 48 × 18 rectangle with identical square tiles. The largest possible tile size that fits perfectly is exactly GCD(48, 18) = 6, so you need 6×6 tiles.",
      ],
    },

    walkthrough: {
      heading: "Step-by-Step: GCD(48, 18) then LCM",
      steps: [
        {
          step: 1,
          description: "Start with a = 48, b = 18. We want to find GCD(48, 18).",
        },
        {
          step: 2,
          description:
            "Apply the Euclidean step: 48 = 2 × 18 + 12. The new pair becomes (18, 12).",
        },
        {
          step: 3,
          description:
            "Apply again: 18 = 1 × 12 + 6. The new pair becomes (12, 6).",
        },
        {
          step: 4,
          description:
            "Apply again: 12 = 2 × 6 + 0. The remainder is 0, so we stop.",
        },
        {
          step: 5,
          description:
            "Since the remainder is 0, GCD(48, 18) = 6 (the last non-zero value).",
        },
        {
          step: 6,
          description:
            "Now derive LCM using the identity: LCM(a, b) = (a × b) / GCD(a, b).",
        },
        {
          step: 7,
          description:
            "Substitute values: LCM(48, 18) = (48 × 18) / 6 = 864 / 6 = 144.",
        },
        {
          step: 8,
          description:
            "Verify GCD: 48 / 6 = 8 ✓, 18 / 6 = 3 ✓. No larger divisor exists.",
        },
        {
          step: 9,
          description:
            "Verify LCM: 144 / 48 = 3 ✓, 144 / 18 = 8 ✓. No smaller common multiple exists.",
        },
        {
          step: 10,
          description:
            "The iterative version replaces recursion with a while loop: while b != 0: a, b = b, a % b. Return a.",
        },
        {
          step: 11,
          description:
            "To handle negative inputs, take abs(a) and abs(b) before computing. GCD is always non-negative by convention.",
        },
        {
          step: 12,
          description:
            "For multiple numbers, chain the operation: GCD(a, b, c) = GCD(GCD(a, b), c). Same for LCM.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `def gcd(a: int, b: int) -> int:
    \"\"\"
    Compute GCD using the iterative Euclidean algorithm.
    Time:  O(log(min(a, b)))
    Space: O(1)
    \"\"\"
    a, b = abs(a), abs(b)
    while b != 0:
        a, b = b, a % b
    return a


def lcm(a: int, b: int) -> int:
    \"\"\"
    Compute LCM using the GCD identity: lcm = (a * b) // gcd(a, b).
    Uses integer division to avoid floating-point errors.
    \"\"\"
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // gcd(a, b)


def gcd_multiple(*args: int) -> int:
    \"\"\"Compute GCD of multiple integers by chaining pairwise GCDs.\"\"\"
    from functools import reduce
    return reduce(gcd, args)


def lcm_multiple(*args: int) -> int:
    \"\"\"Compute LCM of multiple integers by chaining pairwise LCMs.\"\"\"
    from functools import reduce
    return reduce(lcm, args)


# Example usage
if __name__ == "__main__":
    a, b = 48, 18
    print(f"GCD({a}, {b}) = {gcd(a, b)}")   # 6
    print(f"LCM({a}, {b}) = {lcm(a, b)}")   # 144
    print(f"GCD(12, 18, 24) = {gcd_multiple(12, 18, 24)}")  # 6
    print(f"LCM(4, 6, 10)   = {lcm_multiple(4, 6, 10)}")    # 60
`,
      annotations: [
        {
          line: 7,
          note: "abs() handles negative inputs — GCD is defined only for non-negative integers.",
        },
        {
          line: 8,
          note: "Core loop: replace (a, b) with (b, a % b) until b becomes 0.",
        },
        {
          line: 9,
          note: "Simultaneous assignment in Python makes the swap clean and avoids a temp variable.",
        },
        {
          line: 18,
          note: "Guard against zero: LCM involving 0 is defined as 0 by convention.",
        },
        {
          line: 19,
          note: "Integer division (//) prevents floating-point drift for large numbers.",
        },
        {
          line: 23,
          note: "functools.reduce chains the binary operation across an arbitrary number of arguments.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(1)",
          note: "b divides a exactly on the first step (remainder = 0 immediately).",
        },
        {
          case: "Average",
          complexity: "O(log(min(a, b)))",
          note: "Typical inputs converge in logarithmic steps.",
        },
        {
          case: "Worst",
          complexity: "O(log(min(a, b)))",
          note: "Consecutive Fibonacci numbers maximize the number of steps (Lamé's theorem).",
        },
      ],
      spaceRows: [
        {
          case: "Iterative",
          complexity: "O(1)",
          note: "Only two variables are needed regardless of input size.",
        },
        {
          case: "Recursive",
          complexity: "O(log(min(a, b)))",
          note: "Call stack depth equals the number of Euclidean steps.",
        },
      ],
      insights: [
        "The Euclidean algorithm is one of the oldest known algorithms, described by Euclid around 300 BCE, yet it remains optimal for GCD computation.",
        "Lamé's theorem (1844) proved that the number of steps never exceeds 5 times the number of decimal digits in the smaller input.",
        "For very large integers (cryptographic sizes), the binary GCD algorithm can be faster in practice because it replaces modulo with bit shifts.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Recursive Euclidean",
          description:
            "def gcd(a, b): return a if b == 0 else gcd(b, a % b). Elegant but uses O(log n) stack space.",
        },
        {
          name: "Binary GCD (Stein's Algorithm)",
          description:
            "Uses only subtraction and bit shifts, avoiding modulo. Efficient on hardware where division is slow.",
        },
        {
          name: "Extended Euclidean Algorithm",
          description:
            "Returns (gcd, x, y) such that a*x + b*y = gcd(a, b). Essential for modular inverse in cryptography.",
        },
        {
          name: "GCD / LCM for Multiple Numbers",
          description:
            "Chain pairwise: GCD(a, b, c) = GCD(GCD(a, b), c). Used in fraction simplification and scheduling.",
        },
        {
          name: "Polynomial GCD",
          description:
            "The Euclidean algorithm generalizes to polynomials over a field, used in computer algebra systems.",
        },
      ],
      tips: [
        "Always use integer division (//) when computing LCM to avoid floating-point precision errors with large numbers.",
        "Python's math.gcd() (Python 3.5+) and math.lcm() (Python 3.9+) are highly optimized built-ins — prefer them in production code.",
        "When computing LCM of many numbers, compute GCD(a, b) first and then divide before multiplying to prevent integer overflow: (a // gcd(a, b)) * b.",
        "The extended Euclidean algorithm is the foundation for RSA key generation and modular inverse computation in cryptographic libraries.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "GCD(a, b) is the largest integer dividing both a and b; LCM(a, b) is the smallest integer divisible by both.",
        "The Euclidean algorithm computes GCD in O(log min(a, b)) time by repeatedly replacing (a, b) with (b, a mod b) until b = 0.",
        "LCM is derived from GCD via the identity LCM(a, b) = (a × b) / GCD(a, b), so you never need a separate algorithm.",
        "The iterative version is preferred over recursive because it uses O(1) space instead of O(log n) call-stack space.",
        "Both operations generalize naturally to multiple numbers by chaining pairwise applications with functools.reduce.",
        "The extended Euclidean algorithm builds on this foundation to solve linear Diophantine equations and compute modular inverses.",
      ],
    },
  },
};

export default function GcdLcmVideo() {
  return <AlgoVideo config={config} />;
}
