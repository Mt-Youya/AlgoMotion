import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Aho-Corasick",
  subtitle: "Multi-pattern string matching in O(n+m+z) using a trie with failure links.",
  category: "string",
  difficulty: "advanced",
  chapters: {
    problem: {
      heading: "How do you search for many patterns at once?",
      body: [
        "Given a text of length n and a dictionary of k patterns with total length m, find all occurrences of every pattern in the text.",
        "Running KMP or Boyer-Moore once per pattern costs O(n·k + m) — acceptable for a handful of patterns, but catastrophic when k is large (e.g., virus signatures, keyword filtering).",
        "The challenge is to scan the text exactly once, visiting each character only a constant number of times, regardless of how many patterns exist.",
        "Aho-Corasick builds a finite automaton from all patterns in O(m) preprocessing time, then scans the text in O(n + z) where z is the total number of matches found.",
        "The algorithm was published by Alfred Aho and Margaret Corasick in 1975 and is still the standard approach in antivirus engines, network intrusion detection, and search systems.",
      ],
      callout:
        "The total complexity O(n + m + z) is optimal: you must read the text (O(n)), build the automaton (O(m)), and report every match (O(z)). Aho-Corasick meets all three bounds simultaneously.",
    },
    intuition: {
      heading: "A trie that never backtracks",
      body: [
        "First, insert all patterns into a trie. Each root-to-node path spells out a prefix of at least one pattern. Nodes at the end of a full pattern are marked as output nodes.",
        "The key insight: when a mismatch occurs at some trie node, we don't restart from the root. Instead we follow a 'failure link' to the longest proper suffix of the current path that is also a valid trie prefix.",
        "Failure links are computed bottom-up in BFS order. The failure link of node v points to the node whose path is the longest proper suffix of v's path that exists in the trie.",
        "Output links are a second set of links that chain together all pattern-ending nodes reachable via failure links. When we reach a match node, we follow its output chain to report all patterns that end here.",
        "Once the automaton is built, text scanning is deterministic: for each character, follow a goto edge if it exists, otherwise follow failure links until a goto edge is found or we're back at the root.",
      ],
      analogy:
        "Imagine a security checkpoint that has a rulebook listing thousands of prohibited phrases. Instead of checking each phrase one at a time, the guard uses a decision tree (the trie) with shortcut arrows (failure links) that skip back to the most relevant earlier rule whenever a phrase doesn't match. The guard reads each word of the text exactly once and catches every violation in a single pass.",
    },
    walkthrough: {
      steps: [
        {
          label: "Patterns and text",
          description:
            'Patterns: ["he", "she", "his", "hers"]. Text: "ushers". Total pattern length m = 2+3+3+4 = 12. Text length n = 6. We expect to find "she" at index 1, "he" at index 2 (via output link), and "hers" at index 2.',
        },
        {
          label: "Build trie — insert 'he'",
          description:
            "Start from root (ε). Create node 'h' (depth 1), then node 'he' (depth 2). Mark 'he' as an output node. The trie now has the path ε → h → he.",
        },
        {
          label: "Build trie — insert 'she' and 'his'",
          description:
            "Insert 'she': ε → s → sh → she (output). Insert 'his': reuse existing 'h', add 'hi', then 'his' (output). The trie now has 6 nodes plus root.",
        },
        {
          label: "Build trie — insert 'hers'",
          description:
            "Insert 'hers': reuse 'h' and 'he', add 'her', then 'hers' (output). The trie is now complete with 9 non-root nodes covering all 4 patterns.",
        },
        {
          label: "Compute failure links (BFS)",
          description:
            "Depth-1 nodes (h, s) get failure link → root. For 'he': longest proper suffix 'e' is not in trie → fail(he) = root. For 'sh': suffix 'h' IS in trie → fail(sh) = h. For 'she': suffix 'he' IS in trie → fail(she) = he.",
        },
        {
          label: "Compute output links",
          description:
            "Output link of a node v = fail(v) if fail(v) is an output node, else output(fail(v)). For 'she': fail(she) = he, and 'he' is an output node → output(she) = he. So matching 'she' also reports 'he'.",
        },
        {
          label: "Scan text[0] = 'u'",
          description:
            "Current state: root. No goto edge for 'u' from root. Follow failure link (root → root). State stays at root. No match.",
        },
        {
          label: "Scan text[1] = 's'",
          description:
            "Current state: root. Goto edge 's' exists → move to node 's'. 's' is not an output node. State = 's'. No match.",
        },
        {
          label: "Scan text[2] = 'h'",
          description:
            "Current state: 's'. Goto edge 'h' exists from 's' → move to node 'sh'. 'sh' is not an output node. State = 'sh'. No match.",
        },
        {
          label: "Scan text[3] = 'e' — MATCH 'she' and 'he'",
          description:
            "Current state: 'sh'. Goto edge 'e' exists → move to node 'she'. 'she' is an output node → report 'she' ending at index 3 (text[1..3]). Follow output link: output(she) = he → also report 'he' ending at index 3 (text[2..3]). State = 'she'.",
        },
        {
          label: "Scan text[4] = 'r'",
          description:
            "Current state: 'she'. No goto edge for 'r' from 'she'. Follow failure link: fail(she) = 'he'. No goto edge for 'r' from 'he' either. Follow fail(he) = root. Goto edge 'r' does not exist at root. State = root. No match.",
        },
        {
          label: "Scan text[5] = 's' — MATCH 'hers'",
          description:
            "Wait — re-examining: after 'e' we're at 'she'. For 'r': fail(she)=he, goto 'r' from 'he' → 'her'. State = 'her'. For 's': goto 's' from 'her' → 'hers'. 'hers' is output → report 'hers' at text[2..5]. Total matches: 'she'@1, 'he'@2, 'hers'@2.",
        },
      ],
    },
    code: {
      language: "python",
      snippet: `from collections import deque

class AhoCorasick:
    def __init__(self, patterns: list[str]):
        # goto[node][char] = next_node
        self.goto: list[dict] = [{}]
        self.fail: list[int] = [0]
        self.output: list[list[str]] = [[]]
        self._build_trie(patterns)
        self._build_failure_links()

    def _build_trie(self, patterns: list[str]) -> None:
        for pattern in patterns:
            cur = 0
            for ch in pattern:
                if ch not in self.goto[cur]:
                    self.goto[cur][ch] = len(self.goto)
                    self.goto.append({})
                    self.fail.append(0)
                    self.output.append([])
                cur = self.goto[cur][ch]
            self.output[cur].append(pattern)

    def _build_failure_links(self) -> None:
        q: deque[int] = deque()
        # Depth-1 nodes: failure link = root (0)
        for ch, s in self.goto[0].items():
            self.fail[s] = 0
            q.append(s)
        # BFS to set failure links for deeper nodes
        while q:
            r = q.popleft()
            for ch, s in self.goto[r].items():
                q.append(s)
                state = self.fail[r]
                while state != 0 and ch not in self.goto[state]:
                    state = self.fail[state]
                self.fail[s] = self.goto[state].get(ch, 0)
                if self.fail[s] == s:
                    self.fail[s] = 0
                # Merge output: inherit patterns from failure-link node
                self.output[s] += self.output[self.fail[s]]

    def search(self, text: str) -> list[tuple[int, str]]:
        """Return list of (end_index, pattern) for every match."""
        results: list[tuple[int, str]] = []
        cur = 0
        for i, ch in enumerate(text):
            while cur != 0 and ch not in self.goto[cur]:
                cur = self.fail[cur]
            cur = self.goto[cur].get(ch, 0)
            for pat in self.output[cur]:
                start = i - len(pat) + 1
                results.append((start, pat))
        return results


# Example
ac = AhoCorasick(["he", "she", "his", "hers"])
print(ac.search("ushers"))
# → [(1, 'she'), (2, 'he'), (2, 'hers')]
`,
      annotations: [
        {
          lines: [5, 6, 7],
          note: "The automaton is stored as three parallel arrays: goto (transition table), fail (failure links), and output (patterns ending at each node). Using arrays indexed by node ID is cache-friendly and avoids object overhead.",
        },
        {
          lines: [10, 11, 12, 13, 14, 15, 16, 17],
          note: "Trie construction is straightforward: for each character in each pattern, create a new node if the edge doesn't exist, then advance. Mark the final node with the pattern string. Total time: O(m).",
        },
        {
          lines: [20, 21, 22, 23],
          note: "Depth-1 nodes always have failure link = root (0). This is the base case for the BFS. We seed the queue with all direct children of the root.",
        },
        {
          lines: [25, 26, 27, 28, 29, 30, 31, 32, 33],
          note: "For each node s reached via character ch from parent r: follow failure links from r's failure until we find a node that has a goto edge for ch (or reach root). That destination is fail[s]. This is the 'longest proper suffix that is a trie prefix' computation.",
        },
        {
          lines: [35],
          note: "Output merging: inherit all patterns from the failure-link node. This is the output-link chain flattened into a list. It ensures that when we report matches at node s, we also report all patterns ending at nodes reachable via failure links.",
        },
        {
          lines: [39, 40, 41, 42, 43, 44, 45, 46],
          note: "Text scan: for each character, follow failure links until a valid goto edge is found (or we're at root). Then follow the goto edge. Report all patterns in output[cur]. The amortized number of failure-link traversals per character is O(1), giving O(n) total scan time.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Preprocessing (build)", value: "O(m · |Σ|)", color: "#2255CC" },
        { label: "Text scan", value: "O(n + z)", color: "#CEEB5A" },
        { label: "Total", value: "O(n + m + z)", color: "#CEEB5A" },
      ],
      spaceRows: [
        { label: "Trie nodes", value: "O(m)", color: "#CEEB5A" },
        { label: "Goto table (dense)", value: "O(m · |Σ|)", color: "#2255CC" },
        { label: "Failure + output links", value: "O(m + z)", color: "#CEEB5A" },
      ],
      notes: [
        "n = text length, m = total pattern length, z = total matches, |Σ| = alphabet size (26 for lowercase English). The goto table can be stored as a hash map to reduce space to O(m) at the cost of slightly slower lookups.",
        "Failure link construction runs in O(m) amortized via BFS. Each node is visited exactly once, and the while-loop for finding the failure state is amortized O(1) per node by a potential-function argument.",
        "Compared to running KMP per pattern (O(n·k + m)), Aho-Corasick is dramatically faster when k is large. For k=1000 patterns of length 10 and a text of length 1M, KMP needs ~10^9 ops while Aho-Corasick needs ~10^6.",
      ],
    },
    variations: {
      items: [
        "Compressed Aho-Corasick (Aho-Corasick with path compression): merge chains of single-child nodes into single edges labeled with strings. Reduces trie size from O(m) to O(k) nodes at the cost of more complex edge matching.",
        "Bitset-accelerated Aho-Corasick: represent the goto table as a bitset per node. Useful for very large alphabets (e.g., Unicode) where the dense table would be too large.",
        "Aho-Corasick with wildcards: extend the automaton to handle patterns containing wildcard characters (e.g., '?') by adding epsilon transitions or preprocessing the trie differently.",
        "Parallel Aho-Corasick: partition the text among threads, each running the automaton independently. Matches that span partition boundaries require a small overlap region to be checked separately.",
        "Streaming Aho-Corasick: maintain automaton state across calls to a search function, enabling pattern matching over a stream of bytes without buffering the entire text. The state (current node) is preserved between calls.",
      ],
      tips: [
        "Use a hash map (dict) for the goto table when the alphabet is large or patterns are sparse. Use a flat array of size |Σ| per node when the alphabet is small (e.g., DNA: 4 characters) for maximum cache performance.",
        "When patterns overlap significantly (many shared prefixes), the trie can be much smaller than the sum of pattern lengths. This is common in network intrusion detection where many signatures share prefixes.",
        "Always merge output links during preprocessing (not at search time) to keep the search loop tight. Chasing output links at search time adds latency proportional to the match count per position.",
        "For case-insensitive matching, normalize all patterns and text to lowercase before building the automaton. This is simpler and faster than adding both cases to the trie.",
      ],
    },
    summary: {
      keyPoints: [
        "Aho-Corasick builds a finite automaton from all patterns in O(m) time, then scans the text in O(n + z) time — total O(n + m + z), which is optimal for multi-pattern string matching.",
        "The trie encodes all patterns. Failure links let the automaton skip back to the longest matching suffix without re-reading characters. Output links chain together overlapping pattern matches.",
        "Failure links are computed bottom-up in BFS order: fail[s] = the node whose path is the longest proper suffix of s's path that exists in the trie.",
        "During text scan, each character causes at most one goto transition and an amortized O(1) number of failure-link traversals, giving O(n) total scan time regardless of pattern count.",
        "Output links are essential for correctness: when pattern A is a suffix of pattern B, matching B at position i must also report A. Merging output lists during preprocessing handles this automatically.",
        "Real-world applications include antivirus scanners (matching thousands of virus signatures), network intrusion detection (Snort, Suricata), search engines (keyword highlighting), and bioinformatics (DNA motif search).",
      ],
    },
  },
}

export default function AhoCorasickVideo() {
  return <AlgoVideo config={config} />
}
