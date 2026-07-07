import React, { useState } from 'react';
import { Check, Copy, Calculator, CreditCard, Mail } from 'lucide-react';
import { eventsData } from '../data/eventsData';
import FloatingWrapper from './FloatingWrapper';

export default function Registration() {
  const [copiedField, setCopiedField] = useState(null);

  // Interactive Calculator State
  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const toggleEventSelection = (eventId) => {
    if (selectedEvents.includes(eventId)) {
      setSelectedEvents(selectedEvents.filter(id => id !== eventId));
    } else {
      setSelectedEvents([...selectedEvents, eventId]);
    }
  };

  // Calculate pricing
  const calculateTotal = () => {
    let total = 0;
    selectedEvents.forEach(id => {
      const event = eventsData.find(e => e.id === id);
      if (event) {
        total += event.type === 'Individual' ? 300 : 750;
      }
    });
    return total;
  };

  const registrationSteps = [
    {
      title: "Select Competitions",
      desc: "Find events that match your students' grades (VI-XII). Ensure each student participates in only one event."
    },
    {
      title: "Calculate & Pay",
      desc: "Individual events are Rs. 300/- each; Group events are Rs. 750/- each."
    }
  ];

  return (
    <section id="register" className="relative py-24 border-t border-[#00f3ff]/10">
      <div className="container-width relative z-10">

        {/* Section Title */}
        <div className="text-center space-y-6 mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00f3ff]">
            Registration Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-cinzel">
            Registration Steps
          </h2>
          <div className="w-24 h-[1.5px] bg-[#00f3ff] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Instructions and Bank Card (Left Column) */}
          <div className="lg:col-span-6 space-y-8">

            {/* Step-by-Step Visual Indicators */}
            <div className="space-y-8">
              <h3 className="font-cinzel text-xl font-bold text-white mb-4">
                How to Register
              </h3>

              <div className="space-y-4">
                {registrationSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center font-mono text-xs text-[#06b6d4] font-bold bg-[#06b6d4]/5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm font-semibold text-[#fff] tracking-wide">
                        {step.title}
                      </h4>
                      <p className="font-raleway text-xs text-white mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Email instructions */}
            <div className="rounded-[1rem] glowing-glass p-4 border border-cyan-500/10 text-xs flex items-start gap-3">
              <div className="inner-rim" />
              <Mail className="w-5 h-5 text-[#06b6d4] mt-0.5" />
              <div className="font-raleway text-white relative z-10">
                <strong>Submission Email:</strong> Schools should send a confirmation email to <a href={`mailto:srishti@dpsecity.com`} className="text-[#06b6d4] underline font-mono">srishti@dpsecity.com</a>, including a Bonafide letter with the registration details of all participants.
              </div>
            </div>

          </div>

          {/* Fee Calculator (Right Column) wrapped in FloatingWrapper with glowing-glass */}
          <div className="lg:col-span-6">
            <FloatingWrapper className="rounded-xl glowing-glass border border-cyan-500/10 relative flex flex-col overflow-hidden">
              <div className="inner-rim" />
              <div className="p-8 md:p-10 relative z-10 flex-grow flex flex-col">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#06b6d4]/30 to-transparent" />

                <div className="flex items-center space-x-2 text-[#06b6d4] mb-6 shrink-0">
                  <Calculator className="w-5 h-5" />
                  <h3 className="font-cinzel text-xl font-bold text-white">Fee Calculator</h3>
                </div>

                <div className="space-y-6 flex-grow flex flex-col">
                  {/* Events Checklist Selection */}
                  <div className="space-y-2 flex-grow flex flex-col min-h-0">
                    <label className="block font-mono text-xs uppercase tracking-wider text-white mb-2 shrink-0">Select Events to Calculate Fee</label>
                    <div className="overflow-y-auto border border-cyan-500/10 rounded bg-[#050505] p-3 space-y-2 custom-scrollbar max-h-[220px]">
                      {eventsData.map((ev) => {
                        const isSelected = selectedEvents.includes(ev.id);
                        const price = ev.type === 'Individual' ? 300 : 750;
                        return (
                          <div
                            key={ev.id}
                            onClick={() => toggleEventSelection(ev.id)}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-all ${isSelected
                              ? 'bg-cyan-500/10 border-cyan-500/50 text-white'
                              : 'border-transparent text-white hover:bg-white/5 hover:text-white'
                              }`}
                          >
                            <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-[#06b6d4] bg-[#06b6d4]' : 'border-white/20 bg-transparent'
                                }`}>
                                {isSelected && <Check className="w-3 h-3 text-[#050505] stroke-[3]" />}
                              </div>
                              <span className="font-raleway text-xs font-medium text-left truncate">{ev.name} <span className="font-mono text-[9px] opacity-60">({ev.eligibility})</span></span>
                            </div>
                            <span className="font-mono text-xs text-[#06b6d4] font-semibold shrink-0">₹{price}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="border-t border-cyan-500/10 pt-4 space-y-4 shrink-0">
                    <div className="flex justify-between font-mono text-xs text-white">
                      <span>Events Selected:</span>
                      <span>{selectedEvents.length}</span>
                    </div>
                    <div className="flex justify-between font-cinzel text-lg text-white font-bold border-b border-cyan-500/10 pb-4 mb-4">
                      <span>Total Registration Fee:</span>
                      <span className="text-[#06b6d4]">₹{calculateTotal()}</span>
                    </div>

                    {/* Placeholder Register Now Button */}
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full glow-button px-8 py-3 rounded text-sm tracking-widest text-center flex flex-col items-center justify-center font-bold"
                    >
                      <span>REGISTER NOW</span>
                    </a>
                  </div>
                </div>
              </div>
            </FloatingWrapper>
          </div>

        </div>

      </div>
    </section>
  );
}
