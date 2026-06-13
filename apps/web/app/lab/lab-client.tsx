"use client"

import { algorithmsByCategory, CATEGORY_LABELS, CATEGORY_ORDER, DIFFICULTY_LABELS } from "@algomotion/algorithms"
import type {
  AlgorithmInputSchema,
  AlgorithmMeta,
  AlgorithmRun,
  AlgorithmWorkerRequest,
  AlgorithmWorkerResponse,
} from "@algomotion/shared"
import {
  Button,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
  Combobox,
  Label,
  LogoMark,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Slider,
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  Textarea,
} from "@algomotion/ui"
import {
  ArrayVisualizer,
  GraphVisualizer,
  TreeVisualizer,
  parseGraphInput,
  parseTreeInput,
  useTracePlayer,
  type TreeNode,
} from "@algomotion/visualizer"
import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

// ─── Language type ────────────────────────────────────────────────────────────

type Lang = "zh" | "en"

// ─── Translations ─────────────────────────────────────────────────────────────

const T = {
  zh: {
    backToHome: "返回官网",
    labTitle: "算法实验室",
    labSubtitle: "选择算法，输入数据，逐步检查每一个决定。",
    algorithmLabel: "算法",
    selectPlaceholder: "选择算法…",
    searchPlaceholder: "搜索算法…",
    noResults: "未找到匹配算法",
    inputArray: "输入数组",
    inputN: "输入 n",
    noInput: "该算法无需输入数据",
    binaryTreeLabel: "二叉树（层序输入）",
    binaryTreeHint: "LeetCode 层序格式，null 表示空节点",
    graphDirectedWeighted: "有向加权图（边列表）",
    graphDirected: "有向图（边列表）",
    graphWeighted: "加权图（边列表）",
    graphUndirected: "无向图（边列表）",
    hintDW: "0->1:4  (起点->终点:权重)",
    hintD: "0->1  (起点->终点，每行一条边)",
    hintW: "0 1 4  (节点A 节点B 权重)",
    hintU: "0 1  (节点A 节点B，每行一条边)",
    errAtLeastOne: "请至少输入一个数字。",
    errTooMany: "交互实验室最多展示 64 个数字。",
    errInvalidNum: "输入中包含无法识别的数字。",
    errValidNum: "请输入一个有效的数字。",
    errWorker: "Web Worker 启动失败，请刷新页面后重试。",
    errInput: "输入无效。",
    noTraceTitle: (name: string) => `此算法（${name}）暂无数组动画演示`,
    noTraceBody: "图算法、树算法、数据结构等需要专用可视化器，正在开发中。",
    conceptTitle: (name: string) => `此算法（${name}）为概念性数据结构`,
    conceptBody: "可视化器开发中，请查阅上方代码片段。",
    eventDefault: "运行算法后，这里会显示每一步的事件。",
    eventCompare: (idx: number[]) => `比较索引 ${idx.join(" 与 ")}`,
    eventSwap: (idx: number[]) => `交换索引 ${idx.join(" 与 ")}`,
    eventWrite: (i: number, v: number) => `写入索引 ${i}: ${v}`,
    eventMark: (role: string, idx: number[]) => `标记 ${role}: ${idx.join(", ")}`,
    eventRange: (b: number[]) => `处理区间 ${b.join(" → ")}`,
    eventDone: "算法执行完成。",
    running: "运行中…",
    run: "在 Worker 中运行",
    prev: "上一步",
    pause: "暂停",
    play: "播放",
    next: "下一步",
    reset: "复位",
    speed: "速度",
    stability: "稳定性",
    stable: "稳定",
    unstable: "不稳定",
    avgTime: "平均时间",
    space: "空间",
    statsLabel: "执行统计",
    compares: "比较",
    swaps: "交换",
    writes: "写入",
    memAccess: "内存访问",
  },
  en: {
    backToHome: "Home",
    labTitle: "Algorithm Lab",
    labSubtitle: "Select an algorithm, enter data, and inspect every decision.",
    algorithmLabel: "Algorithm",
    selectPlaceholder: "Select algorithm…",
    searchPlaceholder: "Search algorithms…",
    noResults: "No matching algorithms",
    inputArray: "Input Array",
    inputN: "Input n",
    noInput: "No input required for this algorithm",
    binaryTreeLabel: "Binary Tree (BFS order)",
    binaryTreeHint: "LeetCode level-order, null = empty node",
    graphDirectedWeighted: "Directed Weighted Graph (edge list)",
    graphDirected: "Directed Graph (edge list)",
    graphWeighted: "Weighted Graph (edge list)",
    graphUndirected: "Undirected Graph (edge list)",
    hintDW: "0->1:4  (from->to:weight)",
    hintD: "0->1  (from->to, one edge per line)",
    hintW: "0 1 4  (nodeA nodeB weight)",
    hintU: "0 1  (nodeA nodeB, one edge per line)",
    errAtLeastOne: "Enter at least one number.",
    errTooMany: "The lab supports up to 64 numbers.",
    errInvalidNum: "Input contains unrecognized numbers.",
    errValidNum: "Enter a valid number.",
    errWorker: "Worker failed to start. Please refresh the page.",
    errInput: "Invalid input.",
    noTraceTitle: (name: string) => `No array trace available for ${name}`,
    noTraceBody: "Graph, tree, and data structure visualizers are in development.",
    conceptTitle: (name: string) => `${name} is a conceptual data structure`,
    conceptBody: "Visualizer under development. See the code snippet above.",
    eventDefault: "Run the algorithm to see step-by-step events here.",
    eventCompare: (idx: number[]) => `Compare indices ${idx.join(" and ")}`,
    eventSwap: (idx: number[]) => `Swap indices ${idx.join(" and ")}`,
    eventWrite: (i: number, v: number) => `Write index ${i}: ${v}`,
    eventMark: (role: string, idx: number[]) => `Mark ${role}: ${idx.join(", ")}`,
    eventRange: (b: number[]) => `Process range ${b.join(" → ")}`,
    eventDone: "Algorithm complete.",
    running: "Running…",
    run: "Run in Worker",
    prev: "Prev",
    pause: "Pause",
    play: "Play",
    next: "Next",
    reset: "Reset",
    speed: "Speed",
    stability: "Stability",
    stable: "Stable",
    unstable: "Unstable",
    avgTime: "Avg. Time",
    space: "Space",
    statsLabel: "Execution Stats",
    compares: "Compares",
    swaps: "Swaps",
    writes: "Writes",
    memAccess: "Memory",
  },
} as const

