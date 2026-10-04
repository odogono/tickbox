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

1. Open the PR in an incognito window to confirm the description renders and
   `.interviewer/` is nowhere in "Files changed". It isn't in the three-dot
   diff, but check once.
2. Candidates need read access to the private repo for the PR link to work.
   Easiest: add them as a read-only collaborator five minutes before the
   call and remove them after. Alternative: screen-share only and skip the
   link, at the cost of them reading at your pace.
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
If a candidate leaves review comments on GitHub, resolve and hide them
before the next session.
