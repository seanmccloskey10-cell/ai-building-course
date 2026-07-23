# The prompt for Project 11 — the Capstone

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. Unlike the other projects, this one does **not** hand you a finished app —
the agent helps you *build* one from the brief. You're the architect.

---

```text
You are coaching me through Project 11 of the AI Building Course - the CAPSTONE, called
"Command Center." I have finished the other ten projects. This one is different: there is NO
finished app to download and NO step-by-step prompt list. There is a brief, and we build it
together from scratch. I am the architect; you are my builder. Do not just generate the whole
app in one go - build it with me, a module at a time, so I understand what I'm shipping.

STEP 1 - GET THE BRIEF

Fetch the folder `11-Command-Center` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - I should end up with README.md,
STUDENT-PROMPT.md, .env.example and .gitignore, no nested folder. There is deliberately NO
application code in there - just the brief and the setup files. Use git (shallow clone into a
temp subfolder, move the contents up including dotfiles, delete the temp) or the tarball
fallback:
    https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
If both fail, tell me exactly what failed. Then READ README.md carefully - that is the brief,
and it is the source of truth for what we're building. Do not skim it.

STEP 2 - CHECK MY SETUP AND MAKE A PLAN

Check Node.js is version 20 or newer (`node --version`); if missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code. On Windows, if npm/npx fails
with the "npm.ps1 cannot be loaded" error, tell me to use `cmd` or run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

Then, BEFORE writing any code, propose a plan: the six modules from the brief in the order
we'll build them (empty layout -> Mission Planner drag-and-drop board -> habits -> market
data -> AI console -> daily motivation -> polish), and a recommended stack. Tell me plainly
that plain HTML + JavaScript can do all of this (same tools as Projects 04, 05, 08), and that
React with Vite is a reasonable step up for an app this size - lay out the trade-off in one
or two lines and let ME choose. Wait for my choice before scaffolding.

STEP 3 - BUILD IT WITH ME, MODULE BY MODULE

Follow the brief. For each module, tell me which earlier project's concept it reuses, build
just that module, and let me try it before moving on:
  - Mission Planner is the priority and the only genuinely new mechanic (native browser
    drag-and-drop). Get it smooth: drag between three columns, add/delete tasks, reject empty
    names, and persist to localStorage so it survives a refresh (the Project 05 habit).
  - Daily Protocols: reuse the habit-streak logic from Project 05 - complete once per day,
    streak grows, resets on a missed day, persisted.
  - Asset Monitor: live crypto from CoinGecko's free public API (the Project 04 pattern, no
    key). Stocks (Alpha Vantage, free key) are OPTIONAL - offer them but don't block on them.
    Always show a friendly "offline" message on a network error, never a blank box.
  - Command Console + Intel Feed: these call the AI with my Anthropic key, but note this runs
    in the BROWSER - unlike Project 10, which was a Node script, so its exact code won't just
    work here. The clean, safe way is the Project 01 pattern: a tiny serverless function (run
    with `netlify dev`) that holds my key in a server-side .env and makes the Anthropic call,
    so my dashboard calls MY function - no key in browser code, no CORS. If we instead call
    Anthropic straight from browser JS, tell me it needs the
    `anthropic-dangerous-direct-browser-access` header (or the SDK's `dangerouslyAllowBrowser`)
    and that my key is then public, so local-only. Recommend the function approach.
  - Daily Transmission: a quote that's stable for the whole day and changes tomorrow - simple
    date logic, no key.
Save polish (the dark mission-control look, glowing glass panels, colour-coded columns) for
LAST, once everything works.

STEP 4 - KEYS, SAFELY

I need my own Anthropic key for the AI modules. Have me copy .env.example to .env and put my
key there; NEVER use, invent, or ask me to paste a real key to you. Crypto needs no key.

Make sure I understand the key handling - be precise, because a plain static page can't read
a .env at all, and getting this wrong is exactly the Project 01 mistake:
  - Recommended: hold the key in a server-side .env and call Anthropic from a small serverless
    function (Project 01 pattern, run with `netlify dev`). The key never reaches browser code -
    safe, and it's the pattern I already learned.
  - Shortcut (local only): call Anthropic from the browser with the
    `anthropic-dangerous-direct-browser-access` header - but then my key is public, so it's
    only OK because I'm the sole user on my own machine.
Either way, the key stays in .env (gitignored) and is NEVER hardcoded into a .js/.html file.
Remind me that putting this on the real internet would force the server-function pattern.

STEP 5 - SYSTEMS CHECK

When it's built, walk me through the "What done looks like" checklist in the brief - drag and
drop, persistence on refresh, market data loading, the AI answering, habits, and the look.

HOW I WANT YOU TO WORK

I'm the architect - offer options and let me decide the product calls; don't railroad me into
one design. Build a module at a time and check in between. Keep explanations short. When you
run a command, say what it does first. Never use or ask me for a real key, and never deploy
or push to GitHub on my behalf. If I ask for the "whole thing at once," gently push back and
build it in pieces so I actually learn it. This is my graduation - make me do the driving.
```

---

## What "done" looks like

You take a brief with no instructions and, by directing the agent and understanding what
comes back, turn it into a real Mission Control dashboard you'd genuinely leave open all day —
tasks you can drag, habits with streaks, live prices, and an AI you can ask anything. If you
got there, you didn't just finish a project. **You finished the course** — and the skill it
was really teaching is now yours.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
