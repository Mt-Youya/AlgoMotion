import type { AlgorithmMeta } from "@algomotion/shared"

export const advancedDsAlgorithms: Record<string, AlgorithmMeta> = {
  "priority-queue": {
    id: "priority-queue",
    name: "Priority Queue",
    displayName: { en: "Priority Queue", zh: "优先队列" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["heap", "priority-queue", "greedy"],
    description: {
      en: "An abstract data type where each element has a priority; elements are served in priority order. Typically implemented with a heap.",
      zh: "每个元素附带优先级的抽象数据类型，按优先级顺序出队，通常用堆实现。",
    },
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 23, titleSlug: "merge-k-sorted-lists", difficulty: "hard" },
      { id: 373, titleSlug: "find-k-pairs-with-smallest-sums", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class PriorityQueue {
  #heap = [];
  #cmp;
  constructor(comparator = (a,b) => a[0] - b[0]) { this.#cmp = comparator; }

  push(item) {
    this.#heap.push(item);
    let i = this.#heap.length - 1;
    while (i > 0) {
      const p = (i-1) >> 1;
      if (this.#cmp(this.#heap[p], this.#heap[i]) <= 0) break;
      [this.#heap[p], this.#heap[i]] = [this.#heap[i], this.#heap[p]];
      i = p;
    }
  }

  pop() {
    const top = this.#heap[0];
    const last = this.#heap.pop();
    if (this.#heap.length) {
      this.#heap[0] = last;
      let i = 0;
      while (true) {
        let m = i, l = 2*i+1, r = 2*i+2;
        if (l < this.#heap.length && this.#cmp(this.#heap[l], this.#heap[m]) < 0) m = l;
        if (r < this.#heap.length && this.#cmp(this.#heap[r], this.#heap[m]) < 0) m = r;
        if (m === i) break;
        [this.#heap[m], this.#heap[i]] = [this.#heap[i], this.#heap[m]];
        i = m;
      }
    }
    return top;
  }

  peek() { return this.#heap[0]; }
  get size() { return this.#heap.length; }
}

// Min-priority queue by priority value
const pq = new PriorityQueue();
pq.push([3, "task3"]); pq.push([1, "task1"]); pq.push([2, "task2"]);
console.log(pq.pop()); // [1, 'task1']
console.log(pq.pop()); // [2, 'task2']`,
      },
      {
        lang: "typescript",
        code: `type CmpFn<T> = (a: T, b: T) => number;

class PriorityQueue<T> {
  private heap: T[] = [];
  constructor(private cmp: CmpFn<T> = (a: any, b: any) => a - b) {}

  push(item: T): void {
    this.heap.push(item);
    let i = this.heap.length - 1;
    while (i > 0) {
      const p = (i-1) >> 1;
      if (this.cmp(this.heap[p], this.heap[i]) <= 0) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }

  pop(): T | undefined {
    if (!this.heap.length) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let m = i, l = 2*i+1, r = 2*i+2;
        if (l < this.heap.length && this.cmp(this.heap[l], this.heap[m]) < 0) m = l;
        if (r < this.heap.length && this.cmp(this.heap[r], this.heap[m]) < 0) m = r;
        if (m === i) break;
        [this.heap[m], this.heap[i]] = [this.heap[i], this.heap[m]];
        i = m;
      }
    }
    return top;
  }

  peek(): T | undefined { return this.heap[0]; }
  get size(): number { return this.heap.length; }
}

const pq = new PriorityQueue<[number, string]>((a,b) => a[0] - b[0]);
pq.push([3,"c"]); pq.push([1,"a"]); pq.push([2,"b"]);
console.log(pq.pop()); // [1,'a']`,
      },
      {
        lang: "java",
        code: `import java.util.PriorityQueue;

// Min-PQ with custom comparator
PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0] - b[0]);
pq.offer(new int[]{3,30}); pq.offer(new int[]{1,10}); pq.offer(new int[]{2,20});
System.out.println(java.util.Arrays.toString(pq.poll())); // [1, 10]
System.out.println(java.util.Arrays.toString(pq.poll())); // [2, 20]`,
      },
      {
        lang: "python",
        code: `import heapq

# heapq + tuple for priority queue with payload
pq = []
heapq.heappush(pq, (3, "task3"))
heapq.heappush(pq, (1, "task1"))
heapq.heappush(pq, (2, "task2"))

print(heapq.heappop(pq))  # (1, 'task1')
print(heapq.heappop(pq))  # (2, 'task2')`,
      },
      {
        lang: "rust",
        code: `use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    let mut pq: BinaryHeap<Reverse<(i32, &str)>> = BinaryHeap::new();
    pq.push(Reverse((3, "task3")));
    pq.push(Reverse((1, "task1")));
    pq.push(Reverse((2, "task2")));
    println!("{:?}", pq.pop()); // Some(Reverse((1, "task1")))
    println!("{:?}", pq.pop()); // Some(Reverse((2, "task2")))
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAX 100

typedef struct { int pri; char data[32]; } Item;
Item heap[MAX]; int sz=0;

void push(Item item){
    heap[sz++]=item;
    int i=sz-1;
    while(i>0){int p=(i-1)/2;if(heap[p].pri<=heap[i].pri)break;
        Item t=heap[p];heap[p]=heap[i];heap[i]=t;i=p;}
}

Item pop(){
    Item top=heap[0]; heap[0]=heap[--sz];
    int i=0;
    while(1){int l=2*i+1,r=2*i+2,m=i;
        if(l<sz&&heap[l].pri<heap[m].pri)m=l;
        if(r<sz&&heap[r].pri<heap[m].pri)m=r;
        if(m==i)break;Item t=heap[m];heap[m]=heap[i];heap[i]=t;i=m;}
    return top;
}

int main(){
    push((Item){3,"task3"}); push((Item){1,"task1"}); push((Item){2,"task2"});
    Item t=pop(); printf("%d:%s\\n",t.pri,t.data); // 1:task1
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <queue>
#include <vector>
#include <string>
using namespace std;

int main(){
    using Item = pair<int,string>;
    priority_queue<Item, vector<Item>, greater<Item>> pq; // min by first
    pq.push({3,"task3"}); pq.push({1,"task1"}); pq.push({2,"task2"});
    cout<<pq.top().first<<":"<<pq.top().second<<"\\n"; pq.pop(); // 1:task1
    cout<<pq.top().first<<":"<<pq.top().second<<"\\n"; // 2:task2
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/heap"
    "fmt"
)

type Item struct { priority int; value string }
type PQ []*Item
func (pq PQ) Len()int{return len(pq)}
func (pq PQ) Less(i,j int)bool{return pq[i].priority < pq[j].priority}
func (pq PQ) Swap(i,j int){pq[i],pq[j]=pq[j],pq[i]}
func (pq *PQ) Push(x any){*pq=append(*pq,x.(*Item))}
func (pq *PQ) Pop()any{old:=*pq;n:=len(old);x:=old[n-1];*pq=old[:n-1];return x}

func main(){
    pq:=&PQ{{3,"c"},{1,"a"},{2,"b"}}; heap.Init(pq)
    fmt.Println(heap.Pop(pq).(*Item)) // &{1 a}
    fmt.Println(heap.Pop(pq).(*Item)) // &{2 b}
}`,
      },
      {
        lang: "php",
        code: `<?php
class PriorityQueue extends SplPriorityQueue {
    public function compare(mixed $p1, mixed $p2): int { return $p2 <=> $p1; } // min-heap
}

$pq = new PriorityQueue();
$pq->insert("task3", 3);
$pq->insert("task1", 1);
$pq->insert("task2", 2);
echo $pq->extract() . "\\n"; // task1
echo $pq->extract() . "\\n"; // task2`,
      },
      {
        lang: "kotlin",
        code: `import java.util.PriorityQueue

data class Item(val priority: Int, val value: String)

fun main(){
    val pq=PriorityQueue<Item>(compareBy{it.priority})
    pq.offer(Item(3,"c")); pq.offer(Item(1,"a")); pq.offer(Item(2,"b"))
    println(pq.poll()) // Item(priority=1, value=a)
    println(pq.poll()) // Item(priority=2, value=b)
}`,
      },
      {
        lang: "swift",
        code: `struct PriorityQueue<T> {
    private var heap: [(Int, T)] = []

    mutating func push(priority: Int, value: T) {
        heap.append((priority, value))
        var i = heap.count - 1
        while i > 0 { let p=(i-1)/2; if heap[p].0<=heap[i].0{break}; heap.swapAt(p,i); i=p }
    }

    mutating func pop() -> (Int, T)? {
        guard !heap.isEmpty else { return nil }
        let top = heap[0]; heap[0] = heap.removeLast()
        if heap.isEmpty { return top }
        var i = 0
        while true {
            var m=i,l=2*i+1,r=2*i+2
            if l<heap.count&&heap[l].0<heap[m].0{m=l}
            if r<heap.count&&heap[r].0<heap[m].0{m=r}
            if m==i{break}; heap.swapAt(m,i); i=m
        }
        return top
    }
}

var pq = PriorityQueue<String>()
pq.push(priority:3,value:"c"); pq.push(priority:1,value:"a"); pq.push(priority:2,value:"b")
print(pq.pop()!) // (1, "a")`,
      },
    ],
  },

  "disjoint-set": {
    id: "disjoint-set",
    name: "Disjoint Set (Union-Find)",
    displayName: { en: "Disjoint Set (Union-Find)", zh: "并查集（Union-Find）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["union-find", "disjoint-set", "graph", "connectivity"],
    description: {
      en: "A data structure tracking a partition of elements into disjoint subsets, supporting near-O(1) union and find with path compression and union by rank.",
      zh: "追踪元素分组的数据结构，路径压缩和按秩合并后 union 和 find 接近 O(1)。",
    },
    timeComplexity: { best: "O(α(n))", average: "O(α(n))", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 547, titleSlug: "number-of-provinces", difficulty: "medium" },
      { id: 684, titleSlug: "redundant-connection", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length:n}, (_,i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;
  }

  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x, y) {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    this.count--;
    return true;
  }

  connected(x, y) { return this.find(x) === this.find(y); }
}

const uf = new UnionFind(5);
uf.union(0,1); uf.union(1,2); uf.union(3,4);
console.log(uf.connected(0,2)); // true
console.log(uf.connected(0,3)); // false
console.log(uf.count);          // 2`,
      },
      {
        lang: "typescript",
        code: `class UnionFind {
  parent: number[];
  rank: number[];
  count: number;

  constructor(n: number) {
    this.parent = Array.from({length:n}, (_,i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;
  }

  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x: number, y: number): boolean {
    const px = this.find(x), py = this.find(y);
    if (px === py) return false;
    if (this.rank[px] < this.rank[py]) this.parent[px] = py;
    else if (this.rank[px] > this.rank[py]) this.parent[py] = px;
    else { this.parent[py] = px; this.rank[px]++; }
    this.count--;
    return true;
  }

  connected(x: number, y: number): boolean { return this.find(x) === this.find(y); }
}`,
      },
      {
        lang: "java",
        code: `class UnionFind {
    int[] parent, rank; int count;

    UnionFind(int n) {
        parent=new int[n]; rank=new int[n]; count=n;
        for(int i=0;i<n;i++) parent[i]=i;
    }

    int find(int x) { return parent[x]==x?x:(parent[x]=find(parent[x])); }

    boolean union(int x,int y){
        int px=find(x),py=find(y);
        if(px==py)return false;
        if(rank[px]<rank[py])parent[px]=py;
        else if(rank[px]>rank[py])parent[py]=px;
        else{parent[py]=px;rank[px]++;}
        count--; return true;
    }

    boolean connected(int x,int y){return find(x)==find(y);}
}`,
      },
      {
        lang: "python",
        code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: self.parent[px] = py
        elif self.rank[px] > self.rank[py]: self.parent[py] = px
        else: self.parent[py] = px; self.rank[px] += 1
        self.count -= 1
        return True

    def connected(self, x, y): return self.find(x) == self.find(y)

uf = UnionFind(5)
uf.union(0,1); uf.union(1,2); uf.union(3,4)
print(uf.connected(0,2))  # True
print(uf.connected(0,3))  # False`,
      },
      {
        lang: "rust",
        code: `struct UnionFind { parent: Vec<usize>, rank: Vec<usize>, pub count: usize }

impl UnionFind {
    fn new(n: usize) -> Self {
        UnionFind { parent: (0..n).collect(), rank: vec![0;n], count: n }
    }
    fn find(&mut self, x: usize) -> usize {
        if self.parent[x] != x { self.parent[x] = self.find(self.parent[x]); }
        self.parent[x]
    }
    fn union(&mut self, x: usize, y: usize) -> bool {
        let (px, py) = (self.find(x), self.find(y));
        if px == py { return false; }
        if self.rank[px] < self.rank[py] { self.parent[px] = py; }
        else if self.rank[px] > self.rank[py] { self.parent[py] = px; }
        else { self.parent[py] = px; self.rank[px] += 1; }
        self.count -= 1; true
    }
    fn connected(&mut self, x: usize, y: usize) -> bool { self.find(x) == self.find(y) }
}

fn main() {
    let mut uf = UnionFind::new(5);
    uf.union(0,1); uf.union(1,2); uf.union(3,4);
    println!("{}", uf.connected(0,2)); // true
    println!("{}", uf.count);          // 2
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 100

int parent[MAXN], rank_[MAXN];

void init(int n){for(int i=0;i<n;i++){parent[i]=i;rank_[i]=0;}}

int find(int x){return parent[x]==x?x:(parent[x]=find(parent[x]));}

int unite(int x,int y){
    int px=find(x),py=find(y);
    if(px==py)return 0;
    if(rank_[px]<rank_[py])parent[px]=py;
    else if(rank_[px]>rank_[py])parent[py]=px;
    else{parent[py]=px;rank_[px]++;}
    return 1;
}

int main(){
    init(5); unite(0,1); unite(1,2); unite(3,4);
    printf("%d\\n",find(0)==find(2)); // 1 (connected)
    printf("%d\\n",find(0)==find(3)); // 0 (not connected)
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

class UnionFind {
    vector<int> parent, rank_; int count;
public:
    UnionFind(int n):parent(n),rank_(n,0),count(n){iota(parent.begin(),parent.end(),0);}
    int find(int x){return parent[x]==x?x:(parent[x]=find(parent[x]));}
    bool unite(int x,int y){
        int px=find(x),py=find(y);if(px==py)return false;
        if(rank_[px]<rank_[py])parent[px]=py;
        else if(rank_[px]>rank_[py])parent[py]=px;
        else{parent[py]=px;rank_[px]++;}
        count--;return true;
    }
    bool connected(int x,int y){return find(x)==find(y);}
    int getCount(){return count;}
};

int main(){
    UnionFind uf(5); uf.unite(0,1);uf.unite(1,2);uf.unite(3,4);
    cout<<uf.connected(0,2)<<"\\n"; // 1
    cout<<uf.getCount()<<"\\n";     // 2
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type UnionFind struct { parent, rank []int; count int }

func NewUF(n int)*UnionFind{
    p:=make([]int,n);r:=make([]int,n)
    for i:=range p{p[i]=i}
    return &UnionFind{p,r,n}
}
func (uf *UnionFind)Find(x int)int{
    if uf.parent[x]!=x{uf.parent[x]=uf.Find(uf.parent[x])};return uf.parent[x]
}
func (uf *UnionFind)Union(x,y int)bool{
    px,py:=uf.Find(x),uf.Find(y);if px==py{return false}
    if uf.rank[px]<uf.rank[py]{uf.parent[px]=py}else if uf.rank[px]>uf.rank[py]{uf.parent[py]=px}else{uf.parent[py]=px;uf.rank[px]++}
    uf.count--;return true
}
func (uf *UnionFind)Connected(x,y int)bool{return uf.Find(x)==uf.Find(y)}

func main(){uf:=NewUF(5);uf.Union(0,1);uf.Union(1,2);uf.Union(3,4);fmt.Println(uf.Connected(0,2),uf.count)}`,
      },
      {
        lang: "php",
        code: `<?php
class UnionFind {
    private array $parent, $rank; public int $count;
    public function __construct(int $n) {
        $this->count=$n;
        for($i=0;$i<$n;$i++){$this->parent[$i]=$i;$this->rank[$i]=0;}
    }
    public function find(int $x):int {
        if($this->parent[$x]!==$x)$this->parent[$x]=$this->find($this->parent[$x]);
        return $this->parent[$x];
    }
    public function union(int $x,int $y):bool {
        $px=$this->find($x);$py=$this->find($y);
        if($px===$py)return false;
        if($this->rank[$px]<$this->rank[$py])$this->parent[$px]=$py;
        elseif($this->rank[$px]>$this->rank[$py])$this->parent[$py]=$px;
        else{$this->parent[$py]=$px;$this->rank[$px]++;}
        $this->count--;return true;
    }
    public function connected(int $x,int $y):bool{return $this->find($x)===$this->find($y);}
}

$uf=new UnionFind(5);$uf->union(0,1);$uf->union(1,2);$uf->union(3,4);
var_dump($uf->connected(0,2),$uf->connected(0,3));`,
      },
      {
        lang: "kotlin",
        code: `class UnionFind(n:Int){
    val parent=IntArray(n){it}; val rank=IntArray(n); var count=n
    fun find(x:Int):Int{if(parent[x]!=x)parent[x]=find(parent[x]);return parent[x]}
    fun union(x:Int,y:Int):Boolean{
        val px=find(x);val py=find(y);if(px==py)return false
        when{rank[px]<rank[py]->parent[px]=py;rank[px]>rank[py]->parent[py]=px;else->{parent[py]=px;rank[px]++}}
        count--;return true
    }
    fun connected(x:Int,y:Int)=find(x)==find(y)
}

fun main(){val uf=UnionFind(5);uf.union(0,1);uf.union(1,2);uf.union(3,4);println(uf.connected(0,2));println(uf.count)}`,
      },
      {
        lang: "swift",
        code: `class UnionFind {
    var parent:[Int]; var rank:[Int]; var count:Int
    init(_ n:Int){parent=Array(0..<n);rank=Array(repeating:0,count:n);count=n}
    func find(_ x:Int)->Int{if parent[x] != x{parent[x]=find(parent[x])};return parent[x]}
    @discardableResult
    func union(_ x:Int,_ y:Int)->Bool{
        let px=find(x),py=find(y);if px==py{return false}
        if rank[px]<rank[py]{parent[px]=py}else if rank[px]>rank[py]{parent[py]=px}else{parent[py]=px;rank[px]+=1}
        count-=1;return true
    }
    func connected(_ x:Int,_ y:Int)->Bool{find(x)==find(y)}
}

let uf=UnionFind(5);uf.union(0,1);uf.union(1,2);uf.union(3,4)
print(uf.connected(0,2),uf.connected(0,3),uf.count)`,
      },
    ],
  },

  "bloom-filter": {
    id: "bloom-filter",
    name: "Bloom Filter",
    displayName: { en: "Bloom Filter", zh: "布隆过滤器" },
    category: "data-structure",
    difficulty: "advanced",
    tags: ["bloom-filter", "probabilistic", "hashing", "membership"],
    description: {
      en: "A space-efficient probabilistic structure testing membership with possible false positives but no false negatives.",
      zh: "空间高效的概率型结构，成员测试可能有假阳性，但不会有假阴性。",
    },
    timeComplexity: { best: "O(k)", average: "O(k)", worst: "O(k)" },
    spaceComplexity: "O(m)",
    relatedProblems: [{ id: 705, titleSlug: "design-hashset", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `class BloomFilter {
  constructor(size = 1000, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  #hash(str, seed) {
    let h = seed;
    for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 0x9e3779b9) >>> 0;
    return h % this.size;
  }

  #setBit(i) { this.bits[i >> 3] |= 1 << (i & 7); }
  #testBit(i) { return (this.bits[i >> 3] >> (i & 7)) & 1; }

  add(item) {
    const s = String(item);
    for (let k = 0; k < this.hashCount; k++) this.#setBit(this.#hash(s, k * 2654435769));
  }

  mightContain(item) {
    const s = String(item);
    for (let k = 0; k < this.hashCount; k++)
      if (!this.#testBit(this.#hash(s, k * 2654435769))) return false;
    return true;
  }
}

const bf = new BloomFilter(1000, 3);
bf.add("apple"); bf.add("banana");
console.log(bf.mightContain("apple"));  // true
console.log(bf.mightContain("cherry")); // false (almost certainly)`,
      },
      {
        lang: "typescript",
        code: `class BloomFilter {
  private bits: Uint8Array;
  private size: number;
  private hashCount: number;

  constructor(size = 1000, hashCount = 3) {
    this.size = size; this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  private hash(str: string, seed: number): number {
    let h = seed;
    for (const c of str) h = (Math.imul(h ^ c.charCodeAt(0), 0x9e3779b9) >>> 0);
    return h % this.size;
  }

  add(item: string): void {
    for (let k = 0; k < this.hashCount; k++) {
      const i = this.hash(item, k * 2654435769);
      this.bits[i >> 3] |= 1 << (i & 7);
    }
  }

  mightContain(item: string): boolean {
    for (let k = 0; k < this.hashCount; k++) {
      const i = this.hash(item, k * 2654435769);
      if (!((this.bits[i >> 3] >> (i & 7)) & 1)) return false;
    }
    return true;
  }
}`,
      },
      {
        lang: "java",
        code: `import java.util.BitSet;

class BloomFilter {
    private final BitSet bits;
    private final int size, k;

    BloomFilter(int size, int k) { this.size=size; this.k=k; bits=new BitSet(size); }

    private int hash(String s, int seed) {
        int h = seed;
        for (char c : s.toCharArray()) h = h ^ c * 0x9e3779b9;
        return Math.abs(h) % size;
    }

    void add(String s) { for(int i=0;i<k;i++) bits.set(hash(s,i*1000003)); }

    boolean mightContain(String s) {
        for(int i=0;i<k;i++) if(!bits.get(hash(s,i*1000003))) return false;
        return true;
    }
}`,
      },
      {
        lang: "python",
        code: `import math

class BloomFilter:
    def __init__(self, size=1000, hash_count=3):
        self.size = size
        self.hash_count = hash_count
        self.bits = bytearray(math.ceil(size / 8))

    def _hash(self, item, seed):
        h = seed
        for c in str(item):
            h = (h ^ ord(c)) * 0x9e3779b9 & 0xffffffff
        return h % self.size

    def _set(self, i): self.bits[i >> 3] |= 1 << (i & 7)
    def _test(self, i): return bool((self.bits[i >> 3] >> (i & 7)) & 1)

    def add(self, item):
        for k in range(self.hash_count): self._set(self._hash(item, k * 2654435769))

    def might_contain(self, item):
        return all(self._test(self._hash(item, k * 2654435769)) for k in range(self.hash_count))

bf = BloomFilter(1000, 3)
bf.add("hello"); bf.add("world")
print(bf.might_contain("hello"))  # True
print(bf.might_contain("foo"))    # False (likely)`,
      },
      {
        lang: "rust",
        code: `struct BloomFilter { bits: Vec<u8>, size: usize, k: usize }

impl BloomFilter {
    fn new(size: usize, k: usize) -> Self {
        BloomFilter { bits: vec![0u8; (size+7)/8], size, k }
    }

    fn hash(&self, item: &str, seed: u64) -> usize {
        let mut h = seed;
        for c in item.bytes() { h = h.wrapping_mul(0x9e3779b9) ^ c as u64; }
        (h as usize) % self.size
    }

    fn add(&mut self, item: &str) {
        for k in 0..self.k {
            let i = self.hash(item, k as u64 * 2654435769);
            self.bits[i >> 3] |= 1 << (i & 7);
        }
    }

    fn might_contain(&self, item: &str) -> bool {
        (0..self.k).all(|k| {
            let i = self.hash(item, k as u64 * 2654435769);
            (self.bits[i >> 3] >> (i & 7)) & 1 == 1
        })
    }
}

fn main() {
    let mut bf = BloomFilter::new(1000, 3);
    bf.add("apple"); bf.add("banana");
    println!("{}", bf.might_contain("apple"));  // true
    println!("{}", bf.might_contain("cherry")); // false
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <string.h>
#define SIZE 1000

unsigned char bits[SIZE/8+1];

void set_bit(int i){bits[i>>3]|=1<<(i&7);}
int test_bit(int i){return (bits[i>>3]>>(i&7))&1;}

int hash_fn(const char *s,int seed){
    int h=seed;
    while(*s)h=(h^(unsigned char)*s++)*0x9e3779b9;
    return ((unsigned)h)%SIZE;
}

void bf_add(const char *s){
    for(int k=0;k<3;k++)set_bit(hash_fn(s,k*1000003));
}

int bf_contains(const char *s){
    for(int k=0;k<3;k++)if(!test_bit(hash_fn(s,k*1000003)))return 0;
    return 1;
}

int main(){
    bf_add("apple"); bf_add("banana");
    printf("%d\\n",bf_contains("apple")); // 1
    printf("%d\\n",bf_contains("cherry")); // 0 (likely)
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <bitset>
#include <string>
using namespace std;
const int SIZE=10000;

class BloomFilter {
    bitset<SIZE> bits; int k;
    int hash_(const string &s,int seed) const {
        int h=seed;
        for(char c:s)h=(h^(unsigned char)c)*0x9e3779b9;
        return ((unsigned)h)%SIZE;
    }
public:
    BloomFilter(int k=3):k(k){}
    void add(const string &s){for(int i=0;i<k;i++)bits.set(hash_(s,i*1000003));}
    bool mightContain(const string &s) const {
        for(int i=0;i<k;i++)if(!bits.test(hash_(s,i*1000003)))return false;
        return true;
    }
};

int main(){
    BloomFilter bf;
    bf.add("apple"); bf.add("banana");
    cout<<bf.mightContain("apple")<<"\\n"; // 1
    cout<<bf.mightContain("cherry")<<"\\n"; // 0 (likely)
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

const SIZE = 10000

type BloomFilter struct { bits [SIZE/8 + 1]byte; k int }

func NewBloom(k int) *BloomFilter { return &BloomFilter{k: k} }

func (b *BloomFilter) hash(s string, seed uint) uint {
    h := seed
    for _, c := range []byte(s) { h = (h^uint(c))*0x9e3779b9 }
    return h % SIZE
}

func (b *BloomFilter) Add(s string) {
    for k := 0; k < b.k; k++ { i:=b.hash(s,uint(k)*2654435769); b.bits[i>>3]|=1<<(i&7) }
}

func (b *BloomFilter) MightContain(s string) bool {
    for k := 0; k < b.k; k++ {
        i:=b.hash(s,uint(k)*2654435769)
        if (b.bits[i>>3]>>(i&7))&1==0 { return false }
    }
    return true
}

func main() {
    bf:=NewBloom(3); bf.Add("apple"); bf.Add("banana")
    fmt.Println(bf.MightContain("apple"))  // true
    fmt.Println(bf.MightContain("cherry")) // false
}`,
      },
      {
        lang: "php",
        code: `<?php
class BloomFilter {
    private string $bits; private int $size,$k;
    public function __construct(int $size=10000,int $k=3){
        $this->size=$size;$this->k=$k;$this->bits=str_repeat("\\0",(int)ceil($size/8));
    }
    private function hash(string $s,int $seed):int{
        $h=$seed;for($i=0;$i<strlen($s);$i++)$h=($h^ord($s[$i]))*0x9e3779b9&0xffffffff;
        return $h%$this->size;
    }
    public function add(string $s):void{
        for($k=0;$k<$this->k;$k++){$i=$this->hash($s,$k*1000003);$this->bits[$i>>3]=chr(ord($this->bits[$i>>3])|(1<<($i&7)));}
    }
    public function mightContain(string $s):bool{
        for($k=0;$k<$this->k;$k++){$i=$this->hash($s,$k*1000003);if(!(ord($this->bits[$i>>3])&(1<<($i&7))))return false;}
        return true;
    }
}

$bf=new BloomFilter();$bf->add("apple");$bf->add("banana");
var_dump($bf->mightContain("apple"),$bf->mightContain("cherry"));`,
      },
      {
        lang: "kotlin",
        code: `class BloomFilter(val size:Int=10000,val k:Int=3){
    val bits=ByteArray((size+7)/8)
    fun hash(s:String,seed:Int):Int{var h=seed;for(c in s)h=(h xor c.code)*0x9e3779b9.toInt();return Math.abs(h)%size}
    fun add(s:String){for(i in 0 until k){val b=hash(s,i*1000003);bits[b shr 3]=(bits[b shr 3].toInt() or (1 shl (b and 7))).toByte()}}
    fun mightContain(s:String):Boolean{for(i in 0 until k){val b=hash(s,i*1000003);if(bits[b shr 3].toInt() and (1 shl (b and 7))==0)return false};return true}
}

fun main(){val bf=BloomFilter();bf.add("apple");bf.add("banana");println(bf.mightContain("apple"));println(bf.mightContain("cherry"))}`,
      },
      {
        lang: "swift",
        code: `class BloomFilter {
    var bits:[UInt8]; let size,k:Int
    init(size:Int=10000,k:Int=3){self.size=size;self.k=k;bits=Array(repeating:0,count:(size+7)/8)}
    func hash(_ s:String,_ seed:Int)->Int{var h=seed;for c in s.utf8{h=(h^Int(c))*0x9e3779b9};return abs(h)%size}
    func add(_ s:String){for i in 0..<k{let b=hash(s,i*1000003);bits[b>>3]|=UInt8(1<<(b&7))}}
    func mightContain(_ s:String)->Bool{for i in 0..<k{let b=hash(s,i*1000003);if bits[b>>3]&UInt8(1<<(b&7))==0{return false}};return true}
}

let bf=BloomFilter();bf.add("apple");bf.add("banana")
print(bf.mightContain("apple"),bf.mightContain("cherry"))`,
      },
    ],
  },

  "lru-cache": {
    id: "lru-cache",
    name: "LRU Cache",
    displayName: { en: "LRU Cache", zh: "LRU 缓存" },
    category: "data-structure",
    difficulty: "advanced",
    tags: ["lru", "cache", "doubly-linked-list", "hash-map"],
    description: {
      en: "A cache that evicts the Least Recently Used item when full, implemented with a hash map and doubly linked list for O(1) get and put.",
      zh: "容量满时淘汰最近最少使用项的缓存，用哈希表和双向链表实现 O(1) 的 get 和 put。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(capacity)",
    relatedProblems: [{ id: 146, titleSlug: "lru-cache", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `class LRUCache {
  #cap; #map = new Map();

  constructor(capacity) { this.#cap = capacity; }

  get(key) {
    if (!this.#map.has(key)) return -1;
    const val = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, val); // move to end (most recent)
    return val;
  }

  put(key, val) {
    if (this.#map.has(key)) this.#map.delete(key);
    else if (this.#map.size >= this.#cap)
      this.#map.delete(this.#map.keys().next().value); // evict LRU (first)
    this.#map.set(key, val);
  }
}

const cache = new LRUCache(2);
cache.put(1, 1); cache.put(2, 2);
console.log(cache.get(1));  // 1
cache.put(3, 3);            // evicts key 2
console.log(cache.get(2));  // -1 (evicted)
cache.put(4, 4);            // evicts key 1
console.log(cache.get(1));  // -1
console.log(cache.get(3));  // 3
console.log(cache.get(4));  // 4`,
      },
      {
        lang: "typescript",
        code: `class LRUCache {
  private map = new Map<number, number>();
  constructor(private cap: number) {}

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key: number, val: number): void {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap)
      this.map.delete(this.map.keys().next().value);
    this.map.set(key, val);
  }
}`,
      },
      {
        lang: "java",
        code: `import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache {
    private final int cap;
    private final LinkedHashMap<Integer,Integer> map;

    LRUCache(int cap) {
        this.cap = cap;
        this.map = new LinkedHashMap<>(16, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer,Integer> e) {
                return size() > cap;
            }
        };
    }

    int get(int key) { return map.getOrDefault(key, -1); }
    void put(int key, int val) { map.put(key, val); }
}`,
      },
      {
        lang: "python",
        code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, val: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = val
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)

c = LRUCache(2)
c.put(1,1); c.put(2,2)
print(c.get(1))  # 1
c.put(3,3)
print(c.get(2))  # -1`,
      },
      {
        lang: "rust",
        code: `use std::collections::HashMap;

struct LRUCache {
    cap: usize,
    map: HashMap<i32, (i32, usize)>, // key -> (val, timestamp)
    clock: usize,
}

impl LRUCache {
    fn new(cap: usize) -> Self { LRUCache { cap, map: HashMap::new(), clock: 0 } }

    fn get(&mut self, key: i32) -> i32 {
        if let Some(entry) = self.map.get_mut(&key) {
            self.clock += 1; entry.1 = self.clock; entry.0
        } else { -1 }
    }

    fn put(&mut self, key: i32, val: i32) {
        self.clock += 1;
        if self.map.contains_key(&key) { self.map.insert(key, (val, self.clock)); return; }
        if self.map.len() == self.cap {
            let lru = *self.map.iter().min_by_key(|(_,v)| v.1).unwrap().0;
            self.map.remove(&lru);
        }
        self.map.insert(key, (val, self.clock));
    }
}

fn main() {
    let mut c = LRUCache::new(2);
    c.put(1,1); c.put(2,2);
    println!("{}", c.get(1)); // 1
    c.put(3,3);
    println!("{}", c.get(2)); // -1
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define CAP 2

typedef struct Node { int key,val; struct Node *prev,*next; } Node;
Node *head,*tail; // dummy nodes
int size=0;

void init(){ head=calloc(1,sizeof(Node)); tail=calloc(1,sizeof(Node)); head->next=tail; tail->prev=head; }

void remove_node(Node *n){ n->prev->next=n->next; n->next->prev=n->prev; }
void add_to_end(Node *n){ n->prev=tail->prev; n->next=tail; tail->prev->next=n; tail->prev=n; }

int lru_get(int key){
    for(Node *n=head->next;n!=tail;n=n->next)
        if(n->key==key){ remove_node(n); add_to_end(n); return n->val; }
    return -1;
}

void lru_put(int key,int val){
    for(Node *n=head->next;n!=tail;n=n->next)
        if(n->key==key){ n->val=val; remove_node(n); add_to_end(n); return; }
    Node *n=calloc(1,sizeof(Node)); n->key=key; n->val=val; add_to_end(n); size++;
    if(size>CAP){ Node *lru=head->next; remove_node(lru); free(lru); size--; }
}

int main(){ init(); lru_put(1,1); lru_put(2,2); printf("%d\\n",lru_get(1)); lru_put(3,3); printf("%d\\n",lru_get(2)); return 0; }`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int,int>> lst; // {key,val}
    unordered_map<int,list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c):cap(c){}
    int get(int k){
        if(!mp.count(k))return -1;
        lst.splice(lst.end(),lst,mp[k]);
        return mp[k]->second;
    }
    void put(int k,int v){
        if(mp.count(k)){lst.erase(mp[k]);}
        else if((int)lst.size()==cap){mp.erase(lst.front().first);lst.pop_front();}
        lst.emplace_back(k,v); mp[k]=prev(lst.end());
    }
};

int main(){LRUCache c(2);c.put(1,1);c.put(2,2);cout<<c.get(1)<<"\\n";c.put(3,3);cout<<c.get(2)<<"\\n";}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/list"
    "fmt"
)

type LRU struct { cap int; list *list.List; cache map[int]*list.Element }
type entry struct{ key,val int }

func NewLRU(cap int)*LRU{return &LRU{cap,list.New(),make(map[int]*list.Element)}}

func (c *LRU)Get(k int)int{
    if e,ok:=c.cache[k];ok{c.list.MoveToBack(e);return e.Value.(*entry).val}
    return -1
}

func (c *LRU)Put(k,v int){
    if e,ok:=c.cache[k];ok{e.Value.(*entry).val=v;c.list.MoveToBack(e);return}
    if c.list.Len()==c.cap{front:=c.list.Front();delete(c.cache,front.Value.(*entry).key);c.list.Remove(front)}
    c.cache[k]=c.list.PushBack(&entry{k,v})
}

func main(){c:=NewLRU(2);c.Put(1,1);c.Put(2,2);fmt.Println(c.Get(1));c.Put(3,3);fmt.Println(c.Get(2))}`,
      },
      {
        lang: "php",
        code: `<?php
class LRUCache {
    private array $cache=[];
    public function __construct(private int $cap){}
    public function get(int $k):int{
        if(!array_key_exists($k,$this->cache))return -1;
        $v=$this->cache[$k];unset($this->cache[$k]);$this->cache[$k]=$v;return $v;
    }
    public function put(int $k,int $v):void{
        if(array_key_exists($k,$this->cache))unset($this->cache[$k]);
        elseif(count($this->cache)>=$this->cap)array_shift($this->cache);
        $this->cache[$k]=$v;
    }
}

$c=new LRUCache(2);$c->put(1,1);$c->put(2,2);echo $c->get(1)."\\n";$c->put(3,3);echo $c->get(2)."\\n";`,
      },
      {
        lang: "kotlin",
        code: `class LRUCache(private val cap:Int){
    private val cache=LinkedHashMap<Int,Int>(16,0.75f,true)
    fun get(k:Int)=cache.getOrDefault(k,-1).also{if(it!=-1)cache[k]=it}
    fun put(k:Int,v:Int){if(cache.size>=cap&&!cache.containsKey(k))cache.remove(cache.keys.first());cache[k]=v}
}

fun main(){val c=LRUCache(2);c.put(1,1);c.put(2,2);println(c.get(1));c.put(3,3);println(c.get(2))}`,
      },
      {
        lang: "swift",
        code: `class LRUCache {
    private var cache=[(key:Int,val:Int)]()
    private let cap:Int
    init(_ cap:Int){self.cap=cap}
    func get(_ k:Int)->Int{
        if let i=cache.firstIndex(where:{$0.key==k}){let v=cache.remove(at:i);cache.append(v);return v.val}
        return -1
    }
    func put(_ k:Int,_ v:Int){
        if let i=cache.firstIndex(where:{$0.key==k}){cache.remove(at:i)}
        else if cache.count>=cap{cache.removeFirst()}
        cache.append((k,v))
    }
}

let c=LRUCache(2);c.put(1,1);c.put(2,2);print(c.get(1));c.put(3,3);print(c.get(2))`,
      },
    ],
  },

  "monotonic-stack": {
    id: "monotonic-stack",
    name: "Monotonic Stack",
    displayName: { en: "Monotonic Stack", zh: "单调栈" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["stack", "monotonic", "next-greater", "range"],
    description: {
      en: "A stack maintaining a monotonically increasing or decreasing sequence, used to find the next greater/smaller element in O(n).",
      zh: "维护单调递增或递减序列的栈，用于 O(n) 求每个元素的下一个更大/更小元素。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 739, titleSlug: "daily-temperatures", difficulty: "medium" },
      { id: 84, titleSlug: "largest-rectangle-in-histogram", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Next Greater Element using monotonic decreasing stack
function nextGreater(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = []; // stores indices

  for (let i = 0; i < n; i++) {
    // Pop while stack top is smaller than current
    while (stack.length && nums[stack[stack.length-1]] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}

console.log(nextGreater([2,1,2,4,3])); // [4,2,4,-1,-1]

// Daily Temperatures variant
function dailyTemps(T) {
  const res = new Array(T.length).fill(0);
  const stack = [];
  for (let i = 0; i < T.length; i++) {
    while (stack.length && T[stack[stack.length-1]] < T[i]) {
      const j = stack.pop();
      res[j] = i - j;
    }
    stack.push(i);
  }
  return res;
}
console.log(dailyTemps([73,74,75,71,69,72,76,73])); // [1,1,4,2,1,1,0,0]`,
      },
      {
        lang: "typescript",
        code: `function nextGreater(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    while (stack.length && nums[stack[stack.length-1]] < nums[i]) {
      result[stack.pop()!] = nums[i];
    }
    stack.push(i);
  }
  return result;
}

console.log(nextGreater([2,1,2,4,3])); // [4,2,4,-1,-1]`,
      },
      {
        lang: "java",
        code: `import java.util.*;

int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] res = new int[n]; Arrays.fill(res, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i])
            res[stack.pop()] = nums[i];
        stack.push(i);
    }
    return res;
}`,
      },
      {
        lang: "python",
        code: `def next_greater(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # stores indices

    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            result[stack.pop()] = nums[i]
        stack.append(i)

    return result

print(next_greater([2, 1, 2, 4, 3]))  # [4, 2, 4, -1, -1]`,
      },
      {
        lang: "rust",
        code: `fn next_greater(nums: &[i32]) -> Vec<i32> {
    let n = nums.len();
    let mut result = vec![-1i32; n];
    let mut stack: Vec<usize> = vec![];

    for i in 0..n {
        while let Some(&top) = stack.last() {
            if nums[top] < nums[i] { result[top] = nums[i]; stack.pop(); }
            else { break; }
        }
        stack.push(i);
    }
    result
}

fn main() {
    println!("{:?}", next_greater(&[2,1,2,4,3])); // [4,2,4,-1,-1]
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 100

void next_greater(int *nums, int n, int *res) {
    int stack[MAXN], top=-1;
    for(int i=0;i<n;i++) res[i]=-1;
    for(int i=0;i<n;i++){
        while(top>=0 && nums[stack[top]]<nums[i]) res[stack[top--]]=nums[i];
        stack[++top]=i;
    }
}

int main(){
    int nums[]={2,1,2,4,3}, res[5];
    next_greater(nums,5,res);
    for(int i=0;i<5;i++) printf("%d ",res[i]); // 4 2 4 -1 -1
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreater(vector<int>& nums) {
    int n = nums.size();
    vector<int> res(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[st.top()] < nums[i]) {
            res[st.top()] = nums[i]; st.pop();
        }
        st.push(i);
    }
    return res;
}

int main(){vector<int>v={2,1,2,4,3};auto r=nextGreater(v);for(int x:r)cout<<x<<" ";}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

func nextGreater(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    for i := range res { res[i] = -1 }
    stack := []int{}
    for i := 0; i < n; i++ {
        for len(stack) > 0 && nums[stack[len(stack)-1]] < nums[i] {
            res[stack[len(stack)-1]] = nums[i]
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, i)
    }
    return res
}

func main() { fmt.Println(nextGreater([]int{2,1,2,4,3})) }`,
      },
      {
        lang: "php",
        code: `<?php
function nextGreater(array $nums): array {
    $n = count($nums); $res = array_fill(0, $n, -1); $stack = [];
    for ($i = 0; $i < $n; $i++) {
        while (!empty($stack) && $nums[end($stack)] < $nums[$i])
            $res[array_pop($stack)] = $nums[$i];
        $stack[] = $i;
    }
    return $res;
}
print_r(nextGreater([2,1,2,4,3]));`,
      },
      {
        lang: "kotlin",
        code: `fun nextGreater(nums:IntArray):IntArray{
    val n=nums.size;val res=IntArray(n){-1};val stack=ArrayDeque<Int>()
    for(i in 0 until n){
        while(stack.isNotEmpty()&&nums[stack.last()]<nums[i])res[stack.removeLast()]=nums[i]
        stack.addLast(i)
    }
    return res
}

fun main(){println(nextGreater(intArrayOf(2,1,2,4,3)).toList())}`,
      },
      {
        lang: "swift",
        code: `func nextGreater(_ nums: [Int]) -> [Int] {
    var res = Array(repeating: -1, count: nums.count), stack = [Int]()
    for i in 0..<nums.count {
        while let top = stack.last, nums[top] < nums[i] { res[top] = nums[i]; stack.removeLast() }
        stack.append(i)
    }
    return res
}

print(nextGreater([2,1,2,4,3]))`,
      },
    ],
  },

  "monotonic-queue": {
    id: "monotonic-queue",
    name: "Monotonic Queue",
    displayName: { en: "Monotonic Queue", zh: "单调队列" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["queue", "deque", "monotonic", "sliding-window"],
    description: {
      en: "A deque maintaining a monotonic order to efficiently support range maximum/minimum queries, notably in sliding window problems.",
      zh: "维护单调顺序的双端队列，高效支持区间最大/最小查询，常用于滑动窗口问题。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(k)",
    relatedProblems: [
      { id: 239, titleSlug: "sliding-window-maximum", difficulty: "hard" },
      { id: 862, titleSlug: "shortest-subarray-with-sum-at-least-k", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Sliding Window Maximum using monotonic deque
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // stores indices, front is max

  for (let i = 0; i < nums.length; i++) {
    // Remove out-of-window indices
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    // Remove smaller elements (maintain decreasing deque)
    while (deque.length && nums[deque[deque.length-1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`,
      },
      {
        lang: "typescript",
        code: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  const deque: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    while (deque.length && nums[deque[deque.length-1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)); // [3,3,5,5,6,7]`,
      },
      {
        lang: "java",
        code: `import java.util.*;

int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] res = new int[n-k+1];
    Deque<Integer> dq = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!dq.isEmpty() && dq.peekFirst() < i-k+1) dq.pollFirst();
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
        dq.addLast(i);
        if (i >= k-1) res[i-k+1] = nums[dq.peekFirst()];
    }
    return res;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def max_sliding_window(nums, k):
    result = []
    dq = deque()  # stores indices, front = max index

    for i, v in enumerate(nums):
        # Remove out-of-window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Maintain decreasing order
        while dq and nums[dq[-1]] < v:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

print(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))  # [3,3,5,5,6,7]`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;

fn max_sliding_window(nums: &[i32], k: usize) -> Vec<i32> {
    let mut res = vec![];
    let mut dq: VecDeque<usize> = VecDeque::new();

    for i in 0..nums.len() {
        while dq.front().map_or(false, |&f| f + k <= i) { dq.pop_front(); }
        while dq.back().map_or(false, |&b| nums[b] < nums[i]) { dq.pop_back(); }
        dq.push_back(i);
        if i + 1 >= k { res.push(nums[*dq.front().unwrap()]); }
    }
    res
}

fn main() {
    println!("{:?}", max_sliding_window(&[1,3,-1,-3,5,3,6,7], 3));
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 1000

int dq[MAXN], head=0, tail=-1;

int max_sliding_window_res[MAXN];

int* sliding_max(int *nums, int n, int k, int *rlen) {
    head=0; tail=-1;
    *rlen = n-k+1;
    for(int i=0;i<n;i++){
        while(head<=tail && dq[head]<i-k+1) head++;
        while(head<=tail && nums[dq[tail]]<nums[i]) tail--;
        dq[++tail]=i;
        if(i>=k-1) max_sliding_window_res[i-k+1]=nums[dq[head]];
    }
    return max_sliding_window_res;
}

int main(){
    int nums[]={1,3,-1,-3,5,3,6,7},rlen;
    int *r=sliding_max(nums,8,3,&rlen);
    for(int i=0;i<rlen;i++) printf("%d ",r[i]); // 3 3 5 5 6 7
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    vector<int> res; deque<int> dq;
    for (int i = 0; i < (int)nums.size(); i++) {
        while (!dq.empty() && dq.front() < i-k+1) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k-1) res.push_back(nums[dq.front()]);
    }
    return res;
}

int main(){vector<int>v={1,3,-1,-3,5,3,6,7};auto r=maxSlidingWindow(v,3);for(int x:r)cout<<x<<" ";}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

func maxSlidingWindow(nums []int, k int) []int {
    res := []int{}; dq := []int{}
    for i, v := range nums {
        for len(dq)>0 && dq[0]<i-k+1 { dq=dq[1:] }
        for len(dq)>0 && nums[dq[len(dq)-1]]<v { dq=dq[:len(dq)-1] }
        dq=append(dq,i)
        if i>=k-1 { res=append(res,nums[dq[0]]) }
    }
    return res
}

func main() { fmt.Println(maxSlidingWindow([]int{1,3,-1,-3,5,3,6,7}, 3)) }`,
      },
      {
        lang: "php",
        code: `<?php
function maxSlidingWindow(array $nums, int $k): array {
    $res=[]; $dq=[];
    for($i=0;$i<count($nums);$i++){
        while(!empty($dq)&&$dq[0]<$i-$k+1) array_shift($dq);
        while(!empty($dq)&&$nums[end($dq)]<$nums[$i]) array_pop($dq);
        $dq[]=$i;
        if($i>=$k-1) $res[]=$nums[$dq[0]];
    }
    return $res;
}
print_r(maxSlidingWindow([1,3,-1,-3,5,3,6,7],3));`,
      },
      {
        lang: "kotlin",
        code: `import java.util.ArrayDeque

fun maxSlidingWindow(nums:IntArray,k:Int):IntArray{
    val res=mutableListOf<Int>();val dq=ArrayDeque<Int>()
    for(i in nums.indices){
        while(dq.isNotEmpty()&&dq.peekFirst()<i-k+1)dq.pollFirst()
        while(dq.isNotEmpty()&&nums[dq.peekLast()]<nums[i])dq.pollLast()
        dq.addLast(i)
        if(i>=k-1)res.add(nums[dq.peekFirst()])
    }
    return res.toIntArray()
}

fun main(){println(maxSlidingWindow(intArrayOf(1,3,-1,-3,5,3,6,7),3).toList())}`,
      },
      {
        lang: "swift",
        code: `func maxSlidingWindow(_ nums: [Int], _ k: Int) -> [Int] {
    var res = [Int](), dq = [Int]()
    for i in 0..<nums.count {
        while !dq.isEmpty && dq.first! < i-k+1 { dq.removeFirst() }
        while !dq.isEmpty && nums[dq.last!] < nums[i] { dq.removeLast() }
        dq.append(i)
        if i >= k-1 { res.append(nums[dq.first!]) }
    }
    return res
}

print(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3))`,
      },
    ],
  },

  "graph-adjacency-list": {
    id: "graph-adjacency-list",
    name: "Graph (Adjacency List)",
    displayName: { en: "Graph (Adjacency List)", zh: "图（邻接表）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["graph", "adjacency-list", "bfs", "dfs"],
    description: {
      en: "A graph representation using an array of lists, where each list stores the neighbors of a vertex. Space-efficient for sparse graphs.",
      zh: "用数组存储邻居列表的图表示法，适合稀疏图，空间效率高。",
    },
    timeComplexity: { best: "O(1)", average: "O(V+E)", worst: "O(V+E)" },
    spaceComplexity: "O(V+E)",
    relatedProblems: [
      { id: 207, titleSlug: "course-schedule", difficulty: "medium" },
      { id: 210, titleSlug: "course-schedule-ii", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class Graph {
  constructor(directed = false) {
    this.adj = new Map();
    this.directed = directed;
  }

  addVertex(v) { if (!this.adj.has(v)) this.adj.set(v, []); }

  addEdge(u, v, w = 1) {
    this.addVertex(u); this.addVertex(v);
    this.adj.get(u).push({ to: v, w });
    if (!this.directed) this.adj.get(v).push({ to: u, w });
  }

  bfs(start) {
    const visited = new Set([start]);
    const queue = [start], order = [];
    while (queue.length) {
      const v = queue.shift();
      order.push(v);
      for (const { to } of (this.adj.get(v) || [])) {
        if (!visited.has(to)) { visited.add(to); queue.push(to); }
      }
    }
    return order;
  }

  dfs(start, visited = new Set(), order = []) {
    visited.add(start); order.push(start);
    for (const { to } of (this.adj.get(start) || []))
      if (!visited.has(to)) this.dfs(to, visited, order);
    return order;
  }
}

const g = new Graph();
g.addEdge(0,1); g.addEdge(0,2); g.addEdge(1,3); g.addEdge(2,3);
console.log(g.bfs(0)); // [0,1,2,3]
console.log(g.dfs(0)); // [0,1,3,2]`,
      },
      {
        lang: "typescript",
        code: `type Edge = { to: number; w: number };

class Graph {
  adj: Map<number, Edge[]> = new Map();
  constructor(private directed = false) {}

  addEdge(u: number, v: number, w = 1): void {
    if (!this.adj.has(u)) this.adj.set(u, []);
    if (!this.adj.has(v)) this.adj.set(v, []);
    this.adj.get(u)!.push({ to: v, w });
    if (!this.directed) this.adj.get(v)!.push({ to: u, w });
  }

  bfs(start: number): number[] {
    const visited = new Set([start]), queue = [start], order: number[] = [];
    while (queue.length) {
      const v = queue.shift()!; order.push(v);
      for (const { to } of this.adj.get(v) ?? [])
        if (!visited.has(to)) { visited.add(to); queue.push(to); }
    }
    return order;
  }
}`,
      },
      {
        lang: "java",
        code: `import java.util.*;

class Graph {
    Map<Integer,List<int[]>> adj = new HashMap<>(); // adj[u] = [{v,w}]
    boolean directed;
    Graph(boolean d){directed=d;}

    void addEdge(int u,int v,int w){
        adj.computeIfAbsent(u,k->new ArrayList<>()).add(new int[]{v,w});
        if(!directed) adj.computeIfAbsent(v,k->new ArrayList<>()).add(new int[]{u,w});
    }

    List<Integer> bfs(int s){
        Set<Integer> vis=new HashSet<>(); Queue<Integer> q=new LinkedList<>();
        List<Integer> order=new ArrayList<>();
        vis.add(s); q.offer(s);
        while(!q.isEmpty()){int v=q.poll();order.add(v);for(int[]e:adj.getOrDefault(v,Collections.emptyList()))if(vis.add(e[0]))q.offer(e[0]);}
        return order;
    }
}`,
      },
      {
        lang: "python",
        code: `from collections import defaultdict, deque

class Graph:
    def __init__(self, directed=False):
        self.adj = defaultdict(list)
        self.directed = directed

    def add_edge(self, u, v, w=1):
        self.adj[u].append((v, w))
        if not self.directed:
            self.adj[v].append((u, w))

    def bfs(self, start):
        visited, queue, order = {start}, deque([start]), []
        while queue:
            v = queue.popleft(); order.append(v)
            for nb, _ in self.adj[v]:
                if nb not in visited:
                    visited.add(nb); queue.append(nb)
        return order

    def dfs(self, start, visited=None, order=None):
        if visited is None: visited = set(); order = []
        visited.add(start); order.append(start)
        for nb, _ in self.adj[start]:
            if nb not in visited: self.dfs(nb, visited, order)
        return order

g = Graph(); g.add_edge(0,1); g.add_edge(0,2); g.add_edge(1,3); g.add_edge(2,3)
print(g.bfs(0))  # [0, 1, 2, 3]`,
      },
      {
        lang: "rust",
        code: `use std::collections::{HashMap, VecDeque, HashSet};

struct Graph { adj: HashMap<usize, Vec<(usize,i32)>>, directed: bool }

impl Graph {
    fn new(directed: bool) -> Self { Graph { adj: HashMap::new(), directed } }
    fn add_edge(&mut self, u: usize, v: usize, w: i32) {
        self.adj.entry(u).or_default().push((v,w));
        if !self.directed { self.adj.entry(v).or_default().push((u,w)); }
    }
    fn bfs(&self, start: usize) -> Vec<usize> {
        let mut visited = HashSet::from([start]);
        let mut queue = VecDeque::from([start]);
        let mut order = vec![];
        while let Some(v) = queue.pop_front() {
            order.push(v);
            if let Some(nbrs) = self.adj.get(&v) {
                for &(nb,_) in nbrs { if visited.insert(nb) { queue.push_back(nb); } }
            }
        }
        order
    }
}

fn main() {
    let mut g = Graph::new(false);
    g.add_edge(0,1,1); g.add_edge(0,2,1); g.add_edge(1,3,1); g.add_edge(2,3,1);
    println!("{:?}", g.bfs(0)); // [0,1,2,3]
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#define MAXV 100

typedef struct Edge { int to, w; struct Edge *next; } Edge;
Edge *adj[MAXV]; int n;

void add_edge(int u,int v,int w){
    Edge *e=malloc(sizeof(Edge)); e->to=v; e->w=w; e->next=adj[u]; adj[u]=e;
}

int visited[MAXV];
void dfs(int v){
    visited[v]=1; printf("%d ",v);
    for(Edge *e=adj[v];e;e=e->next) if(!visited[e->to]) dfs(e->to);
}

int main(){
    n=4;
    add_edge(0,1,1); add_edge(0,2,1); add_edge(1,3,1); add_edge(2,3,1);
    dfs(0); // 0 1 3 2
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Graph {
    int V; vector<vector<pair<int,int>>> adj; bool dir;
public:
    Graph(int V, bool dir=false):V(V),adj(V),dir(dir){}
    void addEdge(int u,int v,int w=1){adj[u].push_back({v,w});if(!dir)adj[v].push_back({u,w});}
    vector<int> bfs(int s){
        vector<bool> vis(V,false); queue<int> q; vector<int> order;
        vis[s]=true; q.push(s);
        while(!q.empty()){int v=q.front();q.pop();order.push_back(v);for(auto[nb,_]:adj[v])if(!vis[nb]){vis[nb]=true;q.push(nb);}}
        return order;
    }
};

int main(){Graph g(4);g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3);for(int x:g.bfs(0))cout<<x<<" ";}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type Graph struct { adj map[int][][2]int; directed bool }

func NewGraph(d bool)*Graph{return &Graph{make(map[int][][2]int),d}}
func (g *Graph)AddEdge(u,v,w int){g.adj[u]=append(g.adj[u],[2]int{v,w});if!g.directed{g.adj[v]=append(g.adj[v],[2]int{u,w})}}

func (g *Graph)BFS(s int)[]int{
    visited:=map[int]bool{s:true};queue:=[]int{s};order:=[]int{}
    for len(queue)>0{
        v:=queue[0];queue=queue[1:];order=append(order,v)
        for _,e:=range g.adj[v]{if!visited[e[0]]{visited[e[0]]=true;queue=append(queue,e[0])}}
    }
    return order
}

func main(){g:=NewGraph(false);g.AddEdge(0,1,1);g.AddEdge(0,2,1);g.AddEdge(1,3,1);g.AddEdge(2,3,1);fmt.Println(g.BFS(0))}`,
      },
      {
        lang: "php",
        code: `<?php
class Graph {
    private array $adj=[]; private bool $directed;
    public function __construct(bool $d=false){$this->directed=$d;}
    public function addEdge(int $u,int $v,int $w=1):void{
        $this->adj[$u][]=['to'=>$v,'w'=>$w];
        if(!$this->directed)$this->adj[$v][]=['to'=>$u,'w'=>$w];
    }
    public function bfs(int $s):array{
        $vis=[$s=>true];$q=[$s];$order=[];
        while($q){$v=array_shift($q);$order[]=$v;foreach($this->adj[$v]??[] as $e)if(!isset($vis[$e['to']])){$vis[$e['to']]=true;$q[]=$e['to'];}}
        return $order;
    }
}

$g=new Graph();$g->addEdge(0,1);$g->addEdge(0,2);$g->addEdge(1,3);$g->addEdge(2,3);
print_r($g->bfs(0));`,
      },
      {
        lang: "kotlin",
        code: `class Graph(val V:Int,val directed:Boolean=false){
    val adj=Array(V){mutableListOf<Pair<Int,Int>>()}
    fun addEdge(u:Int,v:Int,w:Int=1){adj[u].add(v to w);if(!directed)adj[v].add(u to w)}
    fun bfs(s:Int):List<Int>{
        val vis=BooleanArray(V);val q=ArrayDeque<Int>();val order=mutableListOf<Int>()
        vis[s]=true;q.add(s)
        while(q.isNotEmpty()){val v=q.removeFirst();order.add(v);for((nb,_)in adj[v])if(!vis[nb]){vis[nb]=true;q.add(nb)}}
        return order
    }
}

fun main(){val g=Graph(4);g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3);println(g.bfs(0))}`,
      },
      {
        lang: "swift",
        code: `class Graph {
    var adj:[[Int:Int]]; let directed:Bool
    init(_ V:Int,_ d:Bool=false){adj=Array(repeating:[:],count:V);directed=d}
    func addEdge(_ u:Int,_ v:Int,_ w:Int=1){adj[u][v]=w;if !directed{adj[v][u]=w}}
    func bfs(_ s:Int)->[Int]{
        var vis=Set([s]),q=[s],order=[Int]()
        while !q.isEmpty{let v=q.removeFirst();order.append(v);for(nb,_) in adj[v]{if !vis.contains(nb){vis.insert(nb);q.append(nb)}}}
        return order
    }
}

let g=Graph(4);g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3)
print(g.bfs(0))`,
      },
    ],
  },

  "graph-adjacency-matrix": {
    id: "graph-adjacency-matrix",
    name: "Graph (Adjacency Matrix)",
    displayName: { en: "Graph (Adjacency Matrix)", zh: "图（邻接矩阵）" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["graph", "adjacency-matrix", "dense-graph"],
    description: {
      en: "A graph representation using a 2D matrix where matrix[i][j] stores the edge weight from i to j. Suitable for dense graphs with O(1) edge lookup.",
      zh: "用二维矩阵表示图，matrix[i][j] 存储 i 到 j 的边权，适合稠密图，边查询 O(1)。",
    },
    timeComplexity: { best: "O(1)", average: "O(V²)", worst: "O(V²)" },
    spaceComplexity: "O(V²)",
    relatedProblems: [
      {
        id: 1334,
        titleSlug: "find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance",
        difficulty: "medium",
      },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class GraphMatrix {
  constructor(V) {
    this.V = V;
    this.mat = Array.from({length:V}, () => new Array(V).fill(0));
  }

  addEdge(u, v, w = 1) { this.mat[u][v] = w; this.mat[v][u] = w; }

  removeEdge(u, v) { this.mat[u][v] = 0; this.mat[v][u] = 0; }

  hasEdge(u, v) { return this.mat[u][v] !== 0; }

  neighbors(v) {
    return this.mat[v].reduce((acc, w, i) => { if (w !== 0) acc.push(i); return acc; }, []);
  }

  print() { this.mat.forEach(row => console.log(row.join(' '))); }
}

const g = new GraphMatrix(4);
g.addEdge(0,1); g.addEdge(0,2); g.addEdge(1,3); g.addEdge(2,3);
console.log(g.neighbors(0)); // [1,2]
console.log(g.hasEdge(1,3)); // true
g.print();`,
      },
      {
        lang: "typescript",
        code: `class GraphMatrix {
  private mat: number[][];
  constructor(private V: number) {
    this.mat = Array.from({length:V}, () => new Array(V).fill(0));
  }

  addEdge(u: number, v: number, w = 1): void { this.mat[u][v] = w; this.mat[v][u] = w; }
  hasEdge(u: number, v: number): boolean { return this.mat[u][v] !== 0; }
  weight(u: number, v: number): number { return this.mat[u][v]; }
  neighbors(v: number): number[] {
    return this.mat[v].reduce((acc: number[], w, i) => { if (w) acc.push(i); return acc; }, []);
  }
}

const g = new GraphMatrix(4);
g.addEdge(0,1); g.addEdge(1,2); g.addEdge(2,3);
console.log(g.neighbors(1)); // [0,2]`,
      },
      {
        lang: "java",
        code: `class GraphMatrix {
    int[][] mat; int V;
    GraphMatrix(int V){ this.V=V; mat=new int[V][V]; }
    void addEdge(int u,int v,int w){ mat[u][v]=w; mat[v][u]=w; }
    boolean hasEdge(int u,int v){ return mat[u][v]!=0; }
    java.util.List<Integer> neighbors(int v){
        var list=new java.util.ArrayList<Integer>();
        for(int i=0;i<V;i++) if(mat[v][i]!=0) list.add(i);
        return list;
    }
}`,
      },
      {
        lang: "python",
        code: `class GraphMatrix:
    def __init__(self, V):
        self.V = V
        self.mat = [[0]*V for _ in range(V)]

    def add_edge(self, u, v, w=1):
        self.mat[u][v] = w
        self.mat[v][u] = w

    def has_edge(self, u, v): return self.mat[u][v] != 0

    def neighbors(self, v): return [i for i in range(self.V) if self.mat[v][i] != 0]

    def print_mat(self):
        for row in self.mat: print(row)

g = GraphMatrix(4)
g.add_edge(0,1); g.add_edge(0,2); g.add_edge(1,3); g.add_edge(2,3)
print(g.neighbors(0))    # [1, 2]
print(g.has_edge(1, 3))  # True
g.print_mat()`,
      },
      {
        lang: "rust",
        code: `struct GraphMatrix { mat: Vec<Vec<i32>>, v: usize }

impl GraphMatrix {
    fn new(v: usize) -> Self { GraphMatrix { mat: vec![vec![0;v];v], v } }
    fn add_edge(&mut self, u: usize, vv: usize, w: i32) { self.mat[u][vv]=w; self.mat[vv][u]=w; }
    fn has_edge(&self, u: usize, v: usize) -> bool { self.mat[u][v] != 0 }
    fn neighbors(&self, v: usize) -> Vec<usize> {
        (0..self.v).filter(|&i| self.mat[v][i] != 0).collect()
    }
}

fn main() {
    let mut g = GraphMatrix::new(4);
    g.add_edge(0,1,1); g.add_edge(0,2,1); g.add_edge(1,3,1); g.add_edge(2,3,1);
    println!("{:?}", g.neighbors(0)); // [1,2]
    println!("{}", g.has_edge(1,3)); // true
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define V 4

int mat[V][V];

void add_edge(int u,int v,int w){mat[u][v]=w;mat[v][u]=w;}
int has_edge(int u,int v){return mat[u][v]!=0;}

void print_mat(){for(int i=0;i<V;i++){for(int j=0;j<V;j++)printf("%d ",mat[i][j]);printf("\\n");}}

int main(){
    add_edge(0,1,1); add_edge(0,2,1); add_edge(1,3,1); add_edge(2,3,1);
    printf("has_edge(1,3)=%d\\n",has_edge(1,3)); // 1
    print_mat();
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

class GraphMatrix {
    int V; vector<vector<int>> mat;
public:
    GraphMatrix(int V):V(V),mat(V,vector<int>(V,0)){}
    void addEdge(int u,int v,int w=1){mat[u][v]=w;mat[v][u]=w;}
    bool hasEdge(int u,int v){return mat[u][v]!=0;}
    vector<int> neighbors(int v){
        vector<int> nb;
        for(int i=0;i<V;i++) if(mat[v][i]) nb.push_back(i);
        return nb;
    }
    void print(){for(auto&r:mat){for(int x:r)cout<<x<<" ";cout<<"\\n";}}
};

int main(){
    GraphMatrix g(4);
    g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3);
    g.print();
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type GraphMatrix struct { mat [][]int; v int }

func NewGM(v int)*GraphMatrix{m:=make([][]int,v);for i:=range m{m[i]=make([]int,v)};return &GraphMatrix{m,v}}
func (g *GraphMatrix)AddEdge(u,v,w int){g.mat[u][v]=w;g.mat[v][u]=w}
func (g *GraphMatrix)HasEdge(u,v int)bool{return g.mat[u][v]!=0}
func (g *GraphMatrix)Neighbors(v int)[]int{
    nb:=[]int{};for i:=0;i<g.v;i++{if g.mat[v][i]!=0{nb=append(nb,i)}};return nb
}

func main(){
    g:=NewGM(4);g.AddEdge(0,1,1);g.AddEdge(0,2,1);g.AddEdge(1,3,1);g.AddEdge(2,3,1)
    fmt.Println(g.Neighbors(0)) // [1 2]
    for _,r:=range g.mat{fmt.Println(r)}
}`,
      },
      {
        lang: "php",
        code: `<?php
class GraphMatrix {
    private array $mat; private int $V;
    public function __construct(int $V){$this->V=$V;$this->mat=array_fill(0,$V,array_fill(0,$V,0));}
    public function addEdge(int $u,int $v,int $w=1):void{$this->mat[$u][$v]=$w;$this->mat[$v][$u]=$w;}
    public function hasEdge(int $u,int $v):bool{return $this->mat[$u][$v]!==0;}
    public function neighbors(int $v):array{$nb=[];for($i=0;$i<$this->V;$i++)if($this->mat[$v][$i])$nb[]=$i;return $nb;}
    public function printMat():void{foreach($this->mat as $r)echo implode(' ',$r)."\n";}
}

$g=new GraphMatrix(4);$g->addEdge(0,1);$g->addEdge(0,2);$g->addEdge(1,3);$g->addEdge(2,3);
print_r($g->neighbors(0));$g->printMat();`,
      },
      {
        lang: "kotlin",
        code: `class GraphMatrix(val V:Int){
    val mat=Array(V){IntArray(V)}
    fun addEdge(u:Int,v:Int,w:Int=1){mat[u][v]=w;mat[v][u]=w}
    fun hasEdge(u:Int,v:Int)=mat[u][v]!=0
    fun neighbors(v:Int)=(0 until V).filter{mat[v][it]!=0}
    fun printMat(){mat.forEach{println(it.toList())}}
}

fun main(){val g=GraphMatrix(4);g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3);println(g.neighbors(0));g.printMat()}`,
      },
      {
        lang: "swift",
        code: `class GraphMatrix {
    var mat:[[Int]]; let V:Int
    init(_ V:Int){self.V=V;mat=Array(repeating:Array(repeating:0,count:V),count:V)}
    func addEdge(_ u:Int,_ v:Int,_ w:Int=1){mat[u][v]=w;mat[v][u]=w}
    func hasEdge(_ u:Int,_ v:Int)->Bool{mat[u][v] != 0}
    func neighbors(_ v:Int)->[Int]{(0..<V).filter{mat[v][$0] != 0}}
    func printMat(){mat.forEach{print($0)}}
}

let g=GraphMatrix(4);g.addEdge(0,1);g.addEdge(0,2);g.addEdge(1,3);g.addEdge(2,3)
print(g.neighbors(0));g.printMat()`,
      },
    ],
  },
}
