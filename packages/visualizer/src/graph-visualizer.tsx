"use client"

import { useMemo, useState, useCallback } from "react"

// ─── Graph data types ─────────────────────────────────────────────────────────

export interface GraphNode {
  id: string
  label?: string
  x?: number
  y?: number
  role?: "active" | "visited" | "start" | "end" | "path" | "component" | "mst" | "default"
}

export interface GraphEdge {
  from: string
  to: string
  weight?: number
  role?: "explored" | "tree" | "back" | "cross" | "relaxed" | "mst" | "default"
  directed?: boolean
}

export interface GraphData {
  nodes: GraphNode[]
  edges: GraphEdge[]
  directed?: boolean
  weighted?: boolean
}

// ─── Layout (simple circle layout) ───────────────────────────────────────────

function computeLayout(nodes: GraphNode[], width: number, height: number): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>()
  const n = nodes.length
  if (n === 0) return positions

  const cx = width / 2
  const cy = height / 2
  const r = Math.min(width, height) * 0.38

  nodes.forEach((node, i) => {
    if (node.x !== undefined && node.y !== undefined) {
      positions.set(node.id, { x: node.x, y: node.y })
    } else {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2
      positions.set(node.id, {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      })
    }
  })
  return positions
}

// ─── Color map ────────────────────────────────────────────────────────────────

const NODE_COLORS: Record<string, string> = {
  active: "#f59e0b",
  visited: "#6366f1",
  start: "#10b981",
  end: "#ef4444",
  path: "#f97316",
  component: "#8b5cf6",
  mst: "#06b6d4",
  default: "#e2e8f0",
}

const EDGE_COLORS: Record<string, string> = {
  explored: "#6366f1",
  tree: "#10b981",
  back: "#ef4444",
  cross: "#f59e0b",
  relaxed: "#06b6d4",
  mst: "#06b6d4",
  default: "#94a3b8",
}

const NODE_TEXT_COLORS: Record<string, string> = {
  active: "#1c1917",
  visited: "#fff",
  start: "#fff",
  end: "#fff",
  path: "#fff",
  component: "#fff",
  mst: "#fff",
  default: "#1e293b",
}

// ─── GraphVisualizer component ───────────────────────────────────────────────

interface GraphVisualizerProps {
  data: GraphData
  width?: number
  height?: number
  className?: string
}

export function GraphVisualizer({ data, width = 560, height = 340, className }: GraphVisualizerProps) {
  const positions = useMemo(
    () => computeLayout(data.nodes, width, height),
    [data.nodes, width, height]
  )

  const nodeRadius = Math.max(18, Math.min(26, 140 / Math.max(data.nodes.length, 1)))

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ background: "transparent", overflow: "visible" }}
    >
      {/* Arrowhead markers */}
      <defs>
        {Object.entries(EDGE_COLORS).map(([role, color]) => (
          <marker
            key={role}
            id={`arrow-${role}`}
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill={color} />
          </marker>
        ))}
      </defs>

      {/* Edges */}
      {data.edges.map((edge, i) => {
        const from = positions.get(edge.from)
        const to = positions.get(edge.to)
        if (!from || !to) return null

        const role = edge.role ?? "default"
        const color = EDGE_COLORS[role] ?? EDGE_COLORS.default
        const isDirected = edge.directed ?? data.directed ?? false

        // offset to avoid overlapping with node circles
        const dx = to.x - from.x
        const dy = to.y - from.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist === 0) return null
        const ux = dx / dist
        const uy = dy / dist

        const x1 = from.x + ux * nodeRadius
        const y1 = from.y + uy * nodeRadius
        const x2 = to.x - ux * (nodeRadius + (isDirected ? 8 : 0))
        const y2 = to.y - uy * (nodeRadius + (isDirected ? 8 : 0))

        // midpoint for weight label
        const mx = (x1 + x2) / 2
        const my = (y1 + y2) / 2

        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={color}
              strokeWidth={role === "default" ? 1.5 : 2.5}
              markerEnd={isDirected ? `url(#arrow-${role})` : undefined}
              opacity={0.85}
            />
            {edge.weight !== undefined && (
              <g>
                <rect
                  x={mx - 10}
                  y={my - 9}
                  width={20}
                  height={16}
                  rx={3}
                  fill="#1e293b"
                  opacity={0.75}
                />
                <text
                  x={mx}
                  y={my + 3}
                  textAnchor="middle"
                  fontSize={10}
                  fill="#f8fafc"
                  fontWeight="600"
                >
                  {edge.weight}
                </text>
              </g>
            )}
          </g>
        )
      })}

      {/* Nodes */}
      {data.nodes.map((node) => {
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
              fontSize={Math.max(10, nodeRadius * 0.7)}
              fontWeight="700"
              fill={textColor}
            >
              {node.label ?? node.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Graph input parser ───────────────────────────────────────────────────────

/**
 * Parse edge list text into GraphData.
 * Format (one edge per line):
 *   0 1        (unweighted)
 *   0 1 5      (weighted, weight=5)
 *   0->1       (directed)
 *   0->1:5     (directed + weighted)
 */
export function parseGraphInput(text: string, directed = false, weighted = false): { graph: GraphData; error?: string } {
  const lines = text
    .split(/[\n,;]+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  const nodeSet = new Set<string>()
  const edges: GraphEdge[] = []

  for (const line of lines) {
    // Try directed arrow syntax: "0->1" or "0->1:5"
    const arrowMatch = line.match(/^(\w+)\s*->\s*(\w+)(?:\s*:\s*(\d+(?:\.\d+)?))?$/)
    if (arrowMatch) {
      const [, from, to, w] = arrowMatch
      if (!from || !to) continue
      nodeSet.add(from)
      nodeSet.add(to)
      edges.push({ from, to, weight: w !== undefined ? Number(w) : undefined, directed: true })
      continue
    }

    // Try space-separated: "0 1" or "0 1 5"
    const parts = line.split(/\s+/)
    if (parts.length >= 2) {
      const [from, to, w] = parts
      if (!from || !to) continue
      nodeSet.add(from)
      nodeSet.add(to)
      edges.push({
        from,
        to,
        weight: w !== undefined ? Number(w) : undefined,
        directed,
      })
      continue
    }

    // Single node (isolated)
    if (parts.length === 1 && parts[0]) {
      nodeSet.add(parts[0])
    }
  }

  const nodes: GraphNode[] = Array.from(nodeSet).map((id) => ({ id }))
  return {
    graph: { nodes, edges, directed, weighted },
  }
}

// ─── useGraphPlayer hook (placeholder, will be extended) ─────────────────────

export function useGraphPlayer() {
  // Future: animate graph trace events
  return {}
}
