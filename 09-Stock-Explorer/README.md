# Project 09 — Stock Explorer

Type in a ticker, see a real stock's price drawn as a **chart**, and then press one button to
have **AI explain what the numbers actually mean** — the trend, how bumpy it was, the standout
moves — in plain English.

Two ideas meet here. The first is **turning data into a picture**: a chart is just numbers
mapped to positions on a screen, and once you can draw one, a wall of prices becomes something
you can read at a glance. The second is **data-to-story**: handing those numbers to an AI and
asking it to narrate them. Numbers plus a picture plus a sentence of meaning — that's how real
dashboards earn their keep.

And because this pulls live data *and* calls an AI, it needs two keys — so it's also where you
reuse **Project 01's most important habit: keys live on the server, never in the browser.**

**Cost: free stock data, and a few pennies of Anthropic credit each time you press Analyze.**

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and paste
> in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches the files
> and coaches you through it. This README is the reference.

---

## What you'll build

| File | What it is |
|------|-----------|
| `index.html` / `styles.css` / `app.js` | The page: ticker box, chart, stats, and the Analyze button |
| `app.js` | Draws the chart by hand (SVG) and talks to your two functions |
| `netlify/functions/prices.js` | **Server-side** — fetches real prices from Alpha Vantage with your key |
| `netlify/functions/analyze.js` | **Server-side** — asks Claude to describe the numbers, with your key |

The two `netlify/functions/` files are the whole reason your keys stay safe: the browser never
sees Alpha Vantage or Anthropic, it only talks to *your* functions, and the keys live on the
server inside them.

---

## The concept: a chart is just data, drawn — and AI can read it back to you

**Drawing the chart.** A line chart sounds fancy but it's simple: for each day, take the
closing price and turn it into a dot at an (x, y) position — x for *when*, y for *how much* —
then connect the dots. `app.js` does exactly this with plain SVG, no chart library. Reading
that code is worth it: you'll see there's no magic, just arithmetic mapping prices to pixels.

**Narrating the data.** A chart shows you *what* happened; the **Analyze** button asks Claude
to say it in words — "drifted up steadily, then a sharp drop mid-month." That's the
*data-to-story* move: the same AI call you learned in Project 10, pointed at numbers instead of
news. It's told to stay **observational** — describe, never advise — and the app shows a plain
"not financial advice" line under it, because that matters.

**Why two server-side functions.** This is the Project 01 lesson again. Both an Alpha Vantage
key and an Anthropic key would be *visible to anyone* if they sat in browser code. So they
don't: each key lives in a small function that runs on the server (`netlify dev` locally), and
your page calls those functions. The key is added on the server and never travels to the
browser — the same pattern that made Project 01 safe, now with two keys.

---

## Before you start

**Node.js 20 or newer** (`node --version`) — install the LTS from [nodejs.org](https://nodejs.org)
if yours is older.

> **After installing Node, quit and reopen VS Code / Claude Code completely** — a new terminal
> tab inside VS Code still uses the old settings. If `node --version` still fails, restart the
> computer.

**Two free keys** (this project uses both — the server keeps them safe):

- **Alpha Vantage** — free stock data. Grab a key in ~20 seconds at
  [alphavantage.co](https://www.alphavantage.co/support/#api-key), no card. The free tier
  allows about **25 lookups a day** (and 5 a minute), which is plenty for exploring.
- **Anthropic** — for the AI analysis, from [console.anthropic.com](https://console.anthropic.com)
  → API keys, with a little credit under Billing. The same key from Projects 01 and 10.

---

## Setup and run it

Do these from inside this project folder.

> **Opening a terminal here** — **Windows:** type `cmd` in the folder's File Explorer address
> bar. **Mac:** `Cmd`+`Space`, "Terminal", then `cd ` and drag the folder in. (Or VS Code:
> `Ctrl`+`` ` ``.)

**1. Install**

```bash
npm install
```

Downloads the AI SDK and Netlify's local server. Noisy, with vulnerability warnings — that's
normal; **don't** run `npm audit fix --force`.

**2. Add your keys**

```bash
# Mac
cp .env.example .env
```
```
# Windows
copy .env.example .env
```

Open `.env` and paste your two keys in — `ALPHA_VANTAGE_KEY` and `ANTHROPIC_API_KEY`. These sit
next to `package.json`, get read on the server, and are gitignored so they never reach GitHub.

**3. Run it**

```bash
npx netlify dev
```

Skip any Netlify login. When it's ready, open **http://localhost:8888**. It loads AAPL to start;
type any ticker (AAPL, NVDA, TSLA, MSFT…), switch the range, and press **🤖 Analyze with AI** to
have Claude describe the chart.

---

## The prompts

See **[PROMPTS.md](PROMPTS.md)** for the prompts that build it piece by piece.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| "No Alpha Vantage key found" / "No Anthropic key found" | You haven't made `.env` from `.env.example`, or left a key blank |
| "Hit the Alpha Vantage rate limit (or the demo key)" | Free tier is ~25 lookups/day, 5/min. Each new ticker — including the AAPL that loads on startup, every page refresh, and each preset button — is one lookup, so a quick burst can trip the 5/min limit. Wait a minute; switching the time range does *not* cost a lookup. Also make sure your key isn't the word `demo` |
| `No data for "XYZ"` | That ticker isn't recognized — US symbols like AAPL, NVDA, TSLA work best |
| The chart loads but Analyze fails with "no credit" | Your Anthropic account needs a few dollars under Billing (a Claude.ai subscription isn't API credit) |
| "Could not reach the server" | `netlify dev` isn't running, or you opened the file directly instead of via http://localhost:8888 |
| `command not found: npm` | Node isn't installed, or you need to fully quit and reopen VS Code / your terminal |
| `npm.ps1 cannot be loaded…` | Windows PowerShell blocks scripts. Use `cmd`, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |

Still stuck? Paste the exact error to the AI agent and say what you expected instead.

---

**Next up:** the capstone (Project 11) — no walkthrough, just a brief, using everything the
projects taught you.
