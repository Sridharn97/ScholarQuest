export const metadata = { title: 'Scholar Admin | Reports & Analytics' };

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

const maxVal = Math.max(...monthlyData.map((d) => d.applications));

export default function ReportsPage() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Reports & Analytics</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Comprehensive insights into platform performance</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-10">
        {[
          { label: 'Total Applications', value: '3,240', trend: '+18% MoM', trendf: 'text-green-600' },
          { label: 'Scholarships Awarded', value: '248', trend: '+12% MoM', trendf: 'text-green-600' },
          { label: 'Total Value Distributed', value: '$2.8M', trend: '+22% YoY', trendf: 'text-green-600' },
          { label: 'Avg. Match Score', value: '87%', trend: '+3pts', trendf: 'text-green-600' },
        ].map((k) => (
          <div key={k.label} className="glass-card p-6 rounded-10 border border-outline-variant/20">
            <p className="font-label-sm text-label-sm text-on-surface-variant mb-1">{k.label}</p>
            <h4 className="font-headline-md text-headline-md mb-1">{k.value}</h4>
            <span className={`font-label-sm text-label-sm ${k.trendf}`}>{k.trend}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter mb-10">
        {/* Monthly Applications Bar Chart */}
        <div className="glass-card p-6 rounded-10 border border-outline-variant/30">
          <h4 className="font-headline-md text-headline-md mb-6">Monthly Applications vs. Awards</h4>
          <div className="space-y-3">
            {monthlyData.map((d) => (
              <div key={d.month} className="flex items-center gap-4">
                <span className="font-label-sm text-label-sm text-on-surface-variant w-8">{d.month}</span>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(d.applications / maxVal) * 100}%` }} />
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${(d.awarded / maxVal) * 100}%` }} />
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant w-12 text-right">{d.applications}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-full" /><span className="font-label-sm text-label-sm text-on-surface-variant">Applications</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-secondary rounded-full" /><span className="font-label-sm text-label-sm text-on-surface-variant">Awards</span></div>
          </div>
        </div>

        {/* Category Breakdown Donut */}
        <div className="glass-card p-6 rounded-10 border border-outline-variant/30">
          <h4 className="font-headline-md text-headline-md mb-6">Applications by Category</h4>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                {/* STEM 42% */}
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#004ac6" strokeWidth="20" strokeDasharray="132 212" />
                {/* Leadership 28% */}
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#712ae2" strokeWidth="20" strokeDasharray="88 212" strokeDashoffset="-132" />
                {/* Arts 18% */}
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#943700" strokeWidth="20" strokeDasharray="56.6 212" strokeDashoffset="-220" />
                {/* Other 12% */}
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#c3c6d7" strokeWidth="20" strokeDasharray="37.7 212" strokeDashoffset="-276.6" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-md text-headline-md">3,240</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Total</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'STEM', pct: '42%', color: 'bg-primary' },
              { label: 'Leadership', pct: '28%', color: 'bg-secondary' },
              { label: 'Arts', pct: '18%', color: 'bg-tertiary' },
              { label: 'Other', pct: '12%', color: 'bg-outline-variant' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${c.color}`} />
                <span className="font-body-sm text-body-sm text-on-surface-variant">{c.label}</span>
                <span className="font-label-sm text-label-sm font-bold ml-auto">{c.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Scholarships Table */}
      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30">
          <h4 className="font-headline-md text-headline-md">Top Performing Scholarships</h4>
        </div>
        <table className="w-full text-left">
          <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
            <tr>
              {['Scholarship', 'Applications', 'Awarded', 'Success Rate'].map((h) => (
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
