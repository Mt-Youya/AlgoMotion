import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "Interpolation Search",
  subtitle: "Estimates the target position using linear interpolation, offering O(log log n) average time on unif",
  category: "search",
  difficulty: "intermediate",

  chapters: {
    problem: {
      heading: "Problem Statement",
      bullets: [
        "Given a sorted array of uniformly distributed integers, find the index of a target value.",
        "Binary search always probes the midpoint — but if data is uniform, we can do better.",
        "We want an algorithm that 'jumps' closer to the target on each probe, not just halves the range.",
        "Return the index of the target if found, or -1 if it is not present in the array.",
        "The key constraint: the array must be sorted, and works best when values are evenly spaced.",
      ],
    },

    intuition: {
      heading: "Core Intuition",
      bullets: [
        "Think of searching a phone book for 'Smith' — you open near the back, not the middle.",
        "Linear interpolation estimates where the target should be based on its value relative to the range.",
        "Formula: pos = lo + floor((target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo]))",
        "If arr[pos] == target, we found it. If arr[pos] < target, search right half. Otherwise, search left.",
        "On uniformly distributed data, each probe reduces the search space dramatically — hence O(log log n).",
      ],
      analogy:
        "Like finding a word in a dictionary: you don't open to page 500 for a word starting with 'Z' — you open near the end because you know roughly where it should be based on the alphabet.",
    },

    walkthrough: {
      heading: "Step-by-Step Walkthrough",
      steps: [
        {
          step: 1,
          description: "Start with sorted array [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], target = 70.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 2,
          description: "Set lo = 0 (value 10), hi = 9 (value 100). Both pointers mark the current search range.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "green",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 3,
          description:
            "Apply interpolation formula: pos = 0 + floor((70 - 10) * (9 - 0) / (100 - 10)) = floor(60 * 9 / 90) = floor(6) = 6.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "green",
              "default",
              "default",
              "default",
              "default",
              "default",
              "yellow",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 4,
          description: "Probe index 6: arr[6] = 70. Compare with target 70.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "green",
              "default",
              "default",
              "default",
              "default",
              "default",
              "yellow",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 5,
          description: "arr[6] == 70 == target! Element found at index 6. Return 6.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "default",
              "green",
              "default",
              "default",
              "default",
            ],
          },
        },
        {
          step: 6,
          description:
            "Miss scenario: searching for 40. pos = 0 + floor((40-10)*9/90) = floor(3) = 3. arr[3] = 40. Found immediately!",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "green",
              "default",
              "default",
              "green",
              "default",
              "default",
              "default",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 7,
          description:
            "Not-found scenario: searching for 55. pos = 0 + floor((55-10)*9/90) = floor(4.5) = 4. arr[4] = 50 < 55.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "green",
              "default",
              "default",
              "default",
              "yellow",
              "default",
              "default",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 8,
          description: "Since arr[4] < 55, update lo = 5. New range: lo=5 (value 60), hi=9 (value 100).",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "green",
              "default",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 9,
          description:
            "New probe: pos = 5 + floor((55-60)*4/40) = 5 + floor(-0.5) = 4. But now lo=5 > pos=4, which means lo > hi after adjustment.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "default",
              "green",
              "default",
              "default",
              "default",
              "red",
            ],
          },
        },
        {
          step: 10,
          description: "lo > hi (or arr[pos] != target with no room left): 55 is NOT in the array. Return -1.",
          arrayState: {
            values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            colors: [
              "default",
              "default",
              "default",
              "default",
              "red",
              "red",
              "default",
              "default",
              "default",
              "default",
            ],
          },
        },
      ],
    },

    code: {
      heading: "Python Implementation",
      language: "python",
      snippet: `def interpolation_search(arr: list[int], target: int) -> int:
    """
    Search for target in a sorted, uniformly distributed array.
    Returns the index if found, -1 otherwise.
    Time:  O(log log n) average on uniform data, O(n) worst case
    Space: O(1)
    """
    lo, hi = 0, len(arr) - 1

    while lo <= hi and arr[lo] <= target <= arr[hi]:
        # Avoid division by zero when all remaining elements are equal
        if arr[hi] == arr[lo]:
            if arr[lo] == target:
                return lo
            return -1

        # Interpolation formula: estimate where target should be
        pos = lo + int(
            (target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo])
        )

        if arr[pos] == target:
            return pos
        elif arr[pos] < target:
            lo = pos + 1   # target is in the right partition
        else:
            hi = pos - 1   # target is in the left partition

    return -1  # target not found


# Example usage
arr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
print(interpolation_search(arr, 70))   # → 6
print(interpolation_search(arr, 40))   # → 3
print(interpolation_search(arr, 55))   # → -1`,
      annotations: [
        {
          lines: "1-7",
          note: "Function signature and docstring. The algorithm requires a sorted array; uniform distribution is needed for the O(log log n) guarantee.",
        },
        {
          lines: "9",
          note: "Initialize lo and hi as the two boundary indices. These shrink each iteration as we narrow the search range.",
        },
        {
          lines: "11-15",
          note: "Guard: loop only while lo <= hi AND target is within the current value range [arr[lo], arr[hi]]. If target is out of range, it cannot be present.",
        },
        {
          lines: "16-19",
          note: "Division-by-zero guard: when arr[lo] == arr[hi], all remaining values are identical. Check once and return.",
        },
        {
          lines: "21-24",
          note: "The interpolation formula. This is the heart of the algorithm — it estimates pos proportionally, like a linear interpolation between lo and hi.",
        },
        {
          lines: "26-30",
          note: "Standard three-way comparison: found → return, too small → move lo right, too large → move hi left. Mirrors binary search logic but with a smarter probe.",
        },
      ],
    },

    complexity: {
      heading: "Complexity Analysis",
      timeRows: [
        {
          case: "Best",
          complexity: "O(1)",
          note: "Target is found on the very first probe (perfect interpolation).",
        },
        {
          case: "Average",
          complexity: "O(log log n)",
          note: "On uniformly distributed data, each probe reduces candidates by a square-root factor.",
        },
        {
          case: "Worst",
          complexity: "O(n)",
          note: "Highly skewed distributions (e.g., exponential) can cause linear degradation.",
        },
      ],
      spaceRows: [
        {
          case: "Iterative",
          complexity: "O(1)",
          note: "Only a constant number of index variables (lo, hi, pos) are used.",
        },
      ],
      insights: [
        "The O(log log n) average is only achieved when data is uniformly distributed — this is a strong assumption that binary search does not require.",
        "For non-uniform data, binary search at O(log n) is safer and more predictable. Use interpolation search only when you know the distribution.",
        "The formula requires arr[hi] != arr[lo]; always guard against division by zero for arrays with duplicate values.",
      ],
    },

    variations: {
      heading: "Variations & Practical Tips",
      variations: [
        {
          name: "Recursive Interpolation Search",
          description:
            "Same logic implemented recursively. Cleaner to read but uses O(log log n) stack space on average.",
        },
        {
          name: "Interpolation-Binary Hybrid",
          description:
            "Use interpolation for the first few probes to get close, then switch to binary search. Combines speed with robustness against skewed distributions.",
        },
        {
          name: "Quadratic Binary Search",
          description:
            "A generalization that uses higher-order polynomial interpolation instead of linear. Rarely used in practice due to complexity.",
        },
        {
          name: "Fractional Cascading",
          description:
            "Combine interpolation search with fractional cascading to search across multiple sorted lists efficiently.",
        },
        {
          name: "Exponential + Interpolation",
          description:
            "For unbounded arrays, use exponential search to find the range, then apply interpolation search within that range.",
        },
      ],
      tips: [
        "Always validate that your data is sorted before applying interpolation search — it silently produces wrong results on unsorted input.",
        "Profile your data distribution first. If values are clustered or follow a power law, stick with binary search.",
        "The integer cast in the formula (int(...)) truncates toward zero — ensure this is the correct rounding direction for your index type.",
        "For floating-point arrays, be careful with the division: use float arithmetic explicitly to avoid integer truncation errors.",
      ],
    },

    summary: {
      heading: "Key Takeaways",
      takeaways: [
        "Interpolation search improves on binary search by using value-based probing instead of always choosing the midpoint.",
        "The algorithm achieves O(log log n) average time on uniformly distributed data — significantly faster than O(log n) for large n.",
        "It degrades to O(n) worst case on skewed distributions, making binary search a safer default for unknown data.",
        "The interpolation formula pos = lo + floor((target - arr[lo]) * (hi - lo) / (arr[hi] - arr[lo])) is the core of the algorithm.",
        "Always guard against division by zero when arr[lo] == arr[hi] to handle arrays with duplicate values correctly.",
        "Best used in scenarios where data is known to be uniformly distributed, such as integer keys in a dense range or evenly spaced timestamps.",
      ],
    },
  },
}

export default function InterpolationSearchVideo() {
  return <AlgoVideo config={config} />
}
