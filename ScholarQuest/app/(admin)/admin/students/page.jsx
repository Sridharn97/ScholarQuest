export const metadata = { title: 'Scholar Admin | Manage Students' };

const students = [
  { id: 1, initials: 'EK', color: 'bg-primary/10 text-primary', name: 'Elena Kovalev', email: 'elena.k@stanford.edu', program: 'Computer Science', gpa: '3.96', applications: 8, status: 'Active' },
  { id: 2, initials: 'JM', color: 'bg-secondary/10 text-secondary', name: 'Julian Martinez', email: 'j.martinez@mit.edu', program: 'Mechanical Engineering', gpa: '3.82', applications: 5, status: 'Active' },
  { id: 3, initials: 'SW', color: 'bg-tertiary-container/10 text-tertiary', name: 'Sarah Wong', email: 's.wong@arts.edu', program: 'Fine Arts', gpa: '3.74', applications: 12, status: 'Active' },
  { id: 4, initials: 'DA', color: 'bg-primary/10 text-primary', name: 'David Adebayo', email: 'david.a@harvard.edu', program: 'Biotechnology', gpa: '3.91', applications: 3, status: 'Pending' },
  { id: 5, initials: 'PR', color: 'bg-secondary/10 text-secondary', name: 'Priya Rao', email: 'p.rao@berkeley.edu', program: 'Data Science', gpa: '3.88', applications: 7, status: 'Active' },
];

const statusCls = { Active: 'bg-green-100 text-green-700', Pending: 'bg-orange-100 text-orange-700' };

export default function ManageStudents() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Manage Students</h2>
          <p className="text-body-md text-on-surface-variant mt-1">24,500 registered students on the platform</p>
        </div>
        <button className="bg-primary text-on-primary px-6 py-3 rounded-10 font-label-md text-label-md hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">person_add</span> Add Student
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-10">
        {[
          { label: 'Total Students', value: '24,500', icon: 'group', cls: 'bg-primary/10 text-primary' },
          { label: 'Active This Month', value: '18,240', icon: 'trending_up', cls: 'bg-green-100 text-green-700' },
          { label: 'Pending Verification', value: '342', icon: 'pending', cls: 'bg-orange-100 text-orange-700' },
          { label: 'Graduated', value: '5,918', icon: 'school', cls: 'bg-secondary/10 text-secondary' },
        ].map((s) => (
          <div key={s.label} className="glass-card p-6 rounded-10 border border-outline-variant/20">
            <div className={`w-10 h-10 rounded-6 flex items-center justify-center mb-3 ${s.cls}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant">{s.label}</p>
            <h4 className="font-headline-md text-headline-md">{s.value}</h4>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-10 border border-outline-variant/30 overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b border-outline-variant/30">
          <div className="relative w-full max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" style={{ fontSize: '18px' }}>search</span>
            <input type="text" placeholder="Search students..." className="w-full bg-surface-container-low border border-outline-variant rounded-6 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-surface-container-high rounded-6 text-label-sm font-label-md">All</button>
            <button className="px-3 py-2 rounded-6 text-label-sm font-label-md text-on-surface-variant hover:bg-surface-container-high">Active</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
              <tr>
                {['Student', 'Program', 'GPA', 'Applications', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${s.color}`}>{s.initials}</div>
                      <div>
                        <p className="font-semibold text-on-surface">{s.name}</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{s.program}</td>
                  <td className="px-6 py-4 font-semibold text-primary">{s.gpa}</td>
                  <td className="px-6 py-4">{s.applications}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full font-label-sm text-label-sm ${statusCls[s.status]}`}>{s.status}</span></td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-primary hover:opacity-80"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>visibility</span></button>
                      <button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span></button>
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
