# The prompt for Project 02

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 02 of the AI Building Course, a Wordle-style word
game. I am a beginner. I may not know what a terminal, a package or a variable is.
Explain things as you go, in plain English, and don't assume I know a term just because
you used it a moment ago.

This project has NO API key and NO account - nothing to sign up for, nothing that can
cost me money. We are working in the folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `02-Wordle-Clone` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, app.js,
styles.css, package.json, package-lock.json, README.md, PROMPTS.md, STUDENT-PROMPT.md and
.gitignore sitting right here. I should NOT end up with a nested `ai-building-course`
folder or a nested `02-Wordle-Clone` folder.

Use whichever method works on my machine - check what I actually have before choosing:

  - If `git` is available: clone the repo shallowly into a temporary subfolder, move the
    contents of `02-Wordle-Clone` into my current folder, then delete the temporary
    subfolder entirely (including its .git folder - I don't want your repo's git history
    in my project).

  - If `git` is missing: download the tarball with curl and extract it. Both `curl` and
    `tar` are built into Windows 10+ and macOS.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz

  - If both fail, tell me exactly what failed and what you'd like me to install. Do not
    silently give up, and do not hand-write the game from memory - I want the real files
    from the repo.

If my folder already has these files (maybe I ran this before), don't re-download over
the top. Tell me what's already here and move on.

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

STEP 3 - THE CONCEPT (this is what Project 02 is really about)

Before we run anything, explain what this project teaches, in plain English: a game is
just a set of rules written down as code, plus a little bit of hidden "state" the program
remembers as I play.

Point me at three things in the code I just downloaded, and explain each in one or two
sentences:
  - The secret word: in `app.js`, `secretWord` is picked at random and kept in a variable.
    Everything else is comparing my guesses to it.
  - The state: the variables `currentRow`, `currentTile`, `gameOver` and `guesses` at the
    top of `app.js`. Every keypress changes one of them.
  - The clever bit: the `getColors` function, which decides green/yellow/grey for each
    tile. Tell me it works in TWO passes (greens first, then yellows) and ask me to guess
    why - the answer is repeated letters, and it's worth me actually thinking about before
    you tell me.

Keep this short - a few sentences each, not a lecture. The point is that I look at real
code and see it isn't magic.

STEP 4 - RUN IT

Run `npm install` in my folder. Warn me first that it prints a lot of text and takes a
minute or two, and that this is normal. It installs into this folder only. It will end
with some "vulnerability" warnings, possibly in red - tell me those are harmless noise
from inside the Netlify tool and NOT to run `npm audit fix --force`.

Then start it with:

    npx netlify dev

Do not install the Netlify CLI globally - `npm install` already put a copy in this folder.
If it asks me to log in to Netlify or link a site, tell me I can skip that.

IMPORTANT, so I don't think it's broken when it isn't: on the FIRST run, netlify prints
"Local dev server ready" BEFORE it is truly ready - it sets one more thing up in the
background. If the page is blank or odd for a few seconds, warn me to wait up to 30
seconds and refresh rather than changing anything. It only happens on the very first run.

Tell me to open http://localhost:8888 and play a round: type a 5-letter word, press Enter,
watch the tiles colour. If port 8888 is busy, use `npx netlify dev --port 8899` and tell
me the new address.

STEP 5 - MAKE IT MINE

Once it works:
  - Show me the `VALID_WORDS` list at the top of `app.js` and get me to add a word to it
    (a real 5-letter word). Explain that it's both the answers and the allowed guesses,
    so my new word can now come up.
  - Walk me through ONE run of `getColors` with a specific guess and secret word, so I can
    see the two-pass colouring actually happen.
  - Point me at PROMPTS.md for the bonus challenges.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. If something doesn't match what
this prompt describes, tell me plainly instead of improvising around it.
```

---

## What "done" looks like

You open `http://localhost:8888`, type a five-letter word, press Enter, and the tiles flip
green, yellow and grey. Play until you win or run out of rows. If you got there, you've
built and understood a real game.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
