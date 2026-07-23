# Project 03 — Portfolio Website

Build a personal portfolio site — about you, your projects, your skills, a contact form —
and then do the thing that actually matters: **put it on the real internet**, with a live
web address you can send to anyone.

Everything up to now has run on `localhost`, which only exists on your computer. This
project teaches **deploying**: taking a folder of files and turning it into a website the
whole world can open. That's the step that turns "I made a thing" into "here's the link."

**Cost: free.** The site, the hosting, the web address — all free on Netlify's starter
plan.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files, gets it running locally, and walks you through deploying it. This README is
> the reference — the deploy section especially is worth reading yourself.

---

## What you'll build

A clean single-page portfolio. Three files, no server, no database:

| File | What it is |
|------|-----------|
| `index.html` | The page — about, projects, skills, a contact form |
| `styles.css` | The whole look |
| `script.js` | A tiny bit of code so the contact form says thanks |

Then you'll deploy it and get a URL like `your-name.netlify.app`.

---

## The concept: "on my laptop" vs "on the internet"

When you run a site with `netlify dev`, the address is `http://localhost:8888`.
**`localhost` means "this computer."** Nobody else can open it — not on their phone, not
across the room, not ever. It's a private rehearsal.

**Deploying** copies your files onto a computer that's always on and always connected —
a *server* someone else runs for you — and gives it a public address. Now anyone with the
link can open your site. That's the entire difference between a project and a *published*
project, and it's the single most useful thing in this whole course: distribution. A thing
nobody can open might as well not exist.

You'll use **Netlify** for this. It's free for sites like ours, and it's genuinely the
easiest way to go from a folder to a live URL.

---

## Before you start

**Node.js 20 or newer.** Check by opening a terminal and running:

```bash
node --version
```

If that prints `v20.x` or higher, you're fine. If it prints something lower, or
"command not found", install the LTS version from [nodejs.org](https://nodejs.org).

> **After installing Node, you must restart where you're typing — and "restart" means
> more than opening a new tab.** A brand-new terminal window picks up the new install,
> but **VS Code does not**: opening a fresh terminal tab inside it still inherits the
> old settings from when VS Code launched. You have to quit VS Code completely and
> reopen it. Same for Claude Code — restart it. If `node --version` still fails after
> that, restart the computer; it always works and costs less time than debugging it.

You do **not** need Python, Git, or the Netlify CLI installed. The setup handles those.

For the deploy step you'll make a **free Netlify account** — no card, no cost. More on
that below.

---

## Run it locally first

Do these in a terminal, from inside this project folder.

> **Opening a terminal in this folder**
>
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar and hit
> Enter. (Or in VS Code: `Ctrl` + `` ` ``.)
>
> **Mac** — press `Cmd` + `Space`, type `Terminal`, hit Enter. Then type `cd ` — with a
> space after it — and **drag your project folder from Finder onto the Terminal
> window**. It fills in the path for you. Hit Enter.
> (Or in VS Code: `Ctrl` + `` ` `` — that's **Control**, not Command, on Mac too.
> `Cmd` + `` ` `` is a system shortcut and won't open a terminal.)

**1. Install the dependencies**

```bash
npm install
```

This reads `package.json` and downloads what the project needs, including the Netlify
tool — into this folder only. Nothing is installed system-wide. It takes a minute or two
and prints a wall of text; that is normal.

> **It will end by reporting some "vulnerabilities" and deprecation warnings, possibly
> in red.** Ignore them — they come from inside the Netlify tool's own dependencies and
> do not affect this project. In particular **do not run `npm audit fix --force`**, which
> is far more likely to break your project than the warnings are.

**2. Run it**

```bash
npx netlify dev
```

This serves your site at **http://localhost:8888** — your private rehearsal. Check it
looks right here before you put it online.

> **Netlify will print a few notices that look like warnings but aren't.** Lines like
> "No app server detected. Using simple static server" and "Unable to determine public
> folder" are exactly right for this project — our site is just plain files, and that's
> what it's serving. You may also see an "AI Gateway … Forbidden" line; ignore it too.
> None of these stop the site working.

> **On the very first run, wait a moment.** Netlify prints "Local dev server ready" a few
> seconds before it genuinely is. If the page looks blank or odd, give it up to 30 seconds
> and refresh. This only happens once, ever.

Press `Ctrl` + `C` to stop the local server when you're ready to deploy.

---

## Deploy it — the main event

There are three ways to put this online. **Do the first one** — it's the simplest thing in
software and it works in about a minute. The other two are here for when you want them.

### Option A — Drag and drop (start here)

No command line, no accounts required to *try* it.

1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
2. Open your project folder in your file browser (Finder / File Explorer).
3. **Drag the whole folder onto the page.** Netlify uploads it and, a few seconds later,
   gives you a live URL like `https://random-name-123.netlify.app`. That link works for
   anyone, anywhere, right now.
4. To keep it, rename it, or update it later, **sign up for a free Netlify account** (no
   card) and the site attaches to your account. Without an account the site still goes
   live, but you can't manage it afterwards.

> **Don't drag `node_modules`.** If you ran `npm install`, your folder now contains a big
> `node_modules` folder. You don't need it for a plain HTML site and it's slow to upload —
> Netlify Drop works best under 50MB. Either drag only `index.html`, `styles.css` and
> `script.js`, or make a copy of the folder with `node_modules` deleted and drag that.

### Option B — The Netlify command line

You already installed the Netlify tool with `npm install`, so from the project folder:

```bash
npx netlify deploy
```

It'll ask you to log in (a browser opens — click authorise), then walk you through a few
questions. Run it once for a draft URL to preview; when you're happy:

```bash
npx netlify deploy --prod
```

`--prod` publishes it as the real, live version.

### Option C — Connect GitHub (the grown-up way)

If your project is in a GitHub repository, you can connect that repo to Netlify once, and
from then on **every time you push a change, your live site updates itself automatically.**
This is how real teams ship. It's more setup than you need today, but it's where this
leads — [Netlify's docs walk through it](https://docs.netlify.com/deploy/deploy-overview/).

---

## Make it yours

Right now the site says "The Code Explorer" and the links go nowhere. Before you show it
off, open `index.html` and:

- Put **your name** in the header and rewrite the "About Me" paragraph.
- Swap the two example projects for things *you've* built — including projects 01 and 02
  from this course. Point the "View Project" links at your deployed versions.
- Fill in the **GitHub / LinkedIn / X** links in the footer, or delete the ones you don't
  use.
- Change the skills to your own.

Redeploy (drag the folder again, or `npx netlify deploy --prod`) and your changes are live.

See **[PROMPTS.md](PROMPTS.md)** for the prompts that build and restyle it.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd` instead (File Explorer address bar → type `cmd`), or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| **A blank page on your very first `netlify dev` run** | The server said "ready" slightly before it was. Wait 30 seconds and refresh. Only ever happens once |
| Netlify Drop upload is slow or "stuck" | You probably dragged the `node_modules` folder too. Drag only the three site files, or a copy of the folder with `node_modules` removed |
| Deployed site looks unstyled | `styles.css` didn't upload, or wasn't in the folder you dragged. Make sure all three files go up together |
| Port 8888 already in use | An old server is still running. Close the other terminal, or run `npx netlify dev --port 8899` |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**Next up:** Project 04, where your site starts pulling in real, live data from the
internet — no key required.
