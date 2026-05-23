/* Zeeb device — wider than tall e-reader / reMarkable form factor.
   Matte dark slab with slim bezels, TikTok-style feed centered inside.
   Light reflection on top edge to give it weight. */

function ZeebDevice({ width = 460, height = 225 }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const BEZEL = mobile ? 18 : 11;
  const screenW = width - BEZEL * 2;
  const screenH = height - BEZEL * 2;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* contact shadow under the device */}
      <div style={{
        position: "absolute",
        left: "6%", right: "6%",
        bottom: -26,
        height: 36,
        background: "radial-gradient(ellipse at center, rgba(20,40,90,0.32), transparent 70%)",
        filter: "blur(6px)",
        zIndex: 0,
      }} />

      {/* matte stylus resting diagonally against the right edge of the
          device. Tapered tip pointing down-left, eraser cap at the
          upper-right. Same finish as the device so it reads as a kit. */}
      <Stylus deviceWidth={width} deviceHeight={height} />

      {/* device body */}
      <div style={{
        position: "relative",
        width, height,
        borderRadius: 18,
        background: "linear-gradient(160deg, #2a2c30 0%, #16181b 50%, #0c0e10 100%)",
        padding: BEZEL,
        boxShadow: `
          inset 0 1px 0 rgba(255,255,255,0.10),
          inset 0 0 0 1px #0a0b0d,
          0 30px 60px -22px rgba(20,40,90,0.40),
          0 4px 10px rgba(20,40,90,0.10)
        `,
        zIndex: 1,
      }}>
        {/* matte grain */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 18,
          backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.32 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          opacity: 0.6,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }} />

        {/* top edge highlight — gives it weight */}
        <div style={{
          position: "absolute", top: 0, left: "12%", right: "12%",
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          borderRadius: 2,
        }} />

        {/* power button on right edge — shorter to suit the slimmer body */}
        <div style={{
          position: "absolute", right: -2, top: 28,
          width: 4, height: 38,
          background: "#0a0b0d",
          borderRadius: "0 2px 2px 0",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.06)",
        }} />

        {/* tiny power LED */}
        <div style={{
          position: "absolute", top: 14, left: 18,
          width: 3, height: 3,
          borderRadius: 999,
          background: "#2bb673",
          boxShadow: "0 0 5px rgba(43,182,115,0.6)",
        }} />

        {/* etched wordmark on lower bezel */}
        <div style={{
          position: "absolute", bottom: 2, left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 7,
          letterSpacing: "0.32em",
          color: "rgba(255,255,255,0.30)",
          textTransform: "uppercase",
        }}>ZEEB</div>

        {/* screen */}
        <div style={{
          position: "relative",
          width: screenW, height: screenH,
          background: "#000",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6), inset 0 1px 3px rgba(0,0,0,0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          {/* faint screen ambient — the device "on but idle" feel */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,40,55,0.5) 0%, #000 70%)",
          }} />

          {/* Notes interface — the device looks like a study tool by
              default. A small panic shortcut sits in the corner. */}
          <NotesScreen width={screenW} height={screenH} mobile={mobile} />

          {/* glass reflection */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(125deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.03) 100%)",
            pointerEvents: "none",
          }} />
        </div>
      </div>
    </div>
  );
}

/* Stylus — slim, matte, premium note-taking pen. Sits at the device's
   right edge, tilted slightly so it reads as "resting" against the
   bezel rather than clipped through it. Length scales with the device. */
