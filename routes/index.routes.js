const router = require("express").Router();
const User = require("../models/User.model")
/*const bcryptJs = require("bcryptjs")*/


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

/* POST signup page */

function validate(req) {
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
  if(req.body.email.includes('@')) {
    errors.push({name: 'email', message: 'email non valide'})
  }
  if (!req.body.phoneNumber) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone requis'})
  }
  if (req.body.PhoneNumber.length < 10) {
    errors.push({name: 'phoneNumber', message: 'n° de téléphone non valide'})
  }

  return errors
}

// Appeler cette route a chaque fois que suivant (AJAX)
router.post('/signup/validate', function (req, res, next) {
  const errors = validate(req)

  if (errors.length >= 1) {
    res.json(errors)
  }
})

router.post('/signup', (req, res, next) => {
  // si pas entreprise, on va direct dans user profile
  // user profile terminée, on permute sur billing adress
  // billing adress finie, on va sur securité
  // vérifier si l'adresse email n'existe pas déjà
  const companyName = req.body.companyName
  const vatNumber = req.body.vatNumber
  const regNumber = req.body.regNumber
  const nafCode = req.body.nafCode

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const phoneNumber = req.body.phoneNumber
  const dateOfBirth = req.body.dateOfBirth

  const errors = validate(req)

  if (errors.length <= 0) {
    // validation ALL GOOD

    // => signup
  }

  if (firstName === "" || lastName === "" || email === "" || phoneNumber === ""){
    res.render("signup", { // faire attention a bien renvoyer sur la bonne div
      message: "Veuillez remplir les champs obligatoires" // mettre en surbrillance les champs en question
      })
  }

  const countryName = req.body.countryName
  const streetName = req.body.streetName
  const streetNumber = req.body.streetNumber
  const zipCode = req.body.zipCode
  const cityName = req.body.cityName

  if (countryName === "" || streetName === "" || streetNumber === "" || zipCode === "" || cityName === ""){
    res.render("signup", { // faire attention a bien renvoyer sur la bonne div
      message: "Veuillez remplir les champs obligatoires" // mettre en surbrillance les champs en question
      })
  }

  /*const cryptedPassword = bcryptJs.hashSync(req.body.password)*/

  if (cryptedPassword === ""){
    res.render("signup", { // faire attention a bien renvoyer sur la bonne div
      message: "Veuillez remplir les champs obligatoires" // mettre en surbrillance les champs en question
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