// ─── Flat lookup map ─────────────────────────────────────────────────────────

const allAlgorithmsFlat: Record<string, AlgorithmMeta> = {}
for (const metas of Object.values(algorithmsByCategory)) {
  for (const meta of metas) {
    allAlgorithmsFlat[meta.id as string] = meta
  }
}

// ─── Parse array input ───────────────────────────────────────────────────────

function parseArrayInput(value: string, t: (typeof T)["zh"]): number[] {
  const values = value
    .split(/[\s,，]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number)

  if (values.length === 0) throw new Error(t.errAtLeastOne)
  if (values.length > 64) throw new Error(t.errTooMany)
  if (values.some((item) => !Number.isFinite(item))) throw new Error(t.errInvalidNum)
  return values
}

// ─── Derive worker payload from schema + raw input ───────────────────────────

function buildWorkerInput(schema: AlgorithmInputSchema | undefined, raw: string, t: (typeof T)["zh"]): number[] {
  if (!schema || schema.type === "array") {
    return parseArrayInput(raw, t)
  }
  if (schema.type === "single-number") {
    const n = Number(raw.trim())
    if (!Number.isFinite(n)) throw new Error(t.errValidNum)
    return [n]
  }
  if (schema.type === "graph") {
    // Encode graph as a flat array: [numNodes, numEdges, ...edges(from,to,weight?)]
    const { graph, error } = parseGraphInput(raw, schema.directed, schema.weighted)
    if (error) throw new Error(error)
    const nodeIds = graph.nodes.map((n) => n.id)
    const idxMap = new Map(nodeIds.map((id, i) => [id, i]))
    const flat: number[] = [graph.nodes.length, graph.edges.length]
    for (const e of graph.edges) {
      flat.push(idxMap.get(e.from) ?? 0)
      flat.push(idxMap.get(e.to) ?? 0)
      flat.push(e.weight ?? 1)
    }
    return flat
  }
  if (schema.type === "tree") {
    // Encode tree as BFS level-order values (null=-1)
    const { root } = parseTreeInput(raw)
    if (!root) return []
    const result: number[] = []
    const q: (TreeNode | null)[] = [root]
    while (q.length > 0) {
      const node = q.shift()!
      result.push(node ? Number(node.val) : -1)
      if (node) {
        q.push(node.left ?? null)
        q.push(node.right ?? null)
      }
    }
    return result
  }
  return []
}

