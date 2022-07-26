// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();


// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

// Partials : code a rajouter pour utiliser cette fonction hbs.
hbs.registerPartials("partials_absolute_path") // attention, n'est pas présent de facto dans Ironlauncher !
app.set('view engine', 'hbs'); // attention, n'est pas présent de facto dans Ironlauncher !
hbs.registerPartials(__dirname + "/views/partials"); // attention, n'est pas présent de facto dans Ironlauncher !


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require('./config/session.config')(app)

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "e-commerce-platform";

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const signup = require("./routes/index.routes");
app.use("/signup", signup);

const login = require("./routes/index.routes");
app.use("/login", login);

const account = require("./routes/index.routes");
app.use("/account", account);

const account_edit = require("./routes/index.routes");
app.use("/:id/account_edit", account_edit);

const account_delete = require("./routes/index.routes");
app.use("/:id/account_delete", account_delete);

const categories = require("./routes/index.routes");
app.use("/categories", categories);

const product = require("./routes/index.routes");
app.use("/product", product);

const cart = require("./routes/index.routes");
app.use("/cart", cart);

const checkout = require("./routes/index.routes");
app.use("/checkout", checkout);

const admin_product_new = require("./routes/index.routes"); // NE MARCHE PAS => LAYOUT 1 TOUJOURS ACTIFS
app.use("/product_new", admin_product_new);

const admin_product_list = require("./routes/index.routes");
app.use("/product_list", admin_product_list);

const admin_product_edit = require("./routes/index.routes");
app.use("/:id/product_edit", admin_product_edit);

const admin_product_delete = require("./routes/index.routes");
app.use("/:id/product_delete", admin_product_delete);

const admin_categories_new = require("./routes/index.routes");
app.use("/categories_new", admin_categories_new);

const admin_categories_list = require("./routes/index.routes");
app.use("/categories_list", admin_categories_list);

const admin_categories_edit = require("./routes/index.routes");
app.use("/:id/categories_edit", admin_categories_edit);

const admin_categories_delete = require("./routes/index.routes");
app.use("/:id/categories_delete", admin_categories_delete);


// bcrpytjs

const bcrypt = require('bcryptjs');


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
