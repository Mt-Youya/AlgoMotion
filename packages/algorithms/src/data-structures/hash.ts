import type { AlgorithmMeta } from "@algomotion/shared"

export const hashDsAlgorithms: Record<string, AlgorithmMeta> = {
  "hash-table": {
    id: "hash-table",
    name: "Hash Table",
    displayName: { en: "Hash Table (Open Addressing)", zh: "哈希表（开放寻址）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["hash", "open-addressing", "linear-probing", "collision"],
    description: {
      en: "A hash table that resolves collisions via open addressing (linear probing), storing all entries in the backing array itself.",
      zh: "使用开放寻址（线性探测）解决冲突的哈希表，所有条目直接存储在数组中。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 1, titleSlug: "two-sum", difficulty: "easy" },
      { id: 705, titleSlug: "design-hashset", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class HashTable {
  #cap; #size = 0; #keys; #vals; #DELETED = Symbol("deleted");

  constructor(cap = 16) {
    this.#cap = cap;
    this.#keys = new Array(cap).fill(undefined);
    this.#vals = new Array(cap).fill(undefined);
  }

  #hash(key) {
    let h = 0;
    for (const c of String(key)) h = (h * 31 + c.charCodeAt(0)) % this.#cap;
    return h;
  }

  set(key, val) {
    let i = this.#hash(key);
    for (let d = 0; d < this.#cap; d++) {
      const idx = (i + d) % this.#cap;
      if (this.#keys[idx] === undefined || this.#keys[idx] === this.#DELETED || this.#keys[idx] === key) {
        this.#keys[idx] = key; this.#vals[idx] = val; this.#size++; return;
      }
    }
    throw new Error("Table full");
  }

  get(key) {
    let i = this.#hash(key);
    for (let d = 0; d < this.#cap; d++) {
      const idx = (i + d) % this.#cap;
      if (this.#keys[idx] === undefined) return undefined;
      if (this.#keys[idx] === key) return this.#vals[idx];
    }
    return undefined;
  }

  delete(key) {
    let i = this.#hash(key);
    for (let d = 0; d < this.#cap; d++) {
      const idx = (i + d) % this.#cap;
      if (this.#keys[idx] === undefined) return;
      if (this.#keys[idx] === key) { this.#keys[idx] = this.#DELETED; this.#size--; return; }
    }
  }
}

const ht = new HashTable(8);
ht.set("name", "Alice"); ht.set("age", 30);
console.log(ht.get("name")); // Alice
ht.delete("age");
console.log(ht.get("age")); // undefined`,
      },
      {
        lang: "typescript",
        code: `class HashTable<K extends string | number, V> {
  private cap: number;
  private keys: (K | undefined | null)[];
  private vals: (V | undefined)[];
  private size = 0;
  private readonly DELETED = null;

  constructor(cap = 16) {
    this.cap = cap;
    this.keys = new Array(cap).fill(undefined);
    this.vals = new Array(cap).fill(undefined);
  }

  private hash(key: K): number {
    const s = String(key);
    let h = 0;
    for (const c of s) h = (h * 31 + c.charCodeAt(0)) % this.cap;
    return h;
  }

  set(key: K, val: V): void {
    let i = this.hash(key);
    for (let d = 0; d < this.cap; d++) {
      const idx = (i + d) % this.cap;
      if (this.keys[idx] === undefined || this.keys[idx] === this.DELETED || this.keys[idx] === key) {
        this.keys[idx] = key; this.vals[idx] = val; this.size++; return;
      }
    }
    throw new Error("Table full");
  }

  get(key: K): V | undefined {
    let i = this.hash(key);
    for (let d = 0; d < this.cap; d++) {
      const idx = (i + d) % this.cap;
      if (this.keys[idx] === undefined) return undefined;
      if (this.keys[idx] === key) return this.vals[idx];
    }
    return undefined;
  }

  delete(key: K): void {
    let i = this.hash(key);
    for (let d = 0; d < this.cap; d++) {
      const idx = (i + d) % this.cap;
      if (this.keys[idx] === undefined) return;
      if (this.keys[idx] === key) { (this.keys[idx] as any) = this.DELETED; this.size--; return; }
    }
  }
}

const ht = new HashTable<string, number>();
ht.set("a", 1); ht.set("b", 2);
console.log(ht.get("a")); // 1`,
      },
      {
        lang: "java",
        code: `import java.util.Objects;

class HashTable<K, V> {
    private static class Entry<K, V> { K key; V val; boolean deleted; }
    private Object[] table;
    private int cap, size;

    @SuppressWarnings("unchecked")
    HashTable(int cap) { this.cap = cap; table = new Object[cap]; }

    private int hash(K key) { return Math.abs(Objects.hashCode(key)) % cap; }

    void put(K key, V val) {
        int i = hash(key);
        for (int d = 0; d < cap; d++) {
            int idx = (i + d) % cap;
            if (table[idx] == null) { var e = new Entry<K,V>(); e.key=key; e.val=val; table[idx]=e; size++; return; }
            @SuppressWarnings("unchecked") var e = (Entry<K,V>) table[idx];
            if (e.deleted || Objects.equals(e.key, key)) { e.key=key; e.val=val; e.deleted=false; if(!e.deleted) size++; return; }
        }
    }

    @SuppressWarnings("unchecked")
    V get(K key) {
        int i = hash(key);
        for (int d = 0; d < cap; d++) {
            int idx = (i + d) % cap;
            if (table[idx] == null) return null;
            var e = (Entry<K,V>) table[idx];
            if (!e.deleted && Objects.equals(e.key, key)) return e.val;
        }
        return null;
    }
}`,
      },
      {
        lang: "python",
        code: `class HashTable:
    _DELETED = object()

    def __init__(self, capacity=16):
        self.cap = capacity
        self.keys = [None] * capacity
        self.vals = [None] * capacity
        self.size = 0

    def _hash(self, key):
        return hash(key) % self.cap

    def set(self, key, val):
        i = self._hash(key)
        for d in range(self.cap):
            idx = (i + d) % self.cap
            if self.keys[idx] is None or self.keys[idx] is self._DELETED or self.keys[idx] == key:
                self.keys[idx] = key
                self.vals[idx] = val
                self.size += 1
                return
        raise Exception("Table full")

    def get(self, key):
        i = self._hash(key)
        for d in range(self.cap):
            idx = (i + d) % self.cap
            if self.keys[idx] is None:
                return None
            if self.keys[idx] == key:
                return self.vals[idx]
        return None

    def delete(self, key):
        i = self._hash(key)
        for d in range(self.cap):
            idx = (i + d) % self.cap
            if self.keys[idx] is None:
                return
            if self.keys[idx] == key:
                self.keys[idx] = self._DELETED
                self.size -= 1
                return`,
      },
      {
        lang: "rust",
        code: `use std::collections::HashMap;

fn main() {
    // Rust's HashMap uses Robin Hood hashing (open addressing variant)
    let mut map: HashMap<&str, i32> = HashMap::new();
    map.insert("one", 1);
    map.insert("two", 2);
    map.insert("three", 3);

    println!("{:?}", map.get("two"));   // Some(2)
    map.remove("two");
    println!("{:?}", map.get("two"));   // None
    println!("size = {}", map.len());   // 2
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define CAP 16

typedef struct { char key[32]; int val; int used; int deleted; } Slot;

Slot table[CAP];

int hash(const char *key) {
    int h = 0;
    while (*key) h = (h * 31 + *key++) % CAP;
    return h;
}

void ht_set(const char *key, int val) {
    int i = hash(key);
    for (int d = 0; d < CAP; d++) {
        int idx = (i + d) % CAP;
        if (!table[idx].used || table[idx].deleted || strcmp(table[idx].key, key)==0) {
            strncpy(table[idx].key, key, 31);
            table[idx].val = val; table[idx].used = 1; table[idx].deleted = 0; return;
        }
    }
}

int ht_get(const char *key, int *out) {
    int i = hash(key);
    for (int d = 0; d < CAP; d++) {
        int idx = (i + d) % CAP;
        if (!table[idx].used) return 0;
        if (!table[idx].deleted && strcmp(table[idx].key, key)==0) { *out = table[idx].val; return 1; }
    }
    return 0;
}

int main() {
    ht_set("name", 42); ht_set("age", 30);
    int v; ht_get("name", &v); printf("%d\\n", v); // 42
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

int main() {
    // std::unordered_map uses open addressing (or chaining depending on impl)
    unordered_map<string, int> ht;
    ht["one"] = 1; ht["two"] = 2; ht["three"] = 3;
    cout << ht["two"] << "\\n";      // 2
    ht.erase("two");
    cout << ht.count("two") << "\\n"; // 0
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

// Go's built-in map uses open addressing internally
func main() {
    ht := make(map[string]int)
    ht["one"] = 1
    ht["two"] = 2
    ht["three"] = 3

    val, ok := ht["two"]
    fmt.Println(val, ok)  // 2 true
    delete(ht, "two")
    _, ok = ht["two"]
    fmt.Println(ok)       // false
    fmt.Println(len(ht))  // 2
}`,
      },
      {
        lang: "php",
        code: `<?php
class HashTable {
    private array $slots;
    private array $deleted;
    private int $cap;

    public function __construct(int $cap = 16) {
        $this->cap = $cap;
        $this->slots = array_fill(0, $cap, null);
        $this->deleted = array_fill(0, $cap, false);
    }

    private function hash(string $key): int {
        $h = 0;
        foreach (str_split($key) as $c) $h = ($h * 31 + ord($c)) % $this->cap;
        return $h;
    }

    public function set(string $key, mixed $val): void {
        $i = $this->hash($key);
        for ($d = 0; $d < $this->cap; $d++) {
            $idx = ($i + $d) % $this->cap;
            if ($this->slots[$idx] === null || $this->deleted[$idx] || $this->slots[$idx][0] === $key) {
                $this->slots[$idx] = [$key, $val]; $this->deleted[$idx] = false; return;
            }
        }
    }

    public function get(string $key): mixed {
        $i = $this->hash($key);
        for ($d = 0; $d < $this->cap; $d++) {
            $idx = ($i + $d) % $this->cap;
            if ($this->slots[$idx] === null) return null;
            if (!$this->deleted[$idx] && $this->slots[$idx][0] === $key) return $this->slots[$idx][1];
        }
        return null;
    }
}

$ht = new HashTable();
$ht->set("key", 99);
echo $ht->get("key") . "\\n"; // 99`,
      },
      {
        lang: "kotlin",
        code: `fun main() {
    // Kotlin's HashMap uses open addressing
    val ht = HashMap<String, Int>()
    ht["one"] = 1; ht["two"] = 2; ht["three"] = 3
    println(ht["two"])          // 2
    ht.remove("two")
    println(ht.containsKey("two")) // false
    println(ht.size)            // 2
}`,
      },
      {
        lang: "swift",
        code: `// Swift's Dictionary uses open addressing internally
var ht: [String: Int] = [:]
ht["one"] = 1
ht["two"] = 2
ht["three"] = 3

print(ht["two"]!)          // 2
ht.removeValue(forKey: "two")
print(ht["two"] as Any)    // nil
print(ht.count)            // 2`,
      },
    ],
  },

  "hash-map-chaining": {
    id: "hash-map-chaining",
    name: "Hash Map (Chaining)",
    displayName: { en: "Hash Map (Separate Chaining)", zh: "哈希表（链地址法）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["hash", "chaining", "linked-list", "collision"],
    description: {
      en: "A hash map that resolves collisions via separate chaining — each bucket holds a linked list of key-value pairs.",
      zh: "使用链地址法解决冲突的哈希表，每个桶存储一个键值对链表。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 706, titleSlug: "design-hashmap", difficulty: "easy" },
      { id: 1, titleSlug: "two-sum", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class HashMap {
  #buckets; #cap; #size = 0;

  constructor(cap = 16) {
    this.#cap = cap;
    this.#buckets = Array.from({ length: cap }, () => []);
  }

  #hash(key) {
    let h = 0;
    for (const c of String(key)) h = (h * 31 + c.charCodeAt(0)) % this.#cap;
    return h;
  }

  set(key, val) {
    const bucket = this.#buckets[this.#hash(key)];
    const pair = bucket.find(p => p[0] === key);
    if (pair) { pair[1] = val; } else { bucket.push([key, val]); this.#size++; }
  }

  get(key) {
    const pair = this.#buckets[this.#hash(key)].find(p => p[0] === key);
    return pair ? pair[1] : undefined;
  }

  delete(key) {
    const bucket = this.#buckets[this.#hash(key)];
    const idx = bucket.findIndex(p => p[0] === key);
    if (idx !== -1) { bucket.splice(idx, 1); this.#size--; }
  }

  get size() { return this.#size; }
}

const m = new HashMap();
m.set("a", 1); m.set("b", 2); m.set("a", 99);
console.log(m.get("a")); // 99
m.delete("b");
console.log(m.size); // 1`,
      },
      {
        lang: "typescript",
        code: `class HashMap<K, V> {
  private buckets: [K, V][][];
  private cap: number;
  private count = 0;

  constructor(cap = 16) {
    this.cap = cap;
    this.buckets = Array.from({ length: cap }, () => []);
  }

  private hash(key: K): number {
    const s = String(key);
    let h = 0;
    for (const c of s) h = (h * 31 + c.charCodeAt(0)) % this.cap;
    return h;
  }

  set(key: K, val: V): void {
    const bucket = this.buckets[this.hash(key)];
    const pair = bucket.find(p => p[0] === key);
    if (pair) { pair[1] = val; } else { bucket.push([key, val]); this.count++; }
  }

  get(key: K): V | undefined {
    return this.buckets[this.hash(key)].find(p => p[0] === key)?.[1];
  }

  delete(key: K): void {
    const bucket = this.buckets[this.hash(key)];
    const idx = bucket.findIndex(p => p[0] === key);
    if (idx !== -1) { bucket.splice(idx, 1); this.count--; }
  }

  get size(): number { return this.count; }
}`,
      },
      {
        lang: "java",
        code: `import java.util.*;

class HashMap<K, V> {
    private static final int CAP = 16;
    private List<Map.Entry<K,V>>[] buckets;

    @SuppressWarnings("unchecked")
    HashMap() {
        buckets = new List[CAP];
        for (int i = 0; i < CAP; i++) buckets[i] = new LinkedList<>();
    }

    private int idx(K key) { return Math.abs(key.hashCode()) % CAP; }

    void put(K key, V val) {
        var bucket = buckets[idx(key)];
        for (var e : bucket) if (e.getKey().equals(key)) { ((java.util.AbstractMap.SimpleEntry<K,V>)e).setValue(val); return; }
        bucket.add(new java.util.AbstractMap.SimpleEntry<>(key, val));
    }

    V get(K key) {
        for (var e : buckets[idx(key)]) if (e.getKey().equals(key)) return e.getValue();
        return null;
    }

    void remove(K key) { buckets[idx(key)].removeIf(e -> e.getKey().equals(key)); }
}`,
      },
      {
        lang: "python",
        code: `class HashMap:
    def __init__(self, capacity=16):
        self.cap = capacity
        self.buckets = [[] for _ in range(capacity)]

    def _index(self, key):
        return hash(key) % self.cap

    def set(self, key, val):
        bucket = self.buckets[self._index(key)]
        for pair in bucket:
            if pair[0] == key:
                pair[1] = val
                return
        bucket.append([key, val])

    def get(self, key):
        for pair in self.buckets[self._index(key)]:
            if pair[0] == key:
                return pair[1]
        return None

    def delete(self, key):
        bucket = self.buckets[self._index(key)]
        self.buckets[self._index(key)] = [p for p in bucket if p[0] != key]

hm = HashMap()
hm.set("x", 10); hm.set("y", 20)
print(hm.get("x"))  # 10
hm.delete("x")
print(hm.get("x"))  # None`,
      },
      {
        lang: "rust",
        code: `struct HashMap<K, V> {
    buckets: Vec<Vec<(K, V)>>,
    cap: usize,
}

impl<K: Eq + std::hash::Hash + Clone, V: Clone> HashMap<K, V> {
    fn new(cap: usize) -> Self {
        HashMap { buckets: vec![vec![]; cap], cap }
    }

    fn bucket_idx(&self, key: &K) -> usize {
        use std::hash::{Hash, Hasher};
        let mut h = std::collections::hash_map::DefaultHasher::new();
        key.hash(&mut h);
        (std::hash::Hasher::finish(&h) as usize) % self.cap
    }

    fn insert(&mut self, key: K, val: V) {
        let idx = self.bucket_idx(&key);
        for pair in &mut self.buckets[idx] {
            if pair.0 == key { pair.1 = val; return; }
        }
        self.buckets[idx].push((key, val));
    }

    fn get(&self, key: &K) -> Option<&V> {
        let idx = self.bucket_idx(key);
        self.buckets[idx].iter().find(|p| &p.0 == key).map(|p| &p.1)
    }
}

fn main() {
    let mut hm = HashMap::new(8);
    hm.insert("hello", 1);
    hm.insert("world", 2);
    println!("{:?}", hm.get(&"hello")); // Some(1)
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define CAP 16

typedef struct Node { char key[32]; int val; struct Node *next; } Node;
Node *buckets[CAP];

int hash(const char *k) {
    int h = 0;
    while (*k) h = (h * 31 + *k++) % CAP;
    return h;
}

void hm_set(const char *key, int val) {
    int h = hash(key);
    for (Node *n = buckets[h]; n; n = n->next)
        if (strcmp(n->key, key)==0) { n->val = val; return; }
    Node *n = calloc(1, sizeof(Node));
    strncpy(n->key, key, 31); n->val = val; n->next = buckets[h]; buckets[h] = n;
}

int hm_get(const char *key, int *out) {
    for (Node *n = buckets[hash(key)]; n; n = n->next)
        if (strcmp(n->key, key)==0) { *out = n->val; return 1; }
    return 0;
}

int main() {
    hm_set("foo", 42); hm_set("bar", 7);
    int v; hm_get("foo", &v); printf("%d\\n", v); // 42
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <list>
#include <vector>
#include <functional>
using namespace std;

template<typename K, typename V>
class HashMap {
    int cap;
    vector<list<pair<K,V>>> buckets;
    int idx(const K &k) { return abs((int)(hash<K>{}(k))) % cap; }
public:
    HashMap(int cap=16): cap(cap), buckets(cap) {}
    void put(K k, V v) {
        auto &b = buckets[idx(k)];
        for (auto &p : b) if (p.first==k) { p.second=v; return; }
        b.emplace_back(k,v);
    }
    V* get(K k) {
        for (auto &p : buckets[idx(k)]) if (p.first==k) return &p.second;
        return nullptr;
    }
    void remove(K k) { buckets[idx(k)].remove_if([&](auto &p){ return p.first==k; }); }
};

int main() {
    HashMap<string,int> hm;
    hm.put("a",1); hm.put("b",2);
    cout << *hm.get("a") << "\\n"; // 1
    hm.remove("a");
    cout << (hm.get("a") ? "found" : "not found") << "\\n"; // not found
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "fmt"
    "hash/fnv"
)

type pair struct{ key, val interface{} }

type HashMap struct {
    buckets [][]pair
    cap     int
}

func NewHashMap(cap int) *HashMap {
    return &HashMap{buckets: make([][]pair, cap), cap: cap}
}

func (m *HashMap) index(key interface{}) int {
    h := fnv.New32()
    h.Write([]byte(fmt.Sprint(key)))
    return int(h.Sum32()) % m.cap
}

func (m *HashMap) Set(key, val interface{}) {
    i := m.index(key)
    for j, p := range m.buckets[i] {
        if p.key == key { m.buckets[i][j].val = val; return }
    }
    m.buckets[i] = append(m.buckets[i], pair{key, val})
}

func (m *HashMap) Get(key interface{}) (interface{}, bool) {
    for _, p := range m.buckets[m.index(key)] {
        if p.key == key { return p.val, true }
    }
    return nil, false
}

func main() {
    m := NewHashMap(8)
    m.Set("x", 10); m.Set("y", 20)
    v, ok := m.Get("x")
    fmt.Println(v, ok) // 10 true
}`,
      },
      {
        lang: "php",
        code: `<?php
class HashMap {
    private array $buckets;
    private int $cap;

    public function __construct(int $cap = 16) {
        $this->cap = $cap;
        $this->buckets = array_fill(0, $cap, []);
    }

    private function idx(mixed $key): int {
        return abs(crc32((string)$key)) % $this->cap;
    }

    public function set(mixed $key, mixed $val): void {
        $i = $this->idx($key);
        foreach ($this->buckets[$i] as &$pair) {
            if ($pair[0] === $key) { $pair[1] = $val; return; }
        }
        $this->buckets[$i][] = [$key, $val];
    }

    public function get(mixed $key): mixed {
        foreach ($this->buckets[$this->idx($key)] as $pair)
            if ($pair[0] === $key) return $pair[1];
        return null;
    }

    public function delete(mixed $key): void {
        $i = $this->idx($key);
        $this->buckets[$i] = array_values(array_filter($this->buckets[$i], fn($p) => $p[0] !== $key));
    }
}

$hm = new HashMap();
$hm->set("k", 99);
echo $hm->get("k") . "\\n"; // 99`,
      },
      {
        lang: "kotlin",
        code: `class HashMap<K, V>(private val cap: Int = 16) {
    private val buckets: Array<MutableList<Pair<K, V>>> = Array(cap) { mutableListOf() }

    private fun idx(key: K) = Math.abs(key.hashCode()) % cap

    fun put(key: K, val_: V) {
        val bucket = buckets[idx(key)]
        val i = bucket.indexOfFirst { it.first == key }
        if (i >= 0) bucket[i] = Pair(key, val_) else bucket.add(Pair(key, val_))
    }

    fun get(key: K): V? = buckets[idx(key)].find { it.first == key }?.second

    fun remove(key: K) { buckets[idx(key)].removeIf { it.first == key } }
}

fun main() {
    val hm = HashMap<String, Int>()
    hm.put("a", 1); hm.put("b", 2)
    println(hm.get("a")) // 1
    hm.remove("a")
    println(hm.get("a")) // null
}`,
      },
      {
        lang: "swift",
        code: `struct HashMap<K: Hashable, V> {
    private var buckets: [[(K, V)]]
    private let cap: Int

    init(capacity: Int = 16) {
        cap = capacity
        buckets = Array(repeating: [], count: capacity)
    }

    private func index(_ key: K) -> Int { abs(key.hashValue) % cap }

    mutating func set(_ key: K, _ val: V) {
        let i = index(key)
        if let j = buckets[i].firstIndex(where: { $0.0 == key }) {
            buckets[i][j] = (key, val)
        } else {
            buckets[i].append((key, val))
        }
    }

    func get(_ key: K) -> V? { buckets[index(key)].first(where: { $0.0 == key })?.1 }

    mutating func delete(_ key: K) { buckets[index(key)].removeAll { $0.0 == key } }
}

var hm = HashMap<String, Int>()
hm.set("x", 42)
print(hm.get("x")!) // 42`,
      },
    ],
  },

  "hash-map-open-addressing": {
    id: "hash-map-open-addressing",
    name: "Hash Map (Open Addressing)",
    displayName: { en: "Hash Map (Open Addressing)", zh: "哈希表（开放寻址详解）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["hash", "open-addressing", "quadratic-probing", "double-hashing"],
    description: {
      en: "A hash map using quadratic probing for open addressing, reducing primary clustering compared to linear probing.",
      zh: "使用二次探测的开放寻址哈希表，相比线性探测减少一次聚集问题。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 705, titleSlug: "design-hashset", difficulty: "easy" },
      { id: 706, titleSlug: "design-hashmap", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Quadratic probing open addressing
class OAHashMap {
  #cap; #keys; #vals; #size = 0;
  static #DELETED = Symbol("del");

  constructor(cap = 17) { // prime cap reduces collisions
    this.#cap = cap;
    this.#keys = new Array(cap).fill(undefined);
    this.#vals = new Array(cap).fill(undefined);
  }

  #hash(k) {
    let h = 0;
    for (const c of String(k)) h = (h * 31 + c.charCodeAt(0)) % this.#cap;
    return h;
  }

  set(key, val) {
    let i = this.#hash(key), first = -1;
    for (let step = 0; step < this.#cap; step++) {
      const idx = (i + step * step) % this.#cap;
      if (this.#keys[idx] === undefined) {
        const ins = first !== -1 ? first : idx;
        this.#keys[ins] = key; this.#vals[ins] = val; this.#size++; return;
      }
      if (this.#keys[idx] === OAHashMap.#DELETED && first === -1) first = idx;
      if (this.#keys[idx] === key) { this.#vals[idx] = val; return; }
    }
  }

  get(key) {
    let i = this.#hash(key);
    for (let step = 0; step < this.#cap; step++) {
      const idx = (i + step * step) % this.#cap;
      if (this.#keys[idx] === undefined) return undefined;
      if (this.#keys[idx] === key) return this.#vals[idx];
    }
    return undefined;
  }

  delete(key) {
    let i = this.#hash(key);
    for (let step = 0; step < this.#cap; step++) {
      const idx = (i + step * step) % this.#cap;
      if (this.#keys[idx] === undefined) return;
      if (this.#keys[idx] === key) { this.#keys[idx] = OAHashMap.#DELETED; this.#size--; return; }
    }
  }
}

const m = new OAHashMap(17);
m.set("foo", 1); m.set("bar", 2);
console.log(m.get("foo")); // 1`,
      },
      {
        lang: "typescript",
        code: `// Quadratic probing open addressing
class OAHashMap<K extends string | number, V> {
  private cap: number;
  private keys: (K | null | undefined)[];
  private vals: (V | undefined)[];
  private size = 0;
  private static readonly DELETED = null;

  constructor(cap = 17) {
    this.cap = cap;
    this.keys = new Array(cap).fill(undefined);
    this.vals = new Array(cap).fill(undefined);
  }

  private hash(key: K): number {
    const s = String(key); let h = 0;
    for (const c of s) h = (h * 31 + c.charCodeAt(0)) % this.cap;
    return h;
  }

  set(key: K, val: V): void {
    let i = this.hash(key), first = -1;
    for (let step = 0; step < this.cap; step++) {
      const idx = (i + step * step) % this.cap;
      if (this.keys[idx] === undefined) {
        const ins = first !== -1 ? first : idx;
        this.keys[ins] = key; this.vals[ins] = val; this.size++; return;
      }
      if (this.keys[idx] === OAHashMap.DELETED && first === -1) first = idx;
      if (this.keys[idx] === key) { this.vals[idx] = val; return; }
    }
  }

  get(key: K): V | undefined {
    let i = this.hash(key);
    for (let step = 0; step < this.cap; step++) {
      const idx = (i + step * step) % this.cap;
      if (this.keys[idx] === undefined) return undefined;
      if (this.keys[idx] === key) return this.vals[idx];
    }
    return undefined;
  }
}`,
      },
      {
        lang: "java",
        code: `class OAHashMap<K, V> {
    private static final int CAP = 17;
    private Object[] keys = new Object[CAP];
    private Object[] vals = new Object[CAP];
    private boolean[] deleted = new boolean[CAP];
    private int size;

    private int hash(K key) { return Math.abs(key.hashCode()) % CAP; }

    void put(K key, V val) {
        int i = hash(key), first = -1;
        for (int s = 0; s < CAP; s++) {
            int idx = (i + s * s) % CAP;
            if (keys[idx] == null && !deleted[idx]) {
                int ins = first != -1 ? first : idx;
                keys[ins] = key; vals[ins] = val; size++; return;
            }
            if (deleted[idx] && first == -1) first = idx;
            if (key.equals(keys[idx])) { vals[idx] = val; return; }
        }
    }

    @SuppressWarnings("unchecked")
    V get(K key) {
        int i = hash(key);
        for (int s = 0; s < CAP; s++) {
            int idx = (i + s * s) % CAP;
            if (keys[idx] == null && !deleted[idx]) return null;
            if (!deleted[idx] && key.equals(keys[idx])) return (V) vals[idx];
        }
        return null;
    }
}`,
      },
      {
        lang: "python",
        code: `class OAHashMap:
    _DELETED = object()

    def __init__(self, cap=17):
        self.cap = cap
        self.keys = [None] * cap
        self.vals = [None] * cap
        self.size = 0

    def _hash(self, key):
        return hash(key) % self.cap

    def set(self, key, val):
        i = self._hash(key)
        first = -1
        for step in range(self.cap):
            idx = (i + step * step) % self.cap
            if self.keys[idx] is None:
                ins = first if first != -1 else idx
                self.keys[ins] = key
                self.vals[ins] = val
                self.size += 1
                return
            if self.keys[idx] is self._DELETED and first == -1:
                first = idx
            if self.keys[idx] == key:
                self.vals[idx] = val
                return

    def get(self, key):
        i = self._hash(key)
        for step in range(self.cap):
            idx = (i + step * step) % self.cap
            if self.keys[idx] is None:
                return None
            if self.keys[idx] == key:
                return self.vals[idx]
        return None`,
      },
      {
        lang: "rust",
        code: `use std::collections::HashMap;

// Rust std HashMap uses SwissTable (open addressing with SIMD)
fn main() {
    let mut map: HashMap<&str, i32> = HashMap::with_capacity(17);
    map.insert("alpha", 1);
    map.insert("beta", 2);
    map.entry("gamma").or_insert(3);

    for (k, v) in &map { println!("{}: {}", k, v); }
    map.retain(|_, v| *v > 1);
    println!("after retain: {:?}", map);
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <string.h>
#define CAP 17

typedef struct { char key[32]; int val; int used; int deleted; } Slot;
Slot table[CAP];

int hash(const char *k) {
    int h = 0; while (*k) h = (h*31 + *k++) % CAP; return h;
}

void set(const char *key, int val) {
    int i = hash(key), first = -1;
    for (int s = 0; s < CAP; s++) {
        int idx = (i + s*s) % CAP;
        if (!table[idx].used && !table[idx].deleted) {
            int ins = first != -1 ? first : idx;
            strncpy(table[ins].key, key, 31); table[ins].val = val;
            table[ins].used = 1; table[ins].deleted = 0; return;
        }
        if (table[idx].deleted && first == -1) first = idx;
        if (table[idx].used && strcmp(table[idx].key, key)==0) { table[idx].val = val; return; }
    }
}

int get(const char *key, int *out) {
    int i = hash(key);
    for (int s = 0; s < CAP; s++) {
        int idx = (i + s*s) % CAP;
        if (!table[idx].used && !table[idx].deleted) return 0;
        if (table[idx].used && strcmp(table[idx].key, key)==0) { *out = table[idx].val; return 1; }
    }
    return 0;
}

int main() {
    set("x", 10); set("y", 20);
    int v; get("x", &v); printf("%d\\n", v); // 10
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
#include <functional>
using namespace std;

template<typename K, typename V>
class OAHashMap {
    struct Slot { K key; V val; bool used=false, deleted=false; };
    int cap; vector<Slot> table;
    int idx(const K &k) { return abs((int)hash<K>{}(k)) % cap; }
public:
    OAHashMap(int cap=17): cap(cap), table(cap) {}
    void put(K k, V v) {
        int i=idx(k), first=-1;
        for (int s=0; s<cap; s++) {
            int id=(i+s*s)%cap;
            if (!table[id].used && !table[id].deleted) {
                int ins=first!=-1?first:id;
                table[ins]={k,v,true,false}; return;
            }
            if (table[id].deleted && first==-1) first=id;
            if (table[id].used && table[id].key==k) { table[id].val=v; return; }
        }
    }
    V* get(K k) {
        int i=idx(k);
        for (int s=0; s<cap; s++) {
            int id=(i+s*s)%cap;
            if (!table[id].used && !table[id].deleted) return nullptr;
            if (table[id].used && table[id].key==k) return &table[id].val;
        }
        return nullptr;
    }
};

int main() {
    OAHashMap<string,int> m;
    m.put("hello",1); m.put("world",2);
    cout << *m.get("hello") << "\\n"; // 1
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "fmt"
    "hash/fnv"
)

const cap = 17

type slot struct{ key interface{}; val interface{}; used, deleted bool }

type OAMap struct{ table [cap]slot }

func (m *OAMap) idx(key interface{}) int {
    h := fnv.New32(); h.Write([]byte(fmt.Sprint(key)))
    return int(h.Sum32()) % cap
}

func (m *OAMap) Set(key, val interface{}) {
    i, first := m.idx(key), -1
    for s := 0; s < cap; s++ {
        id := (i + s*s) % cap
        if !m.table[id].used && !m.table[id].deleted {
            ins := id; if first != -1 { ins = first }
            m.table[ins] = slot{key, val, true, false}; return
        }
        if m.table[id].deleted && first == -1 { first = id }
        if m.table[id].used && m.table[id].key == key { m.table[id].val = val; return }
    }
}

func (m *OAMap) Get(key interface{}) (interface{}, bool) {
    i := m.idx(key)
    for s := 0; s < cap; s++ {
        id := (i + s*s) % cap
        if !m.table[id].used && !m.table[id].deleted { return nil, false }
        if m.table[id].used && m.table[id].key == key { return m.table[id].val, true }
    }
    return nil, false
}

func main() {
    var m OAMap
    m.Set("a", 1); m.Set("b", 2)
    v, ok := m.Get("a")
    fmt.Println(v, ok) // 1 true
}`,
      },
      {
        lang: "php",
        code: `<?php
class OAHashMap {
    private array $keys;
    private array $vals;
    private array $deleted;
    private int $cap;

    public function __construct(int $cap = 17) {
        $this->cap = $cap;
        $this->keys = array_fill(0, $cap, null);
        $this->vals = array_fill(0, $cap, null);
        $this->deleted = array_fill(0, $cap, false);
    }

    private function hash(mixed $key): int {
        return abs(crc32((string)$key)) % $this->cap;
    }

    public function set(mixed $key, mixed $val): void {
        $i = $this->hash($key); $first = -1;
        for ($s = 0; $s < $this->cap; $s++) {
            $idx = ($i + $s * $s) % $this->cap;
            if ($this->keys[$idx] === null && !$this->deleted[$idx]) {
                $ins = $first !== -1 ? $first : $idx;
                $this->keys[$ins] = $key; $this->vals[$ins] = $val; return;
            }
            if ($this->deleted[$idx] && $first === -1) $first = $idx;
            if ($this->keys[$idx] === $key) { $this->vals[$idx] = $val; return; }
        }
    }

    public function get(mixed $key): mixed {
        $i = $this->hash($key);
        for ($s = 0; $s < $this->cap; $s++) {
            $idx = ($i + $s * $s) % $this->cap;
            if ($this->keys[$idx] === null && !$this->deleted[$idx]) return null;
            if ($this->keys[$idx] === $key) return $this->vals[$idx];
        }
        return null;
    }
}

$m = new OAHashMap();
$m->set("k", 7);
echo $m->get("k") . "\\n"; // 7`,
      },
      {
        lang: "kotlin",
        code: `class OAHashMap<K, V>(private val cap: Int = 17) {
    private val keys: Array<Any?> = arrayOfNulls(cap)
    private val vals: Array<Any?> = arrayOfNulls(cap)
    private val deleted = BooleanArray(cap)

    private fun idx(key: K) = Math.abs(key.hashCode()) % cap

    fun put(key: K, value: V) {
        var i = idx(key); var first = -1
        for (s in 0 until cap) {
            val id = (i + s * s) % cap
            if (keys[id] == null && !deleted[id]) {
                val ins = if (first != -1) first else id
                keys[ins] = key; vals[ins] = value; return
            }
            if (deleted[id] && first == -1) first = id
            if (keys[id] == key) { vals[id] = value; return }
        }
    }

    @Suppress("UNCHECKED_CAST")
    fun get(key: K): V? {
        val i = idx(key)
        for (s in 0 until cap) {
            val id = (i + s * s) % cap
            if (keys[id] == null && !deleted[id]) return null
            if (keys[id] == key) return vals[id] as V?
        }
        return null
    }
}

fun main() {
    val m = OAHashMap<String, Int>()
    m.put("a", 1); m.put("b", 2)
    println(m.get("a")) // 1
}`,
      },
      {
        lang: "swift",
        code: `struct OAHashMap<K: Hashable, V> {
    private var keys: [K?]
    private var vals: [V?]
    private var deleted: [Bool]
    private let cap: Int

    init(capacity: Int = 17) {
        cap = capacity
        keys = Array(repeating: nil, count: capacity)
        vals = Array(repeating: nil, count: capacity)
        deleted = Array(repeating: false, count: capacity)
    }

    private func idx(_ key: K) -> Int { abs(key.hashValue) % cap }

    mutating func set(_ key: K, _ val: V) {
        let i = idx(key); var first = -1
        for s in 0..<cap {
            let id = (i + s * s) % cap
            if keys[id] == nil && !deleted[id] {
                let ins = first != -1 ? first : id
                keys[ins] = key; vals[ins] = val; return
            }
            if deleted[id] && first == -1 { first = id }
            if keys[id] == key { vals[id] = val; return }
        }
    }

    func get(_ key: K) -> V? {
        let i = idx(key)
        for s in 0..<cap {
            let id = (i + s * s) % cap
            if keys[id] == nil && !deleted[id] { return nil }
            if keys[id] == key { return vals[id] }
        }
        return nil
    }
}

var m = OAHashMap<String, Int>()
m.set("hello", 42)
print(m.get("hello")!) // 42`,
      },
    ],
  },
}
