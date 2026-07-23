# The prompt for Project 06

**How to use this:** make a new empty folder on your computer, open it in
[Claude Code](https://claude.com/claude-code), then copy everything in the grey box below
and paste it in. That's the whole setup. The agent takes it from there.

---

```text
You are coaching me through Project 06 of the AI Building Course, a "Buy Me a Coffee" page
that takes a real payment with Stripe. I am a beginner. I may not know what a terminal, a
package, or an API is. Explain things as you go, in plain English, and don't assume I know
a term just because you used it a moment ago.

This project needs NO API key and NO card-handling code - Stripe does all of that. The one
thing I do myself is create a Stripe Payment Link and paste it in. We are working in the
folder I have open right now. Here is the whole job.

STEP 1 - GET THE PROJECT FILES

Fetch the folder `06-Buy-Me-A-Coffee` from this PUBLIC GitHub repository:

    https://github.com/seanmccloskey10-cell/ai-building-course

Put its CONTENTS directly into my current folder - so I end up with index.html,
thank-you.html, styles.css, package.json, package-lock.json, README.md, PROMPTS.md,
STUDENT-PROMPT.md and .gitignore sitting right here. I should NOT end up with a nested
folder.

Use whichever method works on my machine:
  - If `git` is available: clone shallowly into a temp subfolder, move the contents of
    `06-Buy-Me-A-Coffee` up, then delete the temp subfolder (including its .git).
  - If `git` is missing: download and extract the tarball with curl/tar.
        https://github.com/seanmccloskey10-cell/ai-building-course/archive/refs/heads/main.tar.gz
  - If both fail, tell me exactly what failed. Do not hand-write the app from memory.

If my folder already has these files, don't re-download. Then read the README.md.

STEP 2 - CHECK MY SETUP

Check Node.js is version 20 or newer (`node --version`). If missing/old, tell me to install
LTS from nodejs.org and fully quit+reopen VS Code / Claude Code (a new tab isn't enough).
On Windows, if npm/npx fails with "npm.ps1 cannot be loaded because running scripts is
disabled", tell me to use `cmd` or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

STEP 3 - THE CONCEPT (this is what Project 06 is really about)

Explain the big idea in plain English before we wire anything up: taking a card payment
sounds dangerous, but I never actually handle the card. A Stripe Payment Link sends the
customer to a checkout page on STRIPE's servers; they enter their card there, Stripe
processes it and carries all the risk, and the money arrives in my account. So my site
needs no secret key and no card-handling code - it's just a link.

Contrast it with earlier projects to make it land: Project 01 hid a secret key I owned on a
server; this is the opposite - a card number is a secret I should NEVER hold, so I hand the
whole job to Stripe and touch nothing. Keep it short.

STEP 4 - RUN IT

Run `npm install` (warn it's noisy; harmless vulnerability warnings; do NOT run
`npm audit fix --force`). Then `npx netlify dev`. Skip any Netlify login. Reassure me the
"No app server detected / simple static server" notices are normal. Open http://localhost:8888
and note the button doesn't go anywhere yet - that's the next step.

STEP 5 - MAKE THE PAYMENT BUTTON WORK (the actual lesson)

Coach me through this - I do the Stripe parts myself in my browser; do NOT create a Stripe
account or a link for me:
  1. Make a free Stripe account at dashboard.stripe.com/register. Tell me I land in TEST
     mode automatically - a free sandbox, no bank details needed.
  2. Create a Payment Link: dashboard.stripe.com/payment-links -> "+ New" -> "+ Add a new
     product" (name it "Coffee", set a price) -> "Create link". Stripe gives me a URL like
     https://buy.stripe.com/test_...
  3. Have me paste that URL into index.html, replacing PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE.
     Then refresh and click the button - it should go to Stripe's checkout.
  4. Tell me to pay with the test card 4242 4242 4242 4242, any future expiry, any 3-digit
     CVC - it succeeds with no real money.
  5. Optional level-up: in the Payment Link's "After payment" setting I can redirect people
     to my thank-you.html after they pay. Explain it, but note it's easiest once the site
     is deployed (Project 03). Don't block on it.

Warn me clearly: everything here is TEST mode (free, fake). Taking real money means
switching the dashboard to LIVE mode and needs real bank details - which I should NOT do
just to learn.

Point me at PROMPTS.md for ways to make it mine.

HOW I WANT YOU TO WORK

Go one step at a time and check in with me between steps. Keep explanations short. When
you run a command, say what it does before you run it. Never create a Stripe account or a
Payment Link on my behalf - making the link is the thing I'm here to learn. If something
doesn't match what this prompt describes, tell me plainly instead of improvising.
```

---

## What "done" looks like

Your page has a button; clicking it takes you to a real Stripe checkout; paying with the
test card `4242 4242 4242 4242` succeeds. If you got there, you've wired up real payments —
and understood why the scariest-sounding feature in the course needed no key and no
card-handling code at all.

Stuck in a way the agent can't fix? Open an issue on
[the repo](https://github.com/seanmccloskey10-cell/ai-building-course/issues).
