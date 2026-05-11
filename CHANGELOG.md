# Changelog

All notable changes to the 0xdx specification and website are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Specification changes use `[spec]`. Website/tooling changes use `[site]`.

## [1.0.0] — 2026-05-09

### Added

**[spec]** Initial public release of the 0xdx governance framework specification.

- `0xdx_litepaper.md`: eleven-section litepaper covering governance architecture, proposal lifecycle, treasury and DEX model, security safeguards, identity and Sybil resistance, oversight mechanisms, and use cases.
- `CONSTITUTION.md`: values, rights, role definitions, decision-making rules, treasury invariants, and the amendment process. Compliance baseline for any 0xdx deployment.
- `IDENTITY.md`: pluggable identity and Sybil-resistance interface, minimum provider requirements, and a reference design using client-encrypted biometrics with zero-knowledge attestation.
- `LEGAL.md`: legal and regulatory posture covering Ooki DAO precedent, securities/commodity/MiCA analysis, and recommended legal wrapper options.
- `docs/FLOWS.md`: actor map, genesis flow, proposal lifecycle, state machine, treasury and DEX flows, override paths, elections, modular-config matrix, and canonical threat model (§9: 40+ edge cases).
- `simulations/`: deterministic simulation harness with 28 scenarios validating v1 defaults. Run with `npm run sim`.

**[site]** Public website at [0xdx.com](https://0xdx.com).

- Landing page with governance overview, use cases, comparison matrix, and full litepaper viewer.
- `llms.txt` and `llms-full.txt` for LLM crawler discoverability.
- `sitemap.xml`, structured JSON-LD schema, `CITATION.cff` for academic citation.

---

*Prior to v1.0.0, the framework was developed in a private working draft. No public changelog exists for that period.*