// ─── AlgorithmInput component ─────────────────────────────────────────────────

interface AlgorithmInputProps {
  schema: AlgorithmInputSchema | undefined
  value: string
  onChange: (v: string) => void
  lang: Lang
}

function AlgorithmInput({ schema, value, onChange, lang }: AlgorithmInputProps) {
  const t = T[lang]

  if (!schema || schema.type === "array") {
    const label = schema?.type === "array" ? (schema.label?.[lang] ?? t.inputArray) : t.inputArray
    return (
      <Label className="flex-col items-start gap-1.5">
        {label}
        <Textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder={schema?.type === "array" ? schema.placeholder : "42, 17, 8, 99, 23"}
        />
      </Label>
    )
  }

  if (schema.type === "single-number") {
    return (
      <Label className="flex-col items-start gap-1.5">
        {schema.label?.[lang] ?? t.inputN}
        <input
          type="number"
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={0}
          max={99}
        />
      </Label>
    )
  }

  if (schema.type === "graph") {
    const hint = schema.directed ? (schema.weighted ? t.hintDW : t.hintD) : schema.weighted ? t.hintW : t.hintU
    const graphLabel = schema.directed
      ? schema.weighted
        ? t.graphDirectedWeighted
        : t.graphDirected
      : schema.weighted
        ? t.graphWeighted
        : t.graphUndirected
    return (
      <Label className="flex-col items-start gap-1.5">
        {graphLabel}
        <Textarea
          rows={6}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder={hint}
          className="font-mono text-[13px]"
        />
        <span className="text-[11px] opacity-50">{hint}</span>
      </Label>
    )
  }

  if (schema.type === "tree") {
    return (
      <Label className="flex-col items-start gap-1.5">
        {t.binaryTreeLabel}
        <input
          type="text"
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm font-mono outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1,2,3,null,null,4,5"
        />
        <span className="text-[11px] opacity-50">{t.binaryTreeHint}</span>
      </Label>
    )
  }

  // type === "none"
  return (
    <div className="rounded-lg border border-dashed border-input px-4 py-3 text-[13px] opacity-50">{t.noInput}</div>
  )
}

// ─── Visualizer section ───────────────────────────────────────────────────────

interface VisualizerSectionProps {
  schema: AlgorithmInputSchema | undefined
  inputText: string
  run: AlgorithmRun | null
  player: ReturnType<typeof useTracePlayer>
  currentMeta: AlgorithmMeta | undefined
  lang: Lang
}

function VisualizerSection({ schema, inputText, run, player, currentMeta, lang }: VisualizerSectionProps) {
  const t = T[lang]
  const name = currentMeta?.displayName[lang] ?? ""

  // Graph visualizer
  if (schema?.type === "graph") {
    const { graph } = parseGraphInput(inputText, schema.directed, schema.weighted)
    return (
      <div className="lab-stage-vis flex items-center justify-center min-h-[280px]">
        <GraphVisualizer data={graph} width={520} height={300} />
      </div>
    )
  }

  // Tree visualizer
  if (schema?.type === "tree") {
    const { root } = parseTreeInput(inputText)
    return (
      <div className="lab-stage-vis flex items-center justify-center min-h-[280px] overflow-x-auto">
        <TreeVisualizer root={root} width={520} height={300} />
      </div>
    )
  }

  // No input / data structure
  if (schema?.type === "none") {
    return (
      <div className="lab-no-trace flex items-center justify-center min-h-[280px]">
        <div className="text-center opacity-50">
          <p className="text-sm">{t.conceptTitle(name)}</p>
          <p className="text-xs mt-1">{t.conceptBody}</p>
        </div>
      </div>
    )
  }

  // Array / single-number → array visualizer
  if (run && run.trace.length === 0) {
    return (
      <div className="lab-no-trace">
        <p>🔍 {t.noTraceTitle(name)}</p>
        <p>{t.noTraceBody}</p>
      </div>
    )
  }

  return <ArrayVisualizer state={player.visualState} showValues />
}

