import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constants ---
const BLUE_PRIMITIVES = ['#020617', '#0f172a', '#1e293b', '#334155', '#475569', '#2563EB', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];
const GREEN_PRIMITIVES = ['#052e16', '#064e3b', '#065f46', '#047857', '#059669', '#10B981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

// --- Icons ---
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const SoccerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 12l3 3"/><path d="M12 12l-3-3"/><path d="M12 12l-2.5 4"/><path d="M12 12l2.5-4"/><path d="M12 12V6.5"/><path d="M12 12l4 2.5"/><path d="M12 12l-4-2.5"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

// --- Slideshow Content Data ---
const SLIDES = [
  {
    step: 1,
    title: "Core Primitives",
    desc: "Raw color scales defined globally. The foundation of the system.",
  },
  {
    step: 2,
    title: "Semantic Tokens",
    desc: "Primitives are mapped to context-aware roles indicating intent.",
  },
  {
    step: 3,
    title: "Component Application",
    desc: "Components consume semantic tokens to build dynamic, themeable UIs.",
  },
  {
    step: 4,
    title: "Component Handoff",
    desc: "Tokens mapped directly to UI properties (padding, radii, text) for pixel-perfect dev handoff.",
  }
];

// --- High-Tech Animated Beam Component ---
const AnimatedBeam = ({ start, end, color, phase }) => {
  if (!start || !end || phase === 'hidden') return null;
  const dx = Math.abs(end.x - start.x) * 0.4;
  const d = `M ${start.x} ${start.y} C ${start.x + dx} ${start.y}, ${end.x - dx} ${end.y}, ${end.x} ${end.y}`;

  return (
    <g className="pointer-events-none">
      <path d={d} fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.1" />

      {phase === 'tease' && (
        <motion.path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 0.4, 0], pathOffset: [0, 0.6, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      )}

      {phase === 'solid' && (
        <>
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ filter: `drop-shadow(0 0 12px ${color})` }}
          />
          <motion.circle
            r="2"
            fill="#fff"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: `path('${d}')`, filter: `drop-shadow(0 0 5px #fff)` }}
          />
        </>
      )}
    </g>
  );
};

