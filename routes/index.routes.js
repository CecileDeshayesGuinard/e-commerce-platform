const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET signup page */
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

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
