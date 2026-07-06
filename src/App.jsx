import React from 'react';
import { Sparkle } from 'lucide-react';
import SpaceBackground from './components/SpaceBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventsSection from './components/EventsSection';
import Registration from './components/Registration';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-x-hidden">
      {/* Immersive Space Canvas Background */}
      <SpaceBackground />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Cinematic Hero Slider/Countdown */}
        <Hero />

        {/* Sparkle Divider */}
        <div className="sparkle-divider container-width">
          <Sparkle className="sparkle-divider-icon w-4 h-4 animate-pulse" />
        </div>

        {/* Welcome message & guidelines */}
        <About />

        {/* Sparkle Divider */}
        <div className="sparkle-divider container-width">
          <Sparkle className="sparkle-divider-icon w-4 h-4 animate-pulse" />
        </div>

        {/* Categories, Search & Filter Event Cards */}
        <EventsSection />

        {/* Sparkle Divider */}
        <div className="sparkle-divider container-width">
          <Sparkle className="sparkle-divider-icon w-4 h-4 animate-pulse" />
        </div>

        {/* Registration checklist & bank information */}
        <Registration />
      </main>

      {/* Location Map, Phone Contact lists & copyright */}
      <Footer />
    </div>
  );
}
