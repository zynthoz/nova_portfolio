import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // if any

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
    headline: 'NEURAL LINK PROXY',
    status: 'OPERATIONAL',
    desc1: 'A high-performance cryptographic relay system designed for decentralized neural architectures. This project implements a multi-layered obfuscation protocol to secure bi-directional data flow between synthetic cortexes and global mesh networks.',
    desc2: 'Engineered with hardware-level security constraints, bypassing standard TCP/IP overhead to achieve sub-millisecond latency in high-density interference zones.',
    imgText: 'ENCRYPTION_MATRIX_ACTIVE',
    tags: ['PYTHON_CORE', 'RUST_RUNTIME', 'SOLIDITY_MESH', 'GRPC_TRANSPORT'],
    lastPush: '2024.11.08',
  },
  'window-project-2': {
    headline: 'QUANTUM DATA VAULT',
    status: 'ARCHIVED',
    desc1: 'Distributed hyper-ledger storage optimized for zero-knowledge proofs. Utilizes experimental shard-packing to reduce quantum decryption vectors.',
    desc2: 'Built for enterprise resilience with self-healing data nodes.',
    imgText: 'QUANTUM_VAULT_ACTIVE',
    tags: ['GO_LANG', 'POSTGRES_X', 'REDIS_CACHE'],
    lastPush: '2023.09.12',
  },
  'window-project-3': {
    headline: 'SYNTHETIC CORTEX AI',
    status: 'IN DEVELOPMENT',
    desc1: 'A generative adversarial network structured to emulate basic emotional responses in automated support channels.',
    desc2: 'Testing reveals a 40% increase in human-perceived empathy during interactions.',
    imgText: 'NEURAL_NET_TRAINING',
    tags: ['PYTORCH', 'TENSORFLOW', 'CUDA'],
    lastPush: '2024.01.20',
  },
  'window-project-4': {
    headline: 'GHOST SHELL KERNEL',
    status: 'OPERATIONAL',
    desc1: 'A minimal operating system shell running in WebAssembly, providing an immersive CRT aesthetic and sandboxed terminal environments.',
    desc2: 'Features hardware-accelerated transitions, custom drag constraints, and a complete virtual filesystem layer.',
    imgText: 'WASM_KERN_INIT',
    tags: ['REACT_19', 'VITE', 'FRAMER_MOTION', 'TAILWIND_CSS'],
    lastPush: '2024.04.03',
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
          <DesktopIcon icon="code" label="PROJECT 1" onClick={() => openWindow('window-project-1')} />
          <DesktopIcon icon="code" label="PROJECT 2" onClick={() => openWindow('window-project-2')} />
          <DesktopIcon icon="code" label="PROJECT 3" onClick={() => openWindow('window-project-3')} />
          <DesktopIcon icon="code" label="PROJECT 4" onClick={() => openWindow('window-project-4')} />
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
          {[1, 2, 3, 4].map(num => {
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
              className="w-[700px] h-auto max-h-[85vh] border border-slate-300 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans bg-white flex flex-col"
              initLeft="calc(50% - 350px)" initTop="calc(50% - max-h-[85vh])"
              zIndex={windows['window-about'].zIndex}
              isFocused={focusedId === 'window-about'}
              onFocus={() => focusWindow('window-about')}
              onClose={() => closeWindow('window-about')}
              onMinimize={() => minimizeWindow('window-about')}
              constraintsRef={constraintsRef}
            >
              {/* Clean Title Bar */}
              <div className="flex justify-between items-center px-4 py-2 bg-slate-100 border-b border-slate-300 cursor-grab active:cursor-grabbing w-full shrink-0">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="material-symbols-outlined text-[16px]">account_circle</span>
                  <span className="text-xs font-bold tracking-wider uppercase">Profile_Overview</span>
                </div>
                <div className="flex gap-2.5">
                  <button className="w-[20px] h-[20px] bg-[#28c840] hover:bg-[#21ad37] transition-colors" style={{ borderRadius: '9999px' }} onClick={(e) => { e.stopPropagation(); minimizeWindow('window-about'); }}></button>
                  <button className="w-[20px] h-[20px] bg-[#ff5f57] hover:bg-[#e14842] transition-colors" style={{ borderRadius: '9999px' }} onClick={(e) => { e.stopPropagation(); closeWindow('window-about'); }}></button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 sm:p-10 text-slate-700 bg-white">

                {/* Header Section */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100" style={{ borderRadius: '9999px', overflow: 'hidden' }}>
                    <span className="material-symbols-outlined text-6xl opacity-80" style={{ marginTop: '10px' }}>face</span>
                  </div>
                  <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2" style={{ textShadow: 'none' }}>Aaron Gabriel Lim</h1>
                    <p className="text-base text-blue-600 font-bold mb-3 tracking-wide">BS Information Technology, 2nd Year @ UST</p>
                    <div className="flex gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide bg-slate-100 px-3 py-1.5 text-slate-600 uppercase">
                        <span className="material-symbols-outlined text-[14px]">location_on</span> Metro Manila, PH
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold tracking-wide bg-emerald-50 text-emerald-700 px-3 py-1.5 border border-emerald-100 uppercase shadow-sm">
                        Open to Opportunities
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="space-y-10">

                  {/* Intro */}
                  <section>
                    <p className="text-[15px] leading-relaxed text-slate-600 font-medium" style={{ textShadow: 'none' }}>
                      I have a genuine passion for writing code — not just as a skill, but as something I genuinely can't put down. I build, I break things, I learn, and I build again. That drive is what makes me the kind of developer who shows up not because they have to, but because they <strong className="text-blue-600 font-bold px-1 rounded bg-blue-50">want to</strong>.
                    </p>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* What I Bring */}
                    <section>
                      <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4" style={{ textShadow: 'none' }}>What I Bring</h2>
                      <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-blue-500 shrink-0 mt-0.5">bolt</span>
                          <span className="text-sm text-slate-600 leading-relaxed"><strong className="text-slate-800">Fast learner</strong> — actively follow tech trends and continuously upskill outside the classroom.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-blue-500 shrink-0 mt-0.5">local_fire_department</span>
                          <span className="text-sm text-slate-600 leading-relaxed"><strong className="text-slate-800">Self-motivated</strong> — coding isn't a chore for me; it's how I spend my free time.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-blue-500 shrink-0 mt-0.5">trending_up</span>
                          <span className="text-sm text-slate-600 leading-relaxed"><strong className="text-slate-800">Growth mindset</strong> — early in my career, but investing heavily in getting better every day.</span>
                        </li>
                      </ul>
                    </section>

                    {/* Current Focus */}
                    <section>
                      <h2 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4" style={{ textShadow: 'none' }}>Currently Focused On</h2>
                      <ul className="space-y-4">
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-emerald-500 shrink-0 mt-0.5">code</span>
                          <span className="text-sm text-slate-600 leading-relaxed">Deepening my knowledge in software development via rigorous practical application.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-emerald-500 shrink-0 mt-0.5">explore</span>
                          <span className="text-sm text-slate-600 leading-relaxed">Keeping up with the latest in tech — frameworks, tools, and industry shifts.</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <span className="material-symbols-outlined text-[20px] text-emerald-500 shrink-0 mt-0.5">work</span>
                          <span className="text-sm text-slate-600 leading-relaxed">Actively looking for internships and entry-level collaborations in a real-world setting.</span>
                        </li>
                      </ul>
                    </section>
                  </div>

                  {/* Closing Banner */}
                  <section className="bg-slate-50 border border-slate-200 p-6 text-center shadow-inner" style={{ borderRadius: '8px' }}>
                    <p className="text-[15px] font-semibold text-slate-700 tracking-wide" style={{ textShadow: 'none' }}>
                      "I'm just getting started — and that's exactly what makes this exciting."
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
              className="sys-log w-[400px] h-[460px] pointer-events-auto"
              initLeft="calc(100% - 400px)" initTop="0px"
              zIndex={windows['window-terminal'].zIndex}
              isFocused={focusedId === 'window-terminal'}
              onFocus={() => focusWindow('window-terminal')}
              onClose={() => closeWindow('window-terminal')}
              onMinimize={() => minimizeWindow('window-terminal')}
              constraintsRef={constraintsRef}
            >
              <div className="window-titlebar" style={{ cursor: 'grab' }}>
                <div className="title-left text-primary-container">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>terminal</span>
                  <span>aaron@arch:~</span>
                </div>
                <div className="title-controls">
                  <button className="window-btn window-btn--minimize" onPointerDown={e => { e.stopPropagation(); minimizeWindow('window-terminal'); }}><span className="material-symbols-outlined">remove</span></button>
                  <button className="window-btn window-btn--close" onPointerDown={e => { e.stopPropagation(); closeWindow('window-terminal'); }}><span className="material-symbols-outlined">close</span></button>
                </div>
              </div>
              <LinuxTerminalPanel />
            </WindowFrame>
          )}

          {windows['window-github']?.state === 'open' && (
            <WindowFrame
              key={`window-github-${windows['window-github'].bootNonce || 0}`}
              id="window-github"
              className="sys-log w-[400px] h-[235px] pointer-events-auto overflow-hidden bg-[var(--color-surface-dim)]"
              initLeft="calc(100% - 400px)" initTop="480px"
              zIndex={windows['window-github'].zIndex}
              isFocused={focusedId === 'window-github'}
              onFocus={() => focusWindow('window-github')}
              onClose={() => closeWindow('window-github')}
              onMinimize={() => minimizeWindow('window-github')}
              constraintsRef={constraintsRef}
            >
              <div className="window-titlebar" style={{ cursor: 'grab' }}>
                <div className="title-left text-primary-container">
                  <span className="material-symbols-outlined" style={{ fontSize: 14 }}>grid_on</span>
                  <span>contributions.view</span>
                </div>
                <div className="title-controls">
                  <button className="window-btn window-btn--minimize" onPointerDown={e => { e.stopPropagation(); minimizeWindow('window-github'); }}><span className="material-symbols-outlined">remove</span></button>
                  <button className="window-btn window-btn--close" onPointerDown={e => { e.stopPropagation(); closeWindow('window-github'); }}><span className="material-symbols-outlined">close</span></button>
                </div>
              </div>
              <GitHubPanel />
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
      className="w-[750px] h-[auto] border border-slate-300 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] font-sans"
      initLeft="calc(50% - 375px)" initTop="calc(50% - max-h-[85vh])"
      zIndex={winState.zIndex}
      isFocused={focusedId === winId}
      onFocus={() => focusWindow(winId)}
      onClose={() => closeWindow(winId)}
      onMinimize={() => minimizeWindow(winId)}
      constraintsRef={constraintsRef}
    >
      <div className="flex justify-between items-center px-4 py-2 bg-slate-100 border-b border-slate-300 cursor-grab active:cursor-grabbing window-titlebar">
        <span className="text-xs font-bold text-slate-500 tracking-wider">PROJECT_VIEWER</span>
        <div className="flex gap-2.5">
          <button className="w-[20px] h-[20px] bg-[#28c840] hover:bg-[#21ad37] transition-colors" style={{ borderRadius: '9999px' }} onClick={(e) => { e.stopPropagation(); minimizeWindow(winId); }}></button>
          <button className="w-[20px] h-[20px] bg-[#ff5f57] hover:bg-[#e14842] transition-colors" style={{ borderRadius: '9999px' }} onClick={(e) => { e.stopPropagation(); closeWindow(winId); }}></button>
        </div>
      </div>

      <div className="p-10 flex flex-col gap-8 bg-white">

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none" style={{ textShadow: 'none' }}>
            {data.headline}
          </h1>
          <div>
            <span className="inline-block px-3 py-1.5 text-xs font-bold tracking-wide text-blue-700 bg-blue-50 border border-blue-200 shadow-sm" style={{ textShadow: 'none' }}>
              STATUS: {data.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1.1fr_1fr] gap-10">
          <div className="flex flex-col gap-6 text-[15px] font-medium text-slate-600 leading-relaxed" style={{ textShadow: 'none' }}>
            <p>{data.desc1}</p>
            <p>{data.desc2}</p>
          </div>

          {/* Interactive Gallery Trigger Placeholder */}
          <div
            onClick={openGallery}
            className="w-full group cursor-pointer flex items-center justify-center bg-slate-50 border border-slate-200 min-h-[220px] relative shadow-inner overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 opacity-50 pointer-events-none group-hover:scale-105 transition-transform duration-500"></div>

            <div className="relative z-10 flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[32px] text-slate-400 group-hover:text-blue-500 transition-colors">photo_library</span>
              <span className="text-sm font-semibold tracking-widest text-slate-500 group-hover:text-blue-600 transition-colors px-4 text-center" style={{ textShadow: 'none' }}>
                [ {data.imgText} Media ]
              </span>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-5 py-2 font-bold text-xs flex items-center gap-2 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
              <span className="material-symbols-outlined text-[14px]">fullscreen</span>
              VIEW GALLERY
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-slate-400 tracking-widest mb-4 uppercase" style={{ textShadow: 'none' }}>Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1.5 text-xs font-bold tracking-wide text-slate-600 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors cursor-default shadow-sm" style={{ textShadow: 'none' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end mt-4 pt-8 border-t border-slate-100">
          <div className="flex gap-4">
            <button className="px-6 py-3 font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
              VIEW SOURCE
            </button>
            <button className="px-6 py-3 font-bold text-sm bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-2">
              LIVE DEPLOYMENT
            </button>
          </div>
          <div className="flex flex-col items-end text-[10px] text-slate-400 font-medium tracking-wide">
            <span className="uppercase">Last Update</span>
            <span className="font-mono mt-0.5">{data.lastPush}</span>
          </div>
        </div>

      </div>
    </WindowFrame>
  );
}

function GalleryLightbox({ pid, onClose }) {
  const data = PROJECTS[pid];
  const [idx, setIdx] = useState(0);
  const max = 3;

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

        <div className="flex-1 flex items-center justify-center relative p-8">
          <button className="absolute left-4 sm:left-8 text-slate-500 hover:text-white transition-colors z-20" onClick={() => setIdx(i => Math.max(0, i - 1))}>
            <span className="material-symbols-outlined text-[48px]">chevron_left</span>
          </button>

          <motion.div
            key={`${pid}-${idx}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl aspect-[16/9] flex items-center justify-center bg-slate-800 border border-slate-700 shadow-lg relative rounded"
          >
            <span className="material-symbols-outlined text-slate-600 text-[120px]">image</span>
            <span className="absolute bottom-4 right-4 bg-slate-900/80 px-3 py-1.5 text-slate-400 text-xs font-mono font-bold rounded">
              {data.imgText}_FRAME_{idx + 1}
            </span>
          </motion.div>

          <button className="absolute right-4 sm:right-8 text-slate-500 hover:text-white transition-colors z-20" onClick={() => setIdx(i => Math.min(max - 1, i + 1))}>
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
    <div className="window-content scrollable" style={{ padding: compact ? 12 : 16 }}>
      <div className="font-mono text-[#8bff9f] leading-snug" style={{ fontSize: compact ? 11 : 13 }}>
        <div className="flex items-center justify-between mb-3 uppercase tracking-wider text-[#6bdf7e]">
          <span>profile-shell v4.2</span>
          <span className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-[var(--color-primary-container)] animate-pulse"></span>online</span>
        </div>

        <pre className="whitespace-pre overflow-x-auto text-[#97ffaa] mb-3 pb-2 border-b border-[var(--color-primary-container)]/30 opacity-90" style={{ fontSize: compact ? 9 : 12, lineHeight: compact ? 1.1 : 1.15 }} aria-label="ASCII art logo">
{TERMINAL_ASCII}
        </pre>

        <div className="mb-3 pb-3 border-b border-[var(--color-primary-container)]/30">
          <div className="mb-2 text-[#6bdf7e]">$ skills --summary</div>
          <div className="flex flex-col gap-2">
            {SYSTEM_SKILLS.map((skill) => {
              return (
                <div key={skill.name} className="flex items-center gap-3">
                  <span className="w-24 shrink-0">{skill.name}</span>
                  <div className="flex-1 h-3 border border-[var(--color-primary-container)]/40 bg-[var(--color-primary-container)]/10 relative">
                    <div className="absolute left-0 top-0 h-full bg-[#83ff8f]" style={{ width: `${skill.val}%` }}></div>
                  </div>
                  <span className="w-11 text-right">{skill.val}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-1 text-[#6bdf7e]">
          <div>$ whoami</div>
          <div className="text-[#96eca6]">Building polished interfaces, robust APIs, and practical AI features.</div>
          <div>$ _</div>
        </div>
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
    { backgroundColor: 'rgba(107, 223, 126, 0.05)', borderColor: 'rgba(107, 223, 126, 0.2)' },
    { backgroundColor: 'rgba(107, 223, 126, 0.35)', borderColor: 'rgba(107, 223, 126, 0.35)' },
    { backgroundColor: 'rgba(107, 223, 126, 0.65)', borderColor: 'rgba(107, 223, 126, 0.65)' },
    { backgroundColor: '#6bdf7e', borderColor: '#6bdf7e' },
    { backgroundColor: '#97ffaa', borderColor: '#97ffaa', boxShadow: '0 0 5px rgba(151,255,170,0.5)' },
  ];

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        // You'll need to create a .env file with VITE_GITHUB_TOKEN=your_github_pat
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
    <div className="window-content p-4 h-full font-mono text-[#8bff9f] leading-snug">
      <div className="flex items-center justify-between mb-3 uppercase tracking-wider text-[#6bdf7e] text-[13px]">
        <span>$ fetch github.com/{loading ? '...' : githubData.username}</span>
        <span className="flex items-center gap-2">
          <span className={`inline-block w-2 h-2 ${error ? 'bg-red-500' : 'bg-[var(--color-primary-container)] animate-pulse'}`}></span>
          {error ? 'OFFLINE' : 'ONLINE'}
        </span>
      </div>

      {loading || error ? (
        <div className="text-[var(--color-primary-container)] text-xs h-[140px] flex items-center justify-center w-full border border-[var(--color-primary-container)]/30 bg-[var(--color-primary-container)]/5 uppercase">
          {error ? 'ERR: NO_TOKEN_DETECTED' : 'ESTABLISHING_LINK...'}
        </div>
      ) : (
        <>
          <div className="flex gap-[4px] border border-[var(--color-primary-container)]/30 p-[8px] w-full mb-3 bg-[var(--color-primary-container)]/5">
            <div className="w-[18px] text-[8px] text-[#6bdf7e]/80 select-none shrink-0 flex flex-col justify-between items-end pr-[2px] uppercase">
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
                      className="w-[10px] h-[10px] border"
                      style={levelStyles[level]}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-[1.875rem]">
            <div className="flex items-center gap-[6px] text-[#6bdf7e] uppercase text-[9px] tracking-widest">
              <span>Min</span>
              {levelStyles.map((style, idx) => (
                <span
                  key={`legend-${idx}`}
                  className="w-[10px] h-[10px] border"
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
