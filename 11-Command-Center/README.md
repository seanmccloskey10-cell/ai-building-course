# Project 11 — Command Center (The Capstone)

This is graduation. **No walkthrough. No answer key. No `PROMPTS.md`.** Just a brief and you.

Every project before this one handed you a working app to fetch and a set of prompts to
paste. This one hands you a spec and gets out of the way. You are the architect now — you
decide how it gets built, you direct the agent, you make the calls when something is
ambiguous. That is the whole point: the course was never about ten apps, it was about
learning to *drive* a build. Now you drive.

You will not be given a finished Command Center to copy. You are going to **build one from
nothing**, using every concept the ten projects taught you.

---

## What you're building

A personal **Mission Control dashboard** — one screen, always-on, that pulls your day
together: your tasks, your habits, your money, and an AI you can ask anything. A NASA /
SpaceX mission-control look: dark, glowing glass panels, everything in its place.

It runs on **your own machine, for you** — it's your cockpit, not a public website. (That
matters for your keys — see below.)

Six modules on one screen:

| Module | What it does | The concept you already learned |
|--------|--------------|--------------------------------|
| **Mission Planner** | A task board — three columns (To Do → In Progress → Done), drag cards between them, add and delete tasks, and it all survives a refresh | **localStorage** (Project 05) + one new mechanic: drag-and-drop |
| **Daily Protocols** | Your habit tracker — a list of habits, mark each done once a day, streaks that grow and reset | **Streaks & localStorage** — you built this in Project 05, reuse the logic |
| **Asset Monitor** | Your portfolio — live crypto prices (BTC, SOL), and optionally a couple of stocks, green/red on the day | **Live data from a public API** (Project 04 — CoinGecko, no key) |
| **Command Console** | A personal AI assistant docked at the top — ask it anything, get a short answer | **Calling an AI model** (Project 10 — now with your Anthropic key) |
| **Daily Transmission** | A quote of the day that's the same all day and changes tomorrow | A tiny bit of date logic — no key, no network |
| **Intel Feed** | Two buttons — "Random Fact" and "This Day in History" — that ask the AI for something interesting on click | **Calling an AI model** again (Project 10) |

The only genuinely *new* thing in the whole project is **drag-and-drop** on the task board.
It's native to the browser (`draggable`, `dragstart`, `dragover`, `drop`) — your agent knows
it well. Two things to expect: a drop target does nothing until its `dragover` handler calls
`preventDefault()` (the classic gotcha), and native drag-and-drop is a mouse/desktop thing —
it won't work by touch on a phone, which is fine for a desktop cockpit. Everything else, you
have already done at least once.

---

## The rules of the capstone

Read these once. They're the frame; the rest is yours.

1. **You're the architect.** Give your agent the brief, then make the product decisions — how
   many columns, what habits, which coins, how it looks. When you don't know, ask the agent
   to lay out the options and pick one. Don't ask it to "just build the whole thing" — build
   it a module at a time so you understand what you're shipping.
2. **Reuse what you built.** You are not starting from zero. The habit-streak logic, the
   CoinGecko fetch, the AI call — you've written versions of all of these. Point your agent
   at the concept ("do the streaks the way Project 05 did") instead of reinventing it.
3. **Your keys, your rules.** You'll need your own **Anthropic key** (the one from Projects
   01 and 10) for the AI modules. It goes in a `.env` file, and `.env` is gitignored — the
   same habit from day one. There's a `.env.example` here to copy.
