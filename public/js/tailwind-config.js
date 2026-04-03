/* ═══════════════════════════════════════════════════════════
   PHOSPHOR GHOST — Tailwind Config
   Mirrors tokens.css for Tailwind utility classes.
   Loaded via <script> in index.html before tailwind CDN.
═══════════════════════════════════════════════════════════ */
window.__tailwindConfig = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-container-highest': '#432f3a',
        'inverse-surface':           '#fadae9',
        'on-primary':                '#003907',
        'primary-fixed':             '#72ff70',
        'error':                     '#ffb4ab',
        'secondary-fixed-dim':       '#ffba43',
        'inverse-primary':           '#006e16',
        'primary-container':         '#00ff41',
        'error-container':           '#93000a',
        'on-background':             '#fadae9',
        'tertiary-fixed-dim':        '#99d688',
        'on-tertiary-container':     '#366d2c',
        'surface-container-high':    '#37242f',
        'tertiary':                  '#edffe2',
        'surface-tint':              '#00e639',
        'inverse-on-surface':        '#3e2b35',
        'surface-container':         '#2c1a24',
        'surface-bright':            '#48333e',
        'on-primary-container':      '#007117',
        'on-secondary-fixed':        '#281800',
        'on-primary-fixed':          '#002203',
        'tertiary-container':        '#afed9d',
        'outline':                   '#84967e',
        'surface-container-lowest':  '#190913',
        'primary':                   '#ebffe2',
        'secondary':                 '#ffd393',
        'on-error':                  '#690005',
        'secondary-fixed':           '#ffddaf',
        'secondary-container':       '#fdaf00',
        'outline-variant':           '#3b4b37',
        'background':                '#1f0e18',
        'surface-variant':           '#432f3a',
        'on-secondary':              '#432c00',
        'surface':                   '#1f0e18',
        'on-secondary-fixed-variant':'#614000',
        'on-error-container':        '#ffdad6',
        'on-tertiary':               '#003a00',
        'surface-dim':               '#1f0e18',
        'on-primary-fixed-variant':  '#00530e',
        'primary-fixed-dim':         '#00e639',
        'surface-container-low':     '#281620',
        'tertiary-fixed':            '#b5f3a2',
        'on-secondary-container':    '#694600',
        'on-surface':                '#fadae9',
        'on-tertiary-fixed-variant': '#1b5114',
        'on-surface-variant':        '#b9ccb2',
        'on-tertiary-fixed':         '#002200',
      },
      borderRadius: {
        DEFAULT: '0px',
        lg:      '0px',
        xl:      '0px',
        full:    '9999px',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body:     ['Space Grotesk', 'sans-serif'],
        label:    ['Space Grotesk', 'sans-serif'],
        mono:     ['Space Grotesk', 'monospace'],
      },
    },
  },
};
// Must initialize the window.tailwind object if it doesn't exist yet!
window.tailwind = window.tailwind || {};
window.tailwind.config = window.__tailwindConfig;
