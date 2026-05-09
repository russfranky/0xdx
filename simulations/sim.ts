// Deterministic discrete-event simulator for the 0xdx governance framework.
// No randomness, no external state. Every scenario produces a stable trace.

export type Address = string;
export type Bps = number; // 0..10000

export interface Config {
  committeeSize: number;
  cycleLength: number;                 // seconds in one governance cycle
  votingWindowLength: number;          // seconds at the end of the cycle
  submissionCutoffBeforeVote: number;  // seconds before vote opens, no new submissions
  quorumMembers: number;               // minimum committee voters for quorum
  majority: 'simple' | 'super';        // simple = >50%, super = >=2/3
  timelock: number;                    // seconds before a passed proposal executes
  proposalDeposit: bigint;             // in base-asset units
  depositSlashBpsOnWithdraw: number;   // 0..10000
  petitionThresholdBps: Bps;           // % of supply (in bps) to force referendum
  petitionMinTurnoutBps: Bps;          // % of supply that must vote in referendum to bind
  guardianEnabled: boolean;
  guardianSize: number;
  guardianQuorum: number;              // signatures required for veto
  guardianVetoBudgetPerTerm: number;
  termLength: number;
  totalSupply: bigint;                 // token total supply
  signalLockUntilResolved: boolean;    // lock-on-stake to prevent flash loans
  authorRecusalRequired: boolean;      // self-affecting proposals
  electionFallback: 'leave-vacant' | 'special-election';
  proposalDepositAsset: 'base' | 'native';
}

export const DEFAULT_CONFIG: Config = {
  committeeSize: 7,
  cycleLength: 30 * 86400,
  votingWindowLength: 5 * 86400,
  submissionCutoffBeforeVote: 86400,
  quorumMembers: 5,
  majority: 'simple',
  timelock: 48 * 3600,
  proposalDeposit: 1000n,
  depositSlashBpsOnWithdraw: 2000,
  petitionThresholdBps: 1000,
  petitionMinTurnoutBps: 2000,
  guardianEnabled: false,
  guardianSize: 0,
  guardianQuorum: 0,
  guardianVetoBudgetPerTerm: 1,
  termLength: 365 * 86400,
  totalSupply: 1_000_000n,
  signalLockUntilResolved: true,
  authorRecusalRequired: true,
  electionFallback: 'special-election',
  proposalDepositAsset: 'base',
};

export type ProposalStatus =
  | 'submitted'
  | 'signaling'
  | 'in-vote'
  | 'rejected-quorum'
  | 'rejected-majority'
  | 'queued'
  | 'forced-referendum'
  | 'executed'
  | 'executed-failed'
  | 'vetoed'
  | 'withdrawn';

export type Vote = 'approve' | 'reject' | 'abstain';

export interface Proposal {
  id: number;
  author: Address;
  cycle: number;
  submittedAt: number;
  amount: bigint;
  recipient: Address;
  affectsAddress?: Address; // for self-affecting / conflict checks
  status: ProposalStatus;
  votes: Map<Address, Vote>;
  signal: { yes: bigint; no: bigint };
  signalStakers: Map<Address, { dir: 'yes' | 'no'; amount: bigint }>;
  petitionStakers: Map<Address, bigint>;
  guardianVetoes: Set<Address>;
  recusals: Set<Address>;
  queuedAt?: number;
  resolvedAt?: number;
}

export interface World {
  time: number;
  cycleStart: number;
  cycle: number;
  config: Config;
  treasuryBase: bigint;          // base-asset balance available for spend
  treasuryReserved: bigint;      // queued-but-not-executed allocation
  balances: Map<Address, bigint>; // token (signal) balances
  baseBalances: Map<Address, bigint>; // base-asset balances (for deposits)
  staked: Map<Address, bigint>;  // tokens locked in signaling
  committee: Address[];
  guardian: Address[];
  guardianVetoesUsed: number;
  proposals: Proposal[];
  events: string[];
  errors: string[];
  nextProposalId: number;
}

export function emit(w: World, msg: string) {
  w.events.push(`t=${formatTime(w.time)} | ${msg}`);
}

export function fail(w: World, msg: string) {
  w.errors.push(`t=${formatTime(w.time)} | ${msg}`);
}

function formatTime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  return `day${String(d).padStart(2, '0')}+${String(h).padStart(2, 'h0')}h`;
}

