'use client';
import Link from 'next/link';
import useDiscovery from '@/lib/hooks/useDiscovery';

const filterTags = ['STEM', 'Full-Ride', 'Minority', 'Art', 'Leadership', 'Research'];

export default function DiscoveryPage() {
  const {
    scholarships,
    selectedTags,
    searchQuery,
    setSearchQuery,
    amountFilter,
    setAmountFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    allScholarships,
    toggleTag,
    indexOfFirstItem,
  } = useDiscovery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* COMPACT SIDEBAR FILTERS */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 glass-card bg-surface-bright border border-outline-variant/30 p-5 rounded-2xl shadow-sm flex flex-col h-fit">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-6">
              <h2 className="font-headline-md text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">tune</span> Filters
              </h2>
              <button className="text-on-surface-variant font-label-sm text-xs hover:text-primary transition-colors" onClick={() => setSelectedTags([])}>Clear</button>
            </div>

            <div className="space-y-6">
              {/* Dropdowns */}
              <div className="space-y-4">
                {[
                  { label: 'Country', options: ['Any Country', 'USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'India', 'China', 'Japan', 'South Korea', 'Netherlands', 'Singapore', 'New Zealand', 'Switzerland'] },
                  { label: 'Degree', options: ['Any Degree', 'High School', 'Undergrad', 'Master', 'PhD', 'Post-Doc'] },
                  { label: 'Field of Study', options: ['Any Field', 'Computer Science', 'Engineering', 'Medicine & Health', 'Business', 'Arts & Humanities', 'Social Sciences', 'Law'] },
                  { label: 'Type', options: ['Any Type', 'Merit-Based', 'Need-Based', 'Athletic', 'Diversity/Minority'] },
                ].map((filter) => (
                  <div key={filter.label} className="space-y-1.5">
                    <label className="font-label-md text-xs font-bold text-on-surface-variant">{filter.label}</label>
                    <div className="relative">
                      <select className="w-full appearance-none bg-surface-container-lowest border border-outline-variant/50 rounded-lg py-2 pl-3 pr-8 font-body-sm text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer">
                        {filter.options.map(opt => <option key={opt}>{opt}</option>)}
                      </select>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant pointer-events-none text-[16px]">expand_more</span>
                    </div>
                  </div>
                ))}
                
                {/* Amount Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="font-label-md text-xs font-bold text-on-surface-variant">Min Amount</label>
                    <span className="text-primary font-bold text-xs">${amountFilter.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="50000" 
                    step="1000" 
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(Number(e.target.value))}
                    className="w-full accent-primary h-1.5 bg-surface-variant rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-on-surface-variant font-medium px-1">
                    <span>$0</span>
                    <span>$50k+</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="font-label-md text-xs font-bold text-on-surface-variant">Tags</label>
                <div className="flex flex-wrap gap-1.5">
                  {filterTags.map((tag) => {
                    const isActive = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
                          isActive 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant/40 hover:border-primary/50 hover:text-on-surface'
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Apply Filters Button pushes to the bottom to eliminate empty space */}
            <div className="mt-auto pt-6">
              <button className="w-full py-2.5 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold transition-colors text-sm shadow-sm flex justify-center items-center gap-2">
                Apply Filters <span className="material-symbols-outlined text-[16px]">filter_list</span>
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="space-y-6 flex-1 pb-6 pr-1">
            {/* Top Search Bar */}
            <div className="glass-card bg-surface-bright border border-outline-variant/30 p-3 rounded-2xl shadow-sm flex items-center justify-between gap-4">
              <div className="relative w-full max-w-md">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline-variant text-[20px]">search</span>
                <input 
                  type="text" 
                  placeholder="Search scholarships..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm"
                />
              </div>
              
              <div className="flex items-center gap-2 pr-2">
                <span className="font-label-sm text-xs text-on-surface-variant hidden sm:inline">Sort:</span>
                <button className="font-label-sm text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors text-on-surface">
                  Match Score <span className="material-symbols-outlined text-[16px]">swap_vert</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1">
              <h2 className="font-headline-md text-base font-bold text-on-surface">{allScholarships.length} Results Found</h2>
            </div>

            {/* Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {currentItems.map((s, idx) => {
                // Determine if featured based on index in allScholarships
                const originalIndex = indexOfFirstItem + idx;
                const isFeatured = originalIndex === 0;
                
                return (
                  <Link href={`/scholarships/${s.id}`} key={s.id} className="block group">
                    <div className={`h-full bg-surface-bright border p-4 rounded-2xl transition-all duration-200 flex flex-col justify-between ${
                      isFeatured 
                        ? 'border-primary/50 shadow-sm shadow-primary/10 hover:shadow-md' 
                        : 'border-outline-variant/30 hover:border-outline-variant hover:shadow-sm'
                    }`}>
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="bg-surface-container-low px-2 py-1 rounded-md text-[10px] font-bold text-on-surface-variant border border-outline-variant/20 uppercase tracking-wider">
                            {s.category}
                          </span>
                          {isFeatured && (
                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-md flex items-center gap-1">
                              <span className="material-symbols-outlined text-[12px]" style={{fontVariationSettings: "'FILL' 1"}}>stars</span> Top Match
                            </span>
                          )}
                        </div>
                        
                        <h4 className="font-headline-md text-base font-bold text-on-surface mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {s.name}
                        </h4>
                        <p className="font-body-sm text-xs text-on-surface-variant mb-4 line-clamp-1">{s.org}</p>
                      </div>

                      <div>
                        <div className="grid grid-cols-2 gap-2 mb-4 p-2 bg-surface-container-lowest rounded-xl border border-outline-variant/20">
                          <div>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Amount</p>
                            <p className="font-label-md text-sm font-bold text-on-surface">{s.amount}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Match</p>
                            <p className={`font-label-md text-sm font-bold ${isFeatured ? 'text-primary' : 'text-green-600'}`}>
                              {s.match || '90%'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">event</span>
                            {s.deadline}
                          </span>
                          <span className="material-symbols-outlined text-outline-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all text-[18px]">
                            arrow_forward
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-outline-variant/20">
                <button 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-lg font-bold text-sm transition-colors ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm shadow-primary/20' : 'text-on-surface-variant hover:bg-surface-container'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container disabled:opacity-50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
