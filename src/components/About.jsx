import React from 'react';
import { motion } from 'framer-motion';
import { Info, HelpCircle, ShieldAlert, Users, Award } from 'lucide-react';
import FloatingWrapper from './FloatingWrapper';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const generalRules = [
    {
      icon: <Users className="w-5 h-5 text-[#00f3ff]" />,
      text: "Designed exclusively for students from Grades VI to XII.",
    },
    {
      icon: <Info className="w-5 h-5 text-[#00f3ff]" />,
      text: "Each student can participate in only one event.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#00f3ff]" />,
      text: "Wear school uniform (or prepared costumes) and school ID cards at all times.",
    },
    {
      icon: <HelpCircle className="w-5 h-5 text-[#00f3ff]" />,
      text: "Each school can be accompanied by at most two teachers-in-charge.",
    },
    {
      icon: <Award className="w-5 h-5 text-[#00f3ff]" />,
      text: "Winners receive Certificates of Excellence & Trophies. All participants receive Participation Certificates.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-[#00f3ff]" />,
      text: "The results declared by the judges shall be final and binding on all participants.",
    },
    {
      icon: <Info className="w-5 h-5 text-[#00f3ff]" />,
      text: "For further clarifications regarding the competitions, please contact the respective teacher coordinator between 3 pm and 5 pm.",
    },
  ];

  return (
    <section id="about" className="relative py-24 border-y border-[#00f3ff]/10">
      <div className="container-width">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Welcome Message Column (Left) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00f3ff]">
                Welcome Note
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-cinzel">
                A Splash of Creativity
              </h2>
            </div>

            <div className="font-garamond text-lg md:text-2xl text-white leading-loose space-y-8 tracking-wide">
              <p>Dear Principal,</p>
              <p>Greetings from DPS Electronic City!</p>
              <p>When the curtains rise, destinies take the stage. When the spotlight awakens, brilliance finds its voice. And when imagination takes flight, masterpieces are born.</p>
              <p>With immense pride and heartfelt delight, Delhi Public School Electronic City cordially invites your esteemed institution to grace the grand celebration of artistry, innovation, and youthful excellence at the Inter-School Fest – Srishti: A Splash of Creativity 2026.</p>
              <p>Srishti 6.0 is an ode to the spirit of creation; a celebration where passion finds its purpose, curiosity kindles innovation, and excellence is not merely pursued but magnificently embodied. It is a vibrant confluence of artists, performers, thinkers, and dreamers who dare to reimagine the ordinary and transform it into the extraordinary. So, prepare to be a part of the journey into an enchanting realm where imagination transcends boundaries, dreams bloom into reality, and every heartbeat echoes with the rhythm of creativity, collaboration, and boundless enthusiasm. Every applause shall celebrate perseverance, every smile shall reflect accomplishment, and every moment shall become a cherished memory etched forever in the hearts of those who dare to dream. Together, let us transform Srishti: A Splash of Creativity 2026 into a timeless symphony of creativity. </p>
              <p>Srishti 6.0 is on Friday, 14 August 2026, from 8:30 a.m. onwards, at Delhi Public School Electronic City, Bengaluru. Enclosed with this invitation is the E-Brochure, offering a glimpse into the array of events. Each event description is accompanied by its respective registration link, conveniently provided at the end, to facilitate a seamless registration process. Schools should email the screenshot of the payment made and the registration details (a copy is attached) to <h6 className="font-garamond text-lg md:text-2xl text-white leading-loose space-y-8 tracking-wide">srishti@dpsecity.com</h6></p>
              <p>Let's embark on this adventure together and paint the canvas of memories that will last a lifetime. With anticipation and excitement, we look forward to an overwhelming response.</p>
            </div>

            <div className="pt-4 border-t border-[#00f3ff]/10">
              <h6 className="font-cinzel font-semibold text-[#fff]">
                Warm Regards,
              </h6>
              <h4 className="font-cinzel text-lg font-semibold text-[#fff]">
                Anupama Ramachandra
              </h4>
              <p className="font-mono text-xs uppercase tracking-wider text-[#00f3ff]">
                Principal, DPS Electronic City
              </p>
            </div>
          </motion.div>

          {/* General Rules & Details Column (Right) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-8">
            {/* Rules Card wrapped in FloatingWrapper with glowing-glass styling */}
            <FloatingWrapper className="rounded-[1.5rem] glowing-glass overflow-hidden">
              <div className="inner-rim" />
              <div className="p-8 relative">
                {/* Space nebula details */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f3ff]/5 blur-3xl rounded-full" />

                <h3 className="font-cinzel text-xl font-bold text-[#fff] mb-6 flex items-center gap-3">
                  General Instructions
                </h3>

                <ul className="space-y-6">
                  {generalRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{rule.icon}</div>
                      <span className="font-raleway text-sm md:text-base leading-relaxed text-white">
                        {rule.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FloatingWrapper>

            {/* Schedule Summary Card wrapped in FloatingWrapper */}
            <FloatingWrapper className="rounded-[1.25rem] glowing-glass overflow-hidden">
              <div className="inner-rim" />
              <div className="p-6 relative">
                <h3 className="font-cinzel text-lg font-bold text-[#fff] mb-4">
                  Key Dates & Timeline
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-[#00f3ff]/10 pb-2">
                    <span className="text-white">Registration Deadline:</span>
                    <span className="text-[#00f3ff] font-semibold">31 July 2026</span>
                  </div>
                  <div className="flex justify-between border-b border-[#00f3ff]/10 pb-2">
                    <span className="text-white">Reporting & Confirmation:</span>
                    <span>14 August 2026 (8:30 AM)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Events Commencement:</span>
                    <span>14 August 2026 (9:00 AM)</span>
                  </div>
                </div>
              </div>
            </FloatingWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
