'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function useScholarshipDetail(params) {
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [resolvedParams, setResolvedParams] = useState(null);
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserUid(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.resolve(params);
        setResolvedParams(res);
        const id = res?.id;
        
        if (id) {
          // If it's a mock number ID, fallback to grabbing the first one for backwards compatibility during migration, 
          // or just fetch by the string ID
          let schData = null;
          
          if (!isNaN(id)) {
            // It's a legacy number ID from the UI mock
            const q = query(collection(db, 'scholarships'));
            const snap = await getDocs(q);
            if (!snap.empty) {
               schData = { id: snap.docs[0].id, ...snap.docs[0].data() };
            }
          } else {
            const docRef = doc(db, 'scholarships', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              schData = { id: docSnap.id, ...docSnap.data() };
            }
          }
          
          if (schData) {
            setScholarship(schData);

            if (userUid) {
              const trackerQ = query(collection(db, 'tracker'), where('userId', '==', userUid), where('scholarshipId', '==', schData.id));
              const trackerSnap = await getDocs(trackerQ);
              if (!trackerSnap.empty) {
                setSaved(true);
              }

              const appQ = query(collection(db, 'applications'), where('studentId', '==', userUid), where('scholarshipId', '==', schData.id));
              const appSnap = await getDocs(appQ);
              if (!appSnap.empty) {
                setApplicationStatus(appSnap.docs[0].data().status);
              }
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (userUid !== undefined) {
       fetchData();
    }
  }, [params, userUid]);

  const handleSaveToTracker = async () => {
    if (!scholarship || saved || !userUid) return;
    
    try {
      await addDoc(collection(db, 'tracker'), {
        userId: userUid,
        scholarshipId: scholarship.id,
        columnId: 'col_interested',
        title: scholarship.name,
        desc: scholarship.desc || 'Saved from Discovery',
        type: scholarship.category || 'Scholarship',
        date: scholarship.deadline,
        amount: scholarship.amount || null,
        createdAt: Date.now()
      });
      setSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    scholarship,
    loading,
    saved,
    applicationStatus,
    resolvedParams,
    handleSaveToTracker,
  };
}
