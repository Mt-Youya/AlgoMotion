import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Fisher-Yates Shuffle",
  subtitle: "Uniformly random in-place array shuffle in O(n) time.",
  category: "math",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "How do you shuffle an array fairly?",
      body: [
        "Given an array of n elements, produce a random permutation where every ordering is equally likely.",
        "A naive approach — repeatedly picking a random element and appending it to a result list — runs in O(n²) and uses O(n) extra space.",
        "The challenge: achieve true uniformity (probability 1/n! per permutation) while using only O(1) extra memory.",
        "The Fisher-Yates algorithm (also called the Knuth shuffle) solves this in a single O(n) pass with in-place swaps.",
        "Correctness relies on the PRNG being truly uniform over [0, i] at each step — off-by-one errors silently break the guarantee.",
      ],
      callout:
        "A common bug is picking j from [0, n-1] instead of [0, i]. This generates n^n outcomes instead of n!, causing a biased distribution.",
    },
    intuition: {
      heading: "Shrinking the 'unseen' deck",
      body: [
        "Imagine all elements are cards in an unseen deck. You want to deal them into a shuffled hand.",
        "Walk from the last position down to the first. At position i, the 'unseen' region is indices 0..i.",
        "Pick a random index j from [0, i] and swap arr[i] with arr[j]. Element at position i is now permanently placed.",
        "The unseen region shrinks by one each iteration. After n-1 swaps every element has been placed exactly once.",
        "Because j is chosen uniformly from i+1 possibilities at each step, the product of all choices equals 1/n!, giving every permutation equal probability.",
      ],
      analogy:
        "Think of a deck of cards face-down on a table. You flip the top card, slide a random face-down card into its spot, and repeat until the deck is exhausted. Every possible ordering of the deck is equally likely.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial array",
          description:
            "Start with arr = [1, 2, 3, 4, 5]. All elements are in the 'unseen' region (indices 0–4). No swaps have occurred yet.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
          ],
        },
        {
          label: "i = 4, pick j = 2",
          description:
            "The unseen region is [0..4]. We pick a random index j = 2. Swap arr[4] and arr[2]: [1, 2, 5, 4, 3]. Position 4 is now permanently settled.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 5, color: "#E05A3A" },
            { value: 4, color: "#2255CC" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "i = 3, pick j = 1",
          description:
            "Unseen region is now [0..3]. Pick j = 1. Swap arr[3] and arr[1]: [1, 4, 5, 2, 3]. Position 3 is settled.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 4, color: "#E05A3A" },
            { value: 5, color: "#2255CC" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "i = 2, pick j = 0",
          description:
            "Unseen region is [0..2]. Pick j = 0. Swap arr[2] and arr[0]: [5, 4, 1, 2, 3]. Position 2 is settled.",
          array: [
            { value: 5, color: "#E05A3A" },
            { value: 4, color: "#2255CC" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "i = 1, pick j = 0",
          description:
            "Unseen region is [0..1]. Pick j = 0. Swap arr[1] and arr[0]: [4, 5, 1, 2, 3]. Position 1 is settled.",
          array: [
            { value: 4, color: "#E05A3A" },
            { value: 5, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "i = 0, only one element left",
          description:
            "The unseen region has just one element at index 0. It stays in place (j can only equal 0). The shuffle is complete.",
          array: [
            { value: 4, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "Final shuffled array",
          description:
            "Result: [4, 5, 1, 2, 3]. Only n-1 = 4 swaps were needed. The entire operation ran in O(n) time with O(1) extra space.",
          array: [
            { value: 4, color: "#CEEB5A" },
            { value: 5, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
          ],
        },
        {
          label: "Uniformity check",
          description:
            "For n = 3, there are 3! = 6 permutations. Running Fisher-Yates 6000 times should produce each permutation ~1000 times. Any bias indicates a broken RNG or wrong range.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `import random

def fisher_yates_shuffle(arr: list) -> list:
    """
    Shuffle arr in-place using the Fisher-Yates (Knuth) algorithm.
    Returns the same list for convenience.

    Time:  O(n)
    Space: O(1)
    """
    n = len(arr)

    # Walk from the last index down to 1
    for i in range(n - 1, 0, -1):
        # Pick a random index j in [0, i] (inclusive)
        j = random.randint(0, i)

        # Swap arr[i] with arr[j]
        arr[i], arr[j] = arr[j], arr[i]

    return arr


# Example usage
if __name__ == "__main__":
    data = list(range(1, 11))   # [1, 2, ..., 10]
    print("Before:", data)
    fisher_yates_shuffle(data)
    print("After: ", data)

    # Verify uniformity over many runs
    from collections import Counter
    counts: Counter = Counter()
    for _ in range(60_000):
        sample = [1, 2, 3]
        fisher_yates_shuffle(sample)
        counts[tuple(sample)] += 1
    for perm, cnt in sorted(counts.items()):
        print(f"  {perm}: {cnt}")  # should each be ~10000
`,
      annotations: [
        {
          lines: [1, 3],
          note: "Only the standard library 'random' module is needed. random.randint(a, b) returns an integer N such that a <= N <= b — the upper bound is inclusive, which is exactly what we need.",
        },
        {
          lines: [11, 12],
          note: "The outer loop runs from n-1 down to 1 (inclusive). The last element (index 0) never needs to be swapped because there is nothing left to swap it with.",
        },
        {
          lines: [14],
          note: "Critically, j is chosen from [0, i] — not [0, n-1]. Choosing from the full range would generate n^n equally-likely outcomes instead of n!, breaking uniformity.",
        },
        {
          lines: [17],
          note: "Python's tuple-swap is atomic and requires no temporary variable. In other languages you would write: tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp.",
        },
        {
          lines: [28, 29, 30],
          note: "A quick uniformity test: shuffle [1,2,3] 60,000 times. Each of the 6 permutations should appear roughly 10,000 times. Large deviations indicate a biased implementation.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average case", value: "O(n)", color: "#2255CC" },
        { label: "Worst case", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Auxiliary space", value: "O(1)", color: "#CEEB5A" },
        { label: "In-place", value: "Yes", color: "#CEEB5A" },
      ],
      notes: [
        "Fisher-Yates is optimal: any correct shuffle must examine every element at least once, so O(n) is a lower bound.",
        "The algorithm makes exactly n-1 random number calls and n-1 swaps — no wasted work.",
        "Contrast with sort-based shuffles (assign random keys, then sort): those are O(n log n) and unnecessary for this task.",
      ],
    },
    variations: {
      items: [
        "Sattolo's algorithm: pick j from [0, i-1] (exclude i). This produces only cyclic permutations — every element moves to a different position. Useful for generating derangements.",
        "Inside-out variant: build a new array by inserting each element at a random position in the already-built prefix. Equivalent to the standard algorithm but useful when streaming elements one by one.",
        "Partial shuffle (reservoir sampling): stop after k iterations to get a uniformly random k-element subset in O(k) time without allocating a full copy.",
        "Weighted shuffle: assign each element a random weight w_i = U^(1/p_i) where p_i is its probability, then sort by weight. This generalizes to non-uniform distributions.",
        "Parallel Fisher-Yates: divide the array into blocks, shuffle each block independently, then merge using a random interleaving. Achieves O(n/p) on p processors with extra coordination cost.",
      ],
      tips: [
        "Always use a cryptographically secure RNG (e.g., secrets.SystemRandom in Python) when the shuffle is security-sensitive, such as card dealing in an online casino.",
        "Never use the 'sort by random key' trick (arr.sort(key=lambda _: random.random())) — it is O(n log n) and can produce biased results if the sort is not stable or the keys collide.",
        "When implementing in JavaScript, Math.random() is NOT cryptographically secure. Use crypto.getRandomValues() for security-sensitive shuffles.",
        "Test uniformity empirically: shuffle a small array (n ≤ 4) a large number of times and use a chi-squared test to verify that all n! permutations appear with equal frequency.",
      ],
    },
    summary: {
      keyPoints: [
        "Fisher-Yates produces a uniformly random permutation in O(n) time and O(1) space by walking from the end of the array and swapping each element with a randomly chosen earlier element.",
        "The critical invariant: at step i, pick j uniformly from [0, i] — not [0, n-1]. Using the full range breaks uniformity by generating n^n outcomes instead of n!.",
        "Every permutation has exactly probability 1/n! because the product of the n independent uniform choices equals 1/(n · (n-1) · … · 1) = 1/n!.",
        "Sattolo's variant (pick j from [0, i-1]) generates only cyclic permutations — a useful property for certain games and puzzles.",
        "For security-sensitive applications (gambling, cryptography), replace the standard PRNG with a cryptographically secure random number generator.",
        "Fisher-Yates is the canonical shuffle algorithm. Any correct shuffle algorithm must be O(n) in the worst case; this algorithm meets that lower bound.",
      ],
    },
  },
}

export default function FisherYatesShuffleVideo() {
  return <AlgoVideo config={config} />
}
