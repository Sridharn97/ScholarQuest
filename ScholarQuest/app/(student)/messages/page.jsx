'use client';
import { useState } from 'react';

const conversations = [
  {
    id: 1,
    name: 'Gates Foundation',
    avatar: 'GF',
    avatarBg: 'bg-primary/10 text-primary',
    lastMessage: 'Thank you for your application. We are pleased to inform you...',
    time: '2h ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'World Future Foundation',
    avatar: 'WF',
    avatarBg: 'bg-secondary/10 text-secondary',
    lastMessage: 'Your application documents have been received.',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'ScholarQuest Support',
    avatar: 'SQ',
    avatarBg: 'bg-green-100 text-green-700',
    lastMessage: 'Hi Alex! How can I help you today?',
    time: 'Mon',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'Rhodes Trust',
    avatar: 'RT',
    avatarBg: 'bg-tertiary-container/10 text-tertiary',
    lastMessage: 'The interview schedule has been updated for your review.',
    time: 'Sep 28',
    unread: 1,
    online: false,
  },
];

const messages = [
  { id: 1, sender: 'Gates Foundation', content: 'Hello Alex! We have reviewed your initial application for the Gates Scholarship.', time: '10:02 AM', isMe: false },
  { id: 2, sender: 'me', content: 'Thank you for reaching out! I am very excited about this opportunity.', time: '10:15 AM', isMe: true },
  { id: 3, sender: 'Gates Foundation', content: 'Your profile shows impressive academic achievements. We would like to invite you to the second round of evaluation.', time: '10:30 AM', isMe: false },
  { id: 4, sender: 'me', content: 'That is wonderful news! What documents will be required for the next stage?', time: '10:45 AM', isMe: true },
  { id: 5, sender: 'Gates Foundation', content: 'Thank you for your application. We are pleased to inform you that you have been selected for the final interview round. Congratulations!', time: '11:20 AM', isMe: false },
];

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState(1);
  const [newMessage, setNewMessage] = useState('');
  const [showMobileList, setShowMobileList] = useState(true);

  const handleSelectConv = (id) => {
    setActiveConv(id);
    setShowMobileList(false);
  };

  const activeConvData = conversations.find(c => c.id === activeConv);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-surface-container-lowest overflow-hidden relative">
      {/* Conversations Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r border-outline-variant/20 flex-col bg-white z-10`}>
        <div className="p-6 border-b border-outline-variant/10">
          <h2 className="font-headline-md text-headline-md mb-3">Messages</h2>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: '18px' }}>search</span>
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-10 py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
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
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-4 py-1 rounded-full">Today, 10:00 AM</span>
          </div>
          {messages.map((msg) => (
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
            </div>
          ))}
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
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none font-body-md text-on-surface placeholder:text-outline-variant py-2 min-w-0"
            />
            <button className="w-10 h-10 bg-primary text-white rounded-10 flex items-center justify-center hover:opacity-90 transition-all active:scale-95 shrink-0">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
