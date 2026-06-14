import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Longest Substring Without Repeating",
  subtitle: "Uses a sliding window with a hash set to find the longest substring without duplicate characters.",
  category: "two-pointers",
  difficulty: "intermediate",

  chapters: [
    {
      kind: "problem",
      heading: "Problem Statement",
      bullets: [
        "Given a string s, find the length of the longest substring without repeating characters.",
        "A substring is a contiguous sequence of characters within the string.",
        "Each character in the window must be unique — no duplicates allowed.",
        'Example: s = "abcabcbb" → answer is 3, from substring "abc".',
        'Edge cases: empty string returns 0; single character returns 1; all-same string (e.g. "bbbbb") returns 1.',
      ],
    },

    {
      kind: "intuition",
      heading: "Core Intuition",
      bullets: [
        "Think of the window as a frame sliding over the string — it grows to the right when safe, and shrinks from the left when a duplicate appears.",
        "A hash set tracks which characters are currently inside the window, enabling O(1) duplicate checks.",
        "When the right pointer encounters a character already in the set, the left pointer advances until the duplicate is removed.",
        "At every step we record the window size and keep track of the maximum seen so far.",
        "The key insight: each character is added and removed from the set at most once, giving linear overall time.",
      ],
      analogy:
        "Imagine reading a book and highlighting a stretch of unique words. When you hit a word you already highlighted, you erase from the start until the duplicate is gone, then keep extending.",
    },

    {
      kind: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          index: 1,
          label: "Initialize",
          description: "Set left = 0, max_len = 0, and an empty hash set window_set = {}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 2,
          label: "right=0: add 'a'",
          description: "'a' is not in the set. Add it. window = {a}. max_len = max(0, 1) = 1.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["green", "gray", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 3,
          label: "right=1: add 'b'",
          description: "'b' is not in the set. Add it. window = {a, b}. max_len = max(1, 2) = 2.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["green", "green", "gray", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 4,
          label: "right=2: add 'c'",
          description: "'c' is not in the set. Add it. window = {a, b, c}. max_len = max(2, 3) = 3.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["green", "green", "green", "gray", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 5,
          label: "right=3: 'a' collision",
          description:
            "'a' is already in the set. Shrink: remove s[left]='a' and advance left to 1. Now window = {b, c}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["red", "green", "green", "yellow", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 6,
          label: "right=3: add 'a' again",
          description: "After shrinking, add 'a' at right=3. window = {b, c, a}. max_len stays 3.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "green", "green", "green", "gray", "gray", "gray", "gray"],
          },
        },
        {
          index: 7,
          label: "right=4: 'b' collision",
          description: "'b' is in the set. Remove s[left=1]='b', advance left to 2. Then add 'b'. window = {c, a, b}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "red", "green", "green", "green", "gray", "gray", "gray"],
          },
        },
        {
          index: 8,
          label: "right=5: 'c' collision",
          description: "'c' is in the set. Remove s[left=2]='c', advance left to 3. Add 'c'. window = {a, b, c}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "gray", "red", "green", "green", "green", "gray", "gray"],
          },
        },
        {
          index: 9,
          label: "right=6: 'b' collision",
          description:
            "'b' is in the set. Remove s[left=3]='a', s[left=4]='b', advance left to 5. Add 'b'. window = {c, b}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "gray", "gray", "gray", "red", "green", "green", "gray"],
          },
        },
        {
          index: 10,
          label: "right=7: 'b' collision again",
          description:
            "'b' is in the set. Remove s[left=5]='c', s[left=6]='b', advance left to 7. Add 'b'. window = {b}.",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["gray", "gray", "gray", "gray", "gray", "gray", "red", "green"],
          },
        },
        {
          index: 11,
          label: "Scan complete",
          description: "All characters processed. max_len = 3. The answer is 3 (from any of the 'abc' windows).",
          arrayState: {
            values: ["a", "b", "c", "a", "b", "c", "b", "b"],
            colors: ["blue", "blue", "blue", "gray", "gray", "gray", "gray", "gray"],
          },
        },
      ],
    },

    {
      kind: "code",
      heading: "Python Implementation",
      snippet: `def length_of_longest_substring(s: str) -> int:
    window_set: set[str] = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        # Shrink window until no duplicate
        while s[right] in window_set:
            window_set.remove(s[left])
            left += 1

        # Expand window to include s[right]
        window_set.add(s[right])

        # Update maximum window size
        max_len = max(max_len, right - left + 1)

    return max_len


# Optimised variant using a dict to jump left pointer directly
def length_of_longest_substring_optimised(s: str) -> int:
    char_index: dict[str, int] = {}
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        if char in char_index and char_index[char] >= left:
            left = char_index[char] + 1
        char_index[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len`,
      annotations: [
        {
          lines: [1, 4],
          note: "Initialise the sliding window: an empty set tracks characters in the current window, left pointer starts at 0, max_len accumulates the answer.",
        },
        {
          lines: [6, 9],
          note: "The inner while loop shrinks the window from the left whenever s[right] is already present, removing characters one by one until the duplicate is gone.",
        },
        {
          lines: [11, 12],
          note: "After guaranteeing uniqueness, s[right] is safely added to the set — the window is now valid and one character wider.",
        },
        {
          lines: [14, 15],
          note: "Window size is right - left + 1. We update max_len each iteration so the answer is always current.",
        },
        {
          lines: [19, 26],
          note: "Optimised O(n) variant: instead of a set, a dict stores the last seen index of each character. The left pointer jumps directly past the previous occurrence, avoiding the inner loop entirely.",
        },
        {
          lines: [22, 23],
          note: "Guard `char_index[char] >= left` ensures we only jump forward — we must not move left pointer backwards when the duplicate is outside the current window.",
        },
      ],
    },

    {
      kind: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n)",
          note: "All characters unique — right pointer traverses once, left never moves.",
        },
        {
          case: "Average",
          notation: "O(n)",
          note: "Each character is added and removed from the set at most once.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          note: "All characters identical — left chases right every step, but total operations remain 2n.",
        },
      ],
      spaceRows: [
        {
          case: "Window set",
          notation: "O(min(n, m))",
          note: "m is the size of the character set (e.g. 26 for lowercase ASCII, 128 for full ASCII).",
        },
        {
          case: "Optimised dict",
          notation: "O(min(n, m))",
          note: "Same bound — stores at most one entry per distinct character.",
        },
      ],
      insights: [
        "The naive brute-force approach checks all O(n²) substrings, each validated in O(n), giving O(n³) overall — the sliding window cuts this to linear.",
        "The character-set bound O(min(n, m)) means for ASCII strings the space is effectively O(1) — at most 128 entries regardless of string length.",
        "The optimised dict variant eliminates the inner while loop, making it strictly O(n) time with no hidden constant from repeated left-pointer advances.",
      ],
    },

    {
      kind: "variations",
      heading: "Variations & Related Problems",
      variations: [
        {
          name: "At Most K Distinct Characters",
          description:
            "Allow up to k distinct characters in the window. Replace the set with a frequency map; shrink when map size exceeds k. LeetCode 340.",
        },
        {
          name: "Longest Substring with At Most Two Distinct",
          description:
            "Special case of k=2. Common interview variant; same sliding-window pattern with a size-2 frequency map. LeetCode 159.",
        },
        {
          name: "Minimum Window Substring",
          description:
            "Find the smallest window containing all characters of a target string. Uses two frequency maps and a 'formed' counter. LeetCode 76.",
        },
        {
          name: "Longest Repeating Character Replacement",
          description:
            "Allow at most k replacements; maximise the window where one character dominates. Track the max frequency character in the window. LeetCode 424.",
        },
        {
          name: "Fruit Into Baskets",
          description:
            "Equivalent to 'at most 2 distinct integers in a subarray'. Same template with an integer frequency map. LeetCode 904.",
        },
      ],
      tips: [
        "Always ask: 'What does the window invariant look like?' — here it is 'all characters unique'. Encode that as the shrink condition.",
        "Use a frequency map instead of a set when you need counts, not just presence. The shrink condition becomes 'any count > 1'.",
        "For the optimised jump variant, remember to guard against moving the left pointer backwards — always take max(left, prev_index + 1).",
        "Unicode strings require a full dict; for ASCII-only inputs a 128-element array is faster than a hash map.",
      ],
    },

    {
      kind: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "The sliding window pattern reduces an O(n²) or O(n³) brute-force to O(n) by reusing work from the previous window state.",
        "A hash set gives O(1) membership tests, making the 'is this character a duplicate?' check free inside the loop.",
        "The two-pointer invariant: the window [left, right] always contains only unique characters before right advances.",
        "Every character is processed at most twice — once when added (right pointer) and once when removed (left pointer) — proving the O(n) bound.",
        "The optimised dict variant further eliminates redundant left-pointer steps by jumping directly to the position after the previous occurrence.",
        "This pattern generalises broadly: swap the uniqueness constraint for any window property and the same expand/shrink skeleton applies.",
      ],
    },
  ],
}

export default function LongestNoRepeatVideo() {
  return <AlgoVideo config={config} />
}
