import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Trapping Rain Water",
  subtitle: "Uses two pointers tracking left/right maximums to compute the total water trapped between bars in O(",
  category: "two-pointers",
  difficulty: "intermediate",
  chapters: {
    problem: {
      heading: "How Much Water Can the Histogram Hold?",
      body: [
        "Given an array of non-negative integers where each element represents the height of a bar in a histogram, compute the total amount of water that can be trapped between the bars after it rains.",
        "Water is trapped when a bar is surrounded by taller bars on both its left and right sides — the water level at any position equals the minimum of the tallest bar to its left and the tallest bar to its right.",
        "For example, heights = [0,1,0,2,1,0,1,3,1,0,1,2] traps exactly 6 units of water in the valleys between the bars.",
        "The challenge is computing this efficiently — a naive O(n²) approach rescans the array for each bar, but we can achieve O(n) time with O(1) extra space using two pointers.",
        "This is a classic interview problem that tests understanding of space-time tradeoffs and the two-pointer technique.",
      ],
      callout:
        "Key insight: water[i] = min(max_left[i], max_right[i]) - height[i]. The two-pointer approach computes this without storing the full prefix-max arrays.",
    },
    intuition: {
      heading: "The Left/Right Maximum Boundary Insight",
      body: [
        "At any bar i, the water level is determined by the shorter of the two surrounding walls: min(maxLeft, maxRight) - height[i].",
        "If we know the left maximum is smaller, we can safely compute the water contribution of the left pointer without knowing the exact right maximum — because whatever the right max is, it's at least as tall as the current left max.",
        "This is the core two-pointer insight: when height[left] <= height[right], the water at left is fully determined by lmax (not rmax), so we can process and advance the left pointer.",
        "Symmetrically, when height[right] < height[left], the water at right is fully determined by rmax, so we advance the right pointer.",
        "The two pointers converge from both ends toward the middle, processing each bar exactly once in a single O(n) pass.",
      ],
      analogy:
        "Imagine two people standing at opposite ends of a valley, each tracking the highest wall they've seen on their side. The person standing next to the shorter wall can always calculate exactly how much water sits above them — their water level is capped by their own side's maximum, not the far side. They step inward, and the process repeats until the two people meet.",
    },
    walkthrough: {
      steps: [
        {
          label: "Initial State",
          description:
            "Heights = [0,1,0,2,1,0,1,3,1,0,1,2]. Place left pointer at index 0, right pointer at index 11. Initialize lmax=0, rmax=0, water=0.",
          array: [
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
          ],
        },
        {
          label: "Step 1: Process Left Pointer (index 0)",
          description:
            "height[0]=0 <= height[11]=2. Since height[0]=0 >= lmax=0, update lmax=0. No water added. Advance left to 1.",
          array: [
            { value: 0, color: "#F0A030" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#CC55AA" },
          ],
        },
        {
          label: "Step 2: Process Left Pointer (index 1)",
          description:
            "height[1]=1 <= height[11]=2. height[1]=1 >= lmax=0, so update lmax=1. No water trapped here. Advance left to 2.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#F0A030" },
            { value: 0, color: "#2255CC" },
            { value: 2, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#CC55AA" },
          ],
        },
        {
          label: "Step 3: Trap Water at Index 2",
          description:
            "height[2]=0 <= height[11]=2. height[2]=0 < lmax=1. Water += lmax - height[2] = 1 - 0 = 1. Total water = 1. Advance left to 3.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#CC55AA" },
          ],
        },
        {
          label: "Step 4: Update lmax at Index 3",
          description:
            "height[3]=2 <= height[11]=2. height[3]=2 >= lmax=1, so update lmax=2. No water trapped (bar is a new left maximum). Advance left to 4.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#CC55AA" },
          ],
        },
        {
          label: "Steps 5–7: Trap Water at Indices 4, 5, 6",
          description:
            "height[4]=1, height[5]=0, height[6]=1 all < lmax=2. Water += (2-1) + (2-0) + (2-1) = 1+2+1 = 4. Running total = 1+4 = 5.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 2, color: "#CC55AA" },
          ],
        },
        {
          label: "Right Side: Process Index 11 → 10 → 9",
          description:
            "height[11]=2 sets rmax=2. height[10]=1 < rmax → water += 1. height[9]=0 < rmax → water += 2. Right pointer advances inward.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#CEEB5A" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 3, color: "#2255CC" },
            { value: 1, color: "#2255CC" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 2, color: "#DDE4F0" },
          ],
        },
        {
          label: "Pointers Converge at Index 7",
          description:
            "height[7]=3 is the global maximum. Both lmax and rmax are updated. The two pointers meet here. No water is trapped at the peak itself.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#DDE4F0" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 3, color: "#CEEB5A" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 2, color: "#DDE4F0" },
          ],
        },
        {
          label: "Final Result: 6 Units of Water",
          description:
            "All bars processed in a single O(n) pass. Total trapped water = 6. The two-pointer approach used O(1) extra space — no auxiliary arrays needed.",
          array: [
            { value: 0, color: "#DDE4F0" },
            { value: 1, color: "#DDE4F0" },
            { value: 0, color: "#5BA4CF" },
            { value: 2, color: "#DDE4F0" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 3, color: "#CEEB5A" },
            { value: 1, color: "#5BA4CF" },
            { value: 0, color: "#5BA4CF" },
            { value: 1, color: "#5BA4CF" },
            { value: 2, color: "#DDE4F0" },
          ],
        },
      ],
    },
    code: {
      language: "python",
      snippet: `def trap(height: list[int]) -> int:
    """
    Compute total water trapped using two pointers.

    Time:  O(n) — single pass, each element visited once
    Space: O(1) — only four integer variables used

    Args:
        height: list of non-negative bar heights
    Returns:
        total units of water trapped
    """
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0

    while left < right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]   # new left boundary
            else:
                water += left_max - height[left]  # trap water
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]  # new right boundary
            else:
                water += right_max - height[right]  # trap water
            right -= 1

    return water


# Example
heights = [0, 1, 0, 2, 1, 0, 1, 3, 1, 0, 1, 2]
print(trap(heights))  # Output: 6`,
      annotations: [
        {
          lines: [1],
          note: "Single function accepting a list of non-negative integers. Returns the total trapped water as an integer.",
        },
        {
          lines: [13, 14, 15, 16],
          note: "Initialize four variables: two pointers at the ends of the array, two running maximums, and the water accumulator. All O(1) space.",
        },
        {
          lines: [18, 19],
          note: "The main loop runs while the two pointers haven't met. Each iteration advances exactly one pointer, so the loop runs at most n times total.",
        },
        {
          lines: [20, 21, 22, 23, 24],
          note: "Left branch: height[left] <= height[right] means the left side is the bottleneck. If left is a new max, update lmax. Otherwise, water is trapped: lmax - height[left].",
        },
        {
          lines: [26, 27, 28, 29, 30],
          note: "Right branch: symmetric to the left. height[right] is the bottleneck. Update rmax or accumulate trapped water on the right side.",
        },
        {
          lines: [33, 34, 35],
          note: "Usage: heights = [0,1,0,2,1,0,1,3,1,0,1,2] returns 6. The algorithm correctly handles all edge cases including flat arrays and single bars.",
        },
      ],
    },
    complexity: {
      timeRows: [
        { label: "Best Case", value: "O(n)", color: "#CEEB5A" },
        { label: "Average Case", value: "O(n)", color: "#2255CC" },
        { label: "Worst Case", value: "O(n)", color: "#E05A3A" },
      ],
      spaceRows: [
        { label: "Two-Pointer Space", value: "O(1)", color: "#CEEB5A" },
        { label: "Prefix-Max Variant", value: "O(n)", color: "#888899" },
        { label: "Stack Variant", value: "O(n)", color: "#888899" },
      ],
      notes: [
        "The two-pointer approach achieves optimal O(n) time and O(1) space — each element is visited exactly once and no auxiliary arrays are allocated.",
        "The prefix-max precomputation variant (store left_max[] and right_max[] arrays) is conceptually simpler but uses O(n) space — useful when teaching the intuition before optimizing.",
        "All three variants (two-pointer, prefix-max, monotonic stack) run in O(n) time. The two-pointer approach is preferred in interviews for its minimal space usage.",
      ],
    },
    variations: {
      items: [
        "Prefix-Max Arrays Variant: precompute left_max[i] and right_max[i] arrays in two passes, then compute water[i] = min(left_max[i], right_max[i]) - height[i] in a third pass. Uses O(n) space but is easier to reason about.",
        "Monotonic Stack Variant: use a decreasing stack to process bars layer by layer (horizontal water slabs). Useful when the problem is framed differently or when you need to track which bars form the boundaries.",
        "3D Trapping Rain Water (LeetCode 407): extend to a 2D height matrix. Use a min-heap (priority queue) to process cells by height from the boundary inward — O(mn log(mn)) time.",
        "Volume of Histogram with Obstacles: variant where some cells are blocked and water cannot be placed there. Requires modifying the boundary-tracking logic.",
        "Largest Rectangle in Histogram (related): uses a similar monotonic stack approach to find the largest rectangular area — a complementary problem that deepens understanding of histogram algorithms.",
      ],
      tips: [
        "The key invariant: when processing the left pointer, left_max is the true maximum seen so far on the left, and we know height[right] >= left_max (otherwise we'd be on the right branch). So water at left is exactly left_max - height[left].",
        "Always handle the empty array edge case first — return 0 immediately for len(height) < 2, since no water can be trapped with fewer than two bars.",
        "When implementing the prefix-max approach first in an interview, explicitly mention you'll optimize to O(1) space — this shows awareness of the tradeoff and earns extra credit.",
        "The two-pointer technique works here because the water at any bar depends only on the minimum of the two surrounding maxima — a monotone property that two pointers exploit naturally.",
      ],
    },
    summary: {
      keyPoints: [
        "Trapping Rain Water computes the total water trapped in a histogram by determining, for each bar, the water level = min(leftMax, rightMax) - height.",
        "The two-pointer technique achieves O(n) time and O(1) space by observing that when height[left] <= height[right], the left bar's water is fully determined by left_max alone.",
        "Each bar is visited exactly once as the two pointers converge from the ends toward the global maximum — no element is revisited.",
        "The prefix-max variant (O(n) space) is useful for understanding the algorithm; the two-pointer variant is the production-ready O(1) space solution.",
        "The monotonic stack variant processes water in horizontal layers and is useful for the 3D extension or when the problem structure naturally suggests a stack.",
        "This problem is a canonical example of how a clever invariant — 'the shorter side determines the water level' — transforms an O(n²) brute force into an elegant O(n) single-pass algorithm.",
      ],
    },
  },
}

export default function TrappingRainWaterVideo() {
  return <AlgoVideo config={config} />
}
