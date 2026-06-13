import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Rabin-Karp",
  subtitle: "Uses a rolling polynomial hash to compare the pattern against every window of the text in O(1) per s",
  category: "string",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "Find all occurrences of a pattern in a text — efficiently",
      body: [
        "Given a text string of length n and a pattern of length m, report every starting index where the pattern appears in the text.",
        "The naive approach slides the pattern one position at a time and compares m characters at each position, giving O(nm) time in the worst case.",
        "Rabin-Karp replaces the character-by-character comparison with a hash comparison: if the hashes differ the window is skipped in O(1); only when they match do we verify character by character.",
        "The key insight is a rolling (sliding-window) hash that updates in O(1) by removing the contribution of the outgoing character and adding the contribution of the incoming one.",
        "The algorithm runs in O(n + m) average time and is especially efficient when the pattern is long or when multiple patterns must be searched simultaneously.",
      ],
      callout:
        "Hash collisions are rare but possible: two different strings can share the same hash. Always verify character by character when hashes match to avoid false positives.",
    },
    intuition: {
      heading: "A fingerprint for every window",
      body: [
        "Think of the hash as a numeric fingerprint of a string. Comparing two fingerprints is O(1), so we can quickly rule out most windows without ever looking at individual characters.",
        "The polynomial hash h(s) = s[0]·b^(m-1) + s[1]·b^(m-2) + … + s[m-1]·b^0 (mod q) maps a string to an integer. With a large prime q, collisions are rare.",
        "When the window slides one step right, we subtract the leftmost character's contribution (which is s[i]·b^(m-1)) and append the new rightmost character. This rolling update is O(1).",
        "The expected number of spurious (collision) matches is (n − m + 1) / q. For q = 10^9 + 7 and typical inputs this is essentially zero.",
        "For multi-pattern search, store all pattern hashes in a hash set. A single scan of the text checks every pattern simultaneously — O(n + k·m) for k patterns.",
      ],
      analogy:
        "Imagine checking whether a paragraph contains a specific sentence by comparing page numbers in an index. If the page number doesn't match, skip immediately. Only when it does match do you open the book and read the actual words. The rolling hash is the page-number index — cheap to update and cheap to compare.",
    },
    walkthrough: {
      steps: [
        {
          label: "Input",
          description:
            "text = \"abcacabab\", pattern = \"cab\". We want all starting indices where \"cab\" appears. n = 9, m = 3.",
        },
        {
          label: "Compute pattern hash",
          description:
            "Using base b = 31 and modulus q = 101: hash(\"cab\") = (3·31² + 1·31 + 2) % 101 = (2883 + 31 + 2) % 101 = 2916 % 101 = 9. This is our target hash.",
        },
        {
          label: "Compute first window hash",
          description:
            "First window is text[0..2] = \"abc\". hash(\"abc\") = (1·31² + 2·31 + 3) % 101 = (961 + 62 + 3) % 101 = 1026 % 101 = 14. 14 ≠ 9 → skip.",
        },
        {
          label: "Roll hash: window moves to index 1",
          description:
            "Window becomes text[1..3] = \"bca\". Rolling update: h_new = (h_old − text[0]·b^(m-1))·b + text[3] (mod q) = (14 − 1·961)·31 + 1 (mod 101) = ... = 45. 45 ≠ 9 → skip.",
        },
        {
          label: "Roll hash: window moves to index 2",
          description:
            "Window becomes text[2..4] = \"cac\". Hash = 27. 27 ≠ 9 → skip.",
        },
        {
          label: "Roll hash: window moves to index 3",
          description:
            "Window becomes text[3..5] = \"aca\". Hash = 55. 55 ≠ 9 → skip.",
        },
        {
          label: "Roll hash: window moves to index 4",
          description:
            "Window becomes text[4..6] = \"cab\". Hash = 9. 9 == 9 → hashes match! Verify character by character: 'c'=='c', 'a'=='a', 'b'=='b'. Confirmed match at index 4.",
        },
        {
          label: "Match confirmed at index 4",
          description:
            "Record index 4 as a match. Continue rolling the hash to search for further occurrences.",
        },
        {
          label: "Roll hash: window moves to index 5",
          description:
            "Window becomes text[5..7] = \"aba\". Hash = 36. 36 ≠ 9 → skip.",
        },
        {
          label: "Roll hash: window moves to index 6",
          description:
            "Window becomes text[6..8] = \"bab\". Hash = 71. 71 ≠ 9 → skip. All windows exhausted.",
        },
        {
          label: "Final result",
          description:
            "Pattern \"cab\" found at index 4. Total work: O(n + m) average — only one window required full character verification. The rolling hash skipped all other windows in O(1) each.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def rabin_karp(text: str, pattern: str,
               base: int = 31, mod: int = 10**9 + 7) -> list[int]:
    """
    Find all starting indices where pattern occurs in text.

    Time:  O(n + m) average, O(nm) worst (all hashes collide)
    Space: O(1)  (not counting the output list)
    """
    n, m = len(text), len(pattern)
    if m > n:
        return []

    # Precompute base^(m-1) mod q — used when removing the leftmost character
    high_power = pow(base, m - 1, mod)

    def char_val(c: str) -> int:
        return ord(c) - ord('a') + 1   # 'a'→1, 'b'→2, …

    # Compute hash of the pattern and the first window
    pat_hash = 0
    win_hash = 0
    for i in range(m):
        pat_hash = (pat_hash * base + char_val(pattern[i])) % mod
        win_hash = (win_hash * base + char_val(text[i]))    % mod

    matches: list[int] = []

    for i in range(n - m + 1):
        # O(1) hash comparison
        if win_hash == pat_hash:
            # Verify to rule out hash collisions
            if text[i : i + m] == pattern:
                matches.append(i)

        # Roll the hash one position to the right
        if i < n - m:
            win_hash = (win_hash - char_val(text[i]) * high_power) % mod
            win_hash = (win_hash * base + char_val(text[i + m]))   % mod
            win_hash %= mod   # keep positive

    return matches


# Example
if __name__ == "__main__":
    print(rabin_karp("abcacabab", "cab"))   # [4]
    print(rabin_karp("aaaa", "aa"))          # [0, 1, 2]
`,
      annotations: [
        {
          lines: [14],
          note: "high_power = b^(m-1) mod q is computed once with Python's built-in modular exponentiation. It is subtracted when the leftmost character leaves the window.",
        },
        {
          lines: [20, 21, 22, 23],
          note: "The initial hashes for both the pattern and the first window of the text are computed in a single O(m) pass using Horner's method: h = h * base + char_val(c).",
        },
        {
          lines: [28, 29, 30],
          note: "The hash comparison is O(1). The character-by-character verification on line 30 is only triggered on a hash match — expected O(1) times per run with a good hash.",
        },
        {
          lines: [33, 34, 35, 36],
          note: "Rolling update: subtract the outgoing character's contribution (text[i] * high_power), shift left by one position (* base), then add the incoming character. All mod q.",
        },
        {
          lines: [36],
          note: "The extra '% mod' ensures the hash stays non-negative after subtraction. Python's modulo always returns a non-negative result, but this is necessary in languages like C++ or Java.",
        },
        {
          lines: [42, 43],
          note: "rabin_karp(\"aaaa\", \"aa\") returns [0, 1, 2] — all overlapping occurrences are reported because the loop runs for every starting index from 0 to n-m inclusive.",
        },
      ],
    },
    complexity: {
      timeRows: [
        {
          label: "Best case",
          value: "O(n + m)",
          color: "#CEEB5A",
        },
        {
          label: "Average case",
          value: "O(n + m)",
          color: "#2255CC",
        },
        {
          label: "Worst case",
          value: "O(nm)",
          color: "#E05A3A",
        },
      ],
      spaceRows: [
        {
          label: "Auxiliary space",
          value: "O(1)",
          color: "#CEEB5A",
        },
        {
          label: "Output list",
          value: "O(k)",
          color: "#2255CC",
        },
      ],
      notes: [
        "The O(nm) worst case occurs only when every window has the same hash as the pattern (e.g., searching for \"aaa\" in \"aaaa…\"). With a large prime modulus this is astronomically unlikely in practice.",
        "Using a double hash (two independent (base, mod) pairs) reduces the collision probability to roughly 1 / (q1 · q2), making false positives negligible even for adversarial inputs.",
        "For searching k patterns simultaneously, store all k pattern hashes in a hash set. The text scan remains O(n) regardless of k, giving O(n + k·m) total — far better than running k separate searches.",
      ],
    },
    variations: {
      items: [
        "Double hashing: use two independent (base, mod) pairs and require both hashes to match before verifying. Reduces false-positive probability to ~1/(q1·q2) ≈ 10^-18 with 64-bit primes.",
        "Multi-pattern Rabin-Karp: compute hashes for all k patterns and store them in a hash set. A single O(n) pass over the text finds all matches simultaneously.",
        "2-D Rabin-Karp: apply rolling hashes row-wise and then column-wise to search for a pattern matrix inside a text matrix. Used in image sub-pattern matching.",
        "Rabin fingerprinting: a variant using polynomial hashing over GF(2) (XOR-based). Used in rsync, LBFS, and Bup for efficient file chunking and deduplication.",
        "Karp-Rabin for longest common substring: use binary search on the length combined with hashing to find the longest substring common to two strings in O(n log n) expected time.",
      ],
      tips: [
        "Choose a large prime modulus (e.g., 10^9 + 7 or 10^9 + 9) to minimize collisions. Avoid small moduli like 101 in production code — they are only used for illustration.",
        "Always verify character by character after a hash match. Skipping verification trades correctness for speed and will eventually produce wrong answers on adversarial inputs.",
        "When the alphabet is large (e.g., Unicode), map characters to small integers first to avoid overflow when computing base^(m-1) in languages without big integers.",
        "For overlapping matches (e.g., \"aa\" in \"aaaa\"), ensure the loop runs from i = 0 to i = n - m inclusive and does not skip positions after a match.",
      ],
    },
    summary: {
      keyPoints: [
        "Rabin-Karp replaces character-by-character comparison with a hash comparison, reducing the per-window cost from O(m) to O(1) in the average case.",
        "The rolling hash updates in O(1) by subtracting the outgoing character's contribution and adding the incoming one, avoiding a full recomputation at each step.",
        "Average-case time complexity is O(n + m): O(m) to build the initial hashes and O(n) to slide the window across the text.",
        "Worst-case time is O(nm) when every window triggers a full character verification (hash collision on every window). Use double hashing or a large prime to make this practically impossible.",
        "Rabin-Karp shines in multi-pattern search: store k pattern hashes in a set and find all k patterns in a single O(n + k·m) pass — no need for a trie or Aho-Corasick automaton.",
        "Always verify after a hash match to guard against false positives. The expected number of spurious matches is (n − m + 1) / q, which is near zero for large primes.",
      ],
    },
  },
}

export default function RabinKarpVideo() {
  return <AlgoVideo config={config} />
}
