import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css'; // if any
import avatarImage from './assets/avatar.png';
import cvPdf from './assets/CV.pdf';

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
  '  ____  ____  _________  ____    ____/ /__ _   __',
  ' / __ `/ __ `/ ___/ __ \\/ __ \\  / __  / _ \\ | / /',
  '/ /_/ / /_/ / /  / /_/ / / / / / /_/ /  __/ |/ / ',
  '\\__,_/\\__,_/_/   \\____/_/ /_/⬤\\__,_/\\___/|___/  ',
  '                                                ',
  '          [ CODE SMART, SHIP FAST ]             '
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
    liveUrl: null,
    githubUrl: 'https://github.com/zynthoz/laundry-esp32-controller',
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
    liveUrl: 'https://albertson.vercel.app',
    githubUrl: null,
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
    liveUrl: 'https://qform.vercel.app',
    githubUrl: 'https://github.com/zynthoz/facility-reservation-system',
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
    liveUrl: 'https://royale-tracker.vercel.app',
    githubUrl: 'https://github.com/zynthoz/clash-app',
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
    liveUrl: 'https://impeto-impeto.vercel.app',
    githubUrl: 'https://github.com/zynthoz/taskhero',
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

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => {
      setEnabled(mediaQuery.matches && window.innerWidth >= 640);
    };

    updateEnabled();
    window.addEventListener('resize', updateEnabled);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateEnabled);
    } else {
      mediaQuery.addListener(updateEnabled);
    }

    return () => {
      window.removeEventListener('resize', updateEnabled);
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateEnabled);
      } else {
        mediaQuery.removeListener(updateEnabled);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('custom-cursor-enabled');
      return;
    }

    document.body.classList.add('custom-cursor-enabled');

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const move = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      targetRef.current.x = x;
      targetRef.current.y = y;
      if (dot) {
        dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    };

    const mouseDown = () => ring.classList.add('is-pressed');
    const mouseUp = () => ring.classList.remove('is-pressed');
    const mouseLeave = () => {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    };
    const mouseEnter = () => {
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    };

    const animateRing = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.2;
      current.y += (target.y - current.y) * 0.2;
      ring.style.transform = `translate3d(${current.x - 16}px, ${current.y - 16}px, 0)`;
      frameRef.current = requestAnimationFrame(animateRing);
    };

    frameRef.current = requestAnimationFrame(animateRing);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseleave', mouseLeave);
    window.addEventListener('mouseenter', mouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-enabled');
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseleave', mouseLeave);
      window.removeEventListener('mouseenter', mouseEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="custom-cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="custom-cursor-ring is-hidden"></div>
      <div ref={dotRef} className="custom-cursor-dot is-hidden"></div>
    </div>
  );
}

const KERNEL_LOGS = [
  "ACPI: Core revision 20230628",
  "PM: Registering ACPI NVS region",
  "PCI: Using host bridge windows from ACPI",
  "smpboot: Allowing 64 CPUs, 32 hotplug CPUs",
  "x86/cpu: VMX (outside TXT) disabled by BIOS",
  "pstore: Registered mce log module",
  "NET: Registered PF_INET protocol family",
  "SCSI subsystem initialized",
  "usbcore: registered new interface driver usbfs",
  "usbcore: registered new device driver usb",
  "Advanced Data Error Correction: Enabled",
  "cryptd: max_cpu_qlen set to 1000",
  "AppArmor: AppArmor initialized",
  "Mount-cache hash table entries: 65536",
  "CPU: Physical Processor ID: 0",
  "CPU: Processor Core ID: 0",
  "mce: CPU supports 22 MCE banks",
  "smmp: SMBIOS 3.0.0 present.",
  "DMI: AARON.DEV Custom Build/Motherboard, BIOS 2.88",
  "rtc_cmos 00:00: RTC can wake from S4",
  "hpet0: at MMIO 0xfed00000, IRQs 2, 8, 0, 3",
  "VFS: Disk quotas cgqfmt_v2, v1",
  "pnp: PnP ACPI init",
  "vgaarb: loaded",
  "SCSI subsystem initialized",
  "libata version 3.00 loaded.",
  "usbcore: registered new interface driver hub",
  "pci 0000:00:02.0: vgaarb: bridge control possible",
  "clocksource: Switched to clocksource tsc",
  "VFS: Mounted root (ext4 filesystem) readonly on device 8:1.",
  "Freeing unused kernel image (initmem) memory: 2048K",
  "Write protecting the kernel read-only data: 24576k"
];