// --- Intro Video Overlay Component ---
const IntroOverlay = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-50 bg-[#0A0A0C] flex flex-col items-center justify-center rounded-3xl"
    >
      <div className="flex flex-col items-center gap-10">
        <div className="text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[#64748B] text-[9px] font-bold tracking-[0.2em] uppercase mb-4"
          >
            Design Systems • Token Architecture
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[64px] font-extrabold tracking-tighter flex flex-col items-center leading-[0.95]"
          >
            <span className="text-white">Tokens</span>
            <span className="text-[#64748B]">Journey</span>
          </motion.h1>
        </div>

        <motion.div 
          className="flex items-end gap-2 mt-4 h-[70px]"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 1.2 } } }}
        >
          {BLUE_PRIMITIVES.map((color, i) => (
            <motion.div 
              key={`intro-blue-${i}`}
              variants={{ hidden: { opacity: 0, y: 20, scale: 0.8 }, visible: { opacity: 1, y: 0, scale: 1 } }}
              className="flex flex-col items-center gap-2"
            >
              <div 
                className={`rounded-lg transition-all ${i === 5 ? 'w-10 h-12 ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0A0A0C] shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'w-10 h-10 opacity-70'}`}
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-gray-600 font-mono font-medium">{(i+1)*100}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="flex items-center gap-2 mt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span className="text-[10px] text-[#64748B] font-bold tracking-[0.15em] uppercase">
            T1 • Primitives • 10 Steps • Base Scale
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.5 }}
          onClick={onComplete}
          className="mt-6 px-8 py-3 bg-white hover:bg-gray-200 text-black text-xs font-bold rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105"
        >
          Comenzar Recorrido
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- Main Application Component ---
export default function DesignTokensSlideshow() {
  const [showIntro, setShowIntro] = useState(true);
  const [step, setStep] = useState(1);
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({});

  const bPrimRef = useRef(null);
  const gPrimRef = useRef(null);
  const bSemInRef = useRef(null);
  const bSemOutRef = useRef(null);
  const gSemInRef = useRef(null);
  const gSemOutRef = useRef(null);
  const betBtnRef = useRef(null);
  const badgeRef = useRef(null);

  const updateCoords = () => {
    if (!containerRef.current) return;
    const contRect = containerRef.current.getBoundingClientRect();
    const getCenter = (ref) => ref.current ? { x: ref.current.getBoundingClientRect().left - contRect.left + ref.current.getBoundingClientRect().width / 2, y: ref.current.getBoundingClientRect().top - contRect.top + ref.current.getBoundingClientRect().height / 2 } : null;
    const getLeft = (ref, offset = 0) => ref.current ? { x: ref.current.getBoundingClientRect().left - contRect.left - offset, y: ref.current.getBoundingClientRect().top - contRect.top + ref.current.getBoundingClientRect().height / 2 } : null;
    const getRight = (ref, offset = 0) => ref.current ? { x: ref.current.getBoundingClientRect().right - contRect.left + offset, y: ref.current.getBoundingClientRect().top - contRect.top + ref.current.getBoundingClientRect().height / 2 } : null;

    setCoords({
      bPrim: getCenter(bPrimRef), gPrim: getCenter(gPrimRef),
      bSemIn: getLeft(bSemInRef, 8), bSemOut: getRight(bSemOutRef, 8),
      gSemIn: getLeft(gSemInRef, 8), gSemOut: getRight(gSemOutRef, 8),
      betBtn: getLeft(betBtnRef, 4), badge: getLeft(badgeRef, 4),
    });
  };

  useLayoutEffect(() => {
    const timer = setTimeout(updateCoords, 150);
    window.addEventListener('resize', updateCoords);
    return () => { clearTimeout(timer); window.removeEventListener('resize', updateCoords); };
  }, [step, showIntro]);

  const nextStep = () => setStep(s => Math.min(4, s + 1));
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const getPhase = (targetStep, currentStep, isNextTease = false) => {
    if (currentStep === 4) return 'hidden'; // Hide beams on step 4
    if (currentStep >= targetStep) return 'solid';
    if (isNextTease && currentStep === targetStep - 1) return 'tease';
    return 'hidden';
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        .manrope-enforced { font-family: 'Manrope', sans-serif; }
        .manrope-enforced .font-mono, .manrope-enforced .font-mono * { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important; }
        
        /* Figma Striped Overlays */
        .bg-stripes-white { background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.25) 0, rgba(255, 255, 255, 0.25) 2px, transparent 2px, transparent 6px); }
        .bg-stripes-pink { background-image: repeating-linear-gradient(45deg, rgba(244, 114, 182, 0.5) 0, rgba(244, 114, 182, 0.5) 2px, transparent 2px, transparent 6px); }
      `}} />
      
      <div className="manrope-enforced w-full min-h-[700px] bg-[#000000] flex items-center justify-center p-4 selection:bg-blue-500/30 relative rounded-3xl overflow-hidden">
        <div 
          ref={containerRef}
          className="relative w-full max-w-[800px] h-[650px] bg-[#0A0A0C] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.05)' }}
        >
          {/* Dimension Label */}
          <div className="absolute -top-[1px] left-8 bg-[#0A0A0C] border-x border-b border-white/10 px-4 py-1 rounded-b-lg text-[10px] text-gray-500 font-mono tracking-widest z-50 shadow-sm">
            Interactive Token Journey
          </div>

          {/* Ambient Glassmorphism Glows */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl z-0">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[100px] rounded-full mix-blend-screen" />
          </div>

          {/* Header Area */}
          <div className="w-full px-12 pt-12 pb-6 flex justify-between items-end relative z-30">
            <div className="h-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-1">
                     <span className="bg-white/10 border border-white/5 text-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Step {step}</span>
                     <h2 className="text-white text-2xl font-semibold tracking-tight">{SLIDES[step-1].title}</h2>
                  </div>
                  <p className="text-gray-400 text-sm max-w-md">{SLIDES[step-1].desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="text-gray-600 font-mono text-xs tracking-widest uppercase">Design System</div>
          </div>

          {/* --- SVG Connections Layer --- */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            <AnimatedBeam start={coords.bPrim} end={coords.bSemIn} color="#3b82f6" phase={getPhase(2, step, true)} />
            <AnimatedBeam start={coords.bSemOut} end={coords.betBtn} color="#3b82f6" phase={getPhase(3, step, false)} />
            <AnimatedBeam start={coords.gPrim} end={coords.gSemIn} color="#10b981" phase={getPhase(3, step, true)} />
            <AnimatedBeam start={coords.gSemOut} end={coords.badge} color="#10b981" phase={getPhase(4, step, true)} />
          </svg>

          {/* --- Main Content Layers --- */}
          <div className="relative w-full flex-grow flex items-center justify-center">
            
            {/* Layers for Steps 1-3 (3 Columns) */}
            <motion.div 
              animate={{ 
                opacity: step === 4 ? 0 : 1, 
                filter: step === 4 ? 'blur(10px)' : 'blur(0px)',
                pointerEvents: step === 4 ? 'none' : 'auto' 
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full flex justify-between px-10 gap-6 mt-2 z-30"
            >
              {/* Column 1: Core Primitives */}
              <div className="flex flex-col gap-6 w-[200px]">
                {/* Blue Primitives */}
                <motion.div className={`bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all duration-500 ${step >= 1 ? 'shadow-lg border-white/20' : ''}`}>
                  <h3 className="text-gray-300 text-[10px] font-bold uppercase tracking-wider mb-3">Main-Dark Primitives</h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {BLUE_PRIMITIVES.map((color, i) => (
                      <div key={`blue-${i}`} className="flex flex-col items-center gap-1">
                        <div ref={i === 5 ? bPrimRef : null} className={`w-3.5 h-3.5 rounded transition-all duration-300 ${i === 5 && step >= 1 ? 'ring-1 ring-blue-500 ring-offset-2 ring-offset-[#0A0A0C] scale-125 shadow-[0_0_10px_rgba(37,99,235,0.6)] z-10' : 'opacity-60'}`} style={{ backgroundColor: color }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] text-gray-500">Value</span>
                    <span className="text-[9px] text-white font-mono bg-blue-500/20 px-1.5 rounded text-blue-400">main-dark.600</span>
                  </div>
                </motion.div>

                {/* Green Primitives */}
                <motion.div className={`bg-white/[0.03] border border-white/10 rounded-xl p-4 transition-all duration-500 ${step >= 1 ? 'shadow-lg border-white/20' : ''}`}>
                  <h3 className="text-gray-300 text-[10px] font-bold uppercase tracking-wider mb-3">Utility - GREEN-DARK</h3>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {GREEN_PRIMITIVES.map((color, i) => (
                      <div key={`green-${i}`} className="flex flex-col items-center gap-1">
                        <div ref={i === 5 ? gPrimRef : null} className={`w-3.5 h-3.5 rounded transition-all duration-300 ${i === 5 && step >= 1 ? 'ring-1 ring-emerald-500 ring-offset-2 ring-offset-[#0A0A0C] scale-125 shadow-[0_0_10px_rgba(16,185,129,0.6)] z-10' : 'opacity-60'}`} style={{ backgroundColor: color }} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5">
                    <span className="text-[9px] text-gray-500">Value</span>
                    <span className="text-[9px] text-white font-mono bg-emerald-500/20 px-1.5 rounded text-emerald-400">green-dark.600</span>
                  </div>
                </motion.div>
              </div>

              {/* Column 2: Semantic Tokens */}
              <motion.div 
                initial={false}
                animate={{ opacity: step >= 2 ? 1 : 0.1, scale: step >= 2 ? 1 : 0.95, filter: step >= 2 ? 'blur(0px)' : 'blur(2px)' }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6 w-[230px]"
              >
                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 relative">
                  <h4 className="text-[11px] font-semibold text-white mb-3">Action Token</h4>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-2 relative" ref={bSemInRef}>
                    <div className="font-semibold text-white text-xs mb-0.5 font-mono">primary</div>
                    <div className="text-[9px] text-gray-500 font-mono mb-2">var(--action-primary)</div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <div className={`w-3 h-3 rounded-sm ${step >= 2 ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]' : 'bg-gray-800'}`} />
                      <div className="text-gray-400 font-mono text-[9px]">main-dark.600</div>
                    </div>
                    <div ref={bSemOutRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1" />
                  </div>
                </div>

                <div className={`bg-white/[0.03] border border-white/10 rounded-xl p-4 relative transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                  <h4 className="text-[11px] font-semibold text-white mb-3">Status Token</h4>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-2 relative" ref={gSemInRef}>
                    <div className="font-semibold text-white text-xs mb-0.5 font-mono">success-bg</div>
                    <div className="text-[9px] text-gray-500 font-mono mb-2">var(--status-success-bg)</div>
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <div className={`w-3 h-3 rounded-sm ${step >= 3 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-gray-800'}`} />
                      <div className="text-gray-400 font-mono text-[9px]">green-dark.600</div>
                    </div>
                    <div ref={gSemOutRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1" />
                  </div>
                </div>
              </motion.div>

              {/* Column 3: Component Application */}
              <motion.div 
                initial={false}
                animate={{ opacity: step >= 3 ? 1 : 0.05, x: step >= 3 ? 0 : 20 }}
                transition={{ duration: 0.6 }}
                className="w-[240px]"
              >
                <div className="bg-[#181A20] rounded-2xl shadow-2xl border border-white/5 overflow-hidden flex flex-col font-sans">
                  <div className="flex bg-[#0D0F14]">
                    <button className="flex-1 py-3 text-[10px] font-bold text-white border-b border-blue-500 tracking-wider">MULTI BET</button>
                    <button className="flex-1 py-3 text-[10px] font-bold text-gray-600 tracking-wider">SYSTEM</button>
                  </div>

                  <div className="p-4 flex flex-col gap-4">
                    <div className="bg-[#222630] rounded-lg p-3">
                      <div className="flex gap-2">
                        <div className="mt-0.5 text-gray-400"><SoccerIcon /></div>
                        <div>
                          <h4 className="text-white font-semibold text-xs">Arsenal - Man City</h4>
                          <p className="text-gray-500 text-[10px] mt-0.5">1×2 • 2.96</p>
                        </div>
                      </div>
                    </div>

                    <div ref={badgeRef} className={`rounded-lg p-2.5 transition-all duration-700 border ${step >= 4 ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors duration-500 ${step >= 4 ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'}`}>Combo Boost</span>
                      </div>
                      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 w-[60%] rounded-full" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-400">Stake</span>
                        <span className="text-white font-medium bg-[#222630] px-2 py-1 rounded">€ 10.00</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-gray-400">Potential Win</span>
                        <span className="text-emerald-400 font-bold">€ 29.60</span>
                      </div>
                    </div>

                    <button ref={betBtnRef} className={`w-full py-3 mt-1 rounded-lg font-bold text-xs tracking-wide transition-all duration-500 relative ${step >= 3 ? 'bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.4)]' : 'bg-[#222630] text-gray-500 border border-white/5'}`}>
                      <span className="relative z-10">Place bet</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* --- Layer for Step 4 (Figma Spec View) --- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: step === 4 ? 1 : 0, scale: step === 4 ? 1 : 0.9, pointerEvents: step === 4 ? 'auto' : 'none' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center z-40"
            >
              <div className="relative w-[480px] h-[130px] mt-[-60px]"> {/* Negative margin to visually center it above controls */}
                
                {/* Figma Bounding Box (Purple) */}
                <div className="absolute inset-0 border-[1.5px] border-[#a855f7] z-50 pointer-events-none">
                  {/* Anchor Handles */}
                  <div className="absolute -top-[5px] -left-[5px] w-2.5 h-2.5 bg-white border-[1.5px] border-[#a855f7]" />
                  <div className="absolute -top-[5px] -right-[5px] w-2.5 h-2.5 bg-white border-[1.5px] border-[#a855f7]" />
                  <div className="absolute -bottom-[5px] -left-[5px] w-2.5 h-2.5 bg-white border-[1.5px] border-[#a855f7]" />
                  <div className="absolute -bottom-[5px] -right-[5px] w-2.5 h-2.5 bg-white border-[1.5px] border-[#a855f7]" />

                  {/* Bottom Size Label */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#a855f7] text-white text-[12px] font-mono font-medium px-2 py-1 rounded shadow-md">
                    135 Hug × 40 Hug
                  </div>
                </div>

                {/* The Annotated Button */}
                <div className="w-full h-full bg-[#3b82f6] rounded-[24px] flex items-center relative overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                  
                  {/* Padding Overlays */}
                  <div className="absolute inset-0 pointer-events-none z-20">
                    
                    {/* Left Padding */}
                    <div className="absolute top-0 bottom-0 left-0 w-[60px] bg-stripes-white border-r border-[#0ea5e9]/50 flex items-center justify-start">
                      <div className="bg-[#0ea5e9] text-white text-[12px] font-mono font-semibold px-1.5 py-0.5 rounded-sm absolute -left-[18px] shadow-sm transform -rotate-90 origin-right">spacing-xl</div>
                    </div>
                    
                    {/* Right Padding */}
                    <div className="absolute top-0 bottom-0 right-0 w-[60px] bg-stripes-white border-l border-[#0ea5e9]/50 flex items-center justify-end">
                      <div className="bg-[#0ea5e9] text-white text-[12px] font-mono font-semibold px-1.5 py-0.5 rounded-sm absolute -right-[18px] shadow-sm transform rotate-90 origin-left">spacing-xl</div>
                    </div>
                    
                    {/* Top Padding */}
                    <div className="absolute top-0 left-[60px] right-[60px] h-[24px] bg-stripes-white border-b border-[#0ea5e9]/50 flex items-start justify-center">
                      <div className="bg-[#0ea5e9] text-white text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm absolute -top-[2px] shadow-sm">10</div>
                    </div>
                    
                    {/* Bottom Padding */}
                    <div className="absolute bottom-0 left-[60px] right-[60px] h-[24px] bg-stripes-white border-t border-[#0ea5e9]/50 flex items-end justify-center">
                      <div className="bg-[#0ea5e9] text-white text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded-sm absolute -bottom-[2px] shadow-sm">10</div>
                    </div>
                    
                    {/* Center Gap Overlay */}
                    <div className="absolute top-[24px] bottom-[24px] right-[100px] w-[24px] bg-stripes-pink flex items-center justify-center">
                      <div className="bg-[#0ea5e9] text-white text-[10px] font-mono font-bold px-1 rounded-sm shadow-sm z-30">...</div>
                    </div>

                  </div>

                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-between text-white w-full h-full px-[60px]">
                    <span className="text-[48px] font-medium tracking-wide">Place Bet</span>
                    <ArrowRightIcon />
                  </div>

                </div>
              </div>
            </motion.div>

          </div>

          {/* --- Minimalist UI Controls (Apple-style) --- */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-white/[0.05] border border-white/10 backdrop-blur-2xl px-6 py-2.5 rounded-full z-40 shadow-xl">
            <button 
              onClick={prevStep} 
              disabled={step === 1}
              className="text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
              <ChevronLeft />
            </button>
            
            <div className="flex gap-2.5">
              {[1, 2, 3, 4].map(i => (
                <button 
                  key={i} 
                  onClick={() => setStep(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${step === i ? 'bg-white scale-125' : step > i ? 'bg-gray-400' : 'bg-gray-700'}`}
                  aria-label={`Go to step ${i}`}
                />
              ))}
            </div>

            <button 
              onClick={nextStep} 
              disabled={step === 4}
              className="text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 transition-colors"
            >
              <ChevronRight />
            </button>
          </div>

          {/* --- Intro Overlay (Rendered conditionally on top) --- */}
          <AnimatePresence>
            {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
}
