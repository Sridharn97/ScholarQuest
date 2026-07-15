'use client';

import { useState, useEffect, useRef } from 'react';

export default function AISummarizer({ text }) {
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('@/lib/workers/summarizer.worker.js', import.meta.url), {
        type: 'module'
      });
    }

    const onMessageReceived = (e) => {
      switch (e.data.status) {
        case 'loading':
          setStatus('loading');
          if (e.data.progress && e.data.progress.progress) {
            setProgress(e.data.progress.progress);
          }
          break;
        case 'analyzing':
          setStatus('analyzing');
          break;
        case 'complete':
          setStatus('complete');
          setSummary(e.data.result);
          break;
        case 'idle':
          setStatus('idle');
          setSummary(null);
          break;
        case 'error':
          console.error('Summarizer Error:', e.data.error);
          setStatus('error');
          break;
      }
    };

    worker.current.addEventListener('message', onMessageReceived);

    return () => {
      if (worker.current) {
        worker.current.removeEventListener('message', onMessageReceived);
      }
    };
  }, []);

  const handleSummarize = () => {
    if (worker.current && text) {
      setStatus('initializing');
      worker.current.postMessage({ text });
    }
  };

  if (status === 'complete' && summary) {
    return (
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-4 relative animate-fade-in">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>auto_awesome</span>
        </div>
        <h3 className="font-label-md text-label-md text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>summarize</span>
          AI TL;DR
        </h3>
        <p className="font-body-md text-body-md text-on-surface leading-relaxed relative z-10">{summary}</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleSummarize}
        disabled={status === 'loading' || status === 'analyzing' || status === 'initializing'}
        className="flex items-center gap-2 px-6 py-3 bg-surface-container-low border border-outline-variant/30 rounded-full font-label-md text-label-md text-on-surface hover:border-primary hover:text-primary transition-all disabled:opacity-70 disabled:cursor-wait"
      >
        {(status === 'loading' || status === 'initializing' || status === 'analyzing') ? (
          <>
            <span className="material-symbols-outlined animate-spin" style={{ fontSize: '18px' }}>progress_activity</span>
            {status === 'loading' ? `Downloading AI Model (${Math.round(progress)}%)...` : 'Generating Summary...'}
          </>
        ) : status === 'error' ? (
          <>
            <span className="material-symbols-outlined text-red-500" style={{ fontSize: '18px' }}>error</span>
            <span className="text-red-500">Error Generating Summary</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>auto_awesome</span>
            Summarize with AI
          </>
        )}
      </button>
    </div>
  );
}
