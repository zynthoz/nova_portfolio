import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // if any
import avatarImage from './assets/avatar.png';

// LaundryLink Images
import imgLaundry1 from './assets/LAUNDRYLINK/1.jpg';
import imgLaundry2 from './assets/LAUNDRYLINK/2.jpg';
import imgLaundry3 from './assets/LAUNDRYLINK/3.jpg';
import imgLaundry4 from './assets/LAUNDRYLINK/4.png';
import imgLaundry5 from './assets/LAUNDRYLINK/5.png';
import imgLaundryPreview from './assets/LAUNDRYLINK/preview.jpg';

// Tool.AI Images
import imgToolAI1 from './assets/TOOLAI/1.png';
import imgToolAI2 from './assets/TOOLAI/2.png';
import imgToolAI3 from './assets/TOOLAI/3.png';
import imgToolAI4 from './assets/TOOLAI/4.png';
import imgToolAIPreview from './assets/TOOLAI/preview.png';

// QForm Images
import imgQForm1 from './assets/QFORM/1.png';
import imgQForm2 from './assets/QFORM/2.png';
import imgQForm3 from './assets/QFORM/3.png';
import imgQForm4 from './assets/QFORM/4.png';
import imgQForm5 from './assets/QFORM/5.png';
import imgQForm6 from './assets/QFORM/6.png';
import imgQFormPreview from './assets/QFORM/preview.png';

// Royale Tracker Images
import imgRoyaleTracker1 from './assets/ROYALE-TRACKER/1.png';
import imgRoyaleTracker2 from './assets/ROYALE-TRACKER/2.png';
import imgRoyaleTracker3 from './assets/ROYALE-TRACKER/3.png';
import imgRoyaleTrackerPreview from './assets/ROYALE-TRACKER/preview.png';

// Impeto Images
import imgImpeto1 from './assets/IMPETO/1.png';
import imgImpeto2 from './assets/IMPETO/2.png';
import imgImpeto3 from './assets/IMPETO/3.png';
import imgImpeto4 from './assets/IMPETO/4.png';
import imgImpeto5 from './assets/IMPETO/5.png';
import imgImpetoPreview from './assets/IMPETO/preview.png';

const TERMINAL_ASCII = [
  '                                      __         ',
  '  ____ _____ __________  ____    ____/ /__ _   __',
  ' / __ `/ __ `/ ___/ __ \\/ __ \\  / __  / _ \\ | / /',
  '/ /_/ / /_/ / /  / /_/ / / / / / /_/ /  __/ |/ / ',
  '\\__,_/\\__,_/_/   \\____/_/ /_/⬤\\__,_/\\___/|___/  ',
  '                                                '
].join('\n');

const VIM_LINES = [
  <span className="vim-comment"># INIT_PROFILE: {`{`}</span>,
  <span className="vim-muted" style={{ paddingLeft: '1rem' }}>"name": <span className="vim-text">"Aaron Gabriel Lim"</span>,</span>,
  <span className="vim-muted" style={{ paddingLeft: '1rem' }}>"degree": <span className="vim-text">"BS Information Technology, 2nd Year"</span>,</span>,
  <span className="vim-muted" style={{ paddingLeft: '1rem' }}>"university": <span className="vim-text">"University of Santo Tomas"</span>,</span>,
  <span className="vim-muted" style={{ paddingLeft: '1rem' }}>"location": <span className="vim-text">"Quezon City, Philippines"</span></span>,
  <span className="vim-comment">{`}`}</span>,
  <br />,
  <span className="vim-comment">## SYS_OVERVIEW</span>,
  <span><span className="vim-text">I have a genuine passion for writing code — not just as a skill, but as something I genuinely can't put down. I build, I break things, I learn, and I build again. That drive is what makes me the kind of developer who shows up not because they have to, but because they </span><span className="vim-link">want to.</span></span>,
  <br />,
  <span className="vim-comment">## WHAT_I_BRING</span>,
  <span className="vim-muted">- <span className="vim-text font-bold">Fast learner</span> — actively follow tech trends and continuously upskill.</span>,
  <span className="vim-muted">- <span className="vim-text font-bold">Self-motivated</span> — coding isn't a chore for me; it's how I spend my free time.</span>,
  <span className="vim-muted">- <span className="vim-text font-bold">Growth mindset</span> — investing heavily in getting better every single day.</span>,
  <br />,
  <span className="vim-comment">## TARGET_VECTORS</span>,
  <span className="vim-muted">- Deepening knowledge in software development</span>,
  <span className="vim-muted">- Tracking the latest frameworks, tools, and industry shifts</span>,
  <span className="vim-muted">- Open to <span className="vim-link">internships</span>, entry-level roles, and collaborations.</span>,
  <br />,
  <span className="vim-comment font-bold">&gt; I'm just getting started — and that's exactly what makes this exciting.</span>,
  <br />,
  <span style={{ color: '#6ee7b7', filter: 'brightness(1.25)' }}>-- INSERT -- <span className="cursor-block bg-[#6ee7b7]"></span></span>
];