export function newWorld(overrides: Partial<Config> = {}): World {
  const config = { ...DEFAULT_CONFIG, ...overrides };
  return {
    time: 0,
    cycleStart: 0,
    cycle: 0,
    config,
    treasuryBase: 0n,
    treasuryReserved: 0n,
    balances: new Map(),
    baseBalances: new Map(),
    staked: new Map(),
    committee: [],
    guardian: [],
    guardianVetoesUsed: 0,
    proposals: [],
    events: [],
    errors: [],
    nextProposalId: 1,
  };
}

export function setBalance(w: World, addr: Address, tokens: bigint, base: bigint = 0n) {
  w.balances.set(addr, tokens);
  w.baseBalances.set(addr, base);
}

export function setCommittee(w: World, members: Address[]) {
  w.committee = [...members];
  emit(w, `committee set: ${members.join(', ')}`);
}

export function setGuardian(w: World, members: Address[]) {
  w.guardian = [...members];
  if (members.length > 0) w.config.guardianEnabled = true;
  emit(w, `guardian set: ${members.join(', ')}`);
}

export function fundTreasury(w: World, amount: bigint) {
  w.treasuryBase += amount;
  emit(w, `treasury funded with ${amount}`);
}

// --- Time advancement ---

export function advance(w: World, seconds: number) {
  w.time += seconds;
}

export function votingOpensAt(w: World): number {
  return w.cycleStart + w.config.cycleLength - w.config.votingWindowLength;
}

export function submissionCutoffAt(w: World): number {
  return votingOpensAt(w) - w.config.submissionCutoffBeforeVote;
}

export function cycleEndsAt(w: World): number {
  return w.cycleStart + w.config.cycleLength;
}

// --- Submission ---

export function submit(
  w: World,
  author: Address,
  recipient: Address,
  amount: bigint,
  opts: { affectsAddress?: Address } = {},
): Proposal | null {
  if (w.time > submissionCutoffAt(w)) {
    fail(w, `submission rejected (after cutoff): author=${author}`);
    return null;
  }
  const baseBal = w.baseBalances.get(author) ?? 0n;
  if (baseBal < w.config.proposalDeposit) {
    fail(w, `submission rejected (insufficient deposit): author=${author}`);
    return null;
  }
  w.baseBalances.set(author, baseBal - w.config.proposalDeposit);
  const p: Proposal = {
    id: w.nextProposalId++,
    author,
    cycle: w.cycle,
    submittedAt: w.time,
    amount,
    recipient,
    affectsAddress: opts.affectsAddress,
    status: 'submitted',
    votes: new Map(),
    signal: { yes: 0n, no: 0n },
    signalStakers: new Map(),
    petitionStakers: new Map(),
    guardianVetoes: new Set(),
    recusals: new Set(),
  };
  w.proposals.push(p);
  emit(w, `proposal #${p.id} submitted by ${author} (${amount} → ${recipient}, deposit=${w.config.proposalDeposit})`);
  return p;
}

export function withdrawProposal(w: World, propId: number, author: Address) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return fail(w, `withdraw: proposal ${propId} not found`);
  if (p.author !== author) return fail(w, `withdraw: not author`);
  if (p.status !== 'submitted' && p.status !== 'signaling') {
    return fail(w, `withdraw: proposal #${propId} not in withdrawable state (${p.status})`);
  }
  const refund =
    (w.config.proposalDeposit * BigInt(10000 - w.config.depositSlashBpsOnWithdraw)) /
    10000n;
  const slashed = w.config.proposalDeposit - refund;
  w.baseBalances.set(author, (w.baseBalances.get(author) ?? 0n) + refund);
  w.treasuryBase += slashed;
  // unlock signal stakes
  for (const [staker, info] of p.signalStakers) {
    w.staked.set(staker, (w.staked.get(staker) ?? 0n) - info.amount);
  }
  p.status = 'withdrawn';
  emit(w, `proposal #${propId} withdrawn (refund=${refund}, slashed=${slashed} to treasury)`);
}

// --- Signaling ---

