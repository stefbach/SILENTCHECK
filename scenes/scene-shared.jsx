// Shared visual primitives — 3D heart, particles, grid, glow.

const C = {
  bg0: '#020617',          // deep navy black
  bg1: '#050a1f',
  bg2: '#0a1535',
  cyan: '#22d3ee',
  cyanDim: '#0891b2',
  blue: '#3b82f6',
  blueDeep: '#1e3a8a',
  red: '#f43f5e',
  redDim: '#9f1239',
  gold: '#fbbf24',
  goldDim: '#b45309',
  green: '#22c55e',
  greenDim: '#15803d',
  white: '#f8fafc',
  whiteDim: 'rgba(248,250,252,0.62)',
  line: 'rgba(34,211,238,0.18)',
  lineStrong: 'rgba(34,211,238,0.35)',
};

// ── 3D space backdrop with parallax grid + drifting particles ─────────────
function CosmicBackdrop({ depth = 0, hue = 'cyan' }) {
  const t = useTime();
  const accent = hue === 'red' ? C.red : hue === 'gold' ? C.gold : C.cyan;
  const b1x = 30 + Math.sin(t * 0.16) * 14;
  const b1y = 18 + Math.cos(t * 0.12) * 10;
  const b2x = 72 + Math.cos(t * 0.10) * 14;
  const b2y = 80 + Math.sin(t * 0.14) * 8;

  // Rotating wireframe hologram globe (global network motif)
  const R = 380;
  const lat = [];
  for (let i = 1; i < 7; i++) {
    const yy = -R + (i / 7) * 2 * R;
    lat.push({ yy, rx: Math.sqrt(Math.max(0, R * R - yy * yy)) });
  }
  const lon = [];
  for (let i = 0; i < 9; i++) {
    lon.push(Math.abs(R * Math.cos((i / 9) * Math.PI + t * 0.14)));
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.bg0 }}>
      {/* Animated nebula blooms */}
      <div style={{
        position: 'absolute', inset: '-12%',
        background: `
          radial-gradient(38% 48% at ${b1x}% ${b1y}%, ${accent}40 0%, transparent 60%),
          radial-gradient(44% 54% at ${b2x}% ${b2y}%, ${C.blue}44 0%, transparent 62%),
          radial-gradient(70% 50% at 50% 116%, ${accent}33 0%, transparent 60%),
          radial-gradient(ellipse at 50% 50%, ${C.bg2} 0%, ${C.bg0} 80%)
        `,
      }} />

      {/* Rotating wireframe hologram globe */}
      {!LITE && (
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <g transform="translate(960 560)" stroke={accent} fill="none" strokeWidth="1.2">
          <circle r={R} opacity="0.55" />
          {lat.map((l, i) => (
            <ellipse key={'lat' + i} cy={l.yy * 0.32} rx={l.rx} ry={l.rx * 0.3} opacity="0.4" />
          ))}
          {lon.map((rx, i) => (
            <ellipse key={'lon' + i} rx={rx} ry={R} opacity="0.32" />
          ))}
        </g>
      </svg>
      )}

      {/* Neon perspective grid */}
      <div style={{ position: 'absolute', inset: '-20%', perspective: 900, opacity: 0.7 }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: `rotateX(66deg) translateZ(${depth * 0.6}px) translateY(${(t * 70) % 160 - 80}px)`,
          backgroundImage: `
            linear-gradient(${accent}66 1px, transparent 1px),
            linear-gradient(90deg, ${accent}55 1px, transparent 1px)
          `,
          backgroundSize: '110px 110px',
          maskImage: 'radial-gradient(ellipse at 50% 28%, #000 22%, transparent 68%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 28%, #000 22%, transparent 68%)',
        }} />
      </div>

      {/* Glowing horizon line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '54%', height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        boxShadow: `0 0 40px 6px ${accent}88`, opacity: 0.55,
      }} />

      {/* Sweeping volumetric light beam */}
      {!LITE && (
      <div style={{
        position: 'absolute', top: '-30%', left: '50%', width: '36%', height: '160%',
        transform: `translateX(-50%) rotate(${18 + Math.sin(t * 0.3) * 6}deg)`,
        background: `linear-gradient(90deg, transparent, ${accent}16, transparent)`,
        filter: 'blur(22px)',
      }} />
      )}

      {/* Drift particles */}
      <ParticleField count={LITE ? 16 : 70} t={t} accent={accent} />
    </div>
  );
}

