import type { AlgorithmMeta } from "@algomotion/shared"

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const mathAlgorithms: Record<string, AlgorithmMeta> = {
  "sieve-of-eratosthenes": {
    id: "sieve-of-eratosthenes",
    name: "Sieve of Eratosthenes",
    displayName: { en: "Sieve of Eratosthenes", zh: "埃拉托斯特尼筛法" },
    category: "math",
    difficulty: "intermediate",
    tags: ["math", "prime", "sieve"],
    description: {
      en: "Finds all prime numbers up to n by iteratively marking the multiples of each prime starting from 2.",
      zh: "从2开始，依次筛去每个素数的倍数，找出所有不超过n的素数。",
    },
    timeComplexity: { best: "O(n log log n)", average: "O(n log log n)", worst: "O(n log log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 204, titleSlug: "count-primes", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime.reduce((acc, v, i) => (v ? [...acc, i] : acc), []);
}`,
      },
      {
        lang: "typescript",
        code: `function sieve(n: number): number[] {
  const isPrime: boolean[] = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }
  return isPrime.reduce<number[]>((acc, v, i) => (v ? [...acc, i] : acc), []);
}`,
      },
      {
        lang: "java",
        code: `import java.util.*;
public List<Integer> sieve(int n) {
    boolean[] isPrime = new boolean[n + 1];
    Arrays.fill(isPrime, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; (long) i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }
    List<Integer> primes = new ArrayList<>();
    for (int i = 2; i <= n; i++) {
        if (isPrime[i]) primes.add(i);
    }
    return primes;
}`,
      },
      {
        lang: "python",
        code: `def sieve(n: int) -> list[int]:
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    i = 2
    while i * i <= n:
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
        i += 1
    return [i for i, v in enumerate(is_prime) if v]`,
      },
      {
        lang: "rust",
        code: `fn sieve(n: usize) -> Vec<usize> {
    let mut is_prime = vec![true; n + 1];
    is_prime[0] = false;
    if n > 0 { is_prime[1] = false; }
    let mut i = 2;
    while i * i <= n {
        if is_prime[i] {
            let mut j = i * i;
            while j <= n {
                is_prime[j] = false;
                j += i;
            }
        }
        i += 1;
    }
    (0..=n).filter(|&x| is_prime[x]).collect()
}`,
      },
      {
        lang: "c",
        code: `#include <stdlib.h>
int* sieve(int n, int* count) {
    int* isPrime = calloc(n + 1, sizeof(int));
    for (int i = 0; i <= n; i++) isPrime[i] = 1;
    isPrime[0] = isPrime[1] = 0;
    for (int i = 2; (long long)i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = 0;
        }
    }
    *count = 0;
    for (int i = 2; i <= n; i++) if (isPrime[i]) (*count)++;
    int* primes = malloc(*count * sizeof(int));
    int k = 0;
    for (int i = 2; i <= n; i++) if (isPrime[i]) primes[k++] = i;
    free(isPrime);
    return primes;
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
std::vector<int> sieve(int n) {
    std::vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int i = 2; (long long)i * i <= n; i++) {
        if (isPrime[i]) {
            for (int j = i * i; j <= n; j += i)
                isPrime[j] = false;
        }
    }
    std::vector<int> primes;
    for (int i = 2; i <= n; i++)
        if (isPrime[i]) primes.push_back(i);
    return primes;
}`,
      },
      {
        lang: "go",
        code: `func sieve(n int) []int {
    isPrime := make([]bool, n+1)
    for i := range isPrime { isPrime[i] = true }
    isPrime[0] = false
    if n > 0 { isPrime[1] = false }
    for i := 2; i*i <= n; i++ {
        if isPrime[i] {
            for j := i * i; j <= n; j += i {
                isPrime[j] = false
            }
        }
    }
    var primes []int
    for i := 2; i <= n; i++ {
        if isPrime[i] { primes = append(primes, i) }
    }
    return primes
}`,
      },
      {
        lang: "php",
        code: `function sieve(int $n): array {
    $isPrime = array_fill(0, $n + 1, true);
    $isPrime[0] = $isPrime[1] = false;
    for ($i = 2; $i * $i <= $n; $i++) {
        if ($isPrime[$i]) {
            for ($j = $i * $i; $j <= $n; $j += $i) {
                $isPrime[$j] = false;
            }
        }
    }
    $primes = [];
    for ($i = 2; $i <= $n; $i++) {
        if ($isPrime[$i]) $primes[] = $i;
    }
    return $primes;
}`,
      },
      {
        lang: "kotlin",
        code: `fun sieve(n: Int): List<Int> {
    val isPrime = BooleanArray(n + 1) { true }
    isPrime[0] = false
    if (n > 0) isPrime[1] = false
    var i = 2
    while (i.toLong() * i <= n) {
        if (isPrime[i]) {
            var j = i * i
            while (j <= n) { isPrime[j] = false; j += i }
        }
        i++
    }
    return (2..n).filter { isPrime[it] }
}`,
      },
      {
        lang: "swift",
        code: `func sieve(_ n: Int) -> [Int] {
    guard n >= 2 else { return [] }
    var isPrime = Array(repeating: true, count: n + 1)
    isPrime[0] = false; isPrime[1] = false
    var i = 2
    while i * i <= n {
        if isPrime[i] {
            var j = i * i
            while j <= n { isPrime[j] = false; j += i }
        }
        i += 1
    }
    return (2...n).filter { isPrime[$0] }
}`,
      },
    ],
  },

  "gcd-lcm": {
    id: "gcd-lcm",
    name: "GCD & LCM",
    displayName: { en: "GCD & LCM", zh: "最大公约数与最小公倍数" },
    category: "math",
    difficulty: "beginner",
    tags: ["math", "number-theory", "gcd", "lcm"],
    description: {
      en: "Computes the greatest common divisor using the Euclidean algorithm, then derives the LCM as (a*b)/gcd(a,b).",
      zh: "利用欧几里得算法求最大公约数，再通过 a*b/gcd 求最小公倍数。",
    },
    timeComplexity: { best: "O(log min(a,b))", average: "O(log min(a,b))", worst: "O(log min(a,b))" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 1979, titleSlug: "find-greatest-common-divisor-of-array", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}`,
      },
      {
        lang: "typescript",
        code: `function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}`,
      },
      {
        lang: "java",
        code: `public int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

public long lcm(int a, int b) {
    return (long) a / gcd(a, b) * b;
}`,
      },
      {
        lang: "python",
        code: `from math import gcd

def lcm(a: int, b: int) -> int:
    return a // gcd(a, b) * b

# Manual GCD using Euclidean algorithm
def gcd_manual(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a`,
      },
      {
        lang: "rust",
        code: `fn gcd(mut a: u64, mut b: u64) -> u64 {
    while b != 0 {
        let t = b;
        b = a % b;
        a = t;
    }
    a
}

fn lcm(a: u64, b: u64) -> u64 {
    a / gcd(a, b) * b
}`,
      },
      {
        lang: "c",
        code: `long long gcd(long long a, long long b) {
    while (b) {
        long long t = b;
        b = a % b;
        a = t;
    }
    return a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}`,
      },
      {
        lang: "cpp",
        code: `#include <numeric> // std::gcd, std::lcm (C++17)

long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        std::swap(a, b);
    }
    return a;
}

long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;
}`,
      },
      {
        lang: "go",
        code: `func gcd(a, b int) int {
    for b != 0 {
        a, b = b, a%b
    }
    return a
}

func lcm(a, b int) int {
    return a / gcd(a, b) * b
}`,
      },
      {
        lang: "php",
        code: `function gcd(int $a, int $b): int {
    while ($b !== 0) {
        [$a, $b] = [$b, $a % $b];
    }
    return $a;
}

function lcm(int $a, int $b): int {
    return intdiv($a, gcd($a, $b)) * $b;
}`,
      },
      {
        lang: "kotlin",
        code: `fun gcd(a: Long, b: Long): Long {
    var x = a; var y = b
    while (y != 0L) {
        val t = y; y = x % y; x = t
    }
    return x
}

fun lcm(a: Long, b: Long): Long = a / gcd(a, b) * b`,
      },
      {
        lang: "swift",
        code: `func gcd(_ a: Int, _ b: Int) -> Int {
    var a = a, b = b
    while b != 0 { (a, b) = (b, a % b) }
    return a
}

func lcm(_ a: Int, _ b: Int) -> Int {
    return a / gcd(a, b) * b
}`,
      },
    ],
  },

  "fast-power": {
    id: "fast-power",
    name: "Fast Power (Binary Exponentiation)",
    displayName: { en: "Fast Power", zh: "快速幂" },
    category: "math",
    difficulty: "intermediate",
    tags: ["math", "recursion", "divide-conquer"],
    description: {
      en: "Computes x^n in O(log n) time by squaring, optionally with a modulo for large numbers.",
      zh: "通过反复平方在 O(log n) 时间内计算 x^n，可带模运算防止溢出。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 50, titleSlug: "powx-n", difficulty: "medium" },
      { id: 372, titleSlug: "super-pow", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function fastPow(base, exp, mod = null) {
  let result = 1n;
  base = BigInt(base);
  exp = BigInt(exp);
  if (mod) mod = BigInt(mod);
  while (exp > 0n) {
    if (exp & 1n) result = mod ? result * base % mod : result * base;
    base = mod ? base * base % mod : base * base;
    exp >>= 1n;
  }
  return Number(result);
}`,
      },
      {
        lang: "typescript",
        code: `function fastPow(base: number, exp: number, mod?: number): number {
  let result = 1n;
  let b = BigInt(base);
  let e = BigInt(exp);
  const m = mod ? BigInt(mod) : undefined;
  while (e > 0n) {
    if (e & 1n) result = m ? result * b % m : result * b;
    b = m ? b * b % m : b * b;
    e >>= 1n;
  }
  return Number(result);
}`,
      },
      {
        lang: "java",
        code: `public long fastPow(long base, long exp, long mod) {
    long result = 1;
    base %= mod;
    while (exp > 0) {
        if ((exp & 1) == 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}`,
      },
      {
        lang: "python",
        code: `def fast_pow(base: int, exp: int, mod: int | None = None) -> int:
    result = 1
    if mod:
        base %= mod
    while exp > 0:
        if exp & 1:
            result = result * base % mod if mod else result * base
        base = base * base % mod if mod else base * base
        exp >>= 1
    return result

# Python built-in: pow(base, exp, mod)`,
      },
      {
        lang: "rust",
        code: `fn fast_pow(mut base: u64, mut exp: u64, modulus: u64) -> u64 {
    let mut result = 1u64;
    base %= modulus;
    while exp > 0 {
        if exp & 1 == 1 {
            result = result * base % modulus;
        }
        base = base * base % modulus;
        exp >>= 1;
    }
    result
}`,
      },
      {
        lang: "c",
        code: `long long fast_pow(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `long long fastPow(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func fastPow(base, exp, mod int64) int64 {
    result := int64(1)
    base %= mod
    for exp > 0 {
        if exp&1 == 1 {
            result = result * base % mod
        }
        base = base * base % mod
        exp >>= 1
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function fastPow(int $base, int $exp, int $mod): int {
    $result = 1;
    $base %= $mod;
    while ($exp > 0) {
        if ($exp & 1) $result = $result * $base % $mod;
        $base = $base * $base % $mod;
        $exp >>= 1;
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun fastPow(base: Long, exp: Long, mod: Long): Long {
    var result = 1L
    var b = base % mod
    var e = exp
    while (e > 0) {
        if (e and 1L == 1L) result = result * b % mod
        b = b * b % mod
        e = e shr 1
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func fastPow(_ base: Int, _ exp: Int, _ mod: Int) -> Int {
    var result = 1
    var b = base % mod
    var e = exp
    while e > 0 {
        if e & 1 == 1 { result = result * b % mod }
        b = b * b % mod
        e >>= 1
    }
    return result
}`,
      },
    ],
  },

  "prime-factorization": {
    id: "prime-factorization",
    name: "Prime Factorization",
    displayName: { en: "Prime Factorization", zh: "质因数分解" },
    category: "math",
    difficulty: "intermediate",
    tags: ["math", "prime", "number-theory"],
    description: {
      en: "Decomposes an integer into its prime factors by trial division up to the square root.",
      zh: "对整数做试除法，将其分解为质因数之积，只需试除到平方根。",
    },
    timeComplexity: { best: "O(√n)", average: "O(√n)", worst: "O(√n)" },
    spaceComplexity: "O(log n)",
    relatedProblems: [
      { id: 2507, titleSlug: "smallest-value-after-replacing-with-sum-of-prime-factors", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function primeFactors(n) {
  const factors = [];
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}`,
      },
      {
        lang: "typescript",
        code: `function primeFactors(n: number): number[] {
  const factors: number[] = [];
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.push(d);
      n = Math.floor(n / d);
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}`,
      },
      {
        lang: "java",
        code: `public List<Integer> primeFactors(int n) {
    List<Integer> factors = new ArrayList<>();
    for (int d = 2; (long) d * d <= n; d++) {
        while (n % d == 0) {
            factors.add(d);
            n /= d;
        }
    }
    if (n > 1) factors.add(n);
    return factors;
}`,
      },
      {
        lang: "python",
        code: `def prime_factors(n: int) -> list[int]:
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors`,
      },
      {
        lang: "rust",
        code: `fn prime_factors(mut n: u64) -> Vec<u64> {
    let mut factors = Vec::new();
    let mut d = 2u64;
    while d * d <= n {
        while n % d == 0 {
            factors.push(d);
            n /= d;
        }
        d += 1;
    }
    if n > 1 { factors.push(n); }
    factors
}`,
      },
      {
        lang: "c",
        code: `#include <stdlib.h>
int* primeFactors(long long n, int* count) {
    int* factors = malloc(64 * sizeof(int));
    *count = 0;
    for (long long d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            factors[(*count)++] = (int)d;
            n /= d;
        }
    }
    if (n > 1) factors[(*count)++] = (int)n;
    return factors;
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
std::vector<long long> primeFactors(long long n) {
    std::vector<long long> factors;
    for (long long d = 2; d * d <= n; d++) {
        while (n % d == 0) {
            factors.push_back(d);
            n /= d;
        }
    }
    if (n > 1) factors.push_back(n);
    return factors;
}`,
      },
      {
        lang: "go",
        code: `func primeFactors(n int) []int {
    var factors []int
    for d := 2; d*d <= n; d++ {
        for n%d == 0 {
            factors = append(factors, d)
            n /= d
        }
    }
    if n > 1 { factors = append(factors, n) }
    return factors
}`,
      },
      {
        lang: "php",
        code: `function primeFactors(int $n): array {
    $factors = [];
    for ($d = 2; $d * $d <= $n; $d++) {
        while ($n % $d === 0) {
            $factors[] = $d;
            $n = intdiv($n, $d);
        }
    }
    if ($n > 1) $factors[] = $n;
    return $factors;
}`,
      },
      {
        lang: "kotlin",
        code: `fun primeFactors(n: Long): List<Long> {
    val factors = mutableListOf<Long>()
    var x = n
    var d = 2L
    while (d * d <= x) {
        while (x % d == 0L) { factors.add(d); x /= d }
        d++
    }
    if (x > 1) factors.add(x)
    return factors
}`,
      },
      {
        lang: "swift",
        code: `func primeFactors(_ n: Int) -> [Int] {
    var factors = [Int]()
    var x = n, d = 2
    while d * d <= x {
        while x % d == 0 { factors.append(d); x /= d }
        d += 1
    }
    if x > 1 { factors.append(x) }
    return factors
}`,
      },
    ],
  },

  "pascal-triangle": {
    id: "pascal-triangle",
    name: "Pascal's Triangle",
    displayName: { en: "Pascal's Triangle", zh: "杨辉三角" },
    category: "math",
    difficulty: "beginner",
    tags: ["math", "dp", "array"],
    description: {
      en: "Generates the first n rows of Pascal's triangle where each element is the sum of the two above it.",
      zh: "生成杨辉三角前 n 行，每个元素等于其正上方与左上方两数之和。",
    },
    timeComplexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(n²)",
    relatedProblems: [
      { id: 118, titleSlug: "pascals-triangle", difficulty: "easy" },
      { id: 119, titleSlug: "pascals-triangle-ii", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function generate(numRows) {
  const triangle = [];
  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle;
}`,
      },
      {
        lang: "typescript",
        code: `function generate(numRows: number): number[][] {
  const triangle: number[][] = [];
  for (let i = 0; i < numRows; i++) {
    const row: number[] = new Array(i + 1).fill(1);
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    triangle.push(row);
  }
  return triangle;
}`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> generate(int numRows) {
    List<List<Integer>> triangle = new ArrayList<>();
    for (int i = 0; i < numRows; i++) {
        List<Integer> row = new ArrayList<>();
        for (int j = 0; j <= i; j++) {
            if (j == 0 || j == i) row.add(1);
            else row.add(triangle.get(i-1).get(j-1) + triangle.get(i-1).get(j));
        }
        triangle.add(row);
    }
    return triangle;
}`,
      },
      {
        lang: "python",
        code: `def generate(num_rows: int) -> list[list[int]]:
    triangle = []
    for i in range(num_rows):
        row = [1] * (i + 1)
        for j in range(1, i):
            row[j] = triangle[i-1][j-1] + triangle[i-1][j]
        triangle.append(row)
    return triangle`,
      },
      {
        lang: "rust",
        code: `fn generate(num_rows: usize) -> Vec<Vec<u64>> {
    let mut triangle: Vec<Vec<u64>> = Vec::new();
    for i in 0..num_rows {
        let mut row = vec![1u64; i + 1];
        for j in 1..i {
            row[j] = triangle[i-1][j-1] + triangle[i-1][j];
        }
        triangle.push(row);
    }
    triangle
}`,
      },
      {
        lang: "c",
        code: `int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    int** triangle = malloc(numRows * sizeof(int*));
    *returnColumnSizes = malloc(numRows * sizeof(int));
    *returnSize = numRows;
    for (int i = 0; i < numRows; i++) {
        triangle[i] = calloc(i + 1, sizeof(int));
        (*returnColumnSizes)[i] = i + 1;
        triangle[i][0] = triangle[i][i] = 1;
        for (int j = 1; j < i; j++)
            triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
    }
    return triangle;
}`,
      },
      {
        lang: "cpp",
        code: `#include <vector>
std::vector<std::vector<int>> generate(int numRows) {
    std::vector<std::vector<int>> triangle;
    for (int i = 0; i < numRows; i++) {
        std::vector<int> row(i + 1, 1);
        for (int j = 1; j < i; j++)
            row[j] = triangle[i-1][j-1] + triangle[i-1][j];
        triangle.push_back(row);
    }
    return triangle;
}`,
      },
      {
        lang: "go",
        code: `func generate(numRows int) [][]int {
    triangle := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        row := make([]int, i+1)
        row[0], row[i] = 1, 1
        for j := 1; j < i; j++ {
            row[j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
        triangle[i] = row
    }
    return triangle
}`,
      },
      {
        lang: "php",
        code: `function generate(int $numRows): array {
    $triangle = [];
    for ($i = 0; $i < $numRows; $i++) {
        $row = array_fill(0, $i + 1, 1);
        for ($j = 1; $j < $i; $j++) {
            $row[$j] = $triangle[$i-1][$j-1] + $triangle[$i-1][$j];
        }
        $triangle[] = $row;
    }
    return $triangle;
}`,
      },
      {
        lang: "kotlin",
        code: `fun generate(numRows: Int): List<List<Int>> {
    val triangle = mutableListOf<List<Int>>()
    for (i in 0 until numRows) {
        val row = MutableList(i + 1) { 1 }
        for (j in 1 until i) {
            row[j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
        triangle.add(row)
    }
    return triangle
}`,
      },
      {
        lang: "swift",
        code: `func generate(_ numRows: Int) -> [[Int]] {
    var triangle = [[Int]]()
    for i in 0..<numRows {
        var row = Array(repeating: 1, count: i + 1)
        for j in 1..<i {
            row[j] = triangle[i-1][j-1] + triangle[i-1][j]
        }
        triangle.append(row)
    }
    return triangle
}`,
      },
    ],
  },

  "bit-manipulation": {
    id: "bit-manipulation",
    name: "Bit Manipulation",
    displayName: { en: "Bit Manipulation Basics", zh: "位运算基础" },
    category: "math",
    difficulty: "beginner",
    tags: ["bit", "math"],
    description: {
      en: "Common bit tricks: count set bits, check/set/clear a bit, detect power of two, and isolate the lowest set bit.",
      zh: "常见位运算技巧：统计置位数、检查/置位/清位、判断2的幂次、提取最低有效位。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 191, titleSlug: "number-of-1-bits", difficulty: "easy" },
      { id: 136, titleSlug: "single-number", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Count set bits (popcount)
const popcount = n => { let c = 0; while (n) { n &= n - 1; c++; } return c; };
// Check bit k
const getBit  = (n, k) => (n >> k) & 1;
// Set bit k
const setBit  = (n, k) => n | (1 << k);
// Clear bit k
const clrBit  = (n, k) => n & ~(1 << k);
// Toggle bit k
const togBit  = (n, k) => n ^ (1 << k);
// Is power of two?
const isPow2  = n => n > 0 && (n & (n - 1)) === 0;
// Lowest set bit
const lsb     = n => n & (-n);`,
      },
      {
        lang: "typescript",
        code: `const popcount = (n: number): number => { let c = 0; while (n) { n &= n - 1; c++; } return c; };
const getBit  = (n: number, k: number): number => (n >> k) & 1;
const setBit  = (n: number, k: number): number => n | (1 << k);
const clrBit  = (n: number, k: number): number => n & ~(1 << k);
const togBit  = (n: number, k: number): number => n ^ (1 << k);
const isPow2  = (n: number): boolean => n > 0 && (n & (n - 1)) === 0;
const lsb     = (n: number): number => n & (-n);`,
      },
      {
        lang: "java",
        code: `public int popcount(int n) {
    return Integer.bitCount(n); // built-in
}
public int getBit(int n, int k)  { return (n >> k) & 1; }
public int setBit(int n, int k)  { return n | (1 << k); }
public int clrBit(int n, int k)  { return n & ~(1 << k); }
public int togBit(int n, int k)  { return n ^ (1 << k); }
public boolean isPow2(int n)     { return n > 0 && (n & (n - 1)) == 0; }
public int lsb(int n)            { return n & (-n); }`,
      },
      {
        lang: "python",
        code: `def popcount(n: int) -> int:
    return bin(n).count('1')  # or n.bit_count() in Python 3.10+

def get_bit(n: int, k: int) -> int: return (n >> k) & 1
def set_bit(n: int, k: int) -> int: return n | (1 << k)
def clr_bit(n: int, k: int) -> int: return n & ~(1 << k)
def tog_bit(n: int, k: int) -> int: return n ^ (1 << k)
def is_pow2(n: int) -> bool: return n > 0 and (n & (n - 1)) == 0
def lsb(n: int) -> int: return n & (-n)`,
      },
      {
        lang: "rust",
        code: `fn popcount(n: u32) -> u32 { n.count_ones() }
fn get_bit(n: u32, k: u32) -> u32 { (n >> k) & 1 }
fn set_bit(n: u32, k: u32) -> u32 { n | (1 << k) }
fn clr_bit(n: u32, k: u32) -> u32 { n & !(1 << k) }
fn tog_bit(n: u32, k: u32) -> u32 { n ^ (1 << k) }
fn is_pow2(n: u32) -> bool { n > 0 && (n & (n - 1)) == 0 }
fn lsb(n: i32) -> i32 { n & (-n) }`,
      },
      {
        lang: "c",
        code: `#include <stdint.h>
int popcount(uint32_t n) { return __builtin_popcount(n); }
int get_bit(uint32_t n, int k)  { return (n >> k) & 1; }
uint32_t set_bit(uint32_t n, int k)  { return n | (1u << k); }
uint32_t clr_bit(uint32_t n, int k)  { return n & ~(1u << k); }
uint32_t tog_bit(uint32_t n, int k)  { return n ^ (1u << k); }
int is_pow2(uint32_t n)  { return n > 0 && (n & (n - 1)) == 0; }
uint32_t lsb(uint32_t n) { return n & (~n + 1); }`,
      },
      {
        lang: "cpp",
        code: `#include <bit>      // C++20
#include <cstdint>
int popcount(uint32_t n)          { return std::popcount(n); }
int getBit(uint32_t n, int k)     { return (n >> k) & 1; }
uint32_t setBit(uint32_t n, int k){ return n | (1u << k); }
uint32_t clrBit(uint32_t n, int k){ return n & ~(1u << k); }
uint32_t togBit(uint32_t n, int k){ return n ^ (1u << k); }
bool isPow2(uint32_t n)           { return n > 0 && std::has_single_bit(n); }
uint32_t lsb(uint32_t n)          { return n & (~n + 1); }`,
      },
      {
        lang: "go",
        code: `import "math/bits"

func popcount(n uint) int { return bits.OnesCount(n) }
func getBit(n uint, k uint) uint { return (n >> k) & 1 }
func setBit(n uint, k uint) uint { return n | (1 << k) }
func clrBit(n uint, k uint) uint { return n &^ (1 << k) }
func togBit(n uint, k uint) uint { return n ^ (1 << k) }
func isPow2(n uint) bool         { return n > 0 && (n&(n-1)) == 0 }
func lsb(n int) int              { return n & (-n) }`,
      },
      {
        lang: "php",
        code: `function popcount(int $n): int {
    return substr_count(decbin($n), '1');
}
function getBit(int $n, int $k): int  { return ($n >> $k) & 1; }
function setBit(int $n, int $k): int  { return $n | (1 << $k); }
function clrBit(int $n, int $k): int  { return $n & ~(1 << $k); }
function togBit(int $n, int $k): int  { return $n ^ (1 << $k); }
function isPow2(int $n): bool         { return $n > 0 && ($n & ($n - 1)) === 0; }
function lsb(int $n): int             { return $n & (-$n); }`,
      },
      {
        lang: "kotlin",
        code: `fun popcount(n: Int): Int = n.countOneBits()
fun getBit(n: Int, k: Int): Int  = (n shr k) and 1
fun setBit(n: Int, k: Int): Int  = n or (1 shl k)
fun clrBit(n: Int, k: Int): Int  = n and (1 shl k).inv()
fun togBit(n: Int, k: Int): Int  = n xor (1 shl k)
fun isPow2(n: Int): Boolean      = n > 0 && (n and (n - 1)) == 0
fun lsb(n: Int): Int             = n and (-n)`,
      },
      {
        lang: "swift",
        code: `func popcount(_ n: UInt32) -> Int { return n.nonzeroBitCount }
func getBit(_ n: Int, _ k: Int) -> Int  { return (n >> k) & 1 }
func setBit(_ n: Int, _ k: Int) -> Int  { return n | (1 << k) }
func clrBit(_ n: Int, _ k: Int) -> Int  { return n & ~(1 << k) }
func togBit(_ n: Int, _ k: Int) -> Int  { return n ^ (1 << k) }
func isPow2(_ n: Int) -> Bool           { return n > 0 && (n & (n - 1)) == 0 }
func lsb(_ n: Int) -> Int               { return n & (-n) }`,
      },
    ],
  },

  dft: {
    id: "dft",
    name: "Discrete Fourier Transform (FFT)",
    displayName: { en: "DFT / FFT", zh: "离散傅里叶变换（FFT）" },
    category: "math",
    difficulty: "expert",
    tags: ["math", "signal", "fft"],
    description: {
      en: "Computes the Discrete Fourier Transform in O(n log n) using the Cooley-Tukey radix-2 FFT algorithm.",
      zh: "使用 Cooley-Tukey 基2 FFT 算法在 O(n log n) 内计算离散傅里叶变换。",
    },
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
    spaceComplexity: "O(n)",
    snippets: [
      {
        lang: "javascript",
        code: `// Iterative Cooley-Tukey FFT (in-place, power-of-2 length)
function fft(re, im) {
  const n = re.length;
  // bit-reversal permutation
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  // butterfly stages
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let j = 0; j < len >> 1; j++) {
        const ur = re[i+j], ui = im[i+j];
        const vr = re[i+j+len/2]*cr - im[i+j+len/2]*ci;
        const vi = re[i+j+len/2]*ci + im[i+j+len/2]*cr;
        re[i+j] = ur + vr; im[i+j] = ui + vi;
        re[i+j+len/2] = ur - vr; im[i+j+len/2] = ui - vi;
        [cr, ci] = [cr*wr - ci*wi, cr*wi + ci*wr];
      }
    }
  }
}`,
      },
      {
        lang: "typescript",
        code: `function fft(re: number[], im: number[]): void {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len;
    const wr = Math.cos(ang), wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0;
      for (let j = 0; j < (len >> 1); j++) {
        const ur = re[i+j], ui = im[i+j];
        const half = len >> 1;
        const vr = re[i+j+half]*cr - im[i+j+half]*ci;
        const vi = re[i+j+half]*ci + im[i+j+half]*cr;
        re[i+j] = ur+vr; im[i+j] = ui+vi;
        re[i+j+half] = ur-vr; im[i+j+half] = ui-vi;
        [cr, ci] = [cr*wr - ci*wi, cr*wi + ci*wr];
      }
    }
  }
}`,
      },
      {
        lang: "java",
        code: `public void fft(double[] re, double[] im) {
    int n = re.length;
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; (j & bit) != 0; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
            double t = re[i]; re[i] = re[j]; re[j] = t;
            t = im[i]; im[i] = im[j]; im[j] = t;
        }
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = -2 * Math.PI / len;
        double wr = Math.cos(ang), wi = Math.sin(ang);
        for (int i = 0; i < n; i += len) {
            double cr = 1, ci = 0;
            for (int j = 0; j < len / 2; j++) {
                double ur = re[i+j], ui = im[i+j];
                double vr = re[i+j+len/2]*cr - im[i+j+len/2]*ci;
                double vi = re[i+j+len/2]*ci + im[i+j+len/2]*cr;
                re[i+j] = ur+vr; im[i+j] = ui+vi;
                re[i+j+len/2] = ur-vr; im[i+j+len/2] = ui-vi;
                double ncr = cr*wr - ci*wi;
                ci = cr*wi + ci*wr; cr = ncr;
            }
        }
    }
}`,
      },
      {
        lang: "python",
        code: `import math

def fft(re: list[float], im: list[float]) -> None:
    n = len(re)
    j = 0
    for i in range(1, n):
        bit = n >> 1
        while j & bit:
            j ^= bit
            bit >>= 1
        j ^= bit
        if i < j:
            re[i], re[j] = re[j], re[i]
            im[i], im[j] = im[j], im[i]
    length = 2
    while length <= n:
        ang = -2 * math.pi / length
        wr, wi = math.cos(ang), math.sin(ang)
        for i in range(0, n, length):
            cr, ci = 1.0, 0.0
            for k in range(length // 2):
                u, v = complex(re[i+k], im[i+k]), complex(re[i+k+length//2], im[i+k+length//2])
                rot = complex(cr, ci)
                v *= rot
                re[i+k], im[i+k] = (u+v).real, (u+v).imag
                re[i+k+length//2], im[i+k+length//2] = (u-v).real, (u-v).imag
                cr, ci = cr*wr - ci*wi, cr*wi + ci*wr
        length <<= 1`,
      },
      {
        lang: "rust",
        code: `use std::f64::consts::PI;

fn fft(re: &mut Vec<f64>, im: &mut Vec<f64>) {
    let n = re.len();
    let mut j = 0usize;
    for i in 1..n {
        let mut bit = n >> 1;
        while j & bit != 0 { j ^= bit; bit >>= 1; }
        j ^= bit;
        if i < j { re.swap(i, j); im.swap(i, j); }
    }
    let mut len = 2;
    while len <= n {
        let ang = -2.0 * PI / len as f64;
        let (wr, wi) = (ang.cos(), ang.sin());
        let mut i = 0;
        while i < n {
            let (mut cr, mut ci) = (1.0f64, 0.0f64);
            for k in 0..len/2 {
                let (ur, ui) = (re[i+k], im[i+k]);
                let vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci;
                let vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr;
                re[i+k] = ur+vr; im[i+k] = ui+vi;
                re[i+k+len/2] = ur-vr; im[i+k+len/2] = ui-vi;
                let ncr = cr*wr - ci*wi;
                ci = cr*wi + ci*wr; cr = ncr;
            }
            i += len;
        }
        len <<= 1;
    }
}`,
      },
      {
        lang: "c",
        code: `#include <math.h>
#define PI 3.14159265358979323846
void fft(double* re, double* im, int n) {
    int j = 0;
    for (int i = 1; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
            double t = re[i]; re[i] = re[j]; re[j] = t;
            t = im[i]; im[i] = im[j]; im[j] = t;
        }
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = -2*PI/len;
        double wr = cos(ang), wi = sin(ang);
        for (int i = 0; i < n; i += len) {
            double cr = 1, ci = 0;
            for (int k = 0; k < len/2; k++) {
                double ur = re[i+k], ui = im[i+k];
                double vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci;
                double vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr;
                re[i+k] = ur+vr; im[i+k] = ui+vi;
                re[i+k+len/2] = ur-vr; im[i+k+len/2] = ui-vi;
                double ncr = cr*wr - ci*wi;
                ci = cr*wi + ci*wr; cr = ncr;
            }
        }
    }
}`,
      },
      {
        lang: "cpp",
        code: `#include <cmath>
#include <complex>
#include <vector>
using cd = std::complex<double>;
const double PI = acos(-1);
void fft(std::vector<cd>& a, bool inv = false) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) std::swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        double ang = 2 * PI / len * (inv ? -1 : 1);
        cd wlen(cos(ang), sin(ang));
        for (int i = 0; i < n; i += len) {
            cd w(1);
            for (int j = 0; j < len/2; j++) {
                cd u = a[i+j], v = a[i+j+len/2] * w;
                a[i+j] = u+v; a[i+j+len/2] = u-v;
                w *= wlen;
            }
        }
    }
    if (inv) for (auto& x : a) x /= n;
}`,
      },
      {
        lang: "go",
        code: `import (
    "math"
    "math/cmplx"
)

func fft(a []complex128) {
    n := len(a)
    for i, j := 1, 0; i < n; i++ {
        bit := n >> 1
        for ; j&bit != 0; bit >>= 1 { j ^= bit }
        j ^= bit
        if i < j { a[i], a[j] = a[j], a[i] }
    }
    for length := 2; length <= n; length <<= 1 {
        ang := -2 * math.Pi / float64(length)
        wlen := complex(math.Cos(ang), math.Sin(ang))
        for i := 0; i < n; i += length {
            w := complex(1, 0)
            for j := 0; j < length/2; j++ {
                u, v := a[i+j], a[i+j+length/2]*w
                a[i+j], a[i+j+length/2] = u+v, u-v
                w *= wlen
            }
        }
    }
    _ = cmplx.Abs // imported for completeness
}`,
      },
      {
        lang: "php",
        code: `function fft(array &$re, array &$im): void {
    $n = count($re);
    $j = 0;
    for ($i = 1; $i < $n; $i++) {
        $bit = $n >> 1;
        for (; $j & $bit; $bit >>= 1) $j ^= $bit;
        $j ^= $bit;
        if ($i < $j) {
            [$re[$i], $re[$j]] = [$re[$j], $re[$i]];
            [$im[$i], $im[$j]] = [$im[$j], $im[$i]];
        }
    }
    for ($len = 2; $len <= $n; $len <<= 1) {
        $ang = -2 * M_PI / $len;
        $wr = cos($ang); $wi = sin($ang);
        for ($i = 0; $i < $n; $i += $len) {
            $cr = 1.0; $ci = 0.0;
            for ($k = 0; $k < $len / 2; $k++) {
                $ur = $re[$i+$k]; $ui = $im[$i+$k];
                $vr = $re[$i+$k+$len/2]*$cr - $im[$i+$k+$len/2]*$ci;
                $vi = $re[$i+$k+$len/2]*$ci + $im[$i+$k+$len/2]*$cr;
                $re[$i+$k] = $ur+$vr; $im[$i+$k] = $ui+$vi;
                $re[$i+$k+$len/2] = $ur-$vr; $im[$i+$k+$len/2] = $ui-$vi;
                [$cr, $ci] = [$cr*$wr - $ci*$wi, $cr*$wi + $ci*$wr];
            }
        }
    }
}`,
      },
      {
        lang: "kotlin",
        code: `import kotlin.math.*

fun fft(re: DoubleArray, im: DoubleArray) {
    val n = re.size
    var j = 0
    for (i in 1 until n) {
        var bit = n shr 1
        while (j and bit != 0) { j = j xor bit; bit = bit shr 1 }
        j = j xor bit
        if (i < j) { re[i] = re[j].also { re[j] = re[i] }; im[i] = im[j].also { im[j] = im[i] } }
    }
    var len = 2
    while (len <= n) {
        val ang = -2 * PI / len
        val wr = cos(ang); val wi = sin(ang)
        var i = 0
        while (i < n) {
            var cr = 1.0; var ci = 0.0
            for (k in 0 until len / 2) {
                val ur = re[i+k]; val ui = im[i+k]
                val vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci
                val vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr
                re[i+k] = ur+vr; im[i+k] = ui+vi
                re[i+k+len/2] = ur-vr; im[i+k+len/2] = ui-vi
                val ncr = cr*wr - ci*wi; ci = cr*wi + ci*wr; cr = ncr
            }
            i += len
        }
        len = len shl 1
    }
}`,
      },
      {
        lang: "swift",
        code: `import Foundation

func fft(_ re: inout [Double], _ im: inout [Double]) {
    let n = re.count
    var j = 0
    for i in 1..<n {
        var bit = n >> 1
        while j & bit != 0 { j ^= bit; bit >>= 1 }
        j ^= bit
        if i < j { re.swapAt(i, j); im.swapAt(i, j) }
    }
    var len = 2
    while len <= n {
        let ang = -2.0 * .pi / Double(len)
        let wr = cos(ang), wi = sin(ang)
        var i = 0
        while i < n {
            var cr = 1.0, ci = 0.0
            for k in 0..<(len/2) {
                let ur = re[i+k], ui = im[i+k]
                let vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci
                let vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr
                re[i+k] = ur+vr; im[i+k] = ui+vi
                re[i+k+len/2] = ur-vr; im[i+k+len/2] = ui-vi
                let ncr = cr*wr - ci*wi; ci = cr*wi + ci*wr; cr = ncr
            }
            i += len
        }
        len <<= 1
    }
}`,
      },
    ],
  },

  // ─── Bit Manipulation algorithms ──────────────────────────────────────────────

  popcount: {
    id: "popcount",
    name: "Popcount (Hamming Weight)",
    displayName: { en: "Popcount", zh: "汉明重量（位计数）" },
    category: "bit-manipulation",
    difficulty: "beginner",
    tags: ["bit"],
    description: {
      en: "Counts the number of set bits (1s) in an integer using Brian Kernighan's trick in O(k) where k is the number of set bits.",
      zh: "用 Brian Kernighan 技巧统计整数中1的个数，时间复杂度 O(k)，k 为置位数。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 191, titleSlug: "number-of-1-bits", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `// Brian Kernighan's algorithm
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n &= n - 1; // clear lowest set bit
    count++;
  }
  return count;
}`,
      },
      {
        lang: "typescript",
        code: `function hammingWeight(n: number): number {
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count++;
  }
  return count;
}`,
      },
      {
        lang: "java",
        code: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= n - 1;
        count++;
    }
    return count;
    // Alternative: return Integer.bitCount(n);
}`,
      },
      {
        lang: "python",
        code: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count
    # Alternative: return bin(n).count('1')`,
      },
      {
        lang: "rust",
        code: `fn hamming_weight(mut n: u32) -> u32 {
    let mut count = 0;
    while n != 0 {
        n &= n - 1;
        count += 1;
    }
    count
    // Alternative: n.count_ones()
}`,
      },
      {
        lang: "c",
        code: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
    /* Alternative: __builtin_popcount(n) */
}`,
      },
      {
        lang: "cpp",
        code: `int hammingWeight(uint32_t n) {
    int count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    return count;
    // Alternative: __builtin_popcount(n) or std::popcount(n) [C++20]
}`,
      },
      {
        lang: "go",
        code: `import "math/bits"

func hammingWeight(num uint32) int {
    count := 0
    for num != 0 {
        num &= num - 1
        count++
    }
    return count
    // Alternative: return bits.OnesCount32(num)
}`,
      },
      {
        lang: "php",
        code: `function hammingWeight(int $n): int {
    $count = 0;
    while ($n !== 0) {
        $n &= $n - 1;
        $count++;
    }
    return $count;
}`,
      },
      {
        lang: "kotlin",
        code: `fun hammingWeight(n: Int): Int {
    var x = n; var count = 0
    while (x != 0) { x = x and (x - 1); count++ }
    return count
    // Alternative: n.countOneBits()
}`,
      },
      {
        lang: "swift",
        code: `func hammingWeight(_ n: UInt32) -> Int {
    var x = n, count = 0
    while x != 0 { x &= x - 1; count += 1 }
    return count
    // Alternative: n.nonzeroBitCount
}`,
      },
    ],
  },

  "single-number": {
    id: "single-number",
    name: "Single Number",
    displayName: { en: "Single Number", zh: "只出现一次的数字" },
    category: "bit-manipulation",
    difficulty: "beginner",
    tags: ["bit", "xor", "array"],
    description: {
      en: "Finds the element that appears exactly once in an array where every other element appears twice, using XOR in O(n) time and O(1) space.",
      zh: "利用 XOR 在 O(n) 时间、O(1) 空间内找出数组中只出现一次的元素（其余元素均出现两次）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(1)",
    relatedProblems: [
      { id: 136, titleSlug: "single-number", difficulty: "easy" },
      { id: 137, titleSlug: "single-number-ii", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Single Number I — every other appears twice
function singleNumber(nums) {
  return nums.reduce((xor, n) => xor ^ n, 0);
}

// Single Number II — every other appears three times
function singleNumberII(nums) {
  let ones = 0, twos = 0;
  for (const n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}`,
      },
      {
        lang: "typescript",
        code: `function singleNumber(nums: number[]): number {
  return nums.reduce((xor, n) => xor ^ n, 0);
}

function singleNumberII(nums: number[]): number {
  let ones = 0, twos = 0;
  for (const n of nums) {
    ones = (ones ^ n) & ~twos;
    twos = (twos ^ n) & ~ones;
  }
  return ones;
}`,
      },
      {
        lang: "java",
        code: `public int singleNumber(int[] nums) {
    int xor = 0;
    for (int n : nums) xor ^= n;
    return xor;
}

public int singleNumberII(int[] nums) {
    int ones = 0, twos = 0;
    for (int n : nums) {
        ones = (ones ^ n) & ~twos;
        twos = (twos ^ n) & ~ones;
    }
    return ones;
}`,
      },
      {
        lang: "python",
        code: `from functools import reduce
from operator import xor

def single_number(nums: list[int]) -> int:
    return reduce(xor, nums, 0)

def single_number_ii(nums: list[int]) -> int:
    ones = twos = 0
    for n in nums:
        ones = (ones ^ n) & ~twos
        twos = (twos ^ n) & ~ones
    return ones`,
      },
      {
        lang: "rust",
        code: `fn single_number(nums: &[i32]) -> i32 {
    nums.iter().fold(0, |xor, &n| xor ^ n)
}

fn single_number_ii(nums: &[i32]) -> i32 {
    let (mut ones, mut twos) = (0i32, 0i32);
    for &n in nums {
        ones = (ones ^ n) & !twos;
        twos = (twos ^ n) & !ones;
    }
    ones
}`,
      },
      {
        lang: "c",
        code: `int singleNumber(int* nums, int n) {
    int xor = 0;
    for (int i = 0; i < n; i++) xor ^= nums[i];
    return xor;
}

int singleNumberII(int* nums, int n) {
    int ones = 0, twos = 0;
    for (int i = 0; i < n; i++) {
        ones = (ones ^ nums[i]) & ~twos;
        twos = (twos ^ nums[i]) & ~ones;
    }
    return ones;
}`,
      },
      {
        lang: "cpp",
        code: `int singleNumber(std::vector<int>& nums) {
    int xorVal = 0;
    for (int n : nums) xorVal ^= n;
    return xorVal;
}

int singleNumberII(std::vector<int>& nums) {
    int ones = 0, twos = 0;
    for (int n : nums) {
        ones = (ones ^ n) & ~twos;
        twos = (twos ^ n) & ~ones;
    }
    return ones;
}`,
      },
      {
        lang: "go",
        code: `func singleNumber(nums []int) int {
    xor := 0
    for _, n := range nums { xor ^= n }
    return xor
}

func singleNumberII(nums []int) int {
    ones, twos := 0, 0
    for _, n := range nums {
        ones = (ones ^ n) &^ twos
        twos = (twos ^ n) &^ ones
    }
    return ones
}`,
      },
      {
        lang: "php",
        code: `function singleNumber(array $nums): int {
    return array_reduce($nums, fn($xor, $n) => $xor ^ $n, 0);
}

function singleNumberII(array $nums): int {
    $ones = 0; $twos = 0;
    foreach ($nums as $n) {
        $ones = ($ones ^ $n) & ~$twos;
        $twos = ($twos ^ $n) & ~$ones;
    }
    return $ones;
}`,
      },
      {
        lang: "kotlin",
        code: `fun singleNumber(nums: IntArray): Int = nums.fold(0) { xor, n -> xor xor n }

fun singleNumberII(nums: IntArray): Int {
    var ones = 0; var twos = 0
    for (n in nums) {
        ones = (ones xor n) and twos.inv()
        twos = (twos xor n) and ones.inv()
    }
    return ones
}`,
      },
      {
        lang: "swift",
        code: `func singleNumber(_ nums: [Int]) -> Int {
    return nums.reduce(0, ^)
}

func singleNumberII(_ nums: [Int]) -> Int {
    var ones = 0, twos = 0
    for n in nums {
        ones = (ones ^ n) & ~twos
        twos = (twos ^ n) & ~ones
    }
    return ones
}`,
      },
    ],
  },

  "power-of-two": {
    id: "power-of-two",
    name: "Power of Two",
    displayName: { en: "Power of Two", zh: "2的幂" },
    category: "bit-manipulation",
    difficulty: "beginner",
    tags: ["bit", "math"],
    description: {
      en: "Determines whether a given integer is a power of two using the bit trick n & (n-1) == 0.",
      zh: "用位运算技巧 n & (n-1) == 0 在 O(1) 内判断一个整数是否为2的幂次。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 231, titleSlug: "power-of-two", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      },
      {
        lang: "typescript",
        code: `function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,
      },
      {
        lang: "java",
        code: `public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      },
      {
        lang: "python",
        code: `def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0`,
      },
      {
        lang: "rust",
        code: `fn is_power_of_two(n: i32) -> bool {
    n > 0 && (n & (n - 1)) == 0
}`,
      },
      {
        lang: "c",
        code: `#include <stdbool.h>
bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      },
      {
        lang: "cpp",
        code: `bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
    // C++20 alternative: return std::has_single_bit((unsigned)n);
}`,
      },
      {
        lang: "go",
        code: `import "math/bits"

func isPowerOfTwo(n int) bool {
    return n > 0 && (n&(n-1)) == 0
    // Alternative: bits.OnesCount(uint(n)) == 1
    _ = bits.OnesCount
}`,
      },
      {
        lang: "php",
        code: `function isPowerOfTwo(int $n): bool {
    return $n > 0 && ($n & ($n - 1)) === 0;
}`,
      },
      {
        lang: "kotlin",
        code: `fun isPowerOfTwo(n: Int): Boolean = n > 0 && (n and (n - 1)) == 0`,
      },
      {
        lang: "swift",
        code: `func isPowerOfTwo(_ n: Int) -> Bool {
    return n > 0 && (n & (n - 1)) == 0
}`,
      },
    ],
  },

  "reverse-bits": {
    id: "reverse-bits",
    name: "Reverse Bits",
    displayName: { en: "Reverse Bits", zh: "颠倒二进制位" },
    category: "bit-manipulation",
    difficulty: "beginner",
    tags: ["bit"],
    description: {
      en: "Reverses the bits of a 32-bit unsigned integer by iteratively extracting the LSB and building the result.",
      zh: "通过逐位提取最低位并移位，在 O(1) 内颠倒32位无符号整数的二进制表示。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(1)",
    relatedProblems: [{ id: 190, titleSlug: "reverse-bits", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result * 2 + (n & 1)) >>> 0;
    n >>>= 1;
  }
  return result >>> 0;
}`,
      },
      {
        lang: "typescript",
        code: `function reverseBits(n: number): number {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = ((result << 1) | (n & 1)) >>> 0;
    n >>>= 1;
  }
  return result >>> 0;
}`,
      },
      {
        lang: "java",
        code: `public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result;
}`,
      },
      {
        lang: "python",
        code: `def reverseBits(n: int) -> int:
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result`,
      },
      {
        lang: "rust",
        code: `fn reverse_bits(n: u32) -> u32 {
    n.reverse_bits()
}

// Manual implementation:
fn reverse_bits_manual(mut n: u32) -> u32 {
    let mut result = 0u32;
    for _ in 0..32 {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    result
}`,
      },
      {
        lang: "c",
        code: `#include <stdint.h>
uint32_t reverseBits(uint32_t n) {
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `#include <cstdint>
#include <bit>  // C++20
uint32_t reverseBits(uint32_t n) {
    // C++20: return std::byteswap is for bytes, use manual:
    uint32_t result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `import "math/bits"

func reverseBits(num uint32) uint32 {
    return bits.Reverse32(num)
}

// Manual implementation:
func reverseBitsManual(num uint32) uint32 {
    var result uint32
    for i := 0; i < 32; i++ {
        result = (result << 1) | (num & 1)
        num >>= 1
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function reverseBits(int $n): int {
    $result = 0;
    for ($i = 0; $i < 32; $i++) {
        $result = ($result << 1) | ($n & 1);
        $n >>= 1;
    }
    return $result & 0xFFFFFFFF;
}`,
      },
      {
        lang: "kotlin",
        code: `fun reverseBits(n: Int): Int {
    var x = n; var result = 0
    for (i in 0 until 32) {
        result = (result shl 1) or (x and 1)
        x = x ushr 1
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func reverseBits(_ n: UInt32) -> UInt32 {
    return n.byteSwapped // swaps bytes; for full bit-reversal:
}

func reverseBitsFull(_ n: UInt32) -> UInt32 {
    var x = n, result: UInt32 = 0
    for _ in 0..<32 {
        result = (result << 1) | (x & 1)
        x >>= 1
    }
    return result
}`,
      },
    ],
  },
}
