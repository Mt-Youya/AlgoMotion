# AlgoMotion 🎬

> **看得见的算法。** 一个全平台算法学习与可视化平台 —— 在浏览器、桌面和手机上直接运行算法、观看逐帧动画、配套视频讲解。

**Run it. Watch it. Get it.**

| 平台                       | 技术                  | 状态                   |
| -------------------------- | --------------------- | ---------------------- |
| 🌐 Web(浏览器)             | Next.js 16 + React 19 | ✅ 官网 + 排序实验室   |
| 🖥️ macOS / Windows / Linux | Tauri v2              | ✅ 工程骨架            |
| 📱 iOS / Android           | Tauri v2 Mobile       | 🚧 等待平台 SDK 初始化 |

---

## ✨ 核心特性

### 1. 算法即开即跑(Run in Place)

- 所有算法**直接在端上执行**,无需后端:TypeScript 实现跑在主线程外的 Web Worker,性能敏感的算法(图论、矩阵、大规模排序)由 **Rust 编译为 WASM** 执行
- 输入自定义数据 → 一键运行 → 实时输出结果、复杂度统计(比较次数 / 交换次数 / 内存访问)

### 2. 逐帧动画可视化(Step Tracer)

- 算法核心不直接画图,而是产出一条**事件流(trace events)**:`compare(i, j)`、`swap(i, j)`、`visit(node)`、`relax(edge)`……
- 可视化层订阅事件流渲染动画,支持**播放 / 暂停 / 单步 / 倒退 / 变速 / 拖拽进度条**
- 同一份 trace 同时驱动:网页动画(Motion/Canvas)、代码行高亮、变量面板、Remotion 视频导出

### 3. 视频讲解双管线

- **Remotion**:用 React 组件写视频,与网页可视化共享同一套组件和 trace 数据 —— 网页里看到的动画可以直接渲染成 MP4 教学视频
- **Manim**:数学推导类内容(复杂度证明、递归树展开、主定理)用 Manim 渲染,学院派质感
- 每个算法详情页 = 交互可视化 + 视频讲解 + 代码多语言对照(TS / Rust / Python)

### 4. 首页必须有趣 🎡

首页不是落地页,是一个**正在呼吸的算法宇宙**:

- Hero 区域是一个**实时运行的可交互演示**(例如:访客鼠标搅乱一个数组,排序算法实时追着把它排回去;或粒子按 A\* 寻路绕开你的光标)
- 滚动即叙事:每滚动一屏,一个算法类别以标志性动画登场
- 设计遵循 `frontend-design` / `impeccable` / `baseline-ui` / `taste` skills 的审美基线:克制的整体 + 一处惊艳的 signature element

---

## 🏗️ 架构

pnpm + Turborepo Monorepo:

```
algomotion/
├── apps/
│   ├── web/                  # Next.js 16 (App Router, RSC, Turbopack)
│   ├── desktop/              # Tauri v2 桌面端 (mac / win / linux)
│   └── mobile/               # Expo ReactNative Mobile (iOS / Android)
│
├── packages/
│   ├── algorithms/           # @algomotion/algorithms — 纯 TS 算法核心 + Step Tracer
│   ├── algo-wasm/            # @algomotion/algo-wasm — Rust 算法 → WASM (wasm-bindgen)
│   ├── visualizer/           # @algomotion/visualizer — 动画引擎 (Canvas/SVG + Motion)
│   ├── ui/                   # @algomotion/ui — 设计系统 (Tailwind v4 + shadcn/ui)
│   ├── videos/               # @algomotion/videos — Remotion compositions
│   └── shared/               # 类型、常量、trace 事件协议
│
├── tools/
│   ├── manim/                # Python + Manim 视频渲染管线
│   └── scripts/              # 构建 / 发布 / 视频批量渲染脚本
│
├── pnpm-workspace.yaml
├── turbo.json                 # workspace 任务编排与缓存
├── tsconfig.base.json         # 共享严格 TypeScript 配置
├── .oxfmtrc.json              # oxc format
└── .oxlintrc.json             # oxc lint
```

### 数据流(核心设计)

