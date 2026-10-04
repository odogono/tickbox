# Scenario cards

About 90 seconds each. Read the card, listen, ask "anything else?" once, move on.

## S1: Tests pass, CI is red

> "The agent reports all tests pass. CI is red. What do you do first?"

**Strong**: Read the CI log before touching anything. Distinguish "tests fail
in CI" from "CI environment differs" (Node version, missing env var, flaky
test, lockfile drift, the agent ran a subset). Reproduce locally with the
same command CI runs. Only then go back to the agent, with the log.

**Weak**: "Ask the agent to fix it." Re-run CI and hope. Assume the agent is
wrong without evidence, or assume CI is wrong without evidence.

## S2: Everything green, still wouldn't merge

> "The agent's output looks correct and tests are green. What would still
> make you refuse to merge?"

**Strong**: Several of: it does something the ticket didn't ask for; it
changes a public contract or schema without discussion; the tests test the
wrong thing or are tautological; security or authorisation isn't covered;
I can't explain the change myself; no one has actually run it; it touches
code the agent couldn't have had enough context to change safely
(migrations, auth, billing). Bonus: "green tests tell me it does what the
tests say, not what the ticket says."

**Weak**: Only style or formatting reasons. "If it's green and looks right
I'd merge." Cannot name anything beyond "if I had a bad feeling."

## S3: New ticket, before handing to an agent

Show this (paste into the scratch doc):

> "Add CSV export of a list's tasks. Should include everything the list page
> shows, including the activity."

> "Before you hand this to an agent, what do you ask or add?"

**Strong**: Clarifies: which tasks (done ones too?) and what activity window;
one row per task or per activity event; column set and formats (timestamps,
status values); size limits and long lists; who can export (same membership
rules as viewing); where the button lives; filename. Adds to the brief:
existing patterns to follow (`useTasks`, `CacheKeys`, membership checks in
the server), what not to touch, what tests to write, and "tell me what you
couldn't verify."

**Weak**: Hands it over as-is. Or asks only UI questions and nothing about
access, size or data shape.
