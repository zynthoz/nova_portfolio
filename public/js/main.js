/**
 * PHOSPHOR_OS — Main Entry Point
 * Phase 1: Clock + Boot sequence controller + resize handler
 */

'use strict';

/* ──────────────────────────────────────────
   Live Clock
────────────────────────────────────────── */
const clockEl = document.getElementById('clock');

function updateClock() {
  if (!clockEl) return;
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const s    = String(now.getSeconds()).padStart(2, '0');
  const wide = window.innerWidth >= 640;
  clockEl.textContent = wide ? `${h}:${m}:${s}` : `${h}:${m}`;
}

updateClock();
setInterval(updateClock, 1000);

/* ──────────────────────────────────────────
   Boot Sequence — typewriter log lines
────────────────────────────────────────── */
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

function runBootSequence(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = '';

  BOOT_LINES.forEach((line, i) => {
    setTimeout(() => {
      const p = document.createElement('p');
      p.className = line.cls;
      if (line.blink) {
        p.innerHTML = line.text + '<span class="cursor-block"></span>';
      } else {
        p.textContent = line.text;
      }
      // phosphor fade-in
      p.style.opacity = '0';
      p.style.transition = 'opacity 0.15s ease-out';
      el.appendChild(p);
      // trigger fade
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { p.style.opacity = '1'; });
      });
    }, 900 + i * 280);
  });
}

// Boot after the CRT flicker animation finishes (~900ms)
window.addEventListener('DOMContentLoaded', () => {
  runBootSequence('log-desktop');
  runBootSequence('log-mobile');
});

/* ──────────────────────────────────────────
   Resize handler — reformat clock
────────────────────────────────────────── */
window.addEventListener('resize', updateClock);