function Stylus({ deviceWidth, deviceHeight }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const len = mobile
    ? Math.round(deviceWidth * 0.7)
    : Math.round(deviceHeight * 0.92);
  const tipW = 5;
  const barrelW = 9;
  const angle = 14; // degrees, tilted top-right -> bottom-left of contact

  // Desktop: vertical on the right edge, tilted clockwise.
  // Mobile: diagonal on the left side, tip near device top-left, eraser upper-right.
  const wrapperStyle = mobile
    ? {
        position: "absolute",
        left: Math.round(deviceWidth * 0.18) - Math.round(barrelW * 0.5),
        top: -Math.round(len * 0.82),
        width: barrelW,
        height: len,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "bottom center",
        zIndex: 2,
        pointerEvents: "none",
        filter: "drop-shadow(0 14px 18px rgba(20,40,90,0.30)) drop-shadow(0 2px 3px rgba(20,40,90,0.20))",
      }
    : {
        position: "absolute",
        right: -Math.round(barrelW * 0.55),
        top: Math.round((deviceHeight - len) / 2) - 6,
        width: barrelW,
        height: len,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "bottom center",
        zIndex: 2,
        pointerEvents: "none",
        filter: "drop-shadow(0 14px 18px rgba(20,40,90,0.30)) drop-shadow(0 2px 3px rgba(20,40,90,0.20))",
      };

  return (
    <div style={wrapperStyle}>
      {/* eraser cap at the top */}
      <div style={{
        position: "absolute",
        top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: barrelW + 0.4,
        height: 18,
        borderRadius: "3px 3px 1.5px 1.5px",
        background: "linear-gradient(90deg, #1f2125 0%, #2c2e34 45%, #14161a 100%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 rgba(0,0,0,0.4)",
      }} />
      {/* small ring detail */}
      <div style={{
        position: "absolute",
        top: 18,
        left: "50%",
        transform: "translateX(-50%)",
        width: barrelW + 0.6,
        height: 1.5,
        background: "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(255,255,255,0.22), rgba(255,255,255,0.10))",
      }} />
      {/* barrel — matte gradient matching the device body */}
      <div style={{
        position: "absolute",
        top: 19.5,
        left: 0,
        width: barrelW,
        height: len - 19.5 - 26,
        borderRadius: 1.5,
        background: "linear-gradient(90deg, #14161a 0%, #2a2c30 50%, #14161a 100%)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
      }} />
      {/* matte grain on barrel */}
      <div style={{
        position: "absolute",
        top: 19.5,
        left: 0,
        width: barrelW,
        height: len - 19.5 - 26,
        borderRadius: 1.5,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        opacity: 0.55,
        mixBlendMode: "overlay",
      }} />
      {/* taper into the tip */}
      <div style={{
        position: "absolute",
        bottom: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: `${barrelW / 2}px solid transparent`,
        borderRight: `${barrelW / 2}px solid transparent`,
        borderTop: `18px solid #14161a`,
      }} />
      {/* metallic tip */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: tipW * 0.5,
        height: 9,
        background: "linear-gradient(180deg, #8a8d92, #444649 60%, #1a1c1f)",
        borderRadius: "0 0 1px 1px",
      }} />
    </div>
  );
}

/* Split-personality notes screen.
   Left two-thirds: a clean, real-looking notes app — what a teacher
   sees when they glance over. Right one-third: a thin strip of a
   TikTok feed peeking in from the side, like one swipe away.
   Top-right: PANIC mode shield with a soft pulse.
   Bottom-right of the notes column: zeeb. brand mark. */
