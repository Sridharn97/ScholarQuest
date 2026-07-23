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
      
      // Stop words for better keyword extraction
      const stopWords = ['i', 'want', 'to', 'find', 'looking', 'for', 'a', 'the', 'scholarship', 'scholarships', 'grant', 'grants', 'funding', 'need', 'show', 'me', 'some', 'any', 'my', 'in', 'on', 'at', 'is', 'are', 'am', 'with', 'about', 'an'];
      
      // Extract keywords from prompt
      const words = lower.split(/[^a-z0-9]+/).filter(w => w.length > 2 && !stopWords.includes(w));
      
      let matched = [];
      let title = 'Search Results';

      if (words.length > 0) {
        matched = list.filter(s => {
          const searchString = `${s.name || ''} ${s.category || ''} ${s.desc || ''} ${s.org || ''} ${s.fieldOfStudy || ''}`.toLowerCase();
          // Find if any keyword matches
          return words.some(w => searchString.includes(w));
        });
      } else {
        // Fallback if no meaningful keywords were found
        matched = list;
      }

      if (matched.length === 0) {
        title = 'No Matches Found';
      } else {
        title = `Top Matches for "${words.join(' ')}"`;
        if (words.length === 0) {
          title = 'Top Matches For You';
        }
      }

      const response = {
        title,
        scholarships: matched.slice(0, 2).map((s, idx) => ({
          match: Math.max(95 - idx * 5, 75), // Mock match percentage
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
