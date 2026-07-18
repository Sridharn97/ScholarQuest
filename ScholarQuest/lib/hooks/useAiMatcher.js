'use client';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';

const AI_RESPONSES = {
  'stem': { title: 'STEM Excellence Matches', scholarships: [
    { match: 95, title: 'NSF Graduate Research Fellowship', award: '₹37,00,000/yr + ₹12,00,000 stipend', urgency: 'Deadline: Oct 15', tags: ['STEM', 'Research'] },
    { match: 88, title: 'SMART Scholarship', award: '₹25,00,000–₹38,00,000', urgency: 'Deadline: Dec 1', tags: ['Engineering', 'Full-Ride'] },
    { match: 76, title: 'Boren Awards for International Study', award: 'Funding varies', urgency: 'Deadline: Jan 31', tags: ['Language', 'Study Abroad'] },
  ]},
  'ai': { title: 'AI & Machine Learning Grants', scholarships: [
    { match: 92, title: 'The Turing-Lovelace Fellowship', award: '₹45,00,000 + Living Stipend', urgency: '6 days left!', tags: ['AI Ethics', 'Full-Ride'] },
    { match: 85, title: 'Next-Gen Innovators Grant', award: '₹25,00,000 Research Budget', urgency: 'Deadline: Dec 15', tags: ['Research', 'Global'] },
  ]},
  'graduate': { title: 'Graduate School Funding', scholarships: [
    { match: 90, title: 'Rhodes Global Fellowship', award: 'Full Funding + Travel', urgency: 'Deadline: Oct 1', tags: ['Graduate', 'Global'] },
    { match: 83, title: 'Fulbright Scholar Program', award: 'Full Funding', urgency: 'Deadline: Oct 15', tags: ['International', 'Research'] },
  ]},
  'default': { title: 'Top Matches For You', scholarships: [
    { match: 94, title: 'Gates Millennium Scholarship', award: '₹40,00,000/yr', urgency: 'Deadline: Jan 15', tags: ['Merit', 'Full-Ride'] },
    { match: 87, title: 'Coca-Cola Scholars Program', award: '₹20,00,000', urgency: 'Deadline: Oct 31', tags: ['Leadership', 'National'] },
  ]},
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('stem') || lower.includes('engineering') || lower.includes('science')) return AI_RESPONSES.stem;
  if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('research')) return AI_RESPONSES.ai;
  if (lower.includes('grad') || lower.includes('master') || lower.includes('phd')) return AI_RESPONSES.graduate;
  return AI_RESPONSES.default;
}

export default function useAiMatcher() {
  const [messages, setMessages] = useState([{ id: 'welcome', type: 'ai-welcome' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const d = await getDoc(doc(db, 'users', u.uid));
        if (d.exists()) {
          setUser({ ...d.data(), uid: u.uid });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg = { id: Date.now(), type: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg = { id: Date.now() + 1, type: 'ai-results', content: text, response };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
      // Removed addActivity call since we migrated from lib/store
    }, 1200);
  };

  const handleSuggestion = (s) => {
    setInput(s);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };

  const firstName = user?.firstName || user?.name?.split(' ')[0] || 'Alex';
  const initials = user?.initials || 'AJ';

  return {
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
  };
}
