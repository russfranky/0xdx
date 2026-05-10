#!/usr/bin/env node
// Concatenate the four canonical specification documents plus the
// flows/threat-model and simulations supporting docs into a single
// LLM-friendly text file, written to public/llms-full.txt.
// Run as part of `npm run build`; output is also checked into the repo
// for easy browsing.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, '..');

const sections = [
  { path: '0xdx_litepaper.md', title: 'Litepaper' },
  { path: 'CONSTITUTION.md', title: 'Constitution' },
  { path: 'IDENTITY.md', title: 'Identity and Sybil Resistance' },
  { path: 'LEGAL.md', title: 'Legal and Regulatory Posture' },
  { path: 'docs/FLOWS.md', title: 'Flows, Actors, and Threat Model' },
  { path: 'simulations/SIMULATIONS.md', title: 'Simulations' },
];

// No timestamp in the output: the file is checked into the repo and a
// changing timestamp on every build would create noisy diffs. The
// canonical timestamp is the most recent commit that touched any of
// the source documents, which git already tracks.

const header = `# 0xdx: full specification (concatenated)

Source: https://github.com/russfranky/0xdx
License: MIT

This file concatenates the canonical 0xdx specification documents in a
single LLM-readable text file. Each section below is delimited by a
horizontal rule and a heading naming its source path.

`;

const body = sections
  .map(({ path, title }) => {
    const content = readFileSync(resolve(repoRoot, path), 'utf8');
    return [
      '\n================================================================',
      `# ${title}`,
      `Source: \`${path}\``,
      '================================================================\n',
      content.trim(),
      '',
    ].join('\n');
  })
  .join('\n');

const out = resolve(repoRoot, 'public', 'llms-full.txt');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, header + body, 'utf8');

console.log(`wrote ${out} (${(header.length + body.length).toLocaleString()} bytes)`);
