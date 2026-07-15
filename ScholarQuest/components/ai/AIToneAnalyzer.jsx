'use client';

import { useState, useEffect, useRef } from 'react';

export default function AIToneAnalyzer({ text }) {
  const [tone, setTone] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const worker = useRef(null);

  // Initialize the worker on component mount
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('@/lib/workers/toneAnalyzer.worker.js', import.meta.url), {
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
          setTone(e.data.result);
          break;
        case 'idle':
          setStatus('idle');
          setTone(null);
          break;
        case 'error':
          console.error('Tone Analyzer Error:', e.data.error);
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

  // Send text to worker whenever it changes, with a small debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (worker.current && text !== undefined) {
        // Truncate to avoid exceeding max sequence length (512 tokens) and causing ONNX crash
        const safeText = text.length > 1500 ? text.substring(0, 1500) : text;
        worker.current.postMessage({ text: safeText });
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(timer);
  }, [text]);

  if (status === 'idle') return null;

  const getToneBadge = () => {
    if (status === 'loading') {
      return (
        <div className="flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-medium w-fit">
          <span className="material-symbols-outlined animate-spin" style={{ fontSize: '16px' }}>progress_activity</span>
          Downloading AI Model ({Math.round(progress)}%)...
        </div>
      );
    }
    
    if (status === 'analyzing') {
      return (
        <div className="flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30 text-xs font-medium w-fit">
          <span className="material-symbols-outlined animate-pulse" style={{ fontSize: '16px' }}>smart_toy</span>
          Analyzing Tone...
        </div>
      );
    }

    if (status === 'complete' && tone) {
      // Get the top scoring label
      const topLabel = tone.labels[0];
      const topScore = tone.scores[0];
      
      let badgeColor = 'bg-surface-container-low text-on-surface';
      let icon = 'sentiment_satisfied';

      if (topLabel.includes('confident')) {
        badgeColor = 'bg-green-100 text-green-800 border-green-200';
        icon = 'workspace_premium';
      } else if (topLabel.includes('hesitant')) {
        badgeColor = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        icon = 'edit_note';
      } else if (topLabel.includes('informal')) {
        badgeColor = 'bg-blue-100 text-blue-800 border-blue-200';
        icon = 'chat';
      } else if (topLabel.includes('passionate')) {
        badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
        icon = 'local_fire_department';
      } else if (topLabel.includes('academic')) {
        badgeColor = 'bg-indigo-100 text-indigo-800 border-indigo-200';
        icon = 'school';
      }

      return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-medium w-fit transition-colors duration-500 shadow-sm ${badgeColor}`}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{icon}</span>
          AI Tone: {topLabel.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} ({Math.round(topScore * 100)}%)
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full border border-red-200 text-xs font-medium w-fit">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>error</span>
          AI Model Error
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mt-2 animate-fade-in">
      {getToneBadge()}
    </div>
  );
}
