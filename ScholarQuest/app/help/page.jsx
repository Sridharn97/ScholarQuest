'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const studentSections = [
  {
    id: 'faqs_student',
    title: 'Frequently Asked Questions',
    icon: 'help_center',
    color: 'from-indigo-500 to-indigo-600',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-on-surface-variant">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How does the AI matching algorithm work?</h5>
          <p>Our AI analyzes over 40 data points from your profile—including GPA, field of study, and extracurriculars—to match you with the most relevant scholarships from our database.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Is my personal information secure?</h5>
          <p>Yes. We use bank-grade encryption (AES-256) for all stored data. We never sell your information to third parties.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How do I improve my match score?</h5>
          <p>Complete your profile to 100%: add your GPA, upload transcripts, specify your field of study, list extracurriculars, and set your financial need level. Each section increases match accuracy.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Can I apply to multiple scholarships at once?</h5>
          <p>Yes! Use our Tracker to manage multiple applications simultaneously. The dashboard shows you deadlines and required documents for each application.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">What documents do I need to apply?</h5>
          <p>Requirements vary, but commonly needed documents include: official transcripts, letters of recommendation, a personal statement, and your resume/CV.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Are there scholarships for international students?</h5>
          <p>Absolutely. We have thousands of scholarships specifically open to international students. Make sure your nationality and study destination are correctly set.</p>
        </div>
      </div>
    )
  },
  {
    id: 'walkthroughs_student',
    title: 'Platform Walkthroughs & Tutorials',
    icon: 'play_circle',
    color: 'from-blue-500 to-blue-600',
    content: (
      <div className="space-y-4 text-sm text-on-surface-variant">
        <p className="text-base">Welcome to ScholarQuest! Here is how to get started:</p>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl shadow-sm">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong className="text-on-surface">Building a Profile:</strong> Navigate to your Profile tab to fill out your academic details. The AI Matcher uses this data!</li>
            <li><strong className="text-on-surface">Tracking Applications:</strong> Use the "Applications" tab to see real-time updates on your submissions.</li>
            <li><strong className="text-on-surface">AI Matcher:</strong> Check the AI Matcher tab to see a personalized ranked list of scholarships.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'best_practices_student',
    title: 'Best Practices Resource Hub',
    icon: 'workspace_premium',
    color: 'from-yellow-500 to-yellow-600',
    content: (
      <div className="p-6 border border-outline-variant/30 rounded-xl bg-surface-container-lowest shadow-sm text-sm text-on-surface-variant">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-on-surface">Tailor your essays:</strong> Make sure you answer the specific prompt provided by the sponsor.</li>
          <li><strong className="text-on-surface">Double-check your eligibility:</strong> Read the requirements carefully before spending time applying.</li>
          <li><strong className="text-on-surface">Request recommendations early:</strong> Give your teachers or mentors at least 3 weeks notice.</li>
          <li><strong className="text-on-surface">Proofread everything:</strong> Small typos can hurt your chances. Use spelling and grammar checking tools.</li>
        </ul>
      </div>
    )
  }
];

