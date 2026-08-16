'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
  const [analyticsPeriod, setAnalyticsPeriod] = useState('weekly');
  const [dateFilter, setDateFilter] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  useEffect(() => {
    let unsubTracker = null;
    let unsubSchol = null;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'tracker'), where('userId', '==', user.uid));
        unsubTracker = onSnapshot(q, (snap) => {
          setTrackerItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => console.error("Tracker snapshot error:", error));
        
        const qSchol = query(collection(db, 'scholarships'), where('status', '==', 'Active'));
        unsubSchol = onSnapshot(qSchol, (snap) => {
          setScholarships(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        }, (error) => console.error("Scholarships snapshot error:", error));
      } else {
        if (unsubTracker) unsubTracker();
        if (unsubSchol) unsubSchol();
      }
    });

    return () => {
      unsubscribe();
      if (unsubTracker) unsubTracker();
      if (unsubSchol) unsubSchol();
    };
  }, []);

  const filterDateObj = (dateObj) => {
    if (!dateObj || isNaN(dateObj.getTime())) return true;
    const today = new Date();
    
    if (dateFilter === 'today') {
      return dateObj.toDateString() === today.toDateString();
    }
    if (dateFilter === 'week') {
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      firstDayOfWeek.setHours(0, 0, 0, 0);
      return dateObj >= firstDayOfWeek;
    }
    if (dateFilter === 'month') {
      return dateObj.getMonth() === today.getMonth() && dateObj.getFullYear() === today.getFullYear();
    }
    if (dateFilter === 'year') {
      return dateObj.getFullYear() === today.getFullYear();
    }
    if (dateFilter === 'custom') {
      if (customStartDate) {
        const start = new Date(customStartDate);
        start.setHours(0, 0, 0, 0);
        if (dateObj < start) return false;
      }
      if (customEndDate) {
        const end = new Date(customEndDate);
        end.setHours(23, 59, 59, 999);
        if (dateObj > end) return false;
      }
      return true;
    }
    return true;
  };

  const filteredTrackerItems = trackerItems.filter(t => {
    if (dateFilter === 'all') return true;
    let dateObj = null;
    if (t.appliedAt) dateObj = new Date(t.appliedAt);
    else if (t.updatedAt) dateObj = new Date(t.updatedAt);
    else if (t.createdAt) dateObj = new Date(t.createdAt);
    return filterDateObj(dateObj);
  });

  let appliedCount = 0;
  let acceptedCount = 0;
  let reviewCount = 0;
  let rejectedCount = 0;
  const categoryCounts = {};

  filteredTrackerItems.forEach(t => {
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

  const upcomingDeadlines = filteredTrackerItems
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

  const getAnalyticsData = () => {
    const countsByDate = {};
    filteredTrackerItems.forEach(t => {
      let dateObj = null;
      if (t.appliedAt) dateObj = new Date(t.appliedAt);
      else if (t.updatedAt) dateObj = new Date(t.updatedAt);
      else if (t.createdAt) dateObj = new Date(t.createdAt);
      
      if (dateObj && !isNaN(dateObj.getTime())) {
        const dateString = dateObj.toISOString().split('T')[0];
        countsByDate[dateString] = (countsByDate[dateString] || 0) + 1;
      }
    });

    const today = new Date();
    
    if (analyticsPeriod === 'weekly') {
      const data = [];
      const labels = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateString = d.toISOString().split('T')[0];
        data.push(countsByDate[dateString] || 0);
        labels.push(d.toLocaleDateString('default', { weekday: 'short' }));
      }
      return { data, labels };
    } else {
      const data = [];
      const labels = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(today.getMonth() - i);
        const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        let monthCount = 0;
        Object.keys(countsByDate).forEach(key => {
          if (key.startsWith(monthKey)) monthCount += countsByDate[key];
        });
        data.push(monthCount);
        labels.push(d.toLocaleDateString('default', { month: 'short' }));
      }
      return { data, labels };
    }
  };

  const { data: chartData, labels: chartLabels } = getAnalyticsData();

  const getFundingData = () => {
    const today = new Date();
    const data = [];
    const labels = [];
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(today.getMonth() - i);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      
      let totalAmount = 0;
      
      filteredTrackerItems.forEach(t => {
        let dateObj = null;
        if (t.appliedAt) dateObj = new Date(t.appliedAt);
        else if (t.updatedAt) dateObj = new Date(t.updatedAt);
        else if (t.createdAt) dateObj = new Date(t.createdAt);
        
        if (dateObj && !isNaN(dateObj.getTime())) {
          const itemMonthKey = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
          if (itemMonthKey === monthKey) {
            const schol = scholarships.find(s => s.id === t.scholarshipId || s.name === t.scholarshipName);
            let amt = 0;
            if (schol && schol.amount) {
              if (typeof schol.amount === 'number') {
                amt = schol.amount;
              } else if (typeof schol.amount === 'string') {
                const numStr = schol.amount.replace(/,/g, '').match(/\d+/);
                if (numStr) amt = parseInt(numStr[0], 10);
              }
            }
            totalAmount += amt;
          }
        }
      });
      
      data.push(totalAmount);
      labels.push(d.toLocaleDateString('default', { month: 'short' }));
    }
    
    return { data, labels };
  };

  const { data: fundingData, labels: fundingLabels } = getFundingData();

  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      {/* Header Area */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-on-surface mb-1 leading-tight tracking-tight">Scholarship Overview</h2>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-full shadow-sm ring-1 ring-slate-900/5">
          <Link href="/calculator" className="text-primary font-semibold text-sm hover:bg-primary/5 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">calculate</span>
            Funding Gap
          </Link>
          <button 
            onClick={() => {
              const { generateReport } = require('@/lib/reportUtils');
              const reportData = filteredTrackerItems.map(item => ({
                Scholarship: item.scholarshipName || item.scholarshipId || 'Unknown',
                Status: item.status || 'Pending',
                AppliedOn: item.appliedAt ? new Date(item.appliedAt).toLocaleDateString() : 'N/A'
              }));
              generateReport(reportData, 'student_report.csv');
            }}
            className="text-slate-700 font-semibold text-sm hover:bg-slate-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2">
            Generate Report
          </button>

          {dateFilter === 'custom' && (
            <div className="flex items-center gap-2 px-2 border-l border-slate-100">
              <input 
                type="date" 
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="bg-transparent text-slate-700 px-2 py-1.5 font-medium text-sm focus:outline-none focus:text-primary transition-colors cursor-pointer"
              />
              <span className="text-slate-400 text-sm font-medium">to</span>
              <input 
                type="date" 
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="bg-transparent text-slate-700 px-2 py-1.5 font-medium text-sm focus:outline-none focus:text-primary transition-colors cursor-pointer"
              />
            </div>
          )}

          <div className="relative border-l border-slate-100">
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold text-sm pl-4 pr-10 py-2 focus:outline-none appearance-none cursor-pointer hover:text-primary transition-colors"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[20px]">
              expand_more
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Matched</p>
            <div className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide">
              <span>+14%</span>
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
            </div>
          </div>
          <h3 className="text-[36px] font-bold text-slate-900 leading-none">{scholarships.length}</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Applied</p>
            <div className="text-indigo-700 font-bold text-[10px] tracking-wider uppercase bg-indigo-50 px-2.5 py-1 rounded-md">Last 30 days</div>
          </div>
          <h3 className="text-[36px] font-bold text-slate-900 leading-none">{appliedCount}</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Accepted</p>
          </div>
          <h3 className="text-[36px] font-bold text-slate-900 leading-none">{acceptedCount}</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm ring-1 ring-slate-900/5 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase mt-1">Deadlines</p>
          </div>
          <h3 className="text-[36px] font-bold text-slate-900 leading-none">{upcomingDeadlines.length}</h3>
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
              <button 
                onClick={() => setAnalyticsPeriod('weekly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${analyticsPeriod === 'weekly' ? 'bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface'}`}>Weekly</button>
              <button 
                onClick={() => setAnalyticsPeriod('monthly')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${analyticsPeriod === 'monthly' ? 'bg-surface-container-lowest text-on-surface shadow-sm border border-outline-variant/30' : 'text-on-surface-variant hover:bg-surface-container-lowest hover:text-on-surface'}`}>Monthly</button>
            </div>
          </div>
          <div className="w-full mt-auto">
            <StudentAnalyticsOverview data={chartData} />
            <div className="flex justify-between text-xs text-on-surface-variant font-bold mt-4 px-1">
              {chartLabels.map((label, idx) => (
                <span key={idx} className={`text-center w-8 ${idx === 0 ? '-ml-4' : ''} ${idx === chartLabels.length - 1 ? '-mr-4' : ''}`}>{label}</span>
              ))}
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
        <div className="flex-1 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-on-surface mb-6">Applications by Category</h3>
          <div className="h-[200px] mt-8 relative flex items-end justify-between px-2 pb-6 border-b border-slate-100">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
              <div className="w-full border-t border-slate-100/60 flex-1"></div>
              <div className="w-full border-t border-slate-100/60 flex-1"></div>
              <div className="w-full border-t border-slate-100/60"></div>
            </div>

            {topCategories.length > 0 ? topCategories.map((item, idx) => {
              const heightPercentage = (item.count / maxCategoryCount) * 100;
              return (
                <div key={item.label} className="relative flex flex-col justify-end items-center group w-[15%] h-full z-10">
                  {/* Tooltip */}
                  <div className="absolute -top-10 bg-slate-800 text-white text-[10px] font-medium px-2 py-1.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 text-center">
                    <div className="font-bold">{item.label}</div>
                    <div className="text-slate-300">{item.count} Applications</div>
                  </div>

                  {/* Vertical Bar */}
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-300 ease-in-out hover:opacity-80 ${item.color.replace('bg-', 'bg-').replace('500', '600')}`} // Ensure color is vibrant
                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                  ></div>

                  {/* X-Axis Label */}
                  <div className="absolute -bottom-6 text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate w-[150%] text-center">
                    {item.label}
                  </div>
                </div>
              );
            }) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">No applications yet.</div>
            )}
          </div>
        </div>

        {/* Monthly Funding Trends */}
        <div className="flex-1 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 relative flex flex-col justify-between">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-on-surface">Monthly Funding Trends</h3>
            <span className="text-xs font-bold text-on-surface-variant">Last 6 Months</span>
          </div>
          <StudentFundingTrends data={fundingData} labels={fundingLabels} />
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
                  <span className={`text-xs font-extrabold ${idx === 0 ? 'text-primary' : 'text-secondary'} bg-surface-container-lowest px-2.5 py-1 rounded-md shadow-sm border border-outline-variant/30`}>{typeof item.amount === 'string' ? item.amount.replace(/\$/g, '₹') : (item.amount || 'Varies')}</span>
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
