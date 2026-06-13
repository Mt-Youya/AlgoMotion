import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Palindrome DP",
  subtitle: "Find the longest palindromic substring using DP.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a string S, find the longest contiguous substring that reads the same forwards and backwards (a palindrome).",
        "A single character is always a palindrome. Two equal adjacent characters form a palindrome of length 2.",
        "Example: S = 'BABAD' → the longest palindromic substrings are 'BAB' or 'ABA', both of length 3.",
        "Another example: S = 'CBBD' → longest palindromic substring is 'BB' (length 2).",
        "The brute-force approach checks all O(n²) substrings and verifies each in O(n) time — O(n³) total. DP reduces this to O(n²) time and O(n²) space.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[i][j] = true if the substring S[i..j] is a palindrome, false otherwise.",
        "A substring S[i..j] is a palindrome exactly when S[i] == S[j] AND the inner substring S[i+1..j-1] is also a palindrome.",
        "Fill the DP table by increasing substring length: base cases (length 1 and 2) first, then extend outward for lengths 3 and beyond.",
        "Track the start index and length of the longest palindrome found so far as you fill each cell.",
        "The key insight is that we reuse previously computed results — checking if S[i+1..j-1] is a palindrome is an O(1) lookup in the DP table.",
      ],
      analogy:
        "Think of peeling an onion layer by layer. To know if the whole onion (S[i..j]) is symmetric, you first check if the outermost layer (S[i] and S[j]) matches, then trust that the inner layers (S[i+1..j-1]) are already verified. The DP table stores whether each inner onion is symmetric, so you never re-examine layers you've already inspected.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Initialize for S = 'BABAD' (n=5). Create a 5×5 boolean DP table dp[i][j] where dp[i][j] will be true if S[i..j] is a palindrome. Set best_start=0, best_len=1.",
        },
        {
          step: 2,
          description:
            "Base case — length 1: every single character is trivially a palindrome. Set dp[0][0]=dp[1][1]=dp[2][2]=dp[3][3]=dp[4][4]=True. best_len stays 1.",
          values: [1, 1, 1, 1, 1],
          colors: ["green", "green", "green", "green", "green"],
        },
        {
          step: 3,
          description:
            "Base case — length 2: check adjacent pairs. S[0]='B', S[1]='A': not equal → dp[0][1]=False. S[1]='A', S[2]='B': not equal → dp[1][2]=False. S[2]='B', S[3]='A': not equal → dp[2][3]=False. S[3]='A', S[4]='D': not equal → dp[3][4]=False.",
          values: [0, 0, 0, 0],
          colors: ["red", "red", "red", "red"],
        },
        {
          step: 4,
          description:
            "Length 3 substrings. Check S[0..2]='BAB': S[0]='B'==S[2]='B' AND dp[1][1]=True → dp[0][2]=True! Update best_start=0, best_len=3.",
          values: [1, 0, 0],
          colors: ["green", "gray", "gray"],
        },
        {
          step: 5,
          description:
            "Continue length 3. Check S[1..3]='ABA': S[1]='A'==S[3]='A' AND dp[2][2]=True → dp[1][3]=True! Length 3 ties with current best — best_start stays 0.",
          values: [1, 1, 0],
          colors: ["green", "green", "gray"],
        },
        {
          step: 6,
          description:
            "Continue length 3. Check S[2..4]='BAD': S[2]='B'≠S[4]='D' → dp[2][4]=False. No update to best.",
          values: [1, 1, 0],
          colors: ["green", "green", "red"],
        },
        {
          step: 7,
          description:
            "Length 4 substrings. Check S[0..3]='BABA': S[0]='B'≠S[3]='A' → dp[0][3]=False. Check S[1..4]='ABAD': S[1]='A'≠S[4]='D' → dp[1][4]=False.",
          values: [0, 0],
          colors: ["red", "red"],
        },
        {
          step: 8,
          description:
            "Length 5 substring. Check S[0..4]='BABAD': S[0]='B'≠S[4]='D' → dp[0][4]=False. No update to best.",
          values: [0],
          colors: ["red"],
        },
        {
          step: 9,
          description:
            "DP table is fully filled. The longest palindromic substring has length 3 starting at index 0: S[0..2] = 'BAB'. (Alternatively 'ABA' at index 1 is equally valid.)",
          values: [1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
          colors: ["green","gray","green","gray","gray","gray","green","green","gray","gray","gray","gray","green","gray","gray","gray","gray","gray","green","gray","gray","gray","gray","gray","green"],
        },
        {
          step: 10,
          description:
            "Result extraction: return S[best_start : best_start + best_len] = S[0:3] = 'BAB'. Time complexity O(n²), space O(n²) for the full DP table.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def longest_palindromic_substring(s: str) -> str:
    """
    Find the longest palindromic substring using bottom-up DP.
    Time: O(n^2)  Space: O(n^2)
    """
    n = len(s)
    if n == 0:
        return ""

    # dp[i][j] = True if s[i..j] is a palindrome
    dp = [[False] * n for _ in range(n)]

    best_start = 0
    best_len = 1

    # Base case: every single character is a palindrome
    for i in range(n):
        dp[i][i] = True

    # Base case: check all length-2 substrings
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            best_start = i
            best_len = 2

    # Fill for lengths 3 and above
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1          # ending index
            if s[i] == s[j] and dp[i + 1][j - 1]:
                dp[i][j] = True
                if length > best_len:
                    best_start = i
                    best_len = length

    return s[best_start : best_start + best_len]


# Space-optimized variant using center-expansion (O(1) space)
def longest_palindrome_expand(s: str) -> str:
    """Expand around each center — O(n^2) time, O(1) space."""
    def expand(left: int, right: int) -> tuple[int, int]:
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return left + 1, right - 1   # last valid palindrome bounds

    start, end = 0, 0
    for i in range(len(s)):
        l1, r1 = expand(i, i)         # odd-length center
        l2, r2 = expand(i, i + 1)     # even-length center
        if r1 - l1 > end - start:
            start, end = l1, r1
        if r2 - l2 > end - start:
            start, end = l2, r2
    return s[start : end + 1]


# Example
s = "BABAD"
print(longest_palindromic_substring(s))   # "BAB"
print(longest_palindrome_expand(s))       # "BAB"`,
      annotations: [
        {
          lines: [10],
          note: "The DP table is an n×n boolean grid. dp[i][j]=True means s[i..j] is a palindrome. Only the upper triangle (i≤j) is meaningful.",
        },
        {
          lines: [15, 16, 17],
          note: "Base case 1: every single character is a palindrome by definition. This seeds all diagonal cells dp[i][i]=True.",
        },
        {
          lines: [19, 20, 21, 22, 23],
          note: "Base case 2: adjacent equal characters form a length-2 palindrome. We update best_start and best_len here if found.",
        },
        {
          lines: [26, 27, 28, 29, 30, 31, 32, 33],
          note: "Main recurrence: s[i..j] is a palindrome if the outer characters match (s[i]==s[j]) AND the inner substring s[i+1..j-1] is already verified as a palindrome (dp[i+1][j-1]).",
        },
        {
          lines: [38, 39, 40, 41, 42, 43, 44],
          note: "Center-expansion alternative: for each index, expand outward as long as characters match. Handles both odd (single center) and even (pair center) palindromes. O(1) space but same O(n²) time.",
        },
        {
          lines: [36],
          note: "The final answer is extracted by slicing the original string using the recorded best_start and best_len — no need to store the substring itself during the DP fill.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n²)",
          note: "Even if the entire string is one palindrome, every cell of the upper-triangle DP table must be computed — no early exit.",
        },
        {
          case: "Average",
          notation: "O(n²)",
          note: "The double loop over all (i, j) pairs with i≤j gives exactly n(n+1)/2 cells, each filled in O(1).",
        },
        {
          case: "Worst",
          notation: "O(n²)",
          note: "A string like 'aaaa…a' maximizes palindromes but does not change the asymptotic complexity — still O(n²).",
        },
      ],
      space: [
        {
          case: "DP Table",
          notation: "O(n²)",
          note: "The n×n boolean table stores whether each substring is a palindrome. Only the upper triangle is used, but allocation is still O(n²).",
        },
        {
          case: "Center Expansion",
          notation: "O(1)",
          note: "The center-expansion approach uses only a constant number of pointers — no table needed. Same O(n²) time, much better space.",
        },
      ],
      insights: [
        "The DP table approach and the center-expansion approach both run in O(n²) time. For most practical inputs, center-expansion is preferred due to its O(1) space.",
        "Manacher's algorithm solves the problem in O(n) time and O(n) space using a clever reuse of previously computed palindrome radii — the asymptotically optimal solution.",
        "The DP table is only needed if you require the full palindrome structure (e.g., counting all palindromic substrings) rather than just the longest one.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Count All Palindromic Substrings",
          description:
            "Instead of tracking the longest, increment a counter whenever dp[i][j]=True. The same O(n²) DP table gives the total count in one pass. LeetCode 647.",
        },
        {
          name: "Longest Palindromic Subsequence",
          description:
            "Characters need not be contiguous — find the longest subsequence that is a palindrome. Use a different DP: lps[i][j] = lps[i+1][j-1]+2 if s[i]==s[j], else max(lps[i+1][j], lps[i][j-1]). O(n²) time and space.",
        },
        {
          name: "Palindrome Partitioning",
          description:
            "Partition the string into the minimum number of palindromic substrings. Combine the palindrome DP table with a 1-D cut DP: cuts[i] = min cuts needed for s[0..i]. O(n²) overall.",
        },
        {
          name: "Manacher's Algorithm",
          description:
            "Finds all palindromic substrings in O(n) time using a radius array and a mirror property. More complex to implement but optimal for large inputs.",
        },
        {
          name: "Shortest Palindrome (Add Characters)",
          description:
            "Find the shortest palindrome by adding characters to the front of the string. Equivalent to finding the longest palindromic prefix, solvable with KMP failure function in O(n).",
        },
      ],
      tips: [
        "For interview settings, implement center-expansion first — it is simpler to code correctly under pressure and uses O(1) space.",
        "When filling the DP table, always iterate by substring length (outer loop) not by starting index — this ensures dp[i+1][j-1] is already computed when you need it.",
        "Remember the two base cases: length 1 (always true) and length 2 (true iff s[i]==s[j]). Missing the length-2 base case causes incorrect results for even-length palindromes.",
        "To count palindromic substrings instead of finding the longest, simply sum all True cells in the upper triangle of the DP table.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "The palindrome DP recurrence dp[i][j] = (s[i]==s[j]) AND dp[i+1][j-1] captures the nested palindrome structure: a string is a palindrome iff its outer characters match and its inner substring is also a palindrome.",
        "Fill the table by increasing substring length to guarantee that dp[i+1][j-1] is already computed before dp[i][j] is evaluated — order matters.",
        "The DP approach runs in O(n²) time and O(n²) space. The center-expansion approach achieves the same time with O(1) space and is usually preferred in practice.",
        "Manacher's algorithm is the asymptotically optimal solution at O(n) time, but is rarely required outside of competitive programming.",
        "The same DP table can be reused to solve related problems: counting all palindromic substrings, minimum palindrome partitioning, and longest palindromic subsequence.",
        "Always handle the two base cases explicitly — single characters and adjacent equal pairs — before applying the general recurrence for lengths 3 and above.",
      ],
    },
  },
};

export default function PalindromeDpVideo() {
  return <AlgoVideo config={config} />;
}
