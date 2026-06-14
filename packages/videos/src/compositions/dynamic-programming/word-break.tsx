import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Word Break",
  subtitle: "Determine if a string can be segmented into dictionary words.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a string s and a dictionary of words word_dict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        "Each word in the dictionary may be reused multiple times in the segmentation.",
        'Example: s = "leetcode", word_dict = ["leet", "code"] → true ("leet" + "code").',
        'Example: s = "applepenapple", word_dict = ["apple", "pen"] → true ("apple" + "pen" + "apple").',
        'Example: s = "catsandog", word_dict = ["cats", "dog", "sand", "and", "cat"] → false (no valid segmentation).',
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Define dp[i] as true if the substring s[0:i] can be fully segmented using words from the dictionary.",
        "For each position i, check every earlier position j where dp[j] is true and s[j:i] is a dictionary word.",
        "Base case: dp[0] = true because the empty string requires no words.",
        "The final answer is dp[len(s)] — can the entire string be segmented?",
        "By building dp bottom-up, each subproblem is solved once and reused, avoiding exponential recomputation.",
      ],
      analogy:
        "Imagine reading a sentence with all spaces removed. You scan left to right and place a bookmark wherever you finish a valid word. If you can place bookmarks all the way to the end without gaps, the sentence is valid. Each new bookmark position depends only on earlier bookmark positions.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: 'Initialize dp array of size n+1 (n = len(s) = 8 for "leetcode"). Set all to False.',
          values: ["F", "F", "F", "F", "F", "F", "F", "F", "F"],
          colors: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "Set dp[0] = True. The empty prefix is always a valid segmentation.",
          values: ["T", "F", "F", "F", "F", "F", "F", "F", "F"],
          colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 3,
          description: 'Check dp[1]: s[0:1] = "l". Not in dictionary. dp[1] = False.',
          values: ["T", "F", "F", "F", "F", "F", "F", "F", "F"],
          colors: ["green", "red", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 4,
          description: 'Check dp[2]: s[0:2] = "le". Not in dictionary. dp[2] = False.',
          values: ["T", "F", "F", "F", "F", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "gray", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 5,
          description: 'Check dp[3]: s[0:3] = "lee". Not in dictionary. dp[3] = False.',
          values: ["T", "F", "F", "F", "F", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "red", "gray", "gray", "gray", "gray", "gray"],
        },
        {
          step: 6,
          description: 'Check dp[4]: j=0, dp[0]=True and s[0:4]="leet" is in dict → dp[4] = True!',
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "red", "green", "gray", "gray", "gray", "gray"],
        },
        {
          step: 7,
          description: 'Check dp[5]: s[0:5]="leetc" not in dict, s[4:5]="c" not in dict. dp[5] = False.',
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "red", "green", "red", "gray", "gray", "gray"],
        },
        {
          step: 8,
          description: 'Check dp[6]: s[4:6]="co" not in dict. dp[6] = False.',
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "red", "green", "red", "red", "gray", "gray"],
        },
        {
          step: 9,
          description: 'Check dp[7]: s[4:7]="cod" not in dict. dp[7] = False.',
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "F"],
          colors: ["green", "red", "red", "red", "green", "red", "red", "red", "gray"],
        },
        {
          step: 10,
          description: 'Check dp[8]: j=4, dp[4]=True and s[4:8]="code" is in dict → dp[8] = True!',
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "T"],
          colors: ["green", "red", "red", "red", "green", "red", "red", "red", "green"],
        },
        {
          step: 11,
          description: "dp[8] = True means the entire string can be segmented. Answer: True.",
          values: ["T", "F", "F", "F", "T", "F", "F", "F", "T"],
          colors: ["green", "red", "red", "red", "green", "red", "red", "red", "green"],
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def word_break(s: str, word_dict: list[str]) -> bool:
    word_set = set(word_dict)  # O(1) average lookup
    n = len(s)

    # dp[i] = True if s[0:i] can be segmented into dict words
    dp = [False] * (n + 1)
    dp[0] = True  # base case: empty string is always valid

    for i in range(1, n + 1):
        for j in range(i):
            # If s[0:j] is valid AND s[j:i] is a dict word
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break  # no need to check further j values

    return dp[n]


# Example usage
s = "leetcode"
word_dict = ["leet", "code"]
print(word_break(s, word_dict))  # True

s2 = "applepenapple"
word_dict2 = ["apple", "pen"]
print(word_break(s2, word_dict2))  # True

s3 = "catsandog"
word_dict3 = ["cats", "dog", "sand", "and", "cat"]
print(word_break(s3, word_dict3))  # False`,
      annotations: [
        {
          lines: [2],
          note: "Convert word_dict to a set for O(1) average-case lookup. This is critical for performance since the inner loop checks membership repeatedly.",
        },
        {
          lines: [5, 6],
          note: "dp array has n+1 elements. dp[i] represents whether s[0:i] is a valid segmentation. dp[0] = True is the essential base case.",
        },
        {
          lines: [8, 9],
          note: "Outer loop iterates over each end position i from 1 to n. We are asking: can the prefix s[0:i] be segmented?",
        },
        {
          lines: [10, 11, 12, 13],
          note: "Inner loop tries every split point j. If the left part s[0:j] is already valid (dp[j]=True) and the right part s[j:i] is a dictionary word, then s[0:i] is valid.",
        },
        {
          lines: [13],
          note: "The break is an optimization: once dp[i] is set to True, no need to try other split points for position i.",
        },
        {
          lines: [15],
          note: "Return dp[n] — whether the full string s[0:n] can be completely segmented. Time: O(n² × m) where m is average word length for slicing.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(n²)",
          note: "When early dp positions resolve quickly and the break fires often, inner loop iterations are minimized.",
        },
        {
          case: "Average",
          notation: "O(n² × m)",
          note: "n² split-point checks, each involving a string slice of average length m for the hash lookup.",
        },
        {
          case: "Worst",
          notation: "O(n² × m)",
          note: "When no valid segmentation exists, every (i, j) pair is checked and no break fires.",
        },
      ],
      space: [
        {
          case: "DP Array",
          notation: "O(n)",
          note: "Single boolean array of length n+1 to store reachability of each prefix.",
        },
        {
          case: "Word Set",
          notation: "O(W)",
          note: "Hash set storing all dictionary words, where W is total characters across all words.",
        },
      ],
      insights: [
        "Converting the dictionary to a set is essential — linear scan per lookup would push time complexity to O(n² × D) where D is dictionary size.",
        "The break statement after setting dp[i] = True is a practical optimization that can halve runtime on segmentable strings.",
        "For very long strings with large dictionaries, a trie-based approach can reduce the inner loop to O(n × max_word_len) by pruning non-matching prefixes early.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Word Break II (Return All Sentences)",
          description:
            "Instead of returning a boolean, return all possible sentences formed by inserting spaces. Requires backtracking on top of the DP reachability table to reconstruct paths.",
        },
        {
          name: "Word Break with Word Reuse Count",
          description:
            "Count the number of distinct ways to segment the string. Change the boolean dp to an integer dp and accumulate counts instead of short-circuiting with break.",
        },
        {
          name: "Concatenated Words",
          description:
            "Find all words in a list that can be formed by concatenating other words from the same list. Apply word break to each word using the remaining words as the dictionary.",
        },
        {
          name: "Trie-Optimized Word Break",
          description:
            "Build a trie from the dictionary and traverse it character by character. This avoids repeated string slicing and is faster when max word length is small relative to string length.",
        },
        {
          name: "Segment String with Minimum Cuts",
          description:
            "Find the minimum number of dictionary words needed to cover the string, or determine the minimum number of characters that cannot be covered.",
        },
      ],
      tips: [
        "Always convert the word list to a set before the DP loop — this single change can reduce runtime by an order of magnitude for large dictionaries.",
        "Add an early termination: if the string contains characters not present in any dictionary word, return False immediately.",
        "When reconstructing the actual segmentation (Word Break II), store the list of valid j values for each i rather than just a boolean.",
        "For competitive programming, precomputing the maximum word length and only iterating j from max(0, i - max_len) to i reduces the inner loop significantly.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Word Break is a classic 1-D DP problem: dp[i] = true if the prefix s[0:i] can be fully segmented into dictionary words.",
        "The recurrence checks all split points j < i: dp[i] = dp[j] AND s[j:i] in word_set, for any valid j.",
        "Base case dp[0] = True is non-negotiable — it seeds the entire DP chain.",
        "Time complexity is O(n² × m) and space is O(n + W), both tractable for typical input sizes.",
        "Using a hash set for the dictionary is the single most impactful optimization — never use a list for membership checks in the inner loop.",
        "The same DP pattern extends naturally to Word Break II (path reconstruction), word count variants, and trie-accelerated versions.",
      ],
    },
  },
}

export default function WordBreakVideo() {
  return <AlgoVideo config={config} />
}
