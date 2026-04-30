// Scene 13 — Exposome & connected biomarkers
function Scene13Exposome({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const exposomeIn = clamp((t - 1.0) / 0.8, 0, 1);
        const connectedIn = clamp((t - 3.2) / 0.8, 0, 1);
        const synthesisIn = clamp((t - 5.0) / 0.8, 0, 1);

        // Exposome cards (left column)
        const exposome = [
          { label: 'Qualité de l\'air', metric: 'PM2.5 · NO₂ · O₃', detail: 'Pollution chronique → inflammation cardiovasculaire. Données géolocalisées intégrées au score.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <circle cx="40" cy="40" r="22" fill="none" stroke={C.cyan} strokeWidth="2" />
              <circle cx="40" cy="40" r="3" fill={C.cyan} />
              {[0,1,2,3,4,5].map(i => {
                const a = (i / 6) * Math.PI * 2;
                return <circle key={i} cx={40 + Math.cos(a) * 14} cy={40 + Math.sin(a) * 14} r="2" fill={C.cyan} opacity="0.7" />;
              })}
              <path d="M 18 60 Q 40 50 62 60" fill="none" stroke={C.cyan} strokeWidth="1.5" opacity="0.5" />
            </svg>
          )},
          { label: 'Bruit & nuisance sonore', metric: 'dB(A) résidentiel · trafic', detail: 'Stress chronique cardiovasculaire mesurable. Adresse + environnement professionnel.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <path d="M 25 32 L 25 48 L 35 48 L 48 58 L 48 22 L 35 32 Z" fill={C.cyan} opacity="0.4" stroke={C.cyan} strokeWidth="1.5" />
              {[0,1,2].map(i => (
                <path key={i} d={`M ${54 + i*5} ${30 + i*2} Q ${60 + i*5} 40 ${54 + i*5} ${50 - i*2}`} fill="none" stroke={C.cyan} strokeWidth="1.5" opacity={0.8 - i * 0.25} />
              ))}
            </svg>
          )},
          { label: 'Chaleur & vagues thermiques', metric: '°C ambiant · épisodes', detail: 'Stress thermique → hospitalisations CV. Exposome climatique intégré au calcul actuariel.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <rect x="34" y="14" width="12" height="36" rx="6" fill="none" stroke={C.cyan} strokeWidth="2" />
              <circle cx="40" cy="56" r="10" fill={C.cyan} />
              <line x1="40" y1="22" x2="40" y2="46" stroke={C.cyan} strokeWidth="3" />
              <line x1="50" y1="22" x2="58" y2="22" stroke={C.cyan} strokeWidth="1.5" />
              <line x1="50" y1="32" x2="56" y2="32" stroke={C.cyan} strokeWidth="1.5" />
              <line x1="50" y1="42" x2="58" y2="42" stroke={C.cyan} strokeWidth="1.5" />
            </svg>
          )},
          { label: 'Activité & sommeil', metric: 'pas/jour · h sommeil · stress', detail: 'Lifestyle quantifié — synchronisable avec montre connectée ou auto-déclaré.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <circle cx="40" cy="40" r="24" fill="none" stroke={C.cyan} strokeWidth="2" />
              <path d="M 40 24 L 40 40 L 52 46" fill="none" stroke={C.cyan} strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="40" cy="40" r="2" fill={C.cyan} />
            </svg>
          )},
        ];

        // Connected devices (right column)
        const devices = [
          { label: 'Tensiomètre connecté', metric: 'mmHg systolique / diastolique', detail: 'Lecture domestique transmise automatiquement — moyenne sur 7/14/28 jours intégrée au score.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <rect x="20" y="30" width="40" height="28" rx="4" fill="none" stroke={C.gold} strokeWidth="2" />
              <text x="40" y="48" textAnchor="middle" fill={C.gold} fontFamily="JetBrains Mono, monospace" fontSize="10">128/82</text>
              <path d="M 60 44 Q 70 44 70 34 Q 70 24 60 24" fill="none" stroke={C.gold} strokeWidth="2" />
              <circle cx="60" cy="34" r="2" fill={C.gold} />
            </svg>
          )},
          { label: 'Glucomètre / CGM', metric: 'glycémie temps réel', detail: 'Capteur continu (FreeStyle, Dexcom) — courbes journalières intégrées + variabilité glycémique.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <circle cx="40" cy="40" r="20" fill="none" stroke={C.gold} strokeWidth="2" />
              <circle cx="40" cy="40" r="6" fill={C.gold} opacity="0.5" />
              <path d="M 22 50 L 30 44 L 38 48 L 46 36 L 54 42 L 62 32" fill="none" stroke={C.gold} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            </svg>
          )},
          { label: 'Balance impédancemétrique', metric: 'IMC · masse grasse · viscérale', detail: 'Composition corporelle synchronisée. Évolution mesurée d\'une consultation à l\'autre.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <rect x="14" y="40" width="52" height="20" rx="3" fill="none" stroke={C.gold} strokeWidth="2" />
              <rect x="32" y="22" width="16" height="18" rx="2" fill="none" stroke={C.gold} strokeWidth="2" />
              <text x="40" y="56" textAnchor="middle" fill={C.gold} fontFamily="JetBrains Mono, monospace" fontSize="9">74,2</text>
            </svg>
          )},
          { label: 'Montre & sommeil', metric: 'FC repos · VFC · SpO₂ · sommeil', detail: 'Apple Watch, Garmin, Fitbit, Oura. Variabilité cardiaque = signature du système nerveux autonome.', icon: (
            <svg viewBox="0 0 80 80" width="56" height="56">
              <rect x="26" y="22" width="28" height="36" rx="6" fill="none" stroke={C.gold} strokeWidth="2" />
              <line x1="32" y1="18" x2="48" y2="18" stroke={C.gold} strokeWidth="2.5" />
              <line x1="32" y1="62" x2="48" y2="62" stroke={C.gold} strokeWidth="2.5" />
              <path d="M 32 40 L 36 40 L 38 34 L 42 46 L 44 38 L 48 40" fill="none" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )},
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="11" label="Exposome × Capteurs · au-delà du sang" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 170, right: 96,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Votre risque ne s'arrête pas au sang.<br/>
              <span style={{ fontStyle: 'italic', fontSize: 32, fontWeight: 300, color: C.cyan }}>
                Air, bruit, chaleur, capteurs — tout entre dans l'équation.
              </span>
            </div>

            {/* Two-column header bar */}
            <div style={{
              position: 'absolute', left: 96, top: 360, right: 96,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36,
              opacity: titleIn,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 32, height: 1, background: C.cyan }} />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.3em', color: C.cyan, textTransform: 'uppercase' }}>Exposome environnemental</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 32, height: 1, background: C.gold }} />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase' }}>Capteurs connectés</div>
              </div>
            </div>

            {/* Two columns of cards */}
            <div style={{
              position: 'absolute', left: 96, top: 410, right: 96, bottom: 140,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36,
            }}>
              {/* Left — exposome */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {exposome.map((e, i) => {
                  const itIn = clamp((t - 1.0 - i * 0.18) / 0.6, 0, 1);
                  return (
                    <div key={i} style={{
                      opacity: itIn,
                      transform: `perspective(1500px) rotateY(${(1-itIn)*-12}deg) translateX(${(1-itIn)*-30}px)`,
                      transformStyle: 'preserve-3d',
                      padding: '18px 22px',
                      display: 'flex', gap: 18, alignItems: 'center',
                      background: 'linear-gradient(135deg, rgba(34,211,238,0.06), rgba(34,211,238,0.02))',
                      border: `1px solid ${C.lineStrong}`,
                      borderRadius: 14,
                      backdropFilter: 'blur(10px)',
                    }}>
                      <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 12, background: 'rgba(34,211,238,0.08)', border: `1px solid ${C.lineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{e.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Inter', fontSize: 19, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>{e.label}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.cyan, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 3 }}>{e.metric}</div>
                        <div style={{ fontSize: 12, color: C.whiteDim, marginTop: 6, lineHeight: 1.5 }}>{e.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right — devices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, opacity: connectedIn }}>
                {devices.map((d, i) => {
                  const itIn = clamp((t - 3.2 - i * 0.18) / 0.6, 0, 1);
                  return (
                    <div key={i} style={{
                      opacity: itIn,
                      transform: `perspective(1500px) rotateY(${(1-itIn)*12}deg) translateX(${(1-itIn)*30}px)`,
                      transformStyle: 'preserve-3d',
                      padding: '18px 22px',
                      display: 'flex', gap: 18, alignItems: 'center',
                      background: 'linear-gradient(135deg, rgba(251,191,36,0.06), rgba(251,191,36,0.02))',
                      border: `1px solid ${C.gold}55`,
                      borderRadius: 14,
                      backdropFilter: 'blur(10px)',
                    }}>
                      <div style={{ flexShrink: 0, width: 64, height: 64, borderRadius: 12, background: 'rgba(251,191,36,0.08)', border: `1px solid ${C.gold}55`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Inter', fontSize: 19, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>{d.label}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.gold, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 3 }}>{d.metric}</div>
                        <div style={{ fontSize: 12, color: C.whiteDim, marginTop: 6, lineHeight: 1.5 }}>{d.detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Synthesis bar */}
            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 50,
              opacity: synthesisIn,
              transform: `translateY(${(1-synthesisIn)*20}px)`,
              padding: '20px 32px',
              borderRadius: 14,
              background: `linear-gradient(90deg, rgba(34,211,238,0.1), rgba(244,63,94,0.1), rgba(251,191,36,0.1))`,
              border: `1px solid ${C.gold}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: C.whiteDim, letterSpacing: '0.25em', textTransform: 'uppercase' }}>4 Dimensions intégrées</div>
              <div style={{ display: 'flex', gap: 36, fontSize: 17, fontWeight: 400 }}>
                <span style={{ color: C.cyan }}>● Clinique</span>
                <span style={{ color: C.cyan }}>● Exposome</span>
                <span style={{ color: C.gold }}>● Occupationnel</span>
                <span style={{ color: C.gold }}>● Lifestyle</span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: 17, fontWeight: 500, color: C.white }}>
                = un seul score <span style={{ color: C.gold }}>BSD</span>
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene13Exposome });
