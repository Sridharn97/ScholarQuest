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
    <div className="flex h-[calc(100vh-140px)] w-full bg-slate-50/50 overflow-hidden relative rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-white/60 backdrop-blur-3xl">
      {/* Conversations Sidebar */}
      <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex w-full md:w-80 flex-shrink-0 border-r border-slate-200/60 flex-col bg-white/80 backdrop-blur-xl z-10 rounded-l-[2rem]`}>
        <div className="p-6 pb-4 border-b border-slate-100/80">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-headline-md text-2xl font-bold tracking-tight bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent">Messages</h2>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-slate-100/80 border border-slate-200/50 rounded-2xl p-1 focus-within:bg-white focus-within:border-primary/30 focus-within:shadow-sm transition-all duration-300">
              <span className="material-symbols-outlined pl-3 pr-2 text-slate-400" style={{ fontSize: '20px' }}>search</span>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent py-2 pr-4 text-sm outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-transparent">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400">
              <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>search_off</span>
              <p className="font-medium mt-2 text-sm">No conversations found</p>
            </div>
          ) : filteredConvs.map((conv) => (
            <div key={conv.id} className="px-3 py-1.5">
              <button
                onClick={() => handleSelectConv(conv.id)}
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 text-left relative group overflow-hidden ${
                  activeConv === conv.id 
                    ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 ring-1 ring-primary/5' 
                    : 'hover:bg-slate-100/50 border border-transparent'
                }`}
              >
                {activeConv === conv.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-purple-500 rounded-l-2xl"></div>
                )}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-[15px] shadow-sm transition-transform duration-300 group-hover:scale-105 ${
                    activeConv === conv.id ? 'ring-2 ring-primary/20 ring-offset-2' : ''
                  } ${conv.avatarBg}`}>
                    {conv.avatar}
                  </div>
                  {conv.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[2.5px] border-white shadow-sm" />}
                </div>
                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium truncate text-[15px] ${activeConv === conv.id ? 'text-slate-900 font-semibold' : 'text-slate-700'}`}>{conv.name}</span>
                    <span className={`text-xs shrink-0 ml-2 font-medium ${activeConv === conv.id ? 'text-primary/80' : 'text-slate-400'}`}>{conv.time}</span>
                  </div>
                  <p className={`text-[13px] truncate leading-snug ${conv.unread > 0 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                    <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showMobileList ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 bg-slate-50/30 rounded-r-[2rem] relative before:absolute before:inset-0 before:bg-[url('/noise.png')] before:opacity-[0.02] before:pointer-events-none`}>
        {/* Chat Header */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-200/50 bg-white/70 backdrop-blur-xl z-10 shrink-0 sticky top-0 rounded-tr-[2rem]">
          <button
            className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100/80 rounded-xl transition-colors"
            onClick={() => setShowMobileList(true)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          {activeConvData ? (
            <>
              <div className="relative cursor-pointer group">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-[14px] shadow-sm transition-transform duration-300 group-hover:scale-105 ${activeConvData.avatarBg}`}>
                  {activeConvData.avatar}
                </div>
                {activeConvData.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-[2px] border-white shadow-sm" />}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate text-[16px] leading-snug">{activeConvData.name}</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {activeConvData.online && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                  <p className={`text-[13px] truncate ${activeConvData.online ? 'text-emerald-600 font-medium' : 'text-slate-500'}`}>
                    {activeConvData.online ? 'Online now' : 'Offline'}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 min-w-0 font-medium text-slate-500">Select a conversation</div>
          )}

          <div className="flex gap-2 shrink-0">
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-transparent">
          {activeConvData?.thread?.length === 0 || !activeConvData?.thread ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
              <span className="material-symbols-outlined text-[48px] opacity-40" style={{ fontVariationSettings: "'FILL' 1" }}>chat_bubble</span>
              <p className="font-medium text-sm opacity-80">Waiting for the student to reply...</p>
            </div>
          ) : activeConvData.thread.map((msg, index, arr) => {
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
                <div className={`flex gap-3 w-full ${isMe ? 'justify-end' : 'justify-start'} ${isFirstInGroup ? (index === 0 && !showDateDivider ? 'mt-4' : 'mt-6') : 'mt-1'}`}>
                  {!isMe && (
                    <div className="w-8 shrink-0 flex items-end justify-center pb-1">
                      {isLastInGroup && activeConvData && (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shadow-sm ring-2 ring-white ${activeConvData.avatarBg}`}>
                          {activeConvData.avatar}
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`max-w-[75%] sm:max-w-[65%] flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`px-4 py-2.5 relative group min-w-[85px] transition-all duration-200 hover:shadow-md
                        ${isMe 
                          ? 'bg-gradient-to-br from-primary to-purple-600 text-white shadow-[0_4px_12px_rgb(79,70,229,0.2)]' 
                          : 'bg-white text-slate-800 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-slate-100/50'}
                        ${isFirstInGroup && isLastInGroup ? 'rounded-2xl' : ''}
                        ${isFirstInGroup && !isLastInGroup ? (isMe ? 'rounded-t-2xl rounded-bl-2xl rounded-br-sm' : 'rounded-t-2xl rounded-br-2xl rounded-bl-sm') : ''}
                        ${!isFirstInGroup && isLastInGroup ? (isMe ? 'rounded-b-2xl rounded-tl-2xl rounded-tr-sm' : 'rounded-b-2xl rounded-tr-2xl rounded-tl-sm') : ''}
                        ${!isFirstInGroup && !isLastInGroup ? (isMe ? 'rounded-l-2xl rounded-r-sm' : 'rounded-r-2xl rounded-l-sm') : ''}
                      `}
                    >
                      <div className="flex flex-wrap items-end gap-x-4 justify-between">
                        <p className={`text-[14.5px] leading-relaxed break-words ${isMe ? 'font-medium tracking-wide drop-shadow-sm' : ''}`}>{msg.content}</p>
                        <div className={`text-[10px] shrink-0 ml-auto flex items-center gap-1 mt-1 font-semibold ${isMe ? 'text-white/80' : 'text-slate-400'}`}>
                          {msg.time}
                          {isMe && <span className="material-symbols-outlined text-white/90" style={{ fontSize: '14px', fontVariationSettings: "'wght' 600" }}>done_all</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isMe && (
                    <div className="w-8 shrink-0" />
                  )}
                </div>
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 sm:p-6 bg-white/60 backdrop-blur-xl border-t border-slate-200/50 shrink-0 mb-16 md:mb-0 rounded-br-[2rem] z-10">
          <div className="relative group max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center gap-2 sm:gap-3 bg-white border border-slate-200 shadow-sm rounded-full p-2 pl-4 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all duration-300">
              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors rounded-full shrink-0">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>add_circle</span>
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 bg-transparent outline-none text-[15px] text-slate-800 placeholder:text-slate-400 py-2.5 min-w-0"
                disabled={!activeConvData}
              />
              <button className="hidden sm:block p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-full shrink-0 mr-1">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>sentiment_satisfied</span>
              </button>
              <button
                onClick={handleSend}
                disabled={!newMessage.trim() || !activeConvData}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-0.5 active:translate-y-0 shrink-0 disabled:opacity-40 disabled:hover:translate-y-0 disabled:shadow-none group-focus-within:bg-gradient-to-r group-focus-within:from-primary group-focus-within:to-purple-600 group-focus-within:shadow-primary/20"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '18px' }}>send</span>
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2.5 text-center font-medium">Press Enter to send</p>
        </div>
      </div>
    </div>
  );
}
