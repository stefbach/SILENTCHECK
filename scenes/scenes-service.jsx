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
          { label: 'Généraliste',    sub: 'Point d\'entrée · visio',         icon: '◉', img: 'generaliste.png', color: C.cyan, slot: 'Aujourd\'hui' },
          { label: 'Biologie',       sub: 'Prélèvement à domicile possible', icon: '⬡', color: C.cyan, slot: 'Dès demain' },
          { label: 'Cardiologue',    sub: 'Consultation · ECG · écho',       icon: '♥', img: 'cardiologue.png', color: C.red,  slot: 'Mar. 14h30' },
          { label: 'Ophtalmologue',  sub: 'Fond d\'œil · rétinopathie',      icon: '◐', color: C.gold, slot: 'Jeu. 9h00' },
          { label: 'Gynécologue',    sub: 'Suivi · prévention',              icon: '✦', color: C.gold, slot: 'Sous 72h' },
          { label: 'Radiologie',     sub: 'Imagerie · paraclinique',         icon: '◎', color: C.red,  slot: 'Sur indication' },
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
              Tout part du généraliste et de la biologie — <span style={{ fontStyle: 'italic', color: C.gold }}>puis on décline.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Cardiologue, ophtalmologue, gynécologue… orchestrés selon vos résultats.</span>
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
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.bg0, letterSpacing: '0.25em', fontWeight: 600 }}>POINT D'ENTRÉE</div>
                <div style={{ fontFamily: 'Inter', fontSize: 26, fontWeight: 500, color: C.bg0, marginTop: 6, letterSpacing: '-0.01em' }}>Généraliste + biologie</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: C.bg0, opacity: 0.75, letterSpacing: '0.2em', marginTop: 6, textTransform: 'uppercase' }}>puis on décline · piloté par l'app</div>
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
                    {s.img ? (
                      <div style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0, overflow: 'hidden', border: `1.5px solid ${s.color}`, boxShadow: `0 0 12px ${s.color}66` }}>
                        <img src={'assets/faces/' + s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </div>
                    ) : (
                      <div style={{
                        width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                        background: `${s.color}22`, border: `1px solid ${s.color}88`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: 18,
                      }}>{s.icon}</div>
                    )}
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
              <span>● RDV garantis en 2 clics</span>
              <span style={{ color: C.gold }}>● Partenaires privilégiés · zéro liste d’attente</span>
              <span style={{ color: C.cyan }}>● Déplacement uniquement si examen paraclinique</span>
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
              La 1ʳᵉ plateforme de prévention pour dirigeants <span style={{ fontStyle: 'italic', color: C.gold }}>exigeants et pressés.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Stress, sédentarité, repas d’affaires, dette de sommeil — un cœur exposé, en silence.</span>
            </div>

            {/* Executive persona portrait + subscription tag */}
            <div style={{ position: 'absolute', left: 90, top: 444, opacity: phoneIn, transform: `translateY(${(1 - phoneIn) * 30}px)` }}>
              <PortraitFrame src="assets/faces/dirigeante.png" color={C.gold} w={280} h={360} />
              <div style={{ textAlign: 'center', marginTop: 14, fontFamily: 'Inter', fontSize: 16, color: C.white, fontWeight: 500 }}>Vous, pilote de votre santé</div>
              <div style={{ textAlign: 'center', marginTop: 6, fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.2em', color: C.gold, textTransform: 'uppercase' }}>Abonnement premium</div>
            </div>

            {/* Executive dashboard phone */}
            <div style={{
              position: 'absolute', left: 560, top: 680,
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
                  <div style={{ fontSize: 15, color: C.white, fontWeight: 500 }}>Bonjour, Dr Durand</div>
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
              Un abonnement, tout piloté à distance — <span style={{ color: C.gold, fontWeight: 500 }}>RDV garantis, zéro liste d’attente, zéro perte de temps.</span>
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

// ── Holographic human face (stylized HUD scan, no photo) ───────────────────
function HoloFace({ color = C.cyan, variant = 'patient' }) {
  const t = useTime();
  const scanY = 46 + ((t * 46) % 152);
  const ringRot = t * 28;
  const facePath = 'M 110 46 C 70 46 56 78 56 110 C 56 150 78 186 110 196 C 142 186 164 150 164 110 C 164 78 150 46 110 46 Z';
  const dots = [[110,52],[60,108],[160,108],[88,112],[132,112],[110,140],[96,162],[124,162],[110,194]];
  return (
    <svg width="220" height="292" viewBox="0 0 220 292" style={{ filter: `drop-shadow(0 0 16px ${color}aa)` }}>
      <defs>
        <clipPath id={'hc-' + variant}><path d={facePath} /></clipPath>
        <radialGradient id={'hg-' + variant} cx="0.5" cy="0.42">
          <stop offset="0%" stopColor={`${color}33`} />
          <stop offset="100%" stopColor={`${color}00`} />
        </radialGradient>
      </defs>

      {/* rotating reticle */}
      <g transform={`rotate(${ringRot} 110 118)`} opacity="0.4">
        <circle cx="110" cy="118" r="100" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 11" />
      </g>
      <circle cx="110" cy="118" r="104" fill="none" stroke={color} strokeWidth="1" opacity="0.22" />

      {/* bust + collar variants */}
      <path d="M 40 292 C 44 232 74 206 110 206 C 146 206 176 232 180 292 Z" fill={`url(#hg-${variant})`} stroke={color} strokeWidth="1.3" opacity="0.55" />
      {variant === 'exec' && (
        <g stroke={color} strokeWidth="1.4" fill="none" opacity="0.85">
          <path d="M 92 210 L 110 230 L 128 210" />
          <path d="M 110 230 L 104 264 L 116 264 Z" fill={`${color}33`} />
        </g>
      )}
      {variant === 'doctor' && (
        <g stroke={color} strokeWidth="1.4" fill="none" opacity="0.85">
          <path d="M 96 210 L 110 226 L 124 210" />
          <path d="M 100 214 C 96 242 92 254 84 260" />
          <circle cx="84" cy="264" r="5" />
        </g>
      )}

      {/* face */}
      <path d={facePath} fill={`url(#hg-${variant})`} stroke={color} strokeWidth="1.6" />
      {/* hair */}
      <path d="M 58 100 C 56 56 86 36 110 36 C 134 36 164 56 162 100" fill="none" stroke={color} strokeWidth="1.6" opacity="0.85" />
      {variant !== 'doctor' && <path d="M 64 92 C 70 70 90 58 110 58 C 130 58 150 70 156 92" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />}

      {/* features */}
      <g stroke={color} fill="none" strokeWidth="1.5" strokeLinecap="round">
        <path d="M 74 100 Q 88 95 100 100" />
        <path d="M 120 100 Q 132 95 146 100" />
        <path d="M 76 112 Q 88 105 100 112 Q 88 119 76 112 Z" />
        <path d="M 120 112 Q 132 105 144 112 Q 132 119 120 112 Z" />
        <path d="M 110 116 L 105 142 Q 110 147 117 142" />
        <path d="M 95 162 Q 110 157 125 162 Q 110 171 95 162 Z" />
      </g>
      <circle cx="88" cy="112" r="2.4" fill={color} />
      <circle cx="132" cy="112" r="2.4" fill={color} />
      {variant === 'doctor' && (
        <g stroke={color} strokeWidth="1.3" fill="none" opacity="0.85">
          <circle cx="88" cy="112" r="13" /><circle cx="132" cy="112" r="13" /><line x1="101" y1="112" x2="119" y2="112" />
        </g>
      )}

      {/* AI facial mesh */}
      <g stroke={color} strokeWidth="0.7" opacity="0.45" fill="none">
        <path d="M 110 52 L 60 108 L 110 140 L 160 108 Z" />
        <path d="M 60 108 L 96 162 L 110 140 M 160 108 L 124 162 L 110 140 M 96 162 L 110 194 L 124 162" />
        <path d="M 88 112 L 110 140 L 132 112" />
      </g>
      {dots.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="1.7" fill={color} />)}

      {/* scanlines + sweeping scan bar (clipped to face) */}
      <g clipPath={`url(#hc-${variant})`}>
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1="46" y1={46 + i * 8} x2="174" y2={46 + i * 8} stroke={color} strokeWidth="0.5" opacity="0.14" />
        ))}
        <rect x="46" y={scanY} width="128" height="10" fill={color} opacity="0.25" />
        <line x1="46" y1={scanY + 5} x2="174" y2={scanY + 5} stroke={color} strokeWidth="1.5" opacity="0.9" />
      </g>
    </svg>
  );
}

