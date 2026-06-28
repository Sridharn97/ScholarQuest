'use client';
import Link from 'next/link';
import useProviderDashboard from '@/lib/hooks/useProviderDashboard';
import ProviderStatusBreakdown from '@/components/dashboard/ProviderStatusBreakdown';
import ProviderApplicationTrends from '@/components/dashboard/ProviderApplicationTrends';
import ProviderEducationLevelChart from '@/components/dashboard/ProviderEducationLevelChart';
import ProviderMonthlyOverviewChart from '@/components/dashboard/ProviderMonthlyOverviewChart';

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

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Education Level Donut */}
        <ProviderEducationLevelChart applications={applications} />

        {/* Monthly Applications Overview */}
        <ProviderMonthlyOverviewChart applications={applications} />
      </div>
    </div>
  );
}
