import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import dpsLogo from '../assets/dps_logo.png';

export default function Hero() {
  const targetDate = new Date('2026-08-14T08:30:00+05:30'); // Dynamic countdown to August 14th (2026) IST
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const timerItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 md:pt-24 overflow-hidden"
    >
      {/* Space Background radial gradient glow (complements SpaceBackground canvas) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

      <div className="container-width flex flex-col items-center justify-center text-center relative z-10 py-12">
        {/* DPS Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 relative"
        >
          <img 
            src={dpsLogo} 
            alt="DPS Bangalore E-City Logo" 
            className="h-24 md:h-32 lg:h-36 object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.45)] filter brightness-110" 
          />
        </motion.div>

        {/* Sparkles / Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full glowing-glass bg-white/[0.02] border-[#06b6d4]/20 mb-10"
        >
          <Sparkles className="w-4 h-4 text-[#06b6d4]" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#e0ffff]/90">
            Delhi Public School Electronic City Presents
          </span>
        </motion.div>

        {/* Cinematic Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cinzel-deco text-5xl md:text-8xl lg:text-9xl font-black tracking-widest leading-none select-none mb-6"
        >
          <span className="shimmer-cyan-text">SRISHTI</span>
        </motion.h1>

        {/* Season Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-cinzel text-xl md:text-3xl tracking-[0.4em] text-[#e0ffff]/80 uppercase mb-10"
        >
          Season 6.0
        </motion.div>

        {/* Teaser text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-garamond text-xl md:text-3xl italic text-[#00f3ff] mb-12 max-w-3xl"
        >
          "A Splash of Creativity"
        </motion.p>

        {/* Date and Location Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-12 w-full max-w-2xl"
        >
          <div className="flex items-center space-x-3 px-6 py-3 rounded-lg glowing-glass w-full md:w-auto justify-center bg-white/[0.01]">
            <Calendar className="w-5 h-5 text-[#06b6d4]" />
            <span className="font-mono text-sm tracking-wide text-[#e0ffff]/90">
              Friday, 14 August 2026 (8:30 AM)
            </span>
          </div>
          <div className="flex items-center space-x-3 px-6 py-3 rounded-lg glowing-glass w-full md:w-auto justify-center bg-white/[0.01]">
            <MapPin className="w-5 h-5 text-[#06b6d4]" />
            <span className="font-mono text-sm tracking-wide text-[#e0ffff]/90">
              Delhi Public School Electronic City, Bengaluru
            </span>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 max-w-2xl w-full"
        >
          {timerItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 md:p-6 rounded-lg glowing-glass bg-white/[0.02] border-[#06b6d4]/20 relative overflow-hidden"
            >
              {/* Shimmer top glow */}
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent" />
              <span className="font-mono text-3xl md:text-5xl font-bold text-[#fff] tracking-wide">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] md:text-xs uppercase tracking-wider text-[#06b6d4]/85 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-12 md:mb-24 animate-pulse-slow"
        >
          <a href="#register" className="glow-button px-8 py-4 rounded text-sm tracking-widest w-56 text-center">
            HOW TO REGISTER
          </a>
          <a href="#events" className="glow-button-outline px-8 py-4 rounded text-sm tracking-widest w-56 text-center">
            EXPLORE EVENTS
          </a>
        </motion.div>

        {/* Animated Chevron Down */}
        <motion.button
          onClick={handleScrollDown}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="cursor-pointer text-[#06b6d4]/70 hover:text-[#06b6d4] transition-colors focus:outline-none flex flex-col items-center gap-2 mt-4"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#e0ffff]/60">
            Scroll to discover
          </span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
