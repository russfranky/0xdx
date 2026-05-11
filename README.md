<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./public/banner.png" width="480">
  <img alt="0xdx" src="./public/logo.png" width="120">
</picture>

<br/>
<br/>

**A self-operating, committee-driven DAO governance framework.**

[![Spec](https://img.shields.io/badge/spec-v1.0-black?style=flat-square)](./0xdx_litepaper.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-black?style=flat-square)](./LICENSE)
[![Build](https://img.shields.io/github/actions/workflow/status/russfranky/0xdx/deploy.yml?branch=main&style=flat-square&color=black&label=build)](https://github.com/russfranky/0xdx/actions/workflows/deploy.yml)
[![CITATION.cff](https://img.shields.io/badge/citation-CITATION.cff-black?style=flat-square)](./CITATION.cff)
[![Discussions](https://img.shields.io/github/discussions/russfranky/0xdx?style=flat-square&color=black)](https://github.com/russfranky/0xdx/discussions)
[![Last commit](https://img.shields.io/github/last-commit/russfranky/0xdx?style=flat-square&color=black)](https://github.com/russfranky/0xdx/commits/main)

[**Website**](https://0xdx.com) · [**Litepaper**](./0xdx_litepaper.md) · [**Discussions**](https://github.com/russfranky/0xdx/discussions) · [**Cite this work**](./CITATION.cff)

</div>

---

0xdx blends structured human governance with trustless automation: a small elected committee makes decisions one-person-one-vote, smart contracts auto-execute the outcomes, and a built-in DEX funds the treasury so the DAO runs perpetually without external fundraising.

| | |
|---|---|
| **Committee governance** | Small elected body, one-person-one-vote, term limits, quorum rules |
| **Trustless execution** | Smart contracts auto-execute passed proposals — no human in the loop |
| **Self-funded treasury** | Built-in DEX generates protocol fees; no external fundraising required |
| **Sybil resistance** | Pluggable identity layer with ZK-attestation reference design |

---

## Specification

The framework is published as four canonical documents:

| Document | Purpose |
|---|---|
| [`0xdx_litepaper.md`](./0xdx_litepaper.md) | Core litepaper. Eleven sections covering governance architecture, proposal lifecycle, treasury system, security & safeguards, oversight, and use cases. |
| [`CONSTITUTION.md`](./CONSTITUTION.md) | Values, rights, role definitions, decision-making rules, treasury invariants, and the amendment process. Anything calling itself "0xdx-compliant" must satisfy this. |
| [`IDENTITY.md`](./IDENTITY.md) | The pluggable identity / Sybil-resistance interface, minimum requirements for any accepted provider, and a reference design based on client-encrypted biometrics with zero-knowledge attestation. |
| [`LEGAL.md`](./LEGAL.md) | Legal and regulatory posture. Ooki DAO precedent, securities/commodity/MiCA notes, recommended legal wrappers. **Read before deploying.** |

Supporting documents:

| Document | Purpose |
|---|---|
| [`docs/FLOWS.md`](./docs/FLOWS.md) | Actor map, genesis flow, proposal lifecycle, state machine, treasury & DEX flows, override paths, elections, modular-config matrix, and the **canonical threat model** (§9: 40+ edge cases tagged Specified / Inferred / Gap / Simulated). |
| [`simulations/SIMULATIONS.md`](./simulations/SIMULATIONS.md) | 28 runnable deterministic scenarios validating v1 defaults (`npm run sim`). |

---

## Run the website locally

```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build → dist/
npm run sim      # run the simulation suite
npm run preview  # preview the production build
```

Stack: Vite 6, React 18, TypeScript (strict), Tailwind 4, Framer Motion, react-markdown, lucide-react.

---

## Deploy

Two hosting paths — pick one.

**Cloudflare Pages (preferred).** Workers & Pages → Create → connect Git → pick this repo → framework preset Vite → build command `npm run build` → output directory `dist` → environment variable `NODE_VERSION=22`. Add `0xdx.com` as a custom domain. The `public/_redirects` file handles the SPA fallback.

**GitHub Pages.** Repo Settings → Pages → Source = "GitHub Actions". Add repo variable `GH_PAGES_AUTODEPLOY=true` (Settings → Secrets and variables → Actions → Variables). The workflow at `.github/workflows/deploy.yml` handles builds and deploys. To deploy once without enabling auto-deploy, run the workflow manually from the Actions tab.

The build job runs on every push regardless of which hosting path is active — CI always passes.

---

<details>
<summary><strong>Project layout</strong></summary>

```
.
├── 0xdx_litepaper.md         # canonical framework litepaper (v1.0)
├── CONSTITUTION.md           # governance constitution
├── IDENTITY.md               # Sybil-resistance interface spec
├── LEGAL.md                  # legal & regulatory posture
├── CHANGELOG.md              # release history
├── CITATION.cff              # academic citation metadata
├── docs/
│   └── FLOWS.md              # flows, state machine, threat model
├── simulations/
│   └── SIMULATIONS.md        # 28 deterministic scenarios
├── public/                   # static assets (logo, banner, OG image)
├── src/
│   ├── main.tsx              # entry point
│   ├── app/                  # App + page sections
│   │   └── components/       # Hero, Litepaper, Governance, etc.
│   └── styles/               # Tailwind + theme
├── .github/
│   ├── workflows/deploy.yml  # CI + GitHub Pages deploy
│   ├── ISSUE_TEMPLATE/       # bug report + spec amendment forms
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── dependabot.yml
│   └── FUNDING.yml
├── index.html
├── package.json
└── vite.config.ts
```

</details>

---

## Status

v1.0 specification is published. Next milestones: reference contracts, formal audit, testnet, mainnet launch.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Bug reports and spec amendment proposals are welcome via [GitHub Issues](https://github.com/russfranky/0xdx/issues) using the provided templates. General discussion in [GitHub Discussions](https://github.com/russfranky/0xdx/discussions).

## License

MIT — see [LICENSE](./LICENSE). Third-party credits in [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).
