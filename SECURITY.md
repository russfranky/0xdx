# Security Policy

## Scope

This policy covers:

- The 0xdx.com website and its build pipeline
- The specification documents (`0xdx_litepaper.md`, `CONSTITUTION.md`, `IDENTITY.md`, `LEGAL.md`, `docs/FLOWS.md`) — integrity issues such as unauthorized modification or content injection
- The simulation harness (`simulations/`)

The 0xdx framework specification describes a governance system but does not itself ship on-chain contracts. When reference contracts are published, a separate security policy and audit trail will accompany them.

## Reporting a vulnerability

**Do not open a public GitHub issue for security vulnerabilities.**

Report privately using [GitHub Private Security Advisories](https://github.com/russfranky/0xdx/security/advisories/new). This opens an encrypted channel with maintainers and allows coordinated disclosure.

Include:

- A description of the vulnerability and its potential impact
- Steps to reproduce or a proof of concept
- Any suggested mitigations if you have them

## Response timeline

| Stage | Target |
|---|---|
| Initial acknowledgment | 48 hours |
| Triage and severity assessment | 5 business days |
| Fix or mitigation | Depends on severity — critical issues within 7 days |
| Public disclosure | Coordinated with reporter after fix is deployed |

## Out of scope

- Theoretical attacks with no practical exploit path
- Issues requiring physical access to maintainer infrastructure
- Social engineering attacks against maintainers
- Vulnerabilities in third-party dependencies (report those upstream; open a public issue here to track the dependency update)

## Preferred language

English.