function generateRandomHex() {
  return `0x${Math.floor(Math.random() * 0xffffffff).toString(16).padStart(8, '0')}`;
}

function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    let currentLogs = [];
    let tick = 0;
    
    // Limits DOM nodes to keep performance snappy
    const maxLogs = 60;
    
    const pushLogs = (newLogs) => {
      currentLogs = [...currentLogs, ...newLogs];
      if (currentLogs.length > maxLogs) {
        currentLogs = currentLogs.slice(currentLogs.length - maxLogs);
      }
      setLogs([...currentLogs]);
    };

    const interval = setInterval(() => {
      tick++;
      
      // Stage 1: POST
      if (tick === 1) {
        pushLogs([
          "AARON Megatrends BIOS (C) 2026 AARON.DEV INC.",
          "Verifying system memory................... 65536 MB OK",
          "Initializing CPU cores.................... [ 16 / 16 ] OK",
        ]);
      }
      
      // Stage 2: Initial Mounts
      if (tick === 5) {
        pushLogs([
          "Loading bootloader...",
          "Booting from root filesystem...",
        ]);
      }

      // Stage 3: Burst of Kernel Initialization
      if (tick > 8 && tick < 35) {
        const burst = [];
        // Blast multiples of lines per tick to simulate rapid kernel probing
        const burstAmount = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < burstAmount; i++) {
          const baseStr = KERNEL_LOGS[Math.floor(Math.random() * KERNEL_LOGS.length)];
          const memAddr = generateRandomHex();
          burst.push(`[${(tick * 0.0432).toFixed(6)}] ${baseStr} at ${memAddr}`);
        }
        pushLogs(burst);
      }
      
      // Stage 4: Services
      if (tick === 40) pushLogs(["[ OK ] Reached target Local File Systems."]);
      if (tick === 43) pushLogs(["[ OK ] Started System Logging Service."]);
      if (tick === 46) pushLogs(["[ OK ] Started Network Manager."]);
      if (tick === 49) pushLogs(["[ OK ] Reached target Network."]);
      if (tick === 52) pushLogs(["[ OK ] Started GUI Manager."]);
      if (tick === 56) {
        pushLogs(["", "Starting user session...", "Bypassing security protocols...", "ACCESS GRANTED."]);
      }
      
      if (tick >= 70) {
        clearInterval(interval);
        onComplete();
      }
    }, 45); // Hyper fast 45ms per tick

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
      className="fixed inset-0 z-[99999] bg-[var(--color-background)] bg-vignette p-4 pb-24 sm:p-8 sm:pb-8 overflow-hidden pointer-events-none select-none flex flex-col text-[#28c840] font-mono text-[10px] sm:text-xs md:text-sm leading-[1.3] tracking-tight uppercase"
    >
      {/* CRT / Theme underlays */}
      <div 
        className="absolute inset-0 flex items-center justify-center -z-10 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(40, 200, 64, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40, 200, 64, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      ></div>
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-30" 
        style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)', backgroundSize: '100% 4px' }}
      ></div>

      {/* Top Fixed SysInfo */}
      <div className="flex justify-between w-full border-b border-[#28c840]/30 pb-2 mb-4 shrink-0 drop-shadow-[0_0_5px_rgba(40,200,64,0.5)]">
        <div>
          <span className="font-bold">AARON.DEV OS KERNEL V2.88</span><br/>
          <span className="opacity-70">CPU: QUANTUM NEURAL PROCESSOR @ 6.4GHZ</span><br/>
          <span className="opacity-70">MEM: 64TB DDDR9 / CLK: 9800MHZ</span>
        </div>
        <div className="text-right hidden sm:block">
          <span className="font-bold">[ SYSTEM DIAGNOSTICS ]</span><br/>
          <span className="opacity-70">TEMP: 32°C / NOMINAL</span><br/>
          <span className="opacity-70">VOLT: 1.12V / STABLE</span>
        </div>
      </div>

      {/* ASCII Logo */}
      <div className="shrink-0 mb-3 sm:mb-4 whitespace-pre font-bold text-[var(--color-accent)] drop-shadow-[0_0_8px_rgba(235,188,85,0.6)] leading-none text-[7px] xs:text-[8px] sm:text-[10px] overflow-x-auto">
        {TERMINAL_ASCII}
      </div>

      {/* Scrolling Logs */}
      <div className="flex-1 w-full relative overflow-hidden flex flex-col justify-end">
        <div className="w-full flex-col justify-end">
          {logs.map((log, i) => {
             const isOk = log.includes("[ OK ]");
             const isWarning = log.includes("Bypassing");
             const isGranted = log.includes("ACCESS GRANTED");
             
             let colorClass = "text-[#28c840] opacity-80";
             if (isOk) colorClass = "text-[#28c840] font-bold brightness-125";
             if (isWarning) colorClass = "text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]";
             if (isGranted) colorClass = "text-[var(--color-accent)] font-bold text-xl drop-shadow-[0_0_10px_rgba(235,188,85,0.8)] mt-4";

             return (
               <div key={i} className={`whitespace-nowrap overflow-hidden text-ellipsis ${colorClass}`}>
                 {log}
               </div>
             )
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [windows, setWindows] = useState({
    'window-about': { id: 'window-about', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-terminal': { id: 'window-terminal', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-github': { id: 'window-github', state: 'open', zIndex: 20, bootNonce: 0 },
    'window-project-1': { id: 'window-project-1', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-2': { id: 'window-project-2', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-3': { id: 'window-project-3', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-4': { id: 'window-project-4', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-project-5': { id: 'window-project-5', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-contact': { id: 'window-contact', state: 'closed', zIndex: 20, bootNonce: 0 },
    'window-projects-folder': { id: 'window-projects-folder', state: 'closed', zIndex: 20, bootNonce: 0 },
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

  const minimizeAllWindows = () => {
    setWindows(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        if (next[key].state === 'open') {
          next[key] = { ...next[key], state: 'minimized' };
        }
      });
      return next;
    });
    setFocusedId(null);
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
      <AnimatePresence>
        {isBooting && <BootSequence key="boot-sequence" onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {/* MAIN CANVAS */}
      <main className="fixed inset-0 pt-12 pb-0 sm:pt-0 sm:pb-12 overflow-hidden bg-vignette" id="main-canvas">
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
      </main>

      {/* GALLERY OVERLAY */}
      <AnimatePresence>
        {activeGallery && <GalleryLightbox pid={activeGallery} onClose={() => setActiveGallery(null)} />}
      </AnimatePresence>

      {/* TASKBAR */}
      <nav className="taskbar" aria-label="Taskbar">
        <div className="taskbar-left gap-2 sm:gap-4 flex items-center">
          <button className="taskbar-btn active" id="btn-start" aria-label="Start menu" onClick={minimizeAllWindows}>
            <span className="material-symbols-outlined">grid_view</span>
          </button>

          <TaskBarButton id="window-about" icon="person" label="ABOUT" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-about')} />
          <TaskBarButton id="window-contact" icon="mail" label="CONTACT" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-contact')} className="hidden sm:flex" />
          <TaskBarButton id="window-terminal" icon="terminal" label="TERMINAL" mobileLabel="TERM" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-terminal')} className="hidden sm:flex" />
          <TaskBarButton id="window-github" icon="query_stats" label="STATS" windows={windows} focusedId={focusedId} onClick={() => toggleTaskbar('window-github')} className="hidden sm:flex" />
          <button className="taskbar-btn hidden sm:flex items-center gap-2 px-3 hover:bg-[var(--color-surface-bright)] transition-colors rounded-none outline-none" onClick={() => openExternalApp('https://github.com/zynthoz')}>
            <svg viewBox="0 0 24 24" className="w-[28px] h-[28px]" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.24.78-.54 0-.27-.01-.98-.02-1.92-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.19 1.18a11.1 11.1 0 0 1 5.81 0c2.22-1.49 3.19-1.18 3.19-1.18.63 1.6.24 2.78.12 3.07.74.8 1.19 1.82 1.19 3.08 0 4.43-2.69 5.4-5.26 5.69.41.35.78 1.03.78 2.08 0 1.5-.01 2.71-.01 3.08 0 .3.2.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg><span className="text-[14px] font-bold tracking-wide">GITHUB</span>
          </button>
          <button className="taskbar-btn hidden sm:flex items-center gap-2 px-3 hover:bg-[var(--color-surface-bright)] transition-colors rounded-none outline-none" onClick={() => openExternalApp('https://linkedin.com/in/aarongabriellim')}>
            <svg viewBox="0 0 24 24" className="w-[30px] h-[30px]" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5A2.49 2.49 0 0 0 2.5 6c0 1.37 1.1 2.48 2.48 2.48A2.49 2.49 0 0 0 7.46 6 2.49 2.49 0 0 0 4.98 3.5ZM2.97 9.5h4.03V21H2.97V9.5Zm6.52 0h3.86v1.57h.06c.54-1.02 1.85-2.1 3.8-2.1 4.06 0 4.8 2.67 4.8 6.14V21h-4.02v-5.23c0-1.25-.02-2.86-1.74-2.86-1.75 0-2.02 1.36-2.02 2.77V21H9.49V9.5Z" />
            </svg><span className="text-[14px] font-bold tracking-wide">LINKEDIN</span>
          </button>
        </div>
        <div className="taskbar-clock">
          <Clock />
        </div>
      </nav>
      <CustomCursor />
    </>
  );
}

function TaskBarButton({ id, icon, label, mobileLabel, windows, focusedId, onClick, className }) {
  const win = windows[id] || { state: 'closed' };
  const isRunning = win.state === 'open' || win.state === 'minimized';
  const isFocused = win.state === 'open' && focusedId === id;
  let cls = `taskbar-btn ${className || ''}`;

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
    <div className="flex h-full p-4 sm:p-8 relative" ref={constraintsRef}>   
      {/* Desktop Main Icon Grid */}
      <nav className="absolute left-2 sm:left-8 right-2 sm:right-auto top-4 sm:top-8 bottom-24 flex flex-col sm:flex-row justify-start sm:justify-start gap-6 sm:gap-12 z-10 py-2 w-[calc(100%-1rem)] sm:w-auto px-2 sm:px-0" aria-label="Desktop icons">
        
        {/* Mobile-only Header ASCII */}
        <div className="sm:hidden w-full flex flex-col items-center justify-center mt-8 mb-4 select-none pointer-events-none">
          <pre className="font-mono text-[#28c840] font-bold tracking-tighter text-[min(2.5vw,14px)] leading-[1.15] drop-shadow-[0_0_12px_rgba(40,200,64,0.7)] text-center">
            {TERMINAL_ASCII}
          </pre>
        </div>

        {/* Mobile-only Icons (3 columns via flex) */}
        <div className="sm:hidden flex w-full justify-around items-start px-2">
          <DesktopIcon icon="folder" label="PROJECTS" onClick={() => openWindow('window-projects-folder')} />
          <DesktopIcon icon="terminal" label="CONTACT" onClick={() => openWindow('window-contact')} />
          <DesktopIcon icon="history_edu" label="EXPERIENCE" onClick={() => openExternalApp(cvPdf)} />
        </div>

        {/* Desktop-only Columns */}
        <div className="hidden sm:flex flex-col gap-10 mt-2 p-2">
          <DesktopIcon icon="local_laundry_service" label="LAUNDRYLINK" onClick={() => openWindow('window-project-1')} isProject />
          <DesktopIcon icon="smart_toy" label="TOOL.AI" onClick={() => openWindow('window-project-2')} isProject />
          <DesktopIcon icon="dynamic_form" label="QFORM" onClick={() => openWindow('window-project-3')} isProject />
          <DesktopIcon icon="sports_esports" label="ROYALE TRACKER" onClick={() => openWindow('window-project-4')} isProject />
          <DesktopIcon icon="swords" label="IMPETO" onClick={() => openWindow('window-project-5')} isProject />
        </div>

        <div className="hidden sm:flex flex-col gap-10 mt-2 p-2">
          <DesktopIcon icon="terminal" label="CONTACT" onClick={() => openWindow('window-contact')} />
          <DesktopIcon icon="history_edu" label="EXPERIENCE" onClick={() => openExternalApp(cvPdf)} />
        </div>

      </nav>

      {/* Floating windows */}
      <div className="w-full h-full relative z-20 pointer-events-none">

        <AnimatePresence>
          {windows['window-projects-folder']?.state === 'open' && (
            <WindowFrame
              key={`window-projects-folder-${windows['window-projects-folder'].bootNonce || 0}`}
              id="window-projects-folder"
              className="w-[320px] max-w-[90vw] h-[auto] max-h-[80vh] border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11] flex flex-col"
              initLeft="50%" initTop="1rem"
              centeredX
              zIndex={windows['window-projects-folder'].zIndex}
              isFocused={focusedId === 'window-projects-folder'}
              onFocus={() => focusWindow('window-projects-folder')}
              onClose={() => closeWindow('window-projects-folder')}
              onMinimize={() => minimizeWindow('window-projects-folder')}
              constraintsRef={constraintsRef}
            >
              {/* Title Bar */}
              <div className="window-titlebar flex justify-between items-center px-4 py-2 bg-[#1a1215] border-b border-[#2b1822] cursor-grab active:cursor-grabbing w-full shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-emerald-500">folder</span>
                  <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">PROJECTS</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); minimizeWindow('window-projects-folder'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
                  </button>
                  <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); closeWindow('window-projects-folder'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-[#110C11]">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 place-items-center mt-2">
                  <DesktopIcon icon="local_laundry_service" label="LAUNDRYLINK" onClick={() => openWindow('window-project-1')} isProject />
                  <DesktopIcon icon="smart_toy" label="TOOL.AI" onClick={() => openWindow('window-project-2')} isProject />
                  <DesktopIcon icon="dynamic_form" label="QFORM" onClick={() => openWindow('window-project-3')} isProject />
                  <DesktopIcon icon="sports_esports" label="ROYALE TRACKER" onClick={() => openWindow('window-project-4')} isProject />
                  <DesktopIcon icon="swords" label="IMPETO" onClick={() => openWindow('window-project-5')} isProject />
                </div>
              </div>
            </WindowFrame>
          )}

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
              className="w-[750px] max-w-[90vw] sm:max-w-[85vw] lg:max-w-[750px] h-auto max-h-[85vh] border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11] flex flex-col"
              initLeft="50%" initTop="8px"
              centeredX
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
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8 pb-8 border-b border-[#2b1822]">
                  <div className="w-28 h-28 bg-[#1a1215] flex items-center justify-center shrink-0 border border-[#2b1822] shadow-inner" style={{ borderRadius: '0', overflow: 'hidden' }}>
                    <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-mono font-bold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)] mb-2">Aaron Gabriel Lim</h1>
                    <p className="text-[13px] text-emerald-600 font-mono font-bold mb-4 tracking-widest uppercase">BS_INFORMATION_TECHNOLOGY // 2ND_YEAR @ UST</p>
                    <div className="flex flex-wrap gap-3">
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
              className="hidden sm:flex w-[400px] max-w-[90vw] sm:max-w-[400px] h-[570px] max-h-[84vh] pointer-events-auto bg-[var(--color-background)] border border-[var(--color-surface-container-highest)] shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono"
              initLeft="calc(100% - min(400px, 90vw))" initTop="10px"
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
              <div className="px-6 pb-8 pt-2 h-[calc(100%-40px)] overflow-hidden flex flex-col justify-start items-start">
                <LinuxTerminalPanel />
              </div>
            </WindowFrame>
          )}

          {windows['window-github']?.state === 'open' && (
            <WindowFrame
              key={`window-github-${windows['window-github'].bootNonce || 0}`}
              id="window-github"
              className="hidden sm:flex w-[400px] h-[235px] pointer-events-auto overflow-hidden bg-[var(--color-background)] border border-[var(--color-surface-container-highest)] shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono"
              initLeft="calc(100% - 400px)" initTop="600px"
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

          {windows['window-contact']?.state === 'open' && (
            <WindowFrame
              key={`window-contact-${windows['window-contact'].bootNonce || 0}`}
              id="window-contact"
              className="w-[94vw] sm:w-[500px] max-w-[500px] h-auto border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11] flex flex-col"
              initLeft="50%" initTop="50%"
              centered
              zIndex={windows['window-contact'].zIndex}
              isFocused={focusedId === 'window-contact'}
              onFocus={() => focusWindow('window-contact')}
              onClose={() => closeWindow('window-contact')}
              onMinimize={() => minimizeWindow('window-contact')}
              constraintsRef={constraintsRef}
            >
              <div className="flex justify-between items-center px-4 py-2 bg-[#1a1215] border-b border-[#2b1822] cursor-grab active:cursor-grabbing w-full shrink-0">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[12px] text-emerald-500">mail</span>
                  <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">COMM_LINK.sys</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="flex items-center justify-center w-7 h-6 bg-[#28c840] hover:bg-[#21ad37] border border-[#28c840] hover:shadow-[0_0_10px_rgba(40,200,64,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); minimizeWindow('window-contact'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">remove</span>
                  </button>
                  <button className="flex items-center justify-center w-7 h-6 bg-[#ff5f57] hover:bg-[#e14842] border border-[#ff5f57] hover:shadow-[0_0_10px_rgba(255,95,87,0.6)] transition-all" onPointerDown={(e) => { e.stopPropagation(); closeWindow('window-contact'); }}>
                    <span className="material-symbols-outlined text-[16px] text-black/90 font-extrabold pb-[0.5px]">close</span>
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-10 flex flex-col gap-4 sm:gap-6 bg-[#110C11] text-slate-400">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
                    INITIALIZE_CONTACT
                  </h1>
                  <p className="text-[11px] sm:text-[12px] text-emerald-600 font-mono font-bold tracking-widest uppercase">
                    SECURE_DIRECT_MESSAGE // INPUT_REQUIRED
                  </p>
                </div>

                <form className="flex flex-col gap-3 sm:gap-5 mt-2 sm:mt-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">ID_IDENTIFIER</label>
                    <input type="text" className="bg-[#1a1215] border border-[#2b1822] p-2.5 sm:p-3 text-emerald-400 font-mono text-[12px] sm:text-[13px] outline-none focus:border-emerald-500 hover:border-[#331C24] transition-colors focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] w-full block" placeholder="[YOUR_NAME]" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">RETURN_ADDRESS</label>
                    <input type="email" className="bg-[#1a1215] border border-[#2b1822] p-2.5 sm:p-3 text-emerald-400 font-mono text-[12px] sm:text-[13px] outline-none focus:border-emerald-500 hover:border-[#331C24] transition-colors focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] w-full block" placeholder="[YOUR_EMAIL]" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-orange-500 tracking-widest uppercase">PAYLOAD</label>
                    <textarea rows="3" className="bg-[#1a1215] border border-[#2b1822] p-2.5 sm:p-3 text-emerald-400 font-mono text-[12px] sm:text-[13px] outline-none focus:border-emerald-500 hover:border-[#331C24] transition-colors focus:shadow-[0_0_10px_rgba(16,185,129,0.1)] resize-y min-h-[88px] sm:min-h-[100px] w-full block" placeholder="[ENTER_MESSAGE_HERE]"></textarea>
                  </div>

                  <button className="mt-3 sm:mt-4 px-6 py-2.5 sm:py-3 font-mono font-bold text-[11px] sm:text-xs bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2 uppercase tracking-wide w-full border border-emerald-400">
                    <span className="material-symbols-outlined text-[16px]">send</span> TRANSMIT_DATA
                  </button>
                </form>

                <div className="mt-3 sm:mt-4 pt-4 sm:pt-6 border-t border-[#2b1822] text-center space-y-2">
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-800 tracking-[0.04em] sm:tracking-widest uppercase break-words">
                    EMAIL: <a href="mailto:aarongplim@gmail.com" className="text-emerald-500 hover:text-emerald-300 underline decoration-emerald-800 underline-offset-4 pointer-events-auto break-all">AARONGPLIM@GMAIL.COM</a>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-800 tracking-[0.04em] sm:tracking-widest uppercase break-words">
                    PHONE: <a href="tel:+639668954561" className="text-emerald-500 hover:text-emerald-300 underline decoration-emerald-800 underline-offset-4 pointer-events-auto">+63 966 895 4561</a>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-800 tracking-[0.04em] sm:tracking-widest uppercase break-words">
                    GITHUB: <a href="https://github.com/zynthoz" target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-300 underline decoration-emerald-800 underline-offset-4 pointer-events-auto break-all"><span className="sm:hidden">ZYNTHOZ</span><span className="hidden sm:inline">GITHUB.COM/ZYNTHOZ</span></a>
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-mono text-emerald-800 tracking-[0.04em] sm:tracking-widest uppercase break-words">
                    LINKEDIN: <a href="https://linkedin.com/in/aarongabriellim" target="_blank" rel="noreferrer" className="text-emerald-500 hover:text-emerald-300 underline decoration-emerald-800 underline-offset-4 pointer-events-auto break-all"><span className="sm:hidden">AARONGABRIELLIM</span><span className="hidden sm:inline">LINKEDIN.COM/IN/AARONGABRIELLIM</span></a>
                  </div>
                </div>
              </div>
            </WindowFrame>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}

function WindowFrame({ id, className, initLeft, initTop, zIndex, isFocused, onFocus, onClose, onMinimize, children, constraintsRef, centered = false, centeredX = false }) {
  const translateValue = centered ? '-50% -50%' : centeredX ? '-50% 0' : undefined;
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsMobileViewport(window.innerWidth < 640);
    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  return (
    <motion.section
      drag={!isMobileViewport}
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
      style={{ zIndex, top: initTop, left: initLeft, translate: translateValue, willChange: 'transform' }}
      aria-label={id}
    >
      {children}
    </motion.section>
  );
}


function DesktopIcon({ icon, label, onClick, isProject = false }) {
  return (
    <div className="desk-icon relative group flex flex-col items-center" role="button" tabIndex="0" onClick={onClick}>
      {isProject && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-black text-[9px] font-bold px-1.5 py-0.5 z-10 whitespace-nowrap shadow-[0_0_8px_rgba(249,115,22,0.6)]">
          [PROJECT]
        </span>
      )}
      <div className={`desk-icon-box flex justify-center items-center w-[72px] h-[72px] sm:w-[102px] sm:h-[102px] transition-all duration-200 ${isProject ? '!border-orange-500/30 !text-orange-500 group-hover:!bg-orange-500/10 group-hover:!border-orange-500/60 group-hover:!shadow-[0_0_15px_rgba(249,115,22,0.3)]' : ''}`}>
        <span className="material-symbols-outlined text-[36px] sm:text-[64px]">{icon}</span>
      </div>
      <span className={`desk-icon-label mt-1 text-[11px] sm:text-[14px] text-center max-w-[80px] sm:max-w-none break-words ${isProject ? '!text-orange-400 !bg-transparent' : ''}`}>{label}</span>
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
      <span className="desk-icon-label" style={{ fontSize: 7 }}>{label}</span>
    </div>
  );
}

function ProjectWindow({ winId, data, winState, focusedId, focusWindow, closeWindow, minimizeWindow, constraintsRef, openGallery }) {
  return (
    <WindowFrame
      key={winId}
      id={winId}
      className="w-[750px] max-w-[90vw] sm:max-w-[85vw] lg:max-w-[750px] h-[auto] max-h-[85vh] overflow-y-auto border border-[#2b1822] pointer-events-auto shadow-[0_0_40px_rgba(0,0,0,0.8)] font-mono bg-[#110C11]"
      initLeft="calc(50% - min(375px, 45vw))" initTop="8px"
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

      <div className="p-6 sm:p-10 flex flex-col gap-8 bg-[#110C11] text-slate-400">

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-emerald-400 tracking-widest uppercase drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
            {data.headline}
          </h1>
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-mono font-bold tracking-widest text-orange-500 bg-orange-950/40 border border-orange-800/50 uppercase">
              STATUS: {data.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10">
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mt-4 pt-8 border-t border-[#2b1822]">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {data.githubUrl && (
              <button
                className="w-full sm:w-auto justify-center px-6 py-3 font-mono font-bold text-xs bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all flex items-center gap-2 uppercase tracking-wide"
                onClick={() => window.open(data.githubUrl, '_blank', 'noopener,noreferrer')}
              >
                <span className="tracking-tighter font-extrabold">&lt;&gt;</span> ACCESS_SOURCE_CODE
              </button>
            )}
            {data.liveUrl && (
              <button
                className="w-full sm:w-auto justify-center px-6 py-3 font-mono font-bold text-xs bg-transparent text-emerald-500 border border-[#331C24] hover:bg-[#1a1215] transition-colors flex items-center gap-2 uppercase tracking-wide"
                onClick={() => window.open(data.liveUrl, '_blank', 'noopener,noreferrer')}
              >
                <span className="material-symbols-outlined text-[16px]">public</span> VIEW_LIVE_DEPLOYMENT
              </button>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end text-[10px] font-mono text-emerald-700/60 tracking-wider">
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

const SKILL_ICONS = [
  { label: 'C++', src: 'https://cdn.simpleicons.org/cplusplus/37e865' },
  { label: 'Python', src: 'https://cdn.simpleicons.org/python/37e865' },
  { label: 'PHP', src: 'https://cdn.simpleicons.org/php/37e865' },
  { label: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript/37e865' },
  { label: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/37e865' },
  { label: 'SQL', src: 'https://cdn.simpleicons.org/mysql/37e865' },
  { label: 'PLpgSQL', src: 'https://cdn.simpleicons.org/postgresql/37e865' },
  { label: 'Next.js', src: 'https://cdn.simpleicons.org/nextdotjs/37e865' },
  { label: 'React', src: 'https://cdn.simpleicons.org/react/37e865' },
  { label: 'TailwindCSS', src: 'https://cdn.simpleicons.org/tailwindcss/37e865' },
  { label: 'Supabase', src: 'https://cdn.simpleicons.org/supabase/37e865' },
  { label: 'PostgreSQL', src: 'https://cdn.simpleicons.org/postgresql/37e865' },
  { label: 'SQLite', src: 'https://cdn.simpleicons.org/sqlite/37e865' },
  { label: 'Git', src: 'https://cdn.simpleicons.org/git/37e865' },
  { label: 'GitHub', src: 'https://cdn.simpleicons.org/github/37e865' },
  { label: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/37e865' },
];

function LinuxTerminalPanel({ compact = false }) {
  return (
    <div className="w-full pb-3 font-mono text-emerald-500 leading-snug flex flex-col justify-start" style={{ fontSize: compact ? 10.5 : 12 }}>
      <div className="flex items-center justify-between mb-4 uppercase tracking-widest text-[#37e865] font-bold">
        <span>PROFILE-SHELL V4.2</span>
        <span className="flex items-center gap-2"><span className="inline-block w-2 h-2 bg-[#37e865] animate-pulse"></span>ONLINE</span>
      </div>

      <div className="w-full flex justify-center mb-4 pb-4 border-b border-emerald-900/50">
        <pre className="whitespace-pre overflow-hidden text-emerald-400 opacity-90 tracking-tighter" style={{ fontSize: compact ? 8.5 : 10, lineHeight: compact ? 1.02 : 1.12 }} aria-label="ASCII art logo">
{TERMINAL_ASCII}
        </pre>
      </div>

      <div className="mb-4 pb-4 border-b border-emerald-900/50 w-full">
        <div className="w-full p-1">
          <div className="grid grid-cols-4 gap-3 w-full">
            {SKILL_ICONS.map((item) => (
              <div
                key={item.label}
                className="h-12 flex items-center justify-center"
                title={item.label}
                aria-label={item.label}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className={compact ? 'w-7 h-7' : 'w-8 h-8'}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
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
          <div className="flex gap-[4px] border border-emerald-900/50 p-[8px] w-full mb-3 bg-emerald-950/20 overflow-x-auto">
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
