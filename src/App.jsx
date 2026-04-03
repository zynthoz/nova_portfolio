import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // if any

const BOOT_LINES = [
  { text: 'PHOSPHOR_OS_V.1.0.4 — BOOTING...', cls: 'log-line--focus' },
  { text: '> Initializing neural link...',     cls: 'log-line--focus' },
  { text: '> Loading kernel_modules         [OK]',        cls: 'log-line' },
  { text: '> Establishing secure_proxy      [ENCRYPTED]', cls: 'log-line' },
  { text: '> Mounting /dev/sda1 → /root/portfolio',      cls: 'log-line' },
  { text: '> Checking dependency graph      [MATCHED]',   cls: 'log-line' },
  { text: '> Rendering Phosphor display...',  cls: 'log-line--focus' },
  { text: 'System ready. Waiting for input', cls: 'log-line--focus', blink: true },
];

const VIM_LINES = [
  <span className="vim-comment"># PROFILE_OVERVIEW</span>,
  <br/>,
  <span><span className="vim-text">I am a </span><span className="vim-link">Senior Systems Architect &amp; Creative Technologist</span><span className="vim-text"> with a passion for building secure, high-performance digital experiences.</span></span>,
  <br/>,
  <span className="vim-comment">## CORE_STRENGTHS</span>,
  <span className="vim-muted">- Low-latency System Design</span>,
  <span className="vim-muted">- Cyber-Security Integration</span>,
  <span className="vim-muted">- Experimental UI/UX Prototyping</span>,
  <br/>,
  <span style={{color:'var(--color-primary-container)',filter:'brightness(1.25)'}}>-- INSERT -- <span className="cursor-block"></span></span>
];

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now  = new Date();
      const h    = String(now.getHours()).padStart(2, '0');
      const m    = String(now.getMinutes()).padStart(2, '0');
      const s    = String(now.getSeconds()).padStart(2, '0');
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

