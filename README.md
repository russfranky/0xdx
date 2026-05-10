# 0xdx

> A self-operating, committee-driven DAO governance framework.

0xdx blends structured human governance with trustless automation: a small
elected committee makes decisions one-person-one-vote, smart contracts
auto-execute the outcomes, and a built-in DEX funds the treasury so the DAO
runs perpetually without external fundraising.

This repository contains the public litepaper and the marketing/governance
website.

## Read the framework

The framework specification is published as four canonical documents:

| Document | Purpose |
|---|---|
| [`0xdx_litepaper.md`](./0xdx_litepaper.md) | The litepaper. Eleven sections covering governance architecture, proposal lifecycle, treasury system, security & safeguards, oversight, and use cases. |
| [`CONSTITUTION.md`](./CONSTITUTION.md) | Values, rights, role definitions, decision-making rules, treasury invariants, and the amendment process. Anything calling itself "0xdx-compliant" must satisfy this. |
| [`IDENTITY.md`](./IDENTITY.md) | The pluggable identity / Sybil-resistance interface, minimum requirements for any accepted provider, and a reference design based on client-encrypted biometrics with zero-knowledge attestation. |
| [`LEGAL.md`](./LEGAL.md) | Legal and regulatory posture. Ooki DAO precedent, securities/commodity/MiCA notes, recommended legal wrappers. **Read before deploying.** |

Supporting documents:

- [`docs/FLOWS.md`](./docs/FLOWS.md) — actor map, genesis flow, proposal
  lifecycle, state machine, treasury & DEX flows, override paths,
  elections, modular-config matrix, and the **canonical threat model**
  (§9: 40+ edge cases tagged Specified / Inferred / Gap / Simulated).
- [`simulations/SIMULATIONS.md`](./simulations/SIMULATIONS.md) — runnable
  deterministic simulations validating v1 defaults (28 scenarios,
  `npm run sim`).

## Run the website locally

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

Stack: Vite 6, React 18, TypeScript (strict), Tailwind 4, motion (Framer
Motion), react-markdown, lucide-react.

## Project layout

```
.
├── 0xdx_litepaper.md         # canonical framework litepaper (v1.0)
├── public/                   # static assets (logos, mockups)
├── src/
│   ├── main.tsx              # entry
│   ├── app/                  # App + page sections
│   │   └── components/       # Hero, Litepaper, Governance*, Project*, etc.
│   └── styles/               # Tailwind + theme
├── index.html
├── package.json
├── vite.config.ts
└── ATTRIBUTIONS.md           # third-party credits (shadcn/ui, Unsplash)
```

## License

MIT — see [LICENSE](./LICENSE).

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for third-party credits.

## Status

Pre-launch. The framework is published as a v1.0 specification draft. The
reference contracts, audits, testnet, and mainnet launch are still ahead.
