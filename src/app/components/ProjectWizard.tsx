import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Check, ChevronRight, Settings, Shield, Users, Info } from 'lucide-react';
import { Phase } from '../App';

const TOTAL_STEPS = 4;

export function ProjectWizard({ phase }: { phase: Phase }) {
  const isTestnet = phase === 'testnet';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    committeeSize: 5,
    initialLiquidity: 25000,
    quorum: 50,
    votingPeriod: 3
  });

  const handleNext = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <section id="start" className="py-16 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest mb-4 ${isTestnet ? 'text-orange-500 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400'}`}>
              06 / Try It{isTestnet ? ' — Testnet Sandbox' : ''}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase leading-[0.9] text-black dark:text-white mb-6">
              {isTestnet ? 'Prototype your Organization' : 'From Idea to Organization'} <br />
              <span className="text-neutral-500 dark:text-neutral-400">{isTestnet ? 'risk-free.' : 'in minutes.'}</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              {isTestnet 
                ? "Experiment with governance structures, treasury rules, and tokenomics in our incentivized testnet environment. No real funds required."
                : "No smart contract knowledge required. Configure your governance structure, treasury rules, and tokenomics through our visual interface."
              }
            </p>
            
            <div className="space-y-4">
              {[
                { 
                  title: "Committee Governance",
                  desc: isTestnet ? "Configure committee size, election cadence, and quorum thresholds." : "Configure committee size, election cadence, and quorum thresholds."
                },
                { 
                  title: isTestnet ? "Test Treasury" : "Built-in Treasury", 
                  desc: isTestnet ? "Multi-sig wallet generated with 1000 tETH for testing." : "Multi-sig wallet generated automatically with your organization." 
                },
                { 
                  title: isTestnet ? "Instant Deployment" : "Instant Tokens", 
                  desc: isTestnet ? "Deploy to Sepolia in seconds." : "Deploy a governance token or NFT membership pass with one click."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white dark:text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white">{item.title}</h4>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Wizard */}
          <div className="relative">
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 transform rotate-3" />
            <div className="relative bg-white dark:bg-neutral-900 border-2 border-black dark:border-neutral-600 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.05)] overflow-hidden p-6">

              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 w-9 rounded-full transition-colors ${i <= step ? 'bg-black dark:bg-white' : 'bg-neutral-100 dark:bg-neutral-700'}`}
                    />
                  ))}
                </div>
                <div className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Step {step} of {TOTAL_STEPS}</div>
              </div>

              {/* Steps */}
              <div className="h-[340px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800">
                           <Shield className="w-6 h-6 text-black dark:text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">Identity</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{isTestnet ? 'Name your test organization.' : 'Name your organization.'}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-1">Organization Name</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                            placeholder={isTestnet ? "e.g. My Test DAO" : "e.g. Ocean Cleanup DAO"}
                            defaultValue={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black dark:text-white mb-1">Ticker Symbol</label>
                          <input
                            type="text"
                            className="w-full px-4 py-3 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all uppercase"
                            placeholder={isTestnet ? "e.g. TEST" : "e.g. OCEAN"}
                            defaultValue={formData.ticker}
                            onChange={(e) => setFormData({...formData, ticker: e.target.value})}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800">
                           <Users className="w-6 h-6 text-black dark:text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">Founding Committee</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{isTestnet ? 'Set up your test committee.' : 'Seed the chairs and the treasury.'}</p>
                        </div>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="committee-size" className="text-sm font-medium text-black dark:text-white">Initial Chair Members</label>
                            <span className="text-sm font-bold dark:text-white">{formData.committeeSize}</span>
                          </div>
                          <input
                            id="committee-size"
                            type="range"
                            min="3"
                            max="9"
                            step="2"
                            className="w-full accent-black h-2 bg-neutral-100 dark:bg-neutral-700 appearance-none cursor-pointer"
                            value={formData.committeeSize}
                            onChange={(e) => setFormData({...formData, committeeSize: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Odd numbers only. Founding chairs vote 1-person-1-vote until the first election.</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="initial-liquidity" className="text-sm font-medium text-black dark:text-white">Initial Liquidity {isTestnet ? '(tETH)' : '(USD)'}</label>
                            <span className="text-sm font-bold dark:text-white">
                              {isTestnet ? `${formData.initialLiquidity.toLocaleString()} tETH` : `$${formData.initialLiquidity.toLocaleString()}`}
                            </span>
                          </div>
                          <input
                            id="initial-liquidity"
                            type="range"
                            min="5000"
                            max="250000"
                            step="5000"
                            className="w-full accent-black h-2 bg-neutral-100 dark:bg-neutral-700 appearance-none cursor-pointer"
                            value={formData.initialLiquidity}
                            onChange={(e) => setFormData({...formData, initialLiquidity: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Contributed by founding chairs and locked permanently in the DEX pool.</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-neutral-100 dark:bg-neutral-800">
                           <Settings className="w-6 h-6 text-black dark:text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black dark:text-white">Governance</h3>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{isTestnet ? 'Configure voting parameters.' : 'Set the rules of engagement.'}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="support-threshold" className="text-sm font-medium text-black dark:text-white">Support Threshold</label>
                            <span className="text-sm font-bold dark:text-white">{formData.quorum}%</span>
                          </div>
                          <input
                            id="support-threshold"
                            type="range"
                            min="1"
                            max="100"
                            className="w-full accent-black h-2 bg-neutral-100 dark:bg-neutral-700 appearance-none cursor-pointer"
                            value={formData.quorum}
                            onChange={(e) => setFormData({...formData, quorum: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Percentage of YES votes needed to pass.</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="voting-period" className="text-sm font-medium text-black dark:text-white">Voting Period</label>
                            <span className="text-sm font-bold dark:text-white">{formData.votingPeriod} Days</span>
                          </div>
                          <input
                            id="voting-period"
                            type="range"
                            min="1"
                            max="14"
                            className="w-full accent-black h-2 bg-neutral-100 dark:bg-neutral-700 appearance-none cursor-pointer"
                            value={formData.votingPeriod}
                            onChange={(e) => setFormData({...formData, votingPeriod: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                            {isTestnet ? 'Duration of testnet voting cycles.' : 'How long members have to vote.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isTestnet ? 'bg-orange-500' : 'bg-emerald-500'}`}>
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-black dark:text-white leading-tight">{isTestnet ? 'Ready to Deploy' : 'Ready to Launch'}</h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            <strong className="text-black dark:text-white">{formData.name || 'Your Organization'}</strong> {isTestnet ? '· testnet' : '· mainnet'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-neutral-50 dark:bg-neutral-800 text-xs border border-neutral-100 dark:border-neutral-700 divide-y divide-neutral-100 dark:divide-neutral-700">
                        <div className="flex justify-between px-3 py-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Ticker</span>
                          <span className="font-bold dark:text-white">{formData.ticker || '—'}</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Founding Chairs</span>
                          <span className="font-bold dark:text-white">{formData.committeeSize}</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Initial Liquidity</span>
                          <span className="font-bold dark:text-white">{isTestnet ? `${formData.initialLiquidity.toLocaleString()} tETH` : `$${formData.initialLiquidity.toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Support / Period</span>
                          <span className="font-bold dark:text-white">{formData.quorum}% · {formData.votingPeriod}d</span>
                        </div>
                        <div className="flex justify-between px-3 py-2">
                          <span className="text-neutral-500 dark:text-neutral-400">Network Fee</span>
                          <span className="font-bold dark:text-white">{isTestnet ? '0.02 tETH (Free)' : '0.02 ETH'}</span>
                        </div>
                      </div>

                      {isTestnet && (
                        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900 px-3 py-2 text-[11px] text-orange-800 dark:text-orange-300 flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>Testnet deployment. No real assets used or transferred.</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100 dark:border-neutral-700">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white disabled:opacity-0 transition-colors"
                >
                  Back
                </button>
                <Button
                  onClick={step === TOTAL_STEPS ? () => alert(isTestnet ? 'Demo only - Check console for mocked deployment' : 'Demo only!') : handleNext}
                  className="flex items-center gap-2"
                >
                  {step === TOTAL_STEPS ? (isTestnet ? 'Deploy to Testnet' : 'Deploy Organization') : 'Continue'}
                  {step !== TOTAL_STEPS && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
