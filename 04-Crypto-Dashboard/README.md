# Project 04 — Crypto Dashboard

Build a live dashboard that shows the current price of eight cryptocurrencies, updating
itself every 30 seconds — real numbers, pulled live off the internet.

Project 01 taught you to hide an API key behind a server, because that key was a secret
that cost you money. **This project is the deliberate opposite.** The data here comes from
a *public* API — one that needs no key, no account, no secret at all. And because there's
nothing to hide, the code can talk to it straight from the browser. No server-side
function, no `.env`, nothing to leak.

Understanding *why* those two projects are built so differently — when you need a server
in the middle and when you don't — is the whole point of this one.

**Cost: free.** No key, no account, no billing.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This README is the reference.

---

## What you'll build

A page of price cards — each with a coin's current price, its 24-hour change (green up, red
down), market cap, volume and daily high — that refreshes on a timer. Three files:

| File | What it is |
|------|-----------|
| `index.html` | The page and its layout |
| `styles.css` | The look — the dark theme, the cards, the colours |
| `script.js` | **The interesting part** — it fetches live data and draws the cards |

No server of your own, no database, no key.

---

## The concept: keyless public APIs (the mirror of Project 01)

An **API** is just a way for one program to ask another program for something. In Project
01 you asked Anthropic to write a roast — and that request cost money, so it needed a secret
key, so the key had to live on a server where visitors couldn't see it.

This project asks **CoinGecko** for crypto prices. That request is **free and public** —
CoinGecko hands basic price data to anyone who asks, no key required. Open your browser's
DevTools console while the dashboard runs and you'll see the raw data arriving.

Here's the part worth sitting with:

> **Because there's no secret, there's nothing to protect — so the code can run right in
> the browser.** The `fetch()` call to CoinGecko sits in `script.js`, which every visitor
> downloads, and that's completely fine, because the URL it calls is public knowledge.
> There is no server-side function in this project. Compare that to Project 01, where the
> API call *had* to be hidden server-side. Same idea (call an API), opposite architecture —
> and the thing that decides which one you need is a single question: **is there a secret?**

### The one catch: rate limits

A free public API can't let everyone ask as fast as they like, or it would fall over. So
CoinGecko limits **how often** it answers — roughly a handful of requests per minute,
*shared* across everyone using it from your network. If you refresh too fast, or you're on
a classroom's shared wifi where lots of people hit it at once, it politely replies "slow
down" (an error called **HTTP 429**).

That is not your code breaking. Most of `script.js` is there to handle exactly this: when
the data doesn't come, the dashboard shows a plain message ("the data's busy, wait a
minute") instead of just going blank or throwing an error. **A failed request here means
"wait a minute," not "broken."**

---

## Before you start

**Node.js 20 or newer.** Check by opening a terminal and running:

```bash
node --version
```

If that prints `v20.x` or higher, you're fine. If it prints something lower, or
"command not found", install the LTS version from [nodejs.org](https://nodejs.org).

> **After installing Node, you must restart where you're typing — and "restart" means
> more than opening a new tab.** A brand-new terminal window picks up the new install,
> but **VS Code does not**: opening a fresh terminal tab inside it still inherits the
> old settings from when VS Code launched. You have to quit VS Code completely and
> reopen it. Same for Claude Code — restart it. If `node --version` still fails after
> that, restart the computer; it always works and costs less time than debugging it.

You do **not** need Python, Git, or the Netlify CLI installed. The setup handles those.

There is **no API key and no account** for this project. That's the whole point.

---

## Setup

Do these in a terminal, from inside this project folder.

> **Opening a terminal in this folder**
>
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar and hit
> Enter. (Or in VS Code: `Ctrl` + `` ` ``.)
>
> **Mac** — press `Cmd` + `Space`, type `Terminal`, hit Enter. Then type `cd ` — with a
> space after it — and **drag your project folder from Finder onto the Terminal
> window**. It fills in the path for you. Hit Enter.
> (Or in VS Code: `Ctrl` + `` ` `` — that's **Control**, not Command, on Mac too.
> `Cmd` + `` ` `` is a system shortcut and won't open a terminal.)

**1. Install the dependencies**

```bash
npm install
```

This reads `package.json` and downloads what the project needs, including the Netlify
tool — into this folder only. Nothing is installed system-wide. It takes a minute or two
and prints a wall of text; that is normal.

> **It will end by reporting some "vulnerabilities" and deprecation warnings, possibly
> in red.** Ignore them — they come from inside the Netlify tool's own dependencies and
> do not affect this project. In particular **do not run `npm audit fix --force`**, which
> is far more likely to break your project than the warnings are.

**2. Run it**

```bash
npx netlify dev
```

This serves the dashboard at **http://localhost:8888**. Give it a second and the prices
appear.

> **Netlify will print a few notices that look like warnings but aren't.** Lines like
> "No app server detected. Using simple static server" and "Unable to determine public
> folder" are exactly right — this is a plain static site and that's what it's serving.
> An "AI Gateway … Forbidden" line, if you see it, is also harmless.

> **On the very first run, wait a moment.** Netlify prints "Local dev server ready" a few
> seconds before it genuinely is. If the page is blank, give it up to 30 seconds and
> refresh. This only happens once.

If port 8888 is busy, use `npx netlify dev --port 8899`. Press `Ctrl` + `C` to stop.

> **Bonus:** you don't even strictly need a server for this one — it's just static files.
> But we use `npx netlify dev` across the whole course so there's only one command to
> remember, and so this project behaves exactly like the others.

---

## The prompts

The prompts that build the dashboard, and the ones for changing it, are in
**[PROMPTS.md](PROMPTS.md)**. The quickest way to make it yours: open `script.js`, find the
`API_URL` line, and swap `dogecoin` for another coin's id (like `litecoin`).

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| **The prices vanish and a "data's busy, wait a minute" message appears** | You hit CoinGecko's free rate limit (HTTP 429). Not a bug — wait a minute, it refreshes itself. Common on shared/classroom wifi |
| **"Couldn't reach the internet to load prices"** | Your connection dropped, or something is blocking the request. The dashboard keeps retrying |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd` instead (File Explorer address bar → type `cmd`), or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| Blank page on the very first run | The server said "ready" slightly early. Wait 30 seconds and refresh. Only happens once |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |

To watch the live data yourself, open developer tools (`F12` on Windows, `Cmd` + `Option` +
`I` on Mac) and look at the Console tab — `script.js` prints each response there.

---

**Next up:** Project 05, where you save data *in the browser itself* so it survives a
refresh — no server and no database, for real this time.
