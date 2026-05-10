# Identity and Sybil Resistance in 0xdx

> **Version 1.0** · Effective **2026-05-09** (UTC) · Released under the MIT License.
> Companion document to `CONSTITUTION.md` Article 6. Specifies the
> framework's pluggable identity interface and a recommended reference
> design based on client-encrypted biometrics with zero-knowledge
> attestation.

---

## 1. Why this exists

0xdx is a one-person-one-vote committee framework. It cannot deliver on
that promise without a real answer to **Sybil resistance**: the open
problem of preventing a single human from presenting as many.

Previous DAO frameworks have approached this in three ways, all of
which we reject as primary mechanisms:

1. **Token weighting.** Solves Sybil mathematically (you cannot duplicate
   tokens) but at the cost of the very plutocracy 0xdx exists to prevent.
2. **KYC by central provider.** Moves trust from the chain to a
   compliance vendor, breaks pseudonymity, leaks PII, and introduces a
   single regulatory chokepoint.
3. **Punting to "community vetting".** Passes the problem to deployers
   without giving them tools, which in practice means either nothing
   gets verified or unaccountable insiders decide who counts.

The 0xdx posture is different. Identity is **necessary** for
one-person-one-vote, and the framework specifies a **pluggable
interface**: strict enough to keep deployments honest, loose enough
that no single vendor can hold the ecosystem hostage.

---

## 2. The interface, in one paragraph

A **0xdx Identity Provider** is any system that, on demand, issues a
participant a credential and accepts a zero-knowledge proof that a
given on-chain action (proposal submission, petition signature,
referendum vote, election ballot) is being performed by a unique
verified human associated with that credential, without revealing
*which* human.

The on-chain artifact is the proof. The credential never touches the
chain. The raw identity material (biometric template, document scan,
social graph) never leaves the participant's device.

---

## 3. Minimum requirements (binding)

Any provider that a 0xdx-compliant deployment accepts **must** satisfy
all six of the following. These are restated from `CONSTITUTION.md`
§6.3 with implementation detail.

### 3.1 Uniqueness

