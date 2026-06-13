# AlgoMotion Desktop

Tauri v2 shell for macOS, Windows, and Linux. It loads the static export from `apps/web/out` and exposes native commands for local file workflows.

```bash
pnpm --filter @algomotion/desktop tauri dev
pnpm --filter @algomotion/desktop bundle
```

The first command starts the Next.js development server through `beforeDevCommand`, then opens the real Tauri window.
