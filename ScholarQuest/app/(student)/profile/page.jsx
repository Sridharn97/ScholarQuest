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
          <div className="bg-surface-bright rounded-3xl shadow-sm border border-outline-variant/30 relative overflow-hidden flex flex-col">
            <div className="w-full h-32 bg-gradient-to-r from-primary to-secondary relative">
              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
            </div>
            
            <div className="px-8 pb-8 relative flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-surface-bright p-1 shadow-md border-4 border-surface-bright -mt-14 mb-4 z-10 relative">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl shadow-inner">
                    {user?.initials || 'AJ'}
                  </div>
                )}
              </div>
              
              {editMode ? (
                <div className="w-full space-y-4 mb-6 text-left animate-in fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">First Name</label>
                      <input value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">Last Name</label>
                      <input value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">Phone</label>
                    <div className="flex w-full px-4 py-1.5 border border-outline-variant/50 rounded-xl bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                      <PhoneInput international defaultCountry="US" value={form.phone || ''} onChange={val => setForm({ ...form, phone: val })} className="w-full text-sm font-medium outline-none bg-transparent sq-phone-input" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">Location</label>
                    <input value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="City, Country" className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[11px] font-extrabold text-on-surface-variant uppercase tracking-wider">LinkedIn</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant material-symbols-outlined text-[18px]">link</span>
                      <input value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/..." className="w-full pl-10 pr-4 py-2.5 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h1 className="text-2xl font-extrabold text-on-surface mb-1 tracking-tight">{user?.name || 'Alex Johnson'}</h1>
                  <p className="text-primary font-bold text-sm mb-2 uppercase tracking-wide">{user?.studyField || 'Computer Science'}</p>
                  <p className="text-on-surface-variant text-sm font-medium mb-4 flex items-center justify-center gap-1.5"><span className="material-symbols-outlined text-[16px]">school</span> {user?.institution || 'Stanford University'}</p>
                  
                  <div className="inline-flex items-center gap-1.5 text-on-surface-variant text-xs font-bold uppercase tracking-wider bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {user?.nationality || 'San Francisco Bay Area'}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="w-full flex gap-3">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-primary text-white transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Save</button>
                    <button onClick={() => setEditMode(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-surface-container-high text-on-surface transition-all hover:bg-surface-container-highest">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold border-2 border-primary/20 text-primary transition-all hover:bg-primary/5 hover:border-primary/40"><span className="material-symbols-outlined text-[18px]">edit</span> Edit Profile</button>
                )}
              </div>
              
              <div className="w-full mt-6 pt-6 border-t border-outline-variant/20 text-left">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-on-surface">Profile Strength</span>
                    <span className="text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">Complete to boost matches</span>
                  </div>
                  <span className="font-extrabold text-xl text-primary">{completion}%</span>
                </div>
                <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${completion}%` }}>
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Interests Sidebar Card */}
          <div className="bg-surface-bright rounded-3xl p-6 shadow-sm border border-outline-variant/30">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">psychology</span> Skills
              </h3>
              {editMode && <button onClick={() => setShowSkillInput(!showSkillInput)} className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 rounded-full text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">add</span></button>}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {skills?.map((skill) => (
                <div key={skill} className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full text-xs font-bold text-primary border border-primary/20 shadow-sm transition-all hover:-translate-y-0.5">
                  {skill}
                  {editMode && <button onClick={() => removeSkill(skill)} className="text-primary hover:text-error transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                </div>
              ))}
              {skills?.length === 0 && <p className="text-sm text-on-surface-variant italic">No skills added.</p>}
            </div>

            {editMode && showSkillInput && (
              <div className="flex items-center gap-2 mb-6 bg-surface-container-lowest p-1.5 rounded-xl border border-primary/40 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
                <input autoFocus value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Type a skill..." className="flex-1 px-3 py-1.5 bg-transparent text-sm font-medium outline-none" />
                <button onClick={addSkill} className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-lg shadow-sm hover:bg-primary/90 transition-colors">Add</button>
              </div>
            )}

            <div className="flex justify-between items-center mb-4 pt-6 border-t border-outline-variant/20">
              <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-secondary">favorite</span> Interests
              </h3>
              {editMode && <button onClick={() => setShowInterestInput(!showInterestInput)} className="w-8 h-8 flex items-center justify-center hover:bg-secondary/10 rounded-full text-secondary transition-colors"><span className="material-symbols-outlined text-[20px]">add</span></button>}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {interests?.map((interest) => (
                <div key={interest} className="flex items-center gap-1.5 bg-secondary/10 px-3 py-1.5 rounded-full text-xs font-bold text-secondary border border-secondary/20 shadow-sm transition-all hover:-translate-y-0.5">
                  {interest}
                  {editMode && <button onClick={() => removeInterest(interest)} className="text-secondary hover:text-error transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                </div>
              ))}
              {interests?.length === 0 && <p className="text-sm text-on-surface-variant italic">No interests added.</p>}
            </div>
            
            {editMode && showInterestInput && (
              <div className="flex items-center gap-2 mt-4 bg-surface-container-lowest p-1.5 rounded-xl border border-secondary/40 focus-within:ring-2 focus-within:ring-secondary/20 transition-all shadow-sm">
                <input autoFocus value={newInterest} onChange={e => setNewInterest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addInterest()} placeholder="Type an interest..." className="flex-1 px-3 py-1.5 bg-transparent text-sm font-medium outline-none" />
                <button onClick={addInterest} className="px-4 py-2 bg-secondary text-white font-bold text-xs rounded-lg shadow-sm hover:bg-secondary/90 transition-colors">Add</button>
              </div>
            )}
          </div>
        </div>


        {/* =======================
            RIGHT COLUMN (CONTENT)
            ======================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto hide-scrollbar mb-6 p-1.5 bg-surface-container-low rounded-2xl border border-outline-variant/20 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-surface-bright text-primary shadow-sm border border-outline-variant/20'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-bright/50'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Analytics */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <h2 className="font-bold text-lg mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">monitoring</span> Private Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner border border-primary/20">
                      <span className="material-symbols-outlined text-[32px]">task_alt</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-3xl text-on-surface leading-none mb-1">{appliedCount}</p>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Applied Scholarships</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/40 flex items-center gap-5 shadow-sm transition-transform hover:-translate-y-1">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary shadow-inner border border-secondary/20">
                      <span className="material-symbols-outlined text-[32px]">bookmark</span>
                    </div>
                    <div>
                      <p className="font-extrabold text-3xl text-on-surface leading-none mb-1">{savedCount}</p>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Saved Opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">person</span> About Me</h2>
                {editMode ? (
                  <textarea rows={5} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Write a compelling summary about your academic journey..." className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-sm" />
                ) : (
                  <p className="text-on-surface text-sm leading-relaxed whitespace-pre-wrap">{form.bio || <span className="text-on-surface-variant italic">Add a bio to tell scholarship providers about yourself. Highlighting your achievements and aspirations can significantly increase your chances of standing out.</span>}</p>
                )}
              </div>

              {/* Career Goals */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <h2 className="font-bold text-lg mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">track_changes</span> Career Goals</h2>
                {editMode ? (
                  <div className="space-y-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm">
                    <div className="space-y-1">
                      <label className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Short-Term Goal</label>
                      <textarea value={careerGoals?.shortTerm || ''} onChange={e => setCareerGoals({...careerGoals, shortTerm: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Long-Term Goal</label>
                      <textarea value={careerGoals?.longTerm || ''} onChange={e => setCareerGoals({...careerGoals, longTerm: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Higher Studies</label>
                        <input value={careerGoals?.higherStudies || ''} onChange={e => setCareerGoals({...careerGoals, higherStudies: e.target.value})} placeholder="e.g. MS, PhD" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider">Research Area</label>
                        <input value={careerGoals?.researchArea || ''} onChange={e => setCareerGoals({...careerGoals, researchArea: e.target.value})} placeholder="e.g. AI, Climate" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full flex items-start justify-end p-3"><span className="material-symbols-outlined text-[20px] text-primary">flag</span></div>
                      <h3 className="font-extrabold text-[11px] text-primary uppercase tracking-wider mb-2">Short-Term Goal</h3>
                      <p className="text-sm text-on-surface leading-relaxed relative z-10">{careerGoals?.shortTerm || <span className="italic text-on-surface-variant">Not specified</span>}</p>
                    </div>
                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm relative overflow-hidden group hover:border-secondary/30 transition-colors">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-secondary/5 rounded-bl-full flex items-start justify-end p-3"><span className="material-symbols-outlined text-[20px] text-secondary">explore</span></div>
                      <h3 className="font-extrabold text-[11px] text-secondary uppercase tracking-wider mb-2">Long-Term Goal</h3>
                      <p className="text-sm text-on-surface leading-relaxed relative z-10">{careerGoals?.longTerm || <span className="italic text-on-surface-variant">Not specified</span>}</p>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-3">
                      {careerGoals?.higherStudies && (
                        <div className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20 flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-primary text-[18px]">school</span>
                          <div>
                            <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider block leading-tight">Higher Studies</span>
                            <span className="text-sm font-bold text-on-surface leading-tight">{careerGoals.higherStudies}</span>
                          </div>
                        </div>
                      )}
                      {careerGoals?.researchArea && (
                        <div className="bg-secondary/10 px-4 py-2 rounded-xl border border-secondary/20 flex items-center gap-2 shadow-sm">
                          <span className="material-symbols-outlined text-secondary text-[18px]">biotech</span>
                          <div>
                            <span className="text-[10px] font-extrabold text-secondary uppercase tracking-wider block leading-tight">Research Area</span>
                            <span className="text-sm font-bold text-on-surface leading-tight">{careerGoals.researchArea}</span>
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
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <h2 className="font-bold text-xl mb-6">Education</h2>
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center shrink-0 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-primary text-3xl">account_balance</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-on-surface">{user?.institution || 'Your Institution'}</h3>
                    <p className="text-on-surface-variant font-medium">{user?.studyField || 'Your Field of Study'}</p>
                    <p className="text-sm text-on-surface-variant mt-1">GPA: <span className="font-bold text-on-surface">{formatGpa(user?.gpa, user?.gradingSystem, user?.gpaScale, user?.gpaPercentage)}</span></p>
                    
                    {editMode && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30">
                        <div className="space-y-1">
                          <label className="font-bold text-xs text-on-surface-variant uppercase">Institution</label>
                          <input value={form.institution || ''} onChange={e => setForm({ ...form, institution: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                        </div>
                        
                        <div className="space-y-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20 col-span-1 sm:col-span-2">
                          <div className="space-y-1">
                            <label className="font-bold text-xs text-on-surface-variant uppercase">Grading System</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer text-sm">
                                <input type="radio" name="profileGradingSystem" value="CGPA" checked={form.gradingSystem === 'CGPA'} onChange={e => setForm({ ...form, gradingSystem: e.target.value })} className="accent-primary" />
                                <span>CGPA</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer text-sm">
                                <input type="radio" name="profileGradingSystem" value="Percentage" checked={form.gradingSystem === 'Percentage'} onChange={e => setForm({ ...form, gradingSystem: e.target.value })} className="accent-primary" />
                                <span>Percentage</span>
                              </label>
                            </div>
                          </div>
                          
                          {form.gradingSystem === 'CGPA' ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="font-bold text-xs text-on-surface-variant uppercase">Current CGPA</label>
                                <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white" />
                              </div>
                              <div className="space-y-1">
                                <label className="font-bold text-xs text-on-surface-variant uppercase">Out Of</label>
                                <select value={form.gpaScale || '10'} onChange={e => setForm({ ...form, gpaScale: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white">
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <label className="font-bold text-xs text-on-surface-variant uppercase">Current Percentage (%)</label>
                              <input type="number" step="0.1" min="0" max="100" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-lg flex items-center gap-2"><span className="material-symbols-outlined text-primary">work_history</span> Academic Experience</h2>
                  {editMode && <button onClick={() => { setShowAddAcademic(!showAddAcademic); setEditIndexAcademic(null); setNewAcademic({ institution: '', role: 'Research Internship', duration: '', desc: '', skills: '' }) }} className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add Experience</button>}
                </div>

                {editMode && showAddAcademic && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-primary/30 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl"></div>
                    <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-on-surface-variant">{editIndexAcademic !== null ? 'Edit Experience' : 'Add Experience'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newAcademic.institution} onChange={e => setNewAcademic({...newAcademic, institution: e.target.value})} placeholder="Institution" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      
                      <div className="flex flex-col gap-2">
                        <select 
                          value={['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) ? newAcademic.role : 'Other'} 
                          onChange={e => {
                            if (e.target.value === 'Other') setNewAcademic({...newAcademic, role: ''});
                            else setNewAcademic({...newAcademic, role: e.target.value});
                          }} 
                          className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
                        >
                          <option value="Research Internship">Research Internship</option>
                          <option value="Academic Internship">Academic Internship</option>
                          <option value="Research Assistant">Research Assistant</option>
                          <option value="Other">Other...</option>
                        </select>
                        {!['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) && (
                          <input value={newAcademic.role} onChange={e => setNewAcademic({...newAcademic, role: e.target.value})} placeholder="Specify your role (e.g. Industrial Training)" className="w-full px-4 py-2.5 bg-white border border-primary/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                        )}
                      </div>
                      <input value={newAcademic.duration} onChange={e => setNewAcademic({...newAcademic, duration: e.target.value})} placeholder="Duration (e.g. Jun 2023 - Aug 2023)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      <input value={newAcademic.skills} onChange={e => setNewAcademic({...newAcademic, skills: e.target.value})} placeholder="Skills Gained (comma separated)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>
                    <textarea value={newAcademic.desc} onChange={e => setNewAcademic({...newAcademic, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-sm mb-4" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowAddAcademic(false)} className="px-5 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">Cancel</button>
                      <button onClick={() => { if(!newAcademic.institution) return; const updated = [...(academicExperience || [])]; if (editIndexAcademic !== null) updated[editIndexAcademic] = newAcademic; else updated.push(newAcademic); setAcademicExperience(updated); setShowAddAcademic(false); }} className="px-5 py-2 bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/20 ml-4 space-y-10 pb-4 mt-6">
                  {academicExperience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-[3px] border-primary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-extrabold text-lg text-on-surface leading-tight mb-1">{exp.role}</h3>
                          <p className="text-primary font-bold text-sm mb-2">{exp.institution}</p>
                          <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full mb-3">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {exp.duration}
                          </div>
                          <p className="text-sm text-on-surface leading-relaxed">{exp.desc}</p>
                          {exp.skills && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {exp.skills.split(',').map((skill, i) => (
                                <span key={i} className="inline-block bg-primary/5 px-3 py-1 rounded-full text-[11px] font-extrabold text-primary border border-primary/10 tracking-wide uppercase">{skill.trim()}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexAcademic(idx); setNewAcademic(exp); setShowAddAcademic(true); }} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAcademicExperience(academicExperience.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!academicExperience || academicExperience.length === 0) && <p className="pl-8 text-sm text-on-surface-variant italic">No academic experience added yet.</p>}
                </div>
              </div>

              {/* Achievements Timeline */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-lg flex items-center gap-2"><span className="material-symbols-outlined text-secondary">emoji_events</span> Achievements</h2>
                  {editMode && <button onClick={() => { setShowAddAchieve(!showAddAchieve); setEditIndexAchieve(null); setNewAchieve({ title: '', type: 'Academic', org: '', date: '', desc: '', position: '', award: '', link: '' }) }} className="px-4 py-2 bg-secondary/10 text-secondary font-bold rounded-xl hover:bg-secondary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add Achievement</button>}
                </div>

                {editMode && showAddAchieve && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-secondary/30 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-secondary rounded-l-2xl"></div>
                    <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-on-surface-variant">{editIndexAchieve !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newAchieve.title} onChange={e => setNewAchieve({...newAchieve, title: e.target.value})} placeholder="Title (e.g. Dean's List)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm" />
                      <select value={newAchieve.type} onChange={e => setNewAchieve({...newAchieve, type: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm">
                        {['Academic', 'Technical', 'Research', 'Hackathon', 'Competition', 'Leadership', 'Community Service', 'Sports', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input value={newAchieve.org} onChange={e => setNewAchieve({...newAchieve, org: e.target.value})} placeholder="Issuer (e.g. Stanford University)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm" />
                      <input value={newAchieve.date} onChange={e => setNewAchieve({...newAchieve, date: e.target.value})} placeholder="Date (e.g. Fall 2023)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm" />
                      <input value={newAchieve.position} onChange={e => setNewAchieve({...newAchieve, position: e.target.value})} placeholder="Position/Rank (Optional)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm" />
                      <input value={newAchieve.award} onChange={e => setNewAchieve({...newAchieve, award: e.target.value})} placeholder="Award/Prize (Optional)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all shadow-sm" />
                    </div>
                    <textarea value={newAchieve.desc} onChange={e => setNewAchieve({...newAchieve, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none shadow-sm mb-4" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowAddAchieve(false)} className="px-5 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">Cancel</button>
                      <button onClick={() => { if(!newAchieve.title) return; const updated = [...(achievements || [])]; if (editIndexAchieve !== null) updated[editIndexAchieve] = newAchieve; else updated.push(newAchieve); setAchievements(updated); setShowAddAchieve(false); }} className="px-5 py-2 bg-secondary text-white font-bold text-sm rounded-xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/20 ml-4 space-y-10 pb-4 mt-6">
                  {achievements?.map((ach, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-[3px] border-secondary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-extrabold text-lg text-on-surface leading-tight">{ach.title}</h3>
                            <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-secondary/20">{ach.type}</span>
                          </div>
                          <p className="text-secondary font-bold text-sm mb-2">{ach.org}</p>
                          <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full mb-3">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {ach.date}
                          </div>
                          {(ach.position || ach.award) && (
                            <div className="flex gap-4 mb-3">
                              {ach.position && <span className="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded-md border border-outline-variant/30">Rank: {ach.position}</span>}
                              {ach.award && <span className="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded-md border border-outline-variant/30">Prize: {ach.award}</span>}
                            </div>
                          )}
                          <p className="text-sm text-on-surface leading-relaxed">{ach.desc}</p>
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexAchieve(idx); setNewAchieve(ach); setShowAddAchieve(true); }} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-secondary/10 hover:text-secondary rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!achievements || achievements.length === 0) && <p className="pl-8 text-sm text-on-surface-variant italic">No achievements added yet.</p>}
                </div>
              </div>

              {/* Extracurriculars Timeline */}
              <div className="bg-surface-bright rounded-3xl p-8 shadow-sm border border-outline-variant/30">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-lg flex items-center gap-2"><span className="material-symbols-outlined text-primary">groups</span> Extracurricular Activities</h2>
                  {editMode && <button onClick={() => { setShowAddExtracurricular(!showAddExtracurricular); setEditIndexExtra(null); setNewExtra({ name: '', org: '', position: '', duration: '', desc: '' }) }} className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-xl hover:bg-primary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add Activity</button>}
                </div>

                {editMode && showAddExtracurricular && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-primary/30 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-2xl"></div>
                    <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-on-surface-variant">{editIndexExtra !== null ? 'Edit Activity' : 'Add Activity'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Activity Name (e.g. Volunteer)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      <input value={newExtra.org} onChange={e => setNewExtra({...newExtra, org: e.target.value})} placeholder="Organization/Club" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      <input value={newExtra.position} onChange={e => setNewExtra({...newExtra, position: e.target.value})} placeholder="Role/Position (Optional)" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                      <input value={newExtra.duration} onChange={e => setNewExtra({...newExtra, duration: e.target.value})} placeholder="Duration" className="w-full px-4 py-2.5 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm" />
                    </div>
                    <textarea value={newExtra.desc} onChange={e => setNewExtra({...newExtra, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-4 py-3 bg-white border border-outline-variant/50 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none shadow-sm mb-4" />
                    <div className="flex justify-end gap-3">
                      <button onClick={() => setShowAddExtracurricular(false)} className="px-5 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">Cancel</button>
                      <button onClick={() => { if(!newExtra.name) return; const updated = [...(extracurriculars || [])]; if (editIndexExtra !== null) updated[editIndexExtra] = newExtra; else updated.push(newExtra); setExtracurriculars(updated); setShowAddExtracurricular(false); }} className="px-5 py-2 bg-primary text-white font-bold text-sm rounded-xl shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/20 ml-4 space-y-10 pb-4 mt-6">
                  {extracurriculars?.map((extra, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-[3px] border-primary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-extrabold text-lg text-on-surface leading-tight mb-1">{extra.name}</h3>
                          <p className="text-primary font-bold text-sm mb-2">{extra.org}</p>
                          <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant font-bold uppercase tracking-wider bg-surface-container-low px-3 py-1 rounded-full mb-3">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {extra.duration}
                          </div>
                          {extra.position && <div className="mt-1 mb-2 inline-block bg-surface-container-lowest px-2 py-1 rounded-md text-xs font-bold border border-outline-variant/30 text-on-surface-variant">Role: {extra.position}</div>}
                          <p className="text-sm text-on-surface leading-relaxed">{extra.desc}</p>
                        </div>
                        {editMode && (
                          <div className="flex gap-1">
                            <button onClick={() => { setEditIndexExtra(idx); setNewExtra(extra); setShowAddExtracurricular(true); }} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setExtracurriculars(extracurriculars.filter((_, i) => i !== idx))} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!extracurriculars || extracurriculars.length === 0) && <p className="pl-8 text-sm text-on-surface-variant italic">No extracurricular activities added yet.</p>}
                </div>
              </div>

            </div>
          )}

          {/* TAB: DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="glass-card rounded-3xl p-16 text-center shadow-sm border border-outline-variant/30 bg-surface-bright animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 mx-auto bg-primary/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-primary/10">
                <span className="material-symbols-outlined text-primary text-5xl">description</span>
              </div>
              <h2 className="font-headline-md text-3xl font-bold mb-3 tracking-tight">Document Center</h2>
              <p className="text-on-surface-variant max-w-md mx-auto mb-10 text-lg">Upload your resume, transcripts, and recommendation letters to easily attach them to scholarship applications.</p>
              <button className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">Upload New Document</button>
            </div>
          )}

          {/* TAB: ACTIVITY */}
          {activeTab === 'activity' && (
            <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center shadow-inner border border-secondary/10 shrink-0">
                    <span className="material-symbols-outlined text-secondary text-3xl">history</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-2xl font-bold tracking-tight">Application History</h2>
                    <p className="text-on-surface-variant text-sm mt-1">Your finalized applications</p>
                  </div>
                </div>
                <Link href="/tracker" className="px-5 py-2.5 bg-secondary text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all whitespace-nowrap">
                  View Tracker
                </Link>
              </div>

              {historyCards.length > 0 ? (
                <div className="space-y-4">
                  {historyCards.map((card, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low transition-colors group">
                      <div>
                        <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{card.title}</h3>
                        {card.amount && <p className="text-sm font-bold text-green-600 mt-2">{card.amount}</p>}
                      </div>
                      <div className="shrink-0 ml-4">
                        {card.columnId === 'col_accepted' ? (
                          <span className="px-4 py-1.5 bg-green-100 text-green-700 font-bold text-xs rounded-full border border-green-200 shadow-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span> Offer
                          </span>
                        ) : (
                          <span className="px-4 py-1.5 bg-red-100 text-red-700 font-bold text-xs rounded-full border border-red-200 shadow-sm flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">cancel</span> Rejected
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 border-dashed">
                  <p className="text-on-surface-variant max-w-md mx-auto text-base">No completed applications yet. Start tracking your applications to see your history here.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
