# Project 01 — The Prompts

The prompts that build this app, in order. Copy one, paste it into your AI agent, see
what comes back, then move to the next.

Setup (Node, your API key, `.env`) lives in **[README.md](README.md)** — do that first.

> **Read what the AI writes before you accept it.** The point of this course is not to
> collect working code, it's to be able to look at code and know roughly what it does.
> If a step produces something you don't recognise, ask: *"explain what you just wrote,
> line by line, like I've never coded before."* That question is free and it is the
> whole game.

---

## 🧱 Foundation — the page

> Create a simple webpage for an AI roast generator. Title, basic layout, and an upload button (it doesn't need to work yet). Keep it minimal for now.

---

## ⚙️ Functionality — connect the AI

> We need to connect an AI so our tool can roast the image. How do we do this?

*Expect the agent to bring up API keys here. Let it explain before you move on.*

---

## 🔐 Functionality — hiding the key once the site is live

> Okay, so a .env file keeps my key off GitHub. But if I put the site on the internet, can visitors see my key in the browser code?

*This is the most important question in the project. The answer is yes — which is why
the next step exists.*

---

## 🔧 Setup — the secret room

> Set up a Netlify serverless function so the API key stays on the server and never reaches the browser. Explain the split between front end and back end as you go.

---

## ⚙️ Functionality — make it work

> Make the upload button actually work: when I pick a file, show me a preview. Then connect the API so a button roasts the picture, in the voice of an over-the-top stand-up roast comedian. Keep the roast to exactly one sentence.

---

## 💅 Polish

> Give the site a modern, fun brand aimed at 16-22 year olds. Add a header with a gradient, a footer with dummy TikTok and Instagram links, large easy-to-click buttons, and emojis where they fit.

---

## 🧪 Test

> Double-check the security of this site. Is my API key actually safe? Show me exactly where it would be exposed if I'd done it the naive way.

---

## 🎁 Bonus — make it yours

The comedian's personality is one instruction in `netlify/functions/roast.js`. Change it
and the whole app changes character. Try:

> Change the roast personality to Gordon Ramsay.

Other things that work well:

- *"Make it a British butler giving backhanded compliments."*
- *"Make it a Gen-Z roast, full brain-rot vocabulary."*
- *"Make it a Shakespearean insult, in iambic pentameter."*
- *"Make it a nature documentary narrator describing what he sees."*

And a genuinely useful feature to add:

> Add a button that copies the roast to my clipboard so I can share it.

---

## 🧠 Concept check

Don't skip these. If you can say both out loud in your own words, you've got the lesson.
If you can't, paste the question at your agent and ask it to check your answer.

**1. Why does the key go in `.env`?**

> The API key connects my app to Claude — without it, no roasts. If I commit it to
> GitHub, strangers can use it and I pay for their usage. So it lives in `.env`, and
> `.env` is listed in `.gitignore`, which tells Git "never save this file." Committing to
> GitHub is like saving your progress in a game; `.gitignore` is the list of things not
> to save.

**2. Why isn't `.gitignore` enough on its own?**

> A website has two halves. The front end (`index.html`, `app.js`) gets sent to every
> visitor's browser, and anyone can read it — right-click, view source, it's all there.
> The back end runs on a server that visitors never see inside. `.gitignore` only keeps
> the key off GitHub; putting the key in a **serverless function** is what keeps it away
> from the people using my live site. I need both.

Ask your agent: *"Is my understanding correct?"* — and make it tell you if you've got it
slightly wrong.
