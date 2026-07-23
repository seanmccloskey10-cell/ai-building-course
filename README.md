# AI Building Course

Ten small apps that each teach you one real thing about building software with AI.

You do not need to know how to code. You need a laptop, a browser, and a willingness to
read what the AI tells you and ask it a follow-up question.

---

## How it works

Every project in this repo is built the same way, and it is deliberately not a tutorial you
read. It is a build you run.

1. Make a **new empty folder** on your computer and open it in [Claude Code](https://claude.com/claude-code).
2. Open that project's `STUDENT-PROMPT.md` here on GitHub and copy the whole thing.
3. Paste it into Claude Code and press enter.

That is the entire setup. The prompt tells the AI agent to fetch the project files out of
this repo, walk you through getting whatever account or API key that project needs, and
then coach you through running it and changing it.

You are not copying code. You are directing a build and understanding what came back.
When something breaks - and something will - the agent is right there to explain it, which
is the actual skill this course is teaching.

**Start with Project 01.** The others assume you have done it.

---

## The ten projects

Each one is small enough to finish in a sitting and exists to teach the concept in bold.

| # | Project | The concept it teaches | Status |
|---|---------|------------------------|--------|
| 01 | [AI Roast Generator](01-AI-Roast-Generator/) | **API keys** - what they are, why one must never appear in code you share, and the server-side pattern that keeps yours private | ✅ Ready |
| 02 | [Wordle Clone](02-Wordle-Clone/) | **Game logic** - state, rules, and turning "the rules of a game" into code | ✅ Ready |
| 03 | [Personal Portfolio](03-Portfolio-Website/) | **Deploying** - taking a folder on your laptop and putting it on the real internet with Netlify | ✅ Ready |
| 04 | [Crypto Dashboard](04-Crypto-Dashboard/) | **Live data** - pulling real numbers from a public API that needs no key at all, the deliberate opposite of Project 01 | ✅ Ready |
| 05 | Habit Streak Tracker | **localStorage** - saving data in the browser so it survives a refresh, without any database | 🔜 Coming |
| 06 | Buy Me a Coffee | **Stripe** - taking an actual payment from an actual human | 🔜 Coming |
| 07 | Dear Diary | **Supabase** - a real hosted database, with row-level security so one user cannot read another's entries | 🔜 Coming |
| 08 | Million Dollar Idea App | **PWA** - making a website installable on a phone like a native app | 🔜 Coming |
| 09 | Stock Explorer | **Charts and data-to-story** - drawing real data, then having an AI narrate what the numbers mean | 🔜 Coming |
| 10 | Daily AI Digest | **Automation** - code that runs on a schedule without you, and emails you the result via Resend | 🔜 Coming |
| 11 | Command Center | **The capstone.** No walkthrough, no answer key - just a brief. Use everything the ten taught you | 🔜 Coming |

Projects land one per lesson. This table is the source of truth for what is actually
ready - if a row says "Coming", the folder is not here yet.

---

## What you need before you start

- **A laptop** running Windows or macOS. Both are supported and both are tested.
- **[Node.js](https://nodejs.org)** - version 20 or newer. Project 01 checks this for you
  and tells you what to do if yours is older.
- **[Claude Code](https://claude.com/claude-code)** - the AI agent that does the building
  with you.
- **A card on file with OpenAI** for Project 01 only, and only a few pence of usage. Every
  project says up front what it costs. Most cost nothing.

You do **not** need to install Git, Python, or any command-line tools ahead of time. If a
project needs something, its prompt handles it.

---

## About your API keys

Project 01 is first for a reason: it is the one that can actually cost you money if you get
it wrong, and the mistake is extremely common.

The rules this whole repo follows, which you should copy into everything you ever build:

- A key lives in a file called `.env`, and `.env` is listed in `.gitignore` so it never
  reaches GitHub.
- Every project ships a `.env.example` showing the exact variable names with fake values.
  You copy it to `.env` and put your real key in that copy.
- **A key in front-end code is public**, even if the file looks private in your editor.
  Anyone who opens your live site can read it. Project 01 shows you the fix rather than
  just warning you about the problem.
- There is **no real key anywhere in this repo**, and its git history is scanned before
  every push to keep it that way.

If you ever paste a key somewhere public by accident, do not just delete it - go to the
provider and revoke it. Deleting the file does not un-share the secret.

---

## Getting unstuck

The agent is your first line of support. Paste the error at it and say what you expected to
happen instead. That is not cheating, it is the job.

If you think something in this repo is genuinely wrong or broken, open an issue.

---

Built by [Sean McCloskey](https://mccloskey.ai). Use it, fork it, teach with it.
