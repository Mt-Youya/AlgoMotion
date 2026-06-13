import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Linked List",
  subtitle: "Linear sequence of nodes each holding a value and pointer to the next.",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "What Problem Does a Linked List Solve?",
      body: [
        "Arrays have a fixed size and expensive insertions/deletions in the middle — shifting all subsequent elements costs O(n).",
        "A Linked List stores elements as individual nodes scattered in memory, each connected via a pointer to the next node.",
        "This allows O(1) insertions and deletions at the head (or at a known pointer position) without shifting any data.",
        "Trade-off: random access by index is O(n) because you must walk the chain from the head each time.",
        "Linked Lists are the foundation for stacks, queues, adjacency lists, and many other higher-level data structures.",
      ],
      callout:
        "Key insight: Linked Lists trade random-access speed for flexible, allocation-friendly insertions and deletions.",
    },

    intuition: {
      heading: "Think of a Chain of Paper Notes",
      body: [
        "Imagine writing a number on a sticky note and attaching a string to the next note — that string is the 'next pointer'.",
        "To find the 5th note you must follow the string from the 1st note, one by one — that is O(n) traversal.",
        "To insert a new note between note 2 and note 3, you simply redirect strings — no copying needed.",
        "The head pointer is your entry point; lose it and you lose the entire list.",
        "A NULL (None) pointer on the last node signals the end of the chain — analogous to the last note having no string attached.",
      ],
      analogy:
        "Real-world analogy: a treasure hunt where each clue tells you where the next clue is hidden. You start at clue #1 (head) and follow the trail until you reach 'THE END' (NULL).",
    },

    walkthrough: {
      steps: [
        {
          label: "Initial Empty List",
          description:
            "The list starts with head = None. There are no nodes; the list is empty. This is the base state before any insertion.",
        },
        {
          label: "Insert Node 10 at Head",
          description:
            "Create a new node with value 10. Set new_node.next = None (it will be the only node). Set head = new_node. List: 10 → NULL.",
        },
        {
          label: "Insert Node 20 at Head",
          description:
            "Create a node with value 20. Set new_node.next = head (points to node 10). Update head = new_node. List: 20 → 10 → NULL.",
        },
        {
          label: "Insert Node 30 at Head",
          description:
            "Create a node with value 30. Set new_node.next = head (points to 20). Update head = new_node. List: 30 → 20 → 10 → NULL.",
        },
        {
          label: "Traverse the List",
          description:
            "Set cur = head. Visit 30, move cur = cur.next. Visit 20, move cur = cur.next. Visit 10, move cur = cur.next. cur is None — traversal complete.",
        },
        {
          label: "Search for Value 20",
          description:
            "Start at head (30). 30 ≠ 20, move to next. 20 == 20, found! Return the node. Worst case: target is last or absent — O(n) comparisons.",
        },
        {
          label: "Insert 25 After Node 20",
          description:
            "Traverse to node 20. Create new_node(25). Set new_node.next = node_20.next (points to 10). Set node_20.next = new_node. List: 30 → 20 → 25 → 10 → NULL.",
        },
        {
          label: "Delete Node 20",
          description:
            "Traverse to the node before 20 (node 30). Set prev.next = target.next (skip over 20). Deallocate node 20. List: 30 → 25 → 10 → NULL. O(n) to find, O(1) to unlink.",
        },
        {
          label: "Reverse the List",
          description:
            "Use three pointers: prev=None, cur=head, next=None. In each step: save next = cur.next, set cur.next = prev, advance prev = cur and cur = next. When cur is None, head = prev.",
        },
        {
          label: "Find the Middle Node",
          description:
            "Use slow and fast pointers. slow moves one step, fast moves two steps per iteration. When fast reaches the end, slow is at the middle — Floyd's tortoise and hare trick.",
        },
        {
          label: "Detect a Cycle",
          description:
            "Again use slow/fast pointers. If fast ever equals slow (and neither is None), a cycle exists. If fast reaches None, the list is acyclic. This is O(n) time, O(1) space.",
        },
        {
          label: "Final State Summary",
          description:
            "A singly linked list supports O(1) head insertion/deletion, O(n) search, O(n) random access, and O(n) traversal. Space usage is O(n) — one node object per element.",
        },
      ],
    },

    code: {
      language: "python",
      snippet: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def prepend(self, val):
        node = Node(val)
        node.next = self.head
        self.head = node

    def append(self, val):
        node = Node(val)
        if not self.head:
            self.head = node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node

    def delete(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        cur = self.head
        while cur.next and cur.next.val != val:
            cur = cur.next
        if cur.next:
            cur.next = cur.next.next

    def search(self, val):
        cur = self.head
        while cur:
            if cur.val == val:
                return cur
            cur = cur.next
        return None

    def reverse(self):
        prev, cur = None, self.head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        self.head = prev

    def to_list(self):
        result, cur = [], self.head
        while cur:
            result.append(cur.val)
            cur = cur.next
        return result`,
      annotations: [
        {
          lines: [1, 2, 3, 4],
          note: "Node class: stores a value and a 'next' pointer (initially None). This is the atomic building block of the list.",
        },
        {
          lines: [10, 11, 12, 13],
          note: "prepend(): O(1) — create a new node, point it at the current head, then move head to the new node. No traversal needed.",
        },
        {
          lines: [15, 16, 17, 18, 19, 20, 21, 22],
          note: "append(): O(n) — must walk to the tail to attach the new node. If the list is empty, the new node becomes head.",
        },
        {
          lines: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
          note: "delete(): O(n) to find the predecessor, O(1) to unlink. Special-case when the target is the head node.",
        },
        {
          lines: [41, 42, 43, 44, 45, 46, 47, 48],
          note: "reverse(): classic three-pointer in-place reversal. prev tracks the new next, cur is the node being re-linked, nxt saves the old next before overwriting.",
        },
        {
          lines: [50, 51, 52, 53, 54, 55],
          note: "to_list(): utility for testing — walks the chain and collects values into a Python list. O(n) time and space.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Prepend (insert at head)", value: "O(1)", color: "#CEEB5A" },
        { label: "Append (insert at tail)", value: "O(n)", color: "#2255CC" },
        { label: "Delete by value", value: "O(n)", color: "#2255CC" },
        { label: "Search / Access by index", value: "O(n)", color: "#E05A3A" },
        { label: "Reverse", value: "O(n)", color: "#2255CC" },
      ],
      spaceRows: [
        { label: "Overall storage", value: "O(n)", color: "#2255CC" },
        { label: "Auxiliary (traversal)", value: "O(1)", color: "#CEEB5A" },
        { label: "Recursive reverse", value: "O(n) stack", color: "#E05A3A" },
      ],
      notes: [
        "Linked Lists beat arrays for frequent head insertions/deletions — O(1) vs O(n) shifting cost.",
        "Arrays beat Linked Lists for random access — O(1) index lookup vs O(n) traversal.",
        "Memory overhead: each node carries a pointer in addition to the data value — roughly 2× memory vs a plain array.",
      ],
    },

    variations: {
      items: [
        "Singly Linked List — each node has one 'next' pointer; simplest form, used in stacks and queues.",
        "Doubly Linked List — each node has 'next' and 'prev' pointers; enables O(1) deletion given a node reference.",
        "Circular Linked List — the tail's 'next' points back to the head; useful for round-robin scheduling.",
        "Skip List — multiple forward pointer layers enable O(log n) average search, a probabilistic alternative to balanced BSTs.",
        "XOR Linked List — stores XOR of prev and next addresses in a single pointer field, halving pointer memory at the cost of readability.",
      ],
      tips: [
        "Always handle the empty-list edge case (head == None) before traversal — it is the most common source of NullPointerExceptions.",
        "Use a dummy/sentinel head node to simplify insertion and deletion logic — eliminates special-casing for the head position.",
        "For problems involving the kth-from-end node or cycle detection, reach for the two-pointer (slow/fast) technique first.",
        "When converting a linked list problem to code in an interview, draw the pointer reassignment steps on paper before writing — one wrong reassignment order corrupts the list.",
      ],
    },

    summary: {
      keyPoints: [
        "A Linked List is a chain of nodes; each node holds a value and a pointer to the next node in the sequence.",
        "Prepending (inserting at the head) is O(1) — the core advantage over arrays for front-heavy workloads.",
        "Traversal, search, and appending are all O(n) because there is no direct index arithmetic — you must walk the chain.",
        "Deletion is O(n) to locate the predecessor, then O(1) to unlink — knowing a node's predecessor is key.",
        "The two-pointer (slow/fast) technique solves middle-finding, cycle detection, and kth-from-end in O(n) time and O(1) space.",
        "Linked Lists underpin stacks, queues, hash-table chaining, graph adjacency lists, and many OS/kernel data structures.",
      ],
    },
  },
}

export default function LinkedListVideo() {
  return <AlgoVideo config={config} />
}
