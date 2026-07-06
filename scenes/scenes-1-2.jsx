// Scene 1 — Intro: Austral Lab logo emerges from cardiac pulse
function Scene1Intro({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, progress }) => {
        const t0 = clamp(localTime, 0, 6);
        const titleAppear = clamp((t0 - 1.8) / 1.0, 0, 1);
        const subAppear = clamp((t0 - 2.8) / 0.8, 0, 1);
        const taglineAppear = clamp((t0 - 4.0) / 0.8, 0, 1);
        const pulseOpacity = clamp((t0 - 0.2) / 0.8, 0, 1) * (1 - clamp((t0 - 5.2) / 0.8, 0, 1));
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <PulseLine y={540} color={C.cyan} amp={140} opacity={pulseOpacity * 0.9} />
            <PulseLine y={540} color={C.red} amp={120} opacity={pulseOpacity * 0.4} />

            {/* Center logo mark — Austral Lab */}
            <div style={{
              position: 'absolute', left: '50%', top: '32%',
              transform: `translate(-50%, -50%) scale(${0.7 + titleAppear * 0.3})`,
              opacity: titleAppear,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <svg width="150" height="150" viewBox="0 0 140 140" style={{ marginBottom: 6 }}>
                <defs>
                  <linearGradient id="brandGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor={C.red} />
                    <stop offset="100%" stopColor={C.gold} />
                  </linearGradient>
                </defs>
                <circle cx="70" cy="70" r="64" fill="none" stroke="url(#brandGrad)" strokeWidth="2.5" />
                {Array.from({ length: 48 }).map((_, k) => {
                  const a = (k / 48) * Math.PI * 2;
                  const r1 = 56, r2 = k % 4 === 0 ? 47 : 51;
                  return <line key={k} x1={70 + Math.cos(a) * r1} y1={70 + Math.sin(a) * r1} x2={70 + Math.cos(a) * r2} y2={70 + Math.sin(a) * r2} stroke="url(#brandGrad)" strokeWidth={k % 4 === 0 ? 2.5 : 1.4} strokeLinecap="round" />;
                })}
                <path d="M70,20 L83,57 L120,70 L83,83 L70,120 L57,83 L20,70 L57,57 Z" fill="url(#brandGrad)" />
                <circle cx="70" cy="70" r="7" fill="#fff" stroke="url(#brandGrad)" strokeWidth="3" />
              </svg>
              <div style={{
                fontFamily: 'Poppins, Inter, sans-serif',
                fontSize: 96, fontWeight: 700,
                letterSpacing: '-0.02em',
                color: C.blue,
                lineHeight: 0.95,
              }}>Austral</div>
              <div style={{
                fontFamily: 'Poppins, Inter, sans-serif',
                fontSize: 60, fontWeight: 500, fontStyle: 'italic',
                letterSpacing: '0.01em',
                color: C.blue,
                lineHeight: 1, marginTop: -2,
              }}>Lab</div>
            </div>

            {/* Subtitle */}
            <div style={{
              position: 'absolute', left: '50%', top: '57%',
              transform: `translate(-50%, ${(1 - subAppear) * 16}px)`,
              opacity: subAppear,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 22, letterSpacing: '0.22em',
              color: C.cyan,
              textTransform: 'uppercase',
            }}>
              Une clinique virtuelle dans votre téléphone
            </div>

            {/* Tagline */}
            <div style={{
              position: 'absolute', left: '50%', top: '66%',
              transform: `translate(-50%, ${(1 - taglineAppear) * 16}px)`,
              opacity: taglineAppear,
              fontFamily: 'Inter, sans-serif',
              fontSize: 33, fontWeight: 300,
              color: C.whiteDim,
              fontStyle: 'italic',
              textAlign: 'center',
            }}>
              « Le silence du corps n'est plus une fatalité. »
            </div>

            {/* Positioning strap — a science-validated virtual clinic, not a coach app */}
            <div style={{
              position: 'absolute', left: '50%', top: '76%',
              transform: `translate(-50%, ${(1 - taglineAppear) * 16}px)`,
              opacity: taglineAppear,
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 26px',
              border: `1px solid ${C.cyan}66`,
              borderRadius: 100,
              background: 'rgba(34,211,238,0.05)',
              backdropFilter: 'blur(8px)',
              boxShadow: `0 0 30px rgba(34,211,238,0.18)`,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 17,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: C.whiteDim, whiteSpace: 'nowrap',
            }}>
              <span style={{ color: C.cyan, fontWeight: 600 }}>Validée par la science</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Pas une appli de coaching</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span>Pilotée par des médecins</span>
            </div>

            {/* Bottom credits */}
            <div style={{
              position: 'absolute', left: '50%', bottom: 80,
              transform: 'translateX(-50%)',
              opacity: taglineAppear * 0.9,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{ fontSize: 18, color: C.whiteDim, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                Powered by <span style={{ color: C.gold, fontWeight: 600 }}>Score BSD v5.0</span> · 53 références · 4M+ patients
              </div>
            </div>

            {/* Top corner brand */}
            <div style={{
              position: 'absolute', left: 96, top: 64,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 17, letterSpacing: '0.4em',
              color: C.whiteDim, textTransform: 'uppercase',
            }}>
              Austral Lab · 2026
            </div>
            <div style={{
              position: 'absolute', right: 96, top: 64,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 17, letterSpacing: '0.3em',
              color: C.whiteDim,
            }}>
              Score BSD v5.0
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 2 — Stats: le silence tue
function Scene2Crisis({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const headlineIn = clamp((t - 0.2) / 0.8, 0, 1);
        const stat1In = clamp((t - 1.2) / 0.6, 0, 1);
        const stat2In = clamp((t - 1.8) / 0.6, 0, 1);
        const stat3In = clamp((t - 2.4) / 0.6, 0, 1);
        const ctaIn = clamp((t - 4.4) / 0.6, 0, 1);
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="red" />

            <SectionTag index="01" label="Pourquoi Austral Lab" color={C.red} />

            <div style={{
              position: 'absolute', left: 96, top: 180, right: 96,
              transform: `translateY(${(1 - headlineIn) * 30}px)`,
              opacity: headlineIn,
              fontFamily: 'Inter, sans-serif',
              fontSize: 78, fontWeight: 200,
              letterSpacing: '-0.03em', lineHeight: 1.05,
              color: C.white,
            }}>
              Le <span style={{ fontStyle: 'italic', fontWeight: 300, color: C.red }}>silence du corps</span><br/>
              tue plus que tout le reste.
            </div>

            {/* 3 stats with 3D cards */}
            <div style={{ position: 'absolute', left: 96, top: 480, display: 'flex', gap: 32 }}>
              {[
                { in: stat1In, big: 20, suf: '%', label: 'd\'adultes diabétiques', sub: '1 sur 5 · 28% l\'ignorent encore', tilt: -8 },
                { in: stat2In, big: 35, suf: '%', label: 'souffrent d\'hypertension', sub: 'silencieuse · souvent ignorée', tilt: 0 },
                { in: stat3In, big: 85, suf: '%', label: 'des complications évitables', sub: 'avec une détection précoce · OMS', tilt: 8 },
              ].map((s, i) => (
                <div key={i} style={{
                  width: 540, height: 320,
                  transform: `perspective(1500px) rotateY(${s.tilt}deg) translateY(${(1 - s.in) * 60}px) scale(${0.9 + s.in * 0.1})`,
                  opacity: s.in,
                  transformStyle: 'preserve-3d',
                }}>
                  <GlassCard x={0} y={0} w={540} h={320} border={`rgba(244,63,94,0.3)`}>
                    <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 140, fontWeight: 200,
                        background: `linear-gradient(135deg, ${C.red}, #ff8fa3)`,
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.05em', lineHeight: 0.9,
                      }}>
                        {s.in > 0.4 ? Math.round((s.in - 0.4) / 0.6 * s.big) : 0}{s.suf}
                      </div>
                      <div>
                        <div style={{ fontSize: 28, fontWeight: 500, color: C.white, marginBottom: 6 }}>{s.label}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 17, color: C.whiteDim, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.sub}</div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute', left: 96, bottom: 80, right: 96,
              opacity: ctaIn,
              transform: `translateY(${(1 - ctaIn) * 20}px)`,
              fontFamily: 'Inter, sans-serif',
              fontSize: 33, fontWeight: 300, color: C.whiteDim,
              borderTop: `1px solid ${C.line}`, paddingTop: 24,
            }}>
              La médecine classique intervient <span style={{ color: C.red, fontWeight: 500 }}>APRÈS</span> la maladie.
              <span style={{ color: C.cyan, fontWeight: 500 }}>  Austral Lab agit AVANT.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene1Intro, Scene2Crisis });
