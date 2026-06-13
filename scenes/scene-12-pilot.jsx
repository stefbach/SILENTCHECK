// Scene 12 — Le biologiste, pilote de la médecine de prévention
function Scene12Authors({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.9, 0, 1);
        const oldRoleIn = clamp((t - 1.0) / 0.8, 0, 1);
        // Phase 1 fully fades out by t=7.5; phase 2 doesn't start until t=8 (no overlap)
        const oldRoleOut = clamp((t - 6.5) / 1.0, 0, 1);
        const cockpitIn = clamp((t - 8.0) / 1.5, 0, 1);
        const orbitIn = clamp((t - 10.0) / 1.5, 0, 1);
        const manifestoIn = clamp((t - 16.0) / 1.0, 0, 1);

        // 8 domains of preventive medicine orbiting the biologist
        const domains = [
          { label: 'Cardiovasculaire',     icon: '♥', color: C.red,  angle: 0 },
          { label: 'Métabolique · Diabète', icon: '◈', color: C.gold, angle: 1 },
          { label: 'Oncologie préventive',  icon: '✦', color: C.cyan, angle: 2 },
          { label: 'Cognitif · Neuro',      icon: '⌬', color: C.gold, angle: 3 },
          { label: 'Inflammation chronique', icon: '◉', color: C.red,  angle: 4 },
          { label: 'Hormonal · Longévité',  icon: '∞', color: C.cyan, angle: 5 },
          { label: 'Hépato-rénal',          icon: '⬡', color: C.gold, angle: 6 },
          { label: 'Immuno-vasculaire',     icon: '◐', color: C.cyan, angle: 7 },
        ];

        // Tools the biologist orchestrates
        const tools = [
          { label: 'IA médicale',           icon: '◆' },
          { label: 'Capteurs connectés',    icon: '◇' },
          { label: 'Biomarqueurs ciblés',   icon: '◉' },
          { label: 'Téléconsultation',      icon: '◎' },
          { label: 'Score multi-dimensions', icon: '✦' },
          { label: 'Plan de prévention',    icon: '⌖' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0, overflow: 'hidden' }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="16" label="Le biologiste · pilote de la médecine de prévention" color={C.gold} />

            {/* Title */}
            <div style={{
              position: 'absolute', left: 96, top: 150,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
              maxWidth: 1300,
            }}>
              D'acteur du système, à <span style={{ fontStyle: 'italic', color: C.gold }}>pilote</span> de la médecine de demain.
            </div>

            {/* PHASE 1 — "AVANT": biologist as one node among many (0–4.5s) */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 320,
              opacity: oldRoleIn * (1 - oldRoleOut),
              transform: `translateY(${(1-oldRoleIn)*20 - oldRoleOut*40}px)`,
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.whiteDim,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              }}>HIER · Acteur passif</div>
              {['Patient', 'Généraliste', 'Spécialiste', 'BIOLOGISTE', 'Pharmacien', 'Hôpital'].map((label, i) => {
                const isBio = label === 'BIOLOGISTE';
                return (
                  <div key={i} style={{
                    padding: '20px 28px',
                    background: isBio ? `rgba(251,191,36,0.12)` : 'rgba(248,250,252,0.04)',
                    border: `1px solid ${isBio ? C.gold + '88' : C.line}`,
                    borderRadius: 10,
                    fontFamily: 'Inter', fontSize: 16, fontWeight: isBio ? 500 : 300,
                    color: isBio ? C.gold : C.whiteDim, letterSpacing: '0.05em',
                  }}>{label}</div>
                );
              })}
            </div>
            <div style={{
              position: 'absolute', left: '50%', top: 640,
              transform: `translate(-50%, ${(1 - clamp((t - 2.5) / 1.2, 0, 1)) * 30}px) scale(${0.92 + clamp((t - 2.5) / 1.2, 0, 1) * 0.08})`,
              opacity: clamp((t - 2.5) / 1.2, 0, 1) * (1 - oldRoleOut),
              fontFamily: 'Inter', fontSize: 22, color: C.whiteDim, fontStyle: 'italic',
              padding: '14px 32px',
              background: 'rgba(8,15,40,0.7)',
              border: `1px solid ${C.line}`,
              borderRadius: 100,
              backdropFilter: 'blur(8px)',
              boxShadow: `0 10px 30px rgba(0,0,0,0.4)`,
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}>
              Une analyse demandée. Un résultat rendu. <span style={{ color: C.gold, fontStyle: 'normal', fontWeight: 500 }}>Pas de stratégie.</span> <span style={{ color: C.gold, fontStyle: 'normal', fontWeight: 500 }}>Pas de pilotage.</span>
            </div>

            {/* PHASE 2 — "DEMAIN": biologist at center, tools and domains orbiting */}
            {/* Central biologist cockpit */}
            <div style={{
              position: 'absolute', left: 960, top: 660,
              transform: `translate(-50%, -50%) scale(${0.4 + cockpitIn * 0.6})`,
              opacity: cockpitIn,
              transformStyle: 'preserve-3d',
            }}>
              <svg width="500" height="500" viewBox="0 0 500 500" style={{ overflow: 'visible' }}>
                <defs>
                  <radialGradient id="bioCore" cx="0.5" cy="0.5">
                    <stop offset="0%" stopColor={C.gold} stopOpacity="0.9" />
                    <stop offset="60%" stopColor={C.gold} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="bioRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={C.gold} />
                    <stop offset="100%" stopColor={C.cyan} />
                  </linearGradient>
                </defs>
                {/* Outer pulsing rings */}
                {[0, 1, 2].map(i => {
                  const phase = (t * 0.6 + i * 0.7) % 2;
                  return (
                    <circle key={i} cx="250" cy="250" r={150 + phase * 60}
                            fill="none" stroke={C.gold} strokeWidth="1"
                            opacity={(1 - phase / 2) * 0.4} />
                  );
                })}
                {/* Core glow */}
                <circle cx="250" cy="250" r="180" fill="url(#bioCore)" />
                {/* Hexagonal frame (laboratory motif) */}
                <polygon points="250,90 380,165 380,335 250,410 120,335 120,165"
                         fill="none" stroke="url(#bioRing)" strokeWidth="2" opacity="0.9"
                         transform={`rotate(${t * 6} 250 250)`} />
                <polygon points="250,120 350,180 350,320 250,380 150,320 150,180"
                         fill="rgba(8,15,40,0.7)" stroke={C.gold} strokeWidth="1.5"
                         transform={`rotate(${-t * 4} 250 250)`} />
                {/* Microscope / atom icon center */}
                <g transform="translate(250 250)">
                  {/* Atom orbits */}
                  <ellipse cx="0" cy="0" rx="60" ry="22" fill="none" stroke={C.cyan} strokeWidth="1.5" opacity="0.7"
                           transform={`rotate(${t * 30})`} />
                  <ellipse cx="0" cy="0" rx="60" ry="22" fill="none" stroke={C.gold} strokeWidth="1.5" opacity="0.7"
                           transform={`rotate(${60 + t * 30})`} />
                  <ellipse cx="0" cy="0" rx="60" ry="22" fill="none" stroke={C.cyan} strokeWidth="1.5" opacity="0.7"
                           transform={`rotate(${120 + t * 30})`} />
                  <circle cx="0" cy="0" r="14" fill={C.gold} />
                  <circle cx="0" cy="0" r="14" fill="none" stroke={C.white} strokeWidth="1" />
                </g>
              </svg>
              {/* Label under */}
              <div style={{
                position: 'absolute', left: '50%', bottom: -30,
                transform: 'translateX(-50%)', textAlign: 'center',
                fontFamily: 'Inter', whiteSpace: 'nowrap',
              }}>
                <div style={{ fontSize: 28, fontWeight: 400, color: C.white, letterSpacing: '0.05em' }}>LE BIOLOGISTE</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: C.gold, letterSpacing: '0.4em', marginTop: 6 }}>· PILOTE ·</div>
              </div>
            </div>

            {/* Tools — inner ring */}
            {tools.map((tool, i) => {
              const a = (i / tools.length) * Math.PI * 2 - Math.PI / 2 + t * 0.15;
              const r = 280;
              const cx = 960, cy = 660;
              const x = cx + Math.cos(a) * r;
              const y = cy + Math.sin(a) * r * 0.45;
              const sIn = clamp((t - 10.0 - i * 0.2) / 0.7, 0, 1);
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y,
                  transform: `translate(-50%, -50%) scale(${0.6 + sIn * 0.4})`,
                  opacity: sIn * orbitIn * 0.85,
                  padding: '8px 14px',
                  background: 'rgba(8,15,40,0.85)',
                  border: `1px solid ${C.cyan}66`,
                  borderRadius: 100,
                  display: 'flex', alignItems: 'center', gap: 8,
                  backdropFilter: 'blur(6px)',
                  boxShadow: `0 0 16px ${C.cyan}33`,
                }}>
                  <span style={{ color: C.cyan, fontSize: 14 }}>{tool.icon}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.white, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{tool.label}</span>
                </div>
              );
            })}

            {/* Domains — outer ring */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {domains.map((d, i) => {
                const a = (d.angle / domains.length) * Math.PI * 2 - Math.PI / 2 - t * 0.1;
                const r = 480;
                const cx = 960, cy = 660;
                const x = cx + Math.cos(a) * r;
                const y = cy + Math.sin(a) * r * 0.5;
                const dashOffset = -(t * 40 + i * 5) % 20;
                return (
                  <line key={i} x1={cx} y1={cy} x2={x} y2={y}
                        stroke={d.color} strokeWidth="1" opacity={orbitIn * 0.3}
                        strokeDasharray="2 6" strokeDashoffset={dashOffset} />
                );
              })}
            </svg>

            {domains.map((d, i) => {
              const a = (d.angle / domains.length) * Math.PI * 2 - Math.PI / 2 - t * 0.1;
              const r = 480;
              const cx = 960, cy = 660;
              const x = cx + Math.cos(a) * r;
              const y = cy + Math.sin(a) * r * 0.5;
              const sIn = clamp((t - 12.0 - i * 0.2) / 0.7, 0, 1);
              const wob = Math.sin(t * 1.0 + i * 0.5) * 4;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y + wob,
                  transform: `translate(-50%, -50%) scale(${0.6 + sIn * 0.4})`,
                  opacity: sIn * orbitIn,
                  padding: '10px 16px',
                  background: 'rgba(8,15,40,0.92)',
                  border: `1.5px solid ${d.color}aa`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', gap: 10,
                  boxShadow: `0 0 24px ${d.color}55`,
                  backdropFilter: 'blur(8px)',
                  minWidth: 180,
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: `${d.color}22`,
                    border: `1px solid ${d.color}88`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: d.color, fontSize: 14,
                  }}>{d.icon}</div>
                  <span style={{
                    fontFamily: 'Inter', fontSize: 13, fontWeight: 500, color: C.white,
                    letterSpacing: '0.02em',
                  }}>{d.label}</span>
                </div>
              );
            })}

            {/* DEMAIN label */}
            <div style={{
              position: 'absolute', left: 96, top: 320,
              opacity: orbitIn,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.gold,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              border: `1px solid ${C.gold}55`, padding: '12px 8px',
            }}>DEMAIN · PILOTE ACTIF</div>

            {/* Bottom manifesto */}
            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 40,
              opacity: manifestoIn,
              padding: '18px 28px', borderRadius: 12,
              border: `1px solid ${C.gold}55`,
              background: 'linear-gradient(90deg, rgba(251,191,36,0.1), rgba(34,211,238,0.06))',
              fontFamily: 'Inter', fontSize: 19, color: C.white, fontWeight: 300,
              textAlign: 'center', letterSpacing: '0.02em', lineHeight: 1.4,
            }}>
              Au cœur de l'écosystème : <span style={{ color: C.gold, fontWeight: 500, fontStyle: 'italic' }}>le biologiste orchestre</span> · IA, capteurs, biomarqueurs, score, plan de prévention <span style={{ color: C.cyan }}>— bien au-delà du cardiovasculaire.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene12Authors });