const PROJECTS = {
  'window-project-1': {
    headline: 'LAUNDRYLINK',
    status: 'OPERATIONAL',
    desc1: "A three-tier IoT laundromat management system built with an ESP32 controller, a Raspberry Pi local manager, and a Supabase cloud backend — deployed across 3 clients and 36 machines with multi-tenant Role-Based Access Control (RBAC).",
    desc2: 'Architected the full IoT stack with offline-first sync, cut deployment setup time by ~70% via SPIFFS-based firmware config, and achieved 100% transaction logging accuracy with full remote machine management.',
    imgText: 'LAUNDRYLINK_ACTIVE',
    previewImg: imgLaundryPreview,
    images: [imgLaundry1, imgLaundry2, imgLaundry3, imgLaundry4, imgLaundry5],
    tags: ['ESP32', 'C++', 'Python', 'Flask', 'Supabase', 'React'],
    lastPush: '2024.11.08',
  },
  'window-project-2': {
    headline: 'TOOL.AI',
    status: 'ARCHIVED',
    desc1: 'An AI-powered upskilling platform built with Next.js that generates personalized learning plans through OpenAI integration — winner of the PhilTech Innovathon 2026 Special Award.',
    desc2: 'Developed the full-stack platform using Next.js with OpenAI integration to deliver dynamic, personalized learning experiences tailored to each users goals and skill gaps.',
    imgText: 'TOOL.AI_ACTIVE',
    previewImg: imgToolAIPreview,
    images: [imgToolAI1, imgToolAI2, imgToolAI3, imgToolAI4],
    tags: ['OPEN AI', 'NEXT.JS', 'REACT'],
    lastPush: '2023.09.12',
  },
  'window-project-3': {
    headline: 'QFORM',
    status: 'ARCHIVED',
    desc1: 'Built in 2022, a full-stack facility management platform with secure authentication and approval workflows — built as an SHS capstone project before AI-assisted development was a thing.',
    desc2: 'Engineered end-to-end from scratch with secure auth and structured approval workflows, cutting scheduling conflicts by ~90%.',
    imgText: 'QFORM_ACTIVE',
    previewImg: imgQFormPreview,
    images: [imgQForm1, imgQForm2, imgQForm3, imgQForm4, imgQForm5, imgQForm6],
    tags: ['PHP', 'SQL', 'QRPH', 'HTML/CSS', 'JavaScript'],
    lastPush: '2024.01.20',
  },
  'window-project-4': {
    headline: 'ROYALE TRACKER',
    status: 'OPERATIONAL',
    desc1: 'A responsive web app that visualizes real-time player statistics through third-party REST API integration and asynchronous data handling.',
    desc2: 'Built the full frontend with responsive design, integrated a third-party REST API, and implemented async data handling for seamless real-time stat updates.',
    imgText: 'ROYALE_TRACKER_ACTIVE',
    previewImg: imgRoyaleTrackerPreview,
    images: [imgRoyaleTracker1, imgRoyaleTracker2, imgRoyaleTracker3],
    tags: ['REACT', 'REST_API', 'TAILWIND_CSS'],
    lastPush: '2024.04.03',
  },
  'window-project-5': {
    headline: 'IMPETO',
    status: 'OPERATIONAL',
    desc1: 'A gamified task management web app built with Next.js, TypeScript, and Supabase — transforms to-do lists into an RPG adventure with quests, XP leveling, gold rewards, streaks, and leaderboards.',
    desc2: 'Built the full-stack app using Next.js App Router, Supabase Auth and PostgreSQL, with a custom gamification engine covering XP/leveling, a daily shop, inventory system, achievement badges, and long-term goal tracking with milestone checkpoints.',
    imgText: 'IMPETO_ACTIVE',
    previewImg: imgImpetoPreview,
    images: [imgImpeto1, imgImpeto2, imgImpeto3, imgImpeto4, imgImpeto5],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'React', 'OAuth', 'PostgreSQL'],
    lastPush: '2024.05.01',
  }
};

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const wide = window.innerWidth >= 640;
      setTime(wide ? `${h}:${m}:${s}` : `${h}:${m}`);
    };
    updateClock();
    const int = setInterval(updateClock, 1000);
    window.addEventListener('resize', updateClock);
    return () => {
      clearInterval(int);
      window.removeEventListener('resize', updateClock);
    };
  }, []);

  return <time id="clock" aria-label="Current time">{time}</time>;
}

