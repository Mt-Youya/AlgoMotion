import type { AlgorithmMeta, AlgorithmRun, StringAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const stringAlgorithms: Record<StringAlgorithmId, AlgorithmMeta> = {
  kmp: {
    id: "kmp",
    name: "KMP",
    displayName: { en: "KMP (Knuth–Morris–Pratt)", zh: "KMP 字符串匹配" },
    category: "string",
    difficulty: "intermediate",
    tags: ["string", "pattern-matching"],
    description: {
      en: "Builds a failure function (partial-match table) on the pattern to skip redundant comparisons, achieving O(n+m) matching.",
      zh: "对模式串预处理得到失败函数（部分匹配表），在主串中匹配时跳过冗余比较，整体时间复杂度 O(n+m)。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n+m)", average: "O(n+m)", worst: "O(n+m)" },
    spaceComplexity: "O(m)",
    relatedProblems: [{ id: 28, titleSlug: "find-the-index-of-the-first-occurrence-in-a-string", difficulty: "easy" }],
    snippets: [
      {
        lang: "typescript",
        code: `function kmpSearch(text: string, pattern: string): number[] {
  const n = text.length, m = pattern.length;
  if (m === 0) return [];
  // Build failure function
  const fail = new Array<number>(m).fill(0);
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = fail[j - 1]!;
    if (pattern[i] === pattern[j]) j++;
    fail[i] = j;
  }
  // Search
  const result: number[] = [];
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = fail[j - 1]!;
    if (text[i] === pattern[j]) j++;
    if (j === m) { result.push(i - m + 1); j = fail[j - 1]!; }
  }
  return result;
}`,
      },
      {
        lang: "javascript",
        code: `function kmpSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m === 0) return [];
  const fail = new Array(m).fill(0);
  for (let i = 1, j = 0; i < m; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = fail[j - 1];
    if (pattern[i] === pattern[j]) j++;
    fail[i] = j;
  }
  const result = [];
  for (let i = 0, j = 0; i < n; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = fail[j - 1];
    if (text[i] === pattern[j]) j++;
    if (j === m) { result.push(i - m + 1); j = fail[j - 1]; }
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `def kmp_search(text: str, pattern: str) -> list[int]:
    n, m = len(text), len(pattern)
    if m == 0:
        return []
    fail = [0] * m
    j = 0
    for i in range(1, m):
        while j > 0 and pattern[i] != pattern[j]:
            j = fail[j - 1]
        if pattern[i] == pattern[j]:
            j += 1
        fail[i] = j
    result, j = [], 0
    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            j = fail[j - 1]
        if text[i] == pattern[j]:
            j += 1
        if j == m:
            result.append(i - m + 1)
            j = fail[j - 1]
    return result`,
      },
      {
        lang: "java",
        code: `public List<Integer> kmpSearch(String text, String pattern) {
    int n = text.length(), m = pattern.length();
    List<Integer> result = new ArrayList<>();
    if (m == 0) return result;
    int[] fail = new int[m];
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && pattern.charAt(i) != pattern.charAt(j)) j = fail[j - 1];
        if (pattern.charAt(i) == pattern.charAt(j)) j++;
        fail[i] = j;
    }
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && text.charAt(i) != pattern.charAt(j)) j = fail[j - 1];
        if (text.charAt(i) == pattern.charAt(j)) j++;
        if (j == m) { result.add(i - m + 1); j = fail[j - 1]; }
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn kmp_search(text: &str, pattern: &str) -> Vec<usize> {
    let t: Vec<char> = text.chars().collect();
    let p: Vec<char> = pattern.chars().collect();
    let (n, m) = (t.len(), p.len());
    if m == 0 { return vec![]; }
    let mut fail = vec![0usize; m];
    let mut j = 0usize;
    for i in 1..m {
        while j > 0 && p[i] != p[j] { j = fail[j - 1]; }
        if p[i] == p[j] { j += 1; }
        fail[i] = j;
    }
    let mut result = vec![];
    j = 0;
    for i in 0..n {
        while j > 0 && t[i] != p[j] { j = fail[j - 1]; }
        if t[i] == p[j] { j += 1; }
        if j == m { result.push(i + 1 - m); j = fail[j - 1]; }
    }
    result
}`,
      },
      {
        lang: "c",
        code: `void kmpSearch(const char* text, const char* pattern, int* out, int* count) {
    int n = strlen(text), m = strlen(pattern);
    *count = 0;
    if (m == 0) return;
    int* fail = calloc(m, sizeof(int));
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) j = fail[j - 1];
        if (pattern[i] == pattern[j]) j++;
        fail[i] = j;
    }
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) j = fail[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == m) { out[(*count)++] = i - m + 1; j = fail[j - 1]; }
    }
    free(fail);
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> kmpSearch(const string& text, const string& pattern) {
    int n = text.size(), m = pattern.size();
    vector<int> result, fail(m, 0);
    if (m == 0) return result;
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && pattern[i] != pattern[j]) j = fail[j - 1];
        if (pattern[i] == pattern[j]) j++;
        fail[i] = j;
    }
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && text[i] != pattern[j]) j = fail[j - 1];
        if (text[i] == pattern[j]) j++;
        if (j == m) { result.push_back(i - m + 1); j = fail[j - 1]; }
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func kmpSearch(text, pattern string) []int {
    n, m := len(text), len(pattern)
    if m == 0 { return nil }
    fail := make([]int, m)
    for i, j := 1, 0; i < m; i++ {
        for j > 0 && pattern[i] != pattern[j] { j = fail[j-1] }
        if pattern[i] == pattern[j] { j++ }
        fail[i] = j
    }
    var result []int
    for i, j := 0, 0; i < n; i++ {
        for j > 0 && text[i] != pattern[j] { j = fail[j-1] }
        if text[i] == pattern[j] { j++ }
        if j == m { result = append(result, i-m+1); j = fail[j-1] }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function kmpSearch(string $text, string $pattern): array {
    $n = strlen($text); $m = strlen($pattern);
    if ($m === 0) return [];
    $fail = array_fill(0, $m, 0);
    for ($i = 1, $j = 0; $i < $m; $i++) {
        while ($j > 0 && $pattern[$i] !== $pattern[$j]) $j = $fail[$j - 1];
        if ($pattern[$i] === $pattern[$j]) $j++;
        $fail[$i] = $j;
    }
    $result = [];
    for ($i = 0, $j = 0; $i < $n; $i++) {
        while ($j > 0 && $text[$i] !== $pattern[$j]) $j = $fail[$j - 1];
        if ($text[$i] === $pattern[$j]) $j++;
        if ($j === $m) { $result[] = $i - $m + 1; $j = $fail[$j - 1]; }
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun kmpSearch(text: String, pattern: String): List<Int> {
    val n = text.length; val m = pattern.length
    if (m == 0) return emptyList()
    val fail = IntArray(m)
    var j = 0
    for (i in 1 until m) {
        while (j > 0 && pattern[i] != pattern[j]) j = fail[j - 1]
        if (pattern[i] == pattern[j]) j++
        fail[i] = j
    }
    val result = mutableListOf<Int>()
    j = 0
    for (i in 0 until n) {
        while (j > 0 && text[i] != pattern[j]) j = fail[j - 1]
        if (text[i] == pattern[j]) j++
        if (j == m) { result.add(i - m + 1); j = fail[j - 1] }
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func kmpSearch(_ text: String, _ pattern: String) -> [Int] {
    let t = Array(text), p = Array(pattern)
    let n = t.count, m = p.count
    if m == 0 { return [] }
    var fail = [Int](repeating: 0, count: m)
    var j = 0
    for i in 1..<m {
        while j > 0 && p[i] != p[j] { j = fail[j - 1] }
        if p[i] == p[j] { j += 1 }
        fail[i] = j
    }
    var result = [Int](); j = 0
    for i in 0..<n {
        while j > 0 && t[i] != p[j] { j = fail[j - 1] }
        if t[i] == p[j] { j += 1 }
        if j == m { result.append(i - m + 1); j = fail[j - 1] }
    }
    return result
}`,
      },
    ],
  },

  "rabin-karp": {
    id: "rabin-karp",
    name: "Rabin–Karp",
    displayName: { en: "Rabin–Karp", zh: "Rabin–Karp 滚动哈希" },
    category: "string",
    difficulty: "intermediate",
    tags: ["string", "hash", "rolling-hash", "pattern-matching"],
    description: {
      en: "Uses a rolling polynomial hash to compare the pattern against every window of the text in O(1) per slide, with O(n+m) average-case time.",
      zh: "利用滚动多项式哈希，在 O(1) 时间内滑动窗口比较，平均时间复杂度 O(n+m)。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n+m)", average: "O(n+m)", worst: "O(nm)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 28, titleSlug: "find-the-index-of-the-first-occurrence-in-a-string", difficulty: "easy" }],
    snippets: [
      {
        lang: "typescript",
        code: `function rabinKarp(text: string, pattern: string): number[] {
  const BASE = 31, MOD = 1_000_000_007n;
  const n = text.length, m = pattern.length;
  if (m > n) return [];
  const b = BigInt(BASE);
  let ph = 0n, wh = 0n, power = 1n;
  for (let i = 0; i < m; i++) {
    ph = (ph * b + BigInt(pattern.charCodeAt(i))) % MOD;
    wh = (wh * b + BigInt(text.charCodeAt(i))) % MOD;
    if (i > 0) power = (power * b) % MOD;
  }
  const result: number[] = [];
  if (ph === wh && text.slice(0, m) === pattern) result.push(0);
  for (let i = m; i < n; i++) {
    wh = (wh - BigInt(text.charCodeAt(i - m)) * power % MOD + MOD) % MOD;
    wh = (wh * b + BigInt(text.charCodeAt(i))) % MOD;
    if (ph === wh && text.slice(i - m + 1, i + 1) === pattern) result.push(i - m + 1);
  }
  return result;
}`,
      },
      {
        lang: "javascript",
        code: `function rabinKarp(text, pattern) {
  const BASE = 31n, MOD = 1_000_000_007n;
  const n = text.length, m = pattern.length;
  if (m > n) return [];
  let ph = 0n, wh = 0n, power = 1n;
  for (let i = 0; i < m; i++) {
    ph = (ph * BASE + BigInt(pattern.charCodeAt(i))) % MOD;
    wh = (wh * BASE + BigInt(text.charCodeAt(i))) % MOD;
    if (i > 0) power = (power * BASE) % MOD;
  }
  const result = [];
  if (ph === wh && text.slice(0, m) === pattern) result.push(0);
  for (let i = m; i < n; i++) {
    wh = (wh - BigInt(text.charCodeAt(i - m)) * power % MOD + MOD) % MOD;
    wh = (wh * BASE + BigInt(text.charCodeAt(i))) % MOD;
    if (ph === wh && text.slice(i - m + 1, i + 1) === pattern) result.push(i - m + 1);
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `def rabin_karp(text: str, pattern: str) -> list[int]:
    MOD, BASE = 10**9 + 7, 31
    n, m = len(text), len(pattern)
    if m > n:
        return []
    ph = wh = 0
    power = 1
    for i in range(m):
        ph = (ph * BASE + ord(pattern[i])) % MOD
        wh = (wh * BASE + ord(text[i])) % MOD
        if i > 0:
            power = power * BASE % MOD
    result = []
    if ph == wh and text[:m] == pattern:
        result.append(0)
    for i in range(m, n):
        wh = (wh - ord(text[i - m]) * power % MOD + MOD) % MOD
        wh = (wh * BASE + ord(text[i])) % MOD
        if ph == wh and text[i - m + 1:i + 1] == pattern:
            result.append(i - m + 1)
    return result`,
      },
      {
        lang: "java",
        code: `public List<Integer> rabinKarp(String text, String pattern) {
    final long MOD = 1_000_000_007L, BASE = 31L;
    int n = text.length(), m = pattern.length();
    List<Integer> result = new ArrayList<>();
    if (m > n) return result;
    long ph = 0, wh = 0, power = 1;
    for (int i = 0; i < m; i++) {
        ph = (ph * BASE + pattern.charAt(i)) % MOD;
        wh = (wh * BASE + text.charAt(i)) % MOD;
        if (i > 0) power = power * BASE % MOD;
    }
    if (ph == wh && text.substring(0, m).equals(pattern)) result.add(0);
    for (int i = m; i < n; i++) {
        wh = (wh - text.charAt(i - m) * power % MOD + MOD) % MOD;
        wh = (wh * BASE + text.charAt(i)) % MOD;
        if (ph == wh && text.substring(i - m + 1, i + 1).equals(pattern)) result.add(i - m + 1);
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn rabin_karp(text: &str, pattern: &str) -> Vec<usize> {
    const MOD: u64 = 1_000_000_007;
    const BASE: u64 = 31;
    let t: Vec<u8> = text.bytes().collect();
    let p: Vec<u8> = pattern.bytes().collect();
    let (n, m) = (t.len(), p.len());
    if m > n { return vec![]; }
    let (mut ph, mut wh, mut power) = (0u64, 0u64, 1u64);
    for i in 0..m {
        ph = (ph * BASE + p[i] as u64) % MOD;
        wh = (wh * BASE + t[i] as u64) % MOD;
        if i > 0 { power = power * BASE % MOD; }
    }
    let mut result = vec![];
    if ph == wh && &t[..m] == &p[..] { result.push(0); }
    for i in m..n {
        wh = (wh + MOD - t[i - m] as u64 * power % MOD) % MOD;
        wh = (wh * BASE + t[i] as u64) % MOD;
        if ph == wh && &t[i - m + 1..=i] == &p[..] { result.push(i - m + 1); }
    }
    result
}`,
      },
      {
        lang: "c",
        code: `void rabinKarp(const char* text, const char* pattern, int* out, int* count) {
    const long long MOD = 1000000007LL, BASE = 31LL;
    int n = strlen(text), m = strlen(pattern); *count = 0;
    if (m > n) return;
    long long ph = 0, wh = 0, power = 1;
    for (int i = 0; i < m; i++) {
        ph = (ph * BASE + pattern[i]) % MOD;
        wh = (wh * BASE + text[i]) % MOD;
        if (i > 0) power = power * BASE % MOD;
    }
    if (ph == wh && strncmp(text, pattern, m) == 0) out[(*count)++] = 0;
    for (int i = m; i < n; i++) {
        wh = (wh - (long long)text[i - m] * power % MOD + MOD) % MOD;
        wh = (wh * BASE + text[i]) % MOD;
        if (ph == wh && strncmp(text + i - m + 1, pattern, m) == 0) out[(*count)++] = i - m + 1;
    }
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> rabinKarp(const string& text, const string& pattern) {
    const long long MOD = 1e9 + 7, BASE = 31;
    int n = text.size(), m = pattern.size();
    vector<int> result;
    if (m > n) return result;
    long long ph = 0, wh = 0, power = 1;
    for (int i = 0; i < m; i++) {
        ph = (ph * BASE + pattern[i]) % MOD;
        wh = (wh * BASE + text[i]) % MOD;
        if (i > 0) power = power * BASE % MOD;
    }
    if (ph == wh && text.substr(0, m) == pattern) result.push_back(0);
    for (int i = m; i < n; i++) {
        wh = (wh - (long long)text[i - m] * power % MOD + MOD) % MOD;
        wh = (wh * BASE + text[i]) % MOD;
        if (ph == wh && text.substr(i - m + 1, m) == pattern) result.push_back(i - m + 1);
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func rabinKarp(text, pattern string) []int {
    const MOD, BASE = 1_000_000_007, 31
    n, m := len(text), len(pattern)
    if m > n { return nil }
    var ph, wh, power int64 = 0, 0, 1
    for i := 0; i < m; i++ {
        ph = (ph*BASE + int64(pattern[i])) % MOD
        wh = (wh*BASE + int64(text[i])) % MOD
        if i > 0 { power = power * BASE % MOD }
    }
    var result []int
    if ph == wh && text[:m] == pattern { result = append(result, 0) }
    for i := m; i < n; i++ {
        wh = (wh - int64(text[i-m])*power%MOD + MOD) % MOD
        wh = (wh*BASE + int64(text[i])) % MOD
        if ph == wh && text[i-m+1:i+1] == pattern { result = append(result, i-m+1) }
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function rabinKarp(string $text, string $pattern): array {
    $MOD = 1000000007; $BASE = 31;
    $n = strlen($text); $m = strlen($pattern);
    if ($m > $n) return [];
    $ph = $wh = 0; $power = 1;
    for ($i = 0; $i < $m; $i++) {
        $ph = ($ph * $BASE + ord($pattern[$i])) % $MOD;
        $wh = ($wh * $BASE + ord($text[$i])) % $MOD;
        if ($i > 0) $power = $power * $BASE % $MOD;
    }
    $result = [];
    if ($ph === $wh && substr($text, 0, $m) === $pattern) $result[] = 0;
    for ($i = $m; $i < $n; $i++) {
        $wh = ($wh - ord($text[$i - $m]) * $power % $MOD + $MOD) % $MOD;
        $wh = ($wh * $BASE + ord($text[$i])) % $MOD;
        if ($ph === $wh && substr($text, $i - $m + 1, $m) === $pattern) $result[] = $i - $m + 1;
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun rabinKarp(text: String, pattern: String): List<Int> {
    val MOD = 1_000_000_007L; val BASE = 31L
    val n = text.length; val m = pattern.length
    if (m > n) return emptyList()
    var ph = 0L; var wh = 0L; var power = 1L
    for (i in 0 until m) {
        ph = (ph * BASE + pattern[i].code) % MOD
        wh = (wh * BASE + text[i].code) % MOD
        if (i > 0) power = power * BASE % MOD
    }
    val result = mutableListOf<Int>()
    if (ph == wh && text.substring(0, m) == pattern) result.add(0)
    for (i in m until n) {
        wh = (wh - text[i - m].code * power % MOD + MOD) % MOD
        wh = (wh * BASE + text[i].code) % MOD
        if (ph == wh && text.substring(i - m + 1, i + 1) == pattern) result.add(i - m + 1)
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func rabinKarp(_ text: String, _ pattern: String) -> [Int] {
    let MOD: Int64 = 1_000_000_007, BASE: Int64 = 31
    let t = Array(text.utf8), p = Array(pattern.utf8)
    let n = t.count, m = p.count
    if m > n { return [] }
    var ph: Int64 = 0, wh: Int64 = 0, power: Int64 = 1
    for i in 0..<m {
        ph = (ph * BASE + Int64(p[i])) % MOD
        wh = (wh * BASE + Int64(t[i])) % MOD
        if i > 0 { power = power * BASE % MOD }
    }
    var result = [Int]()
    if ph == wh && Array(t[0..<m]) == p { result.append(0) }
    for i in m..<n {
        wh = (wh - Int64(t[i - m]) * power % MOD + MOD) % MOD
        wh = (wh * BASE + Int64(t[i])) % MOD
        if ph == wh && Array(t[i - m + 1...i]) == p { result.append(i - m + 1) }
    }
    return result
}`,
      },
    ],
  },

  "z-algorithm": {
    id: "z-algorithm",
    name: "Z-Algorithm",
    displayName: { en: "Z-Algorithm", zh: "Z 算法" },
    category: "string",
    difficulty: "intermediate",
    tags: ["string", "pattern-matching"],
    description: {
      en: "Constructs the Z-array where Z[i] is the length of the longest substring starting at i that matches a prefix of the string, enabling O(n) pattern search.",
      zh: "构造 Z 数组，其中 Z[i] 是从 i 开始与字符串前缀最长匹配的长度，从而实现 O(n) 的模式匹配。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    snippets: [
      {
        lang: "typescript",
        code: `function zSearch(text: string, pattern: string): number[] {
  const s = pattern + "$" + text;
  const n = s.length, m = pattern.length;
  const z = new Array<number>(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l]!);
    while (i + z[i]! < n && s[z[i]!] === s[i + z[i]!]) z[i]!++;
    if (i + z[i]! > r) { l = i; r = i + z[i]!; }
  }
  const result: number[] = [];
  for (let i = m + 1; i < n; i++) if (z[i] === m) result.push(i - m - 1);
  return result;
}`,
      },
      {
        lang: "javascript",
        code: `function zSearch(text, pattern) {
  const s = pattern + "$" + text;
  const n = s.length, m = pattern.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;
  for (let i = 1; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l]);
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] > r) { l = i; r = i + z[i]; }
  }
  const result = [];
  for (let i = m + 1; i < n; i++) if (z[i] === m) result.push(i - m - 1);
  return result;
}`,
      },
      {
        lang: "python",
        code: `def z_search(text: str, pattern: str) -> list[int]:
    s = pattern + "$" + text
    n, m = len(s), len(pattern)
    z = [0] * n
    l = r = 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return [i - m - 1 for i in range(m + 1, n) if z[i] == m]`,
      },
      {
        lang: "java",
        code: `public List<Integer> zSearch(String text, String pattern) {
    String s = pattern + "$" + text;
    int n = s.length(), m = pattern.length();
    int[] z = new int[n];
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = Math.min(r - i, z[i - l]);
        while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
    }
    List<Integer> result = new ArrayList<>();
    for (int i = m + 1; i < n; i++) if (z[i] == m) result.add(i - m - 1);
    return result;
}`,
      },
      {
        lang: "rust",
        code: `fn z_search(text: &str, pattern: &str) -> Vec<usize> {
    let s: Vec<char> = (pattern.to_owned() + "$" + text).chars().collect();
    let n = s.len(); let m = pattern.len();
    let mut z = vec![0usize; n];
    let (mut l, mut r) = (0, 0);
    for i in 1..n {
        if i < r { z[i] = (r - i).min(z[i - l]); }
        while i + z[i] < n && s[z[i]] == s[i + z[i]] { z[i] += 1; }
        if i + z[i] > r { l = i; r = i + z[i]; }
    }
    (m + 1..n).filter(|&i| z[i] == m).map(|i| i - m - 1).collect()
}`,
      },
      {
        lang: "c",
        code: `void zSearch(const char* text, const char* pattern, int* out, int* count) {
    int pm = strlen(pattern), tn = strlen(text);
    int n = pm + 1 + tn;
    char* s = malloc(n + 1);
    sprintf(s, "%s$%s", pattern, text);
    int* z = calloc(n, sizeof(int));
    *count = 0;
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = r - i < z[i - l] ? r - i : z[i - l];
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
        if (z[i] == pm) out[(*count)++] = i - pm - 1;
    }
    free(s); free(z);
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> zSearch(const string& text, const string& pattern) {
    string s = pattern + "$" + text;
    int n = s.size(), m = pattern.size();
    vector<int> z(n, 0), result;
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i < r) z[i] = min(r - i, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] > r) { l = i; r = i + z[i]; }
        if (z[i] == m) result.push_back(i - m - 1);
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func zSearch(text, pattern string) []int {
    s := pattern + "$" + text
    n, m := len(s), len(pattern)
    z := make([]int, n)
    for i, l, r := 1, 0, 0; i < n; i++ {
        if i < r {
            if r-i < z[i-l] { z[i] = r - i } else { z[i] = z[i-l] }
        }
        for i+z[i] < n && s[z[i]] == s[i+z[i]] { z[i]++ }
        if i+z[i] > r { l, r = i, i+z[i] }
    }
    var result []int
    for i := m + 1; i < n; i++ { if z[i] == m { result = append(result, i-m-1) } }
    return result
}`,
      },
      {
        lang: "php",
        code: `function zSearch(string $text, string $pattern): array {
    $s = $pattern . '$' . $text;
    $n = strlen($s); $m = strlen($pattern);
    $z = array_fill(0, $n, 0);
    for ($i = 1, $l = 0, $r = 0; $i < $n; $i++) {
        if ($i < $r) $z[$i] = min($r - $i, $z[$i - $l]);
        while ($i + $z[$i] < $n && $s[$z[$i]] === $s[$i + $z[$i]]) $z[$i]++;
        if ($i + $z[$i] > $r) { $l = $i; $r = $i + $z[$i]; }
    }
    $result = [];
    for ($i = $m + 1; $i < $n; $i++) if ($z[$i] === $m) $result[] = $i - $m - 1;
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun zSearch(text: String, pattern: String): List<Int> {
    val s = pattern + "$" + text
    val n = s.length; val m = pattern.length
    val z = IntArray(n)
    var l = 0; var r = 0
    for (i in 1 until n) {
        if (i < r) z[i] = minOf(r - i, z[i - l])
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++
        if (i + z[i] > r) { l = i; r = i + z[i] }
    }
    return (m + 1 until n).filter { z[it] == m }.map { it - m - 1 }
}`,
      },
      {
        lang: "swift",
        code: `func zSearch(_ text: String, _ pattern: String) -> [Int] {
    let s = Array(pattern + "$" + text)
    let n = s.count, m = pattern.count
    var z = [Int](repeating: 0, count: n)
    var l = 0, r = 0
    for i in 1..<n {
        if i < r { z[i] = min(r - i, z[i - l]) }
        while i + z[i] < n && s[z[i]] == s[i + z[i]] { z[i] += 1 }
        if i + z[i] > r { l = i; r = i + z[i] }
    }
    return (m + 1..<n).filter { z[$0] == m }.map { $0 - m - 1 }
}`,
      },
    ],
  },

  "aho-corasick": {
    id: "aho-corasick",
    name: "Aho–Corasick",
    displayName: { en: "Aho–Corasick", zh: "Aho–Corasick 多模匹配" },
    category: "string",
    difficulty: "advanced",
    tags: ["string", "trie", "automaton", "pattern-matching"],
    description: {
      en: "Builds a trie over all patterns then augments it with failure links and output links, enabling simultaneous search for all patterns in O(n+m+z) time.",
      zh: "对所有模式串构建 Trie，并添加失败链接和输出链接，实现 O(n+m+z) 的多模式同时匹配。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n+m+z)", average: "O(n+m+z)", worst: "O(n+m+z)" },
    spaceComplexity: "O(m·Σ)",
    snippets: [
      {
        lang: "typescript",
        code: `class AhoCorasick {
  private go: Map<number, number>[] = [new Map()];
  private fail: number[] = [0];
  private out: string[][] = [[]];
  insert(word: string): void {
    let cur = 0;
    for (const ch of word) {
      if (!this.go[cur]!.has(ch.charCodeAt(0))) {
        this.go[cur]!.set(ch.charCodeAt(0), this.go.length);
        this.go.push(new Map()); this.fail.push(0); this.out.push([]);
      }
      cur = this.go[cur]!.get(ch.charCodeAt(0))!;
    }
    this.out[cur]!.push(word);
  }
  build(): void {
    const q: number[] = [];
    for (const [c, v] of this.go[0]!) q.push(v);
    for (let i = 0; i < q.length; i++) {
      const u = q[i]!;
      for (const [c, v] of this.go[u]!) {
        let f = this.fail[u]!;
        while (f && !this.go[f]!.has(c)) f = this.fail[f]!;
        this.fail[v] = this.go[f]!.get(c) ?? 0;
        if (this.fail[v] === v) this.fail[v] = 0;
        this.out[v] = [...this.out[v]!, ...this.out[this.fail[v]!]!];
        q.push(v);
      }
    }
  }
  search(text: string): Array<{ pos: number; word: string }> {
    const results: Array<{ pos: number; word: string }> = [];
    let cur = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      while (cur && !this.go[cur]!.has(c)) cur = this.fail[cur]!;
      cur = this.go[cur]!.get(c) ?? 0;
      for (const w of this.out[cur]!) results.push({ pos: i - w.length + 1, word: w });
    }
    return results;
  }
}`,
      },
      {
        lang: "javascript",
        code: `class AhoCorasick {
  constructor() { this.go = [new Map()]; this.fail = [0]; this.out = [[]] }
  insert(word) {
    let cur = 0;
    for (const ch of word) {
      const c = ch.charCodeAt(0);
      if (!this.go[cur].has(c)) { this.go[cur].set(c, this.go.length); this.go.push(new Map()); this.fail.push(0); this.out.push([]); }
      cur = this.go[cur].get(c);
    }
    this.out[cur].push(word);
  }
  build() {
    const q = [];
    for (const v of this.go[0].values()) q.push(v);
    for (let i = 0; i < q.length; i++) {
      const u = q[i];
      for (const [c, v] of this.go[u]) {
        let f = this.fail[u];
        while (f && !this.go[f].has(c)) f = this.fail[f];
        this.fail[v] = this.go[f].get(c) ?? 0;
        if (this.fail[v] === v) this.fail[v] = 0;
        this.out[v] = [...this.out[v], ...this.out[this.fail[v]]];
        q.push(v);
      }
    }
  }
  search(text) {
    const results = []; let cur = 0;
    for (let i = 0; i < text.length; i++) {
      const c = text.charCodeAt(i);
      while (cur && !this.go[cur].has(c)) cur = this.fail[cur];
      cur = this.go[cur].get(c) ?? 0;
      for (const w of this.out[cur]) results.push({ pos: i - w.length + 1, word: w });
    }
    return results;
  }
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

class AhoCorasick:
    def __init__(self):
        self.go = [{}]; self.fail = [0]; self.out = [[]]
    def insert(self, word: str) -> None:
        cur = 0
        for ch in word:
            if ch not in self.go[cur]:
                self.go[cur][ch] = len(self.go)
                self.go.append({}); self.fail.append(0); self.out.append([])
            cur = self.go[cur][ch]
        self.out[cur].append(word)
    def build(self) -> None:
        q = deque(self.go[0].values())
        while q:
            u = q.popleft()
            for c, v in self.go[u].items():
                f = self.fail[u]
                while f and c not in self.go[f]: f = self.fail[f]
                self.fail[v] = self.go[f].get(c, 0)
                if self.fail[v] == v: self.fail[v] = 0
                self.out[v] = self.out[v] + self.out[self.fail[v]]
                q.append(v)
    def search(self, text: str) -> list[dict]:
        results, cur = [], 0
        for i, ch in enumerate(text):
            while cur and ch not in self.go[cur]: cur = self.fail[cur]
            cur = self.go[cur].get(ch, 0)
            for w in self.out[cur]: results.append({"pos": i - len(w) + 1, "word": w})
        return results`,
      },
      {
        lang: "java",
        code: `class AhoCorasick {
    List<Map<Character,Integer>> go = new ArrayList<>();
    List<Integer> fail = new ArrayList<>();
    List<List<String>> out = new ArrayList<>();
    AhoCorasick() { go.add(new HashMap<>()); fail.add(0); out.add(new ArrayList<>()); }
    void insert(String word) {
        int cur = 0;
        for (char ch : word.toCharArray()) {
            if (!go.get(cur).containsKey(ch)) {
                go.get(cur).put(ch, go.size()); go.add(new HashMap<>()); fail.add(0); out.add(new ArrayList<>());
            }
            cur = go.get(cur).get(ch);
        }
        out.get(cur).add(word);
    }
    void build() {
        Queue<Integer> q = new LinkedList<>();
        for (int v : go.get(0).values()) q.add(v);
        while (!q.isEmpty()) {
            int u = q.poll();
            for (Map.Entry<Character,Integer> e : go.get(u).entrySet()) {
                char c = e.getKey(); int v = e.getValue();
                int f = fail.get(u);
                while (f != 0 && !go.get(f).containsKey(c)) f = fail.get(f);
                fail.set(v, go.get(f).getOrDefault(c, 0));
                if (fail.get(v).equals(v)) fail.set(v, 0);
                out.get(v).addAll(out.get(fail.get(v)));
                q.add(v);
            }
        }
    }
}`,
      },
      {
        lang: "rust",
        code: `use std::collections::{HashMap, VecDeque};
struct AhoCorasick {
    go: Vec<HashMap<u8, usize>>,
    fail: Vec<usize>,
    out: Vec<Vec<String>>,
}
impl AhoCorasick {
    fn new() -> Self { Self { go: vec![HashMap::new()], fail: vec![0], out: vec![vec![]] } }
    fn insert(&mut self, word: &str) {
        let mut cur = 0;
        for &b in word.as_bytes() {
            if !self.go[cur].contains_key(&b) {
                let id = self.go.len();
                self.go[cur].insert(b, id); self.go.push(HashMap::new()); self.fail.push(0); self.out.push(vec![]);
            }
            cur = self.go[cur][&b];
        }
        self.out[cur].push(word.to_owned());
    }
    fn build(&mut self) {
        let mut q: VecDeque<usize> = self.go[0].values().copied().collect();
        while let Some(u) = q.pop_front() {
            let edges: Vec<_> = self.go[u].iter().map(|(&c, &v)| (c, v)).collect();
            for (c, v) in edges {
                let mut f = self.fail[u];
                while f != 0 && !self.go[f].contains_key(&c) { f = self.fail[f]; }
                self.fail[v] = *self.go[f].get(&c).unwrap_or(&0);
                if self.fail[v] == v { self.fail[v] = 0; }
                let extra: Vec<_> = self.out[self.fail[v]].clone();
                self.out[v].extend(extra);
                q.push_back(v);
            }
        }
    }
}`,
      },
      {
        lang: "c",
        code: `/* Simplified fixed-alphabet (lowercase ASCII) Aho-Corasick */
#define ALPHA 26
typedef struct { int ch[ALPHA]; int fail; } Node;
Node trie[100000]; int sz = 1; char* dict[1000]; int dictLen[1000]; int dictCount = 0;
void acInsert(const char* word) {
    int cur = 0;
    for (; *word; word++) {
        int c = *word - 'a';
        if (!trie[cur].ch[c]) { memset(&trie[sz], 0, sizeof(Node)); trie[cur].ch[c] = sz++; }
        cur = trie[cur].ch[c];
    }
}
void acBuild() {
    int q[100000]; int head = 0, tail = 0;
    for (int c = 0; c < ALPHA; c++) if (trie[0].ch[c]) q[tail++] = trie[0].ch[c];
    while (head < tail) {
        int u = q[head++];
        for (int c = 0; c < ALPHA; c++) {
            int v = trie[u].ch[c];
            if (!v) { trie[u].ch[c] = trie[trie[u].fail].ch[c]; continue; }
            trie[v].fail = trie[trie[u].fail].ch[c];
            q[tail++] = v;
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `struct AhoCorasick {
    vector<array<int,26>> go;
    vector<int> fail, out;
    AhoCorasick() { go.push_back({}); go[0].fill(-1); fail.push_back(0); out.push_back(-1); }
    void insert(const string& w) {
        int cur = 0;
        for (char ch : w) {
            int c = ch - 'a';
            if (go[cur][c] == -1) { go[cur][c] = go.size(); go.push_back({}); go.back().fill(-1); fail.push_back(0); out.push_back(-1); }
            cur = go[cur][c];
        }
    }
    void build() {
        queue<int> q;
        for (int c = 0; c < 26; c++) { if (go[0][c] == -1) go[0][c] = 0; else { fail[go[0][c]] = 0; q.push(go[0][c]); } }
        while (!q.empty()) {
            int u = q.front(); q.pop();
            for (int c = 0; c < 26; c++) {
                if (go[u][c] == -1) go[u][c] = go[fail[u]][c];
                else { fail[go[u][c]] = go[fail[u]][c]; q.push(go[u][c]); }
            }
        }
    }
};`,
      },
      {
        lang: "go",
        code: `type ACNode struct { ch [26]int; fail int }
type AhoCorasick struct { nodes []ACNode }
func NewAC() *AhoCorasick { ac := &AhoCorasick{nodes: make([]ACNode, 1)}; return ac }
func (ac *AhoCorasick) Insert(word string) {
    cur := 0
    for _, ch := range word {
        c := int(ch - 'a')
        if ac.nodes[cur].ch[c] == 0 { ac.nodes = append(ac.nodes, ACNode{}); ac.nodes[cur].ch[c] = len(ac.nodes) - 1 }
        cur = ac.nodes[cur].ch[c]
    }
}
func (ac *AhoCorasick) Build() {
    q := []int{}
    for c := 0; c < 26; c++ { if v := ac.nodes[0].ch[c]; v != 0 { q = append(q, v) } }
    for len(q) > 0 {
        u := q[0]; q = q[1:]
        for c := 0; c < 26; c++ {
            v := ac.nodes[u].ch[c]
            if v == 0 { ac.nodes[u].ch[c] = ac.nodes[ac.nodes[u].fail].ch[c]; continue }
            ac.nodes[v].fail = ac.nodes[ac.nodes[u].fail].ch[c]
            q = append(q, v)
        }
    }
}`,
      },
      {
        lang: "php",
        code: `class AhoCorasick {
    private array $go = [[]]; private array $fail = [0]; private array $out = [[]];
    public function insert(string $word): void {
        $cur = 0;
        for ($i = 0; $i < strlen($word); $i++) {
            $ch = $word[$i];
            if (!isset($this->go[$cur][$ch])) {
                $id = count($this->go);
                $this->go[$cur][$ch] = $id; $this->go[] = []; $this->fail[] = 0; $this->out[] = [];
            }
            $cur = $this->go[$cur][$ch];
        }
        $this->out[$cur][] = $word;
    }
    public function build(): void {
        $q = array_values($this->go[0]);
        while (!empty($q)) {
            $u = array_shift($q);
            foreach ($this->go[$u] as $c => $v) {
                $f = $this->fail[$u];
                while ($f && !isset($this->go[$f][$c])) $f = $this->fail[$f];
                $this->fail[$v] = $this->go[$f][$c] ?? 0;
                if ($this->fail[$v] === $v) $this->fail[$v] = 0;
                $this->out[$v] = array_merge($this->out[$v], $this->out[$this->fail[$v]]);
                $q[] = $v;
            }
        }
    }
}`,
      },
      {
        lang: "kotlin",
        code: `class AhoCorasick {
    val go = mutableListOf(mutableMapOf<Char, Int>())
    val fail = mutableListOf(0)
    val out = mutableListOf(mutableListOf<String>())
    fun insert(word: String) {
        var cur = 0
        for (ch in word) {
            if (!go[cur].containsKey(ch)) { val id = go.size; go[cur][ch] = id; go.add(mutableMapOf()); fail.add(0); out.add(mutableListOf()) }
            cur = go[cur][ch]!!
        }
        out[cur].add(word)
    }
    fun build() {
        val q = ArrayDeque(go[0].values.toList())
        while (q.isNotEmpty()) {
            val u = q.removeFirst()
            for ((c, v) in go[u]) {
                var f = fail[u]
                while (f != 0 && !go[f].containsKey(c)) f = fail[f]
                fail[v] = go[f].getOrDefault(c, 0)
                if (fail[v] == v) fail[v] = 0
                out[v].addAll(out[fail[v]])
                q.addLast(v)
            }
        }
    }
}`,
      },
      {
        lang: "swift",
        code: `class AhoCorasick {
    var go: [[Character: Int]] = [[:]]
    var fail = [0]
    var out: [[String]] = [[]]
    func insert(_ word: String) {
        var cur = 0
        for ch in word {
            if go[cur][ch] == nil { let id = go.count; go[cur][ch] = id; go.append([:]); fail.append(0); out.append([]) }
            cur = go[cur][ch]!
        }
        out[cur].append(word)
    }
    func build() {
        var q = Array(go[0].values)
        var i = 0
        while i < q.count {
            let u = q[i]; i += 1
            for (c, v) in go[u] {
                var f = fail[u]
                while f != 0 && go[f][c] == nil { f = fail[f] }
                fail[v] = go[f][c] ?? 0
                if fail[v] == v { fail[v] = 0 }
                out[v] += out[fail[v]]
                q.append(v)
            }
        }
    }
}`,
      },
    ],
  },

  manacher: {
    id: "manacher",
    name: "Manacher",
    displayName: { en: "Manacher's Algorithm", zh: "Manacher 回文算法" },
    category: "string",
    difficulty: "intermediate",
    tags: ["string", "palindrome"],
    description: {
      en: "Finds the longest palindromic substring in O(n) by expanding palindromes within a known right boundary and reusing previously computed palindrome radii.",
      zh: "在 O(n) 时间内找出最长回文子串，利用已知的最右回文边界复用已计算的回文半径。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 5, titleSlug: "longest-palindromic-substring", difficulty: "medium" }],
    snippets: [
      {
        lang: "typescript",
        code: `function longestPalindrome(s: string): string {
  const t = "#" + s.split("").join("#") + "#";
  const n = t.length;
  const p = new Array<number>(n).fill(0);
  let center = 0, right = 0;
  for (let i = 0; i < n; i++) {
    const mirror = 2 * center - i;
    if (i < right) p[i] = Math.min(right - i, p[mirror]!);
    while (i - p[i]! - 1 >= 0 && i + p[i]! + 1 < n && t[i - p[i]! - 1] === t[i + p[i]! + 1]) p[i]!++;
    if (i + p[i]! > right) { center = i; right = i + p[i]!; }
  }
  const maxR = Math.max(...p);
  const ci = p.indexOf(maxR);
  return s.slice((ci - maxR) / 2, (ci + maxR) / 2);
}`,
      },
      {
        lang: "javascript",
        code: `function longestPalindrome(s) {
  const t = "#" + s.split("").join("#") + "#";
  const n = t.length, p = new Array(n).fill(0);
  let center = 0, right = 0;
  for (let i = 0; i < n; i++) {
    const mirror = 2 * center - i;
    if (i < right) p[i] = Math.min(right - i, p[mirror]);
    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && t[i - p[i] - 1] === t[i + p[i] + 1]) p[i]++;
    if (i + p[i] > right) { center = i; right = i + p[i]; }
  }
  const maxR = Math.max(...p);
  const ci = p.indexOf(maxR);
  return s.slice((ci - maxR) / 2, (ci + maxR) / 2);
}`,
      },
      {
        lang: "python",
        code: `def longest_palindrome(s: str) -> str:
    t = "#" + "#".join(s) + "#"
    n = len(t)
    p = [0] * n
    center = right = 0
    for i in range(n):
        mirror = 2 * center - i
        if i < right:
            p[i] = min(right - i, p[mirror])
        while i - p[i] - 1 >= 0 and i + p[i] + 1 < n and t[i - p[i] - 1] == t[i + p[i] + 1]:
            p[i] += 1
        if i + p[i] > right:
            center, right = i, i + p[i]
    max_r = max(p)
    ci = p.index(max_r)
    return s[(ci - max_r) // 2:(ci + max_r) // 2]`,
      },
      {
        lang: "java",
        code: `public String longestPalindrome(String s) {
    String t = "#" + String.join("#", s.split("")) + "#";
    int n = t.length();
    int[] p = new int[n];
    int center = 0, right = 0;
    for (int i = 0; i < n; i++) {
        int mirror = 2 * center - i;
        if (i < right) p[i] = Math.min(right - i, p[mirror]);
        while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n && t.charAt(i - p[i] - 1) == t.charAt(i + p[i] + 1)) p[i]++;
        if (i + p[i] > right) { center = i; right = i + p[i]; }
    }
    int maxR = 0, ci = 0;
    for (int i = 0; i < n; i++) if (p[i] > maxR) { maxR = p[i]; ci = i; }
    return s.substring((ci - maxR) / 2, (ci + maxR) / 2);
}`,
      },
      {
        lang: "rust",
        code: `fn longest_palindrome(s: &str) -> &str {
    let chars: Vec<char> = s.chars().collect();
    let n = chars.len();
    let mut t = vec!['#'];
    for &c in &chars { t.push(c); t.push('#'); }
    let tn = t.len();
    let mut p = vec![0usize; tn];
    let (mut center, mut right) = (0usize, 0usize);
    for i in 0..tn {
        let mirror = 2 * center - i.min(2 * center);
        if i < right { p[i] = (right - i).min(p[mirror]); }
        while p[i] + 1 <= i && i + p[i] + 1 < tn && t[i - p[i] - 1] == t[i + p[i] + 1] { p[i] += 1; }
        if i + p[i] > right { center = i; right = i + p[i]; }
    }
    let (max_r, ci) = p.iter().enumerate().max_by_key(|&(_, &v)| v).map(|(i, &v)| (v, i)).unwrap_or((0, 0));
    let start = (ci - max_r) / 2;
    &s[start..start + max_r]
}`,
      },
      {
        lang: "c",
        code: `char* longestPalindrome(char* s) {
    int sn = strlen(s), tn = 2 * sn + 3;
    char* t = malloc(tn + 1); int* p = calloc(tn, sizeof(int));
    t[0] = '^'; t[1] = '#';
    for (int i = 0; i < sn; i++) { t[2 * i + 2] = s[i]; t[2 * i + 3] = '#'; }
    t[tn - 1] = '$'; t[tn] = 0;
    int center = 0, right = 0;
    for (int i = 1; i < tn - 1; i++) {
        int mirror = 2 * center - i;
        if (i < right) p[i] = right - i < p[mirror] ? right - i : p[mirror];
        while (t[i + p[i] + 1] == t[i - p[i] - 1]) p[i]++;
        if (i + p[i] > right) { center = i; right = i + p[i]; }
    }
    int maxR = 0, ci = 0;
    for (int i = 1; i < tn - 1; i++) if (p[i] > maxR) { maxR = p[i]; ci = i; }
    char* res = malloc(maxR + 1); strncpy(res, s + (ci - maxR - 1) / 2, maxR); res[maxR] = 0;
    free(t); free(p); return res;
}`,
      },
      {
        lang: "cpp",
        code: `string longestPalindrome(string s) {
    string t = "^#";
    for (char c : s) { t += c; t += '#'; }
    t += '$';
    int n = t.size();
    vector<int> p(n, 0);
    int center = 0, right = 0;
    for (int i = 1; i < n - 1; i++) {
        int mirror = 2 * center - i;
        if (i < right) p[i] = min(right - i, p[mirror]);
        while (t[i + p[i] + 1] == t[i - p[i] - 1]) p[i]++;
        if (i + p[i] > right) { center = i; right = i + p[i]; }
    }
    int maxR = *max_element(p.begin(), p.end());
    int ci = max_element(p.begin(), p.end()) - p.begin();
    return s.substr((ci - maxR - 1) / 2, maxR);
}`,
      },
      {
        lang: "go",
        code: `func longestPalindrome(s string) string {
    t := "^#" + strings.Join(strings.Split(s, ""), "#") + "#$"
    n := len(t)
    p := make([]int, n)
    center, right := 0, 0
    for i := 1; i < n-1; i++ {
        mirror := 2*center - i
        if i < right { p[i] = min(right-i, p[mirror]) }
        for t[i+p[i]+1] == t[i-p[i]-1] { p[i]++ }
        if i+p[i] > right { center, right = i, i+p[i] }
    }
    maxR, ci := 0, 0
    for i, v := range p { if v > maxR { maxR = v; ci = i } }
    return s[(ci-maxR-1)/2 : (ci-maxR-1)/2+maxR]
}`,
      },
      {
        lang: "php",
        code: `function longestPalindrome(string $s): string {
    $t = "^#" . implode("#", str_split($s)) . "#$";
    $n = strlen($t); $p = array_fill(0, $n, 0);
    $center = 0; $right = 0;
    for ($i = 1; $i < $n - 1; $i++) {
        $mirror = 2 * $center - $i;
        if ($i < $right) $p[$i] = min($right - $i, $p[$mirror]);
        while ($t[$i + $p[$i] + 1] === $t[$i - $p[$i] - 1]) $p[$i]++;
        if ($i + $p[$i] > $right) { $center = $i; $right = $i + $p[$i]; }
    }
    $maxR = max($p); $ci = array_search($maxR, $p);
    return substr($s, ($ci - $maxR - 1) / 2, $maxR);
}`,
      },
      {
        lang: "kotlin",
        code: `fun longestPalindrome(s: String): String {
    val t = "^#" + s.map { it }.joinToString("#") + "#$"
    val n = t.length; val p = IntArray(n)
    var center = 0; var right = 0
    for (i in 1 until n - 1) {
        val mirror = 2 * center - i
        if (i < right) p[i] = minOf(right - i, p[mirror])
        while (t[i + p[i] + 1] == t[i - p[i] - 1]) p[i]++
        if (i + p[i] > right) { center = i; right = i + p[i] }
    }
    val maxR = p.max()!!; val ci = p.indexOfFirst { it == maxR }
    return s.substring((ci - maxR - 1) / 2, (ci - maxR - 1) / 2 + maxR)
}`,
      },
      {
        lang: "swift",
        code: `func longestPalindrome(_ s: String) -> String {
    let chars = Array(s)
    var t = [Character]()
    t.append("^"); t.append("#")
    for c in chars { t.append(c); t.append("#") }
    t.append("$")
    let n = t.count; var p = [Int](repeating: 0, count: n)
    var center = 0, right = 0
    for i in 1..<n - 1 {
        let mirror = 2 * center - i
        if i < right { p[i] = min(right - i, p[mirror]) }
        while t[i + p[i] + 1] == t[i - p[i] - 1] { p[i] += 1 }
        if i + p[i] > right { center = i; right = i + p[i] }
    }
    let maxR = p.max()!; let ci = p.firstIndex(of: maxR)!
    let start = (ci - maxR - 1) / 2
    return String(chars[start..<start + maxR])
}`,
      },
    ],
  },

  "suffix-array": {
    id: "suffix-array",
    name: "Suffix Array",
    displayName: { en: "Suffix Array", zh: "后缀数组" },
    category: "string",
    difficulty: "advanced",
    tags: ["string", "suffix-array", "sorting"],
    description: {
      en: "Builds a sorted array of all suffixes of a string in O(n log²n) using prefix doubling, enabling O(m log n) pattern search and LCP queries.",
      zh: "通过前缀倍增在 O(n log²n) 时间内构建字符串所有后缀的排序数组，支持 O(m log n) 的模式搜索和 LCP 查询。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n log²n)", average: "O(n log²n)", worst: "O(n log²n)" },
    spaceComplexity: "O(n)",
    snippets: [
      {
        lang: "typescript",
        code: `function buildSuffixArray(s: string): number[] {
  const n = s.length;
  let sa = Array.from({ length: n }, (_, i) => i);
  let rank = s.split("").map(c => c.charCodeAt(0));
  for (let gap = 1; gap < n; gap *= 2) {
    const r = rank.slice();
    sa.sort((a, b) => r[a]! - r[b]! || (r[a + gap] ?? -1) - (r[b + gap] ?? -1));
    rank[sa[0]!] = 0;
    for (let i = 1; i < n; i++) {
      rank[sa[i]!] = rank[sa[i - 1]!]! +
        ((r[sa[i]!]! !== r[sa[i - 1]!]! || (r[sa[i]! + gap] ?? -1) !== (r[sa[i - 1]! + gap] ?? -1)) ? 1 : 0);
    }
    if (rank[sa[n - 1]!] === n - 1) break;
  }
  return sa;
}`,
      },
      {
        lang: "javascript",
        code: `function buildSuffixArray(s) {
  const n = s.length;
  let sa = Array.from({ length: n }, (_, i) => i);
  let rank = s.split("").map(c => c.charCodeAt(0));
  for (let gap = 1; gap < n; gap *= 2) {
    const r = rank.slice();
    sa.sort((a, b) => r[a] - r[b] || (r[a + gap] ?? -1) - (r[b + gap] ?? -1));
    rank[sa[0]] = 0;
    for (let i = 1; i < n; i++) {
      rank[sa[i]] = rank[sa[i - 1]] + ((r[sa[i]] !== r[sa[i - 1]] || (r[sa[i] + gap] ?? -1) !== (r[sa[i - 1] + gap] ?? -1)) ? 1 : 0);
    }
    if (rank[sa[n - 1]] === n - 1) break;
  }
  return sa;
}`,
      },
      {
        lang: "python",
        code: `def build_suffix_array(s: str) -> list[int]:
    n = len(s)
    sa = list(range(n))
    rank = [ord(c) for c in s]
    gap = 1
    while gap < n:
        r = rank[:]
        sa.sort(key=lambda a: (r[a], r[a + gap] if a + gap < n else -1))
        rank[sa[0]] = 0
        for i in range(1, n):
            prev, cur = sa[i - 1], sa[i]
            same = r[prev] == r[cur] and (r[prev + gap] if prev + gap < n else -1) == (r[cur + gap] if cur + gap < n else -1)
            rank[cur] = rank[prev] + (0 if same else 1)
        if rank[sa[-1]] == n - 1:
            break
        gap *= 2
    return sa`,
      },
      {
        lang: "java",
        code: `public int[] buildSuffixArray(String s) {
    int n = s.length();
    Integer[] sa = new Integer[n];
    for (int i = 0; i < n; i++) sa[i] = i;
    int[] rank = new int[n];
    for (int i = 0; i < n; i++) rank[i] = s.charAt(i);
    for (int gap = 1; gap < n; gap *= 2) {
        final int[] r = rank.clone(); final int g = gap;
        Arrays.sort(sa, (a, b) -> r[a] != r[b] ? r[a] - r[b] : (a + g < n ? r[a + g] : -1) - (b + g < n ? r[b + g] : -1));
        rank[sa[0]] = 0;
        for (int i = 1; i < n; i++) {
            int prev = sa[i - 1], cur = sa[i];
            boolean same = r[prev] == r[cur] && (prev + g < n ? r[prev + g] : -1) == (cur + g < n ? r[cur + g] : -1);
            rank[cur] = rank[prev] + (same ? 0 : 1);
        }
        if (rank[sa[n - 1]] == n - 1) break;
    }
    return Arrays.stream(sa).mapToInt(Integer::intValue).toArray();
}`,
      },
      {
        lang: "rust",
        code: `fn build_suffix_array(s: &str) -> Vec<usize> {
    let n = s.len();
    let bytes = s.as_bytes();
    let mut sa: Vec<usize> = (0..n).collect();
    let mut rank: Vec<i64> = bytes.iter().map(|&b| b as i64).collect();
    let mut gap = 1usize;
    while gap < n {
        let r = rank.clone();
        sa.sort_by(|&a, &b| {
            let ra = r[a]; let rb = r[b];
            let ra2 = if a + gap < n { r[a + gap] } else { -1 };
            let rb2 = if b + gap < n { r[b + gap] } else { -1 };
            ra.cmp(&rb).then(ra2.cmp(&rb2))
        });
        rank[sa[0]] = 0;
        for i in 1..n {
            let (prev, cur) = (sa[i - 1], sa[i]);
            let same = r[prev] == r[cur] && (if prev + gap < n { r[prev + gap] } else { -1 }) == (if cur + gap < n { r[cur + gap] } else { -1 });
            rank[cur] = rank[prev] + if same { 0 } else { 1 };
        }
        if rank[sa[n - 1]] == (n - 1) as i64 { break; }
        gap *= 2;
    }
    sa
}`,
      },
      {
        lang: "c",
        code: `int cmpSA(const void* a, const void* b) {
    /* global rank/gap arrays omitted for brevity; see full implementation */
    return 0;
}
void buildSuffixArray(const char* s, int* sa) {
    int n = strlen(s);
    int* rank = malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) { sa[i] = i; rank[i] = (unsigned char)s[i]; }
    /* prefix-doubling loop — use qsort with rank capture via globals or pass struct */
    free(rank);
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> buildSuffixArray(const string& s) {
    int n = s.size();
    vector<int> sa(n), rank_(n), tmp(n);
    iota(sa.begin(), sa.end(), 0);
    for (int i = 0; i < n; i++) rank_[i] = s[i];
    for (int gap = 1; gap < n; gap *= 2) {
        auto cmp = [&](int a, int b) {
            if (rank_[a] != rank_[b]) return rank_[a] < rank_[b];
            int ra = a + gap < n ? rank_[a + gap] : -1;
            int rb = b + gap < n ? rank_[b + gap] : -1;
            return ra < rb;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) tmp[sa[i]] = tmp[sa[i-1]] + (cmp(sa[i-1], sa[i]) ? 1 : 0);
        rank_ = tmp;
        if (rank_[sa[n-1]] == n - 1) break;
    }
    return sa;
}`,
      },
      {
        lang: "go",
        code: `func buildSuffixArray(s string) []int {
    n := len(s)
    sa := make([]int, n)
    rank := make([]int, n)
    for i := range sa { sa[i] = i; rank[i] = int(s[i]) }
    for gap := 1; gap < n; gap *= 2 {
        r := append([]int(nil), rank...)
        sort.Slice(sa, func(i, j int) bool {
            a, b := sa[i], sa[j]
            if r[a] != r[b] { return r[a] < r[b] }
            ra, rb := -1, -1
            if a+gap < n { ra = r[a+gap] }
            if b+gap < n { rb = r[b+gap] }
            return ra < rb
        })
        rank[sa[0]] = 0
        for i := 1; i < n; i++ {
            prev, cur := sa[i-1], sa[i]
            ra, rb := -1, -1
            if prev+gap < n { ra = r[prev+gap] }; if cur+gap < n { rb = r[cur+gap] }
            if r[prev] == r[cur] && ra == rb { rank[cur] = rank[prev] } else { rank[cur] = rank[prev] + 1 }
        }
        if rank[sa[n-1]] == n-1 { break }
    }
    return sa
}`,
      },
      {
        lang: "php",
        code: `function buildSuffixArray(string $s): array {
    $n = strlen($s);
    $sa = range(0, $n - 1);
    $rank = array_map('ord', str_split($s));
    for ($gap = 1; $gap < $n; $gap *= 2) {
        $r = $rank;
        usort($sa, function($a, $b) use ($r, $gap, $n) {
            if ($r[$a] !== $r[$b]) return $r[$a] - $r[$b];
            $ra = $a + $gap < $n ? $r[$a + $gap] : -1;
            $rb = $b + $gap < $n ? $r[$b + $gap] : -1;
            return $ra - $rb;
        });
        $rank[$sa[0]] = 0;
        for ($i = 1; $i < $n; $i++) {
            $prev = $sa[$i - 1]; $cur = $sa[$i];
            $ra = $prev + $gap < $n ? $r[$prev + $gap] : -1;
            $rb = $cur + $gap < $n ? $r[$cur + $gap] : -1;
            $rank[$cur] = $rank[$prev] + ($r[$prev] === $r[$cur] && $ra === $rb ? 0 : 1);
        }
        if ($rank[$sa[$n - 1]] === $n - 1) break;
    }
    return $sa;
}`,
      },
      {
        lang: "kotlin",
        code: `fun buildSuffixArray(s: String): IntArray {
    val n = s.length
    val sa = (0 until n).toMutableList()
    val rank = IntArray(n) { s[it].code }
    var gap = 1
    while (gap < n) {
        val r = rank.copyOf()
        sa.sortWith(Comparator { a, b ->
            if (r[a] != r[b]) r[a] - r[b]
            else (if (a + gap < n) r[a + gap] else -1) - (if (b + gap < n) r[b + gap] else -1)
        })
        rank[sa[0]] = 0
        for (i in 1 until n) {
            val prev = sa[i - 1]; val cur = sa[i]
            val same = r[prev] == r[cur] && (if (prev + gap < n) r[prev + gap] else -1) == (if (cur + gap < n) r[cur + gap] else -1)
            rank[cur] = rank[prev] + if (same) 0 else 1
        }
        if (rank[sa[n - 1]] == n - 1) break
        gap *= 2
    }
    return sa.toIntArray()
}`,
      },
      {
        lang: "swift",
        code: `func buildSuffixArray(_ s: String) -> [Int] {
    let a = Array(s.unicodeScalars)
    let n = a.count
    var sa = Array(0..<n)
    var rank = a.map { Int($0.value) }
    var gap = 1
    while gap < n {
        let r = rank
        sa.sort {
            if r[$0] != r[$1] { return r[$0] < r[$1] }
            let ra = $0 + gap < n ? r[$0 + gap] : -1
            let rb = $1 + gap < n ? r[$1 + gap] : -1
            return ra < rb
        }
        rank[sa[0]] = 0
        for i in 1..<n {
            let prev = sa[i - 1], cur = sa[i]
            let ra = prev + gap < n ? r[prev + gap] : -1
            let rb = cur + gap < n ? r[cur + gap] : -1
            rank[cur] = rank[prev] + (r[prev] == r[cur] && ra == rb ? 0 : 1)
        }
        if rank[sa[n - 1]] == n - 1 { break }
        gap *= 2
    }
    return sa
}`,
      },
    ],
  },

  "hamming-distance": {
    id: "hamming-distance",
    name: "Hamming Distance",
    displayName: { en: "Hamming Distance", zh: "汉明距离" },
    category: "string",
    difficulty: "beginner",
    tags: ["string", "bit", "array"],
    description: {
      en: "Counts the number of positions at which two equal-length strings (or integers) differ. For integers it equals the number of 1-bits in their XOR.",
      zh: "统计两个等长字符串（或整数）在对应位置上不同字符的数量。对整数而言等于异或结果中 1 的个数。",
    },
    inPlace: false,
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 461, titleSlug: "hamming-distance", difficulty: "easy" }],
    snippets: [
      {
        lang: "typescript",
        code: `function hammingDistance(x: number, y: number): number {
  return (x ^ y).toString(2).split("").filter(b => b === "1").length;
}
// String variant
function hammingDistanceStr(a: string, b: string): number {
  if (a.length !== b.length) throw new Error("Strings must be equal length");
  let count = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;
  return count;
}`,
      },
      {
        lang: "javascript",
        code: `function hammingDistance(x, y) {
  return (x ^ y).toString(2).split("").filter(b => b === "1").length;
}
function hammingDistanceStr(a, b) {
  let count = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) count++;
  return count;
}`,
      },
      {
        lang: "python",
        code: `def hamming_distance(x: int, y: int) -> int:
    return bin(x ^ y).count('1')

def hamming_distance_str(a: str, b: str) -> int:
    return sum(c1 != c2 for c1, c2 in zip(a, b))`,
      },
      {
        lang: "java",
        code: `public int hammingDistance(int x, int y) {
    return Integer.bitCount(x ^ y);
}
public int hammingDistanceStr(String a, String b) {
    int count = 0;
    for (int i = 0; i < a.length(); i++) if (a.charAt(i) != b.charAt(i)) count++;
    return count;
}`,
      },
      {
        lang: "rust",
        code: `pub fn hamming_distance(x: i32, y: i32) -> i32 {
    (x ^ y).count_ones() as i32
}
pub fn hamming_distance_str(a: &str, b: &str) -> usize {
    a.chars().zip(b.chars()).filter(|(c1, c2)| c1 != c2).count()
}`,
      },
      {
        lang: "c",
        code: `int hammingDistance(int x, int y) {
    int n = x ^ y, count = 0;
    while (n) { count += n & 1; n >>= 1; }
    return count;
}
int hammingDistanceStr(const char* a, const char* b) {
    int count = 0;
    for (; *a && *b; a++, b++) if (*a != *b) count++;
    return count;
}`,
      },
      {
        lang: "cpp",
        code: `int hammingDistance(int x, int y) {
    return __builtin_popcount(x ^ y);
}
int hammingDistanceStr(const string& a, const string& b) {
    int count = 0;
    for (int i = 0; i < (int)a.size(); i++) if (a[i] != b[i]) count++;
    return count;
}`,
      },
      {
        lang: "go",
        code: `import "math/bits"
func hammingDistance(x, y int) int {
    return bits.OnesCount(uint(x ^ y))
}
func hammingDistanceStr(a, b string) int {
    count := 0
    for i := 0; i < len(a); i++ { if a[i] != b[i] { count++ } }
    return count
}`,
      },
      {
        lang: "php",
        code: `function hammingDistance(int $x, int $y): int {
    return substr_count(decbin($x ^ $y), '1');
}
function hammingDistanceStr(string $a, string $b): int {
    $count = 0;
    for ($i = 0; $i < strlen($a); $i++) if ($a[$i] !== $b[$i]) $count++;
    return $count;
}`,
      },
      {
        lang: "kotlin",
        code: `fun hammingDistance(x: Int, y: Int): Int = (x xor y).countOneBits()
fun hammingDistanceStr(a: String, b: String): Int = a.zip(b).count { (c1, c2) -> c1 != c2 }`,
      },
      {
        lang: "swift",
        code: `func hammingDistance(_ x: Int, _ y: Int) -> Int {
    return (x ^ y).nonzeroBitCount
}
func hammingDistanceStr(_ a: String, _ b: String) -> Int {
    return zip(a, b).filter { $0 != $1 }.count
}`,
      },
    ],
  },
}

// ─── Runner ───────────────────────────────────────────────────────────────────

function runHammingDistance(input: number[]): AlgorithmRun {
  const recorder = new ArrayTraceRecorder(input)
  const { values } = recorder
  const mid = Math.floor(values.length / 2)

  // Visualise element-by-element comparison of the two halves as char-code arrays
  recorder.range([0, mid - 1], "partition", 1)
  recorder.range([mid, values.length - 1], "partition", 1)

  let distance = 0
  for (let i = 0; i < mid; i++) {
    const j = mid + i
    const cmp = recorder.compareValue(i, j, values[i] ?? 0, values[j] ?? 0, 3)
    if (cmp !== 0) {
      recorder.mark([i, j], "active", 4)
      distance += 1
    } else {
      recorder.mark([i, j], "sorted", 5)
    }
  }

  // Write the distance into index 0 as a summary value
  recorder.write(0, distance, 8)
  return recorder.finish(stringAlgorithms["hamming-distance"])
}

// ─── KMP ─────────────────────────────────────────────────────────────────────
// Input: [...pattern, -1, ...text] (use -1 as separator)
// Visualises the failure function array (lps), then marks text positions during search.
function runKmp(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const pattern = sep > 0 ? input.slice(0, sep) : [1, 2, 1, 2, 3]
  const text = sep > 0 ? input.slice(sep + 1) : [1, 2, 1, 2, 1, 2, 3, 4]
  const m = pattern.length
  // Visualise the text array, marks will show matching windows
  const rec = new ArrayTraceRecorder([...text])
  // Build lps (failure function)
  const lps = new Array<number>(m).fill(0)
  let len = 0, i = 1
  while (i < m) {
    if ((pattern[i] ?? -1) === (pattern[len] ?? -2)) { lps[i++] = ++len }
    else if (len > 0) { len = lps[len - 1] ?? 0 }
    else { lps[i++] = 0 }
  }
  // Search
  let j = 0
  for (let ti = 0; ti < text.length; ) {
    rec.compareValue(ti, j, text[ti] ?? 0, pattern[j] ?? 0)
    if ((text[ti] ?? -1) === (pattern[j] ?? -2)) {
      rec.mark([ti], "active")
      ti++; j++
      if (j === m) {
        // Match found — mark the window
        for (let k = ti - m; k < ti; k++) rec.mark([k], "sorted")
        j = lps[j - 1] ?? 0
      }
    } else {
      rec.mark([ti], "visited")
      if (j > 0) j = lps[j - 1] ?? 0
      else ti++
    }
  }
  return rec.finish(stringAlgorithms["kmp"] as AlgorithmMeta)
}

// ─── Rabin-Karp ───────────────────────────────────────────────────────────────
function runRabinKarp(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const pattern = sep > 0 ? input.slice(0, sep) : [3, 1, 4]
  const text = sep > 0 ? input.slice(sep + 1) : [2, 3, 1, 4, 1, 5, 9, 2, 6]
  const rec = new ArrayTraceRecorder([...text])
  const m = pattern.length
  const BASE = 31, MOD = 1e9 + 9
  const patHash = pattern.reduce((h, v) => (h * BASE + v) % MOD, 0)
  let winHash = 0, power = 1
  for (let i = 0; i < m - 1; i++) power = (power * BASE) % MOD
  for (let i = 0; i < m && i < text.length; i++) winHash = (winHash * BASE + (text[i] ?? 0)) % MOD
  for (let i = 0; i <= text.length - m; i++) {
    rec.compareValue(i, 0, winHash, patHash)
    if (winHash === patHash) {
      // Verify character by character
      let match = true
      for (let k = 0; k < m; k++) {
        rec.compareValue(i + k, k, text[i + k] ?? 0, pattern[k] ?? 0)
        if ((text[i + k] ?? -1) !== (pattern[k] ?? -2)) { match = false; break }
      }
      for (let k = 0; k < m; k++) rec.mark([i + k], match ? "sorted" : "active")
    } else {
      rec.mark([i], "visited")
    }
    if (i + m < text.length) {
      winHash = ((winHash - (text[i] ?? 0) * power % MOD + MOD) * BASE + (text[i + m] ?? 0)) % MOD
    }
  }
  return rec.finish(stringAlgorithms["rabin-karp"] as AlgorithmMeta)
}

// ─── Z-Algorithm ─────────────────────────────────────────────────────────────
function runZAlgorithm(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [1, 2, 1, 3, 1, 2, 1]
  const n = arr.length
  const z = new Array<number>(n).fill(0)
  z[0] = n
  const rec = new ArrayTraceRecorder([...arr])
  let l = 0, r = 0
  for (let i = 1; i < n; i++) {
    if (i < r) z[i] = Math.min(r - i, z[i - l] ?? 0)
    while (i + (z[i] ?? 0) < n && (arr[z[i] ?? 0] ?? -1) === (arr[i + (z[i] ?? 0)] ?? -2)) {
      rec.compareValue(z[i] ?? 0, i + (z[i] ?? 0), arr[z[i] ?? 0] ?? 0, arr[i + (z[i] ?? 0)] ?? 0)
      z[i] = (z[i] ?? 0) + 1
    }
    if (i + (z[i] ?? 0) > r) { l = i; r = i + (z[i] ?? 0) }
    rec.mark([i], (z[i] ?? 0) > 1 ? "sorted" : "active")
  }
  return rec.finish(stringAlgorithms["z-algorithm"] as AlgorithmMeta)
}

// ─── Manacher ────────────────────────────────────────────────────────────────
function runManacher(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [1, 2, 3, 2, 1, 4, 4, 1]
  // Transform: insert 0 between each element as separator
  const t: number[] = [0]
  for (const v of arr) { t.push(v); t.push(0) }
  const n = t.length
  const p = new Array<number>(n).fill(0)
  const rec = new ArrayTraceRecorder([...arr])
  let c = 0, rBound = 0
  for (let i = 1; i < n - 1; i++) {
    const mirror = 2 * c - i
    if (i < rBound) p[i] = Math.min(rBound - i, p[mirror] ?? 0)
    while (i - (p[i] ?? 0) - 1 >= 0 && i + (p[i] ?? 0) + 1 < n && (t[i - (p[i] ?? 0) - 1] ?? -1) === (t[i + (p[i] ?? 0) + 1] ?? -2)) {
      p[i] = (p[i] ?? 0) + 1
    }
    if (i + (p[i] ?? 0) > rBound) { c = i; rBound = i + (p[i] ?? 0) }
    // Map back to original index
    const origIdx = Math.floor(i / 2)
    if (origIdx < arr.length) {
      rec.mark([origIdx], (p[i] ?? 0) > 1 ? "sorted" : "active")
    }
  }
  return rec.finish(stringAlgorithms["manacher"] as AlgorithmMeta)
}

// ─── Aho-Corasick ────────────────────────────────────────────────────────────
// Simplified: treat input as text + patterns separated by -1
// Visualises text scan with matches highlighted
function runAhoCorasick(input: number[]): AlgorithmRun {
  const sep = input.indexOf(-1)
  const text = sep > 0 ? input.slice(0, sep) : [1, 2, 3, 4, 1, 2, 5]
  const patternRaw = sep > 0 ? input.slice(sep + 1) : [1, 2, 3, 1, 2]
  // Split patterns by -2
  const patterns: number[][] = []
  let cur: number[] = []
  for (const v of patternRaw) {
    if (v === -2) { if (cur.length) patterns.push(cur); cur = [] }
    else cur.push(v)
  }
  if (cur.length) patterns.push(cur)
  if (patterns.length === 0) patterns.push(patternRaw.slice(0, 3))
  const rec = new ArrayTraceRecorder([...text])
  // Naive multi-pattern search for visualisation
  for (let i = 0; i < text.length; i++) {
    let matched = false
    for (const pat of patterns) {
      if (pat.every((v, k) => (text[i + k] ?? -1) === v)) {
        for (let k = 0; k < pat.length; k++) rec.mark([i + k], "sorted")
        matched = true; break
      }
    }
    rec.compareValue(i, 0, text[i] ?? 0, patterns[0]?.[0] ?? 0)
    if (!matched) rec.mark([i], "visited")
  }
  return rec.finish(stringAlgorithms["aho-corasick"] as AlgorithmMeta)
}

// ─── Suffix Array ─────────────────────────────────────────────────────────────
function runSuffixArray(input: number[]): AlgorithmRun {
  const arr = input.length > 0 ? input : [3, 1, 4, 1, 5, 9, 2, 6]
  const n = arr.length
  // Build suffix array by sorting suffix indices
  const sa = Array.from({ length: n }, (_, i) => i)
  const rec = new ArrayTraceRecorder([...arr])
  sa.sort((a, b) => {
    for (let k = 0; k < n - Math.max(a, b); k++) {
      rec.compareValue(a + k, b + k, arr[a + k] ?? 0, arr[b + k] ?? 0)
      const diff = (arr[a + k] ?? 0) - (arr[b + k] ?? 0)
      if (diff !== 0) return diff
    }
    return a - b
  })
  // Mark positions in SA order
  sa.forEach((origIdx, rank) => {
    rec.mark([origIdx], rank < n / 2 ? "sorted" : "active")
  })
  return rec.finish(stringAlgorithms["suffix-array"] as AlgorithmMeta)
}

export function runStringAlgorithm(id: StringAlgorithmId, input: number[]): AlgorithmRun {
  switch (id) {
    case "hamming-distance": return runHammingDistance(input)
    case "kmp": return runKmp(input)
    case "rabin-karp": return runRabinKarp(input)
    case "z-algorithm": return runZAlgorithm(input)
    case "manacher": return runManacher(input)
    case "aho-corasick": return runAhoCorasick(input)
    case "suffix-array": return runSuffixArray(input)
    default: return runHammingDistance(input)
  }
}
