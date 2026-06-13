"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { bubbleSort } from "@algomotion/algorithms"
import { useTracePlayer } from "@algomotion/visualizer"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const initialBars = [31, 54, 22, 76, 42, 91, 63, 35, 84, 48, 69, 27, 58, 96, 73, 39]
const graphNodes = [
  [70, 124],
  [180, 55],
  [282, 96],
  [390, 45],
  [455, 132],
  [354, 205],
  [222, 190],
] as const

const algorithmChapters = [
  {
    name: "Quick sort",
    description: "Pivot 选择、分区边界和交换过程同步发生。你看到的不是装饰，而是算法真实的决策轨迹。",
    accent: "signal",
    bars: [28, 42, 56, 66, 74, 82, 90],
  },
  {
    name: "Graph search",
    description: "从 frontier 到 visited，每个节点的状态变化都能暂停、倒退，并与代码行一一对应。",
    accent: "coral",
    nodes: true,
  },
  {
    name: "Dynamic programming",
    description: "让状态转移不再藏在二维数组里。表格填充、依赖关系与最优解路径在同一时间轴上展开。",
    accent: "cobalt",
    matrix: true,
  },
]

const manifesto = "算法不是一段等待背诵的代码。它是一连串可以被看见、暂停、质疑和重新播放的决定。"

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  )
}

function LogoMark() {
  return (
    <svg aria-hidden="true" className="logo-mark" viewBox="0 0 32 32">
      <path d="M4 25 10 9l6 12 5-16 7 20" />
      <circle cx="10" cy="9" r="2" />
      <circle cx="16" cy="21" r="2" />
      <circle cx="21" cy="5" r="2" />
    </svg>
  )
}

function SortingStage() {
  const [input, setInput] = useState(initialBars)
  const lastDisturbance = useRef(0)
  const run = useMemo(() => bubbleSort(input), [input])
  const player = useTracePlayer({
    initialValues: run.input,
    trace: run.trace,
    autoplay: true,
    intervalMs: 120,
  })
  const comparisons = useMemo(
    () => run.trace.slice(0, player.step).filter((event) => event.type === "compare").length,
    [player.step, run.trace]
  )

  const disturb = useCallback(
    (index: number) => {
      const now = performance.now()
      if (now - lastDisturbance.current < 110) return
      lastDisturbance.current = now

      setInput(() => {
        const next = [...player.visualState.values]
        const target = Math.max(0, Math.min(next.length - 1, index + (index % 2 === 0 ? 3 : -3)))
        const sourceValue = next[index]
        const targetValue = next[target]
        if (sourceValue === undefined || targetValue === undefined) return next
        next[index] = targetValue
        next[target] = sourceValue
        return next
      })
    },
    [player.visualState.values]
  )

  const reset = useCallback(() => {
    setInput([...initialBars].sort((a, b) => a - b))
  }, [])

  return (
    <div className="sorting-stage" aria-label="可交互排序算法演示">
      <div className="stage-head">
        <div>
          <span className="live-dot" />
          LIVE TRACE
        </div>
        <button type="button" onClick={reset}>
          RESET ORDER
        </button>
      </div>

      <div
        className="bars"
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const index = Math.floor(((event.clientX - bounds.left) / bounds.width) * player.visualState.values.length)
          if (index >= 0 && index < player.visualState.values.length) disturb(index)
        }}
      >
        {player.visualState.values.map((height, index) => {
          const isActive = player.visualState.activeIndices.includes(index)
          return (
            <div
              className={`bar ${isActive ? "is-active" : ""}`}
              key={`${index}-${height}`}
              style={{ height: `${height}%` }}
            >
              <span>{height}</span>
            </div>
          )
        })}
      </div>

      <div className="stage-footer">
        <div>
          <span>algorithm</span>
          <strong>bubble.sort()</strong>
        </div>
        <div>
          <span>comparisons</span>
          <strong>{comparisons}</strong>
        </div>
        <div>
          <span>status</span>
          <strong>{player.status === "completed" ? "ordered" : "sorting"}</strong>
        </div>
      </div>
    </div>
  )
}

function MiniTrace() {
  return (
    <div className="mini-trace" aria-hidden="true">
      {[26, 48, 35, 71, 57, 86, 64].map((height, index) => (
        <i key={height} style={{ height: `${height}%`, animationDelay: `${index * -0.14}s` }} />
      ))}
    </div>
  )
}

function GraphVisual() {
  return (
    <svg aria-hidden="true" className="graph-visual" viewBox="0 0 520 250">
      <g className="graph-lines">
        <path d="M70 124 180 55 282 96 390 45 455 132 354 205 222 190 70 124Z" />
        <path d="m180 55 42 135 60-94 72 109 36-160" />
        <path d="m70 124 212-28 173 36" />
      </g>
      {graphNodes.map(([cx, cy], index) => (
        <g className={`graph-node node-${index}`} key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="19" />
          <text x={cx} y={cy + 5}>
            {String.fromCharCode(65 + index)}
          </text>
        </g>
      ))}
    </svg>
  )
}