function NotesScreen({ width, height, mobile = false }) {
  const peekW = Math.round(width * 0.32);        // right-side TikTok strip
  const notesW = width - peekW;
  return (
    <div style={{
      width, height,
      position: "relative",
      overflow: "hidden",
      borderRadius: 6,
      background: "linear-gradient(180deg, #fbfaf6 0%, #f4f2eb 100%)",
      color: "#1d1f24",
      fontFamily: "'Geist', system-ui, sans-serif",
      display: "flex",
    }}>
      {/* ── Left: Notes app ── */}
      <div style={{
        position: "relative",
        width: notesW,
        height: "100%",
        flexShrink: 0,
        borderRight: "1px solid rgba(20,30,50,0.08)",
      }}>
        {/* app header — minimal, like Apple Notes. No status bar — the
            device is its own thing; clocks and signal bars don't belong. */}
        <div style={{
          position: "absolute", top: 8, left: 10, right: 10,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="#3b3f48" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 9, color: "#7a7e88", fontWeight: 500 }}>Notes</span>
        </div>

        {/* note title — the lockup the teacher sees */}
        <div style={{ position: "absolute", top: 24, left: 12, right: 12 }}>
          <div style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: mobile ? 16 : 14,
            letterSpacing: "-0.025em",
            color: "#14161a",
            lineHeight: 1.1,
          }}>
            AP Bio<span style={{ color: "#9aa0aa", fontWeight: 600 }}> — Period 3</span>
          </div>
          <div style={{
            marginTop: 2,
            fontSize: 8,
            color: "#9aa0aa",
            letterSpacing: "0.02em",
          }}>
            Tue · Mar 11 · 9:14 am
          </div>
        </div>

        {/* lined paper area */}
        <div style={{
          position: "absolute",
          top: 52, left: 12, right: 8, bottom: 14,
          overflow: "hidden",
        }}>
          {/* faint ruled lines — spacing matches the Caveat line-height */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(to bottom, rgba(30,40,60,0.07) 1px, transparent 1px)",
            backgroundSize: mobile ? "100% 26px" : "100% 24px",
            backgroundPosition: mobile ? "0 24px" : "0 22px",
          }} />
          {/* margin rule */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 14,
            width: 1, background: "rgba(220,80,80,0.32)",
          }} />

          {/* handwritten notes — Caveat is a real handwriting font, sized
              up so each line is clearly legible at a glance */}
          <div style={{
            position: "absolute", left: 22, right: 4, top: 2,
            fontFamily: "'Caveat', cursive",
            fontWeight: 600,
            fontSize: mobile ? 21 : 19,
            lineHeight: mobile ? "26px" : "24px",
            color: "#1d3a6f",
            letterSpacing: "0.005em",
          }}>
            <div>Cellular respiration</div>
            <div>glucose → pyruvate · cytoplasm</div>
            <div>2 ATP net · anaerobic step</div>
            <div style={{ height: 6 }} />
            <div>Krebs cycle — mito. matrix</div>
            <div>NADH, FADH₂ → ETC</div>
          </div>
        </div>

        {/* zeeb. brand mark — bottom-right of the notes column */}
        <div style={{
          position: "absolute", bottom: 4, right: 8,
          fontFamily: "'Inter Tight', system-ui, sans-serif",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 10,
          letterSpacing: "-0.055em",
          color: "rgba(20,22,26,0.55)",
          display: "inline-flex",
          alignItems: "baseline",
        }}>
          zeeb<span style={{
            display: "inline-block",
            width: 3, height: 3, borderRadius: 999,
            background: "#1b6dff",
            marginLeft: 1,
            transform: "translateY(-1px)",
          }} />
        </div>
      </div>

      {/* ── Right: TikTok peek strip (one swipe away) ── */}
      <TikTokPeek width={peekW} height={height} />

      {/* PANIC MODE shield — top-right of the whole screen, with pulse.
          Sits over the peek strip; reads as a "kill switch" the student
          can hit instantly. */}
      <PanicShield />
    </div>
  );
}

/* The TikTok strip — uses the actual @thegrubfather ramen screenshot as
   the background image (full bleed, object-fit:cover), with just a slim
   left-edge handle and the existing HIDE panic button overlaid. */
function TikTokPeek({ width, height }) {
  return (
    <div style={{
      position: "relative",
      width, height,
      overflow: "hidden",
      background: "#1a0e08",
      boxShadow: "inset 4px 0 8px rgba(0,0,0,0.35)",
    }}>
      {/* the real screenshot, filling the right side */}
      <img
        src="logos/tiktok-ramen.png"
        alt="TikTok ramen video"
        draggable="false"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      {/* swipe handle — vertical line at the left edge, hinting "swipe me" */}
      <div style={{
        position: "absolute", top: "50%", left: 2,
        transform: "translateY(-50%)",
        width: 2, height: 26,
        background: "rgba(255,255,255,0.7)",
        borderRadius: 2,
        boxShadow: "0 0 6px rgba(255,255,255,0.45)",
        zIndex: 3,
      }} />
    </div>
  );
}

/* PANIC MODE — large, unmistakable red pill in the top-right of the
   TikTok side. Pulses softly so the eye lands on it instantly as a
   "kill switch." Twice the size of the previous version. */
