// Pitch slides (business) — team, financial trajectory, competitors.
// Styled in the Austral Lab brand (cream / navy / pink / orange).
//   SceneTeam        — l'équipe (direction business + comité scientifique)
//   SceneFinance     — trajectoire financière (revenu Y1→Y5 + valorisation)
//   SceneCompetition — concurrents & positionnement

// ── Scene — L'équipe ────────────────────────────────────────────────────────
function SceneTeam({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const dir = [
          { initials: 'AB', name: 'Anna Blanc', role: 'Leadership · Stratégie & Wellbeing', desc: 'Engagement employeur et résultats de santé.', color: C.gold },
          { initials: 'LC', name: 'Laurent Courbon', role: 'Innovation · Coaching santé', desc: 'Changement comportemental, succès client durable.', color: C.cyan },
          { initials: 'NR', name: 'Nicolas de Raulin', role: 'Compliance · Juridique & Dév.', desc: 'Conformité et partenariats de croissance.', color: C.red },
        ];
        const sci = [
          { initials: 'SB', name: 'Dr Stéphane Bach', role: 'Médecin spécialiste de santé publique', desc: 'Concepteur de l\'algorithme — moteur de prédiction cardiovasculaire.', color: C.cyan },
          { initials: 'JS', name: 'Pr José Sampol', role: 'Co-concepteur · validation clinique', desc: 'Stratification thrombo-vasculaire du modèle.', color: C.gold },
          { initials: 'FD', name: 'Pr F. Dignat-George', role: 'Conception scientifique · Aix-Marseille', desc: 'Présidente SFTH · conseil INSERM.', color: C.red },
        ];
        const Card = (m, i, delay) => {
          const cIn = clamp((t - delay - i * 0.15) / 0.6, 0, 1);
          return (
            <div key={m.initials} style={{
              width: 620, opacity: cIn, transform: `translateY(${(1 - cIn) * 24}px)`,
              display: 'flex', gap: 18, alignItems: 'center', padding: '16px 22px', borderRadius: 14,
              background: 'rgba(255,255,255,0.55)', border: `1px solid ${m.color}44`,
            }}>
              <div style={{
                width: 66, height: 66, flexShrink: 0, borderRadius: '50%',
                background: `linear-gradient(135deg, ${m.color}, ${m.color}aa)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Poppins, Inter, sans-serif', fontWeight: 700, fontSize: 24, color: '#fff',
              }}>{m.initials}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'Inter', fontSize: 23, fontWeight: 600, color: C.white }}>{m.name}</div>
                <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.12em', color: m.color, textTransform: 'uppercase', marginTop: 4 }}>{m.role}</div>
                <div style={{ fontSize: 14, color: C.whiteDim, marginTop: 5, lineHeight: 1.4 }}>{m.desc}</div>
              </div>
            </div>
          );
        };
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="" label="L'équipe · un comité de direction intégré" color={C.cyan} />
            <div style={{
              position: 'absolute', left: 96, top: 150, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 52, fontWeight: 200, color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Les concepteurs de l'algorithme et de la plateforme <span style={{ fontStyle: 'italic', color: C.gold }}>siègent au comité de direction.</span>
            </div>

            <div style={{ position: 'absolute', left: 96, top: 300 }}>
              <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.24em', color: C.gold, textTransform: 'uppercase', marginBottom: 6 }}>— Direction & business</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: C.whiteDim, marginBottom: 14 }}>Exécution commerciale & croissance</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{dir.map((m, i) => Card(m, i, 1.0))}</div>
            </div>
            <div style={{ position: 'absolute', right: 96, top: 300 }}>
              <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 13, letterSpacing: '0.24em', color: C.cyan, textTransform: 'uppercase', marginBottom: 6 }}>— Concepteurs · membres du comité de direction</div>
              <div style={{ fontFamily: 'Inter', fontSize: 13, color: C.whiteDim, marginBottom: 14 }}>Ils ont conçu l'algorithme <span style={{ color: C.cyan }}>et</span> la plateforme</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{sci.map((m, i) => Card(m, i, 1.4))}</div>
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 50, opacity: clamp((t - 3.4) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 20, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 18,
            }}>
              L'algorithme et la plateforme sont pensés par ceux qui dirigent — <span style={{ color: C.cyan, fontWeight: 500 }}>science et produit intégrés à la direction, là où les autres plateformes sous-traitent.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — Trajectoire financière ──────────────────────────────────────────
function SceneFinance({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const data = [
          { y: 'Y1', v: 2.96, label: '2,96 M€', sub: '8 000 validations · 4 000 abonnements' },
          { y: 'Y2', v: 14.8, label: '14,8 M€', sub: '35 000 utilisateurs' },
          { y: 'Y3', v: 51.8, label: '51,8 M€', sub: 'engagement client fort' },
          { y: 'Y4', v: 141, label: '141 M€', sub: '280 000 clients' },
          { y: 'Y5', v: 332, label: '332 M€', sub: 'valorisation 0,8–1,2 Md€' },
        ];
        const maxV = 332, maxH = 400;
        const colBy = (i) => [C.cyan, C.cyan, C.gold, C.gold, C.red][i];
        const callouts = [
          { k: '×112', v: 'revenu en 4 ans (Y1→Y5)' },
          { k: '≈ +225 %', v: 'TCAM annuel moyen' },
          { k: '280 000', v: 'clients visés en Y4' },
          { k: '0,8–1,2 Md€', v: 'valorisation cible' },
        ];
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="" label="Chiffres · trajectoire financière" color={C.gold} />
            <div style={{
              position: 'absolute', left: 96, top: 150, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200, color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              De 3 M€ à <span style={{ fontStyle: 'italic', color: C.gold }}>332 M€ de revenus</span> en 5 ans.
            </div>

            {/* Bar chart */}
            <div style={{ position: 'absolute', left: 110, top: 340, width: 1080, height: 470 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 66, height: 1, background: C.line }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {data.map((d, i) => {
                  const bIn = clamp((t - 1.0 - i * 0.22) / 0.7, 0, 1);
                  const h = Math.pow(d.v / maxV, 0.6) * maxH * bIn;
                  return (
                    <div key={i} style={{ width: 190, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ height: maxH + 40, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'Inter', fontSize: 26, fontWeight: 600, color: C.white, marginBottom: 8, opacity: bIn }}>{d.label}</div>
                        <div style={{ width: 118, height: Math.max(6, h), borderRadius: '10px 10px 0 0', background: `linear-gradient(180deg, ${colBy(i)}, ${colBy(i)}bb)`, boxShadow: `0 6px 18px ${colBy(i)}33` }} />
                      </div>
                      <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 18, fontWeight: 600, letterSpacing: '0.1em', color: colBy(i), marginTop: 14 }}>{d.y}</div>
                      <div style={{ fontSize: 12.5, color: C.whiteDim, marginTop: 6, textAlign: 'center', maxWidth: 180, lineHeight: 1.35 }}>{d.sub}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Callouts (right) */}
            <div style={{ position: 'absolute', right: 90, top: 316, width: 470, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, opacity: clamp((t - 2.4) / 0.8, 0, 1) }}>
              {callouts.map((c, i) => (
                <div key={i} style={{ padding: '18px 20px', borderRadius: 14, background: 'rgba(255,255,255,0.55)', border: `1px solid ${C.line}` }}>
                  <div style={{ fontFamily: 'Inter', fontSize: 32, fontWeight: 300, color: C.gold, letterSpacing: '-0.02em' }}>{c.k}</div>
                  <div style={{ fontSize: 13, color: C.whiteDim, marginTop: 6, lineHeight: 1.4 }}>{c.v}</div>
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 46, opacity: clamp((t - 3.6) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 19, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.gold}33`, paddingTop: 16,
            }}>
              France & Benelux <span style={{ color: C.cyan, fontWeight: 500 }}>Q4 2026</span> · Pan-Europe <span style={{ color: C.cyan, fontWeight: 500 }}>2028</span> · 750 000 cadres · <span style={{ color: C.gold, fontWeight: 500 }}>IPO visée 2031</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — Concurrents & positionnement ────────────────────────────────────
function SceneCompetition({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const comp = [
          { n: 'Whoop', f: '400 M$', v: '3,6 Md$' },
          { n: 'Function Health', f: '350 M$', v: '2,5 Md$' },
          { n: 'Oura', f: '150 M$', v: '2,5 Md$' },
          { n: 'Thorne', f: '200 M$', v: '800 M$' },
          { n: 'InsideTracker', f: '80 M$', v: '600 M$' },
          { n: 'Lucis', f: '32 M$', v: '100 M$' },
          { n: 'Apple (Health)', f: '400 M$', v: '—' },
        ];
        const diff = [
          { t: 'La SEULE vue holistique cardiovasculaire', s: 'là où les autres ne couvrent qu\'un morceau (wearable, bio, ou app).' },
          { t: 'Score AUC 0,93', s: 'dépistage cardiovasculaire précoce, précis et validé.' },
          { t: 'Coût −80 % vs concurrents', s: 'à qualité de service supérieure.' },
          { t: 'Monitoring continu + pilotage médical', s: 'capteurs connectés orchestrés par des médecins.' },
        ];
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="red" />
            <SectionTag index="" label="Concurrents · positionnement" color={C.red} />
            <div style={{
              position: 'absolute', left: 96, top: 150, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 54, fontWeight: 200, color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Des acteurs bien financés — <span style={{ fontStyle: 'italic', color: C.red }}>sur des morceaux du problème.</span>
            </div>

            {/* LEFT — competitors */}
            <div style={{ position: 'absolute', left: 96, top: 310, width: 800 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 26, height: 1, background: C.whiteDim }} />
                <span style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', color: C.whiteDim, textTransform: 'uppercase' }}>Acteurs clés · levée · valorisation</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {comp.map((c, i) => {
                  const rIn = clamp((t - 1.0 - i * 0.12) / 0.5, 0, 1);
                  return (
                    <div key={i} style={{
                      opacity: rIn, transform: `translateX(${(1 - rIn) * 24}px)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 20px', borderRadius: 11, background: 'rgba(255,255,255,0.45)', border: `1px solid ${C.line}`,
                    }}>
                      <div style={{ fontFamily: 'Inter', fontSize: 20, fontWeight: 500, color: C.white }}>{c.n}</div>
                      <div style={{ display: 'flex', gap: 26, fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 15 }}>
                        <span style={{ color: C.whiteDim }}>levée <span style={{ color: C.white }}>{c.f}</span></span>
                        <span style={{ color: C.whiteDim, minWidth: 130, textAlign: 'right' }}>valo <span style={{ color: C.gold }}>{c.v}</span></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — Austral Lab differentiators */}
            <div style={{ position: 'absolute', right: 96, top: 310, width: 800, opacity: clamp((t - 1.8) / 0.8, 0, 1) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 26, height: 1, background: C.gold }} />
                <span style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>Austral Lab · notre différence</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {diff.map((d, i) => {
                  const dIn = clamp((t - 2.0 - i * 0.18) / 0.6, 0, 1);
                  return (
                    <div key={i} style={{
                      opacity: dIn, transform: `translateX(${(1 - dIn) * 24}px)`,
                      display: 'flex', gap: 14, alignItems: 'flex-start',
                      padding: '15px 20px', borderRadius: 12,
                      background: `linear-gradient(135deg, ${C.gold}12, ${C.red}08)`, border: `1px solid ${C.gold}55`,
                    }}>
                      <span style={{ color: C.green, fontSize: 18, marginTop: 1 }}>✓</span>
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: 19, fontWeight: 600, color: C.white }}>{d.t}</div>
                        <div style={{ fontSize: 14, color: C.whiteDim, marginTop: 4, lineHeight: 1.45 }}>{d.s}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 46, opacity: clamp((t - 4.0) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 19, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 16,
            }}>
              Marché prouvé et bien capitalisé — <span style={{ color: C.red, fontWeight: 500 }}>Austral Lab</span> est le seul à l'aborder <span style={{ color: C.gold, fontWeight: 500 }}>de façon holistique et pilotée médicalement.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { SceneTeam, SceneFinance, SceneCompetition });
