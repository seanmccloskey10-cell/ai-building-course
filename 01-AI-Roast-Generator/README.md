# Project 01 — AI Roast Generator

Upload a picture. An AI looks at it and roasts it in one merciless sentence.

It is a silly app that teaches the least silly thing in this whole course: **where an
API key is allowed to live.** Get this wrong on a real project and strangers spend your
money. Get it right here, once, and you will get it right forever.

> ### 👉 Just want to build it?
> Don't follow this README by hand. Make a new empty folder, open it in
> [Claude Code](https://claude.com/claude-code), and paste in the prompt from
> **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches the files, walks you
> through your API key, and coaches you through running it.
>
> This README is the reference for what it's all doing, and where to look when
> something breaks.

---

## What you'll build

A single web page with an upload button. You pick a photo, it appears on screen with a
big **ROAST THIS** button, and a second later an AI comedian tears into it.

Four files do the whole job:

| File | What it is |
|------|-----------|
| `index.html` | The page you look at |
| `app.js` | The browser code — handles the upload and draws the roast |
| `netlify/functions/roast.js` | **The server code — this is the important one** |
| `.env` | Your secret API key. You create this. It never leaves your laptop |

---

## The concept: why your key can't live in the browser

Here is the thing beginners get wrong, and it is not obvious.

An **API key** is a password that lets your code talk to an AI company's computers, and
bills you for it. Anthropic gives you one. It looks like `sk-ant-api03-xxxxx...`.

The tempting thing to do is put the key in `app.js` and call the AI straight from the
browser. It works perfectly on your laptop. Ship it, and here is what happens:

> **Anything the browser can read, your visitors can read.** Right-click any live
> website, choose "View source" or open the developer tools, and you can read every line
> of its front-end code. Your key is in there. In plain text. Forever.

People run automated scrapers hunting GitHub and live websites for exactly this. A leaked
key gets found in minutes, not months, and it is *your* card that gets charged.

So the browser never sees the key. Instead:

```
   Your browser                  Netlify's server              Anthropic
  ┌─────────────┐               ┌────────────────┐           ┌──────────┐
  │  index.html │ ── image ──▶  │   roast.js     │ ─ image ─▶│  Claude  │
  │  app.js     │               │  + secret key  │           │          │
  │             │ ◀── roast ──  │                │ ◀─ roast ─│          │
  └─────────────┘               └────────────────┘           └──────────┘
    visitors can                  visitors can NEVER
    read all of this              read any of this
```

`netlify/functions/roast.js` runs on a **server**, not in anyone's browser. It reads the
key from the environment, calls Claude, and hands back only the finished joke. The key
never travels to the browser, so there is nothing to steal.

Two habits fall out of this, and they apply to every project you ever build:

1. **Secrets go in `.env`, and `.env` goes in `.gitignore`.** That is why this folder
   ships a `.env.example` (safe, committed, fake value) and no `.env` (yours, private).
2. **Anything secret happens server-side.** If code needs a key, that code cannot run in
   a browser.

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

**An Anthropic API key**, which is the one step nobody can do for you. See below.

You do **not** need Python, Git, or the Netlify CLI installed. The setup handles those.

---

## Getting your API key

1. Go to **[console.anthropic.com](https://console.anthropic.com)** and sign up.
2. Click **API keys** in the left sidebar, then **Create Key**. Name it anything.
3. **Copy it immediately.** It is shown once and never again. If you lose it, delete
   that key and make a new one — no harm done.
4. Add a small amount of credit under **Billing**. A few dollars is plenty; each roast
   costs a fraction of a penny.

> ### ⚠️ A Claude subscription is NOT API credit
>
> This catches almost everyone. Paying for Claude Pro on **claude.ai** — the chat
> website — does **not** give you API credit. They are two separate products with
> separate billing, and having one does not fund the other.
>
> The API is what your *code* uses, and it is billed separately at
> **console.anthropic.com**. If you skip the Billing step, your app will build and run
> perfectly and then fail on the first roast with a "credit balance is too low" error.
>
> The good news: API usage is pay-as-you-go and genuinely cheap. This whole project
> costs a few pence.

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
the first time and prints a wall of text; that is normal.

> **It will end by reporting some "vulnerabilities" and deprecation warnings, possibly
> in red.** Ignore them. They come from inside the Netlify tool's own dependencies, they
> do not affect this project, and they are not a sign anything went wrong. In particular
> **do not run `npm audit fix --force`** — it "fixes" them by installing incompatible
> versions and is far more likely to break your project than the warnings are.

**2. Create your `.env` file**

Copy the example file and then edit the copy.

On **Mac**:

```bash
cp .env.example .env
```

On **Windows**:

```
copy .env.example .env
```

> Copy just the command line itself. If you paste a `#` comment line into Windows `cmd`
> it answers `'#' is not recognized as an internal or external command` — which looks
> alarming and means nothing. The command on the next line still runs.

Open the new `.env` in your editor and replace the placeholder with your real key, so it
reads:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

> **Windows: do not create this file in File Explorer.** Explorer hides file extensions,
> so "New → Text Document" silently gives you `.env.txt`, which does not work and looks
> identical in the sidebar. Use the `copy` command above, or create it from your editor's
> File → New menu.

Three things that will break it, all invisible at a glance:

- **No quotes.** `ANTHROPIC_API_KEY=sk-ant-...` — not `="sk-ant-..."`.
- **No spaces** around the `=`.
- **No trailing space or line break** after the key. Some browsers add one when you copy.

**3. Run it**

```bash
npx netlify dev
```

`npx` runs the copy of Netlify that `npm install` just put in this folder — you never
need a global install, and you never need to log in to Netlify to develop locally.

Your browser should open at **http://localhost:8888**. If it doesn't, open that address
yourself. Upload a picture, hit the button, get roasted.

Press `Ctrl` + `C` in the terminal to stop the server.

---

## The prompts

The prompts that built this app — and the ones for changing it — are in
**[PROMPTS.md](PROMPTS.md)**. Start with the bonus prompts: swapping the comedian's
personality is a one-line change and the fastest way to see that you actually control
this thing.

---

## When it breaks

Read the error. It is trying to help you, and this app rewrites the confusing ones into
plain English.

| What you see | What's actually wrong |
|---|---|
| "No API key found" | No `.env` file, or it's named `.env.txt`, or you didn't restart the server after creating it |
| "Your API key was rejected" | Typo, stray quotes, or a trailing space in `.env` |
| "Your Anthropic account has no credit" | The Billing step above. A Claude.ai subscription is not API credit |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Easiest fix: use `cmd` instead (File Explorer address bar → type `cmd`). Or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| **A 404, or "Unexpected token" on your very first roast** | The server says "ready" slightly before it really is — on the first run it's still downloading one last component in the background. Wait 30 seconds and click again. This only ever happens once |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |
| Page loads but the button does nothing | Open developer tools and read the Console tab — `F12` on Windows, `Cmd` + `Option` + `I` on Mac |

**The server reads `.env` once, at startup.** Every time you change that file, stop the
server with `Ctrl` + `C` and start it again. This single fact explains most "I fixed it
but it's still broken" moments.

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead. That is not cheating — reading errors and asking good follow-up
questions is the actual skill this course teaches.

---

## Before you put this on GitHub

**Right now you don't need to do anything.** Your folder isn't a Git repository and
nothing is being tracked, so there is nothing that could accidentally publish your key.

It matters the day you decide to put this online. The moment you run `git init` here,
the `.gitignore` that came with this project starts protecting you — it lists `.env`, so
Git will refuse to track it. That file travels with the folder precisely so you don't
have to remember.

To see the protection working, once you have run `git init`:

```
git status
```

`.env` should **not** appear anywhere in that output. Everything else can be committed
safely. If `.env` ever does appear, stop — something has gone wrong with `.gitignore`
and committing would publish your key.

> **If you ever leak a key** — pushed it, pasted it in a screenshot, sent it in a
> message — deleting the file is not enough. The secret is already out. Go to
> [console.anthropic.com](https://console.anthropic.com), **delete that key**, and
> create a new one. That instantly makes the leaked one worthless. Do it immediately;
> automated scrapers find exposed keys within minutes.

---

**Next up:** Project 02, where you build a game and nothing can bill you.
