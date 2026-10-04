# Answer key: planted items in NS-142

Seven items, each mapped to a rubric criterion. A strong candidate finds 1, 2,
4, 5 and 7 unprompted, mentions 3 as a question of scope, and says 6 is fine
or does not mention it at all.

Item 2 is deliberately easy: the agent left a TODO in `snooze-button.tsx`
saying expiry is not implemented. Almost everyone should find it. What
separates candidates is whether they then connect it to the PR description's
"end to end" claim (item 5) and go looking for what else the description
oversells.

| # | Category | File | What to look for | Rubric |
|---|----------|------|------------------|--------|
| 1 | Real bug | `src/hooks/use-task-activity.ts` | `const since = new Date(Date.now() - WEEK).toISOString()` sits at **module scope**, so the 7-day window is fixed at the moment the module first loads. A tab left open over the weekend shows a window that no longer ends at "now", and refetches return the same range. Fix: compute inside the hook or the queryFn, and consider making the window part of the query key (rounded, so it doesn't thrash). | 2 |
| 2 | Spec deviation (easy) | `src/components/tasks/snooze-button.tsx` (TODO comment), `server/index.ts` (`/snooze` handler), `server/store.ts` (`snoozedTasks`) | A TODO comment in the button says outright: "expiry is not implemented". The server confirms it: snooze adds the id to a `Set`, which has no timestamp. The ticket's second sentence, "come back on their own after an hour", is missing, and the PR description says "Snooze implemented end to end" anyway. Finding the TODO is the floor; noticing the description contradicts it is the signal. | 2, 4 |
| 3 | Scope creep | `src/components/tasks/task-list.tsx` | Column heading renamed ("Task" to "Title") and an "Updated" column added with a relative-time formatter. Nobody asked. Harmless but should be a separate change or at least called out and agreed. The strong answer is "I'd ask why, and probably ask for it to be split out", not "this is wrong". | 3 |
| 4 | Structural | `src/hooks/use-task-activity.ts`, `src/components/tasks/activity-sparkline.tsx` | The new hook sits right next to `use-tasks.ts` and breaks all three of its conventions: key is `["activity", taskId]` (outside `CacheKeys.all`, so shared invalidation misses it), no `enabled` gate on authentication, and the sparkline renders a loading state but **no error state**: on failure `activity.data` is undefined and the component silently shows "No activity in last 7 days", which is a lie. Compare with `useTasks` and the README conventions. Also worth a mention: one query per row, so a 40-task list fires 40 requests. | 2 |
| 5 | Unverified claim | PR description vs `src/__tests__/activity-sparkline.test.tsx` | Description: "Added tests for snooze and chart windowing; all passing." The only new test renders `SparklineChart` with an empty events array and checks the empty-state text. The existing TaskList test was only wrapped in a `QueryClientProvider`. Nothing tests snoozing, nothing tests the window. "All passing" is true and irrelevant. A strong candidate opens the test file *because* of the claim. | 4 |
| 6 | Red herring | `src/components/tasks/activity-sparkline.tsx` | `useMemo` around the events-to-daily-buckets transform. Cheap, correct, dependency array is right. A candidate who flags this as "premature optimisation" or "unnecessary" is pattern-matching rather than reading. Letting it go, or saying "fine, wouldn't block on it", is the right call. | 3 |
| 7 | Server authorisation | `server/index.ts` (`POST /tasks/:id/snooze`) | The handler authenticates the caller (401 if no user) but never checks the task belongs to a list the caller is on. Every other endpoint in the same file does the check. Ana can snooze a task on Ben's Home renovation list. Front-end candidates may not spot this cold; the nudge at minute 14 points them at the file, not the bug. | 2 |

## Diff shape

12 files, about 150 lines added. Two commits in the agent's voice. Most files are one- or two-line touches; the five that matter are the hook, the sparkline, the snooze button, the task list and the server.

## Things that are deliberately fine

- The `useMemo` (item 6). `Date.now()` inside it recomputes on every refetch
  because the events array is new each time; the drift is bounded by
  `staleTime` and not worth raising.
- `staleTime` on the activity query.
- The `Snoozed` badge styling and the `snoozed` status value being added to the type.
- Recharts `ResponsiveContainer` not used (fixed width is intentional for a table cell).

## Ticket ambiguities a strong candidate asks about (criterion 1)

- Who is allowed to snooze?
- What happens when a task has had no activity in 7 days?
- "Come back after an hour": from when, and what if it was ticked off meanwhile?
- What does the chart actually need to show?
- Is 7 days a rolling window from now?
- Can you snooze something that isn't overdue?

## Scoring hints

- Found 1, 2, 4, 5, 7 and dismissed 6: criterion 2 = 4, criterion 3 = 4.
- Found 2 (the TODO) and nothing else: criterion 2 = 1. It was meant to be found.
- Found 1 and 4 only: criterion 2 = 2.
- Found the TODO and immediately re-read the description for other claims: criterion 4 at least 3.
- Flagged 6 as a problem and listed everything flat: criterion 3 = 1 or 2.
- Never questioned the testing claim even after the minute-8 nudge: criterion 4 = 1.
