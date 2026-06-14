import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Z-Algorithm",
  subtitle: "Constructs the Z-array enabling O(n) pattern search.",
  category: "string",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Understanding the Z-Array",
      bullets: [
        "Given a string S of length n, the Z-array Z has the same length n.",
        "Z[i] is defined as the length of the longest substring starting at index i that is also a prefix of S.",
        "Z[0] is conventionally set to 0 or n — it is not meaningful since the whole string is trivially a prefix of itself.",
        'For example, S = "aabxaab" gives Z = [0, 1, 0, 0, 3, 1, 0].',
        "The Z-array enables O(n) exact pattern matching by concatenating pattern, separator, and text.",
      ],
    },

    intuition: {
      heading: "The Z-Box Window Trick",
      bullets: [
        "A naive approach recomputes prefix matches from scratch at every index — O(n²) in the worst case.",
        "The Z-algorithm maintains a window [L, R]: the rightmost Z-box (a substring matching a prefix) seen so far.",
        "When processing index i ≤ R, we already know S[L..R] == S[0..R-L]. We can mirror the result from Z[i-L] to avoid redundant comparisons.",
        "If Z[i-L] < R - i + 1, the answer is exactly Z[i-L] — no expansion needed.",
        "Otherwise we extend past R naively and update [L, R] — each character is visited at most twice, giving O(n) total.",
      ],
      analogy:
        "Imagine reading a book where certain passages repeat the opening paragraph. Once you recognize a repeated passage, you can instantly know how long the repetition is by checking your notes from the first occurrence — no need to re-read word by word.",
    },

    walkthrough: {
      heading: 'Step-by-Step: S = "aabxaab"',
      steps: [
        {
          step: 1,
          description: "Initialize: L = 0, R = 0. Z[0] = 0 by convention.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["yellow", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description:
            "i = 1: i > R, expand naively. S[1]='a' == S[0]='a', S[2]='b' ≠ S[1]='a'. Z[1] = 1. Update L=1, R=1.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["green", "yellow", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: "i = 2: i > R, expand naively. S[2]='b' ≠ S[0]='a'. Z[2] = 0. L, R unchanged.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["gray", "gray", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "i = 3: i > R, expand naively. S[3]='x' ≠ S[0]='a'. Z[3] = 0. L, R unchanged.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["gray", "gray", "gray", "yellow", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "i = 4: i > R, expand naively. S[4..6]='aab' matches S[0..2]='aab'. Z[4] = 3. Update L=4, R=6.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["green", "green", "green", "gray", "yellow", "yellow", "yellow"],
        },
        {
          step: 6,
          description:
            "i = 5: i ≤ R. Mirror index k = i - L = 1. Z[k] = Z[1] = 1. R - i + 1 = 2. Z[1] < 2, so Z[5] = 1.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["gray", "gray", "gray", "gray", "gray", "yellow", "gray"],
        },
        {
          step: 7,
          description:
            "i = 6: i ≤ R. Mirror index k = 2. Z[2] = 0. R - i + 1 = 1. Z[2] < 1? No, equal. Try to extend: S[7] out of bounds. Z[6] = 0.",
          values: ["a", "a", "b", "x", "a", "a", "b"],
          colors: ["gray", "gray", "gray", "gray", "gray", "gray", "yellow"],
        },
        {
          step: 8,
          description: "Final Z-array: [0, 1, 0, 0, 3, 1, 0]. Z[4]=3 tells us a prefix of length 3 starts at index 4.",
          values: ["0", "1", "0", "0", "3", "1", "0"],
          colors: ["gray", "blue", "gray", "gray", "green", "blue", "gray"],
        },
      ],
    },

    code: {
      heading: "Z-Algorithm Implementation (Python)",
      snippet: `def z_function(s: str) -> list[int]:
    n = len(s)
    z = [0] * n
    z[0] = n          # full string is prefix of itself
    L, R = 0, 0       # rightmost Z-box window

    for i in range(1, n):
        if i < R:
            # mirror from the symmetric position inside the window
            z[i] = min(R - i, z[i - L])

        # try to extend past current R
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1

        # update rightmost Z-box if we extended beyond R
        if i + z[i] > R:
            L, R = i, i + z[i]

    return z


def search(pattern: str, text: str) -> list[int]:
    """Return all start indices where pattern occurs in text."""
    if not pattern or not text:
        return []

    combined = pattern + "$" + text
    z = z_function(combined)
    p_len = len(pattern)
    matches = []

    for i in range(p_len + 1, len(combined)):
        if z[i] == p_len:
            matches.append(i - p_len - 1)

    return matches`,
      annotations: [
        {
          lines: "1-3",
          note: "Initialize Z[0] = n. The window [L, R] tracks the rightmost Z-box encountered.",
        },
        {
          lines: "6-8",
          note: "When i falls inside the current window, mirror from the symmetric index i - L to avoid redundant work.",
        },
        {
          lines: "10-12",
          note: "Naive extension: advance as long as characters match. Each character is touched at most twice overall.",
        },
        {
          lines: "14-15",
          note: "If we extended past R, the new Z-box [i, i+Z[i]-1] becomes the rightmost — update L and R.",
        },
        {
          lines: "20-22",
          note: "For pattern matching, concatenate pattern + '$' + text. The separator '$' prevents Z values from crossing the boundary.",
        },
        {
          lines: "25-28",
          note: "Any position i where Z[i] == len(pattern) is a match. The actual text index is i - len(pattern) - 1.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { case: "Best", notation: "O(n)", note: "No extensions needed (all mismatches)" },
        { case: "Average", notation: "O(n)", note: "Each character visited at most twice" },
        { case: "Worst", notation: "O(n)", note: 'Guaranteed linear — e.g. "aaaa...a"' },
      ],
      spaceRows: [
        { resource: "Z-array", notation: "O(n)", note: "Stores one value per character" },
        { resource: "Concatenated string (search)", notation: "O(n + m)", note: "n = text length, m = pattern length" },
      ],
      insights: [
        "The Z-algorithm achieves the same O(n) guarantee as KMP but is often considered simpler to implement from scratch.",
        "The key insight is that the Z-box window [L, R] allows reuse of previously computed information, eliminating redundant character comparisons.",
        "Unlike KMP's failure function, the Z-array is self-contained and directly interpretable: Z[i] is simply the prefix match length at position i.",
      ],
    },

    variations: {
      heading: "Variations & Related Algorithms",
      variations: [
        {
          name: "KMP Algorithm",
          description:
            "Uses a failure/prefix function instead of Z-array. Equivalent power, different bookkeeping style.",
        },
        {
          name: "Z-Algorithm on Circular Strings",
          description: "Double the string (S + S) and apply Z-function to detect rotations or cyclic patterns in O(n).",
        },
        {
          name: "Longest Common Extension (LCE)",
          description: "Z-array answers LCE queries from position 0 in O(1) after O(n) preprocessing.",
        },
        {
          name: "Multiple Pattern Search",
          description:
            "Build a combined string P1$P2$...Pk$T and run Z once to find all pattern occurrences simultaneously.",
        },
        {
          name: "Z-Algorithm on Suffix Array Construction",
          description: "Used as a subroutine in some suffix array algorithms to compare suffixes efficiently.",
        },
      ],
      tips: [
        "Always use a separator character (like '$') that does not appear in either pattern or text to prevent spurious cross-boundary matches.",
        "Z[0] is conventionally left as 0 or n depending on implementation — be consistent and document your choice.",
        "For case-insensitive search, normalize both strings to lowercase before applying the algorithm.",
        "When searching for multiple patterns, prefer Aho-Corasick over repeated Z-algorithm calls for better amortized performance.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "The Z-array Z[i] stores the length of the longest prefix of S that matches a substring starting at S[i].",
        "The Z-box window [L, R] is the core optimization: it lets us mirror previously computed values instead of re-comparing characters.",
        "The algorithm runs in O(n) time and O(n) space, making it optimal for single-pattern string search.",
        "Pattern matching is reduced to a single Z-function call on the concatenated string P + '$' + T.",
        "Z-algorithm is equivalent in power to KMP but has a more uniform structure — no separate preprocessing phase.",
        "It generalizes naturally to circular strings, multiple patterns, and suffix-based problems.",
      ],
    },
  },
}

export default function ZAlgorithmVideo() {
  return <AlgoVideo config={config} />
}
