'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CalculatorPage() {
  // Costs
  const [tuition, setTuition] = useState(15000);
  const [examFees, setExamFees] = useState(8000);
  const [books, setBooks] = useState(1200);
  const [otherCosts, setOtherCosts] = useState(2500);

  // Funds
  const [savings, setSavings] = useState(3000);
  const [familyCont, setFamilyCont] = useState(5000);
  const [scholarships, setScholarships] = useState(4000);
  const [loans, setLoans] = useState(0);

  const [totalCost, setTotalCost] = useState(0);
  const [totalFunds, setTotalFunds] = useState(0);
  const [gap, setGap] = useState(0);
  const [percentCovered, setPercentCovered] = useState(0);

  useEffect(() => {
    const cost = (Number(tuition) || 0) + (Number(examFees) || 0) + (Number(books) || 0) + (Number(otherCosts) || 0);
    const funds = (Number(savings) || 0) + (Number(familyCont) || 0) + (Number(scholarships) || 0) + (Number(loans) || 0);
    
    setTotalCost(cost);
    setTotalFunds(funds);
    
    const remaining = Math.max(0, cost - funds);
    setGap(remaining);
    
    if (cost > 0) {
      setPercentCovered(Math.min(100, Math.round((funds / cost) * 100)));
    } else {
      setPercentCovered(0);
    }
  }, [tuition, examFees, books, otherCosts, savings, familyCont, scholarships, loans]);

  const formatMoney = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const InputField = ({ label, value, onChange, icon }) => (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-on-surface-variant mb-1.5">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-on-surface-variant material-symbols-outlined" style={{ fontSize: '18px' }}>{icon}</span>
        <input 
          type="number" 
          value={value === 0 && String(value) !== '0' ? '' : value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-surface border border-outline-variant/50 rounded-xl py-3 pl-10 pr-4 text-on-surface font-semibold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
        />
        <span className="absolute right-4 text-on-surface-variant/50 font-bold">₹</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 lg:py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-2">Funding Gap Calculator</h1>
        <p className="text-on-surface-variant font-medium text-lg">Calculate your true cost of attendance and visualize your funding needs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Costs Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
                <span className="material-symbols-outlined">receipt_long</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">Estimated Costs</h2>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Annual Expenses</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <InputField label="Tuition & Fees" value={tuition} onChange={setTuition} icon="school" />
              <InputField label="Exam & Other Fees" value={examFees} onChange={setExamFees} icon="receipt" />
              <InputField label="Books & Supplies" value={books} onChange={setBooks} icon="menu_book" />
              <InputField label="Personal / Other" value={otherCosts} onChange={setOtherCosts} icon="local_cafe" />
            </div>
            
            <div className="mt-4 bg-error/5 p-4 rounded-xl flex justify-between items-center border border-error/10">
              <span className="font-bold text-error">Total Cost</span>
              <span className="text-xl font-extrabold text-error">{formatMoney(totalCost)}</span>
            </div>
          </motion.div>

          {/* Funds Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/30"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-outline-variant/20">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-on-surface">Current Funds</h2>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Available Resources</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
              <InputField label="Personal Savings" value={savings} onChange={setSavings} icon="savings" />
              <InputField label="Family Contribution" value={familyCont} onChange={setFamilyCont} icon="family_home" />
              <InputField label="Confirmed Scholarships" value={scholarships} onChange={setScholarships} icon="emoji_events" />
              <InputField label="Federal Aid / Loans" value={loans} onChange={setLoans} icon="account_balance" />
            </div>

            <div className="mt-4 bg-green-500/5 p-4 rounded-xl flex justify-between items-center border border-green-500/10">
              <span className="font-bold text-green-700">Total Funds</span>
              <span className="text-xl font-extrabold text-green-700">{formatMoney(totalFunds)}</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Visualization */}
        <div className="lg:col-span-5 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="sticky top-28 bg-primary rounded-3xl p-8 shadow-xl text-on-primary overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/20 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">donut_large</span>
                Financial Summary
              </h3>

              {/* Gap Highlight */}
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 text-center mb-8">
                <p className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Remaining Gap</p>
                <p className="text-5xl font-extrabold tracking-tight text-white mb-2">{formatMoney(gap)}</p>
                {gap > 0 ? (
                  <p className="text-sm text-secondary font-medium flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>warning</span>
                    Needs funding
                  </p>
                ) : (
                  <p className="text-sm text-green-300 font-medium flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                    Fully funded!
                  </p>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>Covered: {percentCovered}%</span>
                  <span className="text-white/60">Goal: 100%</span>
                </div>
                <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentCovered}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${percentCovered >= 100 ? 'bg-green-400' : 'bg-gradient-to-r from-secondary to-[#8B7CFF]'}`}
                  />
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70 font-medium">Total Cost</span>
                  <span className="font-bold">{formatMoney(totalCost)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/70 font-medium">Available Funds</span>
                  <span className="font-bold">{formatMoney(totalFunds)}</span>
                </div>
              </div>

              {/* CTA */}
              {gap > 0 && (
                <Link 
                  href="/discovery" 
                  className="block w-full py-4 bg-white text-primary text-center rounded-xl font-bold hover:bg-secondary hover:text-white transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  Find Scholarships for {formatMoney(gap)}
                </Link>
              )}
              {gap === 0 && totalCost > 0 && (
                <div className="block w-full py-4 bg-green-400/20 text-green-300 border border-green-400/30 text-center rounded-xl font-bold cursor-default">
                  You're all set for the year! 🎉
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