export default function App() {
  const [windows, setWindows] = useState({
    'window-about': { id: 'window-about', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-terminal': { id: 'window-terminal', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-github': { id: 'window-github', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-project-1': { id: 'window-project-1', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-2': { id: 'window-project-2', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-3': { id: 'window-project-3', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-4': { id: 'window-project-4', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-5': { id: 'window-project-5', state: 'closed', zIndex: 20, bootNonce: 0 },
  });

  const [focusedId, setFocusedId] = useState(null);
  const [zTop, setZTop] = useState(20);
  const [activeGallery, setActiveGallery] = useState(null);

  const openWindow = (id) => {
    setZTop((currentZ) => {
      const nextZ = currentZ + 1;
      setWindows((prev) => {
        const existing = prev[id] || { id, state: 'closed', zIndex: 20, bootNonce: 0 };
        const reopenFromClosed = existing.state === 'closed';

        return {
          ...prev,
          [id]: {
            ...existing,
            state: 'open',
            zIndex: nextZ,
            bootNonce: reopenFromClosed ? (existing.bootNonce || 0) + 1 : (existing.bootNonce || 0),
          },
        };
      });
      return nextZ;
    });
    setFocusedId(id);
  };

  const closeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], state: 'closed' }
    }));
    if (focusedId === id) setFocusedId(null);
  };

  const minimizeWindow = (id) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], state: 'minimized' }
    }));
    if (focusedId === id) setFocusedId(null);
  };

  const focusWindow = (id) => {
    if (windows[id]?.state !== 'open') return;
    setZTop(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: zTop + 1 }
    }));
    setFocusedId(id);
  };

  const toggleTaskbar = (id) => {
    const win = windows[id];
    if (!win) {
      // If it doesn't exist yet, open it
      openWindow(id);
      return;
    }
    if (win.state === 'minimized' || win.state === 'closed') {
      openWindow(id);
    } else if (win.state === 'open' && focusedId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  const openExternalApp = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* MAIN CANVAS */}
      <main className="fixed inset-0 pb-12 overflow-hidden bg-vignette" id="main-canvas">
        {/* SUBTLE PHOSPHOR OS WALLPAPER */}
        <div 
          className="absolute inset-0 pointer-events-none select-none flex items-center justify-center -z-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(40, 200, 64, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(40, 200, 64, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        >
          {/* Edge fade so grid dissolves naturally */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--color-background)_100%)] opacity-80"></div>
          
          {/* Giant ASCII Watermark */}
          <pre 
            className="font-mono text-[#28c840] opacity-[0.05] select-none pointer-events-none tracking-tighter -translate-y-[6vh]"
            style={{ 
              fontSize: 'min(3vw, 2.5rem)', 
              lineHeight: '1.1',
              filter: 'drop-shadow(0 0 20px rgba(40,200,64,0.4))'
            }}
          >
            {TERMINAL_ASCII}
          </pre>
        </div>

        <DesktopLayout
          windows={windows}
          focusedId={focusedId}
          openWindow={openWindow}
          closeWindow={closeWindow}
          minimizeWindow={minimizeWindow}
          focusWindow={focusWindow}
          openExternalApp={openExternalApp}
          openGallery={(pid) => setActiveGallery(pid)}
        />
        <MobileLayout
          windows={windows}
          openWindow={openWindow}
          closeWindow={closeWindow}
        />
      </main>

      {/* GALLERY OVERLAY */}
      <AnimatePresence>
        {activeGallery && <GalleryLightbox pid={activeGallery} onClose={() => setActiveGallery(null)} />}
      </AnimatePresence>

      {/* TASKBAR */}
      <nav className="taskbar" aria-label="Taskbar">
        <div className="taskbar-left gap-2 sm:gap-4 flex items-center">
          <button className="taskbar-btn active" id="btn-start" aria-label="Start menu">
            <span className="material-symbols-outlined">grid_view</span>
          </button>

          <TaskBarButton id="window-about" icon="person" label="ABOUT" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-about')} />
          <TaskBarButton id="window-terminal" icon="terminal" label="TERMINAL" mobileLabel="TERM" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-terminal')} />
          <TaskBarButton id="window-github" icon="query_stats" label="STATS" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-github')} />

          <div className="hidden sm:block w-px h-6 bg-[var(--color-surface-bright)] mx-1"></div>

          <button className="taskbar-btn hidden sm:flex items-center gap-2 px-3 hover:bg-[var(--color-surface-bright)] transition-colors rounded-none outline-none" onClick={() => openExternalApp('/cv.pdf')}>
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span><span className="text-[14px] font-bold tracking-wide">CV</span>
          </button>
          <button className="taskbar-btn hidden sm:flex items-center gap-2 px-3 hover:bg-[var(--color-surface-bright)] transition-colors rounded-none outline-none" onClick={() => openExternalApp('https://github.com')}>
            <span className="material-symbols-outlined text-[18px]">link</span><span className="text-[14px] font-bold tracking-wide">GITHUB</span>
          </button>
          <button className="taskbar-btn hidden sm:flex items-center gap-2 px-3 hover:bg-[var(--color-surface-bright)] transition-colors rounded-none outline-none" onClick={() => openExternalApp('https://www.linkedin.com')}>
            <span className="material-symbols-outlined text-[18px]">work</span><span className="text-[14px] font-bold tracking-wide">LINKEDIN</span>
          </button>
        </div>
        <div className="taskbar-clock">
          <Clock />
        </div>
      </nav>
    </>
  );
}

function TaskBarButton({ id, icon, label, mobileLabel, windows, focusedId, onClick }) {
  const win = windows[id] || { state: 'closed' };
  const isRunning = win.state === 'open' || win.state === 'minimized';
  const isFocused = win.state === 'open' && focusedId === id;
  let cls = 'taskbar-btn';

  return (
    <button className={cls} onClick={onClick} aria-label={label}>
      <span className="taskbar-icon-wrap">
        <span className="material-symbols-outlined text-[18px] sm:text-[20px]">{icon}</span>
        {isRunning && <span className={`taskbar-indicator ${isFocused ? 'taskbar-indicator-focused' : ''}`}></span>}
      </span>
      <span className="hidden xs:inline sm:inline text-[14px] font-bold tracking-wide">
        {mobileLabel ? <>{mobileLabel}<span className="hidden sm:inline">{label.replace(mobileLabel, '')}</span></> : label}
      </span>
    </button>
  );
}

