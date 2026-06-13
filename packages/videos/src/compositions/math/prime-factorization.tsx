import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Prime Factorization",
  subtitle:
    "Decomposes an integer into its prime factors by trial division up to the square root.",
  category: "math",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem: Decompose a Number into Prime Factors",
      bullets: [
        "Given a positive integer n > 1, find all prime numbers whose product equals n.",
        "A prime number is divisible only by 1 and itself (e.g., 2, 3, 5, 7, 11, …).",
        "The Fundamental Theorem of Arithmetic guarantees this decomposition is unique.",
        "Example: 60 → [2, 2, 3, 5] because 2 × 2 × 3 × 5 = 60.",
        "The result is typically returned as a sorted list of prime factors (with repetition).",
      ],
    },

    intuition: {
      heading: "Intuition: Peel Off Primes One at a Time",
      bullets: [
        "Start with the smallest prime (2) and keep dividing n by it while it's divisible.",
        "Once 2 no longer divides n, move to 3, then 4, 5, … — any composite divisor will already have been divided out.",
        "You only need to check divisors up to √n: if no factor ≤ √n is found, n itself is prime.",
        "Each successful division shrinks n, so the inner loop terminates quickly.",
        "The two-loop structure (outer increments d, inner exhausts d) guarantees every prime factor is captured exactly as many times as it appears.",
      ],
      analogy:
        "Think of peeling an onion: you strip off the outermost (smallest) layer completely before moving inward. Each layer you peel is a prime factor, and you keep going until nothing is left.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough: n = 360",
      steps: [
        {
          step: 1,
          description: "Initialize: n = 360, factors = [], d = 2.",
        },
        {
          step: 2,
          description:
            "d = 2, d² = 4 ≤ 360. Check 360 % 2 == 0 → yes. Append 2, n = 180. factors = [2].",
        },
        {
          step: 3,
          description:
            "Still d = 2. 180 % 2 == 0 → yes. Append 2, n = 90. factors = [2, 2].",
        },
        {
          step: 4,
          description:
            "Still d = 2. 90 % 2 == 0 → yes. Append 2, n = 45. factors = [2, 2, 2].",
        },
        {
          step: 5,
          description:
            "Still d = 2. 45 % 2 == 1 → no. Increment d to 3.",
        },
        {
          step: 6,
          description:
            "d = 3, d² = 9 ≤ 45. 45 % 3 == 0 → yes. Append 3, n = 15. factors = [2, 2, 2, 3].",
        },
        {
          step: 7,
          description:
            "Still d = 3. 15 % 3 == 0 → yes. Append 3, n = 5. factors = [2, 2, 2, 3, 3].",
        },
        {
          step: 8,
          description:
            "Still d = 3. 5 % 3 == 2 → no. Increment d to 4.",
        },
        {
          step: 9,
          description:
            "d = 4, d² = 16 > 5. Exit outer while loop.",
        },
        {
          step: 10,
          description:
            "n = 5 > 1, so 5 is a prime factor. Append 5. factors = [2, 2, 2, 3, 3, 5].",
        },
        {
          step: 11,
          description:
            "Return [2, 2, 2, 3, 3, 5]. Verify: 2³ × 3² × 5 = 8 × 9 × 5 = 360. ✓",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def prime_factors(n: int) -> list[int]:
    """Return the prime factorization of n as a sorted list."""
    if n < 2:
        raise ValueError("n must be >= 2")

    factors: list[int] = []
    d = 2

    # Trial division up to sqrt(n)
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1

    # If n > 1, the remaining value is a prime factor
    if n > 1:
        factors.append(n)

    return factors


# Example usage
if __name__ == "__main__":
    print(prime_factors(60))   # [2, 2, 3, 5]
    print(prime_factors(360))  # [2, 2, 2, 3, 3, 5]
    print(prime_factors(97))   # [97]  (prime number)
`,
      annotations: [
        {
          lines: "1-4",
          note: "Guard clause: prime factorization is only defined for integers ≥ 2.",
        },
        {
          lines: "7-8",
          note: "Start trial division from d = 2, the smallest prime.",
        },
        {
          lines: "10-11",
          note: "Outer loop runs while d² ≤ n — equivalent to d ≤ √n, avoiding a sqrt() call.",
        },
        {
          lines: "12-14",
          note: "Inner loop exhausts all copies of d before moving on, so composite divisors are automatically skipped.",
        },
        {
          lines: "17-18",
          note: "After the loop, any n > 1 is a prime that exceeded √(original n) — append it directly.",
        },
        {
          lines: "20",
          note: "Return value is already sorted because d is monotonically increasing.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(√n)",
          description: "n is prime — the outer loop runs √n iterations with no inner divisions.",
        },
        {
          case: "Average",
          notation: "O(√n)",
          description: "Trial division always scans up to √n in the worst case for each call.",
        },
        {
          case: "Worst",
          notation: "O(√n)",
          description: "n = p² for a large prime p — d reaches p after √n steps.",
        },
      ],
      spaceRows: [
        {
          case: "Output list",
          notation: "O(log n)",
          description:
            "A number n has at most log₂(n) prime factors (each factor is ≥ 2, so repeated halving).",
        },
        {
          case: "Auxiliary",
          notation: "O(1)",
          description: "Only a handful of scalar variables (d, n) are needed beyond the output.",
        },
      ],
      insights: [
        "Trial division is simple but not the fastest: for very large n, the Pollard-rho algorithm runs in O(n^(1/4)) expected time.",
        "Pre-computing primes with the Sieve of Eratosthenes and dividing only by primes reduces constant factors significantly for repeated queries.",
        "The output list length is bounded by log₂(n) ≈ 30 for n ≤ 10⁹, making the space cost negligible in practice.",
      ],
    },

    variations: {
      heading: "Variations & Related Algorithms",
      items: [
        {
          name: "Sieve-assisted factorization",
          description:
            "Precompute primes up to √n with the Sieve of Eratosthenes, then trial-divide only by those primes. Reduces the number of divisor candidates from √n to π(√n) ≈ √n / ln(√n).",
        },
        {
          name: "Smallest Prime Factor (SPF) sieve",
          description:
            "Precompute the smallest prime factor for every integer up to N in O(N log log N). Each subsequent factorization then runs in O(log n) by following SPF links — ideal for many queries on small numbers.",
        },
        {
          name: "Pollard's Rho algorithm",
          description:
            "A probabilistic algorithm that finds a non-trivial factor of n in O(n^(1/4)) expected time using Floyd's cycle detection. Far faster than trial division for large semi-primes.",
        },
        {
          name: "Fermat's factorization method",
          description:
            "Represents n as a difference of two squares: n = a² − b² = (a+b)(a−b). Efficient when n has two factors close to √n.",
        },
        {
          name: "Exponent form output",
          description:
            "Instead of a flat list, return a dictionary {prime: exponent} (e.g., 360 → {2:3, 3:2, 5:1}). Useful for computing LCM, GCD, number of divisors, and Euler's totient.",
        },
      ],
      tips: [
        "Handle the special case n = 1 explicitly — it has no prime factors.",
        "For competitive programming, the SPF sieve is the go-to when you need to factorize many numbers up to ~10⁶.",
        "When n can be up to 10¹⁸, combine trial division up to 10⁶ with Miller-Rabin primality testing and Pollard's Rho for the remainder.",
        "Always verify your result by multiplying the factors back together during development.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Every integer ≥ 2 has a unique prime factorization — the Fundamental Theorem of Arithmetic.",
        "Trial division up to √n is sufficient: any composite factor would have a co-factor already divided out.",
        "The two-loop structure (outer increments d, inner exhausts d) naturally skips composite divisors.",
        "Time complexity is O(√n); space for the output is O(log n) since factors multiply to n.",
        "For repeated or large-n queries, upgrade to the SPF sieve or Pollard's Rho respectively.",
        "The remaining n > 1 after the loop is always prime and must be appended as the last factor.",
      ],
    },
  },
};

export default function PrimeFactorizationVideo() {
  return <AlgoVideo config={config} />;
}
