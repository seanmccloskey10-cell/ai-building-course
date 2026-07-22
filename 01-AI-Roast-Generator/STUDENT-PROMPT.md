# The prompt for Project 01

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 01 of the AI Building Course. I am a beginner. I
have never built an app before, and I may not know what a terminal, a package or an
environment variable is. Explain things as you go, in plain English, and don't assume
I know a term just because you used it a moment ago.

We are working in the folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `01-AI-Roast-Generator` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html,
app.js, package.json, package-lock.json, netlify.toml, README.md, PROMPTS.md,
STUDENT-PROMPT.md, .env.example, .gitignore and a netlify/functions/ folder sitting
right here. I should NOT end up with a nested `ai-building-course` folder or a nested
`01-AI-Roast-Generator` folder.

Use whichever method works on my machine - check what I actually have before choosing:

  - If `git` is available: clone the repo shallowly into a temporary subfolder, move
    the contents of `01-AI-Roast-Generator` into my current folder, then delete the
    temporary subfolder entirely (including its .git folder - I don't want your
    repo's git history in my project).

  - If `git` is missing: download the tarball with curl and extract it. Both `curl`
    and `tar` are built into Windows 10+ and macOS.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz

  - If both fail, tell me exactly what failed and what you'd like me to install. Do
    not silently give up, and do not hand-write the app from memory - I want the real
    files from the repo.

If my folder already has these files (maybe I ran this prompt before), don't
re-download over the top. Tell me what's already here and move to the next step. If a
`.env` file already exists, NEVER overwrite it - it may already have my key in it.

When the files are here, read the README.md you just downloaded before continuing. It
describes the project you're about to walk me through.

STEP 2 - CHECK MY SETUP

Check that Node.js is installed and is version 20 or newer (`node --version`).

If it is missing or too old, stop and tell me to install the LTS build from
https://nodejs.org, and that I must close and reopen my terminal afterwards. Don't
try to install Node for me and don't try to work around it - nothing else will work
until that's sorted.

STEP 3 - MY API KEY (this is the only part you cannot do for me)

Explain, briefly and in plain English, what an API key is and why this project keeps
it in a file called .env instead of in the code. The one-line version: anything in
the front-end code is visible to every visitor of a live site, so the key has to stay
on the server.

Then walk me through getting one:

  1. Go to https://console.anthropic.com and sign up.
  2. Click "API keys", then "Create Key". Copy it - it is only shown once.
  3. Go to "Billing" and add a small amount of credit. A few dollars is plenty; this
     project costs pennies.

Tell me clearly that a Claude.ai subscription is NOT API credit - they are separate
products with separate billing. This trips up almost everyone: without credit the app
will build and run perfectly and then fail on the first roast.

Then STOP and wait for me to paste my key into the chat. Do not continue past this
point without it. Do not invent a key, do not use a placeholder, and do not go
looking for an existing key anywhere else on my computer - I want to do this bit
myself, because doing it once is how I learn it.

When I give you the key:
  - Create the .env file for me (this avoids a real trap: on Windows, creating files
    in File Explorer silently produces .env.txt, which looks identical and does not
    work).
  - Write it as one line: ANTHROPIC_API_KEY=<my key> with no quotes, no spaces around
    the = and no trailing whitespace or blank line after it.
  - Confirm that .gitignore already lists .env, and show me the line. Explain that
    this is what stops my key reaching GitHub.
  - Do not print my key back to me in full, and never put it in a file other than
    .env.

STEP 4 - INSTALL AND RUN

Run `npm install` in my folder. Warn me first that it prints a lot of text and takes
a minute or two, and that this is normal. It installs into this folder only - nothing
goes system-wide.

Then start the app with:

    npx netlify dev

Use exactly that command. Do NOT add the `--offline` flag: it stops the serverless
function being served and the app will return 404 when I click the button. Do not
install the Netlify CLI globally - `npm install` already put a copy in this folder and
npx will find it.

If it asks me to log in to Netlify or link a site, tell me I can skip that - local
development works fine without a Netlify account.

Tell me to open http://localhost:8888 and try it: pick a photo, hit the button, get
roasted. If port 8888 is busy, use `npx netlify dev --port 8899` and tell me the new
address.

STEP 5 - WHEN IT BREAKS, AND MAKING IT MINE

If anything fails, read the actual error and explain what it means before changing
anything. The most common causes, in order: no credit on the Anthropic account; a
typo or stray quote in .env; the server not restarted after .env changed (it only
reads that file at startup); the wrong Node version.

Once it works:
  - Show me where in netlify/functions/roast.js the comedian's personality is set,
    and get me to change it to something else. Gordon Ramsay is a good first try.
  - Show me the ONE line that would have leaked my key if I'd put the API call in
    app.js instead, and explain concretely who could have read it.
  - Point me at PROMPTS.md for the bonus challenges.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps rather than doing all of it
and reporting back at the end. Keep explanations short. When you run a command, say
what it does before you run it. If something doesn't match what this prompt describes
- a missing file, a different error, an unexpected version - tell me plainly instead
of improvising around it.
```

---

## What "done" looks like

You upload a picture at `http://localhost:8888`, click the button, and an AI insults it
within a couple of seconds. If you got there, you've built and run a real app with a
real API key handled the right way.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
