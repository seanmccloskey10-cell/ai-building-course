# The prompt for Project 10

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 10 of the AI Building Course, a Daily AI Digest - a
script that reads the news, has AI pick and summarize the top stories, and emails me a
digest on a schedule. I am a beginner. This is the most involved project in the course, so
explain things as you go, in plain English, and don't assume I know a term just because you
used it a moment ago.

This project uses TWO keys (one for the AI, one for email) but I will get and fill in my
own - you will not use or ask for a real key. We are working in the folder I have open right
now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `10-Daily-Digest` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with digest.js,
package.json, package-lock.json, .env.example, .gitignore, a .github/workflows/ folder with
daily-digest.yml inside it, README.md, PROMPTS.md and STUDENT-PROMPT.md. I should NOT end up
with a nested folder. Make sure the hidden .github folder and the dotfiles come across.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `10-Daily-Digest` up (including .github/ and the dotfiles), then delete the temp
    subfolder (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. If a .env already exists, NEVER
overwrite it. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough).
On Windows, if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is
disabled", tell me to use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (this is what Project 10 is really about)

Explain the two new ideas in plain English:
  - AUTOMATION: every project so far ran when I clicked something. This one runs on a
    SCHEDULE, on GitHub's computers, without me and without my laptop being on. The file
    .github/workflows/daily-digest.yml is the instructions GitHub follows on a timer. That's
    the whole point of the project.
  - The Resend email API: my code can't just send email on its own; it goes through a
    service (Resend) that mail providers trust - like Project 06 went through Stripe for
    payments.
Then describe the pipeline in digest.js: fetch RSS news -> Claude picks the top 3 -> Claude
summarizes each -> build an HTML email -> send it with Resend. Keep it short.

STEP 4 - THE TWO KEYS (I fill these in myself)

Explain that I need two free keys, and walk me through getting them - but do NOT use or ask
me to paste a real key to you; I put them in my own .env file:
  - An Anthropic key from https://console.anthropic.com (API keys). Needs a few $ of credit
    under Billing. Note a Claude.ai subscription is NOT API credit.
  - A Resend key from https://resend.com (API Keys). Free tier, no card.
Have me run `npm install`, then copy .env.example to .env. Tell me to leave SEND_EMAIL=false
for now and just fill in ANTHROPIC_API_KEY - that lets me run the whole thing safely without
emailing anything.

STEP 5 - RUN IT

Have me run:

    node digest.js

Walk me through the output: it fetches articles, Claude picks the top 3, summarizes them,
and writes index.html and email.html into the folder. Tell me to open index.html to see my
digest. No email is sent because SEND_EMAIL is false - reassure me that's intended.

Then, when I'm ready to actually email myself: set RESEND_API_KEY, set EMAIL_TO to my own
email, set SEND_EMAIL=true, and run again. Warn me that on Resend's free tier I can only
email the address I signed up with - which is fine, I'm emailing myself.

STEP 6 - TURN ON THE AUTOMATION

Explain (don't do it for me - it's my repo and my secrets):
  - Put the project in my own GitHub repo.
  - Add ANTHROPIC_API_KEY, RESEND_API_KEY and EMAIL_TO as repository secrets under
    Settings -> Secrets and variables -> Actions.
  - Uncomment the two `schedule` lines in .github/workflows/daily-digest.yml and push.
Then GitHub runs my digest every morning for free, with my laptop off. Explain why the
schedule ships commented-out (so it can't run before my secrets exist).

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps - this project has a lot of parts.
Keep explanations short. When you run a command, say what it does before you run it. Never
use or ask me to paste a real key to you, and never turn on the schedule or push to GitHub
on my behalf. If something doesn't match what this prompt describes, tell me plainly.
```

---

## What "done" looks like

You run `node digest.js` and watch an AI read the news, pick the best stories, summarize
them, and build you a digest — then, once you flip `SEND_EMAIL` on, it lands in your inbox.
Turn on the GitHub schedule and it arrives every morning with your computer off. If you got
there, you've built real automation: code that works for you while you sleep.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
