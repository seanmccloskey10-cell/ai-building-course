# Project 05 — Habit Streak Tracker

Pick some daily habits, tick off the days you do them, and watch your streaks build. Close
the tab, come back tomorrow, and your progress is still there.

That last part is the whole lesson. Every project so far forgot everything the moment you
refreshed. This one **remembers** — using a feature built into every browser called
**localStorage**. No database and no account — and your habit data never travels to a
server at all. It lives right there in your own browser.

**Cost: free.** Nothing to sign up for.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This README is the reference.

---

## What you'll build

A habit tracker: choose from a list of habits, and for each one get a seven-day grid you
tap to mark a day done, a progress bar, and a 🔥 streak counter. Three files:

| File | What it is |
|------|-----------|
| `index.html` | The page and layout |
| `styles.css` | The look |
| `app.js` | **The logic** — tracking days, counting streaks, and saving everything |

---

## The concept: localStorage is a notebook, not a filing cabinet

`localStorage` is a small box of storage that every web browser gives every website. Your
code can put text in it, and — crucially — **it's still there after the page reloads, or
after you close the browser and come back next week.** That's what makes this app feel real:
your streaks don't vanish.

It's tempting to call that "a database," but it isn't, and the difference matters:

> **A database is a filing cabinet in a shared office — one central place, on a server,
> that everyone reaches over the internet.** Log in from your phone, your laptop, a library
> computer, and you see the same data, because it lives in one place that isn't any of
> those devices. **localStorage is a notebook in your desk drawer.** It's private, it's
> instant, and it needs no server — but it only exists in *this browser on this computer*.
> Open the app on your phone and it's blank; open it in a different browser and it's blank;
> clear your browsing data and it's gone. Same idea (save data so it lasts), completely
> different reach.

localStorage is perfect for exactly this kind of app — personal, single-device, no
sign-in. When you need the same data on every device (like Project 07's diary), *that's*
when you reach for a real database. Knowing which one a project needs is the skill here.

Under the hood it's simple: everything you do gets bundled into one piece of text and
saved under a single key (`habitTrackerData`). When the app loads, it reads that text back.
You can even see it: open DevTools, find the "Application" (or "Storage") tab, and look at
Local Storage — your habits are sitting right there.

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

This serves the app at **http://localhost:8888**.

> **Netlify will print a few notices that look like warnings but aren't.** Lines like
> "No app server detected. Using simple static server" and "Unable to determine public
> folder" are exactly right — this is a plain static site (all the saving happens in your
> browser, not on any server) and that's what it's serving. An "AI Gateway … Forbidden"
> line, if you see it, is also harmless.

> **On the very first run, wait a moment.** Netlify prints "Local dev server ready" a few
> seconds before it genuinely is. If the page is blank, give it up to 30 seconds and
> refresh. This only happens once.

If port 8888 is busy, the tidiest fix is to close the old terminal that's still
holding it and re-run on 8888. You *can* run `npx netlify dev --port 8899` instead —
but see the note below first.

> **Always reopen on the same address.** Your saved habits are tied to the exact web
> address, *including the port number*. Notes saved at `localhost:8888` do **not** show
> up at `localhost:8899` — to the browser those are two different sites with two separate
> notebooks. If your habits ever look gone after you switched ports, they're not lost:
> go back to the original `localhost:8888` and they're all there. This is the same reason
> they don't appear on a different browser or device.

Press `Ctrl` + `C` to stop the server.

**The real test:** pick a couple of habits, tick some days, then **refresh the page**.
Everything's still there. That's localStorage doing its job.

---

## The prompts

The prompts that build the tracker, and the ones for changing it, are in
**[PROMPTS.md](PROMPTS.md)**. To prove the storage is really yours: tick a few days, open
DevTools → Application → Local Storage, and watch your data sitting there as plain text.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| **Your progress vanished** | Either you (or the app's Reset button) cleared it, or you opened the app in a *different* browser or on a different device — localStorage doesn't travel. Private/incognito windows also start empty and forget everything on close |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd` instead (File Explorer address bar → type `cmd`), or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| Blank page on the very first run | The server said "ready" slightly early. Wait 30 seconds and refresh. Only happens once |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |
| A habit's days aren't responding | Open developer tools (`F12` on Windows, `Cmd` + `Option` + `I` on Mac) and read the Console tab |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**Next up:** Project 06 introduces taking real payments — and later, Project 07 swaps this
project's notebook for a real filing cabinet: a hosted database you can reach from anywhere.
