import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Huffman Coding",
  subtitle: "Build optimal prefix-free binary code by repeatedly merging two lowest-frequency symbols.",
  category: "greedy",
  difficulty: "advanced",

  chapters: {
    problem: {
      heading: "What is Huffman Coding?",
      bullets: [
        "Given a set of symbols and their frequencies (or probabilities), assign a binary code to each symbol such that more frequent symbols get shorter codes.",
        "The resulting code must be prefix-free: no code is a prefix of any other code, enabling unambiguous decoding without delimiters.",
        "Huffman Coding minimises the expected number of bits per symbol, achieving the lowest possible average code length for a given frequency distribution.",
        "The algorithm was invented by David A. Huffman in 1952 and remains the basis of lossless compression formats such as DEFLATE (used in ZIP and PNG) and JPEG.",
        "Input: an array of (symbol, frequency) pairs. Output: a mapping from each symbol to its unique binary codeword.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Treat each symbol as a leaf node with weight equal to its frequency. Build a binary tree bottom-up by repeatedly merging the two lightest nodes.",
        "The greedy choice — always merge the two nodes with the smallest frequencies — guarantees an optimal prefix-free code. Any other merge order produces a longer average code length.",
        "After every merge the new internal node's weight equals the sum of its children's weights, and it is inserted back into the priority queue.",
        "When only one node remains it becomes the root. A left traversal adds '0' to the code; a right traversal adds '1'. Leaf depth determines code length.",
        "Frequently occurring symbols end up near the root (short codes) and rare symbols end up deep in the tree (long codes), minimising total bits transmitted.",
      ],
      analogy:
        "Imagine a postal system where common destinations (e.g. New York) get short zip codes and rare destinations get long ones. The Huffman tree is the optimal 'zip code assignment' that minimises the total length of all addresses written in a day.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with six symbols and their frequencies: A=5, B=9, C=12, D=13, E=16, F=45.",
        },
        {
          step: 2,
          description:
            "Insert all symbols as leaf nodes into a min-priority queue ordered by frequency. Queue: [A:5, B:9, C:12, D:13, E:16, F:45].",
        },
        {
          step: 3,
          description:
            "Extract the two smallest nodes: A(5) and B(9). Create internal node AB with frequency 14. Queue: [C:12, D:13, AB:14, E:16, F:45].",
        },
        {
          step: 4,
          description:
            "Extract C(12) and D(13). Create internal node CD with frequency 25. Queue: [AB:14, E:16, CD:25, F:45].",
        },
        {
          step: 5,
          description:
            "Extract AB(14) and E(16). Create internal node ABE with frequency 30. Queue: [CD:25, ABE:30, F:45].",
        },
        {
          step: 6,
          description:
            "Extract CD(25) and ABE(30). Create internal node CDABE with frequency 55. Queue: [F:45, CDABE:55].",
        },
        {
          step: 7,
          description:
            "Extract F(45) and CDABE(55). Create root node with frequency 100. Queue is now empty — tree is complete.",
        },
        {
          step: 8,
          description:
            "Traverse the tree assigning codes: left edge = '0', right edge = '1'. F is the left child of root, so F gets code '0'.",
        },
        {
          step: 9,
          description:
            "Continue traversal. CDABE is right child of root. CD is left child of CDABE. C is left child of CD → C gets code '100'. D is right child of CD → D gets code '101'.",
        },
        {
          step: 10,
          description:
            "ABE is right child of CDABE. E is right child of ABE → E gets code '111'. AB is left child of ABE. A gets '1100', B gets '1101'.",
        },
        {
          step: 11,
          description:
            "Final code table: F→0 (1 bit), C→100 (3 bits), D→101 (3 bits), E→111 (3 bits), B→1101 (4 bits), A→1100 (4 bits).",
        },
        {
          step: 12,
          description:
            "Average code length = (45×1 + 12×3 + 13×3 + 16×3 + 9×4 + 5×4) / 100 = 2.24 bits/symbol — optimal for this distribution.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import heapq
from dataclasses import dataclass, field
from typing import Optional

@dataclass(order=True)
class HuffNode:
    freq: int
    symbol: Optional[str] = field(default=None, compare=False)
    left: Optional["HuffNode"] = field(default=None, compare=False)
    right: Optional["HuffNode"] = field(default=None, compare=False)

def build_huffman_tree(frequencies: dict[str, int]) -> HuffNode:
    heap = [HuffNode(freq=f, symbol=s) for s, f in frequencies.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        left = heapq.heappop(heap)
        right = heapq.heappop(heap)
        merged = HuffNode(freq=left.freq + right.freq, left=left, right=right)
        heapq.heappush(heap, merged)

    return heap[0]

def generate_codes(node: HuffNode, prefix: str = "", codes: dict = None) -> dict[str, str]:
    if codes is None:
        codes = {}
    if node.symbol is not None:          # leaf node
        codes[node.symbol] = prefix or "0"
    else:
        generate_codes(node.left,  prefix + "0", codes)
        generate_codes(node.right, prefix + "1", codes)
    return codes

def huffman_encode(text: str) -> tuple[str, dict[str, str]]:
    freq = {}
    for ch in text:
        freq[ch] = freq.get(ch, 0) + 1
    root = build_huffman_tree(freq)
    codes = generate_codes(root)
    encoded = "".join(codes[ch] for ch in text)
    return encoded, codes

# Example
if __name__ == "__main__":
    text = "abracadabra"
    encoded, codes = huffman_encode(text)
    print("Codes:", codes)
    print("Encoded:", encoded)
    print(f"Compression: {len(text)*8} bits → {len(encoded)} bits")
`,
      annotations: [
        {
          lines: [5, 6, 7, 8, 9],
          note: "HuffNode is a dataclass ordered by frequency so Python's heapq (min-heap) can compare nodes directly without a custom comparator.",
        },
        {
          lines: [11, 12, 13],
          note: "heapify converts the list of leaf nodes into a valid min-heap in O(n) time — more efficient than n individual insertions.",
        },
        {
          lines: [15, 16, 17, 18, 19],
          note: "The core greedy loop: extract the two minimum-frequency nodes, merge them into a new internal node, and push it back. Runs n-1 times for n symbols.",
        },
        {
          lines: [23, 24, 25, 26, 27],
          note: "Recursive DFS assigns codes by concatenating '0' for left branches and '1' for right branches. Only leaf nodes (non-None symbol) receive a final codeword.",
        },
        {
          lines: [29, 30, 31, 32, 33],
          note: "huffman_encode computes character frequencies, builds the tree, generates codes, and returns both the bit-string and the code dictionary.",
        },
        {
          lines: [36, 37, 38, 39, 40],
          note: "The example demonstrates real compression: 'abracadabra' (88 bits at 8 bits/char) encodes to far fewer bits using Huffman codes.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          notation: "O(n log n)",
          explanation:
            "All n symbols require one heapify pass (O(n)) plus n-1 extract-min and insert operations on the heap (O(log n) each).",
        },
        {
          case: "Average",
          notation: "O(n log n)",
          explanation:
            "Regardless of frequency distribution the algorithm always performs exactly n-1 merges, each costing O(log n) heap operations.",
        },
        {
          case: "Worst",
          notation: "O(n log n)",
          explanation:
            "Worst case is identical to average — the heap operations dominate and are bounded by O(log n) per merge for n symbols.",
        },
      ],
      spaceRows: [
        {
          type: "Tree nodes",
          notation: "O(n)",
          explanation:
            "The Huffman tree has exactly 2n-1 nodes: n leaves (one per symbol) and n-1 internal nodes created during merges.",
        },
        {
          type: "Code table",
          notation: "O(n · L)",
          explanation:
            "Storing the generated codewords requires O(n · L) space where L is the maximum code length (at most n-1 bits for a skewed tree).",
        },
      ],
      insights: [
        "Huffman Coding achieves the optimal average code length among all prefix-free codes for a given symbol distribution — it reaches the entropy lower bound H(X) ≤ L < H(X) + 1.",
        "For n symbols with equal frequencies, all codes have the same length ⌈log₂ n⌉, which equals standard fixed-length encoding — Huffman adds no overhead in this degenerate case.",
        "Adaptive Huffman Coding (FGK algorithm) updates the tree dynamically as symbols are read, enabling single-pass compression without prior frequency knowledge.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Canonical Huffman Code",
          description:
            "Reorders codewords of the same length numerically, enabling the decoder to reconstruct the entire code table from just the list of code lengths — used in DEFLATE (ZIP/PNG/gzip).",
        },
        {
          name: "Adaptive Huffman Coding (FGK / Vitter)",
          description:
            "Updates the Huffman tree on-the-fly as each symbol is encoded, requiring only one pass over the data. Useful when the full frequency distribution is unknown in advance.",
        },
        {
          name: "Length-Limited Huffman Coding",
          description:
            "Constrains the maximum code length to a fixed limit (e.g. 15 bits in DEFLATE). The Package-Merge algorithm solves this variant in O(nL) time where L is the length limit.",
        },
        {
          name: "n-ary Huffman Coding",
          description:
            "Generalises to trees where each internal node has up to n children instead of 2. Each merge combines n nodes and each edge label is a digit in base n.",
        },
        {
          name: "Arithmetic Coding",
          description:
            "A more powerful alternative that approaches the true entropy limit (fractional bits per symbol) at the cost of higher computational complexity. Often used alongside Huffman in modern codecs.",
        },
      ],
      tips: [
        "Always sort or heapify the frequency list before starting — the greedy correctness proof depends on always merging the globally smallest two nodes.",
        "For single-symbol alphabets, handle the edge case explicitly: the single leaf gets code '0' instead of an empty string.",
        "In production compression pipelines, transmit the code table (or just code lengths for canonical form) as a header before the encoded data so the decoder can reconstruct the tree.",
        "Profile your frequency table on representative data before deployment — a Huffman tree trained on English text performs poorly on binary data or other languages.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Huffman Coding is a greedy algorithm that builds an optimal prefix-free binary code by repeatedly merging the two lowest-frequency nodes from a min-priority queue.",
        "The resulting tree assigns shorter codewords to more frequent symbols, minimising the expected bits per symbol for a given frequency distribution.",
        "The algorithm runs in O(n log n) time and uses O(n) space for the tree, making it practical for large alphabets.",
        "It is provably optimal among all prefix-free codes: no other assignment of variable-length prefix-free codes can achieve a shorter average code length.",
        "Huffman Coding underpins real-world compression formats including DEFLATE (ZIP, PNG, gzip), JPEG, and MP3.",
        "Canonical Huffman Coding, which normalises codewords of the same length, is the variant actually used in most compression standards because it allows compact transmission of the code table.",
      ],
    },
  },
}

export default function HuffmanCodingVideo() {
  return <AlgoVideo config={config} />
}
