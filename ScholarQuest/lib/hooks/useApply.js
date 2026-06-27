'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function useApply(params) {
  const router = useRouter();
  const [scholarship, setScholarship] = useState(null);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState('');
  const [institution, setInstitution] = useState('');
  const [studyField, setStudyField] = useState('');
  const [gradDate, setGradDate] = useState('2026-06-15');
  const [honors, setHonors] = useState('');
  const [toast, setToast] = useState('');
  const [customResponses, setCustomResponses] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUserUid(u ? u.uid : null);
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
          let schData = null;
          if (!isNaN(id)) {
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
          }
          
          if (userUid && schData) {
            const userDoc = await getDoc(doc(db, 'users', userUid));
            if (userDoc.exists()) {
              const uData = userDoc.data();
              setUser(uData);
              setGpa(uData.gpa || '');
              setInstitution(uData.institution || '');
              setStudyField(uData.studyField || '');
            }

            const appQ = query(collection(db, 'applications'), where('studentId', '==', userUid), where('scholarshipId', '==', schData.id));
            const appSnap = await getDocs(appQ);
            if (!appSnap.empty) {
              setHasApplied(true);
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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!scholarship || !userUid || hasApplied) return;

    try {
      await addDoc(collection(db, 'applications'), {
        studentId: userUid,
        studentName: user?.name || '',
        studentEmail: user?.email || '',
        scholarshipId: scholarship.id,
        scholarshipName: scholarship.name,
        providerId: scholarship.providerId || 'legacy',
        gpa: gpa,
        institution: institution,
        studyField: studyField,
        gradDate: gradDate,
        honors: honors,
        customResponses: Object.values(customResponses),
        status: 'Pending',
        appliedAt: Date.now()
      });

      await addDoc(collection(db, 'tracker'), {
        userId: userUid,
        scholarshipId: scholarship.id,
        columnId: 'col_applied',
        title: scholarship.name,
        desc: scholarship.desc || 'Application submitted',
        type: scholarship.category || 'Scholarship',
        date: scholarship.deadline,
        createdAt: Date.now()
      });

      showToast('Application Submitted Successfully!');
      setTimeout(() => {
        router.push('/tracker');
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveForLater = async () => {
    if (!scholarship || !userUid) return;
    try {
      await addDoc(collection(db, 'tracker'), {
        userId: userUid,
        scholarshipId: scholarship.id,
        columnId: 'col_interested',
        title: scholarship.name,
        desc: scholarship.desc || 'Saved during application',
        type: scholarship.category || 'Scholarship',
        date: scholarship.deadline,
        createdAt: Date.now()
      });
      showToast('Application Saved to Tracker!');
      setTimeout(() => {
        router.push('/tracker');
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    scholarship,
    user,
    loading,
    gpa,
    setGpa,
    institution,
    setInstitution,
    studyField,
    setStudyField,
    gradDate,
    setGradDate,
    honors,
    setHonors,
    toast,
    customResponses,
    setCustomResponses,
    hasApplied,
    resolvedParams,
    handleSubmit,
    handleSaveForLater,
  };
}
