'use client';
import { useState } from 'react';
import Link from 'next/link';

const applications = [
  { id: 1, initials: 'EK', color: 'bg-primary/10 text-primary', student: 'Elena Kovalev', scholarship: 'Quantum Computing Initiative', submitted: 'Oct 24, 2024', score: 96, status: 'Approved', statusCls: 'bg-green-100 text-green-700' },
  { id: 2, initials: 'JM', color: 'bg-secondary/10 text-secondary', student: 'Julian Martinez', scholarship: 'Global Sustainability Grant', submitted: 'Oct 23, 2024', score: 82, status: 'Under Review', statusCls: 'bg-blue-100 text-blue-700' },
  { id: 3, initials: 'SW', color: 'bg-tertiary-container/10 text-tertiary', student: 'Sarah Wong', scholarship: 'Arts & Humanities Fellowship', submitted: 'Oct 23, 2024', score: 74, status: 'Pending', statusCls: 'bg-orange-100 text-orange-700' },
  { id: 4, initials: 'DA', color: 'bg-primary/10 text-primary', student: 'David Adebayo', scholarship: 'STEM Leadership Award', submitted: 'Oct 22, 2024', score: 91, status: 'Under Review', statusCls: 'bg-blue-100 text-blue-700' },
  { id: 5, initials: 'PR', color: 'bg-secondary/10 text-secondary', student: 'Priya Rao', scholarship: 'Data Science Excellence Grant', submitted: 'Oct 21, 2024', score: 88, status: 'Approved', statusCls: 'bg-green-100 text-green-700' },
  { id: 6, initials: 'TS', color: 'bg-tertiary-container/10 text-tertiary', student: 'Tomas Sousa', scholarship: 'International Leadership Fund', submitted: 'Oct 20, 2024', score: 67, status: 'Rejected', statusCls: 'bg-error-container text-on-error-container' },
];

export default function AdminApplicationsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Pending', 'Under Review', 'Approved', 'Rejected'];

  const filtered = activeFilter === 'All' ? applications : applications.filter(a => a.status === activeFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Applications</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Review and manage all scholarship applications</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-10 font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">download</span>
          Export CSV
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-10">
        {[
          { label: 'Total Applications', value: '3,240', icon: 'description', cls: 'bg-primary/10 text-primary' },
          { label: 'Under Review', value: '842', icon: 'pending', cls: 'bg-blue-100 text-blue-700' },
          { label: 'Approved', value: '248', icon: 'check_circle', cls: 'bg-green-100 text-green-700' },
          { label: 'Avg. Processing Time', value: '3.2 days', icon: 'schedule', cls: 'bg-secondary/10 text-secondary' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-10 border border-outline-variant/20">
            <div className={`w-10 h-10 rounded-6 flex items-center justify-center mb-3 ${stat.cls}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</p>
            <h4 className="font-headline-md text-headline-md">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-b border-outline-variant/30">
          <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '18px' }}>search</span>
            <input type="text" placeholder="Search applications..." className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-2 rounded-6 text-label-sm font-label-md transition-all ${activeFilter === f ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                {['Student', 'Scholarship', 'Submitted', 'Match Score', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${row.color}`}>{row.initials}</div>
                      <span className="font-semibold text-on-surface">{row.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.scholarship}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.submitted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-outline-variant/20 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full rounded-full" style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="text-label-sm font-semibold">{row.score}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${row.statusCls}`}>{row.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:opacity-80 transition-opacity" title="View">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>open_in_new</span>
                      </button>
                      <button className="text-green-600 hover:opacity-80 transition-opacity" title="Approve">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
                      </button>
                      <button className="text-error hover:opacity-80 transition-opacity" title="Reject">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>cancel</span>
                      </button>
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
