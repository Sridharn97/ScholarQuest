'use client';
import { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage, markAsRead, leaveConversation } from '@/lib/store';

export default function useMessages() {
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const load = () => {
    const data = getMessages();
    setConvs(data);
    setActiveConv(prev => prev || (data.length > 0 ? data[0].id : null));
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      load();
    });
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convs, activeConv]);

  const handleSelectConv = (id) => {
    setActiveConv(id);
    setShowMobileList(false);
    markAsRead(id);
  };

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text) return;
    sendMessage(activeConv, text);
    setNewMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      handleSend(); 
    }
  };

  const handleLeave = (id) => {
    leaveConversation(id);
    const updatedConvs = getMessages();
    setConvs(updatedConvs);
    const remaining = updatedConvs.filter(c => !c.hiddenForStudent);
    setActiveConv(remaining.length > 0 ? remaining[0].id : null);
  };

  const filteredConvs = convs.filter(c =>
    !c.hiddenForStudent && (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase())
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
