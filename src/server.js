// Express file
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

// Initializations
const app = express();
require("./config/passport");

// Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",

    // Helpers
    helpers: {
      checked: function (a, b) {
        if (a == undefined) return "";
        return a == b ? "checked" : "";
      },
      selected: function (a, b) {
        if (a == undefined) return "";
        return a == b ? "selected" : "";
      },
      statusHelper: function (a) {
        if (a == undefined) return "";
        return a == 1 ? "Active" : "Inactive";
      },
      typeProject: function (a) {
        if ( a == undefined || a == 0 ) return ""
        else if ( a == 1 ) return "Custome Web"
        else if ( a == 2 ) return "e-commerce"
        else if ( a == 3 ) return "Android app"
        else if ( a == 4 ) return "IOS app";
      },
      formatCurrency: function (a) {
        return a.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
      },
      statusButtonHelper: function (a) {
        if (a == undefined) return "";
        return a == 1 ? "btn-success" : "btn-secondary";
      },
    },
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Global variables

// AT-SCE Routes - General
app.use("/", require("./routes/at-sce.routes"));

// AT-SCE Routes - Admin
app.use("/admin", require("./routes/admin.routes"));

// AT-SCE Healthcheck
app.use("/health-check", require("./routes/health-check.routes"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
