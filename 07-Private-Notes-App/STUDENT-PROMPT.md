# The prompt for Project 07

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 07 of the AI Building Course, "Dear Diary" - a private
diary app with real user accounts and a hosted database, where one user can never read
another's entries. I am a beginner. Explain things as you go, in plain English, and don't
assume I know a term just because you used it a moment ago.

This project uses Supabase (a hosted database). It needs two values - a Project URL and an
"anon" key - but these are PUBLIC by design and I paste them in myself; you will not create
my Supabase account for me or touch the separate SECRET key. We are working in the folder I
have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `07-Private-Notes-App` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html, styles.css,
app.js, Supabase-Configuration.js, supabase-setup.sql, package.json, package-lock.json,
README.md, PROMPTS.md, STUDENT-PROMPT.md and .gitignore sitting right here. I should NOT end
up with a nested folder. Make sure the dotfiles come across.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `07-Private-Notes-App` up (including the dotfiles), then delete the temp subfolder
    (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. If a Supabase-Configuration.js with
real values already exists, NEVER overwrite it. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough).
On Windows, if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is
disabled", tell me to use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (this is what Project 07 is really about)

Explain the two ideas in plain English:
  - SUPABASE is a hosted backend: it creates accounts, checks passwords, remembers who's
    logged in, and stores data - so my code just calls simple functions. The Project URL is
    the address; the anon key is my public "guest pass".
  - ROW LEVEL SECURITY (RLS) is the guard. My entries live in a table, and RLS is a rule,
    enforced by Supabase's servers, that only ever returns rows belonging to whoever's
    asking. This is why the anon key can be public: the guard - not the secrecy of the key -
    is what keeps my diary private. Even someone reading all my JavaScript can't bypass a
    guard that isn't in my code. Contrast this with Project 01, where the key HAD to stay
    secret - opposite halves of one idea.

STEP 4 - SET UP SUPABASE (I do the dashboard parts myself)

Walk me through, but let me do the clicking - do NOT create my account or paste my values
for me:
  - Create a free project at supabase.com (any name; set a database password; pick a nearby
    region) and wait ~2 min for it to finish.
  - Get my two values: Project URL (Project Settings -> Data API) and the anon/publishable
    key (Project Settings -> API Keys). Both are safe to be public. Tell me NOT to use the
    separate secret key anywhere.
  - Have me paste both into Supabase-Configuration.js (replacing the PASTE_YOUR_... lines)
    and save.
  - Recommend I turn OFF email confirmation while testing: Authentication -> Providers ->
    Email, switch "Confirm email" off. This lets me sign up and log straight in, which the
    two-account privacy test in STEP 6 needs. If the toggle isn't where you expect (Supabase
    moves it), tell me plainly - we'll find it, or just click the confirmation emails instead.
  - Have me open Supabase's SQL Editor -> New query, paste in the whole of
    supabase-setup.sql, and click Run. Explain what it does: creates the `entries` table,
    turns ON Row Level Security, and installs the "only your own rows" policy. Supabase's UI
    changes often - if a menu name doesn't match, help me find the right screen rather than
    insisting on exact wording.

STEP 5 - RUN IT

Have me run `npm install` (warn it's noisy; the vulnerability warnings are harmless; do NOT
run `npm audit fix --force`), then `npx netlify dev`. Skip any Netlify login. Reassure me
that "No app server detected / unable to determine public folder" is normal. Tell me to open
http://localhost:8888, sign up with an email and a 6+ character password, and write an entry.
If I see a "One step first" message, my Supabase-Configuration.js still has placeholders -
help me fix that. If login says "Email not confirmed", explain I can click the emailed link
or turn email confirmation off under Authentication -> Providers -> Email. Port busy ->
`npx netlify dev --port 8899`.

STEP 6 - PROVE THE PRIVACY WORKS (the payoff)

Walk me through the two-account test from the README: sign up as User A (using a
name+a@gmail.com alias), add entries, log out; sign up as User B (name+b@gmail.com) and
confirm the list is EMPTY; log back in as User A and confirm my entries are still there.
Then make the point explicitly: there is no "where user_id" filter anywhere in app.js - the
database refused to hand over the other user's rows all by itself. That's RLS.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps - this project has dashboard work
and a database step, not just code. Keep explanations short. When you run a command, say
what it does before you run it. Don't create my Supabase account or run the SQL for me, and
never use or ask me for the secret key. If something doesn't match what this prompt
describes, tell me plainly instead of improvising around it.
```

---

## What "done" looks like

You sign up, write a private entry, and then — with a second account — watch the app refuse
to show you the first account's diary, even though nothing in your code filters anything. If
you got there, you've built real accounts on a real database and learned the thing that makes
multi-user apps safe: **the database enforces who sees what, not your code.**

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
