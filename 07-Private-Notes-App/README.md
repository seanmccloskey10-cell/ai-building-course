# Project 07 — Dear Diary

Build a private diary where you sign up, log in, and save entries — and **no other user
can ever read yours.** The twist you'll actually learn: that privacy is enforced by the
**database itself**, not by anything clever in your code.

Every project so far kept its data either in the browser (Project 05, 08) or nowhere at
all. This one uses a **real hosted database** — [Supabase](https://supabase.com) — with
**Row Level Security (RLS)**: a guard that lives on Supabase's servers and, when anyone
asks for entries, hands back only the ones that belong to them. Even if someone could read
every line of your JavaScript, they still couldn't see another person's diary — because the
protection isn't in your code to bypass.

**Cost: free.** Supabase's free tier is plenty, and you run the app locally.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This README is the reference.

---

## What you'll build

| File | What it is |
|------|-----------|
| `index.html` | The diary page — account box, entry form, list of entries |
| `styles.css` | The look — soft pastels, elegant fonts, an animated lock |
| `app.js` | The logic — sign up / log in / log out, save an entry, load your entries |
| `Supabase-Configuration.js` | Where **you** paste your Supabase URL and anon key |
| `supabase-setup.sql` | The database setup you run once — creates the table **and the guard** |

---

## The concept: the database enforces privacy, not your code

Two ideas do all the work here.

**🏨 Supabase is your backend, hosted for you.** Creating accounts, checking passwords,
remembering who's logged in, storing data — Supabase does all of it. You just call simple
functions like `signUp()` and `signInWithPassword()`. Think of it as a hotel: the **URL**
is the address, the **anon key** is your guest pass.

**💂 Row Level Security is the guard.** Your entries live in a table called `entries`. The
moment you switch RLS on, that table is locked by default, and you give it exactly one rule:
*"a person may only touch rows where `user_id` is their own id."* From then on, when your
app runs `select * from entries` — which *looks* like it grabs everything — Supabase quietly
returns only the rows that belong to whoever's asking.

That's the a-ha moment, and it's worth saying plainly:

> There is no `where user_id = ...` anywhere in `app.js`. Look for it — it isn't there. The
> database does the filtering, on its own servers, every time. That's why your anon key can
> be public: the key gets you to the door; the guard decides what you're allowed to see.

This is the deliberate opposite of **Project 01**, where the key had to stay secret. Here
the key is *meant* to be public — because a different mechanism (the guard) does the
protecting. Same course, two halves of one idea.

---

## Before you start

**1. Node.js 20 or newer.** Check in a terminal:

```bash
node --version
```

If that prints `v20.x` or higher, you're set. If not, install the LTS version from
[nodejs.org](https://nodejs.org).

> **After installing Node, restart where you type — and "restart" means more than a new
> tab.** A brand-new terminal window picks up the install, but **VS Code does not**: a fresh
> tab inside it still inherits the old settings from when VS Code launched. Quit VS Code
> completely and reopen it. Same for Claude Code. If `node --version` still fails, restart
> the computer.

**2. A free Supabase project.**

1. Create a free account at [supabase.com](https://supabase.com).
2. Create a new project — any name, and set a database password (this is just Supabase's own
   admin password; you won't need it in the app). Pick a region near you.
3. Wait ~2 minutes for it to finish provisioning.
4. Grab your two values from **Project Settings**:
   - **Project URL** — Project Settings → **Data API** → Project URL
   - **anon / publishable key** — Project Settings → **API Keys** → anon public key
5. **Turn off email confirmation while you're testing** (recommended). Go to
   **Authentication → Providers → Email** (some dashboards word it slightly differently) and
   switch **Confirm email** *off*. This lets you sign up and land straight in the app — which
   the two-account privacy test later depends on, since it uses throwaway `+a` / `+b` alias
   accounts. Leave it on and every signup must click a confirmation email before it can log
   in. If you can't find the toggle (Supabase moves it around), it's fine to leave it on and
   just click the confirmation link Supabase emails you instead.

Both values are safe to be public — you'll paste them straight into a committed file. (The
**secret** key on that same page gives full database access and bypasses the guard — this
project never uses it, and it must never go in front-end code.)

> Supabase changes its dashboard layout fairly often. If a menu name here doesn't match what
> you see, tell the agent what the screen actually says and it'll find the right spot — the
> two things you need are always called "Project URL" and the "anon"/"publishable" key.

---

## Setup and run it once

Do these in a terminal, from inside this project folder.

> **Opening a terminal in this folder**
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar, hit Enter.
> (Or in VS Code: `Ctrl` + `` ` ``.)
> **Mac** — `Cmd` + `Space`, type `Terminal`, Enter, then `cd ` and drag the folder onto the
> window. (Or in VS Code: `Ctrl` + `` ` `` — Control, not Command.)

**1. Install the local dev server**

```bash
npm install
```

Downloads Netlify's local server so the app runs over `http://localhost` rather than a bare
file — Supabase login needs a real web address, even a local one. It prints a wall of text
and some vulnerability warnings; that's normal, and **do not** run `npm audit fix --force`.

**2. Paste in your Supabase values**

Open `Supabase-Configuration.js` and replace the two `PASTE_YOUR_...` placeholders with your
**Project URL** and **anon key** from the step above. Save the file.

**3. Create the table and the guard**

In your Supabase project, open **SQL Editor → New query**, paste in the entire contents of
`supabase-setup.sql`, and click **Run**. This creates the `entries` table, switches on Row
Level Security, and installs the one privacy rule. You only do this once.

**4. Run it**

```bash
npx netlify dev
```

Skip any Netlify login prompt. Messages like "No app server detected" or "unable to
determine public folder" are normal for a static site. When it's ready, open
**http://localhost:8888**, sign up with an email and a password (min 6 characters), and
write your first entry.

> **Heads up on email confirmation:** depending on your Supabase settings, signing up may
> send a confirmation email you have to click before you can log in. If login says "Email
> not confirmed", check your inbox — or turn confirmation off under **Authentication →
> Providers → Email** in Supabase while you're testing.

---

## Prove the privacy actually works

This is the point of the whole project — see the guard do its job with your own eyes. Gmail
trick: `yourname+a@gmail.com` and `yourname+b@gmail.com` both land in `yourname@gmail.com`,
so you can make two accounts from one inbox.

1. Sign up as **User A** (`yourname+a@gmail.com`), write 2–3 entries, then **log out**.
2. Sign up as **User B** (`yourname+b@gmail.com`). Its entries list is **empty** — User B
   cannot see a trace of User A's diary.
3. Add an entry as User B, log out, and **log back in as User A**. User A still sees exactly
   their own entries, and none of User B's.

You never wrote a line of filtering code. The database refused to hand over other people's
rows — that's RLS.

---

## The prompts

See **[PROMPTS.md](PROMPTS.md)** for the prompts that build the app piece by piece, plus
bonus rounds (a delete button, sharing an entry with a coach).

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| A "🔒 One step first" message instead of the diary | You haven't pasted your values into `Supabase-Configuration.js` yet, or didn't save it |
| `Invalid API key` or `Failed to fetch` | The URL or anon key is wrong or has a stray space — recopy both from Project Settings |
| Sign-up works but login says "Email not confirmed" | Supabase is requiring email confirmation — click the link it emailed, or turn confirmation off under Authentication → Providers → Email |
| Saving shows a red error like `relation "entries" does not exist` | You haven't run `supabase-setup.sql` yet, so the table isn't there — run it in the SQL Editor |
| You can see entries from another account | RLS isn't on — re-run `supabase-setup.sql`; the `alter table ... enable row level security` and the policy are what enforce privacy |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd`, or run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**Next up:** the automation project (Project 10) and then the capstone (Project 11).
