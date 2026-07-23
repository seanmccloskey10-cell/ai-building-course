# The prompt for Project 03

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 03 of the AI Building Course, a personal portfolio
website that I am going to DEPLOY to the real internet. I am a beginner. I may not know
what a terminal, a package, or "deploying" means. Explain things as you go, in plain
English, and don't assume I know a term just because you used it a moment ago.

This project has NO API key and costs nothing. The one new thing it teaches is deploying:
putting my site on the internet with a public web address. We are working in the folder I
have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `03-Portfolio-Website` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, script.js,
styles.css, package.json, package-lock.json, README.md, PROMPTS.md, STUDENT-PROMPT.md and
.gitignore sitting right here. I should NOT end up with a nested `ai-building-course`
folder or a nested `03-Portfolio-Website` folder.

Use whichever method works on my machine - check what I actually have before choosing:

  - If `git` is available: clone the repo shallowly into a temporary subfolder, move the
    contents of `03-Portfolio-Website` into my current folder, then delete the temporary
    subfolder entirely (including its .git folder).

  - If `git` is missing: download the tarball with curl and extract it. Both `curl` and
    `tar` are built into Windows 10+ and macOS.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz

  - If both fail, tell me exactly what failed and what you'd like me to install. Do not
    silently give up, and do not hand-write the site from memory - I want the real files.

If my folder already has these files, don't re-download over the top. Tell me what's here
and move on.

When the files are here, read the README.md you just downloaded before continuing.

STEP 2 - CHECK MY SETUP

Check that Node.js is installed and is version 20 or newer (`node --version`).

If it is missing or too old, stop and tell me to install the LTS build from
https://nodejs.org. Warn me that a new terminal TAB is not enough: VS Code and Claude
Code keep the settings they had when they launched, so I have to fully quit and reopen
them (and if it still fails after that, restart the computer). Don't try to install Node
for me and don't try to work around it.

On Windows, if `npm` or `npx` fails with "npm.ps1 cannot be loaded because running
scripts is disabled on this system", that is PowerShell's default script policy. Tell me I
can either use `cmd` instead, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`
once in PowerShell and answer Y.

STEP 3 - RUN IT LOCALLY (the private rehearsal)

Run `npm install` (warn me it prints a lot and takes a minute; the vulnerability warnings
at the end are harmless noise - do NOT run `npm audit fix --force`).

Then `npx netlify dev`. It serves the site at http://localhost:8888. If it offers to log
me in to Netlify, tell me to skip it - I don't need an account just to preview.

Warn me about the first-run timing: netlify prints "ready" a few seconds before it truly
is, so if the page is blank, wait up to 30 seconds and refresh. Only happens once.

Have me open the site and look at it. Then explain, in one or two sentences, that this
`localhost` address only works on MY computer - which is exactly why the next step matters.

STEP 4 - THE CONCEPT + DEPLOY (this is what Project 03 is about)

Explain the concept in plain English before we do it: `localhost` means "this computer
only". Deploying copies my files onto a server that's always online and gives them a
public web address, so anyone with the link can open my site. That's the difference
between a project and a published project.

Then coach me through deploying with Netlify Drop, which is the simplest way:

  1. Tell me to go to https://app.netlify.com/drop in my browser.
  2. Tell me to drag my project FOLDER onto that page - but WARN me first not to include
     the `node_modules` folder (it's huge and unnecessary for a plain HTML site, and
     Netlify Drop works best under 50MB). The cleanest approach: tell me to drag just the
     three files - index.html, styles.css, script.js - or a copy of the folder with
     node_modules deleted.
  3. Tell me Netlify will give me a live URL in a few seconds, and that to keep/manage the
     site I can sign up for a free account (no card).

IMPORTANT: the drag-and-drop is something I do myself in my browser - you cannot do it for
me, and you should NOT try to deploy on my behalf, log into Netlify, or use any Netlify
account. Your job is to explain each step and tell me what I should see. Wait for me to
tell you it worked and paste my live URL.

If I would rather use the command line, the alternative is `npx netlify deploy` then
`npx netlify deploy --prod` from the project folder (it opens a browser to log me in) -
but Netlify Drop is the easier first deploy, so steer me there unless I ask.

STEP 5 - MAKE IT MINE

Once my site is live:
  - Congratulate me - I have a real website on the internet.
  - Help me replace the placeholder content in index.html with my real name, about-me,
    projects (including the roast generator and Wordle from earlier), and real GitHub /
    LinkedIn links.
  - Explain how to redeploy: drag the folder again, or `npx netlify deploy --prod`.
  - Point me at PROMPTS.md for more.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. Never deploy on my behalf or touch
a Netlify account - deploying is the thing I'm here to learn to do myself. If something
doesn't match what this prompt describes, tell me plainly instead of improvising.
```

---

## What "done" looks like

Your portfolio is running at `http://localhost:8888`, and then it's **live on the internet**
at a `your-name.netlify.app` address you can text to a friend. If you got there, you've
published your first website — the skill that turns everything else in this course into
something other people can actually see.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
