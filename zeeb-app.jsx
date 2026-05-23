/* Zeeb — light-blue cinematic reveal landing page.
   Two moments separated by a scroll-driven animation:
   moment 1 = device + floating apps on glossy light blue.
   moment 2 = headline + email form. */

const { useState, useEffect, useRef } = React;

/* ──────────────────────────────────────────────────────────────────
   BACKGROUND — light blue with a soft "bulb" curve in the top-right
   and faint diagonal rays. Matches the reference images.
   ────────────────────────────────────────────────────────────────── */

function Background() {
  return (
    <div className="bg-stage">
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice"
           xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* main wash — white at the lower-left fading to medium blue at upper-right */}
          <linearGradient id="wash" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%"  stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f4f9ff" />
            <stop offset="70%" stopColor="#dceaff" />
            <stop offset="100%" stopColor="#c2dcfb" />
          </linearGradient>

          {/* the "bulb" — soft circular gradient sitting top-right */}
          <radialGradient id="bulb" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="#bcd6f6" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#bcd6f6" stopOpacity="0.45" />
            <stop offset="78%" stopColor="#bcd6f6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#bcd6f6" stopOpacity="0" />
          </radialGradient>

          {/* rim of the bulb — slightly darker, deeper blue ring */}
          <radialGradient id="bulbRim" cx="50%" cy="50%" r="50%">
            <stop offset="62%" stopColor="#9ec4f0" stopOpacity="0" />
            <stop offset="78%" stopColor="#9ec4f0" stopOpacity="0.55" />
            <stop offset="84%" stopColor="#9ec4f0" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9ec4f0" stopOpacity="0" />
          </radialGradient>

          {/* diagonal light ray */}
          <linearGradient id="ray" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* glow at lower-left */}
          <radialGradient id="cornerGlow" cx="0%" cy="100%" r="60%">
            <stop offset="0%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <filter id="soft"><feGaussianBlur stdDeviation="14" /></filter>

          {/* fine technical grid — 60px squares, painted once via <pattern> */}
          <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7aa6dc" strokeWidth="0.6" opacity="0.18" />
          </pattern>
          <pattern id="techGridMajor" width="300" height="300" patternUnits="userSpaceOnUse">
            <path d="M 300 0 L 0 0 0 300" fill="none" stroke="#5e8cc6" strokeWidth="0.8" opacity="0.22" />
          </pattern>

          {/* radial mask so the grid is brightest in the center and fades to edges */}
          <radialGradient id="gridMask" cx="50%" cy="50%" r="55%">
            <stop offset="0%"  stopColor="white" stopOpacity="0.9" />
            <stop offset="60%" stopColor="white" stopOpacity="0.35" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* base wash */}
        <rect width="1600" height="1000" fill="url(#wash)" />

        {/* white glow lower-left */}
        <rect width="1600" height="1000" fill="url(#cornerGlow)" />

        {/* ── TECH LAYER ── faint grid + geometric markers, masked so it
             only reads in the middle of the canvas and fades out at edges */}
        <g mask="url(#gridFadeMask)">
          <rect width="1600" height="1000" fill="url(#techGrid)" />
          <rect width="1600" height="1000" fill="url(#techGridMajor)" />
        </g>
        <mask id="gridFadeMask">
          <rect width="1600" height="1000" fill="url(#gridMask)" />
        </mask>

        {/* circuit-style polylines — thin, faint, only a few of them.
            They sit behind the bulb so they feel like the structure of
            something larger. */}
        <g stroke="#7aa6dc" strokeWidth="0.8" fill="none" opacity="0.45">
          <path d="M 80 360 L 380 360 L 420 320 L 620 320" />
          <circle cx="380" cy="360" r="3.2" fill="#5e8cc6" />
          <circle cx="620" cy="320" r="2.4" fill="#5e8cc6" />

          <path d="M 200 660 L 460 660 L 500 700 L 720 700" />
          <circle cx="460" cy="660" r="3" fill="#5e8cc6" />
          <circle cx="720" cy="700" r="2.2" fill="#5e8cc6" />

          <path d="M 1340 240 L 1180 240 L 1140 280 L 980 280" />
          <circle cx="1180" cy="240" r="2.6" fill="#5e8cc6" />
          <circle cx="980" cy="280" r="2.2" fill="#5e8cc6" />

          <path d="M 1420 760 L 1240 760 L 1200 720 L 1020 720" />
          <circle cx="1240" cy="760" r="2.4" fill="#5e8cc6" />
        </g>

        {/* corner technical markers — like a UI viewport */}
        <g stroke="#5e8cc6" strokeWidth="1" fill="none" opacity="0.42">
          <path d="M 48 48 L 48 78 M 48 48 L 78 48" />
          <path d="M 1552 48 L 1552 78 M 1552 48 L 1522 48" />
          <path d="M 48 952 L 48 922 M 48 952 L 78 952" />
          <path d="M 1552 952 L 1552 922 M 1552 952 L 1522 952" />
        </g>
        {/* tiny mono coordinate labels in two corners */}
        <text x="86" y="58" fontFamily="'Geist Mono', monospace" fontSize="10" fill="#7aa6dc" opacity="0.55" letterSpacing="1">001 — PRIVATE BETA</text>
        <text x="1514" y="948" fontFamily="'Geist Mono', monospace" fontSize="10" fill="#7aa6dc" opacity="0.55" letterSpacing="1" textAnchor="end">v0.4 · zbos</text>

        {/* bulb in the top-right — stays on top of the tech layer */}
        <g transform="translate(1280,360)">
          <circle cx="0" cy="0" r="420" fill="url(#bulb)" />
          <circle cx="0" cy="0" r="420" fill="url(#bulbRim)" />
          {/* highlight crescent */}
          <ellipse cx="-110" cy="-130" rx="260" ry="120" fill="white" opacity="0.55" filter="url(#soft)" transform="rotate(-30)" />
        </g>

        {/* diagonal flowing curve from top-left */}
        <g opacity="0.65" filter="url(#soft)">
          <path d="M -50 100 Q 380 160 580 380 Q 720 540 700 760"
                stroke="white" strokeWidth="48" fill="none" strokeLinecap="round" />
          <path d="M -80 50 Q 340 120 560 360 Q 700 520 680 740"
                stroke="white" strokeWidth="22" fill="none" opacity="0.85" strokeLinecap="round" />
        </g>

        {/* secondary subtle curve */}
        <g opacity="0.35" filter="url(#soft)">
          <path d="M 200 -50 Q 520 200 760 420 Q 940 600 1000 880"
                stroke="white" strokeWidth="60" fill="none" strokeLinecap="round" />
        </g>

        {/* faint diagonal rays */}
        <g opacity="0.5">
          <rect x="-200" y="600" width="1800" height="80" fill="url(#ray)" transform="rotate(-22 800 640)" />
          <rect x="-200" y="780" width="1800" height="40" fill="url(#ray)" opacity="0.5" transform="rotate(-22 800 800)" />
        </g>
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   APP TILES — rounded square brand-colored icons.
   ────────────────────────────────────────────────────────────────── */

