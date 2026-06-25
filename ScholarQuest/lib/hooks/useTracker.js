'use client';
import { useState, useEffect } from 'react';
import { getTracker, addCardToColumn, moveCard, deleteCard, addActivity, updateCard } from '@/lib/store';

export default function useTracker() {
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
    Promise.resolve().then(() => {
      load();
    });
    window.addEventListener('sq_update', load);
    return () => window.removeEventListener('sq_update', load);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoveMenu) {
        Promise.resolve().then(() => {
          setShowMoveMenu(null);
        });
      }
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

  const handleAcceptOffer = (card) => {
    setActiveDisbursementCard(card);
    setShowDisbursementModal(true);
  };

  const handleCompleteDisbursement = () => {
    if (!activeDisbursementCard) return;
    
    updateCard(activeDisbursementCard.id, { 
      accepted: false,
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

  return {
    columns,
    showAddModal,
    setShowAddModal,
    addToCol,
    setAddToCol,
    newCardTitle,
    setNewCardTitle,
    newCardDesc,
    setNewCardDesc,
    newCardAmount,
    setNewCardAmount,
    showMoveMenu,
    setShowMoveMenu,
    toast,
    showDisbursementModal,
    setShowDisbursementModal,
    activeDisbursementCard,
    setActiveDisbursementCard,
    thankYouNote,
    setThankYouNote,
    disbursementMethod,
    setDisbursementMethod,
    handleAddCard,
    handleMoveCard,
    handleDeleteCard,
    handleAcceptOffer,
    handleCompleteDisbursement,
  };
}
