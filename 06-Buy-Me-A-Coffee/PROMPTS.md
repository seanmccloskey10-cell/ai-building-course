# Project 06 — The Prompts

The prompts that build the page, in order. The important part of this project — creating the
Stripe Payment Link — is in **[README.md](README.md)** under "Wire up the payment button."
Read that; it's the actual lesson.

> **Read what the AI writes before you accept it.** If a step produces something you don't
> recognise, ask: *"explain what you just wrote, like I've never coded before."*

---

## 🧱 Foundation — the page

> Build a simple "Buy Me a Coffee" page — a single screen. A big coffee emoji, a heading, a short "support my work" message, and one prominent "Buy Me a Coffee" button. Make it warm and friendly. Also make a matching "thank you" page for people to land on after they've paid.

---

## ⚙️ Functionality — the payment button

> The button should take people to a Stripe checkout so they can pay me. I'm going to create a Stripe Payment Link in my dashboard — set the button up so I can paste that link straight in. Explain to me why this needs no API key and no code that handles the card.

*Then follow the README to actually make the link and paste it in. The concept — Stripe
holds the card, you hold nothing — is the thing to understand here.*

---

## 💅 Polish

> Make it look really inviting: nice colours, a hover effect on the button, and make it work well on a phone. Make the thank-you page feel like a genuine little moment of celebration.

---

## 🎁 Bonus — make it yours

- Change the amount and the product name when you create your Payment Link.
- Let people **choose** how much to give — Stripe Payment Links can offer "customer chooses
  price," which turns your coffee button into a proper tip jar. Set that up in the dashboard.
- Rewrite the copy to be about *your* work.

Other things worth trying:

> Add a few "coffee tiers" — a £3 button, a £5 button, a £10 button — each linking to a different Payment Link.

> Add a short list of "supporters" or a thank-you wall below the button.

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. Taking card payments sounds dangerous. Why didn't I need a secret key or any
card-handling code?**

> Because I never handle the card. A Stripe Payment Link sends the customer to a checkout
> page on Stripe's own servers; they type their card there, Stripe processes it and carries
> all the risk, and the money arrives in my account. My site is just a link to that page, so
> there's no secret to protect and nothing sensitive in my code.

**2. Project 01 hid a secret key on a server. Why is this the opposite?**

> In Project 01 the secret was *mine* to hold, so I hid it server-side. A card number is a
> secret I should never hold at all — so instead of protecting it, I hand the entire job to
> Stripe and touch nothing. The safest thing to do with some sensitive data is to not have
> it.
