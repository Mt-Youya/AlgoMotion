import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Minimum Window Substring",
  subtitle:
    "Finds the smallest substring of s that contains all characters of t using an expanding/shrinking win",
  category: "two-pointers",
  difficulty: "advanced",

  chapters: [
    {
      type: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
        "If there is no such substring, return an empty string \"\".",
        "The window must contain at least the same frequency of each character as t requires — e.g. if t='AA', the window must contain at least two 'A's.",
        "The answer is guaranteed to be unique when it exists.",
        "Constraints: 1 ≤ |s|, |t| ≤ 10^5; s and t consist of uppercase and lowercase English letters.",
      ],
    },
    {
      type: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Use two pointers (left, right) to define a sliding window over s. Expand right to include more characters; shrink left once the window is valid.",
        "Maintain a frequency map 'need' for t and a 'window' map tracking counts in the current window.",
        "Track 'have' (characters satisfying their required frequency) vs 'need' (total distinct chars required). When have == need, the window is valid.",
        "Each time the window is valid, try to shrink from the left to minimize its length, recording the best result.",
        "Because each character is added and removed at most once, the total work is O(|s|) regardless of how many valid windows exist.",
        "Analogy: Imagine scanning a bookshelf for a set of required books. You slide a bookmark (right) forward until you've collected all books, then slide the left bookmark forward to remove unnecessary duplicates — repeat until the shelf is fully scanned.",
      ],
    },
    {
      type: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Initialize: s='ADOBECODEBANC', t='ABC'. Build need={A:1,B:1,C:1}. Set have=0, required=3, L=0, R=0, best=''.",
        },
        {
          step: 2,
          description: "Expand R to index 0 → s[0]='A'. window={A:1}. window[A]==need[A] so have=1. have(1) < required(3), keep expanding.",
        },
        {
          step: 3,
          description: "Expand R to index 4 → s[4]='B'. window={A:1,D:1,O:1,B:1}. window[B]==need[B] so have=2. Still need C.",
        },
        {
          step: 4,
          description: "Expand R to index 5 → s[5]='C'. window[C]==need[C] so have=3 == required=3. Window 'ADOBEC' is valid (len=6). Record best='ADOBEC'.",
        },
        {
          step: 5,
          description: "Shrink L from 0: remove s[0]='A'. window[A]=0 < need[A]=1 → have drops to 2. Window invalid. Stop shrinking.",
        },
        {
          step: 6,
          description: "Expand R through indices 6–10. Characters D,O,B,E,A added. When R=10, window contains A again → have=3 again. Window 'DOBECODEBA' — not shorter than best.",
        },
        {
          step: 7,
          description: "Shrink L: remove D,O,B,E,C,O,D,E one by one. Each removal keeps have==3 as long as minimums are met. Record each valid window length.",
        },
        {
          step: 8,
          description: "Expand R to index 11 → s[11]='N'. No effect on have. Expand R to index 12 → s[12]='C'. window[C]≥need[C] → have stays 3.",
        },
        {
          step: 9,
          description: "Shrink L aggressively: L advances from 1 to 9. At L=9 window='BANC' (len=4). This is shorter than 'ADOBEC'. Update best='BANC'.",
        },
        {
          step: 10,
          description: "Continue shrinking: L=10, remove 'B'. window[B]=0 < need[B]=1 → have=2. Window invalid. Stop.",
        },
        {
          step: 11,
          description: "R has reached end of s (index 12). Main loop ends. No shorter valid window was found.",
        },
        {
          step: 12,
          description: "Return best='BANC'. This is the minimum window substring containing all of A, B, C.",
        },
      ],
    },
    {
      type: "code",
      heading: "Python Implementation",
      language: "python",
      code: `def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""

    from collections import Counter

    need = Counter(t)          # required frequencies
    window = {}                # current window frequencies
    have, required = 0, len(need)

    left = 0
    best_len = float("inf")
    best_left = 0

    for right, char in enumerate(s):
        # Expand: add s[right] to window
        window[char] = window.get(char, 0) + 1

        # Check if this char's frequency now satisfies the need
        if char in need and window[char] == need[char]:
            have += 1

        # Shrink from left while window is valid
        while have == required:
            # Update best if current window is smaller
            window_len = right - left + 1
            if window_len < best_len:
                best_len = window_len
                best_left = left

            # Remove leftmost character
            left_char = s[left]
            window[left_char] -= 1
            if left_char in need and window[left_char] < need[left_char]:
                have -= 1
            left += 1

    if best_len == float("inf"):
        return ""
    return s[best_left : best_left + best_len]`,
      annotations: [
        {
          lines: [6, 7],
          note: "Build the 'need' frequency map from t and an empty 'window' map for the current sliding window.",
        },
        {
          lines: [8, 9],
          note: "'have' counts how many distinct characters currently satisfy their required frequency. 'required' is the total number of distinct chars in t.",
        },
        {
          lines: [13, 14, 15, 16, 17],
          note: "Expand phase: add the right-boundary character to the window. If its count exactly reaches the required count, increment 'have'.",
        },
        {
          lines: [19, 20, 21, 22, 23, 24],
          note: "Shrink phase (inner while): while the window is valid (have==required), record the best window and try to shrink from the left.",
        },
        {
          lines: [26, 27, 28, 29],
          note: "Remove the leftmost character. If its count drops below the required count, decrement 'have', making the window invalid and exiting the while loop.",
        },
        {
          lines: [31, 32, 33],
          note: "After the loop, return the best window found. If best_len was never updated, no valid window exists.",
        },
      ],
    },
    {
      type: "complexity",
      heading: "Complexity Analysis",
      timeRows: [
        { case: "Best", complexity: "O(|s| + |t|)", note: "t is not in s — scan s once" },
        { case: "Average", complexity: "O(|s| + |t|)", note: "Each char added/removed at most once" },
        { case: "Worst", complexity: "O(|s| + |t|)", note: "Large alphabet, many valid windows" },
      ],
      spaceRows: [
        { label: "need map", complexity: "O(|t|)", note: "At most |Σ| = 52 entries" },
        { label: "window map", complexity: "O(|s|)", note: "At most |Σ| distinct chars" },
        { label: "Overall", complexity: "O(|s| + |t|)", note: "Dominated by the two hash maps" },
      ],
      insights: [
        "The two-pointer approach guarantees each character is visited at most twice (once by right, once by left), giving linear time.",
        "Space is bounded by the alphabet size (52 for English letters), so in practice the maps are O(1) — but O(|s|+|t|) in the general case.",
        "Compared to a brute-force O(|s|²·|t|) approach, the sliding window is dramatically faster for large inputs.",
      ],
    },
    {
      type: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "Minimum Window Subsequence (LeetCode 727)",
          description: "Find the minimum window in s such that t is a subsequence (order matters). Requires a different two-pointer approach tracking position in t.",
        },
        {
          name: "Permutation in String (LeetCode 567)",
          description: "Check if any permutation of t exists as a substring of s. Fixed-size sliding window of length |t| instead of variable size.",
        },
        {
          name: "Find All Anagrams in a String (LeetCode 438)",
          description: "Return all start indices of anagrams of t in s. Same fixed-size window, collect all valid positions.",
        },
        {
          name: "Longest Substring Without Repeating Characters (LeetCode 3)",
          description: "Sliding window where the constraint is all characters in the window are unique — shrink when a duplicate is added.",
        },
        {
          name: "Substring with Concatenation of All Words (LeetCode 30)",
          description: "Find substrings that are concatenations of all words in a list. Extends the frequency-map idea to word-level windows.",
        },
      ],
      tips: [
        "Use a single integer counter (have/required) instead of comparing the entire maps — this avoids O(|Σ|) comparisons on every step.",
        "Pre-filter s to only the characters present in t before running the algorithm. This speeds up the inner loop when t is small relative to the alphabet.",
        "When t has duplicate characters (e.g. t='AAB'), make sure 'have' only increments when window[char] exactly equals need[char] — not every time the char appears.",
        "For streaming or online variants, maintain the window state incrementally rather than rebuilding it from scratch each time.",
      ],
    },
    {
      type: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Sliding window with two pointers solves minimum/maximum substring problems in O(n) by avoiding redundant recomputation.",
        "The 'have vs required' counter trick collapses map comparison into an O(1) check, keeping the inner loop efficient.",
        "Expand right to satisfy constraints; shrink left to minimize the window — this expand-then-shrink pattern is the heart of the algorithm.",
        "Frequency maps (Counter / dict) are the natural data structure for tracking character requirements in substring problems.",
        "The algorithm handles duplicate required characters correctly because 'have' only changes when a frequency crosses the exact threshold.",
        "This pattern generalizes: replace 'characters' with any countable resource and 'need' with any threshold to solve analogous problems.",
      ],
    },
  ],
};

export default function MinWindowSubstringVideo() {
  return <AlgoVideo config={config} />;
}
