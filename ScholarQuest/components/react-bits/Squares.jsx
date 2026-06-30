'use client';
import React from 'react';

export default function Squares({ className = '' }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated grid pattern using pure CSS for robustness */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 animate-subtle-float" />
    </div>
  );
}