```
┌─────────────┐    trace events    ┌──────────────┐
│  Algorithm   │ ─────────────────▶ │  Visualizer  │──▶ 网页交互动画
│  (TS / WASM) │  compare/swap/...  │  (订阅渲染)   │──▶ 代码行高亮
└─────────────┘                    └──────┬───────┘
      │ 在 Web Worker 中执行              │ 同一份 trace
      ▼                                  ▼
   运行结果 + 复杂度统计            Remotion → MP4 教学视频
```

**一份算法实现,四种产出**:运行结果、交互动画、代码同步高亮、可导出视频。

---

## 🧰 技术栈

| 层          | 选型                                                 |
| ----------- | ---------------------------------------------------- |
| Web 框架    | Next.js 16 · React 19 · TypeScript 5                 |
| 桌面 / 移动 | Tauri v2(Rust 后端,系统 WebView)                     |
| 高性能算法  | Rust → WASM(wasm-bindgen + wasm-pack)                |
| 动画        | Motion(Framer Motion)· Canvas 2D · 部分场景 Three.js |
| 视频        | Remotion(React 视频)· Manim(数学动画)                |
| 样式        | Tailwind CSS v4 · shadcn/ui · Base UI                |
| Monorepo    | pnpm · Turborepo · Oxc                               |
| 数据(可选)  | Supabase(用户进度、收藏、自定义测试用例同步)         |

---

## 🚀 快速开始

```bash
# 环境要求: Node ≥ 22, pnpm ≥ 9, Rust ≥ 1.80, Python ≥ 3.11 (仅 Manim)
corepack enable
pnpm install

# Web 开发
pnpm dev                         # http://localhost:3000
pnpm --filter @algomotion/web dev

# 桌面端开发 (需要 Rust toolchain)
pnpm desktop

# 构建 WASM 算法包
pnpm --filter @algomotion/algo-wasm build:wasm

# Remotion 视频预览 / 渲染
pnpm remotion
pnpm --filter @algomotion/videos render

# Manim 渲染 (示例)
cd tools/manim && uv run manim -pqh scenes/master_theorem.py

# 全仓检查
pnpm check
```

> 🇨🇳 国内网络:`.npmrc` 已配置镜像 registry,Rust 依赖建议配置 rsproxy.cn,Tauri 构建可走系统代理。

### 平台工具

- Rust/WASM 输出需要先安装 `wasm-pack`
- Manim 推荐使用 `uv sync` 安装 Python 依赖
- iOS 与 Android 原生工程分别运行 `pnpm --filter @algomotion/mobile init:ios` 和 `init:android` 生成
- 桌面端功能必须通过 `pnpm desktop` 打开的真实 Tauri 窗口验证，浏览器只验证 Web 功能

## 当前实现

- 六种排序算法：冒泡、选择、插入、归并、快排、堆排
- 统一 compare / swap / write / mark / range / complete trace 协议
- Web Worker 端上执行与 `/lab` 逐帧播放器
- 主页交互 Hero 使用真实冒泡排序 trace
- Remotion 排序讲解 composition，共用相同 trace replay
- Rust/WASM 排序入口及单元测试
- Tauri 桌面、移动工程配置和本地 trace 导出命令
- Manim 主定理示例场景

详细依赖方向见 [`docs/architecture.md`](docs/architecture.md)。

---

## 📚 算法路线图

- **Phase 1 — 排序专题**(MVP):冒泡 / 选择 / 插入 / 归并 / 快排 / 堆排,首页 hero 演示
- **Phase 2 — 搜索与图论**:二分、BFS/DFS、Dijkstra、A\*(迷宫寻路可视化)
- **Phase 3 — 数据结构**:栈 / 队列 / 链表 / 二叉树 / 堆 / 哈希表的动态演示
- **Phase 4 — 动态规划**:DP 表格填充动画、递归树 vs 记忆化对比
- **Phase 5 — 移动端发布** + 用户系统(进度、徽章、自定义挑战)

---

## 🎨 设计原则

1. **动画服务理解,不服务炫技** —— 每一帧动画都要回答"算法此刻在想什么"
2. **trace 协议是唯一事实来源** —— 算法逻辑与渲染彻底解耦,新增可视化形态零侵入
3. **多端一致,各端原生** —— 共享 95% 代码,桌面端享受 Tauri 的本地文件 / 离线能力
4. **首页是产品最好的 demo** —— 如果首页不能让人停留 30 秒,就重做

## 📄 License

MIT © Jay
