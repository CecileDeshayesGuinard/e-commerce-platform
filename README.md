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
 
+ const cloudinary = require('cloudinary').v2;
+ const { CloudinaryStorage } = require('multer-storage-cloudinary');
+ const multer = require('multer');
 
+ cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
 
+ const storage = new CloudinaryStorage({
    // cloudinary: cloudinary,
    cloudinary,
    params: { // see: https://cloudinary.com/documentation/image_upload_api_reference#optional_parameters
      folder: 'e-commerce-platform', // bien donné le nom du dossier créé dans Cloudinary
      allowedFormats: ['jpg', 'png', 'jpeg'],
      // resource_type: 'raw', // on donne les formats de fichiers autorisés
      public_id: (req, file) => file.originalname // nous gardons avec originalname le nom du fichier d'origine (bonne pratique, nommmer l'image comme le titre)
    }
  });

const uploadCloud = multer({ storage });
 
module.exports = uploadCloud;




TO DO
-------

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



Erreurs réccurentes résolues :
-------

+ enctype="multipart/form-data" : avec la méthode de la form, ceci empeche la valeur de l'input, d'être chargée si aucun fichiers a charger sur un cloud
+ enctype="multipart/form-data" : obligatoire si chargement de ressources type fichier sur un cloud comme Cloudinary



Erreurs réccurentes non résolues :
-------

+ Problème pour le POST de multiple photos :
- ERROR POST /admin_product/new Error: Unexpected end of form
    at Multipart._final (/home/cilou/ironhack/projets/e-commerce-platform/node_modules/busboy/lib/types/multipart.js:588:17)
    at callFinal (node:internal/streams/writable:696:12)
    at prefinish (node:internal/streams/writable:708:7)
    at finishMaybe (node:internal/streams/writable:718:5)
    at Writable.end (node:internal/streams/writable:632:5)
    at onend (node:internal/streams/readable:705:10)
    at process.processTicksAndRejections (node:internal/process/task_queues:77:11) {
    storageErrors: []
    }
POST /admin_product/new 500 1703.639 ms - 2887

- fileUploader.array('otherPhotos', 3)   <= cause de l'erreur


+ Problème d'éxécution du script des pages "non concernées" qui oblige à la séparation du script sur plusieurs pages :
- erreur console quand un script front-end est appliqué alors qu'il est inutile sur la page utilisée


+ Problème de blocage page en cas de non respect du remplissage des champs dans signup


+ Problème d'enregistrment des matériaux dans la BDD dues au fait qu'il s'agisse d'une array
+ Problème d'affichage des champs préremplis pour l'édition des données





