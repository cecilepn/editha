# Editha

Editha est un site e-commerce de vente de livres à la couverture personnalisable dans le cadre d'un projet étudiant en M1 dev à l'ECV.

# Langages

HTML, CSS, JS

# Collaborateurs

Cécile PHAN NGUYEN : https://github.com/cecilepn / DEV
Andy RABARISON : https://github.com/Rabarison-Andy / DEV

# Fonctionnalités

# Update J2 :

- Structure du projet : styles, components, utils ... (Cécile)
- Intégration mobile et desktop de la page configurateur avec les données en dur (Cécile)
- Intégration mobile et desktop de la homepage avec les données en dur (Andy)

# Update J4 :

- Intégration mobile et desktop de la page panier (Cécile)
- Finalisation de la homepage en mobile avec logique de menu et popin (Andy)
- Intégration des logiques suivantes :
  - récupération des données du products json et l'injection de ces données dans les pages (Cécile)
  - calcul dynamique de prix (Cécile)
  - placement et personnalisation textuelle sur le produit en temps réel (Andy)
  - ajout et affichage des produits dans la page panier encore en cours de développement (Cécile)
  - sauvegarde des données temporaires en cours de développement (Andy)

# A propos de la structure

Nous avons structuré le projet de la façon suivante : - Images qui comprend des sous-dossiers (svg, png) - js qui comprend deux dossiers "components" et "utils" :
-> components : pour les éléments répétables comme header, footer, addtocartbutton ou productCard
-> utils : pour les futurs fonctionnalités - json qui contient tableau de données qui correspond à nos produits - dossier pages qui contient toutes les pages annexes de la homepage - dossier styles qui comprends trois dossiers :
-> components et pages pour les éléments concernés
-> core pour le global - global.css qui contient les imports généraux du style - index.html qui correspond à la homepage - script.js qui contient les imports de script de certains composants
