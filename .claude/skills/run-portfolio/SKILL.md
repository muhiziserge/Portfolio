---
name: run-portfolio
description: Build, run, and drive the portfolio Next.js app. Use when asked to start portfolio, run its dev server, build it, lint it, take a screenshot of its UI, or interact with the running app.
---

This is a Next.js 16 (App Router, Tailwind v4, TypeScript) app. Drive it
by starting the dev server, then poking it headlessly with the bundled
Playwright REPL driver at `.claude/skills/run-portfolio/driver.mjs`
(`chromium-cli` isn't installed in this environment, so this driver
stands in for it — same command shape).

All paths below are relative to the repo root.

## Prerequisites

Node 22 / npm 10 (whatever's on `PATH` — no version pinning needed,
this was verified with Node v22.17.0 / npm 10.9.2). No OS packages
needed on macOS; on a fresh Linux container you may need Playwright's
`--with-deps` browser install (see Setup).

## Setup

```bash
npm install                                    # app deps, from repo root
cd .claude/skills/run-portfolio && npm install # driver's own deps (playwright)
npx playwright install chromium                # add --with-deps on a fresh Linux box
cd -
```

No env vars are required to run the dev server. `.env.local` (pulled via
`vercel env pull .env.local`) only carries `VERCEL_OIDC_TOKEN`, which
the app doesn't read at runtime.

## Build

```bash
npm run build   # next build (Turbopack) — verified: compiles, typechecks, prerenders / and /_not-found as static
```

## Run (agent path)

Start the dev server in the background, wait for it to actually serve,
then pipe commands to the driver:

```bash
npm run dev -- -p 3100 > /tmp/next-dev.log 2>&1 &
for i in $(seq 1 30); do curl -sf http://localhost:3100 >/dev/null && break; sleep 1; done

cd .claude/skills/run-portfolio
node driver.mjs <<'EOF'
nav http://localhost:3100
wait-for text=Get started
screenshot home
console --errors
quit
EOF
```

Screenshots land in `.claude/skills/run-portfolio/screenshots/<name>.png`
(relative to wherever `driver.mjs` was launched from). `console --errors`
prints a JSON array of collected `console.error`/`pageerror` text — `[]`
means clean.

Stop the server with `lsof -ti:3100 -sTCP:LISTEN | xargs -r kill` before
relaunching (npm doesn't forward SIGTERM to the child `next` process, so
`kill %1` on the backgrounded npm job won't free the port).

Driver commands:

| command | what it does |
|---|---|
| `nav <url>` | navigate, waits for network idle |
| `wait-for text=<substring>` | wait for visible text |
| `wait-for selector=<css>` | wait for a CSS selector |
| `click <css selector>` | click first match |
| `hover <css selector>` | hover first match — use to check `:hover`-revealed UI (captions, tooltips) |
| `fill <css selector> <text...>` | fill an input (goes through Playwright's input pipeline, so React controlled inputs fire `onChange` correctly) |
| `press <key>` | keyboard press, e.g. `Enter` |
| `screenshot [name]` | full-page PNG to `screenshots/<name or auto-index>.png` |
| `screenshot-element <css selector> [name]` | PNG of just the first matching element — avoids the full-page lazy-load timing issue below, and is what you want for hover-state checks |
| `console --errors` | print collected console/page errors as JSON |
| `quit` | close the browser and exit |

## Run (human path)

```bash
npm run dev   # → http://localhost:3000, hot reload. Ctrl-C to stop.
```

Production mode, if you need to check the built output rather than dev:

```bash
npm run build
npm run start -- -p 3100   # verified: HTTP 200, ready in ~0.3s
```

## Test

No test suite exists yet (fresh `create-next-app` scaffold — no Jest/
Vitest/Playwright test config). `npm run lint` is the only current
check:

```bash
npm run lint   # eslint — verified clean on the current scaffold
```

---

## Gotchas

- **`timeout` isn't available on macOS by default** — the poll loop
  above uses a plain `for`/`sleep` loop instead of `timeout 30 bash -c
  '...'` for that reason. If you're on a box with GNU coreutils
  (`gtimeout`) or Linux, the `timeout`-wrapped form works too.
- **`chromium-cli` is not installed in this environment** — `driver.mjs`
  is a minimal hand-rolled substitute with the same stdin-command shape
  (`nav`/`wait-for`/`screenshot`/`console --errors`). If `chromium-cli`
  becomes available later, prefer it and drop the custom driver.
- **The driver has its own `node_modules`** (`.claude/skills/run-portfolio/`
  has its own `package.json` with `playwright` as a dependency) — it's
  intentionally not added to the app's own `package.json`, so `npm
  install` at the repo root won't pull Playwright in.
- **`screenshot` (fullPage) can render below-the-fold images as blank**
  even when they're correctly wired up — Chromium's full-page capture
  doesn't reliably wait for lazy-loaded `next/image` content far from
  the initial viewport to finish decoding before the CDP screenshot
  fires. This is a capture-timing artifact, not a real bug: confirmed
  by checking `curl http://localhost:PORT/_next/image?url=...&w=...`
  resolves with the right byte size/dimensions, and by using
  `screenshot-element <selector>` (which scrolls the target into view
  first) instead of a blind full-page `screenshot`.
- **Turbopack's dev image-optimizer cache lives at
  `.next/dev/cache/images`**, not `.next/cache/images` (that path is
  the production/webpack build cache). If you swap a file at the same
  public/ path and the optimized output still looks stale after a
  restart, delete `.next/dev/cache/images` (safe — it's a regenerable
  cache) and restart.
