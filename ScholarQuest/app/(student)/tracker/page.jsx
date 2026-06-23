'use client';
import { useState, useEffect } from 'react';
import { getTracker, saveTracker, addCardToColumn, moveCard, deleteCard, addActivity, updateCard } from '@/lib/store';

export default function TrackerPage() {
  const [columns, setColumns] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToCol, setAddToCol] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [newCardAmount, setNewCardAmount] = useState('');
  const [showMoveMenu, setShowMoveMenu] = useState(null); // { cardId, fromColId }
  const [toast, setToast] = useState('');
  const [showDisbursementModal, setShowDisbursementModal] = useState(false);
  const [activeDisbursementCard, setActiveDisbursementCard] = useState(null);
  const [thankYouNote, setThankYouNote] = useState('');
  const [disbursementMethod, setDisbursementMethod] = useState('direct');

  const load = () => setColumns(getTracker());

  useEffect(() => {
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoveMenu) setShowMoveMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMoveMenu]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    addCardToColumn(addToCol, {
      title: newCardTitle.trim(),
      desc: newCardDesc.trim(),
      amount: newCardAmount.trim() || null,
    });
    setNewCardTitle('');
    setNewCardDesc('');
    setNewCardAmount('');
    setShowAddModal(false);
    showToast('Scholarship added to tracker!');
  };

  const handleMoveCard = (cardId, fromColId, toColId) => {
    moveCard(cardId, fromColId, toColId);
    setShowMoveMenu(null);
    showToast('Card moved!');
  };

  const handleDeleteCard = (cardId) => {
    deleteCard(cardId);
    showToast('Card removed.');
  };

  const handleAcceptOffer = (card, colId) => {
    setActiveDisbursementCard(card);
    setShowDisbursementModal(true);
  };

  const handleCompleteDisbursement = () => {
    if (!activeDisbursementCard) return;
    
    // Mark card as funded
    updateCard(activeDisbursementCard.id, { 
      accepted: false, // Turn off the prompt
      funded: true 
    });
    
    addActivity({ 
      icon: 'account_balance', 
      iconColor: 'text-green-600', 
      title: 'Disbursement Setup Complete', 
      sub: `${activeDisbursementCard.title}`, 
      time: 'Just now' 
    });
    
    setShowDisbursementModal(false);
    setActiveDisbursementCard(null);
    setThankYouNote('');
    showToast('🎉 Setup complete! Funds are on the way.');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background font-sans text-on-surface">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg text-sm flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px' }}>check_circle</span>
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="px-8 py-5 bg-surface border-b border-outline-variant/30 z-10 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-on-surface">
            Applications
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6 text-sm">
             <div className="flex flex-col">
                <span className="text-on-surface-variant font-medium text-xs uppercase tracking-wider mb-0.5">Total</span>
                <span className="font-semibold text-on-surface">{columns.reduce((a,c) => a + c.cards.length, 0)}</span>
             </div>
             <div className="w-px h-8 bg-outline-variant/30" />
             <div className="flex flex-col">
                <span className="text-on-surface-variant font-medium text-xs uppercase tracking-wider mb-0.5">Active</span>
                <span className="font-semibold text-on-surface">{columns.find(c => c.id === 'col_interested')?.cards.length || 0}</span>
             </div>
          </div>
          <button
            onClick={() => { setAddToCol('col_interested'); setShowAddModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            New Application
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 md:p-8 z-10">
        <div className="flex gap-6 h-full pb-4" style={{ minWidth: `${columns.length * 340}px` }}>
          {columns.map((col) => {
            let dotColor = 'bg-outline-variant';
            if (col.id === 'col_interested') dotColor = 'bg-tertiary';
            if (col.id === 'col_applied') dotColor = 'bg-blue-500';
            if (col.id === 'col_review') dotColor = 'bg-primary';
            if (col.id === 'col_accepted') dotColor = 'bg-green-500';
            if (col.id === 'col_rejected') dotColor = 'bg-error';

            return (
            <div key={col.id} className="flex flex-col h-full overflow-hidden" style={{ width: '340px', flexShrink: 0 }}>
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                  <h3 className="text-sm font-medium text-on-surface">{col.label}</h3>
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-xs font-medium border border-outline-variant/20">
                    {col.cards.length}
                  </span>
                </div>
                <button
                  onClick={() => { setAddToCol(col.id); setShowAddModal(true); }}
                  className="w-6 h-6 flex items-center justify-center rounded text-outline-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                </button>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto space-y-3 relative scroll-smooth pr-1 pb-4">
                {col.cards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center border border-dashed border-outline-variant/40 rounded-xl h-24 bg-surface-container-lowest mt-1">
                    <p className="text-xs text-on-surface-variant">No applications</p>
                  </div>
                ) : (
                  col.cards.map((card) => (
                    <div
                      key={card.id}
                      className={`group relative bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/40 shadow-sm hover:border-primary/50 transition-colors ${card.accepted ? 'border-green-200 bg-green-50/30' : ''}`}
                    >
                      {/* Move Button (Hover) */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowMoveMenu({ cardId: card.id, fromColId: col.id }); }}
                          className="w-6 h-6 flex items-center justify-center bg-surface border border-outline-variant/50 text-on-surface-variant hover:text-primary rounded shadow-sm hover:bg-surface-container-low transition-colors"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>more_horiz</span>
                        </button>
                      </div>

                      {/* Type Badge */}
                      {card.type && (
                        <div className="mb-2">
                          <span className="inline-flex px-2.5 py-1 rounded bg-surface-container text-on-surface-variant text-xs font-medium tracking-wide uppercase border border-outline-variant/20">
                            {card.type}
                          </span>
                        </div>
                      )}

                      <h4 className="text-base font-bold text-on-surface leading-snug mb-2 pr-6">{card.title}</h4>
                      
                      {card.amount && !card.accepted && (
                        <div className="text-base font-semibold text-primary mb-3">
                          {card.amount}
                        </div>
                      )}

                      {/* Progress Line */}
                      {card.progress && (
                        <div className="mt-3 mb-1">
                          <div className="flex justify-between items-end mb-1.5">
                            <span className="text-xs text-on-surface-variant font-medium">{card.progressLabel}</span>
                            <span className="text-xs text-on-surface-variant">{card.progress}%</span>
                          </div>
                          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
                            <div className="bg-primary h-full rounded-full" style={{ width: `${card.progress}%` }} />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-outline-variant/20">
                        {/* Urgent */}
                        {card.urgentLabel && (
                          <div className="flex items-center gap-1 text-error">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                            <span className="text-xs font-medium">{card.urgentLabel}</span>
                          </div>
                        )}

                        {/* Date */}
                        {card.date && (
                          <div className="flex items-center gap-1 text-on-surface-variant">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>event</span>
                            <span className="text-xs">{card.date}</span>
                          </div>
                        )}

                        {/* Submitted */}
                        {card.submitted && (
                          <div className="flex items-center gap-1 text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>check</span>
                            <span className="text-xs font-medium">{card.submitted}</span>
                          </div>
                        )}
                      </div>

                      {/* Accepted */}
                      {card.accepted && (
                        <div className="mt-4 pt-3 border-t border-green-100">
                          <p className="text-green-700 font-semibold text-sm mb-2">
                            Offer: {card.amount}
                          </p>
                          <button
                            onClick={() => handleAcceptOffer(card, col.id)}
                            className="w-full py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                          >
                            Accept Offer
                          </button>
                        </div>
                      )}

                      {/* Funded / Disbursement Pending */}
                      {card.funded && (
                        <div className="mt-3 bg-green-50 border border-green-100 rounded p-2">
                          <div className="flex items-center gap-1.5 mb-1">
                             <span className="material-symbols-outlined text-green-600" style={{ fontSize: '16px' }}>check_circle</span>
                            <span className="font-medium text-green-800 text-xs uppercase">Disbursement Pending</span>
                          </div>
                          <p className="text-green-600 text-xs leading-snug">Verification complete. Funds arriving soon.</p>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      {/* Move Card Modal (Clean List) */}
      {showMoveMenu && (
        <div className="fixed inset-0 z-50 bg-on-surface/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowMoveMenu(null)}>
          <div className="bg-surface-container-lowest rounded-xl p-5 w-full max-w-xs shadow-xl border border-outline-variant/30 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-semibold text-on-surface">Move to...</h3>
               <button onClick={() => handleDeleteCard(showMoveMenu.cardId)} className="text-error hover:bg-error/10 p-1 rounded transition-colors" title="Delete Card">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
               </button>
            </div>
            
            <div className="space-y-1">
              {columns.filter(c => {
                if (c.id === showMoveMenu.fromColId) return false;
                const from = showMoveMenu.fromColId;
                const to = c.id;
                
                // Business Logic Restrictions
                if (from === 'col_accepted' && to === 'col_rejected') return false;
                if (from === 'col_rejected' && to === 'col_accepted') return false;
                
                return true;
              }).map(c => (
                <button
                  key={c.id}
                  onClick={() => handleMoveCard(showMoveMenu.cardId, showMoveMenu.fromColId, c.id)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex justify-between items-center"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowAddModal(false)}>
          <div className="bg-surface-container-lowest rounded-2xl p-6 w-full max-w-md shadow-xl border border-outline-variant/30 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-on-surface">New Application</h3>
              <button onClick={() => setShowAddModal(false)} className="text-outline-variant hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">Scholarship Title</label>
                <input
                  autoFocus
                  value={newCardTitle}
                  onChange={e => setNewCardTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddCard()}
                  placeholder="e.g. Google Scholars Award"
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">Description</label>
                <textarea
                  value={newCardDesc}
                  onChange={e => setNewCardDesc(e.target.value)}
                  rows={2}
                  placeholder="Brief description..."
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-on-surface-variant block mb-1">Award Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">$</span>
                  <input
                    value={newCardAmount}
                    onChange={e => setNewCardAmount(e.target.value)}
                    placeholder="10,000"
                    className="w-full pl-7 pr-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-outline-variant/20">
              <button onClick={() => setShowAddModal(false)} className="px-4 py-2 border border-outline-variant/50 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors">
                Cancel
              </button>
              <button onClick={handleAddCard} className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disbursement Setup Modal */}
      {showDisbursementModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setShowDisbursementModal(false)}>
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 w-full max-w-lg shadow-xl border border-outline-variant/30 overflow-y-auto max-h-[90vh] animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-on-surface mb-1">Accept Offer</h3>
              <p className="text-sm text-on-surface-variant">
                Setup disbursement for <strong className="text-on-surface">{activeDisbursementCard?.title}</strong>.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-on-surface mb-1.5 block">1. Thank the Sponsor</label>
                <textarea
                  value={thankYouNote}
                  onChange={e => setThankYouNote(e.target.value)}
                  rows={2}
                  placeholder="Express your gratitude... (Optional)"
                  className="w-full px-3 py-2 bg-surface border border-outline-variant/50 rounded-lg text-sm text-on-surface outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-on-surface mb-1.5 block">2. Disbursement Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setDisbursementMethod('direct')}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${disbursementMethod === 'direct' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/50 text-on-surface-variant hover:border-outline-variant'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>account_balance</span>
                    Direct Deposit
                  </button>
                  <button 
                    onClick={() => setDisbursementMethod('check')}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${disbursementMethod === 'check' ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/50 text-on-surface-variant hover:border-outline-variant'}`}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
                    Mail Check
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-8 pt-5 border-t border-outline-variant/20">
              <button onClick={() => setShowDisbursementModal(false)} className="px-4 py-2 border border-outline-variant/50 rounded-lg text-sm font-medium text-on-surface hover:bg-surface-container-low transition-colors">
                Cancel
              </button>
              <button onClick={handleCompleteDisbursement} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                Submit & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
