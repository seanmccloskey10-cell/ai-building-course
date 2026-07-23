# Project 09 — The Prompts

The prompts that build Stock Explorer, in order. Getting your two keys and running it are in
**[README.md](README.md)** — read it as you go, because the keys live in server-side functions
and that's the part worth understanding.

> **Read the chart code when you get to it.** The whole point of this project is seeing that a
> chart is just numbers turned into positions. When the agent draws it, ask *"walk me through
> how a price becomes a point on the screen."*

---

## 🧱 Foundation — the layout

> Build a simple stock page: a header, a text box for a ticker symbol with a few preset buttons
> (AAPL, NVDA, TSLA), buttons to switch the time range, a big empty chart area, a stats panel,
> and a section with an "Analyze with AI" button and a small "not financial advice" note. Plain
> and clean for now — we'll style it later.

---

## ⚙️ Functionality — real prices, drawn as a chart (keys stay on the server)

> Now get real stock data and draw it. Important: my Alpha Vantage key must NOT sit in the
> browser — put it in a server-side Netlify function (the Project 01 pattern) that fetches the
> daily prices, and have the page call that function. Then draw the returned closing prices as a
> line chart. Do the chart by hand with SVG so I can see how it works — no chart library — and
> walk me through how a price becomes a point on the screen.

---

## ⚙️ Functionality — the stats

> Under the chart, show the numbers: the latest price, the percent change over the range (green
> up / red down), the high, the low, and the average daily volume. Recalculate them when I
> switch the time range.

---

## 🤖 Functionality — AI reads the chart back to me

> Wire up the "Analyze with AI" button. Send the prices to a SECOND server-side function that
> holds my Anthropic key (again, never in the browser) and asks Claude to describe the price
> action in plain English — the trend, how choppy it was, any standout move. It must be
> observational only: no predictions, no buy/sell advice, no price targets. Keep the "AI-generated,
> not financial advice" line visible.

---

## 💅 Polish — make it look good

> Give it a brand and a dark theme with a purple/blue tint. Big chart on top, stats and the AI
> analysis side by side below. Make the price line green when the range is up and red when it's
> down. Bigger, easy-to-read text.

---

## 🧪 Test — the edge cases

> Add friendly handling for when things go wrong: an unknown ticker, the Alpha Vantage rate
> limit, a missing key, or the AI call failing. Each should show a clear message, never a blank
> screen or a raw error. Then give me a checklist to confirm everything works.

---

## 🎁 Bonus — make it yours

- **Compare two stocks:** *Let me put two tickers on the same chart to compare them.*
- **More history:** *Add a "1 year" range button and adjust the data fetch to cover it.*
- **Light/dark toggle:** *Add a button to switch between the dark theme and a light one.*

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. There's no chart library here. So how does a line chart actually get drawn?**

> Each day's closing price is turned into an (x, y) point — x is how far along in time, y is how
> high the price is — and the points are connected with a line. A chart is just data mapped to
> positions on the screen; the SVG is doing arithmetic, not magic.

**2. This project has two API keys. Why don't they show up anywhere in the browser?**

> Because both live inside server-side functions. The page never calls Alpha Vantage or Anthropic
> directly — it calls my own functions, which add the key on the server and send back only the
> result. Anyone opening the page sees the prices and the analysis, never the keys — the same
> pattern that kept Project 01 safe.
