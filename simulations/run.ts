import { ALL_SCENARIOS } from './scenarios.js';

const findings = ALL_SCENARIOS.map((fn) => fn());

const passes = findings.filter((f) => f.status === 'PASS').length;
const fails = findings.filter((f) => f.status === 'FAIL').length;
const info = findings.filter((f) => f.status === 'INFO').length;

console.log(`\n=== 0xdx Simulation Run ===`);
console.log(`Scenarios: ${findings.length}  |  PASS: ${passes}  FAIL: ${fails}  INFO: ${info}\n`);

for (const f of findings) {
  const tag =
    f.status === 'PASS' ? '✅ PASS' : f.status === 'FAIL' ? '❌ FAIL' : 'ℹ️  INFO';
  console.log(`${tag}  [${f.id}] ${f.title}`);
  console.log(`    ${f.summary}`);
  console.log(`    → ${f.recommendation}\n`);
}

const verbose = process.argv.includes('--verbose');
if (verbose) {
  console.log(`\n=== TRACES ===\n`);
  for (const f of findings) {
    console.log(`\n--- [${f.id}] ${f.title} ---`);
    console.log(f.trace);
  }
}

process.exit(fails > 0 ? 1 : 0);
