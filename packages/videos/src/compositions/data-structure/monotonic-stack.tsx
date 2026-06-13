import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Monotonic Stack",
  subtitle: "Stack maintaining monotonic sequence for next greater/smaller element in O(n).",
  category: "data-structure",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Find Next Greater / Smaller Elements for Every Position in Linear Time",
      body: [
        "Given an array, the classic brute-force approach to finding the Next Greater Element (NGE) for each position is O(n²): for every element, scan rightward until a larger one is found. A Monotonic Stack reduces this to O(n).",
        "A Monotonic Stack is a regular stack with one invariant: elements inside are always kept in a strictly increasing or strictly decreasing order from bottom to top. Whenever that invariant would be violated by a new push, elements are popped first.",
        "A Monotonic Decreasing Stack (bottom large → top small) is used to find the Next Greater Element: when a new value arrives that is larger than the stack top, the top 'found its answer' and is popped.",
        "A Monotonic Increasing Stack (bottom small → top large) is used to find the Next Smaller Element: when a new value arrives that is smaller than the stack top, the top has found its answer.",
        "The key insight is that each element is pushed exactly once and popped at most once, so the total number of operations across all iterations is O(n), giving linear time complexity despite the nested-looking while loop.",
      ],
      callout:
        "The Monotonic Stack converts an O(n²) 'nearest greater/smaller' scan into O(n) by ensuring each element is processed at most twice — once on push and once on pop.",
    },

    intuition: {
      heading: "Imagine a Queue of People Waiting to See Over a Crowd",
      body: [
        "Picture a line of people of different heights standing in a row. Each person wants to know: who is the first taller person standing to my right? A brute-force approach has each person look right one by one — O(n) per person.",
        "The monotonic stack approach works like a 'waiting list': as you scan left to right, you maintain a stack of people who haven't yet found a taller person ahead of them.",
        "When a new (taller) person arrives, everyone on the waiting list who is shorter immediately knows their answer — the new arrival is their 'next greater'. They leave the list.",
        "People who are taller than the new arrival stay on the list, still waiting. The list always remains in decreasing order of height from bottom to top.",
        "At the end of the scan, anyone still on the list never found a taller person — their answer is -1 (no next greater element exists).",
      ],
      analogy:
        "Think of a cinema queue where people want to know the first person taller than them who is ahead in line. As you walk down the queue from back to front, you maintain a 'pending list' of people still looking. Each time you encounter a tall person, everyone shorter on the pending list immediately gets their answer and leaves. The pending list always stays sorted shortest-to-tallest from front to back — that's the monotonic invariant.",
    },

    walkthrough: {
      steps: [
        {
          label: "Input: arr = [2, 1, 5, 3, 6, 4, 8, 7]",
          description:
            "We want to find the Next Greater Element (NGE) for every index. Initialize an empty stack and a result array NGE = [-1, -1, -1, -1, -1, -1, -1, -1]. We will scan left to right.",
        },
        {
          label: "i=0, arr[0]=2 — push index 0",
          description:
            "Stack is empty, so push index 0 (value 2). Stack (indices): [0]. Stack (values): [2]. No element was popped, so no NGE assigned yet. NGE = [-1, -1, -1, -1, -1, -1, -1, -1].",
        },
        {
          label: "i=1, arr[1]=1 — push index 1",
          description:
            "arr[1]=1 is not greater than the stack top value arr[0]=2, so no pop. Push index 1. Stack (values): [2, 1]. The invariant holds — decreasing from bottom to top. NGE unchanged.",
        },
        {
          label: "i=2, arr[2]=5 — pop 1 and 2, push 2",
          description:
            "arr[2]=5 > stack top arr[1]=1, so pop index 1: NGE[1] = 5. Now arr[2]=5 > new top arr[0]=2, so pop index 0: NGE[0] = 5. Stack is empty, push index 2. Stack (values): [5]. NGE = [5, 5, -1, -1, -1, -1, -1, -1].",
        },
        {
          label: "i=3, arr[3]=3 — push index 3",
          description:
            "arr[3]=3 < stack top arr[2]=5, so no pop. Push index 3. Stack (values): [5, 3]. Decreasing invariant maintained. NGE = [5, 5, -1, -1, -1, -1, -1, -1].",
        },
        {
          label: "i=4, arr[4]=6 — pop 3 and 5, push 4",
          description:
            "arr[4]=6 > arr[3]=3, pop index 3: NGE[3] = 6. arr[4]=6 > arr[2]=5, pop index 2: NGE[2] = 6. Stack empty, push index 4. Stack (values): [6]. NGE = [5, 5, 6, 6, -1, -1, -1, -1].",
        },
        {
          label: "i=5, arr[5]=4 — push index 5",
          description:
            "arr[5]=4 < stack top arr[4]=6, no pop. Push index 5. Stack (values): [6, 4]. NGE = [5, 5, 6, 6, -1, -1, -1, -1].",
        },
        {
          label: "i=6, arr[6]=8 — pop 4 and 6, push 6",
          description:
            "arr[6]=8 > arr[5]=4, pop index 5: NGE[5] = 8. arr[6]=8 > arr[4]=6, pop index 4: NGE[4] = 8. Stack empty, push index 6. Stack (values): [8]. NGE = [5, 5, 6, 6, 8, 8, -1, -1].",
        },
        {
          label: "i=7, arr[7]=7 — push index 7",
          description:
            "arr[7]=7 < stack top arr[6]=8, no pop. Push index 7. Stack (values): [8, 7]. NGE = [5, 5, 6, 6, 8, 8, -1, -1].",
        },
        {
          label: "End of array — drain remaining stack",
          description:
            "Scan complete. Indices still on the stack (6 and 7) never found a greater element to their right. Their NGE stays -1. Pop both. Stack is now empty.",
        },
        {
          label: "Final Result",
          description:
            "NGE = [5, 5, 6, 6, 8, 8, -1, -1]. Each element now knows the first value to its right that is strictly greater than it. Total operations: 8 pushes + 6 pops = 14 = O(n). No element was processed more than twice.",
        },
      ],
    },

    code: {
      snippet: `def next_greater_element(arr):
    """Return NGE array where NGE[i] = first element to the
    right of arr[i] that is strictly greater, or -1 if none."""
    n = len(arr)
    result = [-1] * n
    stack = []  # stores indices (monotonic decreasing by value)

    for i in range(n):
        # While stack is non-empty and current value is greater
        # than the value at the stack's top index, pop and assign.
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)

    # Remaining indices in stack have no greater element → -1
    # (result was already initialised to -1, nothing to do)
    return result


def next_smaller_element(arr):
    """Monotonic increasing stack variant for Next Smaller Element."""
    n = len(arr)
    result = [-1] * n
    stack = []  # stores indices (monotonic increasing by value)

    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)

    return result


# Example
arr = [2, 1, 5, 3, 6, 4, 8, 7]
print(next_greater_element(arr))   # [5, 5, 6, 6, 8, 8, -1, -1]
print(next_smaller_element(arr))   # [1, -1, 3, -1, 4, -1, 7, -1]`,
      language: "python",
      annotations: [
        {
          lines: [5],
          note: "result is pre-filled with -1. Elements that are never popped (no greater element found) automatically keep -1 — no extra cleanup loop needed at the end.",
        },
        {
          lines: [6],
          note: "The stack stores indices, not values. Storing indices lets us write back to result[idx] and also look up arr[idx] for comparisons. This is a common pattern.",
        },
        {
          lines: [9, 10, 11, 12],
          note: "The while loop pops every index whose value is smaller than arr[i]. For each popped index, arr[i] is the answer. The loop may run 0 to n times total across all iterations, but the amortised cost is O(1) per element.",
        },
        {
          lines: [13],
          note: "After popping, push the current index. The stack always maintains a decreasing sequence of values from bottom to top — the monotonic decreasing invariant.",
        },
        {
          lines: [22, 23, 24, 25, 26, 27, 28],
          note: "The Next Smaller Element variant flips the comparison to arr[stack[-1]] > arr[i], maintaining a monotonic increasing stack instead. The rest of the structure is identical.",
        },
        {
          lines: [34, 35],
          note: "Both functions run in O(n) time and O(n) space. The space is used by the stack (at most n indices) and the result array (n elements).",
        },
      ],
    },

    complexity: {
      timeRows: [
        { label: "Best case", value: "O(n)", color: "green" },
        { label: "Average case", value: "O(n)", color: "green" },
        { label: "Worst case", value: "O(n)", color: "green" },
        { label: "Brute-force NGE", value: "O(n²)", color: "red" },
      ],
      spaceRows: [
        { label: "Stack storage", value: "O(n)", color: "yellow" },
        { label: "Result array", value: "O(n)", color: "yellow" },
        { label: "Auxiliary (per op)", value: "O(1)", color: "green" },
      ],
      notes: [
        "The O(n) time bound holds in all cases because each element is pushed onto the stack exactly once and popped at most once. The while loop's total iterations across the entire pass is bounded by n, not n per outer iteration.",
        "The worst case for the stack size is O(n) — a strictly decreasing array causes every element to be pushed and none to be popped until the very end (e.g., [5, 4, 3, 2, 1]).",
        "Compared to the brute-force O(n²) approach, the monotonic stack achieves a dramatic speedup for large inputs: for n=10,000, brute-force does ~50 million comparisons while the stack does ~20,000.",
      ],
    },

    variations: {
      items: [
        "Next Greater Element II (Circular Array): wrap the array by iterating 2n times with index modulo n. The stack still processes each logical position at most twice, keeping O(n) time.",
        "Largest Rectangle in Histogram: use a monotonic increasing stack of bar indices. When a shorter bar is encountered, pop and compute rectangle areas using the popped bar as height. Classic O(n) solution to LeetCode 84.",
        "Trapping Rain Water: use a monotonic decreasing stack to find left and right boundaries for water trapped above each bar. Alternative to the two-pointer approach (LeetCode 42).",
        "Daily Temperatures: direct application of NGE — find for each day the number of days until a warmer temperature. Stack stores indices; answer is i - popped_index (LeetCode 739).",
        "Sliding Window Maximum (Monotonic Deque): extend the idea to a double-ended queue (deque) to maintain the maximum within a sliding window of size k in O(n), supporting both front and back operations.",
      ],
      tips: [
        "When a problem asks for 'the first element to the left/right that is greater/smaller', immediately think Monotonic Stack. This pattern appears in dozens of interview problems.",
        "Store indices in the stack, not values. You almost always need both the index (to write results) and the value (for comparisons), and arr[index] gives you the value for free.",
        "For 'previous greater/smaller element', scan right to left instead of left to right — the same stack logic applies in reverse.",
        "A Monotonic Deque (double-ended queue) extends the pattern to sliding-window problems where you need both push-back and pop-front in O(1). It is the natural next step after mastering the monotonic stack.",
      ],
    },

    summary: {
      keyPoints: [
        "A Monotonic Stack enforces a sorted invariant (increasing or decreasing) by popping violating elements before each push. This transforms O(n²) nearest-element problems into O(n).",
        "The O(n) time bound comes from the amortised analysis: each of the n elements is pushed exactly once and popped at most once, so total stack operations ≤ 2n regardless of input.",
        "Use a Monotonic Decreasing Stack for Next Greater Element problems; use a Monotonic Increasing Stack for Next Smaller Element problems. The only difference is the comparison direction.",
        "Always store indices in the stack, not values. The index lets you write back to the result array and compute distances (e.g., number of days until warmer temperature).",
        "Key interview problems powered by this pattern: Daily Temperatures (LC 739), Largest Rectangle in Histogram (LC 84), Trapping Rain Water (LC 42), Next Greater Element I/II (LC 496/503).",
        "The Monotonic Deque extends this idea to sliding-window maximum/minimum problems, enabling O(n) solutions where a naive approach would be O(nk).",
      ],
      nextSteps: [
        "Practice: LeetCode 739 (Daily Temperatures), 496 (Next Greater Element I), 503 (Next Greater Element II — circular), 84 (Largest Rectangle in Histogram), 42 (Trapping Rain Water).",
        "Study the Monotonic Deque next for sliding-window problems, then explore how monotonic stacks appear in advanced DP optimisations (e.g., optimising convex-hull trick transitions).",
      ],
    },
  },
}

export default function MonotonicStackVideo() {
  return <AlgoVideo config={config} />
}
