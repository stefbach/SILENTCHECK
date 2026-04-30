// Scene 9 — Mockups patient (3 phone screens in 3D perspective)
function Scene9Mockups({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const phones = [
          {
            label: 'Entrée SilentCheck',
            tilt: -14, delay: 1.0,
            content: (
              <div style={{ padding: '40px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim, letterSpacing: '0.2em' }}>SILENTCHECK</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: `radial-gradient(circle, ${C.cyan}, ${C.blueDeep})`, boxShadow: `0 0 30px ${C.cyan}aa`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>♥</div>
                  <div style={{ fontSize: 26, fontWeight: 200, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Connaissez<br/>votre risque.</div>
                  <div style={{ fontSize: 11, color: C.whiteDim, lineHeight: 1.4 }}>Stratification cardiovasculaire personnalisée</div>
                </div>
                <div style={{ padding: '14px', background: `linear-gradient(135deg, ${C.cyan}, ${C.blue})`, borderRadius: 12, textAlign: 'center', fontSize: 13, fontWeight: 600, color: C.bg0 }}>Commencer mon évaluation</div>
                <div style={{ marginTop: 10, fontSize: 9, color: C.whiteDim, textAlign: 'center', fontFamily: 'JetBrains Mono, monospace' }}>15 min · médecin inclus</div>
              </div>
            )
          },
          {
            label: 'Questionnaire',
            tilt: 0, delay: 1.4,
            content: (
              <div style={{ padding: '40px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim, letterSpacing: '0.2em' }}>
                  <span>Q. 03 / ~40</span><span style={{ color: C.cyan }}>● ● ● ○ ○</span>
                </div>
                <div style={{ marginTop: 24, fontSize: 22, fontWeight: 300, color: C.white, lineHeight: 1.2 }}>Votre âge ?</div>
                <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['18–29 ans','30–44 ans','45–59 ans','60–74 ans','75 ans et +'].map((opt, i) => (
                    <div key={i} style={{
                      padding: '12px 14px', fontSize: 12, color: i === 2 ? C.bg0 : C.white,
                      background: i === 2 ? C.cyan : 'rgba(34,211,238,0.06)',
                      border: `1px solid ${i === 2 ? C.cyan : C.line}`,
                      borderRadius: 10, fontWeight: i === 2 ? 600 : 400,
                    }}>{opt}</div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(34,211,238,0.1)', border: `1px solid ${C.line}`, borderRadius: 10, textAlign: 'center', fontSize: 12, color: C.cyan }}>Suivant →</div>
              </div>
            )
          },
          {
            label: 'Score & restitution',
            tilt: 14, delay: 1.8,
            content: (
              <div style={{ padding: '40px 24px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim, letterSpacing: '0.2em' }}>SCORE BSD</div>
                <div style={{ marginTop: 14, alignSelf: 'center', position: 'relative' }}>
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="58" fill="none" stroke={C.line} strokeWidth="6" />
                    <circle cx="70" cy="70" r="58" fill="none" stroke={C.gold} strokeWidth="6"
                            strokeDasharray={`${0.42 * 2 * Math.PI * 58} ${2 * Math.PI * 58}`}
                            transform="rotate(-90 70 70)" strokeLinecap="round" />
                    <text x="70" y="78" textAnchor="middle" fill={C.white} fontFamily="Inter" fontSize="36" fontWeight="200">42</text>
                    <text x="70" y="96" textAnchor="middle" fill={C.whiteDim} fontFamily="JetBrains Mono, monospace" fontSize="9">/ 100</text>
                  </svg>
                </div>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 11 }}>
                  {[
                    ['Risque', 'modéré', C.gold],
                    ['Bilan', '10 analyses', C.cyan],
                    ['Espérance de vie', '+3,2 ans', C.cyan],
                    ['Téléconsultation', 'programmée', C.cyan],
                  ].map(([k, v, col], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(34,211,238,0.05)', border: `1px solid ${C.line}`, borderRadius: 8 }}>
                      <span style={{ color: C.whiteDim }}>{k}</span>
                      <span style={{ color: col, fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', padding: '12px', background: `linear-gradient(135deg, ${C.cyan}, ${C.gold})`, borderRadius: 10, textAlign: 'center', fontSize: 12, color: C.bg0, fontWeight: 600 }}>Voir mon plan d'action</div>
              </div>
            )
          },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="07" label="Côté patient · trois écrans clés" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 60, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              L'expérience patient,<br/>
              <span style={{ fontStyle: 'italic', color: C.cyan }}>du questionnaire au score.</span>
            </div>

            <div style={{ position: 'absolute', left: 0, right: 0, top: 460, display: 'flex', justifyContent: 'center', gap: 80, perspective: '1800px' }}>
              {phones.map((p, i) => {
                const phoneIn = clamp((t - p.delay) / 0.8, 0, 1);
                const wob = Math.sin(t * 1.3 + i) * 6;
                return (
                  <div key={i} style={{
                    width: 280, height: 560,
                    transform: `rotateY(${p.tilt}deg) translateY(${(1-phoneIn)*60 + wob}px) scale(${0.85 + phoneIn * 0.15})`,
                    opacity: phoneIn,
                    transformStyle: 'preserve-3d',
                  }}>
                    {/* Phone bezel */}
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'linear-gradient(135deg, #1a2540, #0a1535)',
                      borderRadius: 36,
                      border: `2px solid ${C.lineStrong}`,
                      boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${C.cyan}33`,
                      padding: 8, position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 80, height: 18, background: '#000', borderRadius: 12, zIndex: 2 }} />
                      <div style={{
                        width: '100%', height: '100%',
                        background: C.bg0, borderRadius: 30,
                        overflow: 'hidden', position: 'relative',
                      }}>
                        {p.content}
                      </div>
                    </div>
                    <div style={{
                      marginTop: 18, textAlign: 'center',
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
                      color: C.whiteDim, letterSpacing: '0.2em', textTransform: 'uppercase',
                    }}>
                      Écran {i+1} · {p.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 10 — Restitution IA · vrai programme de prévention
function Scene10Bilan({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const aiIn = clamp((t - 1.0) / 0.8, 0, 1);
        const items = [
          { title: 'Score SilentCheck', sub: '0–100 · 4 dimensions intégrées', desc: 'Clinique · Exposome · Occupationnel · Lifestyle. 15 biomarqueurs et ajustement ethnique automatisés par l\'IA.', icon: '◉', color: C.cyan },
          { title: 'Stratégie de prévention sur-mesure', sub: 'Plan d\'action priorisé · 6 / 12 / 24 mois', desc: 'L\'IA hiérarchise vos risques et bâtit un vrai programme : objectifs, cibles biologiques, jalons de suivi datés.', icon: '∞', color: C.gold },
          { title: 'Examens utiles uniquement', sub: 'Fini la prescription à l\'aveugle', desc: 'Le moteur cible les biomarqueurs pertinents pour VOTRE profil. Zéro examen inutile · zéro consultation redondante.', icon: '✦', color: C.cyan },
          { title: 'Documents & dispositif de suivi', sub: '3 livrables bilingues FR / EN', desc: 'Plan de Route Longévité · Certificat Emprunteur · Certificat Engagement Santé. Suivi continu et réajusté par l\'IA.', icon: '◈', color: C.gold },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="08" label="Restitution assistée par IA · médecine de prévention 21ᵉ siècle" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 160,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Une vraie <span style={{ fontStyle: 'italic', color: C.gold }}>stratégie de prévention,</span><br/>
              <span style={{ fontSize: 28, fontWeight: 300, color: C.cyan }}>
                co-construite par l'IA et votre médecin — plus jamais d'examens à l'aveugle.
              </span>
            </div>

            {/* AI badge */}
            <div style={{
              position: 'absolute', right: 96, top: 180,
              opacity: aiIn, transform: `translateY(${(1-aiIn)*20}px)`,
              padding: '14px 22px',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15), rgba(251,191,36,0.1))',
              border: `1px solid ${C.cyan}88`, borderRadius: 100,
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: `0 0 30px ${C.cyan}44`,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: 5, background: C.cyan,
                boxShadow: `0 0 12px ${C.cyan}`,
                opacity: 0.6 + Math.sin(t * 4) * 0.4,
              }} />
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.white, letterSpacing: '0.25em' }}>
                IA MÉDICALE · ANALYSE EN TEMPS RÉEL
              </span>
            </div>

            <div style={{ position: 'absolute', left: 96, top: 440, right: 96, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {items.map((it, i) => {
                const itemIn = clamp((t - 1.4 - i * 0.3) / 0.7, 0, 1);
                const tilt = (i % 2 === 0 ? -1 : 1) * 4;
                return (
                  <div key={i} style={{
                    transform: `perspective(1500px) rotateY(${tilt}deg) translateY(${(1-itemIn)*30}px) scale(${0.92 + itemIn * 0.08})`,
                    opacity: itemIn, height: 220,
                  }}>
                    <GlassCard x={0} y={0} w="100%" h={220} border={`${it.color}55`}>
                      <div style={{ padding: 24, height: '100%', display: 'flex', gap: 20 }}>
                        <div style={{
                          width: 60, height: 60, flexShrink: 0,
                          borderRadius: 14,
                          background: `linear-gradient(135deg, ${it.color}33, ${it.color}11)`,
                          border: `1px solid ${it.color}66`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 28, color: it.color,
                        }}>{it.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: it.color, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{it.sub}</div>
                          <div style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 500, color: C.white, marginTop: 6, letterSpacing: '-0.01em' }}>{it.title}</div>
                          <div style={{ fontSize: 13, color: C.whiteDim, marginTop: 10, lineHeight: 1.5 }}>{it.desc}</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>

            {/* Bottom manifesto strap */}
            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 40,
              opacity: clamp((t - 4.5) / 0.7, 0, 1),
              padding: '16px 28px', borderRadius: 12,
              border: `1px solid ${C.gold}55`,
              background: 'linear-gradient(90deg, rgba(251,191,36,0.08), rgba(34,211,238,0.05))',
              fontFamily: 'Inter', fontSize: 18, color: C.white, fontWeight: 300,
              textAlign: 'center', letterSpacing: '0.02em',
            }}>
              La médecine du <span style={{ color: C.gold, fontWeight: 500 }}>21ᵉ siècle</span> n'est plus seulement curative — elle est <span style={{ color: C.cyan, fontStyle: 'italic' }}>personnalisée et préventive.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 11 — Sécurité, consentement, conformité
function Scene11Security({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const shieldIn = clamp((t - 0.8) / 1.0, 0, 1);
        const itemsIn = clamp((t - 2.0) / 0.6, 0, 1);

        const commits = [
          { title: 'Données anonymisées', desc: 'Aucune donnée nominative ne sort du périmètre médical. Données agrégées · jamais vendues.' },
          { title: 'Conformité RGPD', desc: 'Pour les patients résidant ou voyageant dans l\'UE / Royaume-Uni.' },
          { title: 'Médecins agréés', desc: 'Secret médical absolu · responsabilité professionnelle individuelle.' },
          { title: 'Droit à l\'oubli', desc: 'Suppression sur demande, en moins de 30 jours.' },
          { title: 'DPO désigné', desc: 'Registre des traitements à jour · serveurs sécurisés.' },
          { title: 'Consentement explicite', desc: '8 articles détaillés · accessibles dans l\'app.' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="09" label="Confidentialité · consentement · conformité" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 60, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Vos données,<br/>
              <span style={{ fontStyle: 'italic', color: C.cyan }}>protégées comme un secret médical.</span>
            </div>

            {/* 3D shield */}
            <div style={{
              position: 'absolute', left: 240, top: 540,
              opacity: shieldIn,
              transform: `translate(-50%, -50%) perspective(1200px) rotateY(${Math.sin(t * 0.6) * 12}deg) scale(${0.6 + shieldIn * 0.4})`,
              transformStyle: 'preserve-3d',
            }}>
              <svg width="380" height="440" viewBox="0 0 380 440" style={{ filter: `drop-shadow(0 0 50px ${C.cyan})` }}>
                <defs>
                  <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={C.cyan} stopOpacity="0.35" />
                    <stop offset="100%" stopColor={C.blueDeep} stopOpacity="0.15" />
                  </linearGradient>
                  <linearGradient id="shieldShine" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                    <stop offset="40%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <path d="M 190 20 L 60 70 L 60 220 Q 60 340 190 420 Q 320 340 320 220 L 320 70 Z"
                      fill="url(#shieldGrad)" stroke={C.cyan} strokeWidth="2" />
                <path d="M 190 20 L 60 70 L 60 220 Q 60 340 190 420"
                      fill="url(#shieldShine)" />
                {/* Lock */}
                <g transform="translate(190 220)">
                  <rect x="-40" y="-10" width="80" height="70" rx="8" fill="none" stroke={C.cyan} strokeWidth="2.5" />
                  <path d="M -25 -10 L -25 -35 Q -25 -60 0 -60 Q 25 -60 25 -35 L 25 -10" fill="none" stroke={C.cyan} strokeWidth="2.5" />
                  <circle cx="0" cy="22" r="6" fill={C.cyan} />
                  <line x1="0" y1="22" x2="0" y2="40" stroke={C.cyan} strokeWidth="3" />
                </g>
                <text x="190" y="380" textAnchor="middle" fill={C.white} fontFamily="JetBrains Mono, monospace" fontSize="14" letterSpacing="6">RGPD · DPA</text>
              </svg>
            </div>

            <div style={{
              position: 'absolute', right: 96, top: 420, width: 1000,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
            }}>
              {commits.map((c, i) => {
                const itIn = clamp((t - 2.0 - i * 0.15) / 0.5, 0, 1);
                return (
                  <div key={i} style={{
                    opacity: itIn, transform: `translateX(${(1-itIn)*30}px)`,
                    padding: '18px 22px',
                    background: 'rgba(34,211,238,0.04)',
                    border: `1px solid ${C.line}`,
                    borderRadius: 12,
                    display: 'flex', gap: 14,
                  }}>
                    <div style={{
                      width: 24, height: 24, flexShrink: 0,
                      borderRadius: '50%',
                      background: C.cyan,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: C.bg0, fontWeight: 700, fontSize: 14,
                    }}>✓</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 500, color: C.white }}>{c.title}</div>
                      <div style={{ fontSize: 12, color: C.whiteDim, marginTop: 4, lineHeight: 1.5 }}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene 12 — Auteurs scientifiques
function Scene12Authors({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);

        const authors = [
          {
            initials: 'SB', name: 'Dr. Stéphane Bach',
            role: 'Médecin · Fondateur',
            desc: 'Spécialiste prévention cardiovasculaire et obésité. Entrepreneur santé numérique.',
            tilt: -10,
          },
          {
            initials: 'JS', name: 'Pr. José Sampol',
            role: 'Hématologie & médecine vasculaire',
            desc: 'Professeur émérite. Référent international pour la stratification des risques thrombo-vasculaires.',
            tilt: 0,
          },
          {
            initials: 'FD', name: 'Pr. Françoise Dignat-George',
            role: 'Hématologie · Aix-Marseille Université',
            desc: 'Présidente de la SFTH · membre du conseil scientifique INSERM. Référente cellules circulantes & inflammation.',
            tilt: 10,
          },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="10" label="Auteurs scientifiques & validation" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 180,
              opacity: titleIn, transform: `translateY(${(1-titleIn)*20}px)`,
              fontFamily: 'Inter', fontSize: 60, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Trois signatures<br/>
              <span style={{ fontStyle: 'italic', color: C.gold }}>derrière chaque score.</span>
            </div>

            <div style={{ position: 'absolute', left: 96, top: 460, display: 'flex', gap: 36 }}>
              {authors.map((a, i) => {
                const aIn = clamp((t - 1.0 - i * 0.4) / 0.7, 0, 1);
                const wob = Math.sin(t * 1.2 + i) * 4;
                return (
                  <div key={i} style={{
                    width: 540, height: 460,
                    transform: `perspective(1500px) rotateY(${a.tilt}deg) translateY(${(1-aIn)*40 + wob}px) scale(${0.85 + aIn * 0.15})`,
                    opacity: aIn, transformStyle: 'preserve-3d',
                  }}>
                    <GlassCard x={0} y={0} w={540} h={460} border={`${C.gold}55`}>
                      <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{
                          width: 130, height: 130,
                          borderRadius: '50%',
                          background: `radial-gradient(circle at 30% 30%, ${C.gold}, ${C.goldDim})`,
                          border: `2px solid ${C.gold}`,
                          boxShadow: `0 0 50px ${C.gold}66, inset 0 0 20px rgba(255,255,255,0.2)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontFamily: 'Inter', fontSize: 42, fontWeight: 300,
                          color: C.bg0, letterSpacing: '0.05em',
                          marginTop: 8, marginBottom: 28,
                        }}>{a.initials}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>{a.name}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.gold, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 10 }}>{a.role}</div>
                        <div style={{ fontSize: 14, color: C.whiteDim, marginTop: 22, lineHeight: 1.55, fontWeight: 300 }}>{a.desc}</div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, bottom: 50, right: 96,
              opacity: clamp((t - 3.4) / 0.8, 0, 1),
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
              color: C.whiteDim, letterSpacing: '0.15em',
              borderTop: `1px solid ${C.line}`, paddingTop: 18,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span><span style={{ color: C.gold }}>69 612</span> individus dans la cohorte de validation initiale</span>
              <span>Article scientifique soumis · NHANES 1999–2018 · n = 59 204</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Scene12Authors is overridden by scenes/scene-12-pilot.jsx (loaded after this file)
Object.assign(window, { Scene9Mockups, Scene10Bilan, Scene11Security });
