import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Stack",
  subtitle: "Last-In-First-Out collection supporting push and pop in O(1).",
  category: "data-structure",
  difficulty: "beginner",

  chapters: {
    problem: {
      heading: "A Container Where the Last Item In Is the First Item Out",
      body: [
        "A Stack is a linear data structure that stores elements in a strict Last-In-First-Out (LIFO) order — the most recently added element is always the first one removed.",
        "The two fundamental operations are push(x), which places element x on top of the stack, and pop(), which removes and returns the element currently on top.",
        "A third common operation, peek() (also called top()), reads the top element without removing it, letting you inspect the stack without modifying it.",
        "isEmpty() returns true when the stack contains no elements; attempting to pop from an empty stack is called a stack underflow — a common error to guard against.",
        "Stacks are used everywhere in computing: the CPU maintains a call stack for function calls, compilers use stacks to parse expressions, and editors use stacks to implement undo/redo history.",
      ],
      callout:
        "All core stack operations — push, pop, and peek — run in O(1) time, making the stack one of the most efficient data structures for LIFO access patterns.",
    },

    intuition: {
      heading: "Think of a Stack of Plates",
      body: [
        "Visualise a stack of plates in a cafeteria: you always place a new plate on top, and you always take the top plate when you need one — you never pull from the middle or bottom.",
        "The LIFO property means the stack 'remembers' the reverse order of insertions: the last thing pushed is the first thing you get back when you pop.",
        "Because all activity happens at one end (the top), there is no need to shift other elements — both push and pop are O(1) regardless of how many items are already in the stack.",
        "An array-backed stack keeps a single integer index (top) that points to the most recently pushed element; advancing and retreating that index is all push and pop need to do.",
        "A linked-list-backed stack prepends new nodes at the head for push and removes the head for pop — again O(1) with no traversal needed.",
      ],
      analogy:
        "Think of a spring-loaded plate dispenser in a buffet line. Plates are loaded from the top, and customers always take the top plate. The spring (the top pointer) automatically adjusts as plates are added or removed. No matter how many plates are in the dispenser, grabbing or adding one plate always takes the same amount of effort.",
    },

    walkthrough: {
      steps: [
        {
          label: "Empty Stack",
          description:
            "We start with an empty stack. The internal array is [] and top = -1. isEmpty() returns true. No elements are available to pop or peek.",
        },
        {
          label: "push(10)",
          description:
            "We push 10. top advances from -1 to 0. The array becomes [10]. The stack now contains one element. peek() would return 10.",
        },
        {
          label: "push(20)",
          description:
            "We push 20. top advances to 1. The array is now [10, 20]. Element 20 sits on top of 10. peek() returns 20.",
        },
        {
          label: "push(30)",
          description:
            "We push 30. top = 2. Array: [10, 20, 30]. The stack has three elements. The bottom element (10) has not moved since it was first pushed.",
        },
        {
          label: "push(40)",
          description:
            "We push 40. top = 3. Array: [10, 20, 30, 40]. Element 40 is now on top. This is the last element pushed, so it will be the first to be popped.",
        },
        {
          label: "peek()",
          description:
            "We call peek(). It returns array[top] = array[3] = 40. The stack is unchanged — top is still 3 and the array is still [10, 20, 30, 40]. Peek is a read-only operation.",
        },
        {
          label: "pop() → 40",
          description:
            "We call pop(). It reads array[top] = 40, decrements top from 3 to 2, and returns 40. Array is logically [10, 20, 30] now. LIFO confirmed: 40 was pushed last and popped first.",
        },
        {
          label: "pop() → 30",
          description:
            "We call pop() again. Returns array[top] = array[2] = 30. top decrements to 1. Stack is now [10, 20]. The elements come out in reverse push order: 40, then 30.",
        },
        {
          label: "push(99)",
          description:
            "We push 99. top advances from 1 to 2. Array: [10, 20, 99]. Notice that 99 occupies the same slot that 30 previously used. The stack does not care about history — only the current top matters.",
        },
        {
          label: "pop() → 99",
          description:
            "pop() returns 99. top = 1. Stack: [10, 20]. The interleaving of pushes and pops is handled correctly — the stack always reflects the current LIFO state.",
        },
        {
          label: "pop() → 20, pop() → 10",
          description:
            "Two more pops drain the stack. pop() returns 20 (top=0), then pop() returns 10 (top=-1). The stack is now empty again. isEmpty() returns true.",
        },
        {
          label: "Stack Underflow Guard",
          description:
            "Calling pop() on an empty stack (top == -1) is an error. A well-implemented stack raises an exception or returns a sentinel value. Always check isEmpty() before popping in production code.",
        },
      ],
    },

    code: {
      snippet: `class Stack:
    def __init__(self):
        self._data = []

    def push(self, value):
        self._data.append(value)

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return self._data.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("peek at empty stack")
        return self._data[-1]

    def is_empty(self) -> bool:
        return len(self._data) == 0

    def size(self) -> int:
        return len(self._data)

    def __repr__(self) -> str:
        return f"Stack({self._data})"


# Example usage
s = Stack()
s.push(10)
s.push(20)
s.push(30)
print(s.peek())   # 30
print(s.pop())    # 30
print(s.pop())    # 20
print(s.size())   # 1`,
      language: "python",
      annotations: [
        {
          lines: [2],
          note: "_data is a plain Python list used as the backing store. All stack operations delegate to list methods, so no custom memory management is needed.",
        },
        {
          lines: [4, 5],
          note: "push() calls list.append(), which amortises to O(1). Python's list over-allocates capacity, so most appends do not trigger a resize.",
        },
        {
          lines: [7, 8, 9],
          note: "pop() guards against underflow with an explicit is_empty() check before calling list.pop(). list.pop() with no argument removes and returns the last element in O(1).",
        },
        {
          lines: [11, 12, 13],
          note: "peek() uses negative indexing (_data[-1]) to read the last element without removing it. This is O(1) and does not disturb the stack.",
        },
        {
          lines: [15, 16],
          note: "is_empty() compares len() to 0. len() on a Python list is O(1) because the list stores its length as an attribute.",
        },
        {
          lines: [18, 19],
          note: "size() exposes the number of elements. Useful when callers need to know stack depth without popping, for example when limiting recursion depth or balancing brackets.",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "push(x)", value: "O(1)", color: "green" },
        { label: "pop()", value: "O(1)", color: "green" },
        { label: "peek()", value: "O(1)", color: "green" },
        { label: "isEmpty()", value: "O(1)", color: "green" },
        { label: "Search (arbitrary)", value: "O(n)", color: "yellow" },
      ],
      spaceRows: [
        { label: "Stack storage", value: "O(n)", color: "yellow" },
        { label: "Auxiliary (per op)", value: "O(1)", color: "green" },
      ],
      notes: [
        "All primary operations (push, pop, peek) are O(1) because they only touch the single top element — no shifting or traversal required.",
        "The O(n) space is unavoidable: you must store the n elements currently in the stack. There is no sub-linear space implementation for a general-purpose stack.",
        "Array-backed stacks may trigger occasional O(n) resizes when the backing array is full, but the amortised cost per push remains O(1) over a sequence of n pushes.",
      ],
    },

    variations: {
      items: [
        "Min Stack: augment each slot with the current minimum so getMin() runs in O(1). Used in problems like 'Min Stack' (LeetCode 155).",
        "Two Stacks in One Array: split a single array into two stacks growing from opposite ends, maximising memory utilisation when one stack is small and the other is large.",
        "Stack using Two Queues: implement stack semantics with two FIFO queues. push is O(1) but pop is O(n), or vice versa depending on which operation you optimise.",
        "Monotonic Stack: maintain a stack where elements are always in increasing (or decreasing) order. Used to solve 'next greater element', 'largest rectangle in histogram', and similar problems in O(n).",
        "Persistent Stack: a functional/immutable stack where each push or pop produces a new version without modifying the previous one. Built with linked lists sharing common tails.",
      ],
      tips: [
        "When a problem asks about the 'most recent' or 'last seen' element, or requires reversing a sequence, a stack is almost always the right tool.",
        "Use a monotonic stack when you need to find the nearest greater or smaller element for every position in an array — it reduces brute-force O(n²) solutions to O(n).",
        "For recursive algorithms, consider replacing the call stack with an explicit stack to avoid stack-overflow errors on deeply nested inputs.",
        "Always guard pop() and peek() with an isEmpty() check, or use a try/except block, to prevent runtime errors on empty stacks.",
      ],
    },

    summary: {
      keyPoints: [
        "A Stack enforces LIFO (Last-In-First-Out) order: the most recently pushed element is always the first to be popped.",
        "push(), pop(), and peek() all run in O(1) time because they operate exclusively on the top of the stack — no element shifting is needed.",
        "Python's built-in list is an excellent stack backing store: append() for push and pop() (no argument) for pop, both amortised O(1).",
        "Guard against stack underflow by checking isEmpty() before pop() or peek(); underflow is a common source of runtime errors.",
        "Stacks underpin many algorithms: DFS graph traversal, balanced-bracket checking, expression parsing, undo/redo systems, and the CPU call stack itself.",
        "The monotonic stack pattern extends the basic stack to solve 'nearest greater/smaller element' problems in linear time — a powerful interview technique.",
      ],
      nextSteps: [
        "Practice: LeetCode 20 (Valid Parentheses), 155 (Min Stack), 739 (Daily Temperatures), 84 (Largest Rectangle in Histogram).",
        "Study the Queue data structure next — FIFO counterpart to the stack — and then the Deque, which supports O(1) operations at both ends.",
      ],
    },
  },
}

export default function StackVideo() {
  return <AlgoVideo config={config} />
}
