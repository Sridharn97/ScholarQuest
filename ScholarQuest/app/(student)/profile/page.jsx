'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser, saveUser, calcProfileCompletion, addActivity } from '@/lib/store';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function ProfilePage() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [saved, setSaved] = useState(false);
  const [showSkillInput, setShowSkillInput] = useState(false);
  const [showInterestInput, setShowInterestInput] = useState(false);

  useEffect(() => {
    const load = () => {
      const u = getUser();
      if (u) {
        setUser(u);
          let initialPhone = u.phone || '';
          if (initialPhone && !initialPhone.startsWith('+')) {
            initialPhone = (u.countryCode || '+1') + initialPhone;
          }
          // Strip absolutely everything except + and digits
          initialPhone = initialPhone.replace(/[^\d+]/g, '');

          setForm({
            firstName: u.firstName || '',
            lastName: u.lastName || '',
            bio: u.bio || 'Tell us about yourself...',
            gpa: u.gpa || '',
            institution: u.institution || '',
            phone: initialPhone,
            linkedin: u.linkedin || '',
            nationality: u.nationality || '',
        });
        setSkills(u.skills || ['Machine Learning', 'Python', 'Data Analysis']);
        setInterests(u.interests || ['Artificial Intelligence', 'Climate Tech', 'Biotech']);
      }
    };
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const handleSave = () => {
    const updated = {
      ...form,
      name: `${form.firstName} ${form.lastName}`,
      initials: `${(form.firstName || 'A')[0]}${(form.lastName || 'J')[0]}`.toUpperCase(),
      skills,
      interests,
    };
    saveUser(updated);
    addActivity({ icon: 'task_alt', iconColor: 'text-primary', title: 'Profile Updated', sub: 'Your profile information was saved', time: 'Just now' });
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const removeSkill = (s) => setSkills(skills.filter(x => x !== s));
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
      setShowSkillInput(false);
    }
  };
  const removeInterest = (i) => setInterests(interests.filter(x => x !== i));
  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
      setShowInterestInput(false);
    }
  };

  const completion = user ? calcProfileCompletion({ ...user, skills, interests }) : 40;
  const circumference = 263.9;
  const offset = circumference * (1 - completion / 100);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'person' },
    { id: 'academic', label: 'Academic', icon: 'school' },
    { id: 'documents', label: 'Documents', icon: 'description' },
    { id: 'activity', label: 'Activity', icon: 'history' },
  ];

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
              <span className="material-symbols-outlined" style={{fontSize: '20px'}}>photo_camera</span>
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
                <input value={form.firstName || ''} onChange={e => setForm({...form, firstName: e.target.value})} placeholder="First Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
                <input value={form.lastName || ''} onChange={e => setForm({...form, lastName: e.target.value})} placeholder="Last Name" className="w-full px-4 py-2 bg-surface-container-lowest border border-outline-variant/50 rounded-lg text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" />
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
                       onChange={val => setForm({...form, phone: val})}
                       className="w-full text-sm outline-none bg-transparent sq-phone-input"
                     />
                   </div>
                </div>
                <div className="space-y-1">
                   <label className="font-label-sm text-on-surface-variant">Location</label>
                   <input value={form.nationality || ''} onChange={e => setForm({...form, nationality: e.target.value})} placeholder="City, Country" className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm h-[38px]" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                   <label className="font-label-sm text-on-surface-variant">LinkedIn URL</label>
                   <input value={form.linkedin || ''} onChange={e => setForm({...form, linkedin: e.target.value})} placeholder="linkedin.com/in/..." className="w-full px-3 py-1.5 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary bg-white shadow-sm h-[38px]" />
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
          <textarea rows={5} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Write a compelling summary about your academic journey, goals, and what makes you a great scholarship candidate..." className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl font-body-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all resize-none shadow-inner" />
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
                      <input value={form.institution || ''} onChange={e => setForm({...form, institution: e.target.value})} placeholder="Institution" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant">GPA</label>
                      <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({...form, gpa: e.target.value})} placeholder="GPA" className="w-full px-3 py-2 border border-outline-variant/50 rounded-md text-sm outline-none focus:border-primary" />
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

      {/* 6. Documents / Licenses & Certifications Equivalent */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Verified Documents</h2>
          <label className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary cursor-pointer">
            <span className="material-symbols-outlined">add</span>
            <input type="file" className="hidden" onChange={() => alert('File upload (would connect to backend in production)')} />
          </label>
        </div>

        <div className="space-y-6">
          {[
            { name: 'Official_Transcript_2026.pdf', type: 'Transcript', size: '1.2 MB', date: 'Oct 2026' },
            { name: 'Resume_AlexJohnson.pdf', type: 'Resume', size: '0.8 MB', date: 'Sep 2026' },
          ].map((doc, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-on-surface text-2xl">description</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">{doc.type}</h3>
                <p className="font-body-md text-on-surface">{doc.name}</p>
                <p className="font-body-sm text-on-surface-variant mt-1">Issued {doc.date}</p>
                <button className="mt-3 px-4 py-1.5 border border-outline-variant rounded-full font-label-md text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all flex items-center gap-2">
                   Show document <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Honors & Awards */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 bg-surface-bright">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-xl font-bold">Honors & Awards</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">add</span></button>
            {!editMode && <button onClick={() => setEditMode(true)} className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">edit</span></button>}
          </div>
        </div>
        
        <div className="space-y-6">
          {[
            { title: 'Dean\'s List', issuer: 'Stanford University', date: 'May 2023', description: 'Awarded for maintaining a GPA above 3.8 during the academic year.' },
            { title: 'National Merit Scholar', issuer: 'National Merit Scholarship Corporation', date: 'Sep 2022', description: 'Recognized for outstanding academic achievement in high school.' },
          ].map((award, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="shrink-0 mt-1">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-sm">
                  <span className="material-symbols-outlined text-tertiary text-2xl">emoji_events</span>
                </div>
              </div>
              <div className="flex-1 pb-6 border-b border-outline-variant/20 last:border-0 last:pb-0">
                <h3 className="font-headline-md text-lg font-bold text-on-surface">{award.title}</h3>
                <p className="font-body-md text-on-surface">{award.issuer}</p>
                <p className="font-body-sm text-on-surface-variant mt-1">Issued {award.date}</p>
                <p className="font-body-sm text-on-surface mt-2 leading-relaxed">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const { getActivity } = require('@/lib/store');
    const load = () => setActivities(getActivity());
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  const colorMap = { 'text-primary': 'bg-primary/10', 'text-secondary': 'bg-secondary/10', 'text-green-600': 'bg-green-100', 'text-error': 'bg-error/10' };

  return (
    <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
      {activities.map((act) => (
        <div key={act.id} className="relative pl-12">
          <div className={`absolute left-0 top-0 w-8 h-8 rounded-full border-2 border-surface-container-high flex items-center justify-center ${colorMap[act.iconColor] || 'bg-surface-container-low'}`}>
            <span className={`material-symbols-outlined ${act.iconColor}`} style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
          </div>
          <div className="p-4 bg-surface-container-low rounded-10">
            <p className="font-label-md text-on-surface">{act.title}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{act.sub}</p>
            <p className="font-label-sm text-label-sm text-outline mt-1">{act.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
