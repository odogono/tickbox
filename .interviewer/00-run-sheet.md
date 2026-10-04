# Run sheet: agent-PR review interview (45 minutes)

Read this once before each interview. Everything the candidate sees is in the
PR on the `agent/NS-142-task-chart-snooze` branch. Everything in this
directory exists only on `main` and never appears in the PR diff.

## Before the call

- [ ] PR is open on GitHub, description pasted from `02-pr-description.md`.
- [ ] Issue #3 open in one browser tab (the ticket).
- [ ] PR "Files changed" tab open in a browser window you can share. Use a
      wide window; the candidate reads from your screen.
- [ ] A blank scratch doc is open and ready to share (for the dictated brief).
- [ ] `04-rubric.md` copied to a fresh file named after the candidate.
- [ ] `.interviewer/stretch/` open in an editor tab in case you need the extras.
- [ ] `.interviewer/images/` open in a viewer: before, sketch, after.
- [ ] Timer visible to you only.

## 0–5 Orientation (say roughly this)

> "This session is a code review, not a coding test. Nothing gets run and you
> won't type anything; everything is spoken. The product is fictional: it's
> called Tickbox, a shared to-do app. People keep tasks on lists and share
> lists with each other. I'm going to act as the product owner, so ask me
> anything about what the feature should do and I'll answer in that role.
>
> You'll see a ticket, then a pull request that an AI coding agent produced
> for it. Your job is what it would be on the team: decide whether this should
> merge, and if not, what needs to change. Not every oddity you see is a
> problem, so tell me what you'd actually push back on and what you'd let go.
>
> Afterwards I'll ask you to dictate the message you'd send back to the
> agent, and I'll type it word for word so we can both look at it. Then a few
> short scenarios, then time for your questions."

Confirm they can see your screen and read the diff text comfortably. Zoom
the browser to 125% or more.

## 5–25 Review

Reveal in this order. The pauses are where the "asks before judging" signal lives.

1. **Minute 5: ticket alone.** Show the ticket as GitHub issue #3
   (https://github.com/odogono/tickbox/issues/3). Alongside it show
   `images/01-before-list-page.png` ("this is the list page today") and
   `images/02-ticket-sketch.png` ("and this is the sketch the product owner
   attached"). Say: "Here's the ticket as it came in." Then wait. Count silently to ten before saying anything. If they want to
   go straight to code, let them, and note it.
   Product-owner answers to likely questions are at the bottom of this sheet.
2. **Minute 8 at the latest: PR description.** Show the PR page, scrolled so
   only the description is visible, with `images/03-after-list-page.png`
   embedded in it as the agent's screenshot. "Here's what the agent said it
   did." Wait again. Do they question any claim? Do they notice the
   screenshot shows a column nobody asked for?
3. **Then: open Files changed.** "You're driving, I'm scrolling. Tell me
   which file to open and when to move on, and talk me through what you
   see." Go where they say, at their pace. Don't linger on a file they
   haven't asked for, and don't scroll past something they're still reading.
   If they ask "what else is in there?", read out the file list; that's
   information they'd have anyway.

Nudges in `06-nudges.md`. Log every nudge used.

Around minute 23: "If you had to tell the author the one thing that must
change before merge, what is it? And what would you let slide?"

## 25–30 Dictate the follow-up brief

> "You've decided this isn't mergeable yet. Dictate the message you'd send to
> the agent to get it fixed. I'll type exactly what you say."

Type verbatim into the shared scratch doc, typos and all. When they stop:

> "Read that back. Would the agent get it right from what's written?"

Allow one revision pass. Keep the final text; paste it into the rubric.

## 30–35 Scenarios

Three cards from `05-scenarios.md`, in order, about 90 seconds each. Don't
debate; ask "anything else?" once and move on.

## 35–45 Discussion, or stretch extras

Your one question:

> "Tell me about the last time an agent produced something you didn't trust.
> What did you do?"

Then their questions. Finish on time.

**Stretch extras** (`08-stretch-extras.md`, snippets in `stretch/`) are
optional. Use them when the review finished early, when the candidate was
strong and you want a tie-breaker, or when the review went badly and you want
a second, more conventional signal before deciding. Screenshare one snippet
at a time, two to three minutes each. They do not feed the weighted score;
record them in the rubric's stretch line.

## After the call

Score the rubric within 15 minutes while it's fresh. Write the free-text
recommendation before you total the numbers.

---

## Product-owner answers (stay in role)

| If they ask | Answer |
|---|---|
| Who can snooze a task? | "Anyone who's on the list. We don't have roles beyond membership yet." |
| What is 'activity'? | "Anything that happened to the task: an edit, a comment, ticking it off, reopening it. Each one has a timestamp." |
| What if a task has had no activity in 7 days? | "Show something that makes it obvious, not a blank space." |
| 7 days from when? | "From now, whenever the person is looking. If they leave the page open all weekend it should still be the last 7 days." |
| Time zone? | "Everyone's UK for now. Don't over-think it." |
| What does snooze do, exactly? | "It stops the task nagging me. It shows as Snoozed instead of Overdue." |
| What does 'come back' mean exactly? | "After an hour it shows as Overdue again, without anyone doing anything, if it's still overdue." |
| Can you snooze a task that isn't overdue? | "No. Snooze is for the ones that are nagging." |
| Two people snooze at once? | "Last one wins is fine." |
| Should snoozing be logged as activity? | "Good question. Not in this ticket, but note it." |
| What does the chart need to show? | "Just the shape: busy days versus quiet days. Small, next to the title. No axes needed." |
| Should I see who snoozed it? | "Not in this ticket." |
| Anything about tests? | "I'd expect you to tell me what should be tested." |
| Anything not covered above | Answer plausibly and briefly, and note that they asked. |

---

The Notion version of this script, with the answer key and rubric template,
lives at https://app.notion.com/p/3efa1290c5cc8169acacf4d4202435e1 under
Company Wiki / Onboarding & IT / Hiring. Keep the two in sync.
