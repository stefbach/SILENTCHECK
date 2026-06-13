// New service-platform scenes — repositioning SilentCheck as a connected,
// doctor-piloted health companion (not just a score).
//   SceneStart        — le point de départ : score + 2 consultations + biologie
//   SceneServices     — la plateforme de service : orchestration des RDV
//   SceneConcierge    — suivi premium pour dirigeants & cadres pressés
//   SceneSecondAvis   — second avis intégré · réseau France / Europe

// ── Scene — Le point de départ : tout part de 3 choses ─────────────────────
function SceneStart({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const pillars = [
          {
            tag: 'Étape 1', name: 'Le Score BSD', big: '0–100',
            sub: 'Questionnaire intelligent · 15 min',
            desc: 'Santé, habitudes, environnement. En sortie : votre risque cardiovasculaire stratifié et personnalisé.',
            icon: '◉', color: C.cyan, tilt: -10,
          },
          {
            tag: 'Étape 2', name: '2 téléconsultations', big: '× 2',
            sub: 'Un médecin dédié · visio sécurisée',
            desc: 'Lecture du score, plan d’action, puis restitution. Le médecin reste votre interlocuteur de bout en bout.',
            icon: '◎', color: C.gold, tilt: 0,
          },
          {
            tag: 'Étape 3', name: 'Biologie ciblée', big: '5–15',
            sub: 'Bilan adapté à votre risque',
            desc: 'Jamais d’examen à l’aveugle : socle, intermédiaire ou complet. Seulement les biomarqueurs utiles à VOTRE profil.',
            icon: '⬡', color: C.red, tilt: 10,
          },
        ];
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="02" label="Le point de départ" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 170, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 60, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Tout commence par <span style={{ fontStyle: 'italic', color: C.cyan }}>trois choses.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Un score. Deux consultations. Une biologie ciblée.</span>
            </div>

            <div style={{ position: 'absolute', left: 96, top: 440, display: 'flex', gap: 36 }}>
              {pillars.map((p, i) => {
                const pin = clamp((t - 1.0 - i * 0.4) / 0.7, 0, 1);
                const wob = Math.sin(t * 1.4 + i) * 4;
                return (
                  <div key={i} style={{
                    width: 540, height: 470,
                    transform: `perspective(1600px) rotateY(${p.tilt}deg) translateY(${(1 - pin) * 50 + wob}px) scale(${0.85 + pin * 0.15})`,
                    opacity: pin, transformStyle: 'preserve-3d',
                  }}>
                    <GlassCard x={0} y={0} w={540} h={470} border={`${p.color}55`}>
                      <div style={{ padding: 36, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.3em', color: p.color, textTransform: 'uppercase' }}>{p.tag}</div>
                          <div style={{ width: 54, height: 54, borderRadius: 14, background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)`, border: `1px solid ${p.color}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, color: p.color }}>{p.icon}</div>
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: 34, fontWeight: 400, color: C.white, marginTop: 14, letterSpacing: '-0.02em' }}>{p.name}</div>
                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: C.whiteDim, marginTop: 6, letterSpacing: '0.1em' }}>{p.sub}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: 92, fontWeight: 100, color: p.color, lineHeight: 1, letterSpacing: '-0.05em', marginTop: 16 }}>{p.big}</div>
                        <div style={{ borderTop: `1px solid ${p.color}33`, marginTop: 'auto', paddingTop: 18, fontSize: 14, color: C.whiteDim, lineHeight: 1.55 }}>{p.desc}</div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 50,
              opacity: clamp((t - 3.2) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 22, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 20,
            }}>
              Un check-up, c’est d’abord de la <span style={{ color: C.cyan, fontWeight: 500 }}>prévention cardiovasculaire</span> — obésité et mode de vie compris, le début d’un suivi continu.
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — La plateforme de service : orchestration des rendez-vous ────────
function SceneServices({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const coreIn = clamp((t - 1.0) / 1.0, 0, 1);
        const orbitIn = clamp((t - 1.8) / 1.0, 0, 1);
        const strapIn = clamp((t - 5.0) / 0.7, 0, 1);

        const cx = 760, cy = 660;
        const services = [
          { label: 'Cardiologue',     sub: 'Consultation · ECG · écho',          icon: '♥', color: C.red,  slot: 'Mar. 14h30' },
          { label: 'Laboratoire',     sub: 'Prélèvement · bilan complémentaire', icon: '⬡', color: C.cyan, slot: 'Dès demain' },
          { label: 'Radiologie',      sub: 'Coro-scanner · IRM · écho-doppler',  icon: '◎', color: C.gold, slot: 'Jeu. 9h00' },
          { label: 'Diététicienne',   sub: 'Nutrition · programme alimentaire',  icon: '✦', color: C.cyan, slot: 'Visio · 18h' },
          { label: 'Spécialistes',    sub: 'Endocrino · néphro · vasculaire',    icon: '◈', color: C.gold, slot: 'Sous 72h' },
          { label: 'Activité adaptée', sub: 'Coach · APA · réentraînement',      icon: '∞', color: C.red,  slot: 'Programme' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="09" label="Plateforme de service · orchestration des soins" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 170, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Selon vos résultats, l’app <span style={{ fontStyle: 'italic', color: C.gold }}>orchestre votre parcours.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Un seul endroit. Tous les bons interlocuteurs. Zéro errance.</span>
            </div>

            {/* connector lines from core to each service */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <defs>
                <radialGradient id="svcGlow" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor={C.gold} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={C.gold} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r="240" fill="url(#svcGlow)" opacity={coreIn * 0.8} />
              {services.map((s, i) => {
                const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(a) * 440;
                const y = cy + Math.sin(a) * 230;
                const dashOffset = -(t * 50 + i * 6) % 20;
                return (
                  <line key={i} x1={cx} y1={cy} x2={x} y2={y}
                        stroke={s.color} strokeWidth="1.3" opacity={orbitIn * 0.4}
                        strokeDasharray="3 6" strokeDashoffset={dashOffset} />
                );
              })}
            </svg>

            {/* central core — your results */}
            <div style={{
              position: 'absolute', left: cx, top: cy,
              transform: `translate(-50%, -50%) scale(${0.5 + coreIn * 0.5})`,
              opacity: coreIn, zIndex: 6,
            }}>
              <div style={{
                width: 230, height: 230, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, ${C.gold}cc, ${C.goldDim}55)`,
                border: `3px solid ${C.gold}`,
                boxShadow: `0 0 70px ${C.gold}88, inset 0 0 30px rgba(255,255,255,0.15)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.bg0, letterSpacing: '0.25em', fontWeight: 600 }}>VOS RÉSULTATS</div>
                <div style={{ fontFamily: 'Inter', fontSize: 30, fontWeight: 500, color: C.bg0, marginTop: 6, letterSpacing: '-0.01em' }}>L’app vous oriente</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.bg0, opacity: 0.75, letterSpacing: '0.2em', marginTop: 6, textTransform: 'uppercase' }}>piloté par votre médecin</div>
              </div>
              {[0, 1, 2].map(i => {
                const phase = (t * 0.7 + i * 0.6) % 2;
                if (phase > 1.4) return null;
                return <div key={i} style={{
                  position: 'absolute', inset: 0, border: `2px solid ${C.gold}`, borderRadius: '50%',
                  transform: `scale(${1 + phase * 0.5})`, opacity: (1 - phase / 1.4) * 0.5,
                }} />;
              })}
            </div>

            {/* service cards around the core */}
            {services.map((s, i) => {
              const a = (i / services.length) * Math.PI * 2 - Math.PI / 2;
              const x = cx + Math.cos(a) * 440;
              const y = cy + Math.sin(a) * 230;
              const sIn = clamp((t - 2.0 - i * 0.22) / 0.6, 0, 1);
              const wob = Math.sin(t * 1.1 + i * 0.6) * 4;
              return (
                <div key={i} style={{
                  position: 'absolute', left: x, top: y + wob,
                  transform: `translate(-50%, -50%) scale(${0.7 + sIn * 0.3})`,
                  opacity: sIn,
                  width: 250,
                  background: 'rgba(8,15,40,0.92)',
                  border: `1.5px solid ${s.color}aa`,
                  borderRadius: 14,
                  boxShadow: `0 0 26px ${s.color}44`,
                  backdropFilter: 'blur(8px)',
                  padding: 16, zIndex: 5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                      background: `${s.color}22`, border: `1px solid ${s.color}88`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: 18,
                    }}>{s.icon}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: 18, fontWeight: 600, color: C.white, letterSpacing: '-0.01em' }}>{s.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: 11, color: C.whiteDim, marginTop: 2, lineHeight: 1.3 }}>{s.sub}</div>
                    </div>
                  </div>
                  <div style={{
                    marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '7px 12px', borderRadius: 8,
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                  }}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.bg0, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Réserver</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.bg0, fontWeight: 600 }}>{s.slot}</span>
                  </div>
                </div>
              );
            })}

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 50,
              opacity: strapIn, transform: `translateY(${(1 - strapIn) * 20}px)`,
              padding: '16px 28px', borderRadius: 12,
              border: `1px solid ${C.gold}55`,
              background: 'linear-gradient(90deg, rgba(251,191,36,0.1), rgba(34,211,238,0.05))',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.whiteDim, letterSpacing: '0.12em',
            }}>
              <span>● Prise de RDV en 2 clics</span>
              <span style={{ color: C.gold }}>● RDV garantis · zéro liste d’attente</span>
              <span style={{ color: C.cyan }}>● Orientation validée par votre médecin</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — Suivi premium : dirigeants & cadres pressés ─────────────────────