export function signal(
  w: World,
  who: Address,
  propId: number,
  dir: 'yes' | 'no',
  amount: bigint,
) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return fail(w, `signal: proposal ${propId} not found`);
  if (w.time >= votingOpensAt(w)) return fail(w, `signal: window closed`);
  const bal = w.balances.get(who) ?? 0n;
  const alreadyStaked = w.staked.get(who) ?? 0n;
  if (bal - alreadyStaked < amount) {
    return fail(w, `signal: ${who} insufficient unstaked balance (have ${bal - alreadyStaked}, need ${amount})`);
  }
  if (w.config.signalLockUntilResolved) {
    w.staked.set(who, alreadyStaked + amount);
  }
  const existing = p.signalStakers.get(who);
  if (existing) {
    return fail(w, `signal: ${who} already signaled on #${propId}`);
  }
  p.signalStakers.set(who, { dir, amount });
  if (dir === 'yes') p.signal.yes += amount;
  else p.signal.no += amount;
  emit(w, `signal: ${who} stakes ${amount} ${dir.toUpperCase()} on #${propId}`);
}

export function tryTransfer(w: World, from: Address, to: Address, amount: bigint) {
  const bal = w.balances.get(from) ?? 0n;
  const locked = w.staked.get(from) ?? 0n;
  if (bal - locked < amount) {
    return fail(w, `transfer: ${from} → ${to} reverted, ${amount} exceeds free balance ${bal - locked}`);
  }
  w.balances.set(from, bal - amount);
  w.balances.set(to, (w.balances.get(to) ?? 0n) + amount);
  emit(w, `transfer: ${from} → ${to} (${amount})`);
}

// --- Petition ---

export function petition(w: World, who: Address, propId: number, amount: bigint) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return fail(w, `petition: proposal ${propId} not found`);
  if (p.status !== 'queued') return fail(w, `petition: proposal #${propId} not queued (${p.status})`);
  const bal = w.balances.get(who) ?? 0n;
  const locked = w.staked.get(who) ?? 0n;
  if (bal - locked < amount) return fail(w, `petition: insufficient unlocked balance`);
  w.staked.set(who, locked + amount);
  p.petitionStakers.set(who, (p.petitionStakers.get(who) ?? 0n) + amount);
  const total = sumStakers(p.petitionStakers);
  emit(w, `petition: ${who} stakes ${amount} against #${propId} (total=${total})`);
  const thresholdAmount =
    (w.config.totalSupply * BigInt(w.config.petitionThresholdBps)) / 10000n;
  if (total >= thresholdAmount) {
    p.status = 'forced-referendum';
    emit(w, `petition: #${propId} → forced-referendum (threshold ${thresholdAmount} reached)`);
  }
}

export function referendumVote(
  w: World,
  who: Address,
  propId: number,
  dir: 'yes' | 'no',
  amount: bigint,
) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return fail(w, `referendum: proposal ${propId} not found`);
  if (p.status !== 'forced-referendum') {
    return fail(w, `referendum: not in forced-referendum state`);
  }
  const bal = w.balances.get(who) ?? 0n;
  if (bal < amount) return fail(w, `referendum: insufficient balance`);
  // overload signal map for referendum tally (sim convenience)
  const existing = p.signalStakers.get(who);
  if (existing) return fail(w, `referendum: already voted`);
  p.signalStakers.set(who, { dir, amount });
  if (dir === 'yes') p.signal.yes += amount;
  else p.signal.no += amount;
  emit(w, `referendum: ${who} votes ${amount} ${dir.toUpperCase()} on #${propId}`);
}

export function tallyReferendum(w: World, propId: number) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p || p.status !== 'forced-referendum') return;
  const totalVotes = p.signal.yes + p.signal.no;
  const minTurnout =
    (w.config.totalSupply * BigInt(w.config.petitionMinTurnoutBps)) / 10000n;
  if (totalVotes < minTurnout) {
    // Below minimum turnout — proposal proceeds (status quo from committee)
    p.status = 'queued';
    emit(w, `referendum #${propId}: turnout ${totalVotes} < minimum ${minTurnout}, proposal PROCEEDS to execution`);
    return;
  }
  if (p.signal.yes > p.signal.no) {
    p.status = 'queued';
    emit(w, `referendum #${propId}: YES (${p.signal.yes} > ${p.signal.no}), proposal proceeds`);
  } else if (p.signal.yes < p.signal.no) {
    p.status = 'rejected-majority';
    emit(w, `referendum #${propId}: NO (${p.signal.no} > ${p.signal.yes}), proposal blocked`);
  } else {
    p.status = 'rejected-majority';
    emit(w, `referendum #${propId}: TIE → blocked (status-quo bias)`);
  }
}

