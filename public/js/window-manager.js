/**
 * PHOSPHOR_OS — Window Manager
 * Phase 2: drag, focus, minimize/restore, open, taskbar badges
 *
 * Usage:
 *   Each window element needs:   data-window-id="my-window"
 *   Each icon/button needs:      data-opens="my-window"
 *   Each taskbar btn needs:      data-taskbar-for="my-window"
 *   Titlebar minimize btn needs: data-action="minimize" data-window-id="my-window"
 *   Titlebar close btn needs:    data-action="close"    data-window-id="my-window"
 */

'use strict';

class WindowManager {
  constructor() {
    /** @type {Map<string, WindowState>} */
    this.windows = new Map();
    this._zBase  = 20;   // starting z-index for windows
    this._zTop   = 20;
    this._dragState = null;
    this._isMobile  = () => window.innerWidth < 640;

    this._init();
  }

  // ─────────────────────────── Bootstrap ──────────────────────────────

  _init() {
    // Register every [data-window-id]
    document.querySelectorAll('[data-window-id]').forEach(el => {
      this._register(el);
    });

    // Global mouse/touch events for drag
    document.addEventListener('mousemove',  e => this._onDragMove(e));
    document.addEventListener('mouseup',    e => this._onDragEnd(e));
    document.addEventListener('touchmove',  e => this._onDragMove(e), { passive: false });
    document.addEventListener('touchend',   e => this._onDragEnd(e));

    // Wire opener triggers: icons & taskbar buttons with data-opens
    document.querySelectorAll('[data-opens]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.opens;
        this.open(id);
      });
      // Keyboard support
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.open(el.dataset.opens); }
      });
    });

    // Wire taskbar buttons with data-taskbar-for
    document.querySelectorAll('[data-taskbar-for]').forEach(el => {
      el.addEventListener('click', () => {
        const id  = el.dataset.taskbarFor;
        const win = this.windows.get(id);
        if (!win) return;
        if (win.state === 'minimized') {
          this.restore(id);
        } else if (win.state === 'open' && this._focusedId === id) {
          this.minimize(id);
        } else {
          this.focus(id);
        }
      });
    });

    // Title bar action buttons (minimize / close)
    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.dataset.action;
      const id     = btn.closest('[data-window-id]')?.dataset.windowId;
      if (!id) return;
      if (action === 'minimize') this.minimize(id);
      if (action === 'close')    this.close(id);
    });

    // Click anywhere on a window → focus it
    document.addEventListener('mousedown', e => {
      const win = e.target.closest('[data-window-id]');
      if (win) this.focus(win.dataset.windowId);
    });

    // Mobile accordion: tap icon → toggle panel
    document.querySelectorAll('[data-mobile-toggle]').forEach(el => {
      el.addEventListener('click', () => {
        const targetId = el.dataset.mobileToggle;
        const target   = document.getElementById(targetId);
        if (!target) return;
        const isHidden = target.style.display === 'none' || target.dataset.mobileHidden === 'true';
        this._mobileSetVisible(target, isHidden);
      });
    });
  }

  _register(el) {
    const id = el.dataset.windowId;
    if (this.windows.has(id)) return;

    const state = {
      el,
      id,
      state:  'open',       // 'open' | 'minimized' | 'closed'
      zIndex: this._zBase,
      // Saved drag position
      x: null,
      y: null,
    };

    this.windows.set(id, state);
    el.style.zIndex = this._zBase;

    // Drag handle = title bar
    const titlebar = el.querySelector('.window-titlebar');
    if (titlebar) {
      titlebar.style.cursor = 'grab';
      titlebar.addEventListener('mousedown',  e => this._onDragStart(e, id));
      titlebar.addEventListener('touchstart', e => this._onDragStart(e, id), { passive: false });
    }

    this._updateTaskbar(id);
  }

  // ─────────────────────────── Public API ──────────────────────────────

  open(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state = 'open';
    win.el.style.display = '';
    win.el.dataset.mobileHidden = 'false';
    win.el.classList.remove('minimized', 'wm-closed');
    win.el.classList.add('window-open');
    win.el.addEventListener('animationend', () => win.el.classList.remove('window-open'), { once: true });
    this.focus(id);
    this._updateTaskbar(id);
  }

  minimize(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state = 'minimized';
    win.el.classList.add('minimized');
    this._focusedId = null;
    this._updateAllTaskbars();
    this._updateTaskbar(id);
  }

  restore(id) {
    this.open(id);
  }

  close(id) {
    const win = this.windows.get(id);
    if (!win) return;
    win.state = 'closed';
    win.el.classList.add('wm-closed');
    this._focusedId = null;
    this._updateAllTaskbars();
  }

  focus(id) {
    const win = this.windows.get(id);
    if (!win || win.state !== 'open') return;
    // Dim all
    this.windows.forEach((w, wid) => {
      w.el.classList.remove('focused');
    });
    // Raise this one
    this._zTop += 1;
    win.zIndex   = this._zTop;
    win.el.style.zIndex = this._zTop;
    win.el.classList.add('focused');
    this._focusedId = id;
    this._updateAllTaskbars();
  }

  // ─────────────────────────── Drag ────────────────────────────────────

  _getPoint(e) {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  _onDragStart(e, id) {
    if (this._isMobile()) return;            // no drag on mobile
    const win = this.windows.get(id);
    if (!win || win.state !== 'open') return;
    this.focus(id);

    const rect  = win.el.getBoundingClientRect();
    const point = this._getPoint(e);

    this._dragState = {
      id,
      startX:  point.x,
      startY:  point.y,
      origLeft: rect.left,
      origTop:  rect.top,
    };

    // Lock to absolute position so we can move freely
    win.el.style.position = 'fixed';
    win.el.style.left     = rect.left + 'px';
    win.el.style.top      = rect.top  + 'px';
    win.el.style.margin   = '0';
    win.el.classList.add('dragging');

    if (e.cancelable) e.preventDefault();
  }

  _onDragMove(e) {
    if (!this._dragState) return;
    const { id, startX, startY, origLeft, origTop } = this._dragState;
    const win   = this.windows.get(id);
    if (!win) return;
    const point = this._getPoint(e);
    const dx = point.x - startX;
    const dy = point.y - startY;

    // Clamp within viewport
    const W   = win.el.offsetWidth;
    const H   = win.el.offsetHeight;
    const VW  = window.innerWidth;
    const VH  = window.innerHeight;
    const newLeft = Math.min(Math.max(0, origLeft + dx), VW - W);
    const newTop  = Math.min(Math.max(32, origTop  + dy), VH - H - 48); // respect header/taskbar

    win.el.style.left = newLeft + 'px';
    win.el.style.top  = newTop  + 'px';
    if (e.cancelable) e.preventDefault();
  }

  _onDragEnd() {
    if (!this._dragState) return;
    const { id } = this._dragState;
    const win = this.windows.get(id);
    if (win) win.el.classList.remove('dragging');
    this._dragState = null;
  }

  // ─────────────────────────── Taskbar sync ─────────────────────────────

  _updateTaskbar(id) {
    const win = this.windows.get(id);
    document.querySelectorAll(`[data-taskbar-for="${id}"]`).forEach(btn => {
      btn.classList.remove('active', 'taskbar-minimized');
      if (!win) return;
      if (win.state === 'open' && this._focusedId === id) {
        btn.classList.add('active');
      } else if (win.state === 'minimized') {
        btn.classList.add('taskbar-minimized');
      }
    });
  }

  _updateAllTaskbars() {
    this.windows.forEach((_, id) => this._updateTaskbar(id));
  }

  // ─────────────────────────── Mobile toggle ────────────────────────────

  _mobileSetVisible(el, visible) {
    if (visible) {
      el.style.display = '';
      el.dataset.mobileHidden = 'false';
      el.classList.add('window-open');
      el.addEventListener('animationend', () => el.classList.remove('window-open'), { once: true });
    } else {
      el.style.display = 'none';
      el.dataset.mobileHidden = 'true';
    }
  }
}

// ── Boot ──
window.WM = new WindowManager();
