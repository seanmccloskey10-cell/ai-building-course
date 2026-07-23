# Project 02 — Wordle Clone

Build a word-guessing game. Six tries to guess a hidden five-letter word; after each guess
the tiles turn green, yellow or grey to tell you how close you were. It's called **Lexicon**
here, but you know it as Wordle.

This one has no API key and costs nothing — no account, no billing, nothing to leak. What
it teaches is **game logic**: how a program holds a bit of hidden state (the secret word),
takes input a letter at a time, and applies a set of rules to decide what happens next.
Once you can see how those rules are written down as code, most "games" stop looking like
magic.

**Cost: free.** Everything runs on your own computer.

> ### 👉 Just want to build it?
> Don't follow this README by hand. Make a new empty folder, open it in
> [Claude Code](https://claude.com/claude-code), and paste in the prompt from
> **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches the files and coaches you
> through running and changing it. This README is the reference for what it's all doing.

---

## What you'll build

A single web page: a six-row grid, an on-screen keyboard (your physical keyboard works
too), and the colour-reveal animation. Three files do the whole job:

| File | What it is |
|------|-----------|
| `index.html` | The page — the grid, the keyboard, the "how to play" box |
| `styles.css` | Every bit of the look: colours, the tile flip, the shake when you're wrong |
| `app.js` | **The game itself** — this is where the logic lives |

The game has **no backend** — no database, nothing stored anywhere, no code running on
some other computer. The whole thing is these three files running in your own browser.
(The `npx netlify dev` command you'll use just starts a tiny local web server to hand
those files to your browser, and may leave a small `.netlify` folder behind — both are
harmless plumbing, not part of your game.)

---

## The concept: a game is just rules written down

Strip away the animation and Wordle is a handful of rules:

- There's a **secret word**, picked at random and kept in a variable. The rest of the game
  is about comparing your guesses to it.
- The game keeps a little bit of **state** as you play: which row you're on, which tile
  you're filling, whether the game is over. Every keypress nudges that state.
- When you submit a guess, one function decides the colour of each tile. Green means right
  letter, right spot. Yellow means right letter, wrong spot. Grey means the letter isn't
  in the word. That colouring is the single most interesting piece of code in the project —
  and it's trickier than it looks, because of repeated letters. (What colour is the second
  `L` in `LLAMA` if the word only has one `L`? Go read `getColors` and find out.)

None of this needs the internet, an account, or a penny. It's pure logic, which is exactly
why it's the second thing you build: it's where you start to *read* code, not just run it.

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

There is **no API key and no account** for this project. Nothing to sign up for.

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

**2. Run it**

```bash
npx netlify dev
```

`npx` runs the copy of the Netlify tool that `npm install` just put in this folder — you
never need a global install, and you never need to log in to Netlify to play a game
locally. It serves the page and opens your browser at **http://localhost:8888**.

> **Netlify will print a few notices that look like warnings but aren't.** Lines like
> "No app server detected. Using simple static server" and "Unable to determine public
> folder" are exactly right for this project — your game is just plain files, and that's
> what it's serving. You may also see an "AI Gateway … Forbidden" line; ignore it too.

> **On the very first run, wait a moment before you play.** Netlify prints
> "Local dev server ready" a few seconds before it genuinely is — on the first run it's
> still setting one last thing up in the background. If the page looks blank or odd for a
> few seconds, give it up to 30 seconds and refresh. This only happens once, ever.

If port 8888 is busy, use `npx netlify dev --port 8899` and open that address instead.
Press `Ctrl` + `C` in the terminal to stop the server.

---

## The prompts

The prompts that build this game, and the ones for changing it, are in
**[PROMPTS.md](PROMPTS.md)**. The fastest way to prove you control it: open `app.js`, find
the `VALID_WORDS` list at the top, and add a rude word. It'll show up as a possible answer.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Easiest fix: use `cmd` instead (File Explorer address bar → type `cmd`). Or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| **A blank or broken page on your very first run** | The server said "ready" slightly before it really was. Wait 30 seconds and refresh. Only ever happens once |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |
| The grid or keyboard doesn't respond | Open developer tools and read the Console tab — `F12` on Windows, `Cmd` + `Option` + `I` on Mac. A red error there usually names the exact line |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead. Reading errors and asking good follow-up questions is the actual skill
this course teaches.

---

**Next up:** Project 03, where you take a site like this one and put it on the real
internet.
