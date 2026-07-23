# The prompt for Project 04

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 04 of the AI Building Course, a live cryptocurrency
price dashboard. I am a beginner. I may not know what a terminal, a package, an API, or a
variable is. Explain things as you go, in plain English, and don't assume I know a term
just because you used it a moment ago.

This project has NO API key and NO account - and that is the whole point of it. We are
working in the folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `04-Crypto-Dashboard` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, script.js,
styles.css, package.json, package-lock.json, README.md, PROMPTS.md, STUDENT-PROMPT.md and
.gitignore sitting right here. I should NOT end up with a nested `ai-building-course`
folder or a nested `04-Crypto-Dashboard` folder.

Use whichever method works on my machine - check what I actually have before choosing:

  - If `git` is available: clone the repo shallowly into a temporary subfolder, move the
    contents of `04-Crypto-Dashboard` into my current folder, then delete the temporary
    subfolder entirely (including its .git folder).

  - If `git` is missing: download the tarball with curl and extract it. Both `curl` and
    `tar` are built into Windows 10+ and macOS.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz

  - If both fail, tell me exactly what failed. Do not hand-write the app from memory - I
    want the real files.

If my folder already has these files, don't re-download. Tell me what's here and move on.

When the files are here, read the README.md you just downloaded before continuing.

STEP 2 - CHECK MY SETUP

Check that Node.js is installed and is version 20 or newer (`node --version`).

If it is missing or too old, stop and tell me to install the LTS build from
https://nodejs.org. Warn me that a new terminal TAB is not enough: VS Code and Claude
Code keep the settings they had when they launched, so I have to fully quit and reopen
them (and if it still fails after that, restart the computer). Don't try to install Node
for me and don't try to work around it.

On Windows, if `npm` or `npx` fails with "npm.ps1 cannot be loaded because running
scripts is disabled on this system", that is PowerShell's default script policy, not a
broken install. Tell me I can either use `cmd` instead, or run
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once in PowerShell and answer Y.

STEP 3 - THE CONCEPT (this is what Project 04 is really about)

Before we run anything, explain the big idea, because this project is the deliberate
OPPOSITE of Project 01:

  - An API is one program asking another for something. Project 01 asked an AI to write a
    roast, and that cost money, so it needed a secret key - which had to be hidden on a
    server so visitors couldn't steal it.
  - THIS project asks CoinGecko for crypto prices. That is free and public - no key, no
    account, no secret. And here's the key insight: because there is no secret to protect,
    the code can call the API straight from the browser. There is no server-side function
    in this project at all. Same idea (call an API), opposite architecture. The deciding
    question is always: is there a secret?
  - The one catch: a free public API limits how OFTEN it answers (a "rate limit"). Ask too
    fast and it returns HTTP 429, which means "slow down", not "broken". Point me at the
    error-handling in script.js and tell me that's what most of the code is actually for.

Keep this short - a few sentences each. The point is that I understand WHY 01 and 04 are
built so differently.

STEP 4 - RUN IT

Run `npm install` (warn me it prints a lot and takes a minute; the vulnerability warnings
at the end are harmless noise - do NOT run `npm audit fix --force`).

Then `npx netlify dev`. It serves the dashboard at http://localhost:8888. If it offers to
log me in to Netlify, tell me I can skip it. Reassure me that netlify printing "No app
server detected / using simple static server / unable to determine public folder" is
normal for a plain static site. And warn me about the first-run timing: it prints "ready"
a few seconds early, so if the page is blank, wait up to 30 seconds and refresh.

Tell me to open http://localhost:8888 and watch the prices load. Then have me open the
browser's DevTools console (F12 on Windows, Cmd+Option+I on Mac) and look at the "API
Response" the code prints - that's the real live data. If port 8888 is busy, use
`npx netlify dev --port 8899`.

If the prices don't appear and a "data's busy, wait a minute" message shows instead, tell
me that's the rate limit, not a bug - especially likely on shared wifi - and it'll fill in
on its own.

STEP 5 - MAKE IT MINE

Once it works:
  - Show me the `API_URL` line at the top of script.js and get me to change the list of
    coins (the `ids=` part) - swap one out or add one like `litecoin`.
  - Walk me through the error-handling in script.js and explain what each case (429, other
    errors, no internet) does, so I see that "handle the failure" is real work.
  - Point me at PROMPTS.md for the bonus challenges.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. If something doesn't match what
this prompt describes, tell me plainly instead of improvising around it.
```

---

## What "done" looks like

You open `http://localhost:8888` and see eight cards of live crypto prices, updating
themselves, with green and red arrows. If the free API is busy you see a calm "wait a
minute" message instead of a broken page. If you got there, you've built an app that talks
to the live internet — and you understand why it didn't need a key when Project 01 did.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