// ─── LabClient ────────────────────────────────────────────────────────────────

export function LabClient() {
  const workerRef = useRef<Worker | null>(null)
  const pendingRequestRef = useRef<string | null>(null)
  const didInitialRunRef = useRef(false)
  const [lang, setLang] = useState<Lang>("zh")
  const [algorithmId, setAlgorithmId] = useState<string>("quick-sort")
  const [comboFilter, setComboFilter] = useState("")
  const [run, setRun] = useState<AlgorithmRun | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const t = T[lang]
  const currentMeta = allAlgorithmsFlat[algorithmId]
  const schema = currentMeta?.inputSchema

  // Input text state – resets when algorithm changes
  const [inputText, setInputText] = useState<string>(() => {
    if (!schema || schema.type === "array") return schema?.defaultValue ?? "42, 17, 8, 99, 23, 61, 4, 76, 35, 12"
    if (schema.type === "single-number") return String(schema.defaultValue ?? 10)
    if (schema.type === "graph") return schema.defaultValue ?? "0 1\n0 2\n1 3\n1 4\n2 5"
    if (schema.type === "tree") return schema.defaultValue ?? "1,2,3,4,5"
    return ""
  })

  // When algorithm changes, reset input to its default
  useEffect(() => {
    if (!schema) {
      setInputText("42, 17, 8, 99, 23, 61, 4, 76, 35, 12")
      return
    }
    if (schema.type === "array") setInputText(schema.defaultValue ?? "42, 17, 8, 99, 23, 61, 4, 76, 35, 12")
    else if (schema.type === "single-number") setInputText(String(schema.defaultValue ?? 10))
    else if (schema.type === "graph") setInputText(schema.defaultValue ?? "0 1\n0 2\n1 3")
    else if (schema.type === "tree") setInputText(schema.defaultValue ?? "1,2,3")
    else setInputText("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmId])

  const player = useTracePlayer({
    initialValues: run?.input ?? [],
    trace: run?.trace ?? [],
    intervalMs: 170,
  })

  const execute = useCallback(() => {
    // Clear previous run immediately so stale trace doesn't linger
    setRun(null)

    // For schema type "none" or "graph"/"tree" without trace: skip worker
    if (schema?.type === "none") return
    if (schema?.type === "graph" || schema?.type === "tree") return

    try {
      const input = buildWorkerInput(schema, inputText, t)
      const requestId = crypto.randomUUID()
      pendingRequestRef.current = requestId
      setError(null)
      setIsRunning(true)
      const request: AlgorithmWorkerRequest = { requestId, algorithmId: algorithmId as any, input }
      workerRef.current?.postMessage(request)
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : t.errInput)
    }
  }, [algorithmId, inputText, schema, t])

  useEffect(() => {
    const worker = new Worker(new URL("../../workers/algorithm.worker.ts", import.meta.url))
    workerRef.current = worker

    worker.onmessage = (event: MessageEvent<AlgorithmWorkerResponse>) => {
      if (event.data.requestId !== pendingRequestRef.current) return
      setIsRunning(false)
      if (event.data.ok) {
        setRun(event.data.run)
        setError(null)
      } else {
        setError(event.data.error)
      }
    }

    worker.onerror = () => {
      setIsRunning(false)
      setError(t.errWorker)
    }

    return () => worker.terminate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Initial run
  useEffect(() => {
    if (workerRef.current && !didInitialRunRef.current) {
      didInitialRunRef.current = true
      execute()
    }
  }, [execute])

  // Auto re-run on algorithm change
  useEffect(() => {
    if (!didInitialRunRef.current) return
    execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmId])

  const currentEvent = player.visualState.currentEvent
  const eventName = currentEvent?.type ?? "ready"
  const eventDescription = useMemo(() => {
    if (!currentEvent) return t.eventDefault
    if (currentEvent.type === "compare") return t.eventCompare(currentEvent.indices)
    if (currentEvent.type === "swap") return t.eventSwap(currentEvent.indices)
    if (currentEvent.type === "write") return t.eventWrite(currentEvent.index, currentEvent.value)
    if (currentEvent.type === "mark") return t.eventMark(currentEvent.role, currentEvent.indices)
    if (currentEvent.type === "range") return t.eventRange(currentEvent.bounds)
    return t.eventDone
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEvent, lang])

  // Whether to show transport controls
  const showTransport = schema?.type !== "graph" && schema?.type !== "tree" && schema?.type !== "none"

  const speed = [
    { label: "0.5x", value: 0.5 },
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "4x", value: 4 },
  ]

  const diffDot: Record<string, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-blue-500",
    advanced: "bg-orange-500",
    expert: "bg-red-500",
  }

  return (
    <main className="lab-shell">
      <header className="lab-nav">
        <Link className="lab-brand" href="/">
          <LogoMark className="lab-logo" />
          <span>AlgoMotion</span>
        </Link>
        <div>
          <span>Worker online</span>
          <button
            className="lab-lang-toggle"
            data-lang={lang}
            onClick={() => setLang((l) => (l === "zh" ? "en" : "zh"))}
            aria-label="Toggle language"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <Link href="/">{t.backToHome}</Link>
        </div>
      </header>

      <section className="lab-heading">
        <div>
          <p>TRACE-DRIVEN PLAYGROUND</p>
          <h1>{t.labTitle}</h1>
        </div>
        <p>{t.labSubtitle}</p>
      </section>

      <section className="lab-workspace">
        <aside className="lab-controls">
          <Label className="flex-col items-start gap-1.5">
            {t.algorithmLabel}
            <Combobox
              value={algorithmId}
              onValueChange={(v) => {
                if (v) {
                  setAlgorithmId(v as string)
                  setComboFilter("")
                }
              }}
              itemToStringLabel={(v) => {
                const m = allAlgorithmsFlat[v as string]
                return m ? `${m.displayName.zh} ${m.displayName.en}` : String(v)
              }}
            >
              <ComboboxTrigger className="w-full h-10 rounded-lg border border-input bg-transparent px-3 text-sm flex items-center justify-between gap-2">
                <ComboboxValue placeholder={t.selectPlaceholder}>
                  {(v) => {
                    const m = allAlgorithmsFlat[v as string]
                    return m ? m.displayName[lang] : String(v)
                  }}
                </ComboboxValue>
              </ComboboxTrigger>
              <ComboboxContent className="min-w-[22rem]">
                <ComboboxInput
                  placeholder={t.searchPlaceholder}
                  value={comboFilter}
                  onChange={(e) => setComboFilter((e.target as HTMLInputElement).value)}
                  showTrigger={false}
                />
                {comboFilter &&
                  !CATEGORY_ORDER.some((cat) => {
                    const metas = algorithmsByCategory[cat]
                    if (!metas || metas.length === 0) return false
                    const q = comboFilter.toLowerCase()
                    return metas.some(
                      (m) =>
                        m.displayName.zh.includes(q) ||
                        m.displayName.en.toLowerCase().includes(q) ||
                        (m.id as string).includes(q)
                    )
                  }) && <p className="py-2 text-center text-sm text-muted-foreground">{t.noResults}</p>}
                <ComboboxList className="min-h-96">
                  {CATEGORY_ORDER.map((category, index) => {
                    const metas = algorithmsByCategory[category]
                    if (!metas || metas.length === 0) return null
                    const q = comboFilter.toLowerCase()
                    const filtered = q
                      ? metas.filter(
                          (m) =>
                            m.displayName.zh.includes(q) ||
                            m.displayName.en.toLowerCase().includes(q) ||
                            (m.id as string).includes(q)
                        )
                      : metas
                    if (filtered.length === 0) return null
                    const catLabel = CATEGORY_LABELS[category]
                    return (
                      <ComboboxGroup key={category}>
                        <ComboboxLabel>{catLabel ? catLabel[lang] : category}</ComboboxLabel>
                        {filtered.map((meta) => {
                          if (!meta) return
                          const diff = meta.difficulty
                          // Short labels that fit the fixed-width cell (zh: 2-char, en: 3-char)
                          const diffShort: Record<string, { zh: string; en: string }> = {
                            beginner: { zh: "入门", en: "Beg" },
                            intermediate: { zh: "中级", en: "Int" },
                            advanced: { zh: "进阶", en: "Adv" },
                            expert: { zh: "专家", en: "Exp" },
                          }
                          return (
                            <ComboboxItem key={meta.id as string} value={meta.id as string}>
                              <Item size="xs" className="p-0">
                                <ItemContent>
                                  <ItemTitle>
                                    <span className="flex items-start gap-2 w-full">
                                      <span
                                        className={`mt-1 shrink-0 inline-block w-2 h-2 rounded-full ${diffDot[diff] ?? "bg-gray-400"}`}
                                      />
                                      <span className="mt-0.5 shrink-0 text-[11px] font-bold opacity-50 w-[2em] text-center tabular-nums">
                                        {diffShort[diff]?.[lang]}
                                      </span>
                                      <span className="mt-0.5 shrink-0 w-px self-stretch bg-current opacity-20" />
                                      <span className="truncate">{meta.displayName[lang]}</span>
                                    </span>
                                  </ItemTitle>
                                  <ItemDescription>{meta.description?.[lang]}</ItemDescription>
                                </ItemContent>
                              </Item>
                            </ComboboxItem>
                          )
                        })}
                        {index < CATEGORY_ORDER.length - 1 && <ComboboxSeparator />}
                      </ComboboxGroup>
                    )
                  })}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Label>

          {/* Dynamic input */}
          <AlgorithmInput schema={schema} value={inputText} onChange={setInputText} lang={lang} />

          {schema?.type !== "graph" && schema?.type !== "tree" && schema?.type !== "none" && (
            <Button disabled={isRunning} onClick={execute} size="lg">
              {isRunning ? t.running : t.run}
            </Button>
          )}

          {error ? (
            <p className="lab-error" role="alert">
              {error}
            </p>
          ) : null}

          <div className="lab-meta">
            <div>
              <span>{t.stability}</span>
              <strong>
                {currentMeta?.stable === true ? t.stable : currentMeta?.stable === false ? t.unstable : "—"}
              </strong>
            </div>
            <div>
              <span>{t.avgTime}</span>
              <strong>{currentMeta?.timeComplexity.average ?? "—"}</strong>
            </div>
            <div>
              <span>{t.space}</span>
              <strong>{currentMeta?.spaceComplexity ?? "—"}</strong>
            </div>
          </div>
        </aside>

        <div className="lab-stage">
          <div className="lab-stage-head">
            <div>
              <span className="live-dot" />
              {eventName}
            </div>
            <p>{eventDescription}</p>
          </div>

          <VisualizerSection
            schema={schema}
            inputText={inputText}
            run={run}
            player={player}
            currentMeta={currentMeta}
            lang={lang}
          />

          {showTransport && (
            <div className="lab-transport">
              <div className="lab-buttons">
                <Button
                  variant="ghost"
                  onClick={player.previous}
                  disabled={player.step === 0 || run?.trace.length === 0}
                >
                  {t.prev}
                </Button>
                {player.status === "running" ? (
                  <Button onClick={player.pause}>{t.pause}</Button>
                ) : (
                  <Button onClick={player.play} disabled={!run || run.trace.length === 0}>
                    {t.play}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  onClick={player.next}
                  disabled={player.step >= player.totalSteps || run?.trace.length === 0}
                >
                  {t.next}
                </Button>
                <Button variant="ghost" onClick={player.reset}>
                  {t.reset}
                </Button>
              </div>
              <Label className="lab-progress">
                <span>
                  {player.step} / {player.totalSteps}
                </span>
                <Slider
                  min={0}
                  max={Math.max(1, player.totalSteps)}
                  value={[player.step]}
                  onValueChange={(values) => player.seek(Array.isArray(values) ? (values[0] ?? 0) : values)}
                  disabled={run?.trace.length === 0}
                />
              </Label>
              <Label className="lab-speed">
                {t.speed}
                <Select items={speed} value={player.speed} onValueChange={(val) => player.setSpeed(val!)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Speed</SelectLabel>
                      {speed.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          )}
        </div>
      </section>

      <section className="lab-stats" aria-label={t.statsLabel}>
        {(
          [
            [t.compares, run?.stats.comparisons ?? 0],
            [t.swaps, run?.stats.swaps ?? 0],
            [t.writes, run?.stats.writes ?? 0],
            [t.memAccess, run?.stats.memoryAccesses ?? 0],
          ] as [string, number][]
        ).map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>
    </main>
  )
}
