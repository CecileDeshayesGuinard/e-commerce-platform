const router = require("express").Router();
const User = require("../models/User.model");
const bcryptJs = require("bcryptjs");


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

  if (!req.body.firstName) {
    errors.push({name: 'firstName', message: 'Prénom requis'})
  }
  if (!req.body.lastName) {
    errors.push({name: 'lastName', message: 'Nom requis'})
  }
  if (!req.body.email) {
    errors.push({name: 'email', message: 'email requis'})
  }
  if(!req.body.email.includes('@')) {
    errors.push({name: 'email', message: 'email non valide'})
  }
  if (!req.body.phoneNumber) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone requis'})
  }
  if (req.body.phoneNumber.length < 10) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone non valide'})
  }
  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/validate/user', function (req, res, next) {
  const errors = validateUser(req)

  if (errors.length >= 1) {
    res.json(errors)
  }
})

// Error checking Adress

function validateAddress(req) {
  const errors = []

  if (!req.body.countryName) {
    errors.push({name: 'countryName', message: 'Prénom requis'})
  }
  if (!req.body.streetName) {
    errors.push({name: 'streetName', message: 'Nom requis'})
  }
  if (!req.body.zipCode) {
    errors.push({name: 'zipCode', message: 'email requis'})
  }
  if(req.body.zipCode.includes('')) {
    errors.push({name: 'zipCode', message: 'email non valide'})
  }
  if (!req.body.cityName) {
    errors.push({name: 'cityName', message: 'n° de téléphone requis'})
  }
  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/validate/address', function (req, res, next) {
  const errors = validateAddress(req)

  if (errors.length >= 1) {
    res.json(errors)
  }
})

// Error checking Password

function validatePassword(req) {
  const errors = []

  if (!req.body.password) {
    errors.push({name: 'password', message: 'Mot de passe (requis)'})
  }
  if (!req.body.password.includes('1'||'2'||'3'||'4'||'5'||'6'||'7'||'8'||'9'||'O')) {
    errors.push({name: 'password', message: 'utilisez au moins un chiffre !'})
  }
  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/validate/password', function (req, res, next) {
  const errors = validatePassword(req)

  if (errors.length >= 1) {
    res.json(errors)
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
          companyName: companyName,
          vatNumber: vatNumber,
          regNumber: regNumber,
          nafCode: nafCode,
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirth,
          countryName: countryName,
          streetName: streetName,
          streetNumber: streetNumber,
          zipCode: zipCode,
          cityName: cityName,
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
        res.redirect("/", {
          message: 'Vous êtes enregistré !'
        })
      }
    })
  }
})


/* GET account page */
router.get("/account", (req, res, next) => {
  res.render("account");
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

// FAIRE DES ROUTES ET TRAVAILLER "not-found" ET "error"

module.exports = router;