4. **Your AI key is the one real trap here — handle it the way Project 01 taught you.** The
   AI modules need your Anthropic key, and this app runs in the *browser*. Project 01's hard
   lesson — **a key in browser code is public** — makes this the graduation-level decision:
   - **The clean way, and what I'd do: the Project 01 pattern.** Put the key in a server-side
     `.env` and let a tiny serverless function (run locally with `netlify dev`, exactly like
     Project 01) make the Anthropic call. Your dashboard calls *your* function, never Anthropic
     directly. The key never touches browser code, and there's no cross-origin problem. You
     already built this once.
   - **The shortcut — calling Anthropic straight from browser JavaScript — works only locally
     and only with care.** Browsers block it unless you add Anthropic's
     `anthropic-dangerous-direct-browser-access: true` header (or set `dangerouslyAllowBrowser:
     true` on the SDK), and your key is then visible to anyone who opens the page. Fine for a
     tool only *you* ever run on your own machine; never for anything you put online.

   Either way, the key lives in `.env` (gitignored) — **never** hardcoded into a `.js` or
   `.html` file that could get committed. (Project 10's AI call was a *Node* script, so it
   sidestepped both problems; a browser app doesn't get that for free.)
5. **Build the UI in whatever stack you and your agent choose.** The interface can be plain
   HTML + JavaScript (the tools from Projects 04, 05, 08) or a framework like React with Vite
   if you want the structure for something this size — ask your agent to weigh it up; either is
   a fine answer. The one part that *isn't* a free choice is the AI key (rule 4): plain static
   files can't safely hold a key, so either add a small serverless function for the AI (Project
   01, run with `netlify dev` — this pairs perfectly with a plain-HTML UI) or accept the
   local-only browser-call shortcut. Everything else is your call.

---

## Before you start

- **Node.js 20+** (`node --version`) — same as always.
- **Your Anthropic key** from [console.anthropic.com](https://console.anthropic.com) → API
  keys, with a little credit under Billing. The AI console and Intel Feed cost a few pennies
  per use; everything else is free.
- **Crypto needs no key** — CoinGecko's public API is free, exactly like Project 04.
- **Stocks are optional.** If you want AAPL/NVDA alongside your crypto, a free key from
  [alphavantage.co](https://www.alphavantage.co/support/#api-key) works (5 calls/min, so
  refresh stocks gently). Skip it and just track crypto if you'd rather — the brief still
  stands.

---

## How to work with your agent

You've done this ten times. The difference now is that *you* set the direction:

- **Start with the brief, not the code.** Paste the prompt from
  [STUDENT-PROMPT.md](STUDENT-PROMPT.md), let the agent read this README, and have it propose
  a plan and a stack before it writes anything.
- **One module at a time.** Get the empty layout up first (six labelled panels). Then the
  Mission Planner (the drag-and-drop board — the heart of it). Then habits, then the market
  data, then the AI console, then the two daily-motivation pieces. Polish the mission-control
  look last.
- **Describe what you want, not how.** "The In Progress column should glow amber" is your
  job. Making it do that is the agent's.
- **When it breaks, paste the error back.** That skill — reading what came back and asking
  the right follow-up — is the entire course in one sentence. You have it now.

---

## What "done" looks like

Run through this yourself — it's your systems check:

- **Mission Planner:** you can drag a task To Do → In Progress → Done and back; add and delete
  tasks; empty task names are rejected; the board is exactly as you left it after a refresh.
- **Daily Protocols:** you can complete a habit once a day (not twice); the streak counts up;
  it survives a refresh.
- **Asset Monitor:** your crypto prices load and show green/red; a network hiccup shows a
  friendly "offline" message instead of a blank box.
- **Command Console:** "What is the capital of France?" comes back with an answer; an API
  failure shows a friendly message, not a crash.
- **Daily Transmission / Intel Feed:** the quote is stable through the day; the two buttons
  return something interesting.
- **The look:** it fills the screen and feels like mission control — you'd be happy to leave
  it open all day.

Hit all of that and you haven't just finished a project. **You've finished the course.** You
took a spec with no instructions and turned it into a real, working tool by directing an AI
and understanding what came back — which is the whole skill, and now it's yours.

---

Built by [Sean McCloskey](https://mccloskey.ai). This is the last one. Go build it.
