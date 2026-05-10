# The 0xdx Constitution

> **Version 1.0** · Effective **2026-05-09** (UTC) · Released under the MIT License.
> This document sets out the values, rights, and amendment procedure that
> govern any DAO deployed on the 0xdx framework. It is intended as a
> reference text for deployers and reviewers; specific deployments may
> ratify it verbatim, fork it, or replace it with their own charter, so
> long as they do so transparently before a community petition window.

---

## Article 1. Mission and Values

The mission of the 0xdx framework is to make decentralized governance
**equitable, deliberative, and self-sustaining**: to give a community
real authority over its own resources, without forcing it to choose
between the tyranny of the wealthy, the chaos of unstructured mass
voting, and the silent re-centralization of "delegate everything."

A deployment of 0xdx is an attempt at *democratic decentralization*: the
authority to spend, build, and amend belongs to people, not to capital.

Every deployment is expected to uphold these values:

1. **One person, one vote, within the elected committee.** No token
   weighting; no purchased seats; no vote stacking through wrappers,
   delegation cycles, or borrowed identity. A committee member is one
   human exercising one judgment.
2. **Open proposal rights.** Any community member can submit a
   proposal, not only committee insiders. The committee deliberates;
   the community sets the agenda.
3. **Automated, deterministic execution.** Once a proposal passes its
   defined thresholds and timelock, the smart contract executes it.
   No human gatekeeper sits between the vote and the action.
4. **Self-funding, never self-dealing.** The treasury is replenished by
   genuine economic activity (integrated DEX fees), not by inflating a
   token, dumping on retail, or extracting from new entrants.
5. **Transparency by default.** Proposals, votes, deliberations,
   treasury flows, and committee composition are public on-chain or in
   open mirrors. Privacy is preserved only for individual identity, not
   for governance acts.
6. **Reversibility for users; irreversibility for treasury.** Initial
   liquidity is permanently locked so users always have a market exit.
   Governance decisions, once executed, are honored: no quiet rollback,
   no clawback that bypasses the proposal process.
7. **Skin in the game, not skin-in-the-tokens.** Committee members earn
   their seats by sustained contribution and election, not by buying
   into a presale. Petition power is vested in the broad community,
   gated by participation, not balance.

These values are binding on the framework's recommended defaults and on
any deployment that wishes to identify itself as "0xdx-compliant."

---

## Article 2. Membership and Participation

**§ 2.1 Three roles.** Every 0xdx deployment recognizes three roles,
each with rights and limits defined in code:

| Role | Selected by | Vote weight | Primary right |
|---|---|---|---|
| **Committee member** | Election (or genesis seating) | 1 vote inside the committee | Vote on submitted proposals |
| **Community member** | Verified humanness (see §6) | 1 voice in petitions and signals | Submit proposals; petition; signal sentiment; trigger referendum |
| **Guardian** (optional) | Election or genesis seating | 1 vote inside the Guardian quorum | Veto specific proposal classes within a hard-capped budget per term |

**§ 2.2 Rights of every community member.** A verified community
member of any 0xdx deployment has the right to:

a. submit a proposal upon paying the deployment-defined deposit;
b. signal sentiment on a proposal during its open signal window;
c. petition for a community referendum if §5 thresholds are met;
d. observe all governance actions on-chain or via the deployment's
   public mirror;
e. exit the ecosystem at any time, including by selling their position
   on the integrated DEX, which is permanently liquid by construction.

**§ 2.3 Responsibilities of every committee member.** A committee
member, on accepting their seat, undertakes to:

a. attend and vote in good faith on every proposal in their term, or
   formally abstain;
b. recuse themselves from any proposal that affects their personal
   compensation, employment, or holdings (recusal is required, not
   optional; see §5.4);
c. publish their voting record and rationale in the deployment's
   transparency channel;
d. accept removal by community recall procedure if they fail their
   duties.

**§ 2.4 Limits on committee authority.** The committee cannot:

a. mint, dilute, or unilaterally distribute the deployment's assets
   outside the proposal process;
b. modify the constitution, the framework parameters, or the smart
   contracts without going through Article 7;
c. vote on proposals from which they have a recusal-required interest;
d. seize, freeze, or claw back funds from any community member
   except by a proposal that itself passes the timelock and any
   referendum override.

---

## Article 3. Governance Structure

**§ 3.1 The committee.** The canonical committee size is **7**, with
a recommended range of **5–15**. The framework permits boundary sizes
(1 and >15) but flags them as carrying additional risk; deployers
choosing those sizes accept that risk in writing in their deployment
declaration.

**§ 3.2 The Guardian (optional).** Deployments may instantiate a
Guardian: a separate multisig with veto authority over specific
proposal classes, hard-capped at a fixed number of vetoes per term and
no rollover. Guardian quorum is a strict majority of Guardian seats
(`ceil(size/2) + 1`). The Guardian cannot propose, only veto.

