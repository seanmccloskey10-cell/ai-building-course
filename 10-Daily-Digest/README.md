# Project 10 — Daily AI Digest

Build a robot editor. Every morning it reads the news, has an AI pick the three biggest
science-and-tech stories, summarizes each one, and emails you a tidy digest — **without you
doing anything, and without your computer even being on.**

Every project so far ran when *you* clicked something. This one is the first that runs
**on a schedule, by itself.** That's **automation**, and it's the thing that turns a script
into something genuinely useful — it works while you sleep. Along the way you'll use
**Resend**, a service for sending email from code.

**Cost: a few pennies of Anthropic credit per run, and Resend is free.**

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This one has the most moving parts of the whole
> course, so the coaching helps — this README is the reference.

---

## What you'll build

A single Node script and the automation that runs it:

| File | What it is |
|------|-----------|
| `digest.js` | The whole pipeline: fetch news → AI picks the best → AI summarizes → build the email → send it |
| `.env.example` | The list of secret settings you'll copy and fill in |
| `.github/workflows/daily-digest.yml` | **The automation** — the instructions GitHub follows to run your script on a timer |

Running it produces two files (`index.html` and `email.html`) and, when you switch it on,
an email in your inbox.

---

## The concept: code that runs without you

Up to now, "run it" meant *you* typed a command or clicked a button. Automation is code
that runs **on a schedule, on a computer that isn't yours**, with nobody watching.

Here that computer is **GitHub's**. The file at `.github/workflows/daily-digest.yml` is a
set of instructions — "every morning at 7am, install this and run `digest.js`" — that
GitHub carries out for free on its own machines. Your laptop can be shut in a drawer; the
digest still arrives. That's the whole magic of this project, and it's how real scheduled
jobs (backups, reports, reminders) work.

The other new piece is **Resend** — a service that lets your code *send email*. You can't
just send email from a script on your own; you go through a service that's trusted by mail
providers, the same way Project 06 went through Stripe for payments. Resend gives you a key,
your code hands Resend the email, Resend delivers it.

The pipeline inside `digest.js`, start to finish:

1. **Fetch** the latest headlines from a few news feeds (RSS).
2. **Curate** — ask Claude to pick the three most newsworthy.
3. **Summarize** — ask Claude to boil each one down to a few sentences and key points.
4. **Build** a nice HTML email.
5. **Send** it to you with Resend.

---

## Before you start

**Node.js 20 or newer.** Check by opening a terminal and running:

```bash
node --version
```

If that prints `v20.x` or higher, you're fine. If not, install the LTS version from
[nodejs.org](https://nodejs.org).

> **After installing Node, you must restart where you're typing — and "restart" means
> more than opening a new tab.** A brand-new terminal window picks up the new install,
> but **VS Code does not**: opening a fresh terminal tab inside it still inherits the
> old settings from when VS Code launched. You have to quit VS Code completely and
> reopen it. Same for Claude Code — restart it. If `node --version` still fails after
> that, restart the computer.

You'll need **two free keys**, and this is the only project that uses a real one of each:

- **An Anthropic key** for the AI, from [console.anthropic.com](https://console.anthropic.com)
  → API keys. Add a few dollars of credit under Billing; each digest costs pennies.
  (A Claude.ai subscription is **not** API credit — they're billed separately.)
- **A Resend key** for sending email, from [resend.com](https://resend.com) → API Keys.
  The free tier sends 100 emails a day and needs no card.

You do **not** need Python, Git, or the Netlify CLI installed.

---

## Setup and run it once

Do these in a terminal, from inside this project folder.

> **Opening a terminal in this folder**
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar, hit Enter.
> (Or in VS Code: `Ctrl` + `` ` ``.)
> **Mac** — press `Cmd` + `Space`, type `Terminal`, hit Enter, then `cd ` and drag the
> folder onto the window. (Or in VS Code: `Ctrl` + `` ` `` — Control, not Command.)

**1. Install the dependencies**

```bash
npm install
```

Downloads what the script needs (the AI SDK, the email library, the news reader). Prints a
wall of text; that's normal.

**2. Create your `.env` file**

Copy the example and fill in your keys:

```bash
# Mac
cp .env.example .env
```
```
# Windows
copy .env.example .env
```

Open the new `.env` and paste your keys in. **To start, leave `SEND_EMAIL=false`** — that
lets you run the whole thing *without* sending any email, so you can see it work safely. You
only strictly need your `ANTHROPIC_API_KEY` for this first run.

**3. Run it**

```bash
node digest.js
```

Watch the terminal: it fetches articles, Claude picks the top three, summarizes them, and
writes `index.html` and `email.html` into the folder. Open `index.html` in your browser to
see your digest. No email is sent yet — that's what `SEND_EMAIL=false` means.

**4. Now actually email yourself.** In `.env`, set `RESEND_API_KEY` to your Resend key, set
`EMAIL_TO` to your own email address, and change `SEND_EMAIL` to `true`. Run `node digest.js`
again — this time the digest lands in your inbox.

> **Resend free-tier rule:** without your own verified domain, Resend only lets you email
> **the address you signed up with**. That's perfect here — you're emailing yourself. The
> "from" address stays `onboarding@resend.dev`, which is Resend's shared test sender.

---

## Turn on the automation (the actual point)

Right now the digest only runs when *you* type `node digest.js`. To make it run every
morning on its own:

1. **Put this project in your own GitHub repository** (create a repo, push the folder — the
   skills from Project 03 and normal `git` get you there).
2. **Add your keys as repository secrets** so GitHub can use them without them ever appearing
   in your code: in your repo, go to **Settings → Secrets and variables → Actions → New
   repository secret**, and add three: `ANTHROPIC_API_KEY`, `RESEND_API_KEY`, and `EMAIL_TO`.
3. **Switch the schedule on.** Open `.github/workflows/daily-digest.yml` and **uncomment the
   two `schedule` lines** (remove the `#` in front of them). Commit and push.

That's it — GitHub now runs your digest every day at 7am UTC and emails it to you, for free,
forever, with your laptop off. You can also run it by hand anytime from your repo's
**Actions** tab (the "Run workflow" button).

> **Why it ships switched off:** the schedule is commented out on purpose so the automation
> can't fire before you've added your secrets and decided you want it. Turning it on is a
> deliberate step, which is exactly the right instinct for anything that runs by itself.

---

## The prompts

See **[PROMPTS.md](PROMPTS.md)** for the prompts that build the pipeline piece by piece.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| `No ANTHROPIC_API_KEY found` | You haven't created `.env` from `.env.example`, or haven't pasted your key into it |
| It runs but no email arrives | `SEND_EMAIL` isn't `true`, or `EMAIL_TO` is blank, or `RESEND_API_KEY` is missing — the script tells you which |
| Resend error about the recipient | On the free tier you can only email the address you signed up to Resend with. Set `EMAIL_TO` to that address |
| "credit balance is too low" | Your Anthropic account needs a little credit — add a few dollars under Billing at console.anthropic.com |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd`, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| The GitHub automation didn't run | Check the schedule lines are uncommented, all three secrets are set, and the repo's Actions are enabled (Settings → Actions) |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**That's the last of the guided builds.** What's left is the capstone (Project 11) — no
walkthrough, just a brief, using everything these ten taught you.
