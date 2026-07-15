'use client';

import { useState } from 'react';
import Tesseract from 'tesseract.js';

export default function AIDocumentScanner({ onExtractedData }) {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScanning(true);
    setStatusText('Loading AI OCR Engine...');
    setProgress(10);

    try {
      const result = await Tesseract.recognize(
        file,
        'eng',
        {
          logger: m => {
            if (m.status === 'recognizing text') {
              setStatusText('Extracting Text...');
              setProgress(m.progress * 100);
            }
          }
        }
      );

      setStatusText('Parsing Data...');
      
      const text = result.data.text;
      const extracted = {
        gpa: null,
        institution: null,
      };

      // Very basic heuristics to find GPA
      const gpaMatch = text.match(/(?:GPA|C\.G\.P\.A|Grade Point Average)[\s:]*([0-9]\.[0-9]{1,2})/i);
      if (gpaMatch) {
        extracted.gpa = gpaMatch[1];
      }

      // Very basic heuristics to find University (looks for the word University or Institute)
      const lines = text.split('\n');
      for (let line of lines) {
        if ((line.includes('University') || line.includes('Institute') || line.includes('College')) && line.length < 50) {
          extracted.institution = line.trim();
          break;
        }
      }

      onExtractedData(extracted);
      setStatusText('Complete!');
      setTimeout(() => setScanning(false), 2000);

    } catch (error) {
      console.error(error);
      setStatusText('Failed to scan document.');
      setTimeout(() => setScanning(false), 3000);
    }
  };

  return (
    <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
      <div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>document_scanner</span>
          Smart Auto-Fill
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
          Upload your transcript or ID card and let our local AI automatically extract your academic details to save you time.
        </p>
      </div>

      <div className="relative">
        {scanning ? (
          <div className="flex flex-col items-center justify-center min-w-[200px]">
            <div className="w-full bg-surface-container-highest rounded-full h-2 mb-2 overflow-hidden">
              <div className="bg-primary h-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="font-label-sm text-label-sm text-primary animate-pulse">{statusText}</span>
          </div>
        ) : (
          <label className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-label-md text-label-md cursor-pointer hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95 whitespace-nowrap">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>upload_file</span>
            Upload Transcript
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
          </label>
        )}
      </div>
    </div>
  );
}
