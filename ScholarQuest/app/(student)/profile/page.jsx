'use client';
import { useState } from 'react';
import Link from 'next/link';

const skills = ['Machine Learning', 'Python', 'Data Analysis', 'Public Speaking', 'Research', 'Leadership'];
const interests = ['Artificial Intelligence', 'Climate Tech', 'Biotech', 'Social Impact', 'Space Tech'];

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'person' },
    { id: 'academic', label: 'Academic', icon: 'school' },
    { id: 'documents', label: 'Documents', icon: 'description' },
    { id: 'activity', label: 'Activity', icon: 'history' },
  ];

  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Profile Hero */}
      <div className="glass-card rounded-[2rem] p-10 mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-extrabold text-4xl shadow-xl">
              AJ
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div>
                <h1 className="font-headline-lg text-headline-lg text-on-background" style={{ fontFamily: 'Manrope, sans-serif' }}>Alex Johnson</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Computer Science Senior · Stanford University</p>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-10 font-label-md text-label-md transition-all ${editMode ? 'bg-primary text-on-primary' : 'border border-outline-variant text-on-surface hover:bg-surface-container-low'}`}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>{editMode ? 'save' : 'edit'}</span>
                  {editMode ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Match Score', value: '98%', color: 'text-secondary' },
                { label: 'Scholarships Applied', value: '18', color: 'text-primary' },
                { label: 'GPA', value: '3.92', color: 'text-green-600' },
                { label: 'Profile Strength', value: '85%', color: 'text-on-surface' },
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
                <circle className="text-secondary" cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="263.9" strokeDashoffset="39.6" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-md text-headline-md text-on-surface">85%</span>
              </div>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Complete</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 flex gap-1 mt-8 border-t border-outline-variant/20 pt-6">
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
                <textarea rows={4} defaultValue="Computer Science senior at Stanford passionate about AI ethics and sustainable technology. Published researcher and Google Summer of Code alumnus." className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 transition-all resize-none" />
              ) : (
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Computer Science senior at Stanford passionate about AI ethics and sustainable technology. Published researcher and Google Summer of Code alumnus.
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-4">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full font-label-sm text-label-sm flex items-center gap-2">
                    {skill}
                    {editMode && <button className="hover:text-error transition-colors"><span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span></button>}
                  </span>
                ))}
                {editMode && (
                  <button className="px-4 py-2 border-2 border-dashed border-outline-variant rounded-full font-label-sm text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span> Add Skill
                  </button>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="glass-card rounded-2xl p-10">
              <h2 className="font-headline-md text-headline-md mb-4">Research Interests</h2>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span key={interest} className="px-4 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full font-label-sm text-label-sm">{interest}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {/* Contact Info */}
            <div className="glass-card rounded-2xl p-10">
              <h3 className="font-headline-md text-headline-md mb-4">Contact Info</h3>
              <div className="space-y-3">
                {[
                  { icon: 'mail', label: 'alex.j@stanford.edu' },
                  { icon: 'location_on', label: 'Palo Alto, California' },
                  { icon: 'link', label: 'linkedin.com/in/alexjohnson' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>{item.icon}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile completion tasks */}
            <div className="glass-card rounded-2xl p-10">
              <h3 className="font-headline-md text-headline-md mb-4">Complete Your Profile</h3>
              <div className="space-y-3">
                {[
                  { task: 'Add GPA', done: true },
                  { task: 'Upload Transcript', done: true },
                  { task: 'Add Extracurriculars', done: true },
                  { task: 'Set Financial Need', done: false },
                  { task: 'Add References', done: false },
                ].map((item) => (
                  <div key={item.task} className="flex items-center gap-3">
                    <span className={`material-symbols-outlined ${item.done ? 'text-green-600' : 'text-outline-variant'}`} style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                      {item.done ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    <span className={`font-body-sm text-body-sm ${item.done ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>{item.task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academic' && (
        <div className="glass-card rounded-2xl p-10">
          <h2 className="font-headline-md text-headline-md mb-6">Academic History</h2>
          <div className="space-y-6">
            {[
              { school: 'Stanford University', degree: 'B.S. Computer Science', period: '2021 – Present', gpa: '3.92', status: 'Current' },
              { school: 'Lincoln High School', degree: 'High School Diploma', period: '2017 – 2021', gpa: '4.0', status: 'Completed' },
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
                  <span className={`font-label-sm px-2 py-0.5 rounded-full ${edu.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-surface-container-high text-on-surface-variant'}`}>{edu.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="glass-card rounded-2xl p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline-md text-headline-md">My Documents</h2>
            <button className="flex items-center gap-2 px-5 py-2 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload</span>
              Upload New
            </button>
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
          <div className="relative space-y-6 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/20">
            {[
              { icon: 'send', color: 'text-primary', bg: 'bg-primary/10', title: 'Application Submitted', desc: 'Global Tech Innovators Fund', time: '2 hours ago' },
              { icon: 'bookmark_added', color: 'text-secondary', bg: 'bg-secondary/10', title: 'Scholarship Saved', desc: 'Women in STEM Excellence Award', time: 'Yesterday' },
              { icon: 'auto_awesome', color: 'text-green-600', bg: 'bg-green-100', title: 'New Match Found', desc: 'AI Research Grant (95% match)', time: '2 days ago' },
              { icon: 'task_alt', color: 'text-primary', bg: 'bg-primary/10', title: 'Profile Updated', desc: 'Added new research publication', time: '5 days ago' },
            ].map((act) => (
              <div key={act.title} className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-2 border-surface-container-high flex items-center justify-center">
                  <span className={`material-symbols-outlined ${act.color}`} style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-10">
                  <p className="font-label-md text-on-surface">{act.title}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{act.desc}</p>
                  <p className="font-label-sm text-label-sm text-outline mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
