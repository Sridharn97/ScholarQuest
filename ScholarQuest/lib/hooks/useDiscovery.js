'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function useDiscovery() {
  const [scholarships, setScholarships] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['Full-Ride']);
  const [searchQuery, setSearchQuery] = useState('');
  const [amountFilter, setAmountFilter] = useState(5000);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchScholarships = async () => {
      const q = query(collection(db, 'scholarships'), where('status', '==', 'Active'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScholarships(list);
    };
    fetchScholarships();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    Promise.resolve().then(() => {
      setCurrentPage(1);
    });
  }, [searchQuery, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredScholarships = scholarships.filter(s => 
    s.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.org?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = filteredScholarships.length > 0 ? filteredScholarships[0] : null;
  const allScholarships = filteredScholarships;

  // Pagination Logic
  const totalPages = Math.ceil(allScholarships.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allScholarships.slice(indexOfFirstItem, indexOfLastItem);

  return {
    scholarships,
    selectedTags,
    searchQuery,
    setSearchQuery,
    amountFilter,
    setAmountFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems,
    allScholarships,
    toggleTag,
    indexOfFirstItem,
  };
}
