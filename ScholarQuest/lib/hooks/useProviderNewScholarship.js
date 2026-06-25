'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addAdminScholarship, getProviderInfo } from '@/lib/store';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const name = e.target.program_name.value.trim();
    const category = e.target.category.value;
    const amount = e.target.amount.value.trim();
    const deadline = e.target.deadline.value;
    const desc = e.target.description.value.trim();

    if (!name || !amount || !deadline || !desc) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const providerInfo = getProviderInfo() || { organization: 'Sponsor Organization' };

    addAdminScholarship({
      name,
      category,
      amount,
      deadline,
      desc,
      org: providerInfo.organization,
      status: 'Active',
      icon: category === 'STEM' ? 'science' : category === 'Creative' ? 'draw' : category === 'International' ? 'public' : 'school',
      formSections: sections
    });

    setLoading(false);
    router.push('/provider/scholarships');
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
