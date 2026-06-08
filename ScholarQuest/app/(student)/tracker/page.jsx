'use client';
import { useState, useEffect } from 'react';
import { getTracker, saveTracker, addCardToColumn, moveCard, deleteCard, addActivity } from '@/lib/store';

export default function TrackerPage() {
  const [columns, setColumns] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addToCol, setAddToCol] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDesc, setNewCardDesc] = useState('');
  const [newCardAmount, setNewCardAmount] = useState('');
  const [showMoveMenu, setShowMoveMenu] = useState(null); // { cardId, fromColId }
  const [toast, setToast] = useState('');

  const load = () => setColumns(getTracker());

  useEffect(() => {
    load();
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

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
    addActivity({ icon: 'celebration', iconColor: 'text-green-600', title: 'Offer Accepted!', sub: `${card.title} — ${card.amount}`, time: 'Just now' });
    showToast(`🎉 Congratulations! Offer accepted for ${card.title}!`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-container-low">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-on-surface text-surface px-5 py-3 rounded-2xl shadow-xl font-label-md animate-subtle-float">
          {toast}
        </div>
      )}

      {/* Add Card Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-40 bg-black/40 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-headline-md text-headline-md mb-6">Add Scholarship</h3>
            <div className="space-y-4">
              <div>
                <label className="font-label-md text-on-surface mb-1 block">Scholarship Title *</label>
                <input
                  autoFocus
                  value={newCardTitle}
                  onChange={e => setNewCardTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddCard()}
                  placeholder="e.g. Google Scholars Award"
                  className="w-full px-4 py-3 border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </div>
              <div>
                <label className="font-label-md text-on-surface mb-1 block">Description</label>
                <textarea
                  value={newCardDesc}
                  onChange={e => setNewCardDesc(e.target.value)}
                  rows={2}
                  placeholder="Brief description..."
                  className="w-full px-4 py-3 border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25 resize-none"
                />
              </div>
              <div>
                <label className="font-label-md text-on-surface mb-1 block">Award Amount</label>
                <input
                  value={newCardAmount}
                  onChange={e => setNewCardAmount(e.target.value)}
                  placeholder="e.g. $10,000"
                  className="w-full px-4 py-3 border border-outline-variant rounded-10 font-body-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleAddCard} className="flex-1 py-3 bg-primary text-white rounded-10 font-label-md hover:opacity-90 transition-all active:scale-95">
                Add to Tracker
              </button>
              <button onClick={() => setShowAddModal(false)} className="px-6 py-3 border border-outline-variant rounded-10 font-label-md text-on-surface hover:bg-surface-container-low transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-gutter">
        <div className="flex gap-6 h-full pb-4" style={{ minWidth: `${columns.length * 280}px` }}>
          {columns.map((col) => (
            <div key={col.id} className="kanban-column flex flex-col" style={{ width: '260px', flexShrink: 0 }}>
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-label-md text-label-md uppercase tracking-wider ${col.color}`}>{col.label}</h3>
                  <span className={`${col.badgeBg} px-2 py-0.5 rounded-full text-[10px] font-bold`}>{col.cards.length}</span>
                </div>
                <button
                  onClick={() => { setAddToCol(col.id); setShowAddModal(true); }}
                  className="text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {col.cards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-2xl h-40 bg-surface/50">
                    <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '48px' }}>folder_off</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Empty for now</p>
                    <button
                      onClick={() => { setAddToCol(col.id); setShowAddModal(true); }}
                      className="mt-2 text-primary font-label-sm hover:underline"
                    >
                      + Add one
                    </button>
                  </div>
                ) : (
                  col.cards.map((card) => (
                    <div
                      key={card.id}
                      className={`glass-card p-4 rounded-10 shadow-sm border border-outline-variant/30 hover:shadow-md transition-all relative ${card.borderLeft || ''} ${card.accepted ? 'bg-green-50/50 border-green-200' : ''}`}
                    >
                      {/* Card Menu */}
                      <div className="absolute top-2 right-2 flex gap-1">
                        <div className="relative">
                          <button
                            onClick={() => setShowMoveMenu(showMoveMenu?.cardId === card.id ? null : { cardId: card.id, fromColId: col.id })}
                            className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-primary rounded"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>swap_horiz</span>
                          </button>
                          {showMoveMenu?.cardId === card.id && (
                            <div className="absolute right-0 top-7 z-20 bg-white border border-outline-variant/30 rounded-2xl shadow-xl p-2 w-44">
                              <p className="font-label-sm text-on-surface-variant px-2 pb-1 uppercase tracking-wider" style={{ fontSize: '10px' }}>Move to</p>
                              {columns.filter(c => c.id !== col.id).map(c => (
                                <button
                                  key={c.id}
                                  onClick={() => handleMoveCard(card.id, col.id, c.id)}
                                  className="block w-full text-left px-3 py-2 rounded-6 font-label-sm text-on-surface hover:bg-surface-container-low transition-colors"
                                >
                                  {c.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="w-6 h-6 flex items-center justify-center text-on-surface-variant hover:text-error rounded"
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                        </button>
                      </div>

                      {/* Type Badge */}
                      {card.type && (
                        <div className="mb-2">
                          <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
                            {card.type}
                          </span>
                        </div>
                      )}

                      <h4 className="font-headline-md text-[15px] leading-tight text-on-surface mb-1 pr-12">{card.title}</h4>
                      {card.desc && <p className="text-on-surface-variant font-body-sm text-body-sm mb-3">{card.desc}</p>}

                      {/* Amount */}
                      {card.amount && !card.accepted && (
                        <p className="font-bold text-primary text-[14px] mb-2">{card.amount}</p>
                      )}

                      {/* Progress */}
                      {card.progress && (
                        <div>
                          <div className="w-full bg-surface-container h-1.5 rounded-full mt-4 mb-1">
                            <div className="bg-secondary h-full rounded-full" style={{ width: `${card.progress}%` }} />
                          </div>
                          <p className="text-[11px] text-on-surface-variant font-medium">{card.progressLabel}</p>
                        </div>
                      )}

                      {/* Urgent */}
                      {card.urgentLabel && (
                        <div className="flex items-center gap-1 mt-2 text-tertiary">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>timer</span>
                          <span className="text-[11px] font-bold uppercase">{card.urgentLabel}</span>
                        </div>
                      )}

                      {/* Date */}
                      {card.date && (
                        <div className="flex items-center gap-1 text-on-surface-variant mt-2">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                          <span className="text-[11px] font-semibold">{card.date}</span>
                        </div>
                      )}

                      {/* Submitted */}
                      {card.submitted && (
                        <div className="flex items-center gap-1.5 mt-3">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="text-[11px] font-bold text-primary uppercase">{card.submitted}</span>
                        </div>
                      )}

                      {/* Reviewers */}
                      {card.reviewers && (
                        <div className="flex -space-x-2 mt-3">
                          {card.reviewers.map((r) => (
                            <div key={r} className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[8px] font-bold">{r}</div>
                          ))}
                        </div>
                      )}

                      {/* Accepted */}
                      {card.accepted && (
                        <>
                          <p className="text-green-800 font-bold text-[18px] mb-3">{card.amount}</p>
                          <button
                            onClick={() => handleAcceptOffer(card, col.id)}
                            className="w-full py-2 bg-green-600 text-white font-label-md text-[12px] rounded-6 hover:bg-green-700 transition-colors uppercase tracking-widest"
                          >
                            🎉 Accept Offer
                          </button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Click outside to close move menu */}
      {showMoveMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowMoveMenu(null)} />
      )}
    </div>
  );
}
