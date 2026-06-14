// Scene 14 — Connected app hub + dual delivery model
function Scene14Hub({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const phoneIn = clamp((t - 0.8) / 1.0, 0, 1);
        const orbitsIn = clamp((t - 1.8) / 1.0, 0, 1);
        const modesIn = clamp((t - 4.0) / 0.8, 0, 1);

        // Live telemetry values that animate
        const hr  = Math.round(68 + Math.sin(t * 1.4) * 6);
        const bp1 = Math.round(126 + Math.sin(t * 0.7) * 4);
        const bp2 = Math.round(82 + Math.sin(t * 0.9) * 3);
        const glu = (1.02 + Math.sin(t * 0.6) * 0.08).toFixed(2);
        const wt  = (74.2 + Math.sin(t * 0.4) * 0.3).toFixed(1);
        const o2  = Math.round(97 + Math.sin(t * 1.1) * 1);

        // Sensors orbiting the phone
        const cx = 700, cy = 660;
        const sensors = [
          { a: -Math.PI/2,           label: 'Tensiomètre',   value: `${bp1}/${bp2}`,  unit: 'mmHg', color: C.gold },
          { a: -Math.PI/2 + Math.PI*1/6, label: 'CGM glycémie', value: glu,             unit: 'g/L',  color: C.gold },
          { a: -Math.PI/2 + Math.PI*2/6, label: 'Montre · pouls', value: hr,            unit: 'bpm',  color: C.gold },
          { a: -Math.PI/2 + Math.PI*3/6, label: 'SpO₂',         value: o2,              unit: '%',    color: C.gold },
          { a: -Math.PI/2 + Math.PI*4/6, label: 'Balance',      value: wt,              unit: 'kg',   color: C.gold },
          { a: -Math.PI/2 + Math.PI*5/6, label: 'Sommeil',      value: '7h12',          unit: 'qual.', color: C.cyan },
          { a: -Math.PI/2 + Math.PI*6/6, label: 'Pas',          value: '8 412',         unit: 'pas',  color: C.cyan },
          { a: -Math.PI/2 + Math.PI*7/6, label: 'Air · PM2.5',  value: '23',            unit: 'µg/m³', color: C.cyan },
          { a: -Math.PI/2 + Math.PI*8/6, label: 'Bruit',        value: '58',            unit: 'dB(A)', color: C.cyan },
          { a: -Math.PI/2 + Math.PI*9/6, label: 'Chaleur',      value: '31',            unit: '°C',   color: C.cyan },
          { a: -Math.PI/2 + Math.PI*10/6, label: 'Stress · VFC', value: '42',           unit: 'ms',   color: C.cyan },
          { a: -Math.PI/2 + Math.PI*11/6, label: 'HbA1c',       value: '5,4',           unit: '%',    color: C.red },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="08" label="Connecteurs · tous vos appareils dans l'app" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 170,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Tous vos appareils parlent à l'app.<br/>
              <span style={{ fontStyle: 'italic', fontSize: 32, fontWeight: 300, color: C.cyan }}>
                En temps réel — tout converge dans un seul score BSD.
              </span>
            </div>

            {/* Streaming data lines from sensors → phone */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <defs>
                <radialGradient id="hubGlow" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r="280" fill="url(#hubGlow)" opacity={orbitsIn * 0.8} />
              {sensors.map((s, i) => {
                const r = 320;
                const sx = cx + Math.cos(s.a) * r;
                const sy = cy + Math.sin(s.a) * r * 0.55;
                const phoneEdgeX = cx;
                const phoneEdgeY = cy;
                const dashOffset = -(t * 60 + i * 8) % 24;
                return (
                  <line key={i} x1={sx} y1={sy} x2={phoneEdgeX} y2={phoneEdgeY}
                        stroke={s.color} strokeWidth="1.2" opacity={orbitsIn * 0.4}
                        strokeDasharray="3 6" strokeDashoffset={dashOffset} />
                );
              })}
            </svg>

            {/* Central phone */}
            <div style={{
              position: 'absolute', left: cx, top: cy,
              transform: `translate(-50%, -50%) perspective(1500px) rotateY(${Math.sin(t * 0.5) * 6}deg) scale(${0.7 + phoneIn * 0.3})`,
              opacity: phoneIn, transformStyle: 'preserve-3d',
              zIndex: 10,
            }}>
              <div style={{
                width: 240, height: 480,
                background: 'linear-gradient(135deg, #1a2540, #0a1535)',
                borderRadius: 32, padding: 8,
                border: `2px solid ${C.lineStrong}`,
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${C.cyan}55`,
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 70, height: 16, background: '#000', borderRadius: 10, zIndex: 2 }} />
                <div style={{
                  width: '100%', height: '100%', background: C.bg0,
                  borderRadius: 26, overflow: 'hidden',
                  padding: '36px 16px 16px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.cyan, letterSpacing: '0.2em' }}>● LIVE</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim }}>SilentCheck</div>
                  </div>
                  <div style={{ fontSize: 14, color: C.white, fontWeight: 500, marginTop: 4 }}>Tableau de bord</div>
                  {/* Mini metrics */}
                  {[
                    ['Pouls', `${hr} bpm`, C.red],
                    ['Tension', `${bp1}/${bp2}`, C.gold],
                    ['Glycémie', `${glu} g/L`, C.gold],
                    ['Pas', '8 412', C.cyan],
                    ['Sommeil', '7h12', C.cyan],
                    ['Air PM2.5', '23 µg', C.cyan],
                  ].map(([k, v, col], i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      padding: '7px 10px',
                      background: 'rgba(34,211,238,0.05)',
                      border: `1px solid ${C.line}`,
                      borderRadius: 6, fontSize: 10,
                    }}>
                      <span style={{ color: C.whiteDim }}>{k}</span>
                      <span style={{ color: col, fontWeight: 600, fontFamily: 'JetBrains Mono, monospace' }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', padding: '8px', background: `linear-gradient(135deg, ${C.cyan}, ${C.gold})`, borderRadius: 6, textAlign: 'center', fontSize: 10, fontWeight: 700, color: C.bg0 }}>
                    Score BSD : 42 / 100
                  </div>
                </div>
              </div>
              {/* Pulse halos */}
              {[0,1,2].map(i => {
                const phase = (t * 0.6 + i * 0.7) % 2;
                if (phase > 1.4) return null;
                return <div key={i} style={{
                  position: 'absolute', inset: 0,
                  border: `1px solid ${C.cyan}`, borderRadius: 36,
                  transform: `scale(${1 + phase * 0.5})`,
                  opacity: (1 - phase / 1.4) * 0.4,
                }} />;
              })}
            </div>

            {/* Sensor pills around phone */}
            {sensors.map((s, i) => {
              const r = 320;
              const sx = cx + Math.cos(s.a) * r;
              const sy = cy + Math.sin(s.a) * r * 0.55;
              const sIn = clamp((t - 1.8 - i * 0.06) / 0.5, 0, 1);
              const wob = Math.sin(t * 1.2 + i * 0.5) * 4;
              return (
                <div key={i} style={{
                  position: 'absolute', left: sx, top: sy + wob,
                  transform: `translate(-50%, -50%) scale(${0.6 + sIn * 0.4})`,
                  opacity: sIn,
                  padding: '8px 12px',
                  background: 'rgba(8,15,40,0.85)',
                  border: `1px solid ${s.color}88`,
                  borderRadius: 10,
                  boxShadow: `0 0 14px ${s.color}55`,
                  backdropFilter: 'blur(8px)',
                  minWidth: 110, textAlign: 'center',
                  zIndex: 5,
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: s.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginTop: 2 }}>
                    <span style={{ fontFamily: 'Inter', fontSize: 16, fontWeight: 600, color: C.white }}>{s.value}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim }}>{s.unit}</span>
                  </div>
                </div>
              );
            })}

            {/* Right column — two delivery modes */}
            <div style={{
              position: 'absolute', right: 70, top: 380, width: 480,
              opacity: modesIn,
              display: 'flex', flexDirection: 'column', gap: 18,
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: C.gold, letterSpacing: '0.3em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 1, background: C.gold }} />
                Distanciel d'abord · présentiel à la demande
              </div>

              {/* Mode 1: At home */}
              <div style={{
                transform: `perspective(1400px) rotateY(${(1-modesIn)*-12}deg) translateY(${(1-modesIn)*20}px)`,
                padding: 24,
                background: 'linear-gradient(135deg, rgba(34,211,238,0.1), rgba(34,211,238,0.03))',
                border: `1px solid ${C.cyan}88`,
                borderRadius: 14,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <path d="M 4 16 L 16 6 L 28 16 L 28 28 L 4 28 Z" fill="none" stroke={C.cyan} strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 12 28 L 12 20 L 20 20 L 20 28" fill="none" stroke={C.cyan} strokeWidth="2" />
                  </svg>
                  <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>Tout à distance · le défaut</div>
                </div>
                <div style={{ fontSize: 13, color: C.whiteDim, lineHeight: 1.55, paddingLeft: 46 }}>
                  Généraliste en visio · capteurs synchronisés en temps réel · biologie à domicile (prélèvement chez vous) · résultats restitués en téléconsultation. Piloté à 100 % depuis l'app.
                </div>
                <div style={{ marginTop: 12, paddingLeft: 46, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['Visio HD','Capteurs perso','Prélèvement à domicile','Pilotage app'].map((tag, i) => (
                    <span key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.cyan, padding: '4px 10px', border: `1px solid ${C.line}`, borderRadius: 100, background: 'rgba(34,211,238,0.05)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Mode 2: At lab assisted */}
              <div style={{
                transform: `perspective(1400px) rotateY(${(1-modesIn)*-12}deg) translateY(${(1-modesIn)*30}px)`,
                padding: 24,
                background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(251,191,36,0.03))',
                border: `1px solid ${C.gold}88`,
                borderRadius: 14,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32">
                    <path d="M 12 4 L 12 12 L 6 26 Q 6 28 8 28 L 24 28 Q 26 28 26 26 L 20 12 L 20 4 Z" fill="none" stroke={C.gold} strokeWidth="2" strokeLinejoin="round" />
                    <line x1="12" y1="4" x2="20" y2="4" stroke={C.gold} strokeWidth="2.5" />
                    <circle cx="12" cy="22" r="1.5" fill={C.gold} />
                    <circle cx="18" cy="20" r="1.5" fill={C.gold} />
                  </svg>
                  <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>Présentiel à la demande</div>
                </div>
                <div style={{ fontSize: 13, color: C.whiteDim, lineHeight: 1.55, paddingLeft: 46 }}>
                  Uniquement si un examen paraclinique est nécessaire. Réseau de médecins référents et de partenaires privilégiés — zéro liste d'attente, résultats poussés instantanément dans l'app.
                </div>
                <div style={{ marginTop: 12, paddingLeft: 46, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {['Médecin référent','Partenaires privilégiés','Zéro liste d\'attente','Examen paraclinique'].map((tag, i) => (
                    <span key={i} style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.gold, padding: '4px 10px', border: `1px solid ${C.gold}55`, borderRadius: 100, background: 'rgba(251,191,36,0.05)' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom strap */}
            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 50,
              opacity: clamp((t - 5.4) / 0.6, 0, 1),
              padding: '14px 24px', borderRadius: 12,
              border: `1px solid ${C.line}`,
              background: 'rgba(34,211,238,0.04)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.whiteDim, letterSpacing: '0.15em',
            }}>
              <span>◉ Synchronisation automatique</span>
              <span style={{ color: C.cyan }}>Apple Watch · Withings · Dexcom · FreeStyle · Omron · Oura · Garmin</span>
              <span style={{ color: C.gold }}>● Vos données arrivent seules dans l'app</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene14Hub });
