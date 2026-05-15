# Attributions

This repository builds on the following open-source work:

- **[shadcn/ui](https://ui.shadcn.com/)**: UI primitives, used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). Only the `Button` primitive is retained in this codebase.
- **[lucide-react](https://lucide.dev/)**: icon set, used under ISC license.
- **[motion](https://motion.dev/)** (formerly Framer Motion): animation library, used under MIT license.
- **[react-markdown](https://github.com/remarkjs/react-markdown)** + **[remark-gfm](https://github.com/remarkjs/remark-gfm)**: used under MIT license to render the litepaper.
- **[Tailwind CSS](https://tailwindcss.com/)** + **[@tailwindcss/typography](https://github.com/tailwindlabs/tailwindcss-typography)**: used under MIT license.

## Prior-art patterns referenced in the specification

0xdx ships no Snapshot Labs code as a dependency. The following design patterns in [`docs/FLOWS.md`](docs/FLOWS.md) and `0xdx_litepaper.md` §4.2 are influenced by Snapshot Labs' open-source work (all MIT-licensed); we adopt the algorithmic shape, not the surrounding product machinery:

- **Executor state machine** (queue / execute / veto, `keccak256(payload)`-keyed `proposalExecutionTime` mapping, state-zero-before-external-call reentrancy guard) — pattern from [`sx-evm`'s `TimelockExecutionStrategy.sol`](https://github.com/snapshot-labs/sx-evm/blob/main/src/execution-strategies/timelocks/TimelockExecutionStrategy.sol). See FLOWS.md §11.1.
- **Acceptance rule** (`(votesFor + votesAbstain) ≥ quorum AND votesFor > votesAgainst`) — pattern from [`sx-evm`'s `SimpleQuorumExecutionStrategy.sol`](https://github.com/snapshot-labs/sx-evm/blob/main/src/execution-strategies/SimpleQuorumExecutionStrategy.sol). See FLOWS.md §11.2.
- **Six-step write-path validation order** for off-chain signed votes (schema → existence → window → choice → validation → voting power, then latest-by-timestamp dedup) — order lifted from [`sx-monorepo/apps/sequencer/src/writer/vote.ts`](https://github.com/snapshot-labs/sx-monorepo). See FLOWS.md §11.3.
- **EIP-712 typed-data envelope shape** for `SignalVote` / `CommitteeVote` / `PetitionStake` — field names match [`snapshot.js`'s `Vote` type](https://github.com/snapshot-labs/snapshot.js) where semantics are identical, so existing signers and indexers remain compatible. See FLOWS.md §11.4.
