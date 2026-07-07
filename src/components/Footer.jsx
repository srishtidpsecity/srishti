import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Navigation, Globe } from 'lucide-react';
import dpsLogo from '../assets/dps_logo.png';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#030303] text-white pt-20 pb-8 border-t border-cyan-500/10">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-0 w-full h-80 bg-gradient-to-t from-cyan-500/[0.02] to-transparent pointer-events-none" />

      <div className="container-width relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-[#e0ffff]/5">

        {/* About column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src={dpsLogo}
              alt="DPS Logo"
              className="h-14 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.25)] filter brightness-110"
            />
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#06b6d4]" />
              <span className="font-cinzel text-xl font-bold text-white tracking-widest">SRISHTI 6.0</span>
            </div>
          </div>
          <p className="font-raleway text-xs leading-relaxed text-white max-w-sm">
            Srishti Season 6.0 is the premier inter-school festival hosted by Delhi Public School Electronic City, celebrating creative brilliance, talent, and ingenuity.
          </p>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-[#00f3ff] mt-1 shrink-0" />
              <span>Survey no.33, Bettadasanapura, Begur Hobli, Bengaluru, Karnataka 560068</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-[#06b6d4] shrink-0" />
              <a href="mailto:srishti@dpsecity.com" className="hover:text-[#06b6d4] transition-colors underline">
                srishti@dpsecity.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="w-4 h-4 text-[#06b6d4] shrink-0" />
              <a href="https://www.dpsecity.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#06b6d4] transition-colors underline">
                dpsecity.com
              </a>
            </div>
          </div>
        </div>

        {/* Interactive map column */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-cinzel text-base font-bold text-white tracking-wide border-b border-cyan-500/20 pb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#06b6d4]" /> Location Map
          </h3>
          <div className="w-full h-44 rounded-lg overflow-hidden border border-cyan-500/20 relative shadow-inner">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.919864273574!2d77.6406981!3d12.8484666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13636f88ef09%3A0xe54e300de4b3bf52!2sDelhi%20Public%20School%2C%20Electronic%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(120%) brightness(90%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Delhi Public School Electronic City Map"
            />
          </div>
        </div>

      </div>

      {/* Copyright branding details */}
      <div className="container-width relative z-10 pt-8 flex flex-col md:flex-row justify-between items-center text-center gap-4 text-[10px] font-mono text-white">
        <div className="text-center font-mono text-xs text-white">
          &copy; {new Date().getFullYear()} Delhi Public School Electronic City, Bengaluru. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