Each natural person can hold **at most one** active credential per
provider, with a published Sybil-error budget. The provider's design
documentation must state its expected uniqueness rate (e.g. "≤ 0.5%
duplicate credentials under adversarial conditions") and the
mechanism by which it achieves that rate.

### 3.2 Privacy preservation

The deployment, the committee, the chain, public indexers, and any
non-self party **must not** be able to recover from the on-chain
artifact:

- the participant's biometric template;
- their government-issued identifier;
- their persistent off-chain identity;
- a stable identifier that links their actions across deployments.

A nullifier or one-time-use commitment is acceptable; a persistent
public key tied to identity is not.

### 3.3 Zero-knowledge attestation

The on-chain proof must use a zero-knowledge protocol (Groth16, PLONK,
STARK, or equivalent) with:

- a **public input** including the proposal hash or vote target
  (binds the proof to a specific governance act);
- a **public output** including a one-time nullifier (prevents reuse);
- a **hidden witness** including the credential and any biometric or
  document material.

The verification key and circuit source must be public.

### 3.4 Revocability

The provider must support credential revocation under documented Sybil
incidents (e.g. a single template being shown to belong to multiple
people). Revocation **must not** retroactively invalidate honest past
votes. Past nullifiers remain valid; only future proofs from the
revoked credential fail verification.

### 3.5 Open verifiability

- Circuits: open-source under a permissive license (MIT, Apache-2.0,
  or compatible).
- Trusted-setup ceremony (if applicable): public, multi-party,
  reproducible.
- Verifier contract: published source, deployed bytecode-verified.

A provider whose verification logic is opaque is not eligible.

### 3.6 No phone-home

The verification path must not require the deployment, the user, or
any contract on the critical path to call out to a vendor-controlled
server during governance actions. Credentials may be **issued** by a
vendor server (one-time, off-line); proofs are **verified** purely
on-chain or in a fully replicated client.

---

## 4. Reference design: encrypted-biometric ZK identity

This is the framework's recommended reference implementation. A
deployment is free to use this design directly, replace it with an
existing provider that satisfies §3, or commission its own. The
reference design exists so that "build your own" is a real option,
not a paywall.

### 4.1 Architecture (one screen)

```
        ┌──────────────────────────────────────────────────────┐
        │                  USER'S OWN DEVICE                   │
        │                                                      │
        │   1. Capture biometric (face/fingerprint/iris)       │
        │   2. Compute template T locally                      │
        │   3. Encrypt template:  E = enc_k(T) , k held by user│
        │   4. Store E + k in secure local enclave             │
        │                                                      │
        └─────────────────┬────────────────────────────────────┘
                          │  one-time enrolment
                          ▼
        ┌──────────────────────────────────────────────────────┐
        │           ENROLMENT SERVICE (one-time)               │
        │                                                      │
        │   - Receives only the deduplication digest D = H(T)  │
        │     (or a fuzzy-hash equivalent)                     │
        │   - Checks D against existing digest set             │
        │   - If unique: issues a signed credential C          │
        │     C = sig_provider( D, issued_at, expiry )         │
        │   - Stores ONLY (D, issued_at, revocation_status)    │
        │                                                      │
        └─────────────────┬────────────────────────────────────┘
                          │  credential C returned to user
                          ▼
        ┌──────────────────────────────────────────────────────┐
        │                  USER'S OWN DEVICE                   │
        │                                                      │
        │   For each governance action (vote, petition):       │
        │   - Generate ZK proof π that:                        │
        │       * I hold a valid credential C                  │
        │       * C has not been revoked                       │
        │       * Nullifier N = H(C, action_hash) is fresh     │
        │       * The biometric in E hashes to D               │
        │     without revealing C, T, or D                     │
        │   - Submit (action, π, N) to the deployment contract │
        │                                                      │
        └──────────────────────────────────────────────────────┘
```

### 4.2 What is on-chain, what is not

| Where | What |
|---|---|
| **On-chain** (deployment contract) | nullifier set, the provider's public verification key, revocation Merkle root, the verifier circuit |
| **Off-chain, controlled by user** | encrypted biometric template `E`, decryption key `k`, signed credential `C` |
| **Off-chain, controlled by enrolment service** | deduplication digests `D` and revocation flags; **never** raw biometrics |
| **Nowhere** (deleted at capture) | the raw biometric reading |

### 4.3 Why the digest, not the template

Storing even encrypted biometric templates in a central database is a
liability magnet: it invites breach, subpoena, and regulatory
classification as a biometric data controller (GDPR Article 9, Illinois
BIPA, etc.). The reference design pushes that data **back to the
user's device** and keeps only a hash-like deduplication digest at the
enrolment service.

A fuzzy digest (e.g. locality-sensitive hashing of an iris template)
is required when the biometric modality is noisy. The digest's
collision properties dictate the uniqueness rate in §3.1.

### 4.4 Why a credential, not a wallet binding

Tying a credential to a fixed wallet address breaks pseudonymity
across deployments and creates a re-identification vector. The
credential is wallet-agnostic; the participant proves possession at
the moment of voting and may use any wallet.

### 4.5 Trusted setup and ceremony

A SNARK-based circuit will require a trusted setup. The reference
design specifies a public, multi-party, multi-round ceremony
following the Powers-of-Tau model. A STARK alternative is provided
to deployments that prefer transparent setup at the cost of larger
proofs.

---

## 5. Non-reference providers a deployment may accept

This is a non-exhaustive snapshot at the time of writing
(2026). Deployments are responsible for verifying current status
against §3 before adoption.

| Provider | Mechanism | §3 compliance notes |
|---|---|---|
| **World ID** | Iris scan via Orb hardware; ZK proof | Strong on uniqueness and ZK; some EU jurisdictions restrict the Orb; deployment must surface that geographic limitation |
| **Human Passport** (formerly Gitcoin Passport) | Stamp aggregation with ML scoring | Useful as a *secondary* signal; alone, fails §3.1 against motivated attackers |
| **BrightID** | Decentralized social graph | Satisfies §3.5 (open) but uniqueness depends on graph density |
| **Proof of Humanity** | Video + social vouching | Strong uniqueness; weaker on §3.2 (video is identifying) |
| **Idena** | Synchronous CAPTCHA validations | Satisfies §3.1, §3.5; small user base |
| **Anon Aadhaar** (regional) | ZK-attested government ID | Satisfies §3.2, §3.3; jurisdictionally narrow |

A deployment may accept multiple providers and require an OR-of-proofs
("any one of these"), an AND-of-proofs ("at least two of these"), or a
weighted scheme, provided each accepted provider individually
satisfies §3.

---

## 6. Anti-patterns explicitly forbidden

A deployment claiming 0xdx compliance **must not**:

1. Store raw biometric templates server-side under any circumstance.
2. Bind identity credentials to a fixed wallet address in a way that
   creates a persistent public re-identification vector.
3. Accept a provider whose verifier or circuit is closed-source.
4. Make verification require a live call to a vendor server during a
   governance action.
5. Use the identity system to gate **economic exit**. A participant
   must always be able to sell their position on the integrated DEX
   without identity verification.

The last point is the most important. Identity gates *governance
participation*, never *economic exit*. A participant who loses access
to their credential loses their vote, not their funds.

---

## 7. Open questions and acknowledged limits

This is v1. The framework explicitly acknowledges:

- **Coercion attacks.** A ZK proof system does not prevent a
  participant from being physically coerced into voting a specific
  way. Receipt-freeness is an active research area (Civitas, MACI);
  v1 does not solve it.
- **Hardware compromise.** A compromised user device can leak
  credentials. The reference design relies on platform-level secure
  enclaves where available.
- **Long-term key management.** Lost credentials must be recoverable
  without breaking uniqueness; v1 specifies a guardian-based recovery
  pattern but expects deployments to refine it.
- **Cross-deployment reuse.** Whether a single credential should grant
  participation in *every* 0xdx deployment, or only one at a time, is
  a deployment-level policy choice. The framework supports both.

---

## 8. Summary

0xdx commits to one-person-one-vote and refuses to outsource that
commitment to either token-weighted plutocracy or a single closed
identity vendor. The framework specifies a strict, vendor-neutral
interface (§3) and a reference design (§4) that keeps biometric data
on the user's device and uses zero-knowledge proofs as the on-chain
artifact. A deployment that satisfies the §3 minimum requirements is
0xdx-compliant for identity; one that does not is not.

*Issued under the MIT License. The canonical source of this document
is the file `IDENTITY.md` at the head of the 0xdx repository.*