**§ 3.3 Election cadence.** Committee terms are bounded by
`termLength` (default 365 days). Elections are staggered so that no
single term-end fully replaces the committee at once. The framework
treats stagger as a v1 contract-level requirement.

**§ 3.4 Quorum.** A vote is valid only if `quorumMembers` of the
**effective committee** participate, where the effective committee is
`committeeSize − recused_members` for that proposal. Silent members
count against quorum but not against majority.

**§ 3.5 Majority.** The default rule is **simple, strict-greater**:
ties are rejected. Deployments may instead choose **supermajority**
(`ceil(2/3 × effective committee)`) for sensitive proposal classes.

---

## Article 4. Decision-Making

**§ 4.1 Proposal lifecycle.** Every proposal passes through six stages:

1. **Ideation.** Discussed in the community channel; no on-chain
   action yet.
2. **Submission.** Proposer pays the deposit; proposal hash is
   committed on-chain. The submission cutoff is enforced
   (`submissionCutoffBeforeVote`, default 24 h).
3. **Signaling.** Community members may signal support or opposition
   using locked signal stakes that do not bind the committee but are
   recorded.
4. **Voting.** The committee votes within the `votingWindowLength`.
5. **Resolution.** The contract tallies. Outcomes are exhaustively:
   `passed`, `rejected`, `rejected-quorum`, or `vetoed`.
6. **Execution.** After the timelock, a passed proposal executes
   automatically. Pre-timelock execution attempts are no-ops.

**§ 4.2 Proposal categories.** A 0xdx-compliant deployment classifies
each proposal into one of four categories, each with its own thresholds:

| Category | Default majority | Default timelock | Notes |
|---|---|---|---|
| **Operational** | simple | 48 h | Routine treasury spend, partner payments, non-protocol decisions |
| **Parameter** | simple | 48 h | Adjustments to non-constitutional framework parameters |
| **Treasury (large)** | super | 7 d | Spend exceeding deployment-declared threshold |
| **Constitutional** | super | 14 d | Amendments to this document, the framework parameters that this document references, or the proposal-category list itself |

The deployment may add categories but may not collapse Constitutional
into a lower threshold.

**§ 4.3 Community petition and referendum.** If a passed proposal
draws opposition meeting `petitionThresholdBps` (default 10%) of
verified community members within the petition window, a binding
referendum is triggered. The referendum requires
`petitionMinTurnoutBps` (default 20%) participation and a strict-
greater majority. A referendum NO overrides the committee.

**§ 4.4 Author recusal.** If a proposal would materially affect the
proposer's personal interests, `authorRecusalRequired = true` excludes
their vote from the tally. Quorum is computed against the effective
committee (`committeeSize − recusals`).

---

## Article 5. Treasury

**§ 5.1 Source of funds.** Treasury revenue comes from the integrated
DEX protocol fee (`0.3%` default of swap volume), routed in the
deployment's base asset (ETH, USDC, or other deployer-chosen base).
The 0xdx framework does not require the existence of a native
governance token; if a deployment chooses to issue one, that token's
economics are out of scope of this constitution.

**§ 5.2 Initial liquidity is permanently locked.** All initial
liquidity provided at genesis is sent to a non-upgradeable lock
contract. No proposal (Operational, Parameter, Treasury, or
Constitutional) may withdraw the initial liquidity. This is the only
governance action explicitly prohibited at the contract level.

**§ 5.3 Spending follows the proposal lifecycle.** No funds leave the
treasury except via a passed, timelocked, executed proposal. There is
no admin EOA, no super-user override, no off-chain key with treasury
authority.

**§ 5.4 Transparency.** Every treasury inflow and outflow is recorded
on-chain with a reference to the originating proposal hash.

---

## Article 6. Identity and Sybil Resistance

**§ 6.1 The framework's posture.** 0xdx requires that committee
elections, petitions, and referenda treat each participant as **one
unique human**. Identity verification is a critical dependency.

**§ 6.2 Pluggable, not prescriptive.** The framework does not mandate a
single identity provider. Instead, it specifies a **pluggable identity
interface** (see `IDENTITY.md`) and allows each deployment to choose
the provider(s) it accepts, subject to the minimum requirements in
§6.3.

**§ 6.3 Minimum requirements for any accepted provider.** Any
identity provider accepted by a 0xdx-compliant deployment must satisfy:

a. **Uniqueness.** It must produce, with high probability, exactly one
   verified credential per natural person.
b. **Privacy preservation.** It must not require the participant to
   disclose raw biometrics, government documents, or persistent
   personal data to the deployment, the committee, or any chain
   indexer.
c. **Zero-knowledge attestation.** Membership is proven via a
   zero-knowledge proof; the deployment learns *that* a participant is
   a unique verified human, not *who* they are.
d. **Revocability.** The provider must support credential revocation
   for documented sybil incidents, without retroactively invalidating
   honest past votes.
