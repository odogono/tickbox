# Handoff: publishing the fixture

One-time setup. Repo must be **private**.

```sh
cd ~/work/omega/interview-fixture
gh repo create <org-or-user>/tickbox --private --source=. --remote=origin --push
git push -u origin agent/NS-142-task-chart-snooze
gh pr create --base main --head agent/NS-142-task-chart-snooze \
  --title "NS-142: Task activity sparkline and snooze" \
  --body-file .interviewer/02-pr-description.md
```

Then:

0. Edit the PR description on GitHub and drag `images/03-after-list-page.png`
   in under "What changed", as the agent's screenshot. Optionally add
   `04-after-snoozed.png` too. The images live only on `main`, so dragging
   them in is the only way they reach the PR.
1. Open the PR in an incognito window to confirm the description renders and
   `.interviewer/` is nowhere in "Files changed". It isn't in the three-dot
   diff, but check once.
2. Candidates do not get repo access; you screenshare the PR and scroll
   where they direct. Zoom the browser so the diff is legible over a video
   call, and use GitHub's unified (not split) diff view, which fits a shared
   window better.
3. Do one timed dry run of `00-run-sheet.md` alone before the first
   interview.

## Proving the planted items to yourself

```sh
git checkout agent/NS-142-task-chart-snooze
bun run check                      # green: the testing claim is "true"
PORT=4199 bun run server &
curl -s -w ' %{http_code}\n' -X POST localhost:4199/api/tasks/task-r1/snooze -H 'x-user-id: u-ana'
# 200: Ana snoozed a task on Ben's list, which she cannot see. Item 7.
```

## Resetting between candidates

Nothing to reset. The PR is read-only for them and the server is in-memory.
Candidates never touch the repo, so there is nothing to clean up.

## Images

`images/` holds screenshots taken from the running app at 1000px wide, 2x:

| File | Shows | When |
|---|---|---|
| `00-before-home.png` | Lists index on `main` | Orientation, if asked what the app is |
| `01-before-list-page.png` | Groceries list page on `main` | With the ticket, minute 5 |
| `02-ticket-sketch.png` | Product owner's sketch of the ask | With the ticket, minute 5 |
| `03-after-list-page.png` | Same page on the agent branch | In the PR description, minute 8 |
| `04-after-snoozed.png` | After clicking Snooze | Optional, in the PR description |

To regenerate after a change: run `bun run server` and `bun run dev` on the
branch you want, then screenshot `/lists/list-groceries` with any headless
browser. The sketch is `mockup/ticket-sketch.html`, a static page.
