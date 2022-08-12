E-Commerce (module 2)
-------

Pour commencer il est possible de créer son dossier avec "ironlauncher"

Installation (1 fois dans "/") :
+ npm install -g ironlauncher

Créer votre projet avec le package :
+ $ ironlauncher "nom du projet"

 
Ironlauncher contient :
-------

+ JSON & NODE_MODULES : npm install
+ MONGOOSE : npm install mongoose
+ EXPRESS : npm install express
+ NODEMON : npm i -D nodemon


Prérequis: installation de packages via le Terminal (si non intégrés dans l'ironlauncher)

+ BCRYPT : npm install bcryptjs
+ CONNECT-MONGO : npm install connect-mongo
+ CHART.JS : npm i chart.js
+ AXIOS: npm install axios
+ CLOUDINARY / MULTER: npm install cloudinary multer multer-storage-cloudinary


Dépôt git:
-------

Créer un dépôt github

+ $ git init
+ $ git add .
+ $ git commit -m "first-commit"
+ $ git remote add origin lien du dépot créé dans github
+ $ git push origin master


Fichier app.js : copier (bcrypt: sécurité password // fileUploader: cloudinary)
-------

- const bcrypt = require('bcryptjs');
- const fileUploader = require('../config/cloudinary.config');


Exemple des routes issues des routes des pages hbs (exemple ci-dessous) :
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


Fichier layout.hbs : copier
-------

- <script src="/js/script.js"></script>
- <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.27.2/axios.min.js"></script>


Fichier .env :
-------

+ PORT=3000
+ CLOUDINARY_URL=...
+ CLOUDINARY_NAME=...
+ CLOUDINARY_KEY=...
+ CLOUDINARY_SECRET=...


Fichier cloudinary.config.js (le créer dans le dossier config)
-------







TO DO
-------

+ Push Photos + notice => Cloudinary
+ Recupération automatique des urls et push au moment du click dans MongoDB

=> onclick => push Photo
<= Récupération url
=> push data (urls incluse dans MongoDB)


+ Push données produit si titre existant (système de recherche DataBas edans l'input "titre Produit")
Dans page product_admin

=> put Nom produit
<= Si existe alors affichage de toute les données depuis la DataBase

Suppose un Edit ou Delete, le Create sera refusé car "Nom déjà pris"

+ Push données dans page produit + productList de HomePage et CategoriesPage

+ Mode connecté avec authentification (Axios)

TO DO LOT 2
-------

+ Checkout_Page
+ KPI_Page (données issues de la DataBase)
+ Order_Admin_Page
+ API paiement
+ API Google Analytics



Conditions CSS
-------

+ Carrousel : image en 1024px ou inférieur avec hauteur deux fois moindre (height = width / 2)