function SceneConcierge({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const phoneIn = clamp((t - 0.9) / 1.0, 0, 1);

        const features = [
          { title: 'Bilan annuel orchestré de A à Z', desc: 'Examens, créneaux, rappels : tout est géré. Vous n’avez rien à organiser.', icon: '⌖' },
          { title: 'Créneaux prioritaires', desc: 'Rendez-vous calés sur votre agenda — visio ou présentiel, au bon moment.', icon: '◷' },
          { title: 'Médecin référent dédié', desc: 'Un interlocuteur médical unique, joignable, qui connaît votre dossier.', icon: '◉' },
          { title: 'Tableau de bord longévité', desc: 'Score, biomarqueurs et capteurs en temps réel, en un coup d’œil.', icon: '∞' },
          { title: 'Suivi continu & alertes', desc: 'Capteurs connectés analysés en continu — vous êtes prévenu avant que ça dérape.', icon: '◇' },
          { title: 'Confidentialité absolue', desc: 'Données chiffrées, secret médical, aucune fuite vers l’entreprise.', icon: '⬡' },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="10" label="Suivi premium · dirigeants & cadres" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 160, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Pensé pour ceux qui n’ont pas le temps <span style={{ fontStyle: 'italic', color: C.gold }}>d’être malades.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Stress, sédentarité, repas d’affaires, dette de sommeil — un cœur exposé, en silence.</span>
            </div>

            {/* Executive dashboard phone */}
            <div style={{
              position: 'absolute', left: 360, top: 680,
              transform: `translate(-50%, -50%) perspective(1500px) rotateY(${Math.sin(t * 0.5) * 6}deg) scale(${0.7 + phoneIn * 0.3})`,
              opacity: phoneIn, transformStyle: 'preserve-3d',
            }}>
              <div style={{
                width: 300, height: 600,
                background: 'linear-gradient(135deg, #1a2540, #0a1535)',
                borderRadius: 38, padding: 9,
                border: `2px solid ${C.gold}66`,
                boxShadow: `0 30px 90px rgba(0,0,0,0.6), 0 0 60px ${C.gold}44`,
                position: 'relative',
              }}>
                <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', width: 84, height: 18, background: '#000', borderRadius: 12, zIndex: 2 }} />
                <div style={{
                  width: '100%', height: '100%', background: C.bg0,
                  borderRadius: 30, overflow: 'hidden', padding: '42px 20px 20px',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.gold, letterSpacing: '0.25em' }}>PREMIUM</div>
                    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.whiteDim }}>SilentCheck</div>
                  </div>
                  <div style={{ fontSize: 15, color: C.white, fontWeight: 500 }}>Bonjour, Dr Bach</div>
                  {/* score ring */}
                  <div style={{ alignSelf: 'center', position: 'relative', marginTop: 4 }}>
                    <svg width="120" height="120" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="48" fill="none" stroke={C.line} strokeWidth="6" />
                      <circle cx="60" cy="60" r="48" fill="none" stroke={C.gold} strokeWidth="6"
                              strokeDasharray={`${0.34 * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
                              transform="rotate(-90 60 60)" strokeLinecap="round" />
                      <text x="60" y="60" textAnchor="middle" fill={C.white} fontFamily="Inter" fontSize="32" fontWeight="200">34</text>
                      <text x="60" y="80" textAnchor="middle" fill={C.whiteDim} fontFamily="JetBrains Mono, monospace" fontSize="8">RISQUE FAIBLE</text>
                    </svg>
                  </div>
                  {[
                    ['Prochain bilan', 'dans 14 j', C.cyan],
                    ['Cardiologue', 'Mar. 14h30', C.gold],
                    ['Espérance de vie', '+4,1 ans', C.cyan],
                    ['Alertes capteurs', 'aucune', C.cyan],
                  ].map(([k, v, col], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(251,191,36,0.06)', border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 11 }}>
                      <span style={{ color: C.whiteDim }}>{k}</span>
                      <span style={{ color: col, fontWeight: 600 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', padding: '11px', background: `linear-gradient(135deg, ${C.gold}, ${C.cyan})`, borderRadius: 10, textAlign: 'center', fontSize: 12, fontWeight: 700, color: C.bg0 }}>
                    Contacter mon médecin référent
                  </div>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div style={{
              position: 'absolute', right: 96, top: 430, width: 1020,
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18,
            }}>
              {features.map((f, i) => {
                const fIn = clamp((t - 1.6 - i * 0.18) / 0.6, 0, 1);
                return (
                  <div key={i} style={{
                    opacity: fIn, transform: `translateX(${(1 - fIn) * 30}px)`,
                    padding: '18px 22px',
                    background: 'rgba(251,191,36,0.04)',
                    border: `1px solid ${C.gold}44`,
                    borderRadius: 12,
                    display: 'flex', gap: 16,
                  }}>
                    <div style={{
                      width: 44, height: 44, flexShrink: 0, borderRadius: 11,
                      background: `linear-gradient(135deg, ${C.gold}33, ${C.gold}11)`,
                      border: `1px solid ${C.gold}66`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.gold, fontSize: 20,
                    }}>{f.icon}</div>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 500, color: C.white }}>{f.title}</div>
                      <div style={{ fontSize: 12, color: C.whiteDim, marginTop: 5, lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 46,
              opacity: clamp((t - 5.2) / 0.6, 0, 1),
              fontFamily: 'Inter', fontSize: 20, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.gold}33`, paddingTop: 18,
            }}>
              Votre santé pilotée comme votre agenda — <span style={{ color: C.gold, fontWeight: 500 }}>RDV garantis, zéro liste d’attente, zéro perte de temps.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — Second avis intégré · réseau de correspondants France / Europe ──
