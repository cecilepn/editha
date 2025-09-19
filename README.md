# 📚 Editha

**Editha** est un site e-commerce de vente de livres à couverture personnalisable.  
Ce projet a été réalisé dans le cadre d’un projet étudiant en **M1 Développement à l’ECV**.

---

## Langages & technologies

- **HTML**
- **CSS**
- **JavaScript**

---

## Collaborateurs

- [Cécile PHAN NGUYEN](https://github.com/cecilepn) — Développement
- [Andy RABARISON](https://github.com/Rabarison-Andy) — Développement

---

## Fonctionnalités

- Configuration en temps réel de la couverture (placement et personnalisation textuelle).
- Récupération des données produits via un fichier JSON et injection dynamique dans les pages.
- Calcul dynamique du prix en fonction des choix de personnalisation.
- Gestion d’un panier (ajout, affichage des produits, sauvegarde temporaire des données).
- Pages responsives (mobile & desktop) : homepage, configurateur, panier.

---

## Avancement du projet

### **Update J2**

- Création de la structure du projet : `styles`, `components`, `utils`... (Cécile)
- Intégration mobile et desktop de la **page configurateur** avec données statiques (Cécile).
- Intégration mobile et desktop de la **homepage** avec données statiques (Andy).

### **Update J4**

- Intégration mobile et desktop de la **page panier** (Cécile).
- Finalisation de la homepage en mobile avec logique de menu et popin (Andy).
- Développement des logiques principales :
  - Récupération des données produits (Cécile).
  - Calcul dynamique des prix (Cécile).
  - Placement et personnalisation en temps réel sur le produit (Andy).
  - Ajout et affichage des produits dans le panier (en cours, Cécile).
  - Sauvegarde temporaire des données (en cours, Andy).

### **Update J5**

- Refactorisation du fichier `productConfigurator` (Cécile).
- Mise à jour du calcul des prix en fonction des données temporaires (Andy).
- Ajustements structure & styles de la homepage (Cécile).
- Finalisation de l’ajout au panier.

---

## Structure du projet

- **images/** → ressources visuelles (avec sous-dossiers `svg`, `png`).
- **js/**
  - **components/** : éléments réutilisables (header, footer, `addToCartButton`, `productCard`...).
  - **utils/** : fonctions utilitaires (ex : `fetchData`).
- **json/** → données produits.
- **pages/** → pages annexes à la homepage.
- **styles/**
  - **core/** → styles globaux.
  - **components/** et **pages/** → styles spécifiques.
  - **global.css** → import des styles principaux.
- **index.html** → homepage.
- **script.js** → imports de scripts.

---

## Difficultés rencontrées

- Organisation de la structure du projet, qui a pris plus de temps que prévu.
- Difficultés liées à l’utilisation de **Git** : résolution de conflits compliquée, surtout pour l’un de nous qui n’était pas encore à l’aise avec les commandes.
- Perte du **Jour 3**, ce qui a pénalisé l’avancée (ex : partage sur réseaux sociaux non finalisé, slider images).
- Frustrations sur l’UI : design simple et manque d’uniformisation.
