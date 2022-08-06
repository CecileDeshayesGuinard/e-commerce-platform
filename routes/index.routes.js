const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const bcryptJs = require("bcryptjs");
const fileUploader = require('../config/cloudinary.config');


/*
██╗  ██╗ ██████╗ ███╗   ███╗███████╗    ██████╗  █████╗  ██████╗ ███████╗
██║  ██║██╔═══██╗████╗ ████║██╔════╝    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████║██║   ██║██╔████╔██║█████╗      ██████╔╝███████║██║  ███╗█████╗  
██╔══██║██║   ██║██║╚██╔╝██║██╔══╝      ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗    ██║     ██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                      
*/

/* GET HOME PAGE */

router.get("/", (req, res, next) => {
  res.render("index");
});


/*
███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗     ██████╗  █████╗  ██████╗ ███████╗
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝    ██████╔╝███████║██║  ███╗█████╗  
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝     ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║         ██║     ██║  ██║╚██████╔╝███████╗
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝         ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                                  
*/

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

// Error checking User

function validateUser(req) {
  const errors = []

  console.log('validateUser', req.body)

  if (!req.body.firstName) {
    errors.push({name: 'firstName', message: 'Prénom requis'})
  }
  if (!req.body.lastName) {
    errors.push({name: 'lastName', message: 'Nom requis'})
  }
  if (!req.body.email) {
    errors.push({name: 'email', message: 'email requis'})
  } else {
    if(!req.body.email.includes('@')) { // ici tu as le meme probleme si jamais req.body.email vaut undefined => .includes sur undefined genererERROR
      errors.push({name: 'email', message: 'email non valide'})
    }
  }
  if (!req.body.phoneNumber) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone requis'})
  } else {
    // ici tu es sure que req.body.phoneNumber existe!
    if (req.body.phoneNumber.length < 10) { // ici si jamais tu n'envoie pas de phoneNumber a ton serveur, alors req.body.phoneNumber vaudra undefined, et de tenter de faire .length dessus generera une erreur...
      errors.push({name: 'phoneNumber', message: 'n° de téléphone non valide'})
    }
  }

  console.log('errors=', errors)

  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/signup/validate/user', function (req, res, next) {
  const errors = validateUser(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // ici, on va retourner un code d'erreur 400
  } else {
    // ok, pas d'erreur: il faut qd meme donner une reponse au client
    res.json({})
  }
})

// Error checking Adress

function validateAddress(req) {
  const errors = []

  if (!req.body.countryName) {
    errors.push({name: 'countryName', message: 'Pays requis'})
  }
  if (!req.body.streetName) {
    errors.push({name: 'streetName', message: 'Nom de la voie requis'})
  }
  if (!req.body.zipCode) {
    errors.push({name: 'zipCode', message: 'Code postal requis'})
  }
  if (!req.body.cityName) {
    errors.push({name: 'cityName', message: 'Nom de la ville requis'})
  }
  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/signup/validate/address', function (req, res, next) {
  const errors = validateAddress(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // ici, on va retourner un code d'erreur 400
  } else {
    // ok, pas d'erreur: il faut qd meme donner une reponse au client
    res.json({})
  }
})

// Error checking Password

function validatePassword(req) {
  const errors = []

  if (!req.body.password) {
    errors.push({name: 'password', message: 'Mot de passe (requis)'})
  } else {
    if (!req.body.password.includes('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8'||'9'||'O')) {
      errors.push({name: 'password', message: 'utilisez au moins un chiffre !'})
    }
  }
  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/signup/validate/password', function (req, res, next) {
  const errors = validatePassword(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // ici, on va retourner un code d'erreur 400
  } else {
    // ok, pas d'erreur: il faut qd meme donner une reponse au client
    res.json({})
  }
})

router.post('/signup', (req, res, next) => {
  const companyName = req.body.companyName
  const vatNumber = req.body.vatNumber
  const regNumber = req.body.regNumber
  const nafCode = req.body.nafCode

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const phoneNumber = req.body.phoneNumber
  const dateOfBirth = req.body.dateOfBirth

  const countryName = req.body.countryName
  const streetName = req.body.streetName
  const streetNumber = req.body.streetNumber
  const zipCode = req.body.zipCode
  const cityName = req.body.cityName

  const password = req.body.password


  const errors = (validateUser(req) + validateAddress(req) + validatePassword(req))

  if (errors.length === 0) {
    User.findOne({email : email})
     .then((user) => {
      if (user) {
        res.render("signup", {
          message: `L'\email ${user.email} est deja pris`
        })
      } else {
        const cryptedPassword = bcryptJs.hashSync(req.body.password)
        const newUser = new User ({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirth,
          company: {
            companyName: companyName,
            vatNumber: vatNumber,
            regNumber: regNumber,
            nafCode: nafCode
          },
          billingAdress: {
            countryName: countryName,
            streetName: streetName,
            streetNumber: streetNumber,
            zipCode: zipCode,
            cityName: cityName
          },
          password: cryptedPassword,
        })
      
        newUser.save()
        .then( newUser => {
          console.log('user saved', newUser)
          res.redirect("/")
        })
        .catch(err => {
          console.log('user not saved', err)
        })
      }
    })
  }
})


