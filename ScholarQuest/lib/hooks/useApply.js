'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, increment } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { convertToPercentage } from '@/lib/gpaConverter';

export default function useApply(params) {
  const router = useRouter();
  const [scholarship, setScholarship] = useState(null);
  const [user, setUser] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gpa, setGpa] = useState('');
  const [gradingSystem, setGradingSystem] = useState('CGPA');
  const [gpaScale, setGpaScale] = useState('10');
  const [gpaPercentage, setGpaPercentage] = useState('');
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
              setGradingSystem(uData.gradingSystem || 'CGPA');
              setGpaScale(uData.gpaScale || '10');
              setGpaPercentage(uData.gpaPercentage || '');
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
      // --- MATCHING ALGORITHM ---
      let score = 0;
      let maxScore = 0;

      // 1. GPA Match
      if (scholarship.gpa) {
        maxScore += 40;
        const reqGpa = parseFloat(scholarship.gpa);
        const stuGpa = parseFloat(gpa);
        if (!isNaN(reqGpa) && !isNaN(stuGpa)) {
          if (stuGpa >= reqGpa) score += 40;
          else if (stuGpa >= reqGpa - 0.5) score += 20; // Partial match
        }
      }

      // 2. Field of Study Match
      if (scholarship.fieldOfStudy) {
        maxScore += 40;
        const reqField = scholarship.fieldOfStudy.toLowerCase();
        const stuField = (studyField || '').toLowerCase();
        if (stuField && reqField) {
          if (stuField.includes(reqField) || reqField.includes(stuField)) {
            score += 40;
          }
        }
      }

      // 3. Completeness of Profile
      maxScore += 20;
      let completeness = 0;
      if (gpa) completeness += 5;
      if (institution) completeness += 5;
      if (studyField) completeness += 5;
      if (gradDate) completeness += 5;
      score += completeness;

      let finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 85;

      await addDoc(collection(db, 'applications'), {
        studentId: userUid,
        studentName: user?.name || '',
        studentEmail: user?.email || '',
        photoURL: user?.photoURL || null,
        scholarshipId: scholarship.id,
        scholarshipName: scholarship.name,
        providerId: scholarship.providerId || 'legacy',
        amount: scholarship.amount || '',
        gpa: gpa,
        gradingSystem: gradingSystem,
        gpaScale: gpaScale,
        gpaPercentage: convertToPercentage(gpa, gradingSystem, gpaScale),
        institution: institution,
        studyField: studyField,
        gradDate: gradDate,
        honors: honors,
        customResponses: Object.values(customResponses),
        score: finalScore,
        status: 'Pending',
        appliedAt: Date.now()
      });

      const trackerQ = query(
        collection(db, 'tracker'),
        where('userId', '==', userUid),
        where('scholarshipId', '==', scholarship.id)
      );
      const trackerSnap = await getDocs(trackerQ);

      if (!trackerSnap.empty) {
        // Update the existing tracker card to 'col_applied'
        const docId = trackerSnap.docs[0].id;
        await updateDoc(doc(db, 'tracker', docId), {
          columnId: 'col_applied',
          desc: scholarship.desc || 'Application submitted',
          amount: scholarship.amount || null,
          createdAt: Date.now()
        });
        // Just in case there are other duplicate cards, delete them
        for (let i = 1; i < trackerSnap.docs.length; i++) {
          await deleteDoc(doc(db, 'tracker', trackerSnap.docs[i].id));
        }
      } else {
        // Create a new tracker card
        await addDoc(collection(db, 'tracker'), {
          userId: userUid,
          scholarshipId: scholarship.id,
          columnId: 'col_applied',
          title: scholarship.name,
          desc: scholarship.desc || 'Application submitted',
          type: scholarship.category || 'Scholarship',
          date: scholarship.deadline,
          amount: scholarship.amount || null,
          createdAt: Date.now()
        });
      }

      // Increment the applicants counter on the scholarship document
      try {
        await updateDoc(doc(db, 'scholarships', scholarship.id), {
          applicants: increment(1)
        });
      } catch (incErr) {
        console.warn('Could not increment applicants count:', incErr);
      }

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
        amount: scholarship.amount || null,
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
    gradingSystem,
    setGradingSystem,
    gpaScale,
    setGpaScale,
    gpaPercentage,
    setGpaPercentage,
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