function PanicShield() {
  return (
    <div style={{
      position: "absolute",
      top: 6, right: 6,
      display: "flex", alignItems: "center", gap: 5,
      zIndex: 6,
      padding: "5px 10px 5px 8px",
      background: "linear-gradient(180deg, #ff3b3b 0%, #d61f1f 100%)",
      borderRadius: 999,
      boxShadow: `
        0 0 0 1px rgba(255,255,255,0.25) inset,
        0 0 10px rgba(255,76,76,0.55),
        0 4px 10px rgba(180,20,20,0.45)
      `,
      animation: "panicPulse 1.8s ease-in-out infinite",
    }}>
      {/* outer glow halo (separate so it pulses behind the pill) */}
      <div style={{
        position: "absolute", inset: -6,
        borderRadius: 999,
        background: "radial-gradient(circle, rgba(255,76,76,0.55) 0%, rgba(255,76,76,0) 70%)",
        animation: "panicPulse 1.8s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: -1,
      }} />
      {/* shield with slash — white on red */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ position: "relative" }}>
        <path d="M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3z"
              fill="rgba(255,255,255,0.20)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
        <path d="M6 6l12 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span style={{
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "white",
        fontWeight: 800,
      }}>
        HIDE
      </span>
    </div>
  );
}

/* (Legacy home-screen grid — no longer rendered, kept for reference) */
function HomeScreen({ width, height }) {
  return (
    <div style={{
      width, height,
      position: "relative",
      overflow: "hidden",
      borderRadius: 8,
      background:
        "radial-gradient(120% 80% at 50% 0%, #1a1f2a 0%, #0a0c10 65%, #050608 100%)",
    }}>
      {/* status bar */}
      <div style={{
        position: "absolute", top: 10, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 18px",
        color: "white", fontSize: 11, fontWeight: 600,
        fontFamily: "system-ui",
        letterSpacing: "-0.01em",
      }}>
        <span>9:41</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          {/* signal-style bars */}
          <span style={{ display: "inline-flex", alignItems: "flex-end", gap: 2 }}>
            <span style={{ width: 2, height: 4, background: "white", borderRadius: 1 }} />
            <span style={{ width: 2, height: 6, background: "white", borderRadius: 1 }} />
            <span style={{ width: 2, height: 8, background: "white", borderRadius: 1 }} />
            <span style={{ width: 2, height: 10, background: "white", borderRadius: 1 }} />
          </span>
          {/* battery */}
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
            <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="white" strokeWidth="1" />
            <rect x="2" y="2" width="14" height="6" rx="1" fill="white" />
            <rect x="19" y="3" width="2" height="4" rx="0.5" fill="white" />
          </svg>
        </span>
      </div>

      {/* app grid — 3 columns × 2 rows */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, auto)",
          gridAutoRows: "auto",
          rowGap: 22,
          columnGap: 36,
        }}>
          <HomeAppCell kind="tiktok"    label="TikTok" />
          <HomeAppCell kind="snap"      label="Snapchat" />
          <HomeAppCell kind="youtube"   label="YouTube" />
          <HomeAppCell kind="instagram" label="Instagram" />
          <HomeAppCell kind="spotify"   label="Spotify" />
          <HomeAppCell kind="whatsapp"  label="WhatsApp" />
        </div>
      </div>

      {/* zeeb branding — bottom corner */}
      <div style={{
        position: "absolute", bottom: 10, right: 14,
        fontFamily: "'Fraunces', serif",
        fontStyle: "italic",
        fontWeight: 900,
        fontSize: 13,
        letterSpacing: "-0.03em",
        color: "rgba(255,255,255,0.78)",
        display: "inline-flex",
        alignItems: "baseline",
        gap: 2,
      }}>
        zeeb<span style={{
          display: "inline-block",
          width: 4, height: 4, borderRadius: 999,
          background: "#1b6dff",
          transform: "translateY(-2px)",
        }} />
      </div>

      {/* home indicator pill, like iOS */}
      <div style={{
        position: "absolute", bottom: 6, left: "50%",
        transform: "translateX(-50%)",
        width: 110, height: 4,
        background: "rgba(255,255,255,0.4)",
        borderRadius: 999,
      }} />
    </div>
  );
}

function HomeAppCell({ kind, label }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      width: 64,
    }}>
      <HomeAppIcon kind={kind} size={56} />
      <div style={{
        color: "rgba(255,255,255,0.9)",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: 10,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        textShadow: "0 1px 2px rgba(0,0,0,0.6)",
      }}>{label}</div>
    </div>
  );
}

/* App icon — rounded square, real brand color, simple recognizable mark.
   Designed to read at 56px with the same visual language as the floating
   apps in the hero, so the device feels like the same product family. */