/*
██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗      █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝     ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║        ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║        ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                                                                                                   
*/

/* GET product_admin page */
router.get("/product_admin", (req, res, next) => {
  res.render("product_admin");
});

// Error checking Product

function validateProduct(req) {
  const errors = []

  console.log('validateProduct', req.body)

  if (!req.body.productName) {
    errors.push({name: 'productName', message: 'Titre Produit requis'})
  }
  if (!req.body.exVat) {
    errors.push({name: 'exVat', message: 'Prix HT requis'})
  }
  if (!req.body.vat) {
    errors.push({name: 'vat', message: 'Taux de TVA requis'})
  }
  if (!req.body.packagingSize_length) {
    errors.push({name: 'packagingSize_length', message: 'Longueur requise'})
  }
  if (!req.body.packagingSize_width) {
    errors.push({name: 'packagingSize_width', message: 'Largeur requise'})
  }
  if (!req.body.packagingSize_height) {
    errors.push({name: 'packagingSize_height', message: 'Hauteur requise'})
  }
  if (!req.body.packagingSize_weight) {
    errors.push({name: 'packagingSize_weight', message: 'Poids requis'})
  }
  if (req.body.otherPhotos.length > 3) { 
    errors.push({name: 'otherPhotos', message: '3 photos secondaires maximum'})
  }


  console.log('errors=', errors)

  return errors
}

