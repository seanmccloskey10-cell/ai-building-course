# Project 04 — The Prompts

The prompts that build the dashboard, in order. Setup is in **[README.md](README.md)** —
do that first, and read the concept section there: this project is the deliberate mirror of
Project 01, and the *why* matters more than the code.

> **Read what the AI writes before you accept it.** If a step produces something you don't
> recognise, ask: *"explain what you just wrote, like I've never coded before."*

---

## 🧱 Foundation — the page

> Build a cryptocurrency price dashboard — a single page. I want a header, a "LIVE" status bar, and an empty area where price cards will go. Give it a modern dark theme. Just the layout for now; no data yet.

---

## ⚙️ Functionality — get the live data

> Now fetch real prices. Use the CoinGecko API, which is free and needs no API key. Get the current price, 24-hour change, market cap, volume and daily high for a handful of well-known coins, and draw a card for each one. Refresh the data automatically every 30 seconds.

*When this works, open your browser's DevTools console — you'll see the raw data arriving
from CoinGecko. That's "live data" made real.*

---

## 🛟 Functionality — handle it when the data doesn't come

> A free public API limits how often it'll answer — if I ask too fast it returns an error (HTTP 429). Right now if that happens my page just breaks. Add proper handling: if the request fails or gets rate-limited, show a friendly message explaining it's temporary and the dashboard will retry — don't wipe the prices that are already showing, and don't let the page throw an error.

*This is the grown-up half of the project. Real apps spend more code on "what if the answer
doesn't come" than on the happy path.*

---

## 💅 Polish

> Make the change percentages colour-coded — green with an up arrow when a coin is up, red with a down arrow when it's down. Make the cards lift a little when I hover. Make it look good on a phone too.

---

## 🎁 Bonus — make it yours

The list of coins is in the `API_URL` at the top of `script.js` — the `ids=` part. Change
it and you change the dashboard:

- Swap `dogecoin` for `litecoin`, or add `chainlink` to the list.
- Cut it down to just Bitcoin and Ethereum.

Other things worth trying:

> Add a "last updated" timestamp that shows when the prices were last refreshed.

> Let me change how often it refreshes — every 10 seconds, or every 2 minutes — but warn me that refreshing too fast will hit the rate limit sooner.

> Add a total at the top showing the combined market cap of all the coins shown.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. Project 01 hid its API key on a server. Why doesn't this project need to?**

> Because this API needs no key. There's no secret to protect, so there's nothing to hide,
> so the code can call the API straight from the browser. Project 01's key was a paid
> secret, so it *had* to live server-side where visitors couldn't read it. The deciding
> question is always: is there a secret? No secret → the browser can do it directly.

**2. My prices disappeared and a "wait a minute" message showed up. Is my app broken?**

> No. That's the free API's rate limit — it only answers so many requests per minute,
> shared across everyone on my network. My code caught the error and showed a message
> instead of crashing. Waiting a minute fixes it; the dashboard retries on its own.
