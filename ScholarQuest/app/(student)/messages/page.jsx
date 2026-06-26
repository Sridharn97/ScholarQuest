'use client';
import React from 'react';
import useMessages from '@/lib/hooks/useMessages';

export default function MessagesPage() {
  const {
    convs,
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
    handleLeave,
    filteredConvs,
  } = useMessages();

  const activeConvData = convs.find(c => c.id === activeConv);
  const totalUnread = convs.reduce((sum, c) => sum + (c.unread || 0), 0);

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
    <div className="flex h-[calc(100vh-130px)] bg-[#f8fafc] overflow-hidden relative shadow-sm border border-outline-variant/20 m-4 rounded-xl">
      {/* Conversations Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r border-purple-100/50 flex-col bg-white/60 backdrop-blur-md z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]`}>
        <div className="p-4 pb-3 border-b border-outline-variant/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-headline-md text-base font-bold text-on-surface">Messages</h2>
            {totalUnread > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary flex items-center justify-center text-[10px] text-white font-bold">
                {totalUnread} New
              </span>
            )}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: '16px' }}>search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg py-1.5 pl-8 pr-4 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-on-surface-variant">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>search_off</span>
              <p className="font-label-sm text-xs mt-2">No conversations found</p>
            </div>
          ) : filteredConvs.map((conv) => (
            <button
              key={conv.id}
              onClick={() => handleSelectConv(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-l-2 ${activeConv === conv.id ? 'bg-primary/5 border-primary' : 'border-transparent hover:bg-surface-container-lowest'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${conv.avatarBg}`}>
                  {conv.avatar}
                </div>
                {conv.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`font-label-sm text-sm truncate ${activeConv === conv.id ? 'font-bold text-primary' : 'font-semibold text-on-surface'}`}>{conv.name}</span>
                  <span className="font-label-sm text-[10px] text-outline shrink-0 ml-2">{conv.time}</span>
                </div>
                <p className={`font-body-sm text-xs truncate ${conv.unread > 0 ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-[9px] text-white font-bold">{conv.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showMobileList ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 bg-transparent`}>
        {/* Chat Header */}
        <div className="flex items-center gap-3 p-3 px-4 border-b border-outline-variant/20 bg-white/90 backdrop-blur-md shadow-sm z-10 shrink-0">
          <button
            className="md:hidden p-1.5 -ml-1 text-slate-500 hover:bg-slate-100 rounded-lg"
            onClick={() => setShowMobileList(true)}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          </button>

          {activeConvData ? (
            <>
              <div className="relative shrink-0">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${activeConvData.avatarBg}`}>
                  {activeConvData.avatar}
                </div>
                {activeConvData.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="font-label-sm font-bold text-sm text-on-surface truncate leading-tight">{activeConvData.name}</p>
                <p className={`font-body-sm text-[11px] truncate leading-tight ${activeConvData.online ? 'text-green-600 font-medium' : 'text-on-surface-variant'}`}>
                  {activeConvData.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 min-w-0 font-label-md text-sm text-on-surface">Select a conversation</div>
          )}
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => handleLeave(activeConvData.id)}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50 text-red-500 hover:text-red-600 transition-colors"
              title="Leave"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f8fafc]">
          {activeConvData?.thread?.map((msg, index, arr) => {
            const isMe = msg.isMe;
            const prevMsg = arr[index - 1];
            const nextMsg = arr[index + 1];
            
            const currentDayLabel = formatDateLabel(msg.timestamp);
            const prevDayLabel = prevMsg ? formatDateLabel(prevMsg.timestamp) : null;
            const showDateDivider = currentDayLabel !== prevDayLabel;

            const isFirstInGroup = !prevMsg || prevMsg.isMe !== isMe || showDateDivider;
            const isLastInGroup = !nextMsg || nextMsg.isMe !== isMe || (nextMsg && formatDateLabel(nextMsg.timestamp) !== currentDayLabel);

            return (
              <React.Fragment key={msg.id}>
                {showDateDivider && (
                  <div className="text-center mb-3 mt-4 flex justify-center">
                    <span className="font-label-sm text-[10px] uppercase font-bold tracking-wider text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full shadow-sm">
                      {currentDayLabel}
                    </span>
                  </div>
                )}
                <div className={`flex gap-2 w-full ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? (index === 0 && !showDateDivider ? 'mt-2' : 'mt-3') : 'mt-[3px]'}`}>
                  {!isMe && (
                    <div className="w-6 shrink-0 flex items-end">
                      {isLastInGroup && activeConvData && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shadow-sm ${activeConvData.avatarBg}`}>
                          {activeConvData.avatar}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`max-w-[80%] sm:max-w-[70%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-3 pt-2 pb-1.5 shadow-sm relative group min-w-[75px]
                        ${isMe ? 'bg-primary text-white' : 'bg-white border border-slate-100 text-slate-800'}
                        ${isFirstInGroup && isLastInGroup ? 'rounded-2xl' : ''}
                        ${isFirstInGroup && !isLastInGroup ? (isMe ? 'rounded-t-2xl rounded-bl-2xl rounded-br-sm' : 'rounded-t-2xl rounded-br-2xl rounded-bl-sm') : ''}
                        ${!isFirstInGroup && isLastInGroup ? (isMe ? 'rounded-b-2xl rounded-tl-2xl rounded-tr-sm' : 'rounded-b-2xl rounded-tr-2xl rounded-tl-sm') : ''}
                        ${!isFirstInGroup && !isLastInGroup ? (isMe ? 'rounded-l-2xl rounded-r-sm' : 'rounded-r-2xl rounded-l-sm') : ''}
                      `}
                    >
                      <div className="flex flex-wrap items-end gap-x-3 justify-between">
                        <p className="font-body-md text-[14px] leading-relaxed break-words pb-0.5">{msg.content}</p>
                        <div className={`text-[10px] opacity-60 shrink-0 ml-auto flex items-center gap-1 mt-1 font-medium`}>
                          {msg.time}
                          {isMe && <span className="material-symbols-outlined text-white" style={{ fontSize: '14px' }}>done_all</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isMe && (
                    <div className="w-6 shrink-0" />
                  )}
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} className="h-2" />
        </div>

        {/* Message Input */}
        <div className="p-3 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 shrink-0 z-10 mb-16 md:mb-0">
          <div className="max-w-4xl mx-auto flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/40 rounded-full p-1 pl-3 pr-1 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-sm">
            <button className="text-slate-400 hover:text-primary transition-colors shrink-0 flex items-center justify-center" title="Attach file">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>attach_file</span>
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-[14px] text-slate-800 placeholder:text-slate-400 py-1.5 min-w-0"
              disabled={!activeConvData}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim() || !activeConvData}
              className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shrink-0 disabled:opacity-50 disabled:hover:scale-100"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
