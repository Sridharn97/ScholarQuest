'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUser, saveUser, calcProfileCompletion, addActivity } from '@/lib/store';

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
        setForm({
          firstName: u.firstName || '',
          lastName: u.lastName || '',
          bio: u.bio || 'Tell us about yourself...',
          gpa: u.gpa || '',
          institution: u.institution || '',
          phone: u.phone || '',
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
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Success toast */}
      {saved && (
        <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-subtle-float">
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>check_circle</span>
          Profile saved successfully!
        </div>
      )}

      {/* Profile Hero */}
      <div className="glass-card rounded-[2rem] p-10 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-4xl shadow-xl">
              {user?.initials || 'AJ'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-background" style={{ fontFamily: 'Manrope, sans-serif' }}>{user?.name || 'Alex Johnson'}</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">{user?.studyField || 'Computer Science'} · {user?.institution || 'Stanford University'}</p>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                {editMode ? (
                  <>
                    <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 rounded-10 font-label-md bg-primary text-on-primary transition-all shadow-md">
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>save</span>
                      Save Profile
                    </button>
                    <button onClick={() => setEditMode(false)} className="flex items-center gap-2 px-5 py-2 rounded-10 font-label-md border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-5 py-2 rounded-10 font-label-md border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Scholarships Applied', value: '18', color: 'text-primary' },
                { label: 'GPA', value: user?.gpa || '—', color: 'text-green-600' },
                { label: 'Profile Strength', value: `${completion}%`, color: 'text-on-surface' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{stat.label}</p>
                  <p className={`font-headline-md text-headline-md font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Completion Ring */}
          <div className="shrink-0 text-center">
            <div className="relative w-24 h-24 mx-auto">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                <circle className="text-surface-container-highest" cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" />
                <circle className="text-secondary" cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-md text-headline-md text-on-surface">{completion}%</span>
              </div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Complete</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex gap-1 mt-8 border-t border-outline-variant/20 pt-6 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-10 font-label-md text-label-md transition-all ${activeTab === tab.id ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Bio */}
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-4">About Me</h2>
              {editMode ? (
                <textarea rows={4} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{form.bio || 'Add a bio to tell scholarship providers about yourself.'}</p>
              )}
            </div>

            {/* Skills */}
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-4">Skills &amp; Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-sm text-label-sm flex items-center gap-2">
                    {skill}
                    {editMode && <button onClick={() => removeSkill(skill)} className="hover:text-error transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span></button>}
                  </span>
                ))}
                {editMode && (
                  showSkillInput ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                        placeholder="Skill name"
                        className="px-3 py-1.5 border border-primary rounded-full text-sm outline-none w-32"
                      />
                      <button onClick={addSkill} className="px-3 py-1.5 bg-primary text-white rounded-full text-sm">Add</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowSkillInput(true)} className="px-4 py-2 border-2 border-dashed border-outline-variant rounded-full font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Add Skill
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-4">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-label-sm text-label-sm flex items-center gap-2">
                    {interest}
                    {editMode && <button onClick={() => removeInterest(interest)} className="hover:text-error transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span></button>}
                  </span>
                ))}
                {editMode && (
                  showInterestInput ? (
                    <div className="flex items-center gap-2">
                      <input
                        autoFocus
                        value={newInterest}
                        onChange={e => setNewInterest(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addInterest()}
                        placeholder="Interest"
                        className="px-3 py-1.5 border border-secondary rounded-full text-sm outline-none w-32"
                      />
                      <button onClick={addInterest} className="px-3 py-1.5 bg-secondary text-white rounded-full text-sm">Add</button>
                    </div>
                  ) : (
                    <button onClick={() => setShowInterestInput(true)} className="px-4 py-2 border-2 border-dashed border-outline-variant rounded-full font-label-sm text-on-surface-variant hover:border-secondary hover:text-secondary transition-all flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Add Interest
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Contact Info */}
            <div className="glass-card rounded-2xl p-10">
              <h3 className="font-headline-md text-headline-md mb-4">Contact Info</h3>
              {editMode ? (
                <div className="space-y-3">
                  {[
                    { key: 'phone', icon: 'phone', placeholder: '+1 (555) 123-4567', label: 'Phone' },
                    { key: 'linkedin', icon: 'link', placeholder: 'linkedin.com/in/yourname', label: 'LinkedIn' },
                  ].map(field => (
                    <div key={field.key} className="space-y-1">
                      <label className="font-label-sm text-on-surface-variant">{field.label}</label>
                      <input
                        value={form[field.key] || ''}
                        onChange={e => setForm({...form, [field.key]: e.target.value})}
                        placeholder={field.placeholder}
                        className="w-full px-3 py-2 border border-outline-variant rounded-6 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {[
                    { icon: 'mail', label: user?.email || 'No email set' },
                    { icon: 'location_on', label: user?.nationality || 'Location not set' },
                    { icon: 'link', label: user?.linkedin || 'LinkedIn not set' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>{item.icon}</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile completion tasks */}
            <div className="glass-card rounded-2xl p-10">
              <h3 className="font-headline-md text-headline-md mb-4">Complete Your Profile</h3>
              <div className="space-y-3">
                {[
                  { task: 'Add GPA', done: !!(user?.gpa) },
                  { task: 'Add Bio', done: !!(user?.bio) },
                  { task: 'Add Institution', done: !!(user?.institution) },
                  { task: 'Add Phone', done: !!(user?.phone) },
                  { task: 'Add LinkedIn', done: !!(user?.linkedin) },
                  { task: 'Add Skills', done: skills.length > 0 },
                ].map((item) => (
                  <div key={item.task} className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${item.done ? 'text-green-600' : 'text-outline-variant'}`} style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                      {item.done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`font-body-sm text-body-sm ${item.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{item.task}</span>
                  </div>
                ))}
              </div>
              {!editMode && (
                <button onClick={() => setEditMode(true)} className="mt-4 w-full py-2 bg-primary/10 text-primary rounded-6 font-label-sm hover:bg-primary/20 transition-colors">
                  Edit Profile to Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="glass-card rounded-2xl p-10">
          <h2 className="font-headline-md text-headline-md mb-6">Academic History</h2>
          <div className="space-y-6">
            {[
              { school: user?.institution || 'Your Institution', degree: user?.studyField || 'Your Field of Study', period: '2022 – Present', gpa: user?.gpa || '—', status: 'Current' },
            ].map((edu) => (
              <div key={edu.school} className="p-10 bg-surface-container-low rounded-2xl flex flex-col md:flex-row gap-6 justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary">school</span>
                    <h3 className="font-headline-md text-headline-md">{edu.school}</h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{edu.degree}</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">{edu.period}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-label-sm text-label-sm text-on-surface-variant">GPA</p>
                  <p className="font-headline-md text-headline-md text-primary">{edu.gpa}</p>
                  <span className="font-label-sm px-2 py-0.5 rounded-full bg-green-100 text-green-700">{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
          {editMode && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-label-md text-on-surface">GPA</label>
                <input type="number" step="0.01" value={form.gpa || ''} onChange={e => setForm({...form, gpa: e.target.value})} placeholder="3.92" className="w-full px-4 py-2 border border-outline-variant rounded-10 outline-none focus:border-primary" />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-on-surface">Institution</label>
                <input value={form.institution || ''} onChange={e => setForm({...form, institution: e.target.value})} placeholder="Stanford University" className="w-full px-4 py-2 border border-outline-variant rounded-10 outline-none focus:border-primary" />
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="glass-card rounded-2xl p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md">My Documents</h2>
            <label className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all cursor-pointer">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload</span>
              Upload New
              <input type="file" className="hidden" onChange={() => alert('File upload (would connect to backend in production)')} />
            </label>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Official_Transcript_2024.pdf', size: '1.2 MB', date: 'Oct 10, 2024', status: 'Verified' },
              { name: 'Resume_AlexJohnson.pdf', size: '0.8 MB', date: 'Sep 15, 2024', status: 'Verified' },
              { name: 'RecommendationLetter_Prof_Kumar.pdf', size: '0.5 MB', date: 'Sep 20, 2024', status: 'Pending' },
            ].map((doc) => (
              <div key={doc.name} className="flex items-center gap-4 p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                <div className="w-12 h-12 rounded-10 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-label-md text-on-surface truncate">{doc.name}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{doc.size} · Uploaded {doc.date}</p>
                </div>
                <span className={`font-label-sm px-3 py-1 rounded-full shrink-0 ${doc.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{doc.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="glass-card rounded-2xl p-10">
          <h2 className="font-headline-md text-headline-md mb-6">Recent Activity</h2>
          <ActivityFeed />
        </div>
      )}
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
