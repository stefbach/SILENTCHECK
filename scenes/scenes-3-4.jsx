// Scene 3 — 3D Heart with orbiting biomarkers
function Scene3Heart({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.3) / 0.8, 0, 1);
        const heartIn = clamp((t - 0.6) / 1.0, 0, 1);
        const orbitIn = clamp((t - 1.6) / 1.0, 0, 1);
        const calloutIn = clamp((t - 3.0) / 0.8, 0, 1);

        const markers = [
          'HbA1c','Glycémie','LDL','HDL','hs-CRP','Triglycérides',
          'ApoB','Lp(a)','ACR','eGFR','Acide urique','NT-proBNP',
          'Troponine','ASAT/ALAT','GGT'
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="04" label="15 biomarqueurs · tableau de bord intérieur" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 180, right: 96,
              opacity: titleIn,
              transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter, sans-serif', fontSize: 64, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Votre voiture a un tableau de bord.<br/>
              <span style={{ fontStyle: 'italic', color: C.cyan }}>Votre corps aussi.</span>
            </div>

            {/* 3D Heart center */}
            <div style={{ opacity: heartIn, transform: `scale(${0.5 + heartIn * 0.5})`, transformOrigin: '960px 700px' }}>
              <Heart3D x={960} y={700} size={300} />
            </div>

            {/* Orbiting biomarker pills */}
            {markers.map((m, i) => {
              const angle = (i / markers.length) * Math.PI * 2 + t * 0.25;
              const radiusX = 540;
              const radiusY = 220;
              const cx = 960 + Math.cos(angle) * radiusX;
              const cy = 700 + Math.sin(angle) * radiusY;
              const z = Math.sin(angle); // -1 (back) to 1 (front)
              const scale = 0.7 + (z + 1) * 0.25;
              const opa = (0.45 + (z + 1) * 0.27) * orbitIn;
              return (
                <div key={i} style={{
                  position: 'absolute',
                  left: cx, top: cy,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity: opa,
                  padding: '8px 16px',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 14, fontWeight: 500,
                  color: C.cyan,
                  background: 'rgba(8,145,178,0.12)',
                  border: `1px solid ${C.lineStrong}`,
                  borderRadius: 100,
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  boxShadow: z > 0 ? `0 0 20px rgba(34,211,238,0.4)` : 'none',
                  zIndex: Math.round(z * 100),
                }}>
                  {String(i+1).padStart(2,'0')} · {m}
                </div>
              );
            })}

            {/* Big stat callout */}
            <div style={{
              position: 'absolute', right: 96, top: 480,
              opacity: calloutIn,
              transform: `translateY(${(1-calloutIn)*30}px)`,
              textAlign: 'right',
            }}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: 220, fontWeight: 100,
                background: `linear-gradient(135deg, ${C.cyan}, ${C.gold})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                lineHeight: 0.9, letterSpacing: '-0.06em',
              }}>80%</div>
              <div style={{ fontSize: 22, color: C.whiteDim, fontWeight: 300, maxWidth: 480, marginLeft: 'auto' }}>
                des maladies cardiaques se développent <span style={{ color: C.white, fontStyle: 'italic' }}>sans symptôme</span> pendant 10 à 20 ans.
              </div>
              <div style={{
                marginTop: 18,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                letterSpacing: '0.25em', color: C.gold, textTransform: 'uppercase',
              }}>
                ↳ Détection 5 à 10 ans à l'avance
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 4 — Score BSD with animated radial gauge
function Scene4Score({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const gaugeIn = clamp((t - 1.0) / 1.4, 0, 1);
        const scoreCount = clamp((t - 1.4) / 2.0, 0, 1);
        const sideIn = clamp((t - 2.6) / 0.8, 0, 1);

        const score = Math.round(scoreCount * 78);
        const arcLen = 2 * Math.PI * 220;
        const dash = (score / 100) * arcLen * 0.75; // 270° arc

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="03" label="La science du Score BSD" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn,
              fontFamily: 'Inter, sans-serif', fontSize: 64, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Une science fondée sur<br/>
              <span style={{ fontWeight: 600, background: `linear-gradient(135deg, ${C.cyan}, ${C.gold})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4 millions de patients.</span>
            </div>

            {/* Radial gauge */}
            <div style={{
              position: 'absolute', left: 200, top: 480,
              opacity: gaugeIn,
              transform: `scale(${0.6 + gaugeIn * 0.4}) perspective(1000px) rotateY(${(1-gaugeIn)*-30}deg)`,
              transformOrigin: 'center',
            }}>
              <svg width="540" height="540" viewBox="0 0 540 540">
                <defs>
                  <linearGradient id="gaugegrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={C.cyan} />
                    <stop offset="50%" stopColor={C.blue} />
                    <stop offset="100%" stopColor={C.gold} />
                  </linearGradient>
                  <filter id="gaugeglow">
                    <feGaussianBlur stdDeviation="6" />
                  </filter>
                </defs>
                {/* outer ring */}
                <circle cx="270" cy="270" r="240" fill="none" stroke={C.line} strokeWidth="1" />
                {/* tick marks */}
                {Array.from({length: 60}).map((_, i) => {
                  const a = (i / 60) * Math.PI * 1.5 + Math.PI * 0.75;
                  const r1 = 230, r2 = i % 5 === 0 ? 215 : 222;
                  const x1 = 270 + Math.cos(a) * r1;
                  const y1 = 270 + Math.sin(a) * r1;
                  const x2 = 270 + Math.cos(a) * r2;
                  const y2 = 270 + Math.sin(a) * r2;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i < 60 * (score/100) ? C.cyan : C.line} strokeWidth={i % 5 === 0 ? 2 : 1} />;
                })}
                {/* main arc bg */}
                <circle cx="270" cy="270" r="200" fill="none" stroke="rgba(34,211,238,0.1)" strokeWidth="14"
                        strokeDasharray={`${arcLen * 0.75} ${arcLen}`} transform="rotate(135 270 270)" strokeLinecap="round" />
                {/* main arc fg */}
                <circle cx="270" cy="270" r="200" fill="none" stroke="url(#gaugegrad)" strokeWidth="14"
                        strokeDasharray={`${dash} ${arcLen}`} transform="rotate(135 270 270)" strokeLinecap="round"
                        filter="url(#gaugeglow)" />
                <circle cx="270" cy="270" r="200" fill="none" stroke="url(#gaugegrad)" strokeWidth="14"
                        strokeDasharray={`${dash} ${arcLen}`} transform="rotate(135 270 270)" strokeLinecap="round" />
                {/* center text */}
                <text x="270" y="240" textAnchor="middle" fill={C.whiteDim} fontFamily="JetBrains Mono, monospace" fontSize="14" letterSpacing="6">SCORE BSD</text>
                <text x="270" y="320" textAnchor="middle" fill={C.white} fontFamily="Inter" fontSize="140" fontWeight="200" letterSpacing="-0.04em">{score}</text>
                <text x="270" y="360" textAnchor="middle" fill={C.cyan} fontFamily="JetBrains Mono, monospace" fontSize="14" letterSpacing="3">/ 100</text>
              </svg>
            </div>

            {/* Side metrics */}
            <div style={{ position: 'absolute', right: 96, top: 460, width: 600, opacity: sideIn, transform: `translateX(${(1-sideIn)*40}px)` }}>
              {[
                { num: '> 4M', label: 'participants suivis', sub: '52 pays · NHANES, JUPITER, MESA, ARIC' },
                { num: '53', label: 'références scientifiques', sub: 'NEJM · Lancet · JACC · Circulation · EHJ' },
                { num: '11 × 7', label: 'profils ethniques × multiplicateurs', sub: 'adaptation populationnelle internationale' },
                { num: '69 612', label: 'individus dans la cohorte de validation', sub: 'NHANES 1999–2018 · 20 ans de suivi' },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'baseline', gap: 24,
                  padding: '20px 0',
                  borderBottom: i < 3 ? `1px solid ${C.line}` : 'none',
                }}>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: 44, fontWeight: 300,
                    color: C.gold, letterSpacing: '-0.02em',
                    minWidth: 160,
                  }}>{row.num}</div>
                  <div>
                    <div style={{ fontSize: 18, color: C.white, fontWeight: 500 }}>{row.label}</div>
                    <div style={{ fontSize: 13, color: C.whiteDim, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em', marginTop: 4 }}>{row.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene3Heart, Scene4Score });
