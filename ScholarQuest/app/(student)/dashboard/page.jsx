'use client';

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-[1200px] mx-auto font-sans">
      {/* Header Area */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#0A2540] mb-1 leading-tight tracking-tight">Scholarship Overview</h2>
          <p className="text-[#64748B] text-sm font-medium">You have 12 applications in progress. Keep up the momentum!</p>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-[#0A2540] font-bold text-sm hover:underline tracking-wide">Generate Report</button>
          <button className="bg-[#4F39F6] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-[#4330d3] transition-colors tracking-wide">Quick Match</button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#EAF0FF] text-[#3B82F6] flex items-center justify-center">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
            <div className="flex items-center gap-1 text-[#10B981] text-xs font-bold">
              <span>+14%</span>
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
          </div>
          <p className="text-[#64748B] text-xs font-bold tracking-wide mb-1">Matched</p>
          <h3 className="text-3xl font-extrabold text-[#0A2540]">156</h3>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#F3E8FF] text-[#A855F7] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] transform -rotate-45 ml-1">send</span>
            </div>
            <div className="text-[#0A2540] font-bold text-[10px] tracking-wider">Last 30 days</div>
          </div>
          <p className="text-[#64748B] text-xs font-bold tracking-wide mb-1">Applied</p>
          <h3 className="text-3xl font-extrabold text-[#0A2540]">12</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#10B981] flex items-center justify-center">
              <span className="material-symbols-outlined">bookmark</span>
            </div>
          </div>
          <p className="text-[#64748B] text-xs font-bold tracking-wide mb-1">Saved</p>
          <h3 className="text-3xl font-extrabold text-[#0A2540]">43</h3>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center">
              <span className="material-symbols-outlined">calendar_today</span>
            </div>
          </div>
          <p className="text-[#64748B] text-xs font-bold tracking-wide mb-1">Deadlines</p>
          <h3 className="text-3xl font-extrabold text-[#0A2540]">03</h3>
        </div>
      </div>

      {/* Row 1 */}
      <div className="flex gap-6 mb-6">
        {/* Analytics Overview */}
        <div className="w-[62%] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-lg font-bold text-[#0A2540]">Analytics Overview</h3>
              <p className="text-sm text-[#64748B] font-medium">Application Volume & Trends</p>
            </div>
            <div className="bg-[#F8F9FB] rounded-lg p-1 flex border border-gray-100">
              <button className="px-4 py-1.5 text-xs font-bold text-[#64748B] rounded-md transition-all hover:bg-white hover:text-[#0A2540]">Weekly</button>
              <button className="px-4 py-1.5 text-xs font-bold text-[#0A2540] bg-white rounded-md shadow-sm transition-all border border-gray-100">Monthly</button>
            </div>
          </div>
          <div className="h-44 relative mt-10">
            <svg viewBox="0 0 500 150" className="w-full h-full overflow-visible">
              <line x1="0" y1="30" x2="500" y2="30" stroke="#F1F5F9" strokeWidth="2" />
              <line x1="0" y1="70" x2="500" y2="70" stroke="#F1F5F9" strokeWidth="2" />
              <line x1="0" y1="110" x2="500" y2="110" stroke="#F1F5F9" strokeWidth="2" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#F1F5F9" strokeWidth="2" />
              
              <defs>
                <linearGradient id="blueArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 130 C 100 110, 150 80, 250 70 C 350 60, 400 110, 500 40 L 500 150 L 0 150 Z" fill="url(#blueArea)" />
              <path d="M 0 130 C 100 110, 150 80, 250 70 C 350 60, 400 110, 500 40" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
              
              <circle cx="250" cy="70" r="3" fill="#2563EB" />
              <circle cx="125" cy="100" r="3" fill="#2563EB" />
            </svg>
            <div className="flex justify-between text-xs text-[#64748B] font-bold absolute bottom-0 left-0 right-0 -mb-7 px-1">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* Funding Target */}
        <div className="w-[38%] bg-[#0A3D91] rounded-2xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10">
            <h3 className="text-white text-lg font-bold mb-6">Funding Target</h3>
            <p className="text-blue-200 text-[10px] font-bold tracking-widest uppercase mb-1">SECURED AMOUNT</p>
            <h2 className="text-white text-[42px] font-extrabold leading-none mb-1 tracking-tight">$32,500</h2>
            <p className="text-blue-200 text-sm font-medium mb-8">of $50,000 goal</p>
            
            <div className="flex justify-between text-white text-xs font-bold mb-2">
              <span>65% Completed</span>
              <span>$17,500 to go</span>
            </div>
            <div className="h-2 w-full bg-[#1E4D9A] rounded-full overflow-hidden">
              <div className="h-full bg-[#6EE7B7] rounded-full w-[65%]"></div>
            </div>
          </div>
          
          <div className="relative z-10 mt-6 bg-[#16489E] rounded-xl p-4 flex gap-4 items-start shadow-sm border border-[#2152A6]">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#6EE7B7] text-[20px]">lightbulb</span>
            </div>
            <p className="text-blue-50 text-sm font-medium leading-relaxed pr-2">Focus on state-specific grants next to boost your score.</p>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex gap-6 mb-6">
        {/* Success by Category */}
        <div className="w-[38%] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <h3 className="text-lg font-bold text-[#0A2540] mb-6">Success by Category</h3>
          <div className="space-y-5">
            {[
              {label: 'STEM', val: '85%', color: 'bg-[#1D4ED8]'},
              {label: 'Arts', val: '42%', color: 'bg-[#7C3AED]'},
              {label: 'Community', val: '68%', color: 'bg-[#065F46]'},
              {label: 'Leadership', val: '55%', color: 'bg-[#2563EB]'}
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-xs font-bold text-[#0A2540] mb-2">
                  <span>{item.label}</span>
                  <span>{item.val}</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{width: item.val}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Funding Trends */}
        <div className="w-[62%] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 relative">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-lg font-bold text-[#0A2540]">Monthly Funding Trends</h3>
            <span className="text-xs font-bold text-[#64748B]">Last 6 Months</span>
          </div>
          <div className="h-[120px] relative px-4 mt-6">
            <svg viewBox="0 0 500 120" className="w-full h-full overflow-visible">
              <path d="M 0 100 L 100 80 L 200 90 L 300 50 L 400 65 L 500 30" fill="none" stroke="#7C3AED" strokeWidth="2.5" />
              <circle cx="0" cy="100" r="4" fill="#7C3AED" />
              <circle cx="100" cy="80" r="4" fill="#7C3AED" />
              <circle cx="200" cy="90" r="4" fill="#7C3AED" />
              <circle cx="300" cy="50" r="4" fill="#7C3AED" />
              <circle cx="400" cy="65" r="4" fill="#7C3AED" />
              <circle cx="500" cy="30" r="4" fill="#7C3AED" />
            </svg>
            <div className="flex justify-between text-xs text-[#64748B] font-bold absolute bottom-0 left-0 right-0 -mb-7">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </div>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-[#0A2540] rounded-full text-white flex items-center justify-center shadow-lg border-4 border-[#F8F9FB] hover:scale-105 transition-transform z-10">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </button>
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex gap-6 pb-8">
        {/* Critical Deadlines */}
        <div className="w-[50%] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0A2540]">Critical Deadlines</h3>
            <button className="text-xs font-bold text-[#2563EB] hover:underline">View Calendar</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center bg-[#F8FAFC] rounded-xl p-4 relative border border-[#F1F5F9]">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#EF4444] rounded-l-xl"></div>
              <div className="flex flex-col items-center justify-center min-w-[50px] pr-4 border-r border-[#E2E8F0] ml-1">
                <span className="text-[10px] font-extrabold text-[#EF4444] uppercase tracking-widest">Oct</span>
                <span className="text-2xl font-extrabold text-[#0A2540] leading-none mt-1">12</span>
              </div>
              <div className="pl-4 flex-1">
                <h4 className="font-bold text-[#0A2540] text-sm">Fulbright Scholar Award</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Global Research Program</p>
              </div>
              <div className="text-xs font-bold text-[#EF4444]">4 Days Left</div>
            </div>
            
            <div className="flex items-center bg-white rounded-xl p-4 border border-[#F1F5F9]">
              <div className="flex flex-col items-center justify-center min-w-[50px] pr-4 border-r border-[#E2E8F0]">
                <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Oct</span>
                <span className="text-2xl font-extrabold text-[#0A2540] leading-none mt-1">28</span>
              </div>
              <div className="pl-4 flex-1">
                <h4 className="font-bold text-[#0A2540] text-sm">STEM Innovators Grant</h4>
                <p className="text-xs text-[#64748B] mt-0.5">National Science Council</p>
              </div>
              <div className="text-xs font-bold text-[#0A2540]">20 Days Left</div>
            </div>

            <div className="flex items-center bg-white rounded-xl p-4 border border-[#F1F5F9]">
              <div className="flex flex-col items-center justify-center min-w-[50px] pr-4 border-r border-[#E2E8F0]">
                <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest">Nov</span>
                <span className="text-2xl font-extrabold text-[#0A2540] leading-none mt-1">05</span>
              </div>
              <div className="pl-4 flex-1">
                <h4 className="font-bold text-[#0A2540] text-sm">Rhodes Scholarship</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Oxford University</p>
              </div>
              <div className="text-xs font-bold text-[#94A3B8]">Pending</div>
            </div>
          </div>
        </div>

        {/* AI Smart Matches */}
        <div className="w-[50%] bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-[#0A2540]">AI Smart Matches</h3>
            <span className="bg-[#A7F3D0] text-[#065F46] text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider">NEW ACTIVITY</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#F1F5F9] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-extrabold text-[#1D4ED8] bg-white px-2.5 py-1 rounded-md shadow-sm border border-gray-100">$15,000</span>
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-[#1D4ED8]">
                  <span className="material-symbols-outlined text-[16px]">stars</span>
                </div>
              </div>
              <h4 className="font-bold text-[#0A2540] text-sm mb-1 leading-tight">Microsoft Tech Leaders</h4>
              <p className="text-[10px] text-[#64748B] font-bold mb-auto">98% Fit Score</p>
              <button className="mt-4 text-xs font-bold text-[#0A2540] flex items-center gap-1 hover:text-[#1D4ED8] transition-colors">
                Match Details <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
            
            <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#F1F5F9] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-extrabold text-[#7C3AED] bg-white px-2.5 py-1 rounded-md shadow-sm border border-gray-100">$5,000</span>
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-[#7C3AED]">
                  <span className="material-symbols-outlined text-[16px]">bolt</span>
                </div>
              </div>
              <h4 className="font-bold text-[#0A2540] text-sm mb-1 leading-tight">Local Heritage Grant</h4>
              <p className="text-[10px] text-[#64748B] font-bold mb-auto">84% Fit Score</p>
              <button className="mt-4 text-xs font-bold text-[#0A2540] flex items-center gap-1 hover:text-[#7C3AED] transition-colors">
                Review Now <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 border border-dashed border-[#CBD5E1] rounded-xl p-5 text-center flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-[#94A3B8] mb-1">person_search</span>
            <p className="text-xs text-[#64748B] mb-1 font-medium">Want better matches?</p>
            <button className="text-xs font-bold text-[#1D4ED8] hover:underline">Complete your academic profile</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
