'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getUser, getStats, getActivity, getUserName } from '@/lib/store';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ matched: 124, applied: 18, saved: 45, deadlines: 3 });
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const load = () => {
      const u = getUser();
      setUser(u);
      const s = getStats();
      setStats(s);
      setActivities(getActivity().slice(0, 5));
    };
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const firstName = user?.firstName || user?.name?.split(' ')[0] || 'Alex';
  const initials = user?.initials || 'AJ';
  const gpa = user?.gpa || '3.92';
  const institution = user?.institution || 'Stanford University';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const statCards = [
    { icon: 'auto_awesome', label: 'Matched', value: String(stats.matched), trend: '+12', trendColor: 'text-green-600', iconBg: 'bg-primary/10 text-primary', hoverBg: 'group-hover:bg-primary group-hover:text-white' },
    { icon: 'send', label: 'Applied', value: String(stats.applied), trend: 'Active', trendColor: 'text-green-600', iconBg: 'bg-secondary/10 text-secondary', hoverBg: 'group-hover:bg-secondary group-hover:text-white' },
    { icon: 'bookmark', label: 'Saved', value: String(stats.saved), trend: 'Saved', trendColor: 'text-on-surface-variant', iconBg: 'bg-tertiary-fixed-dim/20 text-tertiary', hoverBg: 'group-hover:bg-tertiary group-hover:text-white' },
    { icon: 'event_busy', label: 'Deadlines', value: String(stats.deadlines).padStart(2, '0'), trend: 'Urgent', trendColor: 'text-error', iconBg: 'bg-error/10 text-error', hoverBg: 'group-hover:bg-error group-hover:text-white' },
  ];

  const recommendations = [
    { id: 1, tag: 'STEM Excellence', title: 'Global Tech Innovators Fund', desc: 'Awarded to students demonstrating exceptional leadership in computer science and AI ethics.', amount: '$25,000', deadline: 'Oct 15, 2026', match: '98%' },
    { id: 2, tag: 'Leadership', title: 'Future Leaders Foundation', desc: 'Supporting visionary students who are driving change in their local communities.', amount: '$10,000', deadline: 'Nov 02, 2026', match: '92%' },
  ];

  const deadlines = [
    { month: 'SEP', day: '28', title: 'Rhodes Scholarship App', sub: 'Final Documents Due', urgent: true },
    { month: 'OCT', day: '05', title: 'National Merit Essay', sub: 'Submission Deadline', urgent: false },
  ];

  // Profile completion
  const fields = ['firstName', 'lastName', 'email', 'bio', 'gpa', 'institution', 'phone'];
  const filled = user ? fields.filter(f => user[f] && user[f] !== '').length : 3;
  const completion = Math.round((filled / fields.length) * 100);
  const circumference = 364.4;
  const offset = circumference * (1 - completion / 100);

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto space-y-4">
      
      {/* ===== STATS GRID (TOP) ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-5 border border-outline-variant/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group bg-white flex flex-col justify-between h-32">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.iconBg} ${stat.hoverBg} transition-colors`}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <span className={`font-label-sm font-bold bg-surface px-2 py-1 rounded-md ${stat.trendColor}`}>{stat.trend}</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5 text-[10px]">{stat.label}</p>
              <h4 className="font-headline-md text-headline-md font-extrabold leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* ===== 5-CHART ANALYTICS SECTION ===== */}
      <section className="space-y-6 mt-12 relative">
        {/* Decorative Background Blob for the section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10 shadow-sm">
              <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-extrabold text-on-surface tracking-tight">Analytics Overview</h2>
              <p className="text-sm font-medium text-on-surface-variant mt-0.5">Your performance metrics at a glance</p>
            </div>
          </div>
          <button className="text-xs font-bold text-primary bg-white border border-primary/20 shadow-sm px-5 py-2.5 rounded-xl hover:bg-primary/5 hover:scale-105 transition-all flex items-center gap-2">
            Year to Date <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
        
        {/* 2-column grid for large individual chart cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          
          {/* Chart 1: Apps Sent (Large Bar Chart) */}
          <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-[380px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface tracking-tight mb-1">Application Volume</h3>
                <p className="text-sm font-medium text-on-surface-variant">Submitted applications — last 5 months</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">bar_chart</span>
              </div>
            </div>
            
            <div className="flex-1 flex items-end justify-between gap-6 relative mt-auto">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-outline-variant/20">
                <div className="w-full h-px bg-current"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
              </div>
              
              {/* Bars */}
              {[{v: 4, h: '20%'}, {v: 6, h: '40%'}, {v: 3, h: '15%'}, {v: 8, h: '70%'}, {v: 11, h: '95%', active: true}].map((bar, i) => (
                <div key={i} className={`w-full transition-all duration-700 ease-out rounded-t-xl h-[${bar.h}] relative z-10 group/bar cursor-pointer ${bar.active ? 'bg-gradient-to-t from-primary/80 to-primary shadow-lg shadow-primary/30' : 'bg-surface-container-highest hover:bg-primary/30'}`}>
                  <span className={`absolute -top-12 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-xl rounded-lg px-3 py-1.5 font-bold transition-all duration-300 ${bar.active ? 'opacity-100 text-primary -translate-y-2' : 'opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2'}`}>
                    {bar.v}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-5 px-3 text-sm font-bold text-on-surface-variant">
              <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span className="text-primary">Sep</span>
            </div>
          </div>

          {/* Chart 2: Funding Goal */}
          <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-[380px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface tracking-tight mb-1">Funding Target</h3>
                <p className="text-sm font-medium text-on-surface-variant">Secured funds vs. yearly goal</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600">account_balance_wallet</span>
              </div>
            </div>
            
            <div className="mb-4 flex flex-col items-center justify-center flex-1 w-full">
               <div className="flex flex-col items-center w-full mb-8">
                 <span className="text-xs font-extrabold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-4 ring-1 ring-green-500/20 shadow-sm">+65% Achieved</span>
                 <span className="font-headline-lg text-6xl font-extrabold text-on-surface leading-none tracking-tighter drop-shadow-sm">$32,500</span>
               </div>
               
               <div className="w-full relative">
                 <div className="absolute -top-6 right-0 text-sm font-bold text-on-surface-variant">Target: <span className="text-on-surface">$50,000</span></div>
                 <div className="absolute -top-6 left-0 text-sm font-bold text-on-surface-variant">$0</div>
                 <div className="w-full bg-surface-container-highest rounded-full h-4 mb-2 overflow-hidden shadow-inner p-[2px]">
                   <div className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-1000 shadow-lg relative" style={{ width: '65%' }}>
                     <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 w-full animate-[shimmer_2s_infinite]"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
          
          {/* Chart 3: Success Rate (Ring) */}
          <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-[380px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-2 relative z-10">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface tracking-tight mb-1">Win Rate</h3>
                <p className="text-sm font-medium text-on-surface-variant">Approved vs. total applications</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">pie_chart</span>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative w-full h-full">
              <div className="relative w-56 h-56 group-hover:scale-105 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-2xl"></div>
                <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 128 128">
                  <circle className="text-surface-container-highest drop-shadow-sm" cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="12" />
                  <circle className="text-blue-500" cx="64" cy="64" r="50" fill="transparent" stroke="url(#blueGrad)" strokeWidth="12" strokeDasharray="314" strokeDashoffset="113" strokeLinecap="round" style={{ filter: 'drop-shadow(0px 4px 6px rgba(59, 130, 246, 0.4))' }} />
                  <defs>
                    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col z-20">
                  <span className="font-headline-lg text-6xl font-extrabold text-on-surface tracking-tighter">64%</span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mt-2 ring-1 ring-blue-500/20">Success</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 relative z-10">
              <p className="text-xs font-bold text-on-surface-variant inline-flex items-center gap-2 bg-surface-container-low/50 px-5 py-2.5 rounded-2xl border border-outline-variant/10">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                16 Approved / 25 Total
              </p>
            </div>
          </div>

          {/* Chart 4: Categories */}
          <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-[380px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface tracking-tight mb-1">Categories</h3>
                <p className="text-sm font-medium text-on-surface-variant">Distribution across programs</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">category</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center space-y-5 w-full relative z-10">
              {[
                { name: 'STEM Programs', val: '45%', color: 'from-blue-400 to-blue-600', text: 'text-blue-600', icon: 'science' },
                { name: 'Merit-Based', val: '35%', color: 'from-purple-400 to-purple-600', text: 'text-purple-600', icon: 'military_tech' },
                { name: 'Need-Based', val: '20%', color: 'from-orange-400 to-orange-600', text: 'text-orange-600', icon: 'volunteer_activism' }
              ].map((cat, i) => (
                <div key={i} className="group/cat cursor-pointer bg-surface-container-lowest hover:bg-surface-container-low transition-colors p-4 rounded-[1.25rem] border border-outline-variant/10 shadow-sm">
                  <div className="flex justify-between items-center mb-3 px-1">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${cat.text}`}>{cat.icon}</span>
                      <span className="text-sm font-bold text-on-surface">{cat.name}</span>
                    </div>
                    <span className={`font-extrabold ${cat.text}`}>{cat.val}</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-3 shadow-inner overflow-hidden p-[1.5px]">
                    <div className={`bg-gradient-to-r ${cat.color} h-full rounded-full transition-all duration-1000 group-hover/cat:scale-x-[1.02] origin-left shadow-sm`} style={{ width: cat.val }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 5: Status Funnel (Spans 2 columns) */}
          <div className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col lg:col-span-2 min-h-[380px] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/5 via-secondary/5 to-transparent rounded-bl-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500/5 to-transparent rounded-tr-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <h3 className="font-headline-sm font-bold text-on-surface tracking-tight mb-1">Application Funnel</h3>
                <p className="text-sm font-medium text-on-surface-variant">Pipeline drop-off from discovery to awarded</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">filter_alt</span>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4 items-center w-full max-w-4xl mx-auto py-2 relative z-10">
              
              <div className="w-full bg-surface-container hover:bg-surface-container-high transition-all duration-300 py-4 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm border border-outline-variant/10 group/funnel hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-on-surface/5 flex items-center justify-center group-hover/funnel:bg-on-surface/10 transition-colors"><span className="material-symbols-outlined text-[20px]">search</span></div>
                  <span className="font-bold text-on-surface-variant text-base">Total Matched</span>
                </div>
                <span className="font-headline-md font-extrabold text-on-surface">40</span>
              </div>
              
              <div className="w-[85%] bg-primary/10 hover:bg-primary/20 transition-all duration-300 py-4 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm border border-primary/10 group/funnel hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover/funnel:bg-primary/30 transition-colors"><span className="material-symbols-outlined text-primary text-[20px]">send</span></div>
                  <span className="font-bold text-primary text-base">Applications Submitted</span>
                </div>
                <span className="font-headline-md font-extrabold text-primary">32</span>
              </div>
              
              <div className="w-[70%] bg-secondary/10 hover:bg-secondary/20 transition-all duration-300 py-4 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm border border-secondary/10 group/funnel hover:scale-[1.01]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center group-hover/funnel:bg-secondary/30 transition-colors"><span className="material-symbols-outlined text-secondary text-[20px]">hourglass_empty</span></div>
                  <span className="font-bold text-secondary text-base">Currently Pending</span>
                </div>
                <span className="font-headline-md font-extrabold text-secondary">25</span>
              </div>
              
              <div className="w-[50%] bg-gradient-to-r from-green-500/10 to-green-500/20 hover:from-green-500/20 hover:to-green-500/30 transition-all duration-300 py-4 rounded-2xl flex items-center justify-between px-8 cursor-pointer border border-green-500/30 shadow-[0_4px_20px_rgba(34,197,94,0.15)] group/funnel hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-inner"><span className="material-symbols-outlined text-white text-[20px]">workspace_premium</span></div>
                  <span className="font-bold text-green-700 text-base">Successfully Awarded</span>
                </div>
                <span className="font-headline-md font-extrabold text-green-700">16</span>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
