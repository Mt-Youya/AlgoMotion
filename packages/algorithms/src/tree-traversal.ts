import type { AlgorithmMeta, AlgorithmRun, TreeAlgorithmId } from "@algomotion/shared"
import { ArrayTraceRecorder } from "./recorder"

// ─── Metadata ────────────────────────────────────────────────────────────────

export const treeAlgorithms: Record<string, AlgorithmMeta> = {
  "tree-inorder": {
    id: "tree-inorder",
    name: "Binary Tree Inorder Traversal",
    displayName: { en: "Inorder Traversal", zh: "中序遍历" },
    category: "tree",
    difficulty: "beginner",
    tags: ["tree", "dfs", "recursion", "stack"],
    description: {
      en: "Traverse a binary tree in left-root-right order.",
      zh: "按照左-根-右的顺序遍历二叉树（中序遍历）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    relatedProblems: [
      { id: 94, titleSlug: "binary-tree-inorder-traversal", difficulty: "easy" },
      { id: 98, titleSlug: "validate-binary-search-tree", difficulty: "medium" },
    ],
    snippets: [
      {
        lang: "javascript",
        code: `function inorder(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function inorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null): void {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "python",
        code: `def inorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result`,
      },
      {
        lang: "java",
        code: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, result);
    return result;
}

private void dfs(TreeNode node, List<Integer> result) {
    if (node == null) return;
    dfs(node.left, result);
    result.add(node.val);
    dfs(node.right, result);
}`,
      },
      {
        lang: "rust",
        code: `fn inorder(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut result = Vec::new();
    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, result: &mut Vec<i32>) {
        if let Some(n) = node {
            let n = n.borrow();
            dfs(n.left.clone(), result);
            result.push(n.val);
            dfs(n.right.clone(), result);
        }
    }
    dfs(root, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void dfs(struct TreeNode *node, int *result, int *idx) {
    if (!node) return;
    dfs(node->left, result, idx);
    result[(*idx)++] = node->val;
    dfs(node->right, result, idx);
}

int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    int *result = malloc(100 * sizeof(int));
    *returnSize = 0;
    dfs(root, result, returnSize);
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> inorderTraversal(TreeNode* root) {
    vector<int> result;
    function<void(TreeNode*)> dfs = [&](TreeNode* node) {
        if (!node) return;
        dfs(node->left);
        result.push_back(node->val);
        dfs(node->right);
    };
    dfs(root);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func inorderTraversal(root *TreeNode) []int {
    result := []int{}
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil { return }
        dfs(node.Left)
        result = append(result, node.Val)
        dfs(node.Right)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "php",
        code: `function inorderTraversal(?TreeNode $root): array {
    $result = [];
    $dfs = function(?TreeNode $node) use (&$result, &$dfs): void {
        if ($node === null) return;
        $dfs($node->left);
        $result[] = $node->val;
        $dfs($node->right);
    };
    $dfs($root);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun inorderTraversal(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    fun dfs(node: TreeNode?) {
        node ?: return
        dfs(node.left)
        result.add(node.value)
        dfs(node.right)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func inorderTraversal(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    func dfs(_ node: TreeNode?) {
        guard let node = node else { return }
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    }
    dfs(root)
    return result
}`,
      },
    ],
  },

  "tree-preorder": {
    id: "tree-preorder",
    name: "Binary Tree Preorder Traversal",
    displayName: { en: "Preorder Traversal", zh: "前序遍历" },
    category: "tree",
    difficulty: "beginner",
    tags: ["tree", "dfs", "recursion", "stack"],
    description: {
      en: "Traverse a binary tree in root-left-right order.",
      zh: "按照根-左-右的顺序遍历二叉树（前序遍历）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    relatedProblems: [{ id: 144, titleSlug: "binary-tree-preorder-traversal", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function preorder(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function preorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null): void {
    if (!node) return;
    result.push(node.val);
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "python",
        code: `def preorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result`,
      },
      {
        lang: "java",
        code: `public List<Integer> preorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, result);
    return result;
}

private void dfs(TreeNode node, List<Integer> result) {
    if (node == null) return;
    result.add(node.val);
    dfs(node.left, result);
    dfs(node.right, result);
}`,
      },
      {
        lang: "rust",
        code: `fn preorder(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut result = Vec::new();
    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, result: &mut Vec<i32>) {
        if let Some(n) = node {
            let n = n.borrow();
            result.push(n.val);
            dfs(n.left.clone(), result);
            dfs(n.right.clone(), result);
        }
    }
    dfs(root, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void dfs(struct TreeNode *node, int *result, int *idx) {
    if (!node) return;
    result[(*idx)++] = node->val;
    dfs(node->left, result, idx);
    dfs(node->right, result, idx);
}

int* preorderTraversal(struct TreeNode* root, int* returnSize) {
    int *result = malloc(100 * sizeof(int));
    *returnSize = 0;
    dfs(root, result, returnSize);
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> preorderTraversal(TreeNode* root) {
    vector<int> result;
    function<void(TreeNode*)> dfs = [&](TreeNode* node) {
        if (!node) return;
        result.push_back(node->val);
        dfs(node->left);
        dfs(node->right);
    };
    dfs(root);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func preorderTraversal(root *TreeNode) []int {
    result := []int{}
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil { return }
        result = append(result, node.Val)
        dfs(node.Left)
        dfs(node.Right)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "php",
        code: `function preorderTraversal(?TreeNode $root): array {
    $result = [];
    $dfs = function(?TreeNode $node) use (&$result, &$dfs): void {
        if ($node === null) return;
        $result[] = $node->val;
        $dfs($node->left);
        $dfs($node->right);
    };
    $dfs($root);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun preorderTraversal(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    fun dfs(node: TreeNode?) {
        node ?: return
        result.add(node.value)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func preorderTraversal(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    func dfs(_ node: TreeNode?) {
        guard let node = node else { return }
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    }
    dfs(root)
    return result
}`,
      },
    ],
  },

  "tree-postorder": {
    id: "tree-postorder",
    name: "Binary Tree Postorder Traversal",
    displayName: { en: "Postorder Traversal", zh: "后序遍历" },
    category: "tree",
    difficulty: "beginner",
    tags: ["tree", "dfs", "recursion", "stack"],
    description: {
      en: "Traverse a binary tree in left-right-root order.",
      zh: "按照左-右-根的顺序遍历二叉树（后序遍历）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    relatedProblems: [{ id: 145, titleSlug: "binary-tree-postorder-traversal", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function postorder(root) {
  const result = [];
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    result.push(node.val);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function postorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null): void {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    result.push(node.val);
  }
  dfs(root);
  return result;
}`,
      },
      {
        lang: "python",
        code: `def postorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)
    dfs(root)
    return result`,
      },
      {
        lang: "java",
        code: `public List<Integer> postorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, result);
    return result;
}

private void dfs(TreeNode node, List<Integer> result) {
    if (node == null) return;
    dfs(node.left, result);
    dfs(node.right, result);
    result.add(node.val);
}`,
      },
      {
        lang: "rust",
        code: `fn postorder(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
    let mut result = Vec::new();
    fn dfs(node: Option<Rc<RefCell<TreeNode>>>, result: &mut Vec<i32>) {
        if let Some(n) = node {
            let n = n.borrow();
            dfs(n.left.clone(), result);
            dfs(n.right.clone(), result);
            result.push(n.val);
        }
    }
    dfs(root, &mut result);
    result
}`,
      },
      {
        lang: "c",
        code: `void dfs(struct TreeNode *node, int *result, int *idx) {
    if (!node) return;
    dfs(node->left, result, idx);
    dfs(node->right, result, idx);
    result[(*idx)++] = node->val;
}

int* postorderTraversal(struct TreeNode* root, int* returnSize) {
    int *result = malloc(100 * sizeof(int));
    *returnSize = 0;
    dfs(root, result, returnSize);
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `vector<int> postorderTraversal(TreeNode* root) {
    vector<int> result;
    function<void(TreeNode*)> dfs = [&](TreeNode* node) {
        if (!node) return;
        dfs(node->left);
        dfs(node->right);
        result.push_back(node->val);
    };
    dfs(root);
    return result;
}`,
      },
      {
        lang: "go",
        code: `func postorderTraversal(root *TreeNode) []int {
    result := []int{}
    var dfs func(*TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil { return }
        dfs(node.Left)
        dfs(node.Right)
        result = append(result, node.Val)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "php",
        code: `function postorderTraversal(?TreeNode $root): array {
    $result = [];
    $dfs = function(?TreeNode $node) use (&$result, &$dfs): void {
        if ($node === null) return;
        $dfs($node->left);
        $dfs($node->right);
        $result[] = $node->val;
    };
    $dfs($root);
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun postorderTraversal(root: TreeNode?): List<Int> {
    val result = mutableListOf<Int>()
    fun dfs(node: TreeNode?) {
        node ?: return
        dfs(node.left)
        dfs(node.right)
        result.add(node.value)
    }
    dfs(root)
    return result
}`,
      },
      {
        lang: "swift",
        code: `func postorderTraversal(_ root: TreeNode?) -> [Int] {
    var result: [Int] = []
    func dfs(_ node: TreeNode?) {
        guard let node = node else { return }
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)
    }
    dfs(root)
    return result
}`,
      },
    ],
  },

  "tree-level-order": {
    id: "tree-level-order",
    name: "Binary Tree Level Order Traversal",
    displayName: { en: "Level Order Traversal", zh: "层序遍历" },
    category: "tree",
    difficulty: "beginner",
    tags: ["tree", "bfs", "queue"],
    description: {
      en: "Traverse a binary tree level by level using BFS.",
      zh: "使用广度优先搜索按层遍历二叉树（层序遍历）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    relatedProblems: [{ id: 102, titleSlug: "binary-tree-level-order-traversal", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
      },
      {
        lang: "typescript",
        code: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [], queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left: queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result`,
      },
      {
        lang: "java",
        code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
      },
      {
        lang: "rust",
        code: `use std::collections::VecDeque;

fn level_order(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<Vec<i32>> {
    let mut result = Vec::new();
    if root.is_none() { return result; }
    let mut queue = VecDeque::new();
    queue.push_back(root.unwrap());
    while !queue.is_empty() {
        let size = queue.len();
        let mut level = Vec::new();
        for _ in 0..size {
            let node = queue.pop_front().unwrap();
            let n = node.borrow();
            level.push(n.val);
            if let Some(l) = n.left.clone() { queue.push_back(l); }
            if let Some(r) = n.right.clone() { queue.push_back(r); }
        }
        result.push(level);
    }
    result
}`,
      },
      {
        lang: "c",
        code: `// BFS using a simple array queue
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    if (!root) { *returnSize = 0; return NULL; }
    struct TreeNode *queue[1000]; int front = 0, back = 0;
    queue[back++] = root;
    int **result = malloc(1000 * sizeof(int*));
    *returnColumnSizes = malloc(1000 * sizeof(int));
    *returnSize = 0;
    while (front < back) {
        int size = back - front;
        result[*returnSize] = malloc(size * sizeof(int));
        (*returnColumnSizes)[*returnSize] = size;
        for (int i = 0; i < size; i++) {
            struct TreeNode *node = queue[front++];
            result[*returnSize][i] = node->val;
            if (node->left) queue[back++] = node->left;
            if (node->right) queue[back++] = node->right;
        }
        (*returnSize)++;
    }
    return result;
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (!root) return result;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int size = q.size();
        vector<int> level;
        for (int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        result.push_back(level);
    }
    return result;
}`,
      },
      {
        lang: "go",
        code: `func levelOrder(root *TreeNode) [][]int {
    if root == nil { return nil }
    result := [][]int{}
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        size := len(queue)
        level := make([]int, 0, size)
        for i := 0; i < size; i++ {
            node := queue[i]
            level = append(level, node.Val)
            if node.Left != nil { queue = append(queue, node.Left) }
            if node.Right != nil { queue = append(queue, node.Right) }
        }
        queue = queue[size:]
        result = append(result, level)
    }
    return result
}`,
      },
      {
        lang: "php",
        code: `function levelOrder(?TreeNode $root): array {
    if ($root === null) return [];
    $result = []; $queue = [$root];
    while (!empty($queue)) {
        $size = count($queue); $level = [];
        for ($i = 0; $i < $size; $i++) {
            $node = array_shift($queue);
            $level[] = $node->val;
            if ($node->left) $queue[] = $node->left;
            if ($node->right) $queue[] = $node->right;
        }
        $result[] = $level;
    }
    return $result;
}`,
      },
      {
        lang: "kotlin",
        code: `fun levelOrder(root: TreeNode?): List<List<Int>> {
    if (root == null) return emptyList()
    val result = mutableListOf<List<Int>>()
    val queue = ArrayDeque<TreeNode>().also { it.add(root) }
    while (queue.isNotEmpty()) {
        val level = mutableListOf<Int>()
        repeat(queue.size) {
            val node = queue.removeFirst()
            level.add(node.value)
            node.left?.let { queue.add(it) }
            node.right?.let { queue.add(it) }
        }
        result.add(level)
    }
    return result
}`,
      },
      {
        lang: "swift",
        code: `func levelOrder(_ root: TreeNode?) -> [[Int]] {
    guard let root = root else { return [] }
    var result: [[Int]] = [], queue: [TreeNode] = [root]
    while !queue.isEmpty {
        let size = queue.count
        var level: [Int] = []
        for i in 0..<size {
            let node = queue[i]
            level.append(node.val)
            if let l = node.left { queue.append(l) }
            if let r = node.right { queue.append(r) }
        }
        queue.removeFirst(size)
        result.append(level)
    }
    return result
}`,
      },
    ],
  },

  "tree-height": {
    id: "tree-height",
    name: "Binary Tree Height",
    displayName: { en: "Tree Height", zh: "树的高度" },
    category: "tree",
    difficulty: "beginner",
    tags: ["tree", "dfs", "recursion"],
    description: {
      en: "Compute the maximum depth (height) of a binary tree.",
      zh: "计算二叉树的最大深度（高度）。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    relatedProblems: [{ id: 104, titleSlug: "maximum-depth-of-binary-tree", difficulty: "easy" }],
    snippets: [
      {
        lang: "javascript",
        code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
      {
        lang: "typescript",
        code: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
      {
        lang: "python",
        code: `def maxDepth(root):
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
      },
      {
        lang: "java",
        code: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      },
      {
        lang: "rust",
        code: `fn max_depth(root: Option<Rc<RefCell<TreeNode>>>) -> i32 {
    match root {
        None => 0,
        Some(n) => {
            let n = n.borrow();
            1 + max_depth(n.left.clone()).max(max_depth(n.right.clone()))
        }
    }
}`,
      },
      {
        lang: "c",
        code: `int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    int l = maxDepth(root->left), r = maxDepth(root->right);
    return 1 + (l > r ? l : r);
}`,
      },
      {
        lang: "cpp",
        code: `int maxDepth(TreeNode* root) {
    if (!root) return 0;
    return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
      },
      {
        lang: "go",
        code: `func maxDepth(root *TreeNode) int {
    if root == nil { return 0 }
    l, r := maxDepth(root.Left), maxDepth(root.Right)
    if l > r { return 1 + l }
    return 1 + r
}`,
      },
      {
        lang: "php",
        code: `function maxDepth(?TreeNode $root): int {
    if ($root === null) return 0;
    return 1 + max(maxDepth($root->left), maxDepth($root->right));
}`,
      },
      {
        lang: "kotlin",
        code: `fun maxDepth(root: TreeNode?): Int {
    if (root == null) return 0
    return 1 + maxOf(maxDepth(root.left), maxDepth(root.right))
}`,
      },
      {
        lang: "swift",
        code: `func maxDepth(_ root: TreeNode?) -> Int {
    guard let root = root else { return 0 }
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
}`,
      },
    ],
  },

  "tree-lca": {
    id: "tree-lca",
    name: "Lowest Common Ancestor",
    displayName: { en: "Lowest Common Ancestor", zh: "最近公共祖先" },
    category: "tree",
    difficulty: "intermediate",
    tags: ["tree", "dfs", "recursion", "lca"],
    description: {
      en: "Find the lowest common ancestor of two nodes in a binary tree.",
      zh: "在二叉树中找出两个节点的最近公共祖先。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    relatedProblems: [{ id: 236, titleSlug: "lowest-common-ancestor-of-a-binary-tree", difficulty: "medium" }],
    snippets: [
      {
        lang: "javascript",
        code: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left && right ? root : left || right;
}`,
      },
      {
        lang: "typescript",
        code: `function lowestCommonAncestor(
  root: TreeNode | null, p: TreeNode, q: TreeNode
): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  return left && right ? root : left ?? right;
}`,
      },
      {
        lang: "python",
        code: `def lowestCommonAncestor(root, p, q):
    if not root or root is p or root is q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    return root if left and right else left or right`,
      },
      {
        lang: "java",
        code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    return left != null && right != null ? root : left != null ? left : right;
}`,
      },
      {
        lang: "rust",
        code: `fn lca(root: Option<Rc<RefCell<TreeNode>>>, p: i32, q: i32)
    -> Option<Rc<RefCell<TreeNode>>> {
    root.and_then(|n| {
        let val = n.borrow().val;
        if val == p || val == q { return Some(n.clone()); }
        let left = lca(n.borrow().left.clone(), p, q);
        let right = lca(n.borrow().right.clone(), p, q);
        match (left, right) {
            (Some(l), Some(_)) => Some(n),
            (Some(l), None) => Some(l),
            (None, Some(r)) => Some(r),
            _ => None,
        }
    })
}`,
      },
      {
        lang: "c",
        code: `struct TreeNode* lowestCommonAncestor(
    struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    if (!root || root == p || root == q) return root;
    struct TreeNode *left = lowestCommonAncestor(root->left, p, q);
    struct TreeNode *right = lowestCommonAncestor(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
      },
      {
        lang: "cpp",
        code: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    return left && right ? root : left ? left : right;
}`,
      },
      {
        lang: "go",
        code: `func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q { return root }
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil { return root }
    if left != nil { return left }
    return right
}`,
      },
      {
        lang: "php",
        code: `function lowestCommonAncestor(?TreeNode $root, TreeNode $p, TreeNode $q): ?TreeNode {
    if ($root === null || $root === $p || $root === $q) return $root;
    $left = lowestCommonAncestor($root->left, $p, $q);
    $right = lowestCommonAncestor($root->right, $p, $q);
    if ($left && $right) return $root;
    return $left ?? $right;
}`,
      },
      {
        lang: "kotlin",
        code: `fun lowestCommonAncestor(root: TreeNode?, p: TreeNode, q: TreeNode): TreeNode? {
    if (root == null || root == p || root == q) return root
    val left = lowestCommonAncestor(root.left, p, q)
    val right = lowestCommonAncestor(root.right, p, q)
    return if (left != null && right != null) root else left ?: right
}`,
      },
      {
        lang: "swift",
        code: `func lowestCommonAncestor(_ root: TreeNode?, _ p: TreeNode, _ q: TreeNode) -> TreeNode? {
    guard let root = root else { return nil }
    if root === p || root === q { return root }
    let left = lowestCommonAncestor(root.left, p, q)
    let right = lowestCommonAncestor(root.right, p, q)
    if left != nil && right != nil { return root }
    return left ?? right
}`,
      },
    ],
  },

  "tree-serialize": {
    id: "tree-serialize",
    name: "Serialize and Deserialize Binary Tree",
    displayName: { en: "Serialize / Deserialize Tree", zh: "二叉树的序列化与反序列化" },
    category: "tree",
    difficulty: "advanced",
    tags: ["tree", "dfs", "bfs", "design", "string"],
    description: {
      en: "Encode a binary tree to a string and decode it back using BFS level-order encoding.",
      zh: "使用 BFS 层序编码将二叉树序列化为字符串，并将其反序列化还原为树。",
    },
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    relatedProblems: [{ id: 297, titleSlug: "serialize-and-deserialize-binary-tree", difficulty: "hard" }],
    snippets: [
      {
        lang: "javascript",
        code: `function serialize(root) {
  if (!root) return 'null';
  const queue = [root], vals = [];
  while (queue.length) {
    const node = queue.shift();
    if (!node) { vals.push('null'); continue; }
    vals.push(node.val);
    queue.push(node.left, node.right);
  }
  return vals.join(',');
}

function deserialize(data) {
  const vals = data.split(',');
  if (vals[0] === 'null') return null;
  const root = new TreeNode(+vals[0]);
  const queue = [root]; let i = 1;
  while (queue.length) {
    const node = queue.shift();
    if (vals[i] !== 'null') { node.left = new TreeNode(+vals[i]); queue.push(node.left); }
    i++;
    if (vals[i] !== 'null') { node.right = new TreeNode(+vals[i]); queue.push(node.right); }
    i++;
  }
  return root;
}`,
      },
      {
        lang: "typescript",
        code: `function serialize(root: TreeNode | null): string {
  if (!root) return 'null';
  const queue: (TreeNode | null)[] = [root], vals: string[] = [];
  while (queue.length) {
    const node = queue.shift()!;
    if (!node) { vals.push('null'); continue; }
    vals.push(String(node.val));
    queue.push(node.left, node.right);
  }
  return vals.join(',');
}

function deserialize(data: string): TreeNode | null {
  const vals = data.split(',');
  if (vals[0] === 'null') return null;
  const root = new TreeNode(+vals[0]);
  const queue: TreeNode[] = [root]; let i = 1;
  while (queue.length) {
    const node = queue.shift()!;
    if (vals[i] !== 'null') { node.left = new TreeNode(+vals[i]!); queue.push(node.left); }
    i++;
    if (vals[i] !== 'null') { node.right = new TreeNode(+vals[i]!); queue.push(node.right); }
    i++;
  }
  return root;
}`,
      },
      {
        lang: "python",
        code: `from collections import deque

def serialize(root):
    if not root:
        return 'null'
    queue, vals = deque([root]), []
    while queue:
        node = queue.popleft()
        if not node:
            vals.append('null')
        else:
            vals.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)
    return ','.join(vals)

def deserialize(data):
    vals = data.split(',')
    if vals[0] == 'null':
        return None
    root = TreeNode(int(vals[0]))
    queue, i = deque([root]), 1
    while queue:
        node = queue.popleft()
        if vals[i] != 'null':
            node.left = TreeNode(int(vals[i]))
            queue.append(node.left)
        i += 1
        if vals[i] != 'null':
            node.right = TreeNode(int(vals[i]))
            queue.append(node.right)
        i += 1
    return root`,
      },
      {
        lang: "java",
        code: `public String serialize(TreeNode root) {
    if (root == null) return "null";
    StringBuilder sb = new StringBuilder();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        if (node == null) { sb.append("null,"); continue; }
        sb.append(node.val).append(',');
        queue.offer(node.left); queue.offer(node.right);
    }
    return sb.toString();
}

public TreeNode deserialize(String data) {
    String[] vals = data.split(",");
    if ("null".equals(vals[0])) return null;
    TreeNode root = new TreeNode(Integer.parseInt(vals[0]));
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int i = 1;
    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        if (!"null".equals(vals[i])) { node.left = new TreeNode(Integer.parseInt(vals[i])); queue.offer(node.left); }
        i++;
        if (!"null".equals(vals[i])) { node.right = new TreeNode(Integer.parseInt(vals[i])); queue.offer(node.right); }
        i++;
    }
    return root;
}`,
      },
      {
        lang: "rust",
        code: `fn serialize(root: Option<Rc<RefCell<TreeNode>>>) -> String {
    let mut queue = std::collections::VecDeque::new();
    let mut vals = Vec::new();
    queue.push_back(root);
    while let Some(node) = queue.pop_front() {
        match node {
            None => vals.push("null".to_string()),
            Some(n) => {
                vals.push(n.borrow().val.to_string());
                queue.push_back(n.borrow().left.clone());
                queue.push_back(n.borrow().right.clone());
            }
        }
    }
    vals.join(",")
}`,
      },
      {
        lang: "c",
        code: `char* serialize(struct TreeNode* root) {
    // BFS serialize — simplified, returns comma-separated string
    char *buf = malloc(4096); buf[0] = 0;
    if (!root) { strcpy(buf, "null"); return buf; }
    struct TreeNode *q[1000]; int f=0, b=0;
    q[b++] = root;
    while (f < b) {
        struct TreeNode *node = q[f++];
        if (!node) { strcat(buf, "null,"); continue; }
        char tmp[16]; sprintf(tmp, "%d,", node->val);
        strcat(buf, tmp);
        q[b++] = node->left; q[b++] = node->right;
    }
    return buf;
}`,
      },
      {
        lang: "cpp",
        code: `#include <queue>
#include <sstream>
string serialize(TreeNode* root) {
    if (!root) return "null";
    string res; queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        if (!node) { res += "null,"; continue; }
        res += to_string(node->val) + ",";
        q.push(node->left); q.push(node->right);
    }
    return res;
}

TreeNode* deserialize(string data) {
    istringstream ss(data); string token;
    getline(ss, token, ',');
    if (token == "null") return nullptr;
    TreeNode* root = new TreeNode(stoi(token));
    queue<TreeNode*> q; q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front(); q.pop();
        getline(ss, token, ',');
        if (token != "null") { node->left = new TreeNode(stoi(token)); q.push(node->left); }
        getline(ss, token, ',');
        if (token != "null") { node->right = new TreeNode(stoi(token)); q.push(node->right); }
    }
    return root;
}`,
      },
      {
        lang: "go",
        code: `import "strings"
import "strconv"

func serialize(root *TreeNode) string {
    if root == nil { return "null" }
    queue, vals := []*TreeNode{root}, []string{}
    for len(queue) > 0 {
        node := queue[0]; queue = queue[1:]
        if node == nil { vals = append(vals, "null"); continue }
        vals = append(vals, strconv.Itoa(node.Val))
        queue = append(queue, node.Left, node.Right)
    }
    return strings.Join(vals, ",")
}

func deserialize(data string) *TreeNode {
    vals := strings.Split(data, ",")
    if vals[0] == "null" { return nil }
    root := &TreeNode{Val: atoi(vals[0])}
    queue, i := []*TreeNode{root}, 1
    for len(queue) > 0 {
        node := queue[0]; queue = queue[1:]
        if vals[i] != "null" { node.Left = &TreeNode{Val: atoi(vals[i])}; queue = append(queue, node.Left) }
        i++
        if vals[i] != "null" { node.Right = &TreeNode{Val: atoi(vals[i])}; queue = append(queue, node.Right) }
        i++
    }
    return root
}`,
      },
      {
        lang: "php",
        code: `function serialize(?TreeNode $root): string {
    if ($root === null) return 'null';
    $queue = [$root]; $vals = [];
    while (!empty($queue)) {
        $node = array_shift($queue);
        if ($node === null) { $vals[] = 'null'; continue; }
        $vals[] = $node->val;
        $queue[] = $node->left; $queue[] = $node->right;
    }
    return implode(',', $vals);
}

function deserialize(string $data): ?TreeNode {
    $vals = explode(',', $data);
    if ($vals[0] === 'null') return null;
    $root = new TreeNode((int)$vals[0]);
    $queue = [$root]; $i = 1;
    while (!empty($queue)) {
        $node = array_shift($queue);
        if ($vals[$i] !== 'null') { $node->left = new TreeNode((int)$vals[$i]); $queue[] = $node->left; }
        $i++;
        if ($vals[$i] !== 'null') { $node->right = new TreeNode((int)$vals[$i]); $queue[] = $node->right; }
        $i++;
    }
    return $root;
}`,
      },
      {
        lang: "kotlin",
        code: `fun serialize(root: TreeNode?): String {
    if (root == null) return "null"
    val queue = ArrayDeque<TreeNode?>().also { it.add(root) }
    val vals = mutableListOf<String>()
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        if (node == null) { vals.add("null"); continue }
        vals.add(node.value.toString())
        queue.add(node.left); queue.add(node.right)
    }
    return vals.joinToString(",")
}

fun deserialize(data: String): TreeNode? {
    val vals = data.split(",")
    if (vals[0] == "null") return null
    val root = TreeNode(vals[0].toInt())
    val queue = ArrayDeque<TreeNode>().also { it.add(root) }
    var i = 1
    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        if (vals[i] != "null") { node.left = TreeNode(vals[i].toInt()); queue.add(node.left!!) }
        i++
        if (vals[i] != "null") { node.right = TreeNode(vals[i].toInt()); queue.add(node.right!!) }
        i++
    }
    return root
}`,
      },
      {
        lang: "swift",
        code: `func serialize(_ root: TreeNode?) -> String {
    guard let root = root else { return "null" }
    var queue: [TreeNode?] = [root], vals: [String] = []
    while !queue.isEmpty {
        let node = queue.removeFirst()
        guard let node = node else { vals.append("null"); continue }
        vals.append(String(node.val))
        queue.append(node.left); queue.append(node.right)
    }
    return vals.joined(separator: ",")
}

func deserialize(_ data: String) -> TreeNode? {
    let vals = data.split(separator: ",").map(String.init)
    if vals[0] == "null" { return nil }
    let root = TreeNode(Int(vals[0])!)
    var queue: [TreeNode] = [root], i = 1
    while !queue.isEmpty {
        let node = queue.removeFirst()
        if vals[i] != "null" { node.left = TreeNode(Int(vals[i])!); queue.append(node.left!) }
        i += 1
        if vals[i] != "null" { node.right = TreeNode(Int(vals[i])!); queue.append(node.right!) }
        i += 1
    }
    return root
}`,
      },
    ],
  },
}

// ─── Array-trace runners for tree algorithms ─────────────────────────────────
// Input: BFS level-order array (-1 = null node).
// Strategy: rebuild the tree, run the traversal, record each "visit" as a
// mark/write on the OUTPUT array (the sequence of visited node values).

function bfsArray(input: number[]): number[] {
  return input.length > 0 ? input : [4, 2, 6, 1, 3, 5, 7]
}

/** Build left/right child index maps from BFS level-order array */
function buildChildren(arr: number[]): { left: number[]; right: number[]; valid: boolean[] } {
  const n = arr.length
  const left = new Array<number>(n).fill(-1)
  const right = new Array<number>(n).fill(-1)
  const valid = arr.map((v) => v !== -1)
  for (let i = 0; i < n; i++) {
    if (!valid[i]) continue
    const l = 2 * i + 1, r = 2 * i + 2
    if (l < n && valid[l]) left[i] = l
    if (r < n && valid[r]) right[i] = r
  }
  return { left, right, valid }
}

function runTreeInorder(input: number[]): AlgorithmRun {
  const arr = bfsArray(input)
  const { left, right, valid } = buildChildren(arr)
  const rec = new ArrayTraceRecorder([...arr])
  const order: number[] = []
  function dfs(i: number) {
    if (i < 0 || i >= arr.length || !valid[i]) return
    dfs(left[i] ?? -1)
    order.push(i)
    rec.mark([i], "active")
    rec.mark([i], "sorted")
    dfs(right[i] ?? -1)
  }
  dfs(0)
  return rec.finish(treeAlgorithms["tree-inorder"]!)
}

function runTreePreorder(input: number[]): AlgorithmRun {
  const arr = bfsArray(input)
  const { left, right, valid } = buildChildren(arr)
  const rec = new ArrayTraceRecorder([...arr])
  function dfs(i: number) {
    if (i < 0 || i >= arr.length || !valid[i]) return
    rec.mark([i], "active")
    rec.mark([i], "sorted")
    dfs(left[i] ?? -1)
    dfs(right[i] ?? -1)
  }
  dfs(0)
  return rec.finish(treeAlgorithms["tree-preorder"]!)
}

function runTreePostorder(input: number[]): AlgorithmRun {
  const arr = bfsArray(input)
  const { left, right, valid } = buildChildren(arr)
  const rec = new ArrayTraceRecorder([...arr])
  function dfs(i: number) {
    if (i < 0 || i >= arr.length || !valid[i]) return
    dfs(left[i] ?? -1)
    dfs(right[i] ?? -1)
    rec.mark([i], "active")
    rec.mark([i], "sorted")
  }
  dfs(0)
  return rec.finish(treeAlgorithms["tree-postorder"]!)
}

function runTreeLevelOrder(input: number[]): AlgorithmRun {
  const arr = bfsArray(input)
  const { left, right, valid } = buildChildren(arr)
  const rec = new ArrayTraceRecorder([...arr])
  const queue: number[] = valid[0] ? [0] : []
  while (queue.length > 0) {
    const i = queue.shift()!
    rec.mark([i], "active")
    rec.mark([i], "sorted")
    if ((left[i] ?? -1) >= 0) queue.push(left[i]!)
    if ((right[i] ?? -1) >= 0) queue.push(right[i]!)
  }
  return rec.finish(treeAlgorithms["tree-level-order"]!)
}

function runTreeHeight(input: number[]): AlgorithmRun {
  const arr = bfsArray(input)
  const n = arr.length
  const { left, right, valid } = buildChildren(arr)
  // Visualise the height values filled bottom-up
  const heights = new Array<number>(n).fill(0)
  const rec = new ArrayTraceRecorder([...arr])
  function height(i: number): number {
    if (i < 0 || i >= n || !valid[i]) return 0
    const lh = height(left[i] ?? -1)
    const rh = height(right[i] ?? -1)
    rec.compareValue(i, Math.max(0, i - 1), lh, rh)
    heights[i] = Math.max(lh, rh) + 1
    rec.mark([i], "active")
    rec.write(i, heights[i])
    rec.mark([i], "sorted")
    return heights[i]
  }
  height(0)
  return rec.finish(treeAlgorithms["tree-height"]!)
}

function runTreeLca(input: number[]): AlgorithmRun {
  // Use first two non-(-1) leaf indices as targets p and q
  const arr = bfsArray(input)
  const { valid } = buildChildren(arr)
  const leaves = arr.map((_, i) => i).filter((i) => valid[i] && 2 * i + 1 >= arr.length)
  const p = leaves[0] ?? 1
  const q = leaves[leaves.length - 1] ?? 2
  const rec = new ArrayTraceRecorder([...arr])
  // Track path from root to p and root to q using parent map
  const parent = new Array<number>(arr.length).fill(-1)
  for (let i = 0; i < arr.length; i++) {
    if (valid[i]) {
      const l = 2 * i + 1, r = 2 * i + 2
      if (l < arr.length && valid[l]) parent[l] = i
      if (r < arr.length && valid[r]) parent[r] = i
    }
  }
  const ancestors = new Set<number>()
  let cur = p
  while (cur >= 0) { ancestors.add(cur); rec.mark([cur], "active"); cur = parent[cur] ?? -1 }
  cur = q
  while (cur >= 0) {
    rec.compareValue(cur, p, cur, p)
    if (ancestors.has(cur)) { rec.mark([cur], "sorted"); break }
    rec.mark([cur], "visited")
    cur = parent[cur] ?? -1
  }
  return rec.finish(treeAlgorithms["tree-lca"]!)
}

function runTreeSerialize(input: number[]): AlgorithmRun {
  // Serialise = BFS order, visualise by visiting each node in BFS
  const arr = bfsArray(input)
  const { left, right, valid } = buildChildren(arr)
  const rec = new ArrayTraceRecorder([...arr])
  const queue: number[] = valid[0] ? [0] : []
  let pos = 0
  while (queue.length > 0) {
    const i = queue.shift()!
    rec.mark([i], "active")
    rec.write(pos, arr[i] ?? 0)
    rec.mark([pos], "sorted")
    pos++
    if ((left[i] ?? -1) >= 0) queue.push(left[i]!)
    if ((right[i] ?? -1) >= 0) queue.push(right[i]!)
  }
  return rec.finish(treeAlgorithms["tree-serialize"]!)
}

// ─── Dispatcher ───────────────────────────────────────────────────────────────

export function runTreeAlgorithm(algorithmId: TreeAlgorithmId, input: number[]): AlgorithmRun {
  switch (algorithmId) {
    case "tree-inorder":    return runTreeInorder(input)
    case "tree-preorder":   return runTreePreorder(input)
    case "tree-postorder":  return runTreePostorder(input)
    case "tree-level-order":return runTreeLevelOrder(input)
    case "tree-height":     return runTreeHeight(input)
    case "tree-lca":        return runTreeLca(input)
    case "tree-serialize":  return runTreeSerialize(input)
    default: {
      const _exhaustive: never = algorithmId
      throw new Error(`Unknown tree algorithm: ${_exhaustive}`)
    }
  }
}
