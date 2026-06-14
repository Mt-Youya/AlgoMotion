import { Composition } from "remotion"
import { BubbleSortVideo } from "./compositions/sorting/bubble-sort"
import { SelectionSortVideo } from "./compositions/sorting/selection-sort"
import { InsertionSortVideo } from "./compositions/sorting/insertion-sort"
import { MergeSortVideo } from "./compositions/sorting/merge-sort"
import { QuickSortVideo } from "./compositions/sorting/quick-sort"
import { HeapSortVideo } from "./compositions/sorting/heap-sort"
import { ShellSortVideo } from "./compositions/sorting/shell-sort"
import { CountingSortVideo } from "./compositions/sorting/counting-sort"
import { RadixSortVideo } from "./compositions/sorting/radix-sort"
import { BucketSortVideo } from "./compositions/sorting/bucket-sort"
import { TimSortVideo } from "./compositions/sorting/tim-sort"
import { LinearSearchVideo } from "./compositions/search/linear-search"
import { BinarySearchVideo } from "./compositions/search/binary-search"
import { JumpSearchVideo } from "./compositions/search/jump-search"
import { InterpolationSearchVideo } from "./compositions/search/interpolation-search"
import { ExponentialSearchVideo } from "./compositions/search/exponential-search"
import { TernarySearchVideo } from "./compositions/search/ternary-search"
import { SieveOfEratosthenesVideo } from "./compositions/math/sieve-of-eratosthenes"
import { GcdLcmVideo } from "./compositions/math/gcd-lcm"
import { FastPowerVideo } from "./compositions/math/fast-power"
import { PrimeFactorizationVideo } from "./compositions/math/prime-factorization"
import { PascalTriangleVideo } from "./compositions/math/pascal-triangle"
import { BitManipulationVideo } from "./compositions/math/bit-manipulation"
import { DftVideo } from "./compositions/math/dft"
import { CartesianProductVideo } from "./compositions/math/cartesian-product"
import { FisherYatesShuffleVideo } from "./compositions/math/fisher-yates-shuffle"
import { PopcountVideo } from "./compositions/bit-manipulation/popcount"
import { SingleNumberVideo } from "./compositions/bit-manipulation/single-number"
import { PowerOfTwoVideo } from "./compositions/bit-manipulation/power-of-two"
import { ReverseBitsVideo } from "./compositions/bit-manipulation/reverse-bits"
import { TwoSumPointersVideo } from "./compositions/two-pointers/two-sum-pointers"
import { ThreeSumVideo } from "./compositions/two-pointers/three-sum"
import { SlidingWindowMaxVideo } from "./compositions/two-pointers/sliding-window-max"
import { MinWindowSubstringVideo } from "./compositions/two-pointers/min-window-substring"
import { LongestNoRepeatVideo } from "./compositions/two-pointers/longest-no-repeat"
import { TrappingRainWaterVideo } from "./compositions/two-pointers/trapping-rain-water"
import { KmpVideo } from "./compositions/string/kmp"
import { RabinKarpVideo } from "./compositions/string/rabin-karp"
import { ZAlgorithmVideo } from "./compositions/string/z-algorithm"
import { AhoCorasickVideo } from "./compositions/string/aho-corasick"
import { ManacherVideo } from "./compositions/string/manacher"
import { SuffixArrayVideo } from "./compositions/string/suffix-array"
import { HammingDistanceVideo } from "./compositions/string/hamming-distance"
import { FibonacciVideo } from "./compositions/dynamic-programming/fibonacci"
import { ClimbingStairsVideo } from "./compositions/dynamic-programming/climbing-stairs"
import { CoinChangeVideo } from "./compositions/dynamic-programming/coin-change"
import { HouseRobberVideo } from "./compositions/dynamic-programming/house-robber"
import { JumpGameVideo } from "./compositions/dynamic-programming/jump-game"
import { MaxSubarrayVideo } from "./compositions/dynamic-programming/max-subarray"
import { Knapsack01Video } from "./compositions/dynamic-programming/knapsack-01"
import { KnapsackUnboundedVideo } from "./compositions/dynamic-programming/knapsack-unbounded"
import { LcsVideo } from "./compositions/dynamic-programming/lcs"
import { EditDistanceVideo } from "./compositions/dynamic-programming/edit-distance"
import { UniquePathsVideo } from "./compositions/dynamic-programming/unique-paths"
import { TriangleVideo } from "./compositions/dynamic-programming/triangle"
import { MinPathSumVideo } from "./compositions/dynamic-programming/min-path-sum"
import { LisVideo } from "./compositions/dynamic-programming/lis"
import { PalindromeDpVideo } from "./compositions/dynamic-programming/palindrome-dp"
import { WordBreakVideo } from "./compositions/dynamic-programming/word-break"
import { MatrixChainVideo } from "./compositions/dynamic-programming/matrix-chain"
import { BurstBalloonsVideo } from "./compositions/dynamic-programming/burst-balloons"
import { TreeDpDiameterVideo } from "./compositions/dynamic-programming/tree-dp-diameter"
import { TreeDpMaxPathVideo } from "./compositions/dynamic-programming/tree-dp-max-path"
import { LongestCommonSubstringVideo } from "./compositions/dynamic-programming/longest-common-substring"
import { NQueensVideo } from "./compositions/backtracking/n-queens"
import { SudokuSolverVideo } from "./compositions/backtracking/sudoku-solver"
import { PermutationsVideo } from "./compositions/backtracking/permutations"
import { SubsetsVideo } from "./compositions/backtracking/subsets"
import { CombinationSumVideo } from "./compositions/backtracking/combination-sum"
import { WordSearchVideo } from "./compositions/backtracking/word-search"
import { KnightsTourVideo } from "./compositions/backtracking/knights-tour"
import { PowerSetVideo } from "./compositions/backtracking/power-set"
import { CombinationsVideo } from "./compositions/backtracking/combinations"
import { ActivitySelectionVideo } from "./compositions/greedy/activity-selection"
import { FractionalKnapsackVideo } from "./compositions/greedy/fractional-knapsack"
import { HuffmanCodingVideo } from "./compositions/greedy/huffman-coding"
import { IntervalSchedulingVideo } from "./compositions/greedy/interval-scheduling"
import { BestTimeStockVideo } from "./compositions/greedy/best-time-stock"
import { TreeInorderVideo } from "./compositions/tree/tree-inorder"
import { TreePreorderVideo } from "./compositions/tree/tree-preorder"
import { TreePostorderVideo } from "./compositions/tree/tree-postorder"
import { TreeLevelOrderVideo } from "./compositions/tree/tree-level-order"
import { TreeHeightVideo } from "./compositions/tree/tree-height"
import { TreeLcaVideo } from "./compositions/tree/tree-lca"
import { TreeSerializeVideo } from "./compositions/tree/tree-serialize"
import { ArrayVideo } from "./compositions/data-structure/array"
import { LinkedListVideo } from "./compositions/data-structure/linked-list"
import { DoublyLinkedListVideo } from "./compositions/data-structure/doubly-linked-list"
import { StackVideo } from "./compositions/data-structure/stack"
import { QueueVideo } from "./compositions/data-structure/queue"
import { DequeVideo } from "./compositions/data-structure/deque"
import { CircularQueueVideo } from "./compositions/data-structure/circular-queue"
import { HashTableVideo } from "./compositions/data-structure/hash-table"
import { HashMapChainingVideo } from "./compositions/data-structure/hash-map-chaining"
import { HashMapOpenAddressingVideo } from "./compositions/data-structure/hash-map-open-addressing"
import { BinaryTreeVideo } from "./compositions/data-structure/binary-tree"
import { BinarySearchTreeVideo } from "./compositions/data-structure/binary-search-tree"
import { AvlTreeVideo } from "./compositions/data-structure/avl-tree"
import { RedBlackTreeVideo } from "./compositions/data-structure/red-black-tree"
import { SegmentTreeVideo } from "./compositions/data-structure/segment-tree"
import { FenwickTreeVideo } from "./compositions/data-structure/fenwick-tree"
import { TrieVideo } from "./compositions/data-structure/trie"
import { HeapMinVideo } from "./compositions/data-structure/heap-min"
import { HeapMaxVideo } from "./compositions/data-structure/heap-max"
import { PriorityQueueVideo } from "./compositions/data-structure/priority-queue"
import { DisjointSetVideo } from "./compositions/data-structure/disjoint-set"
import { BloomFilterVideo } from "./compositions/data-structure/bloom-filter"
import { LruCacheVideo } from "./compositions/data-structure/lru-cache"
import { MonotonicStackVideo } from "./compositions/data-structure/monotonic-stack"
import { MonotonicQueueVideo } from "./compositions/data-structure/monotonic-queue"
import { GraphAdjacencyListVideo } from "./compositions/data-structure/graph-adjacency-list"
import { GraphAdjacencyMatrixVideo } from "./compositions/data-structure/graph-adjacency-matrix"
import { GraphBfsVideo } from "./compositions/graph/graph-bfs"
import { GraphDfsVideo } from "./compositions/graph/graph-dfs"
import { DijkstraVideo } from "./compositions/graph/dijkstra"
import { BellmanFordVideo } from "./compositions/graph/bellman-ford"
import { FloydWarshallVideo } from "./compositions/graph/floyd-warshall"
import { SpfaVideo } from "./compositions/graph/spfa"
import { KruskalVideo } from "./compositions/graph/kruskal"
import { PrimVideo } from "./compositions/graph/prim"
import { TopologicalSortVideo } from "./compositions/graph/topological-sort"
import { TarjanSccVideo } from "./compositions/graph/tarjan-scc"
import { KosarajuSccVideo } from "./compositions/graph/kosaraju-scc"
import { ArticulationPointsVideo } from "./compositions/graph/articulation-points"
import { BridgesVideo } from "./compositions/graph/bridges"
import { EulerianPathVideo } from "./compositions/graph/eulerian-path"
import { HamiltonianCycleVideo } from "./compositions/graph/hamiltonian-cycle"

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="bubble-sort"
        component={BubbleSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="selection-sort"
        component={SelectionSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="insertion-sort"
        component={InsertionSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="merge-sort"
        component={MergeSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="quick-sort"
        component={QuickSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="heap-sort"
        component={HeapSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="shell-sort"
        component={ShellSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="counting-sort"
        component={CountingSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="radix-sort"
        component={RadixSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="bucket-sort"
        component={BucketSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tim-sort"
        component={TimSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="linear-search"
        component={LinearSearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="binary-search"
        component={BinarySearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="jump-search"
        component={JumpSearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="interpolation-search"
        component={InterpolationSearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="exponential-search"
        component={ExponentialSearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="ternary-search"
        component={TernarySearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="sieve-of-eratosthenes"
        component={SieveOfEratosthenesVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="gcd-lcm"
        component={GcdLcmVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="fast-power"
        component={FastPowerVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="prime-factorization"
        component={PrimeFactorizationVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="pascal-triangle"
        component={PascalTriangleVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="bit-manipulation"
        component={BitManipulationVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="dft"
        component={DftVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="cartesian-product"
        component={CartesianProductVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="fisher-yates-shuffle"
        component={FisherYatesShuffleVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="popcount"
        component={PopcountVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="single-number"
        component={SingleNumberVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="power-of-two"
        component={PowerOfTwoVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="reverse-bits"
        component={ReverseBitsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="two-sum-pointers"
        component={TwoSumPointersVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="three-sum"
        component={ThreeSumVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="sliding-window-max"
        component={SlidingWindowMaxVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="min-window-substring"
        component={MinWindowSubstringVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="longest-no-repeat"
        component={LongestNoRepeatVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="trapping-rain-water"
        component={TrappingRainWaterVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="kmp"
        component={KmpVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="rabin-karp"
        component={RabinKarpVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="z-algorithm"
        component={ZAlgorithmVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="aho-corasick"
        component={AhoCorasickVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="manacher"
        component={ManacherVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="suffix-array"
        component={SuffixArrayVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="hamming-distance"
        component={HammingDistanceVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="fibonacci"
        component={FibonacciVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="climbing-stairs"
        component={ClimbingStairsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="coin-change"
        component={CoinChangeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="house-robber"
        component={HouseRobberVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="jump-game"
        component={JumpGameVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="max-subarray"
        component={MaxSubarrayVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="knapsack-01"
        component={Knapsack01Video}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="knapsack-unbounded"
        component={KnapsackUnboundedVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="lcs"
        component={LcsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="edit-distance"
        component={EditDistanceVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="unique-paths"
        component={UniquePathsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="triangle"
        component={TriangleVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="min-path-sum"
        component={MinPathSumVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="lis"
        component={LisVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="palindrome-dp"
        component={PalindromeDpVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="word-break"
        component={WordBreakVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="matrix-chain"
        component={MatrixChainVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="burst-balloons"
        component={BurstBalloonsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-dp-diameter"
        component={TreeDpDiameterVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-dp-max-path"
        component={TreeDpMaxPathVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="longest-common-substring"
        component={LongestCommonSubstringVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="n-queens"
        component={NQueensVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="sudoku-solver"
        component={SudokuSolverVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="permutations"
        component={PermutationsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="subsets"
        component={SubsetsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="combination-sum"
        component={CombinationSumVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="word-search"
        component={WordSearchVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="knights-tour"
        component={KnightsTourVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="power-set"
        component={PowerSetVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="combinations"
        component={CombinationsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="activity-selection"
        component={ActivitySelectionVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="fractional-knapsack"
        component={FractionalKnapsackVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="huffman-coding"
        component={HuffmanCodingVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="interval-scheduling"
        component={IntervalSchedulingVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="best-time-stock"
        component={BestTimeStockVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-inorder"
        component={TreeInorderVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-preorder"
        component={TreePreorderVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-postorder"
        component={TreePostorderVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-level-order"
        component={TreeLevelOrderVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-height"
        component={TreeHeightVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-lca"
        component={TreeLcaVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tree-serialize"
        component={TreeSerializeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="array"
        component={ArrayVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="linked-list"
        component={LinkedListVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="doubly-linked-list"
        component={DoublyLinkedListVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="stack"
        component={StackVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="queue"
        component={QueueVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="deque"
        component={DequeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="circular-queue"
        component={CircularQueueVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="hash-table"
        component={HashTableVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="hash-map-chaining"
        component={HashMapChainingVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="hash-map-open-addressing"
        component={HashMapOpenAddressingVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="binary-tree"
        component={BinaryTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="binary-search-tree"
        component={BinarySearchTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="avl-tree"
        component={AvlTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="red-black-tree"
        component={RedBlackTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="segment-tree"
        component={SegmentTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="fenwick-tree"
        component={FenwickTreeVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="trie"
        component={TrieVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="heap-min"
        component={HeapMinVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="heap-max"
        component={HeapMaxVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="priority-queue"
        component={PriorityQueueVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="disjoint-set"
        component={DisjointSetVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="bloom-filter"
        component={BloomFilterVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="lru-cache"
        component={LruCacheVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="monotonic-stack"
        component={MonotonicStackVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="monotonic-queue"
        component={MonotonicQueueVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="graph-adjacency-list"
        component={GraphAdjacencyListVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="graph-adjacency-matrix"
        component={GraphAdjacencyMatrixVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="graph-bfs"
        component={GraphBfsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="graph-dfs"
        component={GraphDfsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="dijkstra"
        component={DijkstraVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="bellman-ford"
        component={BellmanFordVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="floyd-warshall"
        component={FloydWarshallVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="spfa"
        component={SpfaVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="kruskal"
        component={KruskalVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="prim"
        component={PrimVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="topological-sort"
        component={TopologicalSortVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="tarjan-scc"
        component={TarjanSccVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="kosaraju-scc"
        component={KosarajuSccVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="articulation-points"
        component={ArticulationPointsVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="bridges"
        component={BridgesVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="eulerian-path"
        component={EulerianPathVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
      <Composition
        id="hamiltonian-cycle"
        component={HamiltonianCycleVideo}
        durationInFrames={27000}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  )
}
