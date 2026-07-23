# Project 05 — The Prompts

The prompts that build the tracker, in order. Setup is in **[README.md](README.md)** — do
that first, and read the concept section: the whole point of this one is *localStorage*, and
why it's a notebook, not a filing cabinet.

> **Read what the AI writes before you accept it.** If a step produces something you don't
> recognise, ask: *"explain what you just wrote, like I've never coded before."*

---

## 🧱 Foundation — the page

> Build a daily habit tracker — a single page. Start with a list of habits I can pick from (like drink water, exercise, read, meditate), each one selectable. Below that, leave room for the tracking view. Give it a clean, friendly, modern look.

---

## ⚙️ Functionality — track the days

> When I select some habits, show a tracker for each one: a row of the last seven days that I can tap to mark a day done, a "3/7 days this week" progress bar, and a streak counter that shows how many days in a row I've kept it up.

---

## 💾 Functionality — remember everything (the whole point)

> Now make it remember. Use the browser's localStorage so that when I refresh the page or come back tomorrow, my selected habits and everything I've ticked off are still there. Save whenever I change something, and load it back when the page opens.

*After this step, refresh the page. If your ticks survive, you've just used localStorage
for real.*

---

## 🛟 Functionality — don't lose my data

> Make sure that if I un-select a habit and later select it again, its history isn't wiped — I should get my old streak back, not a blank slate. Only the explicit "Reset" button should ever erase my progress, and it should ask me to confirm first.

*This matters more than it looks. "Never silently destroy the user's data" is one of the
most important rules in all of software, and it's easy to get wrong.*

---

## 💅 Polish

> Add a celebration when I hit a milestone — a little burst of emojis and a congratulations pop-up. Colour the completed days, animate the progress bars, and make it all work nicely on a phone.

---

## 🎁 Bonus — make it yours

The list of habits is the `HABITS` array at the top of `app.js`. Change it to track what
*you* actually want:

- Swap in your own habits — "Practice guitar", "No phone after 9pm", whatever.
- Change the emojis.

Other things worth trying:

> Let me add my own custom habit by typing it in, instead of only picking from the list.

> Show my longest-ever streak for each habit, not just the current one.

> Add a monthly view as well as the weekly one.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. My habits survived a refresh with no database and no server. How?**

> The browser has a built-in store called localStorage. My code saves everything into it
> as text under one key, and reads it back when the page loads. It lives in my browser on
> my computer, so it survives refreshes and closing the tab — no server needed.

**2. Why isn't localStorage just "a database"?**

> A database lives on a server and is the same wherever I log in — phone, laptop, anywhere.
> localStorage lives only in this one browser on this one computer. Open the app on my
> phone and it's blank. It's a private notebook, not a shared filing cabinet — great for a
> personal single-device app, no good when I need my data to follow me around.