function MatrixVisual() {
  return (
    <div className="matrix-visual" aria-hidden="true">
      {Array.from({ length: 24 }, (_, index) => (
        <i
          className={index === 18 || index === 13 || index === 8 ? "path-cell" : ""}
          key={index}
          style={{ animationDelay: `${index * 55}ms` }}
        >
          {index % 5}
        </i>
      ))}
    </div>
  )
}

function ChapterVisual({ chapter }: { chapter: (typeof algorithmChapters)[number] }) {
  if (chapter.nodes) return <GraphVisual />
  if (chapter.matrix) return <MatrixVisual />

  return (
    <div className="chapter-bars" aria-hidden="true">
      {chapter.bars?.map((height) => (
        <i key={height} style={{ height: `${height}%` }} />
      ))}
    </div>
  )
}

export default function Home() {
  const root = useRef<HTMLElement>(null)
  const words = useMemo(() => manifesto.split(""), [])

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (reducedMotion) return

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
      intro
        .from(".nav-shell", { y: -30, opacity: 0, duration: 0.8 })
        .from(".hero-line", { yPercent: 110, duration: 1.1, stagger: 0.1 }, "-=0.35")
        .from(".hero-copy, .hero-actions", { y: 24, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.65")
        .from(".sorting-stage", { x: 80, rotate: 2, opacity: 0, duration: 1.1 }, "-=0.85")

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
          },
          y: 64,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        })
      })

      gsap.matchMedia().add("(min-width: 900px)", () => {
        ScrollTrigger.create({
          trigger: ".story-grid",
          start: "top 12%",
          end: "bottom 78%",
          pin: ".story-index",
          pinSpacing: false,
        })
      })

      gsap.from(".manifesto-word", {
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 78%",
          end: "bottom 48%",
          scrub: 0.8,
        },
        opacity: 0.08,
        stagger: 0.045,
      })

      gsap.utils.toArray<HTMLElement>(".chapter-card").forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              end: "top 45%",
              scrub: true,
            },
          }
        )
      })
    },
    { scope: root }
  )

  return (
    <main ref={root} className="site-shell">
      <header className="nav-wrap">
        <nav className="nav-shell" aria-label="主导航">
          <a className="brand" href="#top" aria-label="AlgoMotion 首页">
            <LogoMark />
            <span>AlgoMotion</span>
          </a>
          <div className="nav-links">
            <a href="#explore">算法实验室</a>
            <a href="#story">工作原理</a>
            <a href="#platforms">多端体验</a>
          </div>
          <a className="nav-cta" href="/lab">
            开始运行
            <ArrowIcon />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-content">
            <p className="hero-kicker">RUN IT. WATCH IT. GET IT.</p>
            <h1>
              <span className="hero-mask">
                <span className="hero-line">看得见的算法，</span>
              </span>
              <span className="hero-mask second-line">
                <span className="hero-line">
                  终于
                  <span className="inline-algorithm" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  讲得清。
                </span>
              </span>
            </h1>
            <p className="hero-copy">直接运行真实算法，把每一次比较、交换和访问变成可以暂停、倒退和触摸的动画。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/lab">
                打开算法实验室
                <ArrowIcon />
              </a>
              <a className="button button-secondary" href="#story">
                看它如何工作
              </a>
            </div>
          </div>
          <SortingStage />
          <p className="stage-hint">MOVE YOUR POINTER THROUGH THE ARRAY</p>
        </div>
      </section>

      <div className="marquee" aria-label="支持的算法类型">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" aria-hidden={group === 1} key={group}>
              <span>Sorting</span>
              <i />
              <span>Graphs</span>
              <i />
              <span>Search</span>
              <i />
              <span>Dynamic Programming</span>
              <i />
              <span>Data Structures</span>
              <i />
            </div>
          ))}
        </div>
      </div>

      <section className="capabilities" id="explore">
        <div className="section-intro reveal">
          <h2>
            不是播放动画。
            <br />
            是进入算法内部。
          </h2>
          <p>同一份 trace 事件流连接执行结果、交互动画、代码高亮与视频输出。每一层都来自真实运行状态。</p>
        </div>

        <div className="bento-grid">
          <article className="bento bento-trace reveal">
            <div className="bento-copy">
              <span className="eyebrow">STEP TRACER</span>
              <h3>每个决定，都留下可回放的轨迹。</h3>
              <p>compare、swap、visit、relax。统一事件协议让算法逻辑与表现层彻底解耦。</p>
            </div>
            <div className="trace-console" aria-label="算法事件流示例">
              <div>
                <span>00:12.40</span>
                <strong>compare</strong>
                <code>[6, 7]</code>
              </div>
              <div className="current">
                <span>00:12.56</span>
                <strong>swap</strong>
                <code>[6, 7]</code>
              </div>
              <div>
                <span>00:12.72</span>
                <strong>write</strong>
                <code>array[6]</code>
              </div>
              <div>
                <span>00:12.88</span>
                <strong>commit</strong>
                <code>partition</code>
              </div>
            </div>
          </article>

          <article className="bento bento-video reveal">
            <div className="video-topline">
              <span className="eyebrow">REMOTION OUTPUT</span>
              <span>00:18 / 01:24</span>
            </div>
            <MiniTrace />
            <div className="video-copy">
              <h3>网页里看见的，也能成为一支教学视频。</h3>
              <p>共享组件与 trace 数据，不维护第二套动画。</p>
            </div>
          </article>

          <article className="bento bento-code reveal">
            <span className="eyebrow">SYNCHRONIZED CODE</span>
            <div className="code-lines" aria-label="同步代码高亮示例">
              <span>
                <i>7</i> while (left &lt; right) &#123;
              </span>
              <span className="highlight">
                <i>8</i> if (a[left] &gt; pivot)
              </span>
              <span>
                <i>9</i> swap(a, left, right)
              </span>
              <span>
                <i>10</i> right--
              </span>
              <span>
                <i>11</i> &#125;
              </span>
            </div>
          </article>

          <article className="bento bento-runtime reveal">
            <span className="eyebrow">RUN ANYWHERE</span>
            <h3>一套核心，六个平台。</h3>
            <div className="platform-stack" id="platforms">
              <span>WEB</span>
              <span>MAC</span>
              <span>WIN</span>
              <span>LINUX</span>
              <span>IOS</span>
              <span>ANDROID</span>
            </div>
          </article>

          <article className="bento bento-performance reveal">
            <span className="eyebrow">TWO-SPEED ENGINE</span>
            <h3>轻巧用 TS，重计算交给 Rust。</h3>
            <div className="engine-diagram">
              <span>TypeScript</span>
              <i />
              <strong>TRACE</strong>
              <i />
              <span>Rust / WASM</span>
            </div>
          </article>
        </div>
      </section>

      <section className="story" id="story">
        <div className="story-grid">
          <div className="story-index">
            <p className="eyebrow">ONE LANGUAGE, MANY IDEAS</p>
            <h2>
              不同算法，
              <br />
              同一种理解方式。
            </h2>
            <p className="story-note">
              从数组到图，从递归到动态规划，交互语言保持一致。你只需要专注于这一步为什么发生。
            </p>
          </div>

          <div className="chapters">
            {algorithmChapters.map((chapter) => (
              <article className={`chapter-card ${chapter.accent}`} key={chapter.name}>
                <div className="chapter-number">{String(algorithmChapters.indexOf(chapter) + 1).padStart(2, "0")}</div>
                <ChapterVisual chapter={chapter} />
                <div className="chapter-copy">
                  <h3>{chapter.name}</h3>
                  <p>{chapter.description}</p>
                  <a href="/lab">
                    打开演示
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="accordion-section">
        <div className="accordion-heading reveal">
          <h2>
            你控制节奏，
            <br />
            不是动画控制你。
          </h2>
          <p>播放、暂停、单步、倒退、变速。理解发生在你准备好的那一刻。</p>
        </div>
        <div className="horizontal-accordion reveal">
          {[
            ["PLAY", "让事件流按真实执行顺序展开。"],
            ["STEP", "一次只看一个决策，不跳过中间状态。"],
            ["REWIND", "回到误解发生之前，重新建立因果。"],
            ["EXPORT", "把同一段过程输出为可分享的视频。"],
          ].map(([title, copy], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className="accordion-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
              <div className="accordion-glyph" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto">
        <p aria-label={manifesto}>
          {words.map((word, index) => (
            <span className="manifesto-word" aria-hidden="true" key={`${word}-${index}`}>
              {word}
            </span>
          ))}
        </p>
      </section>

      <section className="launch" id="launch">
        <div className="launch-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="launch-content reveal">
          <p>YOUR NEXT ALGORITHM STARTS MOVING HERE.</p>
          <h2>
            别只读懂它。
            <br />
            亲手运行它。
          </h2>
          <a className="button button-launch" href="/lab">
            启动 AlgoMotion
            <ArrowIcon />
          </a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <LogoMark />
          <span>AlgoMotion</span>
        </a>
        <p>看得见的算法。为 Web、桌面与移动端而生。</p>
        <div>
          <a href="#explore">Algorithms</a>
          <a href="#story">How it works</a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <small>MIT © 2026 AlgoMotion</small>
      </footer>
    </main>
  )
}