// --- Voting ---

export function openVoting(w: World) {
  for (const p of w.proposals) {
    if (p.cycle === w.cycle && (p.status === 'submitted' || p.status === 'signaling')) {
      p.status = 'in-vote';
    }
  }
  emit(w, `voting window opens`);
}

export function vote(w: World, member: Address, propId: number, choice: Vote) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return fail(w, `vote: proposal ${propId} not found`);
  if (p.status !== 'in-vote') return fail(w, `vote: proposal not in voting (${p.status})`);
  if (!w.committee.includes(member)) {
    return fail(w, `vote: ${member} not on committee`);
  }
  if (
    w.config.authorRecusalRequired &&
    p.affectsAddress &&
    p.affectsAddress === member
  ) {
    return fail(w, `vote: ${member} must recuse (proposal affects them)`);
  }
  if (p.votes.has(member)) {
    return fail(w, `vote: ${member} already voted on #${propId}`);
  }
  p.votes.set(member, choice);
  emit(w, `vote: ${member} → ${choice.toUpperCase()} on #${propId}`);
}

export function recuse(w: World, member: Address, propId: number) {
  const p = w.proposals.find((x) => x.id === propId);
  if (!p) return;
  p.recusals.add(member);
  emit(w, `recusal: ${member} recused from #${propId}`);
}

export function tally(w: World) {
  for (const p of w.proposals) {
    if (p.status !== 'in-vote') continue;
    const effectiveCommitteeSize = w.committee.length - p.recusals.size;
    const yesVotes = countVotes(p, 'approve');
    const noVotes = countVotes(p, 'reject');
    const abstainVotes = countVotes(p, 'abstain');
    const totalVoted = yesVotes + noVotes + abstainVotes;
    // Quorum: members who actually cast a vote (incl. abstain)
    if (totalVoted < w.config.quorumMembers) {
      p.status = 'rejected-quorum';
      emit(
        w,
        `tally: #${p.id} → REJECTED (quorum: ${totalVoted} of ${effectiveCommitteeSize} voted, need ${w.config.quorumMembers})`,
      );
      refundDeposit(w, p);
      continue;
    }
    const passes =
      w.config.majority === 'simple'
        ? yesVotes > noVotes
        : yesVotes * 3 >= effectiveCommitteeSize * 2;
    if (passes) {
      p.status = 'queued';
      p.queuedAt = w.time;
      w.treasuryReserved += p.amount;
      emit(
        w,
        `tally: #${p.id} → QUEUED for execution (yes=${yesVotes}, no=${noVotes}, abstain=${abstainVotes})`,
      );
      refundDeposit(w, p);
    } else {
      p.status = 'rejected-majority';
      emit(
        w,
        `tally: #${p.id} → REJECTED (yes=${yesVotes}, no=${noVotes}, abstain=${abstainVotes})`,
      );
      refundDeposit(w, p);
    }
    p.resolvedAt = w.time;
  }
}

function refundDeposit(w: World, p: Proposal) {
  // refund full deposit when proposal completes the cycle (passed or rejected, not withdrawn)
  if (p.status === 'withdrawn') return;
  w.baseBalances.set(p.author, (w.baseBalances.get(p.author) ?? 0n) + w.config.proposalDeposit);
  // release signal stakes
  for (const [staker, info] of p.signalStakers) {
    w.staked.set(staker, (w.staked.get(staker) ?? 0n) - info.amount);
  }
}

function countVotes(p: Proposal, choice: Vote): number {
  let n = 0;
  for (const v of p.votes.values()) if (v === choice) n++;
  return n;
}

function sumStakers(m: Map<Address, bigint>): bigint {
  let s = 0n;
  for (const v of m.values()) s += v;
  return s;
}

// --- Guardian veto ---

