'use client';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg = { id: Date.now(), type: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const q = query(collection(db, 'scholarships'), where('status', '==', 'Active'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));

      const lower = text.toLowerCase();
      let matched = list;
      let title = 'Top Matches For You';
      
      if (lower.includes('stem') || lower.includes('engineering') || lower.includes('science')) {
        matched = list.filter(s => s.category === 'STEM' || (s.name && s.name.toLowerCase().includes('stem')));
        title = 'STEM Excellence Matches';
      } else if (lower.includes('ai') || lower.includes('machine learning') || lower.includes('research')) {
        matched = list.filter(s => (s.name && s.name.toLowerCase().includes('ai')) || (s.name && s.name.toLowerCase().includes('research')));
        title = 'AI & Machine Learning Grants';
      } else if (lower.includes('grad') || lower.includes('master') || lower.includes('phd')) {
        title = 'Graduate School Funding';
      }

      const response = {
        title,
        scholarships: matched.slice(0, 2).map((s, idx) => ({
          match: 95 - idx * 5,
          title: s.name,
          award: s.amount,
          urgency: `Deadline: ${s.deadline || 'Rolling'}`,
          tags: s.category ? [s.category] : []
        }))
      };

      const aiMsg = { id: Date.now() + 1, type: 'ai-results', content: text, response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error fetching AI matches:", error);
      const errorMsg = { id: Date.now() + 1, type: 'ai-results', content: text, response: { title: 'Error', scholarships: [] } };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
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
