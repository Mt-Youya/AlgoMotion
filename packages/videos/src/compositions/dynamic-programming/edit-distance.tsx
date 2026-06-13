import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Edit Distance",
  subtitle: "Minimum operations to transform one string into another.",
  category: "dynamic-programming",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is Edit Distance?",
      bullets: [
        "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
        "The three allowed operations are: Insert a character, Delete a character, and Replace a character.",
        "Each operation has a cost of 1. The goal is to minimize the total cost of transformation.",
        "Also known as the Levenshtein distance, this metric quantifies how dissimilar two strings are.",
        "Example: 'horse' → 'ros' requires 3 operations: replace 'h' with 'r', delete 'r', delete 'e'.",
      ],
    },

    intuition: {
      heading: "Dynamic Programming Intuition",
      bullets: [
        "Define dp[i][j] as the edit distance between the first i characters of word1 and the first j characters of word2.",
        "If the current characters match (word1[i-1] == word2[j-1]), no operation is needed: dp[i][j] = dp[i-1][j-1].",
        "If they don't match, we try all three operations and take the minimum: dp[i][j] = 1 + min(delete, insert, replace).",
        "Base cases: dp[i][0] = i (delete all i chars) and dp[0][j] = j (insert all j chars).",
        "Real-world analogy: Think of spell-checking — the edit distance tells you how many keystrokes a typist needs to correct a misspelling into the intended word.",
      ],
      analogy:
        "Imagine you are a typist correcting a draft. Each keystroke — inserting, deleting, or overwriting a letter — costs one action. Edit distance counts the fewest keystrokes needed to turn the draft into the final text.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough: 'horse' → 'ros'",
      steps: [
        {
          step: 1,
          description:
            "Initialize a (m+1) × (n+1) DP table where m = len('horse') = 5 and n = len('ros') = 3.",
        },
        {
          step: 2,
          description:
            "Fill base cases: dp[i][0] = i for all i (cost to delete i chars from word1), dp[0][j] = j for all j (cost to insert j chars).",
        },
        {
          step: 3,
          description:
            "Compare word1[0]='h' with word2[0]='r'. They differ, so dp[1][1] = 1 + min(dp[0][1], dp[1][0], dp[0][0]) = 1 + min(1,1,0) = 1.",
        },
        {
          step: 4,
          description:
            "Compare word1[0]='h' with word2[1]='o'. They differ, so dp[1][2] = 1 + min(dp[0][2], dp[1][1], dp[0][1]) = 1 + min(2,1,1) = 2.",
        },
        {
          step: 5,
          description:
            "Compare word1[1]='o' with word2[1]='o'. They match! dp[2][2] = dp[1][1] = 1. No operation needed.",
        },
        {
          step: 6,
          description:
            "Compare word1[2]='r' with word2[0]='r'. They match! dp[3][1] = dp[2][0] = 2. No operation needed.",
        },
        {
          step: 7,
          description:
            "Continue filling the table row by row, applying the recurrence relation at each cell.",
        },
        {
          step: 8,
          description:
            "Compare word1[4]='e' with word2[2]='s'. They differ, so dp[5][3] = 1 + min(dp[4][3], dp[5][2], dp[4][2]).",
        },
        {
          step: 9,
          description:
            "The final answer is dp[5][3] = dp[m][n] = 3. This is the minimum edit distance between 'horse' and 'ros'.",
        },
        {
          step: 10,
          description:
            "Traceback: starting at dp[5][3], follow the path of minimum operations back to dp[0][0] to recover the actual sequence of edits.",
        },
        {
          step: 11,
          description:
            "Recovered operations: replace 'h' → 'r' (horse→rorse), delete 'r' (rorse→rose), delete 'e' (rose→ros).",
        },
        {
          step: 12,
          description:
            "Space optimization: since dp[i][j] only depends on the previous row, we can reduce space from O(m×n) to O(n) using a rolling array.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)

    # dp[i][j] = edit distance of word1[:i] and word2[:j]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # delete all chars from word1
    for j in range(n + 1):
        dp[0][j] = j  # insert all chars to match word2

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                # Characters match — no operation needed
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # delete from word1
                    dp[i][j - 1],      # insert into word1
                    dp[i - 1][j - 1],  # replace character
                )

    return dp[m][n]


# Space-optimized version — O(n) space
def minDistanceOptimized(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    prev = list(range(n + 1))

    for i in range(1, m + 1):
        curr = [i] + [0] * n
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = 1 + min(prev[j], curr[j - 1], prev[j - 1])
        prev = curr

    return prev[n]`,
      annotations: [
        {
          lines: [1, 2],
          note: "Initialize dimensions. m and n are the lengths of the two input strings.",
        },
        {
          lines: [5],
          note: "Allocate a (m+1)×(n+1) table. The extra row/column handles empty-string base cases.",
        },
        {
          lines: [8, 9, 10, 11],
          note: "Base cases: transforming to/from an empty string costs exactly i or j operations (all deletes or inserts).",
        },
        {
          lines: [14, 15, 16, 17],
          note: "When characters match, inherit the diagonal value — no operation needed at this position.",
        },
        {
          lines: [18, 19, 20, 21, 22],
          note: "When characters differ, take the minimum of delete (row above), insert (cell left), replace (diagonal), plus 1.",
        },
        {
          lines: [27, 28, 29, 30],
          note: "Space-optimized variant uses only two rows (prev and curr) instead of the full m×n table.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(m × n)",
          note: "No early exit — all cells must be filled regardless of input.",
        },
        {
          case: "Average",
          complexity: "O(m × n)",
          note: "Every cell requires constant work; total work is proportional to the product of string lengths.",
        },
        {
          case: "Worst",
          complexity: "O(m × n)",
          note: "Worst case is the same as average — no input pattern changes the number of subproblems.",
        },
      ],
      spaceRows: [
        {
          case: "Standard DP",
          complexity: "O(m × n)",
          note: "Full table stored in memory.",
        },
        {
          case: "Optimized",
          complexity: "O(min(m, n))",
          note: "Rolling two rows; swap word1/word2 so shorter string is the column dimension.",
        },
      ],
      insights: [
        "Edit distance is a classic example where the optimal substructure and overlapping subproblems of DP reduce an exponential brute-force search to polynomial time.",
        "The space optimization from O(m×n) to O(n) is possible because each cell only looks one row back and one column to the left.",
        "For very long strings, consider the Ukkonen algorithm or bit-parallel methods that run in O(mn/w) time using word-level parallelism.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Weighted Edit Distance",
          description:
            "Assign different costs to insert, delete, and replace operations. Useful in bioinformatics where certain mutations are more likely than others.",
        },
        {
          name: "Longest Common Subsequence (LCS)",
          description:
            "A related problem that counts the longest subsequence common to both strings. Edit distance can be derived from LCS: dist = m + n - 2 × LCS.",
        },
        {
          name: "Damerau–Levenshtein Distance",
          description:
            "Extends Levenshtein by adding transposition (swapping two adjacent characters) as a fourth operation, better modeling human typing errors.",
        },
        {
          name: "Edit Distance on Trees / Graphs",
          description:
            "Generalizes the concept to tree or graph structures, used in XML diff tools and syntax-tree comparison for compilers.",
        },
        {
          name: "Approximate String Matching",
          description:
            "Find all positions in a text where a pattern occurs with at most k edits. Used in fuzzy search engines and DNA sequence alignment.",
        },
      ],
      tips: [
        "Always ensure the shorter string is used as the column dimension when applying the space-optimized O(n) variant.",
        "For spell-checkers, pre-compute edit distances to a dictionary and cache results for common misspellings.",
        "When only the distance value (not the actual operations) is needed, skip the traceback step entirely to save time and memory.",
        "If you need to handle Unicode strings, be careful with multi-byte characters — operate on code points, not raw bytes.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Edit distance measures the minimum number of single-character edits (insert, delete, replace) needed to transform one string into another.",
        "The DP recurrence is: if characters match, inherit the diagonal; otherwise take 1 + min(delete, insert, replace).",
        "Time complexity is O(m×n) and cannot be improved in the general case without additional constraints.",
        "Space can be reduced from O(m×n) to O(min(m,n)) by keeping only two rows of the DP table at a time.",
        "Edit distance has broad applications: spell-checking, DNA alignment, diff tools, plagiarism detection, and natural language processing.",
        "The algorithm is a foundational building block — understanding it unlocks many related string DP problems like LCS, shortest common supersequence, and sequence alignment.",
      ],
    },
  },
};

export default function EditDistanceVideo() {
  return <AlgoVideo config={config} />;
}
