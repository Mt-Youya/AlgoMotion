# AlgoMotion Mobile

Shared Tauri v2 mobile shell for iOS and Android.

Generate native projects on a machine with the platform SDKs installed:

```bash
pnpm --filter @algomotion/mobile init:ios
pnpm --filter @algomotion/mobile init:android
```

Then launch the actual target:

```bash
pnpm mobile:ios
pnpm mobile:android
```

Generated `gen/apple` and `gen/android` directories are machine and SDK dependent, so they are not hand-authored in this scaffold.