e. **Open verifiability.** The verification circuit and parameters must
   be open-source and auditable.

**§ 6.4 Encrypted-biometric reference design.** The framework's
recommended reference implementation (see `IDENTITY.md`) is a
client-side encrypted biometric template plus a zero-knowledge
attestation of uniqueness. Raw biometrics never leave the user's device;
the on-chain artifact is the ZK proof, not the template.

**§ 6.5 Off-chain Sybil residual.** No identity system is perfect.
The framework explicitly acknowledges that committee elections may
still be subject to off-chain Sybil attempts (one person presenting as
multiple). Mitigations are: nomination stake, persistent identity
weighting, tenure requirements, and ultimately community vetting. The
framework does not pretend to solve this problem at the contract level.

---

## Article 7. Amendment Process

**§ 7.1 What this document protects.** This Constitution protects:

a. the values listed in Article 1;
b. the role definitions in Article 2;
c. the prohibition on withdrawing initial liquidity (§5.2);
d. the existence of a community petition and referendum override (§4.3);
e. the identity minimum requirements (§6.3);
f. the amendment process itself (this Article 7).

**§ 7.2 How it is amended.** Any change to a clause protected by §7.1
requires a **Constitutional proposal**:

1. Submission with a 2× standard deposit.
2. A 30-day signaling window (extended from the default).
3. A supermajority vote (`ceil(2/3 × effective committee)`).
4. A 14-day timelock during which a community petition can trigger a
   binding referendum (§4.3).
5. Passage of any triggered referendum at strict-greater majority with
   `petitionMinTurnoutBps` turnout.
6. Publication of the amended document with a new version number, an
   ISO-8601 effective date, and a content hash.

**§ 7.3 Forks.** A deployment that wishes to deviate from this
Constitution may do so freely under MIT, but it must not represent
itself as "0xdx-compliant" unless it ratifies this document or replaces
it with one that satisfies §7.1 protections. There is no central
authority that grants compliance; the term is descriptive, not licensed.

---

## Article 8. Legal and Regulatory Posture

**§ 8.1 Stance.** Self-governance is an exercise of association that
predates and outranks any regulatory regime. The 0xdx framework does
not concede that incumbent financial regulators hold moral authority
over communities that govern their own resources without rent-seeking
intermediaries. Article 8 documents the practical risks honestly so
participants can choose their posture; it does not endorse the
legitimacy of those risks.

**§ 8.2 What the framework is, in legal terms.** The 0xdx framework
is open-source software and a written specification. It is not itself
a legal entity, a financial institution, or a registered service
provider. It does not custody funds, intermediate trades, or hold
itself out as an exchange. The publishers of this specification are
not party to any deployment.

**§ 8.3 Deployer choice, not deployer obligation.** A party that
deploys 0xdx may choose to adopt a legal wrapper (Wyoming DAO LLC,
Wyoming DUNA, Marshall Islands DAO LLC, Cayman Foundation, Swiss
Verein, BVI Foundation) or to operate without one. The framework
treats both as legitimate political choices with different trade-offs;
see `LEGAL.md` §4. Engagement with formal-economy infrastructure
(banks, fiat ramps, U.S.-located committee members) tends to push
toward a wrapper; pseudonymous and geographically distributed
deployments may legitimately decline. Choosing not to incorporate is
not irresponsible. It is a posture, and one with deep precedent in
the history of decentralization.

**§ 8.4 The Ooki DAO precedent, named honestly.** In *CFTC v. Ooki
DAO* (N.D. Cal. 2022–2023), a U.S. court, on a default judgment
where the DAO did not appear, accepted the theory that an
unincorporated DAO may be sued as an unincorporated association and
that governance participants may face personal joint and several
liability. This precedent is real and it is hostile. The framework
does not concede that this exposure is morally legitimate; it
documents the exposure so participants can decide how, where, and how
publicly to operate. Mitigations include legal wrappers, geographic
distribution, pseudonymity, and principled non-engagement with the
U.S. system. See `LEGAL.md` §3 for the full discussion.

**§ 8.5 Identity is not KYC.** The Article 6 / `IDENTITY.md` Sybil-
resistance interface is privacy-preserving by design. A deployment
that performs general KYC on governance participants is **not**
0xdx-compliant. Where a specific regulated surface (e.g. a fiat
on-ramp) demands KYC under a deployment's chosen jurisdiction, that
KYC must be narrow, surface-specific, and disclosed; never
backdoored into governance.

**§ 8.6 No representation as advice.** This document is not legal,
financial, tax, or regulatory advice and creates no professional
relationship. Deployers and participants should obtain qualified
counsel in jurisdictions they choose to engage with, and should
decide for themselves which jurisdictions those are.

---

*Issued under the MIT License. The canonical source of this document
is the file `CONSTITUTION.md` at the head of the 0xdx repository.
Revisions are tracked in the git history; the publication date above
is the authoritative timestamp for attribution.*
