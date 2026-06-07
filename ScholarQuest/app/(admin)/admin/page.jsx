export const metadata = { title: 'Scholar Admin | Platform Overview' };

const kpis = [
  { icon: 'person', label: 'Total Students', value: '24,500', badge: '+12% growth', badgeCls: 'bg-green-100 text-green-700', iconCls: 'bg-primary/10 text-primary' },
  { icon: 'payments', label: 'Scholarship Value', value: '$1.2M', badge: 'Active programs', badgeCls: 'bg-surface-container-high text-on-surface-variant', iconCls: 'bg-secondary/10 text-secondary' },
  { icon: 'history_edu', label: 'Active Applications', value: '3,240', badge: 'Pending review', badgeCls: 'bg-orange-100 text-orange-700', iconCls: 'bg-tertiary-container/10 text-tertiary' },
  { icon: 'verified', label: 'Success Rate', value: '88%', badge: 'Institutional goal', badgeCls: 'bg-blue-100 text-blue-700', iconCls: 'bg-primary-container/10 text-primary-container' },
];

const submissions = [
  { initials: 'EK', color: 'bg-primary/10 text-primary', name: 'Elena Kovalev', program: 'Quantum Computing Initiative', date: 'Oct 24, 2023', score: 96, scoreWidth: '96%', status: 'Approved', statusCls: 'bg-green-100 text-green-700' },
  { initials: 'JM', color: 'bg-secondary/10 text-secondary', name: 'Julian Martinez', program: 'Global Sustainability Grant', date: 'Oct 23, 2023', score: 82, scoreWidth: '82%', status: 'New', statusCls: 'bg-blue-100 text-blue-700' },
  { initials: 'SW', color: 'bg-tertiary-container/10 text-tertiary', name: 'Sarah Wong', program: 'Arts & Humanities Fellowship', date: 'Oct 23, 2023', score: 74, scoreWidth: '74%', status: 'Pending', statusCls: 'bg-orange-100 text-orange-700' },
  { initials: 'DA', color: 'bg-primary/10 text-primary', name: 'David Adebayo', program: 'STEM Leadership Award', date: 'Oct 22, 2023', score: 91, scoreWidth: '91%', status: 'New', statusCls: 'bg-blue-100 text-blue-700' },
];

const barHeights = ['h-32', 'h-48', 'h-56', 'h-40', 'h-52', 'h-36', 'h-60'];
const barLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Platform Overview</h2>
        <p className="text-body-lg text-on-surface-variant mt-1">Real-time metrics for ScholarQuest&apos;s global application ecosystem.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-10">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="glass-card p-6 rounded-10 flex flex-col gap-2 hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-6 flex items-center justify-center ${kpi.iconCls}`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              <span className={`text-label-sm font-label-md px-2 py-1 rounded-full ${kpi.badgeCls}`}>{kpi.badge}</span>
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant mt-2">{kpi.label}</p>
            <h3 className="text-headline-lg font-headline-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>{kpi.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-10">
        {/* User Growth */}
        <div className="glass-card p-6 rounded-10 border border-outline-variant/30">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-md text-headline-md">User Growth</h4>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-surface-container-high rounded-6 text-label-sm font-label-md">7D</button>
              <button className="px-3 py-1 bg-primary text-on-primary rounded-6 text-label-sm font-label-md">30D</button>
            </div>
          </div>
          <div className="h-64 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="grad-blue" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,130 C40,120 80,140 120,100 C160,60 200,80 240,40 C280,0 320,60 360,20 L400,10" fill="none" stroke="#2563eb" strokeLinecap="round" strokeWidth="3" />
              <path d="M0,130 C40,120 80,140 120,100 C160,60 200,80 240,40 C280,0 320,60 360,20 L400,10 L400,150 L0,150 Z" fill="url(#grad-blue)" />
            </svg>
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-label-sm text-on-surface-variant pt-4">
              {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((w) => <span key={w}>{w}</span>)}
            </div>
          </div>
        </div>

        {/* Application Trends */}
        <div className="glass-card p-6 rounded-10 border border-outline-variant/30">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-md text-headline-md">Application Trends</h4>
            <button className="text-on-surface-variant cursor-pointer">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="h-64 w-full flex items-end justify-between px-2">
            {barLabels.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-2 group w-8">
                <div className={`w-full bg-secondary/20 rounded-t-lg transition-all group-hover:bg-secondary ${barHeights[i]} ${label === 'Mar' ? 'bg-secondary' : ''}`} />
                <span className={`text-label-sm ${label === 'Mar' ? 'font-bold text-secondary' : ''}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Submissions Table */}
      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
          <h4 className="font-headline-md text-headline-md">Recent Submissions</h4>
          <button className="text-primary font-label-md text-label-md hover:underline">View All Submissions</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                {['Student', 'Scholarship Program', 'Submission Date', 'Match Score', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-md">
              {submissions.map((row) => (
                <tr key={row.name} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${row.color}`}>{row.initials}</div>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{row.program}</td>
                  <td className="px-6 py-4">{row.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-outline-variant/20 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full" style={{ width: row.scoreWidth }} />
                      </div>
                      <span className="text-label-sm">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${row.statusCls}`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">open_in_new</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
