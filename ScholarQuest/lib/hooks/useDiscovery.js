'use client';
import { useState, useEffect } from 'react';
import { getAdminScholarships, ensureDefaults } from '@/lib/store';

export default function useDiscovery() {
  const [scholarships, setScholarships] = useState([]);
  const [selectedTags, setSelectedTags] = useState(['Full-Ride']);
  const [searchQuery, setSearchQuery] = useState('');
  const [amountFilter, setAmountFilter] = useState(5000);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    ensureDefaults();
    const list = getAdminScholarships().filter(s => s.status === 'Active');
    Promise.resolve().then(() => {
      setScholarships(list);
    });
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
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featured = filteredScholarships[0] || { 
    id: 1, 
    name: 'Global Tech Innovators Fund', 
    category: 'STEM', 
    amount: '$25,000', 
    deadline: '2026-10-15', 
    org: 'Global Tech Foundation', 
    match: '98%' 
  };
  
  const allScholarships = [featured, ...(filteredScholarships.length > 1 ? filteredScholarships.slice(1) : [])];

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
