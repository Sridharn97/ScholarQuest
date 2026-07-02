'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const COLUMN_DEF = [
  { id: 'col_interested', label: 'Interested' },
  { id: 'col_applied', label: 'Applied' },
  { id: 'col_accepted', label: 'Offers' },
  { id: 'col_rejected', label: 'Rejected' },
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
  const [validatedSchols, setValidatedSchols] = useState(new Set());

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
        
        // Group cards by scholarshipId to check for duplicates
        const scholarshipGroups = {};
        docs.forEach(doc => {
          if (doc.scholarshipId) {
            if (!scholarshipGroups[doc.scholarshipId]) {
              scholarshipGroups[doc.scholarshipId] = [];
            }
            scholarshipGroups[doc.scholarshipId].push(doc);
          }
        });

        const cardsToDelete = [];
        
        Object.keys(scholarshipGroups).forEach(schId => {
          const group = scholarshipGroups[schId];
          if (group.length > 1) {
            // Priority: col_accepted (4) > col_rejected (3) > col_applied (2) > col_interested (1)
            const colPriority = {
              'col_accepted': 4,
              'col_rejected': 3,
              'col_applied': 2,
              'col_interested': 1
            };
            group.sort((a, b) => {
              const priorityA = colPriority[a.columnId] || 0;
              const priorityB = colPriority[b.columnId] || 0;
              return priorityB - priorityA; // Descending
            });
            // Keep the first (highest priority), delete the rest
            for (let i = 1; i < group.length; i++) {
              cardsToDelete.push(group[i]);
            }
          }
        });

        // Delete duplicate records from Firestore
        cardsToDelete.forEach(c => {
          deleteDoc(doc(db, 'tracker', c.id)).catch(err => console.error("Deduplication error: ", err));
        });

        // Filter out the deleted cards from local state list
        const filteredDocs = docs.filter(d => !cardsToDelete.some(c => c.id === d.id));
        
        const newCols = COLUMN_DEF.map(c => {
           const colCards = filteredDocs.filter(d => d.columnId === c.id);
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

  useEffect(() => {
    const checkOrphans = async () => {
      const allCards = columns.flatMap(c => c.cards);
      const newValidated = new Set(validatedSchols);
      const toDelete = [];
      let updated = false;

      for (const card of allCards) {
        if (card.scholarshipId && !newValidated.has(card.scholarshipId)) {
          try {
            const schDoc = await getDoc(doc(db, 'scholarships', card.scholarshipId));
            if (!schDoc.exists()) {
              toDelete.push(card.id);
            } else {
              newValidated.add(card.scholarshipId);
              updated = true;
            }
          } catch(e) {}
        }
      }
      
      if (toDelete.length > 0) {
        for (const id of toDelete) {
          try {
            await deleteDoc(doc(db, 'tracker', id));
          } catch(e) {}
        }
      }
      if (updated) {
        setValidatedSchols(newValidated);
      }
    };
    
    if (columns.some(c => c.cards.length > 0)) {
       checkOrphans();
    }
  }, [columns, validatedSchols]);

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