// ── Real photo portrait in a holographic HUD frame ─────────────────────────
function PortraitFrame({ src, color = C.cyan, w = 300, h = 386 }) {
  const t = useTime();
  const scanY = (t * 42) % (h + 24) - 12;
  return (
    <div style={{ position: 'relative', width: w, height: h, margin: '0 auto' }}>
      <div style={{ position: 'absolute', inset: -2, borderRadius: 18, boxShadow: `0 0 55px ${color}55` }} />
      <div style={{ position: 'absolute', inset: 0, borderRadius: 16, overflow: 'hidden', border: `1px solid ${color}66`, background: C.bg2 }}>
        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${color}12, transparent 28%, ${C.bg0}77 100%)` }} />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.22, backgroundImage: 'repeating-linear-gradient(0deg, rgba(34,211,238,0.09) 0px, rgba(34,211,238,0.09) 1px, transparent 1px, transparent 3px)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: scanY, height: 16, background: `linear-gradient(180deg, transparent, ${color}66, transparent)` }} />
      </div>
      {['tl', 'tr', 'bl', 'br'].map(p => {
        const isR = p[1] === 'r', isB = p[0] === 'b';
        return <div key={p} style={{
          position: 'absolute', width: 22, height: 22,
          [isR ? 'right' : 'left']: -1, [isB ? 'bottom' : 'top']: -1,
          borderTop: !isB ? `2px solid ${color}` : undefined,
          borderBottom: isB ? `2px solid ${color}` : undefined,
          borderLeft: !isR ? `2px solid ${color}` : undefined,
          borderRight: isR ? `2px solid ${color}` : undefined,
        }} />;
      })}
      <div style={{
        position: 'absolute', top: 9, left: 11, display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 8, letterSpacing: '0.22em', color,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: color, boxShadow: `0 0 8px ${color}`, opacity: 0.6 + Math.sin(t * 4) * 0.4 }} />SCAN
      </div>
    </div>
  );
}

// ── Scene — À visage humain : patient · médecin · dirigeant ─────────────────
function SceneHumans({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const faces = [
          { img: 'patient.png',   color: C.cyan,  name: 'Le patient',   role: 'Acteur de sa prévention', desc: 'Un score clair, un plan compris, un suivi qui le connaît.' },
          { img: 'medecin.png',   color: C.green,  name: 'Le médecin',   role: 'Pilote médical',          desc: 'Décide, valide, accompagne — à chaque étape.' },
          { img: 'dirigeant.png', color: C.gold,   name: 'Le dirigeant', role: 'Cadre pressé',            desc: 'Un cœur exposé, un suivi concierge sans friction.' },
        ];
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="cyan" />
            <SectionTag index="" label="À visage humain" color={C.cyan} />

            <div style={{
              position: 'absolute', left: 96, top: 170, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 58, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Derrière la technologie, <span style={{ fontStyle: 'italic', color: C.cyan }}>des humains.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Patients, médecins, experts — un suivi à visage humain.</span>
            </div>

            <div style={{ position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', justifyContent: 'center', gap: 96 }}>
              {faces.map((f, i) => {
                const fIn = clamp((t - 1.0 - i * 0.45) / 0.8, 0, 1);
                const wob = Math.sin(t * 1.1 + i) * 6;
                return (
                  <div key={i} style={{
                    width: 320, textAlign: 'center',
                    opacity: fIn, transform: `translateY(${(1 - fIn) * 50 + wob}px) scale(${0.85 + fIn * 0.15})`,
                  }}>
                    <PortraitFrame src={'assets/faces/' + f.img} color={f.color} />
                    <div style={{ fontFamily: 'Inter', fontSize: 26, fontWeight: 500, color: C.white, marginTop: 14, letterSpacing: '-0.01em' }}>{f.name}</div>
                    <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 11, color: f.color, letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 8 }}>{f.role}</div>
                    <div style={{ fontSize: 14, color: C.whiteDim, marginTop: 12, lineHeight: 1.5, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>{f.desc}</div>
                  </div>
                );
              })}
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 56,
              opacity: clamp((t - 3.4) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 22, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.line}`, paddingTop: 20,
            }}>
              La technologie au service de la <span style={{ color: C.cyan, fontWeight: 500 }}>relation médecin-patient</span> — jamais l'inverse.
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── Scene — Modèle économique : abonnement mensuel + actes au juste prix ────
function SceneBusinessModel({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime }) => {
        const t = localTime;
        const titleIn = clamp((t - 0.2) / 0.8, 0, 1);
        const tiers = [
          { name: 'Essentiel', price: '39', color: C.cyan,
            items: ['App & Score BSD', 'Suivi capteurs en continu', 'IA bien-être', 'Coordination médicale', 'Accès réseau partenaires'] },
          { name: 'Premium · Dirigeant', price: '149', color: C.gold, featured: true,
            items: ['Tout l\'Essentiel, et :', 'Médecin référent dédié', 'Créneaux prioritaires', 'Second avis international', 'Concierge sans friction'] },
        ];
        const actes = [
          { label: 'Téléconsultation généraliste', price: '25 €' },
          { label: 'Consultation spécialiste', sub: 'cardio · ophtalmo · gynéco…', price: '60 €' },
          { label: 'Bilan biologique', sub: 'socle / intermédiaire / complet', price: '59 / 99 / 159 €' },
          { label: 'Imagerie · paraclinique', sub: 'sur indication médicale', price: 'tarif réseau' },
        ];
        return (
          <div style={{ position: 'absolute', inset: 0, background: C.bg0 }}>
            <CosmicBackdrop hue="gold" />
            <SectionTag index="" label="Modèle économique" color={C.gold} />

            <div style={{
              position: 'absolute', left: 96, top: 162, right: 96,
              opacity: titleIn, transform: `translateY(${(1 - titleIn) * 20}px)`,
              fontFamily: 'Inter', fontSize: 56, fontWeight: 200,
              color: C.white, letterSpacing: '-0.03em', lineHeight: 1.05,
            }}>
              Un modèle <span style={{ fontStyle: 'italic', color: C.gold }}>simple et transparent.</span><br/>
              <span style={{ fontSize: 30, fontWeight: 300, color: C.whiteDim }}>Un abonnement mensuel pour le service — les actes au juste prix.</span>
            </div>

            {/* LEFT — abonnement mensuel */}
            <div style={{ position: 'absolute', left: 96, top: 380, width: 800 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 28, height: 1, background: C.gold }} />
                <span style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.28em', color: C.gold, textTransform: 'uppercase' }}>Abonnement mensuel · le service</span>
              </div>
              <div style={{ display: 'flex', gap: 24 }}>
                {tiers.map((tier, i) => {
                  const cIn = clamp((t - 1.0 - i * 0.3) / 0.7, 0, 1);
                  return (
                    <div key={i} style={{
                      width: 388, height: 420,
                      transform: `translateY(${(1 - cIn) * 40}px) scale(${0.92 + cIn * 0.08})`, opacity: cIn,
                    }}>
                      <GlassCard x={0} y={0} w={388} h={420} border={`${tier.color}${tier.featured ? 'aa' : '55'}`}>
                        <div style={{ padding: 30, height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.2em', color: tier.color, textTransform: 'uppercase' }}>{tier.name}</div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 14 }}>
                            <span style={{ fontFamily: 'Inter', fontSize: 72, fontWeight: 200, color: C.white, letterSpacing: '-0.04em' }}>{tier.price}</span>
                            <span style={{ fontSize: 20, color: C.whiteDim }}>€ / mois</span>
                          </div>
                          <div style={{ borderTop: `1px solid ${tier.color}33`, marginTop: 18, paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 11 }}>
                            {tier.items.map((it, j) => (
                              <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: j === 0 && tier.featured ? tier.color : C.whiteDim }}>
                                <span style={{ color: tier.color, fontSize: 13 }}>▸</span>{it}
                              </div>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT — à l'acte */}
            <div style={{ position: 'absolute', right: 96, top: 380, width: 760 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ width: 28, height: 1, background: C.cyan }} />
                <span style={{ fontFamily: 'Orbitron, JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.28em', color: C.cyan, textTransform: 'uppercase' }}>À l'acte · au juste prix</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {actes.map((a, i) => {
                  const aIn = clamp((t - 1.6 - i * 0.22) / 0.6, 0, 1);
                  return (
                    <div key={i} style={{
                      opacity: aIn, transform: `translateX(${(1 - aIn) * 30}px)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                      padding: '18px 24px', borderRadius: 12,
                      background: 'rgba(34,211,238,0.04)', border: `1px solid ${C.line}`,
                    }}>
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: 19, fontWeight: 500, color: C.white }}>{a.label}</div>
                        {a.sub && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: C.whiteDim, letterSpacing: '0.06em', marginTop: 4 }}>{a.sub}</div>}
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: 24, fontWeight: 300, color: C.cyan, whiteSpace: 'nowrap' }}>{a.price}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{
              position: 'absolute', left: 96, right: 96, bottom: 46,
              opacity: clamp((t - 3.6) / 0.7, 0, 1),
              fontFamily: 'Inter', fontSize: 19, fontWeight: 300, color: C.whiteDim, textAlign: 'center',
              borderTop: `1px solid ${C.gold}33`, paddingTop: 18,
            }}>
              Abonnement = <span style={{ color: C.gold, fontWeight: 500 }}>service, accès & suivi</span> · actes facturés à l'unité, <span style={{ color: C.cyan, fontWeight: 500 }}>tarifs réseau négociés, zéro liste d'attente.</span>
              <span style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(248,250,252,0.4)', letterSpacing: '0.12em', marginTop: 8 }}>Tarifs indicatifs · à valider</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { SceneStart, SceneServices, SceneConcierge, SceneSecondAvis, SceneHumans, SceneBusinessModel });
