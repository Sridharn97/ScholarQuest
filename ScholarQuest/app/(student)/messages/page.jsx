'use client';
import { useState, useEffect, useRef } from 'react';
import { getMessages, sendMessage, markAsRead } from '@/lib/store';

export default function MessagesPage() {
  const [convs, setConvs] = useState([]);
  const [activeConv, setActiveConv] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef(null);

  const load = () => setConvs(getMessages());

  useEffect(() => {
    load();
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const filteredConvs = convs.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const activeConvData = convs.find(c => c.id === activeConv);
  const totalUnread = convs.reduce((sum, c) => sum + (c.unread || 0), 0);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-surface-container-lowest overflow-hidden relative">
      {/* Conversations Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r border-outline-variant/20 flex-col bg-white z-10`}>
        <div className="p-6 border-b border-outline-variant/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-md text-headline-md">Messages</h2>
            {totalUnread > 0 && (
              <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[11px] text-white font-bold">
                {totalUnread}
              </span>
            )}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: '18px' }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-10 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-on-surface-variant">
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>search_off</span>
              <p className="font-label-sm mt-2">No conversations found</p>
            </div>
          ) : filteredConvs.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConv(conv.id)}
              className={`w-full flex items-center gap-3 p-4 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors text-left ${activeConv === conv.id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-transparent'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${conv.avatarBg}`}>
                  {conv.avatar}
                </div>
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-label-md text-label-md truncate ${activeConv === conv.id ? 'text-primary' : 'text-on-surface'}`}>{conv.name}</span>
                  <span className="font-label-sm text-label-sm text-outline shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showMobileList ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 bg-surface-container-lowest`}>
        {/* Chat Header */}
        <div className="flex items-center gap-4 p-4 border-b border-outline-variant/20 bg-white shadow-sm shrink-0">
          <button
            className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-6"
            onClick={() => setShowMobileList(true)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          {activeConvData && (
            <>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeConvData.avatarBg}`}>
                  {activeConvData.avatar}
                </div>
                {activeConvData.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-on-surface truncate">{activeConvData.name}</p>
                <p className={`font-body-sm text-body-sm truncate ${activeConvData.online ? 'text-green-600' : 'text-on-surface-variant'}`}>
                  {activeConvData.online ? 'Online now' : 'Offline'}
                </p>
              </div>
            </>
          )}
          <div className="flex gap-1 sm:gap-2 shrink-0">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-lg space-y-4">
          <div className="text-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-4 py-1 rounded-full">Today</span>
          </div>
          {activeConvData?.thread?.map((msg) => (
            <div key={msg.id} className={`flex gap-2 sm:gap-3 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              {!msg.isMe && activeConvData && (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 self-end ${activeConvData.avatarBg}`}>
                  {activeConvData.avatar}
                </div>
              )}
              <div className={`max-w-[85%] sm:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${msg.isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-white border border-outline-variant/20 text-on-surface rounded-tl-sm'}`}>
                  <p className="font-body-md text-body-md leading-relaxed">{msg.content}</p>
                </div>
                <span className="font-label-sm text-label-sm text-outline px-2">{msg.time}</span>
              </div>
              {msg.isMe && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 self-end">
                  Me
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-3 sm:p-4 border-t border-outline-variant/20 bg-white shrink-0 mb-16 md:mb-0">
          <div className="flex items-center gap-2 sm:gap-3 bg-surface-container-low border border-outline-variant/30 rounded-2xl p-1 sm:p-2">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-6 shrink-0">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none font-body-md text-on-surface placeholder:text-outline-variant py-2 min-w-0"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="w-10 h-10 bg-primary text-white rounded-10 flex items-center justify-center hover:opacity-90 transition-all active:scale-95 shrink-0 disabled:opacity-40"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
          <p className="text-[10px] text-outline mt-1 text-center">Press Enter to send</p>
        </div>
      </div>
    </div>
  );
}
