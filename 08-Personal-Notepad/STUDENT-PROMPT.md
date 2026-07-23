# The prompt for Project 08

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 08 of the AI Building Course, the "Million Dollar Idea
App" - a notes app I can INSTALL on my phone like a real app (a PWA). I am a beginner. I
may not know what a terminal, a package, or a service worker is. Explain things as you go,
in plain English, and don't assume I know a term just because you used it a moment ago.

This project has NO API key and NO account - nothing to sign up for. We are working in the
folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `08-Personal-Notepad` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, main.js,
style.css, manifest.webmanifest, service-worker.js, an icons/ folder, package.json,
package-lock.json, README.md, PROMPTS.md, STUDENT-PROMPT.md and .gitignore sitting right
here. I should NOT end up with a nested folder.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `08-Personal-Notepad` up (including the icons/ folder and the dotfiles), then delete
    the temp subfolder (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough).
On Windows, if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is
disabled", tell me to use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (this is what Project 08 is really about)

Explain in plain English what makes this a PWA - an installable app - rather than just a
website. Point at the three pieces in the files I downloaded:
  - manifest.webmanifest: the app's name, colours and icons - what lets it appear on a home
    screen properly.
  - service-worker.js: background code that caches the app's files so it OPENS OFFLINE.
  - icons/: the pictures shown on the home screen.
Tell me the big idea: a PWA is the same web code I already know, plus these three
declarations, and it's the cheapest way to get a real installable app without app stores or
learning Swift/Kotlin. Keep it short.

Also mention one thing in main.js: my note text is shown with textContent, not innerHTML,
on purpose - so a note that looks like code is shown as plain text and never runs. That's a
basic security habit worth noticing.

STEP 4 - RUN IT

Run `npm install` (warn it's noisy; the vulnerability warnings are harmless; do NOT run
`npm audit fix --force`). Then `npx netlify dev`. Skip any Netlify login. Reassure me that
"No app server detected / simple static server / unable to determine public folder" is
normal. Warn about first-run timing (ready a few seconds early; wait 30s and refresh if
blank). Tell me to open http://localhost:8888, write a note, and refresh to see it persist.
Port busy → `npx netlify dev --port 8899`.

STEP 5 - INSTALL IT (the fun part)

Coach me through installing it, per the README:
  - On my computer: in Chrome/Edge at localhost:8888, look for an install icon in the
    address bar (or the browser menu's "Install…" option). Installing from localhost works
    because browsers trust localhost.
  - Explain that to install on my actual PHONE I'd first need it on the real internet -
    which I learned to do in Project 03 (deploy to Netlify), then "Add to Home Screen".
    You do NOT need to deploy it for me or touch any account - just explain the path.
  - To prove it's really a PWA: install it, turn off wifi, open it again - it still works,
    because the service worker cached it.
  - Heads up for later edits: because the service worker caches files, if I change the code
    and don't see the change, I need to hard-refresh (Ctrl+Shift+R) or unregister the
    service worker in DevTools -> Application. Tell me this so it doesn't confuse me.

Then point me at PROMPTS.md for ways to make it mine.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. Don't deploy on my behalf or touch
any account. If something doesn't match what this prompt describes, tell me plainly instead
of improvising around it.
```

---

## What "done" looks like

You write notes that survive a refresh, then you **install the app** — an install button on
your computer, or "Add to Home Screen" on your phone once it's deployed — and it opens in
its own window and even works with the wifi off. If you got there, you've turned a website
into a real, installable app.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
