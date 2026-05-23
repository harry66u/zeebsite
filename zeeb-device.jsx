/* Zeeb device — wider than tall e-reader / reMarkable form factor.
   Matte dark slab with slim bezels, TikTok-style feed centered inside.
   Light reflection on top edge to give it weight. */

function ZeebDevice({ width = 460, height = 225 }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const BEZEL = mobile ? 11 : 18;
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

      {/* matte stylus resting diagonally on the left side on desktop,
          horizontal across top on mobile. */}
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

        {/* top edge highlight */}
        <div style={{
          position: "absolute", top: 0, left: "12%", right: "12%",
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          borderRadius: 2,
        }} />

        {/* power button on right edge */}
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
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,40,55,0.5) 0%, #000 70%)",
          }} />

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

/* Stylus — slim, matte, premium note-taking pen. Length scales with device. */
function Stylus({ deviceWidth, deviceHeight }) {
  const len = Math.round(deviceWidth * 0.7);
  const tipW = 5;
  const barrelW = 14;
  const angle = 14;

  // Position wrapper so the tip lands on the HIDE button (top-right of screen)
  const bezel = deviceWidth >= 500 ? 18 : 11;
  const halfLen = len / 2;
  const sinA = Math.sin((90 - angle) * Math.PI / 180);
  const cosA = Math.cos((90 - angle) * Math.PI / 180);
  const tipX = deviceWidth - bezel - 24;
  const tipY = bezel + 14;

  const wrapperStyle = {
    position: "absolute",
    top: Math.round(tipY - cosA * halfLen - halfLen),
    left: Math.round(tipX - sinA * halfLen - barrelW / 2),
    width: barrelW,
    height: len,
    transform: `rotate(${-(90 - angle)}deg)`,
    transformOrigin: "center center",
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
      {/* ring detail */}
      <div style={{
        position: "absolute",
        top: 18, left: "50%",
        transform: "translateX(-50%)",
        width: barrelW + 0.6,
        height: 1.5,
        background: "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(255,255,255,0.22), rgba(255,255,255,0.10))",
      }} />
      {/* barrel */}
      <div style={{
        position: "absolute",
        top: 19.5, left: 0,
        width: barrelW,
        height: len - 19.5 - 26,
        borderRadius: 1.5,
        background: "linear-gradient(90deg, #14161a 0%, #2a2c30 50%, #14161a 100%)",
        boxShadow: "inset 0 0 0 0.5px rgba(255,255,255,0.06)",
      }} />
      {/* matte grain on barrel */}
      <div style={{
        position: "absolute",
        top: 19.5, left: 0,
        width: barrelW,
        height: len - 19.5 - 26,
        borderRadius: 1.5,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        opacity: 0.55,
        mixBlendMode: "overlay",
      }} />
      {/* taper */}
      <div style={{
        position: "absolute",
        bottom: 8, left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: `${barrelW / 2}px solid transparent`,
        borderRight: `${barrelW / 2}px solid transparent`,
        borderTop: `18px solid #14161a`,
      }} />
      {/* metallic tip */}
      <div style={{
        position: "absolute",
        bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: tipW * 0.5,
        height: 9,
        background: "linear-gradient(180deg, #8a8d92, #444649 60%, #1a1c1f)",
        borderRadius: "0 0 1px 1px",
      }} />
    </div>
  );
}

function NotesScreen({ width, height, mobile = false }) {
  const peekW = Math.round(width * 0.32);
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
      {/* Left: Notes app */}
      <div style={{
        position: "relative",
        width: notesW,
        height: "100%",
        flexShrink: 0,
        borderRight: "1px solid rgba(20,30,50,0.08)",
      }}>
        <div style={{
          position: "absolute", top: mobile ? 8 : 12, left: 10, right: 10,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="#3b3f48" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontSize: 9, color: "#7a7e88", fontWeight: 500 }}>Notes</span>
        </div>

        <div style={{ position: "absolute", top: mobile ? 24 : 36, left: 12, right: 12 }}>
          <div style={{
            fontFamily: "'Inter Tight', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: mobile ? 14 : 30,
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

        <div style={{
          position: "absolute",
          top: mobile ? 52 : 96, left: 12, right: 8, bottom: mobile ? 14 : 8,
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(to bottom, rgba(30,40,60,0.07) 1px, transparent 1px)",
            backgroundSize: mobile ? "100% 24px" : "100% 46px",
            backgroundPosition: mobile ? "0 22px" : "0 44px",
          }} />
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 14,
            width: 1, background: "rgba(220,80,80,0.32)",
          }} />
          <div style={{
            position: "absolute", left: 22, right: 4, top: 2,
            fontFamily: "'Caveat', cursive",
            fontWeight: 600,
            fontSize: mobile ? 19 : 40,
            lineHeight: mobile ? "24px" : "46px",
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

      {/* Right: TikTok peek strip */}
      <TikTokPeek width={peekW} height={height} />

      {/* PANIC MODE shield */}
      <PanicShield />
    </div>
  );
}

function TikTokPeek({ width, height }) {
  return (
    <div style={{
      position: "relative",
      width, height,
      overflow: "hidden",
      background: "#1a0e08",
      boxShadow: "inset 4px 0 8px rgba(0,0,0,0.35)",
    }}>
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
      <div style={{
        position: "absolute", inset: -6,
        borderRadius: 999,
        background: "radial-gradient(circle, rgba(255,76,76,0.55) 0%, rgba(255,76,76,0) 70%)",
        animation: "panicPulse 1.8s ease-in-out infinite",
        pointerEvents: "none",
        zIndex: -1,
      }} />
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
      }}>HIDE</span>
    </div>
  );
}

/* (Legacy — no longer rendered) */
function HomeScreen({ width, height }) { return null; }
function HomeAppCell({ kind, label }) { return null; }
function HomeAppIcon({ kind, size = 56 }) { return null; }
function TikTokFeed({ width, height }) { return null; }

window.ZeebDevice = ZeebDevice;