const sponsorSections = [
  {
    id: 'faqs_sponsor',
    title: 'Frequently Asked Questions',
    icon: 'help_center',
    color: 'from-indigo-500 to-indigo-600',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-on-surface-variant">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How are candidates matched?</h5>
          <p>Our system uses the criteria you set when creating the grant and scores every applicant against it using our AI algorithm.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How do I fund a grant?</h5>
          <p>You can manage disbursements directly through your organization's finance portal. We do not handle the direct transfer of funds.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How do I review applications?</h5>
          <p>Navigate to your Applications dashboard. Candidates are automatically sorted by their AI Match score to save you time.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Can I set multiple deadlines?</h5>
          <p>Currently, each scholarship posting supports a single primary deadline. For rolling admissions, we recommend updating the deadline monthly.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">What happens if I don't find a suitable candidate?</h5>
          <p>You are under no obligation to award funds if no candidate meets your criteria. You can extend your deadline or adjust your requirements.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Can I message a candidate before selecting them?</h5>
          <p>Yes, you can use the built-in messaging system to ask for clarification on their application or request an interview.</p>
        </div>
      </div>
    )
  },
  {
    id: 'walkthroughs_sponsor',
    title: 'Platform Walkthroughs & Tutorials',
    icon: 'play_circle',
    color: 'from-blue-500 to-blue-600',
    content: (
      <div className="space-y-4 text-sm text-on-surface-variant">
        <p className="text-base">Welcome to ScholarQuest Sponsor Portal! Here is how to get started:</p>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-6 rounded-xl shadow-sm">
          <ul className="list-disc pl-5 space-y-3">
            <li><strong className="text-on-surface">Posting a Grant:</strong> Go to "Scholarships" in your portal to create a new listing. Be sure to specify matching criteria.</li>
            <li><strong className="text-on-surface">Reviewing Candidates:</strong> Your Applications tab automatically sorts candidates by their AI Match score.</li>
            <li><strong className="text-on-surface">Generating Reports:</strong> Use the Reports tab to download CSVs of applicant data and track your reach.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 'best_practices_sponsor',
    title: 'Best Practices Resource Hub',
    icon: 'workspace_premium',
    color: 'from-yellow-500 to-yellow-600',
    content: (
      <div className="p-6 border border-outline-variant/30 rounded-xl bg-surface-container-lowest shadow-sm text-sm text-on-surface-variant">
        <ul className="list-disc pl-5 space-y-3">
          <li><strong className="text-on-surface">Write clear, unambiguous requirements:</strong> The better your description, the better the AI can match.</li>
          <li><strong className="text-on-surface">Set realistic deadlines:</strong> Give students at least 4-6 weeks to gather necessary materials.</li>
          <li><strong className="text-on-surface">Use the AI Match score as a guide:</strong> While powerful, the score should complement, not replace, human review.</li>
        </ul>
      </div>
    )
  }
];

