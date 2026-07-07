import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import srishtiLogo from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Events', href: '#events' },
    { name: 'Venue & Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#030303]/80 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,243,255,0.05)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-width flex items-center justify-between">
        {/* Logo */}
        <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-2 group">
          <div className="relative flex items-center justify-center">
            <img src={srishtiLogo} alt="Srishti Logo" className="w-10 h-10 object-contain rounded-full relative z-10" />
            <div className="absolute inset-0 bg-[#00f3ff] blur-md opacity-25 group-hover:opacity-75 transition-opacity"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xl md:text-2xl font-bold tracking-widest text-[#fff] group-hover:text-[#00f3ff] group-hover:[text-shadow:0_0_15px_rgba(0,243,255,0.8)] transition-all duration-300">
              SRISHTI
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-white">
              SEASON 6.0
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-cinzel text-sm font-medium text-white hover:text-[#00f3ff] transition-colors relative py-1 group tracking-wider"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00f3ff] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleLinkClick(e, '#register')}
            className="glow-button px-6 py-2 rounded text-xs tracking-widest flex items-center justify-center font-bold"
          >
            REGISTER NOW
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-[#e0ffff] hover:text-[#00f3ff] focus:outline-none transition-colors"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#030303]/95 backdrop-blur-xl border-b border-cyan-500/15 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible max-h-screen py-6 shadow-2xl' : 'opacity-0 invisible max-h-0 overflow-hidden'
        }`}
      >
        <div className="flex flex-col space-y-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-cinzel text-base font-medium text-[#e0ffff] hover:text-[#00f3ff] py-2 border-b border-cyan-500/5 transition-colors tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#register"
            onClick={(e) => handleLinkClick(e, '#register')}
            className="glow-button w-full text-center px-5 py-3 mt-4 rounded text-xs tracking-widest font-bold"
          >
            REGISTER NOW
          </a>
        </div>
      </div>
    </nav>
  );
}
