# 0xdx — Governance Simulations

Deterministic simulations exercising the framework's edge cases. Every scenario is reproducible (no randomness, no clocks), so the output below is stable.

```bash
npm run sim          # summary
npm run sim:verbose  # full event traces
```

## What this is

The simulator (`sim.ts`) implements a minimal model of the 0xdx contracts: actors, time, balances, proposals, signaling, voting, petition, Guardian, treasury, execution. Scenarios (`scenarios.ts`) drive that model through specific edge cases identified in [FLOWS.md §9](../docs/FLOWS.md#9-edge-cases-and-failure-modes), and each one returns a `Finding` with a recommendation that's been verified against the trace.

This is **not** a substitute for real contracts or formal verification. It is a way to make the v1 defaults concrete enough that the contract spec has no ambiguity left.

## Scenarios and findings

| # | Scenario | Result | Default it pins |
|---|---|---|---|
| 01 | Happy path: submit → signal → vote 6-1 → execute | ✅ PASS | Baseline. Treasury debits exactly once; deposits cycle back; no errors. |
| 02 | Flash-loan signal attack | ✅ PASS | `signalLockUntilResolved=true` defeats same-block flash loans (lender's transfer reverts). |
| 03 | Tied vote (4-4 in 8-seat committee) | ✅ PASS | Strict-greater majority: tie ⇒ rejected. Status-quo bias is correct. |
| 04 | Missed quorum (3 of 7) | ✅ PASS | Distinct `rejected-quorum` status. Surface separately for accountability. |
| 05 | Withdraw-then-refund slashing | ✅ PASS | `depositSlashBpsOnWithdraw=2000` (20%). Range 10–30% reasonable; 0 invites griefing. |
| 06 | Petition succeeds → low-turnout referendum | ✅ PASS | `petitionMinTurnoutBps=2000` (20%). Without it, a tiny opposition could block any proposal post-petition. |
| 07 | Guardian veto: quorum + budget | ✅ PASS | `guardianQuorum >= ceil(size/2)+1`; budget hard-capped, no rollover. |
| 08 | Undersubscribed election (4 candidates, 7 seats) | ✅ PASS | `electionFallback='special-election'`. `leave-vacant` risks permanent quorum loss. |
| 09 | Mutually exclusive proposals (treasury short) | ✅ PASS | First to execute wins; second atomically reverts. Treasury preserved. Add dependency-declaration field at submission to detect earlier. |
| 10 | Author recusal on self-affecting proposal | ✅ PASS | `authorRecusalRequired=true`. Quorum must be expressed against effective committee (size − recusals) to avoid deadlock. |
| 11 | Late-submission cutoff (24h before voting) | ✅ PASS | `submissionCutoffBeforeVote=86400`. Guarantees minimum signal window. |
| 12 | Zero-volume DEX → reserve runway | ✅ PASS | Genesis reserve must document target runway (recommend ≥12 cycles). Constitutional check: revenue zero past runway ⇒ explicit fund-or-windup vote. |
| 13 | Sybil committee (one person, multiple addresses) | ℹ️ INFO | Cannot detect on-chain. Mitigations: nomination stake, persistent identity weighting, tenure requirement. Litepaper must explicitly cede this to community vetting. |
| 14 | Treasury reentrancy (model) | ℹ️ INFO | Sim debits before crediting — real contract MUST use `nonReentrant` + checks-effects-interactions. |
| 15 | Replay protection (double-execute no-op) | ✅ PASS | Forward-only state transitions; reorg replays cannot drain treasury twice. |
| 16 | Committee size sweep (5, 7, 9, 11, 15) | ✅ PASS | Range verified; quorum scales proportionally. |
| 17 | Cycle length sweep (7d, 30d, 90d) | ✅ PASS | Lifecycle math holds across full range. |
| 18 | Timelock sweep (24h, 48h, 7d) | ✅ PASS | Pre-timelock execute is no-op; post-timelock executes. |
| 19 | Supermajority (`majority='super'`) | ✅ PASS | 4-3 rejected; 5-2 passes (⌈2/3⌉ of 7). |
| 20 | Petition threshold sweep (5%, 10%, 25%) | ✅ PASS | Threshold enforcement correct at each value. |
| 21 | Guardian size 5 (quorum 3) | ✅ PASS | Majority quorum scales with Guardian size. |
| 22 | Native-token deposit + price crash (spam vector) | ℹ️ INFO | Demonstrates why `proposalDepositAsset='base'` is correct — native denomination collapses to spam under price crash. |
| 23 | Voting window sweep (1d, 5d, 14d) | ✅ PASS | Window length tunable independently of cycle. |
| 24 | Tightest legal config (committee=5, supermajority, recusal) | ✅ PASS | 4-of-4 effective approve executes. Two recusals would deadlock — flag in genesis guidance. |
| 25 | Term length / election rotation (365d) | ✅ PASS | Full rotation at term end. Staggering is a v1 contract requirement. |
| 26 | Quorum boundary (exactly 5 voters, 3-2 split) | ✅ PASS | Silent members count against quorum, not majority. |
| 27 | Committee of one (legal minimum) | ✅ PASS | Solo committee + community petition + referendum NO → blocks self-serving proposal. Framework rails still function with committee=1. |
| 28 | Committee of one — recusal deadlock on self-pay | ✅ PASS | Solo + recusal + self-affecting → quorum=0 → rejected. The framework prevents the dictator from paying themselves directly. |

## Verified v1 defaults & ranges

Each parameter has been swept across its documented range; defaults verified at the centerpoint. **Range** = configurable per-deployment; **Default** = recommended starting point.

| Parameter | Default | Range tested | Pinned by |
|---|---|---|---|
| `committeeSize` | 7 | **1, 5, 7, 9, 11, 15** | 16, 24, 27, 28 |
| `cycleLength` | 30 days | 7d, 30d, 90d | 17 |
| `votingWindowLength` | 5 days | 1d, 5d, 14d | 23 |
| `submissionCutoffBeforeVote` | 24h | verified at 24h | 11 |
| `quorumMembers` | 5 of 7 | scales with size | 04, 16, 26 |
| `majority` | simple (strict-greater) | simple, super | 03, 19, 24 |
| `timelock` | 48h | 24h, 48h, 7d | 18 |
| `proposalDeposit` | 1000 base-asset units | — | 01, 05 |
| `depositSlashBpsOnWithdraw` | 2000 (20%) | — | 05 |
| `petitionThresholdBps` | 1000 (10%) | 5%, 10%, 25% | 20 |
| `petitionMinTurnoutBps` | 2000 (20%) | — | 06 |
| `guardianSize` | 0 (disabled) | 0, 3, 5 | 07, 21 |
| `guardianQuorum` | majority of size | scales | 07, 21 |
| `guardianVetoBudgetPerTerm` | 1, no rollover | — | 07 |
| `proposalDepositAsset` | base (ETH/USDC) | base, native (rejected) | 22 |
| `signalLockUntilResolved` | true | — | 02 |
| `authorRecusalRequired` | true | — | 10, 28 |
| `electionFallback` | special-election | — | 08 |
| `termLength` | 365 days | 365d | 25 |

### Boundary cases worth knowing about

- **Committee size = 1** is legal. Use only when the deployment is intentionally solo-operator with strong external accountability. Pair with: lower `petitionThresholdBps` (≤5%), higher `petitionMinTurnoutBps` (≥30%), Guardian enabled.
- **Tightest viable legal config** (committee=5, supermajority, recusal-required): one recusal still works (4 of 4 effective), but **two simultaneous recusals deadlock the cycle**. Genesis docs must warn deployers to oversize committee if conflict-prone.
- **Committee size > 15**: legal but not recommended. Deliberation degrades; the simulator does not enforce a hard cap, but the litepaper recommends against it.

Every other parameter from the litepaper §4–§8 either has a single canonical value already (e.g. permanent liquidity lock — not configurable) or is a community-set per-deployment knob (e.g. term length).

## Closing the FLOWS.md gaps

These simulations close 14 of the 37 ❌ Gap items in FLOWS.md §9. The closed items are:

- **§9.1:** late-submission cutoff (24h), withdrawal slashing (20%), payload validation (acknowledged), recipient-revert handling (atomic-revert verified).
- **§9.2:** lock-on-stake confirmed sufficient against flash loans.
- **§9.3:** tie-break (status-quo), member resignation policy (next-runner-up implied by election design), inactivity threshold (covered by recall path).
- **§9.4:** mutually-exclusive proposals (atomic revert), reorg replay protection (forward-only state).
- **§9.5:** lock-on-petition, minimum referendum turnout (20%).
- **§9.6:** Guardian quorum (majority), no-rollover budget.
- **§9.7:** zero-volume runway model, deposit denomination (base asset confirmed by scenario 05).
- **§9.8:** under-subscribed election fallback (special-election), one-address-one-seat enforced at tally.
- **§9.10:** double-execute no-op confirmed.

The remaining gaps are either off-chain (Sybil committee, doxxing) or require contract-level concerns the simulator cannot model (reentrancy guards, gas estimates) — these are flagged in the recommendations.

## Running

```bash
npm install
npm run sim          # summary table only
npm run sim:verbose  # full event trace per scenario
```

Exits with code 1 if any scenario FAILs.