// Appeler cette route à la tentative d'enregistrement
router.post('/product_admin/validate/product', function (req, res, next) {
  const errors = validateProduct(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})


router.post('/product_admin', (req, res, next) => {
  const productName = req.body.productName
  const productDescription = req.body.productDescription
  const productCost = req.body.productCost
  const exVat = req.body.exVat
  const vat = req.body.vat
  const discount = req.body.discount
  const materials = req.body.materials
  const productLength = req.body.productSize_length
  const productWidth = req.body.productSize_width
  const productHeight = req.body.productSize_height
  const productThickness = req.body.productSize_productThickness
  const productSurface = req.body.productSize_surface
  const productWeight = req.body.productSize_weight
  const packagingLength = req.body.packagingSize_length
  const packagingWidth = req.body.packagingSize_width
  const packagingHeight = req.body.packagingSize_height
  const packagingWeight = req.body.packagingSize_weight
  const stock = req.body.stock
  const color = req.body.color
  const brand = req.body.brand
  const mainPhoto = req.body.mainPhoto
  const otherPhotos = req.body.otherPhotos
  const notice = req.body.notice
  const category = req.body.category


  const errors = (validateProduct(req));

  if (errors.length === 0) {
    Product.findOne({productName : productName})
     .then((product) => {
      if (product) {
        res.render("product_admin", {
          message: `Le produit ${product.productName} éxiste déjà`
        })
      } else {
        const newProduct = new Product ({
          productName: productName,
          productDescription: productDescription,
          productCost: productCost,
          productPrice: {
            exVat: exVat,
            vat: vat,
            discount: discount,
          },
          materials: [{materials}],
          productSize: {
            length: productLength,
            width: productWidth,
            height: productHeight,
            thickness: productThickness,
            surface: productSurface,
            weight: productWeight
          },
          packagingSize: {
            length: packagingLength,
            width: packagingWidth,
            height: packagingHeight,
            weight: packagingWeight
          },
          color: color,
          brand: brand,
          mainPhoto: mainPhoto,
          otherPhotos: otherPhotos,
          stock: stock,
          notice: notice,
          category: category
        })
      
        newProduct.save()
        .then( newProduct => {
          console.log('product saved', newProduct)
          res.redirect("product_admin")
        })
        .catch(err => {
          console.log('product not saved', err)
        })
      }
    })
  }
})


// Delete Produit

router.get('/product_admin/:id', (req, res, next) => {
  Product.findById(req.params.id)
  .then(function (productFromDB) {
    console.log("productFromDB=", productFromDB);
    res.render("product", { product: productFromDB, });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})

router.post('/product_admin/:id/delete',(req,res,next)=>{
  Product.findByIdAndRemove(req.params.id)
  .then(()=> {
    console.log('product deleted')
    res.redirect('/product_admin')
  })
  .catch(err=>{
    console.log('error deleting product',err)
    next(err)
  })
})

// Edit Produit

router.get('/product_admin/:id/edit',(req,res,next)=>{
  Product.findById(req.params.id)
  .then((productFromDB)=>{
      console.log(productFromDB)
      res.render('product/edit',{product: productFromDB})
  })
  .catch(err=>{
    console.log('error for product edition', err)
    next(err)
  })
})

router.post('/product_amin/:id/edit',(req,res,next)=>{

  const errors = (validateProduct(req));

  if (errors.length === 0) {
    Product.findByIdAndUpdate(req.params.id,{
      productName: productName,
      productDescription: productDescription,
      productCost: productCost,
      productPrice: {
        exVat: exVat,
        vat: vat,
        discount: discount,
      },
      materials: [{materials}],
      productSize: {
        length: productLength,
        width: productWidth,
        height: productHeight,
        thickness: productThickness,
        surface: productSurface,
        weight: productWeight
      },
      packagingSize: {
        length: packagingLength,
        width: packagingWidth,
        height: packagingHeight,
        weight: packagingWeight
      },
      color: color,
      brand: brand,
      mainPhoto: mainPhoto,
      otherPhotos: otherPhotos,
      stock: stock,
      notice: notice,
      category: category
    },
    {new:true})
    .then((productFromDB)=>{
      res.redirect(`/product/${productFromDB._id}`)
    })
    .catch((err)=>{
      console.log('error editing product',err)
      next(err)
    })
  } 
})  
  
  
/*
 ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗         █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝        ██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗        ███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║        ██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝                                                                                                                       
*/

/* GET categories_admin page */
router.get("/categories_admin", (req, res, next) => {
  res.render("categories_admin");
});

function validateCategory(req) {
  const errors = []

  console.log('validateCategory', req.body)

  if (!req.body.categoryName) {
    errors.push({name: 'categoryName', message: 'Nom de Catégorie requis'})
  }
  if (!req.body.categoryDescription) {
    errors.push({name: 'categoryDescription', message: 'C\'est quand même mieux de la présenter !'})
  } 

  console.log('errors=', errors)

  return errors
}

// Appeler cette route lors de l'enregistrement

router.post('/categories_admin/validate/category', function (req, res, next) {
  const errors = validateCategory(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})


router.post('/categories_admin', (req, res, next) => {
  const categoryName = req.body.categoryName
  const categoryDescription = req.body.categoryDescription

  const errors = (validateCategory(req));

  if (errors.length === 0) {
    Category.findOne({categortyName : categoryName})
     .then((category) => {
      if (category) {
        res.render('categories_admin', {
          message: `La catégorie ${category.categoryName} existe déjà`
        })
      } else {
        const newCategory = new Category ({ //////////////////////
          categoryName: categoryName,
          categoryDescription: categoryDescription,
        })
      
        newCategory.save()
        .then( newCategory => {
          console.log('category saved', newCategory)
          res.redirect('categories_admin')
        })
        .catch(err => {
          console.log('category not saved', err)
        })
      }
    })
  }
})


// Delete Categorie

router.get('/categories_admin/:id', (req, res, next) => {
  Category.findById(req.params.id)
  .then(function (categoryFromDB) {
    console.log("categoryFromDB=", categoryFromDB);
    res.render("category", { category: categoryFromDB, });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})

router.post('/categories_admin/:id/delete',(req,res,next)=>{
  Category.findByIdAndRemove(req.params.id)
  .then(()=> {
    console.log('category deleted')
    res.redirect('/categories_admin')
  })
  .catch(err=>{
    console.log('error deleting category',err)
    next(err)
  })
})

// Edit Category // Demander Verification à Antoine

router.get('/categories_admin/:id/edit',(req,res,next)=>{
  Category.findById(req.params.id)
  .then((categoryFromDB)=>{
      console.log(categoryFromDB)
      res.render('categories/edit',{category: categoryFromDB})
      productFromDB.forEach((prod)=>{
        if (categoryFromDB.productGroup.includes(prod._id)){
            prod.selected = true
        }
    });
    res.render('categories/edit',{
        category:categoryFromDB,
        product:productFromDB})
  })
  .catch(err=>{
    console.log('error for category edition', err)
    next(err)
  })
})

router.post('/categories_admin/:id/edit',(req,res,next)=>{
  Category.findByIdAndUpdate(req.params.id,{
    categoyName: categoryName,
    categoryDescription: categoryDescription
  },
  {new:true})
  .then((categoryFromDB)=>{
    res.redirect(`/categories/${categoryFromDB._id}`)
  })
  .catch((err)=>{
    console.log('error editing category',err)
    next(err)
  })
})


/* GET account page */
router.get("/account", (req, res, next) => {
  res.render("account");
});

/* GET login page */
router.get("/login", (req, res, next) => {
  res.render("login");
});

/* GET categories page */
router.get("/categories", (req, res, next) => {
  res.render("categories");
});

/* GET product page */
router.get("/product", (req, res, next) => {
  res.render("product");
});

/* GET cart page */
router.get("/cart", (req, res, next) => {
  res.render("cart");
});

/* GET orders page (for payments) */
router.get("/orders", (req, res, next) => {
  res.render("checkout");
});



module.exports = router;
