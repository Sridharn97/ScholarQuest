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
    <div className="p-gutter max-w-container-max mx-auto space-y-10">

      {/* ===== WELCOME + PROFILE COMPLETION ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Banner */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-[2rem] bg-primary p-10 text-on-primary flex flex-col justify-between min-h-[240px]">
          <div className="z-10 relative">
            <h1 className="font-headline-lg text-headline-lg mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{greeting}, {firstName}.</h1>
            <p className="font-body-lg text-[#dbe1ff]/80 max-w-md">
              {institution} · GPA {gpa} · You&apos;re in the top 5% of applicants this week. Keep the momentum going!
            </p>
          </div>
          <div className="z-10 relative mt-6 flex items-center gap-4 flex-wrap">
            <Link href="/profile" className="px-6 py-3 bg-white text-primary rounded-10 font-label-md hover:scale-95 transition-transform">
              Complete Profile
            </Link>
            <Link href="/tracker" className="font-label-md text-[#dbe1ff] underline cursor-pointer">View application tracker</Link>
          </div>
          {/* Decorative Blobs */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-secondary-container/30 rounded-full blur-[100px]" />
          <div className="absolute right-10 top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </div>

        {/* Profile Completion Ring */}
        <div className="glass-card rounded-[2rem] p-10 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              <circle className="text-surface-container-highest" cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" />
              <circle className="text-secondary" cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-headline-md text-headline-md text-on-surface">{completion}%</span>
            </div>
          </div>
          <h3 className="font-label-md text-on-surface mb-1">Profile Completion</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {completion < 100 ? 'Add more details to boost your matches' : 'Profile complete! 🎉'}
          </p>
          <Link href="/profile" className="mt-4 text-primary font-label-sm hover:underline">Edit Profile →</Link>
        </div>
      </section>

      {/* ===== STATS GRID ===== */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-6 border border-outline-variant/20 hover:border-primary/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-10 ${stat.iconBg} ${stat.hoverBg} transition-colors`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`font-label-sm ${stat.trendColor}`}>{stat.trend}</span>
            </div>
            <p className="font-label-sm text-on-surface-variant">{stat.label}</p>
            <h4 className="font-headline-md text-headline-md">{stat.value}</h4>
          </div>
        ))}
      </section>

      {/* ===== AI RECOMMENDATIONS + SIDEBAR ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">temp_preferences_custom</span>
              <h2 className="font-headline-md text-headline-md">AI Recommended</h2>
            </div>
            <Link href="/ai-matcher" className="text-primary font-label-md hover:underline">View All</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.title} className="glass-card rounded-[1.5rem] p-6 border border-white relative group overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                {/* Match Badge */}
                <div className="absolute top-0 right-0 p-4">
                  <div className="bg-secondary-container/10 text-secondary px-3 py-1 rounded-full font-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>star</span>
                    {rec.match} Match
                  </div>
                </div>
                <div className="mb-10">
                  <span className="px-2 py-1 bg-surface-container text-on-surface-variant rounded font-label-sm uppercase tracking-wider">{rec.tag}</span>
                  <h3 className="font-headline-md text-headline-md mt-2 group-hover:text-primary transition-colors">{rec.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">{rec.desc}</p>
                </div>
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <p className="font-label-sm text-on-surface-variant">Amount</p>
                    <p className="font-headline-md text-headline-md text-primary">{rec.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label-sm text-on-surface-variant">Deadline</p>
                    <p className="font-label-md text-on-surface">{rec.deadline}</p>
                  </div>
                </div>
                <Link href={`/scholarships/${rec.id}`} className="mt-4 block text-center py-2 bg-primary/5 hover:bg-primary/10 text-primary rounded-6 font-label-sm transition-colors">
                  View & Apply →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-10">
          {/* Upcoming Deadlines */}
          <div className="glass-card rounded-[1.5rem] p-6 border border-outline-variant/10 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-label-md text-on-surface">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-4">
              {deadlines.map((d) => (
                <div key={d.title} className="flex items-start gap-4 p-3 hover:bg-surface-container-low rounded-10 transition-colors cursor-pointer">
                  <div className={`${d.urgent ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'} flex flex-col items-center justify-center min-w-[48px] h-[48px] rounded-6`}>
                    <span className="font-label-sm">{d.month}</span>
                    <span className="font-bold">{d.day}</span>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface line-clamp-1">{d.title}</p>
                    <p className="font-body-sm text-on-surface-variant">{d.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/tracker" className="block mt-4 text-center text-primary font-label-sm hover:underline">View all in tracker →</Link>
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-[1.5rem] p-6 border border-outline-variant/10 shadow-sm">
            <h3 className="font-label-md text-on-surface mb-6">Recent Activity</h3>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
              {activities.length === 0 ? (
                <p className="text-on-surface-variant font-body-sm pl-8">No activity yet. Start applying!</p>
              ) : activities.map((act) => (
                <div key={act.id} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-surface-container-high flex items-center justify-center">
                    <span className={`material-symbols-outlined ${act.iconColor}`} style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                  </div>
                  <p className="font-label-sm text-on-surface">{act.title}</p>
                  <p className="font-body-sm text-on-surface-variant">{act.sub}</p>
                  <p className="text-[10px] text-outline mt-1 uppercase">{act.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
