// Scene 7 — Parcours utilisateur (4 steps in 3D perspective)
function Scene7Journey({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const steps = [
          { title: 'Questionnaire', sub: '15 min · santé, habitudes, environnement', icon: '✦' },
          { title: 'Téléconsultation', sub: 'Score · espérance de vie · plan d\'action', icon: '◉' },
          { title: 'Examens biologiques', sub: 'Bilan socle, intermédiaire ou complet', icon: '⬡' },
          { title: 'Restitution finale', sub: 'Score affiné · plan d\'action personnalisé', icon: '★' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="13" label="Parcours utilisateur · 4 étapes" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 69, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Comment ça se passe ?<br/>
              <span style={{ fontStyle: 'italic', color: C.cyan, fontSize: 42, fontWeight: 300 }}>Quatre étapes. Une chaîne de soin intégrée.</span>
            </div>

            {/* Connector line */}
            <svg width="1920" height="200" style={{ position: 'absolute', left: 0, top: 660 }}>
              <defs>
                <linearGradient id="journeyLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0" />
                  <stop offset="20%" stopColor={C.cyan} />
                  <stop offset="80%" stopColor={C.gold} />
                  <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="160" y1="100" x2="1760" y2="100" stroke="url(#journeyLine)" strokeWidth="2" strokeDasharray="4 6" opacity={titleIn} />
            </svg>

            {/* 4 step cards in perspective */}
            <div style={{ position: 'absolute', left: 96, top: 460, display: 'flex', gap: 32 }}>
              {steps.map((s, i) => {
                const stepIn = clamp((t - 1.0 - i * 0.4) / 0.7, 0, 1);
                const tilt = (i - 1.5) * 4;
                const wob = Math.sin(t * 1.5 + i) * 4;
                return (
                  <div key={i} style={{
                    width: 410, height: 380,
                    transform: `perspective(1500px) rotateY(${tilt}deg) translateY(${(1-stepIn)*40 + wob}px) scale(${0.85 + stepIn * 0.15})`,
                    opacity: stepIn,
                    transformStyle: 'preserve-3d',
                  }}>
                    <GlassCard x={0} y={0} w={410} h={380} border={i === 1 || i === 3 ? `${C.cyan}55` : `${C.gold}55`}>
                      <div style={{ padding: 32, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 17, letterSpacing: '0.3em', color: C.whiteDim }}>ÉTAPE</div>
                          <div style={{ fontFamily: 'Inter', fontSize: 86, fontWeight: 100, color: i === 1 || i === 3 ? C.cyan : C.gold, lineHeight: 0.8, letterSpacing: '-0.05em' }}>
                            0{i+1}
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100, color: i === 1 || i === 3 ? C.cyan : C.gold, opacity: 0.4, fontFamily: 'Inter' }}>
                          {s.icon}
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Inter', fontSize: 31, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>{s.title}</div>
                          <div style={{ fontSize: 17, color: C.whiteDim, marginTop: 8, lineHeight: 1.5 }}>{s.sub}</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, bottom: 60, right: 96,
              opacity: clamp((t - 4.4) / 0.6, 0, 1),
              fontFamily: 'Inter', fontSize: 28, fontWeight: 300,
              color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 18,
            }}>
              <span style={{ color: C.gold }}>2 téléconsultations + rapport + certificats</span> — inclus dans le programme BSD
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 8 — Outro: « Le silence n'est plus une fatalité »
function Scene8Outro({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const line1In = clamp((t - 0.4) / 1.0, 0, 1);
        const line2In = clamp((t - 1.6) / 1.0, 0, 1);
        const ctaIn = clamp((t - 3.0) / 0.8, 0, 1);
        const creditsIn = clamp((t - 4.0) / 0.8, 0, 1);
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <PulseLine y={540} color={C.cyan} amp={100} opacity={0.4} />

            <div style={{
              position: 'absolute', left: '50%', top: '32%',
              transform: `translate(-50%, -50%) translateY(${(1-line1In)*30}px)`,
              opacity: line1In,
              fontFamily: 'Inter', fontSize: 33, fontWeight: 300,
              color: C.cyan, letterSpacing: '0.4em', textTransform: 'uppercase',
              textAlign: 'center',
            }}>
              SilentCheck
            </div>

            <div style={{
              position: 'absolute', left: '50%', top: '46%',
              transform: `translate(-50%, -50%) translateY(${(1-line2In)*30}px)`,
              opacity: line2In,
              fontFamily: 'Inter', fontSize: 88, fontWeight: 200,
              color: C.white, letterSpacing: '-0.04em', lineHeight: 1.05,
              textAlign: 'center', maxWidth: 1500,
            }}>
              Le silence du corps<br/>
              <span style={{ fontStyle: 'italic', background: `linear-gradient(135deg, ${C.cyan}, ${C.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>n'est plus une fatalité.</span>
            </div>

            <div style={{
              position: 'absolute', left: '50%', top: '68%',
              transform: `translate(-50%, -50%)`,
              opacity: ctaIn,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                padding: '20px 48px',
                border: `1px solid ${C.cyan}`,
                borderRadius: 100,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 20,
                letterSpacing: '0.3em', color: C.white, textTransform: 'uppercase',
                background: 'rgba(34,211,238,0.05)',
                boxShadow: `0 0 40px rgba(34,211,238,0.3)`,
              }}>
                Votre compagnon de suivi validé
              </div>
              <div style={{ fontSize: 20, color: C.whiteDim, fontWeight: 300 }}>
                Le score n'est que le début — l'app vous suit, vos médecins vous pilotent.
              </div>
            </div>

            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 70,
              opacity: creditsIn,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              fontFamily: 'Inter',
            }}>
              <div style={{ fontSize: 14, color: 'rgba(35,41,58,0.5)', letterSpacing: '0.25em', fontFamily: 'JetBrains Mono, monospace' }}>
                © 2026 · Score BSD v5.0 · Validé par 53 références internationales
              </div>
            </div>

            {/* Corner brand */}
            <div style={{
              position: 'absolute', left: 96, top: 64,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 17,
              letterSpacing: '0.4em', color: C.whiteDim, textTransform: 'uppercase',
            }}>
              Score BSD v5.0
            </div>
            <div style={{
              position: 'absolute', right: 96, top: 64,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 17,
              letterSpacing: '0.3em', color: C.whiteDim,
            }}>
              Avril 2026
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene7Journey, Scene8Outro });
