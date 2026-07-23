# The prompt for Project 09

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below and
paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 09 of the AI Building Course, "Stock Explorer" - a page that
draws a real stock's price as a chart and then has AI describe what the numbers mean. I am a
beginner. Explain things as you go, in plain English, and don't assume I know a term just
because you used it a moment ago.

This project uses TWO keys (Alpha Vantage for stock data, Anthropic for the AI), but I will get
and fill in my own - you will not use or ask for a real key. Both keys live in server-side
functions, never in the browser. We are working in the folder I have open right now.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `09-Stock-Explorer` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, styles.css,
app.js, a netlify/functions/ folder containing prices.js and analyze.js, netlify.toml,
package.json, package-lock.json, .env.example, .gitignore, README.md, PROMPTS.md and
STUDENT-PROMPT.md. I should NOT end up with a nested folder. Make sure the netlify/ folder and
the dotfiles come across.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `09-Stock-Explorer` up (including netlify/ and the dotfiles), then delete the temp subfolder
    (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. If a .env already exists, NEVER
overwrite it. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install LTS
from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough). On Windows,
if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is disabled", tell me to
use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (what Project 09 is really about)

Explain two ideas in plain English:
  - DRAWING DATA: a line chart is just numbers turned into positions - each day's closing price
    becomes a point (x = when, y = how much), connected by a line. The chart in app.js is drawn
    by hand with SVG, no chart library, so I can see there's no magic.
  - DATA-TO-STORY: the "Analyze" button sends the numbers to Claude and asks it to describe them
    in words - the same AI call as Project 10, pointed at data instead of news. It's observational
    only (no advice), with a "not financial advice" note shown.
Then point out that BOTH keys sit in server-side functions (netlify/functions/prices.js and
analyze.js), never in the browser - the Project 01 lesson, now with two keys.

STEP 4 - THE TWO KEYS (I fill these in myself)

Explain I need two free keys and walk me through getting them - but do NOT use or ask me to
paste a real key to you:
  - Alpha Vantage (free stock data) at https://www.alphavantage.co/support/#api-key - no card,
    ~25 lookups/day on the free tier.
  - Anthropic at https://console.anthropic.com (API keys) - the same key from Projects 01 and 10;
    needs a little credit under Billing.
Have me run `npm install`, then copy .env.example to .env and put both keys in it.

STEP 5 - RUN IT

Have me run `npx netlify dev` (warn npm install is noisy; the vulnerability warnings are harmless;
do NOT run `npm audit fix --force`). Skip any Netlify login. Tell me to open http://localhost:8888
- it loads AAPL to start. Have me try a ticker, switch the time range, and press "Analyze with AI"
to see Claude describe the chart. If I see a "No ... key found" message, my .env isn't set up yet -
help me fix it. Port busy -> `npx netlify dev --port 8899`.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When you run a
command, say what it does before you run it. When you draw the chart, walk me through how a price
becomes a point on the screen - that's the lesson. Never use or ask me to paste a real key, and
never deploy or push to GitHub on my behalf. If something doesn't match what this prompt describes,
tell me plainly instead of improvising around it.
```

---

## What "done" looks like

You type a ticker, watch a real price history draw itself into a chart, read the stats, and then
press one button and have an AI tell you the story those numbers are telling — all while your two
API keys sit safely on the server where nobody can see them. If you got there, you can turn raw
data into a picture *and* into plain English, the safe way.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
