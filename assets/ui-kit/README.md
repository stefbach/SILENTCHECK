# PREVIQ — Kit UI (maquettes application & interfaces)

Maquettes du produit **de A à Z** (patient · médecin · biologiste), pour le développement.
Style : blanc clinique, accent teal `#00B39A`, logo P + onde, 100 % français.

**Document de référence global :** [`PREVIQ-Kit-UI-complet.pdf`](./PREVIQ-Kit-UI-complet.pdf) — 28 écrans, 5 sections, chaque écran numéroté, légendé et étiqueté **Lifestyle** ou **Care**.

## Architecture — deux univers dans une seule application

Le produit sépare clairement **deux univers**, chacun sous son propre régime :

- **PREVIQ Lifestyle** — indice bien-être & mode de vie (Score BS, exposome, capteurs, tendances,
  objectifs, conseils lifestyle). **Sans finalité médicale** : ne diagnostique pas, ne prédit pas,
  ne remplace pas un avis médical.
- **PREVIQ Care** — téléconsultation réglementée (médecins, HDS, RGPD, référentiel ANS).
  **L'acte médical** — diagnostic, prescription, orientation, suivi — relève **du médecin**.

**Frontière à coder (produit & backend, pas seulement l'UI) :**

| Règle | Réponse |
|---|---|
| Score BS → conseils lifestyle | **OUI** |
| Score BS → décision médicale | **NON** |
| Médecin + données PREVIQ → décision médicale | **OUI** |

> Le disclaimer ne protège que si le produit se comporte réellement ainsi : la **finalité réelle**
> du logiciel est déterminante (MDCG 2019-11 rev.1, juin 2025). Le Score BS peut rester
> scientifiquement sophistiqué tant qu'aucune **décision médicale** n'est déclenchée par son seul résultat.

## A. Accès & onboarding — `app/` · *Lifestyle*
1. `01-splash` — accueil, plateforme lifestyle & bien-être
2. `02-compte` — création de compte / connexion
3. `03-kyc` — vérification d'identité (pièce + selfie)
4. `04-consentement` — consentement RGPD
5. `05-hub-lifestyle-care` — **hub : deux univers Lifestyle / Care** (écran de séparation)

## B. PREVIQ Lifestyle · profil & indice — `app/` · *Lifestyle*
6. `06-questionnaire` — profil lifestyle & bien-être (activité, sommeil, nutrition, stress, environnement, habitudes)
7. `07-capteurs` — connexion des capteurs (enrichit le profil lifestyle)
8. `08-exposome` — facteurs environnementaux du profil lifestyle
9. `09-calcul-indice` — calcul de l'indice (Score BS)
10. `10-indice-resultat` — résultat : indice lifestyle (**Bon / À améliorer / Optimiser**, pas de « risque »)
11. `11-dimensions` — les dimensions du profil (pas « facteurs de risque »)
12. `12-trajectoire` — trajectoire lifestyle : évolution de l'indice (pas d'« espérance de vie » / « +4,1 ans »)
13. `13-dashboard` — tableau de bord : tendances, objectifs, rappels lifestyle
14. `14-plan-lifestyle` — plan lifestyle (activité, nutrition, sommeil, stress, habitudes ; aucun traitement)

## C. PREVIQ Care · téléconsultation (acte médical) — `app/` · *Care*
15. `15-acces-teleconsultation` — accès téléconsultation (médecin / biologiste)
16. `16-consultation-medecin` — consultation vidéo médecin
17. `17-consultation-biologiste` — consultation vidéo biologiste
18. `18-bilan-care` — bilan sanguin **prescrit par le médecin** (pas « déterminé par le Score BS »)
19. `19-biomarqueurs` — biomarqueurs : valeur, unité, tendance, intervalle transmis par le labo (aucun diagnostic algorithmique)
20. `20-resultats-labo` — résultats de laboratoire
21. `21-plan-medical-care` — plan médical **prescrit & signé par le médecin** à la suite de la consultation
22. `22-second-avis` — second avis (médecin spécialiste)
23. `23-documents` — documents & abonnement

## D. Interfaces Pro · Care — `pro/` · *Care Pro*
24. `24-medecin-prescription` — **le médecin choisit** le bilan (SOCLE / INTER / COMPLET ou examens à la carte) ; le Score BS n'est qu'un indice lifestyle indicatif
25. `25-medecin-patient` — dossier patient : la **décision médicale** appartient au médecin (Score BS affiché uniquement à titre contextuel)
26. `26-interface-labo` — résultats auto des automates, validation & verrouillage (zéro saisie)
27. `27-flux-validation` — flux de validation (reçu · contrôlé · validé · verrouillé)

## E. Document — `documents/` · *Care*
28. `28-compte-rendu-verrouille` — compte-rendu signé & verrouillé, produit et validé par le professionnel (non modifiable)

---
Maquettes générées comme références visuelles (non contractuelles).
