# Project 07 — The Prompts

The prompts that build the diary, in order. Creating your Supabase project, pasting your
keys, and running `supabase-setup.sql` are all in **[README.md](README.md)** — read it as
you go, because the database steps happen in the Supabase dashboard, not in your editor.

> **This project has a "wait, how?" moment on purpose.** When you get to storage, ask the
> agent *"how do we make sure one user can't read another's entries?"* **before** you ask it
> to write the code. Understanding the guard is the whole lesson — the code is short.

---

## 🧱 Foundation — the layout

> Build a private diary app. One page: a header, an account box with an email field, a
> password field, and Sign Up / Log In / Log Out buttons, then a section with a title field,
> a bigger text box for the entry, a Save button, and a list of my saved entries below.
> Keep it simple and clean for now — we'll make it pretty later. Load the Supabase library
> from its CDN so we're ready to connect it next.

---

## ⚙️ Functionality — real accounts (explain first)

> Before you write anything: how do these Sign Up and Log In buttons connect to *real* user
> accounts? Walk me through it in plain English — what does Supabase actually do for us, and
> what did I set up when I made the project and pasted in my URL and key?

Then, once it makes sense:

> Good — now make Sign Up, Log In, and Log Out actually work using Supabase. Show me a green
> message on success and a red one on errors, and keep track of whether I'm logged in.

---

## ⚙️ Functionality — the store and the guard (the important part)

> Logging in works. Now I need somewhere to store the entries — but the critical part is that
> **each person must only ever see their own.** Don't write app code yet. First explain: how
> do we store entries in Supabase, and how do we guarantee one user can never read another's?
> Give me the exact SQL to run, and explain what each part does.

The agent should point you at `supabase-setup.sql` (or hand you the same SQL) and explain the
two moves: create the `entries` table, then turn on **Row Level Security** with a policy that
limits every user to their own rows. Run it in your Supabase SQL Editor, then:

> Done — I ran the SQL and the table and guard are in place.

---

## ⚙️ Functionality — connect the diary

> Now connect the diary to the app: when I'm logged in, saving an entry stores it in
> Supabase, my entries show up in the list newest-first, and they're still there when I log
> back in later. Important: **don't** filter by my user id in the JavaScript — let the
> database guard do that. I want to see that the code just asks for "all entries" and still
> only gets mine.

---

## 💅 Polish — make it feel premium

> Make it feel like a calm, premium journaling app: soft pastels, an elegant serif for
> headings, and a lock icon that animates — floating gently when I'm logged out, and a little
> unlock wiggle when I log in. Hide the email/password fields once I'm logged in, hide the
> whole diary section when I'm logged out, and show small pop-up notifications when I log in,
> log out, or save an entry. Don't pop a notification just because I refreshed the page.

---

## 🧪 Test — prove the privacy works

Follow the README's **"Prove the privacy actually works"** section — two accounts, and watch
User B fail to see User A's entries. If you want the agent to walk you through it live:

> Give me a step-by-step test with two accounts that proves one user can't see the other's
> entries, and point out where in my code the filtering happens — I think the answer is
> "nowhere," and that's the point.

---

## 🎁 Bonus — make it yours

- **Delete an entry:** *Add a small delete button to each entry that removes it from
  Supabase and the list.*
- **Edit an entry:** *Let me click an entry to edit its title and content and save the
  change.*
- **Share with a coach (conceptual):** *If I wanted a coach to see their clients' entries
  but nobody else's, what's the smallest change? Explain how the guard's rule would change —
  don't build it yet.* (Hint: the guard goes from "is this row mine?" to "is this row mine
  OR am I this person's coach?" — same login, same table, smarter rule.)

---

## 🧠 Concept check

If you can answer these in your own words, you've got the lesson.

**1. My anon key is sitting in a public file. Why is my diary still private?**

> Because the key isn't what protects the data — the guard is. Row Level Security lives on
> Supabase's servers and only ever returns rows that belong to whoever's asking. The key gets
> my app to the door; the guard decides what I'm allowed to see. Someone reading my key (or
> all my JavaScript) still can't get past the guard, because it isn't in my code to bypass.

**2. `app.js` runs `select * from entries` with no "where user_id" filter. How do I only get
my own entries?**

> The database adds that filter itself, every time, because of the RLS policy. The code looks
> like it asks for everything; Supabase quietly narrows it to my rows before it answers.
