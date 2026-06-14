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
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `
        radial-gradient(ellipse at 30% 20%, ${accent}22 0%, transparent 45%),
        radial-gradient(ellipse at 70% 80%, ${C.blue}33 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, ${C.bg2} 0%, ${C.bg0} 75%)
      `,
      overflow: 'hidden',
    }}>
      {/* Parallax grid (CSS 3D) */}
      <div style={{
        position: 'absolute', inset: '-20%',
        perspective: 900,
        opacity: 0.55,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          transform: `rotateX(64deg) translateZ(${depth * 0.6}px) translateY(${(t * 60) % 200 - 100}px)`,
          backgroundImage: `
            linear-gradient(${C.lineStrong} 1px, transparent 1px),
            linear-gradient(90deg, ${C.lineStrong} 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 25%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 25%, transparent 70%)',
        }} />
      </div>
      {/* Drift particles */}
      <ParticleField count={50} t={t} accent={accent} />
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

  // Scene-transition sweep: active for 0.6s after each boundary time
  let sweepP = -1;
  for (let i = 0; i < boundaries.length; i++) {
    const d = t - boundaries[i];
    if (d >= 0 && d < 0.6) { sweepP = d / 0.6; break; }
  }
  const flash = sweepP >= 0 ? (1 - sweepP) : 0;

  // Slow scanning highlight along the top edge
  const scanX = (t * 7) % 130 - 14;

  const Bracket = ({ pos }) => {
    const s = 46, w = 2, off = 26;
    const isR = pos === 'tr' || pos === 'br';
    const isB = pos === 'bl' || pos === 'br';
    const corner = isR ? { right: off } : { left: off };
    if (isB) corner.bottom = off; else corner.top = off;
    const arm = { position: 'absolute', background: C.cyan, opacity: 0.5, boxShadow: `0 0 8px ${C.cyan}` };
    return (
      <div style={{ position: 'absolute', width: s, height: s, ...corner }}>
        <div style={{ ...arm, width: w, height: s, [isR ? 'right' : 'left']: 0, [isB ? 'bottom' : 'top']: 0 }} />
        <div style={{ ...arm, width: s, height: w, [isR ? 'right' : 'left']: 0, [isB ? 'bottom' : 'top']: 0 }} />
      </div>
    );
  };

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 40, overflow: 'hidden' }}>
      {/* Cinematic vignette for depth */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 45%, transparent 52%, rgba(2,6,23,0.55) 100%)' }} />
      {/* CRT-style scanlines */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.32, backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.06) 0px, rgba(34,211,238,0.06) 1px, transparent 1px, transparent 4px)' }} />
      {/* Top hairline + scanning node */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.cyan}55, transparent)` }} />
      <div style={{ position: 'absolute', top: 0, left: `${scanX}%`, width: '12%', height: 2, background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`, boxShadow: `0 0 12px ${C.cyan}` }} />

      {/* Corner brackets */}
      <Bracket pos="tl" /><Bracket pos="tr" /><Bracket pos="bl" /><Bracket pos="br" />

      {/* Top-center live status chip */}
      <div style={{
        position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 11,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(248,250,252,0.55)', whiteSpace: 'nowrap',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: 4, background: C.green, boxShadow: `0 0 10px ${C.green}`, opacity: 0.55 + Math.sin(t * 4) * 0.45 }} />
        <span>SilentCheck</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span style={{ color: C.cyan }}>Clinique virtuelle</span>
        <span style={{ opacity: 0.35 }}>·</span>
        <span>Moteur BSD actif</span>
      </div>

      {/* Scene-transition light sweep + brief flash */}
      {sweepP >= 0 && (
        <React.Fragment>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sweepP * 100}%`, width: 4, marginLeft: -2, background: `linear-gradient(180deg, transparent, ${C.cyan}, transparent)`, boxShadow: `0 0 50px 8px ${C.cyan}`, opacity: 0.7 }} />
          <div style={{ position: 'absolute', inset: 0, background: C.cyan, opacity: flash * 0.05 }} />
        </React.Fragment>
      )}
    </div>
  );
}

Object.assign(window, {
  C, CosmicBackdrop, ParticleField, PulseLine, Heart3D, GlassCard, SectionTag, AnimatedNumber, ImmersiveHUD,
});
