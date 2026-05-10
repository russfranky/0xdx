# Legal and Regulatory Posture

> **Version 1.0** · Effective **2026-05-09** (UTC) · Released under the MIT License.
> Companion document to `CONSTITUTION.md` Article 8. **This is not legal
> advice.** It describes the political and regulatory environment that
> 0xdx-compliant deployments operate in, and the framework's posture
> toward it. The framework does not concede that incumbent regulatory
> regimes hold moral authority over decentralized self-governance; it
> documents the practical risks honestly so participants can make
> informed choices.

---

## 1. Stance

0xdx is a framework for **democratic decentralization** — communities
governing their own resources without rent-seeking intermediaries,
without token-weighted plutocracy, and without permission from
incumbent finance. Self-governance is not an activity for which
permission is granted; it is an exercise of association that predates
and outranks any regulatory regime.

That said, the framework operates in a world where states, regulators,
and incumbent platforms have at times responded to decentralized
projects with hostility — particularly when those projects threaten
existing rent streams. This document names those risks honestly so
deployers and participants can decide how, where, and how publicly to
operate.

---

## 2. What 0xdx is, in legal terms

The 0xdx framework is **open-source software and a written
specification**. It is published under the MIT License. It is not:

- a legal entity, partnership, association, foundation, or corporation;
- a financial institution, broker, dealer, exchange, or money services
  business;
- a registered investment advisor or commodity trading advisor;
- the operator of any deployed instance of the framework.

The publishers of this specification do not custody funds, route
trades, or hold themselves out as a service provider to any deployment.

A **deployment** is a separate organization that has chosen to use
the framework. The deployment — not the framework — bears whatever
legal, regulatory, and tax consequences attach to its activity. **The
framework's publishers are not party to any deployment.**

---

## 3. The Ooki DAO precedent (read this before deploying publicly)

In *CFTC v. Ooki DAO* (N.D. Cal. 2022–2023), the U.S. Commodity Futures
Trading Commission obtained a default judgment against an
unincorporated DAO. The court accepted that:

1. an unincorporated DAO can be treated as an unincorporated
   association and sued as one;
2. service can be effected by online means (a chat box, a forum post);
3. members participating in governance may, under the CFTC's theory,
   bear personal joint and several liability for the association's
   conduct.

This precedent is real, and it is hostile. It was made possible by a
default judgment — Ooki DAO did not appear to defend itself — and the
underlying theory has not been adversarially tested. But until it is
overturned or distinguished, U.S. authorities will reach for it.

**What this means in practice:**

- A 0xdx deployment that operates publicly in U.S. jurisdiction
  without some form of defensive structure exposes its committee
  members, voters, and active community members to attempted
  personal-liability actions.
- The framework does not concede that this exposure is morally
  legitimate. It documents the exposure so participants can choose
  their posture: a legal wrapper, geographic distribution,
  pseudonymity, or principled non-engagement with the U.S. system.

References:
- CFTC v. Ooki DAO, No. 3:22-cv-05416 (N.D. Cal.).
- CFTC press release, June 8 2023.

---

## 4. Defensive structures (not endorsements)

A deployment that wishes to engage with formal-economy infrastructure
(banks, fiat on-ramps, U.S.-located committee members, U.S. employees)
will need a legal wrapper. The options below are listed for reference;
the framework does not endorse any of them, and adopting one is a
political choice with trade-offs.

| Wrapper | Trade-off |
|---|---|
| **Wyoming DAO LLC / DUNA** | U.S. recognition; submits to U.S. jurisdiction; mandatory dissolution after 1 year of inactivity. |
| **Marshall Islands DAO LLC** | Recognized DAO entity; small jurisdiction with limited enforcement reach. |
| **Cayman Foundation Company** | Ownerless; useful for protocols; signals "institutional" to incumbents. |
| **Swiss Verein** | Member-association model; commonly used by large foundations; Swiss legal exposure. |
| **No wrapper** | Maximum sovereignty; exposes participants to Ooki-style theories where they touch hostile jurisdictions; reasonable for deployments that operate pseudonymously and avoid those touchpoints. |

