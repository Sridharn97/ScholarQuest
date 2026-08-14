'use client';
import Link from 'next/link';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useProfile from '@/lib/hooks/useProfile';
import useTracker from '@/lib/hooks/useTracker';
import { formatGpa } from '@/lib/gpaConverter';

export default function ProfilePage() {
  const {
    editMode, setEditMode, activeTab, setActiveTab, user, form, setForm,
    skills, interests, newSkill, setNewSkill, newInterest, setNewInterest,
    saved, showSkillInput, setShowSkillInput, showInterestInput, setShowInterestInput,
    handleSave, removeSkill, addSkill, removeInterest, addInterest,
    achievements, setAchievements, careerGoals, setCareerGoals,
    extracurriculars, setExtracurriculars, academicExperience, setAcademicExperience,
    completion, tabs,
  } = useProfile();

  const { columns } = useTracker();
  const savedCount = columns?.find(c => c.id === 'col_interested')?.cards?.length || 0;
  const appliedCount = columns?.reduce((acc, col) => {
    if (['col_applied', 'col_accepted', 'col_rejected'].includes(col.id)) {
      return acc + (col.cards?.length || 0);
    }
    return acc;
  }, 0) || 0;

  const acceptedCards = columns?.find(c => c.id === 'col_accepted')?.cards || [];
  const rejectedCards = columns?.find(c => c.id === 'col_rejected')?.cards || [];
  const historyCards = [...acceptedCards, ...rejectedCards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  const [showAddAchieve, setShowAddAchieve] = useState(false);
  const [newAchieve, setNewAchieve] = useState({ title: '', type: 'Academic', org: '', date: '', desc: '', position: '', award: '', link: '' });
  const [editIndexAchieve, setEditIndexAchieve] = useState(null);
  
  const [showAddExtracurricular, setShowAddExtracurricular] = useState(false);
  const [newExtra, setNewExtra] = useState({ name: '', org: '', position: '', duration: '', desc: '' });
  const [editIndexExtra, setEditIndexExtra] = useState(null);
  
  const [showAddAcademic, setShowAddAcademic] = useState(false);
  const [newAcademic, setNewAcademic] = useState({ institution: '', role: 'Research Internship', duration: '', desc: '', skills: '' });
  const [editIndexAcademic, setEditIndexAcademic] = useState(null);

  if (!user) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-subtle-float">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          Profile saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* =======================
            LEFT COLUMN (SIDEBAR)
            ======================= */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
          
          {/* Identity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 mb-4 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium text-2xl">
                    {user?.initials || 'AJ'}
                  </div>
                )}
              </div>
              
              {editMode ? (
                <div className="w-full space-y-4 mb-6 text-left">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <input value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <input value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="flex w-full px-3 py-1 bg-white border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-colors">
                      <PhoneInput international defaultCountry="US" value={form.phone || ''} onChange={val => setForm({ ...form, phone: val })} className="w-full text-sm outline-none bg-transparent sq-phone-input" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="City, Country" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">LinkedIn</label>
                    <input value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h1 className="text-xl font-semibold text-gray-900 mb-1">{user?.name || 'Alex Johnson'}</h1>
                  <p className="text-gray-600 font-medium text-sm mb-1">{user?.studyField || 'Computer Science'}</p>
                  <p className="text-gray-500 text-sm mb-4">{user?.institution || 'Stanford University'}</p>
                  
                  <div className="inline-flex items-center gap-1.5 text-gray-600 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {user?.nationality || 'San Francisco Bay Area'}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="w-full flex gap-3">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium bg-black text-white transition-colors hover:bg-gray-800 text-sm">Save</button>
                    <button onClick={() => setEditMode(false)} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium bg-white border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50 text-sm">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)} className="w-full flex items-center justify-center gap-2 py-2 rounded-md font-medium bg-white border border-gray-300 text-gray-700 transition-colors hover:bg-gray-50 text-sm"><span className="material-symbols-outlined text-[16px]">edit</span> Edit Profile</button>
                )}
              </div>
              
              <div className="w-full mt-6 pt-6 border-t border-gray-100 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm text-gray-700">Profile Strength</span>
                  <span className="font-medium text-sm text-gray-900">{completion}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${completion}%` }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Complete to boost matches</p>
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-900">Skills</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills?.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-md flex items-center gap-1.5">
                    {s}
                    {editMode && <button onClick={() => setSkills(skills.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                  </span>
                ))}
                {editMode && (
                  <div className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newSkill.trim()) { setSkills([...(skills || []), newSkill.trim()]); setNewSkill(''); } }} placeholder="Add skill..." className="w-24 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
                  </div>
                )}
                {(!skills || skills.length === 0) && !editMode && <p className="text-sm text-gray-500">No skills added.</p>}
              </div>
            </div>
            
            <div className="h-px w-full bg-gray-100"></div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-gray-900">Interests</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {interests?.map((int, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-700 font-medium text-sm rounded-md flex items-center gap-1.5">
                    {int}
                    {editMode && <button onClick={() => setInterests(interests.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                  </span>
                ))}
                {editMode && (
                  <div className="flex items-center px-2 py-1 bg-white border border-gray-300 rounded-md focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && newInterest.trim()) { setInterests([...(interests || []), newInterest.trim()]); setNewInterest(''); } }} placeholder="Add interest..." className="w-24 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400" />
                  </div>
                )}
                {(!interests || interests.length === 0) && !editMode && <p className="text-sm text-gray-500">No interests added.</p>}
              </div>
            </div>
          </div>
        </div>

        {/* =======================
            RIGHT COLUMN (MAIN)
        ======================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Minimalist Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id 
                      ? 'border-gray-900 text-gray-900' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Analytics */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-4">Private Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-gray-700 border border-gray-200 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">task_alt</span>
                    </div>
                    <div>
                      <p className="font-semibold text-2xl text-gray-900 leading-none mb-1">{appliedCount}</p>
                      <p className="text-xs font-medium text-gray-500">Applied Scholarships</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-gray-700 border border-gray-200 shadow-sm">
                      <span className="material-symbols-outlined text-[24px]">bookmark</span>
                    </div>
                    <div>
                      <p className="font-semibold text-2xl text-gray-900 leading-none mb-1">{savedCount}</p>
                      <p className="text-xs font-medium text-gray-500">Saved Opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-3">About Me</h2>
                {editMode ? (
                  <textarea rows={4} value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Write a summary about your academic journey..." className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{form.bio || <span className="text-gray-400 italic">Add a bio to tell scholarship providers about yourself.</span>}</p>
                )}
              </div>

              {/* Career Goals */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-gray-900 mb-4">Career Goals</h2>
                {editMode ? (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Short-Term Goal</label>
                      <textarea value={careerGoals?.shortTerm || ''} onChange={e => setCareerGoals({...careerGoals, shortTerm: e.target.value})} rows={2} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Long-Term Goal</label>
                      <textarea value={careerGoals?.longTerm || ''} onChange={e => setCareerGoals({...careerGoals, longTerm: e.target.value})} rows={2} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-700">Higher Studies</label>
                        <input value={careerGoals?.higherStudies || ''} onChange={e => setCareerGoals({...careerGoals, higherStudies: e.target.value})} placeholder="e.g. MS, PhD" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-700">Research Area</label>
                        <input value={careerGoals?.researchArea || ''} onChange={e => setCareerGoals({...careerGoals, researchArea: e.target.value})} placeholder="e.g. AI, Climate" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-xs text-gray-700 mb-1">Short-Term Goal</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{careerGoals?.shortTerm || <span className="italic text-gray-400">Not specified</span>}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-xs text-gray-700 mb-1">Long-Term Goal</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{careerGoals?.longTerm || <span className="italic text-gray-400">Not specified</span>}</p>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-2">
                      {careerGoals?.higherStudies && (
                        <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-gray-500 text-[16px]">school</span>
                          <div>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase block leading-tight">Higher Studies</span>
                            <span className="text-sm font-medium text-gray-900 leading-tight">{careerGoals.higherStudies}</span>
                          </div>
                        </div>
                      )}
                      {careerGoals?.researchArea && (
                        <div className="bg-white px-3 py-1.5 rounded-md border border-gray-200 flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-gray-500 text-[16px]">biotech</span>
                          <div>
                            <span className="text-[10px] font-semibold text-gray-500 uppercase block leading-tight">Research Area</span>
                            <span className="text-sm font-medium text-gray-900 leading-tight">{careerGoals.researchArea}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: ACADEMIC */}
          {activeTab === 'academic' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Education */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <h2 className="font-semibold text-gray-900 text-xl mb-6">Education</h2>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shrink-0 border border-gray-200">
                    <span className="material-symbols-outlined text-gray-700 text-2xl">account_balance</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{user?.institution || 'Your Institution'}</h3>
                    <p className="text-gray-600 font-medium">{user?.studyField || 'Your Field of Study'}</p>
                    <p className="text-sm text-gray-500 mt-1">GPA: <span className="font-semibold text-gray-900">{formatGpa(user?.gpa, user?.gradingSystem, user?.gpaScale, user?.gpaPercentage)}</span></p>
                    
                    {editMode && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-lg border border-gray-200">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-gray-700">Institution</label>
                          <input value={form.institution || ''} onChange={e => setForm({ ...form, institution: e.target.value })} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                        </div>
                        
                        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200 col-span-1 sm:col-span-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-700">Grading System</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                <input type="radio" name="profileGradingSystem" value="CGPA" checked={form.gradingSystem === 'CGPA'} onChange={e => setForm({ ...form, gradingSystem: e.target.value })} className="accent-primary" />
                                <span>CGPA</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                                <input type="radio" name="profileGradingSystem" value="Percentage" checked={form.gradingSystem === 'Percentage'} onChange={e => setForm({ ...form, gradingSystem: e.target.value })} className="accent-primary" />
                                <span>Percentage</span>
                              </label>
                            </div>
                          </div>
                          
                          {form.gradingSystem === 'CGPA' ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-700">Current CGPA</label>
                                <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-700">Out Of</label>
                                <select value={form.gpaScale || '10'} onChange={e => setForm({ ...form, gpaScale: e.target.value })} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors">
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1.5">
                              <label className="text-xs font-medium text-gray-700">Current Percentage (%)</label>
                              <input type="number" step="0.1" min="0" max="100" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Timeline */}
              {/* Experience Timeline */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">Academic Experience</h2>
                  {editMode && <button onClick={() => { setShowAddAcademic(!showAddAcademic); setEditIndexAcademic(null); setNewAcademic({ institution: '', role: 'Research Internship', duration: '', desc: '', skills: '' }) }} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">add</span> Add</button>}
                </div>

                {editMode && showAddAcademic && (
                  <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-400 rounded-l-lg"></div>
                    <h3 className="font-semibold text-sm mb-4 text-gray-700">{editIndexAcademic !== null ? 'Edit Experience' : 'Add Experience'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input value={newAcademic.institution} onChange={e => setNewAcademic({...newAcademic, institution: e.target.value})} placeholder="Institution" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      
                      <div className="flex flex-col gap-2">
                        <select 
                          value={['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) ? newAcademic.role : 'Other'} 
                          onChange={e => {
                            if (e.target.value === 'Other') setNewAcademic({...newAcademic, role: ''});
                            else setNewAcademic({...newAcademic, role: e.target.value});
                          }} 
                          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                        >
                          <option value="Research Internship">Research Internship</option>
                          <option value="Academic Internship">Academic Internship</option>
                          <option value="Research Assistant">Research Assistant</option>
                          <option value="Other">Other...</option>
                        </select>
                        {!['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) && (
                          <input value={newAcademic.role} onChange={e => setNewAcademic({...newAcademic, role: e.target.value})} placeholder="Specify your role" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                        )}
                      </div>
                      <input value={newAcademic.duration} onChange={e => setNewAcademic({...newAcademic, duration: e.target.value})} placeholder="Duration (e.g. Jun 2023 - Aug 2023)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newAcademic.skills} onChange={e => setNewAcademic({...newAcademic, skills: e.target.value})} placeholder="Skills Gained (comma separated)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                    </div>
                    <textarea value={newAcademic.desc} onChange={e => setNewAcademic({...newAcademic, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddAcademic(false)} className="px-4 py-1.5 font-medium text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">Cancel</button>
                      <button onClick={() => { if(!newAcademic.institution) return; const updated = [...(academicExperience || [])]; if (editIndexAcademic !== null) updated[editIndexAcademic] = newAcademic; else updated.push(newAcademic); setAcademicExperience(updated); setShowAddAcademic(false); }} className="px-4 py-1.5 bg-gray-900 text-white font-medium text-sm rounded-md shadow-sm hover:bg-gray-800 transition-colors">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-2 mt-4">
                  {academicExperience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 group">
                      <div className="absolute w-3 h-3 bg-white border-2 border-gray-400 rounded-full -left-[7px] top-1.5"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 leading-tight mb-1">{exp.role}</h3>
                          <p className="text-gray-700 font-medium text-sm mb-1">{exp.institution}</p>
                          <div className="text-xs text-gray-500 mb-2">
                            {exp.duration}
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
                          {exp.skills && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {exp.skills.split(',').map((skill, i) => (
                                <span key={i} className="inline-block bg-gray-100 px-2 py-1 rounded-md text-[11px] font-medium text-gray-600">{skill.trim()}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexAcademic(idx); setNewAcademic(exp); setShowAddAcademic(true); }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAcademicExperience(academicExperience.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!academicExperience || academicExperience.length === 0) && <p className="pl-6 text-sm text-gray-500 italic">No academic experience added yet.</p>}
                </div>
              </div>

              {/* Achievements Timeline */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">Achievements</h2>
                  {editMode && <button onClick={() => { setShowAddAchieve(!showAddAchieve); setEditIndexAchieve(null); setNewAchieve({ title: '', type: 'Academic', org: '', date: '', desc: '', position: '', award: '', link: '' }) }} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">add</span> Add</button>}
                </div>

                {editMode && showAddAchieve && (
                  <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-400 rounded-l-lg"></div>
                    <h3 className="font-semibold text-sm mb-4 text-gray-700">{editIndexAchieve !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input value={newAchieve.title} onChange={e => setNewAchieve({...newAchieve, title: e.target.value})} placeholder="Title (e.g. Dean's List)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <select value={newAchieve.type} onChange={e => setNewAchieve({...newAchieve, type: e.target.value})} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors">
                        {['Academic', 'Technical', 'Research', 'Hackathon', 'Competition', 'Leadership', 'Community Service', 'Sports', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input value={newAchieve.org} onChange={e => setNewAchieve({...newAchieve, org: e.target.value})} placeholder="Issuer (e.g. Stanford University)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newAchieve.date} onChange={e => setNewAchieve({...newAchieve, date: e.target.value})} placeholder="Date (e.g. Fall 2023)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newAchieve.position} onChange={e => setNewAchieve({...newAchieve, position: e.target.value})} placeholder="Position/Rank (Optional)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newAchieve.award} onChange={e => setNewAchieve({...newAchieve, award: e.target.value})} placeholder="Award/Prize (Optional)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                    </div>
                    <textarea value={newAchieve.desc} onChange={e => setNewAchieve({...newAchieve, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddAchieve(false)} className="px-4 py-1.5 font-medium text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">Cancel</button>
                      <button onClick={() => { if(!newAchieve.title) return; const updated = [...(achievements || [])]; if (editIndexAchieve !== null) updated[editIndexAchieve] = newAchieve; else updated.push(newAchieve); setAchievements(updated); setShowAddAchieve(false); }} className="px-4 py-1.5 bg-gray-900 text-white font-medium text-sm rounded-md shadow-sm hover:bg-gray-800 transition-colors">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-2 mt-4">
                  {achievements?.map((ach, idx) => (
                    <div key={idx} className="relative pl-6 group">
                      <div className="absolute w-3 h-3 bg-white border-2 border-gray-400 rounded-full -left-[7px] top-1.5"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 leading-tight">{ach.title}</h3>
                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-semibold uppercase">{ach.type}</span>
                          </div>
                          <p className="text-gray-700 font-medium text-sm mb-1">{ach.org}</p>
                          <div className="text-xs text-gray-500 mb-2">
                            {ach.date}
                          </div>
                          {(ach.position || ach.award) && (
                            <div className="flex gap-3 mb-2">
                              {ach.position && <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-200 text-gray-600">Rank: {ach.position}</span>}
                              {ach.award && <span className="text-xs font-medium bg-gray-50 px-2 py-1 rounded-md border border-gray-200 text-gray-600">Prize: {ach.award}</span>}
                            </div>
                          )}
                          <p className="text-sm text-gray-600 leading-relaxed">{ach.desc}</p>
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexAchieve(idx); setNewAchieve(ach); setShowAddAchieve(true); }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!achievements || achievements.length === 0) && <p className="pl-6 text-sm text-gray-500 italic">No achievements added yet.</p>}
                </div>
              </div>

              {/* Extracurriculars Timeline */}
              {/* Extracurriculars Timeline */}
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-semibold text-gray-900 text-lg flex items-center gap-2">Extracurricular Activities</h2>
                  {editMode && <button onClick={() => { setShowAddExtracurricular(!showAddExtracurricular); setEditIndexExtra(null); setNewExtra({ name: '', org: '', position: '', duration: '', desc: '' }) }} className="px-3 py-1.5 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">add</span> Add</button>}
                </div>

                {editMode && showAddExtracurricular && (
                  <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-400 rounded-l-lg"></div>
                    <h3 className="font-semibold text-sm mb-4 text-gray-700">{editIndexExtra !== null ? 'Edit Activity' : 'Add Activity'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <input value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Activity Name (e.g. Volunteer)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newExtra.org} onChange={e => setNewExtra({...newExtra, org: e.target.value})} placeholder="Organization/Club" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newExtra.position} onChange={e => setNewExtra({...newExtra, position: e.target.value})} placeholder="Role/Position (Optional)" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                      <input value={newExtra.duration} onChange={e => setNewExtra({...newExtra, duration: e.target.value})} placeholder="Duration" className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors" />
                    </div>
                    <textarea value={newExtra.desc} onChange={e => setNewExtra({...newExtra, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddExtracurricular(false)} className="px-4 py-1.5 font-medium text-sm text-gray-600 hover:bg-gray-200 rounded-md transition-colors">Cancel</button>
                      <button onClick={() => { if(!newExtra.name) return; const updated = [...(extracurriculars || [])]; if (editIndexExtra !== null) updated[editIndexExtra] = newExtra; else updated.push(newExtra); setExtracurriculars(updated); setShowAddExtracurricular(false); }} className="px-4 py-1.5 bg-gray-900 text-white font-medium text-sm rounded-md shadow-sm hover:bg-gray-800 transition-colors">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-2 mt-4">
                  {extracurriculars?.map((extra, idx) => (
                    <div key={idx} className="relative pl-6 group">
                      <div className="absolute w-3 h-3 bg-white border-2 border-gray-400 rounded-full -left-[7px] top-1.5"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 leading-tight mb-1">{extra.name}</h3>
                          <p className="text-gray-700 font-medium text-sm mb-1">{extra.org}</p>
                          <div className="text-xs text-gray-500 mb-2">
                            {extra.duration}
                          </div>
                          {extra.position && <div className="mt-1 mb-2 inline-block bg-gray-50 px-2 py-1 rounded-md text-xs font-medium border border-gray-200 text-gray-600">Role: {extra.position}</div>}
                          <p className="text-sm text-gray-600 leading-relaxed">{extra.desc}</p>
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexExtra(idx); setNewExtra(extra); setShowAddExtracurricular(true); }} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setExtracurriculars(extracurriculars.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!extracurriculars || extracurriculars.length === 0) && <p className="pl-6 text-sm text-gray-500 italic">No extracurricular activities added yet.</p>}
                </div>
              </div>

            </div>
          )}

          {/* TAB: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-200">
              <div className="w-20 h-20 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-200">
                <span className="material-symbols-outlined text-gray-700 text-4xl">description</span>
              </div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 tracking-tight">Document Center</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-10 text-sm">Upload your resume, transcripts, and recommendation letters to easily attach them to scholarship applications.</p>
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-md font-medium text-sm shadow-sm hover:bg-gray-800 transition-colors">Upload New Document</button>
            </div>
          )}

          {/* TAB: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center shadow-sm border border-gray-200 shrink-0">
                    <span className="material-symbols-outlined text-gray-700 text-2xl">history</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Application History</h2>
                    <p className="text-gray-500 text-sm mt-1">Your finalized applications</p>
                  </div>
                </div>
                <Link href="/tracker" className="px-4 py-2 bg-gray-900 text-white rounded-md font-medium text-sm shadow-sm hover:bg-gray-800 transition-colors whitespace-nowrap">
                  View Tracker
                </Link>
              </div>

              {historyCards.length > 0 ? (
                <div className="space-y-3">
                  {historyCards.map((card, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors group">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">{card.title}</h3>
                        {card.amount && <p className="text-sm font-medium text-green-700 mt-1">{card.amount}</p>}
                      </div>
                      <div className="shrink-0 ml-4">
                        {card.columnId === 'col_accepted' ? (
                          <span className="px-3 py-1 bg-green-50 text-green-700 font-medium text-xs rounded-md border border-green-200 shadow-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span> Offer
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-50 text-red-700 font-medium text-xs rounded-md border border-red-200 shadow-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">cancel</span> Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200 border-dashed">
                  <p className="text-gray-500 max-w-md mx-auto text-sm">No completed applications yet. Start tracking your applications to see your history here.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
