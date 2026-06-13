# AlgoMotion Architecture

## Trace as the contract

`@algomotion/shared` owns the event protocol. Algorithms emit events without importing React, Canvas, Remotion, or Tauri. Consumers reconstruct state from the initial input plus an event position.

## Execution paths

- Web: `apps/web/workers/algorithm.worker.ts` executes TypeScript algorithms off the main thread.
- WASM: `packages/algo-wasm` contains Rust implementations for larger workloads.
- Desktop: `apps/desktop` loads the static Next.js export and adds native file access through Tauri commands.
- Mobile: `apps/mobile` reuses the same static export and is initialized into iOS or Android projects by the Tauri CLI.

## Presentation paths

- Interactive UI: `@algomotion/visualizer` replays events at any step.
- Code and statistics: the current event line and accumulated run metadata are rendered beside the visualizer.
- Video: `@algomotion/videos` maps Remotion frames to trace steps and uses the same replay function.
- Mathematical proofs: `tools/manim` covers derivations such as recurrence trees and the master theorem.

## Dependency direction

```text
shared <- algorithms <- web worker
   ^          ^            |
   |          |            v
visualizer <--+---------- web / videos

web static export <- desktop / mobile
```

Native shells and presentation packages do not define algorithm behavior. They consume it.
