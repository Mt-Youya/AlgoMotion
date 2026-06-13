import type { AlgorithmMeta } from "@algomotion/shared"

export const linearDsAlgorithms: Record<string, AlgorithmMeta> = {
  array: {
    id: "array",
    name: "Array",
    displayName: { en: "Array", zh: "数组" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["array", "random-access", "contiguous-memory"],
    description: {
      en: "A contiguous block of memory storing elements of the same type, supporting O(1) random access by index.",
      zh: "连续内存块，存储相同类型元素，支持 O(1) 随机索引访问。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 1, titleSlug: "two-sum", difficulty: "easy" },
      { id: 26, titleSlug: "remove-duplicates-from-sorted-array", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `// Dynamic array (JS built-in)
const arr = [];
arr.push(1);      // append  O(1) amortized
arr.push(2);
arr.push(3);
console.log(arr[1]);   // random access O(1)
arr.splice(1, 1);      // delete at index O(n)
console.log(arr);`,
      },
      {
        lang: "typescript",
        code: `// Typed dynamic array
const arr: number[] = [];
arr.push(10);
arr.push(20);
arr.push(30);
const val: number = arr[0];   // O(1)
arr.splice(0, 1);              // remove first O(n)
console.log(arr);`,
      },
      {
        lang: "java",
        code: `import java.util.ArrayList;
import java.util.List;

List<Integer> arr = new ArrayList<>();
arr.add(1);
arr.add(2);
arr.add(3);
int val = arr.get(1);      // O(1)
arr.remove(Integer.valueOf(2)); // O(n)
System.out.println(arr);`,
      },
      {
        lang: "python",
        code: `arr = []
arr.append(1)   # O(1) amortized
arr.append(2)
arr.append(3)
val = arr[0]    # O(1)
arr.pop(1)      # O(n)
print(arr)`,
      },
      {
        lang: "rust",
        code: `fn main() {
    let mut arr: Vec<i32> = Vec::new();
    arr.push(1);
    arr.push(2);
    arr.push(3);
    let val = arr[0];   // O(1)
    arr.remove(1);      // O(n)
    println!("{:?}", arr);
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int capacity = 4, size = 0;
    int *arr = malloc(capacity * sizeof(int));
    arr[size++] = 1;
    arr[size++] = 2;
    arr[size++] = 3;
    printf("%d\\n", arr[1]);  // O(1)
    /* delete index 1: shift left */
    memmove(arr + 1, arr + 2, (--size - 1) * sizeof(int));
    for (int i = 0; i < size; i++) printf("%d ", arr[i]);
    free(arr);
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr;
    arr.push_back(1);
    arr.push_back(2);
    arr.push_back(3);
    cout << arr[1] << "\\n";          // O(1)
    arr.erase(arr.begin() + 1);       // O(n)
    for (int x : arr) cout << x << " ";
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

func main() {
    arr := []int{}
    arr = append(arr, 1) // O(1) amortized
    arr = append(arr, 2)
    arr = append(arr, 3)
    fmt.Println(arr[0])  // O(1)
    arr = append(arr[:1], arr[2:]...) // delete index 1, O(n)
    fmt.Println(arr)
}`,
      },
      {
        lang: "php",
        code: `<?php
$arr = [];
$arr[] = 1;       // push O(1)
$arr[] = 2;
$arr[] = 3;
echo $arr[1];     // O(1)
array_splice($arr, 1, 1); // delete O(n)
print_r($arr);`,
      },
      {
        lang: "kotlin",
        code: `fun main() {
    val arr = mutableListOf<Int>()
    arr.add(1)
    arr.add(2)
    arr.add(3)
    println(arr[0])        // O(1)
    arr.removeAt(1)        // O(n)
    println(arr)
}`,
      },
      {
        lang: "swift",
        code: `var arr: [Int] = []
arr.append(1)    // O(1) amortized
arr.append(2)
arr.append(3)
print(arr[0])    // O(1)
arr.remove(at: 1) // O(n)
print(arr)`,
      },
    ],
  },

  "linked-list": {
    id: "linked-list",
    name: "Linked List",
    displayName: { en: "Linked List", zh: "链表" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["linked-list", "pointer", "dynamic"],
    description: {
      en: "A linear sequence of nodes where each node holds a value and a pointer to the next node.",
      zh: "线性节点序列，每个节点存储值和指向下一节点的指针。",
    },
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 206, titleSlug: "reverse-linked-list", difficulty: "easy" },
      { id: 21, titleSlug: "merge-two-sorted-lists", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() { this.head = null; }

  prepend(val) { this.head = new ListNode(val, this.head); }

  append(val) {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  delete(val) {
    if (!this.head) return;
    if (this.head.val === val) { this.head = this.head.next; return; }
    let cur = this.head;
    while (cur.next && cur.next.val !== val) cur = cur.next;
    if (cur.next) cur.next = cur.next.next;
  }

  toArray() {
    const res = [];
    let cur = this.head;
    while (cur) { res.push(cur.val); cur = cur.next; }
    return res;
  }
}

const list = new LinkedList();
list.append(1); list.append(2); list.append(3);
list.delete(2);
console.log(list.toArray()); // [1, 3]`,
      },
      {
        lang: "typescript",
        code: `class ListNode<T> {
  constructor(public val: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  head: ListNode<T> | null = null;

  append(val: T): void {
    const node = new ListNode(val);
    if (!this.head) { this.head = node; return; }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  delete(val: T): void {
    if (!this.head) return;
    if (this.head.val === val) { this.head = this.head.next; return; }
    let cur = this.head;
    while (cur.next && cur.next.val !== val) cur = cur.next;
    if (cur.next) cur.next = cur.next.next;
  }

  toArray(): T[] {
    const res: T[] = [];
    let cur = this.head;
    while (cur) { res.push(cur.val); cur = cur.next; }
    return res;
  }
}

const list = new LinkedList<number>();
list.append(1); list.append(2); list.append(3);
list.delete(2);
console.log(list.toArray()); // [1, 3]`,
      },
      {
        lang: "java",
        code: `class ListNode {
    int val; ListNode next;
    ListNode(int val) { this.val = val; }
}

class LinkedList {
    ListNode head;

    void append(int val) {
        ListNode node = new ListNode(val);
        if (head == null) { head = node; return; }
        ListNode cur = head;
        while (cur.next != null) cur = cur.next;
        cur.next = node;
    }

    void delete(int val) {
        if (head == null) return;
        if (head.val == val) { head = head.next; return; }
        ListNode cur = head;
        while (cur.next != null && cur.next.val != val) cur = cur.next;
        if (cur.next != null) cur.next = cur.next.next;
    }
}`,
      },
      {
        lang: "python",
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, val):
        node = ListNode(val)
        if not self.head:
            self.head = node
            return
        cur = self.head
        while cur.next:
            cur = cur.next
        cur.next = node

    def delete(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        cur = self.head
        while cur.next and cur.next.val != val:
            cur = cur.next
        if cur.next:
            cur.next = cur.next.next

ll = LinkedList()
ll.append(1); ll.append(2); ll.append(3)
ll.delete(2)`,
      },
      {
        lang: "rust",
        code: `#[derive(Debug)]
struct ListNode { val: i32, next: Option<Box<ListNode>> }

impl ListNode {
    fn new(val: i32) -> Self { ListNode { val, next: None } }
}

struct LinkedList { head: Option<Box<ListNode>> }

impl LinkedList {
    fn new() -> Self { LinkedList { head: None } }

    fn push_front(&mut self, val: i32) {
        let mut node = Box::new(ListNode::new(val));
        node.next = self.head.take();
        self.head = Some(node);
    }
}

fn main() {
    let mut list = LinkedList::new();
    list.push_front(3);
    list.push_front(2);
    list.push_front(1);
    let mut cur = &list.head;
    while let Some(node) = cur {
        print!("{} ", node.val);
        cur = &node.next;
    }
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int val; struct Node *next; } Node;

Node *new_node(int val) {
    Node *n = malloc(sizeof(Node));
    n->val = val; n->next = NULL;
    return n;
}

void append(Node **head, int val) {
    Node *node = new_node(val);
    if (!*head) { *head = node; return; }
    Node *cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = node;
}

int main() {
    Node *head = NULL;
    append(&head, 1); append(&head, 2); append(&head, 3);
    for (Node *c = head; c; c = c->next) printf("%d ", c->val);
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
using namespace std;

struct Node { int val; Node *next; Node(int v): val(v), next(nullptr){} };

class LinkedList {
    Node *head = nullptr;
public:
    void append(int val) {
        Node *node = new Node(val);
        if (!head) { head = node; return; }
        Node *cur = head;
        while (cur->next) cur = cur->next;
        cur->next = node;
    }
    void print() {
        for (Node *c = head; c; c = c->next) cout << c->val << " ";
        cout << "\\n";
    }
};

int main() {
    LinkedList ll;
    ll.append(1); ll.append(2); ll.append(3);
    ll.print();
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type Node struct { Val int; Next *Node }

type LinkedList struct { Head *Node }

func (l *LinkedList) Append(val int) {
    node := &Node{Val: val}
    if l.Head == nil { l.Head = node; return }
    cur := l.Head
    for cur.Next != nil { cur = cur.Next }
    cur.Next = node
}

func main() {
    ll := &LinkedList{}
    ll.Append(1); ll.Append(2); ll.Append(3)
    for cur := ll.Head; cur != nil; cur = cur.Next {
        fmt.Print(cur.Val, " ")
    }
}`,
      },
      {
        lang: "php",
        code: `<?php
class ListNode {
    public int $val;
    public ?ListNode $next;
    public function __construct(int $val, ?ListNode $next = null) {
        $this->val = $val; $this->next = $next;
    }
}

class LinkedList {
    public ?ListNode $head = null;
    public function append(int $val): void {
        $node = new ListNode($val);
        if (!$this->head) { $this->head = $node; return; }
        $cur = $this->head;
        while ($cur->next) $cur = $cur->next;
        $cur->next = $node;
    }
}

$ll = new LinkedList();
$ll->append(1); $ll->append(2); $ll->append(3);
for ($c = $ll->head; $c; $c = $c->next) echo $c->val . " ";`,
      },
      {
        lang: "kotlin",
        code: `data class ListNode(val value: Int, var next: ListNode? = null)

class LinkedList {
    var head: ListNode? = null

    fun append(value: Int) {
        val node = ListNode(value)
        if (head == null) { head = node; return }
        var cur = head
        while (cur?.next != null) cur = cur.next
        cur?.next = node
    }

    fun toList(): List<Int> {
        val res = mutableListOf<Int>()
        var cur = head
        while (cur != null) { res.add(cur.value); cur = cur.next }
        return res
    }
}

fun main() {
    val ll = LinkedList()
    ll.append(1); ll.append(2); ll.append(3)
    println(ll.toList())
}`,
      },
      {
        lang: "swift",
        code: `class ListNode {
    var val: Int
    var next: ListNode?
    init(_ val: Int) { self.val = val }
}

class LinkedList {
    var head: ListNode?

    func append(_ val: Int) {
        let node = ListNode(val)
        guard let h = head else { head = node; return }
        var cur: ListNode = h
        while let nxt = cur.next { cur = nxt }
        cur.next = node
    }
}

let ll = LinkedList()
ll.append(1); ll.append(2); ll.append(3)
var cur = ll.head
while let node = cur { print(node.val); cur = node.next }`,
      },
    ],
  },

  "doubly-linked-list": {
    id: "doubly-linked-list",
    name: "Doubly Linked List",
    displayName: { en: "Doubly Linked List", zh: "双向链表" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["linked-list", "doubly", "pointer", "bidirectional"],
    description: {
      en: "A linked list where each node has pointers to both the next and previous nodes, enabling O(1) removal given a node reference.",
      zh: "每个节点同时持有前驱和后继指针，给定节点引用时删除操作为 O(1)。",
    },
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 146, titleSlug: "lru-cache", difficulty: "medium" },
      { id: 460, titleSlug: "lfu-cache", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class DNode {
  constructor(val) {
    this.val = val; this.prev = null; this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null; this.tail = null; this.size = 0;
  }

  append(val) {
    const node = new DNode(val);
    if (!this.tail) { this.head = this.tail = node; }
    else { node.prev = this.tail; this.tail.next = node; this.tail = node; }
    this.size++;
  }

  remove(node) {
    if (node.prev) node.prev.next = node.next; else this.head = node.next;
    if (node.next) node.next.prev = node.prev; else this.tail = node.prev;
    this.size--;
  }
}

const dll = new DoublyLinkedList();
dll.append(1); dll.append(2); dll.append(3);
dll.remove(dll.head.next); // remove 2
console.log(dll.head.val, dll.tail.val); // 1 3`,
      },
      {
        lang: "typescript",
        code: `class DNode<T> {
  prev: DNode<T> | null = null;
  next: DNode<T> | null = null;
  constructor(public val: T) {}
}

class DoublyLinkedList<T> {
  head: DNode<T> | null = null;
  tail: DNode<T> | null = null;
  size = 0;

  append(val: T): DNode<T> {
    const node = new DNode(val);
    if (!this.tail) { this.head = this.tail = node; }
    else { node.prev = this.tail; this.tail.next = node; this.tail = node; }
    this.size++;
    return node;
  }

  remove(node: DNode<T>): void {
    if (node.prev) node.prev.next = node.next; else this.head = node.next;
    if (node.next) node.next.prev = node.prev; else this.tail = node.prev;
    this.size--;
  }
}`,
      },
      {
        lang: "java",
        code: `class DNode {
    int val; DNode prev, next;
    DNode(int val) { this.val = val; }
}

class DoublyLinkedList {
    DNode head, tail;

    DNode append(int val) {
        DNode node = new DNode(val);
        if (tail == null) { head = tail = node; }
        else { node.prev = tail; tail.next = node; tail = node; }
        return node;
    }

    void remove(DNode node) {
        if (node.prev != null) node.prev.next = node.next; else head = node.next;
        if (node.next != null) node.next.prev = node.prev; else tail = node.prev;
    }
}`,
      },
      {
        lang: "python",
        code: `class DNode:
    def __init__(self, val):
        self.val = val
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, val):
        node = DNode(val)
        if not self.tail:
            self.head = self.tail = node
        else:
            node.prev = self.tail
            self.tail.next = node
            self.tail = node
        return node

    def remove(self, node):
        if node.prev:
            node.prev.next = node.next
        else:
            self.head = node.next
        if node.next:
            node.next.prev = node.prev
        else:
            self.tail = node.prev`,
      },
      {
        lang: "rust",
        code: `use std::collections::LinkedList;

fn main() {
    // Rust std LinkedList is doubly-linked
    let mut dll: LinkedList<i32> = LinkedList::new();
    dll.push_back(1);
    dll.push_back(2);
    dll.push_back(3);
    dll.push_front(0);
    println!("{:?}", dll);
    dll.pop_back();
    dll.pop_front();
    println!("{:?}", dll);
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct DNode { int val; struct DNode *prev, *next; } DNode;

DNode *new_node(int val) {
    DNode *n = calloc(1, sizeof(DNode));
    n->val = val; return n;
}

typedef struct { DNode *head, *tail; } DLL;

void dll_append(DLL *dll, int val) {
    DNode *node = new_node(val);
    if (!dll->tail) { dll->head = dll->tail = node; return; }
    node->prev = dll->tail; dll->tail->next = node; dll->tail = node;
}

void dll_remove(DLL *dll, DNode *node) {
    if (node->prev) node->prev->next = node->next; else dll->head = node->next;
    if (node->next) node->next->prev = node->prev; else dll->tail = node->prev;
    free(node);
}

int main() {
    DLL dll = {NULL, NULL};
    dll_append(&dll, 1); dll_append(&dll, 2); dll_append(&dll, 3);
    dll_remove(&dll, dll.head->next); // remove 2
    for (DNode *c = dll.head; c; c = c->next) printf("%d ", c->val);
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <list>
using namespace std;

int main() {
    list<int> dll;
    dll.push_back(1); dll.push_back(2); dll.push_back(3);
    auto it = dll.begin(); ++it;
    dll.erase(it); // remove 2 in O(1)
    for (int x : dll) cout << x << " ";
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/list"
    "fmt"
)

func main() {
    dll := list.New()
    dll.PushBack(1)
    e2 := dll.PushBack(2)
    dll.PushBack(3)
    dll.Remove(e2) // O(1) removal
    for e := dll.Front(); e != nil; e = e.Next() {
        fmt.Print(e.Value, " ")
    }
}`,
      },
      {
        lang: "php",
        code: `<?php
class DNode {
    public int $val;
    public ?DNode $prev = null;
    public ?DNode $next = null;
    public function __construct(int $val) { $this->val = $val; }
}

class DoublyLinkedList {
    public ?DNode $head = null, $tail = null;

    public function append(int $val): DNode {
        $node = new DNode($val);
        if (!$this->tail) { $this->head = $this->tail = $node; }
        else { $node->prev = $this->tail; $this->tail->next = $node; $this->tail = $node; }
        return $node;
    }

    public function remove(DNode $node): void {
        if ($node->prev) $node->prev->next = $node->next; else $this->head = $node->next;
        if ($node->next) $node->next->prev = $node->prev; else $this->tail = $node->prev;
    }
}

$dll = new DoublyLinkedList();
$dll->append(1); $n2 = $dll->append(2); $dll->append(3);
$dll->remove($n2);
for ($c = $dll->head; $c; $c = $c->next) echo $c->val . " ";`,
      },
      {
        lang: "kotlin",
        code: `class DNode(var value: Int) {
    var prev: DNode? = null
    var next: DNode? = null
}

class DoublyLinkedList {
    var head: DNode? = null
    var tail: DNode? = null

    fun append(value: Int): DNode {
        val node = DNode(value)
        if (tail == null) { head = node; tail = node }
        else { node.prev = tail; tail?.next = node; tail = node }
        return node
    }

    fun remove(node: DNode) {
        node.prev?.next = node.next ?: run { head = node.next }
        node.next?.prev = node.prev ?: run { tail = node.prev }
        if (node.prev == null) head = node.next
        if (node.next == null) tail = node.prev
    }
}

fun main() {
    val dll = DoublyLinkedList()
    dll.append(1); val n2 = dll.append(2); dll.append(3)
    dll.remove(n2)
    var cur = dll.head
    while (cur != null) { print("\${cur.value} "); cur = cur.next }
}`,
      },
      {
        lang: "swift",
        code: `class DNode {
    var val: Int
    weak var prev: DNode?
    var next: DNode?
    init(_ val: Int) { self.val = val }
}

class DoublyLinkedList {
    var head: DNode?
    var tail: DNode?

    @discardableResult
    func append(_ val: Int) -> DNode {
        let node = DNode(val)
        if tail == nil { head = node; tail = node }
        else { node.prev = tail; tail?.next = node; tail = node }
        return node
    }

    func remove(_ node: DNode) {
        node.prev?.next = node.next
        node.next?.prev = node.prev
        if head === node { head = node.next }
        if tail === node { tail = node.prev }
    }
}

let dll = DoublyLinkedList()
dll.append(1); let n2 = dll.append(2); dll.append(3)
dll.remove(n2)
var cur = dll.head
while let node = cur { print(node.val); cur = node.next }`,
      },
    ],
  },

  stack: {
    id: "stack",
    name: "Stack",
    displayName: { en: "Stack", zh: "栈" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["stack", "lifo", "linear"],
    description: {
      en: "A Last-In-First-Out (LIFO) collection supporting push and pop in O(1).",
      zh: "后进先出（LIFO）结构，push 和 pop 均为 O(1)。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 20, titleSlug: "valid-parentheses", difficulty: "easy" },
      { id: 155, titleSlug: "min-stack", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class Stack {
  #data = [];
  push(val) { this.#data.push(val); }
  pop() { return this.#data.pop(); }
  peek() { return this.#data[this.#data.length - 1]; }
  isEmpty() { return this.#data.length === 0; }
  get size() { return this.#data.length; }
}

const s = new Stack();
s.push(1); s.push(2); s.push(3);
console.log(s.peek()); // 3
console.log(s.pop());  // 3
console.log(s.size);   // 2`,
      },
      {
        lang: "typescript",
        code: `class Stack<T> {
  private data: T[] = [];
  push(val: T): void { this.data.push(val); }
  pop(): T | undefined { return this.data.pop(); }
  peek(): T | undefined { return this.data[this.data.length - 1]; }
  isEmpty(): boolean { return this.data.length === 0; }
  get size(): number { return this.data.length; }
}

const s = new Stack<number>();
s.push(1); s.push(2); s.push(3);
console.log(s.peek()); // 3
console.log(s.pop());  // 3`,
      },
      {
        lang: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> stack = new ArrayDeque<>();
stack.push(1); stack.push(2); stack.push(3);
System.out.println(stack.peek()); // 3
System.out.println(stack.pop());  // 3
System.out.println(stack.size()); // 2`,
      },
      {
        lang: "python",
        code: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
print(stack[-1])   # peek: 3
print(stack.pop()) # 3
print(len(stack))  # 2`,
      },
      {
        lang: "rust",
        code: `fn main() {
    let mut stack: Vec<i32> = Vec::new();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    println!("{:?}", stack.last()); // Some(3)
    println!("{:?}", stack.pop());  // Some(3)
    println!("{}", stack.len());    // 2
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int top; } Stack;

void init(Stack *s) { s->top = -1; }
void push(Stack *s, int v) { s->data[++s->top] = v; }
int pop(Stack *s) { return s->data[s->top--]; }
int peek(Stack *s) { return s->data[s->top]; }
int is_empty(Stack *s) { return s->top == -1; }

int main() {
    Stack s; init(&s);
    push(&s, 1); push(&s, 2); push(&s, 3);
    printf("%d\\n", peek(&s)); // 3
    printf("%d\\n", pop(&s));  // 3
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    s.push(1); s.push(2); s.push(3);
    cout << s.top() << "\\n"; // 3
    s.pop();
    cout << s.top() << "\\n"; // 2
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type Stack[T any] struct { data []T }

func (s *Stack[T]) Push(v T) { s.data = append(s.data, v) }
func (s *Stack[T]) Pop() (T, bool) {
    if len(s.data) == 0 { var zero T; return zero, false }
    v := s.data[len(s.data)-1]
    s.data = s.data[:len(s.data)-1]
    return v, true
}
func (s *Stack[T]) Peek() (T, bool) {
    if len(s.data) == 0 { var zero T; return zero, false }
    return s.data[len(s.data)-1], true
}

func main() {
    s := &Stack[int]{}
    s.Push(1); s.Push(2); s.Push(3)
    fmt.Println(s.Peek()) // 3 true
    fmt.Println(s.Pop())  // 3 true
}`,
      },
      {
        lang: "php",
        code: `<?php
class Stack {
    private array $data = [];
    public function push(mixed $val): void { $this->data[] = $val; }
    public function pop(): mixed { return array_pop($this->data); }
    public function peek(): mixed { return end($this->data); }
    public function isEmpty(): bool { return empty($this->data); }
}

$s = new Stack();
$s->push(1); $s->push(2); $s->push(3);
echo $s->peek() . "\\n"; // 3
echo $s->pop() . "\\n";  // 3`,
      },
      {
        lang: "kotlin",
        code: `import java.util.ArrayDeque

fun main() {
    val stack = ArrayDeque<Int>()
    stack.addLast(1); stack.addLast(2); stack.addLast(3)
    println(stack.last())          // 3
    println(stack.removeLast())    // 3
    println(stack.size)            // 2
}`,
      },
      {
        lang: "swift",
        code: `struct Stack<T> {
    private var data: [T] = []
    mutating func push(_ val: T) { data.append(val) }
    mutating func pop() -> T? { data.popLast() }
    var peek: T? { data.last }
    var isEmpty: Bool { data.isEmpty }
}

var s = Stack<Int>()
s.push(1); s.push(2); s.push(3)
print(s.peek!)  // 3
print(s.pop()!) // 3`,
      },
    ],
  },

  queue: {
    id: "queue",
    name: "Queue",
    displayName: { en: "Queue", zh: "队列" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["queue", "fifo", "linear"],
    description: {
      en: "A First-In-First-Out (FIFO) collection supporting enqueue and dequeue in O(1).",
      zh: "先进先出（FIFO）结构，入队和出队均为 O(1)。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 933, titleSlug: "number-of-recent-calls", difficulty: "easy" },
      { id: 225, titleSlug: "implement-stack-using-queues", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class Queue {
  #data = [];
  enqueue(val) { this.#data.push(val); }
  dequeue() { return this.#data.shift(); }
  front() { return this.#data[0]; }
  isEmpty() { return this.#data.length === 0; }
  get size() { return this.#data.length; }
}

const q = new Queue();
q.enqueue(1); q.enqueue(2); q.enqueue(3);
console.log(q.front());    // 1
console.log(q.dequeue());  // 1
console.log(q.size);       // 2`,
      },
      {
        lang: "typescript",
        code: `class Queue<T> {
  private data: T[] = [];
  enqueue(val: T): void { this.data.push(val); }
  dequeue(): T | undefined { return this.data.shift(); }
  front(): T | undefined { return this.data[0]; }
  isEmpty(): boolean { return this.data.length === 0; }
  get size(): number { return this.data.length; }
}

const q = new Queue<number>();
q.enqueue(1); q.enqueue(2); q.enqueue(3);
console.log(q.dequeue()); // 1`,
      },
      {
        lang: "java",
        code: `import java.util.ArrayDeque;
import java.util.Queue;

Queue<Integer> q = new ArrayDeque<>();
q.offer(1); q.offer(2); q.offer(3);
System.out.println(q.peek());  // 1
System.out.println(q.poll());  // 1
System.out.println(q.size());  // 2`,
      },
      {
        lang: "python",
        code: `from collections import deque

q = deque()
q.append(1)
q.append(2)
q.append(3)
print(q[0])          # front: 1
print(q.popleft())   # 1
print(len(q))        # 2`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;

fn main() {
    let mut q: VecDeque<i32> = VecDeque::new();
    q.push_back(1);
    q.push_back(2);
    q.push_back(3);
    println!("{:?}", q.front()); // Some(1)
    println!("{:?}", q.pop_front()); // Some(1)
    println!("{}", q.len()); // 2
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int head, tail, size; } Queue;

void init(Queue *q) { q->head = q->tail = q->size = 0; }
void enqueue(Queue *q, int v) { q->data[q->tail++ % MAX] = v; q->size++; }
int dequeue(Queue *q) { q->size--; return q->data[q->head++ % MAX]; }
int front(Queue *q) { return q->data[q->head % MAX]; }

int main() {
    Queue q; init(&q);
    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3);
    printf("%d\\n", front(&q));   // 1
    printf("%d\\n", dequeue(&q)); // 1
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(1); q.push(2); q.push(3);
    cout << q.front() << "\\n"; // 1
    q.pop();
    cout << q.front() << "\\n"; // 2
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/list"
    "fmt"
)

type Queue struct { l *list.List }

func NewQueue() *Queue { return &Queue{list.New()} }
func (q *Queue) Enqueue(v any) { q.l.PushBack(v) }
func (q *Queue) Dequeue() any {
    e := q.l.Front()
    if e == nil { return nil }
    q.l.Remove(e)
    return e.Value
}

func main() {
    q := NewQueue()
    q.Enqueue(1); q.Enqueue(2); q.Enqueue(3)
    fmt.Println(q.Dequeue()) // 1
    fmt.Println(q.Dequeue()) // 2
}`,
      },
      {
        lang: "php",
        code: `<?php
class Queue {
    private array $data = [];
    public function enqueue(mixed $val): void { $this->data[] = $val; }
    public function dequeue(): mixed { return array_shift($this->data); }
    public function front(): mixed { return $this->data[0] ?? null; }
    public function isEmpty(): bool { return empty($this->data); }
}

$q = new Queue();
$q->enqueue(1); $q->enqueue(2); $q->enqueue(3);
echo $q->dequeue() . "\\n"; // 1
echo $q->front() . "\\n";   // 2`,
      },
      {
        lang: "kotlin",
        code: `import java.util.ArrayDeque

fun main() {
    val q = ArrayDeque<Int>()
    q.addLast(1); q.addLast(2); q.addLast(3)
    println(q.first())          // 1
    println(q.removeFirst())    // 1
    println(q.size)             // 2
}`,
      },
      {
        lang: "swift",
        code: `struct Queue<T> {
    private var data: [T] = []
    mutating func enqueue(_ val: T) { data.append(val) }
    mutating func dequeue() -> T? {
        guard !data.isEmpty else { return nil }
        return data.removeFirst()
    }
    var front: T? { data.first }
    var isEmpty: Bool { data.isEmpty }
}

var q = Queue<Int>()
q.enqueue(1); q.enqueue(2); q.enqueue(3)
print(q.dequeue()!) // 1`,
      },
    ],
  },

  deque: {
    id: "deque",
    name: "Deque",
    displayName: { en: "Deque (Double-Ended Queue)", zh: "双端队列" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["deque", "double-ended", "sliding-window"],
    description: {
      en: "A double-ended queue allowing O(1) insertions and deletions at both front and back.",
      zh: "双端队列，支持从两端 O(1) 插入和删除。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 239, titleSlug: "sliding-window-maximum", difficulty: "hard" },
      { id: 641, titleSlug: "design-circular-deque", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class Deque {
  #data = [];
  pushFront(val) { this.#data.unshift(val); }
  pushBack(val)  { this.#data.push(val); }
  popFront() { return this.#data.shift(); }
  popBack()  { return this.#data.pop(); }
  peekFront() { return this.#data[0]; }
  peekBack()  { return this.#data[this.#data.length - 1]; }
  isEmpty()   { return this.#data.length === 0; }
  get size()  { return this.#data.length; }
}

const dq = new Deque();
dq.pushBack(2); dq.pushFront(1); dq.pushBack(3);
console.log(dq.popFront()); // 1
console.log(dq.popBack());  // 3`,
      },
      {
        lang: "typescript",
        code: `class Deque<T> {
  private data: T[] = [];
  pushFront(val: T): void { this.data.unshift(val); }
  pushBack(val: T): void  { this.data.push(val); }
  popFront(): T | undefined { return this.data.shift(); }
  popBack(): T | undefined  { return this.data.pop(); }
  peekFront(): T | undefined { return this.data[0]; }
  peekBack(): T | undefined  { return this.data[this.data.length - 1]; }
  isEmpty(): boolean { return this.data.length === 0; }
}`,
      },
      {
        lang: "java",
        code: `import java.util.ArrayDeque;
import java.util.Deque;

Deque<Integer> dq = new ArrayDeque<>();
dq.addFirst(1); dq.addLast(2); dq.addLast(3);
System.out.println(dq.peekFirst()); // 1
System.out.println(dq.pollLast());  // 3
System.out.println(dq.pollFirst()); // 1`,
      },
      {
        lang: "python",
        code: `from collections import deque

dq = deque()
dq.appendleft(1)
dq.append(2)
dq.append(3)
print(dq[0])            # 1
print(dq.pop())         # 3
print(dq.popleft())     # 1`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;

fn main() {
    let mut dq: VecDeque<i32> = VecDeque::new();
    dq.push_front(1);
    dq.push_back(2);
    dq.push_back(3);
    println!("{:?}", dq.front());    // Some(1)
    println!("{:?}", dq.back());     // Some(3)
    dq.pop_front();
    dq.pop_back();
    println!("{:?}", dq);            // [2]
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAX 100

typedef struct { int data[MAX]; int head, tail, size; } Deque;

void init(Deque *d) { d->head = MAX/2; d->tail = MAX/2; d->size = 0; }
void push_front(Deque *d, int v) { d->data[--d->head] = v; d->size++; }
void push_back(Deque *d, int v)  { d->data[d->tail++] = v; d->size++; }
int pop_front(Deque *d) { d->size--; return d->data[d->head++]; }
int pop_back(Deque *d)  { d->size--; return d->data[--d->tail]; }

int main() {
    Deque d; init(&d);
    push_back(&d, 2); push_front(&d, 1); push_back(&d, 3);
    printf("%d\\n", pop_front(&d)); // 1
    printf("%d\\n", pop_back(&d));  // 3
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <deque>
using namespace std;

int main() {
    deque<int> dq;
    dq.push_front(1); dq.push_back(2); dq.push_back(3);
    cout << dq.front() << "\\n"; // 1
    cout << dq.back() << "\\n";  // 3
    dq.pop_front(); dq.pop_back();
    cout << dq.front() << "\\n"; // 2
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/list"
    "fmt"
)

type Deque struct { l *list.List }

func NewDeque() *Deque { return &Deque{list.New()} }
func (d *Deque) PushFront(v any) { d.l.PushFront(v) }
func (d *Deque) PushBack(v any)  { d.l.PushBack(v) }
func (d *Deque) PopFront() any   { e := d.l.Front(); if e == nil { return nil }; d.l.Remove(e); return e.Value }
func (d *Deque) PopBack() any    { e := d.l.Back(); if e == nil { return nil }; d.l.Remove(e); return e.Value }

func main() {
    dq := NewDeque()
    dq.PushBack(2); dq.PushFront(1); dq.PushBack(3)
    fmt.Println(dq.PopFront()) // 1
    fmt.Println(dq.PopBack())  // 3
}`,
      },
      {
        lang: "php",
        code: `<?php
class Deque {
    private array $data = [];
    public function pushFront(mixed $v): void { array_unshift($this->data, $v); }
    public function pushBack(mixed $v): void  { $this->data[] = $v; }
    public function popFront(): mixed { return array_shift($this->data); }
    public function popBack(): mixed  { return array_pop($this->data); }
    public function peekFront(): mixed { return $this->data[0] ?? null; }
}

$dq = new Deque();
$dq->pushBack(2); $dq->pushFront(1); $dq->pushBack(3);
echo $dq->popFront() . "\\n"; // 1
echo $dq->popBack() . "\\n";  // 3`,
      },
      {
        lang: "kotlin",
        code: `import java.util.ArrayDeque

fun main() {
    val dq = ArrayDeque<Int>()
    dq.addFirst(1); dq.addLast(2); dq.addLast(3)
    println(dq.first())        // 1
    println(dq.removeLast())   // 3
    println(dq.removeFirst())  // 1
}`,
      },
      {
        lang: "swift",
        code: `struct Deque<T> {
    private var data: [T] = []
    mutating func pushFront(_ v: T) { data.insert(v, at: 0) }
    mutating func pushBack(_ v: T)  { data.append(v) }
    mutating func popFront() -> T?  { data.isEmpty ? nil : data.removeFirst() }
    mutating func popBack() -> T?   { data.popLast() }
    var peekFront: T? { data.first }
    var peekBack: T?  { data.last }
}

var dq = Deque<Int>()
dq.pushBack(2); dq.pushFront(1); dq.pushBack(3)
print(dq.popFront()!) // 1
print(dq.popBack()!)  // 3`,
      },
    ],
  },

  "circular-queue": {
    id: "circular-queue",
    name: "Circular Queue",
    displayName: { en: "Circular Queue", zh: "循环队列" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["queue", "circular", "ring-buffer", "fixed-size"],
    description: {
      en: "A fixed-size ring buffer queue where the tail wraps around to the head, enabling O(1) enqueue and dequeue without shifting.",
      zh: "固定大小的环形缓冲队列，尾部绕回头部，入队和出队均为 O(1) 且无需移位。",
    },
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 622, titleSlug: "design-circular-queue", difficulty: "medium" },
      { id: 641, titleSlug: "design-circular-deque", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class CircularQueue {
  constructor(capacity) {
    this.cap = capacity;
    this.data = new Array(capacity);
    this.head = 0; this.tail = 0; this.size = 0;
  }
  enqueue(val) {
    if (this.size === this.cap) throw new Error("Queue full");
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.cap;
    this.size++;
  }
  dequeue() {
    if (this.size === 0) throw new Error("Queue empty");
    const val = this.data[this.head];
    this.head = (this.head + 1) % this.cap;
    this.size--;
    return val;
  }
  front() { return this.data[this.head]; }
  isFull() { return this.size === this.cap; }
  isEmpty() { return this.size === 0; }
}

const cq = new CircularQueue(3);
cq.enqueue(1); cq.enqueue(2); cq.enqueue(3);
console.log(cq.dequeue()); // 1
cq.enqueue(4);
console.log(cq.front());   // 2`,
      },
      {
        lang: "typescript",
        code: `class CircularQueue<T> {
  private data: T[];
  private head = 0;
  private tail = 0;
  private size = 0;

  constructor(private cap: number) {
    this.data = new Array<T>(cap);
  }

  enqueue(val: T): void {
    if (this.isFull()) throw new Error("Queue full");
    this.data[this.tail] = val;
    this.tail = (this.tail + 1) % this.cap;
    this.size++;
  }

  dequeue(): T {
    if (this.isEmpty()) throw new Error("Queue empty");
    const val = this.data[this.head];
    this.head = (this.head + 1) % this.cap;
    this.size--;
    return val;
  }

  front(): T { return this.data[this.head]; }
  isFull(): boolean  { return this.size === this.cap; }
  isEmpty(): boolean { return this.size === 0; }
}`,
      },
      {
        lang: "java",
        code: `class CircularQueue {
    private int[] data;
    private int head = 0, tail = 0, size = 0, cap;

    CircularQueue(int cap) { this.cap = cap; data = new int[cap]; }

    void enqueue(int val) {
        if (size == cap) throw new RuntimeException("full");
        data[tail] = val;
        tail = (tail + 1) % cap;
        size++;
    }

    int dequeue() {
        if (size == 0) throw new RuntimeException("empty");
        int val = data[head];
        head = (head + 1) % cap;
        size--;
        return val;
    }

    int front() { return data[head]; }
    boolean isFull()  { return size == cap; }
    boolean isEmpty() { return size == 0; }
}`,
      },
      {
        lang: "python",
        code: `class CircularQueue:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.data = [None] * capacity
        self.head = 0
        self.tail = 0
        self.size = 0

    def enqueue(self, val):
        if self.size == self.cap:
            raise Exception("Queue full")
        self.data[self.tail] = val
        self.tail = (self.tail + 1) % self.cap
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise Exception("Queue empty")
        val = self.data[self.head]
        self.head = (self.head + 1) % self.cap
        self.size -= 1
        return val

    def front(self): return self.data[self.head]
    def is_full(self): return self.size == self.cap
    def is_empty(self): return self.size == 0`,
      },
      {
        lang: "rust",
        code: `struct CircularQueue<T> {
    data: Vec<Option<T>>,
    head: usize,
    tail: usize,
    size: usize,
    cap: usize,
}

impl<T: Clone> CircularQueue<T> {
    fn new(cap: usize) -> Self {
        CircularQueue { data: vec![None; cap], head: 0, tail: 0, size: 0, cap }
    }
    fn enqueue(&mut self, val: T) -> bool {
        if self.size == self.cap { return false; }
        self.data[self.tail] = Some(val);
        self.tail = (self.tail + 1) % self.cap;
        self.size += 1; true
    }
    fn dequeue(&mut self) -> Option<T> {
        if self.size == 0 { return None; }
        let val = self.data[self.head].take();
        self.head = (self.head + 1) % self.cap;
        self.size -= 1; val
    }
}

fn main() {
    let mut cq = CircularQueue::new(3);
    cq.enqueue(1); cq.enqueue(2); cq.enqueue(3);
    println!("{:?}", cq.dequeue()); // Some(1)
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define CAP 5

typedef struct { int data[CAP]; int head, tail, size; } CQueue;

void cq_init(CQueue *q)    { q->head = q->tail = q->size = 0; }
int  cq_enqueue(CQueue *q, int v) {
    if (q->size == CAP) return 0;
    q->data[q->tail] = v; q->tail = (q->tail+1)%CAP; q->size++; return 1;
}
int  cq_dequeue(CQueue *q, int *out) {
    if (!q->size) return 0;
    *out = q->data[q->head]; q->head = (q->head+1)%CAP; q->size--; return 1;
}

int main() {
    CQueue q; cq_init(&q);
    cq_enqueue(&q, 1); cq_enqueue(&q, 2); cq_enqueue(&q, 3);
    int v; cq_dequeue(&q, &v); printf("%d\\n", v); // 1
    cq_enqueue(&q, 4);
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <stdexcept>
using namespace std;

template<typename T>
class CircularQueue {
    vector<T> data; int head=0, tail=0, sz=0, cap;
public:
    CircularQueue(int cap): cap(cap), data(cap) {}
    void enqueue(T v) {
        if (sz==cap) throw overflow_error("full");
        data[tail]=v; tail=(tail+1)%cap; sz++;
    }
    T dequeue() {
        if (!sz) throw underflow_error("empty");
        T v=data[head]; head=(head+1)%cap; sz--; return v;
    }
    T front() { return data[head]; }
    bool isFull()  { return sz==cap; }
    bool isEmpty() { return sz==0; }
};

int main() {
    CircularQueue<int> cq(3);
    cq.enqueue(1); cq.enqueue(2); cq.enqueue(3);
    cout << cq.dequeue() << "\\n"; // 1
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type CircularQueue struct {
    data []int
    head, tail, size, cap int
}

func NewCircularQueue(cap int) *CircularQueue {
    return &CircularQueue{data: make([]int, cap), cap: cap}
}
func (q *CircularQueue) Enqueue(v int) bool {
    if q.size == q.cap { return false }
    q.data[q.tail] = v; q.tail = (q.tail+1)%q.cap; q.size++; return true
}
func (q *CircularQueue) Dequeue() (int, bool) {
    if q.size == 0 { return 0, false }
    v := q.data[q.head]; q.head = (q.head+1)%q.cap; q.size--; return v, true
}

func main() {
    cq := NewCircularQueue(3)
    cq.Enqueue(1); cq.Enqueue(2); cq.Enqueue(3)
    v, _ := cq.Dequeue()
    fmt.Println(v) // 1
}`,
      },
      {
        lang: "php",
        code: `<?php
class CircularQueue {
    private array $data;
    private int $head = 0, $tail = 0, $size = 0;
    public function __construct(private int $cap) {
        $this->data = array_fill(0, $cap, null);
    }
    public function enqueue(mixed $val): bool {
        if ($this->size === $this->cap) return false;
        $this->data[$this->tail] = $val;
        $this->tail = ($this->tail + 1) % $this->cap;
        $this->size++;
        return true;
    }
    public function dequeue(): mixed {
        if ($this->size === 0) return null;
        $val = $this->data[$this->head];
        $this->head = ($this->head + 1) % $this->cap;
        $this->size--;
        return $val;
    }
}

$cq = new CircularQueue(3);
$cq->enqueue(1); $cq->enqueue(2); $cq->enqueue(3);
echo $cq->dequeue() . "\\n"; // 1`,
      },
      {
        lang: "kotlin",
        code: `class CircularQueue(private val cap: Int) {
    private val data = arrayOfNulls<Int>(cap)
    private var head = 0; private var tail = 0; private var size = 0

    fun enqueue(v: Int): Boolean {
        if (size == cap) return false
        data[tail] = v; tail = (tail + 1) % cap; size++; return true
    }
    fun dequeue(): Int? {
        if (size == 0) return null
        val v = data[head]; head = (head + 1) % cap; size--; return v
    }
    fun front(): Int? = data[head]
    fun isFull() = size == cap
    fun isEmpty() = size == 0
}

fun main() {
    val cq = CircularQueue(3)
    cq.enqueue(1); cq.enqueue(2); cq.enqueue(3)
    println(cq.dequeue()) // 1
}`,
      },
      {
        lang: "swift",
        code: `struct CircularQueue<T> {
    private var data: [T?]
    private var head = 0, tail = 0, size = 0
    private let cap: Int

    init(capacity: Int) { cap = capacity; data = Array(repeating: nil, count: capacity) }

    mutating func enqueue(_ val: T) -> Bool {
        guard size < cap else { return false }
        data[tail] = val; tail = (tail + 1) % cap; size += 1; return true
    }

    mutating func dequeue() -> T? {
        guard size > 0 else { return nil }
        let val = data[head]; data[head] = nil
        head = (head + 1) % cap; size -= 1; return val
    }

    var front: T? { data[head] }
    var isFull: Bool { size == cap }
    var isEmpty: Bool { size == 0 }
}

var cq = CircularQueue<Int>(capacity: 3)
cq.enqueue(1); cq.enqueue(2); cq.enqueue(3)
print(cq.dequeue()!) // 1`,
      },
    ],
  },
}
