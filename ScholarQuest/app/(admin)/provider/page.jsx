'use client';
import Link from 'next/link';
import useProviderDashboard from '@/lib/hooks/useProviderDashboard';
import ProviderStatusBreakdown from '@/components/dashboard/ProviderStatusBreakdown';
import ProviderApplicationTrends from '@/components/dashboard/ProviderApplicationTrends';

export default function ProviderDashboard() {
  const {
    applications,
    scholarships,
    toast,
    providerInfo,
    kpis,
    recentApplications,
    STATUS_CLS,
    handleQuickAction,
  } = useProviderDashboard();

  return (
    <div>
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Page Header */}
      <div className="mb-12">
        <h2 className="font-headline-lg text-4xl font-bold text-on-surface">Welcome back, {providerInfo.name.split(' ')[0]}</h2>
        <p className="text-on-surface-variant text-lg mt-2">{"Here is what's happening with your programs today."}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="relative overflow-hidden clean-card p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.iconCls} shadow-inner`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '20px' }}>{kpi.icon}</span>
              </div>
              <div className={`flex items-center gap-1 font-label-sm text-[11px] px-2 py-0.5 rounded-full ${kpi.badgeCls}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>trending_up</span>
                {kpi.badge}
              </div>
            </div>
            <p className="font-label-sm text-on-surface-variant mb-0.5">{kpi.label}</p>
            <h4 className="font-headline-md text-2xl text-on-surface">{kpi.value}</h4>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Application Status Breakdown */}
        <ProviderStatusBreakdown applications={applications} />

        {/* Application Trends */}
        <ProviderApplicationTrends applications={applications} />
      </div>

      {/* Recent Submissions Table */}
      <div className="clean-card rounded-2xl overflow-hidden mb-8">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
          <h4 className="font-headline-md text-xl font-semibold">Recent Submissions</h4>
          <Link href="/provider/applications" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Student</th>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Scholarship Program</th>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Submission Date</th>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Match Score</th>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Status</th>
                <th className="px-4 py-3 text-xs whitespace-nowrap align-middle">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30 text-body-md">
              {recentApplications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                    No submissions yet. Post a scholarship to get started!
                  </td>
                </tr>
              ) : recentApplications.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-3 w-full">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${row.color}`}>{row.initials}</div>
                      <span className="whitespace-nowrap text-sm">{row.student}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap align-middle text-sm">{row.scholarship}</td>
                  <td className="px-4 py-4 whitespace-nowrap align-middle text-xs">{row.submitted}</td>
                  <td className="px-4 py-4 whitespace-nowrap align-middle">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-outline-variant/20 rounded-full overflow-hidden shrink-0">
                        <div className="bg-secondary h-full" style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="text-xs font-bold whitespace-nowrap text-secondary">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap align-middle">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${STATUS_CLS[row.status]}`}>{row.status}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap align-middle">
                    <div className="flex gap-0.5">
                      {row.status !== 'Approved' && (
                        <button
                          onClick={() => handleQuickAction(row.id, 'Approved')}
                          className="w-7 h-7 flex items-center justify-center text-green-600 hover:bg-green-50 rounded-6 transition-colors shrink-0"
                          title="Approve"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        </button>
                      )}
                      {row.status !== 'Rejected' && (
                        <button
                          onClick={() => handleQuickAction(row.id, 'Rejected')}
                          className="w-7 h-7 flex items-center justify-center text-error hover:bg-error/10 rounded-6 transition-colors shrink-0"
                          title="Reject"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>cancel</span>
                        </button>
                      )}
                      <Link href="/provider/applications" className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary/10 rounded-6 transition-colors shrink-0" title="View All">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                      </Link>
                    </div>
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
