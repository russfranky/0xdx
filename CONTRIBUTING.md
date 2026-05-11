# Contributing to 0xdx

0xdx is a governance framework specification. Contributions fall into two buckets: improvements to the specification documents and improvements to the website/tooling that publishes them. Both are welcome.

## Table of contents

- [Code of conduct](#code-of-conduct)
- [Ways to contribute](#ways-to-contribute)
- [Reporting bugs and errors](#reporting-bugs-and-errors)
- [Proposing spec amendments](#proposing-spec-amendments)
- [Pull requests](#pull-requests)
- [Style guide](#style-guide)
- [License](#license)

## Code of conduct

All contributors are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md). Respectful, direct, and constructive participation only.

## Ways to contribute

| Contribution type | Mechanism |
|---|---|
| Typo or factual error in a doc | Issue or direct PR |
| Ambiguity or gap in the spec | Issue with `spec: ambiguity` label |
| Proposed spec amendment | Issue with `spec: amendment` label — include rationale |
| Website bug | Issue with `bug` label |
| New simulation scenario | PR with scenario added to `simulations/scenarios.ts` |
| Security vulnerability | See [SECURITY.md](./SECURITY.md) |

## Reporting bugs and errors

Use the **Bug report** issue template. Include:

- Which document or page the error appears in (file path or URL)
- The exact text that is wrong or unclear
- What the correct version should say, if you know it

For website bugs: browser, OS, and a screenshot if relevant.

## Proposing spec amendments

The 0xdx specification is intentionally versioned. Amendments to the core documents (`0xdx_litepaper.md`, `CONSTITUTION.md`, `IDENTITY.md`, `LEGAL.md`, `docs/FLOWS.md`) are significant changes and require discussion before a PR is opened.

Use the **Spec amendment** issue template. A good amendment proposal covers:

1. Which section is affected and why the current text is insufficient
2. The specific change proposed (exact replacement text preferred)
3. Rationale — what problem this solves or what gap it closes
4. Any tradeoffs or second-order effects

Amendments that narrow the mission, introduce governance centralization, or contradict the core autonomy principles in `CONSTITUTION.md` Article 1 will not be accepted.

## Pull requests

1. Fork the repo and create a branch from `main`.
2. For spec changes, open an issue first and get acknowledgment before writing the PR.
3. For website/tooling changes: `npm run build` must pass with no TypeScript errors.
4. Keep PRs focused. One concern per PR.
5. Write a clear description of what changed and why.

### Commit format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add DEX fee circuit-breaker to treasury section
fix: correct quorum formula in FLOWS.md §4.3
docs: clarify Guardian veto scope in litepaper §6
chore: bump Node to 22 in CI
```

Subject line under 72 characters. Optional body paragraph for context.

## Style guide

**Documents (`.md` files):**
- Write in plain, direct prose. No em-dashes. Prefer colons and commas.
- Use numbered sections for normative text (`§1.1`, `§1.2`).
- Define terms on first use; refer to the defined term consistently thereafter.
- Avoid AI-sounding hedges ("it is worth noting", "it should be emphasized").
- Tables over bullet lists when comparing options.

**Code and simulations:**
- TypeScript strict mode — no `any`, no suppressed errors.
- Simulations must be deterministic (no `Date.now()`, no `Math.random()`).
- Each new simulation scenario requires a finding row in `SIMULATIONS.md`.

## License

By submitting a contribution, you agree that it will be licensed under the [MIT License](./LICENSE) that covers this project.
