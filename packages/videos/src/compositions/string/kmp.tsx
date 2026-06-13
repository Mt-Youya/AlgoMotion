import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "KMP (Knuth-Morris-Pratt)",
  subtitle: "Builds a failure function on the pattern to skip redundant comparisons, achieving O(n+m) matching.",
  category: "string",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "How do you find a pattern in a string efficiently?",
      body: [
        "Given a text T of length n and a pattern P of length m, find all positions where P occurs in T.",
        "The naive approach checks every alignment of P against T: for each of the n positions in T, it may scan up to m characters — giving O(n·m) in the worst case.",
        "For adversarial inputs like T = 'AAAAAAA...AB' and P = 'AAAB', the naive method performs nearly n·m comparisons before finding (or not finding) a match.",
        "KMP preprocesses the pattern in O(m) time to build a 'failure function' (also called the LPS array), then uses it to skip redundant comparisons during the O(n) search phase.",
        "The key insight: when a mismatch occurs at position j in the pattern, we already know which prefix of P matches the text just before the mismatch — we can reuse that information instead of starting over.",
      ],
      callout:
        "KMP guarantees O(n+m) time regardless of the input. The text pointer i never moves backward — every character in T is examined at most once.",
    },
    intuition: {
      heading: "Reusing matched prefixes to avoid redundant work",
      body: [
        "Think of the pattern as a template you slide over the text. When a mismatch occurs, the naive method shifts the template by just one position and starts comparing from the beginning.",
        "KMP instead asks: 'Of the characters I just successfully matched, what is the longest proper prefix that is also a suffix?' That prefix is already aligned with the text — we can skip straight to comparing the character after it.",
        "The failure function f[j] stores the length of the longest proper prefix of P[0..j] that is also a suffix. When a mismatch occurs at j, we jump to j = f[j-1] instead of j = 0.",
        "This means the pattern pointer j can only increase at most n times over the entire search (because i only increases n times), and each time j decreases it was previously increased — so the total number of decreases is also bounded by n.",
        "The preprocessing phase itself uses the same logic: we build the failure function by running a KMP-like match of the pattern against itself.",
      ],
      analogy:
        "Imagine you are searching for a word in a book by sliding a ruler over the text. Every time you find a mismatch, instead of moving the ruler back to the start, you consult a cheat-sheet that tells you exactly how far you can slide forward while keeping the already-matched prefix in place. The cheat-sheet is the failure function — built once, used many times.",
    },
    walkthrough: {
      steps: [
        {
          label: "Setup: text and pattern",
          description:
            "Text T = 'ABABABABC' (n=9), Pattern P = 'ABABC' (m=5). We want to find where P occurs in T. Start by computing the failure function for P.",
        },
        {
          label: "Compute LPS: P[0]='A'",
          description:
            "lps[0] = 0 by definition — a single character has no proper prefix that is also a suffix. Set length=0, i=1.",
        },
        {
          label: "Compute LPS: P[1]='B'",
          description:
            "P[1]='B' vs P[0]='A' — mismatch, length=0, so lps[1]=0, i=2.",
        },
        {
          label: "Compute LPS: P[2]='A'",
          description:
            "P[2]='A' vs P[0]='A' — match! length becomes 1, lps[2]=1, i=3. The prefix 'A' is also a suffix of 'ABA'.",
        },
        {
          label: "Compute LPS: P[3]='B'",
          description:
            "P[3]='B' vs P[1]='B' — match! length becomes 2, lps[3]=2, i=4. The prefix 'AB' is also a suffix of 'ABAB'.",
        },
        {
          label: "Compute LPS: P[4]='C'",
          description:
            "P[4]='C' vs P[2]='A' — mismatch. length=2 ≠ 0, so fall back: length = lps[1] = 0. Now compare P[4]='C' vs P[0]='A' — still mismatch. length=0, so lps[4]=0. LPS = [0,0,1,2,0].",
        },
        {
          label: "KMP Search: i=0..3, j=0..3",
          description:
            "T[0..3]='ABAB' all match P[0..3]='ABAB'. Both i and j advance in lockstep. i=4, j=4.",
        },
        {
          label: "KMP Search: mismatch at i=4, j=4",
          description:
            "T[4]='A' vs P[4]='C' — mismatch! j = lps[3] = 2. We do NOT move i backward. The prefix 'AB' is still aligned with T[2..3].",
        },
        {
          label: "KMP Search: resume from j=2",
          description:
            "T[4]='A' vs P[2]='A' — match. i=5, j=3. T[5]='B' vs P[3]='B' — match. i=6, j=4.",
        },
        {
          label: "KMP Search: second mismatch at i=6, j=4",
          description:
            "T[6]='A' vs P[4]='C' — mismatch again! j = lps[3] = 2. i stays at 6.",
        },
        {
          label: "KMP Search: final match sequence",
          description:
            "T[6]='A'=P[2], T[7]='B'=P[3], T[8]='C'=P[4]. j reaches m=5 — pattern found! Match position = i - j = 8 - 5 = 4 (0-indexed). After reporting, j = lps[4] = 0 to continue searching.",
        },
        {
          label: "Result",
          description:
            "Pattern 'ABABC' found at index 4 in text 'ABABABABC'. Total comparisons: ~13 instead of the naive worst-case 45. Text pointer i never moved backward.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def compute_lps(pattern: str) -> list[int]:
    """
    Compute the Longest Proper Prefix which is also Suffix (LPS) array.
    lps[i] = length of the longest proper prefix of pattern[0..i]
             that is also a suffix.
    Time: O(m)  Space: O(m)
    """
    m = len(pattern)
    lps = [0] * m
    length = 0   # length of previous longest prefix-suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length != 0:
            # Fall back using previously computed lps value.
            # Do NOT increment i here — recheck pattern[i].
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1

    return lps


def kmp_search(text: str, pattern: str) -> list[int]:
    """
    KMP string matching. Returns list of 0-indexed start positions.
    Time: O(n + m)  Space: O(m)
    """
    n, m = len(text), len(pattern)
    if m == 0:
        return []

    lps = compute_lps(pattern)
    matches: list[int] = []

    i = 0   # index into text
    j = 0   # index into pattern

    while i < n:
        if text[i] == pattern[j]:
            i += 1
            j += 1
        if j == m:
            matches.append(i - j)   # found a match
            j = lps[j - 1]          # look for next match
        elif i < n and text[i] != pattern[j]:
            if j != 0:
                j = lps[j - 1]      # skip using failure function
            else:
                i += 1              # no prefix to reuse, advance text

    return matches


# Example
if __name__ == "__main__":
    text    = "ABABABABCABABC"
    pattern = "ABABC"
    print("LPS array:", compute_lps(pattern))   # [0, 0, 1, 2, 0]
    print("Matches at:", kmp_search(text, pattern))  # [4, 8]
`,
      annotations: [
        {
          lines: [1, 8],
          note: "compute_lps builds the failure function in O(m) by running a KMP-like self-match of the pattern. lps[i] tells us where to resume in the pattern after a mismatch at position i+1.",
        },
        {
          lines: [14, 17],
          note: "When pattern[i] matches pattern[length], extend the current prefix-suffix and record its length. Both i and length advance.",
        },
        {
          lines: [18, 21],
          note: "Critical: when there is a mismatch and length > 0, we do NOT reset to 0 immediately. We fall back to lps[length-1] — the next best prefix-suffix. We do NOT increment i, so we recheck pattern[i] against the shorter prefix.",
        },
        {
          lines: [37, 44],
          note: "In the search loop, i (text pointer) never moves backward. When j reaches m, a full match is found at position i-j. We then set j = lps[j-1] to search for overlapping matches.",
        },
        {
          lines: [45, 49],
          note: "On mismatch: if j > 0, use the failure function to skip j back without moving i. If j == 0, there is nothing to reuse — just advance i. This guarantees i increases at least once every two iterations.",
        },
        {
          lines: [55, 57],
          note: "For text 'ABABABABCABABC' and pattern 'ABABC', KMP finds matches at indices 4 and 8. The LPS array [0,0,1,2,0] enables the algorithm to skip past the first match and find the second without re-examining T[0..3].",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n + m)", color: "#CEEB5A" },
        { label: "Average case", value: "O(n + m)", color: "#2255CC" },
        { label: "Worst case", value: "O(n + m)", color: "#CEEB5A" },
      ],
      spaceRows: [
        { label: "LPS array", value: "O(m)", color: "#2255CC" },
        { label: "Extra (search)", value: "O(1)", color: "#CEEB5A" },
      ],
      notes: [
        "KMP is optimal for single-pattern search: any comparison-based algorithm must examine each text character at least once, giving a lower bound of O(n). KMP achieves this.",
        "The text pointer i never decreases — the total number of character comparisons across the entire search is at most 2n (each position is matched at most once and mismatched at most once). Similarly the preprocessing is at most 2m comparisons.",
        "For multiple-pattern search, consider Aho-Corasick (generalizes KMP to a trie of patterns, O(n + total pattern length + number of matches)) or Rabin-Karp for approximate matching.",
      ],
    },
    variations: {
      items: [
        "Z-algorithm: computes the Z-array where Z[i] is the length of the longest substring starting at i that matches a prefix of the string. Equivalent power to KMP, often simpler to implement.",
        "Aho-Corasick: extends KMP to simultaneously search for multiple patterns by building a failure-link automaton on a trie of all patterns. O(n + total_m + matches).",
        "Boyer-Moore: uses two heuristics (bad-character and good-suffix) to skip large portions of the text. Often faster in practice for large alphabets (e.g., natural language) but O(n·m) worst case without the Galil rule.",
        "Rabin-Karp: uses rolling hashes to find candidate positions in O(1) per shift. O(n+m) average, O(n·m) worst case due to hash collisions. Naturally extends to 2D pattern matching.",
        "Bitap (shift-or/shift-and): represents the pattern as a bitmask and uses bitwise operations for matching. Efficient for short patterns (m ≤ 64) and supports approximate matching (Hamming/edit distance ≤ k).",
      ],
      tips: [
        "When implementing KMP, the most common bug is forgetting the 'do not increment i' rule in the fallback branch of compute_lps. Always re-examine pattern[i] after falling back.",
        "For very short patterns (m ≤ 8), the naive approach is often faster in practice due to better cache behavior and no preprocessing overhead. Profile before switching to KMP.",
        "KMP is ideal when you need to search the same pattern in many different texts: compute the LPS array once (O(m)) and reuse it for each text (O(n) per text).",
        "To find all non-overlapping matches, after a match set j = 0 instead of j = lps[j-1]. To find all overlapping matches (the default behavior above), use j = lps[j-1].",
      ],
    },
    summary: {
      keyPoints: [
        "KMP achieves O(n+m) string matching by preprocessing the pattern into an LPS (failure) array that encodes the longest proper prefix of each prefix that is also a suffix.",
        "The text pointer i never moves backward during the search phase — every text character is examined at most twice (once on match, once on mismatch), giving a strict O(n) search bound.",
        "The failure function is built by running a KMP-like self-match of the pattern against itself in O(m). The key is the fallback step: on mismatch, set length = lps[length-1] without incrementing i.",
        "On a mismatch at pattern position j, jump to j = lps[j-1]. This reuses the longest already-matched prefix that is also a suffix, avoiding redundant comparisons.",
        "KMP is optimal for single-pattern search and naturally extends to multi-pattern search (Aho-Corasick) and to searching in streams where the text is received one character at a time.",
        "Common pitfalls: using the wrong fallback rule in compute_lps, confusing 0-indexed vs 1-indexed LPS definitions, and forgetting to handle overlapping vs non-overlapping match requirements.",
      ],
    },
  },
}

export default function KmpVideo() {
  return <AlgoVideo config={config} />
}