The fifth option is included not as a fallback but as a legitimate
political choice. Many of the most important moments in the history
of decentralization have happened outside formal legal structures.
Choosing not to incorporate is not irresponsible; it is a posture.
Participants who choose it should understand what they are accepting.

---

## 5. Securities-law posture

The 0xdx framework **does not include a native governance token** by
design. Committee membership is not a financial instrument. Petition
and voting rights are not securities. The framework's structure
therefore does not, in itself, create the kind of investment-contract
profile that has been the basis of token-DAO enforcement actions.

A deployment may issue a token (e.g. a base asset traded on its
integrated DEX). Whether that token is a security is a downstream
question that depends on how the deployment markets, distributes, and
uses it. The framework expresses no view on which side of that line
any given token sits — the question is increasingly used by U.S.
regulators as a tool of selective enforcement, and the framework does
not pretend to predict which way that selection will go.

---

## 6. Commodity-law posture (CFTC)

The CFTC has asserted jurisdiction over crypto spot markets through
anti-fraud authority and over leveraged retail products through
registration requirements. Deployments that route U.S. retail
leverage through their integrated DEX face the largest exposure;
deployments that limit themselves to spot trading by non-U.S.
participants face less.

Geofencing, wallet-level filtering, and choice of front-end host are
all standard mitigations. None of them is bulletproof, but each
reduces the surface that hostile authorities can reach.

---

## 7. EU posture (MiCA)

The EU's *Markets in Crypto-Assets Regulation* (Regulation (EU)
2023/1114, in force December 2024) creates a Crypto-Asset Service
Provider regime with authorization, AML, and operational requirements.
MiCA contains a carve-out for "fully decentralized" services without
intermediaries. A committee-driven governance structure with elected
human members **may or may not** qualify, depending on how
"intermediary" is interpreted by the European Securities and Markets
Authority and by national regulators.

Deployments engaging EU users face a choice: submit to CASP
authorization (expensive, slow, and arguably defeats the point of
decentralization), structure to maximize the carve-out's
applicability, or geofence EU users entirely. Each posture has costs.

---

## 8. KYC and identity

`IDENTITY.md` specifies a privacy-preserving Sybil-resistance
interface. **It is not a KYC system, and the framework does not
recommend bolting KYC on top of it.** Doing so would defeat the
privacy properties the identity layer is engineered to provide.

A deployment that engages in genuinely regulated activity — fiat
on/off-ramps, custodial services for non-self-custody clients,
regulated derivatives — may be required by its chosen jurisdiction
to add KYC at a specific surface (typically the on-ramp). That
addition should be (a) narrow, (b) confined to the regulated surface,
and (c) explicitly disclosed. A deployment that performs general
KYC on all governance participants is not 0xdx-compliant and should
not call itself such.

The identity layer's privacy properties are part of the mission, not
a convenience.

---

## 9. Sanctions

The framework publishers do not maintain a sanctions list and do not
require deployments to. Whether a deployment chooses to filter
sanctioned addresses (typically at the front-end, the identity
provider, or the DEX router) is a political and operational choice.
Deployments that engage formal-economy infrastructure in sanctions-
enforcing jurisdictions will face pressure to filter; deployments
operating outside that infrastructure may legitimately decline.

This is one of the cleanest examples of "the regulatory regime is not
neutral." Sanctions enforcement is a tool of state power that
deployments are entitled to take seriously, take symbolically, or
decline — with eyes open to the consequences.

---

## 10. Tax

Tax treatment of governance participation, treasury distributions,
proposal deposits, slashed deposits, and DEX fee revenue varies by
jurisdiction and by participant. Deployers and participants should
obtain qualified tax counsel **if they choose to engage formal-economy
tax authorities at all.**

---

## 11. Disclaimer (formal)

THE 0XDX FRAMEWORK IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN
CONNECTION WITH THE FRAMEWORK OR THE USE OR OTHER DEALINGS IN THE
FRAMEWORK.

This document is informational. **It is not legal advice and creates
no attorney-client relationship.** Participants should obtain
qualified counsel in jurisdictions they engage with — and should
decide for themselves which jurisdictions those are.

---

*Issued under the MIT License. The canonical source of this document
is the file `LEGAL.md` at the head of the 0xdx repository.*
