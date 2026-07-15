'use client';

import { useState, useEffect, useRef } from 'react';

export default function AIQualityBadge({ application }) {
  const [quality, setQuality] = useState(null);
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const worker = useRef(null);

  // Combine all text responses to evaluate the overall effort/quality
  // We truncate to ~1500 characters to avoid exceeding the model's max token limit (512 tokens),
  // which causes "OrtRun() error code = 6" crashes in the ONNX runtime.
  const rawText = [
    application.honors,
    ...(application.customResponses || []).map(r => r.answer)
  ].filter(Boolean).join(' ');
  const combinedText = rawText.length > 1500 ? rawText.substring(0, 1500) : rawText;

  useEffect(() => {
    if (!combinedText) return;

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
          setQuality(e.data.result);
          break;
        case 'idle':
          setStatus('idle');
          setQuality(null);
          break;
        case 'error':
          console.error('Quality Analyzer Error:', e.data.error);
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
  }, [combinedText]);

  useEffect(() => {
    if (combinedText && worker.current && status === 'idle') {
      worker.current.postMessage({
        text: combinedText,
        candidate_labels: [
          'high effort, detailed, and professional',
          'standard and acceptable',
          'low effort, brief, or spam'
        ]
      });
    }
  }, [combinedText, status]);

  if (!combinedText) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>do_not_disturb</span>
        No Text Data
      </div>
    );
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
        <span className="material-symbols-outlined animate-spin" style={{ fontSize: '14px' }}>progress_activity</span>
        AI Loading ({Math.round(progress)}%)
      </div>
    );
  }

  if (status === 'analyzing') {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
        <span className="material-symbols-outlined animate-pulse" style={{ fontSize: '14px' }}>smart_toy</span>
        AI Scoring...
      </div>
    );
  }

  if (status === 'complete' && quality) {
    const topLabel = quality.labels[0];
    const topScore = quality.scores[0];

    let badgeCls = '';
    let icon = '';
    let label = '';

    if (topLabel.includes('high effort')) {
      badgeCls = 'bg-green-100 text-green-800 border-green-200';
      icon = 'verified';
      label = 'High Quality';
    } else if (topLabel.includes('standard')) {
      badgeCls = 'bg-blue-100 text-blue-800 border-blue-200';
      icon = 'check_circle';
      label = 'Standard';
    } else {
      badgeCls = 'bg-red-100 text-red-800 border-red-200';
      icon = 'warning';
      label = 'Low Effort';
    }

    return (
      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all duration-500 ${badgeCls}`}>
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{icon}</span>
        {label} ({Math.round(topScore * 100)}%)
      </div>
    );
  }

  return null;
}
