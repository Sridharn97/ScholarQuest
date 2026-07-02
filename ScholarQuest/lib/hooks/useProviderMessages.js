'use client';
import { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function useProviderMessages() {
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
      const q = query(collection(db, 'conversations'), where('providerId', '==', userUid));
      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => {
          const docData = doc.data();
          const avatarStr = docData.studentName ? docData.studentName.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'ST';
          const colors = ['bg-primary/10 text-primary', 'bg-secondary/10 text-secondary', 'bg-tertiary-container/10 text-tertiary', 'bg-blue-500/10 text-blue-600'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          
          const studentMessages = (docData.messages || []).filter(m => m.sender === 'student');
          const lastStudentMsg = studentMessages.length > 0 ? studentMessages[studentMessages.length - 1] : null;

          return {
            id: doc.id,
            ...docData,
            name: docData.studentName || 'Student',
            avatar: avatarStr,
            avatarBg: docData.avatarBg || randomColor,
            // Show all messages, mark provider ones as 'me'
            thread: (docData.messages || []).map((m, idx) => ({
              id: m.timestamp || idx,
              content: m.text,
              isMe: m.sender === 'provider',
              time: m.time,
              timestamp: m.timestamp
            })),
            // Show the last student message in the sidebar (not the provider's announcement)
            lastMessage: lastStudentMsg ? lastStudentMsg.text : null,
            time: lastStudentMsg ? lastStudentMsg.time : null,
            hasStudentMessages: studentMessages.length > 0
          };
        });
        
        setConvs(data);
        
        const remaining = data.filter(c => !c.hiddenForProvider);
        if (remaining.length > 0) {
          setActiveConv(prev => prev || remaining[0].id);
        }
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
      await updateDoc(doc(db, 'conversations', id), { providerUnread: 0 });
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !activeConv) return;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgObj = {
      text,
      sender: 'provider',
      time: timeStr,
      timestamp: Date.now()
    };
    
    setNewMessage('');
    try {
      await updateDoc(doc(db, 'conversations', activeConv), {
        messages: arrayUnion(msgObj),
        lastMessage: text,
        unread: 1 // student unread count
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
      await updateDoc(doc(db, 'conversations', id), { hiddenForProvider: true });
      
      const remaining = convs.filter(c => c.id !== id && !c.hiddenForProvider);
      setActiveConv(remaining.length > 0 ? remaining[0].id : null);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredConvs = convs.filter(c =>
    !c.hiddenForProvider &&
    c.hasStudentMessages && // Only show conversations where student has sent a message
    (
      c.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      c.scholarshipName?.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const activeConvData = convs.find(c => c.id === activeConv);

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
    activeConvData
  };
}
