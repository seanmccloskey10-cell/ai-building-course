# Project 03 — The Prompts

The prompts that build the portfolio, in order. Setup and — importantly — the deploy
walkthrough are in **[README.md](README.md)**. Read the deploy section yourself; it's the
whole point of this project.

> **Read what the AI writes before you accept it.** If a step produces something you don't
> recognise, ask: *"explain what you just wrote, like I've never coded before."*

---

## 🧱 Foundation — the page

> Build a personal portfolio website — a single page. I want a header with my name and a tagline, an "About Me" section, a "My Projects" section with a couple of project cards, a "Skills" section, and a simple contact form. Just clean HTML and CSS, no framework. Make it look modern and friendly.

---

## 💅 Polish — make it look good

> Give it a proper visual style: a nice colour scheme, good spacing, readable fonts, and cards for the projects that lift slightly when I hover over them. Make it look great on a phone as well as a laptop.

---

## ⚙️ Functionality — the contact form

> Make the contact form do something when I submit it. It doesn't need a real backend — just stop the page reloading, grab the name and email, and show a friendly thank-you message. Then clear the form.

---

## 🚀 The real lesson — deploy it

This isn't a copy-paste prompt, it's the thing you actually do. Follow the **Deploy it**
section of the [README](README.md): drag your folder onto
[app.netlify.com/drop](https://app.netlify.com/drop) and get a live URL in about a minute.

Then ask your agent to help you understand what just happened:

> Explain what just happened when I dragged my folder to Netlify. Where do my files live now, and why can anyone open the link when they couldn't open my localhost address?

---

## ✍️ Make it yours

> Help me replace the placeholder content with my real details: my name in the header, a real "about me", my actual projects (including the roast generator and Wordle clone I built earlier), and real links to my GitHub and LinkedIn. Then help me redeploy.

Other things worth trying:

> Add a "Projects" card for each thing I build in the rest of this course, and link each one to its live URL.

> Add a dark-mode toggle.

> Add a smooth scroll so clicking a nav link glides down to that section.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. Why can't someone open my `localhost:8888` link, but they can open my `.netlify.app`
link?**

> `localhost` means "this computer" — the address only exists on my machine, so nobody
> else can reach it. Deploying copies my files onto a server that's always online and
> gives them a public address, so now anyone with the link can open the site.

**2. Netlify never asked to see my code while it was on my laptop. So what did I actually
give it?**

> A copy of my finished files — the HTML, CSS and JS. Netlify puts that copy on its own
> servers and serves it to anyone who visits the URL. My laptop can be switched off and
> the site stays up, because it's not running from my machine anymore.
