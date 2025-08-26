# Securebreaker

Application de tests de sécurité (interface de démonstration) construite avec React + TypeScript + Vite + Tailwind + shadcn/ui.

Avertissement: Outil à utiliser uniquement dans un cadre légal et autorisé, par des professionnels du pentest. Ne jamais l’employer sur des systèmes dont vous n’avez pas la permission explicite.

## Prérequis
- Node.js 18+
- npm 9+

## Installation
```
npm install
```

## Développement
```
npm run dev
```
Ouvrir l’URL affichée (par défaut http://localhost:5173/).

## Build de production
```
npm run build
npm run preview
```

## Fonctionnalités clés
- Dashboard global avec onglets: Configuration, Protocoles, Monitoring, Résultats
- AttackConfigPanel: cibles, dictionnaires, mutations, performance, gestion et test simulé de proxies
- ProtocolTabs: réglages HTTP/SSH/FTP/RDP/Database
- MonitoringPanel: logs et statistiques simulés, export JSON
- Page 404 dédiée et notifications Toaster shadcn/ui

## Variable d’environnement (facultatif)
- VITE_TEMPO=true: active l’intégration Tempo si le package et les routes sont disponibles. Non requis pour exécuter l’application.

## Scripts
- dev: lance le serveur Vite
- build: compile TypeScript puis build Vite
- preview: prévisualisation du build

## Licence & crédits
Application réalisée par MABIALA EULOGE JUNIOR. Réservé à des usages légaux et autorisés.
