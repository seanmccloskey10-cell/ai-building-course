# Project 02 — The Prompts

The prompts that build the game, in order. Copy one, paste it into your AI agent, see what
comes back, then move to the next. Setup (Node, running it) is in
**[README.md](README.md)** — do that first.

> **Read what the AI writes before you accept it.** This project is the first one where
> you should start actually *reading* the code, not just running it. If a step produces
> something you don't recognise, ask: *"explain what you just wrote, line by line, like
> I've never coded before."* That question is free and it is the whole point.

---

## 🧱 Foundation — the board

> Create a webpage for a Wordle-style word game. I want a 6-row grid of 5 letter-tiles each, and an on-screen keyboard below it. Just the layout for now — it doesn't need to do anything yet. Keep it clean and centred.

---

## ⚙️ Functionality — typing

> Make the keyboard work. When I click a letter (or type on my physical keyboard), it should fill the next empty tile in the current row. Backspace deletes the last letter. Don't let me type more than 5 letters in a row.

---

## ⚙️ Functionality — the rules

> Now the game logic. Pick a random secret 5-letter word and keep it hidden. When I press Enter on a full row, colour each tile: green if the letter is correct and in the right place, yellow if the letter is in the word but the wrong place, grey if it's not in the word at all. Then move me to the next row. If I guess the word, I win; if I use all 6 rows, show me the answer.

*This is the heart of the project. The colouring rule is harder than it sounds because of
repeated letters — ask the agent to walk you through how it handles them.*

---

## ⚙️ Functionality — guardrails

> Add the small rules that make it feel real: don't let me submit a row with fewer than 5 letters, reject a "word" that isn't in the word list, and don't let me guess the same word twice. Show a brief message when I break one of these rules, and shake the row.

---

## 💅 Polish

> Make it feel alive. Flip each tile as its colour is revealed. Colour the on-screen keyboard keys to match my guesses so I can track which letters I've ruled out. Add a little bounce when I win and a pop-up telling me the result.

---

## 🎁 Bonus — make it yours

The list of allowed words lives at the very top of `app.js`, in `VALID_WORDS`. It's both
the list of answers and the list of guesses the game will accept. Change it and you change
the game:

- Add your friends' names (make them 5 letters) and play a private version.
- Cut the list down to ten words and watch how much easier it gets.

Other things worth trying:

> Add a counter that shows how many guesses I have left.

> Keep score across games in the browser so it remembers how many I've won. (This is a
> sneak preview of Project 05.)

> Add a "hard mode" where any green or yellow letter must be reused in later guesses.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson. If not, paste the
question at your agent and ask it to check you.

**1. Where does the game keep track of what's going on?**

> In a few variables at the top of `app.js` — the secret word, which row and tile I'm on,
> whether the game is over, and the list of guesses so far. That's the game's "state".
> Every click or keypress changes one of those, and the screen is redrawn to match.

**2. Why is the tile-colouring code more complicated than "is this letter in the word?"**

> Because of repeated letters. If the answer has one `E` and I guess a word with two, only
> one of my `E`s should light up — the code has to mark letters as "used" as it goes, so it
> doesn't count the same `E` twice. That's why it colours in two passes: greens first, then
> yellows from what's left over.
