# Project 06 — Buy Me a Coffee

Build a page with a working payment button. Someone clicks it, pays you a few pounds
through Stripe, and lands on a thank-you page. Real money, real checkout — and, remarkably,
**no API key and no code that touches a card.**

Project 01 taught you to guard a secret key on a server. This project teaches the opposite
lesson about sensitive things: sometimes the safest way to handle something dangerous — like
someone's card number — is to **never touch it at all**, and let a company whose entire job
is payments handle it for you. That company is Stripe, and the tool is a **Payment Link**.

**Cost: free to build and test.** Stripe's test mode lets you run fake payments with fake
cards, no real money and no bank details. You only need real bank details the day you want
to accept real payments.

> ### 👉 Just want to build it?
> Make a new empty folder, open it in [Claude Code](https://claude.com/claude-code), and
> paste in the prompt from **[STUDENT-PROMPT.md](STUDENT-PROMPT.md)**. The agent fetches
> the files and coaches you through it. This README is the reference.

---

## What you'll build

Two pages and a stylesheet:

| File | What it is |
|------|-----------|
| `index.html` | The "Buy Me a Coffee" page with the payment button |
| `thank-you.html` | Where people land after they've paid |
| `styles.css` | The look |

There's no server of yours, no database, and no API key. The button is just a link to a
checkout page that Stripe hosts and secures.

---

## The concept: the safest way to handle a card is to never see it

Taking a payment sounds like it should be the scariest thing in this whole course — card
numbers, fraud, security law. It would be, if *you* handled the card. The trick is that you
don't.

A **Stripe Payment Link** is a URL that Stripe gives you. When someone clicks your button,
their browser goes to a checkout page **on Stripe's servers**, not yours. They type their
card in there, Stripe processes it, Stripe takes on all the risk and the legal
responsibility, and the money lands in your Stripe account. Your website never sees the card
number, never stores it, and needs no secret key to make it work.

> **Three projects, three ways to handle "sensitive":**
> - **Project 01** — a secret you own (an API key): hide it on a server.
> - **Project 04** — data that's public (crypto prices): no secret, so the browser can just ask.
> - **Project 06** — a secret you should *never* hold (a card number): hand the whole job to
>   Stripe, and touch nothing.
>
> Knowing which of these a situation calls for is real engineering judgment.

The whole "integration" is: make a link in Stripe's dashboard, paste it into your button.
That's it.

---

## Before you start

**Node.js 20 or newer.** Check by opening a terminal and running:

```bash
node --version
```

If that prints `v20.x` or higher, you're fine. If it prints something lower, or
"command not found", install the LTS version from [nodejs.org](https://nodejs.org).

> **After installing Node, you must restart where you're typing — and "restart" means
> more than opening a new tab.** A brand-new terminal window picks up the new install,
> but **VS Code does not**: opening a fresh terminal tab inside it still inherits the
> old settings from when VS Code launched. You have to quit VS Code completely and
> reopen it. Same for Claude Code — restart it. If `node --version` still fails after
> that, restart the computer; it always works and costs less time than debugging it.

You do **not** need Python, Git, or the Netlify CLI installed. The setup handles those.

You'll make a **free Stripe account** for the payment link — no card, no cost, and you'll
work entirely in test mode. More below.

---

## Setup

Do these in a terminal, from inside this project folder.

> **Opening a terminal in this folder**
>
> **Windows** — open the folder in File Explorer, type `cmd` in the address bar and hit
> Enter. (Or in VS Code: `Ctrl` + `` ` ``.)
>
> **Mac** — press `Cmd` + `Space`, type `Terminal`, hit Enter. Then type `cd ` — with a
> space after it — and **drag your project folder from Finder onto the Terminal
> window**. It fills in the path for you. Hit Enter.
> (Or in VS Code: `Ctrl` + `` ` `` — that's **Control**, not Command, on Mac too.
> `Cmd` + `` ` `` is a system shortcut and won't open a terminal.)

**1. Install the dependencies**

```bash
npm install
```

This reads `package.json` and downloads the local Netlify tool. Nothing is installed
system-wide. It prints a wall of text and ends with some "vulnerability" warnings — ignore
them, and **do not run `npm audit fix --force`**.

**2. Run it**

```bash
npx netlify dev
```

Serves the page at **http://localhost:8888**.

> **Netlify will print a few notices that look like warnings but aren't** — "No app server
> detected. Using simple static server", "Unable to determine public folder", maybe an
> "AI Gateway … Forbidden" line. All harmless: this is a plain static site.

> **On the very first run, wait a moment.** If the page is blank, give it up to 30 seconds
> and refresh. Only happens once.

Right now the button doesn't go anywhere — that's the next section.

---

## Wire up the payment button

**1. Make a free Stripe account.** Go to
**[dashboard.stripe.com/register](https://dashboard.stripe.com/register)** and sign up. You
land in **test mode** automatically — a sandbox with fake money. You do not need to give
bank details to use test mode.

**2. Create a Payment Link.**
- Go to **[dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links)**.
- Click **+ New**.
- Click **+ Add a new product**, give it a name ("Coffee") and a price (say £3), and add it.
- Click **Create link**. Stripe gives you a URL like `https://buy.stripe.com/test_…`.

**3. Paste it into your button.** Open `index.html`, find this line:

```html
<a href="PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE" class="coffee-button">☕ Buy Me a Coffee</a>
```

Replace `PASTE_YOUR_STRIPE_PAYMENT_LINK_HERE` with your link. Refresh the page and click the
button — it takes you to Stripe's checkout.

**4. Pay with a test card.** In test mode, use card number **`4242 4242 4242 4242`**, any
future expiry date, and any 3-digit CVC. The payment "succeeds" with no real money moved.

**5. (Level up) Send them to your thank-you page.** In your Payment Link's settings there's
an **"After payment"** option where you can redirect the customer to your own URL instead of
Stripe's default confirmation. Point it at your `thank-you.html` — that completes the loop:
button → Stripe checkout → your thank-you page. (This is easiest once your site is deployed,
Project 03, so Stripe has a real address to send people back to.)

> **Test mode vs live mode.** Everything above is test mode — free, safe, fake. To take
> *real* money you'd switch the dashboard to live mode (the account switcher at the top) and
> make a live Payment Link, which needs your real bank details. Don't do that to learn;
> test mode is the whole lesson.

---

## The prompts

See **[PROMPTS.md](PROMPTS.md)** for the prompts that build and restyle the page.

---

## When it breaks

| What you see | What's actually wrong |
|---|---|
| The button does nothing / goes to a broken page | You haven't pasted your real Payment Link into `index.html` yet, or you pasted it with the quotes doubled up. It should read `href="https://buy.stripe.com/…"` |
| Stripe asks for real card details / won't take 4242 | You're in **live** mode, not test mode. Switch the dashboard back to test mode (top-of-page account switcher) and make a test Payment Link |
| `command not found: npm` | Node.js isn't installed, or you need to fully quit and reopen VS Code / your terminal (see the Node note above) |
| `npm.ps1 cannot be loaded because running scripts is disabled` | Windows PowerShell blocks scripts by default. Use `cmd` instead, or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` and answer `Y` |
| Blank page on the very first run | The server said "ready" slightly early. Wait 30 seconds and refresh |
| Port 8888 already in use | Close the other terminal, or run `npx netlify dev --port 8899` |

Still stuck? Paste the exact error to the AI agent that set this up and tell it what you
expected instead.

---

**Next up:** Project 07, a private diary backed by a real hosted database — where "keeping
one person's data private from another" becomes the whole lesson.
