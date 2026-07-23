# The prompt for Project 05

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 05 of the AI Building Course, a habit streak tracker.
I am a beginner. I may not know what a terminal, a package, or a variable is. Explain
things as you go, in plain English, and don't assume I know a term just because you used
it a moment ago.

This project has NO API key and NO account - nothing to sign up for. Its whole point is
localStorage: saving data in the browser so it survives a refresh. We are working in the
folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `05-Habit-Tracker` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, app.js,
styles.css, package.json, package-lock.json, README.md, PROMPTS.md, STUDENT-PROMPT.md and
.gitignore sitting right here. I should NOT end up with a nested folder.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `05-Habit-Tracker` up, then delete the temp subfolder (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough).
On Windows, if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is
disabled", tell me to use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (this is what Project 05 is really about)

Explain the big idea in plain English: every browser has a small built-in store called
localStorage. My code can save text into it, and it's STILL THERE after I refresh or close
and reopen the browser - which is why my streaks won't vanish like everything did in the
earlier projects.

Then explain the honest limitation, because it's the real lesson: localStorage is NOT a
database. A database lives on a server and shows the same data on every device I log in
from. localStorage lives only in THIS browser on THIS computer - open the app on my phone
and it's blank. It's a private notebook, not a shared filing cabinet. That difference -
knowing which one a project needs - is the point.

Keep it short. Offer to show me the data live later (DevTools -> Application -> Local
Storage).

STEP 4 - RUN IT

Run `npm install` (warn it's noisy; the vulnerability warnings are harmless; do NOT run
`npm audit fix --force`). Then `npx netlify dev`. Skip any Netlify login. Reassure me that
"No app server detected / simple static server / unable to determine public folder" is
normal for a static site. Warn about first-run timing (ready a few seconds early; wait 30s
and refresh if blank).

Tell me to open http://localhost:8888, pick a couple of habits, tick some days - then
REFRESH THE PAGE and see that everything's still there. That's localStorage working. If
port 8888 is busy, use `npx netlify dev --port 8899`.

STEP 5 - MAKE IT MINE

Once it works:
  - Show me the `HABITS` array at the top of app.js and get me to change it to habits I
    actually care about.
  - Open DevTools -> Application -> Local Storage and show me my data sitting there as
    plain text under the `habitTrackerData` key - so I can SEE what "saved in the browser"
    really means.
  - Point out that un-selecting a habit and re-selecting it keeps its history (only the
    Reset button erases things) - and why "never silently destroy the user's data" is a
    rule that matters.
  - Point me at PROMPTS.md for the bonus challenges.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. If something doesn't match what
this prompt describes, tell me plainly instead of improvising around it.
```

---

## What "done" looks like

You pick some habits, tick off a few days, **refresh the page — and it's all still there.**
Then you open DevTools and see your data saved as plain text in the browser. If you got
there, you understand localStorage: how to make data last, and why that's different from a
real database.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
