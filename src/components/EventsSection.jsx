import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, BookOpen, Cpu, Palette, Globe, ArrowRight, ShieldAlert, Sparkle } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import EventModal from './EventModal';
import FloatingWrapper from './FloatingWrapper';

export default function EventsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [activeEvent, setActiveEvent] = useState(null);

  // Category list
  const categories = [
    'All',
    'Languages & Lit',
    'Science & Math',
    'Arts & Media',
    'Humanities & Business'
  ];

  // Map individual categories from database into general groups
  const mapDbCategoryToGroup = (dbCat) => {
    const cat = dbCat.toLowerCase();
    if (cat.includes('literature') || cat.includes('language') || cat.includes('natak') || cat.includes('skit')) {
      return 'Languages & Lit';
    }
    if (cat.includes('science') || cat.includes('math') || cat.includes('computer') || cat.includes('coding')) {
      return 'Science & Math';
    }
    if (cat.includes('art') || cat.includes('music') || cat.includes('dance') || cat.includes('media') || cat.includes('fashion') || cat.includes('mime') || cat.includes('cooking')) {
      return 'Arts & Media';
    }
    return 'Humanities & Business';
  };

  // Get specific styles based on category group
  const getCategoryStyles = (groupName) => {
    let icon;
    switch (groupName) {
      case 'Languages & Lit':
        icon = <BookOpen className="w-5 h-5 text-cyan-400" />;
        break;
      case 'Science & Math':
        icon = <Cpu className="w-5 h-5 text-cyan-400" />;
        break;
      case 'Arts & Media':
        icon = <Palette className="w-5 h-5 text-cyan-400" />;
        break;
      default:
        icon = <Globe className="w-5 h-5 text-cyan-400" />;
        break;
    }
    return {
      glowClass: '', // Uses base glowing-glass
      badgeBg: 'border-cyan-500/40 text-white font-semibold bg-cyan-500/20',
      icon
    };
  };

  // Filter events
  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const mappedGroup = mapDbCategoryToGroup(event.category);
    const matchesCategory = selectedCategory === 'All' || mappedGroup === selectedCategory;

    const matchesGrade = selectedGrade === 'All' || 
      (selectedGrade === 'VI-VIII' && event.eligibility.includes('VI') && event.eligibility.includes('VIII')) ||
      (selectedGrade === 'IX-XII' && (event.eligibility.includes('IX') || event.eligibility.includes('XII')));

    return matchesSearch && matchesCategory && matchesGrade;
  });

  return (
    <section id="events" className="relative py-24 min-h-screen">
      
      {/* Decorative top border overlay */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/20 to-transparent" />

      <div className="container-width relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00f3ff] flex items-center justify-center gap-2">
            <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            Event Directory
            <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-cinzel tracking-wider">
            Explore Competitions
          </h2>
          <p className="font-garamond italic text-[#e0ffff]/60 text-sm md:text-base max-w-xl mx-auto">
            Choose from 25 disciplines spanning creative writing, languages, robotics, law, performing arts, and design.
          </p>
          <div className="w-16 h-[1.5px] bg-[#00f3ff] mx-auto mt-4" />
        </div>

        {/* Filters Controls Dashboard: glowing-glass card */}
        <div className="rounded-[1.25rem] glowing-glass p-8 shadow-lg border border-cyan-500/10 mb-16 relative overflow-hidden">
          <div className="inner-rim" />
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
            <div className="absolute top-0 left-6 w-20 h-[1.5px] bg-[#00f3ff]/30" />
            
            {/* Search Box */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e0ffff]/40" />
              <input
                type="text"
                placeholder="Search events (e.g. debate, coding...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#050505] border border-cyan-500/15 hover:border-cyan-500/30 focus:border-[#00f3ff] focus:outline-none rounded-md py-3 pl-11 pr-4 font-raleway text-sm text-[#e0ffff] transition-colors placeholder:text-[#e0ffff]/35 shadow-inner"
              />
            </div>

            {/* Grade Eligibility Filter */}
            <div className="flex items-center space-x-3 w-full lg:w-auto justify-end">
              <Filter className="w-4 h-4 text-[#00f3ff] shrink-0" />
              <span className="font-mono text-xs text-[#e0ffff]/60 uppercase whitespace-nowrap shrink-0">Grade:</span>
              <div className="flex flex-wrap gap-2 justify-end">
                {['All', 'VI-VIII', 'IX-XII'].map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-4 py-1.5 rounded text-xs font-mono border transition-all ${
                      selectedGrade === grade
                        ? 'border-[#00f3ff] bg-[#00f3ff] text-[#050505] font-bold'
                        : 'border-[#e0ffff]/10 hover:border-[#00f3ff]/40 text-[#e0ffff]/60 hover:text-[#e0ffff]'
                    }`}
                  >
                    {grade === 'All' ? 'All Grades' : `Grades ${grade}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-cinzel text-xs tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-[#06b6d4] text-[#050505] font-bold shadow-[0_4px_15px_rgba(6,182,212,0.4)] scale-[1.02] border border-[#e0ffff]'
                  : 'bg-white/[0.02] border border-cyan-500/10 text-[#e0ffff]/75 hover:text-[#fff] hover:border-cyan-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence>
            {filteredEvents.map((event) => {
              const mappedGroup = mapDbCategoryToGroup(event.category);
              const { glowClass, badgeBg, icon } = getCategoryStyles(mappedGroup);

              return (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActiveEvent(event)}
                  className="h-full"
                >
                  {/* Glowing Glass card with 3D Float */}
                  <FloatingWrapper className={`rounded-[1.5rem] glowing-glass p-8 flex flex-col cursor-pointer h-full group relative overflow-hidden ${glowClass}`}>
                    <div className="inner-rim" />
                    
                    {/* Decorative background grid visual inside card */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                    {/* Header Row: Category Icon & Eligibility Badge */}
                    <div className="flex justify-between items-center mb-5 relative z-10">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        {icon}
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${badgeBg}`}>
                        {event.type}
                      </span>
                    </div>

                    {/* Event Name */}
                    <h3 className="font-cinzel text-lg font-bold text-[#fff] group-hover:text-[#00f3ff] transition-colors mb-3 leading-snug relative z-10">
                      {event.name}
                    </h3>

                    {/* Stats Row */}
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-[#e0ffff]/50 mb-4 relative z-10">
                      <Calendar className="w-3.5 h-3.5 text-[#06b6d4]/70" />
                      <span>Eligibility: <strong>{event.eligibility}</strong></span>
                    </div>

                    {/* Excerpt */}
                    <p className="font-raleway text-sm text-[#e0ffff]/65 leading-relaxed line-clamp-3 mb-6 flex-grow relative z-10">
                      {event.description}
                    </p>

                    {/* Divider line in card */}
                    <div className="w-full h-[1px] bg-white/5 my-2 relative z-10" />

                    {/* View Details CTA */}
                    <div className="flex items-center text-[#06b6d4]/80 group-hover:text-[#00f3ff] font-cinzel text-xs font-semibold tracking-wider pt-2 mt-auto group-hover:gap-1.5 transition-all relative z-10">
                      <span>VIEW EVENT TABS</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </FloatingWrapper>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 rounded-[1.5rem] glowing-glass max-w-xl mx-auto overflow-hidden"
          >
            <div className="inner-rim" />
            <div className="relative p-8">
              <ShieldAlert className="w-12 h-12 text-[#00f3ff]/40 mx-auto mb-4" />
              <p className="font-cinzel text-lg text-[#e0ffff]/75">No events found matching current criteria</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedGrade('All'); }}
                className="mt-4 font-mono text-xs text-[#00f3ff] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeEvent && (
          <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
