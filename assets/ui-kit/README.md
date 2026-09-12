# PREVIQ — Kit UI (maquettes application & interfaces)

Maquettes du produit **de A à Z** (patient · médecin · biologiste), pour le développement.
Style : blanc clinique, accent teal `#00B39A`, logo P + onde ECG, 100 % français.

**Document de référence global :** [`PREVIQ-Kit-UI-complet.pdf`](./PREVIQ-Kit-UI-complet.pdf) — 27 écrans, 7 sections, chaque écran numéroté et légendé.

> Philosophie produit : la **prescription découle du niveau de risque (Score BS)** et est **générée automatiquement** — **zéro saisie**. Le professionnel **valide et verrouille** uniquement.

## Application patient — `app/`

### Accès & onboarding
1. `01-splash` — accueil / point d'entrée
2. `02-compte` — création de compte / connexion
3. `03-kyc` — vérification d'identité (pièce + selfie)
4. `04-consentement` — consentement RGPD

### Évaluation
5. `05-questionnaire` — auto-questionnaire santé
6. `06-capteurs` — connexion des capteurs
7. `07-exposome` — environnement / exposome
8. `08-prelevement` — prélèvement sanguin à domicile
9. `09-calcul-score` — calcul du Score BS

### Résultat & prescription
10. `10-resultat-score` — résultat Score BS
11. `11-biomarqueurs` — biomarqueurs
12. `12-facteurs-risque` — facteurs de risque (4 dimensions)
13. `13-longevite` — espérance de vie / longévité
14. `14-resultats-labo` — résultats de laboratoire
15. `15-prescription-patient` — prescription générée selon le risque

### Consultation
16. `16-acces-teleconsultation` — accès téléconsultation (médecin / biologiste)
17. `17-consultation-medecin` — consultation vidéo médecin
18. `18-consultation-biologiste` — consultation vidéo biologiste

### Suivi & pilotage
19. `19-plan-prevention` — plan de prévention
20. `20-second-avis` — second avis (médecin spécialiste)
21. `21-dashboard` — tableau de bord / pilotage
22. `22-documents` — documents & abonnement

## Interfaces Pro — `pro/`
23. `23-moteur-prescription` — moteur de prescription automatique par niveau de risque
24. `24-interface-medecin` — interface médecin (validation & verrouillage)
25. `25-interface-labo` — interface labo (résultats auto des automates, validation & verrouillage)
26. `26-flux-validation` — flux de validation (reçu → contrôlé → validé → verrouillé)

## Document — `documents/`
27. `27-compte-rendu-verrouille` — compte-rendu signé & verrouillé (non modifiable)

---
Maquettes générées comme références visuelles (non contractuelles).
