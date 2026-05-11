import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/Button';
import { Check, ChevronRight, Settings, Shield, Rocket, Info } from 'lucide-react';
import { Phase } from '../App';

export function ProjectWizard({ phase }: { phase: Phase }) {
  const isTestnet = phase === 'testnet';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    quorum: 50,
    votingPeriod: 3
  });

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  return (
    <section id="start" className="py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border ${isTestnet ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
              <Rocket className="w-4 h-4" />
              {isTestnet ? 'Testnet Sandbox' : 'Easy Deployment'}
            </div>
            <h2 className="text-4xl font-bold text-black mb-6">
              {isTestnet ? 'Prototype your Organization' : 'From Idea to Organization'} <br />
              <span className="text-neutral-500">{isTestnet ? 'risk-free.' : 'in minutes.'}</span>
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              {isTestnet 
                ? "Experiment with governance structures, treasury rules, and tokenomics in our incentivized testnet environment. No real funds required."
                : "No smart contract knowledge required. Configure your governance structure, treasury rules, and tokenomics through our visual interface."
              }
            </p>
            
            <div className="space-y-6">
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
                  <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0 mt-1">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{item.title}</h4>
                    <p className="text-sm text-neutral-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Wizard */}
          <div className="relative">
            <div className="absolute inset-0 bg-neutral-100 transform rotate-3 rounded-lg" />
            <div className="relative bg-white border-2 border-neutral-100 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden p-8">
              
              {/* Progress */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-12 rounded-full transition-colors ${i <= step ? 'bg-black' : 'bg-neutral-100'}`} 
                    />
                  ))}
                </div>
                <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Step {step} of 3</div>
              </div>

              {/* Steps */}
              <div className="h-[320px]">
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
                        <div className="p-3 bg-neutral-100 rounded-lg">
                           <Shield className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">Identity</h3>
                          <p className="text-sm text-neutral-500">{isTestnet ? 'Name your test organization.' : 'Name your organization.'}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-black mb-1">Organization Name</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                            placeholder={isTestnet ? "e.g. My Test DAO" : "e.g. Ocean Cleanup DAO"}
                            defaultValue={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-black mb-1">Ticker Symbol</label>
                          <input 
                            type="text" 
                            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all uppercase"
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
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-neutral-100 rounded-lg">
                           <Settings className="w-6 h-6 text-black" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-black">Governance</h3>
                          <p className="text-sm text-neutral-500">{isTestnet ? 'Configure voting parameters.' : 'Set the rules of engagement.'}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="support-threshold" className="text-sm font-medium text-black">Support Threshold</label>
                            <span className="text-sm font-bold">{formData.quorum}%</span>
                          </div>
                          <input
                            id="support-threshold"
                            type="range"
                            min="1"
                            max="100"
                            className="w-full accent-black h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
                            value={formData.quorum}
                            onChange={(e) => setFormData({...formData, quorum: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 mt-1">Percentage of YES votes needed to pass.</p>
                        </div>

                        <div>
                          <div className="flex justify-between mb-2">
                            <label htmlFor="voting-period" className="text-sm font-medium text-black">Voting Period</label>
                            <span className="text-sm font-bold">{formData.votingPeriod} Days</span>
                          </div>
                          <input
                            id="voting-period"
                            type="range"
                            min="1"
                            max="14"
                            className="w-full accent-black h-2 bg-neutral-100 rounded-lg appearance-none cursor-pointer"
                            value={formData.votingPeriod}
                            onChange={(e) => setFormData({...formData, votingPeriod: parseInt(e.target.value)})}
                          />
                          <p className="text-xs text-neutral-500 mt-1">
                            {isTestnet ? 'Duration of testnet voting cycles.' : 'How long members have to vote.'}
                          </p>
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
                      className="space-y-6 text-center pt-8"
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${isTestnet ? 'bg-orange-500 shadow-orange-200' : 'bg-emerald-500 shadow-emerald-200'}`}>
                        <Check className="w-10 h-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-black mb-2">{isTestnet ? 'Ready to Deploy' : 'Ready to Launch!'}</h3>
                      <p className="text-neutral-500 text-sm max-w-xs mx-auto mb-4">
                        You are about to deploy <strong>{formData.name || 'Your Organization'}</strong> {isTestnet ? 'to the testnet.' : 'on the mainnet.'}
                      </p>
                      
                      {isTestnet && (
                        <div className="bg-orange-50 border border-orange-100 p-3 rounded text-xs text-orange-800 flex items-start gap-2 text-left mb-6">
                          <Info className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>This is a testnet deployment. No real assets will be used or transferred.</span>
                        </div>
                      )}

                      <div className="bg-neutral-50 p-4 rounded-lg text-left text-sm space-y-2 border border-neutral-100">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Network Fee</span>
                          <span className="font-bold">{isTestnet ? '0.02 tETH (Free)' : '0.02 ETH'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Deployment Time</span>
                          <span className="font-bold">~15s</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                <button 
                  onClick={handleBack}
                  disabled={step === 1}
                  className="text-sm font-medium text-neutral-500 hover:text-black disabled:opacity-0 transition-colors"
                >
                  Back
                </button>
                <Button 
                  onClick={step === 3 ? () => alert(isTestnet ? 'Demo only - Check console for mocked deployment' : 'Demo only!') : handleNext}
                  className="flex items-center gap-2"
                >
                  {step === 3 ? (isTestnet ? 'Deploy to Testnet' : 'Deploy Organization') : 'Continue'}
                  {step !== 3 && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
