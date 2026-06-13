import type { AlgorithmMeta } from "@algomotion/shared"

export const treeDsAlgorithms: Record<string, AlgorithmMeta> = {
  "binary-tree": {
    id: "binary-tree",
    name: "Binary Tree",
    displayName: { en: "Binary Tree", zh: "二叉树" },
    category: "data-structure",
    difficulty: "beginner",
    tags: ["tree", "binary-tree", "recursive"],
    description: {
      en: "A tree where each node has at most two children (left and right).",
      zh: "每个节点最多有左右两个子节点的树形结构。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 104, titleSlug: "maximum-depth-of-binary-tree", difficulty: "easy" },
      { id: 226, titleSlug: "invert-binary-tree", difficulty: "easy" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function insert(root, val) {
  if (!root) return new TreeNode(val);
  if (Math.random() < 0.5) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}

function inorder(node, res = []) {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.val);
  inorder(node.right, res);
  return res;
}

let root = null;
[5,3,7,1,4].forEach(v => root = insert(root, v));
console.log(inorder(root));`,
      },
      {
        lang: "typescript",
        code: `class TreeNode {
  constructor(
    public val: number,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null
  ) {}
}

function inorder(node: TreeNode | null, res: number[] = []): number[] {
  if (!node) return res;
  inorder(node.left, res);
  res.push(node.val);
  inorder(node.right, res);
  return res;
}

const root = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);
console.log(inorder(root)); // [4,2,5,1,3]`,
      },
      {
        lang: "java",
        code: `class TreeNode {
    int val; TreeNode left, right;
    TreeNode(int v) { val = v; }
}

class BinaryTree {
    static void inorder(TreeNode n, java.util.List<Integer> res) {
        if (n == null) return;
        inorder(n.left, res);
        res.add(n.val);
        inorder(n.right, res);
    }
    public static void main(String[] a) {
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2); root.right = new TreeNode(3);
        root.left.left = new TreeNode(4); root.left.right = new TreeNode(5);
        var res = new java.util.ArrayList<Integer>();
        inorder(root, res);
        System.out.println(res); // [4,2,5,1,3]
    }
}`,
      },
      {
        lang: "python",
        code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder(node, res=None):
    if res is None: res = []
    if not node: return res
    inorder(node.left, res)
    res.append(node.val)
    inorder(node.right, res)
    return res

root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(inorder(root))  # [4, 2, 5, 1, 3]`,
      },
      {
        lang: "rust",
        code: `#[derive(Debug)]
struct TreeNode {
    val: i32,
    left: Option<Box<TreeNode>>,
    right: Option<Box<TreeNode>>,
}

impl TreeNode {
    fn new(val: i32) -> Box<Self> {
        Box::new(TreeNode { val, left: None, right: None })
    }
}

fn inorder(node: &Option<Box<TreeNode>>, res: &mut Vec<i32>) {
    if let Some(n) = node {
        inorder(&n.left, res);
        res.push(n.val);
        inorder(&n.right, res);
    }
}

fn main() {
    let root = Some(Box::new(TreeNode {
        val: 1,
        left: Some(Box::new(TreeNode { val: 2, left: TreeNode::new(4).left.take().map(|_| TreeNode::new(4)), right: None })),
        right: Some(TreeNode::new(3)),
    }));
    let mut res = vec![];
    inorder(&root, &mut res);
    println!("{:?}", res);
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int val; struct Node *left, *right; } Node;

Node *new_node(int v) { Node *n = calloc(1, sizeof(Node)); n->val = v; return n; }

void inorder(Node *n) {
    if (!n) return;
    inorder(n->left); printf("%d ", n->val); inorder(n->right);
}

int main() {
    Node *root = new_node(1);
    root->left = new_node(2); root->right = new_node(3);
    root->left->left = new_node(4); root->left->right = new_node(5);
    inorder(root); // 4 2 5 1 3
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
using namespace std;

struct Node { int val; Node *left=nullptr, *right=nullptr; Node(int v):val(v){} };

void inorder(Node *n) {
    if (!n) return;
    inorder(n->left); cout << n->val << " "; inorder(n->right);
}

int main() {
    Node *root = new Node(1);
    root->left = new Node(2); root->right = new Node(3);
    root->left->left = new Node(4); root->left->right = new Node(5);
    inorder(root); // 4 2 5 1 3
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type TreeNode struct { Val int; Left, Right *TreeNode }

func inorder(n *TreeNode, res *[]int) {
    if n == nil { return }
    inorder(n.Left, res); *res = append(*res, n.Val); inorder(n.Right, res)
}

func main() {
    root := &TreeNode{1, &TreeNode{2, &TreeNode{Val: 4}, &TreeNode{Val: 5}}, &TreeNode{Val: 3}}
    var res []int
    inorder(root, &res)
    fmt.Println(res) // [4 2 5 1 3]
}`,
      },
      {
        lang: "php",
        code: `<?php
class TreeNode {
    public int $val;
    public ?TreeNode $left, $right;
    public function __construct(int $v, ?TreeNode $l=null, ?TreeNode $r=null) {
        $this->val=$v; $this->left=$l; $this->right=$r;
    }
}

function inorder(?TreeNode $n, array &$res): void {
    if (!$n) return;
    inorder($n->left, $res); $res[] = $n->val; inorder($n->right, $res);
}

$root = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
$res = [];
inorder($root, $res);
print_r($res); // [4,2,5,1,3]`,
      },
      {
        lang: "kotlin",
        code: `class TreeNode(val value: Int, var left: TreeNode? = null, var right: TreeNode? = null)

fun inorder(node: TreeNode?, res: MutableList<Int> = mutableListOf()): List<Int> {
    if (node == null) return res
    inorder(node.left, res); res.add(node.value); inorder(node.right, res)
    return res
}

fun main() {
    val root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
    println(inorder(root)) // [4, 2, 5, 1, 3]
}`,
      },
      {
        lang: "swift",
        code: `class TreeNode {
    var val: Int; var left, right: TreeNode?
    init(_ v: Int, _ l: TreeNode? = nil, _ r: TreeNode? = nil) { val=v; left=l; right=r }
}

func inorder(_ n: TreeNode?, _ res: inout [Int]) {
    guard let n = n else { return }
    inorder(n.left, &res); res.append(n.val); inorder(n.right, &res)
}

let root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
var res = [Int]()
inorder(root, &res)
print(res) // [4, 2, 5, 1, 3]`,
      },
    ],
  },

  "binary-search-tree": {
    id: "binary-search-tree",
    name: "Binary Search Tree",
    displayName: { en: "Binary Search Tree", zh: "二叉搜索树" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["tree", "bst", "search", "ordered"],
    description: {
      en: "A binary tree where left subtree values are smaller and right subtree values are larger than the node, enabling O(log n) search on average.",
      zh: "左子树所有值小于节点、右子树所有值大于节点的二叉树，平均查找时间为 O(log n)。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 700, titleSlug: "search-in-a-binary-search-tree", difficulty: "easy" },
      { id: 98, titleSlug: "validate-binary-search-tree", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class BSTNode {
  constructor(val) { this.val=val; this.left=null; this.right=null; }
}

class BST {
  constructor() { this.root = null; }

  insert(val) {
    const node = new BSTNode(val);
    if (!this.root) { this.root = node; return; }
    let cur = this.root;
    while (true) {
      if (val < cur.val) {
        if (!cur.left) { cur.left = node; return; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = node; return; }
        cur = cur.right;
      }
    }
  }

  search(val) {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return true;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return false;
  }
}

const bst = new BST();
[5,3,7,1,4,6,8].forEach(v => bst.insert(v));
console.log(bst.search(4)); // true
console.log(bst.search(9)); // false`,
      },
      {
        lang: "typescript",
        code: `class BSTNode {
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  constructor(public val: number) {}
}

class BST {
  root: BSTNode | null = null;

  insert(val: number): void {
    if (!this.root) { this.root = new BSTNode(val); return; }
    let cur = this.root;
    while (true) {
      if (val < cur.val) {
        if (!cur.left) { cur.left = new BSTNode(val); return; }
        cur = cur.left;
      } else {
        if (!cur.right) { cur.right = new BSTNode(val); return; }
        cur = cur.right;
      }
    }
  }

  search(val: number): boolean {
    let cur = this.root;
    while (cur) {
      if (val === cur.val) return true;
      cur = val < cur.val ? cur.left : cur.right;
    }
    return false;
  }
}`,
      },
      {
        lang: "java",
        code: `class BST {
    static class Node { int val; Node left, right; Node(int v){val=v;} }
    Node root;

    void insert(int val) {
        if (root==null){root=new Node(val);return;}
        Node cur=root;
        while(true){
            if(val<cur.val){if(cur.left==null){cur.left=new Node(val);return;}cur=cur.left;}
            else{if(cur.right==null){cur.right=new Node(val);return;}cur=cur.right;}
        }
    }

    boolean search(int val) {
        Node cur=root;
        while(cur!=null){
            if(val==cur.val)return true;
            cur=val<cur.val?cur.left:cur.right;
        }
        return false;
    }
}`,
      },
      {
        lang: "python",
        code: `class BSTNode:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None

class BST:
    def __init__(self): self.root = None

    def insert(self, val):
        node = BSTNode(val)
        if not self.root: self.root = node; return
        cur = self.root
        while True:
            if val < cur.val:
                if not cur.left: cur.left = node; return
                cur = cur.left
            else:
                if not cur.right: cur.right = node; return
                cur = cur.right

    def search(self, val):
        cur = self.root
        while cur:
            if val == cur.val: return True
            cur = cur.left if val < cur.val else cur.right
        return False

bst = BST()
for v in [5,3,7,1,4]: bst.insert(v)
print(bst.search(4))  # True`,
      },
      {
        lang: "rust",
        code: `struct BST { root: Option<Box<Node>> }
struct Node { val: i32, left: Option<Box<Node>>, right: Option<Box<Node>> }

impl Node { fn new(v: i32) -> Box<Self> { Box::new(Node { val:v, left:None, right:None }) } }

impl BST {
    fn new() -> Self { BST { root: None } }
    fn insert(&mut self, val: i32) {
        let mut cur = &mut self.root;
        loop {
            match cur {
                None => { *cur = Some(Node::new(val)); return; }
                Some(n) => cur = if val < n.val { &mut n.left } else { &mut n.right },
            }
        }
    }
    fn search(&self, val: i32) -> bool {
        let mut cur = &self.root;
        while let Some(n) = cur {
            if val == n.val { return true; }
            cur = if val < n.val { &n.left } else { &n.right };
        }
        false
    }
}

fn main() {
    let mut bst = BST::new();
    for v in [5,3,7,1,4] { bst.insert(v); }
    println!("{}", bst.search(4)); // true
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct N { int v; struct N *l,*r; } N;
N *new_n(int v){N*n=calloc(1,sizeof(N));n->v=v;return n;}

void insert(N **root, int v) {
    while(*root){if(v<(*root)->v)root=&(*root)->l;else root=&(*root)->r;}
    *root=new_n(v);
}

int search(N *root, int v) {
    while(root){if(v==root->v)return 1;root=v<root->v?root->l:root->r;}return 0;
}

int main(){
    N *root=NULL;
    int arr[]={5,3,7,1,4};
    for(int i=0;i<5;i++)insert(&root,arr[i]);
    printf("%d\\n",search(root,4)); // 1
    printf("%d\\n",search(root,9)); // 0
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
using namespace std;

struct Node { int val; Node *left=nullptr,*right=nullptr; Node(int v):val(v){} };

class BST {
    Node *root=nullptr;
public:
    void insert(int v) {
        Node **cur=&root;
        while(*cur) cur=v<(*cur)->val?&(*cur)->left:&(*cur)->right;
        *cur=new Node(v);
    }
    bool search(int v) {
        Node *cur=root;
        while(cur){ if(v==cur->val)return true; cur=v<cur->val?cur->left:cur->right; }
        return false;
    }
};

int main(){
    BST bst;
    for(int v:{5,3,7,1,4}) bst.insert(v);
    cout<<bst.search(4)<<"\\n"; // 1
    cout<<bst.search(9)<<"\\n"; // 0
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type Node struct { Val int; Left, Right *Node }

func insert(root **Node, val int) {
    for *root != nil {
        if val < (*root).Val { root = &(*root).Left } else { root = &(*root).Right }
    }
    *root = &Node{Val: val}
}

func search(root *Node, val int) bool {
    for root != nil {
        if val == root.Val { return true }
        if val < root.Val { root = root.Left } else { root = root.Right }
    }
    return false
}

func main() {
    var root *Node
    for _, v := range []int{5,3,7,1,4} { insert(&root, v) }
    fmt.Println(search(root, 4)) // true
    fmt.Println(search(root, 9)) // false
}`,
      },
      {
        lang: "php",
        code: `<?php
class BSTNode {
    public int $val; public ?BSTNode $left=null, $right=null;
    public function __construct(int $v) { $this->val=$v; }
}

class BST {
    public ?BSTNode $root=null;
    public function insert(int $v): void {
        $node=new BSTNode($v);
        if(!$this->root){$this->root=$node;return;}
        $cur=$this->root;
        while(true){
            if($v<$cur->val){if(!$cur->left){$cur->left=$node;return;}$cur=$cur->left;}
            else{if(!$cur->right){$cur->right=$node;return;}$cur=$cur->right;}
        }
    }
    public function search(int $v): bool {
        $cur=$this->root;
        while($cur){if($v===$cur->val)return true;$cur=$v<$cur->val?$cur->left:$cur->right;}
        return false;
    }
}

$bst=new BST();
foreach([5,3,7,1,4] as $v) $bst->insert($v);
var_dump($bst->search(4)); // bool(true)`,
      },
      {
        lang: "kotlin",
        code: `class BSTNode(val value: Int, var left: BSTNode?=null, var right: BSTNode?=null)

class BST {
    var root: BSTNode? = null
    fun insert(v: Int) {
        if (root==null){root=BSTNode(v);return}
        var cur=root!!
        while(true){
            if(v<cur.value){if(cur.left==null){cur.left=BSTNode(v);return}else cur=cur.left!!}
            else{if(cur.right==null){cur.right=BSTNode(v);return}else cur=cur.right!!}
        }
    }
    fun search(v: Int): Boolean {
        var cur=root
        while(cur!=null){if(v==cur.value)return true;cur=if(v<cur.value)cur.left else cur.right}
        return false
    }
}

fun main(){val bst=BST();listOf(5,3,7,1,4).forEach{bst.insert(it)};println(bst.search(4))}`,
      },
      {
        lang: "swift",
        code: `class BSTNode { var val:Int; var left,right:BSTNode?; init(_ v:Int){val=v} }

class BST {
    var root: BSTNode?
    func insert(_ v: Int) {
        guard var cur = root else { root = BSTNode(v); return }
        while true {
            if v < cur.val {
                if cur.left == nil { cur.left = BSTNode(v); return }
                cur = cur.left!
            } else {
                if cur.right == nil { cur.right = BSTNode(v); return }
                cur = cur.right!
            }
        }
    }
    func search(_ v: Int) -> Bool {
        var cur = root
        while let node = cur {
            if v == node.val { return true }
            cur = v < node.val ? node.left : node.right
        }
        return false
    }
}

let bst = BST()
[5,3,7,1,4].forEach { bst.insert($0) }
print(bst.search(4))`,
      },
    ],
  },

  "avl-tree": {
    id: "avl-tree",
    name: "AVL Tree",
    displayName: { en: "AVL Tree", zh: "AVL 树" },
    category: "data-structure",
    difficulty: "advanced",
    tags: ["tree", "balanced", "rotation", "self-balancing"],
    description: {
      en: "A self-balancing BST where the heights of the two child subtrees differ by at most one, guaranteeing O(log n) operations.",
      zh: "自平衡二叉搜索树，任意节点左右子树高度差不超过 1，保证 O(log n) 操作。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 110, titleSlug: "balanced-binary-tree", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `class AVLNode {
  constructor(val) { this.val=val; this.left=this.right=null; this.height=1; }
}

function height(n) { return n ? n.height : 0; }
function updateHeight(n) { n.height = 1 + Math.max(height(n.left), height(n.right)); }
function bf(n) { return height(n.left) - height(n.right); }

function rotateRight(y) {
  const x = y.left, T2 = x.right;
  x.right = y; y.left = T2;
  updateHeight(y); updateHeight(x);
  return x;
}

function rotateLeft(x) {
  const y = x.right, T2 = y.left;
  y.left = x; x.right = T2;
  updateHeight(x); updateHeight(y);
  return y;
}

function insert(node, val) {
  if (!node) return new AVLNode(val);
  if (val < node.val) node.left = insert(node.left, val);
  else if (val > node.val) node.right = insert(node.right, val);
  else return node;

  updateHeight(node);
  const b = bf(node);

  if (b > 1 && val < node.left.val) return rotateRight(node);
  if (b < -1 && val > node.right.val) return rotateLeft(node);
  if (b > 1 && val > node.left.val) { node.left = rotateLeft(node.left); return rotateRight(node); }
  if (b < -1 && val < node.right.val) { node.right = rotateRight(node.right); return rotateLeft(node); }
  return node;
}

let root = null;
[10,20,30,40,50,25].forEach(v => root = insert(root, v));
console.log("height:", root.height);`,
      },
      {
        lang: "typescript",
        code: `class AVLNode {
  height = 1;
  left: AVLNode | null = null;
  right: AVLNode | null = null;
  constructor(public val: number) {}
}

const h = (n: AVLNode | null) => n?.height ?? 0;
const upH = (n: AVLNode) => { n.height = 1 + Math.max(h(n.left), h(n.right)); };
const bf = (n: AVLNode) => h(n.left) - h(n.right);

function rr(y: AVLNode): AVLNode {
  const x = y.left!, T2 = x.right;
  x.right = y; y.left = T2; upH(y); upH(x); return x;
}
function rl(x: AVLNode): AVLNode {
  const y = x.right!, T2 = y.left;
  y.left = x; x.right = T2; upH(x); upH(y); return y;
}

function insert(node: AVLNode | null, val: number): AVLNode {
  if (!node) return new AVLNode(val);
  if (val < node.val) node.left = insert(node.left, val);
  else if (val > node.val) node.right = insert(node.right, val);
  else return node;
  upH(node);
  const b = bf(node);
  if (b > 1 && val < node.left!.val) return rr(node);
  if (b < -1 && val > node.right!.val) return rl(node);
  if (b > 1) { node.left = rl(node.left!); return rr(node); }
  if (b < -1) { node.right = rr(node.right!); return rl(node); }
  return node;
}`,
      },
      {
        lang: "java",
        code: `class AVL {
    static class Node { int val, h=1; Node l,r; Node(int v){val=v;} }

    static int h(Node n){return n==null?0:n.h;}
    static void upH(Node n){n.h=1+Math.max(h(n.l),h(n.r));}
    static int bf(Node n){return h(n.l)-h(n.r);}

    static Node rr(Node y){Node x=y.l;y.l=x.r;x.r=y;upH(y);upH(x);return x;}
    static Node rl(Node x){Node y=x.r;x.r=y.l;y.l=x;upH(x);upH(y);return y;}

    static Node insert(Node n, int v){
        if(n==null)return new Node(v);
        if(v<n.val)n.l=insert(n.l,v);
        else if(v>n.val)n.r=insert(n.r,v);
        else return n;
        upH(n); int b=bf(n);
        if(b>1&&v<n.l.val)return rr(n);
        if(b<-1&&v>n.r.val)return rl(n);
        if(b>1){n.l=rl(n.l);return rr(n);}
        if(b<-1){n.r=rr(n.r);return rl(n);}
        return n;
    }
}`,
      },
      {
        lang: "python",
        code: `class AVLNode:
    def __init__(self, val):
        self.val = val; self.left = self.right = None; self.height = 1

def h(n): return n.height if n else 0
def upH(n): n.height = 1 + max(h(n.left), h(n.right))
def bf(n): return h(n.left) - h(n.right)

def rr(y):
    x = y.left; y.left = x.right; x.right = y; upH(y); upH(x); return x

def rl(x):
    y = x.right; x.right = y.left; y.left = x; upH(x); upH(y); return y

def insert(node, val):
    if not node: return AVLNode(val)
    if val < node.val: node.left = insert(node.left, val)
    elif val > node.val: node.right = insert(node.right, val)
    else: return node
    upH(node); b = bf(node)
    if b > 1 and val < node.left.val: return rr(node)
    if b < -1 and val > node.right.val: return rl(node)
    if b > 1: node.left = rl(node.left); return rr(node)
    if b < -1: node.right = rr(node.right); return rl(node)
    return node

root = None
for v in [10,20,30,40,50,25]: root = insert(root, v)
print("height:", root.height)`,
      },
      {
        lang: "rust",
        code: `// AVL tree insert in Rust (simplified)
#[derive(Debug)]
struct Node { val: i32, h: i32, left: Option<Box<Node>>, right: Option<Box<Node>> }

fn h(n: &Option<Box<Node>>) -> i32 { n.as_ref().map_or(0, |n| n.h) }

fn upd(n: &mut Node) { n.h = 1 + h(&n.left).max(h(&n.right)); }

fn bf(n: &Node) -> i32 { h(&n.left) - h(&n.right) }

fn new(val: i32) -> Box<Node> { Box::new(Node { val, h:1, left:None, right:None }) }

fn rr(mut y: Box<Node>) -> Box<Node> {
    let mut x = y.left.take().unwrap();
    y.left = x.right.take(); upd(&mut y);
    x.right = Some(y); upd(&mut x); x
}

fn rl(mut x: Box<Node>) -> Box<Node> {
    let mut y = x.right.take().unwrap();
    x.right = y.left.take(); upd(&mut x);
    y.left = Some(x); upd(&mut y); y
}

fn insert(node: Option<Box<Node>>, val: i32) -> Box<Node> {
    let mut n = match node { None => return new(val), Some(n) => n };
    if val < n.val { n.left = Some(insert(n.left.take(), val)); }
    else if val > n.val { n.right = Some(insert(n.right.take(), val)); }
    else { return n; }
    upd(&mut n);
    let b = bf(&n);
    if b > 1 && val < n.left.as_ref().unwrap().val { return rr(n); }
    if b < -1 && val > n.right.as_ref().unwrap().val { return rl(n); }
    if b > 1 { n.left = Some(rl(n.left.take().unwrap())); return rr(n); }
    if b < -1 { n.right = Some(rr(n.right.take().unwrap())); return rl(n); }
    n
}

fn main() {
    let mut root: Option<Box<Node>> = None;
    for v in [10,20,30] { root = Some(insert(root, v)); }
    println!("{}", root.as_ref().unwrap().h);
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#define MAX(a,b) ((a)>(b)?(a):(b))

typedef struct N { int v,h; struct N *l,*r; } N;
N *nn(int v){N *n=calloc(1,sizeof(N));n->v=v;n->h=1;return n;}
int h(N *n){return n?n->h:0;}
void upH(N *n){n->h=1+MAX(h(n->l),h(n->r));}
int bf(N *n){return h(n->l)-h(n->r);}

N *rr(N *y){N *x=y->l;y->l=x->r;x->r=y;upH(y);upH(x);return x;}
N *rl(N *x){N *y=x->r;x->r=y->l;y->l=x;upH(x);upH(y);return y;}

N *insert(N *n, int v){
    if(!n)return nn(v);
    if(v<n->v)n->l=insert(n->l,v);
    else if(v>n->v)n->r=insert(n->r,v);
    else return n;
    upH(n); int b=bf(n);
    if(b>1&&v<n->l->v)return rr(n);
    if(b<-1&&v>n->r->v)return rl(n);
    if(b>1){n->l=rl(n->l);return rr(n);}
    if(b<-1){n->r=rr(n->r);return rl(n);}
    return n;
}

int main(){N *r=NULL;int a[]={10,20,30,40,50,25};for(int i=0;i<6;i++)r=insert(r,a[i]);printf("h=%d\\n",r->h);return 0;}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <algorithm>
using namespace std;

struct N { int v,h; N *l=nullptr,*r=nullptr; N(int v):v(v),h(1){} };

int h(N *n){return n?n->h:0;}
void upH(N *n){n->h=1+max(h(n->l),h(n->r));}
int bf(N *n){return h(n->l)-h(n->r);}

N *rr(N *y){N *x=y->l;y->l=x->r;x->r=y;upH(y);upH(x);return x;}
N *rl(N *x){N *y=x->r;x->r=y->l;y->l=x;upH(x);upH(y);return y;}

N *insert(N *n, int v){
    if(!n)return new N(v);
    if(v<n->v)n->l=insert(n->l,v);
    else if(v>n->v)n->r=insert(n->r,v);
    else return n;
    upH(n); int b=bf(n);
    if(b>1&&v<n->l->v)return rr(n);
    if(b<-1&&v>n->r->v)return rl(n);
    if(b>1){n->l=rl(n->l);return rr(n);}
    if(b<-1){n->r=rr(n->r);return rl(n);}
    return n;
}

int main(){N *r=nullptr;for(int v:{10,20,30,40,50,25})r=insert(r,v);cout<<r->h<<"\\n";}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type N struct { v,h int; l,r *N }

func h(n *N) int { if n==nil{return 0}; return n.h }
func upH(n *N) { n.h=1+max(h(n.l),h(n.r)) }
func bf(n *N) int { return h(n.l)-h(n.r) }
func max(a,b int)int{if a>b{return a};return b}

func rr(y *N)*N{x:=y.l;y.l=x.r;x.r=y;upH(y);upH(x);return x}
func rl(x *N)*N{y:=x.r;x.r=y.l;y.l=x;upH(x);upH(y);return y}

func insert(n *N, v int) *N {
    if n==nil{return &N{v:v,h:1}}
    if v<n.v{n.l=insert(n.l,v)}else if v>n.v{n.r=insert(n.r,v)}else{return n}
    upH(n);b:=bf(n)
    if b>1&&v<n.l.v{return rr(n)}
    if b<-1&&v>n.r.v{return rl(n)}
    if b>1{n.l=rl(n.l);return rr(n)}
    if b<-1{n.r=rr(n.r);return rl(n)}
    return n
}

func main(){var r *N;for _,v:=range[]int{10,20,30,40,50,25}{r=insert(r,v)};fmt.Println(r.h)}`,
      },
      {
        lang: "php",
        code: `<?php
class N { public int $v,$h=1; public ?N $l=null,$r=null; public function __construct(int $v){$this->v=$v;} }

function h(?N $n):int{return $n?$n->h:0;}
function upH(N $n):void{$n->h=1+max(h($n->l),h($n->r));}
function bf(N $n):int{return h($n->l)-h($n->r);}
function rr(N $y):N{$x=$y->l;$y->l=$x->r;$x->r=$y;upH($y);upH($x);return $x;}
function rl(N $x):N{$y=$x->r;$x->r=$y->l;$y->l=$x;upH($x);upH($y);return $y;}

function insert(?N $n,int $v):N{
    if(!$n)return new N($v);
    if($v<$n->v)$n->l=insert($n->l,$v);
    elseif($v>$n->v)$n->r=insert($n->r,$v);
    else return $n;
    upH($n);$b=bf($n);
    if($b>1&&$v<$n->l->v)return rr($n);
    if($b<-1&&$v>$n->r->v)return rl($n);
    if($b>1){$n->l=rl($n->l);return rr($n);}
    if($b<-1){$n->r=rr($n->r);return rl($n);}
    return $n;
}

$r=null;foreach([10,20,30,40,50,25] as $v)$r=insert($r,$v);echo $r->h."\\n";`,
      },
      {
        lang: "kotlin",
        code: `class N(val v:Int,var h:Int=1,var l:N?=null,var r:N?=null)

fun h(n:N?)=n?.h?:0
fun upH(n:N){n.h=1+maxOf(h(n.l),h(n.r))}
fun bf(n:N)=h(n.l)-h(n.r)
fun rr(y:N):N{val x=y.l!!;y.l=x.r;x.r=y;upH(y);upH(x);return x}
fun rl(x:N):N{val y=x.r!!;x.r=y.l;y.l=x;upH(x);upH(y);return y}

fun insert(n:N?,v:Int):N{
    if(n==null)return N(v)
    if(v<n.v)n.l=insert(n.l,v) else if(v>n.v)n.r=insert(n.r,v) else return n
    upH(n);val b=bf(n)
    if(b>1&&v<n.l!!.v)return rr(n)
    if(b<-1&&v>n.r!!.v)return rl(n)
    if(b>1){n.l=rl(n.l!!);return rr(n)}
    if(b<-1){n.r=rr(n.r!!);return rl(n)}
    return n
}

fun main(){var r:N?=null;listOf(10,20,30,40,50,25).forEach{r=insert(r,it)};println(r!!.h)}`,
      },
      {
        lang: "swift",
        code: `class N{var v,h:Int;var l,r:N?;init(_ v:Int){self.v=v;h=1}}
func h(_ n:N?)->Int{n?.h ?? 0}
func upH(_ n:N){n.h=1+max(h(n.l),h(n.r))}
func bf(_ n:N)->Int{h(n.l)-h(n.r)}
func rr(_ y:N)->N{let x=y.l!;y.l=x.r;x.r=y;upH(y);upH(x);return x}
func rl(_ x:N)->N{let y=x.r!;x.r=y.l;y.l=x;upH(x);upH(y);return y}
func insert(_ n:N?,_ v:Int)->N{
    guard let n=n else{return N(v)}
    if v<n.v{n.l=insert(n.l,v)}else if v>n.v{n.r=insert(n.r,v)}else{return n}
    upH(n);let b=bf(n)
    if b>1&&v<n.l!.v{return rr(n)}
    if b<-1&&v>n.r!.v{return rl(n)}
    if b>1{n.l=rl(n.l!);return rr(n)}
    if b<-1{n.r=rr(n.r!);return rl(n)}
    return n
}
var r:N?=nil;[10,20,30,40,50,25].forEach{r=insert(r,$0)};print(r!.h)`,
      },
    ],
  },

  "red-black-tree": {
    id: "red-black-tree",
    name: "Red-Black Tree",
    displayName: { en: "Red-Black Tree", zh: "红黑树" },
    category: "data-structure",
    difficulty: "expert",
    tags: ["tree", "balanced", "red-black", "self-balancing"],
    description: {
      en: "A self-balancing BST with color properties guaranteeing O(log n) worst-case for insert, delete, and search.",
      zh: "带颜色属性的自平衡二叉搜索树，插入、删除、查找最坏情况均为 O(log n)。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 1382, titleSlug: "balance-a-binary-search-tree", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `// Red-Black Tree insertion (simplified, no delete)
const RED = 0, BLACK = 1;

class RBNode {
  constructor(val) {
    this.val = val; this.color = RED;
    this.left = this.right = this.parent = null;
  }
}

class RBTree {
  #nil = Object.assign(new RBNode(0), { color: BLACK });
  #root = this.#nil;

  #rotL(x) {
    const y = x.right; x.right = y.left;
    if (y.left !== this.#nil) y.left.parent = x;
    y.parent = x.parent;
    if (x.parent === this.#nil) this.#root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x; x.parent = y;
  }

  #rotR(x) {
    const y = x.left; x.left = y.right;
    if (y.right !== this.#nil) y.right.parent = x;
    y.parent = x.parent;
    if (x.parent === this.#nil) this.#root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x; x.parent = y;
  }

  #fixInsert(z) {
    while (z.parent.color === RED) {
      if (z.parent === z.parent.parent.left) {
        const y = z.parent.parent.right;
        if (y.color === RED) {
          z.parent.color = BLACK; y.color = BLACK;
          z.parent.parent.color = RED; z = z.parent.parent;
        } else {
          if (z === z.parent.right) { z = z.parent; this.#rotL(z); }
          z.parent.color = BLACK; z.parent.parent.color = RED; this.#rotR(z.parent.parent);
        }
      } else {
        const y = z.parent.parent.left;
        if (y.color === RED) {
          z.parent.color = BLACK; y.color = BLACK;
          z.parent.parent.color = RED; z = z.parent.parent;
        } else {
          if (z === z.parent.left) { z = z.parent; this.#rotR(z); }
          z.parent.color = BLACK; z.parent.parent.color = RED; this.#rotL(z.parent.parent);
        }
      }
    }
    this.#root.color = BLACK;
  }

  insert(val) {
    const z = Object.assign(new RBNode(val), { left: this.#nil, right: this.#nil, parent: this.#nil });
    let y = this.#nil, x = this.#root;
    while (x !== this.#nil) { y = x; x = val < x.val ? x.left : x.right; }
    z.parent = y;
    if (y === this.#nil) this.#root = z;
    else if (val < y.val) y.left = z;
    else y.right = z;
    this.#fixInsert(z);
  }
}

const rbt = new RBTree();
[10,20,30,15,5].forEach(v => rbt.insert(v));
console.log("RBTree built");`,
      },
      {
        lang: "typescript",
        code: `// TypeScript RB Tree uses the same logic; rely on TreeMap/TreeSet in practice
// Java's TreeMap is a well-tested red-black tree implementation
const enum Color { RED, BLACK }

class RBNode {
  color: Color = Color.RED;
  left: RBNode | null = null;
  right: RBNode | null = null;
  parent: RBNode | null = null;
  constructor(public val: number) {}
}

// For production TypeScript, use a library like 'sorted-containers'
// or rely on Map/Set (hash-based) for most use cases.
console.log("Red-Black Tree: see JavaScript implementation for full details");`,
      },
      {
        lang: "java",
        code: `import java.util.TreeMap;

// Java's TreeMap is backed by a Red-Black Tree
TreeMap<Integer, String> rbMap = new TreeMap<>();
rbMap.put(10, "ten"); rbMap.put(5, "five"); rbMap.put(15, "fifteen");
rbMap.put(3, "three"); rbMap.put(7, "seven");

System.out.println(rbMap.firstKey()); // 3
System.out.println(rbMap.lastKey());  // 15
System.out.println(rbMap.floorKey(9)); // 7
System.out.println(rbMap.ceilingKey(8)); // 10`,
      },
      {
        lang: "python",
        code: `# Python's sortedcontainers.SortedList uses a B-tree variant
# For a pure RB-tree, use a library; here's a minimal concept:
from sortedcontainers import SortedList  # pip install sortedcontainers

sl = SortedList([10, 5, 15, 3, 7])
sl.add(12)
print(sl)           # SortedList([3, 5, 7, 10, 12, 15])
print(sl[0])        # 3 (min)
print(sl[-1])       # 15 (max)
sl.remove(7)
print(sl)`,
      },
      {
        lang: "rust",
        code: `use std::collections::BTreeMap;

// Rust's BTreeMap uses a B-tree (similar guarantees to RB-tree)
fn main() {
    let mut map: BTreeMap<i32, &str> = BTreeMap::new();
    map.insert(10, "ten"); map.insert(5, "five"); map.insert(15, "fifteen");
    for (k, v) in &map { println!("{}: {}", k, v); }
    println!("min: {:?}", map.iter().next());
    println!("max: {:?}", map.iter().next_back());
}`,
      },
      {
        lang: "c",
        code: `/* Red-Black Tree in C (abbreviated - insertion only)
 * Full implementation: https://github.com/torvalds/linux/blob/master/lib/rbtree.c
 */
#include <stdio.h>
#include <stdlib.h>

typedef enum { RED, BLACK } Color;
typedef struct Node { int key; Color color; struct Node *left, *right, *parent; } Node;

Node NIL_NODE = {0, BLACK, NULL, NULL, NULL};
Node *NIL = &NIL_NODE;

Node *new_node(int key) {
    Node *n = malloc(sizeof(Node));
    n->key=key; n->color=RED; n->left=n->right=n->parent=NIL;
    return n;
}

// rotations, fixup omitted for brevity - full impl is ~200 lines
int main() {
    printf("RB-Tree: see full implementation reference above\\n");
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <map>
using namespace std;

// std::map is a Red-Black Tree
int main() {
    map<int, string> rbMap;
    rbMap[10]="ten"; rbMap[5]="five"; rbMap[15]="fifteen"; rbMap[3]="three";

    for (auto &[k,v] : rbMap) cout << k << ":" << v << " ";
    cout << "\\n";
    cout << "min=" << rbMap.begin()->first << "\\n";
    cout << "max=" << rbMap.rbegin()->first << "\\n";
    auto it = rbMap.upper_bound(9);
    cout << "first > 9: " << it->first << "\\n"; // 10
    return 0;
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "fmt"
    "sort"
)

// Go has no built-in RB-tree; use btree or sorted slice for ordered map needs
// github.com/google/btree provides a B-tree with similar guarantees

type OrderedMap struct {
    keys []int
    vals map[int]string
}

func NewOrderedMap() *OrderedMap { return &OrderedMap{vals: make(map[int]string)} }
func (m *OrderedMap) Put(k int, v string) {
    if _, ok := m.vals[k]; !ok { m.keys = append(m.keys, k); sort.Ints(m.keys) }
    m.vals[k] = v
}
func (m *OrderedMap) Min() int { return m.keys[0] }
func (m *OrderedMap) Max() int { return m.keys[len(m.keys)-1] }

func main() {
    m := NewOrderedMap()
    for _, k := range []int{10,5,15,3,7} { m.Put(k, fmt.Sprint(k)) }
    fmt.Println("min:", m.Min(), "max:", m.Max())
}`,
      },
      {
        lang: "php",
        code: `<?php
// PHP has no built-in RB-tree; SplMinHeap/SplMaxHeap for heap semantics
// For ordered map use a sorted array approach

class RBTreeProxy {
    private array $data = [];
    public function insert(int $key, mixed $val): void {
        $this->data[$key] = $val;
        ksort($this->data);
    }
    public function min(): int { return array_key_first($this->data); }
    public function max(): int { return array_key_last($this->data); }
    public function get(int $key): mixed { return $this->data[$key] ?? null; }
}

$t = new RBTreeProxy();
foreach([10,5,15,3,7] as $k) $t->insert($k, "v$k");
echo "min: " . $t->min() . " max: " . $t->max() . "\n";`,
      },
      {
        lang: "kotlin",
        code: `import java.util.TreeMap

// Kotlin/JVM: TreeMap is backed by Red-Black Tree
fun main() {
    val rbMap = TreeMap<Int, String>()
    listOf(10 to "ten", 5 to "five", 15 to "fifteen", 3 to "three").forEach { (k,v) -> rbMap[k]=v }
    println(rbMap.firstKey())      // 3
    println(rbMap.lastKey())       // 15
    println(rbMap.floorKey(9))     // 7 (if present) else closest below
    println(rbMap.headMap(10).lastKey()) // largest key < 10
}`,
      },
      {
        lang: "swift",
        code: `// Swift has no built-in RB-tree; use sorted array or a library
// Foundation's NSOrderedSet maintains sorted order via RB-tree internally

struct SortedMap<K: Comparable, V> {
    private var keys: [K] = []
    private var vals: [K: V] = [:]

    mutating func insert(_ key: K, _ val: V) {
        vals[key] = val
        if !keys.contains(key) {
            keys.append(key); keys.sort()
        }
    }
    var min: K? { keys.first }
    var max: K? { keys.last }
    subscript(_ key: K) -> V? { vals[key] }
}

var m = SortedMap<Int, String>()
[10,5,15,3,7].forEach { m.insert($0, "\\($0)") }
print("min:", m.min!, "max:", m.max!)`,
      },
    ],
  },

  "segment-tree": {
    id: "segment-tree",
    name: "Segment Tree",
    displayName: { en: "Segment Tree", zh: "线段树" },
    category: "data-structure",
    difficulty: "advanced",
    tags: ["segment-tree", "range-query", "range-update"],
    description: {
      en: "A tree data structure for storing intervals, enabling range queries and point updates in O(log n).",
      zh: "存储区间信息的树结构，支持 O(log n) 的区间查询和单点更新。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 307, titleSlug: "range-sum-query-mutable", difficulty: "medium" },
      { id: 315, titleSlug: "count-of-smaller-numbers-after-self", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class SegTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(nums, 0, 0, this.n - 1);
  }

  build(nums, node, start, end) {
    if (start === end) { this.tree[node] = nums[start]; return; }
    const mid = (start + end) >> 1;
    this.build(nums, 2*node+1, start, mid);
    this.build(nums, 2*node+2, mid+1, end);
    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
  }

  update(node, start, end, idx, val) {
    if (start === end) { this.tree[node] = val; return; }
    const mid = (start + end) >> 1;
    if (idx <= mid) this.update(2*node+1, start, mid, idx, val);
    else this.update(2*node+2, mid+1, end, idx, val);
    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
  }

  query(node, start, end, l, r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start + end) >> 1;
    return this.query(2*node+1, start, mid, l, r) +
           this.query(2*node+2, mid+1, end, l, r);
  }

  rangeSum(l, r) { return this.query(0, 0, this.n-1, l, r); }
  pointUpdate(i, val) { this.update(0, 0, this.n-1, i, val); }
}

const st = new SegTree([1,3,5,7,9,11]);
console.log(st.rangeSum(1,3)); // 15 (3+5+7)
st.pointUpdate(1, 10);
console.log(st.rangeSum(1,3)); // 22 (10+5+7)`,
      },
      {
        lang: "typescript",
        code: `class SegTree {
  private tree: number[];
  private n: number;

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(nums, 0, 0, this.n - 1);
  }

  private build(nums: number[], node: number, start: number, end: number): void {
    if (start === end) { this.tree[node] = nums[start]; return; }
    const mid = (start + end) >> 1;
    this.build(nums, 2*node+1, start, mid);
    this.build(nums, 2*node+2, mid+1, end);
    this.tree[node] = this.tree[2*node+1] + this.tree[2*node+2];
  }

  private query(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start + end) >> 1;
    return this.query(2*node+1, start, mid, l, r) + this.query(2*node+2, mid+1, end, l, r);
  }

  rangeSum(l: number, r: number): number { return this.query(0, 0, this.n-1, l, r); }
}`,
      },
      {
        lang: "java",
        code: `class SegTree {
    int[] tree; int n;

    SegTree(int[] nums) {
        n = nums.length; tree = new int[4*n];
        build(nums,0,0,n-1);
    }

    void build(int[] a, int node, int s, int e) {
        if(s==e){tree[node]=a[s];return;}
        int m=(s+e)/2;
        build(a,2*node+1,s,m); build(a,2*node+2,m+1,e);
        tree[node]=tree[2*node+1]+tree[2*node+2];
    }

    int query(int node, int s, int e, int l, int r) {
        if(r<s||e<l)return 0;
        if(l<=s&&e<=r)return tree[node];
        int m=(s+e)/2;
        return query(2*node+1,s,m,l,r)+query(2*node+2,m+1,e,l,r);
    }

    void update(int node, int s, int e, int i, int v) {
        if(s==e){tree[node]=v;return;}
        int m=(s+e)/2;
        if(i<=m)update(2*node+1,s,m,i,v); else update(2*node+2,m+1,e,i,v);
        tree[node]=tree[2*node+1]+tree[2*node+2];
    }

    int rangeSum(int l,int r){return query(0,0,n-1,l,r);}
    void pointUpdate(int i,int v){update(0,0,n-1,i,v);}
}`,
      },
      {
        lang: "python",
        code: `class SegTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self._build(nums, 0, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]; return
        mid = (start + end) // 2
        self._build(nums, 2*node+1, start, mid)
        self._build(nums, 2*node+2, mid+1, end)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

    def _query(self, node, start, end, l, r):
        if r < start or end < l: return 0
        if l <= start <= end <= r: return self.tree[node]
        mid = (start + end) // 2
        return self._query(2*node+1, start, mid, l, r) + self._query(2*node+2, mid+1, end, l, r)

    def range_sum(self, l, r): return self._query(0, 0, self.n-1, l, r)

    def update(self, node, start, end, i, v):
        if start == end: self.tree[node] = v; return
        mid = (start + end) // 2
        if i <= mid: self.update(2*node+1, start, mid, i, v)
        else: self.update(2*node+2, mid+1, end, i, v)
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]

st = SegTree([1,3,5,7,9,11])
print(st.range_sum(1,3))  # 15`,
      },
      {
        lang: "rust",
        code: `struct SegTree { tree: Vec<i64>, n: usize }

impl SegTree {
    fn new(nums: &[i64]) -> Self {
        let n = nums.len();
        let mut st = SegTree { tree: vec![0; 4*n], n };
        st.build(nums, 0, 0, n-1); st
    }
    fn build(&mut self, a: &[i64], node: usize, s: usize, e: usize) {
        if s == e { self.tree[node] = a[s]; return; }
        let m = (s+e)/2;
        self.build(a, 2*node+1, s, m); self.build(a, 2*node+2, m+1, e);
        self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2];
    }
    fn query(&self, node: usize, s: usize, e: usize, l: usize, r: usize) -> i64 {
        if r < s || e < l { return 0; }
        if l <= s && e <= r { return self.tree[node]; }
        let m = (s+e)/2;
        self.query(2*node+1, s, m, l, r) + self.query(2*node+2, m+1, e, l, r)
    }
    fn range_sum(&self, l: usize, r: usize) -> i64 { self.query(0, 0, self.n-1, l, r) }
}

fn main() {
    let st = SegTree::new(&[1,3,5,7,9,11]);
    println!("{}", st.range_sum(1,3)); // 15
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 100

int tree[4*MAXN], n;

void build(int *a, int node, int s, int e){
    if(s==e){tree[node]=a[s];return;}
    int m=(s+e)/2;
    build(a,2*node+1,s,m); build(a,2*node+2,m+1,e);
    tree[node]=tree[2*node+1]+tree[2*node+2];
}

int query(int node,int s,int e,int l,int r){
    if(r<s||e<l)return 0;
    if(l<=s&&e<=r)return tree[node];
    int m=(s+e)/2;
    return query(2*node+1,s,m,l,r)+query(2*node+2,m+1,e,l,r);
}

void update(int node,int s,int e,int i,int v){
    if(s==e){tree[node]=v;return;}
    int m=(s+e)/2;
    if(i<=m)update(2*node+1,s,m,i,v);else update(2*node+2,m+1,e,i,v);
    tree[node]=tree[2*node+1]+tree[2*node+2];
}

int main(){
    int a[]={1,3,5,7,9,11}; n=6;
    build(a,0,0,n-1);
    printf("%d\\n",query(0,0,n-1,1,3)); // 15
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

class SegTree {
    vector<int> tree; int n;
    void build(vector<int>&a,int nd,int s,int e){
        if(s==e){tree[nd]=a[s];return;}
        int m=(s+e)/2;
        build(a,2*nd+1,s,m); build(a,2*nd+2,m+1,e);
        tree[nd]=tree[2*nd+1]+tree[2*nd+2];
    }
    int query(int nd,int s,int e,int l,int r){
        if(r<s||e<l)return 0;
        if(l<=s&&e<=r)return tree[nd];
        int m=(s+e)/2;
        return query(2*nd+1,s,m,l,r)+query(2*nd+2,m+1,e,l,r);
    }
public:
    SegTree(vector<int>&a):n(a.size()),tree(4*a.size()){build(a,0,0,n-1);}
    int rangeSum(int l,int r){return query(0,0,n-1,l,r);}
};

int main(){vector<int>a={1,3,5,7,9,11};SegTree st(a);cout<<st.rangeSum(1,3)<<"\\n";}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type SegTree struct { tree []int; n int }

func NewSegTree(nums []int) *SegTree {
    n:=len(nums); st:=&SegTree{make([]int,4*n),n}
    st.build(nums,0,0,n-1); return st
}
func (s *SegTree) build(a []int,nd,l,r int){
    if l==r{s.tree[nd]=a[l];return}
    m:=(l+r)/2;s.build(a,2*nd+1,l,m);s.build(a,2*nd+2,m+1,r)
    s.tree[nd]=s.tree[2*nd+1]+s.tree[2*nd+2]
}
func (s *SegTree) query(nd,l,r,ql,qr int)int{
    if qr<l||r<ql{return 0}
    if ql<=l&&r<=qr{return s.tree[nd]}
    m:=(l+r)/2
    return s.query(2*nd+1,l,m,ql,qr)+s.query(2*nd+2,m+1,r,ql,qr)
}
func (s *SegTree) RangeSum(l,r int)int{return s.query(0,0,s.n-1,l,r)}

func main(){st:=NewSegTree([]int{1,3,5,7,9,11});fmt.Println(st.RangeSum(1,3))}`,
      },
      {
        lang: "php",
        code: `<?php
class SegTree {
    private array $tree; private int $n;
    public function __construct(array $nums) {
        $this->n=count($nums); $this->tree=array_fill(0,4*$this->n,0);
        $this->build($nums,0,0,$this->n-1);
    }
    private function build(array $a,int $nd,int $s,int $e):void{
        if($s==$e){$this->tree[$nd]=$a[$s];return;}
        $m=intdiv($s+$e,2);$this->build($a,2*$nd+1,$s,$m);$this->build($a,2*$nd+2,$m+1,$e);
        $this->tree[$nd]=$this->tree[2*$nd+1]+$this->tree[2*$nd+2];
    }
    private function query(int $nd,int $s,int $e,int $l,int $r):int{
        if($r<$s||$e<$l)return 0;
        if($l<=$s&&$e<=$r)return $this->tree[$nd];
        $m=intdiv($s+$e,2);
        return $this->query(2*$nd+1,$s,$m,$l,$r)+$this->query(2*$nd+2,$m+1,$e,$l,$r);
    }
    public function rangeSum(int $l,int $r):int{return $this->query(0,0,$this->n-1,$l,$r);}
}

$st=new SegTree([1,3,5,7,9,11]);echo $st->rangeSum(1,3)."\\n"; // 15`,
      },
      {
        lang: "kotlin",
        code: `class SegTree(nums: IntArray) {
    val n = nums.size; val tree = IntArray(4*n)
    init { build(nums,0,0,n-1) }
    fun build(a:IntArray,nd:Int,s:Int,e:Int){
        if(s==e){tree[nd]=a[s];return}
        val m=(s+e)/2;build(a,2*nd+1,s,m);build(a,2*nd+2,m+1,e)
        tree[nd]=tree[2*nd+1]+tree[2*nd+2]
    }
    fun query(nd:Int,s:Int,e:Int,l:Int,r:Int):Int{
        if(r<s||e<l)return 0
        if(l<=s&&e<=r)return tree[nd]
        val m=(s+e)/2
        return query(2*nd+1,s,m,l,r)+query(2*nd+2,m+1,e,l,r)
    }
    fun rangeSum(l:Int,r:Int)=query(0,0,n-1,l,r)
}

fun main(){val st=SegTree(intArrayOf(1,3,5,7,9,11));println(st.rangeSum(1,3))}`,
      },
      {
        lang: "swift",
        code: `class SegTree {
    var tree:[Int]; let n:Int
    init(_ nums:[Int]){n=nums.count;tree=Array(repeating:0,count:4*n);build(nums,0,0,n-1)}
    func build(_ a:[Int],_ nd:Int,_ s:Int,_ e:Int){
        if s==e{tree[nd]=a[s];return}
        let m=(s+e)/2;build(a,2*nd+1,s,m);build(a,2*nd+2,m+1,e)
        tree[nd]=tree[2*nd+1]+tree[2*nd+2]
    }
    func query(_ nd:Int,_ s:Int,_ e:Int,_ l:Int,_ r:Int)->Int{
        if r<s||e<l{return 0}
        if l<=s&&e<=r{return tree[nd]}
        let m=(s+e)/2
        return query(2*nd+1,s,m,l,r)+query(2*nd+2,m+1,e,l,r)
    }
    func rangeSum(_ l:Int,_ r:Int)->Int{query(0,0,n-1,l,r)}
}

let st=SegTree([1,3,5,7,9,11]);print(st.rangeSum(1,3))`,
      },
    ],
  },

  "fenwick-tree": {
    id: "fenwick-tree",
    name: "Fenwick Tree",
    displayName: { en: "Fenwick Tree (BIT)", zh: "树状数组（BIT）" },
    category: "data-structure",
    difficulty: "advanced",
    tags: ["fenwick-tree", "bit", "prefix-sum", "range-query"],
    description: {
      en: "A Binary Indexed Tree supporting prefix sum queries and point updates in O(log n) with minimal space overhead.",
      zh: "二叉索引树，支持 O(log n) 前缀和查询和单点更新，空间开销极小。",
    },
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 307, titleSlug: "range-sum-query-mutable", difficulty: "medium" },
      { id: 315, titleSlug: "count-of-smaller-numbers-after-self", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class BIT {
  constructor(n) { this.n = n; this.tree = new Array(n + 1).fill(0); }

  update(i, delta) { // 1-indexed
    for (; i <= this.n; i += i & (-i)) this.tree[i] += delta;
  }

  prefix(i) { // sum [1..i]
    let s = 0;
    for (; i > 0; i -= i & (-i)) s += this.tree[i];
    return s;
  }

  query(l, r) { return this.prefix(r) - this.prefix(l - 1); }
}

const bit = new BIT(6);
[1,3,5,7,9,11].forEach((v,i) => bit.update(i+1, v));
console.log(bit.query(2,4)); // 15 (3+5+7)
bit.update(2, 7); // add 7 to index 2 -> becomes 10
console.log(bit.query(2,4)); // 22`,
      },
      {
        lang: "typescript",
        code: `class BIT {
  private tree: number[];
  constructor(private n: number) { this.tree = new Array(n+1).fill(0); }

  update(i: number, delta: number): void {
    for (; i <= this.n; i += i & -i) this.tree[i] += delta;
  }

  prefix(i: number): number {
    let s = 0;
    for (; i > 0; i -= i & -i) s += this.tree[i];
    return s;
  }

  query(l: number, r: number): number { return this.prefix(r) - this.prefix(l-1); }
}`,
      },
      {
        lang: "java",
        code: `class BIT {
    int[] tree; int n;
    BIT(int n){this.n=n;tree=new int[n+1];}
    void update(int i,int d){for(;i<=n;i+=i&(-i))tree[i]+=d;}
    int prefix(int i){int s=0;for(;i>0;i-=i&(-i))s+=tree[i];return s;}
    int query(int l,int r){return prefix(r)-prefix(l-1);}
    public static void main(String[]a){
        BIT b=new BIT(6); int[]arr={1,3,5,7,9,11};
        for(int i=0;i<6;i++)b.update(i+1,arr[i]);
        System.out.println(b.query(2,4)); // 15
    }
}`,
      },
      {
        lang: "python",
        code: `class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):  # 1-indexed
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def prefix(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

    def query(self, l, r):
        return self.prefix(r) - self.prefix(l - 1)

bit = BIT(6)
for i, v in enumerate([1,3,5,7,9,11], 1): bit.update(i, v)
print(bit.query(2, 4))  # 15`,
      },
      {
        lang: "rust",
        code: `struct BIT { tree: Vec<i64>, n: usize }

impl BIT {
    fn new(n: usize) -> Self { BIT { tree: vec![0; n+1], n } }
    fn update(&mut self, mut i: usize, delta: i64) {
        while i <= self.n { self.tree[i] += delta; i += i & i.wrapping_neg(); }
    }
    fn prefix(&self, mut i: usize) -> i64 {
        let mut s = 0;
        while i > 0 { s += self.tree[i]; i -= i & i.wrapping_neg(); }
        s
    }
    fn query(&self, l: usize, r: usize) -> i64 { self.prefix(r) - self.prefix(l-1) }
}

fn main() {
    let mut bit = BIT::new(6);
    for (i, &v) in [1i64,3,5,7,9,11].iter().enumerate() { bit.update(i+1, v); }
    println!("{}", bit.query(2, 4)); // 15
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 105

int tree[MAXN], n=6;

void update(int i,int d){for(;i<=n;i+=i&(-i))tree[i]+=d;}
int prefix(int i){int s=0;for(;i>0;i-=i&(-i))s+=tree[i];return s;}
int query(int l,int r){return prefix(r)-prefix(l-1);}

int main(){
    int a[]={1,3,5,7,9,11};
    for(int i=0;i<6;i++)update(i+1,a[i]);
    printf("%d\\n",query(2,4)); // 15
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <vector>
using namespace std;

class BIT {
    vector<int> tree; int n;
public:
    BIT(int n):n(n),tree(n+1,0){}
    void update(int i,int d){for(;i<=n;i+=i&-i)tree[i]+=d;}
    int prefix(int i){int s=0;for(;i>0;i-=i&-i)s+=tree[i];return s;}
    int query(int l,int r){return prefix(r)-prefix(l-1);}
};

int main(){
    BIT bit(6); int a[]={1,3,5,7,9,11};
    for(int i=0;i<6;i++)bit.update(i+1,a[i]);
    cout<<bit.query(2,4)<<"\\n"; // 15
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type BIT struct { tree []int; n int }

func NewBIT(n int)*BIT{return &BIT{make([]int,n+1),n}}
func (b *BIT)Update(i,d int){for;i<=b.n;i+=i&(-i){b.tree[i]+=d}}
func (b *BIT)Prefix(i int)int{s:=0;for;i>0;i-=i&(-i){s+=b.tree[i]};return s}
func (b *BIT)Query(l,r int)int{return b.Prefix(r)-b.Prefix(l-1)}

func main(){
    bit:=NewBIT(6)
    for i,v:=range[]int{1,3,5,7,9,11}{bit.Update(i+1,v)}
    fmt.Println(bit.Query(2,4)) // 15
}`,
      },
      {
        lang: "php",
        code: `<?php
class BIT {
    private array $tree; private int $n;
    public function __construct(int $n){$this->n=$n;$this->tree=array_fill(0,$n+1,0);}
    public function update(int $i,int $d):void{for(;$i<=$this->n;$i+=$i&(-$i))$this->tree[$i]+=$d;}
    public function prefix(int $i):int{$s=0;for(;$i>0;$i-=$i&(-$i))$s+=$this->tree[$i];return $s;}
    public function query(int $l,int $r):int{return $this->prefix($r)-$this->prefix($l-1);}
}

$bit=new BIT(6);foreach([1,3,5,7,9,11] as $i=>$v)$bit->update($i+1,$v);
echo $bit->query(2,4)."\\n"; // 15`,
      },
      {
        lang: "kotlin",
        code: `class BIT(val n:Int){val tree=IntArray(n+1)
    fun update(i:Int,d:Int){var x=i;while(x<=n){tree[x]+=d;x+=x and(-x)}}
    fun prefix(i:Int):Int{var x=i;var s=0;while(x>0){s+=tree[x];x-=x and(-x)};return s}
    fun query(l:Int,r:Int)=prefix(r)-prefix(l-1)
}
fun main(){val b=BIT(6);intArrayOf(1,3,5,7,9,11).forEachIndexed{i,v->b.update(i+1,v)};println(b.query(2,4))}`,
      },
      {
        lang: "swift",
        code: `class BIT {
    var tree:[Int]; let n:Int
    init(_ n:Int){self.n=n;tree=Array(repeating:0,count:n+1)}
    func update(_ i:Int,_ d:Int){var x=i;while x<=n{tree[x]+=d;x+=x & (-x)}}
    func prefix(_ i:Int)->Int{var x=i;var s=0;while x>0{s+=tree[x];x-=x & (-x)};return s}
    func query(_ l:Int,_ r:Int)->Int{prefix(r)-prefix(l-1)}
}

let bit=BIT(6);[1,3,5,7,9,11].enumerated().forEach{bit.update($0.offset+1,$0.element)}
print(bit.query(2,4))`,
      },
    ],
  },

  trie: {
    id: "trie",
    name: "Trie",
    displayName: { en: "Trie (Prefix Tree)", zh: "字典树（前缀树）" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["trie", "prefix-tree", "string", "search"],
    description: {
      en: "A tree-like structure for storing strings where each node represents a character, enabling O(m) insert and search (m = key length).",
      zh: "存储字符串的树形结构，每个节点代表一个字符，插入和查询时间为 O(m)（m 为键长度）。",
    },
    timeComplexity: { best: "O(m)", average: "O(m)", worst: "O(m)" },
    spaceComplexity: "O(n*m)",
    relatedProblems: [
      { id: 208, titleSlug: "implement-trie-prefix-tree", difficulty: "medium" },
      { id: 211, titleSlug: "design-add-and-search-words-data-structure", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}

const t = new Trie();
t.insert("apple"); t.insert("app");
console.log(t.search("app"));      // true
console.log(t.search("appl"));     // false
console.log(t.startsWith("appl")); // true`,
      },
      {
        lang: "typescript",
        code: `class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd = false;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isEnd;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }
}`,
      },
      {
        lang: "java",
        code: `class Trie {
    private static class Node { Node[] ch=new Node[26]; boolean end; }
    private final Node root = new Node();

    public void insert(String w) {
        Node n=root;
        for(char c:w.toCharArray()){int i=c-'a';if(n.ch[i]==null)n.ch[i]=new Node();n=n.ch[i];}
        n.end=true;
    }
    public boolean search(String w) {
        Node n=root;
        for(char c:w.toCharArray()){int i=c-'a';if(n.ch[i]==null)return false;n=n.ch[i];}
        return n.end;
    }
    public boolean startsWith(String p) {
        Node n=root;
        for(char c:p.toCharArray()){int i=c-'a';if(n.ch[i]==null)return false;n=n.ch[i];}
        return true;
    }
}`,
      },
      {
        lang: "python",
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self): self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self.root
        for ch in word:
            if ch not in node.children: return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix: str) -> bool:
        node = self.root
        for ch in prefix:
            if ch not in node.children: return False
            node = node.children[ch]
        return True

t = Trie()
t.insert("apple"); t.insert("app")
print(t.search("app"))       # True
print(t.starts_with("appl")) # True`,
      },
      {
        lang: "rust",
        code: `use std::collections::HashMap;

#[derive(Default)]
struct TrieNode { children: HashMap<char, TrieNode>, is_end: bool }

#[derive(Default)]
struct Trie { root: TrieNode }

impl Trie {
    fn insert(&mut self, word: &str) {
        let mut node = &mut self.root;
        for ch in word.chars() { node = node.children.entry(ch).or_default(); }
        node.is_end = true;
    }
    fn search(&self, word: &str) -> bool {
        let mut node = &self.root;
        for ch in word.chars() {
            match node.children.get(&ch) { None => return false, Some(n) => node = n }
        }
        node.is_end
    }
    fn starts_with(&self, prefix: &str) -> bool {
        let mut node = &self.root;
        for ch in prefix.chars() {
            match node.children.get(&ch) { None => return false, Some(n) => node = n }
        }
        true
    }
}

fn main() {
    let mut t = Trie::default();
    t.insert("apple"); t.insert("app");
    println!("{}", t.search("app"));       // true
    println!("{}", t.starts_with("appl")); // true
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node { struct Node *ch[26]; int end; } Node;

Node *new_node(){return calloc(1,sizeof(Node));}

void insert(Node *root,const char *w){
    for(;*w;w++){int i=*w-'a';if(!root->ch[i])root->ch[i]=new_node();root=root->ch[i];}
    root->end=1;
}

int search(Node *root,const char *w){
    for(;*w;w++){int i=*w-'a';if(!root->ch[i])return 0;root=root->ch[i];}
    return root->end;
}

int starts_with(Node *root,const char *p){
    for(;*p;p++){int i=*p-'a';if(!root->ch[i])return 0;root=root->ch[i];}
    return 1;
}

int main(){
    Node *root=new_node();
    insert(root,"apple"); insert(root,"app");
    printf("%d\\n",search(root,"app"));      // 1
    printf("%d\\n",starts_with(root,"appl")); // 1
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <unordered_map>
using namespace std;

struct TrieNode { unordered_map<char,TrieNode*> ch; bool end=false; };

class Trie {
    TrieNode *root=new TrieNode();
public:
    void insert(string w){TrieNode *n=root;for(char c:w){if(!n->ch[c])n->ch[c]=new TrieNode();n=n->ch[c];}n->end=true;}
    bool search(string w){TrieNode *n=root;for(char c:w){if(!n->ch[c])return false;n=n->ch[c];}return n->end;}
    bool startsWith(string p){TrieNode *n=root;for(char c:p){if(!n->ch[c])return false;n=n->ch[c];}return true;}
};

int main(){
    Trie t; t.insert("apple"); t.insert("app");
    cout<<t.search("app")<<"\\n";      // 1
    cout<<t.startsWith("appl")<<"\\n"; // 1
}`,
      },
      {
        lang: "go",
        code: `package main

import "fmt"

type TrieNode struct { children map[rune]*TrieNode; isEnd bool }

func newNode()*TrieNode{return &TrieNode{children:make(map[rune]*TrieNode)}}

type Trie struct{root *TrieNode}
func NewTrie()*Trie{return &Trie{newNode()}}

func (t *Trie)Insert(w string){n:=t.root;for _,c:=range w{if n.children[c]==nil{n.children[c]=newNode()};n=n.children[c]};n.isEnd=true}
func (t *Trie)Search(w string)bool{n:=t.root;for _,c:=range w{if n.children[c]==nil{return false};n=n.children[c]};return n.isEnd}
func (t *Trie)StartsWith(p string)bool{n:=t.root;for _,c:=range p{if n.children[c]==nil{return false};n=n.children[c]};return true}

func main(){
    t:=NewTrie();t.Insert("apple");t.Insert("app")
    fmt.Println(t.Search("app"),t.StartsWith("appl"))
}`,
      },
      {
        lang: "php",
        code: `<?php
class TrieNode{public array $ch=[];public bool $end=false;}

class Trie{
    private TrieNode $root;
    public function __construct(){$this->root=new TrieNode();}
    public function insert(string $w):void{$n=$this->root;foreach(str_split($w) as $c){if(!isset($n->ch[$c]))$n->ch[$c]=new TrieNode();$n=$n->ch[$c];}$n->end=true;}
    public function search(string $w):bool{$n=$this->root;foreach(str_split($w) as $c){if(!isset($n->ch[$c]))return false;$n=$n->ch[$c];}return $n->end;}
    public function startsWith(string $p):bool{$n=$this->root;foreach(str_split($p) as $c){if(!isset($n->ch[$c]))return false;$n=$n->ch[$c];}return true;}
}

$t=new Trie();$t->insert("apple");$t->insert("app");
var_dump($t->search("app"),$t->startsWith("appl"));`,
      },
      {
        lang: "kotlin",
        code: `class TrieNode{val ch=HashMap<Char,TrieNode>();var end=false}

class Trie{
    val root=TrieNode()
    fun insert(w:String){var n=root;for(c in w){n=n.ch.getOrPut(c){TrieNode()}};n.end=true}
    fun search(w:String):Boolean{var n=root;for(c in w){n=n.ch[c]?:return false};return n.end}
    fun startsWith(p:String):Boolean{var n=root;for(c in p){n=n.ch[c]?:return false};return true}
}

fun main(){val t=Trie();t.insert("apple");t.insert("app");println(t.search("app"));println(t.startsWith("appl"))}`,
      },
      {
        lang: "swift",
        code: `class TrieNode{var ch=[Character:TrieNode]();var isEnd=false}

class Trie{
    let root=TrieNode()
    func insert(_ w:String){var n=root;for c in w{if n.ch[c]==nil{n.ch[c]=TrieNode()};n=n.ch[c]!};n.isEnd=true}
    func search(_ w:String)->Bool{var n=root;for c in w{guard let next=n.ch[c] else{return false};n=next};return n.isEnd}
    func startsWith(_ p:String)->Bool{var n=root;for c in p{guard let next=n.ch[c] else{return false};n=next};return true}
}

let t=Trie();t.insert("apple");t.insert("app")
print(t.search("app"),t.startsWith("appl"))`,
      },
    ],
  },

  "heap-min": {
    id: "heap-min",
    name: "Min-Heap",
    displayName: { en: "Min-Heap", zh: "最小堆" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["heap", "min-heap", "priority", "tree"],
    description: {
      en: "A complete binary tree where every parent node is smaller than its children, enabling O(1) min access and O(log n) insert/extract.",
      zh: "每个父节点都小于其子节点的完全二叉树，最小值访问为 O(1)，插入和提取为 O(log n)。",
    },
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 215, titleSlug: "kth-largest-element-in-an-array", difficulty: "medium" },
      { id: 347, titleSlug: "top-k-frequent-elements", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class MinHeap {
  #data = [];

  get size() { return this.#data.length; }
  peek() { return this.#data[0]; }

  push(val) {
    this.#data.push(val);
    this.#bubbleUp(this.#data.length - 1);
  }

  pop() {
    if (this.size === 0) return undefined;
    const min = this.#data[0];
    const last = this.#data.pop();
    if (this.size > 0) { this.#data[0] = last; this.#siftDown(0); }
    return min;
  }

  #bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.#data[p] <= this.#data[i]) break;
      [this.#data[p], this.#data[i]] = [this.#data[i], this.#data[p]];
      i = p;
    }
  }

  #siftDown(i) {
    const n = this.size;
    while (true) {
      let min = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.#data[l] < this.#data[min]) min = l;
      if (r < n && this.#data[r] < this.#data[min]) min = r;
      if (min === i) break;
      [this.#data[min], this.#data[i]] = [this.#data[i], this.#data[min]];
      i = min;
    }
  }
}

const h = new MinHeap();
[5,3,8,1,4].forEach(v => h.push(v));
console.log(h.pop()); // 1
console.log(h.pop()); // 3`,
      },
      {
        lang: "typescript",
        code: `class MinHeap {
  private data: number[] = [];

  get size(): number { return this.data.length; }
  peek(): number | undefined { return this.data[0]; }

  push(val: number): void {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (!this.size) return undefined;
    const min = this.data[0];
    const last = this.data.pop()!;
    if (this.size) { this.data[0] = last; this.siftDown(0); }
    return min;
  }

  private bubbleUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.size;
    while (true) {
      let m = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.data[l] < this.data[m]) m = l;
      if (r < n && this.data[r] < this.data[m]) m = r;
      if (m === i) break;
      [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
      i = m;
    }
  }
}`,
      },
      {
        lang: "java",
        code: `import java.util.PriorityQueue;

PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int v : new int[]{5,3,8,1,4}) minHeap.offer(v);
System.out.println(minHeap.peek()); // 1
System.out.println(minHeap.poll()); // 1
System.out.println(minHeap.poll()); // 3`,
      },
      {
        lang: "python",
        code: `import heapq

heap = []
for v in [5, 3, 8, 1, 4]:
    heapq.heappush(heap, v)

print(heap[0])           # peek: 1
print(heapq.heappop(heap))  # 1
print(heapq.heappop(heap))  # 3`,
      },
      {
        lang: "rust",
        code: `use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn main() {
    // Wrap in Reverse for min-heap
    let mut heap = BinaryHeap::new();
    for v in [5,3,8,1,4] { heap.push(Reverse(v)); }
    println!("{:?}", heap.peek()); // Some(Reverse(1))
    println!("{:?}", heap.pop());  // Some(Reverse(1))
    println!("{:?}", heap.pop());  // Some(Reverse(3))
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAXN 100

int heap[MAXN], sz=0;

void push(int v){
    heap[sz++]=v;
    int i=sz-1;
    while(i>0){int p=(i-1)/2;if(heap[p]<=heap[i])break;int t=heap[p];heap[p]=heap[i];heap[i]=t;i=p;}
}

int pop(){
    int min=heap[0]; heap[0]=heap[--sz];
    int i=0;
    while(1){int l=2*i+1,r=2*i+2,m=i;
        if(l<sz&&heap[l]<heap[m])m=l;
        if(r<sz&&heap[r]<heap[m])m=r;
        if(m==i)break; int t=heap[m];heap[m]=heap[i];heap[i]=t; i=m;
    }
    return min;
}

int main(){for(int v:5,3,8,1,4) push(v); // push each
    int a[]={5,3,8,1,4}; for(int i=0;i<5;i++)push(a[i]);
    printf("%d\\n",pop()); // 1
    printf("%d\\n",pop()); // 3
    return 0;
}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main(){
    // min-heap via greater<int>
    priority_queue<int,vector<int>,greater<int>> pq;
    for(int v:{5,3,8,1,4}) pq.push(v);
    cout << pq.top() << "\\n"; // 1
    pq.pop();
    cout << pq.top() << "\\n"; // 3
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/heap"
    "fmt"
)

type MinHeap []int
func (h MinHeap) Len()int{return len(h)}
func (h MinHeap) Less(i,j int)bool{return h[i]<h[j]}
func (h MinHeap) Swap(i,j int){h[i],h[j]=h[j],h[i]}
func (h *MinHeap) Push(x any){*h=append(*h,x.(int))}
func (h *MinHeap) Pop()any{old:=*h;n:=len(old);x:=old[n-1];*h=old[:n-1];return x}

func main(){
    h:=&MinHeap{5,3,8,1,4}; heap.Init(h)
    fmt.Println(heap.Pop(h)) // 1
    fmt.Println(heap.Pop(h)) // 3
}`,
      },
      {
        lang: "php",
        code: `<?php
class MinHeap extends SplMinHeap {
    protected function compare(mixed $v1, mixed $v2): int { return $v2 <=> $v1; }
}

$h = new SplMinHeap();
foreach([5,3,8,1,4] as $v) $h->insert($v);
echo $h->top() . "\\n";    // 1
echo $h->extract() . "\\n"; // 1
echo $h->extract() . "\\n"; // 3`,
      },
      {
        lang: "kotlin",
        code: `import java.util.PriorityQueue

fun main(){
    val minHeap=PriorityQueue<Int>()
    listOf(5,3,8,1,4).forEach{minHeap.offer(it)}
    println(minHeap.peek()) // 1
    println(minHeap.poll()) // 1
    println(minHeap.poll()) // 3
}`,
      },
      {
        lang: "swift",
        code: `struct MinHeap {
    private var data: [Int] = []

    mutating func push(_ v: Int) {
        data.append(v)
        var i = data.count - 1
        while i > 0 { let p=(i-1)/2; if data[p]<=data[i]{break}; data.swapAt(p,i); i=p }
    }

    mutating func pop() -> Int? {
        guard !data.isEmpty else { return nil }
        let min = data[0]; data[0] = data.removeLast()
        if data.isEmpty { return min }
        var i = 0
        while true {
            var m=i,l=2*i+1,r=2*i+2
            if l<data.count&&data[l]<data[m]{m=l}
            if r<data.count&&data[r]<data[m]{m=r}
            if m==i{break}; data.swapAt(m,i); i=m
        }
        return min
    }
    var peek: Int? { data.first }
}

var h = MinHeap()
[5,3,8,1,4].forEach { h.push($0) }
print(h.pop()!) // 1
print(h.pop()!) // 3`,
      },
    ],
  },

  "heap-max": {
    id: "heap-max",
    name: "Max-Heap",
    displayName: { en: "Max-Heap", zh: "最大堆" },
    category: "data-structure",
    difficulty: "intermediate",
    tags: ["heap", "max-heap", "priority", "tree"],
    description: {
      en: "A complete binary tree where every parent node is larger than its children, enabling O(1) max access and O(log n) insert/extract.",
      zh: "每个父节点都大于其子节点的完全二叉树，最大值访问为 O(1)，插入和提取为 O(log n)。",
    },
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [
      { id: 215, titleSlug: "kth-largest-element-in-an-array", difficulty: "medium" },
      { id: 239, titleSlug: "sliding-window-maximum", difficulty: "hard" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `class MaxHeap {
  #data = [];
  get size() { return this.#data.length; }
  peek() { return this.#data[0]; }

  push(val) {
    this.#data.push(val);
    let i = this.#data.length - 1;
    while (i > 0) {
      const p = (i-1) >> 1;
      if (this.#data[p] >= this.#data[i]) break;
      [this.#data[p], this.#data[i]] = [this.#data[i], this.#data[p]];
      i = p;
    }
  }

  pop() {
    if (!this.size) return undefined;
    const max = this.#data[0];
    const last = this.#data.pop();
    if (this.size) {
      this.#data[0] = last;
      let i = 0;
      while (true) {
        let m = i, l = 2*i+1, r = 2*i+2;
        if (l < this.size && this.#data[l] > this.#data[m]) m = l;
        if (r < this.size && this.#data[r] > this.#data[m]) m = r;
        if (m === i) break;
        [this.#data[m], this.#data[i]] = [this.#data[i], this.#data[m]];
        i = m;
      }
    }
    return max;
  }
}

const h = new MaxHeap();
[5,3,8,1,4].forEach(v => h.push(v));
console.log(h.pop()); // 8
console.log(h.pop()); // 5`,
      },
      {
        lang: "typescript",
        code: `class MaxHeap {
  private data: number[] = [];
  get size(): number { return this.data.length; }
  peek(): number | undefined { return this.data[0]; }

  push(val: number): void {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i-1) >> 1;
      if (this.data[p] >= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  pop(): number | undefined {
    if (!this.size) return undefined;
    const max = this.data[0];
    const last = this.data.pop()!;
    if (this.size) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let m=i, l=2*i+1, r=2*i+2;
        if (l < this.size && this.data[l] > this.data[m]) m = l;
        if (r < this.size && this.data[r] > this.data[m]) m = r;
        if (m === i) break;
        [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
        i = m;
      }
    }
    return max;
  }
}`,
      },
      {
        lang: "java",
        code: `import java.util.PriorityQueue;
import java.util.Collections;

PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
for (int v : new int[]{5,3,8,1,4}) maxHeap.offer(v);
System.out.println(maxHeap.peek()); // 8
System.out.println(maxHeap.poll()); // 8
System.out.println(maxHeap.poll()); // 5`,
      },
      {
        lang: "python",
        code: `import heapq

# Python only has min-heap; negate for max-heap
nums = [5, 3, 8, 1, 4]
heap = [-v for v in nums]
heapq.heapify(heap)

print(-heap[0])              # peek: 8
print(-heapq.heappop(heap))  # 8
print(-heapq.heappop(heap))  # 5`,
      },
      {
        lang: "rust",
        code: `use std::collections::BinaryHeap;

fn main() {
    // BinaryHeap is a max-heap by default
    let mut heap = BinaryHeap::from([5,3,8,1,4]);
    println!("{:?}", heap.peek()); // Some(8)
    println!("{:?}", heap.pop());  // Some(8)
    println!("{:?}", heap.pop());  // Some(5)
}`,
      },
      {
        lang: "c",
        code: `#include <stdio.h>
#define MAX 100

int heap[MAX], sz=0;

void push(int v){
    heap[sz++]=v;
    int i=sz-1;
    while(i>0){int p=(i-1)/2;if(heap[p]>=heap[i])break;int t=heap[p];heap[p]=heap[i];heap[i]=t;i=p;}
}

int pop(){
    int max=heap[0]; heap[0]=heap[--sz];
    int i=0;
    while(1){int l=2*i+1,r=2*i+2,m=i;
        if(l<sz&&heap[l]>heap[m])m=l;
        if(r<sz&&heap[r]>heap[m])m=r;
        if(m==i)break;int t=heap[m];heap[m]=heap[i];heap[i]=t;i=m;}
    return max;
}

int main(){int a[]={5,3,8,1,4};for(int i=0;i<5;i++)push(a[i]);printf("%d\\n%d\\n",pop(),pop());}`,
      },
      {
        lang: "cpp",
        code: `#include <iostream>
#include <queue>
using namespace std;

int main(){
    priority_queue<int> pq; // max-heap by default
    for(int v:{5,3,8,1,4}) pq.push(v);
    cout<<pq.top()<<"\\n"; pq.pop(); // 8
    cout<<pq.top()<<"\\n";           // 5
}`,
      },
      {
        lang: "go",
        code: `package main

import (
    "container/heap"
    "fmt"
)

type MaxHeap []int
func (h MaxHeap) Len()int{return len(h)}
func (h MaxHeap) Less(i,j int)bool{return h[i]>h[j]} // reversed for max
func (h MaxHeap) Swap(i,j int){h[i],h[j]=h[j],h[i]}
func (h *MaxHeap) Push(x any){*h=append(*h,x.(int))}
func (h *MaxHeap) Pop()any{old:=*h;n:=len(old);x:=old[n-1];*h=old[:n-1];return x}

func main(){
    h:=&MaxHeap{5,3,8,1,4}; heap.Init(h)
    fmt.Println(heap.Pop(h)) // 8
    fmt.Println(heap.Pop(h)) // 5
}`,
      },
      {
        lang: "php",
        code: `<?php
$heap = new SplMaxHeap();
foreach([5,3,8,1,4] as $v) $heap->insert($v);
echo $heap->top() . "\\n";    // 8
echo $heap->extract() . "\\n"; // 8
echo $heap->extract() . "\\n"; // 5`,
      },
      {
        lang: "kotlin",
        code: `import java.util.PriorityQueue
import java.util.Collections

fun main(){
    val maxHeap=PriorityQueue<Int>(Collections.reverseOrder())
    listOf(5,3,8,1,4).forEach{maxHeap.offer(it)}
    println(maxHeap.peek()) // 8
    println(maxHeap.poll()) // 8
    println(maxHeap.poll()) // 5
}`,
      },
      {
        lang: "swift",
        code: `struct MaxHeap {
    private var data: [Int] = []

    mutating func push(_ v: Int) {
        data.append(v)
        var i = data.count - 1
        while i > 0 { let p=(i-1)/2; if data[p]>=data[i]{break}; data.swapAt(p,i); i=p }
    }

    mutating func pop() -> Int? {
        guard !data.isEmpty else { return nil }
        let max = data[0]; data[0] = data.removeLast()
        if data.isEmpty { return max }
        var i = 0
        while true {
            var m=i,l=2*i+1,r=2*i+2
            if l<data.count&&data[l]>data[m]{m=l}
            if r<data.count&&data[r]>data[m]{m=r}
            if m==i{break}; data.swapAt(m,i); i=m
        }
        return max
    }
    var peek: Int? { data.first }
}

var h = MaxHeap()
[5,3,8,1,4].forEach { h.push($0) }
print(h.pop()!) // 8
print(h.pop()!) // 5`,
      },
    ],
  },
}
