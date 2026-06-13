import type { CSSProperties } from "react"
import type { ArrayVisualizerState } from "./player"

export interface ArrayVisualizerProps {
  state: ArrayVisualizerState
  className?: string
  showValues?: boolean
  label?: string
}

export function ArrayVisualizer({
  state,
  className,
  showValues = true,
  label = "数组算法可视化",
}: ArrayVisualizerProps) {
  const maximum = Math.max(1, ...state.values.map((value) => Math.abs(value)))

  return (
    <div className={`am-array ${className}`} role="img" aria-label={label}>
      {state.values.map((value, index) => {
        const classes = [
          "am-array__bar",
          state.activeIndices.includes(index) ? "is-active" : "",
          state.sortedIndices.includes(index) ? "is-sorted" : "",
          state.pivotIndices.includes(index) ? "is-pivot" : "",
          state.candidateIndices.includes(index) ? "is-candidate" : "",
        ]
          .filter(Boolean)
          .join(" ")

        const style = {
          "--am-bar-height": `${Math.max(8, (Math.abs(value) / maximum) * 100)}%`,
        } as CSSProperties

        return (
          <div className={classes} key={`${index}-${value}`} style={style}>
            {showValues ? <span>{value}</span> : null}
          </div>
        )
      })}
    </div>
  )
}
