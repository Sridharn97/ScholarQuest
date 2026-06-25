import ProviderMonthlyActivity from '@/components/dashboard/ProviderMonthlyActivity';
import ProviderCategoryBreakdown from '@/components/dashboard/ProviderCategoryBreakdown';

export const metadata = { title: 'Sponsor Portal | Reports & Analytics' };

const topScholarships = [
  { name: 'Global Tech Innovators Fund', applicants: 142, awarded: 12, rate: '8.4%' },
  { name: 'Future Leaders Foundation', applicants: 87, awarded: 8, rate: '9.2%' },
  { name: 'Women in Tech Grant', applicants: 203, awarded: 15, rate: '7.4%' },
  { name: 'Green Future Fund', applicants: 56, awarded: 5, rate: '8.9%' },
];

const monthlyData = [
  { month: 'Jan', applications: 320, awarded: 28 },
  { month: 'Feb', applications: 480, awarded: 42 },
  { month: 'Mar', applications: 620, awarded: 56 },
  { month: 'Apr', applications: 410, awarded: 35 },
  { month: 'May', applications: 540, awarded: 48 },
  { month: 'Jun', applications: 390, awarded: 31 },
];

export default function ProviderReportsPage() {
  return (
    <div>
      <div className="mb-12">
        <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Reports & Analytics</h2>
        <p className="text-body-lg text-on-surface-variant mt-2">Insights into scholarship disbursements and application activity</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Submissions', value: '528', trend: '+14% MoM', trendUp: true, icon: 'description', cls: 'bg-primary/10 text-primary' },
          { label: 'Grants Funded', value: '40', trend: '+10% MoM', trendUp: true, icon: 'check_circle', cls: 'bg-green-100 text-green-700' },
          { label: 'Total Funds Disbursed', value: '$850,000', trend: '+15% YoY', trendUp: true, icon: 'payments', cls: 'bg-secondary/10 text-secondary' },
          { label: 'Avg. Match score', value: '92%', trend: '+2pts', trendUp: true, icon: 'psychiatry', cls: 'bg-blue-100 text-blue-700' },
        ].map((stat) => (
          <div key={stat.label} className="relative overflow-hidden clean-card p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.cls} shadow-inner`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>{stat.icon}</span>
              </div>
              <div className={`flex items-center gap-1 font-label-sm text-[11px] px-2 py-0.5 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{stat.trendUp ? 'trending_up' : 'priority_high'}</span>
                {stat.trend}
              </div>
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
        <ProviderCategoryBreakdown />
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
          <tbody className="divide-y divide-outline-variant/30">
            {topScholarships.map((s) => (
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
