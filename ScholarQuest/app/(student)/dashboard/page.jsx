'use client';
import { useEffect, useState } from 'react';
import StudentAnalyticsOverview from '@/components/dashboard/StudentAnalyticsOverview';
import StudentApplicationOutcomes from '@/components/dashboard/StudentApplicationOutcomes';
import StudentFundingTrends from '@/components/dashboard/StudentFundingTrends';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function DashboardPage() {
  const [stats, setStats] = useState({ matched: 0, applied: 0, accepted: 0, deadlines: 0 });
  const [trackerItems, setTrackerItems] = useState([]);
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'tracker'), where('userId', '==', user.uid));
        const unsubTracker = onSnapshot(q, (snap) => {
          setTrackerItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        
        const qSchol = query(collection(db, 'scholarships'), where('status', '==', 'Active'));
        const unsubSchol = onSnapshot(qSchol, (snap) => {
          setScholarships(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        
        return () => {
          unsubTracker();
          unsubSchol();
        };
      }
    });
    return () => unsubscribe();
  }, []);

  let appliedCount = 0;
  let acceptedCount = 0;
  let reviewCount = 0;
  let rejectedCount = 0;
  const categoryCounts = {};

  trackerItems.forEach(t => {
    if (t.columnId === 'col_applied') appliedCount++;
    else if (t.columnId === 'col_accepted') acceptedCount++;
    else if (t.columnId === 'col_review') reviewCount++;
    else if (t.columnId === 'col_rejected') rejectedCount++;

    if (t.columnId !== 'col_interested') {
      const schol = scholarships.find(s => s.id === t.scholarshipId || s.name === t.scholarshipName);
      if (schol && schol.category) {
        categoryCounts[schol.category] = (categoryCounts[schol.category] || 0) + 1;
      }
    }
  });

  const upcomingDeadlines = trackerItems
    .filter(t => ['col_interested', 'col_applied', 'col_review'].includes(t.columnId))
    .map(t => {
      const schol = scholarships.find(s => s.id === t.scholarshipId || s.name === t.scholarshipName);
      return schol ? { ...schol, trackerId: t.id } : null;
    })
    .filter(s => s && s.deadline && new Date(s.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const smartMatches = scholarships
    .filter(s => !trackerItems.some(t => t.scholarshipId === s.id || t.scholarshipName === s.name))
    .slice(0, 2);

  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map((entry, index) => {
      const colors = ['bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-primary'];
      return { label: entry[0], count: entry[1], color: colors[index % colors.length] };
    });
  const maxCategoryCount = topCategories[0]?.count || 1;

  const formatMonth = (dateStr) => new Date(dateStr).toLocaleString('default', { month: 'short' });
  const formatDay = (dateStr) => new Date(dateStr).getDate();
  const getDaysLeft = (dateStr) => Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      {/* Header Area */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-on-surface mb-1 leading-tight tracking-tight">Scholarship Overview</h2>
          <p className="text-on-surface-variant text-sm font-medium">You have {appliedCount} applications in progress. Keep up the momentum!</p>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              const { generateReport } = require('@/lib/reportUtils');
              const reportData = trackerItems.map(item => ({
                Scholarship: item.scholarshipName || item.scholarshipId || 'Unknown',
                Status: item.status || 'Pending',
                AppliedOn: item.appliedAt ? new Date(item.appliedAt).toLocaleDateString() : 'N/A'
              }));
              generateReport(reportData, 'student_report.csv');
            }}
            className="text-on-surface font-bold text-sm hover:underline tracking-wide">
            Generate Report
          </button>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-colors tracking-wide">Quick Match</button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-xs font-bold">
              <span>+14%</span>
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-xs font-bold tracking-wide mb-1 uppercase">Matched</p>
          <h3 className="text-3xl font-extrabold text-on-surface">{scholarships.length}</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] transform -rotate-45 ml-1">send</span>
            </div>
            <div className="text-on-surface font-bold text-[10px] tracking-wider uppercase bg-surface-container px-2 py-1 rounded">Last 30 days</div>
          </div>
          <p className="text-on-surface-variant text-xs font-bold tracking-wide mb-1 uppercase">Applied</p>
          <h3 className="text-3xl font-extrabold text-on-surface">{appliedCount}</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-xs font-bold tracking-wide mb-1 uppercase">Accepted</p>
          <h3 className="text-3xl font-extrabold text-on-surface">{acceptedCount}</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-error/10 text-error flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
          <p className="text-on-surface-variant text-xs font-bold tracking-wide mb-1 uppercase">Deadlines</p>
          <h3 className="text-3xl font-extrabold text-on-surface">{upcomingDeadlines.length}</h3>
        </div>
      </div>

      {/* Row 1 */}
      <div className="flex gap-6 mb-6">
        {/* Analytics Overview */}
        <div className="w-[62%] bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Analytics Overview</h3>
              <p className="text-sm text-on-surface-variant font-medium">Application Volume & Trends</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-1 flex border border-outline-variant/20">
              <button className="px-4 py-1.5 text-xs font-bold text-on-surface-variant rounded-md transition-all hover:bg-surface-container-lowest hover:text-on-surface">Weekly</button>
              <button className="px-4 py-1.5 text-xs font-bold text-on-surface bg-surface-container-lowest rounded-md shadow-sm transition-all border border-outline-variant/30">Monthly</button>
            </div>
          </div>
          <div className="w-full mt-auto">
            <StudentAnalyticsOverview />
            <div className="flex justify-between text-xs text-on-surface-variant font-bold mt-4 px-1">
              <span className="text-center w-8 -ml-4">Mon</span>
              <span className="text-center w-8">Tue</span>
              <span className="text-center w-8">Wed</span>
              <span className="text-center w-8">Thu</span>
              <span className="text-center w-8">Fri</span>
              <span className="text-center w-8">Sat</span>
              <span className="text-center w-8 -mr-4">Sun</span>
            </div>
          </div>
        </div>

        {/* Application Outcomes */}
        <div className="w-[38%] bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-on-surface">Application Outcomes</h3>
              <p className="text-sm text-on-surface-variant font-medium mt-1">Historical success rate</p>
            </div>
          </div>
          
          <StudentApplicationOutcomes accepted={acceptedCount} review={reviewCount} rejected={rejectedCount} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 mb-6">
        {/* Success by Category */}
                <div className="w-[38%] bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-on-surface mb-6">Applications by Category</h3>
          <div className="space-y-5 mt-auto">
            {topCategories.length > 0 ? topCategories.map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-2">
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden border border-outline-variant/10">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / maxCategoryCount) * 100}%` }}></div>
                </div>
              </div>
            )) : <p className="text-sm text-on-surface-variant">No applications yet.</p>}
          </div>
        </div>

        {/* Monthly Funding Trends */}
        <div className="w-[62%] bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 relative flex flex-col justify-between">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-on-surface">Monthly Funding Trends</h3>
            <span className="text-xs font-bold text-on-surface-variant">Last 6 Months</span>
          </div>
          <StudentFundingTrends />

          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-primary rounded-full text-on-primary flex items-center justify-center shadow-lg border-4 border-surface-container-lowest hover:scale-105 transition-transform z-10">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </button>
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex gap-6 pb-8">
        {/* Critical Deadlines */}
        <div className="w-[50%] bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-on-surface">Critical Deadlines</h3>
            <button className="text-xs font-bold text-primary hover:underline">View Calendar</button>
          </div>
                    <div className="space-y-4">
            {upcomingDeadlines.length > 0 ? upcomingDeadlines.map((item, idx) => {
              const daysLeft = getDaysLeft(item.deadline);
              const isUrgent = daysLeft <= 7;
              return (
                <div key={idx} className="flex items-center bg-surface-container-low rounded-xl p-4 relative border border-outline-variant/20">
                  {isUrgent && <div className="absolute left-0 top-0 bottom-0 w-1 bg-error rounded-l-xl"></div>}
                  <div className="flex flex-col items-center justify-center min-w-[50px] pr-4 border-r border-outline-variant/30 ml-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${isUrgent ? 'text-error' : 'text-on-surface-variant'}`}>{formatMonth(item.deadline)}</span>
                    <span className="text-2xl font-extrabold text-on-surface leading-none mt-1">{formatDay(item.deadline)}</span>
                  </div>
                  <div className="pl-4 flex-1">
                    <h4 className="font-bold text-on-surface text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">{item.providerName || item.category || 'Scholarship'}</p>
                  </div>
                  <div className={`text-xs font-bold ${isUrgent ? 'text-error' : 'text-on-surface'}`}>{daysLeft} Days Left</div>
                </div>
              );
            }) : <p className="text-sm text-on-surface-variant p-4">No upcoming deadlines.</p>}
          </div>
        </div>

        {/* AI Smart Matches */}
        <div className="w-[50%] bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-on-surface">AI Smart Matches</h3>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">NEW ACTIVITY</span>
          </div>

                    <div className="grid grid-cols-2 gap-4 flex-1">
            {smartMatches.length > 0 ? smartMatches.map((item, idx) => (
              <div key={idx} className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/20 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-xs font-extrabold ${idx === 0 ? 'text-primary' : 'text-secondary'} bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-sm border border-outline-variant/30`}>{item.amount || 'Varies'}</span>
                  <div className={`w-7 h-7 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm border border-outline-variant/30 ${idx === 0 ? 'text-primary' : 'text-secondary'}`}>
                    <span className="material-symbols-outlined text-[16px]">{idx === 0 ? 'stars' : 'bolt'}</span>
                  </div>
                </div>
                <h4 className="font-bold text-on-surface text-sm mb-1 leading-tight line-clamp-2">{item.name}</h4>
                <p className="text-[10px] text-on-surface-variant font-bold mb-auto">98% Fit Score</p>
                <a href={`/scholarships/${item.id}`} className={`mt-4 text-xs font-bold text-on-surface flex items-center gap-1 transition-colors ${idx === 0 ? 'hover:text-primary' : 'hover:text-secondary'}`}>
                  Review Now <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </a>
              </div>
            )) : <p className="text-sm text-on-surface-variant col-span-2 p-5">No new matches found right now.</p>}
          </div>

          <div className="mt-4 border border-dashed border-outline-variant/40 rounded-xl p-5 text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-outline mb-1">person_search</span>
            <p className="text-xs text-on-surface-variant mb-1 font-medium">Want better matches?</p>
            <button className="text-xs font-bold text-primary hover:underline">Complete your academic profile</button>
          </div>
        </div>
      </div>

    </div>
  );
}
