"use client"

import { useMemo } from "react"

// ─── Tree data types ──────────────────────────────────────────────────────────

export interface TreeNode {
  id: string
  val: string | number
  left?: TreeNode | null
  right?: TreeNode | null
  role?: "active" | "visited" | "found" | "inserted" | "deleted" | "default"
}

// ─── Layout: compute x/y for each node using Reingold-Tilford approach ────────

interface LayoutNode {
  node: TreeNode
  x: number
  y: number
  mod: number
}

function computeTreeLayout(root: TreeNode): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const levelHeight = 56
  const nodeHGap = 40

  // First pass: assign initial x, compute mod
  const layoutNodes = new Map<string, LayoutNode>()

  function firstPass(node: TreeNode | null | undefined, depth: number, left: number): number {
    if (!node) return left
    const ln: LayoutNode = { node, x: 0, y: depth * levelHeight + 30, mod: 0 }
    layoutNodes.set(node.id, ln)

    const leftChildRight = firstPass(node.left, depth + 1, left)
    const rightChildLeft = firstPass(node.right, depth + 1, leftChildRight + nodeHGap)

    if (!node.left && !node.right) {
      ln.x = left
      return left
    } else if (!node.right) {
      const lln = node.left ? layoutNodes.get(node.left.id) : undefined
      ln.x = lln?.x ?? left
      return ln.x
    } else if (!node.left) {
      const rln = layoutNodes.get(node.right.id)
      ln.x = rln?.x ?? rightChildLeft
      return ln.x
    } else {
      const lln = layoutNodes.get(node.left.id)
      const rln = layoutNodes.get(node.right.id)
      ln.x = ((lln?.x ?? left) + (rln?.x ?? rightChildLeft)) / 2
      return rln?.x ?? rightChildLeft
    }
  }

  firstPass(root, 0, 0)

  // Normalize x to start at some offset
  let minX = Infinity
  layoutNodes.forEach((ln) => { if (ln.x < minX) minX = ln.x })
  const offsetX = 30
  layoutNodes.forEach((ln) => {
    positions.set(ln.node.id, { x: ln.x - minX + offsetX, y: ln.y })
  })

  return positions
}

// ─── Colors ───────────────────────────────────────────────────────────────────

const NODE_COLORS: Record<string, string> = {
  active: "#f59e0b",
  visited: "#6366f1",
  found: "#10b981",
  inserted: "#06b6d4",
  deleted: "#ef4444",
  default: "#e2e8f0",
}

const NODE_TEXT_COLORS: Record<string, string> = {
  active: "#1c1917",
  visited: "#fff",
  found: "#fff",
  inserted: "#fff",
  deleted: "#fff",
  default: "#1e293b",
}

// ─── TreeVisualizer component ─────────────────────────────────────────────────

interface TreeVisualizerProps {
  root: TreeNode | null
  width?: number
  height?: number
  className?: string
}

export function TreeVisualizer({ root, width = 560, height = 320, className }: TreeVisualizerProps) {
  const positions = useMemo(() => (root ? computeTreeLayout(root) : new Map()), [root])

  if (!root) {
    return (
      <div className={className} style={{ width, height, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#94a3b8", fontSize: 14 }}>空树</span>
      </div>
    )
  }

  // Collect all nodes and edges
  const allNodes: TreeNode[] = []
  const edges: { from: string; to: string }[] = []

  function collect(node: TreeNode | null | undefined) {
    if (!node) return
    allNodes.push(node)
    if (node.left) { edges.push({ from: node.id, to: node.left.id }); collect(node.left) }
    if (node.right) { edges.push({ from: node.id, to: node.right.id }); collect(node.right) }
  }
  collect(root)

  const nodeRadius = 20

  // Compute SVG bounding box
  let maxX = 0
  positions.forEach((p) => { if (p.x > maxX) maxX = p.x })
  const svgWidth = Math.max(width, maxX + 50)

  return (
    <svg
      width={svgWidth}
      height={height}
      viewBox={`0 0 ${svgWidth} ${height}`}
      className={className}
      style={{ background: "transparent", overflow: "visible", maxWidth: "100%" }}
    >
      {/* Edges */}
      {edges.map((e, i) => {
        const from = positions.get(e.from)
        const to = positions.get(e.to)
        if (!from || !to) return null
        return (
          <line
            key={i}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke="#94a3b8"
            strokeWidth={1.5}
          />
        )
      })}

      {/* Nodes */}
      {allNodes.map((node) => {
        const pos = positions.get(node.id)
        if (!pos) return null
        const role = node.role ?? "default"
        const fillColor = NODE_COLORS[role] ?? NODE_COLORS.default
        const textColor = NODE_TEXT_COLORS[role] ?? NODE_TEXT_COLORS.default

        return (
          <g key={node.id}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill={fillColor}
              stroke={role === "default" ? "#94a3b8" : fillColor}
              strokeWidth={role === "default" ? 1.5 : 2.5}
            />
            <text
              x={pos.x}
              y={pos.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={12}
              fontWeight="700"
              fill={textColor}
            >
              {String(node.val)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Tree input parser ────────────────────────────────────────────────────────

/**
 * Parse level-order array string into a TreeNode.
 * Format: "1,2,3,null,null,4,5" (LeetCode style)
 */
export function parseTreeInput(text: string): { root: TreeNode | null; error?: string } {
  const raw = text.trim()
  if (!raw || raw === "null" || raw === "[]") return { root: null }

  // Remove brackets if present
  const cleaned = raw.replace(/^\[/, "").replace(/\]$/, "")
  const parts = cleaned.split(/[\s,]+/).map((s) => s.trim())

  if (parts.length === 0 || parts[0] === "null" || parts[0] === "") return { root: null }

  let idCounter = 0
  function makeNode(val: string): TreeNode {
    return { id: String(idCounter++), val: isNaN(Number(val)) ? val : Number(val) }
  }

  const root = makeNode(parts[0]!)
  const queue: (TreeNode | null)[] = [root]
  let i = 1

  while (queue.length > 0 && i < parts.length) {
    const current = queue.shift()
    if (!current) continue

    // left child
    if (i < parts.length) {
      const leftVal = parts[i++]
      if (leftVal && leftVal !== "null") {
        current.left = makeNode(leftVal)
        queue.push(current.left)
      } else {
        current.left = null
        queue.push(null)
      }
    }

    // right child
    if (i < parts.length) {
      const rightVal = parts[i++]
      if (rightVal && rightVal !== "null") {
        current.right = makeNode(rightVal)
        queue.push(current.right)
      } else {
        current.right = null
        queue.push(null)
      }
    }
  }

  return { root }
}