/* RevealApps — decorative tiles around Section 2's stat moment.
   Stays put while reading; gentle bobbing only. */
function RevealApps() {
  const apps = [
    { kind: "tiktok",    top: "6%",  left: "6%",   size: 72, rot: -8 },
    { kind: "snap",      top: "10%", right: "7%",  size: 78, rot: 6  },
    { kind: "youtube",   top: "38%", left: "3%",   size: 80, rot: -4 },
    { kind: "instagram", top: "44%", right: "4%",  size: 74, rot: 8  },
    { kind: "chatgpt",   bottom: "22%", left: "6%",  size: 64, rot: 10, hide: "sm" },
    { kind: "tiktok",    bottom: "18%", right: "8%", size: 58, rot: -6, hide: "sm" },
    { kind: "snap",      top: "22%", left: "28%",  size: 44, rot: -8, hide: "sm" },
    { kind: "instagram", top: "30%", right: "26%", size: 46, rot: 6,  hide: "sm" },
    { kind: "youtube",   bottom: "8%",  left: "34%", size: 42, rot: 8,  hide: "sm" },
    { kind: "chatgpt",   bottom: "6%",  right: "32%",size: 40, rot: -6, hide: "sm" },
  ];
  return (
    <div className="reveal-apps">
      {apps.map((a, i) => (
        <div key={i}
             className="reveal-app"
             data-hide={a.hide || ""}
             style={{
               top: a.top, bottom: a.bottom,
               left: a.left, right: a.right,
             }}>
          <div className="bob" style={{
            "--rot": `${a.rot}deg`,
            "--rotD": `${(i % 2 === 0 ? 1 : -1) * 3}deg`,
            "--dx": `${(i % 2 === 0 ? -3 : 3)}px`,
            "--dy": `-14px`,
            "--dur": `${5 + (i % 5) * 0.7}s`,
            "--delay": `${(i * 0.18) % 2}s`,
          }}>
            <AppTile size={a.size} kind={a.kind} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* MobinScrollReveal — sticky scroll section with 10 expanding app logos
   and a staggered, scroll-driven stat reveal. */
function MobinScrollReveal({ grabbed }) {
  const wrapperRef = useRef(null);
  const mobile = window.innerWidth <= 768;
  const [progress, setProgress] = useState(mobile ? 1 : 0);
  const [entered, setEntered] = useState(mobile);
  const [time, setTime] = useState(0);

  // Final positions — corner-positioned (top/left = icon's top-left), inside
  // the 80px-inset .logo-background. None inside the center text zone.
  // Mobile layout is taller/narrower so icons are pushed to top + bottom
  // bands and out of the middle where the stat text sits.
  const apps = mobile ? [
    { kind: "tiktok",    top: "4%",  left: "4%"  },
    { kind: "yahoo",     top: "2%",  left: "42%" },
    { kind: "snapchat",  top: "4%",  left: "80%" },
    { kind: "youtube",   top: "18%", left: "0%"  },
    { kind: "instagram", top: "16%", left: "82%" },
    { kind: "x",         top: "68%", left: "0%"  },
    { kind: "sleeper",   top: "70%", left: "82%" },
    { kind: "chatgpt",   top: "86%", left: "4%"  },
    { kind: "espn",      top: "88%", left: "42%" },
    { kind: "whatsapp",  top: "86%", left: "80%" },
  ] : [
    { kind: "tiktok",    top: "5%",  left: "8%"  }, // top left
    { kind: "snapchat",  top: "3%",  left: "78%" }, // top right
    { kind: "yahoo",     top: "5%",  left: "42%" }, // top center
    { kind: "instagram", top: "22%", left: "88%" }, // right edge upper
    { kind: "youtube",   top: "48%", left: "2%"  }, // left edge middle
    { kind: "x",         top: "45%", left: "90%" }, // right edge middle
    { kind: "chatgpt",   top: "78%", left: "6%"  }, // bottom left
    { kind: "whatsapp",  top: "80%", left: "82%" }, // bottom right
    { kind: "espn",      top: "85%", left: "42%" }, // bottom center
    { kind: "sleeper",   top: "75%", left: "62%" }, // bottom right area
  ];

  const [floatData] = useState(() =>
    apps.map(() => ({
      xAmp: (Math.random() * 8 + 7) * (Math.random() > 0.5 ? 1 : -1),
      yAmp: (Math.random() * 8 + 7) * (Math.random() > 0.5 ? 1 : -1),
      xSpeed: 0.0003 + Math.random() * 0.0004,
      ySpeed: 0.0002 + Math.random() * 0.0004,
      xPhase: Math.random() * Math.PI * 2,
      yPhase: Math.random() * Math.PI * 2,
    }))
  );

  // progress = 0..1 driving which stat line is "active". Starts at the grab
  const [panelUp, setPanelUp] = useState(mobile);
  useEffect(() => {
    if (mobile) return;
    let rafId = null;
    function tick(currentTime) {
      setTime(currentTime);
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const vh = window.innerHeight;
      const triggerY = vh * 0.65;
      const p = Math.max(0, Math.min(1, (y - triggerY) / (vh * 3.0)));
      setProgress(p);
      setEntered(y > triggerY);
      setPanelUp(y > triggerY);
      // Reveal stat rows as user scrolls through section 2
      if (p >= 0.05) document.getElementById('stat-apps')?.classList.add('visible');
      if (p >= 0.35) document.getElementById('stat-screens')?.classList.add('visible');
      if (p >= 0.65) document.getElementById('stat-flows')?.classList.add('visible');
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Icons disperse from center → final positions on the FIRST section
  // reveal. Once dispersed, they stay dispersed forever — scrolling back
  // up doesn't re-cluster them.
  const [iconsDispersed, setIconsDispersed] = useState(mobile);
  useEffect(() => {
    if (mobile || !grabbed || iconsDispersed) return;
    // Wait until the white panel is partway through its rise (~0.7s) so
    // the icons appear to be inside it as they spring out.
    const t = setTimeout(() => setIconsDispersed(true), 700);
    return () => clearTimeout(t);
  }, [grabbed, iconsDispersed]);


  return (
    <div className="scroll-wrapper" ref={wrapperRef}>
      <section className={"sticky-section" + (panelUp ? " in" : "")}>
        <div className="logo-background">
          {apps.map((app, i) => {
            const fd = floatData[i];
            const fx = mobile ? 0 : Math.sin(time * fd.xSpeed + fd.xPhase) * fd.xAmp;
            const fy = mobile ? 0 : Math.cos(time * fd.ySpeed + fd.yPhase) * fd.yAmp;
            // Before the first reveal: clustered at center. After: each
            // at its declared corner position. Springy transition on
            // top/left handles the synchronized burst outward.
            const pos = iconsDispersed
              ? { top: app.top, left: app.left }
              : { top: "calc(50% - 40px)", left: "calc(50% - 40px)" };
            return (
              <div key={i} className="app-logo-wrapper" style={pos}>
                <div className="app-float" style={{ transform: `translate(${fx}px, ${fy}px)` }}>
                  <AppTile size={mobile ? 56 : 80} kind={app.kind} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="stats-center">
          <p id="stat-apps" className={"stat-row" + (mobile ? " visible" : "")}>
            Everything they took.
          </p>
          <h2 id="stat-screens" className={"stat-row" + (mobile ? " visible" : "")}>
            On something they can't take.
          </h2>
          <p id="stat-flows" className={"stat-row" + (mobile ? " visible" : "")}>
            A note-taking device. <em>Technically.</em>
          </p>
        </div>
      </section>
    </div>
  );
}

/* AppMarquee — infinite left→right scrolling strip of brand tiles. We
   double the row so the animation can loop on -50% translateX. */
function AppMarquee() {
  const sequence = [
    { kind: "tiktok",    label: "TikTok"    },
    { kind: "snap",      label: "Snapchat"  },
    { kind: "youtube",   label: "YouTube"   },
    { kind: "instagram", label: "Instagram" },
    { kind: "chatgpt",   label: "ChatGPT"   },
    { kind: "whatsapp",  label: "WhatsApp"  },
  ];
  const doubled = [...sequence, ...sequence];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-cell">
            <AppTile kind={item.kind} size={48} />
          </div>
        ))}
      </div>
      <div className="marquee-fade marquee-fade-l" />
      <div className="marquee-fade marquee-fade-r" />
    </div>
  );
}

/* HandGrab — stylized realistic hand reaching down with curled fingers to
   grip the device from above. Drawn flat with simple gradients so it
   reads instantly without feeling cartoonish. */
function HandGrab() {
  return (
    <svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hSkin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#eed5be" />
          <stop offset="55%" stopColor="#d9b89e" />
          <stop offset="100%" stopColor="#a8866e" />
        </linearGradient>
        <linearGradient id="hShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#c79a82" />
          <stop offset="100%" stopColor="#8e6c55" />
        </linearGradient>
        <linearGradient id="hCuff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#e2e8f1" />
          <stop offset="100%" stopColor="#a3b4c5" />
        </linearGradient>
      </defs>

      {/* sleeve */}
      <path d="M 70 -10 L 250 -10 L 260 90 Q 260 110 240 110 L 80 110 Q 60 110 60 90 Z" fill="url(#hCuff)" />
      {/* cuff hem */}
      <path d="M 60 96 Q 160 116 260 96 L 262 112 Q 160 130 58 112 Z" fill="#7d92a8" />

      {/* back of the hand */}
      <path
        d="M 72 108 Q 60 175 70 232 L 80 270 Q 100 286 130 286 L 200 282 Q 240 272 250 240 Q 265 175 254 108 Z"
        fill="url(#hSkin)" />
      {/* shadow on lower half */}
      <path
        d="M 76 232 Q 130 290 215 276 Q 245 266 252 240 L 248 198 Q 230 252 130 250 Q 92 232 78 200 Z"
        fill="url(#hShadow)" opacity="0.42" />
      {/* knuckle highlight */}
      <path d="M 100 130 Q 130 200 108 250" stroke="rgba(255,238,220,0.32)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M 145 130 Q 178 200 152 258" stroke="rgba(255,238,220,0.18)" strokeWidth="7" fill="none" strokeLinecap="round" />

      {/* fingers — 4 curled forward */}
      <path d="M 78 248 Q 68 295 76 332 L 100 334 Q 114 300 105 254 Z" fill="url(#hSkin)" />
      <path d="M 78 248 Q 68 295 76 332 L 100 334 Q 114 300 105 254 Z" fill="url(#hShadow)" opacity="0.30" />
      <path d="M 108 254 Q 102 305 114 346 L 140 348 Q 152 308 146 260 Z" fill="url(#hSkin)" />
      <path d="M 148 258 Q 148 308 158 342 L 184 340 Q 195 305 188 262 Z" fill="url(#hSkin)" />
      <path d="M 192 252 Q 200 295 208 326 L 232 322 Q 240 290 230 248 Z" fill="url(#hSkin)" />
      {/* finger separations */}
      <path d="M 105 256 Q 107 285 112 305" stroke="rgba(120,90,70,0.30)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 145 260 Q 147 295 152 320" stroke="rgba(120,90,70,0.28)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 188 258 Q 190 290 195 315" stroke="rgba(120,90,70,0.28)" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* thumb curling to the side and forward */}
      <path d="M 252 132 Q 292 148 296 196 Q 296 236 270 250 Q 252 250 246 235 L 252 200 Z" fill="url(#hSkin)" />
      <path d="M 258 178 Q 264 202 254 234" stroke="rgba(120,90,70,0.30)" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AppTile({ size = 80, kind }) {
  const r = size * 0.235;
  const base = {
    width: size, height: size, borderRadius: r,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    overflow: "hidden",
    boxShadow: "none",
  };

  const CFG = {
    tiktok:    { bg: "#010101", src: "logos/tiktok-icon-dark.svg", scale: 0.76 },
    snapchat:  { bg: "#FFFC00", src: "logos/snapchat.svg",        full: true },
    youtube:   { bg: "white",   src: "logos/youtube.svg",         full: true },
    instagram: { bg: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                 src: "logos/instagram-icon.svg",                 full: true },
    whatsapp:  { bg: "#25D366", src: "logos/whatsapp-icon.svg",   scale: 0.62, white: true },
    x:         { bg: "#000000", src: "logos/x-white.svg",         scale: 0.70 },
    sleeper:   { bg: "#000000", src: "logos/sleeper.svg",         full: true, cover: true },
    yahoo:     { bg: "#6001D2", src: "logos/yahoo.svg",           full: true },
    espn:      { bg: "#CC0000", src: "logos/espn.svg",            scale: 0.88, white: true },
    chatgpt:   { bg: "#000000", src: "logos/chatgpt.svg",         full: true },
  };

  const c = CFG[kind] || { bg: "#888888", src: "" };
  const imgStyle = c.full
    ? { width: "100%", height: "100%", objectFit: c.cover ? "cover" : "contain", display: "block" }
    : { width: size * c.scale, height: size * c.scale, objectFit: "contain", display: "block",
        filter: c.white ? "brightness(0) invert(1)" : "none" };

  return (
    <div style={{ ...base, background: c.bg }}>
      {c.src && <img src={c.src} alt={kind} style={imgStyle} draggable="false" />}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   FLOATING APPS — positioned around the device.
   ────────────────────────────────────────────────────────────────── */

function FloatingApps() {
  const apps = [
    { kind: "tiktok",    left: "11%", top: "20%",  size: 80, rot: -8, dur: 5.5, delay: 0.0, dx: 4,  dy: -16, exitX: -560, exitY: -360, exitR: -45 },
    { kind: "snap",      left: "8%",  top: "55%",  size: 64, rot: 6,  dur: 6.4, delay: 0.6, dx: -3, dy: -12, exitX: -640, exitY:  120, exitR:  30, hide: "sm" },
    { kind: "youtube",   left: "22%", top: "75%",  size: 70, rot: 4,  dur: 6.0, delay: 1.0, dx: 6,  dy: -10, exitX: -360, exitY:  520, exitR: -25 },
    { kind: "instagram", left: "78%", top: "22%",  size: 78, rot: 5,  dur: 6.0, delay: 0.3, dx: -5, dy: -14, exitX:  600, exitY: -300, exitR:  35 },
    { kind: "chatgpt",   left: "84%", top: "60%",  size: 72, rot: 10, dur: 7.0, delay: 0.4, dx: 5,  dy: -18, exitX:  640, exitY:  240, exitR: -30 },
    { kind: "tiktok",    left: "70%", top: "82%",  size: 56, rot: -6, dur: 6.6, delay: 0.9, dx: 3,  dy: -14, exitX:  380, exitY:  540, exitR:  20, hide: "sm" },
  ];

  return (
    <div className="floats">
      {apps.map((a, i) => (
        <div key={i}
             className="float-app"
             data-hide={a.hide || ""}
             style={{
               left: a.left, top: a.top,
               transform: "translate(-50%, -50%)",
             }}>
          <div className="scatter" style={{
            "--exitX": `${a.exitX}px`,
            "--exitY": `${a.exitY}px`,
            "--exitR": `${a.exitR}deg`,
          }}>
            <div className="bob" style={{
              "--dx": `${a.dx}px`,
              "--dy": `${a.dy}px`,
              "--rot": `${a.rot}deg`,
              "--rotD": `${(i % 2 === 0 ? 1 : -1) * 3}deg`,
              "--dur": `${a.dur}s`,
              "--delay": `${a.delay}s`,
            }}>
              <AppTile size={a.size} kind={a.kind} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SOCIAL PROOF AVATARS
   ────────────────────────────────────────────────────────────────── */

function Avatars() {
  const palettes = [
    { skin: "#e8b9a1", hair: "#1f1b18" },
    { skin: "#c98a6b", hair: "#2a1812" },
    { skin: "#f2d4b8", hair: "#a85a2e" },
    { skin: "#a6724c", hair: "#0e0a08" },
    { skin: "#ecc7a5", hair: "#3a2418" },
  ];
  return (
    <div className="avs">
      {palettes.map((p, i) => (
        <div key={i} className="av">
          <svg width="26" height="26" viewBox="0 0 40 40">
            <rect width="40" height="40" fill="#e6f1ff" />
            <ellipse cx="20" cy="44" rx="15" ry="10" fill={p.hair} />
            <ellipse cx="20" cy="22" rx="8.5" ry="10" fill={p.skin} />
            <path d="M12 17 Q13 11 20 11 Q27 11 28 17 Q26 14 20 14 Q14 14 12 17Z" fill={p.hair} />
            <path d="M12 17 Q11 23 13 27 L13 19 Z" fill={p.hair} />
            <path d="M28 17 Q29 23 27 27 L27 19 Z" fill={p.hair} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SCROLL CONTROLLER
   ────────────────────────────────────────────────────────────────── */

function useHeroGrab() {
  const [grabbed, setGrabbed] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 768) return;
    let raf = 0;
    function tick() {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const vh = window.innerHeight;
      const shrink = Math.max(0, Math.min(1, y / (vh * 0.65)));
      document.documentElement.style.setProperty("--shrink", shrink.toFixed(4));
      setGrabbed(y > vh * 0.65);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return grabbed;
}

/* ──────────────────────────────────────────────────────────────────
   APP
   ────────────────────────────────────────────────────────────────── */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showApps": true
}/*EDITMODE-END*/;

const ZEEB_WAITLIST_ENDPOINT = "https://script.google.com/macros/s/AKfycbz1XmYwIQpEz15HUhuFjOprWq8Nzc15ARSeEL9AO2ctdWgFe3aedzVLJeKIi3Ce-T6Q/exec";

function App() {
  const [v, setTweak] = (typeof useTweaks === "function")
    ? useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  const grabbed = useHeroGrab();

  useEffect(() => {
    if (!grabbed || window.innerWidth <= 768) return;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => {
      document.body.style.overflow = '';
    }, 2000);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = '';
    };
  }, [grabbed]);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function submit(e) {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || status === "loading") return;
    setStatus("loading");
    try {
      if (ZEEB_WAITLIST_ENDPOINT && !ZEEB_WAITLIST_ENDPOINT.startsWith("PASTE")) {
        const url = new URL(ZEEB_WAITLIST_ENDPOINT);
        url.searchParams.set("email", cleanEmail);
        url.searchParams.set("timestamp", new Date().toISOString());
        await fetch(url.toString(), { mode: "no-cors" });
      } else {
        await new Promise(r => setTimeout(r, 600));
      }
    } catch (err) {
      console.error("Waitlist submission failed:", err);
    }
    setStatus("success");
  }

  const [deviceW, setDeviceW] = useState(780);
  useEffect(() => {
    function recalc() {
      const vw = window.innerWidth;
      if (vw < 520)       setDeviceW(Math.min(400, vw - 32));
      else if (vw < 900)  setDeviceW(560);
      else                setDeviceW(780);
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <div className="page">
      <Background />
      <div className="bg-vignette" aria-hidden />
      <div className="bg-spotlight" aria-hidden />

      <header className="nav">
        <a className="wordmark" href="#" aria-label="zeeb">
          <span className="glyphs">zeeb</span><span className="dot" />
        </a>
        <span className="nav-corner">
          <span className="live" />
          Waitlist open · 1,247 in
        </span>
      </header>

      <section className={"stage" + (grabbed ? " grabbed" : "")}>
        <div className="device-anchor">
          <div className="stage-content">
            <div className="device-glow" aria-hidden />
            <div className="hand-wrap" aria-hidden>
              <HandGrab />
            </div>
            <div className="device-bob">
              <ZeebDevice width={deviceW} height={Math.round(deviceW * 0.49)} />
            </div>
          </div>
        </div>
      </section>

      <MobinScrollReveal grabbed={grabbed} />

      <section className="waitlist-anchor">
        <div className="waitlist">
          <h1>The loophole is real.</h1>
          <p className="sub">
            Zeeb runs on a note-taking device. No SIM, no cellular.
            Technically not a phone. Technically not against the rules.
          </p>

          <form className="form" onSubmit={submit}>
            {status === "success" ? (
              <div className="row" style={{ justifyContent: "center", padding: "14px 22px" }}>
                <span style={{
                  width: 6, height: 6, borderRadius: 999, background: "#2bb673",
                  boxShadow: "0 0 8px rgba(43,182,115,0.6)", marginRight: 10,
                  display: "inline-block",
                }} />
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: 17,
                  color: "var(--ink)",
                }}>you're in. watch your inbox.</span>
              </div>
            ) : (
              <div className="row">
                <input type="email" required placeholder="your@email.com"
                       value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "…" : (
                    <>
                      <span style={{ fontFamily: "'Inter Tight', system-ui, sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}>I'm in</span>
                      <span className="arrow">
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6h7M6 3l3 3-3 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>

          <div className="proof">
            <Avatars />
            <span><b>1,247</b> students already waiting</span>
          </div>
        </div>
      </section>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Hero">
          <TweakToggle label="Show floating apps" value={v.showApps} onChange={x => setTweak("showApps", x)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
