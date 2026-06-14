import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Interval Scheduling",
  subtitle: "Find minimum machines needed to schedule all intervals without overlap.",
  category: "greedy",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a list of intervals, each with a start time and an end time.",
        "Multiple intervals can overlap — they cannot run on the same machine simultaneously.",
        "A machine can only process one interval at a time.",
        "Goal: assign every interval to a machine using the fewest machines possible.",
        "This is equivalent to finding the maximum number of simultaneously active intervals.",
      ],
    },

    intuition: {
      heading: "Greedy Intuition",
      bullets: [
        "Sort all intervals by their start time so we process them in chronological order.",
        "Maintain a min-heap of the earliest end time across all active machines.",
        "When a new interval arrives, check if any machine has already finished (heap top ≤ start).",
        "If yes, reuse that machine by updating its end time in the heap.",
        "If no machine is free, allocate a new machine and push the end time onto the heap.",
        "The heap size at any point equals the number of machines currently in use.",
      ],
      analogy:
        "Think of a hotel check-in desk: each room is a machine. When a guest arrives, the clerk checks if any room is vacant (earliest checkout ≤ arrival). If yes, assign that room; otherwise open a new room. The minimum rooms needed equals the peak simultaneous occupancy.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          description: "Start with intervals: A[0,3], B[1,4], C[3,6], D[2,5], E[5,7], F[4,8].",
        },
        {
          description: "Sort by start time → A[0,3], B[1,4], D[2,5], C[3,6], F[4,8], E[5,7].",
        },
        {
          description: "Process A[0,3]: heap is empty → allocate Machine 1. Heap: [3]. Machines used: 1.",
        },
        {
          description:
            "Process B[1,4]: heap top is 3 > 1 → no free machine → allocate Machine 2. Heap: [3, 4]. Machines used: 2.",
        },
        {
          description:
            "Process D[2,5]: heap top is 3 > 2 → no free machine → allocate Machine 3. Heap: [3, 4, 5]. Machines used: 3.",
        },
        {
          description:
            "Process C[3,6]: heap top is 3 ≤ 3 → Machine 1 is free! Reuse it. Pop 3, push 6. Heap: [4, 5, 6]. Machines: still 3.",
        },
        {
          description:
            "Process F[4,8]: heap top is 4 ≤ 4 → Machine 2 is free. Reuse it. Pop 4, push 8. Heap: [5, 6, 8]. Machines: still 3.",
        },
        {
          description:
            "Process E[5,7]: heap top is 5 ≤ 5 → Machine 3 is free. Reuse it. Pop 5, push 7. Heap: [6, 7, 8]. Machines: still 3.",
        },
        {
          description: "All intervals assigned. Final heap: [6, 7, 8]. Maximum heap size reached was 3.",
        },
        {
          description: "Answer: 3 machines are required. This matches the peak overlap (A, B, D all active at time 2).",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `import heapq

def min_machines(intervals):
    """
    Returns the minimum number of machines needed
    to schedule all intervals without conflict.
    Time:  O(n log n)
    Space: O(n)
    """
    if not intervals:
        return 0

    # Sort intervals by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap: stores end times of active machines
    heap = []
    machines = 0

    for start, end in intervals:
        if heap and heap[0] <= start:
            # A machine finished before this interval starts
            heapq.heapreplace(heap, end)
        else:
            # No free machine — allocate a new one
            heapq.heappush(heap, end)
            machines += 1

    return machines


# Example usage
intervals = [(0, 3), (1, 4), (3, 6), (2, 5), (5, 7), (4, 8)]
print(min_machines(intervals))  # Output: 3
`,
      annotations: [
        {
          lines: [12, 13],
          note: "Sorting by start time is the critical first step — it ensures we always process the earliest-starting interval next, enabling correct greedy decisions.",
        },
        {
          lines: [15, 16],
          note: "The min-heap stores end times. The smallest value at heap[0] tells us which machine becomes free soonest.",
        },
        {
          lines: [19, 20],
          note: "heap[0] <= start means the earliest-ending machine finishes before the new interval begins — safe to reuse it. heapreplace pops and pushes atomically in O(log n).",
        },
        {
          lines: [22, 23, 24],
          note: "No machine is free, so we must open a new one. Increment the machine counter and push the new end time.",
        },
        {
          lines: [26],
          note: "The variable 'machines' tracks the maximum number of simultaneously active machines seen so far — that is the answer.",
        },
      ],
    },

    complexity: {
      heading: "Time & Space Complexity",
      timeRows: [
        { label: "Best Case", value: "O(n log n)", note: "Sorting dominates even when no overlaps exist." },
        { label: "Average Case", value: "O(n log n)", note: "Each heap push/pop is O(log n) over n intervals." },
        {
          label: "Worst Case",
          value: "O(n log n)",
          note: "All intervals overlap — heap grows to size n, each operation O(log n).",
        },
      ],
      spaceRows: [
        {
          label: "Heap",
          value: "O(n)",
          note: "In the worst case all intervals overlap and all end times are in the heap.",
        },
        {
          label: "Sorted Input",
          value: "O(1) extra",
          note: "Sorting in-place uses O(1) additional space (Python's Timsort uses O(n) internally).",
        },
      ],
      insights: [
        "The peak heap size at any moment equals the number of concurrently active machines — this is exactly the answer.",
        "An equivalent approach: sort events by time, use a sweep line counting +1 at starts and -1 at ends; the maximum running total equals the answer.",
        "heapq.heapreplace is preferred over heappop + heappush because it avoids an unnecessary sift-up, saving a constant factor.",
      ],
    },

    variations: {
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Interval Scheduling Maximization",
          description:
            "Select the maximum number of non-overlapping intervals that fit on a single machine. Sort by end time and greedily pick the earliest-ending compatible interval.",
        },
        {
          name: "Weighted Job Scheduling",
          description:
            "Each interval has a profit. Maximize total profit of selected non-overlapping intervals. Requires dynamic programming with binary search — O(n log n).",
        },
        {
          name: "Meeting Rooms I",
          description:
            "Determine if a single machine can handle all intervals without overlap. Simply check if any two sorted intervals overlap.",
        },
        {
          name: "Meeting Rooms II",
          description:
            "Exactly this problem — find the minimum number of conference rooms for all meetings. The classic LeetCode 253 formulation.",
        },
        {
          name: "Task Scheduling with Cooldown",
          description:
            "CPU scheduling where the same task must wait k time units between executions. Uses a greedy frequency-first approach with a priority queue.",
        },
      ],
      tips: [
        "Always sort by start time when assigning to machines (minimizing machines); sort by end time when maximizing the count of non-overlapping intervals on one machine.",
        "The sweep-line approach (count events) is easier to reason about for correctness proofs; the heap approach is more efficient in practice.",
        "When intervals share endpoints (e.g., [0,3] and [3,6]), clarify whether they conflict. In this implementation ≤ means they do NOT conflict.",
        "For online scheduling (intervals arrive in real time), the heap approach works without modification — just skip the sort step.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Sort intervals by start time, then greedily assign each to the earliest-ending free machine using a min-heap.",
        "The minimum machines needed equals the maximum number of intervals active at any single moment in time.",
        "Time complexity is O(n log n) dominated by sorting; each heap operation is O(log n) for n intervals.",
        "Space complexity is O(n) for the heap in the worst case when all intervals overlap.",
        "The same heap pattern appears in many scheduling problems: meeting rooms, CPU task scheduling, and resource allocation.",
        "An equivalent sweep-line solution increments a counter at each start event and decrements at each end event; the peak counter value is the answer.",
      ],
    },
  },
}

export default function IntervalSchedulingVideo() {
  return <AlgoVideo config={config} />
}