function DesktopLayout({ windows, focusedId, openWindow, closeWindow, minimizeWindow, focusWindow, openGallery, openExternalApp }) {
  const constraintsRef = useRef(null);

  return (
    <div className="hidden sm:flex h-full p-8 relative" ref={constraintsRef}>
      {/* Desktop Main Icon Grid */}
      <nav className="absolute left-8 top-8 bottom-24 flex gap-12 z-10 py-2" aria-label="Desktop icons">
        
        {/* Column 1: Projects Group */}
        <div className="flex flex-col gap-6">
          <DesktopIcon icon="code" label="LAUNDRYLINK" onClick={() => openWindow('window-project-1')} />
          <DesktopIcon icon="code" label="TOOL.AI" onClick={() => openWindow('window-project-2')} />
          <DesktopIcon icon="code" label="QFORM" onClick={() => openWindow('window-project-3')} />
          <DesktopIcon icon="code" label="ROYALE TRACKER" onClick={() => openWindow('window-project-4')} />
          <DesktopIcon icon="code" label="IMPETO" onClick={() => openWindow('window-project-5')} />
        </div>

        {/* Column 2: Apps Group */}
        <div className="flex flex-col gap-6">
          <DesktopIcon icon="terminal" label="CONTACT" onClick={() => openWindow('window-contact')} />
          <DesktopIcon icon="history_edu" label="EXPERIENCE" onClick={() => openWindow('window-experience')} />
        </div>

      </nav>

      {/* Floating windows */}
      <div className="w-full h-full relative z-20 pointer-events-none">

        <AnimatePresence>
          {[1, 2, 3, 4, 5].map(num => {
            const pid = `window-project-${num}`;
            const pdata = PROJECTS[pid];
            return windows[pid]?.state === 'open' ? (
              <ProjectWindow
                key={`${pid}-${windows[pid].bootNonce || 0}`}
                winId={pid}
                data={pdata}
                winState={windows[pid]}
                focusedId={focusedId}
                focusWindow={focusWindow}
                closeWindow={closeWindow}
                minimizeWindow={minimizeWindow}
                constraintsRef={constraintsRef}
                openGallery={() => openGallery(pid)}
              />
            ) : null;
          })}

          {windows['window-about']?.state === 'open' && (
            <WindowFrame
              key={`window-about-${windows['window-about'].bootNonce || 0}`}
              id="window-about"
              className="w-[750px] h-auto max-h-[85vh] border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11] flex flex-col"
              initLeft="calc(50% - 375px)" initTop="calc(50% - max-h-[85vh])"
              zIndex={windows['window-about'].zIndex}
              isFocused={focusedId === 'window-about'}
              onFocus={() => focusWindow('window-about')}
              onClose={() => closeWindow('window-about')}
              onMinimize={() => minimizeWindow('window-about')}
              constraintsRef={constraintsRef}
            >
              {/* Clean Title Bar */}
              <div className="flex justify-between items-center px-4 py-2 bg-[#1a1215] border-b border-[#2b1822] cursor-grab active:cursor-grabbing w-full shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-emerald-500">account_circle</span>
                  <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">PROFILE_OVERVIEW_NODE</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); minimizeWindow('window-about'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
                  </button>
                  <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); closeWindow('window-about'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 sm:p-10 text-slate-400 bg-[#110C11]">

                {/* Header Section */}
                <div className="flex items-start gap-6 mb-8 pb-8 border-b border-[#2b1822]">
                  <div className="w-28 h-28 bg-[#1a1215] flex items-center justify-center shrink-0 border border-[#2b1822] shadow-inner" style={{ borderRadius: '0', overflow: 'hidden' }}>
                    <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-mono font-bold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] mb-2">Aaron Gabriel Lim</h1>
                    <p className="text-[13px] text-emerald-600 font-mono font-bold mb-4 tracking-widest uppercase">BS_INFORMATION_TECHNOLOGY // 2ND_YEAR @ UST</p>
                    <div className="flex gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest text-emerald-500 bg-[#1a1215] border border-[#2b1822] uppercase">
                        <span className="material-symbols-outlined text-[12px]">location_on</span> METRO_MANILA_PH
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest text-orange-500 bg-orange-950/40 border border-orange-800/50 uppercase shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                        STATUS: OPEN_TO_OPPORTUNITIES
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="space-y-10">

                  {/* Intro */}
                  <section>
                    <p className="text-[14px] leading-relaxed text-slate-400 font-mono">
                      I have a genuine passion for writing code — not just as a skill, but as something I genuinely can't put down. I <strong className="text-emerald-400 font-bold px-1 bg-emerald-950/30">build, I break things, I learn, and I build again</strong>. That drive is what makes me the kind of developer who shows up not because they have to, but because they <em className="text-orange-500 not-italic font-bold">want to</em>.
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* What I Bring */}
                    <section>
                      <h2 className="text-[11px] font-mono font-bold text-orange-500 tracking-widest uppercase mb-5">PRIMARY_ATTRIBUTES:</h2>
                      <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">bolt</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono"><strong className="text-emerald-500 font-normal">FAST_LEARNER</strong> — Actively follow tech trends and continuously upskill outside the classroom.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">local_fire_department</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono"><strong className="text-emerald-500 font-normal">SELF_MOTIVATED</strong> — Coding isn't a chore for me; it's how I spend my free time.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">trending_up</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono"><strong className="text-emerald-500 font-normal">GROWTH_MINDSET</strong> — Early in my career, but investing heavily in getting better every day.</span>
                        </li>
                      </ul>
                    </section>

                    {/* Current Focus */}
                    <section>
                      <h2 className="text-[11px] font-mono font-bold text-orange-500 tracking-widest uppercase mb-5">CURRENT_DIRECTIVES:</h2>
                      <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">code</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono">Deepening my knowledge in software development via rigorous practical application.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">explore</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono">Keeping up with the latest in tech — frameworks, tools, and industry shifts.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[18px] text-emerald-600 shrink-0 mt-0.5">work</span>
                          <span className="text-[13px] text-slate-400 leading-relaxed font-mono">Actively looking for internships and entry-level collaborations in a real-world setting.</span>
                        </li>
                      </ul>
                    </section>
                  </div>

                  {/* Closing Banner */}
                  <section className="bg-[#1a1215] border border-[#2b1822] px-6 py-7 text-center shadow-inner">
                    <p className="text-[11px] sm:text-[12px] font-mono font-bold text-emerald-500 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                      "I'M JUST GETTING STARTED — AND THAT'S EXACTLY WHAT MAKES THIS EXCITING."
                    </p>
                  </section>
                </div>
              </div>
            </WindowFrame>
          )}

          {windows['window-terminal']?.state === 'open' && (
            <WindowFrame
              key={`window-terminal-${windows['window-terminal'].bootNonce || 0}`}
              id="window-terminal"
              className="w-[400px] h-[460px] pointer-events-auto bg-[var(--color-background)] border border-[var(--color-surface-container-highest)] shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono"
              initLeft="calc(100% - 400px)" initTop="0px"
              zIndex={windows['window-terminal'].zIndex}
              isFocused={focusedId === 'window-terminal'}
              onFocus={() => focusWindow('window-terminal')}
              onClose={() => closeWindow('window-terminal')}
              onMinimize={() => minimizeWindow('window-terminal')}
              constraintsRef={constraintsRef}
            >
              <div className="flex justify-between items-center px-4 py-2 bg-[var(--color-surface-container-low)] border-b border-[var(--color-surface-container-highest)] cursor-grab active:cursor-grabbing window-titlebar">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-[var(--color-primary-container)]">terminal</span>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-primary-container)] tracking-widest uppercase">AARON@ARCH:~</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); minimizeWindow('window-terminal'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
                  </button>
                  <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); closeWindow('window-terminal'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
                  </button>
                </div>
              </div>
              <div className="px-6 pb-2 pt-2 h-[calc(100%-40px)] overflow-hidden flex flex-col justify-start items-start">
                <LinuxTerminalPanel />
              </div>
            </WindowFrame>
          )}

          {windows['window-github']?.state === 'open' && (
            <WindowFrame
              key={`window-github-${windows['window-github'].bootNonce || 0}`}
              id="window-github"
              className="w-[400px] h-[235px] pointer-events-auto overflow-hidden bg-[var(--color-background)] border border-[var(--color-surface-container-highest)] shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono"
              initLeft="calc(100% - 400px)" initTop="480px"
              zIndex={windows['window-github'].zIndex}
              isFocused={focusedId === 'window-github'}
              onFocus={() => focusWindow('window-github')}
              onClose={() => closeWindow('window-github')}
              onMinimize={() => minimizeWindow('window-github')}
              constraintsRef={constraintsRef}
            >
              <div className="flex justify-between items-center px-4 py-2 bg-[var(--color-surface-container-low)] border-b border-[var(--color-surface-container-highest)] cursor-grab active:cursor-grabbing window-titlebar">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-[var(--color-primary-container)]">grid_on</span>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-primary-container)] tracking-widest uppercase">CONTRIBUTIONS.VIEW</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); minimizeWindow('window-github'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
                  </button>
                  <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); closeWindow('window-github'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
                  </button>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 h-[calc(100%-40px)] overflow-hidden flex flex-col justify-start">
                <GitHubPanel />
              </div>
            </WindowFrame>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

function WindowFrame({ id, className, initLeft, initTop, zIndex, isFocused, onFocus, onClose, onMinimize, children, constraintsRef }) {
  return (
    <motion.section
      drag
      dragConstraints={constraintsRef}
      dragHandle=".window-titlebar"
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileDrag={{ scale: 1.01 }}
      transition={{
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 }
      }}
      className={`window-frame absolute flex flex-col ${className} ${isFocused ? 'focused' : ''}`}
      style={{ zIndex, top: initTop, left: initLeft, willChange: 'transform' }}
      aria-label={id}
    >
      {children}
    </motion.section>
  );
}


function DesktopIcon({ icon, label, onClick }) {
  return (
    <div className="desk-icon" role="button" tabIndex="0" onClick={onClick}>
      <div className="desk-icon-box desk-icon-box--lg">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span className="desk-icon-label">{label}</span>
    </div>
  );
}

function MobileLayout({ windows, openWindow, closeWindow }) {
  const toggleMobile = (id) => {
    if (windows[id]?.state === 'open') {
      closeWindow(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <div className="flex sm:hidden h-full flex-col items-center justify-start p-4 overflow-hidden gap-3">
      {/* Icon row */}
      <nav className="w-full flex justify-around items-start py-4 z-10 overflow-x-auto no-scrollbar shrink-0">
        <MobileIcon icon="account_circle" label="ABOUT" onClick={() => toggleMobile('window-about')} />
        <MobileIcon icon="work" label="PROJECTS" onClick={() => toggleMobile('window-projects')} />
        <MobileIcon icon="history_edu" label="EXP" onClick={() => toggleMobile('window-experience')} />
        <MobileIcon icon="terminal" label="MAIL" onClick={() => toggleMobile('window-contact')} />
      </nav>

      <AnimatePresence>
        {windows['window-about']?.state === 'open' && (
          <motion.section
            key="mobile-about"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="about-card w-full max-w-[450px] shrink-0 transform origin-top"
            id="window-about-mobile"
          >
            <div className="about-card-header">
              <div className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>person</span>
                <span className="truncate">ABOUT_ME.sys</span>
              </div>
              <button className="window-btn window-btn--close" onClick={() => closeWindow('window-about')}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="about-card-body">
              <div className="flex gap-4 items-start">
                <div className="about-avatar"><span className="material-symbols-outlined">face</span></div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-label" style={{ color: 'var(--color-primary-container)' }}>Senior Systems Architect</h1>
                  <h2 className="text-micro" style={{ color: 'var(--color-primary-fixed-dim)' }}>&amp; Creative Technologist</h2>
                  <div className="flex gap-1 mt-1">
                    <span className="about-tag">LOCKED</span>
                    <span className="about-tag">ADMIN</span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,255,65,0.2)', paddingTop: 12 }}>
                <p className="text-micro" style={{ lineHeight: 1.6, opacity: 0.9, color: 'var(--color-primary)', letterSpacing: '0.06em' }}>
                  Specializing in high-performance digital architectures and human-machine interface design.
                  Bridging the gap between legacy reliability and experimental aesthetics.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {windows['window-terminal']?.state === 'open' && (
          <motion.aside
            key="mobile-terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sys-log w-full max-w-[450px] h-[320px] shrink-0 transition-opacity"
          >
            <div className="window-titlebar">
              <div className="title-left text-primary-container">
                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>terminal</span>
                <span>aaron@arch:~</span>
              </div>
              <div className="title-controls">
                <button className="window-btn window-btn--close h-auto py-0" onClick={() => closeWindow('window-terminal')}><span className="material-symbols-outlined">close</span></button>
              </div>
            </div>
            <LinuxTerminalPanel compact />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileIcon({ icon, label, onClick }) {
  return (
    <div className="desk-icon shrink-0" role="button" tabIndex="0" onClick={onClick}>
      <div className="desk-icon-box desk-icon-box--sm"><span className="material-symbols-outlined">{icon}</span></div>
      <span className="desk-icon-label" style={{ fontSize: 8 }}>{label}</span>
    </div>
  );
}

function ProjectWindow({ winId, data, winState, focusedId, focusWindow, closeWindow, minimizeWindow, constraintsRef, openGallery }) {
  return (
    <WindowFrame
      key={winId}
      id={winId}
      className="w-[750px] h-[auto] border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11]"
      initLeft="calc(50% - 375px)" initTop="calc(50% - max-h-[85vh])"
      zIndex={winState.zIndex}
      isFocused={focusedId === winId}
      onFocus={() => focusWindow(winId)}
      onClose={() => closeWindow(winId)}
      onMinimize={() => minimizeWindow(winId)}
      constraintsRef={constraintsRef}
    >
      <div className="flex justify-between items-center px-4 py-2 bg-[#1a1215] border-b border-[#2b1822] cursor-grab active:cursor-grabbing window-titlebar">
        <span className="text-[10px] font-bold text-emerald-500 tracking-widest">VIEWER_NODE_PRIMARY</span>
        <div className="flex gap-1.5">
          {/* Hacker minimalist buttons */}
          <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onClick={(e) => { e.stopPropagation(); minimizeWindow(winId); }}>
            <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
          </button>
          <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onClick={(e) => { e.stopPropagation(); closeWindow(winId); }}>
            <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
          </button>
        </div>
      </div>

      <div className="p-10 flex flex-col gap-8 bg-[#110C11] text-slate-400">

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-mono font-bold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
            {data.headline}
          </h1>
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-orange-500 bg-orange-950/40 border border-orange-800/50 uppercase">
              STATUS: {data.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-10">
          <div className="flex flex-col gap-6 text-[14px] font-mono text-slate-400 leading-relaxed">
            <p>{data.desc1}</p>
            <p>{data.desc2}</p>
          </div>

          {/* Interactive Gallery Trigger */}
          <div
            onClick={openGallery}
            className="w-full group cursor-pointer flex items-center justify-center bg-[#0a0608] border border-[#2b1822] min-h-[220px] relative shadow-inner overflow-hidden"
          >
            {data.previewImg ? (
              <img src={data.previewImg} alt="Project Preview" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-luminosity" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1215] to-[#110C11] opacity-50 pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>
            )}
            
            {/* Hacker terminal green tint overlay */}
            <div className="absolute inset-0 bg-emerald-900/20 mix-blend-color pointer-events-none"></div>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none transition-all group-hover:bg-transparent group-hover:backdrop-blur-0"></div>

            <div className="absolute bottom-4 mx-auto bg-[#110c11]/90 text-emerald-400 border border-emerald-800/80 px-5 py-2 font-mono font-bold text-xs flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_15px_rgba(52,211,153,0.6)] group-hover:bg-emerald-950/80 transition-all pointer-events-none backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px]">fullscreen</span>
              VIEW_GALLERY
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-mono font-bold text-orange-500 tracking-widest mb-4 uppercase">TECHNOLOGIES_UTILIZED:</h3>
          <div className="flex flex-wrap gap-3">
            {data.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 text-[11px] font-mono font-bold tracking-widest text-emerald-500 bg-emerald-950/20 border border-emerald-900/50 uppercase">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end mt-4 pt-8 border-t border-[#2b1822]">
          <div className="flex gap-4">
            <button className="px-6 py-3 font-mono font-bold text-xs bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all flex items-center gap-2 uppercase tracking-wide">
              <span className="tracking-tighter font-extrabold">&lt;&gt;</span> ACCESS_SOURCE_CODE
            </button>
            <button className="px-6 py-3 font-mono font-bold text-xs bg-transparent text-emerald-500 border border-[#331C24] hover:bg-[#1a1215] transition-colors flex items-center gap-2 uppercase tracking-wide">
              <span className="material-symbols-outlined text-[16px]">public</span> VIEW_LIVE_DEPLOYMENT
            </button>
          </div>
          <div className="flex flex-col items-end text-[10px] font-mono text-emerald-700/60 tracking-wider">
            <span className="uppercase mb-1">LAST_PUSH:</span>
            <span>{data.lastPush}</span>
          </div>
        </div>

      </div>
    </WindowFrame>
  );
}

function GalleryLightbox({ pid, onClose }) {
  const data = PROJECTS[pid];
  const [idx, setIdx] = useState(0);
  const max = data.images ? data.images.length : 3;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-12"
      style={{ backgroundColor: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div className="w-full max-w-5xl h-full flex flex-col bg-slate-900 border border-slate-700 shadow-2xl relative overflow-hidden font-sans" style={{ borderRadius: 8 }}>
        <div className="p-4 flex justify-between items-center border-b border-slate-800 shrink-0">
          <div className="flex flex-col">
            <span className="text-slate-100 font-bold tracking-wider">{data.headline} // GALLERY</span>
            <span className="text-slate-500 text-xs mt-1">IMG_{idx + 1} OF {max}</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors" onClick={onClose}>
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center relative p-8 text-white">
          <button 
            className={`absolute left-4 sm:left-8 z-20 ${idx === 0 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-white transition-colors'}`} 
            disabled={idx === 0}
            onClick={() => setIdx(i => Math.max(0, i - 1))}
          >
            <span className="material-symbols-outlined text-[48px]">chevron_left</span>
          </button>

          <motion.div
            key={`${pid}-${idx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-4xl aspect-[16/9] flex items-center justify-center bg-slate-800 border border-slate-700 shadow-lg relative rounded overflow-hidden"
          >
            {data.images && data.images[idx] ? (
              <img src={data.images[idx]} alt={`${data.headline} screenshot ${idx + 1}`} className="w-full h-full object-contain" />
            ) : (
              <span className="material-symbols-outlined text-slate-600 text-[120px]">image</span>
            )}
            <span className="absolute bottom-4 right-4 bg-slate-900/80 px-3 py-1.5 text-slate-400 text-xs font-mono font-bold rounded shadow-md border border-slate-700">
              {data.imgText}_FRAME_{idx + 1}
            </span>
          </motion.div>

          <button 
            className={`absolute right-4 sm:right-8 z-20 ${idx === max - 1 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-500 hover:text-white transition-colors'}`} 
            disabled={idx === max - 1}
            onClick={() => setIdx(i => Math.min(max - 1, i + 1))}
          >
            <span className="material-symbols-outlined text-[48px]">chevron_right</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const SYSTEM_SKILLS = [
  { name: 'JavaScript', val: 90 },
  { name: 'React', val: 85 },
  { name: 'Python', val: 70 },
  { name: 'UI/UX', val: 80 },
  { name: 'Node.js', val: 75 }
];

function LinuxTerminalPanel({ compact = false }) {
  return (
    <div className="w-full font-mono text-emerald-500 leading-snug flex flex-col justify-start" style={{ fontSize: compact ? 10.5 : 12 }}>
      <div className="flex items-center justify-between mb-4 uppercase tracking-widest text-[#37e865] font-bold">
        <span>PROFILE-SHELL V4.2</span>
        <span className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-[#37e865] animate-pulse"></span>ONLINE</span>
      </div>

      <pre className="whitespace-pre overflow-hidden text-emerald-400 mb-4 pb-4 border-b border-emerald-900/50 opacity-90 tracking-tighter" style={{ fontSize: compact ? 8.5 : 10, lineHeight: compact ? 1.02 : 1.12 }} aria-label="ASCII art logo">
{TERMINAL_ASCII}
      </pre>

      <div className="mb-4 pb-4 border-b border-emerald-900/50 w-full">
        <div className="mb-2.5 text-[#37e865] font-bold tracking-widest">$ SKILLS --SUMMARY</div>
        <div className="flex flex-col gap-2 w-full pr-2">
          {SYSTEM_SKILLS.map((skill) => {
            return (
              <div key={skill.name} className="flex items-center gap-4 text-emerald-50 font-medium">
                <span className="w-24 shrink-0">{skill.name}</span>
                <div className="flex-1 h-2.5 border border-emerald-900/50 bg-emerald-950/30 relative">
                  <div className="absolute left-0 top-0 h-full bg-[#83ff8f]" style={{ width: `${skill.val}%` }}></div>
                </div>
                <span className="w-10 text-right">{skill.val}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-1.5 text-emerald-100 font-medium">
        <div className="text-[#37e865] font-bold tracking-widest">$ WHOAMI</div>
        <div className="leading-relaxed">Building polished interfaces, robust APIs, and practical AI features.</div>
        <div className="text-[#37e865]">$ <span className="animate-pulse">_</span></div>
      </div>
    </div>
  );
}

function GitHubPanel() {
  const [githubData, setGithubData] = useState({ total: 0, weeks: [], username: 'github' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const levelMap = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const levelStyles = [
    { backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' },
    { backgroundColor: 'rgba(16, 185, 129, 0.35)', borderColor: 'rgba(16, 185, 129, 0.35)' },
    { backgroundColor: 'rgba(16, 185, 129, 0.65)', borderColor: 'rgba(16, 185, 129, 0.65)' },
    { backgroundColor: '#2dd4bf', borderColor: '#2dd4bf' },
    { backgroundColor: '#6ee7b7', borderColor: '#6ee7b7', boxShadow: '0 0 5px rgba(110,231,183,0.5)' },
  ];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) {
          throw new Error('VITE_GITHUB_TOKEN is missing');
        }

        const query = `
          query {
            viewer {
              login
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionLevel
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const json = await response.json();
        
        if (!response.ok || json.errors) {
          throw new Error(json.message || json.errors?.[0]?.message || 'GraphQL Error');
        }

        const viewer = json.data?.viewer;
        const calendar = viewer?.contributionsCollection?.contributionCalendar;
        if (calendar) {
          const formattedWeeks = calendar.weeks.map((week) =>
            week.contributionDays.map((day) => levelMap[day.contributionLevel] ?? 0)
          );
          // 28 weeks exactly fills the 330px grid width with a gap of ~1.85px 
          const visibleWeeks = formattedWeeks.slice(-28);

          setGithubData({
            total: calendar.totalContributions,
            weeks: visibleWeeks,
            username: viewer.login || 'github',
          });
        }
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  return (
    <div className="w-full font-mono text-emerald-500 leading-snug flex flex-col justify-start">
      <div className="flex items-center justify-between pt-4 mb-4 font-bold uppercase tracking-widest text-[#37e865] text-[10px]">
        <span>$ FETCH GITHUB.COM/{loading ? '...' : githubData.username}</span>
        <span className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 ${error ? 'bg-red-500' : 'bg-[#37e865] animate-pulse'}`}></span>
          {error ? 'OFFLINE' : 'ONLINE'}
        </span>
      </div>

      {loading || error ? (
        <div className="text-[#37e865] font-bold tracking-widest text-[9px] h-[92px] flex items-center justify-center w-full border border-emerald-900/50 bg-emerald-950/20 uppercase">
          {error ? 'ERR: NO_TOKEN_DETECTED' : 'ESTABLISHING_LINK...'}
        </div>
      ) : (
        <>
          <div className="flex gap-[4px] border border-emerald-900/50 p-[8px] w-full mb-3 bg-emerald-950/20">
            <div className="w-[18px] text-[7px] font-bold tracking-widest text-emerald-700 select-none shrink-0 flex flex-col justify-between items-end pr-[2px] uppercase">
              <div className="h-[10px] leading-[10px]">Sun</div>
              <div className="h-[10px] leading-[10px]">Mon</div>
              <div className="h-[10px] leading-[10px]">Tue</div>
              <div className="h-[10px] leading-[10px]">Wed</div>
              <div className="h-[10px] leading-[10px]">Thu</div>
              <div className="h-[10px] leading-[10px]">Fri</div>
              <div className="h-[10px] leading-[10px]">Sat</div>
            </div>

            <div className="flex flex-1 justify-between">
              {githubData.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[2px]">
                  {week.map((level, dayIdx) => (
                    <div
                      key={`${weekIdx}-${dayIdx}`}
                      className="w-[9px] h-[9px] border"
                      style={levelStyles[level]}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[6px] text-emerald-700 font-bold uppercase text-[7px] tracking-widest">
              <span>Min</span>
              {levelStyles.map((style, idx) => (
                <span
                  key={`legend-${idx}`}
                  className="w-[9px] h-[9px] border"
                  style={style}
                ></span>
              ))}
              <span>Max</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
