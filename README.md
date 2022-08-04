E-Commerce (module 2)
--------

Pour commencer il est possible de créer son dossier avec "ironlauncher"

Installation (1 fois dans "/") :
  npm install -g ironlauncher

Créer votre projet avec le package :
  $ ironlauncher "nom du projet"
 -------
 
Ironlauncher contient :

  JSON & NODE_MODULES : npm install
  MONGOOSE : npm install mongoose
  EXPRESS : npm install express
  NODEMON : npm i -D nodemon


Prérequis: installation de packages via le Terminal (si non intégrés dans l'ironlauncher)

  BCRYPT : npm install bcryptjs
  CONNECT-MONGO : npm install connect-mongo
  CHART.JS : npm i chart.js
  AXIOS: npm install axios
-------

Dépôt git:

Créer un dépôt github

  $ git init
  $ git add .
  $ git commit -m "first-commit"
  $ git remote add origin lien du dépot créé dans github
  $ git push origin master
-------

Fichier app.js : copier

- const bcrypt = require('bcryptjs');

routes des pages hbs (exemple ci-dessous)
+ const index = require("./routes/index.routes");
+ app.use("/", index);

+ const signup = require("./routes/index.routes");
+ app.use("/signup", signup);

+ const account = require("./routes/index.routes");
+ app.use("/account", account);

+ const categories = require("./routes/index.routes");
+ app.use("/categories", categories);

+ const product = require("./routes/index.routes");
+ app.use("/product", product);

+ const cart = require("./routes/index.routes");
+ app.use("/cart", cart);

+ const checkout = require("./routes/index.routes");
+ app.use("/checkout", checkout);

gestion des partial pas automatique danq Ironlauncher (recopier code ci-dessous)
// Partials : code a rajouter pour utiliser cette fonction hbs.
+ hbs.registerPartials("partials_absolute_path");
+ app.set('view engine', 'hbs');
+ hbs.registerPartials(__dirname + "/views/partials");
-------

Fichier layout.hbs : copier

- <script src="/js/script.js"></script>
- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js"></script>
-------





But : réaliser le back-end / office d'un site e-commerce

--------

Sujet :

les sites marchands reposent sur une structure "base" qui permet la présentation produit, la gestion panier, la gestion de stock et la transaction sécurisé
Le site e-commerce est un projet standard pour un fullstack que la réalisation soit sur-mesure ou adossée à un CMS Opensource

L'administrateur n'est pas forcément un développeur, il dois pouvoir utiliser le site grace à des pages dédiées 

--------

Type Utilisateurs :

- User
- Administrator

--------

PARTIE : USER (front)

Phase 1 = homepage avec liste forme tableau 4*4 colonnes/lignes de produits + filtre produit
Phase 2 = redirection vers le cart dès qu'un produit est selectionné + addition de ce produit
Phase 3 = checkout (récap commande avant transaction)
Phase 4 = simulation de transaction

--------

PARTIE : ADMIN (backend office)

=> Phase 1 : création d'une page produit à l'usage de l'administrateur
=> Phase 2/3 : création d'une page admin gestion des commandes clients
=> Phase 4 : modification / édition facture (suppose la capacité de générer un fichier PDF)

Phase 5 : KPI (voir cours "financial datas graphic)

--------

PARTIE : BACKEND

Phase 1 => création produits dans la BDD et upload contenu (photos / notices / etc...)
Phase 2 => création du cart
Phase 3/4 => création du contenu et possibilité de download de la facture

Phase 5 : enregistrement des commandes dans la BDD

--------
           
HOME PAGE :

- NavBar
- Div Produits
- Footer

--------

PAGE ADMIN :

- Photos Uploaded
- Liste Commandes Clients
- KPI

--------







