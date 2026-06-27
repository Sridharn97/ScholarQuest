'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Data definitions
const helpData = {
  students: {
    title: 'For Students',
    icon: 'school',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    sections: [
      {
        id: 'faqs',
        title: 'Frequently Asked Questions',
        icon: 'help_center',
        items: [
          { q: 'How does the AI matching algorithm work?', a: 'Our AI analyzes over 40 data points from your profile—including GPA, field of study, and extracurriculars—to match you with the most relevant scholarships.' },
          { q: 'Is my personal information secure?', a: 'Yes. We use bank-grade encryption (AES-256) for all stored data. We never sell your information to third parties.' },
          { q: 'How do I improve my match score?', a: 'Complete your profile to 100%: add your GPA, upload transcripts, specify your field of study, list extracurriculars, and set your financial need level.' },
          { q: 'Can I apply to multiple scholarships at once?', a: 'Yes! Use our Tracker to manage multiple applications simultaneously.' },
          { q: 'What documents do I need to apply?', a: 'Requirements vary, but commonly needed documents include: official transcripts, letters of recommendation, a personal statement, and your resume/CV.' },
          { q: 'Are there scholarships for international students?', a: 'Absolutely. We have thousands of scholarships specifically open to international students.' },
        ]
      },
      {
        id: 'tutorials',
        title: 'Tutorials & Walkthroughs',
        icon: 'play_circle',
        items: [
          { q: 'Building a Profile', a: 'Navigate to your Profile tab to fill out your academic details. The AI Matcher uses this data!' },
          { q: 'Tracking Applications', a: 'Use the "Applications" tab to see real-time updates on your submissions.' },
          { q: 'Using AI Matcher', a: 'Check the AI Matcher tab to see a personalized ranked list of scholarships.' },
        ]
      },
      {
        id: 'best_practices',
        title: 'Best Practices',
        icon: 'workspace_premium',
        items: [
          { q: 'Tailor your essays', a: 'Make sure you answer the specific prompt provided by the sponsor.' },
          { q: 'Double-check your eligibility', a: 'Read the requirements carefully before spending time applying.' },
          { q: 'Request recommendations early', a: 'Give your teachers or mentors at least 3 weeks notice.' },
          { q: 'Proofread everything', a: 'Small typos can hurt your chances. Use spelling and grammar checking tools.' },
        ]
      }
    ]
  },
  sponsors: {
    title: 'For Sponsors',
    icon: 'business',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    sections: [
      {
        id: 'faqs',
        title: 'Frequently Asked Questions',
        icon: 'help_center',
        items: [
          { q: 'How are candidates matched?', a: 'Our system uses the criteria you set when creating the grant and scores every applicant against it using our AI algorithm.' },
          { q: 'How do I fund a grant?', a: 'You can manage disbursements directly through your organization\'s finance portal. We do not handle the direct transfer of funds.' },
          { q: 'How do I review applications?', a: 'Navigate to your Applications dashboard. Candidates are automatically sorted by their AI Match score.' },
          { q: 'Can I set multiple deadlines?', a: 'Currently, each scholarship posting supports a single primary deadline.' },
          { q: 'What happens if I don\'t find a candidate?', a: 'You are under no obligation to award funds if no candidate meets your criteria. You can extend your deadline or adjust your requirements.' },
          { q: 'Can I message a candidate?', a: 'Yes, you can use the built-in messaging system to ask for clarification on their application or request an interview.' },
        ]
      },
      {
        id: 'tutorials',
        title: 'Tutorials & Walkthroughs',
        icon: 'play_circle',
        items: [
          { q: 'Posting a Grant', a: 'Go to "Scholarships" in your portal to create a new listing. Be sure to specify matching criteria.' },
          { q: 'Reviewing Candidates', a: 'Your Applications tab automatically sorts candidates by their AI Match score.' },
          { q: 'Generating Reports', a: 'Use the Reports tab to download CSVs of applicant data and track your reach.' },
        ]
      },
      {
        id: 'best_practices',
        title: 'Best Practices',
        icon: 'workspace_premium',
        items: [
          { q: 'Write clear requirements', a: 'The better your description, the better the AI can match.' },
          { q: 'Set realistic deadlines', a: 'Give students at least 4-6 weeks to gather necessary materials.' },
          { q: 'Use AI score as a guide', a: 'While powerful, the score should complement, not replace, human review.' },
        ]
      }
    ]
  },
  general: {
    title: 'General & Policies',
    icon: 'gavel',
    color: 'from-purple-500 to-fuchsia-600',
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    sections: [
      {
        id: 'communication',
        title: 'Communication Guidelines',
        icon: 'forum',
        items: [
          { q: 'Be Professional', a: 'Always maintain a respectful and professional tone.' },
          { q: 'Response Times', a: 'Sponsors generally respond within 3-5 business days.' },
          { q: 'No External Links', a: 'Do not ask users to communicate outside the platform or click unverified links.' },
        ]
      },
      {
        id: 'trust',
        title: 'Trust & Safety',
        icon: 'security',
        items: [
          { q: 'How to Report an Issue', a: 'You can flag any message, scholarship listing, or user profile by clicking the "Report" icon (flag). Provide a brief reason for the report.' },
          { q: 'Automated Actions', a: 'If a listing or user receives multiple independent reports from the community, our automated system will temporarily suspend the account.' },
        ]
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        icon: 'build',
        items: [
          { q: 'Why isn\'t my file uploading?', a: 'Ensure your document is in PDF format and is under the 5MB file size limit. Word documents (.doc, .docx) are not supported.' },
          { q: 'I didn\'t receive my reset email', a: 'Please check your spam or junk folder. If you still don\'t see it, ensure you entered the exact email address used during registration.' },
          { q: 'Browser Compatibility', a: 'For the best experience, we recommend using the latest versions of Google Chrome, Mozilla Firefox, or Safari.' },
          { q: 'How do I change my password?', a: 'Navigate to Settings > Profile. You will find an option to securely change your password there.' },
          { q: 'Can I delete my account?', a: 'Yes. You can request account deletion from your Settings. This will completely remove your data in compliance with GDPR and CCPA.' },
        ]
      },
      {
        id: 'legal',
        title: 'Legal & Privacy Hub',
        icon: 'gavel',
        items: [
          { q: 'Platform as a Venue', a: 'ScholarQuest is merely a technology platform connecting students with providers. We do not guarantee the legitimacy of any scholarship.' },
          { q: 'Dispute Resolution', a: 'ScholarQuest does not mediate disputes. If a dispute arises regarding scholarship selection or fund disbursement, users must resolve the issue directly with the other party.' },
          { q: 'User Liability', a: 'By using this platform, you agree to indemnify and hold harmless ScholarQuest from any claims arising from your use of the service.' },
          { q: 'Data Sharing', a: 'When you apply for a scholarship, your profile data and application materials are shared directly with the Sponsor.' },
        ]
      },
      {
        id: 'platform',
        title: 'Platform Functionalities',
        icon: 'dns',
        items: [
          { q: 'Who manages the platform and scholarship decisions?', a: 'ScholarQuest operates on a direct connection basis where students interact directly with sponsors. There is no super admin or central authority that dictates scholarship awards.' },
          { q: 'How are sponsor accounts verified without a manual admin?', a: 'We use automated verification checks using institutional email domains and public records to maintain platform integrity seamlessly.' },
          { q: 'How is content moderated?', a: 'Content is moderated through a community reporting system. If a listing or user receives multiple reports, it is automatically temporarily suspended pending a system review.' },
          { q: 'Who handles technical support?', a: 'Technical issues are handled by an automated ticketing system and our core development team, but no single admin has manual oversight over your private application data or selections.' },
        ]
      }
    ]
  }
};

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchQuery, setSearchQuery] = useState('');

  const activeData = helpData[activeTab];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-40 pb-48 lg:pt-48 lg:pb-56 bg-gradient-to-b from-primary to-secondary">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-md">
              How can we help?
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium">
              Search our knowledge base or browse categories below to find exactly what you need.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-3xl mx-auto group">
              <div className="absolute -inset-1 bg-white/20 rounded-[2.5rem] blur-lg group-hover:bg-white/30 transition-colors duration-500" />
              <div className="relative bg-white/95 backdrop-blur-xl border-2 border-white/50 rounded-[2rem] shadow-2xl flex items-center p-2 pl-6 transition-transform focus-within:scale-[1.02] duration-300">
                <span className="material-symbols-outlined text-primary/70 text-3xl">search</span>
                <input 
                  type="text"
                  placeholder="Search for answers, guides, or policies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-lg text-slate-800 placeholder:text-slate-400 py-4 px-4 font-medium"
                />
                <button className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95">
                  Search
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories / Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20 pb-32">
          
          {/* Bento-style Category Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {Object.entries(helpData).map(([key, data]) => {
              const isActive = activeTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative overflow-hidden p-8 rounded-[2rem] text-left transition-all duration-300 group ${isActive ? 'bg-white shadow-2xl shadow-primary/10 ring-2 ring-primary/20 scale-105 z-10' : 'bg-white/70 backdrop-blur-md shadow-sm border border-outline-variant/30 hover:bg-white hover:shadow-lg hover:-translate-y-1'}`}
                >
                  <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${data.color} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-transform duration-500 group-hover:scale-110 ${isActive ? `bg-gradient-to-br ${data.color} text-white` : `${data.bg} ${data.text}`}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>{data.icon}</span>
                  </div>
                  <h3 className={`text-2xl font-black tracking-tight mb-2 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{data.title}</h3>
                  <p className="text-slate-500 text-sm font-medium">Browse resources and guides designed specifically for {data.title.toLowerCase().replace('for ', '')}.</p>
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Grids */}
          <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {activeData.sections.map((section) => (
              <div key={section.id} className="scroll-mt-32" id={section.id}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeData.color} flex items-center justify-center text-white shadow-sm`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '24px' }}>{section.icon}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {section.items.filter(item => 
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((item, idx) => (
                    <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 group">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{item.q}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                  {section.items.filter(item => 
                    item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.a.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="col-span-1 md:col-span-2 py-12 text-center text-slate-500">
                      No results found in this section.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
