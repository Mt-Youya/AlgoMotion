import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Longest Common Substring",
  subtitle: "Find the longest contiguous substring common to two sequences.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given two strings A and B, find the longest substring that appears in both strings as a contiguous block of characters.",
        "Unlike the Longest Common Subsequence (LCS), every character in the answer must appear consecutively in both strings — no gaps allowed.",
        "Example: A = 'ABCABD', B = 'CABDAB' → the longest common substring is 'CABD' with length 4.",
        "The result is the actual substring (or its length), not just a count of matching characters scattered throughout.",
        "This problem appears in plagiarism detection, DNA sequence alignment, and autocomplete / spell-checking engines.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[i][j] as the length of the longest common substring that ends at A[i-1] and B[j-1] specifically.",
        "If A[i-1] == B[j-1], the current characters match and we can extend the substring ending one step earlier: dp[i][j] = dp[i-1][j-1] + 1.",
        "If A[i-1] != B[j-1], the current characters break any ongoing run, so dp[i][j] = 0 — we cannot extend a contiguous block across a mismatch.",
        "The answer is not dp[m][n] (which might be 0) but the global maximum value seen anywhere in the table during the fill.",
        "Track the position of that maximum so you can reconstruct the actual substring by slicing A (or B) at that location.",
      ],
      analogy:
        "Imagine two people walking along parallel train tracks, each reading station names aloud. Whenever they say the same name at the same moment, they start counting a shared run. The instant one says a different name, the count resets to zero. At the end, the longest run they ever counted together is the answer.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Set up a (m+1) × (n+1) DP table initialised to zero. Rows correspond to characters of A = 'ABCAB', columns to characters of B = 'CABAB'. The extra row and column are the base case.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "All cells in row 0 and column 0 remain 0 — a substring ending before either string starts has length 0.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "green", "green", "green", "green", "green"],
        },
        {
          step: 3,
          description: "dp[1][1]: A[0]='A' vs B[0]='C'. Mismatch → dp[1][1] = 0. No common substring ends here.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "blue", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: "dp[1][2]: A[0]='A' vs B[1]='A'. Match! dp[1][2] = dp[0][1] + 1 = 0 + 1 = 1. A common substring 'A' ends here. best_len = 1.",
          values: [0, 0, 1, 0, 0, 0],
          colors: ["green", "blue", "yellow", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: "dp[2][1]: A[1]='B' vs B[0]='C'. Mismatch → dp[2][1] = 0.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "blue", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description: "dp[2][2]: A[1]='B' vs B[1]='A'. Mismatch → dp[2][2] = 0.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "gray", "blue", "gray", "gray", "gray"],
        },
        {
          step: 7,
          description: "dp[3][1]: A[2]='C' vs B[0]='C'. Match! dp[3][1] = dp[2][0] + 1 = 1. Common substring 'C' ends here.",
          values: [0, 1, 0, 0, 0, 0],
          colors: ["green", "yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 8,
          description: "dp[3][2]: A[2]='C' vs B[1]='A'. Mismatch → dp[3][2] = 0. The run 'C...' is broken.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "blue", "blue", "gray", "gray", "gray"],
        },
        {
          step: 9,
          description: "dp[4][1]: A[3]='A' vs B[0]='C'. Mismatch → dp[4][1] = 0.",
          values: [0, 0, 0, 0, 0, 0],
          colors: ["green", "blue", "gray", "gray", "gray", "gray"],
        },
        {
          step: 10,
          description: "dp[4][2]: A[3]='A' vs B[1]='A'. Match! dp[4][2] = dp[3][1] + 1 = 1 + 1 = 2. Common substring 'CA' ends here. best_len = 2.",
          values: [0, 0, 2, 0, 0, 0],
          colors: ["green", "gray", "yellow", "gray", "gray", "gray"],
        },
        {
          step: 11,
          description: "Continuing the fill: dp[5][3] = dp[4][2] + 1 = 3 ('CAB'), dp[5][5] = dp[4][4] + 1 = 3 ('BAB' or 'AB'). The global max encountered is 3 (one valid answer: 'CAB').",
          values: [0, 0, 0, 3, 0, 3],
          colors: ["green", "gray", "gray", "yellow", "gray", "yellow"],
        },
        {
          step: 12,
          description: "Reconstruct by slicing A from index (best_i - best_len) to best_i. For best_len=3 at dp[5][3], the substring is A[2:5] = 'CAB'. Final answer: 'CAB' (length 3).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def longest_common_substring(a: str, b: str) -> tuple[int, str]:
    """Return (length, substring) of the longest common substring of a and b."""
    m, n = len(a), len(b)

    # dp[i][j] = length of longest common substring ending at a[i-1] and b[j-1]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    best_len = 0
    best_end_a = 0  # exclusive end index in a for the best substring

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                # Characters match: extend the run from the diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1
                if dp[i][j] > best_len:
                    best_len = dp[i][j]
                    best_end_a = i  # a[i - best_len : i] is the current best
            else:
                # Mismatch: contiguous run is broken, reset to 0
                dp[i][j] = 0

    best_substring = a[best_end_a - best_len : best_end_a]
    return best_len, best_substring


def longest_common_substring_optimised(a: str, b: str) -> tuple[int, str]:
    """Space-optimised O(min(m,n)) variant using a single rolling array."""
    if len(a) < len(b):
        a, b = b, a  # ensure b is the shorter string
    m, n = len(a), len(b)

    prev = [0] * (n + 1)
    best_len = 0
    best_end_a = 0

    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                curr[j] = prev[j - 1] + 1
                if curr[j] > best_len:
                    best_len = curr[j]
                    best_end_a = i
            # else curr[j] stays 0
        prev = curr

    return best_len, a[best_end_a - best_len : best_end_a]


# Example usage
a = "ABCABD"
b = "CABDAB"
length, substr = longest_common_substring(a, b)
print(f"Length: {length}, Substring: '{substr}'")  # Length: 4, Substring: 'CABD'`,
      annotations: [
        {
          lines: [5, 6],
          note: "dp[i][j] stores the length of the longest common substring that ends exactly at a[i-1] and b[j-1]. Unlike LCS, this resets to 0 on any mismatch, so the table is sparse.",
        },
        {
          lines: [8, 9],
          note: "Track best_len and best_end_a separately. The final answer is NOT dp[m][n] — it is the global maximum observed during the fill, because the best run may end anywhere in the table.",
        },
        {
          lines: [13, 14, 15, 16, 17],
          note: "On a match, extend the diagonal: the current run is one longer than whatever common suffix ended at (i-1, j-1). Update the best tracker whenever we find a longer run.",
        },
        {
          lines: [19, 20],
          note: "On a mismatch, dp[i][j] = 0. This is the critical difference from LCS: there is no 'take the max of left/top' — a contiguous block cannot bridge a mismatching character.",
        },
        {
          lines: [22, 23],
          note: "Reconstruct the substring with a single slice of a. best_end_a is the exclusive end index; subtracting best_len gives the start. No traceback loop is needed.",
        },
        {
          lines: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
          note: "Space-optimised variant: only two rows (prev and curr) are kept at any time, reducing memory from O(m×n) to O(min(m,n)). Iterate over the shorter string in the inner loop.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(m × n)",
          note: "Even when strings are identical, every cell must be computed to track the global maximum.",
        },
        {
          case: "Average",
          notation: "O(m × n)",
          note: "The bottom-up DP visits all (m+1)(n+1) cells unconditionally.",
        },
        {
          case: "Worst",
          notation: "O(m × n)",
          note: "No pruning or early-exit is possible in the standard DP formulation.",
        },
      ],
      space: [
        {
          case: "Full Table",
          notation: "O(m × n)",
          note: "Storing the entire table is not required for reconstruction — only the best position is needed. But the full table is kept here for clarity.",
        },
        {
          case: "Rolling Array",
          notation: "O(min(m, n))",
          note: "Each cell depends only on the previous row, so two rows of the shorter string suffice. This is the production-preferred variant.",
        },
      ],
      insights: [
        "The rolling-array optimisation is straightforward and halves memory for square inputs; always prefer it when only the length (or a single best substring) is needed.",
        "Suffix arrays with LCP (Longest Common Prefix) arrays can solve this in O((m+n) log(m+n)) time and O(m+n) space — preferred for very long strings.",
        "The DP table for Longest Common Substring is typically much sparser than for LCS (most cells are 0), which can be exploited by sparse-matrix representations for large inputs.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Longest Common Subsequence (LCS)",
          description: "Allows gaps between matched characters. The recurrence takes max(dp[i-1][j], dp[i][j-1]) on a mismatch instead of resetting to 0, and the answer is dp[m][n].",
        },
        {
          name: "Longest Repeated Substring",
          description: "Find the longest substring that appears at least twice within a single string. Equivalent to finding the longest common substring between a string and itself (with non-overlapping constraint). Efficiently solved with suffix arrays.",
        },
        {
          name: "Longest Common Substring of K Strings",
          description: "Generalise to K strings: build a generalised suffix array or use a DP table extended to K dimensions. Complexity becomes O(n^K) for DP, or O(n log n) with suffix structures.",
        },
        {
          name: "Approximate Common Substring",
          description: "Allow up to k mismatches within the common block. The recurrence accumulates a mismatch count instead of resetting to 0, enabling fuzzy matching for noisy sequences.",
        },
        {
          name: "Suffix Array + LCP Array",
          description: "Build the suffix array of the concatenated string A#B. The answer is the longest LCP between a suffix from A and a suffix from B. Achieves O((m+n) log(m+n)) time and O(m+n) space — the asymptotically optimal approach.",
        },
      ],
      tips: [
        "Always use the rolling-array variant in production: it reduces memory from O(m×n) to O(min(m,n)) with no change to time complexity or code complexity.",
        "For strings longer than ~10,000 characters, switch to the suffix-array approach — the O(n²) DP becomes a bottleneck at scale.",
        "When multiple longest common substrings of the same length exist, track all positions where best_len is achieved, not just the first one.",
        "To count the number of distinct common substrings (not just the longest), use a suffix automaton which solves the problem in O(m+n) time and space.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Longest Common Substring requires the matched characters to be contiguous in both strings — any mismatch resets the count to zero.",
        "The DP recurrence is dp[i][j] = dp[i-1][j-1] + 1 on a match, and 0 on a mismatch. The answer is the global maximum in the table, not dp[m][n].",
        "Time complexity is O(m × n); space can be reduced to O(min(m,n)) with a rolling two-row array since each cell depends only on the previous row.",
        "Reconstruction is a simple slice of one of the input strings using the recorded best position — no traceback loop is needed.",
        "For very long strings, suffix arrays with LCP arrays are the preferred approach, achieving O((m+n) log(m+n)) time and linear space.",
        "This problem is closely related to LCS but fundamentally different: resetting to 0 on mismatch (instead of taking a max) is the single line that distinguishes the two recurrences.",
      ],
    },
  },
};

export default function LongestCommonSubstringVideo() {
  return <AlgoVideo config={config} />;
}
