# Project 01 — AI Roast Generator

Upload a picture. An AI looks at it and roasts it in one merciless sentence.

It is a silly app that teaches the least silly thing in this whole course: **where an
API key is allowed to live.** Get this wrong on a real project and strangers spend your
money. Get it right here, once, and you will get it right forever.

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
"command not found", install the LTS version from [nodejs.org](https://nodejs.org) and
then **close and reopen your terminal** — a fresh terminal is what picks up the new
install.

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

> **Opening a terminal here**
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar, hit
> Enter. Or use the VS Code terminal (`Ctrl` + `` ` ``).
> **Mac** — right-click the folder in Finder → Services → New Terminal at Folder. Or use
> the VS Code terminal (`Cmd` + `` ` ``).

**1. Install the dependencies**

```bash
npm install
```

This reads `package.json` and downloads what the project needs, including the Netlify
tool — into this folder only. Nothing is installed system-wide. It takes a minute or two
the first time and prints a wall of text; that is normal.

**2. Create your `.env` file**

Copy the example file and then edit the copy:

```bash
# Mac / Linux / Git Bash
cp .env.example .env
```

```powershell
# Windows PowerShell or cmd
copy .env.example .env
```

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
| `command not found: npm` | Node.js isn't installed, or you need to reopen your terminal |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |
| Page loads but the button does nothing | Open developer tools (`F12`) and read the Console tab |

**The server reads `.env` once, at startup.** Every time you change that file, stop the
server with `Ctrl` + `C` and start it again. This single fact explains most "I fixed it
but it's still broken" moments.

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead. That is not cheating — reading errors and asking good follow-up
questions is the actual skill this course teaches.

---

## Before you show anyone

Run this in the project folder:

```bash
git status
```

If `.env` appears in that list, **stop** — something is wrong with your `.gitignore`, and
committing would publish your key. It should never appear. If you have already pushed a
key somewhere public, don't just delete the file: go to
[console.anthropic.com](https://console.anthropic.com), delete that key, and make a new
one. Deleting a file does not un-share a secret.

---

**Next up:** Project 02, where you build a game and nothing can bill you.
