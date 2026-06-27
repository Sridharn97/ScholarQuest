'use client';
import { useState, useEffect, useRef } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function useMessages() {
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [search, setSearch] = useState('');
  const [userUid, setUserUid] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    
    if (userUid) {
      const q = query(collection(db, 'conversations'), where('studentId', '==', userUid));
      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        setConvs(data);
        
        setConvs(current => {
           if (current.length === 0) return current;
           // If no active conv, select the first visible one
           setActiveConv(prev => {
             if (!prev) {
               const remaining = data.filter(c => !c.hiddenForStudent);
               return remaining.length > 0 ? remaining[0].id : null;
             }
             return prev;
           });
           return current;
        });
      });
    } else {
      setConvs([]);
    }
    
    return () => unsubscribeSnapshot();
  }, [userUid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convs, activeConv]);

  const handleSelectConv = async (id) => {
    setActiveConv(id);
    setShowMobileList(false);
    try {
      await updateDoc(doc(db, 'conversations', id), { unread: 0 });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !activeConv) return;
    
    const msgObj = {
      text,
      sender: 'student',
      time: 'Just now',
      timestamp: Date.now()
    };
    
    setNewMessage('');
    try {
      await updateDoc(doc(db, 'conversations', activeConv), {
        messages: arrayUnion(msgObj),
        lastMessage: text,
        providerUnread: 1
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };

  const handleLeave = async (id) => {
    try {
      await updateDoc(doc(db, 'conversations', id), { hiddenForStudent: true });
      
      const remaining = convs.filter(c => c.id !== id && !c.hiddenForStudent);
      setActiveConv(remaining.length > 0 ? remaining[0].id : null);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredConvs = convs.filter(c =>
    !c.hiddenForStudent && (
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return {
    convs,
    setConvs,
    activeConv,
    setActiveConv,
    newMessage,
    setNewMessage,
    showMobileList,
    setShowMobileList,
    search,
    setSearch,
    messagesEndRef,
    handleSelectConv,
    handleSend,
    handleKeyDown,
    handleLeave,
    filteredConvs,
  };
}
