import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Award, Phone, Mail, FileText, Settings, ShieldAlert, Sparkles } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Prevent background scrolling when open
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
    { id: 'rules', label: 'Rules & Format', icon: <Settings className="w-4 h-4" /> },
    { id: 'contacts', label: 'In-Charge Contacts', icon: <Phone className="w-4 h-4" /> },
    { id: 'register', label: 'How to Register', icon: <Sparkles className="w-4 h-4" /> }
  ];

  // Base glowing glass class (no category specific colors)
  const getCategoryGlowClass = (dbCat) => {
    return '';
  };

  const glowClass = getCategoryGlowClass(event.category);

  // Clean guidelines: filter out eligibility, contact info, and registration details
  const filteredGuidelines = event.guidelines ? event.guidelines.filter(guide => {
    const l = guide.toLowerCase();
    return !(
      l.includes('eligibility:') ||
      l.includes('coordinator') ||
      l.includes('contact:') ||
      l.includes('register now')
    );
  }) : [];

  const price = event.type === 'Individual' ? 300 : 750;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal Container: glowing-glass layout with inner-rim */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className={`relative glowing-glass ${glowClass} w-full max-w-3xl p-6 md:p-8 overflow-hidden flex flex-col max-h-[85vh] shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-xl`}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        <div className="inner-rim" />

        {/* Modal Header */}
        <div className="mb-6 relative z-10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white border border-[#00f3ff]/40 px-2 py-0.5 rounded bg-[#00f3ff]/10">
                {event.category}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded border border-cyan-500/40 text-white bg-cyan-500/10">
                {event.type} Event
              </span>
            </div>
            <h2 className="font-cinzel text-xl md:text-3xl font-bold text-white leading-snug">
              {event.name}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-[#00f3ff] rounded-full hover:bg-white/10 transition-colors focus:outline-none shrink-0 mt-[-0.5rem] mr-[-0.5rem]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stateful Tabs Navigation */}
        <div className="flex flex-wrap border-b border-white/15 mb-8 gap-2 font-mono text-xs relative z-10">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2.5 px-3 border-b-2 transition-all focus:outline-none ${isActive
                    ? 'border-[#00f3ff] text-white font-bold bg-transparent'
                    : 'border-transparent text-white hover:text-white hover:bg-white/[0.02]'
                  }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display Area */}
        <div className="flex-grow overflow-y-auto min-h-0 pr-2 mb-8 custom-scrollbar text-sm md:text-base leading-loose text-white tracking-wide relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* 1. OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {event.image && (
                    <div className="w-full rounded-lg overflow-hidden border border-white/10 mb-4 flex justify-center bg-white/[0.02]">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-auto max-h-80 object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-cinzel text-[#fff] font-bold mb-2">About the Event</h4>
                    <p className="font-raleway text-sm text-white whitespace-pre-line leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="rounded-lg border border-white/5 p-4 bg-white/[0.01] flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-[#06b6d4] mt-0.5" />
                      <div>
                        <span className="text-[10px] text-white uppercase tracking-wide block font-mono">Eligibility Criteria</span>
                        <span className="font-raleway text-xs font-semibold text-white">{event.eligibility}</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/5 p-4 bg-white/[0.01] flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-[#06b6d4] mt-0.5" />
                      <div>
                        <span className="text-[10px] text-white uppercase tracking-wide block font-mono">Competition Date</span>
                        <span className="font-raleway text-xs font-semibold text-white">14 August 2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. RULES & GUIDELINES TAB */}
              {activeTab === 'rules' && (
                <div className="space-y-4">
                  <h4 className="font-cinzel text-white font-bold mb-4 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#06b6d4]" /> Detailed Rules
                  </h4>
                  {filteredGuidelines.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-4 text-sm md:text-base text-white">
                      {filteredGuidelines.map((g, i) => (
                        <li key={i} className="leading-relaxed">{g}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6 text-white font-mono text-xs italic">
                      Refer to general instructions for guidelines on this event.
                    </div>
                  )}
                </div>
              )}

              {/* 3. CONTACT TAB */}
              {activeTab === 'contacts' && (
                <div className="space-y-5">
                  <div>
                    <h4 className="font-cinzel text-[#fff] font-bold mb-2">Teacher In-Charge Coordinator</h4>
                    <p className="font-raleway text-xs text-white leading-relaxed mb-4">
                      Please reach out directly to the following coordinator for inquiries regarding rules, format, or timing schedules of this competition.
                    </p>
                  </div>

                  <div className="rounded-lg border border-cyan-500/10 p-5 bg-white/[0.02] space-y-4 text-xs font-mono">
                    <div className="flex items-center space-x-3 border-b border-white/5 pb-2">
                      <span className="text-white w-24">Coordinator:</span>
                      <span className="text-white font-semibold">{event.coordinator.name}</span>
                    </div>

                    {event.coordinator.phone !== 'Not Specified' && (
                      <div className="flex items-center space-x-3 border-b border-white/5 pb-2">
                        <span className="text-white w-24">Phone:</span>
                        <a
                          href={`tel:${event.coordinator.phone}`}
                          className="text-[#06b6d4] hover:underline font-semibold"
                        >
                          {event.coordinator.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-[#06b6d4]/5 border border-[#06b6d4]/10 rounded text-[11px] text-white flex gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-[#06b6d4] shrink-0 mt-0.5" />
                    <span>Please respect communication timings. Call coordinators only between <strong>3:00 PM - 5:00 PM</strong>.</span>
                  </div>
                </div>
              )}

              {/* 4. REGISTER TAB */}
              {activeTab === 'register' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-cinzel text-white font-bold">Challan Summary</h4>
                    <p className="font-raleway text-xs text-white">
                      You can register your students or teams by completing the payment for this event and submitting details.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border border-white/10 rounded-lg p-4 font-mono text-xs">
                    <div className="border-r border-white/10 pr-2">
                      <span className="text-white uppercase block text-[9px] mb-1">Registration Type</span>
                      <span className="text-white font-semibold">{event.type} Event</span>
                    </div>
                    <div>
                      <span className="text-white uppercase block text-[9px] mb-1">Fee Amount</span>
                      <span className="text-[#06b6d4] font-bold text-sm">₹{price}/-</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-cinzel text-xs font-semibold text-white">Payment Checklist:</h5>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-white">
                      <li>Pay ₹{price} online using Canara Bank payment details in the registration section.</li>
                      <li>Launch the official registration link and fill out the event submission form.</li>
                      <li>Mail a Bonafide letter containing names and payment receipt screenshot to the organizers.</li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-end border-t border-white/10 pt-6 mt-auto relative z-10">
          <button
            onClick={onClose}
            className="w-full sm:w-auto font-cinzel text-xs font-semibold tracking-wider text-white hover:text-white transition-colors py-2.5 px-6 hover:bg-white/5 rounded"
          >
            CLOSE DETAILS
          </button>
        </div>
      </motion.div>
    </div>
  );
}
