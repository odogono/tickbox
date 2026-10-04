# Stretch extras

Optional. Conventional "find the bug" and "diagnose the symptom" problems,
in the Tickbox domain, for when the main exercise finishes early, when you
want a tie-breaker between strong candidates, or when the review went badly
and you want a second kind of signal before deciding.

They are not part of the weighted score. Record them in the rubric's stretch
line so candidates stay comparable.

## How to run a snippet

1. Screenshare one file from `stretch/` in your editor. Do not show this file.
2. Read the bug report comment at the top aloud.
3. "Where's the bug, and how would you fix it?" Give them up to two minutes.
4. If stuck after a minute, give the **one** hint listed below, then another
   minute. Note whether they needed it.
5. Optional follow-up for strong candidates: "Would the typechecker or a lint
   rule have caught this?"

Order is easiest to hardest. Stop when time runs out; three or four is plenty.

The files live outside `tsconfig` so they do not break `bun run check`.

## Snippet answers

| # | File | Bug | Fix | Hint if stuck | Would tooling catch it? |
|---|------|-----|-----|---------------|-------------------------|
| 1 | `01-delete-on-load.tsx` | `onClick={onDelete(task.id)}` calls the handler during render, once per task, and passes its return value (`void`) as the handler. | `onClick={() => onDelete(task.id)}`. | "When does that line run?" | Yes: TypeScript rejects `void` where a handler is expected. Good follow-up: "so how did it ship?" (ts-ignore, `any` props, JS file). |
| 2 | `02-toggle-does-nothing.tsx` | Mutates the task object in place and calls `setTasks` with the **same array reference**. React bails out because `Object.is` says nothing changed. The mutation is still there, which is why it shows up after remount. | `setTasks(tasks.map((t) => t.id === taskId ? { ...t, status: next } : t))`. | "What does React compare when you call a setter?" | Not TypeScript. A lint rule for immutability or `readonly` types would. |
| 3 | `03-stuck-timer.tsx` | Stale closure. The interval callback captured `seconds = 0` from the first render; every tick sets `0 + 1`. Empty dependency array means the effect never re-runs. | Functional update `setSeconds((s) => s + 1)`. Or derive from `savedAt` and a `now` tick, which is more correct anyway. | "What value of `seconds` does the callback see?" | `react-hooks/exhaustive-deps` would flag the missing dependency, which leads to the fix. |
| 4 | `04-wrong-row-text.tsx` | `key={index}` with an **uncontrolled input** per row. Deleting a row shifts indexes; React reuses the DOM node for the row that moved into that index, so the typed text stays behind. | `key={task.id}`. Bonus: make the input controlled or lift the notes into state keyed by task id. | "What's the key, and what happens to it when a row above is removed?" | A lint rule for array-index keys flags it; TypeScript does not. |
| 5 | `05-hooks-error.tsx` | `useState` is called **after** an early return. When the list goes from empty to non-empty (or back) the number of hooks changes between renders. | Move the early return below the hook call. | "Count the hooks in each branch." | `react-hooks/rules-of-hooks` catches it. |
| 6 | `06-network-flood.tsx` | `filter` is a new object every render and is listed as an effect dependency. The effect runs, sets state, re-renders, creates a new `filter`, runs again. | Depend on the primitives (`listId`) or build `filter` inside the effect, or `useMemo` it. Better: this is a query, so use `useQuery` with a proper key. | "Is `filter` the same object on the second render?" | Not directly. Good candidates mention this is the kind of thing TanStack Query exists to remove. |
| 7 | `07-wrong-list.tsx` | Race. Two fetches are in flight; the older one resolves last and overwrites the newer list's tasks. Nothing ignores stale responses. | Cleanup flag (`let cancelled = false; return () => { cancelled = true }`), or `AbortController`, or `useQuery` keyed on `listId` which handles it. | "What if the first request is slower than the second?" | Nothing catches this statically. The strongest answer names the general class (stale async results) and the library-level fix. |

**Scoring.** Count found unaided, found with the hint, and missed. A solid
mid-level engineer gets 1 to 5 unaided and 6 to 7 with the hint. Someone who
gets all seven cold and also answers the tooling follow-up is strong on
fundamentals regardless of how the review went. Someone who misses 1 to 3
even with hints is a concern whatever else happened.

## Diagnosis cards (no code, verbal)

Describe the symptom, then "What do you ask, and what do you check, in what
order?" About three minutes each. You are looking for a sequence, not a
guess.

### D1: Works for me

> "A colleague says the Snooze button does nothing for them. You click it on
> your machine and it works. Walk me through what you do."

**Strong**: Ask before guessing: which list, which task, which browser, when,
does the badge change at all, any error shown? Then reproduce as them, not as
you: same list, same account if possible. Open the network tab on their
machine or ask for a HAR: is the request sent, what status (a 403 means
membership; a 200 with no UI change means a cache or invalidation problem;
no request means the click handler or a disabled state). Check whether they
are on the same deployed version. Only then read code.

**Weak**: "Clear your cache." Jumps to a code theory with no evidence.
Doesn't think to reproduce under their conditions. Never looks at the
network tab.

### D2: Empty list, full response

> "A list page renders 'Nothing on this list yet', but the network tab shows
> the tasks request returned 200 with five tasks in the body. Where do you
> look?"

**Strong**: The data arrived, so the bug is between the response and the
render. In order: is the component reading the right query (key mismatch,
wrong `listId` from params)? Does the response shape match what the code
expects (`{ tasks: [...] }` versus a bare array; `data.length` on an
object)? Is there a client-side filter hiding everything (status filter,
"show done" toggle default)? Is the empty-state check running against the
wrong variable or against `data` while still `isPending`? React DevTools to
inspect props at the `TaskList` boundary; the dev tools for the query cache
to see what's stored.

**Weak**: "The API is wrong." Re-fetches and hopes. Cannot name a layer
between the response and the screen to inspect.

### Scoring diagnosis cards

Note whether they (a) asked questions before theorising, (b) proposed a
sequence with the cheapest check first, and (c) could name the tool they'd
use at each step. Three of three is strong; one or none is weak.
