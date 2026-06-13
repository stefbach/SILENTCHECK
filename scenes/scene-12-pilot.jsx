// Scene — L'application pilote : tout est dans le téléphone.
// (Remplace l'ancienne scène "le biologiste pilote".)
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

        // What the app orchestrates — outer ring (cardiovascular-centric, no cancer)
        const domains = [
          { label: 'Réseau international',   icon: '◍', color: C.gold, angle: 0 },
          { label: 'RDV garantis',           icon: '◷', color: C.cyan, angle: 1 },
          { label: 'Zéro liste d’attente',   icon: '✓', color: C.gold, angle: 2 },
          { label: 'Second avis expert',     icon: '◈', color: C.cyan, angle: 3 },
          { label: 'Prévention cardio',      icon: '♥', color: C.red,  angle: 4 },
          { label: 'Obésité & métabolisme',  icon: '◐', color: C.gold, angle: 5 },
          { label: 'Règles de vie',          icon: '∞', color: C.cyan, angle: 6 },
          { label: 'Suivi continu',          icon: '◉', color: C.cyan, angle: 7 },
        ];

        // Tools the app runs — inner ring
        const tools = [
          { label: 'IA bien-être',          icon: '◆' },
          { label: 'Capteurs connectés',    icon: '◇' },
          { label: 'Biomarqueurs ciblés',   icon: '◉' },
          { label: 'Téléconsultation',      icon: '◎' },
          { label: 'Score BSD',             icon: '✦' },
          { label: 'Plan de prévention',    icon: '⌖' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0, overflow: 'hidden' }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="16" label="L’application pilote · tout dans le téléphone" color={C.gold} />

            {/* Title */}
            <div style={{
              position: 'absolute', left: 96, top: 150,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
              maxWidth: 1400,
            }}>
              Ce n’est plus le système qui vous balade.<br/>
              C’est <span style={{ fontStyle: 'italic', color: C.gold }}>l’application qui pilote.</span>
            </div>

            {/* Scope / positioning line — persists through the scene */}
            <div style={{
              position: 'absolute', left: 96, top: 282, right: 96,
              opacity: titleIn,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: C.cyan,
              letterSpacing: '0.1em',
            }}>
              Centrée prévention cardiovasculaire — obésité &amp; mode de vie compris · hors dépistage du cancer
            </div>

            {/* PHASE 1 — "HIER": un parcours éclaté, des délais (0–6.5s) */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 360,
              opacity: oldRoleIn * (1 - oldRoleOut),
              transform: `translateY(${(1-oldRoleIn)*20 - oldRoleOut*40}px)`,
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 36,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.whiteDim,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              }}>HIER · Parcours éclaté</div>
              {[
                { label: 'Généraliste' }, { label: 'Spécialiste' }, { label: 'Laboratoire' },
                { label: 'Hôpital' }, { label: 'Liste d’attente', pain: true }, { label: 'Délais', pain: true },
              ].map((n, i) => (
                <div key={i} style={{
                  padding: '20px 26px',
                  background: n.pain ? 'rgba(244,63,94,0.12)' : 'rgba(248,250,252,0.04)',
                  border: `1px solid ${n.pain ? C.red + '88' : C.line}`,
                  borderRadius: 10,
                  fontFamily: 'Inter', fontSize: 16, fontWeight: n.pain ? 500 : 300,
                  color: n.pain ? C.red : C.whiteDim, letterSpacing: '0.05em',
                }}>{n.label}</div>
              ))}
            </div>
            <div style={{
              position: 'absolute', left: '50%', top: 660,
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
              Un parcours éclaté. Des <span style={{ color: C.red, fontStyle: 'normal', fontWeight: 500 }}>délais.</span> Des <span style={{ color: C.red, fontStyle: 'normal', fontWeight: 500 }}>angles morts.</span>
            </div>

            {/* PHASE 2 — "AUJOURD'HUI": the app at center, tools and services orbiting */}
            {/* Central app cockpit */}
            <div style={{
              position: 'absolute', left: 960, top: 660,
              transform: `translate(-50%, -50%) scale(${0.4 + cockpitIn * 0.6})`,
              opacity: cockpitIn,
              transformStyle: 'preserve-3d',
            }}>
              <svg width="500" height="500" viewBox="0 0 500 500" style={{ overflow: 'visible' }}>
                <defs>
                  <radialGradient id="appCore" cx="0.5" cy="0.5">
                    <stop offset="0%" stopColor={C.gold} stopOpacity="0.9" />
                    <stop offset="60%" stopColor={C.gold} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="appRing" x1="0" y1="0" x2="1" y2="1">
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
                <circle cx="250" cy="250" r="180" fill="url(#appCore)" />
                {/* Hexagonal command frame */}
                <polygon points="250,90 380,165 380,335 250,410 120,335 120,165"
                         fill="none" stroke="url(#appRing)" strokeWidth="2" opacity="0.9"
                         transform={`rotate(${t * 6} 250 250)`} />
                <polygon points="250,120 350,180 350,320 250,380 150,320 150,180"
                         fill="rgba(8,15,40,0.7)" stroke={C.gold} strokeWidth="1.5"
                         transform={`rotate(${-t * 4} 250 250)`} />
                {/* Phone glyph at the center */}
                <g transform="translate(250 250)">
                  <rect x="-46" y="-78" width="92" height="156" rx="16" fill="rgba(8,15,40,0.92)" stroke={C.gold} strokeWidth="2.5" />
                  <rect x="-46" y="-78" width="92" height="156" rx="16" fill="none" stroke={C.cyan} strokeWidth="1" opacity="0.5" />
                  <line x1="-12" y1="-68" x2="12" y2="-68" stroke={C.gold} strokeWidth="3" strokeLinecap="round" />
                  {/* heartbeat */}
                  <path d="M -34 4 L -16 4 L -8 -20 L 2 28 L 10 -8 L 18 4 L 34 4"
                        fill="none" stroke={C.red} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                  {/* score chip */}
                  <rect x="-32" y="40" width="64" height="22" rx="6" fill={C.gold} opacity="0.92" />
                  <text x="0" y="55" textAnchor="middle" fill={C.bg0} fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="700">BSD 42</text>
                </g>
              </svg>
              {/* Label under */}
              <div style={{
                position: 'absolute', left: '50%', bottom: -30,
                transform: 'translateX(-50%)', textAlign: 'center',
                fontFamily: 'Inter', whiteSpace: 'nowrap',
              }}>
                <div style={{ fontSize: 28, fontWeight: 400, color: C.white, letterSpacing: '0.05em' }}>L’APPLICATION</div>
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

            {/* Services orchestrated — outer ring connectors */}
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

            {/* AUJOURD'HUI label */}
            <div style={{
              position: 'absolute', left: 96, top: 360,
              opacity: orbitIn,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.gold,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              writingMode: 'vertical-rl', transform: 'rotate(180deg)',
              border: `1px solid ${C.gold}55`, padding: '12px 8px',
            }}>AUJOURD’HUI · L’APP PILOTE</div>

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
              Au centre : <span style={{ color: C.gold, fontWeight: 500, fontStyle: 'italic' }}>l’application orchestre tout</span> · IA, capteurs, score, réseau d’experts de renommée internationale — <span style={{ color: C.cyan }}>RDV garantis, zéro liste d’attente, tout dans votre téléphone, validé par des médecins.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene12Authors });
