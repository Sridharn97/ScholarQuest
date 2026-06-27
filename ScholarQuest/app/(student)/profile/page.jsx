'use client';
import Link from 'next/link';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useProfile from '@/lib/hooks/useProfile';

export default function ProfilePage() {
  const {
    editMode,
    setEditMode,
    activeTab,
    setActiveTab,
    user,
    form,
    setForm,
    skills,
    interests,
    newSkill,
    setNewSkill,
    newInterest,
    setNewInterest,
    saved,
    showSkillInput,
    setShowSkillInput,
    showInterestInput,
    setShowInterestInput,
    handleSave,
    removeSkill,
    addSkill,
    removeInterest,
    addInterest,
    achievements,
    setAchievements,
    careerGoals,
    setCareerGoals,
    extracurriculars,
    setExtracurriculars,
    academicExperience,
    setAcademicExperience,
    completion,
    circumference,
    offset,
    tabs,
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Success toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-subtle-float">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          Profile saved successfully!
        </div>
      )}

      {/* 1. Hero Card */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 bg-surface-bright">
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-primary/80 to-secondary/80 relative">
          <div className="absolute inset-0 hero-gradient opacity-50 mix-blend-overlay"></div>
          {editMode && (
            <button className="absolute top-4 right-4 p-2 bg-surface-bright/80 hover:bg-surface-bright rounded-full shadow-sm transition-colors text-primary">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>photo_camera</span>
            </button>
          )}
        </div>

        <div className="px-6 sm:px-10 pb-10 relative -mt-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4">
            {/* Avatar */}
            <div className="relative inline-block shrink-0">
              <div className="w-40 h-40 rounded-full bg-surface-bright p-1 shadow-xl border border-outline-variant/20">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-5xl">
                  {user?.initials || 'AJ'}
                </div>
              </div>
              <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-surface-bright flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 w-full sm:w-auto">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full font-label-md bg-primary text-on-primary transition-all shadow-md hover:shadow-lg hover:bg-primary/90">
                    Save Profile
                  </button>
                  <button onClick={() => setEditMode(false)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full font-label-md bg-transparent border-2 border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditMode(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full font-label-md bg-transparent border-2 border-primary text-primary hover:bg-primary/5 transition-all">
                    Edit Profile
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="max-w-2xl">
            {editMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="First Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
                <input value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Last Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
              </div>
            ) : (
              <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{user?.name || 'Alex Johnson'}</h1>
            )}

            <p className="font-body-lg text-on-surface font-medium mb-1">{user?.studyField || 'Computer Science'} at {user?.institution || 'Stanford University'}</p>
            <p className="font-body-sm text-on-surface-variant flex items-center gap-1 mb-2">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              {user?.nationality || 'San Francisco Bay Area'}
            </p>

            {editMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                <div className="space-y-1">
                  <label className="font-label-sm text-on-surface-variant">Phone</label>
                  <div className="flex w-full px-3 py-1 border border-outline-variant/50 rounded-md overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 bg-white shadow-sm">
                    <PhoneInput
                      international
                      defaultCountry="US"
                      value={form.phone || ''}
                      onChange={val => setForm({ ...form, phone: val })}
                      className="w-full text-sm outline-none bg-transparent sq-phone-input"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label-sm text-on-surface-variant">Location</label>
                  <input value={form.nationality || ''} onChange={e => setForm({ ...form, nationality: e.target.value })} placeholder="City, Country" className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm h-[38px]" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-label-sm text-on-surface-variant">LinkedIn URL</label>
                  <input value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/..." className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm h-[38px]" />
                </div>
              </div>
            ) : (
              <p className="font-label-md text-primary cursor-pointer hover:underline inline-flex items-center gap-1">Contact info</p>
            )}
          </div>
        </div>
      </div>

      {/* 2. Analytics (Private Dashboard) */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <h2 className="font-headline-md text-xl font-bold mb-1">Analytics</h2>
        <p className="font-body-sm text-on-surface-variant mb-6 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">visibility</span> Private to you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
          <div className="flex items-start gap-4 pt-4 md:pt-0">
            <span className="material-symbols-outlined text-on-surface text-3xl">group</span>
            <div>
              <p className="font-headline-md text-xl font-bold">18</p>
              <p className="font-body-sm text-on-surface hover:text-primary cursor-pointer hover:underline">Scholarships applied</p>
              <p className="font-body-sm text-on-surface-variant text-[13px] mt-1">Track your active applications.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
            <span className="material-symbols-outlined text-on-surface text-3xl">school</span>
            <div>
              <p className="font-headline-md text-xl font-bold">{user?.gpa || '—'}</p>
              <p className="font-body-sm text-on-surface hover:text-primary cursor-pointer hover:underline">Cumulative GPA</p>
              <p className="font-body-sm text-on-surface-variant text-[13px] mt-1">Verified academic standing.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-6">
            <span className="material-symbols-outlined text-on-surface text-3xl">auto_awesome</span>
            <div className="w-full">
              <p className="font-headline-md text-xl font-bold">{completion}%</p>
              <p className="font-body-sm text-on-surface mb-2">Profile strength</p>
              <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. About */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline-md text-xl font-bold">About</h2>
          {!editMode && (
            <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary">
              <span className="material-symbols-outlined">edit</span>
            </button>
          )}
        </div>

        {editMode ? (
          <textarea rows={5} value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Write a compelling summary about your academic journey, goals, and what makes you a great scholarship candidate..." className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none shadow-inner" />
        ) : (
          <div className="relative">
            <p className="font-body-md text-on-surface leading-relaxed whitespace-pre-wrap">
              {form.bio || 'Add a bio to tell scholarship providers about yourself. Highlighting your achievements and aspirations can significantly increase your chances of standing out.'}
            </p>
          </div>
        )}
      </div>

      {/* 4. Experience / Education */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Education</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">add</span></button>
            {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
          </div>
        </div>

        <div className="space-y-6">
          {[
            { school: user?.institution || 'Your Institution', degree: user?.studyField || 'Your Field of Study', period: 'Aug 2022 – Present', gpa: user?.gpa || '—' },
          ].map((edu, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">account_balance</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-lg font-bold text-on-surface">{edu.school}</h3>
                    <p className="font-body-md text-on-surface">{edu.degree}</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">{edu.period}</p>
                    {edu.gpa !== '—' && (
                      <p className="font-body-sm text-on-surface mt-2">Grade: {edu.gpa}</p>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
                    <div className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant">Institution</label>
                      <input value={form.institution || ''} onChange={e => setForm({ ...form, institution: e.target.value })} placeholder="Institution" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant">GPA</label>
                      <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({ ...form, gpa: e.target.value })} placeholder="GPA" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Skills & Interests */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Skills</h2>
          <div className="flex gap-2">
            {editMode ? (
              <button onClick={() => setShowSkillInput(!showSkillInput)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">add</span></button>
            ) : (
              <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>
            )}
          </div>
        </div>

        {editMode && showSkillInput && (
          <div className="flex items-center gap-2 mb-6 bg-surface-container-lowest p-1.5 rounded-xl border border-primary/50 shadow-sm max-w-sm">
            <input
              autoFocus
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
              placeholder="Add a new skill..."
              className="flex-1 px-3 py-1.5 bg-transparent text-sm outline-none"
            />
            <button onClick={addSkill} className="px-4 py-1.5 bg-primary text-white font-label-sm rounded-lg hover:bg-primary/90 transition-colors">Add</button>
          </div>
        )}

        <div className="space-y-4">
          {skills.map((skill, idx) => (
            <div key={skill} className={`pb-4 ${idx !== skills.length - 1 ? 'border-b border-outline-variant/20' : ''}`}>
              <div className="flex items-center justify-between">
                <p className="font-headline-md text-base font-bold text-on-surface">{skill}</p>
                {editMode && <button onClick={() => removeSkill(skill)} className="p-1 hover:bg-error/10 text-on-surface-variant hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Career Goals */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Career Goals</h2>
          {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
        </div>

        {editMode ? (
          <div className="space-y-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30">
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Short-Term Goal</label>
              <textarea value={careerGoals.shortTerm} onChange={e => setCareerGoals({...careerGoals, shortTerm: e.target.value})} rows={2} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            </div>
            <div className="space-y-1">
              <label className="font-label-sm text-on-surface-variant">Long-Term Goal</label>
              <textarea value={careerGoals.longTerm} onChange={e => setCareerGoals({...careerGoals, longTerm: e.target.value})} rows={2} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-sm text-on-surface-variant">Preferred Higher Studies</label>
                <input value={careerGoals.higherStudies} onChange={e => setCareerGoals({...careerGoals, higherStudies: e.target.value})} placeholder="e.g. MS, MTech, PhD" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              </div>
              <div className="space-y-1">
                <label className="font-label-sm text-on-surface-variant">Preferred Research Area</label>
                <input value={careerGoals.researchArea} onChange={e => setCareerGoals({...careerGoals, researchArea: e.target.value})} placeholder="e.g. AI, Climate Tech" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-on-surface text-sm">Short-Term Goal</h3>
              <p className="font-body-md text-on-surface-variant mt-1">{careerGoals?.shortTerm || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-sm">Long-Term Goal</h3>
              <p className="font-body-md text-on-surface-variant mt-1">{careerGoals?.longTerm || 'Not specified'}</p>
            </div>
            <div className="flex gap-8">
              {careerGoals?.higherStudies && (
                <div>
                  <h3 className="font-bold text-on-surface text-sm">Preferred Higher Studies</h3>
                  <p className="font-body-md text-on-surface-variant mt-1">{careerGoals.higherStudies}</p>
                </div>
              )}
              {careerGoals?.researchArea && (
                <div>
                  <h3 className="font-bold text-on-surface text-sm">Preferred Research Area</h3>
                  <p className="font-body-md text-on-surface-variant mt-1">{careerGoals.researchArea}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 7. Academic Experience */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Academic Experience</h2>
          <div className="flex gap-2">
            {editMode && <button onClick={() => { setShowAddAcademic(!showAddAcademic); setEditIndexAcademic(null); setNewAcademic({ institution: '', role: 'Research Internship', duration: '', desc: '', skills: '' }) }} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">{showAddAcademic ? 'close' : 'add'}</span></button>}
            {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
          </div>
        </div>

        {editMode && showAddAcademic && (
          <div className="mb-6 bg-surface-container-lowest p-4 rounded-xl border border-primary/50 space-y-4">
            <h3 className="font-bold text-sm mb-2">{editIndexAcademic !== null ? 'Edit Experience' : 'Add Experience'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={newAcademic.institution} onChange={e => setNewAcademic({...newAcademic, institution: e.target.value})} placeholder="Institution" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              
              <div className="flex flex-col gap-2">
                <select 
                  value={['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) ? newAcademic.role : 'Other'} 
                  onChange={e => {
                    if (e.target.value === 'Other') setNewAcademic({...newAcademic, role: ''});
                    else setNewAcademic({...newAcademic, role: e.target.value});
                  }} 
                  className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary"
                >
                  <option value="Research Internship">Research Internship</option>
                  <option value="Academic Internship">Academic Internship</option>
                  <option value="Research Assistant">Research Assistant</option>
                  <option value="Other">Other...</option>
                </select>
                
                {!['Research Internship', 'Academic Internship', 'Research Assistant'].includes(newAcademic.role) && (
                  <input 
                    value={newAcademic.role} 
                    onChange={e => setNewAcademic({...newAcademic, role: e.target.value})} 
                    placeholder="Specify your role (e.g. Industrial Training)" 
                    autoFocus
                    className="w-full px-3 py-2 border border-primary/50 rounded-md text-sm outline-none focus:ring-1 focus:ring-primary/20 bg-surface-bright" 
                  />
                )}
              </div>
              
              <input value={newAcademic.duration} onChange={e => setNewAcademic({...newAcademic, duration: e.target.value})} placeholder="Duration (e.g. Jun 2023 - Aug 2023)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newAcademic.skills} onChange={e => setNewAcademic({...newAcademic, skills: e.target.value})} placeholder="Skills Gained (comma separated)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            </div>
            <textarea value={newAcademic.desc} onChange={e => setNewAcademic({...newAcademic, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddAcademic(false)} className="px-4 py-2 border border-outline-variant rounded-md text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Cancel</button>
              <button onClick={() => {
                if(!newAcademic.institution) return;
                const updated = [...academicExperience];
                if (editIndexAcademic !== null) updated[editIndexAcademic] = newAcademic;
                else updated.push(newAcademic);
                setAcademicExperience(updated);
                setShowAddAcademic(false);
              }} className="px-4 py-2 bg-primary text-white rounded-md text-sm font-bold shadow-sm hover:opacity-90">Save</button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {academicExperience.map((exp, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">science</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-lg font-bold text-on-surface">{exp.role}</h3>
                    <p className="font-body-md text-on-surface">{exp.institution}</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">{exp.duration}</p>
                    <p className="font-body-sm text-on-surface mt-2 leading-relaxed">{exp.desc}</p>
                    {exp.skills && <p className="font-body-sm text-on-surface-variant mt-2 font-medium">Skills: {exp.skills}</p>}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <button onClick={() => { setEditIndexAcademic(idx); setNewAcademic(exp); setShowAddAcademic(true); }} className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button onClick={() => setAcademicExperience(academicExperience.filter((_, i) => i !== idx))} className="p-1 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {academicExperience.length === 0 && !editMode && <p className="text-sm text-on-surface-variant">No academic experiences added yet.</p>}
        </div>
      </div>

      {/* 8. Extracurricular Activities */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Extracurricular Activities</h2>
          <div className="flex gap-2">
            {editMode && <button onClick={() => { setShowAddExtracurricular(!showAddExtracurricular); setEditIndexExtra(null); setNewExtra({ name: '', org: '', position: '', duration: '', desc: '' }) }} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">{showAddExtracurricular ? 'close' : 'add'}</span></button>}
            {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
          </div>
        </div>

        {editMode && showAddExtracurricular && (
          <div className="mb-6 bg-surface-container-lowest p-4 rounded-xl border border-primary/50 space-y-4">
            <h3 className="font-bold text-sm mb-2">{editIndexExtra !== null ? 'Edit Activity' : 'Add Activity'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={newExtra.name} onChange={e => setNewExtra({...newExtra, name: e.target.value})} placeholder="Activity Name" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newExtra.org} onChange={e => setNewExtra({...newExtra, org: e.target.value})} placeholder="Organization/Club" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newExtra.position} onChange={e => setNewExtra({...newExtra, position: e.target.value})} placeholder="Position (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newExtra.duration} onChange={e => setNewExtra({...newExtra, duration: e.target.value})} placeholder="Duration" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            </div>
            <textarea value={newExtra.desc} onChange={e => setNewExtra({...newExtra, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddExtracurricular(false)} className="px-4 py-2 border border-outline-variant rounded-md text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Cancel</button>
              <button onClick={() => {
                if(!newExtra.name) return;
                const updated = [...extracurriculars];
                if (editIndexExtra !== null) updated[editIndexExtra] = newExtra;
                else updated.push(newExtra);
                setExtracurriculars(updated);
                setShowAddExtracurricular(false);
              }} className="px-4 py-2 bg-primary text-white rounded-md text-sm font-bold shadow-sm hover:opacity-90">Save</button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {extracurriculars?.map((extra, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">groups</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline-md text-lg font-bold text-on-surface">{extra.name}</h3>
                    <p className="font-body-md text-on-surface">{extra.org}</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">{extra.duration}</p>
                    {extra.position && <p className="font-body-sm text-on-surface font-medium mt-1">Position: {extra.position}</p>}
                    <p className="font-body-sm text-on-surface mt-2 leading-relaxed">{extra.desc}</p>
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <button onClick={() => { setEditIndexExtra(idx); setNewExtra(extra); setShowAddExtracurricular(true); }} className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button onClick={() => setExtracurriculars(extracurriculars.filter((_, i) => i !== idx))} className="p-1 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {extracurriculars.length === 0 && !editMode && <p className="text-sm text-on-surface-variant">No extracurricular activities added yet.</p>}
        </div>
      </div>

      {/* 9. Achievements */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Achievements</h2>
          <div className="flex gap-2">
            {editMode && <button onClick={() => { setShowAddAchieve(!showAddAchieve); setEditIndexAchieve(null); setNewAchieve({ title: '', type: 'Academic', org: '', date: '', desc: '', position: '', award: '', link: '' }) }} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">{showAddAchieve ? 'close' : 'add'}</span></button>}
            {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
          </div>
        </div>

        {editMode && showAddAchieve && (
          <div className="mb-6 bg-surface-container-lowest p-4 rounded-xl border border-primary/50 space-y-4">
            <h3 className="font-bold text-sm mb-2">{editIndexAchieve !== null ? 'Edit Achievement' : 'Add Achievement'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input value={newAchieve.title} onChange={e => setNewAchieve({...newAchieve, title: e.target.value})} placeholder="Achievement Title" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <select value={newAchieve.type} onChange={e => setNewAchieve({...newAchieve, type: e.target.value})} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary">
                {['Academic', 'Technical', 'Research', 'Hackathon', 'Competition', 'Leadership', 'Community Service', 'Sports', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input value={newAchieve.org} onChange={e => setNewAchieve({...newAchieve, org: e.target.value})} placeholder="Issuing Organization" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newAchieve.date} onChange={e => setNewAchieve({...newAchieve, date: e.target.value})} placeholder="Date Achieved (e.g. 2025-01-15 or Fall 2024)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newAchieve.position} onChange={e => setNewAchieve({...newAchieve, position: e.target.value})} placeholder="Position/Rank (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newAchieve.award} onChange={e => setNewAchieve({...newAchieve, award: e.target.value})} placeholder="Award/Prize (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
              <input value={newAchieve.link} onChange={e => setNewAchieve({...newAchieve, link: e.target.value})} placeholder="Verification Link (Optional)" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary sm:col-span-2" />
            </div>
            <textarea value={newAchieve.desc} onChange={e => setNewAchieve({...newAchieve, desc: e.target.value})} placeholder="Description" rows={3} className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddAchieve(false)} className="px-4 py-2 border border-outline-variant rounded-md text-sm font-bold text-on-surface-variant hover:bg-surface-container-low">Cancel</button>
              <button onClick={() => {
                if(!newAchieve.title) return;
                const updated = [...achievements];
                if (editIndexAchieve !== null) updated[editIndexAchieve] = newAchieve;
                else updated.push(newAchieve);
                setAchievements(updated.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0)));
                setShowAddAchieve(false);
              }} className="px-4 py-2 bg-primary text-white rounded-md text-sm font-bold shadow-sm hover:opacity-90">Save</button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {achievements.map((ach, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-primary text-2xl">emoji_events</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-headline-md text-lg font-bold text-on-surface">{ach.title}</h3>
                      <span className="bg-surface-container-low px-2 py-0.5 rounded text-[10px] font-bold text-on-surface-variant uppercase">{ach.type}</span>
                    </div>
                    <p className="font-body-md text-on-surface">{ach.org}</p>
                    <p className="font-body-sm text-on-surface-variant mt-1">{ach.date}</p>
                    
                    {(ach.position || ach.award) && (
                      <div className="flex gap-4 mt-2">
                        {ach.position && <p className="font-body-sm text-on-surface font-medium">Rank: {ach.position}</p>}
                        {ach.award && <p className="font-body-sm text-on-surface font-medium text-secondary">{ach.award}</p>}
                      </div>
                    )}
                    <p className="font-body-sm text-on-surface mt-2 leading-relaxed">{ach.desc}</p>
                    {ach.link && (
                      <a href={ach.link.startsWith('http') ? ach.link : `https://${ach.link}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-primary hover:underline">
                        <span className="material-symbols-outlined text-[14px]">link</span> Verify Achievement
                      </a>
                    )}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <button onClick={() => { setEditIndexAchieve(idx); setNewAchieve(ach); setShowAddAchieve(true); }} className="p-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                      <button onClick={() => setAchievements(achievements.filter((_, i) => i !== idx))} className="p-1 text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {achievements.length === 0 && !editMode && <p className="text-sm text-on-surface-variant">No achievements added yet.</p>}
        </div>
      </div>

    </div>
  );
}