function HomeAppIcon({ kind, size = 56 }) {
  const r = size * 0.235;
  const base = {
    width: size, height: size, borderRadius: r,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    overflow: "hidden",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.20), 0 4px 10px rgba(0,0,0,0.35)",
  };
  switch (kind) {
    case "tiktok":
      return (
        <div style={{ ...base, background: "#000" }}>
          <svg width={size * 0.55} height={size * 0.6} viewBox="0 0 40 44" fill="none">
            <path d="M22 4v22a6 6 0 1 1-6-6" stroke="#25F4EE" strokeWidth="4.5" strokeLinecap="round" transform="translate(-2 0)" />
            <path d="M22 4v22a6 6 0 1 1-6-6" stroke="#FE2C55" strokeWidth="4.5" strokeLinecap="round" transform="translate(2 2)" />
            <path d="M22 4v22a6 6 0 1 1-6-6M22 4c1.5 4 5 6 9 6" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );
    case "snap":
      return (
        <div style={{ ...base, background: "#FFFC00" }}>
          <svg width={size * 0.65} height={size * 0.65} viewBox="0 0 40 40" fill="none">
            <path d="M20 4c6 0 9 4 9 10 0 3 0 6 1 8 1 2 4 2 4 4 0 1-3 2-5 2-1 0-1 1-1 2-1 3-3 4-6 4-2 0-3-1-5-1-3 0-4 2-7 1-3-1-2-4-4-5-2 0-5-1-5-2 0-2 3-2 4-4 1-2 1-5 1-8 0-6 3-10 9-10z" fill="white" stroke="#000" strokeWidth="2" />
            <circle cx="16" cy="20" r="1.6" fill="#000" />
            <circle cx="24" cy="20" r="1.6" fill="#000" />
          </svg>
        </div>
      );
    case "youtube":
      return (
        <div style={{ ...base, background: "white" }}>
          <svg width={size * 0.72} height={size * 0.55} viewBox="0 0 44 30" fill="none">
            <rect x="0" y="0" width="44" height="30" rx="7" fill="#FF0033" />
            <path d="M17 9l13 6-13 6V9z" fill="white" />
          </svg>
        </div>
      );
    case "instagram":
      return (
        <div style={{ ...base, background: "conic-gradient(from 215deg at 30% 110%, #fdc468 0%, #fdb84b 10%, #fa7e1e 22%, #d62976 38%, #962fbf 60%, #4f5bd5 90%)" }}>
          <div style={{
            width: size * 0.56, height: size * 0.56,
            border: `${Math.round(size * 0.075)}px solid white`,
            borderRadius: r * 0.85,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%", height: "50%",
              border: `${Math.max(2, Math.round(size * 0.06))}px solid white`,
              borderRadius: "50%",
            }} />
            <div style={{
              position: "absolute", top: "8%", right: "8%",
              width: Math.max(5, size * 0.08),
              height: Math.max(5, size * 0.08),
              borderRadius: 999, background: "white",
            }} />
          </div>
        </div>
      );
    case "spotify":
      return (
        <div style={{ ...base, background: "#1ED760" }}>
          <svg width={size * 0.7} height={size * 0.7} viewBox="0 0 40 40" fill="none">
            <path d="M8 16 Q20 11 32 17" stroke="#000" strokeWidth="3.6" strokeLinecap="round" />
            <path d="M10 22 Q20 18 30 23" stroke="#000" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M12 28 Q20 25 28 29" stroke="#000" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      );
    case "whatsapp":
      return (
        <div style={{ ...base, background: "#25D366" }}>
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 40 40" fill="none">
            <path d="M20 4C12 4 6 10 6 18c0 3 1 5 2 7l-2 7 7-2c2 1 5 2 7 2 8 0 14-6 14-14S28 4 20 4z" fill="white" />
            <path d="M14 14c0-1 1-2 2-2h1c.5 0 1 .5 1 1l1 3-1 1c1 2 2 3 4 4l1-1 3 1c.5 0 1 .5 1 1v1c0 1-1 2-2 2-5 0-11-6-11-11z" fill="#25D366" />
          </svg>
        </div>
      );
    default:
      return <div style={{ ...base, background: "#888" }} />;
  }
}

