'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, getDoc, doc, query, where, getDocs } from 'firebase/firestore';

export default function useProviderNewScholarship() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'General Information',
      questions: [{ id: 2, text: '', type: 'text' }]
    }
  ]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: '', questions: [] }]);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateSectionTitle = (id, title) => {
    setSections(sections.map(s => s.id === id ? { ...s, title } : s));
  };

  const addQuestion = (sectionId) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, questions: [...s.questions, { id: Date.now(), text: '', type: 'text' }] };
      }
      return s;
    }));
  };

  const removeQuestion = (sectionId, questionId) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, questions: s.questions.filter(q => q.id !== questionId) };
      }
      return s;
    }));
  };

  const updateQuestion = (sectionId, questionId, field, value) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          questions: s.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
        };
      }
      return s;
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const name = e.target.program_name.value.trim();
    const category = e.target.category.value;
    const amount = e.target.amount.value.trim();
    const deadline = e.target.deadline.value;
    const desc = e.target.description.value.trim();
    const gpa = e.target.gpa.value.trim();
    const nationality = e.target.nationality.value.trim();
    const targetYear = e.target.target_year.value;
    const fieldOfStudy = e.target.field_of_study.value.trim();
    const requiredDocs = e.target.required_docs.value
      .split('\n')
      .map(d => d.trim())
      .filter(Boolean);

    if (!name || !amount || !deadline || !desc) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const providerInfo = userDoc.exists() ? userDoc.data() : { organization: 'Sponsor Organization' };

      await addDoc(collection(db, 'scholarships'), {
        providerId: user.uid,
        name,
        category,
        amount,
        deadline,
        desc,
        gpa: gpa || null,
        nationality: nationality || null,
        targetYear: targetYear || null,
        fieldOfStudy: fieldOfStudy || null,
        requiredDocs: requiredDocs.length > 0 ? requiredDocs : null,
        org: providerInfo.organization,
        status: 'Active',
        icon: category === 'STEM' ? 'science' : category === 'Creative' ? 'draw' : category === 'International' ? 'public' : 'school',
        formSections: sections,
        applicants: 0,
        createdAt: Date.now()
      });

      // Send a direct message to every student about the new scholarship
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const welcomeMsg = `Hello! We have just posted a new scholarship: "${name}". Check it out and let us know if you have any questions!`;
      
      const studentsQuery = query(collection(db, 'users'), where('role', '==', 'student'));
      const studentsSnapshot = await getDocs(studentsQuery);
      
      const convPromises = studentsSnapshot.docs.map((studentDoc) => {
        const studentData = studentDoc.data();
        return addDoc(collection(db, 'conversations'), {
          studentId: studentDoc.id,
          studentName: studentData.name || `${studentData.firstName} ${studentData.lastName}`,
          providerId: user.uid,
          providerName: providerInfo.name || 'Provider',
          org: providerInfo.organization || 'Sponsor Organization',
          scholarshipName: name,
          lastMessage: welcomeMsg,
          time: timeStr,
          unread: 1,
          providerUnread: 0,
          online: true,
          hiddenForStudent: false,
          hiddenForProvider: false,
          messages: [
            {
              sender: 'provider',
              text: welcomeMsg,
              time: timeStr,
              timestamp: Date.now()
            }
          ],
          createdAt: Date.now()
        });
      });
      await Promise.all(convPromises);

      setLoading(false);
      router.push('/provider/scholarships');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create scholarship.');
      setLoading(false);
    }
  };

  return {
    error,
    setError,
    loading,
    sections,
    addSection,
    removeSection,
    updateSectionTitle,
    addQuestion,
    removeQuestion,
    updateQuestion,
    handleSubmit,
  };
}
