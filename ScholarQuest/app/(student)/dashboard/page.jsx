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
      <section className="space-y-6 mt-8">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Analytics Overview</h2>
          </div>
          <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-low px-4 py-2 rounded-full">Year to Date</span>
        </div>
        
        {/* 2-column grid for large individual chart cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Apps Sent (Large Bar Chart) */}
          <div className="glass-card bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[360px]">
            <h3 className="font-label-md font-bold text-on-surface mb-1">Application Volume</h3>
            <p className="text-sm text-on-surface-variant mb-8">Submitted applications — last 5 months</p>
            
            <div className="flex-1 flex items-end justify-between gap-6 relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8 text-outline-variant/30">
                <div className="w-full h-px bg-current border-t border-dashed"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
                <div className="w-full h-px bg-current border-t border-dashed"></div>
              </div>
              
              <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg h-[20%] relative z-10 group cursor-pointer">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-sm rounded px-3 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">4</span>
              </div>
              <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg h-[40%] relative z-10 group cursor-pointer">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-sm rounded px-3 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">6</span>
              </div>
              <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg h-[15%] relative z-10 group cursor-pointer">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-sm rounded px-3 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">3</span>
              </div>
              <div className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-lg h-[70%] relative z-10 group cursor-pointer">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-sm rounded px-3 py-1 font-bold opacity-0 group-hover:opacity-100 transition-opacity">8</span>
              </div>
              <div className="w-full bg-primary hover:bg-primary/90 transition-colors rounded-t-lg h-[95%] relative z-10 group cursor-pointer">
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm bg-surface shadow-md rounded px-3 py-1 font-bold text-primary">11</span>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-sm font-bold text-on-surface-variant">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span className="text-primary">Sep</span>
            </div>
          </div>

          {/* Chart 2: Funding Goal */}
          <div className="glass-card bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[360px]">
            <h3 className="font-label-md font-bold text-on-surface mb-1">Funding Target Progress</h3>
            <p className="text-sm text-on-surface-variant mb-auto">Secured funds vs. yearly goal</p>
            
            <div className="mb-6 flex flex-col items-center justify-center flex-1 w-full">
               <div className="flex items-end justify-between w-full mb-5">
                 <span className="font-headline-lg text-5xl font-extrabold text-on-surface leading-none tracking-tight">$32,500</span>
                 <span className="text-xl font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-xl">65%</span>
               </div>
               <div className="w-full bg-surface-container-highest rounded-full h-6 mb-4 overflow-hidden shadow-inner">
                 <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
               </div>
               <div className="w-full flex justify-between text-base font-bold text-on-surface-variant px-1">
                  <span>$0</span>
                  <span>Target: $50,000</span>
               </div>
            </div>
          </div>
          
          {/* Chart 3: Success Rate (Ring) */}
          <div className="glass-card bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[360px] relative">
            <h3 className="font-label-md font-bold text-on-surface mb-1">Application Win Rate</h3>
            <p className="text-sm text-on-surface-variant mb-auto">Approved vs. rejected responses</p>
            
            <div className="flex-1 flex items-center justify-center relative w-full h-full">
              <div className="relative w-52 h-52 group">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-md transition-transform duration-500 group-hover:scale-105" viewBox="0 0 128 128">
                  <circle className="text-surface-container-highest" cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="16" />
                  <circle className="text-green-500" cx="64" cy="64" r="50" fill="transparent" stroke="currentColor" strokeWidth="16" strokeDasharray="314" strokeDashoffset="113" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-headline-lg text-5xl font-extrabold text-on-surface">64%</span>
                  <span className="text-base font-bold text-on-surface-variant mt-1">Success</span>
                </div>
              </div>
            </div>
            <p className="text-center text-sm font-bold text-on-surface-variant mt-6 bg-surface-container px-5 py-2.5 rounded-xl inline-block mx-auto border border-outline-variant/10">16 Approved / 25 Total Responses</p>
          </div>

          {/* Chart 4: Categories */}
          <div className="glass-card bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[360px]">
            <h3 className="font-label-md font-bold text-on-surface mb-1">Applications by Category</h3>
            <p className="text-sm text-on-surface-variant mb-8">Distribution across scholarship types</p>
            
            <div className="flex-1 flex flex-col justify-center space-y-8">
              <div className="group cursor-pointer">
                <div className="flex justify-between text-base font-bold mb-3">
                  <span className="text-on-surface group-hover:text-blue-600 transition-colors">STEM Programs</span>
                  <span className="text-blue-600">45%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3.5 shadow-inner"><div className="bg-blue-500 h-full rounded-full w-[45%] transition-all duration-500 group-hover:w-[48%]"></div></div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between text-base font-bold mb-3">
                  <span className="text-on-surface group-hover:text-purple-600 transition-colors">Merit-Based</span>
                  <span className="text-purple-600">35%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3.5 shadow-inner"><div className="bg-purple-500 h-full rounded-full w-[35%] transition-all duration-500 group-hover:w-[38%]"></div></div>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between text-base font-bold mb-3">
                  <span className="text-on-surface group-hover:text-orange-500 transition-colors">Need-Based</span>
                  <span className="text-orange-500">20%</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3.5 shadow-inner"><div className="bg-orange-400 h-full rounded-full w-[20%] transition-all duration-500 group-hover:w-[23%]"></div></div>
              </div>
            </div>
          </div>

          {/* Chart 5: Status Funnel (Spans 2 columns) */}
          <div className="glass-card bg-white rounded-3xl p-8 border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col lg:col-span-2 min-h-[360px]">
            <h3 className="font-label-md font-bold text-on-surface mb-1">Application Pipeline Funnel</h3>
            <p className="text-sm text-on-surface-variant mb-6">Drop-off rate from discovery to awarded</p>
            
            <div className="flex-1 flex flex-col justify-center gap-3 items-center w-full max-w-4xl mx-auto py-2">
              <div className="w-full bg-surface-container hover:bg-surface-container-high transition-colors py-3 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm">
                <span className="font-bold text-on-surface-variant text-base">Total Matched</span>
                <span className="font-extrabold text-2xl">40</span>
              </div>
              <div className="w-[85%] bg-primary/10 hover:bg-primary/20 transition-colors py-3 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm">
                <span className="font-bold text-primary text-base">Applications Submitted</span>
                <span className="font-extrabold text-2xl text-primary">32</span>
              </div>
              <div className="w-[70%] bg-secondary/10 hover:bg-secondary/20 transition-colors py-3 rounded-2xl flex items-center justify-between px-8 cursor-pointer shadow-sm">
                <span className="font-bold text-secondary text-base">Currently Pending</span>
                <span className="font-extrabold text-2xl text-secondary">25</span>
              </div>
              <div className="w-[50%] bg-green-500/10 hover:bg-green-500/20 transition-colors py-3 rounded-2xl flex items-center justify-between px-8 cursor-pointer border border-green-500/20 shadow-sm">
                <span className="font-bold text-green-700 text-base">Successfully Awarded</span>
                <span className="font-extrabold text-2xl text-green-700">16</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
