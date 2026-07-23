# Project 08 — The Prompts

The prompts that build the app, in order. Setup — and the install steps, which are the
point — are in **[README.md](README.md)**. Read the "Install it" section yourself.

> **Read what the AI writes before you accept it.** If a step produces something you don't
> recognise, ask: *"explain what you just wrote, like I've never coded before."*

---

## 🧱 Foundation — the notes app

> Build a simple notes app — a single screen. A text box and a Save button at the bottom, and above it a list of the notes I've saved, newest first, each with a Delete button. Save my notes in the browser's localStorage so they survive a refresh. Give it a clean, calm, phone-friendly look.

---

## 🔒 Functionality — show notes safely

> When you display my notes, make sure the note text is shown exactly as I typed it and is never treated as code — if I type something that looks like HTML, it should appear as plain text, not do anything. Use textContent, not innerHTML, for the note text.

*This is a real security habit. Anything a user typed must be shown as text, never run as
markup — otherwise a note could contain code that runs on the page. The AI should build it
this way from the start; this prompt makes sure.*

---

## 📱 Functionality — make it installable (the PWA part)

> Now turn this into a Progressive Web App so I can install it on my phone. Add a web app manifest with a name, theme colour and app icons, link it in the HTML, and add a service worker that caches the app's files so it opens even with no internet. Register the service worker when the page loads.

*After this, follow the README's "Install it" section — you'll get an install button in
Chrome, and an "Add to Home Screen" option on your phone once it's deployed.*

---

## 💅 Polish

> Make it feel like a real app: a nice colour theme, comfortable spacing, a satisfying save interaction, and a friendly empty-state message when I have no notes yet. Make sure it looks great at phone width.

---

## 🎁 Bonus — make it yours

- Change the app's name and colours in `manifest.webmanifest` and the icons in `icons/` —
  this is what shows on your home screen.
- Change the placeholder text and the empty-state message in the code.

Other things worth trying:

> Let me edit a note I've already saved, not just delete it.

> Add a search box that filters my notes as I type.

> Add a "copy to clipboard" button on each note.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. What actually makes this a "app I can install" and not just a website?**

> Three extra pieces: a manifest (a text file with the app's name, colours and icons), a
> service worker (background code that caches the files so it works offline), and the icons
> themselves. Add those to a normal website and a phone or computer will offer to install
> it to the home screen. It's the same web code, plus those three declarations.

**2. My installed app still opened with the wifi off. How?**

> The service worker saved a copy of the app's files the first time it ran ("caching"), and
> serves that copy when there's no internet. So the app opens from the cache instead of
> needing to download anything.
