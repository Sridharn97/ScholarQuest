'use client';
import { useState, useEffect, useRef } from 'react';
import { getMessages, providerSendMessage, getProviderInfo, getUserName, getUserInitials } from '@/lib/store';

export default function useProviderMessages() {
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const load = () => {
    const provider = getProviderInfo();
    const org = provider?.organization || '';
    const allConvs = getMessages();
    const myConv = allConvs.find(c => c.name === org || c.name === `${org} Support`);

    if (myConv) {
      const hasStudentMessage = myConv.thread.some(msg => msg.isMe);
      if (hasStudentMessage) {
        setConvs([{
          id: myConv.id,
          name: getUserName(),
          avatar: getUserInitials(),
          avatarBg: 'bg-blue-500/10 text-blue-600',
          lastMessage: myConv.lastMessage,
          time: myConv.time,
          unread: myConv.unread || 0,
          online: true,
          thread: myConv.thread
        }]);
        setActiveConv(myConv.id);
      } else {
        setConvs([]);
        setActiveConv(null);
      }
    } else {
      setConvs([]);
      setActiveConv(null);
    }
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
  };

  const handleSend = () => {
    const text = newMessage.trim();
    if (!text || !activeConv) return;
    providerSendMessage(activeConv, text);
    setNewMessage('');
    load();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredConvs = convs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const activeConvData = convs.find(c => c.id === activeConv);
  const totalUnread = 0;

  return {
    convs,
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
    filteredConvs,
    activeConvData,
    totalUnread,
  };
}
