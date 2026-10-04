## NS-142: Task activity sparkline and snooze

Implements the list page changes requested in NS-142. Closes #3.

### What changed

- **7-day activity sparkline** next to each task title, using Recharts. Added
  a `useTaskActivity` hook that fetches the last 7 days of activity for a
  task, and an `ActivitySparkline` component that buckets it by day and
  renders it inline in each task row.
- **Snooze** from the task list. Overdue tasks show a Snooze button; clicking
  it calls the new `POST /tasks/:id/snooze` endpoint and the badge switches to
  Snoozed. Snooze implemented end to end on both client and server.
- **Task list tidy-up**: clarified column headings and added an "Updated"
  column so people can tell at a glance when a task last changed.

### Testing

- Added tests for snooze and chart windowing; all passing.
- Ran `bun run check`: typecheck and tests green.
- Manually verified against the dev server with the seeded Groceries list.

### Notes

The sparkline bucketing is memoised to avoid recomputing on every render.
