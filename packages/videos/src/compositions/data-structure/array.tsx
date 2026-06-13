import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Array",
  subtitle: "Contiguous memory block with O(1) random access by index.",
  category: "data-structure",
  difficulty: "beginner",
  chapters: {
    problem: {
      heading: "What Is an Array?",
      body: [
        "An array is the most fundamental data structure: a fixed-size, ordered collection of elements stored in contiguous memory.",
        "Every element occupies the same amount of memory (e.g. 4 bytes for a 32-bit integer), so the address of any element can be computed instantly.",
        "Elements are accessed by a zero-based integer index — arr[0] is the first element, arr[n-1] is the last.",
        "Because memory is contiguous, CPUs can exploit cache locality: reading one element often pre-loads neighbouring elements into the cache line.",
        "Arrays underpin nearly every other data structure: stacks, queues, heaps, hash tables, and dynamic arrays all build on top of the raw array concept.",
      ],
      callout:
        "Arrays trade flexibility (fixed size, costly mid-insertion) for speed (O(1) read/write by index). Understanding this tradeoff is the first step in algorithm design.",
    },
    intuition: {
      heading: "Think of a Row of Numbered Mailboxes",
      body: [
        "Imagine a hallway with N mailboxes numbered 0 to N-1. Each box is the same size and they sit side by side with no gaps.",
        "To read box 42 you walk straight to position 42 — you never need to check boxes 0 through 41 first. That is O(1) random access.",
        "Adding a new mailbox at the end of the hallway is easy — just extend the hallway by one slot.",
        "But inserting a new box in the middle requires physically sliding every box to the right of the insertion point one position further — that is O(n) work.",
        "Removing a box from the middle similarly requires sliding all boxes to its right one position to the left to close the gap.",
      ],
      analogy:
        "A row of numbered parking spaces: you can drive straight to space 7 without checking 1-6 first. But adding a space in the middle forces you to renumber and move every car behind it.",
    },
    walkthrough: {
      steps: [
        {
          label: "Allocate the array",
          description:
            "Request a contiguous block of memory large enough for N elements. The OS returns a base address. No elements are initialised yet.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
            { value: 0, color: "#DDE4F0" },
          ],
        },
        {
          label: "Write elements",
          description:
            "Assign values to each index. arr[0]=12, arr[1]=7, arr[2]=45, arr[3]=3, arr[4]=28, arr[5]=9. Each write is O(1).",
          array: [
            { value: 12, color: "#CEEB5A" },
            { value: 7, color: "#CEEB5A" },
            { value: 45, color: "#CEEB5A" },
            { value: 3, color: "#CEEB5A" },
            { value: 28, color: "#CEEB5A" },
            { value: 9, color: "#CEEB5A" },
          ],
        },
        {
          label: "Random access: arr[3]",
          description:
            "Compute address = base + 3 × 4 bytes. Jump directly to that memory location and read the value 3. No iteration needed — pure O(1).",
          array: [
            { value: 12, color: "#DDE4F0" },
            { value: 7, color: "#DDE4F0" },
            { value: 45, color: "#DDE4F0" },
            { value: 3, color: "#E05A3A" },
            { value: 28, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
          ],
        },
        {
          label: "Sequential traversal",
          description:
            "Walk through every element from index 0 to n-1. This is O(n) and benefits from cache locality — each cache-line fetch loads multiple adjacent elements at once.",
          array: [
            { value: 12, color: "#2255CC" },
            { value: 7, color: "#2255CC" },
            { value: 45, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 28, color: "#2255CC" },
            { value: 9, color: "#2255CC" },
          ],
        },
        {
          label: "Update in place: arr[2] = 99",
          description:
            "Overwrite the element at index 2. Compute the address, write the new value. O(1) — no shifting required.",
          array: [
            { value: 12, color: "#DDE4F0" },
            { value: 7, color: "#DDE4F0" },
            { value: 99, color: "#CEEB5A" },
            { value: 3, color: "#DDE4F0" },
            { value: 28, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
          ],
        },
        {
          label: "Insert at end",
          description:
            "If the array has spare capacity, place the new element at index n and increment the length counter. O(1) amortised for dynamic arrays.",
          array: [
            { value: 12, color: "#DDE4F0" },
            { value: 7, color: "#DDE4F0" },
            { value: 99, color: "#DDE4F0" },
            { value: 3, color: "#DDE4F0" },
            { value: 28, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 55, color: "#CEEB5A" },
          ],
        },
        {
          label: "Insert in the middle: index 2",
          description:
            "To insert at index 2, first shift every element from index 2 onwards one position to the right (O(n) moves), then write the new value at index 2.",
          array: [
            { value: 12, color: "#DDE4F0" },
            { value: 7, color: "#DDE4F0" },
            { value: 42, color: "#E05A3A" },
            { value: 99, color: "#DDE4F0" },
            { value: 3, color: "#DDE4F0" },
            { value: 28, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
          ],
        },
        {
          label: "Delete from the middle: index 1",
          description:
            "Remove the element at index 1 by shifting every element from index 2 onwards one position to the left (O(n) moves), then decrement the length.",
          array: [
            { value: 12, color: "#DDE4F0" },
            { value: 99, color: "#DDE4F0" },
            { value: 3, color: "#DDE4F0" },
            { value: 28, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
          ],
        },
        {
          label: "Search (unsorted): linear scan",
          description:
            "Without any ordering guarantee, finding a value requires checking each element one by one — O(n) in the worst case.",
          array: [
            { value: 12, color: "#2255CC" },
            { value: 99, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 28, color: "#E05A3A" },
            { value: 9, color: "#DDE4F0" },
          ],
        },
        {
          label: "Search (sorted): binary search",
          description:
            "If the array is sorted, binary search halves the search space each step — O(log n). The array's O(1) random access makes binary search possible.",
          array: [
            { value: 3, color: "#DDE4F0" },
            { value: 9, color: "#DDE4F0" },
            { value: 12, color: "#2255CC" },
            { value: 28, color: "#CEEB5A" },
            { value: 99, color: "#DDE4F0" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `class DynamicArray:
    """A growable array backed by a fixed-size Python list."""

    def __init__(self) -> None:
        self._capacity = 4
        self._size = 0
        self._data = [None] * self._capacity

    def __len__(self) -> int:
        return self._size

    def __getitem__(self, index: int):
        if not 0 <= index < self._size:
            raise IndexError("index out of range")
        return self._data[index]          # O(1) random access

    def __setitem__(self, index: int, value) -> None:
        if not 0 <= index < self._size:
            raise IndexError("index out of range")
        self._data[index] = value         # O(1) update

    def append(self, value) -> None:
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        self._data[self._size] = value
        self._size += 1                   # O(1) amortised

    def insert(self, index: int, value) -> None:
        if self._size == self._capacity:
            self._resize(self._capacity * 2)
        for i in range(self._size, index, -1):
            self._data[i] = self._data[i - 1]  # shift right O(n)
        self._data[index] = value
        self._size += 1

    def delete(self, index: int) -> None:
        for i in range(index, self._size - 1):
            self._data[i] = self._data[i + 1]  # shift left O(n)
        self._data[self._size - 1] = None
        self._size -= 1

    def _resize(self, new_capacity: int) -> None:
        new_data = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = new_capacity`,
      annotations: [
        {
          lines: [1, 2, 3, 4, 5, 6],
          note: "The backing store is a fixed-size list. We track capacity (allocated slots) and size (used slots) separately to support O(1) amortised appends.",
        },
        {
          lines: [12, 13, 14],
          note: "__getitem__ is O(1): compute the memory offset and return the value directly. No loop, no searching.",
        },
        {
          lines: [19, 20, 21, 22, 23],
          note: "append() is O(1) amortised. When the backing store is full we double its capacity — this doubling strategy ensures each element is moved at most twice on average.",
        },
        {
          lines: [25, 26, 27, 28, 29, 30],
          note: "insert() at an arbitrary index is O(n): every element from index to the end must be shifted one position to the right to make room.",
        },
        {
          lines: [32, 33, 34, 35, 36],
          note: "delete() is O(n): every element after the deleted position must be shifted one position to the left to close the gap.",
        },
        {
          lines: [38, 39, 40, 41, 42],
          note: "_resize() copies all n elements to a new backing store — O(n). Because we double capacity each time, resizes are rare and the amortised cost per append is O(1).",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Access by index", value: "O(1)", color: "#CEEB5A" },
        { label: "Search (unsorted)", value: "O(n)", color: "#2255CC" },
        { label: "Search (sorted, binary)", value: "O(log n)", color: "#2255CC" },
        { label: "Insert at end (amortised)", value: "O(1)", color: "#CEEB5A" },
        { label: "Insert at middle/start", value: "O(n)", color: "#E05A3A" },
        { label: "Delete at end", value: "O(1)", color: "#CEEB5A" },
        { label: "Delete at middle/start", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Storage", value: "O(n)", color: "#2255CC" },
        { label: "Extra (in-place ops)", value: "O(1)", color: "#CEEB5A" },
      ],
      notes: [
        "O(1) random access is the defining advantage of arrays over linked lists, which require O(n) traversal to reach index k.",
        "Dynamic arrays (Python list, Java ArrayList, C++ vector) amortise the resize cost by doubling capacity, giving O(1) amortised append.",
        "Cache locality is a hidden constant-factor benefit: sequential array traversal is often 5-10× faster than linked-list traversal in practice due to CPU prefetching.",
      ],
    },
    variations: {
      items: [
        "Static array: fixed size set at allocation time; no resize overhead; used in embedded systems and performance-critical code (C arrays, Java primitive arrays).",
        "Dynamic array: automatically resizes when full; Python list, C++ std::vector, Java ArrayList all implement this pattern with O(1) amortised append.",
        "Circular buffer (ring buffer): treats the array as circular; O(1) enqueue and dequeue at both ends; used in producer-consumer queues and streaming buffers.",
        "Multi-dimensional array: 2-D matrix stored as a 1-D array in row-major (C) or column-major (Fortran/NumPy) order; enables O(1) element access via row × cols + col formula.",
        "Sparse array: when most values are a default (e.g. 0), store only non-default values in a hash map keyed by index; saves memory at the cost of O(1) average vs guaranteed O(1) access.",
      ],
      tips: [
        "Prefer arrays over linked lists when you need frequent random access or cache-friendly sequential scans — the constant factor matters enormously in practice.",
        "When inserting or deleting from the front frequently, consider a deque (double-ended queue) or circular buffer instead of shifting the entire array each time.",
        "Pre-allocate with a known size when possible. Repeated doubling is efficient on average, but a single large allocation avoids multiple resize copies.",
        "For sorted arrays, always consider binary search before reaching for a hash map — O(log n) with zero extra space often beats O(1) average with significant memory overhead.",
      ],
    },
    summary: {
      keyPoints: [
        "Arrays store elements in a contiguous memory block, enabling O(1) random access by computing base + index × element_size directly.",
        "Sequential traversal is cache-friendly: the CPU prefetches adjacent elements, making array scans significantly faster than linked-list traversal in practice.",
        "Insertion and deletion in the middle are O(n) due to the required element shifting — this is the main cost of contiguous storage.",
        "Dynamic arrays amortise the resize cost by doubling capacity, giving O(1) amortised append while maintaining O(1) random access.",
        "Sorted arrays unlock O(log n) binary search — a powerful combination when reads dominate writes.",
        "Arrays are the foundation of nearly every other data structure: stacks, queues, heaps, hash tables, and matrices all build on top of the raw array primitive.",
      ],
    },
  },
}

export default function ArrayVideo() {
  return <AlgoVideo config={config} />
}
