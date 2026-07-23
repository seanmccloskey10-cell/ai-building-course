# Project 08 — Million Dollar Idea App

A dead-simple notes app: jot down an idea, hit save, it's kept. Then the trick that makes
this project special — **install it on your phone's home screen, where it opens like a real
app**, full screen, no browser bar, even works offline.

That's a **PWA** — a Progressive Web App. It's an ordinary website that, with three small
extra pieces, a phone or computer will treat like a native app you install. No app store,
no separate code, no Apple/Google approval. Same web files you've been building all along.

**Cost: free.** No API key, no account.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This README is the reference.

---

## What you'll build

A single-screen notes app — a text box, a save button, a list of your notes, each with a
delete button. Your notes are saved in the browser (the localStorage trick from Project 05),
so they survive a refresh. And it's **installable**.

| File | What it is |
|------|-----------|
| `index.html` | The page |
| `style.css` | The look |
| `main.js` | Saving, deleting and showing notes |
| `manifest.webmanifest` | **PWA piece 1** — tells the phone the app's name, colour and icon |
| `service-worker.js` | **PWA piece 2** — a bit of code that caches the app so it opens offline |
| `icons/` | **PWA piece 3** — the app icons that appear on the home screen |

Those last three are what turn a website into something installable.

---

## The concept: three pieces make a website installable

A normal website lives inside a browser tab. A PWA adds three things that make a phone or
computer offer to *install* it:

1. **A manifest** (`manifest.webmanifest`) — a small text file that says "here's my name,
   my colours, and my icons." It's what lets the app appear on a home screen with a proper
   name and icon instead of a browser bookmark.
2. **A service worker** (`service-worker.js`) — a script the browser keeps running in the
   background. It saves ("caches") a copy of your app's files, so the app **opens even with
   no internet**. Open your installed notes app on a plane and it still works.
3. **Icons** — the actual pictures shown on the home screen.

That's genuinely it. A PWA isn't a different kind of program — it's the same HTML, CSS and
JavaScript you already know, plus these three declarations that let the device adopt it.

> **Why this matters:** building a real phone app normally means learning a whole separate
> world (Swift for iPhone, Kotlin for Android) and getting past the app stores. A PWA gets
> you a real, installable, offline-capable app from the web skills you already have. It's
> the cheapest possible route from "website" to "app on my phone."

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

There is **no API key and no account** for this project.

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

This serves the app at **http://localhost:8888**. Write a note, refresh — it's still there.

> **Netlify will print a few notices that look like warnings but aren't.** Lines like
> "No app server detected. Using simple static server" and "Unable to determine public
> folder" are exactly right — this is a plain static site and that's what it's serving.
> An "AI Gateway … Forbidden" line, if you see it, is also harmless.

> **On the very first run, wait a moment.** Netlify prints "Local dev server ready" a few
> seconds before it genuinely is. If the page is blank, give it up to 30 seconds and
> refresh. This only happens once.

If port 8888 is busy, use `npx netlify dev --port 8899`. Press `Ctrl` + `C` to stop.

---

## Install it — the fun part

**On your computer (Chrome or Edge):** with the app open at `http://localhost:8888`, look
in the address bar for a small **install icon** (a screen with a down-arrow), or open the
browser menu and choose **"Install Million Dollar Idea App…"**. Click it and the app opens
in its own window, no browser bar — like a real app. (Installing from `localhost` works
because browsers trust `localhost` as a safe address.)

**On your actual phone:** your phone can't reach your computer's `localhost`, so to install
it *there* you first need it on the real internet. Good news — you already learned how in
**Project 03**: deploy this folder to Netlify (drag it to
[app.netlify.com/drop](https://app.netlify.com/drop), or `npx netlify deploy --prod`). Then
open the live `.netlify.app` link on your phone and choose **"Add to Home Screen"** (Share
menu on iPhone, browser menu on Android). Now it's an icon on your home screen.

**To prove it's really installed and offline-capable:** open the installed app, then turn
off your wifi, and open it again. It still works — that's the service worker serving your
app from its cache.

---

## The prompts

The prompts that build the app, and the ones for changing it, are in
**[PROMPTS.md](PROMPTS.md)**.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| **You changed the code but the app looks the same** | This is *the* PWA gotcha: the service worker is serving its cached copy of the old files. Hard-refresh (`Ctrl` + `Shift` + `R`), or open developer tools → Application → Service Workers → **Unregister**, then refresh. Your changes will show |
| No "Install" option appears in Chrome | Installing needs the manifest, the service worker and the icons all loading correctly, over `localhost` or `https`. Open developer tools → Application → Manifest and Service Workers to see if any failed to load |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd` instead (File Explorer address bar → type `cmd`), or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| Blank page on the very first run | The server said "ready" slightly early. Wait 30 seconds and refresh. Only happens once |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**Next up:** the rest of the course builds toward the capstone — a Command Center that uses
everything you've learned. Keep going.