/* (legacy TikTok feed left for reference, no longer used) */
function TikTokFeed({ width, height }) {
  return (
    <div style={{
      width, height,
      position: "relative",
      overflow: "hidden",
      borderRadius: 8,
      background: "#000",
      boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
    }}>
      {/* "video" — warm portrait gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(120% 60% at 50% 110%, #2a4a3a 0%, transparent 55%),
          radial-gradient(80% 60% at 35% 35%, #d09572 0%, transparent 45%),
          radial-gradient(60% 50% at 65% 55%, #6a4030 0%, transparent 60%),
          linear-gradient(180deg, #1c1f1a 0%, #0a0a08 100%)
        `,
      }} />
      <svg viewBox="0 0 220 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, opacity: 0.6 }}>
        <defs>
          <radialGradient id="figSil" cx="50%" cy="48%" r="40%">
            <stop offset="0%" stopColor="#231a14" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#231a14" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="110" cy="160" rx="46" ry="56" fill="url(#figSil)" />
        <path d="M50 400 Q110 220 170 400Z" fill="#1a1612" opacity="0.85" />
      </svg>

      {/* status bar */}
      <div style={{
        position: "absolute", top: 6, left: 0, right: 0,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 10px",
        color: "white", fontSize: 9, fontWeight: 600,
        fontFamily: "system-ui",
        zIndex: 4,
      }}>
        <span>9:41</span>
        <svg width="16" height="8" viewBox="0 0 20 10"><rect x="0" y="2" width="16" height="6" rx="1.5" stroke="white" strokeWidth="1" fill="none"/><rect x="2" y="4" width="11" height="2" fill="white"/></svg>
      </div>

      {/* top tabs */}
      <div style={{
        position: "absolute", top: 22, left: 0, right: 0,
        display: "flex", justifyContent: "center", gap: 14,
        color: "white", fontSize: 11, fontWeight: 600,
        fontFamily: "system-ui",
        zIndex: 4,
      }}>
        <span style={{ opacity: 0.55 }}>Following</span>
        <span style={{ position: "relative" }}>
          For You
          <div style={{ position: "absolute", bottom: -5, left: "20%", right: "20%", height: 1.5, background: "white" }} />
        </span>
      </div>

      {/* right rail */}
      <div style={{
        position: "absolute", right: 6, bottom: 80,
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 14, zIndex: 4,
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: "linear-gradient(135deg,#f0a373,#b96a45)", border: "2px solid white" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 20.5s-7.5-4.3-7.5-10A4.5 4.5 0 0 1 12 7.2 4.5 4.5 0 0 1 19.5 10.5c0 5.7-7.5 10-7.5 10z" fill="#ff2d55"/></svg>
          <span style={{ color: "white", fontSize: 8, fontWeight: 600 }}>24K</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 11.5C4 7.4 7.6 4 12 4s8 3.4 8 7.5-3.6 7.5-8 7.5c-.9 0-1.7-.1-2.5-.4L5 20l1.3-3.2C4.9 15.5 4 13.6 4 11.5z" fill="white"/></svg>
          <span style={{ color: "white", fontSize: 8, fontWeight: 600 }}>891</span>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24"><path d="M3.2 12.6 19 5.4l-3 16-5-6.4-7.8-2.4z" fill="white"/></svg>
      </div>

      {/* caption */}
      <div style={{
        position: "absolute", bottom: 50, left: 8, right: 50,
        color: "white", fontFamily: "system-ui", zIndex: 4,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700 }}>@itsmasha</div>
        <div style={{ fontSize: 10, lineHeight: 1.4, opacity: 0.92, marginTop: 2 }}>back at it 🌊 #fyp</div>
      </div>

      {/* bottom nav */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 36,
        background: "rgba(0,0,0,0.86)",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        zIndex: 4,
        fontSize: 8, fontFamily: "system-ui",
      }}>
        {["Home", "Friends", "+", "Inbox", "Profile"].map((label, i) => (
          <span key={i} style={{ color: "white", opacity: i === 0 ? 1 : 0.6, fontWeight: i === 2 ? 800 : 500, fontSize: i === 2 ? 14 : 8 }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

window.ZeebDevice = ZeebDevice;
