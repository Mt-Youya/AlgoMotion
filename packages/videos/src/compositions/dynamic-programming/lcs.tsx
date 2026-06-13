import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Longest Common Subsequence",
  subtitle: "Find the length of the longest common subsequence between two sequences.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given two sequences A and B, find the length of their longest common subsequence (LCS).",
        "A subsequence preserves the relative order of characters but does not need to be contiguous.",
        "Example: A = 'ABCBDAB', B = 'BDCAB' → LCS = 'BCAB', length = 4.",
        "Unlike substring problems, the common characters do not need to appear consecutively in either sequence.",
        "This is a foundational dynamic programming problem with applications in diff tools, bioinformatics, and version control.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[i][j] as the length of the LCS of the first i characters of A and the first j characters of B.",
        "If A[i] == B[j], the characters match and we extend the LCS found without them: dp[i][j] = dp[i-1][j-1] + 1.",
        "If A[i] != B[j], we cannot use both characters together, so we take the best of ignoring one: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
        "Base case: dp[0][j] = 0 and dp[i][0] = 0 — an empty sequence has no common subsequence with anything.",
        "The final answer dp[m][n] accumulates all matching decisions made across the full table.",
      ],
      analogy:
        "Think of two hikers following separate mountain trails. At each step they check if they are at the same landmark. If yes, they mark it and both advance. If not, one of them waits while the other moves forward, always choosing the option that keeps the most shared landmarks ahead.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Set up a (m+1) × (n+1) DP table. Rows represent characters of A = 'ABCB', columns represent characters of B = 'BCB'. All cells start at 0.",
          values: [0, 0, 0, 0],
          colors: ["gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "Fill the first row and first column with zeros — the base case: LCS with an empty string is always 0.",
          values: [0, 0, 0, 0],
          colors: ["green", "green", "green", "green"],
        },
        {
          step: 3,
          description: "dp[1][1]: A[0]='A' vs B[0]='B'. No match. dp[1][1] = max(dp[0][1], dp[1][0]) = max(0,0) = 0.",
          values: [0, 0, 0, 0],
          colors: ["green", "blue", "gray", "gray"],
        },
        {
          step: 4,
          description: "dp[1][2]: A[0]='A' vs B[1]='C'. No match. dp[1][2] = max(dp[0][2], dp[1][1]) = 0.",
          values: [0, 0, 0, 0],
          colors: ["green", "blue", "blue", "gray"],
        },
        {
          step: 5,
          description: "dp[1][3]: A[0]='A' vs B[2]='B'. No match. dp[1][3] = max(dp[0][3], dp[1][2]) = 0.",
          values: [0, 0, 0, 0],
          colors: ["green", "blue", "blue", "blue"],
        },
        {
          step: 6,
          description: "dp[2][1]: A[1]='B' vs B[0]='B'. Match! dp[2][1] = dp[1][0] + 1 = 0 + 1 = 1.",
          values: [0, 1, 0, 0],
          colors: ["green", "yellow", "gray", "gray"],
        },
        {
          step: 7,
          description: "dp[2][2]: A[1]='B' vs B[1]='C'. No match. dp[2][2] = max(dp[1][2], dp[2][1]) = max(0,1) = 1.",
          values: [0, 1, 1, 0],
          colors: ["green", "yellow", "blue", "gray"],
        },
        {
          step: 8,
          description: "dp[2][3]: A[1]='B' vs B[2]='B'. Match! dp[2][3] = dp[1][2] + 1 = 0 + 1 = 1.",
          values: [0, 1, 1, 1],
          colors: ["green", "yellow", "blue", "yellow"],
        },
        {
          step: 9,
          description: "dp[3][2]: A[2]='C' vs B[1]='C'. Match! dp[3][2] = dp[2][1] + 1 = 1 + 1 = 2.",
          values: [0, 1, 2, 0],
          colors: ["green", "blue", "yellow", "gray"],
        },
        {
          step: 10,
          description: "dp[4][3]: A[3]='B' vs B[2]='B'. Match! dp[4][3] = dp[3][2] + 1 = 2 + 1 = 3. Final answer: LCS length = 3 ('BCB').",
          values: [0, 1, 2, 3],
          colors: ["green", "blue", "blue", "yellow"],
        },
        {
          step: 11,
          description: "Traceback: starting from dp[m][n], follow diagonal on matches, otherwise go left or up. This reconstructs the actual LCS string.",
        },
        {
          step: 12,
          description: "The reconstructed LCS for A='ABCB' and B='BCB' is 'BCB' with length 3.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def lcs_length(a: str, b: str) -> int:
    """Return the length of the longest common subsequence of a and b."""
    m, n = len(a), len(b)

    # dp[i][j] = LCS length of a[:i] and b[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                # Characters match: extend diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # No match: take the best of left or top
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


def lcs_string(a: str, b: str) -> str:
    """Reconstruct the actual LCS string via traceback."""
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Traceback
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if a[i - 1] == b[j - 1]:
            result.append(a[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return "".join(reversed(result))


# Example usage
a = "ABCBDAB"
b = "BDCAB"
print(lcs_length(a, b))   # 4
print(lcs_string(a, b))   # "BCAB" (one valid LCS)`,
      annotations: [
        {
          lines: [5, 6],
          note: "Allocate a (m+1) × (n+1) table filled with zeros. The extra row and column serve as the base case: LCS with an empty string is always 0.",
        },
        {
          lines: [8, 9],
          note: "Outer loop over A, inner loop over B. Each cell depends only on the cell above (dp[i-1][j]), to the left (dp[i][j-1]), and diagonally above-left (dp[i-1][j-1]).",
        },
        {
          lines: [10, 11, 12],
          note: "When characters match, the LCS is one longer than the LCS of the prefixes that exclude both characters — we extend the diagonal.",
        },
        {
          lines: [13, 14, 15],
          note: "When characters differ, we cannot use both simultaneously. We take the maximum of the two sub-problems: skip one character from A or skip one from B.",
        },
        {
          lines: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
          note: "Traceback reconstructs the actual LCS string. Start at dp[m][n] and work backwards: diagonal step on match, move toward the larger neighbor otherwise.",
        },
        {
          lines: [43, 44],
          note: "Time complexity is O(m × n) for the table fill plus O(m + n) for traceback. Space is O(m × n) for the table; can be reduced to O(min(m,n)) if only the length is needed.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(m × n)",
          note: "Even if the sequences are identical, every cell of the table must be computed.",
        },
        {
          case: "Average",
          notation: "O(m × n)",
          note: "Standard bottom-up DP fills all (m+1)(n+1) cells regardless of input content.",
        },
        {
          case: "Worst",
          notation: "O(m × n)",
          note: "No shortcuts exist in the classic DP formulation; all cells are always visited.",
        },
      ],
      space: [
        {
          case: "Full Table",
          notation: "O(m × n)",
          note: "Storing the entire DP table is required for traceback reconstruction.",
        },
        {
          case: "Length Only",
          notation: "O(min(m, n))",
          note: "If only the LCS length is needed, two rolling rows suffice, reducing space to O(min(m,n)).",
        },
      ],
      insights: [
        "LCS has the same time complexity as matrix multiplication for square inputs — both are O(n²), making large inputs expensive.",
        "The space-optimized two-row variant is common in practice when only the length matters, halving memory usage for long sequences.",
        "For DNA or protein alignment (sequences of length ~10⁶), bit-parallel or Four-Russians method variants achieve sub-quadratic performance.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Longest Common Substring",
          description: "Requires the common characters to be contiguous. The recurrence resets to 0 on a mismatch instead of taking a max, and the answer is the global maximum seen in the table rather than dp[m][n].",
        },
        {
          name: "Edit Distance (Levenshtein)",
          description: "Counts the minimum insertions, deletions, and substitutions needed to transform one string into another. The DP table structure mirrors LCS but accumulates costs instead of lengths.",
        },
        {
          name: "Shortest Common Supersequence",
          description: "The shortest string that has both A and B as subsequences. Its length equals m + n - LCS(A, B), connecting directly to the LCS result.",
        },
        {
          name: "Longest Increasing Subsequence (LIS)",
          description: "A special case of LCS where B is the sorted version of A. LCS(A, sort(A)) gives the LIS. An O(n log n) patience-sorting solution also exists for LIS specifically.",
        },
        {
          name: "Diff / Patch (Unix diff)",
          description: "File comparison tools compute the LCS of lines to identify unchanged regions. The diff output shows insertions and deletions relative to the LCS backbone.",
        },
      ],
      tips: [
        "When sequences contain only a small alphabet (e.g., DNA with 4 bases), bit-parallel algorithms can process 64 characters per CPU word, giving a 64× speedup.",
        "For the space-optimized variant, always iterate over the shorter sequence in the inner loop so the rolling array fits in O(min(m,n)) space.",
        "To reconstruct the LCS without storing the full table, use Hirschberg's divide-and-conquer algorithm which achieves O(m × n) time in O(min(m,n)) space.",
        "LCS length combined with the sequences' lengths gives the edit distance: edit_distance = m + n - 2 * lcs_length(a, b) when only insertions and deletions are allowed.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "LCS finds the longest sequence of characters that appear in the same relative order in both input strings, without requiring contiguity.",
        "The DP recurrence has two cases: extend the diagonal on a character match, or take the max of left/top on a mismatch.",
        "The table is filled bottom-up in O(m × n) time; traceback reconstructs the actual subsequence in O(m + n) additional time.",
        "Space can be reduced to O(min(m,n)) when only the length is needed by keeping just two rows of the table at a time.",
        "LCS is the foundation for edit distance, diff tools, shortest common supersequence, and sequence alignment in bioinformatics.",
        "For very long sequences, Hirschberg's algorithm achieves optimal time and linear space simultaneously, making it the production choice.",
      ],
    },
  },
};

export default function LcsVideo() {
  return <AlgoVideo config={config} />;
}
