'use client';
import { useState } from 'react';
import Link from 'next/link';

const columns = [
  {
    id: 'interested', label: 'Interested', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { type: 'Full-Ride', title: 'National Merit Scholar Program', desc: 'Academic excellence award for undergraduates.', urgent: true, urgentLabel: '5 Days Left' },
      { type: 'STEM', title: 'Boeing Future Leaders Grant', desc: 'Engineering and aviation focus.', date: 'Oct 24, 2024' },
    ],
  },
  {
    id: 'preparing', label: 'Preparing', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { type: '98% Match', title: 'Rhodes Trust Global Fellowship', progress: 70, progressLabel: 'Personal Statement: 70% complete' },
    ],
  },
  {
    id: 'applied', label: 'Applied', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { title: 'Google Generations Grant', submitted: 'Submitted Sep 12' },
    ],
  },
  {
    id: 'review', label: 'Under Review', color: 'text-on-surface', badgeBg: 'bg-surface-container-highest text-on-surface-variant',
    cards: [
      { title: 'Coca-Cola First Gen Award', desc: 'Reviewing transcripts and essays.', reviewers: ['JD', 'MK'], borderLeft: 'border-l-4 border-l-primary' },
    ],
  },
  {
    id: 'accepted', label: 'Accepted', color: 'text-green-700', badgeBg: 'bg-green-100 text-green-700',
    cards: [
      { title: 'The Gates Scholarship', amount: '$40,000 /yr', accepted: true },
    ],
  },
  {
    id: 'rejected', label: 'Rejected', color: 'text-error', badgeBg: 'bg-error-container text-on-error-container', empty: true,
    cards: [],
  },
];

export default function TrackerPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-surface-container-low">
      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-gutter">
        <div className="flex gap-6 h-full pb-4">
          {columns.map((col) => (
            <div key={col.id} className="kanban-column flex flex-col h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-label-md text-label-md uppercase tracking-wider ${col.color}`}>{col.label}</h3>
                  <span className={`${col.badgeBg} px-2 py-0.5 rounded-full text-[10px] font-bold`}>{col.cards.length}</span>
                </div>
                <button className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {col.empty ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-2xl h-40 bg-surface/50">
                    <span className="material-symbols-outlined text-outline-variant" style={{ fontSize: '48px' }}>folder_off</span>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">Empty for now</p>
                  </div>
                ) : (
                  col.cards.map((card, i) => (
                    <div key={i} className={`glass-card p-4 rounded-10 shadow-sm border border-outline-variant/30 hover:shadow-md transition-all drag-handle cursor-grab ${card.borderLeft || ''} ${card.accepted ? 'bg-green-50/50 border-green-200' : ''}`}>
                      {/* Type Badge */}
                      {card.type && (
                        <div className="mb-2">
                          <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
                            {card.type}
                          </span>
                        </div>
                      )}

                      <h4 className="font-headline-md text-[16px] leading-tight text-on-surface mb-1">{card.title}</h4>

                      {card.desc && <p className="text-on-surface-variant font-body-sm text-body-sm mb-4">{card.desc}</p>}

                      {/* Progress */}
                      {card.progress && (
                        <div>
                          <div className="w-full bg-surface-container h-1.5 rounded-full mt-4 mb-1">
                            <div className="bg-secondary h-full rounded-full" style={{ width: `${card.progress}%` }} />
                          </div>
                          <p className="text-[11px] text-on-surface-variant font-medium">{card.progressLabel}</p>
                        </div>
                      )}

                      {/* Urgent */}
                      {card.urgentLabel && (
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <div className="flex items-center gap-1 text-tertiary">
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>timer</span>
                            <span className="text-[11px] font-bold uppercase">{card.urgentLabel}</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-secondary-container/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '14px', fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                          </div>
                        </div>
                      )}

                      {/* Date */}
                      {card.date && (
                        <div className="flex items-center gap-1 text-on-surface-variant mt-2">
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span>
                          <span className="text-[11px] font-semibold">{card.date}</span>
                        </div>
                      )}

                      {/* Submitted */}
                      {card.submitted && (
                        <div className="flex items-center gap-1.5 mt-4">
                          <span className="material-symbols-outlined text-primary" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span className="text-[11px] font-bold text-primary uppercase">{card.submitted}</span>
                        </div>
                      )}

                      {/* Reviewers */}
                      {card.reviewers && (
                        <div className="flex -space-x-2 mt-4">
                          {card.reviewers.map((r) => (
                            <div key={r} className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-highest flex items-center justify-center text-[8px] font-bold">{r}</div>
                          ))}
                        </div>
                      )}

                      {/* Accepted */}
                      {card.accepted && (
                        <>
                          <p className="text-green-800 font-bold text-[18px] mb-4">{card.amount}</p>
                          <button className="w-full py-2 bg-green-600 text-white font-label-md text-[12px] rounded-6 hover:bg-green-700 transition-colors uppercase tracking-widest">
                            Accept Offer
                          </button>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
