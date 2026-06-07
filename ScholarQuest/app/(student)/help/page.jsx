import Link from 'next/link';

export const metadata = { title: 'Help Center | ScholarQuest' };

const faqs = [
  { q: 'How does the AI matching algorithm work?', a: 'Our AI analyzes over 40 data points from your profile — including GPA, field of study, extracurriculars, nationality, and financial need — to match you with the most relevant scholarships from our database of 50,000+ opportunities.' },
  { q: 'Is my personal information secure?', a: 'Yes. We use bank-grade encryption (AES-256) for all stored data. We never sell your information to third parties. You can request data deletion at any time from your settings.' },
  { q: 'How do I improve my match score?', a: 'Complete your profile to 100%: add your GPA, upload transcripts, specify your field of study, list extracurriculars, and set your financial need level. Each section increases match accuracy.' },
  { q: 'Can I apply to multiple scholarships at once?', a: 'Yes! Use our Tracker to manage multiple applications simultaneously. The dashboard shows you deadlines, statuses, and required documents for each application in one place.' },
  { q: 'What documents do I need to apply?', a: 'Requirements vary by scholarship, but commonly needed documents include: official transcripts, letters of recommendation, a personal statement, and your resume/CV. Each scholarship detail page lists specific requirements.' },
];

const categories = [
  { icon: 'search', label: 'Finding Scholarships', count: 12 },
  { icon: 'send', label: 'Application Process', count: 8 },
  { icon: 'payments', label: 'Payments & Awards', count: 6 },
  { icon: 'account_circle', label: 'Account & Profile', count: 10 },
  { icon: 'security', label: 'Privacy & Security', count: 5 },
  { icon: 'smart_toy', label: 'AI Matcher', count: 7 },
];

export default function HelpPage() {
  return (
    <div className="max-w-container-max mx-auto px-gutter py-10">
      {/* Hero */}
      <div className="glass-card rounded-[2rem] p-10 mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -ml-24 -mb-24" />
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>help</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-background mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>How can we help you?</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-lg mx-auto">Find answers to common questions or reach out to our support team.</p>
          <div className="flex items-center gap-3 bg-white border border-outline-variant/30 rounded-2xl p-2 max-w-xl mx-auto shadow-sm">
            <span className="material-symbols-outlined text-primary ml-2">search</span>
            <input
              type="text"
              placeholder="Search help articles..."
              className="flex-1 bg-transparent outline-none font-body-md text-on-surface placeholder:text-outline-variant py-2"
            />
            <button className="px-5 py-2 bg-primary text-on-primary rounded-10 font-label-md hover:opacity-90 transition-all">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {categories.map((cat) => (
          <button key={cat.label} className="glass-card p-4 rounded-2xl text-center hover:-translate-y-1 transition-all duration-300 group border border-outline-variant/20">
            <div className="w-12 h-12 rounded-10 bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">{cat.icon}</span>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface leading-tight">{cat.label}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{cat.count} articles</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FAQs */}
        <div className="lg:col-span-2">
          <h2 className="font-headline-md text-headline-md mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="glass-card rounded-2xl p-6 group cursor-pointer border border-outline-variant/20 hover:border-primary/30 transition-colors">
                <summary className="flex items-center justify-between font-label-md text-on-surface list-none">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined text-primary transition-transform group-open:rotate-180 shrink-0 ml-4">expand_more</span>
                </summary>
                <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-10">
          <div className="glass-card rounded-2xl p-10">
            <h3 className="font-headline-md text-headline-md mb-2">Still need help?</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Our support team typically responds within 2 hours.</p>
            <div className="space-y-3">
              <a href="mailto:support@scholarquest.io" className="flex items-center gap-4 p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-10 bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="font-label-md text-on-surface">Email Support</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">support@scholarquest.io</p>
                </div>
              </a>
              <button className="w-full flex items-center gap-4 p-4 bg-surface-container-low rounded-10 hover:bg-surface-container transition-colors">
                <div className="w-10 h-10 rounded-10 bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">chat</span>
                </div>
                <div className="text-left">
                  <p className="font-label-md text-on-surface">Live Chat</p>
                  <p className="font-body-sm text-body-sm text-green-600">Online now</p>
                </div>
              </button>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-10">
            <h3 className="font-headline-md text-headline-md mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { label: 'Video Tutorials', icon: 'play_circle' },
                { label: 'Getting Started Guide', icon: 'menu_book' },
                { label: 'Application Checklist', icon: 'checklist' },
                { label: 'Community Forum', icon: 'forum' },
              ].map((link) => (
                <Link key={link.label} href="#" className="flex items-center gap-3 p-3 rounded-10 hover:bg-surface-container-low transition-colors text-primary font-label-md text-label-md">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
