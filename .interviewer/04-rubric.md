# Rubric: agent-PR review interview

Candidate: ______________________  Date: __________  Interviewer: Alex

Score each criterion 1 to 4. Criteria 4 and 5 count double. Max 32.

| # | Criterion | 1 looks like | 4 looks like | Score | Weight | Weighted |
|---|-----------|--------------|--------------|-------|--------|----------|
| 1 | Asks before judging | Goes straight to the diff; never clarifies the ticket. | Asks two or more sharp questions about intent before opening code, and uses the answers later. | | 1 | |
| 2 | Finds the real defects | Finds one or none of items 1, 2, 4, 7. | Finds four of them, explains why each matters, unprompted. | | 1 | |
| 3 | Signal over noise | Flags the red herring; lists everything flat with no severity. | Lets the red herring go, names the one blocking issue, treats scope creep as a conversation not a defect. | | 1 | |
| 4 | Verification mindset | Accepts "tests added, all passing" at face value. | Opens the test file because of the claim, says what tests should exist, says how they'd prove the fix works. | | 2 | |
| 5 | Directs the agent well | Brief is vague ("fix the issues"), unbounded, no acceptance criteria. | Brief is specific, prioritised, says what not to touch, names how success is checked, asks the agent to report what it could not verify. | | 2 | |
| 6 | Communication | Rambles, cannot be steered, defends a wrong position. | Clear, concise, changes their mind when given a good counter, explains trade-offs. | | 1 | |
| | **Total** | | | | | **/32** |

## Nudges used (tick)

- [ ] N1 (min 8): testing claim unchallenged
- [ ] N2 (min 14): server file unopened
- [ ] N3 (min 20): no prioritisation offered

## Dictated brief (paste verbatim, final version)

```

```

## Scenario notes

1. Tests pass, CI red:
2. Green but refuse to merge:
3. New ticket, what to add:

## Discussion notes

Last time they didn't trust an agent:

## Stretch extras (not in the total; tie-breaker only)

Snippets shown: ____  Found unaided: ____  Found with the hint: ____  Missed: ____

Diagnosis cards shown: ____  Notes:

## Recommendation (write this before totalling)

Hire / No hire / Borderline, and why in three sentences:
