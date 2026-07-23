# Project 10 — The Prompts

The prompts that build the digest pipeline, in order. Setup, the two keys, and turning on
the automation are all in **[README.md](README.md)** — this is the most involved project in
the course, so read the README as you go.

> **Read what the AI writes before you accept it.** This project has several pieces that
> hand off to each other; ask *"walk me through how these steps connect"* whenever it gets
> hazy.

---

## 🧱 Foundation — fetch the news

> Start a Node script that fetches the latest headlines from a few RSS news feeds (science and tech). For each feed, grab the top couple of articles — title, a short snippet, the link, and the source name — and collect them into one list. Print what it found.

---

## 🎩 Functionality — the AI editor picks the best

> Now add an AI editor. Send the list of articles to Claude and ask it to pick the three most newsworthy and impactful stories, avoiding duplicates. Have it return just the numbers of its picks, and use those to narrow the list down to three.

---

## 🤖 Functionality — the AI summarizes each one

> For each of the three chosen articles, ask Claude to write a short 2-3 sentence summary plus three key bullet points. Keep the summary and the bullet points separate so I can lay them out nicely.

---

## 💅 Functionality — build the digest

> Turn the summarized articles into a clean, good-looking HTML email: a header with today's date, a card per story with its title (linking to the original), the AI summary, and the key points. Save it as a file so I can preview it before anything gets sent.

---

## 📧 Functionality — send it with Resend

> Add email sending with Resend. Only send when I've set an environment variable SEND_EMAIL to "true", and send to the address in EMAIL_TO — so I can run the script safely without emailing anything while I'm testing. Create the Resend client only when it's actually time to send, so the script runs fine without a Resend key when I'm just generating the HTML.

---

## ⏰ Automation — run it every day

This part is configuration, not a code prompt — follow the README's "Turn on the automation"
section. But it's worth having the agent explain it:

> Explain how the GitHub Actions workflow in .github/workflows makes my script run every morning on GitHub's servers without my computer being on, how the repository secrets keep my keys safe, and why the schedule ships commented-out.

---

## 🎁 Bonus — make it yours

The news sources are the `RSS_FEEDS` list near the top of `digest.js`. Change them to feeds
*you* care about:

- Swap in feeds for football, finance, cooking, your industry — any site with an RSS feed.
- Change the number of stories, or the time of day the schedule runs (the `cron` line).
- Change the AI editor's instructions to match your taste ("prefer positive news", "focus on
  business impact").

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. What makes this "automation" and not just a script?**

> A script runs when I run it. This runs on a schedule, on GitHub's computers, without me
> doing anything and without my laptop being on. The GitHub Actions workflow is the timer
> and the instructions; GitHub carries them out every day.

**2. My keys are secret, but the automation needs them. How does that work without putting
them in my code?**

> They're stored as repository secrets in GitHub's settings, not in any file. The workflow
> pulls them in as environment variables only while it runs, so my code never contains the
> keys and they never get committed — the same principle as the `.env` file, moved to the
> cloud.
