'use client';
import React from 'react';
import useProviderMessages from '@/lib/hooks/useProviderMessages';

export default function ProviderMessagesPage() {
  const {
    activeConv,
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
  } = useProviderMessages();

  const formatDateLabel = (timestamp) => {
    if (!timestamp) return 'TODAY';
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'TODAY';
    if (date.toDateString() === yesterday.toDateString()) return 'YESTERDAY';
    
    const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
    if (diffDays < 7 && diffDays > 0) {
      return date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    }
    return date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="flex h-[calc(100vh-140px)] w-full bg-[#f8fafc] overflow-hidden relative rounded-2xl shadow-sm border border-outline-variant/20">
      {/* Conversations Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r border-outline-variant/30 flex-col bg-surface z-10 rounded-l-2xl shadow-sm`}>
        <div className="p-6 border-b border-outline-variant/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-headline-md text-xl font-semibold">Student Messages</h2>
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: '18px' }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-2 pl-9 pr-4 text-body-sm outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-on-surface-variant">
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>search_off</span>
              <p className="font-label-sm mt-2">No conversations found</p>
            </div>
          ) : filteredConvs.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConv(conv.id)}
              className={`w-full flex items-center gap-3 p-4 border-b border-slate-100 hover:bg-slate-50 transition-all duration-300 text-left ${activeConv === conv.id ? 'bg-primary/5 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.05)] border-l-4 border-l-primary' : 'border-l-4 border-transparent'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${conv.avatarBg}`}>
                  {conv.avatar}
                </div>
                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-label-md text-label-md truncate ${activeConv === conv.id ? 'text-primary font-bold' : 'text-on-surface'}`}>{conv.name}</span>
                  <span className="font-label-sm text-label-sm text-outline shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`font-body-sm text-body-sm truncate ${conv.unread > 0 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>{conv.lastMessage}</p>
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
      <div className={`${!showMobileList ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 bg-transparent rounded-r-2xl`}>
        {/* Chat Header */}
        <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-outline-variant/20 bg-white/90 backdrop-blur-md z-10 shrink-0">
          <button
            className="md:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-xl"
            onClick={() => setShowMobileList(true)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          {activeConvData ? (
            <>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeConvData.avatarBg}`}>
                  {activeConvData.avatar}
                </div>
                {activeConvData.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md font-bold text-on-surface truncate">{activeConvData.name}</p>
                <p className={`font-body-sm text-body-sm truncate ${activeConvData.online ? 'text-green-600 font-medium' : 'text-on-surface-variant'}`}>
                  {activeConvData.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 min-w-0 font-label-md text-on-surface">Select a conversation</div>
          )}

          <div className="flex gap-1 sm:gap-2 shrink-0">
            <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-700">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface">
          {activeConvData?.thread?.map((msg, index, arr) => {
            const providerIsMe = !msg.isMe; // Reverse isMe since student is true
            const prevMsg = arr[index - 1];
            
            const currentDayLabel = formatDateLabel(msg.timestamp);
            const prevDayLabel = prevMsg ? formatDateLabel(prevMsg.timestamp) : null;
            const showDateDivider = currentDayLabel !== prevDayLabel;

            const isFirstInGroup = !prevMsg || prevMsg.isMe !== msg.isMe || showDateDivider;
            
            return (
              <React.Fragment key={msg.id}>
                {showDateDivider && (
                  <div className="text-center mb-4 mt-4 flex justify-center">
                    <span className="font-label-sm text-[11px] uppercase font-bold tracking-wider text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full shadow-sm">
                      {currentDayLabel}
                    </span>
                  </div>
                )}
                <div className={`flex gap-2 sm:gap-3 ${providerIsMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? (index === 0 && !showDateDivider ? 'mt-2' : 'mt-4') : 'mt-1.5'}`}>
                  {!providerIsMe && activeConvData && (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 self-end ${activeConvData.avatarBg}`}>
                      {activeConvData.avatar}
                    </div>
                  )}
                  <div className={`max-w-[85%] sm:max-w-[70%] ${providerIsMe ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                    <div className={`px-3 pt-2 pb-1.5 rounded-2xl shadow-sm min-w-[75px] ${providerIsMe ? 'bg-gradient-to-r from-primary to-purple-500 text-white rounded-br-sm' : 'bg-white border border-slate-100 text-slate-800 rounded-bl-sm'}`}>
                      <div className="flex flex-wrap items-end gap-x-3 justify-between">
                        <p className="font-body-md text-[14px] leading-relaxed break-words pb-0.5">{msg.content}</p>
                        <div className={`text-[10px] opacity-60 shrink-0 ml-auto flex items-center gap-1 mt-1 font-medium ${providerIsMe ? 'text-white/80' : 'text-slate-500'}`}>
                          {msg.time}
                          {providerIsMe && <span className="material-symbols-outlined text-white" style={{ fontSize: '14px' }}>done_all</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  {providerIsMe && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0 self-end">
                      Me
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 sm:p-6 bg-surface border-t border-outline-variant/30 shrink-0 mb-16 md:mb-0 rounded-br-2xl z-10">
          <div className="flex items-center gap-2 sm:gap-4 bg-surface-container-lowest border border-outline-variant/50 shadow-sm rounded-full p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
            <button className="p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full shrink-0">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message to the student..."
              className="flex-1 bg-transparent outline-none text-sm sm:text-base text-slate-800 placeholder:text-slate-400 py-2 min-w-0"
              disabled={!activeConvData}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || !activeConvData}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full flex items-center justify-center shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 active:scale-95 shrink-0 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>send</span>
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-center font-medium">Press Enter to send</p>
        </div>
      </div>
    </div>
  );
}
