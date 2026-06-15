// Scene 5 — 3 bilans selon le risque (3D parallax cards)
function Scene5Bilans({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const c1In = clamp((t - 1.0) / 0.6, 0, 1);
        const c2In = clamp((t - 1.4) / 0.6, 0, 1);
        const c3In = clamp((t - 1.8) / 0.6, 0, 1);

        const bilans = [
          { in: c1In, name: 'SOCLE', sub: 'Risque faible · score < 30', count: 5, color: C.cyan, items: ['HbA1c','Glycémie à jeun','LDL-Cholestérol','HDL-Cholestérol','hs-CRP'], extra: [], tilt: -10 },
          { in: c2In, name: 'INTERMÉDIAIRE', sub: 'Risque modéré · score 30–59', count: 10, color: C.gold, items: ['HbA1c','Glycémie','LDL','HDL','hs-CRP'], extra: ['+ Triglycérides','+ ApoB','+ Lp(a)','+ ACR urinaire','+ eGFR'], tilt: 0 },
          { in: c3In, name: 'COMPLET', sub: 'Risque élevé · score ≥ 60', count: 15, color: C.red, items: ['HbA1c','Glycémie','LDL','HDL','hs-CRP','+5'], extra: ['+ NT-proBNP','+ Troponine hs','+ ASAT/ALAT','+ GGT','+ Acide urique'], tilt: 10 },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="05" label="3 bilans · médecine de précision" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 180, right: 96,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter, sans-serif', fontSize: 60, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Une prescription adaptée à <span style={{ fontStyle: 'italic', color: C.gold }}>VOTRE</span> niveau de risque.
            </div>

            <div style={{ position: 'absolute', left: 96, top: 420, display: 'flex', gap: 36 }}>
              {bilans.map((b, i) => (
                <div key={i} style={{
                  width: 540, height: 520,
                  transform: `perspective(1600px) rotateY(${b.tilt}deg) translateY(${(1 - b.in) * 50}px) scale(${0.85 + b.in * 0.15})`,
                  opacity: b.in, transformStyle: 'preserve-3d',
                }}>
                  <GlassCard x={0} y={0} w={540} h={520} border={`${b.color}55`}>
                    <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.3em', color: b.color, textTransform: 'uppercase' }}>BILAN</div>
                      <div style={{ fontFamily: 'Inter', fontSize: 44, fontWeight: 400, color: C.white, marginTop: 6, letterSpacing: '-0.02em' }}>{b.name}</div>
                      <div style={{ fontSize: 14, color: C.whiteDim, marginTop: 4, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.05em' }}>{b.sub}</div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 32, marginBottom: 24 }}>
                        <div style={{ fontFamily: 'Inter', fontSize: 120, fontWeight: 100, color: b.color, lineHeight: 1, letterSpacing: '-0.05em' }}>{b.count}</div>
                        <div style={{ fontSize: 16, color: C.whiteDim, fontWeight: 300 }}>analyses<br/>biologiques</div>
                      </div>

                      <div style={{ borderTop: `1px solid ${b.color}33`, paddingTop: 18, fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: C.whiteDim, lineHeight: 1.8 }}>
                        {b.items.map((it, j) => <div key={j}>{it}</div>)}
                        {b.extra.map((it, j) => <div key={j} style={{ color: b.color }}>{it}</div>)}
                      </div>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 6 — Synergie inflammatoire (3 orbiting nodes connected to center)
function Scene6Synergy({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const nodesIn = clamp((t - 1.2) / 1.0, 0, 1);
        const linesIn = clamp((t - 2.2) / 0.8, 0, 1);
        const centerIn = clamp((t - 3.0) / 0.6, 0, 1);
        const calloutIn = clamp((t - 3.8) / 0.6, 0, 1);

        const cx = 700, cy = 720;
        const nodes = [
          { name: 'hs-CRP', sub: 'Inflammation', a: -Math.PI/2, color: '#ff8fa3' },
          { name: 'ACR urinaire', sub: 'Atteinte rénale', a: Math.PI/2 - Math.PI/3 + Math.PI*2/3, color: C.cyan },
          { name: 'NT-proBNP', sub: 'Souffrance cardiaque', a: -Math.PI/2 + Math.PI*4/3, color: C.gold },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="red" />
            <SectionTag index="06" label="Innovation propriétaire" color={C.red} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 64, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              La <span style={{ fontStyle: 'italic', color: C.red }}>synergie inflammatoire.</span><br/>
              <span style={{ fontSize: 32, color: C.whiteDim, fontWeight: 300 }}>Notre signature scientifique.</span>
            </div>

            {/* Connections */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <defs>
                <linearGradient id="synergyLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={C.red} stopOpacity="0.7" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="0.3" />
                </linearGradient>
                <filter id="lineglow"><feGaussianBlur stdDeviation="3" /></filter>
              </defs>
              {nodes.map((n, i) => {
                const r = 240;
                const x = cx + Math.cos(n.a) * r;
                const y = cy + Math.sin(n.a) * r;
                return (
                  <g key={i} opacity={linesIn}>
                    <line x1={cx} y1={cy} x2={x} y2={y} stroke={n.color} strokeWidth="2" opacity="0.6" filter="url(#lineglow)" strokeDasharray="6 4">
                      <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                    </line>
                  </g>
                );
              })}
              {/* triangle between nodes */}
              <polygon
                points={nodes.map(n => `${cx + Math.cos(n.a)*240},${cy + Math.sin(n.a)*240}`).join(' ')}
                fill="rgba(244,63,94,0.06)" stroke={C.red} strokeWidth="1.5" opacity={linesIn * 0.7} strokeDasharray="3 6" />
            </svg>

            {/* 3 nodes */}
            {nodes.map((n, i) => {
              const r = 240;
              const x = cx + Math.cos(n.a) * r;
              const y = cy + Math.sin(n.a) * r;
              const wob = Math.sin(t * 1.5 + i) * 4;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y + wob,
                  transform: `translate(-50%, -50%) scale(${0.6 + nodesIn * 0.4})`,
                  opacity: nodesIn,
                }}>
                  <div style={{
                    width: 180, height: 180,
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 30%, ${n.color}cc, ${n.color}33)`,
                    border: `2px solid ${n.color}`,
                    boxShadow: `0 0 40px ${n.color}aa, inset 0 0 30px ${n.color}44`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 600, color: C.white }}>{n.name}</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(35,41,58,0.85)', marginTop: 4, letterSpacing: '0.1em' }}>{n.sub}</div>
                  </div>
                </div>
              );
            })}

            {/* Center "TRIO" */}
            <div style={{
              position: 'absolute', left: cx, top: cy,
              transform: `translate(-50%, -50%) scale(${0.5 + centerIn * 0.5})`,
              opacity: centerIn,
            }}>
              <div style={{
                width: 220, height: 220,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${C.red}, ${C.redDim})`,
                border: `3px solid ${C.gold}`,
                boxShadow: `0 0 80px ${C.red}, 0 0 30px ${C.gold}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontFamily: 'Inter', fontSize: 44, fontWeight: 200, color: C.white, letterSpacing: '0.1em' }}>TRIO</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.gold, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Amplificateur</div>
              </div>
              {/* Pulse rings */}
              {[0,1,2].map(i => {
                const phase = (t * 0.8 + i * 0.5) % 2;
                if (phase > 1.4) return null;
                return <div key={i} style={{
                  position: 'absolute', inset: 0,
                  border: `2px solid ${C.red}`, borderRadius: '50%',
                  transform: `scale(${1 + phase * 0.6})`,
                  opacity: (1 - phase / 1.4) * 0.6,
                }} />;
              })}
            </div>

            {/* Right callout */}
            <div style={{
              position: 'absolute', right: 96, top: 480, width: 540,
              opacity: calloutIn, transform: `translateX(${(1-calloutIn)*40}px)`,
            }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                letterSpacing: '0.3em', color: C.gold, textTransform: 'uppercase',
              }}>Innovation propriétaire</div>
              <div style={{
                fontFamily: 'Inter', fontSize: 40, fontWeight: 300,
                color: C.white, marginTop: 16, lineHeight: 1.15, letterSpacing: '-0.02em',
              }}>
                Aucun autre score au monde n'intègre cette <span style={{ fontStyle: 'italic', color: C.red }}>synergie biologie × exposome.</span>
              </div>
              <div style={{ marginTop: 28, padding: 24, background: 'rgba(34,211,238,0.05)', border: `1px solid ${C.line}`, borderRadius: 12 }}>
                <div style={{ fontSize: 16, color: C.whiteDim, lineHeight: 1.5 }}>
                  Quand les trois biomarqueurs sont élevés, l'inflammation <span style={{ color: C.cyan }}>amplifie</span> l'impact de la pollution, du stress et de la chaleur sur votre cœur.
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { Scene5Bilans, Scene6Synergy });