function BootSequence({ containerId }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    let unmounted = false;
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        if (!unmounted) {
          setLines(prev => [...prev, line]);
        }
      }, 900 + i * 280);
    });
    return () => { unmounted = true; };
  }, []);

  return (
    <div className="sys-log-body" id={containerId} aria-live="polite">
      {lines.map((line, idx) => (
        <motion.p
          key={idx}
          className={line.cls}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          dangerouslySetInnerHTML={{ __html: line.blink ? line.text + '<span class="cursor-block"></span>' : line.text }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [windows, setWindows] = useState({
    'window-about': { id: 'window-about', state: 'open', zIndex: 20 },
    'window-files': { id: 'window-files', state: 'open', zIndex: 20 },
    'window-terminal': { id: 'window-terminal', state: 'open', zIndex: 20 },
  });
  
  const [focusedId, setFocusedId] = useState(null);
  const [zTop, setZTop] = useState(20);

  const openWindow = (id) => {
    setZTop(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], state: 'open', zIndex: zTop + 1 }
    }));
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
    if (win.state === 'minimized') {
      openWindow(id);
    } else if (win.state === 'open' && focusedId === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-brand">
          <span className="material-symbols-outlined">monitor_heart</span>
          <span className="truncate">PHOSPHOR_OS_V.1.0.4</span>
        </div>
        <div className="topbar-right">
          <span className="topbar-session hidden sm:inline">SESSION_ACTIVE: OPERATOR_01</span>
          <span className="topbar-session sm:hidden">OP_01</span>
        </div>
      </header>

      {/* MAIN CANVAS */}
      <main className="fixed inset-0 pt-8 pb-12 overflow-hidden bg-vignette" id="main-canvas">
        <DesktopLayout 
          windows={windows} 
          focusedId={focusedId} 
          openWindow={openWindow}
          closeWindow={closeWindow}
          minimizeWindow={minimizeWindow}
          focusWindow={focusWindow}
        />
        <MobileLayout 
          windows={windows}
          openWindow={openWindow}
          closeWindow={closeWindow}
        />
      </main>

      {/* TASKBAR */}
      <nav className="taskbar" aria-label="Taskbar">
        <div className="taskbar-left">
          <button className="taskbar-btn active" id="btn-start" aria-label="Start menu">
            <span className="material-symbols-outlined">grid_view</span>
          </button>
          
          <TaskBarButton id="window-about" icon="person" label="ABOUT" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-about')} />
          <TaskBarButton id="window-terminal" icon="terminal" label="TERMINAL" mobileLabel="TERM" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-terminal')} />
          <TaskBarButton id="window-files" icon="folder" label="FILES" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-files')} />
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
  let cls = 'taskbar-btn';
  if (win.state === 'open' && focusedId === id) cls += ' active';
  else if (win.state === 'minimized') cls += ' taskbar-minimized';

  return (
    <button className={cls} onClick={onClick} aria-label={label}>
      <span className="material-symbols-outlined">{icon}</span>
      <span className="hidden xs:inline sm:inline">
        {mobileLabel ? <>{mobileLabel}<span className="hidden sm:inline">{label.replace(mobileLabel, '')}</span></> : label}
      </span>
    </button>
  );
}

function DesktopLayout({ windows, focusedId, openWindow, closeWindow, minimizeWindow, focusWindow }) {
  const constraintsRef = useRef(null);

  return (
    <div className="hidden sm:flex h-full p-8 relative" ref={constraintsRef}>
      {/* Projects Row (Top) */}
      <nav className="absolute left-8 top-8 flex flex-row flex-wrap gap-8 z-10" aria-label="Projects">
        <DesktopIcon icon="code" label="PROJECT 1" onClick={() => {}} />
        <DesktopIcon icon="code" label="PROJECT 2" onClick={() => {}} />
        <DesktopIcon icon="code" label="PROJECT 3" onClick={() => {}} />
        <DesktopIcon icon="code" label="PROJECT 4" onClick={() => {}} />
      </nav>

      {/* Info Row (Bottom) */}
      <nav className="absolute left-8 bottom-24 flex flex-row flex-wrap gap-8 z-10" aria-label="About">
        <DesktopIcon icon="history_edu" label="EXPERIENCE" onClick={() => openWindow('window-experience')} />
        <DesktopIcon icon="psychology" label="SKILLS"     onClick={() => openWindow('window-skills')} />
        <DesktopIcon icon="terminal" label="CONTACT"    onClick={() => openWindow('window-contact')} />
      </nav>

      {/* Floating windows */}
      <div className="w-full h-full relative z-20 pointer-events-none">
        
        <AnimatePresence>
          {windows['window-about']?.state === 'open' && (
            <WindowFrame 
              key="window-about"
              id="window-about"
              className="vim-window w-[600px] h-[650px] pointer-events-auto"
              initLeft="200px" initTop="80px"
              zIndex={windows['window-about'].zIndex}
              isFocused={focusedId === 'window-about'}
              onFocus={() => focusWindow('window-about')}
              onClose={() => closeWindow('window-about')}
              onMinimize={() => minimizeWindow('window-about')}
              constraintsRef={constraintsRef}
            >
              <div className="window-titlebar vim-titlebar" style={{ cursor: 'grab' }}>
                <div className="title-left">
                  <span className="material-symbols-outlined" style={{fontSize:14}}>edit_note</span>
                  <span>VIM_LITE: /HOME/OPERATOR/ABOUT_ME.MD</span>
                </div>
                <div className="title-controls">
                  <button className="w-4 h-4" style={{background:'rgba(132,150,126,0.2)',border:'1px solid rgba(132,150,126,0.3)'}} onPointerDown={e => {e.stopPropagation(); minimizeWindow('window-about');}}></button>
                  <button className="w-4 h-4 text-[10px] text-surface flex items-center justify-center font-bold" style={{background:'rgba(132,150,126,0.4)'}} onPointerDown={e => {e.stopPropagation(); closeWindow('window-about');}}>X</button>
                </div>
              </div>
              <div className="vim-content flex-1 flex flex-col overflow-y-auto">
                {VIM_LINES.map((content, i) => (
                  <div key={i} className="flex items-start w-full" style={{ lineHeight: '1.6' }}>
                    <div className="w-8 shrink-0 text-right pr-3 select-none" style={{ color: 'rgba(132,150,126,0.4)', fontSize: '10px', paddingTop: '4px' }}>
                      {i + 1}
                    </div>
                    <div className="flex-1" style={{ color: 'rgba(0,255,65,0.9)', paddingLeft: '8px' }}>
                      {content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="window-statusbar vim-statusbar">
                <div className="status-group"><span>[NORMAL]</span><span>ABOUT_ME.MD</span></div>
                <div className="status-group"><span>UTF-8</span><span>LN 8, COL 12</span><span>100%</span></div>
              </div>
            </WindowFrame>
          )}

          {windows['window-files']?.state === 'open' && (
            <WindowFrame 
              key="window-files"
              id="window-files"
              className="w-[500px] h-[350px] pointer-events-auto"
              initLeft="680px" initTop="200px"
              zIndex={windows['window-files'].zIndex}
              isFocused={focusedId === 'window-files'}
              onFocus={() => focusWindow('window-files')}
              onClose={() => closeWindow('window-files')}
              onMinimize={() => minimizeWindow('window-files')}
              constraintsRef={constraintsRef}
            >
              <div className="window-titlebar" style={{ cursor: 'grab' }}>
                <div className="title-left">
                  <span className="material-symbols-outlined" style={{fontSize:14}}>folder_open</span>
                  <span>DIRECTORY: /USERS/OPERATOR/DOCUMENTS</span>
                </div>
                <div className="title-controls">
                  <button className="window-btn" aria-label="Minimize window" onPointerDown={e => {e.stopPropagation(); minimizeWindow('window-files');}}>
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <button className="window-btn" aria-label="Close window" onPointerDown={e => {e.stopPropagation(); closeWindow('window-files');}}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>
              <div className="window-content" style={{padding:24}}>
                <div className="grid grid-cols-3 gap-6 h-full">
                  <div className="file-item" role="button" tabIndex="0">
                    <span className="material-symbols-outlined file-icon-pdf" style={{fontSize:48}}>picture_as_pdf</span>
                    <span className="file-item-name">CV.pdf<br/><span className="file-item-meta">245 KB</span></span>
                  </div>
                  <div className="file-item" role="button" tabIndex="0">
                    <span className="material-symbols-outlined file-icon-url" style={{fontSize:48}}>link</span>
                    <span className="file-item-name">GITHUB_LINK.url<br/><span className="file-item-meta">WEB_ADDRESS</span></span>
                  </div>
                  <div className="file-item" role="button" tabIndex="0">
                    <span className="material-symbols-outlined file-icon-dir" style={{fontSize:48}}>folder</span>
                    <span className="file-item-name">PORTFOLIO_DOCS<br/><span className="file-item-meta">DIR [4 ITEMS]</span></span>
                  </div>
                </div>
              </div>
            </WindowFrame>
          )}

          {windows['window-terminal']?.state === 'open' && (
            <WindowFrame 
               key="window-terminal"
               id="window-terminal"
               className="sys-log w-96 h-48 pointer-events-auto"
               initLeft="calc(100vw - 420px)" initTop="calc(100vh - 300px)"
               zIndex={windows['window-terminal'].zIndex}
               isFocused={focusedId === 'window-terminal'}
               onFocus={() => focusWindow('window-terminal')}
               onClose={() => closeWindow('window-terminal')}
               onMinimize={() => minimizeWindow('window-terminal')}
               constraintsRef={constraintsRef}
            >
              <div className="window-titlebar" style={{ cursor: 'grab' }}>
                <div className="title-left text-primary-container">
                  <span className="material-symbols-outlined" style={{fontSize:14}}>terminal</span>
                  <span>TTY1 : SYSTEM_LOG</span>
                </div>
                <div className="title-controls">
                    <button className="window-btn" onPointerDown={e => {e.stopPropagation(); minimizeWindow('window-terminal');}}><span className="material-symbols-outlined">remove</span></button>
                    <button className="window-btn" onPointerDown={e => {e.stopPropagation(); closeWindow('window-terminal');}}><span className="material-symbols-outlined">close</span></button>
                </div>
              </div>
              <BootSequence containerId="log-desktop" />
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
        <MobileIcon icon="psychology" label="SKILLS" onClick={() => toggleMobile('window-skills')} />
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
                <span className="material-symbols-outlined" style={{fontSize:16}}>person</span>
                <span className="truncate">ABOUT_ME.sys</span>
              </div>
              <button className="window-btn" onClick={() => closeWindow('window-about')}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="about-card-body">
              <div className="flex gap-4 items-start">
                <div className="about-avatar"><span className="material-symbols-outlined">face</span></div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-label" style={{color:'var(--color-primary-container)'}}>Senior Systems Architect</h1>
                  <h2 className="text-micro" style={{color:'var(--color-primary-fixed-dim)'}}>&amp; Creative Technologist</h2>
                  <div className="flex gap-1 mt-1">
                    <span className="about-tag">LOCKED</span>
                    <span className="about-tag">ADMIN</span>
                  </div>
                </div>
              </div>
              <div style={{borderTop:'1px solid rgba(0,255,65,0.2)',paddingTop:12}}>
                <p className="text-micro" style={{lineHeight:1.6,opacity:0.9,color:'var(--color-primary)',letterSpacing:'0.06em'}}>
                  Specializing in high-performance digital architectures and human-machine interface design.
                  Bridging the gap between legacy reliability and experimental aesthetics.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {windows['window-files']?.state === 'open' && (
          <motion.section 
            key="mobile-files"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="window-frame w-full max-w-[450px] flex-1 min-h-0"
          >
            <div className="window-titlebar">
              <div className="title-left">
                <span className="material-symbols-outlined" style={{fontSize:14}}>folder_open</span>
                <span className="truncate">/USERS/OP/DOCS</span>
              </div>
              <div className="title-controls">
                <button className="window-btn" onClick={() => closeWindow('window-files')}><span className="material-symbols-outlined">close</span></button>
              </div>
            </div>
            <div className="window-content scrollable" style={{padding:16}}>
              <div className="grid grid-cols-2 gap-4">
                <div className="file-item"><span className="material-symbols-outlined file-icon-pdf" style={{fontSize:40}}>picture_as_pdf</span><span className="file-item-name" style={{fontSize:9}}>CV.pdf<br/><span className="file-item-meta">245 KB</span></span></div>
                <div className="file-item"><span className="material-symbols-outlined file-icon-dir" style={{fontSize:40}}>folder</span><span className="file-item-name" style={{fontSize:9}}>WORKS<br/><span className="file-item-meta">DIR [4]</span></span></div>
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
            className="sys-log w-full max-w-[450px] h-24 shrink-0 transition-opacity"
          >
            <div className="sys-log-header">
              <div className="sys-log-title"><span className="material-symbols-outlined" style={{fontSize:10}}>terminal</span> SYS_LOG</div>
              <div className="flex gap-2">
                 <span className="sys-log-id">TTY1</span>
                 <button className="window-btn h-auto py-0" onClick={() => closeWindow('window-terminal')}><span className="material-symbols-outlined">close</span></button>
              </div>
            </div>
            <BootSequence containerId="log-mobile" />
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
      <span className="desk-icon-label" style={{fontSize:8}}>{label}</span>
    </div>
  );
}
