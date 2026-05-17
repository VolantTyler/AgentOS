# Suite: smoke

## Purpose

Run the fastest, highest-signal saved checks for obvious wiring or workflow
breakage.

## Selection rules

Include:

- every manifest explicitly labeled `smoke`, and  
- any manifest the parent agent marks as directly changed or high-risk.

## Current members

- `feature-quality-system`
- `lead-tracker`

## Expected use

Use:

- after a new feature passes `/evaluate-feature`,  
- after edits to core workflow docs, agents, or commands, or  
- before handing a change off for wider review when you want a quick safety pass.
