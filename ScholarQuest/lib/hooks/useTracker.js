'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const COLUMN_DEF = [
  { id: 'col_interested', title: 'Interested' },
  { id: 'col_applied', title: 'Applied' },
  { id: 'col_offers', title: 'Offers' },
  { id: 'col_rejected', title: 'Rejected' },
];

export default function useTracker() {
  const [columns, setColumns] = useState(COLUMN_DEF.map(c => ({ ...c, cards: [] })));
  const [userUid, setUserUid] = useState(null);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    
    if (userUid) {
      const q = query(collection(db, 'tracker'), where('userId', '==', userUid));
      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        
        const newCols = COLUMN_DEF.map(c => {
           const colCards = docs.filter(d => d.columnId === c.id);
           colCards.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
           return { ...c, cards: colCards };
        });
        setColumns(newCols);
      });
    } else {
      setColumns(COLUMN_DEF.map(c => ({ ...c, cards: [] })));
    }
    
    return () => unsubscribeSnapshot();
  }, [userUid]);

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

  const handleAddCard = async () => {
    if (!newCardTitle.trim() || !userUid) return;
    try {
      await addDoc(collection(db, 'tracker'), {
        userId: userUid,
        columnId: addToCol,
        title: newCardTitle.trim(),
        desc: newCardDesc.trim(),
        amount: newCardAmount.trim() || null,
        createdAt: Date.now()
      });
      setNewCardTitle('');
      setNewCardDesc('');
      setNewCardAmount('');
      setShowAddModal(false);
      showToast('Scholarship added to tracker!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleMoveCard = async (cardId, fromColId, toColId) => {
    setShowMoveMenu(null);
    try {
      await updateDoc(doc(db, 'tracker', cardId), { columnId: toColId });
      showToast('Card moved!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteDoc(doc(db, 'tracker', cardId));
      showToast('Card removed.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAcceptOffer = (card) => {
    setActiveDisbursementCard(card);
    setShowDisbursementModal(true);
  };

  const handleCompleteDisbursement = async () => {
    if (!activeDisbursementCard) return;
    
    try {
      await updateDoc(doc(db, 'tracker', activeDisbursementCard.id), { 
        accepted: false,
        funded: true 
      });
      
      setShowDisbursementModal(false);
      setActiveDisbursementCard(null);
      setThankYouNote('');
      showToast('🎉 Setup complete! Funds are on the way.');
    } catch (e) {
      console.error(e);
    }
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
