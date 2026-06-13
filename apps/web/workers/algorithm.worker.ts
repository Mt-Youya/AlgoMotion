/// <reference lib="webworker" />

import {
  algorithmRegistry,
  runBacktrackingAlgorithm,
  runDpAlgorithm,
  runGraphMstAlgorithm,
  runGraphShortestPathAlgorithm,
  runGraphTopologyAlgorithm,
  runGraphTraversalAlgorithm,
  runGreedyAlgorithm,
  runBinarySearch,
  runExponentialSearch,
  runInterpolationSearch,
  runJumpSearch,
  runLinearSearch,
  runSetsAlgorithm,
  runSortingAlgorithm,
  runStringAlgorithm,
  runTreeAlgorithm,
  runTwoPointersAlgorithm,
} from "@algomotion/algorithms"
import type {
  AlgorithmRun,
  AlgorithmWorkerRequest,
  AlgorithmWorkerResponse,
  BacktrackingAlgorithmId,
  DpAlgorithmId,
  GraphAlgorithmId,
  GreedyAlgorithmId,
  SearchAlgorithmId,
  SortingAlgorithmId,
  StringAlgorithmId,
  TreeAlgorithmId,
  TwoPointersAlgorithmId,
} from "@algomotion/shared"

const workerScope = self as DedicatedWorkerGlobalScope

function stubRun(algorithmId: string, input: number[]): AlgorithmRun {
  const meta = algorithmRegistry.get(algorithmId)
  if (!meta) throw new Error(`Unknown algorithm: ${algorithmId}`)
  return {
    algorithm: meta,
    input,
    output: [],
    trace: [],
    stats: { comparisons: 0, swaps: 0, writes: 0, memoryAccesses: 0 },
  }
}

workerScope.onmessage = (event: MessageEvent<AlgorithmWorkerRequest>) => {
  const { requestId, algorithmId, input } = event.data

  try {
    const meta = algorithmRegistry.get(algorithmId as string)
    const category = meta?.category

    let run: AlgorithmRun

    switch (category) {
      case "sorting":
        run = runSortingAlgorithm(algorithmId as SortingAlgorithmId, input)
        break
      case "search": {
        const searchId = algorithmId as SearchAlgorithmId
        if (searchId === "binary-search") run = runBinarySearch(input)
        else if (searchId === "jump-search") run = runJumpSearch(input)
        else if (searchId === "interpolation-search") run = runInterpolationSearch(input)
        else if (searchId === "exponential-search") run = runExponentialSearch(input)
        else run = runLinearSearch(input)
        break
      }
      case "two-pointers":
        run = runTwoPointersAlgorithm(algorithmId as TwoPointersAlgorithmId, input)
        break
      case "dynamic-programming":
        run = runDpAlgorithm(algorithmId as DpAlgorithmId, input)
        break
      case "backtracking":
        run = runBacktrackingAlgorithm(algorithmId as BacktrackingAlgorithmId, input)
        break
      case "greedy":
        run = runGreedyAlgorithm(algorithmId as GreedyAlgorithmId, input)
        break
      case "string":
        run = runStringAlgorithm(algorithmId as StringAlgorithmId, input)
        break
      case "math":
      case "bit-manipulation":
        run = stubRun(algorithmId as string, input)
        break
      case "tree":
        run = runTreeAlgorithm(algorithmId as TreeAlgorithmId, input)
        break
      case "graph": {
        const graphId = algorithmId as GraphAlgorithmId
        if (graphId === "graph-bfs" || graphId === "graph-dfs") {
          run = runGraphTraversalAlgorithm(graphId, input)
        } else if (["dijkstra", "bellman-ford", "floyd-warshall", "spfa"].includes(graphId)) {
          run = runGraphShortestPathAlgorithm(graphId, input)
        } else if (graphId === "kruskal" || graphId === "prim") {
          run = runGraphMstAlgorithm(graphId, input)
        } else {
          run = runGraphTopologyAlgorithm(graphId, input)
        }
        break
      }
      case "data-structure":
        run = stubRun(algorithmId as string, input)
        break
      default:
        // Sets/combinatorics and other misc algorithms
        run = runSetsAlgorithm(algorithmId as string, input)
        break
    }

    const response: AlgorithmWorkerResponse = { requestId, ok: true, run }
    workerScope.postMessage(response)
  } catch (error) {
    const response: AlgorithmWorkerResponse = {
      requestId,
      ok: false,
      error: error instanceof Error ? error.message : "Algorithm execution failed.",
    }
    workerScope.postMessage(response)
  }
}
