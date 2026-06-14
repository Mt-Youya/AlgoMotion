import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Manacher's Algorithm",
  subtitle: "Finds longest palindromic substring in O(n).",
  category: "string",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Is the Longest Palindromic Substring Problem?",
      bullets: [
        "Given a string s, find the longest contiguous substring that reads the same forwards and backwards.",
        'Example: in "babad", both "bab" and "aba" are valid answers of length 3.',
        "A brute-force check of all O(n²) substrings and verifying each in O(n) gives O(n³) total — far too slow.",
        "The classic expand-around-center approach improves this to O(n²), but Manacher's achieves O(n) by reusing previously computed palindrome radii.",
        'The algorithm must handle both odd-length palindromes ("aba") and even-length palindromes ("abba") correctly.',
      ],
    },

    intuition: {
      heading: "The Key Insight: Mirrors and Boundaries",
      bullets: [
        "If we already know a large palindrome centered at C with right boundary R, any character i inside that palindrome has a mirror i' = 2C - i on the left side.",
        "The palindrome radius at i is at least min(R - i, P[i']), because the left half mirrors the right half.",
        "We only need to expand beyond R — never re-examine what's already inside a known palindrome.",
        "By transforming the string (inserting '#' separators), we unify odd and even palindromes into a single framework.",
        'This "lazy reuse" of mirror information is what drives the amortized O(n) complexity — each character is visited at most twice.',
      ],
      analogy:
        "Think of a rubber stamp shaped like a palindrome. Once you've stamped a large palindrome on paper, you can read off the shape of every smaller palindrome inside it for free — just look at the mirror image on the other side of the center.",
    },

    walkthrough: {
      heading: 'Step-by-Step: s = "abacaba"',
      steps: [
        {
          step: 1,
          description:
            'Transform the string by inserting \'#\' separators: "abacaba" → "#a#b#a#c#a#b#a#". This 15-character string T treats all palindromes as odd-length.',
        },
        {
          step: 2,
          description:
            "Initialize the P array of length 15 (all zeros), and set C = 0 (current best center) and R = 0 (rightmost boundary reached).",
        },
        {
          step: 3,
          description:
            "i=1 (char 'a'): i is not inside any known palindrome (i >= R). Expand around index 1: T[0]='#' == T[2]='#', so P[1]=1. Update C=1, R=2.",
        },
        {
          step: 4,
          description:
            "i=3 (char 'b'): i < R=2 is false. Expand: T[2]='#'==T[4]='#', T[1]='a'==T[5]='a', T[0]='#'==T[6]='#' → P[3]=3. Update C=3, R=6.",
        },
        {
          step: 5,
          description:
            "i=5 (char 'a'): mirror = 2*3-5 = 1, P[1]=1. Since i+P[mirror]=6 == R, P[5] starts at 1 then we try to expand: T[4]='#' vs T[6]='#' — match, but T[3]='b' vs T[7]='c' — no match. P[5]=1. C and R unchanged.",
        },
        {
          step: 6,
          description:
            "i=7 (char 'c'): i >= R. Expand fully: the entire transformed string is a palindrome centered here. P[7]=7. Update C=7, R=14. This is the global maximum.",
        },
        {
          step: 7,
          description:
            "i=9 (char 'b'): mirror = 2*7-9 = 5, P[5]=1. i+1=10 < R=14, so P[9] starts at 1. Expand: T[8]='#'==T[10]='#', T[7]='c' vs T[11]='b' — no match. P[9]=1.",
        },
        {
          step: 8,
          description:
            "i=11 (char 'a'): mirror = 2*7-11 = 3, P[3]=3. Check: i+P[mirror] = 11+3 = 14 == R, so P[11] = min(R-i, P[3]) = min(3,3) = 3. Try to expand beyond: out of bounds. P[11]=3.",
        },
        {
          step: 9,
          description:
            "Continue for remaining indices. All remaining P values are 0 or 1 (boundary '#' characters). No updates to C or R since R=14 already covers the end.",
        },
        {
          step: 10,
          description:
            "Find max(P): P[7]=7 is the maximum. The longest palindrome center is at T[7]='c', with radius 7.",
        },
        {
          step: 11,
          description:
            'Convert back to original string: start = (7 - 7) / 2 = 0, length = 7. The longest palindromic substring is s[0..6] = "abacaba".',
        },
        {
          step: 12,
          description:
            'Final answer: "abacaba" with length 7. The entire input string is itself a palindrome in this example.',
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      snippet: `def manacher(s: str) -> str:
    # Transform: insert '#' separators
    T = '#' + '#'.join(s) + '#'
    n = len(T)
    P = [0] * n          # palindrome radius at each center
    C = R = 0            # center and right boundary of rightmost palindrome

    for i in range(n):
        mirror = 2 * C - i

        # Use mirror's radius if i is within current right boundary
        if i < R:
            P[i] = min(R - i, P[mirror])

        # Attempt to expand palindrome centered at i
        a, b = i + P[i] + 1, i - P[i] - 1
        while a < n and b >= 0 and T[a] == T[b]:
            P[i] += 1
            a += 1
            b -= 1

        # Update rightmost palindrome boundary
        if i + P[i] > R:
            C = i
            R = i + P[i]

    # Find the maximum radius and recover the original substring
    max_len, center = max((v, i) for i, v in enumerate(P))
    start = (center - max_len) // 2
    return s[start : start + max_len]


# Example usage
print(manacher("babad"))    # "bab" or "aba"
print(manacher("cbbd"))     # "bb"
print(manacher("abacaba"))  # "abacaba"
`,
      annotations: [
        {
          lines: "2",
          note: "The '#' transformation converts any string to one where all palindromes are odd-length, simplifying the expand step.",
        },
        {
          lines: "5",
          note: "P[i] stores the radius of the longest palindrome centered at T[i]. A radius of 3 means 3 characters extend on each side.",
        },
        {
          lines: "6",
          note: "C is the center of the palindrome that currently reaches furthest right. R is that palindrome's right boundary index.",
        },
        {
          lines: "9-10",
          note: "The mirror trick: if i is inside the known palindrome [C-R, C+R], P[i] is at least min(R-i, P[mirror]). This avoids redundant comparisons.",
        },
        {
          lines: "13-17",
          note: "Standard expand-around-center loop. Because of the mirror initialization, this loop runs O(1) amortized — R only ever moves right.",
        },
        {
          lines: "25-27",
          note: "Converting back: the center in T at index c maps to original index (c - radius) / 2 because every original character occupies 2 positions in T.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n)",
          note: "All characters identical — mirror reuse is maximal.",
        },
        {
          case: "Average",
          complexity: "O(n)",
          note: "Amortized: R only moves rightward, so total expansions ≤ 2n.",
        },
        {
          case: "Worst",
          complexity: "O(n)",
          note: 'Even for adversarial inputs like "aaaa…a", the algorithm stays linear.',
        },
      ],
      spaceRows: [
        {
          resource: "P array",
          complexity: "O(n)",
          note: "Stores palindrome radius for each position in the transformed string.",
        },
        {
          resource: "Transformed string T",
          complexity: "O(n)",
          note: "T has length 2n+1, which is still O(n).",
        },
      ],
      insights: [
        "Manacher's is asymptotically optimal — any algorithm must read every character at least once, giving an Ω(n) lower bound.",
        "The amortized O(n) proof relies on the fact that R (the right boundary) is non-decreasing; each character causes at most one boundary advance.",
        "Space can be reduced to O(1) extra (beyond the output) if the transformed string is generated on-the-fly, but the P array itself is O(n) and necessary.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Count All Palindromic Substrings",
          description:
            "After computing P[], sum (P[i] + 1) / 2 for each i to count every palindromic substring in O(n) time.",
        },
        {
          name: "Eertree (Palindromic Tree)",
          description:
            "A data structure that stores all distinct palindromic substrings in O(n) space, enabling online construction and palindrome queries.",
        },
        {
          name: "Longest Palindromic Subsequence",
          description: "A different problem (not contiguous) solved with DP in O(n²). Manacher's does not apply here.",
        },
        {
          name: "Palindrome Partitioning",
          description:
            "Use Manacher's P array to precompute isPalindrome(i,j) in O(1), then apply DP for minimum-cut partitioning in O(n²) instead of O(n³).",
        },
        {
          name: "Streaming / Online Palindrome Detection",
          description:
            "Manacher's can be adapted to process characters one at a time, updating C and R incrementally for streaming inputs.",
        },
      ],
      tips: [
        "Always use the '#'-transformed string to avoid separate handling of even/odd palindromes — it simplifies both code and proofs.",
        "When implementing, be careful with the mirror boundary condition: use min(R - i, P[mirror]) only when i < R, not i <= R.",
        "To recover the actual substring (not just its length), store the center index alongside the maximum P value.",
        "For competitive programming, Manacher's is often overkill — the O(n²) expand-around-center is simpler and sufficient for n ≤ 10⁵.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Manacher's Algorithm solves the longest palindromic substring problem in O(n) time and O(n) space — optimal in both measures.",
        "The core insight is the mirror property: characters inside a known palindrome inherit radius information from their mirror counterpart, avoiding redundant work.",
        "The '#' transformation elegantly unifies odd and even palindromes, reducing the algorithm to a single case.",
        'The right boundary R is the algorithm\'s "memory" — it monotonically advances, ensuring each position is expanded at most once in total.',
        "The P array is a complete palindrome profile of the string: P[i] = k means there is a palindrome of length 2k+1 (in the transformed string) centered at i.",
        "Understanding Manacher's deeply unlocks faster solutions to related problems: palindrome counting, partitioning, and substring queries all benefit from the precomputed P array.",
      ],
    },
  },
}

export default function ManacherVideo() {
  return <AlgoVideo config={config} />
}
