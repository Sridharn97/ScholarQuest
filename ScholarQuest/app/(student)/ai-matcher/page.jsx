'use client';
import useAiMatcher from '@/lib/hooks/useAiMatcher';

const suggestions = [
  'Find STEM full-ride scholarships',
  "I'm interested in AI research grants",
  'Need funding for Graduate School',
  'Show me scholarships for international students',
];

export default function AiMatcherPage() {
  const {
    messages,
    input,
    setInput,
    loading,
    user,
    messagesEndRef,
    handleSend,
    handleSuggestion,
    handleKeyDown,
    firstName,
    initials,
  } = useAiMatcher();

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-surface-container-lowest relative">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-gutter space-y-10 pb-32">
        <div className="max-w-4xl mx-auto space-y-4">

          {messages.map((msg) => {
            if (msg.type === 'ai-welcome') return (
              <div key="welcome" className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20 animate-subtle-float">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="glass-panel p-6 rounded-2xl rounded-tl-none shadow-sm">
                    <p className="font-body-lg text-body-lg text-on-surface">
                      Hello {firstName}! I&apos;ve analyzed your profile as a{' '}
                      <span className="text-primary font-semibold">{user?.studyField || 'Computer Science'} Student</span>{' '}
                      {user?.gpa && <span>with a <span className="text-secondary font-semibold">{user.gpa} GPA</span>. </span>}
                      I&apos;m ready to help you find your perfect academic funding match.
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                      Tell me about your goals, research interests, or any specific type of scholarship you&apos;re looking for.
                    </p>
                  </div>
                  {/* Quick Suggestion Pills */}
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="px-4 py-2 bg-white border border-outline-variant/30 rounded-full font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-all shadow-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (msg.type === 'user') return (
              <div key={msg.id} className="flex gap-6 items-start justify-end">
                <div className="space-y-2 flex-1 max-w-[80%] flex flex-col items-end">
                  <div className="bg-primary text-white p-6 rounded-2xl rounded-tr-none shadow-md">
                    <p className="font-body-md text-body-md">{msg.content}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                  {initials}
                </div>
              </div>
            );

            if (msg.type === 'ai-results') return (
              <div key={msg.id} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="flex-1 space-y-6">
                  <div className="glass-panel p-6 rounded-2xl rounded-tl-none shadow-sm">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{msg.response.title}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Based on your query &quot;{msg.content}&quot;, I found these high-probability matches for your profile.
                    </p>
                  </div>

                  {/* Match Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {msg.response.scholarships.map((card, i) => (
                      <div key={i} className={`glass-panel p-6 rounded-10 border-l-4 ${i === 0 ? 'border-secondary' : 'border-primary'} flex flex-col justify-between group hover:scale-[1.01] transition-transform cursor-pointer relative overflow-hidden`}>
                        {/* Match Circle */}
                        <div className="absolute top-0 right-0 p-4">
                          <div className="flex flex-col items-center">
                            <div className="relative w-12 h-12">
                              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                                <circle className="text-surface-container-highest" cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="4" />
                                <circle className={i === 0 ? 'text-secondary' : 'text-primary'} cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - card.match / 100)} strokeWidth="4" />
                              </svg>
                              <span className={`absolute inset-0 flex items-center justify-center font-label-sm font-bold ${i === 0 ? 'text-secondary' : 'text-primary'}`}>{card.match}%</span>
                            </div>
                            <span className="text-[10px] uppercase font-bold text-on-surface-variant mt-1">Match</span>
                          </div>
                        </div>

                        <div>
                          <div className="flex gap-2 mb-2 flex-wrap">
                            {card.tags.map((t) => (
                              <span key={t} className={`px-2 py-0.5 ${i === 0 ? 'bg-secondary-container/10 text-secondary' : 'bg-primary-container/10 text-primary'} text-[10px] font-bold rounded uppercase tracking-wider`}>{t}</span>
                            ))}
                          </div>
                          <h4 className="font-headline-md text-[18px] font-bold text-on-surface leading-tight mb-1 pr-16">{card.title}</h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">Award: {card.award}</p>
                        </div>

                        <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                          <span className={`font-label-sm font-semibold flex items-center gap-1 ${card.urgency.includes('left') ? 'text-error' : 'text-on-surface-variant'}`}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
                            {card.urgency}
                          </span>
                          <button
                            onClick={() => {
                              const { addCardToColumn } = require('@/lib/store');
                              addCardToColumn('col_interested', { title: card.title, desc: `Award: ${card.award}`, type: `${card.match}% Match` });
                              alert(`"${card.title}" added to your tracker!`);
                            }}
                            className="text-primary font-bold font-label-md flex items-center gap-1 hover:underline"
                          >
                            Track It <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>bookmark_add</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

            return null;
          })}

          {/* Loading */}
          {loading && (
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined animate-spin" style={{ fontSize: '20px' }}>progress_activity</span>
              </div>
              <div className="glass-panel px-6 py-4 rounded-2xl rounded-tl-none shadow-sm">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="font-body-sm text-on-surface-variant ml-2">Analyzing scholarships...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto w-full glass-panel rounded-2xl shadow-xl shadow-primary/5 p-2 flex items-center gap-2 border border-primary/20 pointer-events-auto">
          <button className="p-3 text-on-surface-variant hover:bg-surface-container-high rounded-10 transition-all">
            <span className="material-symbols-outlined">attach_file</span>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask ScholarQuest AI about your future..."
            className="flex-1 bg-transparent border-none outline-none font-body-md text-on-surface placeholder:text-outline-variant py-4 px-2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="w-12 h-12 bg-primary text-white rounded-10 flex items-center justify-center shadow-md hover:scale-95 transition-all active:scale-90 disabled:opacity-40"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
