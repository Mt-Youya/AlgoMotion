import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video";

const config: AlgoVideoConfig = {
  title: "Activity Selection",
  subtitle:
    "Select maximum non-overlapping activities by always picking earliest finish time.",
  category: "greedy",
  difficulty: "intermediate",

  chapters: [
    {
      type: "problem",
      heading: "What Is the Activity Selection Problem?",
      bullets: [
        "You are given n activities, each with a start time s[i] and a finish time f[i].",
        "Two activities i and j are compatible if their time intervals do not overlap: f[i] ≤ s[j] or f[j] ≤ s[i].",
        "The goal is to select the maximum-size subset of mutually compatible activities.",
        "This is a classic scheduling problem that appears in resource allocation, CPU scheduling, and event planning.",
        "Brute force would check all 2^n subsets; the greedy approach solves it in O(n log n).",
      ],
    },
    {
      type: "intuition",
      heading: "Why Always Pick the Earliest Finish Time?",
      bullets: [
        "By choosing the activity that finishes earliest, we leave the maximum remaining time for future activities.",
        "Any other choice — e.g., picking the shortest or earliest-start activity — can lead to a suboptimal result.",
        "This greedy choice is provably optimal: the activity with the smallest finish time is always part of some optimal solution.",
        "Think of it as a 'least commitment' strategy: finish what you started as soon as possible.",
        "Real-world analogy: A conference room scheduler books the meeting that ends soonest, freeing the room for the next group.",
      ],
      analogy:
        "Imagine you manage a single conference room. Requests come in for various time slots. You always approve the meeting that ends earliest — this guarantees the room is free as soon as possible, letting you fit in the most meetings throughout the day.",
    },
    {
      type: "walkthrough",
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description:
            "Start with unsorted activities: A(1,3), B(2,5), C(4,6), D(6,7), E(5,8), F(8,9).",
          detail: "Each activity is represented as (start, finish).",
        },
        {
          step: 2,
          description:
            "Sort all activities by their finish time in ascending order.",
          detail:
            "Sorted order: A(1,3), B(2,5), C(4,6), D(6,7), E(5,8), F(8,9).",
        },
        {
          step: 3,
          description:
            "Initialize: select the first activity A(1,3). Set last_finish = 3.",
          detail: "Selected = [A]. The first activity is always chosen.",
        },
        {
          step: 4,
          description:
            "Consider B(2,5): start=2 < last_finish=3 → SKIP. B overlaps with A.",
          detail: "Selected = [A]. last_finish remains 3.",
        },
        {
          step: 5,
          description:
            "Consider C(4,6): start=4 ≥ last_finish=3 → SELECT. Update last_finish = 6.",
          detail: "Selected = [A, C]. C starts after A ends.",
        },
        {
          step: 6,
          description:
            "Consider D(6,7): start=6 ≥ last_finish=6 → SELECT. Update last_finish = 7.",
          detail: "Selected = [A, C, D]. D starts exactly when C ends — valid.",
        },
        {
          step: 7,
          description:
            "Consider E(5,8): start=5 < last_finish=7 → SKIP. E overlaps with D.",
          detail: "Selected = [A, C, D]. last_finish remains 7.",
        },
        {
          step: 8,
          description:
            "Consider F(8,9): start=8 ≥ last_finish=7 → SELECT. Update last_finish = 9.",
          detail: "Selected = [A, C, D, F]. F starts after D ends.",
        },
        {
          step: 9,
          description: "No more activities. Algorithm terminates.",
          detail:
            "Final selected set: {A, C, D, F} — 4 activities, which is the maximum possible.",
        },
        {
          step: 10,
          description:
            "Verify: A(1,3), C(4,6), D(6,7), F(8,9) — none overlap. Result is optimal.",
          detail:
            "The greedy choice of earliest finish time guarantees the globally optimal solution.",
        },
      ],
    },
    {
      type: "code",
      heading: "Python Implementation",
      language: "python",
      code: `def activity_selection(activities):
    """
    Select maximum number of non-overlapping activities.

    Args:
        activities: list of (start, finish) tuples
    Returns:
        list of selected (start, finish) tuples
    """
    if not activities:
        return []

    # Sort by finish time (greedy criterion)
    sorted_acts = sorted(activities, key=lambda x: x[1])

    selected = [sorted_acts[0]]
    last_finish = sorted_acts[0][1]

    for start, finish in sorted_acts[1:]:
        # Compatible if start >= last selected finish
        if start >= last_finish:
            selected.append((start, finish))
            last_finish = finish

    return selected


# Example usage
activities = [(1,3), (2,5), (4,6), (6,7), (5,8), (8,9)]
result = activity_selection(activities)
print(f"Selected {len(result)} activities: {result}")
# Output: Selected 4 activities: [(1,3), (4,6), (6,7), (8,9)]`,
      annotations: [
        {
          lines: [10, 11],
          note: "Sorting by finish time is the key greedy step — O(n log n) dominates overall complexity.",
        },
        {
          lines: [13, 14],
          note: "Always select the first activity after sorting; it has the earliest finish time.",
        },
        {
          lines: [16, 17],
          note: "Iterate through remaining activities in sorted order.",
        },
        {
          lines: [18, 19, 20, 21],
          note: "The compatibility check: an activity is selectable only if it starts at or after the last selected activity finishes.",
        },
        {
          lines: [23, 24],
          note: "Update last_finish to the finish time of the newly selected activity.",
        },
        {
          lines: [27, 28],
          note: "Return the list of selected activities. Total time: O(n log n). Space: O(n) for sorted copy.",
        },
      ],
    },
    {
      type: "complexity",
      heading: "Time & Space Complexity",
      timeRows: [
        {
          case: "Best",
          complexity: "O(n log n)",
          note: "Sorting always takes O(n log n) regardless of input.",
        },
        {
          case: "Average",
          complexity: "O(n log n)",
          note: "Dominated by the sort step; linear scan is O(n).",
        },
        {
          case: "Worst",
          complexity: "O(n log n)",
          note: "Even if all activities overlap, we still sort and scan all n.",
        },
      ],
      spaceRows: [
        {
          type: "Input",
          complexity: "O(n)",
          note: "Storage for the activity list.",
        },
        {
          type: "Auxiliary",
          complexity: "O(n)",
          note: "Sorted copy of activities and the selected list.",
        },
      ],
      insights: [
        "The O(n log n) bound is tight — sorting cannot be avoided without additional assumptions about the input.",
        "If activities are pre-sorted by finish time, the algorithm runs in O(n) time.",
        "The greedy approach is optimal and requires no dynamic programming or backtracking.",
      ],
    },
    {
      type: "variations",
      heading: "Variations & Extensions",
      variations: [
        {
          name: "Weighted Activity Selection",
          description:
            "Each activity has a weight/profit. Maximize total weight of selected activities. Requires dynamic programming — O(n log n) with binary search.",
        },
        {
          name: "k-Machine Scheduling",
          description:
            "Schedule activities across k machines (rooms). Use a min-heap of size k to track the earliest-finishing machine. O(n log k).",
        },
        {
          name: "Activity Selection with Deadlines",
          description:
            "Each activity must complete by a deadline. Sort by deadline and use a greedy or DP approach depending on whether weights are uniform.",
        },
        {
          name: "Interval Graph Coloring",
          description:
            "Find the minimum number of machines needed to schedule all activities. Equivalent to finding the maximum clique in the interval overlap graph.",
        },
        {
          name: "Online Activity Selection",
          description:
            "Activities arrive one at a time and decisions are irrevocable. Competitive analysis shows greedy achieves a 2-approximation ratio.",
        },
      ],
      tips: [
        "Always sort by finish time — not start time, not duration. This is the only greedy criterion that guarantees optimality.",
        "When implementing, use >= for the compatibility check (start >= last_finish) to allow back-to-back activities.",
        "For weighted variants, switch to DP with binary search (similar to Longest Increasing Subsequence structure).",
        "Pre-sorting the input is the single most impactful optimization — if your data arrives sorted, you get a free O(n) algorithm.",
      ],
    },
    {
      type: "summary",
      heading: "Key Takeaways",
      takeaways: [
        "Activity Selection is the canonical example of a greedy algorithm that is provably optimal.",
        "The greedy choice — always pick the activity with the earliest finish time — maximizes remaining schedule space.",
        "Sorting by finish time takes O(n log n); the subsequent linear scan is O(n), giving O(n log n) overall.",
        "Two activities are compatible if and only if one finishes before or exactly when the other starts (f[i] ≤ s[j]).",
        "The weighted variant breaks greedy optimality and requires O(n log n) dynamic programming.",
        "This pattern generalizes to interval scheduling, resource allocation, and many real-world optimization problems.",
      ],
    },
  ],
};

export default function ActivitySelectionVideo() {
  return <AlgoVideo config={config} />;
}
