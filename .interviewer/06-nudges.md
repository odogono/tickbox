# Scripted nudges

Use at most three. Each is a question, not a hint about the answer. Tick the
box on the rubric for each one used.

## N1, minute 8: the testing claim is unchallenged

Trigger: they have seen the PR description and have not questioned any of
the "Testing" bullets.

> "Anything in the description you'd want to check for yourself before
> reading further?"

If still nothing, move on. Do not point at the test file.

## N2, minute 14: the server file is unopened

Trigger: they have been in the diff for five or more minutes and have not
opened `server/index.ts`.

> "There's a server change in there too. Worth a look?"

Do not mention authorisation or membership.

## N3, minute 20: no prioritisation offered

Trigger: they have listed findings but not ranked them, and haven't said
what they'd block on versus let go.

> "If you could only get one thing fixed before this ships, which one?"

## Not nudges

Answering their product-owner questions is not a nudge. Asking "anything
else?" once is not a nudge. Telling them where a bug is, or what kind of bug
to look for, is beyond a nudge and invalidates comparison with other
candidates. Don't.
