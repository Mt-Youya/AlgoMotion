import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Trie",
  subtitle: "Tree for storing strings with O(m) insert and search.",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "What Problem Does a Trie Solve?",
      body: [
        "Hash maps and binary search trees store complete strings as keys — they cannot efficiently answer prefix queries like 'find all words starting with ca'.",
        "A Trie (also called a prefix tree or digital tree) stores strings character by character so that all words sharing a prefix share the same path from the root.",
        "Insert and search both run in O(m) time where m is the length of the key — completely independent of how many strings are already stored.",
        "Prefix enumeration, autocomplete, and spell-checking become O(m + k) where k is the number of matching results — impossible to beat with a plain hash map.",
        "Tries are the backbone of search engines, IP routing tables (longest-prefix match), autocomplete widgets, and compiler symbol tables.",
      ],
      callout:
        "Key insight: A Trie turns string problems into tree traversal problems — shared prefixes are stored once, not duplicated across every key.",
    },

    intuition: {
      heading: "Think of a Filing Cabinet with Alphabetical Tabs",
      body: [
        "Imagine a filing cabinet where the first drawer is labelled with the first letter of a word, the folders inside are labelled with the second letter, and so on.",
        "To file the word 'cat' you open drawer 'c', then the 'a' folder, then place a card labelled 't' and mark it as a complete word.",
        "To file 'car' you open the same 'c' drawer and 'a' folder (already there), then add a 'r' card — the prefix 'ca' is shared at zero extra cost.",
        "To search for 'cap' you open 'c', then 'a', then look for 'p' — if there is no 'p' tab, the word is not in the cabinet.",
        "Prefix queries are trivial: navigate to the folder for the prefix and enumerate everything inside — that subtree contains exactly the matching words.",
      ],
      analogy:
        "Real-world analogy: a phone book where names are stored letter by letter in a tree of folders. Looking up 'Smith' means opening S → m → i → t → h, not scanning all entries. Every name starting with 'Sm' lives in the same 'Sm' folder.",
    },

    walkthrough: {
      steps: [
        {
          label: "Start: Empty Trie",
          description:
            "The trie has a single root node with an empty children dictionary and is_end = False. The root represents the empty string — the common ancestor of all stored keys.",
        },
        {
          label: "Insert 'cat' — step 'c'",
          description:
            "Start at root. Look for child 'c'. It does not exist, so create a new TrieNode and add it as root.children['c']. Move the current pointer to this new node.",
        },
        {
          label: "Insert 'cat' — step 'a'",
          description:
            "Now at node 'c'. Look for child 'a'. It does not exist, so create TrieNode and add as node_c.children['a']. Move pointer to node 'a'.",
        },
        {
          label: "Insert 'cat' — step 't' + end marker",
          description:
            "Now at node 'a'. Look for child 't'. Create it. Move pointer to node 't'. We have consumed all characters, so set node_t.is_end = True. 'cat' is now stored.",
        },
        {
          label: "Insert 'car' — prefix 'ca' is shared",
          description:
            "Start at root. Child 'c' already exists — follow it. Child 'a' already exists — follow it. Child 'r' does not exist — create it. Set node_r.is_end = True. Only ONE new node was created.",
        },
        {
          label: "Insert 'card' — extends 'car'",
          description:
            "Follow root → c → a → r (all exist). Child 'd' does not exist — create it. Set node_d.is_end = True. The path for 'car' is now a proper prefix of 'card'.",
        },
        {
          label: "Insert 'bat' — new branch",
          description:
            "Start at root. Child 'b' does not exist — create it. Child 'a' under 'b' does not exist — create it. Child 't' under that 'a' does not exist — create it. Set is_end = True. Three new nodes added.",
        },
        {
          label: "Search 'car' — success",
          description:
            "Traverse root → c → a → r, following existing children at each step. After consuming all characters, check node_r.is_end — it is True. Return True: 'car' is in the trie.",
        },
        {
          label: "Search 'cap' — not found",
          description:
            "Traverse root → c → a. Now look for child 'p' in node_a.children — it does not exist. Return False immediately. No need to inspect the rest of the trie.",
        },
        {
          label: "starts_with('ca') — prefix query",
          description:
            "Traverse root → c → a. The node exists and we have consumed the full prefix. Return True — at least one word starting with 'ca' is stored. The subtree below 'a' holds 'cat', 'car', and 'card'.",
        },
        {
          label: "Delete 'car' — unmark, then prune",
          description:
            "Traverse to node 'r'. Clear is_end = False. Check if 'r' has children — it does ('d' for 'card'). So the node stays. If it had no children, we would remove it and recurse upward, pruning dead branches.",
        },
        {
          label: "Final State",
          description:
            "The trie holds 'cat', 'card', 'bat'. 'car' was deleted. Every insert/search/delete ran in O(m) time. The shared prefix 'ca' is stored in exactly two nodes, not duplicated across three separate string keys.",
        },
      ],
    },

    code: {
      language: "python",
      snippet: `class TrieNode:
    def __init__(self):
        self.children: dict[str, "TrieNode"] = {}
        self.is_end: bool = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def starts_with(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> TrieNode | None:
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def delete(self, word: str) -> bool:
        def _del(node: TrieNode, word: str, depth: int) -> bool:
            if depth == len(word):
                if not node.is_end:
                    return False
                node.is_end = False
                return len(node.children) == 0   # prune if leaf
            ch = word[depth]
            if ch not in node.children:
                return False
            should_delete = _del(node.children[ch], word, depth + 1)
            if should_delete:
                del node.children[ch]
                return not node.is_end and len(node.children) == 0
            return False
        return _del(self.root, word, 0)

    def autocomplete(self, prefix: str) -> list[str]:
        node = self._find_node(prefix)
        results: list[str] = []
        if node is None:
            return results
        def _dfs(cur: TrieNode, path: str) -> None:
            if cur.is_end:
                results.append(path)
            for ch, child in cur.children.items():
                _dfs(child, path + ch)
        _dfs(node, prefix)
        return results`,
      annotations: [
        {
          lines: [1, 2, 3, 4],
          note: "TrieNode stores a children dict (char → TrieNode) and an is_end flag. The dict uses only as many slots as distinct characters actually appear — no wasted space for a fixed-size alphabet array.",
        },
        {
          lines: [11, 12, 13, 14, 15, 16],
          note: "insert(): walk character by character, creating missing nodes on demand. After the loop, mark is_end = True. Time: O(m) where m = len(word). Space: O(m) new nodes in the worst case.",
        },
        {
          lines: [18, 19, 20, 21],
          note: "search(): delegates to _find_node for the traversal, then checks is_end. This cleanly separates 'does the path exist?' from 'is it a complete word?'.",
        },
        {
          lines: [26, 27, 28, 29, 30, 31],
          note: "_find_node(): shared helper for both search and starts_with. Returns the terminal node of the prefix, or None if any character is missing. O(m) time.",
        },
        {
          lines: [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
          note: "delete(): recursive post-order traversal. After clearing is_end, return True only when the node became a leaf — this tells the parent to prune the edge. Prevents deleting nodes still needed by other words.",
        },
        {
          lines: [45, 46, 47, 48, 49, 50, 51, 52, 53, 54],
          note: "autocomplete(): navigate to the prefix node, then DFS the subtree collecting every path that ends at an is_end node. Returns all words with the given prefix in O(m + k) where k = total characters in results.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Insert (key of length m)", value: "O(m)", color: "#CEEB5A" },
        { label: "Search (key of length m)", value: "O(m)", color: "#CEEB5A" },
        { label: "starts_with (prefix length m)", value: "O(m)", color: "#CEEB5A" },
        { label: "Delete (key of length m)", value: "O(m)", color: "#2255CC" },
        { label: "Autocomplete (prefix m, k results)", value: "O(m + k)", color: "#2255CC" },
      ],
      spaceRows: [
        { label: "Overall trie storage", value: "O(n · Σ)", color: "#2255CC" },
        { label: "Per insert (worst case)", value: "O(m)", color: "#2255CC" },
        { label: "Auxiliary (search/delete)", value: "O(m) stack", color: "#CEEB5A" },
      ],
      notes: [
        "n = number of stored keys, m = average key length, Σ = alphabet size. With a 26-letter alphabet and dict-based children, space is proportional to the total characters across all keys.",
        "Unlike hash maps, tries give O(m) worst-case search with no hash collision risk and no rehashing overhead.",
        "For dense alphabets (e.g., Unicode), replace the children dict with a hash map or compressed (Patricia) trie to avoid excessive memory use.",
      ],
    },

    variations: {
      items: [
        "Compressed Trie (Patricia Trie) — merges chains of single-child nodes into one edge labelled with the full substring; reduces space from O(n·m) to O(n) nodes.",
        "Ternary Search Trie (TST) — each node has three children (less, equal, greater) instead of a full alphabet map; balances memory and speed for large alphabets.",
        "Suffix Trie / Suffix Tree — inserts all suffixes of a string; enables O(m) substring search in any text, used in bioinformatics and full-text search.",
        "Bitwise Trie — stores integers bit by bit (32 or 64 levels); used for XOR-maximum queries and IP longest-prefix matching in routers.",
        "Aho-Corasick Automaton — augments a trie with failure links to enable simultaneous multi-pattern search in O(n + m + z) time, where z is the number of matches.",
      ],
      tips: [
        "Use a dict for children rather than a fixed-size array unless you know the alphabet is small and dense — dict saves memory for sparse character sets.",
        "Always check is_end after traversal in search(); a node existing for a prefix does not mean the full word was inserted (e.g., 'ca' node exists because 'cat' was inserted, but 'ca' itself may not be a word).",
        "For memory-critical applications, consider a compressed trie or store strings in a sorted array with binary search for starts_with — simpler and cache-friendlier for read-heavy workloads.",
        "When deleting, use the recursive post-order approach to prune dead branches bottom-up; iterative deletion requires an explicit parent stack and is error-prone.",
      ],
    },

    summary: {
      keyPoints: [
        "A Trie stores strings as paths in a tree — each node represents one character, and shared prefixes share nodes, eliminating redundant storage.",
        "Insert and search both run in O(m) time regardless of how many strings are stored — performance depends only on the key length, not the trie size.",
        "The is_end flag distinguishes complete words from mere prefixes — without it, 'ca' and 'cat' would be indistinguishable if both are valid keys.",
        "Prefix queries (starts_with, autocomplete) are a unique strength of tries — traverse to the prefix node then enumerate the subtree in O(m + k).",
        "Deletion requires post-order pruning: clear is_end, then remove the node only if it has no children and is not a prefix of another word.",
        "Tries power autocomplete, spell-checkers, IP routing (longest-prefix match), compiler symbol tables, and multi-pattern string matching (Aho-Corasick).",
      ],
    },
  },
}

export default function TrieVideo() {
  return <AlgoVideo config={config} />
}