function SceneSecondAvis({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const netIn = clamp((t - 1.0) / 1.2, 0, 1);
        const stepsIn = clamp((t - 2.6) / 0.8, 0, 1);

        // abstract constellation of expert centres (not a literal map)
        const cx = 620, cy = 660;
        const nodes = [
          { name: 'Paris',      x: 640, y: 470, fr: true },
          { name: 'Lyon',       x: 760, y: 600, fr: true },
          { name: 'Marseille',  x: 700, y: 760, fr: true },
          { name: 'Lille',      x: 560, y: 410, fr: true },
          { name: 'Bordeaux',   x: 430, y: 660, fr: true },
          { name: 'Toulouse',   x: 500, y: 800, fr: true },
          { name: 'Genève',     x: 900, y: 540, fr: false },
          { name: 'Bruxelles',  x: 720, y: 320, fr: false },
          { name: 'Milan',      x: 980, y: 700, fr: false },
          { name: 'Barcelone',  x: 480, y: 900, fr: false },
          { name: 'Londres',    x: 470, y: 300, fr: false },
          { name: 'Berlin',     x: 1000, y: 380, fr: false },
        ];

        const steps = [
          { n: '01', title: 'Dossier transmis', desc: 'Vos résultats, sécurisés et anonymisés, partagés en un clic depuis l’app.', color: C.cyan },
          { n: '02', title: 'Un expert de renommée internationale', desc: 'Un spécialiste de référence, choisi pour votre cas, rend un second avis argumenté — sans liste d’attente.', color: C.gold },
          { n: '03', title: 'Coordonné par votre médecin', desc: 'Votre médecin SilentCheck intègre l’avis au plan d’action. RDV garanti, réponse en quelques jours.', color: C.red },
        ];

        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="11" label="Second avis intégré · réseau France & Europe" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 160, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Un doute ? Un <span style={{ fontStyle: 'italic', color: C.cyan }}>deuxième regard,</span> en quelques jours.<br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Un réseau de correspondants de renommée internationale — France et Europe.</span>
            </div>

            {/* network constellation */}
            <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              <defs>
                <radialGradient id="netGlow" cx="0.5" cy="0.5">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx={cx} cy={cy} r="200" fill="url(#netGlow)" opacity={netIn * 0.7} />
              {nodes.map((n, i) => {
                const dashOffset = -(t * 40 + i * 7) % 18;
                const col = n.fr ? C.cyan : C.gold;
                return (
                  <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
                        stroke={col} strokeWidth="1.1" opacity={netIn * 0.35}
                        strokeDasharray="2 6" strokeDashoffset={dashOffset} />
                );
              })}
            </svg>

            {/* central patient node */}
            <div style={{
              position: 'absolute', left: cx, top: cy,
              transform: `translate(-50%, -50%) scale(${0.5 + netIn * 0.5})`,
              opacity: netIn, zIndex: 6,
            }}>
              <div style={{
                width: 150, height: 150, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, ${C.cyan}cc, ${C.cyanDim}44)`,
                border: `3px solid ${C.cyan}`,
                boxShadow: `0 0 60px ${C.cyan}88, inset 0 0 24px rgba(255,255,255,0.15)`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ fontFamily: 'Inter', fontSize: 26, fontWeight: 400, color: C.bg0, letterSpacing: '0.04em' }}>VOTRE CAS</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: C.bg0, opacity: 0.75, letterSpacing: '0.2em', marginTop: 4 }}>SÉCURISÉ</div>
              </div>
              {[0, 1, 2].map(i => {
                const phase = (t * 0.7 + i * 0.6) % 2;
                if (phase > 1.4) return null;
                return <div key={i} style={{
                  position: 'absolute', inset: 0, border: `2px solid ${C.cyan}`, borderRadius: '50%',
                  transform: `scale(${1 + phase * 0.6})`, opacity: (1 - phase / 1.4) * 0.5,
                }} />;
              })}
            </div>

            {/* expert city nodes */}
            {nodes.map((n, i) => {
              const sIn = clamp((t - 1.2 - i * 0.08) / 0.5, 0, 1);
              const col = n.fr ? C.cyan : C.gold;
              const wob = Math.sin(t * 1.1 + i * 0.5) * 3;
              return (
                <div key={i} style={{
                  position: 'absolute', left: n.x, top: n.y + wob,
                  transform: `translate(-50%, -50%) scale(${0.6 + sIn * 0.4})`,
                  opacity: sIn, zIndex: 5,
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px',
                  background: 'rgba(8,15,40,0.9)',
                  border: `1px solid ${col}99`,
                  borderRadius: 100,
                  boxShadow: `0 0 16px ${col}44`,
                  backdropFilter: 'blur(6px)',
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: col, boxShadow: `0 0 8px ${col}` }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.white, letterSpacing: '0.08em' }}>{n.name}</span>
                </div>
              );
            })}

            {/* legend */}
            <div style={{
              position: 'absolute', left: cx, top: 920,
              transform: 'translateX(-50%)', opacity: netIn,
              display: 'flex', gap: 24,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <span style={{ color: C.cyan }}>● France</span>
              <span style={{ color: C.gold }}>● Europe</span>
            </div>

            {/* process steps (right) */}
            <div style={{
              position: 'absolute', right: 90, top: 430, width: 620,
              display: 'flex', flexDirection: 'column', gap: 18, opacity: stepsIn,
            }}>
              {steps.map((s, i) => {
                const stIn = clamp((t - 2.6 - i * 0.3) / 0.6, 0, 1);
                return (
                  <div key={i} style={{
                    opacity: stIn, transform: `translateX(${(1 - stIn) * 30}px)`,
                    padding: '20px 24px',
                    background: `linear-gradient(135deg, ${s.color}10, ${s.color}03)`,
                    border: `1px solid ${s.color}66`,
                    borderRadius: 14,
                    display: 'flex', gap: 18, alignItems: 'flex-start',
                  }}>
                    <div style={{ fontFamily: 'Inter', fontSize: 44, fontWeight: 100, color: s.color, lineHeight: 0.9, letterSpacing: '-0.04em', minWidth: 60 }}>{s.n}</div>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 500, color: C.white, letterSpacing: '-0.01em' }}>{s.title}</div>
                      <div style={{ fontSize: 13, color: C.whiteDim, marginTop: 6, lineHeight: 1.55 }}>{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 44,
              opacity: clamp((t - 5.0) / 0.6, 0, 1),
              fontFamily: 'Inter', fontSize: 20, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 16,
            }}>
              Le bon expert, de renommée internationale — <span style={{ color: C.cyan, fontWeight: 500 }}>RDV garanti, zéro liste d’attente, depuis votre téléphone.</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { SceneStart, SceneServices, SceneConcierge, SceneSecondAvis });