const generalSections = [
  {
    id: 'communication',
    title: 'Direct Communication Guidelines',
    icon: 'forum',
    color: 'from-green-500 to-green-600',
    content: (
      <div className="space-y-4 text-sm text-on-surface-variant">
        <p className="text-base">Communication between students and sponsors happens directly through our Messages portal.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">Be Professional</h5>
            <p>Always maintain a respectful and professional tone.</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-blue-600">schedule</span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">Response Times</h5>
            <p>Sponsors generally respond within 3-5 business days.</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-red-600">cancel</span>
            </div>
            <h5 className="font-bold text-on-surface mb-1">No External Links</h5>
            <p>Do not ask users to communicate outside the platform or click unverified links.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'trust',
    title: 'Trust, Safety & Reporting Policies',
    icon: 'security',
    color: 'from-red-500 to-red-600',
    content: (
      <div className="space-y-4 text-sm text-on-surface-variant">
        <p className="text-base">ScholarQuest relies on automated community moderation to keep our platform safe.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
            <h5 className="font-bold text-on-surface text-base mb-2">How to Report an Issue</h5>
            <p>You can flag any message, scholarship listing, or user profile by clicking the "Report" icon (flag). Provide a brief reason for the report.</p>
          </div>
          <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
            <h5 className="font-bold text-on-surface text-base mb-2">Automated Actions</h5>
            <p>If a listing or user receives multiple independent reports from the community, our automated system will temporarily suspend the account and hide their listings pending an automated trust review.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'troubleshooting',
    title: 'Technical Troubleshooting',
    icon: 'build',
    color: 'from-orange-500 to-orange-600',
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-on-surface-variant">
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Why isn't my file uploading?</h5>
          <p>Ensure your document is in PDF format and is under the 5MB file size limit. Word documents (.doc, .docx) are not supported.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">I didn't receive my reset email</h5>
          <p>Please check your spam or junk folder. If you still don't see it, ensure you entered the exact email address used during registration.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Browser Compatibility</h5>
          <p>For the best experience, we recommend using the latest versions of Google Chrome, Mozilla Firefox, or Safari.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">How do I change my password?</h5>
          <p>Navigate to Settings &gt; Profile. You will find an option to securely change your password there.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <h5 className="font-bold text-on-surface mb-2 text-base">Can I delete my account?</h5>
          <p>Yes. You can request account deletion from your Settings. This will completely remove your data in compliance with GDPR and CCPA.</p>
        </div>
      </div>
    )
  },
  {
    id: 'legal',
    title: 'Legal & Privacy Hub',
    icon: 'gavel',
    color: 'from-slate-500 to-slate-600',
    content: (
      <div className="space-y-4 text-sm text-on-surface-variant">
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
          <h5 className="font-bold text-on-surface text-base mb-1">Platform as a Venue Disclaimer</h5>
          <p>ScholarQuest is merely a technology platform connecting students with providers. We do not guarantee the legitimacy of any scholarship, nor do we guarantee that a provider will disburse funds. All agreements, communications, and financial transactions are strictly between the Student and the Provider.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
          <h5 className="font-bold text-on-surface text-base mb-1">Dispute Resolution Policy</h5>
          <p>ScholarQuest does not mediate disputes. If a dispute arises regarding scholarship selection or fund disbursement, users must resolve the issue directly with the other party or through appropriate legal channels outside of the platform.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
          <h5 className="font-bold text-on-surface text-base mb-1">User Liability & Indemnification</h5>
          <p>Providers are solely responsible for ensuring their scholarships comply with local tax and anti-discrimination laws. Students are solely responsible for the accuracy of their submitted information. By using this platform, you agree to indemnify and hold harmless ScholarQuest from any claims arising from your use of the service.</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-5 rounded-xl shadow-sm">
          <h5 className="font-bold text-on-surface text-base mb-1">Data Sharing & Privacy Notice</h5>
          <p>When you apply for a scholarship, your profile data and application materials are shared directly with the Sponsor. ScholarQuest cannot control how the Sponsor stores or uses this data outside of our platform. Do not share sensitive financial documents (like SSNs or bank details) through our platform messaging.</p>
        </div>
      </div>
    )
  }
];

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState('students');
  const [openSection, setOpenSection] = useState(null);

  const getActiveSections = () => {
    if (activeTab === 'students') return studentSections;
    if (activeTab === 'sponsors') return sponsorSections;
    return generalSections;
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-24 px-6" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(168,85,247,0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(236,72,153,0.07), transparent)' }}>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-on-background tracking-tight mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How can we <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">help you?</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
              Everything you need to know about using ScholarQuest. Browse our self-serve guides, policies, and community resources.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 -mt-8 relative z-10">
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 p-2 bg-surface-container-low border border-outline-variant/30 rounded-2xl w-fit mx-auto backdrop-blur-sm shadow-sm">
            {[
              { id: 'students', label: 'For Students', icon: 'school' },
              { id: 'sponsors', label: 'For Sponsors', icon: 'business' },
              { id: 'general', label: 'General & Policies', icon: 'gavel' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setOpenSection(null); }}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 ${activeTab === tab.id ? 'bg-white text-primary shadow-sm border border-outline-variant/20' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'}`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
            {getActiveSections().map((section) => {
              const isOpen = openSection === section.id;
              return (
                <div key={section.id} className={`border-b border-outline-variant/20 last:border-b-0 transition-colors ${isOpen ? 'bg-surface-container-lowest/50' : 'bg-white hover:bg-surface-container-lowest/50'}`}>
                  <button
                    onClick={() => setOpenSection(isOpen ? null : section.id)}
                    className="w-full px-6 py-6 md:px-8 md:py-8 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br ${section.color} text-white shadow-sm group-hover:scale-105 transition-transform`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '28px' }}>{section.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-on-background" style={{ fontFamily: 'Manrope, sans-serif' }}>{section.title}</h3>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                      <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </div>
                  </button>
                  <div 
                    className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[2000px] pb-8 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pl-[76px] pr-4">
                      {section.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Support CTA */}
          <div className="mt-16 text-center bg-white rounded-3xl border border-outline-variant/20 p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-gradient-to-br from-white to-purple-50/50 max-w-4xl mx-auto">
            <div className="w-14 h-14 bg-surface-container-high text-on-surface rounded-full flex items-center justify-center mx-auto mb-5">
               <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>support_agent</span>
            </div>
            <h4 className="text-3xl font-extrabold text-on-background mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Still need help?</h4>
            <p className="text-lg text-on-surface-variant mb-8 max-w-xl mx-auto leading-relaxed">If you need to report a critical issue or can't find the answer you're looking for, our support team is available.</p>
            <a href="mailto:support@scholarquest.com" className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-md shadow-primary/25 active:scale-[0.98]">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>mail</span>
              Contact Support
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
