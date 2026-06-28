'use client';
import Link from 'next/link';
import useProviderScholarships from '@/lib/hooks/useProviderScholarships';

const STATUS_CLS = {
  Active: 'bg-green-100 text-green-700',
  Draft: 'bg-surface-variant text-on-surface-variant',
  Closed: 'bg-outline-variant/30 text-on-surface-variant',
};

export default function ProviderScholarshipsPage() {
  const {
    scholarships,
    search,
    setSearch,
    activeFilter,
    setActiveFilter,
    toast,
    deleteConfirm,
    setDeleteConfirm,
    handleToggleStatus,
    handleDelete,
    filtered,
  } = useProviderScholarships();

  const getAvatars = (applicants) => {
    if (!applicants || applicants < 2) {
      return <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] font-bold text-on-primary-container border-2 border-white z-10">S</div>;
    }
    if (applicants > 100) {
      return (
        <>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700 border-2 border-white z-10">JD</div>
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-[10px] font-bold text-pink-700 border-2 border-white z-20">ML</div>
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700 border-2 border-white z-30">+{applicants - 2}</div>
        </>
      );
    }
    return (
      <>
        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[10px] font-bold text-purple-700 border-2 border-white z-10">AK</div>
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-[10px] font-bold text-orange-700 border-2 border-white z-20">RB</div>
      </>
    );
  };

  return (
    <div>
      {toast && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-label-md">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center" onClick={e => e.stopPropagation()}>
            <span className="material-symbols-outlined text-error text-[48px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>delete_forever</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Delete Scholarship?</h3>
            <p className="font-body-md text-on-surface-variant mb-8">This will remove the program permanently. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 border border-outline-variant rounded-xl font-label-md text-on-surface hover:bg-surface-container-low transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 bg-error text-white rounded-xl font-label-md hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Posted Scholarships</h2>
          <p className="text-body-lg text-on-surface-variant mt-2">{"Manage, track, and optimize your organization's funding opportunities."}</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '20px' }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search programs..."
              className="w-56 bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="relative">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none bg-surface-container-lowest border border-outline-variant/30 rounded-xl py-2.5 pl-4 pr-10 text-sm font-label-md text-on-surface outline-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
              <option value="Draft">Draft</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-[18px]">expand_more</span>
          </div>
          <Link
            href="/provider/scholarships/new"
            className="flex items-center gap-2 bg-primary text-white font-label-md px-5 py-2.5 rounded-xl hover:opacity-90 hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm shadow-primary/25 text-sm whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Post New Scholarship
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Active Programs', value: scholarships.filter(s => s.status === 'Active').length, icon: 'verified_user', cls: 'bg-primary/10 text-primary', trend: '', trendUp: true },
          { label: 'Total Applicants', value: scholarships.reduce((acc, curr) => acc + (curr.applicants || 0), 0).toLocaleString(), icon: 'group', cls: 'bg-blue-100 text-blue-700', trend: '', trendUp: true },
          { label: 'Total Awarded', value: `$${scholarships.reduce((acc, curr) => acc + (Number(curr.amount?.toString().replace(/[^0-9.-]+/g,"")) || 0), 0).toLocaleString()}`, icon: 'payments', cls: 'bg-green-100 text-green-700', trend: '', trendUp: true },
          { label: 'Pending Review', value: '0', icon: 'schedule', cls: 'bg-orange-100 text-orange-700', trend: '', trendUp: false },
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((program) => (
          <div key={program.id} className="clean-card p-5 rounded-2xl flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative">
            <div className="flex justify-between items-start mb-3">
              <span className={`px-2 py-0.5 rounded-full font-label-sm text-[10px] uppercase tracking-wider ${STATUS_CLS[program.status] || STATUS_CLS.Draft}`}>
                {program.status}
              </span>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleToggleStatus(program.id, program.status)}
                  className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-full transition-colors"
                  title="Toggle Status"
                >
                  <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                </button>
                <button 
                  onClick={() => setDeleteConfirm(program.id)}
                  className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
            
            <h3 className="font-headline-md text-lg text-on-surface mb-0.5 line-clamp-2 pr-4">{program.name}</h3>
            <p className="font-body-sm text-[13px] text-on-surface-variant mb-3">{program.category || 'STEM'}</p>
            
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-headline-md text-xl text-primary font-bold">{program.amount}</span>
              <span className="font-label-sm text-[11px] text-on-surface-variant">Total Grant</span>
            </div>

            <div className="bg-surface-container-lowest rounded-xl p-3.5 flex justify-between items-center mb-5 border border-outline-variant/30">
              <div>
                <div className="font-label-sm text-[9px] text-on-surface-variant uppercase tracking-widest mb-0.5">Applicants</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-headline-md text-lg text-on-surface">{program.applicants || 0}</span>
                  <span className={`font-label-sm text-[10px] ${program.status === 'Closed' ? 'text-on-surface-variant' : 'text-green-600'}`}>
                    {program.status === 'Closed' ? 'Final Count' : '+0 today'}
                  </span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {getAvatars(program.applicants)}
              </div>
            </div>

            <div className="mt-auto">
              {program.status === 'Closed' ? (
                <Link href="/provider/reports" className="w-full block text-center bg-surface-container text-on-surface font-label-md py-2.5 px-4 rounded-xl hover:bg-surface-container-high transition-colors text-sm">
                  View Report
                </Link>
              ) : (
                <Link href="/provider/applications" className="w-full block text-center bg-primary text-white font-label-md py-2.5 px-4 rounded-xl hover:opacity-90 transition-opacity text-sm">
                  Manage Applicants
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Post New Scholarship Card */}
        <Link href="/provider/scholarships/new" className="clean-card rounded-2xl border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center h-full min-h-[300px] hover:bg-surface-container-lowest hover:border-primary/50 transition-all group p-5 text-center shadow-none hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </div>
          <h3 className="font-headline-md text-lg text-on-surface mb-1 group-hover:text-primary transition-colors">Post New Scholarship</h3>
          <p className="font-body-md text-sm text-on-surface-variant max-w-[200px]">Reach thousands of eligible students today.</p>
        </Link>
      </div>
    </div>
  );
}
