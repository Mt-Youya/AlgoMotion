import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Sieve of Eratosthenes",
  subtitle:
    "Finds all prime numbers up to n by iteratively marking the multiples of each prime starting from 2.",
  category: "math",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "What Problem Does It Solve?",
      bullets: [
        "Given an integer n, find every prime number in the range [2, n].",
        "A prime number is a natural number greater than 1 with no positive divisors other than 1 and itself.",
        "Naively testing each number for primality costs O(√n) per candidate — too slow for large n.",
        "The Sieve generates all primes up to n in O(n log log n) time using a single boolean array.",
        "It is one of the oldest known algorithms, attributed to the Greek mathematician Eratosthenes (~240 BC).",
      ],
    },
    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Start with every number from 2 to n assumed to be prime.",
        "The smallest unmarked number must be prime — nothing smaller could divide it.",
        "Immediately mark all multiples of that prime as composite (not prime).",
        "Advance to the next unmarked number and repeat until you exceed √n.",
        "Every number still unmarked at the end is guaranteed to be prime.",
      ],
      analogy:
        "Imagine a classroom roll-call: the teacher reads names in order. The first student called is a 'prime'. That student stands up and crosses out every other student whose seat number is a multiple of theirs. The next uncrossed student is the next prime, and so on. When no more crossings are possible, everyone still seated is prime.",
    },
    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough (n = 20)",
      steps: [
        {
          step: 1,
          description:
            "Initialize a boolean array `is_prime[0..20]` with all values set to True.",
          state: {
            array: [
              false, false, true, true, true, true, true, true, true, true,
              true, true, true, true, true, true, true, true, true, true, true,
            ],
            colors: [
              "gray", "gray", "green", "green", "green", "green", "green",
              "green", "green", "green", "green", "green", "green", "green",
              "green", "green", "green", "green", "green", "green", "green",
            ],
          },
        },
        {
          step: 2,
          description:
            "Set is_prime[0] = False and is_prime[1] = False (0 and 1 are not prime by definition).",
        },
        {
          step: 3,
          description:
            "Current prime p = 2. Mark multiples: 4, 6, 8, 10, 12, 14, 16, 18, 20 → False.",
          state: {
            array: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
            colors: [
              "green", "red", "red", "red", "red", "red", "red", "red", "red", "red",
            ],
          },
        },
        {
          step: 4,
          description:
            "Advance to next unmarked number: p = 3. Mark multiples starting at 9: 9, 15 → False (12, 18 already marked).",
        },
        {
          step: 5,
          description:
            "Advance to next unmarked number: p = 5. Mark multiples starting at 25 — but 25 > 20, so nothing to mark.",
        },
        {
          step: 6,
          description:
            "Since p = 5 > √20 ≈ 4.47, the inner loop stops. All remaining unmarked numbers are prime.",
        },
        {
          step: 7,
          description:
            "Collect all indices where is_prime[i] == True: {2, 3, 5, 7, 11, 13, 17, 19}.",
        },
        {
          step: 8,
          description:
            "Return the collected list. These are all primes ≤ 20.",
        },
      ],
    },
    {
      kind: "code",
      heading: "Python Implementation",
      language: "python",
      code: `def sieve_of_eratosthenes(n: int) -> list[int]:
    """Return a list of all prime numbers up to and including n."""
    if n < 2:
        return []

    # Step 1: assume every number 0..n is prime
    is_prime = [True] * (n + 1)
    is_prime[0] = False
    is_prime[1] = False

    # Step 2: sieve — only need to check up to sqrt(n)
    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Mark all multiples of p starting from p*p
            # (smaller multiples were already marked by earlier primes)
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1

    # Step 3: collect surviving primes
    return [i for i in range(2, n + 1) if is_prime[i]]


# Example usage
if __name__ == "__main__":
    primes = sieve_of_eratosthenes(50)
    print(primes)
    # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
`,
      annotations: [
        {
          lines: [1, 3],
          note: "Guard clause: return early for n < 2 since there are no primes below 2.",
        },
        {
          lines: [6, 7],
          note: "Allocate a boolean array of size n+1. Python lists are zero-indexed so index i represents the number i.",
        },
        {
          lines: [8, 9],
          note: "Explicitly mark 0 and 1 as non-prime — they do not satisfy the definition of a prime.",
        },
        {
          lines: [12, 13],
          note: "Only iterate p up to √n. Any composite number ≤ n must have a prime factor ≤ √n, so all composites are already marked by the time p exceeds √n.",
        },
        {
          lines: [16, 17],
          note: "Start marking at p*p, not 2*p. Every smaller multiple k*p (k < p) was already handled when we processed the prime k.",
        },
        {
          lines: [21],
          note: "Final list comprehension collects all indices still marked True — these are the primes.",
        },
      ],
    },
    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n log log n)",
          note: "Same for all inputs — the sieve always processes every prime's multiples.",
        },
        {
          case: "Average",
          complexity: "O(n log log n)",
          note: "The harmonic series of prime reciprocals converges to log log n.",
        },
        {
          case: "Worst",
          complexity: "O(n log log n)",
          note: "No degenerate case exists; complexity is uniform across all values of n.",
        },
      ],
      spaceRows: [
        {
          resource: "is_prime array",
          complexity: "O(n)",
          note: "One boolean per number in [0, n].",
        },
        {
          resource: "Output list",
          complexity: "O(π(n))",
          note: "π(n) ≈ n / ln(n) by the Prime Number Theorem.",
        },
      ],
      insights: [
        "The O(n log log n) bound comes from summing n/p over all primes p ≤ n, which by Mertens' theorem equals n · log log n.",
        "For n = 10^7 the sieve is roughly 3× faster than a segmented trial-division approach and fits comfortably in L2 cache.",
        "Memory is the main bottleneck for very large n; the segmented sieve variant reduces space to O(√n) by processing the array in cache-friendly blocks.",
      ],
    },
    {
      kind: "variations",
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Segmented Sieve",
          description:
            "Divides [2, n] into segments of size √n and processes each segment independently, reducing memory usage to O(√n) while keeping O(n log log n) time.",
        },
        {
          name: "Sieve of Sundaram",
          description:
            "Marks numbers of the form i + j + 2ij, then maps survivors to odd primes via 2k+1. Slightly simpler inner loop but less cache-friendly than Eratosthenes.",
        },
        {
          name: "Sieve of Atkin",
          description:
            "Uses quadratic forms to sieve; theoretically O(n / log log n) but practical performance is often similar to the basic sieve for n < 10^9.",
        },
        {
          name: "Bitset Sieve",
          description:
            "Packs the boolean array into a bitset (one bit per number) to reduce memory by 8× and improve cache performance for large n.",
        },
        {
          name: "Linear Sieve",
          description:
            "Marks each composite exactly once by always using its smallest prime factor, achieving a strict O(n) time bound at the cost of more complex bookkeeping.",
        },
      ],
      tips: [
        "Start marking multiples at p*p rather than 2*p to cut the number of write operations nearly in half.",
        "Skip even numbers entirely after handling p=2: use a step of 2 in the outer loop and mark only odd multiples to halve both time and space.",
        "For competitive programming, pre-compute primes up to 10^6 once at the top of the file and reuse the array across multiple test cases.",
        "When checking primality for a single large number, combine the sieve (for small factor lookup) with Miller-Rabin for numbers beyond the sieve range.",
      ],
    },
    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "The Sieve of Eratosthenes is the canonical algorithm for bulk prime generation, running in O(n log log n) time.",
        "It trades O(n) memory for a dramatic speedup over per-number primality testing.",
        "Starting the inner loop at p² (not 2p) is a critical optimization that halves the work.",
        "The outer loop only needs to run while p ≤ √n, because any composite ≤ n must have a prime factor in that range.",
        "For memory-constrained environments or very large n, the segmented variant reduces space to O(√n) without sacrificing asymptotic time complexity.",
        "The algorithm underpins many number-theory problems in competitive programming: prime factorization, Euler's totient function, and Möbius function can all be computed with sieve-like passes.",
      ],
    },
  ],
};

export default function SieveOfEratosthenesVideo() {
  return <AlgoVideo config={config} />;
}
