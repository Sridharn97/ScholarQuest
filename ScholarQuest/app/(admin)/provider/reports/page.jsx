'use client';
import ProviderMonthlyActivity from '@/components/dashboard/ProviderMonthlyActivity';
import ProviderCategoryBreakdown from '@/components/dashboard/ProviderCategoryBreakdown';
import useProviderDashboard from '@/lib/hooks/useProviderDashboard';

export default function ProviderReportsPage() {
  const { applications, scholarships } = useProviderDashboard();

  const totalApps = applications.length;
  const funded = applications.filter(a => a.status === 'Approved').length;
  const totalFunds = scholarships.reduce((acc, curr) => acc + (Number(curr.amount?.toString().replace(/[^0-9.-]+/g, "")) || 0), 0);
  const avgScore = applications.length ? Math.round(applications.reduce((acc, curr) => acc + (curr.score || 0), 0) / applications.length) : 0;

  // Monthly Data calculation
  const now = new Date();
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.toLocaleString('default', { month: 'short' });
    const appsThisMonth = applications.filter(a => {
      const ad = new Date(a.appliedAt || a.createdAt || new Date());
      return ad.getMonth() === d.getMonth() && ad.getFullYear() === d.getFullYear();
    });
    monthlyData.push({
      month,
      applications: appsThisMonth.length,
      awarded: appsThisMonth.filter(a => a.status === 'Approved').length
    });
  }

  // Top Scholarships
  const topScholarships = scholarships.map(s => {
    const sApps = applications.filter(a => a.scholarshipId === s.id || a.scholarship === s.name);
    const sFunded = sApps.filter(a => a.status === 'Approved').length;
    return {
      name: s.name || 'Unnamed',
      applicants: sApps.length,
      awarded: sFunded,
      rate: sApps.length ? `${Math.round((sFunded / sApps.length) * 100)}%` : '0%'
    };
  }).sort((a, b) => b.applicants - a.applicants).slice(0, 4);

  // Category Breakdown calculation
  const categoryCounts = {};
  scholarships.forEach(s => {
    const cat = s.category || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  const totalSchols = scholarships.length || 1;
  const colors = ['bg-[#004ac6]', 'bg-[#712ae2]', 'bg-[#c3c6d7]', 'bg-green-500', 'bg-orange-500'];
  const hexColors = ['#004ac6', '#712ae2', '#c3c6d7', '#22c55e', '#f97316'];

  const categories = Object.keys(categoryCounts).map((cat, i) => {
    const count = categoryCounts[cat];
    return {
      label: cat,
      count,
      pctString: `${Math.round((count / totalSchols) * 100)}%`,
      colorClass: colors[i % colors.length],
      hex: hexColors[i % hexColors.length]
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Reports & Analytics</h2>
          <p className="text-body-lg text-on-surface-variant mt-2">Insights into scholarship disbursements and application activity</p>
        </div>
        <button 
          onClick={() => {
            const { generateReport } = require('@/lib/reportUtils');
            const reportData = applications.map(a => ({
                Student: a.student || 'Unknown',
                Scholarship: a.scholarship || 'Unknown',
                Status: a.status || 'Pending',
                Score: a.score ? `${a.score}%` : 'N/A',
                SubmittedAt: a.appliedAt || a.createdAt || 'N/A'
            }));
            generateReport(reportData, 'provider_report.csv');
          }}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-colors tracking-wide flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Generate Report
        </button>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Submissions', value: totalApps.toString(), trend: '', trendUp: true, icon: 'description', cls: 'bg-primary/10 text-primary' },
          { label: 'Grants Funded', value: funded.toString(), trend: '', trendUp: true, icon: 'check_circle', cls: 'bg-green-100 text-green-700' },
          { label: 'Total Funds Disbursed', value: `$${totalFunds.toLocaleString()}`, trend: '', trendUp: true, icon: 'payments', cls: 'bg-secondary/10 text-secondary' },
          { label: 'Avg. Match score', value: `${avgScore}%`, trend: '', trendUp: true, icon: 'psychiatry', cls: 'bg-blue-100 text-blue-700' },
        ].map((stat) => (
          <div key={stat.label} className="relative overflow-hidden clean-card p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.cls} shadow-inner`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>{stat.icon}</span>
              </div>
              {stat.trend && (
                <div className={`flex items-center gap-1 font-label-sm text-[11px] px-2 py-0.5 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{stat.trendUp ? 'trending_up' : 'priority_high'}</span>
                  {stat.trend}
                </div>
              )}
            </div>
            <p className="font-label-sm text-on-surface-variant mb-0.5">{stat.label}</p>
            <h4 className="font-headline-md text-2xl text-on-surface">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Monthly Applications Bar Chart */}
        <ProviderMonthlyActivity monthlyData={monthlyData} />

        {/* Category Breakdown Donut */}
        <ProviderCategoryBreakdown categories={categories} totalCount={scholarships.length} />
      </div>

      {/* Top Scholarships Table */}
      <div className="clean-card rounded-2xl overflow-hidden mb-12">
        <div className="p-8 border-b border-outline-variant/30">
          <h4 className="font-headline-md text-xl font-semibold">Posted Programs Performance</h4>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
            <tr>
              {['Program Name', 'Submissions', 'Funded Grants', 'Funding Success Rate'].map((h) => (
                <th key={h} className="px-6 py-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30 text-sm">
            {topScholarships.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                  No programs posted yet.
                </td>
              </tr>
            ) : topScholarships.map((s) => (
              <tr key={s.name} className="hover:bg-surface-container-low transition-colors">
                <td className="px-6 py-4 font-semibold">{s.name}</td>
                <td className="px-6 py-4">{s.applicants}</td>
                <td className="px-6 py-4 text-secondary font-semibold">{s.awarded}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-outline-variant/20 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: s.rate }} />
                    </div>
                    <span className="font-label-sm text-label-sm">{s.rate}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