function ParticleField({ count = 40, t, accent }) {
  const items = React.useMemo(() => Array.from({ length: count }, (_, i) => {
    const seed = i * 9301 + 49297;
    const r = (n) => ((Math.sin(seed * n) + 1) / 2);
    return {
      x: r(1) * 1920,
      y: r(2) * 1080,
      size: 1 + r(3) * 3,
      speed: 0.2 + r(4) * 0.6,
      drift: r(5) * 30,
      phase: r(6) * Math.PI * 2,
    };
  }), [count]);
  return (
    <>
      {items.map((p, i) => {
        const yy = (p.y + t * p.speed * 80) % 1080;
        const xx = p.x + Math.sin(t * 0.8 + p.phase) * p.drift;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: xx, top: yy,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 ${p.size * 4}px ${accent}`,
            opacity: 0.5 + Math.sin(t * 1.5 + p.phase) * 0.3,
          }} />
        );
      })}
    </>
  );
}

// ── 3D ECG / Pulse line ──────────────────────────────────────────────
function PulseLine({ y = 540, color = C.cyan, amp = 80, opacity = 1 }) {
  const t = useTime();
  const points = [];
  for (let x = 0; x <= 1920; x += 8) {
    let yOff = Math.sin((x / 1920) * Math.PI * 6 + t * 2) * 6;
    const beat = ((x / 1920) * 4 + t * 0.5) % 1;
    if (beat > 0.45 && beat < 0.55) {
      const k = (beat - 0.5) / 0.05;
      yOff -= Math.exp(-k * k * 4) * amp;
    } else if (beat > 0.55 && beat < 0.62) {
      yOff += 12;
    }
    points.push(`${x},${y + yOff}`);
  }
  return (
    <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity }}>
      <defs>
        <filter id="pulseglow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <polyline points={points.join(' ')} fill="none" stroke={color} strokeWidth="2.5" filter="url(#pulseglow)" strokeLinejoin="round" />
    </svg>
  );
}

// ── 3D animated heart ──────────────────────────────────────────────
function Heart3D({ x = 960, y = 540, size = 280, beat = true }) {
  const t = useTime();
  const pulse = beat ? 1 + Math.max(0, Math.sin(t * 2.4)) ** 8 * 0.18 : 1;
  const wobble = Math.sin(t * 0.6) * 8;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(-50%, -50%) perspective(1200px) rotateY(${wobble}deg) rotateX(${-Math.sin(t*0.5)*5}deg) scale(${pulse})`,
      transformStyle: 'preserve-3d',
      width: size, height: size,
      filter: `drop-shadow(0 0 60px ${C.red}) drop-shadow(0 0 24px ${C.red})`,
    }}>
      <svg width={size} height={size} viewBox="-100 -100 200 200">
        <defs>
          <radialGradient id="heartGrad" cx="35%" cy="30%">
            <stop offset="0%" stopColor="#ff6b8a" />
            <stop offset="50%" stopColor={C.red} />
            <stop offset="100%" stopColor={C.redDim} />
          </radialGradient>
          <linearGradient id="heartShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path d="M 0,40 C -50,10 -90,-20 -90,-50 C -90,-80 -60,-95 -30,-80 C -10,-70 0,-50 0,-40 C 0,-50 10,-70 30,-80 C 60,-95 90,-80 90,-50 C 90,-20 50,10 0,40 Z"
              fill="url(#heartGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        <path d="M 0,30 C -42,4 -75,-18 -75,-44 C -75,-62 -55,-72 -32,-62"
              fill="none" stroke="url(#heartShine)" strokeWidth="3" opacity="0.7" />
      </svg>
      {/* Pulse rings */}
      {[0, 1, 2].map(i => {
        const phase = (t * 1.2 + i * 0.4) % 1.5;
        if (phase > 1) return null;
        return (
          <div key={i} style={{
            position: 'absolute', left: '50%', top: '50%',
            width: size * (0.7 + phase * 0.9), height: size * (0.7 + phase * 0.9),
            transform: 'translate(-50%, -50%)',
            border: `2px solid ${C.red}`,
            borderRadius: '50%',
            opacity: (1 - phase) * 0.5,
          }} />
        );
      })}
    </div>
  );
}

// ── Glass card panel ──────────────────────────────────────────────
function GlassCard({ x, y, w, h, children, tilt = 0, depth = 0, opacity = 1, border = C.lineStrong }) {
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: w, height: h,
      transform: `perspective(1400px) rotateY(${tilt}deg) translateZ(${depth}px)`,
      transformStyle: 'preserve-3d',
      background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(59,130,246,0.04) 100%)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      border: `1px solid ${border}`,
      borderRadius: 18,
      boxShadow: `0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
      opacity,
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
        opacity: 0.7,
      }} />
      {children}
    </div>
  );
}

// ── Section header tag ──────────────────────────────────────────────
function SectionTag({ index, label, x = 96, y = 96, color = C.cyan }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      display: 'flex', alignItems: 'center', gap: 14,
      fontFamily: 'Orbitron, JetBrains Mono, monospace',
      fontSize: 14,
      letterSpacing: '0.3em',
      color: color,
      textTransform: 'uppercase',
    }}>
      <div style={{ width: 40, height: 1, background: color }} />
      <span style={{ opacity: 0.7 }}>{index}</span>
      <span style={{ color: C.white }}>{label}</span>
    </div>
  );
}

// ── Animated counter ──────────────────────────────────────────────
function AnimatedNumber({ from = 0, to = 100, duration = 1, suffix = '', prefix = '', decimals = 0 }) {
  const { localTime } = useSprite();
  const t = clamp(localTime / duration, 0, 1);
  const eased = Easing.easeOutCubic(t);
  const v = from + (to - from) * eased;
  return <>{prefix}{v.toFixed(decimals)}{suffix}</>;
}

// ── Immersive HUD overlay — global healthtech command-interface chrome ─────
// Rendered above every scene. Cinematic vignette + scanlines + corner
// brackets + live status + scene-transition light sweeps. Driven by the
// global playhead so it stays in sync with the film.
function ImmersiveHUD({ boundaries = [] }) {
  const t = useTime();

  // Scene-transition sweep: active for 0.7s after each boundary time
  let sweepP = -1;
  for (let i = 0; i < boundaries.length; i++) {
    const d = t - boundaries[i];
    if (d >= 0 && d < 0.7) { sweepP = d / 0.7; break; }
  }
  const flash = sweepP >= 0 ? (1 - sweepP) : 0;

  const scanX = (t * 7) % 130 - 14;
  const rollY = (t * 14) % 124 - 12; // rolling scan band (% of height)

  // Bottom ECG vitals trace (skipped in lite/mobile mode)
  const pts = [];
  if (!LITE) {
    for (let x = 0; x <= 1920; x += 6) {
      let y = 24;
      const beat = ((x / 1920) * 6 + t * 1.2) % 1;
      if (beat > 0.47 && beat < 0.53) { const k = (beat - 0.5) / 0.03; y -= Math.exp(-k * k * 3) * 20; }
      else if (beat > 0.53 && beat < 0.58) y += 6;
      else y += Math.sin(x * 0.05 + t * 3) * 1.4;
      pts.push(x + ',' + y.toFixed(1));
    }
  }
  const bpm = Math.round(64 + Math.sin(t * 1.1) * 5);

  const Bracket = ({ pos }) => {
    const s = 58, w = 2, off = 24;
    const isR = pos === 'tr' || pos === 'br';
    const isB = pos === 'bl' || pos === 'br';
    const corner = isR ? { right: off } : { left: off };
    if (isB) corner.bottom = off; else corner.top = off;
    const arm = { position: 'absolute', background: C.cyan, opacity: 0.7, boxShadow: `0 0 10px ${C.cyan}` };
    return (
      <div style={{ position: 'absolute', width: s, height: s, ...corner }}>
        <div style={{ ...arm, width: w, height: s, [isR ? 'right' : 'left']: 0, [isB ? 'bottom' : 'top']: 0 }} />
        <div style={{ ...arm, width: s, height: w, [isR ? 'right' : 'left']: 0, [isB ? 'bottom' : 'top']: 0 }} />
      </div>
    );
  };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40, overflow: 'hidden' }}>
      {/* Cinematic vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(2,6,23,0.62) 100%)' }} />
      {/* CRT scanlines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.4, backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.07) 0px, rgba(34,211,238,0.07) 1px, transparent 1px, transparent 4px)' }} />
      {/* Rolling scan band */}
      {!LITE && <div style={{ position: 'absolute', left: 0, right: 0, top: `${rollY}%`, height: '9%', background: `linear-gradient(180deg, transparent, ${C.cyan}14, transparent)` }} />}
      {/* Top hairline + scanning node */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.cyan}66, transparent)` }} />
      <div style={{ position: 'absolute', top: 0, left: `${scanX}%`, width: '12%', height: 2, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, boxShadow: `0 0 14px ${C.cyan}` }} />

      {/* Corner brackets */}
      <Bracket pos="tl" /><Bracket pos="tr" /><Bracket pos="bl" /><Bracket pos="br" />

      {/* Top-center live status chip */}
      <div style={{
        position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 11,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(248,250,252,0.6)', whiteSpace: 'nowrap',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: C.green, boxShadow: `0 0 10px ${C.green}`, opacity: 0.55 + Math.sin(t * 4) * 0.45 }} />
        <span>SilentCheck</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span style={{ color: C.cyan }}>Clinique virtuelle</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span>Moteur BSD actif</span>
      </div>

      {/* Bottom ECG vitals monitor */}
      {!LITE && (
      <React.Fragment>
        <svg width="1920" height="48" viewBox="0 0 1920 48" style={{ position: 'absolute', left: 0, bottom: 0, opacity: 0.75 }}>
          <polyline points={pts.join(' ')} fill="none" stroke={C.red} strokeWidth="2"
                    style={{ filter: `drop-shadow(0 0 6px ${C.red})` }} />
        </svg>
        <div style={{
          position: 'absolute', bottom: 10, right: 28,
          fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12,
          color: C.red, letterSpacing: '0.15em', textShadow: `0 0 12px ${C.red}`,
        }}>♥ {bpm} BPM</div>
      </React.Fragment>
      )}

      {/* Scene-transition diagonal light wipe + flash */}
      {sweepP >= 0 && (
        <React.Fragment>
          <div style={{
            position: 'absolute', top: '-20%', bottom: '-20%',
            left: `${sweepP * 122 - 11}%`, width: '13%',
            transform: 'skewX(-12deg)',
            background: `linear-gradient(90deg, transparent, ${C.cyan}cc, rgba(255,255,255,0.85), ${C.cyan}cc, transparent)`,
            boxShadow: `0 0 90px 24px ${C.cyan}`, opacity: 0.85,
          }} />
          <div style={{ position: 'absolute', inset: 0, background: C.cyan, opacity: flash * 0.08 }} />
        </React.Fragment>
      )}
    </div>
  );
}

Object.assign(window, {
  C, CosmicBackdrop, ParticleField, PulseLine, Heart3D, GlassCard, SectionTag, AnimatedNumber, ImmersiveHUD,
});
