import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Jump Game",
  subtitle: "Determine if you can reach the last index given jump lengths.",
  category: "dynamic-programming",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given an integer array nums, you are initially positioned at index 0.",
        "Each element nums[i] represents the maximum number of steps you can jump forward from index i.",
        "Return true if you can reach the last index, or false if it is impossible.",
        "Example: nums = [2, 3, 1, 1, 4] → true (jump 1 step to index 1, then 3 steps to the last index).",
        "Example: nums = [3, 2, 1, 0, 4] → false (index 3 always has value 0, blocking all paths to index 4).",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Instead of simulating every possible path, track the farthest index reachable at any point.",
        "If you can reach index i, you can also reach any index up to i + nums[i].",
        "Iterate left to right; if the current index exceeds max_reach, it is unreachable — return false.",
        "If max_reach ever reaches or passes the last index, return true immediately.",
        "This greedy insight reduces the problem from exponential path enumeration to a single O(n) scan.",
      ],
      analogy:
        "Imagine you are crossing a series of stepping stones in a river. Each stone tells you how far you can leap. You keep track of the farthest stone you could possibly land on. If you ever find yourself standing on a stone that is beyond your running best, you have fallen in — the far bank is unreachable.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start at index 0. Initialize max_reach = 0.",
          values: [2, 3, 1, 1, 4],
          colors: ["yellow", "gray", "gray", "gray", "gray"],
        },
        {
          step: 2,
          description: "i=0: i (0) ≤ max_reach (0). Update max_reach = max(0, 0+2) = 2.",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "blue", "blue", "gray", "gray"],
        },
        {
          step: 3,
          description: "i=1: i (1) ≤ max_reach (2). Update max_reach = max(2, 1+3) = 4.",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "green", "blue", "blue", "blue"],
        },
        {
          step: 4,
          description: "i=2: i (2) ≤ max_reach (4). Update max_reach = max(4, 2+1) = 4. No change.",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "green", "green", "blue", "blue"],
        },
        {
          step: 5,
          description: "i=3: i (3) ≤ max_reach (4). Update max_reach = max(4, 3+1) = 4. No change.",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "green", "green", "green", "blue"],
        },
        {
          step: 6,
          description: "i=4: i (4) ≤ max_reach (4). We reached the last index!",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "green", "green", "green", "green"],
        },
        {
          step: 7,
          description: "Return true — the last index is reachable.",
          values: [2, 3, 1, 1, 4],
          colors: ["green", "green", "green", "green", "yellow"],
        },
        {
          step: 8,
          description: "Counter-example: nums = [3, 2, 1, 0, 4]. max_reach after i=0 is 3.",
          values: [3, 2, 1, 0, 4],
          colors: ["green", "blue", "blue", "blue", "gray"],
        },
        {
          step: 9,
          description: "At i=3, nums[3]=0. max_reach = max(3, 3+0) = 3. Stuck at 3.",
          values: [3, 2, 1, 0, 4],
          colors: ["green", "green", "green", "red", "gray"],
        },
        {
          step: 10,
          description: "i=4 > max_reach=3. Index 4 is unreachable. Return false.",
          values: [3, 2, 1, 0, 4],
          colors: ["green", "green", "green", "red", "red"],
        },
        {
          step: 11,
          description:
            "The zero at index 3 acts as a wall — no jump from any earlier index can skip over it to reach index 4.",
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def can_jump(nums: list[int]) -> bool:
    """
    Greedy approach: track the farthest reachable index.
    Time: O(n)  Space: O(1)
    """
    max_reach = 0
    n = len(nums)

    for i in range(n):
        # If current index is beyond what we can reach, it's impossible
        if i > max_reach:
            return False

        # Extend the farthest reachable index
        max_reach = max(max_reach, i + nums[i])

        # Early exit: already reached or passed the last index
        if max_reach >= n - 1:
            return True

    return True


# --- Examples ---
print(can_jump([2, 3, 1, 1, 4]))   # True
print(can_jump([3, 2, 1, 0, 4]))   # False
print(can_jump([0]))               # True  (already at last index)
print(can_jump([1, 0, 1, 0]))      # False (stuck at index 1)
print(can_jump([2, 0, 0]))         # True  (jump 2 from index 0)`,
      annotations: [
        {
          lines: [6],
          note: "max_reach tracks the farthest index reachable from any previously visited position. Initialized to 0 (we start at index 0).",
        },
        {
          lines: [9, 10, 11],
          note: "If i exceeds max_reach, this index was never reachable — no path from index 0 can get here. Return false immediately.",
        },
        {
          lines: [14],
          note: "Update max_reach greedily. i + nums[i] is the farthest we can reach from position i. We take the maximum over all visited positions.",
        },
        {
          lines: [17, 18],
          note: "Optional early exit: once max_reach covers the last index, we know it is reachable without finishing the loop.",
        },
        {
          lines: [21],
          note: "If the loop completes without returning false, every index was reachable and we can reach the end. Return true.",
        },
        {
          lines: [24, 25, 26, 27],
          note: "Edge cases: single-element array is trivially true; a zero at index 0 means you are already at the last index if n=1, otherwise false.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      time: [
        {
          case: "Best",
          notation: "O(1)",
          note: "nums[0] ≥ n-1: the first element alone covers the entire array.",
        },
        {
          case: "Average",
          notation: "O(n)",
          note: "Single left-to-right pass over the array, updating max_reach at each step.",
        },
        {
          case: "Worst",
          notation: "O(n)",
          note: "Must visit every index before determining reachability (e.g., all ones).",
        },
      ],
      space: [
        {
          case: "Auxiliary",
          notation: "O(1)",
          note: "Only one integer variable (max_reach) is maintained regardless of input size.",
        },
        {
          case: "Input",
          notation: "O(n)",
          note: "The input array itself; not counted as extra space in standard analysis.",
        },
      ],
      insights: [
        "The greedy solution is strictly better than DP in both time and space: O(n) / O(1) vs O(n) / O(n).",
        "A DP boolean array dp[i] = 'can reach index i' also works but wastes O(n) space unnecessarily.",
        "The key insight — tracking a single scalar max_reach — is a common pattern in interval and jump problems.",
      ],
    },

    variations: {
      heading: "Variations & Related Problems",
      items: [
        {
          name: "Jump Game II (Minimum Jumps)",
          description:
            "Find the minimum number of jumps to reach the last index. Extend the greedy: track current jump boundary and farthest reach, increment jump count when you cross the boundary.",
        },
        {
          name: "Jump Game III (Reach Zero)",
          description:
            "From index i you can jump to i + nums[i] or i - nums[i]. Determine if you can reach any index with value 0. Solved with BFS or DFS.",
        },
        {
          name: "Jump Game IV (Minimum Jumps with Same Value)",
          description:
            "From index i, jump to i±1 or any index j where nums[j] == nums[i]. BFS with a graph of same-value indices gives O(n) solution.",
        },
        {
          name: "Jump Game VII (Reachable Indices in Range)",
          description:
            "Each position has a range [minJump, maxJump]. Use a sliding-window prefix-sum to decide reachability in O(n).",
        },
        {
          name: "Video Stitching / Interval Cover",
          description:
            "A structural twin: given clips covering [start, end], find the minimum number of clips to cover [0, T]. Same greedy max-reach logic applied to intervals.",
        },
      ],
      tips: [
        "Always check the single-element edge case: if n == 1, return true immediately — you are already at the last index.",
        "A zero in the array is only a blocker if no earlier index can jump over it; max_reach handles this automatically.",
        "For Jump Game II, resist the urge to BFS — the two-pointer greedy is O(n) and avoids the O(n) queue overhead.",
        "When the problem asks for reachability (not a count), greedy max-reach almost always beats DP in practice.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      points: [
        "Jump Game asks whether the last index is reachable; the answer hinges on whether any index has value 0 that cannot be bypassed.",
        "The optimal greedy strategy tracks max_reach — the farthest index reachable from any visited position.",
        "A single O(n) pass with O(1) space is sufficient; no DP table or recursion is needed.",
        "If at any index i > max_reach, that index is a dead zone — return false immediately.",
        "The same greedy framework extends to Jump Game II (minimum jumps) and interval-covering problems.",
        "Recognizing the 'farthest reachable point' pattern unlocks a whole family of greedy array problems.",
      ],
    },
  },
}

export default function JumpGameVideo() {
  return <AlgoVideo config={config} />
}