export function guardianVeto(w: World, member: Address, propId: number) {
  if (!w.config.guardianEnabled) return fail(w, `veto: guardian disabled`);
  if (!w.guardian.includes(member)) return fail(w, `veto: ${member} not a guardian`);
  if (w.guardianVetoesUsed >= w.config.guardianVetoBudgetPerTerm) {
    return fail(w, `veto: budget exhausted (${w.guardianVetoesUsed}/${w.config.guardianVetoBudgetPerTerm})`);
  }
  const p = w.proposals.find((x) => x.id === propId);
  if (!p || p.status !== 'queued') return fail(w, `veto: #${propId} not in queued state`);
  if (w.time >= (p.queuedAt ?? 0) + w.config.timelock) {
    return fail(w, `veto: timelock window closed`);
  }
  p.guardianVetoes.add(member);
  emit(w, `veto-sig: ${member} on #${propId} (${p.guardianVetoes.size}/${w.config.guardianQuorum})`);
  if (p.guardianVetoes.size >= w.config.guardianQuorum) {
    p.status = 'vetoed';
    w.treasuryReserved -= p.amount;
    w.guardianVetoesUsed++;
    emit(w, `veto: #${propId} VETOED (budget used: ${w.guardianVetoesUsed}/${w.config.guardianVetoBudgetPerTerm})`);
  }
}

// --- Execution ---

export function execute(w: World) {
  // Sort queued proposals by queue time so order is deterministic
  const queued = w.proposals
    .filter((p) => p.status === 'queued' && (p.queuedAt ?? 0) + w.config.timelock <= w.time)
    .sort((a, b) => (a.queuedAt ?? 0) - (b.queuedAt ?? 0));
  for (const p of queued) {
    if (w.treasuryBase < p.amount) {
      // Atomic revert — funds were never released
      p.status = 'executed-failed';
      w.treasuryReserved -= p.amount;
      emit(w, `execute: #${p.id} FAILED (treasury ${w.treasuryBase} < ${p.amount}, atomic revert)`);
      continue;
    }
    w.treasuryBase -= p.amount;
    w.treasuryReserved -= p.amount;
    w.baseBalances.set(p.recipient, (w.baseBalances.get(p.recipient) ?? 0n) + p.amount);
    p.status = 'executed';
    emit(w, `execute: #${p.id} EXECUTED (${p.amount} → ${p.recipient})`);
  }
}

// --- DEX revenue model ---

export function dexFee(w: World, fee: bigint) {
  w.treasuryBase += fee;
  emit(w, `dex: fee ${fee} → treasury (balance now ${w.treasuryBase})`);
}

// --- Election ---

export interface ElectionResult {
  filled: number;
  vacant: number;
  fallback: 'special-election' | 'leave-vacant' | 'none-needed';
  newCommittee: Address[];
}

export function runElection(
  w: World,
  candidates: Address[],
  votes: Map<Address, number>, // candidate → tokens voting for them
): ElectionResult {
  const seats = w.config.committeeSize;
  // Validate: one address can only win one seat
  const sorted = candidates
    .map((c) => ({ c, v: votes.get(c) ?? 0 }))
    .sort((a, b) => b.v - a.v);
  const winners: Address[] = [];
  for (const cand of sorted) {
    if (winners.length >= seats) break;
    if (winners.includes(cand.c)) continue; // already won — skip duplicate
    winners.push(cand.c);
  }
  const filled = winners.length;
  const vacant = seats - filled;
  let fallback: ElectionResult['fallback'] = 'none-needed';
  if (vacant > 0) {
    fallback = w.config.electionFallback;
    emit(w, `election: ${vacant}/${seats} seats unfilled → fallback=${fallback}`);
  }
  w.committee = winners;
  emit(w, `election: ${filled}/${seats} seats filled`);
  return { filled, vacant, fallback, newCommittee: winners };
}

// --- Trace formatting ---

export function dump(w: World): string {
  const lines: string[] = [];
  lines.push(`=== EVENTS ===`);
  for (const e of w.events) lines.push(`  ${e}`);
  if (w.errors.length > 0) {
    lines.push(`=== ERRORS / REVERTS ===`);
    for (const e of w.errors) lines.push(`  ${e}`);
  }
  lines.push(`=== FINAL STATE ===`);
  lines.push(`  treasury: ${w.treasuryBase} (reserved: ${w.treasuryReserved})`);
  for (const p of w.proposals) {
    lines.push(
      `  proposal #${p.id}: status=${p.status} yes=${countVotes(p, 'approve')} no=${countVotes(p, 'reject')} abstain=${countVotes(p, 'abstain')} signal(yes/no)=${p.signal.yes}/${p.signal.no}`,
    );
  }
  return lines.join('\n');
}
