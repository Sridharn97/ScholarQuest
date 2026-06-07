export const metadata = { title: 'Scholar Admin | Manage Scholarships' };

const scholarships = [
  { id: 1, name: 'Global Tech Innovators Fund', category: 'STEM', amount: '$25,000', deadline: 'Oct 15, 2024', applicants: 142, status: 'Active' },
  { id: 2, name: 'Future Leaders Foundation', category: 'Leadership', amount: '$10,000', deadline: 'Nov 02, 2024', applicants: 87, status: 'Active' },
  { id: 3, name: 'Women in Tech Grant', category: 'STEM', amount: '$12,000', deadline: 'Oct 30, 2024', applicants: 203, status: 'Active' },
  { id: 4, name: 'Green Future Fund', category: 'International', amount: '$8,500', deadline: 'Dec 01, 2024', applicants: 56, status: 'Draft' },
  { id: 5, name: 'Visual Arts Merit Award', category: 'Creative', amount: '$20,000', deadline: 'Jan 15, 2025', applicants: 31, status: 'Active' },
];

const statusCls = { Active: 'bg-green-100 text-green-700', Draft: 'bg-orange-100 text-orange-700', Closed: 'bg-surface-container-high text-on-surface-variant' };

export default function ManageScholarships() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Manage Scholarships</h2>
          <p className="text-body-md text-on-surface-variant mt-1">{scholarships.length} active scholarship programs</p>
        </div>
        <a href="/admin/scholarships/new" className="bg-primary text-on-primary px-6 py-3 rounded-10 font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">add</span> Add Scholarship
        </a>
      </div>

      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
          <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '18px' }}>search</span>
            <input type="text" placeholder="Search scholarships..." className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-surface-container-high rounded-6 text-label-sm font-label-md">All</button>
            <button className="px-3 py-2 rounded-6 text-label-sm font-label-md text-on-surface-variant hover:bg-surface-container-high">Active</button>
            <button className="px-3 py-2 rounded-6 text-label-sm font-label-md text-on-surface-variant hover:bg-surface-container-high">Draft</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                {['Scholarship', 'Category', 'Amount', 'Deadline', 'Applicants', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {scholarships.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4 font-semibold text-on-surface">{s.name}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-primary/10 text-primary rounded font-label-sm text-label-sm">{s.category}</span></td>
                  <td className="px-6 py-4 font-semibold text-primary">{s.amount}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.deadline}</td>
                  <td className="px-6 py-4">{s.applicants}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${statusCls[s.status]}`}>{s.status}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:opacity-80 transition-opacity"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span></button>
                      <button className="text-error hover:opacity-80 transition-opacity"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span></button>
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
