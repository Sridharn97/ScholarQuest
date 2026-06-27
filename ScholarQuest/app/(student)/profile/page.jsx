'use client';
import Link from 'next/link';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useProfile from '@/lib/hooks/useProfile';

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
          <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary/80 to-secondary/80 opacity-20"></div>
            
            <div className="relative flex flex-col items-center text-center mt-4">
              <div className="w-32 h-32 rounded-full bg-surface-bright p-1 shadow-xl border-2 border-primary/20 mb-6">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-4xl">
                  {user?.initials || 'AJ'}
                </div>
              </div>
              
              {editMode ? (
                <div className="w-full space-y-3 mb-6 text-left">
                  <input value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary" />
                  <input value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary" />
                  
                  <div className="space-y-1 mt-4">
                    <label className="font-label-sm text-on-surface-variant">Phone</label>
                    <div className="flex w-full px-3 py-1 border border-outline-variant/50 rounded-md overflow-hidden bg-white shadow-sm focus-within:border-primary">
                      <PhoneInput international defaultCountry="US" value={form.phone || ''} onChange={val => setForm({ ...form, phone: val })} className="w-full text-sm outline-none bg-transparent sq-phone-input" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="font-label-sm text-on-surface-variant">Location</label>
                    <input value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="City, Country" className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="font-label-sm text-on-surface-variant">LinkedIn</label>
                    <input value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/..." className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm" />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="font-headline-lg text-2xl font-bold text-on-surface mb-2 tracking-tight">{user?.name || 'Alex Johnson'}</h1>
                  <p className="font-body-md text-primary font-bold mb-1">{user?.studyField || 'Computer Science'}</p>
                  <p className="font-body-sm text-on-surface-variant mb-4">{user?.institution || 'Stanford University'}</p>
                  
                  <div className="flex items-center gap-1.5 text-on-surface-variant text-sm mb-6 bg-surface-container-low px-4 py-1.5 rounded-full">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {user?.nationality || 'San Francisco Bay Area'}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="w-full flex gap-2">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-primary text-on-primary transition-all shadow-md hover:shadow-lg hover:bg-primary/90">Save</button>
                    <button onClick={() => setEditMode(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-surface-container-highest text-on-surface transition-all hover:bg-surface-container-highest/80">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold bg-primary/10 text-primary transition-all hover:bg-primary/20">Edit Profile</button>
                )}
              </div>
              
              <div className="w-full mt-8 pt-6 border-t border-outline-variant/20 text-left">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-on-surface">Profile Strength</span>
                  <span className="font-bold text-sm text-primary">{completion}%</span>
                </div>
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out" style={{ width: `${completion}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Skills & Interests Sidebar Card */}
          <div className="glass-card rounded-3xl p-6 shadow-sm border border-outline-variant/30 bg-surface-bright">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">psychology</span> Skills
              </h3>
              {editMode && <button onClick={() => setShowSkillInput(!showSkillInput)} className="p-1 hover:bg-surface-container-low rounded-full text-primary"><span className="material-symbols-outlined">add</span></button>}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {skills?.map((skill) => (
                <div key={skill} className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-lg text-sm font-medium text-on-surface border border-outline-variant/10 shadow-sm">
                  {skill}
                  {editMode && <button onClick={() => removeSkill(skill)} className="text-error hover:text-error/80 ml-1"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                </div>
              ))}
              {skills?.length === 0 && <p className="text-sm text-on-surface-variant">No skills added.</p>}
            </div>

            {editMode && showSkillInput && (
              <div className="flex items-center gap-2 mb-6 bg-surface-container-lowest p-1 rounded-lg border border-primary/50 shadow-sm">
                <input autoFocus value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} placeholder="Add skill..." className="flex-1 px-3 py-1.5 bg-transparent text-sm outline-none" />
                <button onClick={addSkill} className="px-3 py-1.5 bg-primary text-white font-bold text-xs rounded-md">Add</button>
              </div>
            )}

            <div className="flex justify-between items-center mb-4 pt-6 border-t border-outline-variant/20">
              <h3 className="font-bold text-lg text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">favorite</span> Interests
              </h3>
              {editMode && <button onClick={() => setShowInterestInput(!showInterestInput)} className="p-1 hover:bg-surface-container-low rounded-full text-secondary"><span className="material-symbols-outlined">add</span></button>}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {interests?.map((interest) => (
                <div key={interest} className="flex items-center gap-1 bg-secondary/10 px-3 py-1.5 rounded-lg text-sm font-medium text-secondary border border-secondary/20 shadow-sm">
                  {interest}
                  {editMode && <button onClick={() => removeInterest(interest)} className="hover:opacity-70 ml-1"><span className="material-symbols-outlined text-[14px]">close</span></button>}
                </div>
              ))}
              {interests?.length === 0 && <p className="text-sm text-on-surface-variant">No interests added.</p>}
            </div>
            
            {editMode && showInterestInput && (
              <div className="flex items-center gap-2 mt-4 bg-surface-container-lowest p-1 rounded-lg border border-secondary/50 shadow-sm">
                <input autoFocus value={newInterest} onChange={e => setNewInterest(e.target.value)} onKeyDown={e => e.key === 'Enter' && addInterest()} placeholder="Add interest..." className="flex-1 px-3 py-1.5 bg-transparent text-sm outline-none" />
                <button onClick={addInterest} className="px-3 py-1.5 bg-secondary text-white font-bold text-xs rounded-md">Add</button>
              </div>
            )}
          </div>
        </div>


        {/* =======================
            RIGHT COLUMN (CONTENT)
            ======================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tab Navigation */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 mb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap shadow-sm ${
                  activeTab === tab.id
                    ? 'bg-surface-bright text-primary border border-primary/20 ring-1 ring-primary/10'
                    : 'bg-surface-bright text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/30'
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
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <h2 className="font-bold text-xl mb-6">Private Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-3xl">task_alt</span>
                    </div>
                    <div>
                      <p className="font-bold text-2xl">18</p>
                      <p className="text-sm font-medium text-on-surface-variant">Applied Scholarships</p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 flex items-center gap-4">
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                      <span className="material-symbols-outlined text-3xl">bookmark</span>
                    </div>
                    <div>
                      <p className="font-bold text-2xl">5</p>
                      <p className="text-sm font-medium text-on-surface-variant">Saved Opportunities</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <h2 className="font-bold text-xl mb-4">About Me</h2>
                {editMode ? (
                  <textarea rows={6} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Write a compelling summary about your academic journey..." className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-none" />
                ) : (
                  <p className="text-on-surface leading-relaxed whitespace-pre-wrap">{form.bio || 'Add a bio to tell scholarship providers about yourself. Highlighting your achievements and aspirations can significantly increase your chances of standing out.'}</p>
                )}
              </div>

              {/* Career Goals */}
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <h2 className="font-bold text-xl mb-6">Career Goals</h2>
                {editMode ? (
                  <div className="space-y-4 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30">
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">Short-Term Goal</label>
                      <textarea value={careerGoals?.shortTerm || ''} onChange={e => setCareerGoals({...careerGoals, shortTerm: e.target.value})} rows={2} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">Long-Term Goal</label>
                      <textarea value={careerGoals?.longTerm || ''} onChange={e => setCareerGoals({...careerGoals, longTerm: e.target.value})} rows={2} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">Higher Studies</label>
                        <input value={careerGoals?.higherStudies || ''} onChange={e => setCareerGoals({...careerGoals, higherStudies: e.target.value})} placeholder="e.g. MS, PhD" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">Research Area</label>
                        <input value={careerGoals?.researchArea || ''} onChange={e => setCareerGoals({...careerGoals, researchArea: e.target.value})} placeholder="e.g. AI, Climate" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
                      <h3 className="font-bold text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">flag</span> Short-Term</h3>
                      <p className="text-sm text-on-surface leading-relaxed">{careerGoals?.shortTerm || 'Not specified'}</p>
                    </div>
                    <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/20 shadow-sm">
                      <h3 className="font-bold text-xs text-secondary uppercase tracking-wider mb-2 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">explore</span> Long-Term</h3>
                      <p className="text-sm text-on-surface leading-relaxed">{careerGoals?.longTerm || 'Not specified'}</p>
                    </div>
                    <div className="md:col-span-2 flex flex-wrap gap-4">
                      {careerGoals?.higherStudies && (
                        <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
                          <span className="text-xs font-bold text-on-surface-variant block mb-0.5">Higher Studies</span>
                          <span className="text-sm font-bold text-primary">{careerGoals.higherStudies}</span>
                        </div>
                      )}
                      {careerGoals?.researchArea && (
                        <div className="bg-secondary/5 px-4 py-2 rounded-xl border border-secondary/10">
                          <span className="text-xs font-bold text-on-surface-variant block mb-0.5">Research Area</span>
                          <span className="text-sm font-bold text-secondary">{careerGoals.researchArea}</span>
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
                    <p className="text-sm text-on-surface-variant mt-1">GPA: <span className="font-bold text-on-surface">{user?.gpa || '—'}</span></p>
                    
                    {editMode && (
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30">
                        <div className="space-y-1">
                          <label className="font-bold text-xs text-on-surface-variant uppercase">Institution</label>
                          <input value={form.institution || ''} onChange={e => setForm({ ...form, institution: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-xs text-on-surface-variant uppercase">GPA</label>
                          <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Experience Timeline */}
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-xl">Academic Experience</h2>
                  {editMode && <button onClick={() => { setShowAddAcademic(!showAddAcademic); setEditIndexAcademic(null); setNewAcademic({ institution: '', role: 'Research Internship', duration: '', desc: '', skills: '' }) }} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add</button>}
                </div>

                {editMode && showAddAcademic && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-primary/30 shadow-inner">
                    <h3 className="font-bold text-sm mb-4">{editIndexAcademic !== null ? 'Edit Experience' : 'Add Experience'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newAcademic.institution} onChange={e => setNewAcademic({...newAcademic, institution: e.target.value})} placeholder="Institution" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      
                      <div className="flex flex-col gap-2">
                        <select 
                          value={['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) ? newAcademic.role : 'Other'} 
                          onChange={e => {
                            if (e.target.value === 'Other') setNewAcademic({...newAcademic, role: ''});
                            else setNewAcademic({...newAcademic, role: e.target.value});
                          }} 
                          className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white"
                        >
                          <option value="Research Internship">Research Internship</option>
                          <option value="Academic Internship">Academic Internship</option>
                          <option value="Research Assistant">Research Assistant</option>
                          <option value="Other">Other...</option>
                        </select>
                        {!['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) && (
                          <input value={newAcademic.role} onChange={e => setNewAcademic({...newAcademic, role: e.target.value})} placeholder="Specify your role (e.g. Industrial Training)" className="w-full px-3 py-2 border border-primary/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm" />
                        )}
                      </div>
                      <input value={newAcademic.duration} onChange={e => setNewAcademic({...newAcademic, duration: e.target.value})} placeholder="Duration (e.g. Jun 2023 - Aug 2023)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newAcademic.skills} onChange={e => setNewAcademic({...newAcademic, skills: e.target.value})} placeholder="Skills Gained (comma separated)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <textarea value={newAcademic.desc} onChange={e => setNewAcademic({...newAcademic, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddAcademic(false)} className="px-4 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg">Cancel</button>
                      <button onClick={() => { if(!newAcademic.institution) return; const updated = [...(academicExperience || [])]; if (editIndexAcademic !== null) updated[editIndexAcademic] = newAcademic; else updated.push(newAcademic); setAcademicExperience(updated); setShowAddAcademic(false); }} className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg shadow-sm">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/30 ml-6 space-y-8 pb-4">
                  {academicExperience?.map((exp, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-2 border-primary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-on-surface">{exp.role}</h3>
                          <p className="text-primary font-medium text-sm">{exp.institution}</p>
                          <p className="text-xs text-on-surface-variant mt-1 uppercase font-bold tracking-wider">{exp.duration}</p>
                          <p className="text-sm text-on-surface leading-relaxed mt-3">{exp.desc}</p>
                          {exp.skills && <div className="mt-3 inline-block bg-surface-container-low px-3 py-1 rounded-lg text-xs font-medium text-on-surface-variant border border-outline-variant/20">Skills: {exp.skills}</div>}
                        </div>
                        {editMode && (
                          <div className="flex gap-2">
                            <button onClick={() => { setEditIndexAcademic(idx); setNewAcademic(exp); setShowAddAcademic(true); }} className="p-1.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAcademicExperience(academicExperience.filter((_, i) => i !== idx))} className="p-1.5 text-on-surface-variant hover:bg-error/10 hover:text-error rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!academicExperience || academicExperience.length === 0) && <p className="pl-8 text-sm text-on-surface-variant italic">No academic experience added yet.</p>}
                </div>
              </div>

              {/* Achievements Timeline */}
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-xl">Achievements</h2>
                  {editMode && <button onClick={() => { setShowAddAchieve(!showAddAchieve); setEditIndexAchieve(null); setNewAchieve({ title: '', type: 'Academic', org: '', date: '', desc: '', position: '', award: '', link: '' }) }} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add</button>}
                </div>

                {editMode && showAddAchieve && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-primary/30 shadow-inner">
                    <h3 className="font-bold text-sm mb-4">{editIndexAchieve !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newAchieve.title} onChange={e => setNewAchieve({...newAchieve, title: e.target.value})} placeholder="Achievement Title" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <select value={newAchieve.type} onChange={e => setNewAchieve({...newAchieve, type: e.target.value})} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white">
                        {['Academic', 'Technical', 'Research', 'Hackathon', 'Competition', 'Leadership', 'Community Service', 'Sports', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <input value={newAchieve.org} onChange={e => setNewAchieve({...newAchieve, org: e.target.value})} placeholder="Issuing Organization" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newAchieve.date} onChange={e => setNewAchieve({...newAchieve, date: e.target.value})} placeholder="Date Achieved" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newAchieve.position} onChange={e => setNewAchieve({...newAchieve, position: e.target.value})} placeholder="Position/Rank (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newAchieve.award} onChange={e => setNewAchieve({...newAchieve, award: e.target.value})} placeholder="Award/Prize (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newAchieve.link} onChange={e => setNewAchieve({...newAchieve, link: e.target.value})} placeholder="Verification Link (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary sm:col-span-2" />
                    </div>
                    <textarea value={newAchieve.desc} onChange={e => setNewAchieve({...newAchieve, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddAchieve(false)} className="px-4 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg">Cancel</button>
                      <button onClick={() => { if(!newAchieve.title) return; const updated = [...(achievements || [])]; if (editIndexAchieve !== null) updated[editIndexAchieve] = newAchieve; else updated.push(newAchieve); setAchievements(updated.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0))); setShowAddAchieve(false); }} className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg shadow-sm">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/30 ml-6 space-y-8 pb-4">
                  {achievements?.map((ach, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-2 border-secondary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-on-surface">{ach.title}</h3>
                            <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-secondary/20">{ach.type}</span>
                          </div>
                          <p className="text-on-surface-variant font-medium text-sm">{ach.org}</p>
                          <p className="text-xs text-on-surface-variant mt-1 uppercase font-bold tracking-wider">{ach.date}</p>
                          {(ach.position || ach.award) && (
                            <div className="flex gap-4 mt-3">
                              {ach.position && <span className="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded-md border border-outline-variant/30">Rank: {ach.position}</span>}
                              {ach.award && <span className="text-xs font-bold bg-surface-container-lowest px-2 py-1 rounded-md border border-outline-variant/30">Prize: {ach.award}</span>}
                            </div>
                          )}
                          <p className="text-sm text-on-surface leading-relaxed mt-3">{ach.desc}</p>
                          {ach.link && (
                            <a href={ach.link.startsWith('http') ? ach.link : `https://${ach.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-primary hover:underline bg-primary/5 px-2 py-1 rounded-md">
                              <span className="material-symbols-outlined text-[14px]">link</span> Verify Achievement
                            </a>
                          )}
                        </div>
                        {editMode && (
                          <div className="flex gap-2">
                            <button onClick={() => { setEditIndexAchieve(idx); setNewAchieve(ach); setShowAddAchieve(true); }} className="p-1.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="p-1.5 text-on-surface-variant hover:bg-error/10 hover:text-error rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!achievements || achievements.length === 0) && <p className="pl-8 text-sm text-on-surface-variant italic">No achievements added yet.</p>}
                </div>
              </div>

              {/* Extracurricular Activities Timeline */}
              <div className="glass-card rounded-3xl p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-bold text-xl">Extracurricular Activities</h2>
                  {editMode && <button onClick={() => { setShowAddExtracurricular(!showAddExtracurricular); setEditIndexExtra(null); setNewExtra({ name: '', org: '', position: '', duration: '', desc: '' }) }} className="px-4 py-1.5 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">add</span> Add</button>}
                </div>

                {editMode && showAddExtracurricular && (
                  <div className="mb-8 bg-surface-container-lowest p-6 rounded-2xl border border-primary/30 shadow-inner">
                    <h3 className="font-bold text-sm mb-4">{editIndexExtra !== null ? 'Edit Activity' : 'Add Activity'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Activity Name" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newExtra.org} onChange={e => setNewExtra({...newExtra, org: e.target.value})} placeholder="Organization/Club" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newExtra.position} onChange={e => setNewExtra({...newExtra, position: e.target.value})} placeholder="Position (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                      <input value={newExtra.duration} onChange={e => setNewExtra({...newExtra, duration: e.target.value})} placeholder="Duration" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <textarea value={newExtra.desc} onChange={e => setNewExtra({...newExtra, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary mb-4" />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setShowAddExtracurricular(false)} className="px-4 py-2 font-bold text-sm text-on-surface-variant hover:bg-surface-container-low rounded-lg">Cancel</button>
                      <button onClick={() => { if(!newExtra.name) return; const updated = [...(extracurriculars || [])]; if (editIndexExtra !== null) updated[editIndexExtra] = newExtra; else updated.push(newExtra); setExtracurriculars(updated); setShowAddExtracurricular(false); }} className="px-4 py-2 bg-primary text-white font-bold text-sm rounded-lg shadow-sm">Save</button>
                    </div>
                  </div>
                )}

                <div className="relative border-l-2 border-outline-variant/30 ml-6 space-y-8 pb-4">
                  {extracurriculars?.map((extra, idx) => (
                    <div key={idx} className="relative pl-8 group">
                      <div className="absolute w-4 h-4 bg-surface-bright border-2 border-tertiary rounded-full -left-[9px] top-1.5 group-hover:scale-125 transition-transform shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-on-surface">{extra.name}</h3>
                          <p className="text-on-surface-variant font-medium text-sm">{extra.org}</p>
                          <p className="text-xs text-on-surface-variant mt-1 uppercase font-bold tracking-wider">{extra.duration}</p>
                          {extra.position && <div className="mt-3 inline-block bg-surface-container-lowest px-2 py-1 rounded-md text-xs font-bold border border-outline-variant/30">Role: {extra.position}</div>}
                          <p className="text-sm text-on-surface leading-relaxed mt-3">{extra.desc}</p>
                        </div>
                        {editMode && (
                          <div className="flex gap-2">
                            <button onClick={() => { setEditIndexExtra(idx); setNewExtra(extra); setShowAddExtracurricular(true); }} className="p-1.5 text-on-surface-variant hover:bg-primary/10 hover:text-primary rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                            <button onClick={() => setExtracurriculars(extracurriculars.filter((_, i) => i !== idx))} className="p-1.5 text-on-surface-variant hover:bg-error/10 hover:text-error rounded-lg transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
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
            <div className="glass-card rounded-3xl p-16 text-center shadow-sm border border-outline-variant/30 bg-surface-bright animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-24 h-24 mx-auto bg-secondary/5 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-secondary/10">
                <span className="material-symbols-outlined text-secondary text-5xl">history</span>
              </div>
              <h2 className="font-headline-md text-3xl font-bold mb-3 tracking-tight">Application History</h2>
              <p className="text-on-surface-variant max-w-md mx-auto mb-10 text-lg">Track your saved scholarships and submitted applications all in one beautifully organized dashboard.</p>
              <Link href="/tracker" className="px-8 py-4 bg-secondary text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all inline-block">Go to Scholarship Tracker</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
