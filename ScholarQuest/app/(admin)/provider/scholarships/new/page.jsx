'use client';
import Link from 'next/link';
import useProviderNewScholarship from '@/lib/hooks/useProviderNewScholarship';

export default function PostScholarshipPage() {
  const {
    error,
    loading,
    sections,
    addSection,
    removeSection,
    updateSectionTitle,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleSubmit,
  } = useProviderNewScholarship();

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-on-surface-variant mb-4">
          <Link href="/provider/scholarships" className="font-label-md text-sm hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            Back to Scholarships
          </Link>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="font-headline-lg text-4xl font-bold text-on-surface tracking-tight">Post New Scholarship</h2>
            <p className="text-body-lg text-on-surface-variant mt-2 max-w-2xl">Create a comprehensive funding opportunity to discover and match with the perfect candidates.</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-error/10 border border-error/20 text-error rounded-2xl font-body-md flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-4">
          <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '24px' }}>error</span>
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Details Section */}
        <div className="clean-card p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-outline-variant/20">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>edit_document</span>
            </div>
            <div>
              <h3 className="font-headline-md text-2xl font-bold text-on-surface">Program Information</h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5">Core details about the scholarship</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="md:col-span-2 space-y-2 group">
              <label htmlFor="program_name" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Program Name *</label>
              <input
                id="program_name"
                name="program_name"
                type="text"
                placeholder="e.g. Women in Engineering Excellence Award"
                className="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-outline-variant"
                required
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="category" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Category</label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  className="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm appearance-none hover:border-outline-variant cursor-pointer"
                >
                  <option>STEM</option>
                  <option>Leadership</option>
                  <option>Creative</option>
                  <option>International</option>
                  <option>Community</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
              </div>
            </div>

            <div className="space-y-2 group">
              <label htmlFor="amount" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Award Amount *</label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="15,000"
                  className="w-full pl-10 pr-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-outline-variant"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label htmlFor="deadline" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Application Deadline *</label>
              <div className="relative">
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  className="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-outline-variant cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2 group mt-2">
              <label htmlFor="description" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Program Description *</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe the background, funding details, and objective of this grant..."
                className="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-outline-variant resize-none"
                required
              />
            </div>

            <div className="md:col-span-2 space-y-2 group">
              <label htmlFor="eligibility" className="font-label-md text-sm font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Eligibility Summary</label>
              <textarea
                id="eligibility"
                name="eligibility"
                rows={2}
                placeholder="e.g. GPA 3.5 minimum, senior year, CS or Engineering major"
                className="w-full px-5 py-4 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-outline-variant resize-none"
              />
            </div>
          </div>
        </div>

        {/* Application Form Builder Section */}
        <div className="clean-card p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none -translate-x-1/2 translate-y-1/2" />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>view_list</span>
              </div>
              <div>
                <h3 className="font-headline-md text-2xl font-bold text-on-surface">Application Form Builder</h3>
                <p className="text-body-sm text-on-surface-variant mt-0.5">Design the custom application requirements for students</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addSection}
              className="px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-md transition-all flex items-center gap-2 shadow-sm border border-outline-variant/30 active:scale-95"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_circle</span>
              Add New Section
            </button>
          </div>

          <div className="space-y-8">
            {sections.map((section, sIdx) => (
              <div key={section.id} className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-outline-variant/80 group/section">
                {/* Section Header */}
                <div className="bg-surface-container-low/50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/20">
                  <div className="flex-1 w-full relative">
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                      placeholder="Section Title (e.g., Personal Details)"
                      className="w-full bg-transparent font-headline-md text-lg text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:border-b-2 focus:border-primary py-1 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors shrink-0"
                    title="Delete Section"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>

                {/* Questions List */}
                <div className="p-6 space-y-4">
                  {section.questions.map((q, qIdx) => (
                    <div key={q.id} className="flex flex-col gap-3 group/question relative">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        {/* Drag handle placeholder - purely visual */}
                        <div className="hidden sm:flex text-outline-variant group-hover/question:text-on-surface-variant transition-colors cursor-grab">
                          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>drag_indicator</span>
                        </div>
                        
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={q.text}
                            onChange={(e) => updateQuestion(section.id, q.id, 'text', e.target.value)}
                            placeholder="What do you want to ask?"
                            className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all hover:border-outline-variant"
                            required
                          />
                        </div>
                        
                        <div className="w-full sm:w-auto flex items-center gap-3">
                          <div className="relative flex-1 sm:w-48">
                            <select
                              value={q.type}
                              onChange={(e) => updateQuestion(section.id, q.id, 'type', e.target.value)}
                              className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all appearance-none cursor-pointer hover:border-outline-variant"
                            >
                              <option value="text">Text Response</option>
                              <option value="multiple_choice">Multiple Choice</option>
                              <option value="date">Date Picker</option>
                              <option value=".pdf">PDF Document</option>
                              <option value=".png">PNG Image</option>
                              <option value=".jpg">JPG Image</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '18px' }}>expand_more</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => removeQuestion(section.id, q.id)}
                            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors shrink-0"
                            title="Remove Question"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
                          </button>
                        </div>
                      </div>
                      {q.type === 'multiple_choice' && (
                        <div className="w-full sm:pl-9">
                          <input
                            type="text"
                            value={q.options || ''}
                            onChange={(e) => updateQuestion(section.id, q.id, 'options', e.target.value)}
                            placeholder="Enter options separated by commas (e.g. Male, Female, Other)"
                            className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl font-body-md text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all hover:border-outline-variant"
                            required
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Add Question Button */}
                  <div className="pt-2 pl-0 sm:pl-8">
                    <button
                      type="button"
                      onClick={() => addQuestion(section.id)}
                      className="font-label-md text-primary hover:text-primary-dark flex items-center gap-1.5 py-2 px-3 hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {sections.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-outline-variant/30 rounded-2xl bg-surface-container-lowest/50">
                <span className="material-symbols-outlined text-outline mb-3" style={{ fontSize: '48px' }}>post_add</span>
                <p className="font-label-md text-on-surface-variant">No sections added yet.</p>
                <button
                  type="button"
                  onClick={addSection}
                  className="mt-4 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-sm transition-all"
                >
                  Add Your First Section
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6 border-t border-outline-variant/20 mt-8 pb-12">
          <Link href="/provider/scholarships" className="w-full sm:w-auto px-8 py-4 font-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-all text-center">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-xl font-label-md hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>send</span>
                Publish Scholarship
              </>
            )}
          </button>
        </div>
        
      </form>
    </div>
  );
}
