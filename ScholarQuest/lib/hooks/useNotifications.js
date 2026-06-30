'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribeSnapshot = () => {};
    
    if (userUid) {
      const q = query(
        collection(db, 'notifications'), 
        where('userId', '==', userUid),
      );
      
      unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
        let unread = 0;
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          if (!d.read) unread++;
          return { id: doc.id, ...d };
        });
        
        // Sort client-side to avoid needing a composite index in Firestore for just one field
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setNotifications(data);
        setUnreadCount(unread);
      });
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
    
    return () => unsubscribeSnapshot();
  }, [userUid]);

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch(e) {
      console.error("Error marking notification as read", e);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter(n => !n.read);
      for (const n of unreadNotifs) {
        await updateDoc(doc(db, 'notifications', n.id), { read: true });
      }
    } catch(e) {
      console.error("Error marking all as read", e);
    }
  };

  return { notifications, unreadCount, markAsRead, markAllAsRead };
}
