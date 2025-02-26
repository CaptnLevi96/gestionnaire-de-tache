# Application de Gestion de Contacts

Une application web simple pour gérer une liste de contacts, permettant d'ajouter, modifier et supprimer des contacts.

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Tests](#tests)
- [Rapports](#rapports)
- [Améliorations possibles](#améliorations-possibles)

## Fonctionnalités

- **Affichage des contacts** : Voir tous les contacts sous forme de tableau
- **Ajout de contact** : Ajouter un nouveau contact avec nom, prénom, téléphone et email
- **Modification de contact** : Modifier les informations d'un contact existant
- **Suppression de contact** : Supprimer un contact de la liste
- **Validation des données** : Validation du format de téléphone canadien (XXX-XXX-XXXX) et des champs obligatoires

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript vanilla
- **Données** : Stockage en mémoire et fichier JSON
- **Tests** :
  - TDD (Test-Driven Development) avec Jest
  - BDD (Behavior-Driven Development) avec Cucumber
  - E2E (End-to-End) avec Playwright
- **CI/CD** : GitHub Actions pour l'automatisation des tests
- **Qualité** : Lighthouse pour les audits de performance et d'accessibilité

## Structure du projet

```
projet-gestion-contacts/
├── .github/
│   └── workflows/           # Workflows CI/CD pour GitHub Actions
├── src/
│   ├── app.js              # Logique principale de l'application
│   ├── contactService.js   # Service pour la gestion des contacts
│   ├── contacts.json       # Données des contacts
│   ├── index.html          # Structure HTML de l'application
│   └── styles.css          # Styles CSS de l'application
├── tests/
│   ├── TDD/                # Tests unitaires (Test-Driven Development)
│   │   └── TDD.test.js     # Tests Jest pour les fonctions individuelles
│   ├── BDD/                # Tests comportementaux (Behavior-Driven Development)
│   │   ├── steps/          # Définitions des étapes Cucumber
│   │   └── gestion-contacts.feature  # Scénarios BDD en langage Gherkin
│   └── E2E/                # Tests end-to-end (End-to-End)
│       └── contacts.spec.js # Tests Playwright pour l'interface utilisateur
├── cucumber.js            # Configuration de Cucumber
├── jest.config.js         # Configuration de Jest
├── playwright.config.js   # Configuration de Playwright
└── package.json           # Dépendances et scripts npm
```

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-username/projet-gestion-contacts.git
cd projet-gestion-contacts
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application localement :
```bash
npx http-server ./src -p 8080
```

4. Accéder à l'application dans votre navigateur à l'adresse : `http://localhost:8080`

## Tests

### Tests unitaires (TDD)
```bash
npm test
```

### Tests comportementaux (BDD)
```bash
npm run test:bdd
```

### Tests end-to-end (E2E)
```bash
npm run test:e2e
```

### Exécuter tous les tests
```bash
npm run test:all
```

## Rapports

- **Rapport de couverture Jest** : Disponible dans le dossier `coverage/` après l'exécution de `npm run test:coverage`
- **Rapport Cucumber** : Généré sous forme de fichier HTML après l'exécution des tests BDD
- **Rapport Playwright** : Disponible dans le dossier `playwright-report/` après l'exécution des tests E2E
- **Rapport Lighthouse** : Disponible dans le fichier `Rapport Lighthouse.html`

## Améliorations possibles

### Fonctionnalités
1. **Persistance des données** : Implementer une base de données (MySQL, MongoDB) ou utiliser localStorage pour sauvegarder les contacts
2. **Recherche et filtrage** : Ajouter une fonction de recherche et de tri des contacts
3. **Pagination** : Implémenter la pagination pour gérer un grand nombre de contacts
4. **Catégorisation** : Permettre de grouper les contacts par catégories ou tags
5. **Import/Export** : Ajouter des fonctionnalités d'import/export de contacts (CSV, vCard)
6. **Historique des modifications** : Garder une trace des modifications apportées aux contacts

### Interface utilisateur
1. **Design responsive** : Améliorer la compatibilité mobile
2. **Thème sombre/clair** : Ajouter un sélecteur de thème
3. **Vue détaillée** : Créer une page détaillée pour chaque contact
4. **Confirmation des actions** : Ajouter des dialogues de confirmation pour les actions importantes
5. **Notifications** : Afficher des notifications de succès/erreur après les actions
6. **Drag and drop** : Permettre la réorganisation des contacts par glisser-déposer

### Technique
1. **Framework frontend** : Migrer vers React, Vue.js ou Angular pour une meilleure maintenabilité
2. **API backend** : Développer une API RESTful avec Node.js ou autre technologie
3. **TypeScript** : Ajouter le typage statique pour une meilleure robustesse
4. **Optimisation des performances** : Améliorer les performances selon les recommandations Lighthouse
5. **Internationalisation** : Supporter plusieurs langues
6. **Authentication** : Ajouter un système d'authentification pour protéger les données

### Tests et CI/CD
1. **Tests paramétriques** : Ajouter des tests avec différents jeux de données
2. **Tests de charge** : Tester les performances avec un grand nombre de contacts
3. **Déploiement automatique** : Configurer le déploiement automatique vers GitHub Pages ou autre plateforme
4. **Analyse statique du code** : Intégrer ESLint et Prettier
5. **Monitoring** : Ajouter des outils de monitoring et d'analyse des erreurs
6. **Tests de sécurité** : Intégrer des tests de sécurité automatisés

### Accessibilité
1. **Navigation au clavier** : Améliorer la navigation au clavier
2. **Contraste et lisibilité** : Optimiser les contrastes de couleurs
3. **Support des lecteurs d'écran** : Tester et optimiser pour les lecteurs d'écran
4. **Focus visibles** : Améliorer les indications visuelles de focus
