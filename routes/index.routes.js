const router = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Order = require("../models/Order.model");
const bcryptJs = require("bcryptjs");
const fileUploader = require('../config/cloudinary.config');
// const { listenerCount } = require("../app");


/*
██╗  ██╗ ██████╗ ███╗   ███╗███████╗    ██████╗  █████╗  ██████╗ ███████╗
██║  ██║██╔═══██╗████╗ ████║██╔════╝    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████║██║   ██║██╔████╔██║█████╗      ██████╔╝███████║██║  ███╗█████╗  
██╔══██║██║   ██║██║╚██╔╝██║██╔══╝      ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
██║  ██║╚██████╔╝██║ ╚═╝ ██║███████╗    ██║     ██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                      
*/

/*
╔═╗╔═╗╔╦╗  ╦ ╦╔═╗╔╦╗╔═╗╔═╗╔═╗╔═╗╔═╗
║ ╦║╣  ║   ╠═╣║ ║║║║║╣ ╠═╝╠═╣║ ╦║╣ 
╚═╝╚═╝ ╩   ╩ ╩╚═╝╩ ╩╚═╝╩  ╩ ╩╚═╝╚═╝
*/

router.get('/', (req, res, next) => {
  Product.find()
    .then(function (productsFromDB) {
        console.log('productsFromDB:', productsFromDB);
        res.render('index', { products: productsFromDB });
    })
    .catch(err => {
        console.log(err);
        next(err);
    })
});

/*
███████╗██╗ ██████╗ ███╗   ██╗██╗   ██╗██████╗     ██████╗  █████╗  ██████╗ ███████╗
██╔════╝██║██╔════╝ ████╗  ██║██║   ██║██╔══██╗    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████╗██║██║  ███╗██╔██╗ ██║██║   ██║██████╔╝    ██████╔╝███████║██║  ███╗█████╗  
╚════██║██║██║   ██║██║╚██╗██║██║   ██║██╔═══╝     ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
███████║██║╚██████╔╝██║ ╚████║╚██████╔╝██║         ██║     ██║  ██║╚██████╔╝███████╗
╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚═╝         ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                                  
*/

/*
╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔═╗╔═╗╔═╗╔═╗
║ ╦║╣  ║   ╚═╗║║ ╦║║║║ ║╠═╝  ╠═╝╠═╣║ ╦║╣ 
╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩    ╩  ╩ ╩╚═╝╚═╝
*/
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔═╗╔═╗╔═╗╔═╗
╠═╝║ ║╚═╗ ║   ╚═╗║║ ╦║║║║ ║╠═╝  ╠═╝╠═╣║ ╦║╣ 
╩  ╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩    ╩  ╩ ╩╚═╝╚═╝
*/

/*
USER VALIDATION
*/

function validateUser(req) { // utiliser cette fonction pour tous les paramètres "required" dans le modèle
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
    if(!req.body.email.includes('@')) { // la méthode includes dois etre testée comme dépendance pour éviter une erreur si l'email n'est pas remplis
      errors.push({name: 'email', message: 'email non valide'})
    }
  }
  if (!req.body.phoneNumber) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone requis'})
  } else {
    if (req.body.phoneNumber.length < 10) { // mettre en dépendance pour éviter le undefined su le numéro nde téléphone n'est pas remplis
      errors.push({name: 'phoneNumber', message: 'n° de téléphone non valide'})
    }
  }
  console.log('errors=', errors)

  return errors
}

router.post('/signup/validate/user', function (req, res, next) { // nous testons les infos avec la route ../validate/user
  const errors = validateUser(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // ici, on va retourner un code d'erreur 400
  } else {
    res.json({}) // si aucune erreur, renvoyer le json comme réponse
  }
})

/*
ADDRESS VALIDATION
*/

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

router.post('/signup/validate/address', function (req, res, next) {
  const errors = validateAddress(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // code erreur 400
  } else {
    res.json({}) // aucune erreur détecté mais envois d'une réponse avec le json
  }
})

