import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Suffix Array",
  subtitle: "Sorted array of all suffixes enabling O(m log n) pattern search.",
  category: "string",
  difficulty: "advanced",
  chapters: {
    problem: {
      heading: "How do you search a long text for many patterns efficiently?",
      body: [
        "Given a string s of length n, we want to answer multiple pattern queries of the form: 'does pattern p appear in s, and where?'",
        "A naive scan checks every position in O(n·m) per query (m = pattern length). For a genome of 3 billion characters and thousands of queries, this is far too slow.",
        "A hash table of all substrings would answer queries in O(m) but requires O(n²) space — infeasible for large texts.",
        "The Suffix Array stores the starting indices of all n suffixes of s in sorted (lexicographic) order, using only O(n) space.",
        "With binary search over the sorted suffixes, any pattern of length m can be located in O(m log n) time — a dramatic improvement over the naive approach.",
      ],
      callout:
        "A suffix array is the foundation of many modern bioinformatics tools (BWA, Bowtie) and full-text search engines. It compresses the power of a suffix trie into O(n) space.",
    },
    intuition: {
      heading: "A sorted phone book of every tail of the string",
      body: [
        "Imagine cutting the string at every position and keeping the piece from the cut to the end. For s = 'banana' you get: 'banana', 'anana', 'nana', 'ana', 'na', 'a'.",
        "Now sort these six suffixes alphabetically: 'a', 'ana', 'anana', 'banana', 'na', 'nana'. The Suffix Array stores their original starting indices: [5, 3, 1, 0, 4, 2].",
        "To search for pattern 'an', binary-search the sorted list. Because the list is sorted, all suffixes that start with 'an' form a contiguous block — find the block in O(m log n).",
        "The key insight: sorted order lets us use binary search. Each comparison takes O(m) time, and there are O(log n) comparisons, giving O(m log n) total.",
        "The Longest Common Prefix (LCP) array, a companion structure, enables O(m + log n) search and supports additional string operations like counting distinct substrings.",
      ],
      analogy:
        "Think of a dictionary. Every word in the dictionary is a suffix of some enormous string. Finding a word in a dictionary is O(m log n) — you binary search by first letter, then second letter, etc. The Suffix Array is exactly that dictionary, built for any arbitrary text.",
    },
    walkthrough: {
      steps: [
        {
          label: "Input string s = 'banana'",
          description:
            "We start with s = 'banana', n = 6. Our goal is to build SA, the array of suffix starting indices sorted by their corresponding suffix strings. Indices run from 0 to 5.",
          array: [
            { value: 98, color: "#2255CC" },
            { value: 97, color: "#2255CC" },
            { value: 110, color: "#2255CC" },
            { value: 97, color: "#2255CC" },
            { value: 110, color: "#2255CC" },
            { value: 97, color: "#2255CC" },
          ],
        },
        {
          label: "Generate all 6 suffixes",
          description:
            "Enumerate every suffix: s[0:]='banana', s[1:]='anana', s[2:]='nana', s[3:]='ana', s[4:]='na', s[5:]='a'. Each suffix is identified by its starting index. We have n suffixes for a string of length n.",
          array: [
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 5, color: "#2255CC" },
          ],
        },
        {
          label: "Sort suffixes lexicographically",
          description:
            "Sort the suffixes in alphabetical order: 'a'(5) < 'ana'(3) < 'anana'(1) < 'banana'(0) < 'na'(4) < 'nana'(2). The numbers in parentheses are the original starting indices.",
          array: [
            { value: 5, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
          ],
        },
        {
          label: "SA = [5, 3, 1, 0, 4, 2]",
          description:
            "The Suffix Array stores only the starting indices in sorted order. SA[0]=5 means the lexicographically smallest suffix starts at index 5 ('a'). SA[5]=2 means the largest suffix starts at index 2 ('nana').",
          array: [
            { value: 5, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#CEEB5A" },
            { value: 4, color: "#CEEB5A" },
            { value: 2, color: "#CEEB5A" },
          ],
        },
        {
          label: "Pattern search: find 'an'",
          description:
            "To find pattern p='an', binary search the SA. At each step, compare p against s[SA[mid]:SA[mid]+m]. The sorted order guarantees all matches form a contiguous range in SA.",
          array: [
            { value: 5, color: "#888899" },
            { value: 3, color: "#E05A3A" },
            { value: 1, color: "#E05A3A" },
            { value: 0, color: "#888899" },
            { value: 4, color: "#888899" },
            { value: 2, color: "#888899" },
          ],
        },
        {
          label: "Binary search: lower bound for 'an'",
          description:
            "Find the first SA entry whose suffix >= 'an'. Check mid=2: s[SA[2]:]='anana' >= 'an' ✓ — move hi left. Check mid=0: s[SA[0]:]='a' < 'an' — move lo right. Lower bound = rank 1.",
          array: [
            { value: 5, color: "#888899" },
            { value: 3, color: "#F0A030" },
            { value: 1, color: "#888899" },
            { value: 0, color: "#888899" },
            { value: 4, color: "#888899" },
            { value: 2, color: "#888899" },
          ],
        },
        {
          label: "Binary search: upper bound for 'an'",
          description:
            "Find the first SA entry whose suffix > 'an' (i.e., does NOT start with 'an'). Check mid=3: s[SA[3]:]='banana' > 'an' — move hi. Check mid=1: s[SA[1]:]='ana' starts with 'an' — move lo. Upper bound = rank 3.",
          array: [
            { value: 5, color: "#888899" },
            { value: 3, color: "#E05A3A" },
            { value: 1, color: "#E05A3A" },
            { value: 0, color: "#888899" },
            { value: 4, color: "#888899" },
            { value: 2, color: "#888899" },
          ],
        },
        {
          label: "Matches at SA[1]=3 and SA[2]=1",
          description:
            "The range [1, 2] in SA contains all occurrences. SA[1]=3 → 'ana' starts at index 3. SA[2]=1 → 'anana' starts at index 1. Pattern 'an' occurs twice, at positions 1 and 3.",
          array: [
            { value: 5, color: "#888899" },
            { value: 3, color: "#CEEB5A" },
            { value: 1, color: "#CEEB5A" },
            { value: 0, color: "#888899" },
            { value: 4, color: "#888899" },
            { value: 2, color: "#888899" },
          ],
        },
        {
          label: "LCP array augments the SA",
          description:
            "The Longest Common Prefix (LCP) array stores LCP[i] = length of longest common prefix between SA[i-1] and SA[i]. For 'banana': LCP = [-, 0, 1, 3, 0, 0, 2]. It enables O(m + log n) search.",
          array: [
            { value: 0, color: "#8855CC" },
            { value: 1, color: "#8855CC" },
            { value: 3, color: "#8855CC" },
            { value: 0, color: "#8855CC" },
            { value: 0, color: "#8855CC" },
            { value: 2, color: "#8855CC" },
          ],
        },
        {
          label: "Construction: prefix doubling",
          description:
            "The efficient O(n log n) construction uses prefix doubling: sort suffixes by their first 1 character, then 2, then 4, 8, ... characters. Each doubling round takes O(n log n) with radix sort, giving O(n log n) total.",
          array: [
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 4, color: "#2255CC" },
            { value: 8, color: "#2255CC" },
            { value: 16, color: "#CEEB5A" },
            { value: 32, color: "#CEEB5A" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def build_suffix_array(s: str) -> list[int]:
    """
    Build the suffix array of string s using prefix doubling.
    Returns SA: list of starting indices sorted by suffix.

    Time:  O(n log^2 n)  [O(n log n) with radix sort]
    Space: O(n)
    """
    n = len(s)
    # Initial rank based on single character
    sa = list(range(n))
    rank = [ord(c) for c in s]
    tmp = [0] * n

    gap = 1
    while gap < n:
        # Comparator: sort by (rank[i], rank[i+gap])
        def key(i):
            r2 = rank[i + gap] if i + gap < n else -1
            return (rank[i], r2)

        sa.sort(key=key)

        # Re-rank based on new sorted order
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i - 1]]
            if key(sa[i]) != key(sa[i - 1]):
                tmp[sa[i]] += 1

        rank = tmp[:]
        if rank[sa[n - 1]] == n - 1:
            break   # All ranks are unique — done early
        gap *= 2

    return sa


def search(s: str, sa: list[int], pattern: str) -> list[int]:
    """Binary search for all occurrences of pattern in s."""
    m, n = len(pattern), len(s)

    def lower():
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if s[sa[mid]:sa[mid] + m] < pattern:
                lo = mid + 1
            else:
                hi = mid
        return lo

    def upper():
        lo, hi = 0, n
        while lo < hi:
            mid = (lo + hi) // 2
            if s[sa[mid]:sa[mid] + m] <= pattern:
                lo = mid + 1
            else:
                hi = mid
        return lo

    left, right = lower(), upper()
    return sorted(sa[left:right])


# Example
s = "banana"
sa = build_suffix_array(s)
print("SA:", sa)          # [5, 3, 1, 0, 4, 2]
print(search(s, sa, "an"))  # [1, 3]
`,
      annotations: [
        {
          lines: [9, 10],
          note: "Initialize ranks from ASCII values of each character. This gives a valid initial ordering for the prefix-doubling algorithm. The SA starts as [0, 1, ..., n-1] — indices in natural order.",
        },
        {
          lines: [14, 15, 16],
          note: "The key function compares two suffixes by their (rank[i], rank[i+gap]) pair. This effectively compares 2*gap characters at once. Suffixes shorter than i+gap get a sentinel rank of -1 (less than any real rank).",
        },
        {
          lines: [19, 20, 21, 22, 23],
          note: "Re-rank after sorting: two positions get the same rank if and only if their key() values are identical. This is the critical invariant — equal ranks mean equal prefixes of length 2*gap.",
        },
        {
          lines: [25, 26],
          note: "Early termination: if all n ranks are distinct, every suffix is uniquely identified by its current prefix length. No further doubling is needed. This often triggers well before log(n) rounds.",
        },
        {
          lines: [32, 33, 34, 35, 36, 37, 38],
          note: "lower() finds the first SA position where the suffix is >= pattern. upper() finds the first position where the suffix is > pattern. The range [lower, upper) contains all occurrences — standard binary search for a range.",
        },
        {
          lines: [51, 52],
          note: "For s='banana' and pattern='an', the result is [1, 3]: 'an' appears at index 1 (as part of 'anana') and at index 3 (as part of 'ana'). The two binary searches each cost O(m log n).",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Build SA (best)", value: "O(n log n)", color: "#CEEB5A" },
        { label: "Build SA (avg)", value: "O(n log² n)", color: "#2255CC" },
        { label: "Build SA (worst)", value: "O(n log² n)", color: "#E05A3A" },
        { label: "Pattern search", value: "O(m log n)", color: "#2255CC" },
        { label: "Search with LCP", value: "O(m + log n)", color: "#CEEB5A" },
      ],
      spaceRows: [
        { label: "Suffix Array", value: "O(n)", color: "#CEEB5A" },
        { label: "LCP Array", value: "O(n)", color: "#CEEB5A" },
        { label: "Rank / Temp arrays", value: "O(n)", color: "#2255CC" },
        { label: "Total auxiliary", value: "O(n)", color: "#CEEB5A" },
      ],
      notes: [
        "The SA-IS (Suffix Array Induced Sorting) algorithm achieves O(n) construction — linear time — making it the gold standard for large-scale text indexing.",
        "Compared to a suffix tree (O(n) construction, O(n) space but large constant), a suffix array uses 4–5× less memory in practice, which matters for gigabyte-scale genomes.",
        "With the LCP array, the suffix array supports counting distinct substrings in O(n), finding the longest repeated substring in O(n), and answering LCP queries in O(1) with a sparse table.",
      ],
    },
    variations: {
      items: [
        "SA-IS (Suffix Array Induced Sorting): O(n) construction by classifying positions as S-type or L-type and using induced sorting. Used in production bioinformatics tools.",
        "DC3 / Skew Algorithm: O(n) construction by recursively sorting 2/3 of positions and inducing the rest. Elegant but harder to implement than SA-IS.",
        "Compressed Suffix Array (CSA): trades query time for space, storing O(n / log n) integers instead of O(n) while still supporting O(m log n) search. Used in FM-index.",
        "BWT + FM-Index: the Burrows-Wheeler Transform of a string can be derived from the suffix array. The FM-Index built on top enables O(m) pattern search and O(n) space — the basis of tools like BWA-MEM.",
        "Generalized Suffix Array: built over a collection of strings rather than a single string. Used for multi-genome alignment and plagiarism detection across document corpora.",
      ],
      tips: [
        "For competitive programming, the O(n log² n) prefix-doubling approach is usually fast enough and far simpler to implement correctly under time pressure than SA-IS.",
        "Always append a sentinel character (e.g., '$' with ASCII value 0) to the string before building the SA. This ensures no suffix is a prefix of another, simplifying boundary conditions.",
        "When implementing binary search over the SA, be careful with the comparison: compare only the first m characters of each suffix, not the entire suffix. Off-by-one errors here silently return wrong results.",
        "For multiple pattern queries on the same text, build the SA once in O(n log n) and reuse it. Each subsequent query costs O(m log n), far better than rebuilding a data structure per query.",
      ],
    },
    summary: {
      keyPoints: [
        "A Suffix Array is the sorted array of all n suffix starting indices of a string s. It uses O(n) space and enables O(m log n) pattern search via binary search.",
        "Construction runs in O(n log² n) with the simple prefix-doubling approach, or O(n) with SA-IS — the algorithm sorts suffixes by doubling the comparison length each round.",
        "Binary search over the SA finds the contiguous range of ranks where suffixes start with the pattern. Two binary searches (lower and upper bound) give all occurrences in O(m log n).",
        "The companion LCP array stores the longest common prefix between consecutive sorted suffixes. It reduces search to O(m + log n) and enables advanced string operations in O(n).",
        "The Suffix Array is the backbone of the FM-Index and BWT-based aligners (BWA, Bowtie2) that power modern genome sequencing pipelines handling billions of base pairs.",
        "Key tradeoff: suffix array uses 4–5× less memory than a suffix tree with comparable query performance, making it the preferred choice for memory-constrained large-scale applications.",
      ],
    },
  },
}

export default function SuffixArrayVideo() {
  return <AlgoVideo config={config} />
}
