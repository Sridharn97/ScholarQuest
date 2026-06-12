'use client';
import { useState } from 'react';

const faqs = [
  { q: 'How does the AI matching algorithm work?', a: 'Our AI analyzes over 40 data points from your profile — including GPA, field of study, extracurriculars, nationality, and financial need — to match you with the most relevant scholarships from our database of 50,000+ opportunities.' },
  { q: 'Is my personal information secure?', a: 'Yes. We use bank-grade encryption (AES-256) for all stored data. We never sell your information to third parties. You can request data deletion at any time from your settings.' },
  { q: 'How do I improve my match score?', a: 'Complete your profile to 100%: add your GPA, upload transcripts, specify your field of study, list extracurriculars, and set your financial need level. Each section increases match accuracy.' },
  { q: 'Can I apply to multiple scholarships at once?', a: 'Yes! Use our Tracker to manage multiple applications simultaneously. The dashboard shows you deadlines, statuses, and required documents for each application in one place.' },
  { q: 'What documents do I need to apply?', a: 'Requirements vary by scholarship, but commonly needed documents include: official transcripts, letters of recommendation, a personal statement, and your resume/CV. Each scholarship detail page lists specific requirements.' },
  { q: 'Are there scholarships for international students?', a: 'Absolutely. We have thousands of scholarships specifically open to international students. Make sure your nationality and study destination are correctly set in your profile.' },
  { q: 'How often are new scholarships added?', a: 'Our database is updated daily. Turn on email notifications in your settings to get alerts when new scholarships matching your high-priority tags are added.' },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      
      {/* Sleek Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 text-primary mb-6 shadow-sm border border-primary/20">
          <span className="material-symbols-outlined" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>forum</span>
        </div>
        <h1 className="font-headline-lg text-4xl md:text-5xl font-extrabold text-on-surface mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Questions</span>
        </h1>
        <p className="font-body-lg text-on-surface-variant text-lg">Everything you need to know about how ScholarQuest works.</p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${
                isOpen 
                  ? 'border-primary/50 shadow-md shadow-primary/5 bg-surface-bright scale-[1.01]' 
                  : 'border-outline-variant/30 hover:border-outline-variant/60 bg-surface-container-lowest'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 outline-none focus-visible:bg-surface-container-low"
              >
                <span className={`font-headline-md text-lg font-bold transition-colors ${isOpen ? 'text-primary' : 'text-on-surface'}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${isOpen ? 'bg-primary/10 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  <span 
                    className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  >
                    expand_more
                  </span>
                </div>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100 mb-5' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 font-body-md text-on-surface-variant text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