/*
PASSWORD VALIDATION
*/

function validatePassword(req) {
  const errors = []
  const passwordContent = req.body.password.split (''); // passwordContent est une array de caractères
  const mandatoryNumberList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; // mandatoryNumber est une array de chiffres
  
  if (!req.body.password) {
    errors.push({name: 'firstName', message: 'mot de passe requis'})
  } else {
// utilisation de la méthode forEach pour comparer chaque élement d'un tableau avec tous les éléments de l'autre tableau
    function MatchElem(passwordContent, mandatoryNumberList) {
      passwordContent.forEach(function(element){
        if(!mandatoryNumberList.includes(element)){
        errors.push({name: 'password', message: 'utilisez au moins un chiffre !'})
        } else {
        console.log('password validate')
        }
      })
    }
  }

  return errors
}

router.post('/signup/validate/password', function (req, res, next) {
  const errors = validatePassword(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})

router.post('/signup', (req, res, next) => { // création de variable pour contenir les éléments récupérés grace à "name=" dans le fichier .hbs
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

  // nous additionnons les erreurs obtenues dans chaque étape de validation s'il y en a...
  const errors = (validateUser(req) + validateAddress(req) + validatePassword(req))

  if (errors.length === 0) { // si pas d'erreur alors vérification de l'unicité de l'email pour éviter les doublons (méthode: findOne)
    User.findOne({email : email})
     .then((user) => {
      if (user) {
        res.render('signup', {
          message: `L'\email ${user.email} est deja pris`
        })
      } else {
        const cryptedPassword = bcryptJs.hashSync(req.body.password) // création d'une variable contenant le mot de passe crypté
        const newUser = new User ({ // si email disponible alors création du User en suivant le modèle
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
      
        newUser.save() // utilisation de la méthode .save
        .then( newUser => {
          console.log('user saved', newUser)
          res.redirect("/") // redirection vers la Homepage
        })
        .catch(err => {
          console.log('user not saved', err)
        })
      }
    })
  }
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║ ╦║╣  ║   ╚═╗║║ ╦║║║║ ║╠═╝   ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/

router.get('/:id/account_delete', (req, res, next) => {
  User.findById(req.params.id)
  .then(function (userFromDB) {
    console.log('userFromDB=', userFromDB);
    res.render('account_delete', { user: userFromDB, });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
╠═╝║ ║╚═╗ ║   ╚═╗║║ ╦║║║║ ║╠═╝   ║║║╣ ║  ║╣  ║ ║╣ 
╩  ╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/

router.post('/:id/account_delete',(req,res,next)=>{
  User.findByIdAndRemove(req.params.id)
  .then(()=> {
    console.log('user deleted')
    res.redirect('/signup')
  })
  .catch(err=>{
    console.log('error deleting user',err)
    next(err)
  })
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔═╗╔╦╗╦╔╦╗
║ ╦║╣  ║   ╚═╗║║ ╦║║║║ ║╠═╝  ║╣  ║║║ ║ 
╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩────╚═╝═╩╝╩ ╩ 
*/

router.get('/:id/account_edit',(req,res,next)=>{
  User.findById(req.params.id)
  .then((userFromDB)=>{
      console.log(userFromDB)
      res.render('account_edit',{user: userFromDB})
  })
  .catch(err=>{
    console.log('error for user edition', err)
    next(err)
  })
})

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╦╔═╗╔╗╔╦ ╦╔═╗  ╔═╗╔╦╗╦╔╦╗
╠═╝║ ║╚═╗ ║   ╚═╗║║ ╦║║║║ ║╠═╝  ║╣  ║║║ ║ 
╩  ╚═╝╚═╝ ╩   ╚═╝╩╚═╝╝╚╝╚═╝╩────╚═╝═╩╝╩ ╩ 
*/

router.post('/:id/account_edit/validate/user', function (req, res, next) { // nous testons les infos avec la route ../validate/user
  const errors = validateUser(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // ici, on va retourner un code d'erreur 400
  } else {
    res.json({}) // si aucune erreur, renvoyer le json comme réponse
  }
})

router.post('/:id/account_edit/validate/address', function (req, res, next) {
  const errors = validateAddress(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors) // code erreur 400
  } else {
    res.json({}) // aucune erreur détecté mais envois d'une réponse avec le json
  }
})

router.post('/:id/account_edit/validate/password', function (req, res, next) {
  const errors = validatePassword(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})

router.post('/:id/account_edit', (req, res, next) => { // création de variable pour contenir les éléments récupérés grace à "name=" dans le fichier .hbs
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

  // nous additionnons les erreurs obtenues dans chaque étape de validation s'il y en a...
  const errors = (validateUser(req) + validateAddress(req) + validatePassword(req))

  if (errors.length === 0) { // si pas d'erreur alors vérification de l'unicité de l'email pour éviter les doublons (méthode: findOne)
    User.findByIdAndUpdate(req.params.id, {
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
    },
    {new:true})
    .then((userUpdated)=>{
      res.redirect(`/account/${userUpdated._id}`)
    })
    .catch((err)=>{
      console.log('error editing product',err)
      next(err)
    }) 
  }
})

/*
██╗      ██████╗  ██████╗ ██╗███╗   ██╗    ██████╗  █████╗  ██████╗ ███████╗
██║     ██╔═══██╗██╔════╝ ██║████╗  ██║    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
██║     ██║   ██║██║  ███╗██║██╔██╗ ██║    ██████╔╝███████║██║  ███╗█████╗  
██║     ██║   ██║██║   ██║██║██║╚██╗██║    ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║    ██║     ██║  ██║╚██████╔╝███████╗
╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                    
*/

/*
╔═╗╔═╗╔╦╗  ╦  ╔═╗╔═╗╦╔╗╔  ╔═╗╔═╗╔═╗╔═╗
║ ╦║╣  ║   ║  ║ ║║ ╦║║║║  ╠═╝╠═╣║ ╦║╣ 
╚═╝╚═╝ ╩   ╩═╝╚═╝╚═╝╩╝╚╝  ╩  ╩ ╩╚═╝╚═╝
*/

router.get('/login', (req, res, next) => {
  res.render('login');
});

/*
╔═╗╔═╗╔═╗╔╦╗  ╦  ╔═╗╔═╗╦╔╗╔  ╔═╗╔═╗╔═╗╔═╗
╠═╝║ ║╚═╗ ║   ║  ║ ║║ ╦║║║║  ╠═╝╠═╣║ ╦║╣ 
╩  ╚═╝╚═╝ ╩   ╩═╝╚═╝╚═╝╩╝╚╝  ╩  ╩ ╩╚═╝╚═╝
*/

router.post('/login', (req, res, next) => {
  console.log('SESSION =====> ', req.session);
  const {email, password} = req.body;
 
  if (email === '' || password === '') {
    res.render('login', {
      errorMessage: 'identifiant et/ou mot de passe manquants !'
    });
    return;
  } else {
  User.findOne({email: req.body.email})
    .then(userFromDB => {
      if (!userFromDB) {
        res.render('login', {errorMessage: 'Cet email n\'existe pas, veuillez le rentrer à nouveau ou créer un compte !'});
      } else if (bcryptJs.compareSync(req.body.password, userFromDB.password)) {
        console.log('req.session = ',req.session)
        req.session.currentUser = userFromDB;
        res.redirect('/account')
      } else {
        res.render('login', {errorMessage: 'mot de passe incorrect !'});
      }
    })
    .catch(error => next(error));
  }
});

/*
 █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗    ██████╗  █████╗  ██████╗ ███████╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝    ██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║       ██████╔╝███████║██║  ███╗█████╗  
██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║       ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║       ██║     ██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝       ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝                                                                                            
*/

/*
╔═╗╔═╗╔╦╗  ╔═╗╔═╗╔═╗╔═╗╦ ╦╔╗╔╔╦╗  ╔═╗╔═╗╔═╗╔═╗
║ ╦║╣  ║   ╠═╣║  ║  ║ ║║ ║║║║ ║   ╠═╝╠═╣║ ╦║╣ 
╚═╝╚═╝ ╩   ╩ ╩╚═╝╚═╝╚═╝╚═╝╝╚╝ ╩   ╩  ╩ ╩╚═╝╚═╝
*/

router.get('/account', (req, res, next) => {
  res.render('account', {userInSession: req.session.currentUser});
});

/*
╔═╗╔═╗╔═╗╔╦╗  ╦  ╔═╗╔═╗╔═╗╦ ╦╔╦╗
╠═╝║ ║╚═╗ ║   ║  ║ ║║ ╦║ ║║ ║ ║ 
╩  ╚═╝╚═╝ ╩   ╩═╝╚═╝╚═╝╚═╝╚═╝ ╩ 
*/

router.post('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
});

/*
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗        ██████╗ ██████╗  ██████╗ ██████╗ ██╗   ██╗ ██████╗████████╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║        ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗██║   ██║██╔════╝╚══██╔══╝
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║        ██████╔╝██████╔╝██║   ██║██║  ██║██║   ██║██║        ██║   
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║        ██╔═══╝ ██╔══██╗██║   ██║██║  ██║██║   ██║██║        ██║   
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║███████╗██║     ██║  ██║╚██████╔╝██████╔╝╚██████╔╝╚██████╗   ██║   
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝  ╚═════╝   ╚═╝                                                                                            
*/

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╦  ╦╔═╗╔╦╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║    ║  ║╚═╗ ║ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────╩═╝╩╚═╝ ╩ 
*/

router.get('/product_list', (req, res, next) => {
  Product.find()
  .then(function (productsFromDB) {
    console.log('productsFromDB:', productsFromDB);
    res.render('admin_product_list', { products: productsFromDB });
  })
  .catch(err => {
    console.log(err);
    next(err);
  })
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔╗╔╔═╗╦ ╦
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║    ║║║║╣ ║║║
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────╝╚╝╚═╝╚╩╝
*/

router.get('/product_new', (req, res, next) => {
  res.render('admin_product_new')
});

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔╗╔╔═╗╦ ╦
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║    ║║║║╣ ║║║
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────╝╚╝╚═╝╚╩╝
*/

/*
PRODUCT VALIDATION
*/

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
  if (req.body.otherPhotosContent > 3) {
    errors.push({name: 'otherPhotos', message: '3 photos secondaires maximum'})
  }


  console.log('errors=', errors)

  return errors
}

// Appeler cette route à la tentative d'enregistrement
router.post('/product_new/validate/product', function (req, res, next) {
  const errors = validateProduct(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})

/*
PRODUCT POST
*/

router.post('/product_new', fileUploader.single('mainPhoto'), /*fileUploader.array('otherPhotos', 3), fileUploader.single('notice'),*/ (req, res, next) => {
  const productName = req.body.productName
  const productDescription = req.body.productDescription
  const productCost = req.body.productCost
  const exVat = req.body.exVat
  const vat = req.body.vat
  const discount = req.body.discount
  const materials = req.body.materials
  const productSize_length = req.body.productSize_length
  const productSize_width = req.body.productSize_width
  const productSize_height = req.body.productSize_height
  const productSize_thickness = req.body.productSize_thickness
  const productSize_surface = req.body.productSize_surface
  const productSize_weight = req.body.productSize_weight
  const packagingSize_length = req.body.packagingSize_length
  const packagingSize_width = req.body.packagingSize_width
  const packagingSize_height = req.body.packagingSize_height
  const packagingSize_weight = req.body.packagingSize_weight
  const stock = req.body.stock
  const color = req.body.color
  const brand = req.body.brand
  /*const mainPhoto = req.body.mainPhoto*/
  const otherPhotos = req.body.otherPhotos
  const notice = req.body.notice
  const category = req.body.category


  const errors = validateProduct(req);


  if (errors.length === 0) {
    Product.findOne({productName : productName}) // on recherche le produit pour savoir d'il existe déjà
     .then((product) => {
      if (product) {
        res.render('admin_product_new', {
          message: `Le produit ${product.productName} éxiste déjà`
        })
      } else {
        const newProduct = new Product ({ // si inexistant = nouveau produit
          productName: productName,
          productDescription: productDescription,
          productCost: productCost,
          productPrice: {
            exVat: exVat,
            vat: vat,
            discount: discount
          },
          materials: [{materials}],
          productSize: {
            productSize_length: productSize_length,
            productSize_width: productSize_width,
            productSize_height: productSize_height,
            productSize_thickness: productSize_thickness,
            productSize_surface: productSize_surface,
            productSize_weight: productSize_weight
          },
          packagingSize: {
            packagingSize_length: packagingSize_length,
            packagingSize_width: packagingSize_width,
            packagingSize_height: packagingSize_height,
            packagingSize_weight: packagingSize_weight
          },
          color: color,
          brand: brand,
          mainPhoto: req.file.path,
          otherPhotos: [{otherPhotos}],
          stock: stock,
          notice: notice,
          category: category
        })
      
        newProduct.save()
        .then( newProduct => {
          console.log('product saved', newProduct)
          res.redirect('/product_list')
        })
        .catch(err => {
          console.log('product not saved', err)
        })
      }
    })
  }
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║     ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/

router.get('/:id/product_delete', (req, res, next) => {
  Product.findById(req.params.id)
  .then(function (productFromDB) {
    console.log('productFromDB=', productFromDB);
    res.render('product_delete', { product: productFromDB, });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})


/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║     ║║║╣ ║  ║╣  ║ ║╣ 
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/


router.post('/:id/product_delete',(req,res,next)=>{
  Product.findByIdAndRemove(req.params.id)
  .then(()=> {
    console.log('product deleted')
    res.redirect('/product_list')
  })
  .catch(err=>{
    console.log('error deleting product',err)
    next(err)
  })
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔═╗╔╦╗╦╔╦╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║    ║╣  ║║║ ║ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────╚═╝═╩╝╩ ╩ 
*/

router.get('/:id/product_edit',(req,res,next)=>{
  Product.findById(req.params.id)
  .then((productFromDB)=>{
      console.log(productFromDB)
      res.render('admin_product_edit',{product: productFromDB})
  })
  .catch(err=>{
    console.log('error for product edition', err)
    next(err)
  })
})

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╦═╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗   ╔═╗╔╦╗╦╔╦╗
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ╠═╝╠╦╝║ ║ ║║║ ║║   ║    ║╣  ║║║ ║ 
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╩  ╩╚═╚═╝═╩╝╚═╝╚═╝ ╩────╚═╝═╩╝╩ ╩ 
*/

router.post('/:id/product_edit', fileUploader.single('mainPhoto'), (req,res,next)=>{

  const productName = req.body.productName
  const productDescription = req.body.productDescription
  const productCost = req.body.productCost
  const exVat = req.body.exVat
  const vat = req.body.vat
  const discount = req.body.discount
  const materials = req.body.materials
  const productSize_length = req.body.productSize_length
  const productSize_width = req.body.productSize_width
  const productSize_height = req.body.productSize_height
  const productSize_thickness = req.body.productSize_thickness
  const productSize_surface = req.body.productSize_surface
  const productSize_weight = req.body.productSize_weight
  const packagingSize_length = req.body.packagingSize_length
  const packagingSize_width = req.body.packagingSize_width
  const packagingSize_height = req.body.packagingSize_height
  const packagingSize_weight = req.body.packagingSize_weight
  const stock = req.body.stock
  const color = req.body.color
  const brand = req.body.brand
  /*const mainPhoto = req.body.mainPhoto*/
  const otherPhotos = req.body.otherPhotos
  const notice = req.body.notice
  const category = req.body.category


  const errors = validateProduct(req);


  if (errors.length === 0) {
    Product.findByIdAndUpdate(req.params.id, {
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
        productSize_length: productSize_length,
        productSize_width: productSize_width,
        productSize_height: productSize_height,
        productSize_thickness: productSize_thickness,
        productSize_surface: productSize_surface,
        productSize_weight: productSize_weight
      },
      packagingSize: {
        packagingSize_length: packagingSize_length,
        packagingSize_width: packagingSize_width,
        packagingSize_height: packagingSize_height,
        packagingSize_weight: packagingSize_weight
      },
      color: color,
      brand: brand,
      mainPhoto: req.file.path,
      otherPhotos: [{otherPhotos}],
      stock: stock,
      notice: notice,
      category: category
    },
    {new:true})
    .then((productUpdated)=>{
      res.redirect(`/product/${productUpdated._id}`)
    })
    .catch((err)=>{
      console.log('error editing product',err)
      next(err)
    }) 
  }
})

/*
 █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗         ██████╗ █████╗ ████████╗███████╗ ██████╗  ██████╗ ██████╗ ██╗███████╗███████╗
██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║        ██╔════╝██╔══██╗╚══██╔══╝██╔════╝██╔════╝ ██╔═══██╗██╔══██╗██║██╔════╝██╔════╝
███████║██║  ██║██╔████╔██║██║██╔██╗ ██║        ██║     ███████║   ██║   █████╗  ██║  ███╗██║   ██║██████╔╝██║█████╗  ███████╗
██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║        ██║     ██╔══██║   ██║   ██╔══╝  ██║   ██║██║   ██║██╔══██╗██║██╔══╝  ╚════██║
██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║███████╗╚██████╗██║  ██║   ██║   ███████╗╚██████╔╝╚██████╔╝██║  ██║██║███████╗███████║
╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚══════╝╚══════╝                                                                                                                     
*/

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╦  ╦╔═╗╔╦╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗    ║  ║╚═╗ ║ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────╩═╝╩╚═╝ ╩ 
*/

router.get('/categories_list', (req, res, next) => {
  Category.find()
      .then(function (categoriesFromDB) {
          console.log('categoriesFromDB:', categoriesFromDB);
          res.render('admin_categories_list', { categories: categoriesFromDB });
      })
      .catch(err => {
          console.log(err);
          next(err);
      })
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔╗╔╔═╗╦ ╦
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗    ║║║║╣ ║║║
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────╝╚╝╚═╝╚╩╝
*/

router.get('/categories_new', (req, res, next) => {
  res.render('admin_categories_new');
});


/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔╗╔╔═╗╦ ╦
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗    ║║║║╣ ║║║
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────╝╚╝╚═╝╚╩╝
*/


/*
CATEGORIES VALIDATION
*/

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
router.post('/categories_new/validate/category', function (req, res, next) {
  const errors = validateCategory(req)

  console.log('errors vaut', errors)

  if (errors.length >= 1) {
    res.status(400).json(errors)
  } else {
    res.json({})
  }
})

/*
CATEGORIES POST
*/

router.post('/categories_new', fileUploader.single('categoryPhoto'), (req, res, next) => {


  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;
  /*const categoryPhoto = req.body.categoryPhoto;*/

  const errors = (validateCategory(req));

  if (errors.length === 0) {
    Category.findOne({categoryName : categoryName})
     .then((category) => {
      if (category) {
        res.render('admin_categories_new', {
          message: `La catégorie ${category.categoryName} existe déjà`
        })
      } else {
        const newCategory = new Category ({
          categoryName: categoryName,
          categoryDescription: categoryDescription,
          categoryPhoto: req.file.path
        })
      
        newCategory.save()
        .then( newCategory => {
          console.log('category saved', newCategory)
          res.redirect('/categories_list')
        })
        .catch(err => {
          console.log('category not saved', err)
        })
      }
    })
  }
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗     ║║║╣ ║  ║╣  ║ ║╣ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/

router.get('/:id/categories_delete', (req, res, next) => {
  Category.findById(req.params.id)
  .then(function (categoryFromDB) {
    console.log('categoryFromDB=', categoryFromDB);
    res.render('category_delete', { category: categoryFromDB, });
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
})

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔╦╗╔═╗╦  ╔═╗╔╦╗╔═╗
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗     ║║║╣ ║  ║╣  ║ ║╣ 
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────═╩╝╚═╝╩═╝╚═╝ ╩ ╚═╝
*/

router.post('/:id/categories_delete',(req,res,next)=>{
  Category.findByIdAndRemove(req.params.id)
  .then(()=> {
    console.log('category deleted')
    res.redirect('/categories_list')
  })
  .catch(err=>{
    console.log('error deleting category',err)
    next(err)
  })
})

/*
╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔═╗╔╦╗╦╔╦╗
║ ╦║╣  ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗    ║╣  ║║║ ║ 
╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────╚═╝═╩╝╩ ╩ 
*/

router.get('/:id/categories_edit',(req,res,next)=>{
  Category.findById(req.params._id)
  .then((categoryFromDB)=>{
    console.log(categoryFromDB)
    res.render('admin_categories_edit',{category: categoryFromDB});
  })
  .catch(err=>{
    console.log('error for category edition', err)
    next(err)
  })
})

/*
╔═╗╔═╗╔═╗╔╦╗  ╔═╗╔╦╗╔╦╗╦╔╗╔    ╔═╗╔═╗╔╦╗╔═╗╔═╗╔═╗╦═╗╦╔═╗╔═╗    ╔═╗╔╦╗╦╔╦╗
╠═╝║ ║╚═╗ ║   ╠═╣ ║║║║║║║║║    ║  ╠═╣ ║ ║╣ ║ ╦║ ║╠╦╝║║╣ ╚═╗    ║╣  ║║║ ║ 
╩  ╚═╝╚═╝ ╩   ╩ ╩═╩╝╩ ╩╩╝╚╝────╚═╝╩ ╩ ╩ ╚═╝╚═╝╚═╝╩╚═╩╚═╝╚═╝────╚═╝═╩╝╩ ╩ 
*/

router.post('/:id/categories_edit', fileUploader.single('categoryPhoto'), (req,res,next)=>{

  const categoryName = req.body.categoryName;
  const categoryDescription = req.body.categoryDescription;
  /*const categoryPhoto = req.body.categoryPhoto;*/

  const errors = (validateCategory(req));

  if (errors.length === 0) {
    Category.findByIdAndUpdate(req.params._id,{
      categoryName: categoryName,
      categoryDescription: categoryDescription,
      categoryPhoto: req.file.path
    },
    {new:true})
    .then((categoryFromDB)=>{
      res.redirect(`/categories/${categoryFromDB._id}`)
    })
    .catch((err)=>{
      console.log('error editing category',err)
      next(err)
    })
  }
})





/* GET categories page */
router.get('/categories', (req, res, next) => {
  res.render('categories');
});

/* GET product page */
router.get('/product', (req, res, next) => {
  res.render('product');
});

/* GET cart page */
router.get('/cart', (req, res, next) => {
  res.render('cart');
});

/* GET orders page (for payments) */
router.get('/orders', (req, res, next) => {
  res.render('checkout');
});

module.exports = router;